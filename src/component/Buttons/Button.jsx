import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../../styles/Buttons/buttonStyle.css'

import addNote from '../../images/Buttons/addNote.svg'
import noteFlag from '../../images/Buttons/noteFlag.svg'
import deleteIcon from '../../images/Buttons/deleteIcon.png'
import tcmIcon from '../../images/Buttons/tcmIcon.svg'
import forwardNavActive from '../../images/Buttons/forwardNavActive.png'
import backwardNavActive from '../../images/Buttons/backwardNavActive.png'
import splitIcon from '../../images/Buttons/splitIcon.png'
import expandIcon from '../../images/Buttons/expandIcon.png'
import colorPalette from '../../images/Buttons/colorPalette.png'


export class Button extends Component {

    renderButton = (type) => {
        let buttonJSX = null

        switch(type){
            case "add-comment":
                buttonJSX = <div id="add-comment"><img src= {addNote} /></div>
                break;
            case "comment-flag":
                buttonJSX = <div id="flag-icon"><img src= {noteFlag} /></div>
                break;
            case "block-label-P":
                buttonJSX = <div className = "block-label">P</div>
                break;
            case "delete-element":
                buttonJSX = <div id="delete-icon"><img src={deleteIcon} /></div>
                break;
            case "tcm":
                buttonJSX = <div id="tcm-icon"><img src={tcmIcon} /></div>
                break;
            case "forward-nav-active":
                buttonJSX = <div id="forward-nav-active"><img src={forwardNavActive} /></div>
                break;
            case "backward-nav-active":
                buttonJSX = <div id="backward-nav-active"><img src={backwardNavActive} /></div>
                break;
            case "expand":
                buttonJSX = <div id="expand-icon"><img src={expandIcon} /></div>
                break;
            case "split":
                buttonJSX = <div id="split-icon"><img src={splitIcon} /></div>
                break;
            case "color-palette":
                buttonJSX = <div id="color-palette"><img src={colorPalette} /></div>
                break;
        }
        return buttonJSX
    }
    
    render() {
        const { type } = this.props
        return(
            <>
                {this.renderButton(type)}             
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
