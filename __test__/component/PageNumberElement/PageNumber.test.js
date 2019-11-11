import React from 'react';
import ReactDOM from 'react-dom';
require('../../../src/component/ListElement/polyfills.js');
import PageNumberElement from '../../../src/component/SlateWrapper/PageNumberElement.jsx';
import thunk from 'redux-thunk';
import { spy, stub } from 'sinon';
describe('Testing <PageNumberElement> Component', () => {    
    let nodeRef = null;
    let spy = sinon.spy();
    const updatePageNumber = new stub();
    let props = {
        element: {},
        isHovered: {},
        isPageNumberEnabled: {},
        activeElement: {},
        permissions: ['edit_print_page_no'],
        updatePageNumber: {updatePageNumber}
    }
  
    const wrapper = mount(<PageNumberElement {...props}  updatePageNumber= {updatePageNumber}/>, { attachTo: document.body });
    const wrapperInstance = wrapper.instance();
    let parentDiv = document.createElement('div')
    parentDiv.classList.add('pageNumberBox')
    parentDiv.classList.add('greenBorder')
    let targetElem = document.createElement('input')
    parentDiv.appendChild(targetElem)

    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<PageNumberElement {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    })
    test('should call onChange on input', () => {
        const event = {
            preventDefault() { },
            target: { value: '123' }
        };
        wrapper.find('input.textBox').simulate('change', event);
        wrapperInstance.forceUpdate();
        wrapper.update();
        expect(wrapperInstance.state.inputValue).toBe('123');
    })
    test('should update page number', () => {
        const event = {
            preventDefault() { },
            currentTarget: targetElem
        }
        wrapper.find('input.textBox').simulate('blur', event);
        wrapperInstance.forceUpdate();
        wrapper.update();
        expect(wrapperInstance.state.loader).toBe(true);
    })
    test('input should be clicked', () => {
        const event = {
            stopPropagation() { },
            currentTarget: targetElem
        }
        wrapperInstance.setState({ loader: false });
        wrapperInstance.forceUpdate();
        wrapper.update();
        wrapper.find('input.textBox').simulate('click', event)
        expect(parentDiv.classList.contains('greenBorder')).toBe(true)
    })
    test('input should prevent enter', () => {
        const event = {
            preventDefault() { },
            which: 13
        }
        wrapper.find('input.textBox').simulate('keyPress', event)
        expect(parentDiv.classList.contains('greenBorder')).toBe(true)
    })
    test('should hover on mouseover', () => {
        wrapper.setProps({ activeElement: undefined });
        wrapper.setProps({ isHovered: true });
        wrapper.setProps({ isPageNumberEnabled: true });
        wrapperInstance.forceUpdate();
        wrapper.update();
        expect(wrapper.find('div.pageNumberCover').hasClass('hoverNumberCover')).toBe(true)
    })
})