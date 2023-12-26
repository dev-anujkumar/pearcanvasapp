import React from 'react';
import { mount } from 'enzyme';
import ElmUpdateButton from '../../../src/component/AssessmentSlateCanvas/ElmUpdateButton.jsx';
import { ELM_INT } from '../../../src/component/AssessmentSlateCanvas/AssessmentSlateConstants.js';
jest.mock('../../../src/constants/utility.js', () => {
    return {
        hasReviewerSubscriberRole: () => {
            return false
        },
    }
})
describe('Testing ElmUpdateButton component', () => {
    it('Test 1- Elm Interative Status', () => {
        const props1 = {
            updateElmVersion: jest.fn(),
            elmAssessment: {
                activeWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                assessmentStatus: "wip",
                latestWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec565",
                showUpdateStatus: false
            },
            status: true,
            assessmentItem: false,
            elementType: ELM_INT
        }
        const component = mount(<ElmUpdateButton {...props1} />)
        expect(component).toHaveLength(1);
    })
    it('Test 1- Elm Interative Status -- else', () => {
        const props1 = {
            updateElmVersion: jest.fn(),
            elmAssessment: {
                activeWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                assessmentStatus: "final",
                latestWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec565",
                showUpdateStatus: true
            },
            status: true,
            assessmentItem: false,
            elementType: ELM_INT
        }
        const component = mount(<ElmUpdateButton {...props1} />)
        expect(component).toHaveLength(1);
    })
});