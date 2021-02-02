import React from 'react';
import { mount } from 'enzyme';
import CiteTdxHeader from '../../../../src/component/AssessmentSlateCanvas/assessmentCiteTdx/Components/CiteTdxHeader/CiteTdxHeader'

describe('Testing CITE/TDX Header component', () => {

    it('renders without crashing', () => {
        let props = {
            headerProps: {
                title: 'Pearson Assessments',
                closeWindowAssessment: function () { },
                openedFrom: 'slateAssessment',
                assessmentType: 'cite',
                assessmentSlateObj: {},
                setCiteTdxFilterData: function () { }
            },
            resetPage: function () { }
        }

        const component = mount(<CiteTdxHeader {...props} />);
        let componentInstance = component.find('CiteTdxHeader').instance();
        expect(component).toHaveLength(1);
        const spyHandleClick = jest.spyOn(componentInstance, 'handleClose')
        componentInstance.handleClose();
        expect(spyHandleClick).toHaveBeenCalled()
        spyHandleClick.mockClear()
    })
    it('openedfrom = singleSlateAssessment', () => {
        let props2 = {
            headerProps: {
                title: 'Pearson Assessments',
                closeWindowAssessment: function () { },
                openedFrom: 'singleSlateAssessment',
                assessmentType: 'cite',
                assessmentSlateObj: {},
                setCiteTdxFilterData: function () { }
            },
            resetPage: function () { }
        }

        const component2 = mount(<CiteTdxHeader {...props2} />);
        expect(component2).toHaveLength(1);
        let componentInstance = component2.find('CiteTdxHeader').instance();
        const spyHandleClick = jest.spyOn(componentInstance, 'handleClose')
        componentInstance.handleClose();
        expect(spyHandleClick).toHaveBeenCalled()
        spyHandleClick.mockClear()
    })
});