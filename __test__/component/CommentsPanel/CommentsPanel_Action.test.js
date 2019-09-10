import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../../../src/Appstore/rootReducer.js';
import moxios from 'moxios';

import * as actions from '../../../src/component/CommentsPanel/CommentsPanel_Action';
import { comments,comment, filters, users } from '../../../fixtures/commentPanelData.js'
import axios from 'axios';
import {
    TOGGLE_COMMENTS_PANEL,
    FETCH_COMMENTS,
    REPLY_COMMENT,
    FETCH_COMMENT_BY_ELEMENT,
    RESOLVE_COMMENT,
    TOGGLE_REPLY,
    UPDATE_COMMENT,
    GET_PROJECT_USER,
    UPDATE_ASSIGNEE,
    DELETE_COMMENT
} from '../../../src/constants/Action_Constants';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


let  initialState = {
    allComments: comments,
    toggleReplyForm: true,
    togglePanel: false,
    users: [],
    slateTitle: ""
};

describe('Tests commentsPanel action', () => {
    let store = mockStore(() => initialState);

    beforeEach(() => {
        initialState = {
            allComments: [],
            toggleReplyForm: true,
            togglePanel: false,
            users: [],
            slateTitle: ""
        };

        moxios.install();
    });
   
    afterEach(() => moxios.uninstall());
 it('testing---Fetch comment action',()=>{
    store = mockStore(() => initialState);
    let contentUrn = "urn:pearson:entity:88187e28-1992-4048-8b03-87c6115dd446",
        title = "slate title"
    const expectedActions = [{
        type: FETCH_COMMENTS,
        payload: { comments:comments, title }
    
    }];
    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
            status: 200,
            response: comments
        });
    });

    return store.dispatch(actions.fetchComments(contentUrn, title)).then(() => {
        const { type, payload } = store.getActions()[0];
        expect(type).toBe(FETCH_COMMENTS);
        expect(payload.title).toBe(title);
    });
 })

 it('testing------- replyComment action',()=>{
    store = mockStore(() => initialState);
    let commentUrn = "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c",
    reply = {
        commentType: "commentReply",
        commentCreator: "c5test01",//auth.user.userId,
        commentString: "test",
        commentOnEntity: "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5"
      },
      elementId = "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5"
    const expectedActions = [{
        type: REPLY_COMMENT,
        payload: {
            commentUrn,
            reply,
            toggleReplyForm: false
        }
    
    }]; 
    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
            status: 200,
            response: comments
        });
    }); 

   return store.dispatch(actions.replyComment(commentUrn,reply,elementId)).then(() => {
    const { type, payload } = store.getActions()[0];
    expect(type).toBe(REPLY_COMMENT);
    expect(payload.commentUrn).toBe(commentUrn);
    });
 })

  it('testing------- resolveComment  action',()=>{
    store = mockStore(() => initialState);
    let commentUrn = "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c",
        resolveOrOpen= "RESOLVED",
      elementId = "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5"
    const expectedActions = [{
        type: RESOLVE_COMMENT,
        payload: { commentUrn, resolveOrOpen }
    
    }];
    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
            status: 200,
            response: ""
        });
    });

    return store.dispatch(actions.resolveComment(commentUrn,resolveOrOpen,elementId)).then(() => {
        const { type, payload } = store.getActions()[0];
        expect(store.getActions()).toEqual(expectedActions);
        expect(type).toBe(RESOLVE_COMMENT);
        expect(payload.commentUrn).toBe(commentUrn);
    });
 })
}) 