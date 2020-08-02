import { fetchElementWipData, fetchManifestStatus, checkContainerElementVersion } from '../TcmSnapshots/ElementSnapshot_Utility.js';
import { VERSIONING_SLATEMANIFEST } from "./../../constants/Action_Constants";
import { prepareTcmSnapshots } from '../TcmSnapshots/TcmSnapshots_Utility.js';
import config from '../../config/config';
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