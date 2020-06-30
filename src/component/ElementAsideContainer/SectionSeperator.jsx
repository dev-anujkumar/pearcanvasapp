import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Button from '../ElementButtons';
import config from '../../config/config';
import './../../styles/ElementAsideContainer/ElementAsideContainer.css';
import { hasReviewerRole } from '../../constants/utility.js'

class SectionSeperator extends Component {
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
        let toolbar = config.asideToolbar
        if (toolbar && toolbar.length) {
            tinyMCE.$('#tinymceToolbar').find('.tox-toolbar__group>.tox-split-button,.tox-toolbar__group>.tox-tbtn')
                .each((index) => {
                    if (config.toolBarList[index] && toolbar.indexOf(config.toolBarList[index]) > -1) {
                        tinyMCE.$('#tinymceToolbar').find('.tox-toolbar__group>.tox-split-button,.tox-toolbar__group>.tox-tbtn').eq(index).addClass('toolbar-disabled')
                    }
                });
        }
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
        const { elemBorderToggle, borderToggle, element } = this.props;
        let showBorder = `section-seperator ${sectionFocus?"section-seperator-focus":""}`
        return (
            <div className = "aside-section-seperator" tabIndex="0" onClick = {this.handleSeperator} onBlur = {this.handleSeperatorBlur} 
            className={
                (elemBorderToggle !== 'undefined' && elemBorderToggle) || borderToggle == 'active'? showBorder:""} >

                {(elemBorderToggle !== 'undefined' && elemBorderToggle) || borderToggle == 'active' ?
                    <div> 
                        <Button btnClassName={btnClassName} type="element-label" labelText="SB" />
                      {this.props.permissions.includes('elements_add_remove') && !hasReviewerRole() && <Button  onClick={(e) => this.props.showDeleteElemPopup(e,true, element)} type="delete-element" />}
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

