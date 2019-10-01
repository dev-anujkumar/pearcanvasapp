import axios from 'axios';
import config from '../../config/config';
import {
    AUTHORING_ELEMENT_CREATED,
    VIDEO_ELEMENT_CREATED
    ,FIGURE_ELEMENT_CREATED,
    INTERACTIVE_ELEMENT_CREATED
} from '../../constants/Action_Constants';
import {elementAside,elementAsideWorkExample,elementWorkExample} from '../../../fixtures/elementAsideData';
import { sendDataToIframe } from '../../constants/utility.js';
import { HideLoader} from '../../constants/IFrameMessageTypes.js';

let headers = {
    "Content-Type": "application/json",
    ApiKey: "Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld",//STRUCTURE_APIKEY,
    PearsonSSOSession: config.ssoToken,
}
export const createElement = (type, index) => (dispatch, getState) => {
    config.currentInsertedIndex = index;
    let _requestData = {
        "projectUrn": config.projectUrn,
        "slateEntityUrn": config.slateEntityURN,
        "slateUrn": config.slateManifestURN,
        "index": index,
        "type": type
    };
    
     axios.post(`${config.REACT_APP_API_URL}v1/slate/element`,
        JSON.stringify(_requestData),
        {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        }
    ).then(createdElemData => {   
        sendDataToIframe({'type': HideLoader,'message': { status: false }})
        const parentData = getState().appStore.slateLevelData;
        const newParentData = JSON.parse(JSON.stringify(parentData));
        let createdElementData = createdElemData.data;
        if(type == "workedexample"){
            createdElementData = elementWorkExample
        }
     /*    if(type == "element-aside"){
            createdElementData = elementAside
        } */
        for (let key in newParentData) {
                newParentData[key].contents.bodymatter.splice(index, 0, createdElementData);
        }

        dispatch({
            type: AUTHORING_ELEMENT_CREATED,
            payload: {
                slateLevelData: newParentData
            }
        })

    }).catch(error => {
        
        console.log("create Api fail", error);
    }) 
};
