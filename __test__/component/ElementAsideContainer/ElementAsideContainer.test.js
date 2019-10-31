import React from 'react';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import configureMockStore from 'redux-mock-store';
import ElementAsideContainer from '../../../src/component/ElementAsideContainer/ElementAsideContainer';
import { elementAsideWorkExample, element, section } from '../../../fixtures/elementAsideData'
import { spy, stub } from 'sinon';
import { JestEnvironment } from '@jest/environment';
import { Provider } from 'react-redux';
const mockStore = configureMockStore(middlewares);
const setActiveElement = new stub();
const handleFocus =new stub();
let initialState = {
    appStore: {
        pageNumberData: {},
        slateLevelData: {},
        permissions: [],
        activeElement: {
            elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",
            elementType: "element-authoredtext",
            elementWipType: "element-authoredtext",
            primaryOption: "primary-heading",
            secondaryOption: "secondary-heading-1",
            index: "1-0",
            tag: "H1"
        },
    },
    toolbarReducer: {
        elemBorderToggle: true
    },
    slateLockReducer: {
        slateLockInfo: {
            isLocked: false,
            userId: 'c5Test01'
        }
    },
    metadataReducer: {
        currentSlateLOData: {}
    }

};

let store = mockStore(initialState);


describe('Testing ElementAside component with props', () => {
    let esProps = [            {
        buttonType: 'worked-exp-elem',
        buttonHandler: () => {},
        tooltipText: 'Worked Example',
        tooltipDirection: 'left'
    },
    {
        buttonType: 'section-break-elem',
        buttonHandler: () => {},
        tooltipText: 'Section Break',
        tooltipDirection: 'left'
    },];
    let props = {
        element: elementAsideWorkExample,
        permissions: [],
        elementSepratorProps: () => { return esProps },
        //setActiveElement: setActiveElement(elementAsideWorkExample),
        handleFocus:{handleFocus}

    }
    let wrapper = mount(<Provider store={store}>< ElementAsideContainer {...props} 
        setActiveElement= {setActiveElement}
        handleFocus = {handleFocus}
    /></Provider>)
    const instance = wrapper.find('ElementAsideContainer').instance();
    describe('Testing ElementAside component', () => {

        it('should have element Aside', () => {
            expect(wrapper.find(".aside-container")).toHaveLength(1)
        })
        it('should have comment-wrapper', () => {
            expect(wrapper.find(".aside-horizotal-break")).toHaveLength(1)
        })
        it('should have comment-wrapper', () => {
            expect(wrapper.find(".aside-break-bottom")).toHaveLength(1)
        })

    })
    describe('Testing functions with props', () => {
        it('should render section function', () => {
            instance.renderContainer({ ...props })
            expect(wrapper.find(".container-aside")).toHaveLength(1)
        })
        it('should render  section function correctly', () => {

            let sectiondata = instance.section(section)
            expect(sectiondata.props.className).toEqual('section');
        })

        it('should render  sectionBreak function correctly', () => {
            let sectionBreak = instance.sectionBreak(section)
            expect(sectionBreak.props.className).toEqual('aside-section-break');
        })

        it('should render  renderElement function correctly', () => {
            let parentEntityUrn = "urn:pearson:entity:b4cbda8f-7a22-4df5-965a-18623a581ec1"
            instance.renderElement(element, parentEntityUrn)
            // expect(sectionBreak.props.className).toEqual('section-break');
        })

        it('should render  renderAside  function correctly', () => {

            let designType = "asideSidebar01"
            let renderAside = instance.renderAside(designType)
            expect(renderAside.props.children[0].props.className).toEqual('asideSidebar01BorderTop');
        })
        it('should render  handle focus function correctly', () => {

            instance.handleFocus()
         //   expect(sectiondata.props.className).toEqual('section');
        })


    })
    describe('Testing functions with props', () => {
        it('should render  borderTop  function correctly', () => {
            let designType = "asideSidebar01"
            let borderTop = instance.borderTop(designType)
            expect(borderTop.props.className).toEqual('asideSidebar01BorderTop');
        })
        it('should render  borderTop  function correctly', () => {
            let designType = "asideSidebar02"
            let borderTop = instance.borderTop(designType)
            expect(borderTop.props.className).toEqual('asideSidebar02BorderTop');
        })
        it('should render  borderTop  function correctly', () => {
            let designType = "asideSidebar03"
            let borderTop = instance.borderTop(designType)
            expect(borderTop.props.className).toEqual('asideSidebar03BorderTop');
        })

        it('should render  borderTop  function correctly', () => {
            let designType = "asideTacticBox"
            let borderTop = instance.borderTop(designType)
            expect(borderTop.props.className).toEqual('asideTacticBoxBorderTop');
        })

        it('should render  borderTop  function correctly', () => {
            let designType = "asideSidebar04"
            let borderTop = instance.borderTop(designType)
            expect(borderTop.props.className).toEqual('asideSidebar04');
        })


        it('should render  borderTop  function correctly', () => {
            let designType = "asideSidebar05"
            let borderTop = instance.borderTop(designType)
            expect(borderTop.props.children[0].props.className).toEqual('asideSidebar05');
        })

        it('should render  borderTop  function correctly', () => {
            let designType = "asideActivity"
            let borderTop = instance.borderTop(designType)
            expect(borderTop.props.children[0].props.className).toEqual('asideActivity');
        })

        it('should render  borderTop  function correctly', () => {
            let designType = "asideFeature"
            let borderTop = instance.borderTop(designType)
            expect(borderTop.props.className).toEqual('asideFeatureBorderTop');
        })

    })
})