/**
 * Module - Tcm_Snapshots_Utility
 * Description - This Module contains the utility functions to prepare TCM snapshots
 */

/**************************Import Modules**************************/
import config from '../../config/config.js';
import { sendElementTcmSnapshot, getLatestVersion } from './TcmSnapshot_Actions.js';
import { setSemanticsSnapshots, fetchElementsTag } from './ElementSnapshot_Utility.js';
import { VERSIONING_SLATEMANIFEST } from "./../../constants/Action_Constants";
let elementType = ['element-authoredtext', 'element-list', 'element-blockfeature', 'element-learningobjectives', 'element-citation', 'stanza'];
let containerType = ['element-aside', 'manifest', 'citations', 'poetry', 'WORKED_EXAMPLE', 'CONTAINER', 'SECTION_BREAK', 'CITATION', 'POETRY'];

/**
 * @function prepareTcmSnapshots
 * @description This is the root function to prepare the data for TCM Snapshots
 * @param {Object} wipData - Element Wip Data
 * @param {String} action - action performed
 * @param {Object} containerElement - Element Parent Data
 * @param {String} type - type of element
 * @param {String} status - pending/accepted
*/
export const prepareTcmSnapshots = (wipData, actionStatus, containerElement, type, newVersionUrns)  => {
    /** isContainer : used to set SlateType  */
    let isContainer = false;
    const {poetryData,asideData,parentUrn}=containerElement
    if ((poetryData || asideData || parentUrn) ||
        (containerType.indexOf(wipData.type) !== -1) ||
        (type && (containerType.indexOf(type) !== -1))) {
        isContainer = true;
    }
    let deleVercase = newVersionUrns ? true : false
    let defaultKeys = setDefaultKeys(actionStatus, isContainer);
    let elementDetails;
    /* Tag of elements*/
    let tag = {
        parentTag: wipData.type === "groupedcontent" ? '2C':fetchElementsTag(wipData)
    }
    /* ID of elements*/
    let elementId = {
        parentId:  deleVercase && newVersionUrns[wipData.id] ? newVersionUrns[wipData.id] :  wipData.id 
    }
       /* For 2C creation*/
    if (wipData.type === "groupedcontent") {
        wipData.groupeddata.bodymatter && wipData.groupeddata.bodymatter.map((item) => {
            if (item.type === "group") {
                item.groupdata.bodymatter.map((ele) => {
                    if (elementType.indexOf(ele.type) !== -1) {
                        elementId.childId = deleVercase ? newVersionUrns[ele.id] : ele.id;
                        tag.childTag = fetchElementsTag(ele);
                        elementDetails = setElementTypeAndUrn(elementId, tag, 'C1', item.id);
                        prepareAndSendTcmData(elementDetails, ele, defaultKeys, actionStatus);
                    }
                })
            }
        })
    }
    /* For WE creation*/
    else if (wipData.type === "element-aside" && type != "SECTION_BREAK") {
        wipData.elementdata.bodymatter && wipData.elementdata.bodymatter.map((item) => {
            if (item.type === "manifest") {
                item.contents.bodymatter.map((ele) => {
                    if (elementType.indexOf(ele.type) !== -1) {
                        elementId.childId = deleVercase ? newVersionUrns[ele.id] : ele.id;
                        tag.childTag = fetchElementsTag(ele);
                        elementDetails = setElementTypeAndUrn(elementId, tag, wipData.subtype === "workedexample" ? 'BODY' : "", item.id);
                        prepareAndSendTcmData(elementDetails, ele, defaultKeys, actionStatus);
                    }
                })
            }
            else if (elementType.indexOf(item.type) !== -1) {
                elementId.childId = deleVercase ? newVersionUrns[item.id] : item.id;
                tag.childTag = fetchElementsTag(item);
                elementDetails = setElementTypeAndUrn(elementId, tag, wipData.subtype === "workedexample" ? "HEAD" : "", "");
                prepareAndSendTcmData(elementDetails, item, defaultKeys, actionStatus);
            }
        })
    }
    /* action on Section break in WE*/
    else if (type === "SECTION_BREAK" || wipData.type === "manifest") {
        tag.parentTag = asideData && fetchElementsTag(asideData) ? fetchElementsTag(asideData) : fetchElementsTag(wipData)
        elementId.parentId = asideData && asideData.id ? asideData.id : parentUrn && parentUrn.manifestUrn ? parentUrn.manifestUrn : "";
        wipData.contents.bodymatter.map((item) => {
            if (elementType.indexOf(item.type) !== -1) {
                elementId.childId =  deleVercase ? newVersionUrns[item.id] : item.id;
                tag.childTag = fetchElementsTag(item);
                elementDetails = setElementTypeAndUrn(elementId, tag, "BODY", wipData.id);
                prepareAndSendTcmData(elementDetails, item, defaultKeys, actionStatus);
            }
        })
    }
    /* action on element in WE/PE/CG */
    else if (poetryData || asideData || parentUrn) {
        let parentElement = asideData ? asideData : poetryData ? poetryData : parentUrn;
        elementId.parentId = parentElement && parentElement.id ? parentElement.id : parentUrn && parentUrn.manifestUrn ? parentUrn.manifestUrn : "";
        elementId.childId = deleVercase ? newVersionUrns[wipData.id] : wipData.id;
        tag.parentTag = fetchElementsTag(parentElement);
        tag.childTag = fetchElementsTag(wipData);
        let isHead = asideData && asideData.type === "element-aside" && asideData.subtype === "workedexample" ? parentUrn.manifestUrn == asideData.id ? "HEAD" : "BODY" : parentUrn.columnName  ? parentUrn.columnName:"";
        elementDetails = setElementTypeAndUrn(elementId, tag, isHead, parentUrn && parentUrn.manifestUrn ? parentUrn.manifestUrn:"");
        prepareAndSendTcmData(elementDetails, wipData, defaultKeys, actionStatus);
    }
    /* action on PE and CG */
    else if (wipData.type === "citations" || wipData.type === "poetry") {
        wipData.contents.bodymatter.map((item) => {
            elementId.childId = deleVercase ? newVersionUrns[item.id] : item.id;
            tag.childTag = fetchElementsTag(item);
            elementDetails = setElementTypeAndUrn(elementId, tag, "", "");
            prepareAndSendTcmData(elementDetails, item, defaultKeys, actionStatus);
        })
    }
    else {
        elementDetails = setElementTypeAndUrn(elementId, tag);
        prepareAndSendTcmData(elementDetails, wipData, defaultKeys, actionStatus);
    }
}

/**
 * @function prepareAndSendTcmData
 * @description This function is to all keys for tcm snapshots
 * @param {Object} elementDetails - Object containing the details for Element tag & urn
 * @param {Object} wipData - Element Wip Data  
 * @param {Object} defaultKeys - default tcm_snapshot keys  
 * @param {Function} dispatch - dispatch function  
*/
const prepareAndSendTcmData = async (elementDetails, wipData, defaultKeys, actionStatus) => {
    let res = Object.assign({}, wipData);
    delete res["html"];
    let currentSnapshot = {
        elementUrn: elementDetails.elementUrn,
        snapshotUrn: elementDetails.elementUrn,
        elementType: elementDetails.elementType,
        elementWip: JSON.stringify(res),
        elementSnapshot: JSON.stringify(await prepareElementSnapshots(wipData,actionStatus)),
        ...defaultKeys
    };
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
const setElementTypeAndUrn = (eleId, tag, isHead, sectionId) => {
    let elementData = {}
    let elementTag = `${tag.parentTag}${isHead ? ":" + isHead : ""}${tag.childTag ? ":" + tag.childTag : ""}`;
    let elementId = `${eleId.parentId}${sectionId && (isHead === "BODY"||isHead === "C1") ? "+" + sectionId : ""}${eleId.childId ? "+" + eleId.childId : ""}`
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
export const setDefaultKeys = (actionStatus, isContainer) => {
    const {action,status} = actionStatus
    let tcmKeys = {}
    tcmKeys = {
        slateID: config.slateManifestURN,
        slateUrn: config.slateManifestURN,
        projectUrn: config.projectUrn,
        index: 0,
        action: action,
        status:  (config.tcmStatus && config.tcmStatus == true && status === "" && action !== 'delete') ? "pending" : "accepted",//prepareElementStatus(action),
        //set based on action (config.tcmStatus && config.tcmStatus == true && action !== 'delete') ? "Pending" : "Accepted")
        slateType: isContainer === true ? "container-introduction" : "slate",//set based on condition
    }
    actionStatus.status = tcmKeys.status
    return tcmKeys
}
/**
 * @function prepareElementSnapshots
 * @description This function is to set the common keys for tcm snapshots
 * @param {String} status - status of action performed
 * @param {Object} action - type of action performed
 * @param {String} element - wipData for element
 * @returns {Object} Element snapshot for TCM_Snapshot
*/
export const prepareElementSnapshots = async (element,actionStatus) => {
    let elementSnapshot = {};
    let semanticSnapshots = (actionStatus.fromWhere !== "create" && element.type !== 'element-citation') ? await setSemanticsSnapshots(element,actionStatus) : {};

    elementSnapshot = {
        contentSnapshot: element.html && element.html.text ? element.html.text : "",
        glossorySnapshot: JSON.stringify(isEmpty(semanticSnapshots) === false ? semanticSnapshots.glossarySnapshot : []),
        footnoteSnapshot:  JSON.stringify(isEmpty(semanticSnapshots) === false ? semanticSnapshots.footnoteSnapshot : []),
        assetPopOverSnapshot:  JSON.stringify(isEmpty(semanticSnapshots) === false ? semanticSnapshots.assetPopoverSnapshot : [])
    }

    return elementSnapshot;
}

/**
 * @function tcmSnapshotsForUpdate
 * @description-This function is to prepare snapshot during create element process
 * @param {Object} elementUpdateData - Object containing required element data
 * @param {String} elementIndex - index of element
 * @param {Object} containerElement - Element Parent Data
 * @param {Function} dispatch to dispatch tcmSnapshots
*/
export const tcmSnapshotsForUpdate = async (elementUpdateData, elementIndex, containerElement, dispatch) => {
    let actionStatus = {
        action:"update",
        status:"",
        fromWhere:"update"
    }
    let {updateBodymatter, response,updatedId,currentParentData} = elementUpdateData;
    let currentSlateData =currentParentData[config.slateManifestURN] 
    let wipData = fetchElementWipData(updateBodymatter, elementIndex, response.type,"")
    let versionStatus = fetchManifestStatus(updateBodymatter, containerElement, response.type);
    /** latest version for WE/CE/PE/AS*/
    containerElement = await checkContainerElementVersion(containerElement, versionStatus,currentSlateData)
    let oldData = Object.assign({}, response);
    //set new slate Manifest in store also
    if(containerElement.slateManifest){
        delete Object.assign(currentParentData, {[containerElement.slateManifest]: currentParentData[currentSlateData.id] })[currentSlateData.id];
        currentParentData[containerElement.slateManifest].id = containerElement.slateManifest
        dispatch({
            type: VERSIONING_SLATEMANIFEST,
            payload: {slateLevelData:currentParentData}
        })
    }
    if (response.id !== updatedId) {
        if (oldData.poetrylines) {
            oldData.poetrylines = wipData.poetrylines;
        }
        else {
            oldData.elementdata = wipData.elementdata;
        }
        oldData.html = wipData.html;
        let actionStatusVersioning = Object.assign({}, actionStatus);
        actionStatusVersioning.action="create"
        actionStatusVersioning.status ="accepted"
        /** After versioning with old snapshots*/
        prepareTcmSnapshots(oldData, actionStatusVersioning, containerElement, "","")
    }
    /** Before and after versioning with new snapshots*/
    prepareTcmSnapshots(response, actionStatus, containerElement, "","")
}

/**
 * @function fetchManifestStatus
 * @description This function is to get the status for Parent elements
 * @param {Object} bodymatter bodymatter for current slate  
 * @param {Object} parentElement Object containing all the parent data for elements
 * @param {String} type type of element
 * @returns {Object} Parent Elements' status
*/
export const fetchManifestStatus = (bodymatter, parentElement, type) => {
    let parentData = {};
    const { asideData, parentUrn, poetryData } = parentElement;

    if ((asideData || parentUrn || poetryData) && bodymatter.length !== 0) {
        bodymatter.map(element => {
            if (type === 'SECTION_BREAK' && asideData && element.id == asideData.id) {
                parentData.parentStatus = element.status;       /** Create Section-Break */
            }
            else if (parentUrn && element.id == parentUrn.manifestUrn) {
                parentData.parentStatus = element.status;       /** In WE-HEAD | Aside | Citations */
            } else if (asideData && element.type == "element-aside" && element.id == asideData.id) {
                parentData.parentStatus = element.status;
                element.elementdata && element.elementdata.bodymatter.map((ele) => {
                    if (parentUrn && ele.id === parentUrn.manifestUrn) {
                        parentData.childStatus = ele.status ;   /** In Section-Break */
                    }
                })
            }
            else if (poetryData && element.id == poetryData.parentUrn) {
                parentData.parentStatus = element.status;       /** In Poetry */
            }
        })
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
    /** latest version for slate*/
    if (currentSlateData && currentSlateData.status && currentSlateData.status === 'approved') {
        let newSlateManifest = await getLatestVersion(currentSlateData.contentUrn);
        config.slateManifestURN = newSlateManifest ? newSlateManifest : config.slateManifestURN
        if(newSlateManifest)
        {
        containerElement.slateManifest = newSlateManifest
        }

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
        if (wipData.subtype === "workedexample") {  /** Delete Section-Break */
            wipData.elementdata.bodymatter.map((item, innerIndex) => {
                if (item.type == "manifest" && entityUrn == item.contentUrn) {
                    wipData = bodymatter[eleIndex].elementdata.bodymatter[innerIndex]
                }
            })
        }
    }
    else if (typeof index === "string") {
        eleIndex =  index.split("-");
        switch (type) {
            case 'stanza':                           /** Inside Poetry */
                wipData = bodymatter[eleIndex[0]].contents.bodymatter[eleIndex[2]];
                break;
            case 'element-citation':                 /** Inside Citations */
                wipData = bodymatter[eleIndex[0]].contents.bodymatter[eleIndex[1] - 1];
                break;
            case 'element-list':
            case 'element-blockfeature':
            case 'element-authoredtext':
            case 'element-learningobjectives':
                if (eleIndex.length == 2) {          /** Inside WE-HEAD | Aside */
                    wipData = bodymatter[eleIndex[0]].elementdata.bodymatter[eleIndex[1]];
                } else if (eleIndex.length == 3 && bodymatter[eleIndex[0]].type !== "groupedcontent") {   /** Inside WE-BODY */
                    wipData = bodymatter[eleIndex[0]].elementdata.bodymatter[eleIndex[1]].contents.bodymatter[eleIndex[2]];
                }
                else if (eleIndex.length == 3) {   /** Inside Multi-Column*/
                    wipData = bodymatter[eleIndex[0]].groupeddata.bodymatter[eleIndex[1]].groupdata.bodymatter[eleIndex[2]];
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
    if (isChildElement == true) {
        parentData.asideData = {
            contentUrn: bodymatter[tempIndex[0]].contentUrn,
            id: bodymatter[tempIndex[0]].id,
            subtype: bodymatter[tempIndex[0]].subtype,
            type: bodymatter[tempIndex[0]].type,
            element: bodymatter[tempIndex[0]]
        }
        let parentElement = {}
        if(tempIndex.length == 3){
            switch (bodymatter[tempIndex[0]].type) {
                case 'poetry':
                    parentElement = bodymatter[tempIndex[0]]
                    break;
                case 'groupedcontent':
                    parentElement = bodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]]
                    parentData.parentUrn = {
                        columnIndex: tempIndex[1],
                        columnName: tempIndex[1] =='0' ? 'C1':'C2'
                    }
                    break;
                default:
                    parentElement = bodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]]
                    break;
            }
        }

        parentData.parentUrn = {
            ...parentData.parentUrn,
            manifestUrn: parentElement.id,
            contentUrn: parentElement.contentUrn,
            elementType: parentElement.type
        }
    }
    return parentData;
}

/**
 * @function isEmpty
 * @description This function is to check if an object is empty
 * @param {Object} obj - object to be checked
 * @returns {Boolean}
*/
const isEmpty = (obj) => {
    for (let key in obj) { return false; }
    return true;
}