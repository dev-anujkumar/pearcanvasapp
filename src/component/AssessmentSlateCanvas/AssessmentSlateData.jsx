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
            slateAssessmentTitle:"",
            slateAssessmentId:"",
            assessmentItemId:"",
            assessmentformat:"",
            activeAssessmentType: 'Select',
            activeAssessmentUsageType: props.model && props.elementdata ? props.elementdata.usagetype : "Quiz",
            showElmComponent:false,
           
        }

        this.usageTypeDropdownRef = React.createRef();
        this.typeDropdownRef = React.createRef();
        this.usageTypeRef = React.createRef();

    }
    componentWillMount() {
        var model=this.props.model;
        //  let selectedLearningType = {
        //     "label":{"en":model.elementdata.templatelabel },
        //     "learningsystem":model.elementdata.learningsystem,
        //     "learningtemplateUrn":model.elementdata.assessmentid,
        //     "templateid":model.elementdata.templateid,
        //     "type":model.elementdata.templatetype
        // } 
        if(model&&model.elementdata.usagetype ){
            this.setState({
                activeAssessmentUsageType:model.elementdata.usagetype
            })
        }
        if(model.elementdata.assessmentformat===''){
            this.setState({
                getAssessmentData:false
            })
        }
        else{
            this.setState({
                getAssessmentData:true,
              //  changeLearningData:true,
                slateAssessmentTitle:this.props.elementDataAssessmentTitle,
                slateAssessmentId:model.elementdata.assessmentid,
                assessmentformat:model.elementdata.assessmentformat,
               // templatelabel:model.elementdata.templatelabel,
               // selectedResultFormApi:selectedLearningType
            })
        }
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if(prevState.slateAssessmentTitle !== nextProps.assessmentSlateElement.assessmentItemTitle){
            return{
                slateAssessmentTitle : nextProps.assessmentSlateElement.assessmentItemTitle,
                assessmentItemId : nextProps.assessmentSlateElement.assessmentItemId,
                slateAssessmentId : nextProps.assessmentSlateElement.assessmentId,               
            }
            
        }
        return null;
    }
    
 
    changeLearningApp=()=>{
        console.log("Learning App Type>>>>>>")
        // this.setState({
        //     getAssessmentData:true
        //    })
    }
    changeAssessment =(e)=> {
        let assessmentFormat = this.state.activeAssessmentType;
        if(assessmentFormat == 'puf') {
            this.setState({
                activeAssessmentType : 'Full Assessment PUF',
               showElmComponent:true,
            },() => {
                this.mainAddAssessment(e, 'Full Assessment PUF');
            })
        }else if (this.state.assessmentformat === "learningtemplate") {
           this.changeLearningApp();
        }else {
           this.addC2MediaAssessment();
        }
       // this.state.assessmentformat === "learningtemplate"? !hasReviewerRole() && this.changeLearningApp:
    }
    addC2MediaAssessment=(activeAssessmentType)=>{
        console.log("addC2MediaAssessment Type");
        this.props.toggleAssessmentPopup(true);
        this.props.selectAssessmentType(activeAssessmentType);         
      
    }
    
    // closePopUp(){
    //     window.parent.postMessage({ 'type': 'blockerTOC', 'message': {status: false} }, WRAPPER_URL);
    //    this.setState({
    //     changeLearningData:false
    //    },() =>{
    //        disableHeader(false);
    //    })       
    //  }

    // closeElmWindow(){
    //     this.setState({
    //         showElmComponent:false
    //        });
    //        hideTocBlocker();
    //        disableHeader(false);
    //  }
    mainAddAssessment = (e, activeAssessmentType) => {
        switch(activeAssessmentType){
            case 'Learning App Type':
                return this.changeLearningApp()
    
            case 'Full Assessment PUF':
                this.setState({
                    showElmComponent : true
                })
                console.log("ËLM COMPONENT")
                // showTocBlocker();
                // disableHeader(true);
                // window.parent.postMessage({ 'type': 'blockerTOC', 'message': {status: true} }, WRAPPER_URL); 
                break;
    
            default:
                return this.addC2MediaAssessment(activeAssessmentType)
    
        }
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
    toggleUsageTypeDropdown = () => {
        this.usageTypeDropdownRef.current.classList.remove('notselect')
        this.usageTypeRef.current.classList.remove('notselect')
    }
    handleAssessmentUsageTypeChange = (usageType, e) => {
        this.setState({

            activeAssessmentUsageType: usageType,
        });
        this.usageTypeDropdownRef.current.classList.add('notselect')
        this.usageTypeRef.current.classList.add('notselect')
        
    }
    selectAssessmentUsageType = () => {
        if (assessmentUsageType.length > 0) {
            var usageTypeValue = assessmentUsageType.map((usageType, i) =>
                <li key={i} className="slate_assessment_metadata_dropdown_name" onClick={(e) => this.handleAssessmentUsageTypeChange(usageType, e)}>{usageType}</li>
            )
        }
        return usageTypeValue
    }  
   
    assessmentSlateContent = () => {
        var assessmentSlateJSX;
        var assessmentTypeValue;
        var changeTypeValue;
        if(this.state.activeAssessmentType === 'Learning App Type'){
            assessmentTypeValue="Learning App";
            changeTypeValue="Change Learning App"
        }else if(this.state.activeAssessmentType === 'Full Assessment CITE' || this.state.activeAssessmentType === 'Full Assessment TDX'){
            assessmentTypeValue="Assessment";
            changeTypeValue="Change assessment";
        }else{
            assessmentTypeValue="PUF";
            changeTypeValue="Change PUF";
        }
        // if(this.state.activeAssessmentType === 'Full Assessment PUF' && this.state.showElmComponent === true){
        //     return <RootElmComponent closeElmWindow = {this.closeElmWindow} addPufFunction = {this.addAssessment}  openedFrom = {'slateAssessment'} usageTypeMetadata = {this.state.metaDataValue}/>
        // }
        if (this.props.getAssessmentData && this.props.getAssessmentDataPopup===false && this.state.activeAssessmentType !== 'Full Assessment PUF'  ) {
            assessmentSlateJSX = <div className="slate_fetch_canvas">
                <div className="slate_assessment_data_container">
                    <div className="slate_assessment_data_content">
                        <div className="slate_assessment_data_label">{assessmentTypeValue}</div>
                        <div className="slate_assessment_data_details">
                        <div className="slate_assessment_data_title">{this.state.slateAssessmentTitle}</div>
                                <div className="slate_assessment_data_id">{'ID: '+ this.state.slateAssessmentId}</div>
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
          else if (this.state.activeAssessmentType=== 'learning_tool'&& this.state.activeAssessmentType === 'Learning App Type') {
            return (
                <div>
                    {/* <LearningTool /> */}
                </div>
            )
        } else if (this.props.getAssessmentData && this.props.getAssessmentDataPopup ==  true ) {
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
                        (<div className="slate_assessment_type_button"onClick={(e) => this.mainAddAssessment(e, this.state.activeAssessmentType)}>Add assessment</div>) : (<div className="slate_assessment_disabled_button" >Add assessment</div>)
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
