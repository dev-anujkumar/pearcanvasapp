import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Toast from '../../../src/component/Toast/Toast.jsx';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../../src/component/Toast/ToastActions.js', () => ({
    showToastMessage: jest.fn(),
    setToastMessage: jest.fn()
}));
let initialState={
    appStore: {
        toastMessage: "Test Message"
    }
}
describe('Testing Toast component', () => {
    let store = mockStore(initialState);
    let props = {
        active: true
    }
    const component = mount(<Provider store={store}><Toast {...props} /></Provider>)
    const instance = component.find('Toast').instance();
    it('Test Toast- Render without crashing', () => {
        expect(component.find('div#toast-message')).toHaveLength(1);
    })
    it('Test hideToast', () => {
        let sypFunc = jest.spyOn(instance, 'hideToast')
        instance.hideToast();
        expect(sypFunc).toHaveHaveBeenCalled();
        expect(component.find('div#toast-message')).toHaveLength(1);
    })
});