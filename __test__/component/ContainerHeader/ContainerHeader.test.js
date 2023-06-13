import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import ContainerHeader from '../../../src/component/ContainerHeader/ContainerHeader';
import config from '../../../src/config/config';
import { initialState, initialState2, initialState3, props, props1, props2, props3, props4, props5, props6, props7, props8 } from './ContainerHeaderMockData'
import { getNumberData } from '../../../src/component/FigureHeader/AutoNumber_helperFunctions';

jest.mock('../../../src/component/tinyMceEditor.js', () => {
    return function () {
        return (<div>null</div>)
    }
})

config.figureFieldsPlaceholders = ['Number', 'Label Name', 'Title', 'Caption', 'Credit']


describe('Testing ContainerHeader component', () => {
    let store = mockStore(initialState);
    let containerHeaderWrapper;
    beforeEach(() => {
        containerHeaderWrapper = mount(<Provider store={store}><ContainerHeader {...props} /></Provider>);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        expect(containerHeaderWrapper).toHaveLength(1);
    })

    it('checking div with classname figure-number-dropdown is rendered', () => {
        containerHeaderWrapper.find('div.figure-label-number').simulate('click');
        expect(containerHeaderWrapper.find('.figure-number-dropdown')).toHaveLength(1)
    })

    it('checking changeAutoNumberSettings function is getting called on click', () => {
        let containerHeaderWrapper1 = mount(<Provider store={store}><ContainerHeader {...props1} /></Provider>);
        containerHeaderWrapper1.find('div.figure-label-number').simulate('click');
        containerHeaderWrapper1.find('.figure-number-dropdown ul li').at(0).simulate('click');
    })

    it('Checking for override label & number case ', () => {
        let containerHeaderWrapper2 = mount(<Provider store={store}><ContainerHeader {...props2} /></Provider>);
        containerHeaderWrapper2.find('div.figure-label-number').simulate('click');
        containerHeaderWrapper2.find('.figure-number-dropdown ul li').at(0).simulate('click');
    })

    
    it('Checking for remove number case ', () => {
        let containerHeaderWrapper2 = mount(<Provider store={store}><ContainerHeader {...props3} /></Provider>);
        containerHeaderWrapper2.find('div.figure-label-number').simulate('click');
        containerHeaderWrapper2.find('.figure-number-dropdown ul li').at(0).simulate('click');
    })

    it('Checking for newSetting = override label & number case ', () => {
        let containerHeaderWrapper2 = mount(<Provider store={store}><ContainerHeader {...props4} /></Provider>);
        containerHeaderWrapper2.find('div.figure-label-number').simulate('click');
        containerHeaderWrapper2.find('.figure-number-dropdown ul li').at(3).simulate('click');
    })

    it('Checking for newSetting = remove label & number case ', () => {
        let containerHeaderWrapper2 = mount(<Provider store={store}><ContainerHeader {...props5} /></Provider>);
        containerHeaderWrapper2.find('div.figure-label-number').simulate('click');
        containerHeaderWrapper2.find('.figure-number-dropdown ul li').at(2).simulate('click');
    })

    it('Test case 5 : checking div with classname figure-dropdown getting rendered',() => {
        containerHeaderWrapper.find('div.figure-label').simulate('click');
        expect(containerHeaderWrapper.find('.figure-dropdown')).toHaveLength(1);
    })


    it('Test case 6 : Checking switch case for Worked Example ', () => {
        let store2 = mockStore(initialState2);
        containerHeaderWrapper = mount(<Provider store={store2}><ContainerHeader {...props6} /></Provider>);
        containerHeaderWrapper.find('div.figure-label-number').simulate('click');
        containerHeaderWrapper.find('.figure-number-dropdown ul li').at(2).simulate('click');
    })

    it('Checking for asideCustom case ', () => {
        let containerHeaderWrapper2 = mount(<Provider store={store}><ContainerHeader {...props7} /></Provider>);
        containerHeaderWrapper2.find('div.figure-label-number').simulate('click');
        containerHeaderWrapper2.find('.figure-number-dropdown ul li').at(0).simulate('click');
    })

    it('Checking for workedexampleCustom case ', () => {
        let containerHeaderWrapper2 = mount(<Provider store={store}><ContainerHeader {...props8} /></Provider>);
        containerHeaderWrapper2.find('div.figure-label-number').simulate('click');
        containerHeaderWrapper2.find('.figure-number-dropdown ul li').at(0).simulate('click');
    })

})

describe('Testing ContainerHeader component', () => {
    let store3 = mockStore(initialState3);
    let containerHeaderWrapper;
    beforeEach(() => {
        containerHeaderWrapper = mount(<Provider store={store3}><ContainerHeader {...props3} /></Provider>);
    });
    
    it('renders without crashing', () => {
        expect(containerHeaderWrapper).toHaveLength(1);
    })
})