import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as selectActions from '../../../src/component/TcmSnapshots/TcmSnapshot_Actions.js';
const middlewares = [thunk];
import moxios from 'moxios';
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
        };
        moxios.install();
    });


    afterEach(() => moxios.uninstall());
    it('handle tcmdata -slate level', () => {
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
    it('handle tcmdata -slate level cos converted', () => {
        let slateManifestUrn = "urn:pearson:manifest:bca66109-2c69-4b1b-bea9-a057fd073d54"
        let slateEntityUrn = "urn:pearson:entity:ba31d1d1-b049-4467-a68f-ffdb610e4549"

        store = mockStore(() => initialState);
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200
            });
        });
        return store.dispatch(selectActions.tcmSnapshot(slateManifestUrn, slateEntityUrn)).then(() => {
        })
    });
    it('handle tcmdata -slate level cos converted catch statement', () => {
        let slateManifestUrn = "urn:pearson:manifest:bca66109-2c69-4b1b-bea9-a057fd073d54"
        let slateEntityUrn = "urn:pearson:entity:ba31d1d1-b049-4467-a68f-ffdb610e4549"
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 404,
                response: {}
            });
        });
        return store.dispatch(selectActions.tcmSnapshot(slateManifestUrn, slateEntityUrn)).catch((error) => {
        })


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

