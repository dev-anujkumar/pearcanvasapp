
import {OPEN_GLOSSARY_FOOTNOTE, ADD_GLOSSARY_FOOTNOTE} from  '../constants/Action_Constants';



const initialState = {
       glossaryFootnoteValue:{"type":"","popUpStatus":false}
};
export default function (state = initialState, action) {
    switch(action.type){


            case OPEN_GLOSSARY_FOOTNOTE:
            return {
                ...state,
                glossaryFootnoteValue: action.payload
            }
        default:
            return state;
    }
}
