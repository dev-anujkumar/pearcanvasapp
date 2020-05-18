import elementTypeConstant from './ElementConstants'
import elementTypes from './../Sidebar/elementTypes';
import config from '../../config/config';
import { matchHTMLwithRegex } from '../../constants/utility.js'
import store from '../../appstore/store'

let indivisualData = {
    schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
    textsemantics: [ ],
    mathml: [ ]
}

const replaceUnwantedtags = (html) => {
    let tempDiv = document.createElement('div'); 
    tempDiv.innerHTML = html;
    tinyMCE.$(tempDiv).find('br').remove();
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
export const generateCommonFigureData = (index, previousElementData, elementType, primaryOption, secondaryOption) => {
    let titleDOM = document.getElementById(`cypress-${index}-0`),
        subtitleDOM = document.getElementById(`cypress-${index}-1`),
        captionDOM = document.getElementById(`cypress-${index}-2`),
        creditsDOM = document.getElementById(`cypress-${index}-3`)

    let titleHTML = titleDOM ? titleDOM.innerHTML : "",
        subtitleHTML = subtitleDOM ? subtitleDOM.innerHTML : "",
        captionHTML = captionDOM ? captionDOM.innerHTML : "",
        creditsHTML = creditsDOM ? creditsDOM.innerHTML : ""

    let titleText = titleDOM ? titleDOM.innerText : "",
        subtitleText = subtitleDOM ? subtitleDOM.innerText : "",
        captionText = captionDOM ? captionDOM.innerText : "",
        creditsText = creditsDOM ? creditsDOM.innerText : ""

    captionHTML = replaceUnwantedtags(captionHTML)
    creditsHTML = replaceUnwantedtags(creditsHTML)
    subtitleHTML = replaceUnwantedtags(subtitleHTML)
    titleHTML = replaceUnwantedtags(titleHTML)

    let data = {
        ...previousElementData,
        title :{
            ...indivisualData,
            text : titleText
        },
        subtitle : {
            ...indivisualData,
            text : subtitleText,
            footnotes : []
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
            subtitle: matchHTMLwithRegex(subtitleHTML)?subtitleHTML:`<p>${subtitleHTML}</p>`,
            title: matchHTMLwithRegex(titleHTML)?titleHTML:`<p>${titleHTML}</p>`,
            postertext: "",
            text: ""
        },
        inputType : elementType?elementTypes[elementType][primaryOption]['enum']:"",
        inputSubType : elementType?elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum']:""    
    }
    return data
}

/**
 * Generates updated element data for figure interactive element
 * @param {*} index 
 * @param {*} previousElementData 
 * @param {*} elementType 
 * @param {*} primaryOption 
 * @param {*} secondaryOption 
 */
export const generateCommonFigureDataInteractive = (index, previousElementData, elementType, primaryOption, secondaryOption) => {
    let titleDOM = document.getElementById(`cypress-${index}-0`),
        subtitleDOM = document.getElementById(`cypress-${index}-1`),
        captionDOM = document.getElementById(`cypress-${index}-3`),
        creditsDOM = document.getElementById(`cypress-${index}-4`)

    let titleHTML = titleDOM ? titleDOM.innerHTML : "",
        subtitleHTML = subtitleDOM ? subtitleDOM.innerHTML : "",
        captionHTML = captionDOM ? captionDOM.innerHTML : "",
        creditsHTML = creditsDOM ? creditsDOM.innerHTML : ""

    let titleText = titleDOM ? titleDOM.innerText : "",
        subtitleText = subtitleDOM ? subtitleDOM.innerText : "",
        captionText = captionDOM ? captionDOM.innerText : "",
        creditsText = creditsDOM ? creditsDOM.innerText : ""

        captionHTML = replaceUnwantedtags(captionHTML)
        creditsHTML = replaceUnwantedtags(creditsHTML)
        subtitleHTML = replaceUnwantedtags(subtitleHTML)
        titleHTML = replaceUnwantedtags(titleHTML)

        if('posterimage' in previousElementData.figuredata && typeof(previousElementData.figuredata.posterimage)!=="object"){
            delete previousElementData.figuredata.posterimage;
        }

    let data = {
        ...previousElementData,
        title :{
            ...indivisualData,
            text : titleText        
        },
        subtitle : {
            ...indivisualData,
            text : subtitleText,
            footnotes : [ ]
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
            subtitle: matchHTMLwithRegex(subtitleHTML)?subtitleHTML:`<p>${subtitleHTML}</p>`,
            title: matchHTMLwithRegex(titleHTML)?titleHTML:`<p>${titleHTML}</p>`,
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
        let pdfPosterTextDOM = document.getElementById(`cypress-${index}-2`)
        let posterTextHTML = pdfPosterTextDOM ? pdfPosterTextDOM.innerHTML : ""
        let posterText = pdfPosterTextDOM ? pdfPosterTextDOM.innerText : ""
        let pdfPosterTextHTML = posterTextHTML.match(/(<p.*?>.*?<\/p>)/g)?posterTextHTML:`<p>${posterTextHTML}</p>`
        data.html.postertext = pdfPosterTextHTML
        data.figuredata.postertext = {
            schema : "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            text : posterText,
            textsemantics : [ ]
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
const generateCommonFigureDataBlockCode = (index, previousElementData, elementType, primaryOption, secondaryOption) => {

    let getAttributeBCE = document.querySelector(`div.element-container.active[data-id="${previousElementData.id}"] div.blockCodeFigure`)
    let startNumber = getAttributeBCE && getAttributeBCE.getAttribute("startnumber")
    let isNumbered = getAttributeBCE && getAttributeBCE.getAttribute("numbered")

    let titleDOM = document.getElementById(`cypress-${index}-0`),
        subtitleDOM = document.getElementById(`cypress-${index}-1`),
        preformattedText = document.getElementById(`cypress-${index}-2`).innerText ? document.getElementById(`cypress-${index}-2`).innerText : "",
        captionDOM = document.getElementById(`cypress-${index}-3`),
        creditsDOM = document.getElementById(`cypress-${index}-4`)

    let titleHTML = titleDOM ? titleDOM.innerHTML : "",
        subtitleHTML = subtitleDOM ? subtitleDOM.innerHTML : "",
        captionHTML = captionDOM ? captionDOM.innerHTML : "",
        creditsHTML = creditsDOM ? creditsDOM.innerHTML : ""

    let titleText = titleDOM ? titleDOM.innerText : "",
        subtitleText = subtitleDOM ? subtitleDOM.innerText : "",
        captionText = captionDOM ? captionDOM.innerText : "",
        creditsText = creditsDOM ? creditsDOM.innerText : ""

        captionHTML = replaceUnwantedtags(captionHTML)
        creditsHTML = replaceUnwantedtags(creditsHTML)
        subtitleHTML = replaceUnwantedtags(subtitleHTML)
        titleHTML = replaceUnwantedtags(titleHTML)
    
        preformattedText = preformattedText.replace(/&lt;/g, "<")
        preformattedText = preformattedText.replace(/&gt;/g, ">")
        preformattedText = preformattedText.trimEnd();

    let data = {
        ...previousElementData,
        title :{
            ...indivisualData,
            text : titleText
        },
        subtitle : {
            ...indivisualData,
            text : subtitleText,
            footnotes : [ ]
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
            subtitle: matchHTMLwithRegex(subtitleHTML)?subtitleHTML:`<p>${subtitleHTML}</p>` ,
            title: matchHTMLwithRegex(titleHTML)?titleHTML:`<p>${titleHTML}</p>`,
            postertext: "",
            tableasHTML: "",
            text: ""
        }, 
        figuredata:{
            schema : "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
            type: previousElementData.figuretype,
            numbered: (typeof (isNumbered ) == "string") ? JSON.parse(isNumbered): isNumbered,
            startNumber: startNumber,
            programlanguage: previousElementData.figuredata.programlanguage,
            preformattedtext: [...preformattedText.split("\n")]
        },
        inputType : elementTypes[elementType][primaryOption]['enum'],
        inputSubType : elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum']    
    }
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
const generateCommonFigureDataAT = (index, previousElementData, elementType, primaryOption, secondaryOption) => {

    let titleDOM = document.getElementById(`cypress-${index}-0`),
        subtitleDOM = document.getElementById(`cypress-${index}-1`),
        captionDOM = document.getElementById(`cypress-${index}-3`),
        creditsDOM = document.getElementById(`cypress-${index}-4`),
        textDOM = document.getElementById(`cypress-${index}-2`)

    let titleHTML = titleDOM ? titleDOM.innerHTML : "",
        subtitleHTML = subtitleDOM ? subtitleDOM.innerHTML : "",
        captionHTML = captionDOM ? captionDOM.innerHTML : "",
        creditsHTML = creditsDOM ? creditsDOM.innerHTML : "",
        textHTML = textDOM ? textDOM.innerHTML : ""

    let titleText = titleDOM ? titleDOM.innerText : "",
        subtitleText = subtitleDOM ? subtitleDOM.innerText : "",
        captionText = captionDOM ? captionDOM.innerText : "",
        creditsText = creditsDOM ? creditsDOM.innerText : "",
        eleText = textDOM ? textDOM.innerText : ""

    captionHTML = replaceUnwantedtags(captionHTML)
    creditsHTML = replaceUnwantedtags(creditsHTML)
    subtitleHTML = replaceUnwantedtags(subtitleHTML)
    titleHTML = replaceUnwantedtags(titleHTML)
    textHTML = replaceUnwantedtags(textHTML)
    
    let data = {
        ...previousElementData,
        title :{
            ...indivisualData,
            text : titleText
        },
        subtitle : {
            ...indivisualData,
            text : subtitleText,
            footnotes : [ ]
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
            subtitle: matchHTMLwithRegex(subtitleHTML)?subtitleHTML:`<p>${subtitleHTML}</p>` ,
            title: matchHTMLwithRegex(titleHTML)?titleHTML:`<p>${titleHTML}</p>`,
            postertext: "",
            tableasHTML: "",
            text: textHTML.match(/<p>/g) ? textHTML:`<p>${textHTML}</p>`
        },
        inputType : elementTypes[elementType][primaryOption]['enum'],
        inputSubType : elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum']    
    }
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
    let assessmenttitle = document.querySelector(assessmentNodeSelector + '#single_assessment_title').innerText; //PCAT-6828 fixed
    let assessmentId = document.querySelector(assessmentNodeSelector + 'div.singleAssessmentIdInfo').innerText;
    let isPuf = previousElementData && previousElementData.figuredata && previousElementData.figuredata.elementdata && previousElementData.figuredata.elementdata.assessmentformat === "puf";
    let getAsid = '';

    if (isPuf) {
        assessmenttitle = assessmenttitle.split(':')[1];
    }

    let assessmenttTitleHTML = `<p>${assessmenttitle}</p>`;
    let dataToSend = {
        ...previousElementData,
        inputType: elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum'],
        html: {
            title: assessmenttTitleHTML
        }
    }

    dataToSend.figuredata.elementdata;
    if (isPuf) {
        getAsid = assessmentId && assessmentId.split(' ').length && assessmentId.split(' ')[2];
    } else {
        getAsid = assessmentId && assessmentId.split(' ').length && assessmentId.split(' ')[1];
    }
        let assessmentItemId = document.querySelector(assessmentNodeSelector + 'div.singleAssessmentItemIdInfo').innerText;
        let getAsItemid = assessmentItemId && assessmentItemId.split(' ')[2];
        dataToSend.figuredata.elementdata.assessmentitemid = getAsItemid ? getAsItemid : "";
    

    dataToSend.figuredata.elementdata.assessmentid = getAsid ? getAsid : "";
    // dataToSend.figuredata.id = getAsid ? getAsid : "";   //PCAT-6792 fixes
    // dataToSend.figuredata.elementdata.posterimage.imageid = getAsid ? getAsid : ""; //PCAT-6792 fixes

    /** [PCAT-7961] | case(1) - As no unique figuredata.id is present for the assessment,the  'figuredata.id' key is removed */
    if (previousElementData && previousElementData.figuredata && (previousElementData.figuredata.id || previousElementData.figuredata.id == "")) {
        delete previousElementData.figuredata.id;
    }
    /** [PCAT-7961] | case(2) - As no image is present for the assessment,the  'posterimage' key is removed */
    let isPosterImage = previousElementData && previousElementData.figuredata && previousElementData.figuredata.elementdata && previousElementData.figuredata.elementdata.posterimage                          
    if(isPosterImage){
         delete previousElementData.figuredata.elementdata.posterimage
    }


    let usageType = document.querySelector(assessmentNodeSelector + 'span.singleAssessment_Dropdown_currentLabel').innerText;
    dataToSend.figuredata.elementdata.usagetype = usageType;
    dataToSend.inputSubType = usageType && usageType.toUpperCase().replace(" ", "_").replace("-", "_");

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
export const generateAssessmentSlateData = (index, previousElementData, elementType, primaryOption, secondaryOption)=>{
    let dataToSend = {...previousElementData,
        inputType : elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum'],
        inputSubType : previousElementData.elementdata.usagetype.toUpperCase().replace(" ", "_").replace("-", "_"),
        html: {
            title: "<p></p>"
        }}
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
        slateUrn : parentElement.id,
        parentType : parentElement.type
    }
    return citationElementData
}

/**
 * Detects postertext/reveal answer section of ShowHide and check for empty content in it
 * @param {*} showHideType Section in ShowHide
 * @param {*} node HTML node containing content
 */
const validateRevealAnswerData = (showHideType, node, elementType) => {
    if(showHideType && showHideType === "postertextobject" && !(node.innerText.trim().length || node.innerHTML.match(/<img/))){
        return {
            innerHTML : "<p class=\"paragraphNumeroUno\">Reveal Answer:</p>",
            innerText : "Reveal Answer:"
        }
    } else if(showHideType && (showHideType === "show" || showHideType === "hide") && elementType === elementTypeConstant.AUTHORED_TEXT){
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
export const createUpdatedData = (type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext,parentElement,showHideType,asideData, poetryData) => {
    let dataToReturn = {}
    switch (type){
        case elementTypeConstant.AUTHORED_TEXT:
        case elementTypeConstant.LEARNING_OBJECTIVE_ITEM:
        case elementTypeConstant.BLOCKFEATURE:
        case elementTypeConstant.ELEMENT_LIST:
        case elementTypeConstant.POETRY_STANZA:
            tinyMCE.$(node).find('.blockquote-hidden').remove();
            let innerHTML, innerText;
            let revealTextData = validateRevealAnswerData(showHideType, node, type)
            innerHTML = revealTextData.innerHTML
            innerText = revealTextData.innerText
            dataToReturn = {
                ...previousElementData,
                elementdata : {
                    text : innerText
                },
                html : {
                    text : innerHTML,
                    footnotes : previousElementData.html.footnotes || {},
                    glossaryentries : previousElementData.html.glossaryentries || {},
                },
                inputType : parentElement && (parentElement.type === "popup" || parentElement.type === "citations" || parentElement.type === "showhide" && previousElementData.type === "element-authoredtext" || parentElement.type === "poetry" && previousElementData.type === "element-authoredtext") ? "AUTHORED_TEXT" : elementTypes[elementType][primaryOption]['enum'],
                inputSubType : parentElement && (parentElement.type == "popup" || parentElement.type === "poetry") ? "NA" : elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum'],
                slateUrn: parentElement && (parentElement.type === "showhide" || parentElement.type === "popup") ? parentElement.id: config.slateManifestURN  
            }

            if(type==="stanza"){
                dataToReturn.html.text=`<p>${innerHTML}</p>`
                delete dataToReturn.poetrylines;
            } 
            if(parentElement && parentElement.type === "popup"){
                dataToReturn.elementParentEntityUrn = parentElement.contentUrn;
                if(parentElement.popupdata["formatted-title"] && parentElement.popupdata["formatted-title"]["id"] === previousElementData.id){
                    dataToReturn.metaDataField = "formattedTitle";
                } 
                else if(parentElement.popupdata["formatted-subtitle"] && parentElement.popupdata["formatted-subtitle"]["id"] === previousElementData.id){
                    dataToReturn.metaDataField = "formattedSubtitle";
                }
                else if(parentElement.popupdata["postertextobject"][0]["id"] === previousElementData.id){
                    dataToReturn.section = "postertextobject";
                }
            } else if(parentElement && parentElement.type === "poetry"){
                // dataToReturn.poetryEntityUrn = parentElement.contentUrn;
                if(parentElement.contents && parentElement.contents["formatted-title"] && parentElement.contents["formatted-title"]["id"] === previousElementData.id){
                    dataToReturn["metaDataField"] = "formattedTitle";
                } 
                /* else if(parentElement.contents && parentElement.contents["formatted-subtitle"] && parentElement.contents["formatted-subtitle"]["id"] === previousElementData.id){
                    dataToReturn["metaDataField"] = "formattedSubtitle";
                } */
                // else if(parentElement.contents && parentElement.contents["formatted-caption"] && parentElement.contents["formatted-caption"]["id"] === previousElementData.id){
                //     dataToReturn.updatepoetryField = "formattedCaption";
                // }
                else if(parentElement.contents && parentElement.contents["creditsarray"] && parentElement.contents["creditsarray"].length && parentElement.contents["creditsarray"][0]["id"] === previousElementData.id){
                    dataToReturn["section"] = "creditsarray";
                }
                dataToReturn["elementParentEntityUrn"] = parentElement.contentUrn
                
            } else if(parentElement && parentElement.type === "citations") {
                dataToReturn["metaDataField"] = "formattedTitle"
                dataToReturn["elementParentEntityUrn"] = parentElement.contentUrn
            } else if(parentElement && parentElement.type === "showhide" && showHideType){
                dataToReturn.section = showHideType;
            }
            break;

        case elementTypeConstant.FIGURE:
                switch (previousElementData.figuretype) {
                    case elementTypeConstant.FIGURE_IMAGE:
                    case elementTypeConstant.FIGURE_MATH_IMAGE:
                    case elementTypeConstant.FIGURE_TABLE:
                    case elementTypeConstant.FIGURE_TABLE_EDITOR:
                        dataToReturn = generateCommonFigureData(index, previousElementData, elementType, primaryOption, secondaryOption)
                        break;
                    case elementTypeConstant.FIGURE_VIDEO:
                    case elementTypeConstant.FIGURE_AUDIO:
                     //   console.log("Figure VIDEO new data::>>", node.innerHTML)
                        dataToReturn = generateCommonFigureData(index, previousElementData, elementType, primaryOption, secondaryOption)
                        break;
                    case elementTypeConstant.FIGURE_ASSESSMENT:
                        dataToReturn = generateAssessmentData(index, previousElementData, elementType, primaryOption, secondaryOption)
                        break;
                    case elementTypeConstant.INTERACTIVE:
                      //  console.log("Figure ASSESSMENT new data::>>", node.innerHTML)
                        dataToReturn = generateCommonFigureDataInteractive(index, previousElementData, elementType, primaryOption, secondaryOption)
                        break;
                    case  elementTypeConstant.FIGURE_CODELISTING:
                        dataToReturn = generateCommonFigureDataBlockCode(index, previousElementData, elementType, primaryOption, secondaryOption)
                        break;
                    case elementTypeConstant.FIGURE_AUTHORED_TEXT:
                        dataToReturn = generateCommonFigureDataAT(index, previousElementData, elementType, primaryOption, secondaryOption)
                        break;
                }
                
                break;
            
        case elementTypeConstant.ELEMENT_ASIDE:
            dataToReturn = { 
                ...previousElementData,
                inputType : elementTypes[elementType][primaryOption]['enum'],
                inputSubType : elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum']
            }
                // switch (previousElementData.subtype) {
                //     case elementTypeConstant.ELEMENT_WORKEDEXAMPLE:
                //     default:
                //         dataToReturn = { 
                //             ...previousElementData,
                //             inputType : elementTypes[elementType][primaryOption]['enum'],
                //             inputSubType : elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum']
                //     }
                // }
            break;
        
        case elementTypeConstant.ASSESSMENT_SLATE:
            dataToReturn = generateAssessmentSlateData(index, previousElementData, elementType, primaryOption, secondaryOption)
            break;
        case elementTypeConstant.CITATION_ELEMENT:
            dataToReturn = generateCitationElementData(index, previousElementData, elementType, primaryOption, secondaryOption, node, parentElement)
            break;
    }
    dataToReturn.slateUrn = config.slateManifestURN;
    if (previousElementData.status == "approved") {
        let parentData = store.getState().appStore.slateLevelData;
        if (config.isPopupSlate && parentData[config.slateManifestURN].status === "approved") {
            dataToReturn.parentEntityId = config.slateEntityURN;
        } else if (asideData && asideData.contentUrn) {
            dataToReturn.parentEntityId = asideData.contentUrn;
        } else if (parentElement && parentElement.type === "showhide" && showHideType && parentElement.contentUrn) {
            dataToReturn.parentEntityId = parentElement.contentUrn;
        } else if (poetryData && poetryData.contentUrn) {
            dataToReturn.parentEntityId = poetryData.contentUrn;
        } 
    }
    dataToReturn = { ...dataToReturn, index: index.toString().split('-')[index.toString().split('-').length - 1] }
    return dataToReturn
}

export const createOpenerElementData = (elementData, elementType, primaryOption, secondaryOption) => {
    let dataToReturn = {};
    if(elementData) {
        dataToReturn = {
            ...elementData,
            inputType: elementTypes[elementType][primaryOption]['enum'],
            inputSubType: elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum'],
            slateUrn: config.slateManifestURN 
        }
    }

    return dataToReturn;
}