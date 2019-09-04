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

    render() {
        const { slateType, slateTitle } = this.props
        let slateLabel = this.getLabel(slateType);

        return (
            <div className="slate-Title">
                <div className="canvas-header" id="canvas-header">
                    <label className="header-label" style={this.setDynamicStyle(this.props.slateType,'header-label')}>{slateLabel}</label>
                    <div className="input-text" style={this.setDynamicStyle(this.props.slateType,'input-text')}>
                        <label className="u-hidden" htmlFor="txt-input" />
                        <input type="text" className="txt-input" placeholder="title" value={slateTitle.text} disabled/>
                    </div>
                    <Button type="backward-nav-active" onClick={() => this.handleNavClick("back")}/>
                    <Button type="forward-nav-active" onClick={() => this.handleNavClick("for")}/>
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