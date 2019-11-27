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
    allComments: [{
        "commentType": "comment",
        "commentDateTime": "2019-08-25T04:29:55.633Z",
        "commentAssignee": "c5test01",
        "commentCreator": "c5test01",
        "commentString": "sadsa",
        "commentStatus": "OPEN",
        "commentOnEntity": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a",
        "replyComments": [{
            "commentCreator": "c5test01",
            "commentDateTime": "2019-08-25T04:56:38.241Z",
            "commentOnEntity": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a",
            "commentString": "zxczcczz",
            "commentType": "commentReply"
        }],
        "commentUrn": "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c"
    },
    {
        "commentType": "comment",
        "commentDateTime": "2019-08-25T04:29:55.633Z",
        "commentAssignee": "c5test01",
        "commentCreator": "c5test01",
        "commentString": "tester",
        "commentStatus": "OPEN",
        "commentOnEntity": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",
        "replyComments": [{
            "commentCreator": "c5test01",
            "commentDateTime": "2019-08-25T04:56:38.241Z",
            "commentOnEntity": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",
            "commentString": "zxczcczz",
            "commentType": "commentReply"
        }],
        "commentUrn": "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c"
    },
    {
        "commentType": "comment",
        "commentDateTime": "2019-08-25T04:29:55.633Z",
        "commentAssignee": "c5test01",
        "commentCreator": "c5test01",
        "commentString": "sadsa",
        "commentStatus": "OPEN",
        "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf6",
        "replyComments": [{
            "commentCreator": "c5test01",
            "commentDateTime": "2019-08-25T04:56:38.241Z",
            "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf6",
            "commentString": "zxczcczz",
            "commentType": "commentReply"
        }],
        "commentUrn": "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c"
    }
    ],
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
                slateTitle: payload.title
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
            resolveComment.forEach(comment => {
                if (comment.commentUrn === payload.commentUrn) {
                    comment.commentStatus = payload.resolveOrOpen
                }
            })
            return {
                ...state,
                comments: resolveComment
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
            users = users.filter(user => user.isMember === true)
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
            let addedComment;
            /** Comments in comments panel was not showing after clicking from header for the first time */
            // if(state.comments.length!=0 && state.comments[0].commentOnEntity == payload.commentOnEntity){
                addedComment = [
                    ...addnewComment,payload
                ]  
            // }
            return {
                ...state,
                allComments: [...addComment, payload],
                comments: addedComment
            }
        default:
            return state;
    }
}