// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// IMPORT - Assets //
import './../../styles/ElementSingleAssessment/ElementSingleAssessment.css';
import { dropdownArrow } from './../../images/ElementButtons/ElementButtons.jsx';
import { connect } from 'react-redux';
import { showTocBlocker, disableHeader, hideTocBlocker, hideToc } from '../../js/toggleLoader';
import { hasReviewerRole, sendDataToIframe } from '../../constants/utility.js';
import { UsageTypeDropdown } from '../AssessmentSlateCanvas/UsageTypeDropdown/UsageTypeDropdown.jsx';
import RootCiteTdxComponent from '../AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.jsx';
import RootSingleAssessmentComponent from '../AssessmentSlateCanvas/singleAssessmentCiteTdx/RootSingleAssessmentComponent.jsx'
import { setCurrentCiteTdx, setCurrentInnerCiteTdx, assessmentSorting, specialCharacterDecode } from '../AssessmentSlateCanvas/assessmentCiteTdx/Actions/CiteTdxActions';
import { setAssessmentUsageType, setAssessmentProperties, checkElmAssessmentStatus, setAssessmentItemTitle, getAssessmentTitle } from '../AssessmentSlateCanvas/AssessmentActions/assessmentUtility.js';
import PopUp from '../PopUp';
import ElmUpdateButton from '../AssessmentSlateCanvas/ElmUpdateButton.jsx'
import { DEFAULT_ASSESSMENT_SOURCE } from '../../constants/Element_Constants.js';
import { PUF, LEARNOSITY, ELM_UPDATE_BUTTON, CITE, TDX, Resource_Type,CHANGE_USAGE_TYPE } from '../AssessmentSlateCanvas/AssessmentSlateConstants.js';
import { fetchAssessmentMetadata, updateAssessmentVersion, checkEntityUrn, saveAutoUpdateData, fetchAssessmentVersions, setElmPickerData, setNewItemFromElm, saveUpdatedAssessmentArray } from '../AssessmentSlateCanvas/AssessmentActions/assessmentActions.js';
import config from '../../config/config';
import { OPEN_ELM_PICKER, TOGGLE_ELM_SPA } from '../../constants/IFrameMessageTypes';
import { handlePostMsgOnAddAssess } from '../ElementContainer/AssessmentEventHandling';
import moment from 'moment';
/*** @description - ElementSingleAssessment is a class based component. It is defined simply to make a skeleton of the assessment-type element .*/

class ElementSingleAssessment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            assessmentId:  null,
            assessmentItemId : null,
            showAssessmentPopup: false,
            asseessmentUsageTypeDropdown: false,
            activeAsseessmentUsageType:this.props.model &&  setAssessmentUsageType(this.props.model),
            assessmentTitle: this.props.model && getAssessmentTitle(this.props.model),
            elementType: this.props.model.figuredata.elementdata.assessmentformat || "",
            showSinglePopup:false,
            changeUsageTypePopup:false,
            updatedUsageType:'',
            setCurrentAssessment:{},
            parentPageNo:1,
            isReset: false,
            searchTitle : '',
            filterUUID : '',
            openedFrom:'',
            assessmentItemTitle: this.props.model && setAssessmentItemTitle(this.props.model)
        };
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
        this.setState({searchTitle, filterUUID});
    }

    componentDidUpdate() {
        const { assessmentReducer } = this.props;
        const { elementType, assessmentId } = this.state;
        if (!config.savingInProgress && !config.isSavingElement && (elementType == PUF || elementType == LEARNOSITY) && (assessmentReducer)){
            const { dataFromElm } = assessmentReducer;
            if (assessmentReducer.dataFromElm && dataFromElm.resourceType == Resource_Type.ASSESSMENT_ITEM && dataFromElm.elementUrn === this.props.model.id) {
                if (dataFromElm?.type == 'ElmCreateInPlace' && dataFromElm.elmUrl && dataFromElm.usageType) {
                    window.open(dataFromElm.elmUrl);
                    handlePostMsgOnAddAssess(this.addPufAssessment, dataFromElm.usageType, Resource_Type.ASSESSMENT_ITEM, 'add', 'fromCreate');
                    this.props.setElmPickerData({});
                } else if (dataFromElm?.type == 'SaveElmData' && dataFromElm.pufObj) {
                    this.addPufAssessment(dataFromElm.pufObj);
                    this.props.setElmPickerData({});
                }
            }else if (assessmentId && assessmentReducer[assessmentId]?.items) {
                this.updateElmLearnosityOnRefresh(this.props);
            }
        }
    }

    updateElmLearnosityOnRefresh=(props)=>{
        const { assessmentReducer } = props;
        const { assessmentId, assessmentItemId, assessmentTitle } = this.state;
        const assessmentData = assessmentReducer[assessmentId];
        const latestItem = assessmentData?.items?.find(itemdata => itemdata.oldItemId == assessmentItemId)
        const latestItemId = latestItem?.latestItemId;
        const saveEventUpdate = latestItem?.shouldUpdateOnSaveEvent;
        if (((assessmentReducer.itemUpdateEvent && !assessmentData.showUpdateStatus) && (saveEventUpdate && (latestItemId && assessmentItemId != latestItemId) || (assessmentTitle != assessmentData.assessmentTitle))) ||
            (!assessmentData.showUpdateStatus && ((assessmentTitle != assessmentData.assessmentTitle) || (latestItemId && assessmentItemId != latestItemId)))) {
            this.updateElmOnSaveEvent(this.props);
        }
    }
    componentDidMount() {
        let title = this.props.model && getAssessmentTitle(this.props.model) != null ? getAssessmentTitle(this.props.model).replace(/<\/?[^>]+(>|$)/g, "") : null;
        this.setState({
            assessmentTitle: title,
            activeAsseessmentUsageType: this.props.model && setAssessmentUsageType(this.props.model),
            assessmentId: this.props.model && this.props.model.figuredata && this.props.model.figuredata.elementdata && this.props.model.figuredata.elementdata.assessmentid ? this.props.model.figuredata.elementdata.assessmentid : null,
            assessmentItemId: this.props.model && this.props.model.figuredata && this.props.model.figuredata.elementdata && this.props.model.figuredata.elementdata.assessmentitemid ? this.props.model.figuredata.elementdata.assessmentitemid : null,
            assessmentItemTitle: this.props.model && setAssessmentItemTitle(this.props.model)
        })
        let newElement = localStorage.getItem('newElement');
        if (newElement) {
            localStorage.removeItem('newElement');
            setTimeout(() => {
                this.handleAssessmentFocus();
            }, 0)
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if ('model' in nextProps && 'figuredata' in nextProps.model && 'elementdata' in nextProps.model.figuredata && 'assessmentformat' in nextProps.model.figuredata.elementdata && nextProps.model.figuredata.elementdata.assessmentformat !== prevState.elementType) {
            let title = getAssessmentTitle(nextProps.model) != null ? getAssessmentTitle(nextProps.model).replace(/<\/?[^>]+(>|$)/g, "") : null;
            return {
                assessmentId: nextProps.model.figuredata && nextProps.model.figuredata.elementdata && nextProps.model.figuredata.elementdata.assessmentid ? nextProps.model.figuredata.elementdata.assessmentid : "",
                assessmentItemId: nextProps.model.figuredata && nextProps.model.figuredata.elementdata && nextProps.model.figuredata.elementdata.assessmentitemid ? nextProps.model.figuredata.elementdata.assessmentitemid : "",
                assessmentTitle: title,
                elementType: nextProps.model.figuredata.elementdata.assessmentformat || "",
                assessmentItemTitle: setAssessmentItemTitle(nextProps.model)
            };
        }

        return null;
    }

    /**Assessment PopUp Functions */
    /*** @description - This function is to toggle the Assessment PopUp*/
    toggleAssessmentPopup = (e, value) => {
        sendDataToIframe({ 'type': 'hideToc', 'message': {} });
        this.props.showBlocker(value);
        disableHeader(value);
        value ? showTocBlocker(value) : hideTocBlocker(value)
        this.props.assessmentSorting("","");
        if (this.state.assessmentId && this.state.assessmentItemId ) {
            this.props.setCurrentCiteTdx({
                "versionUrn": this.state.assessmentId,
                "name": this.state.assessmentTitle,
            });
            this.props.setCurrentInnerCiteTdx({
                "versionUrn": this.state.assessmentItemId,
                "name": this.state.assessmentItemTitle
            });
            this.setState({
                showSinglePopup: value,
                setCurrentAssessment: {
                    id: this.state.assessmentId,
                    title: this.state.assessmentTitle,
                },
                openedFrom:'singleAssessment'
            });
        }
        else {
            this.setState({
                showAssessmentPopup: value
            });
        }
    }

    /**Assessment Dropdown Functions */
    /*** @description - This function is to handle the Assessment type change*/
    handleAssessmentTypeChange = (usageType, e) => {
        const isElmLearnosity = (this.state.elementType == PUF || this.state.elementType == LEARNOSITY) ? true : false
        if (isElmLearnosity && this.state.assessmentId && this.state.activeAsseessmentUsageType !== usageType) {
            let usageTypeList = this.props?.assessmentReducer?.usageTypeListData;
            const { assessmentReducer } = this.props;
            const { assessmentId } = this.state
            const newAssessmentData = assessmentReducer[assessmentId]
            const updatedUsageType = usageTypeList && usageTypeList.find((type) => type.label === usageType)
            if (newAssessmentData?.intendedUsage.length>0 && !(newAssessmentData.intendedUsage.includes(updatedUsageType?.usagetype))) {
                this.setState({
                    changeUsageTypePopup: true,
                    updatedUsageType: usageType
                });
            }
            else if (this.state.activeAsseessmentUsageType !== usageType) {
                this.setChangeUsageType(usageType)
            }
        }
        else if (this.state.activeAsseessmentUsageType !== usageType) {
            this.setChangeUsageType(usageType)
        }
        this.setState({
            asseessmentUsageTypeDropdown: false
        })
    }


    setChangeUsageType = (usageType) => {
        this.setState({
            activeAsseessmentUsageType: usageType,
            openUsageDropdown: false,
            openAssessmentDropdown: false,
            changeUsageTypePopup: false
        }, () => {
            this.saveAssessment();
        })
    }
    /**
     * @description This function is used to toggle changeUsageTypePopup
     * @param {*} toggleValue Boolean value
     * @param {*} event event object
     */
    togglechangeUsageTypePopup = (toggleValue, event) => {
        if (event) {
            event.preventDefault();
        }
        this.setState({
            changeUsageTypePopup: toggleValue
        })
        this.showCanvasBlocker(toggleValue);
    }
    /**@description -shows changeUsageType Popup when you select other UsageTypes in Final Slate */
    showChangeUsageTypePopup = () => {
        this.showCanvasBlocker(true);
        if(this.state.changeUsageTypePopup){
            return (
                <PopUp
                    togglePopup={this.handleChangeUsageTypePopup}
                    dialogText={CHANGE_USAGE_TYPE}
                    warningHeaderText={`Warning`}
                    lOPopupClass="lo-warning-txt"
                    UsagePopup={true}
                    proceedButton={'Proceed'}
                    agree={this.updateUsageTypeAfterProceed}
                    savedValue={this.state.updatedUsageType}
                />
            )
        }
        return null
    }

    updateUsageTypeAfterProceed = (flag,evt) =>{
        this.prohibitPropagation(evt);
        this.showCanvasBlocker(false);
        if(flag){
            const usageType = this.state.updatedUsageType
            this.setChangeUsageType(usageType)
        }
    }
    /**@description handles cancel in changeUsageType Popup */
    handleChangeUsageTypePopup = (toggleValue,evt) => {
        this.prohibitPropagation(evt);
        this.showCanvasBlocker(toggleValue);
        this.setState({
            changeUsageTypePopup: toggleValue,
        })
    }




    /*** @description - This function is to toggle the Assessment Dropdown menu*/
    toggleUsageTypeDropdown = () => {
        this.setState({
            asseessmentUsageTypeDropdown: !this.state.asseessmentUsageTypeDropdown
        });
    }

    /*** @description - This function is to handle Focus on the Assessment element on click*/

    handleAssessmentFocus = (event) => {
        if(event){
            event.stopPropagation();
        }
        this.props.handleFocus();
    }
    /*** @description - This function is to handle Blur on the Assessment element on blur*/
    handleAssessmentBlur = () =>{
        this.props.handleBlur("","",this.props.index);
    }
    /*** @description - This function will be called to save the assessment data */
    saveAssessment = (cb) => {
        if ((this.state.elementType == PUF || this.state.elementType == LEARNOSITY)) {
            this.props.handleBlur("", "", this.props.index, "", "fromEmbeddedAssessment");
        } else {
            this.props.handleBlur("", "", this.props.index);
        }
        this.props.handleFocus();
        if (cb) {
            cb();
        }
    }
    /*** @description - This function is to close CITE/TDX PopUp
  */
    closeWindowAssessment = () => {
            this.setState({
                showAssessmentPopup: false,
                showSinglePopup:false,
            });
            hideTocBlocker();
            disableHeader(false);
            this.props.setCurrentCiteTdx({});
            this.props.setCurrentInnerCiteTdx({});
            this.props.showBlocker(false);
    }
    assessmentNavigateBack = () => {
        this.props.setCurrentInnerCiteTdx({});
        if(this.state.openedFrom === "singleAssessment"){
            this.props.setCurrentCiteTdx({});
        }
        this.setState({
            showAssessmentPopup: true,
            showSinglePopup:false,
            openedFrom:''
        });
    }
    /***
    *  @description - This is the function to add CITE/TDX to Embedded-Assessment
    * @param citeTdxObj - The object contains data about CITE/TDX Assessment
    */
    addCiteTdxAssessment = (citeTdxObj, parentPageNo=1) => {
        showTocBlocker();
        disableHeader(true);
        if (citeTdxObj && citeTdxObj.title) {
            citeTdxObj.title = specialCharacterDecode(citeTdxObj.title)
        }
        if(citeTdxObj.slateType === "singleSlateAssessment"){
            this.setState({
                showSinglePopup: true,
                setCurrentAssessment: citeTdxObj,
                showAssessmentPopup:false,
                parentPageNo
            })
        }
        else {
            this.setState({ assessmentId: citeTdxObj.id, assessmentItemId: citeTdxObj.singleAssessmentID.versionUrn, assessmentTitle: specialCharacterDecode(citeTdxObj.title), assessmentItemTitle: specialCharacterDecode(citeTdxObj.singleAssessmentID.name) },
                () => {
                    let oldAssessmentId = this.props.model.figuredata.elementdata.assessmentid
                    this.saveAssessment(() => {
                        if (oldAssessmentId && oldAssessmentId !== citeTdxObj.id) {
                            let data = [oldAssessmentId, citeTdxObj.id]
                            this.props.checkEntityUrn(data)
                        }
                    });
                })
        }
    }

    /***
    * @description - This is the function to add embedded-assessment based on assessment-format
    * @param e - The event triggered
    */
    addAssessmentResource = (e) => {
        this.prohibitPropagation(e);
        if (this.props.permissions && this.props.permissions.includes('quad_linking_assessment') && !hasReviewerRole()) {
            if (this.state.elementType !== PUF && this.state.elementType !== LEARNOSITY) {
                this.toggleAssessmentPopup(e, true)
            } else {
                sendDataToIframe({
                    'type': TOGGLE_ELM_SPA,
                    'message': {
                        type: OPEN_ELM_PICKER,
                        usageType: this.state.activeAsseessmentUsageType,
                        elementType: this.state.elementType,
                        resourceType: Resource_Type.ASSESSMENT_ITEM,
                        elementUrn: this.props.model.id,
                        parentMatter: config.parentOfParentItem    // sending parent matter details to elm
                    }
                });
            }
        }
    }
    /** -------------------------------------ELM - Assessments-------------------------------------------- */


    /***
    *  @description - This is the function to add Elm/Learnosity to Embedded-Assessment
    * @param pufObj - The object contains data about Elm/Learnosity Assessment
    */
    addPufAssessment = (pufObj, cb) => {
        if(pufObj.elementUrn === this.props.elementId){

            let usageTypeList = this.props?.assessmentReducer?.usageTypeListData
            /**if (pufObj?.calledFrom == 'createElm' && pufObj.usagetype) {
                showTocBlocker();
                disableHeader(true);
                const updatedUsageType = usageTypeList && usageTypeList.find((type) => type.usagetype == pufObj.usagetype)
                this.setState({
                    activeAssessmentUsageType: updatedUsageType ? updatedUsageType.label : this.state.activeAssessmentUsageType
                });
            }*/
            this.setState({ assessmentId: pufObj.id, assessmentItemId: pufObj.itemid, assessmentTitle: pufObj.title, assessmentItemTitle: pufObj.itemTitle },
                () => {
                    const itemData = {
                        itemId: pufObj.itemid,
                        parentId: pufObj.id,
                        targetItemid: pufObj.itemid
                    }
                    const elmData = { targetId: pufObj.id }
                    this.props.fetchAssessmentMetadata('assessment', 'fromAddElm', elmData, itemData);
                    let oldAssessmentId = this.props.model.figuredata.elementdata.assessmentid;
                    this.saveAssessment(() => {
                        if (oldAssessmentId && oldAssessmentId !== pufObj.id) {
                            let data = [oldAssessmentId, pufObj.id]
                            this.props.checkEntityUrn(data)
                        }
                    });
                })
            if (cb) {
                cb();
            }
            /* empty item data store(saved after getting post message from elm) after update call */
            this.props.setNewItemFromElm({});
            handlePostMsgOnAddAssess("", "", "", "remove", "");
        }
    }

    /*** @description - This function is to update ELM Assessment on Save Event from ELM Portal */
    updateElmOnSaveEvent = (props) => {
        const { assessmentReducer } = props;
        let latestTitle = (assessmentReducer[this.state.assessmentId] && assessmentReducer[this.state.assessmentId].assessmentTitle)
        const latestItem = assessmentReducer[this.state.assessmentId]?.items?.find( itemdata => itemdata.oldItemId == this.state.assessmentItemId)
        const latestItemId = latestItem && latestItem.latestItemId;
        const latestItemTitle = latestItem && latestItem.latestItemTitle;
        showTocBlocker();
        disableHeader(true);
        this.setState({ assessmentItemId: latestItemId, assessmentTitle: latestTitle, assessmentItemTitle: latestItemTitle }, () => this.saveAssessment(() => {
            disableHeader(false);
            hideTocBlocker(false);
        }))
    }

    /*** @description This function is to show Approved/Unapproved Status on AS */
    showElmVersionStatus = () => {
        let elmAssessment = this.props.assessmentReducer[this.state.assessmentId];
        if (elmAssessment) {
            return (<ElmUpdateButton
                elmAssessment={elmAssessment}
                updateElmVersion={this.updateElmAssessment}
                buttonText={ELM_UPDATE_BUTTON}
                embeddedElmClass={'embedded-assessment'}
                status={true}
                assessmentItem={true}
            />)
        }
    }

    /*** @description This function is used to open Version update Popup */
    openUpdateElmPopup = (event) => {
        this.prohibitPropagation(event);
        if (hasReviewerRole() || !(this.props.permissions && this.props.permissions.includes('elements_add_remove'))) {
            return true;
        }
        this.toggleUpdatePopup(true, event);
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
            showElmUpdatePopup: toggleValue
        })
        this.showCanvasBlocker(toggleValue);
    }


    /*** @description This function is used to handle Canvas Blocker on Update */
    showCanvasBlocker = (value) => {
        if (value == true) {
            showTocBlocker();
            hideToc();
        } else {
            hideTocBlocker(value);
        }
        disableHeader(value);
        this.props.showBlocker(value);
    }

    /*** @description This function is used to update elm assessment after click on update from Version update Popup */
    updateElmAssessment = async (event) => {
        this.showCanvasBlocker(false);
        let oldWorkUrn = this.state.assessmentId
        let itemData = {
            itemId: this.state.assessmentItemId,
            parentId: this.state.assessmentId,
            targetItemid: this.state.assessmentItemId
        }
        let oldReducerData = this.props.assessmentReducer[this.state.assessmentId];
        oldReducerData.targetId = this.state.assessmentId;
        await this.props.fetchAssessmentVersions(oldReducerData.assessmentEntityUrn, 'assessmentUpdate', oldReducerData.createdDate, oldReducerData, itemData);
        const latestReducerData = this.props.assessmentReducer[this.state.assessmentId]
        const { latestVersion, secondLatestVersion, items } = latestReducerData;
        const newVersion = (latestVersion && (latestVersion.status !== 'wip' || latestVersion.latestCleanVersion == false)) ? latestVersion : secondLatestVersion;
        const updatedItem = items && items.find(item => item.oldItemId == this.state.assessmentItemId)
        let updatedElmObj = {
            id: newVersion.id,
            itemid: updatedItem && updatedItem.latestItemId,
            title: latestVersion.title,
            itemtitle: updatedItem && updatedItem.latestItemTitle,
            usagetype: this.state.activeAsseessmentUsageType
        }
        this.updatePufAssessment(updatedElmObj, oldWorkUrn);
        disableHeader(false);
        hideTocBlocker(false);
    }

    /***
    *  @description - This is the function to add Elm/Learnosity to Embedded-Assessment
    * @param pufObj - The object contains data about Elm/Learnosity Assessment
    */
    updatePufAssessment = (pufObj, oldElmAssessmentId) => {
        showTocBlocker();
        disableHeader(true);
        const { assessmentItemAutoUpdateData } = this.props.assessmentReducer
        // checking if the data for update is already there in assessmentItemAutoUpdateData reducer
        const filteredAssessmentData = assessmentItemAutoUpdateData?.some((item) =>
        item.oldAssessmentId === oldElmAssessmentId &&
        item.newAssessmentId === pufObj.id);
        this.props.saveAutoUpdateData(oldElmAssessmentId, pufObj.id);
        // pushing the unique oldAssessmentId and newAssessmentId = pufObj.id in store
        if(!filteredAssessmentData){
            this.props.saveUpdatedAssessmentArray(oldElmAssessmentId, pufObj.id)
        }
        this.setState({ assessmentId: pufObj.id, assessmentItemId: pufObj.itemid, assessmentTitle: pufObj.title, assessmentItemTitle: pufObj.itemtitle },
            () => {
                this.saveAssessment();
            })
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
    /** ----------------------------------------------------------------------------------------------------------- */


    renderAssessmentHeader = (modelProps) => {
        const { assessmentTitle, assessmentId, assessmentItemTitle, assessmentItemId } = this.state;
        const { assessmentid, assessmentitemid, assessmentitemtitle } = modelProps.figuredata.elementdata;
        const headerJSX = <div className='assessment-metadata-container'>
            <div className='assessment-metadata title-field'><p className='single-assessment-title title-field'>TITLE: </p><span className='embedded-title'>{assessmentTitle}</span></div>
            <div className='assessment-metadata'><p className='single-assessment-title'>ID: </p><span className='embedded-id'>{assessmentId ? assessmentId : (assessmentid ? assessmentid : "")}</span></div>
            <div className='assessment-metadata title-field'><p className='single-assessment-title title-field'>ITEM TITLE: </p><span className='embedded-itemtitle'>{assessmentItemTitle ? assessmentItemTitle : (assessmentitemtitle ? assessmentitemtitle : "")}</span></div>
            <div className='assessment-metadata'><p className='single-assessment-title'>ITEM ID: </p><span className='embedded-itemid'>{assessmentItemId ? assessmentItemId : (assessmentitemid ? assessmentitemid : "")}</span></div>
        </div>
        return headerJSX;
    }
    /*** @description - This function is for handling the different types of figure-element.
    * @param model object that defined the type of element
    */
    renderAssessmentType = (model) => {
        var assessmentJSX;
        let assessmentKeys = setAssessmentProperties(this.state.elementType)
        let isElmStatus = checkElmAssessmentStatus(this.state.assessmentId, this.props);
        const { assessmentid } = model.figuredata.elementdata;
        const {assessmentItemId, assessmentId, activeAsseessmentUsageType, elementType } = this.state
        const oldReducerData = this.props.assessmentReducer[assessmentid]
        const assessmentCreatedDate = oldReducerData?.modifiedDate ? oldReducerData?.modifiedDate : ''
        /*JSX for the Single Assessment Element */
        assessmentJSX = <div className={`divAssessment ${assessmentKeys && assessmentKeys.divMainClass ? assessmentKeys.divMainClass : ""}`} >
            <figure className={`figureAssessment ${elementType !== TDX ? "figureAssessmentItem" : "figureTdxAssessmentItem"}`}>
                {this.state && model.figuredata.elementdata && this.renderAssessmentHeader(model)}
                <div className="singleAssessment_Dropdown_Container">
                    <div className="single-assessment-usagetype-container">
                        <div className="singleAssessment_Dropdown_SelectLabel">Select usage type<span className="required">*</span></div>
                        <div className={`singleAssessment_Dropdown_activeDropdown ${(elementType == PUF || elementType == LEARNOSITY) ? 'isElmUpdate' : ""}`} onClick={!hasReviewerRole() && this.toggleUsageTypeDropdown} >
                            <span className="singleAssessment_Dropdown_currentLabel">{activeAsseessmentUsageType ? activeAsseessmentUsageType : 'Select'}</span>
                            <span className="singleAssessment_Dropdown_arrow">{dropdownArrow}</span>
                            {
                                this.state.asseessmentUsageTypeDropdown ? (
                                    <ul className="slate_assessment_type_dropdown_options">
                                        {<UsageTypeDropdown usageTypeList={this.props.usageTypeList} clickHandlerFn={this.handleAssessmentTypeChange} />}
                                    </ul>
                                ) : null
                            }
                        </div>
                    </div >
                </div>
                {oldReducerData && <div className="embedded-assessment-status">
                    <div className={`${isElmStatus == true ? "has-update" : ""}`}>{(elementType == PUF || elementType == LEARNOSITY) && this.showElmVersionStatus()}</div>
                    <div className="assessment-dateModified assessmentItem_Timestamp">
                        <span className='last-updated-time'>|</span>
                        <div className="embedded-assessment-time">
                            <div className='last-updated-time time-updated-embedded'>Last Updated:</div>
                            <div className='last-updated-time-format time-updated-embedded'>{assessmentCreatedDate ? moment(assessmentCreatedDate).format('DD MMM YYYY, hh:mmA') : ''}</div>
                        </div>
                    </div>
                </div>}
                <div className={`pearson-component ${assessmentKeys && assessmentKeys.assessmentItemType ? assessmentKeys.assessmentItemType : ""}`}
                    data-type={assessmentKeys && assessmentKeys.assessmentItemType ? assessmentKeys.assessmentItemType : ""}
                    data-assessment={assessmentId ? assessmentId : (model.figuredata.elementdata ? model.figuredata.elementdata.assessmentid : "")}
                    data-assessment-item={assessmentItemId ? assessmentItemId : (model.figuredata.elementdata ? model.figuredata.elementdata.assessmentitemid : "")}
                    data-item-type={elementType !== TDX ? "assessmentItem" : "tdxAssessmentItem"}
                    onClick={(e) => activeAsseessmentUsageType ? this.addAssessmentResource(e) : null}>
                    <img src={DEFAULT_ASSESSMENT_SOURCE} data-src={DEFAULT_ASSESSMENT_SOURCE}
                        title="View Image" alt="" className={`imageTextWidth lazyloaded imageeee ${activeAsseessmentUsageType ? "" : "default-img"}`}></img>
                </div>
            </figure>

        </div>
        return assessmentJSX;
    }

    render() {
        const { model, index } = this.props;
        return (
            <div className="figureElement" onClick = {this.handleAssessmentFocus}>
                {this.renderAssessmentType(model, index)}
                {this.state.changeUsageTypePopup && this.showChangeUsageTypePopup()}
                {this.state.showAssessmentPopup? <RootCiteTdxComponent openedFrom = {'singleSlateAssessment'} closeWindowAssessment = {()=>this.closeWindowAssessment()} assessmentType = {this.state.elementType== CITE ? CITE : TDX} addCiteTdxFunction = {this.addCiteTdxAssessment} usageTypeMetadata = {this.state.activeAsseessmentUsageType} parentPageNo={this.state.parentPageNo} isReset={this.state.isReset} resetPage={this.resetPage} AssessmentSearchTitle={this.AssessmentSearchTitle} searchTitle={this.state.searchTitle} filterUUID={this.state.filterUUID} />:""}
                {this.state.showSinglePopup ? <RootSingleAssessmentComponent setCurrentAssessment ={this.state.setCurrentAssessment} activeAssessmentType={this.state.activeAssessmentType} openedFrom = {'singleSlateAssessmentInner'} closeWindowAssessment = {()=>this.closeWindowAssessment()} assessmentType = {this.state.activeAssessmentType} addCiteTdxFunction = {this.addCiteTdxAssessment} usageTypeMetadata = {this.state.activeAsseessmentUsageType} assessmentNavigateBack = {this.assessmentNavigateBack} resetPage={this.resetPage}/>:""}
            </div>
        );
    }
}

ElementSingleAssessment.displayName = "ElementSingleAssessment"
ElementSingleAssessment.defaultProps = {
    /** Detail of element in JSON object */
    model: PropTypes.object,
    /** index of element  */
    index: PropTypes.string,
    /** element id of the element */
    elementId: PropTypes.string
}

ElementSingleAssessment.propTypes = {
    /** Handler to return the type of element based on the figuretype and alignment */
    renderFigureType: PropTypes.func,
    /** Handler to return the type of assessment based on the usagetype*/
    handleAssessmentTypeChange: PropTypes.func,
    /** Handler to toggle the dropdown menu of usage type */
    toggleUsageTypeDropdown: PropTypes.func,
    /** Handler to toggle the assessment pop-up */
    toggleAssessmentPopup: PropTypes.func,
    /** Handler to Add C2 -Media to the assessment*/
    handleC2AssessmentClick: PropTypes.func,
    /** Detail of element in JSON object */
}

const mapStateToProps = state => {
    return {
        usageTypeList: state.appStore.usageTypeListData.usageTypeList,
        assessmentReducer: state.assessmentReducer,
    };
};

const mapActionToProps = {
    setCurrentCiteTdx: setCurrentCiteTdx,
    setCurrentInnerCiteTdx: setCurrentInnerCiteTdx,
    assessmentSorting: assessmentSorting,
    checkEntityUrn:checkEntityUrn,
    fetchAssessmentMetadata: fetchAssessmentMetadata,
    updateAssessmentVersion: updateAssessmentVersion,
    saveAutoUpdateData: saveAutoUpdateData,
    fetchAssessmentVersions: fetchAssessmentVersions,
    setElmPickerData: setElmPickerData,
    setNewItemFromElm: setNewItemFromElm,
    saveUpdatedAssessmentArray: saveUpdatedAssessmentArray
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(ElementSingleAssessment);