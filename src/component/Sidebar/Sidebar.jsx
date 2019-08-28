import React, { Component } from 'react';
import PropTypes from 'prop-types';

import elementList from './elementTypes.js';
import './../../styles/Sidebar/Sidebar.css';

class Sidebar extends Component {
    constructor(props) {
        super(props);

        let elementTypeList = elementList[this.props.elementType];
        let primaryFirstOption = Object.keys(elementTypeList)[0];
        let secondaryFirstOption = Object.keys(elementTypeList[primaryFirstOption].subtype)[0];
        this.state = {
            elementDropdown: '',
            activeElementType: this.props.elementType,
            activePrimaryOption: primaryFirstOption,
            activeSecondaryOption: secondaryFirstOption
        };
    }

    handlePrimaryOptionChange = e => {
        let value = e.target.getAttribute('data-value');
        let secondaryelementList = elementList[this.state.activeElementType][value].subtype;
        let secondaryFirstOption = Object.keys(secondaryelementList)[0];

        this.setState({
            elementDropdown: '',
            activePrimaryOption: value,
            activeSecondaryOption: secondaryFirstOption
        });
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
                </div>
                <ul className={`element-dropdown-content primary-options ${active}`}>
                    {primaryOptions}
                </ul>
            </div>;
        }

        return primaryOptions;
    }

    handleSecondaryOptionChange = e => {
        this.setState({
            elementDropdown: '',
            activeSecondaryOption: e.target.getAttribute('data-value')
        });
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
        let primaryOptionList = elementList[this.state.activeElementType][this.state.activePrimaryOption];
        if(primaryOptionList.attributes) {
            let attributionsList = Object.keys(primaryOptionList.attributes);
            if(attributionsList.length > 0) {
                attributions = attributionsList.map(item => {
                    return <div data-attribution={primaryOptionList.attributes[item].text}>
                        <div>{primaryOptionList.attributes[item].text}</div>
                        <textarea className="attribution-editor" name={item}></textarea>
                    </div>
                });

                attributions = <div className="attributions">
                    {attributions}
                </div>;
            }
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
    elementType : PropTypes.object,
}

export default Sidebar;