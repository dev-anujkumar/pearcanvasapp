// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// IMPORT - Assets //
import './../../styles/AssessmentSlateCanvas/AssessmentSlateCanvas.css';
import { assessmentUsageType, assessmentType } from './AssessmentSlateConstants.js';
import RootElmComponent from './elm/RootElmComponent.jsx';
export class AssessmentSlateData extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
            activeAssessmentType: 'Select',
            activeAssessmentUsageType: props.model && props.elementdata && props.elementdata.usagetype ? props.elementdata.usagetype : "Quiz",
            showElmComponent:false,
           
        }

        this.usageTypeDropdownRef = React.createRef();
        this.typeDropdownRef = React.createRef();
        this.usageTypeRef = React.createRef();

    }
    closeElmWindow(){
        this.setState({
            showElmComponent:false
           });
           hideTocBlocker();
           disableHeader(false);
     }
    /*** @description - This function is to handle change in assessment/LT-LA
     * @param e- event triggered
    */
    changeAssessment = (e) => {
        let assessmentFormat = this.state.activeAssessmentType;
        if (assessmentFormat == 'Full Assessment PUF') {
            this.setState({
                activeAssessmentType: 'Full Assessment PUF',
                showElmComponent: true,
            }, () => {
                this.mainAddAssessment(e, 'Full Assessment PUF');
            })
        } else if (assessmentFormat === "learningtemplate") {
            // this.changeLearningApp(); //will be used later
        } else {
            this.addC2MediaAssessment(this.state.activeAssessmentType);
        }
    }

     /*** @description - This is the function to add C2-Media to Assessment Slate 
      * @param activeAssessmentType - assessment -type 
     */
    addC2MediaAssessment=(activeAssessmentType)=>{
        this.props.toggleAssessmentPopup(true);
        this.props.selectAssessmentType(activeAssessmentType);         
      
    }
    addPufAssessment = (pufObj) =>{
        this.props.addPufAssessment(pufObj);
    }
    /*** @description - This is the root function to add Assessment 
     * @param activeAssessmentType - assessment -type 
    */
    mainAddAssessment = (e, activeAssessmentType) => {
        switch(activeAssessmentType){
            case 'Learning App Type':
                return this.changeLearningApp()
    
            case 'Full Assessment PUF':
                this.setState({
                    showElmComponent : true
                })
                // showTocBlocker();    //will be used during elm integration
                // disableHeader(true);               
                break;
    
            default:
                return this.addC2MediaAssessment(activeAssessmentType)
    
        }
     }

    /*** @description - This function is to toggle the Assessment Type PopUp*/
    toggleAssessmentTypeDropdown = () => {
        this.typeDropdownRef.current.classList.remove('notselect')
    }
    /*** @description - This function is to handle the Assessment type change
     * @param type - the type of assessment selected from the dropdown
     * @param e - event triggered 
    */
    handleAssessmentTypeChange = (type, e) => {
        this.setState({
            activeAssessmentType: type,
        });
        this.typeDropdownRef.current.classList.add('notselect')
    }
    /*** @description - This function is to select the Assessment type from dropdown*/
    selectAssessmentType = () => {
        if (assessmentType.length > 0) {
            var assessmentTypeValue = assessmentType.map((type, i) =>
                <li key={i} className="slate_assessment_dropdown_name" onClick={(e) => this.handleAssessmentTypeChange(type, e)}>{type}</li>
            )
        }
        return assessmentTypeValue
    }
     /*** @description - This function is to toggle the Assessment Usage-Type PopUp*/
    toggleUsageTypeDropdown = () => {
        this.usageTypeDropdownRef.current.classList.remove('notselect')
        this.usageTypeRef.current.classList.remove('notselect')
    }
    /*** @description - This function is to handle the Assessment Usage-type change
     * @param usageType - the usage-type selected from the dropdown
     * @param e - event triggered 
    */
    handleAssessmentUsageTypeChange = (usageType, e) => {
        this.setState({

            activeAssessmentUsageType: usageType,
        });
        this.usageTypeDropdownRef.current.classList.add('notselect')
        this.usageTypeRef.current.classList.add('notselect')
        
    }
    /*** @description - This function is to select the Assessment usage-type from dropdown*/
    selectAssessmentUsageType = () => {
        if (assessmentUsageType.length > 0) {
            var usageTypeValue = assessmentUsageType.map((usageType, i) =>
                <li key={i} className="slate_assessment_metadata_dropdown_name" onClick={(e) => this.handleAssessmentUsageTypeChange(usageType, e)}>{usageType}</li>
            )
        }
        return usageTypeValue
    }  
    /*** @description - This function is render the Assessment Slate Element*/
    assessmentSlateContent = () => {
        var assessmentSlateJSX;
        var assessmentTypeValue;
        var changeTypeValue;
        if(this.state.activeAssessmentType === 'Learning App Type'){
            assessmentTypeValue="Learning App";
            changeTypeValue="Change Learning App"
        }else {
            assessmentTypeValue="Assessment";
            changeTypeValue="Change assessment";
        }
        if(this.state.activeAssessmentType === 'Full Assessment PUF' && this.state.showElmComponent === true){
            return <RootElmComponent closeElmWindow = {()=>this.closeElmWindow()} addPufFunction = {this.addPufAssessment}  openedFrom = {'slateAssessment'} usageTypeMetadata = {this.state.activeAssessmentUsageType}/>
        }
        if (this.props.getAssessmentData && this.props.getAssessmentDataPopup===false ) {
            assessmentSlateJSX = <div className="slate_fetch_canvas">
                <div className="slate_assessment_data_container">
                    <div className="slate_assessment_data_content">
                        <div className="slate_assessment_data_label">{assessmentTypeValue}</div>
                        <div className="slate_assessment_data_details">
                        <div className="slate_assessment_data_title">{this.props.assessmentItemTitle}</div>
                                <div className="slate_assessment_data_id">{'ID: '+ this.props.assessmentId}</div>
                            <div className="slate_assessment_change_button" onClick={this.changeAssessment}>{changeTypeValue}</div>
                        </div>
                        <div className="clr"></div>
                    </div>
                </div>
                <div className="slate_assessment_metadata_container">
                    <div className="slate_assessment_metadata_type_selectlabel">Select usage type</div>
                    <div className="singleAssessment_Dropdown_activeDropdown notselect" ref={this.usageTypeRef} onClick={this.toggleUsageTypeDropdown} >
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
        } 
        //WILL BE USED LATER FOR LT-LA INTEGRATION
        //   else if (this.state.activeAssessmentType=== 'learning_tool'&& this.state.activeAssessmentType === 'Learning App Type') {
        //     return (
        //         <div>
        //             {/* <LearningTool /> */}
        //         </div>
        //     )
        // } 
        else if (this.props.getAssessmentData && this.props.getAssessmentDataPopup ==  true ) {
            assessmentSlateJSX = <div className="slate_popup_get_selection">
                <div className="slate_popup_get_image lazyload"></div>
                <div className="slate_popup_get_title">{"'" + this.props.assessmentItemTitle + "'"}</div>
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
                        (<div className="slate_assessment_type_button" onClick={(e) => this.mainAddAssessment(e, this.state.activeAssessmentType)}>Add assessment</div>) : (<div className="slate_assessment_disabled_button" >Add assessment</div>)
                }
                <div className="clr"></div>
            </div>
        }
        return assessmentSlateJSX
    }
    render() {
        const { type } = this.props;
        return (
            <div className="AssessmentSlateCanvas">
                {this.assessmentSlateContent()}
            </div>
        );
    }
}
AssessmentSlateData.displayName = "AssessmentSlateData"