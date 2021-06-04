export default {
    /****************Simple Elements************************/
    AUTHORED_TEXT: "element-authoredtext",
    BLOCKFEATURE: "element-blockfeature",
    ELEMENT_LIST: "element-list",
    HEADING: "heading",
    HAND_WRITING: 'handwriting',
    PARAGRAPH: "paragraph",
    LEARNING_OBJECTIVE: "element-learningobjectives",
    FORMATTED_TITLE:'formatted-title',
    CTA_BUTTON:'actionButton',
    POSTER_TEXT_OBJ:'postertextobject',
    FIGURE: "figure",
    /****************Container Elements*********************/
    ASIDE:"aside",
    SLATE:"slate",
    WE_MANIFEST: "manifest",
    MULTI_COLUMN: "groupedcontent",
    SECTION_BREAK:"SECTION_BREAK",    
    ELEMENT_ASIDE: "element-aside",
    WORKED_EXAMPLE: "workedexample",
    CONTAINER_INTRO:"container-introduction",
    MULTI_COLUMN_GROUP:"group",
    POP_UP:'POP_UP',
    POPUP_ELEMENT:'popup',
    SHOWHIDE: "showhide",
    SHOW_HIDE: "SHOW_HIDE",
    SMART_LINK: "SMART_LINK",
    /****************Citation elment************************/
    CITATION_GROUP: "citations",
    CITATION_ELEMENT: "element-citation",
    /****************Poetry element*************************/
    POETRY_ELEMENT: "poetry",
    POETRY_STANZA: "stanza",
    POETRY_LINE:"line",
    /********************Semantics*************************/
    GLOSSARY:"glossary",
    FOOTNOTE:"footnote",
    ASSET_POPOVER:"assetpopover", 
    AP_TYPE:"Asset Popover",
    SLATE_LINK:"Slate Link",
    /*****************Interactive subtypes*******************/
    interactiveSubtypeConstants: {
        THIRD_PARTY: "3rd-party",
        EXTERNAL_WEBSITE_LINK : "web-link",
        PDF: "pdf",
        LEGACY_WEB_LINK: "pop-up-web-link",
        TABLE: "table",
        QUAD: "mmi",
        ELM: "mmi-elm"
    },
    /***************** Smart-link Labels -  Metadata Value *******************/
    SMARTLINK_LABELS : {
        "3rd-party": "3rd Party",
        "web-link": "External Website Link",
        "pdf": "PDF",
        "pop-up-web-link": "Legacy Web Link",
        "table": "Table"
    },
    /*****************Element Type Arrays*******************/
    elementType: ['element-authoredtext', 'element-list', 'element-blockfeature', 'element-learningobjectives', 'element-citation', 'stanza', 'figure'],
    containerType : ['element-aside', 'manifest', 'citations', 'poetry', 'WORKED_EXAMPLE', 'CONTAINER', 'SECTION_BREAK', 'CITATION', 'POETRY', 'groupedcontent'],
    formattedTitleField : ['formattedTitle','formattedTitleOnly','formattedSubtitle' ],
    parentType : ['WORKED_EXAMPLE', 'CONTAINER', 'CITATION', 'POETRY', 'MULTI_COLUMN'],
    bqAttrHtmlTrue:'<p class="blockquoteTextCredit" contenteditable="true" data-placeholder="Attribution Text"></p>',
    bqAttrHtmlFalse:'<p class="blockquoteTextCredit" contenteditable="false" data-placeholder="Attribution Text"></p>',
    bqHiddenText:'<p class="blockquote-hidden" contenteditable="false" style="visibility: hidden; height: 20px;">hidden</p>',
    allowedFigureTypesForTCM : ['image', 'table', 'mathImage', 'audio', 'video', 'codelisting', 'authoredtext', "interactive"]
}
