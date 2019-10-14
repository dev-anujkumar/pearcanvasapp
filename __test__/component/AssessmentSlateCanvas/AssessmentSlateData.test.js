import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { AssessmentSlateData } from '../../../src/component/AssessmentSlateCanvas/AssessmentSlateData';
import {assessmentSlateDefault,assessmentSlateWithData} from "./../../../fixtures/AssessmentSlateCanvasTestingData";


describe('Testing Assessment Slate Data component', () => {
    const assessmentSlate = mount( <AssessmentSlateData   />)
    let assessmentSlateDataInstance = assessmentSlate.find('AssessmentSlateData').instance();
    xit('render Assessment Slate Data component ', () => {
        const component = mount(<AssessmentSlateData />);
        expect(component).toMatchSnapshot();
    })
    
    xit('onClick Assessment Type Event', () => {
        assessmentSlateDataInstance = assessmentSlate.find('AssessmentSlateData').instance();
        assessmentSlateDataInstance.setState({
        activeAssessmentType: 'Select'
    });

    let activeAssessmentType = {
        activeAssessmentType: {
            getAttribute: function(dataValue) {
                return 'Full Assessment CITE';
            }
        }
    }
       
        assessmentSlate.find('div.slate_assessment_type_dropdown.activeDropdown').simulate('click');
        assessmentSlate.find('ul.slate_assessment_type_dropdown_options>li:first-child').simulate('click');
   });   
it('onClick UsageType Event', () => {
    let props={
        getAssessmentDataPopup :false,
        assessmentId:"urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74",
        assessmentItemTitle:"1.1 Homework",
        model:assessmentSlateWithData,
        getAssessmentData:true,
        
    }
    const component = mount(<AssessmentSlateData {...props} />);
    assessmentSlateDataInstance.setState({
        activeAssessmentType:"Full Assessment CITE",
        activeAssessmentUsageType: 'Quiz'
    });

    let activeAssessmentUsageType = {
        activeAssessmentUsageType: {
            getAttribute: function(dataValue) {
                return 'Diagnostic';
            }
        }
    }

    assessmentSlate.find('div.singleAssessment_Dropdown_activeDropdown').simulate('click');
    assessmentSlate.find('ul.slate_assessment_metadata_type_dropdown_options>li:first-child').simulate('click');


        
});
xit('onClick Change Assessment Event', () => {
    assessmentSlateDataInstance = assessmentSlate.find('AssessmentSlateData').instance();
    assessmentSlateDataInstance.setState({
        activeAssessmentType : 'Full Assessment PUF',
    });

    let activeAssessmentType = {
        activeAssessmentType: {
            getAttribute: function(dataValue) {
                return 'Full Assessment PUF';
            }
        }
    }

    assessmentSlate.find('div.AssessmentSlateCanvas .singleAssessment_Dropdown_activeDropdown').simulate('click');
    assessmentSlate.find('ul.slate_assessment_metadata_type_dropdown_options>li:first-child').simulate('click');


        
});
})