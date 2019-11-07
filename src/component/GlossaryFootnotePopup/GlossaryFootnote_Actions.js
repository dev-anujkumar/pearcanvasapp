import axios from 'axios';
import config from '../../config/config';

import { OPEN_GLOSSARY_FOOTNOTE } from "./../../constants/Action_Constants";

let headers = {
    "Content-Type": "application/json",
    ApiKey: config.STRUCTURE_APIKEY,
    PearsonSSOSession: config.ssoToken,

}
export const glossaaryFootnotePopup = (status, glossaaryFootnote) => async (dispatch) => {
    let glossaaryFootnoteValue = { "type": glossaaryFootnote, "popUpStatus": status }
    
    return await dispatch({
        type: OPEN_GLOSSARY_FOOTNOTE,
        payload: glossaaryFootnoteValue
    });
}