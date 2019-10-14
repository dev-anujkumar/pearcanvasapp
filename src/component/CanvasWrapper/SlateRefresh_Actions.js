import config from '../../config/config'; 
import axios from 'axios';
import {
    fetchSlateData
} from '../CanvasWrapper/CanvasWrapper_Actions';
import { sendDataToIframe } from '../../constants/utility'; 

export const handleSlateRefresh = (id) => (dispatch, getState) => { 
    let url = `https://contentapis-qa.pearsoncms.net/structure-api/container/v2/${id}`
    
     axios.get(url,{ 
        headers: {
        "Content-Type": "application/json",
        "PearsonSSOSession": config.ssoToken
    }
    }).then((res) => {
        dispatch(fetchSlateData(id)); 
        sendDataToIframe({ 'type': 'slateRefreshStatus', 'message': {slateRefreshStatus : 'Refreshed a moment ago'} });
        sendDataToIframe({ 'type': 'stopRefreshSpin', 'message': false });  
        })
        .catch((err) => {
            sendDataToIframe({ 'type': 'stopRefreshSpin', 'message': false });      
        })
}
