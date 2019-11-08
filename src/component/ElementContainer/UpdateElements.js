import elementTypeConstant from './ElementConstants'
import elementTypes from './../Sidebar/elementTypes';

let indivisualData = {
    schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
    textsemantics: [ ],
    mathml: [ ]
}

export const generateCommonFigureData = (index, previousElementData, elementType, primaryOption, secondaryOption) => {
    let titleHTML = document.getElementById(`cypress-${index}-0`).innerHTML,
        subtitleHTML = document.getElementById(`cypress-${index}-1`).innerHTML,
        captionHTML = document.getElementById(`cypress-${index}-2`).innerHTML,
        creditsHTML = document.getElementById(`cypress-${index}-3`).innerHTML

        console.log("FIGURE DATA UPDATED TITLE:",titleHTML, "SUBTITLE:", subtitleHTML, "CAPTION:", captionHTML, "CREDITS:", creditsHTML)

    
    let data = {
        ...previousElementData,
        title :{
            ...indivisualData,
            text : document.getElementById(`cypress-${index}-0`).innerText
        },
        subtitle : {
            ...indivisualData,
            text : document.getElementById(`cypress-${index}-1`).innerText,
            footnotes : [ ]
        },
        captions : {
            ...indivisualData,
            text : document.getElementById(`cypress-${index}-2`).innerText,
            footnotes : [ ]
        },
        credits : {
            ...indivisualData,
            text : document.getElementById(`cypress-${index}-3`).innerText,
            footnotes : [ ]
        },
        html : {
            captions: `<p>${captionHTML}</p>`,
            credits: `<p>${creditsHTML}</p>`,
            footnotes: {},
            glossaryentries: {},
            subtitle: `<p>${subtitleHTML}</p>` ,
            title: `<p>${titleHTML}</p>`,
            postertext: "",
            tableasHTML: "",
            text: ""
        },
        inputType : elementTypes[elementType][primaryOption]['enum'],
        inputSubType : elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum']    
    }
    return data
}

export const generateCommonFigureDataInteractive = (index, previousElementData, elementType, primaryOption, secondaryOption) => {
    let titleHTML = document.getElementById(`cypress-${index}-0`).innerHTML,
        subtitleHTML = document.getElementById(`cypress-${index}-1`).innerHTML,
        captionHTML = document.getElementById(`cypress-${index}-3`).innerHTML,
        creditsHTML = document.getElementById(`cypress-${index}-4`).innerHTML

        console.log("FIGURE DATA UPDATED TITLE:",titleHTML, "SUBTITLE:", subtitleHTML, "CAPTION:", captionHTML, "CREDITS:", creditsHTML)

    let data = {
        ...previousElementData,
        title :{
            ...indivisualData,
            text : document.getElementById(`cypress-${index}-0`).innerText        
        },
        subtitle : {
            ...indivisualData,
            text : document.getElementById(`cypress-${index}-1`).innerText,
            footnotes : [ ]
        },
        captions : {
            ...indivisualData,
            text : document.getElementById(`cypress-${index}-3`).innerText,
            footnotes : [ ]
        },
        credits : {
            ...indivisualData,
            text : document.getElementById(`cypress-${index}-4`).innerText,
            footnotes : [ ]
        },
        html : {
            captions: `<p>${captionHTML}</p>`,
            credits: `<p>${creditsHTML}</p>`,
            footnotes: {},
            glossaryentries: {},
            subtitle: `<p>${subtitleHTML}</p>` ,
            title: `<p>${titleHTML}</p>`,
            postertext: "",
            tableasHTML: "",
            text: "",
        },
        inputType : elementTypes[elementType][primaryOption]['enum'],
        inputSubType : elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum']    
    }
    return data
}

const generateCommonFigureDataBlockCode = (index, previousElementData, elementType, primaryOption, secondaryOption) => {
    let titleHTML = document.getElementById(`cypress-${index}-0`).innerHTML,
        subtitleHTML = document.getElementById(`cypress-${index}-1`).innerHTML,
        preformattedText = document.getElementById(`cypress-${index}-2`).innerHTML,
        captionHTML = document.getElementById(`cypress-${index}-3`).innerHTML,
        creditsHTML = document.getElementById(`cypress-${index}-4`).innerHTML
        
        console.log("FIGURE DATA UPDATED TITLE BLOCKCODE:",titleHTML, "SUBTITLE:", subtitleHTML, "CAPTION:", captionHTML, "CREDITS:", creditsHTML, "preformattedText HTML", preformattedText)

    let data = {
        ...previousElementData,
        title :{
            ...indivisualData,
            text : document.getElementById(`cypress-${index}-0`).innerText
        },
        subtitle : {
            ...indivisualData,
            text : document.getElementById(`cypress-${index}-1`).innerText,
            footnotes : [ ]
        },
        captions : {
            ...indivisualData,
            text : document.getElementById(`cypress-${index}-3`).innerText,
            footnotes : [ ]
        },
        credits : {
            ...indivisualData,
            text : document.getElementById(`cypress-${index}-4`).innerText,
            footnotes : [ ]
        },
        html : {
            captions: `<p>${captionHTML}</p>`,
            credits: `<p>${creditsHTML}</p>`,
            footnotes: {},
            glossaryentries: {},
            subtitle: `<p>${subtitleHTML}</p>` ,
            title: `<p>${titleHTML}</p>`,
            postertext: "",
            tableasHTML: "",
            text: "",
        }, 
        figuredata:{
            schema : "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
            type: previousElementData.figuretype,
            numbered: true,
            startNumber: "1",
            programlanguage: previousElementData.figuredata.programlanguage,
            preformattedtext: [
            ""
            ]
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
    let titleHTML = document.getElementById(`cypress-${index}-0`).innerHTML,
        subtitleHTML = document.getElementById(`cypress-${index}-1`).innerHTML,
        captionHTML = document.getElementById(`cypress-${index}-3`).innerHTML,
        creditsHTML = document.getElementById(`cypress-${index}-4`).innerHTML

        console.log("FIGURE DATA UPDATED TITLE:",titleHTML, "SUBTITLE:", subtitleHTML, "CAPTION:", captionHTML, "CREDITS:", creditsHTML)
    
    let data = {
        ...previousElementData,
        title :{
            ...indivisualData,
            text : document.getElementById(`cypress-${index}-0`).innerText
        },
        subtitle : {
            ...indivisualData,
            text : document.getElementById(`cypress-${index}-1`).innerText,
            footnotes : [ ]
        },
        captions : {
            ...indivisualData,
            text : document.getElementById(`cypress-${index}-3`).innerText,
            footnotes : [ ]
        },
        credits : {
            ...indivisualData,
            text : document.getElementById(`cypress-${index}-4`).innerText,
            footnotes : [ ]
        },
        figuredata : {
            type: "element-authoredtext",
            schema: "http://schemas.pearson.com/wip-authoring/element/1",
            elementdata: {
                schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                text: document.getElementById(`cypress-${index}-2`).innerText,
                textsemantics: [],
                mathml: []
            }
        },
        html : {
            captions: `<p>${captionHTML}</p>`,
            credits: `<p>${creditsHTML}</p>`,
            footnotes: {},
            glossaryentries: {},
            subtitle: `<p>${subtitleHTML}</p>` ,
            title: `<p>${titleHTML}</p>`,
            postertext: "",
            tableasHTML: "",
            text: document.getElementById(`cypress-${index}-2`).innerHTML,
        },
        inputType : elementTypes[elementType][primaryOption]['enum'],
        inputSubType : elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum']    
    }
    return data
}

export const createUpdatedData = (type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext) => {
    let dataToReturn = {}
    switch (type){
        case elementTypeConstant.AUTHORED_TEXT:
        case elementTypeConstant.BLOCKFEATURE:

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
                inputSubType : elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum']          
            }
            break;

        case elementTypeConstant.FIGURE:
                switch (previousElementData.figuretype) {
                    
                    case elementTypeConstant.FIGURE_IMAGE:
                    case elementTypeConstant.FIGURE_MATH_IMAGE:
                    case elementTypeConstant.FIGURE_TABLE:
                        dataToReturn = generateCommonFigureData(index, previousElementData, elementType, primaryOption, secondaryOption)
                        break;
                    case elementTypeConstant.FIGURE_VIDEO:
                        console.log("Figure VIDEO new data::>>", node.innerHTML)
                        dataToReturn = generateCommonFigureData(index, previousElementData, elementType, primaryOption, secondaryOption)
                        break;
                    case elementTypeConstant.FIGURE_ASSESSMENT:
                        console.log("Figure ASSESSMENT new data::>>", node.innerHTML)
                        dataToReturn = generateCommonFigureData(index, previousElementData, elementType, primaryOption, secondaryOption)
                        break;
                    case elementTypeConstant.INTERACTIVE:
                        console.log("Figure ASSESSMENT new data::>>", node.innerHTML)
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
                switch (previousElementData.subtype) {
                    case elementTypeConstant.ELEMENT_WORKEDEXAMPLE:
                            console.log("Worked example new data::>>", node.innerHTML)
                    default:
                        dataToReturn = { 
                            ...previousElementData,
                            inputType : elementTypes[elementType][primaryOption]['enum'],
                            inputSubType : elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum']
                    }
                }
            break;
    }
    return dataToReturn
}
