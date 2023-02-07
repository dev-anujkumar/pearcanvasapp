import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let initialState = {}
let store = mockStore(() => initialState);
import TabbedTinyMCE from '../../../src/component/ElementTabbed/TabbedTinyMce'

jest.mock('../../../src/component/tinyMceEditor.js', () => {
    return function () {
        return (<div>null</div>)
    }
})

const props = {
    onTabTitleFieldFocus: jest.fn()
}

describe('Testing TabbedTinyMCE component', () => {
    it('Render TabbedTinyMCE : with element key', () => {
        const props = {
            element: { html: { title: "test" } },
        }
        const component = mount(<TabbedTinyMCE {...props} />)
        expect(component.find('.TabbedTinyMCE')).toHaveLength(0)
    })
    it('Render TabbedTinyMCE : without element key', () => {
        const props = {}
        const component = mount(<TabbedTinyMCE {...props} />)
        expect(component.find('.TabbedTinyMCE')).toHaveLength(0)
    })
});


xit('Test onTabTitleFieldFocus', () => {
    const component = mount(<Provider store={store}><TabbedTinyMCE {...props} /></Provider>);
    let elementFigureInstance = component.find('TabbedTinyMCE').instance();
    jest.spyOn(elementFigureInstance, 'onTabTitleFieldFocus')
    elementFigureInstance.onTabTitleFieldFocus('test');
})