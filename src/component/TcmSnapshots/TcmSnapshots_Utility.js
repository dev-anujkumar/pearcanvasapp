/**
 * Module - Tcm_Snapshots_Utility
 * Description - This Module contains the utility functions to prepare TCM snapshots
 */

/**************************Import Modules**************************/
import config from '../../config/config.js';
import { sendElementTcmSnapshot } from './TcmSnapshot_Actions.js';
import { setSemanticsSnapshots, fetchElementsTag } from './ElementSnapshot_Utility.js';

let elementType = ['element-authoredtext', 'element-list', 'element-blockfeature', 'element-learningobjectives', 'element-citation', 'stanza'];
let containerType = ['element-aside', 'manifest', 'citations', 'poetry'];

/**
 * @function prepareTcmSnapshots
 * @description-This is the root function to preapare the data for TCM Snapshots
 * @param {Object}   
*/
export const prepareTcmSnapshots = (wipData, action, asideData, parentUrn, poetryData, type) => (dispatch) => {
    let tcmSnapshot = [];
    let defaultKeys = setDefaultKeys(action)
    let elementDetails;
    /* Tag of elements*/
    let tag = {
        parentTag: fetchElementsTag(wipData)
    }
    /* ID of elements*/
    let elementId = {
        parentId: wipData.id
    }
    /* For WE creation*/
    if (wipData.type === "element-aside" && type != "SECTION_BREAK") {
        wipData.elementdata.bodymatter && wipData.elementdata.bodymatter.map((item) => {
            if (item.type === "manifest") {
                item.contents.bodymatter.map((ele) => {
                    if(elementType.indexOf(ele.type) !== -1){
                        elementId.childId = ele.id
                        tag.childTag = fetchElementsTag(ele)
                        elementDetails = setElementTypeAndUrn(elementId, tag, wipData.subtype === "workedexample" ? 'BODY' : "", item.id);
                        prepareTcmData(elementDetails, ele, defaultKeys, tcmSnapshot)
                    }
                })
            }
            else if(elementType.indexOf(item.type) !== -1){
                elementId.childId = item.id;
                tag.childTag = fetchElementsTag(item)
                elementDetails = setElementTypeAndUrn(elementId, tag, wipData.subtype === "workedexample" ? "HEAD" : "", "");
                prepareTcmData(elementDetails, item, defaultKeys, tcmSnapshot)
            }
        })
    }
    /* action on Section break in WE*/
    else if (type === "SECTION_BREAK" || wipData.type === "manifest") {
        tag.parentTag = asideData && fetchElementsTag(asideData) ? fetchElementsTag(asideData) : fetchElementsTag(wipData)
        elementId.parentId = asideData && asideData.id ? asideData.id : parentUrn && parentUrn.manifestUrn ? parentUrn.manifestUrn : "";
        wipData.contents.bodymatter.map((item) => {
            if (elementType.indexOf(item.type) !== -1) {
                elementId.childId = item.id
                tag.childTag = fetchElementsTag(item)
                elementDetails = setElementTypeAndUrn(elementId, tag, "BODY", wipData.id);
                prepareTcmData(elementDetails, item, defaultKeys, tcmSnapshot)
            }
        })
    }
    /* action on element in WE/PE/CG */
    else if ((poetryData || asideData || parentUrn)) {
        let parentElement = asideData ? asideData : poetryData ? poetryData : parentUrn ? parentUrn : ""
        elementId.parentId = parentElement && parentElement.id ? parentElement.id : parentUrn && parentUrn.manifestUrn ? parentUrn.manifestUrn : "";
        elementId.childId = wipData.id;
        tag.parentTag = fetchElementsTag(parentElement)
        tag.childTag = fetchElementsTag(wipData)
        let isHead = asideData && asideData.type === "element-aside" && asideData.subtype === "workedexample" ? parentUrn.manifestUrn == asideData.id ? "HEAD" : "BODY" : ""
        elementDetails = setElementTypeAndUrn(elementId, tag, isHead, parentUrn.manifestUrn)
        prepareTcmData(elementDetails, wipData, defaultKeys, tcmSnapshot)
    }
    /* action on PE and CG */
    else if (wipData.type === "citations" || wipData.type === "poetry") {
        wipData.contents.bodymatter.map((item) => {
            elementId.childId = item.id;
            tag.childTag = fetchElementsTag(item)
            elementDetails = setElementTypeAndUrn(elementId, tag, "", "")
            prepareTcmData(elementDetails, item, defaultKeys, tcmSnapshot)
        })
    }
    else  {
        elementDetails = setElementTypeAndUrn(elementId, tag)
        prepareTcmData(elementDetails, wipData, defaultKeys, tcmSnapshot)
    }
    console.log('final data in prepare Function', tcmSnapshot)
    /** TCM SNAPSHOTS API CALLED HERE */
    dispatch(sendElementTcmSnapshot(tcmSnapshot))
}

/**
 * @function prepareTcmData
 * @description-This function is to all keys for tcm snapshots
 * @param {Object}  - Object containing the details for Element type & parentData
 * @returns {Object}  
*/
const prepareTcmData = (elementDetails, wipData, defaultKeys, tcmSnapshot) => {
    let res = Object.assign({}, wipData)
    delete res["html"];
    return tcmSnapshot.push({
        elementUrn: elementDetails.elementUrn,
        snapshotUrn: elementDetails.elementUrn,
        elementType: elementDetails.elementType,
        elementWip: res,
        elementSnapshot: prepareElementSnapshots(wipData, defaultKeys.action, defaultKeys.status),
        ...defaultKeys
    })
}

/**
 * @function setElementType
 * @description-This function is to set keys- [ ElementType, elementUrn, snapshotUrn ] for tcm snapshots
 * @param {Object} element - Object containing the details for Element type & parentData
 * @returns {Object}  
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
 * @description-This function is to set the common keys for tcm snapshots
 * @param {Object} action - type of action performed
 * @returns {Object}  
*/
export const setDefaultKeys = (action) => {
    let tcmKeys = {}

    tcmKeys = {
        slateID: config.slateManifestURN,
        slateUrn: config.slateManifestURN,
        projectUrn: config.projectUrn,
        index: 0,
        action: action,
        status:  (config.tcmStatus && config.tcmStatus == true && action !== 'delete') ? "Pending" : "Accepted",//prepareElementStatus(action),
        //set based on action (config.tcmStatus && config.tcmStatus == true && action !== 'delete') ? "Pending" : "Accepted")
        slateType: "slate",//set based on condition
    }
    return tcmKeys
}

/**
 * @function prepareElementStatus
 * @description-This function is to set the status of element
 * @param string action - type of action
*/
const prepareElementStatus = (action) => {
    let status;
    if (action === "create") {
        status = config.tcmStatus === true ? "Pending" : "Accepted";
    }
    return status
}

/**
 * @function prepareElementSnapshots
 * @description-This function is to set the common keys for tcm snapshots
 * @param {String} status - status of action performed
 * @param {Object} action - type of action performed
 * @param {String} element - wipData for element
 * @returns {Object}
*/
export const prepareElementSnapshots = (element, action, status) => {
    let elementSnapshot = {};
    let semanticSnapshots = (action !== 'create' && element.type !== 'element-citation') ? setSemanticsSnapshots(status, element) : {};

    elementSnapshot = {
        contentSnapshot: element.html && element.html.text ? element.html.text : "",
        glossorySnapshot: isEmpty(semanticSnapshots) === false ? semanticSnapshots.glossarySnapshot : [],
        footnoteSnapshot: isEmpty(semanticSnapshots) === false ? semanticSnapshots.footnoteSnapshot : [],
        assetPopOverSnapshot: isEmpty(semanticSnapshots) === false ? semanticSnapshots.assetPopoverSnapshot : []
    }
console.log('elesnap',JSON.stringify(elementSnapshot))
    return JSON.stringify(elementSnapshot);
}
/**
 * @function isEmpty
 * @description-This function is to check if an object is empty
 * @param {Object} obj - object to be checked
 * @returns {Boolean}
*/
const isEmpty = (obj) => {
    for (let key in obj) { return false; }
    return true;
}