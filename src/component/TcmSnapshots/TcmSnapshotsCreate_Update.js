import { generateWipDataForFigure } from "./ElementSnapshot_Utility";
import { getLatestVersion } from "./TcmSnapshot_Actions";
import { storeOldAssetForTCM } from '../ElementContainer/ElementContainer_Actions'
import { prepareTcmSnapshots } from "./TcmSnapshots_Utility";
import TcmConstants from "./TcmConstants";
import config from '../../config/config';
let operType = "";
const {
    AUTHORED_TEXT,
    BLOCKFEATURE,
    ELEMENT_LIST,
    ELEMENT_ASIDE,
    POETRY_ELEMENT,
    POETRY_STANZA,
    MULTI_COLUMN,
    SECTION_BREAK,
    WORKED_EXAMPLE,
    CITATION_GROUP,
    CITATION_ELEMENT,
    WE_MANIFEST,
    MULTI_COLUMN_GROUP,
    LEARNING_OBJECTIVE,
    POPUP_ELEMENT,
    FORMATTED_TITLE,
    parentType,
    FIGURE,
    ELEMENT_ASSESSMENT,
    allowedFigureTypesForTCM,
    SHOWHIDE,
    ELEMENT_TYPE_PDF
}
    = TcmConstants;


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
    if(elementUpdateData?.cypressPlusProjectStatus && elementUpdateData?.response?.type === ELEMENT_TYPE_PDF){
        return false; // disable TCM for all PDF slates in Cypress+ Enabled Projects
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
    let tempIndex = elementIndex && typeof (elementIndex) !== 'number' && elementIndex.split('-');
    let wipData = {};
    if ((metaDataField || sectionType) && parentElement && parentElement.type == POPUP_ELEMENT) {
        wipData = metaDataField && parentElement.popupdata && parentElement.popupdata[FORMATTED_TITLE] ?
        parentElement.popupdata[FORMATTED_TITLE] : parentElement.popupdata && parentElement.popupdata.postertextobject[0] ? parentElement.popupdata.postertextobject[0] : wipData;
    } else
    /** 
    * @description For SHOWHIDE Element - prepare parent element data
    * Update - 2C/Aside/POP:SH:New 
    */
    if(typeOfElement === SHOWHIDE) {
        containerElement = prepareSnapshots_ShowHide(containerElement, response, elementIndex, currentSlateData);
        wipData =  containerElement?.showHideObj?.element?.interactivedata?.[containerElement?.sectionType][tempIndex[2]]  || {};
    } 
    else if(typeOfElement === POETRY_ELEMENT) {
        containerElement = prepareSnaphotPoetry(containerElement, response, elementIndex, currentSlateData);
        // for versioning case, we get the last data from wip
        // so initilizing the wip
        let lastIndex = tempIndex[tempIndex.length - 1]
        wipData = containerElement?.poetryData?.element?.contents?.bodymatter[lastIndex] || {};
    }
    else {
        wipData = fetchElementWipData(updateBodymatter, elementIndex, response.type, "", actionStatus.action, containerElement)
    }
    
    let versionStatus = fetchManifestStatus(updateBodymatter, containerElement, response.type);
    /** latest version for WE/CE/PE/AS/2C*/
    containerElement = await checkContainerElementVersion(containerElement, versionStatus,currentSlateData)
    let oldData = Object.assign({}, response);
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
                    figuredata: elementUpdateData && elementUpdateData.figureData && Object.keys(elementUpdateData.figureData).length > 0 ?
                    elementUpdateData.figureData : wipData?.figuredata
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
    if (elementCreateData?.response?.hasOwnProperty("figuretype") && !allowedFigureTypesForTCM.includes(elementCreateData?.response?.figuretype)) {
        return false
    }
    if(elementCreateData?.cypressPlusProjectStatus && elementCreateData?.response?.type === ELEMENT_TYPE_PDF){
        return false; // disable TCM for all PDF slates in Cypress+ Enabled Projects
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
        if (wipData?.subtype === WORKED_EXAMPLE) {  /** Delete Section-Break */
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
                    wipData = bodymatter[eleIndex[0]]?.groupeddata?.bodymatter[eleIndex[1]]?.groupdata?.bodymatter[eleIndex[2]]?.elementdata?.bodymatter[eleIndex[3]]?.contents
                    ?.bodymatter[eleIndex[4]]
                } else if ((eleIndex.length == 4 || eleIndex.length == 5) && bodymatter[eleIndex[0]]?.type === SHOWHIDE && containerElement?.asideData?.parent?.showHideType) {
                    let sectionType = containerElement?.asideData?.parent?.showHideType;
                    if (eleIndex.length == 5) {
                        wipData = bodymatter[eleIndex[0]]?.interactivedata[sectionType][eleIndex[2]]?.elementdata?.bodymatter[eleIndex[3]]?.contents?.bodymatter[eleIndex[4]];
                    } else {
                        wipData = bodymatter[eleIndex[0]]?.interactivedata[sectionType][eleIndex[2]]?.elementdata?.bodymatter[eleIndex[3]];
                    }
                }
                break;
            case BLOCKFEATURE:
                if(eleIndex.length == 2 && bodymatter[eleIndex[0]]?.type === 'element-aside'){
                    wipData = bodymatter[eleIndex[0]]?.elementdata?.bodymatter[eleIndex[1]]
                } else if((eleIndex.length == 3 || eleIndex.length == 4) && bodymatter[eleIndex[0]]?.type === 'element-aside'){
                    wipData = bodymatter[eleIndex[0]]?.elementdata?.bodymatter[eleIndex[0]]
                } else if(eleIndex.length == 3 && bodymatter[eleIndex[0]]?.type === 'element-blockfeature'){
                    wipData = bodymatter[eleIndex[0]]
                } else if((eleIndex.length == 3 || eleIndex.length == 4) && (bodymatter[eleIndex[0]]?.type !== 'element-blockfeature')){
                    wipData = bodymatter[eleIndex[0]]?.groupeddata?.bodymatter[eleIndex[1]]?.groupdata?.bodymatter[eleIndex[2]]
                } else {
                    wipData = bodymatter[eleIndex[0]]
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
    }
    return parentData
}

/**
 * 
 * @param {Object} asideData 
 * @param {Object} parentUrn 
 * @returns {Object} asideData with parent data 
 */
 export function prepareParentData(asideData, parentUrn) {
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
        let contentUrn = containerElement.asideData ? containerElement.asideData.contentUrn : containerElement.poetryData ?
        containerElement.poetryData.contentUrn : containerElement.parentUrn ? containerElement.parentUrn.contentUrn : ""
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
        let updatedPopupUrn = containerElement && containerElement.showHideObj && containerElement.showHideObj.element &&
        containerElement.showHideObj.element.type == SHOWHIDE && containerElement.showHideObj.element.contentUrn ? containerElement.showHideObj.element.contentUrn : "";
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
    if (containerElement?.asideData?.parent?.type === SHOWHIDE && (containerElement?.asideData?.element?.type === CITATION_GROUP ||
        containerElement?.asideData?.element?.type === ELEMENT_ASIDE)) {
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
    if ((containerElement?.poetryData?.element?.type === "poetry" && containerElement?.poetryData?.parent?.type === SHOWHIDE) ||
        (containerElement?.poetryData?.element?.type === "poetry" && containerElement?.poetryData?.element?.grandParent?.asideData?.type === SHOWHIDE)) {
        if (versionStatus?.parentStatus === "approved") {
            const grandParent = containerElement?.poetryData?.parent ? containerElement?.poetryData?.parent : containerElement?.poetryData?.element?.grandParent?.asideData
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
        if (!currentSlateData?.popupSlateData && currentSlateData?.type !== 'popup') {
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

