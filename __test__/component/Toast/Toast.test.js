import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Toast from '../../../src/component/Toast/Toast.jsx';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let initialState={
    appStore: {
        toastMessage: "Test Message"
    }
}
describe('Testing Toast component', () => {
    let store = mockStore(initialState);
    let props1 = {
        active: true,
        showToastMessage: jest.fn()
    }
    let props2 = {
        showToastMessage: jest.fn()
    }
    const component = mount(<Provider store={store}><Toast {...props1} /></Provider>)
    const instance = component.find('Toast').instance();
    it('Test Toast- Render without crashing', () => {
        expect(component.find('div#toast-message')).toHaveLength(1);
    })
    const component2 = mount(<Provider store={store}><Toast {...props2} /></Provider>)
    it('Test Toast- Render without crashing', () => {
        expect(component2.find('div#toast-message')).toHaveLength(0);
    })
    it('Test hideToast', () => {
        let sypFunc = jest.spyOn(instance, 'hideToast')
        instance.hideToast();
        expect(sypFunc).toHaveBeenCalled();
        expect(component.find('div#toast-message')).toHaveLength(1);
    })
});