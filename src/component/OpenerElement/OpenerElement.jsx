import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { labelOptions } from './LabelOptions'

import '../../styles/OpenerElement/OpenerElement.css'

export class OpenerElement extends Component {

    constructor(props){
        super(props)

        this.state = {
            label: "zxzxzxz",
            number: "",
            title: "",
            showLabelDropdown: false
        }
    }

    handleOpenerLabelChange = e => {
        console.log("target>>>",e.target.innerHTML)
        this.setState({
            label: e.target.innerHTML
        })
        this.toggleLabelDropdown()
    }
    
    toggleLabelDropdown = () => {
        this.setState({
            showLabelDropdown: !this.state.showLabelDropdown
        })
    }

    renderLabelDropdown = () => {
        const { showLabelDropdown } = this.state
        const openerLabelOptions = labelOptions.map((value, index) => {
            return <li key={index} data-value={value} onClick={this.handleOpenerLabelChange}>{value}</li>
        })
        if(showLabelDropdown){
            return (
                <ul className="element-dropdown-content">
                    {openerLabelOptions}
                </ul>
            )
        }
        else{
            return null
        }
    }
    
    
    render() {
        /* const openerLabelOptions = labelOptions.map((value, index) => {
            return <li key={index} data-value={value} onClick={this.handleOpenerLabelChange}>{value}</li>
        }) */
        return (
            <div className = "opener-element-container">
                <div className = "input-box-container">
                    <div>
                        <span>Label</span>
                        <div className="element-dropdown-title" onClick={this.toggleLabelDropdown}>{this.state.label}</div>
                        {this.renderLabelDropdown()}
                    </div>
                    <div>
                        <span>Number</span>
                        <input type="text"/>
                    </div>
                    <div>
                        <span>Title</span>
                        <input type="text"/>
                    </div>
                </div>
                <figure>
                    
                </figure>
            </div>
        )
    }
}

export default OpenerElement
