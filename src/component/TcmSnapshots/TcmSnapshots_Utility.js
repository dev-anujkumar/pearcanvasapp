/**
 * Module - Tcm_Snapshots_Utility
 * Description - This Module contains the utility functions to prepare TCM snapshots
 */

/**************************Import Modules**************************/
import config from '../../config/config.js';
import { sendElementTcmSnapshot } from './TcmSnapshot_Actions.js';
/**
 * @function prepareTcmSnapshots
 * @description-This is the root function to preapare the data for TCM Snapshots
 * @param {Object} allSlateData  
*/
export const prepareTcmSnapshots = (wipData,action) => (dispatch) => {
    let tcmSnapshot = {};
    let commonKeys = setCommonKeys_TCM_Snapshots(action,wipData)
    let elementDetails = {type:"list",id:"123"}
    // let elementDetails = setElementTypeAndUrn(ancestorData)
    /**
     * Functions called here to prepapre TCM snapshots data based on action/type/etc
     * 
     * 
     * 
     */
    tcmSnapshot = {
        elementUrn: elementDetails.elementUrn,
        snapshotUrn: elementDetails.elementUrn,
        elementType: elementDetails.elementType,
        elementSnapshot: prepareElementSnapshots(wipData),
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
 * @param {Object} action - type of action performed
 * @param {Object} wipData - wipData for element
 * @returns {Object}  
*/
export const setCommonKeys_TCM_Snapshots = (action, wipData) => {
    let tcmKeys = {}
    /**
     * Set common parameters here
     */
    tcmKeys = {
        slateID: "abc",
        slateUrn: "abc",//same as slateID
        projectUrn: "def",//from config
        index: 0,
        action: action,
        status: "pending",//set based on action
        slateType: "container",//set based on condition
        elementWip: wipData//wipData
    }
    return tcmKeys
}
export const prepareElementSnapshots = (element, hasAsset,assetData) => {
    let elementSnapshot = {}
    // call setGlossaryFootnoteSnapshots/setAssetPopoverSnapshots
    elementSnapshot = {
        contentSnapshot: element,
        glossorySnapshot: hasAsset ? setGlossarySnapshots(element) : [],
        footnoteSnapshot: hasAsset ? setFootnoteSnapshots(element) : [],
        assetPopOverSnapshot: hasAsset ? setAssetPopoverSnapshots(element) : []
    }
    return elementSnapshot

}

export const setGlossarySnapshots = (assetData) => {
    let glossaryData = assetData
    /**
     * Glossary snapshot function 
     */
    return glossaryData
}

export const setFootnoteSnapshots = (assetData) => {
    let footnoteData = assetData
    /**
     * Footnote snapshot function 
     */
    return footnoteData
}
export const setAssetPopoverSnapshots = (assetData) => {
    let assetPopoverData = assetData
    /**
     * AssetPopover snapshot function 
     */
    return assetPopoverData
}

export const prepareElementAncestorData = (index,slateData) => {
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