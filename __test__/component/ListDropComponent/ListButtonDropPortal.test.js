import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ListButtonDropPortal from '../../../src/component/ListButtonDrop/ListButtonDropPortal';
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
            sectionType: "show"
        }
    }
}

const mockStore = configureMockStore(middlewares)
let store = mockStore(initialState);

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
})