import { AUTHORED_TEXT_SCHEMA, INTERACTIVE_FPO, INTERACTIVE_SCHEMA, externalLinkText } from "../constants/Element_Constants"

let figureCommonData = {
    "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
    "height": "422",
    "width": "680",
    "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
    "imageid": "",
    "podwidth": "print100"
}
export default {
    "primary-image-figure": figureCommonData,
    "primary-image-table" : figureCommonData,
    "primary-image-equation": figureCommonData,
    "pprimary-image-decorative": figureCommonData,
    "primary-mathml-equation": {
        "type": "element-authoredtext",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "elementdata": {
            "schema": AUTHORED_TEXT_SCHEMA,
            "text": "",
            "textsemantics": [],
            "mathml": []
        }

    },
    "primary-blockcode-equation": {
        "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
        "type": "codelisting",
        "numbered": true,
        "startNumber": "1",
        "programlanguage": "Select",
        "syntaxhighlighting" : true,
        "preformattedtext": [
            ""
        ]

    },
    "primary-editor-table-equation": {
        "schema": "http://schemas.pearson.com/wip-authoring/table/1/definitions/tableasmarkup",
        "tableasHTML": ""
    },
    "primary-video": {
        "height": "399",
        "width": "600",
        "schema": "http://schemas.pearson.com/wip-authoring/video/1#/definitions/video",
        "videoid": "",
        "posterimage": {
            "imageid": "",
            "path": "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png"
        },
        "videos": [
            {
                "format": "",
                "path": ""
            }
        ],
        "tracks": [],
        "srctype": "externallink",

    },
    "primary-audio": {
        "height": "399",
        "width": "600",
        "schema": "http://schemas.pearson.com/wip-authoring/audio/1#/definitions/audio",
        "audioid": "",
        "posterimage": {
            "imageid": "",
            "path": "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png"
        },
        "srctype": "externallink"

    },
    "primary-mmi": {
        "interactiveformat": "mmi",
        "interactivetype": "fpo",
        "numbered": false,
        "schema": INTERACTIVE_SCHEMA,
        "startNumber": 0
    },
    "secondary-interactive-smartlink-third" : {
        "schema": INTERACTIVE_SCHEMA,
        "interactiveid": "",
        "interactivetype": "3rd-party",
        "interactiveformat": externalLinkText,
        "posterimage": {
        "path": INTERACTIVE_FPO
        }
    },
    "secondary-interactive-smartlink-pdf" : {
        "schema": INTERACTIVE_SCHEMA,
        "interactiveid": "",
        "interactivetype": "pdf",
        "interactiveformat": externalLinkText,
        "posterimage": {
        "path": INTERACTIVE_FPO
        },
        "postertext": {
            "schema": AUTHORED_TEXT_SCHEMA,
            "text": "",
            "textsemantics": [],
            "mathml": []
        }
    },
    "secondary-interactive-smartlink-web" : {
        "schema": INTERACTIVE_SCHEMA,
        "interactiveid": "",
        "interactivetype": "web-link",
        "interactiveformat": externalLinkText,
        "postertext": {
            "schema": AUTHORED_TEXT_SCHEMA,
            "text": "",
            "textsemantics": [],
            "mathml": []
        }
    },
    "secondary-interactive-smartlink-pop-up-web-link" : {
        "schema": INTERACTIVE_SCHEMA,
        "interactiveid": "",
        "interactivetype": "pop-up-web-link",
        "interactiveformat": externalLinkText,
        "postertext": {
            "schema": AUTHORED_TEXT_SCHEMA,
            "text": "",
            "textsemantics": [],
            "mathml": []
        }
    },
    "secondary-interactive-smartlink-tab" : {
        "schema": INTERACTIVE_SCHEMA,
        "interactiveid": "",
        "interactivetype": "table",
        "interactiveformat": externalLinkText,
        "posterimage": {
        "path": INTERACTIVE_FPO
        }
    },
    "primary-showhide": {
        "schema": INTERACTIVE_SCHEMA,
        "interactiveid": "",
        "interactivetype": "showhide",
        "interactiveformat": "mmi"
    },
    "primary-popup": {
        "schema": INTERACTIVE_SCHEMA,
        "interactiveid": "",
        "interactivetype": "popup",
        "interactiveformat": "narrative-link",
        "posterimage": {
            "path": INTERACTIVE_FPO
        }
    },
    "primary-single-assessment": {
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "type": "element-assessment",
       // "subtype": "assessment",
        "elementdata": {
            "assessmentitemtype": "tdxAssessmentItem",
            "assessmentformat": "tdx",
            "schema": "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment",
            "posterimage": {
                "path": "https://cite-media-stg.pearson.com/legacy_paths/8efb9941-4ed3-44a3-8310-1106d3715c3e/FPO-assessment.png"
            },
            "usagetype": "Quiz"
        }
    },
    "secondary-image-figure-width": {
         "postertext": {"text":"hello world"}
    }
}
