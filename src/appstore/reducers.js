/**
 * Module - Slate Level Reducer
 * Description - all slate related action payloads land here
 * Last modified - 11-09-2019
 */

// IMPORT - Action constants //
import {
    FETCH_SLATE_DATA,
    SET_ACTIVE_ELEMENT,
    AUTHORING_ELEMENT_CREATED,
    AUTHORING_ELEMENT_UPDATE,
    DELETE_ELEMENT,
    SWAP_ELEMENT,
    SET_SPLIT_INDEX,
    GET_PAGE_NUMBER,
    SET_UPDATED_SLATE_TITLE,
    SET_SLATE_TYPE,
    SET_SLATE_ENTITY,
    GET_PROJECT_PERMISSIONS,
    SET_OLD_IMAGE_PATH,
    UPDATE_PAGENUMBER_SUCCESS,
    UPDATE_PAGENUMBER,
    UPDATE_PAGENUMBER_FAIL,
    UPDATE_FOOTNOTEGLOSSARY,
    FETCH_DATA_ON_SLATE_REFRESH,
    ACCESS_DENIED_POPUP,
    SET_PARENT_NODE,
    OPEN_POPUP_SLATE,
    CLOSE_POPUP_SLATE,
    CREATE_SHOW_HIDE_ELEMENT,
    SET_PARENT_ASIDE_DATA,
    DELETE_SHOW_HIDE_ELEMENT,
    SET_PARENT_SHOW_DATA,
    GET_ALL_SLATES_DATA,
    SET_CURRENT_SLATE_DATA,
    PAGE_NUMBER_LOADER,
    GET_USAGE_TYPE ,
    SET_SLATE_LENGTH,
    VERSIONING_SLATEMANIFEST,
    SET_TOAST_MESSAGE,
    SHOW_TOAST_MESSAGE,
    STORE_OLD_ASSET_FOR_TCM,
    WIRIS_ALT_TEXT_POPUP,
    LEARNOSITY_PROJECT_INFO,
    SET_FIGURE_GLOSSARY,
    ADD_FIGURE_GLOSSARY_POPUP,
    WRONG_IMAGE_POPUP,
    UPDATE_MULTIPLE_COLUMN_INFO,
    SHOW_REMOVE_GLOSSARY_IMAGE,
} from '../constants/Action_Constants';

/**
 * This is the initial state and structure of app store
 * update it accordingly
 */

const INITIAL_STATE = {
    slateLevelData: {},
    // elementsTag: {},
    activeElement: {},
    splittedElementIndex: 0,
    pageNumberData: [],
    permissions: [],
    accesDeniedPopup: false,
    popupSlateData: null,
    roleId: '',
    oldImage: "",
    showHideId: "",
    parentUrn: {},
    asideData: {},
    showHideObj:{},
    allSlateData:{},
    currentSlateAncestorData:{},
    allElemPageData:[],
    pageNumberLoading:false,
    usageTypeListData:{},
    slateLength: "25",
    toastMessage:"",
    showToast:false,
    oldFiguredata : {},
    wirisAltText : {},
    isLearnosityProjectInfo:{},
    figureGlossaryData : {},
    addfigureGlossarypopup:false,
    openWrongImagePopup:false,
    multipleColumnData: [],
    removeGlossaryImage:false
};

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

/**
 * This method actually updates app store as per incoming payload
 * @param {Object} state | current state
 * @param {String} action | incoming action with payload
 */
export default function (state = INITIAL_STATE, action = INITIAL_ACTION) {
    switch (action.type) {
        case FETCH_SLATE_DATA:
            return {
                ...state,
                slateLevelData: action.payload
            };
        case SET_ACTIVE_ELEMENT:
            return {
                ...state,
                activeElement: action.payload
            };
        case AUTHORING_ELEMENT_CREATED:
        case DELETE_ELEMENT:
        case FETCH_DATA_ON_SLATE_REFRESH:
        case DELETE_SHOW_HIDE_ELEMENT:
            return {
                ...state,
                slateLevelData: action.payload.slateLevelData
            };
        case SWAP_ELEMENT:
        case UPDATE_FOOTNOTEGLOSSARY:
            return {
                ...state,
                slateLevelData: JSON.parse(JSON.stringify(action.payload.slateLevelData))
            };
        case SET_SPLIT_INDEX:
            return {
                ...state,
                splittedElementIndex: action.payload
            }
        case GET_PAGE_NUMBER:
            return {
                ...state,
                pageNumberData: action.payload.pageNumberData,
                allElemPageData: action.payload.allElemPageData
            }
        case SET_UPDATED_SLATE_TITLE:
            return {
                ...state,
                slateTitleUpdated: action.payload.title
            }
        case SET_SLATE_TYPE:
            return {
                ...state,
                slateType: action.payload
            }
        case SET_SLATE_ENTITY:
            return {
                ...state,
                setSlateEntity: action.payload
            }
        case SET_PARENT_NODE:
            return {
                ...state,
                setSlateParent: action.payload
            }
        case AUTHORING_ELEMENT_UPDATE:
        case VERSIONING_SLATEMANIFEST:
            return {
                ...state,
                slateLevelData: action.payload.slateLevelData
            }
        case GET_PROJECT_PERMISSIONS:
            return {
                ...state,
                permissions: action.payload.permissions,
                roleId: action.payload.roleId
            }
        case SET_OLD_IMAGE_PATH:
            return {
                ...state,
                oldImage: action.payload.oldImage
            };
        case UPDATE_PAGENUMBER:
        case UPDATE_PAGENUMBER_SUCCESS:
        case UPDATE_PAGENUMBER_FAIL:
            return {
                ...state,
                pageLoading: action.payload.pageLoading
            };
        case PAGE_NUMBER_LOADER:
            return {
                ...state,
                pageNumberLoading: action.payload.pageNumberLoading
            };
        case ACCESS_DENIED_POPUP:
            return {
                ...state,
                accesDeniedPopup: action.payload
            };
        case CREATE_SHOW_HIDE_ELEMENT:
            return {
                ...state,
                slateLevelData: action.payload.slateLevelData,
                showHideId: action.payload.showHideId
            };
        case OPEN_POPUP_SLATE:
            return {
                ...state,
                slateLevelData: {
                    ...state.slateLevelData,
                    [Object.keys(action.payload)[0]]: action.payload[Object.keys(action.payload)[0]]
                }
            }
        case CLOSE_POPUP_SLATE:
            let stateCopy = { ...state.slateLevelData }
            delete stateCopy[action.payload.popupId]
            return {
                ...state,
                slateLevelData: stateCopy
            }
        case SET_PARENT_ASIDE_DATA:
            return {
                ...state,
                parentUrn: action.payload.parentUrn,
                asideData: action.payload.asideData
            }
        case SET_PARENT_SHOW_DATA:
            return {
                ...state,
                showHideObj: action.payload.showHideObj
            }
        // case DELETE_SHOW_HIDE_ELEMENT:
        //     return {
        //         ...state,
        //         slateLevelData: action.payload.slateLevelData
        //     };
        case GET_ALL_SLATES_DATA:
            return {
                ...state,
                allSlateData: action.payload.allSlateData
            }
        case SET_CURRENT_SLATE_DATA:
            return {
                ...state,
                currentSlateAncestorData: action.payload.currentSlateAncestorData
            }
        case GET_USAGE_TYPE:
            return {
                ...state,
                usageTypeListData: action.payload
            }
        case SET_SLATE_LENGTH:
            return {
                ...state,
                slateLength: action.payload
            }
        case SET_TOAST_MESSAGE:
            return {
                ...state,
                toastMessage: action.payload
            }
        case SHOW_TOAST_MESSAGE:
            return {
                ...state,
                showToast: action.payload
            }
        case STORE_OLD_ASSET_FOR_TCM:
            return {
                ...state,
                oldFiguredata: action.payload.oldFiguredata
            }
        case WIRIS_ALT_TEXT_POPUP : 
        return {
            ...state,
            wirisAltText : action.payload
        }

        case LEARNOSITY_PROJECT_INFO : 
        return {
            ...state,
            isLearnosityProjectInfo : action.payload
        }
        case SET_FIGURE_GLOSSARY : 
        return {
            ...state,
            figureGlossaryData : action.payload
        }
        case ADD_FIGURE_GLOSSARY_POPUP:
            return{
                ...state,
                addfigureGlossarypopup:action.payload
            }
        case WRONG_IMAGE_POPUP:
            return{
                ...state,
                openWrongImagePopup:action.payload
            }
        case SHOW_REMOVE_GLOSSARY_IMAGE:
            return {
                ...state,
                removeGlossaryImage:action.payload
            }

        case UPDATE_MULTIPLE_COLUMN_INFO:
            if (action.key) {
                let multipleColumnData = state.multipleColumnData;
                multipleColumnData = multipleColumnData.filter(function (data) {
                    return data.containerId !== action.key
                })
                return {
                    ...state,
                    multipleColumnData: [...multipleColumnData, action.payload]
                }
            } else {
                return {
                    ...state,
                    multipleColumnData: []
                }
            }

        default:
            return state;
    }
}
