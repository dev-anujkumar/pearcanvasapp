import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as selectActions from '../../../src/component/CanvasWrapper/CanvasWrapper_Actions';
const middlewares = [thunk];
import axios from 'axios';
import wip from '../../component/ElementContainer/wipData';
import moxios from 'moxios';
import {
    FETCH_SLATE_DATA,
    SET_ACTIVE_ELEMENT,
    AUTHORING_ELEMENT_UPDATE
} from '../../../src/constants/Action_Constants';
import { POD_DEFAULT_VALUE } from '../../../src/constants/Element_Constants'
import { slateDataNew } from '../../../fixtures/slateTestingData';
import figureMockData from './mockData.js'
const mockStore = configureMockStore(middlewares);
jest.mock('../../../src/config/config.js', () => ({
    slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
    ASSET_POPOVER_ENDPOINT:"https://contentapis-staging.pearsoncms.net/manifest-api/",
    STRUCTURE_APIKEY:'Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld',
    PRODUCTAPI_ENDPOINT:"https://contentapis-staging.pearsoncms.net/product-api/",
    projectUrn: "urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef",
    parentEntityUrn : "bodyMatter",
    slateType: "assessment",
    totalPageCount :1,
    fromTOC:false
}));
let initialState = {
    appStore : {
        slateLevelData : slateDataNew.data
    },
    slateLevelData: {},
    // elementsTag: {},
    activeElement: {},
    splittedElementIndex: 0,
    pageNumberData: {}
};
let setActiveToolbar =  ["crossLinkingIcon",'assetpopover', 'decreaseindent', 'glossary']
jest.mock('axios');
describe('action file test', () => {
    let store = mockStore(() => initialState);
    let initialState2;
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
        initialState2 = {
            slateLevelData: {},
            appStore:{
                slateLevelData: slateDataNew.data
                },
            activeElement: {},
            splittedElementIndex: 0,
            pageNumberData: {}
        };
        moxios.install();
    });

    afterEach(() => moxios.uninstall());
    it('testing---Fetch comment action',async () => {
        store = mockStore(() => initialState);
        let manifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
        const expectedActions = [{
            type: FETCH_SLATE_DATA,
            payload: { slateDataNew }

        }];
        let data = slateDataNew;
        let dispatch = (obj) =>{
            if(obj.type === FETCH_SLATE_DATA){
              expect(obj).toEqual(expectedActions);
            }

        };
        let getState = () => {
            return initialState;
           }
        axios.get.mockImplementation(() => Promise.resolve(data));
        let result = await selectActions.fetchSlateData(manifestURN,2);
        result(dispatch,getState);
    })

    it('testing---createPopupUnit action - popup',async () => {
        store = mockStore(() => initialState);
        let manifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
        const expectedActions = [{
            type: AUTHORING_ELEMENT_UPDATE,
            payload: { slateDataNew }

        }];
        let data = slateDataNew;
        let dispatch = (obj) =>{
            if(obj.type === AUTHORING_ELEMENT_UPDATE){
              expect(obj).toEqual(expectedActions);
            }

        };
        let getState = () => {
            return initialState;
        }
        let cb = jest.fn()
        axios.post.mockImplementation(() => Promise.resolve(data));
        let result = await selectActions.createPopupUnit("formatted-title", slateDataNew.data[manifestURN].contents.bodymatter[2], cb ,"2-0", manifestURN);
        result(dispatch,getState);
    })
    it('testing---createPopupUnit action - citations',async () => {
        store = mockStore(() => initialState2);
        let manifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
        const expectedActions = [{
            type: AUTHORING_ELEMENT_UPDATE,
            payload: { slateDataNew }

        }];
        let data = slateDataNew;
        let dispatch = (obj) =>{
            if(obj.type === AUTHORING_ELEMENT_UPDATE){
              expect(obj).toEqual(expectedActions);
            }

        };
        let getState = () => {
            return initialState2;
        }
        let cb = jest.fn()
        axios.post.mockImplementation(() => Promise.resolve(data));
        let result = await selectActions.createPopupUnit(null, slateDataNew.data[manifestURN].contents.bodymatter[3], cb ,"3-0", manifestURN);
        result(dispatch,getState);
    })

    xit('fetchSlateData', () => {
        const manifestURN = 'urn:9324dsfds23432dsf45';
        const expectedActions = [{
            type: SET_ACTIVE_ELEMENT,
            payload: {  }

        }];
        let dispatch = (obj) =>{
            if(obj.type === FETCH_SLATE_DATA){
              expect(obj).toEqual(expectedActions);
            }
            else{
                expect(obj).toEqual(expectedActions);
            }

        };
        let getState = () => {
            return initialState;
           }
        selectActions.fetchSlateData(manifestURN)(dispatch,getState);

    });
    it('fetchAuthUser', () => {
        let store = mockStore();
        let dispatch = jest.fn();
        store.dispatch(selectActions.fetchAuthUser());
        selectActions.fetchAuthUser()(dispatch);
        expect(dispatch).not.toHaveBeenCalled();
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
        expect(store.getActions()[0].payload.tag).toEqual(expectedActions[0].payload.tag);

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
                'toolbar': ['bold','underline','strikethrough','orderedlist','unorderedlist','increaseindent','decreaseindent','glossary','crossLinkingIcon','assetpopover','slatetag','redo']
            }
        }]
        expect(store.getActions()[0].payload.tag).toEqual(expectedActions[0].payload.tag);

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

        expect(store.getActions()[0].payload.tag).toEqual(expectedActions[0].payload.tag);

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

        expect(store.getActions()[0].payload.tag).toEqual(expectedActions[0].payload.tag);

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

        expect(store.getActions()[0].payload.tag).toEqual(expectedActions[0].payload.tag);

    });
    describe('action file test casses for figure', () => {


        it('setActiveElement test cases------------- figure', () => {
            let expectedActions = figureMockData.figure
            let dispatch = (obj) => {
                if(obj.type === SET_ACTIVE_ELEMENT){
                    expect(obj.payload).toEqual(expectedActions[0].payload);
                }
                else{
                    return ''
                }
            };
            let getState = () => {
             return initialState;
            }
            selectActions.setActiveElement(wip.figure, 1)(dispatch,getState);
    
        });

        xit('setActiveElement test cases------------- figure image50Text', () => {
            let expectedActions = figureMockData.figureImage50Text
            let dispatch = (obj) => {
                if(obj.type === SET_ACTIVE_ELEMENT){
                    expect(obj.payload).toEqual(expectedActions[0].payload);
                }
                else{
                    return ''
                }
            };
            let getState = () => {
             return initialState;
            }
            selectActions.setActiveElement(wip["figure-image50Text"], 1)(dispatch,getState);
    
        });

        xit('setActiveElement test cases------------- figure imageWiderThanText', () => {
            let expectedActions = figureMockData.figureImageWiderThanText
            let dispatch = (obj) => {
                if(obj.type === SET_ACTIVE_ELEMENT){
                    expect(obj.payload).toEqual(expectedActions[0].payload);
                }
                else{
                    return ''
                }
            };
            let getState = () => {
             return initialState;
            }
            selectActions.setActiveElement(wip["figure-imageWiderThanText"], 1)(dispatch,getState);
    
        });

        xit('setActiveElement test cases------------- figure imageFullscreen', () => {
            let expectedActions = figureMockData.figureImageFullscreen
            let dispatch = (obj) => {
                if(obj.type === SET_ACTIVE_ELEMENT){
                    expect(obj.payload).toEqual(expectedActions[0].payload);
                }
                else{
                    return ''
                }
            };
            let getState = () => {
             return initialState;
            }
            selectActions.setActiveElement(wip["figure-imageFullscreen"], 1)(dispatch,getState);
        });

        
        xit('setActiveElement test cases------------- figure image25Text', () => {
            let expectedActions = figureMockData.figureImage25Text
            let dispatch = (obj) => {
                if(obj.type === SET_ACTIVE_ELEMENT){
                    expect(obj.payload).toEqual(expectedActions[0].payload);
                }
                else{
                    return ''
                }
            };
            let getState = () => {
             return initialState;
            }
            selectActions.setActiveElement(wip["figure-image25Text"], 1)(dispatch,getState);
        });
    })


    describe('action file test casses for table', () => {
        it('setActiveElement  with table', () => {
    
            let expectedActions = figureMockData.table
            let dispatch = (obj) => {
                if(obj.type === SET_ACTIVE_ELEMENT){
                    expect(obj.payload).toEqual(expectedActions[0].payload);
                }
                else{
                    return ''
                }
            };
            let getState = () => {
             return initialState;
            }
            selectActions.setActiveElement(wip.table, 1)(dispatch,getState);
    
        });
        xit('setActiveElement  with table imageTextWidthTableImage', () => {
            let expectedActions = figureMockData.imageTextWidthTableImage
            let dispatch = (obj) => {
                if(obj.type === SET_ACTIVE_ELEMENT){
                    expect(obj.payload).toEqual(expectedActions[0].payload);
                }
                else{
                    return ''
                }
            };
            let getState = () => {
             return initialState;
            }
            selectActions.setActiveElement(wip["table-imageTextWidthTableImage"], 1)(dispatch,getState);
    
        });

        xit('setActiveElement  with table imageWiderThanTextTableImage', () => {
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    "altText": "",
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-table',
                    "longDesc": "",
                    'secondaryOption': 'secondary-image-table-wider',
                    'elementId': 'urn:pearson:work:b33703aa-d629-4466-8606-cfcf0505e291',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'TB',
                    'toolbar': ['crossLinkingIcon','assetpopover','decreaseindent','glossary']
                }
            }]
            let dispatch = (obj) => {
                if(obj.type === SET_ACTIVE_ELEMENT){
                    expect(obj.payload).toEqual(expectedActions[0].payload);
                }
                else{
                    return ''
                }
            };
            let getState = () => {
             return initialState;
            }
            selectActions.setActiveElement(wip["table-imageWiderThanTextTableImage"], 1)(dispatch,getState);
    
        });

        xit('setActiveElement  with table imageFullscreenTableImage', () => {
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'altText':'',
                    'elementType': 'figure',
                    "longDesc": "",
                    'primaryOption': 'primary-image-table',
                    'secondaryOption': 'secondary-image-table-full',
                    'elementId': 'urn:pearson:work:b33703aa-d629-4466-8606-cfcf0505e291',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'TB',
                    'toolbar': ['crossLinkingIcon','assetpopover','decreaseindent','glossary']
                }
            }]
            let dispatch = (obj) => {
                if(obj.type === SET_ACTIVE_ELEMENT){
                    expect(obj.payload).toEqual(expectedActions[0].payload);
                }
                else{
                    return ''
                }
            };
            let getState = () => {
             return initialState;
            }
            selectActions.setActiveElement(wip["table-imageFullscreenTableImage"], 1)(dispatch,getState);
    
        });
    
    })
    
    describe('action file test casses for mathImage', () => {
        it('setActiveElement for   ------------------mathImage', () => {
    
            let expectedActions = figureMockData.mathImage
            let dispatch = (obj) => {
                if(obj.type === SET_ACTIVE_ELEMENT){
                    expect(obj.payload).toEqual(expectedActions[0].payload);
                }
                else{
                    return ''
                }
            };
            let getState = () => {
             return initialState;
            }
            selectActions.setActiveElement(wip.mathImage, 1)(dispatch,getState);
        });
        xit('setActiveElement for  -------------- mathImage imageTextWidthMathImage', () => {
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    "altText": "",
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-equation',
                    'secondaryOption': 'secondary-image-equation-width',
                    'elementId': 'urn:pearson:work:1d5259c3-63c9-4a77-9a52-0315007624d0',
                    'index': 1,
                    "longDesc": "",
                    'elementWipType': 'figure',
                    'tag': 'EQ',
                    'toolbar': ['crossLinkingIcon','assetpopover','decreaseindent','glossary']
                }
            }];
            let dispatch = (obj) => {
                if(obj.type === SET_ACTIVE_ELEMENT){
                    expect(obj.payload).toEqual(expectedActions[0].payload);
                }
                else{
                    return ''
                }
            };
            let getState = () => {
             return initialState;
            }
            selectActions.setActiveElement(wip["mathImage-imageTextWidthMathImage"], 1)(dispatch,getState);
    
        });
        xit('setActiveElement for  -------------- mathImage imageWiderThanTextMathImage', () => {
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    "altText": "",
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-equation',
                    'secondaryOption': 'secondary-image-equation-wider',
                    'elementId': 'urn:pearson:work:1d5259c3-63c9-4a77-9a52-0315007624d0',
                    'index': 1,
                    "longDesc": "",
                    'elementWipType': 'figure',
                    'tag': 'EQ',
                    'toolbar': ['crossLinkingIcon','assetpopover','decreaseindent','glossary']
                }
            }]
            let dispatch = (obj) => {
                if(obj.type === SET_ACTIVE_ELEMENT){
                    expect(obj.payload).toEqual(expectedActions[0].payload);
                }
                else{
                    return ''
                }
            };
            let getState = () => {
             return initialState;
            }
            selectActions.setActiveElement(wip["mathImage-imageWiderThanTextMathImage"], 1)(dispatch,getState);
        });
        xit('setActiveElement for  -------------- mathImage imageFullscreenMathImage', () => {
    
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    "altText": "",
                    'elementType': 'figure',
                    'primaryOption': 'primary-image-equation',
                    'secondaryOption': 'secondary-image-equation-full',
                    'elementId': 'urn:pearson:work:1d5259c3-63c9-4a77-9a52-0315007624d0',
                    'index': 1,
                    "longDesc": "",
                    'elementWipType': 'figure',
                    'tag': 'EQ',
                    'toolbar': ['crossLinkingIcon','assetpopover','decreaseindent','glossary']
                }
            }]
            let dispatch = (obj) => {
                if(obj.type === SET_ACTIVE_ELEMENT){
                    expect(obj.payload).toEqual(expectedActions[0].payload);
                }
                else{
                    return ''
                }
            };
            let getState = () => {
             return initialState;
            }
            selectActions.setActiveElement(wip["mathImage-imageFullscreenMathImage"], 1)(dispatch,getState);
        });
    })

    xdescribe('action file test casses for eqation', () => {
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
                    'toolbar': ['crossLinkingIcon','assetpopover','decreaseindent','glossary']
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
                    'toolbar': ['crossLinkingIcon','assetpopover', 'decreaseindent', 'glossary']
                }
            }]

            expect(store.getActions().type).toEqual(expectedActions.type);

        });

    })
    describe('action file test casses for video', () => {
        it('setActiveElement for with video', () => {
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
                    'toolbar': ['crossLinkingIcon','assetpopover','glossary']
                }
            }]
            let dispatch = (obj) => {
                if(obj.type === SET_ACTIVE_ELEMENT){
                    expect(obj.payload).toEqual(expectedActions[0].payload);
                }
                else{
                    return ''
                }
            };
            let getState = () => {
             return initialState;
            }
            selectActions.setActiveElement(wip.video, 1)(dispatch,getState);
        });
        it('setActiveElement for with src internal', () => {
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
            let dispatch = (obj) => {
                if(obj.type === SET_ACTIVE_ELEMENT){
                    expect(obj.payload).toEqual(expectedActions[0].payload);
                }
                else{
                    return ''
                }
            };
            let getState = () => {
             return initialState;
            }
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
                    'toolbar': ['crossLinkingIcon','assetpopover','glossary']
                }
            }]
            selectActions.setActiveElement(element.video, 1)(dispatch,getState);
    
        });
    })
    describe('action file test casses for audio', () => {
        it('setActiveElement for with audio', () => {
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
                    'toolbar': ['crossLinkingIcon','assetpopover','glossary']
                }
            }]
            let dispatch = (obj) => {
                if(obj.type === SET_ACTIVE_ELEMENT){
                    expect(obj.payload).toEqual(expectedActions[0].payload);
                }
                else{
                    return ''
                }
            };
            let getState = () => {
             return initialState;
            }
            selectActions.setActiveElement(wip.audio, 1)(dispatch,getState);
    
        });
        it('setActiveElement for with internal src', () => {
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
                    'toolbar': ['crossLinkingIcon','assetpopover','glossary']
                }
            }]
            let dispatch = (obj) => {
                if(obj.type === SET_ACTIVE_ELEMENT){
                    expect(obj.payload).toEqual(expectedActions[0].payload);
                }
                else{
                    return ''
                }
            };
            let getState = () => {
             return initialState;
            }
            selectActions.setActiveElement(element.audio, 1)(dispatch,getState);
    
        });
    })
    describe('action file test casses for interactive', () => {
        it('setActiveElement for with interavtive', () => {
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    "altText": "",
                    'elementType': 'element-interactive',
                    'primaryOption': 'primary-mmi',
                    'secondaryOption': 'secondary-interactive-mmi',
                    'elementId': 'urn:pearson:work:06b83c99-3e7c-4b5d-810e-0dee86dbbfdf',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'MMI',
                    'toolbar': ['crossLinkingIcon','assetpopover','glossary']
                }
            }]
            let dispatch = (obj) => {
                if(obj.type === SET_ACTIVE_ELEMENT){
                    expect(obj.payload).toEqual(expectedActions[0].payload);
                }
                else{
                    return ''
                }
            };
            let getState = () => {
             return initialState;
            }
            selectActions.setActiveElement(wip.interactive, 1)(dispatch,getState);
    
        });
        it('setActiveElement for with interavtive', () => {
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    "altText": "",
                    'elementType': 'element-interactive',
                    'primaryOption': 'primary-smartlink',
                    'secondaryOption': 'secondary-interactive-smartlink-third',
                    'elementId': 'urn:pearson:work:9c29501d-374e-4400-815d-a71df4968d9f',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'SL',
                    'toolbar': ['crossLinkingIcon','assetpopover','glossary']
                }
            }];
            let dispatch = (obj) => {
                if(obj.type === SET_ACTIVE_ELEMENT){
                    expect(obj.payload).toEqual(expectedActions[0].payload);
                }
                else{
                    return ''
                }
            };
            let getState = () => {
             return initialState;
            }
            selectActions.setActiveElement(wip.smartLink, 1)(dispatch,getState);
    
        });
        xit('setActiveElement for with show hide', () => {
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    "altText": "",
                    'elementType': 'element-interactive',
                    'primaryOption': 'primary-showhide',
                    'secondaryOption': 'secondary-aside-showhide',
                    'elementId': 'urn:pearson:work:276f4d81-e76b-4d11-9e5e-0dae671e631e',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': 'SH',
                    'toolbar': []
                }
            }];
            let dispatch = (obj) => {
                if(obj.type === SET_ACTIVE_ELEMENT){
                    expect(obj.payload.tag).toEqual(expectedActions[0].payload.tag);
                }
                else{
                    return ''
                }
            };
            let getState = () => {
             return initialState;
            }
            let dataToSend = wip.showHide;
            dataToSend.type = 'showhide'
            selectActions.setActiveElement(dataToSend, 1)(dispatch,getState);
    
        });
        xit('setActiveElement for with show popup', () => {
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    "altText": "",
                    'elementType': 'element-interactive',
                    'primaryOption': 'primary-popup',
                    'secondaryOption': 'secondary-interactive-popup',
                    'elementId': 'urn:pearson:work:d5a8989a-f468-47b1-aca0-452e2503a09a',
                    'index': 1,
                    'elementWipType': 'figure',
                    'tag': undefined,
                    'toolbar': undefined
                }
            }];
            let dispatch = (obj) => {
                if(obj.type === SET_ACTIVE_ELEMENT){
                    expect(obj.payload).toEqual(expectedActions[0].payload);
                }
                else{
                    return ''
                }
            };
            let getState = () => {
             return initialState;
            }
            selectActions.setActiveElement(wip.popUp, 1)(dispatch,getState);
    
        });
        it('setActiveElement for with show pdf', () => {
            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload:{ elementType: 'element-interactive',
                primaryOption: 'primary-smartlink',
                secondaryOption: 'secondary-interactive-smartlink-pdf',
                altText: '',
                elementId: 'urn:pearson:work:d5a8989a-f468-47b1-aca0-452e2503a09a',
                index: 1,
                elementWipType: 'figure',
                tag: "SL",
                toolbar: ["crossLinkingIcon","assetpopover","glossary"],
               }
            }];
            let dispatch = (obj) => {
                if(obj.type === SET_ACTIVE_ELEMENT){
                    expect(obj.payload).toEqual(expectedActions[0].payload);

                }
                else{
                    return ''
                }
            };
            let getState = () => {
             return initialState;
            }
            selectActions.setActiveElement(wip.pdf, 1)(dispatch, getState);
    
        });
    })
    describe('action file tets cases for assessment', () => {

        it('setActiveElement for with assesment', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip.assessment, 1));

            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'element-assessment',
                    'primaryOption': 'primary-single-assessment',
                    'secondaryOption': 'secondary-single-assessment-cite',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    "startNumber": "1",
                    'elementWipType': 'figure',
                    'tag': 'Qu',
                    'toolbar': setActiveToolbar
                }
            }]

            expect(store.getActions().type).toEqual(expectedActions.type);

        });

    })
    describe('action file tets cases for containers', () => {

        it('setActiveElement for with elemnt-aside', () => {
            let store = mockStore();
            let dataToSend = wip.aside;
            dataToSend.subtype="";
            store.dispatch(selectActions.setActiveElement(dataToSend, 1));

            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'element-aside',
                    'primaryOption': 'primary-aside-aside',
                    'secondaryOption': 'secondary-aside-sb1',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    "startNumber": "1",
                    'elementWipType': 'element-aside',
                    'tag': 'As',
                    'toolbar': setActiveToolbar
                }
            }]

            expect(store.getActions().type).toEqual(expectedActions.type);

        });

        it('setActiveElement for with eworkde example', () => {
            let store = mockStore();
            let dataToSend = wip.workedExample;
            dataToSend.designtype = ""
            store.dispatch(selectActions.setActiveElement(wip.workedExample, 1));

            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'element-workedexample',
                    'primaryOption': 'primary-workedexample-we1',
                    'secondaryOption': 'secondary-workedexample-we1',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    "startNumber": "1",
                    'elementWipType': 'element-aside',
                    'tag': 'WE',
                    'toolbar': setActiveToolbar
                }
            }]

            expect(store.getActions().type).toEqual(expectedActions.type);

        });

    })
    describe('action file tets cases for LO', () => {

        it('setActiveElement for with LO', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip.lo, 1));

            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'element-aside',
                    'primaryOption': 'primary-aside-aside',
                    'secondaryOption': 'secondary-aside-sb1',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    "startNumber": "1",
                    'elementWipType': 'element-aside',
                    'tag': 'LO',
                    'toolbar': setActiveToolbar
                }
            }]

            expect(store.getActions().type).toEqual(expectedActions.type);

        });

    })

    describe('action file tets cases for list', () => {

        it('setActiveElement for with list', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip.list, 1));

            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'element-list',
                    'primaryOption': 'primary-ordered-list',
                    'secondaryOption': 'secondary-ordered-list',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    "startNumber": "1",
                    'elementWipType': 'element-list',
                    'tag': 'LI',
                    'toolbar': setActiveToolbar
                }
            }]

            expect(store.getActions().type).toEqual(expectedActions.type);

        });

    })

    describe('action file tets cases for opener element', () => {

        it('setActiveElement for with opener element', () => {
            let store = mockStore();
            store.dispatch(selectActions.setActiveElement(wip.opener, 1));

            let expectedActions = [{
                type: SET_ACTIVE_ELEMENT,
                payload: {
                    'elementType': 'element-opener',
                    'elementId': 'urn:pearson:work:ab5ae968-d1e8-4d31-8c2e-1a3cfdc7b0b1',
                    'index': 1,
                    "numbered": true,
                    "startNumber": "1",
                    'elementWipType': 'element-opener',
                    'tag': 'OE',
                    'toolbar': setActiveToolbar
                }
            }]

            expect(store.getActions().type).toEqual(expectedActions.type);
        });
    })
});
