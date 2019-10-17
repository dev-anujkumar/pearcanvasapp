/**
* Root Component of Assessment Slate Canvas
*/


// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {AssessmentSlateData} from './AssessmentSlateData.jsx';
import { showTocBlocker, hideTocBlocker, disableHeader } from '../../js/toggleLoader';
import { c2AssessmentModule } from './../../js/c2_assessment_module';
import { utils } from '../../js/utils';
import PopUp from './../PopUp';

/*** @description - AssessmentSlateCanvas is a class*/
export class AssessmentSlateCanvas extends Component {
    constructor(props) {
        super(props);
        this.state={
            showAssessmentPopup:false,
            getAssessmentDataPopup:false,
            getAssessmentData:false,
            assessmentId: props.model && props.model.elementdata && props.model.elementdata.assessmentid ?props.model.elementdata.assessmentid :"",
            assessmentItemId: "",
            assessmentItemTitle: props.model && props.model.elementdata && props.model.elementdata.assessmenttitle ?props.model.elementdata.assessmenttitle :"",
            assessmentFormat: props.model && props.model.elementdata && props.model.elementdata.assessmentformat ?props.model.elementdata.assessmentformat :""
        }
    }
    /*** @description - This function is to toggle the Assessment PopUp for C2 media*/
    toggleAssessmentPopup = (value) => {
        this.setState({
            showAssessmentPopup : value
        });
    }
    /*** @description - This function is to select the Assessment type
     * @param type - type of assessment
    */
    selectAssessmentType=(type)=>{
        var assessmentType;
        if(type==="Full Assessment CITE" || this.props.model.elementdata.assessmentformat === "CITE" ){
            assessmentType="CITE"
        }else{
            assessmentType="TDX"
        }
        return assessmentType
    }
    /***
     * @description Open C2 module with predefined Alfresco location
     * @param  value alfresco locationData
     */
    handleC2AssessmentClick=(value)=> {
        let assessmentType=this.selectAssessmentType();
        let fileName = "";
        let filterType = [assessmentType.toUpperCase()] || ['CITE'];
        let existingURN = this.props.model.elementdata.assessmentid || "";//urn:pearson:work:
        let searchMode = "partial";//"partial";
        let prefix = 'urn:pearson:work:';
        let startIndex = prefix.length;
        let UUID = (existingURN && existingURN !== "") ? existingURN.substring(startIndex, existingURN.length) : "";
        var searchSelectAssessmentURN = "";
        if (searchMode == "partial") {
            searchSelectAssessmentURN = UUID || "";
        }
    
        let productId = "";
        let searchTypeOptVal = "";
        showTocBlocker();
        disableHeader(true);
        this.toggleAssessmentPopup(false);
        
        productId = (value && value !== "") ? value : "Unspecified";
        c2AssessmentModule.launchAssetBrowser(fileName, filterType, searchMode, searchSelectAssessmentURN, productId, searchTypeOptVal,  (assessmentData) =>{
    
            let id = assessmentData['id'] ? assessmentData['id'] : assessmentData.assessmentData['id'];
            let itemID = assessmentData['itemID'];
            let title = assessmentData['title'] ? assessmentData['title'] : assessmentData['itemsTitle'];
            var assessmentFormat;
            if (assessmentData['itemsData'] && assessmentData['itemsData']['taxonomicType'] && assessmentData['itemsData']['taxonomicType'][0] && typeof assessmentData['itemsData']['taxonomicType'][0] === 'string') {
                assessmentFormat = utils.getTaxonomicFormat(assessmentData['itemsData']['taxonomicType'][0]);
            } else if (assessmentData['assessmentData'] && assessmentData['assessmentData']['taxonomicType'] && assessmentData['assessmentData']['taxonomicType'][0] && typeof assessmentData['assessmentData']['taxonomicType'][0] === 'string') {
                assessmentFormat = utils.getTaxonomicFormat(assessmentData['assessmentData']['taxonomicType'][0]);
            } else {
                assessmentFormat = "";
                alert("There was an error loading asset due to malformed 'taxonomicType' data.  Please contact the helpdesk and reference id: " + id);
            }
            this.updateAssessment(id,itemID,title,assessmentFormat,"","insert");
   
        });

    }
    /*** @description - This function is to update state variables based on the parameters
       * @param id - assessment-id of the assessment
       * @param itemID - assessment-item-id of the assessment
       * @param title - assessment-title of the assessment
       * @param format - assessment Format of the assessment
       * @param usageType - usageType of the assessment
       * @param change - type of change - insert/update
    */
    updateAssessment=(id,itemID,title,format,usageType,change)=>{       
        if(change==='insert'){
            this.setState({
                getAssessmentDataPopup:true
            },()=>{
                setTimeout(()=>{ 
                    this.setState({
                        getAssessmentDataPopup:false
                    }) 
                }, 3000)
            })
        }
        else{
            this.setState({
                getAssessmentData:false
                
            })
        }
        this.setState({assessmentId: id,
            assessmentItemId : itemID,
            assessmentItemTitle:title,
            getAssessmentData:true,})                    

    }
    
    /*** @description - This function is to handle Focus on the Assessment element on click*/
    handleAssessmentFocus = () => {
        this.props.handleFocus();
    }
    /*** @description - This function is to handle Blur on the Assessment element on blur*/ 
    handleAssessmentBlur = () =>{
        this.props.handleBlur();
    }
    render() {
      
        return(
            <div className="AssessmentSlateMenu" onClick={this.handleAssessmentFocus} onBlur={this.handleAssessmentBlur}>                              
            <AssessmentSlateData type={this.props.type} getAssessmentDataPopup={this.state.getAssessmentDataPopup} getAssessmentData={this.state.getAssessmentData} assessmentId={this.state.assessmentId} assessmentItemId={this.state.assessmentItemId} assessmentItemTitle={this.state.assessmentItemTitle} handleC2AssessmentClick={this.handleC2AssessmentClick} toggleAssessmentPopup={this.toggleAssessmentPopup} selectAssessmentType={this.selectAssessmentType} model={this.props.model}/>
            {this.state.showAssessmentPopup? <PopUp handleC2Click ={this.handleC2AssessmentClick}  assessmentAndInteractive={"assessmentAndInteractive"} dialogText={'PLEASE ENTER A PRODUCT UUID'}/>:''}
            </div>
        );
    }
}


AssessmentSlateCanvas.defaultProps = {
    /** Detail of element in JSON object */
    type: ''
}
