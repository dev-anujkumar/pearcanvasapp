import toolbarReducer from '../../src/appstore/toolbarReducer';
import { TOGGLE_BORDERS } from '../../src/constants/Action_Constants';

const INIT_STATE = {
    elemBorderToggle: true
}
const expectedState={
    elemBorderToggle: false
}
describe('testing Toolbar Reducer cases --', () => {

    it('should return the initial state', () => {
        expect(toolbarReducer(undefined, {})).toEqual(INIT_STATE);
    });
    it('Change elemBorderToggle value ', () => {
     expect(toolbarReducer(INIT_STATE, {
            type: TOGGLE_BORDERS,
            payload: {
                elemBorderToggle: false
            }
        })).toEqual(expectedState);
    })
});

