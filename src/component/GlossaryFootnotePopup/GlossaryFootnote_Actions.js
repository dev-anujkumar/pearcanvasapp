import axios from 'axios';
import config from '../../config/config';
import store from '../../appstore/store.js'
import { sendDataToIframe, createTitleSubtitleModel } from '../../constants/utility.js';
import { HideLoader } from '../../constants/IFrameMessageTypes.js';
import { prepareTcmSnapshots } from '../TcmSnapshots/TcmSnapshots_Utility.js';

const {
    REACT_APP_API_URL
} = config

import { OPEN_GLOSSARY_FOOTNOTE, UPDATE_FOOTNOTEGLOSSARY, ERROR_POPUP, GET_TCM_RESOURCES } from "./../../constants/Action_Constants";

export const glossaaryFootnotePopup = (status, glossaaryFootnote, glossaryfootnoteid, elementWorkId, elementType, index, elementSubType, glossaryTermText, typeWithPopup, poetryField) => async (dispatch) => {
    
    let glossaaryFootnoteValue = {
        "type": glossaaryFootnote,
        "popUpStatus": status,
        elementWorkId,
        elementType,
        glossaryfootnoteid,
        elementSubType,
        glossaryTermText,
        typeWithPopup : typeWithPopup ? typeWithPopup : undefined,
        poetryField : poetryField ? poetryField : undefined
    }

    if (status === true) {
        let semanticType = glossaaryFootnote.toUpperCase();
        const slateId = config.slateManifestURN;
        const parentData = store.getState().appStore.slateLevelData;
        let newParentData = JSON.parse(JSON.stringify(parentData));
        let newBodymatter = newParentData[slateId].contents.bodymatter;
        var footnoteContentText, glossaryFootElem = {}, glossaryContentText, tempGlossaryContentText;
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
            // let tempIndex = index.split('-');
            let indexesLen = tempIndex.length;
            switch (indexesLen){
                case 2:
                    glossaryFootElem = newBodymatter[tempIndex[0]].popupdata["formatted-title"];
                    break;

                case 3:
                    glossaryFootElem = newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].popupdata["formatted-title"];
                    break;

                case 4:
                    glossaryFootElem = newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents.bodymatter[tempIndex[2]].popupdata["formatted-title"];
                    break;
            }   
        }
        else if (typeWithPopup && typeWithPopup === 'poetry') {
            // let tempIndex = index.split('-');
            let indexesLen = tempIndex.length;
            if (indexesLen === 2) {
                switch (tempIndex[1]) {
                    case "1":
                        glossaryFootElem = newBodymatter[tempIndex[0]].contents['formatted-title'] || {};
                        break;
                    // case "3":
                    //     glossaryFootElem = newBodymatter[tempIndex[0]].contents['formatted-caption'] || {};
                    //     break;
                    case "4":
                        glossaryFootElem = (newBodymatter[tempIndex[0]].contents['creditsarray'] ? newBodymatter[tempIndex[0]].contents['creditsarray'][0] : {});
                        break;
                }
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
export const saveGlossaryAndFootnote = (elementWorkId, elementType, glossaryfootnoteid, type, term, definition, elementSubType, typeWithPopup,poetryField) => {
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
        let label, title, captions, credits, elementIndex, text;
        let preformattedtext = null;
        let tableAsHTML = null;
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
            if (elementSubType === 'tableasmarkup') {
                if(document.getElementById(elementIndex + '-tableData')) {
                    tableAsHTML = document.getElementById(elementIndex + '-tableData').innerHTML;
                }
            }
        }else if (elementSubType === 'interactive' || elementSubType === "codelisting" || elementSubType === "authoredtext"){
            captions = document.getElementById('cypress-' + elementIndex + '-3').innerHTML //cypress-1-3
            credits = document.getElementById('cypress-' + elementIndex + '-4').innerHTML //cypress-1-4
            if(elementSubType === 'codelisting') {
                preformattedtext = document.getElementById('cypress-' + elementIndex + '-2').innerHTML ;
            } else if (elementSubType === 'authoredtext') {
                text = document.getElementById('cypress-' + elementIndex + '-2').innerHTML ;
            }
        }
       
        figureDataObj = {
            "title": label.match(/<p>/g) ? label : `<p>${label}</p>`,
            "subtitle": title.match(/<p>/g) ? title : `<p>${title}</p>`,
            "text": text ? text : "",
            "postertext": "",
            "tableasHTML": tableAsHTML ? tableAsHTML : '',
            "captions": captions ? captions.match(/<p>/g) ? captions : `<p>${captions}</p>` : "<p></p>",
            "credits": credits ? credits.match(/<p>/g) ? credits : `<p>${credits}</p>` : "<p></p>"
        }
        if(preformattedtext) {
            preformattedtext = '<p>'+preformattedtext+'</p>';
            figureDataObj.preformattedtext = preformattedtext;
        }
    } else {
        workEditor = document.getElementById('cypress-' + index)
        workContainer = workEditor.innerHTML;
        figureDataObj = {
            "text": workContainer
        }
        if(elementType == 'stanza' || (typeWithPopup === "poetry" && poetryField === 'formatted-subtitle' || typeWithPopup === "popup")){
            figureDataObj.text = `<p>${figureDataObj.text}</p>`
        }
    }
    let parentEntityUrn,
        appStore = store.getState().appStore

    if (typeWithPopup === "popup" || typeWithPopup === "poetry") { //For Popup and Poetry
        let elemIndex = index &&  typeof (index) !== 'number' && index.split('-');
        let indexesLen = elemIndex.length
        switch (indexesLen){
            case 2:
                parentEntityUrn = newBodymatter[elemIndex[0]].contentUrn
                break;
    
            case 3:
                parentEntityUrn = newBodymatter[elemIndex[0]].elementdata.bodymatter[elemIndex[1]].contentUrn
                break;
    
            case 4:
                parentEntityUrn = newBodymatter[elemIndex[0]].elementdata.bodymatter[elemIndex[1]].contents.bodymatter[elemIndex[2]].contentUrn
                break;
        }
    }
    else if(appStore.parentUrn && appStore.parentUrn.contentUrn) { // For Aside/WE
        parentEntityUrn = appStore.parentUrn.contentUrn
    }
    else { // elements in a slate
        parentEntityUrn = config.slateEntityURN
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
                projectUrn : config.projectUrn,
                slateEntity : config.slateEntityURN,
                elementParentEntityUrn: parentEntityUrn
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
                projectUrn : config.projectUrn,
                slateEntity : config.slateEntityURN,
                elementParentEntityUrn: parentEntityUrn
            }
            break;
    }
   
    if (typeWithPopup === 'popup') {
        data.metaDataField = "formattedTitle"
    } else if (typeWithPopup === 'poetry') {
        if (poetryField === 'creditsarray') {
            data.section = 'creditsarray';
        } else {
            data.metaDataField = "formattedTitle";
        }
    }
    if(index &&  typeof (index) !== 'number' && elementType !== 'figure'  && typeWithPopup !== 'popup' && typeWithPopup !== 'poetry'){
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
                    data.parentType = "poetry";
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
    console.log('from footnote actions')
    return axios.put(url, JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken
        }
    }).then(res => {
        let parentData1 = store.getState().appStore.slateLevelData;
        let currentParentData = JSON.parse(JSON.stringify(parentData1));
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
            // let tempIndex = index.split('-');
            let indexesLen = tempIndex.length
            let responseElement = {...res.data}
            responseElement.html.text = responseElement.html.text.replace(/<p>|<\/p>/g, "")
            
            switch (indexesLen){
                case 2: {
                    let titleDOM = document.getElementById(`cypress-${tempIndex[0]}-0`)
                    let titleHTML = ""
                    if (titleDOM) {
                        titleHTML = titleDOM.innerHTML
                    }
                    responseElement.html.text = createTitleSubtitleModel(titleHTML, responseElement.html.text)
                    newBodymatter[tempIndex[0]].popupdata["formatted-title"] = responseElement;
                    break;
                }
                case 3: {
                    let titleDOM = document.getElementById(`cypress-${tempIndex[0]}-${tempIndex[1]}-0`)
                    let titleHTML = ""
                    if (titleDOM) {
                        titleHTML = titleDOM.innerHTML
                    }
                    responseElement.html.text = createTitleSubtitleModel(titleHTML, responseElement.html.text)
                    newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].popupdata["formatted-title"] = responseElement;
                    break;
                }
                case 4: {
                    let titleDOM = document.getElementById(`cypress-${tempIndex[0]}-${tempIndex[1]}-${tempIndex[2]}-0`)
                    let titleHTML = ""
                    if (titleDOM) {
                        titleHTML = titleDOM.innerHTML
                    }
                    responseElement.html.text = createTitleSubtitleModel(titleHTML, responseElement.html.text)
                    newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents.bodymatter[tempIndex[2]].popupdata["formatted-title"] = responseElement;
                    break;
                }    
            }
        }
        else if (typeWithPopup && typeWithPopup === 'poetry') {
            // let tempIndex = index.split('-');
            let indexesLen = tempIndex.length;
            if (indexesLen === 2) {
                switch (tempIndex[1]) {
                    case "1":
                        let responseElement = {...res.data}
                        newBodymatter[tempIndex[0]].contents['formatted-title']
                        // let labelHTML = newBodymatter[tempIndex[0]].contents['formatted-title'].html.text
                        // if(labelHTML.match(/<label>.*?<\/label>/g)){
                        //     labelHTML = labelHTML.match(/<label>.*?<\/label>/g)[0].replace(/<label>|<\/label>/g, "")
                        // }
                        // else{
                        //     labelHTML = ""
                        // }
                       
                        // let parser = new DOMParser();
                        // let htmlDoc = parser.parseFromString(res.data.html.text, 'text/html');
                        // let removeP_Tag = htmlDoc.getElementsByTagName("p");
                        // console.log("removeP_Tag[0].innerHTML",removeP_Tag[0].innerHTML)
                        // if(removeP_Tag && removeP_Tag.length){
                        //     responseElement.html.text = createTitleSubtitleModel("", removeP_Tag[0].innerHTML) 
                        // }
                        // else {
                            res.data.html.text = res.data.html.text.replace(/<p>|<\/p>/g, "")
                            responseElement.html.text = createTitleSubtitleModel("", res.data.html.text)
                        // }
                        newBodymatter[tempIndex[0]].contents['formatted-title'] = responseElement;
                        break;
                    // case "3":
                    //     newBodymatter[tempIndex[0]].contents['formatted-caption'] = res.data;
                    //     break;
                    case "4":
                        if(!newBodymatter[tempIndex[0]].contents['creditsarray']){
                            newBodymatter[tempIndex[0]].contents['creditsarray'] = [];
                        }
                        newBodymatter[tempIndex[0]].contents['creditsarray'][0] = res.data;
                        break;
                }
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
        //tcm update code  for glossary/footnote 
        if (config.tcmStatus) {
            let elementTypeData = ['element-authoredtext', 'element-list', 'element-blockfeature', 'element-learningobjectives', 'element-citation', 'stanza'];
            if (elementTypeData.indexOf(elementType) !== -1) {
                prepareDataForUpdateTcm(elementWorkId, res.data.id);
            }
        }


        /** [PCAT-8289] -------------------------- TCM Snapshot Data handling ----------------------------*/
        store.dispatch(prepareTcmSnapshots(res.data,'update'))
        /**------------------------------------------------------------------------------------------------*/
        
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
//TCM Update
function prepareDataForUpdateTcm(updatedDataID,versionedData) {
    const tcmData = store.getState().tcmReducer.tcmSnapshot;
    let indexes = []
    tcmData.filter(function (element, index) {
    if (element.elemURN.indexOf(updatedDataID) !== -1 && element.elemURN.includes('urn:pearson:work')) {
            indexes.push(index)
        }
    });
    if (indexes.length == 0 || (versionedData && updatedDataID !== versionedData)) {
        tcmData.push({
            "txCnt": 1,
            "isPrevAcceptedTxAvailable": false,
            "elemURN": versionedData && updatedDataID !== versionedData ? versionedData : updatedDataID,
            "feedback": null
        })
    }
    else {
        tcmData[indexes]["elemURN"] = updatedDataID
        tcmData[indexes]["txCnt"] = tcmData[indexes]["txCnt"] !== 0 ? tcmData[indexes]["txCnt"] : 1
        tcmData[indexes]["feedback"] = tcmData[indexes]["feedback"] !== null ? tcmData[indexes]["feedback"] : null
        tcmData[indexes]["isPrevAcceptedTxAvailable"] = tcmData[indexes]["isPrevAcceptedTxAvailable"] ? tcmData[indexes]["isPrevAcceptedTxAvailable"] : false
    }
  
if (tcmData.length > 0) {
    sendDataToIframe({ 'type': 'projectPendingTcStatus', 'message': 'true' });
}
store.dispatch({
    type: GET_TCM_RESOURCES,
    payload: {
        data: tcmData
    }
})
}

/**
 * setFormattingToolbar | this method is used to enable/disable the formatting toolbars
 * @param {*} action, type of action to be performed
 */
export const setFormattingToolbar = (action) => {
    let tinymceToolbar = document.querySelector('div#tinymceToolbar .tox-toolbar') ? document.querySelector('div#tinymceToolbar .tox-toolbar') : ""
    let glossaryFootnoteToolbar = document.querySelector('div#toolbarGlossaryFootnote .tox-toolbar') ? document.querySelector('div#toolbarGlossaryFootnote .tox-toolbar') : ""
    switch (action) {
        case 'enableTinymceToolbar':
            tinymceToolbar && tinymceToolbar.classList.remove("toolbar-disabled");
            tinymceToolbar && tinymceToolbar.classList.remove("disable");
            break;
        case 'disableTinymceToolbar':
            tinymceToolbar && tinymceToolbar.classList.add("disable");
            break;
        case 'enableGlossaryFootnoteToolbar':
            glossaryFootnoteToolbar && glossaryFootnoteToolbar.classList.remove("disable");
            break;
        case 'disableGlossaryFootnoteToolbar':
            glossaryFootnoteToolbar && glossaryFootnoteToolbar.classList.add("disable");
            break;
        case 'removeTinymceSuperscript':
            let tinymceSuperscript = document.querySelector('div#tinymceToolbar .tox-toolbar button[title="Superscript"]') ? document.querySelector('div#tinymceToolbar .tox-toolbar button[title="Superscript"]') : ""
            tinymceSuperscript && tinymceSuperscript.removeAttribute('aria-pressed')
            tinymceSuperscript && tinymceSuperscript.classList.remove('tox-tbtn--enabled')
            tinymceSuperscript && tinymceSuperscript.classList.add('tox-tbtn--select')
            break;
        case 'removeGlossaryFootnoteSuperscript':
            let isSuperscriptButton = document.querySelector('div#toolbarGlossaryFootnote .tox-toolbar button[title="Superscript"]') ? document.querySelector('div#toolbarGlossaryFootnote .tox-toolbar button[title="Superscript"]') : ""
            isSuperscriptButton && isSuperscriptButton.removeAttribute('aria-pressed')
            isSuperscriptButton && isSuperscriptButton.classList.remove('tox-tbtn--enabled')
            isSuperscriptButton && isSuperscriptButton.classList.add('tox-tbtn--select')
            break;
    }
}