export const TEXT="TEXT";
export const IMAGE="IMAGE";
export const VIDEO="VIDEO";
export const AUDIO="AUDIO";
export const ASSESSMENT="ASSESSMENT";
export const INTERACTIVE="INTERACTIVE";
export const CONTAINER="CONTAINER";
export const WORKED_EXAMPLE = "WORKED_EXAMPLE";
export const SECTION_BREAK = "SECTION_BREAK";
export const METADATA_ANCHOR = "LO";
export const LO_LIST = "LO_LIST";
export const OPENER = "OPENER_ELEMENT";
export const ELEMENT_ASSESSMENT = "ELEMENT_ASSESSMENT";
export const ELEMENT_CITATION = "ELEMENT_CITATION";
export const CITATION = "CITATION";
export const POETRY = "POETRY";
export const STANZA = "STANZA";
export const SHOW_HIDE = "SHOW_HIDE";
export const POP_UP = "POP_UP";
export const SMARTLINK = "SMART_LINK";
export const BLOCKCODE = "BLOCK_CODE_EDITOR";
export const TABLE_EDITOR = "TABLE_EDITOR";
export const FIGURE_MML = "MATH_ML_CHEM_EDITOR";
export const MULTI_COLUMN_GROUP = "GROUPED_CONTENT";
export const MULTI_COLUMN = "MULTI_COLUMN";
export const MULTI_COLUMN_3C = "MULTI_COLUMN_3C";
export const MMI_ELM = "MMI_ELM";
export const ACCESS_DENIED_CONTACT_ADMIN = "Access Denied! You do not have access to the Linked Alfresco site. please contact the Manager for this project";
export const ELEMENT_DIALOGUE = "ELEMENT_DIALOGUE";
export const ELEMENT_DISCUSSION = 'DISCUSSION';

/* PDF Slate */
export const ELEMENT_PDF = "ELEMENT_PDF";
/*-----------------Pop Dialog text-------------------------- */
export const ALREADY_USED_SLATE = "The following slate is already in use by another member."
export const ALREADY_USED_SLATE_TOC = "The slate is locked by another user and thus the slate cannot be deleted."
export const IN_USE_BY = "In use by: "
export const REMOVE_LINKED_AUDIO = "Do you want to remove the linked Audio Book with the slate?"
export const SPLIT_SLATE_WITH_ADDED_AUDIO = "There is an audio file linked with this slate. If you want to split the slate, you will need to re-do the narrative audio file for this slate and the newly generated split slate. Do you want to proceed with Split action?"
export const NOT_AUDIO_ASSET = "Selected alfresco media type is not an Audio."
export const LOCK_DURATION = 900000   //900000ms = 15mins
export const SYNTAX_HIGHLIGHTING = "Turning auto-highlighting on will clear any recent formatting in this content. Are you sure?"
export const REMOVE_LINKED_IMAGE_GLOSSARY = "Do you want to remove the linked Image with the slate?"
export const NOT_IMAGE_ASSET = "Selected alfresco media type is not an Image."
export const ERROR_CREATING_GLOSSARY = "You can not apply Glossary over multiple lines of stanza!!!"
export const ERROR_CREATING_ASSETPOPOVER = "You can not apply Asset PopOver over multiple lines of stanza!!!"
export const CHANGE_ASSESSMENT_TYPE="Changing the Assessment type will lead to a change in the Assessment picker options for this embedded assessment."
/*****************************TOC Delete Popup Dialog text***************************/
export const SINGLE_CONTAINER_DELETE = 'A project must have at least one Part/Chapter. Please add another Part/Chapter before deleting this one'
export const WITH_PENDING_TRACK = ' Are you sure you want to delete this slate/container with pending changes?'
export const WITH_PENDING_TRACK_NOTE_MESSAGE = 'Note:There will be no undo available after deletion'
export const SLATE_UNLINKING = 'Are you sure you want to unlink. This action can not be undone'
export const DELETE_DIALOG_TEXT = 'Are you sure you want to delete, This action cannot be undone?'

/*****************************TOC Delete message type */
export const TYPE_SINGLE_CONTAINER_DELETE = 'singleContainerDelete'
export const TYPE_WITH_PENDING_TRACK = 'withPendingTrack'
export const TYPE_UNLINK = 'unlink'
export const elementType = ['ASSESSMENT', 'ELEMENT_ASSESSMENT','WORKED_EXAMPLE', 'CONTAINER', 'SECTION_BREAK', 'TEXT', 'CITATION', 'ELEMENT_CITATION', 'POETRY', 'STANZA' , 'MULTI_COLUMN', 'MULTI_COLUMN_3C','POP_UP', "IMAGE", "VIDEO", "AUDIO", "MATH_ML_CHEM_EDITOR", "BLOCK_CODE_EDITOR", "INTERACTIVE", "MMI_ELM", "SMART_LINK", "SHOW_HIDE"];

export const CLONE_STATUS_INTERVAL = 2000
export const checkTCM = element => {
    if (element.type === 'groupedcontent' && element.groupeddata?.bodymatter?.length === 3) {
        return MULTI_COLUMN_3C;
    }
    switch(element.type) {
        case 'openerelement': return OPENER;

        case 'figure':
            switch(element.figuretype) {
                case 'tableasmarkup': return TABLE_EDITOR;
                case 'assessment': return ASSESSMENT;
                default: return TEXT;
            }
            
        case 'showhide': return SHOW_HIDE;

        case "element-aside": return CONTAINER;

        case "poetry": return POETRY;
        case "citations": return CITATION;
        case "groupedcontent": return MULTI_COLUMN;
        case "group": return MULTI_COLUMN_GROUP;
        case "workedexample" : return WORKED_EXAMPLE;
        case "popup" : return POP_UP;
        case "discussion" : return ELEMENT_DISCUSSION;
        default: return TEXT;
    }
}

export const elementDataByTag = {
    'P': {
        "inputType": "AUTHORED_TEXT",
        "inputSubType": "NA",
        "type": "TEXT"
    },
    'UL': {
        "inputType": "LIST",
        "inputSubType": "DISC",
        "type": "ELEMENT_LIST"
    },
    'OL': {
        "inputType": "LIST",
        "inputSubType": "DECIMAL",
        "type": "ELEMENT_LIST"
    },
    'H1': {
        "inputType": "HEADERS",
        "inputSubType": "H1",
        "type": "TEXT"
    },
    'H2': {
        "inputType": "HEADERS",
        "inputSubType": "H2",
        "type": "TEXT"
    },
    'H3': {
        "inputType": "HEADERS",
        "inputSubType": "H3",
        "type": "TEXT"
    },
    'H4': {
        "inputType": "HEADERS",
        "inputSubType": "H4",
        "type": "TEXT"
    },
    'H5': {
        "inputType": "HEADERS",
        "inputSubType": "H5",
        "type": "TEXT"
    },
    'H6': {
        "inputType": "HEADERS",
        "inputSubType": "H6",
        "type": "TEXT"
    }
}