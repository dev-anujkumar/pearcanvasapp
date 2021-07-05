import reducer from '../../src/appstore/commentsPanelReducer';
import {
    FETCH_COMMENTS,
    TOGGLE_COMMENTS_PANEL,
    REPLY_COMMENT,
    FETCH_COMMENT_BY_ELEMENT,
    RESOLVE_COMMENT,
    TOGGLE_REPLY,
    UPDATE_COMMENT,
    GET_PROJECT_USER,
    UPDATE_ASSIGNEE,
    DELETE_COMMENT,
    ADD_NEW_COMMENT
} from '../../src/constants/Action_Constants';
import { users } from '../../fixtures/commentPanelData';
const initialState = {
    allComments: [{
        "commentType": "comment",
        "commentDateTime": "2019-08-25T04:29:55.633Z",
        "commentAssignee": "c5test01",
        "commentCreator": "c5test01",
        "commentString": "sadsa",
        "commentStatus": "OPEN",
        "commentOnEntity": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a",
        "replyComments": [{
            "commentCreator": "c5test01",
            "commentDateTime": "2019-08-25T04:56:38.241Z",
            "commentOnEntity": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a",
            "commentString": "zxczcczz",
            "commentType": "commentReply"
        }],
        "commentUrn": "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c"
    },
    {
        "commentType": "comment",
        "commentDateTime": "2019-08-25T04:29:55.633Z",
        "commentAssignee": "c5test01",
        "commentCreator": "c5test01",
        "commentString": "tester",
        "commentStatus": "OPEN",
        "commentOnEntity": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",
        "replyComments": [{
            "commentCreator": "c5test01",
            "commentDateTime": "2019-08-25T04:56:38.241Z",
            "commentOnEntity": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",
            "commentString": "zxczcczz",
            "commentType": "commentReply"
        }],
        "commentUrn": "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c"
    },
    {
        "commentType": "comment",
        "commentDateTime": "2019-08-25T04:29:55.633Z",
        "commentAssignee": "c5test01",
        "commentCreator": "c5test01",
        "commentString": "sadsa",
        "commentStatus": "OPEN",
        "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf6",
        "replyComments": [{
            "commentCreator": "c5test01",
            "commentDateTime": "2019-08-25T04:56:38.241Z",
            "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf6",
            "commentString": "zxczcczz",
            "commentType": "commentReply"
        }],
        "commentUrn": "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c"
    }
    ],
    toggleReplyForm: true,
    togglePanel: false,
    users: [],
    slateTitle: "",
    index: null,
    comments: []
}
const initialState2 = {
    allComments: [],
    toggleReplyForm: true,
    togglePanel: false,
    users: [],
    slateTitle: "",
    index: null,
    comments: []
}

describe('testing slateLock Reducer cases -->', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState2);
    });
    xit('Test 1- FETCH_COMMENTS', () => {
        initialState.slateTitle = 'ELMTEST_StgEnv_Krajewski Test';
        expect(reducer(initialState, {
            type: FETCH_COMMENTS,
            payload: {
                comments: initialState.allComments,
                title: 'ELMTEST_StgEnv_Krajewski Test'
            }
        })).toEqual(initialState)
    })
    it('Test 2- FETCH_COMMENT_BY_ELEMENT', () => {
        let stateObj1 = initialState;
        stateObj1.index= 1;
        stateObj1.comments = [];

        expect(reducer(initialState, {
            type: FETCH_COMMENT_BY_ELEMENT,
            payload: {elementId:"urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5",index:1}
        })).toEqual(stateObj1);
    })
    it('Test 3- TOGGLE_COMMENTS_PANEL', () => {
        let stateObj2 = initialState;
        stateObj2.togglePanel = true;
        expect(reducer(initialState, {
            type: TOGGLE_COMMENTS_PANEL,
            payload: true
        })).toEqual(stateObj2);
    })
    it('Test 4- TOGGLE_REPLY', () => {
        let stateObj3 = initialState;
        stateObj3.toggleReplyForm = {toggleReplyForm:true};
        expect(reducer(initialState, {
            type: TOGGLE_REPLY,
            payload: {
                toggleReplyForm: true
            }
        })).toEqual(stateObj3);
    })
    it('Test 5- REPLY_COMMENT', () => {
        let stateObj4 = initialState;
        stateObj4.toggleReplyForm = false;
        stateObj4.comments=[];
        initialState.comments = [{
            "commentType": "comment",
            "commentDateTime": "2019-08-25T04:29:55.633Z",
            "commentAssignee": "c5test01",
            "commentCreator": "c5test01",
            "commentString": "sadsa",
            "commentStatus": "OPEN",
            "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf6",
            "replyComments": [{
                "commentCreator": "c5test01",
                "commentDateTime": "2019-08-25T04:56:38.241Z",
                "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf6",
                "commentString": "zxczcczz",
                "commentType": "commentReply"
            }],
            "commentUrn": "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c"
        }]  
        expect(reducer(initialState, {
            type: REPLY_COMMENT,
            payload: {
                commentUrn: "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c",
                toggleReplyForm: false,
                reply: {
                    commentCreator: "c5test01",
                    commentDateTime: "2019-10-31T04:47:14.950Z",
                    commentOnEntity: "urn:pearson:work:d80809f5-1249-4429-9be3-7577fdccaa1c",
                    commentString: "reply comment added",
                    commentType: "commentReply",
                }
            }
        })).toEqual(stateObj4);
    })
    it('Test 6- RESOLVE_COMMENT', () => {
        let stateObj5 = initialState;
        stateObj5.comments =[];
        
        initialState.comments = [{
            "commentType": "comment",
            "commentDateTime": "2019-08-25T04:29:55.633Z",
            "commentAssignee": "c5test01",
            "commentCreator": "c5test01",
            "commentString": "sadsa",
            "commentStatus": "OPEN",
            "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf6",
            "replyComments": [{
                "commentCreator": "c5test01",
                "commentDateTime": "2019-08-25T04:56:38.241Z",
                "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf6",
                "commentString": "zxczcczz",
                "commentType": "commentReply"
            }],
            "commentUrn": "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c"
        }]  

        expect(reducer(initialState, {
            type: RESOLVE_COMMENT,
            payload: {
                commentUrn: "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c",
                resolveOrOpen: "RESOLVED"
            }
        })).toEqual(stateObj5)
    })
    it('Test 7- UPDATE_COMMENT', () => {
        let stateObj6 = initialState;
        initialState.comments = [{
            "commentType": "comment",
            "commentDateTime": "2019-08-25T04:29:55.633Z",
            "commentAssignee": "c5test01",
            "commentCreator": "c5test01",
            "commentString": "sadsa",
            "commentStatus": "OPEN",
            "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf6",
            "replyComments": [{
                "commentCreator": "c5test01",
                "commentDateTime": "2019-08-25T04:56:38.241Z",
                "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf6",
                "commentString": "zxczcczz",
                "commentType": "commentReply"
            }],
            "commentUrn": "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c"
        }]  

        expect(reducer(initialState, {
            type: UPDATE_COMMENT,
            payload: {
                commentUrn: "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c",
                updateComment: "comment updated"
            }
        })).toEqual(stateObj6);
    })
    xit('Test 8- GET_PROJECT_USER', () => {
        let stateObj7 = initialState;
        expect(reducer(initialState, {
            type: GET_PROJECT_USER,
            payload: users

        })).toEqual(stateObj7);
    })
    it('Test 9- UPDATE_ASSIGNEE', () => {
        let stateObj8 = initialState;
        stateObj8.comments =[];
        initialState.comments = [{
            "commentType": "comment",
            "commentDateTime": "2019-08-25T04:29:55.633Z",
            "commentAssignee": "c5test01",
            "commentCreator": "c5test01",
            "commentString": "sadsa",
            "commentStatus": "OPEN",
            "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf6",
            "replyComments": [{
                "commentCreator": "c5test01",
                "commentDateTime": "2019-08-25T04:56:38.241Z",
                "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf6",
                "commentString": "zxczcczz",
                "commentType": "commentReply"
            }],
            "commentUrn": "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c"
        }]  

        expect(reducer(initialState, {
            type: UPDATE_ASSIGNEE,
            payload: {
                commentUrn: "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c",
                newAssignee: "test"
            }
        })).toEqual(stateObj8);
    })
    it('Test 10- DELETE_COMMENT', () => {
        let stateObj9 = initialState;
        initialState.comments = [{
            "commentType": "comment",
            "commentDateTime": "2019-08-25T04:29:55.633Z",
            "commentAssignee": "c5test01",
            "commentCreator": "c5test01",
            "commentString": "sadsa",
            "commentStatus": "OPEN",
            "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf6",
            "replyComments": [{
                "commentCreator": "c5test01",
                "commentDateTime": "2019-08-25T04:56:38.241Z",
                "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf6",
                "commentString": "zxczcczz",
                "commentType": "commentReply"
            }],
            "commentUrn": "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c"
        }]  

        expect(reducer(initialState, {
            type: DELETE_COMMENT,
            payload: "urn:pearson:comment:90a27e87-9630-47e32435-a5d8-ef2fe0e3626c"
        })).toEqual(stateObj9);
    })
    it('Test 11- ADD_NEW_COMMENT', () => {
        let stateObj10 = initialState;
        stateObj10.allComments.push({
            commentAssignee: "c5test01",
            commentCreator: "c5test01",
            commentDateTime: "2019-10-31T04:44:35.708Z",
            commentOnEntity: "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf6",
            commentStatus: "OPEN",
            commentString: "new comment added",
            commentType: "comment",
            commentUrn: "urn:pearson:comment:96222dd8-48a4-4678-9c84-b397b0485565",
            replyComments: [],
        });
        stateObj10.comments = [{
                  "commentAssignee": "c5test01",
                   "commentCreator": "c5test01",
                  "commentDateTime": "2019-10-31T04:44:35.708Z",
                   "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf6",
                  "commentStatus": "OPEN",
                  "commentString": "new comment added",
                   "commentType": "comment",
                 "commentUrn": "urn:pearson:comment:96222dd8-48a4-4678-9c84-b397b0485565",
                  "replyComments": [],
                 }];
        expect(reducer(initialState, {
            type: ADD_NEW_COMMENT,
            payload: {
                commentAssignee: "c5test01",
                commentCreator: "c5test01",
                commentDateTime: "2019-10-31T04:44:35.708Z",
                commentOnEntity: "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf6",
                commentStatus: "OPEN",
                commentString: "new comment added",
                commentType: "comment",
                commentUrn: "urn:pearson:comment:96222dd8-48a4-4678-9c84-b397b0485565",
                replyComments: [],
            }
        })).not.toEqual(stateObj10)
    })

});