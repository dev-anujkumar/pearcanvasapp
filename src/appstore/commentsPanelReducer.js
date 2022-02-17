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
    ADD_NEW_COMMENT,
    UPDATE_ROLE
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
        case ADD_NEW_COMMENT: {
            const allComments = state.allComments.filter(item => item.commentUrn !== action.payload?.commentUrn);
            return {
                ...state,
                allComments: [action.payload, ...allComments]
            }
        }
        case DELETE_COMMENT: {
            const allComments = state.allComments.filter(item => item.commentUrn !== payload);
            return {
                ...state,
                allComments: [...allComments]
            }
        }
        default:
            return state;
    }
}

