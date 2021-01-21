export default {
    fetchElementTagData: {
        'paragraph': {
            type: "element-authoredtext"
        },
        'heading': {
            type: "element-authoredtext",
            elementdata: {
                headers: [{
                    level: 3
                }]
            }
        },
        'list': {
            type: "element-list",
            subtype: "lower-alpha"
        },
        'blockquote': {
            type: "element-blockfeature",
            elementdata: {
                type: "blockquote"
            }
        },
        'aside': {
            elementType: "element-aside",
            subtype: "sidebar"
        },
        'workedexample': {
            type: "element-aside",
            subtype: "workedexample"
        },
        'stanza': {
            type: "stanza"
        },
        'figure': {
            type: "figure",
            figuretype: "image"
        },
        'interactive': {
            type: "figure",
            figuretype: "interactive",
            figuredata: {
                interactivetype: "table"
            }
        }
    },
    slate1: {
        "urn:pearson:manifest:90b59454-2e5d-46f2-968f-fd1d636d0edb": {
            "id": "urn:pearson:manifest:90b59454-2e5d-46f2-968f-fd1d636d0edb",
            "type": "manifest",
            "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
            "versionUrn": "urn:pearson:manifest:90b59454-2e5d-46f2-968f-fd1d636d0edb",
            "contentUrn": "urn:pearson:entity:e1848207-2f42-4d17-a8cf-1ec9a06eb726",
            "contents": {
                "bodymatter": [{
                    "id": "urn:pearson:work:bbcb225c-628f-41b3-b6dc-0ca38565c10b",
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
                        "glossaryentries": {}
                    },
                    "versionUrn": "urn:pearson:work:bbcb225c-628f-41b3-b6dc-0ca38565c10b",
                    "contentUrn": "urn:pearson:entity:e3921160-7dac-4bea-95f4-390c638d7377"
                }, {
                    "id": "urn:pearson:manifest:2752c87b-d77d-4b87-b8df-b41057cf4bcf",
                    "type": "element-aside",
                    "subtype": "sidebar",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "designtype": "asideSidebar01",
                    "elementdata": {
                        "bodymatter": [{
                            "id": "urn:pearson:work:88ce97c2-0b61-4db8-89ce-431ab90d897b",
                            "type": "element-authoredtext",
                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                            "elementdata": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "paragraph in aside"
                            },
                            "html": {
                                "text": "<p class=\"paragraphNumeroUno\">paragraph in aside</p>",
                                "footnotes": {},
                                "assetsPopover": {},
                                "glossaryentries": {}
                            },
                            "versionUrn": "urn:pearson:work:88ce97c2-0b61-4db8-89ce-431ab90d897b",
                            "contentUrn": "urn:pearson:entity:3d2fb46e-7e20-46cb-85f0-f4531cd69ae3"
                        }, {
                            "id": "urn:pearson:work:09e43225-461d-4b37-a732-a5cf442340e6",
                            "type": "element-list",
                            "subtype": "lower-alpha",
                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                            "elementdata": {
                                "startNumber": "1",
                                "schema": "http://schemas.pearson.com/wip-authoring/list/1#/definitions/list",
                                "type": "list",
                                "listtype": "ordered",
                                "designtype": "list",
                                "subtype": "lower-alpha",
                                "listitems": [{
                                    "type": "paragraph",
                                    "authoredtext": {
                                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                        "text": "line1"
                                    }
                                }, {
                                    "type": "paragraph",
                                    "authoredtext": {
                                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                        "text": "line2"
                                    }
                                }, {
                                    "type": "list",
                                    "listtype": "ordered",
                                    "subtype": "lower-roman",
                                    "listitems": [{
                                        "type": "paragraph",
                                        "authoredtext": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text": "line3"
                                        }
                                    }]
                                }]
                            },
                            "html": {
                                "text": "<ol class=\"lower-alpha\" treelevel=\"1\" style=\"counter-increment: section 0;\"><li class=\"listItemNumeroUnoLowerAlpha\">line1</li><li class=\"listItemNumeroUnoLowerAlpha\">line2<ol class=\"lower-roman\" treelevel=\"2\" style=\"\"><li class=\"reset listItemNumeroUnoLowerRoman\">line3</li></ol></li></ol>",
                                "footnotes": {},
                                "assetsPopover": {},
                                "glossaryentries": {}
                            },
                            "versionUrn": "urn:pearson:work:09e43225-461d-4b37-a732-a5cf442340e6",
                            "contentUrn": "urn:pearson:entity:d8b7afb2-5cbb-4579-bc23-bbf2bf07f501"
                        }],
                        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
                    },
                    "versionUrn": "urn:pearson:manifest:2752c87b-d77d-4b87-b8df-b41057cf4bcf",
                    "contentUrn": "urn:pearson:entity:2e9a4aba-348d-4f42-ad56-85cc815cefa4",
                    "status": "wip"
                }, {
                    "id": "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                    "type": "element-aside",
                    "subtype": "workedexample",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "designtype": "workedexample1",
                    "elementdata": {
                        "bodymatter": [{
                            "id": "urn:pearson:work:6b60ba13-6235-4169-836b-b100568fe8a3",
                            "type": "element-authoredtext",
                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                            "elementdata": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "H4 in WE Head",
                                "headers": [{
                                    "level": 4
                                }]
                            },
                            "html": {
                                "text": "<h4 class=\"heading4NummerEins\">H4 in WE Head</h4>",
                                "footnotes": {},
                                "assetsPopover": {},
                                "glossaryentries": {}
                            },
                            "versionUrn": "urn:pearson:work:6b60ba13-6235-4169-836b-b100568fe8a3",
                            "contentUrn": "urn:pearson:entity:37c2c720-af63-4d20-b724-d41c21bfc91a"
                        }, {
                            "id": "urn:pearson:work:0a62ddd5-e541-441b-a5e1-cce05dcaa67f",
                            "type": "figure",
                            "figuretype": "image",
                            "subtype": "imageTextWidth",
                            "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                            "alignment": "text-width",
                            "title": {
                                "schema":
                                "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "test label",
                            },
                            "subtitle": {
                                "schema":
                                "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "test title ",
                                "footnotes": [
                                    {
                                        "charAt": 11,
                                        "footnoteid": "urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487",
                                        "footnotecontent": [
                                            {
                                                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                                "id": "urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487",
                                                "type": "element-authoredtext",
                                                "elementdata": {
                                                "schema":
                                                    "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                "text": "footnote 1",
                                                },
                                            },
                                        ],
                                    },
                                ],
                            },
                            "captions": {
                                "schema":
                                "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "test caption",
                            },
                            "credits": {
                                "schema":
                                "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "test credit",
                            },
                            "figuredata": {
                                "schema":
                                "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                                "imageid": "",
                                "path":
                                "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
                                "height": "422",
                                "width": "680",
                            },
                            "html": {
                                "title": "<p>test label</p>",
                                "subtitle":
                                '<p>test title <sup><a href="#" id="urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487" data-uri="urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487" data-footnoteelementid="urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487" class="Pearson-Component paragraphNumeroUnoFootnote" data-mce-href="#">*</a></sup></p>',
                                "text": "",
                                "postertext": "",
                                "captions": "<p>test caption</p>",
                                "credits": "<p>test credit</p>",
                                "footnotes": {
                                "urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487":
                                    "<p>footnote 1</p>",
                                },
                                "assetsPopover": {},
                                "glossaryentries": {},
                            },
                            "versionUrn": "urn:pearson:work:0a62ddd5-e541-441b-a5e1-cce05dcaa67f",
                            "contentUrn": "urn:pearson:entity:5f76dd27-6372-425d-913b-ae387dfdeb93"
                        }, {
                            "id": "urn:pearson:manifest:a4100af0-6143-41ed-82a4-33012dd5f134",
                            "type": "manifest",
                            "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
                            "versionUrn": "urn:pearson:manifest:a4100af0-6143-41ed-82a4-33012dd5f134",
                            "contentUrn": "urn:pearson:entity:4e42d3a8-f794-4977-9e13-b1e76431d8bf",
                            "contents": {
                                "bodymatter": [{
                                    "id": "urn:pearson:work:844ca613-b5e0-4d46-857c-ce65a2ce261d",
                                    "type": "element-blockfeature",
                                    "subtype": "quote",
                                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                    "elementdata": {
                                        "schema": "http://schemas.pearson.com/wip-authoring/blockfeature/1#/definitions/blockfeature",
                                        "type": "pullquote",
                                        "authoredtext": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text": "BQ in WE"
                                        }
                                    },
                                    "html": {
                                        "text": "<h3 class=\"pullQuoteNumeroUno\">BQ in WE</h3>",
                                        "footnotes": {},
                                        "assetsPopover": {},
                                        "glossaryentries": {}
                                    },
                                    "versionUrn": "urn:pearson:work:844ca613-b5e0-4d46-857c-ce65a2ce261d",
                                    "contentUrn": "urn:pearson:entity:af8037db-6868-44c5-bec5-75453cdb0419"
                                }, {
                                    "id": "urn:pearson:work:c5617a01-7723-4083-b13a-1f26c6cea456",
                                    "type": "element-authoredtext",
                                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                    "elementdata": {
                                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                        "text": "paragraoh in WE"
                                    },
                                    "html": {
                                        "text": "<p class=\"paragraphNumeroUno\">paragraoh in WE</p>",
                                        "footnotes": {},
                                        "assetsPopover": {},
                                        "glossaryentries": {}
                                    },
                                    "versionUrn": "urn:pearson:work:c5617a01-7723-4083-b13a-1f26c6cea456",
                                    "contentUrn": "urn:pearson:entity:b653b231-5abe-4642-8249-13b6bcb01806"
                                },{
                                    "id": "urn:pearson:work:0a62ddd5-e541-441b-a5e1-cce05dcaa67f",
                                    "type": "figure",
                                    "figuretype": "image",
                                    "subtype": "imageTextWidth",
                                    "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                                    "alignment": "text-width",
                                    "title": {
                                        "schema":
                                        "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                        "text": "test label",
                                    },
                                    "subtitle": {
                                        "schema":
                                        "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                        "text": "test title ",
                                        "footnotes": [
                                            {
                                                "charAt": 11,
                                                "footnoteid": "urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487",
                                                "footnotecontent": [
                                                    {
                                                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                                        "id": "urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487",
                                                        "type": "element-authoredtext",
                                                        "elementdata": {
                                                        "schema":
                                                            "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                        "text": "footnote 1",
                                                        },
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    "captions": {
                                        "schema":
                                        "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                        "text": "test caption",
                                    },
                                    "credits": {
                                        "schema":
                                        "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                        "text": "test credit",
                                    },
                                    "figuredata": {
                                        "schema":
                                        "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                                        "imageid": "",
                                        "path":
                                        "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
                                        "height": "422",
                                        "width": "680",
                                    },
                                    "html": {
                                        "title": "<p>test label</p>",
                                        "subtitle":
                                        '<p>test title <sup><a href="#" id="urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487" data-uri="urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487" data-footnoteelementid="urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487" class="Pearson-Component paragraphNumeroUnoFootnote" data-mce-href="#">*</a></sup></p>',
                                        "text": "",
                                        "postertext": "",
                                        "captions": "<p>test caption</p>",
                                        "credits": "<p>test credit</p>",
                                        "footnotes": {
                                        "urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487":
                                            "<p>footnote 1</p>",
                                        },
                                        "assetsPopover": {},
                                        "glossaryentries": {},
                                    },
                                    "versionUrn": "urn:pearson:work:0a62ddd5-e541-441b-a5e1-cce05dcaa67f",
                                    "contentUrn": "urn:pearson:entity:5f76dd27-6372-425d-913b-ae387dfdeb93"
                                }],
                                "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
                            },
                            "status": "wip"
                        }, {
                            "id": "urn:pearson:manifest:294914e9-e29b-4c31-9b4b-d2a095881067",
                            "type": "manifest",
                            "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
                            "versionUrn": "urn:pearson:manifest:294914e9-e29b-4c31-9b4b-d2a095881067",
                            "contentUrn": "urn:pearson:entity:15c8c5d5-6c50-4f9b-a4d3-af567c725b20",
                            "contents": {
                                "bodymatter": [{
                                    "id": "urn:pearson:work:f6cb48e8-8efc-4f0d-9562-c9edd1c13b71",
                                    "type": "element-learningobjectives",
                                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                    "elementdata": {
                                        "schema": "http://schemas.pearson.com/wip-authoring/learningobjectives/1#/definitions/learningobjectives",
                                        "objectives": [{
                                            "objectiveid": "urn:pearson:work:f6cb48e8-8efc-4f0d-9562-c9edd1c13b71",
                                            "referenceid": "urn:pearson:manifest:90b59454-2e5d-46f2-968f-fd1d636d0edb",
                                            "authoredtext": {
                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                "text": "LO in WE-SB"
                                            }
                                        }]
                                    },
                                    "html": {
                                        "text": "<h2 class=\"heading2learningObjectiveItem\">LO in WE-SB</h2>",
                                        "footnotes": {},
                                        "assetsPopover": {},
                                        "glossaryentries": {}
                                    },
                                    "versionUrn": "urn:pearson:work:f6cb48e8-8efc-4f0d-9562-c9edd1c13b71",
                                    "contentUrn": "urn:pearson:entity:5bfb1b0e-8a2f-47b2-8e84-d43cf5ec92d2"
                                }],
                                "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
                            },
                            "status": "wip"
                        }],
                        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
                    },
                    "versionUrn": "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                    "contentUrn": "urn:pearson:entity:ff2e13ee-cbf0-403f-a2b3-7ce6789b3905",
                    "status": "wip"
                }, {
                    "id": "urn:pearson:work:0a62ddd5-e541-441b-a5e1-cce05dcaa67f",
                    "type": "figure",
                    "figuretype": "image",
                    "subtype": "imageTextWidth",
                    "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                    "alignment": "text-width",
                    "title": {
                        "schema":
                        "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "test label",
                    },
                    "subtitle": {
                        "schema":
                        "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "test title ",
                        "footnotes": [
                            {
                                "charAt": 11,
                                "footnoteid": "urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487",
                                "footnotecontent": [
                                    {
                                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                        "id": "urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487",
                                        "type": "element-authoredtext",
                                        "elementdata": {
                                        "schema":
                                            "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                        "text": "footnote 1",
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    "captions": {
                        "schema":
                        "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "test caption",
                    },
                    "credits": {
                        "schema":
                        "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "test credit",
                    },
                    "figuredata": {
                        "schema":
                        "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                        "imageid": "",
                        "path":
                        "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
                        "height": "422",
                        "width": "680",
                    },
                    "html": {
                        "title": "<p>test label</p>",
                        "subtitle":
                        '<p>test title <sup><a href="#" id="urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487" data-uri="urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487" data-footnoteelementid="urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487" class="Pearson-Component paragraphNumeroUnoFootnote" data-mce-href="#">*</a></sup></p>',
                        "text": "",
                        "postertext": "",
                        "captions": "<p>test caption</p>",
                        "credits": "<p>test credit</p>",
                        "footnotes": {
                        "urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487":
                            "<p>footnote 1</p>",
                        },
                        "assetsPopover": {},
                        "glossaryentries": {},
                    },
                    "versionUrn": "urn:pearson:work:0a62ddd5-e541-441b-a5e1-cce05dcaa67f",
                    "contentUrn": "urn:pearson:entity:5f76dd27-6372-425d-913b-ae387dfdeb93"  
                }],
                "title": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": "S5"
                },
                "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
            },
            "status": "wip",
            "pageNo": 0,
            "pageCount": 1,
            "pageLimit": 10
        }
    },
    slate2: {
        "urn:pearson:manifest:2ec00412-840e-40bf-ae11-d399c5067c9a": {
            "id": "urn:pearson:manifest:2ec00412-840e-40bf-ae11-d399c5067c9a",
            "type": "manifest",
            "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
            "versionUrn": "urn:pearson:manifest:2ec00412-840e-40bf-ae11-d399c5067c9a",
            "contentUrn": "urn:pearson:entity:d2b62260-9157-4003-a7bc-bbe58e4c7604",
            "contents": {
                "bodymatter": [{
                    "id": "urn:pearson:work:09d00b1e-66a1-406e-b04f-0612d2d2dcdc",
                    "type": "element-authoredtext",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "sample paragraph 1"
                    },
                    "html": {
                        "text": "<p class=\"paragraphNumeroUno\">sample paragraph 1</p>",
                        "footnotes": {},
                        "assetsPopover": {},
                        "glossaryentries": {}
                    },
                    "versionUrn": "urn:pearson:work:09d00b1e-66a1-406e-b04f-0612d2d2dcdc",
                    "contentUrn": "urn:pearson:entity:daf80850-0e45-4c9d-a14a-5db7c4606de0"
                }, {
                    "id": "urn:pearson:manifest:8d910f79-780b-46b2-8762-f6d0b5f593e5",
                    "type": "citations",
                    "schema": "http://schemas.pearson.com/wip-authoring/citations/1",
                    "versionUrn": "urn:pearson:manifest:8d910f79-780b-46b2-8762-f6d0b5f593e5",
                    "contentUrn": "urn:pearson:entity:8ae1090b-2429-4926-b638-ce43560c7f06",
                    "contents": {
                        "bodymatter": [{
                            "id": "urn:pearson:work:2e9de3e7-d8c7-462d-a9cd-306db10bbb34",
                            "type": "element-citation",
                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                            "elementdata": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "citation 1"
                            },
                            "html": {
                                "text": "<p class=\"paragraphNumeroUno\">citation 1</p>",
                                "footnotes": {},
                                "assetsPopover": {},
                                "glossaryentries": {}
                            },
                            "versionUrn": "urn:pearson:work:2e9de3e7-d8c7-462d-a9cd-306db10bbb34",
                            "contentUrn": "urn:pearson:entity:be9bcb6a-76c9-4006-af1d-26d930dfaa59"
                        }],
                        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
                    },
                    "status": "wip"
                }, {
                    "id": "urn:pearson:manifest:d8666a10-dffd-4b16-ab75-ec714a3fc3a6",
                    "type": "poetry",
                    "schema": "http://schemas.pearson.com/wip-authoring/poetry/1",
                    "versionUrn": "urn:pearson:manifest:d8666a10-dffd-4b16-ab75-ec714a3fc3a6",
                    "contentUrn": "urn:pearson:entity:24209527-f5e8-419a-8c80-9b9e56c66f91",
                    "contents": {
                        "bodymatter": [{
                            "id": "urn:pearson:work:65a0c308-77c4-452d-8fe5-eef23628fcb2",
                            "type": "stanza",
                            "schema": "http://schemas.pearson.com/wip-authoring/poetry/1",
                            "html": {
                                "text": "<p><span class=\"poetryLine\" data-id=\"urn:pearson:entity:8164ae50-5900-4c87-b6d2-6f548be42dfd:4e87d54f-47e9-4d90-aa8f-d425f4cec4ea\">stanza 1</span></p>",
                                "footnotes": {},
                                "assetsPopover": {},
                                "glossaryentries": {}
                            },
                            "versionUrn": "urn:pearson:work:65a0c308-77c4-452d-8fe5-eef23628fcb2",
                            "contentUrn": "urn:pearson:entity:8164ae50-5900-4c87-b6d2-6f548be42dfd",
                            "poetrylines": [{
                                "id": "urn:pearson:entity:8164ae50-5900-4c87-b6d2-6f548be42dfd:4e87d54f-47e9-4d90-aa8f-d425f4cec4ea",
                                "type": "line",
                                "authoredtext": {
                                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text": "stanza 1"
                                }
                            }]
                        }]
                    },
                    "status": "wip"
                },{
                    "id": "urn:pearson:manifest:8ad8a4f1-8f76-4e6c-912f-4ffe56a23d8e",
                    "type": "groupedcontent",
                    "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                    "versionUrn": "urn:pearson:manifest:8ad8a4f1-8f76-4e6c-912f-4ffe56a23d8e",
                    "contentUrn": "urn:pearson:entity:d7b3eec3-a4c4-4347-8988-520c43161ab7",
                    "groupeddata": {
                        "bodymatter": [{
                            "id": "urn:pearson:manifest:099fd3df-2900-449c-877e-f8b71b50bee3",
                            "type": "group",
                            "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                            "versionUrn": "urn:pearson:manifest:099fd3df-2900-449c-877e-f8b71b50bee3",
                            "contentUrn": "urn:pearson:entity:709f1947-e5c3-4da8-b8da-8829b66af44e",
                            "groupdata": {
                                "bodymatter": [{
                                    "id": "urn:pearson:work:b300dd0b-dfa6-45f9-af00-84d50d8def45",
                                    "type": "figure",
                                    "figuretype": "image",
                                    "subtype": "image25Text",
                                    "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                                    "alignment": "quarter-text",
                                    "title": {
                                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                        "text": "ewqewq"
                                    },
                                    "subtitle": {
                                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                        "text": "dfdsvxvdsv"
                                    },
                                    "captions": {
                                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                        "text": ""
                                    },
                                    "credits": {
                                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                        "text": ""
                                    },
                                    "figuredata": {
                                        "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                                        "imageid": "",
                                        "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
                                        "height": "422",
                                        "width": "680"
                                    },
                                    "html": {
                                        "title": "<p>ewqewq</p>",
                                        "subtitle": "<p>dfdsvxvdsv</p>",
                                        "text": "",
                                        "postertext": "",
                                        "captions": "<p></p>",
                                        "credits": "<p></p>",
                                        "footnotes": {},
                                        "assetsPopover": {},
                                        "glossaryentries": {}
                                    },
                                    "versionUrn": "urn:pearson:work:b300dd0b-dfa6-45f9-af00-84d50d8def45",
                                    "contentUrn": "urn:pearson:entity:07e1f9c9-bfec-484a-8f3e-8cfda4e1d5e4"
                                }]
                            },
                            "status": "wip"
                        }, {
                            "id": "urn:pearson:manifest:e6904457-f6de-4d21-9754-6a2dcbc1f243",
                            "type": "group",
                            "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                            "versionUrn": "urn:pearson:manifest:e6904457-f6de-4d21-9754-6a2dcbc1f243",
                            "contentUrn": "urn:pearson:entity:c821cac4-bcaa-41db-9397-db460e74deb7",
                            "groupdata": {
                                "bodymatter": [{
                                    "id": "urn:pearson:work:7e55ba0d-dec4-415d-a49d-2f576f8b2a41",
                                    "type": "element-authoredtext",
                                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                    "elementdata": {
                                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                        "text": "dasfdgdgsdf",
                                        "headers": [{
                                            "level": 6
                                        }]
                                    },
                                    "html": {
                                        "text": "<h6 class=\"heading6NummerEins\">dasfdgdgsdf</h6>",
                                        "footnotes": {},
                                        "assetsPopover": {},
                                        "glossaryentries": {}
                                    },
                                    "versionUrn": "urn:pearson:work:7e55ba0d-dec4-415d-a49d-2f576f8b2a41",
                                    "contentUrn": "urn:pearson:entity:ea2cb033-a74f-4d82-a5d1-71e413de0485"
                                }, {
                                    "id": "urn:pearson:work:db4e4275-6f9c-4e49-b7bd-9684d1f22be5",
                                    "type": "element-authoredtext",
                                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                    "elementdata": {
                                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                        "text": "sdfdsgegreg",
                                        "headers": [{
                                            "level": 1
                                        }]
                                    },
                                    "html": {
                                        "text": "<h1 class=\"heading1NummerEins\">sdfdsgegreg</h1>",
                                        "footnotes": {},
                                        "assetsPopover": {},
                                        "glossaryentries": {}
                                    },
                                    "versionUrn": "urn:pearson:work:db4e4275-6f9c-4e49-b7bd-9684d1f22be5",
                                    "contentUrn": "urn:pearson:entity:5dda2310-874e-4429-b2c9-9e30c11d619f"
                                }]
                            },
                            "status": "wip"
                        }]
                    },
                    "status": "wip"
                }],
                "title": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": "S4"
                },
                "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
            },
            "status": "wip",
            "pageNo": 0,
            "pageCount": 1,
            "pageLimit": 10
        }
    },
    setSemanticsSnapshotsData: {
        "paragraph": {
            "id": "urn:pearson:work:6ca7667e-03ec-4434-9dc3-8379fbdef980",
            "type": "element-authoredtext",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "elementdata": {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": "this is new  . This is footnote. This is Asset Popover. ",
                "footnotes": [{
                    "charAt": 32,
                    "footnoteid": "urn:pearson:work:ba8326bd-65da-474c-bd46-ad39ae7306ff",
                    "footnotecontent": [{
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "id": "urn:pearson:work:ba8326bd-65da-474c-bd46-ad39ae7306ff",
                        "type": "element-authoredtext",
                        "elementdata": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": "footnote test"
                        }
                    }]
                }],
                "glossaryentries": [{
                    "charAt": 12,
                    "itemid": "urn:pearson:work:1030ab55-0450-437d-a083-1591cd9601ac",
                    "glossaryentrytype": "monolingual",
                    "glossaryentry": [{
                        "term": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": "data"
                        },
                        "definition": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": "new glossary"
                        }
                    }]
                }],
                "internallinks": [{
                    "effect": "pop-over",
                    "linkid": "urn:pearson:entity:4accb6e3-ec83-4cff-bcde-1363be8fda73",
                    "charStart": 41,
                    "charEnd": 45
                }]
            },
            "html": {
                "text": "<p class=\"paragraphNumeroUno\">this is new&nbsp;<dfn class=\"Pearson-Component GlossaryTerm\" data-uri=\"urn:pearson:work:1030ab55-0450-437d-a083-1591cd9601ac\">data</dfn> . This is footnote.<sup><a href=\"#\" id=\"urn:pearson:work:ba8326bd-65da-474c-bd46-ad39ae7306ff\" data-uri=\"urn:pearson:work:ba8326bd-65da-474c-bd46-ad39ae7306ff\" data-footnoteelementid=\"urn:pearson:work:ba8326bd-65da-474c-bd46-ad39ae7306ff\" class=\"Pearson-Component paragraphNumeroUnoFootnote\" data-mce-href=\"#\">*</a></sup> This is <abbr title=\"Asset Popover\" asset-id=\"urn:pearson:work:76773fa8-da92-4b4a-bbc6-449593503963\" data-uri=\"urn:pearson:entity:4accb6e3-ec83-4cff-bcde-1363be8fda73\" class=\"Pearson-Component AssetPopoverTerm\">Asset</abbr> Popover.&nbsp;</p>",
                "footnotes": {
                    "urn:pearson:work:ba8326bd-65da-474c-bd46-ad39ae7306ff": "<p>footnote test</p>"
                },
                "assetsPopover": {},
                "glossaryentries": {
                    "urn:pearson:work:1030ab55-0450-437d-a083-1591cd9601ac": "{\"term\":\"<p>data</p>\",\"definition\":\"<p>new glossary</p>\"}"
                }
            },
            "versionUrn": "urn:pearson:work:6ca7667e-03ec-4434-9dc3-8379fbdef980",
            "contentUrn": "urn:pearson:entity:73f45499-aa32-4e3e-83ac-32848d1667b1"
        },
        "blockquote": {
            "id": "urn:pearson:work:5c790c66-c6d9-4052-b210-e64d19e75600",
            "type": "element-blockfeature",
            "subtype": "quote",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "elementdata": {
                "schema": "http://schemas.pearson.com/wip-authoring/blockfeature/1#/definitions/blockfeature",
                "type": "pullquote",
                "authoredtext": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": " is BQ footnote trialtry3 try4 try5 try6",
                    "footnotes": [{
                        "charAt": 15,
                        "footnoteid": "urn:pearson:work:5645c028-eccc-4cb9-9ca3-b3959a27431f",
                        "footnotecontent": [{
                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                            "id": "urn:pearson:work:5645c028-eccc-4cb9-9ca3-b3959a27431f",
                            "type": "element-authoredtext",
                            "elementdata": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "new data"
                            }
                        }]
                    }, {
                        "charAt": 21,
                        "footnoteid": "urn:pearson:work:e4c4325e-e7ac-4887-937e-f3a0ddc54f75",
                        "footnotecontent": [{
                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                            "id": "urn:pearson:work:e4c4325e-e7ac-4887-937e-f3a0ddc54f75",
                            "type": "element-authoredtext",
                            "elementdata": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": ""
                            }
                        }]
                    }, {
                        "charAt": 35,
                        "footnoteid": "urn:pearson:work:54852ceb-e627-475a-a3d7-1ee4ce049508",
                        "footnotecontent": [{
                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                            "id": "urn:pearson:work:54852ceb-e627-475a-a3d7-1ee4ce049508",
                            "type": "element-authoredtext",
                            "elementdata": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "footnote after versioning"
                            }
                        }]
                    }],
                    "internallinks": [{
                        "effect": "pop-over",
                        "linkid": "urn:pearson:entity:574c75e8-7886-47d5-b954-f4320bd82ac4",
                        "charStart": 26,
                        "charEnd": 29
                    }]
                }
            },
            "html": {
                "text": "<h3 class=\"pullQuoteNumeroUno\">&nbsp;is BQ footnote<sup><a href=\"#\" data-uri=\"urn:pearson:work:5645c028-eccc-4cb9-9ca3-b3959a27431f\" data-footnoteelementid=\"urn:pearson:work:5645c028-eccc-4cb9-9ca3-b3959a27431f\" class=\"Pearson-Component paragraphNumeroUnoFootnote\">*</a></sup> trial<sup><a href=\"#\" data-uri=\"urn:pearson:work:e4c4325e-e7ac-4887-937e-f3a0ddc54f75\" data-footnoteelementid=\"urn:pearson:work:e4c4325e-e7ac-4887-937e-f3a0ddc54f75\" class=\"Pearson-Component paragraphNumeroUnoFootnote\">*</a></sup>try3 <abbr title=\"Asset Popover\" asset-id=\"urn:pearson:work:b9f78d2b-7d97-478f-a9be-14de4a5854ff\" data-uri=\"urn:pearson:entity:574c75e8-7886-47d5-b954-f4320bd82ac4\" class=\"Pearson-Component AssetPopoverTerm\">try4</abbr> try5<sup><a href=\"#\" data-uri=\"urn:pearson:work:54852ceb-e627-475a-a3d7-1ee4ce049508\" data-footnoteelementid=\"urn:pearson:work:54852ceb-e627-475a-a3d7-1ee4ce049508\" class=\"Pearson-Component paragraphNumeroUnoFootnote\">*</a></sup> try6</h3>",
                "footnotes": {
                    "urn:pearson:work:5645c028-eccc-4cb9-9ca3-b3959a27431f": "<p>new data</p>",
                    "urn:pearson:work:e4c4325e-e7ac-4887-937e-f3a0ddc54f75": "<p></p>",
                    "urn:pearson:work:54852ceb-e627-475a-a3d7-1ee4ce049508": "<p>footnote after versioning</p>"
                },
                "assetsPopover": {},
                "glossaryentries": {}
            },
            "versionUrn": "urn:pearson:work:5c790c66-c6d9-4052-b210-e64d19e75600",
            "contentUrn": "urn:pearson:entity:ea7806b3-a41e-450a-bc42-06334614b244"
        },
        "stanza": {
            "id": "urn:pearson:work:4b49e662-c27f-42ce-9a44-19bb584d908b",
            "type": "stanza",
            "schema": "http://schemas.pearson.com/wip-authoring/poetry/1",
            "html": {
                "text": "<p><span class=\"poetryLine \" data-id=\"urn:pearson:entity:98454661-1dc9-4b6a-b943-7d788e818d2a:c9e56aa7-e23d-44be-917d-39b71ba9d5ba\">Lorem <dfn class=\"Pearson-Component GlossaryTerm\" data-uri=\"urn:pearson:work:2edbde7b-8663-4e43-a390-21c8372688d9\">Ipsum</dfn> has been t<dfn class=\"Pearson-Component GlossaryTerm\" data-uri=\"urn:pearson:work:03929011-b495-4dd0-8d4d-e9e7e8682364\">he</dfn> industry's standard</span><span class=\"poetryLine \" data-id=\"urn:pearson:entity:98454661-1dc9-4b6a-b943-7d788e818d2a:bf21fe21-4b5b-46a4-95fb-a121d58e20f3\">dumjd p</span><span class=\"poetryLine\" data-id=\"urn:pearson:entity:98454661-1dc9-4b6a-b943-7d788e818d2a:dc7e0b81-686e-4a60-a9ab-3a0bc02560e8\">myhj text ever <sup><a href=\"#\" data-uri=\"urn:pearson:work:517bf3e2-2cc3-480e-a06c-1535ef6dca9c\" data-footnoteelementid=\"urn:pearson:work:517bf3e2-2cc3-480e-a06c-1535ef6dca9c\" class=\"Pearson-Component paragraphNumeroUnoFootnote\">*</a></sup><dfn class=\"Pearson-Component GlossaryTerm\" data-uri=\"urn:pearson:work:1b5c0f81-2784-47da-92b4-229efbbd220c\">since</dfn> the 1500s,</span><span class=\"poetryLine \" data-id=\"urn:pearson:entity:98454661-1dc9-4b6a-b943-7d788e818d2a:0309c601-7b29-46a1-9649-2a476b285dee\">It has <abbr title=\"Asset Popover\" asset-id=\"urn:pearson:work:6d9d7128-532e-43f8-b41e-fdbac9219e61\" data-uri=\"urn:pearson:entity:4b024f27-fba5-4387-b9b7-cf410d20bcf1\" class=\"Pearson-Component AssetPopoverTerm\">survived </abbr>not onldky five centuries,</span><span class=\"poetryLine \" data-id=\"urn:pearson:entity:98454661-1dc9-4b6a-b943-7d788e818d2a:3f5dff4a-5309-4747-a899-0e9866612401\">bfut also<sup><a href=\"#\" data-uri=\"urn:pearson:work:485af061-97bb-4957-aa11-45498d7b9027\" data-footnoteelementid=\"urn:pearson:work:485af061-97bb-4957-aa11-45498d7b9027\" class=\"Pearson-Component paragraphNumeroUnoFootnote\">*</a></sup> the leap <dfn class=\"Pearson-Component GlossaryTerm\" data-uri=\"urn:pearson:work:0388eea7-e59e-4bac-8e4a-f306b5212ab4\">into</dfn> electronic <abbr title=\"Asset Popover\" asset-id=\"urn:pearson:work:fd369485-da5a-4c5f-a2d0-5f11997a8f40\" data-uri=\"urn:pearson:entity:4b024f27-fba5-4387-b9b7-cf410d20bcf1\" class=\"Pearson-Component AssetPopoverTerm\">typesetting</abbr>,</span><span class=\"poetryLine \" data-id=\"urn:pearson:entity:98454661-1dc9-4b6a-b943-7d788e818d2a:317ddaa3-4356-488c-8f66-dbb7a175014a\">remaining essentially unchanged.</span></p>",
                "footnotes": {
                    "urn:pearson:work:485af061-97bb-4957-aa11-45498d7b9027": "<p>footnote in lin4</p>",
                    "urn:pearson:work:517bf3e2-2cc3-480e-a06c-1535ef6dca9c": "<p>footnote in line 2</p>"
                },
                "assetsPopover": {},
                "glossaryentries": {
                    "urn:pearson:work:0388eea7-e59e-4bac-8e4a-f306b5212ab4": "{\"term\":\"<p>into</p>\",\"definition\":\"<p>new version1</p>\"}",
                    "urn:pearson:work:1b5c0f81-2784-47da-92b4-229efbbd220c": "{\"term\":\"<p>since</p>\",\"definition\":\"<p></p>\"}",
                    "urn:pearson:work:2edbde7b-8663-4e43-a390-21c8372688d9": "{\"term\":\"<p>Ipsum</p>\",\"definition\":\"<p>glossary for poetryxxx</p>\"}",
                    "urn:pearson:work:03929011-b495-4dd0-8d4d-e9e7e8682364": "{\"term\":\"<p>he</p>\",\"definition\":\"<p>glossary2 line1</p>\"}"
                }
            },
            "versionUrn": "urn:pearson:work:4b49e662-c27f-42ce-9a44-19bb584d908b",
            "contentUrn": "urn:pearson:entity:98454661-1dc9-4b6a-b943-7d788e818d2a",
            "poetrylines": [{
                "id": "urn:pearson:entity:98454661-1dc9-4b6a-b943-7d788e818d2a:c9e56aa7-e23d-44be-917d-39b71ba9d5ba",
                "type": "line",
                "authoredtext": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": "Lorem  has been t industry's standard",
                    "glossaryentries": [{
                        "charAt": 6,
                        "itemid": "urn:pearson:work:2edbde7b-8663-4e43-a390-21c8372688d9",
                        "glossaryentrytype": "monolingual",
                        "glossaryentry": [{
                            "term": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "Ipsum"
                            },
                            "definition": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "glossary for poetryxxx"
                            }
                        }]
                    }, {
                        "charAt": 17,
                        "itemid": "urn:pearson:work:03929011-b495-4dd0-8d4d-e9e7e8682364",
                        "glossaryentrytype": "monolingual",
                        "glossaryentry": [{
                            "term": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "he"
                            },
                            "definition": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "glossary2 line1"
                            }
                        }]
                    }]
                }
            }, {
                "id": "urn:pearson:entity:98454661-1dc9-4b6a-b943-7d788e818d2a:bf21fe21-4b5b-46a4-95fb-a121d58e20f3",
                "type": "line",
                "authoredtext": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": "dumjd p"
                }
            }, {
                "id": "urn:pearson:entity:98454661-1dc9-4b6a-b943-7d788e818d2a:dc7e0b81-686e-4a60-a9ab-3a0bc02560e8",
                "type": "line",
                "authoredtext": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": "myhj text ever  the 1500s,",
                    "footnotes": [{
                        "charAt": 15,
                        "footnoteid": "urn:pearson:work:517bf3e2-2cc3-480e-a06c-1535ef6dca9c",
                        "footnotecontent": [{
                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                            "id": "urn:pearson:work:517bf3e2-2cc3-480e-a06c-1535ef6dca9c",
                            "type": "element-authoredtext",
                            "elementdata": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "footnote in line 2"
                            }
                        }]
                    }],
                    "glossaryentries": [{
                        "charAt": 15,
                        "itemid": "urn:pearson:work:1b5c0f81-2784-47da-92b4-229efbbd220c",
                        "glossaryentrytype": "monolingual",
                        "glossaryentry": [{
                            "term": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "since"
                            },
                            "definition": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": ""
                            }
                        }]
                    }]
                }
            }, {
                "id": "urn:pearson:entity:98454661-1dc9-4b6a-b943-7d788e818d2a:0309c601-7b29-46a1-9649-2a476b285dee",
                "type": "line",
                "authoredtext": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": "It has survived not onldky five centuries,",
                    "internallinks": [{
                        "effect": "pop-over",
                        "linkid": "urn:pearson:entity:4b024f27-fba5-4387-b9b7-cf410d20bcf1",
                        "charStart": 7,
                        "charEnd": 14
                    }]
                }
            }, {
                "id": "urn:pearson:entity:98454661-1dc9-4b6a-b943-7d788e818d2a:3f5dff4a-5309-4747-a899-0e9866612401",
                "type": "line",
                "authoredtext": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": "bfut also the leap  electronic typesetting,",
                    "footnotes": [{
                        "charAt": 9,
                        "footnoteid": "urn:pearson:work:485af061-97bb-4957-aa11-45498d7b9027",
                        "footnotecontent": [{
                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                            "id": "urn:pearson:work:485af061-97bb-4957-aa11-45498d7b9027",
                            "type": "element-authoredtext",
                            "elementdata": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "footnote in lin4"
                            }
                        }]
                    }],
                    "glossaryentries": [{
                        "charAt": 19,
                        "itemid": "urn:pearson:work:0388eea7-e59e-4bac-8e4a-f306b5212ab4",
                        "glossaryentrytype": "monolingual",
                        "glossaryentry": [{
                            "term": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "into"
                            },
                            "definition": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "new version1"
                            }
                        }]
                    }],
                    "internallinks": [{
                        "effect": "pop-over",
                        "linkid": "urn:pearson:entity:4b024f27-fba5-4387-b9b7-cf410d20bcf1",
                        "charStart": 31,
                        "charEnd": 41
                    }]
                }
            }, {
                "id": "urn:pearson:entity:98454661-1dc9-4b6a-b943-7d788e818d2a:317ddaa3-4356-488c-8f66-dbb7a175014a",
                "type": "line",
                "authoredtext": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": "remaining essentially unchanged."
                }
            }]
        },
        "elementcitation": {
            "contentUrn": "urn:pearson:entity:dfb3e798-a12d-4ec9-9df6-b9ae13bd29f6",
            "elementdata": {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": ""
            },
            "html": { "text": "<p class='paragraphNumeroUno'><br></p>" },
            "id": "urn:pearson:work:edbbf64b-4d06-4dc6-ae27-05de949f71a1",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "status": "wip",
            "type": "element-citation",
            "versionUrn": "urn:pearson:work:edbbf64b-4d06-4dc6-ae27-05de949f71a1"
        },
        "figure": {
            "id": "urn:pearson:work:0a62ddd5-e541-441b-a5e1-cce05dcaa67f",
            "type": "figure",
            "figuretype": "image",
            "subtype": "imageTextWidth",
            "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
            "alignment": "text-width",
            "title": {
                "schema":
                "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": "test label",
            },
            "subtitle": {
                "schema":
                "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": "test title ",
                "footnotes": [
                    {
                        "charAt": 11,
                        "footnoteid": "urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487",
                        "footnotecontent": [
                            {
                                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                "id": "urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487",
                                "type": "element-authoredtext",
                                "elementdata": {
                                "schema":
                                    "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "footnote 1",
                                },
                            },
                        ],
                    },
                ],
            },
            "captions": {
                "schema":
                "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": "test caption",
            },
            "credits": {
                "schema":
                "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": "test credit",
            },
            "figuredata": {
                "schema":
                "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                "imageid": "",
                "path":
                "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
                "height": "422",
                "width": "680",
            },
            "html": {
                "title": "<p>test label</p>",
                "subtitle":
                '<p>test title <sup><a href="#" id="urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487" data-uri="urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487" data-footnoteelementid="urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487" class="Pearson-Component paragraphNumeroUnoFootnote" data-mce-href="#">*</a></sup></p>',
                "text": "",
                "postertext": "",
                "captions": "<p>test caption</p>",
                "credits": "<p>test credit</p>",
                "footnotes": {
                "urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487":
                    "<p>footnote 1</p>",
                },
                "assetsPopover": {},
                "glossaryentries": {},
            },
            "versionUrn": "urn:pearson:work:0a62ddd5-e541-441b-a5e1-cce05dcaa67f",
            "contentUrn": "urn:pearson:entity:5f76dd27-6372-425d-913b-ae387dfdeb93"
        },
        "audio": {
            "id": "urn:pearson:work:0a62ddd5-e541-441b-a5e1-cce05dcaa67f",
            "type": "figure",
            "figuretype": "audio",
            "subtype": "imageTextWidth",
            "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
            "alignment": "text-width",
            "title": {
                "schema":
                "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": "test label",
            },
            "subtitle": {
                "schema":
                "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": "test title ",
                "footnotes": [
                    {
                        "charAt": 11,
                        "footnoteid": "urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487",
                        "footnotecontent": [
                            {
                                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                "id": "urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487",
                                "type": "element-authoredtext",
                                "elementdata": {
                                "schema":
                                    "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "footnote 1",
                                },
                            },
                        ],
                    },
                ],
            },
            "captions": {
                "schema":
                "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": "test caption",
            },
            "credits": {
                "schema":
                "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": "test credit",
            },
            "figuredata": {
                "schema":
                "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                "audioid": "",
                "path":
                "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
                "height": "422",
                "width": "680",
            },
            "html": {
                "title": "<p>test label</p>",
                "subtitle":
                '<p>test title <sup><a href="#" id="urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487" data-uri="urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487" data-footnoteelementid="urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487" class="Pearson-Component paragraphNumeroUnoFootnote" data-mce-href="#">*</a></sup></p>',
                "text": "",
                "postertext": "",
                "captions": "<p>test caption</p>",
                "credits": "<p>test credit</p>",
                "footnotes": {
                "urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487":
                    "<p>footnote 1</p>",
                },
                "assetsPopover": {},
                "glossaryentries": {},
            },
            "versionUrn": "urn:pearson:work:0a62ddd5-e541-441b-a5e1-cce05dcaa67f",
            "contentUrn": "urn:pearson:entity:5f76dd27-6372-425d-913b-ae387dfdeb93"
        },
        "video": {
            "id": "urn:pearson:work:0a62ddd5-e541-441b-a5e1-cce05dcaa67f",
            "type": "figure",
            "figuretype": "video",
            "subtype": "imageTextWidth",
            "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
            "alignment": "text-width",
            "title": {
                "schema":
                "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": "test label",
            },
            "subtitle": {
                "schema":
                "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": "test title ",
                "footnotes": [
                    {
                        "charAt": 11,
                        "footnoteid": "urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487",
                        "footnotecontent": [
                            {
                                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                "id": "urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487",
                                "type": "element-authoredtext",
                                "elementdata": {
                                "schema":
                                    "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "footnote 1",
                                },
                            },
                        ],
                    },
                ],
            },
            "captions": {
                "schema":
                "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": "test caption",
            },
            "credits": {
                "schema":
                "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": "test credit",
            },
            "figuredata": {
                "schema":
                "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                "videoid": "",
                "path":
                "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
                "height": "422",
                "width": "680",
            },
            "html": {
                "title": "<p>test label</p>",
                "subtitle":
                '<p>test title <sup><a href="#" id="urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487" data-uri="urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487" data-footnoteelementid="urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487" class="Pearson-Component paragraphNumeroUnoFootnote" data-mce-href="#">*</a></sup></p>',
                "text": "",
                "postertext": "",
                "captions": "<p>test caption</p>",
                "credits": "<p>test credit</p>",
                "footnotes": {
                "urn:pearson:work:d76ed607-3b61-4002-bd36-086720db5487":
                    "<p>footnote 1</p>",
                },
                "assetsPopover": {},
                "glossaryentries": {},
            },
            "versionUrn": "urn:pearson:work:0a62ddd5-e541-441b-a5e1-cce05dcaa67f",
            "contentUrn": "urn:pearson:entity:5f76dd27-6372-425d-913b-ae387dfdeb93"
        },
        "codelisting":{
            "id":"urn:pearson:work:78b5adee-ed51-4fd8-9e36-54bbc4e006a4",
            "type":"figure",
            "figuretype":"codelisting",
            "schema":"http://schemas.pearson.com/wip-authoring/figure/1",
            "title":{
                "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text":""
            },
            "subtitle":{
                "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text":""
            },
            "captions":{
                "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text":""
            },
            "credits":{
                "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text":""
            },"figuredata":{
                "schema":"http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                "type":"codelistingformatted",
                "numbered":true,
                "startNumber":"1",
                "syntaxhighlighting":true
            },
                "html":{
                    "title":"<p><br></p>",
                    "subtitle":"<p><br></p>",
                    "preformattedtext":"<p></p>",
                    "captions":"<p><br></p>",
                    "credits":"<p><br></p>"
                },
                    "versionUrn":"urn:pearson:work:78b5adee-ed51-4fd8-9e36-54bbc4e006a4",
                    "contentUrn":"urn:pearson:entity:41b5f098-d82d-4c42-9c3f-6283dd87b4e7",
                    "status":"wip"
                },
        "authoredtext": {
            "id":"urn:pearson:work:0042c483-1913-41cc-8b5b-2f987dde971e",
            "type":"figure",
            "figuretype":"authoredtext",
            "subtype":"mathml",
            "schema":"http://schemas.pearson.com/wip-authoring/figure/1",
            "title":{
                "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text":""
            },
            "subtitle":{
                "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text":""
            },
            "captions":{
                "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text":""
            },
            "credits":{
                "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text":""
            },
            "figuredata":{
                "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                "type":"element-authoredtext",
                "elementdata":{
                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text":""
                }
            },
            "html":{
                "title":"<p><br></p>",
                "subtitle":"<p><br></p>",
                "text":"",
                "postertext":"",
                "captions":"<p><br></p>",
                "credits":"<p><br></p>"
            },
            "versionUrn":"urn:pearson:work:0042c483-1913-41cc-8b5b-2f987dde971e",
            "contentUrn":"urn:pearson:entity:876a2304-0d84-47e0-9428-f5d4cc988f84",
            "status":"wip"
        },
        "popup":{
            "contentUrn": "urn:pearson:entity:5df6915e-e3a4-4b30-b470-aff707f6fabb",
            "id": "urn:pearson:manifest:27a03fd2-73d9-45d2-bf7f-c214769f2f74",
            "popupdata": { "bodymatter": [{"contentUrn": "urn:pearson:entity:fb481ed0-af54-4a18-b00f-068d72c26839",
            "elementdata": {schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", text: ""},
            "html": {text: "<p class='paragraphNumeroUno'><br></p>"},
            "id": "urn:pearson:work:84643fc2-f0bb-47c4-bd5a-6b4a9c6d2489",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "status": "wip",
            "type": "element-authoredtext",
            "versionUrn": "urn:pearson:work:84643fc2-f0bb-47c4-bd5a-6b4a9c6d2489"}], "postertextobject": [{"contentUrn": "urn:pearson:entity:2b2fdbbf-1463-4ea7-8844-abfbea402e17",
            "elementdata": {"schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": ""},
            "html": {"text": "<p class='paragraphNumeroUno'><br></p>"},
            "id": "urn:pearson:work:976d60b0-6199-4090-8400-412a8789e29d",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "status": "wip",
            "type": "element-authoredtext",
            "versionUrn": "urn:pearson:work:976d60b0-6199-4090-8400-412a8789e29d"}] },
            "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/popup",
            "type": "popup",
            "versionUrn": "urn:pearson:manifest:27a03fd2-73d9-45d2-bf7f-c214769f2f74",
        },
        "multicolumn": {
            "contentUrn": "urn:pearson:entity:70bf3ade-4afa-452d-9d23-83c134719039",
            "groupeddata": {
                "bodymatter": [{
                    "contentUrn": "urn:pearson:entity:a74941ca-ad92-4823-8bee-da86f0ea89d5",
                    "groupdata": { "bodymatter": [{
                        "contentUrn": "urn:pearson:entity:ea8deee1-0a0a-46ab-9ecb-20531a0bcd1d",
                        "elementdata": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "" },
                        "html": { text: "<p class='paragraphNumeroUno'><br></p>" },
                        "id": "urn:pearson:work:8225a550-143f-4c73-bfda-7ada59f45f39",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "status": "wip",
                        "type": "element-authoredtext",
                        "versionUrn": "urn:pearson:work:8225a550-143f-4c73-bfda-7ada59f45f39",
                    }] },
                    "id": "urn:pearson:manifest:1abdf282-55e7-47b6-95eb-7e8ce13ae369",
                    "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                    "type": "group",
                    "versionUrn": "urn:pearson:manifest:1abdf282-55e7-47b6-95eb-7e8ce13ae369"
                }]
            },
            "groupproportions": "60-40",
            "id": "urn:pearson:manifest:bfde7bcc-b460-4235-8335-37c20ea9c158",
            "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
            "type": "groupedcontent",
            "versionUrn": "urn:pearson:manifest:bfde7bcc-b460-4235-8335-37c20ea9c158",
            "width": "wider"
        },
        "interactive": {
            "id":"urn:pearson:work:0042c483-1913-41cc-8b5b-2f987dde971e",
            "type":"figure",
            "figuretype":"interactive",
            "subtype":"mathml",
            "schema":"http://schemas.pearson.com/wip-authoring/figure/1",
            "title":{
                "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text":""
            },
            "subtitle":{
                "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text":""
            },
            "captions":{
                "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text":""
            },
            "credits":{
                "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text":""
            },
            "figuredata":{
                "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                "type":"interactive",
                "elementdata":{
                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text":""
                }
            },
            "html":{
                "title":"<p><br></p>",
                "subtitle":"<p><br></p>",
                "text":"",
                "postertext":"",
                "captions":"<p><br></p>",
                "credits":"<p><br></p>"
            },
            "versionUrn":"urn:pearson:work:0042c483-1913-41cc-8b5b-2f987dde971e",
            "contentUrn":"urn:pearson:entity:876a2304-0d84-47e0-9428-f5d4cc988f84",
            "status":"wip"
        },
    }
}