import axios from 'axios';
import config from '../../config/config';
import store from '../../appstore/store.js'
import { sendDataToIframe, createTitleSubtitleModel, matchHTMLwithRegex, createLabelNumberTitleModel } from '../../constants/utility.js';
import { replaceUnwantedtags } from '../ElementContainer/UpdateElements';
import { HideLoader } from '../../constants/IFrameMessageTypes.js';
import { tcmSnapshotsForUpdate, fetchParentData, fetchElementWipData } from '../TcmSnapshots/TcmSnapshots_Utility.js';
const {
    REACT_APP_API_URL
} = config
import { allowedFigureTypesForTCM } from "../ElementContainer/ElementConstants";
import {ADD_AUDIO_GLOSSARY_POPUP,OPEN_GLOSSARY_FOOTNOTE, UPDATE_FOOTNOTEGLOSSARY, ERROR_POPUP, GET_TCM_RESOURCES,HANDLE_GLOSSARY_AUDIO_DATA} from "./../../constants/Action_Constants";
const elementTypeData = ['element-authoredtext', 'element-list', 'element-blockfeature', 'element-learningobjectives', 'element-citation', 'stanza', 'figure'];

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
        let currentSlateData = newParentData[config.slateManifestURN];
        if(currentSlateData.type==="popup" && currentSlateData.status === "approved" && (config.isCreateFootnote || config.isCreateGlossary)){
            return false;
        }
        let newBodymatter = newParentData[slateId].contents.bodymatter;
        var footnoteContentText, glossaryFootElem = {}, glossaryContentText, tempGlossaryContentText;
        let tempIndex = index && typeof (index) !== 'number' && index.split('-');
        if(tempIndex.length == 4 && elementType == 'figure' && newBodymatter[tempIndex[0]].type !== "groupedcontent"){ //Figure inside WE
            glossaryFootElem = newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents.bodymatter[tempIndex[2]]
        }else if(tempIndex.length == 4 && elementType == 'figure' && newBodymatter[tempIndex[0]].type === "groupedcontent"){ //Figure inside Multi-Column
            glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]]
        }
        else if(tempIndex.length == 3 && elementType == 'figure'){
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
        } else if ((tempIndex.length == 4 || tempIndex.length == 5) && elementType === "element-dialogue" && newBodymatter[tempIndex[0]].type === "groupedcontent") { //Playscript inside Multi-Column
            glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]];
        } else if (elementType === "element-dialogue" && newBodymatter[tempIndex[0]].type === "element-aside" && newBodymatter[tempIndex[0]].subtype === "workedexample") { //Playscript inside we element
            glossaryFootElem = newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]];
            if (glossaryFootElem.type === 'manifest') {
                glossaryFootElem = glossaryFootElem.contents.bodymatter[tempIndex[2]];
            }
        } else if (elementType === "element-dialogue" && newBodymatter[tempIndex[0]].type === "element-aside" && newBodymatter[tempIndex[0]].subtype === "sidebar") { //Playscript inside aside element
            glossaryFootElem = newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]];
        } else if (elementType === "element-dialogue") {
            glossaryFootElem = newBodymatter[tempIndex[0]];
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
                    } else if (newBodymatter[indexes[0]].type === "groupedcontent") { //All elements inside multi-column except figure
                        condition = newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]]
                    } else {
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
    if(glossaryContentText && glossaryContentText.includes('audio-id')){
        const audioId = glossaryContentText.slice(glossaryContentText.indexOf('audio-id')).split("\"")[1];
        const audioPath =glossaryContentText.slice(glossaryContentText.indexOf('audio-id')).split("\"")[3]
        const title = audioPath.split("/").pop();
        const data = {
            'title':{
                'en':title
            },
            'narrativeAudioUrn': audioId,
            'location':audioPath
        }
       store.dispatch(handleGlossaryActions(true,data));
    }
    else {
       store.dispatch( handleGlossaryActions(false,{}))

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

function handleGlossaryActions(addAudioData, GlossaryAudioData) {
    return dispatch => {
        dispatch({ type: ADD_AUDIO_GLOSSARY_POPUP, payload: addAudioData })
        dispatch({ type: HANDLE_GLOSSARY_AUDIO_DATA, payload: GlossaryAudioData });
    }
}

function alterAttr(type, audioGlossaryData, addAttributeInDfn, glossaryfootnoteid, workEditor, workContainer) {

    for (let i = 0; i < addAttributeInDfn.length; i++) {
        let currentAddAttributeInDfn = addAttributeInDfn[i];
        let currentData = addAttributeInDfn[i].outerHTML
        let currentDataUri = currentData.slice(currentData.indexOf('data-uri')).split("\"")[1];
        if (currentDataUri === glossaryfootnoteid) {
            if (type == 'add') {
                currentAddAttributeInDfn.setAttribute('audio-id', audioGlossaryData.narrativeAudioUrn)
                currentAddAttributeInDfn.setAttribute('audio-path', audioGlossaryData.location)
            } else if (type == 'remove') {
                currentAddAttributeInDfn.removeAttribute('audio-id')
                currentAddAttributeInDfn.removeAttribute('audio-path')
            }
        }
        workContainer = workEditor.innerHTML;
    }
    return workContainer;
}

/**
 * saveGlossaryAndFootnote | this method is used for to save glossary and footnote
 * @param {*} elementWorkId, element's workurn of which glosssary&footnote is being saved
 * @param {*} elementType, element's type of which glosssary&footnote is being saved
 * @param {*} glossaryfootnoteid, glosary/footnote's work id
 * @param {*} type, type whether glossary or footnote
 */
export const saveGlossaryAndFootnote = (elementWorkId, elementType, glossaryfootnoteid, type, term, definition, elementSubType, typeWithPopup,poetryField,audioGlossaryData) => {
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
    let currentElement = store.getState().appStore.activeElement;

    /** Feedback status from elementData */
    let elementNodeData = document.querySelector(`[data-id='${elementWorkId}']`)?document.querySelector(`[data-id='${elementWorkId}']`).outerHTML.includes('feedback'):false
    let tcmFeedback =  elementNodeData;

    //Get updated innerHtml of element for API request 
    if (elementType == 'figure') {
        let label, number, title, captions, credits, elementIndex, text, postertext;
        let preformattedtext = null;
        let tableAsHTML = null;
        let tempIndex = index &&  typeof (index) !== 'number' && index.split('-');
        let hasCtaText = ["secondary-interactive-smartlink-pdf", "secondary-interactive-smartlink-web", "secondary-interactive-smartlink-pop-up-web-link"];
        if(tempIndex.length == 4){//Figure inside a WE
            elementIndex = tempIndex[0]+'-'+tempIndex[1]+'-'+tempIndex[2]
        }else if(tempIndex.length == 3){ //section 2 in WE figure
            elementIndex = tempIndex[0]+'-'+tempIndex[1]
        }else{
            elementIndex = tempIndex[0]
        }

        label = document.getElementById('cypress-' + elementIndex + '-0').innerHTML //cypress-1-0
        number = document.getElementById('cypress-' + elementIndex + '-1').innerHTML //cypress-1-1
        title = document.getElementById('cypress-' + elementIndex + '-2').innerHTML //cypress-1-2


        if(elementSubType == 'image' || elementSubType === 'tableasmarkup' || elementSubType === "audio" || elementSubType === "video" || elementSubType === 'table' || elementSubType === "mathImage"){
            captions = document.getElementById('cypress-' + elementIndex + '-3').innerHTML //cypress-1-3
            credits = document.getElementById('cypress-' + elementIndex + '-4').innerHTML //cypress-1-4
            if (elementSubType === 'tableasmarkup') {
                if(document.getElementById(elementIndex + '-tableData')) {
                    tableAsHTML = document.getElementById(elementIndex + '-tableData').innerHTML;
                }
            }
        }else if (elementSubType === 'interactive' || elementSubType === "codelisting" || elementSubType === "authoredtext"){
            captions = document.getElementById('cypress-' + elementIndex + '-4').innerHTML //cypress-1-4
            credits = document.getElementById('cypress-' + elementIndex + '-5').innerHTML //cypress-1-5
            let index3Data = document.getElementById('cypress-' + elementIndex + '-3') ;//cypress-1-2
            let hasData = index3Data && index3Data.innerHTML ? index3Data.innerHTML : "";
            if(elementSubType === 'codelisting') {
                preformattedtext = document.getElementById('cypress-' + elementIndex + '-3').innerHTML;
            } else if (elementSubType === 'authoredtext') {
                text = document.getElementById('cypress-' + elementIndex + '-3').innerHTML ;
            }else if(elementSubType === 'interactive' && hasCtaText.indexOf(currentElement.secondaryOption) !==-1){
                postertext = hasData; //BG-2628 Fixes
            }
        }
        
        label = replaceUnwantedtags(label, false);
        number = replaceUnwantedtags(number, false);
        title = replaceUnwantedtags(title, true);

        title = createLabelNumberTitleModel(label, number, title);

        figureDataObj = {
            "title": title,
            "text": text ? text : "",
            "postertext": (hasCtaText.indexOf(currentElement.secondaryOption) !== -1) ? postertext  ? postertext.match(/<p>/g) ? postertext : `<p>${postertext}</p>` : "<p></p>" : "",
            "tableasHTML": tableAsHTML ? tableAsHTML : '',
            "captions": matchHTMLwithRegex(captions) ? captions : `<p>${captions}</p>`,
            "credits": matchHTMLwithRegex(credits)  ? credits : `<p>${credits}</p>`
        }
        if(preformattedtext) {
            preformattedtext = '<p>'+preformattedtext+'</p>';
            figureDataObj.preformattedtext = preformattedtext;
        }
    } else {
        workEditor = document.getElementById('cypress-' + index)
         workContainer = workEditor.innerHTML;

        let addAttributeInDfn = workEditor.getElementsByTagName('dfn');

        if (audioGlossaryData && Object.keys(audioGlossaryData).length > 0) {
            workContainer = alterAttr('add',audioGlossaryData, addAttributeInDfn, glossaryfootnoteid, workEditor,workContainer);
        }else{
            workContainer= alterAttr('remove',audioGlossaryData, addAttributeInDfn, glossaryfootnoteid, workEditor,workContainer);
        }

        workContainer = workContainer.replace(/data-mce-href="#"/g,'').replace(/ reset/g,'')

        figureDataObj = {
            "text": workContainer
        }
        
        if(elementType == 'stanza' || (typeWithPopup === "poetry" && poetryField === 'formatted-subtitle' || typeWithPopup === "popup")){
            figureDataObj.text = `<p>${figureDataObj.text}</p>`
        }
        else if (typeWithPopup === "popup" && elementType === "element-authoredtext") {
            figureDataObj.text = `<p class="paragraphNumeroUno">${figureDataObj.text}</p>`
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
    sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })  //show saving spinner

    let tcmParentData,tcmMainBodymatter,tcmBodymatter;
    if (elementTypeData.indexOf(elementType) !== -1 && store.getState().appStore.showHideType == undefined) {
        /** For TCM snapshots */
        let mainSlateId = config.isPopupSlate ? config.tempSlateManifestURN : config.slateManifestURN;
        tcmBodymatter = store.getState().appStore.slateLevelData[config.slateManifestURN].contents.bodymatter;
        tcmParentData = fetchParentData(tcmBodymatter, index);
        tcmMainBodymatter = store.getState().appStore.slateLevelData[mainSlateId].contents.bodymatter;
    }
    /** ----------------- */
    let url = `${config.REACT_APP_API_URL}v1/slate/element?type=${type.toUpperCase()}&id=${glossaryfootnoteid}`
    return axios.put(url, JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken
        }
    }).then( async res => {
        let parentData1 = store.getState().appStore.slateLevelData;
        let currentParentData = JSON.parse(JSON.stringify(parentData1));
        let currentSlateData = currentParentData[config.slateManifestURN];
        /** [PCAT-8289] ----------------------------------- TCM Snapshot Data handling ---------------------------------*/
        if (elementTypeData.indexOf(elementType) !== -1 && typeWithPopup !== "poetry") {
            let elementUpdateData ={
                currentParentData: currentParentData,
                updateBodymatter:tcmBodymatter,
                response: res.data,
                updatedId:elementWorkId
            },
                containerElement = {
                    asideData:tcmParentData.asideData,
                    parentUrn:tcmParentData.parentUrn,
                    parentElement: data.metaDataField ? fetchElementWipData(tcmMainBodymatter,index,'popup') : undefined,
                    metaDataField: data.metaDataField ? data.metaDataField : undefined
                };
            if (currentSlateData && currentSlateData.status === 'approved') {
                await tcmSnapshotsForUpdate(elementUpdateData, index, containerElement, store.dispatch, "");
            }
            else {
                tcmSnapshotsForUpdate(elementUpdateData, index, containerElement, store.dispatch, "");
            }
        }
        /**-------------------------------------------------------------------------------------------------------------*/
        if(res.data.id !== data.id && currentSlateData.status === 'approved'){
            sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
        }
        let tempIndex = index &&  typeof (index) !== 'number' && index.split('-');
        if (tempIndex.length == 4 && elementType == 'figure' && newBodymatter[tempIndex[0]].type === "groupedcontent") { //Figure inside a Multi-column container
            newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]] = res.data
        } else if (tempIndex.length == 4 && elementType == 'figure' && typeWithPopup !== "popup") {//Figure inside a WE
            newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents.bodymatter[tempIndex[2]] = res.data
        } else if (tempIndex.length == 3 && elementType =='figure') {//section 2 figure in WE
            newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]] = res.data
        } else if (elementType === "figure") {
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
        } else if ((tempIndex.length == 4 || tempIndex.length == 5) && elementType === "element-dialogue" && newBodymatter[tempIndex[0]].type === "groupedcontent") { //Playscript inside Multi-Column
            res.data = {
                ...res.data,
                html: {
                    ...res.data.html,
                    actTitle: newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].html.actTitle,
                    credits: newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].html.credits,
                    dialogueContent: newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].html.dialogueContent,
                    sceneTitle: newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].html.sceneTitle
                }
            }
            if (res.data.html.hasOwnProperty('text')) {
                delete res.data.html.text;
            }
            newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]] = res.data;
        } else if (elementType === "element-dialogue" && newBodymatter[tempIndex[0]].type === "element-aside" && newBodymatter[tempIndex[0]].subtype === "workedexample") { //Playscript inside we element
            let glossaryFootnoteElementOfWe = newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]];
            if (glossaryFootnoteElementOfWe.type === 'manifest') {
                glossaryFootnoteElementOfWe = glossaryFootnoteElementOfWe.contents.bodymatter[tempIndex[2]];
            }
            glossaryFootnoteElementOfWe = {
                ...glossaryFootnoteElementOfWe,
                html: {
                    ...glossaryFootnoteElementOfWe.html,
                    glossaryentries: res.data.html.glossaryentries,
                    footnotes: res.data.html.footnotes
                }
            }
            if (newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].type === 'manifest') {
                newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents.bodymatter[tempIndex[2]] = glossaryFootnoteElementOfWe;
            } else {
                newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]] = glossaryFootnoteElementOfWe;
            }
        } else if (elementType === "element-dialogue" && newBodymatter[tempIndex[0]].type === "element-aside" && newBodymatter[tempIndex[0]].subtype === "sidebar") { //Playscript inside aside element
            res.data = {
                ...res.data,
                html: {
                    ...res.data.html,
                    actTitle: newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].html.actTitle,
                    credits: newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].html.credits,
                    dialogueContent: newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].html.dialogueContent,
                    sceneTitle: newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].html.sceneTitle
                }
            }
            if (res.data.html.hasOwnProperty('text')) {
                delete res.data.html.text;
            }
            newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]] = res.data;
        } else if (elementType === "element-dialogue") {
            res.data = {
                ...res.data,
                html: {
                    ...res.data.html,
                    actTitle: newBodymatter[tempIndex[0]].html.actTitle,
                    credits: newBodymatter[tempIndex[0]].html.credits,
                    dialogueContent: newBodymatter[tempIndex[0]].html.dialogueContent,
                    sceneTitle: newBodymatter[tempIndex[0]].html.sceneTitle
                }
            }
            if (res.data.html.hasOwnProperty('text')) {
                delete res.data.html.text;
            }
            if (newBodymatter[tempIndex[0]].hasOwnProperty('status')) {
                res.data = {
                    ...res.data,
                    status: newBodymatter[tempIndex[0]].status
                }
            }
            newBodymatter[tempIndex[0]] = res.data;
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
                    else if(newBodymatter[indexes[0]].type ==='groupedcontent'){
                        condition = newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]]
                    }
                    else {
                        condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]]
                    }
                    if (condition.versionUrn == elementWorkId) {
                        if(elementType==='stanza'){
                            newBodymatter[indexes[0]].contents.bodymatter[indexes[2]] = res.data
                        }
                        else if(newBodymatter[indexes[0]].type ==='groupedcontent'){
                            newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]] = res.data
                        }
                        else {
                            newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]] = res.data
                        }

                    }
                }
            }
        }
        //tcm update code  for glossary/footnote 
        if (config.tcmStatus) {
            if (elementTypeData.indexOf(elementType) !== -1) {
                prepareDataForUpdateTcm(elementWorkId, res.data.id, res.data);
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
        config.isGlossarySaving = false;
    }).catch(err => {
        store.dispatch({type: ERROR_POPUP, payload:{show: true}})
        console.log("save glossary footnote API error : ", err);
        config.isGlossarySaving = false;
        sendDataToIframe({'type': HideLoader,'message': { status: false }});
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })  //hide saving spinner
    })
}
//TCM Update
function prepareDataForUpdateTcm(updatedDataID,versionedData, resData) {
    if (resData.hasOwnProperty("figuretype") && !allowedFigureTypesForTCM.includes(resData.figuretype)) {
        return false
    }
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
        if(tcmData && tcmData[indexes] && indexes.length > 0 && updatedDataID){
            tcmData[indexes]["elemURN"] = updatedDataID
            tcmData[indexes]["txCnt"] = tcmData[indexes]["txCnt"] !== 0 ? tcmData[indexes]["txCnt"] : 1
            tcmData[indexes]["feedback"] = tcmData[indexes]["feedback"] !== null ? tcmData[indexes]["feedback"] : null
            tcmData[indexes]["isPrevAcceptedTxAvailable"] = tcmData[indexes]["isPrevAcceptedTxAvailable"] ? tcmData[indexes]["isPrevAcceptedTxAvailable"] : false
        }
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