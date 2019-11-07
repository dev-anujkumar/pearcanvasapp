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
const slateLockInfoData ={
    isLocked: false,
    timestamp: "",
    userId: ""
}
const expectedState2={
    slateLockInfo:slateLockInfoData,
    withinLockPeriod: false
}
const expectedState3 = {
    slateLockInfo: slateLockInfoData,
    withinLockPeriod: true
}
describe('testing slateLock Reducer cases -->', () => {

    it('should return the initial state', () => {
        expect(slateLockReducer(undefined, {})).toEqual(initialState);
    });
    it('Test 1- SET SLATE LOCK STATUS', () => {
        expect(slateLockReducer(initialState, {
            type: SET_SLATE_LOCK_STATUS,
            payload: {
                    isLocked: false,
                    timestamp: "",
                    userId: ""
            }
        })).toEqual(expectedState2);
    })
    it('Test 2- SET LOCK FLAG', () => {
        expect(slateLockReducer(initialState, {
            type: SET_LOCK_FLAG,
            payload: true
        })).toEqual(expectedState3);
    })
});
