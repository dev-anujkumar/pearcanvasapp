import elementTypeConstant from './ElementConstants'
import elementTypes from './../Sidebar/elementTypes';
/**
 * 
 */

export const generateCommonFigureData = (index, previousElementData, elementType, primaryOption, secondaryOption) => {
    let titleHTML = document.getElementById(`cypress-${index}-0`).innerHTML,
        subtitleHTML = document.getElementById(`cypress-${index}-1`).innerHTML,
        captionHTML = document.getElementById(`cypress-${index}-2`).innerHTML,
        creditsHTML = document.getElementById(`cypress-${index}-3`).innerHTML

        console.log("FIGURE DATA UPDATED TITLE:",titleHTML, "SUBTITLE:", subtitleHTML, "CAPTION:", captionHTML, "CREDITS:", creditsHTML)

    let data = {
        ...previousElementData,
        html : {
            captions: `<p>${captionHTML}</p>`,
            credits: `<p>${creditsHTML}</p>`,
            footnotes: {},
            glossaryentries: {},
            subtitle: `<p>${subtitleHTML}</p>` ,
            title: `<p>${titleHTML}</p>`,
            postertext: "",
            // tableasHTML: "",
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

export const createUpdatedData = (type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext) => {
    let dataToReturn = {}
    switch (type){
        case elementTypeConstant.AUTHORED_TEXT:
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
