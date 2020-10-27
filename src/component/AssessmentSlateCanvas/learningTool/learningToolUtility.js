/**
 * Module - learningToolUtility
 * Description - This file contains utility functions related to Learning Tool Assessments
 */

/** @discription This object consists of list of  learning App types */
export const learningSystemList = {
    "accounting-sims": "knowdl",                 //"Accounting Sims"
    "criminal-justice-sims": "knowdl",           //"Criminal Justice Sims"
    "digital-interactives": "knowdl",            //"Video Library"
    "economics-sims": "knowdl",                  //"Economic Sims"
    "helpdesk": "knowdl",                        //"HelpDesk"
    "hospitality-sims": "knowdl",                //"Hospitality Sims",
    "information-technology-sims": "knowdl",     //"Information Technology Sims"
    "Personal Finance": "knowdl",                //"Personal Finance"
    "Psychology Sims": "knowdl",                 //"Psychology Sims"
    "qual-sims": "knowdl",                       //"Qualitative Business Sims",
    "soundbytes": "knowdl",                      //"Sound Bytes"
    "political-science-sims": "knowdl",          //"Political Science Sims"
    "video-submission": "mediashare",            //"Shared Media"
    "video-quiz": "mediashare",                  //"Media Quiz"
    "myvirtual-child": "myvirtual-x",            //"MyVirtualChild"
    "myvirtual-life": "myvirtual-x",             //"MyVirtualLife"
    "socialexplorer-surveys": "socialexplorer",  //"Surveys and Inventories"
    "writingsolutions": "writingsolutions"       //"Writing Solutions"
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