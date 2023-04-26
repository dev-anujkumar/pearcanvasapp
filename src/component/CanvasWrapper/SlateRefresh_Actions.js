import config from '../../config/config'; 
import axios from 'axios';
import {
    fetchSlateData
} from '../CanvasWrapper/CanvasWrapper_Actions';
import { sendDataToIframe } from '../../constants/utility'; 
import { FETCH_DATA_ON_SLATE_REFRESH } from '../../constants/Action_Constants'

export const handleSlateRefresh = (id,cb) => (dispatch, getState) => { 
    let url = `${config.STRUCTURE_READONLY_ENDPOINT}container/v2/` + id
    
     axios.get(url,{ 
        headers: {
        "Content-Type": "application/json",
        'myCloudProxySession': config.myCloudProxySession
    }
    }).then((res) => {
        dispatch({
            type: FETCH_DATA_ON_SLATE_REFRESH,
            payload: {
                slateLevelData: {},
            }
        })
        config.figureDataToBeFetched = true;
        dispatch(fetchSlateData(config.slateManifestURN,config.slateEntityURN, 0,'',"slateRefresh"));
        sendDataToIframe({ 'type': 'slateRefreshStatus', 'message': {slateRefreshStatus : 'Refreshed, a moment ago'} });
        sendDataToIframe({ 'type': 'stopRefreshSpin', 'message': false }); 
        if(cb){
            cb();
        } 
        })
        .catch((err) => {
            sendDataToIframe({ 'type': 'stopRefreshSpin', 'message': false });      
        })
}
