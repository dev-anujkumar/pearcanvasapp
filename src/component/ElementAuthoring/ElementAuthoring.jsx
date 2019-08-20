import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TinyMceEditor } from './../tinyMceEditor';

import './../../styles/ElementAuthoring/ElementAuthoring.css';

export class ElementAuthoring extends Component {
    render() {
        const { type, onClick } = this.props
        return (
            <TinyMceEditor className="mce-editor" type={type} onClick = {onClick} />
        )
    }
}

ElementAuthoring.defaultProps = {
    type: "element-authoredtext"
}

ElementAuthoring.propTypes = {
      /** Type of element to be rendered */
    type : PropTypes.string.isRequired,
     /** Handler to attach on element click */
    onClick : PropTypes.func
}

export default ElementAuthoring;