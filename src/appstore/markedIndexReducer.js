
import {OPEN_MARKED_INDEX} from  '../constants/Action_Constants';

const INITIAL_STATE = {
    markedIndexValue: { "type": "", "popUpStatus": false },
    markedIndexCurrentValue: '',
    elementIndex: ''
};

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

export default function (state = INITIAL_STATE, action = INITIAL_ACTION) {
    if (action.type === OPEN_MARKED_INDEX) {
        return {
            ...state,
            markedIndexValue: action.payload.markedIndexValue,
            markedIndexCurrentValue: action.payload.markedIndexCurrentValue,
            elementIndex: action.payload.elementIndex
        }
    } else {
        return state;
    }
}
