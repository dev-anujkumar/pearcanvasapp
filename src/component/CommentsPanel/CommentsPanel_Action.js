import axios from 'axios';
import config from '../../config/config';
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
    ERROR_POPUP
} from '../../constants/Action_Constants';


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
            "PearsonSSOSession": config.ssoToken
        }
    }).then(response => {
        dispatch({
            type: FETCH_COMMENTS,
            payload: { comments: response.data.comments, title }
        })
        let searchString = window.location.search;
        let q = new URLSearchParams(searchString);
        if(q.get('q')){
            let currentWorkId = q.get('q');
            dispatch({
                type: TOGGLE_COMMENTS_PANEL,
                payload: true
            })
            dispatch({
                type: FETCH_COMMENT_BY_ELEMENT,
                payload: {
                    elementId: currentWorkId,
                    index: 0
                }
            })
            //Replaces to the original URL to prevent multiple panel toggle
            window.history.replaceState(null, null, `/toc-wrapper/index.html?projectUrn=${config.projectUrn}&entityUrn=${config.projectEntityUrn}`);
        }
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
    let url = `${config.STRUCTURE_API_URL}narrative-api/v2/${elementId}/comment/${commentUrn}/reply/`
    return axios.post(url, replyDataToSend,
        {
            headers: {
                "Content-Type": "application/json",
                ApiKey: config.STRUCTURE_APIKEY,
                PearsonSSOSession: config.ssoToken
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
            dispatch({type: ERROR_POPUP, payload:{show: true}})
            //console.log("Failed to add reply", error);
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
    let url = `${config.STRUCTURE_API_URL}narrative-api/v2/${elementId}/comment/${commentUrn}/Status/`
    return axios.put(url, request,
        {
            headers: {
                "Content-Type": "application/json",
                ApiKey: config.STRUCTURE_APIKEY,
                PearsonSSOSession: config.ssoToken
            }
        }
    )
        .then(response => {
            dispatch({
                type: RESOLVE_COMMENT,
                payload: { commentUrn, resolveOrOpen }
            });

        }).catch(error => {
            dispatch({type: ERROR_POPUP, payload:{show: true}})
            //console.log("status update fail", error);
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
    let url = `${config.STRUCTURE_API_URL}narrative-api/v2/${elementId}/comment/${commentUrn}/Status/`
    return axios.put(url, request,
        {
            headers: {
                "Content-Type": "application/json",
                ApiKey: config.STRUCTURE_APIKEY,
                PearsonSSOSession: config.ssoToken
            }
        }
    ).then(response => {
        dispatch({
            type: UPDATE_COMMENT,
            payload: { commentUrn, updateComment: updateCommentParams.comment }
        });
    }).catch(error => {
        dispatch({type: ERROR_POPUP, payload:{show: true}})
        //console.log("status update fail", error);
    })
};

/**
 * 
 *@discription - This function is to get detail of all project users  
  @param {String} commentUrn - Comment urn of comment to reply
*/

export const getProjectUsers = () => dispatch => {
    let ENTITY_URN = config.projectEntityUrn
    let url = `${config.JAVA_API_URL}v2/dashboard/ProjectUserInfo/${ENTITY_URN}`
    return axios.get(url,
        {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        }).then(response => {
            dispatch({
                type: GET_PROJECT_USER,
                payload: response.data
            });
        }).catch(error => {
            //console.log("error while getting user", error);
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
    let url = `${config.STRUCTURE_API_URL}narrative-api/v2/${elementId}/comment/${commentUrn}/Assignee/`
    let req = {
        assignee: newAssignee
    };
    return axios.put(url, req, {
        headers: {
            "Content-Type": "application/json",
            ApiKey: config.STRUCTURE_APIKEY,
            PearsonSSOSession: config.ssoToken
        }
    }).then(response => {
        dispatch({
            type: UPDATE_ASSIGNEE,
            payload: { commentUrn, newAssignee: newAssignee }
        });
    }).catch(error => {
        dispatch({type: ERROR_POPUP, payload:{show: true}})
        //console.log("error while updating user", error);
    })

}

/**
 * 
 *@discription - This function is to delete the comment of the project 
  @param {String} commentUrn - Comment urn of comment to reply
  @param {String} elementId -elementId of the element
*/

export const deleteComment = (commentUrn, elementId) => (dispatch, getState) => {
    let url = `${config.REACT_APP_API_URL}v2/narrative/container/${elementId}/comment/${commentUrn}`
    return axios.delete(url,
        {
            headers: {
                "Content-Type": "application/json",
                PearsonSSOSession: config.ssoToken
            }
        }).then(response => { 
            dispatch({
                type: DELETE_COMMENT,
                payload: commentUrn
            });
        }).catch(error => {
            dispatch({type: ERROR_POPUP, payload:{show: true}})
            console.log("error while deleting user", error);
        })

}
