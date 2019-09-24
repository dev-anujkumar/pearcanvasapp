import axios from 'axios';
import config from '../../config/config';
import { HideLoader} from '../../constants/IFrameMessageTypes.js';
import { sendDataToIframe } from '../../constants/utility.js';
import { ADD_COMMENT, DELETE_ELEMENT } from "./../../constants/Action_Constants";
let headers = {
    "Content-Type": "application/json",
    ApiKey: "Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld",//STRUCTURE_APIKEY,
    PearsonSSOSession: config.ssoToken,

}
export const addComment = (commentString, elementId) => (dispatch, getState) => {
    let url = `${config.STRUCTURE_API_URL}/narrative/v2/${elementId}/comment/`
    let newComment = {
        comment: commentString,
        commentCreator: config.userId,
        assignee: config.assignee
    };
    newComment = JSON.stringify(newComment);
    return axios.post(url, newComment,
        { headers: headers }
    )
        .then(response => {
            
            const parentData = getState().appStore.slateLevelData;
            const newslateData = JSON.parse(JSON.stringify(parentData));
            let _slateObject = Object.values(newslateData)[0];
            // let _finalSlateObject = Object.values(_slateObject)[0];
            let { contents: _slateContent } = _slateObject;
            // let { contents: _slateContent } = _slateObjects;
            let { bodymatter: _slateBodyMatter } = _slateContent;
            for (let key in _slateBodyMatter) {
                if (_slateBodyMatter[key].id.toString() === elementId) {
                    _slateBodyMatter[key].comments = true
                }
            }
            dispatch({
                type: ADD_COMMENT,
                payload: newslateData
            });

        }).catch(error => {
            console.log("Failed to add comment", error);
        })
}


export const deleteElement = (id, type) => (dispatch, getState) => {
    console.log("deleteElement >> ")
    setTimeout(() => {
        sendDataToIframe({'type': HideLoader,'message': { status: false }})
        // dispatch({
        //     type: DELETE_ELEMENT,
        //     payload: {}
        // });
    }, 1000);
}