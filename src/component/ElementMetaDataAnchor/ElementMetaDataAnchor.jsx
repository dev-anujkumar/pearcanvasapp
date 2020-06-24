import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TinyMceEditor from "../tinyMceEditor"
import { sendDataToIframe } from '../../constants/utility.js';
import config from '../../config/config';
import { connect } from 'react-redux';
import './../../styles/ElementMetaDataAnchor/ElementMetaDataAnchor.css';
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
      <div className="learningObjectiveContainer" id="slateLO" onClick={(e) => { this.onLOClickHandle(this.props.currentSlateLOData, e) }} >
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
                model={this.prepareLOData(this.props.currentSlateLOData)}
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
  prepareLOData = (loData) => {
    if (document.getElementsByClassName('learningObjectiveinnerText').length > 0) {
      let element = document.getElementsByClassName('learningObjectiveinnerText');
      element = Array.from(element);
      element.forEach((item) => {
        item.classList.add("place-holder");
      })


    }
    let jsx;
    if (loData && loData != "" && loData.label && loData.label.en) {
      jsx = loData.label.en;
      if (document.getElementsByClassName('learningObjectiveinnerText').length > 0 && (loData.id != "" || loData.loUrn != "")) {
        let element = document.getElementsByClassName('learningObjectiveinnerText');
        element = Array.from(element);
        element.forEach((item) => {
          item.classList.remove("place-holder");
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
  onLOClickHandle = (loData, e) => {
    this.props.handleFocus();
    if (config.editorRefID == e.target.id) {
      config.editorRefID = "";
      return false;
    }
    if (this.props.permissions.includes('lo_edit_metadata')) {
      if (loData && loData.label && loData.label.en) {
        loData.label.en = this.props.currentSlateLODataMath;
      }
      this.props.showBlocker(true);
      let slateManifestURN= config.tempSlateManifestURN ? config.tempSlateManifestURN : config.slateManifestURN
      let apiKeys = [config.ASSET_POPOVER_ENDPOINT, config.STRUCTURE_APIKEY, config.LEARNING_OBJECTIVES_ENDPOINT, config.ASSESSMENT_ENDPOINT];
      sendDataToIframe({ 'type': 'getLOEditPopup', 'message': { lodata: loData, projectURN: config.projectUrn, slateURN: slateManifestURN, apiKeys, wrapperURL: config.WRAPPER_URL } })
    }
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
    currentSlateLOData: state.metadataReducer.currentSlateLOData,
    currentSlateLODataMath: state.metadataReducer.currentSlateLODataMath,

  }
}
export default connect(mapStateToProps)(ElementMetaDataAnchor);