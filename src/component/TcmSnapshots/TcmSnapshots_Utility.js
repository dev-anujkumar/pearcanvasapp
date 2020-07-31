/**
 * Module - Tcm_Snapshots_Utility
 * Description - This Module contains the utility functions to prepare TCM snapshots
 */

/**************************Import Modules**************************/
import config from '../../config/config.js';
import { sendElementTcmSnapshot } from './TcmSnapshot_Actions.js';
import { setSemanticsSnapshots, fetchElementsTag } from './ElementSnapshot_Utility.js';

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
        parentTag: fetchElementsTag(wipData)
    }
    /* ID of elements*/
    let elementId = {
        parentId:  deleVercase && newVersionUrns[wipData.id] ? newVersionUrns[wipData.id] :  wipData.id 
    }
    /* For WE creation*/
    if (wipData.type === "element-aside" && type != "SECTION_BREAK") {
        wipData.elementdata.bodymatter && wipData.elementdata.bodymatter.map((item) => {
            if (item.type === "manifest") {
                item.contents.bodymatter.map((ele) => {
                    if (elementType.indexOf(ele.type) !== -1) {
                        elementId.childId = deleVercase ? newVersionUrns[ele.id] : ele.id;
                        tag.childTag = fetchElementsTag(ele);
                        elementDetails = setElementTypeAndUrn(elementId, tag, wipData.subtype === "workedexample" ? 'BODY' : "", item.id);
                        prepareTcmData(elementDetails, ele, defaultKeys, actionStatus);
                    }
                })
            }
            else if (elementType.indexOf(item.type) !== -1) {
                elementId.childId = deleVercase ? newVersionUrns[item.id] : item.id;
                tag.childTag = fetchElementsTag(item);
                elementDetails = setElementTypeAndUrn(elementId, tag, wipData.subtype === "workedexample" ? "HEAD" : "", "");
                prepareTcmData(elementDetails, item, defaultKeys, actionStatus);
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
                prepareTcmData(elementDetails, item, defaultKeys, actionStatus);
            }
        })
    }
    /* action on element in WE/PE/CG */
    else if (poetryData || asideData || parentUrn) {
        let parentElement = asideData ? asideData : poetryData ? poetryData : parentUrn ? parentUrn : "";
        elementId.parentId = parentElement && parentElement.id ? parentElement.id : parentUrn && parentUrn.manifestUrn ? parentUrn.manifestUrn : "";
        elementId.childId = deleVercase ? newVersionUrns[wipData.id] : wipData.id;
        tag.parentTag = fetchElementsTag(parentElement);
        tag.childTag = fetchElementsTag(wipData);
        let isHead = asideData && asideData.type === "element-aside" && asideData.subtype === "workedexample" ? parentUrn.manifestUrn == asideData.id ? "HEAD" : "BODY" : "";
        elementDetails = setElementTypeAndUrn(elementId, tag, isHead, parentUrn && parentUrn.manifestUrn ? parentUrn.manifestUrn:"");
        prepareTcmData(elementDetails, wipData, defaultKeys, actionStatus);
    }
    /* action on PE and CG */
    else if (wipData.type === "citations" || wipData.type === "poetry") {
        wipData.contents.bodymatter.map((item) => {
            elementId.childId = deleVercase ? newVersionUrns[item.id] : item.id;
            tag.childTag = fetchElementsTag(item);
            elementDetails = setElementTypeAndUrn(elementId, tag, "", "");
            prepareTcmData(elementDetails, item, defaultKeys, actionStatus);
        })
    }
    else {
        elementDetails = setElementTypeAndUrn(elementId, tag);
        prepareTcmData(elementDetails, wipData, defaultKeys, actionStatus);
    }
}

/**
 * @function prepareTcmData
 * @description This function is to all keys for tcm snapshots
 * @param {Object} elementDetails - Object containing the details for Element tag & urn
 * @param {Object} wipData - Element Wip Data  
 * @param {Object} defaultKeys - default tcm_snapshot keys  
 * @param {Function} dispatch - dispatch function  
*/
const prepareTcmData = async (elementDetails, wipData, defaultKeys, actionStatus) => {
    let res = Object.assign({}, wipData);
    delete res["html"];
    let currentSnapshot = {
        elementUrn: elementDetails.elementUrn,
        snapshotUrn: elementDetails.elementUrn,
        elementType: elementDetails.elementType,
        elementWip: JSON.stringify(res),
        elementSnapshot: JSON.stringify(await prepareElementSnapshots(wipData,actionStatus)),
        timeCreated: new Date().getTime(), 
        timeUpdated: new Date().getTime(),
        userApprover:null,
        userEditor:"mishra, sumant sumant",
        feedback:null,
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
    let elementId = `${eleId.parentId}${sectionId && isHead === "BODY" ? "+" + sectionId : ""}${eleId.childId ? "+" + eleId.childId : ""}`
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
        action: "update",
        status: "",
        fromWhere: "update"
    }
    let { updateBodymatter, response, updatedId, currentParentData } = elementUpdateData;
    let currentSlateData = currentParentData[config.slateManifestURN]
    let wipData = fetchElementWipData(updateBodymatter, elementIndex, response.type, "")
    let versionStatus = fetchManifestStatus(updateBodymatter, containerElement, response.type);
    /** latest version for WE/CE/PE/AS*/
    containerElement = await checkContainerElementVersion(containerElement, versionStatus, currentSlateData)
    //set new slate Manifest in store also
    if (containerElement.slateManifest) {
        delete Object.assign(currentParentData, { [containerElement.slateManifest]: currentParentData[currentSlateData.id] })[currentSlateData.id];
        currentParentData[containerElement.slateManifest].id = containerElement.slateManifest
        dispatch({
            type: VERSIONING_SLATEMANIFEST,
            payload: { slateLevelData: currentParentData }
        })
    }
    let oldData = Object.assign({}, response);
    if (response.id !== updatedId) {
        if (oldData.poetrylines) {
            oldData.poetrylines = wipData.poetrylines;
        }
        else {
            oldData.elementdata = wipData.elementdata;
        }
        oldData.html = wipData.html;
        let actionStatusVersioning = Object.assign({}, actionStatus);
        actionStatusVersioning.action = "create"
        actionStatusVersioning.status = "accepted"
        /** After versioning with old snapshots*/
        prepareTcmSnapshots(oldData, actionStatusVersioning, containerElement, "", "")
    }
    /** Before and after versioning with new snapshots*/
    prepareTcmSnapshots(response, actionStatus, containerElement, "", "")
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