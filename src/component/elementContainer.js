import React, { Component } from 'react';

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

class ElementContainer extends Component {
    renderElement = (type = "") => {
        let element = "";
        switch(type) {
            case 'opener':
                element = "Opener Element";
                break;

            case "paragraph":
                element = "Paragraph Element";
                break;

            case "figure":
                element = "Figure Element";
                break;
        }

        return element;
    }

    render = () => {
        const { type, element } = this.props; console.log('props::', type, element);
        return (
            <div className="element-container" data-id={element.id} data-type={element.type}>
                {this.renderElement(type)}
            </div>
        );
    }
}

export default ElementContainer