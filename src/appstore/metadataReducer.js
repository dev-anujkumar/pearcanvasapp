import {
    CURRENT_SLATE_LO_DATA, SLATE_TAG_ENABLE, SHOW_MODULE_NAME, CURRENT_SLATE_LO_DATA_MATH
} from '../constants/Action_Constants';

const INIT_STATE = {
    currentSlateLOData: "",
    slateTagEnable: false,
    showModule:false,
    currentSlateLODataMath:""
}

//Save data in store for LO and LOLIST
export default function (state = INIT_STATE, action) {
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
        default:
            return state;
    }
}