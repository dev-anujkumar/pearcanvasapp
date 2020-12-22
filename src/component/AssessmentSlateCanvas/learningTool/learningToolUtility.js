/**
 * Module - learningToolUtility
 * Description - This file contains utility functions related to Learning Tool Assessments
 */

/** @discription This object consists of list of  learning App types */
export const learningSystemList = {
    "accounting-sims": {
        learningSystem: "knowdl",
        appType: "accounting-sims",
        label: "Accounting Sims"
    },
    "socialexplorer-pathways": {
        learningSystem: "socialexplorer",
        appType: "socialexplorer-pathways",
        label: "Adaptive Pathways"
    },
    "criminal-justice-sims": {
        learningSystem: "knowdl",
        appType: "criminal-justice-sims",
        label: "Criminal Justice Sims"
    },
    "digital-interactives": {
        learningSystem: "knowdl",
        appType: "digital-interactives",
        label: "Digital Interactives"
    },
    "economics-sims": {
        learningSystem: "knowdl",
        appType: "economics-sims",
        label: "Economic Sims"
    },
    "exploring-solutions": {
        learningSystem: "knowdl",
        appType: "exploring-solutions",
        label: "Exploring Solutions"
    },
    "socialexplorer-explorations": {
        learningSystem: "socialexplorer",
        appType: "socialexplorer-explorations",
        label: "Guided Data Explorations"
    },
    "helpdesk": {
        learningSystem: "knowdl",
        appType: "helpdesk",
        label: "HelpDesk"
    },
    "hospitality-sims": {
        learningSystem: "knowdl",
        appType: "hospitality-sims",
        label: "Hospitality Sims"
    },
    "information-technology-sims": {
        learningSystem: "knowdl",
        appType: "information-technology-sims",
        label: "Information Technology Sims"
    },
    "video-quiz": {
        learningSystem: "mediashare",
        appType: "video-quiz",
        label: "Media Quiz"
    },
    "myvirtual-child": {
        learningSystem: "myvirtual-x",
        appType: "myvirtual-child",
        label: "My Virtual Child"
    },
    "myvirtual-life": {
        learningSystem: "myvirtual-x",
        appType: "myvirtual-life",
        label: "My Virtual Life"
    },
    "personal-finance-experience": {
        learningSystem: "knowdl",
        appType: "personal-finance-experience",
        label: "Personal Finance"
    },
    "political-science-sims": {
        learningSystem: "knowdl",
        appType: "political-science-sims",
        label: "Political Science Sims"
    },
    "qual-sims": {
        learningSystem: "knowdl",
        appType: "qual-sims",
        label: "Qualitative Business Sims"
    },
    "video-submission": {
        learningSystem: "mediashare",
        appType: "video-submission",
        label: "Shared Media"
    },
    "soundbytes": {
        learningSystem: "knowdl",
        appType: "soundbytes",
        label: "Sound Bytes"
    },
    "socialexplorer-surveys": {
        learningSystem: "socialexplorer",
        appType: "socialexplorer-surveys",
        label: "Surveys and Inventories"
    },
    "video-library": {
        learningSystem: "knowdl",
        appType: "video-library",
        label: "Video Library"
    },
    "writingsolutions": {
        learningSystem: "writingsolutions",
        appType: "writingsolutions",
        label: "Writing Solutions"
    }
    /*"business-media-library": {
        learningSystem: "knowdl",
        appType: "business-media-library",
        label: "Business Media"
    },*/
}
export const apiList = [
    {
        type: "accounting-sims",
        label: "Accounting Sims",
        system: "knowdl"
    },
    {
        type: "socialexplorer-pathways",
        label: "Adaptive Pathways",
        system: "socialexplorer"
    },
    {
        type: "criminal-justice-sims",
        label: "Criminal Justice Sims",
        system: "knowdl"
    },
    {
        type: "digital-interactives",
        label: "Digital Interactives",
        system: "knowdl"
    },
    {
        type: "economics-sims",
        label: "Economic Sims",
        system: "knowdl"
    },
    {
        type: "exploring-solutions",
        label: "Exploring Solutions",
        system: "knowdl"
    },
    {
        type: "socialexplorer-explorations",
        label: "Guided Data Explorations",
        system: "socialexplorer"
    },
    {
        type: "helpdesk",
        label: "HelpDesk",
        system: "knowdl"
    },
    {
        type: "hospitality-sims",
        label: "Hospitality Sims",
        system: "knowdl"
    },
    {
        type: "information-technology-sims",
        label: "Information Technology Sims",
        system: "knowdl"
    },
    {
        type: "video-quiz",
        label: "Media Quiz",
        system: "mediashare"
    },
    {
        type: "myvirtual-child",
        label: "My Virtual Child",
        system: "myvirtual-x"
    },
    {
        type: "myvirtual-life",
        label: "My Virtual Life",
        system: "myvirtual-x"
    },
    {
        type: "personal-finance-experience",
        label: "Personal Finance",
        system: "knowdl"
    },
    {
        type: "political-science-sims",
        label: "Political Science Sims",
        system: "knowdl"
    },
    {
        type: "qual-sims",
        label: "Qualitative Business Sims",
        system: "knowdl"
    },
    {
        type: "video-submission",
        label: "Shared Media",
        system: "mediashare"
    },
    {
        type: "soundbytes",
        label: "Sound Bytes",
        system: "knowdl"
    },
    {
        type: "socialexplorer-surveys",
        label: "Surveys and Inventories",
        system: "socialexplorer"
    },
    {
        type: "video-library",
        label: "Video Library",
        system: "knowdl"
    },
    {
        type: "writingsolutions",
        label: "Writing Solutions",
        system: "writingsolutions"
    }
]
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
        appTypeMenu = (Object.values(newProps.dropdownProps.learningSystems).map(system => system.label))
        // appTypeMenu = newProps.dropdownProps.learningSystems.map(item => item.label)
    }
    return appTypeMenu;
}