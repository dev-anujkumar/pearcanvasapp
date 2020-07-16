import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import ElementShowHide from '../../../src/component/ElementShowHide';
import {showHide} from '../../../fixtures/ElementSHowHideData'
import ElementContainerContext from '../../../src/component/ElementContainer/ElementContainerContext'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
    elementStatusReducer: {
        currentElement: { 'urn:pearson:work:32e659c2-e0bb-46e8-9605-b8433aa3836c': "wip" }
    }
});

jest.mock('../../../src/component/tinyMceEditor.js',()=>{
    return function () {
        return (<div>null</div>)
    }
})
jest.mock('../../../src/component/ElementContainer/ElementContainer_Actions', () => {
    return {
        createShowHideElement: function () {
            return {
                    type: "CREATE_SHOW_HIDE_ELEMENT",
                    payload: null
            }
        },

        deleteShowHideUnit:function(){
            return {
                type: "DELETE_SHOW_HIDE_ELEMENT",
                payload:null
            }
        }
    }
    
})

describe('Testing Element Show Hide component', () => {
    let props = {
        model:{},
        index:"" ,
        slateLockInfo: {
            isLocked: false,
            userId: 'c5Test01'
        },
        handleFocus: function(){},
        permissions: [
            "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
            "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
            "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
        ],
        handleBlur: jest.fn(),
        handleFocus: jest.fn(),
        accessDenied: jest.fn(),
        element:showHide,
        createShowHideElement:jest.fn()
    }
    const component = mount(<ElementContainerContext.Provider value={{
        onListSelect:  jest.fn(),
        showHideId: "urn:pearson:manifest:1aa555b9-8fa4-480e-a6b2-40c46315a8eb",
        createShowHideElement:  jest.fn(),
        deleteShowHideUnit:jest.fn(),
         activeElement: {
            elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",
            elementType: "element-authoredtext",
            elementWipType: "element-authoredtext",
            primaryOption: "primary-heading",
            secondaryOption: "secondary-heading-1",
            index: "1-0",
            tag: "H1",
            toolbar: ['bold']
        },
        permissions: [
            "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
            "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
            "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
        ],
        handleFocus:  jest.fn(),
        handleBlur:  jest.fn(),
        index: 1,
        element:showHide,
        onClick:  jest.fn(),
        openAssetPopoverPopUp:  jest.fn(),
        openGlossaryFootnotePopUp:  jest.fn(),
        elementStatus: {
            currentElement: { 'urn:pearson:work:32e659c2-e0bb-46e8-9605-b8433aa3836c': "wip" }
        },
        elementStatusReducer: {
            currentElement: { 'urn:pearson:work:32e659c2-e0bb-46e8-9605-b8433aa3836c': "wip" }
        },
        getElementStatus:jest.fn(),
    }}><ElementShowHide {...props} /></ElementContainerContext.Provider>)
    
    it('renders without crashing', () => {
        expect(component).toHaveLength(1);
        let instance = component.instance(); 
        expect(instance).toBeDefined();
    })

    it('Test-createShowHideElement  function', () => {
        let type = "show";
        let index= "0-1-1"
        let elementShowHideId = "urn:pearson:work:32e659c2-e0bb-46e8-9605-b8433aa3836c"
        let showHideinstance =  component.instance(); 
        const spyCreateShowHideElement = jest.spyOn(showHideinstance, 'createShowHideElement')
        showHideinstance.createShowHideElement(type,index,elementShowHideId);
        showHideinstance.forceUpdate();
        expect(spyCreateShowHideElement).toHaveBeenCalled()
    });

    it('Test-activeShowHide   function', () => {
        let e = {
            currentTarget:{
                closest:jest.fn()
            }
        }
        let showHideinstance =  component.instance(); 
        const spyFunc = jest.fn();
        //spyFunc.mockReturnValueOnce(true);
        Object.defineProperty(global.document, 'querySelector', { value: spyFunc });
        const spyCreateShowHideElement = jest.spyOn(showHideinstance, 'activeShowHide')
        showHideinstance.activeShowHide(e);
        showHideinstance.forceUpdate();
        expect(spyCreateShowHideElement).toHaveBeenCalled()
    });

    it('Test-deleteShowHideUnit    function', () => {
        let id = "urn:pearson:work:32e659c2-e0bb-46e8-9605-b8433aa3836c",
        type = "show",
        index= "0-1-1",
        elementShowHideId = "urn:pearson:work:32e659c2-e0bb-46e8-9605-b8433aa3836c",
        contentUrn = "urn:pearson:entity:55f6b4ca-ab08-45cb-804d-8f5799ed3a46",
        eleIndex = 1,
        parentId = "urn:pearson:manifest:1aa555b9-8fa4-480e-a6b2-40c46315a8eb";
        let showHideinstance =  component.instance(); 
        const spyCreateShowHideElement = jest.spyOn(showHideinstance, 'deleteShowHideUnit')
        showHideinstance.deleteShowHideUnit(type,index,elementShowHideId);
        showHideinstance.forceUpdate();
        expect(spyCreateShowHideElement).toHaveBeenCalled()
    });

    it('Test-showHideCallBack  function ------ If condition', () => {
        let status = "create",
        index= "0-1-1"
        let showHideinstance =  component.instance(); 
        const spyCreateShowHideElement = jest.spyOn(showHideinstance, 'showHideCallBack')
        showHideinstance.showHideCallBack(status,index);
        showHideinstance.forceUpdate();
        expect(spyCreateShowHideElement).toHaveBeenCalled()
    });

    it('Test-showHideCallBack  function ------ Else condition', () => {
        let status = "delete",
        index= "0-1-1"
        let showHideinstance =  component.instance(); 
        const spyCreateShowHideElement = jest.spyOn(showHideinstance, 'showHideCallBack')
        showHideinstance.showHideCallBack(status,index);
        showHideinstance.forceUpdate();
        expect(spyCreateShowHideElement).toHaveBeenCalled()
    });
})
