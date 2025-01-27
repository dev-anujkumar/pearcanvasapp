import axios from 'axios';
import config from '../../config/config';
import { sendDataToIframe } from '../../constants/utility.js';
import { GET_TCM_RESOURCES, AUTHORING_ELEMENT_UPDATE } from '../../constants/Action_Constants';

 /**
     * @description - TCM STATUS FOR ELEMENT LEVEL ON SLATE
     * @param {String} slateManifestUrn | Slate Manifest URN
  */
export const handleTCMData = (slateManifestUrn) => (dispatch, getState) => {
    sendDataToIframe({ 'type': 'projectPendingTcStatus', 'message': 'false' });
    const cypressPlusProjectStatus = getState()?.appStore?.isCypressPlusEnabled
    if (cypressPlusProjectStatus && config.slateType === "pdfslate") {
        return false; // disable TCM for all PDF slates in Cypress+ Enabled Projects
    }
    if(config.tcmStatusPopupGlossary === true || (config.pendingTcmStatus === "true" && config.elementSlateRefresh)){
        sendDataToIframe({ 'type': 'projectPendingTcStatus', 'message': 'true' });
    }
    config.tcmStatusPopupGlossary = false
    config.pendingTcmStatus = false
    let url = `${config.TCM_SRVR_STATUS_URL}${config.projectUrn}/slate/${slateManifestUrn}`;
    return axios.get(url, {
        headers: {
            withCredentials: true,
            'myCloudProxySession': config.myCloudProxySession
        }
    }).then((response) => {
        if (response && response.data && response.data.elements) {
            dispatch({
                type: GET_TCM_RESOURCES,
                payload: {
                    data: response.data.elements
                }
            });
            /** Show Red Dot in header if have any pending TCM status for element*/
            response.data.elements.some(function (elem) {
                if (elem.txCnt > 0) {
                    sendDataToIframe({ 'type': 'projectPendingTcStatus', 'message': 'true' });
                    return true;
                }
            });
        }
        else {
            dispatch({
                type: GET_TCM_RESOURCES,
                payload: {
                    data: []
                }
            });
        }

    }).catch((error) => {
        dispatch({
            type: GET_TCM_RESOURCES,
            payload: {
                data: []
            }
        });
    })

}

/**
     * @description Send TCM Snapshot for the element
     * @param {Object} snapshotData | TCM Snapshot data
*/
var timerID;
var allSnapshotData = [];
export const sendElementTcmSnapshot = async (snapshotData) => {
        allSnapshotData.push(snapshotData);
        if (timerID) clearTimeout(timerID);
        timerID = setTimeout(async () => { let snapshots = allSnapshotData; allSnapshotData = []; await callSnapshotAPI(snapshots) }, 500);
}

const callSnapshotAPI = async (snapshotData) => {
    return axios.post(config.TCM_SNAPSHOT_URL, snapshotData, {
        headers: {
            'myCloudProxySession': config.myCloudProxySession
        }
    }).then((res) => {
        console.log("Successs !!!")
    }).catch((error) => {
        console.log("Error in sending TCM Snapshots>>>>", error)
    })
}

/**
     * @description - Get latest version of comtainer elemens and slate
     * @param {String} containerUrn | Container Entity URN
     * @returns {String} - New Manifest version URN
*/
export const getLatestVersion = async (containerUrn) => {
    try {
        const response = await axios.get(`${config.STRUCTURE_READONLY_ENDPOINT}context/v2/${config.projectUrn}/container/${containerUrn}/versions`, {
            headers: {
                "Content-Type": "application/json",
                'myCloudProxySession': config.myCloudProxySession
            }
        })
        return response.data[0];
    } catch (err) {
        console.log('Error in getting version', err)
    }
}

/**
     * @description - Get slate linking details for snapshots
     * @param {String} containerUrn | Container Entity URN
     * @returns {Object} - Slate Linking label and manifest urn
*/
export const slateLinkDetails = async (containerUrn) => {
    try {
        const response = await axios.get(`${config.STRUCTURE_READONLY_ENDPOINT}context/v2/${config.projectUrn}/container/${containerUrn}`, {
            headers: {
                "Content-Type": "application/json",
                'myCloudProxySession': config.myCloudProxySession
            }
        })
        return response.data;
    } catch (err) {
        console.log('Error in getting slate link data', err)
    }
}

export const fetchPOPupSlateData = (manifestURN, entityURN, page, element , index) => (dispatch, getState) => {
    const elementCount = getState().appStore.slateLength
    let apiUrl = `${config.REACT_APP_API_URL}v1/project/${config.projectUrn}/entity/${config.projectEntityUrn}/container/${entityURN}/content?page=${page}
                &elementCount=${elementCount}`
    return axios.get(apiUrl, {
        headers: {
            "Content-Type": "application/json",
            'myCloudProxySession': config.myCloudProxySession
        }
    }).then(slateData => {
        let parentData = getState().appStore.slateLevelData;
        let newslateData = JSON.parse(JSON.stringify(parentData));
        newslateData[config.slateManifestURN] = Object.values(slateData.data)[0];
        let popBodymatter = newslateData[config.slateManifestURN].contents.bodymatter
        element.popupdata.bodymatter = popBodymatter
        let eleIndex
        if (typeof index === "number" || (Array.isArray(index) && index.length == 1)){
            eleIndex = Array.isArray(index) ? index[0] : index;
            parentData[config.slateManifestURN].contents.bodymatter[eleIndex] = element
        }
        else if(typeof index === "string"){
            eleIndex =  index.split("-");
            if (eleIndex.length == 2) {          /** Inside WE-HEAD | Aside */
                parentData[config.slateManifestURN].contents.bodymatter[eleIndex[0]].elementdata.bodymatter[eleIndex[1]] = element
            } else if (eleIndex.length == 3 && element.popupdata.bodymatter[eleIndex[0]].type !== 'groupedcontent' ) {   /** Inside WE-BODY */
                parentData[config.slateManifestURN].contents.bodymatter[eleIndex[0]].elementdata.bodymatter[eleIndex[1]].contents.bodymatter[eleIndex[2]]= element
            }

        }
        return dispatch({
            type: AUTHORING_ELEMENT_UPDATE,
            payload: {
                slateLevelData: parentData
            }
        })
    })
}

/** TCM Snapshots API for CUT/COPY PASTE operation */
export const callCutCopySnapshotAPI = async (snapshotData,isAutoNumberingEnabled) => {
    let url = config.TCM_CUT_COPY_URL
    if (snapshotData.operationType === 'copy') {
        if (isAutoNumberingEnabled) {
            url = `${url}?isAutoNumberingEnabled=${isAutoNumberingEnabled}`
        }
        return axios.post(url, snapshotData, {
            headers: {
                'myCloudProxySession': config.myCloudProxySession
            }
        }).then((res) => {
            console.log("Successs !!!")
        }).catch((error) => {
            console.log("Error in sending TCM Snapshots for cut/copy>>>>", error)
        })
    }
    else{
        return axios.put(url, snapshotData, {
            headers: {
                'myCloudProxySession': config.myCloudProxySession
            }
        }).then((res) => {
            console.log("Successs !!!")
        }).catch((error) => {
            console.log("Error in sending TCM Snapshots for cut/copy>>>>", error)
        })
    }
}
