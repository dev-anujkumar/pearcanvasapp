
import {OPEN_GLOSSARY_FOOTNOTE, ADD_GLOSSARY_FOOTNOTE} from  '../constants/Action_Constants';



const initialState = {
       glossaryFootnoteValue:{"type":"","popUpStatus":false},
       glossaryFootNoteCurrentValue:'',
       elementIndex : ''
};
export default function (state = initialState, action) {
    switch(action.type){

            case OPEN_GLOSSARY_FOOTNOTE:
                    console.log('????',action.payload)
            return {
                ...state,
                glossaryFootnoteValue: action.payload.glossaaryFootnoteValue,
                glossaryFootNoteCurrentValue : action.payload.glossaryFootNoteCurrentValue,
                elementIndex :  action.payload.elementIndex
            }
        default:
            return state;
    }
}
