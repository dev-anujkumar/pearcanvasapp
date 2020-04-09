import axios from 'axios';
import config from '../../config/config';
import store from '../../appstore/store.js'
import { sendDataToIframe } from '../../constants/utility.js';
import { HideLoader } from '../../constants/IFrameMessageTypes.js';

const {
    REACT_APP_API_URL
} = config

import { OPEN_GLOSSARY_FOOTNOTE, UPDATE_FOOTNOTEGLOSSARY, ERROR_POPUP } from "./../../constants/Action_Constants";

export const glossaaryFootnotePopup = (status, glossaaryFootnote, glossaryfootnoteid, elementWorkId, elementType, index, elementSubType, glossaryTermText, typeWithPopup) => async (dispatch) => {
    
    let glossaaryFootnoteValue = {
        "type": glossaaryFootnote,
        "popUpStatus": status,
        elementWorkId,
        elementType,
        glossaryfootnoteid,
        elementSubType,
        glossaryTermText,
        typeWithPopup : typeWithPopup ? typeWithPopup : undefined
    }

    if (status === true) {
        let semanticType = glossaaryFootnote.toUpperCase();
        const slateId = config.slateManifestURN;
        const parentData = store.getState().appStore.slateLevelData;
        let newParentData = JSON.parse(JSON.stringify(parentData));
        let newBodymatter = newParentData[slateId].contents.bodymatter;
        var footnoteContentText, glossaryFootElem, glossaryContentText, tempGlossaryContentText;
        let tempIndex = index && typeof (index) !== 'number' && index.split('-');
        if(tempIndex.length == 4 && elementType == 'figure'){ //Figure inside WE
            glossaryFootElem = newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents.bodymatter[tempIndex[2]]
        }else if(tempIndex.length == 3 && elementType == 'figure'){
            glossaryFootElem = newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]]
        }else if (elementType === "figure") {
            let tempUpdatedIndex = index.split('-');

            let updatedIndex = tempUpdatedIndex[0];
            glossaryFootElem = newBodymatter[updatedIndex]
        }
        else if (typeWithPopup && typeWithPopup === "popup" ){
            let tempIndex = index.split('-');
            let indexesLen = tempIndex.length;
            switch (indexesLen){
                case 2:
                    glossaryFootElem = newBodymatter[tempIndex[0]].popupdata["formatted-subtitle"];
                    break;

                case 3:
                    glossaryFootElem = newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].popupdata["formatted-subtitle"];
                    break;

                case 4:
                    glossaryFootElem = newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents.bodymatter[tempIndex[2]].popupdata["formatted-subtitle"];
                    break;
            }   
        }
         else {
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
                    if(elementType==='stanza'){
                        condition = newBodymatter[indexes[0]].contents.bodymatter[indexes[2]]
                    }
                    else{
                        condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]]
                    }
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
                glossaryContentText = tempGlossaryContentText && JSON.parse(tempGlossaryContentText).term || glossaryTermText
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
export const saveGlossaryAndFootnote = (elementWorkId, elementType, glossaryfootnoteid, type, term, definition, elementSubType, typeWithPopup) => {
    if(!glossaryfootnoteid) return false

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

    /** Feedback status from elementData */
    let elementNodeData = document.querySelector(`[data-id='${elementWorkId}']`)?document.querySelector(`[data-id='${elementWorkId}']`).outerHTML.includes('feedback'):false
    let tcmFeedback =  elementNodeData;

    //Get updated innerHtml of element for API request 
    if (elementType == 'figure') {
        let label, title, captions, credits, elementIndex, text
        let tempIndex = index &&  typeof (index) !== 'number' && index.split('-');
        if(tempIndex.length == 4){//Figure inside a WE
            elementIndex = tempIndex[0]+'-'+tempIndex[1]+'-'+tempIndex[2]
        }else if(tempIndex.length == 3){ //section 2 in WE figure
            elementIndex = tempIndex[0]+'-'+tempIndex[1]
        }else{
            elementIndex = tempIndex[0]
        }
        
        label = document.getElementById('cypress-' + elementIndex + '-0').innerHTML //cypress-1-0
        title = document.getElementById('cypress-' + elementIndex + '-1').innerHTML //cypress-1-1

        if(elementSubType == 'image' || elementSubType === 'tableasmarkup' || elementSubType === "audio" || elementSubType === "video" || elementSubType === 'table' || elementSubType === "mathImage"){
            captions = document.getElementById('cypress-' + elementIndex + '-2').innerHTML //cypress-1-2
            credits = document.getElementById('cypress-' + elementIndex + '-3').innerHTML //cypress-1-3
        }else if (elementSubType === 'interactive' || elementSubType === "codelisting" || elementSubType === "authoredtext"){
            captions = document.getElementById('cypress-' + elementIndex + '-3').innerHTML //cypress-1-3
            credits = document.getElementById('cypress-' + elementIndex + '-4').innerHTML //cypress-1-4
        }
        if(document.querySelector('div[data-type="mathml"] p')){
            text = document.querySelector('div[data-type="mathml"] p').innerHTML;
        }
       
        figureDataObj = {
            "title": label.match(/<p>/g) ? label : `<p>${label}</p>`,
            "subtitle": title.match(/<p>/g) ? title : `<p>${title}</p>`,
            "text": text ? text : "",
            "postertext": "",
            "tableasHTML": "",
            "captions": captions ? captions.match(/<p>/g) ? captions : `<p>${captions}</p>` : "<p></p>",
            "credits": credits ? credits.match(/<p>/g) ? credits : `<p>${credits}</p>` : "<p></p>"
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
                feedback: tcmFeedback,
                html: {
                    ...figureDataObj,
                    glossaryentries: {},
                    footnotes: footnoteEntry,
                    assetspopover: {}
                },
                projectURN : config.projectUrn,
                slateEntity : config.slateEntityURN
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
                feedback: tcmFeedback,
                html: {
                    ...figureDataObj,
                    glossaryentries: glossaryEntry,
                    footnotes: {},
                    assetspopover: {}
                },
                projectURN : config.projectUrn,
                slateEntity : config.slateEntityURN
            }
            break;
    }

    if(index &&  typeof (index) !== 'number' && elementType !== 'figure'  && typeWithPopup !== 'popup'){
        let tempIndex =  index.split('-');
        if(tempIndex.length === 2){
            if(newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].id === elementWorkId){
                data.isHead = true;
                if(newBodymatter[tempIndex[0]].subtype === "sidebar"){
                    data.parentType = "element-aside";
                }else{
                    data.parentType = "workedexample";
                }
            }
        }else if(tempIndex.length === 3){
            if(elementType==='stanza'){
                if (newBodymatter[tempIndex[0]].contents.bodymatter[tempIndex[2]].id === elementWorkId){
                    data.isHead = false;
                }
            }
            else if(newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents.bodymatter[tempIndex[2]].id === elementWorkId){
                data.isHead = false;
                if(newBodymatter[tempIndex[0]].subtype === "workedexample"){
                    data.parentType = "workedexample";
                }
            }
        }
    }

    sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })  //show saving spinner
    
    let url = `${config.REACT_APP_API_URL}v1/slate/element?type=${type.toUpperCase()}&id=${glossaryfootnoteid}`
    
    return axios.put(url, JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken
        }
    }).then(res => {
        let parentData = store.getState().appStore.slateLevelData;
        let currentParentData = JSON.parse(JSON.stringify(parentData));
        let currentSlateData = currentParentData[config.slateManifestURN];
        if(res.data.id !== data.id && currentSlateData.status === 'approved'){
            sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
        }
        let tempIndex = index &&  typeof (index) !== 'number' && index.split('-');
        if(tempIndex.length == 4 && typeWithPopup !== "popup"){//Figure inside a WE
            newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents.bodymatter[tempIndex[2]] = res.data
        }else if(tempIndex.length ==3 && elementType =='figure'){//section 2 figure in WE
            newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]] = res.data
        }else if (elementType === "figure") {
            let updatedIndex = index.split('-')[0];
            newBodymatter[updatedIndex] = res.data;
        } 
        else if (typeWithPopup && typeWithPopup === "popup"){
            let tempIndex = index.split('-');
            let indexesLen = tempIndex.length
            switch (indexesLen){
                case 2:
                    newBodymatter[tempIndex[0]].popupdata["formatted-subtitle"] = res.data;
                    break;

                case 3:
                    newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].popupdata["formatted-subtitle"] = res.data;
                    break;

                case 4:
                    newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents.bodymatter[tempIndex[2]].popupdata["formatted-subtitle"] = res.data;
                    break;
            }
        }
        else {
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
                    if(elementType==='stanza'){
                        condition = newBodymatter[indexes[0]].contents.bodymatter[indexes[2]]
                    }
                    else{
                        condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]]
                    }
                    if (condition.versionUrn == elementWorkId) {
                        if(elementType==='stanza'){
                            newBodymatter[indexes[0]].contents.bodymatter[indexes[2]] = res.data
                        }
                        else{
                            newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]] = res.data
                        }
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
        sendDataToIframe({'type': HideLoader,'message': { status: false }});  
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })  //hide saving spinner
    }).catch(err => {
        store.dispatch({type: ERROR_POPUP, payload:{show: true}})
        console.log("save glossary footnote API error : ", err);
        sendDataToIframe({'type': HideLoader,'message': { status: false }});
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })  //hide saving spinner
    })
}