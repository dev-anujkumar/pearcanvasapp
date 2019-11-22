import React from 'react';
import config from '../../config/config';
import {
    AddLearningObjectiveSlateDropdown,
    AddEditLearningObjectiveDropdown,
    ViewLearningObjectiveSlateDropdown,
    UnlinkSlateDropdown,
    AddEditLOAssessmentDropdown,
    OpenLOPopup, ViewLearningObjectiveSlate, ViewLearningObjectiveAssessment, AddLearningObjectiveSlate, AddLearningObjectiveAssessment, AddEditLearningObjective, UnlinkSlate, AddLearningObjectiveAssessmentDropdown
}
    from '../../constants/IFrameMessageTypes';
import { sendDataToIframe } from '../../constants/utility.js';
import { connect } from 'react-redux';

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
 closest = function(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false)
    }

    learningObjectiveDropdown = (e) => {
        let currentSlateLOData = this.props.currentSlateLOData;
        let assessmentuRN="";
        if(config.slateType === 'assessment'){
        assessmentuRN = document.getElementsByClassName("slate_assessment_data_id_lo")[0].innerText;
        }
        let isLOExist= this.props.slateTagEnable;
        let apiKeys = [config.LEARNING_OBJECTIVES_ENDPOINT, config.ASSET_POPOVER_ENDPOINT, config.STRUCTURE_APIKEY, config.COREAPI_ENDPOINT, config.PRODUCTAPI_ENDPOINT];
        if (e.target.innerText == ViewLearningObjectiveSlateDropdown && config.slateType !== 'assessment') {
            sendDataToIframe({ 'type': OpenLOPopup, 'message': { 'text': ViewLearningObjectiveSlate, 'data': currentSlateLOData, 'chapterContainerUrn': config.parentContainerUrn, 'isLOExist': isLOExist, 'editAction': '' } });
        }
        if (e.target.innerText == ViewLearningObjectiveSlateDropdown && config.slateType === 'assessment') {
            sendDataToIframe({ 'type': OpenLOPopup, 'message': { 'text': ViewLearningObjectiveAssessment, 'data': currentSlateLOData, 'chapterContainerUrn': config.parentContainerUrn, 'isLOExist': true, 'editAction': '','apiConstants':apiKeys,'assessmentUrn':assessmentuRN } });
        }
        // else if( !this.state.slateLockSatus){
        if (e.target.innerText == AddLearningObjectiveSlateDropdown && this.props.permissions.includes('lo_edit_metadata')) {
            sendDataToIframe({ 'type': OpenLOPopup, 'message': { 'text': AddLearningObjectiveSlate, 'data': '', 'currentSlateId': config.slateManifestURN, 'chapterContainerUrn': '', 'projectTitle': document.cookie.split(',')[3].split(':')[1], 'isLOExist': isLOExist, 'editAction': '', 'apiConstants': apiKeys } })
        }

        else if (e.target.innerText == AddEditLearningObjectiveDropdown && this.props.permissions.includes('lo_edit_metadata')) {
            sendDataToIframe({ 'type': OpenLOPopup, 'message': { 'text': AddEditLearningObjective, 'data': currentSlateLOData, 'currentSlateId': config.slateManifestURN, 'chapterContainerUrn': config.parentContainerUrn, 'projectTitle': document.cookie.split(',')[3].split(':')[1], 'isLOExist': isLOExist, 'editAction': true, 'apiConstants': apiKeys } })
        }

        else if (e.target.innerText == AddLearningObjectiveAssessmentDropdown && this.props.permissions.includes('lo_edit_metadata')) {
            sendDataToIframe({ 'type': OpenLOPopup, 'message': { 'text': AddLearningObjectiveAssessment, 'data': currentSlateLOData, 'currentSlateId': config.slateManifestURN, 'chapterContainerUrn': config.parentContainerUrn, 'projectTitle': document.cookie.split(',')[3].split(':')[1], 'isLOExist': true, 'editAction': true, 'apiConstants': apiKeys,'assessmentUrn':assessmentuRN } })
        }
        else if (e.target.innerText == UnlinkSlateDropdown && this.props.permissions.includes('lo_edit_metadata')) {
            sendDataToIframe({ 'type': OpenLOPopup, 'message': { 'text': UnlinkSlate, 'data': currentSlateLOData, 'currentSlateId': config.slateManifestURN, 'chapterContainerUrn': '', 'isLOExist': true, 'editAction': '', 'apiConstants': apiKeys } })
        }
        this.props.closeLODropdown();
        //  }
        //  else(
        //      this.slateLockAlert(this.state.SlatelockUserInfo)
        //  )

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
                    {config.slateType === 'section' &&
                        <li className={this.props.currentSlateLOData && (this.props.currentSlateLOData.id ? this.props.currentSlateLOData.id : this.props.currentSlateLOData.loUrn) ? '' : 'disabled'} style={{ cursor: 'not-allowed !important' }} onClick={this.learningObjectiveDropdown}>{UnlinkSlateDropdown}</li>}
                </ul>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isLOExist: state.metadataReducer.slateTagEnable
    }
}

export default connect(mapStateToProps)(SlateTagDropdown);