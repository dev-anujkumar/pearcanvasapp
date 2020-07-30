const elementDataBank = {

    "element-authoredtext" : {
        "elementType" : "element-authoredtext",
        "primaryOption" : "primary-paragraph",
        "secondaryOption" : "secondary-paragraph"
    },

    "element-authoredtext-heading" : {
        "elementType" : "element-authoredtext",
        "primaryOption" : "primary-heading",
        // "secondaryOption" : "secondary-heading-{number}"
    },

    "element-blockfeature" : {
        "pullquote" : {
            "elementType" : "element-authoredtext",
            "primaryOption" : "primary-blockquote",
            "secondaryOption" : "secondary-pullquote"
        },
        "blockquote" : {
            "elementType" : "element-authoredtext",
            "primaryOption" : "primary-blockquote",
            "secondaryOption" : "secondary-marginalia"
        },
        "marginalia" : {
            "elementType" : "element-authoredtext",
            "primaryOption" : "primary-blockquote",
            "secondaryOption" : "secondary-marginalia-attribution"
        }
    },

    "element-learningobjectives" : {
        "elementType" : "element-authoredtext",
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
            "elementType" : "element-authoredtext",
            "primaryOption" : "primary-list",
            "secondaryOption" : "secondary-list-1"
        },
        "decimal" : {
            "elementType" : "element-authoredtext",
            "primaryOption" : "primary-list",
            "secondaryOption" : "secondary-list-2"
        },
        "upper-alpha" : {
            "elementType" : "element-authoredtext",
            "primaryOption" : "primary-list",
            "secondaryOption" : "secondary-list-3"
        },
        "lower-alpha" : {
            "elementType" : "element-authoredtext",
            "primaryOption" : "primary-list",
            "secondaryOption" : "secondary-list-4"
        },   
        "upper-roman" : {
            "elementType" : "element-authoredtext",
            "primaryOption" : "primary-list",
            "secondaryOption" : "secondary-list-5"
        },
        "lower-roman" : {
            "elementType" : "element-authoredtext",
            "primaryOption" : "primary-list",
            "secondaryOption" : "secondary-list-6"
        },
        "none" : {
            "elementType" : "element-authoredtext",
            "primaryOption" : "primary-list",
            "secondaryOption" : "secondary-list-7"
        }
    },
    
    "figure" : {
        "image" : {
            "elementType" : "figure",
            "primaryOption" : "primary-image-figure",
            "informalfigure" : {
                "secondaryOption" : "secondary-image-figure-half"
            },
            "image50Text" : {
                "secondaryOption" : "secondary-image-figure-half"
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
                "primaryOption": "primary-smartlink",
                "secondaryOption": "secondary-interactive-smartlink-third"
            },
            "pdf": {
                "tag": "SL",
                "primaryOption": "primary-smartlink",
                "secondaryOption": "secondary-interactive-smartlink-pdf"
            },
            "web-link": {
                "tag": "SL",
                "primaryOption": "primary-smartlink",
                "secondaryOption": "secondary-interactive-smartlink-web"
            },
            "pop-up-web-link": {
                "tag": "SL",
                "primaryOption": "primary-smartlink",
                "secondaryOption": "secondary-interactive-smartlink-pop-up-web-link"
            },
            "table": {
                "tag": "SL",
                "primaryOption": "primary-smartlink",
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
                "primaryOption" : "primary-aside-aside",
                "secondaryOption" : "secondary-aside-sb1"
            },
            "asideSidebar02" : {
                "primaryOption" : "primary-aside-aside",
                "secondaryOption" : "secondary-aside-sb2"
            },
            "asideSidebar03" : {
                "primaryOption" : "primary-aside-aside",
                "secondaryOption" : "secondary-aside-sb3"
            },
            "asideSidebar04" : {
                "primaryOption" : "primary-aside-aside",
                "secondaryOption" : "secondary-aside-sb4"
            },
            "asideSidebar05" : {
                "primaryOption" : "primary-aside-aside",
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
        }
    }
}

export default elementDataBank