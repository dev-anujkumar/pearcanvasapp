import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import config from '../../../src/config/config';
import FigureHeader from '../../../src/component/FigureHeader/FigureHeader';
import { initialState, props, props1, props2, props3, props4, props5, props6, props7, 
    props8, props9, props10, props11, props12, props13, props14, props15, props16, props17,
    props18, props19, props20, props21 } from './FigureHeaderMockData'

jest.mock('../../../src/component/tinyMceEditor.js', () => {
    return function () {
        return (<div>null</div>)
    }
})
let hasReviewerRole = jest.fn(() => false)

config.figureFieldsPlaceholders = ['Number', 'Label Name', 'Title', 'Caption', 'Credit']
config.smartlinkContexts = ['3rd-party', 'pdf', 'web-link', 'pop-up-web-link', 'table', 'fpo']


describe('Testing FigureHeader component', () => {
    
    let store = mockStore(initialState);

    it('renders without crashing', () => {
        let figureHeaderWrapper = mount(<Provider store={store}><FigureHeader {...props} /></Provider>);
        expect(figureHeaderWrapper).toHaveLength(1);
    })

    it("onKeydown", () => {
        let figureHeaderWrapper = mount(<Provider store={store}><FigureHeader {...props} /></Provider>);
        let event = {
            stopPropagation: jest.fn(),
            preventDefault: jest.fn(),
            keyCode: 38,
            which: 86
        }
        figureHeaderWrapper.find('#onKeyDown1').at(0).simulate('keyDown', event);
        figureHeaderWrapper.find('#onKeyDown2').at(0).simulate('keyDown', event);
    });

    it('For Audio type with oldSettings : Resume numbering & newSettings : Remove label & number case ', () => {
        let figureHeaderWrapper2 = mount(<Provider store={store}><FigureHeader {...props1} /></Provider>);
        figureHeaderWrapper2.find('div.figure-label-number').simulate('click');
        figureHeaderWrapper2.find('.figure-number-dropdown ul li').at(2).simulate('click');
    })

    it('For Audio type with oldSettings : Resume numbering & newSettings : Override label & number case ', () => {
        let figureHeaderWrapper2 = mount(<Provider store={store}><FigureHeader {...props2} /></Provider>);
        figureHeaderWrapper2.find('div.figure-label-number').simulate('click');
        figureHeaderWrapper2.find('.figure-number-dropdown ul li').at(3).simulate('click');
    })

    it('For Audio type with oldSettings : Override label & number newSettings : Remove label & number case ', () => {
        let figureHeaderWrapper2 = mount(<Provider store={store}><FigureHeader {...props3} /></Provider>);
        figureHeaderWrapper2.find('div.figure-label-number').simulate('click');
        figureHeaderWrapper2.find('.figure-number-dropdown ul li').at(2).simulate('click');
    })

    
    it('For Audio type with oldSettings : Override label & number newSettings : Remove label & number case ', () => {
        let figureHeaderWrapper2 = mount(<Provider store={store}><FigureHeader {...props4} /></Provider>);
        figureHeaderWrapper2.find('div.figure-label-number').simulate('click');
        figureHeaderWrapper2.find('.figure-number-dropdown ul li').at(2).simulate('click');
    })

    it('For Audio type with oldSettings : Override label & overridelabelvalue is absent case ', () => {
        let figureHeaderWrapper2 = mount(<Provider store={store}><FigureHeader {...props5} /></Provider>);
        figureHeaderWrapper2.find('div.figure-label-number').simulate('click');
        figureHeaderWrapper2.find('.figure-number-dropdown ul li').at(2).simulate('click');
    })


    it('For Video type ', () => {
        let figureHeaderWrapper2 = mount(<Provider store={store}><FigureHeader {...props6} /></Provider>);
    })

    it('For getting defaultElementLabel when figuretype is not mentioned case ', () => {
        let figureHeaderWrapper2 = mount(<Provider store={store}><FigureHeader {...props7} /></Provider>);
        figureHeaderWrapper2.find('div.figure-label-number').simulate('click');
        figureHeaderWrapper2.find('.figure-number-dropdown ul li').at(2).simulate('click');
    })

    it('For getting defaultElementLabel when figuretype is not mentioned case ', () => {
        let figureHeaderWrapper2 = mount(<Provider store={store}><FigureHeader {...props8} /></Provider>);
        figureHeaderWrapper2.find('div.figure-label-number').simulate('click');
        figureHeaderWrapper2.find('.figure-number-dropdown ul li').at(2).simulate('click');
    })

    
    it('For Video type when displayedLabel field is absent ', () => {
        let figureHeaderWrapper2 = mount(<Provider store={store}><FigureHeader {...props9} /></Provider>);
    })


    it('For Interactive type ', () => {
        let figureHeaderWrapper3 = mount(<Provider store={store}><FigureHeader {...props10} /></Provider>);
    })

    
    it('For tableasmarkup type ', () => {
        let figureHeaderWrapper4 = mount(<Provider store={store}><FigureHeader {...props11} /></Provider>);
    })

    it('For authoredtext type ', () => {
        let figureHeaderWrapper5 = mount(<Provider store={store}><FigureHeader {...props12} /></Provider>);
    })

    it('For codelisting type ', () => {
        let figureHeaderWrapper6 = mount(<Provider store={store}><FigureHeader {...props13} /></Provider>);
    })

    it('For Audio type with audiocustom case ', () => {
        let figureHeaderWrapper2 = mount(<Provider store={store}><FigureHeader {...props14} /></Provider>);
        figureHeaderWrapper2.find('div.figure-label-number').simulate('click');
        figureHeaderWrapper2.find('.figure-number-dropdown ul li').at(2).simulate('click');
    })

    it('For Audio type with audiocustom 2 case ', () => {
        let figureHeaderWrapper2 = mount(<Provider store={store}><FigureHeader {...props15} /></Provider>);
        figureHeaderWrapper2.find('div.figure-label-number').simulate('click');
        figureHeaderWrapper2.find('.figure-number-dropdown ul li').at(2).simulate('click');
    })

    it('For Video type with videocustom case ', () => {
        let figureHeaderWrapper2 = mount(<Provider store={store}><FigureHeader {...props16} /></Provider>);
        figureHeaderWrapper2.find('div.figure-label-number').simulate('click');
        figureHeaderWrapper2.find('.figure-number-dropdown ul li').at(2).simulate('click');
    })

    it('For Video type with videocustom case ', () => {
        let figureHeaderWrapper2 = mount(<Provider store={store}><FigureHeader {...props17} /></Provider>);
        figureHeaderWrapper2.find('div.figure-label-number').simulate('click');
        figureHeaderWrapper2.find('.figure-number-dropdown ul li').at(2).simulate('click');
    })

    it('For Interactive type with videocustom case ', () => { 
        let figureHeaderWrapper2 = mount(<Provider store={store}><FigureHeader {...props18} /></Provider>);
        figureHeaderWrapper2.find('div.figure-label-number').simulate('click');
        figureHeaderWrapper2.find('.figure-number-dropdown ul li').at(2).simulate('click');
    })

    it('For tableasmarkup type with tableasmarkupCustom case ', () => {
        let figureHeaderWrapper2 = mount(<Provider store={store}><FigureHeader {...props19} /></Provider>);
        figureHeaderWrapper2.find('div.figure-label-number').simulate('click');
        figureHeaderWrapper2.find('.figure-number-dropdown ul li').at(2).simulate('click');
    })

    it('For mathml type with mathmlCustom case ', () => {
        let figureHeaderWrapper2 = mount(<Provider store={store}><FigureHeader {...props20} /></Provider>);
        figureHeaderWrapper2.find('div.figure-label-number').simulate('click');
        figureHeaderWrapper2.find('.figure-number-dropdown ul li').at(2).simulate('click');
    })

    it('For preformattedtext type with preformattedtextCustom case ', () => { 
        let figureHeaderWrapper2 = mount(<Provider store={store}><FigureHeader {...props21} /></Provider>);
        figureHeaderWrapper2.find('div.figure-label-number').simulate('click');
        figureHeaderWrapper2.find('.figure-number-dropdown ul li').at(2).simulate('click');
    })

})


