import {
    GET_USAGE_TYPE,
    SET_ASSESSMENT_STATUS,
    GET_ASSESSMENT_VERSIONS,
    RESET_ASSESSMENT_STORE,
    ASSESSMENT_CONFIRMATION_POPUP
} from '../constants/Action_Constants';

const INITIAL_STATE = {
    usageTypeListData: {}
}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

export default function assessmentReducer(state = INITIAL_STATE, action = INITIAL_ACTION) {
    switch (action.type) {
        case GET_USAGE_TYPE:
            return {
                ...state,
                usageTypeListData: action.payload
            }
        case SET_ASSESSMENT_STATUS:
            return {
                ...state,
                [action.payload.currentWorkUrn]: {
                    ...state[action.payload.currentWorkUrn],
                    ...action.payload.dataForUpdate
                }
            }
            // return {
            //     ...state,
            //     ...action.payload
            // }
        case GET_ASSESSMENT_VERSIONS:
            return {
                ...state,
                [action.payload.currentWorkUrn]: {
                    ...state[action.payload.currentWorkUrn],
                    latestWorkUrn: action.payload.latestWorkUrn,
                    showUpdateStatus: action.payload.showUpdateStatus
                },
            }
        case ASSESSMENT_CONFIRMATION_POPUP: {
            return {
                ...state,
                showConfirmationPopup: action.payload
            }
        }
        case RESET_ASSESSMENT_STORE:
            return {}
        default:
            return state
    }
}