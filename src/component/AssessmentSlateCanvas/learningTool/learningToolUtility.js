/**
 * Module - learningToolUtility
 * Description - This file contains utility functions related to Learning Tool Assessments
 */

/** @discription This Array consists of list of  learning Tool Table Headers */
export const learningToolTableHeaders = [
    'Learning App Type',
    'Discipline',
    'Title',
    'Date Modified',
    'Keyword(s)',
    'Template ID'
];
/** @discription This Array consists of results Page size options */
export const learningToolPages = ['25', '50'];

export const searchHeaders = [
    'Learning App Type',
    'Discipline',
    'Search By Keyword',
    'Search By Template Title'
]
/**---------------- Learning Tool Component Constants ----------------*/
export const DEFAULT_OPTION = 'Select One';
export const ERROR_MESSAGE = "No result found";
export const BUTTON_TEXT_LINK = 'Link';
export const BUTTON_TEXT_CANCEL = 'Cancel';
export const BUTTON_TEXT_SEARCH = 'Search';
export const LT_LA_HEADER = ' Search Learning App Type ';
export const TAXONOMIC_ID_DISCIPLINES = 'disciplines';
export const TAXONOMIC_ID_LEARNING_SYSTEM = 'learningsystem';
export const LT_LA_API_ERROR = 'This is error while fetching data from LT_LA api >>>>>';
export const LT_LA_SEARCH_TEXT = 'Max. 100 characters of A-Z, a-z, 0-9, space allowed';
export const PLACEHOLDER_TITLE = "Enter template title to search";
export const PLACEHOLDER_KEYWORD = "Enter Keyword to search";
export const DISABLED_OPTION = '<option value="" selected disabled>Select One</option>';
export const TYPE_TITLE = 'Search By Template Title';
export const TYPE_KEYWORD = 'Search By Keyword';
export const TYPE_DISCIPLINE = 'Discipline';
export const TYPE_LEARNING_APP = 'Learning App Type';


/** @discription This function prepares the label for learning systems
 * @param label learning system value
 */
export const capitalizeString = (label) => {
    return label.replace(/-/gi, ' ').toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
}

/** @discription This function prepares the list for diusciplines
 * @param newProps props
 */
export const prepareDisciplineList = (newProps) => {
    let disciplineMenu = [];
    if (newProps && newProps.dropdownProps && newProps.dropdownProps.apiResponseForDis) {
        disciplineMenu = (newProps.dropdownProps.apiResponseForDis.map(discipline => discipline.prefLabel));
    }
    return disciplineMenu;
}

/** @discription This function prepares the list for learning systems
 * @param newProps props
 */
export const prepareAppTypeList = (newProps) => {
    let appTypeMenu = [];
    if (newProps && newProps.dropdownProps && newProps.dropdownProps.learningSystems) {
        appTypeMenu = newProps.dropdownProps.learningSystems.map(item => item.label);
    }
    return appTypeMenu.sort();
}