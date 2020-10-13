/**Import -Plugins */
import axios from 'axios';
import moment from 'moment';
/**Import -other dependencies */
import config from '../../../config/config';
/**Import -constants */
import {
    GET_USAGE_TYPE,
    SET_ASSESSMENT_STATUS,
    GET_ASSESSMENT_VERSIONS,
    ELM_PORTAL_API_ERROR,
    RESET_ASSESSMENT_STORE
} from "../../../constants/Action_Constants";
import { ELM_PORTAL_ERROR_MSG } from '../AssessmentSlateConstants.js';

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
        dispatch({
            type: GET_USAGE_TYPE,
            payload: {
                entityType: entityType,
                usageTypeList: prepareUsageTypeData(res),
                apiStatus: 200,
            }
        })
    }).catch(() => {
        dispatch({
            type: GET_USAGE_TYPE,
            payload: {
                entityType: entityType,
                usageTypeList: [],
                apiStatus: 404,
            }
        })
    })
}
const prepareUsageTypeData = (res) => {
    let usageTypeList = [];
    if (res && res.data && res.data.length) {
        res.data.filter(usageType => {
            usageTypeList.push(usageType.label.en)
        })
    }
    return usageTypeList
}

/**
 * This action creator is used to fetch the assessment metadata including status
 */
export const checkAssessmentStatus = (workUrn, calledFrom, currentWorkUrn, currentWorkData) => (dispatch) => {
    let url = `${config.ASSESSMENT_ENDPOINT}assessment/v2/${workUrn}`;
    return axios.get(url, {
        headers: {
            "Content-Type": "application/json",
            "ApiKey": config.STRUCTURE_APIKEY,
            "PearsonSSOSession": config.ssoToken
        }
    }).then((res) => {
        if (res && res.data && res.data.status) {
            let statusString = res.data.status.split("/")
            let assessmentStatus = statusString[statusString.length - 1]
            let dataForUpdate = {
                showUpdateStatus: false
            };
            if (calledFrom == 'fromNextVersion') {
                dataForUpdate = { ...currentWorkData }
                dataForUpdate.showUpdateStatus = checkAssessmentNextVersion(res.data, currentWorkUrn);
                dataForUpdate.latestWorkUrn = dataForUpdate.showUpdateStatus == true ? workUrn : currentWorkUrn;
                // dataForUpdate.assessmentTitle = res.data.name ? res.data.name : res.data.defaultTitle ? res.data.defaultTitle : 'Elm assessment'
            } else {
                dataForUpdate = {
                    assessmentStatus: assessmentStatus,
                    assessmentEntityUrn: res.data.entityUrn,
                    activeWorkUrn: res.data.versionUrn,
                    assessmentTitle: res.data.name ? res.data.name : res.data.defaultTitle ? res.data.defaultTitle : 'Elm assessment',
                    showUpdateStatus: false,
                    ...dataForUpdate
                }
            }
            let assessmentUrn = calledFrom == 'fromNextVersion' ? currentWorkUrn : workUrn
            if (assessmentStatus == 'wip' || (calledFrom == 'fromNextVersion')) {
                dispatch({
                    type: SET_ASSESSMENT_STATUS,
                    payload: {
                        currentWorkUrn: assessmentUrn,
                        dataForUpdate: dataForUpdate
                    }
                })
            }
            if (assessmentStatus == 'final' && calledFrom && (calledFrom != 'fromUpdate')) {
                dispatch(getLatestAssessmentVersion(res.data.entityUrn, workUrn, res.data.dateCreated, dataForUpdate))
            }
        }
    }).catch(() => {
        dispatch({
            type: SET_ASSESSMENT_STATUS,
            payload: {
                [workUrn]: { assessmentStatus: "" }
            }
        })
    })
}

/**
 * @description This function is to set "showUpdateStatus" to handle update button status
 * @param {*} nextData metadata for the nextWorkUrn of the assessment
 * @param {*} previousWorkUrn current WorkUrn of the assessment
 */
const checkAssessmentNextVersion = (nextData, previousWorkUrn) => {
    let createDate = new Date(nextData.dateCreated);
    let versionStatus = nextData.additionalMetadata.find(item => item.hasOwnProperty('elmVersionIsClean'));
    let checkElmVersionIsClean = versionStatus && versionStatus.elmVersionIsClean == true ? true : false;
    if ((nextData.status.includes('final')) || (checkElmVersionIsClean == false) || (new Date(nextData.dateModified) > createDate.setSeconds(createDate.getSeconds() + 10)) || (nextData.isVersionOf && nextData.isVersionOf[0] !== previousWorkUrn)) {
        return true//update
    }
    return false//ispproved
}

/**
 * This action creator is used to fetch all the versions of the assessment/assessment-item
 */
export const getLatestAssessmentVersion = (entityUrn, workUrn, createdDate, previousData) => (dispatch) => {
    let url = `${config.ASSESSMENT_ENDPOINT}entity/${entityUrn}/versions`;
    return axios.get(url, {
        headers: {
            "Content-Type": "application/json",
            "ApiKey": config.STRUCTURE_APIKEY,
            "PearsonSSOSession": config.ssoToken
        }
    }).then((res) => {
        if (res && res.data && res.data.length > 0) {
            let assessmentLatestWorkURN = res.data[getLatestIndex(res.data)].versionUrn //Latest WorkURN
            let newVersions = res.data.filter(assessment => new Date(assessment.createdDate) > new Date(createdDate)) //List of All versions created after current WorkURN
            if (newVersions && newVersions.length == 1) {        //Show Approved Status
                dispatch(checkAssessmentStatus(newVersions[0].versionUrn, 'fromNextVersion', workUrn, previousData))//"elmVersionIsClean": true
            } else if (newVersions && newVersions.length > 1) {  //Show UPDATE button
                dispatch({
                    type: GET_ASSESSMENT_VERSIONS,
                    payload: {
                        ...previousData,
                        currentWorkUrn: workUrn,
                        latestWorkUrn: assessmentLatestWorkURN,
                        showUpdateStatus: true
                    }
                })
            } else {
                dispatchVersionError(dispatch, workUrn);
            }
        }
    }).catch(() => {
        dispatchVersionError(dispatch, workUrn);
    })
}

/**
 * @description This function returns latest WorkURN from the list of All versions based on "createdDate" key
 */
const getLatestIndex = (allVersions) => {
    let latestIndex = 0;
    for (let index = 1; index < allVersions.length; index++) {
        let isAfter = moment(allVersions[index].createdDate).isAfter(allVersions[latestIndex].createdDate);
        if (isAfter) {
            latestIndex = index;
        }
    }
    return latestIndex
}

const dispatchVersionError = (dispatch, workUrn) => {
    dispatch({
        type: GET_ASSESSMENT_VERSIONS,
        payload: {
            latestWorkUrn: workUrn
        }
    })
}

/**
 * This action creator is used to launch Elm Assessment Portal from Cypress
 */
export const openElmAssessmentPortal = (assessmentData) => (dispatch) => {
    let { assessmentWorkUrn, projDURN, containerURN, assessmentItemWorkUrn } = assessmentData
    let url = `${config.ELM_PORTAL_URL}/launch/editor/assessment/${assessmentWorkUrn}/editInPlace?containerUrn=${containerURN}&projectUrn=${projDURN}`;
    if (assessmentItemWorkUrn.trim() != "") {
        url = `${config.ELM_PORTAL_URL}/launch/editor/assessment/${assessmentWorkUrn}/item/${assessmentItemWorkUrn}/editInPlace?containerUrn=${containerURN}&projectUrn=${projDURN}`;
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
    let url = `${config.SLATE_REFRESH_URL}${config.projectUrn}/updateAllAssessments/${oldWorkUrn}/${updatedWorkUrn}`;
    return axios.post(url, {}, {
        headers: {
            "Cache-Control": "no-cache",
            "PearsonSSOSession": config.ssoToken,
            "Access-Control-Allow-Origin": "*"
        }
    }).then((res) => {
        console.log(res, "res")
    }).catch(() => {
        console.error("Unable to update the latest workUrn for >>>>", oldWorkUrn)
        dispatch({
            type: ELM_PORTAL_API_ERROR,
            payload: {
                show: true,
                errorMessage: 'Unable to Update Other Instances of this Assessment in the Project',
                isElmApiError: 'elm-api-error'
            }
        })
    })
}

export const resetAssessmentStore = () => {
    return {
        type: RESET_ASSESSMENT_STORE,
        payload: {}
    }
}