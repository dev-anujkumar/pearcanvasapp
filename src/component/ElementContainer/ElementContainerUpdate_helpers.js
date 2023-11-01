// Helper methods
import { customEvent } from '../../js/utils';
import { tcmSnapshotsForUpdate } from '../TcmSnapshots/TcmSnapshotsCreate_Update';
import { sendDataToIframe } from '../../constants/utility.js';
import { updateAssessmentVersion } from '../../component/AssessmentSlateCanvas/AssessmentActions/assessmentActions.js';
import { updateAutoNumberedElement } from './UpdateElements';
import { LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES } from '../../component/FigureHeader/AutoNumberConstants';
//Constants
import {
    AUTHORING_ELEMENT_UPDATE,
    OPEN_GLOSSARY_FOOTNOTE,
    GET_TCM_RESOURCES,
    OPEN_MARKED_INDEX 
} from "../../constants/Action_Constants";
import ElementConstants, { 
    elementTypeTCM,
    allowedFigureTypesForTCM,
    allowedParentType
} from "./ElementConstants";
import { autoNumberFigureTypesAllowed } from '../FigureHeader/AutoNumberConstants';
import config from '../../config/config';
import { findSectionType, getShowHideElement } from '../ShowHide/ShowHide_Helper';
import { isElementInsideBlocklist } from '../../js/TinyMceUtility';
import { startPdfConversion,poolFunc} from '../PdfSlate/CypressPlusAction';
import elementTypeConstant from './ElementConstants';


const { AUTHORED_TEXT, SHOW_HIDE, FIGURE, ELEMENT_DIALOGUE, MULTI_COLUMN, POOPUP_ELEMENT, TAB, BLOCK_LIST, ELEMENT_ASIDE } = ElementConstants;

export const updateNewVersionElementInStore = (paramObj) => {
    let { 
        updatedData, 
        asideData, 
        dispatch,
        versionedData,
        elementIndex,
        parentElement,
        fetchSlateData,
        newslateData,
        slateManifestURN
    } = paramObj

    const parentVersionUrn = versionedData.newParentVersion ? versionedData.newParentVersion : parentElement?.id,
        CONTAINER_VERSIONING = "containerVersioning",
        PARENTELEMENT_TYPES = ["poetry", "showhide", "citations", "groupedcontent"]

    const isBlockListElement  = isElementInsideBlocklist({index:elementIndex,data:{asideData:asideData}},newslateData)
    if (updatedData && updatedData.pageNumberRef) {
        versionedData.pageNumberRef = updatedData.pageNumberRef
    }
    let indexes = elementIndex && elementIndex.length > 0 ? elementIndex.split('-') : 0;
    if (asideData?.type == 'showhide') {
        getShowhideParent({ asideData, dispatch, parentElementIndex: elementIndex, fetchSlateData })
    }
    if (asideData?.parent?.type === 'showhide' && asideData?.parent?.showHideType && (isBlockListElement || asideData?.type == "citations")) {
        asideData.indexes = indexes;
        dispatch(fetchSlateData(asideData?.parent?.id, asideData?.parent?.contentUrn, 0, asideData, CONTAINER_VERSIONING, false));
         /* Condition for update title of Approved CG inside S/H */ 
    } else if(isBlockListElement) {
        const parentBlockListId = newslateData[slateManifestURN].contents.bodymatter[indexes[0]].id
        const parentBlockListContentUrn = newslateData[slateManifestURN].contents.bodymatter[indexes[0]].contentUrn
        dispatch(fetchSlateData(parentBlockListId,parentBlockListContentUrn, 0, {type:'manifestlist' ,indexes:indexes}, CONTAINER_VERSIONING, false));
    }
    else if (asideData && asideData.type == 'element-aside') {
        asideData.indexes = indexes;
        if (indexes.length === 2 || indexes.length === 3) {
            dispatch(fetchSlateData(versionedData.newParentVersion ? versionedData.newParentVersion : asideData.id, asideData.contentUrn, 0,
            asideData, CONTAINER_VERSIONING, false));
        } else if (indexes.length === 4 && asideData.parent.type === 'groupedcontent') {
            dispatch(fetchSlateData(asideData.parent.id, asideData.parent.parentContentUrn, 0, asideData, CONTAINER_VERSIONING, false));
            /* Handeling of elements after versioning inside Aside/WE inside S/H */
        } else if ((indexes.length === 4 || indexes.length === 5) && asideData?.parent?.type === 'showhide' && asideData?.parent?.showHideType) {
            dispatch(fetchSlateData(asideData?.parent?.id, asideData?.parent?.contentUrn, 0, asideData, CONTAINER_VERSIONING, false));
        }
    } else if (updatedData?.type == "element-authoredtext" && updatedData?.metaDataField === "formattedTitle" && asideData?.parent?.type === 'showhide' &&
        asideData?.parent?.showHideType) {
        asideData.indexes = indexes;
        asideData.type = 'citations';
        dispatch(fetchSlateData(asideData?.parent?.id, asideData?.parent?.contentUrn, 0, asideData, CONTAINER_VERSIONING, false));
    }
    else if (asideData?.type == "poetry" && asideData?.grandParent?.asideData?.type === 'showhide') {
        dispatch(fetchSlateData(asideData?.grandParent?.asideData?.id, asideData?.grandParent?.asideData?.contentUrn, 0, asideData, CONTAINER_VERSIONING, false));
        /* Condition for update Approved poetry inside S/H */ 
    } else if (asideData?.type === MULTI_COLUMN && asideData?.subtype === TAB) {
        dispatch(fetchSlateData(asideData?.parent?.id, asideData?.parent?.contentUrn, 0, asideData, CONTAINER_VERSIONING, false))
    }
    else if (parentElement && PARENTELEMENT_TYPES.includes(parentElement.type)) {
        if ((asideData?.grandParent?.asideData?.type === "element-aside" || asideData?.grandParent?.asideData?.type === "groupedcontent") && (indexes.length === 4 ||
            indexes.length === 5 || indexes.length === 6) && asideData.type === "poetry") {
            dispatch(fetchSlateData(asideData?.grandParent?.asideData?.id, asideData?.grandParent?.asideData?.contentUrn, 0, asideData, CONTAINER_VERSIONING, false));
        }  else if (asideData && asideData.type == 'groupedcontent') {
            asideData.indexes = indexes;
            if (indexes.length === 2 || indexes.length === 3) {
                dispatch(fetchSlateData(versionedData.newParentVersion ? versionedData.newParentVersion : asideData.id, asideData.contentUrn, 0,
                asideData, CONTAINER_VERSIONING, false));
            }
        } else {
        parentElement.index = elementIndex;
        parentElement.indexes = elementIndex;
        dispatch(fetchSlateData(parentVersionUrn, parentElement.contentUrn, 0, parentElement, CONTAINER_VERSIONING, false));
    } 
    }
    else if (parentElement && parentElement.type === "popup" && updatedData.elementParentEntityUrn && (updatedData.metaDataField ||
        updatedData.sectionType === "postertextobject") ) {
        dispatch(fetchSlateData(updatedData.slateVersionUrn, updatedData.elementParentEntityUrn, 0, parentElement, CONTAINER_VERSIONING, true)); 
    }
    else {
        elementIndex = indexes.length == 2 ? indexes[0] : elementIndex
        newslateData[slateManifestURN].contents.bodymatter[elementIndex] = versionedData;
    }
    return dispatch({
        type: AUTHORING_ELEMENT_UPDATE,
        payload: {
            slateLevelData: newslateData
        }
    })
}

export const updateElementInStore = (paramsObj) => {
    const {
        updatedData,
        asideData,
        parentUrn,
        dispatch,
        elementIndex,
        showHideType,
        parentElement,
        newslateData,
        autoNumberDetails,
        isFromRC,
        slateParentData
    } = paramsObj

        /**
         * @isFromRC represents element update call from RC with loAssociation key
         * @updatedData - is the updated element details that has been fetch from a RC slate
         */
    let _slateObject = isFromRC ? slateParentData[updatedData.slateVersionUrn] : newslateData[updatedData.slateVersionUrn],
        { contents: _slateContent } = _slateObject,
        { bodymatter: _slateBodyMatter } = _slateContent,
        elementId = updatedData.id;

    const iList = elementIndex?.toString()?.split("-") || [];
    const isBlockListElement  = isElementInsideBlocklist({index:elementIndex,data:{asideData:asideData}},newslateData)
    const { autoNumberSettingsOption, isAutoNumberingEnabled } = autoNumberDetails;

    /* update the store on update of showhide elements inside container elements */
    if(asideData?.type === SHOW_HIDE && iList?.length >= 3) {
        const sh_Object = getShowHideElement(_slateBodyMatter, iList?.length, iList, updatedData.type, asideData);
        updateShowhideElements(sh_Object, updatedData, iList, { isAutoNumberingEnabled, autoNumberSettingsOption });
    } else if (parentElement && parentElement.type === "citations") {
        const indexes = typeof elementIndex === 'string' ? elementIndex?.split("-"): elementIndex;
        // Update CG inside S/H
        if (asideData?.parent?.type === SHOW_HIDE) {
            let sectionType = asideData?.parent?.showHideType;
            if (updatedData.type === "element-citation") {
                _slateBodyMatter[indexes[0]].interactivedata[sectionType][indexes[2]].contents.bodymatter[indexes[3] - 1] = {
                    ...updatedData,
                    tcm: _slateObject.tcm ? true : false
                }
            } else {
                if (updatedData.type === "element-authoredtext") {
                    _slateBodyMatter[indexes[0]].interactivedata[sectionType][indexes[2]].contents["formatted-title"] = { ...updatedData }
                }
            }
        // Update CG inside Slate
        } else {
            if (updatedData.type === "element-citation") {
                _slateBodyMatter[indexes[0]].contents.bodymatter[indexes[1] - 1] = {
                    ...updatedData,
                    tcm: _slateObject.tcm ? true : false
                }
            } else {
                if (updatedData.type === "element-authoredtext") {
                    _slateBodyMatter[elementIndex].contents["formatted-title"] = { ...updatedData }
                }
            }
        }
        /* Update data of element inside tab inside TB */
    } else if (parentElement?.type === MULTI_COLUMN && asideData?.subtype === TAB) {
        const indexes = elementIndex.split("-")
        let element = _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]];
        /** Updation of AutoNumbered Elements */
        if (isAutoNumberingEnabled && element?.type == 'figure' && autoNumberFigureTypesAllowed.includes(element?.figuretype) &&
            autoNumberSettingsOption?.entityUrn === element.contentUrn) {
            element = { ...element, ...updatedData }
            const dataToReturn = updateAutoNumberedElement(autoNumberSettingsOption?.option, element, { displayedlabel: element?.displayedlabel,
                manualoverride: element?.manualoverride })
            element = { ...dataToReturn }
        }
        _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]] = {
            ...element,
            ...updatedData,
            elementdata: {
                ...element.elementdata,
                startNumber: updatedData.elementdata ? updatedData.elementdata.startNumber : null,
                numberedlines: updatedData.elementdata ? updatedData.elementdata.numberedlines : null,
                text: updatedData.elementdata ? updatedData.elementdata.text : null
            },
            tcm: _slateObject.tcm ? true : false
        }
    } else if (parentElement && parentElement.type === "groupedcontent" && asideData?.type !== 'manifestlist') {
        const indexes = elementIndex.split("-")
        let element = _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]]
        /** Updation of AutoNumbered Elements */
        if (isAutoNumberingEnabled && element?.type == 'figure' && autoNumberFigureTypesAllowed.includes(element?.figuretype) &&
            autoNumberSettingsOption?.entityUrn === element.contentUrn) {
            element = { ...element, ...updatedData }
            const dataToReturn = updateAutoNumberedElement(autoNumberSettingsOption?.option, element, { displayedlabel: element?.displayedlabel,
                manualoverride: element?.manualoverride })
            element = { ...dataToReturn }
        }
        _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]] = {
            ...element,
            ...updatedData,
            elementdata: {
                ...element.elementdata,
                startNumber: updatedData.elementdata ? updatedData.elementdata.startNumber : null,
                numberedlines: updatedData.elementdata ? updatedData.elementdata.numberedlines : null,
                text: updatedData.elementdata ? updatedData.elementdata.text : null
            },
            tcm: _slateObject.tcm ? true : false
        }
    } 
    else if (updatedData?.loData?.length) {
        updatedData.loData.forEach((updatedLO) => {
            if (updatedLO.elementVersionType === ElementConstants.METADATA_ANCHOR) {
                for (let i = 0; i < updatedLO.metaDataAnchorID.length; i++) {
                    _slateBodyMatter = updateLOInCanvasStore({ updatedLO, _slateBodyMatter, activeIndex: i });
                }
            }
        }) /** updation of elements inside aside and WE elements inside Tab element */
    } else if (asideData?.parent?.type === MULTI_COLUMN && asideData?.parent?.subtype === TAB && asideData?.type !== BLOCK_LIST) {
        const indexes = elementIndex?.split("-");
        if (asideData?.type === ELEMENT_ASIDE && parentElement?.type === POOPUP_ELEMENT) {
            let element;
            switch (indexes.length) {
                case 5: // AS/WE->HEAD->Pop up Element
                    element = _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]]
                    .groupdata.bodymatter[indexes[3]].elementdata.bodymatter[indexes[4]].popupdata;
                    if (updatedData?.sectionType === "postertextobject") {
                        _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]]
                        .groupdata.bodymatter[indexes[3]].elementdata.bodymatter[indexes[4]].popupdata.postertextobject[0] = {
                            ...element.postertextobject[0],
                            html: updatedData?.html,
                            elementdata: {
                                ...element.postertextobject[0].elementdata,
                                text: updatedData?.elementdata?.text
                            },
                        }
                    } else {
                        _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0]
                        .groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]].elementdata.bodymatter[indexes[4]].popupdata["formatted-title"] = {
                            ...element["formatted-title"],
                            html: updatedData?.html,
                            elementdata: {
                                ...element["formatted-title"].elementdata,
                                text: updatedData?.elementdata?.text
                            },
                        }
                    }
                    break;
                case 6: // WE->BODY->Pop up Element
                    element = _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]]
                    .groupdata.bodymatter[indexes[3]].elementdata.bodymatter[indexes[4]].contents.bodymatter[indexes[5]].popupdata;
                    if (updatedData?.sectionType === "postertextobject") {
                        _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]]
                        .groupdata.bodymatter[indexes[3]].elementdata.bodymatter[indexes[4]].contents.bodymatter[indexes[5]].popupdata.postertextobject[0] = {
                            ...element.postertextobject[0],
                            html: updatedData?.html,
                            elementdata: {
                                ...element.postertextobject[0].elementdata,
                                text: updatedData?.elementdata?.text
                            },
                        }
                    } else {
                        _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]]
                        .groupdata.bodymatter[indexes[3]].elementdata.bodymatter[indexes[4]].contents.bodymatter[indexes[5]].popupdata["formatted-title"] = {
                            ...element["formatted-title"],
                            html: updatedData?.html,
                            elementdata: {
                                ...element["formatted-title"].elementdata,
                                text: updatedData?.elementdata?.text
                            },
                        }
                    }
                    break;
            }
        } else if (asideData?.type === ELEMENT_ASIDE) {
            /** updation of text and figure elements inside aside/WE of multicolumn */
            let element;
            switch (indexes.length) {
                case 5: // AS/WE->HEAD->Element
                    element = _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]]
                    .groupdata.bodymatter[indexes[3]].elementdata.bodymatter[indexes[4]];
                    break;
                case 6: // WE->BODY->Element
                    element = _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]]
                    .groupdata.bodymatter[indexes[3]].elementdata.bodymatter[indexes[4]].contents.bodymatter[indexes[5]];
                    break;
            }
            /** Updation of AutoNumbered Elements */
            if (isAutoNumberingEnabled && element?.type == FIGURE && autoNumberFigureTypesAllowed.includes(element?.figuretype) &&
                autoNumberSettingsOption?.entityUrn === element.contentUrn) {
                element = { ...element, ...updatedData }
                const dataToReturn = updateAutoNumberedElement(autoNumberSettingsOption?.option, element, { displayedlabel: element?.displayedlabel,
                                     manualoverride: element?.manualoverride })
                element = { ...dataToReturn }
            }
            switch (indexes.length) {
                case 5: // AS/WE->HEAD->Element
                    _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata
                    .bodymatter[indexes[3]].elementdata.bodymatter[indexes[4]] = {
                        ...element,
                        ...updatedData,
                        elementdata: {
                            ...element.elementdata,
                            startNumber: updatedData.elementdata ? updatedData.elementdata.startNumber : null,
                            numberedlines: updatedData.elementdata ? updatedData.elementdata.numberedlines : null,
                            text: updatedData.elementdata ? updatedData.elementdata.text : null
                        },
                        tcm: _slateObject.tcm ? true : false
                    }
                    break;
                case 6: // WE->BODY->Element
                    _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata
                    .bodymatter[indexes[3]].elementdata.bodymatter[indexes[4]].contents.bodymatter[indexes[5]] = {
                        ...element,
                        ...updatedData,
                        elementdata: {
                            ...element.elementdata,
                            startNumber: updatedData.elementdata ? updatedData.elementdata.startNumber : null,
                            numberedlines: updatedData.elementdata ? updatedData.elementdata.numberedlines : null,
                            text: updatedData.elementdata ? updatedData.elementdata.text : null
                        },
                        tcm: _slateObject.tcm ? true : false
                    }
                    break;
            }
        }
    } else if(asideData?.parent?.type === "groupedcontent" && asideData?.type !== 'manifestlist') {
        /** updation of aside and WE elements inside multicolumn */
        /* 2C:AS/WE:PS */
        const indexes = elementIndex?.split("-");
        /* 2C:AS/WE-HEAD:PS */
        if(indexes?.length == 4 && parentUrn?.elementType === "element-aside") {
           if(parentElement?.type === "popup") {
                const element =  _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].popupdata;
                if(updatedData.sectionType === "postertextobject"){
                    _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]]
                    .popupdata.postertextobject[0] = {
                        ...element.postertextobject[0],
                        html: updatedData?.html,
                        elementdata: {
                            ...element.postertextobject[0].elementdata,
                            text: updatedData?.elementdata?.text
                        },
                    }
                } else {
                    _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]]
                    .popupdata["formatted-title"] = {
                        ...element["formatted-title"],
                        html: updatedData?.html,
                        elementdata: {
                            ...element["formatted-title"].elementdata,
                            text: updatedData?.elementdata?.text
                        },
                    }
                }
            }else if (parentElement?.type == "showhide" && showHideType) {
                _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]]
                .interactivedata[showHideType].map((showHideData) => {
                    if (showHideData.id == updatedData.id) {
                        showHideData.elementdata.text = updatedData.elementdata.text;
                        showHideData.html = updatedData.html;
                    }
                })
            }
            else {
                /** updation of text and figure elements inside aside/WE of multicolumn */
                let element = _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]];
                /** Updation of AutoNumbered Elements */
                if (isAutoNumberingEnabled && element?.type == 'figure' && autoNumberFigureTypesAllowed.includes(element?.figuretype)
                    && autoNumberSettingsOption?.entityUrn === element.contentUrn) {
                    element = { ...element, ...updatedData }
                    const dataToReturn = updateAutoNumberedElement(autoNumberSettingsOption?.option, element, { displayedlabel: element?.displayedlabel,
                                        manualoverride: element?.manualoverride })
                    element = { ...dataToReturn }
                }
                _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]] = {
                ...element,
                ...updatedData,
                elementdata: {
                    ...element.elementdata,
                    startNumber: updatedData.elementdata ? updatedData.elementdata.startNumber : null,
                    numberedlines: updatedData.elementdata ? updatedData.elementdata.numberedlines : null,
                    text: updatedData.elementdata ? updatedData.elementdata.text : null
                },
                tcm: _slateObject.tcm ? true : false
                }
            }
        } else if(indexes?.length == 5 && parentUrn?.elementType === "manifest") {
            /* 2C:WE-BODY/Section Break:PS */
            if(parentElement?.type === "popup") {  /* 2C:WE-BODY/Section Break:Popup*/
                let element =  _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata
                .bodymatter[indexes[3]].contents.bodymatter[indexes[4]].popupdata;
                if(updatedData.sectionType === "postertextobject"){ /* 2C:WE-BODY/Section Break:Popup: posterobjectdata*/
                    _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata
                    .bodymatter[indexes[3]].contents.bodymatter[indexes[4]].popupdata.postertextobject[0] = {
                        ...element.postertextobject[0],
                        html: updatedData?.html,
                        elementdata: {
                            ...element.postertextobject[0].elementdata,
                            text: updatedData?.elementdata?.text
                        },
                    }
                } else { /* 2C:WE-BODY/Section Break:Popup: formatted-title */
                    _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata
                    .bodymatter[indexes[3]].contents.bodymatter[indexes[4]].popupdata["formatted-title"] = {
                        ...element["formatted-title"],
                        html: updatedData?.html,
                        elementdata: {
                            ...element["formatted-title"].elementdata,
                            text: updatedData?.elementdata?.text
                        },
                    }
                }
            } else if (parentElement?.type == "showhide" && showHideType) {
                _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata
                .bodymatter[indexes[3]].contents.bodymatter[indexes[4]].interactivedata[showHideType].map((showHideData) => {
                    if (showHideData.id == updatedData.id) {
                        showHideData.elementdata.text = updatedData.elementdata.text;
                        showHideData.html = updatedData.html;
                    }
                })
            }else {
                let element = _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata
                .bodymatter[indexes[3]].contents.bodymatter[indexes[4]];
                /** Updation of AutoNumbered Elements */
                if (isAutoNumberingEnabled && element?.type == 'figure' && autoNumberFigureTypesAllowed.includes(element?.figuretype) &&
                    autoNumberSettingsOption?.entityUrn === element.contentUrn) {
                    element = { ...element, ...updatedData }
                    const dataToReturn = updateAutoNumberedElement(autoNumberSettingsOption?.option, element, { displayedlabel: element?.displayedlabel,
                                        manualoverride: element?.manualoverride })
                    element = { ...dataToReturn }
                }
                _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].contents
                .bodymatter[indexes[4]] = {
                    ...element,
                    ...updatedData,
                    elementdata: {
                        ...element.elementdata,
                        startNumber: updatedData.elementdata ? updatedData.elementdata.startNumber : null,
                        numberedlines: updatedData.elementdata ? updatedData.elementdata.numberedlines : null,
                        text: updatedData.elementdata ? updatedData.elementdata.text : null
                    },
                    tcm: _slateObject.tcm ? true : false
                }
            }  
        }
    } else {
        _slateBodyMatter = _slateBodyMatter.map(element => {
            if (element.id === elementId) {
                /**updation of non container elements */
                if (element.type === "element-dialogue" || element.type === "element-discussion") {
                    /** updation of playscript element having dialogue and discussion element */
                    /**PS,SD,DE */
                    element = {
                        ...element,
                        ...updatedData,
                    }
                } 
                else if (element.type !== "openerelement") {
                    /** updation of simple text elements and figure elements */
                    element = {
                        ...element,
                        ...updatedData,
                        elementdata: {
                            ...element.elementdata,
                            text: updatedData.elementdata ? updatedData.elementdata.text : null
                        },
                        tcm: _slateObject.tcm ? true : false,
                        html: updatedData.html
                    };
                    /** Updation of AutoNumbered Elements */
                    if (isAutoNumberingEnabled && element?.type == 'figure' && autoNumberFigureTypesAllowed.includes(element?.figuretype) &&
                        autoNumberSettingsOption?.entityUrn === element.contentUrn) {
                        const dataToReturn = updateAutoNumberedElement(autoNumberSettingsOption?.option, element, { displayedlabel: element?.displayedlabel,
                            manualoverride: element?.manualoverride })
                        element = { ...dataToReturn }
                    }
                }
                else {
                    element = {
                        ...element,
                        ...updatedData,
                        tcm: _slateObject.tcm ? true : false,
                        html: updatedData.html
                    };
                    /** Updation of AutoNumbered Elements */
                    if (isAutoNumberingEnabled && element?.type == 'figure' && autoNumberFigureTypesAllowed.includes(element?.figuretype) &&
                        autoNumberSettingsOption?.entityUrn === element.contentUrn) {
                        const dataToReturn = updateAutoNumberedElement(autoNumberSettingsOption?.option, element, { displayedlabel: element?.displayedlabel,
                                            manualoverride: element?.manualoverride })
                        element = { ...dataToReturn }
                    }
                }
            } else if (asideData && asideData.type == 'element-aside') {

                // xxxxxxxxxxxxxxxxxxxx  START update elements inside AS/WE inside S/H  xxxxxxxxxxxxxxxxxx //
                if (asideData?.parent?.type === "showhide" && element.id == asideData?.parent?.id) {
                    let sectionType = asideData?.parent?.showHideType;
                    if (sectionType) {
                        const nestedBodyMatter = element.interactivedata[sectionType] && element.interactivedata[sectionType].map((shChild) => {
                            if (shChild.id === asideData.id) {
                                const asideObject = shChild.elementdata.bodymatter && shChild.elementdata.bodymatter.map((asideChild) => {
                                    if (asideData.subtype === 'workedexample' && parentUrn.elementType === 'manifest' && asideChild.id === parentUrn.manifestUrn) {
                                        const weBody = asideChild.contents.bodymatter.map((item) => {
                                            if (item.id === elementId) {
                                                item = {
                                                    ...item,
                                                    ...updatedData,
                                                    elementdata: {
                                                        ...item.elementdata,
                                                        text: updatedData.elementdata ? updatedData.elementdata.text : null
                                                    },
                                                    tcm: _slateObject.tcm ? true : false,
                                                    html: updatedData.html
                                                };
                                                /** Updation of AutoNumbered Elements */
                                                if (isAutoNumberingEnabled && item?.type == 'figure' && autoNumberFigureTypesAllowed.includes(item?.figuretype) &&
                                                    autoNumberSettingsOption?.entityUrn === item.contentUrn) {
                                                    const dataToReturn = updateAutoNumberedElement(autoNumberSettingsOption?.option, item, { displayedlabel: item?.displayedlabel,
                                                                        manualoverride: item?.manualoverride })
                                                    item = { ...dataToReturn }
                                                }
                                            }
                                            return item;
                                        })
                                        asideChild.contents.bodymatter = weBody;
                                    } else {
                                        if (asideChild.id === elementId) {
                                            asideChild = {
                                                ...asideChild,
                                                ...updatedData,
                                                elementdata: {
                                                    ...asideChild.elementdata,
                                                    text: updatedData.elementdata ? updatedData.elementdata.text : null
                                                },
                                                tcm: _slateObject.tcm ? true : false,
                                                html: updatedData.html
                                            };
                                            /** Updation of AutoNumbered Elements */
                                            if (isAutoNumberingEnabled && asideChild?.type == 'figure' && autoNumberFigureTypesAllowed.includes(asideChild?.figuretype) &&
                                                autoNumberSettingsOption?.entityUrn === asideChild.contentUrn) {
                                                const dataToReturn = updateAutoNumberedElement(autoNumberSettingsOption?.option, asideChild,
                                                                    { displayedlabel: asideChild?.displayedlabel, manualoverride: asideChild?.manualoverride })
                                                asideChild = { ...dataToReturn }
                                            }
                                        }
                                    }
                                    return asideChild
                                })
                                shChild.elementdata.bodymatter = asideObject;
                            }
                            return shChild;
                        })
                        element.interactivedata[sectionType] = nestedBodyMatter;
                    }
                }
                // xxxxxxxxxxxxxxxxxxxx  END update elements inside AS/WE inside S/H  xxxxxxxxxxxxxxxxxx //


                if (element.id == asideData.id) {
                    const nestedBodyMatter = element.elementdata.bodymatter.map((nestedEle) => {
                        /*This condition add object of element in existing element  in aside */
                        if (nestedEle.id == elementId) {
                            nestedEle = {
                                ...nestedEle,
                                ...updatedData,
                                elementdata: {
                                    ...nestedEle.elementdata, 
                                    startNumber: updatedData.elementdata ? updatedData.elementdata.startNumber : null,
                                    numberedlines: updatedData.elementdata ? updatedData.elementdata.numberedlines : null,
                                    text: updatedData.elementdata ? updatedData.elementdata.text : null
                                },
                                tcm: _slateObject.tcm ? true : false,
                                html: updatedData.html
                            };
                            /** Updation of AutoNumbered Elements */
                            if (isAutoNumberingEnabled && nestedEle?.type == 'figure' && autoNumberFigureTypesAllowed.includes(nestedEle?.figuretype) &&
                                autoNumberSettingsOption?.entityUrn === nestedEle.contentUrn) {
                                const dataToReturn = updateAutoNumberedElement(autoNumberSettingsOption?.option, nestedEle,
                                                    { displayedlabel: nestedEle?.displayedlabel, manualoverride: nestedEle?.manualoverride })
                                nestedEle = { ...dataToReturn }
                            }
                        }
                        else if (nestedEle.type === "popup") {
                            if (nestedEle.popupdata["formatted-title"] && nestedEle.popupdata["formatted-title"]["id"] === elementId) {
                                nestedEle = {
                                    ...nestedEle,
                                    popupdata: {
                                        ...nestedEle.popupdata,
                                        "formatted-title": { ...updatedData }
                                    },
                                    tcm: _slateObject.tcm ? true : false //add tcm to popup
                                };
                            }
                            else if (nestedEle.popupdata.postertextobject[0].id === elementId) {
                                nestedEle = {
                                    ...nestedEle,
                                    popupdata: {
                                        ...nestedEle.popupdata,
                                        postertextobject: [{ ...updatedData }]
                                    },
                                    tcm: _slateObject.tcm ? true : false //add tcm to popup
                                };
                            }
                        } else if (nestedEle.type == "showhide" && showHideType) {
                            nestedEle.interactivedata[showHideType].map((showHideData) => {
                                if (showHideData.id == updatedData.id) {
                                    showHideData.elementdata.text = updatedData.elementdata.text;
                                    showHideData.html = updatedData.html;
                                }
                            })
                        }
                        else if (nestedEle.type == "manifest" && nestedEle.id == parentUrn.manifestUrn) {
                            /*This condition add object of element in existing element  in section of aside */
                            const elementObject = nestedEle.contents.bodymatter.map((ele) => {
                                if (ele.id == elementId) {
                                    ele = {
                                        ...ele,
                                        ...updatedData,
                                        elementdata: {
                                            ...ele.elementdata,
                                            text: updatedData.elementdata ? updatedData.elementdata.text : null
                                        },
                                        tcm: _slateObject.tcm ? true : false,
                                        html: updatedData.html
                                    };
                                    /** Updation of AutoNumbered Elements */
                                    if (isAutoNumberingEnabled && ele?.type == 'figure' && autoNumberFigureTypesAllowed.includes(ele?.figuretype) &&
                                        autoNumberSettingsOption?.entityUrn === ele.contentUrn) {
                                        const dataToReturn = updateAutoNumberedElement(autoNumberSettingsOption?.option, ele, { displayedlabel: ele?.displayedlabel,
                                            manualoverride: ele?.manualoverride })
                                        ele = { ...dataToReturn }
                                    }
                                }
                                else if (ele.type === "popup") {
                                    if (ele.popupdata["formatted-title"] && ele.popupdata["formatted-title"]["id"] === elementId) {
                                        ele = {
                                            ...ele,
                                            popupdata: {
                                                ...ele.popupdata,
                                                "formatted-title": { ...updatedData }
                                            },
                                            tcm: _slateObject.tcm ? true : false //add tcm to popup
                                        };
                                    }
                                    else if (ele.popupdata.postertextobject[0].id === elementId) {
                                        ele = {
                                            ...ele,
                                            popupdata: {
                                                ...ele.popupdata,
                                                postertextobject: [{ ...updatedData }]
                                            },
                                            tcm: _slateObject.tcm ? true : false //add tcm to popup
                                        };
                                    }
                                } else if (ele.type == "showhide" && showHideType) {
                                    ele.interactivedata[showHideType].map((showHideData) => {
                                        if (showHideData.id == updatedData.id) {
                                            showHideData.elementdata.text = updatedData.elementdata.text;
                                            showHideData.html = updatedData.html;
                                        }
                                    })

                                }
                                return ele;
                            })
                            nestedEle.contents.bodymatter = elementObject;
                        }
                        return nestedEle;
                    })
                    element.elementdata.bodymatter = nestedBodyMatter;
                }
            }
            else if (element.type === "popup") {
                if (element.popupdata["formatted-title"] && element.popupdata["formatted-title"]["id"] === elementId) {
                    element = {
                        ...element,
                        popupdata: {
                            ...element.popupdata,
                            "formatted-title": { ...updatedData }
                        },
                        tcm: _slateObject.tcm ? true : false //add tcm to popup
                    };
                }
                else if (element.popupdata && element.popupdata.postertextobject && element.popupdata.postertextobject[0].id === elementId) {
                    element = {
                        ...element,
                        popupdata: {
                            ...element.popupdata,
                            postertextobject: [{ ...updatedData }]
                        },
                        tcm: _slateObject.tcm ? true : false //add tcm to popup
                    };
                }
            }
            else if (element.type === "poetry") {
                if (element.contents["formatted-title"] && element.contents["formatted-title"]["id"] === elementId) {
                    element = {
                        ...element,
                        contents: {
                            ...element.contents,
                            "formatted-title": { ...updatedData }
                        }
                    };
                }
                else if (element.contents["creditsarray"] && element.contents["creditsarray"][0] && element.contents["creditsarray"][0]["id"] === elementId) {
                    element = {
                        ...element,
                        contents: {
                            ...element.contents,
                        }
                    };
                    element.contents.creditsarray[0] = updatedData;
                }
                else {
                    const newPoetryBodymatter = element.contents.bodymatter.map((stanza) => {
                        if (stanza.id === elementId) {
                            stanza = {
                                ...stanza,
                                ...updatedData,
                                tcm: _slateObject.tcm ? true : false,
                            };
                        }
                        return stanza;
                    })
                    element.contents.bodymatter = newPoetryBodymatter;
                }
            } else if (element?.type == "element-aside" && element?.id == asideData?.grandParent?.asideData?.id) { /**updation of PE element inside Aside/WE elements */
                element?.elementdata?.bodymatter.map((elem, index) => {
                    if (elem.type === "poetry") {
                        const newPoetryBodymatter = elem.contents?.bodymatter?.map((stanza) => {
                            if (stanza.id === elementId) {
                                stanza = {
                                    ...stanza,
                                    ...updatedData,
                                    tcm: _slateObject.tcm ? true : false,
                                };
                            }
                            return stanza;
                        })
                        element.elementdata.bodymatter[index].contents.bodymatter = newPoetryBodymatter;
                    } else if (elem?.type === "manifest") {   /**updation of PE element inside WE in section break */
                        elem.contents?.bodymatter.map((elem1, conIndex) => {
                            if (elem1.type === "poetry") {
                                const newPoetryBodymatter = elem1?.contents?.bodymatter?.map((stanza) => {
                                    if (stanza.id === elementId) {
                                        stanza = {
                                            ...stanza,
                                            ...updatedData,
                                            tcm: _slateObject.tcm ? true : false,
                                        };
                                    }
                                    return stanza;
                                })
                                element.elementdata.bodymatter[index].contents.bodymatter[conIndex].contents.bodymatter = newPoetryBodymatter;
                            }
                        })
                    }
                })
            }  else if (element?.type == "groupedcontent" && element?.id == asideData?.grandParent?.asideData?.id) { /**updation of PE element inside multicolumn elements */
                element.groupeddata?.bodymatter.map((elem, index) => {
                    elem.groupdata?.bodymatter?.map((elem1, groupIndex)=>{
                        if (elem1?.type === "poetry") {
                            const newPoetryBodymatter = elem1.contents?.bodymatter?.map((stanza) => {
                                if (stanza.id === elementId) {
                                    stanza = {
                                        ...stanza,
                                        ...updatedData,
                                        tcm: _slateObject.tcm ? true : false,
                                    };
                                }
                                return stanza;
                            })
                            element.groupeddata.bodymatter[index].groupdata.bodymatter[groupIndex].contents.bodymatter = newPoetryBodymatter;
                        }
                    })
                })
            }
            else if(isBlockListElement){
                let indexes = parentElement.index.split("-")
                if(asideData.parent && asideData.parent.type==="showhide"){
                    if(indexes.length===5){
                        _slateBodyMatter[indexes[0]].interactivedata[asideData?.parent?.showHideType][indexes[2]].listdata.bodymatter[indexes[3]]
                        .listitemdata.bodymatter[indexes[4]] = updatedData
                    }
                    else if(indexes.length===7){
                        _slateBodyMatter[indexes[0]].interactivedata[asideData?.parent?.showHideType][indexes[2]].listdata.bodymatter[indexes[3]]
                        .listitemdata.bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]] = updatedData
                    }
                    else if(indexes.length===9){
                        _slateBodyMatter[indexes[0]].interactivedata[asideData?.parent?.showHideType][indexes[2]].listdata.bodymatter[indexes[3]]
                        .listitemdata.bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]].listdata.bodymatter[indexes[7]]
                        .listitemdata.bodymatter[indexes[8]] = updatedData
                    }
                    else{
                        _slateBodyMatter[indexes[0]].interactivedata[asideData?.parent?.showHideType][indexes[2]].listdata.bodymatter[indexes[3]]
                        .listitemdata.bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]].listdata.bodymatter[indexes[7]]
                        .listitemdata.bodymatter[indexes[8]].listdata.bodymatter[indexes[9]].listitemdata.bodymatter[indexes[10]] = updatedData
                    } // check the update of BL in Tab element of TB
                } else if (asideData?.parent?.type === MULTI_COLUMN && asideData?.parent?.subtype === TAB && asideData?.type === BLOCK_LIST) {
                    switch (indexes.length) {
                        case 6: // TB:Tab:c1:BL Level 1 nesting
                            _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]]
                            .groupdata.bodymatter[indexes[3]].listdata.bodymatter[indexes[4]].listitemdata.bodymatter[indexes[5]] = updatedData;
                            break;
                        case 8: // TB:Tab:c1:BL Level 2 nesting
                        _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]]
                        .groupdata.bodymatter[indexes[3]].listdata.bodymatter[indexes[4]].listitemdata.bodymatter[indexes[5]].listdata.bodymatter[indexes[6]]
                        .listitemdata.bodymatter[indexes[7]] = updatedData;
                            break;
                        case 10: // TB:Tab:c1:BL Level 3 nesting
                        _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]]
                        .groupdata.bodymatter[indexes[3]].listdata.bodymatter[indexes[4]].listitemdata.bodymatter[indexes[5]].listdata
                        .bodymatter[indexes[6]].listitemdata.bodymatter[indexes[7]].listdata.bodymatter[indexes[8]].listitemdata.bodymatter[indexes[9]] = updatedData;
                            break;
                        case 12: // TB:Tab:c1:BL Level 4 nesting
                        _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata
                        .bodymatter[indexes[3]].listdata.bodymatter[indexes[4]].listitemdata.bodymatter[indexes[5]].listdata.bodymatter[indexes[6]].listitemdata
                        .bodymatter[indexes[7]].listdata.bodymatter[indexes[8]].listitemdata.bodymatter[indexes[9]].listdata.bodymatter[indexes[10]].listitemdata
                        .bodymatter[indexes[11]] = updatedData;
                            break;
                    }
                }else if(asideData.parent && asideData.parent.type==="groupedcontent" && asideData?.type === 'manifestlist'){
                    if(indexes.length===5){
                        _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].listdata.bodymatter[indexes[3]].listitemdata
                        .bodymatter[indexes[4]] = updatedData
                    }
                    else if(indexes.length===7){
                        _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].listdata.bodymatter[indexes[3]].listitemdata
                        .bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]] = updatedData
                    }
                    else if(indexes.length===9){
                        _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].listdata.bodymatter[indexes[3]].listitemdata
                        .bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]].listdata.bodymatter[indexes[7]].listitemdata
                        .bodymatter[indexes[8]] = updatedData
                    }
                    else{
                        _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].listdata.bodymatter[indexes[3]].listitemdata
                        .bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]].listdata.bodymatter[indexes[7]].listitemdata
                        .bodymatter[indexes[8]].listdata.bodymatter[indexes[9]].listitemdata.bodymatter[indexes[10]] = updatedData
                    }
                } // check the update of BL in multicolumn and according to the BL's length update the updated data
                // check the update of BL in Aside/WE header and according to the BL's length update the updated data
                else if( _slateBodyMatter[indexes[0]]?.type === "element-aside" && _slateBodyMatter[indexes[0]].elementdata.bodymatter[indexes[1]].type === "manifestlist"){
                    if(indexes.length===4){
                        _slateBodyMatter[indexes[0]].elementdata.bodymatter[indexes[1]].listdata.bodymatter[indexes[2]].listitemdata.bodymatter[indexes[3]] = updatedData
                    }
                    else if(indexes.length===6){
                        _slateBodyMatter[indexes[0]].elementdata.bodymatter[indexes[1]].listdata.bodymatter[indexes[2]].listitemdata.bodymatter[indexes[3]].listdata
                        .bodymatter[indexes[4]].listitemdata.bodymatter[indexes[5]] = updatedData
                    }
                    else if(indexes.length===8){
                        _slateBodyMatter[indexes[0]].elementdata.bodymatter[indexes[1]].listdata.bodymatter[indexes[2]].listitemdata.bodymatter[indexes[3]].listdata
                        .bodymatter[indexes[4]].listitemdata.bodymatter[indexes[5]].listdata.bodymatter[indexes[6]].listitemdata.bodymatter[indexes[7]] = updatedData
                    }
                    else{
                        _slateBodyMatter[indexes[0]].elementdata.bodymatter[indexes[1]].listdata.bodymatter[indexes[2]].listitemdata.bodymatter[indexes[3]].listdata
                        .bodymatter[indexes[4]].listitemdata.bodymatter[indexes[5]].listdata.bodymatter[indexes[6]].listitemdata.bodymatter[indexes[7]].listdata
                        .bodymatter[indexes[8]].listitemdata.bodymatter[indexes[9]] = updatedData
                    }
                }// check the update of BL in WE body and according to the BL's length update the updated data
                else if(_slateBodyMatter[indexes[0]]?.type === "element-aside" && _slateBodyMatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents
                .bodymatter[indexes[2]].type === "manifestlist"){
                    if(indexes.length===5){
                        _slateBodyMatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].listdata.bodymatter[indexes[3]]
                        .listitemdata.bodymatter[indexes[4]] = updatedData
                    }
                    else if(indexes.length===7){
                        _slateBodyMatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].listdata.bodymatter[indexes[3]]
                        .listitemdata.bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]] = updatedData
                    }
                    else if(indexes.length===9){
                        _slateBodyMatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].listdata.bodymatter[indexes[3]]
                        .listitemdata.bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]].listdata.bodymatter[indexes[7]]
                        .listitemdata.bodymatter[indexes[8]] = updatedData
                    }
                    else{
                        _slateBodyMatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].listdata.bodymatter[indexes[3]]
                        .listitemdata.bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]].listdata.bodymatter[indexes[7]]
                        .listitemdata.bodymatter[indexes[8]].listdata.bodymatter[indexes[9]].listitemdata.bodymatter[indexes[10]] = updatedData
                    }
                }
                else{
                    indexes = elementIndex.split("-");
                    if(indexes.length===3){
                        _slateBodyMatter[indexes[0]].listdata.bodymatter[indexes[1]].listitemdata.bodymatter[indexes[2]] = updatedData
                    }
                    else if(indexes.length===5){
                        _slateBodyMatter[indexes[0]].listdata.bodymatter[indexes[1]].listitemdata.bodymatter[indexes[2]].listdata.bodymatter[indexes[3]]
                        .listitemdata.bodymatter[indexes[4]] = updatedData
                    }
                    else if(indexes.length===7){
                        _slateBodyMatter[indexes[0]].listdata.bodymatter[indexes[1]].listitemdata.bodymatter[indexes[2]].listdata.bodymatter[indexes[3]]
                        .listitemdata.bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]] = updatedData
                    }
                    else{
                        _slateBodyMatter[indexes[0]].listdata.bodymatter[indexes[1]].listitemdata.bodymatter[indexes[2]].listdata.bodymatter[indexes[3]]
                        .listitemdata.bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]].listdata.bodymatter[indexes[7]]
                        .listitemdata.bodymatter[indexes[8]] = updatedData
                    }
                }
            } else if(element?.type === SHOW_HIDE && asideData?.type === 'poetry' && element?.id == asideData?.grandParent?.asideData?.id)
                { /**updation of stanza inside PE element inside SH */
                const sectionType = asideData?.showHideType;
                element?.interactivedata?.[sectionType].forEach((showHideData, showHideIndex) => {
                    if(showHideData?.type === 'poetry' && showHideData?.id === asideData?.id) {
                        const newPoetryBodymatter = showHideData?.contents?.bodymatter.map((stanza) => {
                            if (stanza.id === elementId) {
                                stanza = {
                                    ...stanza,
                                    ...updatedData,
                                    tcm: _slateObject.tcm ? true : false,
                                };
                            }
                            return stanza;
                        });
                        element.interactivedata[sectionType][showHideIndex].contents.bodymatter = newPoetryBodymatter;
                    }
                });
            }
            //else if (element.type === SHOW_HIDE) { 
            //    /* When showhide Element is placed on slate not inside other container */
            //    const indexs = elementIndex?.toString()?.split("-") || [];
            //    if (indexs?.length == 3) {
            //        updateShowhideElements(element, updatedData, indexs)
            //    }
            //}

            return element
        })
    }
    _slateContent.bodymatter = _slateBodyMatter
    _slateObject.contents = _slateContent
    return dispatch({
        type: AUTHORING_ELEMENT_UPDATE,
        payload: {
            slateLevelData: newslateData
        }
    })
}
/**
*  @description {Function} updateShowhideElements -  To update the store on update of showhide inner elemetns 
*  @param {Object} element - showhide object data 
*  @param {Object} updatedData - updated data of inner elements 
*  @param {Array}  indexs - indexs of element heirarchy */
export function updateShowhideElements(element, updatedData, indexs, {isAutoNumberingEnabled,autoNumberSettingsOption, updatedSH_Object}) {
    if(element?.type === SHOW_HIDE) {
        /* Get the section type of showhide; Index of section (indexs?.length - 2) */
        const section = findSectionType(indexs[indexs?.length - 2]);
        section && element.interactivedata[section].forEach((showHideElement) => {
            if (showHideElement.id == updatedData.id) {
                showHideElement.html = updatedData.html; /* For figure/Text */
                if(showHideElement?.type === AUTHORED_TEXT) { /* For update paragraph - TEXT */
                    showHideElement.elementdata.text = updatedData.elementdata.text;
                } else if(showHideElement?.type === FIGURE) { /* For update - FIGURE */
                    /** Updation of AutoNumbered Elements */
                    if (isAutoNumberingEnabled && autoNumberFigureTypesAllowed.includes(showHideElement?.figuretype) &&
                        autoNumberSettingsOption?.entityUrn === updatedData.contentUrn) {
                        updateFigureElement_InSH(autoNumberSettingsOption?.option, showHideElement,
                        { displayedlabel: updatedData?.displayedlabel, manualoverride: updatedData?.manualoverride })
                    }
                    showHideElement.figuredata = updatedData?.figuredata;
                } else if(showHideElement?.type === ELEMENT_DIALOGUE) { /* For update PS  - linenumber */
                    showHideElement.elementdata = updatedData?.elementdata;
                }
            }
        })
    }
}

export const updateFigureElement_InSH = (autoNumberOption, oldElement, { displayedlabel, manualoverride }) => {
    const {
        AUTO_NUMBER_SETTING_DEFAULT,
        AUTO_NUMBER_SETTING_RESUME_NUMBER,
        AUTO_NUMBER_SETTING_REMOVE_NUMBER,
        AUTO_NUMBER_SETTING_OVERRIDE_NUMBER,
        AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER
    } = LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES
    switch (autoNumberOption) {
        case AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER:
            oldElement.manualoverride = manualoverride
            oldElement.numberedandlabel = true
            if (oldElement?.hasOwnProperty('displayedlabel')) {
                delete oldElement.displayedlabel
            }
            break;
        case AUTO_NUMBER_SETTING_RESUME_NUMBER:
        case AUTO_NUMBER_SETTING_OVERRIDE_NUMBER:
            oldElement.displayedlabel = displayedlabel
            oldElement.manualoverride = manualoverride
            oldElement.numberedandlabel = true
            break;
        case AUTO_NUMBER_SETTING_REMOVE_NUMBER:
            oldElement.numberedandlabel = false
            if (oldElement?.hasOwnProperty('displayedlabel')) {
                delete oldElement.displayedlabel
            }
            if (oldElement?.hasOwnProperty('manualoverride')) {
                delete oldElement.manualoverride
            }
            break;
        case AUTO_NUMBER_SETTING_DEFAULT:
        default:
            oldElement.numberedandlabel = true
            oldElement.displayedlabel = displayedlabel
            if (oldElement?.hasOwnProperty('manualoverride')) {
                delete oldElement.manualoverride
            }
            break;
    }
}
export const collectDataAndPrepareTCMSnapshot = async (params) => {
    const {
        getState,
        dispatch,
        updatedData,
        parentElement,
        responseData,
        currentSlateData,
        asideData,
        parentUrn,
        elementIndex,
        showHideType = undefined,
        poetryData,
        updateBodymatter,
        currentParentData,
        showHideObj
    } = params
    const isElementInBlockList = isElementInsideBlocklist({ index: elementIndex }, currentParentData)
    const assetRemoveidForSnapshot = getState().assetPopOverSearch.assetID;
    const isPopupOrShowhideElement = ((parentElement?.type === POOPUP_ELEMENT) || (parentElement?.type === SHOW_HIDE &&
        !(updatedData?.metaDataField || updatedData?.sectionType === 'creditsarray'))|| (asideData?.type === SHOW_HIDE && parentElement?.type === MULTI_COLUMN)) &&
        (updatedData.metaDataField !== undefined || updatedData.sectionType !== undefined) ? true : false;
    const noAdditionalFields = (updatedData.metaDataField == undefined && (updatedData.sectionType == undefined || updatedData.sectionType == 'bodymatter')) ? true : false
    const oldFigureData = getState().appStore.oldFiguredata
    //This check will be removed once Blocklist will support TCM
    // Check modified to prevent snapshots for TB element. This will be removed when TB supports TCM
    const isTbElement = asideData?.subtype === TAB || asideData?.parent?.subtype === TAB || asideData?.grandParent?.asideData?.subtype === TAB ||
        asideData?.grandParent?.asideData?.parent?.subtype === TAB;
    if (asideData?.type !== "manifestlist" && !isTbElement) {
        if (elementTypeTCM.indexOf(responseData.type) !== -1 && (isPopupOrShowhideElement || noAdditionalFields) && !isElementInBlockList) {
            const containerElement = {
                asideData,
                parentUrn,
                poetryData,
                showHideObj,
                parentElement: allowedParentType.includes(parentElement?.type) ? parentElement : undefined,
                metaDataField: parentElement && parentElement.type === 'popup' && updatedData.metaDataField ? updatedData.metaDataField : undefined,
                sectionType: allowedParentType.includes(parentElement?.type) && updatedData.sectionType ? updatedData.sectionType : showHideType,
                CurrentSlateStatus: currentSlateData?.status
            },
                elementUpdateData = {
                    currentParentData,
                    updateBodymatter,
                    response: responseData,
                    updatedId: updatedData.id,
                    slateManifestUrn: config.slateManifestURN,
                    CurrentSlateStatus: currentSlateData?.status,
                    figureData: oldFigureData,
                    cypressPlusProjectStatus: getState()?.appStore?.isCypressPlusEnabled

                }

            if (!config.isCreateGlossary) {
                await tcmSnapshotsForUpdate(elementUpdateData, elementIndex, containerElement, dispatch, assetRemoveidForSnapshot);
            }
            config.isCreateGlossary = false
        }
    }
    return false
}


export const processAndStoreUpdatedResponse = async (params) => {
    const {
        updatedData,
        elementIndex,
        parentUrn,
        asideData,
        showHideType,
        parentElement,
        getState,
        dispatch,
        poetryData,
        updateBodymatter,
        responseData,
        fetchSlateData,
        showHideObj
    } = params

    const parentData = getState().appStore.slateLevelData;
    const currentParentData = JSON.parse(JSON.stringify(parentData));
    const currentSlateData = currentParentData[config.slateManifestURN];
    let { glossaryFootnoteValue, glossaryFootNoteCurrentValue, elementIndex: elementIndexFootnote } = getState().glossaryFootnoteReducer
    let { markedIndexValue, markedIndexCurrentValue, elementIndex: elementMarkedIndex } = getState().markedIndexReducer
    const { assessmentItemAutoUpdateData, updatedAssessmentArray } = getState().assessmentReducer;
    // update Element in store based on AutoNumber Settings
    const autoNumberSettingsOption = getState().autoNumberReducer?.autoNumberOption
    const isAutoNumberingEnabled= getState().autoNumberReducer?.isAutoNumberingEnabled
    const autoNumberDetails = {autoNumberSettingsOption,isAutoNumberingEnabled}
    // sending the VCS API call for the assessment items
    if(assessmentItemAutoUpdateData?.length) {
        assessmentItemAutoUpdateData.forEach(item => {
            if(item && item.oldAssessmentId && item.newAssessmentId && !updatedAssessmentArray?.includes(item.newAssessmentId)) {
                dispatch(updateAssessmentVersion(item.oldAssessmentId, item.newAssessmentId));
            }
        })
    }
    if(responseData.id !== updatedData.id){
        glossaryFootnoteValue.elementWorkId = responseData.id;
        dispatch({
            type: OPEN_GLOSSARY_FOOTNOTE,
            payload: {
                glossaaryFootnoteValue: glossaryFootnoteValue,
                glossaryFootNoteCurrentValue: glossaryFootNoteCurrentValue,
                elementIndex: elementIndexFootnote
            }
        })
    }

    if(responseData.id !== updatedData.id){
        markedIndexValue.elementWorkId = responseData.id;
        dispatch({
            type: OPEN_MARKED_INDEX,
            payload: {
                markedIndexValue: markedIndexValue,
                markedIndexCurrentValue: markedIndexCurrentValue,
                elementIndex: elementMarkedIndex
            }
        })
    }

    const commonArgs = { updatedData, elementIndex, parentUrn, asideData, parentElement, currentSlateData, getState, dispatch, responseData, showHideType, autoNumberDetails }

    /** [PCAT-8289] -- TCM Snapshot Data handling --*/
    const snapshotArgs = {
        ...commonArgs,
        poetryData,
        updateBodymatter,
        currentParentData,
        showHideObj
    }
    if (currentSlateData && currentSlateData.status === 'approved') {
        await collectDataAndPrepareTCMSnapshot(snapshotArgs)
    } else {
        collectDataAndPrepareTCMSnapshot(snapshotArgs)
    }

    /** Check applied so that element does not gets copied to next slate while navigating */
    if (config.slateManifestURN === updatedData.slateVersionUrn) {
        const argObj = {
            ...commonArgs,
            showHideType,
            fetchSlateData
        }
        updateStore(argObj)
    }
    /**Cypress plus code  for conversion of pdf */
    if (updatedData?.type == elementTypeConstant.PDF_SLATE && config.isCypressPlusEnabled && config.SHOW_CYPRESS_PLUS) {
        const response = await startPdfConversion(updatedData?.id)
        if (response?.data?.status === 'success') {
            poolFunc(updatedData?.id);
        }
    }
    
    sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })  //hide saving spinner
    config.isSavingElement = false
    customEvent.trigger('glossaryFootnoteSave', responseData.id); 
    customEvent.trigger('markedIndexSave', responseData.id); 
    config.popupCreationCallInProgress = false;
    showLinkToast(document.getElementById('link-notification'))
}

export const showLinkToast = (toastNode) => {
    if(toastNode.innerText !== "") {
        toastNode.style.display = "block";
        setTimeout(() => {
            toastNode.style.display = "none";
            toastNode.innerText = "";
        }, 4000);
    }
}

export const updateStore = (paramObj) => {
    const {
        updatedData,
        elementIndex,
        parentUrn,
        asideData,
        showHideType,
        parentElement,
        currentSlateData,
        getState,
        dispatch,
        responseData,
        fetchSlateData
    } = paramObj

    const commonArgs = {
        updatedData, responseData, getState, dispatch
    }
    const isTbElement = asideData?.subtype === TAB || asideData?.parent?.subtype === TAB || asideData?.grandParent?.asideData?.subtype === TAB ||
        asideData?.grandParent?.asideData?.parent?.subtype === TAB;
    if ((updatedData?.loData) || updatedData.elementVersionType === "element-generateLOlist") {
        if (updatedData?.loData?.length && responseData?.loData?.length) {
            updateMetadataAnchorLOsinStore({...commonArgs,currentSlateData})
        }
    } else if (responseData.id !== updatedData.id) {
        if (currentSlateData.status === 'wip') {
            const argObjForWip = { updatedData, getState, dispatch, asideData, parentUrn, elementIndex, showHideType, parentElement, versionedData: responseData, fetchSlateData }
            updateStoreInCanvas(argObjForWip);
            dispatch({
                type: "SET_ELEMENT_STATUS",
                payload: {
                    elementWorkId: responseData.id,
                    elementVersioningStatus: "wip"
                }
            })
            config.savingInProgress = false
        } else if (currentSlateData.status === 'approved') {
            if (currentSlateData.type === "popup") {
                if (config.tcmStatus) {
                    if (elementTypeTCM.indexOf(updatedData.type) !== -1 && !isTbElement) {
                        const tcmDataArgs = {
                            updatedDataID: updatedData.id, getState, dispatch, versionedData: responseData, updatedData
                        }
                        prepareDataForUpdateTcm(tcmDataArgs);
                    }
                }
                sendDataToIframe({ 'type': "tocRefreshVersioning", 'message' :true });
                sendDataToIframe({ 'type': "ShowLoader", 'message': { status: true } });
                    dispatch(fetchSlateData(currentSlateData.id, currentSlateData.contentUrn, 0, currentSlateData, "", false));
            } else {
                sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' }); 
            }
        }
    }
    else if (showHideType && showHideType === "postertextobject") {
        const argsForPostertext = { 
            getState, 
            dispatch,
            updatedData: { ...updatedData, ...responseData },
            asideData,
            parentUrn,
            versionedData: null,
            elementIndex,
            showHideType,
            parentElement,
            fetchSlateData
        }
        updateStoreInCanvas(argsForPostertext)
        let revelDOM = document.querySelector(`div[data-id="${responseData.id}"]`)
        if (revelDOM) revelDOM.classList.remove("place-holder")
    }
    return false
}

export const updateStoreInCanvas = (params) => {
    const {
        updatedData,
        asideData,
        parentUrn,
        dispatch,
        getState,
        versionedData,
        elementIndex,
        showHideType,
        parentElement,
        fetchSlateData,
        isFromRC,
        upadtedSlateData
    } = params
    //direct dispatching in store
    const slateParentData = isFromRC ? upadtedSlateData : getState().appStore.slateLevelData;
    const newslateData = JSON.parse(JSON.stringify(slateParentData));
    // update Element in store based on AutoNumber Settings
    const autoNumberSettingsOption = getState().autoNumberReducer?.autoNumberOption
    const isAutoNumberingEnabled= getState().autoNumberReducer?.isAutoNumberingEnabled
    const autoNumberDetails = {autoNumberSettingsOption,isAutoNumberingEnabled}
    const isTbElement = asideData?.subtype === TAB || asideData?.parent?.subtype === TAB || asideData?.grandParent?.asideData?.subtype === TAB ||
            asideData?.grandParent?.asideData?.parent?.subtype === TAB;
    //tcm update code
    const isPopupOrShowhideElement = parentElement && (parentElement.type === 'popup' || parentElement.type === 'showhide') && (updatedData.metaDataField !== undefined ||
            updatedData.sectionType !== undefined) ? true : false;
    const noAdditionalFields = (updatedData.metaDataField == undefined && (updatedData.sectionType == undefined || updatedData.sectionType == 'bodymatter')) ? true : false;
    if (config.tcmStatus) {
        //This check will be removed once Blocklist will support TCM
        const isBlockListElement  = isElementInsideBlocklist({index:elementIndex},newslateData)
        if(asideData?.type !== "manifestlist") {
        if(!isBlockListElement) {
            if (elementTypeTCM.indexOf(updatedData.type) !== -1 && (isPopupOrShowhideElement || noAdditionalFields) && !isTbElement) {
                const tcmDataArgs = {
                    updatedDataID: updatedData.id, getState, dispatch, versionedData, updatedData
                }
                prepareDataForUpdateTcm(tcmDataArgs);
            }
        }}
    }
    const commonArgs = { updatedData, asideData, dispatch, elementIndex, parentElement, newslateData, autoNumberDetails }
    if(versionedData){
        const argObj = {
            ...commonArgs,
            versionedData,
            fetchSlateData,
            slateManifestURN: config.slateManifestURN
        }
        updateNewVersionElementInStore(argObj)
    }
    else {
        const argObj = {
            ...commonArgs,
            parentUrn,
            showHideType,
            isFromRC,
            slateParentData
        }
        updateElementInStore(argObj)
    }
}

export const prepareDataForUpdateTcm = ({ updatedDataID, getState, dispatch, versionedData, updatedData }) => {
    if (updatedData.hasOwnProperty("figuretype") && !allowedFigureTypesForTCM.includes(updatedData.figuretype)) {
        return false
    }
    const cypressPlusProjectStatus = getState()?.appStore?.isCypressPlusEnabled
    if (cypressPlusProjectStatus && updatedData?.type === 'element-pdf') {
        return false; // disable TCM for all PDF slates in Cypress+ Enabled Projects
    }
    const tcmData = getState().tcmReducer.tcmSnapshot;
    let indexes = []
    tcmData && tcmData.filter(function (element, index) {
    if (element && element.elemURN && (element.elemURN.indexOf(updatedDataID) !== -1 && element.elemURN.includes('urn:pearson:work'))) {
            indexes.push(index)
        }
    });
    // if index is single value
    if (indexes.length == 0 || (versionedData && updatedDataID !== versionedData.id)) {
        tcmData.push({
            "txCnt": 1,
            "isPrevAcceptedTxAvailable": false,
            "elemURN": versionedData && updatedDataID !== versionedData.id ? versionedData.id : updatedDataID,
            "feedback": null
        })
    }
    else {
    // if index is multiple value value (incase of cut paste in show hide)
    if(Array.isArray(indexes) && indexes.length > 0) {
        indexes.forEach(indexItem => {
            if(tcmData && tcmData[indexItem] && updatedDataID){
                tcmData[indexItem]["elemURN"] = updatedDataID
                tcmData[indexItem]["txCnt"] = 1
                tcmData[indexItem]["feedback"] = tcmData[indexItem]["feedback"] !== null ? tcmData[indexItem]["feedback"] : null
                tcmData[indexItem]["isPrevAcceptedTxAvailable"] = tcmData[indexItem]["isPrevAcceptedTxAvailable"] ? tcmData[indexItem]["isPrevAcceptedTxAvailable"] : false    
                }
            })
    }
}
  
    if (tcmData.length >0) {
        sendDataToIframe({ 'type': 'projectPendingTcStatus', 'message': 'true' });
    }
    dispatch({
        type: GET_TCM_RESOURCES,
        payload: {
            data: tcmData
        }
    })
}

/**
 * This function updated the LO in Metadata Anchor elements on slate
 * @returns updated Slate Bodymatter
 */
export const updateLOInCanvasStore = ({ updatedLO, _slateBodyMatter, activeIndex }) => {
    const indexes = updatedLO.loIndex[activeIndex].toString().split("-");
    let bodyMatterContent = [..._slateBodyMatter];
    switch (indexes.length) {
        case 1: /** Metadata Anchor on Slate */
            bodyMatterContent[indexes[0]] = {
                ...bodyMatterContent[indexes[0]],
                elementdata: updatedLO.elementdata
            }
            break;
        case 2: /** Metadata Anchor in Aside | WE:HEAD */
            let element = bodyMatterContent[indexes[0]].elementdata.bodymatter[indexes[1]]
            bodyMatterContent[indexes[0]].elementdata.bodymatter[indexes[1]] = {
                ...element,
                elementdata: updatedLO.elementdata
            }
            break;
        case 3: /** Metadata Anchor in WE:BODY */
            let weElement = bodyMatterContent[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]]
            bodyMatterContent[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]] = {
                ...weElement,
                elementdata: updatedLO.elementdata
            }
            break;
        default:
            break;
    }
    return bodyMatterContent;
}

export const updateMetadataAnchorLOsinStore = ({ updatedData, responseData, getState, dispatch, currentSlateData }) => {
    updatedData.loData.forEach((loUpdate) => {
        let responseLOData = responseData.loData.find(loItem => loItem.elementdata.loref === loUpdate.elementdata.loref)
        const updatedArgs = {
            oldLO_Data: loUpdate,
            newLO_Data: responseLOData,
            getState, dispatch
        }
        for (let i = 0; i < loUpdate.metaDataAnchorID.length; i++) {
            if (loUpdate.metaDataAnchorID[i] !== responseLOData.metaDataAnchorID[i]) {
                if (currentSlateData.status === 'wip') {
                    updateLOInStore({ ...updatedArgs, activeIndex: i });
                } else if (currentSlateData.status === 'approved') {
                    sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
                }
                break;
            }
        }
    })
}

export const updateLOInStore = ({ oldLO_Data, newLO_Data, getState, dispatch, activeIndex }) => {
    const parentData = getState().appStore.slateLevelData;
    let newslateData = JSON.parse(JSON.stringify(parentData));
    let bodyMatterContent = newslateData[config.slateManifestURN].contents.bodymatter;
    if (newLO_Data) {
        const indexes = oldLO_Data?.loIndex[activeIndex]?.toString().split("-");
        switch (indexes.length) {
            case 1: /** Metadata Anchor on Slate */
                bodyMatterContent[indexes[0]].id = newLO_Data.metaDataAnchorID[activeIndex]
                break;
            case 2: /** Metadata Anchor in Aside | WE:HEAD */
                bodyMatterContent[indexes[0]].elementdata.bodymatter[indexes[1]].id = newLO_Data.metaDataAnchorID[activeIndex]
                break;
            case 3: /** Metadata Anchor in WE:BODY */
                bodyMatterContent[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].id = newLO_Data.metaDataAnchorID[activeIndex]
                break;
            default:
                break;
        }
    }
    newslateData[config.slateManifestURN].contents.bodymatter =  bodyMatterContent;
    return dispatch({
        type: AUTHORING_ELEMENT_UPDATE,
        payload: {
            slateLevelData: newslateData
        }
    })
}


const getShowhideParent = async (shParentData) => {
    const { asideData, dispatch, parentElementIndex, fetchSlateData } = shParentData;
    let parentToCascade = {}
    if (asideData && asideData.type == 'showhide') {
          /* After versioning - Slate in wip but element(3C/2C:SH) is approved; 3C/2C:SH */
        if (asideData?.grandParent?.asideData?.type == 'groupedcontent') {
            parentToCascade = asideData?.grandParent?.asideData
        } else if (asideData?.grandParent?.asideData?.type == 'element-aside') {
            if (asideData?.grandParent?.asideData?.parent?.type == 'groupedcontent') {
                parentToCascade = asideData?.grandParent?.asideData?.parent
                parentToCascade.contentUrn = parentToCascade.parentContentUrn ?  parentToCascade.parentContentUrn :  parentToCascade.contentUrn
            }
            else {
                parentToCascade = asideData?.grandParent?.asideData
            }
        } else {
            parentToCascade = asideData
        }
    }
    if (parentToCascade) {
        await cascadeElement(parentToCascade, dispatch, parentElementIndex, fetchSlateData, 'showhide')
    }
}

const cascadeElement = async (parentElement, dispatch, parentElementIndex, fetchSlateData, calledFrom) => {
    parentElement.indexes = parentElementIndex;
    parentElement.callFrom = calledFrom
    await dispatch(fetchSlateData(parentElement.id, parentElement.contentUrn, 0, parentElement,"")); 
}