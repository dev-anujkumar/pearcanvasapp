import config from '../../../../config/config';
import {FULL_ASSESSMENT_PUF} from '../../AssessmentSlateConstants';
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
                data: [],
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
                    isLoading: false
                }
            })
        } else {
            dispatch({
                type: 'GET_ELM_ITEMS',
                payload: {
                    data: [],
                    errFlag: false,
                    apiStatus: "404",
                    isLoading: false
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

export const searchAndFilterAssessmentData = (assessmentType, searchAssessmentTitle, apiData) => {
    // dispatch({ type: 'SET_ELM_LOADING_TRUE', payload: { elmLoading: false } });
    console.log("assessmentType", assessmentType)
    let tableData = []
    preparedData = []
    console.time("factorial test");
    if(searchAssessmentTitle.trim()!=""){
        tableData = filterAssessmentsFromApiData(apiData, "", searchAssessmentTitle)
    }else{
        tableData = [] 
    }

    console.timeEnd("factorial test");
    // return dispatch({
    //     type:"FILTER_ASSESSMENT_DATA",
    //     payloD: tableData
    // })
    return tableData
}
let preparedData = []

const filterAssessmentsFromApiData = (data, parentUrn, searchAssessmentTitle) => {
    let title = "";
    if (data.alignments && data.alignments.resourceCollections && data.alignments.resourceCollections.length) {
        data.alignments.resourceCollections.forEach((resource) => {
            if (resource.resources && resource.resources.length) {
                resource.resources.forEach((assessments, index) => {
                    if (assessments && assessments.title && assessments.title.en) {
                        title = assessments.title.en
                    }
                    const result = preparedData.find(({ urn }) => urn === assessments.urn);
                    // console.log("indexOf", assessments.urn, preparedData.indexOf(assessments.urn))
                    if (assessments && assessments.type && assessments.type !== "assessmentItem") {
                        if (title.toLowerCase().includes(searchAssessmentTitle.toLowerCase()) && result == undefined) {
                            preparedData.push({ "type": assessments.type ? assessments.type : "assessment", "urn": assessments.urn, "assessmentTitle": title, "parentUrn": parentUrn, previousUrn: data.versionUrn }) // "assessment" is added as type for resources where type-key is missing
                        }
                    }
                })
            }
        })
    }
    if (data.contents && data.contents.bodyMatter && data.contents.bodyMatter.length) {
        data.contents.bodyMatter.forEach((item) => {
            if (item && ((item.alignments && item.alignments != null) || (item.contents && item.contents != null))) {
                filterAssessmentsFromApiData(item, parentUrn, searchAssessmentTitle)
            }
        })
    }
    return preparedData
}


