
const commonFigureTextData = {
    "title": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": ""
    },
    "subtitle": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": ""
    },
    "captions": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": ""
    },
    "credits": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": ""
    }
}
const commonFigureHtmlData = {
    "html": {
        "title": "<p class=\"paragraphNumeroUno\"><br></p>",
        "subtitle": "<p class=\"paragraphNumeroUno\"><br></p>",
        "text": "",
        "postertext": "",
        "captions": "<p class=\"paragraphNumeroUno\"><br></p>",
        "credits": "<p class=\"paragraphNumeroUno\"><br></p>"
    }
}
export const slateTestData = {
    slateData1: {
        "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9": {
            "id": "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9",
            "type": "manifest",
            "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
            "versionUrn": "urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9",
            "contentUrn": "urn:pearson:entity:1d4517cf-3a5d-4fd4-8347-2fa55f118294",
            "contents": {
                "bodymatter": [
                    {
                        "id": "urn:pearson:manifest:ff22f67a-e32f-4f5c-a9e5-a57c8c757ce0",
                        "type": "poetry",
                        "schema": "http://schemas.pearson.com/wip-authoring/poetry/1",
                        "versionUrn": "urn:pearson:manifest:ff22f67a-e32f-4f5c-a9e5-a57c8c757ce0",
                        "contentUrn": "urn:pearson:entity:767e921e-255d-44a5-87bb-c0381cf3ef50",
                        "contents": {
                            "bodymatter": [{
                                "id": "urn:pearson:work:01b194fc-cd8a-4db0-bd2e-a5e3159f46f8",
                                "type": "stanza",
                                "schema": "http://schemas.pearson.com/wip-authoring/poetry/1",
                                "html": {
                                    "title": "<p></p>",
                                    "subtitle": "<p></p>",
                                    "text": "",
                                    "preformattedtext": "<p></p>",
                                    "captions": "<p></p>",
                                    "credits": "<p></p>",
                                    "footnotes": {},
                                    "assetsPopover": {},
                                    "glossaryentries": {}
                                },
                                "versionUrn": "urn:pearson:work:01b194fc-cd8a-4db0-bd2e-a5e3159f46f8",
                                "contentUrn": "urn:pearson:entity:d36a6e49-e792-4875-ac5c-84cd71a8147b",
                                "poetrylines": [{
                                    "id": "urn:pearson:entity:d36a6e49-e792-4875-ac5c-84cd71a8147b:6dde3e09-c555-4900-ab52-0522389ddb3e",
                                    "type": "line",
                                    "authoredtext": {
                                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                        "text": ""
                                    }
                                },
                                ]
                            }]
                        },
                        "status": "wip"
                    },
                    {
                        "id": "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670",
                        "type": "popup",
                        "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/popup",
                        "versionUrn": "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670",
                        "contentUrn": "urn:pearson:entity:f23c667b-81ca-48c5-ba58-bc19fa6b9677",
                        "status": "wip",
                        "popupdata": {
                            "bodymatter": [],
                            "postertextobject": [{
                                "id": "urn:pearson:work:d5dd0c76-5b37-4370-ab84-a4d69b4f5056",
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
                                "versionUrn": "urn:pearson:work:d5dd0c76-5b37-4370-ab84-a4d69b4f5056",
                                "contentUrn": "urn:pearson:entity:ba1b84f2-a687-459c-9a59-82966dbe9faa"
                            }]
                        }
                    },
                    {
                        "id": "urn:pearson:manifest:2b962460-a3d1-47a4-a644-cbc85f5537d4",
                        "type": "citations",
                        "schema": "http://schemas.pearson.com/wip-authoring/citations/1",
                        "versionUrn": "urn:pearson:manifest:2b962460-a3d1-47a4-a644-cbc85f5537d4",
                        "contentUrn": "urn:pearson:entity:e8a6d6ae-a091-46d5-a337-c97dbb871961",
                        "contents": {
                            "bodymatter": [{
                                "id": "urn:pearson:work:3b97c5e1-b70c-422e-ac7b-b77a3bd2d60a",
                                "type": "element-citation",
                                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                "elementdata": {
                                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text": ""
                                },
                                "html": {
                                    "text": "<p class=\"paragraphNumeroUnoCitation\"><br></p>",
                                    "footnotes": {},
                                    "assetsPopover": {},
                                    "glossaryentries": {}
                                },
                                "versionUrn": "urn:pearson:work:3b97c5e1-b70c-422e-ac7b-b77a3bd2d60a",
                                "contentUrn": "urn:pearson:entity:b3b1fd65-0f31-4f6e-8d3c-4a01a03c9115"
                            }],
                            "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
                        },
                        "status": "wip"
                    },
                    {
                        "id": "urn:pearson:work:25777a73-bd47-497e-a5b3-f5be618560fb",
                        "type": "figure",
                        "figuretype": "image",
                        "subtype": "imageTextWidth",
                        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                        "alignment": "text-width",
                        "figuredata": {
                            "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                            "imageid": "",
                            "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
                            "height": "422",
                            "width": "680"
                        },
                        "html": {
                            "title": "<p><br></p>",
                            "subtitle": "<p><br></p>",
                            "text": "",
                            "postertext": "",
                            "captions": "<p><br></p>",
                            "credits": "<p><br></p>"
                        },
                        "versionUrn": "urn:pearson:work:25777a73-bd47-497e-a5b3-f5be618560fb",
                        "contentUrn": "urn:pearson:entity:434911d6-abd0-4442-921f-6abe5f1dff3b",
                        "status": "wip",
                        ...commonFigureTextData
                    },
                    {
                        "id": "urn:pearson:work:155a564b-9f3b-4f8c-a5aa-3e32e6c2a5c5",
                        "type": "figure",
                        "figuretype": "video",
                        "subtype": "figureVideo",
                        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                        "figuredata": {
                            "schema": "http://schemas.pearson.com/wip-authoring/video/1#/definitions/video",
                            "height": "399",
                            "width": "600",
                            "videoid": "",
                            "posterimage": {
                                "path": "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png",
                                "imageid": ""
                            },
                            "videos": [{
                                "path": ""
                            }]
                        },
                        "versionUrn": "urn:pearson:work:155a564b-9f3b-4f8c-a5aa-3e32e6c2a5c5",
                        "contentUrn": "urn:pearson:entity:09f54ca9-9c3e-498b-b8ea-2f4e2e0ed94d",
                        "status": "wip",
                        ...commonFigureHtmlData
                    },
                    {
                        "id": "urn:pearson:work:37a4aa89-8133-4829-8f8e-2b10afa1a95f",
                        "type": "figure",
                        "figuretype": "audio",
                        "subtype": "figureAudioSL",
                        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                        "alignment": "full",
                        "figuredata": {
                            "schema": "http://schemas.pearson.com/wip-authoring/audio/1#/definitions/audio",
                            "height": "399",
                            "width": "600",
                            "audioid": "",
                            "posterimage": {
                                "path": "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png",
                                "imageid": ""
                            },
                            "srctype": "externallink"
                        },
                        "versionUrn": "urn:pearson:work:37a4aa89-8133-4829-8f8e-2b10afa1a95f",
                        "contentUrn": "urn:pearson:entity:596a5dbf-3e24-4153-8efe-9a40c00e2edc",
                        ...commonFigureHtmlData
                    },
                    {
                        "id": "urn:pearson:work:ee1603e6-fd90-4338-b8b5-6f199728b89c",
                        "type": "figure",
                        "figuretype": "interactive",
                        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                        "figuredata": {
                            "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/interactive",
                            "interactiveid": "",
                            "interactivetype": "fpo",
                            "interactiveformat": "mmi"
                        },
                        "html": {
                            "title": "<p class=\"paragraphNumeroUno\"><br></p>",
                            "subtitle": "<p class=\"paragraphNumeroUno\"><br></p>",
                            "text": "",
                            "postertext": "",
                            "captions": "<p class=\"paragraphNumeroUno\"><br></p>",
                            "credits": "<p class=\"paragraphNumeroUno\"><br></p>"
                        },
                        "versionUrn": "urn:pearson:work:ee1603e6-fd90-4338-b8b5-6f199728b89c",
                        "contentUrn": "urn:pearson:entity:e821a1cf-13e1-4350-8ed1-62717bef71d3",
                        "status": "wip",
                        ...commonFigureTextData
                    },
                    {
                        "id": "urn:pearson:manifest:1a447208-32e7-4e4b-95e6-ff1cbf735b9c",
                        "type": "groupedcontent",
                        "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                        "width": "wider",
                        "groupproportions": "50-50",
                        "versionUrn": "urn:pearson:manifest:1a447208-32e7-4e4b-95e6-ff1cbf735b9c",
                        "contentUrn": "urn:pearson:entity:fb2c00c8-6db0-4adb-9e4f-6a97afabf739",
                        "groupeddata": {
                            "bodymatter": [{
                                "id": "urn:pearson:manifest:147b71d5-ce02-42ff-9a34-f399cfad314e",
                                "type": "group",
                                "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                                "versionUrn": "urn:pearson:manifest:147b71d5-ce02-42ff-9a34-f399cfad314e",
                                "contentUrn": "urn:pearson:entity:f055178c-dd56-4d60-90f3-3e2134ed3f45",
                                "groupdata": {
                                    "bodymatter": [{
                                        "id": "urn:pearson:work:85e925c1-9d97-42bf-a700-3ecdac370f6b",
                                        "type": "figure",
                                        "figuretype": "image",
                                        "subtype": "imageTextWidth",
                                        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                                        "alignment": "text-width",
                                        "figuredata": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                                            "imageid": "",
                                            "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
                                            "height": "422",
                                            "width": "680"
                                        },
                                        "html": {
                                            "title": "<p></p>",
                                            "subtitle": "<p></p>",
                                            "text": "",
                                            "postertext": "",
                                            "captions": "<p></p>",
                                            "credits": "<p></p>",
                                            "footnotes": {},
                                            "assetsPopover": {},
                                            "glossaryentries": {}
                                        },
                                        "versionUrn": "urn:pearson:work:85e925c1-9d97-42bf-a700-3ecdac370f6b",
                                        "contentUrn": "urn:pearson:entity:118eb6fd-6c0c-409a-b2c9-ca06e3a19c37",
                                        ...commonFigureTextData
                                    }, {
                                        "id": "urn:pearson:work:00eafb5a-6ce7-47fe-b2e6-fd5353c50bc8",
                                        "type": "figure",
                                        "figuretype": "audio",
                                        "subtype": "figureAudioSL",
                                        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                                        "alignment": "full",
                                        "figuredata": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/audio/1#/definitions/audio",
                                            "height": "399",
                                            "width": "600",
                                            "audioid": "",
                                            "posterimage": {
                                                "path": "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png",
                                                "imageid": ""
                                            },
                                            "srctype": "externallink"
                                        },
                                        "html": {
                                            "title": "<p class=\"paragraphNumeroUno\"><br></p>",
                                            "subtitle": "<p class=\"paragraphNumeroUno\"><br></p>",
                                            "text": "",
                                            "postertext": "",
                                            "captions": "<p class=\"paragraphNumeroUno\"><br></p>",
                                            "credits": "<p class=\"paragraphNumeroUno\"><br></p>",
                                            "footnotes": {},
                                            "assetsPopover": {},
                                            "glossaryentries": {}
                                        },
                                        "versionUrn": "urn:pearson:work:00eafb5a-6ce7-47fe-b2e6-fd5353c50bc8",
                                        "contentUrn": "urn:pearson:entity:f08af9f8-0fb4-4829-a0f0-899950e79eb4"
                                    }]
                                },
                                "status": "wip"
                            }, {
                                "id": "urn:pearson:manifest:c53a966f-7b4e-47c4-b0df-9db4d0c1d202",
                                "type": "group",
                                "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                                "versionUrn": "urn:pearson:manifest:c53a966f-7b4e-47c4-b0df-9db4d0c1d202",
                                "contentUrn": "urn:pearson:entity:a40a1373-30f5-4012-926e-acf9c67f8254",
                                "groupdata": {
                                    "bodymatter": [{
                                        "id": "urn:pearson:work:3bf55984-7e1e-48d9-8f8e-240ea4707c23",
                                        "type": "figure",
                                        "figuretype": "video",
                                        "subtype": "figureVideo",
                                        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                                        "figuredata": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/video/1#/definitions/video",
                                            "height": "399",
                                            "width": "600",
                                            "videoid": "",
                                            "posterimage": {
                                                "path": "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png",
                                                "imageid": ""
                                            },
                                            "videos": [{
                                                "path": ""
                                            }]
                                        },
                                        "html": {
                                            "title": "<p></p>",
                                            "subtitle": "<p></p>",
                                            "text": "",
                                            "preformattedtext": "<p></p>",
                                            "captions": "<p></p>",
                                            "credits": "<p></p>",
                                            "footnotes": {},
                                            "assetsPopover": {},
                                            "glossaryentries": {}
                                        },
                                        "versionUrn": "urn:pearson:work:3bf55984-7e1e-48d9-8f8e-240ea4707c23",
                                        "contentUrn": "urn:pearson:entity:0bf36bb4-c164-41b5-9b89-3434f178d082"
                                    }, {
                                        "id": "urn:pearson:work:68304481-1c49-4611-a7b4-3a650944ecd4",
                                        "type": "figure",
                                        "figuretype": "interactive",
                                        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                                        "figuredata": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/interactive",
                                            "interactiveid": "",
                                            "interactivetype": "fpo",
                                            "interactiveformat": "mmi"
                                        },
                                        "html": {
                                            "title": "<p></p>",
                                            "subtitle": "<p></p>",
                                            "text": "",
                                            "preformattedtext": "<p></p>",
                                            "captions": "<p></p>",
                                            "credits": "<p></p>",
                                            "footnotes": {},
                                            "assetsPopover": {},
                                            "glossaryentries": {}
                                        },
                                        "versionUrn": "urn:pearson:work:68304481-1c49-4611-a7b4-3a650944ecd4",
                                        "contentUrn": "urn:pearson:entity:9b83e728-57c1-4e8d-af7b-9545e7ee4e73",
                                        ...commonFigureTextData
                                    }]
                                },
                                "status": "wip"
                            },
                            ]
                        },
                        "status": "wip"
                    },
                    {
                        "id": "urn:pearson:manifest:7bb268e1-c3b6-4174-b0d7-12c57a46e93b",
                        "type": "element-aside",
                        "subtype": "sidebar",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "designtype": "asideSidebar01",
                        "elementdata": {
                            "bodymatter": [{
                                "id": "urn:pearson:work:3a712ecb-e85f-4f23-b31d-20b8abc94410",
                                "type": "figure",
                                "figuretype": "image",
                                "subtype": "imageTextWidth",
                                "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                                "alignment": "text-width",
                                "figuredata": {
                                    "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                                    "imageid": "",
                                    "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
                                    "height": "422",
                                    "width": "680"
                                },
                                "html": {
                                    "title": "<p></p>",
                                    "subtitle": "<p></p>",
                                    "text": "",
                                    "preformattedtext": "<p></p>",
                                    "captions": "<p></p>",
                                    "credits": "<p></p>",
                                    "footnotes": {},
                                    "assetsPopover": {},
                                    "glossaryentries": {}
                                },
                                "versionUrn": "urn:pearson:work:3a712ecb-e85f-4f23-b31d-20b8abc94410",
                                "contentUrn": "urn:pearson:entity:ca27c2bf-7083-4f31-b2bf-7e545e911ce5",
                                ...commonFigureTextData
                            }, {
                                "id": "urn:pearson:work:554a3610-9e26-4e84-afdf-7071657a6c9d",
                                "type": "figure",
                                "figuretype": "video",
                                "subtype": "figureVideo",
                                "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                                "figuredata": {
                                    "schema": "http://schemas.pearson.com/wip-authoring/video/1#/definitions/video",
                                    "height": "399",
                                    "width": "600",
                                    "videoid": "",
                                    "posterimage": {
                                        "path": "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png",
                                        "imageid": ""
                                    },
                                    "videos": [{
                                        "path": ""
                                    }]
                                },
                                "html": {
                                    "title": "<p></p>",
                                    "subtitle": "<p></p>",
                                    "text": "",
                                    "preformattedtext": "<p></p>",
                                    "captions": "<p></p>",
                                    "credits": "<p></p>",
                                    "footnotes": {},
                                    "assetsPopover": {},
                                    "glossaryentries": {}
                                },
                                "versionUrn": "urn:pearson:work:554a3610-9e26-4e84-afdf-7071657a6c9d",
                                "contentUrn": "urn:pearson:entity:1ee8a797-b16c-4ccf-b025-3e25f0bd665f",
                                ...commonFigureTextData
                            }, {
                                "id": "urn:pearson:work:ceb5724e-18ba-4f60-b70e-e152abecbac6",
                                "type": "figure",
                                "figuretype": "audio",
                                "subtype": "figureAudioSL",
                                "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                                "alignment": "full",
                                "figuredata": {
                                    "schema": "http://schemas.pearson.com/wip-authoring/audio/1#/definitions/audio",
                                    "height": "399",
                                    "width": "600",
                                    "audioid": "",
                                    "posterimage": {
                                        "path": "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png",
                                        "imageid": ""
                                    },
                                    "srctype": "externallink"
                                },
                                "html": {
                                    "title": "<p class=\"paragraphNumeroUno\"><br></p>",
                                    "subtitle": "<p class=\"paragraphNumeroUno\"><br></p>",
                                    "text": "",
                                    "postertext": "",
                                    "captions": "<p class=\"paragraphNumeroUno\"><br></p>",
                                    "credits": "<p class=\"paragraphNumeroUno\"><br></p>",
                                    "footnotes": {},
                                    "assetsPopover": {},
                                    "glossaryentries": {}
                                },
                                "versionUrn": "urn:pearson:work:ceb5724e-18ba-4f60-b70e-e152abecbac6",
                                "contentUrn": "urn:pearson:entity:834cbaa7-1546-42f0-b677-ecc546788914",
                                ...commonFigureTextData
                            }, {
                                "id": "urn:pearson:work:e8fb2a14-06c6-4f0b-a163-cf1595d29da2",
                                "type": "figure",
                                "figuretype": "interactive",
                                "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                                "figuredata": {
                                    "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/interactive",
                                    "interactiveid": "",
                                    "interactivetype": "fpo",
                                    "interactiveformat": "mmi"
                                },
                                "html": {
                                    "title": "<p></p>",
                                    "subtitle": "<p></p>",
                                    "text": "",
                                    "preformattedtext": "<p></p>",
                                    "captions": "<p></p>",
                                    "credits": "<p></p>",
                                    "footnotes": {},
                                    "assetsPopover": {},
                                    "glossaryentries": {}
                                },
                                "versionUrn": "urn:pearson:work:e8fb2a14-06c6-4f0b-a163-cf1595d29da2",
                                "contentUrn": "urn:pearson:entity:a9b6259f-d26a-4c90-84a6-022b69ce5d43",
                                ...commonFigureTextData
                            }, {
                                "id": "urn:pearson:manifest:f19a9276-c4e3-4e52-93d2-34a88cdadbb7",
                                "type": "popup",
                                "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/popup",
                                "versionUrn": "urn:pearson:manifest:f19a9276-c4e3-4e52-93d2-34a88cdadbb7",
                                "contentUrn": "urn:pearson:entity:d11111be-b4e2-498a-8210-05fea72d83dd",
                                "status": "wip",
                                "popupdata": {
                                    "bodymatter": [],
                                    "postertextobject": [{
                                        "id": "urn:pearson:work:5d5333c3-8599-4d5b-a28e-6f36bfc734a4",
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
                                        "versionUrn": "urn:pearson:work:5d5333c3-8599-4d5b-a28e-6f36bfc734a4",
                                        "contentUrn": "urn:pearson:entity:56064285-972a-4c31-9f82-7c0243b6e3fe"
                                    }]
                                }
                            },
                            {
                                contentUrn: "urn:pearson:entity:8d6d8b8a-dacc-4110-8955-ebb267656bd1",
                                elementdata: {
                                    schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    text: ""
                                },
                                html: {
                                    assetsPopover: {},
                                    footnotes: {},
                                    glossaryentries: {},
                                    text: '<p class="paragraphNumeroUno"><br></p>'
                                },
                                id: "urn:pearson:work:9b7b677c-a0ad-474d-872a-f055b47e8022",
                                schema: "http://schemas.pearson.com/wip-authoring/element/1",
                                type: "element-authoredtext"
                            }
                            ],
                            "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
                        },
                        "versionUrn": "urn:pearson:manifest:7bb268e1-c3b6-4174-b0d7-12c57a46e93b",
                        "contentUrn": "urn:pearson:entity:7c7fc762-2432-4499-88c0-3c6b824d2470",
                        "status": "wip"
                    },
                    {
                        "id": "urn:pearson:manifest:aa9c8807-b5bb-4cd0-88cf-b927d59abe30",
                        "type": "element-aside",
                        "subtype": "workedexample",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "designtype": "workedexample1",
                        "elementdata": {
                            "bodymatter": [{
                                "id": "urn:pearson:work:c827160b-e034-4953-ab82-24dd4fb52457",
                                "type": "element-authoredtext",
                                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                "elementdata": {
                                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text": "",
                                    "headers": [{
                                        "level": 4
                                    }]
                                },
                                "html": {
                                    "text": "<h4 class=\"heading4NummerEins\"><br></h4>",
                                    "footnotes": {},
                                    "assetsPopover": {},
                                    "glossaryentries": {}
                                },
                                "versionUrn": "urn:pearson:work:c827160b-e034-4953-ab82-24dd4fb52457",
                                "contentUrn": "urn:pearson:entity:a0f78bb0-acb6-49f8-9edf-d10260022553"
                            }, {
                                "id": "urn:pearson:manifest:2c9c5752-26a9-47dc-ba34-0b1a0879dd3f",
                                "type": "manifest",
                                "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
                                "versionUrn": "urn:pearson:manifest:2c9c5752-26a9-47dc-ba34-0b1a0879dd3f",
                                "contentUrn": "urn:pearson:entity:ff98ac85-3d80-4061-ba78-ae024dbd5150",
                                "contents": {
                                    "bodymatter": [{
                                        "id": "urn:pearson:work:375757c3-ee42-416e-96ad-2686684b456d",
                                        "type": "figure",
                                        "figuretype": "image",
                                        "subtype": "imageTextWidth",
                                        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                                        "alignment": "text-width",
                                        "title": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text": ""
                                        },
                                        "subtitle": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text": ""
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
                                            "title": "<p></p>",
                                            "subtitle": "<p></p>",
                                            "text": "",
                                            "preformattedtext": "<p></p>",
                                            "captions": "<p></p>",
                                            "credits": "<p></p>",
                                            "footnotes": {},
                                            "assetsPopover": {},
                                            "glossaryentries": {}
                                        },
                                        "versionUrn": "urn:pearson:work:375757c3-ee42-416e-96ad-2686684b456d",
                                        "contentUrn": "urn:pearson:entity:d8a46f70-4955-4cdc-937f-60aad5e9e3ca"
                                    }, {
                                        "id": "urn:pearson:work:7ab86ee0-60b6-4874-a1c4-d03173cc385d",
                                        "type": "figure",
                                        "figuretype": "audio",
                                        "subtype": "figureAudioSL",
                                        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                                        "alignment": "full",
                                        "figuredata": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/audio/1#/definitions/audio",
                                            "height": "399",
                                            "width": "600",
                                            "audioid": "",
                                            "posterimage": {
                                                "path": "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png",
                                                "imageid": ""
                                            },
                                            "srctype": "externallink"
                                        },
                                        "html": {
                                            "title": "<p class=\"paragraphNumeroUno\"><br></p>",
                                            "subtitle": "<p class=\"paragraphNumeroUno\"><br></p>",
                                            "text": "",
                                            "postertext": "",
                                            "captions": "<p class=\"paragraphNumeroUno\"><br></p>",
                                            "credits": "<p class=\"paragraphNumeroUno\"><br></p>",
                                            "footnotes": {},
                                            "assetsPopover": {},
                                            "glossaryentries": {}
                                        },
                                        "versionUrn": "urn:pearson:work:7ab86ee0-60b6-4874-a1c4-d03173cc385d",
                                        "contentUrn": "urn:pearson:entity:36409cc9-e3cb-4ccc-869b-031b01be863a"
                                    }, {
                                        "id": "urn:pearson:work:b90bc099-31d6-434d-9a4c-f0589b234b27",
                                        "type": "figure",
                                        "figuretype": "video",
                                        "subtype": "figureVideo",
                                        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                                        "figuredata": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/video/1#/definitions/video",
                                            "height": "399",
                                            "width": "600",
                                            "videoid": "",
                                            "posterimage": {
                                                "path": "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png",
                                                "imageid": ""
                                            },
                                            "videos": [{
                                                "path": ""
                                            }]
                                        },
                                        "html": {
                                            "title": "<p></p>",
                                            "subtitle": "<p></p>",
                                            "text": "",
                                            "preformattedtext": "<p></p>",
                                            "captions": "<p></p>",
                                            "credits": "<p></p>",
                                            "footnotes": {},
                                            "assetsPopover": {},
                                            "glossaryentries": {}
                                        },
                                        "versionUrn": "urn:pearson:work:b90bc099-31d6-434d-9a4c-f0589b234b27",
                                        "contentUrn": "urn:pearson:entity:3ec46785-30c5-4536-9eda-95c7249c8b1b"
                                    }, {
                                        "id": "urn:pearson:work:1967b287-6273-4713-980a-a7008e074c73",
                                        "type": "figure",
                                        "figuretype": "interactive",
                                        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                                        "title": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text": ""
                                        },
                                        "subtitle": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text": ""
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
                                            "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/interactive",
                                            "interactiveid": "",
                                            "interactivetype": "fpo",
                                            "interactiveformat": "mmi"
                                        },
                                        "html": {
                                            "title": "<p></p>",
                                            "subtitle": "<p></p>",
                                            "text": "",
                                            "preformattedtext": "<p></p>",
                                            "captions": "<p></p>",
                                            "credits": "<p></p>",
                                            "footnotes": {},
                                            "assetsPopover": {},
                                            "glossaryentries": {}
                                        },
                                        "versionUrn": "urn:pearson:work:1967b287-6273-4713-980a-a7008e074c73",
                                        "contentUrn": "urn:pearson:entity:b7e08130-66bb-4bd4-8554-6fd59b7fa32d"
                                    }, {
                                        "id": "urn:pearson:manifest:f33c2f8c-4731-41ab-98ea-00d866d1daca",
                                        "type": "popup",
                                        "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/popup",
                                        "versionUrn": "urn:pearson:manifest:f33c2f8c-4731-41ab-98ea-00d866d1daca",
                                        "contentUrn": "urn:pearson:entity:73fd1599-567d-4f49-9839-b1d183860be5",
                                        "status": "wip",
                                        "popupdata": {
                                            "bodymatter": [],
                                            "postertextobject": [{
                                                "id": "urn:pearson:work:40204617-1faf-4698-bd5e-4112c889b4fd",
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
                                                "versionUrn": "urn:pearson:work:40204617-1faf-4698-bd5e-4112c889b4fd",
                                                "contentUrn": "urn:pearson:entity:48bedee1-6f97-4e8a-b1f1-e8fa2b4ff03a"
                                            }]
                                        }
                                    }],
                                    "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
                                },
                                "status": "wip"
                            }],
                            "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
                        },
                        "versionUrn": "urn:pearson:manifest:aa9c8807-b5bb-4cd0-88cf-b927d59abe30",
                        "contentUrn": "urn:pearson:entity:a5e2cc1c-f49e-47e9-b12f-025d7f6c500c",
                        "status": "wip"
                    },
                    {
                        "id": "urn:pearson:work:4eb7b66a-e4c8-4b9c-afed-5aae44c937f6",
                        "type": "element-authoredtext",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": "heading",
                            "headers": [{
                                "level": 1
                            }]
                        },
                        "html": {
                            "text": "<h1 class=\"heading1NummerEins\">heading</h1>",
                            "footnotes": {},
                            "glossaryentries": {}
                        },
                        "versionUrn": "urn:pearson:work:4eb7b66a-e4c8-4b9c-afed-5aae44c937f6",
                        "contentUrn": "urn:pearson:entity:1c0efa65-a5ef-4837-bd67-b6f37aa03288"
                    }
                ],
                "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
            },
            "status": "wip",
            "pageNo": 0,
            "pageCount": 1,
            "pageLimit": 250
        }
    },
    poetryElementVersion: {
        contentUrn: "urn:pearson:entity:767e921e-255d-44a5-87bb-c0381cf3ef50",
        contents: {
            bodymatter: [
                {
                    contentUrn: "urn:pearson:entity:7c26fbe3-2d9d-4a6f-aa25-1e52bb283660",
                    html: {
                        assetsPopover: {},
                        captions: "<p></p>",
                        credits: "<p></p>",
                        footnotes: {},
                        glossaryentries: {},
                        preformattedtext: "<p></p>",
                        subtitle: "<p></p>",
                        text: "",
                        title: "<p></p>"
                    },
                    id: "urn:pearson:work:2c8480ab-2d07-4101-97ae-7c94136971cc",
                    poetrylines: [{
                        authoredtext: {
                            schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            text: ""
                        },
                        id: "urn:pearson:entity:7c26fbe3-2d9d-4a6f-aa25-1e52bb283660:ab5f94c9-bc95-404b-96be-024eedfae296",
                        type: "line"
                    }],
                    schema: "http://schemas.pearson.com/wip-authoring/poetry/1",
                    type: "stanza",
                    versionUrn: "urn:pearson:work:2c8480ab-2d07-4101-97ae-7c94136971cc"
                }
            ],
            'formatted-title': {
                contentUrn: "urn:pearson:entity:32015dc8-37b5-4c49-a0c4-c2d8a86046d0",
                elementdata: {
                    schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    text: "title added in poetry"
                },
                html: { text: "<p>title added in poetry</p>", footnotes: {}, assetsPopover: {}, glossaryentries: {} },
                id: "urn:pearson:work:e1d1c4df-fc17-478a-84db-80130b8f94b3",
                schema: "http://schemas.pearson.com/wip-authoring/element/1",
                type: "element-authoredtext",
                versionUrn: "urn:pearson:work:e1d1c4df-fc17-478a-84db-80130b8f94b3"
            }
        },
        id: "urn:pearson:manifest:ff22f67a-e32f-4f5c-a9e5-a57c8c757ce0",
        index: "0-3-0",
        schema: "http://schemas.pearson.com/wip-authoring/poetry/1",
        status: "approved",
        type: "poetry",
        versionUrn: "urn:pearson:manifest:ff22f67a-e32f-4f5c-a9e5-a57c8c757ce0",
    },
    poetryTitleResponse: {
        "id": "urn:pearson:work:e1d1c4df-fc17-478a-84db-80130b8f94b3",
        "type": "element-authoredtext",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "elementdata": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "title added in poetry"
        },
        "html": {
            "text": "<p>title added in poetry</p>",
            "footnotes": {},
            "glossaryentries": {}
        },
        "versionUrn": "urn:pearson:work:e1d1c4df-fc17-478a-84db-80130b8f94b3",
        "contentUrn": "urn:pearson:entity:32015dc8-37b5-4c49-a0c4-c2d8a86046d0"
    },
    popupLabelResponse: {
        "id": "urn:pearson:work:db951068-ed5f-46b0-b821-1bc41a1c64a0",
        "type": "element-authoredtext",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "elementdata": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Label field ",
            "textsemantics": [{
                "charStart": 0,
                "charEnd": 11,
                "type": "label"
            }]
        },
        "html": {
            "text": "<p><label>Label field&nbsp;</label></p>",
            "footnotes": {},
            "glossaryentries": {}
        },
        "versionUrn": "urn:pearson:work:db951068-ed5f-46b0-b821-1bc41a1c64a0",
        "contentUrn": "urn:pearson:entity:7d2fab9a-a3ed-4271-aca8-f9af23c6b1ae"
    },
    CitationTitleResponse: {
        "id": "urn:pearson:work:49344dcb-2ad4-4064-bd11-1f279e89385d",
        "type": "element-authoredtext",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "elementdata": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Title in CG"
        },
        "html": {
            "text": "<p>Title in CG</p>",
            "footnotes": {},
            "glossaryentries": {}
        },
        "versionUrn": "urn:pearson:work:49344dcb-2ad4-4064-bd11-1f279e89385d",
        "contentUrn": "urn:pearson:entity:c7639453-5574-4e79-ba85-43991b2f90ad"
    },
    fetchAuthUserResponse: {
        email: "c5test01@dummy.com",
        firstName: "c5test01",
        lastName: "c5"
    },
    setActiveElementPayload: {
        citationGroup: {
            elementType: 'citations',
            primaryOption: 'primary-citations-group',
            secondaryOption: 'secondary-citations-group',
            elementId: 'urn:pearson:manifest:2b962460-a3d1-47a4-a644-cbc85f5537d4',
            index: 2,
            elementWipType: 'citations',
            toolbar:
                [   'insertMedia','formatSelector',
                    'footnote',
                    'increaseindent',
                    'decreaseindent',
                    'glossary',
                    'crossLinkingIcon',
                    'assetpopover',
                    'orderedlist',
                    'unorderedlist',
                    'alignment'],
            tag: 'CG'
        },
        figureImage: {
            elementType: 'figure',
            primaryOption: 'primary-image-figure',
            altText: '',
            longDesc: '',
            podwidth: '',
            secondaryOption: 'secondary-image-figure-width',
            elementId: 'urn:pearson:work:25777a73-bd47-497e-a5b3-f5be618560fb',
            index: 3,
            elementWipType: 'figure',
            toolbar:
                [   'insertMedia','formatSelector',
                    'crossLinkingIcon',
                    'assetpopover',
                    'glossary',
                    'decreaseindent',
                    'alignment'
                ],
            tag: 'Fg'
        },
        videoElement: {
            elementType: 'video-audio',
            primaryOption: 'primary-video',
            secondaryOption: 'secondary-video-smartlink',
            elementId: 'urn:pearson:work:155a564b-9f3b-4f8c-a5aa-3e32e6c2a5c5',
            index: 4,
            elementWipType: 'figure',
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover', 'glossary','alignment'],
            tag: 'VID'
        },
        audioElement: {
            elementType: 'video-audio',
            primaryOption: 'primary-audio',
            secondaryOption: 'secondary-audio-smartlink',
            elementId: 'urn:pearson:work:37a4aa89-8133-4829-8f8e-2b10afa1a95f',
            index: 5,
            elementWipType: 'figure',
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover', 'glossary','alignment'],
            tag: 'AUD'
        },
        interactiveElement: {
            altText: "",
            elementId: "urn:pearson:work:ee1603e6-fd90-4338-b8b5-6f199728b89c",
            elementType: "element-interactive",
            elementWipType: "figure",
            index: 6,
            primaryOption: "primary-mmi",
            secondaryOption: "secondary-interactive-mmi",
            tag: "QUAD",
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover', 'glossary','alignment'],
            longDesc: ""
        },
        figureInMultiColumn: {
            elementType: 'figure',
            primaryOption: 'primary-image-figure',
            altText: '',
            longDesc: '',
            podwidth: '',
            secondaryOption: 'secondary-image-figure-width',
            elementId: 'urn:pearson:work:85e925c1-9d97-42bf-a700-3ecdac370f6b',
            index: '7-0-0',
            elementWipType: 'figure',
            toolbar:
                ['insertMedia','formatSelector','crossLinkingIcon','assetpopover','glossary','decreaseindent','alignment'],
            tag: 'Fg'
        },
        audioInMultiColumn: {
            elementType: 'video-audio',
            primaryOption: 'primary-audio',
            secondaryOption: 'secondary-audio-smartlink',
            elementId: 'urn:pearson:work:00eafb5a-6ce7-47fe-b2e6-fd5353c50bc8',
            index: '7-0-1',
            elementWipType: 'figure',
            toolbar: ['insertMedia','formatSelector', 'crossLinkingIcon','assetpopover', 'glossary','alignment'],
            tag: 'AUD'
        },
        videoInMultiColumn: {
            elementType: 'video-audio',
            primaryOption: 'primary-video',
            secondaryOption: 'secondary-video-smartlink',
            elementId: 'urn:pearson:work:3bf55984-7e1e-48d9-8f8e-240ea4707c23',
            index: '7-1-0',
            elementWipType: 'figure',
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover', 'glossary','alignment'],
            tag: 'VID'
        },
        interactiveInMultiColumn: {
            altText: "",
            elementId: "urn:pearson:work:68304481-1c49-4611-a7b4-3a650944ecd4",
            elementType: "element-interactive",
            elementWipType: "figure",
            index: '7-1-1',
            primaryOption: "primary-mmi",
            secondaryOption: "secondary-interactive-mmi",
            tag: "QUAD",
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover', 'glossary','alignment'],
            longDesc:""
        },
        figureInAside: {
            elementType: 'figure',
            primaryOption: 'primary-image-figure',
            altText: '',
            longDesc: '',
            podwidth: '',
            secondaryOption: 'secondary-image-figure-width',
            elementId: 'urn:pearson:work:3a712ecb-e85f-4f23-b31d-20b8abc94410',
            index: '8-0',
            elementWipType: 'figure',
            toolbar:
                ['insertMedia','formatSelector','crossLinkingIcon','assetpopover','glossary','decreaseindent','alignment'],
            tag: 'Fg'
        },
        audioInAside: {
            elementType: 'video-audio',
            primaryOption: 'primary-audio',
            secondaryOption: 'secondary-audio-smartlink',
            elementId: 'urn:pearson:work:ceb5724e-18ba-4f60-b70e-e152abecbac6',
            index: '8-2',
            elementWipType: 'figure',
            toolbar: ['insertMedia','formatSelector', 'crossLinkingIcon','assetpopover', 'glossary','alignment'],
            tag: 'AUD'
        },
        videoInAside: {
            elementType: 'video-audio',
            primaryOption: 'primary-video',
            secondaryOption: 'secondary-video-smartlink',
            elementId: 'urn:pearson:work:554a3610-9e26-4e84-afdf-7071657a6c9d',
            index: '8-1',
            elementWipType: 'figure',
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover', 'glossary','alignment'],
            tag: 'VID'
        },
        interactiveInAside: {
            altText: "",
            elementId: "urn:pearson:work:e8fb2a14-06c6-4f0b-a163-cf1595d29da2",
            elementType: "element-interactive",
            elementWipType: "figure",
            index: '8-3',
            primaryOption: "primary-mmi",
            secondaryOption: "secondary-interactive-mmi",
            tag: "QUAD",
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover', 'glossary','alignment'],
            longDesc:""
        },
        figureInWE: {
            elementType: 'figure',
            primaryOption: 'primary-image-figure',
            altText: '',
            longDesc: '',
            podwidth: '',
            secondaryOption: 'secondary-image-figure-width',
            elementId: 'urn:pearson:work:375757c3-ee42-416e-96ad-2686684b456d',
            index: '9-1-0',
            elementWipType: 'figure',
            toolbar:
                ['insertMedia','formatSelector','crossLinkingIcon','assetpopover','glossary','decreaseindent','alignment'],
            tag: 'Fg'
        },
        audioInWE: {
            elementType: 'video-audio',
            primaryOption: 'primary-audio',
            secondaryOption: 'secondary-audio-smartlink',
            elementId: 'urn:pearson:work:7ab86ee0-60b6-4874-a1c4-d03173cc385d',
            index: '9-1-1',
            elementWipType: 'figure',
            toolbar: ['insertMedia','formatSelector', 'crossLinkingIcon','assetpopover', 'glossary','alignment'],
            tag: 'AUD'
        },
        videoInWE: {
            elementType: 'video-audio',
            primaryOption: 'primary-video',
            secondaryOption: 'secondary-video-smartlink',
            elementId: 'urn:pearson:work:b90bc099-31d6-434d-9a4c-f0589b234b27',
            index: '9-1-2',
            elementWipType: 'figure',
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover', 'glossary','alignment'],
            tag: 'VID'
        },
        interactiveInWE: {
            altText: "",
            elementId: "urn:pearson:work:1967b287-6273-4713-980a-a7008e074c73",
            elementType: "element-interactive",
            elementWipType: "figure",
            index: '9-1-3',
            primaryOption: "primary-mmi",
            secondaryOption: "secondary-interactive-mmi",
            tag: "QUAD",
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover', 'glossary','alignment'],
            longDesc:""
        },
    },
    ImageFigureData: {
        "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
        "imageid": "",
        "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
        "height": "422",
        "width": "680",
        "alttext": "alttext",
        "longdescription": "longdescription",
        "podwidth": "100"
    },
    BceFigureData: {
        "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
        "type": "codelistingformatted",
        "numbered": true,
        "startNumber": "1",
        "syntaxhighlighting": true
    },
    asideVersioning: {
        contentUrn: "urn:pearson:entity:8d6d8b8a-dacc-4110-8955-ebb267656bd9",
        elementdata: { schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", text: "" },
        html: {
            assetsPopover: {},
            footnotes: {},
            glossaryentries: {},
            text: "<p class='paragraphNumeroUno'><br></p>"
        },
        id: "urn:pearson:work:9b7b677c-a0ad-474d-872a-f055b47e8023",
        index: "8-5",
        schema: "http://schemas.pearson.com/wip-authoring/element/1",
        type: "element-authoredtext"
    },
    popupSlate: {
        "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670": {
            "id": "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670",
            "type": "popup",
            "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/popup",
            "versionUrn": "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670",
            "contentUrn": "urn:pearson:entity:f23c667b-81ca-48c5-ba58-bc19fa6b9677",
            "contents": {
                "bodymatter": [{
                    "id": "urn:pearson:work:37017561-abff-4ccd-8145-3bbcea1ff18c",
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
                    "versionUrn": "urn:pearson:work:37017561-abff-4ccd-8145-3bbcea1ff18c",
                    "contentUrn": "urn:pearson:entity:f4d52b47-a1f1-40d3-ad40-732342a4565b"
                }]
            },
            "status": "approved",
            "pageNo": 0
        }
    },
    popupSlateLabelVersioning: {
        contentUrn: "urn:pearson:entity:f23c667b-81ca-48c5-ba58-bc19fa6b9677",
        id: "urn:pearson:manifest:0749775b-cf8e-4165-ae6d-3e37600b2670",
        index: 1,
        popupdata: {
            bodymatter: [],
            'formatted-title': {
                contentUrn: "urn:pearson:entity:7d2fab9a-a3ed-4271-aca8-f9af23c6b1ae",
                elementdata: {
                    schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    text: "Label field ",
                    textsemantics: []
                },
                html: { text: "<p><label>Label field&nbsp;</label></p>", footnotes: {}, assetsPopover: {}, glossaryentries: {} },
                id: "urn:pearson:work:db951068-ed5f-46b0-b821-1bc41a1c64a0",
                schema: "http://schemas.pearson.com/wip-authoring/element/1",
                type: "element-authoredtext",
                versionUrn: "urn:pearson:work:db951068-ed5f-46b0-b821-1bc41a1c64a0"
            },
            postertextobject: [{
                contentUrn: "urn:pearson:entity:ba1b84f2-a687-459c-9a59-82966dbe9faa",
                elementdata: { schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", text: "cta text added" },
                html: { text: "<p class='paragraphNumeroUno'>cta text added</p>", footnotes: {}, assetsPopover: {}, glossaryentries: {} },
                id: "urn:pearson:work:782f9dc1-b471-4595-b792-1a3a6089c5fb",
                schema: "http://schemas.pearson.com/wip-authoring/element/1",
                type: "element-authoredtext",
                versionUrn: "urn:pearson:work:782f9dc1-b471-4595-b792-1a3a6089c5fb"
            }]
        },
        schema: "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/popup",
        status: "wip",
        type: "popup",
        versionUrn: "urn:pearson:manifest:a6ac890d-8c38-47d7-b37c-c0c41243ec4a",
    },
    learnosityData:[{
        'EntityURN': "urn:pearson:entity:69748294-909e-42e9-9e85-dc9c0b77bea1",
        'ItemBankId': "urn:pearson:itembank:a2399b07-ae2d-49db-90e5-a584a9498040",
        'ItemBankName': "CP/I-Elm Dev Sandbox",
        'LearnosityItemBankId': "641",
        'ProjectdURN': "urn:pearson:distributable:d4a7778a-2b38-4368-adb8-b342beb180d8",
        'Standalone': false
    }],
    learningFrameworksApiResponse : {
        "versionUrn": "urn:pearson:distributable:f847f78e-08ca-4ccd-94fb-a86b5dc221f4",
        "learningFrameworks": [{
            "urn": "urn:pearson:goalframework:73e75aaa-1d1d-4414-a042-9a45213a98ef",
            "label": {
                "en": "The Sociology Project 2.5"
            },
            "lineOfBusiness": "https://schema.pearson.com/ns/lineofbusiness/ukschools"
        }, {
            "urn": "urn:pearson:goalframework:9bc2ab38-3147-492a-9e93-3ec735e54a9d",
            "label": {
                "en": "ev_LF_Ext_0"
            },
            "lineOfBusiness": "https://schema.pearson.com/ns/lineofbusiness/higher-education"
        }]
    },
    learningFrameworksApiResponse_CyLF : {
        "versionUrn": "urn:pearson:distributable:f847f78e-08ca-4ccd-94fb-a86b5dc221f4",
        "learningFrameworks": [{
            "urn": "urn:pearson:goalframework:9bc2ab38-3147-492a-9e93-3ec735e54a9d",
            "label": {
                "en": "ev_LF_Ext_0"
            },
            "lineOfBusiness": "https://schema.pearson.com/ns/lineofbusiness/higher-education"
        }]
    },
    learningFrameworksApiResponse_ExtLF : {
        "versionUrn": "urn:pearson:distributable:f847f78e-08ca-4ccd-94fb-a86b5dc221f4",
        "learningFrameworks": [{
            "urn": "urn:pearson:goalframework:73e75aaa-1d1d-4414-a042-9a45213a98ef",
            "label": {
                "en": "The Sociology Project 2.5"
            },
            "lineOfBusiness": "https://schema.pearson.com/ns/lineofbusiness/ukschools"
        }]
    }
}
