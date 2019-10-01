import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import { withInfo } from '@storybook/addon-info';
import ElementFigure from './../../src/component/ElementFigure';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore(middlewares);

const elemFigureData = mockStore({
    slateLockReducer:{slateLockInfo:false}   
  });
const mockData1={
    "id": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
    "type": "figure",
    "figuretype": "image",
   "subtype": "image50Text",
   "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
    "alignment": "half-text",
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
            "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
            "height": "1225",
            "width": "1440",
            "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
            "imageid": "urn:pearson:alfresco:600efdb1-a28c-4ec3-8b54-9aad364c8c2c"
        },
        "html": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "title": "",
            "subtitle": "",
            "caption": "",
            "credit": "",
            "postertext": "",
            "tableasHTML": ""
        },
        "comments" : true,
        "tcm" : true,
        "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
        "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"

}
const mockData2={
    
    "id": "urn:pearson:work:591e0376-8bde-42cf-bea1-70dc846fca1c",
    "type": "figure",
    "figuretype": "table",
    "subtype": "imageTextWidthTableImage  ",
    "alignment": "text-width",
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
        "path": "https://cite-media-stg.pearson.com/legacy_paths/e40f498a-77ab-491c-8c0b-07690ea2b049/Koala.jpg",
        "height": "1225",
        "width": "1440",
        "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
        "imageid": "urn:pearson:alfresco:600efdb1-a28c-4ec3-8b54-9aad364c8c2c"
    },
    "html": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "title": "",
        "subtitle": "",
        "caption": "",
        "credit": "",
        "postertext": "",
        "tableasHTML": ""
    },
    "comments" : true,
    "tcm" : true,
    "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
    "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"

}
const mockData3={
    
    "id": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
    "type": "figure",
    "figuretype": "mathImage",
    "subtype": "imageWiderThanTextMathImage",
    "alignment": "wider",
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
        "path": "https://cite-media-stg.pearson.com/legacy_paths/e40f498a-77ab-491c-8c0b-07690ea2b049/Koala.jpg",
        "height": "1225",
        "width": "1440",
        "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
        "imageid": "urn:pearson:alfresco:600efdb1-a28c-4ec3-8b54-9aad364c8c2c"
    },
    "html": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "title": "",
        "subtitle": "",
        "caption": "",
        "credit": "",
        "postertext": "",
        "tableasHTML": ""
    },
    "comments" : true,
    "tcm" : true,
    "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
    "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"

}
const mockData4={
    
    "id": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
    "type": "figure",
    "figuretype": "image",
    "subtype": "imageFullscreen",
    "alignment": "full",
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
        "path": "https://cite-media-stg.pearson.com/legacy_paths/e40f498a-77ab-491c-8c0b-07690ea2b049/Koala.jpg",
        "height": "1225",
        "width": "1440",
        "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
        "imageid": "urn:pearson:alfresco:600efdb1-a28c-4ec3-8b54-9aad364c8c2c"
    },
    "html": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "title": "",
        "subtitle": "",
        "caption": "",
        "credit": "",
        "postertext": "",
        "tableasHTML": ""
    },
    "comments" : true,
    "tcm" : true,
    "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
    "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"

}
const mockData5={
    
    "id": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
    "type": "figure",
    "figuretype": "authoredtext",
    "subtype": "mathml",
    "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
    "alignment": "",
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
    
    "html": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "title": "",
        "subtitle": "",
        "caption": "",
        "credit": "",
        "tableasHTML": ""
    },
    "figuredata": {
        "type": "element-authoredtext",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "elementdata": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "",
        "textsemantics": [ ],
        "mathml": [ ]
        }
        },
    "comments" : true,
    "tcm" : true,
    "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
    "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"

}
const mockData6={
    
    "id": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
    "type": "figure",
    "figuretype": "codelisting",
    "subtype": "codelisting",
    "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
    "alignment": "",
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
    "html": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "title": "",
        "subtitle": "",
        "caption": "",
        "credit": "",
        "tableasHTML": ""
    },
    "figuredata": {
        "path": "https://cite-media-stg.pearson.com/legacy_paths/600efdb1-a28c-4ec3-8b54-9aad364c8c2c/MAP_06-03_nash-stage-2_1440.png",
        "height": "1225",
        "width": "1440",
        "imageid": "urn:pearson:alfresco:600efdb1-a28c-4ec3-8b54-9aad364c8c2c",
        "schema": "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
        "type": "codelisting",
        "numbered": true,
        "startNumber": "1",
        "programlanguage": "Java",
        "preformattedtext": [
           
            ]
    },
      
    "comments" : true,
    "tcm" : true,
    "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
    "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"

}

storiesOf('Components|ElementFigure', module)

    .addDecorator(withInfo)
    .add('default Figure-50', () => <div style={{width:"500px", position:"relative", left:"100px"}}> <Provider store={elemFigureData}> <ElementFigure model={mockData1} index="1" /></Provider></div>)
    .add('Figure Image-FS', () => {
        return (
            <div style={{width:"500px", position:"relative", left:"100px"}}><Provider store={elemFigureData}>
                <ElementFigure model={mockData4} index="2"/></Provider>
                </div>
        );
    })
    .add('Table Image-TW', () => {
        return (
            <div style={{width:"500px", position:"relative", left:"100px"}}><Provider store={elemFigureData}>
                <ElementFigure model={mockData2} index="3"/></Provider>
                </div>
        );
    })
    .add('Math Image-WT', () => {
        return (
            <div style={{width:"500px", position:"relative", left:"100px"}}><Provider store={elemFigureData}>
                <ElementFigure model={mockData3} index="4" /></Provider>
                </div>
        );
    })
    .add('MathML/Chem Editor', () => {
        return (
            <div style={{width:"500px", position:"relative", left:"100px"}}><Provider store={elemFigureData}>
                <ElementFigure model={mockData5} index="5"/></Provider>
                </div>
        );
    })
    .add('Block Code Editor', () => {
        return (
            <div style={{width:"500px", position:"relative", left:"100px"}}><Provider store={elemFigureData}>
                <ElementFigure model={mockData6} index="6" /></Provider>
                </div>
        );
    })