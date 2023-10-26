/**
 * This file will contain all methods related to slate level save functionality.
 */
import config from "../config/config";
import axios from "axios";

const {
    REACT_APP_API_URL
} = config

/**
 * Triggers Slate level save api on different events 
 * @param {*} entityURN Slate URN 
 * @param {*} triggerAction event name
 */
export const triggerSlateLevelSave = (entityURN, triggerAction, paramDetails = {}) => {
    // Check whether any change made in slate for triggering slate level save api
    let isChangeInSlate = localStorage.getItem('isChangeInSlate');
    if (isChangeInSlate === 'true') {
        let projectEntity, slateEntity, userId, myCloudProxySession;
        if (Object.keys(paramDetails)?.length > 0) {
            projectEntity = paramDetails?.projectUrn
            slateEntity = paramDetails?.slateEntityURN;
            userId = paramDetails?.userId;
            myCloudProxySession = paramDetails?.myCloudProxySession;
            localStorage.removeItem('paramDetails');
        } else {
            projectEntity = config.projectUrn;
            slateEntity = entityURN;
            userId = config.userId;
            myCloudProxySession = config.myCloudProxySession;
        }
        let url = `${config.STRUCTURE_API_URL}structure-api/context/v1/${projectEntity}/container/${slateEntity}/notifySlateStateChange`;
        let requestBody = {
            "triggerAction": triggerAction,
            "sourceApp": "cypress",
            "initiatorUserId": userId
        }
        return axios.post(url, requestBody, {
            headers: {
                "Content-Type": "application/json",
                'myCloudProxySession': myCloudProxySession
            }
        })
            .then(res => {
                console.log("Slate level save API success : ", res);
                // Making condition false for triggering slate level save api until other true change
                localStorage.setItem('isChangeInSlate', 'false');
            })
            .catch(err => {
                console.log("Slate level save API error : ", err)
            })
    } else {
        localStorage.setItem('isChangeInSlate', 'false');
        return false;
    }
}
