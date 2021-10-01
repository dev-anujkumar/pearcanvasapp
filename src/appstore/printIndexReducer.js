
import {OPEN_PRINT_INDEX} from  '../constants/Action_Constants';

const INITIAL_STATE = {
    popUpStatus: false
};

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

export default function (state = INITIAL_STATE, action = INITIAL_ACTION) {
    if (action.type === OPEN_PRINT_INDEX) {
        return {
            ...state,
            popUpStatus: action.payload
        }
    } else {
        return state;
    }
}
