import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import elementList from './elementTypes.js';
import { dropdownArrow } from './../../images/ElementButtons/ElementButtons.jsx';
import { updateElement } from './Sidebar_Action';
import { setCurrentModule } from '../ElementMetaDataAnchor/ElementMetaDataAnchor_Actions';
import './../../styles/Sidebar/Sidebar.css';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        
        let elementType = this.props.activeElement.type || 'element-authoredtext';
        let elementTypeList = elementList[elementType];
        let primaryFirstOption = Object.keys(elementTypeList)[0];
        let secondaryFirstOption = Object.keys(elementTypeList[primaryFirstOption].subtype)[0];
        let labelText = elementTypeList[primaryFirstOption].subtype[secondaryFirstOption].labelText;
        
        this.state = {
            elementDropdown: '',
            activeElementType: elementType,
            activePrimaryOption: primaryFirstOption,
            activeSecondaryOption: secondaryFirstOption,
            activeLabelText: labelText,
            attrInput: ""
        };
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if(Object.keys(nextProps.activeElement).length > 0) {
            return {
                activeElementType: nextProps.activeElement.elementType,
                activePrimaryOption: nextProps.activeElement.primaryOption,
                activeSecondaryOption: nextProps.activeElement.secondaryOption,
                activeLabelText: nextProps.activeElement.tag
            };
        }

        return null;
    }

    handlePrimaryOptionChange = e => {
        let value = e.target.getAttribute('data-value');
        let secondaryelementList = elementList[this.state.activeElementType][value].subtype;
        let secondaryFirstOption = Object.keys(secondaryelementList)[0];
        let labelText = secondaryelementList[secondaryFirstOption].labelText;

        this.setState({
            elementDropdown: '',
            activePrimaryOption: value,
            activeSecondaryOption: secondaryFirstOption,
            activeLabelText: labelText
        });

        if(this.props.activeElement.elementId !== '') {
            this.props.updateElement({
                elementId: this.props.activeElement.elementId,
                elementType: this.state.activeElementType,
                primaryOption: value,
                secondaryOption: secondaryFirstOption,
                labelText,
                toolbar: elementList[this.state.activeElementType][value].toolbar
            });
        }
    }

    toggleElementDropdown = e => {
        if(this.state.activePrimaryOption == "primary-openerelement"){
            e.stopPropagation()
            return false
        }
        let elementDropdown = e.target.getAttribute('data-element');
        if(this.state.elementDropdown === elementDropdown) {
            elementDropdown = '';
        }
        this.setState({
            elementDropdown
        });
    }

    primaryOption = () => {
        let primaryOptions = '';
        if(this.state.activeElementType){
            let primaryOptionObject = elementList[this.state.activeElementType];
            let primaryOptionList = Object.keys(primaryOptionObject);
            if(primaryOptionList.length > 0) {
                primaryOptions = primaryOptionList.map(item => {
                    if(item !== 'enumType') {
                        return <li key={item} data-value={item} onClick={this.handlePrimaryOptionChange}>
                            {primaryOptionObject[item].text}
                        </li>;
                    }
                });
    
                let active = '';
                if(this.state.elementDropdown === 'primary') {
                    active = 'active';
                }
    
                primaryOptions = <div
                    className="element-dropdown">
                    <div className="element-dropdown-title" data-element="primary" onClick={this.toggleElementDropdown}>
                        {primaryOptionObject[this.state.activePrimaryOption].text}
                        {dropdownArrow}
                    </div>
                    <ul className={`element-dropdown-content primary-options ${active}`}>
                        {primaryOptions}
                    </ul>
                </div>;
            }
    
            return primaryOptions;
        } 
        else if( this.props.activeElement.elementWipType == "element-learningobjectivemapping"){
           primaryOptions = <div className="learning-obejective-text"><b>Metadata Anchor</b>
            <div className="element-dropdown">
                <div className="element-dropdown-title" data-element="primary">Learning Objective<svg className="dropdown-arrow" viewBox="0 0 9 4.5"><path d="M0,0,4.5,4.5,9,0Z"></path></svg></div>
                </div>
            </div>
          
           return primaryOptions;
        }
        else if(this.props.activeElement.elementWipType == "element-generateLOlist"){
            primaryOptions = <div className="panel_show_module">
                    <div className="learning-obejective-text"><b>Metadata Anchor</b></div>
                        <p>Show Module Name</p>
                        <label className="switch"><input type="checkbox" onClick={this.showModuleName} checked={this.props.showModule? true : false} /><span className="slider round"></span></label>
                        </div>;
            return primaryOptions;
        }
        
    }

    handleSecondaryOptionChange = e => {
        let value = e.target.getAttribute('data-value');
        let elementTypeList = elementList[this.state.activeElementType];
        let labelText = elementTypeList[this.state.activePrimaryOption].subtype[value].labelText;
        this.setState({
            elementDropdown: '',
            activeSecondaryOption: value,
            activeLabelText: labelText
        });

        if(this.props.activeElement.elementId !== '') {
            this.props.updateElement({
                elementId: this.props.activeElement.elementId,
                elementType: this.state.activeElementType,
                primaryOption: this.state.activePrimaryOption,
                secondaryOption: value,
                labelText,
                toolbar: elementList[this.state.activeElementType][this.state.activePrimaryOption].toolbar
            });
        }
    }

    secondaryOption = () => {
        let secondaryOptions = '';
        if(this.state.activeElementType){
            let primaryOptionObject = elementList[this.state.activeElementType];
            let secondaryOptionObject = primaryOptionObject[this.state.activePrimaryOption].subtype;
            let secondaryOptionList = Object.keys(secondaryOptionObject);
            if(secondaryOptionList.length > 1) {
                secondaryOptions = secondaryOptionList.map(item => {
                    return <li key={item} data-value={item} onClick={this.handleSecondaryOptionChange}>
                        {secondaryOptionObject[item].text}
                    </li>;
                });
    
                let display = '';
                if(!(secondaryOptionList.length > 1)) {
                    display = 'hidden';
                }
    
                let active = '';
                if(this.state.elementDropdown === 'secondary') {
                    active = 'active';
                }
    
                secondaryOptions = <div
                    className={`element-dropdown ${display}`}>
                    <div className="element-dropdown-title" data-element="secondary" onClick={this.toggleElementDropdown}>
                        {secondaryOptionObject[this.state.activeSecondaryOption].text}
                        {dropdownArrow}
                    </div>
                    <ul className={`element-dropdown-content secondary-options ${active}`}>
                        {secondaryOptions}
                    </ul>
                </div>;
            }
    
            return secondaryOptions;
        }
        
    }

    handleAttrChange = (event) => {
        this.setState({
            attrInput: event.target.value
        })
        let activeElement = document.querySelector(`[data-id="${this.props.activeElement.elementId}"]`)
        let attrNode = activeElement.querySelector(".blockquoteTextCredit")
        attrNode.innerHTML = event.target.value
    }
    
    attributions = () => {
        let attributions = '';
        let attributionsObject = {};
        let attributionsList = [];
        if(this.state.activeElementType){
            let primaryOptionList = elementList[this.state.activeElementType][this.state.activePrimaryOption];
            let secondaryOptionList = primaryOptionList.subtype[this.state.activeSecondaryOption];
            if(primaryOptionList.attributes) {
                attributionsObject = primaryOptionList.attributes;
                attributionsList = Object.keys(attributionsObject);
            } else if(secondaryOptionList.attributes) {
                attributionsObject = secondaryOptionList.attributes;
                attributionsList = Object.keys(attributionsObject);
            }
    
            if(attributionsList.length > 0) {
                let activeElement = document.querySelector(`[data-id="${this.props.activeElement.elementId}"]`)
                let attrNode = activeElement && activeElement!=null ? activeElement.querySelector(".blockquoteTextCredit") : null
                let attrValue = attrNode && attrNode.innerHTML!=null ? attrNode.innerHTML.replace(/<br>/g, "") : ""
    
                attributions = attributionsList.map(item => {
                    return <div key={item} data-attribution={attributionsObject[item].text}>
                        <div>{attributionsObject[item].text}</div>
                        <textarea className="attribution-editor" disabled={!attributionsObject[item].isEditable} name={item} value={attrValue} onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.handleAttrChange}></textarea>
                    </div>
                });
    
                attributions = <div className="attributions">
                    {attributions}
                </div>;
            }
    
            return attributions;
        }  
    }

    onFocus=()=>{
        document.querySelector('div#tinymceToolbar').classList.add('toolbar-disabled')
    }

    onBlur=()=>{
        document.querySelector('div#tinymceToolbar').classList.remove('toolbar-disabled')
    }

    
    showModuleName = (e) => {
        this.props.setCurrentModule(e.currentTarget.checked);
        let els = document.getElementsByClassName('moduleContainer');
        let i = 0;
        if (e.currentTarget.checked == false) {
            while (i < els.length) {
                let children = els[i].querySelectorAll('.moduleContainer .learningObjectiveData');
                if (children.length > 0) {
                    els[i].classList.remove('showmodule');
                }
                i++;
            }
        }
        else {
            while (i < els.length) {
                let children = els[i].querySelectorAll('.moduleContainer .learningObjectiveData');
                if (children.length > 0) {
                    els[i].classList.add('showmodule');
                }
                i++;
            }
        }

    }
    render = () => {
        return (
            <div className="canvas-sidebar">
                <div className="canvas-sidebar-heading">Settings</div>
                {this.primaryOption()}
                {this.secondaryOption()}
                {this.attributions()}
            </div>
        );
    }
}

Sidebar.defaultProps = {
    elementType: "element-authoredtext"
}

Sidebar.propTypes = {
    /** Active Element Type */
    elementType : PropTypes.string,
}

const mapStateToProps = state => {
    return {
        activeElement: state.appStore.activeElement,
        showModule:state.metadataReducer.showModule
    };
};

export default connect(
    mapStateToProps, 
    {
        updateElement,
        setCurrentModule
    }
)(Sidebar);