import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
// import MockAdapter from 'axios-mock-adapter';
import * as actions from '../../../../canvas-stabilization/src/component/Toolbar/Search/Search_Action';
import axios from 'axios';
//import config from './../../../config/config';
import { fetchSlateData } from './../../../src/component/CanvasWrapper/CanvasWrapper_Actions';
import { SET_SEARCH_URN, SET_COMMENT_SEARCH_URN } from './../../../src/constants/Search_Constants';
import { async } from 'q';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let initialState = {
    value: false,
    index: 0,
};
jest.mock('axios');
jest.mock('../../../src/appstore/store', () => {
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
jest.mock('./../../../src/component/CanvasWrapper/CanvasWrapper_Actions', () => ({
    fetchSlateData: jest.fn()
}))
jest.mock('../../../src/config/config.js', () => ({
    slateEntityURN: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
    slateManifestURN: "urn:pearson:manifest:d91706aa-0e9b-4015-aaef-fb3a9cf46ec0",
    projectUrn: "urn:pearson:distributable:977c95a8-e16a-413c-bfd0-788fd2a3698d",
}))



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
                // expect(obj.payload.usageTypeList).toEqual(MockUsageTypeList_Data);
                expect(obj.payload.entityType).toEqual(entityType);
            }
            const spyFunction = jest.spyOn(actions, 'setScroll');
            //axios.get = jest.fn(() => Promise.resolve(responseData));
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
                // expect(obj.payload.usageTypeList).toEqual(MockUsageTypeList_Data);
                expect(obj.payload.entityType).toEqual(entityType);
            }
            const spyFunction = jest.spyOn(actions, 'setScroll');
            //axios.get = jest.fn(() => Promise.resolve(responseData));
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
    });
    describe('Testing------- getCommentElements', () => {
        it('Testing------- getCommentElements-Then', async () => {
            let responseData = {
                data: mockdata,
                payload: q
            }
            let expectedResult = {
                type: SET_COMMENT_SEARCH_URN,
                payload, parent, scroll: false, scrollTop: 0
            }
            let dispatch = (obj) => {
                if (obj && obj.type === SET_COMMENT_SEARCH_URN) {
                    expect(obj.payload.scroll).toEqual(false);
                    expect(obj.payload.scrollTop).toEqual(0);
                }
            }
            const spyFunction = jest.spyOn(actions, 'getCommentElements');
            axios.get = await jest.fn(() => Promise.resolve(responseData));
            actions.getCommentElements()(dispatch);
            axios.get.mockImplementation(() => Promise.resolve(responseData));
            global.fetch = jest.fn().mockImplementationOnce(() => {
                return new Promise((resolve, reject) => {
                    resolve({ json: jest.fn(() => responseData) });
                });
            });
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Testing------- getCommentElements-Catch', () => {
            let dispatch = (obj) => {
                if (obj && obj.type === SET_COMMENT_SEARCH_URN) {
                    expect(obj.payload.scroll).toEqual(true);
                }
            }
            const spyFunction = jest.spyOn(actions, 'getCommentElements');
            axios.get = jest.fn(() => Promise.reject({}));
            actions.getCommentElements()(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('testing------- getCommentElements passing slateEntityUrn and elementEntity  ------', () => {
            const slateEntityUrn = 'urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e';
            let mock = new MockAdapter(axios);
            const responseData = {
                status: 200,
                data: {}
            };
            mock.onGet(`${config.REACT_APP_API_URL}v1/slate/${config.projectUrn}/contentHierarchy/${config.slateEntityURN}/elementids`).reply(200, responseData);
            const spygetCommentElements = jest.spyOn(actions, 'getCommentElements');
            actions.getCommentElements(slateEntityUrn, elementEntity);
            expect(spygetCommentElements).toHaveBeenCalled();
        });
    
        it('testing------- getCommentElements passing no argument for else case ------', () => {
            const spygetCommentElements = jest.spyOn(actions, 'getCommentElements');
            actions.getCommentElements();
            expect(spygetCommentElements).toHaveBeenCalled();
        });
    });
});
