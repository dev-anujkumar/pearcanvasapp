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
export const DEFAULT_VIDEO_POSTER_IMAGE = "https://d12m40tknrppbi.cloudfront.net/cite/images/FPO-audio_video.png"

/*---------------Element Single Assessment ----------------------*/ 
export const ASSESSMENT_USAGE_TYPE =['Quiz', 'Test', 'Practice', 'Homework', 'Diagnostic', 'Journal', 'Shared Writing', 'Concept Check', 'Non-Scored', 'Study Tool']
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
export const SECTION_BREAK_DELETE_TEXT="Are you sure you want to delete the section, the whole section will get deleted?"

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