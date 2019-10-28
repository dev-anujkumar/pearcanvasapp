import config from "../config/config"
import axios from "axios"

const { 
    REACT_APP_API_URL,
    ssoToken,
    projectUrn
} = config

const headers = {
    "Content-Type": "application/json",
    "PearsonSSOSession":  ssoToken
}

/**
 * Generates Glossary/Footnote ID 
 * @param {*} elementId Element work URN 
 * @param {*} enumType enum (glossray or footnote)
 * @param {*} callback callback method
 */
export const getGlossaryFootnoteId = (elementId, enumType, callback) => {
	let url = `${REACT_APP_API_URL}v1/slate/${projectUrn}/${elementId}/createWorkId/${enumType}`
    axios.post(url, null, headers)
    .then(res => {
        callback(res)
    })
    .catch(err => console.log("create glossary footnote API error : ", err))
}