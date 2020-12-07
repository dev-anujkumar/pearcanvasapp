/** ----- Import - Plugins ----- */
import React, { Component } from 'react';
import { connect } from 'react-redux';
/** ----- Import - Components ----- */
import PopUp from '../PopUp';
import ElmUpdateButton from './ElmUpdateButton.jsx';
import LearningTool from './learningTool/learningTool.jsx';
import RootElmComponent from './elm/RootElmComponent.jsx';
import { UsageTypeDropdown } from './UsageTypeDropdown/UsageTypeDropdown.jsx';
import RootCiteTdxComponent from './assessmentCiteTdx/RootCiteTdxComponent.jsx';
/** ----- Import - Dependencies ----- */
import config from '../../config/config';
import './../../styles/AssessmentSlateCanvas/AssessmentSlateCanvas.css';
import { sendDataToIframe, hasReviewerRole, defaultMathImagePath } from '../../constants/utility.js';
import { TAXONOMIC_ID_LEARNING_SYSTEM, TAXONOMIC_ID_DISCIPLINES } from './learningTool/learningToolUtility.js';
import { assessmentFormats, CITE, TDX, PUF, LEARNING_TEMPLATE, LEARNOSITY, ELM_UPDATE_MSG, ELM_UPDATE_POPUP_HEAD, ELM_UPDATE_BUTTON } from './AssessmentSlateConstants.js';
/** ----- Import - Action Creators ----- */
import { setCurrentCiteTdx, assessmentSorting } from '../AssessmentSlateCanvas/assessmentCiteTdx/Actions/CiteTdxActions';
import { closeLtAction, openLtAction, openLTFunction } from './learningTool/learningToolActions';
import { checkAssessmentStatus, updateAssessmentVersion } from './AssessmentActions/assessmentActions.js';
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
            showUpdatePopup:false,
            openUsageDropdown:false,
            openAssessmentDropdown:false
        }
        this.dropdownRef = React.createRef();
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
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentDidUpdate(prevProps) {
        if (this.props.getAssessmentDataPopup !== prevProps.getAssessmentDataPopup) {
            this.sendDataAssessment(this.props);
        }
        const { assessmentSlateObj, assessmentReducer } = this.props;
        if (this.state.activeAssessmentType == PUF &&
            ((assessmentSlateObj.title) && (assessmentReducer && (assessmentReducer[assessmentSlateObj.assessmentId] && assessmentReducer[assessmentSlateObj.assessmentId].assessmentTitle)))) {
            let prevPropsTitle = prevProps && prevProps.assessmentReducer && prevProps.assessmentReducer[assessmentSlateObj.assessmentId] && prevProps.assessmentReducer[assessmentSlateObj.assessmentId].assessmentTitle
            if ((assessmentSlateObj.title != (assessmentReducer[assessmentSlateObj.assessmentId].assessmentTitle))
                && (prevPropsTitle != assessmentReducer[assessmentSlateObj.assessmentId].assessmentTitle)) {
                this.updateElmOnSaveEvent(this.props);
            }
        }
    }

    componentWillUnmount() {
       document.removeEventListener("mousedown", this.handleClickOutside);
    }

    /*** @description - Close Dropdown on body click
    */
    handleClickOutside = e => {
        if (!(this.dropdownRef.current && this.dropdownRef.current.contains(e.target)) && !(e.target.classList.contains("slate_assessment_type_dropdown")) && (this.state.openUsageDropdown == true || this.state.openAssessmentDropdown == true) ) {
            this.setState({ openUsageDropdown: false,openAssessmentDropdown:false });
          }
    }
    /**--------------------- This section consists of LO in AS related methods --------------------*/
    /*** @description - This function is to handle LO Data in AS */
    sendDataAssessment(nextProps) {
        if (config.parentEntityUrn !== "Front Matter" && config.parentEntityUrn !== "Back Matter" && config.slateType == "assessment") {
            let apiKeys_LO = {
                'loApiUrl': config.LEARNING_OBJECTIVES_ENDPOINT,
                'strApiKey': config.STRUCTURE_APIKEY,
                'mathmlImagePath': config.S3MathImagePath ? config.S3MathImagePath : defaultMathImagePath,
                'productApiUrl': config.PRODUCTAPI_ENDPOINT,
                'manifestApiUrl': config.ASSET_POPOVER_ENDPOINT,
                'assessmentApiUrl': config.ASSESSMENT_ENDPOINT
            };
            let assessmentId = nextProps && nextProps.model && nextProps.model.elementdata.assessmentid.length > 0 ? nextProps.model.elementdata.assessmentid : '';
            if (assessmentId != "") {
                sendDataToIframe({ 'type': 'getAssessmentLO', 'message': { projectURN: config.projectUrn, assessmentId, apiKeys_LO } });
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
            this.setState({ parentPageNo: 1, searchTitle: '', filterUUID: '' })
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
        this.props.addPufAssessment(pufObj, this.state.activeAssessmentType,'insert');
        this.props.checkElmAssessmentStatus(pufObj.id,'fromAddElm');
    }

    /*** @description This function is used to open Version update Popup */
    updateElm = (event) => {
        this.prohibitPropagation(event);
        if (hasReviewerRole() || !(this.props.permissions && this.props.permissions.includes('elements_add_remove'))) {
            return true;
        }
        this.toggleUpdatePopup(true, event);
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

    updateElmAssessment = async (event) => {
        this.toggleUpdatePopup(false, event);
        this.showCanvasBlocker(false);
        let oldWorkUrn = this.props.assessmentSlateObj.assessmentId
        await this.props.checkElmAssessmentStatus(this.props.assessmentReducer[this.props.assessmentSlateObj.assessmentId].latestWorkUrn, 'fromUpdate', this.props.assessmentSlateObj.assessmentId);
        const { latestWorkUrn, assessmentTitle, prevLatestWorkUrn } = this.props.assessmentReducer[this.props.assessmentSlateObj.assessmentId]
        const { latestVersionClean } = this.props.assessmentReducer[latestWorkUrn]
        let updatedElmObj = {
            title: assessmentTitle,
            usagetype: this.state.activeAssessmentUsageType
        }
        const updatedAssessmentID = latestVersionClean == true ? prevLatestWorkUrn : latestWorkUrn;
        updatedElmObj.id = updatedAssessmentID
        if (latestWorkUrn != this.props.assessmentSlateObj.assessmentId) {
            updatedElmObj.title = this.props.assessmentReducer[latestWorkUrn].assessmentTitle
        }
        this.props.addPufAssessment(updatedElmObj, this.state.activeAssessmentType, 'insert', () => {
            this.props.updateAssessmentVersion(oldWorkUrn, updatedAssessmentID);
        });
        this.props.handleCanvasBlocker.disableHeader(false);
        this.props.handleCanvasBlocker.hideTocBlocker(false);
    }

    /**
     * @description This function is used to toggle update elm popup
     * @param {*} toggleValue Boolean value
     * @param {*} event event object
     */
    toggleUpdatePopup = (toggleValue, event) => {
        if (event) {
            event.preventDefault();
        }
        this.setState({
            showUpdatePopup: toggleValue
        })
        this.showCanvasBlocker(toggleValue);
    }

    updateElmOnSaveEvent = (props) => {
        const { assessmentSlateObj } = props;
        let pufObj = {
            id: assessmentSlateObj.assessmentId,
            title: this.props.assessmentReducer[assessmentSlateObj.assessmentId].assessmentTitle,
            usagetype: this.state.activeAssessmentUsageType
        }
        this.props.addPufAssessment(pufObj, this.state.activeAssessmentType, 'update');
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
        this.props.openLTFunction(TAXONOMIC_ID_LEARNING_SYSTEM);
        this.props.openLTFunction(TAXONOMIC_ID_DISCIPLINES);
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
        this.setState({
            openAssessmentDropdown: !this.state.openAssessmentDropdown,
            openUsageDropdown:false
        });
    }

    /*** @description - This function is to handle the Assessment type change
     * @param type - the type of assessment selected from the dropdown
     * @param e - event triggered 
    */
    handleAssessmentTypeChange = (type, e) => {
        this.setState({
            activeAssessmentType: Object.keys(assessmentFormats).find(key => assessmentFormats[key] === type),
            openAssessmentDropdown:false,
            openUsageDropdown:false
        });
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
        this.setState({
            openUsageDropdown: !this.state.openUsageDropdown,
            openAssessmentDropdown:false
        });
    }

    /*** @description - This function is to handle the Assessment Usage-type change
     * @param usageType - the usage-type selected from the dropdown
     * @param e - event triggered 
    */
    handleAssessmentUsageTypeChange = (usageType) => {

        this.setState({
            activeAssessmentUsageType: usageType,
            openUsageDropdown: false,
            openAssessmentDropdown: false
        });
        if (this.props.getAssessmentData && this.props.getAssessmentDataPopup === false && this.state.changeLearningData === false) {
            this.props.handleAssessmentBlur(usageType)
        }

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
            assessmentSlateJSX = this.showSuccessMessage(slatePlaceholder.title,activeAssessmentUsageType);
        } else {
            assessmentSlateJSX = this.showNewAssessmentSlate(activeAssessmentType,activeAssessmentUsageType);
        }
        return assessmentSlateJSX;
    }

    /*** @description This function is to shoe Succes Message on AS
    * @param title assessment title
    */
    showSuccessMessage = (title, activeAssessmentUsageType) => {
        let successMessage = <div className="slate_popup_get_selection">
            <div className="slate_popup_get_image lazyload"></div>
            <div className="slate_popup_get_title">{"'" + title + "'"}</div>
            <div className="slate_popup_get_added">{activeAssessmentUsageType} added successfully</div>
            <div className="clr"></div>
        </div>
        return successMessage;
    }

    /*** @description This function is to show Approved/Unapproved Status on AS */
    showElmVersionStatus = () => {
        let elmAssessment = this.props.assessmentReducer[this.props.assessmentSlateObj.assessmentId];
        if (elmAssessment) {
            return (<ElmUpdateButton
                elmAssessment={elmAssessment}
                updateElmVersion={this.updateElm}
                buttonText={ELM_UPDATE_BUTTON}
            />)
        }
    }

    /*** @description - This is the function to set usageType type dropdown
    * @param assessmentUsageType usage type 
    */
    setUsageType = (assessmentUsageType) => { 
        let usageType = <><div className="slate_assessment_metadata_container">
            <div className="assessment-label">Select usage type<span className="required">*</span></div>
            <div className="slate_assessment_type_dropdown" onClick={!hasReviewerRole() && this.toggleUsageTypeDropdown} >
                <span className="slate_assessment_dropdown_label" id="AssessmentSlateUsageType">{assessmentUsageType ? assessmentUsageType : "Select"}</span>
                <span className="slate_assessment_dropdown_image"></span>
                <div className="clr"></div>
                {this.state.openUsageDropdown &&
                    <ul className="slate_assessment_type_dropdown_options" ref={this.dropdownRef}>
                        {<UsageTypeDropdown usageTypeList={this.props.usageTypeList} clickHandlerFn={this.handleAssessmentUsageTypeChange} />}
                    </ul>
                }
            </div>
            <div className="clr"></div>
        </div>
        </>
        return usageType;
    }
    /*** @description This function is to shoe Succes Message on AS
    * @param assessmentType assessment format
    */
    showNewAssessmentSlate = (assessmentType, assessmentUsageType) => {
        let newAssessmentSlate = <div className="slate_initial_selection">
            {this.setUsageType(assessmentUsageType)}
            <div className={`assessment-parent ${assessmentUsageType ? '' : 'disabled'}`}>
                <div className="assessment-label">Select assessment type</div>
                <div className="slate_assessment_type_dropdown activeDropdown" onClick={this.toggleAssessmentTypeDropdown}>
                    <span className="slate_assessment_dropdown_label" title={assessmentType ? assessmentFormats[assessmentType] : ""}>{assessmentType ? assessmentFormats[assessmentType] : "Select"}</span>
                    <span className="slate_assessment_dropdown_image"></span>
                    <div className="clr"></div>
                    {this.state.openAssessmentDropdown &&
                        <ul className="slate_assessment_type_dropdown_options" ref={this.dropdownRef}>
                            {this.selectAssessmentType()}
                        </ul>
                    }
                </div>
            </div>
            <div className="clr"></div>
            <div className={`slate_assessment_type_button ${assessmentType && assessmentUsageType ? '' : 'disabled'}`} onClick={(e) => this.mainAddAssessment(e, assessmentType)}>Add Assessment</div>
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
            {this.setUsageType(assessmentUsageType)}
            {this.state.activeAssessmentType == PUF && this.showElmVersionStatus()}
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
        assessmentReducer: state.assessmentReducer
    };
};

const mapActionToProps = {
    setCurrentCiteTdx: setCurrentCiteTdx,
    assessmentSorting: assessmentSorting,
    openLtAction: openLtAction,
    closeLtAction: closeLtAction,
    openLTFunction: openLTFunction,
    checkElmAssessmentStatus : checkAssessmentStatus,
    updateAssessmentVersion: updateAssessmentVersion
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(AssessmentSlateData);