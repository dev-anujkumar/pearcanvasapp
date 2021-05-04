import React from 'react';
import { mount, shallow } from 'enzyme';
import ElementDiscussion from '../../../src/component/ElementDiscussion/index';


describe('Element Discussion is being rendered', () => {

    it('renders main component without crashing', () => {
         shallow(<ElementDiscussion />);
    });
    it('renders exact value of class without crashing', () => {
        const component = shallow(<ElementDiscussion />);
        const wrapper = component.find('.single-assessment-usagetype-container');
        expect(wrapper).toHaveLength(1);
    
    });
    it('renders exact value of class without crashing', () => {
        const component = shallow(<ElementDiscussion />);
        const wrapper = component.find('.singleAssessment_Dropdown_SelectLabel');
        expect(wrapper).toHaveLength(1);
    
    });
    it('renders exact value of class without crashing', () => {
        const component = shallow(<ElementDiscussion />);
        const wrapper = component.find('.singleAssessment_Dropdown_currentLabel');
        expect(wrapper).toHaveLength(1);
    
    });
    it('renders exact value of class without crashing', () => {
        const component = shallow(<ElementDiscussion />);
        const wrapper = component.find('.singleAssessment_Dropdown_arrow');
        expect(wrapper).toHaveLength(1);
    
    });
    it('renders exact value of class without crashing', () => {
        const component = shallow(<ElementDiscussion  />);
        const usageTypeDropDown = component.find('.singleAssessment_Dropdown_activeDropdown');
        usageTypeDropDown.simulate('click');
        const wrapper = component.find('.slate_assessment_type_dropdown_options');
        expect(wrapper).toHaveLength(1);
    
    });
})



