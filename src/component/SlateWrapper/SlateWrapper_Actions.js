import axios from 'axios';
import config from '../../config/config';
import {
    AUTHORING_ELEMENT_CREATED,
} from '../../constants/Action_Constants';

export const createElement = (type, index) => dispatch => {
    let _requestData = {
        "projectUrn" : "urn:pearson:distributable:553615b2-57c9-4508-93a9-17c6909d5b44",
        "slateEntityUrn" : "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75",
        "slateUrn" : "urn:pearson:manifest:b94059f3-4592-4d84-a316-18d4ba05d734",
        "type": type,
        "index" : index
    };
    axios.post(`${config.REACT_APP_API_URL}v1/create/authoredtext`, 
        JSON.stringify(_requestData),
        {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        }
	).then(createdElemData => {
        dispatch({
        	type: AUTHORING_ELEMENT_CREATED,
        	payload: {
				authoringData: createdElemData.data
			}
        })
	})
};