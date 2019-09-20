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
        this.handleSeperator = this.handleSeperator.bind(this);
        this.handleSeperatorBlur = this.handleSeperatorBlur.bind(this);
    }

     handleSeperator(e){
        e.stopPropagation();
        e.preventDefault();
        this.setState({
            sectionFocus: true,
            btnClassName: 'activeTagBgColor'
        }) 
       
    }

     handleSeperatorBlur(e){
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
            <div tabIndex="0" onClick = {this.handleSeperator} onBlur = {this.handleSeperatorBlur} 
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
    
}
export default SectionSeperator

