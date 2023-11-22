import toolbarReducer from '../../src/appstore/toolbarReducer';
import { TOGGLE_BORDERS, TOGGLE_PAGE_NUMBER, TOGGLE_SPELL_CHECK } from '../../src/constants/Action_Constants';

const INIT_STATE = {
    elemBorderToggle: true,
    pageNumberToggle:false,
    spellCheckToggle: true,
    unlockSlateToggle: false
}
const expectedState={
    ...INIT_STATE,
    elemBorderToggle: false
}
const pageNumberExpectedState={
    ...INIT_STATE,
    pageNumberToggle: true
}
const spellcheckExpectedState={
    ...INIT_STATE,
    spellCheckToggle: false
}
describe('testing Toolbar Reducer cases --', () => {

    it('should return the initial state', () => {
        expect(toolbarReducer(undefined, {})).toEqual(INIT_STATE);
    });
    it('Change elemBorderToggle value ', () => {
     expect(toolbarReducer(INIT_STATE, {
            type: TOGGLE_BORDERS,
            payload: false
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

       it('Change spell check Toggle ', () => {
        expect(toolbarReducer(INIT_STATE, {
               type: TOGGLE_SPELL_CHECK,
               payload: {
                spellCheckToggle: false
               }
           })).toEqual(spellcheckExpectedState);
       })
});

