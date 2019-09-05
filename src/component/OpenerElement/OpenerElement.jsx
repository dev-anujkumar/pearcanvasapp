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
    
    handleOpenerNumberChange = e => {
        this.setState({
            number: e.target.value
        })
    }
    handleOpenerTitleChange = e => {
        this.setState({
            title: e.target.value            
        })
    }
    
    render() {
        /* const openerLabelOptions = labelOptions.map((value, index) => {
            return <li key={index} data-value={value} onClick={this.handleOpenerLabelChange}>{value}</li>
        }) */
        return (
            <div className = "opener-element-container">
                <div className = "input-box-container">
                    <div className="opener-label-box">
                        <div className="opener-label-text">Label</div>
                        <div className="element-dropdown-title" onClick={this.toggleLabelDropdown}>{this.state.label}</div>
                        {this.renderLabelDropdown()}
                    </div>
                    <div className="opener-label-box">
                        <div className="opener-number-text">Number</div>
                        <input className="element-dropdown-title" value={this.state.number} type="text" onChange={this.handleOpenerNumberChange} />
                    </div>
                    <div className="opener-label-box">
                        <div className="opener-title-text">Title</div>
                        <input className="element-dropdown-title" value={this.state.title} type="text" onChange={this.handleOpenerTitleChange} />
                    </div>
                </div>
                <figure className="pearson-component image figureData">
                    <img src="https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png"
                        // data-src={model.figuredata.path !== "" ? model.figuredata.path : "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png"}
                        title=""
                        alt=""
                        draggable="false" 
                    />
                </figure>
            </div>
        )
    }
}

export default OpenerElement
