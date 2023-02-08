import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import TabbedTinyMCE from '../../../src/component/ElementTabbed/TabbedTinyMce'
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let initialState = {}
let store = mockStore(() => initialState);

jest.mock('../../../src/component/tinyMceEditor.js', () => {
    return function () {
        return (<div>null</div>)
    }
})

describe('Testing TabbedTinyMCE component', () => {
    it('Render TabbedTinyMCE : with element key', () => {
        const props = {
            element: { html: { title: "test" } },
        }
        let component = mount(<Provider store={store}><TabbedTinyMCE {...props} /></Provider>);
        expect(component.find('.TabbedTinyMCE')).toHaveLength(0)
    })
    it('Render TabbedTinyMCE : without element key', () => {
        const props = {}
        let component = mount(<Provider store={store}><TabbedTinyMCE {...props} /></Provider>);
        expect(component.find('.TabbedTinyMCE')).toHaveLength(0)
    })
});