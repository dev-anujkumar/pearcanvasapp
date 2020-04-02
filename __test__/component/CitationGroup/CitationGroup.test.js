import React from 'react'
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import configureMockStore from 'redux-mock-store';
import CitationGroup from '../../../src/component/CitationGroup/CitationGroup';
import { CitationGroupContext } from '../../../src/component/ElementContainer/ElementCitationContext'
import { citationGroupElement } from '../../../fixtures/ElementCitationData';
import { swapElement} from '../../../src/component/SlateWrapper/SlateWrapper_Actions';
import { Provider } from 'react-redux';
jest.mock('../../../src/component/ElementSaprator/ElementSaprator.jsx', () => {
    return function () {
        return (<div>null</div>)
    }
});
const mockStore = configureMockStore(middlewares)

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
    }
}

let store = mockStore(initialState);

describe('Testing CitationGroup component with props', () => {
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
        element: citationGroupElement,
        slateLockInfo: { isLocked : false, userId : 'c5test01'},
        handleCommentspanel : jest.fn(),
        isBlockerActive : false,
        onClickCapture : jest.fn(),
        elementSeparatorProps : jest.fn(),
        setActiveElement : jest.fn(),
        handleFocus: jest.fn(),
        handleBlur: jest.fn(),
        onClick: jest.fn()
    }
    const wrapper = mount(
    <CitationGroupContext.Provider value={contextValue} >
        <Provider store={store}>
            <CitationGroup {...props} />
        </Provider>
    </CitationGroupContext.Provider>);
    const CitationGroupInstance = wrapper.find('CitationGroup').instance();

    it("prepareSwapData method", () => {
        const spyprepareSwapData = jest.spyOn(CitationGroupInstance, 'prepareSwapData')
        const event = {
            oldDraggableIndex : 0,
            newDraggableIndex : 1
        }
        CitationGroupInstance.prepareSwapData(event, citationGroupElement.contentUrn);
        expect(spyprepareSwapData).toHaveBeenCalled()
    })
    it("renderCitationGroupContainer method", () => {
        const spyrenderCitationGroupContainer = jest.spyOn(CitationGroupInstance, 'renderCitationGroupContainer')
        CitationGroupInstance.renderCitationGroupContainer(contextValue);
        expect(spyrenderCitationGroupContainer).toHaveBeenCalled()
    })
    it("renderCitationGroupContainer method", () => {
        const spyrenderCitationGroupContainer = jest.spyOn(CitationGroupInstance, 'renderCitationGroupContainer')
        CitationGroupInstance.renderCitationGroupContainer(contextValue);
        expect(spyrenderCitationGroupContainer).toHaveBeenCalled()
    })
    it("renderCitationElementContainer method", () => {
        const spyrenderCitationElementContainer = jest.spyOn(CitationGroupInstance, 'renderCitationElementContainer')
        CitationGroupInstance.renderCitationElementContainer(contextValue);
        expect(spyrenderCitationElementContainer).toHaveBeenCalled()
    })
    it("renderCitationElementContainer method", () => {
        const spyrenderCitationElementContainer = jest.spyOn(CitationGroupInstance, 'renderCitationElementContainer')
        CitationGroupInstance.renderCitationElementContainer(contextValue);
        expect(spyrenderCitationElementContainer).toHaveBeenCalled()
    })
    it("renderElement method", () => {
        const spyrenderElement = jest.spyOn(CitationGroupInstance, 'renderElement')
        let parentUrn = {
            manifestUrn: contextValue.element.id,
            contentUrn: contextValue.element.contentUrn,
            elementType: contextValue.element.type
        }
        CitationGroupInstance.renderElement(contextValue.element.contents.bodymatter, parentUrn, contextValue.index);
        expect(spyrenderElement).toHaveBeenCalled()
    })
    it("handleFocus method - if block", () => {
        const spyhandleFocus = jest.spyOn(CitationGroupInstance, 'handleFocus')
        let event = {}
        CitationGroupInstance.handleFocus(event);
        expect(spyhandleFocus).toHaveBeenCalled()
    })
})
