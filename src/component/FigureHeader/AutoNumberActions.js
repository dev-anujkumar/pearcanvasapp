import config from '../../config/config.js';
import axios from 'axios';
import { getContentInFMandBM, getContentInBodyMatter } from './mediaElementDataMapper.js';
import {
    SET_AUTO_NUMBER_TOGGLE,
    GET_ALL_FIGURE_ELEMENTS,
    GET_TOC_AUTO_NUMBERING_LIST
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
 export const fetchProjectFigures = () => dispatch => {
    axios.get(`${config.ASSET_POPOVER_ENDPOINT}v4/${config.projectUrn}/images`, {
        headers: {
            "ApiKey": config.STRUCTURE_APIKEY,
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken
        }
    }).then(response => {
        if (response?.data?.numberOfImages > 0) {
            const projectContent = response.data.contents
            let imagesData = {}
            if (projectContent['frontMatter']?.length > 0) {
                imagesData = getContentInFMandBM(projectContent, 'frontMatter', imagesData)
            }
            if (projectContent['backMatter']?.length > 0) {
                imagesData = getContentInFMandBM(projectContent, 'backMatter', imagesData)
            }
            if (projectContent['bodyMatter']?.length > 0) {
                getContentInBodyMatter(projectContent['bodyMatter'], imagesData)
            }

            if(Object.values(imagesData)?.length > 0){
                Object.values(imagesData)[0][0] = {
                    ... (Object.values(imagesData)[0][0]),
                    "numberedandlabel": true,
                }
                Object.values(imagesData).forEach((imgArray, index) => {
                    imgArray = imgArray?.map(img => {
                        img["numberedandlabel"] = true
                        img["displayedlabel"] = "Figure"
                        return img
                    })
                    if (index === 2) {
                        imgArray[0]["manualoverride"] = { "overridenumbervalue": "2A",
                        "overridelabelvalue": "Illustration" }
                    }
                    if (index === 4) {
                        imgArray[0]["numberedandlabel"] = false
                    }
                    if (index === 3) {
                        imgArray[0]["manualoverride"] = { "resumenumbervalue": 40 }
                    }
                })
            }
            console.log('imagesData>>>>', imagesData)
            const updatedIndexList = prepareAutoNumberList(imagesData)
            console.log('updatedIndexList', updatedIndexList)
            config.imageIndex = updatedIndexList
            dispatch({
                type: GET_ALL_FIGURE_ELEMENTS,
                payload: {
                    images: imagesData
                }
            });
        } else {
            dispatch({
                type: GET_ALL_FIGURE_ELEMENTS,
                payload: {}
            });
        }
    }).catch(error => {
        console.log('Error in fetching list of figures in the project>>>> ', error)
        dispatch({
            type: GET_ALL_FIGURE_ELEMENTS,
            payload: {}
        });
    })

};

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
        if (response?.data?.numberOfImages > 0) {
        //     const projectContent = response.data.contents
        //     let imagesData = {}
        //     if (projectContent['bodyMatter']?.length > 0) {
        //         getContentInBodyMatter(projectContent['bodyMatter'], imagesData)
        //     }
        //    console.log('imagesData>>>>', imagesData)
        //     const updatedIndexList = prepareAutoNumberList(imagesData)
        //     console.log('updatedIndexList', updatedIndexList)
        //     config.imageIndex = updatedIndexList
        //     dispatch({
        //         type: GET_ALL_FIGURE_ELEMENTS,
        //         payload: {
        //             images: imagesData
        //         }
        //     });
        } else {
            dispatch({
                type: GET_ALL_FIGURE_ELEMENTS,
                payload: {}
            });
        }
    }).catch(error => {
        console.log('Error in fetching list of figures in the project>>>> ', error)
        dispatch({
            type: GET_ALL_FIGURE_ELEMENTS,
            payload: {}
        });
    })

};
