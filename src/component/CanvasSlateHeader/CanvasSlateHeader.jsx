/**
* Root Component of Header Component.
*/

import React, { Component } from "react";
import '../../styles/CanvasSlateHeader/CanvasSlateHeader.css';
import Button from '../ElementButtons/ElementButton.jsx';
import PropTypes from 'prop-types'

/**
* @description - SlateHeader is a class based component. It is defined simply
* to make a skeleton of the Header of Slate.
*/
 class SlateHeader extends Component {
    constructor(props) {
        super(props);
        this.state ={}
        this.handleNavClick = this.handleNavClick.bind(this);
        this.getLabel = this.getLabel.bind(this);
    }


    /**
     * @description - This function is for handling the navigation of Slate backward and forward.
     * @param {event} nav
     */

    handleNavClick(nav) {
        alert(nav);
    }

    /**
     * @description - This function is for handling the change in type of Slate.
     * @param {event} slateType
     */

    getLabel (slateType) {
        let returnType = '';

        switch(slateType){

            case 'container-introduction':
             returnType = 'INTRODUCTORY SLATE:';
            break;

            case 'assessment':
             returnType = 'ASSESSMENT SLATE:';
            break;

            case 'section':
             returnType = 'SLATE:';
            break;

            default:
            returnType = 'SLATE:';
        }
        return returnType;
    }

    render() {
        const { slateType } = this.props
        let slateLabel = this.getLabel(slateType);

        return (
            <div className="slate-Title">
                <div className="canvas-header" id="canvas-header">
                    <label className="header-label">{slateLabel}</label>
                    <div className="input-text">
                        <label className="u-hidden" htmlFor="txt-input" />
                        <input type="text" className="txt-input" placeholder="title" disabled/>
                    </div>
                    <Button type="backward-nav-active" onClick={() => this.handleNavClick("back")}/>
                    <Button type="forward-nav-active" onClick={() => this.handleNavClick("for")}/>
                </div>
            </div>
        )
    }
}

SlateHeader.defaultProps = {
    slateType: ""
}

SlateHeader.propTypes = {
      /** Type of slate to be rendered */
      slateType : PropTypes.string.isRequired
}

export default  SlateHeader ;