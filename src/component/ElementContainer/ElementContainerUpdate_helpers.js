// Helper methods
import { customEvent } from '../../js/utils';
import { tcmSnapshotsForUpdate } from '../TcmSnapshots/TcmSnapshots_Utility.js';
import { sendDataToIframe } from '../../constants/utility.js';
import { updateAssessmentVersion } from '../../component/AssessmentSlateCanvas/AssessmentActions/assessmentActions.js';
//Constants
import {
    AUTHORING_ELEMENT_UPDATE,
    OPEN_GLOSSARY_FOOTNOTE,
    GET_TCM_RESOURCES, 
} from "../../constants/Action_Constants";
import ElementConstants, { 
    elementTypeTCM,
    allowedFigureTypesForTCM,
    allowedParentType
} from "./ElementConstants";

import config from '../../config/config';
import { findSectionType, getShowHideElement } from '../ShowHide/ShowHide_Helper';

const { AUTHORED_TEXT, SHOW_HIDE, FIGURE } = ElementConstants;

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

    if (updatedData && updatedData.pageNumberRef) {
        versionedData.pageNumberRef = updatedData.pageNumberRef
    }
    let indexes = elementIndex && elementIndex.length > 0 ? elementIndex.split('-') : 0;
    if (asideData && asideData.type == 'element-aside') {
        asideData.indexes = indexes;
        if (indexes.length === 2 || indexes.length === 3) {
            dispatch(fetchSlateData(versionedData.newParentVersion ? versionedData.newParentVersion : asideData.id, asideData.contentUrn, 0, asideData, CONTAINER_VERSIONING, false));
        }
    }
    else if (parentElement && PARENTELEMENT_TYPES.includes(parentElement.type)) {
        parentElement.index = elementIndex;
        parentElement.indexes = elementIndex;
        dispatch(fetchSlateData(parentVersionUrn, parentElement.contentUrn, 0, parentElement, CONTAINER_VERSIONING, false));
    } 
    else if (parentElement && parentElement.type === "popup" && updatedData.elementParentEntityUrn && (updatedData.metaDataField || updatedData.sectionType === "postertextobject") ) {
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
        newslateData
    } = paramsObj

    let _slateObject = newslateData[updatedData.slateVersionUrn],
        { contents: _slateContent } = _slateObject,
        { bodymatter: _slateBodyMatter } = _slateContent,
        elementId = updatedData.id;

    const iList = elementIndex?.toString()?.split("-") || [];
    /* update the store on update of showhide elements inside container elements */
    if(asideData?.type === SHOW_HIDE && iList?.length >= 3) {
        const sh_Object = getShowHideElement(_slateBodyMatter, iList?.length, iList);
        updateShowhideElements(sh_Object, updatedData, iList);
    } else
    if(parentElement && parentElement.type === "citations"){
        if(updatedData.type === "element-citation"){
            const indexes = elementIndex.split("-")
            _slateBodyMatter[indexes[0]].contents.bodymatter[indexes[1] - 1] = {...updatedData,
                tcm: _slateObject.tcm ? true : false
            }
        }
        else {
            if(updatedData.type === "element-authoredtext"){
                _slateBodyMatter[elementIndex].contents["formatted-title"] = {...updatedData}     
            }
        }
    } else if (parentElement && parentElement.type === "groupedcontent") {
        const indexes = elementIndex.split("-")
        let element = _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]]
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
        })
    } else if(asideData?.parent?.type === "groupedcontent") {
        /** updation of aside and WE elements inside multicolumn */
        /* 2C:AS/WE:PS */
        const indexes = elementIndex?.split("-");
        /* 2C:AS/WE-HEAD:PS */
        if(indexes?.length == 4 && parentUrn?.elementType === "element-aside") {
           if(parentElement?.type === "popup") {
                const element =  _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].popupdata;
                if(updatedData.sectionType === "postertextobject"){
                    _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].popupdata.postertextobject[0] = {
                        ...element.postertextobject[0],
                        html: updatedData?.html,
                        elementdata: {
                            ...element.postertextobject[0].elementdata,
                            text: updatedData?.elementdata?.text
                        },
                    }
                } else {
                    _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].popupdata["formatted-title"] = {
                        ...element["formatted-title"],
                        html: updatedData?.html,
                        elementdata: {
                            ...element["formatted-title"].elementdata,
                            text: updatedData?.elementdata?.text
                        },
                    }
                }
            }else if (parentElement?.type == "showhide" && showHideType) {
                _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].interactivedata[showHideType].map((showHideData) => {
                    if (showHideData.id == updatedData.id) {
                        showHideData.elementdata.text = updatedData.elementdata.text;
                        showHideData.html = updatedData.html;
                    }
                })
            }
            else {
                /** updation of text and figure elements inside aside/WE of multicolumn */
                const element = _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]];
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
                const element =  _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].contents.bodymatter[indexes[4]].popupdata;
                if(updatedData.sectionType === "postertextobject"){ /* 2C:WE-BODY/Section Break:Popup: posterobjectdata*/
                    _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].contents.bodymatter[indexes[4]].popupdata.postertextobject[0] = {
                        ...element.postertextobject[0],
                        html: updatedData?.html,
                        elementdata: {
                            ...element.postertextobject[0].elementdata,
                            text: updatedData?.elementdata?.text
                        },
                    }
                } else { /* 2C:WE-BODY/Section Break:Popup: formatted-title */
                    _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].contents.bodymatter[indexes[4]].popupdata["formatted-title"] = {
                        ...element["formatted-title"],
                        html: updatedData?.html,
                        elementdata: {
                            ...element["formatted-title"].elementdata,
                            text: updatedData?.elementdata?.text
                        },
                    }
                }
            } else if (parentElement?.type == "showhide" && showHideType) {
                _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].contents.bodymatter[indexes[4]].interactivedata[showHideType].map((showHideData) => {
                    if (showHideData.id == updatedData.id) {
                        showHideData.elementdata.text = updatedData.elementdata.text;
                        showHideData.html = updatedData.html;
                    }
                })
            }else {
                const element = _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].contents.bodymatter[indexes[4]];
                _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].contents.bodymatter[indexes[4]] = {
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
                }
                else {
                    element = {
                        ...element,
                        ...updatedData,
                        tcm: _slateObject.tcm ? true : false,
                        html: updatedData.html
                    };
                }
            } else if (asideData && asideData.type == 'element-aside') {
                
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
function updateShowhideElements(element, updatedData, indexs) {
    if(element?.type === SHOW_HIDE) {
        /* Get the section type of showhide; Index of section (indexs?.length - 2) */
        const section = findSectionType(indexs[indexs?.length - 2]);
        section && element.interactivedata[section].forEach((showHideElement) => {
            if (showHideElement.id == updatedData.id) {
                showHideElement.html = updatedData.html; /* For figure/Text */
                if(showHideElement?.type === AUTHORED_TEXT) { /* For update paragraph - TEXT */
                    showHideElement.elementdata.text = updatedData.elementdata.text;
                } else if(showHideElement?.type === FIGURE) { /* For update - FIGURE */
                    showHideElement.figuredata = updatedData?.figuredata;
                }
            }
        })
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
        poetryData,
        updateBodymatter,
        currentParentData,
        showHideObj
    } = params

    const assetRemoveidForSnapshot = getState().assetPopOverSearch.assetID;
    const isPopupOrShowhideElement = allowedParentType.includes(parentElement?.type) && (updatedData.metaDataField !== undefined || updatedData.sectionType !== undefined) ? true : false;
    const noAdditionalFields = (updatedData.metaDataField == undefined && updatedData.sectionType == undefined) ? true : false
    const oldFigureData = getState().appStore.oldFiguredata
    
    if (elementTypeTCM.indexOf(responseData.type) !== -1 && (isPopupOrShowhideElement || noAdditionalFields)) {
        const containerElement = {
            asideData,
            parentUrn,
            poetryData,
            showHideObj,
            parentElement: allowedParentType.includes(parentElement?.type) ? parentElement : undefined,
            metaDataField: parentElement && parentElement.type === 'popup' && updatedData.metaDataField ? updatedData.metaDataField : undefined,
            sectionType : allowedParentType.includes(parentElement?.type) && updatedData.sectionType ? updatedData.sectionType : undefined,
            CurrentSlateStatus: currentSlateData.status
        },
        elementUpdateData = {
            currentParentData,
            updateBodymatter,
            response: responseData,
            updatedId: updatedData.id,
            slateManifestUrn: config.slateManifestURN,
            CurrentSlateStatus: currentSlateData.status,
            figureData: oldFigureData,
            
        }

        if (!config.isCreateGlossary) {
            await tcmSnapshotsForUpdate(elementUpdateData, elementIndex, containerElement, dispatch, assetRemoveidForSnapshot);
        }
        config.isCreateGlossary = false
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
    const { saveAutoUpdateData } = getState().assessmentReducer;
    if (saveAutoUpdateData && saveAutoUpdateData.oldAssessmentId && saveAutoUpdateData.newAssessmentId) {
        dispatch(updateAssessmentVersion(saveAutoUpdateData.oldAssessmentId, saveAutoUpdateData.newAssessmentId));
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

    const commonArgs = { updatedData, elementIndex, parentUrn, asideData, parentElement, currentSlateData, getState, dispatch, responseData }

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
    
    sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })  //hide saving spinner
    config.isSavingElement = false
    customEvent.trigger('glossaryFootnoteSave', responseData.id); 
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
                    if (elementTypeTCM.indexOf(updatedData.type) !== -1) {
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
        fetchSlateData
    } = params
    //direct dispatching in store
    const parentData = getState().appStore.slateLevelData;
    const newslateData = JSON.parse(JSON.stringify(parentData));
   
    //tcm update code
    const isPopupOrShowhideElement = parentElement && (parentElement.type === 'popup' || parentElement.type === 'showhide') && (updatedData.metaDataField !== undefined || updatedData.sectionType !== undefined) ? true : false;
    const noAdditionalFields = (updatedData.metaDataField == undefined && updatedData.sectionType == undefined) ? true : false   
    if (config.tcmStatus) {
        if (elementTypeTCM.indexOf(updatedData.type) !== -1 && (isPopupOrShowhideElement || noAdditionalFields)) {
            const tcmDataArgs = {
                updatedDataID: updatedData.id, getState, dispatch, versionedData, updatedData
            }
            prepareDataForUpdateTcm(tcmDataArgs);
        }
    }
    const commonArgs = { updatedData, asideData, dispatch, elementIndex, parentElement, newslateData }
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
            showHideType
        }
        updateElementInStore(argObj)
    }
}

export const prepareDataForUpdateTcm = ({ updatedDataID, getState, dispatch, versionedData, updatedData }) => {
    if (updatedData.hasOwnProperty("figuretype") && !allowedFigureTypesForTCM.includes(updatedData.figuretype)) {
        return false
    }
    const tcmData = getState().tcmReducer.tcmSnapshot;
    let indexes = []
    tcmData && tcmData.filter(function (element, index) {
    if (element && element.elemURN && (element.elemURN.indexOf(updatedDataID) !== -1 && element.elemURN.includes('urn:pearson:work'))) {
            indexes.push(index)
        }
    });
    if (indexes.length == 0 || (versionedData && updatedDataID !== versionedData.id)) {
        tcmData.push({
            "txCnt": 1,
            "isPrevAcceptedTxAvailable": false,
            "elemURN": versionedData && updatedDataID !== versionedData.id ? versionedData.id : updatedDataID,
            "feedback": null
        })
    }
    else {
        if(tcmData && tcmData[indexes] && indexes.length > 0 && updatedDataID){
            tcmData[indexes]["elemURN"] = updatedDataID
            tcmData[indexes]["txCnt"] = tcmData[indexes]["txCnt"] !== 0 ? tcmData[indexes]["txCnt"] : 1
            tcmData[indexes]["feedback"] = tcmData[indexes]["feedback"] !== null ? tcmData[indexes]["feedback"] : null
            tcmData[indexes]["isPrevAcceptedTxAvailable"] = tcmData[indexes]["isPrevAcceptedTxAvailable"] ? tcmData[indexes]["isPrevAcceptedTxAvailable"] : false
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