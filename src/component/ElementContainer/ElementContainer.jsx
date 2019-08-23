import React, { Component } from 'react';
import PropTypes from 'prop-types'

import ElementAuthoring from './../ElementAuthoring';
import Button from './../ElementButtons';
import './../../styles/ElementContainer/ElementContainer.css';

class ElementContainer extends Component {
    renderElement = (element = {}) => {
        let editor = '';
        let labelText = '';
        switch(element.type) {
            case 'opener':
                editor = "Opener Element";
                labelText = 'OE';
                break;

            case "element-authoredtext":
                editor = <ElementAuthoring type={element.type} />;
                labelText = 'P';
                break;

            case "figure":
                editor = <ElementAuthoring type={element.type} />;
                labelText = 'FG';
                break;
        }

        return (
            <div className="element-container" data-id={element.id}>
                <div>
                    <Button type="element-label" labelText={labelText} />
                    <Button type="delete-element" />
                </div>
                {editor}
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
        return this.renderElement(element);
    }
}

ElementContainer.propTypes = {
    /** Detail of element in JSON object */
    element : PropTypes.object,
}

export default ElementContainer