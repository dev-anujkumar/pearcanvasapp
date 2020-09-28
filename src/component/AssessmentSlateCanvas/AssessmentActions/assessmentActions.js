/**Import -Plugins */
import axios from 'axios';
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

export const checkAssessmentStatus = (workUrn) => (dispatch) => {
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
            dispatch({
                type: SET_ASSESSMENT_STATUS,
                payload: {
                    assessmentStatus: assessmentStatus
                }
            })
            dispatch({
                type: GET_ASSESSMENT_METADATA,
                payload: {
                    entityUrn: res.data.entityUrn,
                    activeWorkUrn: res.data.versionUrn
                }
            })
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
            let latestAssessment = res.data[res.data.length - 1]
            let assessmentWorkURN = latestAssessment.versionUrn
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

export const openElmAssessmentPortal = (assessmentData) => {
    const { workUrn, projDURN, containerURN } = assessmentData
    let url = `${config.ELM_ASSESSMENT_PORTAL}/launch/editor/assessment/${workUrn}/editInPlace`;
    return axios.post(url, {
        dUrn: projDURN,
        cUrn: containerURN
    }, {
        headers: {
            "PearsonSSOSession": config.ssoToken
        }
    }).then((res) => {
        console.log('Successfully launcedh Elm Assessment Env>>>')
    }).catch((error) => {
        console.log('Unable to Launch Elm Assessment Env>>>', error)
    })
}