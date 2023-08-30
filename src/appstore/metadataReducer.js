import {
    CURRENT_SLATE_LO_DATA, SLATE_TAG_ENABLE, SHOW_MODULE_NAME, CURRENT_SLATE_LO_DATA_MATH, SHOW_SLATE_LOCK_POPUP,RE_RENDER_META_LO,
    PROJECT_LEARNING_FRAMEWORKS, CURRENT_SLATE_LF, TOGGLE_LO_WARNING_POPUP, DEFAULT_LF
} from '../constants/Action_Constants';

const INIT_STATE = {
    currentSlateLOData: "",
    slateTagEnable: false,
    showModule:false,
    currentSlateLODataMath:"",
    showSlateLockPopup:false,
    isRenderMetdataLO:false,
    projectLearningFrameworks:{
        externalLF:[]
    },
    currentSlateLF:"",
    loWarningPopupData: {},
    lastAlignedExternalLO:{},
    defaultLF: ""
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
        case "UPDATE_LAST_ALIGNED_LO":
            return {
                ...state,
                lastAlignedExternalLO: action.payload.lastAlignedExternalLO
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
        case RE_RENDER_META_LO: {
            return {
                ...state,
                isRenderMetdataLO: action.payload
            }
        }
        case PROJECT_LEARNING_FRAMEWORKS:
            const { cypressLF, externalLF } = action.payload
            return {
                ...state,
                projectLearningFrameworks: {
                    externalLF: externalLF ?? state.projectLearningFrameworks.externalLF
                }
            }
        case CURRENT_SLATE_LF:
            return {
                ...state,
                currentSlateLF: action.payload.currentSlateLF
            }
        case TOGGLE_LO_WARNING_POPUP:
            return {
                ...state,
                loWarningPopupData: action.payload
            }
        case DEFAULT_LF:
            return {
                ...state,
                defaultLF: action.payload.defaultLF
            }
        default:
            return state;
    }
}