import axios from 'axios';
import config from '../../config/config';
import { HideLoader } from '../../constants/IFrameMessageTypes.js';
import { sendDataToIframe } from '../../constants/utility.js';

import { ADD_COMMENT, DELETE_ELEMENT, AUTHORING_ELEMENT_CREATED, ADD_NEW_COMMENT } from "./../../constants/Action_Constants";
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

    let Comment = {
        commentType: "comment",
        commentDateTime: new Date().toISOString(),   //"2019-04-09T14:22:28.218Z"
        commentAssignee: config.userId,
        commentCreator: config.userId,
        commentString: commentString,
        commentStatus: "OPEN",
        commentOnEntity: elementId,
        replyComments: []
    }
    newComment = JSON.stringify(newComment);
    return axios.post(url, newComment,
        { headers: headers }
    )
        .then(response => {
            sendDataToIframe({ 'type': HideLoader, 'message': { status: false } });
            const parentData = getState().appStore.slateLevelData;
            const newslateData = JSON.parse(JSON.stringify(parentData));
            let _slateObject = Object.values(newslateData)[0];
            // let _finalSlateObject = Object.values(_slateObject)[0];
            let { contents: _slateContent } = _slateObject;
            // let { contents: _slateContent } = _slateObjects;
            let { bodymatter: _slateBodyMatter } = _slateContent;
            const element = _slateBodyMatter.map(element => {
                if (element.id === elementId) {
                    element['comments'] = true
                }
            }
            );
            dispatch({
                type: ADD_COMMENT,
                payload: newslateData
            });
            dispatch({
                type: ADD_NEW_COMMENT,
                payload: Comment
            });

        }).catch(error => {
            console.log("Failed to add comment", error);
        })
}


export const deleteElement = (elmId, type, parentUrn,asideData) => (dispatch, getState) => {
    let _requestData = {
        "projectUrn": config.projectUrn,
        "entityUrn": parentUrn ? parentUrn.contentUrn : config.slateEntityURN,
        "workUrn": elmId
    };
    axios.post(`${config.REACT_APP_API_URL}v1/slate/deleteElement`,
        JSON.stringify(_requestData),
        {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        }
    ).then(deleteElemData => {
        if (deleteElemData.status === 200) {
            sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
            const parentData = getState().appStore.slateLevelData;
            const newParentData = JSON.parse(JSON.stringify(parentData));
            /*    for (let i = 0; i < newParentData[config.slateManifestURN].contents.bodymatter.length; i++) {
                   let workUrn = newParentData[config.slateManifestURN].contents.bodymatter[i].id;
                   if (workUrn === elmId) {
                       newParentData[config.slateManifestURN].contents.bodymatter.splice(i, 1);
                   }
               } */
            let bodymatter = newParentData[config.slateManifestURN].contents.bodymatter
            bodymatter.forEach((element, index) => {
                if (element.id === elmId) {
                    bodymatter.splice(index, 1);
                } else if (parentUrn && parentUrn.elementType == "element-aside") {
                    if (element.id === parentUrn.manifestUrn) {
                        element.elementdata.bodymatter.forEach((ele, indexInner) => {
                            if (ele.id === elmId) {
                                element.elementdata.bodymatter.splice(indexInner, 1);
                            }
                        })
                    }
                    } else if (parentUrn && parentUrn.elementType == "manifest") {
                        if (element.id === asideData.id) {
                            element.elementdata.bodymatter.forEach((ele) => {
                                if (ele.id == parentUrn.manifestUrn) {
                                    ele.contents.bodymatter.forEach((el, indexInner) => {
                                        if (el.id === elmId) {
                                            ele.contents.bodymatter.splice(indexInner, 1);
                                        }
                                    })
                                }

                            })
                        }
                    }
                
            })

            dispatch({
                type: AUTHORING_ELEMENT_CREATED,
                payload: {
                    slateLevelData: newParentData
                }
            })
        }

    }).catch(error => {
        console.log("delete Api fail", error);
    })
}

export const updateElement = (updatedData) => {
    axios.post(`${config.REACT_APP_API_URL}v1/slate/element`,
        JSON.stringify(updatedData),
        {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        }
    ).then(response =>{
        console.log("response from update API",response)
    }).catch(error => {
        console.log("updateElement Api fail", error);
    }) 
}
