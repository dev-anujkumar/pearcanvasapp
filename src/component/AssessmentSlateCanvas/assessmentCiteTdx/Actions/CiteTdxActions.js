import config from '../../../../config/config';
import {FULL_ASSESSMENT_CITE,FULL_ASSESSMENT_TDX} from '../../AssessmentSlateConstants';
import axios from 'axios';

/**
 * This action creator is used to fetch ELM resources added to the project
 */
export const getCiteTdxData = (assessmentType) => (dispatch) => {
    
    let url =`https://contentapis-staging.pearsoncms.net/assessment-api/assessments/v2/search?taxonomicTypes=${assessmentType === FULL_ASSESSMENT_CITE ?`CITE`:`TDX`}`;
    return axios.get(url, {
          headers:  {
            PearsonSSOSession: config.ssoToken
        }
    }).then((res) => {
        dispatch({
            type: 'GET_CITE_TDX_RESOURCES',
            payload: {
                data: res.data,
                errFlag: false,
            }
        })
    }).catch((error) => {
        dispatch({
            type: 'GET_CITE_TDX_RESOURCES',
            payload: {
                data: [],
                errFlag: true
            }
        })
    })
}
export const setCurrentCiteTdx = (currentAssessmentSelected) => (dispatch, getState) => {
    dispatch({
        type: 'CURRENT_SELECTED_ASSESSMENT',
        payload: currentAssessmentSelected
    })
}

