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
import metadataTestData from '../../../fixtures/ElementMetadataAnchorTestData';
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
        assetPopOverSearch: { assetID: "urn:pearson:work:23454423342" },
        assessmentReducer: {
            saveAutoUpdateData : {
                newAssessmentId: "urn:pearson:work:23454423342",
                oldAssessmentId: "urn:pearson:work:23454424325"
            }
        }
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
        it("updateElementInStore - paragraph element inside aside", () => {
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
        it("updateElementInStore - paragraph element in a slate", () => {

            const elementToUpdate = {
                "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
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
                "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let store = mockStore(() => initialState);
            let args = { 
                updatedData: elementToUpdate,
                asideData: null,
                parentUrn: null,
                elementIndex: 2,
                showHideType: null,
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
        it("updateElementInStore - opener element in a slate", () => {
            
            const elementToUpdate = { 
                "id": "urn:pearson:work:10061bb1-bf07-4406-ab1e-33545422d117", 
                "type": "openerelement", 
                "schema": "http://schemas.pearson.com/wip-authoring/openerelement/1", 
                "title": { 
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": ""
                }, 
                "versionUrn": "urn:pearson:work:10061bb1-bf07-4406-ab1e-33545422d117", 
                "contentUrn": "urn:pearson:entity:7b224cc4-7f41-4dfe-ba8a-8ced858e83c7", 
                "backgroundcolor": "#005A70", 
                "backgroundimage": { 
                    "path": "", 
                    "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                    "imageid": "" 
                }, 
                "status": "wip", 
                "textcolor": "option1",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let store = mockStore(() => initialState);
            let args = { 
                updatedData: elementToUpdate,
                asideData: null,
                parentUrn: null,
                elementIndex: 2,
                showHideType: null,
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
        it("updateElementInStore - paragraph inside aside element ", () => {
            let store = mockStore(() => initialState);
            let updatedDataAsideShowhide = {
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
                "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0d",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let args = { 
                updatedData: updatedDataAsideShowhide,
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
        it("updateElementInStore - popup formatted title inside aside element ", () => {
            let store = mockStore(() => initialState);
            let updatedDataAsideShowhide = {
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
                "versionUrn": "urn:pearson:work:8a81206d-2fa2-4f62-a012-2b516dcebb75",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let args = { 
                updatedData: updatedDataAsideShowhide,
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
        it("updateElementInStore - popup posterText object inside aside element ", () => {
            let store = mockStore(() => initialState);
            let updatedDataAsideShowhide = {
                "id": "urn:pearson:work:8a81206d-2fa2-4f62-a012-2b516dcebb7512",
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
                "versionUrn": "urn:pearson:work:01e6b4a6-efb5-4f0b-b0e7-cdb47a84e4eb",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let args = { 
                updatedData: updatedDataAsideShowhide,
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
        it("updateElementInStore - paragraph inside Worked example ", () => {
            let store = mockStore(() => initialState);
            let updatedDataAsideShowhide = {
                "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b",
                "type": "element-authoredtext",
                "subtype": "",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": "asdfasdfasdf"
                },
                "headers": [
                    {
                        "charStart": 0,
                        "charEnd": -1,
                        "level": 4
                    }
                ],
                "html": {
                    "text": "<h5 class=\"heading5NummerEins\">Heading 5</h5>"
                },
                "comments": true,
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
        it("updateElementInStore - popup postertext inside Worked example ", () => {
            let store = mockStore(() => initialState);
            let updatedDataAsideShowhide = {
                "id": "urn:pearson:work:8a81206d-2fa2-4f62-a012-2b516dcebb79",
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
                "versionUrn": "urn:pearson:work:8a81206d-2fa2-4f62-a012-2b516dcebb79",
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
        it("updateElementInStore - popup formatted title inside Worked example ", () => {
            let store = mockStore(() => initialState);
            let updatedDataAsideShowhide = {
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
        it("updateElementInStore - popup formatted-title element in a slate", () => {

            const elementToUpdate = {
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
                "versionUrn": "urn:pearson:work:8a81206d-2fa2-4f62-a012-2b516dcebb75",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let store = mockStore(() => initialState);
            let args = { 
                updatedData: elementToUpdate,
                asideData: null,
                parentUrn: null,
                elementIndex: 2,
                showHideType: null,
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
        it("updateElementInStore - popup postertext element in a slate", () => {
            const elementToUpdate = {
                "id": "urn:pearson:work:8a81206d-2fa2-4f62-a012-2b516dcebb7512",
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
                "versionUrn": "urn:pearson:work:01e6b4a6-efb5-4f0b-b0e7-cdb47a84e4eb",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let store = mockStore(() => initialState);
            let args = { 
                updatedData: elementToUpdate,
                asideData: null,
                parentUrn: null,
                elementIndex: 2,
                showHideType: null,
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
        it("updateElementInStore - poetry formatted title element in a slate", () => {
            const elementToUpdate = {
                "id": "urn:pearson:work:e1b59ae0-b04a-4b6e-a1a4-33e21073g5w4",
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
                "versionUrn": "urn:pearson:work:e1b59ae0-b04a-4b6e-a1a4-33e21073g5w4",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let store = mockStore(() => initialState);
            let args = { 
                updatedData: elementToUpdate,
                asideData: null,
                parentUrn: null,
                elementIndex: 2,
                showHideType: null,
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
        it("updateElementInStore - poetry creditsarray element in a slate", () => {
            const elementToUpdate = {
                "id": "urn:pearson:work:e1b59ae0-b04a-4b6e-a1a4-33e21073go6t",
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
                "versionUrn": "urn:pearson:work:e1b59ae0-b04a-4b6e-a1a4-33e21073go6t",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let store = mockStore(() => initialState);
            let args = { 
                updatedData: elementToUpdate,
                asideData: null,
                parentUrn: null,
                elementIndex: 2,
                showHideType: null,
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
        it("updateElementInStore - poetry stanza element in a slate", () => {
            const elementToUpdate = {
                "id": "urn:pearson:work:e1b59ae0-b04a-4b6e-a1a4-33e21077u97",
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
                "versionUrn": "urn:pearson:work:e1b59ae0-b04a-4b6e-a1a4-33e21077u97",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let store = mockStore(() => initialState);
            let args = { 
                updatedData: elementToUpdate,
                asideData: null,
                parentUrn: null,
                elementIndex: 2,
                showHideType: null,
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
        xit("processAndStoreUpdatedResponse - versioning", async () => {
            let store = mockStore(() => initialState);
            let args = {
                getState: store.getState,
                dispatch: jest.fn(),
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
        xit("processAndStoreUpdatedResponse - non versioning", async () => {
            let store = mockStore(() => initialState);
            let args = {
                getState: store.getState,
                dispatch: jest.fn(),
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
        
    })

    describe("LO update methods", () => {
        config.slateManifestURN = "urn:pearson:manifest:8f33291d-4b57-4fab-b890-68aa46a117bd";
        let initialState3 = {
            appStore: {
                slateLevelData: metadataTestData.slateLevelData_1_MainSlate,
                oldFiguredata: null
            },
        };
        let reqPayload = {
            loData: [
                {
                    "elementdata": {
                        "loref": "urn:pearson:educationalgoal:f77c17cd-461a-447a-a592-b333eea0109f"
                    },
                    "metaDataAnchorID": ["urn:pearson:work:4d966e5e-bf9a-4672-952b-06e354796f95"],
                    "elementVersionType": "element-learningobjectivemapping",
                    "loIndex": [0]
                },
                {
                    "elementdata": {
                        "loref": "urn:pearson:educationalgoal:59169f05-96cd-4f83-acb9-fde0a6d89528"
                    },
                    "metaDataAnchorID": ["urn:pearson:work:13c99072-413a-4d59-85a2-3f4f4dce3b80"],
                    "elementVersionType": "element-learningobjectivemapping",
                    "loIndex": ["1-0"]
                },
                {
                    "elementdata": {
                        "loref": "urn:pearson:educationalgoal:ada3bee3-2e41-4c74-8817-509842cbc8b7"
                    },
                    "metaDataAnchorID": ["urn:pearson:work:77c5d6c0-fd0c-4e27-a94b-e2f39e3b743d"],
                    "elementVersionType": "element-learningobjectivemapping",
                    "loIndex": ["1-2-0"]
                }
            ],
            slateVersionUrn: "urn:pearson:manifest:8f33291d-4b57-4fab-b890-68aa46a117bd",
            projectUrn: "urn:dURN"
        }
        it("UpdateStoreInCanvas - updateLOInCanvasStore", async () => {
            let store = mockStore(() => initialState3);

            const spyupdateLOInStore = jest.spyOn(updateHelpers, "updateStoreInCanvas")
            updateHelpers.updateStoreInCanvas({
                updatedData: reqPayload, getState: store.getState,
                dispatch: store.dispatch,
            })
            expect(spyupdateLOInStore).toHaveBeenCalled()
            spyupdateLOInStore.mockClear()
        })
        it("Test updateMetadataAnchorLOsinStore - updateLOInStore", async () => {
            let store = mockStore(() => initialState3);
            let responseData = {
                loData: [
                    {
                        "elementdata": {
                            "loref": "urn:pearson:educationalgoal:f77c17cd-461a-447a-a592-b333eea0109f"
                        },
                        "metaDataAnchorID": ["urn:pearson:work:4d966e5e-bf9a-4672-952b-06e354796f96"],
                        "loIndex": [0]
                    },
                    {
                        "elementdata": {
                            "loref": "urn:pearson:educationalgoal:59169f05-96cd-4f83-acb9-fde0a6d89528"
                        },
                        "metaDataAnchorID": ["urn:pearson:work:13c99072-413a-4d59-85a2-3f4f4dce3b81"],
                        "loIndex": ["1-0"]
                    },
                    {
                        "elementdata": {
                            "loref": "urn:pearson:educationalgoal:ada3bee3-2e41-4c74-8817-509842cbc8b7"
                        },
                        "metaDataAnchorID": ["urn:pearson:work:77c5d6c0-fd0c-4e27-a94b-e2f39e3b743e"],
                        "loIndex": ["1-2-0"]
                    }
                ]
            }
            const spyupdateLOInStore = jest.spyOn(updateHelpers, "updateMetadataAnchorLOsinStore")
            updateHelpers.updateMetadataAnchorLOsinStore({
                updatedData: reqPayload,
                responseData: responseData,
                getState: store.getState,
                dispatch: store.dispatch,
                currentSlateData: {
                    ...metadataTestData.slateLevelData_1_MainSlate["urn:pearson:manifest:8f33291d-4b57-4fab-b890-68aa46a117bd"],
                    status: "wip"
                }
            })
            expect(spyupdateLOInStore).toHaveBeenCalled()
            spyupdateLOInStore.mockClear()
        })
         
    })
})