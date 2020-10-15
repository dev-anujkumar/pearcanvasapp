import React from 'react';
import { mount } from 'enzyme';
import ElmUpdateButton from '../../../src/component/AssessmentSlateCanvas/ElmUpdateButton.jsx';

let props = {
    updateElmVersion: jest.fn(),
    elmAssessment: {
        activeWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
        assessmentStatus: "wip",
        latestWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec565",
        showUpdateStatus: false
    }
}
describe('Testing ElmUpdateButton component', () => {
    it('Test 1- Unapproved Status', () => {
        const component = mount(<ElmUpdateButton {...props} />)
        expect(component).toHaveLength(1);
        expect(component.find('div.elm-status-div')).toHaveLength(1);
    })
    it('Test 2- Update Button', () => {
        props = {
            updateElmVersion: jest.fn(),
            elmAssessment: {
                activeWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                assessmentStatus: "final",
                latestWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec565",
                showUpdateStatus: true
            },
            buttonText: 'Update Available',
            hasUpdatePermission: ""
        }
        const component1 = mount(<ElmUpdateButton {...props} />)
        expect(component1).toHaveLength(1);
        expect(component1.find('div.elm-update-button')).toHaveLength(1);
    })
});