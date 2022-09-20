import * as Element_Constants from '../../../src/constants/Element_Constants';

describe('Testing Element_Constans',()=>{
    describe('Test getPasteValidated',()=>{
        it('render getPasteValidated',()=>{
            let props={
                "index": "1-0-0",
                "asideData": {
                    "id": "urn:pearson:manifest:fca21e2a-0711-4a68-a67c-027f8dc13153",
                    "type": "showhide",
                    "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                    "versionUrn": "urn:pearson:manifest:fca21e2a-0711-4a68-a67c-027f8dc13153",
                    "contentUrn": "urn:pearson:entity:90d88956-98cb-4d68-b6cd-24fc903d9e2a",
                    "status": "wip",
                    "interactivedata": {
                        "postertextobject": [{
                            "id": "urn:pearson:work:b7e28708-0b0b-425e-9e5b-77ae62c21e34",
                            "type": "element-authoredtext",
                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                            "elementdata": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "Reveal Answer:"
                            },
                            "html": {
                                "text": "<p class=\"paragraphNumeroUno\">Reveal Answer:</p>",
                                "footnotes": {},
                                "assetsPopover": {},
                                "glossaryentries": {},
                                "indexEntries": {}
                            },
                            "versionUrn": "urn:pearson:work:b7e28708-0b0b-425e-9e5b-77ae62c21e34",
                            "contentUrn": "urn:pearson:entity:ee53c98b-0911-4e65-ab15-f140ac8df282"
                        }],
                        "show": [{
                            "id": "urn:pearson:work:b854165a-302f-4abe-9d98-5b87d2f8fba1",
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
                            "versionUrn": "urn:pearson:work:b854165a-302f-4abe-9d98-5b87d2f8fba1",
                            "contentUrn": "urn:pearson:entity:d320be17-9798-4c3d-bff6-521e2caf60e8"
                        }],
                        "hide": [{
                            "id": "urn:pearson:work:16d66f1d-4698-49b1-aa5d-a3d8465351c5",
                            "type": "element-authoredtext",
                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                            "elementdata": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": ""
                            },
                        }]
                    },
                    "sectionType": "show"
                },
                "elementType": "showhide",
                "source": "SHOWHIDE",
                "elementSelection": {
                    "element": {
                        "id": "urn:pearson:manifest:a4bdbaca-5e8b-429e-ba26-3d820539edba",
                        "type": "element-aside",
                        "subtype": "workedexample",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "designtype": "workedexample1",
                        "elementdata": {
                            "bodymatter": [{
                                "id": "urn:pearson:work:da1d3a02-a4f0-4829-86f9-0f55489f3c35",
                                "type": "element-authoredtext",
                                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                "elementdata": {
                                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text": "",
                                    "headers": [{
                                        "level": 4
                                    }]
                                },
                            }, {
                                "id": "urn:pearson:manifest:25454e04-beb6-475f-9f0c-5394a337c626",
                                "type": "showhide",
                                "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                                "versionUrn": "urn:pearson:manifest:25454e04-beb6-475f-9f0c-5394a337c626",
                                "contentUrn": "urn:pearson:entity:772972b3-64e2-4ab2-b458-7b5780019f43",
                                "status": "wip",
                                "interactivedata": {
                                    "postertextobject": [{
                                        "id": "urn:pearson:work:eee04490-7759-4d72-ad5a-b12956d4c265",
                                        "type": "element-authoredtext",
                                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                        "elementdata": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text": "Reveal Answer:"
                                        },
                                    }],
                                    "show": [{
                                        "id": "urn:pearson:work:0e50f820-4f24-47a1-9762-b931c7545e55",
                                        "type": "element-authoredtext",
                                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                        "elementdata": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text": ""
                                        }
                                    }],
                                    "hide": [{
                                        "id": "urn:pearson:work:69ac96fd-aa03-4518-b322-f41d614643ef",
                                        "type": "element-authoredtext",
                                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                        "elementdata": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text": ""
                                        }
                                    }]
                                }
                            }],
                        }
                    },
                    "operationType": "copy"
                },
                "sectionType": "show"
            }
            let sourceType="SHOW_HIDE",
                selectionType="WORKED_EXAMPLE",
                spyFunction = jest.spyOn(Element_Constants, 'getPasteValidated');
                Element_Constants.getPasteValidated(props, sourceType, selectionType);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('getPasteValidation for SH in  multiCloumn',()=>{
            let props={
                "index": 0,
                "elementType": "group",
                "sectionBreak": false,
                "permissions": ["login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects", "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar", "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying", "note_search_comment", "lo_edit_metadata", "preflight_access", "learnosity_access"],
                "asideData": {
                    "type": "groupedcontent",
                    "id": "urn:pearson:manifest:8a73d595-131a-4cba-b0ea-db2a343e62fc",
                    "contentUrn": "urn:pearson:entity:a4181fe0-b3db-428b-8cf6-635a60950229",
                    "element": {
                        "id": "urn:pearson:manifest:8a73d595-131a-4cba-b0ea-db2a343e62fc",
                        "type": "groupedcontent",
                        "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                        "width": "wider",
                        "groupproportions": "60-40",
                        "versionUrn": "urn:pearson:manifest:8a73d595-131a-4cba-b0ea-db2a343e62fc",
                        "contentUrn": "urn:pearson:entity:a4181fe0-b3db-428b-8cf6-635a60950229",
                        "groupeddata": {
                            "bodymatter": [{
                                "id": "urn:pearson:manifest:4441766b-6bc9-4ebf-b98f-0a78c9a5ceeb",
                                "type": "group",
                                "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                                "versionUrn": "urn:pearson:manifest:4441766b-6bc9-4ebf-b98f-0a78c9a5ceeb",
                                "contentUrn": "urn:pearson:entity:b63d6084-0be4-4404-bca8-c7e967675711",
                                "groupdata": {
                                    "bodymatter": [{
                                        "id": "urn:pearson:work:57858ff7-88d4-4bf1-8036-b160b058017b",
                                        "type": "element-authoredtext",
                                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                        "elementdata": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text": ""
                                        },
                                        "html": {
                                            "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                                        },
                                        "versionUrn": "urn:pearson:work:57858ff7-88d4-4bf1-8036-b160b058017b",
                                        "contentUrn": "urn:pearson:entity:552ce68b-edd0-44ed-9080-1e6437407aad",
                                        "status": "wip"
                                    }]
                                }
                            }, {
                                "id": "urn:pearson:manifest:11b0d96a-6b7c-42c8-9e8e-14a193d24e8f",
                                "type": "group",
                                "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                                "versionUrn": "urn:pearson:manifest:11b0d96a-6b7c-42c8-9e8e-14a193d24e8f",
                                "contentUrn": "urn:pearson:entity:2952c0c7-b745-4a64-b816-a63e159fe135",
                                "groupdata": {
                                    "bodymatter": [{
                                        "id": "urn:pearson:work:fea7a0c6-bf67-4147-89af-1ae5314cf77c",
                                        "type": "element-authoredtext",
                                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                        "elementdata": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text": ""
                                        },
                                        "html": {
                                            "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                                        },
                                        "versionUrn": "urn:pearson:work:fea7a0c6-bf67-4147-89af-1ae5314cf77c",
                                        "contentUrn": "urn:pearson:entity:448e8816-1f32-422c-bef9-4f4ee79fc15d",
                                        "status": "wip"
                                    }]
                                }
                            }]
                        }
                    }
                },
                "parentUrn": {
                    "columnName": "C1",
                    "columnIndex": 0,
                    "manifestUrn": "urn:pearson:manifest:4441766b-6bc9-4ebf-b98f-0a78c9a5ceeb",
                    "contentUrn": "urn:pearson:entity:b63d6084-0be4-4404-bca8-c7e967675711",
                    "elementType": "group",
                    "mcId": "urn:pearson:manifest:8a73d595-131a-4cba-b0ea-db2a343e62fc",
                    "multiColumnType": "2C"
                },
                "parentIndex": "1-0",
                "userRole": "admin",
                "source": "MULTICOLUMN",
                "setSlateParent": "chapter",
                "elementSelection": {
                    "element": {
                        "id": "urn:pearson:manifest:fca21e2a-0711-4a68-a67c-027f8dc13153",
                        "type": "showhide",
                        "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                        "versionUrn": "urn:pearson:manifest:fca21e2a-0711-4a68-a67c-027f8dc13153",
                        "contentUrn": "urn:pearson:entity:90d88956-98cb-4d68-b6cd-24fc903d9e2a",
                        "status": "wip",
                        "interactivedata": {
                            "postertextobject": [{
                                "id": "urn:pearson:work:b7e28708-0b0b-425e-9e5b-77ae62c21e34",
                                "type": "element-authoredtext",
                                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                "elementdata": {
                                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text": "Reveal Answer:"
                                },
                                "html": {
                                    "text": "<p class=\"paragraphNumeroUno\">Reveal Answer:</p>",
                                    "footnotes": {},
                                    "assetsPopover": {},
                                    "glossaryentries": {},
                                    "indexEntries": {}
                                },
                                "versionUrn": "urn:pearson:work:b7e28708-0b0b-425e-9e5b-77ae62c21e34",
                                "contentUrn": "urn:pearson:entity:ee53c98b-0911-4e65-ab15-f140ac8df282"
                            }],
                            "show": [{
                                "id": "urn:pearson:work:b854165a-302f-4abe-9d98-5b87d2f8fba1",
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
                                "versionUrn": "urn:pearson:work:b854165a-302f-4abe-9d98-5b87d2f8fba1",
                                "contentUrn": "urn:pearson:entity:d320be17-9798-4c3d-bff6-521e2caf60e8"
                            }, {
                                "id": "urn:pearson:manifest:e806be1d-1a05-445f-afe6-d57ce32be22a",
                                "type": "element-aside",
                                "subtype": "sidebar",
                                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                "designtype": "asideSidebar01",
                                "elementdata": {
                                    "bodymatter": [{
                                        "id": "urn:pearson:work:3f5c2aec-68e8-44cb-ac38-ad9bf251c678",
                                        "type": "element-authoredtext",
                                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                        "elementdata": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text": ""
                                        },
                                        "html": {
                                            "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                                        },
                                        "versionUrn": "urn:pearson:work:3f5c2aec-68e8-44cb-ac38-ad9bf251c678",
                                        "contentUrn": "urn:pearson:entity:22deb6cb-dc2b-4101-8762-b5424f319e91",
                                        "status": "wip"
                                    }],
                                    "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
                                },
                                "versionUrn": "urn:pearson:manifest:e806be1d-1a05-445f-afe6-d57ce32be22a",
                                "contentUrn": "urn:pearson:entity:639d06e6-6767-40e7-a201-38695af274d3"
                            }],
                            "hide": [{
                                "id": "urn:pearson:work:16d66f1d-4698-49b1-aa5d-a3d8465351c5",
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
                                "versionUrn": "urn:pearson:work:16d66f1d-4698-49b1-aa5d-a3d8465351c5",
                                "contentUrn": "urn:pearson:entity:5eed1302-c0e6-40da-85f3-123154449b6c"
                            }]
                        }
                    },
                    "operationType": "copy",
                    "activeAnimation": true,
                    "sourceElementIndex": 0,
                    "tcmFlag": true,
                    "sourceSlateManifestUrn": "urn:pearson:manifest:cd0a0d27-2c98-4618-9340-2d46912d5f28",
                    "sourceSlateEntityUrn": "urn:pearson:entity:00c8b811-0042-4b71-bc25-5957520b21c2",
                    "sourceEntityUrn": "urn:pearson:entity:00c8b811-0042-4b71-bc25-5957520b21c2",
                    "deleteElm": {
                        "id": "urn:pearson:manifest:fca21e2a-0711-4a68-a67c-027f8dc13153",
                        "type": "showhide",
                        "contentUrn": "urn:pearson:entity:90d88956-98cb-4d68-b6cd-24fc903d9e2a",
                        "index": 0,
                        "cutCopyParentUrn": {
                            "manifestUrn": "urn:pearson:manifest:cd0a0d27-2c98-4618-9340-2d46912d5f28",
                            "contentUrn": "urn:pearson:entity:00c8b811-0042-4b71-bc25-5957520b21c2",
                            "sourceSlateManifestUrn": "urn:pearson:manifest:cd0a0d27-2c98-4618-9340-2d46912d5f28",
                            "slateLevelData": {
                                "urn:pearson:manifest:cd0a0d27-2c98-4618-9340-2d46912d5f28": {
                                    "id": "urn:pearson:manifest:cd0a0d27-2c98-4618-9340-2d46912d5f28",
                                    "type": "manifest",
                                    "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
                                    "versionUrn": "urn:pearson:manifest:cd0a0d27-2c98-4618-9340-2d46912d5f28",
                                    "contentUrn": "urn:pearson:entity:00c8b811-0042-4b71-bc25-5957520b21c2",
                                    "contents": {
                                        "bodymatter": [{
                                            "id": "urn:pearson:manifest:fca21e2a-0711-4a68-a67c-027f8dc13153",
                                            "type": "showhide",
                                            "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                                            "versionUrn": "urn:pearson:manifest:fca21e2a-0711-4a68-a67c-027f8dc13153",
                                            "contentUrn": "urn:pearson:entity:90d88956-98cb-4d68-b6cd-24fc903d9e2a",
                                            "status": "wip",
                                            "interactivedata": {
                                                "postertextobject": [{
                                                    "id": "urn:pearson:work:b7e28708-0b0b-425e-9e5b-77ae62c21e34",
                                                    "type": "element-authoredtext",
                                                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                                    "elementdata": {
                                                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                        "text": "Reveal Answer:"
                                                    },
                                                    "html": {
                                                        "text": "<p class=\"paragraphNumeroUno\">Reveal Answer:</p>",
                                                        "footnotes": {},
                                                        "assetsPopover": {},
                                                        "glossaryentries": {},
                                                        "indexEntries": {}
                                                    },
                                                    "versionUrn": "urn:pearson:work:b7e28708-0b0b-425e-9e5b-77ae62c21e34",
                                                    "contentUrn": "urn:pearson:entity:ee53c98b-0911-4e65-ab15-f140ac8df282"
                                                }],
                                                "show": [{
                                                    "id": "urn:pearson:work:b854165a-302f-4abe-9d98-5b87d2f8fba1",
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
                                                    "versionUrn": "urn:pearson:work:b854165a-302f-4abe-9d98-5b87d2f8fba1",
                                                    "contentUrn": "urn:pearson:entity:d320be17-9798-4c3d-bff6-521e2caf60e8"
                                                }, {
                                                    "id": "urn:pearson:manifest:e806be1d-1a05-445f-afe6-d57ce32be22a",
                                                    "type": "element-aside",
                                                    "subtype": "sidebar",
                                                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                                    "designtype": "asideSidebar01",
                                                    "elementdata": {
                                                        "bodymatter": [{
                                                            "id": "urn:pearson:work:3f5c2aec-68e8-44cb-ac38-ad9bf251c678",
                                                            "type": "element-authoredtext",
                                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                                            "elementdata": {
                                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                                "text": ""
                                                            },
                                                            "html": {
                                                                "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                                                            },
                                                            "versionUrn": "urn:pearson:work:3f5c2aec-68e8-44cb-ac38-ad9bf251c678",
                                                            "contentUrn": "urn:pearson:entity:22deb6cb-dc2b-4101-8762-b5424f319e91",
                                                            "status": "wip"
                                                        }],
                                                        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
                                                    },
                                                    "versionUrn": "urn:pearson:manifest:e806be1d-1a05-445f-afe6-d57ce32be22a",
                                                    "contentUrn": "urn:pearson:entity:639d06e6-6767-40e7-a201-38695af274d3"
                                                }],
                                                "hide": [{
                                                    "id": "urn:pearson:work:16d66f1d-4698-49b1-aa5d-a3d8465351c5",
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
                                                    "versionUrn": "urn:pearson:work:16d66f1d-4698-49b1-aa5d-a3d8465351c5",
                                                    "contentUrn": "urn:pearson:entity:5eed1302-c0e6-40da-85f3-123154449b6c"
                                                }]
                                            }
                                        }, {
                                            "id": "urn:pearson:manifest:8a73d595-131a-4cba-b0ea-db2a343e62fc",
                                            "type": "groupedcontent",
                                            "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                                            "width": "wider",
                                            "groupproportions": "60-40",
                                            "versionUrn": "urn:pearson:manifest:8a73d595-131a-4cba-b0ea-db2a343e62fc",
                                            "contentUrn": "urn:pearson:entity:a4181fe0-b3db-428b-8cf6-635a60950229",
                                            "groupeddata": {
                                                "bodymatter": [{
                                                    "id": "urn:pearson:manifest:4441766b-6bc9-4ebf-b98f-0a78c9a5ceeb",
                                                    "type": "group",
                                                    "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                                                    "versionUrn": "urn:pearson:manifest:4441766b-6bc9-4ebf-b98f-0a78c9a5ceeb",
                                                    "contentUrn": "urn:pearson:entity:b63d6084-0be4-4404-bca8-c7e967675711",
                                                    "groupdata": {
                                                        "bodymatter": [{
                                                            "id": "urn:pearson:work:57858ff7-88d4-4bf1-8036-b160b058017b",
                                                            "type": "element-authoredtext",
                                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                                            "elementdata": {
                                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                                "text": ""
                                                            },
                                                            "html": {
                                                                "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                                                            },
                                                            "versionUrn": "urn:pearson:work:57858ff7-88d4-4bf1-8036-b160b058017b",
                                                            "contentUrn": "urn:pearson:entity:552ce68b-edd0-44ed-9080-1e6437407aad",
                                                            "status": "wip"
                                                        }]
                                                    }
                                                }, {
                                                    "id": "urn:pearson:manifest:11b0d96a-6b7c-42c8-9e8e-14a193d24e8f",
                                                    "type": "group",
                                                    "schema": "http://schemas.pearson.com/wip-authoring/groupedcontent/1",
                                                    "versionUrn": "urn:pearson:manifest:11b0d96a-6b7c-42c8-9e8e-14a193d24e8f",
                                                    "contentUrn": "urn:pearson:entity:2952c0c7-b745-4a64-b816-a63e159fe135",
                                                    "groupdata": {
                                                        "bodymatter": [{
                                                            "id": "urn:pearson:work:fea7a0c6-bf67-4147-89af-1ae5314cf77c",
                                                            "type": "element-authoredtext",
                                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                                            "elementdata": {
                                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                                "text": ""
                                                            },
                                                            "html": {
                                                                "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                                                            },
                                                            "versionUrn": "urn:pearson:work:fea7a0c6-bf67-4147-89af-1ae5314cf77c",
                                                            "contentUrn": "urn:pearson:entity:448e8816-1f32-422c-bef9-4f4ee79fc15d",
                                                            "status": "wip"
                                                        }]
                                                    }
                                                }]
                                            }
                                        }],
                                        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
                                    },
                                    "status": "wip",
                                    "pageNo": 0,
                                    "pageCount": 1,
                                    "pageLimit": 2
                                }
                            }
                        }
                    },
                    "inputType": "SHOW_HIDE",
                    "inputSubType": "NA"
                },
                "showPlayscript": true,
                "showDiscussion": true,
                "projectSubscriptionDetails": {
                    "usageType": [{
                        "label": "Standard Discussion"
                    }, {
                        "label": "Self-Reflection First"
                    }, {
                        "label": "Self-Reflection Second"
                    }],
                    "discussionItems": [],
                    "showPlayscript": true,
                    "showDiscussion": true,
                    "projectSharingRole": "SUBSCRIBER",
                    "projectSubscriptionDetails": {
                        "isSubscribed": false,
                        "owner": {}
                    },
                    "isOwnersSubscribedSlateChecked": true,
                    "id": "urn:pearson:distributable:38a4d973-9fc0-43d4-be1a-453adcb1e537",
                    "entityURN": "urn:pearson:entity:99c9c682-88f2-461b-ad88-a994f07cba41",
                    "containerURN": "urn:pearson:manifest:f06e00c4-27a5-4a54-a03d-18a5e7769a3c",
                    "type": "Distributable",
                    "name": {
                        "en": "SH"
                    },
                    "status": ["https://schema.pearson.com/ns/contentlifecyclestatus/wip"],
                    "dateCreated": "2021-10-25T10:29:35.337Z",
                    "dateModified": "2021-10-25T10:35:32.506Z",
                    "isVersionOf": [],
                    "lineOfBusiness": "professional",
                    "targetProductPlatform": [],
                    "title": {
                        "en": "SH"
                    },
                    "autoGenerateNarrativeAudio": false,
                    "additionalMetadata": {
                        "authorName": "",
                        "tcm": {
                            "user": "uthalki",
                            "userIp": "127.0.0.1",
                            "activated": "true",
                            "timeUpdated": "1635157782627"
                        },
                        "alfresco": {
                            "repositoryUrl": "https://staging.api.pearson.com/content/cmis/uswip-aws",
                            "repositoryName": "AWS US",
                            "repositoryFolder": "001_C5 Media POC - AWS US ",
                            "nodeRef": "ebaaf975-a68b-4ca6-9604-3d37111b847a",
                            "visibility": "MODERATED",
                            "siteId": "c5-media-poc"
                        },
                        "dashboard": true,
                        "origin": "UDB",
                        "enableProactivePreview": true
                    },
                    "_links": {
                        "https://api.pearson.com/project/relation/metadata": {
                            "method": "PUT",
                            "href": "/distributable/v2/urn:pearson:distributable:38a4d973-9fc0-43d4-be1a-453adcb1e537/",
                            "title": "Save metadata"
                        }
                    },
                    "sharingContextRole": "SUBSCRIBER",
                    "associatedArt": [{
                        "imageURN": null,
                        "imageURI": "https://cite-media-stg.pearson.com/legacy_paths/fc9fe613-8bdf-4e3e-be2d-583360e4104a/coursehome_bg.jpg",
                        "imageType": "course-background"
                    }, {
                        "imageURN": "urn:pearson:work:b94ea028-4cd0-4b91-999f-b4b5de4755b2",
                        "imageURI": "https://cite-media-stg.pearson.com/legacy_paths/bd2def8c-e6b2-4822-aafb-7e75bfbfa90f/cover.jpg",
                        "imageType": "bookcover"
                    }],
                    "eTag": "101711925739"
                }
            }
            let sourceType="MULTICOLUMN",
            selectionType="SHOW_HIDE",
            spyFunction = jest.spyOn(Element_Constants, 'getPasteValidated');
            Element_Constants.getPasteValidated(props, sourceType, selectionType);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
        })
        it('render getPasteValidated',()=>{
            let props={
                "index": "1-0-0",
                "asideData": {
                    "id": "urn:pearson:manifest:fca21e2a-0711-4a68-a67c-027f8dc13153",
                    "type": "showhide",
                    "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                    "versionUrn": "urn:pearson:manifest:fca21e2a-0711-4a68-a67c-027f8dc13153",
                    "contentUrn": "urn:pearson:entity:90d88956-98cb-4d68-b6cd-24fc903d9e2a",
                    "status": "wip",
                    "interactivedata": {
                        "postertextobject": [{
                            "id": "urn:pearson:work:b7e28708-0b0b-425e-9e5b-77ae62c21e34",
                            "type": "element-authoredtext",
                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                            "elementdata": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "Reveal Answer:"
                            },
                            "html": {
                                "text": "<p class=\"paragraphNumeroUno\">Reveal Answer:</p>",
                                "footnotes": {},
                                "assetsPopover": {},
                                "glossaryentries": {},
                                "indexEntries": {}
                            },
                            "versionUrn": "urn:pearson:work:b7e28708-0b0b-425e-9e5b-77ae62c21e34",
                            "contentUrn": "urn:pearson:entity:ee53c98b-0911-4e65-ab15-f140ac8df282"
                        }],
                        "show": [{
                            "id": "urn:pearson:work:b854165a-302f-4abe-9d98-5b87d2f8fba1",
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
                            "versionUrn": "urn:pearson:work:b854165a-302f-4abe-9d98-5b87d2f8fba1",
                            "contentUrn": "urn:pearson:entity:d320be17-9798-4c3d-bff6-521e2caf60e8"
                        }],
                        "hide": [{
                            "id": "urn:pearson:work:16d66f1d-4698-49b1-aa5d-a3d8465351c5",
                            "type": "element-authoredtext",
                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                            "elementdata": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": ""
                            },
                        }]
                    },
                    "sectionType": "show"
                },
                "elementType": "showhide",
                "source": "SHOWHIDE",
                "elementSelection": {
                    "element": {
                        "id": "urn:pearson:manifest:a4bdbaca-5e8b-429e-ba26-3d820539edba",
                        "type": "element-aside",
                        "subtype": "sidebar",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "designtype": "sidebar1",
                        "elementdata": {
                            "bodymatter": [{
                                "id": "urn:pearson:work:da1d3a02-a4f0-4829-86f9-0f55489f3c35",
                                "type": "element-authoredtext",
                                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                "elementdata": {
                                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text": "",
                                    "headers": [{
                                        "level": 4
                                    }]
                                },
                            }, {
                                "id": "urn:pearson:manifest:25454e04-beb6-475f-9f0c-5394a337c626",
                                "type": "showhide",
                                "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                                "versionUrn": "urn:pearson:manifest:25454e04-beb6-475f-9f0c-5394a337c626",
                                "contentUrn": "urn:pearson:entity:772972b3-64e2-4ab2-b458-7b5780019f43",
                                "status": "wip",
                                "interactivedata": {
                                    "postertextobject": [{
                                        "id": "urn:pearson:work:eee04490-7759-4d72-ad5a-b12956d4c265",
                                        "type": "element-authoredtext",
                                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                        "elementdata": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text": "Reveal Answer:"
                                        },
                                    }],
                                    "show": [{
                                        "id": "urn:pearson:work:0e50f820-4f24-47a1-9762-b931c7545e55",
                                        "type": "element-authoredtext",
                                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                        "elementdata": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text": ""
                                        }
                                    }],
                                    "hide": [{
                                        "id": "urn:pearson:work:69ac96fd-aa03-4518-b322-f41d614643ef",
                                        "type": "element-authoredtext",
                                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                        "elementdata": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text": ""
                                        }
                                    }]
                                }
                            }],
                        }
                    },
                    "operationType": "copy"
                },
                "sectionType": "show"
            }
            let sourceType="SHOWHIDE",
                selectionType="ASIDE",
                spyFunction = jest.spyOn(Element_Constants, 'getPasteValidated');
                Element_Constants.getPasteValidated(props, sourceType, selectionType);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('render getPasteValidated conditional coverage',()=>{
            let props={
                "index": "1-0-0-0-0",
                "asideData": {
                    "id": "urn:pearson:manifest:fca21e2a-0711-4a68-a67c-027f8dc13153",
                    "type": "showhide",
                    "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                    "versionUrn": "urn:pearson:manifest:fca21e2a-0711-4a68-a67c-027f8dc13153",
                    "contentUrn": "urn:pearson:entity:90d88956-98cb-4d68-b6cd-24fc903d9e2a",
                    "status": "wip",
                    "interactivedata": {
                        "postertextobject": [{
                            "id": "urn:pearson:work:b7e28708-0b0b-425e-9e5b-77ae62c21e34",
                            "type": "element-authoredtext",
                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                            "elementdata": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "Reveal Answer:"
                            },
                            "html": {
                                "text": "<p class=\"paragraphNumeroUno\">Reveal Answer:</p>",
                                "footnotes": {},
                                "assetsPopover": {},
                                "glossaryentries": {},
                                "indexEntries": {}
                            },
                            "versionUrn": "urn:pearson:work:b7e28708-0b0b-425e-9e5b-77ae62c21e34",
                            "contentUrn": "urn:pearson:entity:ee53c98b-0911-4e65-ab15-f140ac8df282"
                        }],
                        "show": [{
                            "id": "urn:pearson:work:b854165a-302f-4abe-9d98-5b87d2f8fba1",
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
                            "versionUrn": "urn:pearson:work:b854165a-302f-4abe-9d98-5b87d2f8fba1",
                            "contentUrn": "urn:pearson:entity:d320be17-9798-4c3d-bff6-521e2caf60e8"
                        }],
                        "hide": [{
                            "id": "urn:pearson:work:16d66f1d-4698-49b1-aa5d-a3d8465351c5",
                            "type": "element-authoredtext",
                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                            "elementdata": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": ""
                            },
                        }]
                    },
                    "sectionType": "show"
                },
                "elementType": "showhide",
                "source": "SHOWHIDE",
                "elementSelection": {
                    "element": {
                        "id": "urn:pearson:manifest:a4bdbaca-5e8b-429e-ba26-3d820539edba",
                        "type": "element-aside",
                        "subtype": "sidebar",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "designtype": "sidebar1",
                        "elementdata": {
                            "bodymatter": [{
                                "id": "urn:pearson:work:da1d3a02-a4f0-4829-86f9-0f55489f3c35",
                                "type": "element-authoredtext",
                                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                "elementdata": {
                                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text": "",
                                    "headers": [{
                                        "level": 4
                                    }]
                                },
                            }, {
                                "id": "urn:pearson:manifest:25454e04-beb6-475f-9f0c-5394a337c626",
                                "type": "showhide",
                                "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                                "versionUrn": "urn:pearson:manifest:25454e04-beb6-475f-9f0c-5394a337c626",
                                "contentUrn": "urn:pearson:entity:772972b3-64e2-4ab2-b458-7b5780019f43",
                                "status": "wip",
                                "interactivedata": {
                                    "postertextobject": [{
                                        "id": "urn:pearson:work:eee04490-7759-4d72-ad5a-b12956d4c265",
                                        "type": "element-authoredtext",
                                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                        "elementdata": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text": "Reveal Answer:"
                                        },
                                    }],
                                    "show": [{
                                        "id": "urn:pearson:work:0e50f820-4f24-47a1-9762-b931c7545e55",
                                        "type": "element-authoredtext",
                                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                        "elementdata": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text": ""
                                        }
                                    }],
                                    "hide": [{
                                        "id": "urn:pearson:work:69ac96fd-aa03-4518-b322-f41d614643ef",
                                        "type": "element-authoredtext",
                                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                        "elementdata": {
                                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text": ""
                                        }
                                    }]
                                }
                            }],
                        }
                    },
                    "operationType": "copy"
                },
                "sectionType": "show"
            }
            let sourceType="SHOWHIDE",
                selectionType="ASIDE",
                spyFunction = jest.spyOn(Element_Constants, 'getPasteValidated');
                Element_Constants.getPasteValidated(props, sourceType, selectionType);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
    })

})