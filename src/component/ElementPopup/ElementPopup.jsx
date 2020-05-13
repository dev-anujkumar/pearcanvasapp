import React from 'react';
import TinyMceEditor from "../tinyMceEditor";
import { connect } from 'react-redux';
import config from '../../config/config'
import {
    fetchSlateData,
    createPopupUnit
} from '../CanvasWrapper/CanvasWrapper_Actions';
import { sendDataToIframe } from '../../constants/utility.js';
import { ShowLoader } from '../../constants/IFrameMessageTypes.js'
import { checkSlateLock } from '../../js/slateLockUtility.js'
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
        this.props.handleFocus();
        if(config.popupCreationCallInProgress){
            return false
        }
        if(event.target.classList[0] !== "paragraphNumeroUno" && event.target.classList[0] !== "actionPU"){
            if(!(checkSlateLock(this.props.slateLockInfo) || this.props.activeElement.elementId !== this.props.element.id)){
                this.renderSlate()
            }
        } 
    }
    
    renderSlate =()=>{
        const { element, index } = this.props
        config.tempSlateManifestURN = config.slateManifestURN
        config.tempSlateEntityURN = config.slateEntityURN
        config.slateManifestURN = element.id
        config.slateEntityURN = element.contentUrn
        config.cachedActiveElement = {
            index,
            element: {...element}
        }
        sendDataToIframe({'type': ShowLoader,'message': { status: true }});
        this.props.fetchSlateData(config.slateManifestURN, config.slateEntityURN, 0, false);
    }

    /**
     * Creates Title/Subtitle element if not present.
     */
    createPopupUnit = (popupField, forceupdate, index, parentElement) => {
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
        config.popupCreationCallInProgress = true
        this.props.createPopupUnit(popupField, parentElement, (currentElementData) => this.props.handleBlur(forceupdate, currentElementData, index, null), index, config.slateManifestURN)
    }
    renderPopup = ()=>{        
        const {index, element, slateLockInfo} = this.props
            return(
                <div className="divWidgetPU" resource="">
                <figure className="figureWidgetPU" resource="">
                    <header>
                            <TinyMceEditor  permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={element} index={`${index}-0`} className="heading4WidgetPUNumberLabel figureLabel formatted-text" id={this.props.id} placeholder="Enter Label..." tagName={'h4'} model={element.popupdata && element.popupdata["formatted-title"] && element.popupdata["formatted-title"].html.text ? element.popupdata["formatted-title"].html.text : '' } currentElement = {element.popupdata && element.popupdata["formatted-title"]}
                              handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} popupField = "formatted-title" createPopupUnit={this.createPopupUnit} />
                            <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={element} index={`${index}-1`} className='heading4WidgetPUTitle figureTitle formatted-text' id={this.props.id} placeholder="Enter Title..." tagName={'h4'} model={element.popupdata && element.popupdata["formatted-subtitle"] && element.popupdata["formatted-subtitle"].html.text ? element.popupdata["formatted-subtitle"].html.text : ''} currentElement = {element.popupdata && element.popupdata["formatted-subtitle"]}
                             handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} popupField = "formatted-subtitle" createPopupUnit={this.createPopupUnit} />
                    </header>
                   {/*  <div className={id}><strong>{path ? path : 'ITEM ID: '} </strong>{this.state.itemID?this.state.itemID : itemId}</div> */}
                    <div className="pearson-component pu"  data-uri="" data-type="pu" data-width="600" data-height="399" ref={this.popupBorderRef}>
                        {
                            <a className="buttonWidgetPU">
                            <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-2`} placeholder="Enter call to action..." className={"actionPU"} id={this.props.id} element={element} currentElement = {element.popupdata && element.popupdata.postertextobject[0]} model={element.popupdata && element.popupdata.postertextobject? element.popupdata.postertextobject[0].html.text : "" } 
                            handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} elementId={this.props.elementId} popupField = "postertextobject" createPopupUnit={this.createPopupUnit}/>
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
            { this.renderPopup() }
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
        fetchSlateData,
        createPopupUnit
    }
)(ElementPopup);