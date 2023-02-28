import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as deleteHelpers from '../../../src/component/ElementContainer/ElementContainerDelete_helpers';
import { delInsideWe } from '../../../src/component/ElementContainer/ElementContainerDelete_helpers';
import config from '../../../src/config/config.js';
import { stub } from 'sinon';
import { slateLevelData, slateLevelDataWithApproved, newslateShowhideData, showhidetestData, slateLevelData3, slateLevelData4, slateLevelData5, slateLevelData6, defaultSlateDataFigure, newTabSlate } from "../../../fixtures/containerActionsTestingData";
import { JSDOM } from 'jsdom'
import { mockAutoNumberReducerEmpty } from '../FigureHeader/AutoNumberApiTestData';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
global.document = (new JSDOM()).window.Element;
jest.mock('../../../src/constants/utility.js', () => ({
    sendDataToIframe: jest.fn(),
    hasReviewerRole: jest.fn(),
    replaceWirisClassAndAttr: jest.fn(),
    handleTinymceEditorPlugins: jest.fn(()=> 'lists advlist placeholder charmap paste image casechange' )
}))
jest.mock('../../../src/component/FigureHeader/AutoNumber_DeleteAndSwap_helpers.js', () => ({
    handleAutoNumberingOnDelete: jest.fn(),
    getContainerEntityUrn: jest.fn()
}))
jest.mock('../../../src/component/TcmSnapshots/TcmSnapshots_Utility.js', () => ({
    tcmSnapshotsForUpdate: jest.fn(),
    checkContainerElementVersion: jest.fn(),
    fetchElementWipData: jest.fn(),
    prepareSnapshots_ShowHide: jest.fn(),
    prepareTcmSnapshots: jest.fn()
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
        autoNumberReducer: mockAutoNumberReducerEmpty,
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
        assetPopOverSearch: { assetID: "urn:pearson:work:23454423342" },
        autoNumberReducer: mockAutoNumberReducerEmpty
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
            // newParentData: parentElement
            newParentData: slateLevelData.slateLevelData,
            getState: () => {
                return {
                    autoNumberReducer: mockAutoNumberReducerEmpty
                }
            }
        }
        
        const spydeleteFromStore = jest.spyOn(deleteHelpers, "deleteFromStore")
        deleteHelpers.deleteFromStore(args)
        expect(spydeleteFromStore).toHaveBeenCalled()
        spydeleteFromStore.mockClear()
    })
    it("deleteFromStore - inside aside#2 ", () => {
        let args = { 
            asideData: null,
            dispatch: jest.fn(),
            elmId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0d",
            parentUrn: { elementType : "random", manifestUrn: "urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0b" },
            index: 3,
            poetryData: null,
            // newParentData: parentElement
            newParentData: slateLevelData.slateLevelData,
            getState: () => {
                return {
                    autoNumberReducer: mockAutoNumberReducerEmpty
                }
            }
        }
        
        const spydeleteFromStore = jest.spyOn(deleteHelpers, "deleteFromStore")
        deleteHelpers.deleteFromStore(args)
        expect(spydeleteFromStore).toHaveBeenCalled()
        spydeleteFromStore.mockClear()
    })
    it("deleteFromStore - inside poetry#2 ", () => {
        
        let args = { 
            asideData: null,
            dispatch: jest.fn(),
            elmId: "urn:pearson:entity:44d43f1b-3bdf-4386-a06c-bfa779f28hh5:f2f5300e-34fa-4d87-82c1-29e33bf5fu67",
            parentUrn: null,
            index: 3,
            poetryData: { type: 'poetry', parentUrn: "urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f2854", parent: {id: "urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f28540"} },
            newParentData: slateLevelData.slateLevelData,
            getState: () => {
                return {
                    autoNumberReducer: mockAutoNumberReducerEmpty
                }
            }
        }
        
        const spydeleteFromStore = jest.spyOn(deleteHelpers, "deleteFromStore")
        deleteHelpers.deleteFromStore(args)
        expect(spydeleteFromStore).toHaveBeenCalled()
        spydeleteFromStore.mockClear()
    })
    it("deleteFromStore - inside poetry#3 ", () => {
        let args = { 
            asideData: null,
            dispatch: jest.fn(),
            elmId: "urn:pearson:entity:44d43f1b-3bdf-4386-a06c-bfa779f28hh5:f2f5300e-34fa-4d87-82c1-29e33bf5fu67",
            parentUrn: { elementType : "showhide" , id:"urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f28540"},
            index: 3,
            poetryData: { type: 'poetry', parentUrn: "urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f2854", parent: {id: "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02", showHideType:"show"}  },
            newParentData: showhidetestData,
            getState: () => {
                return {
                    autoNumberReducer: mockAutoNumberReducerEmpty
                }
            }
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
            newParentData: slateLevelData.slateLevelData,
            getState: () => {
                return {
                    autoNumberReducer: mockAutoNumberReducerEmpty
                }
            }
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
            newParentData: slateLevelData.slateLevelData,
            getState: () => {
                return {
                    autoNumberReducer: mockAutoNumberReducerEmpty
                }
            }
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
            newParentData: slateLevelData.slateLevelData,
            getState: () => {
                return {
                    autoNumberReducer: mockAutoNumberReducerEmpty
                }
            }
        }
        
        const spydeleteFromStore = jest.spyOn(deleteHelpers, "deleteFromStore")
        deleteHelpers.deleteFromStore(args)
        expect(spydeleteFromStore).toHaveBeenCalled()
        spydeleteFromStore.mockClear()
    })

    it("deleteFromStore - inside Aside/WE inside S/H", () => {
        let args = { 
            asideData: {
                contentUrn: "urn:pearson:entity:bda611d3-773d-4780-852b-efa14c18742f",
                element: {id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb", type: "element-aside", subtype: "workedexample", schema: "http://schemas.pearson.com/wip-authoring/element/1", designtype: "workedexample1"},
                id: "urn:pearson:manifest:11c71298-c804-48f1-a8cc-323d107ba1be",
                index: "12-0-0",
                parent: {id: "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02", type: "showhide", contentUrn: "urn:pearson:entity:62008570-5ab8-4f2f-8ce1-e48ae80bc714", showHideType: "show"},
                type: "element-aside",
                subtype: 'sidebar'
            },
            dispatch: jest.fn(),
            elmId: "urn:pearson:work:aca6096b-d0b6-4358-a2c7-313188665d23",
            parentUrn: { manifestUrn: "urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e" },
            index: "12-0-0",
            poetryData: null,
            newParentData: slateLevelData.slateLevelData,
            getState: () => {
                return {
                    autoNumberReducer: mockAutoNumberReducerEmpty
                }
            }
        }
        
        const spydeleteFromStore = jest.spyOn(deleteHelpers, "deleteFromStore")
        deleteHelpers.deleteFromStore(args)
        expect(spydeleteFromStore).toHaveBeenCalled()
        spydeleteFromStore.mockClear()
    })
    it("deleteFromStore - inside Citations inside S/H", () => {
        let args = { 
            asideData: {
                contentUrn: "urn:pearson:entity:bda611d3-773d-4780-852b-efa14c18742f",
                element: {id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb", type: "element-aside", subtype: "workedexample", schema: "http://schemas.pearson.com/wip-authoring/element/1", designtype: "workedexample1"},
                id: "urn:pearson:manifest:11c71298-c804-48f1-a8cc-323d107ba1be",
                index: "12-0-1-1",
                parent: {id: "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc13", type: "showhide", contentUrn: "urn:pearson:entity:62008570-5ab8-4f2f-8ce1-e48ae80bc714", showHideType: "show"},
                type: "citations",
                subtype: 'sidebar'
            },
            dispatch: jest.fn(),
            elmId: "urn:pearson:work:aca6096b-d0b6-4358-a2c7-313188665d23",
            parentUrn: { manifestUrn: "urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e", elementType: 'citations' },
            index: "12-0-1-1",
            poetryData: null,
            newParentData: slateLevelData.slateLevelData,
            getState: () => {
                return {
                    autoNumberReducer: mockAutoNumberReducerEmpty
                }
            }
        }
        
        const spydeleteFromStore = jest.spyOn(deleteHelpers, "deleteFromStore")
        deleteHelpers.deleteFromStore(args)
        expect(spydeleteFromStore).toHaveBeenCalled()
        spydeleteFromStore.mockClear()
    })

    it("deleteFromStore - inside S/H conditional coverage", () => {
        let args = { 
            asideData: {
                contentUrn: "urn:pearson:entity:bda611d3-773d-4780-852b-efa14c18742f",
                element: {id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb", type: "element-aside", subtype: "workedexample", schema: "http://schemas.pearson.com/wip-authoring/element/1", designtype: "workedexample1"},
                id: "urn:pearson:manifest:11c71298-c804-48f1-a8cc-323d107ba1be",
                index: "7-0-1",
                parent: {id: "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc13", type: "showhide", contentUrn: "urn:pearson:entity:62008570-5ab8-4f2f-8ce1-e48ae80bc714", showHideType: "show"},
                type: "showhide",
                subtype: 'sidebar'
            },
            dispatch: jest.fn(),
            getShowHideElement: jest.fn(() => {
                return newParentData.contents.bodymatter[5]
            }),
            elmId: "urn:pearson:work:aca6096b-d0b6-4358-a2c7-313188665d23",
            parentUrn: { manifestUrn: "urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e", elementType: 'citations' },
            index: "7-0-1",
            poetryData: null,
            newParentData: slateLevelData.slateLevelData,
            getState: () => {
                return {
                    autoNumberReducer: mockAutoNumberReducerEmpty
                }
            }
        }
        
        const spydeleteFromStore = jest.spyOn(deleteHelpers, "deleteFromStore")
        deleteHelpers.deleteFromStore(args)
        expect(spydeleteFromStore).toHaveBeenCalled()
        spydeleteFromStore.mockClear()
    })

    it("deleteFromStore - inside S/H conditional coverage", () => {
        let args = { 
            asideData: {
                contentUrn: "urn:pearson:entity:bda611d3-773d-4780-852b-efa14c18742f",
                element: {id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb", type: "element-aside", subtype: "workedexample", schema: "http://schemas.pearson.com/wip-authoring/element/1", designtype: "workedexample1"},
                id: "urn:pearson:manifest:11c71298-c804-48f1-a8cc-323d107ba1be",
                index: "11-0-1",
                parent: {id: "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc13", type: "showhide", contentUrn: "urn:pearson:entity:62008570-5ab8-4f2f-8ce1-e48ae80bc714", showHideType: "show"},
                type: "showhide",
                subtype: 'sidebar'
            },
            dispatch: jest.fn(),
            getShowHideElement: jest.fn(() => {
                return newParentData.contents.bodymatter[5]
            }),
            elmId: "urn:pearson:work:aca6096b-d0b6-4358-a2c7-313188665d23",
            parentUrn: { manifestUrn: "urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e", elementType: 'group' },
            index: "11-0-1",
            poetryData: null,
            newParentData: slateLevelData.slateLevelData,
            getState: () => {
                return {
                    autoNumberReducer: mockAutoNumberReducerEmpty
                }
            }
        }
        
        const spydeleteFromStore = jest.spyOn(deleteHelpers, "deleteFromStore")
        deleteHelpers.deleteFromStore(args)
        expect(spydeleteFromStore).toHaveBeenCalled()
        spydeleteFromStore.mockClear()
    })

    it("deleteFromStore - S/H inside multicolumn conditional coverage", () => {
        let args = { 
            asideData: {
                contentUrn: "urn:pearson:entity:bda611d3-773d-4780-852b-efa14c18742f",
                element: {id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb", type: "element-aside", subtype: "workedexample", schema: "http://schemas.pearson.com/wip-authoring/element/1", designtype: "workedexample1"},
                id: "urn:pearson:manifest:11c71298-c804-48f1-a8cc-323d107ba1be",
                index: "11-0-1",
                parent: {id: "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc13", type: "showhide", contentUrn: "urn:pearson:entity:62008570-5ab8-4f2f-8ce1-e48ae80bc714", showHideType: "show"},
                type: "sidebar",
                subtype: 'sidebar'
            },
            dispatch: jest.fn(),
            getShowHideElement: jest.fn(() => {
                return newParentData.contents.bodymatter[5]
            }),
            elmId: "urn:pearson:work:aca6096b-d0b6-4358-a2c7-313188665d23",
            parentUrn: { manifestUrn: "urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e", elementType: 'group' },
            index: "11-0-1",
            poetryData: null,
            newParentData: slateLevelData.slateLevelData,
            getState: () => {
                return {
                    autoNumberReducer: mockAutoNumberReducerEmpty
                }
            }
        }
        
        const spydeleteFromStore = jest.spyOn(deleteHelpers, "deleteFromStore")
        deleteHelpers.deleteFromStore(args)
        expect(spydeleteFromStore).toHaveBeenCalled()
        spydeleteFromStore.mockClear()
    })

    it("deleteFromStore - poetry on slate conditional coverage", () => {
        let args = { 
            dispatch: jest.fn(),
            elmId: "urn:pearson:work:e1b59ae0-b04a-4b6e-a1a4-33e21077u97",
            parentUrn: { },
            index: "13-0-1",
            poetryData: {type: 'poetry', parentUrn: 'urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f28540'},
            newParentData: slateLevelData.slateLevelData,
            getState: () => {
                return {
                    autoNumberReducer: mockAutoNumberReducerEmpty
                }
            }
        }
        
        const spydeleteFromStore = jest.spyOn(deleteHelpers, "deleteFromStore")
        deleteHelpers.deleteFromStore(args)
        expect(spydeleteFromStore).toHaveBeenCalled()
        spydeleteFromStore.mockClear()
    })

    it("deleteFromStore - poetry inside aside conditional coverage 1", () => {
        let args = { 
            asideData: null,
            dispatch: jest.fn(),
            elmId: "urn:pearson:entity:44d43f1b-3bdf",
            parentUrn: null,
            index: 3,
            poetryData: { type: 'poetry', parentUrn: "urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f28541", parent: {id: 'urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f28540'} },
            newParentData: slateLevelData.slateLevelData,
            getState: () => {
                return {
                    autoNumberReducer: mockAutoNumberReducerEmpty
                }
            }
        }
        
        const spydeleteFromStore = jest.spyOn(deleteHelpers, "deleteFromStore")
        deleteHelpers.deleteFromStore(args)
        expect(spydeleteFromStore).toHaveBeenCalled()
        spydeleteFromStore.mockClear()
    }
    )
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
        it("prepareTCMSnapshotsForDelete", () => {
            const args = {
                deleteParentData : slateLevelData.slateLevelData,
                type : "element-authoredtext",
                parentUrn : null,
                asideData : null,
                contentUrn : 'urn:pearson:work:11',
                index : 0,
                poetryData : null,
                cutCopyParentUrn : null,
                showHideObj : {},
                deleteElemData: {
                    versionUrn:"dfsfsdg"
                }
            }
           
            const spyprepareTCMSnapshotsForDelete = jest.spyOn(deleteHelpers, "prepareTCMSnapshotsForDelete")
            deleteHelpers.prepareTCMSnapshotsForDelete(args)
            expect(spyprepareTCMSnapshotsForDelete).toHaveBeenCalled()
            // expect(spyprepareTCMSnapshotsForDelete).toHaveReturnedWith(undefined)
            spyprepareTCMSnapshotsForDelete.mockClear()
        })
        
        it("prepareTCMSnapshotsForDelete for conditional coverage 1", () => {
            const args = {
                deleteParentData : slateLevelData.slateLevelData,
                type : "manifest",
                parentUrn : null,
                asideData : {type: 'showhide'},
                contentUrn : 'urn:pearson:work:11',
                index : 0,
                poetryData : null,
                cutCopyParentUrn : null,
                showHideObj: {
                    currentElement: {
                        type: 'element-aside'
                    }
                },
                deleteElemData: {
                    versionUrn:"dfsfsdg"
                }
            }
           
            const spyprepareTCMSnapshotsForDelete = jest.spyOn(deleteHelpers, "prepareTCMSnapshotsForDelete")
            deleteHelpers.prepareTCMSnapshotsForDelete(args)
            expect(spyprepareTCMSnapshotsForDelete).toHaveBeenCalled()
            // expect(spyprepareTCMSnapshotsForDelete).toHaveReturnedWith(undefined)
            spyprepareTCMSnapshotsForDelete.mockClear()
        })

        it("prepareTCMSnapshotsForDelete for conditional coverage 2", () => {
            const args = {
                deleteParentData : slateLevelData.slateLevelData,
                type : "manifest",
                parentUrn : null,
                asideData : {type: 'showhide'},
                contentUrn : 'urn:pearson:work:11',
                index : 7,
                poetryData : null,
                cutCopyParentUrn : null,
                showHideObj: {},
                deleteElemData: {
                    versionUrn:"dfsfsdg"
                }
            }
           
            const spyprepareTCMSnapshotsForDelete = jest.spyOn(deleteHelpers, "prepareTCMSnapshotsForDelete")
            deleteHelpers.prepareTCMSnapshotsForDelete(args)
            expect(spyprepareTCMSnapshotsForDelete).toHaveBeenCalled()
            // expect(spyprepareTCMSnapshotsForDelete).toHaveReturnedWith(undefined)
            spyprepareTCMSnapshotsForDelete.mockClear()
        })

        it("prepareTCMSnapshotsForDelete for conditional coverage 3", () => {
            const args = {
                deleteParentData : slateLevelData.slateLevelData,
                type : "manifest",
                parentUrn : null,
                asideData : {type: 'showhide', grandParent: {asideData: {type: 'groupedcontent'}}},
                contentUrn : 'urn:pearson:work:11',
                index : 7,
                poetryData : null,
                cutCopyParentUrn : null,
                showHideObj: {},
                cutCopyParentUrn : {id : 'urn:pearson:work:11' },
                deleteElemData: {
                    versionUrn:"dfsfsdg"
                }
            }
           
            const spyprepareTCMSnapshotsForDelete = jest.spyOn(deleteHelpers, "prepareTCMSnapshotsForDelete")
            deleteHelpers.prepareTCMSnapshotsForDelete(args)
            expect(spyprepareTCMSnapshotsForDelete).toHaveBeenCalled()
            // expect(spyprepareTCMSnapshotsForDelete).toHaveReturnedWith(undefined)
            spyprepareTCMSnapshotsForDelete.mockClear()
        })

        it("deleteBlockListElement - listdata", () => {
            const spydeleteBlockListElement = jest.spyOn(deleteHelpers, "deleteBlockListElement")
            const elementData = {
                listdata: {
                    bodymatter: [{ id: "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27634"}, {id: "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635"}]
                }
            }
            deleteHelpers.deleteBlockListElement("urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635", elementData)
            expect(spydeleteBlockListElement).toHaveBeenCalled()
            spydeleteBlockListElement.mockClear()
        })
        it("deleteBlockListElement - listitemdata", () => {
            const spydeleteBlockListElement = jest.spyOn(deleteHelpers, "deleteBlockListElement")
            const elementData = {
                listitemdata: {
                    bodymatter: [{ id: "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27634"}, {id: "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635"}]
                }
            }
            deleteHelpers.deleteBlockListElement("urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635", elementData)
            expect(spydeleteBlockListElement).toHaveBeenCalled()
            spydeleteBlockListElement.mockClear()
        })

        it("delInsideWE - delete element inside aside/WE conditional coverage", () => {
            let item = slateLevelData.slateLevelData["urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"].contents.bodymatter[3];
            let asideData = {id: 'urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0b'}
            let elmId = 'urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02';
            
            const spydelInsideWE = jest.spyOn(deleteHelpers, "delInsideWE");
            deleteHelpers.delInsideWE(item, asideData, {}, elmId);
            expect(spydelInsideWE).toHaveBeenCalled();
            spydelInsideWE.mockClear();
        })

        it("delInsideWE - delete manifest inside WE conditional coverage 1", () => {
            let item = slateLevelData.slateLevelData["urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"].contents.bodymatter[3];
            let parentUrn = {manifestUrn: 'urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0b'}
            let elmId = 'urn:pearson:manifest:5eefc529-e08d-4dca-9a10-a09f2959e340';
            
            const spydelInsideWE = jest.spyOn(deleteHelpers, "delInsideWE");
            deleteHelpers.delInsideWE(item, {}, parentUrn, elmId);
            expect(spydelInsideWE).toHaveBeenCalled();
            spydelInsideWE.mockClear();
        })

        it("tcmSnapshotsForDelete - conditional coverage 1", async () => {
            let deleteData = {
                wipData: {
                    figuretype: 'image-1'
                },
            }
            
            const spytcmSnapshotsForDelete = jest.spyOn(deleteHelpers, "tcmSnapshotsForDelete");
            deleteHelpers.tcmSnapshotsForDelete(deleteData, '', {});
            expect(spytcmSnapshotsForDelete).toHaveBeenCalled();
            spytcmSnapshotsForDelete.mockClear();
        })

        it("tcmSnapshotsForDelete - conditional coverage 2", async () => {
            let deleteData = {
                currentParentData: slateLevelData.slateLevelData
            }
            config.isPopupSlate = true;
            config.tempSlateManifestURN = 'urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e';
            const spytcmSnapshotsForDelete = jest.spyOn(deleteHelpers, "tcmSnapshotsForDelete");
            deleteHelpers.tcmSnapshotsForDelete(deleteData, '', {cutCopyParentUrn: {sourceSlateManifestUrn: 'urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'}});
            expect(spytcmSnapshotsForDelete).toHaveBeenCalled();
            spytcmSnapshotsForDelete.mockClear();
        })

        it("tcmSnapshotsForDelete - conditional coverage 3", async () => {
            let deleteData = {
                currentParentData: slateLevelData.slateLevelData,
                index: '0'
            }
            const spytcmSnapshotsForDelete = jest.spyOn(deleteHelpers, "tcmSnapshotsForDelete");
            deleteHelpers.tcmSnapshotsForDelete(deleteData, 'element-aside', {cutCopyParentUrn: {sourceSlateManifestUrn: 'urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'}}, 'delete');
            expect(spytcmSnapshotsForDelete).toHaveBeenCalled();
            spytcmSnapshotsForDelete.mockClear();
        })
    })
    describe("Delete BL in containers",()=>{
        it("delete From Store AS->BL",()=>{
            config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f"
            let args = { 
                asideData: {
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "id":"urn:pearson:manifest:3f2c33a4-7495-43e8-8c84-de18276a70ba",
                    "contentUrn":"urn:pearson:entity:cecbac6f-bd45-454b-9ba8-48b3d32fa988",
                    "element":{
                       "id":"urn:pearson:manifest:3f2c33a4-7495-43e8-8c84-de18276a70ba",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:3f2c33a4-7495-43e8-8c84-de18276a70ba",
                       "contentUrn":"urn:pearson:entity:cecbac6f-bd45-454b-9ba8-48b3d32fa988",
                       "status":"wip",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:583a4284-0ac8-4450-87cb-d7f857b3247b",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:583a4284-0ac8-4450-87cb-d7f857b3247b",
                                "contentUrn":"urn:pearson:entity:b7f3f633-9637-437a-8de5-8ed6749b5f5c",
                                "status":"wip",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:d648948d-0cda-4466-bb49-614868b0d67c",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text":"fsdfs fsfsfas fsafa"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">fsdfs fsfsfas fsafa</p>",
                                            "footnotes":{
                                               
                                            },
                                            "assetsPopover":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:d648948d-0cda-4466-bb49-614868b0d67c",
                                         "contentUrn":"urn:pearson:entity:725cd85b-ab41-4c4d-8e39-c28ce641b301"
                                      }
                                   ]
                                }
                             },
                             {
                                "id":"urn:pearson:manifest:5efd3bc0-f01d-4f3f-b5ca-86c96232b8da",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:5efd3bc0-f01d-4f3f-b5ca-86c96232b8da",
                                "contentUrn":"urn:pearson:entity:db9a8160-8016-45a5-a9f4-8d26dcb03b4f",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:eacbbe9c-733b-417b-87fe-6b4aa629e72c",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"dfsdffdfs"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">dfsdffdfs</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:eacbbe9c-733b-417b-87fe-6b4aa629e72c",
                                         "contentUrn":"urn:pearson:entity:488ddd79-916a-4931-beeb-e852d744d0a4",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0",
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
                       "fontstyle":"fontStyle1",
                       "parentDetails":[
                          "urn:pearson:entity:89fc57bb-d825-4112-80e8-02c2ce2508d0"
                       ]
                    },
                    "index":"0-1",
                    "parent":{
                       "id":"urn:pearson:manifest:30a40f4a-93fd-4507-b492-98f11c70e964",
                       "type":"element-aside",
                       "contentUrn":"urn:pearson:entity:89fc57bb-d825-4112-80e8-02c2ce2508d0"
                    },
                    "parentManifestList":{
                       "id":"urn:pearson:manifest:3f2c33a4-7495-43e8-8c84-de18276a70ba",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:3f2c33a4-7495-43e8-8c84-de18276a70ba",
                       "contentUrn":"urn:pearson:entity:cecbac6f-bd45-454b-9ba8-48b3d32fa988",
                       "status":"wip",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:583a4284-0ac8-4450-87cb-d7f857b3247b",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:583a4284-0ac8-4450-87cb-d7f857b3247b",
                                "contentUrn":"urn:pearson:entity:b7f3f633-9637-437a-8de5-8ed6749b5f5c",
                                "status":"wip",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:d648948d-0cda-4466-bb49-614868b0d67c",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text":"fsdfs fsfsfas fsafa"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">fsdfs fsfsfas fsafa</p>",
                                            "footnotes":{
                                               
                                            },
                                            "assetsPopover":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:d648948d-0cda-4466-bb49-614868b0d67c",
                                         "contentUrn":"urn:pearson:entity:725cd85b-ab41-4c4d-8e39-c28ce641b301"
                                      }
                                   ]
                                }
                             },
                             {
                                "id":"urn:pearson:manifest:5efd3bc0-f01d-4f3f-b5ca-86c96232b8da",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:5efd3bc0-f01d-4f3f-b5ca-86c96232b8da",
                                "contentUrn":"urn:pearson:entity:db9a8160-8016-45a5-a9f4-8d26dcb03b4f",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:eacbbe9c-733b-417b-87fe-6b4aa629e72c",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"dfsdffdfs"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">dfsdffdfs</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:eacbbe9c-733b-417b-87fe-6b4aa629e72c",
                                         "contentUrn":"urn:pearson:entity:488ddd79-916a-4931-beeb-e852d744d0a4",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0",
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
                       "fontstyle":"fontStyle1",
                       "parentDetails":[
                          "urn:pearson:entity:89fc57bb-d825-4112-80e8-02c2ce2508d0"
                       ]
                    }
                 },
                dispatch: jest.fn(),
                elmId: "urn:pearson:manifest:5efd3bc0-f01d-4f3f-b5ca-86c96232b8da",
                parentUrn: null,
                index: 1,
                poetryData: {  },
                newParentData: slateLevelData3.slateLevelData,
                getState: () => {
                    return {
                        autoNumberReducer: mockAutoNumberReducerEmpty
                    }
                }
            }
            
            const spydeleteFromStore = jest.spyOn(deleteHelpers, "deleteFromStore")
            deleteHelpers.deleteFromStore(args)
            expect(spydeleteFromStore).toHaveBeenCalled()
            spydeleteFromStore.mockClear()
        })
        it("delete From Store WE->BL",()=>{
            config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f"
            let args = { 
                asideData: {
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "id":"urn:pearson:manifest:8ff66fa5-3cc8-4585-9d00-f1c368568aa9",
                    "contentUrn":"urn:pearson:entity:48c57e6f-af2d-4162-a2ea-ec5623f64b8e",
                    "element":{
                       "id":"urn:pearson:manifest:8ff66fa5-3cc8-4585-9d00-f1c368568aa9",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:8ff66fa5-3cc8-4585-9d00-f1c368568aa9",
                       "contentUrn":"urn:pearson:entity:48c57e6f-af2d-4162-a2ea-ec5623f64b8e",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:645d7ce3-9c05-4e86-9d14-9c4474c0e258",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:645d7ce3-9c05-4e86-9d14-9c4474c0e258",
                                "contentUrn":"urn:pearson:entity:75701b99-1a4b-4e06-a0ad-feda81431a8d",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:c674ad2c-b13b-40dd-a4b2-ca5588a6d259",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"dsdasdsadsad"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">dsdasdsadsad</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:c674ad2c-b13b-40dd-a4b2-ca5588a6d259",
                                         "contentUrn":"urn:pearson:entity:e3fa52a2-8f23-438a-9068-d45b0604a468",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0",
                                         "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                         "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                      }
                                   ]
                                }
                             },
                             {
                                "id":"urn:pearson:manifest:038a163c-e402-4301-8ccb-c932bd0777d6",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:038a163c-e402-4301-8ccb-c932bd0777d6",
                                "contentUrn":"urn:pearson:entity:afbfc634-84e9-4355-958b-4c37bde27be9",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:382b45f0-5a4d-4e33-8f41-b1164bfde6c2",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"dsfsdf"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">dsfsdf</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:382b45f0-5a4d-4e33-8f41-b1164bfde6c2",
                                         "contentUrn":"urn:pearson:entity:15f42ffb-5ac7-48ec-8726-9f5cf92840d2",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0",
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
                    "index":"0-0-0",
                    "parent":{
                       "id":"urn:pearson:manifest:30a40f4a-93fd-4507-b492-98f11c70e964",
                       "type":"element-aside",
                       "contentUrn":"urn:pearson:entity:89fc57bb-d825-4112-80e8-02c2ce2508d0"
                    },
                    "parentManifestList":{
                       "id":"urn:pearson:manifest:8ff66fa5-3cc8-4585-9d00-f1c368568aa9",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:8ff66fa5-3cc8-4585-9d00-f1c368568aa9",
                       "contentUrn":"urn:pearson:entity:48c57e6f-af2d-4162-a2ea-ec5623f64b8e",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:645d7ce3-9c05-4e86-9d14-9c4474c0e258",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:645d7ce3-9c05-4e86-9d14-9c4474c0e258",
                                "contentUrn":"urn:pearson:entity:75701b99-1a4b-4e06-a0ad-feda81431a8d",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:c674ad2c-b13b-40dd-a4b2-ca5588a6d259",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"dsdasdsadsad"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">dsdasdsadsad</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:c674ad2c-b13b-40dd-a4b2-ca5588a6d259",
                                         "contentUrn":"urn:pearson:entity:e3fa52a2-8f23-438a-9068-d45b0604a468",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0",
                                         "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                         "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                      }
                                   ]
                                }
                             },
                             {
                                "id":"urn:pearson:manifest:038a163c-e402-4301-8ccb-c932bd0777d6",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:038a163c-e402-4301-8ccb-c932bd0777d6",
                                "contentUrn":"urn:pearson:entity:afbfc634-84e9-4355-958b-4c37bde27be9",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:382b45f0-5a4d-4e33-8f41-b1164bfde6c2",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"dsfsdf"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">dsfsdf</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:382b45f0-5a4d-4e33-8f41-b1164bfde6c2",
                                         "contentUrn":"urn:pearson:entity:15f42ffb-5ac7-48ec-8726-9f5cf92840d2",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0",
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
                 },
                dispatch: jest.fn(),
                elmId: "urn:pearson:manifest:5efd3bc0-f01d-4f3f-b5ca-86c96232b8da",
                parentUrn: null,
                index: 1,
                poetryData: {  },
                newParentData: slateLevelData4.slateLevelData,
                getState: () => {
                    return {
                        autoNumberReducer: mockAutoNumberReducerEmpty
                    }
                }
            }
            
            const spydeleteFromStore = jest.spyOn(deleteHelpers, "deleteFromStore")
            deleteHelpers.deleteFromStore(args)
            expect(spydeleteFromStore).toHaveBeenCalled()
            spydeleteFromStore.mockClear()
        })
        it("delete From Store SH->BL",()=>{
            config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f"
            let args = { 
                asideData: {
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "id":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                    "contentUrn":"urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3",
                    "element":{
                       "id":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                       "contentUrn":"urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                                "contentUrn":"urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"adasdsdfsdf"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">adasdsdfsdf</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                         "contentUrn":"urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "elementParentEntityUrn":"urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0",
                                         "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                      }
                                   ]
                                }
                             },
                             {
                                "id":"urn:pearson:manifest:c00761af-ea07-4027-8da2-48ff898fa12c",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:c00761af-ea07-4027-8da2-48ff898fa12c",
                                "contentUrn":"urn:pearson:entity:1f12176f-5fdc-43ba-95e8-3c3c54c89d84",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:d250427c-ea1d-45b0-adb2-38fb171e1389",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"sdfsdfsdf"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">sdfsdfsdf</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:d250427c-ea1d-45b0-adb2-38fb171e1389",
                                         "contentUrn":"urn:pearson:entity:c87e46cb-ea8a-4b86-9d64-9174875def49",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "elementParentEntityUrn":"urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0",
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
                    "index":"0-0-0",
                    "parent":{
                       "id":"urn:pearson:manifest:964b0f8d-b80a-4fef-afaf-837d7e97d3c4",
                       "type":"showhide",
                       "contentUrn":"urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c",
                       "showHideType":"show"
                    },
                    "parentManifestList":{
                       "id":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                       "contentUrn":"urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                                "contentUrn":"urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"adasdsdfsdf"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">adasdsdfsdf</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                         "contentUrn":"urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "elementParentEntityUrn":"urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0",
                                         "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                      }
                                   ]
                                }
                             },
                             {
                                "id":"urn:pearson:manifest:c00761af-ea07-4027-8da2-48ff898fa12c",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:c00761af-ea07-4027-8da2-48ff898fa12c",
                                "contentUrn":"urn:pearson:entity:1f12176f-5fdc-43ba-95e8-3c3c54c89d84",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:d250427c-ea1d-45b0-adb2-38fb171e1389",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"sdfsdfsdf"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">sdfsdfsdf</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:d250427c-ea1d-45b0-adb2-38fb171e1389",
                                         "contentUrn":"urn:pearson:entity:c87e46cb-ea8a-4b86-9d64-9174875def49",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "elementParentEntityUrn":"urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0",
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
                 },
                dispatch: jest.fn(),
                elmId: "urn:pearson:manifest:c00761af-ea07-4027-8da2-48ff898fa12c",
                parentUrn: null,
                index: 1,
                poetryData: {  },
                newParentData: slateLevelData5.slateLevelData,
                getState: () => {
                    return {
                        autoNumberReducer: mockAutoNumberReducerEmpty
                    }
                }
            }
            
            const spydeleteFromStore = jest.spyOn(deleteHelpers, "deleteFromStore")
            deleteHelpers.deleteFromStore(args)
            expect(spydeleteFromStore).toHaveBeenCalled()
            spydeleteFromStore.mockClear()
        })
    })
    it("delete From Store 2C/3C->BL",()=>{
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f"
        let args = { 
            asideData: {
                "type":"manifestlist",
                "subtype":"decimal",
                "id":"urn:pearson:manifest:8ff66fa5-3cc8-4585-9d00-f1c368568aa9",
                "contentUrn":"urn:pearson:entity:48c57e6f-af2d-4162-a2ea-ec5623f64b8e",
                "element":{
                   "id":"urn:pearson:manifest:8ff66fa5-3cc8-4585-9d00-f1c368568aa9",
                   "type":"manifestlist",
                   "subtype":"decimal",
                   "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                   "versionUrn":"urn:pearson:manifest:8ff66fa5-3cc8-4585-9d00-f1c368568aa9",
                   "contentUrn":"urn:pearson:entity:48c57e6f-af2d-4162-a2ea-ec5623f64b8e",
                   "listdata":{
                      "bodymatter":[
                         {
                            "id":"urn:pearson:manifest:645d7ce3-9c05-4e86-9d14-9c4474c0e258",
                            "type":"manifestlistitem",
                            "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                            "versionUrn":"urn:pearson:manifest:645d7ce3-9c05-4e86-9d14-9c4474c0e258",
                            "contentUrn":"urn:pearson:entity:75701b99-1a4b-4e06-a0ad-feda81431a8d",
                            "listitemdata":{
                               "bodymatter":[
                                  {
                                     "id":"urn:pearson:work:c674ad2c-b13b-40dd-a4b2-ca5588a6d259",
                                     "type":"element-authoredtext",
                                     "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                     "elementdata":{
                                        "text":"dsdasdsadsad"
                                     },
                                     "html":{
                                        "text":"<p class=\"paragraphNumeroUno\">dsdasdsadsad</p>",
                                        "footnotes":{
                                           
                                        },
                                        "glossaryentries":{
                                           
                                        },
                                        "indexEntries":{
                                           
                                        }
                                     },
                                     "versionUrn":"urn:pearson:work:c674ad2c-b13b-40dd-a4b2-ca5588a6d259",
                                     "contentUrn":"urn:pearson:entity:e3fa52a2-8f23-438a-9068-d45b0604a468",
                                     "status":"wip",
                                     "inputType":"AUTHORED_TEXT",
                                     "inputSubType":"NA",
                                     "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                     "index":"0",
                                     "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                     "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                  }
                               ]
                            }
                         },
                         {
                            "id":"urn:pearson:manifest:038a163c-e402-4301-8ccb-c932bd0777d6",
                            "type":"manifestlistitem",
                            "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                            "versionUrn":"urn:pearson:manifest:038a163c-e402-4301-8ccb-c932bd0777d6",
                            "contentUrn":"urn:pearson:entity:afbfc634-84e9-4355-958b-4c37bde27be9",
                            "listitemdata":{
                               "bodymatter":[
                                  {
                                     "id":"urn:pearson:work:382b45f0-5a4d-4e33-8f41-b1164bfde6c2",
                                     "type":"element-authoredtext",
                                     "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                     "elementdata":{
                                        "text":"dsfsdf"
                                     },
                                     "html":{
                                        "text":"<p class=\"paragraphNumeroUno\">dsfsdf</p>",
                                        "footnotes":{
                                           
                                        },
                                        "glossaryentries":{
                                           
                                        },
                                        "indexEntries":{
                                           
                                        }
                                     },
                                     "versionUrn":"urn:pearson:work:382b45f0-5a4d-4e33-8f41-b1164bfde6c2",
                                     "contentUrn":"urn:pearson:entity:15f42ffb-5ac7-48ec-8726-9f5cf92840d2",
                                     "status":"wip",
                                     "inputType":"AUTHORED_TEXT",
                                     "inputSubType":"NA",
                                     "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                     "index":"0",
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
                "index":"0-0-0",
                "parent":{
                   "id":"urn:pearson:manifest:30a40f4a-93fd-4507-b492-98f11c70e964",
                   "type":"groupedcontent",
                   "contentUrn":"urn:pearson:entity:89fc57bb-d825-4112-80e8-02c2ce2508d0"
                },
                "parentManifestList":{
                   "id":"urn:pearson:manifest:8ff66fa5-3cc8-4585-9d00-f1c368568aa9",
                   "type":"manifestlist",
                   "subtype":"decimal",
                   "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                   "versionUrn":"urn:pearson:manifest:8ff66fa5-3cc8-4585-9d00-f1c368568aa9",
                   "contentUrn":"urn:pearson:entity:48c57e6f-af2d-4162-a2ea-ec5623f64b8e",
                   "listdata":{
                      "bodymatter":[
                         {
                            "id":"urn:pearson:manifest:645d7ce3-9c05-4e86-9d14-9c4474c0e258",
                            "type":"manifestlistitem",
                            "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                            "versionUrn":"urn:pearson:manifest:645d7ce3-9c05-4e86-9d14-9c4474c0e258",
                            "contentUrn":"urn:pearson:entity:75701b99-1a4b-4e06-a0ad-feda81431a8d",
                            "listitemdata":{
                               "bodymatter":[
                                  {
                                     "id":"urn:pearson:work:c674ad2c-b13b-40dd-a4b2-ca5588a6d259",
                                     "type":"element-authoredtext",
                                     "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                     "elementdata":{
                                        "text":"dsdasdsadsad"
                                     },
                                     "html":{
                                        "text":"<p class=\"paragraphNumeroUno\">dsdasdsadsad</p>",
                                        "footnotes":{
                                           
                                        },
                                        "glossaryentries":{
                                           
                                        },
                                        "indexEntries":{
                                           
                                        }
                                     },
                                     "versionUrn":"urn:pearson:work:c674ad2c-b13b-40dd-a4b2-ca5588a6d259",
                                     "contentUrn":"urn:pearson:entity:e3fa52a2-8f23-438a-9068-d45b0604a468",
                                     "status":"wip",
                                     "inputType":"AUTHORED_TEXT",
                                     "inputSubType":"NA",
                                     "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                     "index":"0",
                                     "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                     "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                  }
                               ]
                            }
                         },
                         {
                            "id":"urn:pearson:manifest:038a163c-e402-4301-8ccb-c932bd0777d6",
                            "type":"manifestlistitem",
                            "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                            "versionUrn":"urn:pearson:manifest:038a163c-e402-4301-8ccb-c932bd0777d6",
                            "contentUrn":"urn:pearson:entity:afbfc634-84e9-4355-958b-4c37bde27be9",
                            "listitemdata":{
                               "bodymatter":[
                                  {
                                     "id":"urn:pearson:work:382b45f0-5a4d-4e33-8f41-b1164bfde6c2",
                                     "type":"element-authoredtext",
                                     "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                     "elementdata":{
                                        "text":"dsfsdf"
                                     },
                                     "html":{
                                        "text":"<p class=\"paragraphNumeroUno\">dsfsdf</p>",
                                        "footnotes":{
                                           
                                        },
                                        "glossaryentries":{
                                           
                                        },
                                        "indexEntries":{
                                           
                                        }
                                     },
                                     "versionUrn":"urn:pearson:work:382b45f0-5a4d-4e33-8f41-b1164bfde6c2",
                                     "contentUrn":"urn:pearson:entity:15f42ffb-5ac7-48ec-8726-9f5cf92840d2",
                                     "status":"wip",
                                     "inputType":"AUTHORED_TEXT",
                                     "inputSubType":"NA",
                                     "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                     "index":"0",
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
             },
            dispatch: jest.fn(),
            elmId: "urn:pearson:manifest:5efd3bc0-f01d-4f3f-b5ca-86c96232b8da",
            parentUrn: null,
            index: 1,
            poetryData: {  },
            newParentData: slateLevelData6.slateLevelData,
            getState: () => {
                return {
                    autoNumberReducer: mockAutoNumberReducerEmpty
                }
            }
        }
        
        const spydeleteFromStore = jest.spyOn(deleteHelpers, "deleteFromStore")
        deleteHelpers.deleteFromStore(args)
        expect(spydeleteFromStore).toHaveBeenCalled()
        spydeleteFromStore.mockClear()
    })
})

describe('Delete tab from TB element', () => {
    it("deleteFromStore for deleting Tab element from TB element", () => {
        const args = {
            newParentData: defaultSlateDataFigure.slateLevelData,
            type: "manifest",
            parentUrn: { type: 'groupedcontent', subtype: 'tab' },
            asideData: { parentManifestUrn: 'urn:pearson:manifest:60098dca-a50e-4813-a8ab-56834a89ad26' },
            contentUrn: '',
            index: '7-1',
            poetryData: null,
            cutCopyParentUrn: null,
            showHideObj: {},
            dispatch: jest.fn(),
            getState: () => {
                return {
                    autoNumberReducer: mockAutoNumberReducerEmpty
                }
            }
        }
        config.slateManifestURN = 'urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c';

        const spydeleteFromStore = jest.spyOn(deleteHelpers, "deleteFromStore");
        deleteHelpers.deleteFromStore(args);
        expect(spydeleteFromStore).toHaveBeenCalled();
        spydeleteFromStore.mockClear();
    })
    it("deleteFromStore for deleting any element from Tab inside TB element", () => {
        const args = {
            newParentData: defaultSlateDataFigure.slateLevelData,
            type: "manifest",
            parentUrn: { elementType: 'group', tbId: 'urn:pearson:manifest:60098dca-a50e-4813-a8ab-56834a89ad26' },
            asideData: { subtype: 'tab' },
            contentUrn: '',
            index: '7-0-1-0',
            poetryData: null,
            cutCopyParentUrn: null,
            showHideObj: {},
            dispatch: jest.fn(),
            getState: () => {
                return {
                    autoNumberReducer: mockAutoNumberReducerEmpty
                }
            }
        }
        config.slateManifestURN = 'urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c';
        const spydeleteFromStore = jest.spyOn(deleteHelpers, "deleteFromStore");
        deleteHelpers.deleteFromStore(args);
        expect(spydeleteFromStore).toHaveBeenCalled();
        spydeleteFromStore.mockClear();
    })
    it("deleteFromStore for deleting any element from AS/WE inside Tab inside TB element", () => {
        const args = {
            newParentData: defaultSlateDataFigure.slateLevelData,
            type: "manifest",
            parentUrn: { },
            asideData: { index: '7-0-0-4', parent: { type: 'groupedcontent', subtype: 'tab', id: 'urn:pearson:manifest:60098dca-a50e-4813-a8ab-56834a89ad26' }},
            contentUrn: '',
            index: '7-0-1-0',
            poetryData: null,
            cutCopyParentUrn: null,
            showHideObj: {},
            dispatch: jest.fn(),
            getState: () => {
                return {
                    autoNumberReducer: mockAutoNumberReducerEmpty
                }
            }
        }
        config.slateManifestURN = 'urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c';
        const spydeleteFromStore = jest.spyOn(deleteHelpers, "deleteFromStore");
        deleteHelpers.deleteFromStore(args);
        expect(spydeleteFromStore).toHaveBeenCalled();
        spydeleteFromStore.mockClear();
    })
    it("deleteFromStore for deleting any stanza element from poetry inside Tab inside TB element", () => {
        const args = {
            newParentData: newTabSlate.slateLevelData,
            type: "",
            parentUrn: { },
            asideData: { },
            contentUrn: '',
            index: '',
            elmId: 'urn:pearson:entity:44d43f1b-3bdf-4386-a06c-bfa779f28hh5',
            poetryData: { index: '1-0-0-1-1', type: 'poetry', parentUrn: 'urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f2854', parent: { type: 'groupedcontent', subtype: 'tab', id: 'urn:pearson:manifest:60098dca-a50e-4813-a8ab-56834a89ad26' }},
            cutCopyParentUrn: null,
            showHideObj: {},
            dispatch: jest.fn(),
            getState: () => {
                return {
                    autoNumberReducer: mockAutoNumberReducerEmpty
                }
            }
        }
        config.slateManifestURN = 'urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c';
        const spydeleteFromStore = jest.spyOn(deleteHelpers, "deleteFromStore");
        deleteHelpers.deleteFromStore(args);
        expect(spydeleteFromStore).toHaveBeenCalled();
        spydeleteFromStore.mockClear();
    })
    it("deleteFromStore for deleting any stanza element from poetry inside Tab inside TB element else case", () => {
        const args = {
            newParentData: newTabSlate.slateLevelData,
            type: "",
            parentUrn: { },
            asideData: { },
            contentUrn: '',
            index: '',
            elmId: 'urn:pearson:entity:44d43f1b-3bdf-4386-a06c-bfa779f28hh5',
            poetryData: { index: '1-0-0-0-1', type: 'poetry', parentUrn: 'urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f2854', parent: { type: 'groupedcontent', subtype: 'tab', id: 'urn:pearson:manifest:60098dca-a50e-4813-a8ab-56834a89ad26' }},
            cutCopyParentUrn: null,
            showHideObj: {},
            dispatch: jest.fn(),
            getState: () => {
                return {
                    autoNumberReducer: mockAutoNumberReducerEmpty
                }
            }
        }
        config.slateManifestURN = 'urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c';
        const spydeleteFromStore = jest.spyOn(deleteHelpers, "deleteFromStore");
        deleteHelpers.deleteFromStore(args);
        expect(spydeleteFromStore).toHaveBeenCalled();
        spydeleteFromStore.mockClear();
    })
    it("deleteFromStore for deleting any Block list element from Tab inside TB element", () => {
        const args = {
            newParentData: newTabSlate.slateLevelData,
            type: "",
            parentUrn: { },
            asideData: { index: '1-0-0-2' },
            contentUrn: '',
            index: '1-0-0-2',
            poetryData: {},
            cutCopyParentUrn: null,
            showHideObj: {},
            dispatch: jest.fn(),
            getState: () => {
                return {
                    autoNumberReducer: mockAutoNumberReducerEmpty
                }
            }
        }
        config.slateManifestURN = 'urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c';
        const spydeleteFromStore = jest.spyOn(deleteHelpers, "deleteFromStore");
        deleteHelpers.deleteFromStore(args);
        expect(spydeleteFromStore).toHaveBeenCalled();
        spydeleteFromStore.mockClear();
    })
})