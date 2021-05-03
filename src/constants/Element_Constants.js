/*---------------Element Figure ----------------------*/ 
export const FIGURE = "figure"
export const IMAGE = "image"
export const TABLE = "table"
export const MATH_IMAGE = "mathImage"
export const AUTHORED_TEXT = "authoredtext"
export const CODELISTING = "codelisting"
export const MATHML = "mathml"
export const HALF_TEXT = "half-text"
export const TEXT_WIDTH = "text-width"
export const WIDER = "wider"
export const FULL = "full"
export const DEFAULT_IMAGE_DATA_SOURCE = "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png"
export const DEFAULT_IMAGE_SOURCE = "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png"
/*---------------Element Audio-Video ----------------------*/ 
export const AUDIO = "audio"
export const VIDEO = "video"
export const DEFAULT_ASSET="Asset data undefined"
export const DEFAULT_VIDEO_POSTER_IMAGE = "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png"

/*---------------Element Interactive ----------------------*/ 
export const INTERACTIVE_FPO = "https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png"
export const INTERACTIVE_SCHEMA = "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/interactive"
export const AUTHORED_TEXT_SCHEMA = "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext"
/*---------------Element Single Assessment ----------------------*/ 
export const ESA_DIALOG_TEXT='PLEASE ENTER A PRODUCT UUID'
export const ESA_POPUP_PLACEHOLDER='UUID'
export const ESA_POPUP_ROWS='1'
export const ESA_POPUP_COLUMNS='50'
export const ESA_POPUP_BUTTON_TEXT='OK'
export const ESA_POPUP_MAXLENGTH='200'
export const ESA_POPUP_CLASSNAME="single_assessment"
export const ASSESSMENT_SLATE = "element-assessment"
export const DEFAULT_ASSESSMENT_SOURCE = "https://cite-media-stg.pearson.com/legacy_paths/8efb9941-4ed3-44a3-8310-1106d3715c3e/FPO-assessment.png"
export const DEFAULT_ASSESSMENT_DATA_SOURCE = "https://cite-media-stg.pearson.com/legacy_paths/8efb9941-4ed3-44a3-8310-1106d3715c3e/FPO-assessment.png"

/*---------------Comments Panel PopUp----------------------*/ 
export const COMMENTS_POPUP_DIALOG_TEXT="Please enter a comment:"
export const COMMENTS_POPUP_ROWS='10'

/*---------------Section Break PopUp----------------------*/ 
export const SECTION_BREAK_DELETE_TEXT="Are you sure you want to delete the section break, elements beneath it will also get deleted?"

export const ELEMENT_ASSESSMENT = "ELEMENT_ASSESSMENT";

/*---------------- List type constants -----------------*/
export const LIST_TYPE_MAPPINGS = {
    'disc': {
        mapType: 'secondary-list-1',
        tag: 'UL'
    },
    'upper-alpha': {
        mapType: 'secondary-list-3',
        tag: 'OL'
    },
    'lower-alpha': {
        mapType: 'secondary-list-4',
        tag: 'OL'
    },
    'upper-roman': {
        mapType: 'secondary-list-5',
        tag: 'OL'
    },
    'lower-roman': {
        mapType: 'secondary-list-6',
        tag: 'OL'
    },
    'none': {
        mapType: 'secondary-list-7',
        tag: 'OL'
    },
    'decimal': {
        mapType: 'secondary-list-2',
        tag: 'OL'
    }
}


/****************SlateTagDropdown************************ */ 
export const SLATE_ASSESSMENT = 'assessment';
export const ASSESSMENT_ITEM = 'assessmentItem';
export const ASSESSMENT_ITEM_TDX = 'tdxAssessmentItem';

/****************Print On Demand************************ */ 
export const POD_DEFAULT_VALUE = '';
/*********************** Sidebar Dropdown*********************** */
export const disabledPrimaryOption = [
    "primary-openerelement",
    "primary-mathml-equation",
    "primary-blockcode-equation",
    "primary-poetry",
    "primary-stanza",
    "primary-elm-interactive",
    "primary-mmi",
    "primary-smartlink",
    "primary-showhide",
    "primary-popup",
    "primary-editor-table-equation",
    "primary-single-assessment",
    "primary-citations-group",
    "primary-element-citation",
    "primary-multicolumn"
];

export const allowedFigureTypesForTCM = ['image', 'table', 'mathImage', 'audio', 'video', 'codelisting', 'authoredtext', "interactive"]

/*******************************GlossaryfootnotePopup ***************************/
export const GLOSSARY = 'Glossary'
/** Component source for element saprator */

export const CITATION_SOURCE = 'CITATION';
export const ASIDE_SOURCE = 'ASIDE';
export const POETRY_SOURCE = 'POETRY';
export const MULTICOLUMN_SOURCE = 'MULTICOLUMN';
export const TEXT_SOURCE = 'TEXT';
export const SHOW_HIDE = "SHOWHIDE";
export const SOURCE_MAP = {
    [CITATION_SOURCE]: { 'support': ['ELEMENT_CITATION'], 'notSupport': [] },
    [ASIDE_SOURCE]: { 'support': ['SHOW_HIDE'], 'notSupport': ['POETRY', 'STANZA', 'ASIDE', 'WORKED_EXAMPLE', 'CITATION', 'ELEMENT_CITATION', 'LEARNING_OBJECTIVE_LIST', 'FEATURE', 'TACTIC_BOX', 'ACTIVITY','MULTI_COLUMN'] },
    [POETRY_SOURCE]: { 'support': ['STANZA'], 'notSupport': [] },
    [MULTICOLUMN_SOURCE]: { 'support': [], 'notSupport': ['POETRY', 'STANZA', 'ASIDE', 'WORKED_EXAMPLE', 'CITATION', 'ELEMENT_CITATION', 'LEARNING_OBJECTIVE_LIST', 'FEATURE', 'TACTIC_BOX', 'ACTIVITY','MULTI_COLUMN','SHOW_HIDE'] },
    [TEXT_SOURCE]: { 'support': [], 'notSupport': ['STANZA', 'ELEMENT_CITATION'] }
};

export const getPasteValidated = (sourceType, selectionType) => {
    let validation = true;
    if(sourceType in SOURCE_MAP) { 
        if(SOURCE_MAP[sourceType].support.length > 0) {
            if((SOURCE_MAP[sourceType].support).indexOf(selectionType) < 0) {
                validation = false;
            }
        } else if(SOURCE_MAP[sourceType].notSupport.length > 0) {
            if((SOURCE_MAP[sourceType].notSupport).indexOf(selectionType) >= 0) {
                validation = false;
            }
        }
        
        return validation;
    }
}

/** Metadata Anchor Element constants */
export const cypressLOWarningtxt = `Performing this action will remove the current alignment of projects LOs to cypress framework.`
export const externalLOWarningtxt = `Performing this action will remove the current alignment of projects LOs to external framework.`
export const CYPRESS_LF = "cypressLF";
export const EXTERNAL_LF =  "externalLF";