import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
//import rootReducer from '../../../../src/Appstore/rootReducer.js';
import moxios from 'moxios';
import * as actions from '../../../../src/component/AssessmentSlateCanvas/learningTool/learningToolActions';
import axios from 'axios';
import {LT_API_RESULT,
    LT_API_RESULT_FAIL,
    SELECTED_FIGURE,
    PAGINATION,
    LEARNING_TOOL_DIS_VALUE,
    TOGGLE_LT_POPUP,
    GET_DISCIPLINE,
    REMOVE_SELECTED_DATA,
    LINK_BUTTON_DISABLE
  } from '../../../../src/constants/Action_Constants';
  import {tempFiguresForResults,disciplines,selectedResult} from '../../../../fixtures/learningTool'
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.mock('../../../../src/constants/utility.js', () => ({
    sendDataToIframe: jest.fn()
}))

let  initialState = {
    shouldHitApi : false,
    learningToolTypeValue : '',
    apiResponse : [],
    showErrorMsg : true, //should be false
    showLTBody : false,
    learningTypeSelected : false,
    showDisFilterValues : false,
    selectedResultFormApi : '',
    resultIsSelected : false,
    toggleLT : false,
    linkButtonDisable : true,
    apiResponseForDis : [],
    learningToolDisValue : '',
    numberOfRows : 25
};

describe('Tests Learning Tool  action', () => {
    let store = mockStore(() => initialState);

    beforeEach(() => {
        initialState = {
            shouldHitApi : false,
            learningToolTypeValue : '',
            apiResponse : [],
            showErrorMsg : true, //should be false
            showLTBody : false,
            learningTypeSelected : false,
            showDisFilterValues : false,
            selectedResultFormApi : '',
            resultIsSelected : false,
            toggleLT : false,
            linkButtonDisable : true,
            apiResponseForDis : [],
            learningToolDisValue : '',
            numberOfRows : 25
        };

        moxios.install();
    });
   
    afterEach(() => moxios.uninstall());
 xit('testing---toolTypeFilterSelectedAction comment action',()=>{
     let toolType = "knowdl";
     let learningSystem = "knowdl"
    store = mockStore(() => initialState);
    const expectedActions = [{
        type: LT_API_RESULT, payload: {
            apiResponse: tempFiguresForResults,
            learningTypeSelected: true,
            showDisFilterValues: true,
            showLTBody: true,
            learningToolTypeValue: toolType
          }
    
    }];
    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
            status: 200,
            response: tempFiguresForResults
        });
    });

    return store.dispatch(actions.toolTypeFilterSelectedAction(toolType, learningSystem)).then(() => {
        const { type, payload } = store.getActions()[0];
         expect(type).toBe(LT_API_RESULT);
        //expect(payload.title).toBe(title);
    });
 })

 it('testing---learningToolSearchAction comment action',()=>{
    let toolType1 = "knowdl";
    let learningSystem = "knowdl"
   store = mockStore(() => initialState);
   const expectedActions = [{
       type: LT_API_RESULT, payload: {
           apiResponse: tempFiguresForResults,
           learningTypeSelected: true,
           showDisFilterValues: true,
           showLTBody: true,
           learningToolTypeValue: toolType1
         }
   
   }];
   moxios.wait(() => {
       const request = moxios.requests.mostRecent();
       request.respondWith({
           status: 200,
           response: tempFiguresForResults
       });
   });

   return store.dispatch(actions.learningToolSearchAction(toolType1, learningSystem)).then(() => {
       const { type, payload } = store.getActions()[0];
        expect(type).toBe(LT_API_RESULT);
       //expect(payload.title).toBe(title);
   });
})

xit('testing--- openLTFunction action',()=>{
  
   store = mockStore(() => initialState);
   const expectedActions = [{
    type: GET_DISCIPLINE, payload: {
      showDisFilterValues: true,
      apiResponseForDis: disciplines
    }
   }];
   moxios.wait(() => {
       const request = moxios.requests.mostRecent();
       request.respondWith({
           status: 200,
           response: disciplines
       });
   });

   return store.dispatch(actions.openLTFunction ()).then(() => {
       const { type, payload } = store.getActions()[0];
        expect(type).toBe(GET_DISCIPLINE);
       //expect(payload.title).toBe(title);
   });
})

it('testing------- selectedFigureAction   action',()=>{
    store = mockStore(() => initialState);
     let selectedFigure = selectedResult;
    const expectedActions = [{
        type: SELECTED_FIGURE,
        payload: selectedResult
    
    }];

     store.dispatch(actions.selectedFigureAction(selectedResult))
    const { type, payload } = store.getActions()[0];
    expect(type).toBe(SELECTED_FIGURE);
   // expect(store.getActions()).toEqual(expectedActions);
 })

 it('testing------- paginationFunctionAction   action',()=>{
    store = mockStore(() => initialState);
     let numberOfRows = 5;
    const expectedActions = [{
        type: PAGINATION,
        payload: numberOfRows
    
    }];

     store.dispatch(actions.paginationFunctionAction(5))
    const { type, payload } = store.getActions()[0];
    expect(type).toBe(PAGINATION);
 })

 it('testing------- learningToolDisFilterAction   action',()=>{
    store = mockStore(() => initialState);
     let numberOfRows = 5;
    const expectedActions = [{
        type: PAGINATION,
        payload: numberOfRows
    
    }];

     store.dispatch(actions.paginationFunctionAction(5))
    const { type, payload } = store.getActions()[0];
    expect(type).toBe(PAGINATION);
 })

 it('testing------- closeLtAction   action',()=>{
    store = mockStore(() => initialState);
     let toggleLT = false
    const expectedActions = [{
        type: TOGGLE_LT_POPUP,
        payload: toggleLT
    
    }];

     store.dispatch(actions.closeLtAction())
    const { type, payload } = store.getActions()[0];
    expect(type).toBe(TOGGLE_LT_POPUP);
 })

 it('testing------- openLtAction   action',()=>{
    store = mockStore(() => initialState);
     let toggleLT = false
    const expectedActions = [{
        type: TOGGLE_LT_POPUP,
        payload: toggleLT
    
    }];

     store.dispatch(actions.openLtAction())
    const { type, payload } = store.getActions()[0];
    expect(type).toBe(TOGGLE_LT_POPUP);
 })

 it('testing------- getDiscipline   action',()=>{
    store = mockStore(() => initialState);
     let showDisFilterValues = false;
     let apiResponseForDis = disciplines;
    const expectedActions = [{
        type: GET_DISCIPLINE,
        payload: {
            showDisFilterValues,
            apiResponseForDis
        }
    
    }];

     store.dispatch(actions.getDiscipline())
    const { type, payload } = store.getActions()[0];
    expect(type).toBe(GET_DISCIPLINE);
 })

 it('testing------- removeSelectedData   action',()=>{
    store = mockStore(() => initialState);
     store.dispatch(actions.removeSelectedData())
    const { type, payload } = store.getActions()[0];
    expect(type).toBe(REMOVE_SELECTED_DATA);
 })
 it('testing------- linkDisable   action',()=>{
    store = mockStore(() => initialState);
     store.dispatch(actions.linkDisable())
    const { type, payload } = store.getActions()[0];
    expect(type).toBe(LINK_BUTTON_DISABLE);
 })
})
