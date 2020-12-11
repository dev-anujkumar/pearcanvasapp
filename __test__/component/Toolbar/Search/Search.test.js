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
    searchTerm: '',
    onClose: jest.fn(),
    icons: { searchClose, searchUp, searchDown }
}

let searchObj = mount(<Provider store={store}><SearchComponent {...props} /></Provider>);

describe('Toolbar testing', () => {
    it('Handle Search content change', () => {
        let instance = searchObj.find('SearchComponent').instance();
        // wrapper.find('.collapse-header').simulate('click')
     })
});