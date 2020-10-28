import {
    GET_USAGE_TYPE,
    SET_ASSESSMENT_STATUS,
    GET_ASSESSMENT_VERSIONS,
    RESET_ASSESSMENT_STORE,
    ASSESSMENT_CONFIRMATION_POPUP,
    UPDATE_ELM_ITEM_ID
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
        case UPDATE_ELM_ITEM_ID:
            let innerItems = state[action.payload.currentWorkUrn].items && Object.keys(state[action.payload.currentWorkUrn].items)
            if (innerItems && innerItems.find(oldId => oldId == action.payload.updatedItem.oldItemId)) {
                state[action.payload.currentWorkUrn].items[action.payload.updatedItem.oldItemId] = action.payload.updatedItem.latestItemId
            }
            else {
                state[action.payload.currentWorkUrn].items = {
                    ...state[action.payload.currentWorkUrn].items,
                    [action.payload.updatedItem.oldItemId]: action.payload.updatedItem.latestItemId
                }
            }
            return {
                ...state,
                [action.payload.currentWorkUrn]: {
                    ...state[action.payload.currentWorkUrn],
                }
            }
        default:
            return state
    }
}