import {
    toggleElemBordersAction, togglePageNumberAction, toggleSpellCheckAction
} from '../../../src/component/Toolbar/Toolbar_Actions'

jest.mock('../../../src/constants/Action_Constants', ()=> {
    return {
        TOGGLE_BORDERS : 'TOGGLE_BORDERS',
        TOGGLE_PAGE_NUMBER: 'TOGGLE_PAGE_NUMBER',
        TOGGLE_SPELL_CHECK: 'TOGGLE_SPELL_CHECK'

    }
})

describe('testingToolbarActions',() => {
    it('testing------- toggline element border  action', () => {
        const status = true;
        const expectedPayload = {
          type: 'TOGGLE_BORDERS',
          payload: status
        };
        const dispatch = jest.fn();
        toggleElemBordersAction(status)(dispatch);
        expect(dispatch).toHaveBeenCalledWith(expectedPayload);
      });
    it('testing------- toggline element border  action', () => {
        let result = togglePageNumberAction();
        expect(result).toMatchObject({
            type: 'TOGGLE_PAGE_NUMBER'
        });
    })
    it('testing------- toggline element border  action', () => {
        let result = toggleSpellCheckAction();
        expect(result).toMatchObject({
            type: 'TOGGLE_SPELL_CHECK'
        });
    })
})