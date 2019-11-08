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

export const generateAssessmentData = (index, previousElementData, elementType, primaryOption, secondaryOption)=>{
    let dataToSend = {...previousElementData,
        inputType : elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum']}
    dataToSend.figuredata.elementdata;
    let assessmentNodeSelector =`div[data-id='${previousElementData.id}'] figure.figureAssessment `;

    let assessmentId = document.querySelector(assessmentNodeSelector+'div.singleAssessmentIdInfo').innerText;
    dataToSend.figuredata.elementdata.assessmentid=assessmentId.split(' ')[1];

    let assessmentItemId = document.querySelector(assessmentNodeSelector+'div.singleAssessmentItemIdInfo').innerText;
    dataToSend.figuredata.elementdata.assessmentitemid=assessmentItemId.split(' ')[2];

    let usageType = document.querySelector(assessmentNodeSelector+'span.singleAssessment_Dropdown_currentLabel').innerText;
    dataToSend.figuredata.elementdata.usagetype = usageType;
    dataToSend.inputSubType = usageType.toUpperCase();

    return dataToSend;
}

export const generateAssessmentSlateData = (index, previousElementData, elementType, primaryOption, secondaryOption)=>{
    let dataToSend = {...previousElementData,
        inputType : elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum'],
        inputSubType : previousElementData.elementdata.usagetype.toUpperCase()}

        return dataToSend;
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
                        dataToReturn = generateAssessmentData(index, previousElementData, elementType, primaryOption, secondaryOption)
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
        
        case elementTypeConstant.ASSESSMENT_SLATE:
            dataToReturn = generateAssessmentSlateData(index, previousElementData, elementType, primaryOption, secondaryOption)
            break;
    }
    return dataToReturn
}
