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

/*** @description - This function is to set the set status of render condition based on props and state values
    * @param condition- render condition to be set
    * @param assessmentFormat- format of current assessment
    * @param propsValue- props of elmTableComponent
    * @param stateValue- state variables of elmTableComponent
   */
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
        case 'setNavigationBarStatus':
            if (((assessmentFormat == PUF) || (assessmentFormat == LEARNOSITY_BETA && !propsValue.openSearch))) {
                status = true;
            }
            break;
    }
    return status;
}

/*** @description - This is Root Function to search and filter assessments for given searchTerm
    * @param assessmentType- format of current assessment
    * @param searchAssessmentData- value to be searched in the API data
    * @param apiData- The API data
   */
  export const searchAndFilterAssessmentData = (assessmentType, searchAssessmentData, apiData) => {
    let tableData = []
    preparedData = []
    if (assessmentType === LEARNOSITY_BETA || assessmentType === LEARNOSITY) {
            tableData = filterAssessmentsFromApiData(apiData, "", searchAssessmentData)
    }
    sortSearchResults(tableData,searchAssessmentData)
    return tableData
}

/*** @description - This is function to search and filter assessments from the API data
    * @param data- The API data 
    * @param parentUrn- parentUrn of current assessment
    * @param searchAssessmentData- value to be searched in the API data

   */
const filterAssessmentsFromApiData = (data, parentUrn, searchAssessmentData) => {
    let title = "";
    if (data.alignments && data.alignments.resourceCollections && data.alignments.resourceCollections.length) {
        data.alignments.resourceCollections.forEach((resource) => {
            if (resource.resources && resource.resources.length) {
                resource.resources.forEach((assessments, index) => {
                    if (assessments && assessments.title && assessments.title.en) {
                        title = assessments.title.en
                    }
                    const result = preparedData.find(({ urn }) => urn === assessments.urn);
                    if (assessments && assessments.type && assessments.type === "assessment") {
                        let assessmentExists = (title.toLowerCase().includes(searchAssessmentData.toLowerCase()) || assessments.urn.toLowerCase().includes(searchAssessmentData.toLowerCase()))|| searchAssessmentData.trim() == ""
                        if (assessmentExists && result == undefined) {
                            preparedData.push({ "type": assessments.type ? assessments.type : "assessment", "urn": assessments.urn, "title": title, "parentUrn": parentUrn, previousUrn: data.versionUrn })
                        }
                    }
                })
            }
        })
    }
    if (data.contents && data.contents.bodyMatter && data.contents.bodyMatter.length) {
        data.contents.bodyMatter.forEach((item) => {
            if (item && ((item.alignments && item.alignments != null) || (item.contents && item.contents != null))) {
                filterAssessmentsFromApiData(item, parentUrn, searchAssessmentData)
            }
        })
    }
    return preparedData
}

/*** @description - This is function to sort the seach and filter operation results
    * @param preparedTableData- The search results 
    * @param searchAssessmentData- value to be searched in the API data
   */
const sortSearchResults = (preparedTableData, searchAssessmentData) => {
    let sortByRelevance = {
            status: true,
            sortKeyword: searchAssessmentData
        },
        key1 = "title",
        key2 = "urn";
    /** Sort search result based on most relevant results */
    preparedTableData.sort(dynamicSortMultiple(key1, key2, sortByRelevance));
    // preparedTableData.sort(dynamicSortMultiple(key1, key2));
}

/*** @description - This is function to group the table data based on property
    * @param arrayData - The table data
    * @param property - property used to group array items into sub-arrays
   */
export const groupTableDataBy = (arrayData, property) => {
    return arrayData.reduce((acc, cur) => {
        acc[cur[property]] = [...acc[cur[property]] || [], cur];
        return acc;
    }, {});
}

/*** @description - This is function to dynamically sort the table data based on given property
    * @param property - property based on which sorting is applied
    * @param sortByRelevance - details to sort data based on relevance (for search results)
  */
export const dynamicSort = (property,sortByRelevance) => {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result;
        let first = (a[property] ? a[property] : a.urn).toLowerCase();
        let second = (b[property] ? b[property] : b.urn).toLowerCase();
        if (sortByRelevance && sortByRelevance.status && sortByRelevance.status === true && sortByRelevance.sortKeyword && sortByRelevance.sortKeyword.trim() != "") {
            let dataKey = sortByRelevance.sortKeyword.toLowerCase()
            result = (first.indexOf(dataKey) < second.indexOf(dataKey))? -1 : (first.indexOf(dataKey) > second.indexOf(dataKey)) ? 1 : 0;
        }
        else{
            result = (first < second) ? -1 : (first > second) ? 1 : 0;
        }

        return result * sortOrder;
    }
}

/*** @description - This is function to dynamically sort the table data based on multiple properties
    * Here the number of arguments is dynamic.
    * @arguments is an array that consists of properties in sequence in which the sorting is to be applied
    * In case of search results an extra argument is passed to sort search results based on relevance
  */
function dynamicSortMultiple() {

    var props = arguments;
    let sortByRelevanceData, propertyArray=[];
    if(props.length && props[props.length-1] && props[props.length-1].status === true ){
        sortByRelevanceData = props[props.length-1]
        delete  props[props.length-1]
        for(var i =0;i<props.length;i++){
           if(props[i] != null ){
            propertyArray.push(props[i])
           } 
        }
    }else{
        sortByRelevanceData={}
        propertyArray = props
    }
    return function (data1, data2) {
        var i = 0,
            result = 0,

            numberOfProperties = propertyArray.length;

        while (result === 0 && i < numberOfProperties) {
            result = dynamicSort(propertyArray[i],sortByRelevanceData)(data1, data2);
            i++;
        }
        return result;
    }
}

/*** @description - This is function to sort the table data
    * @param openInnerTable - true/false based on table data consists of assessment items
    * @param tableValue - the table data 
    * @param order - the order for sorting
   */
export const tableDataSorting = (openInnerTable, tableValue, order) => {
    let key1 = "",
        key2 = "",
        sortedData = [];
    let typeBasedData = groupTableDataBy(tableValue, 'type')

    if (order && order.toLowerCase() == 'desc') {
        key1 = "-title"
        key2 = "-urn"
    } else {
        key1 = "title"
        key2 = "urn"
    }

    if (openInnerTable == true) {
        if(typeBasedData && typeBasedData['assessmentItem']){
            sortedData = typeBasedData['assessmentItem'].sort(dynamicSortMultiple(key1, key2))
        }

    } else {
        let sortedContainers = [],sortedAssessments = []
        if(typeBasedData && typeBasedData['container']){
            sortedContainers = typeBasedData['container'].sort(dynamicSortMultiple(key1, key2))
        }
        if(typeBasedData && typeBasedData['assessment']){
            sortedAssessments = typeBasedData['assessment'].sort(dynamicSortMultiple(key1, key2))
        }
        sortedData = sortedContainers.concat(sortedAssessments)
    }

    return sortedData
}