import {
    SET_SLATE_LOCK_STATUS
} from '../constants/Action_Constants'

let initialState = {
    slateLockInfo : {
        isLocked: false,
        timestamp: "",
        userId: ""
    }  
}

export default (state = initialState, action) => {
    switch(action.type){
        case SET_SLATE_LOCK_STATUS:
            return {
                ...state,
                slateLockInfo: action.payload
            }
        default:
            return state
    }
}