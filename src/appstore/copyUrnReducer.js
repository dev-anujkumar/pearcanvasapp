import { SET_SELECTION } from './../constants/Action_Constants.js';

const INITIAL_STATE = {
    selection: {}
};

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

export function selectionReducer(state = INITIAL_STATE, action = INITIAL_ACTION) {
    if(action.type === SET_SELECTION) {
        return {
            selection: action.payload
        }
    } else {
        return state;
    }
}