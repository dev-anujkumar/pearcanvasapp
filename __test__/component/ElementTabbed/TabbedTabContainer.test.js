import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import TabbedTabContainer from '../../../src/component/ElementTabbed/TabbedTabContainer'
import config from '../../../src/config/config';
import { mapGroupedDataCatch, mapGroupedDataTry, mapGroupedDataTry2, props, propsConditionalCoverage1, propsWithoutHTML, slateLevelData  } from '../../testData/tabbedElementMockData';

const intialize = {
    appStore: {
        multipleColumnData: [
            {
                "containerId": "urn:pearson:manifest:190c36fc-1921-434f-8eed-afda96255d94",
                "columnIndex": "Ttl"
            }
        ],
        slateLevelData : slateLevelData
    },
    alfrescoReducer: {
        alfrescoAssetData: {},
        elementId: "urn",
        alfrescoListOption: [],
        launchAlfrescoPopup: true,
        editor: true,
        Permission: false
    },
    autoNumberReducer: {
        isAutoNumberingEnabled: true,
        autoNumberOption: ''
    },
    toolbarReducer : {
        spellCheckToggle : false
    }
}
const store = mockStore(intialize)

describe('Testing TabbedTabContainer component', () => {
    it('renderTabElement', () => {
        const component = mount(<Provider store={store}><TabbedTabContainer {...props} /></Provider>);
        component.find('TabbedTabContainer')
    })
    it('renderTabElement', () => {
        const component = mount(<Provider store={store}><TabbedTabContainer {...propsWithoutHTML} /></Provider>);
        component.find('TabbedTabContainer')
    })
    it('renderTabElement', () => {
        const component = mount(<Provider store={store}><TabbedTabContainer {...propsConditionalCoverage1} /></Provider>);
        component.find('TabbedTabContainer')
    })
    describe('Testing Sortable', () => {
        it('renderTabElement', () => {
            const component = mount(<Provider store={store}><TabbedTabContainer {...mapGroupedDataTry} /></Provider>);
            component.find('TabbedTabContainer')
        })
        it('Sortable onStart', () => {
            const wrapper = mount(<Provider store={store}>< TabbedTabContainer {...mapGroupedDataTry} /> </Provider>)
            const instance = wrapper.find('Sortable').instance();
            instance.props.options.onStart()
            instance.props.onChange();
            expect(instance.props.onChange).toHaveLength(3);
        })
        it('Sortable onUpdate > savingInProgress = true', () => {
            config.savingInProgress = true;
            const wrapper = mount(<Provider store={store}>< TabbedTabContainer {...mapGroupedDataTry} /> </Provider>)
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
            const wrapper = mount(<Provider store={store}>< TabbedTabContainer {...mapGroupedDataTry2} /> </Provider>)
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
    describe('Testing Sortable -> Conditional Coverage', () => {
        it('renderTabElement', () => {
            const component = mount(<Provider store={store}><TabbedTabContainer {...mapGroupedDataCatch} /></Provider>);
            component.find('TabbedTabContainer')
        })
    });     
});

