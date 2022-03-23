
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
    'Equation': 'equationsIndex',
    'Audio': 'audioIndex',
    'Video': 'videoIndex',
    'Aside': 'asideIndex',
    'Worked Example': 'workedExampleIndex',
    "Interactive": 'interactiveIndex',
    'Exhibit': 'exhibitsIndex'
}

export const autoNumber_FigureTypeKeyMapper = {
  'image': 'figureImageIndex',
  'table': 'tableIndex',
  'mathImage': 'equationsIndex',
  'audio': 'audioIndex',
  'video': 'videoIndex',
  "interactive": 'interactiveIndex',
  'authoredtext': 'equationsIndex',
  'codelisting': 'exhibitsIndex'
}

export const autoNumber_IndexMapper = {
  'imagesList': 'figureImageIndex',
  'tablesList': 'tableIndex',
  'equationsList': 'equationsIndex',
  'audiosList': 'audioIndex',
  'videosList': 'videoIndex',
  'asidesList': 'asideIndex',
  'workedExamplesList': 'workedExampleIndex',
  'interactiveList': 'interactiveIndex',
  'exhibitsList': 'exhibitsIndex'
}

export const autoNumber_ElementTypeKey = {
  'Figure': 'imagesList',
  'Table': 'tablesList',
  'Equation': 'equationsList',
  'Audio': 'audiosList',
  'Video': 'videosList',
  'Interactive': 'interactiveList',
  'Aside': 'asidesList',
  "Worked Example": "workedExamplesList",
  'Exhibit': 'exhibitsList'
}

export const autoNumber_response_ElementType_mapper = {
  "figures":"imagesList",
  "tables":"tablesList",
  "equations":"equationsList",
  "audios":"audiosList",
  "videos":"videosList",
  "interactives":"interactiveList",
  "asides": "asidesList",
  "workedExamples": "workedExamplesList",
  'exhibits': 'exhibitsList'
}

export const moduleTypes = ['module', 'appendix']
export const slateTypes = ["section", "assessment-slate", "cover", 'titlepage', 'copyright', 'listofcontents', 'appendixslate', 'pdfslate', 'container-introduction']

export const containerElements = {
  ASIDE: 'element-aside',
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
  ELEMENT_ASIDE: 'element-aside'
}

export const autoNumber_ElementSubTypeToCeateKeysMapper = {
  'sidebar': 'CONTAINER',
  'workedexample': 'WORKED_EXAMPLE',
}

export const autoNumber_ElementTypeToStoreKeysMapper = {
  'IMAGE': 'imagesList',
  'FIGURE': 'imagesList',
  'TABLE': 'tablesList',
  'EQUATION': 'equationsList',
  'AUDIO': 'audiosList',
  'VIDEO': 'videosList',
  'MATHIMAGE': 'equationsList',
  'CONTAINER': 'asidesList',
  'WORKED_EXAMPLE': 'workedExamplesList',
  'MMI_ELM': 'interactiveList',
  'INTERACTIVE': 'interactiveList',
  'SMART_LINK': 'interactiveList',
  'TABLE_EDITOR': 'tablesList',
  'MATH_ML_CHEM_EDITOR': 'equationsList',
  'TABLEASMARKUP': 'tablesList',
  'AUTHOREDTEXT': 'equationsList',
  'BLOCK_CODE_EDITOR': 'exhibitsList',
  'CODELISTING': 'exhibitsList'
}
export const SIDEBAR = "sidebar"
export const TACTIC = "Tactic"
export const WORKED_EXAMPLE = "workedexample"
export const autoNumberContainerTypesAllowed = ['element-aside']
export const containerElementTypes = ['popup', 'showhide', 'groupedcontent', 'element-aside'];
export const autoNumberFigureTypesAllowed = ['audio', 'video', 'image', 'table', 'mathImage', 'interactive', 'tableasmarkup', 'authoredtext', 'codelisting']
export const autoNumberFigureTypesForConverion = ['IMAGE', 'TABLE', 'MATH', 'AUDIO', 'VIDEO', 'SMART_LINK', 'CONTAINER', 'WORKED_EXAMPLE', 'TABLE_EDITOR', 'MATH_ML_CHEM_EDITOR', 'BLOCK_CODE_EDITOR'];
export const displayLabelsForAutonumbering = ['Figure', 'Table', 'Equation', 'Audio', 'Video', 'Interactive', 'Exhibit']
export const displayLabelsForImage = ['Figure', 'Table', 'Equation']
export const displayLabelsForAudioVideo = ['Audio', 'Video'];
export const displayLabelsForContainer = ['Aside', 'Worked Example'];
export const ELEMENT_TYPES_FOR_AUTO_NUMBER = ['IMAGE', 'VIDEO', 'INTERACTIVE', 'SMART_LINK', 'MMI_ELM', 'CONTAINER', 'WORKED_EXAMPLE', 'TABLE_EDITOR', 'MATH_ML_CHEM_EDITOR', 'BLOCK_CODE_EDITOR'];
export const autoNumberFieldsPlaceholders = ['Number', 'Label', 'Label Name']
export const autoNumberContainerTypeForDelete = ['element-aside', 'container']