import React from 'react';
import Button from '../src/component/ElementButtons/ElementButton.jsx';

describe('Testing Button component with props', () => {

    it('render split Button component ', () => {
        const component = mount(<Button type="split" labelText="UL" />);
        console.log(component.debug());
        expect(component).toMatchSnapshot();
    })
    it('render add-comment Button component ', () => {
        const component = mount(<Button type="add-comment" labelText="UL" />);
        console.log(component.debug());
        expect(component).toMatchSnapshot();
    })
    it('render comment-flag Button component  ', () => {
        const component = mount(<Button type="comment-flag" labelText="UL" />);
        console.log(component.debug());
        expect(component).toMatchSnapshot();
    })
    it('render element-label Button component  ', () => {
        const component = mount(<Button type="element-label" labelText="UL" />);
        console.log(component.debug());
        expect(component).toMatchSnapshot();
    })
    it('render delete-element Button component  ', () => {
        const component = mount(<Button type="delete-element" labelText="UL" />);
        console.log(component.debug());
        expect(component).toMatchSnapshot();
    })
    it('render tcm Button component  ', () => {
        const component = mount(<Button type="tcm" labelText="UL" />);
        console.log(component.debug());
        expect(component).toMatchSnapshot();
    })
    it('render forward-nav-active Button component  ', () => {
        const component = mount(<Button type="forward-nav-active" labelText="UL" />);
        console.log(component.debug());
        expect(component).toMatchSnapshot();
    })
    it('render backward-nav-active Button component  ', () => {
        const component = mount(<Button type="backward-nav-active" labelText="UL" />);
        console.log(component.debug());
        expect(component).toMatchSnapshot();
    })
    it('render expand Button component  ', () => {
        const component = mount(<Button type="expand" labelText="UL" />);
        console.log(component.debug());
        expect(component).toMatchSnapshot();
    })
    it('render color-palette Button component  ', () => {
        const component = mount(<Button type="color-palette" labelText="UL" />);
        console.log(component.debug());
        expect(component).toMatchSnapshot();
    })
})