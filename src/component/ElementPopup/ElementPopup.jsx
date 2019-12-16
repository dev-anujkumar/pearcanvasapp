import React from 'react';
import TinyMceEditor from "../tinyMceEditor";
import { connect } from 'react-redux';
import config from '../../config/config'
import { showTocBlocker,hideTocBlocker, disableHeader } from '../../js/toggleLoader'
import {
    fetchSlateData
} from '../CanvasWrapper/CanvasWrapper_Actions';
import { sendDataToIframe } from '../../constants/utility.js';
import { ShowLoader } from '../../constants/IFrameMessageTypes.js'
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
        this.popupBorderRef = React.createRef()
    }
    componentDidMount = () => {
        this.popupBorderRef.current.addEventListener('click', this.handlepopupSlateClick)
    }
    componentWillUnmount = () => {
        this.popupBorderRef.current.removeEventListener('click', this.handlepopupSlateClick);
    }
    handlepopupSlateClick = (event) => {
        if(event.target.classList[0] !== "paragraphNumeroUno" && event.target.classList[0] !== "actionPU"){
            this.renderSlate()
        }
    }
    
    renderSlate =()=>{
        const { element, index } = this.props
        config.tempSlateManifestURN = config.slateManifestURN
        config.tempSlateEntityURN = config.slateEntityURN
        config.slateManifestURN = "urn:pearson:manifest:18a0bb7d-bfed-49bd-b56e-b4f186645671" //For mock purpose
        config.slateEntityURN = "urn:pearson:entity:c5ef5f9b-916d-45d0-82d4-6e3f01d00e5b" //For mock purpose
        config.cachedActiveElement = {
            index,
            element: {...element}
        }
        // this.props.openPopupSlate(this.props.element, config.slateManifestURN)
        sendDataToIframe({'type': ShowLoader,'message': { status: true }});
        this.props.fetchSlateData(config.slateManifestURN, 0, 'popup');
    }
    renderPopup = ()=>{
        const {index,element,slateLockInfo} = this.props
            return(
                <div className="divWidgetPU" resource="">
                <figure className="figureWidgetPU" resource="">
                    <header>
                            <TinyMceEditor  permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} index={`${index}-0`} className="heading4WidgetPUNumberLabel figureLabel" id={this.props.id} placeholder="Enter Label..." tagName={'h4'} model={element.popupdata && element.popupdata["formatted-title"].html.text}
                              handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />
                            <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} index={`${index}-1`} className='heading4WidgetPUTitle figureTitle' id={this.props.id} placeholder="Enter Title..." tagName={'h4'} model={element.popupdata && element.popupdata["formatted-subtitle"].html.text}
                             handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />
                    </header>
                   {/*  <div className={id}><strong>{path ? path : 'ITEM ID: '} </strong>{this.state.itemID?this.state.itemID : itemId}</div> */}
                    <div className="pearson-component pu"  data-uri="" data-type="pu" data-width="600" data-height="399" ref={this.popupBorderRef}>
                        {
                            <a className="buttonWidgetPU" href="javascript:void(0)">
                            <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-2`} placeholder="Enter call to action..." className={"actionPU"} tagName={'p'}
                            model={element.popupdata && element.popupdata.postertextobject? element.popupdata.postertextobject.html.text : "" } handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} elementId={this.props.elementId} />
                            </a>
                        }
                    </div>
    
                </figure>
            </div>
            )
        
    }
    render(){
      return (
        <div className="interactive-element">
            { this.renderPopup()}
        </div>  
      )
    }
}
ElementPopup.displayName = "ElementPopup"

const mapStateToProps = state => {
    return {}
};


export default connect(
    mapStateToProps,
    {
        fetchSlateData
    }
)(ElementPopup);