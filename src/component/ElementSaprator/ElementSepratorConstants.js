export default {
    POETRY : 'poetry',
    POETRY_ELEMENT : 'poetry-elem',
    TEXT : 'text-elem',
    IMAGE : 'image-elem',
    AUDIO : 'audio-elem',
    INTERACTIVE : 'interactive-elem',
    ASSESSMENT: 'assessment-elem',
    CONTAINER: 'container-elem',
    WORKED_EXP: 'worked-exp-elem',
    OPENER: 'opener-elem',
    SECTION_BREAK: 'section-break-elem',
    METADATA_ANCHOR : 'metadata-anchor',
    STANZA_ELEMENT : 'stanza-elem',
    INTERACTIVE_BUTTON : 'interactive-elem-button',
    CITATION :'citation-elem',
    CITATION_GROUP_ELEMENT : 'citations',
    CONTAINER_BUTTON : 'container-elem-button',
    BACK_MATTER : 'Back Matter',
    FRONT_MATTER : 'Front Matter',
    CONTAINER_INTRO : 'container-introduction',
    ELEMENT_ASIDE : 'element-aside',
    MULTI_COLUMN : "groupedcontent",
    MULTI_COLUMN_CONTAINER : "multi-column-group",
    SINGLE_COLUMN : "group",
    BLOCK_TEXT : "block-text",
}

/** This array contains data for element picker popup with key as button-type */

export const containerTypeArray = {
    "container-elem-button": {
        "Add Aside": "container-elem",
        "Add Citation Group": "citations-group-elem"
    },
    "interactive-elem-button": {
        "Add MMI": "interactive-elem",
        "Add Smart Link": "smartlink-elem",
        "Add Show Hide": "show-hide-elem",
        "Add Pop Up": "popup-elem",
    },
    "block-text-button": {
        "Block Math": "figure-mml-elem",
        "Block Code": "blockcode-elem",
        "Block Poetry": "poetry-elem"
    }
}