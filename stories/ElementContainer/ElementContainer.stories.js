import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

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

storiesOf('Element Container')
    .addDecorator(withInfo)
    .add('Element Container', () => {
        return (
            <ElementContainer element={mockElement} />
        );
    })
    .add('Element Container2', () => {
        return (
            <ElementContainer element={mockFigure2} />
        );
    });