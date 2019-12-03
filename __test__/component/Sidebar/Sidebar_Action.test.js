import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import slateLevelData from './slateData';
import slateData from '../../../fixtures/SidebarTestData'
import * as sidebarAction from '../../../src/component/Sidebar/Sidebar_Action';
import { spy, stub } from 'sinon';
const callback = new stub();
jest.mock('../../../src/constants/utility.js', () => ({
    sendDataToIframe: jest.fn()
}))
jest.mock('../../../src/config/config.js', () => ({
    slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
    slateEntityURN: "urn:pearson:entity:2b03e70f-8730-451b-9f9a-b496b6d91c9e",
    projectUrn: "urn:pearson:distributable:977c95a8-e16a-413c-bfd0-788fd2a3698d",
    projectEntityUrn: "urn:pearson:entity:3d9363f1-36bb-47ea-8842-9b142027692c",
    REACT_APP_API_URL: "https://10.11.7.24:8443/cypress-api/",
    ssoToken: "IZaFs6qIbKAo1yX0WaRCz6fagzA.*AAJTSQACMDIAAlNLABw5WUNuT3h6MEN0OHRFRUlEZUxFamxQa1EyNm89AAJTMQACMDE.*"
}))

const initialState = {
    appStore: {
        slateLevelData: slateData,
        activeElement: {
            elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a",
            elementType: "element-authoredtext",
            elementWipType: "element-authoredtext",
            index: 1,
            primaryOption: "primary-paragraph",
            secondaryOption: "secondary-paragraph",
            tag: "P",
            toolbar: []
        },
        permissions: [
            "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
            "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
            "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
        ]
    },
}
const initialState2 = {
    appStore: {
        slateLevelData: slateData,
        activeElement: {
            elementId: "urn:pearson:work:fa8ebea3-d9ba-4aec-8658-2f944841404a",
            elementType: "element-assessment",
            elementWipType: "figure",
            index: 3,
            primaryOption: "primary-single-assessment",
            secondaryOption: "secondary-single-assessment-cite",
            tag: "Qu",
            toolbar:["bold", "italic", "underline", "strikethrough", "clearformatting", "increaseindent", "decreaseindent", "footnote", "glossary", "orderedlist", "unorderedlist", "mathml", "chemml", "inlinecode", "superscript", "subscript", "specialcharactor", "undo", "redo", "assetpopover", "slatetag"]
        },
        permissions: [
            "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
            "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
            "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
        ]
    },
}
const initialState3 = {
    appStore: {
        slateLevelData: slateData,
        activeElement: {
            elementId: "urn:pearson:work:be34d78e-1638-4fcc-8511-5db7a3d4b395",
            elementType: "figure",
            elementWipType: "figure",
            index: 4,
            longDesc: "",
            primaryOption: "primary-image-figure",
            secondaryOption: "secondary-image-figure-width",
            tag: "Fg",
            toolbar: ["assetpopover", "decreaseindent", "glossary"]   
        },
        permissions: [
            "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
            "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
            "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
        ]
    },
}
describe('Test convertElement- paragraph', () => {
   let store = mockStore(() => initialState);
    it('Test Convert Element', () => {
        store = mockStore(() => initialState);
        let elementData = {
            elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a",
            elementType: "element-authoredtext",
            labelText: "H1",
            primaryOption: "primary-heading",
            secondaryOption: "secondary-heading-1",
            toolbar: ["bold", "underline", "strikethrough", "orderedlist", "unorderedlist", "increaseindent", "decreaseindent", "glossary", "assetpopover", "slatetag", "redo"]
        }
        let store = mockStore(() => initialState);
        const spyconversionElement = jest.spyOn(sidebarAction, 'conversionElement')
        store.dispatch(sidebarAction.conversionElement(elementData));
        expect(spyconversionElement).toHaveBeenCalled()
        spyconversionElement.mockClear()

    });
    it('Test handleElementConversion -else case', () => {
        store = mockStore(() => initialState);
        let elementData = {
            elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
            elementType: "element-authoredtext",
            labelText: "H1",
            primaryOption: "primary-heading",
            secondaryOption: "secondary-heading-1",
            toolbar: ["bold", "underline", "strikethrough", "orderedlist", "unorderedlist", "increaseindent", "decreaseindent", "glossary", "assetpopover", "slatetag", "redo"]
        }
        let store = mockStore(() => initialState);

        const spyconversionElement = jest.spyOn(sidebarAction, 'conversionElement')
        store.dispatch(sidebarAction.conversionElement(elementData));
        expect(spyconversionElement).toHaveBeenCalled()
        spyconversionElement.mockClear()
    });
});
describe('Test convertElement- singleAssessment', () => {
    let store = mockStore(() => initialState2);
     it('Test convertElement  -assessment type', () => {
        store = mockStore(() => initialState2);
        let newData = {
            elementId: "urn:pearson:work:fa8ebea3-d9ba-4aec-8658-2f944841404a",
            elementType: "element-assessment",
            labelText: "Qu",
            primaryOption: "primary-single-assessment",
            secondaryOption: "secondary-single-assessment-tdx",
            toolbar: ["bold", "italic", "underline", "strikethrough", "clearformatting", "increaseindent", "decreaseindent", "footnote", "glossary", "orderedlist", "unorderedlist", "mathml", "chemml", "inlinecode", "superscript", "subscript", "specialcharactor", "undo", "redo", "assetpopover", "slatetag"]
        }
        // let assessmentDiv = document.createElement('div');
        // assessmentDiv.setAttribute('data-id', 'urn:pearson:work:fa8ebea3-d9ba-4aec-8658-2f944841404a')
        // let usageTypeSpan = document.createElement('span');
        // usageTypeSpan.className = 'singleAssessment_Dropdown_currentLabel';
        // usageTypeSpan.innerText = 'Quiz'
        // assessmentDiv.appendChild(usageTypeSpan)
        // document.body.appendChild(assessmentDiv)
        let store = mockStore(() => initialState2);
        const spyconversionElement = jest.spyOn(sidebarAction, 'conversionElement')
        store.dispatch(sidebarAction.conversionElement(newData));
        expect(spyconversionElement).toHaveBeenCalled()
        spyconversionElement.mockClear()
    });
});
describe('Test convertElement- figure-', () => {
    let store = mockStore(() => initialState3);
     it('Test convertElement  -figure', () => {
        store = mockStore(() => initialState3);
         let newData = {
             elementId: "urn:pearson:work:be34d78e-1638-4fcc-8511-5db7a3d4b395",
             elementType: "figure",
             labelText: "TB",
             primaryOption: "primary-image-table",
             secondaryOption: "secondary-image-table-half",
             toolbar: ["assetpopover", "decreaseindent", "glossary"]
         }
        let store = mockStore(() => initialState3);
        const spyconversionElement = jest.spyOn(sidebarAction, 'conversionElement')
        store.dispatch(sidebarAction.conversionElement(newData));
        expect(spyconversionElement).toHaveBeenCalled()
        spyconversionElement.mockClear()
    });
 });
