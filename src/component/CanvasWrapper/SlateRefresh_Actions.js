import {
    REFRESH_SLATE,
    UPDATE_STATUS_REFRESH_SLATE
} from '../../constants/Action_Constants';
import config from '../../config/config'; 
import axios from 'axios';
import {
    fetchSlateData
} from '../CanvasWrapper/CanvasWrapper_Actions';
import { sendDataToIframe } from '../../constants/utility'; 

export const slateUpdateContent = (value) => (dispatch, getState) => {
    dispatch({
        type: REFRESH_SLATE,
        payload: value
    })
}

export const updateRefreshStatus = (value) => (dispatch, getState) => {
    dispatch({
        type: UPDATE_STATUS_REFRESH_SLATE,
        payload: value
    })
}

export const handleSlateRefresh = (id) => (dispatch, getState) => { 
    let url = `https://contentapis-qa.pearsoncms.net/structure-api/container/v2/${id}`
    
     axios.get(url,{ 
        headers: {
        "Content-Type": "application/json",
        "PearsonSSOSession": config.ssoToken
    }
    }).then((res) => {
        dispatch(fetchSlateData(id)); 
        sendDataToIframe({ 'type': 'stopRefreshSpin', 'message': false });  
        })
        .catch((err) => {
            sendDataToIframe({ 'type': 'stopRefreshSpin', 'message': false });      
        })
}
