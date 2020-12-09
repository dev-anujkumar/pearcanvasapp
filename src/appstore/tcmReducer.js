import { 
    GET_TCM_RESOURCES, 
    GET_TCM_STATUS_OF_PROJECT
} from '../constants/Action_Constants.js';
const INITIAL_STATE = {
    tcmSnapshot: [],
    tcmActivatedOnProjectLevel: false
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
        default:
            return state
    }
}