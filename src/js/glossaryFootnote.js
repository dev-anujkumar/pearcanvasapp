/**
 * This file will contain all methods related to glossary and footnote functionality.
 */
import config from "../config/config"
import axios from "axios"

const { 
    REACT_APP_API_URL
} = config

/**
 * Generates Glossary/Footnote ID 
 * @param {*} elementId Element work URN 
 * @param {*} enumType enum (glossray or footnote)
 * @param {*} callback callback method
 */
export const getGlossaryFootnoteId = (elementId, enumType, callback) => {
	let url = `${config.REACT_APP_API_URL}v1/slate/${config.projectUrn}/${elementId}/createWorkId/${enumType}`
    axios.post(url, null, { 
        headers: {
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken
        }
    })
    .then(res => {
        console.log("create glossary footnote API success : ", res)
        callback(res)
    })
    .catch(err => {
        console.log("create glossary footnote API error : ", err)
        callback(err)
    })

}