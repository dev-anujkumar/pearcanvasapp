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
import { ShowLoader } from '../../constants/IFrameMessageTypes.js';
//import { closeLtAction,openLtAction,getDiscipline} from './learningTool/learningToolActions';



export class AssessmentSlateCanvas extends Component {
    constructor(props) {
        super(props);
        this.state={
            showAssessmentPopup:false,
            getAssessmentDataPopup:false,
            getAssessmentData:false,
            assessmentId:"",
            assessmentItemId:"",
            assessmentItemTitle:"",
            assessmentSlateElement:{
                assessmentId:"",
                assessmentItemId:"",
                assessmentItemTitle:"",
                assessmentFormat:""
            }
        }
    }
    toggleAssessmentPopup = (value) => {
        this.setState({
            showAssessmentPopup : value
        });
    }
    selectAssessmentType=(type)=>{
        var assessmentType;
        if(type==="Full Assessment CITE"){
            assessmentType="CITE"
        }else{
            assessmentType="TDX"
        }
        return assessmentType
    }
    handleC2AssessmentClick=(value)=> {
        let assessmentType=this.selectAssessmentType();
        let fileName = "";
        let filterType = [assessmentType.toUpperCase()] || ['CITE'];
        //let searchMode = $('.editor-instance[data-id="' + this.state.elementid + '"]').attr("data-elementdataassessmentstyle") || "partial";//"partial";
        let existingURN = this.props.model.elementdata.assessmentid || "";//urn:pearson:work:
        let searchMode = "partial";//"partial";
        //let existingURN = "";//urn:pearson:work:
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
        //window.parent.postMessage({ 'type': 'blockerTOC', 'message': { status: true } }, WRAPPER_URL);
    
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
        this.setState(prevState=>({
                assessmentSlateElement:{
                    ...prevState.assessmentSlateElement,
                    assessmentId: id,
                    assessmentItemId : itemID,
                    assessmentItemTitle:title,
                    assessmentFormat:format
                }
            })
            )
    }
    handleAssessmentFocus = () => {
        this.props.handleFocus();
    }
    handleAssessmentBlur = () =>{
        this.props.handleBlur();
    }
    render() {
        return(
            <div onFocus={this.handleAssessmentFocus} onBlur={this.handleAssessmentBlur}>                              
            <AssessmentSlateData type={this.props.type} getAssessmentDataPopup={this.state.getAssessmentDataPopup} getAssessmentData={this.state.getAssessmentData} assessmentId={this.state.assessmentId} assessmentItemId={this.state.assessmentItemId} assessmentItemTitle={this.state.assessmentItemTitle} handleC2AssessmentClick={this.handleC2AssessmentClick} toggleAssessmentPopup={this.toggleAssessmentPopup} selectAssessmentType={this.selectAssessmentType} assessmentSlateElement={this.state.assessmentSlateElement} model={this.props.model}/>
            {this.state.showAssessmentPopup? <PopUp handleC2Click ={this.handleC2AssessmentClick}  assessmentAndInteractive={"assessmentAndInteractive"} dialogText={'PLEASE ENTER A PRODUCT UUID'}/>:''}
            </div>
        );
    }
}


// const mapStateToProps = (state, props) => {
//     return {
//         toggleLT : state.learningToolReducer.toggleLT,
//         selectedResultFormApi : state.learningToolReducer.selectedResultFormApi
//     }
// }
// const mapActionToProps = {
//     openLtAction:openLtAction,
//     closeLtAction:closeLtAction,
//     getDiscipline:getDiscipline
// }


AssessmentSlateCanvas.defaultProps = {
    /** Detail of element in JSON object */
    type: ''
}

// export default connect(mapStateToProps,mapActionToProps)(AssessmentSlateCanvas)