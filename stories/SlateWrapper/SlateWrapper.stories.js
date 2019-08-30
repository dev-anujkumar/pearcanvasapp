import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import '../../src/styles/CanvasWrapper/style.css';
import SlateWrapper from '../../src/component/SlateWrapper';

export const slateData = {
    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
        "id": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
        "type": "manifest",
        "contents": {
            "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
            "title": {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": "test1"
            },
            "frontmatter": [],
            "bodymatter": [
                {
                    "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                    "type": "element-authoredtext",
                    "subtype": "",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": ""
                    },
                    "html": {
                        "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                    },
                    "comments": true,
                    "tcm": true,
                    "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                    "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                },
                {
                    "id": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
                    "type": "figure",
                    "figuretype": "image",
                    "subtype": "",
                    "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
                    "alignment": "half-text",
                    "title": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "12345",
                        "textsemantics": [],
                        "mathml": []
                    },
                    "subtitle": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "eresrwqe",
                        "textsemantics": [],
                        "mathml": [],
                        "footnotes": []
                    },
                    "captions": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "sdafsad",
                        "textsemantics": [],
                        "mathml": [],
                        "footnotes": []
                    },
                    "credits": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "asdfasdfasdf",
                        "textsemantics": [],
                        "mathml": [],
                        "footnotes": []
                    },
                    "figuredata": {
                        "path": "https://cite-media-stg.pearson.com/legacy_paths/600efdb1-a28c-4ec3-8b54-9aad364c8c2c/MAP_06-03_nash-stage-2_1440.png",
                        "height": "1225",
                        "width": "1440",
                        "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                        "imageid": "urn:pearson:alfresco:600efdb1-a28c-4ec3-8b54-9aad364c8c2c"
                    },
                    "html": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "title": "<p>12345</p>",
                        "subtitle": "<p>eresrwqe</p>",
                        "caption": "<p>sdafsad</p>",
                        "credit": "<p>asdfasdfasdf</p>",
                        "postertext": "",
                        "tableasHTML": ""
                    },
                    "comments": true,
                    "tcm": true,
                    "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
                    "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"

                },

                {
                    "id": "urn:pearson:work:591e0376-8bde-42cf-bea1-70dc846fca1c",
                    "type": "figure",
                    "figuretype": "video",
                    "subtype": "figureVideo",
                    "figureAlignment": "full",
                    "assessmentData":{
                        asset:"Asset data undefined"
                    },
                    "posterPath":"https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png",
                    "comments": true,
                    "tcm": true,
                    "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
                    "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"
                }
            ]
        }
    }
}
export const emptySlateData = {
    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
        "id": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
        "type": "manifest",
        "contents": {}
    }
}

export const slateDataForIntro = {
    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
        "id": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
        "type": "container-introduction",
        "contents": {
            "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
            "title": {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": "test1"
            },
            "frontmatter": [],
            "bodymatter": [
                {
                    "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                    "type": "element-authoredtext",
                    "subtype": "",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": ""
                    },
                    "html": {
                        "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                    },
                    "comments": true,
                    "tcm": true,
                    "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                    "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                }
            ]
        }
    }
}
export const slateDataForAssess = {
    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
        "id": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
        "type": "assessment",
        "contents": {
            "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
            "title": {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": "test1"
            },
            "frontmatter": [],
            "bodymatter": [
                {
                    "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                    "type": "element-authoredtext",
                    "subtype": "",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": ""
                    },
                    "html": {
                        "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                    },
                    "comments": true,
                    "tcm": true,
                    "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                    "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                }
            ]
        }
    }
}

storiesOf('Composites|Slate Wrapper', module)
    .add('Default', () => {
        return (
            <SlateWrapper slateData={emptySlateData} />
        )
    },
        {
            info: 'This is slate wrapper which combines slate header, element container, element separator component, It is a default view with no data present',
        })
    .add('With Elements', () => {
        return (
            <SlateWrapper slateData={slateData} />
        )
    },
        {
            info: 'It is a view with some element present',
        })
    .add('Introductory Slate', () => {
        return (
            <SlateWrapper slateData={slateDataForIntro} />
        )
    },
        {
            info: 'It is a view with some element present',
        })
    .add('Assessment Slate', () => {
        return (
            <SlateWrapper slateData={slateDataForAssess} />
        )
    },
        {
            info: 'It is a view with some element present',
        })
    .add('Loading', () => {
        return (
            <SlateWrapper slateData={{}} />
        )
    },
        {
            info: 'It is a view with element being loaded',
        })