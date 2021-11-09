import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import * as actions from '../../../src/component/CanvasWrapper/SlateLock_Actions';
import { SET_SLATE_LOCK_STATUS, SET_LOCK_FLAG } from '../../../src/constants/Action_Constants'
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.mock('axios');
const callback = jest.fn();
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
    it('testing-- getSlateLockStatus  then', () => {
        let projectUrn = "urn:pearson:distributable:7fd85d45-fd60-4e0e-8491-a9b5c9677ee8",
            slateId = "urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d"
        store = mockStore(() => initialState);
        let newRes2 = {
            status: 200,
            data: {
                isLocked: false,
                timestamp: "",
                userId: ""
            }
        }
        let dispatch = (obj) => {
            expect(obj.type).toBe(SET_SLATE_LOCK_STATUS);
        };
        axios.get = jest.fn(() => Promise.resolve(newRes2));
        actions.getSlateLockStatus(projectUrn, slateId)(dispatch)
    })
    it('testing-- getSlateLockStatus  catch', () => {
        let projectUrn = "urn:pearson:distributable:7fd85d45-fd60-4e0e-8491-a9b5c9677ee8",
            slateId = "urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d"
        store = mockStore(() => initialState);
        axios.get = jest.fn(() => Promise.reject({}));
        const spyFunction = jest.spyOn(actions, 'getSlateLockStatus');
        actions.getSlateLockStatus(projectUrn, slateId)
        expect(callback).not.toBeCalled();
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    })
    it('testing-- getSlateLockStatusWithCallback  then', () => {
        let projectUrn = "urn:pearson:distributable:7fd85d45-fd60-4e0e-8491-a9b5c9677ee8",
            slateId = "urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d"
        store = mockStore(() => initialState);
        let newRes1 = {
            status: 200,
            data: {
                slateStatus: false,
                timestamp: "",
                userId: ""
            }
        };
        axios.get = jest.fn(() => Promise.resolve(newRes1));
        return actions.getSlateLockStatusWithCallback(projectUrn, slateId, callback).then(() => {
            expect(callback).toBeCalled()
        })
    })
    it('testing-- getSlateLockStatusWithCallback  then no callback', () => {
        let projectUrn = "urn:pearson:distributable:7fd85d45-fd60-4e0e-8491-a9b5c9677ee8",
            slateId = "urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d"
        store = mockStore(() => initialState);
        let newRes1 = {
            status: 200,
            data: {
                slateStatus: false,
                timestamp: "",
                userId: ""
            }
        };
        axios.get = jest.fn(() => Promise.resolve(newRes1));
        return actions.getSlateLockStatusWithCallback(projectUrn, slateId).then(() => {
            expect(callback).not.toBeCalled()
        })
    })
    it('testing-- getSlateLockStatusWithCallback  catch', () => {
        let projectUrn = "urn:pearson:distributable:7fd85d45-fd60-4e0e-8491-a9b5c9677ee8",
            slateId = "urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d"
        store = mockStore(() => initialState);
        axios.get = jest.fn(() => Promise.reject({}));
        const spyFunction = jest.spyOn(actions, 'getSlateLockStatusWithCallback');
        return actions.getSlateLockStatusWithCallback(projectUrn, slateId).catch(() => {
            expect(callback).not.toBeCalled();
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
    })
    it('testing-- setSlateLock  then', () => {
        const newRes = {
            status: 200,
            data: {
                slateStatus: false,
                timestamp: "",
                userId: ""
            }
        }
        axios.post = jest.fn(() => Promise.resolve(newRes));
        let projectUrn = "urn:pearson:distributable:7fd85d45-fd60-4e0e-8491-a9b5c9677ee8",
            slateId = "urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d"
        store = mockStore(() => initialState);
        return store.dispatch(actions.setSlateLock(projectUrn, slateId)).then(() => {
            const { type } = store.getActions()[0];
            expect(type).toBe(SET_LOCK_FLAG);
        });
    })
    it('testing-- setSlateLock  catch', () => {
        let projectUrn = "urn:pearson:distributable:7fd85d45-fd60-4e0e-8491-a9b5c9677ee8",
            slateId = "urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d"
        axios.post = jest.fn(() => Promise.reject({}));
        store = mockStore(() => initialState);
        const spyFunction = jest.spyOn(actions, 'setSlateLock');
        return store.dispatch(actions.setSlateLock(projectUrn, slateId)).catch(() => {
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
    })
    it('testing-- releaseSlateLock  then', () => {
        const newRes = {
            status: 200,
            data: {
                slateStatus: false,
                timestamp: "",
                userId: ""
            }
        }
        axios.post = jest.fn(() => Promise.resolve(newRes));
        let projectUrn = "urn:pearson:distributable:7fd85d45-fd60-4e0e-8491-a9b5c9677ee8",
            slateId = "urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d"
        store = mockStore(() => initialState);
        return store.dispatch(actions.releaseSlateLock(projectUrn, slateId)).then(() => {
            const { type } = store.getActions()[0];
            expect(type).toBe(SET_LOCK_FLAG);
        });
    })
    it('testing-- releaseSlateLock  catch', () => {
        let projectUrn = "urn:pearson:distributable:7fd85d45-fd60-4e0e-8491-a9b5c9677ee8",
            slateId = "urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d"
        axios.post = jest.fn(() => Promise.reject({}));
        store = mockStore(() => initialState);
        const spyFunction = jest.spyOn(actions, 'releaseSlateLock');
        return store.dispatch(actions.releaseSlateLock(projectUrn, slateId)).catch(() => {
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        })
    });
    it('testing-- releaseSlateLockWithCallback  then', () => {
        let projectUrn = "urn:pearson:distributable:7fd85d45-fd60-4e0e-8491-a9b5c9677ee8",
            slateId = "urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d"
        axios.post = jest.fn(() => Promise.resolve({ data: {} }));
        return actions.releaseSlateLockWithCallback(projectUrn, slateId, callback).then(() => {
            expect(callback).toBeCalled();
        })
    })
    it('testing-- releaseSlateLockWithCallback  then no callback', () => {
        let projectUrn = "urn:pearson:distributable:7fd85d45-fd60-4e0e-8491-a9b5c9677ee8",
            slateId = "urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d"
        axios.post = jest.fn(() => Promise.resolve({ data: {} }));
        return actions.releaseSlateLockWithCallback(projectUrn, slateId).then(() => {
            expect(callback).not.toBeCalled();
        })
    })
    it('testing-- releaseSlateLockWithCallback  catch', () => {
        let projectUrn = "urn:pearson:distributable:7fd85d45-fd60-4e0e-8491-a9b5c9677ee8",
            slateId = "urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d"
        const spyFunction = jest.spyOn(actions, 'releaseSlateLockWithCallback');
        axios.post = jest.fn(() => Promise.reject({}));
        actions.releaseSlateLockWithCallback(projectUrn, slateId, callback)
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    })
    it('testing-- releaseSlateLockWithCallback  catch no callback', () => {
        let projectUrn = "urn:pearson:distributable:7fd85d45-fd60-4e0e-8491-a9b5c9677ee8",
            slateId = "urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d"
        const spyFunction = jest.spyOn(actions, 'releaseSlateLockWithCallback');
        axios.post = jest.fn(() => Promise.reject({}));
        actions.releaseSlateLockWithCallback(projectUrn, slateId)
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    })
    it('testing-- setLockPeriodFlag  action', () => {
        let dispatch = (obj) => {
            expect(obj.type).toBe(SET_LOCK_FLAG);
            expect(obj.payload).toEqual(true);
        };
        const spyFunction = jest.spyOn(actions, 'setLockPeriodFlag');
        actions.setLockPeriodFlag(true)(dispatch)
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    })
    it('testing-- getSlateLockStatus  then', () => {
        let projectUrn = "urn:pearson:distributable:7fd85d45-fd60-4e0e-8491-a9b5c9677ee8",
            slateId = "urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d"
        store = mockStore(() => initialState);
        let newRes2 = {
            status: 200,
            data: {
                isLocked: false,
                timestamp: "",
                userId: ""
            }
        }
        let dispatch = (obj) => {
            expect(obj.type).toBe(SET_SLATE_LOCK_STATUS);
        };
        axios.get = jest.fn(() => Promise.resolve(newRes2));
        actions.getSlateLockStatus(projectUrn, slateId)(dispatch)
    })
})