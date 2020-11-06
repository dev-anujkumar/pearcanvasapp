import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as updateHelpers from '../../../src/component/ElementContainer/ElementContainerUpdate_helpers';
import { slateWithCitationElement} from "../../../fixtures/slateTestingData"
import { multiColumnContainer } from "../../../fixtures/multiColumnContainer";
import config from '../../../src/config/config.js';
import { stub } from 'sinon';
import { slateLevelData } from "../../../fixtures/containerActionsTestingData"
import { AUTHORING_ELEMENT_UPDATE } from '../../../src/constants/Action_Constants';
import { JSDOM } from 'jsdom'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
global.document = (new JSDOM()).window.Element;
jest.mock('../../../src/constants/utility.js', () => ({
    sendDataToIframe: jest.fn(),
    hasReviewerRole: jest.fn()
}))
jest.mock('../../../src/component/TcmSnapshots/TcmSnapshots_Utility.js', () => ({
    tcmSnapshotsForUpdate: jest.fn()
}))
let cb = new stub();
jest.setTimeout(10000);

describe('Tests ElementContainer Actions - Update helper methods', () => {
    let initialState = {
        slateLevelData: slateLevelData,
        appStore: {
            slateLevelData: slateLevelData.slateLevelData,
            oldFiguredata: null
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
            numberOfRows: 25,
        },
        glossaryFootnoteReducer: {
            glossaryFootnoteValue: { elementWorkId: "4343653" },
            glossaryFootNoteCurrentValue: "",
            elementIndex: ""
        },
        tcmReducer:{
            tcmSnapshot:[{
                elemURN : "urn:pearson:work:123"
            }]
        },
        assetPopOverSearch: { assetID: "urn:pearson:work:23454423342" }
    };

    let initialState2 = {
        slateLevelData: slateWithCitationElement,
        appStore: {
            slateLevelData: slateWithCitationElement.slateLevelData,
            oldFiguredata: null
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
            numberOfRows: 25,
        },
        glossaryFootnoteReducer: {
            glossaryFootnoteValue: { elementWorkId: "4343653" },
            glossaryFootNoteCurrentValue: "",
            elementIndex: ""
        },
        tcmReducer:{
            tcmSnapshot:[{
                elemURN : "urn:pearson:work:123"
            }]
        },
        assetPopOverSearch: { assetID: "urn:pearson:work:23454423342" }
    };

    let asideData = {
        id: "urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0b",
        type: "element-aside"
    }
    let updatedData = {
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
        "comments": false,
        "tcm": true,
        "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
        "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
    }
    let parentElement = {
        "id": "urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0b",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "type": "element-aside",
        "subtype": "sidebar",
        "designtype": "asideSidebar02",
        "elementdata": {
            "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
            "frontmatter": [],
            "bodymatter": [
                {
                    "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0d",
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
                    "comments": false,
                    "tcm": true,
                    "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                    "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                },
                {
                    "id": "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                    "type": "showhide",
                    "subtype": "",
                    "designtype": "",
                    "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                    "contentUrn": "urn:pearson:entity:62008570-5ab8-4f2f-8ce1-e48ae80bc714",
                    "versionUrn": "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                    "interactivedata": {
                        "postertextobject": [
                            {
                                "type": "element-authoredtext",
                                "contentUrn": "urn:pearson:entity:5e36e9b2-08f6-4841-bb2f-1beb08f28905",
                                "id": "urn:pearson:work:305cc470-3d3e-45f8-ae5d-4b10eff07e8f"
                            }
                        ],
                        "show": [
                            {
                                "type": "element-authoredtext",
                                "id": "urn:pearson:work:e4495bc8-7fd5-4d9c-bd4c-1a879ad34019"
                            }
                        ],
                        "hide": [
                            {
                                "type": "element-authoredtext",
                                "id": "urn:pearson:work:743ddeed-104e-44ad-8f11-affdcf1b2019"
                            }
                        ]
                    }
                }
            ],
            "backmatter": []
        },
        "contentUrn": "urn:pearson:entity:2b489c98-5e61-46d8-967c-6354b28e3679",
        "versionUrn": "urn:pearson:manifest:591b8d42-7966-4337-912d-0635e328dfb2"
    }
    describe("UpdateStoreInCanvas helper method", () => {
        it("Versioned element - updateNewVersionElementInStore", () => {
            let args = { 
                updatedData: {...updatedData, pageNumberRef: "1"}, 
                asideData,
                dispatch: jest.fn(),
                versionedData: {...updatedData, id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b"},
                elementIndex: "1-2-2",
                parentElement,
                fetchSlateData: jest.fn(),
                newslateData: slateLevelData,
                slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }

            const spyUpdateNewVersionElementInStore = jest.spyOn(updateHelpers, "updateNewVersionElementInStore")
            updateHelpers.updateNewVersionElementInStore(args)
            expect(spyUpdateNewVersionElementInStore).toHaveBeenCalled()
            spyUpdateNewVersionElementInStore.mockClear()
        })
        it("Versioned element - showhide - updateNewVersionElementInStore", () => {
            let store = mockStore(() => initialState);
            let args = { 
                updatedData, 
                asideData: null,
                dispatch: jest.fn(),
                versionedData: {...updatedData, id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b"},
                elementIndex: null,
                parentElement: {
                    "id": "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                    "type": "showhide",
                    "subtype": "",
                    "designtype": "",
                    "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                    "contentUrn": "urn:pearson:entity:62008570-5ab8-4f2f-8ce1-e48ae80bc714",
                    "versionUrn": "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                    "interactivedata": {
                        "postertextobject": [
                            {
                                "type": "element-authoredtext",
                                "contentUrn": "urn:pearson:entity:5e36e9b2-08f6-4841-bb2f-1beb08f28905",
                                "id": "urn:pearson:work:305cc470-3d3e-45f8-ae5d-4b10eff07e8f"
                            }
                        ],
                        "show": [
                            {
                                "type": "element-authoredtext",
                                "id": "urn:pearson:work:e4495bc8-7fd5-4d9c-bd4c-1a879ad34019"
                            }
                        ],
                        "hide": [
                            {
                                "type": "element-authoredtext",
                                "id": "urn:pearson:work:743ddeed-104e-44ad-8f11-affdcf1b2019"
                            }
                        ]
                    }
                },
                fetchSlateData: jest.fn(),
                newslateData: slateLevelData,
                slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }

            const spyUpdateNewVersionElementInStore = jest.spyOn(updateHelpers, "updateNewVersionElementInStore")
            updateHelpers.updateNewVersionElementInStore(args)
            expect(spyUpdateNewVersionElementInStore).toHaveBeenCalled()
            spyUpdateNewVersionElementInStore.mockClear()
        })
        it("Versioned element - paragraph - updateNewVersionElementInStore", () => {
            let args = { 
                updatedData, 
                asideData: null,
                dispatch: jest.fn(),
                versionedData: {...updatedData, id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b"},
                elementIndex: 0,
                parentElement: updatedData,
                fetchSlateData: jest.fn(),
                newslateData: slateLevelData.slateLevelData,
                slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }

            const spyUpdateNewVersionElementInStore = jest.spyOn(updateHelpers, "updateNewVersionElementInStore")
            updateHelpers.updateNewVersionElementInStore(args)
            expect(spyUpdateNewVersionElementInStore).toHaveBeenCalled()
            spyUpdateNewVersionElementInStore.mockClear()
        })
        it("updateElementInStore - paragraph element ", () => {
            let store = mockStore(() => initialState);
            let args = { 
                updatedData,
                asideData,
                parentUrn: null,
                elementIndex: 0,
                showHideType: null,
                parentElement,
                dispatch: store.dispatch,
                newslateData: slateLevelData.slateLevelData,
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("Versioned element - popup - updateNewVersionElementInStore", () => {
            let args = { 
                updatedData: {
                    "id": "urn:pearson:work:8a81206d-2fa2-4f62-a012-2b516dcebb75",
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
                    "comments": false,
                    "tcm": true,
                    "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                    "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                    "slateUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
                    "elementParentEntityUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                    "metaDataField" : "formattedTitle" 
                }, 
                asideData: null,
                dispatch: jest.fn(),
                versionedData: {...updatedData, id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b"},
                elementIndex: 0,
                parentElement: {
                    "id": "urn:pearson:manifest:98e4bdcc-9aa2-44c9-821e-1e5a0962578f",
                    "type": "popup",
                    "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/popup",
                    "contentUrn": "urn:pearson:entity:08e45ea5-03fe-42d9-9fd8-be02cab7c244",
                    "versionUrn": "urn:pearson:manifest:98e4bdcc-9aa2-44c9-821e-1e5a0962578f",
                    "popupdata": {
                        "postertextobject": {

                        },
                        "formatted-title": {
                            "id": "urn:pearson:work:8a81206d-2fa2-4f62-a012-2b516dcebb75",
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
                            "comments": false,
                            "tcm": true,
                            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                            "slateUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
                        },
                        "formatted-subtitle": {}

                    }
                },
                fetchSlateData: jest.fn(),
                newslateData: slateLevelData.slateLevelData,
                slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }

            const spyUpdateNewVersionElementInStore = jest.spyOn(updateHelpers, "updateNewVersionElementInStore")
            updateHelpers.updateNewVersionElementInStore(args)
            expect(spyUpdateNewVersionElementInStore).toHaveBeenCalled()
            spyUpdateNewVersionElementInStore.mockClear()
        })
        it("updateElementInStore - citation element ", () => {
            let store = mockStore(() => initialState2);
            let args = { 
                updatedData: {
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
                    "versionUrn": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635",
                    "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
                },
                asideData,
                parentUrn: null,
                elementIndex: '0-1',
                showHideType: null,
                parentElement: { "type": "citations" },
                dispatch: store.dispatch,
                newslateData: slateWithCitationElement.slateLevelData,
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateWithCitationElement.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - paragraph inside citation group", () => {
            let store = mockStore(() => initialState2);
            let args = { 
                updatedData: {
                    "id": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635",
                    "type": "element-authoredtext",
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
                        "text":`<p class="paragraphNumeroUno" data-contenturn="urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4d" data-versionurn="urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635">Allport, G. W., &amp; Odbert, H. S. (1936). Trait names: A psycho-lexical study. <em>Psychological Monographs,</em> 47(211). The CITE classes for the containing the WiP's "element-citation" content should be decided based on the context of usage as described below. It follows the same logic as when paragraphNumeroUno and paragraphNummerEins. If the citation grouping.</p>`
                    },
                    "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4d",
                    "versionUrn": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635",
                    "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
                },
                asideData,
                parentUrn: null,
                elementIndex: 0,
                showHideType: null,
                parentElement: { "type": "citations" },
                dispatch: store.dispatch,
                newslateData: slateWithCitationElement.slateLevelData,
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateWithCitationElement.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - Multi-column", () => {
            let store = mockStore(() => initialState2);
            let args = { 
                updatedData: {
                    "id": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635",
                    "type": "element-authoredtext",
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
                        "text":`<p class="paragraphNumeroUno" data-contenturn="urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4d" data-versionurn="urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635">Allport, G. W., &amp; Odbert, H. S. (1936). Trait names: A psycho-lexical study. <em>Psychological Monographs,</em> 47(211). The CITE classes for the containing the WiP's "element-citation" content should be decided based on the context of usage as described below. It follows the same logic as when paragraphNumeroUno and paragraphNummerEins. If the citation grouping.</p>`
                    },
                    "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4d",
                    "versionUrn": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635",
                    "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
                },
                asideData,
                parentUrn: null,
                elementIndex: "1-0-0",
                showHideType: null,
                parentElement: multiColumnContainer,
                dispatch: store.dispatch,
                newslateData: slateWithCitationElement.slateLevelData,
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateWithCitationElement.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - showhide inside aside element ", () => {
            let store = mockStore(() => initialState);
            let updatedDataAsideShowhide = {
                "id": "urn:pearson:work:e4495bc8-7fd5-4d9c-bd4c-1a879ad34019",
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
                "comments": false,
                "tcm": true,
                "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let args = { 
                updatedData: updatedDataAsideShowhide,
                asideData,
                parentUrn: null,
                elementIndex: 0,
                showHideType: "show",
                parentElement,
                dispatch: store.dispatch,
                newslateData: slateLevelData.slateLevelData,
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - showhide inside Worked example ", () => {
            let store = mockStore(() => initialState);
            let updatedDataAsideShowhide = {
                "id": "urn:pearson:work:e4495bc8-7fd5-4d9c-bd4c-1a879ad34018",
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
                "comments": false,
                "tcm": true,
                "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let args = { 
                updatedData: updatedDataAsideShowhide,
                asideData: { id: "urn:pearson:manifest:c047b586-c963-47b7-bc59-9ec595c2c6ec", type : 'element-aside' },
                parentUrn: {
                    manifestUrn: "urn:pearson:manifest:f0c610b8-337d-47b0-9680-83b73481289c"
                },
                elementIndex: 0,
                showHideType: "show",
                parentElement: null,
                dispatch: store.dispatch,
                newslateData: slateLevelData.slateLevelData,
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - showhide element", () => {
            const store = mockStore(() => initialState);
            const showHidePara = {
                ...updatedData,
                "id": "urn:pearson:work:e4495bc8-7fd5-4d9c-bd4c-1a879ad34019"
            }
            const parentShowhide = {
                "id": "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                "type": "showhide",
                "subtype": "",
                "designtype": "",
                "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                "contentUrn": "urn:pearson:entity:62008570-5ab8-4f2f-8ce1-e48ae80bc714",
                "versionUrn": "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                "interactivedata": {
                    "postertextobject": [
                        {
                            "type": "element-authoredtext",
                            "contentUrn": "urn:pearson:entity:5e36e9b2-08f6-4841-bb2f-1beb08f28905",
                            "id": "urn:pearson:work:305cc470-3d3e-45f8-ae5d-4b10eff07e8f"
                        }
                    ],
                    "show": [
                        {
                            "type": "element-authoredtext",
                            "id": "urn:pearson:work:e4495bc8-7fd5-4d9c-bd4c-1a879ad34019"
                        }
                    ],
                    "hide": [
                        {
                            "type": "element-authoredtext",
                            "id": "urn:pearson:work:743ddeed-104e-44ad-8f11-affdcf1b2019"
                        }
                    ]
                }
            }
            const args = { 
                updatedData: showHidePara,
                asideData: null,
                parentUrn: null,
                elementIndex: 0,
                showHideType: "show",
                parentElement: parentShowhide,
                dispatch: store.dispatch,
                newslateData: slateLevelData.slateLevelData,
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("updateStore - approved element case", () => {
            const store = mockStore(() => initialState);
            
            const args = { 
                updatedData,
                elementIndex: 0,
                parentUrn: null,
                asideData,
                showHideType: null,
                parentElement,
                currentSlateData: slateLevelData.slateLevelData["urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"],
                responseData: { ...updatedData, id: "urn:pearson:work:e4495bc8-7fd5-4d9c-bd4c-1a879ad34019"},
                fetchSlateData: jest.fn(),
                getState: store.getState,
                dispatch: store.dispatch,
            }
            const spyupdateStore = jest.spyOn(updateHelpers, "updateStore")
            updateHelpers.updateStore(args)
            expect(spyupdateStore).toHaveBeenCalled()
            expect(spyupdateStore).toHaveReturnedWith(false);
            spyupdateStore.mockClear()
        })
        it("updateStore - approved popup slate", () => {
            const store = mockStore(() => initialState);
            const args = { 
                updatedData,
                elementIndex: 0,
                parentUrn: null,
                asideData,
                showHideType: null,
                parentElement,
                currentSlateData: slateLevelData.slateLevelData["urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"],
                responseData: { ...updatedData, id: "urn:pearson:work:e4495bc8-7fd5-4d9c-bd4c-1a879ad34019"},
                fetchSlateData: jest.fn(),
                getState: store.getState,
                dispatch: jest.fn(),
            }
            args.currentSlateData.type = "popup"
            args.currentSlateData.status = "approved"
            config.tcmStatus = true
            const spyupdateStore = jest.spyOn(updateHelpers, "updateStore")
            updateHelpers.updateStore(args)
            expect(spyupdateStore).toHaveBeenCalled()
            expect(spyupdateStore).toHaveReturnedWith(false);
            spyupdateStore.mockClear()
        })
        it("updateStore - showhide postertext update", () => {
            const store = mockStore(() => initialState);
            const args = { 
                updatedData,
                elementIndex: 0,
                parentUrn: null,
                asideData,
                showHideType: "postertextobject",
                parentElement,
                currentSlateData: slateLevelData.slateLevelData["urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"],
                responseData: { ...updatedData },
                fetchSlateData: jest.fn(),
                getState: store.getState,
                dispatch: jest.fn(),
            }
            const spyupdateStore = jest.spyOn(updateHelpers, "updateStore")
            updateHelpers.updateStore(args)
            expect(spyupdateStore).toHaveBeenCalled()
            expect(spyupdateStore).toHaveReturnedWith(false);
            spyupdateStore.mockClear()
        })
    })
    describe("TCM helper methods", () => {
        config.isCreateGlossary = false
        it("collectDataAndPrepareTCMSnapshot ", async () => {
            let store = mockStore(() => initialState);
            let args = {
                getState: store.getState,
                dispatch: store.dispatch,
                updatedData,
                responseData: updatedData,
                currentSlateData: slateLevelData.slateLevelData["urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"],
                asideData,
                parentUrn: null,
                poetryData: null,
                updateBodymatter: slateLevelData.slateLevelData["urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"].contents.bodymatter,
                showHideType: undefined,
                currentParentData: parentElement,
                elementIndex: null,
                parentElement,
                fetchSlateData: null,
                newslateData: slateLevelData,
                slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }

            const spycollectDataAndPrepareTCMSnapshot = jest.spyOn(updateHelpers, "collectDataAndPrepareTCMSnapshot")
            updateHelpers.collectDataAndPrepareTCMSnapshot(args)
            expect(spycollectDataAndPrepareTCMSnapshot).toHaveBeenCalled()
            spycollectDataAndPrepareTCMSnapshot.mockClear()
        })
        it("prepareDataForUpdateTcm ", async () => {
            let store = mockStore(() => initialState);
            let args = {
                updatedDataID: "urn:pearson:work:123",
                getState: store.getState,
                dispatch: store.dispatch,
                updatedData,
                versionedData: null,
            }

            const spyprepareDataForUpdateTcm = jest.spyOn(updateHelpers, "prepareDataForUpdateTcm")
            updateHelpers.prepareDataForUpdateTcm(args)
            expect(spyprepareDataForUpdateTcm).toHaveBeenCalled()
            spyprepareDataForUpdateTcm.mockClear()
        }) 
    })
    describe("Other helper methods", () => {
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
        it("processAndStoreUpdatedResponse - versioning", async () => {
            let store = mockStore(() => initialState);
            let args = {
                getState: store.getState,
                dispatch: store.dispatch,
                updatedData,
                responseData: { ...updatedData, id: "urn:pearson:work:d9023151-3417-4482-8175-fc965466224c" },
                asideData,
                parentUrn: null,
                poetryData: null,
                updateBodymatter: slateLevelData.slateLevelData[config.slateManifestURN].contents.bodymatter,
                showHideType: undefined,
                elementIndex: null,
                parentElement,
                fetchSlateData: jest.fn(),
            }
            config.isSavingElement = true
            const spyprocessAndStoreUpdatedResponse = jest.spyOn(updateHelpers, "processAndStoreUpdatedResponse")
            updateHelpers.processAndStoreUpdatedResponse(args)
            expect(spyprocessAndStoreUpdatedResponse).toHaveBeenCalled()
            spyprocessAndStoreUpdatedResponse.mockClear()
        })
        it("processAndStoreUpdatedResponse - non versioning", async () => {
            let store = mockStore(() => initialState);
            let args = {
                getState: store.getState,
                dispatch: store.dispatch,
                updatedData,
                responseData: updatedData,
                asideData,
                parentUrn: null,
                poetryData: null,
                updateBodymatter: slateLevelData.slateLevelData[config.slateManifestURN].contents.bodymatter,
                showHideType: undefined,
                elementIndex: null,
                parentElement,
                fetchSlateData: jest.fn(),
            }
            config.isSavingElement = true
            const spyprocessAndStoreUpdatedResponse = jest.spyOn(updateHelpers, "processAndStoreUpdatedResponse")
            updateHelpers.processAndStoreUpdatedResponse(args)
            expect(spyprocessAndStoreUpdatedResponse).toHaveBeenCalled()
            spyprocessAndStoreUpdatedResponse.mockClear()
        })
        it("showLinkToast", () => {
            const toastNode = {
                style : {
                    display: "none"
                },
                innerText: "test"
            }
            const spyshowLinkToast = jest.spyOn(updateHelpers, "showLinkToast")
            updateHelpers.showLinkToast(toastNode)
            expect(spyshowLinkToast).toHaveBeenCalled()
            expect(toastNode.style.display).toEqual("block")
            spyshowLinkToast.mockClear()
        })
        it("updateLOInStore", async () => {
            let store = mockStore(() => initialState);
            let args = {
                getState: store.getState,
                dispatch: store.dispatch,
                updatedData: {
                    loIndex: [0,1]
                },
                versionedData: {
                    metaDataAnchorID: ["2", "3"]
                }
            }
            const spyupdateLOInStore = jest.spyOn(updateHelpers, "updateLOInStore")
            updateHelpers.updateLOInStore(args)
            expect(spyupdateLOInStore).toHaveBeenCalled()
            spyupdateLOInStore.mockClear()
        })
         
    })
})