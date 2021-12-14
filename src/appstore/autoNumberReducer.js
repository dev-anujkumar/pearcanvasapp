import {
    SET_AUTO_NUMBER_TOGGLE,
    SET_AUTO_NUMBER_SEQUENCE,
    UPDATE_AUTO_NUMBER_SEQUENCE,
    GET_TOC_AUTO_NUMBERING_LIST,
    GET_ALL_AUTO_NUMBER_ELEMENTS,
    UPDATE_AUTO_NUMBER_ELEMENTS_LIST
} from '../constants/Action_Constants.js';

const INITIAL_STATE = {
    isAutoNumberingEnabled: false,
    autoNumberedElements: {
        imagesList: [],
        tablesList: [],
        equationsList: []
    },
    autoNumberingDetails: {},
    autoNumberElementsIndex: {
        figureImageIndex: {},
        tableIndex: {},
        equationsIndex: {}
    },
    autoNumberElementsCount: {
        figureImageCount: 1,
        tableCount: 1,
        equationsCount: 1
    }
}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

export default function autoNumberReducer(state = INITIAL_STATE, action = INITIAL_ACTION) {
    switch (action.type) {
        case GET_ALL_AUTO_NUMBER_ELEMENTS:
            return {
                ...state,
                autoNumberedElements: action.payload.numberedElements
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
        case SET_AUTO_NUMBER_SEQUENCE:
            return {
                ...state,
                autoNumberElementsIndex: action.payload.autoNumberElementsIndex,
                autoNumberElementsCount: action.payload.autoNumberElementsCount
            }
        case UPDATE_AUTO_NUMBER_ELEMENTS_LIST:
            return {
                ...state,
                autoNumberedElements: {
                    ...autoNumberedElements,
                    [action.payload.mediaType]: action.payload.mediaList
                }
            }
        case UPDATE_AUTO_NUMBER_SEQUENCE:
            return {
                ...state,
                autoNumberElementsIndex: {
                    ...autoNumberElementsIndex,
                    [action.payload.mediaType]: action.payload.mediaIndex
                },
                autoNumberElementsCount: {
                    ...autoNumberElementsCount,
                    [action.payload.mediaType]: action.payload.mediaCount
                }
            }
        default:
            return state
    }
}