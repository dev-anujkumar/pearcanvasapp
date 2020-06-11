// IMPORT - Plugins //
import React, { Component } from 'react';

// IMPORT - Assets //
import config from '../../config/config';
import './../../styles/AssessmentSlateCanvas/AssessmentSlateCanvas.css';
import { showTocBlocker, hideTocBlocker, disableHeader } from '../../js/toggleLoader';
import { assessmentUsageType, assessmentType, FULL_ASSESSMENT_PUF, LEARNING_APP_TYPE, LEARNOSITY, LEARNING_TEMPLATE, PUF, FULL_ASSESSMENT_CITE, FULL_ASSESSMENT_TDX  } from './AssessmentSlateConstants.js';
// import RootElmComponent from './elm/RootElmComponent.jsx';
import RootElmSingleAssessment from '../AssessmentSlateCanvas/elm/RootElmSingleComponent.jsx';
import RootCiteTdxComponent from './assessmentCiteTdx/RootCiteTdxComponent.jsx';
import LearningTool from './learningTool/learningTool.jsx';
import { sendDataToIframe, hasReviewerRole, setAssessmentUsageType } from '../../constants/utility.js';
import { ShowLoader } from '../../constants/IFrameMessageTypes.js';
import  {setCurrentCiteTdx,assessmentSorting}  from '../AssessmentSlateCanvas/assessmentCiteTdx/Actions/CiteTdxActions';
import { connect } from 'react-redux';

 class AssessmentSlateData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeAssessmentType: this.props.model && this.props.model.elementdata && this.props.model.elementdata.assessmentformat && this.props.model.elementdata.assessmentformat!== 'fpo'? this.props.model.elementdata.assessmentformat : 'Select',
            activeAssessmentUsageType: setAssessmentUsageType(this.props),//this.props.model && this.props.model.elementdata && this.props.model.elementdata.usagetype ? this.props.model.elementdata.usagetype : "Quiz",
            showElmComponent: false,
            changeLearningData: false,
            learningToolStatus: false,
            showCiteTdxComponent:false,
            parentPageNo:1,
            isReset: false,
            searchTitle : '',
            filterUUID : ''
        }
        this.usageTypeDropdownRef = React.createRef();
        this.typeDropdownRef = React.createRef();
        this.usageTypeRef = React.createRef();
        this.typeRef = React.createRef();
    }

    resetPage = (isReset, isSearch=false) => {
        this.setState({isReset})
        if(isReset && isSearch){
            this.setState({parentPageNo:1})
        } else if (isReset){
            this.setState({parentPageNo:1})
            this.setState({searchTitle:'', filterUUID:''})
        }
    }

    AssessmentSearchTitle = (searchTitle, filterUUID) => {
        this.setState({searchTitle, filterUUID},()=>{
            console.log("SetSate for filter", searchTitle + filterUUID)
        });
    }
    
    componentWillReceiveProps(nextProps){
        
     if(this.props.getAssessmentDataPopup !== nextProps.getAssessmentDataPopup){
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
        let newMessage = {assessmentResponseMsg:false};
        this.props.isLOExist(newMessage);
        if (this.props.model && this.props.model.elementdata && this.props.model.elementdata.assessmentid) {
            this.sendDataAssessment(this.props);
            this.setState({
                activeAssessmentType: this.props.model && this.props.model.elementdata && this.props.model.elementdata.assessmentformat && this.props.model.elementdata.assessmentformat!== 'fpo'? this.props.model.elementdata.assessmentformat : 'Select',
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
        hideTocBlocker(false);
        disableHeader(false);
        this.props.showBlocker(false);
    }
    /*** @description - This function is to close CITE/TDX PopUp
    */
   closeWindowAssessment = () => {
        this.props.setCurrentCiteTdx({});
        this.setState({
            showCiteTdxComponent: false
        });
        hideTocBlocker(false);
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
        if (assessmentFormat === FULL_ASSESSMENT_PUF || assessmentFormat == PUF ) {
            this.setState({
                activeAssessmentType: FULL_ASSESSMENT_PUF,
                showElmComponent: true,
            }, () => {
                    this.mainAddAssessment(e, FULL_ASSESSMENT_PUF);
                })
        } else if (assessmentFormat === LEARNOSITY || assessmentFormat == "learnosity") {
            this.setState({
                activeAssessmentType: LEARNOSITY,
                showElmComponent: true,
            }, () => {
                    this.mainAddAssessment(e, LEARNOSITY);
            })
        // } else if (assessmentFormat === LEARNING_TEMPLATE) {
        } else 
        if (assessmentFormat === LEARNING_TEMPLATE || assessmentFormat === LEARNING_APP_TYPE) {   //PCAT-6773 fixed
            this.mainAddAssessment(e, LEARNING_TEMPLATE);
            } 
            else if(assessmentFormat === "cite" || assessmentFormat === "tdx" || assessmentFormat === FULL_ASSESSMENT_TDX || assessmentFormat ===FULL_ASSESSMENT_CITE){
                this.props.assessmentSorting("","");
                this.setState({
                    activeAssessmentType: (assessmentFormat==="cite" || assessmentFormat === FULL_ASSESSMENT_CITE)?FULL_ASSESSMENT_CITE:FULL_ASSESSMENT_TDX,
                    showCiteTdxComponent: true
                }, () => {
                    this.mainAddAssessment(e, (assessmentFormat==="cite" || assessmentFormat === FULL_ASSESSMENT_CITE)?FULL_ASSESSMENT_CITE:FULL_ASSESSMENT_TDX);
            })
            }
            else {
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
             hideTocBlocker(false);
             this.props.showBlocker(false);
             setTimeout(() => {
                this.setState({
                    learningToolStatus: false
                })
            }, 5000)
        })
    }
    closelearningPopup = () => {
        disableHeader(false);
        hideTocBlocker(false);
        this.props.showBlocker(false);
        this.setState({
            activeAssessmentType: LEARNING_APP_TYPE,
            changeLearningData: false,
            learningToolStatus: false
        })
    }
    
    /*** @description - This is the function to add C2-Media to Assessment Slate 
    * @param pufObj - The object contains data about PUF Assessment 
    */
    addPufAssessment = (pufObj) => {
        this.props.addPufAssessment(pufObj , this.state.activeAssessmentType);
    }
    addCiteTdxAssessment =(citeTdxObj) =>{
        this.props.addCiteTdxAssessment(citeTdxObj,this.state.activeAssessmentType);
    }

    /*** @description - This is the root function to add Assessment 
     * @param activeAssessmentType - assessment -type 
    */
    mainAddAssessment = (e, activeAssessmentType) => {
        if(this.props.permissions && this.props.permissions.includes('quad_create_edit_ia')){
        switch (activeAssessmentType) {
            case LEARNING_TEMPLATE:
            case LEARNING_APP_TYPE: 
                sendDataToIframe({ 'type': 'hideToc', 'message': {} });              
                this.changeLearningApp()
                break;
            case FULL_ASSESSMENT_PUF:
            case LEARNOSITY:
                this.setState({
                    showElmComponent: true
                })
                sendDataToIframe({ 'type': 'hideToc', 'message': {} });
                showTocBlocker(true);    
                disableHeader(true);
                this.props.showBlocker(true);             
                break;
            case FULL_ASSESSMENT_CITE:
            case FULL_ASSESSMENT_TDX:
                    sendDataToIframe({ 'type': 'hideToc', 'message': {} });
                    this.props.assessmentSorting("","");
                    this.setState({
                        showCiteTdxComponent: true
                    })
                showTocBlocker();
                disableHeader(true);
                this.props.showBlocker(true);
                break;
            default:
                this.addC2MediaAssessment(activeAssessmentType)
                break;

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
         const { usageTypeListData } = this.props;
         let usageTypeDropdown = [], usageTypeValue = [];

         if (usageTypeListData && usageTypeListData.entityType == "assessment" && !(Object.keys(usageTypeListData.usageTypeList).length === 0 && usageTypeListData.usageTypeList.constructor === Object)) {
             usageTypeDropdown = Object.values(usageTypeListData.usageTypeList);
         }
         usageTypeValue = usageTypeDropdown && usageTypeDropdown.map((usageType, i) =>
             <li key={i} className="slate_assessment_metadata_dropdown_name" onClick={(e) => !hasReviewerRole() && this.handleAssessmentUsageTypeChange(usageType, e)}>{usageType}</li>
         )

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
            return <RootElmSingleAssessment activeAssessmentType={this.state.activeAssessmentType} closeElmWindow = {()=>this.closeElmWindow()} addPufFunction = {this.addPufAssessment} activeUsageType = {this.state.activeAssessmentUsageType}/>
        }
        if ((this.state.activeAssessmentType === FULL_ASSESSMENT_CITE || this.state.activeAssessmentType === FULL_ASSESSMENT_TDX) && this.state.showCiteTdxComponent === true) {
            return <RootCiteTdxComponent activeAssessmentType={this.state.activeAssessmentType} openedFrom = {'slateAssessment'} closeWindowAssessment = {()=>this.closeWindowAssessment()} assessmentType = {this.state.activeAssessmentType} addCiteTdxFunction = {this.addCiteTdxAssessment} usageTypeMetadata = {this.state.activeAssessmentUsageType} parentPageNo={this.state.parentPageNo} isReset={this.state.isReset} resetPage={this.resetPage} AssessmentSearchTitle={this.AssessmentSearchTitle} searchTitle={this.state.searchTitle} filterUUID={this.state.filterUUID} />
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
                            <div className="slate_assessment_data_format_lo" style={{display:"none"}}>{this.state.activeAssessmentType}</div>
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
                    <LearningTool closePopUp={this.closePopUp} linkLearningApp={this.linkLearningApp} closelearningPopup={this.closelearningPopup}/>
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
        // const { type } = this.props;
        return (
            <div className="AssessmentSlateCanvas">
                {this.assessmentSlateContent()}
            </div>
        );
    }
}
AssessmentSlateData.displayName = "AssessmentSlateData"
const mapActionToProps = {
    setCurrentCiteTdx: setCurrentCiteTdx,
    assessmentSorting:assessmentSorting
}

export default connect(
    null,
    mapActionToProps
)(AssessmentSlateData);
