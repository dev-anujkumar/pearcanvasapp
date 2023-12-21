/**Import -Plugins */
import axios from 'axios';
/**Import -constants */
import {
    SAVE_AUTO_UPDATE_ID,
    ELM_ITEM_EVENT_DATA,
    ELM_PORTAL_API_ERROR,
    SET_ITEM_UPDATE_EVENT,
    RESET_ASSESSMENT_STORE,
    ELM_ASSESSMENT_EDIT_ID,
    ELM_NEW_ITEM_DATA,
    SET_ELM_PICKER_MSG,
    UPDATE_ASSESSMENT_ID,
    UPDATE_ASSESSMENT_DATA,
    ASSESSMENT_RELOAD_CONFIRMATION
} from "../../../constants/Action_Constants";
import { ELM_PORTAL_ERROR_MSG } from '../AssessmentSlateConstants.js';
/**Import -other dependencies */
import config from '../../../config/config';
import store from '../../../appstore/store.js';
import assessmentApiHandlers from './assessmentApiHandlers.js';
import { hasReviewerSubscriberRole } from '../../../constants/utility.js';
const {
    dispatchUsageTypeList,
    prepareUsageTypeData,
    dispatchUsageTypeData,
    assessmentErrorHandler,
    assessmentVersionHandler,
    assessmentMetadataHandler,
    assessmentEntityUrnHandler,
    assessmentItemVersionHandler,
    assessmentItemMetadataHandler,
    assessmentVersionUpdateHandler,
    interactiveMetadataHandler,
    interactiveVersionHandler,
    interactiveVersionUpdateHandler,
    latestAssessmentItemHandler
} = assessmentApiHandlers;

/**
 * This action creator is used to fetch usage-type based on entityType
 */
export const fetchUsageTypeData = (entityType) => (dispatch) => {
    const usageTypeList = store.getState().appStore?.usageTypeListData?.usageTypeList;
    const usageTypeListData = store.getState().assessmentReducer?.usageTypeListData;
    if (!usageTypeList || Object.keys(usageTypeListData).length === 0) {
        let url = `${config.STRUCTURE_READONLY_ENDPOINT}usagetypes/v3/${entityType}?locale=en`;
        return axios.get(url, {
            headers: {
                myCloudProxySession: config.myCloudProxySession
            }
        }).then((res) => {
            dispatchUsageTypeList(entityType, res, 200, dispatch);
            dispatchUsageTypeData(entityType, prepareUsageTypeData(res), 200, dispatch);
        })
        .catch((error) => {
            dispatchUsageTypeData(entityType, [], 404, dispatch);
            console.error('Error in Fetching UsageType from API>>>', error)
        })
    }
}

/**
 * This action creator is used to fetch the latest assessment details
 */
export const fetchAssessmentUpdatedData = () => (dispatch) => {
    const subscribercheck = hasReviewerSubscriberRole()
    const apiUrl = `${config.CYPRESS_API_ENDPOINT}v1/project/${config.projectUrn}/container/${config.slateEntityURN}/updateAssessments?vcs=${subscribercheck ? "false" : "true"}`;
    try {
        axios.put(apiUrl, {}, {
            headers: {
                'myCloudProxySession': config.myCloudProxySession
            }
        }).then(res => {
            dispatch({
                type: UPDATE_ASSESSMENT_DATA,
                payload: res?.data?.assessments
            })
        }).catch(error => {
            console.error('Error in getting assessment data', error)
        });
    } catch (err) {
        console.error('Error in getting assessment data', err)
        return {}
    }
}


/**
 * This action creator is used to fetch the assessment metadata including status
 */
export const fetchAssessmentMetadata = (type, calledFrom, assessmentData, assessmentItemData) => (dispatch) => {
    const workUrn = (type == 'assessment' || type == 'assessmentArray' || type == 'interactive') ? assessmentData.targetId : assessmentItemData.targetItemid;
    if(workUrn){
        const url = `${config.ASSESSMENT_ENDPOINT}assessment/v2/${workUrn}`;
        return axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "ApiKey": config.STRUCTURE_APIKEY,
                'myCloudProxySession': config.myCloudProxySession
            }
        }).then(async (res) => {
            if (res && res.data && res.data.status) {
                switch (type) {
                    case 'assessment':
                        await assessmentMetadataHandler(res.data, calledFrom, assessmentData, assessmentItemData, dispatch);
                        break;
                    case 'assessmentItem':
                        assessmentItemMetadataHandler(res.data, calledFrom, assessmentData, assessmentItemData, dispatch);
                        break;
                    case 'assessmentArray':
                        return assessmentEntityUrnHandler(res.data);
                    case 'interactive':
                        return interactiveMetadataHandler(res.data, calledFrom, assessmentData, dispatch);
                    default:
                        assessmentErrorHandler(type,':Invalid Type of Assessment for Metadata');
                        break;
                }
            }
        }).catch((error) => {
            const errorMsg = type == 'assessmentArray' ? assessmentData.errorMessage : `${type}: Assessment-Metadata API Error:`
            assessmentErrorHandler(`${errorMsg}:${error}`);
        })
    }
}
/**
 * This action creator is used to fetch all the versions of the assessment/assessment-item
 */
export const fetchAssessmentVersions = (entityUrn, type, createdDate, assessmentData, assessmentItemData) => (dispatch) => {
    return axios.get(`${config.ASSESSMENT_ENDPOINT}entity/${entityUrn}/versions`, {
        headers: {
            "Content-Type": "application/json",
            "ApiKey": config.STRUCTURE_APIKEY,
            'myCloudProxySession': config.myCloudProxySession
        }
    }).then(async (res) => {
        if (res && res.data && res.data.length > 0) {
            const newVersions = res.data.filter(assessment => new Date(assessment.createdDate) > new Date(createdDate)) /** List of All versions created after current WorkURN */
            const args = {
                newVersions, assessmentData, assessmentItemData
            }
            switch (type) {
                case 'assessmentItem':
                    assessmentItemVersionHandler(res.data, args, dispatch);
                    break;
                case 'assessment':
                    assessmentVersionHandler(res.data, args, dispatch);
                    break;
                case 'assessmentUpdate':
                    await assessmentVersionUpdateHandler(res.data, args,dispatch);
                    break;
                case 'interactive':
                    interactiveVersionHandler(res.data, args, dispatch);
                    break;
                case 'interactiveUpdate':
                    interactiveVersionUpdateHandler(res.data, args, dispatch);
                    break;
                default:
                    assessmentErrorHandler(type,':Invalid Type of Assessment for List of Versions');
                    break;
            }
        }
    }).catch((error) => {
        assessmentErrorHandler(`${type}: Assessment Versions API Error:${error}`);
    })
}
/**
 * This action creator is used to fetch list of all assessment-items wrt an assessment
 */
export const fetchAssessmentItems = (itemEntityUrn, apiParams) => dispatch => {
    const { assessmentData: { activeWorkUrn } } = apiParams;
    let url = `${config.REACT_APP_API_URL}v1/slate/assessment/${activeWorkUrn}/items`;
    return axios.get(url, {
        headers: {
            'myCloudProxySession': config.myCloudProxySession
        }
    }).then(async (res) => {
        if (res?.data?.items?.length > 0) {
            const latestItem = res.data.items.find(item => item.entityUrn === itemEntityUrn)
            await latestAssessmentItemHandler(latestItem, apiParams, dispatch)
        } else {
            latestAssessmentItemHandler({}, apiParams, dispatch)
        }
    }).catch((error) => {
        latestAssessmentItemHandler({}, apiParams, dispatch)
        console.error('Unable to get assessment items list>>>', error)
    })
}
/**
 * This action creator is used to launch Elm Assessment Portal from Cypress
 */
export const openElmAssessmentPortal = (assessmentData) => (dispatch) => {
    // sending durn when assessment/assessment item/elm interactives are inside frontmatter or backmatter in the url to launch elm
    const elmContainerUrn = config.parentContainerUrn && config.parentOfParentItem !== "frontmatter" && config.parentOfParentItem !== "backmatter"
    let { assessmentWorkUrn, projDURN, assessmentItemWorkUrn, interactiveId, elementId } = assessmentData
    let url = `${config.ELM_PORTAL_URL}/launch/editor/assessment/${assessmentWorkUrn}/editInPlace?containerUrn=${elmContainerUrn ?
                 config.parentContainerUrn : projDURN}&projectUrn=${projDURN}`;
    if (assessmentItemWorkUrn.trim() != "") {
        url = `${config.ELM_PORTAL_URL}/launch/editor/assessment/${assessmentWorkUrn}/item/${assessmentItemWorkUrn}/editInPlace?containerUrn=${elmContainerUrn ?
                 config.parentContainerUrn : projDURN}&projectUrn=${projDURN}`;
    } else if(interactiveId){
        url = `${config.ELM_PORTAL_URL}/launch/editor/interactive/${interactiveId}/editInPlace?containerUrn=${elmContainerUrn ?
                 config.parentContainerUrn : projDURN}&projectUrn=${projDURN}`;
    }
    /* Append Element id in url to identify post messages for which element, if exist */
    url = elementId ? `${url}&elementUrn=${elementId}` : url;
    try {
        let elmWindow = window.open(url);
        if (elmWindow.closed) {
            console.log('Error in Navigating to Elm Assessment Portal!!!')
        } else {
            console.log('Successfully Navigated to Elm Assessment Portal!!!')
        }
    } catch (error) {
        console.error('Unable to Launch Elm Assessment Env>>>', error)
        dispatch({
            type: ELM_PORTAL_API_ERROR,
            payload: {
                showError: true,
                errorMessage: ELM_PORTAL_ERROR_MSG,
                isElmApiError: 'elm-api-error'
            }
        })
    }
}

export const resetAssessmentStore = () => {
    return {
        type: RESET_ASSESSMENT_STORE,
        payload: {}
    }
}

/**
 * This Function is used to call updateAssessmentVersion in case of same assessment being updated
 * @param assessmentID array of old & new AssessmentIds
 */
export const checkEntityUrn = (assessmentID) => async (dispatch) => {
    let workIds = []
    await Promise.all(assessmentID && assessmentID.map(async (item) => {
        const errorMsg = "error in finding entityurn";
        let entityUrn = await dispatch(fetchAssessmentMetadata('assessmentArray', 'fromCheckEntityUrn', { targetId: item, errorMessage: errorMsg }, {}))
        entityUrn && workIds.push(entityUrn);
    }))
}

export const saveAutoUpdateData = (oldAssessmentId, newAssessmentId) => {
    return {
        type: SAVE_AUTO_UPDATE_ID,
        payload: {
            oldAssessmentId: oldAssessmentId,
            newAssessmentId: newAssessmentId
        }
    }
}

export const editElmAssessmentId = (elmAssessmentId, elmAssessmentItemId) => {
    return {
        type: ELM_ASSESSMENT_EDIT_ID,
        payload: {
            currentEditAssessment: { elmAssessmentId, elmAssessmentItemId }
        }
    }
}

export const updateElmItemData = (editAssessment, itemData) => {
    return {
        type: ELM_ITEM_EVENT_DATA,
        payload: {
            currentWorkUrn: editAssessment.elmAssessmentId,
            updatedItem: {
                oldItemId: editAssessment.elmAssessmentItemId,
                latestItemId: itemData.itemId,
                latestItemTitle: itemData.itemTitle
            }
        }
    }
}

export const  setItemUpdateEvent= (value) => {
    return {
        type: SET_ITEM_UPDATE_EVENT,
        payload: value
    }
}

export const setNewItemFromElm = (value) =>{
 return {
        type: ELM_NEW_ITEM_DATA,
        payload: value
    }
}

export const setElmPickerData = (message) => {
    return {
        type: SET_ELM_PICKER_MSG,
        payload: message
    }
}

export const updateAssessmentId = (assessmentId) => {
    return {
        type: UPDATE_ASSESSMENT_ID,
        payload: assessmentId
    }
}

export const assessmentReloadConfirmation = (data) => {
    return {
        type: ASSESSMENT_RELOAD_CONFIRMATION,
        payload: data
    }
}
