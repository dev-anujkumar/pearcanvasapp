// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// IMPORT - Assets //
import config from '../../config/config';
import './../../styles/AssessmentSlateCanvas/AssessmentSlateCanvas.css';
import { showTocBlocker, hideTocBlocker, disableHeader } from '../../js/toggleLoader';
import { assessmentUsageType, assessmentType, FULL_ASSESSMENT_PUF, LEARNING_APP_TYPE, LEARNOSITY, LEARNING_TEMPLATE, FULL_ASSESSMENT_TDX, FULL_ASSESSMENT_CITE } from './AssessmentSlateConstants.js';
import RootElmComponent from './elm/RootElmComponent.jsx';
import LearningTool from './learningTool/learningTool.jsx';
import { sendDataToIframe, hasReviewerRole } from '../../constants/utility.js';
import { ShowLoader , HideLoader} from '../../constants/IFrameMessageTypes.js';
export class AssessmentSlateData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeAssessmentType: this.props.model && this.props.model.elementdata && this.props.model.elementdata.assessmentformat ? this.props.model.elementdata.assessmentformat : 'Select',
            activeAssessmentUsageType: this.props.model && this.props.model.elementdata && this.props.model.elementdata.usagetype ? this.props.model.elementdata.usagetype : "Quiz",
            showElmComponent: false,
            changeLearningData: false,
            learningToolStatus: false
        }
        this.usageTypeDropdownRef = React.createRef();
        this.typeDropdownRef = React.createRef();
        this.usageTypeRef = React.createRef();
        this.typeRef = React.createRef();
    }
    
    componentWillReceiveProps(nextProps){
     if(this.props!==nextProps && this.props.getAssessmentDataPopup !== nextProps.getAssessmentDataPopup){
         this.sendDataAssessment(nextProps);
     }
    }

    sendDataAssessment(nextProps){
        if(config.parentEntityUrn !== "Front Matter" && config.parentEntityUrn !== "Back Matter" && config.slateType =="assessment"){
            let apiKeys = [config.ASSET_POPOVER_ENDPOINT,config.STRUCTURE_APIKEY,config.PRODUCTAPI_ENDPOINT];
            let assessmentId= nextProps.model.elementdata.assessmentid.length>0 ? nextProps.model.elementdata.assessmentid: '' ;
            if(assessmentId!=""){
                sendDataToIframe({ 'type': 'getAssessmentLO', 'message': { projectURN: config.projectUrn, assessmentId, apiKeys} });
            }
            else{
               //set tag to grey here 
               let newMessage = {assessmentResponseMsg:false};
               this.props.isLOExist(newMessage);
            }
            
        }
    }

    componentDidMount() {
        if (this.props.model && this.props.model.elementdata && this.props.model.elementdata.assessmentid) {
            this.sendDataAssessment(this.props);
            this.setState({
                activeAssessmentType: this.props.model && this.props.model.elementdata && this.props.model.elementdata.assessmentformat ? this.props.model.elementdata.assessmentformat : 'Select',
            })
        }
    }

    /*** @description - This function is to link learning app*/
    linkLearningApp = (selectedLearningType) =>{
        sendDataToIframe({'type': ShowLoader,'message': { status: true }});
        this.props.updateAssessment(selectedLearningType.learningtemplateUrn,"",selectedLearningType.label.en,LEARNING_TEMPLATE,this.state.activeAssessmentUsageType,'insert',selectedLearningType.learningsystem,selectedLearningType.templateid,selectedLearningType.type);
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
    changeLearningApp() {
        showTocBlocker();
        disableHeader(true);
        this.props.showBlocker(true);
        //Call this function to set value of "toggleLT" for conditional based rendering of Learning App Component//
        this.props.openLTFunction(); 
        this.props.openLtAction();  
        this.setState({
            activeAssessmentType: LEARNING_TEMPLATE,
            changeLearningData: true,
            learningToolStatus: true
        });         
}

    /*** @description - This function is to handle change in assessment/LT-LA
     * @param e- event triggered
    */
    changeAssessment = (e) => {
        if(hasReviewerRole()){
            return true
        }
        let assessmentFormat = this.state.activeAssessmentType;
        if (assessmentFormat === FULL_ASSESSMENT_PUF) {
            this.setState({
                activeAssessmentType: FULL_ASSESSMENT_PUF,
                showElmComponent: true,
            }, () => {
                    this.mainAddAssessment(e, FULL_ASSESSMENT_PUF);
                })
        } else if (assessmentFormat === LEARNOSITY) {
            this.setState({
                activeAssessmentType: LEARNOSITY,
                showElmComponent: true,
            }, () => {
                    this.mainAddAssessment(e, LEARNOSITY);
            })
        } else if (assessmentFormat === LEARNING_TEMPLATE) {
            this.mainAddAssessment(e, LEARNING_TEMPLATE);
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
        this.setState({
            changeLearningData: false,
           
        }, () => {
             disableHeader(false);
             hideTocBlocker();
             this.props.showBlocker(false);
             setTimeout(() => {
                this.setState({
                    learningToolStatus: false
                })
            }, 5000)
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
        if(this.props.permissions && this.props.permissions.includes('quad_create_edit_ia')){
        switch (activeAssessmentType) {
            case LEARNING_TEMPLATE:
            case LEARNING_APP_TYPE:               
                    return   this.changeLearningApp()
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
    }

    /*** @description - This function is to toggle the Assessment Type PopUp*/
    toggleAssessmentTypeDropdown = () => {
        if (this.typeRef.current.classList.contains('notselect')) {
            this.typeRef.current.classList.remove('notselect');
            this.typeDropdownRef.current.classList.remove('notselect')
        } else {
            this.typeRef.current.classList.add('notselect');
            this.typeDropdownRef.current.classList.add('notselect')
        }
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
        this.typeRef.current.classList.add('notselect')
    }

    /*** @description - This function is to select the Assessment type from dropdown*/
    selectAssessmentType = () => {
        if(hasReviewerRole()){
            return true
        }
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
        if (this.usageTypeDropdownRef.current.classList.contains('notselect')) {
            this.usageTypeDropdownRef.current.classList.remove('notselect')
            this.usageTypeRef.current.classList.remove('notselect')
        } else {
            this.usageTypeDropdownRef.current.classList.add('notselect')
            this.usageTypeRef.current.classList.add('notselect')
        }
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
        this.props.handleAssessmentBlur(usageType)
    
    }

    /*** @description - This function is to select the Assessment usage-type from dropdown*/
    selectAssessmentUsageType = () => {
        if (assessmentUsageType.length > 0) {
            var usageTypeValue = assessmentUsageType.map((usageType, i) =>
                <li key={i} className="slate_assessment_metadata_dropdown_name" onClick={(e) => !hasReviewerRole() && this.handleAssessmentUsageTypeChange(usageType, e)}>{usageType}</li>
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
        let title = this.props.assessmentItemTitle? this.props.assessmentItemTitle:this.props.learningTemplateLabel;
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
        if (this.props.getAssessmentData && this.props.getAssessmentDataPopup===false && this.state.changeLearningData === false) {
            assessmentSlateJSX = <div className="slate_fetch_canvas">
                <div className="slate_assessment_data_container">
                    <div className="slate_assessment_data_content">
                        <div className="slate_assessment_data_label">{assessmentTypeValue}</div>
                        <div className="slate_assessment_data_details">
                            <div className="slate_assessment_data_title">{title}</div>
                            <div className="slate_assessment_data_id">{'ID: ' + this.props.assessmentId}</div>
                            <div className="slate_assessment_data_id_lo" style={{display:"none"}}>{this.props.assessmentId}</div>
                            <div className="slate_assessment_change_button" onClick={ !hasReviewerRole() && this.changeAssessment}>{changeTypeValue}</div>
                        </div>
                        <div className="clr"></div>
                    </div>
                </div>
                <div className="slate_assessment_metadata_container">
                    <div className="slate_assessment_metadata_type_selectlabel">Select usage type</div>
                    <div className="singleAssessment_Dropdown_activeDropdown notselect" ref={this.usageTypeRef} onClick={ !hasReviewerRole() && this.toggleUsageTypeDropdown} >
                        <span className="slate_assessment_metadata_dropdown_label" id ="AssessmentSlateUsageType">{this.state.activeAssessmentUsageType}</span>
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
        else if (this.state.changeLearningData && (this.state.activeAssessmentType === LEARNING_APP_TYPE || this.state.activeAssessmentType === LEARNING_TEMPLATE) && this.props.permissions && this.props.permissions.includes('quad_create_edit_ia')) {
            return (
                <div>
                    <LearningTool closePopUp={this.closePopUp} linkLearningApp={this.linkLearningApp} />
                </div>
            )
        } else if ((this.props.getAssessmentData && this.props.getAssessmentDataPopup == true) || this.state.learningToolStatus) {
            assessmentSlateJSX = <div className="slate_popup_get_selection">
                <div className="slate_popup_get_image lazyload"></div>
                <div className="slate_popup_get_title">{"'" + title + "'"}</div>
                <div className="slate_popup_get_added">Successfully added</div>
                <div className="clr"></div>
            </div>
        } else {
            if (document.getElementsByClassName("slate-tag-icon").length) {
            document.getElementsByClassName("slate-tag-icon")[0].classList.add("disable");
            }
            assessmentSlateJSX = <div className="slate_initial_selection">
                <div className="slate_assessment_type_label">Please select an assessment type.</div>
                <div className="slate_assessment_type_dropdown activeDropdown notselect" ref={this.typeRef} onClick={this.toggleAssessmentTypeDropdown}>
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