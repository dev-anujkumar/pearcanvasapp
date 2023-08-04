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
    it('Test 1- Unapproved Status --assessment', () => {
        let props1 = {
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
        const component = mount(<ElmUpdateButton {...props1} />)
        expect(component).toHaveLength(1);
        expect(component.find('div.elm-status-div')).toHaveLength(0);
    })
    it('Test 1- Unapproved Status --assessmentItem', () => {
        let props1 = {
            updateElmVersion: jest.fn(),
            elmAssessment: {
                activeWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                assessmentStatus: "wip",
                latestWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec565",
                showUpdateStatus: true,
                targetId: "test"
            },
            status: true,
            assessmentItem: true,
            assessmentReducer: {
                "test": {
                    "urn": "test"
                }
            }
        }
        const component = mount(<ElmUpdateButton {...props1} />)
        expect(component).toHaveLength(1);
        expect(component.find('div.elm-status-div')).toHaveLength(0);
    })
    it('Test 1- Unapproved Status --else', () => {
        let props1 = {
            updateElmVersion: jest.fn(),
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
            elementType: 'mmi-elm'
        }
        const component1 = mount(<ElmUpdateButton {...props} />)
        expect(component1).toHaveLength(1);
        expect(component1.find('div.elm-update-button')).toHaveLength(1);
    })
    it('Test 2- Update Button -- conditional coverage', () => {
        props = {
            updateElmVersion: jest.fn(),
            elmAssessment: {
                activeWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
                assessmentStatus: "final",
                latestWorkUrn: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec565"
            },
            buttonText: 'Update Available',
            elementType: 'mmi-elm'
        }
        const component1 = mount(<ElmUpdateButton {...props} />)
        expect(component1).toHaveLength(1);
        expect(component1.find('div.elm-update-button')).toHaveLength(0);
    })
});