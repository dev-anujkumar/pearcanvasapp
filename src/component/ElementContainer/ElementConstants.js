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
 
/****************Figure Interactive Element************************ */
    INTERACTIVE : "interactive",
    INTERACTIVE_MMI : "mmi",
    INTERACTIVE_ELM : "mmi-elm",
    INTERACTIVE_EXTERNAL_LINK : "external-link",
    INTERACTIVE_SHOW_HIDE : "showhide",
    INTERACTIVE_NARRATIVE_LINK : "narrative-link",
    SMARTLINK_ALFRESCO_TYPES : ["website", "pdf", "3rd party interactive", "metrodigi interactive", "table", "mdpopup"],
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

/****************Element Dialogue************************ */  
    ELEMENT_DIALOGUE: "element-dialogue",
    DIALOGUE_SD: "stagedirection",
    DIALOGUE_DE: "lines",
    ELEMENT_DISCUSSION: 'element-discussion'
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
    "lines": "DE"
}

export const elementTypeTCM = ['element-authoredtext', 'element-list', 'element-blockfeature', 'element-learningobjectives', 'element-citation', 'stanza',  'popup', 'figure','showhide'];
export const containerType = ['element-aside', 'manifest', 'citations', 'poetry', 'groupedcontent','popup', 'showhide'];
export const allowedFigureTypesForTCM = ['image', 'table', 'mathImage', 'audio', 'video', 'codelisting', 'authoredtext', "interactive"]
export const allowedParentType = ['popup', 'showhide']