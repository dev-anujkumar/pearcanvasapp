import {
    SET_SLATE_LOCK_STATUS,
    SET_LOCK_FLAG
} from '../constants/Action_Constants'

let INITIAL_STATE = {
    slateLockInfo : {
        isLocked: false,
        timestamp: "",
        userId: ""
    },
    withinLockPeriod: false
}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

export default (state = INITIAL_STATE, action = INITIAL_ACTION) => {
    switch(action.type){
        case SET_SLATE_LOCK_STATUS:
            return {
                ...state,
                slateLockInfo: action.payload
            }
        case SET_LOCK_FLAG:
            return {
                ...state,
                withinLockPeriod: action.payload
            }
        default:
            return state
    }
}