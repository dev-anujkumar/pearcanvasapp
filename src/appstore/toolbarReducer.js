import {
    TOGGLE_BORDERS
} from '../constants/Action_Constants';

const INIT_STATE = {
    elemBorderToggle: true
}

export default function (state = INIT_STATE, action){
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