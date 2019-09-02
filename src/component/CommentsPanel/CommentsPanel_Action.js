import axios from 'axios';
import config from '../../config/config';
import {
    TOGGLE_COMMENTS_PANEL,
    FETCH_COMMENTS
} from '../../constants/Action_Constants';

export const fetchComments = () => dispatch => {

    let req = ['urn:pearson:work:30ccc316-b39e-474f-9ce6-36d2c1730c05']
	axios.post(`${config.STRUCTURE_API_URL}narrative/v2/bulkCommentRetrieve`, req , {
		headers: {
            "Content-Type": "application/json",
            "ApiKey":'Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld',
			"PearsonSSOSession": 'u672-ILtO3lhAt84gMukQVtvfdo.*AAJTSQACMDIAAlNLABxmaTY1Sy8xT1I3Z0d1VmQ1d2FaWnRVY0RoVnc9AAJTMQACMTA.*'//config.ssoToken
		}
	}).then(response => {   
        console.log("response======>",response )
        dispatch({
        	type: FETCH_COMMENTS,
        	payload: response.data
        })
	})
};

export const toggleCommentsPanel = (toggle) => dispatch => {

        dispatch({
        	type: TOGGLE_COMMENTS_PANEL,
        	payload: toggle
        })
};

