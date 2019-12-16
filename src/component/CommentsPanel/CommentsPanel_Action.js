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
    AUTHORING_ELEMENT_UPDATE
} from '../../constants/Action_Constants';


/**
 * 
 *@discription - This function is to fetchComments of the element called in slate wrapper action
  @param {String} contentUrn - content urn of slate 
  @param {String} title - Title of the slate 
*/
export const fetchComments = (contentUrn, title) => dispatch => {
    let projectUrn = config.projectUrn,
        url = `${config.JAVA_API_URL}v1/narrative/v2/${projectUrn}/aggregatedComments/container/${contentUrn}`
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
            payload: { commentUrn, updateComment: updateComment.comment }
        });
    }).catch(error => {
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
    let url = `${config.JAVA_API_URL}v1/structure/dashboard/ProjectUserInfo/${ENTITY_URN}`
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
    let url = `${config.JAVA_API_URL}v2/narrative/container/${elementId}/comment/${commentUrn}`
    return axios.delete(url,
        {
            headers: {
                "Content-Type": "application/json",
                PearsonSSOSession: config.ssoToken
            }
        }).then(response => {
            const parentData = getState().appStore.slateLevelData;
            const newParentData = JSON.parse(JSON.stringify(parentData));
            let newBodymatter = newParentData[config.slateManifestURN].contents.bodymatter;
            const index = getState().commentsPanelReducer.index;
            if(index){
                if (typeof (index) == 'number') {
                    if (newBodymatter[index].versionUrn == elementId) {
                        newBodymatter[index].comments = false;
                    }
                } else {
                    let indexes = index.split('-');
                    let indexesLen = indexes.length, condition;
                    if (indexesLen == 2) {
                        condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]]
                        if (condition.versionUrn == elementId) {
                            newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].comments = false
                        }
                    } else if (indexesLen == 3) {
                        condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]]
                        if (condition.versionUrn == elementId) {
                            newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].comments = false;
                        }
                    }
                }
            }   
            dispatch({
                type: DELETE_COMMENT,
                payload: commentUrn
            });
            dispatch({
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: newParentData
                }
            })
        }).catch(error => {
            console.log("error while deleting user", error);
        })

}
