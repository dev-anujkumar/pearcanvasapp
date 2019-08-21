import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../../styles/ElementButtons/buttonStyle.css'

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


export class Button extends Component {

    renderButton = (type, clickHandlerFn) => {
        let buttonJSX = null
        const { labelText } = this.props

        switch(type){
            case "add-comment":
                buttonJSX = <div id="add-comment" onClick={clickHandlerFn}><img src= {addNote} /></div>
                break;
            case "comment-flag":
                buttonJSX = <div id="flag-icon" onClick={clickHandlerFn}><img src= {noteFlag} /></div>
                break;
            case "element-label":
                buttonJSX = <div className = "element-label" onClick={clickHandlerFn}>{labelText.toUpperCase()}</div>
                break;
            case "delete-element":
                buttonJSX = <div id="delete-icon" onClick={clickHandlerFn}><img src={deleteIcon} /></div>
                break;
            case "tcm":
                buttonJSX = <div id="tcm-icon" onClick={clickHandlerFn}><img src={tcmIcon} /></div>
                break;
            case "forward-nav-active":
                buttonJSX = <div id="forward-nav-active" onClick={clickHandlerFn}><img src={forwardNavActive} /></div>
                break;
            case "backward-nav-active":
                buttonJSX = <div id="backward-nav-active" onClick={clickHandlerFn}><img src={backwardNavActive} /></div>
                break;
            case "expand":
                buttonJSX = <div id="expand-icon" onClick={clickHandlerFn}><img src={expandIcon} /></div>
                break;
            case "split":
                buttonJSX = <div id="split-icon" onClick={clickHandlerFn}><img src={splitIcon} /></div>
                break;
            case "text-elem":
                buttonJSX = <div id="text-elem" onClick={clickHandlerFn}><img src={textIcon} /></div>
                break;
            case "image-elem":
                buttonJSX = <div id="image-elem" onClick={clickHandlerFn}><img src={imageIcon} /></div>
                break;
            case "audio-elem":
                buttonJSX = <div id="audio-elem" onClick={clickHandlerFn}><img src={audioIcon} /></div>
                break;
            case "interactive-elem":
                buttonJSX = <div id="interactive-elem" onClick={clickHandlerFn}><img src={interativeIcon} /></div>
                break;
            case "container-elem":
                buttonJSX = <div id="container-elem" onClick={clickHandlerFn}><img src={containerIcon} /></div>
                break;
            case "worked-exp-elem":
                buttonJSX = <div id="worked-exp-elem" onClick={clickHandlerFn}><img src={workedExampleIcon} /></div>
                break;
            case "assessment-elem":
                buttonJSX = <div id="assessment-elem" onClick={clickHandlerFn}><img src={assessmentIcon} /></div>
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
