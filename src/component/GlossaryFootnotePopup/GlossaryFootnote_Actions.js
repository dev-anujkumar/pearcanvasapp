import axios from 'axios';
import config from '../../config/config';
import store from '../../appstore/store.js'
import { sendDataToIframe, createTitleSubtitleModel, matchHTMLwithRegex, createLabelNumberTitleModel } from '../../constants/utility.js';
import { replaceUnwantedtags } from '../ElementContainer/UpdateElements';
import { HideLoader } from '../../constants/IFrameMessageTypes.js';
import { hideTocBlocker } from '../../js/toggleLoader'
import { tcmSnapshotsForUpdate, fetchElementWipData } from '../TcmSnapshots/TcmSnapshotsCreate_Update';
import ElementConstants from '../ElementContainer/ElementConstants';
const {
    REACT_APP_API_URL
} = config
import { allowedFigureTypesForTCM } from "../ElementContainer/ElementConstants";
import {ADD_AUDIO_GLOSSARY_POPUP,OPEN_GLOSSARY_FOOTNOTE, UPDATE_FOOTNOTEGLOSSARY, ERROR_POPUP, GET_TCM_RESOURCES,HANDLE_GLOSSARY_AUDIO_DATA, ADD_FIGURE_GLOSSARY_POPUP, SET_FIGURE_GLOSSARY, WRONG_IMAGE_POPUP, SHOW_REMOVE_GLOSSARY_IMAGE, UPDATE_NEW_ELEMENT_WORK_ID, UPDATE_CURRENT_VALUE} from "./../../constants/Action_Constants";
import { getShowHideIndex, onGlossaryFnUpdateSuccessInShowHide, getShowHideElement } from '../ShowHide/ShowHide_Helper.js';
import { updateMarkedIndexStore } from '../MarkIndexPopup/MarkIndex_Action';
import { fetchParentData } from '../TcmSnapshots/TcmSnapshotsOnDefaultSlate';
import { prepareBqHtml } from '../../js/utils';
import { ELEMENT_ASIDE, ELEMENT_BLOCKFEATURE, ELEMENT_DIALOGUE, FORMATTED_TITLE } from '../../constants/Element_Constants';
const elementTypeData = ['element-authoredtext', 'element-list', ELEMENT_BLOCKFEATURE, 'element-learningobjectives', 'element-citation', 'stanza', 'figure'];

export const glossaaryFootnotePopup = (status, glossaaryFootnote, glossaryfootnoteid, elementWorkId, elementType, index,blockfeatureType, elementSubType, glossaryTermText, typeWithPopup, poetryField) => async (dispatch) => {

    let glossaaryFootnoteValue = {
        "type": glossaaryFootnote,
        "popUpStatus": status,
        elementWorkId,
        elementType,
        glossaryfootnoteid,
        elementSubType,
        glossaryTermText,
        typeWithPopup : typeWithPopup ? typeWithPopup : undefined,
        poetryField : poetryField ? poetryField : undefined,
        blockfeatureType
    }

    if (status === true) {
        let semanticType = glossaaryFootnote.toUpperCase();
        const slateId = config.slateManifestURN;
        const parentData = store.getState().appStore.slateLevelData;
        let newParentData = JSON.parse(JSON.stringify(parentData));
        let currentSlateData = newParentData[config.slateManifestURN];
        const showHideElement = store.getState().appStore?.showHideObj;
        if(currentSlateData?.type==="popup" && currentSlateData.status === "approved" && config.isCreateFootnote){
            return false;
        }
        let newBodymatter = newParentData[slateId]?.contents?.bodymatter;
        var footnoteContentText, glossaryFootElem = {}, glossaryContentText, tempGlossaryContentText;
        let tempIndex = index && typeof (index) !== 'number' && index.split('-');
        const asideParent = store.getState().appStore?.asideData
        if (showHideElement || asideParent?.type === 'showhide' && (newBodymatter[tempIndex[0]]?.interactivedata?.[asideParent?.sectionType][tempIndex[2]]?.type!=='poetry') && elementType !== ELEMENT_BLOCKFEATURE) { /** Glossary-Footnotes inside Show-Hide */
            /* Get the element where footnote/Glossery is added */
            glossaryFootElem = onGlossaryFnUpdateSuccessInShowHide("GetElementWithFnGlry_SH", newBodymatter, elementType, asideParent?.sectionType, tempIndex, asideParent)
            if(tempIndex.length == 4 && glossaryFootElem[tempIndex[0]]?.type === "showhide" && elementType === ELEMENT_BLOCKFEATURE){
                glossaryFootElem = newBodymatter[tempIndex[0]]?.interactivedata?.show[tempIndex[0]]
            }
        } else if ((tempIndex.length == 5 || tempIndex.length == 6) && elementType == 'figure' && asideParent?.type === ELEMENT_ASIDE && asideParent?.parent?.type === 'showhide') {
            glossaryFootElem = newBodymatter[tempIndex[0]].interactivedata[asideParent?.parent?.showHideType][tempIndex[2]].elementdata.bodymatter[tempIndex[3]];
            if (tempIndex.length == 6 && glossaryFootElem.type === 'manifest') {
                glossaryFootElem = glossaryFootElem.contents.bodymatter[tempIndex[4]];
            }
        }
        else if(tempIndex.length == 4 && elementType == 'figure' && newBodymatter[tempIndex[0]].type !== "groupedcontent"){ //Figure inside WE
            glossaryFootElem = newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents.bodymatter[tempIndex[2]]
            // Support Glossary/Footnote of elements inside Tab element of TB
        } else if (elementType === ElementConstants.FIGURE && newBodymatter[tempIndex[0]].type === ElementConstants.MULTI_COLUMN && newBodymatter[tempIndex[0]]?.subtype === ElementConstants.TAB) {
            switch (tempIndex.length) {
                case 5:  // Figure element inside Tab of TB
                    glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]];
                    break;
                case 6:  // TB->Tab->AS/WE->HEAD->Figure element
                    glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]];
                    break;
                case 7:  // TB->Tab->AS/WE->BODY->Figure element
                    glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]].contents.bodymatter[tempIndex[5]];
                    break;
            }
        }else if(tempIndex.length == 4 && elementType == 'figure' && newBodymatter[tempIndex[0]].type === "groupedcontent"){ //Figure inside Multi-Column
            glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]]
        }
        else if(tempIndex.length == 3 && elementType == 'figure'){
            glossaryFootElem = newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]]
        }
        else if (tempIndex.length == 5 && elementType === "figure" && newBodymatter[tempIndex[0]].type === 'groupedcontent' ) {
            glossaryFootElem = newBodymatter[tempIndex[0]]?.groupeddata?.bodymatter[tempIndex[1]]?.groupdata?.bodymatter[tempIndex[2]]?.elementdata?.bodymatter[tempIndex[3]];
        }
        else if (tempIndex.length == 6 && elementType === "figure" && newBodymatter[tempIndex[0]].type === 'groupedcontent' ) {
            glossaryFootElem = newBodymatter[tempIndex[0]]?.groupeddata?.bodymatter[tempIndex[1]]?.groupdata?.bodymatter[tempIndex[2]]?.elementdata?.bodymatter[tempIndex[3]]?.contents?.bodymatter[tempIndex[4]];
        }
        else if (elementType === "figure") {
            let tempUpdatedIndex = index.split('-');
            let updatedIndex = tempUpdatedIndex[0];
            if(tempIndex.length == 4 && elementType === ELEMENT_BLOCKFEATURE && newBodymatter[updatedIndex].type == 'groupedcontent'){
                glossaryFootElem = newBodymatter[tempIndex[0]]?.groupeddata?.bodymatter[tempIndex[1]]?.groupdata?.bodymatter[tempIndex[2]]
            } else if((tempIndex.length == 3 || tempIndex.length == 4) && elementType === ELEMENT_BLOCKFEATURE && newBodymatter[updatedIndex].type == ELEMENT_ASIDE){
                glossaryFootElem = newBodymatter[tempIndex[0]]?.elementdata?.bodymatter[tempIndex[0]]
            } else {
                glossaryFootElem = newBodymatter[updatedIndex]
            }
        } else if (elementType === ELEMENT_BLOCKFEATURE && blockfeatureType !== "pullquote" ) {
            let updatedIndex = index;
            if (typeof index === 'string' && index.includes('-')) {
                let tempUpdatedIndex = index.split('-');
                updatedIndex = tempUpdatedIndex[0];
            } // Blockquote element is inside Tab element of TB
            if (elementType === ElementConstants.BLOCKFEATURE && newBodymatter[tempIndex[0]]?.type === ElementConstants.MULTI_COLUMN && newBodymatter[tempIndex[0]]?.subtype === ElementConstants.TAB) {
                let indexesLen = tempIndex.length;
                switch (indexesLen) {
                    case 5: // Blockquote element is inside Tab of TB
                        glossaryFootElem = newBodymatter[tempIndex[0]]?.groupeddata?.bodymatter[tempIndex[1]]?.groupdata?.bodymatter[0].groupeddata?.bodymatter[tempIndex[2]]?.groupdata?.bodymatter[tempIndex[3]];
                        break;
                    case 6: // TB->Tab->AS/WE->HEAD->BQ
                        glossaryFootElem = newBodymatter[tempIndex[0]]?.groupeddata?.bodymatter[tempIndex[1]]?.groupdata?.bodymatter[0].groupeddata?.bodymatter[tempIndex[2]]?.groupdata?.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]];
                        break;
                    case 7:
                        let elementInTab = newBodymatter[tempIndex[0]]?.groupeddata?.bodymatter[tempIndex[1]]?.groupdata?.bodymatter[0].groupeddata?.bodymatter[tempIndex[2]]?.groupdata?.bodymatter[tempIndex[3]];
                        // TB->Tab->AS/WE->BODY->BQ
                        if (elementInTab.type === ElementConstants.ELEMENT_ASIDE && elementInTab.subtype === ElementConstants.ELEMENT_WORKEDEXAMPLE) {
                            glossaryFootElem = newBodymatter[tempIndex[0]]?.groupeddata?.bodymatter[tempIndex[1]]?.groupdata?.bodymatter[0].groupeddata?.bodymatter[tempIndex[2]]?.groupdata?.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]].contents.bodymatter[tempIndex[5]];
                        } else if (elementInTab.type === ElementConstants.SHOW_HIDE) { // TB->Tab->SH->BQ
                            glossaryFootElem = newBodymatter[tempIndex[0]]?.groupeddata?.bodymatter[tempIndex[1]]?.groupdata?.bodymatter[0].groupeddata?.bodymatter[tempIndex[2]]?.groupdata?.bodymatter[tempIndex[3]].interactivedata[asideParent.sectionType][tempIndex[5]];
                        }
                        break;
                    case 8: // TB->Tab->AS/WE->HEAD->S/H->BQ
                        glossaryFootElem = newBodymatter[tempIndex[0]]?.groupeddata?.bodymatter[tempIndex[1]]?.groupdata?.bodymatter[0].groupeddata?.bodymatter[tempIndex[2]]?.groupdata?.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]].interactivedata[asideParent.sectionType][tempIndex[6]];
                        break;
                    case 9: // TB->Tab->AS/WE->BODY->S/H->BQ
                        glossaryFootElem = newBodymatter[tempIndex[0]]?.groupeddata?.bodymatter[tempIndex[1]]?.groupdata?.bodymatter[0].groupeddata?.bodymatter[tempIndex[2]]?.groupdata?.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]].contents.bodymatter[tempIndex[5]].interactivedata[asideParent.sectionType][tempIndex[7]];
                        break;
                }
            } else if (elementType === ELEMENT_BLOCKFEATURE && newBodymatter[tempIndex[0]]?.type == 'groupedcontent') {
                let indexesLen = tempIndex.length;
                switch (indexesLen) {
                    case 4:
                        glossaryFootElem = newBodymatter[tempIndex[0]]?.groupeddata?.bodymatter[tempIndex[1]]?.groupdata?.bodymatter[tempIndex[2]]
                        break;
                    case 5:
                        const glossaryFootnoteElementOfWE = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]];
                        if (glossaryFootnoteElementOfWE?.displayedlabel === "Worked Example") {
                            glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[3]];
                        } else {
                            glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]];
                        }
                        break;
                    case 6:
                        let glossaryFootnoteElementOfWe = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]]?.elementdata ? newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]]?.elementdata.bodymatter[tempIndex[3]] : newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]];
                        if (glossaryFootnoteElementOfWe?.type === 'manifest') {
                            glossaryFootElem = glossaryFootnoteElementOfWe?.contents?.bodymatter[tempIndex[4]];
                        } else if (glossaryFootnoteElementOfWe?.type === 'showhide') {
                            glossaryFootElem = glossaryFootnoteElementOfWe.interactivedata[asideParent.sectionType][tempIndex[4]];
                        }
                        break;
                    case 7:
                        glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]]?.interactivedata[asideParent?.sectionType][tempIndex[5]]
                        break;
                    case 8:
                        glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]].contents?.bodymatter[tempIndex[4]].interactivedata[asideParent?.sectionType][tempIndex[6]]
                        break;
                }
            } else if (elementType === ELEMENT_BLOCKFEATURE && newBodymatter[updatedIndex]?.type == ELEMENT_ASIDE) {
                let indexesLen = tempIndex.length;
                switch (indexesLen) {
                    case 3:
                        glossaryFootElem = newBodymatter[tempIndex[0]]?.elementdata?.bodymatter[tempIndex[1]]
                        break;
                    case 4:
                        glossaryFootElem = newBodymatter[tempIndex[0]]?.elementdata?.bodymatter[tempIndex[1]]?.contents?.bodymatter[tempIndex[2]]
                        break;
                    case 5:
                        glossaryFootElem = newBodymatter[tempIndex[0]]?.elementdata?.bodymatter[tempIndex[1]]?.interactivedata[asideParent?.sectionType][tempIndex[3]]
                        break;
                    case 6:
                        glossaryFootElem = newBodymatter[tempIndex[0]]?.elementdata?.bodymatter[tempIndex[1]]?.contents?.bodymatter[tempIndex[2]].interactivedata[asideParent?.sectionType][tempIndex[4]]
                        break;
                }
            } else if (newBodymatter[tempIndex[0]]?.type === 'showhide' && elementType === ELEMENT_BLOCKFEATURE) {
                let indexesLen = tempIndex.length;
                switch (indexesLen) {
                    case 4:
                        glossaryFootElem = newBodymatter[tempIndex[0]]?.interactivedata[asideParent?.sectionType][tempIndex[2]]
                        break;
                    case 5:
                        glossaryFootElem = newBodymatter[tempIndex[0]]?.interactivedata[asideParent?.parent?.showHideType][tempIndex[2]].elementdata?.bodymatter[tempIndex[3]]
                        break;
                    case 6:
                        glossaryFootElem = newBodymatter[tempIndex[0]]?.interactivedata[asideParent?.parent?.showHideType][tempIndex[2]].elementdata?.bodymatter[tempIndex[3]].contents?.bodymatter[tempIndex[4]];
                        break;
                }
            }
            else {
                glossaryFootElem = newBodymatter[updatedIndex]
            }
        }
        else if (elementType === ELEMENT_BLOCKFEATURE && blockfeatureType === "pullquote") {
            let updatedIndex = index;
            if (typeof index === 'string' && index.includes('-')) {
                let tempUpdatedIndex = index.split('-');
                updatedIndex = tempUpdatedIndex[0];
            } // Pullquote element is inside Tab element of TB
            if (elementType === ElementConstants.BLOCKFEATURE && newBodymatter[tempIndex[0]]?.type === ElementConstants.MULTI_COLUMN && newBodymatter[tempIndex[0]]?.subtype === ElementConstants.TAB) {
                let indexesLen = tempIndex.length;
                switch (indexesLen) {
                    case 4: // Pullquote element is inside Tab of TB
                        glossaryFootElem = newBodymatter[tempIndex[0]]?.groupeddata?.bodymatter[tempIndex[1]]?.groupdata?.bodymatter[0].groupeddata?.bodymatter[tempIndex[2]]?.groupdata?.bodymatter[tempIndex[3]];
                        break;
                    case 5: // TB->Tab->AS/WE->HEAD->PQ
                        glossaryFootElem = newBodymatter[tempIndex[0]]?.groupeddata?.bodymatter[tempIndex[1]]?.groupdata?.bodymatter[0].groupeddata?.bodymatter[tempIndex[2]]?.groupdata?.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]];
                        break;
                    case 6:
                        let elementInTab = newBodymatter[tempIndex[0]]?.groupeddata?.bodymatter[tempIndex[1]]?.groupdata?.bodymatter[0].groupeddata?.bodymatter[tempIndex[2]]?.groupdata?.bodymatter[tempIndex[3]];
                        // TB->Tab->AS/WE->BODY->PQ
                        if (elementInTab.type === ElementConstants.ELEMENT_ASIDE && elementInTab.subtype === ElementConstants.ELEMENT_WORKEDEXAMPLE) {
                            glossaryFootElem = newBodymatter[tempIndex[0]]?.groupeddata?.bodymatter[tempIndex[1]]?.groupdata?.bodymatter[0].groupeddata?.bodymatter[tempIndex[2]]?.groupdata?.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]].contents.bodymatter[tempIndex[5]];
                        } else if (elementInTab.type === ElementConstants.SHOW_HIDE) { // TB->Tab->SH->BQ
                            glossaryFootElem = newBodymatter[tempIndex[0]]?.groupeddata?.bodymatter[tempIndex[1]]?.groupdata?.bodymatter[0].groupeddata?.bodymatter[tempIndex[2]]?.groupdata?.bodymatter[tempIndex[3]].interactivedata[asideParent.sectionType][tempIndex[5]];
                        }
                        break;
                    case 7: // TB->Tab->AS/WE->HEAD->S/H->PQ
                        glossaryFootElem = newBodymatter[tempIndex[0]]?.groupeddata?.bodymatter[tempIndex[1]]?.groupdata?.bodymatter[0].groupeddata?.bodymatter[tempIndex[2]]?.groupdata?.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]].interactivedata[asideParent.sectionType][tempIndex[6]];
                        break;
                    case 8: // TB->Tab->AS/WE->BODY->S/H->PQ
                        glossaryFootElem = newBodymatter[tempIndex[0]]?.groupeddata?.bodymatter[tempIndex[1]]?.groupdata?.bodymatter[0].groupeddata?.bodymatter[tempIndex[2]]?.groupdata?.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]].contents.bodymatter[tempIndex[5]].interactivedata[asideParent.sectionType][tempIndex[7]];
                        break;
                }
            } else if (elementType === ELEMENT_BLOCKFEATURE && newBodymatter[tempIndex[0]]?.type == 'groupedcontent') {
                let indexesLen = tempIndex.length;
                switch (indexesLen) {
                    case 3:
                        glossaryFootElem = newBodymatter[tempIndex[0]]?.groupeddata?.bodymatter[tempIndex[1]]?.groupdata?.bodymatter[tempIndex[2]]
                        break;
                    case 4:
                        glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]];
                        break;
                    case 5:
                        let glossaryFootnoteElementOfWe = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]]?.elementdata ? newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]]?.elementdata.bodymatter[tempIndex[3]] : newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]];
                        if (glossaryFootnoteElementOfWe?.type === 'manifest') {
                            glossaryFootElem = glossaryFootnoteElementOfWe?.contents?.bodymatter[tempIndex[4]];
                        } else if (glossaryFootnoteElementOfWe?.type === 'showhide') {
                            glossaryFootElem = glossaryFootnoteElementOfWe.interactivedata[asideParent.sectionType][tempIndex[4]];
                        }
                        else {
                            glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]]?.interactivedata[asideParent?.sectionType][tempIndex[4]]
                        }
                        break;
                    case 6:
                        glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]]?.interactivedata[asideParent?.sectionType][tempIndex[5]]
                        break;
                    case 7:
                        glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]]?.contents?.bodymatter[tempIndex[4]].interactivedata[asideParent?.sectionType][tempIndex[6]]
                        break;
                }
            } else if (elementType === ELEMENT_BLOCKFEATURE && newBodymatter[updatedIndex]?.type == ELEMENT_ASIDE) {
                let indexesLen = tempIndex.length;
                switch (indexesLen) {
                    case 2:
                        glossaryFootElem = newBodymatter[tempIndex[0]]?.elementdata?.bodymatter[tempIndex[1]]
                        break;
                    case 3:
                        glossaryFootElem = newBodymatter[tempIndex[0]]?.elementdata?.bodymatter[tempIndex[1]]?.contents?.bodymatter[tempIndex[2]]
                        break;
                    case 4:
                        glossaryFootElem = newBodymatter[tempIndex[0]]?.elementdata?.bodymatter[tempIndex[1]]?.interactivedata[asideParent?.sectionType][tempIndex[3]]
                        break;
                    case 5:
                        glossaryFootElem = newBodymatter[tempIndex[0]]?.elementdata?.bodymatter[tempIndex[1]]?.contents?.bodymatter[tempIndex[2]].interactivedata[asideParent?.sectionType][tempIndex[4]]
                        break;
                }
            } else if (newBodymatter[tempIndex[0]]?.type === 'showhide' && elementType === ELEMENT_BLOCKFEATURE) {
                let indexesLen = tempIndex.length;
                switch (indexesLen) {
                    case 3:
                        glossaryFootElem = newBodymatter[tempIndex[0]]?.interactivedata[asideParent?.sectionType][tempIndex[2]]
                        break;
                    case 4:
                        glossaryFootElem = newBodymatter[tempIndex[0]]?.interactivedata[asideParent?.parent?.showHideType][tempIndex[2]].elementdata?.bodymatter[tempIndex[3]]
                        break;
                    case 5:
                        glossaryFootElem = newBodymatter[tempIndex[0]]?.interactivedata[asideParent?.parent?.showHideType][tempIndex[2]].elementdata?.bodymatter[tempIndex[3]].contents?.bodymatter[tempIndex[4]];
                        break;
                }
            }
            else {
                glossaryFootElem = newBodymatter[updatedIndex]
            }
        }
        else if (typeWithPopup && typeWithPopup === "popup" ){
            let indexesLen = tempIndex.length;
            switch (indexesLen){
                case 2:
                    glossaryFootElem = newBodymatter[tempIndex[0]].popupdata[FORMATTED_TITLE];
                    break;

                case 3:
                    glossaryFootElem = newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].popupdata[FORMATTED_TITLE];
                    break;

                case 4:
                    glossaryFootElem = newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents.bodymatter[tempIndex[2]].popupdata[FORMATTED_TITLE];
                    break;
                /*
                    footnote for popup title inside aside element inside multicolumn BG-4750
                */
               case 5:
                    glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]].popupdata[FORMATTED_TITLE];
                    break;
                case 6: // TB->Tab->AS/WE->HEAD->Popup
                    if (newBodymatter[tempIndex[0]]?.type === ElementConstants.MULTI_COLUMN && newBodymatter[tempIndex[0]]?.subtype === ElementConstants.TAB) {
                        glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]].popupdata[FORMATTED_TITLE];
                    } else {  // Multicolumn->AS/WE->BODY->Popup
                        glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]].contents.bodymatter[tempIndex[4]].popupdata[FORMATTED_TITLE];
                    }
                    break;
                case 7: // TB->Tab->AS/WE->BODY->Popup
                    glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]].contents.bodymatter[tempIndex[5]].popupdata[FORMATTED_TITLE];
                    break;
            }
        }
        else if (typeWithPopup && typeWithPopup === 'poetry') {
            let indexesLen = tempIndex.length;
            if (indexesLen === 2) {
                switch (tempIndex[1]) {
                    case "1":
                        glossaryFootElem = newBodymatter[tempIndex[0]].contents[FORMATTED_TITLE] || {};
                        break;
                    // case "3":
                    //     glossaryFootElem = newBodymatter[tempIndex[0]].contents['formatted-caption'] || {};
                    //     break;
                    case "4":
                        glossaryFootElem = (newBodymatter[tempIndex[0]].contents['creditsarray'] ? newBodymatter[tempIndex[0]].contents['creditsarray'][0] : {});
                        break;
                }
            } else if(indexesLen === 3){  /* footnote for PE title inside aside/WE element */
                if(newBodymatter[tempIndex[0]]?.type == ELEMENT_ASIDE){
                    switch (tempIndex[2]) {
                        case "1":
                            glossaryFootElem = newBodymatter[tempIndex[0]]?.elementdata.bodymatter[tempIndex[1]]?.contents[FORMATTED_TITLE] || {}
                            break;
                        case "4":
                            glossaryFootElem = newBodymatter[tempIndex[0]]?.elementdata.bodymatter[tempIndex[1]]?.contents['creditsarray'][0] || {};
                            break;
                    }
                }
            } else if(indexesLen === 4){ /* footnote for PE title inside WE in secion break */
                if(newBodymatter[tempIndex[0]]?.type == ELEMENT_ASIDE){
                    switch (tempIndex[3]) {
                        case "1":
                            glossaryFootElem = newBodymatter[tempIndex[0]]?.elementdata.bodymatter[tempIndex[1]]?.contents.bodymatter[tempIndex[2]]?.contents[FORMATTED_TITLE] || {}
                            break;
                        case "4":
                            glossaryFootElem = newBodymatter[tempIndex[0]]?.elementdata.bodymatter[tempIndex[1]]?.contents.bodymatter[tempIndex[2]]?.contents['creditsarray'][0] || {};
                            break;
                    }
                } else  if(newBodymatter[tempIndex[0]]?.type == "groupedcontent"){ /* footnote for PE title inside multicolumn element */
                    switch (tempIndex[3]) {
                        case "1":
                            glossaryFootElem = newBodymatter[tempIndex[0]]?.groupeddata.bodymatter[tempIndex[1]]?.groupdata.bodymatter[tempIndex[2]]?.contents[FORMATTED_TITLE] || {}
                            break;
                        case "4":
                            glossaryFootElem = newBodymatter[tempIndex[0]]?.groupeddata.bodymatter[tempIndex[1]]?.groupdata.bodymatter[tempIndex[2]]?.contents['creditsarray'][0] || {};
                            break;
                    }
                } else if (newBodymatter[tempIndex[0]]?.interactivedata[asideParent?.sectionType][tempIndex[2]]?.type === 'poetry') { /* footnote for PE title inside SH element */
                    switch (tempIndex[3]) {
                        case "1":
                            glossaryFootElem = newBodymatter[tempIndex[0]]?.interactivedata[asideParent?.sectionType][tempIndex[2]]?.contents[FORMATTED_TITLE] || {}
                            break;
                        case "4":
                            glossaryFootElem = newBodymatter[tempIndex[0]]?.interactivedata[asideParent?.sectionType][tempIndex[2]]?.contents['creditsarray'][0] || {}
                            break;
                    }
                }
            } else if (indexesLen === 5) { /* footnote for PE title inside Tab element in TB */
                switch (tempIndex[4]) {
                    case "1":
                        glossaryFootElem = (newBodymatter[tempIndex[0]]?.groupeddata.bodymatter[tempIndex[1]]?.groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]]?.groupdata.bodymatter[tempIndex[3]]?.contents[FORMATTED_TITLE] ? newBodymatter[tempIndex[0]]?.groupeddata.bodymatter[tempIndex[1]]?.groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]]?.groupdata.bodymatter[tempIndex[3]]?.contents[FORMATTED_TITLE] : { html: '' });
                        break;
                    case "4":
                        glossaryFootElem = (newBodymatter[tempIndex[0]]?.groupeddata.bodymatter[tempIndex[1]]?.groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]]?.groupdata.bodymatter[tempIndex[3]]?.contents['creditsarray'] ? newBodymatter[tempIndex[0]]?.groupeddata.bodymatter[tempIndex[1]]?.groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]]?.groupdata.bodymatter[tempIndex[3]]?.contents['creditsarray'][0] : {});
                        break;
                }
            } // TB->Tab->PS or TB->Tab->As->PS or TB->Tab->WE->PS
        } else if ((tempIndex.length >= 5 && tempIndex.length <= 8) && elementType === ElementConstants.ELEMENT_DIALOGUE && newBodymatter[tempIndex[0]].type === ElementConstants.MULTI_COLUMN && newBodymatter[tempIndex[0]].subtype === ElementConstants.TAB) {
            let elementInsideTab = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]];
            if (elementInsideTab.type === ElementConstants.ELEMENT_ASIDE && elementInsideTab.subtype === "sidebar") {
                glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]];
            } else if (elementInsideTab.type === ElementConstants.ELEMENT_ASIDE && elementInside2C.subtype === ElementConstants.ELEMENT_WORKEDEXAMPLE) {
                glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]];
                if (glossaryFootElem.type === ElementConstants.ELEMENT_SECTION_BREAK) {
                    glossaryFootElem = glossaryFootElem.contents.bodymatter[tempIndex[5]];
                }
            } else {
                glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]];
            }
        } else if ((tempIndex.length >= 4 && tempIndex.length <= 7) && elementType === ELEMENT_DIALOGUE && newBodymatter[tempIndex[0]].type === "groupedcontent") { // MultiColumn->PS or MultiColumn->As->PS or MultiColumn->WE->PS
            let elementInside2C = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]];
            if (elementInside2C.type === ELEMENT_ASIDE && elementInside2C.subtype === "sidebar") {
                glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]];
            } else if (elementInside2C.type === ELEMENT_ASIDE && elementInside2C.subtype === "workedexample") {
                glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]];
                if (glossaryFootElem.type === 'manifest') {
                    glossaryFootElem = glossaryFootElem.contents.bodymatter[tempIndex[4]];
                }
            } else {
                glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]];
            }
        } else if ((tempIndex.length >= 5 && tempIndex.length <= 7) && elementType === ELEMENT_DIALOGUE && asideParent?.parent?.type === 'showhide' && asideParent?.type === ELEMENT_ASIDE && asideParent?.parent?.showHideType) { // S/H->AS/WE->PS
            let elementInsideSH = newBodymatter[tempIndex[0]].interactivedata[asideParent?.parent?.showHideType][tempIndex[2]];
            if (elementInsideSH.subtype === "workedexample" && elementInsideSH.elementdata.bodymatter[tempIndex[3]].type === "manifest" && (tempIndex.length == 6 || tempIndex.length == 7)) {
                glossaryFootElem = newBodymatter[tempIndex[0]].interactivedata[asideParent?.parent?.showHideType][tempIndex[2]].elementdata.bodymatter[tempIndex[3]].contents.bodymatter[tempIndex[4]];
            } else {
                glossaryFootElem = newBodymatter[tempIndex[0]].interactivedata[asideParent?.parent?.showHideType][tempIndex[2]].elementdata.bodymatter[tempIndex[3]];
            }
        } else if (elementType === ELEMENT_DIALOGUE && newBodymatter[tempIndex[0]].type === ELEMENT_ASIDE && newBodymatter[tempIndex[0]].subtype === "workedexample") { //Playscript inside we element
            glossaryFootElem = newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]];
            if (glossaryFootElem.type === 'manifest') {
                glossaryFootElem = glossaryFootElem.contents.bodymatter[tempIndex[2]];
            }
        } else if (elementType === ELEMENT_DIALOGUE && newBodymatter[tempIndex[0]].type === ELEMENT_ASIDE && newBodymatter[tempIndex[0]].subtype === "sidebar") { //Playscript inside aside element
            glossaryFootElem = newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]];
        } else if (elementType === ELEMENT_DIALOGUE) {
            glossaryFootElem = newBodymatter[tempIndex[0]];
        }
        else if (newBodymatter[tempIndex[0]]?.type === "manifestlist") { //Block list condition
            if(tempIndex.length===3){
                glossaryFootElem = newBodymatter[tempIndex[0]].listdata.bodymatter[tempIndex[1]].listitemdata.bodymatter[tempIndex[2]];
            }
            else if(tempIndex.length===5){
                glossaryFootElem = newBodymatter[tempIndex[0]].listdata.bodymatter[tempIndex[1]].listitemdata.bodymatter[tempIndex[2]].listdata.bodymatter[tempIndex[3]].listitemdata.bodymatter[tempIndex[4]];
            }
            else if(tempIndex.length===7){
                glossaryFootElem = newBodymatter[tempIndex[0]].listdata.bodymatter[tempIndex[1]].listitemdata.bodymatter[tempIndex[2]].listdata.bodymatter[tempIndex[3]].listitemdata.bodymatter[tempIndex[4]].listdata.bodymatter[tempIndex[5]].listitemdata.bodymatter[tempIndex[6]];
            }
            else{
                glossaryFootElem = newBodymatter[tempIndex[0]].listdata.bodymatter[tempIndex[1]].listitemdata.bodymatter[tempIndex[2]].listdata.bodymatter[tempIndex[3]].listitemdata.bodymatter[tempIndex[4]].listdata.bodymatter[tempIndex[5]].listitemdata.bodymatter[tempIndex[6]].listdata.bodymatter[tempIndex[7]].listitemdata.bodymatter[tempIndex[8]];
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
                if ((indexesLen == 4 || indexesLen == 5 || indexesLen == 7 || indexesLen == 9 ||indexesLen == 11) && newBodymatter[tempIndex[0]].type === "showhide" && asideParent?.parent?.showHideType) {
                    if(asideParent.type === ElementConstants.BLOCK_LIST) {
                        switch(indexesLen) {
                            case 5: // Blocklist(level1) inside showhide element
                                glossaryFootElem = newBodymatter[indexes[0]]?.interactivedata[asideParent.parent.showHideType][indexes[2]]?.listdata?.bodymatter[indexes[3]]?.listitemdata?.bodymatter[indexes[4]]
                                break;
                            case 7: // Blocklist(level2) inside showhide element
                                glossaryFootElem = newBodymatter[indexes[0]]?.interactivedata[asideParent.parent.showHideType][indexes[2]]?.listdata?.bodymatter[indexes[3]]?.listitemdata.bodymatter[indexes[4]]?.listdata?.bodymatter[indexes[5]]?.listitemdata?.bodymatter[indexes[6]]
                            break;
                            case 9: // Blocklist(level3) inside showhide element
                                glossaryFootElem = newBodymatter[indexes[0]]?.interactivedata[asideParent.parent.showHideType][indexes[2]]?.listdata?.bodymatter[indexes[3]]?.listitemdata?.bodymatter[indexes[4]]?.listdata?.bodymatter[indexes[5]]?.listitemdata?.bodymatter[indexes[6]]?.listdata?.bodymatter[indexes[7]]?.listitemdata?.bodymatter[indexes[8]]
                                break;
                            case 11: // Blocklist(level4) inside showhide element
                                glossaryFootElem = newBodymatter[indexes[0]]?.interactivedata[asideParent.parent.showHideType][indexes[2]]?.listdata?.bodymatter[indexes[3]]?.listitemdata?.bodymatter[indexes[4]]?.listdata?.bodymatter[indexes[5]]?.listitemdata?.bodymatter[indexes[6]]?.listdata.bodymatter[indexes[7]]?.listitemdata?.bodymatter[indexes[8]]?.listdata?.bodymatter[indexes[9]]?.listitemdata?.bodymatter[indexes[10]]
                                break;
                        }

                    } else {
                    // to support glossary in text elements inside WE/AS of S/H
                    glossaryFootElem = newBodymatter[indexes[0]].interactivedata[asideParent.parent.showHideType][indexes[2]].elementdata.bodymatter[indexes[3]];
                    if (indexesLen == 5 && glossaryFootElem.type === 'manifest') {
                        glossaryFootElem = glossaryFootElem.contents.bodymatter[indexes[4]];
                    }} // To support glossary/footnote inside element of Tab of TB
                } else if (newBodymatter[tempIndex[0]].type === ElementConstants.MULTI_COLUMN && newBodymatter[tempIndex[0]]?.subtype === ElementConstants.TAB) {
                    switch (indexesLen) {
                        case 4: // Text elements inside Tab element in TB
                            glossaryFootElem = newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]];
                            break;
                        case 5: // TB->Tab->AS/WE->HEAD->Element
                            glossaryFootElem = newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]].elementdata.bodymatter[indexes[4]];
                            break;
                        case 6:
                            let elementInTab = newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]];
                            // TB->Tab->WE->BODY->Element
                            if (elementInTab?.type === ElementConstants.ELEMENT_ASIDE && elementInTab?.subtype === ElementConstants.ELEMENT_WORKEDEXAMPLE) {
                                glossaryFootElem = newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]].elementdata.bodymatter[indexes[4]].contents.bodymatter[indexes[5]];
                            } else if(elementInTab.type === ElementConstants.BLOCK_LIST) { // Blocklist(level1) inside TB element
                                glossaryFootElem = newBodymatter[indexes[0]]?.groupeddata?.bodymatter[indexes[1]]?.groupdata?.bodymatter[0]?.groupeddata?.bodymatter[indexes[2]]?.groupdata?.bodymatter[indexes[3]]?.listdata?.bodymatter[indexes[4]]?.listitemdata?.bodymatter[indexes[5]]
                            } else { // PE element stanza inside Tab element in TB
                                glossaryFootElem = newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]].contents.bodymatter[indexes[5]];
                            }
                            break;
                        case 8:
                             // Blocklist(level2) inside TB element
                            glossaryFootElem = newBodymatter[indexes[0]]?.groupeddata?.bodymatter[indexes[1]]?.groupdata?.bodymatter[0]?.groupeddata?.bodymatter[indexes[2]]?.groupdata?.bodymatter[indexes[3]]?.listdata?.bodymatter[indexes[4]]?.listitemdata?.bodymatter[indexes[5]]?.listdata?.bodymatter[indexes[6]]?.listitemdata?.bodymatter[indexes[7]]
                            break;
                        case 10:
                             // Blocklist(level3) inside TB element
                            glossaryFootElem = newBodymatter[indexes[0]]?.groupeddata?.bodymatter[indexes[1]]?.groupdata?.bodymatter[0]?.groupeddata?.bodymatter[indexes[2]]?.groupdata?.bodymatter[indexes[3]]?.listdata?.bodymatter[indexes[4]]?.listitemdata?.bodymatter[indexes[5]]?.listdata?.bodymatter[indexes[6]]?.listitemdata?.bodymatter[indexes[7]]?.listdata?.bodymatter[indexes[8]]?.listitemdata?.bodymatter[indexes[9]]
                            break;
                        case 12:
                             // Blocklist(level4) inside TB element
                            glossaryFootElem = newBodymatter[indexes[0]]?.groupeddata?.bodymatter[indexes[1]]?.groupdata?.bodymatter[0]?.groupeddata?.bodymatter[indexes[2]]?.groupdata?.bodymatter[indexes[3]]?.listdata?.bodymatter[indexes[4]]?.listitemdata?.bodymatter[indexes[5]]?.listdata?.bodymatter[indexes[6]]?.listitemdata?.bodymatter[indexes[7]]?.listdata?.bodymatter[indexes[8]]?.listitemdata?.bodymatter[indexes[9]]?.listdata?.bodymatter[indexes[10]]?.listitemdata?.bodymatter[indexes[11]]
                            break;
                    }
                } else if (indexesLen == 4 && newBodymatter[tempIndex[0]].type === "groupedcontent") {  // to support glossary in text elements inside WE/AS of MultiColumn
                    glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]];
                } else if (indexesLen == 2) {
                    condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]]
                    if (condition.versionUrn == elementWorkId) {
                        glossaryFootElem = condition
                    }
                } else if (indexesLen == 3) {
                    if(elementType==='stanza'){
                        condition = newBodymatter[indexes[0]].contents.bodymatter[indexes[2]]
                    } else if (newBodymatter[indexes[0]].type === "groupedcontent") { //All elements inside multi-column except figure
                        condition = newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]]
                    }
                    else {
                        condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]]
                    }
                    if (condition.versionUrn == elementWorkId) {
                        glossaryFootElem = condition
                    }
                } else if (indexesLen == 4) {  // to support glossary in Block Poetry before section break inside WE/Aside
                    if (elementType && elementType === 'stanza') {
                        glossaryFootElem = newBodymatter[indexes[0]]?.elementdata?.bodymatter[indexes[1]]?.contents?.bodymatter[indexes[3]]
                    } else if(asideParent.type === ElementConstants.BLOCK_LIST) { // Blocklist(level1) inside WE/Aside
                        glossaryFootElem = newBodymatter[indexes[0]]?.elementdata?.bodymatter[indexes[1]]?.listdata?.bodymatter[indexes[2]]?.listitemdata?.bodymatter[indexes[3]]
                    } else{
                        // to support glossary in text elements inside WE/AS of MultiColumn
                        glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]];
                    }
                } else if (indexesLen == 5) { // to support glossary in Block Poetry in section break inside WE/MulitColumn
                    if(elementType==='stanza'){
                        if(newBodymatter[indexes[0]]?.type == ELEMENT_ASIDE){
                            glossaryFootElem =  newBodymatter[indexes[0]].elementdata?.bodymatter[indexes[1]].contents?.bodymatter[indexes[2]].contents?.bodymatter[indexes[4]]
                        } else if (newBodymatter[indexes[0]]?.type == "groupedcontent"){
                            glossaryFootElem =  newBodymatter[indexes[0]]?.groupeddata?.bodymatter[indexes[1]]?.groupdata?.bodymatter[indexes[2]]?.contents?.bodymatter[indexes[4]]
                        } else if (newBodymatter[indexes[0]]?.type === "showhide"){ // to support glossary in Block Poetry in SH
                            glossaryFootElem = newBodymatter[indexes[0]]?.interactivedata[asideParent?.showHideType][indexes[2]]?.contents.bodymatter[indexes[4]];
                        }
                    } else if(asideParent.type === ElementConstants.BLOCK_LIST) { // Blocklist(level1) inside WE-SB/2C/3C
                                if(newBodymatter[indexes[0]]?.type == ElementConstants.MULTI_COLUMN) {
                                glossaryFootElem = newBodymatter[indexes[0]]?.groupeddata?.bodymatter[indexes[1]]?.groupdata?.bodymatter[indexes[2]]?.listdata?.bodymatter[indexes[3]]?.listitemdata?.bodymatter[indexes[4]]
                                } else if(newBodymatter[indexes[0]]?.type == ElementConstants.ELEMENT_ASIDE) {
                                    glossaryFootElem = newBodymatter[indexes[0]]?.elementdata?.bodymatter[indexes[1]]?.contents?.bodymatter[indexes[2]]?.listdata?.bodymatter[indexes[3]]?.listitemdata?.bodymatter[indexes[4]]
                                }
                    } else {
                    // to support glossary in section break inside WE of MultiColumn
                    glossaryFootElem = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[indexes[3]].contents.bodymatter[indexes[4]]
                }
                } else if((indexesLen == 7 || indexesLen == 9 || indexesLen == 11) && asideParent.type === ElementConstants.BLOCK_LIST) {
                    switch(indexesLen) {
                        case 7: // Blocklist(level2) inside WE-SB/2C/3C
                            if(newBodymatter[tempIndex[0]].type === ElementConstants.MULTI_COLUMN) {
                                glossaryFootElem = newBodymatter[indexes[0]]?.groupeddata?.bodymatter[indexes[1]]?.groupdata?.bodymatter[indexes[2]]?.listdata?.bodymatter[indexes[3]]?.listitemdata?.bodymatter[indexes[4]]?.listdata?.bodymatter[indexes[5]]?.listitemdata?.bodymatter[indexes[6]]
                            } else if(newBodymatter[indexes[0]]?.type == ElementConstants.ELEMENT_ASIDE) {
                                glossaryFootElem = newBodymatter[indexes[0]]?.elementdata?.bodymatter[indexes[1]]?.contents?.bodymatter[indexes[2]]?.listdata?.bodymatter[indexes[3]]?.listitemdata?.bodymatter[indexes[4]]?.listdata.bodymatter[indexes[5]]?.listitemdata?.bodymatter[indexes[6]]
                            }
                            break;
                        case 9:  // Blocklist(level3) inside WE-SB/2C/3C
                            if(newBodymatter[tempIndex[0]].type === ElementConstants.MULTI_COLUMN) {
                                glossaryFootElem = newBodymatter[indexes[0]]?.groupeddata?.bodymatter[indexes[1]]?.groupdata?.bodymatter[indexes[2]]?.listdata?.bodymatter[indexes[3]]?.listitemdata?.bodymatter[indexes[4]]?.listdata?.bodymatter[indexes[5]]?.listitemdata?.bodymatter[indexes[6]]?.listdata?.bodymatter[indexes[7]]?.listitemdata?.bodymatter[indexes[8]]
                            } else if(newBodymatter[indexes[0]]?.type == ElementConstants.ELEMENT_ASIDE) {
                                glossaryFootElem = newBodymatter[indexes[0]]?.elementdata?.bodymatter[indexes[1]]?.contents?.bodymatter[indexes[2]]?.listdata?.bodymatter[indexes[3]]?.listitemdata?.bodymatter[indexes[4]]?.listdata?.bodymatter[indexes[5]]?.listitemdata?.bodymatter[indexes[6]]?.listdata?.bodymatter[indexes[7]]?.listitemdata?.bodymatter[indexes[8]]
                            }
                            break;
                        case 11:  // Blocklist(level4) inside WE-SB/2C/3C
                            if(newBodymatter[tempIndex[0]].type === ElementConstants.MULTI_COLUMN) {
                                glossaryFootElem = newBodymatter[indexes[0]]?.groupeddata?.bodymatter[indexes[1]]?.groupdata?.bodymatter[indexes[2]]?.listdata?.bodymatter[indexes[3]]?.listitemdata?.bodymatter[indexes[4]]?.listdata?.bodymatter[indexes[5]]?.listitemdata?.bodymatter[indexes[6]]?.listdata?.bodymatter[indexes[7]]?.listitemdata?.bodymatter[indexes[8]]?.listdata?.bodymatter[indexes[9]]?.listitemdata?.bodymatter[indexes[10]]
                            } else if(newBodymatter[indexes[0]]?.type == ElementConstants.ELEMENT_ASIDE) {
                                glossaryFootElem = newBodymatter[indexes[0]]?.elementdata?.bodymatter[indexes[1]]?.contents?.bodymatter[indexes[2]]?.listdata?.bodymatter[indexes[3]]?.listitemdata?.bodymatter[indexes[4]]?.listdata?.bodymatter[indexes[5]]?.listitemdata?.bodymatter[indexes[6]]?.listdata?.bodymatter[indexes[7]]?.listitemdata?.bodymatter[indexes[8]]?.listdata?.bodymatter[indexes[9]]?.listitemdata?.bodymatter[indexes[10]]
                            }
                            break;
                    }
                } else if((indexesLen == 6 || indexesLen == 8 || indexesLen == 10) && asideParent.type === ElementConstants.BLOCK_LIST) {
                    switch(indexesLen) {
                        case 6: // Blocklist(level2) inside WE/Aside
                                glossaryFootElem = newBodymatter[indexes[0]]?.elementdata?.bodymatter[indexes[1]]?.listdata?.bodymatter[indexes[2]]?.listitemdata.bodymatter[indexes[3]]?.listdata?.bodymatter[indexes[4]]?.listitemdata?.bodymatter[indexes[5]]
                            break;
                        case 8:  // Blocklist(level3) inside WE/Aside
                                glossaryFootElem = newBodymatter[indexes[0]]?.elementdata?.bodymatter[indexes[1]]?.listdata?.bodymatter[indexes[2]]?.listitemdata?.bodymatter[indexes[3]]?.listdata?.bodymatter[indexes[4]]?.listitemdata?.bodymatter[indexes[5]]?.listdata?.bodymatter[indexes[6]]?.listitemdata?.bodymatter[indexes[7]]
                            break;
                        case 10:  // Blocklist(level4) inside WE/Aside
                                glossaryFootElem = newBodymatter[indexes[0]]?.elementdata?.bodymatter[indexes[1]]?.listdata?.bodymatter[indexes[2]]?.listitemdata?.bodymatter[indexes[3]]?.listdata?.bodymatter[indexes[4]]?.listitemdata?.bodymatter[indexes[5]]?.listdata?.bodymatter[indexes[6]]?.listitemdata?.bodymatter[indexes[7]]?.listdata?.bodymatter[indexes[8]]?.listitemdata?.bodymatter[indexes[9]]
                            break;
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
        const title = audioPath?.split("/")?.pop()?.replace(/%20/g,' ');
        const data = {
            'title':{
                'en':title
            },
            'narrativeAudioUrn': audioId,
            'location':audioPath
        }
       store.dispatch(handleGlossaryActions(true,data));
    } else {
       store.dispatch( handleGlossaryActions(false,{}))
    }

    if(footnoteContentText && footnoteContentText.includes('imageAssetContent')) {
        let div = document.createElement('div');
        div.innerHTML = footnoteContentText
        let glossaryImageAssets = div.getElementsByTagName('img');
        for (let i = 0; i < glossaryImageAssets.length; i++) {
            if(glossaryImageAssets[i]?.attributes?.class?.nodeValue ==='imageAssetContent'){
                const imagePath = glossaryImageAssets[i]?.attributes?.src?.nodeValue
                const imageId = glossaryImageAssets[i]?.attributes?.imageid?.nodeValue
                const altText = glossaryImageAssets[i]?.attributes?.alt?.nodeValue
                const classValue = glossaryImageAssets[i]?.attributes?.class?.nodeValue
                const imageHeight = glossaryImageAssets[i]?.attributes?.height?.nodeValue
                const imageWidth = glossaryImageAssets[i]?.attributes?.width?.nodeValue
                const title = imagePath?.split("/")?.pop()?.replace(/%20/g,' ');
                const Longdescription = glossaryImageAssets[i]?.attributes?.longdescription?.nodeValue
                const data = {
                        imageid: imageId,
                        path:imagePath,
                        alttext:altText,
                        height:imageHeight,
                        width:imageWidth,
                        class:classValue,
                        title:title,
                        longdescription:Longdescription
                    }
                store.dispatch(handleFigureGlossaryActions(true, data));
            }
        }
    }
     else {
       store.dispatch(handleFigureGlossaryActions(false,{}))
    }

    dispatch(updateMarkedIndexStore(glossaryContentText, glossaryFootElem, glossaaryFootnoteValue, index));

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

function handleFigureGlossaryActions(figurepopup,figuredata){
    return dispatch =>{
        dispatch({ type: ADD_FIGURE_GLOSSARY_POPUP, payload: figurepopup })
        dispatch({ type: SET_FIGURE_GLOSSARY, payload: figuredata })
    }
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

function alterFigureAttr(type, figureGlossaryData, addAttributeInDfn, glossaryfootnoteid, workEditor, workContainer) {
    for (let i = 0; i < addAttributeInDfn.length; i++) {
        let currentAddAttributeInDfn = addAttributeInDfn[i];
        let currentData = addAttributeInDfn[i].outerHTML
        let currentDataUri = currentData.slice(currentData.indexOf('data-uri')).split("\"")[1];
        if (currentDataUri === glossaryfootnoteid) {
            if (type == 'add') {
                currentAddAttributeInDfn.setAttribute('image-id', figureGlossaryData.imageid)
                currentAddAttributeInDfn.setAttribute('image-path', figureGlossaryData.path)
            } else if (type == 'remove') {
                currentAddAttributeInDfn.removeAttribute('image-id')
                currentAddAttributeInDfn.removeAttribute('image-path')
            }
        }
        workContainer = workEditor.innerHTML;
    }
    return workContainer;
}

/**
 * This function will add or remove mark-index-id attribute from workContainer
 * @param {*} type, which operation need to perform "add" or "remove"
 * @param {*} markedIndexedURN, URN of marked index
 * @param {*} glossaryfootnoteid, Id of glossary container element
 * @param {*} workContainer, HTML element to which mark-index-id attribute needs to be added
 * @returns WorkContainer wiht mark-index-id attribute
 */

function alterMarkedIndexAttr(type, markedIndexedURN, addAttributeInDfn, glossaryfootnoteid, workEditor, workContainer) {
    for (let i = 0; i < addAttributeInDfn.length; i++) {
        let currentAddAttributeInDfn = addAttributeInDfn[i];
        let currentData = addAttributeInDfn[i].outerHTML
        let currentDataUri = currentData.slice(currentData.indexOf('data-uri')).split("\"")[1];
        if (currentDataUri === glossaryfootnoteid) {
            if (type == 'add') {
                currentAddAttributeInDfn.setAttribute('mark-index-id', markedIndexedURN)
            } else if (type == 'remove') {
                currentAddAttributeInDfn.removeAttribute('mark-index-id')
            }
        }
        workContainer = workEditor.innerHTML;
    }
    return workContainer;
}

/**
 * saveGlossaryAndFootnote | this method is used for to save glossary, footnote and markedIndex
 * @param {*} elementWorkId, element's workurn of which glosssary&footnote is being saved
 * @param {*} elementType, element's type of which glosssary&footnote is being saved
 * @param {*} glossaryfootnoteid, glosary/footnote's work id
 * @param {*} type, type whether glossary or footnote
 */
export const saveGlossaryAndFootnote = (elementWorkId, elementType, glossaryfootnoteid, type, term, definition, elementSubType, typeWithPopup, blockfeatureType, poetryField,audioGlossaryData,figureGlossaryData, indexEntries, crossReferences) => {
    if(!glossaryfootnoteid) return false
    let glossaryEntry = Object.create({})
    let footnoteEntry = Object.create({})
    let indexEntry = Object.create({})
    let semanticType = type.toUpperCase()
    const indexElement = type ==='Markedindex' ? store.getState().markedIndexReducer.elementIndex : store.getState().glossaryFootnoteReducer.elementIndex;
    let data = {}, figureDataObj
    var index = indexElement;
    const slateId = config.slateManifestURN;
    const parentData = store.getState().appStore.slateLevelData;
    let newParentData = JSON.parse(JSON.stringify(parentData));
    let newBodymatter = newParentData[slateId].contents.bodymatter;
    let workEditor, workContainer;
    let currentElement = store.getState().appStore.activeElement;
    const showHideElement = store.getState().appStore?.showHideObj;

    /** Feedback status from elementData */
    let elementNodeData = document.querySelector(`[data-id='${elementWorkId}']`)?document.querySelector(`[data-id='${elementWorkId}']`).outerHTML.includes('feedback'):false
    let tcmFeedback =  elementNodeData;
    let asideParent = store.getState().appStore?.asideData
    const shParentUrn = store.getState().appStore?.parentUrn
    let innerSH_Index = index &&  typeof (index) !== 'number' && index.split('-');
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
        }else if (tempIndex.length == 5) {
            elementIndex = tempIndex[0]+'-'+tempIndex[1]+'-'+tempIndex[2]+'-'+tempIndex[3]
        }
        else if (tempIndex.length == 6) {
            elementIndex = tempIndex[0]+'-'+tempIndex[1]+'-'+tempIndex[2]+'-'+tempIndex[3]+'-'+tempIndex[4]
        }
        else {
            elementIndex = tempIndex[0]
        }
        if(showHideElement ||  asideParent?.type === 'showhide'){ /** Glossary-Footnotes inside Show-Hide */
            elementIndex = getShowHideIndex(tempIndex)
            innerSH_Index = elementIndex;
            innerSH_Index = innerSH_Index?.split('-')
        }
        label = document.getElementById('cypress-' + elementIndex + '-0')?.innerHTML //cypress-1-0
        number = document.getElementById('cypress-' + elementIndex + '-1')?.innerHTML //cypress-1-1
        title = document.getElementById('cypress-' + elementIndex + '-2')?.innerHTML //cypress-1-2


        if(elementSubType == 'image' || elementSubType === 'tableasmarkup' || elementSubType === "audio" || elementSubType === "video" || elementSubType === 'table' || elementSubType === "mathImage"){
            captions = document.getElementById('cypress-' + elementIndex + '-3')?.innerHTML //cypress-1-3
            credits = document.getElementById('cypress-' + elementIndex + '-4')?.innerHTML //cypress-1-4
            if (elementSubType === 'tableasmarkup') {
                if(document.getElementById(elementIndex + '-tableData')) {
                    tableAsHTML = document.getElementById(elementIndex + '-tableData')?.innerHTML;
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
    }
    else if(elementType == ELEMENT_BLOCKFEATURE){
        let elementIndex = indexElement
        if (typeof index === 'string' && index.includes('-')) {
            let tempIndex = index && typeof (index) !== 'number' && index.split('-');
            if (tempIndex.length === 9) {
                elementIndex = tempIndex[0] + '-' + tempIndex[1] + '-' + tempIndex[2] + '-' + tempIndex[3] + '-' + tempIndex[4] + '-' + tempIndex[5] + '-' + tempIndex[6] + '-' + tempIndex[7] + '-' + tempIndex[8]
            } else if (tempIndex.length == 8) {
                elementIndex = tempIndex[0] + '-' + tempIndex[1] + '-' + tempIndex[2] + '-' + tempIndex[3] + '-' + tempIndex[4] + '-' + tempIndex[5] + '-' + tempIndex[6] + '-' + tempIndex[7]
            } else if (tempIndex.length == 7) {
                elementIndex = tempIndex[0] + '-' + tempIndex[1] + '-' + tempIndex[2] + '-' + tempIndex[3] + '-' + tempIndex[4] + '-' + tempIndex[5] + '-' + tempIndex[6]
            } else if (tempIndex.length == 6) {
                elementIndex = tempIndex[0] + '-' + tempIndex[1] + '-' + tempIndex[2] + '-' + tempIndex[3] + '-' + tempIndex[4] + '-' + tempIndex[5]
            } else if (tempIndex.length == 5) {
                elementIndex = tempIndex[0] + '-' + tempIndex[1] + '-' + tempIndex[2] + '-' + tempIndex[3] + '-' + tempIndex[4]
            } else if (tempIndex.length == 4) {
                elementIndex = tempIndex[0] + '-' + tempIndex[1] + '-' + tempIndex[2] + '-' + tempIndex[3]
            }
            else if (tempIndex.length == 3) {
                elementIndex = tempIndex[0] + '-' + tempIndex[1] + '-' + tempIndex[2]
            } else {
                elementIndex = tempIndex[0] + '-' + tempIndex[1]
            }
        }
        const bqNode = document.getElementById('cypress-' + elementIndex)
        workContainer = blockfeatureType === "pullquote" ? bqNode?.innerHTML : prepareBqHtml(bqNode);
        workContainer = workContainer.replace(/data-mce-href="#"/g,'').replace(/ reset/g,'')
        figureDataObj = {
            "text": workContainer
        }
    }
    else {
        workEditor = document.getElementById('cypress-' + index)
         workContainer = workEditor.innerHTML;

        let addAttributeInDfn = workEditor.getElementsByTagName('dfn');

        if (audioGlossaryData && Object.keys(audioGlossaryData).length > 0) {
            workContainer = alterAttr('add',audioGlossaryData, addAttributeInDfn, glossaryfootnoteid, workEditor,workContainer);
        }else{
            workContainer= alterAttr('remove',audioGlossaryData, addAttributeInDfn, glossaryfootnoteid, workEditor,workContainer);
        }

        if (figureGlossaryData && Object.keys(figureGlossaryData).length > 0) {
            workContainer = alterFigureAttr('add',figureGlossaryData, addAttributeInDfn, glossaryfootnoteid, workEditor,workContainer);
        }else{
            workContainer= alterFigureAttr('remove',figureGlossaryData, addAttributeInDfn, glossaryfootnoteid, workEditor,workContainer);
        }

        // This code will add the mark-index-id attribute in the html stored in the workcontainer variable
        let markedIndexURN = indexEntries && Object.keys(indexEntries).length > 0 && Object.keys(indexEntries)[0];
        if (markedIndexURN) {
            workContainer = alterMarkedIndexAttr('add',markedIndexURN, addAttributeInDfn, glossaryfootnoteid, workEditor,workContainer);
        }else{
            workContainer= alterMarkedIndexAttr('remove',{}, addAttributeInDfn, glossaryfootnoteid, workEditor,workContainer);
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
                if(newBodymatter[elemIndex[0]]?.type == "groupedcontent"){ /* contentURN for PE title inside multicolumn element */
                    parentEntityUrn = newBodymatter[elemIndex[0]]?.groupeddata?.bodymatter[elemIndex[1]]?.groupdata.bodymatter[elemIndex[2]]?.contentUrn
                }
                else if (typeWithPopup === "poetry") { /* contentURN for PE title inside SH element */
                    const showhideTypeVal = asideParent?.sectionType;
                    parentEntityUrn = newBodymatter[elemIndex[0]]?.interactivedata[showhideTypeVal][elemIndex[2]]?.contents[FORMATTED_TITLE].contentUrn
                }
                else {
                    parentEntityUrn = newBodymatter[elemIndex[0]].elementdata.bodymatter[elemIndex[1]].contents.bodymatter[elemIndex[2]].contentUrn
                }
                break;
            case 5: // when PE element is inside Tab element of TB
                if (typeWithPopup === ElementConstants.POETRY_ELEMENT) {
                    parentEntityUrn = newBodymatter[elemIndex[0]]?.groupeddata.bodymatter[elemIndex[1]]?.groupdata.bodymatter[0].groupeddata.bodymatter[elemIndex[2]]?.groupdata.bodymatter[elemIndex[3]].contentUrn;
                }
                break;
        }
    }
    else if(appStore.parentUrn && appStore.parentUrn.contentUrn) { // For Aside/WE
        parentEntityUrn = appStore.parentUrn.contentUrn
    }
    else if(asideParent?.type === ElementConstants.BLOCK_LIST  && index && typeof (index) !== 'number'){ // parentEntityUrn for Glossary/Footnote inside blocklist
        let indexes = index.split('-');
        let indexesLen = indexes.length
        parentEntityUrn = asideParent?.parentManifestList?.listdata?.bodymatter[indexes[indexesLen - 2]]?.contentUrn
    }
    else{ // elements in a slate
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
                    indexEntries,
                    assetspopover: {}
                },
                projectUrn : config.projectUrn,
                slateEntity : config.slateEntityURN,
                elementParentEntityUrn: parentEntityUrn
            }
            break;

            case "MARKEDINDEX":
            indexEntry[glossaryfootnoteid] = JSON.stringify({
                firstLevelEntry: term,
                secondLevelEntry: definition,
                crossReferences
                })
                data = {
                    id: elementWorkId,
                    type: elementType,
                    versionUrn: null,
                    contentUrn: null,
                    feedback: tcmFeedback,
                    html: {
                        ...figureDataObj,
                        glossaryentries:{},
                        indexEntries: indexEntry,
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
    if(showHideElement ||  asideParent?.type === 'showhide'){
        data.sectionType = asideParent?.sectionType; //showhideTypeVal
    }
    sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })  //show saving spinner

    let tcmParentData,tcmMainBodymatter,tcmBodymatter;
    if (elementTypeData.indexOf(elementType) !== -1) {
        /** For TCM snapshots */
        let mainSlateId = config.isPopupSlate ? config.tempSlateManifestURN : config.slateManifestURN;
        tcmBodymatter = store.getState().appStore.slateLevelData[config.slateManifestURN].contents.bodymatter;
        tcmParentData = (asideParent?.type == 'showhide' || asideParent?.type == 'poetry' || (asideParent?.parent?.type === 'showhide'))  ? { asideData: asideParent, parentUrn: shParentUrn } : fetchParentData(tcmBodymatter, index);
        tcmMainBodymatter = store.getState().appStore.slateLevelData[mainSlateId].contents.bodymatter;
    }
    /** ----------------- */
    let url = `${config.REACT_APP_API_URL}v1/slate/element?type=${type.toUpperCase()}&id=${glossaryfootnoteid}`
    return axios.put(url, JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
            'myCloudProxySession': config.myCloudProxySession
        }
    }).then( async res => {
        let parentData1 = store.getState().appStore.slateLevelData;
        let currentParentData = JSON.parse(JSON.stringify(parentData1));
        let currentSlateData = currentParentData[config.slateManifestURN];
        let poetryData;
        /** [PCAT-8289] ----------------------------------- TCM Snapshot Data handling ---------------------------------*/
        // This check is added to prevent snapshots for TB element, it will be removed when TB element will support TCM
        const isTbElement = asideParent?.subtype === ElementConstants.TAB || asideParent?.parent?.subtype === ElementConstants.TAB || asideParent?.grandParent?.asideData?.subtype === ElementConstants.TAB || asideParent?.grandParent?.asideData?.parent?.subtype === ElementConstants.TAB;
        const isBlockListElement = asideParent.type === ElementConstants.BLOCK_LIST
        // Making condition true for triggering slate level save api
        localStorage.setItem('isChangeInSlate', 'true');
        if (!isTbElement && !isBlockListElement) {
            if (elementTypeData.indexOf(elementType) !== -1 && typeWithPopup !== "poetry") {
                let showhideTypeVal = "", showHideObject = undefined
                if ((showHideElement || asideParent?.type === 'showhide') && elementType !== ELEMENT_BLOCKFEATURE) { /** Glossary-Footnotes inside Show-Hide */
                    showhideTypeVal = asideParent?.sectionType;//findSectionType(shTypeIndex?.toString())
                    let showhideElement = getShowHideElement(tcmBodymatter, innerSH_Index.length, innerSH_Index, elementType, asideParent);
                    let innerSH_Element = showhideTypeVal && showhideElement?.interactivedata[showhideTypeVal][innerSH_Index]
                    showHideObject = {
                        currentElement: innerSH_Element,
                        index: innerSH_Index,
                        element: showhideElement,
                        showHideType: showhideTypeVal
                    }
                }
                if (typeWithPopup === 'stanza' && asideParent?.grandParent) {
                    // stanza is inside container
                    poetryData = {
                        type: "poetry",
                        parentUrn: asideParent,
                        id: asideParent.id,
                        contentUrn: asideParent.contentUrn
                    }
                }
                let elementUpdateData = {
                    currentParentData: currentParentData,
                    updateBodymatter: tcmBodymatter,
                    response: res.data,
                    updatedId: elementWorkId,
                    slateManifestUrn: config.slateManifestURN,
                    CurrentSlateStatus: currentSlateData?.status,
                    cypressPlusProjectStatus: store.getState()?.appStore?.isCypressPlusEnabled
                },
                    containerElement = {
                        asideData: tcmParentData.asideData,
                        parentUrn: tcmParentData.parentUrn,
                        parentElement: data.metaDataField ? fetchElementWipData(tcmMainBodymatter, index, 'popup') : undefined,
                        metaDataField: data.metaDataField ? data.metaDataField : undefined,
                        sectionType: showhideTypeVal,
                        CurrentSlateStatus: currentSlateData?.status,
                        showHideObj: showHideObject,
                        poetryData
                    };
                if (currentSlateData && currentSlateData.status === 'approved') {
                    await tcmSnapshotsForUpdate(elementUpdateData, index, containerElement, store.dispatch, "");
                }
                else {
                    tcmSnapshotsForUpdate(elementUpdateData, index, containerElement, store.dispatch, "");
                }
            }
        }
        /**-------------------------------------------------------------------------------------------------------------*/
        if(res.data.id !== data.id && currentSlateData.status === 'approved'){
            sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
        }
        let tempIndex = index &&  typeof (index) !== 'number' && index.split('-');

        if (showHideElement || asideParent?.type === 'showhide'  && (newBodymatter[tempIndex[0]]?.interactivedata?.[asideParent?.sectionType][tempIndex[2]]?.type!=='poetry') && elementType !== ELEMENT_BLOCKFEATURE) {/** Glossary-Footnotes inside Show-Hide */
            newBodymatter = onGlossaryFnUpdateSuccessInShowHide(res.data, newBodymatter, elementType, asideParent?.sectionType, tempIndex, asideParent)
            if(tempIndex.length == 4 && asideParent?.type === 'showhide' && elementType === ELEMENT_BLOCKFEATURE){
                newBodymatter[tempIndex[0]].interactivedata.show[tempIndex[2]] = res.data;
            }
        } else if ((tempIndex.length == 5 || tempIndex.length == 6) && elementType == 'figure' && asideParent?.type === ELEMENT_ASIDE && asideParent?.parent?.type === 'showhide') {
            let elementInSH = newBodymatter[tempIndex[0]].interactivedata[asideParent?.parent?.showHideType][tempIndex[2]];
            if (elementInSH.subtype === "workedexample" && tempIndex.length == 6 && elementInSH.elementdata.bodymatter[tempIndex[3]].type === 'manifest') {
                newBodymatter[tempIndex[0]].interactivedata[asideParent.parent.showHideType][tempIndex[2]].elementdata.bodymatter[tempIndex[3]].contents.bodymatter[tempIndex[4]] = res.data;
            } else {
                newBodymatter[tempIndex[0]].interactivedata[asideParent.parent.showHideType][tempIndex[2]].elementdata.bodymatter[tempIndex[3]] = res.data;
            } // Support Glossary/Footnote of elements inside Tab element of TB
        } else if (elementType === ElementConstants.FIGURE && newBodymatter[tempIndex[0]].type === ElementConstants.MULTI_COLUMN && newBodymatter[tempIndex[0]]?.subtype === ElementConstants.TAB) {
            switch (tempIndex.length) {
                case 5: // TB->Tab->Figure element
                    newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]] = res.data;
                    break;
                case 6:  // TB->Tab->AS/WE->HEAD->Figure element
                    newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]] = res.data;
                    break;
                case 7:  // TB->Tab->AS/WE->BODY->Figure element
                    newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]].contents.bodymatter[tempIndex[5]] = res.data;
                    break;
            }
        }
        else if (tempIndex.length == 4 && elementType == 'figure' && newBodymatter[tempIndex[0]].type === "groupedcontent") { //Figure inside a Multi-column container
            newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]] = res.data
        } else if (tempIndex.length == 4 && elementType == 'figure' && typeWithPopup !== "popup") {//Figure inside a WE
            newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents.bodymatter[tempIndex[2]] = res.data
        } else if (tempIndex.length == 3 && elementType =='figure') {//section 2 figure in WE
            newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]] = res.data
        } else if (tempIndex.length === 5 && elementType == 'figure') {
            newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]] = res.data;
        }
        else if (tempIndex.length === 6 && elementType == 'figure') {
            newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]].contents.bodymatter[tempIndex[4]] = res.data;
        }
        else if (elementType === "figure") {
            let updatedIndex = index.split('-')[0];
            if(tempIndex.length === 4 && newBodymatter[updatedIndex].type === 'groupedcontent' && elementType === ELEMENT_BLOCKFEATURE){
                newBodymatter[updatedIndex].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]] = res.data;
            } else if((tempIndex.length === 3 || tempIndex.length === 4) && newBodymatter[updatedIndex].type === ELEMENT_ASIDE){
                newBodymatter[updatedIndex].elementdata.bodymatter[tempIndex[1]] = res.data;
            } else if(tempIndex.length == 4 && newBodymatter[updatedIndex].type === 'showhide' && elementType === ELEMENT_BLOCKFEATURE) {
                newBodymatter[tempIndex[0]].interactivedata.show[tempIndex[2]] = res.data;
            } else{
                newBodymatter[updatedIndex] = res.data;
            }
        }
        else if (elementType === ELEMENT_BLOCKFEATURE && blockfeatureType !== "pullquote") {
            let updatedIndex = index;
            if (typeof index === 'string' && index.includes('-')) {
                let tempUpdatedIndex = index.split('-');
                updatedIndex = tempUpdatedIndex[0];
            }
            if (elementType === ElementConstants.BLOCKFEATURE && newBodymatter[tempIndex[0]]?.type === ElementConstants.MULTI_COLUMN && newBodymatter[tempIndex[0]]?.subtype === ElementConstants.TAB) {
                let indexesLen = tempIndex.length;
                switch (indexesLen) {
                    case 5: // Blockquote element is inside Tab of TB
                        newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]] = res.data;
                        break;
                    case 6: // TB->Tab->AS/WE->HEAD->BQ
                        newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]] = res.data;
                        break;
                    case 7:
                        let elementInTab = newBodymatter[tempIndex[0]]?.groupeddata?.bodymatter[tempIndex[1]]?.groupdata?.bodymatter[0].groupeddata?.bodymatter[tempIndex[2]]?.groupdata?.bodymatter[tempIndex[3]];
                        // TB->Tab->AS/WE->BODY->BQ
                        if (elementInTab.type === ElementConstants.ELEMENT_ASIDE && elementInTab.subtype === ElementConstants.ELEMENT_WORKEDEXAMPLE) {
                            newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]].contents.bodymatter[tempIndex[5]] = res.data;
                        } else if (elementInTab.type === ElementConstants.SHOW_HIDE) { // TB->Tab->SH->BQ
                            newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].interactivedata[asideParent.sectionType][tempIndex[5]] = res.data;
                        }
                        break;
                    case 8: // TB->Tab->AS/WE->HEAD->S/H->BQ
                        newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]].interactivedata[asideParent.sectionType][tempIndex[6]] = res.data;
                        break;
                    case 9: // TB->Tab->AS/WE->BODY->S/H->BQ
                        newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]].contents.bodymatter[tempIndex[5]].interactivedata[asideParent.sectionType][tempIndex[7]] = res.data;
                        break;

                }
            } else if (newBodymatter[tempIndex[0]]?.type === 'groupedcontent' && elementType === ELEMENT_BLOCKFEATURE) {
                let indexesLen = tempIndex.length;
                switch (indexesLen) {
                    case 4: {
                        newBodymatter[updatedIndex].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]] = res.data;
                        break;
                    }
                    case 5: {
                        let glossaryFootnoteElementOfWe = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]]
                        if (glossaryFootnoteElementOfWe?.displayedlabel === "Worked Example") {
                            newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]] = res.data;
                        } else {
                            newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]] = res.data;
                        }
                        break;
                    }
                    case 6: {
                        let glossaryFootnoteElementOfWe = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]]?.elementdata ? newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]]?.elementdata.bodymatter[tempIndex[3]] : newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]];
                        if (glossaryFootnoteElementOfWe?.type === 'manifest') {
                            glossaryFootnoteElementOfWe.contents.bodymatter[tempIndex[4]] = res.data;
                        }
                        else if (glossaryFootnoteElementOfWe?.type === 'showhide') {
                            glossaryFootnoteElementOfWe.interactivedata[asideParent.sectionType][tempIndex[4]] = res.data;
                        }
                        break;
                    }
                    case 7:
                        newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]].interactivedata[asideParent.sectionType][tempIndex[5]] = res.data;
                        break;
                    case 8:
                        newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]].contents.bodymatter[tempIndex[4]].interactivedata[asideParent.sectionType][tempIndex[6]] = res.data;
                        break;
                }
            } else if (newBodymatter[updatedIndex]?.type === ELEMENT_ASIDE) {
                let indexesLen = tempIndex.length;
                switch (indexesLen) {
                    case 3: {
                        newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]] = res.data;
                        break;
                    }
                    case 4: {
                        newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents.bodymatter[tempIndex[2]] = res.data;
                        break;
                    }
                    case 5: {
                        newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].interactivedata[asideParent.sectionType][tempIndex[3]] = res.data;
                        break;
                    }
                    case 6: {
                        newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents.bodymatter[tempIndex[2]].interactivedata[asideParent.sectionType][tempIndex[4]] = res.data;
                        break;
                    }
                }
            } else if (newBodymatter[tempIndex[0]]?.type === 'showhide' && elementType === ELEMENT_BLOCKFEATURE) {
                let indexesLen = tempIndex.length;
                switch (indexesLen) {
                    case 4:
                        newBodymatter[tempIndex[0]].interactivedata[asideParent?.sectionType][tempIndex[2]] = res.data
                        break;
                    case 5:
                        newBodymatter[tempIndex[0]].interactivedata[asideParent.parent.showHideType][tempIndex[2]].elementdata.bodymatter[tempIndex[3]] = res.data
                        break;
                    case 6:
                        newBodymatter[tempIndex[0]].interactivedata[asideParent.parent.showHideType][tempIndex[2]].elementdata.bodymatter[tempIndex[3]].contents.bodymatter[tempIndex[4]] = res.data
                        break;
                }
            }
            else {
                newBodymatter[updatedIndex] = res.data;
            }
        }
        else if (elementType === ELEMENT_BLOCKFEATURE && blockfeatureType === "pullquote") {
            let updatedIndex = index;
            if (typeof index === 'string' && index.includes('-')) {
                let tempUpdatedIndex = index.split('-');
                updatedIndex = tempUpdatedIndex[0];
            } // Pullquote element is inside Tab element of TB
            if (elementType === ElementConstants.BLOCKFEATURE && newBodymatter[tempIndex[0]]?.type === ElementConstants.MULTI_COLUMN && newBodymatter[tempIndex[0]]?.subtype === ElementConstants.TAB) {
                let indexesLen = tempIndex.length;
                switch (indexesLen) {
                    case 4: // Pullquote element is inside Tab of TB
                        newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]] = res.data;
                        break;
                    case 5: // TB->Tab->AS/WE->HEAD->PQ
                        newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]] = res.data;
                        break;
                    case 6:
                        let elementInTab = newBodymatter[tempIndex[0]]?.groupeddata?.bodymatter[tempIndex[1]]?.groupdata?.bodymatter[0].groupeddata?.bodymatter[tempIndex[2]]?.groupdata?.bodymatter[tempIndex[3]];
                        // TB->Tab->AS/WE->BODY->PQ
                        if (elementInTab.type === ElementConstants.ELEMENT_ASIDE && elementInTab.subtype === ElementConstants.ELEMENT_WORKEDEXAMPLE) {
                            newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]].contents.bodymatter[tempIndex[5]] = res.data;
                        } else if (elementInTab.type === ElementConstants.SHOW_HIDE) { // TB->Tab->SH->BQ
                            newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].interactivedata[asideParent.sectionType][tempIndex[5]] = res.data;
                        }
                        break;
                    case 7: // TB->Tab->AS/WE->HEAD->S/H->PQ
                        newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]].interactivedata[asideParent.sectionType][tempIndex[6]] = res.data;
                        break;
                    case 8: // TB->Tab->AS/WE->BODY->S/H->PQ
                        newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]].contents.bodymatter[tempIndex[5]].interactivedata[asideParent.sectionType][tempIndex[7]] = res.data;
                        break;
                }
            } else if (newBodymatter[tempIndex[0]]?.type === 'groupedcontent' && elementType === ELEMENT_BLOCKFEATURE) {
                let indexesLen = tempIndex.length;
                switch (indexesLen) {
                    case 3: {
                        newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]] = res.data;
                        break;
                    }
                    case 4: {
                        newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]] = res.data;
                        break;
                    }
                    case 5: {
                        let glossaryFootnoteElementOfWe = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]]?.elementdata ? newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]]?.elementdata.bodymatter[tempIndex[3]] : newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]];
                        if (glossaryFootnoteElementOfWe?.type === 'manifest') {
                            glossaryFootnoteElementOfWe.contents.bodymatter[tempIndex[4]] = res.data;
                        }
                        else if (glossaryFootnoteElementOfWe?.type === 'showhide') {
                            glossaryFootnoteElementOfWe.interactivedata[asideParent.sectionType][tempIndex[4]] = res.data;
                        }
                        else {
                            newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].interactivedata[asideParent.sectionType][tempIndex[4]] = res.data;
                        }
                        break;
                    }
                    case 6:
                        newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]].interactivedata[asideParent.sectionType][tempIndex[5]] = res.data;
                        break;
                    case 7:
                        newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]].contents.bodymatter[tempIndex[4]].interactivedata[asideParent.sectionType][tempIndex[6]] = res.data;
                        break;
                }
            } else if (newBodymatter[updatedIndex]?.type === ELEMENT_ASIDE) {
                let indexesLen = tempIndex.length;
                switch (indexesLen) {
                    case 2: {
                        newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]] = res.data;
                        break;
                    }
                    case 3: {
                        newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents.bodymatter[tempIndex[2]] = res.data;
                        break;
                    }
                    case 4: {
                        newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].interactivedata[asideParent.sectionType][tempIndex[3]] = res.data;
                        break;
                    }
                    case 5: {
                        newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents.bodymatter[tempIndex[2]].interactivedata[asideParent.sectionType][tempIndex[4]] = res.data;
                        break;
                    }
                }
            } else if (newBodymatter[tempIndex[0]]?.type === 'showhide' && elementType === ELEMENT_BLOCKFEATURE) {
                let indexesLen = tempIndex.length;
                switch (indexesLen) {
                    case 3:
                        newBodymatter[tempIndex[0]].interactivedata[asideParent?.sectionType][tempIndex[2]] = res.data
                        break;
                    case 4:
                        newBodymatter[tempIndex[0]].interactivedata[asideParent.parent.showHideType][tempIndex[2]].elementdata.bodymatter[tempIndex[3]] = res.data
                        break;
                    case 5:
                        newBodymatter[tempIndex[0]].interactivedata[asideParent.parent.showHideType][tempIndex[2]].elementdata.bodymatter[tempIndex[3]].contents.bodymatter[tempIndex[4]] = res.data
                        break;
                }
            }
            else {
                newBodymatter[updatedIndex] = res.data;
            }
        }
        else if (typeWithPopup && typeWithPopup === "popup"){
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
                    newBodymatter[tempIndex[0]].popupdata[FORMATTED_TITLE] = responseElement;
                    break;
                }
                case 3: {
                    let titleDOM = document.getElementById(`cypress-${tempIndex[0]}-${tempIndex[1]}-0`)
                    let titleHTML = ""
                    if (titleDOM) {
                        titleHTML = titleDOM.innerHTML
                    }
                    responseElement.html.text = createTitleSubtitleModel(titleHTML, responseElement.html.text)
                    newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].popupdata[FORMATTED_TITLE] = responseElement;
                    break;
                }
                case 4: {
                    let titleDOM = document.getElementById(`cypress-${tempIndex[0]}-${tempIndex[1]}-${tempIndex[2]}-0`)
                    let titleHTML = ""
                    if (titleDOM) {
                        titleHTML = titleDOM.innerHTML
                    }
                    responseElement.html.text = createTitleSubtitleModel(titleHTML, responseElement.html.text)
                    newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents.bodymatter[tempIndex[2]].popupdata[FORMATTED_TITLE] = responseElement;
                    break;
                }
                // footnote for popup title inside aside inside multicolumn
                case 5: {
                    let titleDOM = document.getElementById(`cypress-${tempIndex[0]}-${tempIndex[1]}-${tempIndex[2]}-${tempIndex[3]}-0`)
                    let titleHTML = ""
                    if (titleDOM) {
                        titleHTML = titleDOM.innerHTML
                    }
                    responseElement.html.text = createTitleSubtitleModel(titleHTML, responseElement.html.text)
                    newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]].popupdata[FORMATTED_TITLE] = responseElement;
                    break;
                }
                case 6: { // TB->Tab->AS/WE->HEAD->Popup
                    let titleDOM = document.getElementById(`cypress-${tempIndex[0]}-${tempIndex[1]}-${tempIndex[2]}-${tempIndex[3]}-${tempIndex[4]}-0`)
                    let titleHTML = "";
                    if (titleDOM) {
                        titleHTML = titleDOM.innerHTML;
                    }
                    responseElement.html.text = createTitleSubtitleModel(titleHTML, responseElement.html.text);
                    if (newBodymatter[tempIndex[0]]?.type === ElementConstants.MULTI_COLUMN && newBodymatter[tempIndex[0]]?.subtype === ElementConstants.TAB) {
                        newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]].popupdata[FORMATTED_TITLE] = responseElement;
                    } else {  // Multicolumn->AS/WE->BODY->Popup
                        newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]].contents.bodymatter[tempIndex[4]].popupdata[FORMATTED_TITLE] = responseElement;
                    }
                    break;
                }
                case 7: { // TB->Tab->AS/WE->BODY->Popup
                    let titleDOM = document.getElementById(`cypress-${tempIndex[0]}-${tempIndex[1]}-${tempIndex[2]}-${tempIndex[3]}-${tempIndex[4]}-${tempIndex[5]}-0`);
                    let titleHTML = "";
                    if (titleDOM) {
                        titleHTML = titleDOM.innerHTML;
                    }
                    responseElement.html.text = createTitleSubtitleModel(titleHTML, responseElement.html.text);
                    newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]].contents.bodymatter[tempIndex[5]].popupdata[FORMATTED_TITLE] = responseElement;
                    break;
                }
            }
        }
        else if (typeWithPopup && typeWithPopup === 'poetry') {
            let indexesLen = tempIndex.length;
            if (indexesLen === 2) {
                switch (tempIndex[1]) {
                    case "1":
                        let responseElement = {...res.data}
                        res.data.html.text = res.data.html.text.replace(/<p>|<\/p>/g, "")
                        responseElement.html.text = createTitleSubtitleModel("", res.data.html.text)
                        newBodymatter[tempIndex[0]].contents[FORMATTED_TITLE] = responseElement;
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
            } else if(indexesLen === 3){
                if(newBodymatter[tempIndex[0]]?.type == ELEMENT_ASIDE){ /* footnote for PE title inside WE/Aside element */
                    switch (tempIndex[2]) {
                        case "1":
                            let responseElement = {...res.data}
                            res.data.html.text = res.data.html.text.replace(/<p>|<\/p>/g, "")
                            responseElement.html.text = createTitleSubtitleModel("", res.data.html.text)
                            newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents[FORMATTED_TITLE]= responseElement;
                            break;
                        case "4":
                            if(!newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents['creditsarray']){
                                newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents['creditsarray'] = [];
                            }
                            newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents['creditsarray'][0] = res.data;
                            break;
                    }
                }
            } else if(indexesLen === 4){
                if(newBodymatter[tempIndex[0]]?.type == ELEMENT_ASIDE){ /* footnote for PE title inside WE in section break element */
                    switch (tempIndex[3]) {
                        case "1":
                            let responseElement = {...res.data}
                            res.data.html.text = res.data.html.text.replace(/<p>|<\/p>/g, "")
                            responseElement.html.text = createTitleSubtitleModel("", res.data.html.text)
                            newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents.bodymatter[tempIndex[2]].contents[FORMATTED_TITLE] = responseElement;
                            break;
                        case "4":
                            if(!newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents.bodymatter[tempIndex[2]].contents['creditsarray']){
                                newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents.bodymatter[tempIndex[2]].contents['creditsarray'] = [];
                            }
                            newBodymatter[tempIndex[0]].elementdata.bodymatter[tempIndex[1]].contents.bodymatter[tempIndex[2]].contents['creditsarray'][0] = res.data;
                            break;
                    }
                } else  if(newBodymatter[tempIndex[0]]?.type == "groupedcontent"){ /* footnote for PE title inside multicolumn element */
                    switch (tempIndex[3]) {
                        case "1":
                            let responseElement = {...res.data}
                            res.data.html.text = res.data.html.text.replace(/<p>|<\/p>/g, "")
                            responseElement.html.text = createTitleSubtitleModel("", res.data.html.text)
                            newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].contents[FORMATTED_TITLE] = responseElement;
                            break;
                        case "4":
                            if(!newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].contents['creditsarray']){
                                newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].contents['creditsarray'] = [];
                            }
                            newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].contents['creditsarray'][0] = res.data
                            break;
                    }
                } else if (newBodymatter[tempIndex[0]]?.interactivedata[asideParent?.sectionType][tempIndex[2]]?.type === 'poetry') { /* footnote for PE title inside SH element */
                    switch (tempIndex[3]) {
                        case "1":
                            let responseElement = { ...res.data }
                            res.data.html.text = res.data.html.text.replace(/<p>|<\/p>/g, "")
                            responseElement.html.text = createTitleSubtitleModel("", res.data.html.text)
                            newBodymatter[tempIndex[0]].interactivedata[asideParent.sectionType][tempIndex[2]].contents[FORMATTED_TITLE] = responseElement;
                            break;
                        case "4":
                            if (!newBodymatter[tempIndex[0]].interactivedata[asideParent.sectionType][tempIndex[2]].contents['creditsarray']) {
                                newBodymatter[tempIndex[0]].interactivedata[asideParent.sectionType][tempIndex[2]].contents['creditsarray'] = [];
                            }
                            newBodymatter[tempIndex[0]].interactivedata[asideParent.sectionType][tempIndex[2]].contents['creditsarray'][0] = res.data
                            break;
                    }
                }
            } else if (indexesLen === 5) { /* footnote for PE title inside Tab element in TB */
                switch (tempIndex[4]) {
                    case "1":
                        let responseElement = {...res.data}
                        res.data.html.text = res.data.html.text.replace(/<p>|<\/p>/g, "")
                        responseElement.html.text = createTitleSubtitleModel("", res.data.html.text)
                        newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].contents[FORMATTED_TITLE] = responseElement;
                        break;
                    case "4":
                        if (!newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].contents['creditsarray']) {
                            newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].contents['creditsarray'] = [];
                        }
                        newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].contents['creditsarray'][0] = res.data;
                        break;
                }
            } // TB->Tab->PS or TB->Tab->As->PS or TB->Tab->WE->PS
        } else if ((tempIndex.length >= 5 && tempIndex.length <= 8) && elementType === ElementConstants.ELEMENT_DIALOGUE && newBodymatter[tempIndex[0]].type === ElementConstants.MULTI_COLUMN && newBodymatter[tempIndex[0]].subtype === ElementConstants.TAB) {
            if (res.data.html.hasOwnProperty('text')) {
                delete res.data.html.text;
            }
            let elementInsideTab = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]];
            if (elementInsideTab.type === ElementConstants.ELEMENT_ASIDE && elementInsideTab.subtype === "sidebar") {
                res.data = {
                    ...res.data,
                    html: {
                        ...res.data.html,
                        actTitle: newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]].html.actTitle,
                        credits: newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]].html.credits,
                        dialogueContent: newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]].html.dialogueContent,
                        sceneTitle: newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]].html.sceneTitle
                    }
                }
                newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]] = res.data;
            } else if (elementInsideTab.type === ElementConstants.ELEMENT_ASIDE && elementInside2C.subtype === ElementConstants.ELEMENT_WORKEDEXAMPLE) {
                let glossaryFootnoteElementOfWe = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]];
                if (glossaryFootnoteElementOfWe.type === ElementConstants.ELEMENT_SECTION_BREAK) {
                    glossaryFootnoteElementOfWe = glossaryFootnoteElementOfWe.contents.bodymatter[tempIndex[5]];
                }
                glossaryFootnoteElementOfWe = {
                    ...glossaryFootnoteElementOfWe,
                    html: {
                        ...glossaryFootnoteElementOfWe.html,
                        glossaryentries: res.data.html.glossaryentries,
                        footnotes: res.data.html.footnotes
                    }
                }
                if (newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]].type === ElementConstants.ELEMENT_SECTION_BREAK) {
                    newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]].contents.bodymatter[tempIndex[5]] = glossaryFootnoteElementOfWe;
                } else {
                    newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].elementdata.bodymatter[tempIndex[4]] = glossaryFootnoteElementOfWe;
                }
            } else {
                res.data = {
                    ...res.data,
                    html: {
                        ...res.data.html,
                        actTitle: newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].html.actTitle,
                        credits: newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].html.credits,
                        dialogueContent: newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].html.dialogueContent,
                        sceneTitle: newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]].html.sceneTitle
                    }
                }
                newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[tempIndex[2]].groupdata.bodymatter[tempIndex[3]] = res.data;
            }
        } else if ((tempIndex.length >= 4 && tempIndex.length <= 7) && elementType === ELEMENT_DIALOGUE && newBodymatter[tempIndex[0]].type === "groupedcontent") { // MultiColumn->PS or MultiColumn->As->PS or MultiColumn->WE->PS
            if (res.data.html.hasOwnProperty('text')) {
                delete res.data.html.text;
            }
            let elementInside2C = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]];
            if (elementInside2C.type === ELEMENT_ASIDE && elementInside2C.subtype === "sidebar") {
                res.data = {
                    ...res.data,
                    html: {
                        ...res.data.html,
                        actTitle: newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]].html.actTitle,
                        credits: newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]].html.credits,
                        dialogueContent: newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]].html.dialogueContent,
                        sceneTitle: newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]].html.sceneTitle
                    }
                }
                newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]] = res.data;
            } else if (elementInside2C.type === ELEMENT_ASIDE && elementInside2C.subtype === "workedexample") {
                let glossaryFootnoteElementOfWe = newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]];
                if (glossaryFootnoteElementOfWe.type === 'manifest') {
                    glossaryFootnoteElementOfWe = glossaryFootnoteElementOfWe.contents.bodymatter[tempIndex[4]];
                }
                glossaryFootnoteElementOfWe = {
                    ...glossaryFootnoteElementOfWe,
                    html: {
                        ...glossaryFootnoteElementOfWe.html,
                        glossaryentries: res.data.html.glossaryentries,
                        footnotes: res.data.html.footnotes
                    }
                }
                if (newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]].type === 'manifest') {
                    newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]].contents.bodymatter[tempIndex[4]] = glossaryFootnoteElementOfWe;
                } else {
                    newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]].elementdata.bodymatter[tempIndex[3]] = glossaryFootnoteElementOfWe;
                }
            } else {
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
                newBodymatter[tempIndex[0]].groupeddata.bodymatter[tempIndex[1]].groupdata.bodymatter[tempIndex[2]] = res.data;
            }
            // S/H->AS/WE->PS
        } else if ((tempIndex.length >= 5 && tempIndex.length <= 7) && elementType === ELEMENT_DIALOGUE && asideParent?.parent?.type === 'showhide' && asideParent?.type === ELEMENT_ASIDE && asideParent?.parent?.showHideType) {
            let glossaryFootnoteElementOfWe = newBodymatter[tempIndex[0]].interactivedata[asideParent?.parent?.showHideType][tempIndex[2]];
            if (glossaryFootnoteElementOfWe.subtype === "workedexample" && glossaryFootnoteElementOfWe.elementdata.bodymatter[tempIndex[3]].type === "manifest" && (tempIndex.length == 6 || tempIndex.length == 7)) {
                glossaryFootnoteElementOfWe = glossaryFootnoteElementOfWe.elementdata.bodymatter[tempIndex[3]].contents.bodymatter[tempIndex[4]];
            } else {
                glossaryFootnoteElementOfWe = glossaryFootnoteElementOfWe.elementdata.bodymatter[tempIndex[3]];
            }
            glossaryFootnoteElementOfWe = {
                ...glossaryFootnoteElementOfWe,
                html: {
                    ...glossaryFootnoteElementOfWe.html,
                    glossaryentries: res.data.html.glossaryentries,
                    footnotes: res.data.html.footnotes
                }
            }
            if (newBodymatter[tempIndex[0]].interactivedata[asideParent?.parent?.showHideType][tempIndex[2]].elementdata.bodymatter[tempIndex[3]].type === "manifest" && (tempIndex.length == 6 || tempIndex.length == 7)) {
                newBodymatter[tempIndex[0]].interactivedata[asideParent?.parent?.showHideType][tempIndex[2]].elementdata.bodymatter[tempIndex[3]].contents.bodymatter[tempIndex[4]] = glossaryFootnoteElementOfWe;
            } else {
                newBodymatter[tempIndex[0]].interactivedata[asideParent?.parent?.showHideType][tempIndex[2]].elementdata.bodymatter[tempIndex[3]] = glossaryFootnoteElementOfWe;
            }
        } else if (elementType === ELEMENT_DIALOGUE && newBodymatter[tempIndex[0]].type === ELEMENT_ASIDE && newBodymatter[tempIndex[0]].subtype === "workedexample") { //Playscript inside we element
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
        } else if (elementType === ELEMENT_DIALOGUE && newBodymatter[tempIndex[0]].type === ELEMENT_ASIDE && newBodymatter[tempIndex[0]].subtype === "sidebar") { //Playscript inside aside element
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
        } else if (elementType === ELEMENT_DIALOGUE) {
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
            if (res?.data?.html?.hasOwnProperty('text')) {
                if(newBodymatter[tempIndex[0]]?.html?.dialogueContent[0]?.text.includes(glossaryfootnoteid)){
                    res.data.html.dialogueContent[0].text = res?.data?.html?.text
                }else if(newBodymatter[tempIndex[0]]?.html?.dialogueContent[1]?.characterName?.includes(glossaryfootnoteid)){
                    res.data.html.dialogueContent[1].characterName = `<p>${res?.data?.html?.text}</p>`
                }else if(newBodymatter[tempIndex[0]]?.html?.dialogueContent[1]?.text.includes(glossaryfootnoteid)){
                    res.data.html.dialogueContent[1].text = `<p>${res?.data?.html?.text}</p>`
                }
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
        else if (newBodymatter[tempIndex[0]]?.type === "manifestlist") { //Block list condition
            if(tempIndex.length===3){
                newBodymatter[tempIndex[0]].listdata.bodymatter[tempIndex[1]].listitemdata.bodymatter[tempIndex[2]] = res.data;
            }
            else if(tempIndex.length===5){
               newBodymatter[tempIndex[0]].listdata.bodymatter[tempIndex[1]].listitemdata.bodymatter[tempIndex[2]].listdata.bodymatter[tempIndex[3]].listitemdata.bodymatter[tempIndex[4]] = res.data;
            }
            else if(tempIndex.length===7){
                newBodymatter[tempIndex[0]].listdata.bodymatter[tempIndex[1]].listitemdata.bodymatter[tempIndex[2]].listdata.bodymatter[tempIndex[3]].listitemdata.bodymatter[tempIndex[4]].listdata.bodymatter[tempIndex[5]].listitemdata.bodymatter[tempIndex[6]] = res.data;
            }
            else{
                newBodymatter[tempIndex[0]].listdata.bodymatter[tempIndex[1]].listitemdata.bodymatter[tempIndex[2]].listdata.bodymatter[tempIndex[3]].listitemdata.bodymatter[tempIndex[4]].listdata.bodymatter[tempIndex[5]].listitemdata.bodymatter[tempIndex[6]].listdata.bodymatter[tempIndex[7]].listitemdata.bodymatter[tempIndex[8]] = res.data;
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
                if ((indexesLen == 4 || indexesLen == 5 || indexesLen == 7 || indexesLen == 9 ||indexesLen == 11) && newBodymatter[indexes[0]].type === "showhide" && asideParent?.parent?.showHideType) {  // to support glossary in text elements inside WE/AS of S/H
                    let elementInSH = newBodymatter[tempIndex[0]].interactivedata[asideParent.parent.showHideType][indexes[2]];
                    if (elementInSH.subtype === "workedexample" && indexesLen == 5 && elementInSH.elementdata.bodymatter[indexes[3]].type === 'manifest') {
                        newBodymatter[indexes[0]].interactivedata[asideParent.parent.showHideType][indexes[2]].elementdata.bodymatter[indexes[3]].contents.bodymatter[indexes[4]] = res.data;
                        // Blocklist inside showhide element
                    } else if(elementInSH.type === ElementConstants.BLOCK_LIST) {
                        switch(indexesLen) {
                            case 5: // Blocklist(level1) inside showhide
                                newBodymatter[indexes[0]].interactivedata[asideParent.parent.showHideType][indexes[2]].listdata.bodymatter[indexes[3]].listitemdata.bodymatter[indexes[4]] = res.data
                                break;
                            case 7: // Blocklist(level2) inside showhide
                                newBodymatter[indexes[0]].interactivedata[asideParent.parent.showHideType][indexes[2]].listdata.bodymatter[indexes[3]].listitemdata.bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]] = res.data
                            break;
                            case 9: // Blocklist(level3) inside showhide
                                newBodymatter[indexes[0]].interactivedata[asideParent.parent.showHideType][indexes[2]].listdata.bodymatter[indexes[3]].listitemdata.bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]].listdata.bodymatter[indexes[7]].listitemdata.bodymatter[indexes[8]] = res.data
                                break;
                            case 11: // Blocklist(level4) inside showhide
                                newBodymatter[indexes[0]].interactivedata[asideParent.parent.showHideType][indexes[2]].listdata.bodymatter[indexes[3]].listitemdata.bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]].listdata.bodymatter[indexes[7]].listitemdata.bodymatter[indexes[8]].listdata.bodymatter[indexes[9]].listitemdata.bodymatter[indexes[10]] = res.data
                                break;
                        } }else {
                        newBodymatter[indexes[0]].interactivedata[asideParent.parent.showHideType][indexes[2]].elementdata.bodymatter[indexes[3]] = res.data;
                    } // To support glossary/footnote inside elements of Tab inside TB
                } else if (newBodymatter[tempIndex[0]].type === ElementConstants.MULTI_COLUMN && newBodymatter[tempIndex[0]]?.subtype === ElementConstants.TAB) {
                    switch (indexesLen) {
                        case 4: // TB->Tab->Element
                            newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]] = res.data;
                            break;
                        case 5: // TB->Tab->AS/WE->HEAD->Element
                            newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]].elementdata.bodymatter[indexes[4]] = res.data;
                            break;
                        case 6:
                            let elementInTab = newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]];
                            // TB->Tab->WE->BODY->Element
                            if (elementInTab?.type === ElementConstants.ELEMENT_ASIDE && elementInTab?.subtype === ElementConstants.ELEMENT_WORKEDEXAMPLE) {
                                newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]].elementdata.bodymatter[indexes[4]].contents.bodymatter[indexes[5]] = res.data;
                            } else if(elementInTab.type === ElementConstants.BLOCK_LIST){ //Blocklist(leve1) inside TB element
                                newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]].listdata.bodymatter[indexes[4]].listitemdata.bodymatter[indexes[5]] = res.data
                            } else { // PE element stanza inside Tab element in TB
                                newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]].contents.bodymatter[indexes[5]] = res.data;
                            }
                            break;
                        case 8: // Blocklist(level2) inside TB element
                            newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]].listdata.bodymatter[indexes[4]].listitemdata.bodymatter[indexes[5]].listdata.bodymatter[indexes[6]].listitemdata.bodymatter[indexes[7]] = res.data
                            break;
                        case 10:// Blocklist(level3) inside TB element
                            newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]].listdata.bodymatter[indexes[4]].listitemdata.bodymatter[indexes[5]].listdata.bodymatter[indexes[6]].listitemdata.bodymatter[indexes[7]].listdata.bodymatter[indexes[8]].listitemdata.bodymatter[indexes[9]] = res.data
                            break
                        case 12:
                            // Blocklist(level4) inside TB element
                            newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]].listdata.bodymatter[indexes[4]].listitemdata.bodymatter[indexes[5]].listdata.bodymatter[indexes[6]].listitemdata.bodymatter[indexes[7]].listdata.bodymatter[indexes[8]].listitemdata.bodymatter[indexes[9]].listdata.bodymatter[indexes[10]].listitemdata.bodymatter[indexes[11]] = res.data
                            break
                    }
                } else if (indexesLen == 4 && newBodymatter[tempIndex[0]].type === "groupedcontent") {
                    // aside inside multi column
                    newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]] = res.data;
                } else if (indexesLen == 2) {
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
                } else if (indexesLen == 4) {
                    if (elementType && elementType === 'stanza') {
                        // Block Poetry Inside WE/Aside before section break
                        newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[3]] = res.data;
                    } else if(asideParent.type === ElementConstants.BLOCK_LIST) { // Blocklist(level1) inside WE/Aside
                        newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].listdata.bodymatter[indexes[2]].listitemdata.bodymatter[indexes[3]] = res.data
                    }
                    else {
                        // aside inside multi column
                        newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]] = res.data;
                    }
                } else if (indexesLen == 5) {
                    // Block Poetry Inside WE after section break or in MultiColumn
                    if(elementType && elementType==='stanza'){
                        if(newBodymatter[indexes[0]] && newBodymatter[indexes[0]].type == ELEMENT_ASIDE){
                            newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].contents.bodymatter[indexes[4]] = res.data
                        } else if (newBodymatter[indexes[0]] && newBodymatter[indexes[0]].type == "groupedcontent"){
                            newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].contents.bodymatter[indexes[4]] = res.data
                        } else if (newBodymatter[indexes[0]] && newBodymatter[indexes[0]].type == "showhide"){ // Block Poetry Inside SH
                            newBodymatter[indexes[0]].interactivedata[asideParent?.showHideType][indexes[2]].contents.bodymatter[indexes[4]] = res.data
                        }
                        //Blocklist(level1) inside WE-SB/2C/3C
                    }else if(asideParent.type === ElementConstants.BLOCK_LIST) {
                            if(newBodymatter[indexes[0]]?.type == ElementConstants.MULTI_COLUMN) {
                                newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].listdata.bodymatter[indexes[3]].listitemdata.bodymatter[indexes[4]] = res.data
                            } else if(newBodymatter[indexes[0]]?.type == ElementConstants.ELEMENT_ASIDE) {
                                newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].listdata.bodymatter[indexes[3]].listitemdata.bodymatter[indexes[4]] = res.data
                            }
                        } else {
                    // element inside popup inside multi column
                        newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].contents.bodymatter[indexes[4]] = res.data
                    }
                } else if((indexesLen == 7 || indexesLen == 9 || indexesLen == 11) && asideParent.type === ElementConstants.BLOCK_LIST) { // glossary/footnote in WE/2C/3C > BlockList
                    switch(indexesLen) {
                        case 7:
                            // WE-SB/2C/3C > Blocklist(level2)> glossary/foonote
                            if(newBodymatter[tempIndex[0]].type === ElementConstants.MULTI_COLUMN) {
                                newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].listdata.bodymatter[indexes[3]].listitemdata.bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]] = res.data
                            } else if(newBodymatter[indexes[0]]?.type == ElementConstants.ELEMENT_ASIDE) { //WE-SB
                                newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].listdata.bodymatter[indexes[3]].listitemdata.bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]] = res.data
                            }
                            break;
                        case 9:
                            // WE-SB/2C/3C > Blocklist(level3) > glossary/foonote
                            if(newBodymatter[tempIndex[0]].type === ElementConstants.MULTI_COLUMN) {
                                newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].listdata.bodymatter[indexes[3]].listitemdata.bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]].listdata.bodymatter[indexes[7]].listitemdata.bodymatter[indexes[8]] = res.data
                            } else if(newBodymatter[indexes[0]]?.type == ElementConstants.ELEMENT_ASIDE) { //WE-SB
                                newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].listdata.bodymatter[indexes[3]].listitemdata.bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]].listdata.bodymatter[indexes[7]].listitemdata.bodymatter[indexes[8]] = res.data
                            }
                            break;
                        case 11:
                            // WE-SB/2C/3C > Blocklist(level4) > glossary/foonote
                            if(newBodymatter[tempIndex[0]].type === ElementConstants.MULTI_COLUMN) {
                                newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].listdata.bodymatter[indexes[3]].listitemdata.bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]].listdata.bodymatter[indexes[7]].listitemdata.bodymatter[indexes[8]].listdata.bodymatter[indexes[9]].listitemdata.bodymatter[indexes[10]] = res.data

                            } else if(newBodymatter[indexes[0]]?.type == ElementConstants.ELEMENT_ASIDE) { // WE-SB
                                newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].listdata.bodymatter[indexes[3]].listitemdata.bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]].listdata.bodymatter[indexes[7]].listitemdata.bodymatter[indexes[8]].listdata.bodymatter[indexes[9]].listitemdata.bodymatter[indexes[10]]  = res.data
                            }
                            break;
                    }
                } else if((indexesLen == 6 || indexesLen == 8 || indexesLen == 10) && asideParent.type === ElementConstants.BLOCK_LIST) {
                    switch(indexesLen) {
                        case 6: // Blocklist(level2) inside WE/2C/3C
                                newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].listdata.bodymatter[indexes[2]].listitemdata.bodymatter[indexes[3]].listdata.bodymatter[indexes[4]].listitemdata.bodymatter[indexes[5]]= res.data
                            break;
                        case 8:  // Blocklist(level3) inside WE/2C/3C
                                newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].listdata.bodymatter[indexes[2]].listitemdata.bodymatter[indexes[3]].listdata.bodymatter[indexes[4]].listitemdata.bodymatter[indexes[5]].listdata.bodymatter[indexes[6]].listitemdata.bodymatter[indexes[7]] = res.data
                            break;
                        case 10:  // Blocklist(level4) inside WE/2C/3C
                                newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].listdata.bodymatter[indexes[2]].listitemdata.bodymatter[indexes[3]].listdata.bodymatter[indexes[4]].listitemdata.bodymatter[indexes[5]].listdata.bodymatter[indexes[6]].listitemdata.bodymatter[indexes[7]].listdata.bodymatter[indexes[8]].listitemdata.bodymatter[indexes[9]] = res.data
                            break;
                    }
                }
            }
        }
        // This check is added to prevent snapshots for TB element, it will be removed when TB element will support TCM
        if (!isTbElement) {
            //tcm update code  for glossary/footnote
            if (config.tcmStatus) {
                if (elementTypeData.indexOf(elementType) !== -1) {
                    prepareDataForUpdateTcm(elementWorkId, res.data.id, res.data);
                }
            }
        }

        const popupParentData = store.getState().appStore.slateLevelData;
        let newPopupParentData = JSON.parse(JSON.stringify(popupParentData));
        let currentPopupSlateData = newPopupParentData[config.slateManifestURN];
        let newPopupSlateData = newParentData[config.tempSlateManifestURN]
        let currentApprovedSlate = currentSlateData.contents.bodymatter[tempIndex[0]]
        if(currentPopupSlateData && currentPopupSlateData.type==="popup" && newPopupSlateData && newPopupSlateData.status === 'approved' && config.glossaryCreated){
            store.dispatch({
                type: UPDATE_FOOTNOTEGLOSSARY,
                payload: {
                    slateLevelData: newPopupParentData
                }
            })
            sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
        } else if(currentSlateData && currentSlateData.status === "approved" && (currentApprovedSlate && (currentApprovedSlate.type === "groupedcontent" || currentApprovedSlate.type === ELEMENT_ASIDE))){
            store.dispatch({
                type: UPDATE_FOOTNOTEGLOSSARY,
                payload: {
                    slateLevelData: newPopupParentData
                }
            })
        } else {
            store.dispatch({
                type: UPDATE_FOOTNOTEGLOSSARY,
                payload: {
                    slateLevelData: newParentData
                }
            })
        }
        config.glossaryCreated = false

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
    const cypressPlusProjectStatus = store.getState()?.appStore?.isCypressPlusEnabled
    if (cypressPlusProjectStatus && resData?.type === 'element-pdf') {
        return false; // disable TCM for all PDF slates in Cypress+ Enabled Projects
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
    let tinymceToolbar = document.querySelector('div#tinymceToolbar .tox-toolbar__primary') ? document.querySelector('div#tinymceToolbar .tox-toolbar__primary') : ""
    let glossaryFootnoteToolbar = document.querySelector('div#toolbarGlossaryFootnote .tox-toolbar__primary') ? document.querySelector('div#toolbarGlossaryFootnote .tox-toolbar__primary') : ""
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
            let tinymceSuperscript = document.querySelector('div#tinymceToolbar .tox-toolbar_primary button[title="Superscript"]') ? document.querySelector('div#tinymceToolbar .tox-toolbar button[title="Superscript"]') : ""
            tinymceSuperscript && tinymceSuperscript.removeAttribute('aria-pressed')
            tinymceSuperscript && tinymceSuperscript.classList.remove('tox-tbtn--enabled')
            tinymceSuperscript && tinymceSuperscript.classList.add('tox-tbtn--select')
            break;
        case 'removeGlossaryFootnoteSuperscript':
            let isSuperscriptButton = document.querySelector('div#toolbarGlossaryFootnote .tox-toolbar_primary button[title="Superscript"]') ? document.querySelector('div#toolbarGlossaryFootnote .tox-toolbar button[title="Superscript"]') : ""
            isSuperscriptButton && isSuperscriptButton.removeAttribute('aria-pressed')
            isSuperscriptButton && isSuperscriptButton.classList.remove('tox-tbtn--enabled')
            isSuperscriptButton && isSuperscriptButton.classList.add('tox-tbtn--select')
            break;
    }
}

export const showWrongImagePopup = (value) => (dispatch, getState) => {
    dispatch({
        type: WRONG_IMAGE_POPUP,
        payload: value
    })
}

export const showRemoveImageGlossaryPopup = (value) => (dispatch, getState) => {
    dispatch({
        type: SHOW_REMOVE_GLOSSARY_IMAGE,
        payload: value
    })
}

export const saveImageDataFromAlfresco = (message) => dispatch => {
    let imageData = message?.asset;
    let epsURL = imageData.epsUrl ? imageData.epsUrl : imageData?.['institution-urls'][0]?.publicationUrl ? imageData?.['institution-urls'][0]?.publicationUrl : "" ;
    let width = imageData.properties["exif:pixelXDimension"] ? imageData.properties["exif:pixelXDimension"] : "";
    let height = imageData.properties["exif:pixelYDimension"] ? imageData.properties["exif:pixelYDimension"] : "";
    let uniqID = imageData.id ? imageData.id : "";
    let altText = imageData.properties["cplg:altText"] ? imageData.properties["cplg:altText"] : '';
    let longDesc = imageData.properties['cplg:longDescription'] ? imageData.properties['cplg:longDescription'] : "";
    let displayTitle = imageData.name
    let setImageGlossaryData = {
        path: epsURL,
        height: height,
        width: width,
        schema: "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
        imageid: `urn:pearson:alfresco:${uniqID}`,
        alttext: altText,
        longdescription: longDesc,
        title: displayTitle
    }
    dispatch({ type: SET_FIGURE_GLOSSARY, payload: setImageGlossaryData })
    dispatch({ type: ADD_FIGURE_GLOSSARY_POPUP, payload: true })
    hideTocBlocker();
}

/**
 * This function will check for new elementWorkId in slateLevelData, when marked index is updated
 * inside glossary, and update the elementWorkId in the glossary store
 */
export const UpdateElementWorkId = () => {
    const slateId = config.slateManifestURN;
    const parentData = store.getState().appStore.slateLevelData;
    let newParentData = JSON.parse(JSON.stringify(parentData));
    let currentSlateData = newParentData[slateId];
    let newBodymatter = currentSlateData.contents.bodymatter;

    const {glossaryFootnoteValue, elementIndex} = store.getState().glossaryFootnoteReducer;
    const {elementType} = glossaryFootnoteValue;
    let newElementWorkId = "";

    const showHideElement = store.getState().appStore?.showHideObj;
    const asideParent = store.getState().appStore?.asideData;
    let tempIndex = elementIndex && typeof (elementIndex) !== 'number' && elementIndex.split('-');


    if (showHideElement || asideParent?.type === 'showhide') {
        let glossaryFootElem = onGlossaryFnUpdateSuccessInShowHide("GetElementWithFnGlry_SH", newBodymatter, elementType, asideParent?.sectionType, tempIndex)
        newElementWorkId = glossaryFootElem?.id;
    } else if ((tempIndex.length == 5 || tempIndex.length == 6) && asideParent?.type === ELEMENT_ASIDE && asideParent?.parent?.type === 'showhide') {
        let glossaryFootElem;
        if (asideParent.subtype === "workedexample" && tempIndex.length == 5 ) {
           glossaryFootElem = newBodymatter[tempIndex[0]].interactivedata[asideParent.parent.showHideType][tempIndex[2]].elementdata.bodymatter[tempIndex[3]].contents.bodymatter[tempIndex[4]]
        }
        newElementWorkId = glossaryFootElem?.id;
    } else {
        if (typeof (elementIndex) == 'number') {
            newElementWorkId = newBodymatter[elementIndex].id
        } else {
            let indexes = elementIndex.split('-');
            let indexesLen = indexes.length;
            if (indexesLen == 2) {
                newElementWorkId = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]]?.id
            } else if (indexesLen == 3) {
                if (elementType === 'stanza') {
                    newElementWorkId = newBodymatter[indexes[0]].contents.bodymatter[indexes[2]]?.id;
                } else if (newBodymatter[indexes[0]].type === "groupedcontent") {
                    newElementWorkId = newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]]?.id;
                } else {
                    newElementWorkId = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]]?.id;
                }
            }
            else if ((indexesLen == 4 ) && newBodymatter[indexes[0]].type === "showhide" && asideParent?.parent?.showHideType) {  // to support index Entry in text elements inside WE/AS of S/H
                newElementWorkId = newBodymatter[indexes[0]].interactivedata[asideParent.parent.showHideType][indexes[2]].elementdata.bodymatter[indexes[3]].id;
            }
            else if (indexesLen == 4 &&  newBodymatter[indexes[0]].type === "groupedcontent") {
                newElementWorkId = newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]]?.id;
            } else if (indexesLen == 5) {
                newElementWorkId = newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].contents.bodymatter[indexes[4]]?.id;
            }
        }
    }


    if(newElementWorkId !== glossaryFootnoteValue.elementWorkId){
        let newGlossaryFootnoteValue = { ...glossaryFootnoteValue, elementWorkId: newElementWorkId};

        store.dispatch({
            type: UPDATE_NEW_ELEMENT_WORK_ID,
            payload: {
                glossaryFootnoteValue: newGlossaryFootnoteValue
            }
        })
    }
}

export const updateCurrentValue = (glossaryContentText, footnoteContentText) => {
    store.dispatch({
        type: UPDATE_CURRENT_VALUE,
        payload:{
            glossaryFootNoteCurrentValue: {
                footnoteContentText,
                glossaryContentText
            }
        }
    })
}
