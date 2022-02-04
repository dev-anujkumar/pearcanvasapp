import config from '../../config/config.js';
import axios from 'axios';
import { mediaElementAPI_Handler } from './mediaElementDataMapper.js';
import {
    SET_AUTO_NUMBER_TOGGLE,
    SET_AUTO_NUMBER_SEQUENCE,
    GET_TOC_AUTO_NUMBERING_LIST,
    GET_ALL_AUTO_NUMBER_ELEMENTS
} from '../../constants/Action_Constants.js';
import { prepareAutoNumberList, getNumberedElements } from './AutoNumber_helperFunctions';
import { AUTO_NUMBER_ELEMENTS, autoNumber_IndexMapper } from './AutoNumberConstants';
/**
 * 
 */

const commonHeaders = {
    "ApiKey": config.STRUCTURE_APIKEY,
    "Content-Type": "application/json",
    "PearsonSSOSession": config.ssoToken
}

/**
 * This API fetches the autonumbered elements in the current TOC Container (P,C,FM,BM)
 * @param {*} currentParentUrn TOC Container EntityUrn
 * @returns 
 */
export const fetchProjectFigures = (currentParentUrn) => (dispatch, getState) => {
    const url = getAPIUrl(currentParentUrn);
    axios.get(url, {
        headers: {
            "ApiKey": config.STRUCTURE_APIKEY,
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken
        }
    }).then(async response => {
        if (response?.data) {
            const projectContent = response.data;
            let numberedElements = {}
            numberedElements = getNumberedElements(projectContent, currentParentUrn);
            console.log('numberedElements>>>>', numberedElements)
            getAutoNumberSequence(numberedElements,dispatch)
            dispatch({
                type: GET_ALL_AUTO_NUMBER_ELEMENTS,
                payload: {
                    numberedElements
                }
            });

        } else {
            commonDispatch(dispatch, GET_ALL_AUTO_NUMBER_ELEMENTS, {})
        }
    }).catch(error => {
        console.error('Error in fetching list of figures in the project>>>> ', error)
        commonDispatch(dispatch, GET_ALL_AUTO_NUMBER_ELEMENTS, {})
    })

};

/**
 * Prepare the Final Autonumbered Elements Sequence
 * @param {*} numberedElements 
 * @param {*} autoNumberElementsIndex 
 * @returns 
 */
const setAutoNumberSequenceForElements = (numberedElements, autoNumberElementsIndex) => {
    for (let labelType in numberedElements) {
        if (Object.prototype.hasOwnProperty.call(numberedElements, labelType)) {
            const Obj = prepareAutoNumberList(numberedElements[labelType])
            autoNumberElementsIndex[autoNumber_IndexMapper[labelType]] = Obj
        }
    }
    return autoNumberElementsIndex
}

/**
 * Save the Final Autonumbered Elements Sequence in Store
 * @param {*} numberedElements 
 * @param {*} dispatch 
 */
export const getAutoNumberSequence = (numberedElements, dispatch) => {
    let autoNumberElementsIndex = {}
    autoNumberElementsIndex = setAutoNumberSequenceForElements(numberedElements, autoNumberElementsIndex);
    dispatch({
        type: SET_AUTO_NUMBER_SEQUENCE,
        payload: {
            autoNumberElementsIndex
        }
    });
}

/**
 * Prepare the Endpoint to get Autonumbered Elements at Container TOC Container Level  (P,C,FM,BM)
 * @param {*} containerEntityUrn 
 * @returns 
 */
const getAPIUrl = (containerEntityUrn) => {
    let matterType = "";
    switch(containerEntityUrn){
        case "frontMatter":
            matterType = "frontmatter";
        break;
        case "backMatter":
            matterType = "backmatter";
        break;
        default:
            matterType = "bodymatter"
    }
    let url = `${config.REACT_APP_API_URL}v1/project/${config.projectUrn}/sectionType/${matterType}`;
    if(matterType === "bodymatter"){
        url = `${url}?contentUrn=${containerEntityUrn}`;
    }

    return url;
}

/**
 * Set TOC Container's AutoNumbbering Details in Store
 * @param {*} autoNumberingDetails 
 * @returns 
 */
export const setTocContainersAutoNumberList = (autoNumberingDetails) => dispatch => {
    dispatch({
        type: GET_TOC_AUTO_NUMBERING_LIST,
        payload: autoNumberingDetails
    });
}

/**
 * Function to Enable/Disable Autonumbering in Canvas
 * @param {*} flag 
 * @param {*} configValue 
 * @returns 
 */
export const isAutoNumberEnabled = (flag, configValue) => dispatch => {
    return dispatch({
        type: SET_AUTO_NUMBER_TOGGLE,
        payload: {
            isAutoNumberingEnabled: true //flag && configValue
        }
    });
}

export const commonDispatch = (dispatch, type, payload) => {
    dispatch({
        type: type,
        payload: payload
    });
}


/**
 * Get Slate's Content | Used for getting Popup Slate's bodymatter
 * @param {*} manifestURN 
 * @param {*} entityURN 
 * @returns 
 */
export const getSlateLevelData = async (manifestURN, entityURN) => {
    let apiUrl = `${config.REACT_APP_API_URL}v1/slate/content/${config.projectUrn}/${entityURN}/${manifestURN}`
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        })
        const slateData = Object.values(response.data)[0];
        return slateData;
    } catch (err) {
        console.log('Error in getting slate link data', err)
        return []
    }
}
