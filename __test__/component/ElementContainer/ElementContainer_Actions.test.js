import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../../../src/Appstore/rootReducer.js';
import moxios from 'moxios';

import * as actions from '../../../src/component/ElementContainer/ElementContainer_Actions';
// import { comments } from '../../../fixtures/commentPanelData.js'
import { slateLevelData, newslateData } from "../../../fixtures/slateTestingData"
import axios from 'axios';

import { ADD_COMMENT } from '../../../src/constants/Action_Constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = { slateLevelData };

describe('Tests ElementContainer Actions', () => {
    let initialState = {
        slateLevelData: slateLevelData,
        appStore: slateLevelData
    };
    let store = mockStore(() => initialState);

    beforeEach(() => {

        moxios.install();
    });

    afterEach(() => moxios.uninstall());
    it('testing------- ADD COMMENT ------action', () => {
        store = mockStore(() => initialState);
        let newComment = {
            comment: "test",
            commentCreator: "c5test01",
            assignee: "c5test01"
        },
            elementId = "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            data = {
                commentUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }

        const expectedActions = [{
            type: ADD_COMMENT,
            payload: newslateData
        }];
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 201,
                response: data
            });
        });
        console.log("store.getActions()", store.getState())
        return store.dispatch(actions.addComment(newComment.comment, elementId)).then(() => {
            const { type, payload } = store.getActions()[0];
            expect(type).toBe(ADD_COMMENT);
        });
    })
});