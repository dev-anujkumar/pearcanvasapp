import elementTypeConstant from './ElementConstants'
import elementTypes from './../Sidebar/elementTypes';
import config from '../../config/config';

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
            captions: captionHTML.match(/(<p.*?>.*?<\/p>)/g)?captionHTML:`<p>${captionHTML}</p>`,
            credits: creditsHTML.match(/(<p.*?>.*?<\/p>)/g)?creditsHTML:`<p>${creditsHTML}</p>`,
            footnotes : previousElementData.html.footnotes || {},
            glossaryentries : previousElementData.html.glossaryentries || {},
            subtitle: subtitleHTML.match(/(<p.*?>.*?<\/p>)/g)?subtitleHTML:`<p>${subtitleHTML}</p>`,
            title: titleHTML.match(/(<p.*?>.*?<\/p>)/g)?titleHTML:`<p>${titleHTML}</p>`,
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
            captions: captionHTML.match(/(<p.*?>.*?<\/p>)/g)?captionHTML:`<p>${captionHTML}</p>`,
            credits: creditsHTML.match(/(<p.*?>.*?<\/p>)/g)?creditsHTML:`<p>${creditsHTML}</p>`,
            subtitle: subtitleHTML.match(/(<p.*?>.*?<\/p>)/g)?subtitleHTML:`<p>${subtitleHTML}</p>`,
            title: titleHTML.match(/(<p.*?>.*?<\/p>)/g)?titleHTML:`<p>${titleHTML}</p>`,
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
        data.html.postertext = posterTextHTML
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
        preformattedText = document.getElementById(`cypress-${index}-2`).innerText,
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
            captions: captionHTML.match(/(<p.*?>.*?<\/p>)/g)?captionHTML:`<p>${captionHTML}</p>`,
            credits: creditsHTML.match(/(<p.*?>.*?<\/p>)/g)?creditsHTML:`<p>${creditsHTML}</p>`,
            footnotes : previousElementData.html.footnotes || {},
            glossaryentries : previousElementData.html.glossaryentries || {},
            subtitle: subtitleHTML.match(/(<p.*?>.*?<\/p>)/g)?subtitleHTML:`<p>${subtitleHTML}</p>` ,
            title: titleHTML.match(/(<p.*?>.*?<\/p>)/g)?titleHTML:`<p>${titleHTML}</p>`,
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
            captions: captionHTML.match(/(<p.*?>.*?<\/p>)/g)?captionHTML:`<p>${captionHTML}</p>`,
            credits: creditsHTML.match(/(<p.*?>.*?<\/p>)/g)?creditsHTML:`<p>${creditsHTML}</p>`,
            footnotes : previousElementData.html.footnotes || {},
            glossaryentries : previousElementData.html.glossaryentries || {},
            subtitle: subtitleHTML.match(/(<p.*?>.*?<\/p>)/g)?subtitleHTML:`<p>${subtitleHTML}</p>` ,
            title: titleHTML.match(/(<p.*?>.*?<\/p>)/g)?titleHTML:`<p>${titleHTML}</p>`,
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
export const generateAssessmentData = (index, previousElementData, elementType, primaryOption, secondaryOption)=>{
    let assessmentNodeSelector =`div[data-id='${previousElementData.id}'] figure.figureAssessment `;
    let assessmenttitle = document.getElementById('single_assessment_title').innerText;
     
    let dataToSend = {...previousElementData,
        inputType : elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum'],
        html: {
            title: assessmenttitle
        }}
        
    dataToSend.figuredata.elementdata;
  
    let assessmentId = document.querySelector(assessmentNodeSelector+'div.singleAssessmentIdInfo').innerText;
    dataToSend.figuredata.elementdata.assessmentid=assessmentId.split(' ')[1];

    let assessmentItemId = document.querySelector(assessmentNodeSelector+'div.singleAssessmentItemIdInfo').innerText;
    dataToSend.figuredata.elementdata.assessmentitemid=assessmentItemId.split(' ')[2];

    let usageType = document.querySelector(assessmentNodeSelector+'span.singleAssessment_Dropdown_currentLabel').innerText;
    dataToSend.figuredata.elementdata.usagetype = usageType;
    dataToSend.inputSubType = usageType.toUpperCase().replace(" ", "_").replace("-", "_");

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
export const createUpdatedData = (type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext,parentElement) => {
    let dataToReturn = {}
    switch (type){
        case elementTypeConstant.AUTHORED_TEXT:
        case elementTypeConstant.LEARNING_OBJECTIVE_ITEM:
        case elementTypeConstant.BLOCKFEATURE:
        case elementTypeConstant.ELEMENT_LIST:
            let { innerHTML, innerText } = node;
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
                inputType : elementTypes[elementType][primaryOption]['enum'],
                inputSubType : elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum'],
                slateUrn: parentElement.type == "showhide" ? parentElement.id: config.slateManifestURN      
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
    }
    dataToReturn.slateUrn = config.slateManifestURN;
    dataToReturn = { ...dataToReturn, index: index.toString().split('-')[index.toString().split('-').length - 1] }
    return dataToReturn
}

export const createOpenerElementData = (elementData, elementType, primaryOption, secondaryOption) => {
    let dataToReturn = {};
    if(elementData) {
        dataToReturn = {
            ...elementData,
            inputType: elementTypes[elementType][primaryOption]['enum'],
            inputSubType: elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum']
        }
    }

    return dataToReturn;
}
