/**
 * Module - Tcm_Snapshots_Utility
 * Description - This Module contains the utility functions to prepare TCM snapshots
 */

/**************************Import Modules**************************/
import config from '../../config/config.js';
import { sendElementTcmSnapshot } from './TcmSnapshot_Actions.js';
import { setSemanticsSnapshots } from './ElementSnapshot_Utility.js';
/**
 * @function prepareTcmSnapshots
 * @description-This is the root function to preapare the data for TCM Snapshots
 * @param {Object} allSlateData  
*/
export const prepareTcmSnapshots = (wipData, action, asideData) => (dispatch) => {
    let tcmSnapshot = {};
    let commonKeys = setCommonKeys_TCM_Snapshots(action, wipData)
    let elementDetails = { type: "list", id: "123" }
    // let elementDetails = setElementTypeAndUrn(ancestorData)
    tcmSnapshot = {
        elementUrn: elementDetails.elementUrn,
        snapshotUrn: elementDetails.elementUrn,
        elementType: elementDetails.elementType,
        elementSnapshot: prepareElementSnapshots(commonKeys.status, action, wipData),
        ...commonKeys
    }
    console.log('final data in prepare Function', tcmSnapshot)

    /** TCM SNAPSHOTS API CALLED HERE */
    dispatch(sendElementTcmSnapshot(tcmSnapshot))
}

/**
 * @function setElementType
 * @description-This function is to set keys- [ ElementType, elementUrn, snapshotUrn ] for tcm snapshots
 * @param {Object} element - Object containing the details for Element type & parentData
 * @returns {Object}  
*/

const setElementTypeAndUrn = (element) => {
    let elementData = {}
    /** switch case to set elementType & elementUrn*///snapshotUrn/elementUrn
    return elementData
}

/**
 * @function setCommonKeys_TCM
 * @description-This function is to set the common keys for tcm snapshots
 * @param {String} action - type of action performed
 * @param {Object} wipData - wipData for element
 * @returns {Object}  
*/
const setCommonKeys_TCM_Snapshots = (action, wipData) => {
    let tcmKeys = {}
    /**
     * Set common parameters here
     */
    tcmKeys = {
        slateID: config.slateManifestUrn,
        slateUrn: config.slateManifestUrn,
        projectUrn: config.projectUrn,
        index: 0,
        action: action,
        status: (config.tcmStatus && config.tcmStatus == true && action !== 'delete') ? "pending" : "accepted",
        slateType: "container",//set based on condition
        elementWip: wipData
    }
    return tcmKeys
}

/**
 * @function prepareElementSnapshots
 * @description-This function is to set the common keys for tcm snapshots
 * @param {String} status - status of action performed
 * @param {Object} action - type of action performed
 * @param {String} element - wipData for element
 * @returns {Object}  
*/
export const prepareElementSnapshots = (status, action, element) => {
    let elementSnapshot = {};
    let semanticSnapshots = (action !== 'create' && element.type !== 'element-citation') ? setSemanticsSnapshots(status, element) : {};
    console.log(action,'semanticSnapshots',semanticSnapshots)
    elementSnapshot = {
        contentSnapshot: element,
        glossorySnapshot: isEmpty(semanticSnapshots) === false ? semanticSnapshots.glossarySnapshot : [],
        footnoteSnapshot: isEmpty(semanticSnapshots) === false ? semanticSnapshots.footnoteSnapshot : [],
        assetPopOverSnapshot: isEmpty(semanticSnapshots) === false ? semanticSnapshots.assetPopoverSnapshot : []
    }

    return elementSnapshot;
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

export const prepareElementAncestorData = (slateData, index = "1") => {
    let indexes = index.split('-');
    let ancestorData = {}
    switch (indexes.length) {
        case 2:
            ancestorData = {
                id: "1",
                type: "A",
                ancestor: {
                    id: "2",
                    type: "B",
                }
            }
            break;
        case 3:
            ancestorData = {
                id: "1",
                type: "A",
                ancestor: {
                    id: "2",
                    type: "B",
                    ancestor: {
                        id: "3",
                        type: "C"
                    }
                }
            }
            break;
        case 1:
        default:
            ancestorData = {
                id: "1",
                type: "A",
            }
            break;
    }

    return ancestorData
}