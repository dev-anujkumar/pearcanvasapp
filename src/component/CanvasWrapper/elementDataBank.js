import { ELEMENT_AUTHOREDTEXT, PRIMARY_ASIDE_ASIDE, PRIMARY_BLOCKQUOTE, PRIMARY_LIST, PRIMARY_SMARTLINK, SECONDARY_IMAGE_FIGURE_HALF } from '../../constants/Element_Constants'
const elementDataBank = {

    "element-authoredtext" : {
        "elementType" : ELEMENT_AUTHOREDTEXT,
        "primaryOption" : "primary-paragraph",
        "secondaryOption" : "secondary-paragraph"
    },
     "manifestlist" : {
        "elementType" : "manifestlist",
        "primaryOption" : "primary-column-1",
        "secondaryOption" : "secondary-column-1"
    },
    "element-authoredtext-heading" : {
        "elementType" : ELEMENT_AUTHOREDTEXT,
        "primaryOption" : "primary-heading",
        // "secondaryOption" : "secondary-heading-{number}"
    },
    "element-authoredtext-handwriting" : {
        "elementType" : ELEMENT_AUTHOREDTEXT,
        "primaryOption" : "primary-handwriting",
        "secondaryOption" : "subtype-handwriting"
    },

    "element-blockfeature" : {
        "pullquote" : {
            "elementType" : ELEMENT_AUTHOREDTEXT,
            "primaryOption" : PRIMARY_BLOCKQUOTE,
            "secondaryOption" : "secondary-pullquote"
        },
        "blockquote" : {
            "elementType" : ELEMENT_AUTHOREDTEXT,
            "primaryOption" : PRIMARY_BLOCKQUOTE,
            "secondaryOption" : "secondary-marginalia"
        },
        "marginalia" : {
            "elementType" : ELEMENT_AUTHOREDTEXT,
            "primaryOption" : PRIMARY_BLOCKQUOTE,
            "secondaryOption" : "secondary-marginalia-attribution"
        }
    },

    "element-learningobjectives" : {
        "elementType" : ELEMENT_AUTHOREDTEXT,
        "primaryOption" : "primary-learning-objective",
        "secondaryOption" : "secondary-learning-objective"
    },

    "element-learningobjectivemapping" : {
        "elementType" : "",
        "primaryOption" : "",
        "secondaryOption" : "",
        "tag" : "LO"
    },

    "element-generateLOlist": {
        "elementType" : "",
        "primaryOption" : "",
        "secondaryOption" : "",
        "tag" : "MA"
    },

    "openerelement": {
        "elementType" : "openerelement",
        "primaryOption" : "primary-openerelement",
        "secondaryOption" : "secondary-openerelement",
        "tag" : "OE"
    },

    "element-list" : {
        "disc" : {
            "elementType" : ELEMENT_AUTHOREDTEXT,
            "primaryOption" : PRIMARY_LIST,
            "secondaryOption" : "secondary-list-1"
        },
        "decimal" : {
            "elementType" : ELEMENT_AUTHOREDTEXT,
            "primaryOption" : PRIMARY_LIST,
            "secondaryOption" : "secondary-list-2"
        },
        "upper-alpha" : {
            "elementType" : ELEMENT_AUTHOREDTEXT,
            "primaryOption" : PRIMARY_LIST,
            "secondaryOption" : "secondary-list-3"
        },
        "lower-alpha" : {
            "elementType" : ELEMENT_AUTHOREDTEXT,
            "primaryOption" : PRIMARY_LIST,
            "secondaryOption" : "secondary-list-4"
        },
        "upper-roman" : {
            "elementType" : ELEMENT_AUTHOREDTEXT,
            "primaryOption" : PRIMARY_LIST,
            "secondaryOption" : "secondary-list-5"
        },
        "lower-roman" : {
            "elementType" : ELEMENT_AUTHOREDTEXT,
            "primaryOption" : PRIMARY_LIST,
            "secondaryOption" : "secondary-list-6"
        },
        "none" : {
            "elementType" : ELEMENT_AUTHOREDTEXT,
            "primaryOption" : PRIMARY_LIST,
            "secondaryOption" : "secondary-list-7"
        }
    },

    "figure" : {
        "image" : {
            "elementType" : "figure",
            "primaryOption" : "primary-image-figure",
            "informalfigure" : {
                "secondaryOption" : SECONDARY_IMAGE_FIGURE_HALF
            },
            "image50Text" : {
                "secondaryOption" : SECONDARY_IMAGE_FIGURE_HALF
            },
            "imageTextWidth" : {
                "secondaryOption" : "secondary-image-figure-width"
            },
            "imageWiderThanText" : {
                "secondaryOption" : "secondary-image-figure-wider"
            },
            "imageFullscreen" : {
                "secondaryOption" : "secondary-image-figure-full"
            },
            "image25Text" : {
                "secondaryOption" : "secondary-image-figure-quarter"
            },
            "image75Text" : {
                "secondaryOption" : "secondary-image-figure-three-quarter"
            },
            "imageactualsize" : {
                "secondaryOption" : "secondary-image-figure-actual"
            }
        },
        "decorativeImage" : {
            "elementType" : "figure",
            "primaryOption" : "primary-image-decorative",
            "informalfigure" : {
                "secondaryOption" : SECONDARY_IMAGE_FIGURE_HALF
            },
            "image50Text" : {
                "secondaryOption" : SECONDARY_IMAGE_FIGURE_HALF
            },
            "imageTextWidth" : {
                "secondaryOption" : "secondary-image-figure-width"
            },
            "imageWiderThanText" : {
                "secondaryOption" : "secondary-image-figure-wider"
            },
            "imageFullscreen" : {
                "secondaryOption" : "secondary-image-figure-full"
            },
            "image25Text" : {
                "secondaryOption" : "secondary-image-figure-quarter"
            },
            "image75Text" : {
                "secondaryOption" : "secondary-image-figure-three-quarter"
            },
            "imageactualsize" : {
                "secondaryOption" : "secondary-image-figure-actual"
            }
        },
        "mathImage" : {
            "elementType" : "figure",
            "primaryOption" : "primary-image-equation",
            "image50TextMathImage" : {
                "secondaryOption" : "secondary-image-equation-half"
            },
            "imageTextWidthMathImage" : {
                "secondaryOption" : "secondary-image-equation-width"
            },
            "imageWiderThanTextMathImage" : {
                "secondaryOption" : "secondary-image-equation-wider"
            },
            "imageFullscreenMathImage" : {
                "secondaryOption" : "secondary-image-equation-full"
            },
            "imageactualsizeMathImage" : {
                "secondaryOption" : "secondary-image-equation-actual"
            }
        },
        "authoredtext" : {
            "elementType" : "figure",
            "primaryOption" : "primary-mathml-equation",
            "mathml" : {
                "secondaryOption" : "secondary-mathml-equation"
            }
        },
        "codelisting" : {
            "elementType" : "figure",
            "primaryOption" : "primary-blockcode-equation",
        },
        "tableasmarkup" : {
            "elementType" : "figure",
            "primaryOption" : "primary-editor-table-equation",
            "imageTextWidthTableEditor" : {
                "secondaryOption" : "secondary-editor-table-equation"
            },
            "image50TextEditorTable" : {
                "secondaryOption" : "secondary-editor-table-equation"
            }
        },
        "table" : {
            "elementType" : "figure",
            "primaryOption" : "primary-image-table",
            "image50TextTableImage" : {
                "secondaryOption" : "secondary-image-table-half"
            },
            "imageTextWidthTableImage" : {
                "secondaryOption" : "secondary-image-table-width"
            },
            "imageWiderThanTextTableImage" : {
                "secondaryOption" : "secondary-image-table-wider"
            },
            "imageFullscreenTableImage" : {
                "secondaryOption" : "secondary-image-table-full"
            },
            "imageactualsizeTableImage" : {
                "secondaryOption" : "secondary-image-table-actual"
            }
        },
        "video" : {
            "elementType" : "video-audio",
            "primaryOption" : "primary-video",
            "internal" : {
                "secondaryOption" : "secondary-video-alfresco"
            },
            "externallink" : {
                "secondaryOption" : "secondary-video-smartlink"
            },
        },
        "audio" : {
            "elementType" : "video-audio",
            "primaryOption" : "primary-audio",
            "internal" : {
                "secondaryOption" : "secondary-audio-alfresco"
            },
            "externallink" : {
                "secondaryOption" : "secondary-audio-smartlink"
            },
        },
        "interactive": {
            "elementType": "element-interactive",
            "mmi": {
                "tag": "Quad",
                "primaryOption": "primary-mmi",
                "secondaryOption": "secondary-interactive-mmi"
            },
            "mmi-elm": {
                "tag": "ELM",
                "primaryOption": "primary-elm-interactive",
                "secondaryOption": "secondary-elm-interactive"
            },
            "3rd-party": {
                "tag": "SL",
                "primaryOption": PRIMARY_SMARTLINK,
                "secondaryOption": "secondary-interactive-smartlink-third"
            },
            "pdf": {
                "tag": "SL",
                "primaryOption": PRIMARY_SMARTLINK,
                "secondaryOption": "secondary-interactive-smartlink-pdf"
            },
            "web-link": {
                "tag": "SL",
                "primaryOption": PRIMARY_SMARTLINK,
                "secondaryOption": "secondary-interactive-smartlink-web"
            },
            "pop-up-web-link": {
                "tag": "SL",
                "primaryOption": PRIMARY_SMARTLINK,
                "secondaryOption": "secondary-interactive-smartlink-pop-up-web-link"
            },
            "table": {
                "tag": "SL",
                "primaryOption": PRIMARY_SMARTLINK,
                "secondaryOption": "secondary-interactive-smartlink-tab"
            }
        },
        "assessment" : {
            "elementType" : "element-assessment",
            "primaryOption" : "primary-single-assessment",
            "tdx" : {
                "secondaryOption" : "secondary-single-assessment-tdx"
            },
            "cite" : {
                "secondaryOption" : "secondary-single-assessment-cite"
            },
            "puf" : {
                "secondaryOption" : "secondary-single-assessment-puf"
            },
            "learnosity" : {
                "secondaryOption" : "secondary-single-assessment-learnosity"
            }
        }
    },

    "element-aside" : {
        "sidebar" : {
            "elementType" : "element-aside",
            "asideSidebar01" : {
                "primaryOption" : PRIMARY_ASIDE_ASIDE,
                "secondaryOption" : "secondary-aside-sb1"
            },
            "asideSidebar02" : {
                "primaryOption" : PRIMARY_ASIDE_ASIDE,
                "secondaryOption" : "secondary-aside-sb2"
            },
            "asideSidebar03" : {
                "primaryOption" : PRIMARY_ASIDE_ASIDE,
                "secondaryOption" : "secondary-aside-sb3"
            },
            "asideSidebar04" : {
                "primaryOption" : PRIMARY_ASIDE_ASIDE,
                "secondaryOption" : "secondary-aside-sb4"
            },
            "asideSidebar05" : {
                "primaryOption" : PRIMARY_ASIDE_ASIDE,
                "secondaryOption" : "secondary-aside-sb5"
            },
            "asideSidebarFeature" : {
                "primaryOption" : "primary-aside-feature",
                "secondaryOption" : "secondary-aside-feature"
            },
            "asideActivity" : {
                "primaryOption" : "primary-aside-activity",
                "secondaryOption" : "secondary-aside-activity"
            },
            "asideLearningObjective" : {
                "primaryOption" : "primary-aside-lol",
                "secondaryOption" : "secondary-aside-lol"
            }
        },
        "Tactic" : {
            "elementType" : "element-aside",
            "asideTacticBox" : {
                "primaryOption" : "primary-aside-tactic",
                "secondaryOption" : "secondary-aside-tactic"
            }
        },
        "workedexample" : {
            "elementType" : "element-workedexample",
            "workedexample1" : {
                "primaryOption" : "primary-workedexample-we1",
                "secondaryOption" : "secondary-workedexample-we1"
            },
            "workedexample2" : {
                "primaryOption" : "primary-workedexample-we2",
                "secondaryOption" : "secondary-workedexample-we2"
            }
        },
    },

    "popup": {
        "elementType" : "popup",
        "primaryOption" : "primary-popup",
        "secondaryOption" : "secondary-popup",
        "tag" : "POP",

    },
    "showhide": {
        "elementType" : "showhide",
        "primaryOption" : "primary-showhide",
        "secondaryOption" : "secondary-showhide",
        "tag" : "SH",
    },
    "citations" : {
        "elementType" : "citations",
        "primaryOption" : "primary-citations-group",
        "secondaryOption" : "secondary-citations-group"
    },
    "element-citation" : {
        "elementType" : "element-citation",
        "primaryOption" : "primary-element-citation",
        "secondaryOption" : "secondary-element-citation"
    },
    "poetry" : {
        "elementType" : "poetry",
        "primaryOption" : "primary-poetry",
        "secondaryOption" : "secondary-poetry"
    },
    "stanza" : {
        "elementType" : "stanza",
        "primaryOption" : "primary-stanza",
        "secondaryOption" : "secondary-stanza"
    },
    "groupedcontent": {
        "elementType" : "groupedcontent",
        "primaryOption" : "primary-multicolumn",
        "wider-60-40" : {
            "secondaryOption" : "secondary-multicolumn-wider"
        },
        "wider-50-50" : {
            "secondaryOption" : "secondary-multicolumn-half"
        },
        "text-width-60-40" : {
            "secondaryOption" : "secondary-multicolumn-wider-text"
        },
        "text-width-50-50" : {
            "secondaryOption" : "secondary-multicolumn-half-text"
        },
        "wider-33-33-33" : {
            "secondaryOption" : "secondary-multicolumn-3c-wider"
        }
    },
    "group": {
        "elementType" : "group",
        "primaryOption" : "primary-tab",
        "tab-text-width-30-70" : {
            "secondaryOption" : "secondary-tabbed-30-70"
        },
        "tab-text-width-40-60" : {
            "secondaryOption" : "secondary-tabbed-40-60"
        },
        "tab-text-width-50-50" : {
            "secondaryOption" : "secondary-tabbed-50-50"
        },
        "tab-text-width-60-40" : {
            "secondaryOption" : "secondary-tabbed-60-40"
        },
        "tab-text-width-70-30" : {
            "secondaryOption" : "secondary-tabbed-70-30"
        }
    },
    "element-dialogue" : {
        "elementType" : "element-dialogue",
        "primaryOption" : "primary-element-dialogue",
        "secondaryOption" : "secondary-element-dialogue"
    },
    "discussion" : {
        "elementType" : "discussion",
        "primaryOption" : "primary-element-discussion",
        "secondaryOption" : "secondary-element-discussion"
    }
}

export default elementDataBank
