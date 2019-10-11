// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// IMPORT - Assets //
import './../../styles/ElementSingleAssessment/ElementSingleAssessment.css';
import { dropdownArrow } from './../../images/ElementButtons/ElementButtons.jsx';
import PopUp from './../PopUp';

// IMPORT - Constants //
import { ESA_DIALOG_TEXT } from './../../constants/Element_Constants';
import { ESA_POPUP_PLACEHOLDER } from './../../constants/Element_Constants';
import { ESA_POPUP_ROWS } from './../../constants/Element_Constants';
import { ESA_POPUP_COLUMNS } from './../../constants/Element_Constants';
import { ESA_POPUP_BUTTON_TEXT } from './../../constants/Element_Constants';
import { ESA_POPUP_MAXLENGTH } from './../../constants/Element_Constants';
import { ESA_POPUP_CLASSNAME } from './../../constants/Element_Constants';
import { showTocBlocker, hideTocBlocker, disableHeader } from '../../js/toggleLoader';
import { c2AssessmentModule } from './../../js/c2_assessment_module';
import { utils } from '../../js/utils';

/*** @description - ElementSingleAssessment is a class based component. It is defined simply
* to make a skeleton of the assessment-type element .*/

export class ElementSingleAssessment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            assessmentId: null,
            assessmentItemId : null,
            showAssessmentPopup: false,
            asseessmentUsageTypeDropdown: false,
            activeAsseessmentUsageType: props.model && props.figuredata && props.figuredata.elementdata ? props.figuredata.elementdata.usagetype : "Quiz",

        };
    } 

    handleC2AssessmentClick=(value)=> {
        let that = this;
        let fileName = "";
        let filterType = [this.props.model.figuredata.elementdata.assessmentformat.toUpperCase()] || ['CITE'];
        //let searchMode = $('.editor-instance[data-id="' + this.state.elementid + '"]').attr("data-elementdataassessmentstyle") || "partial";//"partial";
        let existingURN = this.props.model.figuredata.elementdata.assessmentid || "";//urn:pearson:work:
        let searchMode = "partial";//"partial";
        //let existingURN = "";//urn:pearson:work:
        let prefix = 'urn:pearson:work:';
        let startIndex = prefix.length;
        let UUID = (existingURN && existingURN !== "") ? existingURN.substring(startIndex, existingURN.length) : "";
        var searchSelectAssessmentURN = "";
        if (searchMode == "partial") {
            searchSelectAssessmentURN = UUID || "";
        }

        let productId = "";
        let searchTypeOptVal = "";
        showTocBlocker();
        disableHeader(true);
        this.toggleAssessmentPopup(false);
        //window.parent.postMessage({ 'type': 'blockerTOC', 'message': { status: true } }, WRAPPER_URL);

        productId = (value && value !== "") ? value : "Unspecified";
        c2AssessmentModule.launchAssetBrowser(fileName, filterType, searchMode, searchSelectAssessmentURN, productId, searchTypeOptVal, function (assessmentData) {

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
                alert("There was an error loading asset due to malformed 'taxonomicType' data.  Please contact the helpdesk and reference id: " + id);
            }
            that.setState({assessmentId: id,assessmentItemId : itemID,})
            // $('.editor-instance[data-id="' + that.state.elementid + '"]').attr("data-elementdataassessmentitemid", "");
            // if (searchMode == "partial") {
            //     $('.editor-instance[data-id="' + that.state.elementid + '"]').attr("data-elementdataassessmentid", id);
            //     $('.editor-instance[data-id="' + that.state.elementid + '"]').attr("data-elementdataassessmentitemid", itemID);
            // } else {
            //     $('.editor-instance[data-id="' + that.state.elementid + '"]').attr("data-elementdataassessmentid", id);
            // }
            // $('.editor-instance[data-id="' + that.state.elementid + '"]').attr("data-elementdataassessmenttitle", title);
            // $('.editor-instance[data-id="' + that.state.elementid + '"]').attr("data-figuredatainteractiveformat", assessmentFormat);

        });
        //hideTocBlocker();
    }

    /**Assessment PopUp Functions */
    /*** @description - This function is to toggle the Assessment PopUp*/
    toggleAssessmentPopup = (value) => {
        this.setState({
            showAssessmentPopup : value
        });
    }
    /*** @description - This function is to select the assesssment from another PopUp*/
    // selectAssessmentPopup = () => {
    //     console.log("select type of assessment!!!!!")
    // }
    /*** @description - This function is to open the assesssment based on UUID*/
    // openAssessment=(assessmentUUID)=>{
    //     console.log("assessmentUUID:::",assessmentUUID);
    // }

    /**Assessment Dropdown Functions */
    /*** @description - This function is to handle the Assessment type change*/
    handleAssessmentTypeChange = (usageType, e) => {
        this.setState({
            asseessmentUsageTypeDropdown: false,
            activeAsseessmentUsageType: usageType,
        });
    }
    /*** @description - This function is to toggle the Assessment Dropdown menu*/
    toggleUsageTypeDropdown = () => {
        this.setState({
            asseessmentUsageTypeDropdown: !this.state.asseessmentUsageTypeDropdown
        });
    }

    /*** @description - This function is for handling the different types of figure-element.
    * @param model object that defined the type of element*/
    renderAssessmentType = (model = {}, index) => {
        var assessmentJSX;
        var assessmentUsageType = ['Quiz', 'Test', 'Practice', 'Homework', 'Diagnostic', 'Journal', 'Shared Writing', 'Concept Check', 'Non-Scored', 'Study Tool']
        if (assessmentUsageType.length > 0) {
            var assessmentType = assessmentUsageType.map((usageType, i) =>
                <li key={i} className="singleAssessment_Dropdown_item" onClick={(e) => this.handleAssessmentTypeChange(usageType, e)}>{usageType}</li>
            )
        }
        assessmentJSX = <div className="divAssessment" >
            <figure className="figureAssessment">
                <header>
                    <h4 className="heading4ImageTextWidthNumberLabel" >{model.title.text}</h4>
                </header>
                <div className="singleAssessmentIdInfo" ><strong>ID: </strong>{this.state.assessmentId?this.state.assessmentId:(model.figuredata.elementdata ? model.figuredata.elementdata.assessmentid : "")}</div>
                <div className="singleAssessmentItemIdInfo" ><strong>ITEM ID: </strong>{this.state.assessmentItemId?this.state.assessmentItemId:(model.figuredata.elementdata ? model.figuredata.elementdata.assessmentitemid : "")}</div>
                <div className="singleAssessment_Dropdown_Container">
                    <div className="singleAssessment_Dropdown_SelectLabel">Select usage type</div>
                    <div className={this.state.asseessmentUsageTypeDropdown ? "singleAssessment_Dropdown_activeDropdown select" : "singleAssessment_Dropdown_activeDropdown notselect"} onClick={this.toggleUsageTypeDropdown} >
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

                <div className="pearson-component image" data-uri="" data-type="image" onClick={()=>{this.toggleAssessmentPopup(true)}}>
                    <img src="https://cite-media-stg.pearson.com/legacy_paths/8efb9941-4ed3-44a3-8310-1106d3715c3e/FPO-assessment.png"
                        data-src="https://cite-media-stg.pearson.com/legacy_paths/8efb9941-4ed3-44a3-8310-1106d3715c3e/FPO-assessment.png"
                        title="View Image" alt="" class="imageTextWidth lazyloaded imageeee"></img>

{/** Assessment PopUp*/}

                    {/* {this.state.showAssessmentPopup && <PopUp
                        dialogText={ESA_DIALOG_TEXT}
                        placeholder={ESA_POPUP_PLACEHOLDER}
                        rows={ESA_POPUP_ROWS}
                        active={this.state.showAssessmentPopup}
                        // cancelPopUp={e => this.toggleAssessmentPopup(e, this)}
                        togglePopup={(e) => this.toggleAssessmentPopup(e, this)}
                        // saveContent={this.openAssessment}
                        // cancelPopUp={() => this.selectAssessmentPopup}
                        saveButtonText={ESA_POPUP_BUTTON_TEXT}
                        cols={ESA_POPUP_COLUMNS}
                        maxLength={ESA_POPUP_MAXLENGTH}
                        assessmentClass={ESA_POPUP_CLASSNAME}
                    />} */}

                </div>
            </figure>

        </div>


        return assessmentJSX;
    }
    render() {
        const { model, index, elementId } = this.props;
        return (
            <div className="figureElement">
                {this.renderAssessmentType(model, index)}
                {this.state.showAssessmentPopup? <PopUp handleC2Click ={this.handleC2AssessmentClick}  assessmentAndInteractive={"assessmentAndInteractive"} dialogText={'PLEASE ENTER A PRODUCT UUID'}/>:''}
            </div>
        );
    }
}

ElementSingleAssessment.defaultProps = {
    /** Detail of element in JSON object */
    model: PropTypes.object,
    /** index of element  */
    index: PropTypes.number,
    /** element id of the element */
    elementId: PropTypes.number
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
    /** Handler to select the assessment from second pop-up */
    selectAssessmentPopup: PropTypes.func,
    /** Handler to open the assessment based on UUID */
    openAssessment: PropTypes.func,
}




