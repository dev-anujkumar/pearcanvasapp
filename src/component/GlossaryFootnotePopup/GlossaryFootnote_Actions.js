import axios from 'axios';
import config from '../../config/config';

const {
    REACT_APP_API_URL
} = config

import { OPEN_GLOSSARY_FOOTNOTE } from "./../../constants/Action_Constants";

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
    let footnoteEntry = Object.create({})
    let semanticType = type.toUpperCase()
    let data = {}
    switch(semanticType){
        case "FOOTNOTE":
                footnoteEntry[glossaryfootnoteid] = {
                definition
            }
            data = {
                id: elementWorkId,
                type: elementType,
                versionUrn: null,
                contentUrn: null,
                html: {
                    text: null,
                    glossaryentries: {},
                    footnotes: footnoteEntry,
                    assetspopover: {}
                }
            }
            break;

        case "GLOSSARY":
                glossaryEntry[glossaryfootnoteid] = {
                    term,
                    definition
                }
               data = {
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
            break;
    }
    
    let url = `${REACT_APP_API_URL}v1/slate/element?type=${type.toUpperCase()}&id=${glossaryfootnoteid}`
    axios.put(url, JSON.stringify(data), {
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