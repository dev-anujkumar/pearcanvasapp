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
    UPDATE_ASSIGNEE
} from '../../constants/Action_Constants';
let headers = {
    "Content-Type": "application/json",
    //"ApiKey": 'Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld',
    "PearsonSSOSession": config.ssoToken
}

export const fetchComments = () => dispatch => {

    let req = ['urn:pearson:work:30ccc316-b39e-474f-9ce6-36d2c1730c05'],
        // url = `${config.STRUCTURE_API_URL}narrative/v2/bulkCommentRetrieve`
        containerEntityUrn = "urn:pearson:entity:88187e28-1992-4048-8b03-87c6115dd446",
        projectUrn = "urn:pearson:distributable:e80d2cea-a0d2-474f-8896-82caa92a66d3",
        url = `${config.JAVA_API_URL}v1/narrative/v2/${projectUrn}/aggregatedComments/container/${containerEntityUrn}`
    axios.get(url, {
        headers: {
            "Content-Type": "application/json",
            //"ApiKey":'Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld',
            "PearsonSSOSession": config.ssoToken
        }
    }).then(response => {
        console.log("response======>", response)
        dispatch({
            type: FETCH_COMMENTS,
            payload: response.data.comments
        })
    }).catch(error => {
        console.log("failed to fetch comment", error);
    })
};

export const fetchCommentByElement = (elemenetId) => dispatch => {
    console.log("elementId====<", elemenetId)
    dispatch({
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
    // dispatch({
    //         type: REPLY_COMMENT,
    //         payload: { commentUrn, reply }
    //       });
    axios.post(`${config.STRUCTURE_API_URL}narrative/v2/${elementId}/comment/${commentUrn}/reply/`,
        replyDataToSend,
        {
            headers: {
                "Content-Type": "application/json",
                "ApiKey": 'Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld',
                "PearsonSSOSession": config.ssoToken
            }
        }).then(response => {
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
    axios.put(`${config.STRUCTURE_API_URL}narrative/v2/${elementId}/comment/${commentUrn}/Status/`,
        request,
        {
            headers: {
                "Content-Type": "application/json",
                "ApiKey": 'Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld',
                "PearsonSSOSession": config.ssoToken
            }
        }).then(response => {
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
    axios.put(`${config.STRUCTURE_API_URL}narrative/v2/${elementId}/comment/${commentUrn}/Status/`,
        request,
        {
            headers: {
                "Content-Type": "application/json",
                "ApiKey": 'Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld',
                "PearsonSSOSession": config.ssoToken
            }
        }).then(response => {
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
    let ENTITY_URN = "urn:pearson:entity:3d9363f1-36bb-47ea-8842-9b142027692c"
    let url = `${config.JAVA_API_URL}v1/structure/dashboard/ProjectUserInfo/${ENTITY_URN}`
    return axios.get(url,
        {
            headers: headers
        }).then(response => {
            console.log("response======>", response)
            dispatch({
                type: GET_PROJECT_USER,
                payload: response.data
            });
        }).catch(error => {
            console.log("error while getting user",error);
        })
}

export const updateAssignee = (commentUrn, newAssignee, elementId) => dispatch => {
    let url = `${config.STRUCTURE_API_URL}narrative/v2/${elementId}/comment/${commentUrn}/Assignee/`
    let req = {
        assignee: newAssignee
      };
    return axios.put(url,req,
        {
            headers: {
                "Content-Type": "application/json",
                "ApiKey": 'Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld',
                "PearsonSSOSession": config.ssoToken
            }
        }).then(response => {
            console.log("response======>", response)
            dispatch({
                type: UPDATE_ASSIGNEE,
                payload: { commentUrn, newAssignee:newAssignee }
            });
        }).catch( error => {
            console.log("error while updating user",error);
        })
 
}

