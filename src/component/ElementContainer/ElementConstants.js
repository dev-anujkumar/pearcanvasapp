export default {
    OPENER : "openerelement",
    AUTHORED_TEXT : "element-authoredtext",
    BLOCKFEATURE : "element-blockfeature",
    ELEMENT_LIST : "element-list",
/****************Figure Element************************ */
    FIGURE : "figure",
    FIGURE_IMAGE : "image",
    FIGURE_TABLE : "table",
    FIGURE_MATH_IMAGE : "mathImage",
    FIGURE_AUTHORED_TEXT : "authoredtext",
    FIGURE_CODELISTING : "codelisting",
    FIGURE_TABLE_EDITOR : "tableasmarkup",
    FIGURE_AUDIO : "audio",
    FIGURE_VIDEO : "video",
    FIGURE_ASSESSMENT : "assessment",
    FIGURE_ELEMENT_DISCUSSION : "element-discussion",

/****************Figure Interactive Element************************ */
    INTERACTIVE : "interactive",
    INTERACTIVE_MMI : "mmi",
    INTERACTIVE_ELM : "mmi-elm",
    INTERACTIVE_EXTERNAL_LINK : "external-link",
    INTERACTIVE_SHOW_HIDE : "showhide",
    INTERACTIVE_NARRATIVE_LINK : "narrative-link",
    SMARTLINK_ALFRESCO_TYPES : ["website", "pdf", "3rd party interactive", "metrodigi interactive", "table", "mdpopup"],
    INTERACTIVE_TYPES: {
        VIDEO_MCQ: 'video-mcq',
        GUIDED_EXAMPLE: 'guided-example'
    },
/****************Container Element************************ */
    ELEMENT_WORKEDEXAMPLE: "workedexample",
    ELEMENT_ASIDE: "element-aside",
    SHOW_HIDE: "showhide",
    ELEMENT_SECTION_BREAK: 'manifest',
/****************Metadata Anchor************************ */
    METADATA_ANCHOR : "element-learningobjectivemapping",
    LEARNING_OBJECTIVE_ITEM:"element-learningobjectives",

/****************Metadata Anchor LO List************************ */
    METADATA_ANCHOR_LO_LIST : "element-generateLOlist",

/****************Assessment Slate Element************************ */
    ASSESSMENT_SLATE : "element-assessment",
    ELEMENT_ASSESSMENT : "ELEMENT_ASSESSMENT ",

/****************Pop Up elment************************ */
    POOPUP_ELEMENT:"popup",

/****************Citation elment************************ */
    CITATION_GROUP: "citations",
    CITATION_ELEMENT: "element-citation",

/****************Poetry element************************ */
    POETRY_ELEMENT: "poetry",
    POETRY_STANZA: "stanza",

/****************Multi Column element************************ */
    MULTI_COLUMN: "groupedcontent",
    TABBED_TAB: "group",
    TAB: "tab",

/****************Element Dialogue************************ */
    ELEMENT_DIALOGUE: "element-dialogue",
    DIALOGUE_SD: "stagedirection",
    DIALOGUE_DE: "lines",
    ELEMENT_DISCUSSION: 'discussion',

/**************** PDF Slate Element ************************ */
    PDF_SLATE : "element-pdf",

/**************** LTI Slate Element ************************ */
    TCC_ELEMENT : "element-tcc",

/**************** Block list Element ************************ */
    BLOCK_LIST : "manifestlist"
}

export const LABELS = {
    "figure": "F",
    "image": "Fg",
    "table": "Tb",
    "mathImage": "Eq",
    "authoredtext": "MML",
    "codelisting": "BCE",
    "audio": "AUD",
    "video": "VID",
    "assessment": "Qu",
    "external-link": "SL",
    "narrative-link": "Pop",
    "workedexample": "WE",
    "poetry": "PE",
    "mmi":"Quad",
    "mmi-elm":"ELM",
    "element-dialogue": "PS",
    "stagedirection": "SD",
    "lines": "DE",
    "element-pdf": "PDF"
}

export const elementTypeTCM = ['element-authoredtext', 'element-list', 'element-blockfeature', 'element-learningobjectives', 'element-citation', 'stanza',  'popup', 'figure','showhide', 'element-assessment',"element-pdf"];
export const containerType = ['element-aside', 'manifest', 'citations', 'poetry', 'groupedcontent','popup', 'showhide'];
export const allowedFigureTypesForTCM = ['image', 'table', 'mathImage', 'audio', 'video', 'codelisting', 'authoredtext', "interactive", "assessment"]
export const allowedParentType = ['popup', 'showhide']
export const containersInSH = ['CONTAINER', 'CITATION', 'WORKED_EXAMPLE', 'POETRY'];
export const interactivetype = ['3rd-party', 'web-link'];

export const TE_POP_UP_HEADER_TEXT = 'Select an Image';
export const TE_POP_UP_NORMAL_TEXT = 'Please select an image to open it in Alfresco for editing in a different tab on your browser';
// PCAT-18694 - read only element labels for showing grey border
export const READ_ONLY_ELEMENT_LABELS = ["3C", "2C", "C1", "C2", "C3"];
/* TCC Element Constant */
export const TCC_ELEMENT = "TCC Element*";
export const TCC_ELEMENT_SUBTYPE = "Subtype";
export const TCC_BOTTOM_NOTE = "*TCC stands for Thin Common Cartridge";
