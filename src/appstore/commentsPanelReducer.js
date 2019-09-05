/**
 * Module - Slate Level Reducer
 * Description - all slate related action payloads land here
 * Developer - Abhay Singh
 * Last modified - 21-08-2019
 */

// IMPORT - Action constants //
import {
    FETCH_COMMENTS,
    TOGGLE_COMMENTS_PANEL,
    REPLY_COMMENT,
    FETCH_COMMENT_BY_ELEMENT ,
    RESOLVE_COMMENT,
    TOGGLE_REPLY 
} from '../constants/Action_Constants';

/**
 * This is the initial state and structure of app store
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
        "commentOnEntity": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
        "replyComments": [{
            "commentCreator": "c5test01",
            "commentDateTime": "2019-08-25T04:56:38.241Z",
            "commentOnEntity": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
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
        "commentOnEntity": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
        "replyComments": [{
            "commentCreator": "c5test01",
            "commentDateTime": "2019-08-25T04:56:38.241Z",
            "commentOnEntity": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
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
    toggleReplyForm:true,
    togglePanel:false
}

/**
 * This method actually updates app store as per incoming payload
 * @param {Object} state | current state
 * @param {String} action | incoming action with payload
 */
export default function (state = initialState , action) {
    const {type,payload} = action;
    switch (action.type) {
        case FETCH_COMMENTS:
            return {
                ...state,
                // comments: action.payload.commentList
                allComments: action.payload
            };
        case FETCH_COMMENT_BY_ELEMENT:
            console.log("comments======>", state.allComments)
            let commentList = state.allComments
            let comments = commentList && commentList.filter(comment => comment.commentOnEntity === payload)
            return {
                ...state,
                comments: comments
            }
        case TOGGLE_COMMENTS_PANEL:
            console.log(action.payload);
            return {
                ...state,
                togglePanel: action.payload
            }
        case TOGGLE_REPLY:
                    console.log(action.payload);
                    return {
                        ...state,
                        toggleReplyForm: payload
                    }
        case REPLY_COMMENT:
            const commentsList = state.comments;
            console.log("comment", commentsList)
            commentsList.forEach((comment, index) => {
                if (comment.commentUrn === action.payload.commentUrn) {
                    comment.replyComments.push(action.payload.reply)
                }
            })

            return {
                ...state,
                comments: commentsList,
                toggleReplyForm: action.payload.toggleReplyForm
            }
        case RESOLVE_COMMENT:

         let resolveComment = JSON.parse(JSON.stringify(state.comments)) //deep cloning state.commet not mutating state
         resolveComment.forEach(comment=>{
            if(comment.commentUrn === payload.commentUrn){
                comment.commentStatus = payload.resolveOrOpen
            }
        })
        return {
            ...state,
            comments: resolveComment
        }

        default:
            return state;
    }
}