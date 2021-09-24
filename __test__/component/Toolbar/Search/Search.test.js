import React from 'react'
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { searchClose, searchUp, searchDown } from './../../../../src/images/TinyMce/TinyMce.jsx';
import SearchComponent from './../../../../src/component/Toolbar/Search/Search';

const mockStore = configureMockStore(middlewares);
const store = mockStore({});

let props = {
    search: true,
    searchTerm: "test",
    onClose: jest.fn(),
    icons: { searchClose, searchUp, searchDown }
}

let wrapper = mount(<Provider store={store}><SearchComponent {...props} /></Provider>);
describe('Toolbar testing', () => {
    it('Handle Search content change', () => {
        wrapper.find('SearchComponent').instance();
     })
    it('Simulate search Up change', () => {
        let event = {}
        wrapper.find('.actions').childAt(0).simulate('click', event,'prev')
     })
     it('Simulate search Down change', () => {
        let event = {}
        wrapper.find('.actions').childAt(1).simulate('click', event,'next')
     })
     it('Simulate search Close change', () => {
        let event = {}
        wrapper.find('.actions').childAt(2).simulate('click', event)
     })
     it('Simulate onchange on input', () => {
        let event = {}
        wrapper.find('input').simulate('change', event)
     })
});