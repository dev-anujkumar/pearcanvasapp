import React, { Component } from 'react';
import ElementPoetryLine from "./ElementPoetryLine.jsx"
class ElementPoetryStanza extends Component {
    constructor() {
      super();
    }

    prepareLineDom = (model)=>{

      let lineModel = `<div>
        ${
          model.map((line)=>{
          return `<span data-id=${line.id}>${line.authoredtext.text}</span><br/>`
          })
        }
      </div>`
      return lineModel;
    }
    
    render() {
        const { className, model,openGlossaryFootnotePopUp, slateLockInfo,openAssetPopoverPopUp,glossaryFootnoteValue} = this.props
        let lineModel = this.prepareLineDom(model)
        return (
           <ElementPoetryLine
             openAssetPopoverPopUp ={openAssetPopoverPopUp}
             openGlossaryFootnotePopUp={openGlossaryFootnotePopUp}
             index={this.props.index}
             elementId={this.props.elementId}
             element={this.props.element}
             className={className}
             model={lineModel}
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
  
  export default ElementPoetryStanza;