import config from '../../../../config/config';
import {FULL_ASSESSMENT_PUF} from '../../AssessmentSlateConstants';
import axios from 'axios';
let headers = {
    ApiKey: config.STRUCTURE_APIKEY,
    PearsonSSOSession: config.ssoToken
}

/**
 * This action creator is used to fetch ELM or Learnosity resources added to the project
 */
export const insertElmResourceAction = (assessmentType) => (dispatch) => {
    if(assessmentType === FULL_ASSESSMENT_PUF){
        return axios.get(`${config.ELM_ENDPOINT}v2/${config.projectUrn}/alignments/resources`, {
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
    }else{
        return axios.get(`${config.ELM_ENDPOINT}v2/${config.projectUrn}/alignments/resources`, {
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
}

