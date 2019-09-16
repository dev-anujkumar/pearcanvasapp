import axios from 'axios';
import config from '../../config/config';
import {
    AUTHORING_ELEMENT_CREATED,
} from '../../constants/Action_Constants';

export const createElement = (type, index) => (dispatch, getState) => {
    let _requestData = {
        "projectUrn": "urn:pearson:distributable:553615b2-57c9-4508-93a9-17c6909d5b44",
        "slateEntityUrn": "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75",
        "slateUrn": "urn:pearson:manifest:b94059f3-4592-4d84-a316-18d4ba05d734",
        "type": type,
        "index": index
    };

    axios.post(`${config.REACT_APP_API_URL}v1/authoredtext`,
        JSON.stringify(_requestData),
        {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        }
    ).then(createdElemData => {
        const parentData = getState().appStore.slateLevelData;
        const newParentData = JSON.parse(JSON.stringify(parentData));
        for (let key in newParentData) {
            //for (let k in newParentData[key]) {
                // newParentData[key][k].contents.bodymatter.splice(index, 0, createdElemData.data);
                newParentData[key].contents.bodymatter.splice(index, 0, createdElemData.data);
            //}
        }
        
        dispatch({
            type: AUTHORING_ELEMENT_CREATED,
            payload: {
                slateLevelData: newParentData
            }
        })

    })
};