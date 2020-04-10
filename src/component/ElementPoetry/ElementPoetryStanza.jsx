import React, { Component } from 'react';
import '../../styles/ElementPoetry/ElementPoetry.css'
import TinyMceEditor from "../tinyMceEditor"
class ElementPoetryStanza extends Component {

  prepareLineDom = (model) => {
    let ConvertedModel = model && model.html && model.html.text.replace(/<p>/g, "")
    ConvertedModel = ConvertedModel && ConvertedModel.replace(/<\/p>/g, "")
    let lineModel = ConvertedModel ? ConvertedModel : '<span class="poetryLine"><br /></span>'
    return lineModel;
  }

  render() {
    const { className, model, openGlossaryFootnotePopUp, slateLockInfo, openAssetPopoverPopUp, glossaryFootnoteValue, index } = this.props
    let lineModel = this.prepareLineDom(model)
    return (
      <TinyMceEditor
        openAssetPopoverPopUp={openAssetPopoverPopUp}
        openGlossaryFootnotePopUp={openGlossaryFootnotePopUp}
        index={index}
        elementId={this.props.elementId}
        element={this.props.element}
        placeholder="Type Something..."
        className={className}
        model={lineModel ? lineModel : '<span class="poetryLine"><br></span>'}
        tagName={'div'}
        handleEditorFocus={this.props.handleFocus}
        handleBlur={this.props.handleBlur}
        slateLockInfo={slateLockInfo}
        onListSelect={this.props.onListSelect}
        permissions={this.props.permissions}
        setActiveElement={this.props.setActiveElement}
        handleFocus={this.handleFocus}
        btnClassName={this.props.btnClassName}
        borderToggle={this.props.borderToggle}
        elemBorderToggle={this.props.elemBorderToggle}
        glossaryFootnoteValue={glossaryFootnoteValue}
        glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
      />
    )
  }
}

ElementPoetryStanza.defaultProps = {
  type: "element-poetrystanza"
}

export default ElementPoetryStanza;