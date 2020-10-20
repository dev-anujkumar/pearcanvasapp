import { SET_SEARCH_URN, SET_COMMENT_SEARCH_URN } from './../constants/Search_Constants.js';

const INITIAL_STATE = {
    searchTerm: '',
    parentId: '',
    deeplink: true
}

const INITIAL_COMMENT_STATE = {
    commentSearchTerm: '',
    parentId: '',
}

const INITIAL_ACTION = { type: '', payload: '', parent: '', deeplink: true };

export function searchReducer(state = INITIAL_STATE, action = INITIAL_ACTION) {
    if(action.type === SET_SEARCH_URN) {
        return {
            searchTerm: action.payload,
            parentId: action.parent,
            deeplink: action.deeplink
        }
    } else {
        return state;
    }
}

export function commentSearchReducer(state = INITIAL_COMMENT_STATE, action = INITIAL_ACTION) {
    if(action.type === SET_COMMENT_SEARCH_URN) {
        return {
            commentSearchTerm: action.payload,
            parentId: action.parent
        }
    } else {
        return state;
    }
}