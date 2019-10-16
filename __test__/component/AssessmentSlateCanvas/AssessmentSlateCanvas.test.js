import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { AssessmentSlateCanvas } from '../../../src/component/AssessmentSlateCanvas/AssessmentSlateCanvas';
import {assessmentSlateDefault} from "./../../../fixtures/AssessmentSlateCanvasTestingData";
describe('Testing Assessment Slate Canvas component', () => {
    xtest('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AssessmentSlateCanvas model={assessmentSlateDefault}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    })
    let assessmentSlate = mount(<AssessmentSlateCanvas model={assessmentSlateDefault}/>);  
    const assessmentSlateInstance = assessmentSlate.find('AssessmentSlateCanvas').instance();
    xit('onClick Event', () => {
    singleAssessment.find('div.AssessmentSlateMenu').simulate('click');
    assessmentSlateInstance.onClick();
    })
    
});