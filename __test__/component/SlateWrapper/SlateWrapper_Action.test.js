import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import * as actions from '../../../src/component/SlateWrapper/SlateWrapper_Actions';
import { SlatetDataOpenerDefault, SlatetDataOpenerElement, createstoreWithFigure, slateMockData, sectionBreakMockSlateData, NotSectionBreakMockSlateData } from "../../../fixtures/slateTestingData"
import { SET_SLATE_TYPE, SET_SLATE_ENTITY, ACCESS_DENIED_POPUP, SET_PARENT_NODE,SWAP_ELEMENT, SET_UPDATED_SLATE_TITLE, AUTHORING_ELEMENT_CREATED,SET_SPLIT_INDEX, GET_PAGE_NUMBER, ERROR_POPUP } from '../../../src/constants/Action_Constants';
import config from '../../../src/config/config';
import { elementAside,slateLevelData1, slateLevelData2, asideDataType1, asideDataType2 } from '../../../fixtures/elementAsideData';
import MockAdapter from 'axios-mock-adapter';

jest.mock('../../../src/component/TcmSnapshots/TcmSnapshots_Utility.js',()=>({
    tcmSnapshotsForCreate: jest.fn()
}))

jest.mock('../../../src/component/SlateWrapper/slateWrapperAction_helper.js',()=>({
    fetchStatusAndPaste: jest.fn(()=>Promise.resolve({})),
    prepareDataForTcmCreate: jest.fn(()=> Promise.resolve({})),
    checkElementExistence: jest.fn(()=> Promise.resolve({})),
    onPasteSuccess: jest.fn(()=> Promise.resolve({})),
    setPayloadForContainerCopyPaste: jest.fn(()=> ({content: [{id:'urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6', type:'popup' }]}))
}))

jest.mock('../../../src/component/ElementFigure/AlfrescoSiteUrl_helper.js',()=>({
    handleAlfrescoSiteUrl: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Tests Slate Wrapper Actions', () => {
    let store;
    let initialState={appStore : {}};
    let store2;
    let initialState2={appStore : {}};
    let store3;
    let initialState3={appStore : {}};
    beforeEach(() => {
        initialState = {
            appStore : {
                slateLevelData: createstoreWithFigure.slateLevelData,
                // elementsTag: {},
                activeElement: {},
                splittedElementIndex: 0,
                pageNumberData: {},
                popupSlateData: {
                    type: "popup"
                },
                tcmReducer:{tcmSnapshot:["78","9"]}
            },
            selectionReducer: {
                selection: {
                    activeAnimation: true,
                    deleteElm: {id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", type: "element-authoredtext", parentUrn: undefined, asideData: undefined, contentUrn: "urn:pearson:entity:da9f3f72-2cc7-4567-8fb9-9a887c360979",
                        cutCopyParentUrn: {
                            contentUrn: '',
                            manifestUrn: '',
                            slateLevelData: ''
                        }
                    },
                    element: {id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", type: "element-authoredtext", schema: "http://schemas.pearson.com/wip-authoring/element/1", html: {text:''}},
                    inputSubType: "NA",
                    inputType: "AUTHORED_TEXT",
                    operationType: "copy",
                    sourceElementIndex: 2,
                    sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
                    sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6"
                }
            }
        };
        store = mockStore(() => initialState);
        initialState2 = {
            appStore : {
                slateLevelData: createstoreWithFigure.slateLevelData,
                activeElement: {},
                splittedElementIndex: 0,
                pageNumberData: {},
                popupSlateData: {
                    type: ""
                }
            }
        };
        store2 = mockStore(() => initialState2);
        moxios.install();
        
    });
    afterEach(() => moxios.uninstall());
  
    it('testing------- ADD OPENER ELEMENT ------action', () => {
        initialState = {
            appStore : {
                slateLevelData: SlatetDataOpenerDefault,
                // elementsTag: {},
                activeElement: {},
                splittedElementIndex: 0,
                pageNumberData: {}
            }
        };
        store = mockStore(() => initialState);
        const type = "OPENER";
        const index = 3;
        const _requestData = {
            "projectUrn": "urn:pearson:distributable:553615b2-57c9-4508-93a9-17c6909d5b44",
            "slateEntityUrn": "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75",
            "slateUrn": "urn:pearson:manifest:b94059f3-4592-4d84-a316-18d4ba05d734",
            "type": type,
            "index": index
        };
        config.slateManifestURN = "urn:pearson:manifest:d91706aa-0e9b-4015-aaef-fb3a9cf46ec0";
        const axiosPayload = SlatetDataOpenerElement;
        const expectedActions = {
            type: AUTHORING_ELEMENT_CREATED,
            payload: { axiosPayload }

        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: axiosPayload
            });
        });
        return store.dispatch(actions.createElement(type, index)).then(() => {
            const { type, payload } = store.getActions()[0];
            expect(type).toBe(expectedActions.type);
        }).catch((err)=>{})
    });
    it('testing------- SECTION_BREAK ------action', () => {
        let store = mockStore(() => initialState);
        const type = "SECTION_BREAK";
        const index = 3;
        const _requestData = {
            "projectUrn": "urn:pearson:distributable:553615b2-57c9-4508-93a9-17c6909d5b44",
            "slateEntityUrn": "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75",
            "slateUrn": "urn:pearson:manifest:b94059f3-4592-4d84-a316-18d4ba05d734",
            "type": type,
            "index": index
        };
        config.slateManifestURN = "urn:pearson:manifest:d91706aa-0e9b-4015-aaef-fb3a9cf46ec0";
       // config.tcmStatus=true
        const axiosPayload = createstoreWithFigure.slateLevelData;
        const expectedActions = {
            type: "SECTION_BREAK",
            payload: { axiosPayload }

        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: axiosPayload
            });
        });
         store.dispatch(actions.createElement(type, index));
         expect(type).toBe(expectedActions.type);
    });
    it('testing------- ASIDE ------action', () => {
        //let store = mockStore(() => initialState);
        const type = "FIGURE";
        const index = 3;
        const _requestData = {
            "projectUrn": "urn:pearson:distributable:553615b2-57c9-4508-93a9-17c6909d5b44",
            "slateEntityUrn": "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75",
            "slateUrn": "urn:pearson:manifest:b94059f3-4592-4d84-a316-18d4ba05d734",
            "type": type,
            "index": index
        };
        config.slateManifestURN = "urn:pearson:manifest:d91706aa-0e9b-4015-aaef-fb3a9cf46ec0";
        const axiosPayload = createstoreWithFigure.slateLevelData;
        const expectedActions = {
            type: "FIGURE",
            payload: { axiosPayload }

        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: axiosPayload
            });
        });
        let  parentUrn= {
            elementType: "element-aside",
            manifestUrn:"urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7"
        }
        return store.dispatch(actions.createElement(type, index, parentUrn, {type : 'element-aside', id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7'})).then(() => {
            expect(type).toBe(expectedActions.type);
        });
    });
    it('testing------- ASIDE ------action when aside and element id same', () => {
        //let store = mockStore(() => initialState);
        const type = "FIGURE";
        const index = 3;
        const _requestData = {
            "projectUrn": "urn:pearson:distributable:553615b2-57c9-4508-93a9-17c6909d5b44",
            "slateEntityUrn": "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75",
            "slateUrn": "urn:pearson:manifest:b94059f3-4592-4d84-a316-18d4ba05d734",
            "type": type,
            "index": index
        };
        config.slateManifestURN = "urn:pearson:manifest:d91706aa-0e9b-4015-aaef-fb3a9cf46ec0";
        const slateLevelData = createstoreWithFigure.slateLevelData;
        const expectedActions = {
            type: AUTHORING_ELEMENT_CREATED,
            payload: { slateLevelData }

        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: slateLevelData
            });
        });
        let  parentUrn= {
            elementType: "manifest",
            manifestUrn:"urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b700"
        }
        return store.dispatch(actions.createElement(type, index, parentUrn, {type : 'element-aside', id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7'})).then(() => {
            let { type, payload } = store.getActions()[0];
            expect(type).toBe(expectedActions.type);
            expect(payload).toStrictEqual(expectedActions.payload);
        });
    }); 
    it('testing------- POPUP ------action when fails', () => {
        //let store = mockStore(() => initialState);
        const type = "POP_UP";
        const index = 3;
        const _requestData = {
            "projectUrn": "urn:pearson:distributable:553615b2-57c9-4508-93a9-17c6909d5b44",
            "slateEntityUrn": "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75",
            "slateUrn": "urn:pearson:manifest:b94059f3-4592-4d84-a316-18d4ba05d734",
            "type": type,
            "index": index
        };
        config.slateManifestURN = "urn:pearson:manifest:d91706aa-0e9b-4015-aaef-fb3a9cf46ec0";
        const expectedActions = {
            type: ERROR_POPUP,
            payload: { show: true }

        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: _requestData
            });
        });
        let  parentUrn= {
            elementType: "manifest",
            manifestUrn:"urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b700"
        }
        return store.dispatch(actions.createElement(type, index, parentUrn, {type : 'popup', id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7'})).then(() => {
            let { type, payload } = store.getActions()[0];
            expect(type).toBe(expectedActions.type);
            expect(payload).toStrictEqual(expectedActions.payload);
        });
    });
    it('testing------- SWAP ELEMENT ------action - then', () => {
        //let store = mockStore(() => initialState);
        const type = "element-authoredtext";
        const index = 2;

        let swappedElementData = {
            id : "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
            contentUrn : "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
        }

        let _requestData = {
            "projectUrn": "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
            "currentSlateEntityUrn":"urn:pearson:entity:c8d3d2b2-176c-48fc-8383-33444fe335f5",
            "destSlateEntityUrn":"urn:pearson:entity:c8d3d2b2-176c-48fc-8383-33444fe335f5",
            "workUrn":swappedElementData.id,
            "entityUrn":swappedElementData.contentUrn,
            "type": type,
            "index": index
        }

        let dataObj = {
            oldIndex : 1,
            newIndex : 2,
            swappedElementData : swappedElementData,
            // slateId:_slateId,
            workedExample : false   
        }


        const expectedActions = {
            type: SWAP_ELEMENT
        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200
            });
        });

        return store.dispatch(actions.swapElement(dataObj,()=>{})).then(() => {
            const { type } = store.getActions()[0];
            expect(type).toBe(expectedActions.type);

        });
    });
    it('testing------- SWAP ELEMENT ------action - then- citation element', () => {
        let swappedElementData = {
            "id" : "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27636",
            "contentUrn" : "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4e",
            "type": "element-citation"
        }

        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f"
        config.slateEntityURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5"
        
        let dataObj = {
            oldIndex : 0,
            newIndex : 1,
            swappedElementData : swappedElementData,
            containerTypeElem: 'cg' ,
            currentSlateEntityUrn:"urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5"
        }

        const expectedActions = {
            type: SWAP_ELEMENT
        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200
            });
        });

        return store.dispatch(actions.swapElement(dataObj,()=>{})).then(() => {
            const { type } = store.getActions()[0];
            expect(type).toBe(expectedActions.type);

        });
    });
    it('testing------- handleSplitSlate ------action - then', () => {

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200
            });
        });
        config.slateEntityURN = 'urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb';
        const newSlateObj = {contentUrn : '',entityUrn : '', containerUrn : ''};
        return store.dispatch(actions.handleSplitSlate(newSlateObj)).then(() => {
            const { type } = store.getActions()[1];
            expect(type).toBe('FETCH_SLATE_DATA');
        });
    });
    it('testing------- Create Element ------action -Citation Element', () => {
        //let store = mockStore(() => initialState);
        config.slateManifestURN = "urn:pearson:manifest:d91706aa-0e9b-4015-aaef-fb3a9cf46ec0";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f"
        config.slateEntityURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5"
        const slateLevelData = createstoreWithFigure.slateLevelData2
        const expectedActions = {
            type: AUTHORING_ELEMENT_CREATED,
            payload: { slateLevelData }

        };
        let citationData=                    {
            "id": "urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e",
            "schema": "http://schemas.pearson.com/wip-authoring/citations/1",
            "type": "citations",
            "contents": {
                "formatted-title": {
                    "id":"urn:pearson:work:3247d017-9f4b-4260-b3f2-7d9b175ccd76","type":"element-authoredtext","schema":"http://schemas.pearson.com/wip-authoring/element/1","elementdata":{"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext","text":""},"html":{"text":`This is the optional title for Citations. It would be taken from the element-authoredtext object referenced by the formatted-title.`},"versionUrn":"urn:pearson:work:3247d017-9f4b-4260-b3f2-7d9b175ccd76","contentUrn":"urn:pearson:entity:0ab3a13b-4045-4389-b8da-911e2e2701d7","status":"wip","tcm":false,"feedback":false,"comments":false
                },
                "bodymatter": [
                {
                    "id": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635",
                    "type": "element-citation",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "Allport, G. W., &amp; Odbert, H. S. (1936). Trait names: A psycho-lexical study. Psychological Monographs, 47(211).",
                        "textsemantics":
                        [
                            {
                                "type": "strong",
                                "charStart": 81,
                                "charEnd": 105
                            }
                        ]
                    },
                    "html" : {
                        "text":`<p class="paragraphNumeroUnoCitation" data-contenturn="urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4d" data-versionurn="urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635">Allport, G. W., &amp; Odbert, H. S. (1936). Trait names: A psycho-lexical study. <em>Psychological Monographs,</em> 47(211). The CITE classes for the containing the WiP's "element-citation" content should be decided based on the context of usage as described below. It follows the same logic as when paragraphNumeroUno and paragraphNummerEins. If the citation grouping.</p>`
                    },
                    "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4d",
                    "versionUrn": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635"
                },
                {
                    "id": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27636",
                    "type": "element-citation",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
                    },
                    "html" : {
                        "text":`<p class="paragraphNumeroUnoCitation" data-contenturn="urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4e" data-versionurn="urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27636">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>`
                    },
                    "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4e",
                    "versionUrn": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27636"
                },
                {id: "urn:pearson:work:005d9c0a-c549-41bb-8d60-7ea1cd80e4a5",
                type: "element-citation",
                schema: "http://schemas.pearson.com/wip-authoring/element/1",
                elementdata: {schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", text: ""},
                html: {text: '<p class="paragraphNumeroUnoCitation"><br></p>'},
                versionUrn: "urn:pearson:work:005d9c0a-c549-41bb-8d60-7ea1cd80e4a5",
                contentUrn: "urn:pearson:entity:5aa8dad2-5ea4-4d69-8383-d71def8615fb",
                status: "wip",
                tcm: true,
                feedback: false,
                comments: false},
                {
                    "id": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27637",
                    "type": "element-citation",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
                    },
                    "html" : {
                        "text":`<p class="paragraphNumeroUnoCitation" data-contenturn="urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4e" data-versionurn="urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27636">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>`
                    },
                    "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r43",
                    "versionUrn": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27637"
                }
            ]
            },
            "contentUrn": "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5",
            "versionUrn": "urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e"
        }
        let resData ={
            id: "urn:pearson:work:005d9c0a-c549-41bb-8d60-7ea1cd80e4a5",
            type: "element-citation",
            schema: "http://schemas.pearson.com/wip-authoring/element/1",
            elementdata: { schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", text: "" },
            html: { text: '<p class="paragraphNumeroUnoCitation"><br></p>' },
            versionUrn: "urn:pearson:work:005d9c0a-c549-41bb-8d60-7ea1cd80e4a5",
            contentUrn: "urn:pearson:entity:5aa8dad2-5ea4-4d69-8383-d71def8615fb",
            status: "wip",
            tcm: true,
            feedback: false,
            comments: false
        }
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    data: resData
                }
            });
        });
        let  parentUrn2= {
            elementType: "citations",
            manifestUrn:"urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e",
            contentUrn: "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5"
        }
        let asideData2 = {
            type: 'citations', 
            id: 'urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e',
            contentUrn: "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5",
            element: citationData }
        return store2.dispatch(actions.createElement("ELEMENT_CITATION", 3, parentUrn2,asideData2)).then(() => {          
            let { type, payload } = store2.getActions()[0];
            expect(type).toEqual(expectedActions.type);

        });
    });
    it('testing------- POPUP ------action when fails', () => {
        //let store = mockStore(() => initialState);
        const type = "POP_UP";
        const index = 3;
        const _requestData = {
            "projectUrn": "urn:pearson:distributable:553615b2-57c9-4508-93a9-17c6909d5b44",
            "slateEntityUrn": "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75",
            "slateUrn": "urn:pearson:manifest:b94059f3-4592-4d84-a316-18d4ba05d734",
            "type": type,
            "index": index
        };
        config.slateManifestURN = "urn:pearson:manifest:d91706aa-0e9b-4015-aaef-fb3a9cf46ec0";
        const expectedActions = {
            type: ERROR_POPUP,
            payload: { show: true }

        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: _requestData
            });
        });
        let  parentUrn= {
            elementType: "manifest",
            manifestUrn:"urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b700"
        }
        return store.dispatch(actions.createElement(type, index, parentUrn, {type : 'popup', id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7'})).then(() => {
            let { type, payload } = store.getActions()[0];
            expect(type).toBe(expectedActions.type);
            expect(payload).toStrictEqual(expectedActions.payload);
        });
    });  
    it('testing------- SWAP ELEMENT ------action - then', () => {
        //let store = mockStore(() => initialState);
        const type = "element-authoredtext";
        const index = 2;

        let swappedElementData = {
            id : "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
            contentUrn : "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
        }

        let _requestData = {
            "projectUrn": "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
            "currentSlateEntityUrn":"urn:pearson:entity:c8d3d2b2-176c-48fc-8383-33444fe335f5",
            "destSlateEntityUrn":"urn:pearson:entity:c8d3d2b2-176c-48fc-8383-33444fe335f5",
            "workUrn":swappedElementData.id,
            "entityUrn":swappedElementData.contentUrn,
            "type": type,
            "index": index
        }

        let dataObj = {
            oldIndex : 1,
            newIndex : 2,
            swappedElementData : swappedElementData,
            // slateId:_slateId,
            workedExample : false   
        }


        const expectedActions = {
            type: SWAP_ELEMENT
        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200
            });
        });

        return store.dispatch(actions.swapElement(dataObj,()=>{})).then(() => {
            const { type } = store.getActions()[0];
            expect(type).toBe(expectedActions.type);

        });
    });
    it('testing------- SWAP ELEMENT ------action - then- citation element', () => {
        let swappedElementData = {
            "id" : "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27636",
            "contentUrn" : "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4e",
            "type": "element-citation"
        }

        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f"
        config.slateEntityURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5"
        
        let dataObj = {
            oldIndex : 0,
            newIndex : 1,
            swappedElementData : swappedElementData,
            containerTypeElem: 'cg' ,
            currentSlateEntityUrn:"urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5"
        }

        const expectedActions = {
            type: SWAP_ELEMENT
        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200
            });
        });

        return store.dispatch(actions.swapElement(dataObj,()=>{})).then(() => {
            const { type } = store.getActions()[0];
            expect(type).toBe(expectedActions.type);

        });
    });
    it('testing------- SWAP ELEMENT ------action - catch', () => {
        //let store = mockStore(() => initialState);
        const typee = "element-authoredtext";
        const index = 2;

        let swappedElementData = {
            id : "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
            contentUrn : "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
        }

        let _requestData = {
            "projectUrn": "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
            "currentSlateEntityUrn":"urn:pearson:entity:c8d3d2b2-176c-48fc-8383-33444fe335f5",
            "destSlateEntityUrn":"urn:pearson:entity:c8d3d2b2-176c-48fc-8383-33444fe335f5",
            "workUrn":swappedElementData.id,
            "entityUrn":swappedElementData.contentUrn,
            "type": typee,
            "index": index
        }

        let dataObj = {
            oldIndex : 1,
            newIndex : 2,
            swappedElementData : swappedElementData,
            // slateId:_slateId,
            workedExample : false   
        }


        const expectedActions = {
            type: SWAP_ELEMENT
        };
        axios.post = jest.fn(() => Promise.reject({}))

        return store.dispatch(actions.swapElement(dataObj,()=>{})).catch(() => {
            const { type } = store.getActions()[0];
            expect(type).toBe(expectedActions.type);

        });
    });
    it('testing------- setSplittedElementIndex ------action', () => {
        store.dispatch(actions.setSplittedElementIndex(1))
        const { type } = store.getActions()[0];
        expect(type).toBe(SET_SPLIT_INDEX);
        });
    
    it('testing------- handleSplitSlate ------action - catch', () => {

        axios.put = jest.fn(() => Promise.reject({}))

        return store.dispatch(actions.handleSplitSlate({contentUrn : '',entityUrn : ''})).then(() => {
            const { type } = store.getActions()[0];
            expect(type).toBe('ERROR_POPUP');
        });
    });
    it('testing------- setElementPageNumber ------action', () => {
        store.dispatch(actions.setElementPageNumber({}))
        const { type } = store.getActions()[0];
        expect(type).toBe(GET_PAGE_NUMBER);
    });
    initialState.appStore.pageNumberData = {id : ""}
    it('testing------- setElementPageNumber with ID ------action', () => {
        store.dispatch(actions.setElementPageNumber({}))
        const { type } = store.getActions()[0];
        expect(type).toBe(GET_PAGE_NUMBER);

    });
    it('testing------- setUpdatedSlateTitle ------action', () => {
        store.dispatch(actions.setUpdatedSlateTitle({}))
        const { type } = store.getActions()[0];
        expect(type).toBe(SET_UPDATED_SLATE_TITLE);
    });
    it('testing------- setSlateType  ------action', () => {
        store.dispatch(actions.setSlateType ({}))
        const { type } = store.getActions()[0];
        expect(type).toBe(SET_SLATE_TYPE);
    });
    it('testing------- setSlateEntity  ------action', () => {
        store.dispatch(actions.setSlateEntity ({}))
        const { type } = store.getActions()[0];
        expect(type).toBe(SET_SLATE_ENTITY);
    });
    it('testing------- accessDenied  ------action', () => {
        store.dispatch(actions.accessDenied ({}))
        const { type } = store.getActions()[0];
        expect(type).toBe(ACCESS_DENIED_POPUP);
    });
    it('testing------- setSlateParent  ------action', () => {
        store.dispatch(actions.setSlateParent ({}))
        const { type } = store.getActions()[0];
        expect(type).toBe(SET_PARENT_NODE);
    });
    it('updatePageNumber ----else',() => {
        jest.mock('axios');
        axios.put = jest.fn(() => Promise.resolve({}));
        axios.delete= jest.fn(() => Promise.resolve({}));
        let getState = () => {
            return {
                appStore : {
                    slateLevelData: createstoreWithFigure.slateLevelData,
                    // elementsTag: {},
                    activeElement: {},
                    splittedElementIndex: 0,
                    pageNumberData: [{
                        id: "urn:pearson:manifest:c047b586-c963-47b7-bc59-9ec595c2c6er"
                    }],
                    allElemPageData: [{}]
                }
            }
        }
        let dispatch = (obj) => {
            if(obj.type == 'UPDATE_PAGENUMBER_SUCCESS'){
                expect(obj.payload.pageLoading).toEqual(false)
            }
        };
        let parentUrn= {
            manifestUrn:"urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7"
        }
        let elementId = 'urn:pearson:manifest:c047b586-c963-47b7-bc59-9ec595c2c6ec';
        let pagenumber = 0;
        actions.updatePageNumber(pagenumber, elementId,elementAside,parentUrn)(dispatch,getState);
    })
    it('updatePageNumber ----else-catch',() => {
        jest.mock('axios');
        axios.put = jest.fn(() => Promise.resolve({}));
        axios.delete= jest.fn(() => Promise.reject({}));
        let getState = () => {
            return {
                appStore : {
                    slateLevelData: createstoreWithFigure.slateLevelData,
                    // elementsTag: {},
                    activeElement: {},
                    splittedElementIndex: 0,
                    pageNumberData: {}
                }
            }
        }
        let dispatch = (obj) => {
            if(obj.type == 'UPDATE_PAGENUMBER_FAIL'){
                expect(obj.payload.pageLoading).toEqual(false)
            }
        };
        let parentUrn= {
            manifestUrn:"urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7"
        }
        let elementId = 'urn:pearson:manifest:c047b586-c963-47b7-bc59-9ec595c2c6ec';
        let pagenumber = 0;
        actions.updatePageNumber(pagenumber, elementId,elementAside,parentUrn)(dispatch,getState);
    })
    it('updatePageNumber ----if',() => {
        jest.mock('axios');
        axios.put = jest.fn(() => Promise.resolve({}));
        axios.delete= jest.fn(() => Promise.resolve({}));
        
        let getState = () => {
            return {
                appStore : {
                    slateLevelData: slateLevelData1,
                    // elementsTag: {},
                    activeElement: {},
                    splittedElementIndex: 0,
                    pageNumberData: [{id: "urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7"}]
                }
            }
        }
        let dispatch = (obj) => {
            if(obj.type == 'UPDATE_PAGENUMBER_SUCCESS'){
                expect(obj.payload.pageLoading).toEqual(false)
            }
        };
        let parentUrn= {
            manifestUrn:"urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7"
        }
        let elementId = 'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7';
        let pagenumber = 1;
        actions.updatePageNumber(pagenumber, elementId,asideDataType1,parentUrn)(dispatch,getState);
    })
    it('updatePageNumber ----if-if',() => {
        jest.mock('axios');
        axios.put = jest.fn(() => Promise.resolve({}));
        axios.delete= jest.fn(() => Promise.resolve({}));
        
        let getState = () => {
            return {
                appStore : {
                    slateLevelData: slateLevelData1,
                    // elementsTag: {},
                    activeElement: {},
                    splittedElementIndex: 0,
                    pageNumberData: {}
                }
            }
        }
        let dispatch = (obj) => {
            if(obj.type == 'UPDATE_PAGENUMBER_SUCCESS'){
                expect(obj.payload.pageLoading).toEqual(false)
            }
        };
        let parentUrn= {
            manifestUrn:"urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7"
        }
        let elementId = 'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7';
        let pagenumber = 1;
        actions.updatePageNumber(pagenumber, elementId,asideDataType2,parentUrn)(dispatch,getState);
    })
    it('updatePageNumber ----if-else',() => {
        jest.mock('axios');
        axios.put = jest.fn(() => Promise.resolve({}));
        axios.delete= jest.fn(() => Promise.resolve({}));
        
        let getState = () => {
            return {
                appStore : {
                    slateLevelData: slateLevelData2,
                    // elementsTag: {},
                    activeElement: {},
                    splittedElementIndex: 0,
                    pageNumberData: {}
                }
            }
        }
        let dispatch = (obj) => {
            if(obj.type == 'UPDATE_PAGENUMBER_SUCCESS'){
                expect(obj.payload.pageLoading).toEqual(false)
            }
        };
        let parentUrn= {
            manifestUrn:"urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7"
        }
        let elementId = 'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7';
        let pagenumber = 1;
        actions.updatePageNumber(pagenumber, elementId,asideDataType2,parentUrn)(dispatch,getState);
    })
    xit('testing------- SECTION BREAK ------action when aside and element id same', () => {
        let store = mockStore(() => initialState);
        const type = "SECTION_BREAK";
        const index = 3;
        const _requestData = {
            "projectUrn": "urn:pearson:distributable:553615b2-57c9-4508-93a9-17c6909d5b44",
            "slateEntityUrn": "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75",
            "slateUrn": "urn:pearson:manifest:b94059f3-4592-4d84-a316-18d4ba05d734",
            "type": type,
            "index": index
        };
        config.slateManifestURN = "urn:pearson:manifest:d91706aa-0e9b-4015-aaef-fb3a9cf46ec0";
        const slateLevelData = createstoreWithFigure.slateLevelData;
        const expectedActions = {
            type: AUTHORING_ELEMENT_CREATED,
            payload: { slateLevelData }

        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: slateLevelData
            });
        });
        let  parentUrn= {
            elementType: "manifest",
            manifestUrn:"urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b700"
        }
        return store.dispatch(actions.createElement(type, index, parentUrn, {},0)).then(() => {
            let { type, payload } = store.getActions()[0];
            expect(type).toBe(expectedActions.type);
            expect(payload).toStrictEqual(expectedActions.payload);
        });
    });
    
    xit('testing-------', () => {
        let store = mockStore(() => initialState);
        const type = "TEXT";
        const index = 3;
        const _requestData = {
            "projectUrn": "urn:pearson:distributable:553615b2-57c9-4508-93a9-17c6909d5b44",
            "slateEntityUrn": "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75",
            "slateUrn": "urn:pearson:manifest:b94059f3-4592-4d84-a316-18d4ba05d734",
            "type": type,
            "index": index
        };
        config.slateManifestURN = "urn:pearson:manifest:d91706aa-0e9b-4015-aaef-fb3a9cf46ec0";
        config.tcmStatus =true;
        const axiosPayload = createstoreWithFigure.slateLevelData;
        const expectedActions = {
            type: "TEXT",
            payload: { axiosPayload }

        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: axiosPayload
            });
        });
         store.dispatch(actions.createElement(type, index));
         expect(type).toBe(expectedActions.type);
    });
    it('testing------- getPageNumber ------action -- catch', () => {
        jest.mock('axios');
        axios.get = jest.fn(() => Promise.resolve({}));

        initialState = {
            appStore : {
                slateLevelData: slateLevelData2,
                activeElement: {},
                splittedElementIndex: 0,
                pageNumberData: [],
                allElemPageData: []
            },
            tcmReducer: {tcmSnapshot: []}
        };
        
        store = mockStore(() => initialState);
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
    
        const spyGetPageNumber = jest.spyOn(actions, 'getPageNumber')
        actions.getPageNumber("1")(store.dispatch, store.getState)
        expect(spyGetPageNumber).toHaveBeenCalled()
    });

    it('testing------- getPageNumber ------action -- then', async () => {
        jest.mock('axios');
        axios.get = jest.fn(() => Promise.resolve({data:{pageNumber: 1}}));

        initialState = {
            appStore : {
                slateLevelData: slateLevelData2,
                activeElement: {},
                splittedElementIndex: 0,
                pageNumberData: [],
                allElemPageData: []
            },
            tcmReducer: {tcmSnapshot: []}
        };
        
        store = mockStore(() => initialState);
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
        await store.dispatch(actions.getPageNumber('1'));
        const { type } = store.getActions()[2];
        expect(type).toBe('PAGE_NUMBER_LOADER');
    });

    it("pasteElement action", async () => {
        config.slateManifestURN = "urn:pearson:manifest:d91706aa-0e9b-4015-aaef-fb3a9cf46ec0";
        config.tcmStatus = true;
        const axiosPayload = {
            "urn:pearson:work:4c2b1369-73ea-4d90-94fd-1e7ac877d668" : {
                "id": "urn:pearson:work:4c2b1369-73ea-4d90-94fd-1e7ac877d668",
                "parent_id": "urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c",
                "type": "element-authoredtext",
                "subtype": "",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": "heloo this is new paragraph element"
                },
                "html": {
                    "text": "<p class=\"paragraphNumeroUno\">heloo this is new paragraph element<\/p>"
                },
                "versionUrn": "urn:pearson:work:4c2b1369-73ea-4d90-94fd-1e7ac877d668",
                "contentUrn": "urn:pearson:entity:ed185293-3805-4aa1-99bd-12809b8a22e7",
                "comments": false,
                "tcm": false,
                "status": "wip"
            }
        }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    data: axiosPayload
                }
            });
        });
        /* moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: axiosPayload
            });
        }); */
        config.slateEntityURN = 'urn:pearson:entity:ed185293-3805-4aa1-99bd-12809b8a22e7';
        const spypasteElement = jest.spyOn(actions, "pasteElement")
        const params = {
            index: 1, 
            parentUrn: {
                contentUrn:'urn:pearson:entity:ed185293-3805-4aa1-99bd-12809b8a22e7'
            }
        }
        return await store.dispatch(actions.pasteElement(params)).then(() => {
            expect(spypasteElement).toHaveBeenCalled();
        });
    })

    it("cloneContainer action - fail", async () => {
        const insertionIndex = 2, manifestUrn = "urn:pearson:manifest:325dssd-23523rccdfdsf3-3223ewaasa"
        const mock = new MockAdapter(axios);
        const failResponse = {
           message: "failed"
        };
        mock.onPost(`${config.AUDIO_NARRATION_URL}container/${manifestUrn}/clone`).reply(500, failResponse);
        
        const spycloneContainer = jest.spyOn(actions, "cloneContainer")
        actions.cloneContainer(insertionIndex, manifestUrn)(jest.fn)
        expect(spycloneContainer).toHaveBeenCalled();
    })

    it("cloneContainer action - then", async () => {
        const insertionIndex = 2, manifestUrn = "urn:pearson:manifest:325dssd-23523rccdfdsf3-3223ewaasa"
        const mock = new MockAdapter(axios);
        const successResponse = {
           message: " , request id"
        };
        axios.post = jest.fn(() => Promise.resolve({ data: successResponse }));
        const spycloneContainer = jest.spyOn(actions, "cloneContainer")
        actions.cloneContainer(insertionIndex, manifestUrn)(jest.fn)
        expect(spycloneContainer).toHaveBeenCalled();
    })

    it('createPowerPasteElements action - approved slate', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateMockData,
                activeElement: {},
                splittedElementIndex: 0,
                pageNumberData: {},
                popupSlateData: {
                    type: "popup"
                }
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        const spyPowerPasteElement = jest.spyOn(actions, 'createPowerPasteElements');
        const powerPasteData = [{
            "html": {
                "text": `<p class="paragraphNumeroUnoCitation" data-contenturn="urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4e" data-versionurn="urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27636">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>`
            }
        }];
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        const index = 0;
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: [{}, {}] }));
        await store3.dispatch(actions.createPowerPasteElements(powerPasteData, index)).then(() => {
            expect(spyPowerPasteElement).toHaveBeenCalled();
        });
    })

    it('createPowerPasteElements action - wip slate', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    'urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5': {
                        ...slateMockData['urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5'],
                        status: 'wip'
                    }
                },
                activeElement: {},
                splittedElementIndex: 0,
                pageNumberData: {},
                popupSlateData: {
                    type: "popup"
                }
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        const spyPowerPasteElement = jest.spyOn(actions, 'createPowerPasteElements');
        const powerPasteData = [{
            "html": {
                "text": `<p class="paragraphNumeroUnoCitation" data-contenturn="urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4e" data-versionurn="urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27636">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>`
            }
        }];
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        const index = 0;
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: [{}, {}] }));
        await store3.dispatch(actions.createPowerPasteElements(powerPasteData, index)).then(() => {
            expect(spyPowerPasteElement).toHaveBeenCalled();
        });
    })

    it('createPowerPasteElements action - catch block', async () => {
        const spyPowerPasteElement = jest.spyOn(actions, 'createPowerPasteElements');
        const powerPasteData = [{
            "html": {
                "text": `<p class="paragraphNumeroUnoCitation" data-contenturn="urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4e" data-versionurn="urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27636">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>`
            }
        }];
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        const index = 0;
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: [{}, {}] }));
        await store2.dispatch(actions.createPowerPasteElements(powerPasteData, index)).then(() => {
            expect(spyPowerPasteElement).toHaveBeenCalled();
        });
    })

    it('wirisAltTextPopup action', () => {
        store2.dispatch(actions.wirisAltTextPopup({}))
        const { type } = store2.getActions()[0];
        expect(type).toBe('WIRIS_ALT_TEXT_POPUP');
    });
     
    it('pageData action', () => {
        store2.dispatch(actions.pageData());
        const { type } = store2.getActions()[0];
        expect(type).toBe('GET_PAGE_NUMBER');
    });

    it('setElementPageNumber action - else block', () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateMockData,
                activeElement: {},
                splittedElementIndex: 0,
                pageNumberData: {
                   'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f': {
                       'pagereference': 1
                   }
                },
                popupSlateData: {
                    type: "popup"
                }
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        store3.dispatch(actions.setElementPageNumber({
            id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f'
        }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('GET_PAGE_NUMBER');
    });

    it('createElement action - SECTION_BREAK block testing', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: sectionBreakMockSlateData,
                popupSlateData: {
                    type: ""
                },
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const asideDataMock = {
            parent: {
                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
                type: "groupedcontent"
            }
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: {contents: {bodymatter:[{id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f"}]}} }));
        await store3.dispatch(actions.createElement('SECTION_BREAK', 0, {manifestUrn: config.projectUrn}, asideDataMock));
    });  
    
    it('createElement action - !SECTION_BREAK - element-aside ---- testing', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: NotSectionBreakMockSlateData,
                popupSlateData: {
                    type: ""
                },
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const asideDataMock = {
            type: 'element-aside',
            parent: {
                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40e",
                type: "groupedcontent"
            }
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: {contents: {bodymatter:[{id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f"}]}} }));
        await store3.dispatch(actions.createElement('', 0, {manifestUrn: config.projectUrn}, asideDataMock));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });  

    it('createElement action - poetryData --- testing', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5": {
                        contents: {
                            bodymatter: [{
                                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40e",
                                type: "poetry",
                                contents: {
                                    bodymatter: [{
                                        id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g",
                                        contents: {
                                            bodymatter: []
                                        }
                                    }]
                                }
                            }]
                        }
                    }
                },
                popupSlateData: {
                    type: ""
                },
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const asideDataMock = {
            type: ''
        }
        const poetryData = {
            id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40e',
            type: 'poetry',
            parentUrn: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
        };
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: {contents: {bodymatter:[{id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f"}]}} }));
        await store3.dispatch(actions.createElement('', 0, {manifestUrn: config.projectUrn}, asideDataMock, 1, '', cb, poetryData));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });

    it('createElement action - !asideData block testing', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: sectionBreakMockSlateData,
                popupSlateData: {
                    type: ""
                },
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: {contents: {bodymatter:[{id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f"}]}} }));
        await store3.dispatch(actions.createElement('', 0, {manifestUrn: config.projectUrn, elementType: 'group'}, null));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });

    it('createElement action - asideData type - groupedcontent block testing', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: sectionBreakMockSlateData,
                popupSlateData: {
                    type: ""
                },
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const asideDataMock = {
            type: 'groupedcontent'
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: {contents: {bodymatter:[{id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f"}]}} }));
        await store3.dispatch(actions.createElement('', 0, {manifestUrn: config.projectUrn}, asideDataMock));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    }); 

    it('createElement action - asideData type - citations block testing', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5": {
                        contents: {
                            bodymatter: [{
                                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
                                contents: {
                                    bodymatter: []
                                }
                            }]
                        }
                    }
                },
                popupSlateData: {
                    type: ""
                },
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const asideDataMock = {
            type: 'citations'
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: {contents: {bodymatter:[{id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f"}]}} }));
        await store3.dispatch(actions.createElement('', 0, {manifestUrn: config.projectUrn}, asideDataMock));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });

    it('createElement action - LO_LIST type', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5": {
                        contents: {
                            bodymatter: [{
                                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
                                contents: {
                                    bodymatter: []
                                }
                            }]
                        }
                    }
                },
                popupSlateData: {
                    type: ""
                },
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateType = 'container-introduction';
        config.parentLabel = 'part';
        const asideDataMock = {
            type: 'citations'
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: {contents: {bodymatter:[{id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f"}]}} }));
        await store3.dispatch(actions.createElement('LO_LIST', 0, {manifestUrn: config.projectUrn}, asideDataMock));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });

    it('createElement action - slate approved', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5": {
                        contents: {
                            bodymatter: [{
                                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
                                contents: {
                                    bodymatter: []
                                }
                            }]
                        },
                        status: 'approved',
                        type: 'popup'
                    }
                },
                popupSlateData: {
                    type: ""
                },
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateType = 'container-introduction';
        config.parentLabel = 'part';
        const asideDataMock = {
            type: 'citations'
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: {contents: {bodymatter:[{id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f"}]}} }));
        await store3.dispatch(actions.createElement('LO', 0, {manifestUrn: config.projectUrn}, asideDataMock, 0, "loref"));
    });

    it('pasteElement  action - with poetryData', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5": {
                        contents: {
                            bodymatter: [{
                                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
                                contents: {
                                    bodymatter: []
                                }
                            }]
                        }
                    }
                },
                popupSlateData: {
                    type: ""
                },
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            selectionReducer: {
                selection: {
                    activeAnimation: true,
                    element: {id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", type: "element-authoredtext", schema: "http://schemas.pearson.com/wip-authoring/element/1", html: {text:''}},
                    inputSubType: "NA",
                    inputType: "AUTHORED_TEXT",
                    operationType: "cut",
                    sourceElementIndex: 1,
                    sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
                    sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6"
                }
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb";
        const spypasteElement = jest.spyOn(actions, 'pasteElement')
        const params = {
            poetryData: {contentUrn: 'urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb'},
            index: 2
        }
        actions.pasteElement(params)(store3.dispatch, store3.getState)
        expect(spypasteElement).toHaveBeenCalled()
    });

    it('pasteElement  action - with parentUrn', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5": {
                        contents: {
                            bodymatter: [{
                                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
                                contents: {
                                    bodymatter: []
                                }
                            }]
                        }
                    }
                },
                popupSlateData: {
                    type: ""
                },
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            selectionReducer: {
                selection: {
                    activeAnimation: true,
                    element: {id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", figuretype:" ", type: "figure", schema: "http://schemas.pearson.com/wip-authoring/element/1"},
                    inputSubType: "NA",
                    inputType: "AUTHORED_TEXT",
                    operationType: "cut",
                    sourceElementIndex: '1-0-1',
                    sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
                    sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6",
                    sourceEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fc"
                }
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1ff";
        const spypasteElement = jest.spyOn(actions, 'pasteElement')
        const params = {
            parentUrn : {contentUrn: 'urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fc'},
            index: 2
        }
        actions.pasteElement(params)(store3.dispatch, store3.getState)
        expect(spypasteElement).toHaveBeenCalled()
    });

    it('pasteElement  action - without parentUrn and poetryData', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5": {
                        contents: {
                            bodymatter: [{
                                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
                                contents: {
                                    bodymatter: []
                                }
                            }]
                        }
                    }
                },
                popupSlateData: {
                    type: ""
                },
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            selectionReducer: {
                selection: {
                    activeAnimation: true,
                    element: {id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", figuretype:" ", type: "figure", schema: "http://schemas.pearson.com/wip-authoring/element/1"},
                    inputSubType: "NA",
                    inputType: "AUTHORED_TEXT",
                    operationType: "cut",
                    sourceElementIndex: '1-0-1',
                    sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
                    sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6",
                    sourceEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fc"
                }
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1ff";
        const spypasteElement = jest.spyOn(actions, 'pasteElement')
        const params = {}
        actions.pasteElement(params)(store3.dispatch, store3.getState)
        expect(spypasteElement).toHaveBeenCalled()
    });

    it('pasteElement  action - without selectionReducer data', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5": {
                        contents: {
                            bodymatter: [{
                                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
                                contents: {
                                    bodymatter: []
                                }
                            }]
                        }
                    }
                },
                popupSlateData: {
                    type: ""
                },
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            selectionReducer: {}
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1ff";
        const spypasteElement = jest.spyOn(actions, 'pasteElement')
        const params = {}
        actions.pasteElement(params)(store3.dispatch, store3.getState)
        expect(spypasteElement).toHaveBeenCalled()
    });

    it('pasteElement  action - with sectionType', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5": {
                        contents: {
                            bodymatter: [{
                                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
                                contents: {
                                    bodymatter: []
                                }
                            }]
                        }
                    }
                },
                popupSlateData: {
                    type: ""
                },
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            selectionReducer: {
                selection: {
                    activeAnimation: true,
                    element: {id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", figuretype:" ", type: "discussion", schema: "http://schemas.pearson.com/wip-authoring/element/1"},
                    inputSubType: "NA",
                    inputType: "AUTHORED_TEXT",
                    operationType: "cut",
                    sourceElementIndex: '2',
                    sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
                    sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6",
                    sourceEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fc"
                }
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1ff";
        const spypasteElement = jest.spyOn(actions, 'pasteElement')
        const params = {
            parentUrn: { contentUrn: 'urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fc' },
            index: 1,
            sectionType: 'sectionType',
            asideData: { interactivedata: { sectionType: [{ id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62" }] } }
        }
        actions.pasteElement(params)(store3.dispatch, store3.getState)
        expect(spypasteElement).toHaveBeenCalled()
    });

    it('pasteElement  action - with element-aside selection element type and create element API with copy operation type', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5": {
                        contents: {
                            bodymatter: [{
                                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
                                contents: {
                                    bodymatter: []
                                }
                            }]
                        }
                    }
                },
                popupSlateData: {
                    type: ""
                },
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            selectionReducer: {
                selection: {
                    activeAnimation: true,
                    element: {id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", figuretype:" ", type: "element-aside", schema: "http://schemas.pearson.com/wip-authoring/element/1"},
                    inputSubType: "NA",
                    inputType: "AUTHORED_TEXT",
                    operationType: "copy",
                    sourceElementIndex: '2',
                    sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
                    sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6",
                    sourceEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fc"
                }
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1ff";
        const spypasteElement = jest.spyOn(actions, 'pasteElement')
        const params = {
            parentUrn: { contentUrn: 'urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fc' },
            index: 1,
            sectionType: 'sectionType',
            asideData: { interactivedata: { sectionType: [{ id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62" }] } }
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ status: '200', data: {}}));
        axios.get = jest.fn(() => Promise.resolve({ status: '200', data: {'urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6': {type:'figure', figuretype:'image', elementdata:{type:'blockquote'}}}}));
        await actions.pasteElement(params)(store3.dispatch, store3.getState)
        expect(spypasteElement).toHaveBeenCalled()
    });

    it('swapElement  action - pe as containerTypeElem', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5": {
                        contents: {
                            bodymatter: [{
                                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
                                contents: {
                                    bodymatter: []
                                }
                            }]
                        }
                    }
                },
                popupSlateData: {
                    type: ""
                },
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1ff";
        const dataObj = {
            containerTypeElem: 'pe',
            swappedElementData: {
                id : "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
                contentUrn : "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
            },
            type: 'pe',
            poetryId: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f'
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ status: '200'}));
        await store3.dispatch(actions.swapElement(dataObj, jest.fn()));
        const { type } = store3.getActions()[0];
        expect(type).toBe('SWAP_ELEMENT');
    });

    it('swapElement  action - 2C as containerTypeElem', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5": {
                        contents: {
                            bodymatter: [{
                                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
                                groupeddata: {
                                    bodymatter: [{
                                        groupdata: {
                                            bodymatter: []
                                        }
                                    }]
                                }
                            }]
                        }
                    }
                },
                popupSlateData: {
                    type: ""
                },
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1ff";
        const dataObj = {
            containerTypeElem: '2C',
            swappedElementData: {
                id : "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
                contentUrn : "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
            },
            type: '2C',
            containerIndex: 0,
            columnIndex: 0
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ status: '200'}));
        await store3.dispatch(actions.swapElement(dataObj, jest.fn()));
        const { type } = store3.getActions()[0];
        expect(type).toBe('SWAP_ELEMENT');
    })

    it('swapElement  action - 3C as containerTypeElem', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5": {
                        contents: {
                            bodymatter: [{
                                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
                                groupeddata: {
                                    bodymatter: [{
                                        groupdata: {
                                            bodymatter: []
                                        }
                                    }]
                                }
                            }]
                        }
                    }
                },
                popupSlateData: {
                    type: ""
                },
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1ff";
        const dataObj = {
            containerTypeElem: '3C',
            swappedElementData: {
                id : "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
                contentUrn : "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
            },
            type: '3C',
            containerIndex: 0,
            columnIndex: 0
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ status: '200'}));
        await store3.dispatch(actions.swapElement(dataObj, jest.fn()));
        const { type } = store3.getActions()[0];
        expect(type).toBe('SWAP_ELEMENT');
    })

    it('swapElement  action - section as containerTypeElem', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5": {
                        contents: {
                            bodymatter: [{
                                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
                                elementdata: {
                                    bodymatter: [{
                                        contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1", 
                                        contents: {
                                            bodymatter: []
                                        } 
                                    }]
                                }
                            }]
                        }
                    }
                },
                popupSlateData: {
                    type: ""
                },
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1ff";
        const dataObj = {
            containerTypeElem: 'section',
            swappedElementData: {
                id : "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
                contentUrn : "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
            },
            type: 'section',
            asideId: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f',
            currentSlateEntityUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ status: '200'}));
        await store3.dispatch(actions.swapElement(dataObj, jest.fn()));
        const { type } = store3.getActions()[0];
        expect(type).toBe('SWAP_ELEMENT');
    })

    it('swapElement  action - we as containerTypeElem', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5": {
                        contents: {
                            bodymatter: [{
                                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
                                bodymatter: [{
                                    contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1",
                                    contents: {
                                        bodymatter: [{
                                            contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1",
                                            elementdata: {
                                                bodymatter: []
                                            }
                                        }]
                                    }
                                }]
                            }],
                        }
                    }
                },
                popupSlateData: {
                    type: ""
                },
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1ff";
        const dataObj = {
            containerTypeElem: 'we',
            swappedElementData: {
                id : "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
                contentUrn : "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
            },
            type: 'we',
            asideId: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f',
            currentSlateEntityUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ status: '200'}));
        await store3.dispatch(actions.swapElement(dataObj, jest.fn()));
        const { type } = store3.getActions()[0];
        expect(type).toBe('SWAP_ELEMENT');
    })

    it('swapElement  action - slate approved and type popup', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5": {
                        contents: {
                            bodymatter: [{
                                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
                                bodymatter: [{
                                    contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1",
                                    contents: {
                                        bodymatter: [{
                                            contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1",
                                            elementdata: {
                                                bodymatter: []
                                            }
                                        }]
                                    }
                                }]
                            }]
                        },
                        status: 'approved',
                        type: 'popup'
                    }
                },
                popupSlateData: {
                    type: ""
                },
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1ff";
        const dataObj = {
            containerTypeElem: 'we',
            swappedElementData: {
                id : "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
                contentUrn : "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
            },
            type: 'we',
            asideId: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f',
            currentSlateEntityUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ status: '200'}));
        await store3.dispatch(actions.swapElement(dataObj, jest.fn()));
    })

    it('swapElement  action - slate approved', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5": {
                        contents: {
                            bodymatter: [{
                                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
                                bodymatter: [{
                                    contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1",
                                    contents: {
                                        bodymatter: [{
                                            contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1",
                                            elementdata: {
                                                bodymatter: []
                                            }
                                        }]
                                    }
                                }]
                            }]
                        },
                        status: 'approved',
                        type: ''
                    }
                },
                popupSlateData: {
                    type: ""
                },
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1ff";
        const dataObj = {
            containerTypeElem: 'we',
            swappedElementData: {
                id: "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
                contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
            },
            type: 'we',
            asideId: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f',
            currentSlateEntityUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ status: '200' }));
        await store3.dispatch(actions.swapElement(dataObj, jest.fn()));
    })
});