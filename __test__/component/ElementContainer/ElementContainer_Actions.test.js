import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actions from '../../../src/component/ElementContainer/ElementContainer_Actions';
import { communicationAssessmentSlateData, slateWithCitationElement} from "../../../fixtures/slateTestingData"
import config from '../../../src/config/config.js';
import { stub } from 'sinon';
import { slateLevelData, addNewComment, slateLevelDataWithApproved, slateLevelDataWithoutApproved, blockfeature, defaultSlateDataFigure, newslateShowhideData, popupSlateLevelDataWithApproved } from "../../../fixtures/containerActionsTestingData"
import { ADD_NEW_COMMENT, AUTHORING_ELEMENT_CREATED, AUTHORING_ELEMENT_UPDATE, CREATE_SHOW_HIDE_ELEMENT, DELETE_SHOW_HIDE_ELEMENT, UPDATE_MULTIPLE_COLUMN_INFO, UPDATE_OLD_FIGUREIMAGE_INFO, UPDATE_OLD_SMARTLINK_INFO, UPDATE_OLD_AUDIOVIDEO_INFO, UPDATE_AUTONUMBERING_DROPDOWN_VALUE, UPDATE_TABLE_ELEMENT_EDITED_DATA,SET_ELEMENT_STATUS, APPROVED_SLATE_POPUP_STATUS } from '../../../src/constants/Action_Constants';
import { JSDOM } from 'jsdom'
import MockAdapter from 'axios-mock-adapter';
import axios from "axios"
import { truncate } from 'fs/promises';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
global.document = (new JSDOM()).window.Element;
jest.mock('../../../src/constants/utility.js', () => ({
    sendDataToIframe: jest.fn(),
            hasReviewerRole: () => {
                return false
            },
    getLabelNumberTitleHTML: jest.fn(),
    handleTinymceEditorPlugins: jest.fn(()=> 'lists advlist placeholder charmap paste image casechange' ),
    createLabelNumberTitleModel: jest.fn()
}))
jest.mock('../../../src/component/ShowHide/ShowHide_Helper', () => {
    return {
        getShowHideElement: () => {
            return {
                type: 'showhide',
                id: "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                interactivedata: {
                    "type": 'showhide',
                    "postertextobject": [
                        {
                            "type": "element-authoredtext",
                            "contentUrn": "urn:pearson:entity:5e36e9b2-08f6-4841-bb2f-1beb08f28905",
                            "id": "urn:pearson:work:305cc470-3d3e-45f8-ae5d-4b10eff07e8f",
                            "versionUrn":"urn:pearson:manifest:8bc3c41e-14db-45e3-9e55-0f708b42e1c9"
                        }
                    ]
                }
            }
        },
        indexOfSectionType: () => {return "postertextobject"}
    }
})
jest.mock('../../../src/component/FigureHeader/AutoNumber_helperFunctions', () => ({
    generateDropdownDataForContainers: jest.fn(),
    setAutonumberingValuesForPayload: jest.fn(),
    getValueOfLabel: jest.fn()
}))
jest.mock('../../../src/component/TcmSnapshots/TcmSnapshotsCreate_Update.js', () => ({
    prepareSnapshots_ShowHide: jest.fn(),
    tcmSnapshotsForCreate: jest.fn()
}))
jest.mock('../../../src/component/ElementContainer/ElementContainerDelete_helpers.js', () => ({
    tcmSnapshotsForDelete: jest.fn(),
    onDeleteSuccess: jest.fn(),
    prepareTCMSnapshotsForDelete: jest.fn(),
    onSlateApproved: jest.fn(),
    deleteFromStore: jest.fn(),
    prepareTCMforDelete: jest.fn()
}))

jest.mock('../../../src/component/ElementContainer/ElementContainerUpdate_helpers.js', () => ({
    updateNewVersionElementInStore: jest.fn(),
    updateElementInStore: jest.fn(),
    collectDataAndPrepareTCMSnapshot: jest.fn(),
    processAndStoreUpdatedResponse: jest.fn(),
    showLinkToast: jest.fn(),
    updateStore: jest.fn(),
    updateStoreInCanvas: jest.fn(),
    updateLOInStore: jest.fn(),
    prepareDataForUpdateTcm: jest.fn()
}))

jest.mock('../../../src/js/TinyMceUtility.js', () => ({
    checkBlockListElement: jest.fn(() => { return { parentData: {} } })
}));

let cb = new stub();
jest.setTimeout(10000);

const element = document.createElement('div');
    element.id = "link-notification";
    element.innerHTML = "<p>Link Notification</p>";
    document.body.appendChild(element);
    
describe('Tests ElementContainer Actions', () => {
    let initialState = {
        slateLevelData: slateLevelData,
        appStore: slateLevelData,
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
            tcmSnapshot:[]
        },
        autoNumberReducer: { isAutoNumberingEnabled: true, popupParentSlateData : {isPopupSlate: truncate} },
        assetPopOverSearch: { assetID: "urn:pearson:work:23454423342" }
    };
    let initialState2 ={...initialState,
        slateLevelData: slateWithCitationElement.slateLevelData,  
        appStore: {slateLevelData:slateWithCitationElement.slateLevelData},
        tcmReducer : {
            tcmSnapshot: [{elemURN: "2", txCnt: 1}]
        },
        autoNumberReducer: { isAutoNumberingEnabled: true},
        assetPopOverSearch: { assetID: "urn:pearson:work:23454423342" }
    }
    // let store = mockStore(() => initialState);

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall()
    });
    describe('testing------- ADD COMMENT ------action', () => {
        it('testing------- ADD COMMENT for other elements ------action', () => {
            let store = mockStore(() => initialState);
            let newComment = {
                comment: "test",
                commentCreator: "c5test01",
                assignee: "c5test01"
            },
                response = {
                    data: {
                        commentUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
                    }
                },
                elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a";

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 201,
                    response: response
                });
            });
            const expectedActions = [
            {
                type: ADD_NEW_COMMENT,
                payload: addNewComment
            }];
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].comments = true;
            return store.dispatch(actions.addComment(newComment.comment, elementId)).then(() => {
                store.getActions()[0].payload && delete store.getActions()[0].payload['commentDateTime'];
                expectedActions[0].payload && delete expectedActions[0].payload['commentDateTime'];
                expect(store.getActions().type).toEqual(expectedActions.type);

            });
        })
        it('testing------- ADD COMMENT for aside elements ------action', () => {
            let store = mockStore(() => initialState);
            let newComment = {
                comment: "test",
                commentCreator: "c5test01",
                assignee: "c5test01"
            },
                response = {
                    data: {
                        commentUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
                    }
                }
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 201,
                    response: response
                });
            });

            let elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0d";
            addNewComment.commentOnEntity = elementId;
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].comments = false;
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[1].elementdata.bodymatter[0].comments = true;
            const expectedActions = [
            {
                type: ADD_NEW_COMMENT,
                payload: addNewComment
            }];

            const asideData = {
                id: "urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0b",
                type: "element-aside"
            }

            return store.dispatch(actions.addComment(newComment.comment, elementId, asideData)).then(() => {
                store.getActions()[0].payload && delete store.getActions()[0].payload['commentDateTime'];
                expectedActions[0].payload && delete expectedActions[0].payload['commentDateTime'];
                expect(store.getActions().type).toEqual(expectedActions.type);

            });
        })
        it('testing------- ADD COMMENT for aside elements ------action-else case', () => {
            let newComment = {
                comment: "test",
                commentCreator: "c5test01",
                assignee: "c5test01"
            },
                response = {
                    data: {
                        commentUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
                    }
                }
            let store = mockStore(() => initialState);
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 201,
                    response: response
                });
            });

            let elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b";
            addNewComment.commentOnEntity = elementId;
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].comments = false;
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[1].elementdata.bodymatter[0].comments = true;
            const expectedActions = [
            {
                type: 'ADD_NEW_COMMENT',
                payload: addNewComment
            }];

            const asideData = {
                id: "urn:pearson:manifest:c047b586-c963-47b7-bc59-9ec595c2c6ec",
                type: "element-aside"
            }
            const parentUrn = {
                manifestUrn: "urn:pearson:manifest:f0c610b8-337d-47b0-9680-83b73481289c"
            }
            return store.dispatch(actions.addComment(newComment.comment, elementId, asideData, parentUrn)).then(() => {
                store.getActions()[0].payload && delete store.getActions()[0].payload['commentDateTime'];
                expectedActions.payload && delete expectedActions.payload['commentDateTime'];
                expect(store.getActions()[0].type).toEqual(expectedActions[0].type);

            });
        })
       
    })

    describe('testing------- Delete Element ------action', () => {
        it('testing------- Delete Element------action', () => {
            let store = mockStore(() => initialState);
            config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            let elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
                contentUrn = "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                type = "popup"
            const expectedActions = [{
                type: AUTHORING_ELEMENT_CREATED,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }];
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: 200
                });

            });
            const spydeleteElement = jest.spyOn(actions, "deleteElement")
            return store.dispatch(actions.deleteElement(elementId, type, "", "", contentUrn)).then(() => {
                expect(spydeleteElement).toHaveBeenCalled();
                
            });
        })
        it('testing------- Delete Element------action----type-element-workedexample', () => {
            let store = mockStore(() => initialState);
            config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            let elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
                contentUrn = "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                type = "element-workedexample"
            const expectedActions = [{
                type: AUTHORING_ELEMENT_CREATED,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }];
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: 200
                });

            });
            const spydeleteElement = jest.spyOn(actions, "deleteElement")
            return store.dispatch(actions.deleteElement(elementId, type, "", "", contentUrn)).then(() => {
                expect(spydeleteElement).toHaveBeenCalled();
                
            });
        })
        it('testing------- Delete Element------action----type-element-aside', () => {
            let store = mockStore(() => initialState);
            config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            let elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
                contentUrn = "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                type = "element-aside"
            const expectedActions = [{
                type: AUTHORING_ELEMENT_CREATED,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }];
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: 200
                });

            });
            const cutCopyUrnObj = {
                contentUrn: "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
            }
            const spydeleteElement = jest.spyOn(actions, "deleteElement")
            return store.dispatch(actions.deleteElement(elementId, type, "", "", contentUrn,"", "", "",cutCopyUrnObj)).then(() => {
                expect(spydeleteElement).toHaveBeenCalled();
                
            });
        })
        it('testing------- Delete Element - catch block------action', () => {
            let store = mockStore(() => initialState);
            config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            let elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
                contentUrn = "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                type = "element-authoredtext"
            
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 201,
                    response: 200
                });

            });
            const spydeleteElement = jest.spyOn(actions, "deleteElement")
            const dispatch = jest.fn()
            return store.dispatch(actions.deleteElement(elementId, type, "", "", contentUrn)).then(() => {
                expect(spydeleteElement).toHaveBeenCalled();
                
            });
        })
    })

    describe('testing------- UPDATE ELEMENT------action', () => {
            
        it('testing------- Update Element -----action', () => {
            
            let store = mockStore(() => initialState);
            
            const updatedData = {
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

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: updatedData
                });
            });
            let parentUrn = {
                manifestUrn: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                elementType: "element-authoredtext"
            }
           config.tcmStatus= true
            let asideData = {
                type: "element-authoredtext",
                id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",

            }
            const spyupdateElement = jest.spyOn(actions, 'updateElement')
            return store.dispatch(actions.updateElement(updatedData, 0, parentUrn, asideData)).then(() => {
                expect(spyupdateElement).toHaveBeenCalled()
            });
        })
        it('testing------- Update Element -----action > element-blockfeature condition', () => {
            
            let store = mockStore(() => initialState);
            
            const updatedData = {
                "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                "type": "element-blockfeature",
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

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: updatedData
                });
            });
            let parentUrn = {
                manifestUrn: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                elementType: "element-authoredtext"
            }
           config.tcmStatus= true
            let asideData = {
                type: "element-authoredtext",
                id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",

            }
            const spyupdateElement = jest.spyOn(actions, 'updateElement')
            return store.dispatch(actions.updateElement(updatedData, 0, parentUrn, asideData)).then(() => {
                expect(spyupdateElement).toHaveBeenCalled()
            });
        })
        it('testing------- Update Element -----action - Reviewer role', () => {
            
            let store = mockStore(() => initialState);
            const updatedData = {
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
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
                "loData": true
            }

            //Mocking axios put request
            let mock = new MockAdapter(axios);
            const data = undefined;
            mock.onPut(`${config.REACT_APP_API_URL}v1/slate/element`).reply(500, data);
            
            let parentUrn = {
                manifestUrn: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                elementType: "element-authoredtext"
            }
           config.tcmStatus= true
            let asideData = {
                type: "element-authoredtext",
                id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",

            }
            jest.mock('../../../src/constants/utility.js', () => ({
                hasReviewerRole: () => {return true},
                handleTinymceEditorPlugins: jest.fn(()=> 'lists advlist placeholder charmap paste image casechange' )
            }))
            const spyupdateElement = jest.spyOn(actions, 'updateElement')
            actions.updateElement(updatedData, 0, parentUrn, asideData, "postertextobject")(store.dispatch, store.getState)
            expect(spyupdateElement).toHaveBeenCalled()
        })
        it('testing------- Update Element -----action---Assessment slate', () => {
            
            let store = mockStore(() => initialState);
            
            const updatedData = {
                "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                "type": "element-assessment",
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

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: updatedData
                });
            });
            let parentUrn = {
                manifestUrn: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                elementType: "element-authoredtext"
            }
           config.tcmStatus= true
            let asideData = {
                type: "element-authoredtext",
                id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",

            }
            const spyupdateElement = jest.spyOn(actions, 'updateElement')
            return store.dispatch(actions.updateElement(updatedData, 0, parentUrn, asideData)).then(() => {
                expect(spyupdateElement).toHaveBeenCalled()
            });
        })
        it('testing------- Update Element -----action---Assessment slate from RC', () => {
            
            let store = mockStore(() => initialState);
            
            const updatedData = {
                "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                "type": "element-assessment",
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

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: updatedData
                });
            });
            let parentUrn = {
                manifestUrn: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                elementType: "element-authoredtext"
            }
           config.tcmStatus= true
            let asideData = {
                type: "element-authoredtext",
                id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",

            }
            const spyupdateElement = jest.spyOn(actions, 'updateElement')
            return store.dispatch(actions.updateElement(updatedData, 0, parentUrn, asideData, null, null, null, true, communicationAssessmentSlateData.getRequiredSlateData )).then(() => {
                expect(spyupdateElement).toHaveBeenCalled()
            });
        })

        it('testing------- Update Element -----action---element-list- covering removeBRForMathmlAndFootnote to remove <br> for footnote and image ', () => {
            
            let store = mockStore(() => initialState);
            
            const updatedData = {
                "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                "type": "element-list",
                "subtype": "",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": ""
                },
                "html": {
                    "text": "<ol class=\"decimal\" treelevel=\"1\" style=\"counter-increment: section 0;\"><br><li class=\"reset listItemNumeroUnoNumber\"><img align=\"middle\" class=\"Wirisformula\" src=\"https://cite-media-stg.pearson.com/legacy_paths/wiris-dev-mathtype-cache-use/cache/07/42/07429e847629dc1ed04426bd1e236071.png?1686117411770\" height=\"22\" width=\"34\" data-mathml=\"«math xmlns=¨http://www.w3.org/1998/Math/MathML¨»«msqrt»«mn»22«/mn»«/msqrt»«/math»\" alt=\"square root of 22\" role=\"math\" style=\"max-width: none;\"></li><li class=\"reset listItemNumeroUnoNumber\"><img align=\"middle\" class=\"Wirisformula\" src=\"https://cite-media-stg.pearson.com/legacy_paths/wiris-dev-mathtype-cache-use/cache/07/42/07429e847629dc1ed04426bd1e236071.png?1686117411770\" height=\"22\" width=\"34\" data-mathml=\"«math xmlns=¨http://www.w3.org/1998/Math/MathML¨»«msqrt»«mn»22«/mn»«/msqrt»«/math»\" alt=\"square root of 22\" role=\"math\" style=\"max-width: none;\"><br></li><li class=\"listItemNumeroUnoNumber\"><sup><a href=\"#\" id=\"urn:pearson:work:86014c8f-fdc5-4d46-a24d-3282dc653e44\" data-uri=\"urn:pearson:work:86014c8f-fdc5-4d46-a24d-3282dc653e44\" data-footnoteelementid=\"urn:pearson:work:86014c8f-fdc5-4d46-a24d-3282dc653e44\" class=\"Pearson-Component paragraphNumeroUnoFootnote\">*</a></sup><br></li><li class=\"listItemNumeroUnoNumber\"><br><sup><a href=\"#\" id=\"urn:pearson:work:86014c8f-fdc5-4d46-a24d-3282dc653e44\" data-uri=\"urn:pearson:work:86014c8f-fdc5-4d46-a24d-3282dc653e44\" data-footnoteelementid=\"urn:pearson:work:86014c8f-fdc5-4d46-a24d-3282dc653e44\" class=\"Pearson-Component paragraphNumeroUnoFootnote\">*</a></sup></li></ol>"
                },
                "comments": false,
                "tcm": true,
                "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: updatedData
                });
            });
            let parentUrn = {
                manifestUrn: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                elementType: "element-authoredtext"
            }
           config.tcmStatus= true
            let asideData = {
                type: "element-authoredtext",
                id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",

            }
            const spyupdateElement = jest.spyOn(actions, 'updateElement')
            return store.dispatch(actions.updateElement(updatedData, 0, parentUrn, asideData, null, null, null, true, communicationAssessmentSlateData.getRequiredSlateData )).then(() => {
                expect(spyupdateElement).toHaveBeenCalled()
            });
        })
        it('testing------- Update Element -----action---element-list- removeBRForMathmlAndFootnote else conditions', () => {
            
            let store = mockStore(() => initialState);
            
            const updatedData = {
                "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                "type": "element-list",
                "subtype": "",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": ""
                },
                "html": {
                    "text": "<ol class=\"decimal\" treelevel=\"1\" style=\"counter-increment: section 0;\"><li class=\"reset listItemNumeroUnoNumber\"><img align=\"middle\" class=\"Wirisformula\" src=\"https://cite-media-stg.pearson.com/legacy_paths/wiris-dev-mathtype-cache-use/cache/07/42/07429e847629dc1ed04426bd1e236071.png?1686117411770\" height=\"22\" width=\"34\" data-mathml=\"«math xmlns=¨http://www.w3.org/1998/Math/MathML¨»«msqrt»«mn»22«/mn»«/msqrt»«/math»\" alt=\"square root of 22\" role=\"math\" style=\"max-width: none;\"></li><li class=\"reset listItemNumeroUnoNumber\"><img align=\"middle\" class=\"Wirisformula\" src=\"https://cite-media-stg.pearson.com/legacy_paths/wiris-dev-mathtype-cache-use/cache/07/42/07429e847629dc1ed04426bd1e236071.png?1686117411770\" height=\"22\" width=\"34\" data-mathml=\"«math xmlns=¨http://www.w3.org/1998/Math/MathML¨»«msqrt»«mn»22«/mn»«/msqrt»«/math»\" alt=\"square root of 22\" role=\"math\" style=\"max-width: none;\"></li><li class=\"listItemNumeroUnoNumber\"><sup><a href=\"#\" id=\"urn:pearson:work:86014c8f-fdc5-4d46-a24d-3282dc653e44\" data-uri=\"urn:pearson:work:86014c8f-fdc5-4d46-a24d-3282dc653e44\" data-footnoteelementid=\"urn:pearson:work:86014c8f-fdc5-4d46-a24d-3282dc653e44\" class=\"Pearson-Component paragraphNumeroUnoFootnote\">*</a></sup></li><li class=\"listItemNumeroUnoNumber\"><sup><a href=\"#\" id=\"urn:pearson:work:86014c8f-fdc5-4d46-a24d-3282dc653e44\" data-uri=\"urn:pearson:work:86014c8f-fdc5-4d46-a24d-3282dc653e44\" data-footnoteelementid=\"urn:pearson:work:86014c8f-fdc5-4d46-a24d-3282dc653e44\" class=\"Pearson-Component paragraphNumeroUnoFootnote\">*</a></sup></li></ol>"
                },
                "comments": false,
                "tcm": true,
                "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: updatedData
                });
            });
            let parentUrn = {
                manifestUrn: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                elementType: "element-authoredtext"
            }
           config.tcmStatus= true
            let asideData = {
                type: "element-authoredtext",
                id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",

            }
            const spyupdateElement = jest.spyOn(actions, 'updateElement')
            return store.dispatch(actions.updateElement(updatedData, 0, parentUrn, asideData, null, null, null, true, communicationAssessmentSlateData.getRequiredSlateData )).then(() => {
                expect(spyupdateElement).toHaveBeenCalled()
            });
        })

        it('testing------- Update Element -----action---element-list- removeBRForMathmlAndFootnote when no footnote or img added in list', () => {
            
            let store = mockStore(() => initialState);
            
            const updatedData = {
                "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                "type": "element-list",
                "subtype": "",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": ""
                },
                "html": {
                    "text": "<ol class=\"decimal\" treelevel=\"1\" style=\"counter-increment: section 0;\"><li class=\"reset listItemNumeroUnoNumber\"></li></ol>"
                },
                "comments": false,
                "tcm": true,
                "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: updatedData
                });
            });
            let parentUrn = {
                manifestUrn: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                elementType: "element-authoredtext"
            }
           config.tcmStatus= true
            let asideData = {
                type: "element-authoredtext",
                id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",

            }
            const spyupdateElement = jest.spyOn(actions, 'updateElement')
            return store.dispatch(actions.updateElement(updatedData, 0, parentUrn, asideData, null, null, null, true, communicationAssessmentSlateData.getRequiredSlateData )).then(() => {
                expect(spyupdateElement).toHaveBeenCalled()
            });
        })

    })

    describe('testing------- Create Show/Hide Element------action', () => {
        it('testing------- Create Show/Hide Element------action', () => {
            let store = mockStore(() => initialState);
            let elementId = "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                type = "show",
                index = "0-1-0",
                cb = jest.fn(),
                parentContentUrn = "urn:pearson:entity:8341cba0-98b1-4952-aa62-a905ae8438a9",
                parentElement = {
                    id: "urn:pearson:manifest:3a6f5764-6428-4241-862b-cd2673fa4017",
                    type: "showhide",
                    schema: "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                    versionUrn: "urn:pearson:manifest:3a6f5764-6428-4241-862b-cd2673fa4017",
                    contentUrn: "urn:pearson:entity:8341cba0-98b1-4952-aa62-a905ae8438a9",
                    interactivedata: {
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
                parentElementIndex = "0"

            const mock = new MockAdapter(axios);
            const data = {
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
            const type2BAdded = "MANIFEST_LIST"
            mock.onPost(`${config.REACT_APP_API_URL}v1/slate/element`).reply(200, data);

            const spyAction = jest.spyOn(actions, "createShowHideElement")
            actions.createShowHideElement(elementId, type, index, parentContentUrn, cb, parentElement, parentElementIndex,type2BAdded)(jest.fn, store.getState)
            expect(spyAction).toHaveBeenCalled()
        })
        it('testing------- Create Show/Hide Element------action', () => {
            let store = mockStore(() => initialState2);
            let elementId = "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                type = "show",
                index = "0-1-0",
                cb = jest.fn(),
                parentContentUrn = "urn:pearson:entity:8341cba0-98b1-4952-aa62-a905ae8438a9",
                parentElement = {
                    id: "urn:pearson:manifest:3a6f5764-6428-4241-862b-cd2673fa4017",
                    type: "showhide",
                    schema: "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                    versionUrn: "urn:pearson:manifest:3a6f5764-6428-4241-862b-cd2673fa4017",
                    contentUrn: "urn:pearson:entity:8341cba0-98b1-4952-aa62-a905ae8438a9",
                    interactivedata: {
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
                parentElementIndex = "0"

            const mock = new MockAdapter(axios);
            const data = {
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
            const type2BAdded = "MANIFEST_LIST"
            mock.onPost(`${config.REACT_APP_API_URL}v1/slate/element`).reply(200, data);

            const spyAction = jest.spyOn(actions, "createShowHideElement")
            actions.createShowHideElement(elementId, type, index, parentContentUrn, cb, parentElement, parentElementIndex,type2BAdded)(jest.fn, store.getState)
            expect(spyAction).toHaveBeenCalled()
        })
        it('testing------- Create Show/Hide Element------action > config.tcmStatus = false', () => {
            let store = mockStore(() => initialState2);
            let elementId = "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                type = "show",
                index = "0-1-0",
                cb = jest.fn(),
                parentContentUrn = "urn:pearson:entity:8341cba0-98b1-4952-aa62-a905ae8438a9",
                parentElement = {
                    id: "urn:pearson:manifest:3a6f5764-6428-4241-862b-cd2673fa4017",
                    type: "showhide",
                    schema: "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                    versionUrn: "urn:pearson:manifest:3a6f5764-6428-4241-862b-cd2673fa4017",
                    contentUrn: "urn:pearson:entity:8341cba0-98b1-4952-aa62-a905ae8438a9",
                    interactivedata: {
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
                parentElementIndex = "0"

            const mock = new MockAdapter(axios);
            const data = {
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
            const type2BAdded = "MANIFEST_LIST"
            mock.onPost(`${config.REACT_APP_API_URL}v1/slate/element`).reply(200, data);
            config.tcmStatus = false

            const spyAction = jest.spyOn(actions, "createShowHideElement")
            actions.createShowHideElement(elementId, type, index, parentContentUrn, cb, parentElement, parentElementIndex,type2BAdded)(jest.fn, store.getState)
            expect(spyAction).toHaveBeenCalled()
        })
        it('testing------- Create Show/Hide Element------action > config.tcmStatus = true', () => {
            let store = mockStore(() => initialState2);
            let elementId = "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                type = "show",
                index = "0-1-0",
                cb = jest.fn(),
                parentContentUrn = "urn:pearson:entity:8341cba0-98b1-4952-aa62-a905ae8438a9",
                parentElement = {
                    id: "urn:pearson:manifest:3a6f5764-6428-4241-862b-cd2673fa4017",
                    type: "showhide",
                    schema: "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                    versionUrn: "urn:pearson:manifest:3a6f5764-6428-4241-862b-cd2673fa4017",
                    contentUrn: "urn:pearson:entity:8341cba0-98b1-4952-aa62-a905ae8438a9",
                    interactivedata: {
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
                parentElementIndex = "0"

            const mock = new MockAdapter(axios);
            const data = {
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
            const type2BAdded = "test"
            mock.onPost(`${config.REACT_APP_API_URL}v1/slate/element`).reply(200, data);
            config.tcmStatus = true

            const spyAction = jest.spyOn(actions, "createShowHideElement")
            actions.createShowHideElement(elementId, type, index, parentContentUrn, cb, parentElement, parentElementIndex,type2BAdded)(jest.fn, store.getState)
            expect(spyAction).toHaveBeenCalled()
        })
        it('testing------- Create Show/Hide Element with approved state------action', () => {
            let initialStateApproved = {
                slateLevelData: slateLevelDataWithApproved,
                appStore: slateLevelDataWithApproved,
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
                autoNumberReducer: { isAutoNumberingEnabled: true }
            };
            let store = mockStore(() => initialStateApproved);
            let elementId = "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                type = "show",
                index = "0-1-0",
                cb = jest.fn(),
                parentContentUrn = "urn:pearson:entity:8341cba0-98b1-4952-aa62-a905ae8438a9",
                parentElement = {
                    id: "urn:pearson:manifest:3a6f5764-6428-4241-862b-cd2673fa4017",
                    type: "showhide",
                    schema: "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                    versionUrn: "urn:pearson:manifest:3a6f5764-6428-4241-862b-cd2673fa4017",
                    contentUrn: "urn:pearson:entity:8341cba0-98b1-4952-aa62-a905ae8438a9",
                    interactivedata: {
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
                parentElementIndex = "0"

            const mock = new MockAdapter(axios);
            const data = {
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
            mock.onPost(`${config.REACT_APP_API_URL}v1/slate/element`).reply(200, data);

            const spyAction = jest.spyOn(actions, "createShowHideElement")
            actions.createShowHideElement(elementId, type, index, parentContentUrn, cb, parentElement, parentElementIndex)(jest.fn, store.getState)
            expect(spyAction).toHaveBeenCalled()
        })

        it('testing------- Create Show/Hide Element parentelement approved------action', () => {
            let store = mockStore(() => initialState);
            let elementId = "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                type = "show",
                index = "0-1-0",
                cb = jest.fn(),
                parentContentUrn = "urn:pearson:entity:8341cba0-98b1-4952-aa62-a905ae8438a9",
                parentElement = {
                    id: "urn:pearson:manifest:3a6f5764-6428-4241-862b-cd2673fa4017",
                    type: "showhide",
                    status: "approved",
                    schema: "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                    versionUrn: "urn:pearson:manifest:3a6f5764-6428-4241-862b-cd2673fa4017",
                    contentUrn: "urn:pearson:entity:8341cba0-98b1-4952-aa62-a905ae8438a9",
                    interactivedata: {
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
                parentElementIndex = "0"

            const mock = new MockAdapter(axios);
            const data = {
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
            mock.onPost(`${config.REACT_APP_API_URL}v1/slate/element`).reply(200, data);

            const spyAction = jest.spyOn(actions, "createShowHideElement")
            actions.createShowHideElement(elementId, type, index, parentContentUrn, cb, parentElement, parentElementIndex)(jest.fn, store.getState)
            expect(spyAction).toHaveBeenCalled()
        })
        it('testing------- Create Show/Hide Element inside aside------action', () => {
            let store = mockStore(() => initialState);
            let elementId = "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                type = "show",
                index = "1-1-0-0",
                cb = jest.fn(),
                parentContentUrn = "urn:pearson:entity:8341cba0-98b1-4952-aa62-a905ae8438a9",
                parentElement = {
                    id: "urn:pearson:manifest:3a6f5764-6428-4241-862b-cd2673fa4017",
                    type: "showhide",
                    schema: "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                    versionUrn: "urn:pearson:manifest:3a6f5764-6428-4241-862b-cd2673fa4017",
                    contentUrn: "urn:pearson:entity:8341cba0-98b1-4952-aa62-a905ae8438a9",
                    interactivedata: {
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
                parentElementIndex = "0"

            const mock = new MockAdapter(axios);
            const data = {
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
            mock.onPost(`${config.REACT_APP_API_URL}v1/slate/element`).reply(200, data);

            const spyAction = jest.spyOn(actions, "createShowHideElement")
            actions.createShowHideElement(elementId, type, index, parentContentUrn, cb, parentElement, parentElementIndex)(jest.fn, store.getState)
            expect(spyAction).toHaveBeenCalled()
        })
        it('testing------- Create Show/Hide Element inside WE------action', () => {
            let store = mockStore(() => initialState);
            let elementId = "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                type = "show",
                index = "3-1-2-0-0",
                cb = jest.fn(),
                parentContentUrn = "urn:pearson:entity:8341cba0-98b1-4952-aa62-a905ae8438a9",
                parentElement = {
                    id: "urn:pearson:manifest:3a6f5764-6428-4241-862b-cd2673fa4017",
                    type: "showhide",
                    schema: "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                    versionUrn: "urn:pearson:manifest:3a6f5764-6428-4241-862b-cd2673fa4017",
                    contentUrn: "urn:pearson:entity:8341cba0-98b1-4952-aa62-a905ae8438a9",
                    interactivedata: {
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
                parentElementIndex = "0"

            const mock = new MockAdapter(axios);
            const data = {
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
            mock.onPost(`${config.REACT_APP_API_URL}v1/slate/element`).reply(200, data);

            const spyAction = jest.spyOn(actions, "createShowHideElement")
            actions.createShowHideElement(elementId, type, index, parentContentUrn, cb, parentElement, parentElementIndex)(jest.fn, store.getState)
            expect(spyAction).toHaveBeenCalled()
        })
        it('testing------- Create Aside element inside Show/Hide Element ----action > if', () => {
            let store = mockStore(() => initialState);
            let elementId = "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                type = "show",
                index = "3-1-2-0-0",
                cb = jest.fn(),
                parentContentUrn = "urn:pearson:entity:8341cba0-98b1-4952-aa62-a905ae8438a9",
                parentElement = {
                    id: "urn:pearson:manifest:3a6f5764-6428-4241-862b-cd2673fa4017",
                    type: "showhide",
                    schema: "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                    versionUrn: "urn:pearson:manifest:3a6f5764-6428-4241-862b-cd2673fa4017",
                    contentUrn: "urn:pearson:entity:8341cba0-98b1-4952-aa62-a905ae8438a9",
                    interactivedata: {
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
                parentElementIndex = "0"

            const mock = new MockAdapter(axios);
            const data = {
                "id": "urn:pearson:manifest:11c71298-c804-48f1-a8cc-323d107ba1be",
                "type": "element-aside",
                "subtype": "sidebar",
                "designtype": "sidebar",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "bodymatter": [
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
                            "comments": false,
                            "tcm": true,
                            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                            "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
                        }
                    ]
                }
            }
            mock.onPost(`${config.REACT_APP_API_URL}v1/slate/element`).reply(200, data);
            const type2BAdded = 'WORKED_EXAMPLE';
            const spyAction = jest.spyOn(actions, "createShowHideElement")
            actions.createShowHideElement(elementId, type, index, parentContentUrn, cb, parentElement, parentElementIndex, type2BAdded)(jest.fn, store.getState)
            expect(spyAction).toHaveBeenCalled()
        })
        it('testing------- Create Aside element inside Show/Hide Element ----action > else', () => {
            let store = mockStore(() => initialState2);
            let elementId = "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                type = "show",
                index = "3-1-2-0-0",
                cb = jest.fn(),
                parentContentUrn = "urn:pearson:entity:8341cba0-98b1-4952-aa62-a905ae8438a9",
                parentElement = {
                    id: "urn:pearson:manifest:3a6f5764-6428-4241-862b-cd2673fa4017",
                    type: "showhide",
                    schema: "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                    versionUrn: "urn:pearson:manifest:3a6f5764-6428-4241-862b-cd2673fa4017",
                    contentUrn: "urn:pearson:entity:8341cba0-98b1-4952-aa62-a905ae8438a9",
                    interactivedata: {
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
                parentElementIndex = "0"

            const mock = new MockAdapter(axios);
            const data = {
                "id": "urn:pearson:manifest:11c71298-c804-48f1-a8cc-323d107ba1be",
                "type": "element-aside",
                "subtype": "sidebar",
                "designtype": "sidebar",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "bodymatter": [
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
                            "comments": false,
                            "tcm": true,
                            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                            "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
                        }
                    ]
                }
            }
            mock.onPost(`${config.REACT_APP_API_URL}v1/slate/element`).reply(200, data);
            const type2BAdded = 'WORKED_EXAMPLE';
            const spyAction = jest.spyOn(actions, "createShowHideElement")
            actions.createShowHideElement(elementId, type, index, parentContentUrn, cb, parentElement, parentElementIndex, type2BAdded)(jest.fn, store.getState)
            expect(spyAction).toHaveBeenCalled()
        })
        it('testing------- Create Aside element inside Show/Hide Element ----without cb', () => {
            let store = mockStore(() => initialState);
            let elementId = "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                type = "show",
                index = "3-1-2-0-0",
                cb = jest.fn(),
                parentContentUrn = "urn:pearson:entity:8341cba0-98b1-4952-aa62-a905ae8438a9",
                parentElement = {
                    id: "urn:pearson:manifest:3a6f5764-6428-4241-862b-cd2673fa4017",
                    type: "showhide",
                    schema: "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                    versionUrn: "urn:pearson:manifest:3a6f5764-6428-4241-862b-cd2673fa4017",
                    contentUrn: "urn:pearson:entity:8341cba0-98b1-4952-aa62-a905ae8438a9",
                    interactivedata: {
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
                parentElementIndex = "0"

            const mock = new MockAdapter(axios);
            const data = {
                "id": "urn:pearson:manifest:11c71298-c804-48f1-a8cc-323d107ba1be",
                "type": "element-aside",
                "subtype": "sidebar",
                "designtype": "sidebar",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "bodymatter": [
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
                            "comments": false,
                            "tcm": true,
                            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                            "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
                        }
                    ]
                }
            }
            mock.onPost(`${config.REACT_APP_API_URL}v1/slate/element`).reply(200, data);
            const type2BAdded = 'WORKED_EXAMPLE';
            const spyAction = jest.spyOn(actions, "createShowHideElement")
            actions.createShowHideElement(elementId, type, index, parentContentUrn, '', parentElement, parentElementIndex, type2BAdded)(jest.fn, store.getState)
            expect(spyAction).toHaveBeenCalled()
        })
    })
    xdescribe('testing------- Delete SHOW HIDE ELEMENT ------action', () => {
        it('testing------- Delete SHOW HIDE ELEMENT------action', () => {
            let store = mockStore(() => initialState);
            let elementId = "urn:pearson:work:061ea1a7-f295-4954-910c-7145969011e0";
            let parentUrn = "urn:pearson:entity:d025ec8c-6662-4f3a-a32e-e931116f79e0";
            let type = "show";
            let index = "0-1-1";
            let parentElement = {
                status: "approved"
            };
            let parentElementIndex = "1"
            let eleIndex = "0-1-1";
            let parentId = "urn:pearson:manifest:2e052ddf-392f-4e7a-8f2a-01239fa42f43"
            let cb = jest.fn();

            const mock = new MockAdapter(axios);
            
            mock.onPost(`${config.REACT_APP_API_URL}v1/slate/deleteElement`).reply(200, {});

            const spyAction = jest.spyOn(actions, "deleteShowHideUnit")
            actions.deleteShowHideUnit(elementId, type, parentUrn, index, eleIndex, parentId, cb, parentElement, parentElementIndex)(jest.fn, store.getState)
            expect(spyAction).toHaveBeenCalled()
        })

        it('testing------- Delete SHOW HIDE ELEMENT inside aside------action', () => {
            let store = mockStore(() => initialState);

            let elementId = "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                type = "show",
                index = "1-1-0-0",
                eleIndex = "1-1-0-0",
                parentId = "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                parentUrn = "urn:pearson:entity:8341cba0-98b1-4952-aa62-a905ae8438a9",
                parentElement = {
                    id: "urn:pearson:manifest:3a6f5764-6428-4241-862b-cd2673fa4017",
                    type: "showhide",
                    schema: "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                    versionUrn: "urn:pearson:manifest:3a6f5764-6428-4241-862b-cd2673fa4017",
                    contentUrn: "urn:pearson:entity:8341cba0-98b1-4952-aa62-a905ae8438a9",
                    interactivedata: {
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
                parentElementIndex = "0",
                cb = jest.fn();

            const mock = new MockAdapter(axios);
        
            mock.onPost(`${config.REACT_APP_API_URL}v1/slate/deleteElement`).reply(200, {});

            const spyAction = jest.spyOn(actions, "deleteShowHideUnit")
            actions.deleteShowHideUnit(elementId, type, parentUrn, index, eleIndex, parentId, cb, parentElement, parentElementIndex)(jest.fn, store.getState)
            expect(spyAction).toHaveBeenCalled()
        })
        it('testing------- Delete Show/Hide Element inside WE------action', () => {
            let store = mockStore(() => initialState);
            let elementId = "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                type = "show",
                index = "3-1-2-0-0",
                eleIndex = "3-1-2-0-0",
                cb = jest.fn(),
                parentId = "urn:pearson:manifest:f0c610b8-337d-47b0-9680-83b73481289c",
                parentUrn = "urn:pearson:entity:8341cba0-98b1-4952-aa62-a905ae8438a9",
                parentElement = {
                    id: "urn:pearson:manifest:3a6f5764-6428-4241-862b-cd2673fa4017",
                    type: "showhide",
                    schema: "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                    versionUrn: "urn:pearson:manifest:3a6f5764-6428-4241-862b-cd2673fa4017",
                    contentUrn: "urn:pearson:entity:8341cba0-98b1-4952-aa62-a905ae8438a9",
                    interactivedata: {
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
                parentElementIndex = "0"

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: {}
                });
            });
            
            const spydeleteShowHideUnit = jest.spyOn(actions,"deleteShowHideUnit")
            return store.dispatch(actions.deleteShowHideUnit(elementId, type, parentUrn, index, eleIndex, parentId, cb, parentElement, parentElementIndex)).then(() => {
                expect(spydeleteShowHideUnit).toHaveBeenCalled()
            });
        })
        it('testing------- Delete SHOW HIDE ELEMENT with approved------action', () => {
            let initialStateApproved = {
                slateLevelData: slateLevelDataWithApproved,
                appStore: slateLevelDataWithApproved,
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
                }
            };
            let store = mockStore(() => initialStateApproved);
            let elementId = "urn:pearson:work:061ea1a7-f295-4954-910c-7145969011e0";
            let parentUrn = "urn:pearson:entity:d025ec8c-6662-4f3a-a32e-e931116f79e0";
            let type = "show";
            let index = "0-1-1";
            let parentElement = {
                status: "approved"
            };
            let parentElementIndex = "1"
            let eleIndex = "0-1-1";
            let parentId = "urn:pearson:manifest:2e052ddf-392f-4e7a-8f2a-01239fa42f43"
            let cb = jest.fn();
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: {}
                });
            });

            const expectedActions = [{
                type: DELETE_SHOW_HIDE_ELEMENT,
                payload: slateLevelData
            }];


            return store.dispatch(actions.deleteShowHideUnit(elementId, type, parentUrn, index, eleIndex, parentId, cb, parentElement, parentElementIndex)).then(() => {
            });

        })
    })

    describe('testing------- Table Editor ------action', () => {
        it('testing------- Table Editor ------action', () => {
            let elementId = "urn:pearson:work:01e6b4a6-efb5-4f0b-b0e7-cdb47a84e4ea"
            let response =
            {
                "urn:pearson:work:01e6b4a6-efb5-4f0b-b0e7-cdb47a84e4ea":
                {
                    id: "urn:pearson:work:01e6b4a6-efb5-4f0b-b0e7-cdb47a84e4ea",
                    type: "figure",
                    status: "wip",
                    figuretype: "tableasmarkup",
                    schema: "http://schemas.pearson.com/wip-authoring/figure/1",
                    figuredata: {
                        tableasHTML: '<table style="border-collapse: collapse; width: 1146.4px; word-break: break-all; outline: none; text-align: left;" data-mce-style="border-collapse: collapse; width: 100%;" class="mce-item-table" contenteditable="false" data-mce-selected="1"><tbody><tr><td style="width: 573.2px; outline: none;">22</td><td style="width: 573.2px; outline: none;"><br></td></tr></tbody></table>'
                    },
                    versionUrn: "urn:pearson:work:01e6b4a6-efb5-4f0b-b0e7-cdb47a84e4ea",
                    contentUrn: "urn:pearson:entity:778e227e-2da6-47d9-8afe-963f443f1dbd"

                }
            }
            let store = mockStore(() => initialState);
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: response
                });
            });
            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: slateLevelData
            }];
            return store.dispatch(actions.getTableEditorData(elementId)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        })
        it('testing------- Table Editor with approved------action', () => {
            let initialStateApproved = {
                slateLevelData: slateLevelDataWithApproved,
                appStore: slateLevelDataWithApproved,
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
                }
            };
            let elementId = "urn:pearson:work:01e6b4a6-efb5-4f0b-b0e7-cdb47a84e4ea"
            let updatedData = "test"
            let response =
            {
                "urn:pearson:work:01e6b4a6-efb5-4f0b-b0e7-cdb47a84e4ea":
                {
                    id: "urn:pearson:work:01e6b4a6-efb5-4f0b-b0e7-cdb47a84e4ea",
                    type: "figure",
                    status: "approved",
                    figuretype: "tableasmarkup",
                    schema: "http://schemas.pearson.com/wip-authoring/figure/1",
                    figuredata: {
                        tableasHTML: '<table style="border-collapse: collapse; width: 1146.4px; word-break: break-all; outline: none; text-align: left;" data-mce-style="border-collapse: collapse; width: 100%;" class="mce-item-table" contenteditable="false" data-mce-selected="1"><tbody><tr><td style="width: 573.2px; outline: none;">22</td><td style="width: 573.2px; outline: none;"><br></td></tr></tbody></table>'
                    },
                    versionUrn: "urn:pearson:work:01e6b4a6-efb5-4f0b-b0e7-cdb47a84e4ea",
                    contentUrn: "urn:pearson:entity:778e227e-2da6-47d9-8afe-963f443f1dbd"

                }
            }
            let store = mockStore(() => initialStateApproved);
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: response
                });
            });
            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: slateLevelDataWithApproved
            }];
            return store.dispatch(actions.getTableEditorData(elementId,updatedData)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        })
        it('testing------- Table Editor without approved------action', () => {
            let initialStateApproved = {
                slateLevelData: slateLevelDataWithoutApproved,
                appStore: slateLevelDataWithoutApproved,
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
                }
            };
            let elementId = "urn:pearson:work:01e6b4a6-efb5-4f0b-b0e7-cdb47a84e4ea"
            let updatedData = "test"
            let response =
            {
                "urn:pearson:work:01e6b4a6-efb5-4f0b-b0e7-cdb47a84e4ea":
                {
                    id: "urn:pearson:work:01e6b4a6-efb5-4f0b-b0e7-cdb47a84e4ea",
                    type: "figure",
                    figuretype: "tableasmarkup",
                    schema: "http://schemas.pearson.com/wip-authoring/figure/1",
                    figuredata: {
                        tableasHTML: '<table style="border-collapse: collapse; width: 1146.4px; word-break: break-all; outline: none; text-align: left;" data-mce-style="border-collapse: collapse; width: 100%;" class="mce-item-table" contenteditable="false" data-mce-selected="1"><tbody><tr><td style="width: 573.2px; outline: none;">22</td><td style="width: 573.2px; outline: none;"><br></td></tr></tbody></table>'
                    },
                    versionUrn: "urn:pearson:work:01e6b4a6-efb5-4f0b-b0e7-cdb47a84e4ea",
                    contentUrn: "urn:pearson:entity:778e227e-2da6-47d9-8afe-963f443f1dbd"

                }
            }
            let store = mockStore(() => initialStateApproved);
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: response
                });
            });
            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: slateLevelDataWithoutApproved
            }];
            return store.dispatch(actions.getTableEditorData(elementId,updatedData)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        })
    })

    describe('testing-------UpdateFigure Data ------action', () => {
        it('testing------- UpdateFigure Data------action', () => {
            let initialStateWithFigure = {
                slateLevelData: defaultSlateDataFigure,
                appStore: defaultSlateDataFigure,
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
                }
            };
            config.slateManifestURN = "urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c"
            let store = mockStore(() => initialStateWithFigure);
            let elementId = "urn:pearson:work:aca6096b-d0b6-4358-a2c7-313188665d23";
            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: defaultSlateDataFigure,
            }];


            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: 200
                });
            });
            const updateddata = {
                "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
                "height": "1225",
                "width": "1440",
                "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                "imageid": "urn:pearson:alfresco:600efdb1-a28c-4ec3-8b54-9aad364c8c2c",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            store.dispatch(actions.updateFigureData(updateddata, 2, elementId, cb));
            //expect(store.getActions()).toEqual(expectedActions);
        })
        it('testing------- UpdateFigure Data Aside------action', () => {
            let initialStateWithFigure = {
                slateLevelData: defaultSlateDataFigure,
                appStore: defaultSlateDataFigure,
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
                }
            };
            config.slateManifestURN = "urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c"
            let store = mockStore(() => initialStateWithFigure);
            let elementId = "urn:pearson:work:aca6096b-d0b6-4358-a2c7-313188665d231";
            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: defaultSlateDataFigure,
            }];


            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: 200
                });
            });
            const updateddata = {
                "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
                "height": "1225",
                "width": "1440",
                "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                "imageid": "urn:pearson:alfresco:600efdb1-a28c-4ec3-8b54-9aad364c8c2c",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            store.dispatch(actions.updateFigureData(updateddata, "4-0", elementId, cb));
            //expect(store.getActions()).toEqual(expectedActions);
      
        })
        it('testing------- UpdateFigure Data Aside 3 index------action', () => {
            let initialStateWithFigure = {
                slateLevelData: defaultSlateDataFigure,
                appStore: defaultSlateDataFigure,
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
                }
            };
            config.slateManifestURN = "urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c"
            let store = mockStore(() => initialStateWithFigure);
            let elementId = "urn:pearson:work:aca6096b-d0b6-4358-a2c7-313188665d231";
            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: defaultSlateDataFigure,
            }];


            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: 200
                });
            });
            const updateddata = {
                "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
                "height": "1225",
                "width": "1440",
                "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                "imageid": "urn:pearson:alfresco:600efdb1-a28c-4ec3-8b54-9aad364c8c2c",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            store.dispatch(actions.updateFigureData(updateddata, "4-1-0", elementId, cb));
            //expect(store.getActions()).toEqual(expectedActions);
      
        })
    })
    xdescribe('catch cases', () => {
    it('testing------- ADD COMMENT ------action- catch case', () => {
        let newComment = {
            comment: "test",
            commentCreator: "c5test01",
            assignee: "c5test01"
        }
        let store = mockStore(() => initialState);
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 404,
                response: {}
            });
        });
        let elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a";
        slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].comments = true;
        return store.dispatch(actions.addComment(newComment.comment, elementId)).catch((error) => {
        });
    })
    it('testing------- Delete Element------action-catch case', () => {
        let store = mockStore(() => initialState);
        config.slateManifestURN="urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
        let elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
            contentUrn="urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            type="element-workedexample",
            status =200;
        let asideData = {
            type:"element-aside",
            id:"urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            
        };

        (slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter).splice(2, 1);
        const expectedActions = [{
            type: AUTHORING_ELEMENT_CREATED,
            payload: slateLevelData.slateLevelData
        }];
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 404,
                response: {}
            });
        });

        return store.dispatch(actions.deleteElement(elementId,type, "",asideData,contentUrn)).catch(() => {
            // expect(store.getActions()).toEqual(expectedActions);
        });
    })
    })
    describe('testing----------- Other methods -------------',() => {

        let initialState3 = {
            slateLevelData: slateLevelData,
            appStore: {
                slateLevelData : slateLevelData.slateLevelData
            }
        }
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
        it('testing------- showError------method', () => {
            let store = mockStore(() => initialState2);
            const spyShowError  = jest.spyOn(actions, 'showError') 
            actions.showError({}, store.dispatch, "Test error");
            expect(spyShowError).toHaveBeenCalled()
            expect(spyShowError).toHaveReturnedWith(undefined);
            spyShowError.mockClear()
        })
        describe("contentEditableFalse helper method", () => {
            const dataToUpdate = {
                "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                "type": "element-blockfeature",
                "subtype": "",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": ""
                },
                "html": {
                    "text": "<p class=\"pullquoteNumeroUno\">Blockquote text</p>"
                },
                "comments": false,
                "tcm": true,
                "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
            }
            const dataToUpdate2 = {
                "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                "type": "element-blockfeature",
                "subtype": "",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": ""
                },
                "comments": false,
                "tcm": true,
                "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
            }
            it(" updatedData.type == element-blockfeature > if", () => {
                const spycontentEditableFalse  = jest.spyOn(actions, 'contentEditableFalse')
                actions.contentEditableFalse(dataToUpdate)
                expect(spycontentEditableFalse).toHaveReturnedWith(dataToUpdate)
                spycontentEditableFalse.mockClear()
            })
            it(" updatedData.type == element-blockfeature > if > else", () => {
                const spycontentEditableFalse  = jest.spyOn(actions, 'contentEditableFalse')
                actions.contentEditableFalse(dataToUpdate2)
                expect(spycontentEditableFalse)
                spycontentEditableFalse.mockClear()
            })
            it(" updatedData.type !== element-blockfeature ", () => {
                const newDataToUpdate = {
                    ...dataToUpdate, 
                    "type": "element-pdf", 
                    "html": {}
                };
                const spycontentEditableFalse  = jest.spyOn(actions, 'contentEditableFalse')
                actions.contentEditableFalse(newDataToUpdate)
                expect(spycontentEditableFalse).toHaveBeenCalled();
                spycontentEditableFalse.mockClear()
            })
        })
        
        describe(' Testing updateFigureData ',() => {
            describe('1. Testing updateFigureData ',() => {
                const initialSt = { 
                    appStore: {
                        slateLevelData : defaultSlateDataFigure.slateLevelData
                    }
                }
                let store = mockStore(() => initialSt);

                const figureData = {},
                    elementId = "urn:pearson:work:aca6096b-d0b6-4358-a2c7-313188665d231",
                    dispatch = jest.fn(),
                    getState = store.getState;

                const spyupdateFigureData = jest.spyOn(actions, 'updateFigureData');

                it("1.1. updateFigureData If ", () => {
                    config.slateManifestURN = "urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c";
                    actions.updateFigureData(figureData, 3, elementId, cb)(dispatch, getState)
                    expect(spyupdateFigureData).toHaveBeenCalled()
                    spyupdateFigureData.mockClear()
                })
                it("1.2. updateFigureData Else ", () => { 
                    config.slateManifestURN = "urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c";
                    actions.updateFigureData(figureData, 2, elementId, cb)(dispatch, getState)
                    expect(spyupdateFigureData).toHaveBeenCalled()
                    spyupdateFigureData.mockClear()
                })
            })
            describe('2. Testing updateFigureData ',() => {
                it("2.2. condition.versionUrn === elementId; ...figuretype === assessment", () => {
                    const initialSt = { 
                        appStore: {
                            slateLevelData : defaultSlateDataFigure.slateLevelData
                        }
                    }
                    let store = mockStore(() => initialSt);
                    const figureData = {},
                        elementIndex = "4-2",
                        elementId = "urn:pearson:work:aca6096b-d0b6-4358-a2c7-313188665d230",
                        dispatch = jest.fn(),
                        getState = store.getState;
                    config.slateManifestURN = "urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c";   
                    const spyupdateFigureData = jest.spyOn(actions, 'updateFigureData')
                    actions.updateFigureData(figureData, elementIndex, elementId, cb)(dispatch, getState)
                    expect(spyupdateFigureData).toHaveBeenCalled()
                    spyupdateFigureData.mockClear()
                })
                it("2.2. condition.versionUrn !== elementId", () => {
                    const initialSt = { 
                        appStore: {
                            slateLevelData : defaultSlateDataFigure.slateLevelData
                        }
                    }
                    let store = mockStore(() => initialSt);
                    const figureData = {},
                        elementIndex = "4-1",
                        elementId = "urn:pearson:work:aca6096b-d0b6-4358-a2c7-313188665d232",
                        dispatch = jest.fn(),
                        getState = store.getState;
                    config.slateManifestURN = "urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c";                   
                    const spyupdateFigureData = jest.spyOn(actions, 'updateFigureData')
                    actions.updateFigureData(figureData, elementIndex, elementId, cb)(dispatch, getState)
                    expect(spyupdateFigureData).toHaveBeenCalled()
                    spyupdateFigureData.mockClear()
                })
            })
            describe('3. Testing updateFigureData Index Length-3 ',() => {
                const initialSt = { 
                        appStore: {
                            slateLevelData : defaultSlateDataFigure.slateLevelData
                        }
                    }
                let store = mockStore(() => initialSt);
                const figureData = {},
                        dispatch = jest.fn(),
                        getState = store.getState;
                const spyupdateFigureData = jest.spyOn(actions, 'updateFigureData');
                config.slateManifestURN = "urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c";

                describe("1.1. Else type === groupedcontent ", () => {
                    it("1.1. condition.versionUrn == elementId ", () => {
                        const elementId = "urn:pearson:work:yca6096b-d0b6-4358-a2c7-313188665d230",
                            elementIndex = "5-0-0";
                        actions.updateFigureData(figureData, elementIndex, elementId, cb)(dispatch, getState)
                        expect(spyupdateFigureData).toHaveBeenCalled()
                        spyupdateFigureData.mockClear()
                    })
                    it("1.1. condition.versionUrn !== elementId ", () => {
                        const elementId = "urn:pearson:work:yca6096b-d0b6-4358-a2c7-313188665d231",
                            elementIndex = "5-0-0";
                        actions.updateFigureData(figureData, elementIndex, elementId, cb)(dispatch, getState)
                        expect(spyupdateFigureData).toHaveBeenCalled()
                        spyupdateFigureData.mockClear()
                    })
                })
                describe("1.1. Else type !== groupedcontent ", () => {
                    it("1.1. condition.versionUrn == elementId ", () => {
                        const elementId = "urn:pearson:work:zca6096b-d0b6-4358-a2c7-313188665d230",
                            elementIndex = "6-0-0";
                        actions.updateFigureData(figureData, elementIndex, elementId, cb)(dispatch, getState)
                        expect(spyupdateFigureData).toHaveBeenCalled()
                        spyupdateFigureData.mockClear()
                    })
                    it("1.1. condition.versionUrn !== elementId ", () => {
                        const elementId = "urn:pearson:work:zca6096b-d0b6-4358-a2c7-313188665d231",
                            elementIndex = "6-0-0";
                        actions.updateFigureData(figureData, elementIndex, elementId, cb)(dispatch, getState)
                        expect(spyupdateFigureData).toHaveBeenCalled()
                        spyupdateFigureData.mockClear()
                    })
                    it('4. Testing updateFigureData Index Length - 4 ',() => {
                         const elementId = "urn:pearson:work:zca6096b-d0b6-4358-a2c7-313188665d231",
                            elementIndex = "6-0-0-0";
                        actions.updateFigureData(figureData, elementIndex, elementId, cb)(dispatch, getState)
                        expect(spyupdateFigureData).toHaveBeenCalled()
                        spyupdateFigureData.mockClear()
                    })
                })
                describe('Testing updateFigureData for figures inside TB element',() => {
                    const initialSt = { 
                        appStore: {
                            slateLevelData : defaultSlateDataFigure.slateLevelData
                        }
                    }
                    let store = mockStore(() => initialSt);
    
                    const figureData = {},
                        dispatch = jest.fn(),
                        getState = store.getState;
    
                    const spyupdateFigureData = jest.spyOn(actions, 'updateFigureData');
    
                    it("1- updateFigureData tab index length - 4", () => {
                        config.slateManifestURN = "urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c";
                        const elementId = "urn:pearson:work:c09a47c6-3bfb-4e6c-a004-87c7e76e2cfd";
                        const elementIndex = "7-0-0-1";
                        actions.updateFigureData(figureData, elementIndex, elementId, cb)(dispatch, getState)
                        expect(spyupdateFigureData).toHaveBeenCalled()
                        spyupdateFigureData.mockClear()
                    })
                    it("1- updateFigureData tab index length - 5", () => {
                        config.slateManifestURN = "urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c";
                        const elementIndex = "7-0-0-2-1";
                        const elementId = "urn:pearson:work:8f9ad3d2-ee6e-43da-a8d6-ae6cfbe6d133";
                        actions.updateFigureData(figureData, elementIndex, elementId, cb)(dispatch, getState)
                        expect(spyupdateFigureData).toHaveBeenCalled()
                        spyupdateFigureData.mockClear()
                    })
                    it("1- updateFigureData tab index length - 6", () => {
                        config.slateManifestURN = "urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c";
                        const elementIndex = "7-0-0-2-3-2";
                        const elementId = "urn:pearson:work:8f9ad3d2-ee6e-43da-a8d6-ae6cfbe6d133";
                        actions.updateFigureData(figureData, elementIndex, elementId, cb)(dispatch, getState)
                        expect(spyupdateFigureData).toHaveBeenCalled()
                        spyupdateFigureData.mockClear()
                    })
                })
            })
        })
        it('testing------- updateMultipleColumnData------method', () => {
            let store = mockStore(() => initialState2);
            const expectedActions = [
                { 
                    type: UPDATE_MULTIPLE_COLUMN_INFO,
                    key: "testing",
                    payload: {}
                }
              ]
            const spyUpdateMultipleColumnData  = jest.spyOn(actions, 'updateMultipleColumnData') 
            actions.updateMultipleColumnData({}, "testing", store.dispatch);
            expect(spyUpdateMultipleColumnData).toHaveBeenCalled();
            store.dispatch(actions.updateMultipleColumnData({}, 'testing'));
            expect(store.getActions().type).toEqual(expectedActions.type);
            spyUpdateMultipleColumnData.mockClear();
        })
        it('testing------- updateFigureImageDataForCompare------method', () => {
            let store = mockStore(() => initialState2);
            const expectedActions = [
                { 
                    type: UPDATE_OLD_FIGUREIMAGE_INFO,
                    payload: {}
                }
              ]
            const spyUpdateFigureImageDataForCompare  = jest.spyOn(actions, 'updateFigureImageDataForCompare') 
            actions.updateFigureImageDataForCompare({}, store.dispatch);
            expect(spyUpdateFigureImageDataForCompare).toHaveBeenCalled();
            store.dispatch(actions.updateFigureImageDataForCompare({}));
            expect(store.getActions().type).toEqual(expectedActions.type);
            spyUpdateFigureImageDataForCompare.mockClear();
        })
        it('testing------- updateSmartLinkDataForCompare------method', () => {
            let store = mockStore(() => initialState2);
            const expectedActions = [
                { 
                    type: UPDATE_OLD_SMARTLINK_INFO,
                    payload: {}
                }
              ]
            const spyUpdateSmartLinkDataForCompare  = jest.spyOn(actions, 'updateSmartLinkDataForCompare') 
            actions.updateSmartLinkDataForCompare({}, store.dispatch);
            expect(spyUpdateSmartLinkDataForCompare).toHaveBeenCalled();
            store.dispatch(actions.updateSmartLinkDataForCompare({}));
            expect(store.getActions().type).toEqual(expectedActions.type);
            spyUpdateSmartLinkDataForCompare.mockClear();
        })
        it('testing------- updateAudioVideoDataForCompare------method', () => {
            let store = mockStore(() => initialState2);
            const expectedActions = [
                { 
                    type: UPDATE_OLD_AUDIOVIDEO_INFO,
                    payload: {}
                }
              ]
            const spyUpdateAudioVideoDataForCompare  = jest.spyOn(actions, 'updateAudioVideoDataForCompare') 
            actions.updateAudioVideoDataForCompare({}, store.dispatch);
            expect(spyUpdateAudioVideoDataForCompare).toHaveBeenCalled();
            store.dispatch(actions.updateAudioVideoDataForCompare({}));
            expect(store.getActions().type).toEqual(expectedActions.type);
            spyUpdateAudioVideoDataForCompare.mockClear();
        })
    })
    describe("Testing for updateTabTitle function", () => {
        it("testing updateTabTitle", () => {
            const initialState = {
                appStore: {
                    slateLevelData: defaultSlateDataFigure.slateLevelData
                }
            }
            let store = mockStore(() => initialState);
            config.slateManifestURN = "urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c";
            let index = "7-0";
            let previousData = {
                contentUrn: "test",
                type: "group",
                subtype: "subtype"
            };
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    res: 200
                });
            });
            const spyupdateTabTitle = jest.spyOn(actions, 'updateTabTitle');
            return store.dispatch(actions.updateTabTitle(previousData, index, {})).then(() => {
                expect(spyupdateTabTitle).toHaveBeenCalled();
                spyupdateTabTitle.mockClear();
            });
        })
        it("testing updateTabTitle if slate is approved", () => {
            const initialState = {
                appStore: {
                    slateLevelData: slateLevelDataWithApproved.slateLevelData
                }
            }
            let store = mockStore(() => initialState);
            config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            let index = "7-0";
            let previousData = {
                contentUrn: "test",
                type: "group",
                subtype: "subtype"
            };
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 201,
                    res: {
                        versionUrn: 'versionUrn'
                    }
                });
            });
            const spyupdateTabTitle = jest.spyOn(actions, 'updateTabTitle');
            return store.dispatch(actions.updateTabTitle(previousData, index, {})).then(() => {
                expect(spyupdateTabTitle).toHaveBeenCalled();
                spyupdateTabTitle.mockClear();
            });
        })
        it("testing updateTabTitle if slate is approved and is popup slate", () => {
            const initialState = {
                appStore: {
                    slateLevelData: popupSlateLevelDataWithApproved.slateLevelData
                }
            }
            let store = mockStore(() => initialState);
            config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            let index = "7-0";
            let previousData = {
                contentUrn: "test",
                type: "group",
                subtype: "subtype"
            };
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 201,
                    res: {
                        versionUrn: 'versionUrn'
                    }
                });
            });
            const spyupdateTabTitle = jest.spyOn(actions, 'updateTabTitle');
            return store.dispatch(actions.updateTabTitle(previousData, index, {})).then(() => {
                expect(spyupdateTabTitle).toHaveBeenCalled();
                spyupdateTabTitle.mockClear();
            });
        })
    })
})

describe("asideDataFromAfrescoMetadata?.type === ELEMENT_ASIDE && asideDataFromAfrescoMetadata?.parent.type === SHOW_HIDE ", () => {
    const initialSt = {
        appStore: {
            slateLevelData: newslateShowhideData.slateLevelData
        }
    }
    let store = mockStore(() => initialSt);
    config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220d0"
    const figureData = {},
        dispatch = jest.fn(),
        getState = store.getState;
    it("condition.versionUrn == elementId index length 4 ", () => {
        const asideDataFromAfrescoMetadata = {
            type: 'element-aside',
            parent: {
                type: 'showhide',
                showHideType: 'show'
            }
        }
        const elementId = "urn:pearson:work:aca6096b-d0b6-4358-a2c7-313188665d231",
        elementIndex = "0-1-0-0";
        const spyupdateFigureData = jest.spyOn(actions, 'updateFigureData');
        actions.updateFigureData(figureData, elementIndex, elementId, asideDataFromAfrescoMetadata, cb)(dispatch, getState)
        expect(spyupdateFigureData).toHaveBeenCalled()
        spyupdateFigureData.mockClear()
    })
    it("condition.versionUrn == elementId index length 4 ", () => {
        const asideDataFromAfrescoMetadata = {
            type: 'showhide',
            parent: {
                type: 'showhide',
                showHideType: 'show'
            }
        }
        const elementId = "urn:pearson:work:aca6096b-d0b6-4358-a2c7-313188665d231",
        elementIndex = "0-1-0-0";
        const spyupdateFigureData = jest.spyOn(actions, 'updateFigureData');
        actions.updateFigureData(figureData, elementIndex, elementId, asideDataFromAfrescoMetadata, cb)(dispatch, getState)
        expect(spyupdateFigureData).toHaveBeenCalled()
        spyupdateFigureData.mockClear()
    })

    it("condition.versionUrn == elementId index length 5", () => {
        const asideDataFromAfrescoMetadata = {
            type: 'element-aside',
            subtype: 'workedexample',
            parent: {
                type: 'showhide',
                showHideType: 'hide'
            }
        }
        const elementId = "urn:pearson:work:aca6096b-d0b6-4358-a2c7-313188665d231",
        elementIndex = "0-2-0-0-0";
        const spyupdateFigureData = jest.spyOn(actions, 'updateFigureData');
        actions.updateFigureData(figureData, elementIndex, elementId, asideDataFromAfrescoMetadata, cb)(dispatch, getState)
        expect(spyupdateFigureData).toHaveBeenCalled()
        spyupdateFigureData.mockClear()
    })

    it("figure.versionUrn !== elementId conditional coverage", () => {
        const asideDataFromAfrescoMetadata = {
            type: 'element-aside',
            subtype: 'workedexample',
            parent: {
                type: 'showhide',
                showHideType: 'hide'
            }
        }
        const elementId = "urn:pearson:work:aca6096b-d0b6-4358-a2c7-313188665d230",
        elementIndex = "0-2-0-0-0";
        const spyupdateFigureData = jest.spyOn(actions, 'updateFigureData');
        actions.updateFigureData(figureData, elementIndex, elementId, asideDataFromAfrescoMetadata, cb)(dispatch, getState)
        expect(spyupdateFigureData).toHaveBeenCalled()
        spyupdateFigureData.mockClear()
    })
    
})

describe("TEsting for prepareImageDataFromTable", ()=>{
    it("test for prepareImageDataFromTable", ()=>{
    const initialState = {
         appStore: {
                slateLevelData: newslateShowhideData.slateLevelData
            }}
       let store = mockStore(() => initialState);
       let dispatch = jest.fn(),
       getState = store.getState;
       let element = {
        figuredata: {
            tableasHTML: '<table style="border-collapse: collapse; width: 1146.4px; word-break: break-all; outline: none; text-align: left;" data-mce-style="border-collapse: collapse; width: 100%;" class="mce-item-table" contenteditable="false" data-mce-selected="1"><tbody><tr><td style="width: 573.2px; outline: none;">22</td><td style="width: 573.2px; outline: none;"><img className="imageAssetContent" src = "dummyData"/></td></tr></tbody></table>'
        },
       }
       const spyupdateFigureData = jest.spyOn(actions, 'prepareImageDataFromTable');
       actions.prepareImageDataFromTable(element)(dispatch, getState)
       expect(spyupdateFigureData).toHaveBeenCalled()
       spyupdateFigureData.mockClear()
    })
    it("test for prepareImageDataFromTable > else", ()=>{
        const initialState = {
             appStore: {
                    slateLevelData: newslateShowhideData.slateLevelData
                }}
           let store = mockStore(() => initialState);
           let dispatch = jest.fn(),
           getState = store.getState;
           let element = {
            figuredata: {
                tableasHTML: ""
            },
           }
           const spyupdateFigureData = jest.spyOn(actions, 'prepareImageDataFromTable');
           actions.prepareImageDataFromTable(element)(dispatch, getState)
           expect(spyupdateFigureData).toHaveBeenCalled()
           spyupdateFigureData.mockClear()
        })
})
describe("Testing for updateAside Number", ()=>{
    it("testing with updateAside",()=>{
    const initialState = {
        appStore: {
            slateLevelData: newslateShowhideData.slateLevelData
        }}
        let store = mockStore(() => initialState);
        let dispatch = jest.fn(),
        getState = store.getState;
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220d0"
        let elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a";
        let index = "0-1-1";
        let isAutoNumberingEnabled = true ;
        let autoNumberOption = 'test'
        let  previousData = {
           "numberedandlabel" : "1-2",
           contentUrn: "test"
       };
       const spyupdateFigureData = jest.spyOn(actions, 'updateAsideNumber');
       actions.updateAsideNumber(previousData, index, elementId, isAutoNumberingEnabled, autoNumberOption)(dispatch, getState)
       expect(spyupdateFigureData).toHaveBeenCalled()
       spyupdateFigureData.mockClear()
    })
    it("testing with updateAside : AUTO_NUMBER_SETTING_REMOVE_NUMBER",()=>{
        const initialState = {
            appStore: {
                slateLevelData: newslateShowhideData.slateLevelData
            }}
            let store = mockStore(() => initialState);
            let dispatch = jest.fn(),
            getState = store.getState;
            config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220d0"
            let elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a";
            let index = "0-1-1";
            let isAutoNumberingEnabled = true ;
            let autoNumberOption = 'Remove label & number'
            let  previousData = {
               "numberedandlabel" : "1-2",
               contentUrn: "test"
           };
           const spyupdateFigureData = jest.spyOn(actions, 'updateAsideNumber');
           actions.updateAsideNumber(previousData, index, elementId, isAutoNumberingEnabled, autoNumberOption)(dispatch, getState)
           expect(spyupdateFigureData).toHaveBeenCalled()
           spyupdateFigureData.mockClear()
        })
    it("testing with updateAside > else",()=>{
        const initialState = {
            appStore: {
                slateLevelData: newslateShowhideData.slateLevelData
            }}
            let store = mockStore(() => initialState);
            let dispatch = jest.fn(),
            getState = store.getState;
            config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220d0"
            let elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a";
            let index = "0-1-1";
            let isAutoNumberingEnabled = false ;
            let autoNumberOption = 'resume-numbering'
            let  previousData = {
               "numberedandlabel" : "1-2"
           };
           const spyupdateFigureData = jest.spyOn(actions, 'updateAsideNumber');
           actions.updateAsideNumber(previousData, index, elementId, isAutoNumberingEnabled, autoNumberOption)(dispatch, getState)
           expect(spyupdateFigureData).toHaveBeenCalled()
           spyupdateFigureData.mockClear()
        })

})
it("testing with updateAside",()=>{
    const initialState = {
        appStore: {
            slateLevelData: newslateShowhideData.slateLevelData
        }}
        let store = mockStore(() => initialState);
        let dispatch = jest.fn(),
        getState = store.getState;
       const id = ["t","t2","t3"]
       const spyupdateFigureData = jest.spyOn(actions,'storeDeleteElementKeys');
       actions.storeDeleteElementKeys(id)(dispatch, getState)
       expect(spyupdateFigureData).toHaveBeenCalled()
       spyupdateFigureData.mockClear()
    })

describe("updateAutoNumberingDropdownForCompare  Testing", ()=>{
    it('testing------- updateAutoNumberingDropdownForCompare------method', () => {
        let store = mockStore(() => initialState2);
        const expectedActions = [
            { 
                type: UPDATE_AUTONUMBERING_DROPDOWN_VALUE,
                payload: {}
            }
          ]
       const spyUpdateMultipleColumnData  = jest.spyOn(actions, 'updateAutoNumberingDropdownForCompare') 
       actions.updateAutoNumberingDropdownForCompare({}, "testing", store.dispatch);
       expect(spyUpdateMultipleColumnData).toHaveBeenCalled();
       store.dispatch(actions.updateAutoNumberingDropdownForCompare({}, 'testing'));
       expect(store.getActions().type).toEqual(expectedActions.type);
       spyUpdateMultipleColumnData.mockClear();
    })
})
describe("updateEditedData  Testing", ()=>{
    it('testing------- updateEditedData------method', () => {
        let store = mockStore(() => initialState2);
        const expectedActions = [
            { 
                type: UPDATE_TABLE_ELEMENT_EDITED_DATA,
                payload: {}
            }
          ]
       const spyUpdateMultipleColumnData  = jest.spyOn(actions, 'updateEditedData') 
       actions.updateEditedData({}, "testing", store.dispatch);
       expect(spyUpdateMultipleColumnData).toHaveBeenCalled();
       store.dispatch(actions.updateEditedData({}, 'testing'));
       expect(store.getActions().type).toEqual(expectedActions.type);
       spyUpdateMultipleColumnData.mockClear();
    })
})

describe("clearElementStatus  Testing", ()=>{
    it('testing------- clearElementStatus------method', () => {
        let store = mockStore(() => initialState2);
        const expectedActions = [
            { 
                type: SET_ELEMENT_STATUS,
                payload: {}
            }
          ]
       const spyUpdateClearElementStatus  = jest.spyOn(actions, 'clearElementStatus') 
       actions.clearElementStatus({}, "testing", store.dispatch);
       expect(spyUpdateClearElementStatus).toHaveBeenCalled();
       store.dispatch(actions.clearElementStatus({}, 'testing'));
       expect(store.getActions().type).toEqual(expectedActions.type);
       spyUpdateClearElementStatus.mockClear();
    })
})

describe("Test case for getElementStatus",()=>{
    it("testing-------getElementStatus------method", async ()=>{
        let store = mockStore(() => initialState);
        let newObj = {
                "id": "urn:pearson:work:d70d0ba7-aa97-4149-be94-08b1088f56b2",
                "entityURN": "urn:pearson:entity:b20db4c1-6e18-4975-a18e-79d375a109c0",
                "type": [
                    "NarrativeText",
                    "Work"
                ],
                "status": [
                    "https://schema.pearson.com/ns/contentlifecyclestatus/wip"
                ],
                "dateCreated": "2022-02-09T13:19:34.600Z",
                "dateModified": "2022-02-09T13:19:34.600Z",
                "etag": "\"346448123455\""
        }
        let elementWorkId = "4343653"
        let index = "0-1-1";
        global.fetch = jest.fn().mockImplementationOnce(() =>   {
            return new Promise((resolve, reject) => {
                resolve({json: jest.fn(()=> newObj)});
           });
        });
        const spyGetElementStatus = jest.spyOn(actions, 'getElementStatus')
            return store.dispatch(actions.getElementStatus(elementWorkId, index)).then(() => {
                expect(spyGetElementStatus).toHaveBeenCalled()
                spyGetElementStatus.mockClear()
            });
    })
})
describe("Test case for saveTEMetadata ",()=>{
    xit("testing-------saveTEMetadata ------method", async ()=>{
        let store = mockStore(() => initialState);
        let editedImageList ={

            "list": [{
                "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                "imgId": "",
                "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
                "height": "422",
                "width": "680",
                "alttext": "alttext",
                "longdescription": "longdescription",
                "podwidth": "100"
            }]
        }
        let  promiseArray =[]
       
        const spyGetSaveTEMetadata = jest.spyOn(actions, 'saveTEMetadata')
            return store.dispatch(actions.saveTEMetadata(editedImageList)).then(() => {
                expect(spyGetSaveTEMetadata).toHaveBeenCalled()
                spyGetSaveTEMetadata.mockClear()
            });
    })
})

describe("approvedSlatePopupStatus Testing", ()=>{
    it('testing------- approvedSlatePopupStatus ------method', () => {
        let store = mockStore(() => initialState2);
        const expectedActions = [
            { 
                type: APPROVED_SLATE_POPUP_STATUS,
                payload: {}
            }
          ]
       const spyUpdateMultipleColumnData  = jest.spyOn(actions, 'approvedSlatePopupStatus') 
       actions.approvedSlatePopupStatus({}, "testing", store.dispatch);
       expect(spyUpdateMultipleColumnData).toHaveBeenCalled();
       store.dispatch(actions.approvedSlatePopupStatus({}, 'testing'));
       expect(store.getActions().type).toEqual(expectedActions.type);
       spyUpdateMultipleColumnData.mockClear();
    })
})

