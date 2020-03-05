import config from '../../../../config/config';
import { FULL_ASSESSMENT_CITE, FULL_ASSESSMENT_TDX } from '../../AssessmentSlateConstants';
import axios from 'axios';

/**
 * This action creator is used to fetch ELM resources added to the project
 */
export const getCiteTdxData = (assessmentType, assessmentTitle, filterUUID, pageNo=1) => (dispatch) => {
    console.log("Initial page", pageNo)
    let startPage = --pageNo;
    dispatch({ type: 'SET_LOADING_TRUE', payload: { isLoading: true } });

    let searchTitle = (assessmentTitle == undefined || assessmentTitle == '') ? '' : assessmentTitle;
    var assessmentDispatchType = (assessmentType === FULL_ASSESSMENT_CITE)? 'GET_CITE_RESOURCES': (assessmentType === FULL_ASSESSMENT_TDX)?'GET_TDX_RESOURCES': 'GET_MMI_RESOURCES';
    let pageSize=25;

    let url = `${config.ASSESSMENT_ENDPOINT}assessments/v3/search?taxonomicTypes=${assessmentType === FULL_ASSESSMENT_CITE ? `CITE` : assessmentType === FULL_ASSESSMENT_TDX? `TDX` :'MMI'}&status=approved&name=${searchTitle}&page=${startPage}&pageSize=${pageSize}`;

    return axios.get(url, {
        headers: {
            PearsonSSOSession: config.ssoToken
        }
    }).then((res) => {
            dispatch({
                type: assessmentDispatchType,
                payload: {
                    data: res.data,
                    errFlag: false,
                    isLoading: false
                }
            })
    }).catch((error) => {
        dispatch({
            type: assessmentDispatchType,
            payload: {
                data: { assessments: [] },
                errFlag: true,
                isLoading: false
            }
        })
    })
}
export const setCurrentCiteTdx = (currentAssessmentSelected, openedFrom) => (dispatch, getState) => {
     dispatch({
            type: 'CURRENT_SELECTED_ASSESSMENT',
            payload: currentAssessmentSelected
        })
}
export const setCurrentInnerCiteTdx = (currentAssessmentSelected, openedFrom) => (dispatch, getState) => {
     dispatch({
            type: 'CURRENT_SELECTED_SINGLE_ASSESSMENT',
            payload: currentAssessmentSelected
        })
}

export const getSingleAssessmentData = (currentAssessmentSelected) => (dispatch, getState) => {
    dispatch({ type: 'SET_LOADING_TRUE', payload: { isLoading: true } });
    let url =`${config.REACT_APP_API_URL}v1/slate/assessment/${currentAssessmentSelected}/items`;
    return axios.get(url, {
          headers:  {
            PearsonSSOSession: config.ssoToken
        }
    }).then((res) => {
            dispatch({
                type: 'GET_SINGLE_ASSESSMENT_DATA',
                payload: {
                    data: res.data.items,
                    errFlag: false,
                    isLoading: false
                }
            })
    }).catch((error) => {
        dispatch({
            type: 'GET_SINGLE_ASSESSMENT_DATA',
            payload: {
                data: [],
                errFlag: true,
                isLoading: false
            }
        })
    })
}
/**
 * Filter UUID based on data responsefor the Assessment items
 */
export const filterCiteTdxData = (assessmentType, assessmentTitle, filterUUID) => (dispatch) => {
    dispatch({ type: 'SET_LOADING_TRUE', payload: { isLoading: true } });
    
    let url = `${config.ASSESSMENT_ENDPOINT}assessment/v2/urn:pearson:work:${filterUUID}`;
    
    var filterData = { assessments: [] };
    var assessmentDispatchtype = (assessmentType === FULL_ASSESSMENT_CITE)? 'GET_CITE_RESOURCES': (assessmentType === FULL_ASSESSMENT_TDX)?'GET_TDX_RESOURCES': 'GET_MMI_RESOURCES';

    var typeAssessment = (assessmentType === FULL_ASSESSMENT_CITE)? 'CITE': (assessmentType === FULL_ASSESSMENT_TDX)?'TDX': 'MMI';

    return axios.get(url, {
        headers: {
            PearsonSSOSession: config.ssoToken
        }
    }).then((res) => {
        let taxonomyType = (res.data.taxonomicTypes.length > 0) ? res.data.taxonomicTypes : [];
        console.log("taxonomyType", taxonomyType);
        if (!taxonomyType.includes(typeAssessment)) {
            filterData = { assessments: [] };
        } else {
            let versionUrn = (res.data.versionUrn !== undefined) ? res.data.versionUrn : 'NA';
            let name = (res.data.name !== undefined) ? res.data.name : 'NA';
            let modifiedDate = (res.data.dateModified !== undefined) ? res.data.dateModified : 'NA';
            let modifiedBy = (res.data.createdBy !== undefined) ? res.data.createdBy : 'NA';
            filterData.assessments.push({ versionUrn, name, modifiedDate, modifiedBy })
        }
        dispatch({
            type: assessmentDispatchtype,
            payload: {
                data: filterData,
                errFlag: false,
                isLoading: false
            }
        })
    }).catch((error) => {
        dispatch({
            type: assessmentDispatchtype,
            payload: {
                data: filterData,
                errFlag: false,
                isLoading: false
            }
        })
    })
}