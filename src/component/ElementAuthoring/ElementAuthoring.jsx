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
    const { className, placeholder, model,openGlossaryFootnotePopUp, slateLockInfo, openAssetPopoverPopUp} = this.props
     return (
        <TinyMceEditor
          openAssetPopoverPopUp={openAssetPopoverPopUp}
          openGlossaryFootnotePopUp={openGlossaryFootnotePopUp}
          index={this.props.index}
          elementId={this.props.elementId}
          element={this.props.element}
          placeholder="Type Something..."
          className={className}
          model={model}
          handleEditorFocus={this.props.handleFocus}
          onFocus={this.onFocus}
          handleBlur = {this.props.handleBlur}
          onKeyup={this.onKeyup}
          onBlur={this.onBlur}
          onClick={this.onClick}
          slateLockInfo={slateLockInfo}
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