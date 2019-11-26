import React from 'react';
import TinyMceEditor from "../tinyMceEditor";
import { connect } from 'react-redux';
import { showTocBlocker,hideTocBlocker, disableHeader } from '../../js/toggleLoader'
import {
    openPopupSlate
} from '../CanvasWrapper/CanvasWrapper_Actions';
/**
* @description - Interactive is a class based component. It is defined simply
* to make a skeleton of the Interactive Element.
*/

class ElementPopup extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            openPopupSlate:false
        }
    }
    renderSlate =()=>{
     this.props.openPopupSlate(this.props.element)
    }
    renderPopup = ()=>{
        const {openPopupSlate} = this.state
        console.log("openPopupSlate=====.",openPopupSlate)
        const {index,element,slateLockInfo} = this.props
        console.log("element",element)
   
            return(
                <div className="divWidgetPU" resource="">
                <figure className="figureWidgetPU" resource="">
                    <header>
                            <TinyMceEditor  permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} index={`${index}-0`} className="heading4WidgetPUNumberLabel figureLabel" id={this.props.id} placeholder="Enter Label..." tagName={'h4'} model={element.html && element.html.title}
                              handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />
                            <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} index={`${index}-1`} className='heading4WidgetPUTitle figureTitle' id={this.props.id} placeholder="Enter Title..." tagName={'h4'} model={element.html && element.html.subtitle}
                             handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />
                    </header>
                   {/*  <div className={id}><strong>{path ? path : 'ITEM ID: '} </strong>{this.state.itemID?this.state.itemID : itemId}</div> */}
                    <div className="pearson-component pu"  data-uri="" data-type="pu" data-width="600" data-height="399" >
                        {
                                 <a className="buttonWidgetPU" href="javascript:void(0)" onClick = {this.renderSlate}>
                                    <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-2`} placeholder="Enter call to action..." className={"actionPU"} tagName={'p'} 
                                    model={element.html && element.html.postertext? element.html.postertext : "" } handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} elementId={this.props.elementId} />
                                 </a>
                        }
                    </div>
    
                </figure>
            </div>
            )
        
    }
    render(){
      return (
          <>
         { this.renderPopup()}
          </>
      )
    }
}
ElementPopup.displayName = "ElementPopup"
const mapStateToProps = state => {
    return {
 
    };
};


export default connect(
    mapStateToProps,
    {
        openPopupSlate
    }
)(ElementPopup);
