import React, { PureComponent } from 'react';
import TinyMceEditor from "../tinyMceEditor"
class ElementPoetryLine extends PureComponent {
    constructor() {
      super();
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
           />
       )
    }
  }

  ElementPoetryLine.defaultProps = {
    type: "element-poetrystanza"
  }
  
  export default ElementPoetryLine;