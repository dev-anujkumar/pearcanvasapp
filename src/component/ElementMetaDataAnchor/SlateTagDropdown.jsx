import React from 'react';
import config from '../../config/config';
import { checkSlateLock } from '../../js/slateLockUtility.js';
import { showSlateLockPopup, toggleLOWarningPopup } from '../ElementMetaDataAnchor/ElementMetaDataAnchor_Actions';
import { showBlocker, showTocBlocker, hideBlocker } from '../../js/toggleLoader';
import {
    AddLearningObjectiveSlateDropdown,
    AddEditLearningObjectiveDropdown,
    ViewLearningObjectiveSlateDropdown,
    UnlinkSlateDropdown,
    OpenLOPopup, ViewLearningObjectiveSlate, ViewLearningObjectiveAssessment, AddLearningObjectiveSlate, AddLearningObjectiveAssessment, AddEditLearningObjective, UnlinkSlate, AddLearningObjectiveAssessmentDropdown, AlignToCypress, AlignToExternalFramework, AlignToExternalFrameworkSlateDropdown, AlignToCypressSlateDropdown
}
    from '../../constants/IFrameMessageTypes';
import { sendDataToIframe , hasReviewerRole, defaultMathImagePath } from '../../constants/utility.js';
import { connect } from 'react-redux';
import { ASSESSMENT_ITEM, ASSESSMENT_ITEM_TDX } from '../../constants/Element_Constants';
import { LEARNOSITY, LEARNING_TEMPLATE, PUF, CITE, TDX } from '../AssessmentSlateCanvas/AssessmentSlateConstants.js';
import { loNextIcon, tickIcon } from './../../images/ElementButtons/ElementButtons.jsx';
import { CYPRESS_LF, EXTERNAL_LF } from '../../constants/Element_Constants';
class SlateTagDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            showLoOptions:false,
            showWarningPopup:false
        }
        this.warningActionIntiator=''
    }
   
    
    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }
    componentDidMount(){
      if(this.props.isLOExist){
        this.node1.style.width='300px'
      }
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
        let currentSlateLOData = this.props?.currentSlateLOData?.length ? this.props.currentSlateLOData[0] : "";
        let assessmentuRN="";
        let assessmentType="";
        let assessmentTypeLO="";
        if(config.slateType === 'assessment' && document.getElementsByClassName("slate_assessment_data_id_lo").length){
        assessmentuRN = document.getElementsByClassName("slate_assessment_data_id_lo")[0].innerText;
        assessmentType = document.getElementsByClassName("slate_assessment_data_format_lo")[0].innerText;
        }
        switch (assessmentType) {
            case TDX:
                assessmentTypeLO = ASSESSMENT_ITEM_TDX
                break;
            case CITE:
            case LEARNING_TEMPLATE:
            case PUF:
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
        this.warningActionIntiator = e.target.innerText;
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

    toggleLoOptionsDropdown = () => {
      sendDataToIframe({ 'type': 'tocToggle', 'message': { open: false } })
      sendDataToIframe({ 'type': 'canvasBlocker', 'message': { open: true } }); 
        this.setState({showLoOptions:!this.state.showLoOptions});
        this.setDropdownPosition();
    }

    setDropdownPosition(){
      let element = this.node1;
      let elementInfo = element.getBoundingClientRect();
      if(elementInfo.x < 800){
        setTimeout(() => {
          this.node2.style.left = '10px';
        }, 0);
      }
    }

  /** Prepare data for Post-message in case of External LO*/
  prepareExtFrameworkData = () => {
    let slateManifestURN = config.tempSlateManifestURN ? config.tempSlateManifestURN : config.slateManifestURN
    let currentSlateLOData = this.props.currentSlateLOData;
    let apiKeys_LO = {
      'loApiUrl': config.LEARNING_OBJECTIVES_ENDPOINT,
      'strApiKey': config.STRUCTURE_APIKEY,
      'productApiUrl': config.PRODUCTAPI_ENDPOINT,
      'manifestApiUrl': config.ASSET_POPOVER_ENDPOINT,
      'assessmentApiUrl': config.ASSESSMENT_ENDPOINT
    };
    const selectedLOs = this.props.currentSlateLOData;
    let externalLFUrn = '';
    if (this?.props?.projectLearningFrameworks?.externalLF?.length) {
      externalLFUrn = this.props.projectLearningFrameworks.externalLF[0].urn;
    }
    return {
      slateManifestURN, currentSlateLOData, apiKeys_LO, externalLFUrn, selectedLOs
    }
  }

  /** Launch External LO Popup from Canvas*/
  launchExternalFrameworkPopup = (e) => {
    const {
      slateManifestURN, currentSlateLOData, apiKeys_LO, externalLFUrn, selectedLOs
    } = this.prepareExtFrameworkData();

    const currentSlateLF=this.props.currentSlateLF;
   if(currentSlateLF=== CYPRESS_LF && this.props.permissions.includes('lo_edit_metadata')){
      this.props.toggleLOWarningPopup(true,e.target.innerText);
    } else if (e?.target?.innerText == AlignToExternalFrameworkSlateDropdown && this.props.permissions.includes('lo_edit_metadata')) {
      sendDataToIframe({ 'type': 'tocToggle', 'message': { open: false } })
      sendDataToIframe({ 'type': 'canvasBlocker', 'message': { open: true } }); 
      sendDataToIframe({
        'type': OpenLOPopup,
        'message': {
          'text': AlignToExternalFramework,
          'data': currentSlateLOData,
          'isLOExist': true,
          'editAction': '',
          'selectedLOs': selectedLOs,
          'apiConstants': apiKeys_LO,
          'externalLFUrn': externalLFUrn,
          'currentSlateId': slateManifestURN,
          'chapterContainerUrn': '',
          'currentSlateLF': currentSlateLF
        }
      })
      this.props.closeLODropdown();
    }

  } 

  /** Enable/Disable External LOs Link Option based on External LF linked to Project*/
  checkExternalFramework = () => {
    let enableExtLF = false;
    if (config.slateType !== 'assessment' && this?.props?.projectLearningFrameworks?.externalLF?.length) {
      enableExtLF = true;
    }
    return enableExtLF;
  }
    
  /** Launch Warning Popup for Cypress LO options */
  handleWarningPopup = (e) => {
    this.warningActionIntiator = e.target.innerText;
    if (e) {
      e.preventDefault();
    }
    this.props.toggleLOWarningPopup(true, this.warningActionIntiator);
    showBlocker(true);
    hideBlocker();
  }

  /** Handle Button Status for Cypress LO Options */
  handleCypressLODropdownOptions = () => {
    const { currentSlateLOData, currentSlateLF, isLOExist } = this.props
    const currentSlateLO = currentSlateLOData ? Array.isArray(currentSlateLOData) ? currentSlateLOData[0] : currentSlateLOData : {}
    let enableStatus = {
      viewLOStatus: currentSlateLF == CYPRESS_LF ? currentSlateLOData && isLOExist && (currentSlateLOData.assessmentResponseMsg || currentSlateLOData.statusForSave) ? true : currentSlateLO && (currentSlateLO.id ?? currentSlateLO.loUrn) : false,
      unlinkLOStatus: currentSlateLF == CYPRESS_LF ? currentSlateLO && (currentSlateLO.id ?? currentSlateLO.loUrn) : false
    };
    return enableStatus;
  }

    render = () => {
      const enableExtLO =this.checkExternalFramework();
      const liOptionStatus = this.handleCypressLODropdownOptions()
        return (
        <div>
          <div className="learningobjectivedropdown" ref={node1 => this.node1 = node1}>
              <ul>
                <div>
               {this.props.isLOExist&&this.props.currentSlateLF !== EXTERNAL_LF && <span className='tick-icon'>{tickIcon}</span>}
                <li onClick={this.toggleLoOptionsDropdown}><span className={this.props.isLOExist&&"dropdown-option"}>{AlignToCypressSlateDropdown}</span><span className='lo-navigation-icon'>{loNextIcon}</span></li>
                </div>
                <div >
                {this.props.isLOExist&&this.props.currentSlateLF === EXTERNAL_LF && <span className='tick-icon'>{tickIcon}</span>}
                <li onClick={this.launchExternalFrameworkPopup} className={enableExtLO === true ? '' : 'disable-buttton'}><span className={this.props.isLOExist &&"dropdown-option"}>{AlignToExternalFrameworkSlateDropdown}</span></li>
                </div>
              </ul>
            </div>
            {
                this.state.showLoOptions &&  
                <div className="learningobjectivedropdown2" ref={node2 => this.node2 = node2}>
                <ul>
                    {this.props.permissions.includes('lo_edit_metadata') && config.slateType === 'section' &&
                        <li onClick={(this.props.currentSlateLF === EXTERNAL_LF) ? this.handleWarningPopup :this.learningObjectiveDropdown}> {AddLearningObjectiveSlateDropdown}</li>}
                    {this.props.permissions.includes('lo_edit_metadata') && config.slateType === 'section' &&
                        <li onClick={(this.props.currentSlateLF === EXTERNAL_LF) ? this.handleWarningPopup :this.learningObjectiveDropdown}>{AddEditLearningObjectiveDropdown}</li>}
                    {this.props.permissions.includes('lo_edit_metadata') && config.slateType === 'assessment' &&
                        <li onClick={this.learningObjectiveDropdown}>{AddLearningObjectiveAssessmentDropdown}</li>}
                    <li className={liOptionStatus.viewLOStatus ? '' : 'disabled'} style={{ cursor: 'not-allowed !important' }} onClick={this.learningObjectiveDropdown}>{ViewLearningObjectiveSlateDropdown}</li>
                    {config.slateType === 'section' && !hasReviewerRole() &&
                        <li className={liOptionStatus.unlinkLOStatus ? '' : 'disabled'} style={{ cursor: 'not-allowed !important' }} onClick={this.learningObjectiveDropdown}>{UnlinkSlateDropdown}</li>}
                </ul>
            </div> 
            }
        </div>            
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isLOExist: state.metadataReducer.slateTagEnable,
        currentSlateLF:state.metadataReducer.currentSlateLF,
        slateLockInfo: state.slateLockReducer.slateLockInfo,
        projectLearningFrameworks: state.metadataReducer.projectLearningFrameworks
    }
}
const mapActionToProps = {
    checkSlateLock,
    showSlateLockPopup,
    toggleLOWarningPopup
}

export default connect(mapStateToProps, mapActionToProps)(SlateTagDropdown);