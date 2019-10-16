import {
    CURRENT_SLATE_LO_DATA, IS_LOELEMENT_EXIST
} from '../constants/Action_Constants';

const INIT_STATE = {
    currentSlateLOData : "",
    isLO:false
}

export default function (state = INIT_STATE, action){
    switch(action.type){
        case CURRENT_SLATE_LO_DATA:
            return {
                ...state,
                currentSlateLOData : action.payload.currentSlateLOData
            }
        case IS_LOELEMENT_EXIST: {
            return {
                    ...state,
                    isLO:action.payload
                }
        }
        default:
            return state; 
    }
}