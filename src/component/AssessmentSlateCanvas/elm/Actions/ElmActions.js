import config from '../../../../config/config';
import {FULL_ASSESSMENT_PUF} from '../../AssessmentSlateConstants';
import axios from 'axios';

/**
 * This action creator is used to fetch ELM resources added to the project
 */
export const insertElmResourceAction = (assessmentType) => (dispatch) => {
    let url =`${assessmentType === FULL_ASSESSMENT_PUF ?`${config.COMMON_API_ENDPOINT}`:`${config.COMMON_API_ENDPOINT}`}/manifest-api/v2/${config.projectUrn}/alignments/resources`;
    return axios.get(url, {
          headers:  {
            ApiKey: config.STRUCTURE_APIKEY,
            PearsonSSOSession: config.ssoToken
        }
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

