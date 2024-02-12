import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TinyMceEditor from "../tinyMceEditor"
import { sendDataToIframe, hasReviewerRole } from '../../constants/utility.js';
import config from '../../config/config';
import { connect } from 'react-redux';
import './../../styles/ElementMetaDataAnchor/ElementMetaDataAnchor.css';
import { removeImageCache } from '../../js/utils';
import { EXTERNAL_LF } from '../../constants/Element_Constants.js';
import { AlignToExternalFramework, OpenLOPopup } from '../../constants/IFrameMessageTypes';
export class ElementMetaDataAnchor extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let wipmodel = {
      "text": `<p>Metadata Anchor</p>`
    }

    const { slateLockInfo } = this.props
    return (
      <div className="learningObjectiveContainer" id="slateLO" onClick={(e) => { !hasReviewerRole() && this.onLOClickHandle(this.props.currentSlateLOData, e) }} >
        <div className="container" >
          <div className="matadata_anchor" >
            <TinyMceEditor
              index={this.props.index}
              elementId={this.props.elementId}
              element={this.props.element}
              placeholder="Metadata Anchor"
              className="learningObjectiveinner"
              model={wipmodel}
              handleEditorFocus={this.props.handleFocus}
              slateLockInfo={slateLockInfo}
              handleBlur = {this.props.handleBlur}
              permissions={this.props.permissions}
            />
          </div>
          <div className="Container">
            <div>
              <TinyMceEditor
                index={this.props.index}
                elementId={this.props.elementId}
                element={this.props.element}
                placeholder="Please add learning objective by tagging a slate"
                className="learningObjectiveinnerText"
                model={this.prepareLOData()}
                slateLockInfo={slateLockInfo}
                handleEditorFocus={this.props.handleFocus}
                handleBlur = {this.props.handleBlur}
                permissions={this.props.permissions}
              />
            </div>
          </div>
        </div>
      </div>

    )
  }

  /**
     * @description - Prepare HTML for LO item on slate
     * @param {object} lodata | object of lo data
  */
  prepareLOData = () => {
    let loData = ""
    if (this.props?.currentSlateLOData && Array.isArray(this.props.currentSlateLOData)) {
      loData = this.props?.currentSlateLOData?.find(learningObj => (learningObj?.loUrn == this.props?.element?.elementdata?.loref ||
              learningObj?.id == this.props?.element?.elementdata?.loref))
    } else if (this.props?.currentSlateLOData) {
      loData = this.props.currentSlateLOData
    }
    let jsx;
    if (loData && loData != "" && loData.label && loData.label.en) {
      jsx = this.props.currentSlateLF == EXTERNAL_LF ?  `<div>${loData.label.en}</div>` : loData.label.en;
      const regex = /<math.*?data-src=\'(.*?)\'.*?<\/math>/g;
      jsx = jsx && typeof jsx === 'string' ? jsx.replace(regex, "<img src='$1'></img>") : jsx
      jsx= jsx && typeof jsx === 'string' ? jsx.replace(/'/g, '"') : jsx;
      jsx = jsx && typeof jsx === 'string' ? removeImageCache(jsx) : jsx
      if (document.getElementsByClassName('learningObjectiveinnerText').length > 0 && (loData.id != "" || loData.loUrn != "")) {
        let element = document.getElementsByClassName('learningObjectiveinnerText');
        element = Array.from(element);
        setTimeout(() => {
          element.forEach((item) => {
            if (item?.innerText !== "") {
              item.classList.remove("place-holder");
            }
          }, 100)
        })
      }
    }
    let currentLOData = {
      "text": jsx ? jsx : "<p></p>"
    }
    return currentLOData;
  }

  /**
    * @description - show popup on click on element that no data is present and also edit the data
    * @param {object} loldata
 */
  onLOClickHandle = (slateLoData, e) => {
    e.stopPropagation();
    this.props.handleFocus();
    if (config.editorRefID == e.target.id) {
      config.editorRefID = "";
      return false;
    }
    let loData = Array.isArray(slateLoData) ? slateLoData[0] : slateLoData;

    if (this.props.permissions.includes('lo_edit_metadata')) {
      if(this.props.currentSlateLF == 'externalLF' ){
        this.props.showBlocker(true);
        this.launchExternalFrameworkPopup()
      }
      else if ( !loData ) {
          this.props.showBlocker(true);
          sendDataToIframe({ 'type': 'getLOEditPopup', 'message': { lodata: loData, projectURN: config.projectUrn, slateURN: '',
          apiKeys_LO: '', wrapperURL: config.WRAPPER_URL } })
        }
    }
  }

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

  launchExternalFrameworkPopup = () => {
    const {
      slateManifestURN, currentSlateLOData, apiKeys_LO, externalLFUrn, selectedLOs,lastAlignedLo
    } = this.prepareExtFrameworkData();
    const currentSlateLF=this.props.currentSlateLF;
    const defaultLF=this.props.defaultLF;
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
          'defaultLF':defaultLF
        }
      })
  }

}
ElementMetaDataAnchor.defaultProps = {
  type: "element-learningobjectivemapping"
}

ElementMetaDataAnchor.propTypes = {
  /** Type of element to be rendered */
  type: PropTypes.string.isRequired,
  /** Handler to attach on element click */
  onClick: PropTypes.func,
  /** Handler to attach on element blur */
  onBlur: PropTypes.func,
  /** Handler to attach on element keyup */
  onKeyup: PropTypes.func,
  /** Handler to attach on element focus */
  onFocus: PropTypes.func

}

ElementMetaDataAnchor.displayName = "ElementMetaDataAnchor"
const mapStateToProps = (state) => {
  return {
    currentSlateLF: state.metadataReducer.currentSlateLF,
    currentSlateLOData: state.metadataReducer.currentSlateLOData,
    lastAlignedExternalLO: state.metadataReducer.lastAlignedExternalLO,
    currentSlateLODataMath: state.metadataReducer.currentSlateLODataMath,
    projectLearningFrameworks: state.metadataReducer.projectLearningFrameworks,
    defaultLF: state.metadataReducer.defaultLF
  }
}
export default connect(mapStateToProps)(ElementMetaDataAnchor);
