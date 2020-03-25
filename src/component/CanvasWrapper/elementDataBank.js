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
    
    "popup": {
        "elementType" : "element-interactive",
        "primaryOption" : "primary-popup",
        "secondaryOption" : "secondary-interactive-popup"
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
        "interactive" : {
            "elementType" : "element-interactive",
            "3rd-party": {
                "primaryOption" : "primary-smartlink",
                "secondaryOption" : "secondary-interactive-smartlink-third"
            },
            "pdf": {
                "primaryOption" : "primary-smartlink",
                "secondaryOption" : "secondary-interactive-smartlink-pdf"
            },
            "web-link": {
                "primaryOption" : "primary-smartlink",
                "secondaryOption" : "secondary-interactive-smartlink-web"
            },
            "pop-up-web-link": {
                "primaryOption" : "primary-smartlink",
                "secondaryOption" : "secondary-interactive-smartlink-pop-up-web-link"
            },
            "table": {
                "primaryOption" : "primary-smartlink",
                "secondaryOption" : "secondary-interactive-smartlink-tab"
            },
            "showhide": {
                "primaryOption" : "primary-showhide",
                "secondaryOption" : "secondary-interactive-showhide"
            },
            "fpo": {
                "primaryOption" : "primary-mmi",
                "secondaryOption" : "secondary-interactive-mmi"
            },
            "flashcards": {
                "primaryOption" : "primary-mmi",
                "secondaryOption" : "secondary-interactive-mmi"
            },
            "video-mcq": {
                "primaryOption" : "primary-mmi",
                "secondaryOption" : "secondary-interactive-mmi"
            },
            "mcq": {
                "primaryOption" : "primary-mmi",
                "secondaryOption" : "secondary-interactive-mmi"
            },
            "hotspot": {
                "primaryOption" : "primary-mmi",
                "secondaryOption" : "secondary-interactive-mmi"
            },
            "accountingtable": {
                "primaryOption" : "primary-mmi",
                "secondaryOption" : "secondary-interactive-mmi"
            },
            "gallery-video": {
                "primaryOption" : "primary-mmi",
                "secondaryOption" : "secondary-interactive-mmi"
            },
            "gallery-image": {
                "primaryOption" : "primary-mmi",
                "secondaryOption" : "secondary-interactive-mmi"
            },
            "graph": {
                "primaryOption" : "primary-mmi",
                "secondaryOption" : "secondary-interactive-mmi"
            },
            "simulation": {
                "primaryOption" : "primary-mmi",
                "secondaryOption" : "secondary-interactive-mmi"
            },
            "survey": {
                "primaryOption" : "primary-mmi",
                "secondaryOption" : "secondary-interactive-mmi"
            },
            "timeline": {
                "primaryOption" : "primary-mmi",
                "secondaryOption" : "secondary-interactive-mmi"
            },
            "fill-in-blank": {
                "primaryOption" : "primary-mmi",
                "secondaryOption" : "secondary-interactive-mmi"
            },
            "guided-example": {
                "primaryOption" : "primary-mmi",
                "secondaryOption" : "secondary-interactive-mmi"
            },
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
    "showhide" : {
        "elementType" : "element-interactive",
        "primaryOption" : "primary-showhide",
        "secondaryOption" : "secondary-aside-showhide"
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
    }
}

export default elementDataBank