import {
    CURRENT_SLATE_LO_DATA
} from '../constants/Action_Constants';

const INIT_STATE = {
    currentSlateLOData : ""
}

//Save data in store for LO and LOLIST
export default function (state = INIT_STATE, action){
    switch(action.type){
        case CURRENT_SLATE_LO_DATA:
            return {
                ...state,
                currentSlateLOData : action.payload.currentSlateLOData
            }
      
        default:
            return state; 
    }
}