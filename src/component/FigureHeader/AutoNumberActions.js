import config from '../../config/config.js';
import axios from 'axios';
import {
    SET_AUTO_NUMBER_TOGGLE,
    SET_AUTO_NUMBER_SEQUENCE,
    GET_TOC_AUTO_NUMBERING_LIST,
    GET_ALL_AUTO_NUMBER_ELEMENTS,
    UPDATE_CHAPTER_POPUP_DATA,
    SET_POPUP_PARENT_CUT_COPY
} from '../../constants/Action_Constants.js';
import { prepareAutoNumberList, getNumberedElements } from './AutoNumber_helperFunctions';
import store from '../../appstore/store'
/**
 *
 */

const commonHeaders = {
    "ApiKey": config.STRUCTURE_APIKEY,
    "Content-Type": "application/json",
    'myCloudProxySession': config.myCloudProxySession
}

/**
 * This API fetches the autonumbered elements in the current TOC Container (P,C,FM,BM)
 * @param {*} currentParentUrn TOC Container EntityUrn
 * @returns
 */
export const fetchProjectFigures = (currentParentUrn) => async dispatch => {
    try{
        const headers = {
            "ApiKey": config.STRUCTURE_APIKEY,
            "Content-Type": "application/json",
            'myCloudProxySession': config.myCloudProxySession
        }
        const figureUrl = getAPIUrl(currentParentUrn);
        const containerUrl = ['frontMatter', 'backMatter'].includes(currentParentUrn) ? `${figureUrl}?aside=true` : `${figureUrl}&aside=true`;
        let figurePromise = axios.get(figureUrl, {headers});
        let containerPromise = axios.get(containerUrl, {headers});

        let response = await Promise.all([figurePromise, containerPromise]);
        let projectContent = {}
        response.forEach(res => {
            projectContent = { ...res.data, ...projectContent}
        })
        if (Object.keys(projectContent)?.length > 0) {
            let numberedElements = {}
            let requiredProjectContent = {}
            Object.keys(projectContent).forEach((key) => {
                requiredProjectContent[key.slice(0,-1)] = projectContent[key]
            })
            numberedElements = getNumberedElements(requiredProjectContent, currentParentUrn);
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
    } catch(error){
        console.error('Error in fetching list of figures in the project>>>> ', error)
        commonDispatch(dispatch, GET_ALL_AUTO_NUMBER_ELEMENTS, {});
    }
};

/**
 * Prepare the Final Autonumbered Elements Sequence
 * @param {*} numberedElements
 * @param {*} autoNumberElementsIndex
 * @returns
 */
const setAutoNumberSequenceForElements = (numberedElements, autoNumberElementsIndex) => {
    const autoNumber_IndexMapper = store.getState()?.autoNumberReducer?.autoNumber_IndexMapper
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
            isAutoNumberingEnabled: flag && configValue
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
    let apiUrl = `${config.REACT_APP_API_URL}v1/project/${config.projectUrn}/entity/${config.projectEntityUrn}/container/${entityURN}/content`;
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                "Content-Type": "application/json",
                'myCloudProxySession': config.myCloudProxySession
            }
        })
        const slateData = Object.values(response.data)[0];
        return slateData;
    } catch (err) {
        console.error('Error in getting slate link data', err)
        return {}
    }
}

/**
 * Handle Autonumbering in TCM Window
 */
export const setAutoNumberinBrowser = (flag, configValue) => {
    let prevStatus = localStorage.getItem('projectAutoNumberStatus');
    let projectAutoNumberStatus = {};
    if (prevStatus && prevStatus.length > 0) {
        projectAutoNumberStatus = JSON.parse(prevStatus);
    }
    projectAutoNumberStatus = {
        ...projectAutoNumberStatus,
        [config.projectEntityUrn]: flag && configValue
    }
    localStorage.setItem('projectAutoNumberStatus', JSON.stringify({ ...projectAutoNumberStatus }));
}

export const updateChapterPopupData = (dataObj, key) => {
    store.dispatch({
        type: UPDATE_CHAPTER_POPUP_DATA,
        key: key,
        payload: dataObj
    });
}

export const popupCutCopyParentData = (data) => {
    store.dispatch({
        type: SET_POPUP_PARENT_CUT_COPY,
        payload: data
    });
}