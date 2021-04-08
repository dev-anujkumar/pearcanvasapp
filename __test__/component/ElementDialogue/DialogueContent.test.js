import React from 'react';
import { mount } from 'enzyme';
import DialogueContent from '../../../src/component/ElementDialogue/DialogueContent';

const oldPSData = {
	"contentUrn":"urn:pearson:entity:4e474860-267a-452d-8e4e-159b1dc8dfde",
	"credits":{
		"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
		"text":""
	},
	"elementdata":{
		"acttitle":{
			"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
			"text":"dasd"
		},
		"dialoguecontents":[
			{
				"type":"stagedirection",
				"stagedirection":{
				"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
				"text":""
				}
			},
			{
				"lines":[
				{
					"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
					"text":""
				}
				],
				"speaker":{
				"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
				"text":""
				},
				"type":"lines"
			}
		],
		"numberedlines":true,
		"scenetitle":{
			"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
			"text":""
		},
		"startNumber":"1"
	},
	"html":{
		"actTitle":"<p>dasd</p>",
		"sceneTitle":"<p></p>",
		"dialogueContent": [
				{ type: "stagedirection", text: "<p>2</p>" },
				{ type: "lines", characterName: "<p>3weqwe</p>", text: "<p><span></span>421323</p>" }
			],
		"credits":"<p></p>",
		"footnotes":{}
	},
	"id":"urn:pearson:work:af67a215-b0b0-4919-a25a-cb4d56b893e7",
	"schema":"http://schemas.pearson.com/wip-authoring/element/1",
	"type":"element-dialogue",
	"versionUrn":"urn:pearson:work:af67a215-b0b0-4919-a25a-cb4d56b893e7"
};

jest.mock('../../../src/component/tinyMceEditor.js', () => {
    return function () {
        return (<div>null</div>)
    }
})

const event = {
	stopPropagation: jest.fn(),
	preventDefault: jest.fn()
}

const dialogueInstance = (props) => {
    const component = mount(<DialogueContent {...props} />);
    return component.find('DialogueContent').instance();
}

describe('1. DialogueContent component test cases', () => {
    let props = {
		index:0,
		elementIndex: 0,
		model: [
			{ type: "stagedirection", text: "<p>2</p>" },
			{ type: "lines", characterName: "<p>3weqwe</p>", text: "<p><span></span>421323</p>"}
		],
		permissions: ["elements_add_remove"],
		className: "",
		element: {
			id: "urn:pearson:work:c771a9fa-ef29-497c-bb6d-8dcfbb083180",
			html: {
				actTitle:"<p>dasd</p>",
				sceneTitle:"<p></p>",
				credits:"<p></p>",
				dialogueContent: [
					{ type: "stagedirection", text: "<p>2</p>" },
					{ type: "lines", characterName: "<p>3weqwe</p>", text: "<p><span></span>421323</p>" }
				]	
			},
			handleOnMouseOver: jest.fn(),
			onMouseOut: jest.fn(),
			onClickCapture: jest.fn(),
			elementdata: { 
				startNumber: 2,
				numberedlines : false
			}
		},
		deleteScriptElement: jest.fn(),
		elemBorderToggle: true,
		borderToggle: "active",
		//
		activeElement: {
			elementId: "urn:pearson:work:c771a9fa-ef29-497c-bb6d-8dcfbb083181"
		},
		elementId: "urn:pearson:work:c771a9fa-ef29-497c-bb6d-8dcfbb083181",
		//
		handleFocus: jest.fn(),
		labelText: "DE",
		slateLockInfo: {isLocked: false, userId: ""},
		handleBlur: jest.fn(),
		handleEditorFocus: jest.fn(),
		openGlossaryFootnotePopUp: "",
		glossaryFootnoteValue: "",
		glossaaryFootnotePopup:" "

	};
    it('1.1 DialogueContent component render successfully', () => {
        const component = mount(<DialogueContent {...props} />);
        expect(component).toHaveLength(1);
        const compInstance = dialogueInstance(props);
        expect(compInstance).toBeDefined();
    });
	it('1.2 DialogueContent component render successfully', () => {
		props.labelText = "SD";
		props.placeholder = "Enter Stage Directions...";
        const compInstance = dialogueInstance(props);
        expect(compInstance).toBeDefined();
    });
	it('1.3 DialogueContent component render successfully', () => {
		props.labelText = "DE";
        const compInstance = dialogueInstance(props);
        expect(compInstance).toBeDefined();
    });
});