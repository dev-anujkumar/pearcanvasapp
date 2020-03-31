import React, { Component } from 'react';
import ElementPoetryLine from "./ElementPoetryLine.jsx"
class ElementPoetryStanza extends Component {
    constructor() {
      super();
    }

    prepareLineDom = (model)=>{

      let lineModel = `
        ${
          model.map((line)=>{
          return `<span data-id=${line.id}>${line.authoredtext.text}</span><br/>`
          })
        }
      `
      return lineModel;
    }
    
    render() {
        const { className, model,openGlossaryFootnotePopUp, slateLockInfo,openAssetPopoverPopUp,glossaryFootnoteValue , index} = this.props
        let lineModel = this.prepareLineDom(model)
        return (
           <ElementPoetryLine
             openAssetPopoverPopUp ={openAssetPopoverPopUp}
             openGlossaryFootnotePopUp={openGlossaryFootnotePopUp}
             index={`${index}-3`}
             elementId={this.props.elementId}
             element={this.props.element}
             className={className}
             model={lineModel}
            //  tagName={this.props.tagName}
             handleEditorFocus={this.props.handleFocus}
             handleBlur = {this.props.handleBlur}
             slateLockInfo={slateLockInfo}
             onListSelect={this.props.onListSelect}
             setActiveElement={this.props.setActiveElement}
              // handleBlur={this.handleBlur}
              handleFocus={this.props.handleFocus}
              btnClassName={this.props.btnClassName}
              borderToggle={this.props.borderToggle}
              elemBorderToggle={this.props.elemBorderToggle}
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