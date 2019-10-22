import config from '../../../../config/config';
import axios from 'axios';
let headers = {
    ApiKey: config.STRUCTURE_APIKEY,
    PearsonSSOSession: config.ssoToken
}

/**
 * This action creator is uswed to fetch ELM resources added to the project
 */
export const insertElmResourceAction = () => (dispatch) => {

    let project_urn = config.projectUrn;
    /**
     * The commented part would be used later
     */
    // return function (dispatch) {
    //     return axios.get(`${config.ELM_END_POINT}v2/${project_urn}/alignments/resources`, {
    return axios.get(config.ELM_URL, {
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

