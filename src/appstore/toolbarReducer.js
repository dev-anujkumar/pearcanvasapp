import {
    TOGGLE_BORDERS, TOGGLE_LO_DROPDOWN
} from '../constants/Action_Constants';

const INIT_STATE = {
    elemBorderToggle: true,
    LODropdownToggle:false
}

export default function (state = INIT_STATE, action){
    switch(action.type){
        case TOGGLE_BORDERS:
            return {
                ...state,
                elemBorderToggle:!state.elemBorderToggle
            }
            case TOGGLE_LO_DROPDOWN:
            return {
                ...state,
                LODropdownToggle:!state.LODropdownToggle
            }
        default:
            return state; 
    }
}