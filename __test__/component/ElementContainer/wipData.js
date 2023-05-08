import { multiColumnContainer, threeMultiColumnContainer } from "../../../fixtures/multiColumnContainer";
export default {
    "opener":{
        "id": "urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y",
        "versionUrn": "urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y",
        "contentUrn": "urn:pearson:entity:b345d729-e8b0-4e54-b4c8-0c24650ck8u6",
        "type": "openerelement",
        "backgroundcolor": "#000000",
        "schema": "http://schemas.pearson.com/wip-authoring/openerelement/1",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Chapter X: Opening Element Title",
            "textsemantics": [
                {
                    "type": "label",
                    "charStart": 0,
                    "charEnd": 7
                },
                {
                    "type": "number",
                    "charStart": 8,
                    "charEnd": 10
                }
            ]
        },
        "backgroundimage": {
            "path": "https://d12m40tknrppbi.cloudfront.net/cite/images/ch11_chapter_header.jpg",
            "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
            "imageid": "urn:pearson:alfresco:4932d1fb-e6d3-4080-9f23-032e0dfa219a",
            "credits": {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": "Opening element credits for the background image."
            }
        }
    },
    "paragraph" : {
        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a",
        "type": "element-authoredtext",
        "subtype": "",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "elementdata": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Paragraph"
        },
        "html": {
            "text": "<p class=\"paragraphNumeroUno\">Paragraph</p>"
        },
        "comments": true,
        "tcm": false,
        "feedback": true,
        "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527" 
    },
    "paragraphUpdate" : {
        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a",
        "type": "element-authoredtext",
        "subtype": "",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "elementdata": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Paragraph"
        },
        "html": {
            "text": "<p class=\"paragraphNumeroUno\">Paragraph</p>"
        },
        "comments": true,
        "tcm": true,
        "feedback": true,
        "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527" 
    },
    "heading-1" :{
        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",
        "type": "element-authoredtext",
        "subtype": "",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "elementdata": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "headers": [
                {
                    "charStart": 0,
                    "charEnd": 8,
                    "level": 1
                }
            ],
            "text": "Heading 1"
        },
        "html": {
            "text": "<h1 class=\"heading1NummerEins\">Heading 1</h1>"
        },
        "comments": true,
        "tcm": true,
        "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
    },
    "heading-2":{
        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1c",
        "type": "element-authoredtext",
        "subtype": "",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "elementdata": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "headers": [
                {
                    "charStart": 0,
                    "charEnd": 8,
                    "level": 2
                }
            ],
            "text": "Heading 2"
        },
        "html": {
            "text": "<h2 class=\"heading2NummerEins\">Heading 1</h2>"
        },
        "comments": true,
        "tcm": true,
        "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
    },
    "heading-3":{
        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1d",
        "type": "element-authoredtext",
        "subtype": "",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "elementdata": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "headers": [
                {
                    "charStart": 0,
                    "charEnd": 8,
                    "level": 3
                }
            ],
            "text": "Heading 3"
        },
        "html": {
            "text": "<h3 class=\"heading3NummerEins\">Heading 1</h3>"
        },
        "comments": true,
        "tcm": true,
        "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
    },
    "heading-4":{
        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1e",
        "type": "element-authoredtext",
        "subtype": "",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "elementdata": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "headers": [
                {
                    "charStart": 0,
                    "charEnd": 8,
                    "level": 4
                }
            ],
            "text": "Heading 4"
        },
        "html": {
            "text": "<h4 class=\"heading4NummerEins\">Heading 1</h4>"
        },
        "comments": true,
        "tcm": true,
        "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
    },
    "heading-5":{
        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1f",
        "type": "element-authoredtext",
        "subtype": "",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "elementdata": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "headers": [
                {
                    "charStart": 0,
                    "charEnd": 8,
                    "level": 5
                }
            ],
            "text": "Heading 5"
        },
        "html": {
            "text": "<h5 class=\"heading5NummerEins\">Heading 1</h5>"
        },
        "comments": true,
        "tcm": true,
        "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
    },
    "heading-6":{
        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1g",
        "type": "element-authoredtext",
        "subtype": "",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "elementdata": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "headers": [
                {
                    "charStart": 0,
                    "charEnd": 8,
                    "level": 6
                }
            ],
            "text": "Heading 6"
        },
        "html": {
            "text": "<h6 class=\"heading6NummerEins\">Heading 1</h6>"
        },
        "comments": true,
        "tcm": true,
        "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
    },
    "pullquote" :{
        "id": "urn:pearson:work:5d489bfe-ef76-4193-b07a-62d9d393fe93",
        "type": "element-blockfeature",
        "subtype": "quote",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "elementdata": {
            "schema": "http://schemas.pearson.com/wip-authoring/blockfeature/1#/definitions/blockfeature",
            "type": "pullquote",
            "headers": [
                {
                "charStart": 0,
                "charEnd": -1,
                "level": 3
                }
            ],
            "authoredtext": {
                "text": "",
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext"
            }
        },
        "html": {
            "text": "<h3 class=\"pullQuoteNumeroUno\">Pullquote 1</h3>"
        },
        "versionUrn": "urn:pearson:work:5d489bfe-ef76-4193-b07a-62d9d393fe93",
        "contentUrn": "urn:pearson:entity:d13f2640-15ef-4e91-94e0-fd0f3c685a2a"
    },
    "marginalia":{
        "id": "urn:pearson:work:3a87a270-5d35-4714-877e-9bca2eb25271",
        "type": "element-blockfeature",
        "subtype": "quote",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "elementdata": {
            "schema": "http://schemas.pearson.com/wip-authoring/blockfeature/1#/definitions/blockfeature",
            "type": "blockquote",
            "authoredtext": {
                "text": "",
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext"
            }
        },
        "html": {
            "text": "<blockquote class=\"blockquoteMarginalia\"><p class=\"paragraphNummerEins\">Blockquote Marginalia</p></blockquote>"
        },
        "versionUrn": "urn:pearson:work:3a87a270-5d35-4714-877e-9bca2eb25271",
        "contentUrn": "urn:pearson:entity:147d4454-b7cd-41b1-aaba-3f5f8735d870"
    },
    "marginalia-attribution":{
        "id": "urn:pearson:work:9c2d0567-c24d-44f5-8e8e-5b7d9859a26d",
        "type": "element-blockfeature",
        "subtype": "quote",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "elementdata": {
            "schema": "http://schemas.pearson.com/wip-authoring/blockfeature/1#/definitions/blockfeature",
            "type": "marginalia",
            "authoredtext": {
                "text": "",
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext"
            }
        },
        "html": {
            "text": "<blockquote class=\"blockquoteMarginaliaAttr\"><p class=\"paragraphNummerEins\">Marginalia with attribution</p><p class=\"blockquoteTextCredit\" contenteditable=\"false\">Attribution text</p></blockquote>"
        },
        "versionUrn": "urn:pearson:work:9c2d0567-c24d-44f5-8e8e-5b7d9859a26d",
        "contentUrn": "urn:pearson:entity:06f51645-ecd8-456f-bc60-0e7ad8fcd950"
    },
    "list":{
        "id": "urn:pearson:work:e40d7dbd-9fa0-445d-b8a9-735741803678",
        "type": "element-list",
        "subtype": "disc",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "elementdata": {
            "schema": "http://schemas.pearson.com/wip-authoring/list/1#/definitions/list",
            "type": "list",
            "listtype": "unordered",
            "designtype": "list",
            "subtype": "disc",
            "startNumber": "",
            "listitems": [
                {
                    "type": "paragraph",
                    "authoredtext": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": ""
                    }
                }
            ]
        },
        "html": {
            "schema": "http://schemas.pearson.com/wip-authoring/list/1#/definitions/list",
            "text": "<ul class=\"\" treelevel=\"1\"><li class=\"listItemNumeroUnoBullet\" \"=\"\"><br></li></ul>",
            "trackersemantic": []
        },
        "versionUrn": "urn:pearson:work:e40d7dbd-9fa0-445d-b8a9-735741803678",
        "contentUrn": "urn:pearson:entity:5a26081f-1da9-4cc6-b141-677d99fd561d"
    },
    "figure":{
        "id": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
        "type": "figure",
        "figuretype": "image",
        "subtype": "imageTextWidth",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "alignment": "text-width",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Label for Figure Image-TextWidth",
            "textsemantics": [],
            "mathml": []
        },
        "subtitle": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Title for Figure Image-TextWidth",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "captions": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Caption for Figure Image-TextWidth",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "credits": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Credit for Figure Image-TextWidth",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "figuredata": {
            "path": "https://cite-media-stg.pearson.com/legacy_paths/2ed117e6-1306-496b-9386-b2394debd50e/Lighthouse.jpg",
            "height": "1225",
            "width": "1440",
            "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
            "imageid": "urn:pearson:alfresco:600efdb1-a28c-4ec3-8b54-9aad364c8c2c"
        },
        "html": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "title": "Label for Figure Image-TextWidth",
            "subtitle": "Title for Figure Image-TextWidth",
            "caption": "Caption for Figure Image-TextWidth",
            "credit": "Credit for Figure Image-TextWidth",
            "postertext": "",
            "tableasHTML": ""
        },
        "comments": false,
        "tcm": false,
        "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
        "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"
    },
    "figure-image50Text":{
        "id": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
        "type": "figure",
        "figuretype": "image",
        "subtype": "image50Text",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "alignment": "text-width",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Label for Figure Image-TextWidth",
            "textsemantics": [],
            "mathml": []
        },
        "subtitle": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Title for Figure Image-TextWidth",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "captions": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Caption for Figure Image-TextWidth",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "credits": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Credit for Figure Image-TextWidth",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "figuredata": {
            "path": "https://cite-media-stg.pearson.com/legacy_paths/2ed117e6-1306-496b-9386-b2394debd50e/Lighthouse.jpg",
            "height": "1225",
            "width": "1440",
            "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
            "imageid": "urn:pearson:alfresco:600efdb1-a28c-4ec3-8b54-9aad364c8c2c"
        },
        "html": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "title": "Label for Figure Image-TextWidth",
            "subtitle": "Title for Figure Image-TextWidth",
            "caption": "Caption for Figure Image-TextWidth",
            "credit": "Credit for Figure Image-TextWidth",
            "postertext": "",
            "tableasHTML": ""
        },
        "comments": false,
        "tcm": false,
        "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
        "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"
    },
    "figure-imageWiderThanText":{
        "id": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
        "type": "figure",
        "figuretype": "image",
        "subtype": "imageWiderThanText",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "alignment": "text-width",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Label for Figure Image-TextWidth",
            "textsemantics": [],
            "mathml": []
        },
        "subtitle": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Title for Figure Image-TextWidth",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "captions": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Caption for Figure Image-TextWidth",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "credits": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Credit for Figure Image-TextWidth",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "figuredata": {
            "path": "https://cite-media-stg.pearson.com/legacy_paths/2ed117e6-1306-496b-9386-b2394debd50e/Lighthouse.jpg",
            "height": "1225",
            "width": "1440",
            "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
            "imageid": "urn:pearson:alfresco:600efdb1-a28c-4ec3-8b54-9aad364c8c2c"
        },
        "html": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "title": "Label for Figure Image-TextWidth",
            "subtitle": "Title for Figure Image-TextWidth",
            "caption": "Caption for Figure Image-TextWidth",
            "credit": "Credit for Figure Image-TextWidth",
            "postertext": "",
            "tableasHTML": ""
        },
        "comments": false,
        "tcm": false,
        "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
        "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"
    },
    "figure-imageFullscreen":{
        "id": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
        "type": "figure",
        "figuretype": "image",
        "subtype": "imageFullscreen",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "alignment": "text-width",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Label for Figure Image-TextWidth",
            "textsemantics": [],
            "mathml": []
        },
        "subtitle": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Title for Figure Image-TextWidth",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "captions": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Caption for Figure Image-TextWidth",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "credits": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Credit for Figure Image-TextWidth",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "figuredata": {
            "path": "https://cite-media-stg.pearson.com/legacy_paths/2ed117e6-1306-496b-9386-b2394debd50e/Lighthouse.jpg",
            "height": "1225",
            "width": "1440",
            "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
            "imageid": "urn:pearson:alfresco:600efdb1-a28c-4ec3-8b54-9aad364c8c2c"
        },
        "html": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "title": "Label for Figure Image-TextWidth",
            "subtitle": "Title for Figure Image-TextWidth",
            "caption": "Caption for Figure Image-TextWidth",
            "credit": "Credit for Figure Image-TextWidth",
            "postertext": "",
            "tableasHTML": ""
        },
        "comments": false,
        "tcm": false,
        "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
        "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"
    },
    "figure-image25Text":{
        "id": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
        "type": "figure",
        "figuretype": "image",
        "subtype": "image25Text",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "alignment": "text-width",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Label for Figure Image-TextWidth",
            "textsemantics": [],
            "mathml": []
        },
        "subtitle": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Title for Figure Image-TextWidth",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "captions": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Caption for Figure Image-TextWidth",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "credits": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Credit for Figure Image-TextWidth",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "figuredata": {
            "path": "https://cite-media-stg.pearson.com/legacy_paths/2ed117e6-1306-496b-9386-b2394debd50e/Lighthouse.jpg",
            "height": "1225",
            "width": "1440",
            "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
            "imageid": "urn:pearson:alfresco:600efdb1-a28c-4ec3-8b54-9aad364c8c2c"
        },
        "html": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "title": "Label for Figure Image-TextWidth",
            "subtitle": "Title for Figure Image-TextWidth",
            "caption": "Caption for Figure Image-TextWidth",
            "credit": "Credit for Figure Image-TextWidth",
            "postertext": "",
            "tableasHTML": ""
        },
        "comments": false,
        "tcm": false,
        "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
        "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"
    },
    "table":{
        "id": "urn:pearson:work:b33703aa-d629-4466-8606-cfcf0505e291",
        "type": "figure",
        "figuretype": "table",
        "subtype": "image50TextTableImage",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "alignment": "half-text",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": []
        },
        "subtitle": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "captions": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "credits": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "figuredata": {
            "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
            "height": "422",
            "width": "680",
            "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
            "imageid": ""
        },
        "html": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "title": "<p><br></p>",
            "subtitle": "<p><br></p>",
            "caption": "<p><br></p>",
            "credit": "<p><br></p>",
            "text": "",
            "postertext": "",
            "tableasHTML": ""
        },
        "versionUrn": "urn:pearson:work:b33703aa-d629-4466-8606-cfcf0505e291",
        "contentUrn": "urn:pearson:entity:a313d0b8-4665-450b-a6ff-be780f1e5cce"
    },
    "tableasmarkup":{
        "id": "urn:pearson:work:b33703aa-d629-4466-8606-cfcf0505e291",
        "type": "figure",
        "figuretype": "tableasmarkup",
        "subtype": "image50TextTableImage",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "alignment": "half-text",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": []
        },
        "subtitle": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "captions": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "credits": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "figuredata": {
            "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
            "height": "422",
            "width": "680",
            "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
            "imageid": ""
        },
        "html": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "title": "<p><br></p>",
            "subtitle": "<p><br></p>",
            "caption": "<p><br></p>",
            "credit": "<p><br></p>",
            "text": "",
            "postertext": "",
            "tableasHTML": ""
        },
        "versionUrn": "urn:pearson:work:b33703aa-d629-4466-8606-cfcf0505e291",
        "contentUrn": "urn:pearson:entity:a313d0b8-4665-450b-a6ff-be780f1e5cce"
    },
    "table-imageTextWidthTableImage":{
        "id": "urn:pearson:work:b33703aa-d629-4466-8606-cfcf0505e291",
        "type": "figure",
        "figuretype": "table",
        "subtype": "imageTextWidthTableImage",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "alignment": "half-text",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": []
        },
        "subtitle": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "captions": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "credits": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "figuredata": {
            "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
            "height": "422",
            "width": "680",
            "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
            "imageid": ""
        },
        "html": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "title": "<p><br></p>",
            "subtitle": "<p><br></p>",
            "caption": "<p><br></p>",
            "credit": "<p><br></p>",
            "text": "",
            "postertext": "",
            "tableasHTML": ""
        },
        "versionUrn": "urn:pearson:work:b33703aa-d629-4466-8606-cfcf0505e291",
        "contentUrn": "urn:pearson:entity:a313d0b8-4665-450b-a6ff-be780f1e5cce"
    },
    "table-imageWiderThanTextTableImage":{
        "id": "urn:pearson:work:b33703aa-d629-4466-8606-cfcf0505e291",
        "type": "figure",
        "figuretype": "table",
        "subtype": "imageWiderThanTextTableImage",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "alignment": "half-text",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": []
        },
        "subtitle": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "captions": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "credits": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "figuredata": {
            "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
            "height": "422",
            "width": "680",
            "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
            "imageid": ""
        },
        "html": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "title": "<p><br></p>",
            "subtitle": "<p><br></p>",
            "caption": "<p><br></p>",
            "credit": "<p><br></p>",
            "text": "",
            "postertext": "",
            "tableasHTML": ""
        },
        "versionUrn": "urn:pearson:work:b33703aa-d629-4466-8606-cfcf0505e291",
        "contentUrn": "urn:pearson:entity:a313d0b8-4665-450b-a6ff-be780f1e5cce"
    },
    "table-imageFullscreenTableImage":{
        "id": "urn:pearson:work:b33703aa-d629-4466-8606-cfcf0505e291",
        "type": "figure",
        "figuretype": "table",
        "subtype": "imageFullscreenTableImage",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "alignment": "half-text",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": []
        },
        "subtitle": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "captions": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "credits": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "figuredata": {
            "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
            "height": "422",
            "width": "680",
            "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
            "imageid": ""
        },
        "html": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "title": "<p><br></p>",
            "subtitle": "<p><br></p>",
            "caption": "<p><br></p>",
            "credit": "<p><br></p>",
            "text": "",
            "postertext": "",
            "tableasHTML": ""
        },
        "versionUrn": "urn:pearson:work:b33703aa-d629-4466-8606-cfcf0505e291",
        "contentUrn": "urn:pearson:entity:a313d0b8-4665-450b-a6ff-be780f1e5cce"
    },
    "mathImage":{
        "id": "urn:pearson:work:1d5259c3-63c9-4a77-9a52-0315007624d0",
        "type": "figure",
        "figuretype": "mathImage",
        "subtype": "image50TextMathImage",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "alignment": "half-text",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": []
        },
        "subtitle": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "captions": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "credits": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "figuredata": {
            "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
            "height": "422",
            "width": "680",
            "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
            "imageid": ""
        },
        "html": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "title": "<p><br></p>",
            "subtitle": "<p><br></p>",
            "caption": "<p><br></p>",
            "credit": "<p><br></p>",
            "text": "",
            "postertext": "",
            "tableasHTML": ""
        },
        "versionUrn": "urn:pearson:work:1d5259c3-63c9-4a77-9a52-0315007624d0",
        "contentUrn": "urn:pearson:entity:cf56c396-e5fd-4d67-8a27-8c1f6becc00c"
    },
    "mathImage-imageTextWidthMathImage":{
        "id": "urn:pearson:work:1d5259c3-63c9-4a77-9a52-0315007624d0",
        "type": "figure",
        "figuretype": "mathImage",
        "subtype": "imageTextWidthMathImage",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "alignment": "half-text",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": []
        },
        "subtitle": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "captions": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "credits": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "figuredata": {
            "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
            "height": "422",
            "width": "680",
            "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
            "imageid": ""
        },
        "html": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "title": "<p><br></p>",
            "subtitle": "<p><br></p>",
            "caption": "<p><br></p>",
            "credit": "<p><br></p>",
            "text": "",
            "postertext": "",
            "tableasHTML": ""
        },
        "versionUrn": "urn:pearson:work:1d5259c3-63c9-4a77-9a52-0315007624d0",
        "contentUrn": "urn:pearson:entity:cf56c396-e5fd-4d67-8a27-8c1f6becc00c"
    },
    "mathImage-imageWiderThanTextMathImage":{
        "id": "urn:pearson:work:1d5259c3-63c9-4a77-9a52-0315007624d0",
        "type": "figure",
        "figuretype": "mathImage",
        "subtype": "imageWiderThanTextMathImage",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "alignment": "half-text",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": []
        },
        "subtitle": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "captions": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "credits": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "figuredata": {
            "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
            "height": "422",
            "width": "680",
            "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
            "imageid": ""
        },
        "html": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "title": "<p><br></p>",
            "subtitle": "<p><br></p>",
            "caption": "<p><br></p>",
            "credit": "<p><br></p>",
            "text": "",
            "postertext": "",
            "tableasHTML": ""
        },
        "versionUrn": "urn:pearson:work:1d5259c3-63c9-4a77-9a52-0315007624d0",
        "contentUrn": "urn:pearson:entity:cf56c396-e5fd-4d67-8a27-8c1f6becc00c"
    },
    "mathImage-imageFullscreenMathImage":{
        "id": "urn:pearson:work:1d5259c3-63c9-4a77-9a52-0315007624d0",
        "type": "figure",
        "figuretype": "mathImage",
        "subtype": "imageFullscreenMathImage",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "alignment": "half-text",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": []
        },
        "subtitle": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "captions": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "credits": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "figuredata": {
            "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
            "height": "422",
            "width": "680",
            "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
            "imageid": ""
        },
        "html": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "title": "<p><br></p>",
            "subtitle": "<p><br></p>",
            "caption": "<p><br></p>",
            "credit": "<p><br></p>",
            "text": "",
            "postertext": "",
            "tableasHTML": ""
        },
        "versionUrn": "urn:pearson:work:1d5259c3-63c9-4a77-9a52-0315007624d0",
        "contentUrn": "urn:pearson:entity:cf56c396-e5fd-4d67-8a27-8c1f6becc00c"
    },
    "equation": {
        "id": "urn:pearson:work:46a8d1a5-e664-4d6e-928a-a86e951d03bb",
        "type": "figure",
        "figuretype": "authoredtext",
        "subtype": "mathml",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": []
        },
        "subtitle": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "captions": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "credits": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "figuredata": {
            schema: "http://schemas.pearson.com/wip-authoring/element/1",
            type: "element-authoredtext",
            "elementdata": {
                schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
text: "mathml text"
            }
        },
        "html": {
            title: "<p></p>",
            subtitle: "<p></p>",
            text: "<p>mathml text</p>",
            postertext: "",
            captions: "<p></p>",
            credits: "<p></p>",
            footnotes: {},
            glossaryentries: {}
        },
        "versionUrn": "urn:pearson:work:46a8d1a5-e664-4d6e-928a-a86e951d03bb",
        "contentUrn": "urn:pearson:entity:cc3d5298-00cc-4c2a-b63d-bc39a943c222"
    },
    "codeEditor":{
        "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
        "type": "figure",
        "figuretype": "codelisting",
        "subtype": "codelisting",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "alignment": "Select",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": []
        },
        "subtitle": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "captions": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "credits": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "figuredata": {
            "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
            "type": "codelisting",
            "numbered": true,
            "startNumber": "1",
            "programlanguage": "Select",
            "preformattedtext": []
        },
        "html": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "title": "<p><br></p>",
            "subtitle": "<p><br></p>",
            "caption": "<p><br></p>",
            "credit": "<p><br></p>",
            "text": "",
            "postertext": "",
            "tableasHTML": ""
        },
        "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
        "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
    },
    "video":{
        "id": "urn:pearson:work:3057d0db-e900-45fb-8d6e-cbdf010fa149",
        "type": "figure",
        "figuretype": "video",
        "subtype": "figureVideo",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": []
        },
        "subtitle": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "captions": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "credits": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "figuredata": {
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
        "html": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "title": "<p><br></p>",
            "subtitle": "<p><br></p>",
            "caption": "<p><br></p>",
            "credit": "<p><br></p>",
            "text": "",
            "postertext": "",
            "tableasHTML": ""
        },
        "versionUrn": "urn:pearson:work:3057d0db-e900-45fb-8d6e-cbdf010fa149",
        "contentUrn": "urn:pearson:entity:48594256-c78a-4f3d-abdc-fa0c99746351"
    },
    "audio":{
        "id": "urn:pearson:work:3057d0db-e900-45fb-8d6e-cbdf010fa149",
        "type": "figure",
        "figuretype": "audio",
        "subtype": "figureVideo",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": []
        },
        "subtitle": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "captions": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "credits": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "figuredata": {
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
        "html": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "title": "<p><br></p>",
            "subtitle": "<p><br></p>",
            "caption": "<p><br></p>",
            "credit": "<p><br></p>",
            "text": "",
            "postertext": "",
            "tableasHTML": ""
        },
        "versionUrn": "urn:pearson:work:3057d0db-e900-45fb-8d6e-cbdf010fa149",
        "contentUrn": "urn:pearson:entity:48594256-c78a-4f3d-abdc-fa0c99746351"
    },
    "assessment":{
        "id": "urn:pearson:work:47926695-265e-469e-bfc3-2c942d2c1824",
        "type": "figure",
        "figuretype": "assessment",
        "subtype": "",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Open response question updated"
        },
        "subtitle": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [ ],
            "mathml": [ ],
            "footnotes": [ ]
        },
        "captions": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [ ],
            "mathml": [ ],
            "footnotes": [ ]
        },
        "credits": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [ ],
            "mathml": [ ],
            "footnotes": [ ]
        },
        "figuredata": {
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "type": "element-assessment",
            "subtype": "assessment",
            "elementdata": {
                "assessmentid": "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
                "assessmentitemid": "urn:pearson:work:fb9bcb66-3073-45e6-ab8a-b595a35bf93b",
                "assessmentitemtype": "assessmentItem",
                "assessmentformat": "cite",
                "schema": "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment",
                "posterimage": {
                    "path": "https://cite-media-stg.pearson.com/legacy_paths/8efb9941-4ed3-44a3-8310-1106d3715c3e/FPO-assessment.png"
                },
                "usagetype": "Diagnostic"
            }
        },
        "versionUrn": "urn:pearson:work:47926695-265e-469e-bfc3-2c942d2c1824",
        "contentUrn": "urn:pearson:entity:0f7c431f-e6c9-4574-bfe0-7d4ac25c1032"
    },
    "interactive":{
        "id": "urn:pearson:work:06b83c99-3e7c-4b5d-810e-0dee86dbbfdf",
        "type": "figure",
        "figuretype": "interactive",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": []
        },
        "subtitle": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "captions": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "credits": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "figuredata": {
            "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/interactive",
            "interactiveid": "",
            "interactivetype": "fpo",
            "interactiveformat": "mmi"
        },
        "html": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "title": "<p><br></p>",
            "subtitle": "<p><br></p>",
            "caption": "<p><br></p>",
            "credit": "<p><br></p>",
            "text": "",
            "postertext": "",
            "tableasHTML": ""
        },
        "versionUrn": "urn:pearson:work:06b83c99-3e7c-4b5d-810e-0dee86dbbfdf",
        "contentUrn": "urn:pearson:entity:7d2fe2d5-709e-4130-b5ac-9f6b50b872f5"
    },
    "smartLink":{
        "id": "urn:pearson:work:9c29501d-374e-4400-815d-a71df4968d9f",
        "type": "figure",
        "figuretype": "interactive",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": []
        },
        "subtitle": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "captions": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "credits": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "figuredata": {
            "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/interactive",
            "interactiveid": "",
            "interactivetype": "3rd-party",
            "interactiveformat": "external-link",
            "posterimage": {
                "path": "https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png"
            }
        },
        "html": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "title": "<p><br></p>",
            "subtitle": "<p><br></p>",
            "caption": "<p><br></p>",
            "credit": "<p><br></p>",
            "text": "",
            "postertext": "",
            "tableasHTML": ""
        },
        "versionUrn": "urn:pearson:work:9c29501d-374e-4400-815d-a71df4968d9f",
        "contentUrn": "urn:pearson:entity:2449a2ba-6183-4035-91b3-a6611057261a"
    },
    "showHide":{
        "id": "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
        "type": "showhide",
        "subtype": "",
        "designtype": "",
        "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
        "contentUrn": "urn:pearson:entity:62008570-5ab8-4f2f-8ce1-e48ae80bc714",
        "versionUrn": "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
        "interactivedata": {
        "postertextobject": [
        {
        "type": "element-authoredtext",
        "contentUrn": "urn:pearson:entity:5e36e9b2-08f6-4841-bb2f-1beb08f28905",
        "id": "urn:pearson:work:305cc470-3d3e-45f8-ae5d-4b10eff07e8f"
        }
        ],
        "show": [
        {
        "type": "element-authoredtext",
        "id": "urn:pearson:work:e4495bc8-7fd5-4d9c-bd4c-1a879ad34019"
        }
        ],
        "hide": [
        {
        "type": "element-authoredtext",
        "id": "urn:pearson:work:743ddeed-104e-44ad-8f11-affdcf1b2019"
        }
        ]
        }
        },
    "popUp":{
        "id": "urn:pearson:manifest:5eefc529-e08d-4dca-9a10-a09f2959e340",
        "type": "popup",
        "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/popup",
        "contentUrn": "urn:pearson:entity:16fe0243-dc60-45e2-bf17-2d9a9bc8cd10",
        "versionUrn": "urn:pearson:manifest:5eefc529-e08d-4dca-9a10-a09f2959e340",
        "popupdata": {
        "bodymatter": [
        {
        "type": "element-authoredtext",
        "id": "urn:pearson:work:d9ffdde2-a5f1-4f53-9e9c-c0b3503a1071",
        "contentUrn": "urn:pearson:entity:74c4a6f9-b446-49d2-8475-15259391bc70"
        }
        ],
        "postertextobject": [
        {
        "type": "element-authoredtext",
        "id": "urn:pearson:work:7bc621e1-cd3e-422e-8e2c-30506d08018f"
        }
        ],
        "formatted-title": {
        "id": "urn:pearson:work:8a81206d-2fa2-4f62-a012-2b516dcebb75"
        },
        "formatted-subtitle": {
        "id": "urn:pearson:work:ae083e98-818b-44e9-be3a-04631d1ff890"
        }
        }
        }
        ,
    "pdf":{
        "id": "urn:pearson:work:d5a8989a-f468-47b1-aca0-452e2503a09a",
        "type": "figure",
        "figuretype": "interactive",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": []
        },
        "subtitle": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "captions": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "credits": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "",
            "textsemantics": [],
            "mathml": [],
            "footnotes": []
        },
        "figuredata": {
            "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/interactive",
            "interactiveid": "",
            "interactivetype": "pdf",
            "posterimage": {
                "path": "https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png"
            }
        },
        "html": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "title": "<p><br></p>",
            "subtitle": "<p><br></p>",
            "caption": "<p><br></p>",
            "credit": "<p><br></p>",
            "text": "",
            "postertext": "",
            "tableasHTML": ""
        },
        "versionUrn": "urn:pearson:work:d5a8989a-f468-47b1-aca0-452e2503a09a",
        "contentUrn": "urn:pearson:entity:5a79c9c5-99fd-4814-b4d3-17e8b55973b3"
    },
    "aside":{
        "id": "urn:pearson:manifest:591b8d42-7966-4337-912d-0635e328dfb2",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "type": "element-aside",
        "subtype": "sidebar",
        "designtype": "asideSidebar02",
        "elementdata": {
            "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
            "frontmatter": [ ],
            "bodymatter": [
                {
                    "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                    "type": "element-authoredtext",
                    "subtype": "",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": ""
                    },
                    "html": {
                        "text": "<p class=\"paragraphNumeroUno\">`\" \\\/JSX< abc >?kk<lk> lk l is one of the most commonly used syntax extensions out there. Originally JSX was parsed via a Facebook fork of Esprima — a JavaScript syntax parser developed by jQuery. As it gained momentum, Acorn took things to their hands and decided to make their own version of the parser which ended up being 1.5–2x faster than Esprima-fb, and is now being used by officially Babel. <br></p>"
                    },
                    "comments": false,
                    "tcm": true,
                    "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                    "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                }
            ],
        "backmatter": [ ]
        },
        "contentUrn": "urn:pearson:entity:2b489c98-5e61-46d8-967c-6354b28e3679",
        "versionUrn": "urn:pearson:manifest:591b8d42-7966-4337-912d-0635e328dfb2"
    },
    "workedExample":{
        "id": "urn:pearson:manifest:e420fcb8-8963-4237-823c-9e1e85c95ec0",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "type": "element-aside",
        "subtype": "workedexample",
        "designtype": "workedexample1",
        "elementdata": {
            "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
            "frontmatter": [ ],
            "bodymatter": [
                {
                    "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e7a",
                    "type": "element-authoredtext",
                    "subtype": "",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": ""
                    },
                    "html": {
                        "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                    },
                    "comments": false,
                    "tcm": true,
                    "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                    "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                }
            ],
            "backmatter": [ ]
        },
        "contentUrn": "urn:pearson:entity:cecd4361-d86d-45a8-9754-82fedb9f6d6b",
        "versionUrn": "urn:pearson:manifest:e420fcb8-8963-4237-823c-9e1e85c95ec0"
    },
    "assessmentSlate":{
        "id": "urn:pearson:work:8af3b6ff-92eb-4d06-acd0-5d0ce10c8242",
        "type": "element-assessment",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "elementdata": {
            "schema": "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment",
            "assessmentid": "urn:pearson:work:086988ff-d82f-487f-b146-55de9f650b77",
            "assessmenttitle": "CITE Assessment/Register:10001#01",
            "assessmentformat": "tdx,show hide",
            "usagetype": "Quiz"
        },
        "html": {
            "schema": "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment",
            "assessmentid": "urn:pearson:work:086988ff-d82f-487f-b146-55de9f650b77",
            "title": "CITE Assessment/Register:10001#01",
            "assessmentformat": "tdx,show hide",
            "usagetype": "Quiz"
        },
        "versionUrn": "urn:pearson:work:8af3b6ff-92eb-4d06-acd0-5d0ce10c8242",
        "contentUrn": "urn:pearson:entity:ce2dbc74-ad0e-4825-bcf5-218d2daaa877"
    },
    "lo":{
        "id": "urn:pearson:work:feac3b3c-df3b-4917-9bad-305c56260fc2",
        "type": "element-learningobjectivemapping",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "elementdata": {
            "loref": "urn:pearson:educationalgoal:69143a66-d347-4aa7-8b34-2118b6e661ca"
        },
        "html": {
            "text": "<p class=\"paragraph-learning-objectives-list\"></p>",
            "loref": "urn:pearson:educationalgoal:69143a66-d347-4aa7-8b34-2118b6e661ca"
        },
        "contentUrn": "urn:pearson:entity:d68ea40a-bfa1-4a16-8cc6-48eefe26d31e",
        "versionUrn": "urn:pearson:work:feac3b3c-df3b-4917-9bad-305c56260fc2"
    },
    "ma":{
        "id": "urn:pearson:work:00b85f90-0ee8-4898-b3b3-d55102873512",
        "type": "element-generateLOlist",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "elementdata": {
            "level": "chapter",
            "groupby": ""
        },
        "html": {
            "text": "<p class=\"paragraph-learning-objectives-list\"></p>",
            "trackersemantic": []
        },
        "contentUrn": "urn:pearson:entity:ae197a50-0c0f-4ef6-918e-2973b42e4afb",
        "versionUrn": "urn:pearson:work:00b85f90-0ee8-4898-b3b3-d55102873512"
    },
    "elementLO": {
        "comments": false,
        "contentUrn": "urn:pearson:entity:39a7a694-d342-42d4-9171-8649de19f0d4",
        "designtype": "",
        "id": "urn:pearson:work:b1468edb-1fe1-464e-9e2c-90885e2882d0",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "status": "wip",
        "subtype": "",
        "tcm": true,
        "type": "element-learningobjectives",
        "versionUrn": "urn:pearson:work:b1468edb-1fe1-464e-9e2c-90885e2882d0",
        "feedback": false,
        "html": {
            "text": '<h2 class="heading2learningObjectiveItem"><br></h2>'
        },
        "elementdata": {
            "schema": "http://schemas.pearson.com/wip-authoring/learningobjectives/1#/definitions/learningobjectives",
            "headers": [{
                "charEnd": -1,
                "charStart": 0,
                "level": 2
            }
            ],
            "objectives": [{
                "objectiveid": "urn:pearson:work:b1468edb-1fe1-464e-9e2c-90885e2882d0",
                "referenceid": "urn:pearson:manifest:26709b4c-4e2b-4ca0-8da4-d00d8341f14c",
                "authoredtext": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext"
                }
            }
            ]
        }
    },
    "citation":{
        "contentUrn": "urn:pearson:entity:561bce6f-4fa0-40a6-a156-f17d44aff1ea",
        "elementdata": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": ""
        },
        "html": { "text": "<p class='paragraphNumeroUno'>new test</p>" },
        "id": "urn:pearson:work:ec495654-604f-4c7a-8d41-0a942d75376f",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "status": "wip",
        "type": "element-citation",
        "versionUrn": "urn:pearson:work:ec495654-604f-4c7a-8d41-0a942d75376f"
    },
    "popup":{
        "contentUrn": "urn:pearson:entity:2c5baa8a-e6c9-4669-8206-7ff30ce20878",
        "id": "urn:pearson:manifest:5d84b194-a509-4993-bd33-303fb3790de4",
        "index": 0,
        "popupdata": {
            "bodymatter": [],
            "postertextobject": [{"id":"567"}],
            "formatted-title": {
                "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a",
                "type": "element-authoredtext",
                "subtype": "",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": "Paragraph"
                },
                "html": {
                    "text": "<p class=\"paragraphNumeroUno\">Paragraph</p>"
                },
                "comments": true,
                "tcm": false,
                "feedback": true,
                "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
            }
        },
        "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/popup",
        "type": "popup",
        "versionUrn": "urn:pearson:manifest:5d84b194-a509-4993-bd33-303fb3790de4"
    },
    "popup2":{
        "contentUrn": "urn:pearson:entity:2c5baa8a-e6c9-4669-8206-7ff30ce20878",
        "id": "urn:pearson:manifest:5d84b194-a509-4993-bd33-303fb3790de4",
        "index": 0,
        "popupdata": {
            "bodymatter": []
        },
        "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/popup",
        "type": "popup",
        "versionUrn": "urn:pearson:manifest:5d84b194-a509-4993-bd33-303fb3790de4"
    },
    "citationgroup": {
        "contentUrn": "urn:pearson:entity:d1b0bca1-154c-44e1-bd6f-2e4013bc6a47",
        "contents": { "bodymatter": [], "formatted-title": [] },
        "id": "urn:pearson:manifest:ccb65434-81a6-4658-a224-e109939119d0",
        "schema": "http://schemas.pearson.com/wip-authoring/citations/1",
        "type": "citations",
        "versionUrn": "urn:pearson:manifest:ccb65434-81a6-4658-a224-e109939119d0"

    },
    "citationgroup2": {
        "contentUrn": "urn:pearson:entity:d1b0bca1-154c-44e1-bd6f-2e4013bc6a47",
        "contents": { "bodymatter": [] },
        "id": "urn:pearson:manifest:ccb65434-81a6-4658-a224-e109939119d0",
        "schema": "http://schemas.pearson.com/wip-authoring/citations/1",
        "type": "citations",
        "versionUrn": "urn:pearson:manifest:ccb65434-81a6-4658-a224-e109939119d0"

    },
    "poetry": {
        "id": "urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f28540",
        "versionUrn": "urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f28540",
        "contentUrn": "urn:pearson:entity:44d43f1b-3bdf-4386-a06c-bfa779f27y75",
        "schema": "http://schemas.pearson.com/wip-authoring/poetry/1",
        "type": "poetry",
        "numberedline": true,
        "numberedstanza": true,
        "contents": {
            "formatted-title": {
                "type": "element-authoredtext",
                "id": "urn:pearson:work:e1b59ae0-b04a-4b6e-a1a4-33e21073g5w4",
                "text": "",
                "html": {}
            },
            "formatted-subtitle": {
                "type": "element-authoredtext",
                "id": "urn:pearson:work:e1b59ae0-b04a-4b6e-a1a4-33e21073g5w4",
                "text": ""
            },
            "formatted-caption": {
                "type": "element-authoredtext",
                "id": "urn:pearson:work:e1b59ae0-b04a-4b6e-a1a4-33e21073g5w4",
                "text": "Poetry caption"
            },
            "creditsarray": [{
                "type": "element-authoredtext",
                "id": "urn:pearson:work:e1b59ae0-b04a-4b6e-a1a4-33e21073go6t",
                "text": "Poetry credit"
            }],
            "bodymatter": [
                {
                    "type": "stanza",
                    "schema": "http://schemas.pearson.com/wip-authoring/poetry/1",
                    "id": "urn:pearson:work:e1b59ae0-b04a-4b6e-a1a4-33e21077u97",
                    "contentUrn": "urn:pearson:entity:44d43f1b-3bdf-4386-a06c-bfa779f28hh5",
                    "versionUrn": "urn:pearson:work:e1b59ae0-b04a-4b6e-a1a4-33e21077u97",
                    "slateUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
                    "poetrylines": [
                        {
                            "type": "line",
                            "id": "urn:pearson:entity:44d43f1b-3bdf-4386-a06c-bfa779f28hh5:f2f5300e-34fa-4d87-82c1-29e33bf5fu67",
                            "authoredtext": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": ""
                            }
                        },
                    ],
                    "html": {
                        "title": "<p></p>",
                        "subtitle": "<p></p>",
                        "captions": "<p></p>",
                        "credits": "<p></p>",
                        "text": "<span><br /></span>"
                    }
                }
            ]
        }
    },
    "stanza": {
        "type": "stanza",
        "schema": "http://schemas.pearson.com/wip-authoring/poetry/1",
        "id": "urn:pearson:work:e1b59ae0-b04a-4b6e-a1a4-33e21077u97",
        "contentUrn": "urn:pearson:entity:44d43f1b-3bdf-4386-a06c-bfa779f28hh5",
        "versionUrn": "urn:pearson:work:e1b59ae0-b04a-4b6e-a1a4-33e21077u97",
        "slateUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
        "poetrylines": [
            {
                "type": "line",
                "id": "urn:pearson:entity:44d43f1b-3bdf-4386-a06c-bfa779f28hh5:f2f5300e-34fa-4d87-82c1-29e33bf5fu67",
                "authoredtext": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": ""
                }
            },
        ],
        "html": {
            "title": "<p></p>",
            "subtitle": "<p></p>",
            "captions": "<p></p>",
            "credits": "<p></p>",
            "text": "<span><br /></span>"
        }
    },
    "multicolumn": multiColumnContainer,
    "threeMulticolumn": threeMultiColumnContainer,
    'ps': {
        "id":"urn:pearson:work:dea889ba-9bba-411f-860f-a1df66133746",
        "type":"element-dialogue",
        "schema":"http://schemas.pearson.com/wip-authoring/element/1",
        "elementdata":{
           "startNumber":"1",
           "numberedlines":false,
           "acttitle":{
              "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
              "text":""
           },
           "scenetitle":{
              "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
              "text":""
           },
           "dialoguecontents":[
              {
                 "type":"stagedirection",
                 "stagedirection":{
                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text":""
                 }
              },
              {
                 "type":"lines",
                 "speaker":{
                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text":""
                 },
                 "lines":[
                    {
                       "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                       "text":""
                    }
                 ]
              }
           ]
        },
        "credits":{
           "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
           "text":""
        },
        "html":{
           "actTitle":"<p></p>",
           "sceneTitle":"<p></p>",
           "dialogueContent":[
              {
                 "type":"stagedirection",
                 "text":"<p></p>"
              },
              {
                 "type":"lines",
                 "characterName":"<p></p>",
                 "text":"<p><span class=\"dialogueLine\"><br></span></p>"
              }
           ],
           "credits":"<p></p>"
        },
        "versionUrn":"urn:pearson:work:dea889ba-9bba-411f-860f-a1df66133746",
        "contentUrn":"urn:pearson:entity:9eca6589-9f49-4dac-9c96-3b65540bb0dd",
        "status":"wip"
    },
    'tcc': {
        "id": "urn:pearson:work:e86d43e6-db98-4a79-8fef-a8ce7fc1c012",
        "type": "element-tcc",
        "subtype": "edynamic",
        "schema":"http://schemas.pearson.com/wip-authoring/element/1",
        "versionUrn": "urn:pearson:work:e86d43e6-db98-4a79-8fef-a8ce7fc1c012",
        "contentUrn": "urn:pearson:entity:4ad7f516-7d96-4832-a6bf-3a8f60f97063"
    },
    'bl': {
        "id":"urn:pearson:manifest:f1a32a87-213e-4b9d-9e08-a29165ac4f84",
        "type":"manifestlist",
        "subtype":"decimal",
        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
        "versionUrn":"urn:pearson:manifest:f1a32a87-213e-4b9d-9e08-a29165ac4f84",
        "contentUrn":"urn:pearson:entity:b5eda537-71d9-4a0a-a848-382260dc1ce2",
        "listdata":{
           "bodymatter":[
              {
                 "id":"urn:pearson:manifest:6d34d2a1-3abd-40f2-be72-0a9efdd76ac9",
                 "type":"manifestlistitem",
                 "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                 "versionUrn":"urn:pearson:manifest:6d34d2a1-3abd-40f2-be72-0a9efdd76ac9",
                 "contentUrn":"urn:pearson:entity:206b399f-0948-4dac-8f35-0e8e61feeb71",
                 "listitemdata":{
                    "bodymatter":[
                       {
                          "id":"urn:pearson:work:af8008a5-0cd0-4d1a-9f37-716cd2c7ddab",
                          "type":"element-authoredtext",
                          "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                          "elementdata":{
                             "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                             "text":""
                          },
                          "html":{
                             "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                          },
                          "versionUrn":"urn:pearson:work:af8008a5-0cd0-4d1a-9f37-716cd2c7ddab",
                          "contentUrn":"urn:pearson:entity:7b5960de-3c88-4778-8986-6c6950e56ec0",
                          "status":"wip"
                       }
                    ]
                 }
              }
           ]
        },
        "listtype":"ordered",
        "startNumber":1,
        "columnnumber":1,
        "iconcolor":"iconColor1",
        "fontstyle":"fontStyle1"
     },
    'ds': {
        "id":"urn:pearson:work:f737c09e-4c8c-49f5-bfdc-d845c0518543",
        "type":"discussion",
        "schema":"http://schemas.pearson.com/wip-authoring/numberedblock/1",
        "title":{
           "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
           "text":""
        },
        "html":{
           "title":"<p><br></p>"
        },
        "versionUrn":"urn:pearson:work:f737c09e-4c8c-49f5-bfdc-d845c0518543",
        "contentUrn":"urn:pearson:entity:ad0fbaf4-2004-415b-ba77-d5ed4aa7e470",
        "status":"wip",
        "blockdata":{
           "business":"HNO",
           "itemid":"",
           "path":"",
           "importeddiscussiontitle":{
              "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
              "text":""
           },
           "usagetype":""
        }
    },
    'tabbed-2-column': {
        "id": "urn:pearson:manifest:79e2336c-c108-4cb4-a4b8-17675a26f521",
        "type": "groupedcontent",
        "subtype": "tab",
        "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
        "width": "text-width",
        "groupproportions": "60-40",
        "versionUrn": "urn:pearson:manifest:79e2336c-c108-4cb4-a4b8-17675a26f521",
        "contentUrn": "urn:pearson:entity:9f4e6458-a6da-4f00-9293-438b87000dc1",
        "groupeddata": {
            "bodymatter": [{
                "id": "urn:pearson:manifest:8ef75e71-c692-48e6-abfc-ace51633dcc1",
                "type": "group",
                "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                "versionUrn": "urn:pearson:manifest:8ef75e71-c692-48e6-abfc-ace51633dcc1",
                "contentUrn": "urn:pearson:entity:bbea5eb1-95ca-4669-85f9-5e1e7aee56c5",
                "groupdata": {
                    "bodymatter": [{
                        "id": "urn:pearson:manifest:a7700d1e-16bd-4bb1-846d-e270d13c32be",
                        "type": "groupedcontent",
                        "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                        "width": "wider",
                        "groupproportions": "60-40",
                        "versionUrn": "urn:pearson:manifest:a7700d1e-16bd-4bb1-846d-e270d13c32be",
                        "contentUrn": "urn:pearson:entity:fc7d6fe6-b4f2-4502-a631-0e1c29b5f919",
                        "groupeddata": {
                            "bodymatter": [{
                                "id": "urn:pearson:manifest:b05a0970-3e38-4ab9-8e93-c42530002348",
                                "type": "group",
                                "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                                "versionUrn": "urn:pearson:manifest:b05a0970-3e38-4ab9-8e93-c42530002348",
                                "contentUrn": "urn:pearson:entity:4d3517a7-2b10-4ef4-861c-d5f912ac211f",
                                "groupdata": {
                                    "bodymatter": [{
                                        "id": "urn:pearson:work:2d7043c0-bb23-4628-8a87-dc2c862fa183",
                                        "type": "element-authoredtext",
                                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                        "elementdata": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text": ""
                                        },
                                        "html": {
                                            "text": "<p class=\"paragraphNumeroUno\"><br></p>",
                                            "footnotes": {},
                                            "assetsPopover": {},
                                            "glossaryentries": {},
                                            "indexEntries": {}
                                        },
                                        "versionUrn": "urn:pearson:work:2d7043c0-bb23-4628-8a87-dc2c862fa183",
                                        "contentUrn": "urn:pearson:entity:26db5cc2-fc07-4564-a92f-587db5945e60"
                                    }, {
                                        "id": "urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f28540",
                                        "type": "poetry",
                                        "schema": "http://schemas.pearson.com/wip-authoring/poetry/1",
                                        "versionUrn": "urn:pearson:manifest:8d443be4-1a9c-40fb-a1c8-28d1d419bf6f",
                                        "contentUrn": "urn:pearson:entity:794ed71a-2c8b-4e7a-a518-31a9cc79a8e2",
                                        "contents": {
                                            "bodymatter": [{
                                                "id": "urn:pearson:work:10585ed5-88c0-49e4-b52b-a0579149ff14",
                                                "type": "stanza",
                                                "schema": "http://schemas.pearson.com/wip-authoring/poetry/1",
                                                "html": {
                                                    "text": "<p><span class=\"poetryLine \" data-id=\":3162fa4d-d3fb-42da-aec5-aa300a380a97\"><br></span></p>",
                                                    "footnotes": {},
                                                    "assetsPopover": {},
                                                    "glossaryentries": {},
                                                    "indexEntries": {}
                                                },
                                                "versionUrn": "urn:pearson:work:10585ed5-88c0-49e4-b52b-a0579149ff14",
                                                "contentUrn": "urn:pearson:entity:36993154-6a54-4770-9b18-74a2e86cacf4",
                                                "poetrylines": [{
                                                    "id": ":3162fa4d-d3fb-42da-aec5-aa300a380a97",
                                                    "type": "line",
                                                    "authoredtext": {
                                                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                        "text": ""
                                                    }
                                                }]
                                            }]
                                        },
                                        "status": "wip"
                                    }]
                                },
                                "status": "wip"
                            }, {
                                "id": "urn:pearson:manifest:6fb5881d-3924-47db-af18-0503994e2488",
                                "type": "group",
                                "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                                "versionUrn": "urn:pearson:manifest:6fb5881d-3924-47db-af18-0503994e2488",
                                "contentUrn": "urn:pearson:entity:cca29a81-0299-4d20-a642-f9853cc03eb2",
                                "groupdata": {
                                    "bodymatter": [{
                                        "id": "urn:pearson:work:0dec3c8c-341f-476b-a2ad-4b324fad8f6c",
                                        "type": "element-authoredtext",
                                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                        "elementdata": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text": ""
                                        },
                                        "html": {
                                            "text": "<p class=\"paragraphNumeroUno\"><br></p>",
                                            "footnotes": {},
                                            "assetsPopover": {},
                                            "glossaryentries": {},
                                            "indexEntries": {}
                                        },
                                        "versionUrn": "urn:pearson:work:0dec3c8c-341f-476b-a2ad-4b324fad8f6c",
                                        "contentUrn": "urn:pearson:entity:0a352950-4493-4a20-9c1a-c1390ad4c51c"
                                    }]
                                },
                                "status": "wip"
                            }]
                        },
                        "status": "wip"
                    }]
                },
                "status": "wip"
            }]
        },
        "status": "wip"
    },
    'tab' : {
        "id": "urn:pearson:manifest:f3eba9b1-c815-428a-a5c3-4aec6f831713",
        "type": "group",
        "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
        "versionUrn": "urn:pearson:manifest:f3eba9b1-c815-428a-a5c3-4aec6f831713",
        "contentUrn": "urn:pearson:entity:eed0af4f-297b-4ca6-8575-6b1d2d7d93ce",
        "groupdata": {
            "bodymatter": [{
                "id": "urn:pearson:manifest:3fdc3860-4568-4091-aeae-bf10b8e1e9f7",
                "type": "groupedcontent",
                "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                "width": "wider",
                "groupproportions": "60-40",
                "versionUrn": "urn:pearson:manifest:3fdc3860-4568-4091-aeae-bf10b8e1e9f7",
                "contentUrn": "urn:pearson:entity:636bd3cb-3100-46b5-a4dc-794f86e66b0f",
                "groupeddata": {
                    "bodymatter": [{
                        "id": "urn:pearson:manifest:4edbf488-1d26-4847-a715-7e7f9aabf09b",
                        "type": "group",
                        "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                        "versionUrn": "urn:pearson:manifest:4edbf488-1d26-4847-a715-7e7f9aabf09b",
                        "contentUrn": "urn:pearson:entity:0e76d935-622d-4920-b01e-965883d9dd7a",
                        "groupdata": {
                            "bodymatter": [{
                                "id": "urn:pearson:work:0aecb782-4fee-4747-b468-685e666cee89",
                                "type": "element-authoredtext",
                                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                "elementdata": {
                                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text": ""
                                },
                                "html": {
                                    "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                                },
                                "versionUrn": "urn:pearson:work:0aecb782-4fee-4747-b468-685e666cee89",
                                "contentUrn": "urn:pearson:entity:6759f20f-2da1-4fa4-8c10-e4c631bad1c1",
                                "status": "wip"
                            }]
                        }
                    }, {
                        "id": "urn:pearson:manifest:99719c4d-a21f-421b-857d-dace340e64c1",
                        "type": "group",
                        "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                        "versionUrn": "urn:pearson:manifest:99719c4d-a21f-421b-857d-dace340e64c1",
                        "contentUrn": "urn:pearson:entity:91b20753-cc4f-4032-bbe1-eb4457124ecb",
                        "groupdata": {
                            "bodymatter": [{
                                "id": "urn:pearson:work:1d68f5dd-ed52-44c3-9a1b-2ae68166f107",
                                "type": "element-authoredtext",
                                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                "elementdata": {
                                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text": ""
                                },
                                "html": {
                                    "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                                },
                                "versionUrn": "urn:pearson:work:1d68f5dd-ed52-44c3-9a1b-2ae68166f107",
                                "contentUrn": "urn:pearson:entity:1a35f6fc-d3b5-4c00-8e22-7ccd2450692e",
                                "status": "wip"
                            }]
                        }
                    }]
                }
            }]
        }
    }
}