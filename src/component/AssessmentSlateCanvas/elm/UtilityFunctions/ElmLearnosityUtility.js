/**
 * Description - This file contains utility functions for ELM/Learnosity Component
 */

// IMPORT - Module dependencies
import config from '../../../../config/config';
import { PUF, LEARNOSITY_BETA, LEARNOSITY, FolderLabelList } from '../../AssessmentSlateConstants.js';
let preparedData = []

/*** @description - This function is to set the folder name in folder-icon based on type of container
     * @param label- label of container
    */
export const getFolderLabel = label => {
    let containerLabel = 'NA'
    for (let key in FolderLabelList) {
        if (FolderLabelList[key][0] === label || FolderLabelList[key][1] === label) {
            containerLabel = key
        }
    }
    return containerLabel
    switch (label) {
        case 'chapter': return 'C'
        case 'module': return 'M'
        case 'part': return 'P'
        case 'section': return 'S'
        case 'assessment': return 'AS'
        case 'container-introduction': return 'IS';
        case 'introductry-slate': return 'IS';
        default: return 'NA'
    }
}

/*** @description - This function is to set the ParentUrn at which the elm table popup opens up
    * @param elmData- ELM resouces API data
    * @param currentSlate- details of ancestors of current slat
   */
export const setParentUrn = (elmData, currentSlate) => {
    let parent1 = {
        urn: "",
        type: ""
    }
    if (config.parentLabel == "frontmatter" || config.parentLabel == "backmatter") {
        parent1.urn = config.projectUrn
    } else if (currentSlate && currentSlate.containerUrn && elmData.includes(currentSlate.containerUrn)) {
        parent1.urn = currentSlate.containerUrn
    } else if (currentSlate && currentSlate.ancestor && elmData.includes(currentSlate.ancestor.containerUrn)) {
        parent1.urn = currentSlate.ancestor.containerUrn
    } else if (currentSlate && currentSlate.ancestor && currentSlate.ancestor.ancestor && elmData.includes(currentSlate.ancestor.ancestor.containerUrn)) {
        parent1.urn = currentSlate.ancestor.ancestor.containerUrn
    } else if (currentSlate && currentSlate.ancestor && currentSlate.ancestor.ancestor && currentSlate.ancestor.ancestor.ancestor && elmData.includes(currentSlate.ancestor.ancestor.ancestor.containerUrn)) {
        parent1.urn = currentSlate.ancestor.ancestor.ancestor.containerUrn
    } else if (currentSlate && currentSlate.ancestor && currentSlate.ancestor.ancestor && currentSlate.ancestor.ancestor.ancestor && currentSlate.ancestor.ancestor.ancestor.ancestor && elmData.includes(currentSlate.ancestor.ancestor.ancestor.ancestor.containerUrn)) {
        parent1.urn = currentSlate.ancestor.ancestor.ancestor.ancestor.containerUrn
    } else {
        parent1.urn = config.projectUrn
    }
    return parent1.urn
}

export const setStatus = (condition, assessmentFormat, propsValue, stateValue) => {
    let status = false;
    switch (condition) {
        case 'setSearchButtonStatus':
            if (assessmentFormat == PUF) {
                status = true;
            } else if (assessmentFormat == LEARNOSITY_BETA) {
                if (stateValue.openItemTable == true || (stateValue.openItemTable == false && propsValue.openSearch == true)) {
                    status = true;
                }
            }
            break;
        case 'setErrorStatus':
            if ((!propsValue.itemErrorFlag && propsValue.itemApiStatus != 200 && stateValue.openItemTable == true && propsValue.isLoading == false && tableValue.length) || ((assessmentFormat == LEARNOSITY_BETA) && (stateValue.openItemTable == false) && propsValue.openSearch && (!propsValue.setSearchBlock)) || (propsValue.setSearchBlock && !stateValue.tableValue.length)) {
                status = true;
            }
            break;
        case 'setNavigationBarStatus':
            if (((assessmentFormat == PUF) || (assessmentFormat == LEARNOSITY_BETA && !propsValue.openSearch))) {
                status = true;
            }
            break;
        case 'setBlankSearchStatus':
            if (((assessmentFormat == LEARNOSITY_BETA) && (stateValue.openItemTable == false) && propsValue.openSearch)) {
                status = true;
            }
            break;
        case 'setTableStatus':
            if (((stateValue.openItemTable == true && propsValue.isLoading == false) || (stateValue.openItemTable == false)) || ((assessmentFormat == LEARNOSITY_BETA) && (stateValue.openItemTable == false) && propsValue.openSearch && stateValue.tableValue.length)) {
                status = true;
            }
            break;
        case 'setSearchBarStatus':
            if ((assessmentFormat == LEARNOSITY_BETA) && (stateValue.openItemTable == false) && propsValue.openSearch) {
                status = true;
            }
            break;
    }
    return status;
}

export const searchAndFilterAssessmentData = (assessmentType, searchAssessmentTitle, apiData) => {
    let tableData = []
    preparedData = []
    if (assessmentType === LEARNOSITY_BETA || assessmentType === LEARNOSITY) {
        if (searchAssessmentTitle.trim() != "") {
            tableData = filterAssessmentsFromApiData(apiData, "", searchAssessmentTitle)
        } else {
            tableData = []
        }
    }

    return tableData
}

const filterAssessmentsFromApiData = (data, parentUrn, searchAssessmentTitle) => {
    let title = "";
    if (data.alignments && data.alignments.resourceCollections && data.alignments.resourceCollections.length) {
        data.alignments.resourceCollections.forEach((resource) => {
            if (resource.resources && resource.resources.length) {
                resource.resources.forEach((assessments, index) => {
                    if (assessments && assessments.title && assessments.title.en) {
                        title = assessments.title.en
                    }
                    const result = preparedData.find(({ urn }) => urn === assessments.urn);
                    if (assessments && assessments.type && assessments.type !== "assessmentItem") {
                        if (title.toLowerCase().includes(searchAssessmentTitle.toLowerCase()) && result == undefined) {
                            preparedData.push({ "type": assessments.type ? assessments.type : "assessment", "urn": assessments.urn, "assessmentTitle": title, "parentUrn": parentUrn, previousUrn: data.versionUrn }) 
                        }
                    }
                })
            }
        })
    }
    if (data.contents && data.contents.bodyMatter && data.contents.bodyMatter.length) {
        data.contents.bodyMatter.forEach((item) => {
            if (item && ((item.alignments && item.alignments != null) || (item.contents && item.contents != null))) {
                filterAssessmentsFromApiData(item, parentUrn, searchAssessmentTitle)
            }
        })
    }
    return preparedData
}