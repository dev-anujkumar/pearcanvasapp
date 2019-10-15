import React from 'react';
import { mount } from 'enzyme';
import OpenerElement from '../../../src/component/OpenerElement';
import { openerElementData } from '../../../fixtures/OpenerElementData'

describe('Testing Opener component with props', () => {
    
    it('Simulating click event to open label dropdown', () => {
        const openerComponent = mount( <OpenerElement model={openerElementData.html} /> )
        openerComponent.find('div.element-dropdown-title.label-content').simulate('click');
        openerComponent.find('ul.element-dropdown-content>li:first-child').simulate('click');
    })
    it('Changing input number', () => {
        const openerComponent = mount( <OpenerElement model={openerElementData.html} /> )
        openerComponent.find('input.element-dropdown-title.opener-number').simulate('change', { target: { value: '1234567890!!!' } });
    })
    describe('Simulating keyPress event on input number', () => {
        const openerComponent = mount( <OpenerElement  /> )
        it('Simulating keyPress event on input number - alphanumeric input', () => {
            openerComponent.find('input.element-dropdown-title.opener-number').simulate('keypress', { which: 48 });
        })
        it('Simulating keyPress event on input number - special character input', () => {
            openerComponent.find('input.element-dropdown-title.opener-number').simulate('keypress', { which: 91 });
        })
    })
    it('Changing input title', () => {
        const openerComponent = mount( <OpenerElement model={openerElementData.html} /> )
        openerComponent.find('input.element-dropdown-title.opener-title').simulate('change', { target: { value: '1234567890!!!' } });
    })
})
