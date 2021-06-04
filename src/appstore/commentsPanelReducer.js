/**
 * Module - CommentPanel Reducer
 * Description - All comments manupulation of comments panel lands here
 * Developer -yasmin agwan
 * Last modified - 21-08-2019
 */

// IMPORT - Action constants //
import {
    FETCH_COMMENTS,
    TOGGLE_COMMENTS_PANEL,
    REPLY_COMMENT,
    FETCH_COMMENT_BY_ELEMENT,
    RESOLVE_COMMENT,
    TOGGLE_REPLY,
    UPDATE_COMMENT,
    GET_PROJECT_USER,
    UPDATE_ASSIGNEE,
    DELETE_COMMENT,
    ADD_NEW_COMMENT
} from '../constants/Action_Constants';

/**
 * This is the initial state and structure of comments panel store
 * update it accordingly
 */
const initialState = {
    allComments: [],
    toggleReplyForm: true,
    togglePanel: false,
    users: [],
    slateTitle: "",
    comments: [],
    index:null
}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

/**
 * This method actually updates app store as per incoming payload
 * @param {Object} state | current state
 * @param {String} action | incoming action with payload
 */
export default function (state = initialState, action = INITIAL_ACTION) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_COMMENTS:
            return {
                ...state,
                allComments: payload.comments,
                slateTitle: payload.title,
                comments: payload.comments
            };
        case FETCH_COMMENT_BY_ELEMENT:
            let commentList = state.allComments
            let comments = commentList && commentList.filter(comment => comment.commentOnEntity === payload.elementId)
            return {
                ...state,
                comments: comments,
                index:payload.index
            }
        case TOGGLE_COMMENTS_PANEL:
            return {
                ...state,
                togglePanel: payload
            }
        case TOGGLE_REPLY:
            return {
                ...state,
                toggleReplyForm: payload
            }
        case REPLY_COMMENT:
            const commentsList = state.comments;
            commentsList.forEach((comment, index) => {
                if (comment.commentUrn === payload.commentUrn) {
                    comment.replyComments.push(payload.reply)
                }
            })

            return {
                ...state,
                comments: commentsList,
                toggleReplyForm: payload.toggleReplyForm
            }
        case RESOLVE_COMMENT:

            let resolveComment = [...state.comments]
            let resolveAllComment = [...state.allComments]
            resolveComment.forEach(comment => {
                if (comment.commentUrn === payload.commentUrn) {
                    comment.commentStatus = payload.resolveOrOpen
                }
            })
            resolveAllComment.forEach(comment => {
                if (comment.commentUrn === payload.commentUrn) {
                    comment.commentStatus = payload.resolveOrOpen
                }
            })
            return {
                ...state,
                comments: resolveComment,
                allComments: resolveAllComment
            }
        case UPDATE_COMMENT:

            let editComment = [...state.comments]
            editComment.forEach(comment => {
                if (comment.commentUrn === payload.commentUrn) {
                    comment.commentString = payload.updateComment
                    comment.commentStatus = "OPEN"
                }
            })
            return {
                ...state,
                comments: editComment
            }
        case GET_PROJECT_USER:
            let users = payload;
            // users = users.filter(user => user.isMember === true)
            return {
                ...state,
                users: users
            }

        case UPDATE_ASSIGNEE:
            let updateComment = [...state.comments]
            updateComment.forEach((comment, index) => {
                if (comment.commentUrn === payload.commentUrn) {
                    comment.commentAssignee = payload.newAssignee
                }
            })
            return {
                ...state,
                comments: updateComment
            }
        case DELETE_COMMENT:
            let deleteComment = [...state.comments]
            let deleteAllComment = [...state.allComments] //JSON.parse(JSON.stringify(state.allComments))
            deleteComment.forEach((comment, index) => {
                if (comment.commentUrn === payload) {
                    deleteComment.splice(index, 1)
                }
            })
            deleteAllComment.forEach((comment, index) => {
                if (comment.commentUrn === payload) {
                    deleteAllComment.splice(index, 1)
                }
            })
            return {
                ...state,
                comments: deleteComment,
                allComments:deleteAllComment
            }
        case ADD_NEW_COMMENT:
            let addComment = [...state.allComments] //JSON.parse(JSON.stringify(state.allComments))
            let addnewComment = [...state.comments]//JSON.parse(JSON.stringify(state.comments))
            let addedComment = [];
            /** Comments in comments panel was not showing after clicking from header for the first time */
            if(state.comments.length!=0 && state.comments[0].commentOnEntity == payload.commentOnEntity){
                addedComment = [
                    ...addnewComment,payload
                ]  
            }
            return {
                ...state,
                allComments: [...addComment, payload],
                comments: addedComment
            }
        default:
            return state;
    }
}
