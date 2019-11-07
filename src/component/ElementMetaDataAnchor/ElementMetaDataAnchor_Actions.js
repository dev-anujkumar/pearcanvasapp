import axios from 'axios';
import config from '../../config/config';
import {
    AUTHORING_ELEMENT_CREATED,
    SWAP_ELEMENT,
    SET_SPLIT_INDEX
} from '../../constants/Action_Constants';
import { sendDataToIframe } from '../../constants/utility.js';
import { HideLoader,NextSlate} from '../../constants/IFrameMessageTypes.js';

export const currentSlateLO = (currentSlateLOData) =>  (dispatch, getState) => {
    return dispatch({
        type: 'CURRENT_SLATE_LO_DATA',
        payload: {
            currentSlateLOData: currentSlateLOData,
        }
    })
}
export const isLOExist = (message) =>  (dispatch, getState) => {
    if(message && ((message.loObj && message.loObj.id)|| message.loUrn)){
        return dispatch({
            type: 'SLATE_TAG_ENABLE',
            payload: true
        })
    }
    else if (message.toastData === "Learning Objectives has been unlinked ") {
        return dispatch({
            type: 'SLATE_TAG_ENABLE',
            payload:  false
        })
    }
    else{
        return dispatch({
            type: 'SLATE_TAG_ENABLE',
            payload:  false
        })
    }
}
export const setCurrentModule = (moduleName) => (dispatch, getState) => {
    dispatch({
        type: 'SHOW_MODULE_NAME',
        payload: moduleName
    })
}
