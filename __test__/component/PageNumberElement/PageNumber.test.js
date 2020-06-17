import React from 'react';
import ReactDOM from 'react-dom';
require('../../../src/component/ListElement/polyfills.js');
import PageNumberElement from '../../../src/component/SlateWrapper/PageNumberElement.jsx';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { spy, stub } from 'sinon';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
    appStore: {
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
        ]
    },
    slateLockReducer: {
        slateLockInfo: {
            isLocked: false,
            timestamp: "",
            userId: ""
        }
    },
    commentsPanelReducer: {
        allComments: []
    },
    toolbarReducer: {
        elemBorderToggle: "true"
    },
    metadataReducer: {
        currentSlateLOData: ""
    },
    learningToolReducer: {
        shouldHitApi: false,
        learningToolTypeValue: '',
        apiResponse: [],
        showErrorMsg: true, //should be false
        showLTBody: false,
        learningTypeSelected: false,
        showDisFilterValues: false,
        selectedResultFormApi: '',
        resultIsSelected: false,
        toggleLT: false,
        linkButtonDisable: true,
        apiResponseForDis: [],
        learningToolDisValue: '',
        numberOfRows: 25
    },
    glossaryFootnoteReducer:{
        glossaryFootnoteValue: { "type": "", "popUpStatus": false }
    },
    tcmReducer:{
        tcmSnapshot:{}
    }
});
describe('Testing <PageNumberElement> Component', () => {    
    let nodeRef = null;
    let spy = sinon.spy();
    const updatePageNumber = new stub();
    let props = {
        element: {},
        isHovered: {},
        isPageNumberEnabled: {},
        activeElement: {},
        permissions: ['edit_print_page_no'],
        updatePageNumber: {updatePageNumber},
        pageNumberData:[]
    }
  
    const wrapper = mount(<Provider store={store}><PageNumberElement {...props}  updatePageNumber= {updatePageNumber}/></Provider>, { attachTo: document.body });
    const wrapperInstance = wrapper.find('PageNumberElement').instance();
    let parentDiv = document.createElement('div')
    parentDiv.classList.add('pageNumberBox')
    parentDiv.classList.add('greenBorder')
    let targetElem = document.createElement('input')
    parentDiv.appendChild(targetElem)

    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><PageNumberElement {...props} /></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
        
    })
    xtest('should call onChange on input', () => {
        const event = {
            preventDefault() { },
            target: { value: '123' }
        };
        wrapper.find('input.textBox').simulate('change', event);
        wrapperInstance.forceUpdate();
        wrapper.update();
        expect(wrapperInstance.state.inputValue).toBe('123');
    })
    test('should update page number', () => {
        const event = {
            preventDefault() { },
            currentTarget: targetElem
        }
        wrapper.find('input.textBox').simulate('blur', event);
        wrapperInstance.forceUpdate();
        wrapper.update();
        expect(wrapperInstance.state.loader).toBe(false);
    })
    test('input should be clicked', () => {
        const event = {
            stopPropagation() { },
            currentTarget: targetElem
        }
        wrapperInstance.setState({ loader: false });
        wrapperInstance.forceUpdate();
        wrapper.update();
        wrapper.find('input.textBox').simulate('click', event)
        expect(parentDiv.classList.contains('greenBorder')).toBe(true)
    })
    test('input should prevent enter', () => {
        const event = {
            preventDefault() { },
            which: 13
        }
        wrapper.find('input.textBox').simulate('keyPress', event)
        expect(parentDiv.classList.contains('greenBorder')).toBe(true)
    })
    test('should hover on mouseover', () => {
        wrapper.setProps({ activeElement: undefined });
        wrapper.setProps({ isHovered: true });
        wrapper.setProps({ isPageNumberEnabled: true });
        wrapperInstance.forceUpdate();
        wrapper.update();
        expect(wrapper.find('div.pageNumberCover').hasClass('hoverNumberCover')).toBe(false)
    })
    test('PageNumber should get removed', () => {
      let e = ''
      wrapperInstance.removePageNumber(e)
      expect(wrapperInstance.state.inputValue).toBe('');
    })
})