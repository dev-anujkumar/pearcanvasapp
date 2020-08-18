import React from 'react';
import { mount } from 'enzyme';
import MultiColumnContainer from '../../../src/component/MultiColumnElement';
import MultiColumnContainerContext from '../../../src/component/ElementContainer/MultiColumnContext.js'
import {multiColumnContainer} from "../../../fixtures/multiColumnContainer";
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import config from "../../../src/config/config.js"

config["elementStatus"] = {}
const middlewares = [thunk];

jest.mock('../../../src/component/ElementSaprator/ElementSaprator.jsx', () => {
    return function () {
        return (<div>null</div>)
    }
});
jest.mock('../../../src/component/tinyMceEditor.js',()=>{
    return function () {
        return (<div>null</div>)
    }
});
jest.mock('../../../src/component/SlateWrapper/SlateWrapper_Actions.js', () => {
    return {
        swapElement: function () {
            return (<div>null</div>)
        }
    }
});

jest.mock('../../../src/component/ElementContainer/ElementContainer_Actions.js', () => {
    return {
        getElementStatus: function () {
            return (<div>null</div>)
        }
    }
});

let initialState = {
    slateLockReducer : {
        slateLockInfo: { isLocked : false, userId : 'c5test01'},
    },
    appStore : {
        activeElement: {},
        permissions: [
            "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
            "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
            "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
        ],
        oldImage: "",
        showHideId : ""
    },
    glossaryFootnoteReducer : {
        glossaryFootnoteValue : {}
    },
    toolbarReducer : {
        elemBorderToggle : false
    },
    commentsPanelReducer : {
        allComments : []
    },
    tcmReducer:{
        tcmSnapshot:{}
    },
    elementStatusReducer: {}
}

const mockStore = configureMockStore(middlewares)
let store = mockStore(initialState);
describe('Testing MultiColumn component', () => {
    let props = {
        swapElement : jest.fn(),
        createPopupUnit : jest.fn()
    }  
    let contextValue = {
        activeElement: {},
        showBlocker: jest.fn(),
        permissions: [
            "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
            "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
            "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
        ],
        index: 2,
        element: multiColumnContainer,
        slateLockInfo: { isLocked : false, userId : 'c5test01'},
        handleCommentspanel : jest.fn(),
        isBlockerActive : false,
        onClickCapture : jest.fn(),
        elementSeparatorProps : jest.fn(),
        setActiveElement : jest.fn(),
        handleFocus: jest.fn(),
        handleBlur: jest.fn(),
        onClick: jest.fn(),
        deleteElement: jest.fn(),
    }
    const wrapper = mount(
    <MultiColumnContainerContext.Provider value={contextValue} >
        <Provider store={store}>
            <MultiColumnContainer {...props} />
        </Provider>
    </MultiColumnContainerContext.Provider>);
    const MultiColumnContainerInstance = wrapper.find('MultiColumnContainer').instance();

    it('render MultiColumn component ', () => {
        const spyprepareSwapData = jest.spyOn(MultiColumnContainerInstance, 'prepareSwapData')
        const event = {
            oldDraggableIndex : 0,
            newDraggableIndex : 1
        }
        MultiColumnContainerInstance.prepareSwapData(event, {columnIndex: 0, contentUrn: multiColumnContainer.contentUrn});
        expect(spyprepareSwapData).toHaveBeenCalled()
    })
    it("HandleFocus method", () => {
        const spyhandleFocus = jest.spyOn(MultiColumnContainerInstance, 'handleFocus')
        const event = {}
        MultiColumnContainerInstance.handleFocus(event);
        expect(spyhandleFocus).toHaveBeenCalled()
    })
})