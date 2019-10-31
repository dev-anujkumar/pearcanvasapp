import slateLockReducer from '../../src/appstore/slateLockReducer';
import {
    SET_SLATE_LOCK_STATUS,
    SET_LOCK_FLAG
} from '../../src/constants/Action_Constants';

const initialState = {
    slateLockInfo: {
        isLocked: false,
        timestamp: "",
        userId: ""
    },
    withinLockPeriod: false
}

describe('testing slateLock Reducer cases -->', () => {

    it('should return the initial state', () => {
        expect(slateLockReducer(undefined, {})).toEqual(initialState);
    });
    it('Test 1- SET SLATE LOCK STATUS', () => {
        slateLockReducer(initialState, {
            type: SET_SLATE_LOCK_STATUS,
            payload: {
                slateLockInfo: {
                    isLocked: false,
                    timestamp: "",
                    userId: ""
                }
            }
        })
    })
    it('Test 2- SET LOCK FLAG', () => {
        slateLockReducer(initialState, {
            type: SET_LOCK_FLAG,
            payload: {
                withinLockPeriod: true
            }
        })
    })
});
