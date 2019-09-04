import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import { withInfo } from '@storybook/addon-info';

import ElementAudioVideo from '../../src/component/ElementAudioVideo';

const audioElementDefault = {
    "id": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
    "type": "figure",
    "figuretype": "audio",
    "subtype": "figureVideo",
    "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
    "alignment": "full",
    "assessmentData": {
        "asset": ""
    },

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
    "comments": true,
    "tcm": true,
    "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
    "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"


};
const audioElementWithData = {

   
    "id": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
    "type": "figure",
    "figuretype": "audio",
    "subtype": "figureVideo",
    "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
    "alignment": "full",
    "assessmentData": {
        "asset": "https://cite-media-stg.pearson.com/legacy_paths/5e7f87f1-4662-4093-bb10-f3e1ef66e658/smart_figure_3_6_mc_war_part_b_1025689155684_mp4_video_320x240_168000_primary_audio_1.mp4"
    },

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
    "comments": true,
    "tcm": true,
    "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
    "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"
};

const videoElementDefault = {
    "id": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
    "type": "figure",
    "figuretype": "video",
    "subtype": "figureVideo",
    "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
    "alignment": "full",
    "assessmentData": {
        "asset": ""
    },

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
        "path": "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png",
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
    "comments": true,
    "tcm": true,
    "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
    "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"

};

const videoElementWithData = {
       
    "id": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
    "type": "figure",
    "figuretype": "video",
    "subtype": "figureVideo",
    "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
    "alignment": "full",
    "assessmentData": {
        "asset": "https://cite-media-stg.pearson.com/legacy_paths/5e7f87f1-4662-4093-bb10-f3e1ef66e658/smart_figure_3_6_mc_war_part_b_1025689155684_mp4_video_320x240_168000_primary_audio_1.mp4"
    },

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
        "path": "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png",
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
    "comments": true,
    "tcm": true,
    "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
    "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"
}

storiesOf('ElementAudioVideo', module)
    .addDecorator(withInfo)
    .add('Audio default', () => <ElementAudioVideo model={audioElementDefault} />)
    .add('Audio with data', () => <ElementAudioVideo model={audioElementWithData} />)
    .add('Video default', () => {
        return (
            <>
                <ElementAudioVideo model={videoElementDefault} />
            </>
        );

    })

    .add('Video with data', () => {
        return (
            <>
                <ElementAudioVideo model={videoElementWithData} />
            </>
        );
    })
