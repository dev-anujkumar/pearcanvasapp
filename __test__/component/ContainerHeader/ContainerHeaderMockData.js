export const initialState = {
    config: {
        figureFieldsPlaceholders: ['Number', 'Label', 'Label Name', 'Title', 'Caption', 'Credit', 'Math Block Content', 'Code Block Content']
    },
    toolbarReducer:{
        elemBorderToggle: true,
        pageNumberToggle: false,
        spellCheckToggle: true,
    },
    alfrescoReducer: {
        alfrescoAssetData: {},
        elementId: "urn",
        alfrescoListOption: [],
        launchAlfrescoPopup: true,
        editor: true,
        Permission: false
    },
    autoNumberReducer:{ 
        autoNumberOption: {
            "entityUrn": "urn:pearson:entity:2d0bdd35-c2df-4671-84de-21d1bcb5c0ec",
            "option": "Resume numbering with"
        },
        autoNumberElementsIndex: {
            "figureImageIndex": {
                "urn:pearson:entity:eedc9f81-c954-44ec-93f4-16119a610b56": {
                    "urn:pearson:entity:9fbb85f1-3992-4252-b50f-35e5674bb174": 1
                }
            },
            "tableIndex": {},
            "equationIndex": {},
            "audioIndex": {},
            "videoIndex": {},
            "asideIndex": {
                "urn:pearson:entity:eedc9f81-c954-44ec-93f4-16119a610b56": {
                    "urn:pearson:entity:2d0bdd35-c2df-4671-84de-21d1bcb5c0ec": 100
                }
            },
            "workedExampleIndex": {},
            "interactiveIndex": {},
            "exhibitIndex": {}
        },
        autoNumberingDetails: {
            "chapterOrderList": {
                "urn:pearson:entity:eedc9f81-c954-44ec-93f4-16119a610b56": 1,
                "urn:pearson:entity:36841092-3d83-4a48-85e0-2355d5a79bc8": 2,
                "urn:pearson:entity:1697e883-d08d-4a96-8696-720f24d5353f": 3
            },
            "partOrderList": {
                "urn:pearson:entity:823fe472-6164-4cc8-8499-4cfc07382778": 1,
                "urn:pearson:entity:7370ced9-5c84-4eae-96a0-362f42b1b331": 2
            }
        }
    },
    appStore: {
        currentSlateAncestorData: {
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
        activeElement: {
            "elementType": "element-aside",
            "primaryOption": "primary-aside-aside",
            "secondaryOption": "secondary-aside-sb1",
            "asideNumber": true,
            "elementId": "urn:pearson:manifest:ab62afe8-945b-426f-bbab-c50e85ede064",
            "index": 3,
            "elementWipType": "element-aside",
            "toolbar": [
                "insertMedia",
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "clearformatting",
                "increaseindent",
                "decreaseindent",
                "footnote",
                "glossary",
                "orderedlist",
                "unorderedlist",
                "mathml",
                "chemml",
                "inlinecode",
                "superscript",
                "subscript",
                "specialcharactor",
                "undo",
                "redo",
                "crossLinkingIcon",
                "assetpopover",
                "slatetag",
                "alignment",
                "calloutIcon",
                "IndexEntry"
            ],
            "tag": "As"
        },
    }
};

export const initialState2 = {
    config: {
        figureFieldsPlaceholders: ['Number', 'Label', 'Label Name', 'Title', 'Caption', 'Credit', 'Math Block Content', 'Code Block Content']
    },
    toolbarReducer:{
        elemBorderToggle: true,
        pageNumberToggle: false,
        spellCheckToggle: true,
    },
    alfrescoReducer: {
        alfrescoAssetData: {},
        elementId: "urn",
        alfrescoListOption: [],
        launchAlfrescoPopup: true,
        editor: true,
        Permission: false
    },
    autoNumberReducer:{ 
        autoNumberOption: {
            "entityUrn": "urn:pearson:entity:2d0bdd35-c2df-4671-84de-21d1bcb5c0ec",
            "option": "Override label & number"
        },
        autoNumberElementsIndex: {
            "figureImageIndex": {
                "urn:pearson:entity:eedc9f81-c954-44ec-93f4-16119a610b56": {
                    "urn:pearson:entity:9fbb85f1-3992-4252-b50f-35e5674bb174": 1
                }
            },
            "tableIndex": {},
            "equationIndex": {},
            "audioIndex": {},
            "videoIndex": {},
            "asideIndex": {
                "urn:pearson:entity:eedc9f81-c954-44ec-93f4-16119a610b56": {
                    "urn:pearson:entity:2d0bdd35-c2df-4671-84de-21d1bcb5c0ec": 100
                }
            },
            "workedExampleIndex": {},
            "interactiveIndex": {},
            "exhibitIndex": {}
        },
        autoNumberingDetails: {
            "chapterOrderList": {
                "urn:pearson:entity:eedc9f81-c954-44ec-93f4-16119a610b56": 1,
                "urn:pearson:entity:36841092-3d83-4a48-85e0-2355d5a79bc8": 2,
                "urn:pearson:entity:1697e883-d08d-4a96-8696-720f24d5353f": 3
            },
            "partOrderList": {
                "urn:pearson:entity:823fe472-6164-4cc8-8499-4cfc07382778": 1,
                "urn:pearson:entity:7370ced9-5c84-4eae-96a0-362f42b1b331": 2
            }
        }
    },
    appStore: {
        currentSlateAncestorData: {
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
        activeElement: {
            "elementType": "element-aside",
            "primaryOption": "primary-aside-aside",
            "secondaryOption": "secondary-aside-sb1",
            "asideNumber": true,
            "elementId": "urn:pearson:manifest:ab62afe8-945b-426f-bbab-c50e85ede064",
            "index": 3,
            "elementWipType": "element-aside",
            "toolbar": [
                "insertMedia",
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "clearformatting",
                "increaseindent",
                "decreaseindent",
                "footnote",
                "glossary",
                "orderedlist",
                "unorderedlist",
                "mathml",
                "chemml",
                "inlinecode",
                "superscript",
                "subscript",
                "specialcharactor",
                "undo",
                "redo",
                "crossLinkingIcon",
                "assetpopover",
                "slatetag",
                "alignment",
                "calloutIcon",
                "IndexEntry"
            ],
            "tag": "As"
        },
    }
};

export const initialState3 = {
    config: {
        figureFieldsPlaceholders: ['Number', 'Label', 'Label Name', 'Title', 'Caption', 'Credit', 'Math Block Content', 'Code Block Content']
    },
    toolbarReducer:{
        elemBorderToggle: true,
        pageNumberToggle: false,
        spellCheckToggle: true,
    },
    alfrescoReducer: {
        alfrescoAssetData: {},
        elementId: "urn",
        alfrescoListOption: [],
        launchAlfrescoPopup: true,
        editor: true,
        Permission: false
    },
    autoNumberReducer:{ 
        autoNumberOption: {
            "entityUrn": "urn:pearson:entity:2d0bdd35-c2df-4671-84de-21d1bcb5c0ec",
            "option": "Resume numbering with"
        },
        autoNumberElementsIndex: undefined,
        autoNumberingDetails: {
            "chapterOrderList": {
                "urn:pearson:entity:eedc9f81-c954-44ec-93f4-16119a610b56": 1,
                "urn:pearson:entity:36841092-3d83-4a48-85e0-2355d5a79bc8": 2,
                "urn:pearson:entity:1697e883-d08d-4a96-8696-720f24d5353f": 3
            },
            "partOrderList": {
                "urn:pearson:entity:823fe472-6164-4cc8-8499-4cfc07382778": 1,
                "urn:pearson:entity:7370ced9-5c84-4eae-96a0-362f42b1b331": 2
            }
        }
    },
    appStore: {
        currentSlateAncestorData: undefined,
        activeElement: {
            "elementType": "element-aside",
            "primaryOption": "primary-aside-aside",
            "secondaryOption": "secondary-aside-sb1",
            "asideNumber": true,
            "elementId": "urn:pearson:manifest:ab62afe8-945b-426f-bbab-c50e85ede064",
            "index": 3,
            "elementWipType": "element-aside",
            "toolbar": [
                "insertMedia",
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "clearformatting",
                "increaseindent",
                "decreaseindent",
                "footnote",
                "glossary",
                "orderedlist",
                "unorderedlist",
                "mathml",
                "chemml",
                "inlinecode",
                "superscript",
                "subscript",
                "specialcharactor",
                "undo",
                "redo",
                "crossLinkingIcon",
                "assetpopover",
                "slatetag",
                "alignment",
                "calloutIcon",
                "IndexEntry"
            ],
            "tag": "As"
        },
    }
};

export const props = {
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
    "btnClassName": "activeTagBgColor",
    "borderToggle": "active",
    "elemBorderToggle": true,
    "index": 3,
    "element": {
        "id": "urn:pearson:manifest:ab62afe8-945b-426f-bbab-c50e85ede064",
        "type": "element-aside",
        "subtype": "sidebar",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "designtype": "asideSidebar01",
        "elementdata": {
            "bodymatter": [
                {
                    "id": "urn:pearson:work:52ac3f82-ecae-42e6-b8f7-d4dac7bea2d7",
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
                    "versionUrn": "urn:pearson:work:52ac3f82-ecae-42e6-b8f7-d4dac7bea2d7",
                    "contentUrn": "urn:pearson:entity:48afe62b-c8be-4f59-a44c-2d825e76ecba",
                    "parentDetails": [
                        "urn:pearson:entity:2d0bdd35-c2df-4671-84de-21d1bcb5c0ec"
                    ]
                }
            ],
            "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
            "title": {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": "Aside Element with resume updated with number 100"
            }
        },
        "html": {
            "title": "<p>Aside Element with resume updated with number 100</p>"
        },
        "versionUrn": "urn:pearson:manifest:ab62afe8-945b-426f-bbab-c50e85ede064",
        "contentUrn": "urn:pearson:entity:2d0bdd35-c2df-4671-84de-21d1bcb5c0ec",
        "status": "wip",
        "numberedandlabel": true,
        "indexPos": "3",
        "displayedlabel": "Aside",
        "manualoverride": {
            "resumenumbervalue": 100
        },
        "parentDetails": [],
        "slateEntityUrn": "urn:pearson:entity:3abd09e0-d847-426b-accd-f1f992d22f80"
    },
    "elementId": "urn:pearson:manifest:ab62afe8-945b-426f-bbab-c50e85ede064",
    "type": "element-aside",
    "slateLockInfo": {
        "isLocked": false,
        "userId": ""
    },
    "isBlockerActive": false,
    "glossaryFootnoteValue": {
        "popUpStatus": false
    },
    "userRole": "admin",
    "markedIndexValue": {
        "type": "Markedindex",
        "popUpStatus": false,
        "markIndexid": ""
    },
    "searchUrn": "",
    "asideTitleData": [
        {
            "isAsideNumber": true,
            "elementId": "urn:pearson:manifest:ab62afe8-945b-426f-bbab-c50e85ede064"
        }
    ],
    "isAutoNumberingEnabled": true,
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
    "model": {
        "id": "urn:pearson:work:1b799167-c369-4560-834a-4cbc95c6206d",
        "type": "figure",
        "figuretype": "image",
        "subtype": "imageTextWidth",
        "displayedlabel": "Figure",
        "numberedandlabel": true,
        "slateEntityUrn": "urn:pearson:entity:3abd09e0-d847-426b-accd-f1f992d22f80"
    },
}

export const props1 = {
    ...props,
    "model": {
        "id": "urn:pearson:manifest:ab62afe8-945b-426f-bbab-c50e85ede064",
        "type": "element-aside",
        "subtype": "sidebar",
        "displayedlabel": "Aside",
        "numberedandlabel": true,
        "manualoverride": {
            "resumenumbervalue": 100
        },
        "indexPos": [
            "3"
        ]
    }
}

export const props2 = {
    ...props,
    "model": {
        "id": "urn:pearson:manifest:ab62afe8-945b-426f-bbab-c50e85ede064",
        "type": "element-aside",
        "subtype": "sidebar",
        "numberedandlabel": true,
        "manualoverride": {
            "overridelabelvalue": "Aside1",
            "overridenumbervalue": "1000"
        },
        "indexPos": [
            "3"
        ]
    }
}

export const props3 = {
    ...props,
    "model": {
        "id": "urn:pearson:manifest:ab62afe8-945b-426f-bbab-c50e85ede064",
        "type": "element-aside",
        "subtype": "sidebar",
        "numberedandlabel": false,
        "indexPos": [
            "3"
        ]
    }
}

export const props4 = {
    ...props,
    "model": {
        "id": "urn:pearson:manifest:ab62afe8-945b-426f-bbab-c50e85ede064",
        "type": "element-aside",
        "subtype": "sidebar",
        "numberedandlabel": false,
        "indexPos": [
            "3"
        ]
    }
}
export const props5 = {
    ...props,
    "model": {
        "id": "urn:pearson:manifest:ab62afe8-945b-426f-bbab-c50e85ede064",
        "type": "element-aside",
        "subtype": "sidebar",
        "numberedandlabel": true,
        "manualoverride": {
            "resumenumbervalue": 100
        },
        "indexPos": [
            "3"
        ]
    }
}

export const props6 = {
    ...props,
    "index": 4,
    "element": {
        "id": "urn:pearson:manifest:3c0416f9-f707-4c4c-bbb3-7d8a172644cc",
        "type": "element-aside",
        "subtype": "workedexample",
        "displayedlabel": "Worked Example",
        "numberedandlabel": true,
    },
    "elementId": "urn:pearson:manifest:3c0416f9-f707-4c4c-bbb3-7d8a172644cc",
    "type": "element-aside",
    "userRole": "admin",
    "isAutoNumberingEnabled": true,
    "figureDropdownData": {
        "id": "urn:pearson:entity:88538afc-3158-4a10-9c31-83bb7aad19be",
        "workedexample": [
            "Worked Example"
        ],
    },
    "model": {
        "id": "urn:pearson:manifest:3c0416f9-f707-4c4c-bbb3-7d8a172644cc",
        "type": "element-aside",
        "subtype": "workedexample",
        "displayedlabel": "Worked Example",
        "numberedandlabel": true,
        "indexPos": [
            "4",
            "1"
        ]
    },
}

export const props7 = {
    ...props,
    "isAutoNumberingEnabled": false,
    "figureDropdownData": {
        "id": "urn:pearson:entity:88538afc-3158-4a10-9c31-83bb7aad19be",
        "aside": [
            "Aside"
        ],
        "asideCustom": [
            "Aside123"
        ],
    },
    "model": {
        "id": "urn:pearson:manifest:ab62afe8-945b-426f-bbab-c50e85ede064",
        "type": "element-aside",
        "subtype": "sidebar",
        "numberedandlabel": true,
        "manualoverride": {
            "overridelabelvalue": "Aside1",
            "overridenumbervalue": "1000"
        },
        "indexPos": [
            "3"
        ]
    }
}

export const props8 = {
    ...props,
    "isAutoNumberingEnabled": false,
    "figureDropdownData": {
        "id": "urn:pearson:entity:88538afc-3158-4a10-9c31-83bb7aad19be",
        "workedexample": [
            "Workedexample"
        ],
        "workedexampleCustom": [
            "workedexampleCustom123"
        ],
    },
    "model": {
        "id": "urn:pearson:manifest:ab62afe8-945b-426f-bbab-c50e85ede064",
        "type": "element-aside",
        "subtype": "sidebar",
        "numberedandlabel": true,
        "manualoverride": {
            "overridelabelvalue": "Aside1",
            "overridenumbervalue": "1000"
        },
        "indexPos": [
            "3"
        ]
    }
}

export const props9 = {
    ...props,
    model: undefined
}