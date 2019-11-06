import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actions from '../../../src/component/CanvasWrapper/SlateLock_Actions';
import { SET_SLATE_LOCK_STATUS, SET_LOCK_FLAG } from '../../../src/constants/Action_Constants'
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import { spy, stub } from 'sinon';

const callback = new stub();
let initialState = {
    slateLockInfo: {
        isLocked: false,
        timestamp: "",
        userId: ""
    },
    withinLockPeriod: false
};

describe('Tests slateLock  action', () => {
    let store = mockStore(() => initialState);

    beforeEach(() => {
        initialState = {
            slateLockInfo: {
                isLocked: false,
                timestamp: "",
                userId: ""
            },
            withinLockPeriod: false
        };

        moxios.install();
    });

    afterEach(() => moxios.uninstall());
    it('testing-- getSlateLockStatus  action', () => {
        let projectUrn = "urn:pearson:distributable:7fd85d45-fd60-4e0e-8491-a9b5c9677ee8",
            slateId = "urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d"
        store = mockStore(() => initialState);
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    isLocked: false,
                    timestamp: "",
                    userId: ""
                }
            });
        });

        return store.dispatch(actions.getSlateLockStatus(projectUrn, slateId)).then(() => {
            const { type, payload } = store.getActions()[0];
            expect(type).toBe(SET_SLATE_LOCK_STATUS);

        })
    })
    it('testing-- getSlateLockStatusWithCallback  action', () => {
        let projectUrn = "urn:pearson:distributable:7fd85d45-fd60-4e0e-8491-a9b5c9677ee8",
            slateId = "urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d"
        store = mockStore(() => initialState);
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    slateStatus: false,
                    timestamp: "",
                    userId: ""
                }
            });
        });

        actions.getSlateLockStatusWithCallback(projectUrn, slateId, callback).then(()=>{
            callback(response)
        })
    })

    it('testing-- setSlateLock  action', () => {
        let projectUrn = "urn:pearson:distributable:7fd85d45-fd60-4e0e-8491-a9b5c9677ee8",
            slateId = "urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d"
        store = mockStore(() => initialState);
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    slateStatus: false,
                    timestamp: "",
                    userId: ""
                }
            });
        });

        return store.dispatch(actions.setSlateLock(projectUrn, slateId)).then(() => {

        });
    })
    it('testing-- releaseSlateLock  action', () => {
        let projectUrn = "urn:pearson:distributable:7fd85d45-fd60-4e0e-8491-a9b5c9677ee8",
            slateId = "urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d"
        store = mockStore(() => initialState);
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    slateStatus: false,
                    timestamp: "",
                    userId: ""
                }
            });
        });

        return store.dispatch(actions.releaseSlateLock(projectUrn, slateId)).then(() => {
            const { type, payload } = store.getActions()[0];
            expect(type).toBe(SET_LOCK_FLAG);

        });
    })
    it('testing-- releaseSlateLockWithCallback  action', () => {
        let projectUrn = "urn:pearson:distributable:7fd85d45-fd60-4e0e-8491-a9b5c9677ee8",
            slateId = "urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d"
        store = mockStore(() => initialState);
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    slateStatus: false,
                    timestamp: "",
                    userId: ""
                    
                }
            });
        });
        actions.releaseSlateLockWithCallback(projectUrn, slateId, callback).then(()=>{
            callback(response);
        })
    })

    it('testing-- setLockPeriodFlag  action', () => {
        store = mockStore(() => initialState);
        store.dispatch(actions.setLockPeriodFlag(true))
        const { type, payload } = store.getActions()[0];
        expect(type).toBe(SET_LOCK_FLAG);

    })
})