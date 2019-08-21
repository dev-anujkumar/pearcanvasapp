import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../../styles/ElementButtons/ElementButton.css'

import textIcon from '../../images/ElementButtons/textElement.svg'
import imageIcon from '../../images/ElementButtons/imageElement.svg'
import audioIcon from '../../images/ElementButtons/audioElement.svg'
import interativeIcon from '../../images/ElementButtons/interactiveElement.svg'
import assessmentIcon from '../../images/ElementButtons/assessmentElement.svg'
import containerIcon from '../../images/ElementButtons/containerElement.svg'
import workedExampleIcon from '../../images/ElementButtons/workedExampleElement.svg'
import addNote from '../../images/ElementButtons/addNote.svg'
import noteFlag from '../../images/ElementButtons/noteFlag.svg'
import deleteIcon from '../../images/ElementButtons/deleteIcon.png'
import tcmIcon from '../../images/ElementButtons/tcmIcon.svg'
import forwardNavActive from '../../images/ElementButtons/forwardNavActive.png'
import backwardNavActive from '../../images/ElementButtons/backwardNavActive.png'
import splitIcon from '../../images/ElementButtons/splitIcon.png'
import expandIcon from '../../images/ElementButtons/expandIcon.png'
import colorPalette from '../../images/ElementButtons/colorPalette.png'

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
            case "add-comment":
                buttonJSX = <span className="btn-element small" id="add-comment" onClick={clickHandlerFn}><img src={addNote} /></span>
                break;
            case "comment-flag":
                buttonJSX = <span className="btn-element small" id="flag-icon" onClick={clickHandlerFn}><img src={noteFlag} /></span>
                break;
            case "element-label":
                buttonJSX = <span className="btn-element" id="element-label" onClick={clickHandlerFn}>{labelText.toUpperCase()}</span>
                break;
            case "delete-element":
                buttonJSX = <span className="btn-element" id="delete-icon" onClick={clickHandlerFn}><img src={deleteIcon} /></span>
                break;
            case "tcm":
                buttonJSX = <span className="btn-element small" id="tcm-icon" onClick={clickHandlerFn}><img src={tcmIcon} /></span>
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
                buttonJSX = <span className="btn-element" id="text-elem" onClick={clickHandlerFn}><img src={textIcon} /></span>
                break;
            case "image-elem":
                buttonJSX = <span className="btn-element" id="image-elem" onClick={clickHandlerFn}><img src={imageIcon} /></span>
                break;
            case "audio-elem":
                buttonJSX = <span className="btn-element" id="audio-elem" onClick={clickHandlerFn}><img src={audioIcon} /></span>
                break;
            case "interactive-elem":
                buttonJSX = <span className="btn-element" id="interactive-elem" onClick={clickHandlerFn}><img src={interativeIcon} /></span>
                break;
            case "container-elem":
                buttonJSX = <span className="btn-element" id="container-elem" onClick={clickHandlerFn}><img src={containerIcon} /></span>
                break;
            case "worked-exp-elem":
                buttonJSX = <span className="btn-element" id="worked-exp-elem" onClick={clickHandlerFn}><img src={workedExampleIcon} /></span>
                break;
            case "assessment-elem":
                buttonJSX = <span className="btn-element" id="assessment-elem" onClick={clickHandlerFn}><img src={assessmentIcon} /></span>
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
