/**Import -Plugins */
import axios from 'axios';
import moment from 'moment';
/**Import -other dependencies */
import config from '../../../config/config';
/**Import -constants */
import { GET_USAGE_TYPE, SET_ASSESSMENT_STATUS, GET_ASSESSMENT_METADATA, GET_ASSESSMENT_VERSIONS } from "../../../constants/Action_Constants";

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
export const checkAssessmentStatus = (workUrn, calledFrom) => (dispatch) => {
    let url = `${config.ASSESSMENT_ENDPOINT}assessment/v2/${workUrn}`;
    return axios.get(url, {
        headers: {
            "Content-Type": "application/json",
            "ApiKey": config.STRUCTURE_APIKEY,
            "PearsonSSOSession": config.ssoToken
        }
    }).then(async (res) => {
        if (res && res.data && res.data.status) {
            let statusString = res.data.status.split("/")
            let assessmentStatus = statusString[statusString.length - 1]
            await dispatch({
                type: SET_ASSESSMENT_STATUS,
                payload: {
                    assessmentStatus: assessmentStatus
                }
            })
            await dispatch({
                type: GET_ASSESSMENT_METADATA,
                payload: {
                    entityUrn: res.data.entityUrn,
                    activeWorkUrn: res.data.versionUrn,
                    assessmentTitle: res.data.name ? res.data.name : res.data.defaultTitle ? res.data.defaultTitle : 'Elm assessment'
                }
            })
            if (assessmentStatus == 'final' && calledFrom && calledFrom!='fromUpdate') {
                await dispatch(getLatestAssessmentVersion(res.data.entityUrn))
            }
        }
    }).catch(() => {
        dispatch({
            type: SET_ASSESSMENT_STATUS,
            payload: {
                assessmentStatus: ""
            }
        })
    })
}

/**
 * This action creator is used to fetch all the versions of the assessment/assessment-item
 */
export const getLatestAssessmentVersion = (entityUrn) => (dispatch) => {
    let url = `${config.ASSESSMENT_ENDPOINT}entity/${entityUrn}/versions`;
    return axios.get(url, {
        headers: {
            "Content-Type": "application/json",
            "ApiKey": config.STRUCTURE_APIKEY,
            "PearsonSSOSession": config.ssoToken
        }
    }).then((res) => {
        if (res && res.data && res.data.length > 0) {
            let latestIndex = 0;
            for (let index = 1; index < res.data.length; index++) {
                let isAfter = moment(res.data[index].createdDate).isAfter(res.data[latestIndex].createdDate);
                if (isAfter) {
                    latestIndex = index;
                }
            }
            let assessmentWorkURN = res.data[latestIndex].versionUrn
            dispatch({
                type: GET_ASSESSMENT_VERSIONS,
                payload: {
                    latestWorkUrn: assessmentWorkURN
                }
            })
        } else {
            dispatch({
                type: GET_ASSESSMENT_VERSIONS,
                payload: {
                    latestWorkUrn: ""
                }
            })
        }
    }).catch(() => {
        dispatch({
            type: GET_ASSESSMENT_VERSIONS,
            payload: {
                latestWorkUrn: ""
            }
        })
    })
}

/**
 * This action creator is used to launch Elm Assessment Portal from Cypress
 */
export const openElmAssessmentPortal = (assessmentData) => {
    let { assessmentWorkUrn, projDURN, containerURN, assessmentItemWorkUrn } = assessmentData
    let url = `https://assessmentauthoring-qa.pearson.com/launch/editor/assessment/${assessmentWorkUrn}/editInPlace`;
    if (assessmentItemWorkUrn.trim() != "") {
        url = `${config.ELM_PORTAL_URL}/launch/editor/assessment/${assessmentWorkUrn}/item/${assessmentItemWorkUrn}/editInPlace`;
    }
    return axios.post(url, {
        "title-durn": projDURN,
        "container-urn": containerURN
    }, {
        headers: {
            "PearsonSSOSession": config.ssoToken
        }
    }).then((res) => {
        console.log('Successfully Navigated to Elm Assessment Portal!!!')
    }).catch((error) => {
        console.log('Unable to Launch Elm Assessment Env>>>', error)
    })
}