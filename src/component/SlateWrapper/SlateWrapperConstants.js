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
export const BLOCKLIST = "BLOCK_LIST";
export const TABLE_EDITOR = "TABLE_EDITOR";
export const FIGURE_MML = "MATH_ML_CHEM_EDITOR";
export const MULTI_COLUMN_GROUP = "GROUPED_CONTENT";
export const MULTI_COLUMN = "MULTI_COLUMN";
export const MULTI_COLUMN_3C = "MULTI_COLUMN_3C";
export const TABBED_2_COLUMN = "TABBED_2_COLUMN";
export const TABBED_COLUMN_TAB = "TABBED_COLUMN_TAB";
export const MMI_ELM = "MMI_ELM";
export const ACCESS_DENIED_CONTACT_ADMIN = "Access Denied! You do not have access to the Linked Alfresco site. please contact the Manager for this project";
export const ELEMENT_DIALOGUE = "ELEMENT_DIALOGUE";
export const ELEMENT_DISCUSSION = 'DISCUSSION';
export const MANIFEST_LIST = 'MANIFEST_LIST';
export const MANIFEST_LIST_ITEM = 'MANIFEST_LIST_ITEM';

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
export const CHANGE_ASSESSMENT_TYPE="Changing the Assessment type will lead to a change in the Assessment picker options for this embedded assessment.";
export const OWNER_SLATE_POPUP ="If you make a change to this content, it will apply to all its children. Do you still want to proceed?";
export const DO_NOT_SHOW_TXT="Do not show this message again";
export const DONT_ASK_TEXT = "Don't ask me again";
export const ERROR_DELETING_MANIFEST_LIST_ITEM="The list item can not be deleted if it contains a child Block List. Please delete the child Block List to complete the delete action.";
export const APPROVE_NORMAL_SLATE="The slate is currently in approved status (published title). Do you want to move it to Work in Progress status in order to make a change?"
export const APPROVE_OWNER_SLATE="The slate is currently in approved status (published title). Any change to this content will apply to all its children (subscribed titles). Do you want to move it to Work in Progress status in order to make a change?"
export const SET_AS_DECORATIVE_IMAGE = "Decorative images are images that are not meant to convey meaning or important information."
export const SET_AS_DECORATIVE_IMAGE_AUTONUM = "Changing the image type will reset the following image data: label & number settings, label value, number, preview, title, caption, alt text and long description."
export const SET_AS_DECORATIVE_IMAGE_NON_AUTONUM = "Changing the image type will reset the following image data: label value, number, title, caption, alt text and long description."
export const SET_AS_DECORATIVE_IMAGE_NOTE = "Please note that it will also remove the title from figure linking search results."
/*****************************TOC Delete Popup Dialog text***************************/
export const SINGLE_CONTAINER_DELETE = 'A project must have at least one Part/Chapter. Please add another Part/Chapter before deleting this one'
export const WITH_PENDING_TRACK = ' Are you sure you want to delete this slate/container with pending changes?'
export const WITH_PENDING_TRACK_NOTE_MESSAGE = 'Note:There will be no undo available after deletion'
export const SLATE_UNLINKING = 'Are you sure you want to unlink. This action can not be undone'
export const DELETE_DIALOG_TEXT = 'Are you sure you want to delete? This action cannot be undone.'

/*****************************TOC Delete message type */
export const TYPE_SINGLE_CONTAINER_DELETE = 'singleContainerDelete'
export const TYPE_WITH_PENDING_TRACK = 'withPendingTrack'
export const TYPE_UNLINK = 'unlink'
export const elementType = ['ASSESSMENT', 'ELEMENT_ASSESSMENT','WORKED_EXAMPLE', 'CONTAINER', 'SECTION_BREAK', 'TEXT', 'CITATION', 'ELEMENT_CITATION', 'POETRY', 'STANZA' , 'MULTI_COLUMN', 'MULTI_COLUMN_3C','POP_UP', "IMAGE", "VIDEO", "AUDIO", "MATH_ML_CHEM_EDITOR", "BLOCK_CODE_EDITOR", "INTERACTIVE", "MMI_ELM", "SMART_LINK", "SHOW_HIDE", "ELEMENT_PDF", "MANIFEST_LIST"];
export const DELETE_INSTRUCTION_FOR_TCM = 'Are you sure you want to delete this? This can only be reverted via TCM.'

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
        case "element-dialogue" : return ELEMENT_DIALOGUE;
        case "manifestlist": return BLOCKLIST;
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

export const childNodeTagsArr = ['strong', 'em', 'u', 's', 'sub', 'sup', 'code']
export const allowedClassName = ['calloutone', 'callouttwo', 'calloutthree', 'calloutfour', 'markedforindex', 'pearson-component glossaryterm']
export const UNSUPPORTED_CONTENT_ERR_MSG = "Unsupported Content found which will not be pasted."
export const ALLOWED_SLATES_IN_RC = ['section','appendixslate']
export const stanzaIndentClassList = ['poetryLine poetryLineLevel1', 'poetryLine poetryLineLevel2', 'poetryLine poetryLineLevel3' ]

/**** Banner messages for approved and subscriber case ****/
export const SUBSCRIBER_BANNER_MESSAGE = "Read-only | Subscribed Slate"
export const APPROVED_BANNER_MESSAGE1 = "Read-only | Approved Content"
export const APPROVED_BANNER_MESSAGE2 = "- Editing content will create a new version of this slate"
export const EDIT_CONTENT_BTN = "Edit Content"
/************************************************************************************/
export const SLATES_DEFAULT_LABEL = {
    'section':'Slate',
    'pdfslate':'PDF Slate',
    'container-introduction':'Introduction',
    'assessment':'Assessment',
    'cover':'Cover',
    'titlepage':'Title Page',
    'copyright':'Copyright',
    'listofcontents':'Contents',
    'appendixslate':'Appendix Slate',
    'ltislate':'LTI Slate'
}

/*** Sidebar constants ***/

export const CATEGORY = 'Category'
export const SUB_CATEGORY = 'Subcategory'
export const INTENDED_PLAYBACK_CATEGORY = 'Intended Playback Mode (web)'
export const MODAL_MESSAGE = 'Playback mode will always be Modal in a mobile app.'
export const  PRIMARY_SMARTLINK = 'primary-smartlink'
export const  SMARTLINK_ELEMENT_DROPDOWN_TITLE = 'smartlink-element-dropdown-title'
/**** Action messages for slate level save ****/
export const PROJECT_PREVIEW_ACTION = "click_on_project_preview_button"
export const CHANGE_SLATE_ACTION = "change_slate_focus"
export const REFRESH_BROWSER_ACTION = "refresh_browser"
export const SLATE_REFRESH_ACTION = "click_on_slate_refresh_button"
export const RELEASE_SLATE_LOCK_ACTION = "release_slate_lock"
/************************************************************************************/
export const SECONDARY_3PI_SMARTLINK = 'secondary-interactive-smartlink-third'
