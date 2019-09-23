import React from 'react'
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import Toolbar from '../../../src/component/Toolbar/'

const mockStore = configureMockStore(middlewares);
const store = mockStore({
    toolbarReducer: {
        elemBorderToggle: true,
    }
});

let wrapper

beforeEach(() => {
    wrapper = mount(<Provider store={store}><Toolbar /></Provider>);
})

describe('Toolbar testing', () => {
    it('Should have 2 Toolbar switch buttons', () => {
        expect(wrapper.find('.switch')).toHaveLength(2)
    }),

    it('Should have 2 input for Toolbar', () => {
        expect(wrapper.find('input')).toHaveLength(2)
    })
})