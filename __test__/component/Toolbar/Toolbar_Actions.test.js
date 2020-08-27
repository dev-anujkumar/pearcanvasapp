import {
    toggleElemBordersAction, togglePageNumberAction
} from '../../../src/component/Toolbar/Toolbar_Actions'

jest.mock('../../../src/constants/Action_Constants', ()=> {
    return {
        TOGGLE_BORDERS : 'TOGGLE_BORDERS',
        TOGGLE_PAGE_NUMBER: 'TOGGLE_PAGE_NUMBER'

    }
})

describe('testingToolbarActions',() => {
    it('testing------- toggline element border  action', () => {
        let result = toggleElemBordersAction();
        expect(result).toMatchObject({
            type: 'TOGGLE_BORDERS'
        });
    })
    it('testing------- toggline element border  action', () => {
        let result = togglePageNumberAction();
        expect(result).toMatchObject({
            type: 'TOGGLE_PAGE_NUMBER'
        });
    })
})