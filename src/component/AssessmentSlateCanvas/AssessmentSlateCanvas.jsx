/**
* Root Component of Assessment Slate Canvas
*/

// IMPORT - Plugins //
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { AssessmentSlateData } from './AssessmentSlateData.jsx';
import { showTocBlocker, hideTocBlocker, disableHeader } from '../../js/toggleLoader';
import { c2AssessmentModule } from './../../js/c2_assessment_module';
import { utils } from '../../js/utils';
import PopUp from './../PopUp';
import { closeLtAction,openLtAction,getDiscipline,openLTFunction} from './learningTool/learningToolActions';
import { sendDataToIframe } from '../../constants/utility.js';
import {ShowLoader} from '../../constants/IFrameMessageTypes';
import { FULL_ASSESSMENT_CITE, LEARNING_TEMPLATE } from './AssessmentSlateConstants.js';
import TinyMceEditor from "./../tinyMceEditor"
/*** @description - AssessmentSlateCanvas is a class*/
export class AssessmentSlateCanvas extends Component {
    constructor(props) {
        super(props);
        this.state={
            showAssessmentPopup:false,
            getAssessmentDataPopup:false,
            getAssessmentData:props.model && props.model.elementdata &&  props.model.elementdata.assessmentid? true: false,
            assessmentId: props.model && props.model.elementdata && props.model.elementdata.assessmentid ?props.model.elementdata.assessmentid :"",
            assessmentItemId: props.model && props.model.elementdata && props.model.elementdata.assessmentitemid ?props.model.elementdata.assessmentitemid :"",
            assessmentItemTitle: props.model && props.model.elementdata && props.model.elementdata.assessmenttitle ?props.model.elementdata.assessmenttitle :"",
            assessmentFormat: props.model && props.model.elementdata && props.model.elementdata.assessmentformat ?props.model.elementdata.assessmentformat :""
        }
    }

    /*** @description - This function is to toggle the Assessment PopUp for C2 media*/
    toggleAssessmentPopup = (e,value) => {
        this.props.showBlocker(value);
        disableHeader(value);
        value ? showTocBlocker(value) : hideTocBlocker(value)
        this.setState({
            showAssessmentPopup: value
        });
    }
    componentWillReceiveProps(nextProps){   
        this.setState({
            showAssessmentPopup:false,
            getAssessmentDataPopup:false,
            getAssessmentData:nextProps.model && nextProps.model.elementdata &&  nextProps.model.elementdata.assessmentid? true: false,
            assessmentId: nextProps.model && nextProps.model.elementdata && nextProps.model.elementdata.assessmentid ?nextProps.model.elementdata.assessmentid :"",
            assessmentItemId: nextProps.model && nextProps.model.elementdata && nextProps.model.elementdata.assessmentitemid ?nextProps.model.elementdata.assessmentitemid :"",
            assessmentItemTitle: nextProps.model && nextProps.model.elementdata && nextProps.model.elementdata.assessmenttitle ?nextProps.model.elementdata.assessmenttitle :"",
            assessmentFormat: nextProps.model && nextProps.model.elementdata && nextProps.model.elementdata.assessmentformat ?nextProps.model.elementdata.assessmentformat :""

              })
    }

    /*** 
     * @description - This function is to select the Assessment type
     * @param type - type of assessment
    */
    selectAssessmentType=(type)=>{
        var assessmentType;
        if(type===FULL_ASSESSMENT_CITE || this.props.model.elementdata.assessmentformat === "CITE" ){
            assessmentType="CITE"
        }else{
            assessmentType="TDX"
        }
        return assessmentType
    }

    /*** 
    * @description - This is the function to add C2-Media to Assessment Slate 
    * @param pufObj - The object contains data about PUF Assessment 
    */
    addPufAssessment = (pufObj) => {
        showTocBlocker();
        disableHeader(true);
        this.updateAssessment(pufObj.id, "", pufObj.title, pufObj.assessmentFormat, pufObj.usagetype, 'insert');
    }

    /***
     * @description Open C2 module with predefined Alfresco location
     * @param  value alfresco locationData
     */
    handleC2AssessmentClick=(value)=> {
        if(this.props.permissions && this.props.permissions.includes('quad_linking_assessment')){
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
       // this.props.showBlocker(true);
        this.toggleAssessmentPopup('',false);
        
        productId = (value && value !== "") ? value : "Unspecified";
        c2AssessmentModule.launchAssetBrowser(fileName, filterType, searchMode, searchSelectAssessmentURN, productId, searchTypeOptVal,  (assessmentData) =>{    
           this.launchAssetBrowserCallBack(assessmentData)   
        });
    }
    }

    /*** 
     * @description  Callback function to launch C2 mdeia browser
     * @param  assessmentData - the object contains assessment data
     */
    launchAssetBrowserCallBack = (assessmentData) => {
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
        let usagetype="Quiz"
        let usage = document.getElementsByClassName('span.slate_assessment_metadata_dropdown_label')[0];
        if(usage){
            usagetype=usage.innerText;
        }
        this.updateAssessment(id, itemID, title, assessmentFormat, usagetype, "insert");
    }

    /*** @description - This function is to update state variables based on the parameters
       * @param id - assessment-id of the assessment
       * @param itemID - assessment-item-id of the assessment
       * @param title - assessment-title of the assessment
       * @param format - assessment Format of the assessment
       * @param usageType - usageType of the assessment
       * @param change - type of change - insert/update
    */
    updateAssessment=(id,itemID,title,format,usageType,change,learningsystem,templateid,templatetype)=>{       
       // updateAssessment=(id,itemID,title,format,usageType,change)=>{       
        if(change==='insert'){
            this.setState({
                getAssessmentDataPopup: true
            }, () => {
                setTimeout(() => {
                    this.setState({
                        getAssessmentDataPopup: false
                    })
                }, 3000)
            })
        }
        else {
            this.setState({
                getAssessmentData: false

            })
        }
        
        this.setState({assessmentId: id,
            assessmentItemId : itemID,
            assessmentItemTitle:title,
            getAssessmentData:true,},()=>{ 
             this.handleAssessmentBlur({id : id,itemID : itemID,title :title,usageType : usageType,format : format, learningsystem:learningsystem , templateid:templateid, templatetype:templatetype,templatelabel:title});
                // this.handleAssessmentBlur({id : id,itemID : itemID,title :title,usageType : usageType,format : format});
        })                    

    }

    /*** @description - This function is to link learning app*/
    //  linkLearningApp = (selectedLearningType, usagetype, change) =>{
    //      console.log(selectedLearningType);
    //     this.updateAssessment(selectedLearningType.learningtemplateUrn,"",selectedLearningType.label.en,LEARNING_TEMPLATE,usagetype,change,selectedLearningType.learningsystem,selectedLearningType.templateid,selectedLearningType.type);
    //     // this.updateAssessment();
    //      this.props.closeLtAction();
    //  }

    /*** @description - This function is to handle Focus on the Assessment element on click*/
    handleAssessmentFocus = () => {
        this.props.handleFocus();
    }
    
    /*** @description - This function is to handle Blur on the Assessment element on blur*/ 
    handleAssessmentBlur = (assessmentData) =>{
        this.props.handleBlur(assessmentData);
    }
    render() {
        const { showBlocker } = this.props;
        const { getAssessmentDataPopup, getAssessmentData, assessmentId, assessmentItemId, assessmentItemTitle, assessmentSlateElement } = this.state;
        return (
            <div className="AssessmentSlateMenu" onClick={this.handleAssessmentFocus}>  
                <AssessmentSlateData
                    type={this.props.type}
                    getAssessmentDataPopup={getAssessmentDataPopup}
                    getAssessmentData={getAssessmentData}
                    assessmentId={assessmentId}
                    assessmentItemId={assessmentItemId}
                    assessmentItemTitle={assessmentItemTitle}
                    handleC2AssessmentClick={this.handleC2AssessmentClick}
                    toggleAssessmentPopup={this.toggleAssessmentPopup}
                    selectAssessmentType={this.selectAssessmentType}
                    assessmentSlateElement={assessmentSlateElement}
                    addPufAssessment={this.addPufAssessment}
                    model={this.props.model} 
                    openLtAction ={this.props.openLtAction}
                    closeLtAction = {this.props.closeLtAction}
                    getDiscipline = {this.props.getDiscipline}
                    openLTFunction = {this.props.openLTFunction}
                    // linkLearningApp ={this.linkLearningApp}
                    showBlocker={showBlocker}
                    updateAssessment ={this.updateAssessment}
                    permissions={this.props.permissions}
                    />
                <TinyMceEditor
                    slateLockInfo={this.props.slateLockInfo}
                    handleBlur={this.props.handleBlur}
                    model={this.props.model}
                    handleEditorFocus={this.props.handleFocus}
                    className="addLOdata"
                    permissions={this.props.permissions}
                />
                    
                {this.state.showAssessmentPopup ? <PopUp handleC2Click={this.handleC2AssessmentClick} togglePopup={this.toggleAssessmentPopup} assessmentAndInteractive={"assessmentAndInteractive"} dialogText={'PLEASE ENTER A PRODUCT UUID'} /> : ''}
            </div>
        );
    }
}

AssessmentSlateCanvas.displayName = "AssessmentSlateCanvas"

const mapStateToProps = (state, props) => {
    return {
        toggleLT: state.learningToolReducer.toggleLT,
        selectedResultFormApi: state.learningToolReducer.selectedResultFormApi,
        permissions: state.appStore.permissions
    }
}
const mapActionToProps = {
    openLtAction: openLtAction,
    closeLtAction: closeLtAction,
    getDiscipline: getDiscipline,
    openLTFunction:openLTFunction
}



export default connect(mapStateToProps, mapActionToProps)(AssessmentSlateCanvas)
