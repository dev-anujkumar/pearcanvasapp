import React from 'react';
import { mount } from 'enzyme';
import config from '../../../src/config/config';
import ElementTCC from '../../../src/component/LtiSlate/ElementTCC';

const elementTccInstance = (props) => {
    const component= mount(<ElementTCC {...props} />)
    return component.find('ElementTCC').instance();
}


describe('1. LTI Slate test cases', () => {
    let props = {
        currentSlateAncestorData: {
            title:"Course Vocabulary 1"
        },
        tcc_project_link :
"https://local-dev.pearson.com:4000/?proectUrn=urn:pearson:distributable:944da257-3b93-441d-9711-1f2978c6a642&entityUrn=urn:pearson:entity:7aaa2ef8-97ab-4f70-a4b4-bc67787d0b80",

        element: {
            id: "urn:pearson:work:e86d43e6-db98-4a79-8fef-a8ce7fc1c012",
            type: "element-tcc",
            subtype: "edynamic",
            "versionUrn": "urn:pearson:work:c771a9fa-ef29-497c-bb6d-8dcfbb083102",
            "contentUrn": "urn:pearson:entity:c771a9fa-ef29-497c-bb6d-8dcfbb083103",
            schema:"http://schemas.pearson.com/wip-authoring/element/1"
        },
        handleFocus: jest.fn(),
        handleBlur: jest.fn(),
        onclick: jest.fn()
    };
    it('1.1 LTI Slate Component render successfully', () => {
		const component = mount(<ElementTCC {...props} />);
        expect(component).toHaveLength(1);
        const compInstance = elementTccInstance(props);
        expect(compInstance).toBeDefined();
    });
});
