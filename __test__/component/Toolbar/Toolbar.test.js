import React from 'react'
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import Toolbar from '../../../src/component/Toolbar/'

const mockStore = configureMockStore(middlewares);
const store = mockStore({
    toolbarReducer: {
        elemBorderToggle: true
    },
    metadataReducer: {
        currentSlateLOData: {}
    },
    appStore: {
        permissions: [
            "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
            "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
            "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
        ]
    },
    audioReducer:{
        addAudio: false,
        openAudio: false
    },
    slateLockReducer: {
        slateLockInfo: {
            isLocked: false,
            timestamp: "",
            userId: ""
        }
    }
});

let  wrapper = mount(<Provider store={store}><Toolbar /></Provider>);

beforeEach(() => {
    wrapper = mount(<Provider store={store}><Toolbar /></Provider>);
})

xdescribe('Toolbar testing', () => {
    it('Should have 2 Toolbar switch buttons', () => {
        expect(wrapper.find('.switch')).toHaveLength(2)
    }),

    it('Should have 2 input for Toolbar', () => {
        expect(wrapper.find('input')).toHaveLength(2)
    })
})