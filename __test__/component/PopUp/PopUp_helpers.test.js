import * as PopUp_helpers from '../../../src/component/PopUp/PopUp_helpers'

describe('Testing POPUP', () => {
    it('Test 1.1---isPrimaryButtonFocused', () => {
        const spyFunction = jest.spyOn(PopUp_helpers, 'isPrimaryButtonFocused');
        PopUp_helpers.isPrimaryButtonFocused();
        expect(spyFunction).toHaveBeenCalledWith();
        spyFunction.mockClear();
    });
    it('Test 1.2---isSecondaryButtonFocused', () => {
        const spyFunction = jest.spyOn(PopUp_helpers, 'isSecondaryButtonFocused');
        PopUp_helpers.isSecondaryButtonFocused();
        expect(spyFunction).toHaveBeenCalledWith();
        spyFunction.mockClear();
    });
    it('Test 1.3---focusPopupButtons', () => {
        const spyFunction = jest.spyOn(PopUp_helpers, 'focusPopupButtons');
        PopUp_helpers.focusPopupButtons();
        expect(spyFunction).toHaveBeenCalledWith();
        spyFunction.mockClear();
    });
    it('Test 1.4---blurPopupButtons', () => {
        const spyFunction = jest.spyOn(PopUp_helpers, 'blurPopupButtons');
        PopUp_helpers.blurPopupButtons();
        expect(spyFunction).toHaveBeenCalledWith();
        spyFunction.mockClear();
    });
    it('Test 1.5---focusElement', () => {
        const value = "test"
        const spyFunction = jest.spyOn(PopUp_helpers, 'focusElement');
        PopUp_helpers.focusElement(value);
        expect(spyFunction).toHaveBeenCalledWith(value);
        spyFunction.mockClear();
    });
})