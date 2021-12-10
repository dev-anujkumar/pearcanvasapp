import {
    SET_AUTO_NUMBER_TOGGLE,
    GET_ALL_FIGURE_ELEMENTS,
    GET_TOC_AUTO_NUMBERING_LIST
} from '../constants/Action_Constants.js';

const INITIAL_STATE = {
    isAutoNumberingEnabled: false,
    figImageList: [],
    autoNumberingDetails:{}
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
        case GET_TOC_AUTO_NUMBERING_LIST:
            return {
                ...state,
                autoNumberingDetails: action.payload
            }
        default:
            return state
    }
}