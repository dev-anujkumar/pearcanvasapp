import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
//import rootReducer from '../../../src/Appstore/rootReducer.js';
import moxios from 'moxios';
import * as actions from '../../../src/component/ElementContainer/ElementContainer_Actions';
// import { comments } from '../../../fixtures/commentPanelData.js'
import { slateLevelData, newslateData,defaultSlateDataFigure, addNewComment,addNewCommentAside, slateLevelAsideData,addNewCommentOnAsideElement,newSlateAsideDataComment, deleteElement, slateLevelDataAside, newslateDataAside ,newslateAsideData, blockfeature,slateWithCitationElement} from "../../../fixtures/slateTestingData"
import axios from 'axios';
import config from '../../../src/config/config.js';
import { ADD_COMMENT, ADD_NEW_COMMENT, AUTHORING_ELEMENT_CREATED, AUTHORING_ELEMENT_UPDATE, SET_OLD_IMAGE_PATH,CREATE_SHOW_HIDE_ELEMENT, DELETE_SHOW_HIDE_ELEMENT} from '../../../src/constants/Action_Constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
// const initialState = { slateLevelData };
jest.mock('../../../src/constants/utility.js', () => ({
    sendDataToIframe: jest.fn(),
    hasReviewerRole:jest.fn()
}))

global.currentSlateData = {
    status: 'wip'
}

jest.mock('../../../src/config/config.js', () => ({
    slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
    projectUrn: "urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef",
    slateEntityURN: "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75"
}))

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
        glossaryFootnoteReducer:{glossaryFootnoteValue:{elementWorkId:"4343653"},
        glossaryFootNoteCurrentValue:"",
        elementIndex:""
    }
    };
    let initialState2 ={...initialState,
        slateLevelData: slateWithCitationElement.slateLevelData,  
        appStore: {slateLevelData:slateWithCitationElement.slateLevelData}
    }
    // let store = mockStore(() => initialState);

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall()
    });

    describe('testing------- ADD COMMENT ------action', () => {
        let newComment = {
            comment: "test",
            commentCreator: "c5test01",
            assignee: "c5test01"
        },
        response={data : {
            commentUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
        }}

        it('testing------- ADD COMMENT for other elements ------action', () => {
            let store = mockStore(() => initialState);
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 201,
                    response: response
                });
            });

            let elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a";
            newslateData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].comments = true;
            const expectedActions = [{
                type: ADD_COMMENT,
                payload: newslateData
            },
            {
                type: ADD_NEW_COMMENT,
                payload: addNewComment
            }];

            return store.dispatch(actions.addComment(newComment.comment, elementId)).then(() => {
                // console.log('payload:::', store.getActions()[0].payload['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter);
                // console.log('payload:::', expectedActions[0].payload['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter);
                store.getActions()[1].payload && delete store.getActions()[1].payload['commentDateTime'];
                expectedActions[1].payload && delete expectedActions[1].payload['commentDateTime'];
                expect(store.getActions()).toEqual(expectedActions);
                
            });
        })

        it('testing------- ADD COMMENT for aside elements ------action', () => {
            let store = mockStore(() => initialState);
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 201,
                    response: response
                });
            });

            let elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0d";
            addNewComment.commentOnEntity = elementId;
            newslateData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].comments = false;
            newslateData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[1].elementdata.bodymatter[0].comments = true;
            const expectedActions = [{
                type: ADD_COMMENT,
                payload: newslateData
            },
            {
                type: ADD_NEW_COMMENT,
                payload: addNewComment
            }];

            const asideData = {
                id: "urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0b",
                type: "element-aside"
            }

            return store.dispatch(actions.addComment(newComment.comment, elementId, asideData)).then(() => {
                // console.log('payload:::', store.getActions()[0].payload['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[1].elementdata.bodymatter[0].comments);
                // console.log('payload:::', expectedActions[0].payload['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[1].elementdata.bodymatter[0].comments);
                store.getActions()[1].payload && delete store.getActions()[1].payload['commentDateTime'];
                expectedActions[1].payload && delete expectedActions[1].payload['commentDateTime'];
                expect(store.getActions()).toEqual(expectedActions);
                
            });
        })

        it('testing------- ADD COMMENT for aside elements ------action-else case', () => {
            let initialState = {
                slateLevelData: slateLevelAsideData.slateLevelData,
                appStore: slateLevelAsideData,
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
                    numberOfRows: 25
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

            let elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0v";
            addNewComment.commentOnEntity = elementId;
            newslateAsideData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].comments = false;
            newslateAsideData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[1].elementdata.bodymatter[0].comments = true;
            const expectedActions = [{
                type: ADD_COMMENT,
                payload: slateLevelAsideData
            },
            {
                type: ADD_NEW_COMMENT,
                payload: addNewComment
            }];

            const asideData = {
                id: "urn:pearson:manifest:c047b586-c963-47b7-bc59-9ec595c2c6ec",
                type: "element-aside"
            }
            const parentUrn={
                manifestUrn: "urn:pearson:manifest:f0c610b8-337d-47b0-9680-83b73481289c"
            }
            return store.dispatch(actions.addComment(newComment.comment, elementId, asideData,parentUrn)).then(() => {
               store.getActions()[1].payload && delete store.getActions()[1].payload['commentDateTime'];
               expectedActions.payload && delete expectedActions.payload['commentDateTime'];
               expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
               expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
                
            });
        })

        it('testing------- ADD COMMENT ------action- catch case', () => {
            let store = mockStore(() => initialState);
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 404,
                    response: {}
                });
            });
            let elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a";
            newslateData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].comments = true;
            return store.dispatch(actions.addComment(newComment.comment, elementId)).catch((error) => {
            });
        })
    })
    describe('testing------- Delete SHOW HIDE ELEMENT ------action', () => {
        it('testing------- Delete SHOW HIDE ELEMENT------action', () => {
            let store = mockStore(() => initialState);
            let elementId = "urn:pearson:work:061ea1a7-f295-4954-910c-7145969011e0";
            let parentUrn="urn:pearson:entity:d025ec8c-6662-4f3a-a32e-e931116f79e0";
            let type = "show";
            let index = "0-1-1";
            let parentElement ={
                status:"approved"
            };
            let parentElementIndex="1"
            let eleIndex ="0-1-1";
            let parentId ="urn:pearson:manifest:2e052ddf-392f-4e7a-8f2a-01239fa42f43"
            let cb = jest.fn();
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: {}
                });
            });

          //  delete slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
            const expectedActions = [{
                type: DELETE_SHOW_HIDE_ELEMENT,
                payload: slateLevelData
            }];

            
            return store.dispatch(actions.deleteShowHideUnit(elementId, type,parentUrn, index,eleIndex,parentId,cb,parentElement, parentElementIndex)).then(() => {
                expect(cb).toBeCalled();
                 expect(store.getActions()).toEqual(expectedActions);
            });
            
        })
        
    });

    describe('testing------- DELETE ELEMENT------action', () => {
        it('testing------- Delete Element------action', () => {
            let store = mockStore(() => initialState);
            let elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
                contentUrn="urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                type="element-workedexample",
                status =200;
            let asideData = {
                type:"element-aside",
                id:"urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                
            };

            (deleteElement.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter).splice(2, 1);
            const expectedActions = [{
                type: AUTHORING_ELEMENT_CREATED,
                payload: deleteElement
            }];
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: status
                });
            });

            return store.dispatch(actions.deleteElement(elementId,type, "",asideData,contentUrn)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        })
        it('testing------- Delete Element aside type------action', () => {
            let store = mockStore(() => initialState);
            let contentUrn="urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                type="element-workedexample",
                status =200
            let asideData = {
                type:"element-aside",
                id:"urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0b",
            };
            
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: status
                });
            });

            let elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0d";
            (deleteElement.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter).push(
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
            (deleteElement.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[1].elementdata.bodymatter).splice(0, 1);
            const expectedActions = [{
                type: AUTHORING_ELEMENT_CREATED,
                payload: deleteElement
            }];

            let  parentUrn= {
                manifestUrn:"urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0b",
                elementType:"element-aside"
            }

            return store.dispatch(actions.deleteElement(elementId,type,parentUrn,asideData,contentUrn, "1-0")).then(() => {
                // console.log('payload:::', store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter);
                // console.log('payload:::', expectedActions[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter);
                expect(store.getActions()).toEqual(expectedActions);
            });
        })
        it('testing------- Delete Element manifest------action', () => {
            let store = mockStore(() => initialState);
            let contentUrn="urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                type="manifest",
                status =200;
            let asideData = {
                type:"element-aside",
                id:"urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0c",
            };
            
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: status
                });
            });

            let elementId = "urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0c";
            (deleteElement.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[1].elementdata.bodymatter).push(
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
                }
            );
            const expectedActions = [{
                type: AUTHORING_ELEMENT_CREATED,
                payload: deleteElement
            }];

            let  parentUrn= {
                manifestUrn:"urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0b",
                contentUrn:"urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                elementType:"manifest"
            }
            return store.dispatch(actions.deleteElement(elementId,type,parentUrn,asideData,contentUrn, "1-0")).then(() => {
                // console.log('payload:::', store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter);
                // console.log('payload:::', expectedActions[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter);
                expect(store.getActions()).toEqual(expectedActions);
            });
        })
        it('testing------- Delete Element------action-catch case', () => {
            let store = mockStore(() => initialState);
            let elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
                contentUrn="urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                type="element-workedexample",
                status =200;
            let asideData = {
                type:"element-aside",
                id:"urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                
            };

            (deleteElement.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter).splice(2, 1);
            const expectedActions = [{
                type: AUTHORING_ELEMENT_CREATED,
                payload: deleteElement
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
    });

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
                "slateUrn":"urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
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
    
            let  parentUrn= {
                manifestUrn: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                elementType: "element-authoredtext"
            }

            let asideData = {
                type:"element-authoredtext",
                id:"urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                
            };
            
            return store.dispatch(actions.updateElement(updatedData, 0, parentUrn, asideData)).then(() => {
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].projectURN;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateEntity;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
                // console.log('payload:::', store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0]);
                // console.log('payload:::', expectedActions[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0]);
                expect(store.getActions()).toEqual(expectedActions);
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
                glossaryFootnoteReducer:{glossaryFootnoteValue:{elementWorkId:"4343653"},
                glossaryFootNoteCurrentValue:"",
                elementIndex:""
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
                "slateUrn":"urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
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
    
            let  parentUrn= {
                manifestUrn: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                elementType: "element-authoredtext"
            }

            let asideData = {
                type:"element-authoredtext",
                id:"urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                
            };
            
            return store.dispatch(actions.updateElement(updatedData, 0, parentUrn, asideData)).then(() => {
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].projectURN;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateEntity;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
                // console.log('payload:::', store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0]);
                // console.log('payload:::', expectedActions[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0]);
                expect(store.getActions()).toEqual(expectedActions);
            });

        })
        xit('testing------- Update Element Aside------action', () => {
            let store = mockStore(() => initialState);
            let contentUrn="urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464";
            global.currentSlateData = {
                status: 'approved'
            }
    
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: {}
                });
            });

            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].parentType = "element-aside";
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateEntity = "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75";
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].projectURN = "urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef";
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateEntity = "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75";
            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: slateLevelData
            }];
    
            let  parentUrn= {
                manifestUrn:"urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0b",
                elementType:"element-aside"
            }

            let asideData = {
                type:"element-aside",
                id:"urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0d",
            };
    
            const updatedData = {
                "id": "urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0b",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "type": "element-aside",
                "subtype": "sidebar",
                "designtype": "asideSidebar02",
                "elementdata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
                    "frontmatter": [ ],
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
                        }
                    ],
                "backmatter": [ ]
                },
                "contentUrn": "urn:pearson:entity:2b489c98-5e61-46d8-967c-6354b28e3679",
                "versionUrn": "urn:pearson:manifest:591b8d42-7966-4337-912d-0635e328dfb2"
            }

            // return store.dispatch(actions.updateElement(updatedData, 0, asideData, contentUrn)).then(() => {
            return store.dispatch(actions.updateElement(updatedData, "1-0", parentUrn, asideData)).then(() => {
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[1].html;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[1].projectURN;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[1].slateEntity;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[1].parentType;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[1].tcm;
                store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[1].elementdata = updatedData.elementdata;
                // console.log('payload:::', store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[1].elementdata);
                // console.log('payload:::', expectedActions[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[1].elementdata);
                // expect(store.getActions()).toEqual(expectedActions);
            });
        })
        it('testing------- Update Figure Data single index------action', () => {
            let initialState1 = {
                slateLevelData: defaultSlateDataFigure,
                appStore: {slateLevelData:defaultSlateDataFigure},
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
                    numberOfRows: 25
                }
            };
            config.slateManifestURN="urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c"
            let store = mockStore(() => initialState1);
            let elementId = "urn:pearson:work:aca6096b-d0b6-4358-a2c7-313188665d23";
            const expectedActions = [{
              type: AUTHORING_ELEMENT_UPDATE,
                payload:  {slateLevelData:defaultSlateDataFigure},
            }];
    
                
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: 200
                });
            });
         const updateddata ={
             "path":"https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
            "height":"1225",
            "width":"1440",
            "schema":"http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
            "imageid":"urn:pearson:alfresco:600efdb1-a28c-4ec3-8b54-9aad364c8c2c"
         }
            store.dispatch(actions.updateFigureData(updateddata, 2, elementId, ""));
             expect(store.getActions()).toEqual(expectedActions);
        })
     xit('testing------- Update Figure Data double index------action', () => {
            let initialState1 = {
                slateLevelData: defaultSlateDataFigure,
                appStore: {slateLevelData:defaultSlateDataFigure},
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
                    numberOfRows: 25
                }
            };
            config.slateManifestURN="urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c"
            let store = mockStore(() => initialState);
            let elementId = "urn:pearson:work:aca6096b-d0b6-4358-a2c7-313188665d23";
    
            const expectedActions = [
            {
                type: AUTHORING_ELEMENT_UPDATE,
                payload:  {slateLevelData:defaultSlateDataFigure},
            }];
    
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: 200
                });
            });
            const updateddata ={
                "path":"https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
               "height":"1225",
               "width":"1440",
               "schema":"http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
               "imageid":"urn:pearson:alfresco:600efdb1-a28c-4ec3-8b54-9aad364c8c2c"
            }
            store.dispatch(actions.updateFigureData(updateddata, "1-0", elementId));
            // expect(store.getActions()).toEqual(expectedActions);
        })
        it('testing------- Table Editor Data------action', () => {
            let store = mockStore(() => initialState);
            let elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a";
    
            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {}
            }];
    
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: 200
                });
            });
    
            return store.dispatch(actions.getTableEditorData(elementId)).then(() => {
                // expect(store.getActions()).toEqual(expectedActions);
            });
           
        })


    });

    describe('testing------- CREATE SHOW HIDE ELEMENT ------action', () => {
        it('testing------- CREATE SHOW HIDE ELEMENT------action', () => {
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
                    numberOfRows: 25
                },
                glossaryFootnoteReducer:{glossaryFootnoteValue:{elementWorkId:"4343653"}}
            };
            let store = mockStore(() => initialState);
            let elementId = "urn:pearson:work:32e659c2-e0bb-46e8-9605-b8433aa3836c";
            let type = "show";
            let index = "0-1-1";
            let parentContentUrn  = "urn:pearson:manifest:1aa555b9-8fa4-480e-a6b2-40c46315a8eb";
            let parentElement ="";
            let parentElementIndex="1"
            let cb = jest.fn();
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: {}
                });
            });

          //  delete slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].tcm;
            const expectedActions = [{
                type: CREATE_SHOW_HIDE_ELEMENT,
                payload: slateLevelData
            }];

            
            return store.dispatch(actions.createShowHideElement(elementId, type, index,parentContentUrn,cb,parentElement, parentElementIndex)).then(() => {
                //expect(cb).toBeCalled();
                 //expect(store.getActions()).toEqual(expectedActions);
            });
            
        })
     /*    xit('testing------- Update Element Aside------action', () => {
            let store = mockStore(() => initialState);
            let contentUrn="urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464";
            global.currentSlateData = {
                status: 'approved'
            }
    
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: {}
                });
            });

            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].parentType = "element-aside";
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateEntity = "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75";
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].projectURN = "urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef";
            slateLevelData.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].slateEntity = "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75";
            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: slateLevelData
            }];
    
            let  parentUrn= {
                manifestUrn:"urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0b",
                elementType:"element-aside"
            }

            let asideData = {
                type:"element-aside",
                id:"urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0d",
            };
    
            const updatedData = {
                "id": "urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0b",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "type": "element-aside",
                "subtype": "sidebar",
                "designtype": "asideSidebar02",
                "elementdata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
                    "frontmatter": [ ],
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
                        }
                    ],
                "backmatter": [ ]
                },
                "contentUrn": "urn:pearson:entity:2b489c98-5e61-46d8-967c-6354b28e3679",
                "versionUrn": "urn:pearson:manifest:591b8d42-7966-4337-912d-0635e328dfb2"
            }

            // return store.dispatch(actions.updateElement(updatedData, 0, asideData, contentUrn)).then(() => {
            return store.dispatch(actions.updateElement(updatedData, "1-0", parentUrn, asideData)).then(() => {
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[1].html;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[1].projectURN;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[1].slateEntity;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[1].parentType;
                delete store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[1].tcm;
                store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[1].elementdata = updatedData.elementdata;
                // console.log('payload:::', store.getActions()[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[1].elementdata);
                // console.log('payload:::', expectedActions[0].payload.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[1].elementdata);
                // expect(store.getActions()).toEqual(expectedActions);
            });
        }) */
/*         it('testing------- Update Figure Data single index------action', () => {
            let store = mockStore(() => initialState);
            let elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a";
    
            const expectedActions = [{
                type: SET_OLD_IMAGE_PATH,
                payload: {}
            },
            {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {}
            }];
    
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: 200
                });
            });
    
            store.dispatch(actions.updateFigureData({}, 2, elementId));
            // expect(store.getActions()).toEqual(expectedActions);
        })
        it('testing------- Update Figure Data double index------action', () => {
            let store = mockStore(() => initialState);
            let elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a";
    
            const expectedActions = [{
                type: SET_OLD_IMAGE_PATH,
                payload: {}
            },
            {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {}
            }];
    
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: 200
                });
            });
    
            store.dispatch(actions.updateFigureData({}, "1-0", elementId));
            // expect(store.getActions()).toEqual(expectedActions);
        })
        it('testing------- Table Editor Data------action', () => {
            let store = mockStore(() => initialState);
            let elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a";
    
            const expectedActions = [{
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {}
            }];
    
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: 200
                });
            });
    
            return store.dispatch(actions.getTableEditorData(elementId)).then(() => {
                
            });
            // expect(store.getActions()).toEqual(expectedActions);
        })
 */

    });

    describe('testing----------- Citation Element -------------',()=>{
       
        it('testing------- Delete Element citations type------action', () => {
            let store = mockStore(() => initialState2);
            config.slateManifestURN='urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'
            let contentUrn = "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r43",
                type = "element-citation",
                asideData = {
                    type: "citations",
                    id: "urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e",
                },
                parentUrn = {
                    manifestUrn: "urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e5",
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
            (slateWithCitationElement.slateLevelData['urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e'].contents.bodymatter[0].contents.bodymatter).splice(3, 1);
            const expectedActions = [{
                type: AUTHORING_ELEMENT_CREATED,
                payload: { slateLevelData: slateWithCitationElement.slateLevelData}
            }];
        
            return store.dispatch(actions.deleteElement(elementId, type, parentUrn, undefined, contentUrn, "0-3")).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        })

    })
   
});
