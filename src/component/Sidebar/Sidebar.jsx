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
            activeElementType: this.props.elementType,
            activePrimaryOption: primaryFirstOption,
            activeSecondaryOption: secondaryFirstOption
        };
    }

    handlePrimaryOptionChange = e => {
        let secondaryelementList = elementList[this.state.activeElementType][e.target.value].subtype;
        let secondaryFirstOption = Object.keys(secondaryelementList)[0];

        this.setState({
            activePrimaryOption: e.target.value,
            activeSecondaryOption: secondaryFirstOption
        });
    }

    primaryOption = () => {
        let primaryOptions = '';
        let primaryOptionList = Object.keys(elementList[this.state.activeElementType]);
        if(primaryOptionList.length > 0) {
            primaryOptions = primaryOptionList.map(item => {
                return <option value={item}>
                    {elementList[this.state.activeElementType][item].text}
                </option>;
            });

            primaryOptions = <select 
                className="primary-option" 
                value={this.state.activePrimaryOption} 
                onChange={this.handlePrimaryOptionChange}>
                {primaryOptions}
            </select>;
        }

        return primaryOptions;
    }

    handleSecondaryOptionChange = e => {
        this.setState({
            activeSecondaryOption: e.target.value
        });
    }

    secondaryOption = () => {
        let secondaryOptions = '';
        let secondaryOptionList = Object.keys(elementList[this.state.activeElementType][this.state.activePrimaryOption].subtype);
        if(secondaryOptionList.length > 0) {
            secondaryOptions = secondaryOptionList.map(item => {
                return <option value={item}>
                    {elementList[this.state.activeElementType][this.state.activePrimaryOption].subtype[item].text}
                </option>;
            });

            let display = '';
            if(!(secondaryOptionList.length > 1)) {
                display = 'hidden';
            }

            secondaryOptions = <select 
                className={`secondary-option ${display}`}
                value={this.state.activeSecondaryOption}
                onChange={this.handleSecondaryOptionChange}>
                {secondaryOptions}
            </select>;
        }

        return secondaryOptions;
    } 

    render = () => {console.log('state::', this.state)
        return (
            <div className="canvas-sidebar">
                <div className="canvas-sidebar-heading">Settings</div>
                {this.primaryOption()}
                {this.secondaryOption()}
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