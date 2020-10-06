/** ----- Import - Plugins ----- */
import React, { Component } from 'react';
import { connect } from 'react-redux';
/** ----- Import - Components ----- */
import PopUp from '../PopUp';
import LearningTool from './learningTool/learningTool.jsx';
import RootElmComponent from './elm/RootElmComponent.jsx';
import { UsageTypeDropdown } from './UsageTypeDropdown/UsageTypeDropdown.jsx';
import RootCiteTdxComponent from './assessmentCiteTdx/RootCiteTdxComponent.jsx';
/** ----- Import - Dependencies ----- */
import config from '../../config/config';
import { approvedIcon } from '../../../src/images/ElementButtons/ElementButtons.jsx';
import './../../styles/AssessmentSlateCanvas/AssessmentSlateCanvas.css';
import { sendDataToIframe, hasReviewerRole } from '../../constants/utility.js';
import { assessmentFormats, CITE, TDX, PUF, LEARNING_TEMPLATE, LEARNOSITY, ELM_NEW_VERSION_UPDATE, ELM_UPDATE_MSG, ELM_UPDATE_POPUP_HEAD } from './AssessmentSlateConstants.js';
/** ----- Import - Action Creators ----- */
import { setCurrentCiteTdx, assessmentSorting } from '../AssessmentSlateCanvas/assessmentCiteTdx/Actions/CiteTdxActions';
import { closeLtAction, openLtAction, openLTFunction } from './learningTool/learningToolActions';
import { checkAssessmentStatus } from './AssessmentActions/assessmentActions.js';
/**
* Module | AssessmentSlateData
* description | This is the child Component of Assessment Slate
*/
class AssessmentSlateData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeAssessmentType: this.props && this.props.model && this.props.setAssessmentFormat(this.props.model),
            activeAssessmentUsageType: this.props && this.props.model && this.props.setAssessmentUsageType(this.props.model),
            showElmComponent: false,
            changeLearningData: false,
            learningToolStatus: false,
            showCiteTdxComponent: false,
            parentPageNo: 1,
            isReset: false,
            searchTitle: '',
            filterUUID: '',
            showUpdatePopup:false
        }
        this.typeRef = React.createRef();
        this.usageTypeRef = React.createRef();
        this.typeDropdownRef = React.createRef();
        this.usageTypeDropdownRef = React.createRef();
    }

    componentDidMount() {
        let newMessage = { assessmentResponseMsg: false };
        this.props.isLOExist(newMessage);
        if (this.props.model && this.props.model.elementdata && this.props.model.elementdata.assessmentid) {
            this.sendDataAssessment(this.props);
            this.setState({
                activeAssessmentType: this.props.model && this.props.setAssessmentFormat(this.props.model),
            })
        }
    }

    componentDidUpdate(nextProps) {
        if (this.props.getAssessmentDataPopup !== nextProps.getAssessmentDataPopup) {
            this.sendDataAssessment(nextProps);
        }
    }

    /**--------------------- This section consists of LO in AS related methods --------------------*/
    /*** @description - This function is to handle LO Data in AS */
    sendDataAssessment(nextProps) {
        if (config.parentEntityUrn !== "Front Matter" && config.parentEntityUrn !== "Back Matter" && config.slateType == "assessment") {
            let apiKeys = [config.ASSET_POPOVER_ENDPOINT, config.STRUCTURE_APIKEY, config.PRODUCTAPI_ENDPOINT];
            let assessmentId = nextProps && nextProps.model && nextProps.model.elementdata.assessmentid.length > 0 ? nextProps.model.elementdata.assessmentid : '';
            if (assessmentId != "") {
                sendDataToIframe({ 'type': 'getAssessmentLO', 'message': { projectURN: config.projectUrn, assessmentId, apiKeys } });
            }
            else { //set tag to grey heresss                 
                let newMessage = { assessmentResponseMsg: false };
                this.props.isLOExist(newMessage);
            }

        }
    }

    /*** @description - This function is to handle LO icon for AS */
    setSlateTagIcon = () => {
        if (document.getElementsByClassName("slate-tag-icon").length) {
            document.getElementsByClassName("slate-tag-icon")[0].classList.remove("disable");
        }
    }

    /**------------------ This section consists of CITE/TDX Assets related methods ------------------*/

    /*** @description - This is the function to reset Page in CITE/TDX Picker
    * @param isReset check to reset CITE/TDX Picker Table
    * @param isSearch check for search operation
    */
    resetPage = (isReset, isSearch = false) => {
        this.setState({ isReset })
        if (isReset && isSearch) {
            this.setState({ parentPageNo: 1 })
        } else if (isReset) {
            this.setState({ parentPageNo: 1 })
            this.setState({ searchTitle: '', filterUUID: '' })
        }
    }

    /*** @description - This is the function to search keywords in CITE/TDX Picker
    * @param searchTitle title to be searched
    * @param filterUUID UUID to be searched
    */
    AssessmentSearchTitle = (searchTitle, filterUUID) => {
        this.setState({ searchTitle, filterUUID });
    }

    /*** @description - This is the function to add CITE/TDX Asset to Assessment Slate 
    * @param citeTdxObj - The object contains data about CITE/TDX Assessment 
    */
    addCiteTdxAssessment = (citeTdxObj) => {
        this.props.addCiteTdxAssessment(citeTdxObj, this.state.activeAssessmentType);
    }

    /*** @description - This function is to close CITE/TDX PopUp */
    closeWindowAssessment = () => {
        this.props.setCurrentCiteTdx({});
        this.setState({
            showCiteTdxComponent: false
        });
        this.showCanvasBlocker(false);
    }

    /**----------------- This section consists of Elm/Learnosity Assets related methods ----------------*/
    /*** @description - This function is to close ELM PopUp */
    closeElmWindow = () => {
        this.setState({
            showElmComponent: false
        });
        this.showCanvasBlocker(false);
    }

    /*** @description - This is the function to add Elm/Learnosity Asset to Assessment Slate 
    * @param pufObj - The object contains data about Elm/Learnosity Assessment 
    */
    addPufAssessment = (pufObj) => {
        this.props.addPufAssessment(pufObj, this.state.activeAssessmentType);
        this.props.checkElmAssessmentStatus(pufObj.id,'fromAddElm');
    }

    /*** @description This function is used to open Version update Popup */
    updateElm = (event) => {
        event.stopPropagation();
        this.toggleUpdatePopup(true, event)
    }

    /*** @description This function is used to render Version update Popup */
    showCustomPopup = () => {

        if (this.state.showUpdatePopup) {
            this.showCanvasBlocker(true);
            return (
                <PopUp
                    dialogText={ELM_UPDATE_MSG}
                    active={true}
                    togglePopup={this.toggleUpdatePopup}
                    isElmUpdatePopup={true}
                    updateElmAssessment={this.updateElmAssessment}
                    isInputDisabled={true}
                    isElmUpdateClass="elm-update"
                    elmHeaderText={ELM_UPDATE_POPUP_HEAD}
                />
            )
        }
        else {
            return null
        }
    }

    /*** @description This function is used to update elm assessment after click on update from Version update Popup */
    updateElmAssessment = () => {
        this.toggleUpdatePopup(false, event);
        this.props.checkElmAssessmentStatus(this.props.assessmentReducer.latestWorkUrn, 'fromUpdate');
        const { latestWorkUrn, assessmentTitle } = this.props.assessmentReducer[this.props.assessmentSlateObj.assessmentId]
        let updatedElmObj = {
            id: latestWorkUrn,
            title: assessmentTitle,
            usagetype: this.state.activeAssessmentUsageType
        }
        this.props.addPufAssessment(updatedElmObj, this.state.activeAssessmentType);
        let updateSuccess = document.getElementById('link-notification');
            updateSuccess.innerText = ELM_NEW_VERSION_UPDATE;
            updateSuccess.classList.add('show-update')
            // updateSuccess.style.display = "block";
        setTimeout(() => {
            updateSuccess.classList.remove('show-update')
            // updateSuccess.style.display = "none";
            updateSuccess.innerText = "";
        }, 4000);
    }

    /**
     * @description This function is used to toggle update elm popup
     * @param {*} toggleValue Boolean value
     * @param {*} event event object
     */
    toggleUpdatePopup = (toggleValue, event) => {
        this.setState({
            showUpdatePopup: toggleValue
        })
        this.showCanvasBlocker(toggleValue);
        this.prohibitPropagation(event)
    }

    /**
     * Prevents event propagation and default behaviour
     * @param {*} event event object
     */
    prohibitPropagation = (event) => {
        if (event) {
            event.preventDefault()
            event.stopPropagation()
        }
        return false
    }
    /**----------- This section consists of Learning Tool/Learning App Assets related methods ----------*/
    /*** @description - This function is to link learning app
     * @param selectedLearningType - selected learning tool asset data
    */
    linkLearningApp = (selectedLearningType) => {
        this.props.handleCanvasBlocker.ShowLoader(true);
        this.props.updateAssessment(selectedLearningType.learningtemplateUrn, "", selectedLearningType.label.en, LEARNING_TEMPLATE, this.state.activeAssessmentUsageType, 'insert', selectedLearningType.learningsystem, selectedLearningType.templateid, selectedLearningType.type);
        this.props.closeLtAction();
    }

    /*** @description - This function is to change the learning system */
    changeLearningApp() {
        this.props.openLTFunction();
        this.props.openLtAction();
        this.setState({
            activeAssessmentType: LEARNING_TEMPLATE,
            changeLearningData: true,
            learningToolStatus: true
        });
    }

    /**  @description - This function is to close the LT/LA popup */
    closeLTLAPopUp = () => {
        this.setState({
            changeLearningData: false
        }, () => this.closeLTLAPopUpCallback())
    }

    /**  @description - This function is to callback function of  closeLTLAPopUp */
    closeLTLAPopUpCallback = () => {
        this.showCanvasBlocker(false);
        setTimeout(() => {
            this.setState({
                learningToolStatus: false
            })
        }, 5000)
    }

    /**  @description - This function is to close the LT/LA popup */
    closelearningPopup = () => {
        this.showCanvasBlocker(false);
        this.setState({
            activeAssessmentType: LEARNING_TEMPLATE,
            changeLearningData: false,
            learningToolStatus: false
        })
    }
    /**-------------------------------------------------------------------------------------------------*/

    /*** @description - This function is to disable all components when Assessment Picker Popups are open in window */
    showCanvasBlocker = (value) => {
        const { disableHeader, hideTocBlocker, showBlocker, showTocBlocker, hideToc } = this.props.handleCanvasBlocker
        if (value == true) {
            showTocBlocker();
            hideToc();
        } else {
            hideTocBlocker(value);
        }
        disableHeader(value);
        showBlocker(value);
    }

    /*** @description - This is the root function to add/change Assessment 
     * @param e - event triggered
     * @param activeAssessmentType - assessment -type 
    */
    mainAddAssessment = (e, activeAssessmentType) => {
        if (hasReviewerRole()) {
            return true;
        }
        e.stopPropagation();
        if (this.props.permissions && this.props.permissions.includes('quad_create_edit_ia')) {
            this.showCanvasBlocker(true);
            switch (activeAssessmentType) {
                case LEARNING_TEMPLATE:
                    this.changeLearningApp();
                    break;
                case PUF:
                case LEARNOSITY:
                    this.setState({
                        showElmComponent: true
                    });
                    break;
                case TDX:
                case CITE:
                default:
                    this.props.assessmentSorting("", "");
                    this.setState({
                        showCiteTdxComponent: true
                    });
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
            activeAssessmentType: Object.keys(assessmentFormats).find(key => assessmentFormats[key] === type)
        });
        this.typeDropdownRef.current.classList.add('notselect')
        this.typeRef.current.classList.add('notselect')
    }

    /*** @description - This function is to select the Assessment type from dropdown*/
    selectAssessmentType = () => {
        if (hasReviewerRole()) {
            return true
        }
        let assessmentTypeValue;
        if (Object.values(assessmentFormats).length > 0) {
            assessmentTypeValue = Object.values(assessmentFormats).map((type, i) =>
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

    /*** @description - This function is to set Placeholder values in AS
     * @param type - assessment format
     * @param assessmentSlateObj - full-assessment element's details
    */
    setAssessmentPlaceholder = (type, assessmentSlateObj) => {
        let assessmentPlaceholder = {};
        const { title, assessmentId } = assessmentSlateObj
        if (type === LEARNING_TEMPLATE) {
            assessmentPlaceholder = {
                title: title,
                showID: 'Template ID: ' + assessmentId,
                assessmentTypeValue: "Learning App",
                changeTypeValue: "Change Learning App"
            }
        } else {
            assessmentPlaceholder = {
                title: title,
                showID: 'ID: ' + assessmentId,
                assessmentTypeValue: "Assessment",
                changeTypeValue: "Change assessment"
            }
        }
        return assessmentPlaceholder;
    }

    /*** @description - This function is to render the Assessment Slate Element*/
    renderAssessmentSlate = () => {
        this.setSlateTagIcon();
        const { getAssessmentData, getAssessmentDataPopup, assessmentSlateObj } = this.props;
        const { activeAssessmentType, showElmComponent, showCiteTdxComponent, changeLearningData, activeAssessmentUsageType } = this.state;
        let slatePlaceholder = assessmentSlateObj && activeAssessmentType && this.setAssessmentPlaceholder(activeAssessmentType, assessmentSlateObj)
        let assessmentSlateJSX;

        if ((activeAssessmentType === PUF || activeAssessmentType === LEARNOSITY) && showElmComponent === true) {
            return <RootElmComponent activeAssessmentType={activeAssessmentType} closeElmWindow={() => this.closeElmWindow()} activeUsageType={activeAssessmentUsageType} elementType={'assessment'} addPufFunction={this.addPufAssessment}/>
        } else if ((activeAssessmentType === CITE || activeAssessmentType === TDX) && showCiteTdxComponent === true) {
            return <RootCiteTdxComponent activeAssessmentType={activeAssessmentType} openedFrom={'slateAssessment'} closeWindowAssessment={() => this.closeWindowAssessment()} assessmentType={activeAssessmentType} addCiteTdxFunction={this.addCiteTdxAssessment} usageTypeMetadata={activeAssessmentUsageType} parentPageNo={this.state.parentPageNo} isReset={this.state.isReset} resetPage={this.resetPage} AssessmentSearchTitle={this.AssessmentSearchTitle} searchTitle={this.state.searchTitle} filterUUID={this.state.filterUUID} />
        } else if (changeLearningData && activeAssessmentType === LEARNING_TEMPLATE) {
            return <LearningTool closePopUp={this.closeLTLAPopUp} linkLearningApp={this.linkLearningApp} closelearningPopup={this.closelearningPopup} />
        } else if (getAssessmentData && getAssessmentDataPopup === false && changeLearningData === false) {
            assessmentSlateJSX = this.showFinalAssessmentSlate(slatePlaceholder, activeAssessmentType, assessmentSlateObj, activeAssessmentUsageType);
        } else if (getAssessmentData && (getAssessmentDataPopup === true || learningToolStatus)) {
            assessmentSlateJSX = this.showSuccessMessage(slatePlaceholder.title);
        } else {
            assessmentSlateJSX = this.showNewAssessmentSlate(activeAssessmentType);
        }
        return assessmentSlateJSX;
    }

    /*** @description This function is to shoe Succes Message on AS
    * @param title assessment title
    */
    showSuccessMessage = (title) => {
        let successMessage = <div className="slate_popup_get_selection">
            <div className="slate_popup_get_image lazyload"></div>
            <div className="slate_popup_get_title">{"'" + title + "'"}</div>
            <div className="slate_popup_get_added">Successfully added</div>
            <div className="clr"></div>
        </div>
        return successMessage;
    }

    /*** @description This function is to show Approved/Unapproved Status on AS */
    showElmVersionStatus = () => {
        let updateDiv;
        // this.addElmSpaActionListener()
        const { assessmentStatus, latestWorkUrn, activeWorkUrn } = this.props.assessmentReducer[this.props.assessmentSlateObj.assessmentId]
        if (assessmentStatus == 'final' && (latestWorkUrn != activeWorkUrn)) {
            updateDiv = <div className='elm-update-button' onClick={this.updateElm}><b className='elm-update-button-text'>Update Available</b></div>
        } else {
            let approveText = assessmentStatus == 'wip' ? "Unapproved" :  assessmentStatus == 'final' ? "Approved" : ""
            let approveIconClass = assessmentStatus == 'wip' ? "disable" : assessmentStatus == 'final' ? "enable" : ""
            updateDiv = <div className="elm-status-div"><span className={"approved-button " + approveIconClass}>{approvedIcon}</span><p className={"approved-button-text " + approveIconClass}>{approveText}</p></div>
        }

        return updateDiv
    }

    /*** @description This function is to shoe Succes Message on AS
    * @param assessmentType assessment format
    */
    showNewAssessmentSlate = (assessmentType) => {
        let assessmentFormatLabel = assessmentType == 'Select' ? assessmentType : assessmentFormats[assessmentType];
        let disableAddAssessment = assessmentType == 'Select' ? 'slate_assessment_disabled_button' : 'slate_assessment_type_button';
        let newAssessmentSlate = <div className="slate_initial_selection">
            <div className="slate_assessment_type_label">Please select an assessment type.</div>
            <div className="slate_assessment_type_dropdown activeDropdown notselect" ref={this.typeRef} onClick={this.toggleAssessmentTypeDropdown}>
                <span className="slate_assessment_dropdown_label">{assessmentFormatLabel}</span>
                <span className="slate_assessment_dropdown_image"></span>
                <div className="clr"></div>
            </div>
            {
                <ul className="slate_assessment_type_dropdown_options notselect" ref={this.typeDropdownRef}>
                    {this.selectAssessmentType()}
                </ul>
            }
            <div className={disableAddAssessment} onClick={(e) => this.mainAddAssessment(e, assessmentType)}>Add assessment</div>
            <div className="clr"></div>
        </div>

        return newAssessmentSlate;
    }

    /*** @description This function is to shoe Succes Message on AS
    * @param slatePlaceholder placeholder data
    * @param assessmentType assessment format
    * @param assessmentSlateObj details about assessment
    * @param assessmentUsageType Usage type
    */
    showFinalAssessmentSlate = (slatePlaceholder, assessmentType, assessmentSlateObj, assessmentUsageType) => {
        let assessmentSlate = <div className="slate_fetch_canvas">
            <div className="slate_assessment_data_container">
                <div className="slate_assessment_data_content">
                    <div className="slate_assessment_data_label">{slatePlaceholder.assessmentTypeValue}</div>
                    <div className="slate_assessment_data_details">
                        <div className="slate_assessment_data_title">{slatePlaceholder.title}</div>
                        <div className="slate_assessment_data_id">{slatePlaceholder.showID}</div>
                        <div className="slate_assessment_data_id_lo">{assessmentSlateObj.assessmentId}</div>
                        <div className="slate_assessment_data_format_lo">{assessmentType}</div>
                        <div className="slate_assessment_change_button" onClick={(e) => this.mainAddAssessment(e, assessmentType)}>{slatePlaceholder.changeTypeValue}</div>
                    </div>
                    <div className="clr"></div>
                </div>
            </div>
            <div className="slate_assessment_metadata_container">
                <div className="slate_assessment_metadata_type_selectlabel">Select usage type</div>
                <div className="singleAssessment_Dropdown_activeDropdown notselect" ref={this.usageTypeRef} onClick={!hasReviewerRole() && this.toggleUsageTypeDropdown} >
                    <span className="slate_assessment_metadata_dropdown_label" id="AssessmentSlateUsageType">{assessmentUsageType}</span>
                    <span className="slate_assessment_metadata_dropdown_image"></span>
                    <div className="clr"></div>
                </div>
                <div className="clr"></div>
            </div>
            <ul className="slate_assessment_metadata_type_dropdown_options notselect" ref={this.usageTypeDropdownRef}>
                {<UsageTypeDropdown usageTypeList={this.props.usageTypeList} clickHandlerFn={this.handleAssessmentUsageTypeChange} />}
            </ul>
            <div className="clr"></div>
            {this.showElmVersionStatus()}
            <div className="clr"></div>
        </div>
        return assessmentSlate;
    }

    render() {
        try {
            return (
                <div className="AssessmentSlateCanvas">
                    {this.renderAssessmentSlate()}
                    {this.state.showUpdatePopup && this.showCustomPopup()}
                </div>
            );
        } catch (error) {
            return (
                <div className="AssessmentSlateCanvas">Error in Assesssment Slate</div>
            );
        }
    }
}
AssessmentSlateData.displayName = "AssessmentSlateData"
const mapStateToProps = state => {
    return {
        usageTypeList: state.appStore.usageTypeListData.usageTypeList,
        assessmentReducer: state.assessmentReducer,
    };
};

const mapActionToProps = {
    setCurrentCiteTdx: setCurrentCiteTdx,
    assessmentSorting: assessmentSorting,
    openLtAction: openLtAction,
    closeLtAction: closeLtAction,
    openLTFunction: openLTFunction,
    checkElmAssessmentStatus : checkAssessmentStatus

}

export default connect(
    mapStateToProps,
    mapActionToProps
)(AssessmentSlateData);