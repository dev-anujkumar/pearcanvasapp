import React from 'react';
import Button from '../../../src/component/ElementButtons/ElementButton';
import buttonTypes from '../../../src/component/ElementButtons/ButtonTypes';

describe('Testing Button component with props', () => {

    it('render split Button component ', () => {
        const component = mount(<Button type={buttonTypes.SPLIT_SLATE} labelText="UL" />);
        console.log(component.debug());
        // expect(component).toMatchSnapshot();
    })
    it('render add-comment Button component ', () => {
        const component = mount(<Button type={buttonTypes.ADD_COMMENT} labelText="UL" />);
        console.log(component.debug());
        // expect(component).toMatchSnapshot();
    })
    it('render comment-flag Button component  ', () => {
        const component = mount(<Button type={buttonTypes.COMMENT_FLAG} labelText="UL" />);
        console.log(component.debug());
        // expect(component).toMatchSnapshot();
    })
    it('render element-label Button component  ', () => {
        const component = mount(<Button type={buttonTypes.ELEMENT_BLOCK_LABEL} labelText="UL" />);
        console.log(component.debug());
        // expect(component).toMatchSnapshot();
    })
    it('render delete-element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.DELETE_ELEMENT} labelText="UL" />);
        console.log(component.debug());
        // expect(component).toMatchSnapshot();
    })
    it('render tcm Button component  ', () => {
        const component = mount(<Button type={buttonTypes.TCM} labelText="UL" />);
        console.log(component.debug());
        // expect(component).toMatchSnapshot();
    })
    it('render forward-nav-active Button component  ', () => {
        const component = mount(<Button type={buttonTypes.FORWARD_NAVIGATION} labelText="UL" />);
        console.log(component.debug());
        // expect(component).toMatchSnapshot();
    })
    it('render backward-nav-active Button component  ', () => {
        const component = mount(<Button type={buttonTypes.BACKWARD_NAVIGATION} labelText="UL" />);
        console.log(component.debug());
        // expect(component).toMatchSnapshot();
    })
    it('render backward-nav-disable Button component  ', () => {
        const component = mount(<Button type={buttonTypes.BACKWARD_NAVIGATION_DISABLE} labelText="UL" />);
        console.log(component.debug());
        // expect(component).toMatchSnapshot();
    })
    it('render forward-nav-disable Button component  ', () => {
        const component = mount(<Button type={buttonTypes.FORWARD_NAVIGATION_DISABLE} />);
        console.log(component.debug());
        // expect(component).toMatchSnapshot();
    })
    it('render expand Button component  ', () => {
        const component = mount(<Button type={buttonTypes.EXPAND} labelText="UL" />);
        console.log(component.debug());
        // expect(component).toMatchSnapshot();
    })
    it('render color-palette Button component  ', () => {
        const component = mount(<Button type={buttonTypes.COLOR_PALETTE} labelText="UL" />);
        console.log(component.debug());
        // expect(component).toMatchSnapshot();
    })
    it('render close-container Button component  ', () => {
        const component = mount(<Button type={buttonTypes.CLOSE_CONTAINER} labelText="UL" />);
        // expect(component).toMatchSnapshot();
    })

    it('render Text element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.TEXT_ELEMENT} />);
        // expect(component).toMatchSnapshot();
    })
    it('render Image element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.IMAGE_ELEMENT} />);
        // expect(component).toMatchSnapshot();
    })
    it('render Audio/video element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.AUDIO_ELEMENT} />);
        // expect(component).toMatchSnapshot();
    })
    it('render Interactive element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.INTERACTIVE_ELEMENT} />);
        // expect(component).toMatchSnapshot();
    })
    it('render Container element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.CONTAINER_ELEMENT} />);
        // expect(component).toMatchSnapshot();
    })
    it('render Worked example Button component  ', () => {
        const component = mount(<Button type={buttonTypes.WORKED_EXAMPLE_ELEMENT} />);
        // expect(component).toMatchSnapshot();
    })
    it('render Assessment element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.ASSESSMENT_ELEMENT} />);
        // expect(component).toMatchSnapshot();
    })
    it('render Opener element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.OPENER_ELEMENT} />);
        // expect(component).toMatchSnapshot();
    })
    it('render Section break element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.SECTION_BREAK_ELEMENT} />);
        // expect(component).toMatchSnapshot();
    })
})