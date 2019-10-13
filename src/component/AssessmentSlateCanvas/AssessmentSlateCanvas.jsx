/**
* Root Component of Assessment Slate Canvas
*/


// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {AssessmentSlateData} from './AssessmentSlateData.jsx';
import { showTocBlocker, hideTocBlocker, disableHeader } from '../../js/toggleLoader';
import { c2AssessmentModule } from './../../js/c2_assessment_module';
import { utils } from '../../js/utils';
//import { closeLtAction,openLtAction,getDiscipline} from './learningTool/learningToolActions';



export class AssessmentSlateCanvas extends Component {
    constructor(props) {
        super(props);
        this.state={
            showAssessmentPopup:false,
        }
    }
    toggleAssessmentPopup = (value) => {
        this.setState({
            showAssessmentPopup : value
        });
    }
    handleC2AssessmentClick=(assessmentType)=> {
        var value;
        if(assessmentType==="Full Assessment CITE"){
            value="CITE"
        }else{
            value="TDX"
        }
        let that = this;
        let fileName = "";
        let filterType = [value.toUpperCase()] || ['CITE'];
        //let searchMode = $('.editor-instance[data-id="' + this.state.elementid + '"]').attr("data-elementdataassessmentstyle") || "partial";//"partial";
        let existingURN = this.props.model.elementdata.assessmentid || "";//urn:pearson:work:
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
    render() {
        return(
            <div >
            <AssessmentSlateData type={this.props.type} handleC2AssessmentClick={this.handleC2AssessmentClick}/>
            </div>
        );
    }
}


// const mapStateToProps = (state, props) => {
//     return {
//         toggleLT : state.learningToolReducer.toggleLT,
//         selectedResultFormApi : state.learningToolReducer.selectedResultFormApi
//     }
// }
// const mapActionToProps = {
//     openLtAction:openLtAction,
//     closeLtAction:closeLtAction,
//     getDiscipline:getDiscipline
// }


AssessmentSlateCanvas.defaultProps = {
    /** Detail of element in JSON object */
    type: ''
}

// export default connect(mapStateToProps,mapActionToProps)(AssessmentSlateCanvas)