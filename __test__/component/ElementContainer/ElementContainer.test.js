import React from 'react';
import { mount } from 'enzyme';
import ElementContainer from './../../../src/component/ElementContainer/ElementContainer';

describe('Test for element container component', () => {
    const element = {
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

    let elementContainer = mount(<ElementContainer element={element} />);

    it('Render element container ', () => {
        expect(elementContainer).toMatchSnapshot();

        element.type = "opener";
        elementContainer = mount(<ElementContainer element={element} />);
        expect(elementContainer).toMatchSnapshot();

        element.type = "figure";
        elementContainer = mount(<ElementContainer element={element} />);
        expect(elementContainer).toMatchSnapshot();
    })

    it('onClick Event', () => {
        const component = mount(<ElementContainer />);
        component.find('span#add-comment').simulate('click');
        component.find('span#close-container').simulate('click');
   })
});