import {
    SET_SLATE_LOCK_STATUS,
    SET_LOCK_FLAG
} from '../constants/Action_Constants'

let initialState = {
    slateLockInfo : {
        isLocked: false,
        timestamp: "",
        userId: ""
    },
    withinLockPeriod: false
}

export default (state = initialState, action) => {
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