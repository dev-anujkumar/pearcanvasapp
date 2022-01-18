
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
    "Interactive": 'interactiveIndex'
}

export const autoNumber_FigureTypeKeyMapper = {
  'image': 'figureImageIndex',
  'table': 'tableIndex',
  'mathImage': 'equationsIndex',
  'audio': 'audioIndex',
  'video': 'videoIndex'
}

export const autoNumber_KeyMapperElements = {
  'Figure': 'imagesList',
  'Table': 'property',
  'Equation': 'equationsList',
  'Audio': 'audiosList',
  'Video': 'videosList'
}


export const autoNumber_IndexMapper = {
  'imagesList': 'figureImageIndex',
  'tablesList': 'tableIndex',
  'equationsList': 'equationsIndex',
  'audiosList': 'audioIndex',
  'videosList': 'videoIndex',
  'interactiveList': 'interactiveIndex'
}

export const autoNumber_ElementTypeKey = {
  'Figure': 'imagesList',
  'Table': 'tablesList',
  'Equation': 'equationsList',
  'Audio': 'audiosList',
  'Video': 'videosList'
}

export const autoNumber_response_ElementType_mapper = {
  "figures":"imagesList",
  "tables":"tablesList",
  "equations":"equationsList",
  "audios":"audiosList",
  "videos":"videosList",
  "interactives":"interactiveList",
  "asides": "asidesList",
  "workedExamples": "workedExamplesList"
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
  INTERACTIVE: "Interactive"
}

export const ELEMENT_TYPES = {
  FIGURE: 'figure'
}

export const autoNumber_ElementTypeToStoreKeysMapper = {
  'IMAGE': 'imagesList',
  'FIGURE': 'imagesList',
  'TABLE': 'tablesList',
  'EQUATION': 'equationsList',
  'AUDIO': 'audiosList',
  'VIDEO': 'videosList',
  'MATHIMAGE': 'equationsList',
  'MMI_ELM': 'interactiveList',
  'INTERACTIVE': 'interactiveList',
  'SMART_LINK': 'interactiveList'
}

export const autoNumberFigureTypesAllowed = ['audio', 'video', 'image', 'table', 'mathImage']
export const autoNumberFigureTypesForConverion = ['IMAGE', 'TABLE', 'MATH', 'AUDIO', 'VIDEO']
export const displayLabelsForAutonumbering = ['Figure', 'Table', 'Equation', 'Audio', 'Video']
export const displayLabelsForImage = ['Figure', 'Table', 'Equation']
export const displayLabelsForAudioVideo = ['Audio', 'Video']