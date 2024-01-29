import React from 'react';
import config from '../../config/config';
import { checkSlateLock } from '../../js/slateLockUtility.js';
import { showSlateLockPopup, toggleLOWarningPopup } from '../ElementMetaDataAnchor/ElementMetaDataAnchor_Actions';
import { OpenLOPopup, AlignToExternalFramework, AlignToExternalFrameworkSlateDropdown, AddEditLOsAssessmentSlate,
    ViewLOsAssessmentSlate, AddToExternalFrameworkAS, ViewExternalFrameworkAS
    } from '../../constants/IFrameMessageTypes';
import { hasReviewerRole, sendDataToIframe } from '../../constants/utility.js';
import { connect } from 'react-redux';
import { ASSESSMENT_ITEM, ASSESSMENT_ITEM_TDX, CYPRESS_LF, DISABLE_BUTTTON } from '../../constants/Element_Constants';
import { LEARNOSITY, LEARNING_TEMPLATE, PUF, CITE, TDX } from '../AssessmentSlateCanvas/AssessmentSlateConstants.js';
import { loNextIcon } from './../../images/ElementButtons/ElementButtons.jsx';
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
      this.setDropdownPosition();
    }
    handleClick = (e) => {
        if (this.closestByClass(e.target, 'leaningobjective-block')) {
        return;

        }
        this.props.closeLODropdown()

    }
    closestByClass = function(el, clazz) {
    // Traverse the DOM up with a while loop
    while (el.className != clazz && el.className !== undefined) {
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

    setDropdownPosition(){
      let element = this.node1;
      let elementInfo = element.getBoundingClientRect();
      if(elementInfo.x < 800){
        setTimeout(() => {
          this.node3.style.left = '10px';
        }, 0);
      }
    }

  /** Prepare data for Post-message in case of External LO*/
  prepareExtFrameworkData = () => {
    let slateManifestURN = config.tempSlateManifestURN ? config.tempSlateManifestURN : config.slateManifestURN
    let currentSlateLOData = this.props.currentSlateLOData;
    let lastAlignedLo = this.props.lastAlignedExternalLO;
    let apiKeys_LO = {
      'loApiUrl': config.LEARNING_OBJECTIVES_ENDPOINT,
      'strApiKey': config.STRUCTURE_APIKEY,
      'productApiUrl': config.PRODUCTAPI_ENDPOINT,
      'manifestApiUrl': config.ASSET_POPOVER_ENDPOINT,
      'assessmentApiUrl': config.ASSESSMENT_ENDPOINT,
      'myCloudProxySession': config.myCloudProxySession,
      'manifestReadonlyApi': config.MANIFEST_READONLY_ENDPOINT
    };
    const selectedLOs = this.props.currentSlateLOData;
    let externalLFUrn = [];
    if (this?.props?.projectLearningFrameworks?.externalLF?.length) {
      this.props.projectLearningFrameworks.externalLF.map(lf => externalLFUrn.push(lf.urn));
    }
    return {
      slateManifestURN, currentSlateLOData, apiKeys_LO, externalLFUrn, selectedLOs,lastAlignedLo
    }
  }

  /** Launch External LO Popup from Canvas*/
  launchExternalFrameworkPopup = (e) => {
    const {
      slateManifestURN, currentSlateLOData, apiKeys_LO, externalLFUrn, selectedLOs,lastAlignedLo
    } = this.prepareExtFrameworkData();
    const {slateLockInfo} = this.props
    const currentSlateLF=this.props.currentSlateLF;
    const defaultLF=this.props.defaultLF;
    const projectSharingRole = this.props?.projectSubscriptionDetails?.projectSharingRole === 'SUBSCRIBER'
    const slateVersioningStatus =  this.props?.slatePublishStatus || this.props?.setPopUpSlateLOstatus
    const isSubscribed = this.props?.projectSubscriptionDetails?.projectSubscriptionDetails?.isSubscribed
    const isSlateLocked = checkSlateLock(slateLockInfo)
    const hasLoEditPermission = this.props.permissions.includes('lo_edit_metadata')
    const isReviewerRole = hasReviewerRole()
    if (currentSlateLF === CYPRESS_LF && hasLoEditPermission){
      this.props.toggleLOWarningPopup(true,e.target.innerText);
    } else if (e?.target?.innerText == AlignToExternalFrameworkSlateDropdown && (hasLoEditPermission  ||isReviewerRole)) {
      sendDataToIframe({ 'type': 'tocToggle', 'message': { open: false } })
      sendDataToIframe({ 'type': 'canvasBlocker', 'message': { open: true } });
      // isApprovedSlate key is used both for approved slate and reviewer user
      sendDataToIframe({
        'type': OpenLOPopup,
        'message': {
          'text': AlignToExternalFramework,
          'data': currentSlateLOData,
          'lastAlignedLo':lastAlignedLo,
          'isLOExist': true,
          'editAction': '',
          'selectedLOs': selectedLOs,
          'apiConstants': apiKeys_LO,
          'externalLFUrn': externalLFUrn,
          'currentSlateId': slateManifestURN,
          'chapterContainerUrn': '',
          'currentSlateLF': currentSlateLF,
          'projectSharingRole': projectSharingRole,
          'isSubscribed': isSubscribed,
          'defaultLF': defaultLF,
          "isApprovedSlate": slateVersioningStatus || isReviewerRole,
          'isSlateLocked': isSlateLocked
        }
      })


      this.props.closeLODropdown();
    }

  }

  /** Enable/Disable External LOs Link Option based on External LF linked to Project*/
  checkExternalFramework = () => {
    let enableExtLF = false;
    if (this?.props?.projectLearningFrameworks?.externalLF?.length) {
      enableExtLF = true;
    }
    return enableExtLF;
  }

   /** Enable/Disable External LOs Link Option on assessment slate based on External LF linked to Project*/
   checkExternalFrameworkAS = () => {
    let enableExtLF = false;
    if (config.slateType === 'assessment' &&  this?.props?.projectLearningFrameworks?.externalLF?.length) {
      enableExtLF = true;
    }
    return enableExtLF;
  }

  toggleLoOptionsDropdownAS = () => {
    sendDataToIframe({ 'type': 'tocToggle', 'message': { open: false } })
    sendDataToIframe({ 'type': 'canvasBlocker', 'message': { open: true } });
    if(this.node3.style.display=='block'){
      this.node3.style.display='none'
    }
    else{
      this.node3.style.display='block'
    }
  }

  openAssessmentExternalPopup = (popupType) => {
    const {
      slateManifestURN, currentSlateLOData, apiKeys_LO, externalLFUrn, selectedLOs
    } = this.prepareExtFrameworkData();
    const {slateLockInfo} = this.props
    const projectSharingRole = this.props?.projectSubscriptionDetails?.projectSharingRole === 'SUBSCRIBER'
    const isSubscribed = this.props?.projectSubscriptionDetails?.projectSubscriptionDetails?.isSubscribed
    const slateVersioningStatus =  this.props?.slatePublishStatus || this.props?.setPopUpSlateLOstatus;
    const isSlateLocked = checkSlateLock(slateLockInfo)
    const currentSlateLF=this.props.currentSlateLF;
    const defaultLF=this.props.defaultLF;
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
        assessmentType: assessmentTypeLO,
        projectEntityUrn:config.projectEntityUrn
    }
    sendDataToIframe({ 'type': 'tocToggle', 'message': { open: false } })
    sendDataToIframe({ 'type': 'canvasBlocker', 'message': { open: true } });
    const isReviewerRole = hasReviewerRole()
    // isApprovedSlate key is used both for approved slate and reviewer user
    if(popupType==='add'){
      sendDataToIframe({
        'type': OpenLOPopup,
        'message': {
          'text': AddToExternalFrameworkAS,
          'data': currentSlateLOData,
          'isLOExist': true,
            'editAction': '',
            'selectedLOs': selectedLOs,
            'apiConstants': apiKeys_LO,
            'externalLFUrn': externalLFUrn,
            'currentSlateId': slateManifestURN,
            'chapterContainerUrn': '',
            'currentSlateLF': currentSlateLF,
            'assessmentUrn':  assessmentuRN,
            'previewData': previewData,
            'defaultLF': defaultLF,
            'projectSharingRole': projectSharingRole,
            'isSubscribed': isSubscribed,
          'isApprovedSlate': slateVersioningStatus || isReviewerRole,
            'isSlateLocked': isSlateLocked
        }
      })
    }
    else{
      sendDataToIframe({
        'type': OpenLOPopup,
        'message': {
          'text': ViewExternalFrameworkAS,
          'data': currentSlateLOData,
          'isLOExist': true,
            'editAction': '',
            'selectedLOs': selectedLOs,
            'apiConstants': apiKeys_LO,
            'externalLFUrn': externalLFUrn,
            'currentSlateId': slateManifestURN,
            'chapterContainerUrn': '',
            'currentSlateLF': currentSlateLF,
            'assessmentUrn': assessmentuRN,
            'previewData': previewData,
            'projectSharingRole': projectSharingRole,
            'isSubscribed': isSubscribed,
          'isApprovedSlate': slateVersioningStatus || isReviewerRole,
            'isSlateLocked': isSlateLocked
        }
      })
    }
    this.props.closeLODropdown();
  }
    render = () => {
      const enableExtLO =this.checkExternalFramework();
      const isExternalLoInAssessment = this.checkExternalFrameworkAS();
      const subscriberContent = (this.props?.projectSubscriptionDetails?.projectSharingRole === 'SUBSCRIBER' &&
        this.props?.projectSubscriptionDetails?.projectSubscriptionDetails?.isSubscribed) ? DISABLE_BUTTTON : "";
      return (
        <div>
          <div className="learningobjectivedropdown" ref={node1 => this.node1 = node1}>
              <ul>
                <div>
                  {
                    !isExternalLoInAssessment?
                    <li onClick={this.launchExternalFrameworkPopup} className={enableExtLO ? '' : DISABLE_BUTTTON}><span>{AlignToExternalFrameworkSlateDropdown}</span></li>
                    :
                    <li onClick={this.toggleLoOptionsDropdownAS} className={enableExtLO ? '' : DISABLE_BUTTTON}>
                      <span>{AlignToExternalFrameworkSlateDropdown}</span><span className='lo-navigation-icon2'>{loNextIcon}</span></li>
                  }
                </div>
              </ul>
            </div>
            <div className="learningobjectivedropdown2" ref={node3 => this.node3 = node3}>
                <ul>
                      <li className= {`${subscriberContent}`} onClick={() =>this.openAssessmentExternalPopup('add')}>{AddEditLOsAssessmentSlate}</li>
                      <li className={this.props.isLOExist ? '' : 'disabled'} onClick={() =>this.openAssessmentExternalPopup('view')}>{ViewLOsAssessmentSlate}</li>
                </ul>
            </div>
        </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isLOExist: state.metadataReducer.slateTagEnable,
        currentSlateLF:state.metadataReducer.currentSlateLF,
        slateLockInfo: state.slateLockReducer.slateLockInfo,
        projectLearningFrameworks: state.metadataReducer.projectLearningFrameworks,
        lastAlignedExternalLO:state.metadataReducer.lastAlignedExternalLO,
        defaultLF: state.metadataReducer.defaultLF
    }
}
const mapActionToProps = {
    showSlateLockPopup,
    toggleLOWarningPopup
}

export default connect(mapStateToProps, mapActionToProps)(SlateTagDropdown);
