import React from 'react';
import { mount } from 'enzyme';
import ElementContainer from './../../../src/component/ElementContainer';
import PageNumberElement from './../../../src/component/SlateWrapper/PageNumberElement';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { comments } from '../../../fixtures/commentPanelData.js'
import thunk from 'redux-thunk';
const middlewares = [thunk];
import wipData from './wipData';

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
            tag: "H1"
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
        allComments: comments
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
    }
});
describe('Test for element container component', () => {
    // let pageNumber = function(isHovered, isPageNumberEnabled, activeElement) {
    //     return <PageNumberElement element={props.element} isHovered={isHovered} isPageNumberEnabled={isPageNumberEnabled} activeElement={activeElement} />;
    // }

    let isHovered = true;
    let isPageNumberEnabled = true;
    let permissions = [];

    const activeElement = {
        elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",
        elementType: "element-authoredtext",
        elementWipType: "element-authoredtext",
        primaryOption: "primary-heading",
        secondaryOption: "secondary-heading-1",
        index: "1",
        tag: "H1"
    };

    let props = {
        element: wipData.paragraph,
         permissions:  [
            "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
            "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
            "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
        ]
    };
    // let permissions =  [
    //     "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
    //     "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
    //     "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
    // ]

    let pageNumber = (isHovered, isPageNumberEnabled, activeElement , permissions) => {
        return <PageNumberElement element={props.element} isHovered={isHovered} isPageNumberEnabled={isPageNumberEnabled} activeElement={activeElement} permissions={props.permissions}/>;
    }

    let seprator = (index, firstOne, parentUrn, asideData, outerAsideIndex) => {
        return []
    }

    let elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
            {/* (isHovered, isPageNumberEnabled, activeElement) => (
                <PageNumberElement element={props.element} isHovered={isHovered} isPageNumberEnabled={isPageNumberEnabled} activeElement={activeElement} />
            ) */}
        </ElementContainer></Provider>);
    it('Render element container ', () => {

        props = {
            element: wipData.opener,
            permissions: []
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.pullquote,
            permissions: []
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.list,
            permissions: []
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.figure,
            permissions: []
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.table,
            permissions: []
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.mathImage,
            permissions: []
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.equation,
            permissions: []
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.codeEditor,
            permissions: []
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.video,
            permissions: []
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        // props = {
        //     element: wipData.audio
        // };
        // elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" children={pageNumber}>
        // </ElementContainer></Provider>);

        props = {
            element: wipData.assessment,
            permissions: []
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.interactive,
            permissions: []
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.smartLink,
            permissions: []
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.showHide,
            permissions: []
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.popUp,
            permissions: []
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.assessmentSlate,
            permissions: []
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.aside,
            permissions: []
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.workedExample,
            permissions: []
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.lo,
            permissions: []
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.ma,
            permissions: []
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);
    })

    // elementContainer.setState({
    //     popup: true
    // });

    const elementContainerInstance = elementContainer.find('ElementContainer').instance();

    xit('delete element', () => {
        elementContainerInstance.deleteElement();
    });

    xit('onClick Event', () => {
        // elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false">
        //     (isHovered, isPageNumberEnabled, activeElement) => (
        //         <PageNumberElement element={props.element} isHovered={isHovered} isPageNumberEnabled={isPageNumberEnabled} activeElement={activeElement} />
        //     )
        // </ElementContainer></Provider>);
        // elementContainerInstance.find('span.add-comment').simulate('click');
        elementContainerInstance.handleFocus();
        elementContainerInstance.find('span#close-container').simulate('click');
    })

    xdescribe('Testing action function with props', () => {
        // let elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false">
        //     (isHovered, isPageNumberEnabled, activeElement) => (
        //         <PageNumberElement element={props.element} isHovered={isHovered} isPageNumberEnabled={isPageNumberEnabled} activeElement={activeElement} />
        //     )
        // </ElementContainer></Provider>);
        const elementContainerInstance = elementContainer.find('ElementContainer').instance();
        it('renders saveNewComment ', () => {
            elementContainerInstance.saveNewComment();
        });
        it('renders handleCommentPanel ', () => {
            elementContainerInstance.handleCommentPanel();
        });

        it('renders handle popup toggle ', () => {
            elementContainer.setState({
                popup: true
            });
            
        let target = {
            // target: {
                getAttribute: function(dataValue) {
                    return true;
                }
            // }
        }
            elementContainerInstance.handleCommentPopup(true);
        });

    })
});
