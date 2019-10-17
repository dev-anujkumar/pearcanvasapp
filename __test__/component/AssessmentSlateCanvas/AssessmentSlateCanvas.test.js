import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { AssessmentSlateCanvas } from '../../../src/component/AssessmentSlateCanvas/AssessmentSlateCanvas';
import {assessmentSlateDefault} from "./../../../fixtures/AssessmentSlateCanvasTestingData";
import config from '../../../src/config/config';
describe('Testing Assessment Slate Canvas component', () => {
    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AssessmentSlateCanvas model={assessmentSlateDefault}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    })
    let assessmentSlate = mount(<AssessmentSlateCanvas model={assessmentSlateDefault}/>);  
    const assessmentSlateInstance = assessmentSlate.find('AssessmentSlateCanvas').instance();
    // xit('onClick Event', () => {
    // singleAssessment.find('div.AssessmentSlateMenu').simulate('click');
    // assessmentSlateInstance.onClick();
    // })
    let wrapper;
    it('onClick', () => {
        let props = {
            handleFocus: function(){},
            handleBlur : function(){},
            model : assessmentSlateDefault
        }
        const assessmentSlate = mount(<AssessmentSlateCanvas {...props}/>);
        let assessmentSlateInstance = assessmentSlate.find('AssessmentSlateCanvas').instance();
        assessmentSlateInstance.handleC2AssessmentClick("");
    }) 
    it ('Set getAssessmentDataPopup', () => {
        let props = {
            handleFocus: function(){},
            handleBlur : function(){},
            model : assessmentSlateDefault
        }

        const assessmentSlate = mount(<AssessmentSlateCanvas {...props}/>);
        let assessmentSlateInstance = assessmentSlate.find('AssessmentSlateCanvas').instance();
        assessmentSlateInstance.setState({
            getAssessmentDataPopup:true,
        })
        assessmentSlateInstance.forceUpdate();
    })

    it ('Set getAssessmentDataPopup', () => {
        let props = {
            handleFocus: function(){},
            handleBlur : function(){},
            model : assessmentSlateDefault,
            onClick : ()=>{},
        }
  
        const assessmentSlate = mount(<AssessmentSlateCanvas {...props}/>);
        let assessmentSlateInstance = assessmentSlate.find('AssessmentSlateCanvas').instance();
      
            assessmentSlateInstance.setState({assessmentId: "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
            assessmentItemId : "urn:pearson:work:fb9bcb66-3073-45e6-ab8a-b595a35bf93b",
            assessmentItemTitle:"Open response question updated",
            getAssessmentData:true,})    
           
            assessmentSlateInstance.forceUpdate();
            assessmentSlate.update();
    })
   
    it('onClick', () => {
        let props = {
            handleFocus: function(){},
            handleBlur : function(){},
            model : assessmentSlateDefault,
            onClick : ()=>{},
        }
        const assessmentSlate = mount(<AssessmentSlateCanvas {...props}/>);
        let assessmentSlateInstance = assessmentSlate.find('AssessmentSlateCanvas').instance();
        assessmentSlate.find('div.AssessmentSlateMenu').simulate('click');
        assessmentSlateInstance.handleAssessmentFocus();
    })
    it('onBlur', () => {
        let props = {
            handleFocus: function(){},
            handleBlur : function(){},
            model : assessmentSlateDefault,
            onClick : ()=>{},
        }
        const assessmentSlate = mount(<AssessmentSlateCanvas {...props}/>);
        let assessmentSlateInstance = assessmentSlate.find('AssessmentSlateCanvas').instance();
        assessmentSlateInstance.handleAssessmentBlur();
    
    })

});