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
   "authorName":"c5test09",
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
let initialState = {
	alfrescoReducer: {
	alfrescoAssetData: {},
	elementId: "urn",
	alfrescoListOption: [],
	launchAlfrescoPopup: true,
	editor: true,
	Permission: false
}};
const event = {
	stopPropagation: jest.fn(),
	preventDefault: jest.fn()
}
jest.mock('axios');
jest.mock('../../../src/component/ElementContainer/ElementContainer_Actions', () =>{
	return function () {
        return (<div>null</div>)
    }
});
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

/**config constants */
config.isCypressPlusEnabled = true;
config.SHOW_CYPRESS_PLUS = true;
config.slateManifestURN = "urn:pearson:manifest:a2438bed-1188-4f30-8ce7-b535e25598ee";
config.slateEntityURN = "urn:pearson:entity:937f01cc-b1f5-4e0b-a84e-43562d4e4b72";
config.projectUrn = "urn:pearson:distributable:fc5a0834-c117-4629-95bc-270d413c0ba9";

describe('1. PDF Slate test cases', () => {
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
		setPdfSlateAssetId: jest.fn(),
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

	describe('1.2 Test componentDidMount Function', () => {
		let props1 = {
			index:0,
			permissions: ["elements_add_remove", "add_multimedia_via_alfresco", "alfresco_crud_access"],
			element: {
				id: "urn:pearson:work:c771a9fa-ef29-497c-bb6d-8dcfbb083180",
				html: {},
				"versionUrn": "urn:pearson:work:c771a9fa-ef29-497c-bb6d-8dcfbb083102",
				"contentUrn": "urn:pearson:entity:c771a9fa-ef29-497c-bb6d-8dcfbb083103",
				schema:"http://schemas.pearson.com/wip-authoring/element/1"
			},
			handleFocus: jest.fn(),
			updateElement: jest.fn(),
			accessDenied: jest.fn(),
			handleBlur: jest.fn(),
			setPdfSlateAssetId: jest.fn(),
			model:{}
		}; 
		it('1.2.1 Test If Case', () => { 
			const compInstance = pdfSlateInstance(props);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'componentDidMount')
			compInstance.componentDidMount();
			expect(spy).toHaveBeenCalled();
			spy.mockClear()
		});
		it('1.2.2 Test Else Case', () => { 
			config.isCypressPlusEnabled = false;
			const compInstance = pdfSlateInstance(props1);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'componentDidMount')
			compInstance.componentDidMount();
			expect(spy).toHaveBeenCalled();
			spy.mockClear()
		});
	});

	describe('1.3 Test submitElement Function', () => {
		let props2 = {
			index:0,
			permissions: ["elements_add_remove", "add_multimedia_via_alfresco", "alfresco_crud_access"],
			handleFocus: jest.fn(),
			updateElement: jest.fn(),
			accessDenied: jest.fn(),
			handleBlur: jest.fn(),
			setPdfSlateAssetId: jest.fn(),
			model:{}
		};
		it('1.3.1 test case for props in submit element', () => {
			const compInstance = pdfSlateInstance(props2);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'sumbitElement');
			compInstance.sumbitElement(props2);
			expect(spy).toHaveBeenCalled();
			spy.mockClear();
		})
	})
	
	describe('1.4 Test componentWillUnmount Function', () => { 
		it('1.4.1 Test If Case', () => { 
			const compInstance = pdfSlateInstance(props);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'componentWillUnmount')
			compInstance.componentWillUnmount();
			expect(spy).toHaveBeenCalled();
			spy.mockClear()
		});
	});
	describe('1.5 Test OpenAlfresco Function', () => {
		it('1.5.1 Test - Object.keys(alfrescoPath.alfresco).length > 0', () => {
			config.alfrescoMetaData = alfresco;
			const compInstance = pdfSlateInstance(props);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'OpenAlfresco');
			compInstance.OpenAlfresco();
			expect(spy).toHaveBeenCalled();
			spy.mockClear();
		});
		xit('1.5.2 Test - Object.keys(alfrescoPath.alfresco).length < 0', () => {
			config.alfrescoMetaData = { ...alfresco, alfresco:{} };
			const compInstance = pdfSlateInstance(props);
			expect(compInstance).toBeDefined();
			axios.patch = jest.fn(() => Promise.resolve({ data: { name: "test" } }));
			const spy = jest.spyOn(compInstance, 'OpenAlfresco');
			compInstance.OpenAlfresco();
			expect(spy).toHaveBeenCalled();
			spy.mockClear();
		});
		it('1.5.3 Test - Object.keys(alfrescoPath.alfresco).length < 0', () => {
			config.alfrescoMetaData = { ...alfresco, alfresco:{} };
			const newProps = {...props, permissions: ["elements_add_remove", "add_multimedia_via_alfresco"]};
			const compInstance = pdfSlateInstance(newProps);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'OpenAlfresco');
			compInstance.OpenAlfresco();
			expect(spy).toHaveBeenCalled();
			spy.mockClear();
		});
		it('1.5.4 Test - alfrescoPath.alfresco?.nodeRef == undefined', () => {
			config.alfrescoMetaData = { ...alfresco, alfresco:{...alfresco.alfresco, nodeRef: undefined} };
			const newProps = {...props, permissions: ["elements_add_remove", "add_multimedia_via_alfresco"]};
			const compInstance = pdfSlateInstance(newProps);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'OpenAlfresco');
			compInstance.OpenAlfresco();
			expect(spy).toHaveBeenCalled();
			spy.mockClear();
		});
		it('1.5.5 Test - permissions.includes(add_multimedia_via_alfresco) == False', () => {
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
	describe('1.6 Test getAlfrescoData Function', () => {
		it('1.6.1 > smartLinkString > true', () => {
			const pdfData = {
				content: {
					mimeType: 'media/mp3'
				},
				properties: {
					"cm:description": "{\"smartLinkType\":\"pdf\"}",
					"avs:url": "https://www.pearsonhighered.com",
					"cm:title": "Test Pdf"
				},
				"institution-urls": [{
					publicationUrl: "https://www.pearsonhighered.com"
				}],
				id: '007'
			};
			const compInstance = pdfSlateInstance(props);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'getAlfrescoData');
			compInstance.getAlfrescoData(pdfData);
			expect(spy).toHaveBeenCalled();
			spy.mockClear();
		});
		it('1.6.1 > (smartLinkType?.toLowerCase() NOT pdf)', () => {
			const pdfData = {
				content: {
					mimeType: 'media/pdf'
				},
				properties: {
					"cm:description": "{\"smartLinkType\":\"test\"}",
					"avs:url": "https://www.pearsonhighered.com",
					"cm:title": "Test Pdf"
				},
				"institution-urls": [{
					publicationUrl: "https://www.pearsonhighered.com"
				}],
				id: '007'
			};
			const compInstance = pdfSlateInstance(props);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'getAlfrescoData');
			compInstance.getAlfrescoData(pdfData);
			expect(spy).toHaveBeenCalled();
			spy.mockClear();
		});
		it('1.6.2 > smartLinkString > true > without ["avs:url"]', () => {
			const pdfData = {
				content: {
					mimeType: 'media/mp3'
				},
				properties: {
					"cm:description": "{\"smartLinkType\":\"pdf\"}",
				},
				"institution-urls": [{
					publicationUrl: "https://www.pearsonhighered.com"
				}],
				id: '007'
			};
			const compInstance = pdfSlateInstance(props);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'getAlfrescoData');
			compInstance.getAlfrescoData(pdfData);
			expect(spy).toHaveBeenCalled();
			spy.mockClear();
		});
		it('1.6.3 > smartLinkString > false', () => {
			const pdfData = {
				content: {
					mimeType: 'media/mp3'
				},
				properties: {
					"cm:description": "eps media",
				},
			};
			const compInstance = pdfSlateInstance(props);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'getAlfrescoData');
			compInstance.getAlfrescoData(pdfData);
			expect(spy).toHaveBeenCalled();
			spy.mockClear();
		});
		it('1.6.4 > if (pdfData?.id) > else', () => {
			const pdfData = {
				content: {
					mimeType: 'media/mp3'
				},
				properties: {
					"cm:description": "{\"smartLinkType\":\"pdf\"}",
					"avs:url": "https://www.pearsonhighered.com"
				},
				"institution-urls": [{
					publicationUrl: "https://www.pearsonhighered.com"
				}],
			};
			const compInstance = pdfSlateInstance(props);
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'getAlfrescoData');
			compInstance.getAlfrescoData(pdfData);
			expect(spy).toHaveBeenCalled();
			spy.mockClear();
		});
	});
	describe('1.7 Testing componentDidUpdate', () => {
		it('1.7.1 If Conditon - this.props.element.id === alfrescoElementId && prevProps.alfrescoElementId !== alfrescoElementId && !launchAlfrescoPopup ', () => {
			let props2 = {
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
				setPdfSlateAssetId:jest.fn(),
				alfrescoAssetData: {},
				alfrescoElementId: "urn:pearson:work:c771a9fa-ef29-497c-bb6d-8dcfbb083180"
			};
			let prevProps = {
				alfrescoElementId: "urn:pearson:work:4ba8a189-097d-44b6-9cd6-e8ac18637921"
			};
			let initialState2 = {
				alfrescoReducer: {
				alfrescoAssetData: {},
				elementId: "urn:pearson:work:c771a9fa-ef29-497c-bb6d-8dcfbb083180",
				alfrescoListOption: [],
				launchAlfrescoPopup: false,
				editor: true,
				Permission: false
			}};
			const store = mockStore(initialState2);
    		const component = mount(<Provider store={store}><PdfSlate {...props2} /></Provider>);
			const compInstance = component.find('PdfSlate').instance();
			expect(compInstance).toBeDefined();
			const spy = jest.spyOn(compInstance, 'componentDidUpdate');
			compInstance.componentDidUpdate(prevProps);
			expect(spy).toHaveBeenCalled();
			spy.mockClear();
		});
	});
});