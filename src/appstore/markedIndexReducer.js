
import {OPEN_MARKED_INDEX, OPEN_MARKED_INDEX_ON_GLOSSARY, SET_MARKED_INDEX_SAVED_VALUE} from  '../constants/Action_Constants';

const INITIAL_STATE = {
    markedIndexValue: { "type": "", "popUpStatus": false },
    markedIndexCurrentValue: '',
    elementIndex: '',
    markedIndexGlossary: {popUpStatus: false,  indexEntries: {}, markedIndexEntryURN: '', }
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
    } else if(action.type === OPEN_MARKED_INDEX_ON_GLOSSARY){
        return {
            ...state,
            markedIndexGlossary: action.payload.markedIndexGlossary
        }
    }  else if(action.type === SET_MARKED_INDEX_SAVED_VALUE){
        return {
            ...state,
            markedIndexCurrentValue: action.payload.markedIndexCurrentValue,
        }
    } else {
        return state;
    }
}
