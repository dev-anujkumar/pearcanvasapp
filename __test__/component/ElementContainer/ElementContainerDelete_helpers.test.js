import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as deleteHelpers from '../../../src/component/ElementContainer/ElementContainerDelete_helpers';
import config from '../../../src/config/config.js';
import { stub } from 'sinon';
import { slateLevelData, slateLevelDataWithApproved } from "../../../fixtures/containerActionsTestingData"
import { JSDOM } from 'jsdom'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
global.document = (new JSDOM()).window.Element;
jest.mock('../../../src/constants/utility.js', () => ({
    sendDataToIframe: jest.fn(),
    hasReviewerRole: jest.fn()
}))
jest.mock('../../../src/component/TcmSnapshots/TcmSnapshots_Utility.js', () => ({
    tcmSnapshotsForUpdate: jest.fn(),
    checkContainerElementVersion: jest.fn()
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
        slateLevelData: slateLevelDataWithApproved,
        appStore: {
            slateLevelData: slateLevelDataWithApproved.slateLevelData,
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
    config.tcmStatus = true
    config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
    it("onDeleteSuccess ", () => {
        let store = mockStore(() => initialState);
        let args = { 
            getState: store.getState,
            asideData: null,
            dispatch: jest.fn(),
            fetchSlateData: jest.fn(),
            elmId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
            type: "paragraph",
            parentUrn: null,
            contentUrn: null,
            index: 3,
            poetryData: null
        }

        const spyonDeleteSuccess = jest.spyOn(deleteHelpers, "onDeleteSuccess")
        deleteHelpers.onDeleteSuccess(args)
        expect(spyonDeleteSuccess).toHaveBeenCalled()
        spyonDeleteSuccess.mockClear()
    })
    it("onDeleteSuccess - approved slate", () => {
        let store = mockStore(() => initialState2);
        let args = { 
            getState: store.getState,
            asideData: null,
            dispatch: jest.fn(),
            fetchSlateData: jest.fn(),
            elmId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
            type: "paragraph",
            parentUrn: null,
            contentUrn: null,
            index: 3,
            poetryData: null
        }

        const spyonDeleteSuccess = jest.spyOn(deleteHelpers, "onDeleteSuccess")
        deleteHelpers.onDeleteSuccess(args)
        expect(spyonDeleteSuccess).toHaveBeenCalled()
        spyonDeleteSuccess.mockClear()
    })
    it("deleteFromStore - inside aside ", () => {
        
        let args = { 
            asideData: null,
            dispatch: jest.fn(),
            elmId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0d",
            parentUrn: { elementType : "element-aside", manifestUrn: "urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0b" },
            index: 3,
            poetryData: null,
            newParentData: slateLevelData.slateLevelData
        }
        
        const spydeleteFromStore = jest.spyOn(deleteHelpers, "deleteFromStore")
        deleteHelpers.deleteFromStore(args)
        expect(spydeleteFromStore).toHaveBeenCalled()
        spydeleteFromStore.mockClear()
    })
    it("deleteFromStore - inside poetry ", () => {
        
        let args = { 
            asideData: null,
            dispatch: jest.fn(),
            elmId: "urn:pearson:entity:44d43f1b-3bdf-4386-a06c-bfa779f28hh5:f2f5300e-34fa-4d87-82c1-29e33bf5fu67",
            parentUrn: null,
            index: 3,
            poetryData: { type: 'poetry', parentUrn: "urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f28540" },
            newParentData: slateLevelData.slateLevelData
        }
        
        const spydeleteFromStore = jest.spyOn(deleteHelpers, "deleteFromStore")
        deleteHelpers.deleteFromStore(args)
        expect(spydeleteFromStore).toHaveBeenCalled()
        spydeleteFromStore.mockClear()
    })
    it("deleteFromStore - inside Worked example ", () => {
        
        let args = { 
            asideData: { id: "urn:pearson:manifest:c047b586-c963-47b7-bc59-9ec595c2c6ec" },
            dispatch: jest.fn(),
            elmId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b",
            parentUrn: { elementType : "manifest", manifestUrn: "urn:pearson:manifest:f0c610b8-337d-47b0-9680-83b73481289c" },
            index: 3,
            poetryData: null,
            newParentData: slateLevelData.slateLevelData
        }
        
        const spydeleteFromStore = jest.spyOn(deleteHelpers, "deleteFromStore")
        deleteHelpers.deleteFromStore(args)
        expect(spydeleteFromStore).toHaveBeenCalled()
        spydeleteFromStore.mockClear()
    })
    it("deleteFromStore - inside Citation ", () => {
        
        let args = { 
            asideData: null,
            dispatch: jest.fn(),
            elmId: "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635",
            parentUrn: { elementType : "citations", manifestUrn: "urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e" },
            index: "0-1",
            poetryData: null,
            newParentData: slateLevelData.slateLevelData
        }
        
        const spydeleteFromStore = jest.spyOn(deleteHelpers, "deleteFromStore")
        deleteHelpers.deleteFromStore(args)
        expect(spydeleteFromStore).toHaveBeenCalled()
        spydeleteFromStore.mockClear()
    })
    describe("TCM helper methods", () => {
        it("tcmSnapshotsForDelete - normal element", async () => {
        
            let deleteData = {
                wipData: updatedData,
                currentParentData: slateLevelData.slateLevelData,
                bodymatter: slateLevelData.slateLevelData[config.slateManifestURN].contents.bodymatter,
                newVersionUrns: updatedData,
                index: "0"
            }
            
            const spytcmSnapshotsForDelete = jest.spyOn(deleteHelpers, "tcmSnapshotsForDelete")
            deleteHelpers.tcmSnapshotsForDelete(deleteData, "element-authoredtext", {})
            expect(spytcmSnapshotsForDelete).toHaveBeenCalled()
            spytcmSnapshotsForDelete.mockClear()
        })
        it("onSlateApproved", async () => {
            const currentSlateData = { type: "popup"},
                dispatch = jest.fn(),
                fetchSlateData = jest.fn();
            
            const spyonSlateApproved = jest.spyOn(deleteHelpers, "onSlateApproved")
            deleteHelpers.onSlateApproved(currentSlateData, dispatch, fetchSlateData)
            expect(spyonSlateApproved).toHaveBeenCalled()
            expect(spyonSlateApproved).toHaveReturnedWith(false)
            spyonSlateApproved.mockClear()
        })
    })
})