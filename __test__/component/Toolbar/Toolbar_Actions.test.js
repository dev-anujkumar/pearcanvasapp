import {
    toggleElemBordersAction, toggleLODropdown
} from '../../../src/component/Toolbar/Toolbar_Actions'

jest.mock('../../../src/constants/Action_Constants', ()=> {
    return {
        TOGGLE_BORDERS : 'TOGGLE_BORDERS',
        TOGGLE_LO_DROPDOWN: 'TOGGLE_LO_DROPDOWN'

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
        let result = toggleLODropdown();
        expect(result).toMatchObject({
            type: 'TOGGLE_LO_DROPDOWN'
        });
    })
})