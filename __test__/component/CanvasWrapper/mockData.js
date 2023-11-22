
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
                                    "glossaryentries": {},
                                    'toolbar':['insertMedia']
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
                            }],
                            "formatted-title": {
                                elementdata: { text: "" },
                                html: { text: "" }
                            }
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
                            "width": "680",
                            "podwidth": "100"
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
                        "width": "",
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
                                        "alignment": "actual-size",
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
                                    "interactiveformat": "mmi",
                                    "alttext": "interactive alt text",
                                    "longdescription": "int longdesc"
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
                    },
                    {
                        "id": "urn:pearson:manifest:1a447208-32e7-4e4b-95e6-ff1cbf735b9c",
                        "type": "groupedcontent",
                        "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                        "width": "wider",
                        "groupproportions": "33-33-33",
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
                                    },{
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
                                            },{
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
                                            }, {
                                                "id": "urn:pearson:manifest:2c9c5752-26a9-47dc-ba34-0b1a0879dd3f",
                                                "type": "manifest",
                                                "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
                                                "versionUrn": "urn:pearson:manifest:2c9c5752-26a9-47dc-ba34-0b1a0879dd3f",
                                                "contentUrn": "urn:pearson:entity:ff98ac85-3d80-4061-ba78-ae024dbd5150",
                                                "contents": {
                                                    "bodymatter": [{
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
                        "id": "urn:pearson:work:4eb7b66a-e4c8-4b9c-afed-5aae44c937f6",
                        "type": "element-authoredtext",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": "heading",
                            "designtype": "handwritingstyle"
                        },
                        "html": {
                            "text": "<h1 class=\"heading1NummerEins\">heading</h1>",
                            "footnotes": {},
                            "glossaryentries": {}
                        },
                        "versionUrn": "urn:pearson:work:4eb7b66a-e4c8-4b9c-afed-5aae44c937f6",
                        "contentUrn": "urn:pearson:entity:1c0efa65-a5ef-4837-bd67-b6f37aa03288"
                    },
                    {
                        "id": "urn:pearson:work:4eb7b66a-e4c8-4b9c-afed-5aae44c937f6",
                        "type": "element-learningobjectivemapping",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": "heading",
                            "designtype": "handwritingstyle"
                        },
                        "html": {
                            "text": "<h1 class=\"heading1NummerEins\">heading</h1>",
                            "footnotes": {},
                            "glossaryentries": {}
                        },
                        "versionUrn": "urn:pearson:work:4eb7b66a-e4c8-4b9c-afed-5aae44c937f6",
                        "contentUrn": "urn:pearson:entity:1c0efa65-a5ef-4837-bd67-b6f37aa03288"
                    },
                    {
                        "id": "urn:pearson:work:4eb7b66a-e4c8-4b9c-afed-5aae44c937f6",
                        "type": "element-generateLOlist",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": "heading",
                            "designtype": "handwritingstyle"
                        },
                        "html": {
                            "text": "<h1 class=\"heading1NummerEins\">heading</h1>",
                            "footnotes": {},
                            "glossaryentries": {}
                        },
                        "versionUrn": "urn:pearson:work:4eb7b66a-e4c8-4b9c-afed-5aae44c937f6",
                        "contentUrn": "urn:pearson:entity:1c0efa65-a5ef-4837-bd67-b6f37aa03288"
                    },
                    {
                        "id": "urn:pearson:work:4eb7b66a-e4c8-4b9c-afed-5aae44c937f6",
                        "type": "element-learningobjectives",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": "heading",
                            "designtype": "handwritingstyle"
                        },
                        "html": {
                            "text": "<h1 class=\"heading1NummerEins\">heading</h1>",
                            "footnotes": {},
                            "glossaryentries": {}
                        },
                        "versionUrn": "urn:pearson:work:4eb7b66a-e4c8-4b9c-afed-5aae44c937f6",
                        "contentUrn": "urn:pearson:entity:1c0efa65-a5ef-4837-bd67-b6f37aa03288"
                    },
                    {
                        "id": "urn:pearson:work:4eb7b66a-e4c8-4b9c-afed-5aae44c937f6",
                        "type": "element-dialogue",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": "heading",
                            "numberedlines": true,
                            "startNumber": "4"
                        },
                        "html": {
                            "text": "<h1 class=\"heading1NummerEins\">heading</h1>",
                            "footnotes": {},
                            "glossaryentries": {}
                        },
                        "versionUrn": "urn:pearson:work:4eb7b66a-e4c8-4b9c-afed-5aae44c937f6",
                        "contentUrn": "urn:pearson:entity:1c0efa65-a5ef-4837-bd67-b6f37aa03288"
                    },
                    {
                        "id": "urn:pearson:work:4eb7b66a-e4c8-4b9c-afed-5aae44c937f6",
                        "type": "discussion",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": "heading",
                            "numberedlines": true,
                            "startNumber": "4"
                        },
                        "html": {
                            "text": "<h1 class=\"heading1NummerEins\">heading</h1>",
                            "footnotes": {},
                            "glossaryentries": {}
                        },
                        "versionUrn": "urn:pearson:work:4eb7b66a-e4c8-4b9c-afed-5aae44c937f6",
                        "contentUrn": "urn:pearson:entity:1c0efa65-a5ef-4837-bd67-b6f37aa03288"
                    },
                    {
                        "id": "urn:pearson:work:4eb7b66a-e4c8-4b9c-afed-5aae44c937f6",
                        "type": "element-authoredtext",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": "heading",
                            "designtype": "dummy"
                        },
                        "html": {
                            "text": "<h1 class=\"heading1NummerEins\">heading</h1>",
                            "footnotes": {},
                            "glossaryentries": {}
                        },
                        "versionUrn": "urn:pearson:work:4eb7b66a-e4c8-4b9c-afed-5aae44c937f6",
                        "contentUrn": "urn:pearson:entity:1c0efa65-a5ef-4837-bd67-b6f37aa03288"
                    },{
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
                                    "id": "urn:pearson:manifest:ef6d234d-5965-4976-8e21-0e093c5ba7a0",
                                    "type": "citations",
                                    "schema": "http://schemas.pearson.com/wip-authoring/citations/1",
                                    "versionUrn": "urn:pearson:manifest:ef6d234d-5965-4976-8e21-0e093c5ba7a0",
                                    "contentUrn": "urn:pearson:entity:e1d634f7-3edf-4f57-9e45-a351ae35b2b6",
                                    "contents": {
                                        "bodymatter": [{
                                            "id": "urn:pearson:work:3a25600b-fd17-4bec-8757-e1ca9ffcfcd9",
                                            "type": "element-citation",
                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                            "elementdata": {
                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                "text": ""
                                            },
                                            "html": {
                                                "text": "<p class=\"paragraphNumeroUnoCitation\"><br></p>"
                                            },
                                            "versionUrn": "urn:pearson:work:3a25600b-fd17-4bec-8757-e1ca9ffcfcd9",
                                            "contentUrn": "urn:pearson:entity:7ab462bf-f9ad-42db-a0d4-c2f35e509cdd",
                                            "status": "wip"
                                        }]
                                    }
                                },{
                                    "id": "urn:pearson:manifest:11c71298-c804-48f1-a8cc-323d107ba1be",
                                    "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157bs4aw",
                                    "type": "element-aside",
                                    "subtype": "sidebar",
                                    "designtype": "sidebar",
                                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                    "elementdata": {
                                        "bodymatter": [
                                            {
                                                "type": "figure",
                                                "figuretype": "image",
                                                "subtype": "image50Text",
                                                "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                                                "alignment": "half-text",
                                                "title": {
                                                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                    "text": "", "textsemantics": [], "mathml": []
                                                },
                                                "subtitle": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "", "textsemantics": [], "mathml": [], "footnotes": [] },
                                                "captions": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "", "textsemantics": [], "mathml": [], "footnotes": [] },
                                                "credits": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "", "textsemantics": [], "mathml": [], "footnotes": [] },
                                                "figuredata": { "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png", "height": "1225", "width": "1440", "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image", "imageid": "urn:pearson:alfresco:600efdb1-a28c-4ec3-8b54-9aad364c8c2c" },
                                                "html": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "title": "", "subtitle": "", "caption": "", "credit": "", "postertext": "", "tableasHTML": "" },
                                                "comments": false,
                                                "tcm": false,
                                                "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89",
                                                "id": "urn:pearson:work:aca6096b-d0b6-4358-a2c7-313188665d23",
                                                "versionUrn": "urn:pearson:work:aca6096b-d0b6-4358-a2c7-313188665d231"
                                            },
                                            {
                                                "figuretype": "assessment",
                                                "figuredata": { 'elementdata':{} },
                                                "id": "urn:pearson:work:aca6096b-d0b6-4358-a2c7-313188665d20",
                                                "versionUrn": "urn:pearson:work:aca6096b-d0b6-4358-a2c7-313188665d230"
                                            }
                                        ]
                                    }
                                }
                            ],
                            "hide": [
                                {
                                    "id": "urn:pearson:manifest:11c71298-c804-48f1-a8cc-323d107ba1be",
                                    "type": "element-aside",
                                    "subtype": "workedexample",
                                    "designtype": "sidebar",
                                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                    "elementdata": {
                                        "bodymatter": [
                                            {
                                                "id": "urn:pearson:manifest:f0c610b8-337d-47b0-9680-83b73481289c",
                                                "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
                                                "type": "manifest",
                                                "contents": {
                                                    "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
                                                    "frontmatter": [],
                                                    "bodymatter": [
                                                        {
                                                            "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b",
                                                            "type": "element-authoredtext",
                                                            "subtype": "",
                                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                                            "elementdata": {
                                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                                "text": "asdfasdfasdf"
                                                            },
                                                            "headers": [
                                                                {
                                                                    "charStart": 0,
                                                                    "charEnd": -1,
                                                                    "level": 4
                                                                }
                                                            ],
                                                            "html": {
                                                                "text": "<h5 class=\"heading5NummerEins\">Heading 5</h5>"
                                                            },
                                                            "comments": true,
                                                            "tcm": true,
                                                            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                                                            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                                                        },
                                                        {
                                                            "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0v",
                                                            "type": "element-authoredtext",
                                                            "subtype": "",
                                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                                            "elementdata": {
                                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                                "text": "asdfasdfasdf"
                                                            },
                                                            "html": {
                                                                "text": "<p class=\"heading1NummerEins\">Heading 1</p>"
                                                            },
                                                            "comments": true,
                                                            "tcm": true,
                                                            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                                                            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                                                        }
                                                    ],
                                                    "backmatter": []
                                                },
                                                "contentUrn": "urn:pearson:entity:08942f6d-8fd3-4a39-b72d-8bdc33eb289a",
                                                "versionUrn": "urn:pearson:manifest:f0c610b8-337d-47b0-9680-83b73481289c"
                                            },{
                                                "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b",
                                                "type": "element-authoredtext",
                                                "subtype": "",
                                                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                                "elementdata": {
                                                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                    "text": "asdfasdfasdf"
                                                },
                                                "headers": [
                                                    {
                                                        "charStart": 0,
                                                        "charEnd": -1,
                                                        "level": 4
                                                    }
                                                ],
                                                "html": {
                                                    "text": "<h5 class=\"heading5NummerEins\">Heading 5</h5>"
                                                },
                                                "comments": true,
                                                "tcm": true,
                                                "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                                                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                                            },{
                                                "figuretype": "assessment",
                                                "figuredata": { 'elementdata':{} },
                                                "id": "urn:pearson:work:aca6096b-d0b6-4358-a2c7-313188665d20",
                                                "versionUrn": "urn:pearson:work:aca6096b-d0b6-4358-a2c7-313188665d230"
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        "id": "urn:pearson:manifest:88b94351-a30a-4728-8ac4-91c7f8aaeae3",
                        "type": "group",
                        "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                        "versionUrn": "urn:pearson:manifest:88b94351-a30a-4728-8ac4-91c7f8aaeae3",
                        "contentUrn": "urn:pearson:entity:a914d0c9-fad7-4487-b523-f8ba7398f6e9",
                        "groupdata": {
                            "bodymatter": [
                                {
                                    "id": "urn:pearson:manifest:077761f5-b8da-4eb5-888e-84460f741ba4",
                                    "type": "groupedcontent",
                                    "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                                    "width": "wider",
                                    "groupproportions": "60-40",
                                    "versionUrn": "urn:pearson:manifest:077761f5-b8da-4eb5-888e-84460f741ba4",
                                    "contentUrn": "urn:pearson:entity:5dfb81bb-afe7-41f3-a8fb-a53e7655a879",
                                    "groupeddata": {
                                        "bodymatter": [
                                            {
                                                "id": "urn:pearson:manifest:02563131-40f8-44aa-9a43-b50c719cf554",
                                                "type": "group",
                                                "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                                                "versionUrn": "urn:pearson:manifest:02563131-40f8-44aa-9a43-b50c719cf554",
                                                "contentUrn": "urn:pearson:entity:53035e88-9d94-461d-9c71-9f075d77d492",
                                                "groupdata": {
                                                    "bodymatter": [
                                                        {
                                                            "id": "urn:pearson:work:0d38344d-ea6d-4c1c-81f4-c5919862769c",
                                                            "type": "element-authoredtext",
                                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                                            "elementdata": {
                                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                                "text": ""
                                                            },
                                                            "html": {
                                                                "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                                                            },
                                                            "versionUrn": "urn:pearson:work:0d38344d-ea6d-4c1c-81f4-c5919862769c",
                                                            "contentUrn": "urn:pearson:entity:a6c71d56-2996-44a8-a164-6cac937c15aa",
                                                            "status": "wip"
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "id": "urn:pearson:manifest:0f84fd9a-9c5a-40b6-9832-dc811d4513c8",
                                                "type": "group",
                                                "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                                                "versionUrn": "urn:pearson:manifest:0f84fd9a-9c5a-40b6-9832-dc811d4513c8",
                                                "contentUrn": "urn:pearson:entity:f3f3cce2-9f1c-43cd-95da-2b54b88a0736",
                                                "groupdata": {
                                                    "bodymatter": [
                                                        {
                                                            "id": "urn:pearson:work:39e662de-938b-4909-8fcc-597f8ecc7713",
                                                            "type": "element-authoredtext",
                                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                                            "elementdata": {
                                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                                "text": ""
                                                            },
                                                            "html": {
                                                                "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                                                            },
                                                            "versionUrn": "urn:pearson:work:39e662de-938b-4909-8fcc-597f8ecc7713",
                                                            "contentUrn": "urn:pearson:entity:977973a2-8dc4-49cc-8c7a-081c8555ebb3",
                                                            "status": "wip"
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        "id": "urn:pearson:manifest:1a447208-32e7-4e4b-95e6-ff1cbf735b9c",
                        "type": "groupedcontent",
                        "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                        "width": "120px",
                        "groupproportions": "50-50",
                        "subtype":"tab",
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
                                        "alignment": "actual-size",
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
                        "id": "urn:pearson:manifest:4458f7e5-f220-4cd0-ba85-8c160fc4654d",
                        "type": "groupedcontent",
                        "subtype": "tab",
                        "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                        "width": "text-width",
                        "groupproportions": "70-30",
                        "versionUrn": "urn:pearson:manifest:4458f7e5-f220-4cd0-ba85-8c160fc4654d",
                        "contentUrn": "urn:pearson:entity:b1ea9a0a-841a-4e4f-97ab-fdc6aa5149cc",
                        "groupeddata": {
                            "bodymatter": [
                                {
                                    "id": "urn:pearson:manifest:ce923591-5685-46a5-966e-a20d0f00ac90",
                                    "type": "group",
                                    "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                                    "versionUrn": "urn:pearson:manifest:ce923591-5685-46a5-966e-a20d0f00ac90",
                                    "contentUrn": "urn:pearson:entity:05cc4205-2def-415a-be37-cac97838f108",
                                    "groupdata": {
                                        "bodymatter": [
                                            {
                                                "id": "urn:pearson:manifest:ca690b58-28b0-492e-b9e7-7a3deeede76e",
                                                "type": "groupedcontent",
                                                "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                                                "width": "wider",
                                                "groupproportions": "60-40",
                                                "versionUrn": "urn:pearson:manifest:ca690b58-28b0-492e-b9e7-7a3deeede76e",
                                                "contentUrn": "urn:pearson:entity:86709665-eda7-472c-ac90-e62bba8303f1",
                                                "groupeddata": {
                                                    "bodymatter": [
                                                        {
                                                            "id": "urn:pearson:manifest:44ffb72f-87d7-460e-8f3b-4da77abdd85f",
                                                            "type": "group",
                                                            "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                                                            "versionUrn": "urn:pearson:manifest:44ffb72f-87d7-460e-8f3b-4da77abdd85f",
                                                            "contentUrn": "urn:pearson:entity:713c076c-f209-4f05-82e6-f70c1c9c293e",
                                                            "groupdata": {
                                                                "bodymatter": [
                                                                    {
                                                                        "id": "urn:pearson:manifest:400e39cf-d831-4aa3-a5f8-e5fa0168fdcf",
                                                                        "type": "element-aside",
                                                                        "subtype": "workedexample",
                                                                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                                                        "designtype": "workedexample1",
                                                                        "elementdata": {
                                                                            "bodymatter": [
                                                                                {
                                                                                    "id": "urn:pearson:work:dde3fc05-c8c5-4710-8a30-8d99b378c673",
                                                                                    "type": "element-authoredtext",
                                                                                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                                                                    "elementdata": {
                                                                                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                                                        "text": "",
                                                                                        "headers": [
                                                                                            {
                                                                                                "level": 4
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    "html": {
                                                                                        "text": "<h4 class=\"heading4NummerEins\"><br></h4>",
                                                                                        "footnotes": {},
                                                                                        "assetsPopover": {},
                                                                                        "glossaryentries": {},
                                                                                        "indexEntries": {}
                                                                                    },
                                                                                    "versionUrn": "urn:pearson:work:dde3fc05-c8c5-4710-8a30-8d99b378c673",
                                                                                    "contentUrn": "urn:pearson:entity:6718ad28-11d7-43e7-bfa9-68fd023755cf"
                                                                                },
                                                                                {
                                                                                    "id": "urn:pearson:manifest:e0ea03f7-8251-435c-a809-05fd92951500",
                                                                                    "type": "popup",
                                                                                    "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/popup",
                                                                                    "versionUrn": "urn:pearson:manifest:e0ea03f7-8251-435c-a809-05fd92951500",
                                                                                    "contentUrn": "urn:pearson:entity:264a73d3-f624-4832-86d5-a3371c43087c",
                                                                                    "popupdata": {
                                                                                        "bodymatter": [
                                                                                            {
                                                                                                "id": "urn:pearson:work:6776d855-5f24-48bc-b7bf-3ffa92aa8ca4",
                                                                                                "type": "element-authoredtext",
                                                                                                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                                                                                "elementdata": {
                                                                                                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                                                                    "text": ""
                                                                                                },
                                                                                                "html": {
                                                                                                    "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                                                                                                },
                                                                                                "versionUrn": "urn:pearson:work:6776d855-5f24-48bc-b7bf-3ffa92aa8ca4",
                                                                                                "contentUrn": "urn:pearson:entity:d8c31602-409e-4ec0-8c28-caa3c452d9d5",
                                                                                                "status": "wip"
                                                                                            }
                                                                                        ],
                                                                                        "postertextobject": [
                                                                                            {
                                                                                                "id": "urn:pearson:work:6c7177bf-b873-424c-8561-2690fc7f1cf6",
                                                                                                "type": "element-authoredtext",
                                                                                                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                                                                                "elementdata": {
                                                                                                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                                                                    "text": ""
                                                                                                },
                                                                                                "html": {
                                                                                                    "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                                                                                                },
                                                                                                "versionUrn": "urn:pearson:work:6c7177bf-b873-424c-8561-2690fc7f1cf6",
                                                                                                "contentUrn": "urn:pearson:entity:8cbbf6eb-0790-495e-afe6-227d16e8cf26",
                                                                                                "status": "wip"
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "id": "urn:pearson:manifest:4f23de3d-3203-4979-b9ad-541861c28eef",
                                                                                    "type": "manifest",
                                                                                    "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
                                                                                    "versionUrn": "urn:pearson:manifest:4f23de3d-3203-4979-b9ad-541861c28eef",
                                                                                    "contentUrn": "urn:pearson:entity:b8d42020-f963-4324-9deb-76758a9bb158",
                                                                                    "contents": {
                                                                                        "bodymatter": [
                                                                                            {
                                                                                                "id": "urn:pearson:work:b50a5e3f-bd8b-496e-b7d7-1984b6f526cc",
                                                                                                "type": "element-authoredtext",
                                                                                                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                                                                                "elementdata": {
                                                                                                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                                                                    "text": "",
                                                                                                    "headers": [
                                                                                                        {
                                                                                                            "level": 5
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                "html": {
                                                                                                    "text": "<h5 class=\"heading5NummerEins\"><br></h5>",
                                                                                                    "footnotes": {},
                                                                                                    "assetsPopover": {},
                                                                                                    "glossaryentries": {},
                                                                                                    "indexEntries": {}
                                                                                                },
                                                                                                "versionUrn": "urn:pearson:work:b50a5e3f-bd8b-496e-b7d7-1984b6f526cc",
                                                                                                "contentUrn": "urn:pearson:entity:8958bc86-b97f-460d-8aca-bf15e8c4064c"
                                                                                            },
                                                                                            {
                                                                                                "id": "urn:pearson:work:3650b26b-3f02-4a70-92a6-48f1fd714e2b",
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
                                                                                                "versionUrn": "urn:pearson:work:3650b26b-3f02-4a70-92a6-48f1fd714e2b",
                                                                                                "contentUrn": "urn:pearson:entity:d5093a0a-b366-4d54-8685-5788488966c4"
                                                                                            }
                                                                                        ],
                                                                                        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
                                                                                    },
                                                                                    "status": "wip",
                                                                                    "indexPos": [
                                                                                        "0",
                                                                                        "0",
                                                                                        "0",
                                                                                        "urn:pearson:entity:6cd7d583-fb0c-4fdf-815a-f106839600bc",
                                                                                        "urn:pearson:entity:6cd7d583-fb0c-4fdf-815a-f106839600bc",
                                                                                        "2"
                                                                                    ],
                                                                                    "parentDetails": [
                                                                                        "0",
                                                                                        "0",
                                                                                        "0",
                                                                                        "urn:pearson:entity:6cd7d583-fb0c-4fdf-815a-f106839600bc",
                                                                                        "urn:pearson:entity:6cd7d583-fb0c-4fdf-815a-f106839600bc"
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
                                                                        },
                                                                        "versionUrn": "urn:pearson:manifest:400e39cf-d831-4aa3-a5f8-e5fa0168fdcf",
                                                                        "contentUrn": "urn:pearson:entity:98e5fbbf-777b-4f5a-9d2c-13257d206c62",
                                                                        "status": "wip",
                                                                        "parentDetails": [
                                                                            "urn:pearson:entity:86709665-eda7-472c-ac90-e62bba8303f1",
                                                                            "urn:pearson:entity:713c076c-f209-4f05-82e6-f70c1c9c293e",
                                                                            "urn:pearson:entity:98e5fbbf-777b-4f5a-9d2c-13257d206c62"
                                                                        ],
                                                                        "indexPos": [
                                                                            "0",
                                                                            "0",
                                                                            "0"
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            "status": "wip"
                                                        },
                                                        {
                                                            "id": "urn:pearson:manifest:71a23c1b-0830-42dd-b01b-c967670d1785",
                                                            "type": "group",
                                                            "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                                                            "versionUrn": "urn:pearson:manifest:71a23c1b-0830-42dd-b01b-c967670d1785",
                                                            "contentUrn": "urn:pearson:entity:3b083da7-748f-487f-94ff-0c6b19ab6ace",
                                                            "groupdata": {
                                                                "bodymatter": [
                                                                    {
                                                                        "id": "urn:pearson:work:38ac0c24-a8e7-4fd0-87d8-67e4a5c0c310",
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
                                                                        "versionUrn": "urn:pearson:work:38ac0c24-a8e7-4fd0-87d8-67e4a5c0c310",
                                                                        "contentUrn": "urn:pearson:entity:7de73514-07d6-4c27-9bcc-04a6c319243f",
                                                                        "parentDetails": [
                                                                            "urn:pearson:entity:86709665-eda7-472c-ac90-e62bba8303f1",
                                                                            "urn:pearson:entity:3b083da7-748f-487f-94ff-0c6b19ab6ace"
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            "status": "wip"
                                                        }
                                                    ]
                                                },
                                                "status": "wip",
                                                "indexPos": [
                                                    "0",
                                                    "1"
                                                ]
                                            }
                                        ]
                                    },
                                    "status": "wip"
                                }
                            ]
                        },
                        "status": "wip",
                        "indexPos": [
                            "0"
                        ]
                    },
                    {
                        "id": "urn:pearson:manifest:4458f7e5-f220-4cd0-ba85-8c160fc4654d",
                        "type": "groupedcontent",
                        "subtype": "tab",
                        "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                        "width": "text-width",
                        "groupproportions": "70-30",
                        "versionUrn": "urn:pearson:manifest:4458f7e5-f220-4cd0-ba85-8c160fc4654d",
                        "contentUrn": "urn:pearson:entity:b1ea9a0a-841a-4e4f-97ab-fdc6aa5149cc",
                        "groupeddata": {
                            "bodymatter": [
                                {
                                    "id": "urn:pearson:manifest:ce923591-5685-46a5-966e-a20d0f00ac90",
                                    "type": "group",
                                    "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                                    "versionUrn": "urn:pearson:manifest:ce923591-5685-46a5-966e-a20d0f00ac90",
                                    "contentUrn": "urn:pearson:entity:05cc4205-2def-415a-be37-cac97838f108",
                                    "groupdata": {
                                        "bodymatter": [
                                            {
                                                "id": "urn:pearson:manifest:ca690b58-28b0-492e-b9e7-7a3deeede76e",
                                                "type": "groupedcontent",
                                                "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                                                "width": "wider",
                                                "groupproportions": "60-40",
                                                "versionUrn": "urn:pearson:manifest:ca690b58-28b0-492e-b9e7-7a3deeede76e",
                                                "contentUrn": "urn:pearson:entity:86709665-eda7-472c-ac90-e62bba8303f1",
                                                "groupeddata": {
                                                    "bodymatter": [
                                                        {
                                                            "id": "urn:pearson:manifest:44ffb72f-87d7-460e-8f3b-4da77abdd85f",
                                                            "type": "group",
                                                            "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                                                            "versionUrn": "urn:pearson:manifest:44ffb72f-87d7-460e-8f3b-4da77abdd85f",
                                                            "contentUrn": "urn:pearson:entity:713c076c-f209-4f05-82e6-f70c1c9c293e",
                                                            "groupdata": {
                                                                "bodymatter": [
                                                                    {
                                                                        "id": "urn:pearson:manifest:400e39cf-d831-4aa3-a5f8-e5fa0168fdcf",
                                                                        "type": "element-aside",
                                                                        "subtype": "workedexample",
                                                                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                                                        "designtype": "workedexample1",
                                                                        "elementdata": {
                                                                            "bodymatter": [
                                                                                {
                                                                                    "id": "urn:pearson:work:dde3fc05-c8c5-4710-8a30-8d99b378c673",
                                                                                    "type": "element-authoredtext",
                                                                                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                                                                    "elementdata": {
                                                                                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                                                        "text": "",
                                                                                        "headers": [
                                                                                            {
                                                                                                "level": 4
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    "html": {
                                                                                        "text": "<h4 class=\"heading4NummerEins\"><br></h4>",
                                                                                        "footnotes": {},
                                                                                        "assetsPopover": {},
                                                                                        "glossaryentries": {},
                                                                                        "indexEntries": {}
                                                                                    },
                                                                                    "versionUrn": "urn:pearson:work:dde3fc05-c8c5-4710-8a30-8d99b378c673",
                                                                                    "contentUrn": "urn:pearson:entity:6718ad28-11d7-43e7-bfa9-68fd023755cf"
                                                                                },
                                                                                {
                                                                                    "id": "urn:pearson:manifest:4f23de3d-3203-4979-b9ad-541861c28eef",
                                                                                    "type": "manifest",
                                                                                    "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
                                                                                    "versionUrn": "urn:pearson:manifest:4f23de3d-3203-4979-b9ad-541861c28eef",
                                                                                    "contentUrn": "urn:pearson:entity:b8d42020-f963-4324-9deb-76758a9bb158",
                                                                                    "contents": {
                                                                                        "bodymatter": [
                                                                                            {
                                                                                                "id": "urn:pearson:work:b50a5e3f-bd8b-496e-b7d7-1984b6f526cc",
                                                                                                "type": "element-authoredtext",
                                                                                                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                                                                                "elementdata": {
                                                                                                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                                                                    "text": "",
                                                                                                    "headers": [
                                                                                                        {
                                                                                                            "level": 5
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                "html": {
                                                                                                    "text": "<h5 class=\"heading5NummerEins\"><br></h5>",
                                                                                                    "footnotes": {},
                                                                                                    "assetsPopover": {},
                                                                                                    "glossaryentries": {},
                                                                                                    "indexEntries": {}
                                                                                                },
                                                                                                "versionUrn": "urn:pearson:work:b50a5e3f-bd8b-496e-b7d7-1984b6f526cc",
                                                                                                "contentUrn": "urn:pearson:entity:8958bc86-b97f-460d-8aca-bf15e8c4064c"
                                                                                            },
                                                                                            {
                                                                                                "id": "urn:pearson:manifest:c3aee1b1-1a74-4d9c-9c4a-b5343c7d7b36",
                                                                                                "type": "popup",
                                                                                                "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/popup",
                                                                                                "versionUrn": "urn:pearson:manifest:c3aee1b1-1a74-4d9c-9c4a-b5343c7d7b36",
                                                                                                "contentUrn": "urn:pearson:entity:3ca62ae4-cc2c-44f5-a715-acad5bcc1a0b",
                                                                                                "popupdata": {
                                                                                                    "bodymatter": [
                                                                                                        {
                                                                                                            "id": "urn:pearson:work:d0319658-2b59-4e31-9e9f-a800f7b0b7c0",
                                                                                                            "type": "element-authoredtext",
                                                                                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                                                                                            "elementdata": {
                                                                                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                                                                                "text": ""
                                                                                                            },
                                                                                                            "html": {
                                                                                                                "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                                                                                                            },
                                                                                                            "versionUrn": "urn:pearson:work:d0319658-2b59-4e31-9e9f-a800f7b0b7c0",
                                                                                                            "contentUrn": "urn:pearson:entity:17488bef-b635-4d46-b401-4307a1b2d28f",
                                                                                                            "status": "wip"
                                                                                                        }
                                                                                                    ],
                                                                                                    "postertextobject": [
                                                                                                        {
                                                                                                            "id": "urn:pearson:work:81fd8de3-6aac-4200-985a-39ad983b79d3",
                                                                                                            "type": "element-authoredtext",
                                                                                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                                                                                            "elementdata": {
                                                                                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                                                                                "text": ""
                                                                                                            },
                                                                                                            "html": {
                                                                                                                "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                                                                                                            },
                                                                                                            "versionUrn": "urn:pearson:work:81fd8de3-6aac-4200-985a-39ad983b79d3",
                                                                                                            "contentUrn": "urn:pearson:entity:3c33c3b5-47f2-4134-8e14-231d87297135",
                                                                                                            "status": "wip"
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                "id": "urn:pearson:work:3650b26b-3f02-4a70-92a6-48f1fd714e2b",
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
                                                                                                "versionUrn": "urn:pearson:work:3650b26b-3f02-4a70-92a6-48f1fd714e2b",
                                                                                                "contentUrn": "urn:pearson:entity:d5093a0a-b366-4d54-8685-5788488966c4"
                                                                                            }
                                                                                        ],
                                                                                        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
                                                                                    },
                                                                                    "status": "wip",
                                                                                    "indexPos": [
                                                                                        "0",
                                                                                        "0",
                                                                                        "0",
                                                                                        "urn:pearson:entity:6cd7d583-fb0c-4fdf-815a-f106839600bc",
                                                                                        "urn:pearson:entity:6cd7d583-fb0c-4fdf-815a-f106839600bc",
                                                                                        "2"
                                                                                    ],
                                                                                    "parentDetails": [
                                                                                        "0",
                                                                                        "0",
                                                                                        "0",
                                                                                        "urn:pearson:entity:6cd7d583-fb0c-4fdf-815a-f106839600bc",
                                                                                        "urn:pearson:entity:6cd7d583-fb0c-4fdf-815a-f106839600bc"
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
                                                                        },
                                                                        "versionUrn": "urn:pearson:manifest:400e39cf-d831-4aa3-a5f8-e5fa0168fdcf",
                                                                        "contentUrn": "urn:pearson:entity:98e5fbbf-777b-4f5a-9d2c-13257d206c62",
                                                                        "status": "wip",
                                                                        "parentDetails": [
                                                                            "urn:pearson:entity:86709665-eda7-472c-ac90-e62bba8303f1",
                                                                            "urn:pearson:entity:713c076c-f209-4f05-82e6-f70c1c9c293e",
                                                                            "urn:pearson:entity:98e5fbbf-777b-4f5a-9d2c-13257d206c62"
                                                                        ],
                                                                        "indexPos": [
                                                                            "0",
                                                                            "0",
                                                                            "0"
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            "status": "wip"
                                                        },
                                                        {
                                                            "id": "urn:pearson:manifest:71a23c1b-0830-42dd-b01b-c967670d1785",
                                                            "type": "group",
                                                            "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                                                            "versionUrn": "urn:pearson:manifest:71a23c1b-0830-42dd-b01b-c967670d1785",
                                                            "contentUrn": "urn:pearson:entity:3b083da7-748f-487f-94ff-0c6b19ab6ace",
                                                            "groupdata": {
                                                                "bodymatter": [
                                                                    {
                                                                        "id": "urn:pearson:work:38ac0c24-a8e7-4fd0-87d8-67e4a5c0c310",
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
                                                                        "versionUrn": "urn:pearson:work:38ac0c24-a8e7-4fd0-87d8-67e4a5c0c310",
                                                                        "contentUrn": "urn:pearson:entity:7de73514-07d6-4c27-9bcc-04a6c319243f",
                                                                        "parentDetails": [
                                                                            "urn:pearson:entity:86709665-eda7-472c-ac90-e62bba8303f1",
                                                                            "urn:pearson:entity:3b083da7-748f-487f-94ff-0c6b19ab6ace"
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            "status": "wip"
                                                        }
                                                    ]
                                                },
                                                "status": "wip",
                                                "indexPos": [
                                                    "0",
                                                    "1"
                                                ]
                                            }
                                        ]
                                    },
                                    "status": "wip"
                                }
                            ]
                        },
                        "status": "wip",
                        "indexPos": [
                            "0"
                        ]
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
                        title: "<p></p>",
                        toolbar:['insertMedia']
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
    fetchAuthUserResponse2: {
        email: "c5test01@dummy.com",
        userId: "c5test01"
    },
    fetchUserLocationResponse: {
            id : "uthalki",
            username: "uthalki",
            mail: [
                "kira.marbit@pedev.com"
            ],
            houseIdentifier: [
                "US-NJ-Hoboken-221 River"
            ]
        },
    fetchUserLocationResponse2: {
        houseIdentifier: [
            "US-NJ-Hoboken-221 River"
        ]
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
                    'alignment',
                    'calloutIcon',
                    'IndexEntry'],
            tag: 'CG'
        },
        figureImage: {
            elementType: 'figure',
            primaryOption: 'primary-image-figure',
            altText: '',
            longDesc: '',
            podwidth: '100',
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
                    'alignment',
                    'calloutIcon',
                    'IndexEntry'
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
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover', 'glossary','alignment','calloutIcon','IndexEntry'],
            tag: 'VID'
        },
        audioElement: {
            elementType: 'video-audio',
            primaryOption: 'primary-audio',
            secondaryOption: 'secondary-audio-smartlink',
            elementId: 'urn:pearson:work:37a4aa89-8133-4829-8f8e-2b10afa1a95f',
            index: 5,
            elementWipType: 'figure',
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover', 'glossary','alignment','calloutIcon','IndexEntry'],
            tag: 'AUD'
        },
        interactiveElement: {
            altText: "",
            assetIdFor3PISmartlink: "",
            elementId: "urn:pearson:work:ee1603e6-fd90-4338-b8b5-6f199728b89c",
            elementType: "element-interactive",
            elementWipType: "figure",
            index: 6,
            primaryOption: "primary-mmi",
            secondaryOption: "secondary-interactive-mmi",
            selectedIntendedPlaybackModeValue: "inline",
            tag: "QUAD",
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover', 'glossary','alignment','calloutIcon','IndexEntry', 'decreaseindent','increaseindent','orderedlist','unorderedlist'],
            longDesc: "",
            podwidth: undefined,
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
                ['insertMedia','formatSelector','crossLinkingIcon','assetpopover','glossary','decreaseindent','alignment','calloutIcon','IndexEntry'],
            tag: 'Fg'
        },
        audioInMultiColumn: {
            elementType: 'video-audio',
            primaryOption: 'primary-audio',
            secondaryOption: 'secondary-audio-smartlink',
            elementId: 'urn:pearson:work:00eafb5a-6ce7-47fe-b2e6-fd5353c50bc8',
            index: '7-0-1',
            elementWipType: 'figure',
            toolbar: ['insertMedia','formatSelector', 'crossLinkingIcon','assetpopover', 'glossary','alignment','calloutIcon','IndexEntry'],
            tag: 'AUD'
        },
        videoInMultiColumn: {
            elementType: 'video-audio',
            primaryOption: 'primary-video',
            secondaryOption: 'secondary-video-smartlink',
            elementId: 'urn:pearson:work:3bf55984-7e1e-48d9-8f8e-240ea4707c23',
            index: '7-1-0',
            elementWipType: 'figure',
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover', 'glossary','alignment','calloutIcon','IndexEntry'],
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
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover', 'glossary','alignment','calloutIcon','IndexEntry', 'decreaseindent', 'increaseindent', 'orderedlist', 'unorderedlist'],
            longDesc:"",
            assetIdFor3PISmartlink: "",
            podwidth: undefined,
            selectedIntendedPlaybackModeValue: "inline"
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
                ['insertMedia','formatSelector','crossLinkingIcon','assetpopover','glossary','decreaseindent','alignment','calloutIcon','IndexEntry'],
            tag: 'Fg'
        },
        audioInAside: {
            elementType: 'video-audio',
            primaryOption: 'primary-audio',
            secondaryOption: 'secondary-audio-smartlink',
            elementId: 'urn:pearson:work:ceb5724e-18ba-4f60-b70e-e152abecbac6',
            index: '8-2',
            elementWipType: 'figure',
            toolbar: ['insertMedia','formatSelector', 'crossLinkingIcon','assetpopover', 'glossary','alignment','calloutIcon','IndexEntry'],
            tag: 'AUD'
        },
        videoInAside: {
            elementType: 'video-audio',
            primaryOption: 'primary-video',
            secondaryOption: 'secondary-video-smartlink',
            elementId: 'urn:pearson:work:554a3610-9e26-4e84-afdf-7071657a6c9d',
            index: '8-1',
            elementWipType: 'figure',
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover', 'glossary','alignment','calloutIcon','IndexEntry'],
            tag: 'VID'
        },
        interactiveInAside: {
            altText: "interactive alt text",
            elementId: "urn:pearson:work:e8fb2a14-06c6-4f0b-a163-cf1595d29da2",
            elementType: "element-interactive",
            elementWipType: "figure",
            index: '8-3',
            primaryOption: "primary-mmi",
            secondaryOption: "secondary-interactive-mmi",
            tag: "QUAD",
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover', 'glossary','alignment','calloutIcon','IndexEntry', 'decreaseindent', 'increaseindent', 'orderedlist', 'unorderedlist'],
            longDesc:"int longdesc",
            assetIdFor3PISmartlink: "",
            podwidth: undefined,
            selectedIntendedPlaybackModeValue: "inline"
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
                ['insertMedia','formatSelector','crossLinkingIcon','assetpopover','glossary','decreaseindent','alignment','calloutIcon','IndexEntry'],
            tag: 'Fg'
        },
        audioInWE: {
            elementType: 'video-audio',
            primaryOption: 'primary-audio',
            secondaryOption: 'secondary-audio-smartlink',
            elementId: 'urn:pearson:work:7ab86ee0-60b6-4874-a1c4-d03173cc385d',
            index: '9-1-1',
            elementWipType: 'figure',
            toolbar: ['insertMedia','formatSelector', 'crossLinkingIcon','assetpopover', 'glossary','alignment','calloutIcon','IndexEntry'],
            tag: 'AUD'
        },
        videoInWE: {
            elementType: 'video-audio',
            primaryOption: 'primary-video',
            secondaryOption: 'secondary-video-smartlink',
            elementId: 'urn:pearson:work:b90bc099-31d6-434d-9a4c-f0589b234b27',
            index: '9-1-2',
            elementWipType: 'figure',
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover', 'glossary','alignment','calloutIcon','IndexEntry'],
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
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover', 'glossary','alignment','calloutIcon','IndexEntry', 'decreaseindent', 'increaseindent', 'orderedlist', 'unorderedlist'],
            longDesc:"",
            assetIdFor3PISmartlink: "",
            podwidth: undefined,
            selectedIntendedPlaybackModeValue: "inline"
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
