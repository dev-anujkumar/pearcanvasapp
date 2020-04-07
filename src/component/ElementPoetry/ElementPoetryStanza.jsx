import React, { Component } from 'react';
import ElementPoetryLine from "./ElementPoetryLine.jsx"
class ElementPoetryStanza extends Component {
    constructor() {
      super();
    }

  // prepareLineDom = (model) => {

  //   let lineModel = 
  //     `${model.map((line) => {
  //       return (line.authoredtext.text ? `<span class="poetryLine" data-id=${line.id}>${line.authoredtext.text}</span><br/>`:
  //       `<span class="poetryLine" data-id=${line.id}><br /></span><br/>`)
  //     })
  //     }` 
  //   return lineModel;
  // }
    
    render() {
        const { className, model,openGlossaryFootnotePopUp, slateLockInfo,openAssetPopoverPopUp,glossaryFootnoteValue , index} = this.props
        // let lineModel = this.prepareLineDom(model)
        return (
           <ElementPoetryLine
             openAssetPopoverPopUp ={openAssetPopoverPopUp}
             openGlossaryFootnotePopUp={openGlossaryFootnotePopUp}
             index={index}
             elementId={this.props.elementId}
             element={this.props.element}
             className={className}
            //  model={model && model.html && model.html.text}
            model={'<span class="poetryLine"><br /></span><br/>'}
             tagName={'div'}
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