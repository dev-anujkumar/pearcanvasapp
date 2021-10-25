
import {OPEN_GLOSSARY_FOOTNOTE, UPDATE_NEW_ELEMENT_WORK_ID} from  '../constants/Action_Constants';

const INITIAL_STATE = {
       glossaryFootnoteValue:{"type":"","popUpStatus":false},
       glossaryFootNoteCurrentValue:'',
       elementIndex : ''
};

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

export default function (state = INITIAL_STATE, action = INITIAL_ACTION) {
    if (action.type === OPEN_GLOSSARY_FOOTNOTE) {
        return {
            ...state,
            glossaryFootnoteValue: action.payload.glossaaryFootnoteValue,
            glossaryFootNoteCurrentValue: action.payload.glossaryFootNoteCurrentValue,
            elementIndex: action.payload.elementIndex
        }
    } else if(action.type === UPDATE_NEW_ELEMENT_WORK_ID){
        return {
            ...state,
            glossaryFootnoteValue: action.payload.glossaryFootnoteValue
        }
    } else {
        return state;
    }
}
