import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TinyMceEditor from "./../tinyMceEditor"
import './../../styles/ElementAuthoring/ElementAuthoring.css';
import KeyboardWrapper from '../Keyboard/KeyboardWrapper.jsx';
export class ElementAuthoring extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, model,openGlossaryFootnotePopUp, slateLockInfo,openAssetPopoverPopUp,glossaryFootnoteValue, openMarkedIndexPopUp, markedIndexValue } = this.props
     return (
       <KeyboardWrapper enable={this.props.element?.elementdata?.type !== "blockquote"} index={this.props.index}>
           <TinyMceEditor
           isBlockList={this.props.isBlockList}
          openAssetPopoverPopUp ={openAssetPopoverPopUp}
          openGlossaryFootnotePopUp={openGlossaryFootnotePopUp}
          index={this.props.index}
          elementId={this.props.elementId}
          element={this.props.element}
          placeholder={this.props.placeholder!==undefined?this.props.placeholder:"Type Something..."}
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
          handleAssetsPopupLocation={this.props.handleAssetsPopupLocation}
          showHideType = {this.props?.showHideType}
          parentElement={this.props?.parentElement}
          openMarkedIndexPopUp = {openMarkedIndexPopUp}
          markedIndexValue={markedIndexValue}
          parentManifestListItem={this?.props?.parentManifestListItem}
        />
       </KeyboardWrapper>

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
