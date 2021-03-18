import React from 'react';
import config from '../../config/config';
import { checkSlateLock } from '../../js/slateLockUtility.js';
import { showSlateLockPopup } from '../ElementMetaDataAnchor/ElementMetaDataAnchor_Actions';
import {
    AddLearningObjectiveSlateDropdown,
    AddEditLearningObjectiveDropdown,
    ViewLearningObjectiveSlateDropdown,
    UnlinkSlateDropdown,
    OpenLOPopup, ViewLearningObjectiveSlate, ViewLearningObjectiveAssessment, AddLearningObjectiveSlate, AddLearningObjectiveAssessment, AddEditLearningObjective, UnlinkSlate, AddLearningObjectiveAssessmentDropdown
}
    from '../../constants/IFrameMessageTypes';
import { sendDataToIframe , hasReviewerRole, defaultMathImagePath } from '../../constants/utility.js';
import { connect } from 'react-redux';
import { ASSESSMENT_ITEM, ASSESSMENT_ITEM_TDX } from '../../constants/Element_Constants';
import {  FULL_ASSESSMENT_CITE, FULL_ASSESSMENT_TDX, FULL_ASSESSMENT_PUF, LEARNING_APP_TYPE, LEARNOSITY, LEARNING_TEMPLATE, PUF, CITE, TDX } from '../AssessmentSlateCanvas/AssessmentSlateConstants.js';
class SlateTagDropdown extends React.Component {
    constructor(props) {
        super(props);
    }
   
    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false)
    }
    handleClick = (e) => {
        if (this.closestByClass(e.target, 'leaningobjective-block')) {
        return;
            
        }
        this.props.closeLODropdown()
       
    }
    closestByClass = function(el, clazz) {
    // Traverse the DOM up with a while loop
    while (el.className != clazz) {
        // Increment the loop to the parent node
        el = el.parentNode;
        if (!el) {
            return null;
        }
    }
    return el;
}
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false)
    }
    
    learningObjectiveDropdown = (e) => {
        let slateManifestURN= config.tempSlateManifestURN ? config.tempSlateManifestURN : config.slateManifestURN
        let currentSlateLOData = this.props.currentSlateLOData;
        let assessmentuRN="";
        let assessmentType="";
        let assessmentTypeLO="";
        if(config.slateType === 'assessment' && document.getElementsByClassName("slate_assessment_data_id_lo").length){
        assessmentuRN = document.getElementsByClassName("slate_assessment_data_id_lo")[0].innerText;
        assessmentType = document.getElementsByClassName("slate_assessment_data_format_lo")[0].innerText;
        }
        switch (assessmentType) {

            case TDX:
            case FULL_ASSESSMENT_TDX:
                assessmentTypeLO = ASSESSMENT_ITEM_TDX
                break;
            case FULL_ASSESSMENT_CITE:
            case CITE:
            case LEARNING_TEMPLATE:
            case LEARNING_APP_TYPE:
            case PUF:
            case FULL_ASSESSMENT_PUF:
            case LEARNOSITY:
            default: 
                assessmentTypeLO = ASSESSMENT_ITEM
                break;
        }
        let previewData={
            previewUrl:config.PREVIEW_ASSESSMENT_LO_ENDPOINT,
            bookId: config.citeUrn,
            assessmentUrn:assessmentuRN,
            assessmentType: assessmentTypeLO
        }
        let isLOExist= this.props.isLOExist;
        let apiKeys_LO = {
            'loApiUrl': config.LEARNING_OBJECTIVES_ENDPOINT,
            'strApiKey': config.STRUCTURE_APIKEY,
            'mathmlImagePath': config.S3MathImagePath ? config.S3MathImagePath : defaultMathImagePath,
            'productApiUrl': config.PRODUCTAPI_ENDPOINT,
            'manifestApiUrl': config.ASSET_POPOVER_ENDPOINT,
            'assessmentApiUrl': config.ASSESSMENT_ENDPOINT
        };
        if (e.target.innerText == ViewLearningObjectiveSlateDropdown && config.slateType !== 'assessment') {
            sendDataToIframe({ 'type': OpenLOPopup, 'message': { 'text': ViewLearningObjectiveSlate, 'data': currentSlateLOData, 'chapterContainerUrn': config.parentContainerUrn, 'isLOExist': isLOExist, 'editAction': '' } });
        }
        else if (e.target.innerText == ViewLearningObjectiveSlateDropdown && config.slateType === 'assessment') {
            sendDataToIframe({ 'type': OpenLOPopup, 'message': { 'text': ViewLearningObjectiveAssessment, 'data': currentSlateLOData, 'chapterContainerUrn': config.parentContainerUrn, 'isLOExist': true, 'editAction': '','apiConstants':apiKeys_LO,'assessmentUrn':assessmentuRN,'previewData': previewData } });
        }
        else if(checkSlateLock(this.props.slateLockInfo)){
            this.props.showSlateLockPopup(true);
        }
        else{
        if (e.target.innerText == AddLearningObjectiveSlateDropdown && this.props.permissions.includes('lo_edit_metadata')) {
            sendDataToIframe({ 'type': OpenLOPopup, 'message': { 'text': AddLearningObjectiveSlate, 'data': '', 'currentSlateId': slateManifestURN, 'chapterContainerUrn': '', 'projectTitle': document.cookie.split(',')[3].split(':')[1], 'isLOExist': isLOExist, 'editAction': '', 'apiConstants': apiKeys_LO } })
        }

        else if (e.target.innerText == AddEditLearningObjectiveDropdown && this.props.permissions.includes('lo_edit_metadata')) {
            sendDataToIframe({ 'type': OpenLOPopup, 'message': { 'text': AddEditLearningObjective, 'data': currentSlateLOData, 'currentSlateId': slateManifestURN, 'chapterContainerUrn': config.parentContainerUrn, 'projectTitle': document.cookie.split(',')[3].split(':')[1], 'isLOExist': isLOExist, 'editAction': true, 'apiConstants': apiKeys_LO } })
        }

        else if (e.target.innerText == AddLearningObjectiveAssessmentDropdown && this.props.permissions.includes('lo_edit_metadata')) {
            sendDataToIframe({ 'type': OpenLOPopup, 'message': { 'text': AddLearningObjectiveAssessment, 'data': currentSlateLOData, 'currentSlateId': config.slateManifestURN, 'chapterContainerUrn': config.parentContainerUrn, 'projectTitle': document.cookie.split(',')[3].split(':')[1], 'isLOExist': true, 'editAction': true, 'apiConstants': apiKeys_LO,'assessmentUrn':assessmentuRN, 'previewData': previewData } })
        }
        else if (e.target.innerText == UnlinkSlateDropdown && this.props.permissions.includes('lo_edit_metadata')) {
            sendDataToIframe({ 'type': OpenLOPopup, 'message': { 'text': UnlinkSlate, 'data': currentSlateLOData, 'currentSlateId': slateManifestURN, 'chapterContainerUrn': '', 'isLOExist': true, 'editAction': '', 'apiConstants': apiKeys_LO } })
        }
    }
        this.props.closeLODropdown();

    }
    render = () => {
        return (
            <div className="learningobjectivedropdown" ref={node => this.node = node}>
                <ul>
                    {this.props.permissions.includes('lo_edit_metadata') && config.slateType === 'section' &&
                        <li onClick={this.learningObjectiveDropdown}>{AddLearningObjectiveSlateDropdown}</li>}
                    {this.props.permissions.includes('lo_edit_metadata') && config.slateType === 'section' &&
                        <li onClick={this.learningObjectiveDropdown}>{AddEditLearningObjectiveDropdown}</li>}
                    {this.props.permissions.includes('lo_edit_metadata') && config.slateType === 'assessment' &&
                        <li onClick={this.learningObjectiveDropdown}>{AddLearningObjectiveAssessmentDropdown}</li>}
                    <li className={this.props.currentSlateLOData && (this.props.currentSlateLOData.assessmentResponseMsg || this.props.currentSlateLOData.statusForSave)? '' :this.props.currentSlateLOData && (this.props.currentSlateLOData.id ? this.props.currentSlateLOData.id : this.props.currentSlateLOData.loUrn) ? '' : 'disabled'} style={{ cursor: 'not-allowed !important' }} onClick={this.learningObjectiveDropdown}>{ViewLearningObjectiveSlateDropdown}</li>
                    {config.slateType === 'section' && !hasReviewerRole() &&
                        <li className={this.props.currentSlateLOData && (this.props.currentSlateLOData.id ? this.props.currentSlateLOData.id : this.props.currentSlateLOData.loUrn) ? '' : 'disabled'} style={{ cursor: 'not-allowed !important' }} onClick={this.learningObjectiveDropdown}>{UnlinkSlateDropdown}</li>}
                </ul>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isLOExist: state.metadataReducer.slateTagEnable,
        slateLockInfo: state.slateLockReducer.slateLockInfo
    }
}
const mapActionToProps = {
    checkSlateLock,
    showSlateLockPopup
}

export default connect(mapStateToProps, mapActionToProps)(SlateTagDropdown);