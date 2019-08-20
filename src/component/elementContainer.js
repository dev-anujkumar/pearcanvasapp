import React, { Component } from 'react';

import ElementAuthoring from './ElementAuthoring/ElementAuthoring.jsx';
import Button from './ElementButtons/ElementButton';
import './../styles/elementContainer.css';

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
        let element = '';
        let labelText = '';
        switch(type) {
            case 'opener':
                element = "Opener Element";
                break;

            case "element-authoredtext":
                element = <ElementAuthoring type={this.props.element.type}/>;
                labelText = 'P';
                break;

            case "figure":
                element = <ElementAuthoring type={this.props.element.type}/>;
                break;
        }

        return (
            <div className="element-container" data-id={element.id}>
                <div>
                    <Button type="element-label" labelText={labelText} />
                    <Button type="delete-element" />
                </div>
                {element}
                <div>
                    <Button type="add-comment" />
                    <Button type="comment-flag" />
                    <Button type="tcm" />
                </div>
            </div>
        );
    }

    render = () => {
        const { element } = this.props;
        return this.renderElement(element.type);
        // (
            // 
                // {}
            // 
        // );
    }
}

export default ElementContainer