import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ListButtonDropPortal from '../../../src/component/ListButtonDrop/ListButtonDropPortal';
import {  updateBL, updateBL_IN_AS, updateBL_IN_SH,  updateBL_IN_WE} from "../../../fixtures/slateTestingData"
import config from '../../../src/config/config.js';
const middlewares = [thunk];

let initialState = {
    appStore : {
        activeElement: {
            elementWipType: 'element-list',
            elementId: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb70'
        },
        permissions: [
            "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
            "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
            "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
        ],
        oldImage: "",
        showHideId : "",
        asideData: {
            type: "showhide",
            sectionType: "show",
            parent:{
                type: "showhide"
            }
        }
    }
}

let initialState2 = {
    appStore : {
        activeElement: {
           index: "0-0-0-0"
        },
        permissions: [
            "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
            "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
            "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
        ],
        asideData:{
            "type":"manifestlist",
            "subtype":"decimal",
            "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
            "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
            "element":{
               "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text":""
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                 },
                                 "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                 "status":"wip",
                                 "index":"0-0-0-0"
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
            "index":"0-0",
            "parent":{
               "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
               "type":"element-aside",
               "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
            },
            "parentManifestList":{
               "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text":""
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                 },
                                 "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                 "status":"wip",
                                 "index":"0-0-0-0"
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
            }
         },
    }
}

const mockStore = configureMockStore(middlewares)
let store = mockStore(initialState);
let store2 = mockStore(initialState2);

jest.mock('../../../src/js/TinyMceUtility.js', () => ({
    checkBlockListElement: jest.fn(() => { return { parentData: {id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb70'} } })
}));

describe('Testing ListButtonDropPortal component', () => {
    let props = {
        children: jest.fn(),
        slateData: {
            "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
                contents: {
                    bodymatter: [{
                        id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb70',
                        type: 'element-list'
                    }]
                }
            }
        }
    }
    config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
    const portalElemParent = document.createElement('div');
    const portalElemChild = document.createElement('div');
    portalElemChild.id = "editor-toolbar";
    portalElemParent.appendChild(portalElemChild);
    document.body.appendChild(portalElemParent);
    const wrapper = mount(<Provider store={store}> <ListButtonDropPortal {...props} /></Provider>)
    const ListButtonDropPortalInstance = wrapper.find('ListButtonDropPortal').instance();

    it("Test - componentDidUpdate", () => {
        const spycomponentDidUpdate = jest.spyOn(ListButtonDropPortalInstance, 'componentDidUpdate')
        ListButtonDropPortalInstance.inputRef = {current: {value: ''}}
        ListButtonDropPortalInstance.componentDidUpdate();
        expect(spycomponentDidUpdate).toHaveBeenCalled();
        spycomponentDidUpdate.mockClear()
    })

    it("Test - componentWillUnmount - if block", () => {
        const spycomponentWillUnmount = jest.spyOn(ListButtonDropPortalInstance, 'componentWillUnmount')
        ListButtonDropPortalInstance.componentWillUnmount();
        expect(spycomponentWillUnmount).toHaveBeenCalled();
        spycomponentWillUnmount.mockClear()
    })

    it("Test - componentWillUnmount - else block", () => {
        const spycomponentWillUnmount = jest.spyOn(ListButtonDropPortalInstance, 'componentWillUnmount')
        ListButtonDropPortalInstance.portalElem = null;
        ListButtonDropPortalInstance.componentWillUnmount();
        expect(spycomponentWillUnmount).toHaveBeenCalled();
        spycomponentWillUnmount.mockClear()
    })

    it("Test - getListDropPopUpState - element-aside", () => {
        const spygetListDropPopUpState = jest.spyOn(ListButtonDropPortalInstance, 'getListDropPopUpState')
        const slateData = {
            "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
                contents: {
                    bodymatter: [{
                        id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb70',
                        type: 'element-aside',
                        elementdata: {
                            bodymatter: [{
                                id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
                                type: 'element-list'
                            }]
                        }
                    }]
                }
            }
        }
        const activeElement = {
            elementWipType: 'element-list',
            elementId: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71'
        }
        ListButtonDropPortalInstance.getListDropPopUpState(slateData, activeElement);
        expect(spygetListDropPopUpState).toHaveBeenCalled();
        spygetListDropPopUpState.mockClear()
    })


    it("Test - getListDropPopUpState - element-aside - manifest", () => {
        const spygetListDropPopUpState = jest.spyOn(ListButtonDropPortalInstance, 'getListDropPopUpState')
        const slateData = {
            "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
                contents: {
                    bodymatter: [{
                        id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb70',
                        type: 'element-aside',
                        elementdata: {
                            bodymatter: [{
                                id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb70',
                                type: 'manifest',
                                contents: {
                                    bodymatter: [{
                                        id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
                                        type: 'element-list'
                                    }]
                                }
                            }]
                        }
                    }]
                }
            }
        }
        const activeElement = {
            elementWipType: 'element-list',
            elementId: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71'
        }
        ListButtonDropPortalInstance.getListDropPopUpState(slateData, activeElement);
        expect(spygetListDropPopUpState).toHaveBeenCalled();
        spygetListDropPopUpState.mockClear()
    })

    it("Test - getListDropPopUpState - element-aside - manifest - showhide", () => {
        const spygetListDropPopUpState = jest.spyOn(ListButtonDropPortalInstance, 'getListDropPopUpState')
        const slateData = {
            "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
                contents: {
                    bodymatter: [{
                        id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb70',
                        type: 'element-aside',
                        elementdata: {
                            bodymatter: [{
                                id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb70',
                                type: 'manifest',
                                contents: {
                                    bodymatter: [{
                                        id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb72',
                                        type: 'showhide',
                                        interactivedata: {
                                            show: [{
                                                id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
                                                type:'element-list'
                                            }]
                                        }
                                    }]
                                }
                            }]
                        }
                    }]
                }
            }
        }
        const activeElement = {
            elementWipType: 'element-list',
            elementId: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
            index: "1-0-0-0-0-1"
        }
        ListButtonDropPortalInstance.getListDropPopUpState(slateData, activeElement);
        expect(spygetListDropPopUpState).toHaveBeenCalled();
        spygetListDropPopUpState.mockClear()
    })

    it("Test - getListDropPopUpState - element-aside - showhide", () => {
        const spygetListDropPopUpState = jest.spyOn(ListButtonDropPortalInstance, 'getListDropPopUpState')
        const slateData = {
            "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
                contents: {
                    bodymatter: [{
                        id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb70',
                        type: 'element-aside',
                        elementdata: {
                            bodymatter: [{
                                id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb70',
                                type: 'showhide',
                                interactivedata: {
                                    show: [{
                                        id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
                                        type:'element-list'
                                    }]
                                }
                            }]
                        }
                    }]
                }
            }
        }
        const activeElement = {
            elementWipType: 'element-list',
            elementId: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
            index: "1-0-0-0-0-1"
        }
        ListButtonDropPortalInstance.getListDropPopUpState(slateData, activeElement);
        expect(spygetListDropPopUpState).toHaveBeenCalled();
        spygetListDropPopUpState.mockClear()
    })


    it("Test - getListDropPopUpState - showhide", () => {
        const spygetListDropPopUpState = jest.spyOn(ListButtonDropPortalInstance, 'getListDropPopUpState')
        const slateData = {
            "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
                contents: {
                    bodymatter: [{
                        id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb70',
                        type: 'showhide',
                        interactivedata: {
                            show: [{
                                id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
                                type:'element-list'
                            }]
                        }
                    }]
                }
            }
        }
        const activeElement = {
            elementWipType: 'element-list',
            elementId: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
            index: "1-0-0-0-0-1"
        }
        ListButtonDropPortalInstance.getListDropPopUpState(slateData, activeElement);
        expect(spygetListDropPopUpState).toHaveBeenCalled();
        spygetListDropPopUpState.mockClear()
    })

    it('Test - getBlockListMetaData - elementId present in elementData', () => {
        const spygetBlockListMetaData = jest.spyOn(ListButtonDropPortalInstance, 'getBlockListMetaData')
        const elementData = {
            listdata:{
                bodymatter: [{
                    listitemdata: {
                        bodymatter: [{
                            id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb72'
                        }]
                    }
                }]
            }
        }
        ListButtonDropPortalInstance.getBlockListMetaData('urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb72', elementData);
        expect(spygetBlockListMetaData).toHaveBeenCalled();
        spygetBlockListMetaData.mockClear()
    });

    it('Test - getBlockListMetaData - elementId not present in elementData', () => {
        const spygetBlockListMetaData = jest.spyOn(ListButtonDropPortalInstance, 'getBlockListMetaData')
        const elementData = {
            listdata:{
                bodymatter: [{
                    listitemdata: {
                        bodymatter: [{
                            id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb73'
                        }]
                    }
                }]
            }
        }
        ListButtonDropPortalInstance.getBlockListMetaData('urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb72', elementData);
        expect(spygetBlockListMetaData).toHaveBeenCalled();
        spygetBlockListMetaData.mockClear()
    });

    it('Test - getBlockListMetaData - BL in SH', () => {
        let props1 = {
            children: jest.fn(),
            slateData: updateBL_IN_SH.slateLevelData
        }
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        const portalElemParent = document.createElement('div');
        const portalElemChild = document.createElement('div');
        portalElemChild.id = "editor-toolbar";
        portalElemParent.appendChild(portalElemChild);
        document.body.appendChild(portalElemParent);
        const wrapper = mount(<Provider store={store}> <ListButtonDropPortal {...props1} /></Provider>)
        const ListButtonDropPortalInstance = wrapper.find('ListButtonDropPortal').instance();
        const spygetBlockListMetaData = jest.spyOn(ListButtonDropPortalInstance, 'getBlockListMetaData')
        const elementData = {
            "listdata":{
                "bodymatter":[
                   {
                      "id":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                      "type":"manifestlistitem",
                      "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                      "versionUrn":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                      "contentUrn":"urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                      "status":"wip",
                      "listitemdata":{
                         "bodymatter":[
                            {
                               "id":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                               "type":"element-authoredtext",
                               "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                               "elementdata":{
                                  "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                  "text":"adasdsdfsdf dfsdfsdfsdfdsf  xvxcvxcxc"
                               },
                               "html":{
                                  "text":"<p class=\"paragraphNumeroUno\">adasdsdfsdf dfsdfsdfsdfdsf&nbsp; xvxcvxcxc</p>",
                                  "footnotes":{
                                     
                                  },
                                  "assetsPopover":{
                                     
                                  },
                                  "glossaryentries":{
                                     
                                  },
                                  "indexEntries":{
                                     
                                  }
                               },
                               "versionUrn":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                               "contentUrn":"urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a"
                            }
                         ]
                      }
                   }
                ]
             },
        }
        ListButtonDropPortalInstance.getBlockListMetaData('urn:pearson:manifest:964b0f8d-b80a-4fef-afaf-837d7e97d3c4', elementData);
        expect(spygetBlockListMetaData).toHaveBeenCalled();
        spygetBlockListMetaData.mockClear()
    });

    it('Test - getBlockListMetaData - BL in AS', () => {
        let props1 = {
            children: jest.fn(),
            slateData: updateBL_IN_AS.slateLevelData
        }
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        const portalElemParent = document.createElement('div');
        const portalElemChild = document.createElement('div');
        portalElemChild.id = "editor-toolbar";
        portalElemParent.appendChild(portalElemChild);
        document.body.appendChild(portalElemParent);
        const wrapper = mount(<Provider store={store2}> <ListButtonDropPortal {...props1} /></Provider>)
        const ListButtonDropPortalInstance = wrapper.find('ListButtonDropPortal').instance();
        const spygetBlockListMetaData = jest.spyOn(ListButtonDropPortalInstance, 'getBlockListMetaData')
        const elementData = {
            "listdata":{
                "bodymatter":[
                   {
                      "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                      "type":"manifestlistitem",
                      "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                      "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                      "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                      "listitemdata":{
                         "bodymatter":[
                            {
                               "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                               "type":"element-authoredtext",
                               "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                               "elementdata":{
                                  "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                  "text":""
                               },
                               "html":{
                                  "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                               },
                               "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                               "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                               "status":"wip",
                               "index":"0-0-0-0"
                            }
                         ]
                      }
                   }
                ]
             },
        }
        ListButtonDropPortalInstance.getBlockListMetaData('urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c', elementData);
        expect(spygetBlockListMetaData).toHaveBeenCalled();
        spygetBlockListMetaData.mockClear()
    });

    it('Test - getBlockListMetaData - BL in WE', () => {
        let props2 = {
            children: jest.fn(),
            slateData: updateBL_IN_WE.slateLevelData
        }
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        const portalElemParent = document.createElement('div');
        const portalElemChild = document.createElement('div');
        portalElemChild.id = "editor-toolbar";
        portalElemParent.appendChild(portalElemChild);
        document.body.appendChild(portalElemParent);
        const wrapper = mount(<Provider store={store2}> <ListButtonDropPortal {...props2} /></Provider>)
        const ListButtonDropPortalInstance = wrapper.find('ListButtonDropPortal').instance();
        const spygetBlockListMetaData = jest.spyOn(ListButtonDropPortalInstance, 'getBlockListMetaData')
        const elementData = {
            "listdata":{
                "bodymatter":[
                   {
                      "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                      "type":"manifestlistitem",
                      "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                      "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                      "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                      "listitemdata":{
                         "bodymatter":[
                            {
                               "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                               "type":"element-authoredtext",
                               "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                               "elementdata":{
                                  "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                  "text":""
                               },
                               "html":{
                                  "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                               },
                               "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                               "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                               "status":"wip",
                               "index":"0-0-0-0"
                            }
                         ]
                      }
                   }
                ]
             },
        }
        ListButtonDropPortalInstance.getBlockListMetaData('urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c', elementData);
        expect(spygetBlockListMetaData).toHaveBeenCalled();
        spygetBlockListMetaData.mockClear()
    });

    it('Test - getBlockListMetaData - BL ', () => {
        let props3 = {
            children: jest.fn(),
            slateData: updateBL.slateLevelData
        }
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        const portalElemParent = document.createElement('div');
        const portalElemChild = document.createElement('div');
        portalElemChild.id = "editor-toolbar";
        portalElemParent.appendChild(portalElemChild);
        document.body.appendChild(portalElemParent);
        const wrapper = mount(<Provider store={store2}> <ListButtonDropPortal {...props3} /></Provider>)
        const ListButtonDropPortalInstance = wrapper.find('ListButtonDropPortal').instance();
        const spygetBlockListMetaData = jest.spyOn(ListButtonDropPortalInstance, 'getBlockListMetaData')
        const elementData = {
            "listdata":{
                "bodymatter":[
                   {
                      "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                      "type":"manifestlistitem",
                      "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                      "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                      "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                      "listitemdata":{
                         "bodymatter":[
                            {
                               "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                               "type":"element-authoredtext",
                               "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                               "elementdata":{
                                  "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                  "text":""
                               },
                               "html":{
                                  "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                               },
                               "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                               "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                               "status":"wip",
                               "index":"0-0-0-0"
                            }
                         ]
                      }
                   }
                ]
             },
        }
        ListButtonDropPortalInstance.getBlockListMetaData('urn:pearson:manifest:045cde04-a001-47e0-9720-76fda6510d7b', elementData);
        expect(spygetBlockListMetaData).toHaveBeenCalled();
        spygetBlockListMetaData.mockClear()
    });
    
    it("Test - getListDropPopUpState - blocklist - activeElement - id - same", () => {
        const spygetListDropPopUpState = jest.spyOn(ListButtonDropPortalInstance, 'getListDropPopUpState')
        const slateData = {
            "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
                contents: {
                    bodymatter: [{
                        id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb70'
                    }]
                }
            }
        }
        const activeElement = {
            elementWipType: '',
            elementId: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
            index: '0-0-0'
        }
        ListButtonDropPortalInstance.getListDropPopUpState(slateData, activeElement);
        expect(spygetListDropPopUpState).toHaveBeenCalled();
        spygetListDropPopUpState.mockClear()
    })

    it("Test - getListDropPopUpState - blocklist - activeElement - id - different", () => {
        const spygetListDropPopUpState = jest.spyOn(ListButtonDropPortalInstance, 'getListDropPopUpState')
        const slateData = {
            "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
                contents: {
                    bodymatter: [{
                        id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71'
                    }]
                }
            }
        }
        const activeElement = {
            elementWipType: '',
            elementId: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
            index: '0-0-0'
        }
        ListButtonDropPortalInstance.getListDropPopUpState(slateData, activeElement);
        expect(spygetListDropPopUpState).toHaveBeenCalled();
        spygetListDropPopUpState.mockClear()
    })

    it("Test - getListDropPopUpState - groupedcontent - element-aside - element-list", () => {
        const spygetListDropPopUpState = jest.spyOn(ListButtonDropPortalInstance, 'getListDropPopUpState')
        const slateData = {
            "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
                contents: {
                    bodymatter: [{
                        id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb70',
                        type: 'groupedcontent',
                        groupeddata: {
                            bodymatter: [
                            {
                                id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
                                type: 'element-list',
                                groupdata: {
                                    bodymatter: [{
                                        id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
                                        type: 'element-aside',
                                        elementdata: {
                                                       bodymatter: [{
                                                            id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
                                                            type: 'element-list'
                                                        }]
                                                   }
                                    }]
                                },
                            },
                                    {
                                        id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
                                        type: 'element-list'
                                    }]
                                }
                            }]
                            
                        }
                    
                }
            }
        
        const activeElement = {
            elementWipType: 'element-list',
            elementId: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
            index: '0-0-0'
        }
        ListButtonDropPortalInstance.getListDropPopUpState(slateData, activeElement);
        expect(spygetListDropPopUpState).toHaveBeenCalled();
        spygetListDropPopUpState.mockClear()
    })

    it("Test - getListDropPopUpState - groupedcontent - element-aside - showhide", () => {
        const spygetListDropPopUpState = jest.spyOn(ListButtonDropPortalInstance, 'getListDropPopUpState')
        const slateData = {
            "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
                contents: {
                    bodymatter: [{
                        id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb70',
                        type: 'groupedcontent',
                        groupeddata: {
                            bodymatter: [
                            {
                                id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
                                type: 'element-list',
                                groupdata: {
                                    bodymatter: [{
                                        id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
                                        type: 'element-aside',
                                        elementdata: {
                                            bodymatter: [{
                                                id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb70',
                                                type: 'showhide',
                                                interactivedata: {
                                                    show: [{
                                                        id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
                                                        type:'element-list'
                                                    }]
                                                }
                                            }]
                                                   }
                                    }]
                                },
                            }]
                                }
                            }]
                            
                        }
                    
                }
            }
        
        const activeElement = {
            elementWipType: 'element-list',
            elementId: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
            index: '1-0-0-0-0-0'
        }
        ListButtonDropPortalInstance.getListDropPopUpState(slateData, activeElement);
        expect(spygetListDropPopUpState).toHaveBeenCalled();
        spygetListDropPopUpState.mockClear()
    })


    it("Test - getListDropPopUpState - groupedcontent - element-aside - manifest", () => {
        const spygetListDropPopUpState = jest.spyOn(ListButtonDropPortalInstance, 'getListDropPopUpState')
        const slateData = {
            "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
                contents: {
                    bodymatter: [{
                        id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb70',
                        type: 'groupedcontent',
                        groupeddata: {
                            bodymatter: [
                            {
                                id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
                                type: 'element-list',
                                groupdata: {
                                    bodymatter: [{
                                        id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
                                        type: 'element-aside',
                                        elementdata: {
                                            bodymatter: [{
                                                id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb70',
                                                type: 'manifest',
                                                contents: {
                                                    bodymatter: [{
                                                        id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
                                                        type: 'element-list'
                                                    }]
                                                }
                                            }]
                                                   }
                                    }]
                                },
                            }]
                                }
                            }]
                            
                        }
                    
                }
            }
        
        const activeElement = {
            elementWipType: 'element-list',
            elementId: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
            index: '1-0-0-0-0-0'
        }
        ListButtonDropPortalInstance.getListDropPopUpState(slateData, activeElement);
        expect(spygetListDropPopUpState).toHaveBeenCalled();
        spygetListDropPopUpState.mockClear()
    })

    it("Test - getListDropPopUpState - groupedcontent - element-aside - manifest - showhide", () => {
        const spygetListDropPopUpState = jest.spyOn(ListButtonDropPortalInstance, 'getListDropPopUpState')
        const slateData = {
            "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
                contents: {
                    bodymatter: [{
                        id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb70',
                        type: 'groupedcontent',
                        groupeddata: {
                            bodymatter: [
                            {
                                id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
                                type: 'element-list',
                                groupdata: {
                                    bodymatter: [{
                                        id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
                                        type: 'element-aside',
                                        elementdata: {
                                            bodymatter: [{
                                                id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb70',
                                                type: 'manifest',
                                                contents: {
                                                    bodymatter: [{
                                                        id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb72',
                                                        type: 'showhide',
                                                        interactivedata: {
                                                            show: [{
                                                                id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
                                                                type:'element-list'
                                                            }]
                                                        }
                                                    }]
                                                }
                                            }]
                                                   }
                                    }]
                                },
                            }]
                                }
                            }]
                            
                        }
                    
                }
            }
        
        const activeElement = {
            elementWipType: 'element-list',
            elementId: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
            index: '1-0-0-0-0-0-0'
        }
        ListButtonDropPortalInstance.getListDropPopUpState(slateData, activeElement);
        expect(spygetListDropPopUpState).toHaveBeenCalled();
        spygetListDropPopUpState.mockClear()
    })

    
    
    it("Test - getListDropPopUpState - groupedcontent - element-aside - showhide - 2", () => {
        const spygetListDropPopUpState = jest.spyOn(ListButtonDropPortalInstance, 'getListDropPopUpState')
        const slateData = {
            "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
                contents: {
                    bodymatter: [{
                        id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb70',
                        type: 'groupedcontent',
                        groupeddata: {
                            bodymatter: [
                            {
                                id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
                                type: 'element-list',
                                groupdata: {
                                    bodymatter: [{
                                        id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
                                        type: 'showhide',
                                        interactivedata: {
                                            show: [{
                                                id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
                                                type:'element-list'
                                            }]
                                        }
                                    }]
                                },
                            }]
                                }
                            }]
                            
                        }
                    
                }
            }
        
        const activeElement = {
            elementWipType: 'element-list',
            elementId: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb71',
            index: '1-0-0-0-0-0-0'
        }
        ListButtonDropPortalInstance.getListDropPopUpState(slateData, activeElement);
        expect(spygetListDropPopUpState).toHaveBeenCalled();
        spygetListDropPopUpState.mockClear()
    })



})

// describe("Test BL in SH", ()=>{
//     let props = {
//         children: jest.fn(),
//         slateData: {
//             "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
//                 contents: {
//                     bodymatter: [{
//                         id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb70',
//                         type: 'element-list'
//                     }]
//                 }
//             }
//         }
//     }
//     config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
//     const portalElemParent = document.createElement('div');
//     const portalElemChild = document.createElement('div');
//     portalElemChild.id = "editor-toolbar";
//     portalElemParent.appendChild(portalElemChild);
//     document.body.appendChild(portalElemParent);
//     const wrapper = mount(<Provider store={store}> <ListButtonDropPortal {...props} /></Provider>)
//     const ListButtonDropPortalInstance = wrapper.find('ListButtonDropPortal').instance();
// })