/*--------------- Assessment Format Dropdown -------------------*/
export const assessmentFormats = {
    'puf': 'Full Assessment Elm',
    'cite': 'Full Assessment QuAD CITE',
    'tdx': 'Full Assessment TDX',
    'learningtemplate': 'Learning App Type',
    'learnosity': 'Full Assessment Learnosity',
}

/*--------------- Full Assessment Constants -------------------*/
export const FULL_ASSESSMENT_CITE = 'Full Assessment QuAD CITE'
export const FULL_ASSESSMENT_TDX = 'Full Assessment TDX'
export const FULL_ASSESSMENT_PUF = 'Full Assessment Elm'
export const LEARNING_APP_TYPE = 'Learning App Type'
export const FULL_ASSESSMENT_LEARNOSITY = 'Full Assessment Learnosity'

/*--------------- Assessment Format Constants -------------------*/
export const CITE = 'cite'
export const TDX = 'tdx'
export const PUF = 'puf'
export const LEARNING_TEMPLATE = 'learningtemplate'
export const LEARNOSITY = 'learnosity'

/*--------------- Interactive Format Constants -------------------*/
export const ELM_INT = "mmi-elm"
export const MMI = 'mmi'

/*--------------- Assessment Error Messages -------------------*/
export const ERROR_MESSAGE_ELM_RESOURCE = "This project has no Elm assessments currently. Please add an Elm assessment to this project first."
export const ERROR_MESSAGE_ELM_ITEMS = "No Data Found"
export const ERROR_MESSAGE_LEARNOSITY = "No Results Found"
export const ERROR_MESSAGE_ELM_DEFAULT = "**Error occured, Please try again!!!"
export const ERROR_MESSAGE_ELM_INTERACTIVES = "No Results Found"

/*--------------- Elm Component Constants -------------------*/
export const FolderLabelList = {
    'C':['chapter'],
    'M':['module','appendix'],
    'P':['part'],
    'S':['section'],
    'AS':['assessment'],
    'IS':['container-introduction','introductry-slate'] ,
}
export const ELM_UPDATE_BUTTON = 'Update Available'
export const ELM_NEW_VERSION_UPDATE = 'The new version has been placed'
export const ELM_UPDATE_POPUP_HEAD = 'Version Update'
export const ELM_PORTAL_ERROR_MSG = "Something went wrong. Please try again!"
export const ELM_UPDATE_MSG = 'Are you sure you want to update to the latest version available? It will not be possible to undo.'
export const ELM_EMBEDDED_NEW_VERSION_UPDATE = 'The new version has been placed and all other items from this Assessment have been updated.'
export const AUTO_UPDATE_FAIL_ERROR = 'Unable to Update Other Instances of this Assessment in the Project'

/*--------------- Container Constants -------------------*/
export const ELEMENT_FIGURE = 'figure'
export const FIGURE_ASSESSMENT = 'assessment'
export const ELEMENT_ASSESSMENT = 'element-assessment'
export const PRIMARY_SINGLE_ASSESSMENT = 'primary-single-assessment'
export const SECONDARY_SINGLE_ASSESSMENT = 'secondary-single-assessment-'
export const PRIMARY_SLATE_ASSESSMENT = 'primary-assessment-slate'
export const SECONDARY_SLATE_ASSESSMENT = 'secondary-assessment-'
export const FIGURE_INTERACTIVE = "interactive"
export const SECONDARY_SINGLE_ASSESSMENT_LEARNOSITY = 'secondary-single-assessment-learnosity'
export const DEFAULT_IMAGE_SOURCE = "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png"
export const SLATE_TYPE_ASSESSMENT = "assessment";

/*--------------- PDF Slate ----------------*/
export const ELEMENT_TYPE_PDF = "element-pdf";
export const SLATE_TYPE_PDF = "pdfslate";

/*--------------- Normal Slate - Section ----------------*/
export const SLATE_TYPE_SECTION = "section";

export const ASSESSMENT_PICKER_OPENERS = Object.freeze({
    FULL_ASSESSMENT:'slateAssessment',
    SINGLE_ASSESSMENT: 'singleAssessment',
    SINGLE_ASSESSMENT_OUTER:'singleSlateAssessment',
    SINGLE_ASSESSMENT_INNER:'singleSlateAssessmentInner'
})

export const Resource_Type = Object.freeze({
    ASSESSMENT: 'assessment',
    ASSESSMENT_ITEM: 'assessmentItem',
    INTERACTIVE: 'interactive'
});