import React, { Component } from 'react';
import { connect } from 'react-redux';
import ElementPoetryStanza from "./ElementPoetryStanza.jsx"
import ElementContainerWrapper from "../HOCs/ElementContainerHOC"
class ElementPoetry extends Component {
    constructor() {
      super();
    }
    
    render() {
        const { className, model,openGlossaryFootnotePopUp, slateLockInfo,openAssetPopoverPopUp,glossaryFootnoteValue} = this.props
        return (
           <ElementPoetryStanza
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

  ElementPoetry.defaultProps = {
    type: "element-poetrystanza"
  }
  
  export default ElementContainerWrapper(ElementPoetry);