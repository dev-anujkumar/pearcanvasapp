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
    REPLY_COMMENT
} from '../constants/Action_Constants';

/**
 * This is the initial state and structure of app store
 * update it accordingly
 */
const initialState = {
    comments: [{
        "commentType": "comment",
        "commentDateTime": "2019-08-25T04:29:55.633Z",
        "commentAssignee": "c5test01",
        "commentCreator": "c5test01",
        "commentString": "sadsa",
        "commentStatus": "OPEN",
        "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5",
        "replyComments": [{
            "commentCreator": "c5test01",
            "commentDateTime": "2019-08-25T04:56:38.241Z",
            "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5",
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
        "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5",
        "replyComments": [{
            "commentCreator": "c5test01",
            "commentDateTime": "2019-08-25T04:56:38.241Z",
            "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5",
            "commentString": "zxczcczz",
            "commentType": "commentReply"
        }],
        "commentUrn": "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c"
    }
]
}

/**
 * This method actually updates app store as per incoming payload
 * @param {Object} state | current state
 * @param {String} action | incoming action with payload
 */
export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_COMMENTS:
            return {
                ...state,
               // comments: action.payload.commentList
               comments: action.payload
            };
        case TOGGLE_COMMENTS_PANEL :
            console.log(action.payload);
            return {
                ...state,
                toggleCommentsPanel:action.payload
            }
        case REPLY_COMMENT : 
        const commentsList = state.comments;
        console.log("comment",commentsList)
        commentsList.forEach((comment,index) =>{
            if(comment.commentUrn === action.payload.commentUrn){
                comment.replyComments.push(action.payload.reply)
            }
        })
         return {
            ...state,
             comments:commentsList,
             toggleReplyForm:action.payload.toggleReplyForm
          }
         
        default:
            return state;
    }
}