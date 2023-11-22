import { fetchElementsTag } from "./ElementSnapshot_Utility";
import TcmConstants from "./TcmConstants";
import store from '../../appstore/store.js';
import { prepareAndSendTcmData, prepareTcmSnapshots, setElementTypeAndUrn } from "./TcmSnapshots_Utility";

const {
    elementType,
    ELEMENT_ASIDE,
    POETRY_ELEMENT,
    MULTI_COLUMN,
    SECTION_BREAK,
    WORKED_EXAMPLE,
    CITATION_GROUP,
    WE_MANIFEST,
    MULTI_COLUMN_GROUP,
    POPUP_ELEMENT,
    FIGURE,
    SHOWHIDE,
}
    = TcmConstants;

export const tcmSnapshotsOnDefaultSlate = (snapshotsData, defaultKeys, containerElement, type, index, isPopupSlate, operationType = null,
    popupCutCopyParentData = null, deletedElementVersionUrn="") => {
    const { wipData, elementId, tag, actionStatus, popupInContainer,slateManifestVersioning } = snapshotsData;
    const { poetryData, asideData, parentUrn, showHideObj } = containerElement
    /* For WE creation*/
    if (wipData.type === ELEMENT_ASIDE && type != SECTION_BREAK) {
        tcmSnapshotsCreateAsideWE(snapshotsData, defaultKeys,index, isPopupSlate,containerElement,popupCutCopyParentData,operationType);
    }
    /* For SH creation*/
    else if (wipData.type === SHOWHIDE) {
        tcmSnapshotsCreateShowHide(snapshotsData, defaultKeys, index, isPopupSlate, containerElement);
    }
    /* For Poetry creation (not on update) */
    else if (wipData.type === POETRY_ELEMENT) {
        tcmSnapshotsCreatePoetry(snapshotsData, defaultKeys, index, isPopupSlate, containerElement, popupCutCopyParentData);
    }
    /* action on Section break in WE*/
    else if (type === SECTION_BREAK || wipData.type === WE_MANIFEST) {
        tcmSnapshotsCreateSectionBreak(containerElement, snapshotsData, defaultKeys,index, isPopupSlate)
    }
    /* action on PE and CG */
    else if (wipData.type === CITATION_GROUP || wipData.type === POETRY_ELEMENT) {
        tcmSnapshotsCitationPoetry(containerElement, snapshotsData, defaultKeys, index, isPopupSlate, popupCutCopyParentData);
    }
    /* action on element in WE/PE/CG/2C */
    /* stanza create inside poetry inside containers */
    else if (poetryData || asideData || parentUrn || (showHideObj && Object.keys(showHideObj)?.length > 0)) {
        tcmSnapshotsInContainerElements(containerElement, snapshotsData, defaultKeys, index, isPopupSlate, operationType, popupCutCopyParentData)
    }
    /* action on Multi-column */
    else if (wipData.type === MULTI_COLUMN) {
        tcmSnapshotsMultiColumn(containerElement, snapshotsData, defaultKeys,index, isPopupSlate, operationType);
    }
    else {
        let elementDetails = setElementTypeAndUrn(elementId, tag, "", "", undefined, popupInContainer, slateManifestVersioning, isPopupSlate,
        undefined, {}, actionStatus, popupCutCopyParentData);
        // This is the case of deleting an element after versioning without update it
        if((actionStatus.action.toLowerCase() === "delete") && (deletedElementVersionUrn !== "") && (deletedElementVersionUrn !== elementDetails.elementUrn)){
            wipData.id = deletedElementVersionUrn;
            wipData.versionUrn = deletedElementVersionUrn;
        }
        prepareAndSendTcmData(elementDetails, wipData, defaultKeys, actionStatus,index);
    }
}
/**
 * @function tcmSnapshotsCreateAsideWE
 * @description This is the function to prepare the data for TCM Snapshots for Action = Create & Elements = Aside/WE
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {String} defaultKeys - default keys of tcm snapshot
*/
export const tcmSnapshotsCreateAsideWE = (snapshotsData, defaultKeys,index, isPopupSlate,containerElement,popupCutCopyParentData, operationType=null) => {
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
                    elementDetails = setElementTypeAndUrn(elementId, tag, wipData.subtype === WORKED_EXAMPLE ? 'BODY' : "", item.id,undefined,popupInContainer,
                    slateManifestVersioning,isPopupSlate, parentObj, containerElement,actionStatus,popupCutCopyParentData);
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
            elementDetails = setElementTypeAndUrn(elementId, tag, wipData.subtype === WORKED_EXAMPLE ? "HEAD" : "", "",
            undefined,popupInContainer,slateManifestVersioning, isPopupSlate, parentObj, containerElement,actionStatus,popupCutCopyParentData);
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

export const tcmSnapshotsPopup =(wipData,index,containerElement,actionStatus,item,operationType=null) => {
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
export function parentData4CutCopyASWE_2C(asideData, parentUrn) {
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
export function setParentUrnData(wipData, item) {
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

export const tcmSnapshotsShowHide =(wipData,index,containerElement,actionStatus,item,eleIndex,operationType=null) => {
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

/**
 * @function tcmSnapshotsCreateShowHide
 * @description This is the function to prepare the data for TCM Snapshots for Action = Create & Elements = showhide
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {String} defaultKeys - default keys of tcm snapshot
*/

export const tcmSnapshotsCreateShowHide = (snapshotsData, defaultKeys, index, isPopupSlate, { asideData, parentUrn }) => {
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
                elementDetails = setElementTypeAndUrn(elementId, tag, isHead, parentUrn?.manifestUrn ? parentUrn.manifestUrn : "", undefined, popupInContainer,
                slateManifestVersioning, isPopupSlate, showhide, { asideData, parentUrn });
                prepareAndSendTcmData(elementDetails, item, defaultKeys, actionStatus, index);
            } else if (item?.type === ELEMENT_ASIDE) {
                containerSnapshotsInShowhide(wipData, innerIndex, { asideData, parentUrn }, actionStatus, item, SHType)
            } else if (item?.type === CITATION_GROUP) {
                containerSnapshotsInShowhide(wipData, innerIndex, { asideData, parentUrn }, actionStatus, item, SHType)
            }
        })
    }
}

export const tcmSnapshotsCreatePoetry = (snapshotsData, defaultKeys, index, isPopupSlate, { asideData, parentUrn, showHideObj }, popupCutCopyParentData) => {
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
        const elementDetails = setElementTypeAndUrn(elementId, tag, isHead, parentUrn?.manifestUrn ? parentUrn.manifestUrn : "", undefined,
        popupInContainer, slateManifestVersioning, isPopupSlate, poetryElement, { asideData, parentUrn, showHideObj }, actionStatus, popupCutCopyParentData);
        prepareAndSendTcmData(elementDetails, item, defaultKeys, actionStatus,index);
    })
}

/**
 * @function tcmSnapshotsCreateSectionBreak
 * @description This is the function to prepare the data for TCM Snapshots for Action = Create & Elements = Section-Break
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {Object} containerElement - Element Parent Data
 * @param {String} defaultKeys - default keys of tcm snapshot
*/
export const tcmSnapshotsCreateSectionBreak = (containerElement, snapshotsData, defaultKeys,index, isPopupSlate) => {
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

                elementDetails = setElementTypeAndUrn(elementId, tag, "BODY", wipData.id, undefined, popupInContainer, slateManifestVersioning,
                isPopupSlate, parentElement, { asideData, parentUrn });
            }
            else{
                elementDetails = setElementTypeAndUrn(elementId, tag, "BODY", wipData.id,undefined,popupInContainer,slateManifestVersioning, isPopupSlate);
            }
            prepareAndSendTcmData(elementDetails, item, defaultKeys, actionStatus,index);
        }
    })
}

/**
 * @function tcmSnapshotsCitationPoetry
 * @description This is the function to prepare the data for TCM Snapshots for Action = Create & Elements = Citaions/Poetry
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {String} defaultKeys - default keys of tcm snapshot
*/
export const tcmSnapshotsCitationPoetry = (containerElement, snapshotsData, defaultKeys, index, isPopupSlate, popupCutCopyParentData) => {
    let elementDetails;
    const { wipData, elementId, tag, actionStatus, popupInContainer,slateManifestVersioning } = snapshotsData;
    let isHead = "", parentUrnToSend={};
    let parentObj = {};
    if (containerElement?.showHideObj?.currentElement?.type === ELEMENT_ASIDE || containerElement?.showHideObj?.currentElement?.type === 'citations') {
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
        elementDetails = setElementTypeAndUrn(elementId, tag, isHead,parentUrnToSend,-1,popupInContainer,slateManifestVersioning, isPopupSlate,
            parentObj, containerElement, actionStatus, popupCutCopyParentData);
        prepareAndSendTcmData(elementDetails, item, defaultKeys, actionStatus,index);
    })
}

/**
 * @function tcmSnapshotsInContainerElements
 * @description This is the function to prepare the data for TCM Snapshots for Action = Update/Del & Elements inside Aside/WE/CG/PE/MC
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {Object} containerElement - Element Parent Data
 * @param {String} defaultKeys - default keys of tcm snapshot
*/
export const tcmSnapshotsInContainerElements = (containerElement, snapshotsData, defaultKeys, index, isPopupSlate, operationType, popupCutCopyParentData) => {
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
        elementDetails = setElementTypeAndUrn(elementId, tag, isHead, parentUrn && parentUrn.manifestUrn ?
            parentUrn.manifestUrn : "", parentUrn ? parentUrn.columnIndex : -1, popupInContainer, slateManifestVersioning, isPopupSlate, parentElement, containerElement);
    } else {
        elementDetails = setElementTypeAndUrn(elementId, tag, isHead, parentUrn && parentUrn.manifestUrn ?
            parentUrn.manifestUrn : "", parentUrn ? parentUrn.columnIndex : -1, popupInContainer, slateManifestVersioning, isPopupSlate, parentElement,
            { asideData, parentUrn, showHideObj }, actionStatus, popupCutCopyParentData);
    }
    prepareAndSendTcmData(elementDetails, wipData, defaultKeys, actionStatus,index);
}

/* When cut/copy paste operation of  2c/aside:we/popup:showhide */
export const tcmSnapshotsAsideWE =(wipData,index,containerElement,actionStatus,item, columnIndex, operationType=null) => {
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

/**
 * @function tcmSnapshotsMultiColumn
 * @description This is the function to prepare the data for TCM Snapshots for Action = Create & Elements = Mutli-column
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {String} defaultKeys - default keys of tcm snapshot
*/
export const tcmSnapshotsMultiColumn = (containerElement,snapshotsData, defaultKeys,index, isPopupSlate, operationType=null) => {
    let elementDetails;
    const { wipData, elementId, tag, actionStatus,popupInContainer,slateManifestVersioning } = snapshotsData;
    const { parentUrn } = containerElement
    wipData.groupeddata?.bodymatter?.map((item, eleIndex) => {
        item.groupdata?.bodymatter?.map((ele) => {
            if(ele?.type === SHOWHIDE || ele?.type === POETRY_ELEMENT) {
               tcmSnapshotsShowHide(wipData,index,containerElement,actionStatus,ele, eleIndex, operationType);
            } else
            if(ele?.type === ELEMENT_ASIDE) {
               tcmSnapshotsAsideWE(wipData,index,containerElement,actionStatus,ele, eleIndex, operationType)
            } else if(ele?.type === 'manifestlist') {
                return false;
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
            if (!(asideData?.type === ELEMENT_ASIDE && asideData?.parent?.type === 'showhide' && tempIndex?.length > 3)) {
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
        if (showHideObj && ((asideData?.type === ELEMENT_ASIDE && asideData?.parent?.type === 'showhide' && tempIndex?.length > 3))) {
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
export const setParentUrn = (bodymatter, tempIndex, isFigure, asideData = {}) => {
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
        parentElement = bodymatter[tempIndex[0]]?.groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]].contents
        .bodymatter[tempIndex[4]]
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

