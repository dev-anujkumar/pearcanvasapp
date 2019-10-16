import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../../../src/Appstore/rootReducer.js';
import moxios from 'moxios';
import * as actions from '../../../src/component/GlossaryFootnotePopup/GlossaryFootnote_Actions';
import axios from 'axios';
import {OPEN_GLOSSARY_FOOTNOTE} from '../../../src/constants/Action_Constants';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let  initialState = {
    glossaaryFootnoteValue:{ "type":"","popUpStatus":false}
};


describe('Tests commentsPanel action', () => {
    let store = mockStore(() => initialState);

    beforeEach(() => {
        initialState = {
             glossaaryFootnoteValue:{ "type":"","popUpStatus":false}
        };

        moxios.install();
    });
   
    afterEach(() => moxios.uninstall());

    it('testing------- glossaaryFootnotePopup  action',()=>{
        store = mockStore(() => initialState);
        let glossaaryFootnoteValue = { "type": "Glossary", "popUpStatus": "true" }
        const expectedActions = [{
            type: OPEN_GLOSSARY_FOOTNOTE,
            payload: glossaaryFootnoteValue
        
        }];
    
         store.dispatch(actions.glossaaryFootnotePopup(true,"Glossary"))
        const { type, payload } = store.getActions()[0];
        expect(type).toBe(OPEN_GLOSSARY_FOOTNOTE);
      //  expect(store.getActions()).toEqual(expectedActions);
     })
})
