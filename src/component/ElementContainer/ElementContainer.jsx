import React, { Component } from 'react';
import PropTypes from 'prop-types'

import ElementAuthoring from './../ElementAuthoring';
import Button from './../ElementButtons';
import './../../styles/ElementContainer/ElementContainer.css';

class ElementContainer extends Component {
    renderElement = (element = {}) => {
        let editor = '';
        let { elementType, labelText } = this.props;
        switch(element.type) {
            case 'opener':
                editor = "Opener Element";
                break;

            case "element-authoredtext":
                editor = <ElementAuthoring type={elementType} />;
                break;

            case "figure":
                editor = "Figure Element";
                break;
        }

        return (
            <div className="editor">
                <div>
                    <Button type="element-label" labelText={labelText} />
                    <Button type="delete-element" />
                </div>
                <div className="element-container" data-id={element.id}>
                    {editor}
                </div>
                <div>
                    <Button type="add-comment" />
                    {element.comments && <Button type="comment-flag" />}
                    {element.tcm && <Button type="tcm" />}
                </div>
            </div>
        );
    }

    render = () => {
        const { element } = this.props;
        return this.renderElement(element);
    }
}

ElementContainer.defaultProps = {
    element: {},
    elementType: 'heading-4',
    labelText: 'P'
}

ElementContainer.propTypes = {
    /** Detail of element in JSON object */
    element : PropTypes.object,
    elementType : PropTypes.string,
    labelText : PropTypes.string
}

export default ElementContainer