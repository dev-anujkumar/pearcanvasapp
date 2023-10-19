import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';
import MetaDataPopup from '../../../src/component/ElementFigure/MetaDataPopUp';

describe('Testcase for MetaDataPopup Component', () => {
    let wrapper;
    let props = {
        element:{
            figuretype:"interactive"
        },
        togglePopup: jest.fn()
    }
    beforeEach(() => {
        wrapper = mount(<MetaDataPopup {...props} />);

    });
    it("render without crashing", () => {
        expect(wrapper).toHaveLength(1);
        let instance = wrapper.instance();
        expect(instance).toBeDefined();
    });
    it('onClick Event of cancel-button', () => {
        let togglePopup = jest.fn();
        const element = {
            figuredata: {},
            figuretype: 'image'
        }
        const component = mount(<MetaDataPopup togglePopup={togglePopup} element={element}/>);
        component.find('#close-container').simulate('click');
        expect(component.instance().props.togglePopup).toHaveBeenCalled();
    })
    it('onClick Event of longDescription body', () => {
        const component = mount(<MetaDataPopup {...props} />);
        component.find('.long-description-body').simulate('click');
    })
    it('getalfresco catch', () => {
        const component = mount(<MetaDataPopup {...props} />);
        axios.get = jest.fn(()=>Promise.reject())
    })
    it('onClick Event alt-text-body', () => {
        const component = mount(<MetaDataPopup {...props} />);
        component.find('.alt-text-body').simulate('click');
    })
    it('onClick Event metadata-import-button', () => {
        let togglePopup = jest.fn();
        const mockResponse = { data: {entry: {properties: { "avs:jsonString":"{\n\"smartLinkThirdPartyVendorVal\":\"Geogebra\",\n\"linkLongDesc\":\"link long desc data to fetch\",\n\"imageReferenceURL\":\"\",\n\"imageAltText\":\"This is the sample  alt text from gk new data\",\n\"captionText\":\"\",\n\"copyrightCreditText\":\"\"\n}"}}}, status: 200 }
        axios.put = jest.fn(() => Promise.resolve(mockResponse));
        axios.get =jest.fn(() => Promise.resolve(mockResponse));
        const component = mount(<MetaDataPopup {...props} togglePopup={togglePopup} />);
        component.setState({metaData:{
            "avs:jsonString":"{\n\"smartLinkThirdPartyVendorVal\":\"Geogebra\",\n\"linkLongDesc\":\"link long desc data to fetch\",\n\"imageReferenceURL\":\"\",\n\"imageAltText\":\"This is the sample  alt text from gk new data\",\n\"captionText\":\"\",\n\"copyrightCreditText\":\"\"\n}"
        }})   
        component.find('.metadata-import-button').simulate('click');
        expect(axios.put).toHaveBeenCalledTimes(1);
    })
    it('onClick Event metadata-import-button else case', () => {
        let props = {
            element:{
                figuretype:""
            },
            togglePopup: jest.fn()
        }
        let togglePopup = jest.fn();
        const component = mount(<MetaDataPopup {...props} togglePopup={togglePopup} />);
        component.setState({metaData:{
            "avs:jsonString":"{\n\"smartLinkThirdPartyVendorVal\":\"Geogebra\",\n\"linkLongDesc\":\"link long desc data to fetch\",\n\"imageReferenceURL\":\"\",\n\"imageAltText\":\"This is the sample  alt text from gk new data\",\n\"captionText\":\"\",\n\"copyrightCreditText\":\"\"\n}"
        }})   
        component.find('.metadata-import-button').simulate('click');
    })
    it('onClick Event metadata-import-button for image', () => {
        let togglePopup = jest.fn();
        const mockResponse = { data: {entry: {properties: { "avs:jsonString":"{\n\"smartLinkThirdPartyVendorVal\":\"Geogebra\",\n\"linkLongDesc\":\"link long desc data to fetch\",\n\"imageReferenceURL\":\"\",\n\"imageAltText\":\"This is the sample  alt text from gk new data\",\n\"captionText\":\"\",\n\"copyrightCreditText\":\"\"\n}"}}}, status: 200 }
        axios.put = jest.fn(() => Promise.resolve(mockResponse));
        axios.get =jest.fn(() => Promise.resolve(mockResponse));
        const props = {
            element:{
                figuredata: {},
                figuretype:"image"
            },
            togglePopup: jest.fn(),
            updateFigureData: jest.fn(),
            handleFocus: jest.fn(),
            handleBlur: jest.fn()
        }
        const component = mount(<MetaDataPopup {...props} togglePopup={togglePopup} />);
        component.setState({metaData:{
            "avs:jsonString":"{\n\"smartLinkThirdPartyVendorVal\":\"Geogebra\",\n\"linkLongDesc\":\"link long desc data to fetch\",\n\"imageReferenceURL\":\"\",\n\"imageAltText\":\"This is the sample  alt text from gk new data\",\n\"captionText\":\"\",\n\"copyrightCreditText\":\"\"\n}"
        }})   
        component.find('.metadata-import-button').simulate('click');
        expect(axios.put).toHaveBeenCalledTimes(1);
    })
    it('onClick Event metadata-import-button for disableUpdateButton false', () => {
        let togglePopup = jest.fn();
        const mockResponse = { data: {entry: {properties: { "avs:jsonString":"{\n\"smartLinkThirdPartyVendorVal\":\"Geogebra\",\n\"linkLongDesc\":\"link long desc data to fetch\",\n\"imageReferenceURL\":\"\",\n\"imageAltText\":\"This is the sample  alt text from gk new data\",\n\"captionText\":\"\",\n\"copyrightCreditText\":\"\"\n}"}}}, status: 200 }
        axios.put = jest.fn(() => Promise.resolve(mockResponse));
        axios.get =jest.fn(() => Promise.resolve(mockResponse));
        const props = {
            element:{
                figuredata: {
                    alttext: 'This is the sample  alt text from gk new data',
                    longdescription: 'link long desc data to fetch'
                },
                figuretype:"interactive"
            },
            togglePopup: jest.fn(),
            updateFigureData: jest.fn(),
            handleFocus: jest.fn(),
            handleBlur: jest.fn()
        }
        const component = mount(<MetaDataPopup {...props} togglePopup={togglePopup} />);
        component.setState({metaData:{
            "avs:jsonString":"{\n\"smartLinkThirdPartyVendorVal\":\"Geogebra\",\n\"linkLongDesc\":\"link long desc data to fetch\",\n\"imageReferenceURL\":\"\",\n\"imageAltText\":\"This is the sample  alt text from gk new data\",\n\"captionText\":\"\",\n\"copyrightCreditText\":\"\"\n}"
        }})   
        component.find('.metadata-import-button').simulate('click');
        expect(axios.put).toHaveBeenCalledTimes(1);
    })
    it('onClick Event metadata-import-button for disableUpdateButton true for opener', () => {
        let togglePopup = jest.fn();
        const mockResponse = { data: {entry: {properties: { 'cplg:altText': '1', "cplg:longDescription": '2'}}}, status: 200 }
        axios.put = jest.fn(() => Promise.resolve(mockResponse));
        axios.get =jest.fn(() => Promise.resolve(mockResponse));
        const props = {
            element:{
                figuredata: {
                    alttext: '1',
                    longdescription: '3'
                }
            },
            togglePopup: jest.fn(),
            updateFigureData: jest.fn(),
            handleFocus: jest.fn(),
            handleBlur: jest.fn()
        }
        const component = mount(<MetaDataPopup {...props} togglePopup={togglePopup} />);
        component.setState({metaData:{
            "avs:jsonString":"{\n\"smartLinkThirdPartyVendorVal\":\"Geogebra\",\n\"linkLongDesc\":\"link long desc data to fetch\",\n\"imageReferenceURL\":\"\",\n\"imageAltText\":\"This is the sample  alt text from gk new data\",\n\"captionText\":\"\",\n\"copyrightCreditText\":\"\"\n}"
        }})   
        component.find('.metadata-import-button').simulate('click');
        expect(axios.put).toHaveBeenCalledTimes(1);
    })
    it('onClick Event metadata-import-button for disableUpdateButton false for opener', () => {
        let togglePopup = jest.fn();
        const mockResponse = { data: {entry: {properties: { 'cplg:altText': '1', "cplg:longDescription": '2'}}}, status: 200 }
        axios.put = jest.fn(() => Promise.resolve(mockResponse));
        axios.get =jest.fn(() => Promise.resolve(mockResponse));
        const props = {
            element:{
                type: 'openerelement',
                backgroundimage: {
                    imageid: 'urn',
                    alttext: '1',
                    longdescription: '2'
                }
            },
            togglePopup: jest.fn(),
            updateFigureData: jest.fn(),
            handleFocus: jest.fn(),
            handleBlur: jest.fn()
        }
        const component = mount(<MetaDataPopup {...props} togglePopup={togglePopup} />);
        component.setState({metaData:{
            "avs:jsonString":"{\n\"smartLinkThirdPartyVendorVal\":\"Geogebra\",\n\"linkLongDesc\":\"link long desc data to fetch\",\n\"imageReferenceURL\":\"\",\n\"imageAltText\":\"This is the sample  alt text from gk new data\",\n\"captionText\":\"\",\n\"copyrightCreditText\":\"\"\n}"
        }})   
        component.find('.metadata-import-button').simulate('click');
        expect(axios.put).toHaveBeenCalledTimes(1);
    })
    it('onClick Event metadata-import-button for smartlink', () => {
        let togglePopup = jest.fn();
        const mockResponse = { data: {entry: {properties: { "avs:jsonString":"{\n\"smartLinkThirdPartyVendorVal\":\"Geogebra\",\n\"linkLongDesc\":\"link long desc data to fetch\",\n\"imageReferenceURL\":\"\",\n\"imageAltText\":\"This is the sample  alt text from gk new data\",\n\"captionText\":\"\",\n\"copyrightCreditText\":\"\"\n}"}}}, status: 200 }
        axios.put = jest.fn(() => Promise.resolve(mockResponse));
        axios.get =jest.fn(() => Promise.resolve(mockResponse));
        const props = {
            element:{
                type: 'figure',
                figuredata: {
                    interactivetype:'3rd-party',
                    interactiveid: 'urn'
                },
                figuretype:"interactive"
            },
            togglePopup: jest.fn(),
            updateFigureData: jest.fn(),
            handleFocus: jest.fn(),
            handleBlur: jest.fn()
        }
        const component = mount(<MetaDataPopup {...props} togglePopup={togglePopup} />);
        component.setState({metaData:{
            "avs:jsonString":"{\n\"smartLinkThirdPartyVendorVal\":\"Geogebra\",\n\"linkLongDesc\":\"link long desc data to fetch\",\n\"imageReferenceURL\":\"\",\n\"imageAltText\":\"This is the sample  alt text from gk new data\",\n\"captionText\":\"\",\n\"copyrightCreditText\":\"\"\n}"
        }})   
        component.find('.metadata-import-button').simulate('click');
        expect(axios.put).toHaveBeenCalledTimes(1);
    })
    
    it('onClick Event metadata-import-button for opener', () => {
        let togglePopup = jest.fn();
        const mockResponse = { data: {entry: {properties: { "avs:jsonString":"{\n\"smartLinkThirdPartyVendorVal\":\"Geogebra\",\n\"linkLongDesc\":\"link long desc data to fetch\",\n\"imageReferenceURL\":\"\",\n\"imageAltText\":\"This is the sample  alt text from gk new data\",\n\"captionText\":\"\",\n\"copyrightCreditText\":\"\"\n}"}}}, status: 200 }
        axios.put = jest.fn(() => Promise.resolve(mockResponse));
        axios.get =jest.fn(() => Promise.resolve(mockResponse));
        const props = {
            element:{
                type: 'openerelement'
            },
            togglePopup: jest.fn(),
            updateFigureData: jest.fn(),
            handleFocus: jest.fn(),
            handleBlur: jest.fn()
        }
        const component = mount(<MetaDataPopup {...props} togglePopup={togglePopup} />);
        component.setState({metaData:{
            "avs:jsonString":"{\n\"smartLinkThirdPartyVendorVal\":\"Geogebra\",\n\"linkLongDesc\":\"link long desc data to fetch\",\n\"imageReferenceURL\":\"\",\n\"imageAltText\":\"This is the sample  alt text from gk new data\",\n\"captionText\":\"\",\n\"copyrightCreditText\":\"\"\n}"
        }})   
        component.find('.metadata-import-button').simulate('click');
        expect(axios.put).toHaveBeenCalledTimes(1);
    })

    it('onClick Event metadata-import-button for opener if else', () => {
        let togglePopup = jest.fn();
        const mockResponse = { data: {entry: {properties: { 'cplg:altText': '1', "cplg:longDescription":'2'}}}, status: 200 }
        axios.put = jest.fn(() => Promise.resolve(mockResponse));
        axios.get =jest.fn(() => Promise.resolve(mockResponse));
        const props = {
            element:{
                type: 'openerelement',
                backgroundimage: {
                    imageid: 'urn'
                }
            },
            togglePopup: jest.fn(),
            updateFigureData: jest.fn(),
            handleFocus: jest.fn(),
            handleBlur: jest.fn(),
        }
        const component = mount(<MetaDataPopup {...props} togglePopup={togglePopup} />);
        component.setState({metaData:{
            "avs:jsonString":"{\n\"smartLinkThirdPartyVendorVal\":\"Geogebra\",\n\"linkLongDesc\":\"link long desc data to fetch\",\n\"imageReferenceURL\":\"\",\n\"imageAltText\":\"This is the sample  alt text from gk new data\",\n\"captionText\":\"\",\n\"copyrightCreditText\":\"\"\n}"
        }})   
        component.find('.metadata-import-button').simulate('click');
        expect(axios.put).toHaveBeenCalledTimes(1);
    })

    it('onClick Event metadata-import-button for catch', () => {
        let togglePopup = jest.fn();
        const mockResponse = { data: {entry: {properties: { "avs:jsonString":"{\n\"smartLinkThirdPartyVendorVal\":\"Geogebra\",\n\"linkLongDesc\":\"link long desc data to fetch\",\n\"imageReferenceURL\":\"\",\n\"imageAltText\":\"This is the sample  alt text from gk new data\",\n\"captionText\":\"\",\n\"copyrightCreditText\":\"\"\n}"}}}, status: 200 }
        axios.put = jest.fn(() => Promise.resolve(mockResponse));
        axios.get =jest.fn(() => Promise.resolve(mockResponse));
        const props = {
            element:{
                type: 'dummy',
                backgroundimage: {
                    imageid: 'urn'
                }
            },
            togglePopup: jest.fn(),
            updateFigureData: jest.fn(),
            handleFocus: jest.fn(),
            handleBlur: jest.fn()
        }
        const component = mount(<MetaDataPopup {...props} togglePopup={togglePopup} />);
        component.setState({metaData:{
            "avs:jsonString":"{\n\"smartLinkThirdPartyVendorVal\":\"Geogebra\",\n\"linkLongDesc\":\"link long desc data to fetch\",\n\"imageReferenceURL\":\"\",\n\"imageAltText\":\"This is the sample  alt text from gk new data\",\n\"captionText\":\"\",\n\"copyrightCreditText\":\"\"\n}"
        }})   
        component.find('.metadata-import-button').simulate('click');
        expect(axios.put).toHaveBeenCalledTimes(1);
    })
    it('Changing input altText', () => {
        const component = mount(<MetaDataPopup {...props} />);
        let event={ target: { value: '123' } }
        component.find('#altText_AM').simulate('change',event);
    })
    it('Changing input longDescription', () => {
        const component = mount(<MetaDataPopup {...props} />);
        let event={ target: { value: '123' } }
        component.find('#longDescription_AM').simulate('change',event);
    })
    it('Test updateElementData function', () => {
        let props = {
            "figureUrl": "",
            "imageId": "d7120e69-d6e9-41df-8777-e27c45f626bc",
            "element": {
                "id": "urn:pearson:work:7dd02338-1031-434a-abe5-b1b2cfa87ab8",
                "type": "figure",
                "figuretype": "image",
                "subtype": "image25Text",
                "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                "titlecontentintitlefield": true,
                "alignment": "quarter-text",
                "title": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": ""
                },
                "captions": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": ""
                },
                "credits": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": ""
                },
                "figuredata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                    "imageid": "urn:pearson:alfresco:d7120e69-d6e9-41df-8777-e27c45f626bc",
                    "path": "https://cite-media-stg.pearson.com/legacy_paths/d7120e69-d6e9-41df-8777-e27c45f626bc/unfigappA-001.png",
                    "height": "230",
                    "width": "306",
                    "type": "image",
                    "podwidth": ""
                },
                "html": {
                    "title": "<p></p>",
                    "text": "",
                    "postertext": "",
                    "captions": "<p></p>",
                    "credits": "<p></p>",
                    "footnotes": {

                    },
                    "assetsPopover": {

                    },
                    "glossaryentries": {

                    }
                },
                "versionUrn": "urn:pearson:work:7dd02338-1031-434a-abe5-b1b2cfa87ab8",
                "contentUrn": "urn:pearson:entity:440ddff5-5771-4cb6-a975-81760e46a628"
            },
            "index": 2,
            updateFigureData : jest.fn(),
            handleFocus:jest.fn(),
            handleBlur: jest.fn()
         }
        const component = mount(<MetaDataPopup {...props} />);
        let instance = component.instance();
        jest.spyOn(instance, 'updateElementData')
        instance.updateElementData();
    })
it('Test updateElementData function for opener element', () => {
    let props = {
        "figureUrl": "",
        "imageId": "d7120e69-d6e9-41df-8777-e27c45f626bc",
        "element": {
            "id": "urn:pearson:work:7dd02338-1031-434a-abe5-b1b2cfa87ab8",
            "type": "openerelement",
            "figuredata": {},
            "figuretype": "image",
            "subtype": "image25Text",
            "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
            "titlecontentintitlefield": true,
            "alignment": "quarter-text",
            "title": {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": ""
            },
            "captions": {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": ""
            },
            "credits": {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": ""
            },
            "backgroundimage": {
                "alttext":"alt",
                "longdescription":"long",
                "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                "imageid": "urn:pearson:alfresco:d7120e69-d6e9-41df-8777-e27c45f626bc",
                "path": "https://cite-media-stg.pearson.com/legacy_paths/d7120e69-d6e9-41df-8777-e27c45f626bc/unfigappA-001.png",
                "height": "230",
                "width": "306",
                "type": "image",
                "podwidth": ""
            },
            "html": {
                "title": "<p></p>",
                "text": "",
                "postertext": "",
                "captions": "<p></p>",
                "credits": "<p></p>",
                "footnotes": {

                },
                "assetsPopover": {

                },
                "glossaryentries": {

                }
            },
            "versionUrn": "urn:pearson:work:7dd02338-1031-434a-abe5-b1b2cfa87ab8",
            "contentUrn": "urn:pearson:entity:440ddff5-5771-4cb6-a975-81760e46a628"
        },
        "index": 2,
        updateOpenerElement : jest.fn(),
        handleFocus:jest.fn(),
        saveSelectedAltTextLongDescData:jest.fn()
     }
    const component = mount(<MetaDataPopup {...props} />);
    let instance = component.instance();
    jest.spyOn(instance, 'updateElementData')
    instance.updateElementData();
})
});