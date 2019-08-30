import React, { Component } from 'react';
import PropTypes from 'prop-types'

import ElementAuthoring from './../ElementAuthoring';
import Button from './../ElementButtons';
import PopUp from '../PopUp';
import './../../styles/ElementContainer/ElementContainer.css';

class ElementContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false
        };
    }

    renderElement = (element = {}) => {
        let editor = '';
        let labelText = '';
        switch(element.type) {
            case 'opener':
                editor = "Opener Element";
                labelText = 'OE';
                break;

            case "element-authoredtext":
                editor = <ElementAuthoring type={element.type} model={element.html} />;
                labelText = 'P';
                break;

            case "figure":
                editor = <ElementAuthoring type={element.type} />;
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
                    <Button type="add-comment" onClick={() => this.handleCommentPopup(true)}/>
                    {/* {element.comments && <Button type="comment-flag" /> }
                    {element.tcm && <Button type="tcm" />} */}
                    <Button type="comment-flag" />
                    <Button type="tcm" />
                </div>
                {this.state.popup && <PopUp togglePopup={e => this.handleCommentPopup(e, this)} active={this.state.popup} />}
            </div>
        );
    }

    /**
     * @description - This function is for handling the closing and opening of popup.
     * @param {event} popup
     */

    handleCommentPopup(popup){
        this.setState({
            popup
        });
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