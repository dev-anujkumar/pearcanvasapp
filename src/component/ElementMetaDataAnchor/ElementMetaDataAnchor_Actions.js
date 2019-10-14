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