// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// IMPORT - Assets //
import './../../styles/ElementSingleAssessment/ElementSingleAssessment.css';
import { dropdownArrow } from './../../images/ElementButtons/ElementButtons.jsx';
import PopUp from './../PopUp';
import { c2AssessmentModule } from './../../js/c2_assessment_module';
import { utils } from '../../js/utils';
import { showTocBlocker, hideTocBlocker, disableHeader } from '../../js/toggleLoader';
import { hasReviewerRole } from '../../constants/utility.js';
import RootCiteTdxComponent from '../AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.jsx';
import {FULL_ASSESSMENT_CITE, FULL_ASSESSMENT_TDX} from '../AssessmentSlateCanvas/AssessmentSlateConstants.js';
import RootSingleAssessmentComponent from '../AssessmentSlateCanvas/singleAssessmentCiteTdx/RootSingleAssessmentComponent.jsx'


/*** @description - ElementSingleAssessment is a class based component. It is defined simply to make a skeleton of the assessment-type element .*/

export class ElementSingleAssessment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            assessmentId:  null,
            assessmentItemId : null,
            showAssessmentPopup: false,
            asseessmentUsageTypeDropdown: false,
            activeAsseessmentUsageType: this.props.model && this.props.model.figuredata && this.props.model.figuredata.elementdata && this.props.model.figuredata.elementdata.usagetype ? this.props.model.figuredata.elementdata.usagetype : "Quiz",
            assessmentTitle: this.props.model && this.props.model.html && this.props.model.html.title? this.props.model.html.title : null,
            elementType: this.props.model.figuredata.elementdata.assessmentformat || "",
            showSinglePopup:false,
            setCurrentAssessment:{}

        };
    }
    componentDidMount() {
        let title = this.props.model && this.props.model.html && this.props.model.html.title ? this.props.model.html.title.replace(/<\/?[^>]+(>|$)/g,""):"";        
        this.setState({
            assessmentTitle: this.props.model && this.props.model.html && this.props.model.html.title? title : null,
            assessmentId: this.props.model && this.props.model.figuredata && this.props.model.figuredata.elementdata && this.props.model.figuredata.elementdata.assessmentid ? this.props.model.figuredata.elementdata.assessmentid : null,
            assessmentItemId: this.props.model && this.props.model.figuredata && this.props.model.figuredata.elementdata && this.props.model.figuredata.elementdata.assessmentitemid ? this.props.model.figuredata.elementdata.assessmentitemid : null,
            activeAsseessmentUsageType: this.props.model && this.props.model.figuredata && this.props.model.figuredata.elementdata && this.props.model.figuredata.elementdata.usagetype ? this.props.model.figuredata.elementdata.usagetype : "Quiz"
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

    if('figuredata' in nextProps.model && 'elementdata' in nextProps.model.figuredata && 'assessmentformat' in nextProps.model.figuredata.elementdata && nextProps.model.figuredata.elementdata.assessmentformat !== prevState.elementType) {
        let title = nextProps.model.html && nextProps.model.html.title? nextProps.model.html.title.replace(/<\/?[^>]+(>|$)/g,""):null;        
        return {
            assessmentId: nextProps.model.figuredata && nextProps.model.figuredata.elementdata && nextProps.model.figuredata.elementdata.assessmentid ? nextProps.model.figuredata.elementdata.assessmentid : "",
            assessmentItemId: nextProps.model.figuredata && nextProps.model.figuredata.elementdata && nextProps.model.figuredata.elementdata.assessmentitemid ? nextProps.model.figuredata.elementdata.assessmentitemid : "",
            assessmentTitle :nextProps.model && nextProps.model.html && nextProps.model.html.title? title : null,
            elementType: nextProps.model.figuredata.elementdata.assessmentformat || ""
        };
    }

    return null;
}
    handleC2AssessmentClick=(value)=> {
        if(this.props.permissions && this.props.permissions.includes('quad_linking_assessment') && !hasReviewerRole()){
        let fileName = "";
        let filterType = [this.props.model.figuredata.elementdata.assessmentformat.toUpperCase()];
        let existingURN = this.props.model.figuredata.elementdata.assessmentid || "";//urn:pearson:work:
        let searchMode = "partial";//"partial";
        let prefix = 'urn:pearson:work:';
        let startIndex = prefix.length;
        let UUID = (existingURN) ? existingURN.substring(startIndex, existingURN.length) : "";
        var searchSelectAssessmentURN = "";
        if (searchMode == "partial") {
            searchSelectAssessmentURN = UUID || "";
        }

        let productId = "";
        let searchTypeOptVal = "";
        showTocBlocker();
        disableHeader(true);
        this.toggleAssessmentPopup('',false);
        productId = (value) ? value : "Unspecified";
        c2AssessmentModule.launchAssetBrowser(fileName, filterType, searchMode, searchSelectAssessmentURN, productId, searchTypeOptVal,  (assessmentData)=> {
            this.launchAssetBrowserCallBack(assessmentData) 
        });
        hideTocBlocker();
    }
    }

    launchAssetBrowserCallBack = (assessmentData) => {
        let id = assessmentData['id'] ? assessmentData['id'] : assessmentData.assessmentData['id'];
        let itemID = assessmentData['itemID'];
        let title = assessmentData['title'] ? assessmentData['title']: null ;
        let assessmentFormat;
        if (assessmentData['itemsData'] && assessmentData['itemsData']['taxonomicType'] && assessmentData['itemsData']['taxonomicType'][0] && typeof assessmentData['itemsData']['taxonomicType'][0] === 'string') {
            assessmentFormat = utils.getTaxonomicFormat(assessmentData['itemsData']['taxonomicType'][0]);
        } else if (assessmentData['assessmentData'] && assessmentData['assessmentData']['taxonomicType'] && assessmentData['assessmentData']['taxonomicType'][0] && typeof assessmentData['assessmentData']['taxonomicType'][0] === 'string') {
            assessmentFormat = utils.getTaxonomicFormat(assessmentData['assessmentData']['taxonomicType'][0]);
        } else {
            assessmentFormat = "";
            this.props.openCustomPopup("There was an error loading asset due to malformed 'taxonomicType' data.  Please contact the helpdesk and reference id: " + id);
        }
        this.setState({assessmentId: id,assessmentItemId : itemID, assessmentTitle: title},
            ()=>{
                this.saveAssessment();
        })
    }
    /**Assessment PopUp Functions */
    /*** @description - This function is to toggle the Assessment PopUp*/
    toggleAssessmentPopup = (e,value) => {
        this.props.showBlocker(value);
        disableHeader(value);
        value ? showTocBlocker(value) : hideTocBlocker(value)
        this.setState({
            showAssessmentPopup : value
        });
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
            this.props.showBlocker(false);
    }
    assessmentNavigateBack = () => {
        this.setState({
            showAssessmentPopup: true,
            showSinglePopup:false,
        });
    }
    /***
    *  @description - This is the function to add CITE/TDX to Embedded-Assessment  
    * @param citeTdxObj - The object contains data about CITE/TDX Assessment 
    */
    addCiteTdxAssessment = (citeTdxObj) => {
        showTocBlocker();
        disableHeader(true);
        if(citeTdxObj.slateType === "singleSlateAssessment"){
            this.setState({
                showSinglePopup: true,
                setCurrentAssessment: citeTdxObj,
                showAssessmentPopup:false
            })
        }
        else{
            this.setState({ assessmentId: citeTdxObj.id, assessmentItemId: citeTdxObj.singleAssessmentID.versionUrn, assessmentTitle: citeTdxObj.title },
                () => {
                    this.saveAssessment();
                })
        }
       
    }

    /*** @description - This function is for handling the different types of figure-element.
    * @param model object that defined the type of element
    */
    renderAssessmentType = (model) => {
        var assessmentJSX;
        var assessmentUsageType = ['Quiz', 'Test', 'Practice', 'Homework', 'Diagnostic', 'Journal', 'Shared Writing', 'Concept Check', 'Non-Scored', 'Study Tool']
        if (assessmentUsageType.length > 0) {
            var assessmentType = assessmentUsageType.map((usageType, i) =>
                <li key={i} className="singleAssessment_Dropdown_item" onClick={(e) => this.handleAssessmentTypeChange(usageType, e)}>{usageType}</li>
            )
        }
        /*JSX for the Single Assessment Element */
        assessmentJSX = <div className="divAssessment" >
            <figure className="figureAssessment">
                <header>
                    <h4 className="heading4ImageTextWidthNumberLabel" id="single_assessment_title">{this.state.assessmentTitle}</h4>
                </header>
                <div className="singleAssessmentIdInfo" ><strong>ID: </strong>{this.state.assessmentId?this.state.assessmentId:(model.figuredata.elementdata ? model.figuredata.elementdata.assessmentid : "")}</div>
                <div className="singleAssessmentItemIdInfo" ><strong>ITEM ID: </strong>{this.state.assessmentItemId?this.state.assessmentItemId:(model.figuredata.elementdata ? model.figuredata.elementdata.assessmentitemid : "")}</div>
                <div className="singleAssessment_Dropdown_Container">
                    <div className="singleAssessment_Dropdown_SelectLabel">Select usage type</div>
                    <div className={this.state.asseessmentUsageTypeDropdown ? "singleAssessment_Dropdown_activeDropdown select" : "singleAssessment_Dropdown_activeDropdown notselect"} onClick={ !hasReviewerRole() && this.toggleUsageTypeDropdown} >
                        <span className="singleAssessment_Dropdown_currentLabel">{model.figuredata.elementdata ? this.state.activeAsseessmentUsageType : "Quiz"}</span>
                        <span className="singleAssessment_Dropdown_arrow">{dropdownArrow}</span>
                    </div>

                </div>
                {
                    this.state.asseessmentUsageTypeDropdown ? (
                        <ul className="singleAssessment_Dropdown_options">
                            {assessmentType}
                        </ul>
                    ) : null
                }

                <div className="pearson-component image" data-uri="" data-type="image" onClick={(e)=>{this.toggleAssessmentPopup(e,true)}}>
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
                {this.state.showAssessmentPopup? <RootCiteTdxComponent openedFrom = {'singleSlateAssessment'} closeWindowAssessment = {()=>this.closeWindowAssessment()} assessmentType = {this.state.elementType=="cite"?FULL_ASSESSMENT_CITE:FULL_ASSESSMENT_TDX} addCiteTdxFunction = {this.addCiteTdxAssessment} usageTypeMetadata = {this.state.activeAsseessmentUsageType}/>:""}
                {this.state.showSinglePopup ? <RootSingleAssessmentComponent setCurrentAssessment ={this.state.setCurrentAssessment} activeAssessmentType={this.state.activeAssessmentType} openedFrom = {'singleSlateAssessmentInner'} closeWindowAssessment = {()=>this.closeWindowAssessment()} assessmentType = {this.state.activeAssessmentType} addCiteTdxFunction = {this.addCiteTdxAssessment} usageTypeMetadata = {this.state.activeAssessmentUsageType} assessmentNavigateBack = {this.assessmentNavigateBack}/>:""}
       
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
    handleC2AssessmentClick : PropTypes.func,
    /** Detail of element in JSON object */
}




