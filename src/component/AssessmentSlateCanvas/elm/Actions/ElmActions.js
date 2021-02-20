import config from '../../../../config/config';
import { LEARNOSITY, ELM_INT} from '../../AssessmentSlateConstants';
import axios from 'axios';

/**
 * This action creator is used to fetch ELM resources added to the project
 */
export const insertElmResourceAction = (assessmentType) => (dispatch) => {
    dispatch({ type: 'SET_ELM_LOADING_TRUE', payload: { elmLoading: true } });

    let url = `${config.ELM_ENDPOINT}v2/${config.projectUrn}/alignments/resources`;
    return axios.get(url, {
        headers: {
            ApiKey: config.STRUCTURE_APIKEY,
            PearsonSSOSession: config.ssoToken
        }
    }).then((res) => {
        let newApiData = JSON.parse(JSON.stringify(res.data))
        let itemType = assessmentType == ELM_INT ? 'interactive' : 'assessment'
        filterApiAlignments(newApiData, itemType);
        filterApiContainers(newApiData);
        if (setCondition(newApiData).noAlignments && setCondition(newApiData).noBodyMatter) {
            dispatch({
                type: 'GET_ELM_RESOURCES',
                payload: {
                    data: {},
                    errFlag: true,
                    apiStatus: "400",
                    elmLoading: false
                }
            })
        } else {
            dispatch({
                type: 'GET_ELM_RESOURCES',
                payload: {
                    data: newApiData,
                    errFlag: false,
                    apiStatus: "200",
                    elmLoading: false
                }
            })
        }
    }).catch((error) => {
        dispatch({
            type: 'GET_ELM_RESOURCES',
            payload: {
                data: {},
                errFlag: true,
                apiStatus: "404",
                elmLoading: false
            }
        })
    })
}

/**
 * This action creator is used to fetch ELM assessment-items for a given ELM resource
 * @param assessmentId id of the assessment to fetch its items
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

/*** @description This is function to set elm loader */
export const setElmLoading = (flag) => (dispatch)=>{
    dispatch({ type: 'SET_ELM_LOADING_TRUE', payload: { elmLoading: flag } });
}

/*** @description This is function to open search Assessment Screen */
export const openAssessmentSearchBar = (assessmentType, flag) => dispatch => {
    if(assessmentType==LEARNOSITY){
        dispatch({ type: 'SET_SEARCH_FLAG', payload: { openSearch: flag } });   
    }
}

/*** @description This is function to set search Term */
export const setSearchTerm = (searchTerm) => dispatch => {
        dispatch({ type: 'SET_SEARCH_TERM', payload: { searchTerm: searchTerm } });
}

/*** @description This is function to reset the elm store when the elm picker is closed */
export const resetElmStore = () => dispatch => {
    dispatch({
        type: 'GET_ELM_RESOURCES',
        payload: {
            data: {},
            errFlag: false,
            elmLoading:true,
        }
    })
}

/*** @description This is function to filter containers which contain the assets of given type
    * @param data API data
    * @param type type of asset
  */
const filterApiAlignments = (data, type) => {
    if (data.alignments && data.alignments.resourceCollections && data.alignments.resourceCollections.length) {
        data.alignments.resourceCollections = data.alignments.resourceCollections.filter( resource => {
            if (resource.resources && resource.resources.length) {
                resource.resources = resource.resources.filter((assessments) => {
                    if ((type == 'assessment') || (type == 'interactive' && assessments.additionalMetadata && assessments.additionalMetadata.interactiveType)) {
                        return assessments.type === type;
                    }
                });
            }
            return resource.resources.length > 0;
        });
    }
    if (data?.contents && Object.keys(data.contents).length) {
        for (let key in data.contents) {
            for (let item of data.contents[key]) {
                if (item && ((item.alignments && item.alignments != null) || (item.contents && item.contents != null))) {
                    filterApiAlignments(item, type);
                }
            }
        }
    }
}

/*** @description This is function to filter containers which are empty
    * @param data API data
  */
const filterApiContainers = (apiData) => {
    let data = Object.assign({}, apiData);
    if (data.contents && Object.keys(data.contents).length) {
        for (let key in data.contents) {
            data.contents[key] = data.contents[key].filter(container1 => {
                if (container1?.contents && Object.keys(container1.contents).length) {
                    container1.contents = {
                        bodyMatter: Object.values(container1.contents)?.flat()?.filter(container2 => {
                            if (container2 && (container2.contents && Object.keys(container2.contents).length)) {
                                container2.contents = {
                                    bodyMatter: Object.values(container2.contents)?.flat()?.filter(container3 => {
                                        return checkEmptyContainers(container3);
                                    })
                                }
                            }
                            return checkEmptyContainers(container2);
                        })
                    }
                }
                return checkEmptyContainers(container1);
            });
        }
    }
    if (setCondition(data).noAlignments && setCondition(data).noBodyMatter) {
        data = {};
    }
    return data;
}

/*** @description This is function to check if bodymatter is empty and check if aligments are present
    * @param item current container
  */
const setCondition = (item) => {
    let condition = {};
    condition.noBodyMatter = item && (!item.contents || (item.contents && Object.values(item.contents)?.flat()?.length == 0))
    condition.noAlignments = item && (!item.alignments || item.alignments.resourceCollections.length == 0)
    return condition;
}

/*** @description This is function to check if bodymatter is empty and check if aligments are present
    * @param item current container
  */
const checkEmptyContainers = (container) => {
    const containerTypes = ['project', 'part', 'chapter', 'module', 'appendix'];
    const condition = setCondition(container);
    if (container && containerTypes.indexOf(container.label) > -1 && (!condition.noBodyMatter || !condition.noAlignments)) {
        return true;
    }
    return false;
}