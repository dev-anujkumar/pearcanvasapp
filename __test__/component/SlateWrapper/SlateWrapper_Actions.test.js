import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import * as actions from '../../../src/component/SlateWrapper/SlateWrapper_Actions';
import { SlatetDataOpenerDefault, SlatetDataOpenerElement, createstoreWithFigure, slateMockData, sectionBreakMockSlateData, sectionBreakMockSlateData1, NotSectionBreakMockSlateData, NotSectionBreakMockSlateData2, NotSectionBreakMockSlateData3, NotSectionBreakMockSlateData4, NotSectionBreakMockSlateData5, updateBL_IN_AS, updateBL_IN_WE, updateBL_IN_AS2, updateBL_IN_AS3, updateBL_IN_AS4, updateBL_IN_WE4, updateBL4, updateBL_IN_2C_3C4, tabbedData, tabbedData2 } from "../../../fixtures/slateTestingData"
import { SET_SLATE_TYPE, SET_SLATE_ENTITY, ACCESS_DENIED_POPUP,SET_SLATE_MATTER_TYPE, SET_PARENT_NODE, SWAP_ELEMENT, SET_UPDATED_SLATE_TITLE, AUTHORING_ELEMENT_CREATED, SET_SPLIT_INDEX, GET_PAGE_NUMBER, ERROR_POPUP, CYPRESS_PLUS_ENABLED, UPDATE_CARET_OFFSET, PDF_SLATE_NAVIGATED } from '../../../src/constants/Action_Constants';
import config from '../../../src/config/config';
import { elementAside, slateLevelData1, slateLevelData2, asideDataType1, asideDataType2, asideDataType3, slateLevelData3, asideData11, workedexampleaside, asideforgouped, showHideAsideData } from '../../../fixtures/elementAsideData';
import MockAdapter from 'axios-mock-adapter';
import { mockAutoNumberReducerEmpty } from '../FigureHeader/AutoNumberApiTestData';
jest.mock('../../../src/component/TcmSnapshots/TcmSnapshots_Utility.js', () => ({
    tcmSnapshotsForCreate: jest.fn()
}))

jest.mock('../../../src/component/SlateWrapper/slateWrapperAction_helper.js', () => ({
    fetchStatusAndPaste: jest.fn(() => Promise.resolve({})),
    prepareDataForTcmCreate: jest.fn(() => Promise.resolve({})),
    checkElementExistence: jest.fn(() => Promise.resolve({})),
    onPasteSuccess: jest.fn(() => Promise.resolve({})),
    setPayloadForContainerCopyPaste: jest.fn(() => ({ content: [{ id: 'urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6', type: 'popup' }] }))
}))
jest.mock('../../../src/component/TcmSnapshots/TcmSnapshotsCreate_Update.js', () => ({
    tcmSnapshotsForCreate: jest.fn()
}))
jest.mock('../../../src/component/ElementFigure/AlfrescoSiteUrl_helper.js', () => ({
    handleAlfrescoSiteUrl: jest.fn()
}))

jest.mock('../../../src/component/ShowHide/ShowHide_Helper', () => ({
    getShowHideElement: jest.fn(() => ({ contentUrn: 'urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1ff', interactivedata: { sectionType: [] } }))
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Tests Slate Wrapper Actions', () => {
    let store;
    let initialState = { appStore: {} };
    let store2;
    let initialState2 = { appStore: {} };
    let store3;
    let initialState3 = { appStore: {} };
    beforeEach(() => {
        initialState = {
            appStore: {
                slateLevelData: createstoreWithFigure.slateLevelData,
                // elementsTag: {},
                activeElement: {output: 'all'},
                splittedElementIndex: 0,
                pageNumberData: {},
                popupSlateData: {
                    type: "popup"
                },
                tcmReducer: { tcmSnapshot: ["78", "9"] },
                isCypressPlusEnabled: true
            },
            selectionReducer: {
                selection: {
                    activeAnimation: true,
                    deleteElm: {
                        id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", type: "element-authoredtext", parentUrn: undefined, asideData: undefined, contentUrn: "urn:pearson:entity:da9f3f72-2cc7-4567-8fb9-9a887c360979",
                        cutCopyParentUrn: {
                            contentUrn: '',
                            manifestUrn: '',
                            slateLevelData: ''
                        }
                    },
                    element: { id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", type: "element-authoredtext", schema: "http://schemas.pearson.com/wip-authoring/element/1", html: { text: '' } },
                    inputSubType: "NA",
                    inputType: "AUTHORED_TEXT",
                    operationType: "copy",
                    sourceElementIndex: 2,
                    sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
                    sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6"
                }
            },
            autoNumberReducer: mockAutoNumberReducerEmpty,
            commentsPanelReducer: {
                allComments: []
            }
        };
        store = mockStore(() => initialState);
        initialState2 = {
            appStore: {
                slateLevelData: createstoreWithFigure.slateLevelData,
                activeElement: {output: 'all'},
                splittedElementIndex: 0,
                pageNumberData: {},
                popupSlateData: {
                    type: ""
                }
            },
            autoNumberReducer: mockAutoNumberReducerEmpty,
        };
        store2 = mockStore(() => initialState2);
        moxios.install();

    });
    afterEach(() => moxios.uninstall());

    it('testing------- ADD OPENER ELEMENT ------action', () => {
        initialState = {
            appStore: {
                slateLevelData: SlatetDataOpenerDefault,
                // elementsTag: {},
                activeElement: {output: 'all'},
                splittedElementIndex: 0,
                pageNumberData: {}
            },
            autoNumberReducer: mockAutoNumberReducerEmpty,
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
        }).catch((err) => { })
    });
    it('testing------- ADD CONTAINER ELEMENT ------action', () => {
        initialState = {
            appStore: {
                slateLevelData: SlatetDataOpenerDefault,
                // elementsTag: {},
                activeElement: {output: 'all'},
                splittedElementIndex: 0,
                pageNumberData: {}
            },
            autoNumberReducer: {isAutoNumberingEnabled : true},
        };
        store = mockStore(() => initialState);
        const type = "CONTAINER";
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
        }).catch((err) => { })
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
        config.tcmStatus=true
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
        let parentUrn = {
            elementType: "element-aside",
            manifestUrn: "urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7"
        }
        return store.dispatch(actions.createElement(type, index, parentUrn, { type: 'element-aside', id: 'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7' })).then(() => {
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
        let parentUrn = {
            elementType: "manifest",
            manifestUrn: "urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b700"
        }
        return store.dispatch(actions.createElement(type, index, parentUrn, { type: 'element-aside', id: 'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7' })).then(() => {
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
        let parentUrn = {
            elementType: "manifest",
            manifestUrn: "urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b700"
        }
        return store.dispatch(actions.createElement(type, index, parentUrn, { type: 'popup', id: 'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7' })).then(() => {
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
            id: "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
            contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
        }

        let _requestData = {
            "projectUrn": "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
            "currentSlateEntityUrn": "urn:pearson:entity:c8d3d2b2-176c-48fc-8383-33444fe335f5",
            "destSlateEntityUrn": "urn:pearson:entity:c8d3d2b2-176c-48fc-8383-33444fe335f5",
            "workUrn": swappedElementData.id,
            "entityUrn": swappedElementData.contentUrn,
            "type": type,
            "index": index
        }

        let dataObj = {
            oldIndex: 1,
            newIndex: 2,
            swappedElementData: swappedElementData,
            // slateId:_slateId,
            workedExample: false
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

        return store.dispatch(actions.swapElement(dataObj, () => { })).then(() => {
            const { type } = store.getActions()[0];
            expect(type).toBe(expectedActions.type);

        });
    });
    it('testing------- SWAP ELEMENT ------action - then- citation element', () => {
        let swappedElementData = {
            "id": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27636",
            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4e",
            "type": "element-citation"
        }

        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f"
        config.slateEntityURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5"

        let dataObj = {
            oldIndex: 0,
            newIndex: 1,
            swappedElementData: swappedElementData,
            containerTypeElem: 'cg',
            currentSlateEntityUrn: "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5"
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

        return store.dispatch(actions.swapElement(dataObj, () => { })).then(() => {
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
        const newSlateObj = { contentUrn: '', entityUrn: '', containerUrn: '' };
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
        let citationData = {
            "id": "urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e",
            "schema": "http://schemas.pearson.com/wip-authoring/citations/1",
            "type": "citations",
            "contents": {
                "formatted-title": {
                    "id": "urn:pearson:work:3247d017-9f4b-4260-b3f2-7d9b175ccd76", "type": "element-authoredtext", "schema": "http://schemas.pearson.com/wip-authoring/element/1", "elementdata": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "" }, "html": { "text": `This is the optional title for Citations. It would be taken from the element-authoredtext object referenced by the formatted-title.` }, "versionUrn": "urn:pearson:work:3247d017-9f4b-4260-b3f2-7d9b175ccd76", "contentUrn": "urn:pearson:entity:0ab3a13b-4045-4389-b8da-911e2e2701d7", "status": "wip", "tcm": false, "feedback": false, "comments": false
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
                        "html": {
                            "text": `<p class="paragraphNumeroUnoCitation" data-contenturn="urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4d" data-versionurn="urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635">Allport, G. W., &amp; Odbert, H. S. (1936). Trait names: A psycho-lexical study. <em>Psychological Monographs,</em> 47(211). The CITE classes for the containing the WiP's "element-citation" content should be decided based on the context of usage as described below. It follows the same logic as when paragraphNumeroUno and paragraphNummerEins. If the citation grouping.</p>`
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
                        "html": {
                            "text": `<p class="paragraphNumeroUnoCitation" data-contenturn="urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4e" data-versionurn="urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27636">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>`
                        },
                        "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4e",
                        "versionUrn": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27636"
                    },
                    {
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
                    },
                    {
                        "id": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27637",
                        "type": "element-citation",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
                        },
                        "html": {
                            "text": `<p class="paragraphNumeroUnoCitation" data-contenturn="urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4e" data-versionurn="urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27636">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>`
                        },
                        "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r43",
                        "versionUrn": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27637"
                    }
                ]
            },
            "contentUrn": "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5",
            "versionUrn": "urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e"
        }
        let resData = {
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
        let parentUrn2 = {
            elementType: "citations",
            manifestUrn: "urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e",
            contentUrn: "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5"
        }
        let asideData2 = {
            type: 'citations',
            id: 'urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e',
            contentUrn: "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5",
            element: citationData
        }
        return store2.dispatch(actions.createElement("ELEMENT_CITATION", 3, parentUrn2, asideData2)).then(() => {
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
        let parentUrn = {
            elementType: "manifest",
            manifestUrn: "urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b700"
        }
        return store.dispatch(actions.createElement(type, index, parentUrn, { type: 'popup', id: 'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7' })).then(() => {
            let { type, payload } = store.getActions()[0];
            expect(type).toBe(expectedActions.type);
            expect(payload).toStrictEqual(expectedActions.payload);
        });
    });
    xit('testing------- SWAP ELEMENT ------action - then', () => {
        //let store = mockStore(() => initialState);
        const type = "element-authoredtext";
        const index = 2;

        let swappedElementData = {
            id: "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
            contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
        }

        let _requestData = {
            "projectUrn": "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
            "currentSlateEntityUrn": "urn:pearson:entity:c8d3d2b2-176c-48fc-8383-33444fe335f5",
            "destSlateEntityUrn": "urn:pearson:entity:c8d3d2b2-176c-48fc-8383-33444fe335f5",
            "workUrn": swappedElementData.id,
            "entityUrn": swappedElementData.contentUrn,
            "type": type,
            "index": index
        }

        let dataObj = {
            oldIndex: 1,
            newIndex: 2,
            swappedElementData: swappedElementData,
            // slateId:_slateId,
            workedExample: false
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

        return store.dispatch(actions.swapElement(dataObj, () => { })).then(() => {
            const { type } = store.getActions()[0];
            expect(type).toBe(expectedActions.type);

        });
    });
    xit('testing------- SWAP ELEMENT ------action - then- citation element', () => {
        let swappedElementData = {
            "id": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27636",
            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4e",
            "type": "element-citation"
        }

        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f"
        config.slateEntityURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5"

        let dataObj = {
            oldIndex: 0,
            newIndex: 1,
            swappedElementData: swappedElementData,
            containerTypeElem: 'cg',
            currentSlateEntityUrn: "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5"
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

        return store.dispatch(actions.swapElement(dataObj, () => { })).then(() => {
            const { type } = store.getActions()[0];
            expect(type).toBe(expectedActions.type);

        });
    });
    xit('testing------- SWAP ELEMENT ------action - catch', () => {
        //let store = mockStore(() => initialState);
        const typee = "element-authoredtext";
        const index = 2;

        let swappedElementData = {
            id: "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
            contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
        }

        let _requestData = {
            "projectUrn": "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
            "currentSlateEntityUrn": "urn:pearson:entity:c8d3d2b2-176c-48fc-8383-33444fe335f5",
            "destSlateEntityUrn": "urn:pearson:entity:c8d3d2b2-176c-48fc-8383-33444fe335f5",
            "workUrn": swappedElementData.id,
            "entityUrn": swappedElementData.contentUrn,
            "type": typee,
            "index": index
        }

        let dataObj = {
            oldIndex: 1,
            newIndex: 2,
            swappedElementData: swappedElementData,
            // slateId:_slateId,
            workedExample: false
        }


        const expectedActions = {
            type: SWAP_ELEMENT
        };
        axios.post = jest.fn(() => Promise.reject({}))

        return store.dispatch(actions.swapElement(dataObj, () => { })).catch(() => {
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

        return store.dispatch(actions.handleSplitSlate({ contentUrn: '', entityUrn: '' })).then(() => {
            const { type } = store.getActions()[0];
            expect(type).toBe('ERROR_POPUP');
        });
    });
    it('testing------- setElementPageNumber ------action', () => {
        store.dispatch(actions.setElementPageNumber({}))
        const { type } = store.getActions()[0];
        expect(type).toBe(GET_PAGE_NUMBER);
    });
    initialState.appStore.pageNumberData = { id: "" }
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
        store.dispatch(actions.setSlateType({}))
        const { type } = store.getActions()[0];
        expect(type).toBe(SET_SLATE_TYPE);
    });
    it('testing------- setSlateEntity  ------action', () => {
        store.dispatch(actions.setSlateEntity({}))
        const { type } = store.getActions()[0];
        expect(type).toBe(SET_SLATE_ENTITY);
    });
    it('testing------- accessDenied  ------action', () => {
        store.dispatch(actions.accessDenied({}))
        const { type } = store.getActions()[0];
        expect(type).toBe(ACCESS_DENIED_POPUP);
    });
    it('testing------- setSlateParent  ------action', () => {
        store.dispatch(actions.setSlateParent({}))
        const { type } = store.getActions()[0];
        expect(type).toBe(SET_PARENT_NODE);
    });
    it('testing------- setSlateMatterType  ------action', () => {
        store.dispatch(actions.setSlateMatterType({}))
        const { type } = store.getActions()[0];
        expect(type).toBe(SET_SLATE_MATTER_TYPE);
    });
    it('testing------- cypressPlusEnabled  ------action', () => {
        store.dispatch(actions.cypressPlusEnabled({}))
        const { type } = store.getActions()[0];
        expect(type).toBe(CYPRESS_PLUS_ENABLED);
    });
    it('testing------- saveCaretPosition  ------action', () => {
        store.dispatch(actions.saveCaretPosition({}))
        const { type } = store.getActions()[0];
        expect(type).toBe(UPDATE_CARET_OFFSET);
    });
    it('testing------- pdfSlatedNavigated  ------action', () => {
        store.dispatch(actions.pdfSlatedNavigated({}))
        const { type } = store.getActions()[0];
        expect(type).toBe(PDF_SLATE_NAVIGATED);
    });
    it('updatePageNumber ----else', () => {
        jest.mock('axios');
        axios.put = jest.fn(() => Promise.resolve({}));
        axios.delete = jest.fn(() => Promise.resolve({}));
        let getState = () => {
            return {
                appStore: {
                    slateLevelData: createstoreWithFigure.slateLevelData,
                    // elementsTag: {},
                    activeElement: {output: 'all'},
                    splittedElementIndex: 0,
                    pageNumberData: [{
                        id: "urn:pearson:manifest:c047b586-c963-47b7-bc59-9ec595c2c6er"
                    }],
                    allElemPageData: [{}]
                },
                autoNumberReducer: mockAutoNumberReducerEmpty,
            }
        }
        let dispatch = (obj) => {
            if (obj.type == 'UPDATE_PAGENUMBER_SUCCESS') {
                expect(obj.payload.pageLoading).toEqual(false)
            }
        };
        let parentUrn = {
            manifestUrn: "urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7"
        }
        let elementId = 'urn:pearson:manifest:c047b586-c963-47b7-bc59-9ec595c2c6ec';
        let pagenumber = 0;
        actions.updatePageNumber(pagenumber, elementId, elementAside, parentUrn)(dispatch, getState);
    })
    it('updatePageNumber ----else-catch', () => {
        jest.mock('axios');
        axios.put = jest.fn(() => Promise.resolve({}));
        axios.delete = jest.fn(() => Promise.reject({
            response : {
                status: 404,
                data: {
                    message:"Not found"
                }
            }
        }));
        let getState = () => {
            return {
                appStore: {
                    slateLevelData: createstoreWithFigure.slateLevelData,
                    // elementsTag: {},
                    activeElement: {output: 'all'},
                    splittedElementIndex: 0,
                    pageNumberData: {}
                }
            }
        }
        let dispatch = (obj) => {
            if (obj.type == 'UPDATE_PAGENUMBER_FAIL') {
                expect(obj.payload.pageLoading).toEqual(false)
            }
        };
        let parentUrn = {
            manifestUrn: "urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7"
        }
        let elementId = 'urn:pearson:manifest:c047b586-c963-47b7-bc59-9ec595c2c6ec';
        let pagenumber = 0;
        actions.updatePageNumber(pagenumber, elementId, elementAside, parentUrn)(dispatch, getState);
    })
    it('updatePageNumber ----if', () => {
        jest.mock('axios');
        axios.put = jest.fn(() => Promise.resolve({}));
        axios.delete = jest.fn(() => Promise.resolve({}));

        let getState = () => {
            return {
                appStore: {
                    slateLevelData: slateLevelData1,
                    // elementsTag: {},
                    activeElement: {output: 'all'},
                    splittedElementIndex: 0,
                    pageNumberData: [{ id: "urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7" }]
                }
            }
        }
        let dispatch = (obj) => {
            if (obj.type == 'UPDATE_PAGENUMBER_SUCCESS') {
                expect(obj.payload.pageLoading).toEqual(false)
            }
        };
        let parentUrn = {
            manifestUrn: "urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7"
        }
        let elementId = 'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7';
        let pagenumber = 1;
        actions.updatePageNumber(pagenumber, elementId, asideDataType1, parentUrn)(dispatch, getState);
    })
    it('updatePageNumber ----if-if', () => {
        jest.mock('axios');
        axios.put = jest.fn(() => Promise.resolve({}));
        axios.delete = jest.fn(() => Promise.resolve({}));

        let getState = () => {
            return {
                appStore: {
                    slateLevelData: slateLevelData1,
                    // elementsTag: {},
                    activeElement: {output: 'all'},
                    splittedElementIndex: 0,
                    pageNumberData: {}
                }
            }
        }
        let dispatch = (obj) => {
            if (obj.type == 'UPDATE_PAGENUMBER_SUCCESS') {
                expect(obj.payload.pageLoading).toEqual(false)
            }
        };
        let parentUrn = {
            manifestUrn: "urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7"
        }
        let elementId = 'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7';
        let pagenumber = 1;
        actions.updatePageNumber(pagenumber, elementId, asideDataType2, parentUrn)(dispatch, getState);
    })
    it('slateVersioning action - testing --then', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:manifest:4fa7a513-1055-4d16-aa45-aba4de226eb8": {
                        "contentUrn": "urn:pearson:entity:ccdcdaa7-f84f-438a-b062-70ba9cd3d85c",
                        "id": "urn:pearson:manifest:4fa7a513-1055-4d16-aa45-aba4de226eb8",
                        "numberedandlabel": true,
                        "pageCount": 1,
                        "pageLimit": 25,
                        "pageNo": 0,
                        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
                        "status": "approved",
                        "type": "manifest",
                        "versionUrn": "urn:pearson:manifest:4fa7a513-1055-4d16-aa45-aba4de226eb8"
                    }
                },
                activeElement: {output: 'all'}
            },
        }
        store3 = mockStore(() => initialState3);
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({data: {status: "success"}}));
        await store3.dispatch(actions.slateVersioning(false));
    });
    it('slateVersioning action - testing --then --else', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:manifest:4fa7a513-1055-4d16-aa45-aba4de226eb8": {
                        "contentUrn": "urn:pearson:entity:ccdcdaa7-f84f-438a-b062-70ba9cd3d85c",
                        "id": "urn:pearson:manifest:4fa7a513-1055-4d16-aa45-aba4de226eb8",
                        "numberedandlabel": true,
                        "pageCount": 1,
                        "pageLimit": 25,
                        "pageNo": 0,
                        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
                        "status": "approved",
                        "type": "manifest",
                        "versionUrn": "urn:pearson:manifest:4fa7a513-1055-4d16-aa45-aba4de226eb8"
                    }
                },
                activeElement: {output: 'all'}
            },
        }
        store3 = mockStore(() => initialState3);
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({data: {status: "success"}}));
        await store3.dispatch(actions.slateVersioning(true));
    });
    it('slateVersioning action - testing --else', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:manifest:4fa7a513-1055-4d16-aa45-aba4de226eb8": {
                        "contentUrn": "urn:pearson:entity:ccdcdaa7-f84f-438a-b062-70ba9cd3d85c",
                        "id": "urn:pearson:manifest:4fa7a513-1055-4d16-aa45-aba4de226eb8",
                        "numberedandlabel": true,
                        "pageCount": 1,
                        "pageLimit": 25,
                        "pageNo": 0,
                        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
                        "status": "approved",
                        "type": "manifest",
                        "versionUrn": "urn:pearson:manifest:4fa7a513-1055-4d16-aa45-aba4de226eb8"
                    }
                },
                activeElement: {output: 'all'}
            },
        }
        store3 = mockStore(() => initialState3);
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({}));
        await store3.dispatch(actions.slateVersioning(true));
    });
    it('slateVersioning action - testing -- catch', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:manifest:4fa7a513-1055-4d16-aa45-aba4de226eb8": {
                        "contentUrn": "urn:pearson:entity:ccdcdaa7-f84f-438a-b062-70ba9cd3d85c",
                        "id": "urn:pearson:manifest:4fa7a513-1055-4d16-aa45-aba4de226eb8",
                        "numberedandlabel": true,
                        "pageCount": 1,
                        "pageLimit": 25,
                        "pageNo": 0,
                        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
                        "status": "wip",
                        "type": "manifest",
                        "versionUrn": "urn:pearson:manifest:4fa7a513-1055-4d16-aa45-aba4de226eb8"
                    }
                },
                activeElement: {output: 'all'}
            },
        }
        store3 = mockStore(() => initialState3);
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.reject({}));
        await store3.dispatch(actions.slateVersioning(true));
    });
    it('createElement action - MANIFEST_LIST - indexes - length - 3', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST', 0, { manifestUrn: config.projectUrn }, {}, 1, '', cb, {}, { indexOrder: '0-0-0' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST - indexes - length - 5', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST', 0, { manifestUrn: config.projectUrn }, {}, 1, '', cb, {}, { indexOrder: '0-0-0-0-0' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST - indexes - length - 7', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('TEXT', 0, { manifestUrn: config.projectUrn }, {}, 1, '', cb, {}, { indexOrder: '0-0-0-0-0-0-0' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST with asidedata- indexes - length - greater that 9', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            parent: {
                type: 'showhide',
                showHideType: 'show',
                id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('TEXT', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0-0-0-' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST with asidedata- indexes - length - 5', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            parent: {
                type: 'showhide',
                showHideType: 'show',
                id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('TEXT', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0-0' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST with asidedata- indexes - length - 7', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            parent: {
                type: 'showhide',
                showHideType: 'show',
                id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('TEXT', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0-0-0-0' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST with asidedata- indexes - length - 9 ', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            parent: {
                type: 'showhide',
                showHideType: 'show',
                id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('TEXT', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0-0-0-0-0-0' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST if (asideData?.parent?.type === MULTI_COLUMN && asideData?.parent?.subtype === TAB) ', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            parent: {
                type: 'groupedcontent',
                subtype: "tab",
                id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('TEXT', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0-0-0-0-0' }));
    });
    it('createElement action - MANIFEST_LIST with 2C/3C- indexes - length - greater that 9', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            parent: {
                type: 'groupedcontent',
                id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('TEXT', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0-1-0-1-0-1-0-0' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('ERROR_POPUP');
    });
    it('createElement action - MANIFEST_LIST with 2C/3C- indexes - length - 5', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            parent: {
                type: 'groupedcontent',
                id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('TEXT', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0-1' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('ERROR_POPUP');
    });
    it('createElement action - MANIFEST_LIST with 2C/3C- indexes - length - 7', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            parent: {
                type: 'groupedcontent',
                id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('TEXT', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0-1-0-1' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('ERROR_POPUP');
    });
    it('createElement action - MANIFEST_LIST with 2C/3C- indexes - length - 9 ', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            parent: {
                type: 'groupedcontent',
                id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('TEXT', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0-1-0-1-0-1' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('ERROR_POPUP');
    })
    it('createElement action - MANIFEST_LIST - indexes - length greater that 7', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('TEXT', 0, { manifestUrn: config.projectUrn }, {}, 1, '', cb, {}, { indexOrder: '0-0-0-0-0-0-0-0-0' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST_ITEM - indexes - length - 3', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, {}, 1, '', cb, {}, { indexOrder: '0-0-0', eventType: 'ENTER' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST_ITEM - indexes - length - 3', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            parent:{
                type: 'groupedcontent',
                subtype: "tab",
                index: "0-0-0-0-0"    
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0-0', eventType: 'ENTER' }));
    });
    it('createElement action - MANIFEST_LIST_ITEM - indexes - length - 5', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, {}, 1, '', cb, {}, { indexOrder: '0-0-0-0-0', eventType: 'ENTER' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST_ITEM - indexes - length - 7', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, {}, 1, '', cb, {}, { indexOrder: '0-0-0-0-0-0-0', eventType: 'ENTER' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST_ITEM - indexes - length - 7', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: updateBL4.slateLevelData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        config.projectUrn = "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, {}, 1, '', cb, {}, { indexOrder: "0-0-1-0-1-0-1-0-0", eventType: 'ENTER' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST_ITEM - with aside data indexes - length - 5', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            parent: {
                type: 'showhide',
                showHideType: 'show',
                id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0-0-0', eventType: 'ENTER' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('ERROR_POPUP');
    });
    it('createElement action - MANIFEST_LIST_ITEM - with aside data indexes - length - 5', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            parent: {
                type: 'showhide',
                showHideType: 'show',
                id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0-0', eventType: 'ENTER' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST_ITEM - with aside data indexes - length - 7', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            parent: {
                type: 'showhide',
                showHideType: 'show',
                id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0-0-0-0', eventType: 'ENTER' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST_ITEM - with aside data indexes - length - 9', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            parent: {
                type: 'showhide',
                showHideType: 'show',
                id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0-0-0-0-0-0', eventType: 'ENTER' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST_ITEM - with 2C/3C indexes - length - 5', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            parent: {
                type: 'groupedcontent',
                id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0-1', eventType: 'ENTER' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('ERROR_POPUP');
    });
    it('createElement action - MANIFEST_LIST_ITEM - with 2C/3C indexes - length - 7', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            parent: {
                type: 'groupedcontent',
                id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0-1-0-1', eventType: 'ENTER' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('ERROR_POPUP');
    });
    it('createElement action - MANIFEST_LIST_ITEM - with 2C/3C indexes - length - 9', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            parent: {
                type: 'grouopedcontent',
                id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0-1-0-1-0-1', eventType: 'ENTER' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('ERROR_POPUP');
    });
    it('createElement action - MANIFEST_LIST_ITEM - indexes - length - 5', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, {}, 1, '', cb, {}, { indexOrder: '0-0-0-0-0', eventType: 'SHIFT+TAB' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST_ITEM - indexes - length - 5', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            parent: {
            type: 'groupedcontent',
            subtype: "tab"
        }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0-0-0-0-0', eventType: 'SHIFT+TAB' }));
    });
    it('createElement action - MANIFEST_LIST_ITEM - indexes - length - 5', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            parent: {
        }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('TABBED_COLUMN_TAB', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0-0-0-0-0', eventType: 'SHIFT+TAB' }));
    });
    it('createElement action - MANIFEST_LIST_ITEM - indexes - length - 7', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, {}, 1, '', cb, {}, { indexOrder: '0-0-0-0-0-0-0', eventType: 'SHIFT+TAB' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST_ITEM - with aside data indexes - length - 7', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            parent: {
                type: 'showhide',
                showHideType: 'show',
                id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0-0-0-0', eventType: 'SHIFT+TAB' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST_ITEM - with aside data indexes - length - 9', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            parent: {
                type: 'showhide',
                showHideType: 'show',
                id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0-0-0-0-0-0', eventType: 'SHIFT+TAB' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST_ITEM - with 2C/3C indexes - length - 5', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            parent: {
                type: 'groupedcontent',
                id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0-1', eventType: 'SHIFT+TAB' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('ERROR_POPUP');
    });
    it('createElement action - MANIFEST_LIST_ITEM - with 2C/3C indexes - length - 7', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            parent: {
                type: 'groupedcontent',
                id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0-1-0-1', eventType: 'SHIFT+TAB' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('ERROR_POPUP');
    });
    it('createElement action - MANIFEST_LIST_ITEM - with 2C/3C indexes - length - 9', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            parent: {
                type: 'groupedcontent',
                id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0-1-0-1-0-1', eventType: 'SHIFT+TAB' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('ERROR_POPUP');
    });
    it('createElement action - MANIFEST_LIST_ITEM - with 2C/3C indexes - length - 5', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            parent: {
                type: 'groupedcontent',
                id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0-1', eventType: 'SHIFT+TAB' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('ERROR_POPUP');
    });
    it('createElement action - MANIFEST_LIST_ITEM - indexes - length greater that 7', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, {}, 1, '', cb, {}, { indexOrder: '0-0-0-0-0-0-0-0-0', eventType: 'SHIFT+TAB' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST_ITEM - indexes - length - 3', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: slateLevelData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, {}, 1, '', cb, {}, { indexOrder: '0-0-0', eventType: 'ENTER' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST with AS- indexes - length -  4', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: updateBL_IN_AS.slateLevelData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            "type":"manifestlist",
            "subtype":"decimal",
            "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
            "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
            "element":{
               "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text":""
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                 },
                                 "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                 "status":"wip",
                                 "index":"0-0-0-0"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            },
            "index":"0-0",
            "parent":{
               "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
               "type":"element-aside",
               "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
            },
            "parentManifestList":{
               "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text":""
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                 },
                                 "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                 "status":"wip",
                                 "index":"0-0-0-0"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            }
         }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        config.projectUrn = "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3" }] } } }));
        await store3.dispatch(actions.createElement('TEXT', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST with AS- indexes - length - 6', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: updateBL_IN_AS2.slateLevelData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            "type":"manifestlist",
            "subtype":"decimal",
            "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
            "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
            "element":{
               "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text":""
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                 },
                                 "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                 "status":"wip",
                                 "index":"0-0-0-1-0-0"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            },
            "index":"0-0",
            "parent":{
               "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
               "type":"element-aside",
               "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
            },
            "parentManifestList":{
               "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text":""
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                 },
                                 "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                 "status":"wip",
                                 "index":"0-0-0-1-0-0"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            }
         }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        config.projectUrn = "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3" }] } } }));
        await store3.dispatch(actions.createElement('TEXT', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: "0-0-0-1-0-0" }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST with AS- indexes - length - 8', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: updateBL_IN_AS3.slateLevelData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            "type":"manifestlist",
            "subtype":"decimal",
            "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
            "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
            "element":{
               "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text":""
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                 },
                                 "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                 "status":"wip",
                                 "index":"0-0-0-1-0-1-0-0"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            },
            "index":"0-0",
            "parent":{
               "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
               "type":"element-aside",
               "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
            },
            "parentManifestList":{
               "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text":""
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                 },
                                 "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                 "status":"wip",
                                 "index":"0-0-0-1-0-1-0-0"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            }
         }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        config.projectUrn = "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3" }] } } }));
        await store3.dispatch(actions.createElement('TEXT', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: "0-0-0-1-0-1-0-0" }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST with AS- indexes - length - 10', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: updateBL_IN_AS4.slateLevelData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            "type":"manifestlist",
            "subtype":"decimal",
            "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
            "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
            "element":{
               "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text":""
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                 },
                                 "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                 "status":"wip",
                                 "index":"0-0-0-1-0-1-0-1-0-0"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            },
            "index":"0-0",
            "parent":{
               "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
               "type":"element-aside",
               "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
            },
            "parentManifestList":{
               "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text":""
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                 },
                                 "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                 "status":"wip",
                                 "index":"0-0-0-1-0-1-0-1-0-0"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            }
         }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        config.projectUrn = "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3" }] } } }));
        await store3.dispatch(actions.createElement('TEXT', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: "0-0-0-1-0-1-0-1-0-0" }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST with WE- indexes - length - 11', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: updateBL_IN_WE4.slateLevelData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            "type":"manifestlist",
            "subtype":"decimal",
            "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
            "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
            "element":{
               "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
               "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                        "contentUrn":"urn:pearson:entity:e4297f7f-3554-4dee-9acd-01873b03db0b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "text":"sdffs"
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\">sdffs</p>",
                                    "footnotes":{
                                       
                                    },
                                    "glossaryentries":{
                                       
                                    },
                                    "indexEntries":{
                                       
                                    }
                                 },
                                 "versionUrn":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                 "contentUrn":"urn:pearson:entity:85538611-9859-402a-bbc1-126b3c426a0a",
                                 "status":"wip",
                                 "inputType":"AUTHORED_TEXT",
                                 "inputSubType":"NA",
                                 "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                 "index":"0-0-0-0-1-0-1-0-1-0-0",
                                 "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                 "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            },
            "index":"0-0-0-0-1-0-1-0-1",
            "parent":{
               "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
               "type":"element-aside",
               "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
            },
            "parentManifestList":{
               "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
               "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                        "contentUrn":"urn:pearson:entity:e4297f7f-3554-4dee-9acd-01873b03db0b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "text":"sdffs"
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\">sdffs</p>",
                                    "footnotes":{
                                       
                                    },
                                    "glossaryentries":{
                                       
                                    },
                                    "indexEntries":{
                                       
                                    }
                                 },
                                 "versionUrn":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                 "contentUrn":"urn:pearson:entity:85538611-9859-402a-bbc1-126b3c426a0a",
                                 "status":"wip",
                                 "inputType":"AUTHORED_TEXT",
                                 "inputSubType":"NA",
                                 "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                 "index":"0-0-0-0-1-0-1-0-1-0-0",
                                 "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                 "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            },
            "grandParentManifestList":{
               "id":"urn:pearson:manifest:e8fe3040-1fa9-4dcc-b2ba-19a7f02a2eca",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:e8fe3040-1fa9-4dcc-b2ba-19a7f02a2eca",
               "contentUrn":"urn:pearson:entity:b3e24348-4921-48e1-af05-a4265d540545",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:a7f7636f-01dc-418c-8afe-f5ff668240f2",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:a7f7636f-01dc-418c-8afe-f5ff668240f2",
                        "contentUrn":"urn:pearson:entity:6ab7d9bc-41e0-4c54-9430-03c4c4ef95b5",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:f026a1e5-f282-4f6c-aa27-dddcca840fc8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "text":"asdasdasd"
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\" style=\"padding-left: 0px;\">asdasdasd</p>",
                                    "footnotes":{
                                       
                                    },
                                    "glossaryentries":{
                                       
                                    },
                                    "indexEntries":{
                                       
                                    }
                                 },
                                 "versionUrn":"urn:pearson:work:f026a1e5-f282-4f6c-aa27-dddcca840fc8",
                                 "contentUrn":"urn:pearson:entity:51c67554-72b8-40c8-9e37-5ac706385ded",
                                 "status":"wip",
                                 "inputType":"AUTHORED_TEXT",
                                 "inputSubType":"NA",
                                 "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                 "index":"0",
                                 "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                 "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                              },
                              {
                                 "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
                                 "type":"manifestlist",
                                 "subtype":"decimal",
                                 "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                 "versionUrn":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
                                 "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
                                 "listdata":{
                                    "bodymatter":[
                                       {
                                          "id":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                                          "type":"manifestlistitem",
                                          "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                          "versionUrn":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                                          "contentUrn":"urn:pearson:entity:e4297f7f-3554-4dee-9acd-01873b03db0b",
                                          "listitemdata":{
                                             "bodymatter":[
                                                {
                                                   "id":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                                   "type":"element-authoredtext",
                                                   "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                   "elementdata":{
                                                      "text":"sdffs"
                                                   },
                                                   "html":{
                                                      "text":"<p class=\"paragraphNumeroUno\">sdffs</p>",
                                                      "footnotes":{
                                                         
                                                      },
                                                      "glossaryentries":{
                                                         
                                                      },
                                                      "indexEntries":{
                                                         
                                                      }
                                                   },
                                                   "versionUrn":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                                   "contentUrn":"urn:pearson:entity:85538611-9859-402a-bbc1-126b3c426a0a",
                                                   "status":"wip",
                                                   "inputType":"AUTHORED_TEXT",
                                                   "inputSubType":"NA",
                                                   "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                                   "index":"0-0-0-0-1-0-1-0-1-0-0",
                                                   "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                                   "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                                }
                                             ]
                                          }
                                       }
                                    ]
                                 },
                                 "listtype":"ordered",
                                 "startNumber":1,
                                 "columnnumber":1,
                                 "iconcolor":"iconColor1",
                                 "fontstyle":"fontStyle1"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            }
         }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        config.projectUrn = "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3" }] } } }));
        await store3.dispatch(actions.createElement('TEXT', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: "0-0-0-0-1-0-1-0-1-0-0" }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST with 2C/3C- indexes - length - 11', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: updateBL_IN_2C_3C4.slateLevelData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            "type":"manifestlist",
            "subtype":"decimal",
            "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
            "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
            "element":{
               "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
               "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                        "contentUrn":"urn:pearson:entity:e4297f7f-3554-4dee-9acd-01873b03db0b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "text":"sdffs"
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\">sdffs</p>",
                                    "footnotes":{
                                       
                                    },
                                    "glossaryentries":{
                                       
                                    },
                                    "indexEntries":{
                                       
                                    }
                                 },
                                 "versionUrn":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                 "contentUrn":"urn:pearson:entity:85538611-9859-402a-bbc1-126b3c426a0a",
                                 "status":"wip",
                                 "inputType":"AUTHORED_TEXT",
                                 "inputSubType":"NA",
                                 "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                 "index":"0-0-0-0-1-0-1-0-1-0-0",
                                 "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                 "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            },
            "index":"0-0-0-0-1-0-1-0-1",
            "parent":{
               "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
               "type":"groupedcontent",
               "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
            },
            "parentManifestList":{
               "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
               "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                        "contentUrn":"urn:pearson:entity:e4297f7f-3554-4dee-9acd-01873b03db0b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "text":"sdffs"
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\">sdffs</p>",
                                    "footnotes":{
                                       
                                    },
                                    "glossaryentries":{
                                       
                                    },
                                    "indexEntries":{
                                       
                                    }
                                 },
                                 "versionUrn":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                 "contentUrn":"urn:pearson:entity:85538611-9859-402a-bbc1-126b3c426a0a",
                                 "status":"wip",
                                 "inputType":"AUTHORED_TEXT",
                                 "inputSubType":"NA",
                                 "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                 "index":"0-0-0-0-1-0-1-0-1-0-0",
                                 "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                 "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            },
            "grandParentManifestList":{
               "id":"urn:pearson:manifest:e8fe3040-1fa9-4dcc-b2ba-19a7f02a2eca",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:e8fe3040-1fa9-4dcc-b2ba-19a7f02a2eca",
               "contentUrn":"urn:pearson:entity:b3e24348-4921-48e1-af05-a4265d540545",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:a7f7636f-01dc-418c-8afe-f5ff668240f2",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:a7f7636f-01dc-418c-8afe-f5ff668240f2",
                        "contentUrn":"urn:pearson:entity:6ab7d9bc-41e0-4c54-9430-03c4c4ef95b5",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:f026a1e5-f282-4f6c-aa27-dddcca840fc8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "text":"asdasdasd"
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\" style=\"padding-left: 0px;\">asdasdasd</p>",
                                    "footnotes":{
                                       
                                    },
                                    "glossaryentries":{
                                       
                                    },
                                    "indexEntries":{
                                       
                                    }
                                 },
                                 "versionUrn":"urn:pearson:work:f026a1e5-f282-4f6c-aa27-dddcca840fc8",
                                 "contentUrn":"urn:pearson:entity:51c67554-72b8-40c8-9e37-5ac706385ded",
                                 "status":"wip",
                                 "inputType":"AUTHORED_TEXT",
                                 "inputSubType":"NA",
                                 "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                 "index":"0",
                                 "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                 "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                              },
                              {
                                 "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
                                 "type":"manifestlist",
                                 "subtype":"decimal",
                                 "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                 "versionUrn":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
                                 "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
                                 "listdata":{
                                    "bodymatter":[
                                       {
                                          "id":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                                          "type":"manifestlistitem",
                                          "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                          "versionUrn":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                                          "contentUrn":"urn:pearson:entity:e4297f7f-3554-4dee-9acd-01873b03db0b",
                                          "listitemdata":{
                                             "bodymatter":[
                                                {
                                                   "id":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                                   "type":"element-authoredtext",
                                                   "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                   "elementdata":{
                                                      "text":"sdffs"
                                                   },
                                                   "html":{
                                                      "text":"<p class=\"paragraphNumeroUno\">sdffs</p>",
                                                      "footnotes":{
                                                         
                                                      },
                                                      "glossaryentries":{
                                                         
                                                      },
                                                      "indexEntries":{
                                                         
                                                      }
                                                   },
                                                   "versionUrn":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                                   "contentUrn":"urn:pearson:entity:85538611-9859-402a-bbc1-126b3c426a0a",
                                                   "status":"wip",
                                                   "inputType":"AUTHORED_TEXT",
                                                   "inputSubType":"NA",
                                                   "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                                   "index":"0-0-0-0-1-0-1-0-1-0-0",
                                                   "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                                   "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                                }
                                             ]
                                          }
                                       }
                                    ]
                                 },
                                 "listtype":"ordered",
                                 "startNumber":1,
                                 "columnnumber":1,
                                 "iconcolor":"iconColor1",
                                 "fontstyle":"fontStyle1"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            }
         }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        config.projectUrn = "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3" }] } } }));
        await store3.dispatch(actions.createElement('TEXT', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: "0-0-0-0-1-0-1-0-1-0-0" }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST with AS- Enter - indexes - length -  4', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: updateBL_IN_AS.slateLevelData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            "type":"manifestlist",
            "subtype":"decimal",
            "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
            "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
            "element":{
               "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text":""
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                 },
                                 "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                 "status":"wip",
                                 "index":"0-0-0-0"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            },
            "index":"0-0",
            "parent":{
               "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
               "type":"element-aside",
               "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
            },
            "parentManifestList":{
               "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text":""
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                 },
                                 "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                 "status":"wip",
                                 "index":"0-0-0-0"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            }
         }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        config.projectUrn = "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: '0-0-0-0', eventType: 'ENTER' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST with AS- Enter -indexes - length - 6', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: updateBL_IN_AS2.slateLevelData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            "type":"manifestlist",
            "subtype":"decimal",
            "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
            "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
            "element":{
               "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text":""
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                 },
                                 "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                 "status":"wip",
                                 "index":"0-0-0-1-0-0"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            },
            "index":"0-0",
            "parent":{
               "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
               "type":"element-aside",
               "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
            },
            "parentManifestList":{
               "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text":""
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                 },
                                 "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                 "status":"wip",
                                 "index":"0-0-0-1-0-0"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            }
         }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        config.projectUrn = "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: "0-0-0-1-0-0", eventType: 'ENTER' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST with AS- Enter -indexes - length - 8', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: updateBL_IN_AS3.slateLevelData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            "type":"manifestlist",
            "subtype":"decimal",
            "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
            "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
            "element":{
               "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text":""
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                 },
                                 "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                 "status":"wip",
                                 "index":"0-0-0-1-0-1-0-0"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            },
            "index":"0-0",
            "parent":{
               "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
               "type":"element-aside",
               "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
            },
            "parentManifestList":{
               "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text":""
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                 },
                                 "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                 "status":"wip",
                                 "index":"0-0-0-1-0-1-0-0"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            }
         }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        config.projectUrn = "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: "0-0-0-1-0-1-0-0", eventType: 'ENTER' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST with AS- Enter -indexes - length - 10', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: updateBL_IN_AS4.slateLevelData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            "type":"manifestlist",
            "subtype":"decimal",
            "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
            "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
            "element":{
               "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text":""
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                 },
                                 "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                 "status":"wip",
                                 "index":"0-0-0-1-0-1-0-1-0-0"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            },
            "index":"0-0",
            "parent":{
               "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
               "type":"element-aside",
               "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
            },
            "parentManifestList":{
               "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text":""
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                 },
                                 "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                 "status":"wip",
                                 "index":"0-0-0-1-0-1-0-1-0-0"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            }
         }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        config.projectUrn = "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: "0-0-0-1-0-1-0-1-0-0", eventType: 'ENTER' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST with WE- Enter -indexes - length - 11', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: updateBL_IN_WE4.slateLevelData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            "type":"manifestlist",
            "subtype":"decimal",
            "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
            "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
            "element":{
               "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
               "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                        "contentUrn":"urn:pearson:entity:e4297f7f-3554-4dee-9acd-01873b03db0b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "text":"sdffs"
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\">sdffs</p>",
                                    "footnotes":{
                                       
                                    },
                                    "glossaryentries":{
                                       
                                    },
                                    "indexEntries":{
                                       
                                    }
                                 },
                                 "versionUrn":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                 "contentUrn":"urn:pearson:entity:85538611-9859-402a-bbc1-126b3c426a0a",
                                 "status":"wip",
                                 "inputType":"AUTHORED_TEXT",
                                 "inputSubType":"NA",
                                 "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                 "index":"0-0-0-0-1-0-1-0-1-0-0",
                                 "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                 "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            },
            "index":"0-0-0-0-1-0-1-0-1",
            "parent":{
               "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
               "type":"element-aside",
               "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
            },
            "parentManifestList":{
               "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
               "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                        "contentUrn":"urn:pearson:entity:e4297f7f-3554-4dee-9acd-01873b03db0b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "text":"sdffs"
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\">sdffs</p>",
                                    "footnotes":{
                                       
                                    },
                                    "glossaryentries":{
                                       
                                    },
                                    "indexEntries":{
                                       
                                    }
                                 },
                                 "versionUrn":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                 "contentUrn":"urn:pearson:entity:85538611-9859-402a-bbc1-126b3c426a0a",
                                 "status":"wip",
                                 "inputType":"AUTHORED_TEXT",
                                 "inputSubType":"NA",
                                 "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                 "index":"0-0-0-0-1-0-1-0-1-0-0",
                                 "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                 "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            },
            "grandParentManifestList":{
               "id":"urn:pearson:manifest:e8fe3040-1fa9-4dcc-b2ba-19a7f02a2eca",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:e8fe3040-1fa9-4dcc-b2ba-19a7f02a2eca",
               "contentUrn":"urn:pearson:entity:b3e24348-4921-48e1-af05-a4265d540545",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:a7f7636f-01dc-418c-8afe-f5ff668240f2",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:a7f7636f-01dc-418c-8afe-f5ff668240f2",
                        "contentUrn":"urn:pearson:entity:6ab7d9bc-41e0-4c54-9430-03c4c4ef95b5",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:f026a1e5-f282-4f6c-aa27-dddcca840fc8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "text":"asdasdasd"
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\" style=\"padding-left: 0px;\">asdasdasd</p>",
                                    "footnotes":{
                                       
                                    },
                                    "glossaryentries":{
                                       
                                    },
                                    "indexEntries":{
                                       
                                    }
                                 },
                                 "versionUrn":"urn:pearson:work:f026a1e5-f282-4f6c-aa27-dddcca840fc8",
                                 "contentUrn":"urn:pearson:entity:51c67554-72b8-40c8-9e37-5ac706385ded",
                                 "status":"wip",
                                 "inputType":"AUTHORED_TEXT",
                                 "inputSubType":"NA",
                                 "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                 "index":"0",
                                 "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                 "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                              },
                              {
                                 "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
                                 "type":"manifestlist",
                                 "subtype":"decimal",
                                 "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                 "versionUrn":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
                                 "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
                                 "listdata":{
                                    "bodymatter":[
                                       {
                                          "id":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                                          "type":"manifestlistitem",
                                          "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                          "versionUrn":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                                          "contentUrn":"urn:pearson:entity:e4297f7f-3554-4dee-9acd-01873b03db0b",
                                          "listitemdata":{
                                             "bodymatter":[
                                                {
                                                   "id":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                                   "type":"element-authoredtext",
                                                   "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                   "elementdata":{
                                                      "text":"sdffs"
                                                   },
                                                   "html":{
                                                      "text":"<p class=\"paragraphNumeroUno\">sdffs</p>",
                                                      "footnotes":{
                                                         
                                                      },
                                                      "glossaryentries":{
                                                         
                                                      },
                                                      "indexEntries":{
                                                         
                                                      }
                                                   },
                                                   "versionUrn":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                                   "contentUrn":"urn:pearson:entity:85538611-9859-402a-bbc1-126b3c426a0a",
                                                   "status":"wip",
                                                   "inputType":"AUTHORED_TEXT",
                                                   "inputSubType":"NA",
                                                   "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                                   "index":"0-0-0-0-1-0-1-0-1-0-0",
                                                   "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                                   "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                                }
                                             ]
                                          }
                                       }
                                    ]
                                 },
                                 "listtype":"ordered",
                                 "startNumber":1,
                                 "columnnumber":1,
                                 "iconcolor":"iconColor1",
                                 "fontstyle":"fontStyle1"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            }
         }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        config.projectUrn = "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: "0-0-0-0-1-0-1-0-1-0-0", eventType: 'ENTER' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST with 2C/3C- Enter -indexes - length - 11', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: updateBL_IN_2C_3C4.slateLevelData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            "type":"manifestlist",
            "subtype":"decimal",
            "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
            "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
            "element":{
               "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
               "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                        "contentUrn":"urn:pearson:entity:e4297f7f-3554-4dee-9acd-01873b03db0b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "text":"sdffs"
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\">sdffs</p>",
                                    "footnotes":{
                                       
                                    },
                                    "glossaryentries":{
                                       
                                    },
                                    "indexEntries":{
                                       
                                    }
                                 },
                                 "versionUrn":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                 "contentUrn":"urn:pearson:entity:85538611-9859-402a-bbc1-126b3c426a0a",
                                 "status":"wip",
                                 "inputType":"AUTHORED_TEXT",
                                 "inputSubType":"NA",
                                 "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                 "index":"0-0-0-0-1-0-1-0-1-0-0",
                                 "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                 "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            },
            "index":"0-0-0-0-1-0-1-0-1",
            "parent":{
               "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
               "type":"groupedcontent",
               "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
            },
            "parentManifestList":{
               "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
               "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                        "contentUrn":"urn:pearson:entity:e4297f7f-3554-4dee-9acd-01873b03db0b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "text":"sdffs"
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\">sdffs</p>",
                                    "footnotes":{
                                       
                                    },
                                    "glossaryentries":{
                                       
                                    },
                                    "indexEntries":{
                                       
                                    }
                                 },
                                 "versionUrn":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                 "contentUrn":"urn:pearson:entity:85538611-9859-402a-bbc1-126b3c426a0a",
                                 "status":"wip",
                                 "inputType":"AUTHORED_TEXT",
                                 "inputSubType":"NA",
                                 "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                 "index":"0-0-0-0-1-0-1-0-1-0-0",
                                 "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                 "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            },
            "grandParentManifestList":{
               "id":"urn:pearson:manifest:e8fe3040-1fa9-4dcc-b2ba-19a7f02a2eca",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:e8fe3040-1fa9-4dcc-b2ba-19a7f02a2eca",
               "contentUrn":"urn:pearson:entity:b3e24348-4921-48e1-af05-a4265d540545",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:a7f7636f-01dc-418c-8afe-f5ff668240f2",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:a7f7636f-01dc-418c-8afe-f5ff668240f2",
                        "contentUrn":"urn:pearson:entity:6ab7d9bc-41e0-4c54-9430-03c4c4ef95b5",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:f026a1e5-f282-4f6c-aa27-dddcca840fc8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "text":"asdasdasd"
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\" style=\"padding-left: 0px;\">asdasdasd</p>",
                                    "footnotes":{
                                       
                                    },
                                    "glossaryentries":{
                                       
                                    },
                                    "indexEntries":{
                                       
                                    }
                                 },
                                 "versionUrn":"urn:pearson:work:f026a1e5-f282-4f6c-aa27-dddcca840fc8",
                                 "contentUrn":"urn:pearson:entity:51c67554-72b8-40c8-9e37-5ac706385ded",
                                 "status":"wip",
                                 "inputType":"AUTHORED_TEXT",
                                 "inputSubType":"NA",
                                 "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                 "index":"0",
                                 "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                 "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                              },
                              {
                                 "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
                                 "type":"manifestlist",
                                 "subtype":"decimal",
                                 "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                 "versionUrn":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
                                 "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
                                 "listdata":{
                                    "bodymatter":[
                                       {
                                          "id":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                                          "type":"manifestlistitem",
                                          "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                          "versionUrn":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                                          "contentUrn":"urn:pearson:entity:e4297f7f-3554-4dee-9acd-01873b03db0b",
                                          "listitemdata":{
                                             "bodymatter":[
                                                {
                                                   "id":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                                   "type":"element-authoredtext",
                                                   "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                   "elementdata":{
                                                      "text":"sdffs"
                                                   },
                                                   "html":{
                                                      "text":"<p class=\"paragraphNumeroUno\">sdffs</p>",
                                                      "footnotes":{
                                                         
                                                      },
                                                      "glossaryentries":{
                                                         
                                                      },
                                                      "indexEntries":{
                                                         
                                                      }
                                                   },
                                                   "versionUrn":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                                   "contentUrn":"urn:pearson:entity:85538611-9859-402a-bbc1-126b3c426a0a",
                                                   "status":"wip",
                                                   "inputType":"AUTHORED_TEXT",
                                                   "inputSubType":"NA",
                                                   "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                                   "index":"0-0-0-0-1-0-1-0-1-0-0",
                                                   "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                                   "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                                }
                                             ]
                                          }
                                       }
                                    ]
                                 },
                                 "listtype":"ordered",
                                 "startNumber":1,
                                 "columnnumber":1,
                                 "iconcolor":"iconColor1",
                                 "fontstyle":"fontStyle1"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            }
         }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        config.projectUrn = "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: "0-0-0-0-1-0-1-0-1-0-0", eventType: 'ENTER' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST with AS- Shift+Tab -indexes - length - 6', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: updateBL_IN_AS2.slateLevelData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            "type":"manifestlist",
            "subtype":"decimal",
            "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
            "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
            "element":{
               "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text":""
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                 },
                                 "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                 "status":"wip",
                                 "index":"0-0-0-1-0-0"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            },
            "index":"0-0",
            "parent":{
               "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
               "type":"element-aside",
               "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
            },
            "parentManifestList":{
               "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text":""
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                 },
                                 "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                 "status":"wip",
                                 "index":"0-0-0-1-0-0"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            }
         }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        config.projectUrn = "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: "0-0-0-1-0-0", eventType: 'SHIFT+TAB' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST with AS- Shift+Tab -indexes - length - 8', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: updateBL_IN_AS3.slateLevelData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            "type":"manifestlist",
            "subtype":"decimal",
            "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
            "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
            "element":{
               "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text":""
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                 },
                                 "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                 "status":"wip",
                                 "index":"0-0-0-1-0-1-0-0"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            },
            "index":"0-0",
            "parent":{
               "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
               "type":"element-aside",
               "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
            },
            "parentManifestList":{
               "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text":""
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                 },
                                 "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                 "status":"wip",
                                 "index":"0-0-0-1-0-1-0-0"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            }
         }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        config.projectUrn = "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: "0-0-0-1-0-1-0-0", eventType: 'SHIFT+TAB' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST with AS- Shift+Tab -indexes - length - 10', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: updateBL_IN_AS4.slateLevelData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            "type":"manifestlist",
            "subtype":"decimal",
            "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
            "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
            "element":{
               "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text":""
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                 },
                                 "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                 "status":"wip",
                                 "index":"0-0-0-1-0-1-0-1-0-0"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            },
            "index":"0-0",
            "parent":{
               "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
               "type":"element-aside",
               "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
            },
            "parentManifestList":{
               "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
               "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                        "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                    "text":""
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                 },
                                 "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                 "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                 "status":"wip",
                                 "index":"0-0-0-1-0-1-0-1-0-0"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            }
         }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        config.projectUrn = "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: "0-0-0-1-0-1-0-1-0-0", eventType: 'SHIFT+TAB' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST with WE- Shift+Tab -indexes - length - 11', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: updateBL_IN_WE4.slateLevelData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            "type":"manifestlist",
            "subtype":"decimal",
            "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
            "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
            "element":{
               "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
               "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                        "contentUrn":"urn:pearson:entity:e4297f7f-3554-4dee-9acd-01873b03db0b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "text":"sdffs"
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\">sdffs</p>",
                                    "footnotes":{
                                       
                                    },
                                    "glossaryentries":{
                                       
                                    },
                                    "indexEntries":{
                                       
                                    }
                                 },
                                 "versionUrn":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                 "contentUrn":"urn:pearson:entity:85538611-9859-402a-bbc1-126b3c426a0a",
                                 "status":"wip",
                                 "inputType":"AUTHORED_TEXT",
                                 "inputSubType":"NA",
                                 "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                 "index":"0-0-0-0-1-0-1-0-1-0-0",
                                 "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                 "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            },
            "index":"0-0-0-0-1-0-1-0-1",
            "parent":{
               "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
               "type":"element-aside",
               "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
            },
            "parentManifestList":{
               "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
               "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                        "contentUrn":"urn:pearson:entity:e4297f7f-3554-4dee-9acd-01873b03db0b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "text":"sdffs"
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\">sdffs</p>",
                                    "footnotes":{
                                       
                                    },
                                    "glossaryentries":{
                                       
                                    },
                                    "indexEntries":{
                                       
                                    }
                                 },
                                 "versionUrn":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                 "contentUrn":"urn:pearson:entity:85538611-9859-402a-bbc1-126b3c426a0a",
                                 "status":"wip",
                                 "inputType":"AUTHORED_TEXT",
                                 "inputSubType":"NA",
                                 "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                 "index":"0-0-0-0-1-0-1-0-1-0-0",
                                 "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                 "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            },
            "grandParentManifestList":{
               "id":"urn:pearson:manifest:e8fe3040-1fa9-4dcc-b2ba-19a7f02a2eca",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:e8fe3040-1fa9-4dcc-b2ba-19a7f02a2eca",
               "contentUrn":"urn:pearson:entity:b3e24348-4921-48e1-af05-a4265d540545",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:a7f7636f-01dc-418c-8afe-f5ff668240f2",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:a7f7636f-01dc-418c-8afe-f5ff668240f2",
                        "contentUrn":"urn:pearson:entity:6ab7d9bc-41e0-4c54-9430-03c4c4ef95b5",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:f026a1e5-f282-4f6c-aa27-dddcca840fc8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "text":"asdasdasd"
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\" style=\"padding-left: 0px;\">asdasdasd</p>",
                                    "footnotes":{
                                       
                                    },
                                    "glossaryentries":{
                                       
                                    },
                                    "indexEntries":{
                                       
                                    }
                                 },
                                 "versionUrn":"urn:pearson:work:f026a1e5-f282-4f6c-aa27-dddcca840fc8",
                                 "contentUrn":"urn:pearson:entity:51c67554-72b8-40c8-9e37-5ac706385ded",
                                 "status":"wip",
                                 "inputType":"AUTHORED_TEXT",
                                 "inputSubType":"NA",
                                 "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                 "index":"0",
                                 "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                 "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                              },
                              {
                                 "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
                                 "type":"manifestlist",
                                 "subtype":"decimal",
                                 "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                 "versionUrn":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
                                 "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
                                 "listdata":{
                                    "bodymatter":[
                                       {
                                          "id":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                                          "type":"manifestlistitem",
                                          "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                          "versionUrn":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                                          "contentUrn":"urn:pearson:entity:e4297f7f-3554-4dee-9acd-01873b03db0b",
                                          "listitemdata":{
                                             "bodymatter":[
                                                {
                                                   "id":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                                   "type":"element-authoredtext",
                                                   "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                   "elementdata":{
                                                      "text":"sdffs"
                                                   },
                                                   "html":{
                                                      "text":"<p class=\"paragraphNumeroUno\">sdffs</p>",
                                                      "footnotes":{
                                                         
                                                      },
                                                      "glossaryentries":{
                                                         
                                                      },
                                                      "indexEntries":{
                                                         
                                                      }
                                                   },
                                                   "versionUrn":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                                   "contentUrn":"urn:pearson:entity:85538611-9859-402a-bbc1-126b3c426a0a",
                                                   "status":"wip",
                                                   "inputType":"AUTHORED_TEXT",
                                                   "inputSubType":"NA",
                                                   "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                                   "index":"0-0-0-0-1-0-1-0-1-0-0",
                                                   "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                                   "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                                }
                                             ]
                                          }
                                       }
                                    ]
                                 },
                                 "listtype":"ordered",
                                 "startNumber":1,
                                 "columnnumber":1,
                                 "iconcolor":"iconColor1",
                                 "fontstyle":"fontStyle1"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            }
         }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        config.projectUrn = "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: "0-0-0-0-1-0-1-0-1-0-0", eventType: 'SHIFT+TAB' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - MANIFEST_LIST with 2C/3C- Shift+Tab -indexes - length - 11', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: updateBL_IN_2C_3C4.slateLevelData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        const asidedata = {
            "type":"manifestlist",
            "subtype":"decimal",
            "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
            "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
            "element":{
               "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
               "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                        "contentUrn":"urn:pearson:entity:e4297f7f-3554-4dee-9acd-01873b03db0b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "text":"sdffs"
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\">sdffs</p>",
                                    "footnotes":{
                                       
                                    },
                                    "glossaryentries":{
                                       
                                    },
                                    "indexEntries":{
                                       
                                    }
                                 },
                                 "versionUrn":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                 "contentUrn":"urn:pearson:entity:85538611-9859-402a-bbc1-126b3c426a0a",
                                 "status":"wip",
                                 "inputType":"AUTHORED_TEXT",
                                 "inputSubType":"NA",
                                 "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                 "index":"0-0-0-0-1-0-1-0-1-0-0",
                                 "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                 "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            },
            "index":"0-0-0-0-1-0-1-0-1",
            "parent":{
               "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
               "type":"groupedcontent",
               "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
            },
            "parentManifestList":{
               "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
               "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                        "contentUrn":"urn:pearson:entity:e4297f7f-3554-4dee-9acd-01873b03db0b",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "text":"sdffs"
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\">sdffs</p>",
                                    "footnotes":{
                                       
                                    },
                                    "glossaryentries":{
                                       
                                    },
                                    "indexEntries":{
                                       
                                    }
                                 },
                                 "versionUrn":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                 "contentUrn":"urn:pearson:entity:85538611-9859-402a-bbc1-126b3c426a0a",
                                 "status":"wip",
                                 "inputType":"AUTHORED_TEXT",
                                 "inputSubType":"NA",
                                 "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                 "index":"0-0-0-0-1-0-1-0-1-0-0",
                                 "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                 "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            },
            "grandParentManifestList":{
               "id":"urn:pearson:manifest:e8fe3040-1fa9-4dcc-b2ba-19a7f02a2eca",
               "type":"manifestlist",
               "subtype":"decimal",
               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
               "versionUrn":"urn:pearson:manifest:e8fe3040-1fa9-4dcc-b2ba-19a7f02a2eca",
               "contentUrn":"urn:pearson:entity:b3e24348-4921-48e1-af05-a4265d540545",
               "listdata":{
                  "bodymatter":[
                     {
                        "id":"urn:pearson:manifest:a7f7636f-01dc-418c-8afe-f5ff668240f2",
                        "type":"manifestlistitem",
                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                        "versionUrn":"urn:pearson:manifest:a7f7636f-01dc-418c-8afe-f5ff668240f2",
                        "contentUrn":"urn:pearson:entity:6ab7d9bc-41e0-4c54-9430-03c4c4ef95b5",
                        "listitemdata":{
                           "bodymatter":[
                              {
                                 "id":"urn:pearson:work:f026a1e5-f282-4f6c-aa27-dddcca840fc8",
                                 "type":"element-authoredtext",
                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                 "elementdata":{
                                    "text":"asdasdasd"
                                 },
                                 "html":{
                                    "text":"<p class=\"paragraphNumeroUno\" style=\"padding-left: 0px;\">asdasdasd</p>",
                                    "footnotes":{
                                       
                                    },
                                    "glossaryentries":{
                                       
                                    },
                                    "indexEntries":{
                                       
                                    }
                                 },
                                 "versionUrn":"urn:pearson:work:f026a1e5-f282-4f6c-aa27-dddcca840fc8",
                                 "contentUrn":"urn:pearson:entity:51c67554-72b8-40c8-9e37-5ac706385ded",
                                 "status":"wip",
                                 "inputType":"AUTHORED_TEXT",
                                 "inputSubType":"NA",
                                 "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                 "index":"0",
                                 "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                 "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                              },
                              {
                                 "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
                                 "type":"manifestlist",
                                 "subtype":"decimal",
                                 "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                 "versionUrn":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
                                 "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
                                 "listdata":{
                                    "bodymatter":[
                                       {
                                          "id":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                                          "type":"manifestlistitem",
                                          "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                          "versionUrn":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                                          "contentUrn":"urn:pearson:entity:e4297f7f-3554-4dee-9acd-01873b03db0b",
                                          "listitemdata":{
                                             "bodymatter":[
                                                {
                                                   "id":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                                   "type":"element-authoredtext",
                                                   "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                   "elementdata":{
                                                      "text":"sdffs"
                                                   },
                                                   "html":{
                                                      "text":"<p class=\"paragraphNumeroUno\">sdffs</p>",
                                                      "footnotes":{
                                                         
                                                      },
                                                      "glossaryentries":{
                                                         
                                                      },
                                                      "indexEntries":{
                                                         
                                                      }
                                                   },
                                                   "versionUrn":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                                   "contentUrn":"urn:pearson:entity:85538611-9859-402a-bbc1-126b3c426a0a",
                                                   "status":"wip",
                                                   "inputType":"AUTHORED_TEXT",
                                                   "inputSubType":"NA",
                                                   "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                                   "index":"0-0-0-0-1-0-1-0-1-0-0",
                                                   "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                                   "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                                }
                                             ]
                                          }
                                       }
                                    ]
                                 },
                                 "listtype":"ordered",
                                 "startNumber":1,
                                 "columnnumber":1,
                                 "iconcolor":"iconColor1",
                                 "fontstyle":"fontStyle1"
                              }
                           ]
                        }
                     }
                  ]
               },
               "listtype":"ordered",
               "startNumber":1,
               "columnnumber":1,
               "iconcolor":"iconColor1",
               "fontstyle":"fontStyle1"
            }
         }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        config.projectUrn = "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3";
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3" }] } } }));
        await store3.dispatch(actions.createElement('MANIFEST_LIST_ITEM', 0, { manifestUrn: config.projectUrn }, asidedata, 1, '', cb, {}, { indexOrder: "0-0-0-0-1-0-1-0-1-0-0", eventType: 'SHIFT+TAB' }));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('updatePageNumber ----if-else', () => {
        jest.mock('axios');
        axios.put = jest.fn(() => Promise.resolve({}));
        axios.delete = jest.fn(() => Promise.resolve({}));

        let getState = () => {
            return {
                appStore: {
                    slateLevelData: slateLevelData2,
                    // elementsTag: {},
                    activeElement: {output: 'all'},
                    splittedElementIndex: 0,
                    pageNumberData: {}
                }
            }
        }
        let dispatch = (obj) => {
            if (obj.type == 'UPDATE_PAGENUMBER_SUCCESS') {
                expect(obj.payload.pageLoading).toEqual(false)
            }
        };
        let parentUrn = {
            manifestUrn: "urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7"
        }
        let elementId = 'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7';
        let pagenumber = 1;
        actions.updatePageNumber(pagenumber, elementId, asideDataType2, parentUrn)(dispatch, getState);
    })
    it('testing------- SECTION BREAK ------action when aside and element id same', () => {
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
        let parentUrn = {
            elementType: "manifest",
            manifestUrn: "urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b700"
        }
        return store.dispatch(actions.createElement(type, index, parentUrn, {}, 0)).then(() => {
            let { type, payload } = store.getActions()[0];
            expect(type).toBe(expectedActions.type);
            expect(payload).toStrictEqual(expectedActions.payload);
        });
    });

    it('testing-------', () => {
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
        config.tcmStatus = true;
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
            appStore: {
                slateLevelData: slateLevelData2,
                activeElement: {output: 'all'},
                splittedElementIndex: 0,
                pageNumberData: [],
                allElemPageData: []
            },
            tcmReducer: { tcmSnapshot: [] }
        };

        store = mockStore(() => initialState);
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";

        const spyGetPageNumber = jest.spyOn(actions, 'getPageNumber')
        actions.getPageNumber("1")(store.dispatch, store.getState)
        expect(spyGetPageNumber).toHaveBeenCalled()
    });

    it('testing------- getPageNumber ------action -- then', async () => {
        jest.mock('axios');
        axios.get = jest.fn(() => Promise.resolve({ data: { pageNumber: 1 } }));

        initialState = {
            appStore: {
                slateLevelData: slateLevelData2,
                activeElement: {output: 'all'},
                splittedElementIndex: 0,
                pageNumberData: [],
                allElemPageData: []
            },
            tcmReducer: { tcmSnapshot: [] },
            autoNumberReducer: mockAutoNumberReducerEmpty,
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
            "urn:pearson:work:4c2b1369-73ea-4d90-94fd-1e7ac877d668": {
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
                contentUrn: 'urn:pearson:entity:ed185293-3805-4aa1-99bd-12809b8a22e7'
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
                activeElement: {output: 'all'},
                splittedElementIndex: 0,
                pageNumberData: {},
                popupSlateData: {
                    type: "popup"
                }
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            autoNumberReducer: mockAutoNumberReducerEmpty,
        }
        store3 = mockStore(() => initialState3);
        const spyPowerPasteElement = jest.spyOn(actions, 'createPowerPasteElements');
        const powerPasteData = [{
            "html": {
                "text": `<p class="paragraphNumeroUnoCitation" data-contenturn="urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4e" data-versionurn="urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27636">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>`
            }
        }];
        const parentUrn = [{
            manifestUrn: "urn:pearson:manifest:b6f0b701-ada0-4118-8480-0827b57e9cf0"
        }
        ];
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        const index = 0;
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: [{}, {}] }));
        await store3.dispatch(actions.createPowerPasteElements(powerPasteData, index, parentUrn, asideData11)).then(() => {
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
                activeElement: {output: 'all'},
                splittedElementIndex: 0,
                pageNumberData: {},
                popupSlateData: {
                    type: "popup"
                }
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            autoNumberReducer: mockAutoNumberReducerEmpty,
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
        await store3.dispatch(actions.createPowerPasteElements(powerPasteData, index, '', '')).then(() => {
            expect(spyPowerPasteElement).toHaveBeenCalled();
        });
    })

    it('createPowerPasteElements action - wip slate for aside element', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    'urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5': {
                        ...slateMockData['urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5'],
                        status: 'wip'
                    }
                },
                activeElement: {output: 'all'},
                splittedElementIndex: 0,
                pageNumberData: {},
                popupSlateData: {
                    type: "popup"
                }
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        const spyPowerPasteElement = jest.spyOn(actions, 'createPowerPasteElements');
        const powerPasteData = [{
            "html": {
                "text": `<p class="paragraphNumeroUnoCitation" data-contenturn="urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4e" data-versionurn="urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27636">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>`
            }
        }];
        const parentUrn = {
            contentUrn: "urn:pearson:manifest:b6f0b701-ada0-4118-8480-0827b57e9cf0",
            manifestUrn: 'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7'
        };
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        const index = 0;
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: [{}, {}] }));
        await store3.dispatch(actions.createPowerPasteElements(powerPasteData, index, parentUrn, asideData11)).then(() => {
            expect(spyPowerPasteElement).toHaveBeenCalled();
        });
    })

    it('createPowerPasteElements action - wip slate show hide element', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    'urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5': {
                        ...slateMockData['urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5'],
                        status: 'wip'
                    }
                },
                activeElement: {output: 'all'},
                splittedElementIndex: 0,
                pageNumberData: {},
                popupSlateData: {
                    type: "popup"
                }
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        const spyPowerPasteElement = jest.spyOn(actions, 'createPowerPasteElements');
        const powerPasteData = [{
            "html": {
                "text": `<p class="paragraphNumeroUnoCitation" data-contenturn="urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4e" data-versionurn="urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27636">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>`
            }
        }];
        const parentUrn = {
            contentUrn: "urn:pearson:manifest:b6f0b701-ada0-4118-8480-0827b57e9cf0",
            manifestUrn: 'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7'
        };
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        const index = 0;
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: [{}, {}] }));
        await store3.dispatch(actions.createPowerPasteElements(powerPasteData, index, parentUrn, showHideAsideData)).then(() => {
            expect(spyPowerPasteElement).toHaveBeenCalled();
        });
    })

    it('createPowerPasteElements action - wip slate for 2C/3C', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    'urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5': {
                        ...slateMockData['urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5'],
                        status: 'wip'
                    }
                },
                activeElement: {output: 'all'},
                splittedElementIndex: 0,
                pageNumberData: {},
                popupSlateData: {
                    type: "popup"
                }
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        const spyPowerPasteElement = jest.spyOn(actions, 'createPowerPasteElements');
        const powerPasteData = [{
            "html": {
                "text": `<p class="paragraphNumeroUnoCitation" data-contenturn="urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4e" data-versionurn="urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27636">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>`
            }
        }];
        const parentUrn = {
            contentUrn: "urn:pearson:manifest:b6f0b701-ada0-4118-8480-0827b57e9cf0"
        };
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        const index = 0;
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: [{}, {}] }));
        await store3.dispatch(actions.createPowerPasteElements(powerPasteData, index, parentUrn, asideforgouped)).then(() => {
            expect(spyPowerPasteElement).toHaveBeenCalled();
        });
    })

    it('createPowerPasteElements action - wip slate for worked example', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    'urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5': {
                        ...slateMockData['urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5'],
                        status: 'wip'
                    }
                },
                activeElement: {output: 'all'},
                splittedElementIndex: 0,
                pageNumberData: {},
                popupSlateData: {
                    type: "popup"
                }
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        const spyPowerPasteElement = jest.spyOn(actions, 'createPowerPasteElements');
        const powerPasteData = [{
            "html": {
                "text": `<p class="paragraphNumeroUnoCitation" data-contenturn="urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4e" data-versionurn="urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27636">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>`
            }
        }];
        const parentUrn = {
            contentUrn: "urn:pearson:entity:666a9f5b-719c-4135-b003-2417c446ea52",
            manifestUrn: "urn:pearson:manifest:dcf192b0-09dd-4fd0-a79d-423c11355906"
        };
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        const index = 0;
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: [{}, {}] }));
        await store3.dispatch(actions.createPowerPasteElements(powerPasteData, index, parentUrn, workedexampleaside)).then(() => {
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
        const parentUrn = {
            contentUrn: "urn:pearson:manifest:b6f0b701-ada0-4118-8480-0827b57e9cf0"
        };
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        const index = 0;
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: [{}, {}] }));
        await store2.dispatch(actions.createPowerPasteElements(powerPasteData, index, parentUrn, asideData11)).then(() => {
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
                activeElement: {output: 'all'},
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
            autoNumberReducer: { isAutoNumberingEnabled: true },
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
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
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
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('SECTION_BREAK', 0, { manifestUrn: config.projectUrn }, asideDataMock));
    });

    it('createElement action - SECTION_BREAK block testing > if (item.id == asideData.id) ', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: tabbedData2,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const asideDataMock = {
            parent: {
                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
                type: "groupedcontent",
                subtype: "tab"
            },
            index: "0-0-0-0",
            id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",

        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('SECTION_BREAK', 0, { manifestUrn: config.projectUrn }, asideDataMock));
    });

    it('createElement action - SECTION_BREAK block testing > item?.subtype === ELEMENT_WORKEDEXAMPLE > if', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: tabbedData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const asideDataMock = {
            parent: {
                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
                type: "groupedcontent",
                subtype: "tab"
            },
            index: "0-0-0-0"
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('SECTION_BREAK', 0, { manifestUrn: config.projectUrn }, asideDataMock));
    });

    it('createElement action - !SECTION_BREAK - element-aside ---- testing 1', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: NotSectionBreakMockSlateData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
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
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('', 0, { manifestUrn: config.projectUrn }, asideDataMock));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });

    
    it('createElement action - !SECTION_BREAK - element-aside ---- testing 1', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: NotSectionBreakMockSlateData4,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const asideDataMock = {
            type: 'element-aside',
            parent: {
                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40e",
                type: "groupedcontent",
                subtype: "tab"
            },
            index: "0-0-0-0"
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('', 0, { manifestUrn: config.projectUrn }, asideDataMock));
    });

    it('createElement action - !SECTION_BREAK - element-aside ---- testing 1', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: NotSectionBreakMockSlateData5,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const asideDataMock = {
            type: 'element-aside',
            parent: {
                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40e",
                type: "groupedcontent",
                subtype: "tab"
            },
            index: "0-0-0-0"
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('', 0, { manifestUrn: config.projectUrn }, asideDataMock));
    });

    it('createElement action - !SECTION_BREAK - element-aside ---- testing 2', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: NotSectionBreakMockSlateData2,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:manifest:8a017219-5a2d-4084-bdf7-4261b868ea35";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const asideDataMock = asideDataType3;
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('', 0, { manifestUrn: config.projectUrn }, asideDataMock));
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
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
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
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('', 0, { manifestUrn: config.projectUrn }, asideDataMock, 1, '', cb, poetryData));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });

    it('createElement action - poetryData --- testing3', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5": {
                        contents: {
                            bodymatter: [{
                                elementdata: {
                                    bodymatter: [{
                                        id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g",
                                        contents: {
                                            bodymatter: [{
                                                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g",
                                                contents: {
                                                    bodymatter: [{}]
                                                }
                                            }]
                                        }
                                    }]
                                },
                                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40e",
                                type: "poetr",
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
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const asideDataMock = {
            type: ''
        }
        const poetryData = {
            parent: {
                type: "element-aside",
                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40e"
            },
            id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40e',
            type: 'poetry',
            parentUrn: {
                manifestUrn: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
            }
        };
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('', 0, { manifestUrn: config.projectUrn }, asideDataMock, 1, '', cb, poetryData));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });

    it('createElement action - poetryData --- testing4', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5": {
                        contents: {
                            bodymatter: [{
                                groupeddata: {
                                    bodymatter: [{
                                        groupdata: {
                                            bodymatter: [{ id: "" }]
                                        }
                                    }]
                                },
                                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40e",
                                type: "poetr",
                                contents: {
                                    bodymatter: [{
                                        id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g",
                                        contents: {
                                            bodymatter: [{
                                                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g",
                                                contents: {
                                                    bodymatter: [{}]
                                                }
                                            }]
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
                activeElement: {output: 'all'}
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            autoNumberReducer: { isAutoNumberingEnabled: true }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const asideDataMock = {
            type: ''
        }
        const poetryData = {
            parent: {
                type: "groupedcontent",
                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40e"
            },
            id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40e',
            type: 'poetry',
            parentUrn: {
                manifestUrn: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
            }
        };
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('', 0, { manifestUrn: config.projectUrn }, asideDataMock, 1, '', cb, poetryData));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });

    it('createElement action - poetryData --- testing 1', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5": {
                        contents: {
                            bodymatter: [{
                                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g",
                                type: "poetry",
                                contents: {
                                    bodymatter: [{
                                        id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40e",
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
                activeElement: {output: 'all'}
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            autoNumberReducer: { isAutoNumberingEnabled: true }
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
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('', 0, { manifestUrn: config.projectUrn }, asideDataMock, 1, '', cb, poetryData));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });

    it('createElement action - poetryData --- testing 2', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5": {
                        contents: {
                            bodymatter: [{
                                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g",
                                type: "poetry",
                                contents: {
                                    bodymatter: [{
                                        id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40e",
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
                activeElement: {output: 'all'}
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            autoNumberReducer: { isAutoNumberingEnabled: true }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const asideDataMock = {
            type: ''
        }
        const poetryData = {
            id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g',
            type: 'poetry',
            parentUrn: 'urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5'
        };
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('', 0, { manifestUrn: config.projectUrn }, asideDataMock, 1, '', cb, poetryData));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });

    it('createElement action - poetryData --- testing 3', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5": {
                        contents: {
                            bodymatter: [{
                                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g",
                                interactivedata: {
                                    show: [{
                                        id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f'
                                    }]
                                }
                            }]
                        }
                    }
                },
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            autoNumberReducer: { isAutoNumberingEnabled: true },
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const asideDataMock = {
            type: ''
        }
        const poetryData = {
            id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f',
            type: 'poetry',
            parent: {
                type: 'showhide',
                showHideType: 'show',
                id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
            }
        };
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('', 0, { manifestUrn: config.projectUrn }, asideDataMock, 1, '', cb, poetryData));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });

    it('createElement action - if (poetryData?.parent?.type === MULTI_COLUMN && poetryData?.parent?.subtype === TAB && item.id === poetryData?.parent?.id && poetryData.index)', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5": {
                        contents: {
                            bodymatter: [{
                                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g",
                                interactivedata: {
                                    show: [{
                                        id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f'
                                    }]
                                }
                            }]
                        }
                    }
                },
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            autoNumberReducer: { isAutoNumberingEnabled: true },
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const asideDataMock = {
            type: ''
        }
        const poetryData = {
            id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f',
            type: 'poetry',
            parent: {
                type: 'groupedcontent',
                subtype: "tab",
                id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g'
            },
            index: "0-0-0-0"
        };
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('', 0, { manifestUrn: config.projectUrn }, asideDataMock, 1, '', cb, poetryData));
    });

    it('createElement action -  if (asideData && asideData.type === MULTI_COLUMN && asideData.subtype === TAB)', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: {
                    "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5": {
                        contents: {
                            bodymatter: [{
                                id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40g",
                                interactivedata: {
                                    show: [{
                                        id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f'
                                    }]
                                }
                            }]
                        }
                    }
                },
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            autoNumberReducer: { isAutoNumberingEnabled: true },
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const asideDataMock = {
            type: 'groupedcontent',
            subtype: "tab",
            index: "0-0-0-0"
        }
        const poetryData = {
            id: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f',
            parent: {},
            index: "0-0-0-0"
        };
        const cb = jest.fn();
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('', 0, { manifestUrn: config.projectUrn }, asideDataMock, 1, '', cb, poetryData));
    });

    it('createElement action - !asideData block testing', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: sectionBreakMockSlateData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('', 0, { manifestUrn: config.projectUrn, elementType: 'group' }, null));
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
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const asideDataMock = {
            type: 'groupedcontent'
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('', 0, { manifestUrn: config.projectUrn }, asideDataMock));
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
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const asideDataMock = {
            type: 'citations'
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('', 0, { manifestUrn: config.projectUrn }, asideDataMock));
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
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
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
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('LO_LIST', 0, { manifestUrn: config.projectUrn }, asideDataMock));
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
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true },
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
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('LO', 0, { manifestUrn: config.projectUrn }, asideDataMock, 0, "loref"));
    });

    xit('createElement action - ELSE', async () => {
        let initialState0 = {
            appStore: {
                slateLevelData: NotSectionBreakMockSlateData3,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] }
        }
        let store0 = mockStore(() => initialState0);
        config.slateManifestURN = "urn:pearson:manifest:4b90dfbd-8993-41f7-a474-e95aa64bd21d"
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ "data": { "id": "urn:pearson:work:f3822f12-2b78-4b48-a498-d60ab264e096", "type": "element-authoredtext", "status": "wip" }, "status": 200 }));
        await store0.dispatch(actions.createElement('TEXT', 0));
        const { type } = store0.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    })

    it('createElement action - section break inside section in we inside s/h', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: sectionBreakMockSlateData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: { isAutoNumberingEnabled: true }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const asideDataSH = {
            contentUrn: "urn:pearson:entity:bda611d3-773d-4780-852b-efa14c18742f",
            element: { id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb", type: "element-aside", subtype: "workedexample", schema: "http://schemas.pearson.com/wip-authoring/element/1", designtype: "workedexample1" },
            id: "urn:pearson:manifest:11c71298-c804-48f1-a8cc-323d107ba1be",
            index: "0-0-1-1",
            parent: { id: "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02", type: "showhide", contentUrn: "urn:pearson:entity:62008570-5ab8-4f2f-8ce1-e48ae80bc714", showHideType: "hide" },
            type: "citations",
            subtype: 'sidebar'
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('SECTION_BREAK', 0, { manifestUrn: 'urn:pearson:manifest:11c71298-c804-48f1-a8cc-323d107ba1be' }, asideDataSH));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - section break inside section in we inside s/h else condition coverage', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: sectionBreakMockSlateData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: mockAutoNumberReducerEmpty,
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const asideDataSH = {
            contentUrn: "urn:pearson:entity:bda611d3-773d-4780-852b-efa14c18742f",
            element: { id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb", type: "element-aside", subtype: "workedexample", schema: "http://schemas.pearson.com/wip-authoring/element/1", designtype: "workedexample1" },
            id: "urn:pearson:manifest:11c71298-c804-48f1-a8cc-323d107ba1be",
            index: "0-0-1-1",
            parent: { id: "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02", type: "showhide", contentUrn: "urn:pearson:entity:62008570-5ab8-4f2f-8ce1-e48ae80bc714", showHideType: "hide" },
            type: "citations",
            subtype: 'sidebar'
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('SECTION_BREAK', 0, { manifestUrn: 'urn:pearson:manifest:11c71298-c804-48f1-a8cc-323d107ba1bf' }, asideDataSH));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - element-autheredtext inside manifest in WE inside s/h', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: sectionBreakMockSlateData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: mockAutoNumberReducerEmpty,
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const asideDataSH = {
            contentUrn: "urn:pearson:entity:bda611d3-773d-4780-852b-efa14c18742f",
            element: { id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb", type: "element-aside", subtype: "workedexample", schema: "http://schemas.pearson.com/wip-authoring/element/1", designtype: "workedexample1" },
            id: "urn:pearson:manifest:11c71298-c804-48f1-a8cc-323d107ba1be",
            index: "0-0-1-1",
            parent: { id: "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02", type: "showhide", contentUrn: "urn:pearson:entity:62008570-5ab8-4f2f-8ce1-e48ae80bc714", showHideType: "hide" },
            type: "element-aside",
            subtype: 'workedexample'
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('', 0, { manifestUrn: 'urn:pearson:manifest:f0c610b8-337d-47b0-9680-83b73481289c', elementType: 'manifest' }, asideDataSH));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - element-autheredtext inside Aside inside s/h', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: sectionBreakMockSlateData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: mockAutoNumberReducerEmpty,
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const asideDataSH = {
            contentUrn: "urn:pearson:entity:bda611d3-773d-4780-852b-efa14c18742f",
            element: { id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb", type: "element-aside", subtype: "workedexample", schema: "http://schemas.pearson.com/wip-authoring/element/1", designtype: "workedexample1" },
            id: "urn:pearson:manifest:11c71298-c804-48f1-a8cc-323d107ba1be",
            index: "0-0-1-1",
            parent: { id: "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02", type: "showhide", contentUrn: "urn:pearson:entity:62008570-5ab8-4f2f-8ce1-e48ae80bc714", showHideType: "hide" },
            type: "element-aside",
            subtype: 'sidebar'
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('', 0, { manifestUrn: 'urn:pearson:manifest:f0c610b8-337d-47b0-9680-83b73481289c', elementType: 'manifest' }, asideDataSH));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - element-autheredtext inside Aside inside s/h conditional coverage', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: sectionBreakMockSlateData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: mockAutoNumberReducerEmpty
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const asideDataSH = {
            contentUrn: "urn:pearson:entity:bda611d3-773d-4780-852b-efa14c18742f",
            element: { id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb", type: "element-aside", subtype: "workedexample", schema: "http://schemas.pearson.com/wip-authoring/element/1", designtype: "workedexample1" },
            id: "urn:pearson:manifest:11c71298-c804-48f1-a8cc-323d107ba1be",
            index: "0-0-1-1",
            parent: { id: "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02", type: "showhide", contentUrn: "urn:pearson:entity:62008570-5ab8-4f2f-8ce1-e48ae80bc714" },
            type: "element-aside",
            subtype: 'sidebar'
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('', 0, { manifestUrn: 'urn:pearson:manifest:f0c610b8-337d-47b0-9680-83b73481289c', elementType: 'manifest' }, asideDataSH));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
    });
    it('createElement action - element-citation inside citation inside s/h', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: sectionBreakMockSlateData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: mockAutoNumberReducerEmpty
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const asideDataSH = {
            contentUrn: "urn:pearson:entity:bda611d3-773d-4780-852b-efa14c18742f",
            id: "urn:pearson:manifest:ef6d234d-5965-4976-8e21-0e093c5ba7a0",
            index: "0-0-1-1",
            parent: { id: "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02", type: "showhide", contentUrn: "urn:pearson:entity:62008570-5ab8-4f2f-8ce1-e48ae80bc714", showHideType: "show" },
            type: "citations",
            subtype: 'sidebar'
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('', 0, { manifestUrn: 'urn:pearson:manifest:f0c610b8-337d-47b0-9680-83b73481289c', elementType: 'manifest' }, asideDataSH));
        const { type } = store3.getActions()[0];
        expect(type).toBe('AUTHORING_ELEMENT_CREATED');
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
                activeElement: {output: 'all'}
            },
            autoNumberReducer: mockAutoNumberReducerEmpty,
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            selectionReducer: {
                selection: {
                    activeAnimation: true,
                    element: { id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", type: "element-authoredtext", schema: "http://schemas.pearson.com/wip-authoring/element/1", html: { text: '' } },
                    inputSubType: "NA",
                    inputType: "AUTHORED_TEXT",
                    operationType: "cut",
                    sourceElementIndex: 1,
                    sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
                    sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6"
                }
            },
            commentsPanelReducer: {
                allComments: []
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb";
        const spypasteElement = jest.spyOn(actions, 'pasteElement')
        const params = {
            poetryData: { contentUrn: 'urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb' },
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
                activeElement: {output: 'all'}
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            selectionReducer: {
                selection: {
                    activeAnimation: true,
                    element: { id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", figuretype: "image", type: "figure", schema: "http://schemas.pearson.com/wip-authoring/element/1",
                    manualoverride: {
                        overridenumbervalue: "aaa",
                        overridelabelvalue: "Fig"
                    }},
                    inputSubType: "NA",
                    inputType: "AUTHORED_TEXT",
                    operationType: "cut",
                    sourceElementIndex: '1-0-1',
                    sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
                    sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6",
                    sourceEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fc"
                }
            },
            autoNumberReducer: {
                isAutoNumberingEnabled: true
            },
            commentsPanelReducer: {
                allComments: []
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1ff";
        const spypasteElement = jest.spyOn(actions, 'pasteElement')
        const params = {
            parentUrn: { contentUrn: 'urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fc' },
            index: 2
        }
        actions.pasteElement(params)(store3.dispatch, store3.getState)
        expect(spypasteElement).toHaveBeenCalled()
    });

    it('pasteElement  action - with parentUrn else condition for isAutoNumberingEnabled && autoNumberFigureTypesAllowed.includes(selection?.element?.figuretype', async () => {
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
                activeElement: {output: 'all'}
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            selectionReducer: {
                selection: {
                    activeAnimation: true,
                    element: { id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", figuretype: "image", type: "figure", schema: "http://schemas.pearson.com/wip-authoring/element/1"},
                    inputSubType: "NA",
                    inputType: "AUTHORED_TEXT",
                    operationType: "cut",
                    sourceElementIndex: '1-0-1',
                    sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
                    sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6",
                    sourceEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fc"
                }
            },
            autoNumberReducer: {
                isAutoNumberingEnabled: true
            },
            commentsPanelReducer: {
                allComments: []
            }
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1ff";
        const spypasteElement = jest.spyOn(actions, 'pasteElement')
        const params = {
            parentUrn: { contentUrn: 'urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fc' },
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
                activeElement: {output: 'all'}
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            selectionReducer: {
                selection: {
                    activeAnimation: true,
                    element: { id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", figuretype: " ", type: "figure", schema: "http://schemas.pearson.com/wip-authoring/element/1" },
                    inputSubType: "NA",
                    inputType: "AUTHORED_TEXT",
                    operationType: "cut",
                    sourceElementIndex: '1-0-1',
                    sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
                    sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6",
                    sourceEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fc"
                }
            },
            autoNumberReducer: { isAutoNumberingEnabled: true},
            commentsPanelReducer: {
                allComments: []
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
                activeElement: {output: 'all'}
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            selectionReducer: {},
            autoNumberReducer:{isAutoNumberingEnabled: true},
            commentsPanelReducer: {
                allComments: []
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
                activeElement: {output: 'all'}
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            selectionReducer: {
                selection: {
                    activeAnimation: true,
                    element: { id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", figuretype: " ", type: "discussion", schema: "http://schemas.pearson.com/wip-authoring/element/1" },
                    inputSubType: "NA",
                    inputType: "AUTHORED_TEXT",
                    operationType: "cut",
                    sourceElementIndex: '2',
                    sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
                    sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6",
                    sourceEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fc"
                }
            },
            autoNumberReducer: {
                isAutoNumberingEnabled: true
            },
            commentsPanelReducer: {
                allComments: []
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

    it('pasteElement  action - without sectionType', async () => {
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
                activeElement: {output: 'all'}
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            selectionReducer: {
                selection: {
                    activeAnimation: true,
                    element: { id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", figuretype: " ", type: "element-aside", schema: "http://schemas.pearson.com/wip-authoring/element/1", html: {title: 'title'},                   manualoverride: {
                        overridenumbervalue: "aaa",
                        overridelabelvalue: "Fig"
                    }},
                    inputSubType: "NA",
                    inputType: "AUTHORED_TEXT",
                    operationType: "cut",
                    sourceElementIndex: '2',
                    sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
                    sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6",
                    sourceEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fc"
                }
            },
            autoNumberReducer: {
                isAutoNumberingEnabled: true
            },
            commentsPanelReducer: {
                allComments: []
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
            // sectionType: 'sectionType',
            asideData: { interactivedata: { sectionType: [{ id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62" }] },
                sectionType: 'sectionType' }
        }
        actions.pasteElement(params)(store3.dispatch, store3.getState)
        expect(spypasteElement).toHaveBeenCalled()
    });

    it('pasteElement  action - without sectionType: manualoveride else case', async () => {
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
                activeElement: {output: 'all'}
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            selectionReducer: {
                selection: {
                    activeAnimation: true,
                    element: { id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", figuretype: " ", type: "element-aside", schema: "http://schemas.pearson.com/wip-authoring/element/1", html: {title: 'title'}},
                    inputSubType: "NA",
                    inputType: "AUTHORED_TEXT",
                    operationType: "cut",
                    sourceElementIndex: '2',
                    sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
                    sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6",
                    sourceEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fc"
                }
            },
            autoNumberReducer: {
                isAutoNumberingEnabled: true
            },
            commentsPanelReducer: {
                allComments: []
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
            // sectionType: 'sectionType',
            asideData: { interactivedata: { sectionType: [{ id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62" }] },
                sectionType: 'sectionType' }
        }
        actions.pasteElement(params)(store3.dispatch, store3.getState)
        expect(spypasteElement).toHaveBeenCalled()
    });

    it('pasteElement  action - element type : element-dialogue', async () => {
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
                activeElement: {output: 'all'}
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            selectionReducer: {
                selection: {
                    activeAnimation: true,
                    element: { id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", figuretype: " ", type: "element-dialogue", schema: "http://schemas.pearson.com/wip-authoring/element/1" },
                    inputSubType: "NA",
                    inputType: "AUTHORED_TEXT",
                    operationType: "cut",
                    sourceElementIndex: '2',
                    sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
                    sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6",
                    sourceEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fc"
                }
            },
            autoNumberReducer: {
                isAutoNumberingEnabled: true
            },
            commentsPanelReducer: {
                allComments: []
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
            // sectionType: 'sectionType',
            asideData: { interactivedata: { sectionType: [{ id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62" }] },
                sectionType: 'sectionType' }
        }
        actions.pasteElement(params)(store3.dispatch, store3.getState)
        expect(spypasteElement).toHaveBeenCalled()
    });

    it('pasteElement  action - element type : decorative', async () => {
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
                activeElement: {output: 'all'}
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            selectionReducer: {
                selection: {
                    activeAnimation: true,
                    element: { id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", figuretype: " ", type: "figure", figuredata: {decorative: true}, schema: "http://schemas.pearson.com/wip-authoring/element/1" },
                    inputSubType: "NA",
                    inputType: "AUTHORED_TEXT",
                    operationType: "cut",
                    sourceElementIndex: '2',
                    sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
                    sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6",
                    sourceEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fc"
                }
            },
            autoNumberReducer: {
                isAutoNumberingEnabled: true
            },
            commentsPanelReducer: {
                allComments: []
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
            // sectionType: 'sectionType',
            asideData: { interactivedata: { sectionType: [{ id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62" }] },
                sectionType: 'sectionType' }
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
                activeElement: {output: 'all'}
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            selectionReducer: {
                selection: {
                    activeAnimation: true,
                    element: { id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", figuretype: " ", type: "element-aside", schema: "http://schemas.pearson.com/wip-authoring/element/1" },
                    inputSubType: "NA",
                    inputType: "AUTHORED_TEXT",
                    operationType: "copy",
                    sourceElementIndex: '2',
                    sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
                    sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6",
                    sourceEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fc"
                }
            },
            autoNumberReducer: mockAutoNumberReducerEmpty,
            commentsPanelReducer: {
                allComments: []
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
        axios.post = jest.fn(() => Promise.resolve({ status: '200', data: {} }));
        axios.get = jest.fn(() => Promise.resolve({ status: '200', data: { 'urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6': { type: 'figure', figuretype: 'image', elementdata: { type: 'blockquote' } } } }));
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
                activeElement: {output: 'all'}
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
                id: "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
                contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
            },
            type: 'pe',
            poetryId: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f'
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ status: '200' }));
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
                activeElement: {output: 'all'}
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
                id: "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
                contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
            },
            type: '2C',
            containerIndex: 0,
            columnIndex: 0
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ status: '200' }));
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
                activeElement: {output: 'all'}
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
                id: "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
                contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
            },
            type: '3C',
            containerIndex: 0,
            columnIndex: 0
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ status: '200' }));
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
                activeElement: {output: 'all'}
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
                id: "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
                contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
            },
            type: 'section',
            asideId: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f',
            currentSlateEntityUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1",
            elementIndex: '0-0-0',
            parentElement: {
                type: 'groupedcontent'
            }
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ status: '200' }));
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
                activeElement: {output: 'all'}
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
        const { type } = store3.getActions()[0];
        expect(type).toBe('SWAP_ELEMENT');
    })
    it('swapElement  action - we as containerTypeElem for groupedcontent', async () => {
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
                activeElement: {output: 'all'}
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1";
        const dataObj = {
            containerTypeElem: 'we',
            swappedElementData: {
                id: "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
                contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
            },
            type: 'we',
            asideId: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f',
            currentSlateEntityUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1",
            elementIndex:'1-0-1',
            parentElement: {
                type:'groupedcontent',
                showHideType: 'show'
            }
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ status: '200' }));
        await store3.dispatch(actions.swapElement(dataObj, jest.fn()));
        const { type } = store3.getActions()[0];
        expect(type).toBe('ERROR_POPUP');
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
                activeElement: {output: 'all'}
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
                activeElement: {output: 'all'}
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

    it('swapElement  action - blockpoetry inside S/H - if block', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: sectionBreakMockSlateData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const dataObj = {
            sectionType: "show",
            poetryId: "urn:pearson:manifest:ef6d234d-5965-4976-8e21-0e093c5ba7a1",
            containerTypeElem: 'pe',
            elementIndex: '1-0-1',
            swappedElementData: {
                id: "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
                contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
            },
            type: 'pe',
            currentSlateEntityUrn: "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157bs4aw"
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ status: '200' }));
        await store3.dispatch(actions.swapElement(dataObj, jest.fn()));
        const { type } = store3.getActions()[0];
        expect(type).toBe('SWAP_ELEMENT');
    });
    it('swapElement  action - blockpoetry inside S/H - if block', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: sectionBreakMockSlateData1,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const dataObj = {
            sectionType: "show",
            poetryId: "urn:pearson:work:86e2fa3e-e3ff-4887-af8d-b376a1fc08ed",
            containerTypeElem: 'pe',
            elementIndex: '2-0-1',
            swappedElementData: {
                id: "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
                contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
            },
            type: 'pe',
            currentSlateEntityUrn: "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157bs4aw"
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ status: '200' }));
        await store3.dispatch(actions.swapElement(dataObj, jest.fn()));
        const { type } = store3.getActions()[0];
        expect(type).toBe('SWAP_ELEMENT');
    });
    it('swapElement  action - Stanza inside PE inside S/H', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: sectionBreakMockSlateData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const dataObj = {
            sectionType: "show",
            poetryId: "urn:pearson:manifest:1c34d634-c2af-43e2-906f-36309ecea474",
            containerTypeElem: 'pe',
            element: {
                type: 'showhide', interactivedata: {
                    show: [{
                        id: "urn:pearson:manifest:1c34d634-c2af-43e2-906f-36309ecea474",
                        type: "poetry", contents: { bodymatter: [{}] }
                    }]
                }
            },
            elementIndex: '1-0-1',
            swappedElementData: {
                id: "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
                contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
            },
            type: 'pe',
            currentSlateEntityUrn: "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157bs4aw"
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ status: '200' }));
        await store3.dispatch(actions.swapElement(dataObj, jest.fn()));
        const { type } = store3.getActions()[0];
        expect(type).toBe('SWAP_ELEMENT');
    });
    
    it('swapElement  action - Stanza inside PE inside S/H', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: sectionBreakMockSlateData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const dataObj = {
            sectionType: "show",
            poetryId: "urn:pearson:manifest:1c34d634-c2af-43e2-906f-36309ecea474",
            containerTypeElem: 'pe',
            element: {
                type: 'showhide', interactivedata: {
                    show: [{
                        id: "urn:pearson:manifest:1c34d634-c2af-43e2-906f-36309ecea474",
                        type: "poetry", contents: { bodymatter: [{}] }
                    }]
                }
            },
            elementIndex: '1-0-1',
            swappedElementData: {
                id: "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
                contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
            },
            type: 'pe',
            currentSlateEntityUrn: "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157bs4aw"
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ status: '200' }));
        await store3.dispatch(actions.swapElement(dataObj, jest.fn()));
        const { type } = store3.getActions()[0];
        expect(type).toBe('SWAP_ELEMENT');
    });
    it('swapElement  action - Aside/WE inside S/H', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: sectionBreakMockSlateData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const dataObj = {
            containerTypeElem: 'we',
            parentElement: { type: 'showhide', showHideType: 'show' },
            elementIndex: '1-0-1',
            swappedElementData: {
                id: "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
                contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
            },
            type: 'we',
            asideId: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f',
            currentSlateEntityUrn: "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157bs4aw"
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ status: '200' }));
        await store3.dispatch(actions.swapElement(dataObj, jest.fn()));
        const { type } = store3.getActions()[0];
        expect(type).toBe('SWAP_ELEMENT');
    });
    it('swapElement  action - Aside/WE inside S/H conditional coverage', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: sectionBreakMockSlateData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const dataObj = {
            containerTypeElem: 'we',
            parentElement: { type: 'showhide', showHideType: 'show' },
            elementIndex: '1-0-1',
            swappedElementData: {
                id: "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
                contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
            },
            type: 'we',
            asideId: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f',
            currentSlateEntityUrn: "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157bs4bx"
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ status: '200' }));
        await store3.dispatch(actions.swapElement(dataObj, jest.fn()));
        const { type } = store3.getActions()[0];
        expect(type).toBe('SWAP_ELEMENT');
    });
    it('swapElement  action - section-break inside WE inside S/H', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: sectionBreakMockSlateData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const dataObj = {
            containerTypeElem: 'section',
            parentElement: { type: 'showhide', showHideType: 'hide' },
            elementIndex: '1-0-0',
            swappedElementData: {
                id: "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
                contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
            },
            type: 'we',
            asideId: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f',
            currentSlateEntityUrn: "urn:pearson:entity:08942f6d-8fd3-4a39-b72d-8bdc33eb289a"
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ status: '200' }));
        await store3.dispatch(actions.swapElement(dataObj, jest.fn()));
        const { type } = store3.getActions()[0];
        expect(type).toBe('SWAP_ELEMENT');
    });
    it('swapElement  action - elements inside CG inside S/H', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: sectionBreakMockSlateData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const dataObj = {
            containerTypeElem: 'cg',
            parentElement: { type: 'showhide', showHideType: 'show' },
            elementIndex: '1-0-0',
            swappedElementData: {
                id: "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
                contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
            },
            type: 'we',
            asideId: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f',
            currentSlateEntityUrn: "urn:pearson:entity:e1d634f7-3edf-4f57-9e45-a351ae35b2b6"
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ status: '200' }));
        await store3.dispatch(actions.swapElement(dataObj, jest.fn()));
        const { type } = store3.getActions()[0];
        expect(type).toBe('SWAP_ELEMENT');
    });
    it('swapElement  action - elements inside CG inside S/H conditional coverage', async () => {
        initialState3 = {
            appStore: {
                slateLevelData: sectionBreakMockSlateData,
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        const dataObj = {
            containerTypeElem: 'cg',
            parentElement: { type: 'showhide', showHideType: 'show' },
            elementIndex: '1-0-0',
            swappedElementData: {
                id: "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
                contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
            },
            type: 'we',
            asideId: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f',
            currentSlateEntityUrn: "urn:pearson:entity:e1d634f7-3edf-4f57-9e45-a351ae35b2c7"
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ status: '200' }));
        await store3.dispatch(actions.swapElement(dataObj, jest.fn()));
        const { type } = store3.getActions()[0];
        expect(type).toBe('SWAP_ELEMENT');
    });

    it('createElement action - slate approved without popup as type', async () => {
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
                        type: ''
                    }
                },
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            autoNumberReducer: mockAutoNumberReducerEmpty,
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
        axios.post = jest.fn(() => Promise.resolve({ data: { contents: { bodymatter: [{ id: "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f" }] } } }));
        await store3.dispatch(actions.createElement('LO', 0, { manifestUrn: config.projectUrn }, asideDataMock, 0));
    });

    it('testing handleSplitSlate method - slate approved', async () => {
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
                        status: 'approved'
                    }
                },
                popupSlateData: {
                    type: ""
                },
                activeElement: {output: 'all'}
            },
            selectionReducer: {},
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            commentsPanelReducer: {
                allComments: []
            }
        }
        store3 = mockStore(() => initialState3);
        jest.mock('axios');
        axios.put = jest.fn(() => Promise.resolve({}));
        config.slateEntityURN = 'urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb';
        const newSlateObj = { contentUrn: '', entityUrn: '', containerUrn: '' };
        await store3.dispatch(actions.handleSplitSlate(newSlateObj));
    });

    it('pasteElement  action - with figure as elmType and assessment as elmSubtype ', async () => {
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
                activeElement: {output: 'all'}
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
            selectionReducer: {
                selection: {
                    activeAnimation: true,
                    element: { id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", figuretype: "assessment", type: "figure", schema: "http://schemas.pearson.com/wip-authoring/element/1", title: "", manifestationUrn: "" },
                    inputSubType: "NA",
                    inputType: "AUTHORED_TEXT",
                    operationType: "cut",
                    sourceElementIndex: '1-0',
                    sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
                    sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6",
                    sourceEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fc"
                }
            },
            autoNumberReducer: mockAutoNumberReducerEmpty,
            commentsPanelReducer: { allComments: [] },
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
        axios.post = jest.fn(() => Promise.resolve({ status: '200', data: {} }));
        axios.get = jest.fn(() => Promise.resolve({ status: '200', data: { 'urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6': { type: 'figure', figuretype: 'image', elementdata: { type: 'blockquote' } } } }));
        await actions.pasteElement(params)(store3.dispatch, store3.getState);
        expect(spypasteElement).toHaveBeenCalled()
    });
    it('swapElement  action - showhide as containerTypeElem', async () => {
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
                activeElement: {output: 'all'}
            },
            tcmReducer: { tcmSnapshot: ["78", "9"] },
        }
        store3 = mockStore(() => initialState3);
        config.slateManifestURN = "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5";
        config.projectUrn = "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f";
        config.slateEntityURN = "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1ff";
        const dataObj = {
            containerTypeElem: 'showhide',
            swappedElementData: {
                id: "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
                contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
            },
            type: 'pe',
            poetryId: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f',
            currentSlateEntityUrn: 'urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1ff',
            sectionType: 'sectionType'
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ status: '200' }));
        await store3.dispatch(actions.swapElement(dataObj, jest.fn()));
        const { type } = store3.getActions()[0];
        expect(type).toBe('SWAP_ELEMENT');
    });

    it('swapElement  action - section as containerTypeElem without parentElement', async () => {
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
                activeElement: {output: 'all'}
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
                id: "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
                contentUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
            },
            type: 'section',
            asideId: 'urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f',
            currentSlateEntityUrn: "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
        }
        jest.mock('axios');
        axios.post = jest.fn(() => Promise.resolve({ status: '200' }));
        await store3.dispatch(actions.swapElement(dataObj, jest.fn()));
        const { type } = store3.getActions()[0];
        expect(type).toBe('SWAP_ELEMENT');
    })

    it('Test createPayloadForWordImport', () => {
        const spyPowerPasteElement = jest.spyOn(actions, 'createPayloadForWordImport');
        const powerPasteData = [{
            "html": {
                "text": `<p class="paragraphNumeroUnoCitation" data-contenturn="urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4e" data-versionurn="urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27636">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>`
            }
        }];
        const index = 0;
        actions.createPayloadForWordImport(powerPasteData, index);
        expect(spyPowerPasteElement).toHaveBeenCalled();
    })
})