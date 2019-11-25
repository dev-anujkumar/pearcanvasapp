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
    comments: []
}
const initialState2 = {
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
        "commentUrn": "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e36261"
    }
    ],
    toggleReplyForm: true,
    togglePanel: false,
    users: [],
    slateTitle: "",
    comments: [{
        "commentType": "comment",
        "commentDateTime": "2019-08-25T04:29:55.633Z",
        "commentAssignee": "c5test01",
        "commentCreator": "c5test01",
        "commentString": "tester",
        "commentStatus": "OPEN",
        "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf6",
        "replyComments": [{
            "commentCreator": "c5test01",
            "commentDateTime": "2019-08-25T04:56:38.241Z",
            "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf6",
            "commentString": "zxczcczz",
            "commentType": "commentReply"
        }],
        "commentUrn": "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e36261"
    }, {
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
    },
    ]
}

describe('testing slateLock Reducer cases -->', () => {

    xit('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });
    it('Test 1- FETCH_COMMENTS', () => {
        reducer(initialState, {
            type: FETCH_COMMENTS,
            payload: {
                allComments: initialState.allComments,
                slateTitle: 'ELMTEST_StgEnv_Krajewski Test'
            }
        })
    })
    xit('Test 2- FETCH_COMMENT_BY_ELEMENT', () => {
        reducer(initialState, {
            type: FETCH_COMMENT_BY_ELEMENT,
            payload: "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5"
        })
    })
    it('Test 3- TOGGLE_COMMENTS_PANEL', () => {
        reducer(initialState, {
            type: TOGGLE_COMMENTS_PANEL,
            payload: true
        })
    })
    it('Test 4- TOGGLE_REPLY', () => {
        reducer(initialState, {
            type: TOGGLE_REPLY,
            payload: {
                toggleReplyForm: true
            }
        })
    })
    it('Test 5- REPLY_COMMENT', () => {
        reducer(initialState2, {
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
        })
    })
    it('Test 6- RESOLVE_COMMENT', () => {
        reducer(initialState2, {
            type: RESOLVE_COMMENT,
            payload: {
                commentUrn: "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c",
                resolveOrOpen: "RESOLVED"
            }
        })
    })
    it('Test 7- UPDATE_COMMENT', () => {
        reducer(initialState2, {
            type: UPDATE_COMMENT,
            payload: {
                commentUrn: "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c",
                updateComment: "comment updated"
            }
        })
    })
    it('Test 8- GET_PROJECT_USER', () => {
        reducer(initialState, {
            type: GET_PROJECT_USER,
            payload: users

        })
    })
    it('Test 9- UPDATE_ASSIGNEE', () => {
        reducer(initialState2, {
            type: UPDATE_ASSIGNEE,
            payload: {
                commentUrn: "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c",
                newAssignee: "test"
            }
        })
    })
    it('Test 10- DELETE_COMMENT', () => {
        reducer(initialState2, {
            type: DELETE_COMMENT,
            payload: "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c"
        })
    })
    it('Test 11- ADD_NEW_COMMENT', () => {
        reducer(initialState2, {
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
        })
    })

});