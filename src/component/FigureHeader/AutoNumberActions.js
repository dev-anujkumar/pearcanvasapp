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
                equationsList: []
            }
            numberedElements = mediaElementAPI_Handler(projectContent, numberedElements).imagesList
            console.log('numberedElements>>>>', numberedElements)
            let autoNumberElementsIndex = {},autoNumberElementsCount={} 
            const elementKeys = autoNumber_KeyMapper[elementType]
            autoNumberElementsIndex = setAutoNumberSequenceForElements(elementKeys, numberedElements, autoNumberElementsIndex)
            const updatedIndexList = prepareAutoNumberList(numberedElements.imagesList)
            console.log('updatedIndexList', updatedIndexList)
            console.log('autoNumberElementsIndex', autoNumberElementsIndex)
            config.imageIndex = updatedIndexList
            dispatch({
                type: GET_ALL_AUTO_NUMBER_ELEMENTS,
                payload: {
                    numberedElements
                }
            });
        } else {
            commonDispatch(dispatch, GET_ALL_FIGURE_ELEMENTS, {})
        }
    }).catch(error => {
        console.log('Error in fetching list of figures in the project>>>> ', error)
        commonDispatch(dispatch, GET_ALL_FIGURE_ELEMENTS, {})
    })

};

const setAutoNumberSequenceForElements = (elementKeys, numberedElements, autoNumberElementsIndex) => {
    for (let labelType in numberedElements) {
        if (Object.prototype.hasOwnProperty.call(numberedElements, labelType)) {
            autoNumberElementsIndex[elementKeys.eleIndex] = prepareAutoNumberList(numberedElements[labelType])
        }
    }
    return autoNumberElementsIndex
}

const autoNumber_KeyMapper = {
    'IMAGE': { eleIndex: 'figureImageIndex', eleCount: 'figureImageCount' },
    'TABLE': { eleIndex: 'tableIndex', eleCount: 'tableCount' },
    'EQUATIONS': { eleIndex: 'equationsIndex', eleCount: 'equationsCount' },
}

const getAPIUrl = (mediaType, containerEntityUrn) => {
    let endpointVersion = '',
        endpointExtension = ''
    switch (mediaType) {
        case "AUDIO":
            endpointVersion = 'v2'
            endpointExtension = 'audios'
            break;
        case "VIDEO":
            endpointVersion = 'v2'
            endpointExtension = 'videos'
            break;
        case "TABLE_IMAGE":
        case "MATH_IMAGE":
        case "IMAGE":
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

export const isAutoNumberEnabled = (flag) => dispatch =>{
    dispatch({
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