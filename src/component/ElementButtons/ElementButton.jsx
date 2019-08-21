import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../../styles/ElementButtons/ElementButton.css'

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
