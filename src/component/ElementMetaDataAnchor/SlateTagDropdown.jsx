import React from 'react';
import config from '../../config/config';
import { checkSlateLock } from '../../js/slateLockUtility.js';
import { showSlateLockPopup } from '../ElementMetaDataAnchor/ElementMetaDataAnchor_Actions';
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
import PopUp from '../PopUp/PopUp.jsx';
// Static data for rendering external alignment pop-up.
const externalLoData = {
    "id": "urn:pearson:goalframework:6f5e707c-4d7a-4294-b02c-ad2a4af94d68",
    "label": {
      "en": "The Sociology Project 2.5"
    },
    "learningObjectives": [
      {
        "id": "urn:pearson:educationalgoal:72faba30-da06-4d9e-9499-6d775ead3b9b",
        "subject": "https://schema.pearson.com/ns/domains/mathematics",
        "description": {
          "en": "highereducation"
        },
        "label": {
          "en": "test 1110022 HE25"
        },
        "learningObjectives": [
          {
            "id": "urn:pearson:educationalgoal:a3eba9d0-3be5-4bbe-b688-47ea32751924",
            "subject": "https://schema.pearson.com/ns/domains/mathematics",
            "label": {
              "en": "LO 2 subtopic5"
            },
            "learningObjectives": [
              {
                "id": "urn:pearson:educationalgoal:1d186167-674e-4552-aade-d7e415f05ccd",
                "subject": "https://schema.pearson.com/ns/domains/mathematics",
                "label": {
                  "en": "LO 2 LO0"
                }
              },
              {
                "id": "urn:pearson:educationalgoal:f18416ea-0c3a-4421-bd17-01ce5c90d6b7",
                "subject": "https://schema.pearson.com/ns/domains/mathematics",
                "label": {
                  "en": "LO 2 LO8"
                }
              },
              {
                "id": "urn:pearson:educationalgoal:27ed15ee-0b0d-46ce-b991-04ff243ed283",
                "subject": "https://schema.pearson.com/ns/domains/mathematics",
                "label": {
                  "en": "LO 2 LO1"
                }
              },
              {
                "id": "urn:pearson:educationalgoal:c631c46e-8031-4d29-a58a-a11f678016c5",
                "subject": "https://schema.pearson.com/ns/domains/mathematics",
                "label": {
                  "en": "LO 2 LO7"
                }
              },
              {
                "id": "urn:pearson:educationalgoal:78410e6d-7030-481c-a09a-e5f0f5256392",
                "subject": "https://schema.pearson.com/ns/domains/mathematics",
                "label": {
                  "en": "LO 2 LO4"
                }
              },
              {
                "id": "urn:pearson:educationalgoal:0910b8a1-747e-4991-9ba9-045e59b91584",
                "subject": "https://schema.pearson.com/ns/domains/mathematics",
                "label": {
                  "en": "LO 2 LO9"
                }
              },
              {
                "id": "urn:pearson:educationalgoal:7b91a122-b422-47ee-ae28-9073ddf89c7c",
                "subject": "https://schema.pearson.com/ns/domains/mathematics",
                "label": {
                  "en": "LO 2 LO5"
                }
              },
              {
                "id": "urn:pearson:educationalgoal:f6825f98-4b6f-4ad1-8f92-2dcaed4d10a2",
                "subject": "https://schema.pearson.com/ns/domains/mathematics",
                "label": {
                  "en": "LO 2 LO2"
                }
              },
              {
                "id": "urn:pearson:educationalgoal:f2477967-bf2d-4484-bba8-6e95f31bc2f2",
                "subject": "https://schema.pearson.com/ns/domains/mathematics",
                "label": {
                  "en": "LO 2 LO3"
                }
              },
              {
                "id": "urn:pearson:educationalgoal:480860f3-6d4e-4e93-a406-10744a17e955",
                "subject": "https://schema.pearson.com/ns/domains/mathematics",
                "label": {
                  "en": "LO 2 LO6"
                }
              }
            ]
          }
        ]
      }
    ]
  }

    


class SlateTagDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            showLoOptions:false,
            showWarningPopup:false
        }
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
        else if(e.target.innerText == AlignToExternalFrameworkSlateDropdown){
            sendDataToIframe({ 'type': OpenLOPopup, 'message': { 'text': AlignToExternalFramework, 'data': externalLoData, 'currentSlateId': slateManifestURN, 'chapterContainerUrn': '', 'isLOExist': true, 'editAction': '', 'apiConstants': apiKeys_LO } })
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
    const selectedLOs = [
      {
        "id": "urn:pearson:educationalgoal:f2477967-bf2d-4484-bba8-6e95f31bc2f2",
        "subject": "https://schema.pearson.com/ns/domains/mathematics",
        "label": {
          "en": "LO 2 LO3"
        }
      },
      {
        "id": "urn:pearson:educationalgoal:1d186167-674e-4552-aade-d7e415f05ccd",
        "subject": "https://schema.pearson.com/ns/domains/mathematics",
        "label": {
          "en": "LO 2 LO0"
        }
      }
    ]
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
    let openSPA = true;

    // if (openSPA) { /** Launch CE SPA for External Framework */
    // this.toggleWarningPopup(true, e);
    // } else {
    if (e?.target?.innerText == AlignToExternalFrameworkSlateDropdown) {
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
          'chapterContainerUrn': ''
        }
      })
    }
    // }
    this.props.closeLODropdown();
  } 
  /** To enable/disable the External Framework option in dropdown */
  checkExternalFramework = () => {
    let enableExtLF = false;
    if (this?.props?.projectLearningFrameworks?.externalLF?.length) {
      enableExtLF = true;
    }
    return enableExtLF;
  }
  showLOWarningPopup = () => {
    /**
     * declare warningText from store value based on LF type 
     */
    if (this.state.showWarningPopup) {
      // this.props.showBlocker(true)
      // showTocBlocker();
      //props..curentLF == 'cypress' ? 'text with same value'
      return (
        <PopUp dialogText={'Text'}//warningText | send dialog value here
          active={true}
          warningHeaderText={`Warning`}
          togglePopup={this.toggleWarningPopup}
          isInputDisabled={true}
          lOPopupClass="split-slate"
          LOPopup={true}
          yesButtonHandler={this.unlinkSlateLOs}
        />
      )
    } else {
      return null
    }
  }
  unlinkSlateLOs = (e) => {
    /**
     * add handler here
     */
    alert('unlink data')
    this.toggleWarningPopup(false,e);
  }

  toggleWarningPopup = (toggleValue, event) => {
    if (event) {
      event.preventDefault();
    }
    this.setState({
      showWarningPopup: toggleValue
    })
    // this.showCanvasBlocker(toggleValue);
  }
    render = () => {
      const enableExtLO =this.checkExternalFramework()
        return (
            <div>
          <div className="learningobjectivedropdown" ref={node => this.node = node}>
            <ul>
                <li onClick={this.toggleLoOptionsDropdown}> {AlignToCypressSlateDropdown}</li>
                <li onClick={this.launchExternalFrameworkPopup} className={enableExtLO ? '' : 'disable-buttton'}>{AlignToExternalFrameworkSlateDropdown}</li>
            </ul>
            </div>
            {
                this.state.showLoOptions &&  
                <div style={{left:'-10px'}} className="learningobjectivedropdown" ref={node => this.node = node}>
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
            }
           {this.showLOWarningPopup()}
        </div>            
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isLOExist: state.metadataReducer.slateTagEnable,
        slateLockInfo: state.slateLockReducer.slateLockInfo,
        projectLearningFrameworks: state.metadataReducer.projectLearningFrameworks
    }
}
const mapActionToProps = {
    checkSlateLock,
    showSlateLockPopup
}

export default connect(mapStateToProps, mapActionToProps)(SlateTagDropdown);