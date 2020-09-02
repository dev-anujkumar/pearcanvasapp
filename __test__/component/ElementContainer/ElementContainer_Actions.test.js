import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actions from '../../../src/component/ElementContainer/ElementContainer_Actions';
import { slateWithCitationElement} from "../../../fixtures/slateTestingData"
import config from '../../../src/config/config.js';
import { slateLevelData, addNewComment, slateLevelDataWithApproved, blockfeature, defaultSlateDataFigure , newslateAsideData} from "../../../fixtures/containerActionsTestingData"
import { ADD_COMMENT, ADD_NEW_COMMENT, AUTHORING_ELEMENT_CREATED, AUTHORING_ELEMENT_UPDATE, CREATE_SHOW_HIDE_ELEMENT, DELETE_SHOW_HIDE_ELEMENT } from '../../../src/constants/Action_Constants';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.mock('../../../src/constants/utility.js', () => ({
    sendDataToIframe: jest.fn(),
    hasReviewerRole: jest.fn()
}))

jest.setTimeout(4000);

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
            tcmSnapshot:{}
        }
    };
    let initialState2 ={...initialState,
        slateLevelData: slateWithCitationElement.slateLevelData,  
        appStore: {slateLevelData:slateWithCitationElement.slateLevelData},
        tcmReducer : {
            tcmSnapshot: [{elemURN: "2", txCnt: 1}]
        }
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

    describe('testing------- Delete COMMENT ------action', () => {
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
            (slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter).splice(2, 1);
            return store.dispatch(actions.deleteElement(elementId, type, "", "", contentUrn)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        })

        it('testing------- Delete Element with approved------action', () => {
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
            config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            let elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
                contentUrn = "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                type = "element-authoredtext"
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: 200
                });

            });
            (slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter).splice(2, 1);
            return store.dispatch(actions.deleteElement(elementId, type, "", "", contentUrn)).then(() => {
            });
        })
        xit('testing------- Delete Element aside type------action', () => {
            let store = mockStore(() => initialState);
            config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            config.projectUrn = "urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef"
            config.slateEntityURN = "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75"
            let elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0d",
                contentUrn = "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                type = "element-authoredtext"
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: 200
                });
            });

            (slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[1].elementdata.bodymatter).push(
                {
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
                    "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                    "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                }
            );

            (slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[1].elementdata.bodymatter).splice(0, 1);

            const expectedActions = [{
                type: AUTHORING_ELEMENT_CREATED,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }];
            let parentUrn = {
                manifestUrn: "urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0b",
                contentUrn: "urn:pearson:entity:2b489c98-5e61-46d8-967c-6354b28e3679",
                elementType: "element-aside"
            }
            let asideData = {
                type: "element-aside",
                subtype: "workedexample",
                id: "urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0b",
                contentUrn: "urn:pearson:entity:2b489c98-5e61-46d8-967c-6354b28e3679",

            }
            return store.dispatch(actions.deleteElement(elementId, type, parentUrn, asideData, contentUrn, "1-0")).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        })
        xit('testing------- Delete Element manifest------action', () => {
            let store = mockStore(() => initialState);
            config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            config.projectUrn = "urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef"
            config.slateEntityURN = "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75"
            let elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0d",
                contentUrn = "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                type = "element-authoredtext"
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: 200
                });
            });
            const expectedActions = [{
                type: AUTHORING_ELEMENT_CREATED,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }];
            let parentUrn = {
                manifestUrn: "urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0b",
                contentUrn: "urn:pearson:entity:2b489c98-5e61-46d8-967c-6354b28e3679",
                elementType: "manifest"
            }
            let asideData = {
                type: "element-aside",
                subtype: "workedexample",
                id: "urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0b",
                contentUrn: "urn:pearson:entity:2b489c98-5e61-46d8-967c-6354b28e3679",

            }
            return store.dispatch(actions.deleteElement(elementId, type, parentUrn, asideData, contentUrn, "1-0")).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        })
        it('testing------- Delete Element Poetry------action', () => {
            let store = mockStore(() => initialState);
            config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            config.projectUrn = "urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef"
            config.slateEntityURN = "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75"
            let elementId = "urn:pearson:work:e1b59ae0-b04a-4b6e-a1a4-33e21077u98",
                contentUrn = "urn:pearson:entity:44d43f1b-3bdf-4386-a06c-bfa779f28hh5",
                type = "stanza"
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: 200
                });
            });
            const expectedActions = [{
                type: AUTHORING_ELEMENT_CREATED,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }];
            let parentUrn = {
                manifestUrn: "urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0b",
                contentUrn: "urn:pearson:entity:2b489c98-5e61-46d8-967c-6354b28e3679",
                elementType: "manifest"
            }
            let poetryData = {
                type: "poetry",
                id: "urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f28540",
                contentUrn: "urn:pearson:entity:44d43f1b-3bdf-4386-a06c-bfa779f27y75",
                parentUrn: "urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f28540"

            }
            return store.dispatch(actions.deleteElement(elementId, type, parentUrn, null , contentUrn, "1",poetryData)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        })
    })

    describe('testing------- UPDATE ELEMENT------action', () => {
        it('testing------- Update Element------action', () => {
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
            delete slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateUrn = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: slateLevelData
            }];

            let parentUrn = {
                manifestUrn: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                elementType: "element-authoredtext"
            }

            let asideData = {
                type: "element-authoredtext",
                id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",

            };
            return store.dispatch(actions.updateElement(updatedData, 0, parentUrn, asideData)).then(() => {
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].projectURN;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateEntity;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
                // expect(store.getActions()[0].type).toEqual(expectedActions.type);
            });
        })
        
        it('testing------- Update Element aside------action', () => {
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
                "parentType":"element-aside"
            }


            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: updatedData
                });
            });
            delete slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateUrn = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].parentType = "element-aside";
            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: slateLevelData
            }];

            let parentUrn = {
                manifestUrn: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                elementType: "element-authoredtext"
            }

            let asideData = {
                type: "element-aside",
                id: "urn:pearson:manifest:c047b586-c963-47b7-bc59-9ec595c2c6ec",

            };

            return store.dispatch(actions.updateElement(updatedData, 0, parentUrn, asideData)).then(() => {
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].projectURN;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateEntity;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
                // expect(store.getActions()[0].type).toEqual(expectedActions.type);
            });
        })

        xit('testing------- Update Element popup------action', () => {
            let store = mockStore(() => initialState);
            const updatedData =  {
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
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
           
            }


            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: updatedData
                });
            });
            delete slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateUrn = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].parentType = "element-aside";
            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: slateLevelData
            }];

            let parentUrn = {
                manifestUrn: "urn:pearson:manifest:f0c610b8-337d-47b0-9680-83b73481289c",
                elementType: "element-authoredtext"
            }

            let asideData = {
                type: "element-aside",
                id: "urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0b",

            };

            return store.dispatch(actions.updateElement(updatedData, 0, parentUrn, asideData, "")).then(() => {
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].projectURN;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateEntity;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
                expect(store.getActions()).toEqual(expectedActions);
            });
        })

        it('testing------- Update Element aside show hode------action', () => {
            let store = mockStore(() => initialState);
            const updatedData = {
                "id": "urn:pearson:work:e4495bc8-7fd5-4d9c-bd4c-1a879ad340191",
                "type": "element-authoredtext",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
            }


            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: updatedData
                });
            });
            delete slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateUrn = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].parentType = "element-aside";
            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: slateLevelData
            }];

            let parentUrn = {
                manifestUrn: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                elementType: "element-authoredtext"
            }

            let asideData = {
                type: "element-aside",
                id: "urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0b",

            };

            return store.dispatch(actions.updateElement(updatedData, 0, parentUrn, asideData, "show")).then(() => {
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].projectURN;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateEntity;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
                expect(store.getActions()).toEqual(expectedActions);
            });
        })

        it('testing------- Update Element show hide------action', () => {
            let store = mockStore(() => initialState);
            const updatedData = {
                "id": "urn:pearson:work:e4495bc8-7fd5-4d9c-bd4c-1a879ad34019",
                "type": "showhide",
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
                "parentType":"element-aside"
            }


            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: updatedData
                });
            });
            delete slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateUrn = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].parentType = "element-aside";
            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: slateLevelData
            }];

            let parentUrn = {
                manifestUrn: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                elementType: "element-authoredtext"
            }

            let asideData = {
                type: "element-aside",
                id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",

            };

            return store.dispatch(actions.updateElement(updatedData, "0", parentUrn, asideData,"hide")).then(() => {
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].projectURN;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateEntity;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
                expect(store.getActions()).toEqual(expectedActions);
            });

        })

        it('testing------- Update Element popup------action', () => {
            let store = mockStore(() => initialState);
            config.slateManifestURN="urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            const updatedData = {
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
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
            }


            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: updatedData
                });
            });
            delete slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateUrn = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            //slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].parentType = "element-aside";
            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: slateLevelData
            }];

            let parentUrn = {
                manifestUrn: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                elementType: "element-authoredtext"
            }

            

            return store.dispatch(actions.updateElement(updatedData, "0", parentUrn, {},"")).then(() => {
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].projectURN;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateEntity;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
               // expect(store.getActions()).toEqual(expectedActions);
            });

        })

        it('testing------- Update Element formatted title popup------action', () => {
            let store = mockStore(() => initialState);
            const updatedData = {
                "id": "urn:pearson:work:8a81206d-2fa2-4f62-a012-2b516dcebb751",
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
                "versionUrn": "urn:pearson:work:8a81206d-2fa2-4f62-a012-2b516dcebb751",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
            }


            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: updatedData
                });
            });
            delete slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateUrn = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            //slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].parentType = "element-aside";
            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: slateLevelData
            }];

            let parentUrn = {
                manifestUrn: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                elementType: "element-authoredtext"
            }

            

            return store.dispatch(actions.updateElement(updatedData, "0", parentUrn, {},"")).then(() => {
               
               // expect(store.getActions()).toEqual(expectedActions);
            });

        })
        it('testing------- Update Element postertext popup------action', () => {
            let store = mockStore(() => initialState);
            const updatedData = {
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
                "versionUrn": "urn:pearson:work:8a81206d-2fa2-4f62-a012-2b516dcebb7512",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
            }


            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: updatedData
                });
            });
            delete slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateUrn = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            //slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].parentType = "element-aside";
            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: slateLevelData
            }];

            let parentUrn = {
                manifestUrn: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                elementType: "element-authoredtext"
            }

            

            return store.dispatch(actions.updateElement(updatedData, "0", parentUrn, {},"")).then(() => {
               
               // expect(store.getActions()).toEqual(expectedActions);
            });

        })
        it('testing------- Update Element response and updated have different ids------action', () => {
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
            let response = {
                "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a1",
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
                    response: response
                });
            });
            delete slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateUrn = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: slateLevelData
            }
            ];

            let parentUrn = {
                manifestUrn: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                elementType: "element-authoredtext"
            }

            let asideData = {
                type: "element-authoredtext",
                id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",

            };

            return store.dispatch(actions.updateElement(updatedData, 0, parentUrn, asideData)).then(() => {
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].projectURN;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateEntity;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
            });
        })


        it('testing------- Update Element blockfeature------action', () => {
            let initialState = {
                slateLevelData: blockfeature,
                appStore: blockfeature,
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

            delete blockfeature.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
            blockfeature.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateUrn = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: blockfeature
            }];

            let parentUrn = {
                manifestUrn: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                elementType: "element-authoredtext"
            }

            let asideData = {
                type: "element-authoredtext",
                id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",

            };

            return store.dispatch(actions.updateElement(updatedData, 0, parentUrn, asideData)).then(() => {
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].projectURN;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateEntity;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
                // expect(store.getActions()[0].type).toEqual(expectedActions.type);
            });

        })
        it('testing------- Update Element response and updated have different ids with approved------action', () => {
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
            let response = {
                "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a1",
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
                    response: response
                });
            });
            delete slateLevelDataWithApproved.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
            slateLevelDataWithApproved.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateUrn = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: slateLevelDataWithApproved
            }
            ];

            let parentUrn = {
                manifestUrn: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                elementType: "element-authoredtext"
            }

            let asideData = {
                type: "element-authoredtext",
                id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",

            };

            return store.dispatch(actions.updateElement(updatedData, 0, parentUrn, asideData)).then(() => {
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].projectURN;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateEntity;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
            });
        })

        xit('testing------- Update Element LO versioning------action', () => {
            let store = mockStore(() => initialState);
            let updatedData = {
                "elementdata": { "loref": "urn:pearson:educationalgoal:0805387d-724a-4b3b-8998-b1562b8c9012" },
                "metaDataAnchorID": ["urn:pearson:work:b3b9a3d2-cd9c-4b6a-8be6-4905d0e5f891"],
                "elementVersionType": "element-learningobjectivemapping",
                "loIndex": [0],
                "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: updatedData
                });
            });
            delete slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateUrn = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: slateLevelData
            }];


            return store.dispatch(actions.updateElement(updatedData, 0, "", "")).then(() => {
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].projectURN;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateEntity;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
                expect(store.getActions()).toEqual(expectedActions);
            });
        })
        it('testing------- Update Element LO versioning response id different------action', () => {
            let store = mockStore(() => initialState);
            let updatedData = {
                "elementdata": { "loref": "urn:pearson:educationalgoal:0805387d-724a-4b3b-8998-b1562b8c9012" },
                "metaDataAnchorID": ["urn:pearson:work:b3b9a3d2-cd9c-4b6a-8be6-4905d0e5f891"],
                "elementVersionType": "element-learningobjectivemapping",
                "loIndex": [0],
                "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }

            let resonse = {
                "elementdata": { "loref": "urn:pearson:educationalgoal:0805387d-724a-4b3b-8998-b1562b8c9012" },
                "metaDataAnchorID": ["urn:pearson:work:b3b9a3d2-cd9c-4b6a-8be6-4905d0e5f8912"],
                "elementVersionType": "element-learningobjectivemapping",
                "loIndex": [0],
                "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: resonse
                });
            });
            delete slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateUrn = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: slateLevelData
            }];


            return store.dispatch(actions.updateElement(updatedData, 0, "", "")).then(() => {
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].projectURN;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateEntity;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
            });
        })
        it('testing------- Update Element LO versioning response id different with approved slate------action', () => {
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
            let updatedData = {
                "elementdata": { "loref": "urn:pearson:educationalgoal:0805387d-724a-4b3b-8998-b1562b8c9012" },
                "metaDataAnchorID": ["urn:pearson:work:b3b9a3d2-cd9c-4b6a-8be6-4905d0e5f891"],
                "elementVersionType": "element-learningobjectivemapping",
                "loIndex": [0],
                "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }

            let resonse = {
                "elementdata": { "loref": "urn:pearson:educationalgoal:0805387d-724a-4b3b-8998-b1562b8c9012" },
                "metaDataAnchorID": ["urn:pearson:work:b3b9a3d2-cd9c-4b6a-8be6-4905d0e5f8912"],
                "elementVersionType": "element-learningobjectivemapping",
                "loIndex": [0],
                "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: resonse
                });
            });
            delete slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateUrn = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: slateLevelData
            }];


            return store.dispatch(actions.updateElement(updatedData, 0, "", "")).then(() => {
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].projectURN;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateEntity;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
            });
        })

        it('testing------- Update Stanza------action', () => {
            let store = mockStore(() => initialState);
            const updatedData = {
                "type": "stanza",
                "schema": "http://schemas.pearson.com/wip-authoring/poetry/1",
                "id": "urn:pearson:work:e1b59ae0-b04a-4b6e-a1a4-33e21077u97",
                "contentUrn": "urn:pearson:entity:44d43f1b-3bdf-4386-a06c-bfa779f28hh5",
                "versionUrn": "urn:pearson:work:e1b59ae0-b04a-4b6e-a1a4-33e21077u97",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
                "poetrylines": [
                    {
                        "type": "line",
                        "id": "urn:pearson:entity:44d43f1b-3bdf-4386-a06c-bfa779f28hh5:f2f5300e-34fa-4d87-82c1-29e33bf5fu67",
                        "authoredtext": {
                            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text": ""
                        }
                    },
                ],
                "html": {
                    "title": "<p></p>",
                    "subtitle": "<p></p>",
                    "captions": "<p></p>",
                    "credits": "<p></p>",
                    "text": "<span><br /></span>"
                }
            }


            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: updatedData
                });
            });
            delete slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateUrn = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: slateLevelData
            }];

            let parentUrn = {
                manifestUrn: "urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0b",
                contentUrn: "urn:pearson:entity:2b489c98-5e61-46d8-967c-6354b28e3679",
                elementType: "manifest"
            }

            let poetryData = {
                type: 'poetry',
                id: "urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f28540",
                contentUrn: "urn:pearson:entity:44d43f1b-3bdf-4386-a06c-bfa779f27y75",
                parentUrn: "urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f28540"

            }

            return store.dispatch(actions.updateElement(updatedData, "6-2-0", parentUrn, {}, null, null,poetryData )).then(() => {
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].projectURN;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateEntity;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
                expect(store.getActions().type).toEqual(expectedActions.type);
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
            const expectedActions = [{
                type: CREATE_SHOW_HIDE_ELEMENT,
                payload: slateLevelData
            }];
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
                    response: {}
                });
            });
            const expectedActions = [{
                type: CREATE_SHOW_HIDE_ELEMENT,
                payload: slateLevelData
            }];
            return store.dispatch(actions.createShowHideElement(elementId, type, index, parentContentUrn, cb, parentElement, parentElementIndex)).then(() => {
                //expect(store.getActions()).toEqual(expectedActions);
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
            const expectedActions = [{
                type: CREATE_SHOW_HIDE_ELEMENT,
                payload: slateLevelData
            }];
            return store.dispatch(actions.createShowHideElement(elementId, type, index, parentContentUrn, cb, parentElement, parentElementIndex)).then(() => {
                expect(store.getActions()[0].type).toEqual('GET_PAGE_NUMBER');
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
            store.dispatch(actions.updateFigureData(updateddata, 2, elementId, ""));
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
            store.dispatch(actions.updateFigureData(updateddata, "4-0", elementId, ""));
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
            store.dispatch(actions.updateFigureData(updateddata, "4-1-0", elementId, ""));
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
    describe('testing----------- Citation Element -------------',()=>{
       
        xit('testing------- Delete Element citations type------action', () => {
            let store = mockStore(() => initialState2);
            config.slateManifestURN='urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'
            let contentUrn = "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r43",
                type = "element-citation",
                parentUrn = {
                    manifestUrn: "urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e",
                    contentUrn: "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5",
                    elementType: "citations"
                }
        
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: 200
                });
            });
        
            let elementId = "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27637";
            (slateWithCitationElement.slateLevelData["urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"].contents.bodymatter[0].contents.bodymatter).splice(3, 1);
            const expectedActions = [{
                type: AUTHORING_ELEMENT_CREATED,
                payload: { slateLevelData: slateWithCitationElement.slateLevelData}
            }];
        
            return store.dispatch(actions.deleteElement(elementId, type, parentUrn, undefined, contentUrn, "0-3")).then(() => {
                expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
            });
        })
        it('testing------- Update Element citations type------action', () => {
            let store = mockStore(() => initialState2);
            config.slateManifestURN='urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'
            let asideData = {
                type:"citations",
                id:"urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e",
            }
            let updatedData={
                "id": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27637",
                "type": "element-citation",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
                },
                "html" : {
                    "text":`<p class="paragraphNumeroUnoCitation" data-contenturn="urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4e" data-versionurn="urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27636">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>`
                },
                "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r43",
                "versionUrn": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27637",
                slateVersionUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let   parentUrn = {
                    manifestUrn:"urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e" ,
                    contentUrn: "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5",
                    elementType: "citations"
                }
        
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: 200
                });
            });
            let parentElement = {
                type: 'citations',
                contentUrn:"urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5",
                id:"urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e"
            }

            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: { slateLevelData: slateWithCitationElement.slateLevelData}
            }];
   
            return store.dispatch(actions.updateElement(updatedData, "0-3", parentUrn, asideData, null, parentElement, {})).then(() => {
                expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
            });
        })
        it('testing------- Update citations title------action', () => {
            let store = mockStore(() => initialState2);
            config.slateManifestURN='urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'
            let asideData = {
                type:"citations",
                id:"urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e",
            }
            let updatedData={
                "id": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635",
                "type": "element-authoredtext",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": "If the citation grouping.",
                    "textsemantics":
                    [
                        {
                            "type": "strong",
                            "charStart": 1,
                            "charEnd": 5
                        }
                    ]
                },
                "html" : {
                    "text":`<p class="paragraphNumeroUnoCitation" data-contenturn="urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4d" data-versionurn="urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635">If the citation grouping.</p>`
                },
                "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4d",
                "versionUrn": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635",
                slateVersionUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",

            }
            let   parentUrn = {
                    manifestUrn:"urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e" ,
                    contentUrn: "urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5",
                    elementType: "citations"
                }
        
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: 200
                });
            });
            let parentElement = {
                type: 'citations',
                contentUrn:"urn:pearson:entity:bea88dc0-f9c3-4d5e-9950-1f47e8d367t5",
                id:"urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e"
            }

            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: { slateLevelData: slateWithCitationElement.slateLevelData}
            }];
   
            return store.dispatch(actions.updateElement(updatedData, "0", parentUrn, asideData, null, parentElement, null)).then(() => {
                expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
            });
        })

        it('testing------- showError------method', () => {
            let store = mockStore(() => initialState2);
            const spyShowError  = jest.spyOn(actions, 'showError') 
            actions.showError({}, store.dispatch, "Test error");
            expect(spyShowError).toHaveBeenCalled()
            expect(spyShowError).toHaveReturnedWith(undefined);
            spyShowError.mockClear()
        })
        it('testing------- prepareTCMforDelete------method', () => {
            let store = mockStore(() => initialState2);
            const spyPrepareTCMforDelete  = jest.spyOn(actions, 'prepareTCMforDelete') 
            actions.prepareTCMforDelete("1", store.dispatch, store.getState);
            expect(spyPrepareTCMforDelete).toHaveBeenCalled()
            expect(spyPrepareTCMforDelete).toHaveReturnedWith(undefined);
            spyPrepareTCMforDelete.mockClear()
        })
        it('testing------- updateStoreInCanvas------method', () => {
            let store = mockStore(() => initialState2);
            const spyUpdateStoreInCanvas  = jest.spyOn(actions, 'updateStoreInCanvas')
            let asideData = {indexes: ["1","1"], type : 'element-aside'}
            let parentElement = {
                type : 'poetry'
            }
            actions.updateStoreInCanvas({slateVersionUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"}, asideData, {}, store.dispatch, store.getState, {}, "1", null, parentElement, null);
            expect(spyUpdateStoreInCanvas).toHaveBeenCalled()
            spyUpdateStoreInCanvas.mockClear()
        })
    })
})
