import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import { withInfo } from '@storybook/addon-info';
import ElementFigure from './../../src/component/ElementFigure';

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
            "title": "12345",
            "subtitle": "eresrwqe",
            "caption": "sdafsad",
            "credit": "asdfasdfasdf",
            "postertext": "ssfsfsdsfdsfdsfdsfdsfdfdfd",
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
        "title": "12345",
        "subtitle": "eresrwqe",
        "caption": "sdafsad",
        "credit": "asdfasdfasdf",
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
        "title": "12345",
        "subtitle": "eresrwqe",
        "caption": "sdafsad",
        "credit": "asdfasdfasdf",
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
        "title": "12345",
        "subtitle": "eresrwqe",
        "caption": "sdafsad",
        "credit": "asdfasdfasdf",
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
        "title": "12345",
        "subtitle": "eresrwqe",
        "caption": "sdafsad",
        "credit": "asdfasdfasdf",
        "postertext": "hello mathml",
        "tableasHTML": ""
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
        "title": "12345",
        "subtitle": "eresrwqe",
        "caption": "sdafsad",
        "credit": "asdfasdfasdf",
        "postertext": "fddffdd",
        "tableasHTML": ""
    },
    "comments" : true,
    "tcm" : true,
    "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
    "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"

}

storiesOf('Components|ElementFigure', module)

    .addDecorator(withInfo)
    .add('default Figure-50', () => <ElementFigure model={mockData1} />)
    .add('Figure Image-FS', () => {
        return (
            <>
                <ElementFigure model={mockData4} />
            </>
        );
    })
    .add('Table Image-TW', () => {
        return (
            <>
                <ElementFigure model={mockData2} />
            </>
        );
    })
    .add('Math Image-WT', () => {
        return (
            <>
                <ElementFigure model={mockData3} />
            </>
        );
    })
    .add('MathML/Chem Editor', () => {
        return (
            <>
                <ElementFigure model={mockData5} />
            </>
        );
    })
    .add('Block Code Editor', () => {
        return (
            <>
                <ElementFigure model={mockData6} />
            </>
        );
    })