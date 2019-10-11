

// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'


// IMPORT - Assets //
import './../../styles/AssessmentSlateCanvas/AssessmentSlateCanvas.css';
import { assessmentUsageType, assessmentType } from './AssessmentSlateConstants.js';
import LearningTool from './learningTool/learningTool.jsx';
export class AssessmentSlateData extends Component {
    constructor(props) {
        super(props);
        this.state = {

            activeAssessmentType: 'Select',
            activeAssessmentUsageType: props.model && props.elementdata ? props.elementdata.usagetype : "Quiz",


        }

        this.usageTypeDropdownRef = React.createRef();
        this.typeDropdownRef = React.createRef();


    }

    toggleAssessmentTypeDropdown = () => {
        this.typeDropdownRef.current.classList.remove('notselect')
    }
    handleAssessmentTypeChange = (type, e) => {
        this.setState({
            activeAssessmentType: type,
        });
        this.typeDropdownRef.current.classList.add('notselect')
    }
    selectAssessmentType = () => {
        if (assessmentType.length > 0) {
            var assessmentTypeValue = assessmentType.map((type, i) =>
                <li key={i} className="slate_assessment_dropdown_name" onClick={(e) => this.handleAssessmentTypeChange(type, e)}>{type}</li>
            )
        }
        return assessmentTypeValue
    }
    // assessmentSlateDefaultContent=()=>{
    //     return (
    //         <div className="slate_initial_selection">
    //             <div className="slate_assessment_type_label">Please select an assessment type.</div>
    //             <div className="slate_assessment_type_dropdown activeDropdown" onClick={this.toggleAssessmentTypeDropdown}>
    //                 <span className="slate_assessment_dropdown_label">{this.state.activeAssessmentType}</span>
    //                 <span className="slate_assessment_dropdown_image"></span>
    //                 <div className="clr"></div>
    //             </div>
    //             {
    //                 <ul className="slate_assessment_type_dropdown_options notselect" ref={this.typeDropdownRef}>
    //                     {this.selectAssessmentType()}
    //                 </ul>
    //             }
    //             {
    //                 this.state.activeAssessmentType!='Select'?
    //                 (<div className="slate_assessment_type_button">Add assessment</div>):(<div className="slate_assessment_disabled_button">Add assessment</div>)
    //             }
    //             <div className="clr"></div>
    //         </div>
    //     )
    // }
    toggleUsageTypeDropdown = () => {
        this.usageTypeDropdownRef.current.classList.remove('notselect')
    }
    handleAssessmentUsageTypeChange = (usageType, e) => {
        this.setState({

            activeAssessmentUsageType: usageType,
        });
        this.usageTypeDropdownRef.current.classList.add('notselect')
    }
    selectAssessmentUsageType = () => {
        if (assessmentUsageType.length > 0) {
            var usageTypeValue = assessmentUsageType.map((usageType, i) =>
                <li key={i} className="slate_assessment_metadata_dropdown_name" onClick={(e) => this.handleAssessmentUsageTypeChange(usageType, e)}>{usageType}</li>
            )
        }
        return usageTypeValue
    }
    // assessmentUsageTypeContent=()=>{

    //     return (
    //         <div className="slate_fetch_canvas">
    //             <div className="slate_assessment_data_container">
    //                 <div className="slate_assessment_data_content">
    //                     <div className="slate_assessment_data_label">Assessment</div>
    //                     <div className="slate_assessment_data_details">
    //                         <div className="slate_assessment_data_title"></div>
    //                         <div className="slate_assessment_data_id"></div>
    //                         <div className="slate_assessment_change_button">Change assessment</div>
    //                     </div>
    //                     <div className="clr"></div>
    //                 </div>  
    //             </div>
    //             <div className="slate_assessment_metadata_container">
    //                 <div className="slate_assessment_metadata_type_selectlabel">Select usage type</div>
    //                     <div className="singleAssessment_Dropdown_activeDropdown" onClick={this.toggleUsageTypeDropdown} >
    //                     <span className="slate_assessment_metadata_dropdown_label">{this.state.activeAssessmentUsageType}</span>
    //                     <span className="slate_assessment_metadata_dropdown_image"></span>
    //                     <div className="clr"></div>
    //                 </div>
    //                 <div className="clr"></div>
    //             </div>
    //             {
    //                 <ul className="slate_assessment_metadata_type_dropdown_options notselect" ref={this.usageTypeDropdownRef}>
    //                     {this.selectAssessmentUsageType()}
    //                 </ul>
    //             }
    //             <div className="clr"></div>
    //         </div>
    //     )
    // }
    assessmentSlateContent = (type) => {
        var assessmentSlateJSX;
        if (type === 'assessment'&& this.state.activeAssessmentType !== 'Learning App Type') {
            assessmentSlateJSX = <div className="slate_fetch_canvas">
                <div className="slate_assessment_data_container">
                    <div className="slate_assessment_data_content">
                        <div className="slate_assessment_data_label">Assessment</div>
                        <div className="slate_assessment_data_details">
                            <div className="slate_assessment_data_title"></div>
                            <div className="slate_assessment_data_id"></div>
                            <div className="slate_assessment_change_button">Change assessment</div>
                        </div>
                        <div className="clr"></div>
                    </div>
                </div>
                <div className="slate_assessment_metadata_container">
                    <div className="slate_assessment_metadata_type_selectlabel">Select usage type</div>
                    <div className="singleAssessment_Dropdown_activeDropdown" onClick={this.toggleUsageTypeDropdown} >
                        <span className="slate_assessment_metadata_dropdown_label">{this.state.activeAssessmentUsageType}</span>
                        <span className="slate_assessment_metadata_dropdown_image"></span>
                        <div className="clr"></div>
                    </div>
                    <div className="clr"></div>
                </div>
                {
                    <ul className="slate_assessment_metadata_type_dropdown_options notselect" ref={this.usageTypeDropdownRef}>
                        {this.selectAssessmentUsageType()}
                    </ul>
                }
                <div className="clr"></div>
            </div>
        } else if (type === 'learning') {
            assessmentSlateJSX = <div className="slate_fetch_canvas">
                <div className="slate_assessment_data_container">
                    <div className="slate_assessment_data_content">
                        <div className="slate_assessment_data_label">Learning App</div>
                        <div className="slate_assessment_data_details">
                            <div className="slate_assessment_data_title"></div>
                            <div className="slate_assessment_data_id"></div>
                            <div className="slate_assessment_change_button">Change Learning App</div>
                        </div>
                        <div className="clr"></div>
                    </div>
                </div>
                <div className="slate_assessment_metadata_container">
                    <div className="slate_assessment_metadata_type_selectlabel">Select usage type</div>
                    <div className="singleAssessment_Dropdown_activeDropdown" onClick={this.toggleUsageTypeDropdown} >
                        <span className="slate_assessment_metadata_dropdown_label">{this.state.activeAssessmentUsageType}</span>
                        <span className="slate_assessment_metadata_dropdown_image"></span>
                        <div className="clr"></div>
                    </div>
                    <div className="clr"></div>
                </div>
                {
                    <ul className="slate_assessment_metadata_type_dropdown_options notselect" ref={this.usageTypeDropdownRef}>
                        {this.selectAssessmentUsageType()}
                    </ul>
                }
                <div className="clr"></div>
            </div>
        } else if (type === 'learning_tool'&& this.state.activeAssessmentType === 'Learning App Type') {
            return (
                <div>
                    <LearningTool />
                </div>
            )
        } else if (type === 'assessment1' ) {
            assessmentSlateJSX = <div className="slate_popup_get_selection">
                <div className="slate_popup_get_image lazyload"></div>
                <div className="slate_popup_get_title">{"'" + this.state.slateAssessmentTitle + "'"}</div>
                <div className="slate_popup_get_added">Successfully added</div>
                <div className="clr"></div>
            </div>
        } else {
            assessmentSlateJSX = <div className="slate_initial_selection">
                <div className="slate_assessment_type_label">Please select an assessment type.</div>
                <div className="slate_assessment_type_dropdown activeDropdown" onClick={this.toggleAssessmentTypeDropdown}>
                    <span className="slate_assessment_dropdown_label">{this.state.activeAssessmentType}</span>
                    <span className="slate_assessment_dropdown_image"></span>
                    <div className="clr"></div>
                </div>
                {
                    <ul className="slate_assessment_type_dropdown_options notselect" ref={this.typeDropdownRef}>
                        {this.selectAssessmentType()}
                    </ul>
                }
                {
                    this.state.activeAssessmentType != 'Select' ?
                        (<div className="slate_assessment_type_button">Add assessment</div>) : (<div className="slate_assessment_disabled_button">Add assessment</div>)
                }
                <div className="clr"></div>
            </div>
        }
        return assessmentSlateJSX
    }
    render() {
        const { type } = this.props;
        return (
            <div>
                {this.assessmentSlateContent(type)}
            </div>
        );
    }
}
