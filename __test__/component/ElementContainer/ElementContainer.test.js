import React from 'react';
import { mount } from 'enzyme';
import ElementContainer from './../../../src/component/ElementContainer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { comments } from '../../../fixtures/commentPanelData.js'
import thunk from 'redux-thunk';
import { JSDOM } from 'jsdom';
const middlewares = [thunk];
import config from "../../../src/config/config.js"
import wipData from './wipData';
import { singleAssessmentElmDefault } from '../../../fixtures/ElementSingleAssessmentTestData'

global.document = (new JSDOM()).window.Element;
if (!global.Element.prototype.hasOwnProperty("innerText")) {
    Object.defineProperty(global.Element.prototype, 'innerText', {
        get() {
            return this.textContent;
        },
    });
}

jest.mock('../../../src/component/PopUp', () => {
    return function () {
        return (<div>null</div>)
    }
})
jest.mock('./../../../src/component/SlateWrapper/PageNumberElement', () => {
    return (<div>null</div>)
})
jest.mock('./../../../src/component/ElementSaprator', () => {
    return (<div>null</div>)
})
jest.mock('./../../../src/constants/utility.js', () => ({
    sendDataToIframe: jest.fn(),
    hasReviewerRole: jest.fn(),
    guid: jest.fn(),
    encodeHTMLInWiris: jest.fn(),
    matchHTMLwithRegex:jest.fn(),
    createTitleSubtitleModel:jest.fn(),
    removeBlankTags: jest.fn(),
    removeUnoClass: jest.fn(),
    createLabelNumberTitleModel: jest.fn()
}))
jest.mock('./../../../src/config/config.js', () => ({
    colors : ["#000000", "#003057", "#505759", "#005A70", "#006128"],
    textcolors:["option1", "option2"],
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
        },
        handleBlankLineDom: () => {
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
        },
        getElementStatus: () => {
            return jest.fn()
        },
        updateFigureData : () => {
            return jest.fn()
        },
        updateThreeColumnData : () => {
            return jest.fn()
        }
    }
})
global.document = (new JSDOM()).window.Element;
if (!global.Element.prototype.hasOwnProperty("innerText")) {
    Object.defineProperty(global.Element.prototype, 'innerText', {
        get() {
            return this.textContent;
        },
    });

}

beforeEach(() => {
    // Avoid `attachTo: document.body` Warning
    const tempElm = document.createElement('div');
    tempElm.setAttribute('id', 'slateWrapper');
    document.body.appendChild(tempElm);
});

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
        ],
        threeColumnData: [
            {
                containerId: "urn:pearson:manifest:8ad8a4f1-8f76-4e6c-912f-4ffe56a23d8e", 
                columnIndex: "C1", 
                columnId: "urn:pearson:manifest:73c11fa8-acec-4b8e-b435-0ec6cb3e5912"
            },
            {
                containerId: "urn:pearson:manifest:8ad8a4f1-8f76-4e6c-912f-4ffedser3422", 
                columnIndex: "C2",
                columnId: "urn:pearson:manifest:73c11fa8-acec-4b8e-b435-0ec6cb3e5922"
            }
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
    tcmReducer:{
        tcmSnapshot:[]
    },
    elementStatusReducer: {
        'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b': "wip",
        "urn:pearson:work:32e659c2-e0bb-46e8-9605-b8433aa3836c": "wip",
        "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635": "wip",
        "urn:pearson:work:ee2b0c11-75eb-4a21-87aa-578750b5301d": "wip",

    },
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
            deleteElm: {id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", type: "element-authoredtext", parentUrn: undefined, asideData: undefined, contentUrn: "urn:pearson:entity:da9f3f72-2cc7-4567-8fb9-9a887c360979"},
            element: {id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", type: "element-authoredtext", schema: "http://schemas.pearson.com/wip-authoring/element/1"},
            inputSubType: "NA",
            inputType: "AUTHORED_TEXT",
            operationType: "copy",
            sourceElementIndex: 2,
            sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
            sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6"
        }
    },
    alfrescoReducer: {
        alfrescoAssetData: {},
        elementId: "urn",
        alfrescoListOption: [],
        launchAlfrescoPopup: true,
        editor: true,
        Permission: false
    }
});

config["elementStatus"] = {}

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
        tcmData:[{"id":"222","feedback":"asdsa"}]
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
            expect(elementContainer).toHaveLength(1);
            expect(elementContainerInstance).toBeDefined();
        })
        it('Render Element Container ----->List Element', () => {
            let props = {
                element: wipData.stanza,
                permissions: []
            };
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            expect(elementContainer).toHaveLength(1);
            expect(elementContainerInstance).toBeDefined();
        })
        it('Render Element Container ----->Multicolumn container Element', () => {
            let props = {
                element: wipData.multicolumn,
                permissions: []
            };
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            expect(elementContainer).toHaveLength(1);
            expect(elementContainerInstance).toBeDefined();
        })
        it('Render Element Container ----->Stanza Element', () => {
            expect(elementContainer).toHaveLength(1);
            elementContainerInstance.setState({
                activeColorIndex: 0,
                isOpener: true

            })
            elementContainerInstance.forceUpdate();
            elementContainer.update();
            expect(elementContainerInstance).toBeDefined();
        })
        it('Render Element Container ----->handleBlur', () => {
            let props = {
                element: wipData.figure,
                permissions: []
            };
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            expect(elementContainer).toHaveLength(1);
            expect(elementContainerInstance).toBeDefined();
            const elementDiv = document.createElement('div');
            elementDiv.setAttribute('id', "cypress-2");
            elementDiv.innerHTML='<h3 class="pullQuoteNumeroUno">Hello Test</h3>'
            document.body.appendChild(elementDiv);
            const spyhandleBlur  = jest.spyOn(elementContainerInstance, 'handleBlur') 
            elementContainerInstance.handleBlur();
            expect(spyhandleBlur).toHaveBeenCalled()
            spyhandleBlur.mockClear()
        })
        it('Render Element Container ----->no formatting bar access', () => {
            const store1 = mockStore({
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
                    permissions: []
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
                tcmReducer:{
                    tcmSnapshot:[]
                },
                elementStatusReducer: {
                    'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b': "wip",
                    "urn:pearson:work:32e659c2-e0bb-46e8-9605-b8433aa3836c": "wip",
                    "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635": "wip",
                    "urn:pearson:work:ee2b0c11-75eb-4a21-87aa-578750b5301d": "wip",
            
                },
                searchReducer: {
                    searchTerm: "urn:pearson:work:5d489bfe-ef76-4193-b07a-62d9d393fe93",
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
                        deleteElm: {id: "urn:pearson:work:5d489bfe-ef76-4193-b07a-62d9d393fe93", type: "element-authoredtext", parentUrn: undefined, asideData: undefined, contentUrn: "urn:pearson:entity:da9f3f72-2cc7-4567-8fb9-9a887c360979"},
                        element: {id: "urn:pearson:work:5d489bfe-ef76-4193-b07a-62d9d393fe93", type: "element-authoredtext", schema: "http://schemas.pearson.com/wip-authoring/element/1"},
                        inputSubType: "NA",
                        inputType: "AUTHORED_TEXT",
                        operationType: "cut",
                        sourceElementIndex: 2,
                        sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
                        sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6"
                    }
                }
            });
            let props = {
                element: wipData.pullquote,
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
            let elementContainer = mount(<Provider store={store1}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            expect(elementContainer).toHaveLength(1);
            expect(elementContainerInstance).toBeDefined();
        })
        it('Render Element Container ----->handleBlur list', () => {
            let props = {
                element: wipData.list,
                permissions: [],
                index:1
            };
            const elementDiv = document.createElement('div');
            elementDiv.setAttribute('id', "cypress-1");
            elementDiv.innerHTML=''
            document.body.appendChild(elementDiv);
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            const spyhandleBlur  = jest.spyOn(elementContainerInstance, 'handleBlur') 
            elementContainerInstance.handleBlur();
            expect(spyhandleBlur).toHaveBeenCalled()
            spyhandleBlur.mockClear()
        })
        it('Render Element Container ----->handleBlur citation element', () => {
            let props = {
                element: wipData.citation,
                permissions: [],
                index:1
            };
            
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            const elementDiv = document.createElement('div');
            elementDiv.setAttribute('id', "cypress-1");
            elementDiv.innerHTML='<h3 class="pullQuoteNumeroUno">Hello Test</h3>'
            document.body.appendChild(elementDiv);
            const spyhandleBlur  = jest.spyOn(elementContainerInstance, 'handleBlur') 
            elementContainerInstance.handleBlur(true);
            expect(spyhandleBlur).toHaveBeenCalled()
            spyhandleBlur.mockClear()
        })
        xit('Render Element Container ----->handleBlur EmbeddedAssessment element', () => {
            let props = {
                element: wipData.assessment,
                permissions: [],
                index:1,
                storeOldAssetForTCM :  jest.fn()
            };
            
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            const elementDiv = document.createElement('div');
            elementDiv.setAttribute('id', "cypress-1");
            elementDiv.innerHTML='<h3 class="pullQuoteNumeroUno">Hello Test</h3>'
            document.body.appendChild(elementDiv);
            const spyhandleBlur  = jest.spyOn(elementContainerInstance, 'handleBlur') 
            elementContainerInstance.handleBlur(true, null, null, null, 'fromEmbeddedAssessment');
            expect(spyhandleBlur).toHaveBeenCalled()
            spyhandleBlur.mockClear()
        })
        xit('Render Element Container ----->handleBlur popup', () => {
            let props = {
                element: wipData.popup,
                permissions: [],
                index: 1,
               
            };
            let currentElement ={
                "contentUrn": "urn:pearson:entity:33ef8197-0877-415e-9197-832fa0f34ce1",
                "elementParentEntityUrn": "urn:pearson:entity:2c5baa8a-e6c9-4669-8206-7ff30ce20878",
                "elementdata": { "text": "de " },
                "html": { "text": "<p><label>de&nbsp;</label></p>" },
                "id": "urn:pearson:work:ed092623-a64a-4e49-a483-16f6f026f141",
                "metaDataField": "formattedTitleOnly",
                "type": "element-authoredtext",
                "versionUrn": "urn:pearson:work:ed092623-a64a-4e49-a483-16f6f026f141"

            }
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            const elementDiv = document.createElement('div');
            elementDiv.setAttribute('id', "cypress-1-0");

            elementDiv.innerHTML = '<h3 class="pullQuoteNumeroUno">Hello Test</h3>'
            elementDiv.textContent = ""
            const elementDivChild = document.createElement('div');
            elementDivChild.setAttribute('id', "cypress-1-1");
            elementDivChild.textContent = ""
            elementDiv.appendChild(elementDivChild);
            document.body.appendChild(elementDiv);
            const spyhandleBlur = jest.spyOn(elementContainerInstance, 'handleBlur')
            elementContainerInstance.handleBlur("", currentElement, 1);
            expect(spyhandleBlur).toHaveBeenCalled()
            spyhandleBlur.mockClear()
        })
        it('Render Element Container ----->handleBlur citation', () => {
            let props = {
                element: wipData.citationgroup,
                permissions: [],
                index: 1,
               
            };
            let currentElement ={
                "contentUrn": "urn:pearson:entity:07705fa5-93c6-4d95-a14f-96bd30e8d044",
                "elementParentEntityUrn": "urn:pearson:entity:d1b0bca1-154c-44e1-bd6f-2e4013bc6a47",
                "elementdata": {"text": "dasdd"},
                "html": {"text": "<p>dasdd</p>"},
                "id": "urn:pearson:work:2d4298cf-0ef1-444c-9725-016b5f74d5d3",
                "index": "0",
                "inputSubType": "NA",
                "inputType": "AUTHORED_TEXT",
                "metaDataField": "formattedTitle",
                "type": "element-authoredtext"
            }
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            const elementDiv = document.createElement('div');
            elementDiv.setAttribute('id', "cypress-1-0");

            elementDiv.innerHTML = '<h3 class="pullQuoteNumeroUno">Hello Test</h3>'
            elementDiv.textContent = ""
            const elementDivChild = document.createElement('div');
            elementDivChild.setAttribute('id', "cypress-1-1");
            elementDivChild.textContent = ""
            elementDiv.appendChild(elementDivChild);
            document.body.appendChild(elementDiv);
            const spyhandleBlur = jest.spyOn(elementContainerInstance, 'handleBlur')
            elementContainerInstance.handleBlur("", currentElement, 1);
            expect(spyhandleBlur).toHaveBeenCalled()
            spyhandleBlur.mockClear()
        })
        
        it('Render Element Container ----->handleBlur poetry', () => {
            let props = {
                element: wipData.paragraph,
                permissions: [],
                index: 1,
                parentElement: {
                    type: "poetry",
                    contents: {}
                }
            };

            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            const elementDiv = document.createElement('div');
            elementDiv.setAttribute('id', "cypress-1-0");

            elementDiv.innerHTML = '<h3 class="pullQuoteNumeroUno">Hello Test</h3>'
            elementDiv.textContent = ""
            const elementDivChild = document.createElement('div');
            elementDivChild.setAttribute('id', "cypress-1-1");
            elementDivChild.textContent = ""
            elementDiv.appendChild(elementDivChild);
            document.body.appendChild(elementDiv);
            const spyhandleBlur = jest.spyOn(elementContainerInstance, 'handleBlur')
            elementContainerInstance.handleBlur("", "", 1);
            expect(spyhandleBlur).toHaveBeenCalled()
            spyhandleBlur.mockClear()
        })
        
        it('Render Element Container ----->handleBlur poetry with creditsarray', () => {
            let props = {
                element: wipData.paragraph,
                permissions: [],
                index: 1,
                parentElement: {
                    type: "poetry",
                    contents: {
                        creditsarray: [{
                            "contentUrn": "urn:pearson:entity:55ce4b5c-af27-4060-a1dc-c3847416cc80",
                            "elementParentEntityUrn": "urn:pearson:entity:239dc459-58db-4fe1-a389-4e8bd41a9d8a",
                            "elementdata": { "text": "ds" },
                            "html": { "text": "<p>ds</p>" },
                            "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a",
                            "parentType": "poetry",
                            "sectionType": "creditsarray"
                        }]
                    }
                }
            };

            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            const elementDiv = document.createElement('div');
            elementDiv.setAttribute('id', "cypress-1-0");

            elementDiv.innerHTML = '<h3 class="pullQuoteNumeroUno">Hello Test</h3>'
            elementDiv.textContent = ""
            const elementDivChild = document.createElement('div');
            elementDivChild.setAttribute('id', "cypress-1-1");
            elementDivChild.textContent = ""
            elementDiv.appendChild(elementDivChild);
            document.body.appendChild(elementDiv);
            const spyhandleBlur = jest.spyOn(elementContainerInstance, 'handleBlur')
            elementContainerInstance.handleBlur("", "", 1);
            expect(spyhandleBlur).toHaveBeenCalled()
            spyhandleBlur.mockClear()
        })
        it('Render Element Container ----->labelClickHandler', () => {
            let props = {
                element: wipData.figure,
                permissions: []
            };
            let event= {
                stopPropagation:()=>{}
            }
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            const spyhandleBlur  = jest.spyOn(elementContainerInstance, 'labelClickHandler') 
            elementContainerInstance.labelClickHandler(event);
            expect(spyhandleBlur).toHaveBeenCalled()
            spyhandleBlur.mockClear()
        })
        it('Render Element Container ----->showDeleteElemPopup', () => {
            let event= {
                stopPropagation:()=>{}
            }
            const spyhandleBlur  = jest.spyOn(elementContainerInstance, 'showDeleteElemPopup') 
            elementContainerInstance.showDeleteElemPopup(event);
            expect(spyhandleBlur).toHaveBeenCalled()
            spyhandleBlur.mockClear()
        })
        it('Render Element Container ----->updateFigureData', () => {
            let props = {
                element: wipData.figure,
                permissions: [],
                updateFigureData:jest.fn()
            };
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            const spyhandleBlur  = jest.spyOn(elementContainerInstance, 'updateFigureData') 
            elementContainerInstance.updateFigureData();
            expect(spyhandleBlur).toHaveBeenCalled()
            spyhandleBlur.mockClear()
        })
        it('Render Element Container ----->Figure Element-Image', () => {
            let props = {
                element: wipData.figure,
                permissions: []
            };
            let parentElement = {
                contentUrn:"67"
            }
            let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            const spyhandleBlur  = jest.spyOn(elementContainerInstance, 'createPoetryElements') 
            elementContainerInstance.createPoetryElements("","","",parentElement);
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
        it('Render Element Container ----->Video Element', () => {
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
        it('Render Element Container ----->Audio Element', () => {
            let props = {
                element: wipData.audio,
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
        xit('Render Element Container ----->SingleAssessment Element', () => {
            let props = {
                element: wipData.assessment,
                permissions: [],
                storeOldAssetForTCM : jest.fn()
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
        xit('Render Element Container ----->AssessmentSlate', () => {
            let props = {
                element: wipData.assessmentSlate,
                permissions: [],
                updateElement: jest.fn(),
                storeOldAssetForTCM : jest.fn()
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
        let event= {
            stopPropagation:()=>{}
        }
        let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
        const elementContainerInstance = elementContainer.find('ElementContainer').instance();
        it('Test-handleCommentPopup Function', () => {
            const spyhandleCommentPopup = jest.spyOn(elementContainerInstance, 'handleCommentPopup')
            elementContainerInstance.handleCommentPopup(true,event);
            elementContainerInstance.forceUpdate();
            elementContainer.update();
            expect(spyhandleCommentPopup).toHaveBeenCalledWith(true,event)
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
            elementContainerInstance.saveNewComment({stopPropagation:()=>{}},true);
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
        let event= {
            stopPropagation:()=>{}
        }
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
        xit('Test-showDeleteElemPopup  Function', () => {
            const spyshowDeleteElemPopup = jest.spyOn(elementContainerInstance, 'showDeleteElemPopup')
            elementContainerInstance.showDeleteElemPopup(event,true,true);
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
        it('Test-renderColorPaletteButton if  Function', () => {
            let permissions= [
                "elements_add_remove"
            ],
            element={
                type:"openerelement"
            }
            const spyrenderPaletteList = jest.spyOn(elementContainerInstance, 'renderColorPaletteButton')
            elementContainerInstance.renderColorPaletteButton(element,permissions);
            elementContainerInstance.forceUpdate();
            elementContainer.update();
            expect(spyrenderPaletteList).toHaveBeenCalled()
            spyrenderPaletteList.mockClear()
        })
        it('Test-renderColorTextButton  if  Function', () => {
            let permissions= [
                "elements_add_remove"
            ],
            element={
                type:"openerelement"
            }
            const spyrenderPaletteList = jest.spyOn(elementContainerInstance, 'renderColorTextButton')
            elementContainerInstance.renderColorTextButton(element,permissions);
            elementContainerInstance.forceUpdate();
            elementContainer.update();
            expect(spyrenderPaletteList).toHaveBeenCalled()
            spyrenderPaletteList.mockClear()
        })
        it('Test-renderColorPaletteButton else  Function', () => {
            let permissions= [
                "elements_add_remove"
            ],
            element={
                type:""
            }
            const spyrenderPaletteList = jest.spyOn(elementContainerInstance, 'renderColorPaletteButton')
            elementContainerInstance.renderColorPaletteButton(element,permissions);
            elementContainerInstance.forceUpdate();
            elementContainer.update();
            expect(spyrenderPaletteList).toHaveBeenCalled()
            spyrenderPaletteList.mockClear()
        })
        it('Test-renderColorTextButton else  Function', () => {
            let permissions= [
                "elements_add_remove"
            ],
            element={
                type:""
            }
            const spyrenderPaletteList = jest.spyOn(elementContainerInstance, 'renderColorTextButton')
            elementContainerInstance.renderColorTextButton(element,permissions);
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

        it('Test-toggleColorTextList  Function', () => {
            elementContainerInstance.setState({
                showColorTextList: false
            })
            elementContainerInstance.forceUpdate();
            elementContainer.update();
            const spytoggleColorTextList  = jest.spyOn(elementContainerInstance, 'toggleColorTextList')
            elementContainerInstance.toggleColorTextList();
            expect(spytoggleColorTextList).toHaveBeenCalled()
            expect(elementContainerInstance.state.showColorTextList).toBe(true)
            spytoggleColorTextList.mockClear()
        })

        it('Test-renderTextColorList  Function', () => {
            const spyrenderTextColorList = jest.spyOn(elementContainerInstance, 'renderTextColorList')
            elementContainerInstance.renderTextColorList();
            elementContainerInstance.forceUpdate();
            elementContainer.update();
            expect(spyrenderTextColorList).toHaveBeenCalled()
            spyrenderTextColorList.mockClear()
        })

        it('Test-selectTextColor  Function', () => {
            let e = {
                target: {
                    getAttribute:  ()=> {
                        return 'primary';
                    }
                }
            }
            const spyselectTextColor = jest.spyOn(elementContainerInstance, 'selectTextColor')
            elementContainerInstance.selectTextColor(e);
            elementContainerInstance.forceUpdate();
            elementContainer.update();
            expect(spyselectTextColor).toHaveBeenCalledWith(e)
            spyselectTextColor.mockClear()
        })
        it('Test-toggleColorPaletteList  Function', () => {
            elementContainerInstance.setState({
                showColorPaletteList: false
            })
            elementContainerInstance.forceUpdate();
            elementContainer.update();
            config.savingInProgress =true
            const spytoggleColorPaletteList  = jest.spyOn(elementContainerInstance, 'toggleColorPaletteList')
            elementContainerInstance.toggleColorPaletteList();
            expect(spytoggleColorPaletteList).toHaveBeenCalled()
            expect(elementContainerInstance.state.showColorPaletteList).toBe(false)
            spytoggleColorPaletteList.mockClear()
        })
        it('Test-toggleColorTextList  Function', () => {
            elementContainerInstance.setState({
                showColorTextList: false
            })
            config.savingInProgress =true
            elementContainerInstance.forceUpdate();
            elementContainer.update();
            const spytoggleColorTextList  = jest.spyOn(elementContainerInstance, 'toggleColorTextList')
            elementContainerInstance.toggleColorTextList();
            expect(spytoggleColorTextList).toHaveBeenCalled()
            expect(elementContainerInstance.state.showColorTextList).toBe(false)
            spytoggleColorTextList.mockClear()
        })
    })
    describe('Test-Other Functions', () => {
        let props = {
            element: wipData.paragraph,
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "split_slate", "full_project_slate_preview", "access_formatting_bar", "elements_add_remove",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ],
            showBlocker: jest.fn(),
            isBlockerActive: true,
            asideData: {},
            parentUrn:"urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            index:0,
            deleteElement: jest.fn()
        };
        let event= {
            stopPropagation:()=>{}
        }
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
            elementContainerInstance.handleFocus("","",event,"");
            elementContainerInstance.forceUpdate();
            elementContainer.update()
            expect(spyhandleFocus).toHaveBeenCalled()
            spyhandleFocus.mockClear()
        })
        it('Test-handleFocus Function- for opener element', () => {
            let props = {
                element:{
                    type:"openerelement",
                    id:"890"
                }
            }
        let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
        const elementContainerInstance = elementContainer.find('ElementContainer').instance(); 
            elementContainerInstance.setState({
                sectionBreak: true
            })
            const spyhandleFocus  = jest.spyOn(elementContainerInstance, 'handleFocus')
            elementContainerInstance.handleFocus("updateFromC2","",event,"");
            elementContainerInstance.forceUpdate();
            elementContainer.update()
            expect(spyhandleFocus).toHaveBeenCalled()
            spyhandleFocus.mockClear()
        })
        it('Test-handleFocus Function- for paragraph element', () => {
            elementContainerInstance.setState({
                sectionBreak: true
            })
            const spyhandleFocus  = jest.spyOn(elementContainerInstance, 'handleFocus')
            let showHideObj = {
                currentElement:"P",
                index:1
            }
            elementContainerInstance.handleFocus('updateFromC2',showHideObj,event,"");
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

        it('Test-handleFocus Function- for showhide element', () => {
            elementContainerInstance.setState({
                sectionBreak: true
            })
           /*  jest.mock('./../../../src/constants/utility.js', () => ({
                hasReviewerRole: () => true
            })) */
            document.querySelector = () => {
                return {
                    classList: {
                        remove: jest.fn(),
                        add: jest.fn()
                    }
                }
            }
            const spyhandleFocus  = jest.spyOn(elementContainerInstance, 'handleFocus')
            elementContainerInstance.handleFocus("",null,event,"");
            elementContainerInstance.forceUpdate();
            elementContainer.update()
            expect(spyhandleFocus).toHaveBeenCalled()
            spyhandleFocus.mockClear()
        })
        xit('Test-handleTCM Function', () => {
            const spyhandleTCM  = jest.spyOn(elementContainerInstance, 'handleTCM')
            elementContainerInstance.handleTCM(event);
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
            elementContainerInstance.deleteElement(event);
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
            elementContainerInstance.deleteElement(event);
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
        it('Test-componentWillUnmount Function- for paragraph element if release count not zero', () => {
            config.releaseCallCount = 1;
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
            xit('Render Element Container ----->AssessmentSlate-update-LT/LA', () => {
                let props = {
                    element: wipData.assessmentSlate,
                    permissions: [],
                    updateElement: jest.fn(),
                    storeOldAssetForTCM: jest.fn()
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
            xit('Render Element Container ----->AssessmentSlate-update-usageType update', () => {
                let props = {
                    element: wipData.assessmentSlate,
                    permissions: [],
                    updateElement: jest.fn(),
                    storeOldAssetForTCM: jest.fn()
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
    })
    describe('Test-Elm Assessent Functions', () => {
        let newProps = {
            element: singleAssessmentElmDefault,
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ],
            updateElement: jest.fn(),
            elemBorderToggle: false,
            openElmAssessmentPortal: jest.fn(),
            fetchAssessmentMetadata: jest.fn()
        };
        let event = {
            stopPropagation: jest.fn(),
            preventDefault: jest.fn()
        }
        let elementContainer2 = mount(<Provider store={store}><ElementContainer {...newProps} /></Provider>);
        const elementContainerInstance2 = elementContainer2.find('ElementContainer').instance();
        it('Test-1------>handleEditButton', () => {
            const spyFunction = jest.spyOn(elementContainerInstance2, 'handleEditButton')
            elementContainerInstance2.handleEditButton(event);
            expect(spyFunction).toHaveBeenCalledWith(event)
            expect(elementContainerInstance2.props.element.figuredata.elementdata.assessmentformat).toBe('puf')
            spyFunction.mockClear()
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
    it('Test-componentWillReceiveProps Function- for citation negative', () => {
        config.citationFlag = false;
        let nextProps = {
            element: {
                type:'element-citation'
            },
            permissions: [
                "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "split_slate", "full_project_slate_preview",
                "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
            ],
            showBlocker: jest.fn(),
            index:0,
            deleteElement: jest.fn(),
            activeElement: {
                elementId: "urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y",
            },
            elemBorderToggle: 'showBorder'
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
   
    let props = {
        element: wipData.poetry,
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
        searchParent : "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
        threeColumnData: [{containerId: "urn:pearson:manifest:0beacb79-ee4c-4c26-abcc-dd973c6893c9", columnIndex: "C3", columnId: "urn:pearson:manifest:73c11fa8-acec-4b8e-b435-0ec6cb3e5912"}]
    };

    let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
    const elementContainerInstance = elementContainer.find('ElementContainer').instance();

    it('Test-handleFocus Function- for c2mdeia update-opener element', () => {
        const spyhandleFocus  = jest.spyOn(elementContainerInstance, 'handleFocus')
        elementContainerInstance.handleFocus(true);
        elementContainerInstance.forceUpdate();
        elementContainer.update()
        expect(spyhandleFocus).toHaveBeenCalled()
        spyhandleFocus.mockClear()
    })

    it('Test-getElementVersionStatus Function- poetry with creditsarray', () => {
        const elementStatus = {}
        const spygetElementVersionStatus  = jest.spyOn(elementContainerInstance, 'getElementVersionStatus')
        elementContainerInstance.getElementVersionStatus(props.element, elementStatus);
        elementContainerInstance.forceUpdate();
        elementContainer.update()
        expect(spygetElementVersionStatus).toHaveBeenCalled()
        spygetElementVersionStatus.mockClear()
    })

    it('Test-getElementVersionStatus Function- citationgroup', () => {
        const elementStatus = {}
        const spygetElementVersionStatus  = jest.spyOn(elementContainerInstance, 'getElementVersionStatus')
        elementContainerInstance.getElementVersionStatus(wipData.citationgroup2, elementStatus);
        elementContainerInstance.forceUpdate();
        elementContainer.update()
        expect(spygetElementVersionStatus).toHaveBeenCalled()
        spygetElementVersionStatus.mockClear()
    })

    it('Test-getElementVersionStatus Function- popup', () => {
        const elementStatus = {}
        const spygetElementVersionStatus  = jest.spyOn(elementContainerInstance, 'getElementVersionStatus')
        elementContainerInstance.getElementVersionStatus(wipData.popup2, elementStatus);
        elementContainerInstance.forceUpdate();
        elementContainer.update()
        expect(spygetElementVersionStatus).toHaveBeenCalled()
        spygetElementVersionStatus.mockClear()
    })
    
    it("componentDidUpdate", () => {
        const store1 = mockStore({
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
                permissions: []
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
            tcmReducer:{
                tcmSnapshot:[]
            },
            elementStatusReducer: {
                'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b': "wip",
                "urn:pearson:work:32e659c2-e0bb-46e8-9605-b8433aa3836c": "wip",
                "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635": "wip",
                "urn:pearson:work:ee2b0c11-75eb-4a21-87aa-578750b5301d": "wip",
        
            },
            searchReducer: {
                searchTerm: "urn:pearson:work:5d489bfe-ef76-4193-b07a-62d9d393fe93",
                parentId: "urn:pearson:work:5d489bfe-ef76-4193-b07a-62d9d393fe94",
                deeplink: true,
                scroll: false,
                scrollTop: 0
            },
            commentSearchReducer: {
                commentSearchTerm: "urn:pearson:work:5d489bfe-ef76-4193-b07a-62d9d393fe93",
                parentId: "urn:pearson:work:5d489bfe-ef76-4193-b07a-62d9d393fe94",
                scroll: false,
                scrollTop: 0
            },
            selectionReducer: {
                selection: {
                    activeAnimation: true,
                    deleteElm: {id: "urn:pearson:work:5d489bfe-ef76-4193-b07a-62d9d393fe93", type: "element-authoredtext", parentUrn: undefined, asideData: undefined, contentUrn: "urn:pearson:entity:da9f3f72-2cc7-4567-8fb9-9a887c360979"},
                    element: {id: "urn:pearson:work:5d489bfe-ef76-4193-b07a-62d9d393fe93", type: "element-authoredtext", schema: "http://schemas.pearson.com/wip-authoring/element/1"},
                    inputSubType: "NA",
                    inputType: "AUTHORED_TEXT",
                    operationType: "cut",
                    sourceElementIndex: 2,
                    sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
                    sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6"
                }
            }
        });
        let props = {
            element: wipData.pullquote,
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

        let elementContainer = mount(<Provider store={store1}><ElementContainer {...props} /></Provider>);
        const elementContainerInstance = elementContainer.find('ElementContainer').instance();
        document.querySelector = () => {
            return {
                offsetTop: 2
            }
        }

        document.getElementById["scrollTop"] = 1
        const spycomponentDidUpdate = jest.spyOn(elementContainerInstance, 'componentDidUpdate')
        elementContainerInstance.componentDidUpdate();
        expect(spycomponentDidUpdate).toHaveBeenCalled();
        spycomponentDidUpdate.mockClear()
    })
    it("componentDidUpdate - negative case", () => {
        const store1 = mockStore({
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
                permissions: []
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
            tcmReducer:{
                tcmSnapshot:[]
            },
            elementStatusReducer: {
                'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b': "wip",
                "urn:pearson:work:32e659c2-e0bb-46e8-9605-b8433aa3836c": "wip",
                "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635": "wip",
                "urn:pearson:work:ee2b0c11-75eb-4a21-87aa-578750b5301d": "wip",
        
            },
            searchReducer: {
                searchTerm: "urn:pearson:work:5d489bfe-ef76-4193-b07a-62d9d393fe93",
                parentId: "urn:pearson:work:5d489bfe-ef76-4193-b07a-62d9d393fe93",
                deeplink: true,
                scroll: false,
                scrollTop: 1
            },
            commentSearchReducer: {
                commentSearchTerm: "urn:pearson:work:5d489bfe-ef76-4193-b07a-62d9d393fe93",
                parentId: "urn:pearson:work:5d489bfe-ef76-4193-b07a-62d9d393fe93",
                scroll: false,
                scrollTop: 1
            },
            selectionReducer: {
                selection: {
                    activeAnimation: true,
                    deleteElm: {id: "urn:pearson:work:5d489bfe-ef76-4193-b07a-62d9d393fe93", type: "element-authoredtext", parentUrn: undefined, asideData: undefined, contentUrn: "urn:pearson:entity:da9f3f72-2cc7-4567-8fb9-9a887c360979"},
                    element: {id: "urn:pearson:work:5d489bfe-ef76-4193-b07a-62d9d393fe93", type: "element-authoredtext", schema: "http://schemas.pearson.com/wip-authoring/element/1"},
                    inputSubType: "NA",
                    inputType: "AUTHORED_TEXT",
                    operationType: "cut",
                    sourceElementIndex: 2,
                    sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
                    sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6"
                }
            }
        });
        let props = {
            element: wipData.pullquote,
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
        let elementContainer = mount(<Provider store={store1}><ElementContainer {...props} /></Provider>);
        const elementContainerInstance = elementContainer.find('ElementContainer').instance();
        document.querySelector = () => {
            return {
                offsetTop: 2
            }
        }
        document.getElementById["scrollTop"] = 1
        const spycomponentDidUpdate = jest.spyOn(elementContainerInstance, 'componentDidUpdate')
        elementContainerInstance.componentDidUpdate();
        expect(spycomponentDidUpdate).toHaveBeenCalled();
        spycomponentDidUpdate.mockClear()
    })
    it("Test - replaceUnwantedtags - no input", () => {
        const spyreplaceUnwantedtags = jest.spyOn(elementContainerInstance, 'replaceUnwantedtags')
        elementContainerInstance.replaceUnwantedtags();
        expect(spyreplaceUnwantedtags).toHaveBeenCalled();
        expect(spyreplaceUnwantedtags).toHaveReturnedWith(undefined);
        spyreplaceUnwantedtags.mockClear()
    })
    it("Test - figureDifferenceBlockCode: difference in content", () => {
        const previousElementData = {
            html: {
                preformattedtext: '<p></p>'
            },
            figuredata: {
                startNumber: 1,
                numbered: 1,
                syntaxhighlighting: false
            }
        }
        document.querySelector = () => {
            return {
                getAttribute: (attr) => {
                    if(attr === "startnumber" || attr === "numbered" || attr === "syntaxhighlighting") return "1"
                } 
            }
        }
        const spyfigureDifferenceBlockCode = jest.spyOn(elementContainerInstance, 'figureDifferenceBlockCode')
        elementContainerInstance.figureDifferenceBlockCode(1, previousElementData);
        expect(spyfigureDifferenceBlockCode).toHaveBeenCalled();
        expect(spyfigureDifferenceBlockCode).toHaveReturnedWith(true);
        spyfigureDifferenceBlockCode.mockClear()
    })
    it("Test - figureDifferenceInteractive - pdf interactive type: difference in content", () => {
        const previousElementData = {
            html: {
                title: '<p></p>',
                postertext: "<p>test</p>"
            },
            figuredata: {
                interactivetype: "pdf"
            }
        }
        const spyfigureDifferenceInteractive = jest.spyOn(elementContainerInstance, 'figureDifferenceInteractive')
        elementContainerInstance.figureDifferenceInteractive(1, previousElementData);
        expect(spyfigureDifferenceInteractive).toHaveBeenCalled();
        expect(spyfigureDifferenceInteractive).toHaveReturnedWith(true);
        spyfigureDifferenceInteractive.mockClear()
    })
    xit("Test - handleTCM: isSavingElement false", () => {
        const eventObj = {
            stopPropagation: jest.fn()
        }
        config.isSavingElement = false
        const spyhandleTCM = jest.spyOn(elementContainerInstance, 'handleTCM')
        elementContainerInstance.handleTCM(eventObj);
        expect(spyhandleTCM).toHaveBeenCalled();
        spyhandleTCM.mockClear()
    })

    it("handleContentChange for Blockquote", () => {
        const props1 = {
            element: wipData.pullquote,
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
            searchParent : "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464"
        };
    
        const previousElementData = {
            type: "element-blockfeature",
            html: {
                text: "<h2 class='pullquoteNumeroUno'></h2>"
            }
        }
        const elementContainer1 = mount(<Provider store={store}><ElementContainer {...props1} /></Provider>);
        const elementContainerInstance1 = elementContainer1.find('ElementContainer').instance();
        document.querySelector = () => {
            return {
                innerText: " ",
                append: jest.fn()
            }
        }
        const spyhandleContentChange = jest.spyOn(elementContainerInstance1, 'handleContentChange')
        elementContainerInstance1.handleContentChange(null, previousElementData, null, null, null, null, false, { type: "showhide" });
        expect(spyhandleContentChange).toHaveBeenCalled();
        spyhandleContentChange.mockClear()
    })

    it("handleContentChange for Blockquote inside showhide", () => {
        const props1 = {
            element: wipData.pullquote,
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
            searchParent : "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464"
        };
    
        const previousElementData = {
            type: "element-blockfeature",
            html: {
                text: "<h2 class='pullquoteNumeroUno'></h2>"
            }
        }
        const elementContainer1 = mount(<Provider store={store}><ElementContainer {...props1} /></Provider>);
        const elementContainerInstance1 = elementContainer1.find('ElementContainer').instance();
        document.querySelector = () => {
            return {
                innerText: " ",
                append: jest.fn()
            }
        }
        const spyhandleContentChange = jest.spyOn(elementContainerInstance1, 'handleContentChange')
        elementContainerInstance1.handleContentChange(null, previousElementData, null, null, null, null, false, { type: "showhide" }, 'postertextobject');
        expect(spyhandleContentChange).toHaveBeenCalled();
        spyhandleContentChange.mockClear()
    })

    it("handleContentChange for stanza", () => {
        const previousElementData = {
            type: "stanza",
            html: {
                text: "<p>stanza text</p>"
            }
        }
        document.querySelector = () => {
            return {
                innerText: " ",
                append: jest.fn()
            }
        }
        const spyhandleContentChange = jest.spyOn(elementContainerInstance, 'handleContentChange')
        elementContainerInstance.handleContentChange(null, previousElementData, null, null, null, null, false, {type: "showhide"}, null);
        expect(spyhandleContentChange).toHaveBeenCalled();
        spyhandleContentChange.mockClear()
    })

    it("handleContentChange for MML image", () => {
        const previousElementData = {
            type: "figure",
            html: {
                text: "<p>stanza text</p>"
            },
            figuretype:  "authoredtext",
            figuredata: {
                figuretype: "authoredtext"
            }
        }
        config.savingInProgress = false
        const spyhandleContentChange = jest.spyOn(elementContainerInstance, 'handleContentChange')
        elementContainerInstance.handleContentChange(null, previousElementData, null, null, null, null, true, null, null);
        expect(spyhandleContentChange).toHaveBeenCalled();
        spyhandleContentChange.mockClear()
    })
    it("toggleCopyMenu function", () => {
        const value = {},
            copyClickedX = 2,
            copyClickedY = 1;

        const spytoggleCopyMenu = jest.spyOn(elementContainerInstance, 'toggleCopyMenu')
        elementContainerInstance.toggleCopyMenu(value, copyClickedX, copyClickedY);
        expect(spytoggleCopyMenu).toHaveBeenCalled();
        spytoggleCopyMenu.mockClear()
    })
    it("setBorderToggle function - active state", () => {
        const elemBorderToggleFromProp = 'undefined', borderToggleFromState = "active";

        const spysetBorderToggle = jest.spyOn(elementContainerInstance, 'setBorderToggle')
        elementContainerInstance.setBorderToggle(elemBorderToggleFromProp, borderToggleFromState);
        expect(spysetBorderToggle).toHaveBeenCalled();
        expect(spysetBorderToggle).toHaveReturnedWith(borderToggleFromState);
        spysetBorderToggle.mockClear()
    })
    it("setBorderToggle function - not active state", () => {
        const elemBorderToggleFromProp = 'undefined', borderToggleFromState = "";

        const spysetBorderToggle = jest.spyOn(elementContainerInstance, 'setBorderToggle')
        elementContainerInstance.setBorderToggle(elemBorderToggleFromProp, borderToggleFromState);
        expect(spysetBorderToggle).toHaveBeenCalled();
        expect(spysetBorderToggle).toHaveReturnedWith('hideBorder');
        spysetBorderToggle.mockClear()
    })
    
    it('Render and Update three column test click event', () => {
        let props = {
            onClickCapture: jest.fn(),
            element: wipData.threeMulticolumn
        }
        const elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
        const elementContainerInstance = elementContainer.find('ElementContainer').instance();
        let element = wipData.threeMulticolumn;
        elementContainerInstance.renderMultipleColumnLabels(element);
        const spyUpdateColumnValues  = jest.spyOn(elementContainerInstance, 'updateColumnValues') 
        elementContainer.find('span.element-label-clickable-button').at(0).simulate('click');
        expect(spyUpdateColumnValues).toHaveBeenCalled();
        spyUpdateColumnValues.mockClear();
      });
})
