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
 * This API fetches the Learning Framework(s) linked to the project
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
            // const projectContent = response.data;
            const projectContent = {
                "audios": [],
                "equations": [],
                "figures": [],
                "tables": [],
                "videos": [],
                "asides": [],
                "workedExamples": [],
                "interactives": [
                  {
                  
                    "contentUrn": "urn:pearson:entity:314209cf-5f87-4bce-b32b-91675cc29139",
                    "displayedlabel": "Interactive",
                    "figureType": "interactive",
                    "numberedandlabel": true,
                    "slateEntityUrn": "urn:pearson:entity:7d1c2abe-e39a-4d61-b0fe-3fe6c3717746",
                    "type": "figure",
                    "title": "Figure SmartLink",
                    "versionUrn": "urn:pearson:work:b9fdf2b2-2c32-494e-b2ec-970d4370faf9"
                  },
                   {
                  
                    "contentUrn": "urn:pearson:entity:df9a0ef8-36c5-4c14-9714-728b08fbfac0",
                    "displayedlabel": "Interactive",
                    "figureType": "interactive",
                    "numberedandlabel": true,
                    "slateEntityUrn": "urn:pearson:entity:7d1c2abe-e39a-4d61-b0fe-3fe6c3717746",
                    "type": "figure",
                    "title": "Elm-Interactive",
                    "versionUrn": "urn:pearson:work:d19b07e5-690d-4877-b9dd-2d8167ac7f2b"
                  },
                  {
                  
                    "contentUrn": "urn:pearson:entity:3ef923b9-ab1f-4cf1-98b7-19becac2199c",
                    "displayedlabel": "Interactive",
                    "figureType": "interactive",
                    "numberedandlabel": true,
                    "slateEntityUrn": "urn:pearson:entity:7d1c2abe-e39a-4d61-b0fe-3fe6c3717746",
                    "type": "figure",
                    "title": "Quad_Interactive",
                    "versionUrn": "urn:pearson:work:3c3e535d-98f8-41be-83a1-d52563fb4b66"
                  }
                  
                ]
              }
            let numberedElements = {}
            numberedElements = getNumberedElements(projectContent);
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
    autoNumberElementsIndex = setAutoNumberSequenceForElements(numberedElements, autoNumberElementsIndex);
    dispatch({
        type: SET_AUTO_NUMBER_SEQUENCE,
        payload: {
            autoNumberElementsIndex
        }
    });
}

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
    let url = `${config.REACT_APP_API_URL}/v1/project/${config.projectUrn}/sectionType/${matterType}`;
    if(matterType === "bodymatter"){
        url = `${url}?contentUrn=${containerEntityUrn}`;
    }

    return "https://10.11.7.24:8081/cypress-api/v1/project/urn:pearson:distributable:f9edcedf-13b7-4971-8392-917d301e177a/sectionType/frontmatter"; //url;
}

// const getAPIUrl = (mediaType, containerEntityUrn) => {
//     let endpointVersion = '',
//         endpointExtension = ''
//     switch (mediaType) {
//         case AUTO_NUMBER_ELEMENTS.AUDIO:
//             endpointVersion = 'v2'
//             endpointExtension = 'audios'
//             break;
//         case AUTO_NUMBER_ELEMENTS.VIDEO:
//             endpointVersion = 'v2'
//             endpointExtension = 'videos'
//             break;
//         case AUTO_NUMBER_ELEMENTS.INTERACTIVES:
//             endpointVersion = 'v3'
//             endpointExtension = 'interactives'
//             break;
//         case AUTO_NUMBER_ELEMENTS.IMAGE:
//         case AUTO_NUMBER_ELEMENTS.MATH_IMAGE:
//         case AUTO_NUMBER_ELEMENTS.MATH_IMAGE:
//         default:
//             endpointVersion = 'v3'
//             endpointExtension = 'images'
//             break;
//     }
//     if (containerEntityUrn) {
//         return `${config.ASSET_POPOVER_ENDPOINT}${endpointVersion}/${config.projectUrn}/containers/${containerEntityUrn}/${endpointExtension}`
//     }
//     return `${config.ASSET_POPOVER_ENDPOINT}${endpointVersion}/${config.projectUrn}/${endpointExtension}`
// }

export const setTocContainersAutoNumberList = (autoNumberingDetails) => dispatch => {
    dispatch({
        type: GET_TOC_AUTO_NUMBERING_LIST,
        payload: autoNumberingDetails
    });
}

export const isAutoNumberEnabled = (flag, configValue) => dispatch => {
    return dispatch({
        type: SET_AUTO_NUMBER_TOGGLE,
        payload: {
            isAutoNumberingEnabled: true//flag && configValue
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

export const getSlateLevelData = async (manifestURN, entityURN) => {

    let apiUrl = `${config.REACT_APP_API_URL}v1/slate/content/${config.projectUrn}/${entityURN}/${manifestURN}`
    await axios.get(apiUrl, {
        headers: {
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken
        }
    }).then(async res => {
        const slateData = Object.values(res.data)[0];
        console.log('slateData',slateData)
        return await slateData.contents.bodymatter
    }).catch((err) => {
        return []
    })
}

 */