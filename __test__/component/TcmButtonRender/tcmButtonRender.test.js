import React from 'react';
import { mount } from 'enzyme';
import TcmButtonsRender from '../../../src/component/TcmButtonsRender/index';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import config from '../../../src/config/config'
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
    tcmReducer: {
        tcmSnapshotData: {},
        elementEditor: 'abc',
        spinnerStatus: true
    },
});
const props = {
    tcmSnapshotData: {
        eURN: 'urn:pearson:work:c5f26743-d2d2-4664-b0df-9ac59e11642b',
        trackChangeApprover: 'c5 Test 05',
        originalLastUpdatedTimestamp: 12345,
        lastUpdatedTimestamp: 12345
    },
    elementEditor: ''
}


describe('Testing PopUp component', () => {
    it('render PopUp component ', () => {
        const div = document.createElement('div');
        const wrapper = mount( <Provider store={store}><TcmButtonsRender {...props} /></Provider> )
        expect(wrapper.find('.expand').exists()).toBe(true);
        expect(wrapper.find('.refresh').exists()).toBe(true);
        expect(wrapper.find('.close').exists()).toBe(true);
    })
    it('onClick handleTCMSPALaunch Function', () => {
        const component = mount(  <Provider store={store}><TcmButtonsRender {...props} /></Provider>);
        component.find('span.expand').simulate('click');
    })
    it('onClick closeTcmPopup Function', () => {
        const component = mount(  <Provider store={store}><TcmButtonsRender {...props} /></Provider>);
        component.find('span.close').simulate('click');
    })
    it('saving condition in handleTCMSPALaunch', () => {
        config.isSavingElement = true
        const component = mount(  <Provider store={store}><TcmButtonsRender {...props} /></Provider>);
        component.find('span.expand').simulate('click');
    })
})