import {
    SET_USAGE_TYPE,
    ELM_ITEM_EVENT_DATA,
    SET_ITEM_UPDATE_EVENT,
    ELM_ASSESSMENT_EDIT_ID,
    SET_ASSESSMENT_METADATA,
    RESET_ASSESSMENT_STORE,
    ASSESSMENT_CONFIRMATION_POPUP,
    UPDATE_ELM_ITEM_ID,
    SAVE_AUTO_UPDATE_ID,
    ELM_NEW_ITEM_DATA
} from '../constants/Action_Constants';

const INITIAL_STATE = {
    usageTypeListData: {},
    currentEditAssessment:{},
    itemUpdateEvent:false
}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

export default function assessmentReducer(state = INITIAL_STATE, action = INITIAL_ACTION) {
    switch (action.type) {
        case SET_USAGE_TYPE:
            return {
                ...state,
                usageTypeListData: action.payload.usageTypeList
            }
        case SET_ASSESSMENT_METADATA:
            return {
                ...state,
                [action.payload.currentWorkUrn]: {
                    ...state[action.payload.currentWorkUrn],
                    ...action.payload.dataForUpdate
                }
            }
        case ASSESSMENT_CONFIRMATION_POPUP: {
            return {
                ...state,
                showConfirmationPopup: action.payload
            }
        }
        case UPDATE_ELM_ITEM_ID:
            let itemsArray = state[action.payload.currentWorkUrn] && state[action.payload.currentWorkUrn].items ? state[action.payload.currentWorkUrn].items : []
            const itemIndex = itemsArray ? itemsArray.findIndex(item => item.oldItemId == action.payload.updatedItem.oldItemId) : -1;
            if (itemIndex != -1) {
                itemsArray.splice(itemIndex, 1, action.payload.updatedItem)
            }
            else {
                itemsArray.push(action.payload.updatedItem)
                state[action.payload.currentWorkUrn].items = itemsArray;
            }
            return {
                ...state,
                [action.payload.currentWorkUrn]: {
                    ...state[action.payload.currentWorkUrn],
                }
            }
        case SAVE_AUTO_UPDATE_ID:
            return {
                ...state,
                saveAutoUpdateData: action.payload
            }
        case ELM_ASSESSMENT_EDIT_ID:
            return {
                ...state,
                currentEditAssessment: action.payload.currentEditAssessment
            }
        case ELM_ITEM_EVENT_DATA:
            return {
                ...state,
                latestItemAssessment: action.payload
            }
        case SET_ITEM_UPDATE_EVENT:
            return {
                ...state,
                itemUpdateEvent: action.payload
            }
        case RESET_ASSESSMENT_STORE:
            return {
                currentEditAssessment: state.currentEditAssessment,
                latestItemAssessment: state.latestItemAssessment,
                itemUpdateEvent: state.itemUpdateEvent
            }
        case ELM_NEW_ITEM_DATA:
            return {
                ...state,
                item: action.payload
            }
        default:
            return state
    }
}