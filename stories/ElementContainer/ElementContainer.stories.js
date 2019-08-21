import React from 'react';

import { storiesOf } from '@storybook/react';

import ElementContainer from './../../src/component/ElementContainer/ElementContainer';

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

storiesOf('Element Container').add('Element Container', () => {
    return (
        <>
        <ElementContainer element={mockElement} />
        <ElementContainer element={mockElement} />
        </>
    );
});