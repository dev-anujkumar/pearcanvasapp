/**
 * Module - learningToolUtility
 * Description - This file contains utility functions related to Learning Tool Assessments
 */

/** @discription This object consists of list of  learning App types */
export const learningSystemList = {
    "accounting-sims":"knowdl",                     //"Accounting Sims"
    "criminal-justice-sims":"knowdl",               //"Criminal Justice Sims"
    "digital-interactives":"knowdl",
    "economics-sims":"knowdl",                      //"Economic Sims"
    "helpdesk":"knowdl",                            //"HelpDesk"
    "hospitality-sims":"knowdl",                    //"Hospitality Sims"
    "information-technology-sims":"knowdl",         //"Information Technology Sims"
    "personal-finance-experience":"knowdl",         //"Personal Finance"
    "Psychology Sims":"knowdl",                     //"Psychology Sims"
    "qual-sims":"knowdl",                           //"Qualitative Business Sims",
    "soundbytes":"knowdl",                          //"Sound Bytes"
    "political-science-sims":"knowdl",              //"Political Science Sims"
    "video-library":"knowdl",                       //"Video Library"
    "video-submission":"mediashare",                //"Shared Media"
    "video-quiz":"mediashare",                      //"Media Quiz" 
    "myvirtual-child":"myvirtual-x",                //"MyVirtualChild"
    "myvirtual-life":"myvirtual-x",                 //"MyVirtualLife"
    "socialexplorer-surveys":"socialexplorer",      //"Surveys and Inventories"
    "socialexplorer-pathways":"socialexplorer",     // "Adaptive Pathways"
    "socialexplorer-explorations":"socialexplorer", //"Guided Data Explorations"
    "writingsolutions":"writingsolutions"           //"Writing Solutions"  
}
export const learningSystemsData = {
    "accounting-sims": {
        learningSystem: "knowdl",
        appType: "accounting-sims",
        label: "Accounting Sims"
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
    "soundbytes": {
        learningSystem: "knowdl",
        appType: "soundbytes",
        label: "Sound Bytes"
    },
    "business-media-library": {
        learningSystem: "knowdl",
        appType: "business-media-library",
        label: "Business Media"
    },
    "video-library": {
        learningSystem: "knowdl",
        appType: "video-library",
        label: "Video Library"
    },
    "myvirtual-child": {
        learningSystem: "myvirtual-x",
        appType: "myvirtual-child",
        label: "MyVirtualChild"
    },
    "myvirtual-life": {
        learningSystem: "myvirtual-x",
        appType: "myvirtual-life",
        label: "MyVirtualLife"
    },
    "socialexplorer-surveys": {
        learningSystem: "socialexplorer",
        appType: "socialexplorer-surveys",
        label: "Surveys and Inventories"
    },
    "socialexplorer-pathways": {
        learningSystem: "socialexplorer",
        appType: "socialexplorer-pathways",
        label: "Adaptive Pathways"
    },
    "socialexplorer-explorations": {
        learningSystem: "socialexplorer",
        appType: "socialexplorer-explorations",
        label: "Guided Data Explorations"
    },
    "video-submission": {
        learningSystem: "mediashare",
        appType: "video-submission",
        label: "Shared Media"
    },
    "video-quiz": {
        learningSystem: "mediashare",
        appType: "video-quiz",
        label: "Media Quiz"
    },
    "writingsolutions": {
        learningSystem: "writingsolutions",
        appType: "writingsolutions",
        label: "Writing Solutions"
    }
}
/** @discription This Array consists of list of  learning Tool Table Headers */
export const learningToolTableHeaders = [
    'Learning App Type',
    'Discipline',
    'Label',
    'Date Modified',
    'Keyword(s)',
    'Template ID'
];
/** @discription This Array consists of results Page size options */
export const learningToolPages = ['25', '50'];

/**---------------- Learning Tool Component Constants ----------------*/
export const LT_LA_HEADER = ' Search Learning App Type ';
export const TAXONOMIC_ID_DISCIPLINES = 'disciplines';
export const TAXONOMIC_ID_LEARNING_SYSTEM = 'learningsystem';
export const LT_LA_API_ERROR = 'This is error while fetching data from LT_LA api >>>>>';
export const LT_LA_SEARCH_TEXT = 'Max. 100 characters of A-Z, a-z, 0-9, space allowed';
/** @discription This function prepares the label for learning systems
 * @param label learning system value
 */
export const capitalizeString = (label) => {
    return label.replace(/-/gi, ' ').toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
}

/** @discription This function prepares the Learning Systems List from API data
 * @param apiData learning system API data
 */
export const prepareLearningSystemsList = (apiData) => {
    let learningTemplateList = {};
    apiData && apiData.options && apiData.options.length > 0 && apiData.options.map(learningSystem => {
        learningSystem.children && learningSystem.children.length > 0 && learningSystem.children.map(learningTemplate => {
            learningTemplateList = Object.assign({}, learningTemplateList, {
                [learningTemplate.prefLabel]: learningSystem.prefLabel
            })
        })
    })
    return learningTemplateList;
}