import config from '../../../../config/config';
import { LEARNOSITY, LEARNOSITY_BETA} from '../../AssessmentSlateConstants';
import axios from 'axios';

/**
 * This action creator is used to fetch ELM resources added to the project
 */
let apiData ; 
export const insertElmResourceAction = (assessmentType) => (dispatch) => {
    dispatch({ type: 'SET_ELM_LOADING_TRUE', payload: { elmLoading: true } });

    let url =`${config.ELM_ENDPOINT}v2/${config.projectUrn}/alignments/resources`;
    return axios.get(url, {
          headers:  {
            ApiKey: config.STRUCTURE_APIKEY,
            PearsonSSOSession: config.ssoToken
        }
    }).then((res) => {
        // apiData = res.data
        // prepareApiData(apiData,'assessment')
        // console.log('apiData',apiData)
        // removeUnwantedApiData(apiData, 'assessment')
        // console.log('apiData',apiData)
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
                apiStatus: "404",
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

export const prepareApiData = (data, type) => {
    let title = "", index = "", count = 0, allCount = 0;
    if (data.alignments && data.alignments.resourceCollections && data.alignments.resourceCollections.length) {
        data.hasMoreItems = false
        for (let resource of data.alignments.resourceCollections) {
            if (resource.resources && resource.resources.length) {
                for (let assessments of resource.resources) {
                    if (assessments && assessments.type && assessments.type !== type) {
                        count++;
                    }
                    allCount = allCount + resource.resources.length;
                }
            }
        }
        if (count == allCount) {
            data.hasMoreItems = true;
            data.alignments = {}
        }
        console.log('data.hasMoreItems', data.hasMoreItems)
    }
    if (data.contents && data.contents.bodyMatter && data.contents.bodyMatter.length) {
        for (let item of data.contents.bodyMatter) {
            if (item && ((item.alignments && item.alignments != null) || (item.contents && item.contents != null))) {
                console.log('item', item.label)
                prepareApiData(item, type)
            }
        }
    }

}
export const removeUnwantedApiData = (data, type) => {
    if (data.contents && data.contents.bodyMatter && data.contents.bodyMatter.length) {//p -> c -> m ||p
        for (let { index1, item1 } of data.contents.bodyMatter.entries()) { //item= part
            if (item1.contents && item1.contents.bodyMatter.length) {
                for (let { index2, item2 } of item1.contents.bodyMatter.entries()) {                         //item = chap
                    if (item2.contents && item2.contents.bodyMatter.length) {
                        for (let { index3, item3 } of item2.contents.bodyMatter.entries()) {                         //item = mod
                            if (item3.contents && item3.contents.bodyMatter.length) {
                                //go to loop else 
                                console.log('in if case')
                            } else if (item3.hasMoreItems == true && !item3.contents.bodyMatter.length) {
                                delete item2.contents.bodyMatter[index3]
                            }
                        }
                    }else if (item2.hasMoreItems == true && !item2.contents.bodyMatter.length) {
                        delete item1.contents.bodyMatter[index2]
                    }
                }
            }else if (item1.hasMoreItems == true && !item1.contents.bodyMatter.length) {
                delete data.contents.bodyMatter[index1]
            }
        }
    }
    if(data.contents.bodyMatter.length == 0 && data.hasMoreItems == true){
        data = {}
        //send error msg
        console.log('this project has no elm resources added for this type')
    }
}