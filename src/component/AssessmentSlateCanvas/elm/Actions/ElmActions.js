import config from '../../../../config/config';
import axios from 'axios';
let headers = {
    ApiKey: config.STRUCTURE_APIKEY,
    PearsonSSOSession: config.ssoToken
}

/**
 * This action creator is used to fetch ELM resources added to the project
 */
export const insertElmResourceAction = () => (dispatch) => {
        return axios.get(`${config.ASSET_POPOVER_ENDPOINT}v2/${config.projectUrn}/alignments/resources`, {
          headers: headers
    }).then((res) => {
        dispatch({
            type: 'GET_ELM_RESOURCES',
            payload: {
                data: res.data,
                errFlag: false,
                apiStatus: "200"
            }
        })
    }).catch((error) => {
        dispatch({
            type: 'GET_ELM_RESOURCES',
            payload: {
                data: [],
                errFlag: true,
                apiStatus: error.response.status
            }
        })
    })
}

