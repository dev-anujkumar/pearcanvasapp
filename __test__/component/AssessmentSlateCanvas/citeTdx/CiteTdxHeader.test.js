import React from 'react';
import { mount } from 'enzyme';
import CiteTdxHeader from '../../../../src/component/AssessmentSlateCanvas/assessmentCiteTdx/Components/CiteTdxHeader/CiteTdxHeader'

describe('Testing CITE/TDX Header component', () => {
    let props = {
        headerProps: {
            title: 'Pearson Assessments',
            closeWindowAssessment: function () { }
        },
        resetPage: function () { }
    }

    const component = mount(<CiteTdxHeader {...props} />);
    let componentInstance = component.find('CiteTdxHeader').instance();
    const spyHandleClick = jest.spyOn(componentInstance, 'handleClose')

    it('renders without crashing', () => {
        expect(component).toHaveLength(1);
    })

    it('handlechange', () => {
        componentInstance.handleClose();
        expect(spyHandleClick).toHaveBeenCalled()
        spyHandleClick.mockClear()
    })

});