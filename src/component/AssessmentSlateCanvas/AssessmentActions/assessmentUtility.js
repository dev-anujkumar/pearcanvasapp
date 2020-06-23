/**
 * Module - assessmentUtility
 * Description - This file contains utility functions related to assessments (full and embedded)
 */

/**************************Import Modules**************************/
import React from 'react';
import store from '../../../appstore/store';
import config from '../../../config/config';
import { hasReviewerRole } from '../../../constants/utility.js';


/** This is a function to set Assessment Title for Embedded Assessment
 * * @param model - object containig element data
*/
export const setAssessmentTitle = (model) => {
    let assessmentTitle = null;
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
    let usagetype = "Quiz";
    if (model && model.type && model.type === "element-assessment" && model.elementdata && model.elementdata.usagetype) {
        usagetype = model.elementdata.usagetype
    } else if (model && model.figuretype && model.figuretype === "assessment" && model.figuredata && model.figuredata.elementdata && model.figuredata.elementdata.usagetype) {
        usagetype = model.figuredata.elementdata.usagetype
    }
    return usagetype;
}


/*** @description - This function is to set UsageType Dropdown JSX for Embedded & Full Assessment
* @param clickHandlerFn - Function to be called during Click Eventsss 
*/
export const setUsageTypeDropdown = (clickHandlerFn) => {
    const { usageTypeList } = store.getState().appStore.usageTypeListData
    const { slateType } = config;
    let listClass = slateType === "assessment" ? "slate_assessment_metadata_dropdown_name" : "singleAssessment_Dropdown_item";

    let assessmentType = usageTypeList.map((usageType, i) =>
        <li key={i} className={listClass} onClick={(e) => !hasReviewerRole() && clickHandlerFn(usageType, e)}>{usageType}</li>
    )
    return assessmentType
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