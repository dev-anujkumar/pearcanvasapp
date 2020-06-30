// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// IMPORT - Assets //
import './../../styles/ElementSingleAssessment/ElementSingleAssessment.css';
import { dropdownArrow } from './../../images/ElementButtons/ElementButtons.jsx';
import { connect } from 'react-redux';
import { showTocBlocker, hideTocBlocker, disableHeader } from '../../js/toggleLoader';
import { hasReviewerRole, sendDataToIframe } from '../../constants/utility.js';
import { UsageTypeDropdown } from '../AssessmentSlateCanvas/UsageTypeDropdown/UsageTypeDropdown.jsx';
import RootCiteTdxComponent from '../AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.jsx';
import { FULL_ASSESSMENT_CITE, FULL_ASSESSMENT_TDX } from '../AssessmentSlateCanvas/AssessmentSlateConstants.js';
import RootSingleAssessmentComponent from '../AssessmentSlateCanvas/singleAssessmentCiteTdx/RootSingleAssessmentComponent.jsx'
import { setCurrentCiteTdx, setCurrentInnerCiteTdx, assessmentSorting, specialCharacterDecode } from '../AssessmentSlateCanvas/assessmentCiteTdx/Actions/CiteTdxActions';
import RootElmSingleAssessment from '../AssessmentSlateCanvas/elm/RootElmSingleComponent.jsx'
import { setAssessmentTitle, setAssessmentUsageType, setAssessmentProperties } from '../AssessmentSlateCanvas/AssessmentActions/assessmentUtility.js';

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
        this.setState({searchTitle, filterUUID},()=>{
            console.log("SetState for filter", searchTitle + filterUUID)
        });
    }

    componentDidMount() {
        let title = this.props.model && setAssessmentTitle(this.props.model) != null?  setAssessmentTitle(this.props.model).replace(/<\/?[^>]+(>|$)/g,""): null;
        this.setState({
            assessmentTitle: title,
            activeAsseessmentUsageType: this.props.model && setAssessmentUsageType(this.props.model),
            assessmentId: this.props.model && this.props.model.figuredata && this.props.model.figuredata.elementdata && this.props.model.figuredata.elementdata.assessmentid ? this.props.model.figuredata.elementdata.assessmentid : null,
            assessmentItemId: this.props.model && this.props.model.figuredata && this.props.model.figuredata.elementdata && this.props.model.figuredata.elementdata.assessmentitemid ? this.props.model.figuredata.elementdata.assessmentitemid : null
        })
        let newElement = localStorage.getItem('newElement');
        if (newElement) {
            setTimeout(() => {
                this.handleAssessmentFocus();
                localStorage.removeItem('newElement');
            }, 0)
        }
    }
    
static getDerivedStateFromProps(nextProps, prevState) {

    if('model' in nextProps && 'figuredata' in nextProps.model && 'elementdata' in nextProps.model.figuredata && 'assessmentformat' in nextProps.model.figuredata.elementdata && nextProps.model.figuredata.elementdata.assessmentformat !== prevState.elementType) {
        let title = setAssessmentTitle(nextProps.model) != null?  setAssessmentTitle(nextProps.model).replace(/<\/?[^>]+(>|$)/g,""): null;
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
    handleAssessmentFocus = () => {
        this.props.handleFocus();
    }
    /*** @description - This function is to handle Blur on the Assessment element on blur*/       
    handleAssessmentBlur = () =>{
        this.props.handleBlur("","",this.props.index);
    }
    /*** @description - This function will be called to save the assessment data */
    saveAssessment = () =>{ 
            this.props.handleBlur("","",this.props.index);
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
                    this.saveAssessment();
                })
        }
       
    }


    /*** @description - This function is to close ELM PopUp */
    closeElmWindow = () => {
        this.setState({
            showElmComponent: false
        });
        hideTocBlocker(false);
        disableHeader(false);
        this.props.showBlocker(false);
    }

    /***
    *  @description - This is the function to add PUF to Embedded-Assessment  
    * @param pufObj - The object contains data about PUF Assessment 
    */
    addPufAssessment = (pufObj) => {
        showTocBlocker();
        disableHeader(true);
        this.setState({ assessmentId: pufObj.id, assessmentItemId: pufObj.itemid, assessmentTitle: pufObj.title },
            () => {
                this.saveAssessment();
            })
    }

    /***
    * @description - This is the function to add embedded-assessment based on assessment-format
    * @param e - The event triggered
    */
    addAssessmentResource = (e) => {
        if(this.props.permissions && this.props.permissions.includes('quad_linking_assessment') && !hasReviewerRole()){
            if (this.state.elementType !== "puf" && this.state.elementType !== "learnosity") {
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
                    <h4 className={this.state.elementType !== "tdx" ? "heading4AssessmentItemNumberLabel" : "heading4TdxAssessmentItemNumberLabel"} id="single_assessment_title">{(this.state.elementType !== "puf" && this.state.elementType !== "learnosity") ? "" : "Assessment Title:"}{this.state.assessmentTitle}</h4>
                </header>
                <div className="singleAssessmentIdInfo" ><strong>{(this.state.elementType !== "puf" && this.state.elementType !== "learnosity") ? "ID: " : "Product ID: "}</strong>{this.state.assessmentId ? this.state.assessmentId : (model.figuredata.elementdata ? model.figuredata.elementdata.assessmentid : "")}</div>
                <div className={`singleAssessmentItemIdInfo ${(this.state.elementType !== "puf" && this.state.elementType !== "learnosity")? '':'puf-assessment-id'}`} ><strong>ITEM ID: </strong>{this.state.assessmentItemId?this.state.assessmentItemId:(model.figuredata.elementdata ? model.figuredata.elementdata.assessmentitemid : "")}</div>                             
                <div className="singleAssessment_Dropdown_Container">
                    <div className="singleAssessment_Dropdown_SelectLabel">Select usage type</div>
                    <div className={this.state.asseessmentUsageTypeDropdown ? "singleAssessment_Dropdown_activeDropdown select" : "singleAssessment_Dropdown_activeDropdown notselect"} onClick={ !hasReviewerRole() && this.toggleUsageTypeDropdown} >
                        <span className="singleAssessment_Dropdown_currentLabel">{this.state.activeAsseessmentUsageType?this.state.activeAsseessmentUsageType:'Quiz'}</span>
                        <span className="singleAssessment_Dropdown_arrow">{dropdownArrow}</span>
                    </div>

                </div>
                {
                    this.state.asseessmentUsageTypeDropdown ? (
                        <ul className="singleAssessment_Dropdown_options">
                            {<UsageTypeDropdown usageTypeList={this.props.usageTypeList} clickHandlerFn={this.handleAssessmentTypeChange} />}
                        </ul>
                    ) : null
                }

                <div className={`pearson-component ${assessmentKeys && assessmentKeys.assessmentItemType ? assessmentKeys.assessmentItemType : ""}`}
                    data-type={assessmentKeys && assessmentKeys.assessmentItemType ? assessmentKeys.assessmentItemType : ""}
                    data-assessment={this.state.assessmentId ? this.state.assessmentId : (model.figuredata.elementdata ? model.figuredata.elementdata.assessmentid : "")}
                    data-assessment-item={this.state.assessmentItemId ? this.state.assessmentItemId : (model.figuredata.elementdata ? model.figuredata.elementdata.assessmentitemid : "")}
                    data-item-type={this.state.elementType !== "tdx" ? "assessmentItem" : "tdxAssessmentItem"}
                    onClick={(e) => this.addAssessmentResource(e)}>
                    <img src="https://cite-media-stg.pearson.com/legacy_paths/8efb9941-4ed3-44a3-8310-1106d3715c3e/FPO-assessment.png"
                        data-src="https://cite-media-stg.pearson.com/legacy_paths/8efb9941-4ed3-44a3-8310-1106d3715c3e/FPO-assessment.png"
                        title="View Image" alt="" className="imageTextWidth lazyloaded imageeee"></img>
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
                {this.state.showAssessmentPopup? <RootCiteTdxComponent openedFrom = {'singleSlateAssessment'} closeWindowAssessment = {()=>this.closeWindowAssessment()} assessmentType = {this.state.elementType=="cite"?FULL_ASSESSMENT_CITE:FULL_ASSESSMENT_TDX} addCiteTdxFunction = {this.addCiteTdxAssessment} usageTypeMetadata = {this.state.activeAsseessmentUsageType} parentPageNo={this.state.parentPageNo} isReset={this.state.isReset} resetPage={this.resetPage} AssessmentSearchTitle={this.AssessmentSearchTitle} searchTitle={this.state.searchTitle} filterUUID={this.state.filterUUID} />:""}
                {this.state.showSinglePopup ? <RootSingleAssessmentComponent setCurrentAssessment ={this.state.setCurrentAssessment} activeAssessmentType={this.state.activeAssessmentType} openedFrom = {'singleSlateAssessmentInner'} closeWindowAssessment = {()=>this.closeWindowAssessment()} assessmentType = {this.state.activeAssessmentType} addCiteTdxFunction = {this.addCiteTdxAssessment} usageTypeMetadata = {this.state.activeAssessmentUsageType} assessmentNavigateBack = {this.assessmentNavigateBack} resetPage={this.resetPage}/>:""}     
                {this.state.showElmComponent? <RootElmSingleAssessment activeAssessmentType={this.state.elementType} closeElmWindow={() => this.closeElmWindow()} addPufFunction={this.addPufAssessment} activeUsageType={this.state.activeAssessmentUsageType}/> : ''}
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
    };
};

const mapActionToProps = {
    setCurrentCiteTdx: setCurrentCiteTdx,
    setCurrentInnerCiteTdx: setCurrentInnerCiteTdx,
    assessmentSorting: assessmentSorting
}


export default connect(
    mapStateToProps,
    mapActionToProps
)(ElementSingleAssessment);





