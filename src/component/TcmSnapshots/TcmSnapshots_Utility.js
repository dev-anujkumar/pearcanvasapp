/**
 * Module - Tcm_Snapshots_Utility
 * Description - This Module contains the utility functions to prepare TCM snapshots
 */

/**************************Import Modules**************************/
import config from '../../config/config.js';
import { sendElementTcmSnapshot, getLatestVersion } from './TcmSnapshot_Actions.js';
import { setSemanticsSnapshots, fetchElementsTag, generateWipDataForFigure, getInteractiveSubtypeData, removeCalloutTitle } from './ElementSnapshot_Utility.js';
import { getTitleSubtitleModel } from '../../constants/utility';
/*************************Import Constants*************************/
import TcmConstants, { ASSESSMENT_TYPE } from './TcmConstants.js';
import { storeOldAssetForTCM } from '../ElementContainer/ElementContainer_Actions'
import { handleBlankLineDom } from '../ElementContainer/UpdateElements.js';
import store from '../../appstore/store.js';
import { indexOfSectionType, getShowHideElement } from '../ShowHide/ShowHide_Helper.js';
import { MULTI_COLUMN_2C } from '../../constants/Element_Constants.js';


let operType = "";
const {
    elementType,
    containerType,
    AUTHORED_TEXT,
    BLOCKFEATURE,
    ELEMENT_LIST,
    ELEMENT_ASIDE,
    POETRY_ELEMENT,
    POETRY_STANZA,
    MULTI_COLUMN,
    SECTION_BREAK,
    WORKED_EXAMPLE,
    CONTAINER_INTRO,
    CITATION_GROUP,
    CITATION_ELEMENT,
    WE_MANIFEST,
    SLATE,
    MULTI_COLUMN_GROUP,
    LEARNING_OBJECTIVE,
    POP_UP,
    POPUP_ELEMENT,
    FORMATTED_TITLE,
    formattedTitleField,
    POSTER_TEXT_OBJ,
    parentType,
    bqAttrHtmlTrue,
    bqAttrHtmlFalse,
    bqHiddenText,
    FIGURE,
    ELEMENT_ASSESSMENT,
    allowedFigureTypesForTCM,
    SHOWHIDE,
    SHOW_HIDE,
    SMART_LINK, VIDEO, IMAGE, BLOCK_CODE_EDITOR, MMI_ELM, TEXT,
    CONTAINER, WE_TYPE, ELEMENT_TYPE_PDF
}
    = TcmConstants;

/**
 * @function prepareTcmSnapshots
 * @description This is the root function to prepare the data for TCM Snapshots
 * @param {Object} wipData - Element Wip Data
 * @param {String} actionStatus - action performed
 * @param {Object} containerElement - Element Parent Data
 * @param {String} type - type of element
*/
export const prepareTcmSnapshots = (wipData, actionStatus, containerElement, type, index, elmFeedback = null,operationType=null) => {
    
    const { parentElement, slateManifest,popupslateManifest,cutCopyParentUrn } = containerElement
    /* Get the aside data from store for 2C:WE:Section-Break */
    const parentData = store?.getState()?.appStore?.asideData?.parent || {};
    const selectionMultiColumnType = store?.getState()?.selectionReducer?.selection?.multiColumnType || "";
    const figureElementList = [SMART_LINK, SECTION_BREAK, POP_UP, SHOW_HIDE, VIDEO, IMAGE, BLOCK_CODE_EDITOR, MMI_ELM, TEXT, POPUP_ELEMENT,SHOWHIDE];
    /** isContainer : used to set SlateType  */
    let isContainer = setSlateType(wipData,containerElement,type);
    let defaultKeys = config.isPopupSlate ? setDefaultKeys(actionStatus, true, true, popupslateManifest, cutCopyParentUrn, elmFeedback) : setDefaultKeys(actionStatus, isContainer,"",slateManifest,cutCopyParentUrn, elmFeedback);
    /* Tag of elements*/
    let tag = {
        parentTag: fetchElementsTag(wipData)
    }
    /* ID of elements*/
    let elementId = {
        parentId:  wipData?.id
    }
    /* Add WE/Aside inside 2C */
    const { asideData, parentUrn, showHideObj } = containerElement;
    const { id, columnId, columnName, type: gPType } = asideData?.parent || {};
    let multiColumnType = parentUrn?.multiColumnType ? parentUrn?.multiColumnType : asideData?.parent?.multiColumnType ? asideData?.parent?.multiColumnType : parentData.multiColumnType ? parentData.multiColumnType : selectionMultiColumnType;
    /* Set grant parent tag 2C||3C */
    if( (containerElement?.sectionType === 'show' || 'hide') && parentUrn?.elementType === MULTI_COLUMN_GROUP) {
        tag.grandParent = multiColumnType + ":" + parentUrn?.columnName;
    }
    if(wipData?.type === ELEMENT_ASIDE && (parentUrn?.elementType === MULTI_COLUMN_GROUP)) {
        /* 2C-WE -> mcId; 2C-Aside -> asideData.id */
        const gId = asideData?.id || parentUrn?.mcId;
        tag.grandParent = multiColumnType + ":" + parentUrn?.columnName;
        elementId.grandParentId = `${gId}+${parentUrn?.manifestUrn}`; 
    }
    if(wipData?.type === POETRY_ELEMENT && (parentUrn?.elementType === MULTI_COLUMN_GROUP)) {
        /* 2C-WE -> mcId; 2C-Aside -> asideData.id */
        const gId = asideData?.id || parentUrn?.mcId;
        tag.grandParent = multiColumnType + ":" + parentUrn?.columnName;
        elementId.grandParentId = `${gId}+${parentUrn?.manifestUrn}`; 
    } else if((figureElementList.includes(type) || actionStatus?.action === "update" ||  actionStatus?.action === "create" ||
        actionStatus?.action === "delete" || parentUrn?.elementType === ELEMENT_ASIDE ) && 
        gPType === MULTI_COLUMN) {
           /* Get the values of Multicolumn for snapshots; 2C:ASIDE:Elemnts*/
            if (!multiColumnType) {
                let multiColumnObj = store?.getState()?.appStore?.slateLevelData[config.slateManifestURN].contents?.bodymatter.find(x => x.id === id);
                multiColumnType = `${multiColumnObj?.groupeddata?.bodymatter.length}C`
            }
            tag.grandParent = multiColumnType + ":" + columnName;
            elementId.grandParentId = `${id}+${columnId}`;
    } else if(wipData?.type === FIGURE && asideData?.figureIn2cAside?.isExist && actionStatus?.action === "update") {
        /* figure element conversion inside; 2C:ASIDE:FIGURE */ 
        const { parent: figParent } = asideData?.figureIn2cAside?.asideData || {};
        /* Get the values of Multicolumn for snapshots; 2C:ASIDE:Elemnts*/
        tag.grandParent = "2C:" + figParent.columnName;
        elementId.grandParentId = `${figParent.id}+${figParent.columnId}`;
    } else if(actionStatus?.action === "delete" && (parentData?.type === MULTI_COLUMN || parentUrn?.multiColumnDetails?.type === MULTI_COLUMN) ) {
        /* snapshots for Delete the section break inside 2c/we */
        let { id: sc_id, columnName: sb_cName, columnId: sb_cId } = parentData || {};
        if (Object.keys(parentData).length === 0) {
            multiColumnType = parentUrn?.multiColumnType;
            sc_id = parentUrn?.multiColumnDetails?.mcId;
            sb_cName = parentUrn?.multiColumnDetails?.columnName;
            sb_cId = parentUrn?.multiColumnDetails?.columnId;
        }
        tag.grandParent = multiColumnType + ":" + sb_cName;
        elementId.grandParentId = `${sc_id}+${sb_cId}`;
    }
    
    /* Initial snapshotsData of elements*/
    let snapshotsData = {
        tag: tag,
        wipData: wipData,
        elementId: elementId,
        actionStatus: actionStatus,
        slateManifestVersioning: slateManifest
    }
    /* Check if Popup Slate is inside a Container Element*/
    let elementInPopupInContainer = config.popupParentElement && checkElementsInPopupInContainer();
    let hasParentData = containerElement && checkParentData(containerElement)
    /** TCM Snapshots on Popup Slate */
    if (config.isPopupSlate) {
        if (elementInPopupInContainer) {   /** Elements in Containers/ Simple Elements in PopupSlate Inside WE/Aside */     
            tcmSnapshotsElementsInPopupInContainer(snapshotsData, defaultKeys, containerElement, type,index);
        } else {                           /** Elements in Containers/ Simple Elements in PopupSlate */
            const isMultiColumnInPopup = hasParentData && config.isPopupSlate && ((parentUrn?.elementType === MULTI_COLUMN_GROUP && (type === CONTAINER || type === WE_TYPE) ) || asideData?.parent?.type === MULTI_COLUMN) ? true : false 
            snapshotsData.tag.isMultiColumnInPopup = isMultiColumnInPopup;
            tcmSnapshotsOnDefaultSlate(snapshotsData, defaultKeys, containerElement, type, index, "");
        }
    }
    /* For POPUP Element */
    else if ((wipData.type === POPUP_ELEMENT && (type == POP_UP || type == POPUP_ELEMENT)) || (parentElement && parentElement.type == POPUP_ELEMENT)) {
        if (hasParentData) { /** Popup Inside WE/Aside */
            tcmSnapshotsPopupInContainer(snapshotsData, defaultKeys, containerElement, type,index,operationType);
        }
        else {               /** Popup Element */
            tcmSnapshotsInPopupElement(snapshotsData, defaultKeys, containerElement, type,index,operationType);
        }
    }
    /** TCM Snapshots on Default Slate - Section/I.S. */
    else {
        tcmSnapshotsOnDefaultSlate(snapshotsData, defaultKeys, containerElement, type,index, "",operationType)
    }
}

/**
 * @function tcmSnapshotsOnDefaultSlate
 * @description This is the function to prepare the data for TCM Snapshots for elements on default slate - Section/I.S.
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {String} defaultKeys - default keys of tcm snapshot
 * @param {Object} containerElement - Element Parent Data
 * @param {String} type - type of element
*/
export const tcmSnapshotsOnDefaultSlate = (snapshotsData, defaultKeys, containerElement, type,index, isPopupSlate,operationType=null) => {
    const { wipData, elementId, tag, actionStatus, popupInContainer,slateManifestVersioning } = snapshotsData;
    const { poetryData, asideData, parentUrn, showHideObj } = containerElement
    /* For WE creation*/
    if (wipData.type === ELEMENT_ASIDE && type != SECTION_BREAK) {
        tcmSnapshotsCreateAsideWE(snapshotsData, defaultKeys,index, isPopupSlate,containerElement,operationType);
    }
    /* For SH creation*/
    else if (wipData.type === SHOWHIDE) {
        tcmSnapshotsCreateShowHide(snapshotsData, defaultKeys, index, isPopupSlate, containerElement);
    }
    /* For Poetry creation (not on update) */
    else if (wipData.type === POETRY_ELEMENT) {
        tcmSnapshotsCreatePoetry(snapshotsData, defaultKeys, index, isPopupSlate, containerElement);
    }
    /* action on Section break in WE*/
    else if (type === SECTION_BREAK || wipData.type === WE_MANIFEST) {
        tcmSnapshotsCreateSectionBreak(containerElement, snapshotsData, defaultKeys,index, isPopupSlate)
    }
    /* action on PE and CG */
    else if (wipData.type === CITATION_GROUP || wipData.type === POETRY_ELEMENT) {
        tcmSnapshotsCitationPoetry(containerElement, snapshotsData, defaultKeys, index, isPopupSlate);
    }
    /* action on element in WE/PE/CG/2C */
    /* stanza create inside poetry inside containers */
    else if (poetryData || asideData || parentUrn || (showHideObj && Object.keys(showHideObj)?.length > 0)) {
        tcmSnapshotsInContainerElements(containerElement, snapshotsData, defaultKeys,index, isPopupSlate, operationType)
    }
    /* action on Multi-column */
    else if (wipData.type === MULTI_COLUMN) {
        tcmSnapshotsMultiColumn(containerElement, snapshotsData, defaultKeys,index, isPopupSlate, operationType);
    }
    else {
        let elementDetails = setElementTypeAndUrn(elementId, tag, "", "", undefined, popupInContainer, slateManifestVersioning, isPopupSlate);
        prepareAndSendTcmData(elementDetails, wipData, defaultKeys, actionStatus,index);
    }
}

/**
 * @function tcmSnapshotsCreateAsideWE
 * @description This is the function to prepare the data for TCM Snapshots for Action = Create & Elements = Aside/WE
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {String} defaultKeys - default keys of tcm snapshot
*/
const tcmSnapshotsCreateAsideWE = (snapshotsData, defaultKeys,index, isPopupSlate,containerElement,operationType=null) => {
    let elementDetails;
    const { wipData, elementId, tag, actionStatus, popupInContainer, slateManifestVersioning } = snapshotsData;
    let parentObj = {};
    if (containerElement?.showHideObj?.currentElement?.type === ELEMENT_ASIDE) {
        parentObj = {
            parent: containerElement?.showHideObj?.element,
            sectionType: containerElement?.sectionType ? containerElement?.sectionType : containerElement?.showHideObj?.element.sectionType 
        }
    }

    wipData.elementdata.bodymatter && wipData.elementdata.bodymatter.map((item) => {
        if (item.type === WE_MANIFEST) {
            item.contents.bodymatter.map((ele) => {
                if (elementType.indexOf(ele.type) !== -1) {
                    elementId.childId = ele.id;
                    tag.childTag = fetchElementsTag(ele);
                    elementDetails = setElementTypeAndUrn(elementId, tag, wipData.subtype === WORKED_EXAMPLE ? 'BODY' : "", item.id,undefined,popupInContainer,slateManifestVersioning,isPopupSlate, parentObj, containerElement);
                    prepareAndSendTcmData(elementDetails, ele, defaultKeys, actionStatus,index);
                }
               else if (ele.type === SHOWHIDE || ele.type === POETRY_ELEMENT) {
                    tcmSnapshotsShowHide(wipData,index,containerElement,actionStatus,ele, operationType)
                }
                else if (ele.type === POPUP_ELEMENT) {
                    tcmSnapshotsPopup(wipData,index,containerElement,actionStatus,ele,operationType);
                }
            })
        }
        else if (elementType.indexOf(item.type) !== -1) {
            elementId.childId = item.id;
            tag.childTag = fetchElementsTag(item);
            elementDetails = setElementTypeAndUrn(elementId, tag, wipData.subtype === WORKED_EXAMPLE ? "HEAD" : "", "",undefined,popupInContainer,slateManifestVersioning, isPopupSlate, parentObj, containerElement);
            prepareAndSendTcmData(elementDetails, item, defaultKeys, actionStatus,index);
        }
        else if (item.type === SHOWHIDE || item.type === POETRY_ELEMENT) {
            tcmSnapshotsShowHide(wipData,index,containerElement,actionStatus,item, operationType)
        }
        
        else if (item.type === POPUP_ELEMENT) {
            tcmSnapshotsPopup(wipData,index,containerElement,actionStatus,item,operationType);
        }
    })
}



const tcmSnapshotsPopup =(wipData,index,containerElement,actionStatus,item,operationType=null) => {
    const { asideData, parentUrn } = containerElement || {};
    const updatedContainerElement = {
        asideData: {
            contentUrn: wipData.contentUrn,
            element: wipData,
            id: wipData.id,
            subtype: wipData.subtype,
            type: wipData.type
        },
        parentUrn: {
            contentUrn: wipData.contentUrn,
            elementType: wipData.type,
            manifestUrn: wipData.id,
            multiColumnType: parentUrn?.multiColumnType /* 2C||3C */
        },
        metaDataField: item.popupdata['formatted-title'] ? 'formattedTitle' : undefined,
        parentElement: item
    }
    let newContainerElement = {}
    if (containerElement.cutCopyParentUrn) {
        newContainerElement = {
            ...containerElement,
            ...updatedContainerElement
        }
    } else {
        newContainerElement = updatedContainerElement
    }
    if(containerElement?.asideData?.parent?.source === "fromCutCopy") {
        /* @parent@ cut/copy operation of 2c/aside:we/popup:showhide */
        newContainerElement.asideData.parent = containerElement?.asideData?.parent || {};
    } else if(["copy","cut"].includes(operationType) && parentUrn?.elementType === MULTI_COLUMN_GROUP) {
        /* @parent@ cut/copy operation of aside/we:popup/showhide in multicolumn */
        newContainerElement.asideData.parent = parentData4CutCopyASWE_2C(asideData, parentUrn);
    }
    const shActionStatus = {...actionStatus, status: ""}
    prepareTcmSnapshots(item, shActionStatus, newContainerElement, item.type, index, "",operationType);
}
/* Form @parent@ data for cut/copy operation of aside/we:popup/showhide in multicolumn */
function parentData4CutCopyASWE_2C(asideData, parentUrn) {
    const { mcId, manifestUrn, columnName, multiColumnType } = parentUrn || {};
    return { 
        id: mcId || asideData?.id,
        type: "groupedcontent",
        columnId: manifestUrn,
        columnName: columnName,
        multiColumnType /* 2C||3C */
    }
}
/* If element is inside Body of Worked-Example then parentUrn 
* should contain value of body(Manifest) of WE */
function setParentUrnData(wipData, item) {
    let parent = wipData;
    wipData?.elementdata?.bodymatter?.forEach(obj => {
       if(obj?.type === WE_MANIFEST) {
            obj?.contents.bodymatter?.forEach(obj_L1 => {
                if(obj_L1?.id === item?.id) {
                    parent = obj;
                }
            })
        }
    })
    return parent;
}



const tcmSnapshotsShowHide =(wipData,index,containerElement,actionStatus,item,eleIndex,operationType=null) => {
    const { asideData, parentUrn, slateManifest } = containerElement || {};
    const parentObj = setParentUrnData(wipData, item);
    let updatedContainerElement = {
        asideData: {
            contentUrn: wipData.contentUrn,
            element: wipData,
            id: wipData.id,
            subtype: wipData.subtype,
            type: wipData.type
        },
        parentUrn: {
            contentUrn: parentObj?.contentUrn,
            elementType: parentObj?.type,
            manifestUrn: parentObj?.id,
            multiColumnType: parentUrn?.multiColumnType /* 2C||3C */
        },
        slateManifest
    }
    if(wipData.type === MULTI_COLUMN && (item?.type === SHOWHIDE || item?.type === POETRY_ELEMENT) && !updatedContainerElement?.parentUrn?.multiColumnType) {
        updatedContainerElement.parentUrn = {
            ...updatedContainerElement.parentUrn,
            multiColumnType: wipData?.groupeddata?.bodymatter?.length === 3 ? "3C" : "2C",
            mcId: wipData?.id,
            columnName: "C" + (eleIndex + 1),
            manifestUrn: wipData?.groupeddata?.bodymatter?.[eleIndex]?.id
        }
    }
    
    let newContainerElement = {}
    if (containerElement.cutCopyParentUrn) {
        newContainerElement = {
            ...containerElement,
            ...updatedContainerElement
        }
    } else {
        newContainerElement = updatedContainerElement
    }
    if(containerElement?.asideData?.parent?.source === "fromCutCopy") {
        /* @parent@ cut/copy operation of 2c/aside:we/popup:showhide */
        newContainerElement.asideData.parent = asideData?.parent || {};
    } else if(["copy","cut"].includes(operationType) && parentUrn?.elementType === MULTI_COLUMN_GROUP) {
        /* @parent@ cut/copy operation of aside/we:popup/showhide in multicolumn */
        newContainerElement.asideData.parent = parentData4CutCopyASWE_2C(asideData, parentUrn);
    }
    const shActionStatus = {...actionStatus, status: ""}
    prepareTcmSnapshots(item, shActionStatus, newContainerElement, item.type, index, "", operationType);
}

/* When cut/copy paste operation of  2c/aside:we/popup:showhide */
const tcmSnapshotsAsideWE =(wipData,index,containerElement,actionStatus,item, columnIndex, operationType=null) => {
    const updatedContainerElement = {
        asideData: {
            contentUrn: item.contentUrn,
            element: item,
            id: item.id,
            subtype: item.subtype,
            type: item.type,
            parent: { 
                id: wipData?.id,
                type: "groupedcontent",
                columnId: wipData?.groupeddata?.bodymatter[columnIndex]?.id,
                columnName: (columnIndex == 0) ? "C1" : (columnIndex == 1) ? "C2" : "C3",
                source:"fromCutCopy",
                multiColumnType: wipData?.groupeddata.bodymatter?.length === 2 ? "2C" : "3C" /* 2C||3C */
            }
        },
        parentUrn: {
            contentUrn: wipData.contentUrn,
            elementType: wipData.type,
            manifestUrn: wipData.id
        }
    }
    let newContainerElement = {}
    if (containerElement.cutCopyParentUrn) {
        newContainerElement = {
            ...containerElement,
            ...updatedContainerElement
        }
    } else {
        newContainerElement = updatedContainerElement
    }
    prepareTcmSnapshots(item, actionStatus, newContainerElement, "", index, "", operationType);
}

const tcmSnapshotsCreatePoetry = (snapshotsData, defaultKeys, index, isPopupSlate, { asideData, parentUrn, showHideObj }) => {
    const { wipData, elementId, tag, actionStatus, popupInContainer, slateManifestVersioning } = snapshotsData;
   const poetryElement = {
        element: wipData
    }
    let isHead = "";
    if(asideData?.type === ELEMENT_ASIDE && asideData?.subtype === WORKED_EXAMPLE) {
        if(parentUrn?.manifestUrn == asideData?.id) {
            isHead = "HEAD"
        }
        else {
            isHead = "BODY"
        }
    }
    // always one stanza will be created in poetry but in
    // case of cut paste all of them have to be pasted
    // so multiple snapshots will go 
    wipData.contents.bodymatter.map((item) => {
        elementId.childId = item.id;
        tag.childTag = fetchElementsTag(item); 
        const elementDetails = setElementTypeAndUrn(elementId, tag, isHead, parentUrn?.manifestUrn ? parentUrn.manifestUrn : "", undefined, popupInContainer, slateManifestVersioning, isPopupSlate, poetryElement, { asideData, parentUrn, showHideObj });
        prepareAndSendTcmData(elementDetails, item, defaultKeys, actionStatus,index);
    })
}

/**
 * @function tcmSnapshotsCreateShowHide
 * @description This is the function to prepare the data for TCM Snapshots for Action = Create & Elements = showhide
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {String} defaultKeys - default keys of tcm snapshot
*/

const tcmSnapshotsCreateShowHide = (snapshotsData, defaultKeys, index, isPopupSlate, { asideData, parentUrn }) => {
    let elementDetails;
    const typeArray = ['show', 'postertextobject', 'hide'];
    const { wipData, elementId, tag, actionStatus, popupInContainer, slateManifestVersioning } = snapshotsData;
    for (const SHType of typeArray) {
        const showhidetag = SHType !== 'postertextobject' ? SHType : 'revel'
        wipData.interactivedata[SHType]?.map((item, innerIndex) => {
            if (elementType.indexOf(item?.type) !== -1) { /* Check Element where tcm is not supported */
                const showhide = {
                    element: wipData,
                    showHideType: showhidetag
                }
                elementId.childId = item.id;
                /* if section is RevealAnswer than tag will be "CTA"; ELSE element tag (P/Fig)*/
                tag.childTag = (SHType === 'postertextobject') ? "CTA" : fetchElementsTag(item);
                /** @param {String} isHead - If SH is inside the WE/AS */
                const isHead = asideData?.type === ELEMENT_ASIDE && asideData?.subtype === WORKED_EXAMPLE ? parentUrn.manifestUrn == asideData.id ? "HEAD" : "BODY" : "";
                elementDetails = setElementTypeAndUrn(elementId, tag, isHead, parentUrn?.manifestUrn ? parentUrn.manifestUrn : "", undefined, popupInContainer, slateManifestVersioning, isPopupSlate, showhide, { asideData, parentUrn });
                prepareAndSendTcmData(elementDetails, item, defaultKeys, actionStatus, index);
            } else if (item?.type === ELEMENT_ASIDE) {
                containerSnapshotsInShowhide(wipData, innerIndex, { asideData, parentUrn }, actionStatus, item, SHType)
            } else if (item?.type === CITATION_GROUP) {
                containerSnapshotsInShowhide(wipData, innerIndex, { asideData, parentUrn }, actionStatus, item, SHType)
            }
        })
    }
}

/**
 * @function tcmSnapshotsCreateSectionBreak
 * @description This is the function to prepare the data for TCM Snapshots for Action = Create & Elements = Section-Break
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {Object} containerElement - Element Parent Data
 * @param {String} defaultKeys - default keys of tcm snapshot
*/
const tcmSnapshotsCreateSectionBreak = (containerElement, snapshotsData, defaultKeys,index, isPopupSlate) => {
    let elementDetails;
    const { wipData, elementId, tag, actionStatus,popupInContainer,slateManifestVersioning } = snapshotsData;
    const { asideData, parentUrn } = containerElement
    tag.parentTag = asideData && fetchElementsTag(asideData) && asideData?.type !== MULTI_COLUMN ? fetchElementsTag(asideData) : fetchElementsTag(wipData);
    elementId.parentId = asideData && asideData.id && asideData?.type !== MULTI_COLUMN ? asideData.id : parentUrn && parentUrn.manifestUrn ? parentUrn.manifestUrn : "";
    wipData.contents.bodymatter.map((item) => {
        if (elementType.indexOf(item.type) !== -1) {
            elementId.childId = item.id;
            tag.childTag = fetchElementsTag(item);
            if (asideData?.parent?.type === SHOWHIDE) {
                const parentElement = asideData ?? {}
                { asideData, parentUrn }
                elementDetails = setElementTypeAndUrn(elementId, tag, "BODY", wipData.id, undefined, popupInContainer, slateManifestVersioning, isPopupSlate, parentElement, { asideData, parentUrn });
            }
            else{
                elementDetails = setElementTypeAndUrn(elementId, tag, "BODY", wipData.id,undefined,popupInContainer,slateManifestVersioning, isPopupSlate);
            }
            prepareAndSendTcmData(elementDetails, item, defaultKeys, actionStatus,index);
        }
    })
}

/**
 * @function tcmSnapshotsInContainerElements
 * @description This is the function to prepare the data for TCM Snapshots for Action = Update/Del & Elements inside Aside/WE/CG/PE/MC
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {Object} containerElement - Element Parent Data
 * @param {String} defaultKeys - default keys of tcm snapshot
*/
export const tcmSnapshotsInContainerElements = (containerElement, snapshotsData, defaultKeys,index, isPopupSlate, operationType) => {
    let elementDetails;
    const { wipData, elementId, tag, actionStatus, popupInContainer,slateManifestVersioning } = snapshotsData;
    const { poetryData, asideData, parentUrn, showHideObj } = containerElement
    let parentElement = asideData ? asideData : parentUrn;
    parentElement = showHideObj ? showHideObj : parentElement;
    parentElement = poetryData ? poetryData : parentElement;
    /* 2C:AS/WE:FIGURE */
    const { isExist, asideData: asideFigObj } = asideData?.figureIn2cAside || {};
    parentElement =  isExist ? asideFigObj : parentElement;
    let isCgInSh = false;

    if (containerElement?.showHideObj?.currentElement?.type === CITATION_GROUP || (asideData?.parent?.type === SHOWHIDE && asideData?.element?.type === CITATION_GROUP)) {
        isCgInSh = true;
        let cgElement = containerElement?.showHideObj?.currentElement ? containerElement?.showHideObj?.currentElement : asideData?.element;
        let cgParentElement = containerElement?.showHideObj?.element ? containerElement?.showHideObj?.element : asideData?.parent;
        let sectionType = containerElement?.showHideObj?.element?.sectionType ? containerElement?.showHideObj?.element?.sectionType : asideData?.parent?.showHideType;
        parentElement = {
            parent: cgParentElement,
            sectionType: sectionType
        }
        tag.parentTag = fetchElementsTag(cgElement);
        elementId.parentId = cgElement.id;
        if (wipData.type === CITATION_GROUP) {
            cgElement.contents.bodymatter.map((item) => {
                elementId.childId = item.id;
                tag.childTag = fetchElementsTag(item);
            })
        } else {
            elementId.childId = wipData.id;
            tag.childTag = fetchElementsTag(wipData);
        }
    } 
    else if (containerElement?.showHideObj?.containerinSH && (asideData?.parent?.type === SHOWHIDE && asideData?.element?.type === ELEMENT_ASIDE)) {
        elementId.parentId =  asideData?.element?.id ??  "";
        elementId.childId = wipData.id;
        elementId.columnId = parentUrn && parentUrn.elementType === MULTI_COLUMN_GROUP && parentUrn.manifestUrn ? parentUrn.manifestUrn : "";
        tag.parentTag =fetchElementsTag(asideData?.element) ?? "";
        /* On update of reveal answers inside showhide element; "-childTag-" will be CTA not P */
        tag.childTag = (asideData?.parent?.type === SHOWHIDE) && showHideObj?.showHideType === "postertextobject" ?
            "CTA" : fetchElementsTag(wipData);
    }
    else {
        elementId.parentId = parentElement && parentElement.id ? parentElement.id : parentUrn && parentUrn.manifestUrn ? parentUrn.manifestUrn : "";
        elementId.parentId = (parentElement?.element?.type === SHOWHIDE || parentElement?.element?.type === POETRY_ELEMENT) ? parentElement.element.id : elementId.parentId;
        elementId.childId = wipData.id;
        elementId.columnId = parentUrn && parentUrn.elementType === MULTI_COLUMN_GROUP && parentUrn.manifestUrn ? parentUrn.manifestUrn : "";
        tag.parentTag = showHideObj || poetryData ? fetchElementsTag(parentElement.element) : fetchElementsTag(parentElement);
        /* On update of reveal answers inside showhide element; "-childTag-" will be CTA not P */
        tag.childTag = (showHideObj?.element?.type === SHOWHIDE && showHideObj?.showHideType === "postertextobject") ?
                        "CTA" : fetchElementsTag(wipData);
    }
    let isHead;
    if(isExist) {
        /* if Figure converion inside 2C:ASIDE; UPDATA Action */
        if(asideFigObj?.type === ELEMENT_ASIDE && asideFigObj?.subtype === WORKED_EXAMPLE) {
            const sectionOfWE = asideFigObj?.element?.elementdata?.bodymatter?.find(item => {
                return (item?.id === wipData?.id);
            })
            /* Check head or body of WE */
            isHead = sectionOfWE?.id ? "HEAD" : "BODY";
        }
    } else{
        isHead = asideData && asideData.type === ELEMENT_ASIDE && asideData.subtype === WORKED_EXAMPLE ? parentUrn?.manifestUrn == asideData?.id ? "HEAD" : "BODY" : "";
    }
    if (isCgInSh) {
        elementDetails = setElementTypeAndUrn(elementId, tag, isHead, parentUrn && parentUrn.manifestUrn ? parentUrn.manifestUrn : "", parentUrn ? parentUrn.columnIndex : -1, popupInContainer, slateManifestVersioning, isPopupSlate, parentElement, containerElement);
    } else {
        elementDetails = setElementTypeAndUrn(elementId, tag, isHead, parentUrn && parentUrn.manifestUrn ? parentUrn.manifestUrn : "", parentUrn ? parentUrn.columnIndex : -1, popupInContainer, slateManifestVersioning, isPopupSlate, parentElement, { asideData, parentUrn, showHideObj });
    }
    prepareAndSendTcmData(elementDetails, wipData, defaultKeys, actionStatus,index);
}

export const prepareSnaphotPoetry = (containerElement, wipData, index, updateBodymatter) => {
    
    const { asideData, parentUrn } =  containerElement?.asideData?.grandParent || {};
    
    let poetryElement = { ...containerElement?.asideData };
    /* Delete the grandparent data form asideData */
    return {
        ...containerElement,
        asideData: asideData,
        parentUrn: parentUrn,
        parentElement: asideData,
        poetryData: {
            currentElement: wipData || {},
            element: poetryElement,
            index: index,
            // showHideType: index
        },
        stanzaIndex: index
    }
}
/**
* @function prepareSnapshots_ShowHide
* @description This function will prepare the data of containerElement to get snapshots 
*  of parent elements - 2C/Aside/POP:SH:New 
*/
export function prepareSnapshots_ShowHide(containerElement, wipData, index, updateBodymatter) {
    const { asideData, parentUrn } =  containerElement?.asideData?.grandParent || {};
    /* Get the sectionType using index of element */
    const sectionType = containerElement?.asideData?.sectionType || containerElement?.sectionType;
    let showhideElement = { ...containerElement?.asideData };
    /* Delete the grandparent data form asideData */
    showhideElement?.grandParent && delete showhideElement.grandParent;
    /* Prepare and return container data for showhide inner element update */
    return {
        ...containerElement,
        asideData: asideData,
        parentUrn: parentUrn,
        parentElement: asideData,
        showHideObj: {
            currentElement: wipData || {},
            element: showhideElement,
            index: index,
            showHideType: sectionType
        },
        sectionType: sectionType
    };  
}
/**
 * @function tcmSnapshotsMultiColumn
 * @description This is the function to prepare the data for TCM Snapshots for Action = Create & Elements = Mutli-column
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {String} defaultKeys - default keys of tcm snapshot
*/
const tcmSnapshotsMultiColumn = (containerElement,snapshotsData, defaultKeys,index, isPopupSlate, operationType=null) => {
    let elementDetails;
    const { wipData, elementId, tag, actionStatus,popupInContainer,slateManifestVersioning } = snapshotsData;
    const { parentUrn } = containerElement
    wipData.groupeddata.bodymatter.map((item, eleIndex) => {
        item.groupdata.bodymatter.map((ele) => {
            if(ele?.type === SHOWHIDE || ele?.type === POETRY_ELEMENT) {
               tcmSnapshotsShowHide(wipData,index,containerElement,actionStatus,ele, eleIndex, operationType);
            } else
            if(ele?.type === "element-aside") {
               tcmSnapshotsAsideWE(wipData,index,containerElement,actionStatus,ele, eleIndex, operationType)
            } else {
                elementId.columnId =  item.id;
                elementId.childId = ele.id;
                tag.childTag = fetchElementsTag(ele);
                elementDetails = setElementTypeAndUrn(elementId, tag, "", "", parentUrn ? parentUrn.columnIndex : eleIndex,popupInContainer,slateManifestVersioning, isPopupSlate);
                prepareAndSendTcmData(elementDetails, ele, defaultKeys, actionStatus,index);
            }
        })

    })
}

/**
 * @function tcmSnapshotsCitationPoetry
 * @description This is the function to prepare the data for TCM Snapshots for Action = Create & Elements = Citaions/Poetry
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {String} defaultKeys - default keys of tcm snapshot
*/
const tcmSnapshotsCitationPoetry = (containerElement, snapshotsData, defaultKeys,index, isPopupSlate) => {
    let elementDetails;
    const { wipData, elementId, tag, actionStatus, popupInContainer,slateManifestVersioning } = snapshotsData;
    let isHead = "", parentUrnToSend={};
    let parentObj = {};
    if (containerElement?.showHideObj?.currentElement?.type === 'element-aside' || containerElement?.showHideObj?.currentElement?.type === 'citations') {
        parentObj = {
            parent: containerElement?.showHideObj?.element,
            sectionType: containerElement?.sectionType ? containerElement?.sectionType : containerElement?.showHideObj?.element.sectionType 
        }
    }
    if(parentObj?.parent?.type === ELEMENT_ASIDE && parentObj?.parent?.subtype === WORKED_EXAMPLE) {
        if(parentUrn?.manifestUrn == asideData?.id) {
            isHead = "HEAD"
        }
        else {
            isHead = "BODY"
        }
        parentUrnToSend  = parentUrn?.manifestUrn ? parentUrn.manifestUrn : ""
    }

    wipData.contents.bodymatter.map((item) => {
        elementId.childId = item.id;
        tag.childTag = fetchElementsTag(item);
        elementDetails = setElementTypeAndUrn(elementId, tag, isHead,parentUrnToSend,-1,popupInContainer,slateManifestVersioning, isPopupSlate, parentObj, containerElement);
        prepareAndSendTcmData(elementDetails, item, defaultKeys, actionStatus,index);
    })
}
/**----------------------------------------- Popup-Element/Slate TCM Snapshots -------------------------------------- */
/**
 * @function tcmSnapshotsCreatePopup
 * @description This is the function to prepare the data for TCM Snapshots for Action = Create & Elements = Popup
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {String} defaultKeys - default keys of tcm snapshot
*/
const tcmSnapshotsCreatePopup = (snapshotsData, defaultKeys,index) => {
    let elementDetails;
    const { wipData, elementId, tag, actionStatus, popupInContainer,slateManifestVersioning } = snapshotsData;
    wipData.popupdata && wipData.popupdata.bodymatter.map((item) => {
        elementId.childId =  item.id;
        tag.childTag = fetchElementsTag(item);
        elementDetails = setElementTypeAndUrn(elementId, tag, "BODY", "", undefined, popupInContainer,slateManifestVersioning);
        prepareAndSendTcmData(elementDetails, item, defaultKeys, actionStatus,index);
    })
}

const tcmSnapshotsDeletePopup = (snapshotsData, defaultKeys,index, containerElement,type) => {
    const { wipData,  actionStatus,popupInContainer,tag, elementId } = snapshotsData;
    wipData.popupdata && wipData.popupdata.bodymatter.map((item) => {
        tag.childTag=""
        tag.parentTag= fetchElementsTag(item)
        /* ID of elements*/
        elementId.parentId= item.id;
        elementId.popID=  wipData.id;
        elementId.childId=""
        /* Initial snapshotsData of elements*/
        let snapshotsDataToSend = {
            tag: tag,
            wipData: item,
            elementId: elementId,
            actionStatus: actionStatus,
            popupInContainer
        }
        tcmSnapshotsOnDefaultSlate(snapshotsDataToSend, defaultKeys,"" , type ,index,"popupSlate")
    })
}


/**
 * @function tcmSnapshotsPopupLabel
 * @description This is the function to prepare the data for TCM Snapshots for Formatted-title in Popup Element
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {Object} parentElement - Popup Element data
 * @param {String} defaultKeys - default keys of tcm snapshot
*/
export const tcmSnapshotsMetadataField = (snapshotsData, defaultKeys, containerElement,type,index, calledFrom) => {
    let elementDetails;
    const { parentElement, metaDataField, CurrentSlateStatus, isMetaFieldExist } = containerElement
    const { wipData, elementId, tag, actionStatus, popupInContainer, slateManifestVersioning } = snapshotsData;
    let wipDataTitle = calledFrom == 'delete'|| calledFrom == 'create' ? wipData.popupdata['formatted-title'] : wipData  // delete Whole pop case handling
    elementId.parentId = parentElement.id;
    elementId.childId = wipData.type === POPUP_ELEMENT ? wipData.popupdata['formatted-title'] && wipData.popupdata['formatted-title'].id : wipData.id;; // delete Whole pop case handling

    tag.parentTag = fetchElementsTag(parentElement);
    tag.childTag = fetchElementsTag(parentElement, type ? type : metaDataField ? metaDataField : "");
    let isHeadTag = tag.parentTag == 'POP' ? "HEAD" : ""
    elementDetails = setElementTypeAndUrn(elementId, tag, isHeadTag, "", undefined, popupInContainer,slateManifestVersioning);
    elementDetails.isMetaFieldExist = isMetaFieldExist
    prepareAndSendTcmData(elementDetails, wipDataTitle, defaultKeys, actionStatus,index, CurrentSlateStatus);
}

/**
 * @function tcmSnapshotsPopupCTA
 * @description This is the function to prepare the data for TCM Snapshots for CTA in Popup Element
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {Object} parentElement - Popup Element data
 * @param {String} defaultKeys - default keys of tcm snapshot
*/
const tcmSnapshotsPopupCTA = (snapshotsData, defaultKeys, containerElement,index) => {
    let elementDetails;
    const { parentElement, sectionType } = containerElement
    const { wipData, elementId, tag, actionStatus, popupInContainer, slateManifestVersioning } = snapshotsData;
    let popupElement = parentElement ? parentElement : wipData;
    let ctaElement = wipData.type === POPUP_ELEMENT ? wipData.popupdata.postertextobject[0] : wipData;
    elementId.parentId = popupElement.id;
    tag.parentTag = fetchElementsTag(popupElement);
    elementId.childId =  ctaElement.id;
    tag.childTag = sectionType ? fetchElementsTag(popupElement, sectionType) : fetchElementsTag(popupElement, POSTER_TEXT_OBJ);
    elementDetails = setElementTypeAndUrn(elementId, tag, "HEAD", "", undefined, popupInContainer, slateManifestVersioning);
    prepareAndSendTcmData(elementDetails, ctaElement, defaultKeys, actionStatus,index);
}

/**
 * @function tcmSnapshotsInPopupElement
 * @description This is the function to prepare the data for TCM Snapshots for Actions in Popup Element
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {String} defaultKeys - default keys of tcm snapshot
 * @param {Object} containerElement - Element Parent Data
 * @param {String} type - type of element
*/
export const tcmSnapshotsInPopupElement = (snapshotsData, defaultKeys, containerElement, type,index,operationType=null) => {
    const { metaDataField, sectionType, parentElement } = containerElement
    if (defaultKeys.action === 'create' && type == POP_UP) {     /** Create Popup */
        tcmSnapshotsPopupCTA(snapshotsData, defaultKeys, containerElement,index);
        tcmSnapshotsCreatePopup(snapshotsData, defaultKeys,index);
        if((metaDataField && parentElement && parentElement.popupdata['formatted-title'])){
            tcmSnapshotsMetadataField(snapshotsData, defaultKeys, containerElement, metaDataField,index, 'create');
        }
    }
    else if ((defaultKeys.action === 'create' && type == POPUP_ELEMENT && operationType==='copy') || (operationType === 'cut' && defaultKeys.action === 'update')) {     /** Create Popup */
        tcmSnapshotsPopupCTA(snapshotsData, defaultKeys, containerElement,index);
        if((metaDataField && parentElement && parentElement.popupdata['formatted-title'])){
            tcmSnapshotsMetadataField(snapshotsData, defaultKeys, containerElement, metaDataField,index, 'create');
        }
    }
    else if((defaultKeys.action === 'delete' && type == POPUP_ELEMENT)) {            /** Delete Popup */
        tcmSnapshotsPopupCTA(snapshotsData, defaultKeys, containerElement,index);
        // tcmSnapshotsCreatePopup(snapshotsData, defaultKeys, deleVercase, newVersionUrns,index);
         tcmSnapshotsDeletePopup(snapshotsData, defaultKeys,index,containerElement,type);
        if(defaultKeys.action === 'delete' && type == POPUP_ELEMENT && (metaDataField && formattedTitleField.includes(metaDataField))){
            tcmSnapshotsMetadataField(snapshotsData, defaultKeys, containerElement, metaDataField,index, 'delete');
        }
    }
    else if ((type && formattedTitleField.includes(type)) || (metaDataField && formattedTitleField.includes(metaDataField))) { /** Formatted-title */
        tcmSnapshotsMetadataField(snapshotsData, defaultKeys, containerElement, type,index);
    } else if (sectionType && sectionType === POSTER_TEXT_OBJ) { /** Update CTA */
        tcmSnapshotsPopupCTA(snapshotsData, defaultKeys, containerElement,index);
    }
}

/**
 * @function tcmSnapshotsPopupInContainer
 * @description This is the function to prepare the data for TCM Snapshots for Popup Element inside a Container Element
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {String} defaultKeys - default keys of tcm snapshot
 * @param {Object} containerElement - Element Parent Data
 * @param {String} type - type of element
*/
const tcmSnapshotsPopupInContainer = (snapshotsData, defaultKeys, containerElement, type,index,operationType=null) => {
    const { wipData, elementId, tag, actionStatus, slateManifestVersioning } = snapshotsData;
    const { poetryData, asideData, parentUrn } = containerElement
    let popupParent = asideData ? asideData : poetryData ? poetryData : parentUrn;
    elementId.popupParentId = popupParent && popupParent.id ? popupParent.id : parentUrn && parentUrn.manifestUrn ? parentUrn.manifestUrn : ""; //we:id
    elementId.parentId =  wipData.id; //popup id
    tag.popupParentTag = fetchElementsTag(popupParent);//WE/AS
    let isHead = asideData && asideData.type === ELEMENT_ASIDE && asideData.subtype === WORKED_EXAMPLE ? parentUrn.manifestUrn == asideData.id ? "HEAD" : "BODY" : "";//HEAD/BODY
    let sectionId = isHead == "BODY" ? parentUrn && parentUrn.manifestUrn ? parentUrn.manifestUrn : "" : "";//body-id
    tag.popupParentTag = `${tag.popupParentTag}${isHead ? ":"+isHead : ""}`
    elementId.popupParentId = `${elementId.popupParentId}${isHead == "BODY" ? "+"+sectionId : ""}`
    let popupData = {
        tag: tag,
        wipData: wipData,
        elementId: elementId,
        actionStatus: actionStatus,
        popupInContainer:true,
        slateManifestVersioning:slateManifestVersioning
    }
    tcmSnapshotsInPopupElement(popupData, defaultKeys, containerElement, type,index,operationType)
}

/**
 * @function tcmSnapshotsElementsInPopupInContainer
 * @description This is the function to prepare the data for TCM Snapshots for Container Element inside Popup Slate inside a  Container Element
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {String} defaultKeys - default keys of tcm snapshot
 * @param {Object} containerElement - Element Parent Data
 * @param {String} type - type of element
*/
export const tcmSnapshotsElementsInPopupInContainer = async (snapshotsData, defaultKeys, containerElement, type,index) => {
    const { wipData, elementId, tag, actionStatus, slateManifestVersioning } = snapshotsData;
    let popupContainerData = config.popupParentElement
    await checkContainerPopupVersion(popupContainerData)
    const { popupAsideData, popupParentUrn } = popupContainerData
    let popupParent = popupAsideData ? popupAsideData : popupParentUrn ? popupParentUrn :  undefined;
    elementId.popupParentId = popupParent && popupParent.id ? popupParent.id : ""; //we:id
    tag.popupParentTag = popupParent && fetchElementsTag(popupParent);//WE/AS
    let headWE = popupAsideData && popupAsideData.type === ELEMENT_ASIDE && popupAsideData.subtype === WORKED_EXAMPLE ? popupParentUrn.manifestUrn == popupAsideData.id ? "HEAD" : "BODY" : "";
    let bodyWE = headWE == "BODY" ? popupParentUrn && popupParentUrn.manifestUrn ? popupParentUrn.manifestUrn : "" : "";//body-id
    tag.popupParentTag = `${tag.popupParentTag}${headWE ? ":"+headWE : ""}`
    elementId.popupParentId = `${elementId.popupParentId}${headWE == "BODY" ? "+"+bodyWE : ""}`
    /* If popup inside the 2C-WE/Aside; Get the Data of 2C */
    const { id, type: gPType, columnName, columnId, multiColumnType } = popupAsideData?.parent || {};
    if (gPType === "groupedcontent") {
        tag.grandParent = multiColumnType + ':' + columnName;
        elementId.grandParentId = `${id}+${columnId}`;
    }
    let popupData = {
        tag: tag,
        wipData: wipData,
        elementId: elementId,
        actionStatus: actionStatus,
        popupInContainer: true,
        slateManifestVersioning:slateManifestVersioning
    }
    tcmSnapshotsOnDefaultSlate(popupData, defaultKeys, containerElement, type,index, "");
}
export const checkContainerPopupVersion = async (containerElement) => {
    if (containerElement && (containerElement.popupAsideData && containerElement.popupAsideData.element.status === "approved")) {
        let contentUrn = containerElement.popupAsideData ? containerElement.popupAsideData.contentUrn : containerElement.popupParentUrn ? containerElement.popupParentUrn.contentUrn : ""
        if (contentUrn) {
            let newManifestData = await getLatestVersion(contentUrn);
            if (newManifestData && containerElement.popupAsideData) {
                    containerElement.popupAsideData.id = newManifestData
            }
        }
    }
    if (containerElement && containerElement.popupParentUrn && containerElement.popupParentUrn.manifestUrn !== containerElement.popupAsideData.id) {
        await Promise.all(containerElement.popupAsideData && containerElement.popupAsideData.element.elementdata.bodymatter.map(async (ele) => {
            if (ele.id === containerElement.popupParentUrn.manifestUrn && ele.status === "approved") {
                let newSectionManifest = await getLatestVersion(containerElement.popupParentUrn.contentUrn);
                containerElement.popupParentUrn.manifestUrn = newSectionManifest ? newSectionManifest : containerElement.popupParentUrn.manifestUrn

            }
        }))
    }
    return containerElement
}

/**
 * @function checkElementsInPopupInContainer
 * @description Check if Popup Slate is inside a Container Element
*/
const checkElementsInPopupInContainer = () => {
    let isPopupInContainer = config.popupParentElement && config.popupParentElement.parentElement && config.popupParentElement.parentElement.type == 'popup' ? true : false;        
    let hasPopupAsideData = config.popupParentElement && ('popupAsideData' in config.popupParentElement && !isEmpty(config.popupParentElement.popupAsideData)) ? true : false;
    let hasPopupParentUrn = config.popupParentElement && ('popupParentUrn' in config.popupParentElement && !isEmpty(config.popupParentElement.popupParentUrn)) ? true : false;
    return (isPopupInContainer && (hasPopupAsideData || hasPopupParentUrn));
}

/**
 * @function checkParentData = () =>
 * @description Check if Popup Slate is inside a Container Element
*/
const checkParentData = (containerElement) => {
    let poetryData = containerElement && ((containerElement.poetryData != undefined ||containerElement.poetryData != null)  && !isEmpty(containerElement.poetryData)) ? true : false;
    let asideData = containerElement && ((containerElement.asideData != undefined ||containerElement.asideData != null)  && !isEmpty(containerElement.asideData)) ? true : false;
    let parentUrn = containerElement && ((containerElement.parentUrn != undefined ||containerElement.parentUrn != null)  && !isEmpty(containerElement.parentUrn)) ? true : false;
    return (poetryData || asideData || parentUrn);
}
/**----------------------------------------------------------------------------------------------------------------- */
/**
 * @function prepareAndSendTcmData
 * @description This function is to all keys for tcm snapshots
 * @param {Object} elementDetails - Object containing the details for Element tag & urn
 * @param {Object} wipData - Element Wip Data  
 * @param {Object} defaultKeys - default tcm_snapshot keys  
 * @param {Function} dispatch - dispatch function  
*/
export const prepareAndSendTcmData = async (elementDetails, wipData, defaultKeys, actionStatus,index, CurrentSlateStatus) => {
    let res = Object.assign({}, wipData);
    delete res["html"];
    let currentSnapshot = {
        elementUrn: elementDetails.elementUrn,
        snapshotUrn: elementDetails.elementUrn,
        elementType: elementDetails.elementType,
        elementWip: JSON.stringify(res),
        elementSnapshot: wipData.type === FIGURE ? JSON.stringify(await prepareFigureElementSnapshots(wipData, actionStatus, index)) : JSON.stringify(await prepareElementSnapshots(wipData, actionStatus, index, elementDetails, CurrentSlateStatus)),
        ...defaultKeys
    };
    if(currentSnapshot && ((currentSnapshot.elementType.includes("CTA") && !currentSnapshot.elementType.includes("SH")) || currentSnapshot.elementType.includes("LB")) && currentSnapshot.action == 'create' && operType!=='copy'){
        currentSnapshot.status = 'accepted'  
        if(currentSnapshot.elementType.includes("LB") && CurrentSlateStatus != 'approved'){
            res.elementdata.text = ''
            currentSnapshot.elementWip = JSON.stringify(res)
        }
    }
    await sendElementTcmSnapshot(currentSnapshot)
}

/**
 * @function setElementType
 * @description-This function is to set keys- [ ElementType, elementUrn, snapshotUrn ] for tcm snapshots
 * @param {Object} eleId - Object containing the details for Element Id
 * @param {Object} tag - Object containing the details for Element Tag
 * @param {String} isHead - For handling WE element
 * @param {String} sectionId - Urn for section break
 * @returns {Object} Object that contains the element tag and elementUrn for snapshot 
*/
export const setElementTypeAndUrn = (eleId, tag, isHead, sectionId , eleIndex,popupInContainer,slateManifestVersioning, popupSlate, parentElement, containerElement = {}, parentPTObj) => {
    const { asideData, parentUrn, showHideObj } = containerElement
    let elementData = {};
    let elementTag = `${tag.parentTag}${isHead ? ":" + isHead : ""}${tag.childTag ? ":" + tag.childTag : ""}`;
    let elementId = `${eleId.parentId}${sectionId && isHead === "BODY" ? "+" + sectionId : ""}${eleId.childId ? "+" + eleId.childId : ""}`
    if((tag.parentTag === "2C" || tag.parentTag === "3C") && eleIndex > -1){
        elementTag = `${tag.parentTag}${(eleIndex == 0) ? ':C1' : (eleIndex == 1) ? ':C2' : ':C3'}${tag.childTag ? ":" + tag.childTag : ""}`   ; 
        elementId =  `${eleId.parentId}${eleId.columnId ? "+" + eleId.columnId : ""}${eleId.childId ? "+" + eleId.childId : ""}`
    }

    if (parentElement?.parent?.type === SHOWHIDE && (parentElement?.element?.type !== POETRY_ELEMENT)) { // create Aside/CG in S/H || create elements in aside in s/h
        const containersInSH = [ELEMENT_ASIDE, CITATION_GROUP]
        const elem = containerElement?.showHideObj?.currentElement?.type ? containerElement?.showHideObj?.currentElement : asideData;
        if ((containersInSH.includes(elem?.type)) || (containersInSH.includes(elem?.type) && asideData?.parent?.type === SHOWHIDE)) {
            let section = parentElement?.sectionType ? parentElement?.sectionType : asideData?.parent?.showHideType;
            let shId = parentElement?.parent?.id ? parentElement?.parent?.id : asideData?.parent?.id;
            let showHideSection = getShowHideTag(section);
            if (elem?.type === ELEMENT_ASIDE && elem?.subtype === WORKED_EXAMPLE || elem?.type === CITATION_GROUP) {
                elementTag = `SH:${showHideSection}:${tag.parentTag}:${isHead ? `${isHead}:` : ""}${tag.childTag}`;
                elementId = `${shId}+${eleId.parentId}+${sectionId && isHead === "BODY" ? `${sectionId}+` : ""}${eleId.childId}`;
            } else {
                elementTag = `SH:${showHideSection}:${tag.parentTag}:${tag.childTag}`;
                elementId = `${shId}+${eleId.parentId}+${eleId.childId}`;
            }
        }
    } else if (parentElement?.element?.type === SHOWHIDE) {    //showhide
        let showHideSection = getShowHideTag(parentElement.showHideType);
        elementTag = `${tag.parentTag}:${showHideSection}:${tag.childTag}`; //${tag.childTag ? ":" + tag.childTag : ""}
        if (showHideObj?.containerinSH && asideData?.type === ELEMENT_ASIDE && asideData?.parent?.type === SHOWHIDE) {
            if (asideData?.subtype === WORKED_EXAMPLE) {
                elementTag = `SH:${showHideSection}:${tag.parentTag}${isHead ? ":" + isHead : ""}:${tag.childTag}`
                elementId = `${asideData?.parent?.id}+${eleId.parentId}${sectionId && isHead === "BODY" ? "+" + sectionId : ""}${eleId.childId ? "+" + eleId.childId : ""}`
            } else {
                elementTag = `SH:${showHideSection}:${tag.parentTag}:${tag.childTag}`
                elementId = `${asideData?.parent?.id}+${eleId.parentId}+${eleId.childId}`
            }
        }
        else if (asideData?.type === ELEMENT_ASIDE && asideData?.subtype !== WORKED_EXAMPLE) { //SH inside Aside
            elementTag = `AS:${elementTag}`
            elementId = `${asideData.id}+${eleId.parentId}+${eleId.childId}`
        }
        else if (asideData?.type === ELEMENT_ASIDE && asideData?.subtype === WORKED_EXAMPLE) { //SH inside WE - head/body
            elementTag = `WE:${isHead ? `${isHead}:` : ""}${elementTag}`
            elementId = `${asideData.id}+${sectionId && isHead === "BODY" ? `${sectionId}+` : ""}${eleId.parentId}+${eleId.childId}`
        }
        if ((popupInContainer && config.isPopupSlate) || (popupInContainer && popupSlate)) {  //WE:BODY:POP:BODY:WE:BODY:P
            elementTag = `${tag.popupParentTag ? tag.popupParentTag + ":" : ""}POP:BODY:${elementTag}`;
            elementId = `${eleId.popupParentId ? eleId.popupParentId + "+" : ""}${eleId.popID ? eleId.popID : slateManifestVersioning ? slateManifestVersioning:config.slateManifestURN}+${elementId}`;
        }
        else if (config.isPopupSlate && !tag?.isMultiColumnInPopup) {                //POP:BODY:WE:BODY:P
            elementTag = `POP:BODY:${elementTag}`;
            elementId = `${slateManifestVersioning?slateManifestVersioning:config.slateManifestURN}+${elementId}`;
        }
        else if (asideData?.type === MULTI_COLUMN && parentUrn) { /* 2C:SH || 3C:SH */
            const {columnName, manifestUrn, mcId} = parentUrn;
            //let grandParentTag = tag.grandParent.split(":")[0];
            elementTag = `${parentUrn?.multiColumnType}:${columnName}:${elementTag}`;
            elementId = `${mcId}+${manifestUrn}+${elementId}`;
        }
    }
    /* */
    else if (parentElement?.element?.type === POETRY_ELEMENT) {
        let poetryAsideData = asideData;
        let poetryParentURN = parentUrn;
        if(asideData?.type === POETRY_ELEMENT) {
            // when stanza is created asideData is poetry data
            poetryAsideData = asideData?.grandParent?.asideData;
            poetryParentURN = asideData?.grandParent?.parentUrn;
        }
        elementTag = `${tag.parentTag}:${tag.childTag}`;
        if (popupInContainer && config.isPopupSlate){  // PE inside popup
            elementTag = `${tag.popupParentTag ? tag.popupParentTag + ":" : ""}POP:BODY:${elementTag}`;
            elementId = `${eleId.popupParentId ? eleId.popupParentId + "+" : ""}${eleId.popID ? eleId.popID : slateManifestVersioning ? slateManifestVersioning:config.slateManifestURN}+${elementId}`;
        }
       else if (poetryAsideData?.type === ELEMENT_ASIDE && poetryAsideData?.subtype !== WORKED_EXAMPLE) { //block poetry inside Aside
            elementTag = `AS:${elementTag}`
            elementId = `${poetryAsideData.id}+${eleId.parentId}+${eleId.childId}`
        }
        else if (poetryAsideData?.type === ELEMENT_ASIDE && poetryAsideData?.subtype === WORKED_EXAMPLE) { //poetry inside WE - head/body
            const headString = poetryParentURN?.manifestUrn == poetryAsideData?.id ? "HEAD" : "BODY";
            elementTag = `WE:${headString}:${elementTag}`
            elementId = `${poetryAsideData.id}+${(poetryParentURN?.manifestUrn && headString === "BODY") ? `${poetryParentURN.manifestUrn}+` : ""}${eleId.parentId}+${eleId.childId}`
           
        }
        
        else if (poetryAsideData?.type === MULTI_COLUMN && parentUrn) { /* 2C:BP || 3C:BP */
            const {columnName, manifestUrn, mcId} = poetryParentURN;
            //let grandParentTag = tag.grandParent.split(":")[0];
            elementTag = `${poetryParentURN?.multiColumnType}:${columnName}:${elementTag}`;
            elementId = `${mcId}+${manifestUrn}+${elementId}`;
        } 
        else if (showHideObj?.element?.type === SHOWHIDE || poetryAsideData?.type === SHOWHIDE) {
            const showSectionType = showHideObj?.sectionType ? showHideObj?.sectionType : showHideObj?.element.sectionType
            let section = showSectionType ? showSectionType : poetryAsideData?.sectionType;
            let shId = showHideObj?.element?.id ? showHideObj?.element?.id : poetryAsideData?.id;
            let showHideSection = getShowHideTag(section);
            elementTag = `SH:${showHideSection}:${tag.parentTag}:${tag.childTag}`
            elementId = `${shId}+${eleId.parentId}+${eleId.childId}`
        }
    }

    else if ((popupInContainer && config.isPopupSlate) || (popupInContainer && popupSlate)) {  //WE:BODY:POP:BODY:WE:BODY:P
        elementTag = `${tag.popupParentTag ? tag.popupParentTag + ":" : ""}POP:BODY:${elementTag}`;
        elementId = `${eleId.popupParentId ? eleId.popupParentId + "+" : ""}${eleId.popID ? eleId.popID : slateManifestVersioning ? slateManifestVersioning:config.slateManifestURN}+${elementId}`;
    }
    else if (popupInContainer) {                   //WE:BODY:POP:HEAD:CTA | WE:BODY:POP:BODY:P
        elementTag = `${tag.popupParentTag ? tag.popupParentTag + ":" : ""}${elementTag}`;
        elementId = `${eleId.popupParentId ? eleId.popupParentId + "+" : ""}${elementId}`;
    }
    else if (config.isPopupSlate && !tag?.isMultiColumnInPopup) {                //POP:BODY:WE:BODY:P
        elementTag = `POP:BODY:${elementTag}`;
        elementId = `${slateManifestVersioning?slateManifestVersioning:config.slateManifestURN}+${elementId}`;
    }
    else if (popupSlate) {                //POP:BODY:WE:BODY:P
        elementTag = `POP:BODY:${elementTag}`;
        elementId = `${eleId.popID}+${elementId}`;
    }
    /* if WE and Aside inside 2C element - 2C:AS/WE:--- */
    if (tag?.grandParent && eleId?.grandParentId) {
        if(elementTag?.indexOf(tag.grandParent) === -1 ) {
            elementTag = `${tag.grandParent}:${elementTag}`
            elementId = `${eleId.grandParentId}+${elementId}`
        }
        if (tag?.isMultiColumnInPopup) {
            elementTag = `POP:BODY:${elementTag}`;
            elementId = `${slateManifestVersioning?slateManifestVersioning:config.slateManifestURN}+${elementId}`;
        }
    }

    elementData = {
        elementUrn: elementId,
        elementType: elementTag
    }
    return elementData
}

/**
 * Sets tags for showhide sections
 * @param {String} showHideType Section type in showhide
 */
export const getShowHideTag = (showHideType) => {
    switch (showHideType) {
        case "show":
            return "Show"
        case "hide":
            return "Hide"
        default:
            return "Action Button Label"
    }
}


/**
 * @function setDefaultKeys
 * @description This function is to set the common keys for tcm snapshots
 * @param {Object} action - type of action performed
 * @returns {Object} Default keys for the snapshot
*/
export const setDefaultKeys = (actionStatus, isContainer, inPopupSlate, slatePopupManifestUrn, cutCopyParentUrn, elmFeedback = null) => {
    const {action,status} = actionStatus
    let tcmKeys = {}
    
    tcmKeys = {
        slateID:  slatePopupManifestUrn ?  slatePopupManifestUrn : inPopupSlate ? config.tempSlateManifestURN: cutCopyParentUrn && cutCopyParentUrn.manifestUrn ? cutCopyParentUrn.manifestUrn :config.slateManifestURN,
        slateUrn:   slatePopupManifestUrn ?  slatePopupManifestUrn : inPopupSlate ? config.tempSlateManifestURN: cutCopyParentUrn && cutCopyParentUrn.manifestUrn ? cutCopyParentUrn.manifestUrn :config.slateManifestURN,
        projectUrn: config.projectUrn,
        index: 0,
        action: action,
        feedback: elmFeedback,
        status:  (action == 'delete') ? "pending" : (config.tcmStatus && config.tcmStatus == true && (status === "" || status === "pending")) ? "pending" : "accepted",
        slateType: isContainer === true ? CONTAINER_INTRO : SLATE,/** set based on condition */
    }
    actionStatus.status = tcmKeys.status;
    return tcmKeys
}

/**
 * @function setSlateType
 * @description This function is to set the slate type in tcm snapshots
 * @param {Object} wipData - Element Wip Datas
 * @param {Object} containerElement - Element Parent Data
 * @param {String} type - type of element
*/
export const setSlateType = (wipData, containerElement, type) => {
    const { poetryData, asideData, parentUrn } = containerElement
    let isContainer;
    let hasParent = poetryData || asideData || parentUrn
    switch (true) {
        case (hasParent):
        case (containerType.indexOf(wipData?.type) !== -1):
        case (type && (containerType.indexOf(type) !== -1)):
        case (wipData?.type === POPUP_ELEMENT):
        case (config.isPopupSlate):
        case (type && formattedTitleField.includes(type)):
            isContainer = true;
            break;
        default:
            isContainer = false;
            break;
    }
    return isContainer
}
const getAssessmentType = (key, isStandAlone) => {
    const assessmentType =  ASSESSMENT_TYPE.find(item => item.type === key);
    if(assessmentType) {
        return isStandAlone? assessmentType.standAloneLabel : assessmentType.label
    }
    return key;
}

const getAssessmentStatus = (assessmentId) => {
    if(assessmentId) {
        const assessmentData = store?.getState()?.assessmentReducer?.[assessmentId];
        const assessmentStatus = assessmentData?.assessmentStatus;
        if(assessmentStatus) {
            return (assessmentStatus === 'final' ?  "Approved" : "Unapproved");
        }
    }
}
/* Prepare snapshots for pdf slate element */
function preparePDFSlateSnapshot(element) {
    return {
        pdfSlateTitle: `<p>${element?.elementdata?.filetitle || ''}</p>`,
        pdfSlateId: `<p>${element?.elementdata?.assetid || ''}</p>`,
        glossorySnapshot: '[]',
        footnoteSnapshot: '[]',
        assetPopOverSnapshot: '[]'
    }
}
const prepareStandAloneSlateSnapshot = (element, elementDetails) => {
    const elementData =element?.elementdata;
    let elementSnapshot = {};
    elementSnapshot = {
            assessmentTitle: `<p>${elementData?.assessmenttitle || elementData?.templatelabel || ''}</p>`,
            assessmentItemTitle: `<p>${elementData?.assessmentitemtitle|| ''}</p>`,
            assessmentId: `<p>${elementData?.assessmentid|| ''}</p>`,
            assessmentItemId: `<p>${elementData?.assessmentitemid|| ''}</p>`,
            assessmentUsageType: `<p>${elementData?.usagetype|| ''}</p>`,
            assessmentStatus: `<p>${getAssessmentStatus(elementData?.assessmentId) || ''}</p>`,
            assessmentType: `<p>${getAssessmentType(elementData?.assessmentformat, true) || ''}<p>`,
            glossorySnapshot: '[]',
            footnoteSnapshot: '[]',
            assetPopOverSnapshot: '[]'
        }
    return elementSnapshot;
}

/**
 * @function prepareFigureElementSnapshots
 * @description This function is to set the keys for tcm snapshots for FIGURE ELEMENT
 * @param {String} status - status of action performed
 * @param {Object} action - type of action performed
 * @param {String} element - wipData for figure element
 * @returns {Object} Element snapshot for TCM_Snapshot
*/
export const prepareFigureElementSnapshots = async (element, actionStatus, index) => {
    let elementSnapshot = {};
    let semanticSnapshots = element.type !== CITATION_ELEMENT ? await setSemanticsSnapshots(element, actionStatus, index) : {};
    elementSnapshot = {
        ...element ? setFigureElementContentSnapshot(element,actionStatus) : "",
        glossorySnapshot: JSON.stringify([]),
        footnoteSnapshot:  JSON.stringify(isEmpty(semanticSnapshots) === false ? semanticSnapshots.footnoteSnapshot : []),
        assetPopOverSnapshot: JSON.stringify([])
    }
    
    return elementSnapshot;
}

/**
 * @function prepareElementSnapshots
 * @description This function is to set the common keys for tcm snapshots
 * @param {String} status - status of action performed
 * @param {Object} action - type of action performed
 * @param {String} element - wipData for element
 * @returns {Object} Element snapshot for TCM_Snapshot
*/
export const prepareElementSnapshots = async (element,actionStatus,index, elementDetails, CurrentSlateStatus) => {
    let elementSnapshot = {};
    let semanticSnapshots = (![CITATION_ELEMENT, ELEMENT_TYPE_PDF].includes(element?.type)) ? await setSemanticsSnapshots(element,actionStatus,index) : {};
    /* Element type PDF Slate */
    if (element?.type === ELEMENT_TYPE_PDF) {
        elementSnapshot = preparePDFSlateSnapshot(element);  
    } 
    else if(element.type !== ELEMENT_ASSESSMENT) {
        elementSnapshot = {
            contentSnapshot: element ? setContentSnapshot(element,elementDetails,actionStatus, CurrentSlateStatus) : "",
            glossorySnapshot: JSON.stringify(isEmpty(semanticSnapshots) === false ? semanticSnapshots.glossarySnapshot : []),
            footnoteSnapshot:  JSON.stringify(isEmpty(semanticSnapshots) === false ? semanticSnapshots.footnoteSnapshot : []),
            assetPopOverSnapshot:  JSON.stringify(isEmpty(semanticSnapshots) === false ? semanticSnapshots.assetPopoverSnapshot : [])
        }
    } else {
        elementSnapshot = {
            ...prepareStandAloneSlateSnapshot(element, elementDetails),
           
        }
    }
    return elementSnapshot;
}

/**
 * Generates content snapshot data for figure element
 * @param {Object} element Figure element data
 */
export const setFigureElementContentSnapshot = (element, actionStatus) => {
    let formattedLabel, formattedNumber, formattedTitle
    formattedLabel = getTitleSubtitleModel(element.html.title, "formatted-title", "figure").replace(' class="paragraphNumeroUno"', '');
    formattedNumber = getTitleSubtitleModel(element.html.title, "formatted-number", "figure").replace(' class="paragraphNumeroUno"', '');
    formattedTitle = getTitleSubtitleModel(element.html.title, "formatted-subtitle", "figure").replace(' class="paragraphNumeroUno"', '');
    
    let snapshotData = {
        title: handleBlankLineDom(formattedLabel, 'BlankLine') || "",
        figurenumber: handleBlankLineDom(formattedNumber, 'BlankLine') || "",
        subtitle: handleBlankLineDom(formattedTitle, 'BlankLine') || "",
        captions: handleBlankLineDom(element.html.captions, 'BlankLine') || "",
        credits: handleBlankLineDom(element.html.credits, 'BlankLine') || "" 
    }

    switch (element.figuretype) {
        case "video":
            snapshotData["metadata"] = element.figuredata?.videoid?.trim().length ? `<p>${element.figuredata.videoid}</p>` : "<p><br></p>"
            break;
        case "audio":
            snapshotData["metadata"] = element.figuredata.audioid.trim().length ? `<p>${element.figuredata.audioid}</p>` : "<p><br></p>"
            break;
        case "codelisting":             // for BCE
            snapshotData["codeblock"] =  element.html.preformattedtext ? element.html.preformattedtext : "<p><br></p>"
            snapshotData["metadata"] = prepareMetablock(element, actionStatus)
            break;
        case "authoredtext":            // for MML
            snapshotData["metadata"] = element.html.text ? `${handleBlankLineDom(element.html.text, 'BlankLine')}` : "<p><br></p>"
            break;
        case "interactive":
            snapshotData = {
                ...snapshotData,
                ...getInteractiveSubtypeData(element.figuredata, element.html)
            }
            break;
        case 'assessment': {
        const elementData = element?.figuredata?.elementdata; 
        if(elementData){
                snapshotData = {
                    assessmentTitle: `<p>${elementData?.assessmenttitle|| ''}</p>`,
                    assessmentItemTitle: `<p>${elementData?.assessmentitemtitle|| ''}</p>`,
                    assessmentId: `<p>${elementData?.assessmentid || ''}</p>`,
                    assessmentItemId: `<p>${elementData?.assessmentitemid || ''}</p>`,
                    assessmentUsageType: `<p>${elementData?.usagetype || ''}</p>`,
                    // status only sent in case of elm and learnosity
                    assessmentStatus: `<p>${getAssessmentStatus(elementData.assessmentid) || ''}</p>`,
                    assessmentType: `<p>${getAssessmentType(elementData?.assessmentformat, false) || ''}<p>`
                }  
            }
            break;   
        }
        case "image":
        case "table":
        case "mathImage":
        default: 
            snapshotData["metadata"] = element.figuredata.imageid.trim().length ? `<p>${element.figuredata.imageid}</p>` : "<p><br></p>"
            break;
    }
    return snapshotData
}

const prepareMetablock = (element, actionStatus) => {
    let programLang = element.figuredata.programlanguage && element.figuredata.programlanguage != 'Select' ? element.figuredata.programlanguage : ''
    let toggleSyntaxhighlight = element.figuredata.syntaxhighlighting == false ? 'OFF' : 'ON'
    let toggleNumber = element.figuredata.numbered == false ? 'OFF' : 'ON'
    let startNumberField = element.figuredata.startNumber && toggleNumber == 'ON' ? element.figuredata.startNumber : "NA"
    let finalMetaBlock = `<p><span class='bce-metadata'>Syntax-highlighting: </span>${toggleSyntaxhighlight}</p><p><span class='bce-metadata'>Language: </span>${programLang}</p><p><span class='bce-metadata'>Line Number: </span>${toggleNumber}</p><p><span class='bce-metadata'>Start numbering from: </span>${startNumberField}</p>`

    return finalMetaBlock
}


export const setContentSnapshot = (element, elementDetails, actionStatus, CurrentSlateStatus) => {
    let snapshotData = "";
    if (element.type === MULTI_COLUMN_GROUP && (element.groupdata && element.groupdata.bodymatter && element.groupdata.bodymatter[0].html.text)) {
        snapshotData = element.groupdata.bodymatter[0].html.text
    } else if (element.type === BLOCKFEATURE && element.elementdata && element.elementdata.type && element.elementdata.type == 'blockquote') {
        let blockQuoteText = element.html && element.html.text ? element.html.text : "";
        snapshotData = blockQuoteText && blockQuoteText.trim() !== "" ? blockQuoteText.replace(bqHiddenText,"").replace(bqAttrHtmlTrue, "").replace(bqAttrHtmlFalse, "") : "";
    } else if(elementDetails && elementDetails.elementType && (elementDetails.elementType.includes("LB") && actionStatus && actionStatus.action == 'create') && CurrentSlateStatus != 'approved' && elementDetails.isMetaFieldExist === true){
        snapshotData = '<p></p>'          
    }  
    /**else if(element.type === ELEMENT_LIST && element.html && element.html.text){
        snapshotData = element.html.text.replace(/<br>/g,"")
    }*/
    else {
        snapshotData = element.html && element.html.text ? element.html.text : "";
    }
    snapshotData = handleBlankLineDom(snapshotData,'BlankLine');
    snapshotData = snapshotData && snapshotData.replace(/data-mce-href="#"/g,'');
    snapshotData = snapshotData && removeCalloutTitle(snapshotData);
    return snapshotData
}
/**
 * @function isEmpty
 * @description This function is to check if an object is empty
 * @param {Object} obj - object to be checked
 * @returns {Boolean}
*/
const isEmpty = (obj) => {
    if ((Object.keys(obj).length === 0 && obj.constructor === Object)) {
        return true;
    }
    return false;
}

/**
 * @function tcmSnapshotsForUpdate
 * @description-This function is to prepare snapshot during create element process
 * @param {Object} elementUpdateData - Object containing required element data
 * @param {String} elementIndex - index of element
 * @param {Object} containerElement - Element Parent Data
 * @param {Function} dispatch to dispatch tcmSnapshots
*/
export const tcmSnapshotsForUpdate = async (elementUpdateData, elementIndex, containerElement, dispatch, assetRemoveidForSnapshot) => {
    if (elementUpdateData.response.hasOwnProperty("figuretype") && !allowedFigureTypesForTCM.includes(elementUpdateData.response.figuretype)) {
        return false
    }
    let actionStatus = {
        action:"update",
        status:"",
        fromWhere:"update"
    }
    let {updateBodymatter, response,updatedId,currentParentData} = elementUpdateData;
    let currentSlateData = currentParentData[config.slateManifestURN] 
    if(config.isPopupSlate){
        currentSlateData.popupSlateData = currentParentData[config.tempSlateManifestURN]
    }
    const { metaDataField, sectionType, parentElement, showHideObj } = containerElement;
    /* Get the element type */
    const typeOfElement = containerElement?.asideData?.type;
    let wipData = {};
    if ((metaDataField || sectionType) && parentElement && parentElement.type == POPUP_ELEMENT) {
        wipData = metaDataField && parentElement.popupdata && parentElement.popupdata[FORMATTED_TITLE] ? parentElement.popupdata[FORMATTED_TITLE] : parentElement.popupdata && parentElement.popupdata.postertextobject[0] ? parentElement.popupdata.postertextobject[0] : wipData;
    } else
    /** 
    * @description For SHOWHIDE Element - prepare parent element data
    * Update - 2C/Aside/POP:SH:New 
    */
    if(typeOfElement === SHOWHIDE) {
        containerElement = prepareSnapshots_ShowHide(containerElement, response, elementIndex, currentSlateData);
        wipData = containerElement?.showHideObj?.currentElement || {};
    } 
    else if(typeOfElement === POETRY_ELEMENT) {
        containerElement = prepareSnaphotPoetry(containerElement, response, elementIndex, currentSlateData);
        // for versioning case, we get the last data from wip
        // so initilizing the wip
        wipData = containerElement?.poetryData?.currentElement || {};
  
    }
    else {
        wipData = fetchElementWipData(updateBodymatter, elementIndex, response.type, "", actionStatus.action, containerElement)
    }
    
    let versionStatus = fetchManifestStatus(updateBodymatter, containerElement, response.type);
    /** latest version for WE/CE/PE/AS/2C*/
    containerElement = await checkContainerElementVersion(containerElement, versionStatus,currentSlateData)
    let oldData = Object.assign({}, response);
    /** set new slate Manifest in store also */
    // if(containerElement.slateManifest){
    //     delete Object.assign(currentParentData, {[containerElement.slateManifest]: currentParentData[currentSlateData.id] })[currentSlateData.id];     
    //     //currentParentData[containerElement.slateManifest].status = "wip"
    //     currentParentData[containerElement.slateManifest].id = containerElement.slateManifest
    //     dispatch({
    //         type: VERSIONING_SLATEMANIFEST,
    //         payload: {slateLevelData:currentParentData}
    //     })
    // }

    if (response.id !== updatedId) {
        if (oldData.poetrylines) {
            oldData.poetrylines = wipData?.poetrylines;
        }
        else{
            if (oldData?.type === FIGURE) {
                oldData = {
                    ...oldData,
                    title: wipData?.title,
                    subtitle: wipData?.subtitle,
                    captions: wipData?.captions,
                    credits: wipData?.credits,
                    figuredata: elementUpdateData && elementUpdateData.figureData && Object.keys(elementUpdateData.figureData).length > 0 ? elementUpdateData.figureData : wipData?.figuredata
                }
                if( elementUpdateData && elementUpdateData.figureData && Object.keys(elementUpdateData.figureData).length > 0){
                    dispatch(storeOldAssetForTCM({}))
                }
            }
           
            else {
                if(oldData.type === ELEMENT_ASSESSMENT) {
                    oldData.elementdata = elementUpdateData?.figureData
                    dispatch(storeOldAssetForTCM({}))
                } else {
                    oldData.elementdata = wipData?.elementdata;
                }
                
            }
        }
        oldData.html = wipData?.html;
        let actionStatusVersioning = Object.assign({}, actionStatus);
        actionStatusVersioning.action="create"
        actionStatusVersioning.status ="accepted"
        actionStatusVersioning.assetRemoveidForSnapshot = assetRemoveidForSnapshot
        /** After versioning with old snapshots*/
        prepareTcmSnapshots(oldData, actionStatusVersioning, containerElement, "",elementIndex)
    }
    /** Normal Scenario and after versioning with new snapshots*/
    prepareTcmSnapshots(response, actionStatus, containerElement, "",elementIndex)
}

/**
 * @function tcmSnapshotsForCreate
 * @description-This function is to prepare snapshot during create element process
 * @param {Object} elementCreateData - Object containing required element data
 * @param {String} type - type of element
 * @param {Object} containerElement - Element Parent Data
 * @param {Function} dispatch to dispatch tcmSnapshots
*/
export const tcmSnapshotsForCreate = async (elementCreateData, type, containerElement, dispatch, index, operationType = null, elmFeedback = null) => {
    if (elementCreateData.response.hasOwnProperty("figuretype") && !allowedFigureTypesForTCM.includes(elementCreateData.response.figuretype)) {
        return false
    }
    const actionStatus = {
        action: operationType === 'cut' ? "update" : "create",
        status:"",
        fromWhere:"create"
    }
    operType= operationType;
    let currentSlateData = elementCreateData.currentParentData[config.slateManifestURN] 
    if(config.isPopupSlate){
        currentSlateData.popupSlateData = elementCreateData.currentParentData[config.tempSlateManifestURN]
    }
    let versionStatus = {};
    /** This condition is required to check version of elements when bodymatter has elements and is not a container on slate */
    if (elementCreateData.bodymatter && elementCreateData.bodymatter.length !== 0 && (parentType.indexOf(type) === -1)) {
        versionStatus = fetchManifestStatus(elementCreateData.bodymatter, containerElement, type);
    }
    containerElement = await checkContainerElementVersion(containerElement, versionStatus, currentSlateData);
    prepareTcmSnapshots(elementCreateData.response, actionStatus, containerElement, type, index, elmFeedback,operationType);
}

/**
 * @function fetchManifestStatus
 * @description This function is to get the status for Parent elements
 * @param {Object} bodymatter bodymatter for current slate  
 * @param {Object} parentElement Object containing all the parent data for elements
 * @param {String} type type of element
 * @returns {Object} Parent Elements' status
*/
export const fetchManifestStatus = (bodymatter, containerElement, type, indexes) => {
    let parentData = {}
    const { asideData, parentUrn, poetryData, parentElement, showHideObj } = containerElement;
    if ((asideData || parentUrn || poetryData || parentElement || showHideObj) && bodymatter.length !== 0) {
        let parentElem = asideData ? asideData : poetryData ? poetryData : parentUrn;
        if (asideData?.parent?.type === SHOWHIDE && (asideData?.element?.type === CITATION_GROUP || asideData?.element?.type === ELEMENT_ASIDE)) {
            parentElem = asideData?.parent;
        }
        
        let parentId = parentElem && parentElem.id ? parentElem.id : parentUrn && parentUrn.manifestUrn ? parentUrn.manifestUrn : "";
        if(asideData?.type === "poetry" && asideData?.grandParent?.asideData?.type === SHOWHIDE){
            parentId = parentElem && parentElem?.grandParent?.asideData?.id
        }
        let element = bodymatter.find(item => item.id == parentId);
        let eleType = type === SECTION_BREAK ? SECTION_BREAK : parentUrn && parentUrn.elementType ?parentUrn.elementType: "";
        let popupElem = parentElement && parentElement.type === POPUP_ELEMENT ? parentElement : undefined
        let showHideElem = showHideObj && showHideObj.element && showHideObj.element.type === SHOWHIDE ? showHideObj.element : undefined;
        switch (eleType) {
            case MULTI_COLUMN_GROUP:                         /** In Multi-Column */
                parentData.parentStatus = element && element.status ? element.status : undefined;
                let columndata = element.groupeddata.bodymatter[Number(parentUrn.columnIndex)]
                parentData.childStatus = parentUrn && columndata.id === parentUrn.manifestUrn ? columndata.status : undefined;
                break;
            case WE_MANIFEST:                                /** In Section-Break */
                if (asideData && element && element.id !== parentUrn.manifestUrn) {
                    parentData.parentStatus = element.status;
                    element.elementdata && element.elementdata.bodymatter.map((ele) => {
                        parentData.childStatus = parentUrn && ele.id === parentUrn.manifestUrn ? ele.status : undefined;
                        parentData.popupStatus = popupElem && popupElem.status ? popupElem.status : undefined; /** Check Popup Status */
                    })
                }
                break;
            case POPUP_ELEMENT:
                /** Formatted-title and CTA */
                parentData.parentStatus = popupElem && popupElem.status ? popupElem.status : undefined;
                break;
            case ELEMENT_ASIDE:                              /** In WE-HEAD | Aside */
            case SECTION_BREAK:                              /** Create Section-Break */
            case POETRY_ELEMENT:                             /** In Poetry */
            case CITATION_GROUP:                            /** In Citations */
            case SHOWHIDE:
            default:
                parentData.parentStatus = element && element.status ? element.status : undefined;
                parentData.popupStatus = popupElem && popupElem.status ? popupElem.status : undefined; /** Check Popup Status */
                parentData.showHideStatus = showHideElem && showHideElem.status ? showHideElem.status : undefined;
                break;
        }
        if(asideData?.type === MULTI_COLUMN && showHideObj?.showHideType) {
            const multiColumnDetails = {
                ...parentUrn,
                type: MULTI_COLUMN
            }
            prepareParentData(asideData, {...parentUrn, multiColumnDetails });
        }
        if(parentUrn?.multiColumnDetails?.type === MULTI_COLUMN) prepareParentData(asideData, parentUrn);
        /** When AS/WE in MUlti-Column */
        if(asideData?.parent?.type === MULTI_COLUMN){
            const multiColElem =  bodymatter.find(item => item.id == asideData?.parent?.id);
            parentData.multiColParentStatus = multiColElem?.status ?? undefined;
            const columnIndex = asideData.parent.columnName == 'C3' ? 2 : asideData.parent.columnName == 'C2' ? 1 : 0;
            const columnValue = multiColElem.groupeddata.bodymatter[columnIndex];
            if (asideData?.parent && columnValue?.contentUrn) {
                asideData.parent.columnContentUrn = columnValue.contentUrn;
                asideData.parent.parentContentUrn = multiColElem?.contentUrn;
            }
            parentData.multiColChildStatus = columnValue.status ?? undefined;
            parentData.parentStatus = asideData?.element?.status ?? undefined;
            parentData.popupStatus = popupElem && popupElem.status ? popupElem.status : undefined; /** Check Popup Status */
            parentData.showHideStatus = showHideElem && showHideElem.status ? showHideElem.status : undefined;
            if (asideData?.element?.id !== parentUrn?.manifestUrn) {
                asideData?.element?.elementdata?.bodymatter.map((ele) => {
                    parentData.childStatus = parentUrn && ele.id === parentUrn.manifestUrn ? ele.status : undefined;
                })
            }
        }
        if (asideData?.parent?.type === SHOWHIDE && (asideData?.element?.type === CITATION_GROUP || asideData?.element?.type === ELEMENT_ASIDE)) {
            element.interactivedata[asideData?.parent?.showHideType].map((ele) => {
                parentData.childStatus = ele.id === asideData?.element?.id ? ele.status : undefined;
            })
        }
        if(asideData?.type === "poetry" && asideData?.grandParent?.asideData?.type === SHOWHIDE){
            element.interactivedata[asideData?.grandParent?.asideData?.sectionType].map((ele) => {
                parentData.childStatus = ele.id === asideData?.id ? ele.status : undefined;
            })
        }
    }
    return parentData
}

/**
 * 
 * @param {Object} asideData 
 * @param {Object} parentUrn 
 * @returns {Object} asideData with parent data 
 */
function prepareParentData(asideData, parentUrn) {
    if(!asideData?.parent) {
        const { type, manifestUrn, columnName, contentUrn, mcId } = parentUrn?.multiColumnDetails;
        asideData.parent = {
            type,
            id: mcId || manifestUrn,
            columnName,
            parentContentUrn: contentUrn,
            columnContentUrn: ""
        }
    }
}

/**
 * @function checkContainerElementVersion
 * @description This function is to check versioning status for slate and container elements and 
 *              fetch new ManifestUrn based on the status
 * @param {Object} containerElement Object containing all the parent data for elements  
 * @param {Object} versionStatus parent element status for versioning
 * @param {Object} currentSlateData current Slate data 
 * @returns {Object} Updated Container Element with latest Manifest Urns
*/
export const checkContainerElementVersion = async (containerElement, versionStatus, currentSlateData, actionType, deleteElementType) => {
    /** latest version for WE/CE/PE/AS*/
    if (versionStatus && versionStatus.parentStatus && versionStatus.parentStatus === "approved" && containerElement?.asideData?.parent?.type !== SHOWHIDE) {
        let contentUrn = containerElement.asideData ? containerElement.asideData.contentUrn : containerElement.poetryData ? containerElement.poetryData.contentUrn : containerElement.parentUrn ? containerElement.parentUrn.contentUrn : ""
        if (contentUrn) {
            let newManifestData = await getLatestVersion(contentUrn);
            if (newManifestData) {
                if (containerElement.poetryData) {
                    containerElement.poetryData.id = newManifestData;
                    containerElement.poetryData.parentUrn = newManifestData;
                }
                else if (containerElement.asideData) {
                    containerElement.asideData.id = newManifestData
                    containerElement.parentUrn.manifestUrn = newManifestData
                }
                else if (containerElement.parentUrn) {
                    containerElement.parentUrn.manifestUrn = newManifestData
                }
            }
        }
    }
    /** latest version for SB*/
    if ((versionStatus && versionStatus.childStatus && versionStatus.childStatus === "approved") || (actionType === 'delete' && deleteElementType === 'manifest')) {
        let newSectionManifest = await getLatestVersion(containerElement.parentUrn.contentUrn);
        containerElement.parentUrn.manifestUrn = newSectionManifest ? newSectionManifest : containerElement.parentUrn.manifestUrn
    }

    if(versionStatus && versionStatus.popupStatus && versionStatus.popupStatus === "approved"){
        let updatedPopupUrn = containerElement && containerElement.parentElement && containerElement.parentElement.contentUrn ? containerElement.parentElement.contentUrn : "";
        if(updatedPopupUrn){
            let newPopupManifestUrn = await getLatestVersion(updatedPopupUrn);
            containerElement.parentElement.id = newPopupManifestUrn;
            containerElement.parentElement.versionUrn = newPopupManifestUrn;
        }
    }
    if (versionStatus && versionStatus.showHideStatus && versionStatus.showHideStatus === "approved") {
        let updatedPopupUrn = containerElement && containerElement.showHideObj && containerElement.showHideObj.element && containerElement.showHideObj.element.type == SHOWHIDE && containerElement.showHideObj.element.contentUrn ? containerElement.showHideObj.element.contentUrn : "";
        if (updatedPopupUrn) {
            let newPopupManifestUrn = await getLatestVersion(updatedPopupUrn);
            if(containerElement.parentElement && containerElement.parentElement.type == SHOWHIDE){
                containerElement.parentElement.id = newPopupManifestUrn;
                containerElement.parentElement.versionUrn = newPopupManifestUrn;
            }
            containerElement.showHideObj.element.id = newPopupManifestUrn;
            containerElement.showHideObj.element.versionUrn = newPopupManifestUrn;
        }
    }
    if(containerElement?.asideData?.parent?.type === MULTI_COLUMN){
        if (versionStatus.multiColParentStatus === "approved") {
            let updatedMulColParentUrn = containerElement?.asideData?.parent?.parentContentUrn ?? "";
            if (updatedMulColParentUrn) {
                let newMulColManifestUrn = await getLatestVersion(updatedMulColParentUrn);
                containerElement.asideData.parent.id = newMulColManifestUrn;
                containerElement.parentUrn.mcId = newMulColManifestUrn;
            }
        }
        if (versionStatus.multiColChildStatus === "approved") {
            let updatedMulColChildUrn = containerElement?.asideData?.parent?.columnContentUrn ?? "";
            if (updatedMulColChildUrn) {
                let newMulColGroupManifestUrn = await getLatestVersion(updatedMulColChildUrn);
                containerElement.asideData.parent.columnId = newMulColGroupManifestUrn;
                containerElement.parentUrn.manifestUrn = newMulColGroupManifestUrn;
            }
        }
    }
    if (containerElement?.asideData?.parent?.type === SHOWHIDE && (containerElement?.asideData?.element?.type === CITATION_GROUP || containerElement?.asideData?.element?.type === ELEMENT_ASIDE)) {
        if (versionStatus?.parentStatus === "approved") {
            let newShUrn = await getLatestVersion(containerElement?.asideData?.parent?.contentUrn);
            containerElement.asideData.parent.id = newShUrn;
        }
        if (containerElement?.asideData?.element?.status === "approved") {
            let newElemUrn = await getLatestVersion(containerElement?.asideData?.element?.contentUrn);
            containerElement.asideData.element.id = newElemUrn;
            containerElement.asideData.id = newElemUrn;
            containerElement.parentUrn.manifestUrn = newElemUrn;
        }
        if (containerElement?.parentUrn?.elementType === "manifest") {
            let newElemUrn = await getLatestVersion(containerElement?.parentUrn?.contentUrn);
            containerElement.parentUrn.manifestUrn = newElemUrn;
        }

    }
     // poetry inside show hide versioning
    if((containerElement?.poetryData?.element?.type === "poetry" &&  containerElement?.poetryData?.parent?.type === SHOWHIDE) || (containerElement?.poetryData?.element?.type === "poetry" && containerElement?.poetryData?.element?.grandParent?.asideData?.type === SHOWHIDE) ){
        if (versionStatus?.parentStatus === "approved") {
            const grandParent = containerElement?.poetryData?.parent ?  containerElement?.poetryData?.parent : containerElement?.poetryData?.element?.grandParent?.asideData
            let newShUrn = await getLatestVersion(grandParent?.contentUrn);
            let updatedId = containerElement?.poetryData?.parent ? containerElement?.poetryData?.parent?.id : containerElement?.poetryData?.element?.grandParent?.asideData?.id
            updatedId = newShUrn;
        }
        if (containerElement?.poetryData?.element?.status === "approved") {
            const poetryUrn = containerElement?.poetryData?.contentUrn ? containerElement?.poetryData?.contentUrn : containerElement?.poetryData?.element?.contentUrn
            let newElemUrn = await getLatestVersion(poetryUrn);
            containerElement.poetryData.element.id = newElemUrn
            containerElement.poetryData.id = newElemUrn;
        }
    }

    // also check if status is approved
    // only then go inside this
    if(
    currentSlateData && currentSlateData.status && currentSlateData.status === 'approved' && 
    containerElement?.poetryData?.element?.type === "poetry") {
       

        const poetryElement = containerElement?.poetryData?.element;
        const newPoetryUrn =  await getLatestVersion(poetryElement.contentUrn);
        containerElement.poetryData.element.id = newPoetryUrn;
        // poetry data with aside data (inside we/mc/aside)
        if(containerElement?.poetryData?.element?.grandParent?.asideData?.type) {
            const grandParent = containerElement?.poetryData?.element?.grandParent?.asideData;
            const grandParentType = grandParent.type;
            if(grandParentType === 'element-aside') {
                const asideNewUrn = await getLatestVersion(grandParent.contentUrn);
                containerElement.poetryData.element.grandParent.asideData.id = asideNewUrn;
                // in case of WE also update manifest urn, 
                // which is used to get if details are added 
                // in head or body
                if (grandParent.subtype) {
                    const newElemUrn = await getLatestVersion(containerElement?.parentUrn?.contentUrn);
                    containerElement.parentUrn.manifestUrn = newElemUrn;
                }
            }
            else if (grandParentType === "groupedcontent")  {
                // get column id in case of multi column
                // also add this into parentUrn
                const updatedMulColParentUrn = containerElement?.parentUrn.contentUrn;
                if (updatedMulColParentUrn) {
                    const multiColumnProperties = containerElement?.poetryData?.element?.grandParent
                    const manifestUrn =  await getLatestVersion(multiColumnProperties.columnContentUrn);
                    containerElement.parentUrn.manifestUrn =manifestUrn;
                    const mcId = containerElement?.parentUrn?.mcId;

                    const cid =  await getLatestVersion(multiColumnProperties.parentContentUrn);
                    containerElement.parentUrn.mcId = cid;
                }
            }
    }

    }
    // poetry data without aside data
    /** latest version for slate*/
    if (currentSlateData && currentSlateData.status && currentSlateData.status === 'approved') {
        let newSlateManifest = await getLatestVersion(currentSlateData.contentUrn);
        containerElement.slateManifest = newSlateManifest ? newSlateManifest : config.slateManifestURN  
        if (!currentSlateData.popupSlateData) {
            config.tcmslatemanifest = newSlateManifest;
        }  
    }
    if (currentSlateData && currentSlateData.popupSlateData && currentSlateData.popupSlateData.status === 'approved') {
        let newPopupSlateManifest = await getLatestVersion(currentSlateData.popupSlateData.contentUrn);
        containerElement.popupslateManifest = newPopupSlateManifest ? newPopupSlateManifest : config.tempSlateManifestURN
        config.tcmslatemanifest = containerElement.popupslateManifest
    }
    //console.log("containerElement ===========",containerElement)
    return containerElement;
}

/**
 * @function fetchElementWipData
 * @description-This function is to set the lael text of element
 * @param {Object} bodymatter - bodymatter before delete  
 * @param {String/Number} index - index of element deleted
 * @param {String} type - type of element deleted
 * @param {String} entityUrn - entityUrn
 * @returns {Object} WipData for element 
*/
export const fetchElementWipData = (bodymatter, index, type, entityUrn, operationType, containerElement) => {
    let eleIndex, wipData = {};
    if (typeof index === "number" || (Array.isArray(index) && index.length == 1)) {   /** Delete a container or an element at slate level */
        eleIndex = Array.isArray(index) ? index[0] : index;
        wipData = bodymatter[eleIndex];
        if (wipData.subtype === WORKED_EXAMPLE) {  /** Delete Section-Break */
            wipData.elementdata.bodymatter.map((item, innerIndex) => {
                if (item.type == WE_MANIFEST && entityUrn == item.contentUrn) {
                    wipData = bodymatter[eleIndex].elementdata.bodymatter[innerIndex]
                }
            })
        }
    }
    else if (typeof index === "string") {
        eleIndex =  index.split("-");
        switch (type) {
            case POETRY_STANZA:                      /** Inside Poetry */
            if (eleIndex.length == 3) {          /** Inside WE-HEAD | Aside */
                wipData = bodymatter[eleIndex[0]].contents.bodymatter[eleIndex[2]];
            } else if (eleIndex.length == 5 && !([MULTI_COLUMN, SHOWHIDE].includes(bodymatter[eleIndex[0]].type))) {   /** Inside WE-BODY */
                wipData = bodymatter[eleIndex[0]]?.elementdata?.bodymatter[eleIndex[1]]?.contents?.bodymatter[eleIndex[2]].contents.bodymatter[eleIndex[4]]
            } else if (eleIndex.length == 4 && !([MULTI_COLUMN, SHOWHIDE].includes(bodymatter[eleIndex[0]].type))) {   /** Inside WE-BODY */
                wipData = bodymatter[eleIndex[0]]?.elementdata?.bodymatter[eleIndex[1]]?.contents?.bodymatter[eleIndex[3]]
            } else if (eleIndex.length == 5 && ([MULTI_COLUMN].includes(bodymatter[eleIndex[0]].type))) {   /** Inside WE-BODY */
                wipData = bodymatter[eleIndex[0]].groupeddata.bodymatter[eleIndex[1]].groupdata.bodymatter[eleIndex[2]].contents.bodymatter[eleIndex[4]]
            }
                break;
            case CITATION_ELEMENT:
                if (eleIndex?.length === 4) {
                    let sectionType = containerElement?.asideData?.parent?.showHideType;
                    wipData = sectionType ? bodymatter[eleIndex[0]].interactivedata[sectionType][eleIndex[2]].contents.bodymatter[eleIndex[3] - 1] : {};
                } else {
                    wipData = bodymatter[eleIndex[0]].contents.bodymatter[eleIndex[1] - 1];
                }
                break;
            case ELEMENT_LIST:
            case BLOCKFEATURE:
            case AUTHORED_TEXT:
            case LEARNING_OBJECTIVE:
            case SHOWHIDE:
                if (eleIndex.length == 2) {          /** Inside WE-HEAD | Aside */
                    wipData = bodymatter[eleIndex[0]].elementdata.bodymatter[eleIndex[1]];
                } else if (eleIndex.length == 3 && !([MULTI_COLUMN, SHOWHIDE].includes(bodymatter[eleIndex[0]].type))) {   /** Inside WE-BODY */
                    wipData = bodymatter[eleIndex[0]].elementdata.bodymatter[eleIndex[1]].contents.bodymatter[eleIndex[2]];
                } else if(eleIndex.length == 3 && bodymatter[eleIndex[0]].type === MULTI_COLUMN){      /** Inside Multi-Column */
                    wipData = bodymatter[eleIndex[0]].groupeddata.bodymatter[eleIndex[1]].groupdata.bodymatter[eleIndex[2]]
                } else if(eleIndex.length == 4 && bodymatter[eleIndex[0]]?.type === MULTI_COLUMN){
                    wipData = bodymatter[eleIndex[0]]?.groupeddata?.bodymatter[eleIndex[1]]?.groupdata?.bodymatter[eleIndex[2]]?.elementdata?.bodymatter[eleIndex[3]]
                } else if(eleIndex.length == 5 && bodymatter[eleIndex[0]]?.type === MULTI_COLUMN){
                    wipData = bodymatter[eleIndex[0]]?.groupeddata?.bodymatter[eleIndex[1]]?.groupdata?.bodymatter[eleIndex[2]]?.elementdata?.bodymatter[eleIndex[3]]?.contents?.bodymatter[eleIndex[4]]
                } else if ((eleIndex.length == 4 || eleIndex.length == 5) && bodymatter[eleIndex[0]]?.type === SHOWHIDE && containerElement?.asideData?.parent?.showHideType) {
                    let sectionType = containerElement?.asideData?.parent?.showHideType;
                    if (eleIndex.length == 5) {
                        wipData = bodymatter[eleIndex[0]]?.interactivedata[sectionType][eleIndex[2]]?.elementdata?.bodymatter[eleIndex[3]]?.contents?.bodymatter[eleIndex[4]];
                    } else {
                        wipData = bodymatter[eleIndex[0]]?.interactivedata[sectionType][eleIndex[2]]?.elementdata?.bodymatter[eleIndex[3]];
                    }
                }
                break;
            case POPUP_ELEMENT:/** To set Parent Element from GlossaryFootnote Action- Create title from footnote */           
                wipData = popupWipData(bodymatter, eleIndex,operationType,wipData)
                break;
            case FIGURE:
                wipData = generateWipDataForFigure(bodymatter, index)
                break;
            case ELEMENT_ASIDE:                      /** Inside Aside */
                if (eleIndex.length == 3 && bodymatter[eleIndex[0]].type === MULTI_COLUMN) {
                    const sectionBreakParent = bodymatter[eleIndex[0]]?.groupeddata?.bodymatter[eleIndex[1]]?.groupdata?.bodymatter[eleIndex[2]];
                    if (sectionBreakParent?.subtype === WORKED_EXAMPLE) {  /** Delete Section-Break */
                        sectionBreakParent?.elementdata?.bodymatter.map((item, innerIndex) => {
                            if (item.type == WE_MANIFEST && entityUrn == item.contentUrn) {
                                wipData = sectionBreakParent?.elementdata?.bodymatter[innerIndex]
                            }
                        })
                    }
                }
                break;
        }
    }
    return wipData;
}

export const popupWipData = (bodymatter, eleIndex,operationType,wipData) => {
    if(operationType != "delete"){
        if (eleIndex.length == 2) {           /** Formatted-title in Popup Element */
            wipData = bodymatter[eleIndex[0]];
        } else if (eleIndex.length == 3) {    /** Inside WE-HEAD | Aside */
            wipData = bodymatter[eleIndex[0]].elementdata.bodymatter[eleIndex[1]];
        } else if (eleIndex.length == 4 && bodymatter[eleIndex[0]].type !== MULTI_COLUMN) {   /** Inside WE-BODY */
            wipData = bodymatter[eleIndex[0]].elementdata.bodymatter[eleIndex[1]].contents.bodymatter[eleIndex[2]];
        }
    }
    else{
        if (eleIndex.length == 2) {           /** Formatted-title in Popup Element */
            wipData = bodymatter[eleIndex[0]].elementdata.bodymatter[eleIndex[1]];
        }
        else if(eleIndex.length == 3){
            wipData = bodymatter[eleIndex[0]].elementdata.bodymatter[eleIndex[1]].contents.bodymatter[eleIndex[2]];
        }
    }
    return wipData;
}
/**
 * @function fetchParentData
 * @description This function is to set the parentData for the element
 * @param {Object} bodymatter - bodymatter for conversion  
 * @param {String/Number} indexes - index of element converted
 * @returns {Object} ParentData fo given element
*/
export const fetchParentData = (bodymatter, indexes, showHideObj, response) => {
    /* Convert of Figure inside 2C:AS/WE Only Update Action */
    const { asideData, parentUrn } = store?.getState()?.appStore || {};
    const { type,  parent, grandParent } = asideData || {};
    const isFigure = (response?.type === FIGURE) && (type === ELEMENT_ASIDE) && (parent?.type === MULTI_COLUMN);
    
    let parentData = {};
    let tempIndex = Array.isArray(indexes) ? indexes : (typeof indexes === "number") ? indexes.toString() : indexes.split("-");
    let isChildElement = elementType.indexOf(bodymatter[tempIndex[0]].type) === -1 ? true : false
    if(tempIndex.length >1 && bodymatter[tempIndex[0]].type == POPUP_ELEMENT){
        isChildElement = false /** Formatted-title in Popup */
    }
    if (isChildElement == true) {
        if (showHideObj) {
            parentData.showHideObj = { ...showHideObj }
            if (!(asideData?.type === 'element-aside' && asideData?.parent?.type === 'showhide' && tempIndex?.length > 3)) {
                const { parentElement } = setParentUrn(bodymatter, tempIndex);
                parentData.parentUrn = {
                    manifestUrn: parentElement?.id,
                    contentUrn: parentElement?.contentUrn,
                    elementType: parentElement?.type
                }
            }
        }
        else {
            const { parentElement, multiColumnData } = setParentUrn(bodymatter, tempIndex, isFigure, asideData);
            parentData.parentUrn = {
                manifestUrn: parentElement?.id,
                contentUrn: parentElement?.contentUrn,
                elementType: parentElement?.type
            }
            if (multiColumnData) {
                parentData.parentUrn.columnName = multiColumnData.columnName;
                parentData.parentUrn.columnIndex = multiColumnData.columnIndex;
            }
        }
        if (showHideObj && ((asideData?.type === 'element-aside' && asideData?.parent?.type === 'showhide' && tempIndex?.length > 3))) {
            parentData.showHideObj = { ...showHideObj }
            parentData.parentUrn = { ...parentUrn }
            parentData.asideData = { ...asideData }
        }
        else {
            parentData.asideData = {
                contentUrn: bodymatter[tempIndex[0]].contentUrn,
                id: bodymatter[tempIndex[0]].id,
                subtype: bodymatter[tempIndex[0]].subtype,
                type: bodymatter[tempIndex[0]].type,
                element: bodymatter[tempIndex[0]]
            }
        }
        if(isFigure) {
             parentData.asideData.figureIn2cAside = { isExist : true, asideData };
        }
        /** Footntoe Glossary for elements in S/WE in 2C */
        if (bodymatter[tempIndex[0]].type === MULTI_COLUMN) {
            const asideWeCondition = bodymatter[tempIndex[0]]?.groupeddata?.bodymatter[tempIndex[1]]?.groupdata?.bodymatter[tempIndex[2]]
            if(asideWeCondition?.type === ELEMENT_ASIDE && asideData){
                parentData = {
                    ...parentData,
                    asideData: asideData,
                    parentUrn: parentUrn
                }
            }
            /* 3C:SH:Figure conversion snapshots */
            if(asideData?.type === SHOWHIDE && grandParent?.asideData?.type === MULTI_COLUMN) {
                parentData = {
                    ...parentData,
                    asideData: grandParent?.asideData,
                    parentUrn: grandParent?.parentUrn
                }
            }
        }
    }
    return parentData;
}

/**
 * @function setParentUrn
 * @description This function is to set the parentUrn key for the container elements
 * @param {Object} bodymatter - bodymatter for conversion  
 * @param {String/Number} tempIndex - index of element converted
 * @returns {Object} ParentData fo given element
*/
const setParentUrn = (bodymatter, tempIndex, isFigure, asideData = {}) => {
    let parentElement = {}, multiColumnData = {};
    if (tempIndex.length == 2) {
        parentElement = bodymatter[tempIndex[0]]
    } else if (tempIndex.length == 3) {
        switch (bodymatter[tempIndex[0]].type) {
            case ELEMENT_ASIDE:
                parentElement = bodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]];
                /** Formatted-title in Popup */
                parentElement = parentElement.type == POPUP_ELEMENT || parentElement.type == FIGURE ? bodymatter[tempIndex[0]] : parentElement;
                break;
            case MULTI_COLUMN:
                parentElement = bodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]]
                multiColumnData = {
                    columnIndex: tempIndex[1],
                    columnName: tempIndex[1] == '0' ? 'C1' : 'C2'
                }
                break;
            case POETRY_ELEMENT:
            default:
                parentElement = bodymatter[tempIndex[0]]
                break;
        }
    } else if (tempIndex.length == 4) {
        if (bodymatter[tempIndex[0]].type === MULTI_COLUMN) {
            parentElement = bodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]]
            multiColumnData = {
                columnIndex: tempIndex[1],
                columnName: tempIndex[1] == '0' ? 'C1' : 'C2'
            }
        }
        /**Showhide inside WE head or in Aside */
        else if (bodymatter[tempIndex[0]].type === ELEMENT_ASIDE) {
            parentElement = bodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]]
            parentElement = parentElement.type === SHOWHIDE ? bodymatter[tempIndex[0]] : parentElement;
        }
        /**Aside/WE inside S/H */
        else if (bodymatter[tempIndex[0]].type === SHOWHIDE && asideData?.parent?.showHideType) {
            let sectionType = asideData?.parent?.showHideType;
            parentElement = bodymatter[tempIndex[0]].interactivedata[sectionType][tempIndex[2]];
            parentElement = parentElement.type === ELEMENT_ASIDE ? bodymatter[tempIndex[0]] : parentElement;
        }
        else {
            parentElement = bodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]]
        }
    } else if(isFigure && tempIndex.length === 5 ) {
        parentElement = bodymatter[tempIndex[0]]?.groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]].contents.bodymatter[tempIndex[4]]
    }
    /**Showhide inside WE body/manifest */
    else if (tempIndex.length === 5) {
        parentElement = bodymatter[tempIndex[0]]?.elementdata?.bodymatter[tempIndex[1]]
    }
    return {
        parentElement,
        multiColumnData
    }
}

export const containerSnapshotsInShowhide = (wipData, index, containerElement, actionStatus, item, SHType) => {
    containerElement = {
        sectionType: SHType,
        showHideObj: {
            currentElement: item,
            element: wipData,
            showHideType: SHType
        }
    }
    let type = item.type === "citations" ? "CITATION" : "CONTAINER";
    prepareTcmSnapshots(item, actionStatus, containerElement, type, index);
}


