import config from '../../config/config.js';
import axios from 'axios';
import { mediaElementAPI_Handler } from './mediaElementDataMapper.js';
import {
    SET_AUTO_NUMBER_TOGGLE,
    SET_AUTO_NUMBER_SEQUENCE,
    UPDATE_AUTO_NUMBER_SEQUENCE,
    GET_TOC_AUTO_NUMBERING_LIST,
    GET_ALL_AUTO_NUMBER_ELEMENTS,
    UPDATE_AUTO_NUMBER_ELEMENTS_LIST
} from '../../constants/Action_Constants.js';
import { prepareAutoNumberList } from './AutoNumber_helperFunctions';
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
 * This API fetches the Learning Framework(s) linked to the project
 */
export const fetchProjectFigures = (elementType) => dispatch => {
    const url = getAPIUrl(elementType)
    axios.get(url, {
        headers: {
            "ApiKey": config.STRUCTURE_APIKEY,
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken
        }
    }).then(response => {
        if (response?.data?.contents) {
            const projectContent = response.data.contents
            let numberedElements = {
                imagesList: [],
                tablesList: [],
                equationsList: [],
                audiosList:[],
                videosList:[],
            }
            numberedElements = mediaElementAPI_Handler(projectContent, numberedElements);
            console.log('numberedElements>>>>', numberedElements)
            getAutoNumberSequence(numberedElements,dispatch)
            //autoNumberElementsIndex = setAutoNumberSequenceForElements(numberedElements, autoNumberElementsIndex)
            //console.log('autoNumberElementsIndex', autoNumberElementsIndex)
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
        console.log('Error in fetching list of figures in the project>>>> ', error)
        commonDispatch(dispatch, GET_ALL_AUTO_NUMBER_ELEMENTS, {})
    })

};

const setAutoNumberSequenceForElements = (numberedElements, autoNumberElementsIndex) => {
    for (let labelType in numberedElements) {
        if (Object.prototype.hasOwnProperty.call(numberedElements, labelType)) {
            const Obj = prepareAutoNumberList(numberedElements[labelType])
            autoNumberElementsIndex[autoNumber_IndexMapper[labelType]] = Obj
        }
    }
    return autoNumberElementsIndex
}

export const getAutoNumberSequence = (numberedElements, dispatch) => {
    let autoNumberElementsIndex = {}
    autoNumberElementsIndex = setAutoNumberSequenceForElements(numberedElements, autoNumberElementsIndex)
    console.log('autoNumberElementsIndex', autoNumberElementsIndex)
    dispatch({
        type: SET_AUTO_NUMBER_SEQUENCE,
        payload: {
            autoNumberElementsIndex
        }
    });
}

const getAPIUrl = (mediaType, containerEntityUrn) => {
    let endpointVersion = '',
        endpointExtension = ''
    switch (mediaType) {
        case AUTO_NUMBER_ELEMENTS.AUDIO:
            endpointVersion = 'v2'
            endpointExtension = 'audios'
            break;
        case AUTO_NUMBER_ELEMENTS.VIDEO:
            endpointVersion = 'v2'
            endpointExtension = 'videos'
            break;
        case AUTO_NUMBER_ELEMENTS.IMAGE:
        case AUTO_NUMBER_ELEMENTS.MATH_IMAGE:
        case AUTO_NUMBER_ELEMENTS.MATH_IMAGE:
        default:
            endpointVersion = 'v3'
            endpointExtension = 'images'
            break;
    }
    if (containerEntityUrn) {
        return `${config.ASSET_POPOVER_ENDPOINT}${endpointVersion}/${config.projectUrn}/containers/${containerEntityUrn}/${endpointExtension}`
    }
    return `${config.ASSET_POPOVER_ENDPOINT}${endpointVersion}/${config.projectUrn}/${endpointExtension}`
}

export const setTocContainersAutoNumberList = (autoNumberingDetails) => dispatch => {
    dispatch({
        type: GET_TOC_AUTO_NUMBERING_LIST,
        payload: autoNumberingDetails
    });
}

export const isAutoNumberEnabled = (flag) => dispatch => {
    return dispatch({
        type: SET_AUTO_NUMBER_TOGGLE,
        payload: {
            isAutoNumberingEnabled: flag
        }
    });
}


export const fetchContainerFigures = (containerEntityUrn) => dispatch => {
    axios.get(`${config.ASSET_POPOVER_ENDPOINT}v3/${config.projectUrn}/containers/${containerEntityUrn}/images`, {
        headers: {
            "ApiKey": config.STRUCTURE_APIKEY,
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken
        }
    }).then(response => {
        if (response?.data?.contents) {

        } else {
            dispatch({
                type: UPDATE_AUTO_NUMBER_ELEMENTS_LIST,
                payload: {}
            });
        }
    }).catch(error => {
        console.log('Error in fetching list of figures in the project>>>> ', error)
        dispatch({
            type: UPDATE_AUTO_NUMBER_ELEMENTS_LIST,
            payload: {}
        });
    })

};

export const commonDispatch = (dispatch, type, payload) => {
    dispatch({
        type: type,
        payload: payload
    });
}