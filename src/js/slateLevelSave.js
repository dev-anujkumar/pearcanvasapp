/**
 * This file will contain all methods related to slate level save functionality.
 */
import config from "../config/config";
import cypressConfig from "../config/cypressConfig";
import axios from "axios";

const { 
    REACT_APP_API_URL
} = config

/**
 * Generates Glossary/Footnote ID 
 * @param {*} elementId Element work URN 
 * @param {*} enumType enum (glossray or footnote)
 * @param {*} callback callback method
 */
export const triggerSlateLevelSave = (entityURN, triggerAction) => {
	let url = `${cypressConfig.SLATE_LEVEL_SAVE_ENDPOINT}structure-api/context/v1/${config.projectUrn}/container/${entityURN}/notifySlateStateChange`;
	let requestBody = {
        "triggerAction": triggerAction,
        "sourceApp": "cypress", 
        "initiatorUserId": config.userId 
    }
    return axios.post(url, requestBody, { 
        headers: {
            "Content-Type": "application/json",
            'myCloudProxySession': config.myCloudProxySession
        }
    })
    .then(res => {
        console.log("Slate level save API success : ", res)
    })
    .catch(err => {
        console.log("Slate level save API error : ", err)
    })

}