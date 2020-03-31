import React, { PureComponent } from 'react';
import TinyMceEditor from "../tinyMceEditor"
class ElementPoetryLine extends PureComponent {
  constructor() {
    super();
  }

  handleFocus = (e) => {
    this.props.setActiveElement(this.props.element);     
    this.props.handleFocus();
  }

  render() {
    const { index, className, model, openGlossaryFootnotePopUp, slateLockInfo, openAssetPopoverPopUp, glossaryFootnoteValue } = this.props
    return (
      <div onClick={this.handleFocus}>
        <TinyMceEditor
          openAssetPopoverPopUp={openAssetPopoverPopUp}
          openGlossaryFootnotePopUp={openGlossaryFootnotePopUp}
          index={index}
          elementId={this.props.elementId}
          element={this.props.element}
          placeholder="Type Something..."
          className={className}
          model={model}
          //  tagName={this.props.tagName}
          handleEditorFocus={this.props.handleFocus}
          handleBlur={this.props.handleBlur}
          slateLockInfo={slateLockInfo}
          onListSelect={this.props.onListSelect}
          permissions={this.props.permissions}
          setActiveElement={this.props.setActiveElement}
          // handleBlur={this.handleBlur}
          handleFocus={this.handleFocus}
          btnClassName={this.props.btnClassName}
          borderToggle={this.props.borderToggle}
          elemBorderToggle={this.props.elemBorderToggle}
          glossaryFootnoteValue={glossaryFootnoteValue}
          glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
        />
      </div>
    )
  }
}

ElementPoetryLine.defaultProps = {
  type: "element-poetrystanza"
}

export default ElementPoetryLine;