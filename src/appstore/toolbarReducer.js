import {
    TOGGLE_BORDERS,
    TOGGLE_PAGE_NUMBER, TOGGLE_SPELL_CHECK
} from '../constants/Action_Constants';

const INITIAL_STATE = {
    elemBorderToggle: true,
    pageNumberToggle:false,
    spellCheckToggle : true
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
                elemBorderToggle: action.payload
            }
        case TOGGLE_PAGE_NUMBER:
            return {
                ...state,
                pageNumberToggle: !state.pageNumberToggle
            }
        case TOGGLE_SPELL_CHECK:
            return {
                ...state,
                spellCheckToggle: !state.spellCheckToggle
            }
        default:
            return state
    }
}
