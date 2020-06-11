/**
* Root Component of Assessment Slate Canvas
*/

// IMPORT - Plugins //
import React, { Component } from 'react'
import { connect } from 'react-redux';
import AssessmentSlateData from './AssessmentSlateData.jsx';
import { showTocBlocker, hideTocBlocker, disableHeader } from '../../js/toggleLoader';
import { c2AssessmentModule } from './../../js/c2_assessment_module';
import { utils } from '../../js/utils';
import PopUp from './../PopUp';
import { closeLtAction,openLtAction,getDiscipline,openLTFunction} from './learningTool/learningToolActions';
import { FULL_ASSESSMENT_CITE , LEARNOSITY , PUF} from './AssessmentSlateConstants.js';
import TinyMceEditor from "./../tinyMceEditor"
import { sendDataToIframe, hasReviewerRole } from '../../constants/utility.js';
import { ShowLoader } from '../../constants/IFrameMessageTypes.js';
import { specialCharacterDecode } from './assessmentCiteTdx/Actions/CiteTdxActions';
import { fetchUsageTypeData } from "./AssessmentActions/assessmentActions";
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
            assessmentItemTitle:props.model && props.model.elementdata && props.model.elementdata.assessmenttitle? props.model.elementdata.assessmenttitle: "",
            assessmentFormat: props.model && props.model.elementdata && props.model.elementdata.assessmentformat ?props.model.elementdata.assessmentformat :"",
            learningTemplateLabel: props.model && props.model.elementdata && props.model.elementdata.templatelabel ?props.model.elementdata.templatelabel :"",
            assessmentFormatType:"cite"
        }
    }

    componentWillReceiveProps(nextProps){   
        this.setState({
            getAssessmentData:nextProps.model && nextProps.model.elementdata &&  nextProps.model.elementdata.assessmentid? true: false,
            assessmentId: nextProps.model && nextProps.model.elementdata && nextProps.model.elementdata.assessmentid ?nextProps.model.elementdata.assessmentid :"",
            assessmentItemId: nextProps.model && nextProps.model.elementdata && nextProps.model.elementdata.assessmentitemid ?nextProps.model.elementdata.assessmentitemid :"",
            assessmentItemTitle: nextProps.model && nextProps.model.elementdata && nextProps.model.elementdata.assessmenttitle ?nextProps.model.elementdata.assessmenttitle :"",
            assessmentFormat: nextProps.model && nextProps.model.elementdata && nextProps.model.elementdata.assessmentformat ?nextProps.model.elementdata.assessmentformat :"",
            learningTemplateLabel: nextProps.model && nextProps.model.elementdata && nextProps.model.elementdata.templatelabel ?nextProps.model.elementdata.templatelabel :"",
              })             
    }

    componentDidMount(){
            this.props.fetchUsageTypeData("assessment");
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

    /*** 
     * @description - This function is to select the Assessment type
     * @param type - type of assessment
    */
    selectAssessmentType = (type) => {
        let assessmentType;
        if (type.toLowerCase() === 'cite' || type == FULL_ASSESSMENT_CITE || this.props.model.elementdata.assessmentformat === "CITE") {
            assessmentType = "CITE"
        } else {
            assessmentType = "TDX"
        }
        this.setState({
            assessmentFormatType: assessmentType
        })
    }

    /*** 
    * @description - This is the function to add C2-Media to Assessment Slate 
    * @param pufObj - The object contains data about PUF Assessment 
    */
    addPufAssessment = (pufObj , activeAssessmentType) => {
        let assessmentType = activeAssessmentType === LEARNOSITY ? "learnosity" : PUF
        showTocBlocker();
        disableHeader(true);
        this.updateAssessment(pufObj.id, "", pufObj.title, assessmentType , pufObj.usagetype, 'insert');
    }
    addCiteTdxAssessment = (citeTdxObj, activeAssessmentType) => {
        let assessmentType = activeAssessmentType === FULL_ASSESSMENT_CITE ? "cite" : "tdx";
        // let usagetype="Quiz"
        // let usage = document.getElementsByClassName('slate_assessment_metadata_dropdown_label')[0];
        // if(usage){
        //     usagetype=usage.innerText;
        // }
        showTocBlocker();
        disableHeader(true);
        this.updateAssessment(citeTdxObj.id, "", specialCharacterDecode(citeTdxObj.title), assessmentType , citeTdxObj.usageType, 'insert');
    }

    /***
     * @description Open C2 module with predefined Alfresco location
     * @param  value alfresco locationData
     */
    handleC2AssessmentClick=(value)=> {
        if(this.props.permissions && this.props.permissions.includes('quad_linking_assessment') && !hasReviewerRole() ){
        //let assessmentType=this.selectAssessmentType();
        let assessmentType=this.state.assessmentFormatType
        let fileName = "";
        let filterType = [assessmentType.toUpperCase()];
        // let existingURN = this.props.model.elementdata.assessmentid || "";//urn:pearson:work:
        let searchMode = "full";
        // let prefix = 'urn:pearson:work:';
        // let startIndex = prefix.length;
        // let UUID = (existingURN && existingURN !== "") ? existingURN.substring(startIndex, existingURN.length) : "";
        var searchSelectAssessmentURN = "";
        /*
        if (searchMode == "partial") {
            searchSelectAssessmentURN = UUID || "";
        }
        */

        let productId = "";
        let searchTypeOptVal = "";
        showTocBlocker();
        disableHeader(true);
        this.toggleAssessmentPopup('', false);
        productId = value ? value : "Unspecified";
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
            this.props.openCustomPopup("There was an error loading asset due to malformed 'taxonomicType' data.  Please contact the helpdesk and reference id: " + id);
        }
        let usagetype="Quiz"
        let usage = document.getElementsByClassName('span.slate_assessment_metadata_dropdown_label')[0];
        if(usage){
            usagetype=usage.innerText;
        }
        sendDataToIframe({'type': ShowLoader,'message': { status: true }});
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
        this.setState({assessmentId: id,
            assessmentItemId : itemID,
            assessmentItemTitle:title,
            getAssessmentData: true,
        }, () => {
            this.handleAssessmentBlur({ id: id, itemID: itemID, title: title, usageType: usageType, format: format, learningsystem: learningsystem, templateid: templateid, templatetype: templatetype, templatelabel: title });
        })  
        if(change==='insert'){
            this.setState({
                getAssessmentDataPopup: true
            }, () => {
                setTimeout(() => {
                    this.setState({
                        getAssessmentDataPopup: false
                    })                    
                }, 3000)          
                sendDataToIframe({'type': ShowLoader,'message': { status: false }}); 
            })           
      
    }
        else {           
            this.setState({
                getAssessmentData: false
            })
        }        
                         

    }

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
                    isLOExist={this.props.isLOExist}
                    showBlocker={showBlocker}
                    updateAssessment ={this.updateAssessment}
                    permissions={this.props.permissions}
                    handleAssessmentBlur= {this.handleAssessmentBlur}
                    learningTemplateLabel = {this.state.learningTemplateLabel}
                    setSlateParent={this.props.setSlateParent}
                    setSlateEntity={this.props.setSlateEntity}
                    addCiteTdxAssessment={this.addCiteTdxAssessment}
                    usageTypeListData={this.props.usageTypeListData}
                    />
                <TinyMceEditor
                    slateLockInfo={this.props.slateLockInfo}
                    handleBlur={this.props.handleBlur}
                    model={this.props.model}
                    handleEditorFocus={this.props.handleFocus}
                    className="addLOdata"
                    permissions={this.props.permissions}
                    element={this.props.model}
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
        permissions: state.appStore.permissions,
        setSlateParent: state.appStore.setSlateParent,
        setSlateEntity:state.appStore.setSlateEntity,
        usageTypeListData: state.appStore.usageTypeListData
    }
}
const mapActionToProps = {
    openLtAction: openLtAction,
    closeLtAction: closeLtAction,
    getDiscipline: getDiscipline,
    openLTFunction:openLTFunction,
    fetchUsageTypeData:fetchUsageTypeData
}



export default connect(mapStateToProps, mapActionToProps)(AssessmentSlateCanvas)
