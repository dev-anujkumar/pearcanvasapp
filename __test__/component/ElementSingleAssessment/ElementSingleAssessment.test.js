import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { ElementSingleAssessment } from '../../../src/component/ElementSingleAssessment/ElementSingleAssessment';
import {  singleAssessmentCITEDefault} from '../../../fixtures/ElementSingleAssessmentTestData'

describe('Testing Element Single Assessment component', () => {

    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ElementSingleAssessment model={singleAssessmentCITEDefault} index="" />, div);
        ReactDOM.unmountComponentAtNode(div);
    })

    let props = {
        model: singleAssessmentCITEDefault,
        index:"1",
        usagetype:"Practice"
    };

    let singleAssessment = mount(<ElementSingleAssessment model = {singleAssessmentCITEDefault}  />);
    it('Render Single Assessment default ', () => {
        expect(singleAssessment).toMatchSnapshot();
    });

    it('onClick Event', () => {
        const singleAssessmentInstance = singleAssessment.find('ElementSingleAssessment').instance();
        singleAssessmentInstance.setState({
            asseessmentUsageTypeDropdown: false,
            activeAsseessmentUsageType: 'Quiz'
        });

        let usageType = {
            usageType: {
                getAttribute: function(dataValue) {
                    return 'Diagnostic';
                }
            }
        }

        singleAssessment.find('div.singleAssessment_Dropdown_Container .singleAssessment_Dropdown_activeDropdown').simulate('click');
        singleAssessment.find('ul.singleAssessment_Dropdown_options>li:first-child').simulate('click');
        singleAssessment.find('div.pearson-component.image').simulate('click');
        singleAssessmentInstance.handleAssessmentTypeChange('Diagnostic');

            
    });
      
});