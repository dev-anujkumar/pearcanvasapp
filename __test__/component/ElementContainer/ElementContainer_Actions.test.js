import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actions from '../../../src/component/ElementContainer/ElementContainer_Actions';
import { slateWithCitationElement} from "../../../fixtures/slateTestingData"
import config from '../../../src/config/config.js';
import { stub } from 'sinon';
import { slateLevelData, addNewComment, slateLevelDataWithApproved, blockfeature, defaultSlateDataFigure } from "../../../fixtures/containerActionsTestingData"
import { ADD_NEW_COMMENT, AUTHORING_ELEMENT_CREATED, AUTHORING_ELEMENT_UPDATE, CREATE_SHOW_HIDE_ELEMENT, DELETE_SHOW_HIDE_ELEMENT } from '../../../src/constants/Action_Constants';
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
    fetchElementWipData: jest.fn()
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
        assetPopOverSearch: { assetID: "urn:pearson:work:23454423342" }
    };
    let initialState2 ={...initialState,
        slateLevelData: slateWithCitationElement.slateLevelData,  
        appStore: {slateLevelData:slateWithCitationElement.slateLevelData},
        tcmReducer : {
            tcmSnapshot: [{elemURN: "2", txCnt: 1}]
        },
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
                type = "element-authoredtext"
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

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: {}
                });
            });
            return store.dispatch(actions.createShowHideElement(elementId, type, index, parentContentUrn, cb, parentElement, parentElementIndex)).then(() => {
                expect(store.getActions()[0].type).toEqual('CREATE_SHOW_HIDE_ELEMENT');
            });
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
                }
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

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: {
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
                        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                    }
                });
            });
            const expectedActions = [{
                type: CREATE_SHOW_HIDE_ELEMENT,
                payload: slateLevelData
            }];
            return store.dispatch(actions.createShowHideElement(elementId, type, index, parentContentUrn, cb, parentElement, parentElementIndex)).then(() => {
                expect(store.getActions()).toEqual([]);
            });
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

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: {}
                });
            });

            return store.dispatch(actions.createShowHideElement(elementId, type, index, parentContentUrn, cb, parentElement, parentElementIndex)).then(() => {
                expect(store.getActions()[0].type).toEqual('GET_PAGE_NUMBER');
            });
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

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: {}
                });
            });
            
            return store.dispatch(actions.createShowHideElement(elementId, type, index, parentContentUrn, cb, parentElement, parentElementIndex)).then(() => {
                expect(store.getActions()[0].type).toEqual('CREATE_SHOW_HIDE_ELEMENT');
            });
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

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: {}
                });
            });
            
            return store.dispatch(actions.createShowHideElement(elementId, type, index, parentContentUrn, cb, parentElement, parentElementIndex)).then(() => {
                expect(store.getActions()[0].type).toEqual('CREATE_SHOW_HIDE_ELEMENT');
            });
        })
    })
    describe('testing------- Delete SHOW HIDE ELEMENT ------action', () => {
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
                expect(cb).toBeCalled();
                expect(store.getActions()[0].type).toEqual('GET_PAGE_NUMBER');
            });

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

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: {}
                });
            });

            return store.dispatch(actions.deleteShowHideUnit(elementId, type, parentUrn, index, eleIndex, parentId, cb, parentElement, parentElementIndex)).then(() => {
                expect(cb).toBeCalled();
                expect(store.getActions()[0].type).toEqual(DELETE_SHOW_HIDE_ELEMENT);
            });

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
            return store.dispatch(actions.getTableEditorData(elementId)).then(() => {
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
    describe('catch cases', () => {
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
        it("contentEditableFalse helper method", () => {
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
    
            const spycontentEditableFalse  = jest.spyOn(actions, 'contentEditableFalse')
            actions.contentEditableFalse(dataToUpdate)
            expect(spycontentEditableFalse).toHaveReturnedWith(dataToUpdate)
            spycontentEditableFalse.mockClear()
        })
        it("updateFigureData helper method - simple figure", () => {
            let store = mockStore(() => initialState3);

            const figureData = {},
                elementIndex = 6,
                elementId = "urn:pearson:work:01e6b4a6-efb5-4f0b-b0e7-cdb47a84e4eb",
                dispatch = jest.fn(),
                getState = store.getState;

            const spyupdateFigureData = jest.spyOn(actions, 'updateFigureData')
            actions.updateFigureData(figureData, elementIndex, elementId, cb)(dispatch, getState)
            expect(spyupdateFigureData).toHaveBeenCalled()
            spyupdateFigureData.mockClear()
        })

    })
})
