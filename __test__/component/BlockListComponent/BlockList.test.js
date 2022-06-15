import React from 'react';
import { shallow } from 'enzyme';
import BlockList from '../../../src/component/BlockListComponent/BlockList';

describe('Testing BlockList component', () => {
    let props = {
        indexTemp: '1-0-1',
        element: {
            listtype: 'ordered',
            startNumber: 2,
            subtype: 'decimal',
            html:`<p>text</p>`
        },
        onClickCapture:() =>{},
        showBlocker: () =>{},
        borderToggle:() => {},
        onListSelect:() => {},
        manifestList: [{
            listitemdata: {
                bodymatter: [{
                    "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5jn5eg",
                    "type": "element-authoredtext",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "This is a test"
                    },
                    "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334jngty",
                    "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5jn5eg",
                    "html": {
                        "text": "imageAssetContent"
                    }
                },
                {
                    "type": "manifestlist",
                    "id": "urn:pearson:manifest:69e92e56-c9a0-4d84-ba83-1d3d4d5jnhgt",
                    "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                    "listtype": "ordered",
                    "subtype": "lower-alpha",
                    "listdata": {
                        "bodymatter": [
                            {
                                "type": "manifestlistitem",
                                "id": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34jhgrt",
                                "versionUrn": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34jhgrt",
                                "contentUrn": "urn:pearson:entity:b2c0a49d-2b43-42d5-ae51-4527d34nf63f",
                                "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                                "listitemdata": {
                                    "bodymatter": [
                                        {
                                            "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5he5ck",
                                            "type": "element-authoredtext",
                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                            "elementdata": {
                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                "text": "More"
                                            },
                                            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334nf375",
                                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5he5ck",
                                            "html": {
                                                "text": "<p class='paragraphNumeroUno'>More</p>"
                                            }
                                        },
                                        {
                                            "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5lmg39",
                                            "type": "element-authoredtext",
                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                            "elementdata": {
                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                "text": "second line of content"
                                            },
                                            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334mbd4w",
                                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5lmg39",
                                            "html": {
                                                "text": "<p class='paragraphNumeroUno'>second line of content</p>"
                                            }
                                        },
                                        {
                                            "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5gnsh5",
                                            "type": "element-authoredtext",
                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                            "elementdata": {
                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                "text": "third line of #1"
                                            },
                                            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334knh4e",
                                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5gnsh5",
                                            "html": {
                                                "text": "<p class='paragraphNumeroUno'>third line of #1</p>"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }]
            }
        }]
    }
    let props1 = {
        indexTemp: '1-0-1',
        element: {
            listtype: 'ordered',
            startNumber: 1,
            subtype: 'decimal',
            html:`<p>text</p>`
        },
        onClickCapture:() =>{},
        showBlocker: () =>{},
        borderToggle:() => {},
        onListSelect:() => {},
        manifestList: [{
            listitemdata: {
                bodymatter: [{
                    "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5jn5eg",
                    "type": "element-authoredtext",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "This is a test"
                    },
                    "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334jngty",
                    "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5jn5eg",
                    "html": {
                        "text": "<p class='paragraphNumeroUno'>This is a test</p>"
                    }
                },
                {
                    "type": "manifestlist",
                    "id": "urn:pearson:manifest:69e92e56-c9a0-4d84-ba83-1d3d4d5jnhgt",
                    "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                    "listtype": "ordered",
                    "subtype": "lower-alpha",
                    "listdata": {
                        "bodymatter": [
                            {
                                "type": "manifestlistitem",
                                "id": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34jhgrt",
                                "versionUrn": "urn:pearson:manifest:b2c0a49d-2b43-42d5-ae51-4527d34jhgrt",
                                "contentUrn": "urn:pearson:entity:b2c0a49d-2b43-42d5-ae51-4527d34nf63f",
                                "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                                "listitemdata": {
                                    "bodymatter": [
                                        {
                                            "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5he5ck",
                                            "type": "element-authoredtext",
                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                            "elementdata": {
                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                "text": "More"
                                            },
                                            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334nf375",
                                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5he5ck",
                                            "html": {
                                                "text": "<p class='paragraphNumeroUno'>More</p>"
                                            }
                                        },
                                        {
                                            "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5lmg39",
                                            "type": "element-authoredtext",
                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                            "elementdata": {
                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                "text": "second line of content"
                                            },
                                            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334mbd4w",
                                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5lmg39",
                                            "html": {
                                                "text": "<p class='paragraphNumeroUno'>second line of content</p>"
                                            }
                                        },
                                        {
                                            "id": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5gnsh5",
                                            "type": "element-authoredtext",
                                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                            "elementdata": {
                                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                "text": "third line of #1"
                                            },
                                            "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334knh4e",
                                            "versionUrn": "urn:pearson:work:69e92e56-c9a0-4d84-ba83-1d3d4d5gnsh5",
                                            "html": {
                                                "text": "<p class='paragraphNumeroUno'>third line of #1</p>"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }]
            }
        }]
    }
    let props2 = {
        indexTemp: '1-0-1',
        element: {
            listtype: 'test',
            startNumber: 1,
            subtype: 'decimal',
            html:`<p>text</p>`
        },
        onClickCapture:() =>{},
        showBlocker: () =>{},
        borderToggle:() => {},
        onListSelect:() => {},
        manifestList: [{
            listitemdata: {
                bodymatter: []
            }
        }]
    }

    it('BlockList Component', () => {
        const wrapper = shallow(<BlockList {...props} />);
    })
    it('BlockList Component if > else case', () => {
        const wrapper = shallow(<BlockList {...props1} />);
    })
    it('BlockList Component else case', () => {
        const wrapper = shallow(<BlockList {...props2} />);
    })
});