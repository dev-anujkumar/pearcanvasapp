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
    UPDATE_AUTONUMBER_MAPPER_KEYS,
    UPDATE_CHAPTER_POPUP_DATA,
    SET_POPUP_PARENT_CUT_COPY
} from '../constants/Action_Constants.js';

const INITIAL_STATE = {
    isAutoNumberingEnabled: false,
    autoNumberedElements: {
        imageList: [],
        tableList: [],
        equationList: [],
        audioList: [],
        videoList: [],
        asideList: [],
        workedExampleList: [],
        interactiveList: [],
        exhibitList: []
    },
    autoNumberingDetails: {},
    autoNumberElementsIndex: {
        figureImageIndex: {},
        tableIndex: {},
        equationIndex: {},
        audioIndex: {},
        videoIndex: {},
        asideIndex: {},
        workedExampleIndex: {},
        interactiveIndex: {},
        exhibitIndex: {}
    },
    slateFigureList:[],
    autoNumberOption: '',
    popupParentSlateData: {},
    popupCutCopyParentData: {},
    tocContainerSlateList:[],
    autoNumber_KeyMapper: {
        'Figure': 'figureImageIndex',
        'Table': 'tableIndex',
        'Equation': 'equationIndex',
        'Audio': 'audioIndex',
        'Video': 'videoIndex',
        "Interactive": 'interactiveIndex',
        "Aside": "asideIndex",
        "Worked Example": "workedExampleIndex",
        'Exhibit': 'exhibitIndex'
    },
    autoNumber_ElementTypeKey: {
        'Figure': 'imageList',
        'Table': 'tableList',
        'Equation': 'equationList',
        'Audio': 'audioList',
        'Video': 'videoList',
        'Interactive': 'interactiveList',
        "Aside": "asideList",
        "Worked Example": "workedExampleList",
        'Exhibit': 'exhibitList'
    },
    autoNumber_response_ElementType_mapper: {
        "figure": "imageList",
        "table": "tableList",
        "equation": "equationList",
        "audio": "audioList",
        "video": "videoList",
        "interactive": "interactiveList",
        "aside": "asideList",
        "workedexample": "workedExampleList",
        'exhibit': 'exhibitList'
    },
    autoNumber_IndexMapper: {
        'imageList': 'figureImageIndex',
        'tableList': 'tableIndex',
        'equationList': 'equationIndex',
        'audioList': 'audioIndex',
        'videoList': 'videoIndex',
        'interactiveList': 'interactiveIndex',
        'asideList': 'asideIndex',
        'workedExampleList': 'workedExampleIndex',
        'exhibitList': 'exhibitIndex'
    },
    autoNumber_FigureTypeKey_Mapper: {
        'image': 'IMAGE',
        'video': 'AUDIO',
        'audio': 'VIDEO',
        'interactive': 'INTERACTIVE',
        'tableasmarkup': 'TABLE',
        "authoredtext": 'AUTHOREDTEXT',
        'codelisting': 'CODELISTING',
    },
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
            case UPDATE_CHAPTER_POPUP_DATA:
                if (action.key) {
                    let popupElementsData = state.popupElementsData;
                    popupElementsData = popupElementsData.filter(function (data) {
                        return data.versionUrn !== action.key
                    })
                    return {
                        ...state,
                        popupElementsData: [...popupElementsData, action.payload]
                    }
                } else {
                    return {
                        ...state,
                        popupElementsData: []
                    }
                }
        case SET_POPUP_PARENT_CUT_COPY:
            return {
                ...state,
                popupCutCopyParentData: action.payload
            }
        default:
            return state
    }
}
