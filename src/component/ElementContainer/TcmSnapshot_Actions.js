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

