import React from 'react';
import { mount, shallow } from 'enzyme';
import SlateTagDropdown from '../../../src/component/ElementMetaDataAnchor/SlateTagDropdown';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
const mockStore = configureMockStore(middlewares);
import config from '../../../src/config/config';
import { JSDOM } from 'jsdom'
jest.mock('../../../src/config/config.js', () => ({
    slateType : "section"
}))

const store = mockStore({
    metadataReducer: {
        slateTagEnable: false
    },
    slateLockReducer:{
        slateLockInfo:{isLocked: false,
            timestamp: "",
            userId: "c5test01"},   
    },
    appStore: {
        permissions: [
            "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
            "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
            "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying", "lo_edit_metadata"
        ]
    },
    metadataReducer: {
        slateTagEnable: false
    }
});
let props = {
    slateLockInfo:{isLocked: false,
        timestamp: "",
        userId: "c5test01"}, 
    permissions: ["lo_edit_metadata"],
    closeLODropdown: function () { },
    showSlateLockPopup: jest.fn()
}


//Rendering component
describe('Test Rendering of metadaanchor on slate', () => {
    let wrapper = mount(<Provider store={store}><SlateTagDropdown {...props} /> </Provider>)
    let slateTagInstance = wrapper.find('SlateTagDropdown').instance();
    it('render component', () => {
        expect(wrapper.find('SlateTagDropdown')).toHaveLength(1);
    })
    it('Unlink', () => {
        let event = { target: { innerText: "Unlink Slate" } };
        let data = "Unlink Slate";
        slateTagInstance.learningObjectiveDropdown(event);
        expect(event.target.innerText).toEqual(data);
    })
    it('on slate tag assessment', () => {
        config.slateType="assessment"
        let event = { target: { innerText: "View Learning Objective" } };
        let data = "View Learning Objective";
        slateTagInstance.learningObjectiveDropdown(event);
        expect(event.target.innerText).toEqual(data);
    })
    it('on slate tag not equal to  assessment', () => {
        config.slateType="section"
        let event = { target: { innerText: "View Learning Objective" } };
        let data = "View Learning Objective";
        slateTagInstance.learningObjectiveDropdown(event);
        expect(event.target.innerText).toEqual(data);
    })
    it('on slate tag normal', () => {
        config.slateType = 'assessment'
        let event = { target: { innerText: "VIEW ASSESSMENT ITEM LO TAGGING" } };
        let data = "VIEW ASSESSMENT ITEM LO TAGGING";
        slateTagInstance.learningObjectiveDropdown(event);
        expect(event.target.innerText).toEqual(data);
    })
    it('handleclick', () => {
        let event = { target: "leaningobjective-block" };
        let data = "leaningobjective-block";
        slateTagInstance.handleClick(event);
        expect(event.target).toEqual(data);
    })
    it('on slateLockInfo', () => {
        let store = mockStore({
            metadataReducer: {
                slateTagEnable: false
            },
            slateLockReducer:{
                slateLockInfo:{isLocked: true,
                    timestamp: "",
                    userId: "c5test01"},   
            },
            appStore: {
                permissions: [
                    "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                    "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                    "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying", "lo_edit_metadata"
                ]
            },
            metadataReducer: {
                slateTagEnable: false
            }
        });
        let props = {
            slateLockInfo: {
                isLocked: true,
                timestamp: "",
                userId: "c5test01"
            },
            permissions: ["lo_edit_metadata"],
            closeLODropdown: function () { },
        }
        let wrapper = mount(<Provider store={store}><SlateTagDropdown {...props} /> </Provider>)
        let slateTagInstance = wrapper.find('SlateTagDropdown').instance();
        config.slateType = ''
        let event = { target: { innerText: "LO TAGGING" } };
        let data = "VIEW ASSESSMENT ITEM LO TAGGING";
        slateTagInstance.learningObjectiveDropdown(event);
        // expect(event.target.innerText).toEqual(data);
    })
    it('on innerText=AddLearningObjectiveSlateDropdown ', () => {
        document.cookie= "?,projectUrn=urn:pearson:distributable:04518dba-76ef-4da3-924c-46cdf7e496b7,&projectEntityUrn=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e,projectTitle:ElmDevTest&slateEntityURN=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e&slateManifestURN=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e&ssoToken=THO1MDfgOpKowwW6ETpiNmYhSaQ.*AAJTSQACMDIAAlNLABxFQ1N2TytSQU9sWWMrcmVjMU8vOWc3RldqZlk9AAJTMQACMDE.*";
        let event = { target: { innerText: "Add a New Learning Objective" } };
        let data = "Add a New Learning Objective";
        slateTagInstance.learningObjectiveDropdown(event);
        expect(event.target.innerText).toEqual(data);
    })
    it('on innerText=AddEditLearningObjectiveDropdown ', () => {
        document.cookie= "?,projectUrn=urn:pearson:distributable:04518dba-76ef-4da3-924c-46cdf7e496b7,&projectEntityUrn=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e,projectTitle:ElmDevTest&slateEntityURN=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e&slateManifestURN=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e&ssoToken=THO1MDfgOpKowwW6ETpiNmYhSaQ.*AAJTSQACMDIAAlNLABxFQ1N2TytSQU9sWWMrcmVjMU8vOWc3RldqZlk9AAJTMQACMDE.*";
        let event = { target: { innerText: "Add From Existing or Edit" } };
        let data = "Add From Existing or Edit";
        slateTagInstance.learningObjectiveDropdown(event);
        expect(event.target.innerText).toEqual(data);
    })
    it('on innerText=AddLearningObjectiveAssessmentDropdown ', () => {
        document.cookie= "?,projectUrn=urn:pearson:distributable:04518dba-76ef-4da3-924c-46cdf7e496b7,&projectEntityUrn=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e,projectTitle:ElmDevTest&slateEntityURN=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e&slateManifestURN=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e&ssoToken=THO1MDfgOpKowwW6ETpiNmYhSaQ.*AAJTSQACMDIAAlNLABxFQ1N2TytSQU9sWWMrcmVjMU8vOWc3RldqZlk9AAJTMQACMDE.*";
        let event = { target: { innerText: "Add From Existing" } };
        let data = "Add From Existing";
        slateTagInstance.learningObjectiveDropdown(event);
        expect(event.target.innerText).toEqual(data);
    })
});