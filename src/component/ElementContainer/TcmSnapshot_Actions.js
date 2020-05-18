import axios from 'axios';
import config from '../../config/config';
import { sendDataToIframe } from '../../constants/utility.js';

import { GET_TCM_RESOURCES, GET_TCM_STATUS_OF_PROJECT } from '../../constants/Action_Constants';

 /**
     * @description - TCM STATUS FOR ELEMENT LEVEL ON SLATE
     * @param {String} slateManifestUrn | Slate Manifest URN
  */
export const handleTCMData = (slateManifestUrn) => (dispatch, getState) => {
    sendDataToIframe({ 'type': 'projectPendingTcStatus', 'message': 'false' });
    let url = `${config.REACT_APP_API_URL}v1/slate/tcm/${config.projectUrn}/${slateManifestUrn}`;
    return axios.get(url, {
        headers: {
            PearsonSSOSession: config.ssoToken
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
     * @description - TCM Status on Project Level
  */
export const projectLevelTCMData = () => (dispatch, getState) => {

    let url = `${config.REACT_APP_API_URL}v1/slate/tcm/${config.projectUrn}`;
    return axios.get(url, {
        headers: {
            PearsonSSOSession: config.ssoToken
        }
    }).then((res) => {
        if (res && res.data && res.data.tcm && res.data.tcm.activated) {
            let messageTcmStatus = {
                TcmStatus: {
                    tc_activated: JSON.stringify(res.data.tcm.activated)
                }
            }
             /** Show TCM icon header if TCM is on for project level*/
            sendDataToIframe({
                'type': "TcmStatusUpdated",
                'message': messageTcmStatus
            })
            dispatch({
                type: GET_TCM_STATUS_OF_PROJECT,
                payload: {
                    tcm_activated_project: res.data.tcm.activated
                }
            });
        }
        else {
            dispatch({
                type: GET_TCM_STATUS_OF_PROJECT,
                payload: {
                    tcm_activated_project: false
                }
            });
        }
    }).catch((error) => {
        dispatch({
            type: GET_TCM_STATUS_OF_PROJECT,
            payload: {
                tcm_activated_project: false
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

