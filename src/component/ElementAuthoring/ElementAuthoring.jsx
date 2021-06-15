import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TinyMceEditor from "./../tinyMceEditor"
import './../../styles/ElementAuthoring/ElementAuthoring.css';
export class ElementAuthoring extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, model,openGlossaryFootnotePopUp, slateLockInfo,openAssetPopoverPopUp,glossaryFootnoteValue} = this.props
     return (
        <TinyMceEditor
          openAssetPopoverPopUp ={openAssetPopoverPopUp}
          openGlossaryFootnotePopUp={openGlossaryFootnotePopUp}
          index={this.props.index}
          elementId={this.props.elementId}
          element={this.props.element}
          placeholder="Type Something..."
          className={className}
          model={model}
          tagName={this.props.tagName}
          handleEditorFocus={this.props.handleFocus}
          handleBlur = {this.props.handleBlur}
          slateLockInfo={slateLockInfo}
          onListSelect={this.props.onListSelect}
          permissions={this.props.permissions}
          glossaryFootnoteValue={glossaryFootnoteValue}
          glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
          handleAudioPopupLocation ={this.props.handleAudioPopupLocation}
        />
    )

    
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