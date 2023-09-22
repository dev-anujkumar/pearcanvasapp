import axios from 'axios';
import config from '../../config/config';
import { sendDataToIframe } from '../../constants/utility.js'
import {
    TOGGLE_COMMENTS_PANEL,
    FETCH_COMMENTS,
    REPLY_COMMENT,
    FETCH_COMMENT_BY_ELEMENT,
    RESOLVE_COMMENT,
    TOGGLE_REPLY,
    UPDATE_COMMENT,
    GET_PROJECT_USER,
    UPDATE_ASSIGNEE,
    DELETE_COMMENT,
    ERROR_POPUP,
    UPDATE_ROLE,
    ADD_NEW_COMMENT
} from '../../constants/Action_Constants';

export const addNewComment = (payload) => ({
    type: ADD_NEW_COMMENT,
    payload
});


export const deleteComment = (payload) => ({
    type: DELETE_COMMENT,
    payload
});


/**
 * 
 *@discription - This function is to fetchComments of the element called in slate wrapper action
  @param {String} contentUrn - content urn of slate 
  @param {String} title - Title of the slate 
*/
export const fetchComments = (contentUrn, title) => dispatch => {
    let projectUrn = config.projectUrn,
        url = `${config.REACT_APP_API_URL}v1/narrative/${projectUrn}/aggregatedComments/container/${contentUrn}`
    return axios.get(url, {
        headers: {
            "Content-Type": "application/json",
            'myCloudProxySession': config.myCloudProxySession
        }
    }).then(response => {
        dispatch({
            type: FETCH_COMMENTS,
            payload: { comments: response.data.comments, title }
        })
        sendDataToIframe({
            'type': 'aggregatedCommentsData', 'message': {
                commentsData: response.data.comments,
                contentUrn
            }
        });

    }).catch(error => {
        console.log("failed to fetch comment", error);
    })
};

/**
 * 
 *@discription - This function is to fetchComments of the element 
  @param {String} elemenetId - elemenetId of element 
*/
export const fetchCommentByElement = (elementId, index) => dispatch => {
    return dispatch({
        type: FETCH_COMMENT_BY_ELEMENT,
        payload: {
            elementId: elementId,
            index: index
        }
    })
};

/**
 * 
 *@discription - This function is to toggle comments panel when click on button 
  @param {String} toggle - value true or false
*/

export const toggleCommentsPanel = (toggle) => dispatch => {
    dispatch({
        type: TOGGLE_COMMENTS_PANEL,
        payload: toggle
    })
};

/**
 * 
 *@discription - This function is to toggle reply component when click on reply button in comments panel 
  @param {String} toggle - value true or false
*/
export const toggleReply = (toggle) => dispatch => {
    dispatch({
        type: TOGGLE_REPLY,
        payload: toggle
    })
};

/**
 * 
 *@discription - This function is to save reply comment 
  @param {String} commentUrn - Comment urn of comment to reply
  @param {String} reply - reply comment
  @param {String} elementId - Element id of the element
*/

export const replyComment = (commentUrn, reply, elementId) => dispatch => {
    let replyDataToSend = {
        comment: reply.commentString,
        commentCreator: reply.commentCreator
    };
    let url = `${config.NARRATIVE_API_ENDPOINT}v2/${elementId}/comment/${commentUrn}/reply/`
    return axios.post(url, replyDataToSend,
        {
            headers: {
                "Content-Type": "application/json",
                ApiKey: config.STRUCTURE_APIKEY,
                'myCloudProxySession': config.myCloudProxySession
            }
        }
    )
        .then(response => {
            dispatch({
                type: REPLY_COMMENT,
                payload: {
                    commentUrn,
                    reply,
                    toggleReplyForm: false
                }
            });

        }).catch(error => {
            dispatch({ type: ERROR_POPUP, payload: { show: true } })
        })
};

/**
 * 
 *@discription - This function is to resolveComment  
  @param {String} commentUrn - Comment urn of comment to reply
  @param {String} resolveOrOpen - reply comment
  @param {String} elementId - Element id of the element
*/
export const resolveComment = (commentUrn, resolveOrOpen, elementId) => dispatch => {

    let request = {
        status: resolveOrOpen
    };
    let url = `${config.NARRATIVE_API_ENDPOINT}v2/${elementId}/comment/${commentUrn}/Status/`
    return axios.put(url, request,
        {
            headers: {
                "Content-Type": "application/json",
                ApiKey: config.STRUCTURE_APIKEY,
                'myCloudProxySession': config.myCloudProxySession
            }
        }
    )
        .then(response => {
            dispatch({
                type: RESOLVE_COMMENT,
                payload: { commentUrn, resolveOrOpen }
            });

        }).catch(error => {
            dispatch({ type: ERROR_POPUP, payload: { show: true } })
        })
};

/**
 * 
 *@discription - This function is to updateComment  
  @param {String} commentUrn - Comment urn of comment to reply
  @param {String} updateComment - update comment when click on edit
  @param {String} elementId - Element id of the element
*/

export const updateComment = (commentUrn, updateCommentParams, elementId) => dispatch => {

    let request = updateCommentParams
    let url = `${config.NARRATIVE_API_ENDPOINT}v2/${elementId}/comment/${commentUrn}/Status/`
    return axios.put(url, request,
        {
            headers: {
                "Content-Type": "application/json",
                ApiKey: config.STRUCTURE_APIKEY,
                'myCloudProxySession': config.myCloudProxySession
            }
        }
    ).then(response => {
        dispatch({
            type: UPDATE_COMMENT,
            payload: { commentUrn, updateComment: updateCommentParams.comment }
        });
    }).catch(error => {
        dispatch({ type: ERROR_POPUP, payload: { show: true } })
    })
};

/**
 * 
 *@discription - This function is to get detail of all project users  
  @param {String} commentUrn - Comment urn of comment to reply
*/

export const getProjectUsers = () => dispatch => {
    let ENTITY_URN = config.projectEntityUrn
    let url = `${config.JAVA_API_URL}v2/dashboard/projectUserInfo/${ENTITY_URN}`
    return axios.get(url,
        {
            headers: {
                "Content-Type": "application/json",
                'myCloudProxySession': config.myCloudProxySession
            }
        }).then(response => {
            dispatch({
                type: GET_PROJECT_USER,
                payload: response.data
            });
        }).catch(error => {
            
        })
}

/**
 * 
 *@discription - This function is to Update the assignee of the project 
  @param {String} commentUrn - Comment urn of comment to reply
  @param {String} newAssignee -Name of the new assignee in the project
  @param {String} elementId -elementId of the element
*/

export const updateAssignee = (commentUrn, newAssignee, elementId) => dispatch => {
    let url = `${config.NARRATIVE_API_ENDPOINT}v2/${elementId}/comment/${commentUrn}/Assignee/`
    let req = {
        assignee: newAssignee
    };
    return axios.put(url, req, {
        headers: {
            "Content-Type": "application/json",
            ApiKey: config.STRUCTURE_APIKEY,
            'myCloudProxySession': config.myCloudProxySession
        }
    }).then(response => {
        dispatch({
            type: UPDATE_ASSIGNEE,
            payload: { commentUrn, newAssignee: newAssignee }
        });
    }).catch(error => {
        dispatch({ type: ERROR_POPUP, payload: { show: true } })
    })

}


export const updateRole = (commentUrn, newRole, elementId) => dispatch => {
    let url = `${config.NARRATIVE_API_ENDPOINT}narrative/v1/comment/role`
    let req = {
        "commentUrn": commentUrn,
        "entityUrn": elementId,
        "role": newRole
    };
    return axios.put(url, req, {
        headers: {
            "Content-Type": "application/json",
            ApiKey: config.STRUCTURE_APIKEY,
            'myCloudProxySession': config.myCloudProxySession
        }
    }).then(response => {
        dispatch({
            type: UPDATE_ROLE,
            payload: { commentUrn, newRole: newRole }
        });
    }).catch(error => {
        dispatch({ type: ERROR_POPUP, payload: { show: true } })
    })

}
