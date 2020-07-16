import axios from 'axios';
import config from '../../config/config';
import { sendDataToIframe } from '../../constants/utility.js';
import { GET_TCM_RESOURCES } from '../../constants/Action_Constants';

 /**
     * @description - TCM STATUS FOR ELEMENT LEVEL ON SLATE
     * @param {String} slateManifestUrn | Slate Manifest URN
  */
export const handleTCMData = (slateManifestUrn) => (dispatch, getState) => {
    sendDataToIframe({ 'type': 'projectPendingTcStatus', 'message': 'false' });
    let url = `/cypress/trackchanges-srvr/tcstats/proj/${config.projectUrn}/slate/${slateManifestUrn}`;
    return axios.get(url, {
        headers: {
            PearsonSSOSession: config.ssoToken,
            withCredentials: true
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

export const tcmSnapshot = (slateManifestUrn,slateEntityUrn) => (dispatch, getState) => {
    let url = `${config.REACT_APP_API_URL}v1/slate/content/${config.projectUrn}/tcm/${slateEntityUrn}/${slateManifestUrn}?page=0`;
    return axios.get(url, {
        headers: {
            PearsonSSOSession: config.ssoToken
        }
    }).then((res) => {
        console.log("success")
    }).catch((error) => {
        console.log("error")
    })

}

/**
     * @description Send TCM Snapshot for the element
     * @param {Object} snapshotData | TCM Snapshot data
*/
export const sendElementTcmSnapshot = async (snapshotData) => {
    /** requestBody = snapshotData
     * API CALL HERE
     */
    await snapshotData
    console.log('snapshotData',snapshotData)
    //     let url = `http://localhost:3000/tctx/proj/urn:pearson:distributable:764e139b-621e-48fc-a451-cb50878f48e1/slate/urn:pearson:manifest:ba874ceb-0536-4965-9e4a-d7241f88bfad/elem/urn:pearson:work:93714c08-1a76-4ca8-9c94-5a0b515b6ce0`;
    // return axios.post(url, snapshotData, {
    //     headers: {
    //         PearsonSSOSession: config.ssoToken
    //     }
    // }).then((res) => {
    //     console.log("success")
    //     console.log('snapshotData',snapshotData)
    // }).catch((error) => {
    //     console.log("error")
    // })

}

/**
     * @description - Get latest version of comtainer elemens and slate
     * @param {String} containerUrn | Container Entity URN
*/
export const getLatestVersion = async (containerUrn) => {
    try {
        let data = await axios.get(`${config.AUDIO_NARRATION_URL}context/v2/${config.projectUrn}/container/${containerUrn}/versions`, {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        })
        return data.data[0];
    } catch (err) {
        console.log('Error in getting version', err)
    }
}

