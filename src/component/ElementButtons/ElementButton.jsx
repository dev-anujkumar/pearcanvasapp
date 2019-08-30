import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../../styles/ElementButtons/ElementButton.css'

import { workedExampleIcon,sectionBreakElement, assessmentIcon, openerElement, noteFlag , tcmIcon, addNote, textIcon, imageIcon, interativeIcon, audioIcon, containerIcon} from '../../images/ElementButtons/ElementButtons.jsx';
import deleteIcon from '../../images/ElementButtons/deleteIcon.png'
import forwardNavActive from '../../images/ElementButtons/forwardNavActive.png'
import backwardNavActive from '../../images/ElementButtons/backwardNavActive.png'
import splitIcon from '../../images/ElementButtons/splitIcon.png'
import expandIcon from '../../images/ElementButtons/expandIcon.png'
import colorPalette from '../../images/ElementButtons/colorPalette.png'
import closeContainer from '../../images/ElementButtons/container_close.png'

class Button extends Component {

  /**
  * Responsible for rendering Button component according to the props received
  * @param type type of button
  * @param clickHandlerFn Handler method to be called on click event
  *  
  */
    renderButton = (type, clickHandlerFn) => {
        let buttonJSX = null
        const { labelText } = this.props

        switch(type){
            case "close-container":
                buttonJSX = <span className="btn-element" id="close-container"  onClick={clickHandlerFn}><img src={closeContainer} /></span>
                break;
            case "add-comment":
                buttonJSX = <span className="btn-element small" id="add-comment" onClick={clickHandlerFn}>
                    {addNote}
                    </span>
                break;
            case "comment-flag":
                buttonJSX = <span className="btn-element small" id="flag-icon" onClick={clickHandlerFn}>
                    {noteFlag}
                    </span>
                break;
            case "element-label":
                buttonJSX = <span className="btn-element" id="element-label" onClick={clickHandlerFn}>{labelText.toUpperCase()}</span>
                break;
            case "delete-element":
                buttonJSX = <span className="btn-element" id="delete-icon" onClick={clickHandlerFn}>
                    <img src={deleteIcon} /></span>
                break;
            case "tcm":
                buttonJSX = <span className="btn-element small" id="tcm-icon" onClick={clickHandlerFn}>
                    {tcmIcon}
                    </span>
                break;
            case "forward-nav-active":
                buttonJSX = <span className="btn-element" id="forward-nav-active" onClick={clickHandlerFn}><img src={forwardNavActive} /></span>
                break;
            case "backward-nav-active":
                buttonJSX = <span className="btn-element" id="backward-nav-active" onClick={clickHandlerFn}><img src={backwardNavActive} /></span>
                break;
            case "expand":
                buttonJSX = <span className="btn-element" id="expand-icon" onClick={clickHandlerFn}><img src={expandIcon} /></span>
                break;
            case "split":
                buttonJSX = <span className="btn-element" id="split-icon" onClick={clickHandlerFn}><img src={splitIcon} /></span>
                break;
            case "color-palette":
                buttonJSX = <span className="btn-element" id="color-palette" onClick={clickHandlerFn}><img src={colorPalette} /></span>
                break;
            case "text-elem":
                buttonJSX = <span className="btn-element" id="text-elem" onClick={clickHandlerFn}>
                    {textIcon}
                    </span>
                break;
            case "image-elem":
                buttonJSX = <span className="btn-element" id="image-elem" onClick={clickHandlerFn}>
                    {imageIcon}
                    </span>
                break;
            case "audio-elem":
                buttonJSX = <span className="btn-element" id="audio-elem" onClick={clickHandlerFn}>
                    {audioIcon}
                    </span>
                break;
            case "interactive-elem":
                buttonJSX = <span className="btn-element" id="interactive-elem" onClick={clickHandlerFn}>
                    {interativeIcon}
                    </span>
                break;
            case "container-elem":
                buttonJSX = <span className="btn-element" id="container-elem" onClick={clickHandlerFn}>
                    {containerIcon}
                    </span>
                break;
            case "worked-exp-elem":
                buttonJSX = <span className="btn-element" id="worked-exp-elem" onClick={clickHandlerFn}>
                    {workedExampleIcon}
                    </span>
                break;
            case "assessment-elem":
                buttonJSX = <span className="btn-element" id="assessment-elem" onClick={clickHandlerFn}>
                    {assessmentIcon}
                    </span>
                break;
            case "opener-elem":
                buttonJSX = <span className="btn-element" id="opener-elem" onClick={clickHandlerFn}>
                    {openerElement}
                    </span>
                break;
            case "section-break-elem":
                buttonJSX = <span className="btn-element" id="section-break-elem" onClick={clickHandlerFn}>
                    {sectionBreakElement}
                    </span>
                break;
        }
        return buttonJSX
    }
    
    render() {
        const { type, onClick } = this.props
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

export default Button
