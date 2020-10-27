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
import { CITE, TDX } from '../AssessmentSlateCanvas/AssessmentSlateConstants.js';
import RootSingleAssessmentComponent from '../AssessmentSlateCanvas/singleAssessmentCiteTdx/RootSingleAssessmentComponent.jsx'
import { setCurrentCiteTdx, setCurrentInnerCiteTdx, assessmentSorting, specialCharacterDecode } from '../AssessmentSlateCanvas/assessmentCiteTdx/Actions/CiteTdxActions';
import RootElmComponent from '../AssessmentSlateCanvas/elm/RootElmComponent.jsx';
import { setAssessmentTitle, setAssessmentUsageType, setAssessmentProperties } from '../AssessmentSlateCanvas/AssessmentActions/assessmentUtility.js';
import { resetElmStore } from '../AssessmentSlateCanvas/elm/Actions/ElmActions.js';
import PopUp from '../PopUp';
import ElmUpdateButton from '../AssessmentSlateCanvas/ElmUpdateButton.jsx'
import { DEFAULT_ASSESSMENT_SOURCE } from '../../constants/Element_Constants.js';
import { PUF, LEARNOSITY, ELM_UPDATE_BUTTON, ELM_UPDATE_POPUP_HEAD, ELM_UPDATE_MSG } from '../AssessmentSlateCanvas/AssessmentSlateConstants.js';
import { checkAssessmentStatus, updateAssessmentVersion, checkEntityUrn } from '../AssessmentSlateCanvas/AssessmentActions/assessmentActions.js';

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
            assessmentTitle: this.props.model && setAssessmentTitle(this.props.model),
            elementType: this.props.model.figuredata.elementdata.assessmentformat || "",
            showElmComponent: false,
            showSinglePopup:false,
            setCurrentAssessment:{},
            parentPageNo:1,
            isReset: false,
            searchTitle : '',
            filterUUID : '',
            openedFrom:''
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

    componentDidUpdate(prevProps) {
        const { assessmentReducer } = this.props
        if (this.state.elementType == PUF &&
            (this.state.assessmentId && assessmentReducer && assessmentReducer[this.state.assessmentId] && assessmentReducer[this.state.assessmentId].items)) {
            let latestItemId = assessmentReducer[this.state.assessmentId].items && assessmentReducer[this.state.assessmentId].items[this.state.assessmentItemId]
            if ((assessmentReducer[this.state.assessmentId].showUpdateStatus == false && (latestItemId && this.state.assessmentItemId != latestItemId)) || (this.state.assessmentTitle != assessmentReducer[this.state.assessmentId].assessmentTitle)) {
                this.updateElmOnSaveEvent(this.props);
            }
        }
    }

    componentDidMount() {
        let title = this.props.model && setAssessmentTitle(this.props.model) != null ? setAssessmentTitle(this.props.model).replace(/<\/?[^>]+(>|$)/g, "") : null;
        this.setState({
            assessmentTitle: title,
            activeAsseessmentUsageType: this.props.model && setAssessmentUsageType(this.props.model),
            assessmentId: this.props.model && this.props.model.figuredata && this.props.model.figuredata.elementdata && this.props.model.figuredata.elementdata.assessmentid ? this.props.model.figuredata.elementdata.assessmentid : null,
            assessmentItemId: this.props.model && this.props.model.figuredata && this.props.model.figuredata.elementdata && this.props.model.figuredata.elementdata.assessmentitemid ? this.props.model.figuredata.elementdata.assessmentitemid : null
        })
        let newElement = localStorage.getItem('newElement');
        if (newElement) {
            localStorage.removeItem('newElement');
            setTimeout(() => {
                this.handleAssessmentFocus();
            }, 0)
        }
        // /** PCAT-8907 - Updating Embedded Assessments - Elm */
        // let { model } = this.props
        // // let embeddedAssessment = model.type == elementTypeConstant.FIGURE && model.figuretype == elementTypeConstant.FIGURE_ASSESSMENT && element.figuredata && element.figuredata.elementdata && element.figuredata.elementdata.assessmentformat == 'puf' && element.figuredata.elementdata.assessmentid ? true : false;
        // if (this.props.model) {
        //     let itemData = {
        //         itemId: this.props.model && this.props.model.figuredata && this.props.model.figuredata.elementdata && this.props.model.figuredata.elementdata.assessmentitemid,
        //         parentId: this.props.model && this.props.model.figuredata && this.props.model.figuredata.elementdata && this.props.model.figuredata.elementdata.assessmentid,
        //         type: 'assessment-item',
        //     }
        //     this.props.checkAssessmentStatus(model.figuredata.elementdata.assessmentid, 'fromElementContainer', "", "", itemData)
        // }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if ('model' in nextProps && 'figuredata' in nextProps.model && 'elementdata' in nextProps.model.figuredata && 'assessmentformat' in nextProps.model.figuredata.elementdata && nextProps.model.figuredata.elementdata.assessmentformat !== prevState.elementType) {
            let title = setAssessmentTitle(nextProps.model) != null ? setAssessmentTitle(nextProps.model).replace(/<\/?[^>]+(>|$)/g, "") : null;
            return {
                assessmentId: nextProps.model.figuredata && nextProps.model.figuredata.elementdata && nextProps.model.figuredata.elementdata.assessmentid ? nextProps.model.figuredata.elementdata.assessmentid : "",
                assessmentItemId: nextProps.model.figuredata && nextProps.model.figuredata.elementdata && nextProps.model.figuredata.elementdata.assessmentitemid ? nextProps.model.figuredata.elementdata.assessmentitemid : "",
                assessmentTitle: title,
                elementType: nextProps.model.figuredata.elementdata.assessmentformat || ""
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
                "versionUrn": this.state.assessmentItemId
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
       if (this.state.activeAsseessmentUsageType !== usageType) {
            this.setState({
                activeAsseessmentUsageType: usageType
            },()=>{
                this.saveAssessment();
            });
        }
            this.setState({
                asseessmentUsageTypeDropdown: false,
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
        if (this.state.elementType == PUF) {
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
        else{
            this.setState({ assessmentId: citeTdxObj.id, assessmentItemId: citeTdxObj.singleAssessmentID.versionUrn, assessmentTitle: specialCharacterDecode(citeTdxObj.title) },
                () => {
                    let oldAssessmentId = this.props.model.figuredata.elementdata.assessmentid
                    this.saveAssessment(() => {
                        if (oldAssessmentId !== citeTdxObj.id) {
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
        if (this.props.permissions && this.props.permissions.includes('quad_linking_assessment') && !hasReviewerRole()) {
            if (this.state.elementType !== PUF && this.state.elementType !== LEARNOSITY) {
                this.toggleAssessmentPopup(e, true)
            } else {
                this.setState({
                    showElmComponent: true
                })
                sendDataToIframe({ 'type': 'hideToc', 'message': {} });
                showTocBlocker(true);
                disableHeader(true);
                this.props.showBlocker(true);
            }
        }
    }
    /** -------------------------------------ELM - Assessments-------------------------------------------- */

    /*** @description - This function is to close ELM PopUp */
    closeElmWindow = () => {
        this.setState({
            showElmComponent: false
        });
        hideTocBlocker(false);
        disableHeader(false);
        this.props.showBlocker(false);
        this.props.resetElmStore();
    }

    /***
    *  @description - This is the function to add Elm/Learnosity to Embedded-Assessment
    * @param pufObj - The object contains data about Elm/Learnosity Assessment
    */
    addPufAssessment = (pufObj, cb) => {
        showTocBlocker();
        disableHeader(true);
        this.setState({ assessmentId: pufObj.id, assessmentItemId: pufObj.itemid, assessmentTitle: pufObj.title },
            () => {
                let itemData = {
                    itemId: pufObj.itemid,
                    parentId: pufObj.id,
                    type: 'assessment-item',
                }
                this.props.checkAssessmentStatus(pufObj.id, 'fromAddElm',"","",itemData);
                let oldAssessmentId = this.props.model.figuredata.elementdata.assessmentid;
                this.saveAssessment(() => {
                    if (oldAssessmentId !== pufObj.id) {
                        let data = [oldAssessmentId, pufObj.id]
                        this.props.checkEntityUrn(data)
                    }
                });
            })
        if (cb) {
            cb();
        }
    }

    /*** @description - This function is to update ELM Assessment on Save Event from ELM Portal */
    updateElmOnSaveEvent = (props) => {
        const { assessmentReducer } = props;
        let latestItemId = (assessmentReducer[this.state.assessmentId].items && assessmentReducer[this.state.assessmentId].items[this.state.assessmentItemId])
        let latestTitle = (assessmentReducer[this.state.assessmentId] && assessmentReducer[this.state.assessmentId].assessmentTitle)
        showTocBlocker();
        disableHeader(true);
        this.setState({ assessmentItemId: latestItemId, assessmentTitle: latestTitle }, () => this.saveAssessment(() => {
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
                updateElmVersion={this.openUpdateElmPopup}
                buttonText={ELM_UPDATE_BUTTON}
                embeddedElmClass={'embedded-assessment'}
            />)
        }
    }

    /*** @description This function is used to open Version update Popup */
    openUpdateElmPopup = (event) => {
        if (hasReviewerRole() || !(this.props.permissions && this.props.permissions.includes('elements_add_remove'))) {
            return true;
        }
        this.toggleUpdatePopup(true, event);
        event.stopPropagation();
    }

    /**
     * @description This function is used to toggle update elm popup
     * @param {*} toggleValue Boolean value
     * @param {*} event event object
     */
    toggleUpdatePopup = (toggleValue, event) => {
        this.setState({
            showElmUpdatePopup: toggleValue
        })
        this.showCanvasBlocker(toggleValue);
        this.prohibitPropagation(event)
    }

    /*** @description This function is used to render Version update Popup */
    showCustomPopup = () => {
        if (this.state.showElmUpdatePopup) {
            this.showCanvasBlocker(true)
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
        this.toggleUpdatePopup(false, event);
        this.showCanvasBlocker(false);
        let oldWorkUrn = this.state.assessmentId
        let itemData = {
            itemId: this.state.assessmentItemId,
            parentId: this.state.assessmentId,
            type: 'assessment-item',
        }
        await this.props.checkAssessmentStatus(this.props.assessmentReducer[this.state.assessmentId].latestWorkUrn, 'fromUpdate', this.state.assessmentId, "", itemData)
        const { latestWorkUrn, assessmentTitle, items } = this.props.assessmentReducer[this.state.assessmentId];
        let updatedElmObj = {
            id: latestWorkUrn,
            itemid: items[this.state.assessmentItemId],
            title: assessmentTitle,
            usagetype: this.state.activeAsseessmentUsageType
        }
        if (latestWorkUrn != this.state.assessmentId) {
            updatedElmObj.title = this.props.assessmentReducer[latestWorkUrn].assessmentTitle
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
        this.setState({ assessmentId: pufObj.id, assessmentItemId: pufObj.itemid, assessmentTitle: pufObj.title },
            () => {
                this.saveAssessment(() => this.props.updateAssessmentVersion(oldElmAssessmentId, this.state.assessmentId));
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

    /*** @description - This function is for handling the different types of figure-element.
    * @param model object that defined the type of element
    */
    renderAssessmentType = (model) => {
        var assessmentJSX;
        let assessmentKeys = setAssessmentProperties(this.state.elementType)
        /*JSX for the Single Assessment Element */
        assessmentJSX = <div className={`divAssessment ${assessmentKeys && assessmentKeys.divMainClass ? assessmentKeys.divMainClass : ""}`} >
            <figure className={`figureAssessment ${this.state.elementType !== "tdx" ? "figureAssessmentItem" : "figureTdxAssessmentItem"}`}>
                <header>
                    <h4 className={this.state.elementType !== "tdx" ? "heading4AssessmentItemNumberLabel" : "heading4TdxAssessmentItemNumberLabel"} id="single_assessment_title">{(this.state.elementType !== PUF && this.state.elementType !== LEARNOSITY) ? "" : "Assessment Title:"}{this.state.assessmentTitle}</h4>
                </header>
                <div className="singleAssessmentIdInfo" ><strong>{(this.state.elementType !== PUF && this.state.elementType !== LEARNOSITY) ? "ID: " : "Product ID: "}</strong>{this.state.assessmentId ? this.state.assessmentId : (model.figuredata.elementdata ? model.figuredata.elementdata.assessmentid : "")}</div>
                <div className={`singleAssessmentItemIdInfo ${(this.state.elementType !== LEARNOSITY)? '':'puf-assessment-id'}`} ><strong>ITEM ID: </strong>{this.state.assessmentItemId?this.state.assessmentItemId:(model.figuredata.elementdata ? model.figuredata.elementdata.assessmentitemid : "")}</div>                      
                {/* <div className={`singleAssessmentItemIdInfo ${(this.state.elementType !== PUF && this.state.elementType !== LEARNOSITY)? '':'puf-assessment-id'}`} ><strong>ITEM ID: </strong>{this.state.assessmentItemId?this.state.assessmentItemId:(model.figuredata.elementdata ? model.figuredata.elementdata.assessmentitemid : "")}</div>                              */}
                <div className="singleAssessment_Dropdown_Container">
                    <div className="single-assessment-usagetype-container">
                        <div className="singleAssessment_Dropdown_SelectLabel">Select usage type<span className="required">*</span></div>
                        <div className={`singleAssessment_Dropdown_activeDropdown ${this.state.elementType == PUF ? 'isElmUpdate' : ""}`} onClick={!hasReviewerRole() && this.toggleUsageTypeDropdown} >
                            <span className="singleAssessment_Dropdown_currentLabel">{this.state.activeAsseessmentUsageType ? this.state.activeAsseessmentUsageType : 'Select'}</span>
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
                    <div className="single-assessment-elm-update-container">{this.state.elementType == PUF && this.showElmVersionStatus()}</div>

                </div>

                <div className={`pearson-component ${assessmentKeys && assessmentKeys.assessmentItemType ? assessmentKeys.assessmentItemType : ""}`}
                    data-type={assessmentKeys && assessmentKeys.assessmentItemType ? assessmentKeys.assessmentItemType : ""}
                    data-assessment={this.state.assessmentId ? this.state.assessmentId : (model.figuredata.elementdata ? model.figuredata.elementdata.assessmentid : "")}
                    data-assessment-item={this.state.assessmentItemId ? this.state.assessmentItemId : (model.figuredata.elementdata ? model.figuredata.elementdata.assessmentitemid : "")}
                    data-item-type={this.state.elementType !== "tdx" ? "assessmentItem" : "tdxAssessmentItem"}
                    onClick={(e) => this.state.activeAsseessmentUsageType ? this.addAssessmentResource(e) : null}>
                    <img src={DEFAULT_ASSESSMENT_SOURCE} data-src={DEFAULT_ASSESSMENT_SOURCE}
                        title="View Image" alt="" className={`imageTextWidth lazyloaded imageeee ${this.state.activeAsseessmentUsageType ? "" : "default-img"}`}></img>
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
                {this.state.showElmUpdatePopup && this.showCustomPopup()}
                {this.state.showAssessmentPopup? <RootCiteTdxComponent openedFrom = {'singleSlateAssessment'} closeWindowAssessment = {()=>this.closeWindowAssessment()} assessmentType = {this.state.elementType== CITE ? CITE : TDX} addCiteTdxFunction = {this.addCiteTdxAssessment} usageTypeMetadata = {this.state.activeAsseessmentUsageType} parentPageNo={this.state.parentPageNo} isReset={this.state.isReset} resetPage={this.resetPage} AssessmentSearchTitle={this.AssessmentSearchTitle} searchTitle={this.state.searchTitle} filterUUID={this.state.filterUUID} />:""}
                {this.state.showSinglePopup ? <RootSingleAssessmentComponent setCurrentAssessment ={this.state.setCurrentAssessment} activeAssessmentType={this.state.activeAssessmentType} openedFrom = {'singleSlateAssessmentInner'} closeWindowAssessment = {()=>this.closeWindowAssessment()} assessmentType = {this.state.activeAssessmentType} addCiteTdxFunction = {this.addCiteTdxAssessment} usageTypeMetadata = {this.state.activeAssessmentUsageType} assessmentNavigateBack = {this.assessmentNavigateBack} resetPage={this.resetPage}/>:""}     
                {this.state.showElmComponent? <RootElmComponent activeAssessmentType={this.state.elementType} closeElmWindow={() => this.closeElmWindow()} addPufFunction={this.addPufAssessment} activeUsageType={this.state.activeAssessmentUsageType} elementType={model.figuretype}/> : ''}
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
        assessmentReducer: state.assessmentReducer
    };
};

const mapActionToProps = {
    setCurrentCiteTdx: setCurrentCiteTdx,
    setCurrentInnerCiteTdx: setCurrentInnerCiteTdx,
    assessmentSorting: assessmentSorting,
    resetElmStore: resetElmStore,
    checkEntityUrn:checkEntityUrn,
    checkAssessmentStatus: checkAssessmentStatus,
    updateAssessmentVersion: updateAssessmentVersion
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(ElementSingleAssessment);