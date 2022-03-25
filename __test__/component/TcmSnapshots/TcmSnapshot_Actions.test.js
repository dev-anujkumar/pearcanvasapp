import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as selectActions from '../../../src/component/TcmSnapshots/TcmSnapshot_Actions.js';
const middlewares = [thunk];
import moxios from 'moxios';
import axios from 'axios';
import config from '../../../src/config/config';
const mockStore = configureMockStore(middlewares);
let initialState = {}
jest.mock('../../../src/constants/utility.js', () => ({
    sendDataToIframe: jest.fn()
}))
config.projectUrn = "urn:pearson:distributable:ff18cbc0-ab3f-4c7e-9ed0-84eb34f4e126";
describe('TCM snapshot Action test case', () => {
    let store = mockStore(() => initialState);
    beforeEach(() => {
        initialState = {
            tcmSnapshot: [],
            tcmActivatedOnProjectLevel: false,
            appStore: {
                slateLength: 25,
                slateLevelData:{
                    "urn:pearson:manifest:47d368a6-9f8a-4f9b-8efc-6011abc84585": {
                        "contentUrn": "urn:pearson:entity:3e58848c-415e-4681-b7c1-600a69a88c4b",
                        "contents": {
                            "bodymatter": [{
                                "contentUrn": "urn:pearson:entity:9d7acf56-22f0-4983-b6d1-eccd15d6fefc",
                                "id": "urn:pearson:manifest:b4f73a39-709f-470c-a5bc-9d4d165a1595",
                                "popupdata": { bodymatter: [] },
                                "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/popup",
                                "type": "popup",
                                "versionUrn": "urn:pearson:manifest:b4f73a39-709f-470c-a5bc-9d4d165a1595"
                            }]
                        },
                        "id": "urn:pearson:manifest:145f099e-bc9a-4525-9f0a-db58425a2403",
                        "pageCount": 1,
                        "pageLimit": 25,
                        "pageNo": 0,
                        "type": "manifest",
                        "versionUrn": "urn:pearson:manifest:145f099e-bc9a-4525-9f0a-db58425a2403"

                    }
                }
            }
        };
        moxios.install();
    });


    afterEach(() => moxios.uninstall());

    xit('handle tcmdata -slate level if', () => {
        let slateManifestUrn = "urn:pearson:manifest:bca66109-2c69-4b1b-bea9-a057fd073d54"
        let response = {
                elements: [{
                    "elemURN": "urn:pearson:manifest:62a2fba5-7211-45a7-b568-82d49a076303+urn:pearson:work:3bbb7a10-6ecf-4d7c-ae89-6e992039acd3",
                    "isPrevAcceptedTxAvailable": true,
                    "txCnt": 1
                }]
        }
        store = mockStore(() => initialState);
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: response
            });
        });
        return store.dispatch(selectActions.handleTCMData(slateManifestUrn)).then(() => {
            const { type } = store.getActions()[0];
            expect(type).toBe('GET_TCM_RESOURCES');
        })
    });
    it('handle tcmdata -slate level else', () => {
        let slateManifestUrn = "urn:pearson:manifest:bca66109-2c69-4b1b-bea9-a057fd073d54"
        let response = {
            data:
            {
                elements: [{
                    "elemURN": "urn:pearson:manifest:62a2fba5-7211-45a7-b568-82d49a076303+urn:pearson:work:3bbb7a10-6ecf-4d7c-ae89-6e992039acd3",
                    "isPrevAcceptedTxAvailable": true,
                    "txCnt": 0
                }]
            }
        }
        store = mockStore(() => initialState);
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: response
            });
        });
        return store.dispatch(selectActions.handleTCMData(slateManifestUrn)).then(() => {
            const { type } = store.getActions()[0];
            expect(type).toBe('GET_TCM_RESOURCES');
        })
    });
    
    xit('fetchPOPupSlateData', () => {
        let slateManifestUrn = "urn:pearson:manifest:47d368a6-9f8a-4f9b-8efc-6011abc84585"
        config.slateManifestURN="urn:pearson:manifest:47d368a6-9f8a-4f9b-8efc-6011abc84585"
        let element = {
            "contentUrn": "urn:pearson:entity:9d7acf56-22f0-4983-b6d1-eccd15d6fefc",
            "id": "urn:pearson:manifest:b4f73a39-709f-470c-a5bc-9d4d165a1595",
            "popupdata": {
                "bodymatter": [{
                    "contentUrn": "urn:pearson:entity:6bbadbca-358b-4ac1-93ce-2f7f52e9af95",
                    "elementdata": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "" },
                    "html": { text: "<p class='paragraphNumeroUno'><br></p>" },
                    "id": "urn:pearson:work:f4836dd6-393f-41cb-ac27-c1746fecf614",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "status": "wip",
                    "type": "element-authoredtext",
                    "versionUrn": "urn:pearson:work:f4836dd6-393f-41cb-ac27-c1746fecf614"
                }]
            },
            "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/popup",
            "type": "popup",
            "versionUrn": "urn:pearson:manifest:b4f73a39-709f-470c-a5bc-9d4d165a1595"
        }
        store = mockStore(() => initialState);
        let response = {
            "urn:pearson:manifest:47d368a6-9f8a-4f9b-8efc-6011abc84585": {
                "contentUrn": "urn:pearson:entity:5dfc0e5d-b2e0-4aee-9aca-da35af6304fc",
                "contents": {
                    "bodymatter": [{
                        "contentUrn": "urn:pearson:entity:ea40bcee-5fae-4e34-8f4b-e8ed0526815b",
                        "elementdata": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "" },
                        "html": { "text": "<p class='paragraphNumeroUno'><br></p>" },
                        "id": "urn:pearson:work:0dc8459f-c96d-4268-b008-3744ba1dbc6f",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "type": "element-authoredtext",
                        "versionUrn": "urn:pearson:work:0dc8459f-c96d-4268-b008-3744ba1dbc6f"
                    }]
                },
                "id": "urn:pearson:manifest:47d368a6-9f8a-4f9b-8efc-6011abc84585",
                "pageNo": 0,
                "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/popup",
                "status": "wip",
                "type": "popup",
                "versionUrn": "urn:pearson:manifest:47d368a6-9f8a-4f9b-8efc-6011abc84585"
            }
        }
        moxios.wait(() => {
            const request1 = moxios.requests.mostRecent();
            request1.respondWith({
                status: 200,
                response: response
            });
        });
      
        return store.dispatch(selectActions.fetchPOPupSlateData(slateManifestUrn,"urn:pearson:entity:5dfc0e5d-b2e0-4aee-9aca-da35af6304fc",0,element,1)).then(() => {
            const { type } = store.getActions()[0];
            expect(type).toBe('AUTHORING_ELEMENT_UPDATE');
        });
    });
    it('handle tcmdata -slate level catch statement', () => {
        let slateManifestUrn = "urn:pearson:manifest:bca66109-2c69-4b1b-bea9-a057fd073d54"
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 404,
                response: {}
            });
        });
        return store.dispatch(selectActions.handleTCMData(slateManifestUrn)).catch((error) => {
        })
    })
    it('get latest version', async () => {
        let slateManifestUrn = "urn:pearson:entity:ba31d1d1-b049-4467-a68f-ffdb610e4549"
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {}
            });
        });
        await selectActions.getLatestVersion(slateManifestUrn)
       

    })
    it('slateLinkDetails', async () => {
        let slateManifestUrn = "urn:pearson:entity:ba31d1d1-b049-4467-a68f-ffdb610e4549"
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {}
            });
        });
        const spyFunction = jest.spyOn(selectActions, 'slateLinkDetails')
        await selectActions.slateLinkDetails(slateManifestUrn)
        expect(spyFunction).toHaveBeenCalled();
    })
    it('sendElementTcmSnapshot', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {}
            });
        });
        await selectActions.sendElementTcmSnapshot({})
    })
});

describe('Test - callCutCopySnapshotAPI', () => {
    beforeEach(() => {
        jest.mock('axios');
    });
    it('callCutCopySnapshotAPI copy-then', async () => {
        let responseData = {}
        const spyFunction = jest.spyOn(selectActions, 'callCutCopySnapshotAPI');
        axios.post = jest.fn(() => Promise.resolve(responseData));
        await selectActions.callCutCopySnapshotAPI({ operationType: 'copy' })
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    })
    it('callCutCopySnapshotAPI cut then', async () => {
        let responseData = {}
        const spyFunction = jest.spyOn(selectActions, 'callCutCopySnapshotAPI');
        axios.put = jest.fn(() => Promise.resolve(responseData));
        await selectActions.callCutCopySnapshotAPI({ operationType: 'cut' })
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    })
    it('callCutCopySnapshotAPI copy-catch', async () => {
        let responseData = {}
        const spyFunction = jest.spyOn(selectActions, 'callCutCopySnapshotAPI');
        axios.post = jest.fn(() => Promise.reject(responseData));
        await selectActions.callCutCopySnapshotAPI({ operationType: 'copy' })
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    })
    it('callCutCopySnapshotAPIcut-catch', async () => {
        let responseData = {}
        const spyFunction = jest.spyOn(selectActions, 'callCutCopySnapshotAPI');
        axios.put = jest.fn(() => Promise.reject(responseData));
        await selectActions.callCutCopySnapshotAPI({ operationType: 'cut' })
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    })
})