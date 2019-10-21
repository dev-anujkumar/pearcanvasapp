import React from 'react';
import { mount, shallow } from 'enzyme';
import ElementAsideContainer from '../../../src/component/ElementAsideContainer/ElementAsideContainer';
import { elementAsideWorkExample, element, section } from '../../../fixtures/elementAsideData';
import { swapElement} from '../../../src/component/SlateWrapper/SlateWrapper_Actions';
import { spy, stub } from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';

const mockStore = configureMockStore(middlewares);

const store = mockStore({});

describe('Testing ElementAside component with props', () => {
    let props = {
        element: elementAsideWorkExample,
        swapElement : swapElement,
        onUpdate : jest.fn(),
        onStart : jest.fn(),
        setActiveElement : jest.fn(),
        handleFocus : jest.fn(),
        swapElement : jest.fn()

    }  

    const wrapper = mount(<Provider store={store}>< ElementAsideContainer {...props} /> </Provider>)
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

        it('should render  renderWorkExample  function correctly', () => {

            let designType = "workedexample2"
            let renderWorkExample = instance.renderWorkExample(designType)
            expect(renderWorkExample.props.children[0].props.className).toEqual('aside-horizotal-break aside-horizotal-break-green');
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

    it(' handleFocus function testing', () => {
        const wrapper = mount(<Provider store={store}>< ElementAsideContainer {...props} /> </Provider>)
        const instance = wrapper.find('ElementAsideContainer').instance();
        instance.handleFocus();
    })

    it(' componentWillMount  testing', () => {
        const tempWrapper = mount(<Provider store={store}>< ElementAsideContainer {...props} /> </Provider>)

        const componentWillUnmount = jest.spyOn(tempWrapper.instance(), 'componentWillUnmount');
        tempWrapper.unmount();
        expect(componentWillUnmount).toHaveBeenCalled();
    })

    it(' Sortable onChange function testing', () => {
        const wrapper = mount(<Provider store={store}>< ElementAsideContainer {...props} /> </Provider>)
        const instance = wrapper.find('Sortable').instance();

        let onChange = jest.fn()
        expect(instance.props.onChange).toHaveLength(3);
    })

    it(' Sortable onStart function testing', () => {
        const wrapper = mount(<Provider store={store}>< ElementAsideContainer {...props} /> </Provider>)
        const instance = wrapper.find('Sortable').instance();

        instance.props.options.onStart()
        instance.props.onChange()
    })

    it(' Sortable onUpdate function testing', () => {
        const wrapper = mount(<Provider store={store}>< ElementAsideContainer {...props} /> </Provider>)
        const instance = wrapper.find('Sortable').instance();

        let evt = {
            oldDraggableIndex : 0,
            newDraggableIndex : 1
        }

        let _bodymatter = [
            {
				"id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
				"type": "element-authoredtext",
				"subtype": "",
				"schema": "http://schemas.pearson.com/wip-authoring/element/1"
            },
            {
				"id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
				"type": "element-authoredtext",
				"subtype": "",
				"schema": "http://schemas.pearson.com/wip-authoring/element/1"
            }]
        
        instance.props.options.onUpdate(evt)
    })

    })
})