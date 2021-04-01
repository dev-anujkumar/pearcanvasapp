import React from 'react';
import config from '../../config/config';
import { checkSlateLock } from '../../js/slateLockUtility.js';
import { showSlateLockPopup } from '../ElementMetaDataAnchor/ElementMetaDataAnchor_Actions';
import { showBlocker, showTocBlocker, hideBlocker } from '../../js/toggleLoader';
import {
    AddLearningObjectiveSlateDropdown,
    AddEditLearningObjectiveDropdown,
    ViewLearningObjectiveSlateDropdown,
    UnlinkSlateDropdown,
    OpenLOPopup, ViewLearningObjectiveSlate, ViewLearningObjectiveAssessment, AddLearningObjectiveSlate, AddLearningObjectiveAssessment, AddEditLearningObjective, UnlinkSlate, AddLearningObjectiveAssessmentDropdown, AlignToCypress, AlignToExternalFramework, AlignToExternalFrameworkSlateDropdown, AlignToCypressSlateDropdown,
    WarningPopupAction,
}
    from '../../constants/IFrameMessageTypes';
import { sendDataToIframe , hasReviewerRole, defaultMathImagePath } from '../../constants/utility.js';
import { connect } from 'react-redux';
import { ASSESSMENT_ITEM, ASSESSMENT_ITEM_TDX } from '../../constants/Element_Constants';
import { LEARNOSITY, LEARNING_TEMPLATE, PUF, CITE, TDX } from '../AssessmentSlateCanvas/AssessmentSlateConstants.js';
import PopUp from '../PopUp/PopUp.jsx';
import { loNextIcon } from './../../images/ElementButtons/ElementButtons.jsx';
import { cypressLOWarningtxt, externalLOWarningtxt } from '../../constants/Element_Constants';
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
        let currentSlateLOData = this.props.currentSlateLOData[0];
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
        this.setState({showLoOptions:!this.state.showLoOptions})
    }
  
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

  launchExternalFrameworkPopup = (e) => {
    const {
      slateManifestURN, currentSlateLOData, apiKeys_LO, externalLFUrn, selectedLOs
    } = this.prepareExtFrameworkData();

    const currentSlateLF=this.props.currentSlateLF;
   if(currentSlateLF==='cypressLF' && this.props.permissions.includes('lo_edit_metadata')){
      this.warningActionIntiator = e.target.innerText;
      this.toggleWarningPopup(true,e);
    } else if (e?.target?.innerText == AlignToExternalFrameworkSlateDropdown && this.props.permissions.includes('lo_edit_metadata')) {
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
  checkExternalFramework = () => {
    let enableExtLF = false;
    if (config.slateType !== 'assessment' && this?.props?.projectLearningFrameworks?.externalLF?.length) {
      enableExtLF = true;
    }
    return enableExtLF;
  }
  showLOWarningPopup = () => {
    const currentSlateLF=this.props.currentSlateLF;
    const loWarningDialogTxt = (currentSlateLF === 'cypressLF') ? cypressLOWarningtxt : externalLOWarningtxt;

    if (this.state.showWarningPopup) {
      showBlocker(true)
      showTocBlocker();
      return (
        <PopUp dialogText={loWarningDialogTxt}
          active={true}
          warningHeaderText={`Warning`}
          togglePopup={this.toggleWarningPopup}
          isInputDisabled={true}
          lOPopupClass="lo-warning-txt"
          LOPopup={true}
          yesButtonHandler={this.unlinkSlateLOs}
        />
      )
    } else {
      return null
    }
  }
  unlinkSlateLOs = (e) => {
    const slateManifestURN = config.tempSlateManifestURN ? config.tempSlateManifestURN : config.slateManifestURN;
    const { currentSlateLOData } = this.props;
    const apiKeys_LO = {
      'loApiUrl': config.LEARNING_OBJECTIVES_ENDPOINT,
      'strApiKey': config.STRUCTURE_APIKEY,
      'mathmlImagePath': config.S3MathImagePath ? config.S3MathImagePath : defaultMathImagePath,
      'productApiUrl': config.PRODUCTAPI_ENDPOINT,
      'manifestApiUrl': config.ASSET_POPOVER_ENDPOINT,
      'assessmentApiUrl': config.ASSESSMENT_ENDPOINT
    };
    let externalLFUrn = '';
    if (this?.props?.projectLearningFrameworks?.externalLF?.length) {
      externalLFUrn = this.props.projectLearningFrameworks.externalLF[0].urn;
    }
    const warningActionIntiator = this.warningActionIntiator;
    sendDataToIframe({ 'type': OpenLOPopup, 'message': { 
      'text': WarningPopupAction, 
      'data': currentSlateLOData, 
      'currentSlateId': slateManifestURN, 
      'chapterContainerUrn': '', 
      'isLOExist': true, 
      'editAction': '', 
      'apiConstants': apiKeys_LO, 
      'warningActionIntiator': warningActionIntiator,
      'externalLFUrn': externalLFUrn,
      'currentSlateLF': this.props.currentSlateLF
    } });
    this.toggleWarningPopup(false,e);
    this.warningActionIntiator = '';
  }

   handleWarningPopup=(e)=>{
    this.warningActionIntiator = e.target.innerText;
    this.toggleWarningPopup(true,e )
  }
  toggleWarningPopup = (toggleValue, event) => {
    if (event) {
      event.preventDefault();
    }
    this.setState({
      showWarningPopup: toggleValue
    })
    // this.props.closeLODropdown()
     showBlocker(toggleValue);
     hideBlocker();
  }
    render = () => {
      const enableExtLO =this.checkExternalFramework();
        return (
            <div>
          <div className="learningobjectivedropdown" ref={node => this.node = node}>
              <ul>
                <li onClick={this.toggleLoOptionsDropdown}>{AlignToCypressSlateDropdown}<span className='lo-navigation-icon'>{loNextIcon}</span></li>
                <li onClick={this.launchExternalFrameworkPopup} className={enableExtLO ? '' : 'disable-buttton'}>{AlignToExternalFrameworkSlateDropdown}</li>
              </ul>
            </div>
            {
                this.state.showLoOptions &&  
                <div  className="learningobjectivedropdown2" ref={node => this.node = node}>
                <ul>
                    {this.props.permissions.includes('lo_edit_metadata') && config.slateType === 'section' &&
                        <li onClick={(this.props.currentSlateLF === "externalLF") ? this.handleWarningPopup :this.learningObjectiveDropdown}> {AddLearningObjectiveSlateDropdown}</li>}
                    {this.props.permissions.includes('lo_edit_metadata') && config.slateType === 'section' &&
                        <li onClick={(this.props.currentSlateLF === "externalLF") ? this.handleWarningPopup :this.learningObjectiveDropdown}>{AddEditLearningObjectiveDropdown}</li>}
                    {this.props.permissions.includes('lo_edit_metadata') && config.slateType === 'assessment' &&
                        <li onClick={this.learningObjectiveDropdown}>{AddLearningObjectiveAssessmentDropdown}</li>}
                    <li className={this.props.currentSlateLOData && (this.props.currentSlateLOData.assessmentResponseMsg || this.props.currentSlateLOData.statusForSave)? '' :this.props.currentSlateLOData && (this.props.currentSlateLOData.id ? this.props.currentSlateLOData.id : this.props.currentSlateLOData.loUrn) ? '' : 'disabled'} style={{ cursor: 'not-allowed !important' }} onClick={this.learningObjectiveDropdown}>{ViewLearningObjectiveSlateDropdown}</li>
                    {config.slateType === 'section' && !hasReviewerRole() &&
                        <li className={this.props.currentSlateLOData && (this.props.currentSlateLOData.id ? this.props.currentSlateLOData.id : this.props.currentSlateLOData.loUrn) ? '' : 'disabled'} style={{ cursor: 'not-allowed !important' }} onClick={this.learningObjectiveDropdown}>{UnlinkSlateDropdown}</li>}
                </ul>
            </div> 
            }
           {this.showLOWarningPopup()}
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
    showSlateLockPopup
}

export default connect(mapStateToProps, mapActionToProps)(SlateTagDropdown);