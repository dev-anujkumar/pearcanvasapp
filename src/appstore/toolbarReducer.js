import {
    TOGGLE_BORDERS
} from '../constants/Action_Constants';

const INITIAL_STATE = {
    elemBorderToggle: true
}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

export default function (state = INITIAL_STATE, action = INITIAL_ACTION){
    switch(action.type){
        case TOGGLE_BORDERS:
            return {
                ...state,
                elemBorderToggle:!state.elemBorderToggle
            }
        default:
            return state; 
    }
}