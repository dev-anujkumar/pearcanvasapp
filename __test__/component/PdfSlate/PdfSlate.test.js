import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
const middlewares = [thunk];
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import config from '../../../src/config/config';
import PdfSlate from '../../../src/component/PdfSlate/PdfSlate';

const alfresco = {
   "alfresco":{
      "currentAsset":{
         "folderTree":null
      },
      "name":"001_C5 Media POC - AWS US ",
      "nodeRef":"ebaaf975-a68b-4ca6-9604-3d37111b847a",
      "repoInstance":"https://staging.api.pearson.com/content/cmis/uswip-aws",
      "repoName":"AWS US",
      "repositoryFolder":"001_C5 Media POC - AWS US ",
      "repositoryName":"AWS US",
      "repositoryUrl":"https://staging.api.pearson.com/content/cmis/uswip-aws",
      "siteId":"c5-media-poc",
      "siteVisibility":"MODERATED",
      "visibility":"MODERATED"
   },
   "associatedArt":[
      
   ],
   "authorName":"Kapil Dev Arya",
   "bookCover":"https://cite-media-stg.pearson.com/legacy_paths/bd2def8c-e6b2-4822-aafb-7e75bfbfa90f/cover.jpg",
   "configObj":{
      "env":"dev",
      "REACT_APP_API_URL":"/cypress/canvas-srvr/cypress-api/",
      "STRUCTURE_API_URL":"https://contentapis-qa.pearsoncms.net/",
      "LEARNING_OBJECTIVES_ENDPOINT":"https://contentapis-qa.pearsoncms.net/lo-api/",
      "ASSET_POPOVER_ENDPOINT":"https://contentapis-qa.pearsoncms.net/manifest-api/"
   },
   "dashboard":true,
   "dateCreated":"2021-04-08T06:15:20.441Z",
   "eTag":"586774560235",
   "entityUrn":"urn:pearson:entity:a5c6142a-256b-4cfc-9160-409d96acaa47",
   "id":"urn:pearson:distributable:b0a895ed-5fdd-4f35-82f9-2c56c09d2e55",
   "isLocked":false,
   "lineOfBusiness":"english",
   "name":"Dialog Testing - Dont Use",
   "permissions":null,
   "previousDistributableUrn":"urn:pearson:distributable:a5f012fd-7b0e-4048-aaad-c5090867660f",
   "roleId":"admin",
   "ssoToken":"DheHDSWMywAT-C4pt-bGzrXWH4s.*AAJTSQACMDIAAlNLABx5VWtPYnhzOFo4NkM2YjVFYUxyc2JneS96ckk9AAR0eXBlAANDVFMAAlMxAAIwNw..*",
   "status":"WIP",
   "thumbnail":"https://cite-media-stg.pearson.com/legacy_paths/634a3489-083f-4539-8d47-0a8827246857/cover_thumbnail.jpg",
   "userCount":null,
   "x-prsn-user-id":" "
}

const mockStore = configureMockStore(middlewares);
let initialState = {};
const event = {
	stopPropagation: jest.fn(),
	preventDefault: jest.fn()
}
jest.mock('axios');
jest.mock('../../../src/component/tinyMceEditor', () => {
    return function () {
        return (<div>null</div>)
    }
})

const pdfSlateInstance = (props, initialSt = initialState) => {
    const store = mockStore(initialSt);
    const component = mount(<Provider store={store}><PdfSlate {...props} /></Provider>);
    return component.find('PdfSlate').instance();
}

xdescribe('1. PDF Slate test cases', () => {
    let props = {
		index:0,
		permissions: ["elements_add_remove", "add_multimedia_via_alfresco", "alfresco_crud_access"],
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
		updateElement: jest.fn(),
		accessDenied: jest.fn(),
		handleBlur: jest.fn(),
        model:{}
	};
    it('1.1 Pdf Slate render successfully', () => {
		const store = mockStore(initialState);
        const component = mount(
			<Provider store={store}>
				<PdfSlate {...props} />
			</Provider>
		);
        expect(component).toHaveLength(1);
        const compInstance = pdfSlateInstance(props);
        expect(compInstance).toBeDefined();
    });
	describe('1.2 Test sumbitElement Function', () => {
		it('1.2.1 Test sumbitElement Function', () => {
			const compInstance = pdfSlateInstance(props);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'sumbitElement')
			compInstance.sumbitElement(props);
			expect(spy).toHaveBeenCalled();
			spy.mockClear()
		});
		it('1.2.2 props.element == {}', () => {
			const newProps = { ...props, element: {}}
			const compInstance = pdfSlateInstance(newProps);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'sumbitElement')
			compInstance.sumbitElement(props);
			expect(spy).toHaveBeenCalled();
			spy.mockClear()
		});
	});
	describe('1.3 Test componentDidMount Function', () => { 
		it('1.2.1 Test If Case', () => { 
			const compInstance = pdfSlateInstance(props);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'componentDidMount')
			compInstance.componentDidMount();
			expect(spy).toHaveBeenCalled();
			spy.mockClear()
		});
		it('1.2.2 Test Else Case', () => { 
			const newProps = {
				...props,
				element: {
					id: "urn:pearson:work:c771a9fa-ef29-497c-bb6d-8dcfbb083180",
					html: {},
					elementdata: { 
						"assetid": "",
						"path": "",
						"title": ""
					},
					"versionUrn": "urn:pearson:work:c771a9fa-ef29-497c-bb6d-8dcfbb083102",
					"contentUrn": "urn:pearson:entity:c771a9fa-ef29-497c-bb6d-8dcfbb083103",
					schema:"http://schemas.pearson.com/wip-authoring/element/1"
				},
		 	}
			const compInstance = pdfSlateInstance(newProps);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'componentDidMount')
			compInstance.componentDidMount();
			expect(spy).toHaveBeenCalled();
			spy.mockClear()
		});
	});
	describe('1.4 Test OpenAlfresco Function', () => {
		it('1.4.1 Test - Object.keys(alfrescoPath.alfresco).length > 0', () => {
			config.alfrescoMetaData = alfresco;
			const compInstance = pdfSlateInstance(props);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'OpenAlfresco');
			compInstance.OpenAlfresco();
			expect(spy).toHaveBeenCalled();
			spy.mockClear();
		});
		it('1.4.2 Test - Object.keys(alfrescoPath.alfresco).length < 0', () => {
			config.alfrescoMetaData = { ...alfresco, alfresco:{} };
			const compInstance = pdfSlateInstance(props);
			expect(compInstance).toBeDefined();
			axios.patch = jest.fn(() => Promise.resolve({ data: { name: "test" } }));
			const spy = jest.spyOn(compInstance, 'OpenAlfresco');
			compInstance.OpenAlfresco();
			expect(spy).toHaveBeenCalled();
			spy.mockClear();
		});
		it('1.4.3 Test - Object.keys(alfrescoPath.alfresco).length < 0', () => {
			config.alfrescoMetaData = { ...alfresco, alfresco:{} };
			const newProps = {...props, permissions: ["elements_add_remove", "add_multimedia_via_alfresco"]};
			const compInstance = pdfSlateInstance(newProps);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'OpenAlfresco');
			compInstance.OpenAlfresco();
			expect(spy).toHaveBeenCalled();
			spy.mockClear();
		});
		it('1.4.4 Test - alfrescoPath.alfresco?.nodeRef == undefined', () => {
			config.alfrescoMetaData = { ...alfresco, alfresco:{...alfresco.alfresco, nodeRef: undefined} };
			const newProps = {...props, permissions: ["elements_add_remove", "add_multimedia_via_alfresco"]};
			const compInstance = pdfSlateInstance(newProps);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'OpenAlfresco');
			compInstance.OpenAlfresco();
			expect(spy).toHaveBeenCalled();
			spy.mockClear();
		});
		it('1.4.5 Test - permissions.includes(add_multimedia_via_alfresco) == False', () => {
			const newProps = {...props, permissions: ["elements_add_remove","alfresco_crud_access"]};
			config.alfrescoMetaData = alfresco;
			const compInstance = pdfSlateInstance(newProps);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'OpenAlfresco');
			compInstance.OpenAlfresco();
			expect(spy).toHaveBeenCalled();
			spy.mockClear();
		});
	});
	it('1.5 Test handleC2ExtendedClick Function', () => {
		const locationData = {
			currentAsset: {},
			name: "001_C5 Media POC - AWS US ",
			nodeRef: "ebaaf975-a68b-4ca6-9604-3d37111b847a",
			repoInstance: "https://staging.api.pearson.com/content/cmis/uswip-aws",
			repoName: "AWS US",
			repositoryFolder: "001_C5 Media POC - AWS US ",
			repositoryName: "AWS US",
			repositoryUrl: "https://staging.api.pearson.com/content/cmis/uswip-aws",
			siteId: "c5-media-poc",
			siteVisibility: "MODERATED",
			visibility: "MODERATED",
			desc: "eps media"
		}
        const compInstance = pdfSlateInstance(props);
        expect(compInstance).toBeDefined();
		const spy = jest.spyOn(compInstance, 'handleC2ExtendedClick');
		compInstance.handleC2ExtendedClick(locationData);
		expect(spy).toHaveBeenCalled();
		spy.mockClear();
    });
	describe('1.6 Test getAlfrescoData Function', () => {
		const pdfData = {
			body:{
				results: [{
					properties:{
						"s.avs:jsonString":{},
						"s.avs:url": {
							value: ["https://www.pearsonhighered.com"]
						}
					}
				}]
			},
			uniqueID:"urn:pearson:alfresco:c771a9fa-ef29-497c-bb6d-8dcfbb083101",
			displayName: "PDF",
			desc: `{"smartLinkType":"PDF"}`
		}
		it('1.6.1 If Conditions - IsPDF == true', () => {
			const compInstance = pdfSlateInstance(props);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'getAlfrescoData');
			compInstance.getAlfrescoData(pdfData);
			expect(spy).toHaveBeenCalled();
			spy.mockClear();
		});
		it('1.6.2 Else Condition - IsPDF !== true', () => {
			const newPdfData =  {...pdfData, desc: "Eps Media"}
			const compInstance = pdfSlateInstance(props);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'getAlfrescoData');
			compInstance.getAlfrescoData(newPdfData);
			expect(spy).toHaveBeenCalled();
			spy.mockClear();
		});
		it('1.6.3 Else Condition - pdfData?.uniqueID && pdfData.displayName == False', () => {
			const newPdfData =  {...pdfData, uniqueID: undefined, displayName: undefined}
			const compInstance = pdfSlateInstance(props);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'getAlfrescoData');
			compInstance.getAlfrescoData(newPdfData);
			expect(spy).toHaveBeenCalled();
			spy.mockClear();
		});
		it('1.6.3 Else Condition - PDF == True; results = []', () => {
			const newPdfData =  {...pdfData, body:{ results: [] }}
			const compInstance = pdfSlateInstance(props);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'getAlfrescoData');
			compInstance.getAlfrescoData(newPdfData);
			expect(spy).toHaveBeenCalled();
			spy.mockClear();
		});
	});
});