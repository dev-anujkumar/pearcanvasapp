import axios from 'axios';
import config from '../../config/config';
import mockdata from './../../appstore/mockdata';
import {
    FETCH_SLATE_DATA
} from '../../constants/Action_Constants';

export const fetchSlateData = (manifestURN) => dispatch => {
	axios.get(`${config.REACT_APP_API_URL}v1/slate/content/${manifestURN}`, {
		headers: {
			"Content-Type": "application/json",
			"PearsonSSOSession": config.ssoToken
		}
	}).then(slateData => {   
        dispatch({
        	type: FETCH_SLATE_DATA,
			payload: {
				[manifestURN]: mockdata[manifestURN]
			}//slateData.data
        })
	})
};