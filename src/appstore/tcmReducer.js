import { 
    GET_TCM_RESOURCES, 
    GET_TCM_STATUS_OF_PROJECT,
    LAUNCH_TCM_CANVAS_POPUP
} from '../constants/Action_Constants.js';
const INITIAL_STATE = {
    tcmSnapshot: [],
    tcmActivatedOnProjectLevel: false,
    isTCMCanvasPopupLaunched : false,
    tcmSnapshotData: []
}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

export default function (state = INITIAL_STATE, action = INITIAL_ACTION) {
    switch (action.type) {
        case GET_TCM_RESOURCES:
            return {
                ...state,
                tcmSnapshot: action.payload.data
            }
        case GET_TCM_STATUS_OF_PROJECT:
            return {
                ...state,
                tcmActivatedOnProjectLevel: action.payload.tcm_activated_project
            }
            case LAUNCH_TCM_CANVAS_POPUP:
                return {
                    ...state,
                    isTCMCanvasPopupLaunched: action.payload.isTCMCanvasPopup,
                    tcmSnapshotData: action.payload.tcmElemData
                }
        default:
            return state
    }
}