import config from '../../../../config/config';
import { FULL_ASSESSMENT_CITE, FULL_ASSESSMENT_TDX } from '../../AssessmentSlateConstants';
import axios from 'axios';

/**
 * This action creator is used to fetch ELM resources added to the project
 */
export const getCiteTdxData = (assessmentType, assessmentTitle, filterUUID) => (dispatch) => {
    dispatch({ type: 'SET_LOADING_TRUE', payload: { isLoading: true } });

    let searchTitle = (assessmentTitle == undefined || assessmentTitle == '') ? '' : assessmentTitle;
    var assessmentDispatchType = (assessmentType === FULL_ASSESSMENT_CITE)? 'GET_CITE_RESOURCES': 'GET_TDX_RESOURCES';

    let url = `https://contentapis-staging.pearsoncms.net/assessment-api/assessments/v3/search?taxonomicTypes=${assessmentType === FULL_ASSESSMENT_CITE ? `CITE` : `TDX`}&status=approved&name=${searchTitle}`;

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
export const setCurrentCiteTdx = (currentAssessmentSelected) => (dispatch, getState) => {
    dispatch({
        type: 'CURRENT_SELECTED_ASSESSMENT',
        payload: currentAssessmentSelected
    })
}

/**
 * Filter UUID based on data responsefor the Assessment items
 */
export const filterCiteTdxData = (assessmentType, assessmentTitle, filterUUID) => (dispatch) => {
    dispatch({ type: 'SET_LOADING_TRUE', payload: { isLoading: true } });
    
    let url = `https://contentapis-staging.pearsoncms.net/assessment-api/assessment/v2/urn:pearson:work:${filterUUID}`;
    
    var filterData = { assessments: [] };
    var assessmentDispatchtype = (assessmentType === FULL_ASSESSMENT_CITE) ? "GET_CITE_RESOURCES" : "GET_TDX_RESOURCES";

    return axios.get(url, {
        headers: {
            PearsonSSOSession: config.ssoToken
        }
    }).then((res) => {
        let versionUrn = (res.data.versionUrn !== undefined) ? res.data.versionUrn : 'NA';
        let name = (res.data.name !== undefined) ? res.data.name : 'NA';
        let modifiedDate = (res.data.dateModified !== undefined) ? res.data.dateModified : 'NA';
        let modifiedBy = (res.data.createdBy !== undefined) ? res.data.createdBy : 'NA';
        filterData.assessments.push({ versionUrn, name, modifiedDate, modifiedBy })
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