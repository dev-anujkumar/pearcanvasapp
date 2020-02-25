import config from '../../../../config/config';
import {FULL_ASSESSMENT_CITE,FULL_ASSESSMENT_TDX} from '../../AssessmentSlateConstants';
import axios from 'axios';

/**
 * This action creator is used to fetch ELM resources added to the project
 */
export const getCiteTdxData = (assessmentType) => (dispatch) => {
    
    let url =`https://contentapis-staging.pearsoncms.net/assessment-api/assessments/v3/search?taxonomicTypes=${assessmentType === FULL_ASSESSMENT_CITE ?`CITE`: assessmentType === FULL_ASSESSMENT_TDX ?`TDX`:`MMI`}&status=approved`;
    return axios.get(url, {
          headers:  {
            PearsonSSOSession: config.ssoToken
        }
    }).then((res) => {
        if(assessmentType === FULL_ASSESSMENT_CITE){
            dispatch({
                type: 'GET_CITE_RESOURCES',
                payload: {
                    data: res.data,
                    errFlag: false,
                    isLoading: false
                }
            })
        dispatch({ type: 'SET_LOADING_TRUE', payload: { isLoading: true }});

        } 
        else if(assessmentType === FULL_ASSESSMENT_TDX){
            dispatch({
                type: 'GET_TDX_RESOURCES',
                payload: {
                    data: res.data,
                    errFlag: false,
                    isLoading: false
                }
            })
        dispatch({ type: 'SET_LOADING_TRUE', payload: { isLoading: true }});
        }
        
        else {
            dispatch({
                type: 'GET_MMI_RESOURCES',
                payload: {
                    data: res.data,
                    errFlag: false,
                    isLoading: false
                }
            })
        dispatch({ type: 'SET_LOADING_TRUE', payload: { isLoading: true }});

        }
    }).catch((error) => {
        dispatch({
            type: 'GET_CITE_TDX_RESOURCES',
            payload: {
                data: [],
                errFlag: true,
                isLoading: false
            }
        })
    })
}
export const setCurrentCiteTdx = (currentAssessmentSelected, openedFrom) => (dispatch, getState) => {
    if(openedFrom == "singleSlateAssessmentInner"){
        dispatch({
            type: 'CURRENT_SELECTED_SINGLE_ASSESSMENT',
            payload: currentAssessmentSelected
        })
    }
    else{
        dispatch({
            type: 'CURRENT_SELECTED_ASSESSMENT',
            payload: currentAssessmentSelected
        })
    }
    
}

export const getSingleAssessmentData = () => (dispatch, getState) => {
    let url =`https://my-json-server.typicode.com/ankitstudent09/demo/assessmentsItems`;
    return axios.get(url, {
          headers:  {
            PearsonSSOSession: config.ssoToken
        }
    }).then((res) => {
            dispatch({
                type: 'GET_SINGLE_ASSESSMENT_DATA',
                payload: {
                    data: res.data,
                    errFlag: false,
                    isLoading: false
                }
            })
    }).catch((error) => {
        dispatch({
            type: 'GET_CITE_TDX_RESOURCES',
            payload: {
                data: [],
                errFlag: true,
                isLoading: false
            }
        })
    })
}