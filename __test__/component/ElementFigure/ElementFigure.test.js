import React from 'react';
import { mount } from 'enzyme';
import ElementFigure from './../../../src/component/ElementFigure/ElementFigure';


describe('Testing Button component with props', () => {
    const mockelement1 = {
        id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
        type: "figure",
        subtype: "",
        figuretype: "image",
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
    
it('render Figure component for figure image width :50% ', () => {
    const ElementFigure = mount(<ElementFigure element={mockelement1}/>);
    console.log(ElementFigure.debug());
    expect(ElementFigure).toMatchSnapshot();
})
it('render Figure component for figure image width :text width ', () => {
    const ElementFigure = mount(<ElementFigure element={mockelement1}/>);
    console.log(ElementFigure.debug());
    expect(ElementFigure).toMatchSnapshot();
})
it('render Figure component for figure image width :fullscreen ', () => {
    const ElementFigure = mount(<ElementFigure element={mockelement1}/>);
    console.log(ElementFigure.debug());
    expect(ElementFigure).toMatchSnapshot();
})
it('render Figure component for figure image width :wider than text', () => {
    const ElementFigure = mount(<ElementFigure element={mockelement1}/>);
    console.log(ElementFigure.debug());
    expect(ElementFigure).toMatchSnapshot();
})

it('render Figure component for table image width :50% ', () => {
    const ElementFigure = mount(<ElementFigure element={mockelement1}/>);
    console.log(ElementFigure.debug());
    expect(ElementFigure).toMatchSnapshot();
})
it('render Figure component for table image width :text width ', () => {
    const ElementFigure = mount(<ElementFigure element={mockelement1}/>);
    console.log(ElementFigure.debug());
    expect(ElementFigure).toMatchSnapshot();
})
it('render Figure component for table image width :fullscreen ', () => {
    const ElementFigure = mount(<ElementFigure element={mockelement1}/>);
    console.log(ElementFigure.debug());
    expect(ElementFigure).toMatchSnapshot();
})
it('render Figure component for table image width :wider than text', () => {
    const ElementFigure = mount(<ElementFigure element={mockelement1}/>);
    console.log(ElementFigure.debug());
    expect(ElementFigure).toMatchSnapshot();
})

it('render Figure component for math image width :50% ', () => {
    const ElementFigure = mount(<ElementFigure element={mockelement1}/>);
    console.log(ElementFigure.debug());
    expect(ElementFigure).toMatchSnapshot();
})
it('render Figure component for math image width :text width ', () => {
    const ElementFigure = mount(<ElementFigure element={mockelement1}/>);
    console.log(ElementFigure.debug());
    expect(ElementFigure).toMatchSnapshot();
})
it('render Figure component for math image width :fullscreen ', () => {
    const ElementFigure = mount(<ElementFigure element={mockelement1}/>);
    console.log(ElementFigure.debug());
    expect(ElementFigure).toMatchSnapshot();
})
it('render Figure component for math image width :wider than text', () => {
    const ElementFigure = mount(<ElementFigure element={mockelement1}/>);
    console.log(ElementFigure.debug());
    expect(ElementFigure).toMatchSnapshot();
})

it('render Figure component for mathML/chemMl Editor ', () => {
    const ElementFigure = mount(<ElementFigure element={mockelement1}/>);
    console.log(ElementFigure.debug());
    expect(ElementFigure).toMatchSnapshot();
})
it('render Figure component for Block Code Editor', () => {
    const ElementFigure = mount(<ElementFigure element={mockelement1}/>);
    console.log(ElementFigure.debug());
    expect(ElementFigure).toMatchSnapshot();
})

});