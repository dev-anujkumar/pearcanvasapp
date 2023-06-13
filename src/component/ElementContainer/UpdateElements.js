import elementTypeConstant from './ElementConstants'
import elementTypes from './../Sidebar/elementTypes';
import config from '../../config/config';
import { matchHTMLwithRegex, removeBlankTags, getDesignType } from '../../constants/utility.js'
import store from '../../appstore/store'
import { POD_DEFAULT_VALUE } from '../../constants/Element_Constants'
import { findElementType } from "../CanvasWrapper/CanvasWrapper_Actions";
import { storeOldAssetForTCM } from './ElementContainer_Actions';
import { createLabelNumberTitleModel } from '../../constants/utility';
import { LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES } from '../FigureHeader/AutoNumberConstants';
import { setAutonumberingValuesForPayload, getValueOfLabel, generateDropdownDataForFigures } from '../FigureHeader/AutoNumber_helperFunctions';
const indivisualData = {
    schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
    textsemantics: [ ],
    mathml: [ ]
}
const { 
    AUTO_NUMBER_SETTING_DEFAULT,
    AUTO_NUMBER_SETTING_RESUME_NUMBER,
    AUTO_NUMBER_SETTING_REMOVE_NUMBER,
    AUTO_NUMBER_SETTING_OVERRIDE_NUMBER,
    AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER
} = LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES

export const replaceUnwantedtags = (html,flag) => {
    let tempDiv = document.createElement('div'); 
    tempDiv.innerHTML = html;
    tinyMCE.$(tempDiv).find('br').remove();
    if(flag){
        tempDiv.innerHTML = tempDiv.innerHTML.replace(/<br>/g, "").replace(/(<sup><\/sup>)/g, "");
    }
    tempDiv.innerHTML = removeBlankTags(tempDiv.innerHTML)
    tempDiv.innerHTML = handleBlankLineDom(tempDiv.innerHTML)
    // calling the function to remove tinymce spell check DOM attributes from innerHTML
    // tempDiv.innerHTML = removeSpellCheckDOMAttributes(tempDiv.innerHTML);
    return tempDiv.innerHTML;
}

/**
 * Generates updated element data for figure element
 * @param {*} index 
 * @param {*} previousElementData 
 * @param {*} elementType 
 * @param {*} primaryOption 
 * @param {*} secondaryOption 
 */
export const generateCommonFigureData = (index, previousElementData, elementType, primaryOption, secondaryOption, isAutoNumberingEnabled, autoNumberOption) => {
    let titleDOM = document.getElementById(`cypress-${index}-0`),
        numberDOM = document.getElementById(`cypress-${index}-1`),
        subtitleDOM = document.getElementById(`cypress-${index}-2`),
        captionDOM = document.getElementById(`cypress-${index}-3`),
        creditsDOM = document.getElementById(`cypress-${index}-4`)

    let titleHTML = titleDOM ? titleDOM.innerHTML : "",
        numberHTML = numberDOM ? numberDOM.innerHTML : "",
        subtitleHTML = subtitleDOM ? subtitleDOM.innerHTML : "",
        captionHTML = captionDOM ? captionDOM.innerHTML : "",
        creditsHTML = creditsDOM ? creditsDOM.innerHTML : ""

    titleHTML = titleHTML.replace(/<br data-mce-bogus="1">/g, '').replace(/\&nbsp;/g, '').trim();
    numberHTML = numberHTML.replace(/<br data-mce-bogus="1">/g, '').replace(/\&nbsp;/g, '').trim();

    let titleText = titleDOM ? titleDOM.innerText : "",
        subtitleText = subtitleDOM ? subtitleDOM.innerText : "",
        captionText = captionDOM ? captionDOM.innerText : "",
        creditsText = creditsDOM ? creditsDOM.innerText : ""

    let numberedandlabel = false;
    let manualoverride = {};
    let displayedlabel = previousElementData?.displayedlabel;
    const validDropdownOptions = generateDropdownDataForFigures(previousElementData)
    if (validDropdownOptions?.includes(titleText) && titleText !== previousElementData?.displayedlabel) {
        displayedlabel = titleText;
    } else if (!(previousElementData.hasOwnProperty('displayedlabel')) && autoNumberOption !== AUTO_NUMBER_SETTING_REMOVE_NUMBER) {
        displayedlabel = getValueOfLabel(previousElementData?.figuretype);
    }
    if (isAutoNumberingEnabled && previousElementData?.hasOwnProperty('numberedandlabel')) {
        titleHTML = titleHTML?.replace(/\&amp;/g, "&").replace(/\&lt;/g, '<').replace(/\&gt;/g, '>');
        let numberText = numberDOM ? numberDOM.innerText : ""
        let payloadKeys = setAutonumberingValuesForPayload(autoNumberOption, titleText, numberText, false);
        numberedandlabel = payloadKeys?.numberedandlabel;
        manualoverride = payloadKeys?.manualoverride;
    }
    captionHTML = replaceUnwantedtags(captionHTML, true);
    creditsHTML = replaceUnwantedtags(creditsHTML, true);
    subtitleHTML = replaceUnwantedtags(subtitleHTML, true);
    numberHTML = replaceUnwantedtags(numberHTML, false);
    titleHTML = replaceUnwantedtags(titleHTML, false);

    titleHTML = createLabelNumberTitleModel(titleHTML, numberHTML, subtitleHTML);

    /** [ BG-2528 ]|On deleting footnote and its data wip is showing invalid properties for Char fields */
    subtitleText = subtitleText.replace(/(\r\n|\n|\r)/gm, '');
    captionText = captionText.replace(/(\r\n|\n|\r)/gm, '');
    creditsText = creditsText.replace(/(\r\n|\n|\r)/gm, '');
    let podwidth;
    if(previousElementData.figuretype === 'image' || previousElementData.figuretype === "table" || previousElementData.figuretype === "mathImage" ){
        let getAttributeBCE = document.querySelector(`div.element-container.active[data-id="${previousElementData.id}"] div.figureElement`) || document.querySelector(`div.element-container.fg.showBorder[data-id="${previousElementData.id}"] div.figureElement`)
        podwidth = getAttributeBCE && getAttributeBCE.getAttribute("podwidth") || POD_DEFAULT_VALUE
        previousElementData.figuredata.podwidth = podwidth ? (podHtmlmatchWithRegex(podwidth) ? podwidth : `print${podwidth}`) : ''
    }  

    if(previousElementData && previousElementData.hasOwnProperty('subtitle')){
        delete previousElementData.subtitle                                     // conversion of old figure
    }
    if(previousElementData && previousElementData.hasOwnProperty('indexPos')){
        delete previousElementData.indexPos                                     // Key added for autonumbering
    }

    let data = {
        ...previousElementData,
        title :{
            ...indivisualData,
            text : titleText
        },
        captions : {
            ...indivisualData,
            text : captionText,
            footnotes : []
        },
        credits : {
            ...indivisualData,
            text : creditsText,
            footnotes : []
        },
        html : {
            captions: matchHTMLwithRegex(captionHTML)?captionHTML:`<p>${captionHTML}</p>`,
            credits: matchHTMLwithRegex(creditsHTML)?creditsHTML:`<p>${creditsHTML}</p>`,
            footnotes : previousElementData.html.footnotes || {},
            glossaryentries : previousElementData.html.glossaryentries || {},
            title: titleHTML,
            postertext: "",
            text: ""
        },
        inputType : elementType?elementTypes[elementType][primaryOption]['enum']:"",
        inputSubType : elementType?elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum']:""    
    }

    // Adding tableasHTML in html for table element
    if(previousElementData?.figuretype === elementTypeConstant.FIGURE_TABLE_EDITOR && !data.html.tableasHTML){
        data.html.tableasHTML = previousElementData.html.tableasHTML
    }
    if (isAutoNumberingEnabled && previousElementData?.hasOwnProperty('numberedandlabel')) {
        data = {
            ...data,
            html : {
                ...data.html,
                title: `<p>${subtitleHTML}</p>`
            }
        }
    const dataToReturn = updateAutoNumberedElement(autoNumberOption,data,{ displayedlabel,    manualoverride })
    data = {...dataToReturn}  
    }
    return data
}

export const updateAutoNumberedElement = (autoNumberOption, updatedElement, { displayedlabel, manualoverride }) => {
    let objToReturn = updatedElement
    switch (autoNumberOption) {
        case AUTO_NUMBER_SETTING_RESUME_NUMBER:
            objToReturn = { ...objToReturn, displayedlabel, manualoverride, numberedandlabel: true}
            break;
        case AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER:
            objToReturn = { ...objToReturn, numberedandlabel: true, manualoverride }
            if (objToReturn.hasOwnProperty('displayedlabel')) {
                delete objToReturn.displayedlabel
            }
            break;
        case AUTO_NUMBER_SETTING_OVERRIDE_NUMBER:
            objToReturn = {
                ...objToReturn,
                displayedlabel,
                numberedandlabel: true,
                manualoverride
            }
            break;
        case AUTO_NUMBER_SETTING_REMOVE_NUMBER:
            objToReturn = { ...objToReturn,  numberedandlabel: false }
            if (objToReturn.hasOwnProperty('displayedlabel')) {
                delete objToReturn.displayedlabel
            }
            if (objToReturn.hasOwnProperty('manualoverride')) {
                delete objToReturn.manualoverride
            }
            break;
        case AUTO_NUMBER_SETTING_DEFAULT:
        default:
            objToReturn = { ...objToReturn, displayedlabel, numberedandlabel: true }
            if (objToReturn.hasOwnProperty('manualoverride')) {
                delete objToReturn.manualoverride
            }
            break;
    }
    return { ...objToReturn }
}

export const podHtmlmatchWithRegex = (html) => {
    let printValue = html && html.match(/print/g) ? true : false
    return printValue;
}

/**
 * Generates updated element data for figure interactive element
 * @param {*} index 
 * @param {*} previousElementData 
 * @param {*} elementType 
 * @param {*} primaryOption 
 * @param {*} secondaryOption 
 */
export const generateCommonFigureDataInteractive = (index, previousElementData, elementType, primaryOption, secondaryOption,isAutoNumberingEnabled, autoNumberOption ) => {
    const oldFigureData = Object.assign({},previousElementData.figuredata);
    let titleDOM = document.getElementById(`cypress-${index}-0`),
        numberDOM = document.getElementById(`cypress-${index}-1`),
        subtitleDOM = document.getElementById(`cypress-${index}-2`),
        captionDOM = document.getElementById(`cypress-${index}-4`),
        creditsDOM = document.getElementById(`cypress-${index}-5`)

    let titleHTML = titleDOM ? titleDOM.innerHTML : "",
        numberHTML = numberDOM ? numberDOM.innerHTML : "",
        subtitleHTML = subtitleDOM ? subtitleDOM.innerHTML : "",
        captionHTML = captionDOM ? captionDOM.innerHTML : "",
        creditsHTML = creditsDOM ? creditsDOM.innerHTML : ""
    
    titleHTML = titleHTML.replace(/<br data-mce-bogus="1">/g, '').replace(/\&nbsp;/g, '').trim();
    numberHTML = numberHTML.replace(/<br data-mce-bogus="1">/g, '').replace(/\&nbsp;/g, '').trim();

    let titleText = titleDOM ? titleDOM.innerText : "",
        subtitleText = subtitleDOM ? subtitleDOM.innerText : "",
        captionText = captionDOM ? captionDOM.innerText : "",
        creditsText = creditsDOM ? creditsDOM.innerText : ""

    let numberedandlabel = false;
    let manualoverride = {};
    let displayedlabel = previousElementData?.displayedlabel;
    const validDropdownOptions = generateDropdownDataForFigures(previousElementData)
    if (validDropdownOptions?.includes(titleText) && titleText !== previousElementData?.displayedlabel) {
        displayedlabel = titleText;
    } else if (!(previousElementData.hasOwnProperty('displayedlabel')) && autoNumberOption !== AUTO_NUMBER_SETTING_REMOVE_NUMBER) {
        displayedlabel = getValueOfLabel(previousElementData?.figuretype);
    }
    if (isAutoNumberingEnabled && previousElementData?.hasOwnProperty('numberedandlabel')) {
        titleHTML = titleHTML?.replace(/\&amp;/g, "&").replace(/\&lt;/g, '<').replace(/\&gt;/g, '>');
        let numberText = numberDOM ? numberDOM.innerText : ""
        let payloadKeys = setAutonumberingValuesForPayload(autoNumberOption, titleText, numberText, false);
        numberedandlabel = payloadKeys?.numberedandlabel;
        manualoverride = payloadKeys?.manualoverride;
    }

        captionHTML = replaceUnwantedtags(captionHTML,true)
        creditsHTML = replaceUnwantedtags(creditsHTML,true)
        subtitleHTML = replaceUnwantedtags(subtitleHTML,true)
        numberHTML = replaceUnwantedtags(numberHTML, false);
        titleHTML = replaceUnwantedtags(titleHTML,false)

        titleHTML = createLabelNumberTitleModel(titleHTML, numberHTML, subtitleHTML);
    
        /** [ BG-2528 ]|On deleting footnote and its data wip is showing invalid properties for Char fields */
        subtitleText = subtitleText.replace(/(\r\n|\n|\r)/gm, '');
        captionText = captionText.replace(/(\r\n|\n|\r)/gm, '');
        creditsText = creditsText.replace(/(\r\n|\n|\r)/gm, '');

        if('posterimage' in previousElementData.figuredata && typeof(previousElementData.figuredata.posterimage)!=="object"){
            delete previousElementData.figuredata.posterimage;
        }
        if(previousElementData.figuredata.interactivetype === '3rd-party' || previousElementData.figuredata.interactivetype === "table" ){
            let getAttributeBCE = document.querySelector(`div.element-container.active[data-id="${previousElementData.id}"] div.figureElement`) || document.querySelector(`div.element-container.fg.showBorder[data-id="${previousElementData.id}"] div.figureElement`)
            const podwidth = getAttributeBCE && getAttributeBCE.getAttribute("podwidth") || POD_DEFAULT_VALUE;
            const podwidthToSend = podwidth ? (podHtmlmatchWithRegex(podwidth) ? podwidth : `print${podwidth}`) : '';
            if (previousElementData.figuredata.hasOwnProperty('posterimage')) {
                previousElementData.figuredata.posterimage.podwidth = podwidthToSend
            }
            else {
                const figuredata = {
                    ...previousElementData.figuredata,
                    posterimage: {
                        podwidth: podwidthToSend,
                        imageid: '',
                        path: ''
                        
                    }
                }
                previousElementData.figuredata = figuredata;
            }
        }
    
    if(previousElementData && previousElementData.hasOwnProperty('subtitle')){
        delete previousElementData.subtitle                                     // conversion of old figure
    }

    let data = {
        ...previousElementData,
        title :{
            ...indivisualData,
            text : titleText        
        },
        captions : {
            ...indivisualData,
            text : captionText,
            footnotes : [ ]
        },
        credits : {
            ...indivisualData,
            text : creditsText,
            footnotes : [ ]
        },
        html : {
            captions: matchHTMLwithRegex(captionHTML)?captionHTML:`<p>${captionHTML}</p>`,
            credits: matchHTMLwithRegex(creditsHTML)?creditsHTML:`<p>${creditsHTML}</p>`,
            // subtitle: matchHTMLwithRegex(subtitleHTML)?subtitleHTML:`<p>${subtitleHTML}</p>`,
            // title: matchHTMLwithRegex(titleHTML)?titleHTML:`<p>${titleHTML}</p>`,
            title: titleHTML,
            footnotes : previousElementData.html.footnotes || {},
            glossaryentries : previousElementData.html.glossaryentries || {},
            postertext: "",
            tableasHTML: "",
            text: ""
        },
        inputType : elementTypes[elementType][primaryOption]['enum'],
        inputSubType : elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum']    
    }

    if (previousElementData.figuredata.interactivetype === "pdf" || previousElementData.figuredata.interactivetype === "pop-up-web-link" ||
        previousElementData.figuredata.interactivetype === "web-link") {
        const oldPostertextObj = previousElementData?.figuredata?.postertext ? Object.assign({},previousElementData.figuredata.postertext) : { text: "" };
        const oldPostertext = previousElementData?.figuredata?.postertext?.text ?? "";
        let pdfPosterTextDOM = document.getElementById(`cypress-${index}-3`)
        let posterTextHTML = pdfPosterTextDOM ? pdfPosterTextDOM.innerHTML : ""
        let posterText = pdfPosterTextDOM ? pdfPosterTextDOM.innerText : ""
        let pdfPosterTextHTML = posterTextHTML.match(/(<p.*?>.*?<\/p>)/g)?posterTextHTML:`<p>${posterTextHTML}</p>`
        data.html.postertext = pdfPosterTextHTML
        data.figuredata.postertext = {
            schema : "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            text : posterText,
            textsemantics : [ ]
        }
        if(posterText != oldPostertext){
            store.dispatch(storeOldAssetForTCM({ ...oldFigureData, postertext: oldPostertextObj }));
        }
    }
    if (previousElementData.figuredata.interactiveformat == "mmi-elm") {
        const oldInteractiveTitle = previousElementData?.figuredata?.interactivetitle ?? "";
        const interactiveNodeSelector = document.querySelector(`div[data-id='${previousElementData.id}'] div.interactive-element`);
        const interactiveTitleDom = interactiveNodeSelector && interactiveNodeSelector.querySelector(`div.update-icon-wrapper p`);
        const interactiveTitleText = interactiveTitleDom ? interactiveTitleDom.innerText : "";
        data.figuredata.interactivetitle = interactiveTitleText;
        if (interactiveTitleText != oldInteractiveTitle) {
            store.dispatch(storeOldAssetForTCM({ ...oldFigureData, interactivetitle: oldInteractiveTitle }));
        }
    }

    if (isAutoNumberingEnabled) {
        data = {
            ...data,
            html : {
                ...data.html,
                title: `<p>${subtitleHTML}</p>`
            },
            numberedandlabel : numberedandlabel,
            displayedlabel : displayedlabel,
            manualoverride : manualoverride
        }
        if(autoNumberOption === AUTO_NUMBER_SETTING_DEFAULT || autoNumberOption === AUTO_NUMBER_SETTING_REMOVE_NUMBER){
            delete data.manualoverride
        }
        if(autoNumberOption === AUTO_NUMBER_SETTING_REMOVE_NUMBER || autoNumberOption === AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER){
            delete data.displayedlabel
        }
    }
    return data
}

/**
 * Data preparation for blockcode element
 * @param {*} index 
 * @param {*} previousElementData 
 * @param {*} elementType 
 * @param {*} primaryOption 
 * @param {*} secondaryOption 
 */
const generateCommonFigureDataBlockCode = (index, previousElementData, elementType, primaryOption, secondaryOption, isAutoNumberingEnabled, autoNumberOption) => {

    let getAttributeBCE = document.querySelector(`div.element-container.active[data-id="${previousElementData.id}"] div.blockCodeFigure`) || document.querySelector(`div.element-container.bce.showBorder[data-id="${previousElementData.id}"] div.blockCodeFigure`)
    let startNumber = getAttributeBCE && getAttributeBCE.getAttribute("startnumber")
    let isNumbered = getAttributeBCE && getAttributeBCE.getAttribute("numbered") || true;
    let isSyntaxhighlighted = getAttributeBCE && getAttributeBCE.getAttribute("syntaxhighlighting") || true ;

    let titleDOM = document.getElementById(`cypress-${index}-0`),
        numberDOM = document.getElementById(`cypress-${index}-1`),
        subtitleDOM = document.getElementById(`cypress-${index}-2`),
        preformattedText = document.getElementById(`cypress-${index}-3`).innerHTML ? document.getElementById(`cypress-${index}-3`).innerHTML : '<span class="codeNoHighlightLine"><br /></span>',
        captionDOM = document.getElementById(`cypress-${index}-4`),
        creditsDOM = document.getElementById(`cypress-${index}-5`)

    let titleHTML = titleDOM ? titleDOM.innerHTML : "",
        numberHTML = numberDOM ? numberDOM.innerHTML : "",
        subtitleHTML = subtitleDOM ? subtitleDOM.innerHTML : "",
        captionHTML = captionDOM ? captionDOM.innerHTML : "",
        creditsHTML = creditsDOM ? creditsDOM.innerHTML : ""

    titleHTML = titleHTML.replace(/<br data-mce-bogus="1">/g, '').replace(/\&nbsp;/g, '').trim();
    numberHTML = numberHTML.replace(/<br data-mce-bogus="1">/g, '').replace(/\&nbsp;/g, '').trim();

    let titleText = titleDOM ? titleDOM.innerText : "",
        subtitleText = subtitleDOM ? subtitleDOM.innerText : "",
        captionText = captionDOM ? captionDOM.innerText : "",
        creditsText = creditsDOM ? creditsDOM.innerText : ""

    /**Autonumbering Code */
    let numberedandlabel = false;
    let manualoverride = {};
    let displayedlabel = previousElementData?.displayedlabel;
    const validDropdownOptions = generateDropdownDataForFigures(previousElementData)
    if (validDropdownOptions?.includes(titleText) && titleText !== previousElementData?.displayedlabel) {
        displayedlabel = titleText;
    } else if (!(previousElementData.hasOwnProperty('displayedlabel')) && autoNumberOption !== AUTO_NUMBER_SETTING_REMOVE_NUMBER) {
        displayedlabel = getValueOfLabel(previousElementData?.figuretype);
    }
    if (isAutoNumberingEnabled && previousElementData?.hasOwnProperty('numberedandlabel')) {
        titleHTML = titleHTML?.replace(/\&amp;/g, "&").replace(/\&lt;/g, '<').replace(/\&gt;/g, '>');
        let numberText = numberDOM ? numberDOM.innerText : ""
        let payloadKeys = setAutonumberingValuesForPayload(autoNumberOption, titleText, numberText, false);
        numberedandlabel = payloadKeys?.numberedandlabel;
        manualoverride = payloadKeys?.manualoverride;
    }
    /**********************/
        captionHTML = replaceUnwantedtags(captionHTML,true)
        creditsHTML = replaceUnwantedtags(creditsHTML,true)
        subtitleHTML = replaceUnwantedtags(subtitleHTML,true)
        numberHTML = replaceUnwantedtags(numberHTML, false)
        titleHTML = replaceUnwantedtags(titleHTML,false)

        titleHTML = createLabelNumberTitleModel(titleHTML, numberHTML, subtitleHTML);
    
        /** [ BG-2528 ]|On deleting footnote and its data wip is showing invalid properties for Char fields */
        subtitleText = subtitleText.replace(/(\r\n|\n|\r)/gm, '');
        captionText = captionText.replace(/(\r\n|\n|\r)/gm, '');
        creditsText = creditsText.replace(/(\r\n|\n|\r)/gm, '');

    if(previousElementData && previousElementData.hasOwnProperty('subtitle')){
        delete previousElementData.subtitle                                     // conversion of old figure
    }

    let data = {
        ...previousElementData,
        title :{
            ...indivisualData,
            text : titleText
        },
        captions : {
            ...indivisualData,
            text : captionText,
            footnotes : [ ]
        },
        credits : {
            ...indivisualData,
            text : creditsText,
            footnotes : [ ]
        },
        html : {
            captions: matchHTMLwithRegex(captionHTML)?captionHTML:`<p>${captionHTML}</p>`,
            credits: matchHTMLwithRegex(creditsHTML)?creditsHTML:`<p>${creditsHTML}</p>`,
            footnotes : previousElementData.html.footnotes || {},
            glossaryentries : previousElementData.html.glossaryentries || {},
            title: titleHTML,
            postertext: "",
            tableasHTML: "",
            text: "",
            preformattedtext: matchHTMLwithRegex(preformattedText)?preformattedText:`<p>${preformattedText}</p>`
        }, 
        figuredata:{
            schema : "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
            type: "codelistingformatted",
            numbered: (typeof (isNumbered ) == "string") ? JSON.parse(isNumbered): isNumbered,
            startNumber: startNumber,
            programlanguage: previousElementData.figuredata.programlanguage,
            syntaxhighlighting: (typeof (isSyntaxhighlighted ) == "string") ? JSON.parse(isSyntaxhighlighted): isSyntaxhighlighted,

        },
        inputType : elementTypes[elementType][primaryOption]['enum'],
        inputSubType : elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum']    
    }
    /**Autonumbering Code */
    if (isAutoNumberingEnabled && previousElementData?.hasOwnProperty('numberedandlabel')) {
        data = {
            ...data,
            html : {
                ...data.html,
                title: `<p>${subtitleHTML}</p>`
            }
        }
        const dataToReturn = updateAutoNumberedElement(autoNumberOption, data, { displayedlabel, manualoverride })
        data = {...dataToReturn}  
    }
    /**********************/
    return data
}

/**
 * Data preparation for MathML/ChemML image or figure authored text
 * @param {*} index 
 * @param {*} previousElementData 
 * @param {*} elementType 
 * @param {*} primaryOption 
 * @param {*} secondaryOption 
 */
const generateCommonFigureDataAT = (index, previousElementData, elementType, primaryOption, secondaryOption, isAutoNumberingEnabled, autoNumberOption) => {

    let titleDOM = document.getElementById(`cypress-${index}-0`),
        numberDOM = document.getElementById(`cypress-${index}-1`),
        subtitleDOM = document.getElementById(`cypress-${index}-2`),
        captionDOM = document.getElementById(`cypress-${index}-4`),
        creditsDOM = document.getElementById(`cypress-${index}-5`),
        textDOM = document.getElementById(`cypress-${index}-3`)

    let titleHTML = titleDOM ? titleDOM.innerHTML : "",
        numberHTML = numberDOM ? numberDOM.innerHTML : "",
        subtitleHTML = subtitleDOM ? subtitleDOM.innerHTML : "",
        captionHTML = captionDOM ? captionDOM.innerHTML : "",
        creditsHTML = creditsDOM ? creditsDOM.innerHTML : "",
        textHTML = textDOM ? textDOM.innerHTML : ""
    
    titleHTML = titleHTML.replace(/<br data-mce-bogus="1">/g, '').replace(/\&nbsp;/g, '').trim();
    numberHTML = numberHTML.replace(/<br data-mce-bogus="1">/g, '').replace(/\&nbsp;/g, '').trim();

    let titleText = titleDOM ? titleDOM.innerText : "",
        subtitleText = subtitleDOM ? subtitleDOM.innerText : "",
        captionText = captionDOM ? captionDOM.innerText : "",
        creditsText = creditsDOM ? creditsDOM.innerText : "",
        eleText = textDOM ? textDOM.innerText : ""

    /**Autonumbering Code */
    let numberedandlabel = false;
    let manualoverride = {};
    let displayedlabel = previousElementData?.displayedlabel;
    const validDropdownOptions = generateDropdownDataForFigures(previousElementData)
    if (validDropdownOptions?.includes(titleText) && titleText !== previousElementData?.displayedlabel) {
        displayedlabel = titleText;
    } else if (!(previousElementData.hasOwnProperty('displayedlabel')) && autoNumberOption !== AUTO_NUMBER_SETTING_REMOVE_NUMBER) {
        displayedlabel = getValueOfLabel(previousElementData?.figuretype);
    }
    if (isAutoNumberingEnabled && previousElementData?.hasOwnProperty('numberedandlabel')) {
        titleHTML = titleHTML?.replace(/\&amp;/g, "&").replace(/\&lt;/g, '<').replace(/\&gt;/g, '>');
        let numberText = numberDOM ? numberDOM.innerText : ""
        let payloadKeys = setAutonumberingValuesForPayload(autoNumberOption, titleText, numberText, false);
        numberedandlabel = payloadKeys?.numberedandlabel;
        manualoverride = payloadKeys?.manualoverride;
    }
    /**********************/
    captionHTML = replaceUnwantedtags(captionHTML, true)
    creditsHTML = replaceUnwantedtags(creditsHTML, true)
    subtitleHTML = replaceUnwantedtags(subtitleHTML, true)
    numberHTML = replaceUnwantedtags(numberHTML, false)
    titleHTML = replaceUnwantedtags(titleHTML, false)
    textHTML = replaceUnwantedtags(textHTML, false)

    titleHTML = createLabelNumberTitleModel(titleHTML, numberHTML, subtitleHTML);

    /** [ BG-2528 ]|On deleting footnote and its data wip is showing invalid properties for Char fields */
    subtitleText = subtitleText.replace(/(\r\n|\n|\r)/gm, '');
    captionText = captionText.replace(/(\r\n|\n|\r)/gm, '');
    creditsText = creditsText.replace(/(\r\n|\n|\r)/gm, '');

    if(previousElementData && previousElementData.hasOwnProperty('subtitle')){
        delete previousElementData.subtitle                                     // conversion of old figure
    }

    let data = {
        ...previousElementData,
        title :{
            ...indivisualData,
            text : titleText
        },
        captions : {
            ...indivisualData,
            text : captionText,
            footnotes : [ ]
        },
        credits : {
            ...indivisualData,
            text : creditsText,
            footnotes : [ ]
        },
        figuredata : {
            type: "element-authoredtext",
            schema: "http://schemas.pearson.com/wip-authoring/element/1",
            elementdata: {
                schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                text: eleText,
                textsemantics: [],
                mathml: []
            }
        },
        html : {
            captions: matchHTMLwithRegex(captionHTML)?captionHTML:`<p>${captionHTML}</p>`,
            credits: matchHTMLwithRegex(creditsHTML)?creditsHTML:`<p>${creditsHTML}</p>`,
            footnotes : previousElementData.html.footnotes || {},
            glossaryentries : previousElementData.html.glossaryentries || {},
            title: titleHTML,
            postertext: "",
            tableasHTML: "",
            text: textHTML.match(/<p>/g) ? textHTML:`<p>${textHTML}</p>`
        },
        inputType : elementTypes[elementType][primaryOption]['enum'],
        inputSubType : elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum']    
    }
    /**Autonumbering Code */
    if (isAutoNumberingEnabled && previousElementData?.hasOwnProperty('numberedandlabel')) {
        data = {
            ...data,
            html : {
                ...data.html,
                title: `<p>${subtitleHTML}</p>`
            }
        }
        const dataToReturn = updateAutoNumberedElement(autoNumberOption, data, { displayedlabel, manualoverride })
        data = {...dataToReturn}  
    }
    /**********************/
    return data
}

/**
 * Data preparation for assessment element
 * @param {*} index 
 * @param {*} previousElementData 
 * @param {*} elementType 
 * @param {*} primaryOption 
 * @param {*} secondaryOption 
 */
export const generateAssessmentData = (index, previousElementData, elementType, primaryOption, secondaryOption) => {
    let assessmentNodeSelector = `div[data-id='${previousElementData.id}'] figure.figureAssessment `;
    const assessmentNode = document.querySelector(assessmentNodeSelector);
    const assessmentId = assessmentNode.querySelector('span.embedded-id').innerText;
    const assessmentTitle = assessmentNode.querySelector('span.embedded-title').innerText;
    const assessmentItemId = assessmentNode.querySelector('span.embedded-itemid').innerText;
    const assessmentItemTitle = assessmentNode.querySelector('span.embedded-itemtitle') && assessmentNode.querySelector('span.embedded-itemtitle').innerText;

    let dataToSend = {
        ...previousElementData,
        inputType: elementTypes[elementType][primaryOption]['enum'],
        inputSubType: elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum'],
        html: {
            title: `<p>${assessmentTitle}</p>`
        }
    }

    dataToSend.figuredata.elementdata.assessmentid = assessmentId ? assessmentId : "";
    dataToSend.figuredata.elementdata.assessmenttitle = assessmentTitle ? assessmentTitle : "";
    dataToSend.figuredata.elementdata.assessmentitemid = assessmentItemId ? assessmentItemId : "";
    dataToSend.figuredata.elementdata.assessmentitemtitle = assessmentItemTitle ? assessmentItemTitle : "";


    // dataToSend.figuredata.id = getAsid ? getAsid : "";   //PCAT-6792 fixes
    // dataToSend.figuredata.elementdata.posterimage.imageid = getAsid ? getAsid : ""; //PCAT-6792 fixes

    /** [PCAT-7961] | case(1) - As no unique figuredata.id is present for the assessment,the  'figuredata.id' key is removed */
    if (previousElementData && previousElementData.figuredata && (previousElementData.figuredata.id || previousElementData.figuredata.id == "")) {
        delete previousElementData.figuredata.id;
    }
    /** [PCAT-7961] | case(2) - As no image is present for the assessment,the  'posterimage' key is removed */
    let isPosterImage = previousElementData && previousElementData.figuredata && previousElementData.figuredata.elementdata && previousElementData.figuredata.elementdata.posterimage
    if (isPosterImage) {
        delete previousElementData.figuredata.elementdata.posterimage
    }

    let usageType = document.querySelector(assessmentNodeSelector + 'span.singleAssessment_Dropdown_currentLabel').innerText;
    dataToSend.figuredata.elementdata.usagetype = usageType;

    return dataToSend;
}
/**
 * Data preparation for assessment slate
 * @param {*} index 
 * @param {*} previousElementData 
 * @param {*} elementType 
 * @param {*} primaryOption 
 * @param {*} secondaryOption 
 */
export const generateAssessmentSlateData = (index, previousElementData, elementType, primaryOption, secondaryOption) => {
    let assessmenttitle = previousElementData.elementdata.assessmentformat == 'learningtemplate' ? previousElementData.elementdata.templatelabel : previousElementData.elementdata.assessmenttitle;
    let dataToSend = {
        ...previousElementData,
        inputType: elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum'],
        inputSubType: "NA", /** The usageType dependency on inputSubType removed */
        html: {
            title: `<p>${assessmenttitle}</p>`
        }
    }
    return dataToSend;
}

/**
 * Data preparation for Citation element
 * @param {*} index 
 * @param {*} previousElementData 
 * @param {*} elementType 
 * @param {*} primaryOption 
 * @param {*} secondaryOption 
 */
const generateCitationElementData = (index, previousElementData, elementType, primaryOption, secondaryOption, node, parentElement) => {
    let { innerHTML, innerText } = node;
    let citationElementData = {
        ...previousElementData,
        elementdata : {
            text : innerText
        },
        html : {
            text : innerHTML
        },
        inputType : elementTypes[elementType][primaryOption]['enum'],
        inputSubType : elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum'],
        slateVersionUrn : parentElement.id,
        parentType : parentElement.type,
        elementParentEntityUrn: parentElement.contentUrn
    }
    return citationElementData
}

/**
 * Detects postertext/reveal answer section of ShowHide and check for empty content in it
 * @param {*} showHideType Section in ShowHide
 * @param {*} node HTML node containing content
 */
const validateRevealAnswerData = (showHideType, node, elementType, isHeader) => {
    if(showHideType && (showHideType === "show" || showHideType === "hide") && (elementType === elementTypeConstant.AUTHORED_TEXT && isHeader !== 'HEADERS')){
        return {
            innerHTML : matchHTMLwithRegex(node.innerHTML) ? node.innerHTML : `<p class="paragraphNumeroUno">${node.innerHTML}</p>`,
            innerText : node.innerText
        }
    }
    else{
        return {
            innerHTML : node.innerHTML,
            innerText : node.innerText
        }
    }
}

/**
 * Returns MetaDataField
 * @param {*} popupdata Popup container data 
 * @param {*} _previousElementData element data inside popup
 */
export const getMetaDataFieldForPopup = ({ popupdata: _popupdata }, _previousElementData) => {
    let hasFormattedTitle = _popupdata.hasOwnProperty("formatted-title"),
        hasFormattedSubtitle = _popupdata.hasOwnProperty("formatted-subtitle");

    if (hasFormattedTitle && hasFormattedSubtitle) {
        return "formattedTitle"
    }
    else if(hasFormattedTitle && !hasFormattedSubtitle) {
        return "formattedTitleOnly"
    }
    else if(!hasFormattedTitle && hasFormattedSubtitle) {
        return "formattedSubtitle"
    }
    return "formattedTitle"
}

/**
 * Prepares new element data for all elements
 * @param {*} type 
 * @param {*} previousElementData 
 * @param {*} node 
 * @param {*} elementType 
 * @param {*} primaryOption 
 * @param {*} secondaryOption 
 * @param {*} activeEditorId 
 * @param {*} index 
 * @param {*} containerContext 
 */
export const createUpdatedData = (type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext,parentElement,showHideType,asideData, isAutoNumberingEnabled, autoNumberOption) => {
    let { appStore } = store.getState()
    let dataToReturn = {}
    switch (type){
        case elementTypeConstant.AUTHORED_TEXT:
        case elementTypeConstant.LEARNING_OBJECTIVE_ITEM:
        case elementTypeConstant.BLOCKFEATURE:
        case elementTypeConstant.ELEMENT_LIST:
        case elementTypeConstant.POETRY_STANZA:
            const elementTypeObj = findElementType(previousElementData, index)
            if (type === 'stanza') { /**Resolve PCAT- 9199 */
                elementType = 'stanza'
            }    
            tinyMCE.$(node).find('.blockquote-hidden').remove();
            let innerHTML, innerText;

            let inputElementType = elementTypes[elementTypeObj.elementType][elementTypeObj.primaryOption]['enum'];
            let revealTextData = validateRevealAnswerData(showHideType, node, type, inputElementType)
            innerHTML = revealTextData.innerHTML
            innerText = revealTextData.innerText
            let attributionText=tinyMCE.$(node).find('.blockquoteTextCredit').text()

            let inputElementSubType = elementTypes[elementTypeObj.elementType][elementTypeObj.primaryOption]['subtype'][elementTypeObj.secondaryOption]['enum'];
            if ((attributionText.length == 0 && inputElementSubType == "MARGINALIA") || (attributionText.length == 0 && inputElementSubType == "BLOCKQUOTE")) {
                inputElementSubType = "BLOCKQUOTE"
            }
            else if ((attributionText.length > 0 && inputElementSubType == "BLOCKQUOTE") || (attributionText.length > 0 && inputElementSubType == "MARGINALIA")) {
                inputElementSubType = "MARGINALIA"
            }
            // PCAT-2426 - calling function to remove tinymce spellcheck DOM attributes from innerHTML
            // innerHTML = removeSpellCheckDOMAttributes(innerHTML);
            dataToReturn = {
                ...previousElementData,
                elementdata : {
                    text : innerText
                },
                html : {
                    text : innerHTML,
                    footnotes : previousElementData.html.footnotes || {},
                    glossaryentries : previousElementData.html.glossaryentries || {}
                },
                inputType : parentElement && (parentElement.type === "popup" || parentElement.type === "citations" || parentElement.type === "poetry" && previousElementData.type === "element-authoredtext") ? "AUTHORED_TEXT" : inputElementType,
                inputSubType : parentElement && (parentElement.type == "popup" || parentElement.type === "poetry") ? "NA" : inputElementSubType
            }

            if(type === 'element-authoredtext'){
                const classList = node?.firstChild?.classList?.value?.split(" ") ?? [];
                dataToReturn["designtype"] = getDesignType(classList);
                if(dataToReturn.designtype === null) {
                    delete dataToReturn.designtype;
                }
                dataToReturn.html['indexEntries'] = previousElementData.html.indexEntries || {}
            }
            
            if(type==="stanza"){
                dataToReturn.html.text=`<p>${innerHTML}</p>`;
                dataToReturn.html['indexEntries'] = previousElementData.html?.indexEntries || {};
                delete dataToReturn.poetrylines;
            } 
            if(parentElement && parentElement.type === "popup"){
                dataToReturn.elementParentEntityUrn = parentElement.contentUrn;
                if(parentElement.popupdata["postertextobject"][0]["id"] === previousElementData.id){
                    dataToReturn.sectionType = "postertextobject";
                }
                else {
                    dataToReturn.metaDataField = getMetaDataFieldForPopup(parentElement, previousElementData)
                }
            } else if(parentElement && parentElement.type === "poetry"){
                if(parentElement.contents && parentElement.contents["formatted-title"] && parentElement.contents["formatted-title"]["id"] === previousElementData.id){
                    dataToReturn["metaDataField"] = "formattedTitle";
                }
                else if(parentElement.contents && parentElement.contents["creditsarray"] && parentElement.contents["creditsarray"].length && parentElement.contents["creditsarray"][0]["id"] === previousElementData.id){
                    dataToReturn["sectionType"] = "creditsarray";
                }
                dataToReturn["elementParentEntityUrn"] = parentElement.contentUrn
                
            } else if(parentElement && parentElement.type === "citations") {
                dataToReturn["metaDataField"] = "formattedTitle"
                dataToReturn["elementParentEntityUrn"] = parentElement.contentUrn
            } 
            else if(asideData?.type==="manifestlist" && (parentElement && (parentElement?.type === "showhide" && showHideType) || parentElement?.type === "groupedcontent") || asideData?.parent?.type === 'element-aside' || config.isPopupSlate) {
                dataToReturn["elementParentEntityUrn"] = containerContext?.props?.parentManifestListItem?.contentUrn
            }
            else if(parentElement && parentElement.type === "showhide" && showHideType){
                const poetryElementTypes = ['poetry', 'stanza', 'element-authoredtext'];
                dataToReturn.sectionType = showHideType;
                dataToReturn["elementParentEntityUrn"] = parentElement.contentUrn
                // checking for poetry element inside SH element to pass some extra parameters inside update request
                if (elementType && poetryElementTypes.includes(elementType) && parentElement?.interactivedata) {
                    parentElement?.interactivedata?.[showHideType].forEach(poetryElement => {
                        if(poetryElement?.type === 'poetry') {
                            if(poetryElement?.contents?.['formatted-title']?.id === previousElementData.id) {
                                dataToReturn["metaDataField"] = "formattedTitle";
                                dataToReturn["elementParentEntityUrn"] = poetryElement.contentUrn
                            }
                            if(poetryElement?.contents?.creditsarray && poetryElement?.contents?.creditsarray.length && poetryElement?.contents?.creditsarray[0]["id"] === previousElementData.id) {
                                dataToReturn["sectionType"] = "creditsarray";
                                dataToReturn["elementParentEntityUrn"] = poetryElement.contentUrn
                            }
                        }
                    });
                    dataToReturn["elementType"] = "Poetry";
                }
            }
            break;
        case elementTypeConstant.FIGURE:
                const figureElementData = findElementType(previousElementData, index);
                const figureElementType = figureElementData?.elementType;
                const figurePrimaryOption = figureElementData?.primaryOption;
                const figureSecondaryOption = figureElementData?.secondaryOption;
                switch (previousElementData.figuretype) {
                    case elementTypeConstant.FIGURE_IMAGE:
                    case elementTypeConstant.FIGURE_MATH_IMAGE:
                    case elementTypeConstant.FIGURE_TABLE:
                    case elementTypeConstant.FIGURE_TABLE_EDITOR:
                        dataToReturn = generateCommonFigureData(index, previousElementData, figureElementType, figurePrimaryOption, figureSecondaryOption, isAutoNumberingEnabled, autoNumberOption)
                        break;
                    case elementTypeConstant.FIGURE_VIDEO:
                    case elementTypeConstant.FIGURE_AUDIO:
                        dataToReturn = generateCommonFigureData(index, previousElementData, figureElementType, figurePrimaryOption, figureSecondaryOption, isAutoNumberingEnabled, autoNumberOption)
                        break;
                    case elementTypeConstant.FIGURE_ASSESSMENT:
                        dataToReturn = generateAssessmentData(index, previousElementData, figureElementType, figurePrimaryOption, figureSecondaryOption)
                        break;
                    case elementTypeConstant.INTERACTIVE:

                        dataToReturn = generateCommonFigureDataInteractive(index, previousElementData, figureElementType, figurePrimaryOption, figureSecondaryOption, isAutoNumberingEnabled, autoNumberOption)
                        break;
                    case  elementTypeConstant.FIGURE_CODELISTING:
                        dataToReturn = generateCommonFigureDataBlockCode(index, previousElementData, figureElementType, figurePrimaryOption, figureSecondaryOption, isAutoNumberingEnabled, autoNumberOption)
                        break;
                    case elementTypeConstant.FIGURE_AUTHORED_TEXT:
                        dataToReturn = generateCommonFigureDataAT(index, previousElementData, figureElementType, figurePrimaryOption, figureSecondaryOption, isAutoNumberingEnabled, autoNumberOption)
                        break;
                }
                
                break;
            
        case elementTypeConstant.ELEMENT_ASIDE:
            dataToReturn = { 
                ...previousElementData,
                inputType : elementTypes[elementType][primaryOption]['enum'],
                inputSubType : elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum']
            }
            break;
        
        case elementTypeConstant.ASSESSMENT_SLATE:
            dataToReturn = generateAssessmentSlateData(index, previousElementData, elementType, primaryOption, secondaryOption)
            break;
        case elementTypeConstant.CITATION_ELEMENT:
            const citationElementData = findElementType(previousElementData, index);
            const citationElementType = citationElementData?.elementType;
            const citationPrimaryOption = citationElementData?.primaryOption;
            const citationSecondaryOption = citationElementData?.secondaryOption;
            dataToReturn = generateCitationElementData(index, previousElementData, citationElementType, citationPrimaryOption, citationSecondaryOption, node, parentElement)
            break;
    }
    dataToReturn.slateVersionUrn = config.slateManifestURN;
    if (parentElement) {
        parentElement["index"] = index
    }
    let slateEntityUrn = dataToReturn.elementParentEntityUrn || appStore.parentUrn && appStore.parentUrn.contentUrn || config.slateEntityURN
    dataToReturn = { ...dataToReturn, index: index.toString().split('-')[index.toString().split('-').length - 1], elementParentEntityUrn: slateEntityUrn }
    if (config.elementStatus[dataToReturn.id] && config.elementStatus[dataToReturn.id] === "approved") {
        config.savingInProgress = true
    }
    /* On update the inner elements of SH; add section type */
     if(asideData?.type === elementTypeConstant.SHOW_HIDE || elementType === elementTypeConstant.SHOW_HIDE) {
        if(dataToReturn?.elementType !== 'Poetry') dataToReturn.sectionType = showHideType || asideData?.sectionType;
        if(parentElement?.type === "groupedcontent") {
            dataToReturn["elementParentEntityUrn"] = containerContext?.props?.element?.contentUrn;
        }
    }
    return dataToReturn
}

export const createOpenerElementData = (elementData, elementType, primaryOption, secondaryOption) => {
    let dataToReturn = {};
    if(elementData) {
        dataToReturn = {
            ...elementData,
            inputType : elementType?elementTypes[elementType][primaryOption]['enum']:"OPENER_ELEMENT",
            inputSubType : elementType?elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum']:"OPENER_ELEMENT",   
            slateVersionUrn: config.slateManifestURN,
            elementParentEntityUrn: config.slateEntityURN
        }
    }
    
    if (config.elementStatus[dataToReturn.id] && config.elementStatus[dataToReturn.id] === "approved") {
        config.savingInProgress = true
    }
    return dataToReturn;
}
export const handleBlankLineDom = (html,replaceText)=>{
    if(typeof html === 'string' && typeof replaceText === 'string') {
        if(replaceText){
            html = html.replace(/<span contenteditable="false" id="blankLine" class="answerLineContent"><br><\/span>/g,`<span contenteditable="false" id="blankLine" class="answerLineContent">${replaceText}</span>`)
            html = html.replace(/<span contenteditable="false" id="blankLine" class="answerLineContent"><\/span>/g,`<span contenteditable="false" id="blankLine" class="answerLineContent">${replaceText}</span>`)
            return html;
        } else {
            return html.replace(/<span contenteditable="false" id="blankLine" class="answerLineContent"><\/span>/g,'<span contenteditable="false" id="blankLine" class="answerLineContent"><br></span>')
        }
    }
    else return html;
}