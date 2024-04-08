/**
 * Module - Tcm_Snapshots_Utility
 * Description - This Module contains the utility functions to prepare TCM snapshots
 */

/**************************Import Modules**************************/
import config from '../../config/config.js';
import { sendElementTcmSnapshot, getLatestVersion } from './TcmSnapshot_Actions.js';
import { setSemanticsSnapshots, fetchElementsTag, getInteractiveSubtypeData, removeCalloutTitle } from './ElementSnapshot_Utility.js';
import { getTitleSubtitleModel } from '../../constants/utility';
/*************************Import Constants*************************/
import TcmConstants, { ASSESSMENT_TYPE } from './TcmConstants.js';
import { handleBlankLineDom } from '../ElementContainer/UpdateElements.js';
import store from '../../appstore/store.js';
import { tcmSnapshotsOnDefaultSlate } from './TcmSnapshotsOnDefaultSlate.js';
import { PARAGRAPH_HTML, PARAGRAPH_NUMEROUNO_CLASS } from '../../constants/Element_Constants.js';


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
export const prepareTcmSnapshots = async (wipData, actionStatus, containerElement, type, index, elmFeedback = null,operationType=null, deletedElementVersionUrn = "") => {

    const { parentElement, slateManifest,popupslateManifest,cutCopyParentUrn } = containerElement
    /* Get the aside data from store for 2C:WE:Section-Break */
    const parentData = store?.getState()?.appStore?.asideData?.parent || {};
    const popupCutCopyParentData = store?.getState()?.autoNumberReducer?.popupCutCopyParentData || {};
    const popupParentSlateData = store?.getState()?.autoNumberReducer?.popupParentSlateData || {};
    const selectionMultiColumnType = store?.getState()?.selectionReducer?.selection?.multiColumnType || "";
    const figureElementList = [SMART_LINK, SECTION_BREAK, POP_UP, SHOW_HIDE, VIDEO, IMAGE, BLOCK_CODE_EDITOR, MMI_ELM, TEXT, POPUP_ELEMENT,SHOWHIDE];
    /** isContainer : used to set SlateType  */
    let isContainer = setSlateType(wipData,containerElement,type);
    let defaultKeys = config.isPopupSlate ? await setDefaultKeys(actionStatus, true, true, popupslateManifest, cutCopyParentUrn,
    elmFeedback, popupCutCopyParentData, popupParentSlateData) : await setDefaultKeys(actionStatus, isContainer,"",slateManifest,cutCopyParentUrn,
    elmFeedback, popupCutCopyParentData, popupParentSlateData);
    /* Tag of elements*/
    let tag = {
        parentTag: fetchElementsTag(wipData)
    }
    /* ID of elements*/
    let elementId = {
        parentId:  wipData?.id
    }
    /* Add WE/Aside inside 2C */
    const { asideData, parentUrn } = containerElement;
    const { id, columnId, columnName, type: gPType } = asideData?.parent || {};
    let multiColumnType = parentUrn?.multiColumnType ? parentUrn?.multiColumnType :
    asideData?.parent?.multiColumnType ? asideData?.parent?.multiColumnType : parentData.multiColumnType ? parentData.multiColumnType : selectionMultiColumnType;
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
            const isMultiColumnInPopup = hasParentData && config.isPopupSlate && ((parentUrn?.elementType === MULTI_COLUMN_GROUP &&
            (type === CONTAINER || type === WE_TYPE) ) || asideData?.parent?.type === MULTI_COLUMN) ? true : false
            snapshotsData.tag.isMultiColumnInPopup = isMultiColumnInPopup;
            tcmSnapshotsOnDefaultSlate(snapshotsData, defaultKeys, containerElement, type, index, "", operationType, popupCutCopyParentData);
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
        tcmSnapshotsOnDefaultSlate(snapshotsData, defaultKeys, containerElement, type,index, "",operationType, popupCutCopyParentData, deletedElementVersionUrn)
    }
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
    let wipDataTitle = calledFrom == 'delete'|| calledFrom == 'create' ? wipData.popupdata[FORMATTED_TITLE] : wipData  // delete Whole pop case handling
    elementId.parentId = parentElement.id;
    elementId.childId = wipData.type === POPUP_ELEMENT ?
        wipData.popupdata[FORMATTED_TITLE] && wipData.popupdata[FORMATTED_TITLE].id :
        wipData.id;; // delete Whole pop case handling

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
export const tcmSnapshotsPopupCTA = (snapshotsData, defaultKeys, containerElement,index) => {
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
        if((metaDataField && parentElement && parentElement.popupdata[FORMATTED_TITLE])){
            tcmSnapshotsMetadataField(snapshotsData, defaultKeys, containerElement, metaDataField,index, 'create');
        }
    }
    else if ((defaultKeys.action === 'create' && type == POPUP_ELEMENT && operationType==='copy') || (operationType === 'cut' &&
        defaultKeys.action === 'update')) {     /** Create Popup */
        tcmSnapshotsPopupCTA(snapshotsData, defaultKeys, containerElement,index);
        if((metaDataField && parentElement && parentElement.popupdata[FORMATTED_TITLE])){
            tcmSnapshotsMetadataField(snapshotsData, defaultKeys, containerElement, metaDataField,index, 'create');
        }
    }
    else if((defaultKeys.action === 'delete' && type == POPUP_ELEMENT)) {            /** Delete Popup */
        tcmSnapshotsPopupCTA(snapshotsData, defaultKeys, containerElement,index);
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
export const tcmSnapshotsPopupInContainer = (snapshotsData, defaultKeys, containerElement, type,index,operationType=null) => {
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
    let headWE = popupAsideData && popupAsideData.type === ELEMENT_ASIDE && popupAsideData.subtype === WORKED_EXAMPLE ?
    popupParentUrn.manifestUrn == popupAsideData.id ? "HEAD" : "BODY" : "";
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
    if (containerElement && (containerElement.popupAsideData && containerElement.popupAsideData.element?.status === "approved")) {
        let contentUrn = containerElement.popupAsideData ? containerElement.popupAsideData.contentUrn : containerElement.popupParentUrn ?
        containerElement.popupParentUrn.contentUrn : ""
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
export const checkElementsInPopupInContainer = () => {
    let isPopupInContainer = config.popupParentElement && config.popupParentElement.parentElement && config.popupParentElement.parentElement.type == 'popup' ? true : false;
    let hasPopupAsideData = config.popupParentElement && ('popupAsideData' in config.popupParentElement && !isEmpty(config.popupParentElement.popupAsideData)) ? true : false;
    let hasPopupParentUrn = config.popupParentElement && ('popupParentUrn' in config.popupParentElement && !isEmpty(config.popupParentElement.popupParentUrn)) ? true : false;
    return (isPopupInContainer && (hasPopupAsideData || hasPopupParentUrn));
}

/**
 * @function checkParentData = () =>
 * @description Check if Popup Slate is inside a Container Element
*/
export const checkParentData = (containerElement) => {
    let poetryData = containerElement && ((containerElement.poetryData != undefined ||containerElement.poetryData != null)  &&
    !isEmpty(containerElement.poetryData)) ? true : false;
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
    try{
        let res = Object.assign({}, wipData);
        delete res["html"];
        const currentUserDetails = store?.getState()?.appStore?.currentUserDetails
        let currentSnapshot = {
            elementUrn: elementDetails.elementUrn,
            snapshotUrn: elementDetails.elementUrn,
            elementType: elementDetails.elementType,
            elementWip: JSON.stringify(res),
            elementVersionUrn: res?.versionUrn || res?.id,
            elementEntityUrn: res?.contentUrn,
            elementSnapshot: wipData.type === FIGURE ? JSON.stringify(await prepareFigureElementSnapshots(wipData, actionStatus, index)) :
                JSON.stringify(await prepareElementSnapshots(wipData, actionStatus, index, elementDetails, CurrentSlateStatus)),
            firstName: currentUserDetails?.firstName || '',
            lastName: currentUserDetails?.lastName || '',
            userId: currentUserDetails?.userId || '',
            ...defaultKeys
        };
        if(currentSnapshot && ((currentSnapshot.elementType.includes("CTA") && !currentSnapshot.elementType.includes("SH")) ||
            currentSnapshot.elementType.includes("LB")) && currentSnapshot.action == 'create' && operType!=='copy'){
            currentSnapshot.status = 'accepted'
            if(currentSnapshot.elementType.includes("LB") && CurrentSlateStatus != 'approved'){
                res.elementdata.text = ''
                currentSnapshot.elementWip = JSON.stringify(res)
            }
        }
        await sendElementTcmSnapshot(currentSnapshot)
    } catch(error){
        console.log(error)
    }
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
export const setElementTypeAndUrn = (eleId, tag, isHead, sectionId , eleIndex,popupInContainer,slateManifestVersioning, popupSlate, parentElement,
    containerElement = {}, actionStatus = null, popupCutCopyParentData = null) => {
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
        } else if (asideData?.type === ELEMENT_ASIDE && asideData?.subtype !== WORKED_EXAMPLE) { //SH inside Aside
            elementTag = `AS:${elementTag}`
            elementId = `${asideData.id}+${eleId.parentId}+${eleId.childId}`
        } else if (asideData?.type === ELEMENT_ASIDE && asideData?.subtype === WORKED_EXAMPLE) { //SH inside WE - head/body
            elementTag = `WE:${isHead ? `${isHead}:` : ""}${elementTag}`
            elementId = `${asideData.id}+${sectionId && isHead === "BODY" ? `${sectionId}+` : ""}${eleId.parentId}+${eleId.childId}`
        }

        if ((popupInContainer && config.isPopupSlate) || (popupInContainer && popupSlate)) {  //WE:BODY:POP:BODY:WE:BODY:P
            elementTag = `${tag.popupParentTag ? tag.popupParentTag + ":" : ""}POP:BODY:${elementTag}`;
            elementId = `${eleId.popupParentId ? eleId.popupParentId + "+" : ""}${eleId.popID ? eleId.popID :
                slateManifestVersioning ? slateManifestVersioning:config.slateManifestURN}+${elementId}`;
        }
        else if (config.isPopupSlate && !tag?.isMultiColumnInPopup) {                //POP:BODY:WE:BODY:P
            elementTag = `POP:BODY:${elementTag}`;
            elementId = `${slateManifestVersioning?slateManifestVersioning:config.slateManifestURN}+${elementId}`;
        }
        else if (asideData?.type === MULTI_COLUMN && parentUrn) { /* 2C:SH || 3C:SH */
            const {columnName, manifestUrn, mcId} = parentUrn;
            elementTag = `${parentUrn?.multiColumnType}:${columnName}:${elementTag}`;
            elementId = `${mcId}+${manifestUrn}+${elementId}`;
        }

        if (popupCutCopyParentData?.operationType === 'cut' && actionStatus?.action === 'delete' &&
            popupCutCopyParentData?.isPopupSlate && !config.isPopupSlate) {            // operation cut from popup slate to normal slate
            elementTag = `POP:BODY:${elementTag}`;
            elementId = `${popupCutCopyParentData?.versionUrn ? popupCutCopyParentData?.versionUrn : config.slateManifestURN}+${elementId}`;
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
        // if (popupInContainer && config.isPopupSlate){  // PE inside popup
        //     elementTag = `${tag.popupParentTag ? tag.popupParentTag + ":" : ""}POP:BODY:${elementTag}`;
        //     elementId = `${eleId.popupParentId ? eleId.popupParentId + "+" : ""}${eleId.popID ? eleId.popID :
        //     slateManifestVersioning ? slateManifestVersioning:config.slateManifestURN}+${elementId}`;
        // }
       if (poetryAsideData?.type === ELEMENT_ASIDE && poetryAsideData?.subtype !== WORKED_EXAMPLE) { //block poetry inside Aside
            elementTag = `AS:${elementTag}`
            elementId = `${poetryAsideData.id}+${eleId.parentId}+${eleId.childId}`
        }
        else if (poetryAsideData?.type === ELEMENT_ASIDE && poetryAsideData?.subtype === WORKED_EXAMPLE) { //poetry inside WE - head/body
            const headString = poetryParentURN?.manifestUrn == poetryAsideData?.id ? "HEAD" : "BODY";
            elementTag = `WE:${headString}:${elementTag}`
            elementId = `${poetryAsideData.id}+${(poetryParentURN?.manifestUrn && headString === "BODY") ?
            `${poetryParentURN.manifestUrn}+` : ""}${eleId.parentId}+${eleId.childId}`
        }
        else if (poetryAsideData?.type === MULTI_COLUMN && parentUrn) { /* 2C:BP || 3C:BP */
            const {columnName, manifestUrn, mcId} = poetryParentURN;
            elementTag = `${poetryParentURN?.multiColumnType}:${columnName}:${elementTag}`;
            elementId = `${mcId}+${manifestUrn}+${elementId}`;
        }
        else if (showHideObj?.element?.type === SHOWHIDE || poetryAsideData?.type === SHOWHIDE) {
            const showSectionType = showHideObj?.sectionType ? showHideObj?.sectionType :
            showHideObj?.element?.sectionType ? showHideObj?.element?.sectionType : showHideObj?.showHideType
            let section = showSectionType ? showSectionType : poetryAsideData?.sectionType;
            let shId = showHideObj?.element?.id ? showHideObj?.element?.id : poetryAsideData?.id;
            let showHideSection = getShowHideTag(section);
            elementTag = `SH:${showHideSection}:${tag.parentTag}:${tag.childTag}`
            elementId = `${shId}+${eleId.parentId}+${eleId.childId}`
        }

        if ((popupInContainer && config.isPopupSlate)) {  //WE:BODY:POP:BODY:WE:BODY:P
            elementTag = `${tag.popupParentTag ? tag.popupParentTag + ":" : ""}POP:BODY:${elementTag}`;
            elementId = `${eleId.popupParentId ? eleId.popupParentId + "+" : ""}
            ${eleId.popID ? eleId.popID : slateManifestVersioning ? slateManifestVersioning:config.slateManifestURN}+${elementId}`;
        } else if (popupCutCopyParentData?.operationType === 'cut' && actionStatus?.action === 'delete' &&
            !popupCutCopyParentData?.isPopupSlate && config.isPopupSlate) {            // operation cut from popup slate to normal slate
            elementTag = `${elementTag}`;
            elementId = `${elementId}`;
        } else if (config.isPopupSlate && !tag?.isMultiColumnInPopup) {                //POP:BODY:WE:BODY:P
            elementTag = `POP:BODY:${elementTag}`;
            elementId = `${slateManifestVersioning?slateManifestVersioning:config.slateManifestURN}+${elementId}`;
        }

        if (popupCutCopyParentData?.operationType === 'cut' && actionStatus?.action === 'delete' &&
            popupCutCopyParentData?.isPopupSlate && !config.isPopupSlate) {            // operation cut from popup slate to normal slate
            elementTag = `POP:BODY:${elementTag}`;
            elementId = `${popupCutCopyParentData?.versionUrn ? popupCutCopyParentData?.versionUrn : config.slateManifestURN}+${elementId}`;
        }
    }

    else if ((popupInContainer && config.isPopupSlate) || (popupInContainer && popupSlate)) {  //WE:BODY:POP:BODY:WE:BODY:P
        elementTag = `${tag.popupParentTag ? tag.popupParentTag + ":" : ""}POP:BODY:${elementTag}`;
        elementId = `${eleId.popupParentId ? eleId.popupParentId + "+" : ""}${eleId.popID ? eleId.popID :
                    slateManifestVersioning ? slateManifestVersioning:config.slateManifestURN}+${elementId}`;
    }
    else if (popupInContainer) {                   //WE:BODY:POP:HEAD:CTA | WE:BODY:POP:BODY:P
        elementTag = `${tag.popupParentTag ? tag.popupParentTag + ":" : ""}${elementTag}`;
        elementId = `${eleId.popupParentId ? eleId.popupParentId + "+" : ""}${elementId}`;
    } else if (popupCutCopyParentData?.operationType === 'cut' && actionStatus?.action === 'delete' &&
        !popupCutCopyParentData?.isPopupSlate && config.isPopupSlate) {            // operation cut from normal slate to popup slate
        elementTag = `${elementTag}`;
        elementId = `${elementId}`;
    } else if (popupCutCopyParentData?.operationType === 'cut' && actionStatus?.action === 'delete' &&
        popupCutCopyParentData?.isPopupSlate ) {            // operation cut from popup slate to normal slate
        elementTag = `POP:BODY:${elementTag}`;
        elementId = `${popupCutCopyParentData?.versionUrn ? popupCutCopyParentData?.versionUrn : config.slateManifestURN}+${elementId}`;
    } else if (config.isPopupSlate && !tag?.isMultiColumnInPopup && !(containerElement?.cutCopyParentUrn)) {                //POP:BODY:WE:BODY:P
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
export const setDefaultKeys = async (actionStatus, isContainer, inPopupSlate, slatePopupManifestUrn, cutCopyParentUrn, elmFeedback = null,
    popupCutCopyParentData, popupParentSlateData) => {
    const {action,status} = actionStatus
    let tcmKeys = {}

    tcmKeys = {
        slateID:  slatePopupManifestUrn ?  slatePopupManifestUrn : inPopupSlate ? config.tempSlateManifestURN: cutCopyParentUrn &&
        cutCopyParentUrn.manifestUrn ? cutCopyParentUrn.manifestUrn :config.slateManifestURN,
        slateUrn:   slatePopupManifestUrn ?  slatePopupManifestUrn : inPopupSlate ? config.tempSlateManifestURN: cutCopyParentUrn &&
        cutCopyParentUrn.manifestUrn ? cutCopyParentUrn.manifestUrn :config.slateManifestURN,
        projectUrn: config.projectUrn,
        index: 0,
        action: action,
        feedback: elmFeedback,
        status:  (action == 'delete') ? "pending" : (config.tcmStatus && config.tcmStatus == true && (status === "" || status === "pending")) ? "pending" : "accepted",
        slateType: isContainer === true ? CONTAINER_INTRO : SLATE,/** set based on condition */
    }
    actionStatus.status = tcmKeys.status;
    if (popupCutCopyParentData?.operationType === 'cut' && action === 'delete' && ((popupCutCopyParentData?.isPopupSlate && !config.isPopupSlate) ||
    (!popupCutCopyParentData?.isPopupSlate && config.isPopupSlate)) && !popupCutCopyParentData?.isSlateApproved)
    {            // operation cut from popup slate to normal slate or vice versa
        tcmKeys = {
            ...tcmKeys,
            slateID: popupCutCopyParentData?.parentSlateId ? popupCutCopyParentData?.parentSlateId : config.slateManifestURN,
            slateUrn: popupCutCopyParentData?.parentSlateId ? popupCutCopyParentData?.parentSlateId : config.slateManifestURN,
            slateType: CONTAINER_INTRO
        }
    }
    if (popupCutCopyParentData?.operationType === 'cut' && actionStatus?.action === 'delete' &&
        popupCutCopyParentData?.isSlateApproved) {            // operation cut from popup slate to normal slate
        let newManifestUrn = await getLatestVersion(popupCutCopyParentData?.parentSlateEntityUrn);
        tcmKeys = {
            ...tcmKeys,
            slateID: newManifestUrn ? newManifestUrn : tcmKeys.slateID,
            slateUrn: newManifestUrn ? newManifestUrn : tcmKeys.slateUrn
        }
    }
    if (popupCutCopyParentData?.operationType === 'cut' && actionStatus?.action === 'delete' &&
        popupCutCopyParentData?.isPopupSlate && config.isPopupSlate && (popupCutCopyParentData?.versionUrn !== popupParentSlateData?.versionUrn) &&
        !popupCutCopyParentData?.isSlateApproved) {            // operation cut from popup slate to popup slate
        tcmKeys = {
            ...tcmKeys,
            slateID: popupCutCopyParentData?.parentSlateId ? popupCutCopyParentData?.parentSlateId : tcmKeys.slateID,
            slateUrn: popupCutCopyParentData?.parentSlateId ? popupCutCopyParentData?.parentSlateId : tcmKeys.slateUrn
        }
    }
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
export const getAssessmentType = (key, isStandAlone) => {
    const assessmentType =  ASSESSMENT_TYPE.find(item => item.type === key);
    if(assessmentType) {
        return isStandAlone? assessmentType.standAloneLabel : assessmentType.label
    }
    return key;
}

export const getAssessmentStatus = (assessmentId) => {
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
    try{
        let elementSnapshot = {};
        let semanticSnapshots = element.type !== CITATION_ELEMENT ? await setSemanticsSnapshots(element, actionStatus, index) : {};
        elementSnapshot = {
            ...element ? setFigureElementContentSnapshot(element,actionStatus) : "",
            glossorySnapshot: JSON.stringify([]),
            footnoteSnapshot:  JSON.stringify(isEmpty(semanticSnapshots) === false ? semanticSnapshots.footnoteSnapshot : []),
            assetPopOverSnapshot: JSON.stringify([])
        }
        if(element?.figuredata?.decorative) {
            elementSnapshot.captions = "<p></p>"
            elementSnapshot.subtitle = "<p></p>"
            elementSnapshot.title = "<p></p>"
        }
        return elementSnapshot;
    } catch(error){
        console.error(error)
    }
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
    try{
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
    } catch(error){
        console.error(error)
    }
}

/**
 * Generates content snapshot data for figure element
 * @param {Object} element Figure element data
 */
export const setFigureElementContentSnapshot = (element, actionStatus) => {
    let formattedLabel, formattedNumber, formattedTitle
    let isAutoNumberingEnabled= store?.getState()?.autoNumberReducer?.isAutoNumberingEnabled ?? false;
    formattedTitle = getTitleSubtitleModel(element.html.title, "formatted-subtitle", "figure").replace(PARAGRAPH_NUMEROUNO_CLASS, '');
    if (isAutoNumberingEnabled && autoNumberedElements(element)) {
        formattedLabel = getAutoNumberedLabelData(element)
    } else {
        formattedLabel = getTitleSubtitleModel(element.html.title, FORMATTED_TITLE, "figure").replace(PARAGRAPH_NUMEROUNO_CLASS, '');
        formattedNumber = getTitleSubtitleModel(element.html.title, "formatted-number", "figure").replace(PARAGRAPH_NUMEROUNO_CLASS, '');
    }
    let snapshotData = {
        title: handleBlankLineDom(formattedLabel, 'BlankLine') || "",
        // figurenumber: handleBlankLineDom(formattedNumber, 'BlankLine') || "",
        subtitle: handleBlankLineDom(formattedTitle, 'BlankLine') || "",
        captions: handleBlankLineDom(element.html.captions, 'BlankLine') || "",
        credits: handleBlankLineDom(element.html.credits, 'BlankLine') || ""
    }
    if (!(isAutoNumberingEnabled && autoNumberedElements(element))) {
        snapshotData.figurenumber = handleBlankLineDom(formattedNumber, 'BlankLine') || ""
    }
    switch (element.figuretype) {
        case "video":
            snapshotData["metadata"] = element.figuredata?.videoid?.trim().length ? `<p>${element.figuredata.videoid}</p>` : PARAGRAPH_HTML
            break;
        case "audio":
            snapshotData["metadata"] = element.figuredata.audioid.trim().length ? `<p>${element.figuredata.audioid}</p>` : PARAGRAPH_HTML
            break;
        case "codelisting":             // for BCE
            snapshotData["codeblock"] =  element.html.preformattedtext ? element.html.preformattedtext : PARAGRAPH_HTML
            snapshotData["metadata"] = prepareMetablock(element, actionStatus)
            break;
        case "authoredtext":            // for MML
            snapshotData["metadata"] = element.html.text ? `${handleBlankLineDom(element.html.text, 'BlankLine')}` : PARAGRAPH_HTML
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
            snapshotData["metadata"] = element.figuredata.imageid.trim().length ? `<p>${element.figuredata.imageid}</p>` : PARAGRAPH_HTML
            break;
    }
    return snapshotData
}

export const prepareMetablock = (element, actionStatus) => {
    let programLang = element.figuredata.programlanguage && element.figuredata.programlanguage != 'Select' ? element.figuredata.programlanguage : ''
    let toggleSyntaxhighlight = element.figuredata.syntaxhighlighting == false ? 'OFF' : 'ON'
    let toggleNumber = element.figuredata.numbered == false ? 'OFF' : 'ON'
    let startNumberField = element.figuredata.startNumber && toggleNumber == 'ON' ? element.figuredata.startNumber : "NA"
    let finalMetaBlock = `<p><span class='bce-metadata'>Syntax-highlighting: </span>${toggleSyntaxhighlight}</p><p><span class='bce-metadata'>Language:
    </span>${programLang}</p><p><span class='bce-metadata'>Line Number: </span>${toggleNumber}</p>
    <p><span class='bce-metadata'>Start numbering from: </span>${startNumberField}</p>`

    return finalMetaBlock
}


export const setContentSnapshot = (element, elementDetails, actionStatus, CurrentSlateStatus) => {
    let snapshotData = "";
    if (element.type === MULTI_COLUMN_GROUP && (element.groupdata && element.groupdata.bodymatter && element.groupdata.bodymatter[0].html.text)) {
        snapshotData = element.groupdata.bodymatter[0].html.text
    } else if (element.type === BLOCKFEATURE && element.elementdata && element.elementdata.type && element.elementdata.type == 'blockquote') {
        let blockQuoteText = element.html && element.html.text ? element.html.text : "";
        snapshotData = blockQuoteText && blockQuoteText.trim() !== "" ? blockQuoteText.replace(bqHiddenText,"").replace(bqAttrHtmlTrue, "").replace(bqAttrHtmlFalse, "") : "";
    } else if(elementDetails && elementDetails.elementType && (elementDetails.elementType.includes("LB") && actionStatus &&
        actionStatus.action == 'create') && CurrentSlateStatus != 'approved' && elementDetails.isMetaFieldExist === true){
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
    // snapshotData = snapshotData?.includes("non-breaking-space") ? removedDOMAttributes(snapshotData, 'non-breaking-space') : snapshotData
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

const allowedFigureTypesForAutoNumbering = ['image', 'table', 'mathImage', 'interactive', 'audio', 'video', 'authoredtext', 'codelisting']

export const autoNumberedElements = (element) => {

    if (element && element.type === 'figure' && allowedFigureTypesForAutoNumbering.includes(element.figuretype)) {
        return true
    }
    return false
}

/**
 * Prepare LABEL field content for snapshot
 * @param {*} element
 * @returns
 */
export const getAutoNumberedLabelData = (element) => {
    let elementLabel = `<br/>`
    if (element && element.type && element.type === 'figure') {
        if (element?.hasOwnProperty('numberedandlabel') && element['numberedandlabel'] == false) {
            elementLabel = `<br/>`; // Remove Label Case
        }
        else if (element?.hasOwnProperty('numberedandlabel') && element['numberedandlabel'] == true) {
            if (element.hasOwnProperty('manualoverride') && element['manualoverride'] !== undefined && Object.keys(element['manualoverride'])?.length > 0) {
                if (element['manualoverride'].hasOwnProperty('overridenumbervalue') && element['manualoverride'].hasOwnProperty('overridelabelvalue')) {
                    elementLabel = element['manualoverride'].overridelabelvalue // Override Label & NumberCase
                } else {
                    elementLabel = element['displayedlabel'] || `<br/>`// Default| Resume |Override Number Only Case
                }
            } else {
                elementLabel = element['displayedlabel'] || `<br/>`// Default| Resume |Override Number Only Case
            }
        }
    }
    elementLabel = `<p>${elementLabel}</p>`
    return elementLabel
}
