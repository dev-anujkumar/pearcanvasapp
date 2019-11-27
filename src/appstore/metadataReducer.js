import {
    CURRENT_SLATE_LO_DATA, SLATE_TAG_ENABLE, SHOW_MODULE_NAME, CURRENT_SLATE_LO_DATA_MATH, SHOW_SLATE_LOCK_POPUP
} from '../constants/Action_Constants';

const INIT_STATE = {
    currentSlateLOData: "",
    slateTagEnable: false,
    showModule:false,
    currentSlateLODataMath:"",
    showSlateLockPopup:false
}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

//Save data in store for LO and LOLIST
export default function (state = INIT_STATE, action = INITIAL_ACTION) {
    switch (action.type) {
        case CURRENT_SLATE_LO_DATA:
            return {
                ...state,
                currentSlateLOData: action.payload.currentSlateLOData
            }
        case SLATE_TAG_ENABLE:
            return {
                ...state,
                slateTagEnable: action.payload
            }
        case SHOW_MODULE_NAME: {
            return {
                ...state,
                showModule: action.payload
            }
        }
        case CURRENT_SLATE_LO_DATA_MATH: {
             return {
                ...state,
                currentSlateLODataMath : action.payload.currentSlateLODataMath
            }
        }
        case SHOW_SLATE_LOCK_POPUP: {
            return {
               ...state,
               showSlateLockPopup : action.payload
           }
       }
        
        default:
            return state;
    }
}