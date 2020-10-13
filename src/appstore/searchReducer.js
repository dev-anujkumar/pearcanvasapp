import { SET_SEARCH_URN } from './../constants/Search_Constants.js';

const INITIAL_STATE = {
    searchTerm: '',
    parentId: ''
}

const INITIAL_ACTION = { type: '', payload: '' };

export default function searchReducer(state = INITIAL_STATE, action = INITIAL_ACTION) {
    if(action.type === SET_SEARCH_URN) {
        return {
            searchTerm: action.payload,
            parentId: action.parent
        }
    } else {
        return state;
    }
}