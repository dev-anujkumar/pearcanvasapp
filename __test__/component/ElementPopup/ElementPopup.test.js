import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import ElementPopup from '../../../src/component/ElementPopup';
import { mainSlateData, popup } from '../../../fixtures/ElementPopup';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import config from '../../../src/config/config.js';

jest.mock('../../../src/component/tinyMceEditor.js', () => {
    return function () {
        return (<div>null</div>)
    }
})
const initialState = {
    appStore: {
        slateLength: '25',
        slateLevelData: mainSlateData
    }
}
let store = mockStore(initialState);
describe('Testing Element Show Hide component', () => {
    let props = {
        model: {},
        index: "",
        slateLockInfo: {
            isLocked: false,
            userId: 'c5Test01'
        },
        handleFocus: function () { },
        permissions: [
            "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
            "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
            "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
        ],
        handleBlur: jest.fn(),
        handleFocus: jest.fn(),
        accessDenied: jest.fn(),
        openPopupSlate: jest.fn(),
        fetchSlateData: jest.fn(),
        element: popup,
        activeElement:{
            elementId:''
        }
    }
    const component = mount(<Provider store={store}><ElementPopup {...props} /></Provider>)
    test('renders without crashing', () => {
        const component = mount(<Provider store={store}><ElementPopup {...props} /></Provider>)
        expect(component).toHaveLength(1);
        let instance = component.instance();
        expect(instance).toBeDefined();
    })

    test('Test renderslate function ', () => {
        let elementPopupInstance = component.find("ElementPopup").instance()
        const spyRenderSlatefunction = jest.spyOn(elementPopupInstance, 'renderSlate')
        elementPopupInstance.renderSlate();
        elementPopupInstance.forceUpdate();
        expect(spyRenderSlatefunction).toHaveBeenCalled()
        spyRenderSlatefunction.mockClear()
    })
    it('componentWillUnmount should be called on unmount', () => {
        const component = mount(<Provider store={store}><ElementPopup {...props} /></Provider>)

        const instance = component.find('ElementPopup').instance();
        const componentWillUnmount = jest.spyOn(instance, 'componentWillUnmount');
        component.unmount();
        expect(componentWillUnmount).toHaveBeenCalled();
    });
    it("handlepopupSlateClick method - if block -event ", () => {
        const instance = component.find('ElementPopup').instance();
        const spyhandleFocus = jest.spyOn(instance, 'handlepopupSlateClick')
        config.popupCreationCallInProgress = false
        config.isSavingElement = false
        let event = {
            target: {
                classList: { contains:()=>{return true;}}
            }
        }
        instance.handlepopupSlateClick(event);
        expect(spyhandleFocus).toHaveBeenCalled()
    })

    it('createPopupUnit method', () => {
        const instance = component.find('ElementPopup').instance();
        const spycreatePopupUnit = jest.spyOn(instance, 'createPopupUnit')
        instance.createPopupUnit(null, null, {}, "2-0", {}, null)
        expect(spycreatePopupUnit).toHaveBeenCalled()
    })


})