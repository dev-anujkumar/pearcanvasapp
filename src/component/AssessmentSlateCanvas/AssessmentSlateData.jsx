// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// IMPORT - Assets //
import './../../styles/AssessmentSlateCanvas/AssessmentSlateCanvas.css';
import { showTocBlocker, hideTocBlocker, disableHeader } from '../../js/toggleLoader';
import { assessmentUsageType, assessmentType, FULL_ASSESSMENT_PUF, LEARNING_APP_TYPE, LEARNOSITY, LEARNING_TEMPLATE, FULL_ASSESSMENT_TDX, FULL_ASSESSMENT_CITE } from './AssessmentSlateConstants.js';
import RootElmComponent from './elm/RootElmComponent.jsx';
import LearningTool from './learningTool/learningTool.jsx';
import { sendDataToIframe } from '../../../src/constants/utility.js';
export class AssessmentSlateData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeAssessmentType: 'Select',
            activeAssessmentUsageType: this.props.model && this.props.model.elementdata && this.props.model.elementdata.usagetype ? this.props.model.elementdata.usagetype : "Quiz",
            showElmComponent: false,
            changeLearningData: false,
            learningToolStatus: ''
        }
        this.usageTypeDropdownRef = React.createRef();
        this.typeDropdownRef = React.createRef();
        this.usageTypeRef = React.createRef();

    }

componentDidMount(){
    if(this.props.model && this.props.model.elementdata && this.props.model.elementdata.assessmentid){
        this.setState({
            activeAssessmentType :this.props.model && this.props.model.elementdata && this.props.model.elementdata.assessmentformat ? this.props.model.elementdata.assessmentformat : "Quiz",
        })
    }    
}
    /*** @description - This function is to link learning app*/
    linkLearningApp = (selectedLearningType) =>{
        console.log(selectedLearningType);
        this.props.updateAssessment(selectedLearningType.learningtemplateUrn,"",selectedLearningType.label.en,LEARNING_TEMPLATE,this.state.activeAssessmentUsageType,this.state.learningToolStatus,selectedLearningType.learningsystem,selectedLearningType.templateid,selectedLearningType.type);
        this.props.closeLtAction();
    }

    /*** @description - This function is to close ELM PopUp
    */
    closeElmWindow = () => {
        this.setState({
            showElmComponent: false
        });
        hideTocBlocker();
        disableHeader(false);
        this.props.showBlocker(false);
    }
    
    /*** @description - This function is to change the lerning system
    */
    changeLearningApp(usageType, change) {
        //Call this function to set value of "toggleLT" for conditional based rendering of Learning App Component//
        this.props.openLTFunction(); 
        this.props.openLtAction();
        this.setState({
            dropdownValue: LEARNING_APP_TYPE,
            changeLearningData: true,
            learningToolStatus: change
        });
}

    /*** @description - This function is to handle change in assessment/LT-LA
     * @param e- event triggered
    */
    changeAssessment = (e) => {
        let assessmentFormat = this.state.activeAssessmentType;
        if (assessmentFormat == FULL_ASSESSMENT_PUF) {
            this.setState({
                activeAssessmentType: FULL_ASSESSMENT_PUF,
                showElmComponent: true,
            }, () => {
                    this.mainAddAssessment(e, FULL_ASSESSMENT_PUF);
                })
        } else if (assessmentFormat == LEARNOSITY) {
            this.setState({
                activeAssessmentType: LEARNOSITY,
                showElmComponent: true,
            }, () => {
                    this.mainAddAssessment(e, LEARNOSITY);
            })
        } else if (assessmentFormat === LEARNING_TEMPLATE) {
            this.changeLearningApp(this.state.activeAssessmentUsageType,'update'); 
              //this.changeLearningApp(); 
        } else {
            this.addC2MediaAssessment(this.state.activeAssessmentType);
        }
    }

    /*** @description - This is the function to add C2-Media to Assessment Slate 
     * @param activeAssessmentType - assessment -type 
    */
    addC2MediaAssessment = (activeAssessmentType) => {
        this.props.toggleAssessmentPopup('',true);
        this.props.selectAssessmentType(activeAssessmentType);

    }

    /* 
    * @description - This function is to close the LT/LA popup 
    */
    closePopUp = () => {
        //  window.parent.postMessage({ 'type': 'blockerTOC', 'message': {status: false} }, WRAPPER_URL);
        this.setState({
            changeLearningData: false
        }, () => {
            // disableHeader(false);
        })
    }
    
    /*** @description - This is the function to add C2-Media to Assessment Slate 
    * @param pufObj - The object contains data about PUF Assessment 
    */
    addPufAssessment = (pufObj) => {
        this.props.addPufAssessment(pufObj);
    }

    /*** @description - This is the root function to add Assessment 
     * @param activeAssessmentType - assessment -type 
    */
    mainAddAssessment = (e, activeAssessmentType) => {
        switch (activeAssessmentType) {
            case LEARNING_APP_TYPE:
                return this.changeLearningApp('Quiz','insert')
                //return this.changeLearningApp()
            case FULL_ASSESSMENT_PUF:
            case LEARNOSITY:
                this.setState({
                    showElmComponent: true
                })
                showTocBlocker();    
                disableHeader(true);
                this.props.showBlocker(true);             
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
        let assessmentTypeValue;
        if (assessmentType.length > 0) {
            assessmentTypeValue = assessmentType.map((type, i) =>
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
        let assessmentType ="";
        this.usageTypeDropdownRef.current.classList.add('notselect')
        this.usageTypeRef.current.classList.add('notselect')
        if(this.state.activeAssessmentType===FULL_ASSESSMENT_CITE){
            assessmentType = 'cite';
        }else if( this.state.activeAssessmentType===FULL_ASSESSMENT_TDX){
            assessmentType = 'tdx';
        }else if(this.state.activeAssessmentType===FULL_ASSESSMENT_PUF){
            assessmentType = 'puf';
        }else if(this.state.activeAssessmentType===LEARNING_APP_TYPE || usageType===LEARNING_TEMPLATE ){
            assessmentType = LEARNING_TEMPLATE;
        }else{
            assessmentType = 'learnosity';
        }
        this.props.updateAssessment(this.props.assessmentId,this.props.assessmentItemId,this.props.assessmentItemTitle,assessmentType,usageType,'update');
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

    /*** @description - This function is to render the Assessment Slate Element*/
    assessmentSlateContent = () => {
        if (document.getElementsByClassName("slate-tag-icon").length) {
        document.getElementsByClassName("slate-tag-icon")[0].classList.remove("disable");
        }
        let assessmentSlateJSX;
        let assessmentTypeValue;
        let changeTypeValue;
        if(this.state.activeAssessmentType === LEARNING_APP_TYPE || this.state.activeAssessmentType === LEARNING_TEMPLATE){
            assessmentTypeValue="Learning App";
            changeTypeValue="Change Learning App"
        }else {
            assessmentTypeValue="Assessment";
            changeTypeValue="Change assessment";
        }
        if ((this.state.activeAssessmentType === FULL_ASSESSMENT_PUF || this.state.activeAssessmentType === LEARNOSITY) && this.state.showElmComponent === true) {
            return <RootElmComponent closeElmWindow = {()=>this.closeElmWindow()} addPufFunction = {this.addPufAssessment}  openedFrom = {'slateAssessment'} usageTypeMetadata = {this.state.activeAssessmentUsageType} assessmentType = {this.state.activeAssessmentType}/>
        }
        if (this.props.getAssessmentData && this.props.getAssessmentDataPopup===false ) {
            assessmentSlateJSX = <div className="slate_fetch_canvas">
                <div className="slate_assessment_data_container">
                    <div className="slate_assessment_data_content">
                        <div className="slate_assessment_data_label">{assessmentTypeValue}</div>
                        <div className="slate_assessment_data_details">
                            <div className="slate_assessment_data_title">{this.props.assessmentItemTitle}</div>
                            <div className="slate_assessment_data_id">{'ID: ' + this.props.assessmentId}</div>
                            <div className="slate_assessment_data_id_lo" style={{display:"none"}}>{this.props.assessmentId}</div>
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
        else if (this.state.changeLearningData && this.state.activeAssessmentType === LEARNING_APP_TYPE) {
            return (
                <div>
                    <LearningTool closePopUp={this.closePopUp} linkLearningApp={this.linkLearningApp} />
                </div>
            )
        } else if (this.props.getAssessmentData && this.props.getAssessmentDataPopup == true) {
            assessmentSlateJSX = <div className="slate_popup_get_selection">
                <div className="slate_popup_get_image lazyload"></div>
                <div className="slate_popup_get_title">{"'" + this.props.assessmentItemTitle + "'"}</div>
                <div className="slate_popup_get_added">Successfully added</div>
                <div className="clr"></div>
            </div>
        } else {
            if (document.getElementsByClassName("slate-tag-icon").length) {
            document.getElementsByClassName("slate-tag-icon")[0].classList.add("disable");
            }
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