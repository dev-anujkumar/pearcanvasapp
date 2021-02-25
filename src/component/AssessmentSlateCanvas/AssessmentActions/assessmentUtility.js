/**
 * Module - assessmentUtility
 * Description - This file contains utility functions related to assessments (full and embedded)
 */
import { LEARNING_TEMPLATE, PUF, ELEMENT_FIGURE, FIGURE_ASSESSMENT, ELEMENT_ASSESSMENT, LEARNOSITY, ELM_INT, FIGURE_INTERACTIVE } from '../AssessmentSlateConstants.js';
/** This is a function to set Assessment Title for Embedded Assessment
 * * @param model - object containig element data
*/
export const setAssessmentTitle = (model) => {
    let assessmentTitle = '';
    if (model && model.html && model.html.title) {
        assessmentTitle = model.html.title
    } else if (model && model.title && model.title.text) {
        assessmentTitle = model.title.text
    }
    return assessmentTitle;
}

/** This is a function to set Assessment UsageType for Embedded & Full Assessment
 * * @param model - object containig element data
*/
export const setAssessmentUsageType = (model) => {
    let usagetype = "";
    if (model && model.type && model.type === ELEMENT_ASSESSMENT && model.elementdata && model.elementdata.usagetype) {
        usagetype = model.elementdata.usagetype
    } else if (model && model.figuretype && model.figuretype === FIGURE_ASSESSMENT && model.figuredata && model.figuredata.elementdata && model.figuredata.elementdata.usagetype) {
        usagetype = model.figuredata.elementdata.usagetype
    }
    return usagetype;
}

/***
* @description - This is the function to set Attributes baesd on assessment-format for Embedded Assessment
* @param elementType - assessment-format
*/
export const setAssessmentProperties = (elementType) => {
    let assessmentClasses = { divMainClass: '', divInnerClass: '' }
    switch (elementType) {
        case 'puf':
            assessmentClasses.divMainClass = 'divPUFItem';
            assessmentClasses.assessmentItemType = 'pufItem';
            break;
        case 'learnosity':
            assessmentClasses.divMainClass = 'divLearnosityItem';
            assessmentClasses.assessmentItemType = 'learnosityItem'
            break;
        case 'tdx':
            assessmentClasses.divMainClass = 'divTdxAssessmentItem';
            assessmentClasses.assessmentItemType = 'tdxAssessmentItem';
            break;
        case 'cite':
        default:
            assessmentClasses.divMainClass = 'divAssessmentItem'
            assessmentClasses.assessmentItemType = 'assessmentItem'
            break;
    }
    return assessmentClasses
}

/***
* @description - This is the function to set assessment-format for Full Assessment
* @param model - element's details
*/
export const setAssessmentFormat = (model) => {
    let format = '';
    if ('elementdata' in model && 'assessmentformat' in model.elementdata && model.elementdata.assessmentformat !== 'fpo') {
        format = model.elementdata.assessmentformat;
    }
    return format;
}

/***
* @description - This is the function to set current assessment-object for Full Assessment
* @param model - element's details
*/
export const setAssessmentElement = (model) => {
    let assessmentSlateObj = {};
    if (model && model.elementdata) {
        const { assessmentid, assessmentitemid, assessmenttitle, templatelabel, templateid, assessmentformat } = model.elementdata
        let isLearningToolAssessment = assessmentformat == LEARNING_TEMPLATE ? true : false;
        assessmentSlateObj = {
            title: isLearningToolAssessment && templatelabel ? templatelabel : assessmenttitle ? assessmenttitle : "",
            itemId: assessmentitemid ? assessmentitemid : "",
            assessmentId: isLearningToolAssessment && templateid ? templateid : assessmentid ? assessmentid : ""
        }
    }
    return assessmentSlateObj;
}

/***
* @description - This is the function to check if an assessment exists in Assessment Slate
* @param model - element's details
*/
export const hasAssessmentID = (model) => {
    let hasId;
    hasId = model && model.elementdata && model.elementdata.assessmentid ? true : false
    return hasId;
}

/***
* @description - This is the function to check if a full assessment is elm assessment
* @param element - element's details
*/
export const checkFullElmAssessment = (element) => {
    if (element && element.type == ELEMENT_ASSESSMENT && element.elementdata && isElmLearnosityAssessment(element.elementdata) && element.elementdata.assessmentid) {
        return true;
    }
    return false;
}

/***
* @description - This is the function to check if an embedded assessment is elm assessment
* @param element - element's details
*/
export const checkEmbeddedElmAssessment = (element, assessReducer) => {
    if (element && element.type == ELEMENT_FIGURE && element.figuretype == FIGURE_ASSESSMENT && element.figuredata && element.figuredata.elementdata && isElmLearnosityAssessment(element.figuredata.elementdata) && element.figuredata.elementdata.assessmentid) {
        const id = element.figuredata.elementdata.assessmentid;
        const status = assessReducer?.hasOwnProperty(id) ?
                    assessReducer[id].showUpdateStatus : false;    
        return !status;
    }
    return false;
}

/***
* @description - This is the function to check if an interactive is elm interactive
* @param element - element's details
*/
export const checkInteractive = (element) => {
    if (element?.type === ELEMENT_FIGURE && element.figuretype === FIGURE_INTERACTIVE &&
         element.figuredata?.interactiveformat === ELM_INT && element.figuredata?.interactiveid) {
        return true;
    }
    return false;
}

/*** @description - This is the function to check if an elm embedded assessment has update available */
export const checkElmAssessmentStatus = (assessmentId, props) => {
    if (assessmentId && props && props.assessmentReducer && props.assessmentReducer[assessmentId] && props.assessmentReducer[assessmentId].showUpdateStatus == true) {
        return true;
    }
    return false;
}

/** This is a function to set Assessment Item Title for Embedded Assessment
 * * @param model - object containig element data
*/
export const setAssessmentItemTitle = (model) => {
    let itemTitle = "";
    if (model && model.figuredata && model.figuredata.elementdata && model.figuredata.elementdata.assessmentitemtitle) {
        itemTitle = model.figuredata.elementdata.assessmentitemtitle
    }
    return itemTitle;
}

/** This is a function to set Assessment Item Title for Embedded Assessment
 * * @param model - object containig element data
*/
export const getAssessmentTitle = (model) => {
    let title = "";
    if (model && model.figuredata && model.figuredata.elementdata && model.figuredata.elementdata.assessmenttitle) {
        title = model.figuredata.elementdata.assessmenttitle
    }else {
        title = setAssessmentTitle(model)
    }
    return title;
}

/** This is a function to check if an assessment is of Elm/Learnosity type*/
export const isElmLearnosityAssessment = (elementdata) => {
    if (elementdata && (elementdata.assessmentformat == PUF || elementdata.assessmentformat == LEARNOSITY)) {
        return true;
    }
    return false;
}