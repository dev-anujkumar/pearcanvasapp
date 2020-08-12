import React from 'react';
import { mount } from 'enzyme';
import AssessmentSearchBar from ' ../../../src/component/AssessmentSlateCanvas/elm/Components/AssessmentSearchBar';

describe('Testing Learnosity AssessmentSearchBar component', () => {

    it('Test- renders without crashing', () => {
        let props = {}
        const component = mount(<AssessmentSearchBar {...props} />)
        expect(component).toHaveLength(1);

    })
    it('Test- onChange value in Input', () => {
        let props = {
            searchTerm:'',
            assessmentType:'learnosity',
            filterAssessmentData: jest.fn()
        }
        const component = mount(<AssessmentSearchBar {...props} />)
        component.find('input#inputTitle').simulate('change');
    })
    it('Test- onClick Search Button', () => {
        let props = {
            searchTerm:'test',
            assessmentType:'learnosity',
            filterAssessmentData: jest.fn()
        }
        const component = mount(<AssessmentSearchBar {...props} />)
        component.find('button.search').simulate('click');
    })
});