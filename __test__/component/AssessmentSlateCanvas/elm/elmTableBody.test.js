import React from 'react';
import { mount } from 'enzyme';
import ElmTableBody from '../../../../src/component/AssessmentSlateCanvas/elm/Components/ElmTableBody';

jest.mock('../../../../src/component/AssessmentSlateCanvas/elm/UtilityFunctions/ElmLearnosityUtility.js', () => ({
    getFolderLabel: () => {
        return 'C'
    },

}))

let testData = {
    elmInteractive: [{
        label: "module",
        title: "Module 2.1",
        type: "container",
        urn: "urn:pearson:manifest:58c34873-7e2c-44fa-9425-1aae12f66c8a"
    },
    {
        interactiveType: "imageSlideShow",
        parentUrn: "urn:pearson:distributable:98ea9217-92ed-490a-89ec-5174f7964e7b",
        previousUrn: "urn:pearson:manifest:3cbcdbec-2f9d-4b3b-b196-765c744c2e35",
        title: "Interactive 3:Image Gallery",
        type: "interactive",
        urn: "urn:pearson:work:42e17fad-d57e-4620-bd48-4768dce92c15"
    }],
    elmAssessment: [{
        interactiveType: "",
        parentUrn: "urn:pearson:manifest:3cbcdbec-2f9d-4b3b-b196-765c744c2e35",
        previousUrn: "urn:pearson:manifest:9d70c1a4-b918-4fbd-8d43-d72348af1edd",
        title: "Code Example Embedded (Simple Code Input)",
        type: "assessment",
        urn: "urn:pearson:work:acdd7112-82a0-428e-84c5-c33534436646"
    }]
}

describe('Testing ElmTableBody component', () => {
    it('ELM Table Body Jsx - interactive', () => {
        let props = {
            activeAssessmentType: 'elminteractive',
            closeElmWindow: () => { },
            tableValue: testData.elmInteractive,
            isActiveRow: 0,
            openedFrom: 'singleAssessment',
            elementType: 'interactive',
            handleClickAssessment: () => { },
            showNewValueList: () => { }
        };
        const component = mount(<ElmTableBody {...props} />)
        expect(component).toHaveLength(1);

    })
    it('ELM Table Body Jsx - assessment', () => {
        let props = {
            activeAssessmentType: 'learnosity',
            closeElmWindow: () => { },
            tableValue: testData.elmAssessment,
            isActiveRow: 0,
            openedFrom: 'singleAssessment',
            elementType: 'interactive',
            handleClickAssessment: () => { },
            showNewValueList: () => { }
        }
        const component = mount(<ElmTableBody {...props} />)
        expect(component).toHaveLength(1);

    })
});