import axios from 'axios';
import config from '../../config/config';

import { OPEN_GLOSSARY_FOOTNOTE } from "./../../constants/Action_Constants";

let headers = {
    "Content-Type": "application/json",
    ApiKey: config.STRUCTURE_APIKEY,
    PearsonSSOSession: config.ssoToken,

}
export const glossaaryFootnotePopup = (status, glossaaryFootnote) => (dispatch) => {
    let glossaaryFootnoteValue = { "type": glossaaryFootnote, "popUpStatus": status }
    dispatch({
        type: OPEN_GLOSSARY_FOOTNOTE,
        payload: glossaaryFootnoteValue
    });
}

/* export const addGlossaryFootnote = (glossaryFootnote, elementId) => (dispatch, getState) => {

    // let url = ``
    let newglossaryFootnote = {
        term:glossaryFootnote,
        definition:"term",
        note:"term"
    };
    newglossaryFootnote = JSON.stringify(newglossaryFootnote);
    // return axios.post(url, newglossaryFootnote,
    //     { headers: headers }
    // )
    //     .then(response => {

    //        console.log("response",response.data)
    //         }
            dispatch({
                type: ADD_GLOSSARY_FOOTNOTE,
                payload: newglossaryFootnote
            });

        // }).catch(error => {
        //     console.log("Failed to add comment", error);
        // })
} */