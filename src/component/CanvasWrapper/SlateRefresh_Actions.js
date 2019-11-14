import config from '../../config/config'; 
import axios from 'axios';
import {
    fetchSlateData
} from '../CanvasWrapper/CanvasWrapper_Actions';
import { sendDataToIframe } from '../../constants/utility'; 
import { FETCH_DATA_ON_SLATE_REFRESH } from '../../constants/Action_Constants'

export const handleSlateRefresh = (id) => (dispatch, getState) => { 
    let url = config.SLATE_REFRESH_URL + id
    
     axios.get(url,{ 
        headers: {
        "Content-Type": "application/json",
        "PearsonSSOSession": config.ssoToken
    }
    }).then((res) => {
        dispatch({
            type: FETCH_DATA_ON_SLATE_REFRESH,
            payload: {
                slateLevelData: {},
            }
        })
        dispatch(fetchSlateData(id)); 
        sendDataToIframe({ 'type': 'slateRefreshStatus', 'message': {slateRefreshStatus : 'Refreshed a moment ago'} });
        sendDataToIframe({ 'type': 'stopRefreshSpin', 'message': false });  
        })
        .catch((err) => {
            sendDataToIframe({ 'type': 'stopRefreshSpin', 'message': false });      
        })
}
