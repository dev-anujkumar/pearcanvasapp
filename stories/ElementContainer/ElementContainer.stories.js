import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import ElementContainer from './../../src/component/ElementContainer';

const mockElement = {
    id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
    type: "element-authoredtext",
    subtype: "",
    schema: "http://schemas.pearson.com/wip-authoring/element/1",
    elementdata: {
        schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        text: ""
    },
    html: {
        text: "<p class=\"paragraphNumeroUno\"><br></p>"
    },
    comments: true,
    tcm: true,
    versionUrn: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
    contentUrn: "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
};
const mockFigure2 = {
    id: "urn:pearson:work:591e0376-8bde-42cf-bea1-70dc846fca1c",
    type: "figure",
    figuretype: "video",
    subtype: "figureVideo",
    figureAlignment: "full",
    assessmentData:{
        asset:"Asset data undefined"
    },
    posterPath:"https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png"
}
const mockData1={
    "id": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
    "type": "figure",
    "figuretype": "image",
   "subtype": "image50Text",
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
        "comments" : true,
        "tcm" : true,
        "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
        "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"

}
const mockData3={
    
    "id": "urn:pearson:work:47926695-265e-469e-bfc3-2c942d2c1824",
    "type": "figure",
    "figuretype": "assessment",
    "subtype": "",
    "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
    "title": {
    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
    "text": ""
    },
    "subtitle": {
    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
    "text": "",
    "textsemantics": [ ],
    "mathml": [ ],
    "footnotes": [ ]
    },
    "captions": {
    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
    "text": "",
    "textsemantics": [ ],
    "mathml": [ ],
    "footnotes": [ ]
    },
    "credits": {
    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
    "text": "",
    "textsemantics": [ ],
    "mathml": [ ],
    "footnotes": [ ]
    },
    "figuredata": {
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "type": "element-assessment",
        "subtype": "assessment",
        "elementdata": {
        "assessmentitemtype": "assessmentItem",
        "assessmentformat": "cite",
        "schema": "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment",
        "posterimage": {
        "path": "https://cite-media-stg.pearson.com/legacy_paths/8efb9941-4ed3-44a3-8310-1106d3715c3e/FPO-assessment.png"
        },
        "usagetype": "Quiz"
        }
        },
    
    "versionUrn": "urn:pearson:work:47926695-265e-469e-bfc3-2c942d2c1824",
    "contentUrn": "urn:pearson:entity:0f7c431f-e6c9-4574-bfe0-7d4ac25c1032"
    
}
const mockInter = {
    "id": "urn:pearson:work:2b35e92c-0e52-47b5-b5a9-277fd9a24923",
    "type": "figure",
    "figuretype": "interactive",
    "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
    "title": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "",
        "textsemantics": [],
        "mathml": []
    },
    "subtitle": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "captions": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "credits": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "figuredata": {
        "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/interactive",
        "interactiveid": "",
        "interactivetype": "fpo",
        "interactiveformat": "mmi"
    },
    "versionUrn": "urn:pearson:work:2b35e92c-0e52-47b5-b5a9-277fd9a24923",
    "contentUrn": "urn:pearson:entity:4602d9f2-b2b6-4882-b988-b06703e21e74"
}

const mockStore = configureMockStore(middlewares);

const elemContainerData = mockStore({
    toolbarReducer: {
        elemBorderToggle: true
    }
  });

storiesOf('Composites|Element Container')
    .addDecorator(withInfo)
    .add('Element Container', () => {
        return (
            <div style={{width:"680px", position:"relative", left:"100px"}}>
            <Provider store={elemContainerData}>
                <ElementContainer element={mockElement} />
            </Provider>
            </div>
        );
    })
    .add('Element Container2', () => {
        return (
            <div style={{width:"680px", position:"relative", left:"100px"}}>
            <Provider store={elemContainerData}>
                <ElementContainer element={mockData1} />
            </Provider>
            </div>
        );
    })
    .add('Element Container3', () => {
        return (
            <div style={{width:"680px", position:"relative", left:"100px"}}>
            <Provider store={elemContainerData}>
                <ElementContainer element={mockData3} />
            </Provider>
            </div>
        );
    })
    .add('Element Container4', () => {
        return (
            <div style={{width:"680px", position:"relative", left:"100px"}}>
            <Provider store={elemContainerData}>
                <ElementContainer element={mockInter} />
            </Provider>
            </div>
        );
    })