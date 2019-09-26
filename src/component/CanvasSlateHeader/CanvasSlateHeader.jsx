/**
* Root Component of Header Component.
*/

import React, { Component } from "react";
import '../../styles/CanvasSlateHeader/CanvasSlateHeader.css';
import Button from '../ElementButtons/ElementButton.jsx';
import PropTypes from 'prop-types'
import config from '../../config/config'

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
        this.props.onNavigate(nav);
    }

    setDynamicStyle = (type,className) => {
        if(className === 'header-label'){
            if(type ===  'container-introduction'){
                return {minWidth:'559px',fontSize:'12px',minWidth: "max-content"}
            }
            return {minWidth: type == 'section' ? '696px' : '675px',fontSize:'12px',minWidth: "max-content"}
        }
        if(className === 'input-text'){
            if(type ===  'container-introduction'){
                return {minWidth: '559px'}
            }
          return  {minWidth: type == 'section' ? '696px' : '675px'}
        }

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
    renderSlateLockJSX = (userName = "") => {
        return (
            <div className="canvas-header slate-lock-block">
                <Button type="lock-icon" />
                <span className="locked-slate-title">Locked Slate: {userName} </span><br />
            </div>
        )
    }
    
    checkSlateLock = (slateLockInfo) => {
        if(slateLockInfo){
            if(slateLockInfo.isLocked && config.userId !== slateLockInfo.userId){
                return this.renderSlateLockJSX(slateLockInfo.userId)
            }
            else {
                return null
            }
        }  
    }
    
    render() {
        const { slateType, slateTitle, slateLockInfo } = this.props
        let slateLabel = this.getLabel(slateType);
        let currentSlateTitle = (slateTitle && slateTitle.text) ? slateTitle.text : ''; 

        let nextDisabled = 'forward-nav-active';
        // if(this.props.disabled === 'next') {
        //     nextDisabled = 'forward-nav-disable';
        // }

        let backDisabled = 'backward-nav-active';
        // if(this.props.disabled === 'back') {
        //     backDisabled = 'backward-nav-disable';
        // }

        return (
            <div className="slate-title">
                {this.checkSlateLock(slateLockInfo)}
                <div className="canvas-header" id="canvas-header">
                    <div className="slate-header"><label className="header-label" style={this.setDynamicStyle(this.props.slateType,'header-label')}>{slateLabel}</label></div>
                    <div className="input-text" style={this.setDynamicStyle(this.props.slateType,'input-text')}>
                        <label className="u-hidden" htmlFor="txt-input" />
                        <input type="text" className="txt-input" placeholder="title" value={currentSlateTitle} disabled/>
                    </div>
                    {/* <Button type="backward-nav-active" onClick={() => this.handleNavClick("back")}/> */}
                    <Button type={backDisabled} onClick={() => this.handleNavClick("back")}/>
                    <Button type={nextDisabled} onClick={() => this.handleNavClick("next")}/>
                </div>
            </div>
        )
    }
}

SlateHeader.defaultProps = {
    slateType: "section",
    slateTitle: {}
}

SlateHeader.propTypes = {
      /** Type of slate to be rendered */
      slateType : PropTypes.string.isRequired,
      /** Title of slate to be rendered */
      slateTitle : PropTypes.object
}

export default  SlateHeader ;