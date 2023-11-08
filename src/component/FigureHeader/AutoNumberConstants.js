import { ELEMENT_ASIDE } from "../../constants/Element_Constants"

export const autoNumberElementsAllowed = ['figure']
export const LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES = {
    AUTO_NUMBER_SETTING_DEFAULT: 'Default Auto-number',
    AUTO_NUMBER_SETTING_RESUME_NUMBER: 'Resume numbering with',
    AUTO_NUMBER_SETTING_REMOVE_NUMBER: 'Remove label & number',
    AUTO_NUMBER_SETTING_OVERRIDE_NUMBER: 'Override number only',
    AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER: 'Override label & number'
}

export const autoNumber_KeyMapper = {
    'Figure': 'figureImageIndex',
    'Table': 'tableIndex',
    'Equation': 'equationIndex',
    'Audio': 'audioIndex',
    'Video': 'videoIndex',
    'Aside': 'asideIndex',
    'Worked Example': 'workedExampleIndex',
    "Interactive": 'interactiveIndex',
    'Exhibit': 'exhibitIndex'
}

export const autoNumber_FigureTypeKeyMapper = {
  'image': 'figureImageIndex',
  'table': 'tableIndex',
  'mathImage': 'equationIndex',
  'audio': 'audioIndex',
  'video': 'videoIndex',
  "interactive": 'interactiveIndex',
  'authoredtext': 'equationIndex',
  'codelisting': 'exhibitIndex'
}

export const autoNumber_IndexMapper = {
  'imageList': 'figureImageIndex',
  'tableList': 'tableIndex',
  'equationList': 'equationIndex',
  'audioList': 'audioIndex',
  'videoList': 'videoIndex',
  'asideList': 'asideIndex',
  'workedExampleList': 'workedExampleIndex',
  'interactiveList': 'interactiveIndex',
  'exhibitList': 'exhibitIndex'
}

export const autoNumber_ElementTypeKey = {
  'Figure': 'imageList',
  'Table': 'tableList',
  'Equation': 'equationList',
  'Audio': 'audioList',
  'Video': 'videoList',
  'Interactive': 'interactiveList',
  'Aside': 'asideList',
  "Worked Example": "workedExampleList",
  'Exhibit': 'exhibitList'
}

export const autoNumber_response_ElementType_mapper = {
  "figure":"imageList",
  "table":"tableList",
  "equation":"equationList",
  "audio":"audioList",
  "video":"videoList",
  "interactive":"interactiveList",
  "aside": "asideList",
  "workedExample": "workedExampleList",
  'exhibit': 'exhibitList'
}

export const moduleTypes = ['module', 'appendix']
export const slateTypes = ["section", "assessment-slate", "cover", 'titlepage', 'copyright', 'listofcontents', 'appendixslate', 'pdfslate', 'container-introduction']

export const containerElements = {
  ASIDE: ELEMENT_ASIDE,
  POPUP: 'popup',
  SHOW_HIDE: 'showhide',
  MULTI_COLUMN: 'groupedcontent',
  MANIFEST: 'manifest',
  GROUP: "group"
}
export const SHOWHIDE_SECTION = {
  SHOW: 'show',
  HIDE: 'hide'
}
export const MATTER_TYPES = {
    FRONTMATTER  : 'FrontMatter',
    BACKMATTER  : 'BackMatter',
    BODYMATTER  : 'BodyMatter'
  }

export const CONTAINER_LABELS = {
  FRONTMATTER  : 'frontMatter',
  BACKMATTER  : 'backMatter',
  BODYMATTER  : 'BodyMatter',
  CONTAINER_INTRO  : 'container-introduction',
  VOLUME  : 'volume',
  PART  : 'part',
  CHAPTER  : 'chapter',
  MODULE  : 'module',
  APPENDIX_MOD  : 'appendix'
}

export const AUTO_NUMBER_PROPERTIES = {
    NUMBERED_AND_LABEL  : 'numberedandlabel',
    MANUAL_OVERRIDE  : 'manualoverride',
    OVERRIDE_NUMBER_VALUE  : 'overridenumbervalue',
    RESUME_NUMBER_VALUE  : 'resumenumbervalue',
    OVERRIDE_LABEL_VALUE  : 'overridelabelvalue',
  }

export const AUTO_NUMBER_ELEMENTS = {
  AUDIO: "AUDIO",
  VIDEO: "VIDEO",
  IMAGE: "IMAGE",
  TABLE_IMAGE: "TABLE_IMAGE",
  MATH_IMAGE: "MATH_IMAGE",
  INTERACTIVES: "INTERACTIVES"
}

export const DISPLAYED_LABELS = {
  AUDIO: "Audio",
  VIDEO: "Video",
  IMAGE: "Figure",
  TABLE: "Table",
  EQUATIONS: "Equation",
  INTERACTIVE: "Interactive",
  EXHIBITS: "Exhibit"
}

export const ELEMENT_TYPES = {
  FIGURE: 'figure',
  ELEMENT_ASIDE: ELEMENT_ASIDE
}

export const autoNumber_ElementSubTypeToCeateKeysMapper = {
  'sidebar': 'CONTAINER',
  'workedexample': 'WORKED_EXAMPLE',
}

export const autoNumber_ElementTypeToStoreKeysMapper = {
  'IMAGE': 'imageList',
  'FIGURE': 'imageList',
  'TABLE': 'tableList',
  'EQUATION': 'equationList',
  'AUDIO': 'audioList',
  'VIDEO': 'videoList',
  'MATHIMAGE': 'equationList',
  'CONTAINER': 'asideList',
  'WORKED_EXAMPLE': 'workedExampleList',
  'MMI_ELM': 'interactiveList',
  'INTERACTIVE': 'interactiveList',
  'SMART_LINK': 'interactiveList',
  'TABLE_EDITOR': 'tableList',
  'MATH_ML_CHEM_EDITOR': 'equationList',
  'TABLEASMARKUP': 'tableList',
  'AUTHOREDTEXT': 'equationList',
  'BLOCK_CODE_EDITOR': 'exhibitList',
  'CODELISTING': 'exhibitList'
}
export const SIDEBAR = "sidebar"
export const TACTIC = "Tactic"
export const WORKED_EXAMPLE = "workedexample"
export const autoNumberContainerTypesAllowed = [ELEMENT_ASIDE]
export const containerElementTypes = ['popup', 'showhide', 'groupedcontent', ELEMENT_ASIDE, 'group'];
export const autoNumberFigureTypesAllowed = ['audio', 'video', 'image', 'table', 'mathImage', 'interactive', 'tableasmarkup', 'authoredtext', 'codelisting']
export const autoNumberFigureTypesForConverion = ['IMAGE', 'TABLE', 'MATH', 'AUDIO', 'VIDEO', 'SMART_LINK', 'CONTAINER', 'WORKED_EXAMPLE', 'TABLE_EDITOR', 'MATH_ML_CHEM_EDITOR', 'BLOCK_CODE_EDITOR'];
export const displayLabelsForAutonumbering = ['Figure', 'Table', 'Equation', 'Audio', 'Video', 'Interactive', 'Exhibit']
export const displayLabelsForImage = ['Figure', 'Table', 'Equation']
export const displayLabelsForAudioVideo = ['Audio', 'Video'];
export const displayLabelsForContainer = ['Aside', 'Worked Example'];
export const ELEMENT_TYPES_FOR_AUTO_NUMBER = ['IMAGE', 'VIDEO', 'INTERACTIVE', 'SMART_LINK', 'MMI_ELM', 'CONTAINER', 'WORKED_EXAMPLE', 'TABLE_EDITOR', 'MATH_ML_CHEM_EDITOR', 'BLOCK_CODE_EDITOR'];
export const autoNumberFieldsPlaceholders = ['Number', 'Label', 'Label Name']
export const autoNumberContainerTypeForDelete = [ELEMENT_ASIDE, 'container']
export const convertToDefaultNumberType = ['TABLE', 'MATHIMAGE']
