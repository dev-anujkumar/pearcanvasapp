import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../../styles/ElementButtons/buttonStyle.css'

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

        switch(type){
            case "add-comment":
                buttonJSX = <div id="add-comment" onClick={clickHandlerFn}><img src= {addNote} /></div>
                break;
            case "comment-flag":
                buttonJSX = <div id="flag-icon" onClick={clickHandlerFn}><img src= {noteFlag} /></div>
                break;
            case "block-label-P":
                buttonJSX = <div className = "block-label" onClick={clickHandlerFn}>P</div>
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
            case "color-palette":
                buttonJSX = <div id="color-palette" onClick={clickHandlerFn}><img src={colorPalette} /></div>
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
    type: "expand"
}

Button.propTypes = {
    type : PropTypes.string.isRequired,
    onClick : PropTypes.func
}

export default Button
