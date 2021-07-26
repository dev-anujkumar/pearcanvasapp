/** ----- Import - Plugins ----- */
import React, { Component } from 'react';
import { connect } from 'react-redux';
/** ----- Import - Components ----- */
import PopUp from '../PopUp';
import ElmUpdateButton from './ElmUpdateButton.jsx';
import LearningTool from './learningTool/learningTool.jsx';
import { UsageTypeDropdown } from './UsageTypeDropdown/UsageTypeDropdown.jsx';
import RootCiteTdxComponent from './assessmentCiteTdx/RootCiteTdxComponent.jsx';
/** ----- Import - Dependencies ----- */
import config from '../../config/config';
import './../../styles/AssessmentSlateCanvas/AssessmentSlateCanvas.css';
import { sendDataToIframe, hasReviewerRole, defaultMathImagePath } from '../../constants/utility.js';
import { TAXONOMIC_ID_DISCIPLINES } from './learningTool/learningToolUtility.js';
import { assessmentFormats, CITE, TDX, PUF, LEARNING_TEMPLATE, LEARNOSITY, ELM_UPDATE_MSG, ELM_UPDATE_POPUP_HEAD, ELM_UPDATE_BUTTON, FULL_ASSESSMENT_LEARNOSITY, Resource_Type, UPDATE_ASSESSMENT_TYPE } from './AssessmentSlateConstants.js';
/** ----- Import - Action Creators ----- */
import { setCurrentCiteTdx, assessmentSorting, setAssessmentFilterParams } from '../AssessmentSlateCanvas/assessmentCiteTdx/Actions/CiteTdxActions';
import { closeLtAction, openLtAction, openLTFunction, fetchLearningTemplates } from './learningTool/learningToolActions';
import { fetchAssessmentMetadata, updateAssessmentVersion, fetchAssessmentVersions, setElmPickerData } from './AssessmentActions/assessmentActions.js';
import { OPEN_ELM_PICKER, TOGGLE_ELM_SPA } from '../../constants/IFrameMessageTypes.js';
import { handlePostMsgOnAddAssess, handleElmPortalEvents } from '../ElementContainer/AssessmentEventHandling';
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
            changeLearningData: false,
            learningToolStatus: false,
            showCiteTdxComponent: false,
            parentPageNo: 1,
            isReset: false,
            searchTitle: '',
            filterUUID: '',
            updateAssessmentTypePopup: false,
            updatedAssessmentType:'',
            showUpdatePopup:false,
            isUpdateFinal:false,
            openUsageDropdown:false,
            openAssessmentDropdown:false
        }
        this.dropdownRef = React.createRef();
    }

    componentDidMount() {
        let newMessage = { assessmentResponseMsg: false };
        this.props.isLOExist(newMessage);
        if (this.props.model?.elementdata?.assessmentid) {
            this.sendDataAssessment(this.props);
            const assessmentFormat = this.props.model && this.props.setAssessmentFormat(this.props.model)
            this.setState({
                activeAssessmentType: assessmentFormat
            });
            if (assessmentFormat === CITE || assessmentFormat === TDX) {
                this.setCiteTdxFilterData(assessmentFormat, this.props.assessmentSlateObj);
            }
        }
        document.addEventListener("mousedown", this.handleClickOutside);
        if(this.props.isLearnosityProject && this.props.isLearnosityProject[0]?.ItemBankName){
            this.handleAssessmentTypeChange(assessmentFormats[LEARNOSITY])
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.getAssessmentDataPopup !== prevProps.getAssessmentDataPopup) {
            this.sendDataAssessment(this.props);
        }
        const { activeAssessmentType } = this.state;
        const { assessmentSlateObj, assessmentReducer } = this.props;
        const isElmLearnosity = (activeAssessmentType == PUF || activeAssessmentType == LEARNOSITY) ? true : false

        if (isElmLearnosity && !config.savingInProgress && !config.isSavingElement && assessmentReducer) {
            const newAssessmentData = assessmentReducer[assessmentSlateObj.assessmentId]
            if (assessmentReducer.dataFromElm) {
                const { dataFromElm } = assessmentReducer;
                if (dataFromElm?.type == 'ElmCreateInPlace' && dataFromElm.resourceType == Resource_Type.ASSESSMENT && dataFromElm.elmUrl && dataFromElm.usageType && dataFromElm.elementUrn === this.props.model.id) {
                    window.open(dataFromElm.elmUrl);
                    handlePostMsgOnAddAssess(this.addPufAssessment, dataFromElm.usageType, Resource_Type.ASSESSMENT, 'add', 'fromCreate');
                    this.props.setElmPickerData({});
                } else if (dataFromElm?.type == 'SaveElmData' && dataFromElm.resourceType == Resource_Type.ASSESSMENT && dataFromElm.pufObj && dataFromElm.elementUrn === this.props.model.id) {
                    this.addPufAssessment(dataFromElm.pufObj);
                    this.props.setElmPickerData({});
                }
            } else if (assessmentSlateObj?.assessmentId && assessmentSlateObj.title && newAssessmentData?.assessmentTitle) {
                this.updateElmLearnosityOnRefresh(prevProps, this.props)
            }
        }
    }
    updateElmLearnosityOnRefresh = (prevProps, newProps) => {
        const activeAS_ID = newProps?.assessmentSlateObj?.assessmentId
        const prevPropsTitle = prevProps?.assessmentReducer[activeAS_ID]?.assessmentTitle
        const newPropsTitle = newProps?.assessmentReducer[activeAS_ID]?.assessmentTitle
        if ((newProps?.assessmentSlateObj?.title !== newPropsTitle) && (prevPropsTitle != newPropsTitle) && config.saveElmOnAS) {
            config.saveElmOnAS = false
            handleElmPortalEvents('remove');
            this.updateElmOnSaveEvent(newProps);
        }
    }

    componentWillUnmount() {
       document.removeEventListener("mousedown", this.handleClickOutside);
       this.props.setCurrentCiteTdx({});
       this.props.setAssessmentFilterParams("", "");
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

    setCiteTdxFilterData = (assessmentFormat, assessmentData) => {
        if (assessmentFormat === CITE || assessmentFormat === TDX) {
            const searchUUID = assessmentData.assessmentId.split(':')[3];
            const selectedAssessment = {
                name: assessmentData.title,
                versionUrn: assessmentData.assessmentId
            }
            this.props.setCurrentCiteTdx(selectedAssessment);
            this.AssessmentSearchTitle(assessmentData.title, searchUUID);
            this.props.setAssessmentFilterParams(assessmentData.title, searchUUID);
        }        
    }

    /*** @description - This is the function to add CITE/TDX Asset to Assessment Slate 
    * @param citeTdxObj - The object contains data about CITE/TDX Assessment 
    */
    addCiteTdxAssessment = (citeTdxObj) => {
        this.props.addCiteTdxAssessment(citeTdxObj, this.state.activeAssessmentType);
        this.setState({
            isUpdateFinal: false
        })
    }

    /*** @description - This function is to close CITE/TDX PopUp */
    closeWindowAssessment = () => {
        // this.props.setCurrentCiteTdx({});
        this.setState({
            showCiteTdxComponent: false
        });
        this.showCanvasBlocker(false);
    }

    /**----------------- This section consists of Elm/Learnosity Assets related methods ----------------*/

    /*** @description - This is the function to add Elm/Learnosity Asset to Assessment Slate 
    * @param pufObj - The object contains data about Elm/Learnosity Assessment 
    */
    addPufAssessment = (pufObj) => {
        let usageTypeList = this.props?.assessmentReducer?.usageTypeListData;
        let dataToSend = pufObj;
        if (pufObj?.calledFrom == 'createElm' && pufObj.usagetype) {
            const updatedUsageType = usageTypeList && usageTypeList.find((type) => type.usagetype == pufObj.usagetype)
            this.setState({
                activeAssessmentUsageType: updatedUsageType ? updatedUsageType.label : this.state.activeAssessmentUsageType
            });
            dataToSend = { ...pufObj, usagetype: updatedUsageType ? updatedUsageType.label : this.state.activeAssessmentUsageType }
        }
        this.props.addPufAssessment(dataToSend, this.state.activeAssessmentType, 'insert');
        const elmData = { targetId: pufObj.id }
        this.setState({
            isUpdateFinal: false
        })
        this.props.checkElmAssessmentStatus('assessment', 'fromAddElm', elmData, {});
        handlePostMsgOnAddAssess("", "", "", "remove","");
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
        let oldReducerData = this.props.assessmentReducer[this.props.assessmentSlateObj.assessmentId]
        oldReducerData.targetId = this.props.assessmentSlateObj.assessmentId;
        await this.props.fetchAssessmentLatestVersion(oldReducerData.assessmentEntityUrn, 'assessmentUpdate', oldReducerData.createdDate, oldReducerData, {})
        const latestReducerData = this.props.assessmentReducer[this.props.assessmentSlateObj.assessmentId]
        const { latestVersion, secondLatestVersion } = latestReducerData;
        const newVersion = (latestVersion && (latestVersion.status !== 'wip' || latestVersion.latestCleanVersion == false)) ? latestVersion : secondLatestVersion;
        let updatedElmObj = {
            id: this.props.assessmentSlateObj.assessmentId,
            title: this.props.assessmentSlateObj.title,
            usagetype: this.state.activeAssessmentUsageType
        }
        if (newVersion) {
            updatedElmObj = {
                id: newVersion.id,
                title: latestVersion.title,
                usagetype: this.state.activeAssessmentUsageType
            }
        }
        this.props.addPufAssessment(updatedElmObj, this.state.activeAssessmentType, 'insert', () => {
            this.props.updateAssessmentVersion(oldWorkUrn, updatedElmObj.id);
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
        this.setState({
            isUpdateFinal: false
        })
        this.props.closeLtAction();
    }

    /*** @description - This function is to change the learning system */
    changeLearningApp() {
        this.props.fetchLearningTemplates();
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
                    sendDataToIframe({
                        'type': TOGGLE_ELM_SPA,
                        'message': {
                            type: OPEN_ELM_PICKER,
                            usageType: this.state.activeAssessmentUsageType,
                            elementType: this.state.activeAssessmentType,
                            resourceType: Resource_Type.ASSESSMENT,
                            elementUrn: this.props.model.id
                        }
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
    handleAssessmentTypeChange = (type, e, calledFrom) => {
        e?.preventDefault();
        if (calledFrom === 'updateAssessmentFormat') {
            if (type === assessmentFormats[this.state.activeAssessmentType]) {
                this.setState({
                    openAssessmentDropdown: false,
                })
                return null;
            }
            this.setState({
                updatedAssessmentType: type,
                updateAssessmentTypePopup: true
            })
        }
        else {
            this.setUpdateAssessmentType(type);
        }
    }

    /**@description - This Function sets the AssessmentType 
     * * @param type - the type of assessment selected from the dropdown
    */
    setUpdateAssessmentType=(type)=>{
        this.setState({
            activeAssessmentType: Object.keys(assessmentFormats).find(key => assessmentFormats[key] === type),
            openAssessmentDropdown:false,
            openUsageDropdown:false
        });
    }

    /*** @description - This function is to select the Assessment type from dropdown*/
    selectAssessmentType = (calledFrom) => {
        if (hasReviewerRole()) {
            return true
        }
        let assessmentTypeValue;
        if (Object.values(assessmentFormats).length > 0) {
             let assessmentData = Object.values(assessmentFormats);
            assessmentTypeValue = assessmentData.map((type, i) =>{
            let addClass = '';
            if(type === FULL_ASSESSMENT_LEARNOSITY){
                addClass='disabled'
            }
               return <li key={i} className= {`slate_assessment_dropdown_name ${addClass}`} onClick={(e) => this.handleAssessmentTypeChange(type, e, calledFrom)}>{type}</li>
            })
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
        const { activeAssessmentType, showCiteTdxComponent, changeLearningData, activeAssessmentUsageType } = this.state;
        let slatePlaceholder = assessmentSlateObj && activeAssessmentType && this.setAssessmentPlaceholder(activeAssessmentType, assessmentSlateObj)
        let assessmentSlateJSX;

        if ((activeAssessmentType === CITE || activeAssessmentType === TDX) && showCiteTdxComponent === true) {
            return <RootCiteTdxComponent openedFrom={'slateAssessment'} closeWindowAssessment={() => this.closeWindowAssessment()} assessmentType={activeAssessmentType} addCiteTdxFunction={this.addCiteTdxAssessment} usageTypeMetadata={activeAssessmentUsageType} parentPageNo={this.state.parentPageNo} isReset={this.state.isReset} resetPage={this.resetPage} searchTitle={this.state.searchTitle} filterUUID={this.state.filterUUID} setCiteTdxFilterData={this.setCiteTdxFilterData} assessmentSlateObj={assessmentSlateObj}/>
        } else if (changeLearningData && activeAssessmentType === LEARNING_TEMPLATE) {
            return <LearningTool closePopUp={this.closeLTLAPopUp} linkLearningApp={this.linkLearningApp} closelearningPopup={this.closelearningPopup} />
        } else if (getAssessmentData && getAssessmentDataPopup === false && changeLearningData === false) {
            assessmentSlateJSX = this.state.isUpdateFinal ? this.showNewAssessmentSlate(activeAssessmentType, activeAssessmentUsageType) : this.showFinalAssessmentSlate(slatePlaceholder, activeAssessmentType, assessmentSlateObj, activeAssessmentUsageType);
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
        let newSlateSelectType = <div className="assessment-label">Select usage type<span className="required">*</span></div>
        let usageType = <><div className="slate_assessment_metadata_container">
            {this.props.getAssessmentData === false && this.props.getAssessmentDataPopup === false ? newSlateSelectType : this.state.isUpdateFinal === false ? <div className="assessment-label">Usage type</div> : newSlateSelectType}
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

    /**@description -shows updateAssessment Popup when you select other AssessmentTypes in Final Slate */
    showUpdateAssessmentTypePopup = () => {
        this.showCanvasBlocker(true);
        return (
            <PopUp
                togglePopup={this.handleChangeAssessmentPopup}
                dialogText={UPDATE_ASSESSMENT_TYPE}
                warningHeaderText={`Warning`}
                lOPopupClass="lo-warning-txt"
                AssessmentPopup={true}
                agree={this.setChangeAssessmentType}
            />
        )
    }

    /**@description handles cancel in updateAssessmentType Popup */
    handleChangeAssessmentPopup = () => {
        this.showCanvasBlocker(false);
        this.setState({
            updateAssessmentTypePopup: false,
        })
    }

    /**-----@description function for updating AssessmentTytpe on Clicking yes on the Popup */
    setChangeAssessmentType = () => {
        this.showCanvasBlocker(false);
        this.setState({
            updateAssessmentTypePopup: false,
        })
        const newASFormat = Object.keys(assessmentFormats).find(key => assessmentFormats[key] === this.state.updatedAssessmentType)
        let dataToSend = {
            format: newASFormat,
            usageType: this.state.activeAssessmentUsageType,
            calledFrom: "updateAssessmentFormat"
        }
        this.props.handleAssessmentBlur(dataToSend, () => {
            this.setState({
                isUpdateFinal: true
            })
        this.props.setCurrentCiteTdx({});
        this.AssessmentSearchTitle('', '');
        this.props.setAssessmentFilterParams("", "");
        });
        this.setUpdateAssessmentType(this.state.updatedAssessmentType);
    }

    /**@description this function sets the AssessmentType whether it is from New or Final Assessment Slates
     * @param assessmentUsageType - selected Usage Type of an Assessment
     * @param assessmentType- selected AssessmentType
     * @param calledFrom- whether it is called from New or Final AssessmentSlate
     */
    setAssessmentType = (assessmentUsageType, assessmentType, calledFrom) => {
        let newSlateAssessmentSelect = <div className="assessment-label">Select assessment type</div>
        let assessmentSelectionType = <><div className={`assessment-parent ${assessmentUsageType ? '' : 'disabled'}`}>
            {this.props.getAssessmentData === false && this.props.getAssessmentDataPopup === false ? newSlateAssessmentSelect : this.state.isUpdateFinal === false ? <div className="assessment-label">Assessment type</div> : newSlateAssessmentSelect}
            <div className="slate_assessment_type_dropdown activeDropdown" onClick={this.toggleAssessmentTypeDropdown}>
                <span className="slate_assessment_dropdown_label" title={assessmentType ? assessmentFormats[assessmentType] : ""}>{assessmentType ? assessmentFormats[assessmentType] : "Select"}</span>
                {this.props.isLearnosityProject && this.props.isLearnosityProject[0]?.ItemBankName ? "" : <span className="slate_assessment_dropdown_image"></span>}
                <div className="clr"></div>
                {(!(this.props.isLearnosityProject && this.props.isLearnosityProject[0]?.ItemBankName)) && this.state.openAssessmentDropdown &&
                    <ul className="slate_assessment_type_dropdown_options" ref={this.dropdownRef}>
                    {this.selectAssessmentType(calledFrom)}
                    </ul>
                }
            </div>
        </div></>
        return assessmentSelectionType
    }
    /*** @description This function is to shoe Succes Message on AS
    * @param assessmentType assessment format
    */
    showNewAssessmentSlate = (assessmentType, assessmentUsageType) => {
        let newAssessmentSlate = <div className="slate_initial_selection">
            {this.setUsageType(assessmentUsageType)}
            {this.setAssessmentType(assessmentUsageType,assessmentType,"addASFormat")}
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
            {this.setAssessmentType(assessmentUsageType, assessmentType,'updateAssessmentFormat')}
            {(this.state.activeAssessmentType == PUF || this.state.activeAssessmentType == LEARNOSITY) && this.showElmVersionStatus()}
        </div>
        return assessmentSlate;
    }

    render() {
        try {
            return (
                <div className="AssessmentSlateCanvas">
                    {this.renderAssessmentSlate()}
                    {this.state.showUpdatePopup && this.showCustomPopup()}
                    {this.state.updateAssessmentTypePopup && this.showUpdateAssessmentTypePopup()}
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
        isLearnosityProject: state.appStore.isLearnosityProjectInfo
    };
};

const mapActionToProps = {
    setCurrentCiteTdx: setCurrentCiteTdx,
    assessmentSorting: assessmentSorting,
    openLtAction: openLtAction,
    closeLtAction: closeLtAction,
    openLTFunction: openLTFunction,
    checkElmAssessmentStatus : fetchAssessmentMetadata,
    updateAssessmentVersion: updateAssessmentVersion,
    fetchAssessmentLatestVersion:fetchAssessmentVersions,
    fetchLearningTemplates:fetchLearningTemplates,
    setAssessmentFilterParams:setAssessmentFilterParams,
    setElmPickerData: setElmPickerData
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(AssessmentSlateData);