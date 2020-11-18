import * as helperMethods from '../../../src/component/SlateWrapper/slateWrapperAction_helper';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createstoreWithFigure } from "../../../fixtures/slateTestingData"
import config from '../../../src/config/config';
import { elementAsideWorkExample } from '../../../fixtures/elementAsideData';
import { citationGroupElement } from "../../../fixtures/ElementCitationData";
import { multiColumnContainer } from "../../../fixtures/multiColumnContainer"
import { popup } from "../../../fixtures/ElementPopup"

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Tests Slate Wrapper Action helper methods', () => {
    const initialState = {
        appStore : {
            slateLevelData: createstoreWithFigure.slateLevelData,
            activeElement: {},
            splittedElementIndex: 0,
            pageNumberData: {},
            popupSlateData: {
                type: "popup"
            }
        },
        tcmReducer:{tcmSnapshot:["78","9"]},
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
        }
    }
    config.tcmStatus = true
    config.slateManifestUrn = "urn:pearson:manifest:d91706aa-0e9b-4015-aaef-fb3a9cf46ec0"
    it("onPasteSuccess", async () => {
        const store = mockStore(() => initialState)
        const params = {
            responseData: {
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
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState
        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess")
        helperMethods.onPasteSuccess(params)
        expect(spyonPasteSuccess).toHaveBeenCalledWith(params)
    })
    xit("onPasteSuccess - cut operation", async () => {
        let initialState1 = { ...initialState }
        const checkElementExistence = jest.fn()
        checkElementExistence.mockReturnValue(true);
        initialState1 = initialState1.selectionReducer.selection.operationType = "cut"
        const store = mockStore(() => initialState1)
        const params = {
            responseData: {
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
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState
        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess")
        helperMethods.onPasteSuccess(params)
        expect(spyonPasteSuccess).toHaveBeenCalledWith(params)
    })
    xit("onPasteSuccess - approved slate", async () => {
        let slateData = { ...createstoreWithFigure.slateLevelData }
        slateData = slateData[config.slateManifestUrn]["status"] = "approved"
        const initialState1 = {
            ...initialState,
            appStore : {
                slateLevelData: slateData,
                activeElement: {},
                splittedElementIndex: 0,
                pageNumberData: {},
                popupSlateData: {
                    type: "popup"
                },
                tcmReducer:{tcmSnapshot:["78","9"]}
            }
        } 
        const store = mockStore(() => initialState1)
        const params = {
            responseData: {},
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState
        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess")
        helperMethods.onPasteSuccess(params)
        expect(spyonPasteSuccess).toHaveReturnedWith(false)
    })
    it("handleTCMSnapshotsForCreation ", async () => {
        const params = {
            newParentData : null,
            currentSlateData: createstoreWithFigure.slateLevelData[config.slateManifestUrn],
            asideData: null,
            poetryData: null,
            parentUrn: null,
            type: null,
            responseData: {},
            dispatch: jest.fn(),
        }
        const spyhandleTCMSnapshotsForCreation = jest.spyOn(helperMethods, "handleTCMSnapshotsForCreation")
        helperMethods.handleTCMSnapshotsForCreation(params)
        expect(spyhandleTCMSnapshotsForCreation).toHaveBeenCalledWith(params)
    })
    it('testing------- prepareDataForTcmCreate for authored-text ------function', () => {
        const store = mockStore(() => initialState)
        const type = "TEXT";
        const createdElementData = {
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
        }
    
        const spyPrepareDataForTcmCreate = jest.spyOn(helperMethods, 'prepareDataForTcmCreate')
        helperMethods.prepareDataForTcmCreate(type, createdElementData, store.getState, store.dispatch)
        expect(spyPrepareDataForTcmCreate).toHaveBeenCalled()
        expect(spyPrepareDataForTcmCreate).toHaveReturnedWith(undefined);
    });
    it('testing------- prepareDataForTcmCreate for worked-example ------function', () => {
        
        const store = mockStore(() => initialState);
        const type = "WORKED_EXAMPLE";
        const createdElementData = elementAsideWorkExample
    
        const spyPrepareDataForTcmCreate = jest.spyOn(helperMethods, 'prepareDataForTcmCreate')
        helperMethods.prepareDataForTcmCreate(type, createdElementData, store.getState, store.dispatch)
        expect(spyPrepareDataForTcmCreate).toHaveBeenCalled()
        expect(spyPrepareDataForTcmCreate).toHaveReturnedWith(undefined);
    });

    it('testing------- prepareDataForTcmCreate for citation ------function', () => {
        
        const store = mockStore(() => initialState);
        const type = "CITATION";
        const type1 = "SECTION_BREAK"
        const createdElementData = citationGroupElement
    
        const spyPrepareDataForTcmCreate = jest.spyOn(helperMethods, 'prepareDataForTcmCreate')
        helperMethods.prepareDataForTcmCreate(type, createdElementData, store.getState, store.dispatch)
        helperMethods.prepareDataForTcmCreate(type1, createdElementData, store.getState, store.dispatch)
        expect(spyPrepareDataForTcmCreate).toHaveBeenCalled()
        expect(spyPrepareDataForTcmCreate).toHaveReturnedWith(undefined);
    });
    it('testing------- prepareDataForTcmCreate for MultiColumn container ------function', () => {
        
        const store = mockStore(() => initialState);
        const type = "MULTI_COLUMN";
        const createdElementData = multiColumnContainer
    
        const spyPrepareDataForTcmCreate = jest.spyOn(helperMethods, 'prepareDataForTcmCreate')
        helperMethods.prepareDataForTcmCreate(type, createdElementData, store.getState, store.dispatch)
        expect(spyPrepareDataForTcmCreate).toHaveBeenCalled()
        expect(spyPrepareDataForTcmCreate).toHaveReturnedWith(undefined);
    });
    it('testing------- prepareDataForTcmCreate for POP_UP ------function', () => {
        
        const store = mockStore(() => initialState);
        const type = "POP_UP";
        const createdElementData = popup
    
        const spyPrepareDataForTcmCreate = jest.spyOn(helperMethods, 'prepareDataForTcmCreate')
        helperMethods.prepareDataForTcmCreate(type, createdElementData, store.getState, store.dispatch)
        expect(spyPrepareDataForTcmCreate).toHaveBeenCalled()
        expect(spyPrepareDataForTcmCreate).toHaveReturnedWith(undefined);
    });
})