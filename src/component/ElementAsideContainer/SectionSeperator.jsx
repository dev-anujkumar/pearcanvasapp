import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Button from '../ElementButtons'
import Tooltip from '../Tooltip'
import './../../styles/ElementAsideContainer/ElementAsideContainer.css';

class SectionSeperator extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            sectionFocus:false,
            btnClassName:""
        }
    }
    
 /**
    * 
    * @discription - This function handles the click event on section
    */ 
     handleSeperator = (e) =>{
        e.stopPropagation();
        e.preventDefault();
        this.setState({
            sectionFocus: true,
            btnClassName: 'activeTagBgColor'
        }) 
        this.props.setActiveElement(this.props.element)
    }

     /**
    * 
    * @discription - This function handles the blur event on section
    */ 
   
     handleSeperatorBlur = (e)=>{
        e.stopPropagation();
        e.preventDefault();
        this.setState({
            sectionFocus: false,
            btnClassName: ''
        }) 
    }
    render(){
        const {sectionFocus,btnClassName} = this.state;
        const {elemBorderToggle,borderToggle} = this.props;
        let showBorder = `section-seperator ${sectionFocus?"section-seperator-focus":""}`
        return (
            <div className = "aside-section-seperator" tabIndex="0" onClick = {this.handleSeperator} onBlur = {this.handleSeperatorBlur} 
            className={
                (elemBorderToggle !== 'undefined' && elemBorderToggle) || borderToggle == 'active'? showBorder:""} >

                {(elemBorderToggle !== 'undefined' && elemBorderToggle) || borderToggle == 'active' ?
                    <div> 
                        <Button btnClassName={btnClassName} type="element-label" labelText="SB" />
                        <Button  type="delete-element" />
                    </div>:""
                 }
                <hr className="section-break" />
            </div>
        )
    }

}

SectionSeperator.propTypes = {
    elemBorderToggle: PropTypes.bool,
    borderToggle:PropTypes.string
}

export default SectionSeperator

