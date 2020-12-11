import * as toastActions from '../../../src/component/Toast/ToastActions.js';

describe('Testing Toast Actions', () => {
    it('Test 1-showToastMessage', () => {
        let expectedResult = {
            type: 'SHOW_TOAST_MESSAGE',
            payload: true
        }
        let result = toastActions.showToastMessage(true)
        expect(result).toEqual(expectedResult);
    })
    it('Test 2-setToastMessage', () => {
        let expectedResult = {
            type: 'SET_TOAST_MESSAGE',
            payload: "Test Message"
        }
        let result = toastActions.setToastMessage('Test Message')
        expect(result).toEqual(expectedResult);
    })
});