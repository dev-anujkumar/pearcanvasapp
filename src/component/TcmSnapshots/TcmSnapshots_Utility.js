/**
 * Module - Tcm_Snapshots_Utility
 * Description - This Module contains the utility functions to prepare TCM snapshots
 */

/**************************Import Modules**************************/
import config from '../../config/config.js';
import { sendElementTcmSnapshot, getLatestVersion } from './TcmSnapshot_Actions.js';
import { setSemanticsSnapshots, fetchElementsTag } from './ElementSnapshot_Utility.js';
/*************************Import Constants*************************/
import TcmConstants from './TcmConstants.js';
 import { VERSIONING_SLATEMANIFEST } from "./../../constants/Action_Constants";

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
    bqHiddenText
}
    = TcmConstants;

/**
 * @function prepareTcmSnapshots
 * @description This is the root function to prepare the data for TCM Snapshots
 * @param {Object} wipData - Element Wip Data
 * @param {String} actionStatus - action performed
 * @param {Object} containerElement - Element Parent Data
 * @param {String} type - type of element
 * @param {Object} newVersionUrns - Latest  Version Urns for delete case
*/
export const prepareTcmSnapshots = (wipData, actionStatus, containerElement, type, newVersionUrns,index) => {
    const { parentElement, slateManifest,popupslateManifest } = containerElement
    /** isContainer : used to set SlateType  */
    let isContainer = setSlateType(wipData,containerElement,type);
    let deleVercase = newVersionUrns ? true : false
    let defaultKeys = config.isPopupSlate ? setDefaultKeys(actionStatus, true, true, popupslateManifest) : setDefaultKeys(actionStatus, isContainer,"",slateManifest);
    /* Tag of elements*/
    let tag = {
        parentTag: fetchElementsTag(wipData)
    }
    /* ID of elements*/
    let elementId = {
        parentId: deleVercase && newVersionUrns[wipData.id] ? newVersionUrns[wipData.id] : wipData.id
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
            tcmSnapshotsElementsInPopupInContainer(snapshotsData, defaultKeys, containerElement, type, deleVercase, newVersionUrns,index);
        } else {                           /** Elements in Containers/ Simple Elements in PopupSlate */
            tcmSnapshotsOnDefaultSlate(snapshotsData, defaultKeys, containerElement, type, deleVercase, newVersionUrns,index);
        }
    }
    /* For POPUP Element */
    else if ((wipData.type === POPUP_ELEMENT && (type == POP_UP || type == POPUP_ELEMENT)) || (parentElement && parentElement.type == POPUP_ELEMENT)) {
        if (hasParentData) { /** Popup Inside WE/Aside */
            tcmSnapshotsPopupInContainer(snapshotsData, defaultKeys, containerElement, type, deleVercase, newVersionUrns,index);
        }
        else {               /** Popup Element */
            tcmSnapshotsInPopupElement(snapshotsData, defaultKeys, containerElement, type, deleVercase, newVersionUrns,index);
        }
    }
    /** TCM Snapshots on Default Slate - Section/I.S. */
    else {
        tcmSnapshotsOnDefaultSlate(snapshotsData, defaultKeys, containerElement, type, deleVercase, newVersionUrns,index)
    }
}

/**
 * @function tcmSnapshotsOnDefaultSlate
 * @description This is the function to prepare the data for TCM Snapshots for elements on default slate - Section/I.S.
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {String} defaultKeys - default keys of tcm snapshot
 * @param {Object} containerElement - Element Parent Data
 * @param {String} type - type of element
 * @param {Boolean} deleVercase - Check for delete versioning action
 * @param {Object} newVersionUrns - Latest  Version Urns for delete case
*/
const tcmSnapshotsOnDefaultSlate = (snapshotsData, defaultKeys, containerElement, type, deleVercase, newVersionUrns,index, isPopupSlate) => {
    const { wipData, elementId, tag, actionStatus, popupInContainer,slateManifestVersioning } = snapshotsData;
    const { poetryData, asideData, parentUrn } = containerElement
    /* For WE creation*/
    if (wipData.type === ELEMENT_ASIDE && type != SECTION_BREAK) {
        tcmSnapshotsCreateAsideWE(snapshotsData, defaultKeys, deleVercase, newVersionUrns,index, isPopupSlate);
    }
    /* action on Section break in WE*/
    else if (type === SECTION_BREAK || wipData.type === WE_MANIFEST) {
        tcmSnapshotsCreateSectionBreak(containerElement, snapshotsData, defaultKeys, deleVercase, newVersionUrns,index, isPopupSlate)
    }
    /* action on element in WE/PE/CG/2C */
    else if (poetryData || asideData || parentUrn) {
        tcmSnapshotsInContainerElements(containerElement, snapshotsData, defaultKeys, deleVercase, newVersionUrns,index, isPopupSlate)
    }
    /* action on PE and CG */
    else if (wipData.type === CITATION_GROUP || wipData.type === POETRY_ELEMENT) {
        tcmSnapshotsCitationPoetry(snapshotsData, defaultKeys, deleVercase, newVersionUrns,index, isPopupSlate);
    }
    /* action on Multi-column */
    else if (wipData.type === MULTI_COLUMN) {
        tcmSnapshotsMultiColumn(containerElement, snapshotsData, defaultKeys, deleVercase, newVersionUrns,index, isPopupSlate);
    }
    else {
        if (deleVercase) {
            wipData.id = newVersionUrns[wipData.id]
            wipData.versionUrn = newVersionUrns[wipData.id]
        }
        let elementDetails = setElementTypeAndUrn(elementId, tag, "", "", undefined, popupInContainer, slateManifestVersioning, isPopupSlate);
        prepareAndSendTcmData(elementDetails, wipData, defaultKeys, actionStatus,index);
    }
}

/**
 * @function tcmSnapshotsCreateAsideWE
 * @description This is the function to prepare the data for TCM Snapshots for Action = Create & Elements = Aside/WE
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {String} defaultKeys - default keys of tcm snapshot
 * @param {Boolean} deleVercase - Check for delete versioning action
 * @param {Object} newVersionUrns - Latest  Version Urns for delete case
*/
const tcmSnapshotsCreateAsideWE = (snapshotsData, defaultKeys, deleVercase, newVersionUrns,index, isPopupSlate) => {
    let elementDetails;
    const { wipData, elementId, tag, actionStatus, popupInContainer, slateManifestVersioning } = snapshotsData;
    wipData.elementdata.bodymatter && wipData.elementdata.bodymatter.map((item) => {
        if (item.type === WE_MANIFEST) {
            item.contents.bodymatter.map((ele) => {
                if (elementType.indexOf(ele.type) !== -1) {
                    elementId.childId = deleVercase ? newVersionUrns[ele.id] : ele.id;
                    tag.childTag = fetchElementsTag(ele);
                    elementDetails = setElementTypeAndUrn(elementId, tag, wipData.subtype === WORKED_EXAMPLE ? 'BODY' : "", item.id,undefined,popupInContainer,slateManifestVersioning,isPopupSlate);
                    prepareAndSendTcmData(elementDetails, ele, defaultKeys, actionStatus,index);
                }
            })
        }
        else if (elementType.indexOf(item.type) !== -1) {
            elementId.childId = deleVercase ? newVersionUrns[item.id] : item.id;
            tag.childTag = fetchElementsTag(item);
            elementDetails = setElementTypeAndUrn(elementId, tag, wipData.subtype === WORKED_EXAMPLE ? "HEAD" : "", "",undefined,popupInContainer,slateManifestVersioning, isPopupSlate);
            prepareAndSendTcmData(elementDetails, item, defaultKeys, actionStatus,index);
        }
    })
}

/**
 * @function tcmSnapshotsCreateSectionBreak
 * @description This is the function to prepare the data for TCM Snapshots for Action = Create & Elements = Section-Break
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {Object} containerElement - Element Parent Data
 * @param {String} defaultKeys - default keys of tcm snapshot
 * @param {Boolean} deleVercase - Check for delete versioning action
 * @param {Object} newVersionUrns - Latest  Version Urns for delete case
*/
const tcmSnapshotsCreateSectionBreak = (containerElement, snapshotsData, defaultKeys, deleVercase, newVersionUrns,index, isPopupSlate) => {
    let elementDetails;
    const { wipData, elementId, tag, actionStatus,popupInContainer,slateManifestVersioning } = snapshotsData;
    const { asideData, parentUrn } = containerElement
    tag.parentTag = asideData && fetchElementsTag(asideData) ? fetchElementsTag(asideData) : fetchElementsTag(wipData)
    elementId.parentId = asideData && asideData.id ? asideData.id : parentUrn && parentUrn.manifestUrn ? parentUrn.manifestUrn : "";
    wipData.contents.bodymatter.map((item) => {
        if (elementType.indexOf(item.type) !== -1) {
            elementId.childId = deleVercase ? newVersionUrns[item.id] : item.id;
            tag.childTag = fetchElementsTag(item);
            elementDetails = setElementTypeAndUrn(elementId, tag, "BODY", wipData.id,undefined,popupInContainer,slateManifestVersioning, isPopupSlate);
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
 * @param {Boolean} deleVercase - Check for delete versioning action
 * @param {Object} newVersionUrns - Latest  Version Urns for delete case
*/
const tcmSnapshotsInContainerElements = (containerElement, snapshotsData, defaultKeys, deleVercase, newVersionUrns,index, isPopupSlate) => {
    let elementDetails;
    const { wipData, elementId, tag, actionStatus, popupInContainer,slateManifestVersioning } = snapshotsData;
    const { poetryData, asideData, parentUrn } = containerElement
    let parentElement = asideData ? asideData : poetryData ? poetryData : parentUrn;
    elementId.parentId = parentElement && parentElement.id ? parentElement.id : parentUrn && parentUrn.manifestUrn ? parentUrn.manifestUrn : "";
    elementId.childId = deleVercase ? newVersionUrns[wipData.id] : wipData.id;
    elementId.columnId = parentUrn && parentUrn.elementType === MULTI_COLUMN_GROUP && parentUrn.manifestUrn ? parentUrn.manifestUrn : "";
    // deleVercase ? parentUrn && newVersionUrns[parentUrn.manifestUrn] : parentUrn && parentUrn.manifestUrn;
    if (deleVercase) {
        wipData.id = newVersionUrns[wipData.id]
        wipData.versionUrn = newVersionUrns[wipData.id]
    }
    tag.parentTag = fetchElementsTag(parentElement);
    tag.childTag = fetchElementsTag(wipData);
    let isHead = asideData && asideData.type === ELEMENT_ASIDE && asideData.subtype === WORKED_EXAMPLE ? parentUrn.manifestUrn == asideData.id ? "HEAD" : "BODY" : "";
    elementDetails = setElementTypeAndUrn(elementId, tag, isHead, parentUrn && parentUrn.manifestUrn ? parentUrn.manifestUrn : "", parentUrn ? parentUrn.columnIndex : -1, popupInContainer, slateManifestVersioning, isPopupSlate);
    prepareAndSendTcmData(elementDetails, wipData, defaultKeys, actionStatus,index);
}

/**
 * @function tcmSnapshotsMultiColumn
 * @description This is the function to prepare the data for TCM Snapshots for Action = Create & Elements = Mutli-column
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {String} defaultKeys - default keys of tcm snapshot
 * @param {Boolean} deleVercase - Check for delete versioning action
 * @param {Object} newVersionUrns - Latest  Version Urns for delete case
*/
const tcmSnapshotsMultiColumn = (containerElement,snapshotsData, defaultKeys, deleVercase, newVersionUrns,index, isPopupSlate) => {
    let elementDetails;
    const { wipData, elementId, tag, actionStatus,popupInContainer,slateManifestVersioning } = snapshotsData;
    const { parentUrn } = containerElement
    wipData.groupeddata.bodymatter.map((item, eleIndex) => {
        item.groupdata.bodymatter.map((ele) => {
            elementId.columnId = deleVercase ? newVersionUrns[item.id] : item.id;
            elementId.childId = deleVercase ? newVersionUrns[ele.id] : ele.id;
            tag.childTag = fetchElementsTag(ele);
            elementDetails = setElementTypeAndUrn(elementId, tag, "", "", parentUrn ? parentUrn.columnIndex : eleIndex,popupInContainer,slateManifestVersioning, isPopupSlate);
            prepareAndSendTcmData(elementDetails, ele, defaultKeys, actionStatus,index);
        })

    })
}

/**
 * @function tcmSnapshotsCitationPoetry
 * @description This is the function to prepare the data for TCM Snapshots for Action = Create & Elements = Citaions/Poetry
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {String} defaultKeys - default keys of tcm snapshot
 * @param {Boolean} deleVercase - Check for delete versioning action
 * @param {Object} newVersionUrns - Latest  Version Urns for delete case
*/
const tcmSnapshotsCitationPoetry = (snapshotsData, defaultKeys, deleVercase, newVersionUrns,index, isPopupSlate) => {
    let elementDetails;
    const { wipData, elementId, tag, actionStatus, popupInContainer,slateManifestVersioning } = snapshotsData;
    wipData.contents.bodymatter.map((item) => {
        elementId.childId = deleVercase ? newVersionUrns[item.id] : item.id;
        tag.childTag = fetchElementsTag(item);
        elementDetails = setElementTypeAndUrn(elementId, tag, "", "",-1,popupInContainer,slateManifestVersioning, isPopupSlate);
        prepareAndSendTcmData(elementDetails, item, defaultKeys, actionStatus,index);
    })
}
/**----------------------------------------- Popup-Element/Slate TCM Snapshots -------------------------------------- */
/**
 * @function tcmSnapshotsCreatePopup
 * @description This is the function to prepare the data for TCM Snapshots for Action = Create & Elements = Popup
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {String} defaultKeys - default keys of tcm snapshot
 * @param {Boolean} deleVercase - Check for delete versioning action
 * @param {Object} newVersionUrns - Latest  Version Urns for delete case
*/
const tcmSnapshotsCreatePopup = (snapshotsData, defaultKeys, deleVercase, newVersionUrns,index) => {
    let elementDetails;
    const { wipData, elementId, tag, actionStatus, popupInContainer,slateManifestVersioning } = snapshotsData;
    wipData.popupdata && wipData.popupdata.bodymatter.map((item) => {
        elementId.childId = deleVercase ? newVersionUrns[item.id] : item.id;
        tag.childTag = fetchElementsTag(item);
        elementDetails = setElementTypeAndUrn(elementId, tag, "BODY", "", undefined, popupInContainer,slateManifestVersioning);
        prepareAndSendTcmData(elementDetails, item, defaultKeys, actionStatus,index);
    })
}

const tcmSnapshotsDeletePopup = (snapshotsData, defaultKeys, deleVercase, newVersionUrns,index, containerElement,type) => {
    const { wipData,  actionStatus } = snapshotsData;
    wipData.popupdata && wipData.popupdata.bodymatter.map((item) => {
        let tag = {
            parentTag: fetchElementsTag(item)
        }
        tag.popupParentTag = fetchElementsTag(wipData);//WE/AS//POPUP
        /* ID of elements*/
        let elementId = {
            parentId: deleVercase && newVersionUrns[item.id] ? newVersionUrns[item.id] : item.id,
            popID: deleVercase && newVersionUrns[wipData.id] ? newVersionUrns[wipData.id] : wipData.id,
        }
        /* Initial snapshotsData of elements*/
        let snapshotsDataToSend = {
            tag: tag,
            wipData: item,
            elementId: elementId,
            actionStatus: actionStatus
        }

        tcmSnapshotsOnDefaultSlate(snapshotsDataToSend, defaultKeys,containerElement , type ,deleVercase,newVersionUrns,index,"popupSlate")
    })
}


/**
 * @function tcmSnapshotsPopupLabel
 * @description This is the function to prepare the data for TCM Snapshots for Formatted-title in Popup Element
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {Object} parentElement - Popup Element data
 * @param {String} defaultKeys - default keys of tcm snapshot
 * @param {Boolean} deleVercase - Check for delete versioning action
 * @param {Object} newVersionUrns - Latest  Version Urns for delete case
*/
const tcmSnapshotsMetadataField = (snapshotsData, defaultKeys, containerElement, deleVercase, newVersionUrns,type,index, calledFrom) => {
    let elementDetails;
    const { parentElement, metaDataField } = containerElement
    const { wipData, elementId, tag, actionStatus, popupInContainer, slateManifestVersioning } = snapshotsData;
    let metaDataFieldID = wipData.type === POPUP_ELEMENT ? wipData.popupdata['formatted-title'] && wipData.popupdata['formatted-title'].id : wipData.id;
    let wipDataTitle = calledFrom == 'delete' ? wipData.popupdata['formatted-title'] : wipData  // delete Whole pop case handling
    elementId.parentId = deleVercase ? newVersionUrns[parentElement.id] : parentElement.id;
    elementId.childId = deleVercase ? calledFrom == 'delete' ? newVersionUrns[metaDataFieldID] : newVersionUrns[wipData.id] : wipData.id; // delete Whole pop case handling

    tag.parentTag = fetchElementsTag(parentElement);
    tag.childTag = fetchElementsTag(parentElement, type ? type : metaDataField ? metaDataField : "");
    let isHeadTag = tag.parentTag == 'POP' ? "HEAD" : ""
    elementDetails = setElementTypeAndUrn(elementId, tag, isHeadTag, "", undefined, popupInContainer,slateManifestVersioning);
    prepareAndSendTcmData(elementDetails, wipDataTitle, defaultKeys, actionStatus,index);
}

/**
 * @function tcmSnapshotsPopupCTA
 * @description This is the function to prepare the data for TCM Snapshots for CTA in Popup Element
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {Object} parentElement - Popup Element data
 * @param {String} defaultKeys - default keys of tcm snapshot
 * @param {Boolean} deleVercase - Check for delete versioning action
 * @param {Object} newVersionUrns - Latest  Version Urns for delete case
*/
const tcmSnapshotsPopupCTA = (snapshotsData, defaultKeys, containerElement, deleVercase, newVersionUrns,index) => {
    let elementDetails;
    const { parentElement, sectionType } = containerElement
    const { wipData, elementId, tag, actionStatus, popupInContainer, slateManifestVersioning } = snapshotsData;
    let popupElement = parentElement ? parentElement : wipData;
    let ctaElement = wipData.type === POPUP_ELEMENT ? wipData.popupdata.postertextobject[0] : wipData;
    elementId.parentId = deleVercase ? newVersionUrns[popupElement.id] : popupElement.id;
    tag.parentTag = fetchElementsTag(popupElement);
    elementId.childId = deleVercase ? newVersionUrns[ctaElement.id] : ctaElement.id;
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
 * @param {Boolean} deleVercase - Check for delete versioning action
 * @param {Object} newVersionUrns - Latest  Version Urns for delete case
*/
const tcmSnapshotsInPopupElement = (snapshotsData, defaultKeys, containerElement, type, deleVercase, newVersionUrns,index) => {
    const { metaDataField, sectionType } = containerElement
    if (defaultKeys.action === 'create' && type == POP_UP) {     /** Create Popup */
        tcmSnapshotsPopupCTA(snapshotsData, defaultKeys, containerElement, deleVercase, newVersionUrns,index);
        tcmSnapshotsCreatePopup(snapshotsData, defaultKeys, deleVercase, newVersionUrns,index);
    }
    else if((defaultKeys.action === 'delete' && type == POPUP_ELEMENT)) {            /** Delete Popup */
        tcmSnapshotsPopupCTA(snapshotsData, defaultKeys, containerElement, deleVercase, newVersionUrns,index);
        // tcmSnapshotsCreatePopup(snapshotsData, defaultKeys, deleVercase, newVersionUrns,index);
         tcmSnapshotsDeletePopup(snapshotsData, defaultKeys, deleVercase, newVersionUrns,index,containerElement,type);
        if(defaultKeys.action === 'delete' && type == POPUP_ELEMENT && (metaDataField && formattedTitleField.includes(metaDataField))){
            tcmSnapshotsMetadataField(snapshotsData, defaultKeys, containerElement, deleVercase, newVersionUrns, metaDataField,index, 'delete');
        }
    }
    else if ((type && formattedTitleField.includes(type)) || (metaDataField && formattedTitleField.includes(metaDataField))) { /** Formatted-title */
        tcmSnapshotsMetadataField(snapshotsData, defaultKeys, containerElement, deleVercase, newVersionUrns, type,index);
    } else if (sectionType && sectionType === POSTER_TEXT_OBJ) { /** Update CTA */
        tcmSnapshotsPopupCTA(snapshotsData, defaultKeys, containerElement, deleVercase, newVersionUrns,index);
    }
}

/**
 * @function tcmSnapshotsPopupInContainer
 * @description This is the function to prepare the data for TCM Snapshots for Popup Element inside a Container Element
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {String} defaultKeys - default keys of tcm snapshot
 * @param {Object} containerElement - Element Parent Data
 * @param {String} type - type of element
 * @param {Boolean} deleVercase - Check for delete versioning action
 * @param {Object} newVersionUrns - Latest  Version Urns for delete case
*/
const tcmSnapshotsPopupInContainer = (snapshotsData, defaultKeys, containerElement, type, deleVercase, newVersionUrns,index) => {
    const { wipData, elementId, tag, actionStatus, slateManifestVersioning } = snapshotsData;
    const { poetryData, asideData, parentUrn } = containerElement
    let popupParent = asideData ? asideData : poetryData ? poetryData : parentUrn;
    elementId.popupParentId = popupParent && popupParent.id ? popupParent.id : parentUrn && parentUrn.manifestUrn ? parentUrn.manifestUrn : ""; //we:id
    elementId.parentId = deleVercase ? newVersionUrns[wipData.id] : wipData.id; //popup id
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
    tcmSnapshotsInPopupElement(popupData, defaultKeys, containerElement, type, deleVercase, newVersionUrns,index)
}

/**
 * @function tcmSnapshotsElementsInPopupInContainer
 * @description This is the function to prepare the data for TCM Snapshots for Container Element inside Popup Slate inside a  Container Element
 * @param {Object} snapshotsData - Initial Snapshots data
 * @param {String} defaultKeys - default keys of tcm snapshot
 * @param {Object} containerElement - Element Parent Data
 * @param {String} type - type of element
 * @param {Boolean} deleVercase - Check for delete versioning action
 * @param {Object} newVersionUrns - Latest  Version Urns for delete case
*/
const tcmSnapshotsElementsInPopupInContainer = (snapshotsData, defaultKeys, containerElement, type, deleVercase, newVersionUrns,index) => {
    const { wipData, elementId, tag, actionStatus, slateManifestVersioning } = snapshotsData;
    const { popupAsideData, popupParentUrn } = config.popupParentElement
    let popupParent = popupAsideData ? popupAsideData : popupParentUrn ? popupParentUrn :  undefined;
    elementId.popupParentId = popupParent && popupParent.id ? popupParent.id : ""; //we:id
    tag.popupParentTag = popupParent && fetchElementsTag(popupParent);//WE/AS
    let headWE = popupAsideData && popupAsideData.type === ELEMENT_ASIDE && popupAsideData.subtype === WORKED_EXAMPLE ? popupParentUrn.manifestUrn == popupAsideData.id ? "HEAD" : "BODY" : "";
    let bodyWE = headWE == "BODY" ? popupParentUrn && popupParentUrn.manifestUrn ? popupParentUrn.manifestUrn : "" : "";//body-id
    tag.popupParentTag = `${tag.popupParentTag}${headWE ? ":"+headWE : ""}`
    elementId.popupParentId = `${elementId.popupParentId}${headWE == "BODY" ? "+"+bodyWE : ""}`
    let popupData = {
        tag: tag,
        wipData: wipData,
        elementId: elementId,
        actionStatus: actionStatus,
        popupInContainer: true,
        slateManifestVersioning:slateManifestVersioning
    }
    tcmSnapshotsOnDefaultSlate(popupData, defaultKeys, containerElement, type, deleVercase, newVersionUrns,index);
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
const prepareAndSendTcmData = async (elementDetails, wipData, defaultKeys, actionStatus,index) => {
    let res = Object.assign({}, wipData);
    delete res["html"];
    let currentSnapshot = {
        elementUrn: elementDetails.elementUrn,
        snapshotUrn: elementDetails.elementUrn,
        elementType: elementDetails.elementType,
        elementWip: JSON.stringify(res),
        elementSnapshot: JSON.stringify(await prepareElementSnapshots(wipData,actionStatus,index)),
        ...defaultKeys
    };
    if(currentSnapshot && (currentSnapshot.elementType.includes("CTA") || currentSnapshot.elementType.includes("LB")) && currentSnapshot.action == 'create'){
        currentSnapshot.status = 'accepted'  
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
const setElementTypeAndUrn = (eleId, tag, isHead, sectionId , eleIndex,popupInContainer,slateManifestVersioning, popupSlate) => {
    console.log(slateManifestVersioning,"slateManifestVersioning")
    let elementData = {};
    let elementTag = `${tag.parentTag}${isHead ? ":" + isHead : ""}${tag.childTag ? ":" + tag.childTag : ""}`;
    let elementId = `${eleId.parentId}${sectionId && isHead === "BODY" ? "+" + sectionId : ""}${eleId.childId ? "+" + eleId.childId : ""}`
    if(eleIndex > -1){
        elementTag = `${tag.parentTag}${(eleIndex == 0) ? ':C1' : ':C2'}${tag.childTag ? ":" + tag.childTag : ""}`   ; 
        elementId =  `${eleId.parentId}${eleId.columnId ? "+" + eleId.columnId : ""}${eleId.childId ? "+" + eleId.childId : ""}`
    }
    if (popupInContainer && config.isPopupSlate) {  //WE:BODY:POP:BODY:WE:BODY:P
        elementTag = `${tag.popupParentTag ? tag.popupParentTag + ":" : ""}POP:BODY:${elementTag}`;
        elementId = `${eleId.popupParentId ? eleId.popupParentId + "+" : ""}${eleId.popID ? eleId.popID : slateManifestVersioning ? slateManifestVersioning:config.slateManifestURN}+${elementId}`;
    }
    else if (popupInContainer) {                   //WE:BODY:POP:HEAD:CTA | WE:BODY:POP:BODY:P
        elementTag = `${tag.popupParentTag ? tag.popupParentTag + ":" : ""}${elementTag}`;
        elementId = `${eleId.popupParentId ? eleId.popupParentId + "+" : ""}${elementId}`;
    }
    else if (config.isPopupSlate) {                //POP:BODY:WE:BODY:P
        elementTag = `POP:BODY:${elementTag}`;
        elementId = `${slateManifestVersioning?slateManifestVersioning:config.slateManifestURN}+${elementId}`;
    }
    else if ( popupSlate) {                //POP:BODY:WE:BODY:P
        elementTag = `POP:BODY:${elementTag}`;
        elementId = `${eleId.popID}+${elementId}`;
    }
    elementData = {
        elementUrn: elementId,
        elementType: elementTag
    }
    return elementData
}

/**
 * @function setDefaultKeys
 * @description This function is to set the common keys for tcm snapshots
 * @param {Object} action - type of action performed
 * @returns {Object} Default keys for the snapshot
*/
export const setDefaultKeys = (actionStatus, isContainer, inPopupSlate, slatePopupManifestUrn) => {
    const {action,status} = actionStatus
    let tcmKeys = {}
   
    tcmKeys = {
        slateID:  slatePopupManifestUrn ?  slatePopupManifestUrn : inPopupSlate ? config.tempSlateManifestURN:config.slateManifestURN,
        slateUrn:   slatePopupManifestUrn ?  slatePopupManifestUrn : inPopupSlate ? config.tempSlateManifestURN:config.slateManifestURN,
        projectUrn: config.projectUrn,
        index: 0,
        action: action,
        status:  (action == 'delete') ? "pending" : (config.tcmStatus && config.tcmStatus == true && status === "") ? "pending" : "accepted",
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
        case (containerType.indexOf(wipData.type) !== -1):
        case (type && (containerType.indexOf(type) !== -1)):
        case (wipData.type === POPUP_ELEMENT):
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

/**
 * @function prepareElementSnapshots
 * @description This function is to set the common keys for tcm snapshots
 * @param {String} status - status of action performed
 * @param {Object} action - type of action performed
 * @param {String} element - wipData for element
 * @returns {Object} Element snapshot for TCM_Snapshot
*/
export const prepareElementSnapshots = async (element,actionStatus,index) => {
    let elementSnapshot = {};
    let semanticSnapshots = (actionStatus.fromWhere !== "create" && element.type !== CITATION_ELEMENT) ? await setSemanticsSnapshots(element,actionStatus,index) : {};

    elementSnapshot = {
        contentSnapshot: element ? setContentSnapshot(element) : "",
        glossorySnapshot: JSON.stringify(isEmpty(semanticSnapshots) === false ? semanticSnapshots.glossarySnapshot : []),
        footnoteSnapshot:  JSON.stringify(isEmpty(semanticSnapshots) === false ? semanticSnapshots.footnoteSnapshot : []),
        assetPopOverSnapshot:  JSON.stringify(isEmpty(semanticSnapshots) === false ? semanticSnapshots.assetPopoverSnapshot : [])
    }

    return elementSnapshot;
}

const setContentSnapshot = (element) => {
    let snapshotData = "";
    if (element.type === MULTI_COLUMN_GROUP && (element.groupdata && element.groupdata.bodymatter && element.groupdata.bodymatter[0].html.text)) {
        snapshotData = element.groupdata.bodymatter[0].html.text
    } else if (element.type === BLOCKFEATURE && element.elementdata && element.elementdata.type && element.elementdata.type == 'blockquote') {
        let blockQuoteText = element.html && element.html.text ? element.html.text : "";
        snapshotData = blockQuoteText && blockQuoteText.trim() !== "" ? blockQuoteText.replace(bqHiddenText,"").replace(bqAttrHtmlTrue, "").replace(bqAttrHtmlFalse, "") : "";
    } else {
        snapshotData = element.html && element.html.text ? element.html.text : "";
    }
    snapshotData = snapshotData && snapshotData.replace(/data-mce-href="#"/g,'')
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
export const tcmSnapshotsForUpdate = async (elementUpdateData, elementIndex, containerElement, dispatch,assetRemoveidForSnapshot) => {
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
    const { metaDataField, sectionType, parentElement} = containerElement;
    let wipData = {};
    if ((metaDataField || sectionType) && parentElement && parentElement.type == POPUP_ELEMENT) {
        wipData = metaDataField && parentElement.popupdata && parentElement.popupdata[FORMATTED_TITLE] ? parentElement.popupdata[FORMATTED_TITLE] : parentElement.popupdata && parentElement.popupdata.postertextobject[0] ? parentElement.popupdata.postertextobject[0] : wipData;
    } else {
        wipData = fetchElementWipData(updateBodymatter, elementIndex, response.type, "")
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
            oldData.poetrylines = wipData.poetrylines;
        }
        else{ 
            oldData.elementdata = wipData.elementdata;
        }
        oldData.html = wipData.html;
        let actionStatusVersioning = Object.assign({}, actionStatus);
        actionStatusVersioning.action="create"
        actionStatusVersioning.status ="accepted"
        actionStatusVersioning.assetRemoveidForSnapshot = assetRemoveidForSnapshot
        /** After versioning with old snapshots*/
        prepareTcmSnapshots(oldData, actionStatusVersioning, containerElement, "","",elementIndex)
    }
    /** Normal Scenario and after versioning with new snapshots*/
    prepareTcmSnapshots(response, actionStatus, containerElement, "","",elementIndex)
}

/**
 * @function tcmSnapshotsForCreate
 * @description-This function is to prepare snapshot during create element process
 * @param {Object} elementCreateData - Object containing required element data
 * @param {String} type - type of element
 * @param {Object} containerElement - Element Parent Data
 * @param {Function} dispatch to dispatch tcmSnapshots
*/
export const tcmSnapshotsForCreate = async (elementCreateData, type, containerElement, dispatch) => {
    const actionStatus = {
        action:"create",
        status:"",
        fromWhere:"create"
    }
    let versionStatus = {};
    /** This condition is required to check version of elements when bodymatter has elements and is not a container on slate */
    if (elementCreateData.bodymatter && elementCreateData.bodymatter.length !== 0 && (parentType.indexOf(type) === -1)) {
        versionStatus = fetchManifestStatus(elementCreateData.bodymatter, containerElement, type);
    }
    containerElement = await checkContainerElementVersion(containerElement, versionStatus, elementCreateData.currentSlateData);
    prepareTcmSnapshots(elementCreateData.response, actionStatus, containerElement, type,"");
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
    const { asideData, parentUrn, poetryData, parentElement } = containerElement;
    if ((asideData || parentUrn || poetryData || parentElement) && bodymatter.length !== 0) {
        let parentElem = asideData ? asideData : poetryData ? poetryData : parentUrn;
        let parentId = parentElem && parentElem.id ? parentElem.id : parentUrn && parentUrn.manifestUrn ? parentUrn.manifestUrn : "";
        let element = bodymatter.find(item => item.id == parentId);
        let eleType = type === SECTION_BREAK ? SECTION_BREAK : parentUrn && parentUrn.elementType ?parentUrn.elementType: "";
        let popupElem = parentElement && parentElement.type === POPUP_ELEMENT ? parentElement : undefined
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
            case CITATION_GROUP:                             /** In Citations */
            default:
                parentData.parentStatus = element && element.status ? element.status : undefined;
                parentData.popupStatus = popupElem && popupElem.status ? popupElem.status : undefined; /** Check Popup Status */
                break;
        }
    }
    return parentData
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
export const checkContainerElementVersion = async (containerElement, versionStatus, currentSlateData) => {
    /** latest version for WE/CE/PE/AS*/
    if (versionStatus && versionStatus.parentStatus && versionStatus.parentStatus === "approved") {
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
    if (versionStatus && versionStatus.childStatus && versionStatus.childStatus === "approved") {
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
    /** latest version for slate*/
    console.log(currentSlateData,"currentSlateData")
    if (currentSlateData && currentSlateData.status && currentSlateData.status === 'approved') {
        let newSlateManifest = await getLatestVersion(currentSlateData.contentUrn);
        containerElement.slateManifest = newSlateManifest ? newSlateManifest : config.slateManifestURN
        if(currentSlateData.popupSlateData){
            let newPopupSlateManifest = await getLatestVersion(currentSlateData.popupSlateData.contentUrn);
         containerElement.popupslateManifest = newPopupSlateManifest ? newPopupSlateManifest : config.tempSlateManifestURN
        }
        // if(newSlateManifest)
        // {
        // containerElement.slateManifest = newSlateManifest
        // }
        console.log(containerElement,"containerElement")
    }
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
export const fetchElementWipData = (bodymatter, index, type, entityUrn) => {
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
                wipData = bodymatter[eleIndex[0]].contents.bodymatter[eleIndex[2]];
                break;
            case CITATION_ELEMENT:                   /** Inside Citations */
                wipData = bodymatter[eleIndex[0]].contents.bodymatter[eleIndex[1] - 1];
                break;
            case ELEMENT_LIST:
            case BLOCKFEATURE:
            case AUTHORED_TEXT:
            case LEARNING_OBJECTIVE:
                if (eleIndex.length == 2) {          /** Inside WE-HEAD | Aside */
                    wipData = bodymatter[eleIndex[0]].elementdata.bodymatter[eleIndex[1]];
                } else if (eleIndex.length == 3 && bodymatter[eleIndex[0]].type !== MULTI_COLUMN ) {   /** Inside WE-BODY */
                    wipData = bodymatter[eleIndex[0]].elementdata.bodymatter[eleIndex[1]].contents.bodymatter[eleIndex[2]];
                } else if(eleIndex.length == 3 && bodymatter[eleIndex[0]].type === MULTI_COLUMN){      /** Inside Multi-Column */
                    wipData = bodymatter[eleIndex[0]].groupeddata.bodymatter[eleIndex[1]].groupdata.bodymatter[eleIndex[2]]
                }
                break;
            case POPUP_ELEMENT:/** To set Parent Element from GlossaryFootnote Action- Create title from footnote */
                if (eleIndex.length == 2) {           /** Formatted-title in Popup Element */
                    wipData = bodymatter[eleIndex[0]];
                } else if (eleIndex.length == 3) {    /** Inside WE-HEAD | Aside */
                    wipData = bodymatter[eleIndex[0]].elementdata.bodymatter[eleIndex[1]];
                } else if (eleIndex.length == 4 && bodymatter[eleIndex[0]].type !== MULTI_COLUMN) {   /** Inside WE-BODY */
                    wipData = bodymatter[eleIndex[0]].elementdata.bodymatter[eleIndex[1]].contents.bodymatter[eleIndex[2]];
                }
                break;
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
export const fetchParentData = (bodymatter, indexes) => {
    let parentData = {};
    let tempIndex = Array.isArray(indexes) ? indexes : (typeof indexes === "number") ? indexes.toString() : indexes.split("-");
    let isChildElement = elementType.indexOf(bodymatter[tempIndex[0]].type) === -1 ? true : false
    if(tempIndex.length >1 && bodymatter[tempIndex[0]].type == POPUP_ELEMENT){
        isChildElement = false /** Formatted-title in Popup */
    }
    if (isChildElement == true) {
        parentData.asideData = {
            contentUrn: bodymatter[tempIndex[0]].contentUrn,
            id: bodymatter[tempIndex[0]].id,
            subtype: bodymatter[tempIndex[0]].subtype,
            type: bodymatter[tempIndex[0]].type,
            element: bodymatter[tempIndex[0]]
        }
        const { parentElement, multiColumnData } = setParentUrn(bodymatter, tempIndex);
        parentData.parentUrn = {
            manifestUrn: parentElement.id,
            contentUrn: parentElement.contentUrn,
            elementType: parentElement.type
        }
        if (multiColumnData) {
            parentData.parentUrn.columnName = multiColumnData.columnName;
            parentData.parentUrn.columnIndex = multiColumnData.columnIndex;
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
const setParentUrn = (bodymatter, tempIndex) => {
    let parentElement = {}, multiColumnData = {};
    if (tempIndex.length == 2) {
        parentElement = bodymatter[tempIndex[0]]
    } else if (tempIndex.length == 3) {
        switch (bodymatter[tempIndex[0]].type) {
            case ELEMENT_ASIDE:
                parentElement = bodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]];
                /** Formatted-title in Popup */
                parentElement = parentElement.type == POPUP_ELEMENT ? bodymatter[tempIndex[0]] : parentElement;
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
        parentElement = bodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]]
    }
    return {
        parentElement,
        multiColumnData
    }
}