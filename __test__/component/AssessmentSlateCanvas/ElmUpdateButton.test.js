import React from 'react';
import { mount } from 'enzyme';
import ElmUpdateButton from '../../../src/component/AssessmentSlateCanvas/ElmUpdateButton.jsx';
jest.mock('../../../src/constants/utility.js', () => {
    return {
        hasReviewerSubscriberRole: () => {
            return false
        },
    }
})
describe('Testing ElmUpdateButton component', () => {
    let props = {
        updateElmVersion: jest.fn(),
        elmAssessment: {
            activeWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            assessmentStatus: "wip",
            latestWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec565",
            showUpdateStatus: true
        },
        status: true,
        assessmentItem: false
    }
    it('Test 1- Unapproved Status --else', () => {
        let props1 = {
            elmAssessment: {
                activeWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                assessmentStatus: "wip",
                latestWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec565",
                showUpdateStatus: false
            },
            status: true,
            assessmentItem: false
        }
        const component = mount(<ElmUpdateButton {...props1} />)
        expect(component).toHaveLength(1);
    })
});