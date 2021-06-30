import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
const middlewares = [thunk];
import configureMockStore from 'redux-mock-store';
import config from '../../../src/config/config';
import ShowHide from '../../../src/component/ShowHide/ShowHide.jsx';

const mockStore = configureMockStore(middlewares);
let initialState = {
	appStore: {
		asideData: {}, parentUrn: {} ,showHideObj: {}, permissions:[],
		slateLevelData: { 
			"urn:pearson:manifest:e62ba6f4-315c-4510-9200-f5cbe110a8bc": {
				contentUrn: "urn:pearson:entity:2d34786c-e971-4246-b149-0e46e0769bd8",
				id: "urn:pearson:manifest:520ecd5e-3002-41b4-9813-b37551427930",
				interactivedata:{
					hide: [{}],
					postertextobject: [{}],
					show: [{}, {}]
				},
				schema: "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
				status: "wip",
				type: "showhide",
				versionUrn: "urn:pearson:manifest:520ecd5e-3002-41b4-9813-b37551427930"
			}
		}
	},
	selectionReducer: {selection: {}},
	toolbarReducer: {elemBorderToggle:""},
	slateLockReducer: {slateLockInfo:{}}
};
const event = {
	stopPropagation: jest.fn(),
	preventDefault: jest.fn(),
	oldDraggableIndex: 0
}

jest.mock('../../../src/component/tinyMceEditor.js', () => {
    return function () {
        return (<div>null</div>)
    }
})
jest.mock('../../../src/component/ShowHide/Components/ShowHideUiBlock.jsx', () => {
    return function () {
        return (<div>null</div>)
    }
})
jest.mock('../../../src/component/ShowHide/Components/RevealAnswer.jsx', () => {
    return function () {
        return (<div>null</div>)
    }
})
const showhideInstance = (props, initialSt = initialState) => {
    const store = mockStore(initialSt);
    const component = mount(<Provider store={store}><ShowHide {...props} /></Provider>);
    return component.find('ShowHide').instance();
}

describe('1. ShowHide test cases', () => {
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
						"text":"<p class=\"paragraphNumeroUno\">Reveal Answer:</p>",
						"footnotes":{
							
						},
						"assetsPopover":{
							
						},
						"glossaryentries":{
							
						}
						},
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
						"text":"<p class=\"paragraphNumeroUno\">a23</p>",
						"footnotes":{
							
						},
						"assetsPopover":{
							
						},
						"glossaryentries":{
							
						}
						},
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
						"text":"<p class=\"paragraphNumeroUno\">asdasda</p>",
						"footnotes":{
							
						},
						"assetsPopover":{
							
						},
						"glossaryentries":{
							
						}
						},
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
		createShowHideElement: jest.fn(),
		setActiveElement: jest.fn(),
		swapElement: jest.fn(),
		parentElement: {
			contentUrn: "urn:pearson:entity:2d34786c-e971-4246-b149-0e46e0769bd8",
			id: "urn:pearson:manifest:520ecd5e-3002-41b4-9813-b37551427930",
			interactivedata:{
				hide: [{}],
				postertextobject: [{}],
				show: [{}, {}]
			},
			schema: "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
			status: "wip",
			type: "showhide",
			versionUrn: "urn:pearson:manifest:520ecd5e-3002-41b4-9813-b37551427930"
		}
	};
    it('1.1 ShowHide render successfully', () => {
		const store = mockStore(initialState);
        const component = mount(
			<Provider store={store}>
				<ShowHide {...props} />
			</Provider>
		);
        expect(component).toHaveLength(1);
        const compInstance = showhideInstance(props);
        expect(compInstance).toBeDefined();
    });
	it('1.2 Test onSortUpdate ', () => {
		config.slateManifestURN = "urn:pearson:manifest:e62ba6f4-315c-4510-9200-f5cbe110a8bc";
		const compInstance = showhideInstance(props);
		const spy = jest.spyOn(compInstance, 'onSortUpdate')
		compInstance.onSortUpdate(event, "show");
		expect(spy).toHaveBeenCalled();
		spy.mockClear()
    });
	//it('1.2 Test elementList2Add', () => {
	//	const compInstance = showhideInstance(props);
	//	const spy = jest.spyOn(compInstance, 'elementList2Add')
	//	compInstance.elementList2Add(0,true,"","","show");
	//	expect(spy).toHaveBeenCalled();
	//	spy.mockClear()
    //});
	//it('1.3 Test addElementInShowHide ', () => {
	//	config.savingInProgress = false;
	//	const compInstance = showhideInstance(props);
	//	const spy = jest.spyOn(compInstance, 'addElementInShowHide')
	//	compInstance.addElementInShowHide("0-0-0","","show","TEXT");
	//	expect(spy).toHaveBeenCalled();
	//	spy.mockClear()
    //});
});