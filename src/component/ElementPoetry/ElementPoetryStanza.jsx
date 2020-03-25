import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ElementPoetryLine from "./ElementPoetryLine"
import elementContainerWrapper from "../HOCs/ElementContainerHOC"
class ElementPoetryStanza extends PureComponent {
    constructor() {
      super();
    }
    
    render() {
        const { className, model,openGlossaryFootnotePopUp, slateLockInfo,openAssetPopoverPopUp,glossaryFootnoteValue} = this.props
        return (
           <ElementPoetryLine
             openAssetPopoverPopUp ={openAssetPopoverPopUp}
             openGlossaryFootnotePopUp={openGlossaryFootnotePopUp}
             index={this.props.index}
             elementId={this.props.elementId}
             element={this.props.element}
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

  ElementPoetryStanza.defaultProps = {
    type: "element-poetrystanza"
  }
  
  export default elementContainerWrapper(ElementPoetryStanza);