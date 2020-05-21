import config from '../../../../config/config';
import {FULL_ASSESSMENT_PUF, PUF, LEARNOSITY, LEARNOSITY_BETA} from '../../AssessmentSlateConstants';
import axios from 'axios';

/**
 * This action creator is used to fetch ELM resources added to the project
 */
export const insertElmResourceAction = (assessmentType) => (dispatch) => {
    dispatch({ type: 'SET_ELM_LOADING_TRUE', payload: { elmLoading: true } });

    let url =`${assessmentType === FULL_ASSESSMENT_PUF ?`${config.ELM_ENDPOINT}`:`${config.LERNOSITY_ENDPOINT}`}v2/${config.projectUrn}/alignments/resources`;
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
                apiStatus: "200",
                elmLoading:false
            }
        })
    }).catch((error) => {
        dispatch({
            type: 'GET_ELM_RESOURCES',
            payload: {
                data: {},
                errFlag: true,
                apiStatus: "404",
                elmLoading:false
            }
        })
    })
}

/**
 * This action creator is used to fetch ELM assessment-items for a given ELM resource
 */
export const fetchAssessmentItem = (assessmentId) => (dispatch) => {
    dispatch({ type: 'SET_LOADING_TRUE', payload: { isLoading: true } });
    dispatch({ type: 'SET_ELM_LOADING_TRUE', payload: { elmLoading: false } });

    let url = `${config.REACT_APP_API_URL}v1/slate/assessment/${assessmentId}/items`;
    return axios.get(url, {
        headers: {
            PearsonSSOSession: config.ssoToken
        }
    }).then((res) => {
        if (res.data && res.data.items && res.data.items.length > 0) {
            dispatch({
                type: 'GET_ELM_ITEMS',
                payload: {
                    data: res.data.items,
                    errFlag: false,
                    apiStatus: "200",
                    isLoading: false,
                    elmLoading:false,
                    openSearch:false
                }
            })
        } else {
            dispatch({
                type: 'GET_ELM_ITEMS',
                payload: {
                    data: [],
                    errFlag: false,
                    apiStatus: "404",
                    isLoading: false,
                    elmLoading:false
                }
            })
        }
    }).catch((error) => {
        dispatch({
            type: 'GET_ELM_ITEMS',
            payload: {
                data: [],
                errFlag: true,
                apiStatus: error.response.status,
                isLoading: false
            }
        })
    })
}

export const setElmLoading = (flag) => (dispatch)=>{
    dispatch({ type: 'SET_ELM_LOADING_TRUE', payload: { elmLoading: flag } });
}

export const openAssessmentSearchBar = (assessmentType, flag) => dispatch => {
    if(assessmentType==LEARNOSITY || assessmentType== LEARNOSITY_BETA){
        dispatch({ type: 'SET_SEARCH_FLAG', payload: { openSearch: flag } });   
    }
}

export const setSearchTerm = (assessmentType,searchTerm) => dispatch => {
        dispatch({ type: 'SET_SEARCH_TERM', payload: { searchTerm: searchTerm } });
}