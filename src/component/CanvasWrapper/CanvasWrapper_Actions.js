import axios from 'axios';
import config from '../../config/config';
import {
    FETCH_SLATE_DATA
} from '../../constants/Action_Constants';

export const fetchSlateData = () => dispatch => {
	axios.get(`${config.REACT_APP_API_URL}v2/slate/getContent/${config.slateURN}`, {
		headers: {
			"Content-Type": "application/json",
			"PearsonSSOSession": config.ssoToken
		}
	}).then(slateData => {        
        dispatch({
        	type: FETCH_SLATE_DATA,
        	payload: slateData
        })
	})
};