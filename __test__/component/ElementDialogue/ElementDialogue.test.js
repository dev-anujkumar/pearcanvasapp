import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
const middlewares = [thunk];
import configureMockStore from 'redux-mock-store';
import ElementDialogue from '../../../src/component/ElementDialogue/ElementDialogue';

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
    return function (callBlur) {
        //return (<div>null</div>)
		return <input type="text" onBlur={callBlur}/>
    }
})

const mockStore = configureMockStore(middlewares);
let initialState = {
	appStore: {
		asideData: {},
		parentUrn: {}
	}
};

const dialogueInstance = (props, initialSt = initialState) => {
    const store = mockStore(initialSt);
    const component = mount(<Provider store={store}><ElementDialogue {...props} /></Provider>);
    return component.find('ElementDialogue').instance();
}

describe('1. Dialogue element test cases', () => {
    let props = {
		index:0,
		permissions: ["elements_add_remove"],
		btnClassName: "activeTagBgColor",
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
			onClickCapture: jest.fn()
		},
		deleteScriptElement: jest.fn(),
		elemBorderToggle: true,
		borderToggle: "active",
		//
		activeElement: {
			elementId: "urn:pearson:work:c771a9fa-ef29-497c-bb6d-8dcfbb083181"
		},
		elementId: "urn:pearson:work:c771a9fa-ef29-497c-bb6d-8dcfbb083181"
	};
    it('1.1 Dialogue element render successfully', () => {
		const store = mockStore(initialState);
        const component = mount(<Provider store={store}><ElementDialogue {...props} /></Provider>);
        expect(component).toHaveLength(1);
        const compInstance = dialogueInstance(props);
        expect(compInstance).toBeDefined();
    });
	it('1.2 Test renderDialogueContent Function', () => {
        const compInstance = dialogueInstance(props);
        expect(compInstance).toBeDefined();
    });
	it('1.3 Test renderButtons Function', () => {
        const compInstance = dialogueInstance(props);
        expect(compInstance).toBeDefined();
    });
	describe('1.4 Test setBorderToggle Function', () => {
		
		it('1.4 Test handleOuterBlur Function 1st & 2nd If conditions', () => {
			const compInstance = dialogueInstance(props);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'setBorderToggle')
			compInstance.setBorderToggle("hideBorder", 0, 0);
			expect(spy).toHaveBeenCalled()
			spy.mockClear()
		});
		it('1.5 Test handleOuterBlur Function 1st else-If condition', () => {
			const compInstance = dialogueInstance(props);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'setBorderToggle')
			compInstance.setBorderToggle("hideBorder", 1, 0);
			expect(spy).toHaveBeenCalled()
			spy.mockClear()
		});
		it('1.6 Test handleOuterBlur Function 2nd else condition', () => {
			const compInstance = dialogueInstance(props);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'setBorderToggle')
			compInstance.setBorderToggle("sBorder", 1, 0);
			expect(spy).toHaveBeenCalled()
			spy.mockClear()
		});
		it('1.7 Test handleOuterBlur Function 3rd else-if condition', () => {
			props.borderToggle = undefined;
			const compInstance = dialogueInstance(props);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'setBorderToggle')
			compInstance.setBorderToggle("", 0, 0);
			expect(spy).toHaveBeenCalled()
			spy.mockClear()
		});
		it('1.8 Test handleOuterBlur Function last else condition', () => {
			props.borderToggle = undefined;
			const compInstance = dialogueInstance(props);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'setBorderToggle')
			compInstance.setBorderToggle("", 1, 0);
			expect(spy).toHaveBeenCalled()
			spy.mockClear()
		});
 	});
	it('1.5 Test handleOuterBlur Function', () => {
		let prop = {
			borderToggle: "showBorder",
			btnClassName: "",
			deleteElement: jest.fn(),
			elemBorderToggle: true,
			element: props.element,
			elementId: "urn:pearson:work:c771a9fa-ef29-497c-bb6d-8dcfbb083180",
			elementIndex: 0,
			elementSepratorProps: jest.fn(),
			handleBlur: jest.fn(),
			handleFocus: jest.fn(),
			index: 0,
			labelText: "SD",
			model: [{type: "stagedirection", text: "<p>2</p>"},
					{type: "lines", characterName: "<p>3weqwe</p>", text: "<p><span></span>421323</p>"}],
			permissions:[],
			slateLockInfo: {isLocked: false, userId: ""},
			type: undefined,
			updatePageNumber: undefined,
			userRole: "admin",
		}
		const compInstance = dialogueInstance(prop);
        expect(compInstance).toBeDefined();
		const spy = jest.spyOn(compInstance, 'handleOuterBlur')
		compInstance.handleOuterBlur("actTitle", { innerHTML: "" });
		expect(spy).toHaveBeenCalled()
		spy.mockClear()
    });
	it('1.6 Test updateSD_DE  Function', () => {
		const data = { type: "stagedirection", text: "<p>2</p>" };
		const compInstance = dialogueInstance(props);
        expect(compInstance).toBeDefined();
		const spy = jest.spyOn(compInstance, 'updateSD_DE')
		compInstance.updateSD_DE("", data, 0 );
		expect(spy).toHaveBeenCalled()
		spy.mockClear()
    });
	it('1.7 Test addElement  Function', () => {
		const data = {type: "lines", characterName: "", text: "<p></p>"};
		
		const compInstance = dialogueInstance(props);
        expect(compInstance).toBeDefined();
		const spy = jest.spyOn(compInstance, 'addElement')
		compInstance.addElement(0, 0, data, oldPSData);
		expect(spy).toHaveBeenCalled()
		spy.mockClear()
    });
	it('1.8 Test deleteElement   Function', () => {
		const compInstance = dialogueInstance(props);
        expect(compInstance).toBeDefined();
		const spy = jest.spyOn(compInstance, 'deleteElement')
		compInstance.deleteElement(0, 0, oldPSData);
		expect(spy).toHaveBeenCalled()
		spy.mockClear()
    });
});