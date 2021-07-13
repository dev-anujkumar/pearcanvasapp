export const FETCH_SLATE_DATA = 'FETCH_SLATE_DATA'
export const SET_ACTIVE_ELEMENT = 'SET_ACTIVE_ELEMENT'
export const GET_PAGE_NUMBER = 'GET_PAGE_NUMBER'

export const SET_UPDATED_SLATE_TITLE = 'SET_UPDATED_SLATE_TITLE'
export const SET_SLATE_TYPE = 'SET_SLATE_TYPE'
export const SET_SLATE_ENTITY = 'SET_SLATE_ENTITY'
export const SET_PARENT_NODE = 'SET_PARENT_NODE'
export const FETCH_DATA_ON_SLATE_REFRESH= 'FETCH_DATA_ON_SLATE_REFRESH'
export const ACCESS_DENIED_POPUP = 'ACCESS_DENIED_POPUP' 
export const SET_PARENT_ASIDE_DATA = "SET_PARENT_ASIDE_DATA"
export const SET_PARENT_SHOW_DATA = "SET_PARENT_SHOW_DATA"
export const GET_ALL_SLATES_DATA = "GET_ALL_SLATES_DATA"
export const SET_CURRENT_SLATE_DATA = "SET_CURRENT_SLATE_DATA"
export const SHOW_TOAST_MESSAGE = 'SHOW_TOAST_MESSAGE'
export const SET_TOAST_MESSAGE = 'SET_TOAST_MESSAGE'
/*---------------Comments Panel ----------------------*/
export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const TOGGLE_COMMENTS_PANEL = 'TOGGLE_COMMENTS_PANEL'
export const REPLY_COMMENT = 'REPLY_COMMENT'
export const FETCH_COMMENT_BY_ELEMENT = "FETCH_COMMENT_BY_ELEMENT"
export const RESOLVE_COMMENT = "RESOLVE_COMMENT"
export const TOGGLE_REPLY = "TOGGLE_REPLY"
export const UPDATE_COMMENT = "UPDATE_COMMENT"
export const GET_PROJECT_USER = "GET_PROJECT_USER"
export const UPDATE_ASSIGNEE = "UPDATE_ASSIGNEE"
export const DELETE_COMMENT = "DELETE_COMMENT";
export const ADD_NEW_COMMENT = "ADD_NEW_COMMENT"

/*---------------Element Creation ----------------------*/
export const AUTHORING_ELEMENT_CREATED = "AUTHORING_ELEMENT_CREATED"
export const ASSESSMENT_ELEMENT_CREATED = "ASSESSMENT_ELEMENT_CREATED"
export const VIDEO_ELEMENT_CREATED = 'VIDEO_ELEMENT_CREATED'
export const FIGURE_ELEMENT_CREATED = "FIGURE_ELEMENT_CREATED"
export const INTERACTIVE_ELEMENT_CREATED = "INTERACTIVE_ELEMENT_CREATED"

/*---------------Element Updation ----------------------*/
export const AUTHORING_ELEMENT_UPDATE = "AUTHORING_ELEMENT_UPDATE"
export const SET_OLD_IMAGE_PATH = "SET_OLD_IMAGE_PATH"
/*---------------Element Container ----------------------*/
export const DELETE_ELEMENT = "DELETE_ELEMENT"
export const OPEN_GLOSSARY_FOOTNOTE = "OPEN_GLOSSARY_FOOTNOTE"
export const ADD_GLOSSARY_FOOTNOTE = "ADD_GLOSSARY_FOOTNOTE"
export const UPDATE_FOOTNOTEGLOSSARY = "UPDATE_FOOTNOTEGLOSSARY"

/*-----------------Toolbar----------------------------*/
export const TOGGLE_BORDERS = 'TOGGLE_BORDERS'
export const TOGGLE_PAGE_NUMBER = 'TOGGLE_PAGE_NUMBER'


/*---------------Slate Lock -------------------*/
export const SET_SLATE_LOCK_STATUS = "SET_SLATE_LOCK_STATUS"
export const SET_LOCK_FLAG = "SET_LOCK_FLAG"

/*---------------Swap Element -------------------*/
export const SWAP_ELEMENT = 'SWAP_ELEMENT'

/*--------------- Split Slate -------------------*/
export const SET_SPLIT_INDEX = 'SET_SPLIT_INDEX'

/*--------------- Slate Tag(MetaData Anchor) -------------------*/
export const CURRENT_SLATE_LO_DATA = 'CURRENT_SLATE_LO_DATA'
export const SLATE_TAG_ENABLE = 'SLATE_TAG_ENABLE'
export const SHOW_MODULE_NAME = 'SHOW_MODULE_NAME'
export const CURRENT_SLATE_LO_DATA_MATH = 'CURRENT_SLATE_LO_DATA_MATH'
export const SHOW_SLATE_LOCK_POPUP = 'SHOW_SLATE_LOCK_POPUP'
export const RE_RENDER_META_LO = 'RE_RENDER_META_LO'
export const PROJECT_LEARNING_FRAMEWORKS = 'PROJECT_LEARNING_FRAMEWORKS'
export const CURRENT_SLATE_LF = 'CURRENT_SLATE_LF'
export const TOGGLE_LO_WARNING_POPUP = 'TOGGLE_LO_WARNING_POPUP';
/*--------------- Asset Popover -------------------*/
export const APO_SEARCH_SAVE = 'APO_SEARCH_SAVE'
export const APO_BUTTON = 'APO_BUTTON'
export const TOGGLE_APO_SEARCH = 'TOGGLE_APO_SEARCH'
export const REMOVE_ASSET_LINK = 'REMOVE_ASSET_LINK'
export const USE_STATE_IMAGE_DATA = 'USE_STATE_IMAGE_DATA'
export const IMAGES_FROM_API = 'IMAGES_FROM_API'
export const IMAGES_FROM_API_FAIL = 'IMAGES_FROM_API_FAIL'

/*--------------- Learning Tool -------------------*/
export const LT_API_RESULT = "LT_API_RESULT"
export const LT_API_RESULT_FAIL = "LT_API_RESULT_FAIL"
export const SELECTED_FIGURE = "SELECTED_FIGURE"
export const PAGINATION = "PAGINATION"
export const LEARNING_TOOL_DIS_VALUE = "LEARNING_TOOL_DIS_VALUE"
export const TOGGLE_LT_POPUP = "TOGGLE_LT_POPUP"
export const GET_DISCIPLINE = "GET_DISCIPLINE"
export const REMOVE_SELECTED_DATA = "REMOVE_SELECTED_DATA"
export const LINK_BUTTON_DISABLE = "LINK_BUTTON_DISABLE"
export const LT_TYPE_FILTER_SELECTED = "LT_TYPE_FILTER_SELECTED"
export const GET_LEARNING_SYSTEMS = "GET_LEARNING_SYSTEMS"
export const SET_LT_LA_SEARCH_LOADING = "SET_LT_LA_SEARCH_LOADING"
/*--------------- User Role -------------------*/
export const GET_PROJECT_PERMISSIONS = 'GET_PROJECT_PERMISSIONS'

/*--------------- Page Numbering -------------------*/
export const UPDATE_PAGENUMBER_SUCCESS = 'UPDATE_PAGENUMBER_SUCCESS'
export const PAGE_NUMBER_LOADER = 'PAGE_NUMBER_LOADER'
export const UPDATE_PAGENUMBER = 'UPDATE_PAGENUMBER'
export const UPDATE_PAGENUMBER_FAIL = 'UPDATE_PAGENUMBER_FAIL'

/*--------------- Audio Narration -------------------*/
export const OPEN_AUDIO_NARRATION = 'OPEN_AUDIO_NARRATION'
export const SHOW_REMOVE_POPUP = 'SHOW_REMOVE_POPUP'
export const SPLIT_REMOVE_POPUP = 'SPLIT_REMOVE_POPUP'
export const CURRENT_SLATE_AUDIO_NARRATION = 'CURRENT_SLATE_AUDIO_NARRATION'
export const ADD_AUDIO_NARRATION = 'ADD_AUDIO_NARRATION'
export const WRONG_AUDIO_REMOVE_POPUP = 'WRONG_AUDIO_REMOVE_POPUP'
export const OPEN_POPUP_SLATE = "OPEN_POPUP_SLATE"
export const CLOSE_POPUP_SLATE = "CLOSE_POPUP_SLATE"
export const ERROR_POPUP = 'ERROR_POPUP'
export const MULTIPLE_LINE_POETRY_ERROR_POPUP = 'MULTIPLE_LINE_POETRY_ERROR_POPUP'
export const CREATE_SHOW_HIDE_ELEMENT = "CREATE_SHOW_HIDE_ELEMENT"
export const DELETE_SHOW_HIDE_ELEMENT = "DELETE_SHOW_HIDE_ELEMENT"
export const OPEN_AUDIO_GLOSSARY_POPUP = 'OPEN_AUDIO_GLOSSARY_POPUP'
export const ADD_AUDIO_GLOSSARY_POPUP ='ADD_AUDIO_GLOSSARY_POPUP'
export const HANDLE_GLOSSARY_AUDIO_DATA = 'HANDLE_GLOSSARY_AUDIO_DATA'

/*--------------- Slate Title -------------------*/
export const SLATE_TITLE = 'Untitled'
/*--------------- TCM Snapshot -------------------*/
export const GET_TCM_RESOURCES = 'GET_TCM_RESOURCES'
export const GET_TCM_STATUS_OF_PROJECT = 'GET_TCM_STATUS_OF_PROJECT'
export const STORE_OLD_ASSET_FOR_TCM = 'STORE_OLD_ASSET_FOR_TCM'

/*--------------- Long Slate load ----------------*/
export const SET_SLATE_LENGTH = 'SET_SLATE_LENGTH'

/*--------------- Assessments ----------------*/
export const GET_USAGE_TYPE = "GET_USAGE_TYPE"
export const SET_ASSESSMENT_METADATA = "SET_ASSESSMENT_METADATA"
export const RESET_ASSESSMENT_STORE = "RESET_ASSESSMENT_STORE"
export const ELM_PORTAL_API_ERROR = "ELM_PORTAL_ERROR"
export const ASSESSMENT_CONFIRMATION_POPUP = "ASSESSMENT_CONFIRMATION_POPUP"
export const UPDATE_ELM_ITEM_ID = "UPDATE_ELM_ITEM_ID"
export const SAVE_AUTO_UPDATE_ID = 'SAVE_AUTO_UPDATE_ID'
export const ELM_ASSESSMENT_EDIT_ID = "ELM_ASSESSMENT_EDIT_ID"
export const SET_ITEM_UPDATE_EVENT = 'SET_ITEM_UPDATE_EVENT'
export const ELM_ITEM_EVENT_DATA = 'ELM_ITEM_EVENT_DATA'
export const ELM_NEW_ITEM_DATA = "ELM_NEW_ITEM_DATA"
export const SET_USAGE_TYPE = "SET_USAGE_TYPE"
export const SET_INTERACTIVE_METADATA = "SET_INTERACTIVE_METADATA"
export const SET_ELM_PICKER_MSG = "SET_ELM_PICKER_MSG"
/* --------------- Selection Constants ------------------------*/
export const SET_SELECTION = 'SET_SELECTION'

/* --------------- Wiris Alt Text ------------------------*/
export const WIRIS_ALT_TEXT_POPUP = 'WIRIS_ALT_TEXT_POPUP';

/* --------------- TCM Versioning ------------------------*/
export const VERSIONING_SLATEMANIFEST = "VERSIONING_SLATEMANIFEST"

/* --------------- Learnosity Project ------------------------*/
export const LEARNOSITY_PROJECT_INFO = "LEARNOSITY_PROJECT_INFO"

/* --------------- Alfresco Project ------------------------*/
export const SET_ALFRESCO_POPUP = "SET_ALFRESCO_POPUP"
export const SAVE_ALFRESCO_ASSET_DATA = "SAVE_ALFRESCO_ASSET_DATA"
export const SAVE_INLINE_IMAGE_DATA = "SAVE_INLINE_IMAGE_DATA"

/* ---------------  Figure Glossary ------------------------*/
export const SET_FIGURE_GLOSSARY = "SET_FIGURE_GLOSSARY";
export const ADD_FIGURE_GLOSSARY_POPUP = 'ADD_FIGURE_GLOSSARY_POPUP';
export const WRONG_IMAGE_POPUP = 'WRONG_IMAGE_POPUP'
export const SHOW_REMOVE_GLOSSARY_IMAGE = 'SHOW_REMOVE_GLOSSARY_IMAGE'

/*---------------- Cypress Project Info ------------------------*/
export const UPDATE_PROJECT_INFO = 'UPDATE_PROJECT_INFO';
export const UPDATE_DISCUSSION_ITEMS = 'UPDATE_DISCUSSION_ITEMS';
export const UPDATE_USAGE_TYPE = 'UPDATE_USAGE_TYPE';
export const UPDATE_LOB_PERMISSIONS = 'UPDATE_LOB_PERMISSIONS';

/*---------------- TCM POPUP ON CANVAS ------------------------*/
export const LAUNCH_TCM_CANVAS_POPUP = 'LAUNCH_TCM_CANVAS_POPUP';
/*---------------- 3Column details Info ------------------------*/
export const UPDATE_MULTIPLE_COLUMN_INFO = 'UPDATE_MULTIPLE_COLUMN_INFO';
/*---------------- spinner Info ------------------------*/
export const SPINNER = 'SPINNER';
