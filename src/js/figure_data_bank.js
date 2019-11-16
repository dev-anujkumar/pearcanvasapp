let figureCommonData = {
    "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
    "height": "422",
    "width": "680",
    "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
    "imageid": ""
}
export default {
    "primary-image-figure": figureCommonData,
    "primary-image-table" : figureCommonData,
    "primary-image-equation": figureCommonData,
    "primary-mathml-equation": {
        "type": "element-authoredtext",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "elementdata": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
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
            "path": "https://d12m40tknrppbi.cloudfront.net/cite/images/FPO-audio_video.png"
        },
        "videos": [
            {
                "format": "",
                "path": ""
            }
        ],
        "tracks": [],
        "srctype": "externallink",
        "clipinfo": {}

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
        "audio": {
            "format": "",
            "path": ""
        },
        "srctype": "externallink"

    },
    "primary-mmi": {
        "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/interactive",
        "interactiveformat": "mmi",
        "interactivetype": "fpo",
        "numbered": false,
        "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/interactive",
        "startNumber": 0
    },
    "primary-smartlink" : {
        "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/interactive",
        "interactiveid": "",
        "interactivetype": "3rd-party",
        "interactiveformat": "external-link",
        "posterimage": {
        "path": "https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png"
        }
    },
    "primary-showhide": {
        "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/interactive",
        "interactiveid": "",
        "interactivetype": "showhide",
        "interactiveformat": "mmi"
    },
    "primary-popup": {
        "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/interactive",
        "interactiveid": "",
        "interactivetype": "popup",
        "interactiveformat": "narrative-link",
        "posterimage": {
            "path": "https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png"
        }
    },
    "primary-single-assessment": {
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "type": "element-assessment",
        "subtype": "assessment",
        "elementdata": {
            "assessmentitemtype": "tdxAssessmentItem",
            "assessmentformat": "tdx",
            "schema": "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment",
            "posterimage": {
                "path": "https://cite-media-stg.pearson.com/legacy_paths/8efb9941-4ed3-44a3-8310-1106d3715c3e/FPO-assessment.png"
            },
            "usagetype": "Quiz"
        }
    }
}