import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TinyMceEditor from "./../tinyMceEditor"
import './../../styles/ElementAuthoring/ElementAuthoring.css';

export class ElementAuthoring extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClick = this.onClick.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyup = this.onKeyup.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  render() {
    const { className, placeholder, model} = this.props
     return (
        <TinyMceEditor
          index={this.props.index}
          elementId={this.props.elementId}
          element={this.props.element}
          placeholder={placeholder}
          className={className}
          model={model}
          onFocus={this.onFocus}
          onKeyup={this.onKeyup}
          onBlur={this.onBlur}
          onClick={this.onClick}
        />
    )
  }
  onClick() {

  }
  onBlur() {

  }
  onKeyup() {

  }
  onFocus() {

  }
}
ElementAuthoring.defaultProps = {
  type: "element-authoredtext"
}

ElementAuthoring.propTypes = {
  /** Type of element to be rendered */
  type: PropTypes.string.isRequired,
  /** Handler to attach on element click */
  onClick: PropTypes.func,
  /** Handler to attach on element blur */
  onBlur: PropTypes.func,
  /** Handler to attach on element keyup */
  onKeyup: PropTypes.func,
  /** Handler to attach on element focus */
  onFocus: PropTypes.func

}

export default ElementAuthoring