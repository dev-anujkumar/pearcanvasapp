import {OPEN_PRINT_INDEX} from '../../constants/Action_Constants';

// export const printIndexPopup = (value) => (dispatch) => {
//     dispatch({
//         type: OPEN_PRINT_INDEX,
//         payload: value
//     });
// };


import axios from 'axios';
import config from '../../config/config';
import store from '../../appstore/store.js'
import { sendDataToIframe, createTitleSubtitleModel, matchHTMLwithRegex, createLabelNumberTitleModel } from '../../constants/utility.js';
import { replaceUnwantedtags } from '../ElementContainer/UpdateElements';
import { HideLoader } from '../../constants/IFrameMessageTypes.js';
import { hideTocBlocker } from '../../js/toggleLoader'
import { tcmSnapshotsForUpdate, fetchParentData, fetchElementWipData } from '../TcmSnapshots/TcmSnapshots_Utility.js';
const {
    REACT_APP_API_URL
} = config
import { allowedFigureTypesForTCM } from "../ElementContainer/ElementConstants";
import {ADD_AUDIO_GLOSSARY_POPUP,OPEN_GLOSSARY_FOOTNOTE, UPDATE_FOOTNOTEGLOSSARY, ERROR_POPUP, GET_TCM_RESOURCES,HANDLE_GLOSSARY_AUDIO_DATA, ADD_FIGURE_GLOSSARY_POPUP, SET_FIGURE_GLOSSARY, WRONG_IMAGE_POPUP, SHOW_REMOVE_GLOSSARY_IMAGE} from "./../../constants/Action_Constants";
import { handleElementsInShowHide, getShowHideIndex, onGlossaryFnUpdateSuccessInShowHide, findSectionType, getShowHideElement } from '../ShowHide/ShowHide_Helper.js';
const elementTypeData = ['element-authoredtext', 'element-list', 'element-blockfeature', 'element-learningobjectives', 'element-citation', 'stanza', 'figure'];

export const printIndexPopup = (status, glossaaryFootnote, glossaryfootnoteid, elementWorkId, elementType, index, elementSubType, indexEntryText, typeWithPopup, poetryField) => async (dispatch) => {

    let markedIndexValue = {
        "type": glossaaryFootnote,
        "popUpStatus": status,
        elementWorkId,
        elementType,
        glossaryfootnoteid,
        elementSubType,
        indexEntryText,
        typeWithPopup : typeWithPopup ? typeWithPopup : undefined,
        poetryField : poetryField ? poetryField : undefined
    }

    if (status === true) {
        let semanticType = glossaaryFootnote.toUpperCase();
        const slateId = config.slateManifestURN;
        const parentData = store.getState().appStore.slateLevelData;
        let newParentData = JSON.parse(JSON.stringify(parentData));
        let currentSlateData = newParentData[config.slateManifestURN];
        const showHideElement = store.getState().appStore?.showHideObj;
        if(currentSlateData.type==="popup" && currentSlateData.status === "approved" && (config.isCreateFootnote || config.isCreateGlossary)){
            return false;
        }
        let newBodymatter = newParentData[slateId].contents.bodymatter;
        var footnoteContentText, glossaryFootElem = {}, glossaryContentText, tempGlossaryContentText;
        let tempIndex = index && typeof (index) !== 'number' && index.split('-');
        const asideParent = store.getState().appStore?.asideData
        // if (showHideElement || asideParent?.type === 'showhide') { /** Glossary-Footnotes inside Show-Hide */
        //     //let showHideChild = handleElementsInShowHide(newBodymatter, tempIndex, elementType, showHideElement, 'glossaryFootnote')
        //     //glossaryFootElem = showHideChild?.currentElement
        //     /* Get the element where footnote/Glossery is added */
        //     glossaryFootElem = onGlossaryFnUpdateSuccessInShowHide("GetElementWithFnGlry_SH", newBodymatter, elementType, asideParent?.sectionType, tempIndex)
        // }
        // else if(tempIndex.length == 4 && elementType == 'figure' && newBodymatter[tempIndex[0]].type !== "groupedcontent"){ //Figure inside WE
        //     glossaryFootElem = newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents.bodymatter[tempIndex[2]]
        // }else if(tempIndex.length == 4 && elementType == 'figure' && newBodymatter[tempIndex[0]].type === "groupedcontent"){ //Figure inside Multi-Column
        //     glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]]
        // }
        // else if(tempIndex.length == 3 && elementType == 'figure'){
        //     glossaryFootElem = newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]]
        // }
        // else if (tempIndex.length == 5 && elementType === "figure" && newBodymatter[tempIndex[0]].type === 'groupedcontent' ) {
        //     glossaryFootElem = newBodymatter[tempIndex[0]]?.groupeddata?.bodymatter[tempIndex[1]]?.groupdata?.bodymatter[tempIndex[2]]?.elementdata?.bodymatter[tempIndex[3]];
        // }
        // else if (tempIndex.length == 6 && elementType === "figure" && newBodymatter[tempIndex[0]].type === 'groupedcontent' ) {
        //     glossaryFootElem = newBodymatter[tempIndex[0]]?.groupeddata?.bodymatter[tempIndex[1]]?.groupdata?.bodymatter[tempIndex[2]]?.elementdata?.bodymatter[tempIndex[3]]?.contents?.bodymatter[tempIndex[4]];
        // }
        // else if (elementType === "figure") {
        //     let tempUpdatedIndex = index.split('-');
        //     let updatedIndex = tempUpdatedIndex[0];
        //     glossaryFootElem = newBodymatter[updatedIndex]
        // }
        // else if (typeWithPopup && typeWithPopup === "popup" ){
        //     // let tempIndex = index.split('-');
        //     let indexesLen = tempIndex.length;
        //     switch (indexesLen){
        //         case 2:
        //             glossaryFootElem = newBodymatter[tempIndex[0]].popupdata["formatted-title"];
        //             break;

        //         case 3:
        //             glossaryFootElem = newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].popupdata["formatted-title"];
        //             break;

        //         case 4:
        //             glossaryFootElem = newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents.bodymatter[tempIndex[2]].popupdata["formatted-title"];
        //             break;
        //         /*
        //             footnote for popup title inside aside element inside multicolumn BG-4750
        //         */
        //        case 5:
        //             glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]].popupdata["formatted-title"];
        //             break;
        //     }
        // }
        // else if (typeWithPopup && typeWithPopup === 'poetry') {
        //     // let tempIndex = index.split('-');
        //     let indexesLen = tempIndex.length;
        //     if (indexesLen === 2) {
        //         switch (tempIndex[1]) {
        //             case "1":
        //                 glossaryFootElem = newBodymatter[tempIndex[0]].contents['formatted-title'] || {};
        //                 break;
        //             // case "3":
        //             //     glossaryFootElem = newBodymatter[tempIndex[0]].contents['formatted-caption'] || {};
        //             //     break;
        //             case "4":
        //                 glossaryFootElem = (newBodymatter[tempIndex[0]].contents['creditsarray'] ? newBodymatter[tempIndex[0]].contents['creditsarray'][0] : {});
        //                 break;
        //         }
        //     }
        // } else if ((tempIndex.length >= 4 && tempIndex.length <= 7) && elementType === "element-dialogue" && newBodymatter[tempIndex[0]].type === "groupedcontent") { // MultiColumn->PS or MultiColumn->As->PS or MultiColumn->WE->PS
        //     let elementInside2C = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]];
        //     if (elementInside2C.type === "element-aside" && elementInside2C.subtype === "sidebar") {
        //         glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]];
        //     } else if (elementInside2C.type === "element-aside" && elementInside2C.subtype === "workedexample") {
        //         glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]];
        //         if (glossaryFootElem.type === 'manifest') {
        //             glossaryFootElem = glossaryFootElem.contents.bodymatter[tempIndex[4]];
        //         }
        //     } else {
        //         glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]];
        //     }



        // } else if (elementType === "element-dialogue" && newBodymatter[tempIndex[0]].type === "element-aside" && newBodymatter[tempIndex[0]].subtype === "workedexample") { //Playscript inside we element
        //     glossaryFootElem = newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]];
        //     if (glossaryFootElem.type === 'manifest') {
        //         glossaryFootElem = glossaryFootElem.contents.bodymatter[tempIndex[2]];
        //     }
        // } else if (elementType === "element-dialogue" && newBodymatter[tempIndex[0]].type === "element-aside" && newBodymatter[tempIndex[0]].subtype === "sidebar") { //Playscript inside aside element
        //     glossaryFootElem = newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]];
        // } else if (elementType === "element-dialogue") {
        //     glossaryFootElem = newBodymatter[tempIndex[0]];
        // }
        // else {
        //     if (typeof (index) == 'number') {
        //         if (newBodymatter[index].versionUrn == elementWorkId) {
        //             glossaryFootElem = newBodymatter[index]
        //         }
        //     } else {
        //         let indexes = index.split('-');
        //         let indexesLen = indexes.length, condition;
        //         if (indexesLen == 2) {
        //             condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]]
        //             if (condition.versionUrn == elementWorkId) {
        //                 glossaryFootElem = condition
        //             }
        //         } else if (indexesLen == 3) {
        //             if(elementType==='stanza'){
        //                 condition = newBodymatter[indexes[0]].contents.bodymatter[indexes[2]]
        //             } else if (newBodymatter[indexes[0]].type === "groupedcontent") { //All elements inside multi-column except figure
        //                 condition = newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]]
        //             } else {
        //                 condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]]
        //             }
        //             if (condition.versionUrn == elementWorkId) {
        //                 glossaryFootElem = condition
        //             }
        //         }
           
        //         else if (indexesLen == 4) {  // to support glossary in text elements inside WE/AS of MultiColumn
        //             glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]];
                    
        //         } else if (indexesLen == 5) { // to support glossary in section break inside WE of MultiColumn
        //             glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[indexes[3]].contents.bodymatter[indexes[4]]
        //         }

        //     }
        // }
        // switch (semanticType) {
        //     case 'FOOTNOTE':
        //         footnoteContentText = glossaryFootElem && glossaryFootElem.html['footnotes'] && glossaryFootElem.html['footnotes'][glossaryfootnoteid]
        //         break;
        //     case 'GLOSSARY':
        //         tempGlossaryContentText = glossaryFootElem && glossaryFootElem.html['glossaryentries'] && glossaryFootElem.html['glossaryentries'][glossaryfootnoteid]
        //         footnoteContentText = tempGlossaryContentText && JSON.parse(tempGlossaryContentText).definition
        //         glossaryContentText = tempGlossaryContentText && JSON.parse(tempGlossaryContentText).term || glossaryTermText
        // }
    }
    // if(glossaryContentText && glossaryContentText.includes('audio-id')){
    //     const audioId = glossaryContentText.slice(glossaryContentText.indexOf('audio-id')).split("\"")[1];
    //     const audioPath =glossaryContentText.slice(glossaryContentText.indexOf('audio-id')).split("\"")[3]
    //     const title = audioPath?.split("/")?.pop()?.replace(/%20/g,' ');
    //     const data = {
    //         'title':{
    //             'en':title
    //         },
    //         'narrativeAudioUrn': audioId,
    //         'location':audioPath
    //     }
    //    store.dispatch(handleGlossaryActions(true,data));
    // } else {
    //    store.dispatch( handleGlossaryActions(false,{}))
    // }

    // if(footnoteContentText && footnoteContentText.includes('imageAssetContent')) {
    //     let div = document.createElement('div');
    //     div.innerHTML = footnoteContentText
    //     let glossaryImageAssets = div.getElementsByTagName('img');
    //     for (let i = 0; i < glossaryImageAssets.length; i++) {
    //         if(glossaryImageAssets[i]?.attributes?.class?.nodeValue ==='imageAssetContent'){
    //             const imagePath = glossaryImageAssets[i]?.attributes?.src?.nodeValue
    //             const imageId = glossaryImageAssets[i]?.attributes?.imageid?.nodeValue
    //             const altText = glossaryImageAssets[i]?.attributes?.alt?.nodeValue
    //             const classValue = glossaryImageAssets[i]?.attributes?.class?.nodeValue
    //             const imageHeight = glossaryImageAssets[i]?.attributes?.height?.nodeValue
    //             const imageWidth = glossaryImageAssets[i]?.attributes?.width?.nodeValue
    //             const title = imagePath?.split("/")?.pop()?.replace(/%20/g,' ');
    //             const Longdescription = glossaryImageAssets[i]?.attributes?.longdescription?.nodeValue
    //             const data = {
    //                     imageid: imageId,
    //                     path:imagePath,
    //                     alttext:altText,
    //                     height:imageHeight,
    //                     width:imageWidth,
    //                     class:classValue,
    //                     title:title,
    //                     longdescription:Longdescription
    //                 }
    //             store.dispatch(handleFigureGlossaryActions(true, data));
    //         }
    //     }
    // }
    //  else {
    //    store.dispatch(handleFigureGlossaryActions(false,{}))
    // }

    return await dispatch({
        type: OPEN_PRINT_INDEX,
        payload: {
            markedIndexValue: markedIndexValue,
            markedIndexCurrentValue: {
                footnoteContentText,
                glossaryContentText,
            },
            elementIndex: index
        }
    });
}