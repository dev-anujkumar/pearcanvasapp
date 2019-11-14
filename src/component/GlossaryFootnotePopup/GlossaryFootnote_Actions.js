import axios from 'axios';
import config from '../../config/config';
import store from '../../appstore/store.js'

const {
    REACT_APP_API_URL
} = config

import { OPEN_GLOSSARY_FOOTNOTE, UPDATE_FOOTNOTEGLOSSARY } from "./../../constants/Action_Constants";

export const glossaaryFootnotePopup = (status, glossaaryFootnote, glossaryfootnoteid, elementWorkId, elementType, index) => async (dispatch) => {
    let glossaaryFootnoteValue = {
        "type": glossaaryFootnote,
        "popUpStatus": status,
        elementWorkId,
        elementType,
        glossaryfootnoteid
    }

    if (status === true) {

        let semanticType = glossaaryFootnote.toUpperCase();
        const slateId = config.slateManifestURN;
        const parentData = store.getState().appStore.slateLevelData;

        let newParentData = JSON.parse(JSON.stringify(parentData));
        let newBodymatter = newParentData[slateId].contents.bodymatter;
        var footnoteContentText, glossaryFootElem, glossaryContentText, tempGlossaryContentText;

        if (typeof (index) == 'number') {
            if (newBodymatter[index].versionUrn == elementWorkId) {
                glossaryFootElem = newBodymatter[index]
            }
        } else {
            let indexes = index.split('-');
            let indexesLen = indexes.length, condition;
            if (indexesLen == 2) {
                condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]]
                if (condition.versionUrn == elementWorkId) {
                    glossaryFootElem = condition
                }
            } else if (indexesLen == 3) {
                condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]]
                if (condition.versionUrn == elementWorkId) {
                    glossaryFootElem = condition
                }
            }

        }


        switch (semanticType) {
            case 'FOOTNOTE':
                footnoteContentText = glossaryFootElem && glossaryFootElem.html['footnotes'] && glossaryFootElem.html['footnotes'][glossaryfootnoteid]
                break;
            case 'GLOSSARY':
                tempGlossaryContentText = glossaryFootElem && glossaryFootElem.html['glossaryentries'] && glossaryFootElem.html['glossaryentries'][glossaryfootnoteid]
                footnoteContentText = tempGlossaryContentText && JSON.parse(tempGlossaryContentText).definition
                glossaryContentText = tempGlossaryContentText && JSON.parse(tempGlossaryContentText).term
        }
    }
    return await dispatch({
        type: OPEN_GLOSSARY_FOOTNOTE,
        payload: {
            glossaaryFootnoteValue: glossaaryFootnoteValue,
            glossaryFootNoteCurrentValue: {
                footnoteContentText,
                glossaryContentText,
            },
            elementIndex: index
        }
    });
}

/**
 * saveGlossaryAndFootnote | this method is used for to save glossary and footnote
 * @param {*} elementWorkId, element's workurn of which glosssary&footnote is being saved
 * @param {*} elementType, element's type of which glosssary&footnote is being saved
 * @param {*} glossaryfootnoteid, glosary/footnote's work id
 * @param {*} type, type whether glossary or footnote
 */
export const saveGlossaryAndFootnote = (elementWorkId, elementType, glossaryfootnoteid, type, term, definition, elementInnerHtml) => {
    let glossaryEntry = Object.create({})
    let footnoteEntry = Object.create({})
    let semanticType = type.toUpperCase()
    let data = {}
    var index = store.getState().glossaryFootnoteReducer.elementIndex;
    const slateId = config.slateManifestURN;
    const parentData = store.getState().appStore.slateLevelData;
    let newParentData = JSON.parse(JSON.stringify(parentData));
    let newBodymatter = newParentData[slateId].contents.bodymatter;
    switch (semanticType) {
        case "FOOTNOTE":
            footnoteEntry[glossaryfootnoteid] = definition
            data = {
                id: elementWorkId,
                type: elementType,
                versionUrn: null,
                contentUrn: null,
                html: {
                    text: elementInnerHtml,
                    glossaryentries: {},
                    footnotes: footnoteEntry,
                    assetspopover: {}
                }
            }
            break;

        case "GLOSSARY":
            glossaryEntry[glossaryfootnoteid] = JSON.stringify({
                term,
                definition
            })
            data = {
                id: elementWorkId,
                type: elementType,
                versionUrn: null,
                contentUrn: null,
                html: {
                    text: elementInnerHtml,
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

        if (typeof (index) == 'number') {
            if (newBodymatter[index].versionUrn == elementWorkId) {
                newBodymatter[index] = res.data
            }
        } else {
            let indexes = index.split('-');
            let indexesLen = indexes.length, condition;
            if (indexesLen == 2) {
                condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]]
                if (condition.versionUrn == elementWorkId) {
                    newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]] = res.data
                }
            } else if (indexesLen == 3) {
                condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]]
                if (condition.versionUrn == elementWorkId) {
                    newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]] = res.data
                }
            }

        }
        store.dispatch({
            type: UPDATE_FOOTNOTEGLOSSARY,
            payload: {
                slateLevelData: newParentData
            }
        })
    }).catch(err => {
        console.log("save glossary footnote API error : ", err)
    })
}