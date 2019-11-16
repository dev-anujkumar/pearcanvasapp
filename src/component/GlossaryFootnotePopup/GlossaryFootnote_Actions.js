import axios from 'axios';
import config from '../../config/config';
import store from '../../appstore/store.js'

const {
    REACT_APP_API_URL
} = config

import { OPEN_GLOSSARY_FOOTNOTE, UPDATE_FOOTNOTEGLOSSARY } from "./../../constants/Action_Constants";

export const glossaaryFootnotePopup = (status, glossaaryFootnote, glossaryfootnoteid, elementWorkId, elementType, index, elementSubType) => async (dispatch) => {
    let glossaaryFootnoteValue = {
        "type": glossaaryFootnote,
        "popUpStatus": status,
        elementWorkId,
        elementType,
        glossaryfootnoteid,
        elementSubType
    }

    if (status === true) {
        let semanticType = glossaaryFootnote.toUpperCase();
        const slateId = config.slateManifestURN;
        const parentData = store.getState().appStore.slateLevelData;
        let newParentData = JSON.parse(JSON.stringify(parentData));
        let newBodymatter = newParentData[slateId].contents.bodymatter;
        var footnoteContentText, glossaryFootElem, glossaryContentText, tempGlossaryContentText;
        console.log('thsi si sinner html', index)

        if (elementType === "figure") {
            let tempUpdatedIndex = index.split('-');

            let updatedIndex = tempUpdatedIndex[0];
            // console.log("newBodymatter[updatedIndex ", newBodymatter[updatedIndex].html.footnotes[elementWorkId]);
            glossaryFootElem = newBodymatter[updatedIndex]
            // console.log('This si index', glossaaryFootnoteValue, index, newBodymatter[updatedIndex])
        } else {
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
export const saveGlossaryAndFootnote = (elementWorkId, elementType, glossaryfootnoteid, type, term, definition, elementSubType) => {
    let glossaryEntry = Object.create({})
    let footnoteEntry = Object.create({})
    let semanticType = type.toUpperCase()
    let data = {}, figureDataObj
    var index = store.getState().glossaryFootnoteReducer.elementIndex;
    const slateId = config.slateManifestURN;
    const parentData = store.getState().appStore.slateLevelData;
    let newParentData = JSON.parse(JSON.stringify(parentData));
    let newBodymatter = newParentData[slateId].contents.bodymatter;
    let workEditor, workContainer;

    //Get updated innerHtml of element for API request 
    if (elementType == 'figure') {
        console.log('thsis is index in figure', index)
        let label, title, captions, credits, elementIndex
        elementIndex = index.split('-')[0]
        label = document.getElementById('cypress-' + elementIndex + '-0').innerHTML //cypress-1-0
        title = document.getElementById('cypress-' + elementIndex + '-1').innerHTML //cypress-1-1

        if(elementSubType == 'image'){
            captions = document.getElementById('cypress-' + elementIndex + '-2').innerHTML //cypress-1-2
            credits = document.getElementById('cypress-' + elementIndex + '-3').innerHTML //cypress-1-3
        }else if (elementSubType == 'interactive'){
            captions = document.getElementById('cypress-' + elementIndex + '-3').innerHTML //cypress-1-3
            credits = document.getElementById('cypress-' + elementIndex + '-4').innerHTML //cypress-1-4
        }
       
        figureDataObj = {
            "title": label,
            "subtitle": title,
            "text": "",
            "postertext": "",
            "tableasHTML": "",
            "captions": captions,
            "credits": credits
        }
    } else {
        workEditor = document.getElementById('cypress-' + index)
        workContainer = workEditor.innerHTML;
        figureDataObj = {
            "text": workContainer
        }
    }

    switch (semanticType) {
        case "FOOTNOTE":
            footnoteEntry[glossaryfootnoteid] = definition
            data = {
                id: elementWorkId,
                type: elementType,
                versionUrn: null,
                contentUrn: null,
                html: {
                    ...figureDataObj,
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
                    ...figureDataObj,
                    glossaryentries: glossaryEntry,
                    footnotes: {},
                    assetspopover: {}
                }
            }
            break;
    }

    console.log('>>>>>>>>>>>>> data', data)
    let url = `${REACT_APP_API_URL}v1/slate/element?type=${type.toUpperCase()}&id=${glossaryfootnoteid}`
    axios.put(url, JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken
        }
    }).then(res => {
        console.log('this is index in case of any ', index)
        if (elementType === "figure") {
            let updatedIndex = index.split('-')[0];
            newBodymatter[updatedIndex] = res.data;
            console.log('>>>>>>>>', newBodymatter[updatedIndex])
        } else {
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