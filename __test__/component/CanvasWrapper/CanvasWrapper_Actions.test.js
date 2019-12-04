import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as selectActions from '../../../src/component/CanvasWrapper/CanvasWrapper_Actions';
const middlewares = [thunk];
import wip from '../../component/ElementContainer/wipData'
import { spy, stub } from 'sinon';
import moxios from 'moxios';
import {
    FETCH_SLATE_DATA,
    SET_ACTIVE_ELEMENT,
} from '../../../src/constants/Action_Constants';
import { slateData } from '../../../fixtures/slateTestingData'
const mockStore = configureMockStore(middlewares);
let initialState = {
    slateLevelData: {},
    // elementsTag: {},
    activeElement: {},
    splittedElementIndex: 0,
    pageNumberData: {}
};
describe('action file test', () => {
    let store = mockStore(() => initialState);

    beforeEach(() => {
        initialState = {
            slateLevelData: {},
            appStore:{
                slateLevelData: {
                    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
                        "id": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
                        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
                        "type": "manifest",
                        contents: {
                            "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
                            "title": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": "sample slate"
                            },
                            "frontmatter": [],
                            bodymatter: [
                                {
                                    "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                                    "type": "element-authoredtext",
                                    "subtype": "",
                                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                    "elementdata": {
                                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                        "text": ""
                                    },
                                    "html": {
                                        "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                                    },
                                    "comments": true,
                                    "tcm": true,
                                    "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                                    "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                                },
                                {
                                    "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b",
                                    "type": "element-authoredtext",
                                    "subtype": "",
                                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                    "elementdata": {
                                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                        "text": ""
                                    },
                                    "html": {
                                        "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                                    },
                                    "comments": true,
                                    "tcm": true,
                                    "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                                    "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                                }
                            ]
                        }
                    }, 
                permissions: [
                    "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
                    "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
                    "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
                ]
            }
        },
            // elementsTag: {},
            activeElement: {},
            splittedElementIndex: 0,
            pageNumberData: {}
        };

        moxios.install();
    });

    afterEach(() => moxios.uninstall());
    xit('testing---Fetch comment action', () => {
        store = mockStore(() => initialState);
        let manifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
        const expectedActions = [{
            type: FETCH_SLATE_DATA,
            payload: { slateData }

        }];
        let data = slateData
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: data
            });
        });
        return store.dispatch(selectActions.fetchSlateData(manifestURN)).then(() => {
            const { type, payload } = store.getActions()[0];
            expect(type).toBe(FETCH_SLATE_DATA);
        });
    })


    it('fetchSlateData', () => {
        const manifestURN = 'urn:9324dsfds23432dsf45'
        let store = mockStore();
        store.dispatch(selectActions.fetchSlateData(manifestURN));

    });
    it('fetchAuthUser', () => {
        let store = mockStore();
        store.dispatch(selectActions.fetchAuthUser());
    });
    // it('fetchElementTag', () => {
    //     let store = mockStore();
    //     store.dispatch(selectActions.fetchElementTag(wip, 0));
    // });
    it('setActiveElement for paragraph', () => {
        let store = mockStore();
        store.dispatch(selectActions.setActiveElement(wip.paragraph, 1));

        let expectedActions = [{
            type: SET_ACTIVE_ELEMENT,
            payload: {
                'elementType': 'element-authoredtext',
                'primaryOption': 'primary-paragraph',
                'secondaryOption': 'secondary-paragraph',
                'elementId': 'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a',
                'index': 1,
                'elementWipType': 'element-authoredtext',
                'tag': 'P',
                'toolbar': []

            }
        }]
        expect(store.getActions()).toEqual(expectedActions);

    });
    it('setActiveElement for paragraph with headers', () => {
        let store = mockStore();
        store.dispatch(selectActions.setActiveElement(wip["heading-1"], 1));

        let expectedActions = [{
            type: SET_ACTIVE_ELEMENT,
            payload: {
                'elementType': 'element-authoredtext',
                'primaryOption': 'primary-heading',
                'secondaryOption': 'secondary-heading-1',
                'elementId': 'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b',
                'index': 1,
                'elementWipType': 'element-authoredtext',
                'tag': 'H1',
                'toolbar': ['bold','underline','strikethrough','orderedlist','unorderedlist','increaseindent','decreaseindent','glossary','assetpopover','slatetag','redo']
            }
        }]
        expect(store.getActions()).toEqual(expectedActions);

    });
    it('setActiveElement for paragraph with blockfeature', () => {
        let store = mockStore();
        store.dispatch(selectActions.setActiveElement(wip.pullquote, 1));

        let expectedActions = [{
            type: SET_ACTIVE_ELEMENT,
            payload: {
                'elementType': 'element-authoredtext',
                'primaryOption': 'primary-blockquote',
                'secondaryOption': 'secondary-pullquote',
                'elementId': 'urn:pearson:work:5d489bfe-ef76-4193-b07a-62d9d393fe93',
                'index': 1,
                'elementWipType': 'element-blockfeature',
                'tag': 'BQ',
                'toolbar': ['bold','underline','strikethrough','orderedlist','unorderedlist', 'glossary','slatetag']
            }
        }]

        expect(store.getActions()).toEqual(expectedActions);

    });
    it('setActiveElement for paragraph with margilinia', () => {
        let store = mockStore();
        store.dispatch(selectActions.setActiveElement(wip.marginalia, 1));

        let expectedActions = [{
            type: SET_ACTIVE_ELEMENT,
            payload: {
                'elementType': 'element-authoredtext',
                'primaryOption': 'primary-blockquote',
                'secondaryOption': 'secondary-marginalia',
                'elementId': 'urn:pearson:work:3a87a270-5d35-4714-877e-9bca2eb25271',
                'index': 1,
                'elementWipType': 'element-blockfeature',
                'tag': 'BQ',
                'toolbar': ['bold','underline','strikethrough','orderedlist','unorderedlist', 'glossary','slatetag']
            }
        }]

        expect(store.getActions()).toEqual(expectedActions);

    });

    it('setActiveElement for paragraph with margilinia with attribution', () => {
        let store = mockStore();
        store.dispatch(selectActions.setActiveElement(wip["marginalia-attribution"], 1));

        let expectedActions = [{
            type: SET_ACTIVE_ELEMENT,
            payload: {
                'elementType': 'element-authoredtext',
                'primaryOption': 'primary-blockquote',
                'secondaryOption': 'secondary-marginalia-attribution',
                'elementId': 'urn:pearson:work:9c2d0567-c24d-44f5-8e8e-5b7d9859a26d',
                'index': 1,
                'elementWipType': 'element-blockfeature',
                'tag': 'BQ',
                'toolbar': ['bold','underline','strikethrough','orderedlist','unorderedlist', 'glossary','slatetag']
            }
        }]

        expect(store.getActions()).toEqual(expectedActions);

    });
    describe('action file test casses for figure', () => {


        xit('setActiveElement test cases------------- figure', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip.figure, 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-figure',
                    'secondaryOption': 'secondary-image-figure-width',
                    'elementId': 'urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'Fg',
                    'toolbar': ['assetpopover','decreaseindent']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });

        xit('setActiveElement test cases------------- figure image50Text', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip["figure-image50Text"], 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-figure',
                    'secondaryOption': 'secondary-image-figure-half',
                    'elementId': 'urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'Fg',
                    'toolbar': ['assetpopover','decreaseindent']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });

        xit('setActiveElement test cases------------- figure imageWiderThanText', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip["figure-imageWiderThanText"], 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-figure',
                    'secondaryOption': 'secondary-image-figure-wider',
                    'elementId': 'urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'Fg',
                    'toolbar': ['assetpopover','decreaseindent']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });

        xit('setActiveElement test cases------------- figure imageFullscreen', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip["figure-imageFullscreen"], 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-figure',
                    'secondaryOption': 'secondary-image-figure-full',
                    'elementId': 'urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'Fg',
                    'toolbar': ['assetpopover','decreaseindent']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });

        
        xit('setActiveElement test cases------------- figure image25Text', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip["figure-image25Text"], 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-figure',
                    'secondaryOption': 'secondary-image-figure-quarter',
                    'elementId': 'urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'Fg',
                    'toolbar': ['assetpopover','decreaseindent']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
    })


    describe('action file test casses for table', () => {
        xit('setActiveElement  with table', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip.table, 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-table',
                    'secondaryOption': 'secondary-image-table-half',
                    'elementId': 'urn:pearson:work:b33703aa-d629-4466-8606-cfcf0505e291',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'TB',
                    'toolbar': ['assetpopover','decreaseindent']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        xit('setActiveElement  with table imageTextWidthTableImage', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip["table-imageTextWidthTableImage"], 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-table',
                    'secondaryOption': 'secondary-image-table-width',
                    'elementId': 'urn:pearson:work:b33703aa-d629-4466-8606-cfcf0505e291',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'TB',
                    'toolbar': ['assetpopover','decreaseindent']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });

        xit('setActiveElement  with table imageWiderThanTextTableImage', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip["table-imageWiderThanTextTableImage"], 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-table',
                    'secondaryOption': 'secondary-image-table-wider',
                    'elementId': 'urn:pearson:work:b33703aa-d629-4466-8606-cfcf0505e291',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'TB',
                    'toolbar': ['assetpopover','decreaseindent']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });

        xit('setActiveElement  with table imageFullscreenTableImage', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip["table-imageFullscreenTableImage"], 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-table',
                    'secondaryOption': 'secondary-image-table-full',
                    'elementId': 'urn:pearson:work:b33703aa-d629-4466-8606-cfcf0505e291',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'TB',
                    'toolbar': ['assetpopover','decreaseindent']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
    
    })
    
    describe('action file test casses for mathImage', () => {
        xit('setActiveElement for   ------------------mathImage', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip.mathImage, 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-equation',
                    'secondaryOption': 'secondary-image-equation-half',
                    'elementId': 'urn:pearson:work:1d5259c3-63c9-4a77-9a52-0315007624d0',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'EQ',
                    'toolbar': ['assetpopover','decreaseindent']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        xit('setActiveElement for  -------------- mathImage imageTextWidthMathImage', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip["mathImage-imageTextWidthMathImage"], 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-equation',
                    'secondaryOption': 'secondary-image-equation-width',
                    'elementId': 'urn:pearson:work:1d5259c3-63c9-4a77-9a52-0315007624d0',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'EQ',
                    'toolbar': ['assetpopover','decreaseindent']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        xit('setActiveElement for  -------------- mathImage imageWiderThanTextMathImage', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip["mathImage-imageWiderThanTextMathImage"], 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-equation',
                    'secondaryOption': 'secondary-image-equation-wider',
                    'elementId': 'urn:pearson:work:1d5259c3-63c9-4a77-9a52-0315007624d0',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'EQ',
                    'toolbar': ['assetpopover','decreaseindent']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        xit('setActiveElement for  -------------- mathImage imageFullscreenMathImage', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip["mathImage-imageFullscreenMathImage"], 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-equation',
                    'secondaryOption': 'secondary-image-equation-full',
                    'elementId': 'urn:pearson:work:1d5259c3-63c9-4a77-9a52-0315007624d0',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'EQ',
                    'toolbar': ['assetpopover','decreaseindent']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
    })

    describe('action file test casses for eqation', () => {
        it('setActiveElement for eqation', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip.equation, 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-mathml-equation',
                    'secondaryOption': 'secondary-mathml-equation',
                    'elementId': 'urn:pearson:work:46a8d1a5-e664-4d6e-928a-a86e951d03bb',
                    'index': 1,
                    "longDesc": "",
                    'elementWipType': 'figure',
                    "altText": "",
                    'tag': 'MML',
                    'toolbar': ['assetpopover','decreaseindent','glossary']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
    })

    describe('action file test casses for codelisting', () => {
        it('setActiveElement for with codelisting', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip.codeEditor, 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-Default',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    "startNumber": "1",
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent','glossary']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
       it('setActiveElement  with C++', () => {
            let store = mockStore();
           let element= {"codeEditorWithC++":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "C++",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element["codeEditorWithC++"], 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-C++',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    "startNumber": "1",
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent','glossary']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        }); 
        it('setActiveElement  with Java', () => {
            let store = mockStore();
           let element= {"codeEditorWithJava":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "Java",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element.codeEditorWithJava, 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-Java',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "startNumber": "1",
                    "numbered": true,
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent','glossary']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        }); 
        it('setActiveElement  with C', () => {
            let store = mockStore();
           let element= {"codeEditorWithC":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "C",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element.codeEditorWithC, 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-C',
                    "startNumber": "1",
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent','glossary']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        }); 
        it('setActiveElement  with Python', () => {
            let store = mockStore();
           let element= {"codeEditorWithPython":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "Python",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element.codeEditorWithPython, 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-Python',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    "startNumber": "1",
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent','glossary']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        }); 

        it('setActiveElement  with Javascript', () => {
            let store = mockStore();
           let element= {"codeEditorWithJavascript":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "Javascript",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element.codeEditorWithJavascript, 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-Javascript',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    "startNumber": "1",
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent', "glossary"]
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        }); 
        it('setActiveElement  with HTML', () => {
            let store = mockStore();
           let element= {"codeEditorWithHTML":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "HTML",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element.codeEditorWithHTML, 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-HTML',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    'elementWipType': 'figure',
                    "startNumber": "1",
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent','glossary']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        }); 
        it('setActiveElement  with CSS', () => {
            let store = mockStore();
           let element= {"codeEditorWithCSS":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "CSS",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element.codeEditorWithCSS, 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-CSS',
                    "startNumber": "1",
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent','glossary']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        }); 
        it('setActiveElement  with Apache', () => {
            let store = mockStore();
           let element= {"codeEditorWithApache":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "Apache",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element.codeEditorWithApache, 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-Apache',
                    "startNumber": "1",
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent','glossary']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        }); 
        it('setActiveElement  with C#', () => {
            let store = mockStore();
           let element= {"codeEditorWithC#":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "C#",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element["codeEditorWithC#"], 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-C#',
                    "startNumber": "1",
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent','glossary']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        }); 
        it('setActiveElement  with JSON', () => {
            let store = mockStore();
           let element= {"codeEditorWithJSON":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "JSON",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element.codeEditorWithJSON, 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-JSON',
                    "startNumber": "1",
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent',"glossary",]
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        }); 
        it('setActiveElement  with Makefile', () => {
            let store = mockStore();
           let element= {"codeEditorWithMakefile":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "Makefile",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element.codeEditorWithMakefile, 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-Makefile',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "startNumber": "1",
                    "numbered": true,
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent','glossary']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        it('setActiveElement  with Kotlin', () => {
            let store = mockStore();
           let element= {"codeEditorWithKotlin":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "Kotlin",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element.codeEditorWithKotlin, 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-Kotlin',
                    "startNumber": "1",
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent', "glossary"]
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        it('setActiveElement  with R', () => {
            let store = mockStore();
           let element= {"codeEditorWithR":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "R",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element.codeEditorWithR, 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-R',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    "startNumber": "1",
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent','glossary']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        it('setActiveElement  with Perl', () => {
            let store = mockStore();
           let element= {"codeEditorWithPerl":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "Perl",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element.codeEditorWithPerl, 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-Perl',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    "startNumber": "1",
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent',"glossary",]
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        it('setActiveElement  with PHP', () => {
            let store = mockStore();
           let element= {"codeEditorWithPHP":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "PHP",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element.codeEditorWithPHP, 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-PHP',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    "startNumber": "1",
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent','glossary']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        it('setActiveElement  with GO', () => {
            let store = mockStore();
           let element= {"codeEditorWithGO":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "GO",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element.codeEditorWithGO, 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-GO',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    "startNumber": "1",
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent','glossary']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        it('setActiveElement  with Ruby', () => {
            let store = mockStore();
           let element= {"codeEditorWithRuby":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "Ruby",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element.codeEditorWithRuby, 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-Ruby',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    "startNumber": "1",
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent','glossary']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        it('setActiveElement  with Lisp', () => {
            let store = mockStore();
           let element= {"codeEditorWithLisp":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "Lisp",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element.codeEditorWithLisp, 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-Lisp',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    "startNumber": "1",
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent','glossary']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        it('setActiveElement  with Objective_C', () => {
            let store = mockStore();
           let element= {"codeEditorWithObjective_C":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "Objective_C",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element.codeEditorWithObjective_C, 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-Objective_C',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    "startNumber": "1",
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent','glossary']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        it('setActiveElement  with Scala', () => {
            let store = mockStore();
           let element= {"codeEditorWithScala":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "Scala",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element.codeEditorWithScala, 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-Scala',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    "startNumber": "1",
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent','glossary']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        it('setActiveElement  with Shell_Session', () => {
            let store = mockStore();
           let element= {"codeEditorWithShell_Session":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "Shell_Session",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element.codeEditorWithShell_Session, 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-Shell_Session',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    "startNumber": "1",
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent','glossary']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        it('setActiveElement  with SQL', () => {
            let store = mockStore();
           let element= {"codeEditorWithSQL":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "SQL",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element.codeEditorWithSQL, 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-SQL',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    "startNumber": "1",
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent','glossary']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        it('setActiveElement  with Swift', () => {
            let store = mockStore();
           let element= {"codeEditorWithSwift":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "Swift",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element.codeEditorWithSwift, 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-Swift',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    "startNumber": "1",
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent','glossary']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        it('setActiveElement  with XML', () => {
            let store = mockStore();
           let element= {"codeEditorWithXML":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "XML",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element.codeEditorWithXML, 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-XML',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    "startNumber": "1",
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent','glossary']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        it('setActiveElement  with Matlab', () => {
            let store = mockStore();
           let element= {"codeEditorWithMatlab":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "Matlab",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element.codeEditorWithMatlab, 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-Matlab',
                    "startNumber": "1",
                    "numbered": true,
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent','glossary']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        it('setActiveElement  with GLSL', () => {
            let store = mockStore();
           let element= {"codeEditorWithGLSL":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "GLSL",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element.codeEditorWithGLSL, 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-GLSL',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    "startNumber": "1",
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent','glossary']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        it('setActiveElement  with SML', () => {
            let store = mockStore();
           let element= {"codeEditorWithSML":{
                "id": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "type": "figure",
                "figuretype": "codelisting",
                "subtype": "codelisting",
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    "type": "codelisting",
                    "numbered": true,
                    "startNumber": "1",
                    "programlanguage": "SML",
                    "preformattedtext": []
                },
                
                "versionUrn": "urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1",
                "contentUrn": "urn:pearson:entity:b9de377c-4410-4607-8a5a-7f3ce6cf904a"
            } }
            store.dispatch(selectActions.setActiveElement(element.codeEditorWithSML, 1));
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'figure',
                    'primaryOption': 'primary-blockcode-equation',
                    'secondaryOption': 'secondary-blockcode-language-SML',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "startNumber": "1",
                    "numbered": true,
                    'elementWipType': 'figure',
                    'tag': 'BCE',
                    'toolbar': ['assetpopover','decreaseindent','glossary']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });

    })
    describe('action file test casses for video', () => {
        xit('setActiveElement for with video', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip.video, 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'video-audio',
                    'primaryOption': 'primary-video',
                    'secondaryOption': 'secondary-video-smartlink',
                    'elementId': 'urn:pearson:work:3057d0db-e900-45fb-8d6e-cbdf010fa149',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'VID',
                    'toolbar': ['assetpopover']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        xit('setActiveElement for with src internal', () => {
            let store = mockStore();
            let element= {
                "video":{
                    "id": "urn:pearson:work:3057d0db-e900-45fb-8d6e-cbdf010fa149",
                    "type": "figure",
                    "figuretype": "video",
                    "subtype": "figureVideo",
                    "figuredata": {
                        "height": "399",
                        "width": "600",
                        "schema": "http://schemas.pearson.com/wip-authoring/video/1#/definitions/video",
                        "videoid": "",
                        "posterimage": {
                            "imageid": "",
                            "path": "https://d12m40tknrppbi.cloudfront.net/cite/images/FPO-audio_video.png"
                        },
                        "videos": [
                            {
                                "format": "",
                                "path": ""
                            }
                        ],
                        "tracks": [],
                        "srctype": "internal",
                        "clipinfo": {}
                    },
            }}
            store.dispatch(selectActions.setActiveElement(element.video, 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'video-audio',
                    'primaryOption': 'primary-video',
                    'secondaryOption': 'secondary-video-alfresco',
                    'elementId': 'urn:pearson:work:3057d0db-e900-45fb-8d6e-cbdf010fa149',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'VID',
                    'toolbar': ['assetpopover']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
    })
    describe('action file test casses for audio', () => {
        xit('setActiveElement for with audio', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip.audio, 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'video-audio',
                    'primaryOption': 'primary-audio',
                    'secondaryOption': 'secondary-audio-smartlink',
                    'elementId': 'urn:pearson:work:3057d0db-e900-45fb-8d6e-cbdf010fa149',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'AUD',
                    'toolbar': ['assetpopover']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        xit('setActiveElement for with internal src', () => {
            let store = mockStore();
            let element= {
                "audio":{
                    "id": "urn:pearson:work:3057d0db-e900-45fb-8d6e-cbdf010fa149",
                    "type": "figure",
                    "figuretype": "audio",
                    "subtype": "figureVideo",
                    "figuredata": {
                        "height": "399",
                        "width": "600",
                        "schema": "http://schemas.pearson.com/wip-authoring/video/1#/definitions/video",
                        "videoid": "",
                        "posterimage": {
                            "imageid": "",
                            "path": "https://d12m40tknrppbi.cloudfront.net/cite/images/FPO-audio_video.png"
                        },
                        "videos": [
                            {
                                "format": "",
                                "path": ""
                            }
                        ],
                        "tracks": [],
                        "srctype": "internal",
                        "clipinfo": {}
                    },
                    "versionUrn": "urn:pearson:work:3057d0db-e900-45fb-8d6e-cbdf010fa149",
                    "contentUrn": "urn:pearson:entity:48594256-c78a-4f3d-abdc-fa0c99746351"
                },
            }
            store.dispatch(selectActions.setActiveElement(element.audio, 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'video-audio',
                    'primaryOption': 'primary-audio',
                    'secondaryOption': 'secondary-audio-alfresco',
                    'elementId': 'urn:pearson:work:3057d0db-e900-45fb-8d6e-cbdf010fa149',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'AUD',
                    'toolbar': ['assetpopover']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
    })
    describe('action file test casses for interactive', () => {
        xit('setActiveElement for with interavtive', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip.interactive, 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'element-interactive',
                    'primaryOption': 'primary-mmi',
                    'secondaryOption': 'secondary-interactive-mmi',
                    'elementId': 'urn:pearson:work:06b83c99-3e7c-4b5d-810e-0dee86dbbfdf',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'MMI',
                    'toolbar': ['assetpopover']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        xit('setActiveElement for with interavtive', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip.smartLink, 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'element-interactive',
                    'primaryOption': 'primary-smartlink',
                    'secondaryOption': 'secondary-interactive-smartlink-third',
                    'elementId': 'urn:pearson:work:9c29501d-374e-4400-815d-a71df4968d9f',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'SL',
                    'toolbar': ['assetpopover']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        xit('setActiveElement for with show hide', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip.showHide, 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'element-interactive',
                    'primaryOption': 'primary-showhide',
                    'secondaryOption': 'secondary-interactive-showhide',
                    'elementId': 'urn:pearson:work:276f4d81-e76b-4d11-9e5e-0dae671e631e',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'SH',
                    'toolbar': ['assetpopover']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        xit('setActiveElement for with show popup', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip.popUp, 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'element-interactive',
                    'primaryOption': 'primary-popup',
                    'secondaryOption': 'secondary-interactive-popup',
                    'elementId': 'urn:pearson:work:d5a8989a-f468-47b1-aca0-452e2503a09a',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'Pop',
                    'toolbar': ['assetpopover']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
        xit('setActiveElement for with show pdf', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip.pdf, 1));
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'element-interactive',
                    'primaryOption': 'primary-smartlink',
                    'secondaryOption': 'secondary-interactive-smartlink-pdf',
                    'elementId': 'urn:pearson:work:d5a8989a-f468-47b1-aca0-452e2503a09a',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'SL',
                    'toolbar': ['assetpopover']
                }
            }]
    
            expect(store.getActions()).toEqual(expectedActions);
    
        });
    })
});
