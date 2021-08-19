import React from 'react';
import { mount } from 'enzyme';
import MetaDataPopup from '../../../src/component/ElementFigure/MetaDataPopUp';

describe('Testcase for MetaDataPopup Component', () => {
    let wrapper;
    let props = {
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
        const component = mount(<MetaDataPopup togglePopup={togglePopup} />);
        component.find('#close-container').simulate('click');
        expect(component.instance().props.togglePopup).toHaveBeenCalled();
    })
    it('onClick Event of longDescription body', () => {
        const component = mount(<MetaDataPopup {...props} />);
        component.find('.long-description-body').simulate('click');
    })
    it('onClick Event alt-text-body', () => {
        const component = mount(<MetaDataPopup {...props} />);
        component.find('.alt-text-body').simulate('click');
    })
    it('onClick Event metadata-import-button', () => {
        let togglePopup = jest.fn();
        const component = mount(<MetaDataPopup togglePopup={togglePopup} />);
        component.find('.metadata-import-button').simulate('click');
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
});