import {
    TOGGLE_BORDERS,
    TOGGLE_PAGE_NUMBER
} from '../constants/Action_Constants';

const INITIAL_STATE = {
    elemBorderToggle: true,
    pageNumberToggle:false
}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

export default function (state = INITIAL_STATE, action = INITIAL_ACTION) {
    switch (action.type) {
        case TOGGLE_BORDERS:
            return {
                ...state,
                elemBorderToggle: !state.elemBorderToggle
            }
        case TOGGLE_PAGE_NUMBER:
            return {
                ...state,
                pageNumberToggle: !state.pageNumberToggle
            }
        default:
            return state
    }
}
