import { WORKED_EXAMPLE } from "../component/SlateWrapper/SlateWrapperConstants"
/*---------------- Error message constants -----------------*/
export const SLATE_API_ERROR = "Error in getting slate data. Please try again."
export const SECTION_BREAK_LABELTEXT = "SB"

/*---------------Element Figure ----------------------*/
export const TABLE_AS_MARKUP = "tableasmarkup" 
export const FIGURE = "figure"
export const IMAGE = "image"
export const TABLE = "table"
export const TABLE_ELEMENT = "tableasmarkup"
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
export const INTERACTIVE = "interactive"
export const DEFAULT_ASSET="Asset data undefined"
export const MULTI_COLUMN = "groupedcontent"
export const TAB = "tab"
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

/*---------------Delete PopUp----------------------*/ 
export const SECTION_BREAK_DELETE_TEXT="Are you sure you want to delete the section break, elements beneath it will also get deleted?"
export const OWNERS_ELM_DELETE_DIALOG_TEXT="You are trying to delete a container/element that is subscribed to in other projects. Are you sure you want to continue?"
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
    "primary-multicolumn",
    "primary-multicolumn-3c",
    "primary-tab"
];
// this constant is used by sidebar
export const allowedFigureTypesForTCM = ['image', 'table', 'mathImage', 'audio', 'video', 'codelisting', 'authoredtext', "interactive", 'assessment']

/*******************************GlossaryfootnotePopup ***************************/
export const GLOSSARY = 'Glossary'
/** Component source for element saprator */

export const MARKEDINDEX_DIALOG_TEXT = 'Are you sure you want to remove the index marker entry? This action cannot be undone.'
export const INDEX_REMOVED_TEXT = "Index removed successfully."
export const INDEX_ADDED_TEXT = "Index added successfully."
export const MARKEDINDEX_NO_RESULT_FOUND_TEXT = "No result found"

export const CITATION_SOURCE = 'CITATION';
export const ASIDE_SOURCE = 'ASIDE';
export const POETRY_SOURCE = 'POETRY';
export const MULTICOLUMN_SOURCE = 'MULTICOLUMN';
export const TEXT_SOURCE = 'TEXT';
export const SHOW_HIDE = "SHOWHIDE";
export const TABBED_SOURCE = "TABBED_2_COLUMN"
export const SOURCE_MAP = {
    [CITATION_SOURCE]: { 'support': ['ELEMENT_CITATION'], 'notSupport': [] },
    [ASIDE_SOURCE]: { 'support': [], 'notSupport': ['STANZA', 'ASIDE', 'WORKED_EXAMPLE', 'CITATION', 'ELEMENT_CITATION', 'LEARNING_OBJECTIVE_LIST', 'FEATURE', 'TACTIC_BOX', 'ACTIVITY','MULTI_COLUMN', 'TABBED_2_COLUMN'] },
    [POETRY_SOURCE]: { 'support': ['STANZA'], 'notSupport': [] },
    [MULTICOLUMN_SOURCE]: { 'support': [], 'notSupport': ['STANZA', 'CITATION', 'ELEMENT_CITATION', 'MULTI_COLUMN','POP_UP','TAB_ELEMENT', 'TABBED_2_COLUMN'] }, //'LEARNING_OBJECTIVE_LIST', 'FEATURE', 'TACTIC_BOX', 'ACTIVITY','ASIDE', 'WORKED_EXAMPLE'
    [TEXT_SOURCE]: { 'support': [], 'notSupport': ['STANZA', 'ELEMENT_CITATION','TAB_ELEMENT'] },
    [SHOW_HIDE]: { 'support': ['AUTHORED_TEXT', 'HS', 'HEADERS', 'LEARNING_OBJECTIVE', 'LIST', 'BLOCKFEATURE', 'BLOCKQUOTE', 'MARGINALIA', 'PULLQUOTE', 'AUDIO', 'VIDEO', 'MATH', 'TABLE', 'IMAGE', 'MATH_ML_CHEM_EDITOR', 'BLOCK_CODE_EDITOR', 'TABLE_EDITOR','EXTERNAL_LINK','ELEMENT_DIALOGUE','ASIDE', 'WORKED_EXAMPLE', 'CITATION', 'POETRY','FEATURE', 'ACTIVITY', 'TACTIC_BOX', 'LEARNING_OBJECTIVE_LIST', 'COLUMN_VIEW_1', 'COLUMN_VIEW_2', 'COLUMN_VIEW_3','COLUMN_VIEW_4'], 'notSupport': [] },
    [TABBED_SOURCE]: { 'support': ['TAB_ELEMENT'], 'notSupport': [] },
};
const SHOWHIDE = "SHOW_HIDE";
// This mapping is used for conditional rendering of Paste Button inside Elements
const CONDITIONAL_PASTE_SUPPORT = {
    [SHOW_HIDE] : { [ASIDE_SOURCE]: ['poetry', 'popup', 'showhide'], [WORKED_EXAMPLE]: ['poetry', 'popup', 'showhide']},
    [MULTICOLUMN_SOURCE]: { [SHOWHIDE]: ['element-aside','citations','poetry'],[ASIDE_SOURCE]:['showhide'],[WORKED_EXAMPLE]:['showhide'] },
    [ASIDE_SOURCE]: { [SHOWHIDE]: ['element-aside','citations','poetry']}
}

export const getPasteValidated = (separatorProps, sourceType, selectionType) => {
    let validation = true;
    let index;
    let parentType = separatorProps?.asideData?.parent?.type;
    const selectedColumn = selectionType === "COLUMN_VIEW_1" || selectionType === 'COLUMN_VIEW_2' || selectionType === 'COLUMN_VIEW_3' || selectionType === 'COLUMN_VIEW_4'
    if(separatorProps.elementType === SHOW_HIDE.toLowerCase()){
        index = separatorProps?.index
        index = index?.split('-');
    }
    if (sourceType in SOURCE_MAP) {
        if (SOURCE_MAP[sourceType].support.length > 0) {
            if ((SOURCE_MAP[sourceType].support).indexOf(selectionType) < 0) {
                validation = false;
            }else if(selectedColumn && sourceType === SHOW_HIDE && index?.length > 3){
                validation = false;
            }
        } else if (SOURCE_MAP[sourceType].notSupport.length > 0) {
            if ((SOURCE_MAP[sourceType].notSupport).indexOf(selectionType) >= 0) {
                validation = false;
            }else if(sourceType === ASIDE_SOURCE && (parentType === SHOW_HIDE.toLowerCase() || parentType === "groupedcontent")){
                validation = false;
            }
        }
        if (validation && Object.keys(CONDITIONAL_PASTE_SUPPORT)?.includes(sourceType)) {
            let selectedElement = separatorProps?.elementSelection?.element ?? {}
            let sourceElementIndex= sourceType=== ASIDE_SOURCE ? separatorProps?.asideData?.index ?? {} : separatorProps?.index ?? {}
            let indexes = sourceElementIndex &&  typeof (sourceElementIndex) !== 'number' && sourceElementIndex.split('-');
            switch (sourceType) {
                case SHOW_HIDE:
                    validation = checkShowHidePasteValidation(selectedElement, sourceType, selectionType, validation, indexes?.length);
                    break;
                case ASIDE_SOURCE:
                    validation = checkASWEPasteValidation(selectedElement, sourceType, selectionType, validation, indexes?.length,separatorProps?.asideData);
                case MULTICOLUMN_SOURCE:
                    validation = checkMultiColumnPasteValidation(selectedElement, sourceType, selectionType, validation );
                    break;
            }
        }
        return validation;
    }
}

/**
 * Function - Check if Aside/WE selected to CUT/COPY has PE/SH/POPUP then restrict it be copied inside SH
 * @param {*} separatorProps 
 * @param {*} sourceType 
 * @param {*} selectionType 
 * @param {*} validation 
 * @returns 
 */
const checkShowHidePasteValidation = (selectedElement, sourceType, selectionType, validation, sourceElementIndex) => {
    let isValidPaste = validation;
    const WE_MANIFEST = "manifest";
    const conditionalSelection = [ASIDE_SOURCE, WORKED_EXAMPLE];
    if (conditionalSelection.includes(selectionType) && sourceElementIndex >= 4) {
        isValidPaste = false;
    }
    else if (selectionType && conditionalSelection.includes(selectionType) && selectedElement?.elementdata?.bodymatter?.length) {
        let validPaste2;
        const validPaste1 = selectedElement.elementdata.bodymatter.find((item) => {
            if (item?.type && CONDITIONAL_PASTE_SUPPORT[sourceType][selectionType]?.includes(item.type)) {
                return true;
            }
            if (item?.type === WE_MANIFEST) {
                if (item?.contents?.bodymatter) {
                    validPaste2 = item.contents.bodymatter.find((innerItem) => {
                        if (innerItem?.type && CONDITIONAL_PASTE_SUPPORT[sourceType][selectionType].includes(innerItem.type)) {
                            return true;
                        }
                    })
                }
            }
        })
        if (validPaste1 || validPaste2) {
            isValidPaste = false
        }
    }
    return isValidPaste;
}
/**
 * Function - Check if Showhide selected to CUT/COPY has AS/WE then restrict it be copied inside 2C/3C
 * @param {*} separatorProps 
 * @param {*} sourceType 
 * @param {*} selectionType 
 * @param {*} validation 
 * @returns 
 */
const checkMultiColumnPasteValidation = (selectedElement, sourceType, selectionType, validation) => {
    let isValidPaste = validation;
    const conditionalSelection = [SHOWHIDE];
    if (selectionType && conditionalSelection.includes(selectionType)) {
        if (selectedElement?.type === SHOW_HIDE.toLowerCase()) {
            const showHideInnerElements = Object.values(selectedElement?.interactivedata)?.flat()
            const validPaste1 = showHideInnerElements?.length && showHideInnerElements?.find((item) => {
                if (item?.type && CONDITIONAL_PASTE_SUPPORT[sourceType][selectionType]?.includes(item.type)) {
                    return true;
                }
            })
            if (validPaste1) {
                isValidPaste = false
            }
        }
    }
    return isValidPaste;
}
/**
 * Function - Check if Showhide selected to CUT/COPY has AS/WE then restrict it be copied inside AS/WE
 * @param {*} separatorProps 
 * @param {*} sourceType 
 * @param {*} selectionType 
 * @param {*} validation 
 * @returns 
 */
const checkASWEPasteValidation = (selectedElement, sourceType, selectionType, validation, sourceElementIndex, parentDetails) => {
    let isValidPaste = validation;
    const conditionalSelection = [SHOWHIDE];
    if ((selectionType === "SHOW_HIDE" && sourceElementIndex >= 3) || (selectionType === "POETRY" && parentDetails?.parent?.type === 'showhide')) {
        isValidPaste = false;
    }
    else if (selectionType && conditionalSelection.includes(selectionType)) {
        if (selectedElement?.type === SHOW_HIDE.toLowerCase()) {
            const showHideInnerElements = Object.values(selectedElement?.interactivedata)?.flat()
            const validPaste1 = showHideInnerElements?.length && showHideInnerElements?.find((item) => {
                if (item?.type && CONDITIONAL_PASTE_SUPPORT[sourceType][selectionType]?.includes(item.type)) {
                    return true;
                }
            })
            if (validPaste1) {
                isValidPaste = false
            }
        }
    }
    return isValidPaste;
}

/** Metadata Anchor Element constants */
export const cypressLOWarningtxt = `Performing this action will remove the current alignment of projects LOs to cypress framework.`
export const externalLOWarningtxt = `Performing this action will remove the current alignment of projects LOs to external framework.`
export const CYPRESS_LF = "cypressLF";
export const EXTERNAL_LF =  "externalLF";

/** Tabbed 2 column element - TABBED_2_COLUMN */
export const TABBED_2_COLUMN = {
    "ELEMENT_TAG_NAME": "TB",
    "ELEMENT_NAME" : "primary-tabbed-elem"
}

/** Tabbed tab element - TAB_2_COLUMN */
export const TABBED_TAB = {
    "ELEMENT_TAG_NAME": "Tab",
    "ELEMENT_NAME" : "primary-tab-elem"
}

/** Multi column - 3 column constants */
export const MULTI_COLUMN_3C = {
    "ELEMENT_TAG_NAME": "3C",
    "ELEMENT_NAME" : "primary-multicolumn-3c",
    "ELEMENT_PROPORTION": "33-33-33"
}

/** Multi column - 2 column constants */
export const MULTI_COLUMN_2C = {
    "ELEMENT_TAG_NAME": "2C",
    "ELEMENT_NAME" : "primary-multicolumn-2c",
    // "ELEMENT_PROPORTION": "33-33-33"
}

export const labelHtmlData = ['', '<br>', '<br/>', '<br data-mce-bogus="1">', '<p><br></p>', '<span class="codeNoHighlightLine"><br></span>', '<span class="codeNoHighlightLine"></span>'];

/** Block List constants */
export const MANIFEST_LIST = 'manifestlist';
export const MANIFEST_LIST_ITEM = 'manifestlistitem';
export const BLOCK_LIST_ELEMENT_EVENT_MAPPING = {
    "TAB": 2,
    "ENTER": 3,
    "SHIFT+TAB": 5
}

/** Not supported TCM revet functionality element types */
export const notAllowedTCMElementTypes = ['openerelement', 'tableasmarkup', 'manifestlist', 'element-generateLOlist']

/* Tab Title Placeholder */
export const tabTitlePlaceholder = "Enter tab name (max. 25 characters)"

/* TB sidebar conversion endpoint */
export const tbSidebarEndpoint = "tabbed-2-column"

/* Fetch Learning objectives for these slates*/
export const FETCH_LO_FOR_SLATES = ['section','pdfslate','ltislate']