import React from 'react';
import { mount } from 'enzyme';
import MultipleColumnContainer from '../../../src/component/MultipleColumnElement/MultipleColumnContainer';
import MultiColumnContainerContext from '../../../src/component/ElementContainer/MultiColumnContext.js';
import { multipleColumnContainer } from "../../../fixtures/multipleColumnContainer";
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import config from "../../../src/config/config.js";

config["elementStatus"] = {};
const middlewares = [thunk];

jest.mock('../../../src/component/ElementSaprator/ElementSaprator.jsx', () => {
    return function () {
        return (<div>null</div>)
    }
});
jest.mock('../../../src/component/tinyMceEditor.js', () => {
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
    slateLockReducer: {
        slateLockInfo: { isLocked: false, userId: 'c5test01' },
    },
    appStore: {
        activeElement: {},
        permissions: [
            "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
            "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
            "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
        ],
        oldImage: "",
        showHideId: "",
        multipleColumnData: [{
            columnId: "urn:pearson:manifest:d9ddbc13-2252-4a2f-8b4d-dbbe03452385",
            columnIndex: "C3",
            containerId: "urn:pearson:manifest:5a3a5bac-bea1-4ff8-a8d3-38de4c15613b"
        }]
    },
    glossaryFootnoteReducer: {
        glossaryFootnoteValue: {}
    },
    toolbarReducer: {
        elemBorderToggle: false
    },
    commentsPanelReducer: {
        allComments: []
    },
    tcmReducer: {
        tcmSnapshot: {}
    },
    elementStatusReducer: {},
    searchReducer: {
        searchTerm: "",
        parentId: "",
        deeplink: true,
        scroll: false,
        scrollTop: 0
    },
    commentSearchReducer: {
        commentSearchTerm: "",
        parentId: "",
        scroll: false,
        scrollTop: 0
    },
    selectionReducer: {
        selection: {
            activeAnimation: true,
            deleteElm: { id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", type: "element-authoredtext", parentUrn: undefined, asideData: undefined, contentUrn: "urn:pearson:entity:da9f3f72-2cc7-4567-8fb9-9a887c360979" },
            element: { id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", type: "element-authoredtext", schema: "http://schemas.pearson.com/wip-authoring/element/1" },
            inputSubType: "NA",
            inputType: "AUTHORED_TEXT",
            operationType: "copy",
            sourceElementIndex: 2,
            sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
            sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6"
        }
    }
}

const mockStore = configureMockStore(middlewares);
let store = mockStore(initialState);
describe('Testing MultipleColumn component', () => {
    let props = {
        swapElement: jest.fn(),
        createPopupUnit: jest.fn()
    };
    let contextValue = {
        activeElement: {},
        showBlocker: jest.fn(),
        permissions: [
            "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
            "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
            "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
        ],
        index: 2,
        element: multipleColumnContainer,
        slateLockInfo: { isLocked: false, userId: 'c5test01' },
        handleCommentspanel: jest.fn(),
        isBlockerActive: false,
        onClickCapture: jest.fn(),
        elementSepratorProps: jest.fn(),
        setActiveElement: jest.fn(),
        handleFocus: jest.fn(),
        handleBlur: jest.fn(),
        onClick: jest.fn(),
        deleteElement: jest.fn(),
    };
    const wrapper = mount(
        <MultiColumnContainerContext.Provider value={contextValue} >
            <Provider store={store}>
                <MultipleColumnContainer {...props} />
            </Provider>
        </MultiColumnContainerContext.Provider>);
    const MultipleColumnContainerInstance = wrapper.find('MultipleColumnContainer').instance();

    it('prepareSwapData method with bodymatter', () => {
        const spyprepareSwapData = jest.spyOn(MultipleColumnContainerInstance, 'prepareSwapData');
        const event = {
            oldDraggableIndex: 0,
            newDraggableIndex: 1
        };
        MultipleColumnContainerInstance.prepareSwapData(event, { columnIndex: 0, contentUrn: multipleColumnContainer.contentUrn });
        expect(spyprepareSwapData).toHaveBeenCalled();
    });

    it('prepareSwapData method without bodymatter', () => {
        contextValue.element.groupeddata.bodymatter = [{
            'groupdata': { 'bodymatter': null }
        }];
        const spyprepareSwapData = jest.spyOn(MultipleColumnContainerInstance, 'prepareSwapData');
        const event = {
            oldDraggableIndex: 0,
            newDraggableIndex: 1
        };
        MultipleColumnContainerInstance.prepareSwapData(event, { columnIndex: 0, contentUrn: multipleColumnContainer.contentUrn });
        expect(spyprepareSwapData).toHaveBeenCalled();
    });
    
    it('handleFocus method', () => {
        const spyhandleFocus = jest.spyOn(MultipleColumnContainerInstance, 'handleFocus');
        const event = {};
        MultipleColumnContainerInstance.handleFocus(event);
        expect(spyhandleFocus).toHaveBeenCalled();
    });

    it('handleFocus method - event testing', () => {
        const spyhandleFocusEvent = jest.spyOn(MultipleColumnContainerInstance, 'handleFocus');
        const event = {
            target: { classList: { contains: () => { return false } } }
        };
        MultipleColumnContainerInstance.handleFocus(event);
        expect(spyhandleFocusEvent).toHaveBeenCalled();
    });

    it('handleFocus method - slate lock testing', () => {
        contextValue.slateLockInfo.isLocked = true;
        config.userId = '';
        const spyhandleFocusSlateLocked = jest.spyOn(MultipleColumnContainerInstance, 'handleFocus');
        const event = {};
        MultipleColumnContainerInstance.handleFocus(event);
        expect(spyhandleFocusSlateLocked).toHaveBeenCalled();
    });

    it('renderContainer method without context', () => {
        const spyrenderContainer = jest.spyOn(MultipleColumnContainerInstance, 'renderContainer');
        let context = {
            'element': {
                'groupeddata': {
                    'bodymatter': null
                }
            }
        };
        MultipleColumnContainerInstance.renderContainer(context);
        expect(spyrenderContainer).toHaveBeenCalled();
    });

    it('renderContainer method with context', () => {
        const spyrenderContainer = jest.spyOn(MultipleColumnContainerInstance, 'renderContainer');
        MultipleColumnContainerInstance.renderContainer(contextValue);
        expect(spyrenderContainer).toHaveBeenCalled();
    });

    it('renderElement method without elements', () => {
        const spyrenderElement = jest.spyOn(MultipleColumnContainerInstance, 'renderElement');
        let parentUrn = {
            mcId: 'urn:pearson:manifest:5a3a5bac-bea1-4ff8-a8d3-38de4c15613b',
            manifestUrn: 'urn:pearson:manifest:d9ddbc13-2252-4a2f-8b4d-dbbe03452385'
        }
        MultipleColumnContainerInstance.renderElement([], parentUrn);
        expect(spyrenderElement).toHaveBeenCalled();
    });

    it('Sortable onStart function testing', () => {
        const instance = wrapper.find('Sortable').at(0).instance();
        instance.props.options.onStart({});
        instance.props.onChange();
    });

    it('Sortable onUpdate function testing', () => {
        const instance = wrapper.find('Sortable').at(0).instance();
        instance.props.options.onUpdate({});
    });

    it('Sortable onUpdate function testing - IF savingInProgress is true', () => {
        config.savingInProgress = true
        const instance = wrapper.find('Sortable').at(0).instance();
        const event = {
            oldDraggableIndex : 0,
            newDraggableIndex : 1,
            preventDefault: jest.fn(),
            stopPropagation: jest.fn()
        }
        instance.props.options.onUpdate(event);
    });

    it('renderElement function - catch block', () => {
        const spyrenderElement = jest.spyOn(MultipleColumnContainerInstance, 'renderElement');
        let parentUrn = {
            mcId: 'urn:pearson:manifest:5a3a5bac-bea1-4ff8-a8d3-38de4c15613b',
            manifestUrn: 'urn:pearson:manifest:d9ddbc13-2252-4a2f-8b4d-dbbe03452385'
        }
        MultipleColumnContainerInstance.renderElement({}, parentUrn);
        expect(spyrenderElement).toThrow();
    });
})