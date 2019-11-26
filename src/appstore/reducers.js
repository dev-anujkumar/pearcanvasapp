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
    ADD_COMMENT,
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
    OPEN_POPUP_SLATE
} from '../constants/Action_Constants';

/**
 * This is the initial state and structure of app store
 * update it accordingly
 */

const initialState = {
    slateLevelData: {},
    // elementsTag: {},
    activeElement: {},
    splittedElementIndex: 0,
    pageNumberData: {},
    permissions: [],
    accesDeniedPopup: false,
    popupSlateData:null
};

/**
 * This method actually updates app store as per incoming payload
 * @param {Object} state | current state
 * @param {String} action | incoming action with payload
 */
export default function (state = initialState, action) {
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
            }
        case AUTHORING_ELEMENT_CREATED:
            return {
                ...state,
                slateLevelData: action.payload.slateLevelData
            };
        case ADD_COMMENT:
            return {
                ...state,
                slateLevelData: action.payload
            };
        case DELETE_ELEMENT:
            return {
                ...state,
                slateLevelData: action.payload.slateLevelData
            };
        case FETCH_DATA_ON_SLATE_REFRESH:
            return {
                ...state,
                slateLevelData: action.payload.slateLevelData
            };
        case SWAP_ELEMENT:
            return {
                ...state,
                slateLevelData: JSON.parse(JSON.stringify(action.payload.slateLevelData))
            }
        case SET_SPLIT_INDEX:
            return {
                ...state,
                splittedElementIndex: action.payload
            }
        case GET_PAGE_NUMBER:
            return {
                ...state,
                pageNumberData: action.payload
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
            return {
                ...state,
                slateLevelData: action.payload.slateLevelData
            }
        case GET_PROJECT_PERMISSIONS:
            return {
                ...state,
                permissions: action.payload
            }
        case SET_OLD_IMAGE_PATH:
            return {
                ...state,
                oldImage: action.payload.oldImage
            }
        case UPDATE_PAGENUMBER_SUCCESS:
            return {
                ...state,
                //slateLevelData: action.payload.slateLevelData,
                pageLoading: action.payload.pageLoading
            }
        case UPDATE_PAGENUMBER:
            return {
                ...state,
                pageLoading: action.payload.pageLoading
            }
        case ACCESS_DENIED_POPUP:
            return {
                ...state,
                accesDeniedPopup: action.payload
            }
        case UPDATE_PAGENUMBER_FAIL:
            return {
                ...state,
                pageLoading: action.payload.pageLoading
            }
        case UPDATE_FOOTNOTEGLOSSARY:
            return {
                ...state,
                slateLevelData: JSON.parse(JSON.stringify(action.payload.slateLevelData))
            }
        case OPEN_POPUP_SLATE:
            return {
                ...state,
               popupSlateData:action.payload
            }
        default:
            return state;
    }
}