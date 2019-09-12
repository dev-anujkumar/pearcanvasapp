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
    DELETE_COMMENT
} from '../../constants/Action_Constants';

let headers = {
    "Content-Type": "application/json",
    ApiKey: config.STRUCTURE_APIKEY,//STRUCTURE_APIKEY,
    PearsonSSOSession: config.ssoToken
}

export const fetchComments = (contentUrn, title) => dispatch => {
    // containerEntityUrn = "urn:pearson:entity:88187e28-1992-4048-8b03-87c6115dd446",
    console.log("entity", contentUrn)
    let projectUrn = config.projectUrn,
        url = `${config.JAVA_API_URL}v1/narrative/v2/${projectUrn}/aggregatedComments/container/${contentUrn}`
    return axios.get(url, {
        headers: {
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken
        }
    }).then(response => {
        console.log("response======>", response)
        dispatch({
            type: FETCH_COMMENTS,
            payload: { comments: response.data.comments, title }
        })
    }).catch(error => {
        console.log("failed to fetch comment", error);
    })
};


export const fetchCommentByElement = (elemenetId) => dispatch => {
    console.log("elementId====<", elemenetId)
    return dispatch({
        type: FETCH_COMMENT_BY_ELEMENT,
        payload: elemenetId //"urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5"//elemenetId
    })
};

export const toggleCommentsPanel = (toggle) => dispatch => {
    console.log("toogle====>", toggle);
    dispatch({
        type: TOGGLE_COMMENTS_PANEL,
        payload: toggle
    })
};
export const toggleReply = (toggle) => dispatch => {
    dispatch({
        type: TOGGLE_REPLY,
        payload: toggle
    })
};
export const replyComment = (commentUrn, reply, elementId) => dispatch => {
    let replyDataToSend = {
        comment: reply.commentString,
        commentCreator: reply.commentCreator
    };
    let url = `${config.STRUCTURE_API_URL}narrative/v2/${elementId}/comment/${commentUrn}/reply/`
    return axios.post(url, replyDataToSend,
        { headers: headers }
    )
        .then(response => {
            console.log("response======>", response)
            dispatch({
                type: REPLY_COMMENT,
                payload: {
                    commentUrn,
                    reply,
                    toggleReplyForm: false
                }
            });

        }).catch(error => {
            console.log("Failed to add reply", error);
        })
};


export const resolveComment = (commentUrn, resolveOrOpen, elementId) => dispatch => {

    let request = {
        status: resolveOrOpen
    };
    let url = `${config.STRUCTURE_API_URL}narrative/v2/${elementId}/comment/${commentUrn}/Status/`
    return axios.put(url, request,
        { headers: headers }
    )
        .then(response => {
            console.log("response======>", response)
            dispatch({
                type: RESOLVE_COMMENT,
                payload: { commentUrn, resolveOrOpen }
            });

        }).catch(error => {
            console.log("status update fail", error);
        })
};



export const updateComment = (commentUrn, updateComment, elementId) => dispatch => {

    let request = updateComment
    let url = `${config.STRUCTURE_API_URL}narrative/v2/${elementId}/comment/${commentUrn}/Status/`
    return axios.put(url, request,
        { headers: headers }
    ).then(response => {
        console.log("response======>", response)
        dispatch({
            type: UPDATE_COMMENT,
            payload: { commentUrn, updateComment: updateComment.comment }
        });
    }).catch(error => {
        console.log("status update fail", error);
    })
};


export const getProjectUsers = (ENTITY_URN) => dispatch => {
    let ENTITY_URN = config.project_ENTITY_URN
    let url = `${config.JAVA_API_URL}v1/structure/dashboard/ProjectUserInfo/${ENTITY_URN}`
    return axios.get(url,
        {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        }).then(response => {
            console.log("response======>", response)
            dispatch({
                type: GET_PROJECT_USER,
                payload: response.data
            });
        }).catch(error => {
            console.log("error while getting user", error);
        })
}


export const updateAssignee = (commentUrn, newAssignee, elementId) => dispatch => {
    let url = `${config.STRUCTURE_API_URL}narrative/v2/${elementId}/comment/${commentUrn}/Assignee/`
    let req = {
        assignee: newAssignee
    };
    return axios.put(url, req, {
        headers: headers
    }).then(response => {
        console.log("response======>", response)
        dispatch({
            type: UPDATE_ASSIGNEE,
            payload: { commentUrn, newAssignee: newAssignee }
        });
    }).catch(error => {
        console.log("error while updating user", error);
    })

}


export const deleteComment = (commentUrn, elementId) => dispatch => {
    let url = `${config.STRUCTURE_API_URL}narrative/v2/${elementId}/comment/${commentUrn}`
    return axios.delete(url, { headers, headers })
        .then(response => {
            console.log("response======>", response)
            dispatch({
                type: DELETE_COMMENT,
                payload: commentUrn
            });
        }).catch(error => {
            console.log("error while updating user", error);
        })

}
