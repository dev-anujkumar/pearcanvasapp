export const initialState = {
    keyboardReducer : {
        "selectedElement": "cypress-keyboard-0-labelautonumber-1",
        "cursorPosition": 0,
        "elementList": []
    },
    autoNumberReducer: {
        "isAutoNumberingEnabled": true,
        "autoNumberedElements": {
            "imageList": [],
            "tableList": [],
            "equationList": [],
            "audioList": [],
            "videoList": [],
            "asideList": [],
            "workedExampleList": [],
            "interactiveList": [],
            "exhibitList": []
        },
        "autoNumberingDetails": {
            "chapterOrderList": {
                "urn:pearson:entity:c9d798bb-fec3-4fae-ae0b-0ecd7be9564e": 1
            },
            "partOrderList": {}
        },
        "autoNumberElementsIndex": {
            "figureImageIndex": {},
            "tableIndex": {},
            "equationIndex": {},
            "audioIndex": {},
            "videoIndex": {},
            "asideIndex": {},
            "workedExampleIndex": {},
            "interactiveIndex": {},
            "exhibitIndex": {}
        },
        "slateFigureList": [
            {
                "id": "urn:pearson:work:9ae1cd21-343b-4784-a6bd-3fe50974b0c1",
                "type": "figure",
                "figuretype": "image",
                "subtype": "imageTextWidth",
                "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                "titlecontentintitlefield": true,
                "alignment": "text-width",
                "title": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": "Figure This is title for FG ",
                    "textsemantics": [
                        {
                            "charStart": 0,
                            "charEnd": 6,
                            "type": "label"
                        }
                    ]
                },
                "captions": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": "This is caption"
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
                    "width": "680",
                    "podwidth": ""
                },
                "html": {
                    "title": "<p><label>Figure&nbsp;</label>This is title for FG&nbsp;</p>",
                    "text": "",
                    "postertext": "",
                    "captions": "<p>This is caption</p>",
                    "credits": "<p></p>",
                    "footnotes": {},
                    "assetsPopover": {},
                    "glossaryentries": {},
                    "indexEntries": {}
                },
                "versionUrn": "urn:pearson:work:9ae1cd21-343b-4784-a6bd-3fe50974b0c1",
                "contentUrn": "urn:pearson:entity:715defc0-ddfb-46a8-a73c-5574a22e0768",
                "indexPos": "0",
                "parentDetails": [],
                "slateEntityUrn": "urn:pearson:entity:f8734a97-c9aa-4d55-bcc1-caf5460cea8f"
            },
            {
                "id": "urn:pearson:work:431e3266-8c40-49ae-98e5-1d7e873abf8a",
                "type": "figure",
                "figuretype": "video",
                "subtype": "figureVideo",
                "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                "titlecontentintitlefield": true,
                "title": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": "Video ",
                    "textsemantics": [
                        {
                            "charStart": 0,
                            "charEnd": 5,
                            "type": "label"
                        }
                    ]
                },
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/video/1#/definitions/video",
                    "height": "399",
                    "width": "600",
                    "videoid": "",
                    "posterimage": {
                        "path": "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png",
                        "imageid": ""
                    },
                    "videos": [
                        {
                            "path": "",
                            "charAt": 0
                        }
                    ]
                },
                "html": {
                    "title": "<p><label>Video </label></p>",
                    "captions": "<p></p>",
                    "credits": "<p></p>",
                    "footnotes": {},
                    "assetsPopover": {},
                    "glossaryentries": {},
                    "indexEntries": {}
                },
                "versionUrn": "urn:pearson:work:431e3266-8c40-49ae-98e5-1d7e873abf8a",
                "contentUrn": "urn:pearson:entity:2fe977fa-133a-4220-9a7a-a846d8959243",
                "indexPos": "1",
                "parentDetails": [],
                "slateEntityUrn": "urn:pearson:entity:f8734a97-c9aa-4d55-bcc1-caf5460cea8f"
            },
            {
                "id": "urn:pearson:work:689e140e-fc5c-4a99-9307-0393f6421bc8",
                "type": "figure",
                "figuretype": "interactive",
                "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                "titlecontentintitlefield": true,
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/interactive",
                    "interactiveid": "",
                    "interactivetype": "fpo",
                    "interactiveformat": "mmi"
                },
                "html": {
                    "title": "<p></p>",
                    "captions": "<p></p>",
                    "credits": "<p></p>",
                    "footnotes": {},
                    "assetsPopover": {},
                    "glossaryentries": {},
                    "indexEntries": {}
                },
                "versionUrn": "urn:pearson:work:689e140e-fc5c-4a99-9307-0393f6421bc8",
                "contentUrn": "urn:pearson:entity:42ac56ba-0536-476b-9a71-f52e46ea7844",
                "indexPos": "2",
                "parentDetails": [],
                "slateEntityUrn": "urn:pearson:entity:f8734a97-c9aa-4d55-bcc1-caf5460cea8f"
            },
            {
                "id": "urn:pearson:work:4614875b-fce3-473a-874d-3f662a73b1e1",
                "type": "figure",
                "figuretype": "interactive",
                "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                "titlecontentintitlefield": true,
                "title": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": "Title"
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
                    "interactiveformat": "mmi-elm"
                },
                "html": {
                    "title": "<p>Title</p>",
                    "text": "",
                    "postertext": "",
                    "captions": "<p></p>",
                    "credits": "<p></p>",
                    "footnotes": {},
                    "assetsPopover": {},
                    "glossaryentries": {},
                    "indexEntries": {}
                },
                "versionUrn": "urn:pearson:work:4614875b-fce3-473a-874d-3f662a73b1e1",
                "contentUrn": "urn:pearson:entity:fdbdbc9f-ddf2-4fc3-86a4-331694683fca",
                "indexPos": "3",
                "parentDetails": [],
                "slateEntityUrn": "urn:pearson:entity:f8734a97-c9aa-4d55-bcc1-caf5460cea8f"
            }
        ],
        "autoNumberOption": {
            "entityUrn": "urn:pearson:entity:715defc0-ddfb-46a8-a73c-5574a22e0768",
            "option": "Default Auto-number"
        },
        "popupParentSlateData": {},
        "popupCutCopyParentData": {},
        "tocContainerSlateList": [
            "urn:pearson:entity:4744b2fc-1410-4753-851d-93ab6b658177",
            "urn:pearson:entity:f8734a97-c9aa-4d55-bcc1-caf5460cea8f",
            "urn:pearson:entity:8697b982-4bcf-4411-9633-afe499e1bdbe"
        ],
        "autoNumber_KeyMapper": {
            "Figure": "figureImageIndex",
            "Table": "tableIndex",
            "Equation": "equationIndex",
            "Audio": "audioIndex",
            "Video": "videoIndex",
            "Interactive": "interactiveIndex",
            "Aside": "asideIndex",
            "Worked Example": "workedExampleIndex",
            "Exhibit": "exhibitIndex"
        },
        "autoNumber_ElementTypeKey": {
            "Figure": "imageList",
            "Table": "tableList",
            "Equation": "equationList",
            "Audio": "audioList",
            "Video": "videoList",
            "Interactive": "interactiveList",
            "Aside": "asideList",
            "Worked Example": "workedExampleList",
            "Exhibit": "exhibitList"
        },
        "autoNumber_response_ElementType_mapper": {
            "figure": "imageList",
            "table": "tableList",
            "equation": "equationList",
            "audio": "audioList",
            "video": "videoList",
            "interactive": "interactiveList",
            "aside": "asideList",
            "workedexample": "workedExampleList",
            "exhibit": "exhibitList"
        },
        "autoNumber_IndexMapper": {
            "imageList": "figureImageIndex",
            "tableList": "tableIndex",
            "equationList": "equationIndex",
            "audioList": "audioIndex",
            "videoList": "videoIndex",
            "interactiveList": "interactiveIndex",
            "asideList": "asideIndex",
            "workedExampleList": "workedExampleIndex",
            "exhibitList": "exhibitIndex"
        },
        "autoNumber_FigureTypeKey_Mapper": {
            "image": "IMAGE",
            "video": "AUDIO",
            "audio": "VIDEO",
            "interactive": "INTERACTIVE",
            "tableasmarkup": "TABLE",
            "authoredtext": "AUTHOREDTEXT",
            "codelisting": "CODELISTING"
        },
        "popupElementsData": []
    },
    alfrescoReducer : {
        "launchAlfrescoPopup": false,
        "alfrescoPath": {},
        "alfrescoListOption": {},
        "alfrescoAssetData": {},
        "elementId": "",
        "Permission": [],
        "editor": {},
        "isCiteChanged": false,
        "changedSiteData": {},
        "isInlineEditorOpen": false,
        "locationData": {},
        "calledFromGlossaryFootnote": false,
        "calledFromImageGlossaryFootnote": false,
        "savedElement": {}
    },
    toolbarReducer : {
        "elemBorderToggle": true,
        "pageNumberToggle": false,
        "spellCheckToggle": true
    },
    appStore: {
        "slateLevelData": {
            "urn:pearson:manifest:bad26b08-9632-470d-b1b0-4090aafe42b4": {
                "id": "urn:pearson:manifest:bad26b08-9632-470d-b1b0-4090aafe42b4",
                "type": "manifest",
                "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
                "versionUrn": "urn:pearson:manifest:bad26b08-9632-470d-b1b0-4090aafe42b4",
                "contentUrn": "urn:pearson:entity:f8734a97-c9aa-4d55-bcc1-caf5460cea8f",
                "contents": {
                    "bodymatter": [
                        {
                            "id": "urn:pearson:work:9ae1cd21-343b-4784-a6bd-3fe50974b0c1",
                            "type": "figure",
                            "figuretype": "image",
                            "subtype": "imageTextWidth",
                            "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                            "titlecontentintitlefield": true,
                            "alignment": "text-width",
                            "title": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "Figure This is title for FG ",
                                "textsemantics": [
                                    {
                                        "charStart": 0,
                                        "charEnd": 6,
                                        "type": "label"
                                    }
                                ]
                            },
                            "captions": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "This is caption"
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
                                "width": "680",
                                "podwidth": ""
                            },
                            "html": {
                                "title": "<p><label>Figure&nbsp;</label>This is title for FG&nbsp;</p>",
                                "text": "",
                                "postertext": "",
                                "captions": "<p>This is caption</p>",
                                "credits": "<p></p>",
                                "footnotes": {},
                                "assetsPopover": {},
                                "glossaryentries": {},
                                "indexEntries": {}
                            },
                            "versionUrn": "urn:pearson:work:9ae1cd21-343b-4784-a6bd-3fe50974b0c1",
                            "contentUrn": "urn:pearson:entity:715defc0-ddfb-46a8-a73c-5574a22e0768",
                            "indexPos": "0",
                            "parentDetails": [],
                            "slateEntityUrn": "urn:pearson:entity:f8734a97-c9aa-4d55-bcc1-caf5460cea8f"
                        },
                        {
                            "id": "urn:pearson:work:431e3266-8c40-49ae-98e5-1d7e873abf8a",
                            "type": "figure",
                            "figuretype": "video",
                            "subtype": "figureVideo",
                            "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                            "titlecontentintitlefield": true,
                            "title": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "textsemantics": [],
                                "mathml": [],
                                "text": "Video"
                            },
                            "figuredata": {
                                "schema": "http://schemas.pearson.com/wip-authoring/video/1#/definitions/video",
                                "height": "399",
                                "width": "600",
                                "videoid": "",
                                "posterimage": {
                                    "path": "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png",
                                    "imageid": ""
                                },
                                "videos": [
                                    {
                                        "path": "",
                                        "charAt": 0
                                    }
                                ]
                            },
                            "html": {
                                "captions": "<p></p>",
                                "credits": "<p></p>",
                                "footnotes": {},
                                "glossaryentries": {},
                                "title": "<p><label>Video&nbsp;</label></p>",
                                "postertext": "",
                                "text": ""
                            },
                            "versionUrn": "urn:pearson:work:431e3266-8c40-49ae-98e5-1d7e873abf8a",
                            "contentUrn": "urn:pearson:entity:2fe977fa-133a-4220-9a7a-a846d8959243",
                            "parentDetails": [],
                            "slateEntityUrn": "urn:pearson:entity:f8734a97-c9aa-4d55-bcc1-caf5460cea8f",
                            "index": "1",
                            "captions": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "textsemantics": [],
                                "mathml": [],
                                "text": "",
                                "footnotes": []
                            },
                            "credits": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "textsemantics": [],
                                "mathml": [],
                                "text": "",
                                "footnotes": []
                            },
                            "inputType": "IMAGE",
                            "inputSubType": "IMAGE_TEXT_WIDTH",
                            "slateVersionUrn": "urn:pearson:manifest:bad26b08-9632-470d-b1b0-4090aafe42b4",
                            "elementParentEntityUrn": "urn:pearson:entity:f8734a97-c9aa-4d55-bcc1-caf5460cea8f",
                            "projectUrn": "urn:pearson:distributable:8f7d588d-f14a-4bf5-bf6f-d5ea72677252",
                            "elementdata": {
                                "text": null
                            },
                            "tcm": false
                        },
                        {
                            "id": "urn:pearson:work:689e140e-fc5c-4a99-9307-0393f6421bc8",
                            "type": "figure",
                            "figuretype": "interactive",
                            "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                            "titlecontentintitlefield": true,
                            "figuredata": {
                                "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/interactive",
                                "interactiveid": "",
                                "interactivetype": "fpo",
                                "interactiveformat": "mmi"
                            },
                            "html": {
                                "title": "<p></p>",
                                "captions": "<p></p>",
                                "credits": "<p></p>",
                                "footnotes": {},
                                "assetsPopover": {},
                                "glossaryentries": {},
                                "indexEntries": {}
                            },
                            "versionUrn": "urn:pearson:work:689e140e-fc5c-4a99-9307-0393f6421bc8",
                            "contentUrn": "urn:pearson:entity:42ac56ba-0536-476b-9a71-f52e46ea7844",
                            "indexPos": "2",
                            "parentDetails": [],
                            "slateEntityUrn": "urn:pearson:entity:f8734a97-c9aa-4d55-bcc1-caf5460cea8f"
                        },
                        {
                            "id": "urn:pearson:work:4614875b-fce3-473a-874d-3f662a73b1e1",
                            "type": "figure",
                            "figuretype": "interactive",
                            "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                            "titlecontentintitlefield": true,
                            "title": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "Title"
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
                                "interactiveformat": "mmi-elm"
                            },
                            "html": {
                                "title": "<p>Title</p>",
                                "text": "",
                                "postertext": "",
                                "captions": "<p></p>",
                                "credits": "<p></p>",
                                "footnotes": {},
                                "assetsPopover": {},
                                "glossaryentries": {},
                                "indexEntries": {}
                            },
                            "versionUrn": "urn:pearson:work:4614875b-fce3-473a-874d-3f662a73b1e1",
                            "contentUrn": "urn:pearson:entity:fdbdbc9f-ddf2-4fc3-86a4-331694683fca",
                            "indexPos": "3",
                            "parentDetails": [],
                            "slateEntityUrn": "urn:pearson:entity:f8734a97-c9aa-4d55-bcc1-caf5460cea8f"
                        }
                    ],
                    "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
                },
                "status": "wip",
                "pageNo": 0,
                "pageCount": 1,
                "pageLimit": 25
            }
        },
        "activeElement": {
            "elementType": "figure",
            "primaryOption": "primary-image-figure",
            "altText": "",
            "longDesc": "",
            "podwidth": "",
            "secondaryOption": "secondary-image-figure-width",
            "elementId": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
            "index": 0,
            "elementWipType": "figure",
            "toolbar": [
                "insertMedia",
                "formatSelector",
                "crossLinkingIcon",
                "assetpopover",
                "glossary",
                "decreaseindent",
                "alignment",
                "calloutIcon",
                "IndexEntry"
            ],
            "tag": "Fg"
        },
        "splittedElementIndex": 0,
        "pageNumberData": [],
        "permissions": [
            "login",
            "logout",
            "bookshelf_access",
            "generate_epub_output",
            "demand_on_print",
            "toggle_tcm",
            "content_preview",
            "add_instructor_resource_url",
            "grid_crud_access",
            "alfresco_crud_access",
            "set_favorite_project",
            "sort_projects",
            "search_projects",
            "project_edit",
            "edit_project_title_author",
            "promote_review",
            "promote_live",
            "create_new_version",
            "project_add_delete_users",
            "create_custom_user",
            "toc_add_pages",
            "toc_delete_entry",
            "toc_rearrange_entry",
            "toc_edit_title",
            "elements_add_remove",
            "split_slate",
            "full_project_slate_preview",
            "access_formatting_bar",
            "authoring_mathml",
            "slate_traversal",
            "trackchanges_edit",
            "trackchanges_approve_reject",
            "tcm_feedback",
            "notes_access_manager",
            "quad_create_edit_ia",
            "quad_linking_assessment",
            "add_multimedia_via_alfresco",
            "toggle_element_page_no",
            "toggle_element_borders",
            "global_search",
            "global_replace",
            "edit_print_page_no",
            "notes_adding",
            "notes_deleting",
            "notes_delete_others_comment",
            "note_viewer",
            "notes_assigning",
            "notes_resolving_closing",
            "notes_relpying",
            "note_search_comment",
            "lo_edit_metadata",
            "preflight_access",
            "learnosity_access",
            "access-to-cypress+",
            "toggle_auto_numbering"
        ],
        "accesDeniedPopup": false,
        "popupSlateData": null,
        "roleId": "admin",
        "oldImage": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
        "showHideId": "",
        "parentUrn": {},
        "asideData": {},
        "showHideObj": "",
        "allSlateData": {
            "frontmatter": [],
            "bodymatter": [
                {
                    "containerUrn": "urn:pearson:manifest:ee6b16fa-3349-46e8-8f6a-b16311246417",
                    "entityUrn": "urn:pearson:entity:c9d798bb-fec3-4fae-ae0b-0ecd7be9564e",
                    "title": "",
                    "label": "chapter",
                    "matterType": "bodymatter",
                    "contents": [
                        {
                            "containerUrn": "urn:pearson:manifest:6c0a9b00-596a-46ba-9aed-efbbce755ea8",
                            "entityUrn": "urn:pearson:entity:4744b2fc-1410-4753-851d-93ab6b658177",
                            "title": "",
                            "label": "container-introduction"
                        },
                        {
                            "containerUrn": "urn:pearson:manifest:bad26b08-9632-470d-b1b0-4090aafe42b4",
                            "entityUrn": "urn:pearson:entity:f8734a97-c9aa-4d55-bcc1-caf5460cea8f",
                            "title": "",
                            "label": "section"
                        },
                        {
                            "containerUrn": "urn:pearson:manifest:6ca463e8-2f17-4998-943d-093f86c3aa33",
                            "entityUrn": "urn:pearson:entity:8697b982-4bcf-4411-9633-afe499e1bdbe",
                            "title": "",
                            "label": "section"
                        }
                    ]
                }
            ],
            "backmatter": []
        },
        "currentSlateAncestorData": {
            "containerUrn": "urn:pearson:manifest:bad26b08-9632-470d-b1b0-4090aafe42b4",
            "entityUrn": "urn:pearson:entity:f8734a97-c9aa-4d55-bcc1-caf5460cea8f",
            "title": "",
            "label": "section",
            "matterType": "BodyMatter",
            "ancestor": {
                "containerUrn": "urn:pearson:manifest:ee6b16fa-3349-46e8-8f6a-b16311246417",
                "entityUrn": "urn:pearson:entity:c9d798bb-fec3-4fae-ae0b-0ecd7be9564e",
                "title": "",
                "label": "chapter",
                "ancestor": {
                    "containerUrn": "urn:pearson:distributable:8f7d588d-f14a-4bf5-bf6f-d5ea72677252",
                    "entityUrn": "urn:pearson:entity:8d866f5d-26a8-4211-949a-3c54d99e2845",
                    "title": "Test project 123",
                    "label": "project"
                }
            }
        },
        "allElemPageData": [],
        "pageNumberLoading": false,
        "usageTypeListData": {
            "entityType": "assessment",
            "usageTypeList": [
                "Concept Check",
                "Diagnostic",
                "Homework",
                "Journal",
                "Non-Scored",
                "Poll",
                "Practice",
                "Quiz",
                "Remediation",
                "Shared Writing",
                "Study Tools",
                "Test"
            ],
            "apiStatus": 200
        },
        "slateLength": "25",
        "toastMessage": "",
        "showToast": false,
        "oldFiguredata": {},
        "wirisAltText": {},
        "isLearnosityProjectInfo": {},
        "figureGlossaryData": {},
        "addfigureGlossarypopup": false,
        "openWrongImagePopup": false,
        "multipleColumnData": [],
        "removeGlossaryImage": false,
        "oldFigureDataForCompare": {
            "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
            "imageid": "",
            "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
            "height": "422",
            "width": "680",
            "podwidth": ""
        },
        "oldSmartLinkDataForCompare": {
            "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/interactive",
            "interactiveid": "",
            "interactivetype": "fpo",
            "interactiveformat": "mmi"
        },
        "oldAudioVideoDataForCompare": {
            "schema": "http://schemas.pearson.com/wip-authoring/video/1#/definitions/video",
            "height": "399",
            "width": "600",
            "videoid": "",
            "posterimage": {
                "path": "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png",
                "imageid": ""
            },
            "videos": [
                {
                    "path": "",
                    "charAt": 0
                }
            ]
        },
        "figureDropdownData": {
            "id": "AutoNumberedList",
            "image": [
                "Figure",
                "Table",
                "Equation"
            ],
            "audio": [
                "Audio"
            ],
            "video": [
                "Video"
            ],
            "smartlinks": [
                "Interactive",
                "Figure",
                "Table"
            ],
            "mathml": [
                "Equation"
            ],
            "preformattedtext": [
                "Exhibit"
            ],
            "tableasmarkup": [
                "Table"
            ],
            "interactive": [
                "Interactive"
            ],
            "aside": [
                "Aside"
            ],
            "workedexample": [
                "Worked Example"
            ]
        },
        "asideTitleData": [],
        "isCypressPlusEnabled": false,
        "isJoinedPdfSlate": false,
        "tableElementAssetData": [],
        "tableElementEditedData": {},
        "caretPosition": "",
        "slateTitleUpdated": "",
        "slateMatterType": "bodymatter",
        "slateType": "section",
        "setSlateEntity": "urn:pearson:entity:f8734a97-c9aa-4d55-bcc1-caf5460cea8f",
        "setSlateParent": "chapter"
    }    
};

export const props = {
    "model": {
        "id": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "type": "figure",
        "figuretype": "image",
        "subtype": "imageTextWidth",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "titlecontentintitlefield": true,
        "alignment": "text-width",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Fugure with resume numbering"
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
            "width": "680",
            "podwidth": ""
        },
        "html": {
            "title": "<p>Fugure with resume numbering</p>",
            "text": "",
            "postertext": "",
            "captions": "<p></p>",
            "credits": "<p></p>",
            "footnotes": {},
            "assetsPopover": {},
            "glossaryentries": {},
            "indexEntries": {}
        },
        "versionUrn": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "contentUrn": "urn:pearson:entity:9fbb85f1-3992-4252-b50f-35e5674bb174",
        "displayedlabel": "Figure",
        "numberedandlabel": true,
        "manualoverride": {"overridenumbervalue": '100'},
        "indexPos": "2",
        "parentDetails": [],
        "slateEntityUrn": "urn:pearson:entity:3abd09e0-d847-426b-accd-f1f992d22f80"
    },
    "index": 2,
    "elementId": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
    "permissions": [
        "login",
        "logout",
        "bookshelf_access",
        "generate_epub_output",
        "demand_on_print",
        "toggle_tcm",
        "content_preview",
        "add_instructor_resource_url",
        "grid_crud_access",
        "alfresco_crud_access",
        "set_favorite_project",
        "sort_projects",
        "search_projects",
        "project_edit",
        "edit_project_title_author",
        "promote_review",
        "promote_live",
        "create_new_version",
        "project_add_delete_users",
        "create_custom_user",
        "toc_add_pages",
        "toc_delete_entry",
        "toc_rearrange_entry",
        "toc_edit_title",
        "elements_add_remove",
        "split_slate",
        "full_project_slate_preview",
        "access_formatting_bar",
        "authoring_mathml",
        "slate_traversal",
        "trackchanges_edit",
        "trackchanges_approve_reject",
        "tcm_feedback",
        "notes_access_manager",
        "quad_create_edit_ia",
        "quad_linking_assessment",
        "add_multimedia_via_alfresco",
        "toggle_element_page_no",
        "toggle_element_borders",
        "global_search",
        "global_replace",
        "edit_print_page_no",
        "notes_adding",
        "notes_deleting",
        "notes_delete_others_comment",
        "note_viewer",
        "notes_assigning",
        "notes_resolving_closing",
        "notes_relpying",
        "note_search_comment",
        "lo_edit_metadata",
        "preflight_access",
        "learnosity_access",
        "access-to-cypress+",
        "toggle_auto_numbering"
    ],
    "slateLockInfo": {
        "isLocked": false,
        "userId": ""
    },
    "glossaryFootnoteValue": {
        "popUpStatus": false
    },
    "markedIndexValue": {
        "type": "Markedindex",
        "popUpStatus": false,
        "markIndexid": ""
    },
    "alfrescoAssetData": {},
    "alfrescoElementId": "",
    "alfrescoListOption": {},
    "launchAlfrescoPopup": false,
    "isCiteChanged": false,
    "changedSiteData": {},
    "figureDropdownData": {
        "id": "urn:pearson:entity:88538afc-3158-4a10-9c31-83bb7aad19be",
        "image": [
            "Figure",
            "Table",
            "Equation"
        ],
        "audio": [
            "Audio"
        ],
        "video": [
            "Video"
        ],
        "smartlinks": [
            "Interactive",
            "Figure",
            "Table"
        ],
        "mathml": [
            "Equation"
        ],
        "preformattedtext": [
            "Exhibit"
        ],
        "tableasmarkup": [
            "Table"
        ],
        "interactive": [
            "Interactive"
        ],
        "aside": [
            "Aside"
        ],
        "workedexample": [
            "Worked Example"
        ],
        "imageCustom": [
            "rwerfwerwe"
        ]
    },
    "slateAncestors": {
        "containerUrn": "urn:pearson:manifest:40e9f2db-77e5-416e-b356-10eda85a41b7",
        "entityUrn": "urn:pearson:entity:3abd09e0-d847-426b-accd-f1f992d22f80",
        "title": "Ramayan slate 1",
        "label": "section",
        "matterType": "BodyMatter",
        "ancestor": {
            "containerUrn": "urn:pearson:manifest:d8a9a0de-b54e-4578-acfa-b6df152bd80d",
            "entityUrn": "urn:pearson:entity:eedc9f81-c954-44ec-93f4-16119a610b56",
            "title": "chapter 1",
            "label": "chapter",
            "ancestor": {
                "containerUrn": "urn:pearson:manifest:bfc8a9fc-d9e7-4df4-8675-045808390bce",
                "entityUrn": "urn:pearson:entity:823fe472-6164-4cc8-8499-4cfc07382778",
                "title": "",
                "label": "part",
                "ancestor": {
                    "containerUrn": "urn:pearson:manifest:3a5b0d45-62f5-46de-86fa-491c08bb88e4",
                    "entityUrn": "urn:pearson:entity:3cea36f9-602b-47de-a51b-fda39c7ab137",
                    "title": "",
                    "label": "volume",
                    "ancestor": {
                        "containerUrn": "urn:pearson:distributable:01efd364-24c3-46c7-9a3f-8941b9e0eef1",
                        "entityUrn": "urn:pearson:entity:88538afc-3158-4a10-9c31-83bb7aad19be",
                        "title": "Autonumbering in RC",
                        "label": "project"
                    }
                }
            }
        }
    },
    "isAutoNumberingEnabled": true,
    "selectedElement": "cypress-keyboard-1",
    "figureHtmlData": {
        "formattedLabel": "<p class=\"paragraphNumeroUno\"><br/></p>",
        "formattedNumber": "<p class=\"paragraphNumeroUno\"><br/></p>",
        "formattedTitle": "<p class=\"paragraphNumeroUno\">Fugure with resume numbering</p>"
    },
    "figLabelClass": "heading4ImageTextWidthNumberLabel",
    "figTitleClass": "heading4ImageTextWidthTitle",
    "autoNumberOption": {
        "entityUrn": "urn:pearson:entity:fe82b9bd-cfed-43aa-b2a9-20ea01bee381",
        "option": "Default Auto-number"
    },
    "currentSlateAncestorData": {
        "containerUrn": "urn:pearson:manifest:40e9f2db-77e5-416e-b356-10eda85a41b7",
        "entityUrn": "urn:pearson:entity:3abd09e0-d847-426b-accd-f1f992d22f80",
        "title": "Ramayan slate 1",
        "label": "section",
        "matterType": "BodyMatter",
        "ancestor": {
            "containerUrn": "urn:pearson:manifest:d8a9a0de-b54e-4578-acfa-b6df152bd80d",
            "entityUrn": "urn:pearson:entity:eedc9f81-c954-44ec-93f4-16119a610b56",
            "title": "chapter 1",
            "label": "chapter",
            "ancestor": {
                "containerUrn": "urn:pearson:manifest:bfc8a9fc-d9e7-4df4-8675-045808390bce",
                "entityUrn": "urn:pearson:entity:823fe472-6164-4cc8-8499-4cfc07382778",
                "title": "",
                "label": "part",
                "ancestor": {
                    "containerUrn": "urn:pearson:manifest:3a5b0d45-62f5-46de-86fa-491c08bb88e4",
                    "entityUrn": "urn:pearson:entity:3cea36f9-602b-47de-a51b-fda39c7ab137",
                    "title": "",
                    "label": "volume",
                    "ancestor": {
                        "containerUrn": "urn:pearson:distributable:01efd364-24c3-46c7-9a3f-8941b9e0eef1",
                        "entityUrn": "urn:pearson:entity:88538afc-3158-4a10-9c31-83bb7aad19be",
                        "title": "Autonumbering in RC",
                        "label": "project"
                    }
                }
            }
        }
    },
    "activeElement": {
        "elementType": "figure",
        "primaryOption": "primary-image-figure",
        "altText": "",
        "longDesc": "",
        "podwidth": "",
        "secondaryOption": "secondary-image-figure-width",
        "elementId": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "index": 0,
        "elementWipType": "figure",
        "toolbar": [
            "insertMedia",
            "formatSelector",
            "crossLinkingIcon",
            "assetpopover",
            "glossary",
            "decreaseindent",
            "alignment",
            "calloutIcon",
            "IndexEntry"
        ],
        "tag": "Fg"
    },
    "autoNumberElementsIndex": {
        "figureImageIndex": {
            "urn:pearson:entity:eedc9f81-c954-44ec-93f4-16119a610b56": {
                "urn:pearson:entity:9fbb85f1-3992-4252-b50f-35e5674bb174": 1
            }
        },
        "tableIndex": {},
        "equationIndex": {},
        "audioIndex": {},
        "videoIndex": {},
        "asideIndex": {},
        "workedExampleIndex": {
            "urn:pearson:entity:eedc9f81-c954-44ec-93f4-16119a610b56": {
                "urn:pearson:entity:fe82b9bd-cfed-43aa-b2a9-20ea01bee381": 1
            }
        },
        "interactiveIndex": {},
        "exhibitIndex": {}
    },
    "autoNumberingDetails": {
        "chapterOrderList": {
            "urn:pearson:entity:eedc9f81-c954-44ec-93f4-16119a610b56": 1,
            "urn:pearson:entity:36841092-3d83-4a48-85e0-2355d5a79bc8": 2,
            "urn:pearson:entity:e3172eac-70bf-4150-9b58-269967872055": 3,
            "urn:pearson:entity:1697e883-d08d-4a96-8696-720f24d5353f": 4,
            "urn:pearson:entity:6bd3ce15-5866-4065-b7ae-fcfc0b75a0ee": 5,
            "urn:pearson:entity:ed686dc2-01e1-455c-a6c2-e8acc6302815": 6,
            "urn:pearson:entity:5cc648c9-52e2-48d0-a57d-87cb93e77940": 7,
            "urn:pearson:entity:34e27bcd-4904-4fe8-954c-544c6cfc952f": 8,
            "urn:pearson:entity:4f0262be-5b72-47f9-864a-a47336713c25": 9
        },
        "partOrderList": {
            "urn:pearson:entity:823fe472-6164-4cc8-8499-4cfc07382778": 1,
            "urn:pearson:entity:7370ced9-5c84-4eae-96a0-362f42b1b331": 2,
            "urn:pearson:entity:7faecec2-68bb-4f78-b79a-a86277a08410": 3
        }
    }
}

export const props1 = {
    ...props,
    "model": {
        "id": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "type": "figure",
        "figuretype": "audio",
        "subtype": "imageTextWidth",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "titlecontentintitlefield": true,
        "alignment": "text-width",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Fugure with resume numbering"
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
            "width": "680",
            "podwidth": ""
        },
        "html": {
            "title": "<p>Fugure with resume numbering</p>",
            "text": "",
            "postertext": "",
            "captions": "<p></p>",
            "credits": "<p></p>",
            "footnotes": {},
            "assetsPopover": {},
            "glossaryentries": {},
            "indexEntries": {}
        },
        "versionUrn": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "contentUrn": "urn:pearson:entity:9fbb85f1-3992-4252-b50f-35e5674bb174",
        "displayedlabel": "Figure",
        "numberedandlabel": true,
        "manualoverride": {
            "resumenumbervalue": 100
        },
        "indexPos": "2",
        "parentDetails": [],
        "slateEntityUrn": "urn:pearson:entity:3abd09e0-d847-426b-accd-f1f992d22f80"
    }
}

export const props2 = {
    ...props,
    "model": {
        "id": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "type": "figure",
        "figuretype": "audio",
        "subtype": "imageTextWidth",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "titlecontentintitlefield": true,
        "alignment": "text-width",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Fugure with resume numbering"
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
            "width": "680",
            "podwidth": ""
        },
        "html": {
            "title": "<p>Fugure with resume numbering</p>",
            "text": "",
            "postertext": "",
            "captions": "<p></p>",
            "credits": "<p></p>",
            "footnotes": {},
            "assetsPopover": {},
            "glossaryentries": {},
            "indexEntries": {}
        },
        "versionUrn": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "contentUrn": "urn:pearson:entity:9fbb85f1-3992-4252-b50f-35e5674bb174",
        "displayedlabel": "Figure",
        "numberedandlabel": true,
        "manualoverride": {
            "resumenumbervalue": 100
        },
        "indexPos": "2",
        "parentDetails": [],
        "slateEntityUrn": "urn:pearson:entity:3abd09e0-d847-426b-accd-f1f992d22f80"
    }
}

export const props3 = {
    ...props,
    "model": {
        "id": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "type": "figure",
        "figuretype": "audio",
        "subtype": "imageTextWidth",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "titlecontentintitlefield": true,
        "alignment": "text-width",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Fugure with resume numbering"
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
            "width": "680",
            "podwidth": ""
        },
        "html": {
            "title": "<p>Fugure with resume numbering</p>",
            "text": "",
            "postertext": "",
            "captions": "<p></p>",
            "credits": "<p></p>",
            "footnotes": {},
            "assetsPopover": {},
            "glossaryentries": {},
            "indexEntries": {}
        },
        "versionUrn": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "contentUrn": "urn:pearson:entity:9fbb85f1-3992-4252-b50f-35e5674bb174",
        "displayedlabel": "Figure",
        "numberedandlabel": true,
        "manualoverride": {"overridenumbervalue": '100', "overridelabelvalue": 'Audio'},
        "indexPos": "2",
        "parentDetails": [],
        "slateEntityUrn": "urn:pearson:entity:3abd09e0-d847-426b-accd-f1f992d22f80"
    }
}

export const props4 = {
    ...props,
    "model": {
        "id": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "type": "figure",
        "figuretype": "audio",
        "subtype": "imageTextWidth",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "titlecontentintitlefield": true,
        "alignment": "text-width",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Fugure with resume numbering"
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
            "width": "680",
            "podwidth": ""
        },
        "html": {
            "title": "<p>Fugure with resume numbering</p>",
            "text": "",
            "postertext": "",
            "captions": "<p></p>",
            "credits": "<p></p>",
            "footnotes": {},
            "assetsPopover": {},
            "glossaryentries": {},
            "indexEntries": {}
        },
        "versionUrn": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "contentUrn": "urn:pearson:entity:9fbb85f1-3992-4252-b50f-35e5674bb174",
        "displayedlabel": "Figure",
        "numberedandlabel": true,
        "manualoverride": {"overridenumbervalue": '100', "overridelabelvalue": 'Audio'},
        "indexPos": "2",
        "parentDetails": [],
        "slateEntityUrn": "urn:pearson:entity:3abd09e0-d847-426b-accd-f1f992d22f80"
    }
}

export const props5 = {
    ...props,
    "model": {
        "id": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "type": "figure",
        "figuretype": "audio",
        "subtype": "imageTextWidth",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "titlecontentintitlefield": true,
        "alignment": "text-width",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Fugure with resume numbering"
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
            "width": "680",
            "podwidth": ""
        },
        "html": {
            "title": "<p>Fugure with resume numbering</p>",
            "text": "",
            "postertext": "",
            "captions": "<p></p>",
            "credits": "<p></p>",
            "footnotes": {},
            "assetsPopover": {},
            "glossaryentries": {},
            "indexEntries": {}
        },
        "versionUrn": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "contentUrn": "urn:pearson:entity:9fbb85f1-3992-4252-b50f-35e5674bb174",
        "displayedlabel": "Figure",
        "numberedandlabel": true,
        "manualoverride": {"overridenumbervalue": '100'},
        "indexPos": "2",
        "parentDetails": [],
        "slateEntityUrn": "urn:pearson:entity:3abd09e0-d847-426b-accd-f1f992d22f80"
    }
}

export const props6 = {
    ...props,
    "model": {
        "id": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "type": "figure",
        "figuretype": "video",
        "subtype": "imageTextWidth",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "titlecontentintitlefield": true,
        "alignment": "text-width",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Fugure with resume numbering"
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
            "width": "680",
            "podwidth": ""
        },
        "html": {
            "title": "<p>Fugure with resume numbering</p>",
            "text": "",
            "postertext": "",
            "captions": "<p></p>",
            "credits": "<p></p>",
            "footnotes": {},
            "assetsPopover": {},
            "glossaryentries": {},
            "indexEntries": {}
        },
        "versionUrn": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "contentUrn": "urn:pearson:entity:9fbb85f1-3992-4252-b50f-35e5674bb174",
        "displayedlabel": "Figure",
        "numberedandlabel": true,
        "indexPos": "2",
        "parentDetails": [],
        "slateEntityUrn": "urn:pearson:entity:3abd09e0-d847-426b-accd-f1f992d22f80"
    }
}

export const props7 = {
    ...props,
    "model": {
        "id": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "type": "figure",
        "subtype": "imageTextWidth",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "titlecontentintitlefield": true,
        "alignment": "text-width",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Fugure with resume numbering"
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
            "width": "680",
            "podwidth": ""
        },
        "html": {
            "title": "<p>Fugure with resume numbering</p>",
            "text": "",
            "postertext": "",
            "captions": "<p></p>",
            "credits": "<p></p>",
            "footnotes": {},
            "assetsPopover": {},
            "glossaryentries": {},
            "indexEntries": {}
        },
        "versionUrn": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "contentUrn": "urn:pearson:entity:9fbb85f1-3992-4252-b50f-35e5674bb174",
        "displayedlabel": "Figure",
        "numberedandlabel": true,
        "manualoverride": {"overridenumbervalue": '100', "overridelabelvalue": 'updatedAudio'},
        "indexPos": "2",
        "parentDetails": [],
        "slateEntityUrn": "urn:pearson:entity:3abd09e0-d847-426b-accd-f1f992d22f80"
    }
}

export const props8 = {
    ...props,
    "model": {
        "id": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "type": "figure",
        "subtype": "imageTextWidth",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "titlecontentintitlefield": true,
        "alignment": "text-width",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Fugure with resume numbering"
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
            "width": "680",
            "podwidth": ""
        },
        "html": {
            "title": "<p>Fugure with resume numbering</p>",
            "text": "",
            "postertext": "",
            "captions": "<p></p>",
            "credits": "<p></p>",
            "footnotes": {},
            "assetsPopover": {},
            "glossaryentries": {},
            "indexEntries": {}
        },
        "versionUrn": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "contentUrn": "urn:pearson:entity:9fbb85f1-3992-4252-b50f-35e5674bb174",
        "displayedlabel": "Figure",
        "numberedandlabel": true,
        "manualoverride": {"overridenumbervalue": '100', "overridelabelvalue": 'updatedAudio'},
        "indexPos": "2",
        "parentDetails": [],
        "slateEntityUrn": "urn:pearson:entity:3abd09e0-d847-426b-accd-f1f992d22f80"
    }
}

export const props9 = {
    ...props,
    "model": {
        "id": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "type": "figure",
        "figuretype": "video",
        "subtype": "imageTextWidth",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "titlecontentintitlefield": true,
        "alignment": "text-width",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Fugure with resume numbering"
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
            "width": "680",
            "podwidth": ""
        },
        "html": {
            "title": "<p>Fugure with resume numbering</p>",
            "text": "",
            "postertext": "",
            "captions": "<p></p>",
            "credits": "<p></p>",
            "footnotes": {},
            "assetsPopover": {},
            "glossaryentries": {},
            "indexEntries": {}
        },
        "versionUrn": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "contentUrn": "urn:pearson:entity:9fbb85f1-3992-4252-b50f-35e5674bb174",
        "numberedandlabel": true,
        "indexPos": "2",
        "parentDetails": [],
        "slateEntityUrn": "urn:pearson:entity:3abd09e0-d847-426b-accd-f1f992d22f80"
    }
}

export const props10 = {
    ...props,
    "model": {
        "id": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "type": "figure",
        "figuretype": "interactive",
        "subtype": "imageTextWidth",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "titlecontentintitlefield": true,
        "alignment": "text-width",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Fugure with resume numbering"
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
            "width": "680",
            "podwidth": ""
        },
        "html": {
            "title": "<p>Fugure with resume numbering</p>",
            "text": "",
            "postertext": "",
            "captions": "<p></p>",
            "credits": "<p></p>",
            "footnotes": {},
            "assetsPopover": {},
            "glossaryentries": {},
            "indexEntries": {}
        },
        "versionUrn": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "contentUrn": "urn:pearson:entity:9fbb85f1-3992-4252-b50f-35e5674bb174",
        "displayedlabel": "Figure",
        "numberedandlabel": true,
        "indexPos": "2",
        "parentDetails": [],
        "slateEntityUrn": "urn:pearson:entity:3abd09e0-d847-426b-accd-f1f992d22f80"
    }
}

export const props11 = {
    ...props,
    "model": {
        "id": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "type": "figure",
        "figuretype": "tableasmarkup",
        "subtype": "imageTextWidth",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "titlecontentintitlefield": true,
        "alignment": "text-width",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Fugure with resume numbering"
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
            "width": "680",
            "podwidth": ""
        },
        "html": {
            "title": "<p>Fugure with resume numbering</p>",
            "text": "",
            "postertext": "",
            "captions": "<p></p>",
            "credits": "<p></p>",
            "footnotes": {},
            "assetsPopover": {},
            "glossaryentries": {},
            "indexEntries": {}
        },
        "versionUrn": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "contentUrn": "urn:pearson:entity:9fbb85f1-3992-4252-b50f-35e5674bb174",
        "displayedlabel": "Figure",
        "numberedandlabel": true,
        "indexPos": "2",
        "parentDetails": [],
        "slateEntityUrn": "urn:pearson:entity:3abd09e0-d847-426b-accd-f1f992d22f80"
    }
}

export const props12 = {
    ...props,
    "model": {
        "id": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "type": "figure",
        "figuretype": "authoredtext",
        "subtype": "imageTextWidth",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "titlecontentintitlefield": true,
        "alignment": "text-width",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Fugure with resume numbering"
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
            "width": "680",
            "podwidth": ""
        },
        "html": {
            "title": "<p>Fugure with resume numbering</p>",
            "text": "",
            "postertext": "",
            "captions": "<p></p>",
            "credits": "<p></p>",
            "footnotes": {},
            "assetsPopover": {},
            "glossaryentries": {},
            "indexEntries": {}
        },
        "versionUrn": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "contentUrn": "urn:pearson:entity:9fbb85f1-3992-4252-b50f-35e5674bb174",
        "displayedlabel": "Figure",
        "numberedandlabel": true,
        "indexPos": "2",
        "parentDetails": [],
        "slateEntityUrn": "urn:pearson:entity:3abd09e0-d847-426b-accd-f1f992d22f80"
    }
}

export const props13 = {
    ...props,
    "model": {
        "id": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "type": "figure",
        "figuretype": "codelisting",
        "subtype": "imageTextWidth",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "titlecontentintitlefield": true,
        "alignment": "text-width",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Fugure with resume numbering"
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
            "width": "680",
            "podwidth": ""
        },
        "html": {
            "title": "<p>Fugure with resume numbering</p>",
            "text": "",
            "postertext": "",
            "captions": "<p></p>",
            "credits": "<p></p>",
            "footnotes": {},
            "assetsPopover": {},
            "glossaryentries": {},
            "indexEntries": {}
        },
        "versionUrn": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "contentUrn": "urn:pearson:entity:9fbb85f1-3992-4252-b50f-35e5674bb174",
        "displayedlabel": "Figure",
        "numberedandlabel": true,
        "indexPos": "2",
        "parentDetails": [],
        "slateEntityUrn": "urn:pearson:entity:3abd09e0-d847-426b-accd-f1f992d22f80"
    }
}

export const props14 = {
    ...props,
    "model": {
        "id": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "type": "figure",
        "figuretype": "audio",
        "subtype": "imageTextWidth",
        "figureDropdownData" : {
            "id": "urn:pearson:entity:88538afc-3158-4a10-9c31-83bb7aad19be",
            "audio": [
                "Audio"
            ],
            "audioCustom": [
                "Audio123"
            ],
        },
        "displayedlabel": "Figure",
        "numberedandlabel": true,
        "manualoverride": {"overridenumbervalue": '100', "overridelabelvalue": 'Audio'},
        "indexPos": "2",
        "parentDetails": [],
        "slateEntityUrn": "urn:pearson:entity:3abd09e0-d847-426b-accd-f1f992d22f80"
    }
}

export const props15 = {
    props,
    "model": {
        "id": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "type": "figure",
        "figuretype": "audio",
        "subtype": "imageTextWidth",
        "displayedlabel": "Figure",
        "numberedandlabel": true,
        "manualoverride": {"overridenumbervalue": '100'},
        "indexPos": "2",
        "parentDetails": [],
        "slateEntityUrn": "urn:pearson:entity:3abd09e0-d847-426b-accd-f1f992d22f80"
    },
    "index": 2,
    "elementId": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
    "slateLockInfo": {
        "isLocked": false,
        "userId": ""
    },
    "figureDropdownData": {
        "id": "urn:pearson:entity:88538afc-3158-4a10-9c31-83bb7aad19be",
        "audio": [
            "Audio"
        ],
        "audioCustom": [
            "Audio123"
        ],
    },
    "isAutoNumberingEnabled": false,
    "selectedElement": "cypress-keyboard-1",
    "figureHtmlData": {
        "formattedLabel": "<p class=\"paragraphNumeroUno\"><br/></p>",
        "formattedNumber": "<p class=\"paragraphNumeroUno\"><br/></p>",
        "formattedTitle": "<p class=\"paragraphNumeroUno\">Fugure with resume numbering</p>"
    },
    "figLabelClass": "heading4ImageTextWidthNumberLabel",
    "figTitleClass": "heading4ImageTextWidthTitle",
    "autoNumberOption": {
        "entityUrn": "urn:pearson:entity:fe82b9bd-cfed-43aa-b2a9-20ea01bee381",
        "option": "Default Auto-number"
    },
    
}
 
export const props16 = {
    props,
    "model": {
        "id": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "type": "figure",
        "figuretype": "image",
        "subtype": "imageTextWidth",
        "displayedlabel": "Figure",
        "numberedandlabel": true,
        "manualoverride": {"overridenumbervalue": '100'},
        "indexPos": "2",
        "parentDetails": [],
        "slateEntityUrn": "urn:pearson:entity:3abd09e0-d847-426b-accd-f1f992d22f80"
    },
    "index": 2,
    "elementId": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
    "slateLockInfo": {
        "isLocked": false,
        "userId": ""
    },
    "figureDropdownData": {
        "id": "urn:pearson:entity:88538afc-3158-4a10-9c31-83bb7aad19be",
        "video": [
            "Video"
        ],
        "videoCustom": [
            "Video123"
        ],
    },
    "isAutoNumberingEnabled": false,
    "selectedElement": "cypress-keyboard-1",
    "figureHtmlData": {
        "formattedLabel": "<p class=\"paragraphNumeroUno\"><br/></p>",
        "formattedNumber": "<p class=\"paragraphNumeroUno\"><br/></p>",
        "formattedTitle": "<p class=\"paragraphNumeroUno\">Fugure with resume numbering</p>"
    },
    "figLabelClass": "heading4ImageTextWidthNumberLabel",
    "figTitleClass": "heading4ImageTextWidthTitle",
    "autoNumberOption": {
        "entityUrn": "urn:pearson:entity:fe82b9bd-cfed-43aa-b2a9-20ea01bee381",
        "option": "Default Auto-number"
    },
}

export const props17 = {
    props,
    "model": {
        "id": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "type": "figure",
        "figuretype": "video",
        "subtype": "imageTextWidth",
        "displayedlabel": "Figure",
        "numberedandlabel": true,
        "manualoverride": {"overridenumbervalue": '100'},
        "indexPos": "2",
        "parentDetails": [],
        "slateEntityUrn": "urn:pearson:entity:3abd09e0-d847-426b-accd-f1f992d22f80"
    },
    "index": 2,
    "elementId": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
    "slateLockInfo": {
        "isLocked": false,
        "userId": ""
    },
    "figureDropdownData": {
        "id": "urn:pearson:entity:88538afc-3158-4a10-9c31-83bb7aad19be",
        "video": [
            "Video"
        ],
        "videoCustom": [
            "Video123"
        ],
    },
    "isAutoNumberingEnabled": false,
    "selectedElement": "cypress-keyboard-1",
    "figureHtmlData": {
        "formattedLabel": "<p class=\"paragraphNumeroUno\"><br/></p>",
        "formattedNumber": "<p class=\"paragraphNumeroUno\"><br/></p>",
        "formattedTitle": "<p class=\"paragraphNumeroUno\">Fugure with resume numbering</p>"
    },
    "figLabelClass": "heading4ImageTextWidthNumberLabel",
    "figTitleClass": "heading4ImageTextWidthTitle",
    "autoNumberOption": {
        "entityUrn": "urn:pearson:entity:fe82b9bd-cfed-43aa-b2a9-20ea01bee381",
        "option": "Default Auto-number"
    },
}

export const props18 = {
    props,
    "model": {
        "id": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "type": "figure",
        "figuretype": "interactive",
        "subtype": "imageTextWidth",
        "displayedlabel": "Figure",
        "numberedandlabel": true,
        "manualoverride": {"overridenumbervalue": '100'},
        "indexPos": "2",
        "parentDetails": [],
        "slateEntityUrn": "urn:pearson:entity:3abd09e0-d847-426b-accd-f1f992d22f80"
    },
    "index": 2,
    "elementId": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
    "slateLockInfo": {
        "isLocked": false,
        "userId": ""
    },
    "figureDropdownData": {
        "id": "urn:pearson:entity:88538afc-3158-4a10-9c31-83bb7aad19be",
        "interactive": [
            "Interactive"
        ],
        "interactiveCustom": [
            "interactive123"
        ],
    },
    "isAutoNumberingEnabled": false,
    "selectedElement": "cypress-keyboard-1",
    "figureHtmlData": {
        "formattedLabel": "<p class=\"paragraphNumeroUno\"><br/></p>",
        "formattedNumber": "<p class=\"paragraphNumeroUno\"><br/></p>",
        "formattedTitle": "<p class=\"paragraphNumeroUno\">Fugure with resume numbering</p>"
    },
    "figLabelClass": "heading4ImageTextWidthNumberLabel",
    "figTitleClass": "heading4ImageTextWidthTitle",
    "autoNumberOption": {
        "entityUrn": "urn:pearson:entity:fe82b9bd-cfed-43aa-b2a9-20ea01bee381",
        "option": "Default Auto-number"
    },
    
}

export const props19 = {
    props,
    "model": {
        "id": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "type": "figure",
        "figuretype": "tableasmarkup",
        "subtype": "imageTextWidth",
        "displayedlabel": "Figure",
        "numberedandlabel": true,
        "manualoverride": {"overridenumbervalue": '100'},
        "indexPos": "2",
        "parentDetails": [],
        "slateEntityUrn": "urn:pearson:entity:3abd09e0-d847-426b-accd-f1f992d22f80"
    },
    "index": 2,
    "elementId": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
    "slateLockInfo": {
        "isLocked": false,
        "userId": ""
    },
    "figureDropdownData": {
        "id": "urn:pearson:entity:88538afc-3158-4a10-9c31-83bb7aad19be",
        "tableasmarkup": [
            "Table"
        ],
        "tableasmarkupCustom": [
            "tableasmarkup123"
        ],
    },
    "isAutoNumberingEnabled": false,
    "selectedElement": "cypress-keyboard-1",
    "figureHtmlData": {
        "formattedLabel": "<p class=\"paragraphNumeroUno\"><br/></p>",
        "formattedNumber": "<p class=\"paragraphNumeroUno\"><br/></p>",
        "formattedTitle": "<p class=\"paragraphNumeroUno\">Fugure with resume numbering</p>"
    },
    "figLabelClass": "heading4ImageTextWidthNumberLabel",
    "figTitleClass": "heading4ImageTextWidthTitle",
    "autoNumberOption": {
        "entityUrn": "urn:pearson:entity:fe82b9bd-cfed-43aa-b2a9-20ea01bee381",
        "option": "Default Auto-number"
    },
    
}

export const props20 = {
    props,
    "model": {
        "id": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "type": "figure",
        "figuretype": "authoredtext",
        "subtype": "imageTextWidth",
        "displayedlabel": "Figure",
        "numberedandlabel": true,
        "manualoverride": {"overridenumbervalue": '100'},
        "indexPos": "2",
    },
    "index": 2,
    "elementId": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
    "slateLockInfo": {
        "isLocked": false,
        "userId": ""
    },
    "figureDropdownData": {
        "id": "urn:pearson:entity:88538afc-3158-4a10-9c31-83bb7aad19be",
        "mathml": [
            "Equation"
        ],
        "mathmlCustom": [
            "mathmlCustom123"
        ],
    },
    "isAutoNumberingEnabled": false,
    "selectedElement": "cypress-keyboard-1",
    "figureHtmlData": {
        "formattedLabel": "<p class=\"paragraphNumeroUno\"><br/></p>",
        "formattedNumber": "<p class=\"paragraphNumeroUno\"><br/></p>",
        "formattedTitle": "<p class=\"paragraphNumeroUno\">Fugure with resume numbering</p>"
    },
    "figLabelClass": "heading4ImageTextWidthNumberLabel",
    "figTitleClass": "heading4ImageTextWidthTitle",
    "autoNumberOption": {
        "entityUrn": "urn:pearson:entity:fe82b9bd-cfed-43aa-b2a9-20ea01bee381",
        "option": "Default Auto-number"
    },
    
}

export const props21 = {
    props,
    "model": {
        "id": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "type": "figure",
        "figuretype": "codelisting",
        "subtype": "imageTextWidth",
        "displayedlabel": "Figure",
        "numberedandlabel": true,
        "manualoverride": {"overridenumbervalue": '100'},
        "indexPos": "2",
    },
    "index": 2,
    "elementId": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
    "slateLockInfo": {
        "isLocked": false,
        "userId": ""
    },
    "figureDropdownData": {
        "id": "urn:pearson:entity:88538afc-3158-4a10-9c31-83bb7aad19be",
        "preformattedtextCustom": [
            "preformattedtextCustom123"
        ],
        "preformattedtext": [
            "Exhibit"
        ],
    },
    "isAutoNumberingEnabled": false,
    "selectedElement": "cypress-keyboard-1",
    "figureHtmlData": {
        "formattedLabel": "<p class=\"paragraphNumeroUno\"><br/></p>",
        "formattedNumber": "<p class=\"paragraphNumeroUno\"><br/></p>",
        "formattedTitle": "<p class=\"paragraphNumeroUno\">Fugure with resume numbering</p>"
    },
    "figLabelClass": "heading4ImageTextWidthNumberLabel",
    "figTitleClass": "heading4ImageTextWidthTitle",
    "autoNumberOption": {
        "entityUrn": "urn:pearson:entity:fe82b9bd-cfed-43aa-b2a9-20ea01bee381",
        "option": "Default Auto-number"
    },
}





