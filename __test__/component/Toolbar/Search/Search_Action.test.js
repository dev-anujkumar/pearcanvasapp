import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from '../../../../src/component/Toolbar/Search/Search_Action.js';
import axios from 'axios';
// import { fetchSlateData } from './../../../src/component/CanvasWrapper/CanvasWrapper_Actions';
import { SET_SEARCH_URN, SET_COMMENT_SEARCH_URN } from '../../../../src/constants/Search_Constants';
import config from '../../../../src/config/config';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let initialState = {
    value: false,
    index: 0,
};
// jest.mock('axios');
const axiosMock = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'myCloudProxySession': config.myCloudProxySession
    }
})
jest.mock('../../../../src/appstore/store', () => {
    return {
        getState: () => {
            return {
                searchReducer: {

                    audioData: mockDatadelete.audioData,
                }
            }
        },
        dispatch: () => jest.fn().mockImplementationOnce((cb) => { cb() })
    }
})
jest.mock('../../../../src/component/CanvasWrapper/CanvasWrapper_Actions', () => ({
    fetchSlateData: jest.fn()
}))


const DefaultAssessmentSlateData = {
    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
        "contentUrn": "urn:pearson:entity:c8240c45-ba81-4a8a-8f9e-32b68108eb4e",
        "id": "urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6775cba97b29",
        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
        "type": "manifest",
        "versionUrn": "urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6775cba97b29",
        "contents": {
            "backmatter": [],
            "frontmatter": [],
            "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
            "bodymatter": [
                {
                    "id":"urn:pearson:work:e09f9098-bc7a-410b-9619-c372102cd5b9",
                    "type":"element-authoredtext",
                    "contentUrn":"urn:pearson:entity:2e1a0320-b129-4fb9-920c-e8ce5f4bbc3c"
                },
                {
                    "id":"urn:pearson:work:7af88fe2-0f49-4b28-8f2d-87134201fd9b",
                    "type":"element-authoredtext",
                    "contentUrn":"urn:pearson:entity:2e1a0320-b129-4fb9-920c-e8ce5f4bbc3c"
                },
                {
                    "id":"urn:pearson:work:7af88fe2-0f49-4b28-8f2d-87134201fd9b",
                    "type":"groupedcontent",
                    "contentUrn":"urn:pearson:entity:2e1a0320-b129-4fb9-920c-e8ce5f4bbc3c",
                    "groupeddata": {
                        "bodymatter": [{
                            "id":"urn:pearson:work:e09f9098-bc7a-410b-9619-c372102cd5b9",
                            "type":"element-authoredtext",
                            "contentUrn":"urn:pearson:entity:2e1a0320-b129-4fb9-920c-e8ce5f4bbc3c"
                        },
                        {
                            "id":"urn:pearson:work:7af88fe2-0f49-4b28-8f2d-87134201fd9b",
                            "type":"element-authoredtext",
                            "contentUrn":"urn:pearson:entity:2e1a0320-b129-4fb9-920c-e8ce5f4bbc3c"
                        },
                    ]
                    }
                },
            ]
        }
    }
}

describe('-----------------Testing Search Actions-----------------', () => {
    const mockdata = {
        "urn:pearson:manifest:c565f350-b712-41ef-823a-a66baffa0b89": {
            "id": "urn:pearson:manifest:c565f350-b712-41ef-823a-a66baffa0b89",
            "type": "manifest",
            "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
            "versionUrn": "urn:pearson:manifest:c565f350-b712-41ef-823a-a66baffa0b89",
            "contentUrn": "urn:pearson:entity:ad28b474-d907-4efe-8030-020766580e5f",
            "contents": {
                "bodymatter": [{
                    "id": "urn:pearson:manifest:a9c30179-3738-4fae-9653-d447d88fc689",
                    "type": "element-aside",
                    "subtype": "sidebar",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "designtype": "asideSidebar01",
                    "elementdata": {
                        "bodymatter": [{
                            "id": "urn:pearson:work:c5eca775-db64-4a67-b4ac-3eebb079d56f",
                            "type": "element-authoredtext",
                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                            "elementdata": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": ""
                            },
                            "html": {
                                "text": "<p class=\"paragraphNumeroUno\"><br></p>",
                                "footnotes": {},
                                "assetsPopover": {},
                                "glossaryentries": {},
                                "indexEntries": {}
                            },
                            "versionUrn": "urn:pearson:work:c5eca775-db64-4a67-b4ac-3eebb079d56f",
                            "contentUrn": "urn:pearson:entity:f64b7218-c7af-4922-b58e-29d4a40abc57"
                        }],
                        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
                    },
                    "versionUrn": "urn:pearson:manifest:a9c30179-3738-4fae-9653-d447d88fc689",
                    "contentUrn": "urn:pearson:entity:6c5f9cee-3dd1-49f4-b469-cec1a9bb88af",
                    "status": "wip"
                }],
                "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
            },
            "status": "wip",
            "pageNo": 0,
            "pageCount": 1,
            "pageLimit": 25
        }
    }

    describe('Test-1----------------- setScroll-----------------', () => {
        it('Test-1.1---setScroll-Then- with res.data', () => {
            let entityType = "scrollArgs";
            let responseData = {
                data: mockdata
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe(SET_SEARCH_URN);
                expect(obj.payload.apiStatus).toEqual(200);
                expect(obj.payload.usageTypeList).toEqual(MockUsageTypeList_Data);
                expect(obj.payload.entityType).toEqual(entityType);
            }
            const spyFunction = jest.spyOn(actions, 'setScroll');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            actions.setScroll(entityType)(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-1.2---setScroll-Then- without res.data', () => {
            let entityType = "scrollArgs";
            let responseData = {
                data: []
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe(SET_SEARCH_URN);
                expect(obj.payload.apiStatus).toEqual(200);
                expect(obj.payload.usageTypeList).toEqual(MockUsageTypeList_Data);
                expect(obj.payload.entityType).toEqual(entityType);
            }
            const spyFunction = jest.spyOn(actions, 'setScroll');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            actions.setScroll(entityType)(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();

        });
        it('Test-1.3---setScroll-Catch', () => {
            let entityType = "manifest";
            let dispatch = (obj) => {
                expect(obj.type).toBe(SET_SEARCH_URN);
                expect(obj.payload.apiStatus).toEqual(404);
                expect(obj.payload.usageTypeList).toEqual([]);
                expect(obj.payload.entityType).toEqual(entityType);
            }
            const spyFunction = jest.spyOn(actions, 'setScroll');
            axios.get = jest.fn(() => Promise.reject({}));
            actions.setScroll(entityType)(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('if condition check', () => {
            let scrollArgs = {
                type : 'SET_SEARCH_URN',
                scrollTop : 0
            }
            let getState = () => {
                return {
                    searchReducer: {
                        slateLevelData: "1234"
                    }
                };
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe(SET_SEARCH_URN);
            }
            const spyFunction = jest.spyOn(actions, 'setScroll');
            axios.get = jest.fn(() => Promise.reject({}));
            actions.setScroll(scrollArgs)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
        it('Else if condition check', () => {
            let scrollArgs = {
                type : 'SET_COMMENT_SEARCH_URN',
                scrollTop : 0
            }
            let getState = () => {
                return {
                    searchReducer: {
                        slateLevelData: "1234",
                        commentSearchTerm: "abc",
                    },
                    commentSearchReducer: {
                        commentSearchTerm: "abc",
                    }
                };
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe(SET_COMMENT_SEARCH_URN);
            }
            const spyFunction = jest.spyOn(actions, 'setScroll');
            axios.get = jest.fn(() => Promise.reject({}));
            actions.setScroll(scrollArgs)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
    });

    xdescribe('Testing------- getContainerData', () => {
        it('testing 1------- getContainerData passing no argument for else case ------', () => {
            const spygetContainerData = jest.spyOn(actions, 'getContainerData');
            actions.getContainerData();
            expect(spygetContainerData).toHaveBeenCalled();
        });
        it('testing 2------- getContainerData ', () => {
            const spygetContainerData = jest.spyOn(actions, 'getContainerData');
            let dispatch = (obj) => {
                expect(obj.type).toBe(SET_SEARCH_URN);
            }
            config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            let getState = () => {
                return {
                    appStore: {
                        pageNumberData: {},
                        slateLevelData: DefaultAssessmentSlateData,
                        isLearnosityProjectInfo: [],
                    },
                };
            }
            actions.getContainerData()(dispatch, getState);
            expect(spygetContainerData).toHaveBeenCalled();
        });
        it('testing 3------- getContainerData ', () => {
            let dispatch = (obj) => {
                expect(obj.type).toBe(SET_SEARCH_URN);
            }
            config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            let getState = () => {
                return {
                    appStore: {
                        pageNumberData: {},
                        slateLevelData: DefaultAssessmentSlateData,
                        isLearnosityProjectInfo: [],
                    },
                };
            }
            let searchTerm = "urn:pearson:work:e09f9098-bc7a-410b-9619-c372102cd5b9";
            let res = DefaultAssessmentSlateData
            let mock = new MockAdapter(axios);
            mock.onGet(`${config.REACT_APP_API_URL}v1/slate/${config.projectUrn}/contentHierarchy/${config.slateEntityURN}/elementids`,{
                headers: {
                    'Content-Type': 'application/json',
                    'myCloudProxySession': config.myCloudProxySession
                }
            }).reply(200, res);
            const spygetContainerData = jest.spyOn(actions, 'getContainerData');
            axios.get = jest.fn(() => Promise.resolve(res));
            actions.getContainerData(searchTerm)(dispatch, getState)
            expect(spygetContainerData).toHaveBeenCalled();
            spygetContainerData.mockClear();
        });
        it('testing 4------- getContainerData ', () => {
            let dispatch = (obj) => {
                expect(obj.type).toBe(SET_SEARCH_URN);
            }
            config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            let getState = () => {
                return {
                    appStore: {
                        pageNumberData: {},
                        slateLevelData: DefaultAssessmentSlateData,
                        isLearnosityProjectInfo: [],
                    },
                };
            }
            let searchTerm = "urn:pearson:work:7af88fe2-0f49-4b28-8f2d-87134201fd9b";
            let res = DefaultAssessmentSlateData
            let mock = new MockAdapter(axios);
            mock.onGet(`${config.REACT_APP_API_URL}v1/slate/${config.projectUrn}/contentHierarchy/${config.slateEntityURN}/elementids`,{
                headers: {
                    'Content-Type': 'application/json',
                    'myCloudProxySession': config.myCloudProxySession
                }
            }).reply(200, res);
            const spygetContainerData = jest.spyOn(actions, 'getContainerData');
            axios.get = jest.fn(() => Promise.resolve(res));
            actions.getContainerData(searchTerm)(dispatch, getState)
            expect(spygetContainerData).toHaveBeenCalled();
            spygetContainerData.mockClear();
        });
        it('testing 5------- getContainerData ', () => {
            let dispatch = (obj) => {
                expect(obj.type).toBe(SET_SEARCH_URN);
            }
            config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            let getState = () => {
                return {
                    appStore: {
                        pageNumberData: {},
                        slateLevelData: DefaultAssessmentSlateData,
                        isLearnosityProjectInfo: [],
                    },
                };
            }
            let searchTerm = "urn:pearson:manifest:c565f350-b712-41ef-823a-a66baffa0b89";
            let res = DefaultAssessmentSlateData
            let mock = new MockAdapter(axios);
            mock.onGet(`${config.REACT_APP_API_URL}v1/slate/${config.projectUrn}/contentHierarchy/${config.slateEntityURN}/elementids`,{
                headers: {
                    'Content-Type': 'application/json',
                    'myCloudProxySession': config.myCloudProxySession
                }
            }).reply(200, res);
            const spygetContainerData = jest.spyOn(actions, 'getContainerData');
            axios.get = jest.fn(() => Promise.resolve(res));
            actions.getContainerData(searchTerm)(dispatch, getState)
            expect(spygetContainerData).toHaveBeenCalled();
            spygetContainerData.mockClear();
        });
    });
    
    describe('Testing------- getCommentElements', () => {
        it('testing 1------- getCommentElements passing no argument for else case ------', () => {
            const spygetCommentElements = jest.spyOn(actions, 'getCommentElements');
            actions.getCommentElements();
            expect(spygetCommentElements).toHaveBeenCalled();
        });
        it('testing 2------- getCommentElements ', () => {
            let dispatch = (obj) => {
                expect(obj.type).toBe(SET_COMMENT_SEARCH_URN);
            }
            const axiosObject = axios.create({
                headers: {
                    'Content-Type': 'application/json',
                    'myCloudProxySession': config.myCloudProxySession
                }
            });

            config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            let getState = () => {
                return {
                    appStore: {
                        pageNumberData: {},
                        slateLevelData: DefaultAssessmentSlateData,
                        isLearnosityProjectInfo: [],
                    },
                };
            }
            let res = {
                data: DefaultAssessmentSlateData
            }
            const spygetContainerData = jest.spyOn(actions, 'getCommentElements');
            axiosObject.get = jest.fn(() => Promise.resolve(res));
            actions.getCommentElements()(dispatch, getState)
            expect(spygetContainerData).toHaveBeenCalled();
            spygetContainerData.mockClear();
        });
        it('testing 3------- getCommentElements ', () => {
            let dispatch = (obj) => {
                expect(obj.type).toBe(SET_COMMENT_SEARCH_URN);
            }
            let res = DefaultAssessmentSlateData
            let mock = new MockAdapter(axios);
            mock.onGet(`${config.REACT_APP_API_URL}v1/slate/${config.projectUrn}/contentHierarchy/${config.slateEntityURN}/elementids`,{
                headers: {
                    'Content-Type': 'application/json',
                    'myCloudProxySession': config.myCloudProxySession
                }
            }).reply(200, res);
            config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            let getState = () => {
                return {
                    appStore: {
                        pageNumberData: {},
                        slateLevelData: DefaultAssessmentSlateData,
                        isLearnosityProjectInfo: [],
                    },
                };
            }
            let q = "urn:pearson:work:e09f9098-bc7a-410b-9619-c372102cd5b9";
            const spygetContainerData = jest.spyOn(actions, 'getCommentElements');
            actions.getCommentElements(q)(dispatch, getState)
            expect(spygetContainerData).toHaveBeenCalled();
            spygetContainerData.mockClear();
        });
        it('testing 3------- getCommentElements ', () => {
            let dispatch = (obj) => {
                expect(obj.type).toBe(SET_COMMENT_SEARCH_URN);
            }
            let res = DefaultAssessmentSlateData
            let mock = new MockAdapter(axios);
            mock.onGet(`${config.REACT_APP_API_URL}v1/slate/${config.projectUrn}/contentHierarchy/${config.slateEntityURN}/elementids`,{
                headers: {
                    'Content-Type': 'application/json',
                    'myCloudProxySession': config.myCloudProxySession
                }
            }).reply(200, res);
            config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            let getState = () => {
                return {
                    appStore: {
                        pageNumberData: {},
                        slateLevelData: DefaultAssessmentSlateData,
                        isLearnosityProjectInfo: [],
                    },
                };
            }
            let q = "urn:pearson:manifest:c565f350-b712-41ef-823a-a66baffa0b89";
            const spygetContainerData = jest.spyOn(actions, 'getCommentElements');
            actions.getCommentElements(q)(dispatch, getState)
            expect(spygetContainerData).toHaveBeenCalled();
            spygetContainerData.mockClear();
        });
    });
});

it('testing 3------- getContainerData ', () => {
    let getState = () => {
        return {
            appStore: {
                pageNumberData: {},
                slateLevelData: DefaultAssessmentSlateData,
                isLearnosityProjectInfo: [],
            },
        };
    }
    const searchTerm = 'urn:pearson:manifest:c565f350-b712-41ef-823a-a66baffa0b89'
    const responseData = {
        data: {
            "urn:pearson:manifest:c565f350-b712-41ef-823a-a66baffa0b89": {
                contents: {
                    bodymatter: [{
                        "id": "urn:pearson:manifest:c565f350-b712-41ef-823a-a66baffa0b89",
                    }]
                }
            }
        }
    }
    // config.slateManifestURN = "urn:pearson:manifest:c565f350-b712-41ef-823a-a66baffa0b89";
    axios.get = jest.fn(() => Promise.resolve(responseData));
    actions.getContainerData(searchTerm)(jest.fn(), getState)
    // expect(spygetContainerData).toHaveBeenCalled();
    // spygetContainerData.mockClear();
});
