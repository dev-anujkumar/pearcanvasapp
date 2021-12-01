import {
    SET_AUTO_NUMBER_TOGGLE,
    GET_ALL_FIGURE_ELEMENTS
} from '../constants/Action_Constants.js';

const INITIAL_STATE = {
    isAutoNumberingEnabled: false,
    figImageList: []
}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

export default function autoNumberReducer (state = INITIAL_STATE, action = INITIAL_ACTION) {
    switch(action.type){
        case GET_ALL_FIGURE_ELEMENTS:
            return {
                ...state,
                figImageList: action.payload.images
            }
        case SET_AUTO_NUMBER_TOGGLE:
            return {
                ...state,
                isAutoNumberingEnabled: action.payload.isAutoNumberingEnabled
            }
        default:
            return state
    }
}