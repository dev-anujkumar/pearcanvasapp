import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
//import rootReducer from '../../../src/Appstore/rootReducer.js';
import moxios from 'moxios';

import * as actions from '../../../src/component/ElementContainer/ElementContainer_Actions';
// import { comments } from '../../../fixtures/commentPanelData.js'
import { slateLevelData, newslateData } from "../../../fixtures/slateTestingData"
import axios from 'axios';

import { ADD_COMMENT, AUTHORING_ELEMENT_CREATED, AUTHORING_ELEMENT_UPDATE} from '../../../src/constants/Action_Constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = { slateLevelData };

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
            numberOfRows: 25
        }
    };
    let store = mockStore(() => initialState);

    beforeEach(() => {

        moxios.install();
    });

    afterEach(() => moxios.uninstall());
    xit('testing------- ADD COMMENT ------action', () => {
        store = mockStore(() => initialState);
        let newComment = {
            comment: "test",
            commentCreator: "c5test01",
            assignee: "c5test01"
        },
            elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b",
            response={data : {
                commentUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }}

        const expectedActions = [{
            type: ADD_COMMENT,
            payload: newslateData
        }];
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 201,
                response: response
            });
        });

        return store.dispatch(actions.addComment(newComment.comment, elementId)).then(() => {
            const { type, payload } = store.getActions()[0];
        });
    })
    it('testing------- Delete Element------action', () => {
        store = mockStore(() => initialState);
        let newComment = {
            comment: "test",
            commentCreator: "c5test01",
            assignee: "c5test01"
        },
            elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
            contentUrn="urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            type="element-workedexample",
            status =200
            let asideData = {
                type:"element-aside",
                id:"urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                
           };
           let  parentUrn= {
            manifestUrn:"urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
            elementType:"element-aside"
        }
        const expectedActions = [{
            type: AUTHORING_ELEMENT_CREATED,
            payload: slateLevelData
        }];
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: status
            });
        });

        return store.dispatch(actions.deleteElement(elementId,type, "",asideData,contentUrn)).then(() => {
        });
        let  parentUrn1= {
            manifestUrn:"urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
            elementType:"element-aside"
        }
        return store.dispatch(actions.deleteElement(elementId,type,parentUrn1,asideData,contentUrn)).then(() => {
        });
        
    })
    it('testing------- Delete Element aside type------action', () => {
        store = mockStore(() => initialState);
        let newComment = {
            comment: "test",
            commentCreator: "c5test01",
            assignee: "c5test01"
        },
            elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8rre0a",
            contentUrn="urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            type="element-workedexample",
            status =200
            let asideData = {
                type:"element-aside",
                id:"urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                
           };
          
        const expectedActions = [{
            type: AUTHORING_ELEMENT_CREATED,
            payload: slateLevelData
        }];
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: status
            });
        });

        let  parentUrn= {
            manifestUrn:"urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
            elementType:"element-aside"
        }
        return store.dispatch(actions.deleteElement(elementId,type,parentUrn,asideData,contentUrn)).then(() => {
        });
        
    })
    it('testing------- Delete Element manifest------action', () => {
        store = mockStore(() => initialState);
        let 
            elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8rre0as",
            contentUrn="urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            type="manifest",
            status =200
            let asideData = {
                type:"element-aside",
                id:"urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b",
                
           };
          
        const expectedActions = [{
            type: AUTHORING_ELEMENT_CREATED,
            payload: slateLevelData
        }];
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: status
            });
        });

        let  parentUrn= {
            manifestUrn:"urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
            elementType:"manifest"
        }
        return store.dispatch(actions.deleteElement(elementId,type,parentUrn,asideData,contentUrn)).then(() => {
        });
        
    })
    it('testing------- Update Element------action', () => {
        store = mockStore(() => initialState);
        let
            elementId = "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            contentUrn="urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            parentUrn="urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            type="element-workedexample",
            response ={data:{}
            }
            
        const expectedActions = [{
            type: AUTHORING_ELEMENT_UPDATE,
            payload: slateLevelData
        }];
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 201,
                response: response
            });
        });

        return store.dispatch(actions.updateElement("",2)).then(() => {
           
           
        });
        
    })
});
