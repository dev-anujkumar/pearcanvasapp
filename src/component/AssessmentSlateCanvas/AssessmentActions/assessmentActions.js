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
    ASSESSMENT_CONFIRMATION_POPUP,
    ELM_NEW_ITEM_DATA
} from "../../../constants/Action_Constants";
import { ELM_PORTAL_ERROR_MSG, AUTO_UPDATE_FAIL_ERROR } from '../AssessmentSlateConstants.js';
/**Import -other dependencies */
import config from '../../../config/config';
import assessmentApiHandlers from './assessmentApiHandlers.js';
import { handleRefreshSlate } from '../../ElementContainer/AssessmentEventHandling.js';
import { hideBlocker} from '../../../js/toggleLoader';
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
    interactiveVersionUpdateHandler
} = assessmentApiHandlers;

/**
 * This action creator is used to fetch usage-type based on entityType
 */
export const fetchUsageTypeData = (entityType) => (dispatch) => {
    let url = `${config.AUDIO_NARRATION_URL}/usagetypes/v3/${entityType}?locale=en`;
    return axios.get(url, {
        headers: {
            PearsonSSOSession: config.ssoToken
        }
    }).then((res) => {
        dispatchUsageTypeList(entityType, res, 200, dispatch);
        dispatchUsageTypeData(entityType, prepareUsageTypeData(res), 200, dispatch);
    }).catch((error) => {
        dispatchUsageTypeData(entityType, [], 404, dispatch);
        console.error('Error in Fetching UsageType from API>>>', error)
    })
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
                "PearsonSSOSession": config.ssoToken
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
            "PearsonSSOSession": config.ssoToken
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
 * This action creator is used to launch Elm Assessment Portal from Cypress
 */
export const openElmAssessmentPortal = (assessmentData) => (dispatch) => {
    let { assessmentWorkUrn, projDURN, containerURN, assessmentItemWorkUrn, interactiveId } = assessmentData
    let url = `${config.ELM_PORTAL_URL}/launch/editor/assessment/${assessmentWorkUrn}/editInPlace?containerUrn=${containerURN}&projectUrn=${projDURN}`;
    if (assessmentItemWorkUrn.trim() != "") {
        url = `${config.ELM_PORTAL_URL}/launch/editor/assessment/${assessmentWorkUrn}/item/${assessmentItemWorkUrn}/editInPlace?containerUrn=${containerURN}&projectUrn=${projDURN}`;
    } else if(interactiveId){
        url = `${config.ELM_PORTAL_URL}/launch/editor/interactive/${interactiveId}/editInPlace?containerUrn=${containerURN}&projectUrn=${projDURN}`;
    }
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

/**
 * This Function is used to update all the assessments with the given workUrn present in the project with the latest workUrn 
 * @param oldWorkUrn current workURN of the assessment
 * @param updatedWorkUrn latest workURN of the assessment
 */
export const updateAssessmentVersion = (oldWorkUrn, updatedWorkUrn) => dispatch => {
    let url = `${config.STRUCTURE_API_URL}vcs-api/v1/content/${config.projectUrn}/updateAssessments/${oldWorkUrn}/${updatedWorkUrn}`;
    dispatch(saveAutoUpdateData("",""));
    return axios.post(url, {}, {
        headers: {
            "Cache-Control": "no-cache",
            "PearsonSSOSession": config.ssoToken
        }
    }).then((res) => {
        if (res.status == 202) {
            dispatch(assessmentConfirmationPopup(true));
        }
    }).catch(() => {
        dispatch({
            type: ELM_PORTAL_API_ERROR,
            payload: {
                show: true,
                errorMessage: AUTO_UPDATE_FAIL_ERROR,
                isElmApiError: 'elm-api-error'
            }
        })
        hideBlocker();
        handleRefreshSlate(dispatch);
        console.error("Unable to update the latest workUrn for >>>>", oldWorkUrn)
    })
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
    if (workIds.length > 0 && workIds[0] === workIds[1]) {
        dispatch(updateAssessmentVersion(assessmentID[0], assessmentID[1]))
    }
}

export const assessmentConfirmationPopup = (data) => {
    return {
        type: ASSESSMENT_CONFIRMATION_POPUP,
        payload: data
    }
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