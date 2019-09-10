import React from 'react';
import Button from '../../../src/component/ElementButtons/ElementButton';
import buttonTypes from '../../../src/component/ElementButtons/ButtonTypes';

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
    it('render close-container Button component  ', () => {
        const component = mount(<Button type="close-container" labelText="UL" />);
        expect(component).toMatchSnapshot();
    })

    it('render Text element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.textElement} />);
        expect(component).toMatchSnapshot();
    })
    it('render Image element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.imageElement} />);
        expect(component).toMatchSnapshot();
    })
    it('render Audio/video element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.audioElement} />);
        expect(component).toMatchSnapshot();
    })
    it('render Interactive element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.interactiveElement} />);
        expect(component).toMatchSnapshot();
    })
    it('render Container element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.containerElement} />);
        expect(component).toMatchSnapshot();
    })
    it('render Work example Button component  ', () => {
        const component = mount(<Button type={buttonTypes.workedExampleElement} />);
        expect(component).toMatchSnapshot();
    })
    it('render Assessment element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.assessmentElement} />);
        expect(component).toMatchSnapshot();
    })
    it('render Opener element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.openerElement} />);
        expect(component).toMatchSnapshot();
    })
    it('render Section break element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.sectionBreakElement} />);
        expect(component).toMatchSnapshot();
    })
})