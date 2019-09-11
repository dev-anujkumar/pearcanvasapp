import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import elementList from './elementTypes.js';
import { dropdownArrow } from './../../images/ElementButtons/ElementButtons.jsx';
import { updateElement } from './Sidebar_Action';
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
            activeLabelText: labelText
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
                slateId: this.props.slateId,
                elementId: this.props.activeElement.elementId,
                primaryOption: value,
                secondaryOption: secondaryFirstOption,
                labelText
            });
        }
    }

    toggleElementDropdown = e => {
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
        let primaryOptionObject = elementList[this.state.activeElementType];
        let primaryOptionList = Object.keys(primaryOptionObject);
        if(primaryOptionList.length > 0) {
            primaryOptions = primaryOptionList.map(item => {
                return <li key={item} data-value={item} onClick={this.handlePrimaryOptionChange}>
                    {primaryOptionObject[item].text}
                </li>;
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
                slateId: this.props.slateId,
                elementId: this.props.activeElement.elementId,
                primaryOption: this.state.activePrimaryOption,
                secondaryOption: value,
                labelText
            });
        }
    }

    secondaryOption = () => {
        let secondaryOptions = '';
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

    attributions = () => {
        let attributions = '';
        let attributionsObject = {};
        let attributionsList = [];
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
            attributions = attributionsList.map(item => {
                return <div key={item} data-attribution={attributionsObject[item].text}>
                    <div>{attributionsObject[item].text}</div>
                    <textarea className="attribution-editor" name={item}></textarea>
                </div>
            });

            attributions = <div className="attributions">
                {attributions}
            </div>;
        }

        return attributions;
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
        // activeElementType: state.appStore.activeElement.elementType
    };
};

export default connect(
    mapStateToProps, 
    {
        updateElement
    }
)(Sidebar);