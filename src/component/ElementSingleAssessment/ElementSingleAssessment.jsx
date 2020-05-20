// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// IMPORT - Assets //
import './../../styles/ElementSingleAssessment/ElementSingleAssessment.css';
import { dropdownArrow } from './../../images/ElementButtons/ElementButtons.jsx';
import { connect } from 'react-redux';
import { showTocBlocker, hideTocBlocker, disableHeader } from '../../js/toggleLoader';
import { hasReviewerRole, sendDataToIframe, setAssessmentTitle} from '../../constants/utility.js';
import RootCiteTdxComponent from '../AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.jsx';
import {FULL_ASSESSMENT_CITE, FULL_ASSESSMENT_TDX} from '../AssessmentSlateCanvas/AssessmentSlateConstants.js';
import RootSingleAssessmentComponent from '../AssessmentSlateCanvas/singleAssessmentCiteTdx/RootSingleAssessmentComponent.jsx'
import { setCurrentCiteTdx, setCurrentInnerCiteTdx, assessmentSorting, specialCharacterDecode } from '../AssessmentSlateCanvas/assessmentCiteTdx/Actions/CiteTdxActions';
import RootElmSingleAssessment from '../AssessmentSlateCanvas/elm/RootElmSingleComponent.jsx'
// import { sendDataToIframe } from './../../constants/utility.js';
/*** @description - ElementSingleAssessment is a class based component. It is defined simply to make a skeleton of the assessment-type element .*/

class ElementSingleAssessment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            assessmentId:  null,
            assessmentItemId : null,
            showAssessmentPopup: false,
            asseessmentUsageTypeDropdown: false,
            activeAsseessmentUsageType: this.props.model && this.props.model.figuredata && this.props.model.figuredata.elementdata && this.props.model.figuredata.elementdata.usagetype ? this.props.model.figuredata.elementdata.usagetype : "Quiz",
            // assessmentTitle: this.props.model && this.props.model.html && this.props.model.html.title? this.props.model.html.title : null,
            assessmentTitle: setAssessmentTitle(this.props),
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
            console.log("SetSate for filter", searchTitle + filterUUID)
        });
    }

    componentDidMount() {
        let title =setAssessmentTitle(this.props) != null?  setAssessmentTitle(this.props).replace(/<\/?[^>]+(>|$)/g,""): null;
        this.setState({
            // assessmentTitle: this.props.model && this.props.model.html && this.props.model.html.title? title : null,
            assessmentTitle: title,
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
        let title = setAssessmentTitle(nextProps) != null?  setAssessmentTitle(nextProps).replace(/<\/?[^>]+(>|$)/g,""): null;//nextProps.model.html && nextProps.model.html.title? nextProps.model.html.title.replace(/<\/?[^>]+(>|$)/g,""):null;
        return {
            assessmentId: nextProps.model.figuredata && nextProps.model.figuredata.elementdata && nextProps.model.figuredata.elementdata.assessmentid ? nextProps.model.figuredata.elementdata.assessmentid : "",
            assessmentItemId: nextProps.model.figuredata && nextProps.model.figuredata.elementdata && nextProps.model.figuredata.elementdata.assessmentitemid ? nextProps.model.figuredata.elementdata.assessmentitemid : "",
            // assessmentTitle :nextProps.model && nextProps.model.html && nextProps.model.html.title? title : null,
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
        hideTocBlocker();
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
    *  @description - This is the function to add embedded-assessment based on  
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
            showTocBlocker();
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
                    <h4 className="heading4ImageTextWidthNumberLabel" id="single_assessment_title">{(this.state.elementType !== "puf" && this.state.elementType !== "learnosity") ? "" : "Assessment Title:"}{this.state.assessmentTitle}</h4>
                </header>
                <div className="singleAssessmentIdInfo" ><strong>{(this.state.elementType !== "puf" && this.state.elementType !== "learnosity") ? "ID: " : "Product ID: "}</strong>{this.state.assessmentId ? this.state.assessmentId : (model.figuredata.elementdata ? model.figuredata.elementdata.assessmentid : "")}</div>
                <div className={`singleAssessmentItemIdInfo ${(this.state.elementType !== "puf" && this.state.elementType !== "learnosity")? '':'puf-assessment-id'}`} ><strong>ITEM ID: </strong>{this.state.assessmentItemId?this.state.assessmentItemId:(model.figuredata.elementdata ? model.figuredata.elementdata.assessmentitemid : "")}</div>                             
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

                <div className="pearson-component image" data-uri="" data-type="image" onClick={(e) => this.addAssessmentResource(e)}>
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
                {/* {this.state.showElmComponent? <RootElmComponent activeAssessmentType={this.state.elementType} closeElmWindow={() => this.closeElmWindow()} addPufFunction={this.addPufAssessment} openedFrom={'singleAssessment'} usageTypeMetadata={this.state.activeAsseessmentUsageType} assessmentType={this.state.elementType}/> : ''} */}
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
    handleC2AssessmentClick : PropTypes.func,
    /** Detail of element in JSON object */
}
const mapActionToProps = {
    setCurrentCiteTdx: setCurrentCiteTdx,
    setCurrentInnerCiteTdx: setCurrentInnerCiteTdx,
    assessmentSorting:assessmentSorting
}


export default connect(
    null,
    mapActionToProps
)(ElementSingleAssessment);





