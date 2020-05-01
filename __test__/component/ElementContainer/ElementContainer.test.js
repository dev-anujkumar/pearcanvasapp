import React from 'react';
import { mount } from 'enzyme';
import ElementContainer from './../../../src/component/ElementContainer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { comments } from '../../../fixtures/commentPanelData.js'
import thunk from 'redux-thunk';
const middlewares = [thunk];
import wipData from './wipData';
jest.mock('./../../../src/component/SlateWrapper/PageNumberElement', () => {
    return (<div>null</div>)
})
jest.mock('./../../../src/component/ElementSaprator', () => {
    return (<div>null</div>)
})
jest.mock('./../../../src/js/c2_assessment_module', () => {
    return function (){
        return (<div>null</div>)
    }
})
jest.mock('./../../../src/js/c2_media_module', () => {
    return function (){
        return (<div>null</div>)
    }
})
jest.mock('./../../../src/constants/utility.js', () => ({
    sendDataToIframe: jest.fn(),
    hasReviewerRole: jest.fn(),
    guid: jest.fn(),
    encodeHTMLInWiris: jest.fn(),
    matchHTMLwithRegex:jest.fn()
}))
jest.mock('./../../../src/config/config.js', () => ({
    colors : ["#000000", "#003057", "#505759", "#005A70", "#006128"],
    releaseCallCount :0,
    savingInProgress:false
}))
jest.mock('./../../../src/component/CanvasWrapper/TCM_Integration_Actions.js', () => {
    return { loadTrackChanges: jest.fn()}
})
jest.mock('./../../../src/component/AssetPopover/openApoFunction.js', () => {
return  { 
    authorAssetPopOver: jest.fn()
}
})
jest.mock('./../../../src/component/ElementContainer/UpdateElements.js', () => {
    return {
        createOpenerElementData: () => {
            return jest.fn()
        },
        createUpdatedData: () => {
            return jest.fn()
        }
    }
})
jest.mock('./../../../src/component/ElementContainer/ElementContainer_Actions.js', () => {
    return { 
        prepareDataForTcmUpdate: jest.fn() ,
        deleteElement: ()=>{
            return jest.fn()
        },
        updateElement: () => {
            return jest.fn()
        }
    }
})
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
    },
    glossaryFootnoteReducer:{
        glossaryFootnoteValue: { "type": "", "popUpStatus": false }
    },
});
describe('Test for element container component', () => {
    it('Render Element Container without crashing ', () => {      
    let props = {
        element: wipData.paragraph,
         permissions:  [
            "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
            "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
            "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
        ],
        showBlocker: jest.fn(),
    };

    let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
    expect(elementContainer).toHaveLength(1);
    const elementContainerInstance = elementContainer.instance();
    expect(elementContainerInstance).toBeDefined();
    })
     
    describe('Test- renderElement function for Different Elements ', () => {
        let props = {
            element: wipData.opener,
            permissions: [],
            showBlocker: jest.fn(),
            index: 0,
            elementId: "urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y",
            updateElement: jest.fn()
        };
        let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
        const elementContainerInstance = elementContainer.find('ElementContainer').instance();

        it('Render Element Container ----->Opener Element', () => {
            expect(elementContainer).toHaveLength(1);
            elementContainerInstance.setState({
                activeColorIndex: 0,
                isOpener: true

            })
            elementContainerInstance.forceUpdate();
            elementContainer.update();
            expect(elementContainerInstance).toBeDefined();
        }) 
        it('Render Element Container ----->BlockQuote-Pullquote', () => {

            let props = {
                element: wipData.pullquote,
                permissions: [],
                activeElement: {
                    elementId: "urn:pearson:work:5d489bfe-ef76-4193-b07a-62d9d393fe93",
                    elementType: "element-authoredtext",
                    elementWipType: "element-blockfeature",
                    index: 2,
                    primaryOption: "primary-blockquote",
                    secondaryOption: "secondary-pullquote",
                    tag: "BQ",
                    toolbar: ["bold", "underline", "strikethrough", "orderedlist", "unorderedlist", "glossary", "slatetag"]
                }
            }; 
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            // const elementDiv1 = document.createElement('div');
            // elementDiv1.setAttribute('id', "cypress-2");
            // elementDiv1.innerHTML='<h3 class="pullQuoteNumeroUno">Hello Test</h3>' ;
            // elementDiv1.innerText="Hello Test"
            // document.body.appendChild(elementDiv1)
            expect(elementContainer).toHaveLength(1);
            expect(elementContainerInstance).toBeDefined();
            // elementContainerInstance.handleBlur();
            // expect(spyhandleBlur).toHaveBeenCalled()
            // spyhandleBlur.mockClear()
        })
        it('Render Element Container ----->List Element', () => {
            let props = {
                element: wipData.list,
                permissions: []
            };
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            expect(elementContainer).toHaveLength(1);
            expect(elementContainerInstance).toBeDefined();
        })
        it('Render Element Container ----->Figure Element-Image', () => {
            let props = {
                element: wipData.figure,
                permissions: []
            };
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            expect(elementContainer).toHaveLength(1);
            expect(elementContainerInstance).toBeDefined();
            const spyhandleBlur  = jest.spyOn(elementContainerInstance, 'handleBlur') 
            elementContainerInstance.handleBlur();
            expect(spyhandleBlur).toHaveBeenCalled()
            spyhandleBlur.mockClear()
        })
        it('Render Element Container ----->Figure Element-TableImage', () => {
            let props = {
                element: wipData.table,
                permissions: []
            };
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            expect(elementContainer).toHaveLength(1);
            expect(elementContainerInstance).toBeDefined();
        })
        it('Render Element Container ----->Figure Element-MathImage', () => {
            let props = {
                element: wipData.mathImage,
                permissions: []
            };
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            expect(elementContainer).toHaveLength(1);
            expect(elementContainerInstance).toBeDefined();
        })
        it('Render Element Container ----->Figure Element-MathML', () => {
            let props = {
                element: wipData.equation,
                permissions: []
            };
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            expect(elementContainer).toHaveLength(1);
            expect(elementContainerInstance).toBeDefined();
            const spyhandleBlur  = jest.spyOn(elementContainerInstance, 'handleBlur') 
            elementContainerInstance.handleBlur();
            expect(spyhandleBlur).toHaveBeenCalled()
            spyhandleBlur.mockClear()
        })
        it('Render Element Container ----->Figure Element-BlockCodeEditor', () => {
            let props = {
                element: wipData.codeEditor,
                permissions: []
            };
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            expect(elementContainer).toHaveLength(1);
            expect(elementContainerInstance).toBeDefined();
            const spyhandleBlur  = jest.spyOn(elementContainerInstance, 'handleBlur') 
            elementContainerInstance.handleBlur();
            expect(spyhandleBlur).toHaveBeenCalled()
            spyhandleBlur.mockClear()
        })
        it('Render Element Container ----->Element-AuthoredText-List', () => {
            let props = {
                element: wipData.list,
                permissions: []
            };
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            expect(elementContainer).toHaveLength(1);
            expect(elementContainerInstance).toBeDefined();
        })
        it('Render Element Container ----->AudioVideo Element', () => {
            let props = {
                element: wipData.video,
                permissions: []
            };
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            expect(elementContainer).toHaveLength(1);
            expect(elementContainerInstance).toBeDefined();
            const spyhandleBlur  = jest.spyOn(elementContainerInstance, 'handleBlur') 
            elementContainerInstance.handleBlur();
            expect(spyhandleBlur).toHaveBeenCalled()
            spyhandleBlur.mockClear()
        })
        it('Render Element Container ----->SingleAssessment Element', () => {
            let props = {
                element: wipData.assessment,
                permissions: []
            };
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            expect(elementContainer).toHaveLength(1);
            expect(elementContainerInstance).toBeDefined();
            const spyhandleBlur  = jest.spyOn(elementContainerInstance, 'handleBlur') 
            elementContainerInstance.handleBlur();
            expect(spyhandleBlur).toHaveBeenCalled()
            spyhandleBlur.mockClear()
        })
        it('Render Element Container ----->Interactive Element-MMI', () => {
            let props = {
                element: wipData.interactive,
                permissions: []
            };
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            expect(elementContainer).toHaveLength(1);
            expect(elementContainerInstance).toBeDefined();
            const spyhandleBlur  = jest.spyOn(elementContainerInstance, 'handleBlur') 
            elementContainerInstance.handleBlur();
            expect(spyhandleBlur).toHaveBeenCalled()
            spyhandleBlur.mockClear()
        })
        it('Render Element Container ----->Interactive Element-SmartLink', () => {
            let props = {
                element: wipData.smartLink,
                permissions: []
            };
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            expect(elementContainer).toHaveLength(1);
            expect(elementContainerInstance).toBeDefined();
        })
        it('Render Element Container ----->Interactive Element-ShowHide', () => {
            let props = {
                element: wipData.showHide,
                permissions: []
            };
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            expect(elementContainer).toHaveLength(1);
            expect(elementContainerInstance).toBeDefined();
        })
        it('Render Element Container ----->Interactive Element-Popup', () => {
            let props = {
                element: wipData.popUp,
                permissions: []
            };
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            expect(elementContainer).toHaveLength(1);
            expect(elementContainerInstance).toBeDefined();
        })
        it('Render Element Container ----->AssessmentSlate', () => {
            let props = {
                element: wipData.assessmentSlate,
                permissions: [],
                updateElement: jest.fn()
            };
            let assessmentData = {
                id: "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
                format: 'tdx',
                usageType: 'Quiz',
                title: 'Assessment-Title',
            }
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            expect(elementContainer).toHaveLength(1);
            expect(elementContainerInstance).toBeDefined();
            const spyhandleBlurAssessmentSlate  = jest.spyOn(elementContainerInstance, 'handleBlurAssessmentSlate') 
            elementContainerInstance.handleBlurAssessmentSlate(assessmentData);
            expect(spyhandleBlurAssessmentSlate).toHaveBeenCalledWith(assessmentData)
            spyhandleBlurAssessmentSlate.mockClear()
        })
        it('Render Element Container ----->AsideContainer', () => {
            let props = {
                element: wipData.aside,
                permissions: [],
                elemBorderToggle: true
            };
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            expect(elementContainer).toHaveLength(1);
            expect(elementContainerInstance).toBeDefined(); 
        })
        it('Render Element Container ----->WorkedExample', () => {
            let props = {
                element: wipData.workedExample,
                permissions: []
            };
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            expect(elementContainer).toHaveLength(1);
            expect(elementContainerInstance).toBeDefined();
        })
        it('Render Element Container ----->Learning Objective Item', () => {
            let props = {
                element: wipData.elementLO,
                permissions: []
            };
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            expect(elementContainer).toHaveLength(1);
            expect(elementContainerInstance).toBeDefined();
        })
        it('Render Element Container ----->Metadata Anchor', () => {
            let props = {
                element: wipData.lo,
                permissions: []
            };
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            expect(elementContainer).toHaveLength(1);
            expect(elementContainerInstance).toBeDefined();
        })
        it('Render Element Container ----->Metadata Anchor-LO list', () => {
            let props = {
                element: wipData.ma,
                permissions: []
            };
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            expect(elementContainer).toHaveLength(1);
            expect(elementContainerInstance).toBeDefined();
        })
    })
    describe('Test- Add Comment Functions', () => {
        let props = {
            element: wipData.paragraph,
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ],
            showBlocker: jest.fn(),
            isBlockerActive: true,
            addComment: jest.fn(),
            asideData: {},
            parentUrn:"urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464"
        };
        let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
        const elementContainerInstance = elementContainer.find('ElementContainer').instance();
        it('Test-handleCommentPopup Function', () => {
            const spyhandleCommentPopup = jest.spyOn(elementContainerInstance, 'handleCommentPopup')
            elementContainerInstance.handleCommentPopup(true);
            elementContainerInstance.forceUpdate();
            elementContainer.update();
            expect(spyhandleCommentPopup).toHaveBeenCalledWith(true)
            expect(elementContainerInstance.state.popup).toBe(true)
            expect(elementContainerInstance.state.showDeleteElemPopup).toBe(false)
            expect(elementContainerInstance.state.comment).toBe("")
            spyhandleCommentPopup.mockClear()
        })
        it('Test-handleCommentChange  Function', () => {
            let newComment = "sampleComment";
            const spyhandleCommentChange = jest.spyOn(elementContainerInstance, 'handleCommentChange')
            elementContainerInstance.handleCommentChange(newComment);
            elementContainerInstance.forceUpdate();
            elementContainer.update();
            expect(spyhandleCommentChange).toHaveBeenCalledWith(newComment)
            expect(elementContainerInstance.state.comment).toBe(newComment)
            spyhandleCommentChange.mockClear()
        })
        it('Test-saveNewComment   Function', () => {
            let newComment = "sampleComment";
            elementContainerInstance.setState({
                comment : newComment
            })
            elementContainerInstance.forceUpdate();
            elementContainer.update();
            const spysaveNewComment  = jest.spyOn(elementContainerInstance, 'saveNewComment')
            elementContainerInstance.props = {
                element: wipData.paragraph,
                permissions: [
                    "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                    "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                    "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
                ],
                showBlocker: jest.fn(),
                isBlockerActive: true,
                addComment: jest.fn(),
                deleteElement: jest.fn(),
                asideData: {},
                parentUrn:"urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464"
            };
            elementContainerInstance.saveNewComment();
            expect(spysaveNewComment).toHaveBeenCalled()
            expect(elementContainerInstance.state.popup).toBe(false)
            spysaveNewComment .mockClear()
        })
    })
    describe('Test- Popup Functions', () => {
        let props = {
            element: wipData.paragraph,
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ],
            showBlocker: jest.fn(),
            isBlockerActive: true,
            addComment: jest.fn(),
            asideData: {},
            parentUrn:"urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464"
        };
        let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
        const elementContainerInstance = elementContainer.find('ElementContainer').instance();
        it('Test-openGlossaryFootnotePopUp  Function', () => {
            let callback=jest.fn();
            const spyopenGlossaryFootnotePopUp  = jest.spyOn(elementContainerInstance, 'openGlossaryFootnotePopUp')
            elementContainerInstance.openGlossaryFootnotePopUp(true, "Footnote", "urn:pearson:work:2fde62a2-b24e-4823-9188-0756b87f5fb5", "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a", "element-authoredtext", 1, undefined,"", callback);
            elementContainerInstance.forceUpdate();
            elementContainer.update();
            expect(spyopenGlossaryFootnotePopUp ).toHaveBeenCalledWith(true, "Footnote", "urn:pearson:work:2fde62a2-b24e-4823-9188-0756b87f5fb5", "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a", "element-authoredtext", 1, undefined,"", callback)
            spyopenGlossaryFootnotePopUp .mockClear()
        })
        it('Test-openAssetPopoverPopUp  Function', () => {
            const spyopenAssetPopoverPopUp = jest.spyOn(elementContainerInstance, 'openAssetPopoverPopUp')
            elementContainerInstance.openAssetPopoverPopUp(true);
            elementContainerInstance.forceUpdate();
            elementContainer.update();
            expect(spyopenAssetPopoverPopUp).toHaveBeenCalledWith(true)
            spyopenAssetPopoverPopUp.mockClear()
        })
        it('Test-showDeleteElemPopup  Function', () => {
            const spyshowDeleteElemPopup = jest.spyOn(elementContainerInstance, 'showDeleteElemPopup')
            elementContainerInstance.showDeleteElemPopup(true);
            elementContainerInstance.forceUpdate();
            elementContainer.update();
            expect(spyshowDeleteElemPopup).toHaveBeenCalledWith(true)
            expect(elementContainerInstance.state.showDeleteElemPopup).toBe(true)
            expect(elementContainerInstance.state.popup).toBe(true)
            spyshowDeleteElemPopup.mockClear()
        })
        it('Test-handleOnMouseOver  Function', () => {
            const spyhandleOnMouseOver = jest.spyOn(elementContainerInstance, 'handleOnMouseOver')
            elementContainerInstance.handleOnMouseOver();
            expect(spyhandleOnMouseOver).toHaveBeenCalled()
            expect(elementContainerInstance.state.isHovered).toBe(true)
            spyhandleOnMouseOver.mockClear()
        })
        it('Test-handleOnMouseOut  Function', () => {
            const spyhandleOnMouseOut = jest.spyOn(elementContainerInstance, 'handleOnMouseOut')
            elementContainerInstance.handleOnMouseOut();
            expect(spyhandleOnMouseOut).toHaveBeenCalled()
            expect(elementContainerInstance.state.isHovered).toBe(false)
            spyhandleOnMouseOut.mockClear()
        })
    })
    describe('Test- OpenerElement-Functions', () => {
        let openerData=wipData.opener
        let props = {
            element: wipData.opener,
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ],
            showBlocker: jest.fn(),
            isBlockerActive: true,
            index: 0,
            elementId: "urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y",
        };
        let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
        const elementContainerInstance = elementContainer.find('ElementContainer').instance();
        it('Test-toggleColorPaletteList  Function', () => {
            elementContainerInstance.setState({
                showColorPaletteList: false
            })
            elementContainerInstance.forceUpdate();
            elementContainer.update();
            const spytoggleColorPaletteList  = jest.spyOn(elementContainerInstance, 'toggleColorPaletteList')
            elementContainerInstance.toggleColorPaletteList();
            expect(spytoggleColorPaletteList).toHaveBeenCalled()
            expect(elementContainerInstance.state.showColorPaletteList).toBe(true)
            spytoggleColorPaletteList.mockClear()
        })
        it('Test-renderPaletteList  Function', () => {
            const spyrenderPaletteList = jest.spyOn(elementContainerInstance, 'renderPaletteList')
            elementContainerInstance.renderPaletteList();
            elementContainerInstance.forceUpdate();
            elementContainer.update();
            expect(spyrenderPaletteList).toHaveBeenCalled()
            spyrenderPaletteList.mockClear()
        })
        it('Test-selectColor  Function', () => {
            let e = {
                target: {
                    getAttribute:  ()=> {
                        return 'primary';
                    }
                }
            }
            const spyselectColor = jest.spyOn(elementContainerInstance, 'selectColor')
            elementContainerInstance.selectColor(e);
            elementContainerInstance.forceUpdate();
            elementContainer.update();
            expect(spyselectColor).toHaveBeenCalledWith(e)
            spyselectColor.mockClear()
        })
        it('Test-updateOpenerElement  Function', () => {
            let openerData=wipData.opener
            let dataToSend ={openerData}
            //openerData ,"openerelement","primary-openerelement","secondary-openerelement",
            const spyupdateOpenerElement = jest.spyOn(elementContainerInstance, 'updateOpenerElement')
            elementContainerInstance.updateOpenerElement(wipData.opener);
            elementContainerInstance.forceUpdate();
            elementContainer.update();
            expect(spyupdateOpenerElement).toHaveBeenCalled()
            spyupdateOpenerElement.mockClear()
        })
    })
    describe('Test-Other Functions', () => {
        let props = {
            element: wipData.paragraph,
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ],
            showBlocker: jest.fn(),
            isBlockerActive: true,
            asideData: {},
            parentUrn:"urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            index:0,
            deleteElement: jest.fn()
        };
        let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
        const elementContainerInstance = elementContainer.find('ElementContainer').instance();     
        const elementDiv = document.createElement('div');
        elementDiv.setAttribute('id', "tinymceToolbar");
        const elementDivChild = document.createElement('div');
        elementDivChild.setAttribute('className','tox-toolbar');
        elementDiv.appendChild(elementDivChild);
        document.body.appendChild(elementDiv);
        it('Test-handleFocus Function- for paragraph element', () => {
            elementContainerInstance.setState({
                sectionBreak: true
            })
            const spyhandleFocus  = jest.spyOn(elementContainerInstance, 'handleFocus')
            elementContainerInstance.handleFocus();
            elementContainerInstance.forceUpdate();
            elementContainer.update()
            expect(spyhandleFocus).toHaveBeenCalled()
            spyhandleFocus.mockClear()
        }) 
        it('Test-handleFocus Function- for c2mdeia update-other elements', () => {
            const spyhandleFocus  = jest.spyOn(elementContainerInstance, 'handleFocus')
            elementContainerInstance.handleFocus(true);
            elementContainerInstance.forceUpdate();
            elementContainer.update()
            expect(spyhandleFocus).toHaveBeenCalled()
            spyhandleFocus.mockClear()
        }) 

        it('Test-handleTCM Function', () => {
            const spyhandleTCM  = jest.spyOn(elementContainerInstance, 'handleTCM')
            elementContainerInstance.handleTCM();
            expect(spyhandleTCM).toHaveBeenCalled()
            spyhandleTCM.mockClear()
        }) 
        it('Test-toolbarHandling Function-add', () => {
            const spytoolbarHandling  = jest.spyOn(elementContainerInstance, 'toolbarHandling')
            elementContainerInstance.toolbarHandling("add");
            expect(spytoolbarHandling).toHaveBeenCalled()
            spytoolbarHandling.mockClear()
        })        
        it('Test-toolbarHandling Function-remove', () => {
            const spytoolbarHandling  = jest.spyOn(elementContainerInstance, 'toolbarHandling')
            elementContainerInstance.toolbarHandling("remove");
            expect(spytoolbarHandling).toHaveBeenCalled()
            spytoolbarHandling.mockClear()
        }) 
        it('Test-deleteElement Function', () => {
            elementContainerInstance.setState({
                sectionBreak: true
            })
            const spydeleteElement  = jest.spyOn(elementContainerInstance, 'deleteElement')
            elementContainerInstance.deleteElement();
            elementContainerInstance.forceUpdate();
            elementContainer.update()
            expect(spydeleteElement).toHaveBeenCalled()
            spydeleteElement.mockClear()
        })  
        it('Test-deleteElement Function-aside', () => {
            let props = {
                element: wipData.aside,
                permissions: [
                    "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                    "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                    "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
                ],
                showBlocker: jest.fn(),
                isBlockerActive: true,
                asideData: {},
                parentUrn:"urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                index:0,
                deleteElement: jest.fn(),
                parentElement:{
                    subtype :"image",
                    elementdata:{bodymatter:[{"id":1}]},
                    type:"aside",
                    contentUrn:"urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464"
                }
            }
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();

            elementContainerInstance.setState({
                sectionBreak: true
            })
            const spydeleteElement  = jest.spyOn(elementContainerInstance, 'deleteElement')
            elementContainerInstance.deleteElement();
            elementContainerInstance.forceUpdate();
            elementContainer.update()
            expect(spydeleteElement).toHaveBeenCalled()
            spydeleteElement.mockClear()
        }) 

    })
    describe('Test-Lifecycle Functions', () => {
        let props = {
            element: wipData.paragraph,
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ],
            showBlocker: jest.fn(),
            isBlockerActive: true,
            asideData: {},
            parentUrn:"urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            index:0,
            deleteElement: jest.fn(),
            elemBorderToggle:'showBorder'
        };
        let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
        const elementContainerInstance = elementContainer.find('ElementContainer').instance(); 
        it('Test-componentDidMount Function- for paragraph element', () => {
            elementContainerInstance.componentDidMount();
            expect(elementContainerInstance.state.ElementId).toBe("urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a")
        })
        it('Test-componentWillUnmount Function- for paragraph element', () => {
            const spycomponentWillUnmount  = jest.spyOn(elementContainerInstance, 'componentWillUnmount')
            elementContainerInstance.componentWillUnmount();
            expect(spycomponentWillUnmount).toHaveBeenCalled()
            spycomponentWillUnmount.mockClear()
        })
        it('Test-componentWillReceiveProps Function- for paragraph element', () => {
            let newProps = {
                element: wipData.paragraphUpdate,
                permissions: [
                    "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                    "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                    "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
                ],
                showBlocker: jest.fn(),
                isBlockerActive: true,
                asideData: {},
                parentUrn:"urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                index:0,
                deleteElement: jest.fn(),
                activeElement: {
                    elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a",
                    elementType: "element-authoredtext",
                    elementWipType: "element-authoredtext",
                    primaryOption: "primary-paragraph",
                    secondaryOption: "secondary-paragraph",
                    index: "1",
                    tag: "P",
                },
                elemBorderToggle : "showBorder"
            };
            elementContainerInstance.componentWillReceiveProps(newProps);
            expect(elementContainerInstance.state.borderToggle).toBe("showBorder")
        }) 
        it('Test-componentWillReceiveProps Function- for hideBorder', () => {
            let newProps = {
                element: wipData.paragraphUpdate,
                permissions: [
                    "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                    "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                    "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
                ],
                showBlocker: jest.fn(),
                isBlockerActive: true,
                asideData: {},
                parentUrn:"urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                index:0,
                deleteElement: jest.fn(),
                activeElement: {
                    elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a",
                    elementType: "element-authoredtext",
                    elementWipType: "element-authoredtext",
                    primaryOption: "primary-paragraph",
                    secondaryOption: "secondary-paragraph",
                    index: "1",
                    tag: "P",
                },
             };
            elementContainerInstance.componentWillReceiveProps(newProps);
            expect(elementContainerInstance.state.borderToggle).toBe("hideBorder")
        })  

    })
    describe('Test-Update Element Functions', () => {
        let props = {
            element: wipData.aside,
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ],
                updateElement: jest.fn(),
                elemBorderToggle:false
        };
        let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
        const elementContainerInstance = elementContainer.find('ElementContainer').instance();
        it('Render Element Container ----->AssessmentSlate-update-LT/LA', () => {
            let props = {
                element: wipData.assessmentSlate,
                permissions: [],
                updateElement: jest.fn()
            };
            let assessmentData = {
                id: "urn:pearson:learningtemplate:802c9a49-b5cb-4278-a330-edb4048bcc7f",
                format: 'learningtemplate',
                usageType: 'Quiz',
                learningsystem:"knowdl",
                templateid: "2019-09-13-006",
                templatetype:"criminal-justice-sims",
                templatelabel:"How Does Barbara Corcoran Pick Her Investments on Shark Tank? - 9/13",
            }
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            const spyhandleBlurAssessmentSlate  = jest.spyOn(elementContainerInstance, 'handleBlurAssessmentSlate') 
            elementContainerInstance.handleBlurAssessmentSlate(assessmentData);
            expect(spyhandleBlurAssessmentSlate).toHaveBeenCalledWith(assessmentData)
            spyhandleBlurAssessmentSlate.mockClear()
        })
        it('Render Element Container ----->AssessmentSlate-update-usageType update', () => {
            let props = {
                element: wipData.assessmentSlate,
                permissions: [],
                updateElement: jest.fn()
            };
            let assessmentData = 'Homework'
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            const spyhandleBlurAssessmentSlate  = jest.spyOn(elementContainerInstance, 'handleBlurAssessmentSlate') 
            elementContainerInstance.handleBlurAssessmentSlate(assessmentData);
            expect(spyhandleBlurAssessmentSlate).toHaveBeenCalledWith(assessmentData)
            spyhandleBlurAssessmentSlate.mockClear()
        })

    })
});

describe('Test-Lifecycle Functions-componentWillReceiveProps', () => {
    let props = {
        element: wipData.opener,
        permissions: [
            "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
            "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
            "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
        ],
        showBlocker: jest.fn(),
        isBlockerActive: true,
        index:0,
        deleteElement: jest.fn(),
        elemBorderToggle:'showBorder'
    };
    let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
    const elementContainerInstance = elementContainer.find('ElementContainer').instance(); 
    it('Test-componentWillReceiveProps Function- for opener element', () => {
        let nextProps = {
            element: {
                type:'openerelement'
            },
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ],
            showBlocker: jest.fn(),
            index:0,
            deleteElement: jest.fn(),
            activeElement: {
                elementId: "urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y",
            },
            elemBorderToggle:'true'
         };
         elementContainerInstance.setState({
            ElementId:"urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y",
            activeColorIndex: 0,
            isOpener: true
         })
         elementContainerInstance.forceUpdate()
         elementContainer.update()
        elementContainerInstance.componentWillReceiveProps(nextProps);
        expect(elementContainerInstance.state.borderToggle).toBe("active")
        expect(elementContainerInstance.state.ElementId).toBe("urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y")
    })  
    it('Test-componentWillReceiveProps Function- for other elements', () => {
        let nextProps = {
            element: {
                type:'figure'
            },
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ],
            showBlocker: jest.fn(),
            index:0,
            deleteElement: jest.fn(),
            activeElement: {
                elementId: "urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y",
            },
            elemBorderToggle:'true'
         };
         elementContainerInstance.setState({
            ElementId:"urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y",
            activeColorIndex: 0,
            isOpener: true
         })
         elementContainerInstance.forceUpdate()
         elementContainer.update()
        elementContainerInstance.componentWillReceiveProps(nextProps);
        expect(elementContainerInstance.state.borderToggle).toBe("active")
        expect(elementContainerInstance.state.ElementId).toBe("urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y")
    })  
})
describe('Test-Other Functions', () => {
   
    it('Test-handleFocus Function- for c2mdeia update-opener element', () => {
        let props = {
            element: wipData.opener,
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ],
            showBlocker: jest.fn(),
            isBlockerActive: true,
            asideData: {},
            parentUrn:"urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            index:0,
            deleteElement: jest.fn()
        };
        let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
        const elementContainerInstance = elementContainer.find('ElementContainer').instance();  
        const spyhandleFocus  = jest.spyOn(elementContainerInstance, 'handleFocus')
        elementContainerInstance.handleFocus(true);
        elementContainerInstance.forceUpdate();
        elementContainer.update()
        expect(spyhandleFocus).toHaveBeenCalled()
        spyhandleFocus.mockClear()
    }) 
})