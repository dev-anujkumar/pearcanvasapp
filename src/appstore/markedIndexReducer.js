
import {OPEN_MARKED_INDEX, OPEN_MARKED_INDEX_ON_GLOSSARY} from  '../constants/Action_Constants';

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
    switch(action.type){
        case OPEN_MARKED_INDEX:
            return {
                ...state,
                markedIndexValue: action.payload.markedIndexValue,
                markedIndexCurrentValue: action.payload.markedIndexCurrentValue,
                markedIndexGlossary: action.payload.markedIndexGlossary,
                elementIndex: action.payload.elementIndex
            }
        case OPEN_MARKED_INDEX_ON_GLOSSARY:
            return {
                ...state,
                markedIndexGlossary: action.payload.markedIndexGlossary,
                markedIndexCurrentValue: action.payload.markedIndexCurrentValue
            }
        default:
            return state;
    }
}
