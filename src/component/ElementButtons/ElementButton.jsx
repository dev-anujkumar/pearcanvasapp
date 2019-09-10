import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../../styles/ElementButtons/ElementButton.css'

import buttonTypes from './ButtonTypes.js'

import { workedExampleIcon,sectionBreakElement, assessmentIcon, openerElement, noteFlag , tcmIcon, addNote, textIcon, imageIcon, interativeIcon, audioIcon, containerIcon} from '../../images/ElementButtons/ElementButtons.jsx';
import deleteIcon from '../../images/ElementButtons/deleteIcon.png'
import forwardNavActive from '../../images/ElementButtons/forwardNavActive.png'
import backwardNavActive from '../../images/ElementButtons/backwardNavActive.png'
import splitIcon from '../../images/ElementButtons/splitIcon.png'
import expandIcon from '../../images/ElementButtons/expandIcon.png'
import colorPalette from '../../images/ElementButtons/colorPalette.png'
import closeContainer from '../../images/ElementButtons/container_close.png';


class Button extends Component {
   
  /**
  * Responsible for rendering Button component according to the props received
  * @param type type of button
  * @param clickHandlerFn Handler method to be called on click event
  *  
  */
    renderButton = (type, clickHandlerFn) => {
        let buttonJSX = null
        const { labelText,elementId } = this.props

        switch(type){
            case buttonTypes.closeContainer:
                buttonJSX = <span className="btn-element close-container"  onClick={clickHandlerFn}><img src={closeContainer} /></span>
                break;
            case buttonTypes.addComment:
                buttonJSX = <span className="btn-element small add-comment" onClick={clickHandlerFn}>
                    {addNote}
                    </span>
                break;
            case buttonTypes.commentFlag:
                buttonJSX = <span className="btn-element small flag-icon" onClick={()=>clickHandlerFn(elementId)}>
                    {noteFlag}
                    </span>
                break;
            case buttonTypes.elementBlockLabel:
                buttonJSX = <span className="btn-element element-label" onClick={clickHandlerFn}>{labelText.toUpperCase()}</span>
                break;
            case buttonTypes.deleteElement:
                buttonJSX = <span className="btn-element delete-icon" onClick={clickHandlerFn}>
                    <img src={deleteIcon} /></span>
                break;
            case buttonTypes.tcm:
                buttonJSX = <span className="btn-element small tcm-icon" onClick={clickHandlerFn}>
                    {tcmIcon}
                    </span>
                break;
            case buttonTypes.forwardNavigation:
                buttonJSX = <span className="btn-element forward-nav-active" onClick={clickHandlerFn}><img src={forwardNavActive} /></span>
                break;
            case buttonTypes.backwardNavigation:
                buttonJSX = <span className="btn-element backward-nav-active" onClick={clickHandlerFn}><img src={backwardNavActive} /></span>
                break;
            case buttonTypes.expand:
                buttonJSX = <span className="btn-element expand-icon" onClick={clickHandlerFn}><img src={expandIcon} /></span>
                break;
            case buttonTypes.splitSlate:
                buttonJSX = <span className="btn-element split-icon" onClick={clickHandlerFn}><img src={splitIcon} /></span>
                break;
            case buttonTypes.colorPalette:
                buttonJSX = <span className="btn-element color-palette" onClick={clickHandlerFn}><img src={colorPalette} /></span>
                break;
            case buttonTypes.textElement:
                buttonJSX = <span className="btn-element text-elem" onClick={clickHandlerFn}>
                    {textIcon}
                    </span>
                break;
            case buttonTypes.imageElement:
                buttonJSX = <span className="btn-element image-elem" onClick={clickHandlerFn}>
                    {imageIcon}
                    </span>
                break;
            case buttonTypes.audioElement:
                buttonJSX = <span className="btn-element audio-elem" onClick={clickHandlerFn}>
                    {audioIcon}
                    </span>
                break;
            case buttonTypes.interactiveElement:
                buttonJSX = <span className="btn-element interactive-elem" onClick={clickHandlerFn}>
                    {interativeIcon}
                    </span>
                break;
            case buttonTypes.containerElement:
                buttonJSX = <span className="btn-element container-elem" onClick={clickHandlerFn}>
                    {containerIcon}
                    </span>
                break;
            case buttonTypes.workedExampleElement:
                buttonJSX = <span className="btn-element worked-exp-elem" onClick={clickHandlerFn}>
                    {workedExampleIcon}
                    </span>
                break;
            case buttonTypes.assessmentElement:
                buttonJSX = <span className="btn-element assessment-elem" onClick={clickHandlerFn}>
                    {assessmentIcon}
                    </span>
                break;
            case buttonTypes.openerElement:
                buttonJSX = <span className="btn-element opener-elem" onClick={clickHandlerFn}>
                    {openerElement}
                    </span>
                break;
            case buttonTypes.sectionBreakElement:
                buttonJSX = <span className="btn-element section-break-elem" onClick={clickHandlerFn}>
                    {sectionBreakElement}
                    </span>
                break;
        }
        return buttonJSX
    }
    
    render() {
        const { type, onClick, elementId } = this.props
        console.log("elementid",elementId)
        return(
            <>
                {this.renderButton(type, onClick)}             
            </>
        )
    }
}

Button.defaultProps = {
    type: "expand",
    labelText: "P"
}

Button.propTypes = {
    /** Type of button to be rendered */
    type : PropTypes.string.isRequired,
    /** Handler to attach on button click */
    onClick : PropTypes.func,
    /** Required in case of 'element-label' type of button */
    labelText : PropTypes.string
}

Button.displayName = 'ElementButton'

export default Button
