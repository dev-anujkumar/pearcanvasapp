import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import Tabbed2ColumnContainer from '../../../src/component/ElementTabbed/Tabbed2ColumnContainer'
import config from '../../../src/config/config.js';
import { groupdata } from '../../testData/tabbedElementMockData';

let store = mockStore({
    appStore: {
        slateLevelData: {},
    }
});

describe('Testing Tabbed2ColumnContainer component', () => {
    it('renderTabbedElement : if', () => {
        let props = {
            element: {
                contentUrn: "test",
                groupeddata: groupdata
            },
            onUpdate: jest.fn(),
            onStart: jest.fn(),
        }
        const component = mount(<Provider store={store}><Tabbed2ColumnContainer {...props} /></Provider>);
        component.find('Tabbed2ColumnContainer')
    })
    it('renderTabbedElement : else', () => {
        let props = {
            element: { contentUrn: "test" }
        }
        const component = mount(<Provider store={store}><Tabbed2ColumnContainer {...props} /></Provider>);
        component.find('Tabbed2ColumnContainer')
    })
    it('Sortable onStart', () => {
        let props = {
            element: {
                contentUrn: "test",
                groupeddata: groupdata
            },
            onClickCapture: () => { },
        }
        const wrapper = mount(<Provider store={store}>< Tabbed2ColumnContainer {...props} /> </Provider>)
        const instance = wrapper.find('Sortable').instance();
        instance.props.options.onStart()
        instance.props.onChange();
        expect(instance.props.onChange).toHaveLength(3);
    })
    it('Sortable onUpdate > savingInProgress = true', () => {
        config.savingInProgress = true;
        let props = {
            element: {
                contentUrn: "test",
                groupeddata: groupdata
            },
            setActiveElement: () => { },
            swapElement: () => { },
        }
        const wrapper = mount(<Provider store={store}>< Tabbed2ColumnContainer {...props} /> </Provider>)
        const instance = wrapper.find('Sortable').instance();
        let evt = {
            oldDraggableIndex: 0,
            newDraggableIndex: 1,
            preventDefault: jest.fn(),
            stopPropagation: jest.fn()
        }

        instance.props.options.onUpdate(evt);
        expect(instance.props.options.onUpdate).toHaveLength(1);
    })
    it('Sortable onUpdate > savingInProgress = false', () => {
        config.savingInProgress = false;
        let props = {
            element: {
                contentUrn: "test",
                groupeddata: groupdata
            },
            setActiveElement: () => { },
        }
        const wrapper = mount(<Provider store={store}>< Tabbed2ColumnContainer {...props} /> </Provider>)
        const instance = wrapper.find('Sortable').instance();
        let evt = {
            oldDraggableIndex: 0,
            newDraggableIndex: 1,
            preventDefault: jest.fn(),
            stopPropagation: jest.fn()
        }

        instance.props.options.onUpdate(evt);
        expect(instance.props.options.onUpdate).toHaveLength(1);
    })
});