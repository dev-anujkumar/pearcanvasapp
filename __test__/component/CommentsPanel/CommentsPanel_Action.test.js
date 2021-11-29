import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actions from '../../../src/component/CommentsPanel/CommentsPanel_Action';
import { comments, users } from '../../../fixtures/commentPanelData.js'
import { slateLevelData } from "../../../fixtures/slateTestingData"
import {
    TOGGLE_COMMENTS_PANEL,
    FETCH_COMMENTS,
    REPLY_COMMENT,
    FETCH_COMMENT_BY_ELEMENT,
    RESOLVE_COMMENT,
    UPDATE_COMMENT,
    GET_PROJECT_USER,
    UPDATE_ASSIGNEE,
    DELETE_COMMENT,
    TOGGLE_REPLY,
    UPDATE_ROLE
} from '../../../src/constants/Action_Constants';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.mock('../../../src/constants/utility.js', () => ({
    sendDataToIframe: jest.fn()
}))

jest.mock('../../../src/config/config.js', () => ({
    slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
    projectUrn: "urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef",
    slateEntityURN: "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75"
}))

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
            slateLevelData: slateLevelData,
            appStore: slateLevelData,
            allComments: [],
            toggleReplyForm: true,
            togglePanel: false,
            users: [],
            slateTitle: "",
            commentsPanelReducer: {
                index: "1-0"
            }
        };

        moxios.install();
    });
   
    afterEach(() => moxios.uninstall());
 xit('testing---Fetch comment action',()=>{
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

 xit('testing------- replyComment action',()=>{
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

it('testing------- resolveComment failed response action',()=>{
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
            status: 404,
            response: ""
        });
    });

    return store.dispatch(actions.resolveComment(commentUrn,resolveOrOpen,elementId)).then(() => {
        store.getActions();
    });
})

it('testing------- replyComment  action',()=>{
    store = mockStore(() => initialState);
    let commentUrn = "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c",
        reply= "reply",
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
            response: ""
        });
    });

    return store.dispatch(actions.replyComment(commentUrn,reply,elementId)).then(() => {
        store.getActions();
    });
})

it('testing------- replyComment failed response action',()=>{
    store = mockStore(() => initialState);
    let commentUrn = "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c",
        reply= "reply",
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
            status: 404,
            response: ""
        });
    });

    return store.dispatch(actions.replyComment(commentUrn,reply,elementId)).then(() => {
        store.getActions();
    });
})

it('testing------- fetchComments  action',()=>{
    store = mockStore(() => initialState);
    let contenttUrn = "urn:pearson:entity:010d2056-b55a-453a-ac39-7c6cc9d87e85",
        title= "title",
        currentWorkId= 1234
    const expectedActions = [{
        type: FETCH_COMMENTS,
        payload: {
            comments: [{}, {}]
        }
    }];
    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
            status: 200,
            response: ""
        });
    });

    return store.dispatch(actions.fetchComments(contenttUrn,title)).then(() => {
        const { type, payload } = store.getActions()[0];
        store.getActions();
        expect(type).toBe(FETCH_COMMENTS);
    });
})

it('testing------- fetchComments failed response action',()=>{
    store = mockStore(() => initialState);
    let contenttUrn = "urn:pearson:entity:010d2056-b55a-453a-ac39-7c6cc9d87e85",
        title= "title",
        currentWorkId= 1234
    const expectedActions = [{
        type: FETCH_COMMENTS,
        payload: {
            comments: [{}, {}]
        }
    }];
    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
            status: 404,
            response: ""
        });
    });

    return store.dispatch(actions.fetchComments(contenttUrn,title)).then(() => {
        store.getActions();
    });
})


it('testing------- updateRole  action',()=>{
    store = mockStore(() => initialState);
    let commentUrn = "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c",
     elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b",
     newRole = "adimin"
    const expectedActions = [{
        type: UPDATE_ROLE,
        payload: { commentUrn, newRole: newRole }
    
    }];
    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
            status: 200,
            response: ""
        });
    });

    return store.dispatch(actions.updateRole(commentUrn,newRole, elementId)).then(() => {
        store.getActions();
    });
})

it('testing------- updateRole failed response action',()=>{
    store = mockStore(() => initialState);
    let commentUrn = "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c",
     elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b",
     newRole = "adimin"
    const expectedActions = [{
        type: UPDATE_ROLE,
        payload: { commentUrn, newRole: newRole }
    
    }];
    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
            status: 200,
            response: ""
        });
    });

    return store.dispatch(actions.updateRole(commentUrn,newRole, elementId)).then(() => {
        store.getActions();
    });
})

it('testing------- updateComment  action',()=>{
    store = mockStore(() => initialState);
    let commentUrn = "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c",
     updateComment = {
        comment: "test",
        commentCreator: "c5test01",
        status: "Open"
    },
      elementId = "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5"
    const expectedActions = [{
        type: UPDATE_COMMENT,
        payload: { commentUrn, updateComment: updateComment.comment }
    
    }];
    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
            status: 200,
            response: ""
        });
    });

    return store.dispatch(actions.updateComment(commentUrn,updateComment,elementId)).then(() => {
        store.getActions()[0].payload.updateComment = "test";
        const { type, payload } = store.getActions()[0];
        expect(store.getActions()).toEqual(expectedActions);
        expect(type).toBe(UPDATE_COMMENT);
        expect(payload.commentUrn).toBe(commentUrn);
    });
})

it('testing------- updateComment failed response  action',()=>{
    store = mockStore(() => initialState);
    let commentUrn = "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c",
     updateComment = {
        comment: "test",
        commentCreator: "c5test01",
        status: "Open"
    },
      elementId = "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5"
    const expectedActions = [{
        type: UPDATE_COMMENT,
        payload: { commentUrn, updateComment: updateComment.comment }
    
    }];
    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
            status: 404,
            response: ""
        });
    });

    return store.dispatch(actions.updateComment(commentUrn,updateComment,elementId)).then(() => {
        store.getActions()
    });
})

it('testing------- getProjectUsers  action',()=>{
    store = mockStore(() => initialState);
    let ENTITY_URN = "urn:pearson:entity:3d9363f1-36bb-47ea-8842-9b142027692c";
    const expectedActions = [{
        type: GET_PROJECT_USER,
        payload: users
    
    }];
    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
            status: 200,
            response: ""
        });
    });

    return store.dispatch(actions.getProjectUsers(ENTITY_URN)).then(() => {
        const { type, payload } = store.getActions()[0];
        expect(type).toBe(GET_PROJECT_USER);
    });
})

it('testing------- getProjectUsers failed response action',()=>{
    store = mockStore(() => initialState);
    let ENTITY_URN = "urn:pearson:entity:3d9363f1-36bb-47ea-8842-9b142027692c";
    const expectedActions = [{
        type: GET_PROJECT_USER,
        payload: users
    
    }];
    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
            status: 404,
            response: ""
        });
    });

    return store.dispatch(actions.getProjectUsers(ENTITY_URN)).then(() => {
        store.getActions()
    });
})


it('testing------- updateAssignee  action',()=>{
    store = mockStore(() => initialState);
    let commentUrn = "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c",
    newAssignee = "test",
     elementId = "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5"
    const expectedActions = [{
        type: UPDATE_ASSIGNEE,
        payload: { commentUrn, newAssignee: newAssignee }
    
    }];
    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
            status: 200,
            response: ""
        });
    });

    return store.dispatch(actions.updateAssignee(commentUrn, newAssignee, elementId)).then(() => {
        const { type, payload } = store.getActions()[0];
        expect(type).toBe(UPDATE_ASSIGNEE);
    });
})

it('testing------- updateAssignee failed response  action',()=>{
    store = mockStore(() => initialState);
    let commentUrn = "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c",
    newAssignee = "test",
     elementId = "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5"
    const expectedActions = [{
        type: UPDATE_ASSIGNEE,
        payload: { commentUrn, newAssignee: newAssignee }
    
    }];
    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
            status: 404,
            response: ""
        });
    });

    return store.dispatch(actions.updateAssignee(commentUrn, newAssignee, elementId)).then(() => {
        store.getActions();
    });
})

it('testing------- deleteComment  action',()=>{
    store = mockStore(() => initialState);
    let commentUrn = "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c",
     elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b"
    const expectedActions = [{
        type: DELETE_COMMENT,
        payload: commentUrn
    
    }];
    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
            status: 200,
            response: ""
        });
    });

    return store.dispatch(actions.deleteComment(commentUrn,elementId)).then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions[0]);
    });
})

it('testing------- deleteComment failed response  action',()=>{
    store = mockStore(() => initialState);
    let commentUrn = "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c",
     elementId = "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b"
    const expectedActions = [{
        type: DELETE_COMMENT,
        payload: commentUrn
    
    }];
    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
            status: 200,
            response: ""
        });
    });

    return store.dispatch(actions.deleteComment(commentUrn,elementId)).then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions[0]);
    });
})

it('testing------- fetchCommentByElement  action',()=>{
    store = mockStore(() => initialState);
    let elementId = "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5";

    const expectedActions = [{
        type: FETCH_COMMENT_BY_ELEMENT,
        payload: {
            elementId: elementId,
            index: 1
        }
    
    }];

    store.dispatch(actions.fetchCommentByElement(elementId, 1))
    const { type, payload } = store.getActions()[0];
    expect(type).toBe(FETCH_COMMENT_BY_ELEMENT);
    expect(store.getActions()).toEqual(expectedActions);
   
})
 
it('testing------- toggleCommentsPanel  action',()=>{
    store = mockStore(() => initialState);
     let toggle = true;
    const expectedActions = [{
        type: TOGGLE_COMMENTS_PANEL,
        payload: toggle
    
    }];

     store.dispatch(actions.toggleCommentsPanel(toggle))
    const { type, payload } = store.getActions()[0];
    expect(type).toBe(TOGGLE_COMMENTS_PANEL);
    expect(store.getActions()).toEqual(expectedActions);
})
it('testing------- toggleReply  action',()=>{
    store = mockStore(() => initialState);
     let toggle = true;
    const expectedActions = [{
        type: TOGGLE_REPLY,
        payload: toggle
    
    }];

     store.dispatch(actions.toggleReply(toggle))
    const { type, payload } = store.getActions()[0];
    expect(type).toBe(TOGGLE_REPLY);
    expect(store.getActions()).toEqual(expectedActions);
 })
})