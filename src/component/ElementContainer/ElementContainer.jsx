import React, { Component } from 'react';
import PropTypes from 'prop-types'

import ElementAuthoring from './../ElementAuthoring';
import ElementAudioVideo from './../ElementAudioVideo';
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
                editor = <ElementAudioVideo element={element} />;
                labelText = 'FG';
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
    element: {}
}

ElementContainer.propTypes = {
    /** Detail of element in JSON object */
    element : PropTypes.object
}

export default ElementContainer