import React from 'react';
import { mount } from 'enzyme';
import OpenerElement from '../../../src/component/OpenerElement';
import { openerElementData } from '../../../fixtures/OpenerElementData'
import config from '../../../src/config/config';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
    appStore: {
        permissions: [
            "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
            "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
            "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
        ]
    },

});

describe('Testing Opener component with props', () => {
    const props = {
        slateLockInfo: {
            isLocked: false,
            userId: 'c5Test01'
        },
        model : openerElementData.html,
        onClick : ()=>{},
        permissions: []
    }
    it('Simulating click event to open label dropdown', () => {
        const openerComponent = mount( <Provider store={store}><OpenerElement {...props} /></Provider> )
        openerComponent.find('div.element-dropdown-title.label-content').simulate('click');
        openerComponent.find('ul.element-dropdown-content>li:first-child').simulate('click');
    })
    it('Changing input number', () => {
        const openerComponent = mount( <Provider store={store}><OpenerElement {...props} /></Provider> )
        openerComponent.find('input.element-dropdown-title.opener-number').simulate('change', { target: { value: '1234567890!!!' } });
    })
    describe('Simulating keyPress event on input number', () => {
        const openerComponent = mount( <Provider store={store}><OpenerElement  /></Provider> )
        it('Simulating keyPress event on input number - alphanumeric input', () => {
            openerComponent.find('input.element-dropdown-title.opener-number').simulate('keypress', { which: 48 });
        })
        it('Simulating keyPress event on input number - special character input', () => {
            openerComponent.find('input.element-dropdown-title.opener-number').simulate('keypress', { which: 91 });
        })
    })
    it('Changing input title', () => {
        const openerComponent = mount( <Provider store={store}><OpenerElement {...props} /></Provider> )
        openerComponent.find('input.element-dropdown-title.opener-title').simulate('change', { target: { value: '1234567890!!!' } });
    })
    it('Simulating alfresco click without alfresco location', () =>{
        const openerComponent = mount( <Provider store={store}><OpenerElement {...props} /></Provider> )
        openerComponent.find('OpenerElement').instance().handleC2MediaClick({target : {tagName : 'b'}}) 
    })
    it('Simulating alfresco click with alfresco location', () =>{
        const openerComponent = mount( <Provider store={store}><OpenerElement {...props} /></Provider> )
        config.alfrescoMetaData = {nodeRef : {}}
        openerComponent.find('OpenerElement').instance().handleC2MediaClick({target : {tagName : 'b'}}) 
    })
    it('Alfresco Data Handling', () => {
        const openerComponent = mount(<Provider store={store}><OpenerElement {...props} /></Provider>, { attachTo: document.body })
        openerComponent.find('OpenerElement').instance().dataFromAlfresco({ assetType: "image" })
    })
})
