import axios from 'axios';
import config from '../../config/config';
import mockdata from './../../appstore/mockdata';
import {
    FETCH_SLATE_DATA
} from '../../constants/Action_Constants';
import {fetchComments} from '../CommentsPanel/CommentsPanel_Action';

export const fetchSlateData = (manifestURN) => dispatch => {
	axios.get(`${config.REACT_APP_API_URL}v1/slate/content/${manifestURN}`, {
		headers: {
			"Content-Type": "application/json",
			"PearsonSSOSession": config.ssoToken
		}
	}).then(slateData => {   
		console.log("response============>",slateData.data[manifestURN])
		let contentUrn = slateData.data[manifestURN].contentUrn,
			title = slateData.data[manifestURN].contents.title.text
		//dispatch(fetchComments(contentUrn,title));
        dispatch({
        	type: FETCH_SLATE_DATA,
        	payload: {
				manifestURN: slateData.data
			}//slateData.data
        })
	})
};