import {
    SLATE_FIGURE_ELEMENTS,
    SET_AUTO_NUMBER_TOGGLE,
    SET_AUTO_NUMBER_SEQUENCE,
    UPDATE_AUTO_NUMBER_SEQUENCE,
    GET_TOC_AUTO_NUMBERING_LIST,
    GET_ALL_AUTO_NUMBER_ELEMENTS,
    UPDATE_AUTO_NUMBER_ELEMENTS_LIST,
    UPDATE_AUTONUMBERING_DROPDOWN_VALUE,
    UPDATE_POPUP_PARENT_SLATE
} from '../constants/Action_Constants.js';

const INITIAL_STATE = {
    isAutoNumberingEnabled: false,
    autoNumberedElements: {
        imagesList: [],
        tablesList: [],
        equationsList: [],
        audiosList: [],
        videosList: [],
        asidesList: [],
        workedExamplesList: [],
        interactiveList: []
    },
    autoNumberingDetails: {},
    autoNumberElementsIndex: {
        figureImageIndex: {},
        tableIndex: {},
        equationsIndex: {},
        audioIndex: {},
        videoIndex: {},
        asideIndex: {},
        workedExampleIndex: {},
        interactiveIndex: {}
    },
    slateFigureList:[],
    autoNumberOption: '',
    popupParentSlateData: {},
    popupElementsData: []
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
                autoNumberedElements: {
                    ...state.autoNumberedElements,
                    ...action.payload.numberedElements
                }
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
                autoNumberElementsIndex: {
                    ...state.autoNumberElementsIndex,
                    ...action.payload.autoNumberElementsIndex
                }
            }
        case UPDATE_AUTO_NUMBER_ELEMENTS_LIST:
            return {
                ...state,
                autoNumberedElements: {
                    ...state.autoNumberedElements,
                    [action.payload.mediaType]: action.payload.mediaList
                }
            }
        case UPDATE_AUTO_NUMBER_SEQUENCE:
            return {
                ...state,
                autoNumberElementsIndex: {
                    ...autoNumberElementsIndex,
                    [action.payload.mediaType]: action.payload.mediaIndex
                }
            }
        case UPDATE_AUTONUMBERING_DROPDOWN_VALUE:
            return {
                ...state,
                autoNumberOption: action.payload
            }
        case SLATE_FIGURE_ELEMENTS:
            return {
                ...state,
                slateFigureList: [
                    ...state.slateFigureList,
                    ...action.payload.slateFigures
                ]
            }
        case UPDATE_POPUP_PARENT_SLATE:
            return {
                ...state,
                popupParentSlateData: action.payload
            }
        default:
            return state
    }
}