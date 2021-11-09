import React from 'react';
import { shallow } from 'enzyme';

import ShowHideUiBlock from '../../../../src/component/ShowHide/Components/ShowHideUiBlock.jsx';
import RevealAnswer from '../../../../src/component/ShowHide/Components/RevealAnswer.jsx';
import SortElement from '../../../../src/component/ShowHide/Components/SortElement.jsx';

const showhideInstance = (_props) => {
    return shallow(<ShowHideUiBlock {..._props} />);
}

let props = {
	index:0,
	permissions: ["elements_add_remove", "add_multimedia_via_alfresco", "alfresco_crud_access"],
	element: {
			"id":"urn:pearson:manifest:2503302c-63b1-4e90-b5e4-09b1aeabbdcb",
			"type":"showhide",
			"schema":"http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
			"versionUrn":"urn:pearson:manifest:2503302c-63b1-4e90-b5e4-09b1aeabbdcb",
			"contentUrn":"urn:pearson:entity:d698bcdf-3c04-4273-84c8-2d1ae3715f78",
			"status":"wip",
			"interactivedata":{
			"postertextobject":[
				{
					"id":"urn:pearson:work:b6621285-70e5-4134-abdd-9155deba2f75",
					"type":"element-authoredtext",
					"schema":"http://schemas.pearson.com/wip-authoring/element/1",
					"elementdata":{
					"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
					"text":"Reveal Answer:"
					},
					"html":{
					"text":"<p class=\"paragraphNumeroUno\">Reveal Answer:</p>"},
					"versionUrn":"urn:pearson:work:b6621285-70e5-4134-abdd-9155deba2f75",
					"contentUrn":"urn:pearson:entity:964bb9be-3985-4882-bb15-2fb7164d2968"
				}
			],
			"show":[
				{
					"id":"urn:pearson:work:c6c7a0e9-bc43-4104-a7e0-eea67dd135c7",
					"type":"element-authoredtext",
					"schema":"http://schemas.pearson.com/wip-authoring/element/1",
					"elementdata":{
					"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
					"text":"a23"
					},
					"html":{
					"text":"<p class=\"paragraphNumeroUno\">a23</p>"},
					"versionUrn":"urn:pearson:work:c6c7a0e9-bc43-4104-a7e0-eea67dd135c7",
					"contentUrn":"urn:pearson:entity:e7b990a6-ade5-4492-8017-279391dc2cbf"
				}
			],
			"hide":[
				{
					"id":"urn:pearson:work:cca66471-b9ed-4409-a58d-84539999d53d",
					"type":"element-authoredtext",
					"schema":"http://schemas.pearson.com/wip-authoring/element/1",
					"elementdata":{
					"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
					"text":"asdasda"
					},
					"html":{
					"text":"<p class=\"paragraphNumeroUno\">asdasda</p>"},
					"versionUrn":"urn:pearson:work:cca66471-b9ed-4409-a58d-84539999d53d",
					"contentUrn":"urn:pearson:entity:c1d6e5ad-a35e-46b5-9833-448364cbf982"
				}
			]
		}
	},
	handleFocus: jest.fn(),
	updateElement: jest.fn(),
	accessDenied: jest.fn(),
	handleBlur: jest.fn(),
	model:{},
	elementList2Add: jest.fn(),
	addNestedElements: () => [{
		buttonType: 'text-elem',
		buttonHandler: jest.fn(),
		tooltipText: 'Text',
		tooltipDirection: 'left'
	}],
	sectionType: "show"
};
describe('1. ShowHideUiBlock test cases', () => { 
    it('1.1 ShowHideUiBlock render successfully', () => {
        const component = showhideInstance(props);
        expect(component).toHaveLength(1);
    });
	it('1.2 ShowHideUiBlock render successfully sectionType= "hide" ', () => {
		const newProps = {...props, sectionType: "hide"};
        const component = showhideInstance(newProps);
        expect(component).toHaveLength(1);
    });
});
describe('2. Reveal Answer test cases', () => {
    it('2.1 Reveal Answer render successfully', () => {
        const component = shallow(<RevealAnswer {...props} />);
        expect(component).toHaveLength(1);
    });
});
describe('3. SortElement test cases', () => {
    it('3.1 SortElement render successfully', () => {
        const component = shallow(<SortElement {...props} />);
        expect(component).toHaveLength(1);
    });
});