import React from 'react';
import { mount } from 'enzyme';
import PdfSlateComponent from '../../../src/component/PdfSlate/PdfSlateComponent';

const pdfSlateInstance = (props) => {
    const component = mount(<PdfSlateComponent {...props} />);
    return component.find('PdfSlateComponent').instance();
}

describe('1. PDF Slate test cases', () => {
    let props = {
		index:0,
		permissions: ["elements_add_remove"],
		element: {
			id: "urn:pearson:work:c771a9fa-ef29-497c-bb6d-8dcfbb083180",
			html: {},
			elementdata: { 
				"assetid": "urn:pearson:alfresco:c771a9fa-ef29-497c-bb6d-8dcfbb083101",
				"path": "",
				"title": "PDF"
			},
			"versionUrn": "urn:pearson:work:c771a9fa-ef29-497c-bb6d-8dcfbb083102",
			"contentUrn": "urn:pearson:entity:c771a9fa-ef29-497c-bb6d-8dcfbb083103",
			schema:"http://schemas.pearson.com/wip-authoring/element/1"
		},
		handleFocus: jest.fn(),
		updateElement: jest.fn()
	};
    it('1.1 Pdf Slate Component render successfully', () => {
		const component = mount(<PdfSlateComponent {...props} />);
        expect(component).toHaveLength(1);
        const compInstance = pdfSlateInstance(props);
        expect(compInstance).toBeDefined();
    });	
});