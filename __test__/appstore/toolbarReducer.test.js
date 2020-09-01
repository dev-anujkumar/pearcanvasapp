import toolbarReducer from '../../src/appstore/toolbarReducer';
import { TOGGLE_BORDERS, TOGGLE_PAGE_NUMBER } from '../../src/constants/Action_Constants';

const INIT_STATE = {
    elemBorderToggle: true,
    pageNumberToggle:false
}
const expectedState={
    ...INIT_STATE,
    elemBorderToggle: false
}
const pageNumberExpectedState={
    ...INIT_STATE,
    pageNumberToggle: true
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
    it('Change pagenumber value ', () => {
        expect(toolbarReducer(INIT_STATE, {
               type: TOGGLE_PAGE_NUMBER,
               payload: {
                pageNumberToggle: true
               }
           })).toEqual(pageNumberExpectedState);
       })
});

