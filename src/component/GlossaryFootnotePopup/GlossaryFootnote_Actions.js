import axios from 'axios';
import config from '../../config/config';

const {
    REACT_APP_API_URL
} = config

import { OPEN_GLOSSARY_FOOTNOTE } from "./../../constants/Action_Constants";

let headers = {
    "Content-Type": "application/json",
    ApiKey: config.STRUCTURE_APIKEY,
    PearsonSSOSession: config.ssoToken,

}
export const glossaaryFootnotePopup = (status, glossaaryFootnote, glossaryfootnoteid, elementWorkId, elementType) => async (dispatch) => {
    let glossaaryFootnoteValue = {
        "type": glossaaryFootnote,
        "popUpStatus": status,
        elementWorkId,
        elementType,
        glossaryfootnoteid
    }

    return await dispatch({
        type: OPEN_GLOSSARY_FOOTNOTE,
        payload: glossaaryFootnoteValue
    });
}

/**
 * saveGlossaryAndFootnote | this method is used for to save glossary and footnote
 * @param {*} elementWorkId, element's workurn of which glosssary&footnote is being saved
 * @param {*} elementType, element's type of which glosssary&footnote is being saved
 * @param {*} glossaryfootnoteid, glosary/footnote's work id
 * @param {*} type, type whether glossary or footnote
 */
export const saveGlossaryAndFootnote = (elementWorkId, elementType, glossaryfootnoteid, type, term, definition) => {
    let glossaryEntry = Object.create({})
    glossaryEntry[glossaryfootnoteid] = {
        term,
        definition
    }
    let data = {
        id: elementWorkId,
        type: elementType,
        versionUrn: null,
        contentUrn: null,
        html: {
            text: null,
            glossaryentries: glossaryEntry,
            footnotes: {},
            assetspopover: {}
        }
    }
    let url = `${REACT_APP_API_URL}v1/slate/element?type=${type.toUpperCase()}&id=${glossaryfootnoteid}`
    axios.post(url, JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken
        }
    }).then(res => {
        console.log("save glossary footnote API success : ", res)
    }).catch(err => {
        console.log("save glossary footnote API error : ", err)
    })
}