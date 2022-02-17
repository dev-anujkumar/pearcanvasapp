import {
    SLATE_FIGURE_ELEMENTS,
    SET_AUTO_NUMBER_TOGGLE,
    SET_AUTO_NUMBER_SEQUENCE,
    UPDATE_AUTO_NUMBER_SEQUENCE,
    GET_TOC_AUTO_NUMBERING_LIST,
    GET_ALL_AUTO_NUMBER_ELEMENTS,
    UPDATE_AUTO_NUMBER_ELEMENTS_LIST,
    UPDATE_AUTONUMBERING_DROPDOWN_VALUE,
    UPDATE_POPUP_PARENT_SLATE,
    GET_SLATE_LIST_IN_CONTAINER,
    UPDATE_AUTONUMBER_MAPPER_KEYS
} from '../constants/Action_Constants.js';

const INITIAL_STATE = {
    isAutoNumberingEnabled: true,
    autoNumberedElements: {
        imagesList: [],
        tablesList: [],
        equationsList: [],
        audiosList: [],
        videosList: [],
        asidesList: [],
        workedExamplesList: [],
        interactiveList: [],
        exhibitsList: []
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
        interactiveIndex: {},
        exhibitsIndex: {}
    },
    slateFigureList:[],
    autoNumberOption: '',
    popupParentSlateData: {},
    tocContainerSlateList:[],
    autoNumber_KeyMapper: {
        'Figure': 'figureImageIndex',
        'Table': 'tableIndex',
        'Equation': 'equationsIndex',
        'Audio': 'audioIndex',
        'Video': 'videoIndex',
        "Interactive": 'interactiveIndex',
        'Exhibit': 'exhibitsIndex'
    },
    autoNumber_ElementTypeKey: {
        'Figure': 'imagesList',
        'Table': 'tablesList',
        'Equation': 'equationsList',
        'Audio': 'audiosList',
        'Video': 'videosList',
        'Interactive': 'interactiveList',
        "Aside": "asidesList",
        "Worked Example": "workedExamplesList",
        'Exhibit': 'exhibitsList'
    },
    autoNumber_response_ElementType_mapper: {
        "figures": "imagesList",
        "tables": "tablesList",
        "equations": "equationsList",
        "audios": "audiosList",
        "videos": "videosList",
        "interactives": "interactiveList",
        "asides": "asidesList",
        "workedExamples": "workedExamplesList",
        'exhibits': 'exhibitsList'
    },
    autoNumber_IndexMapper: {
        'imagesList': 'figureImageIndex',
        'tablesList': 'tableIndex',
        'equationsList': 'equationsIndex',
        'audiosList': 'audioIndex',
        'videosList': 'videoIndex',
        'interactiveList': 'interactiveIndex',
        'exhibitsList': 'exhibitsIndex'
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
                    ...action.payload.slateFigures
                ]
            }
        case UPDATE_POPUP_PARENT_SLATE:
            return {
                ...state,
                popupParentSlateData: action.payload
            }
        case GET_SLATE_LIST_IN_CONTAINER:
            return {
                ...state,
                tocContainerSlateList: action.payload
            }
        case UPDATE_AUTONUMBER_MAPPER_KEYS:
            return {
                ...state,
                autoNumber_KeyMapper: action.payload.autoNumber_KeyMapper,
                autoNumber_IndexMapper: action.payload.autoNumber_IndexMapper,
                autoNumber_ElementTypeKey: action.payload.autoNumber_ElementTypeKey,
                autoNumber_response_ElementType_mapper: action.payload.autoNumber_response_ElementType_mapper
            }
        default:
            return state
    }
}