import React from 'react';
import Button from '../../../src/component/ElementButtons/ElementButton';
import buttonTypes from '../../../src/component/ElementButtons/ButtonTypes';

describe('Testing Button component with props', () => {

    it('render split Button component ', () => {
        const component = mount(<Button type={buttonTypes.SPLIT_SLATE} labelText="UL" />);
         expect(component.find('span.btn-element').hasClass('split-icon')).toBe(true);
    })
    it('render add-comment Button component ', () => {
        const component = mount(<Button type={buttonTypes.ADD_COMMENT} labelText="UL" />);
        expect(component.find('span.btn-element').hasClass('add-comment')).toBe(true);
        expect(component.find('span.btn-element').hasClass('split-icon')).toBe(false);
        expect(component.find('svg#Capa_1').exists()).toBe(true);
    })
    it('render comment-flag Button component  ', () => {
        const component = mount(<Button type={buttonTypes.COMMENT_FLAG} labelText="UL" />);
        expect(component.find('span.btn-element').hasClass('flag-icon')).toBe(true);
        expect(component.find('svg#Capa_1').exists()).toBe(true);
    })
    it('render element-label Button component  ', () => {
        const component = mount(<Button type={buttonTypes.ELEMENT_BLOCK_LABEL} labelText="UL" />);
        expect(component.find('span.btn-element').hasClass('element-label')).toBe(true);
        expect(component.find('span.btn-element').text()).toEqual('UL');
    })
    it('render delete-element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.DELETE_ELEMENT} labelText="UL" />);
        expect(component.find('span.btn-element').hasClass('delete-icon')).toBe(true);
        expect(component.find('img').exists()).toBe(true);
    })
    it('render tcm Button component  ', () => {
        const component = mount(<Button type={buttonTypes.TCM} labelText="UL" />);
        expect(component.find('span.btn-element').hasClass('tcm-icon')).toBe(true);
        expect(component.find('svg').exists()).toBe(true);
        expect(component.find('img').exists()).toBe(false);
    })
    it('render forward-nav-active Button component  ', () => {
        const component = mount(<Button type={buttonTypes.FORWARD_NAVIGATION} labelText="UL" />);
        expect(component.find('span.btn-element').hasClass('forward-nav-active')).toBe(true);
        expect(component.find('img').exists()).toBe(true);
    })
    it('render backward-nav-active Button component  ', () => {
        const component = mount(<Button type={buttonTypes.BACKWARD_NAVIGATION} labelText="UL" />);
        expect(component.find('span.btn-element').hasClass('forward-nav-active')).toBe(false);
        expect(component.find('span.btn-element').hasClass('backward-nav-active')).toBe(true);
        expect(component.find('img').exists()).toBe(true);
    })
    it('render backward-nav-disable Button component  ', () => {
        const component = mount(<Button type={buttonTypes.BACKWARD_NAVIGATION_DISABLE} labelText="UL" />);
        expect(component.find('span.btn-element').hasClass('backward-nav-active')).toBe(false);
        expect(component.find('span.btn-element').hasClass('backward-nav-disable')).toBe(true);
    })
    it('render forward-nav-disable Button component  ', () => {
        const component = mount(<Button type={buttonTypes.FORWARD_NAVIGATION_DISABLE} />);
        expect(component.find('span.btn-element').hasClass('forward-nav-disable')).toBe(true);
        expect(component.find('span.btn-element').hasClass('backward-nav-disable')).toBe(false);
        expect(component.find('img').exists()).toBe(true);
    })
    it('render expand Button component  ', () => {
        const component = mount(<Button type={buttonTypes.EXPAND} labelText="UL" />);
        expect(component.find('span.btn-element').hasClass('expand-icon')).toBe(true);
        expect(component.find('span.btn-element').hasClass('backward-nav-disable')).toBe(false);
        expect(component.find('img').exists()).toBe(true);
    })
    it('render color-palette Button component  ', () => {
        const component = mount(<Button type={buttonTypes.COLOR_PALETTE} labelText="UL" />);
        expect(component.find('span.btn-element').hasClass('color-palette')).toBe(true);
        expect(component.find('span.btn-element').hasClass('backward-nav-disable')).toBe(false);
        expect(component.find('img').exists()).toBe(true);
    })
    it('render close-container Button component  ', () => {
        const component = mount(<Button type={buttonTypes.CLOSE_CONTAINER} labelText="UL" />);
        expect(component.find('span.btn-element').hasClass('close-container')).toBe(true);
        expect(component.find('span.btn-element').hasClass('backward-nav-disable')).toBe(false);
        expect(component.find('img').exists()).toBe(true);
    })

    it('render Text element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.TEXT_ELEMENT} />);
        expect(component.find('span.btn-element').hasClass('close-container')).toBe(false);
        expect(component.find('span.btn-element').hasClass('backward-nav-disable')).toBe(false);
        expect(component.find('img').exists()).toBe(false);
    })
    it('render Image element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.IMAGE_ELEMENT} />);
        expect(component.find('span.btn-element').hasClass('image-elem')).toBe(true);
        expect(component.find('span.btn-element').hasClass('backward-nav-disable')).toBe(false);
        expect(component.find('svg#image-media').exists()).toBe(true);
        expect(component.find('img').exists()).toBe(false);
    })
    it('render Audio/video element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.AUDIO_ELEMENT} />);
        expect(component.find('span.btn-element').hasClass('audio-elem')).toBe(true);
        expect(component.find('span.btn-element').hasClass('backward-nav-disable')).toBe(false);
        expect(component.find('svg#audioIcon').exists()).toBe(true);
        expect(component.find('polygon').exists()).toBe(true);
    })
    it('render Interactive element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.INTERACTIVE_ELEMENT} />);
        expect(component.find('span.btn-element').hasClass('interactive-elem-button')).toBe(true);
        expect(component.find('span.btn-element').hasClass('backward-nav-disable')).toBe(false);
        expect(component.find('svg#audioIcon').exists()).toBe(false);
        expect(component.find('rect').exists()).toBe(true);
    })
    it('render Container element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.CONTAINER_ELEMENT} />);
        expect(component.find('span.btn-element').hasClass('container-elem-button')).toBe(true);
        expect(component.find('span.btn-element').hasClass('backward-nav-disable')).toBe(false);
        expect(component.find('svg#containerIcon').exists()).toBe(true);
    })
    it('render Worked example Button component  ', () => {
        const component = mount(<Button type={buttonTypes.WORKED_EXAMPLE_ELEMENT} />);
        expect(component.find('span.btn-element').hasClass('interactive-elem-button')).toBe(false);
        expect(component.find('span.btn-element').hasClass('backward-nav-disable')).toBe(false);
        expect(component.find('span.btn-element').hasClass('worked-exp-elem')).toBe(true);
        expect(component.find('svg#workedExampleIcon').exists()).toBe(true);
        expect(component.find('rect').exists()).toBe(true);
    })
    it('render Assessment element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.ASSESSMENT_ELEMENT} />);
        expect(component.find('span.btn-element').hasClass('assessment-elem')).toBe(true);
        expect(component.find('span.btn-element').hasClass('backward-nav-disable')).toBe(false);
        expect(component.find('span.btn-element').hasClass('worked-exp-elem')).toBe(false);
        expect(component.find('svg#assessmentIcon').exists()).toBe(true);
        expect(component.find('rect').exists()).toBe(true);
    })
    it('render Opener element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.OPENER_ELEMENT} />);
        expect(component.find('span.btn-element').hasClass('opener-elem')).toBe(true);
        expect(component.find('span.btn-element').hasClass('backward-nav-disable')).toBe(false);
        expect(component.find('span.btn-element').hasClass('worked-exp-elem')).toBe(false);
        expect(component.find('svg#Layer_1').exists()).toBe(true);
    })
    it('render Section break element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.SECTION_BREAK_ELEMENT} />);
        console.log("this is component button functionality---",component.debug());
        expect(component.find('span.btn-element').hasClass('section-break-elem')).toBe(true);
        expect(component.find('span.btn-element').hasClass('backward-nav-disable')).toBe(false);
        expect(component.find('span.btn-element').hasClass('worked-exp-elem')).toBe(false);
        expect(component.find('svg#sectionBreakElement').exists()).toBe(true);
    })
    it('render Lock icon Button component  ', () => {
        const component = mount(<Button type={buttonTypes.LOCK} />);
        expect(component.find('span.btn-element').hasClass('lock-icon')).toBe(true);
        expect(component.find('svg.slate-lock-icon-svg').exists()).toBe(true);
    })
    it('render METADATA_ANCHOR element Button component  ', () => {
        const component = mount(<Button type={buttonTypes.METADATA_ANCHOR} />);
        expect(component.find('span.btn-element').hasClass('metadata-anchor')).toBe(true);
        expect(component.find('rect').exists()).toBe(true);
        expect(component.find('span.btn-element').hasClass('backward-nav-disable')).toBe(false);
        expect(component.find('span.btn-element').hasClass('worked-exp-elem')).toBe(false);
    })
    it('render ELM_CLOSE_WINDOW Button component  ', () => {
        const component = mount(<Button type={buttonTypes.ELM_CLOSE_WINDOW} />);
        expect(component.find('span')).toBeDefined();
        expect(component.find('svg#elm_CloseWindow').exists()).toBe(true);
        expect(component.find('polygon').exists()).toBe(true);
    })
    it('render ASSESSMENT_CLOSE_WINDOW Button component  ', () => {
        const component = mount(<Button type={buttonTypes.ASSESSMENT_CLOSE_WINDOW} />);
        expect(component.find('span')).toBeDefined();
        expect(component.find('svg#assessment_CloseWindow').exists()).toBe(true);
        expect(component.find('polygon').exists()).toBe(true);
    })
    it('render ELM_ASSESSMENT_ITEM Button component  ', () => {
        const component = mount(<Button type={buttonTypes.ELM_ASSESSMENT_ITEM} />);
        expect(component.find('span')).toBeDefined();
        expect(component.find('svg#assessmentSlate-item-icon').exists()).toBe(true);
    })
    it('render FEEDBACK Button component  ', () => {
        const component = mount(<Button type={buttonTypes.FEEDBACK} />);
        expect(component.find('span.btn-element').hasClass('feedback')).toBe(true);
        expect(component.find('svg.feedback-icon-svg').exists()).toBe(true);
    })
    it('render CITATION_ELEMENT Button component  ', () => {
        const component = mount(<Button type={buttonTypes.CITATION_ELEMENT} />);
        expect(component.find('span.btn-element').hasClass('citation-elem')).toBe(true);
        expect(component.find('rect').exists()).toBe(true);
        expect(component.find('tspan').exists()).toBe(true);
    })
})