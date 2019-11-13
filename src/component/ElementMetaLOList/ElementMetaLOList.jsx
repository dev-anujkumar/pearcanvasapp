import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TinyMceEditor from "../tinyMceEditor"
import { connect } from 'react-redux';
import config from '../../config/config';
import { sendDataToIframe } from '../../constants/utility.js';
import { OpenLOPopup, NoSlateTagIS } from '../../constants/IFrameMessageTypes.js';
import '../../styles/ElementMetaLOList/ElementMetaLOList.css';
import { ShowLoader, HideLoader } from '../../constants/IFrameMessageTypes.js';
export class ElementMetaLOList extends Component {
  render() {
    let wipmodel = {
      "text": `<p>Metadata Anchor</p>`
    }
    let LOListmodel = {
      "text": `<p>Learning Objectives</p>`
    }

    const { slateLockInfo} = this.props
    return (

      <div className="learningObjectiveContainer" onClick={(e) => this.onLOLClickHandle(this.props.currentSlateLOData, e)} >
        <div className="container">
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
            />
          </div>
          <div className="Container">
            <div className="divLearningObjectives">
              <div className="divLearningObjectiveListHeaderLabel">
                <h2 className="heading2LearningObjectiveListHeaderLabel" resource="">
                  <TinyMceEditor
                    index={this.props.index}
                    elementId={this.props.elementId}
                    element={this.props.element}
                    placeholder=""
                    className="learningObjectiveinner"
                    model={LOListmodel}
                    handleEditorFocus={this.props.handleFocus}
                    slateLockInfo={slateLockInfo}
                  />
                </h2>
                <TinyMceEditor
                  index={this.props.index}
                  elementId={this.props.elementId}
                  element={this.props.element}
                  placeholder="Please add learning objective by tagging a slate"
                  className="learningObjectiveinnerText"
                  model={this.prepareLOLData(this.props.currentSlateLOData)}
                  handleEditorFocus={this.props.handleFocus}
                  slateLockInfo={slateLockInfo}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }

  /**
     * @description - prepare MA HTML data
     * @param {object} loldata | object of data and lourn 
  */
  prepareLOLData = (lolData) => {
    let jsx, finalloldata = "";
    if (lolData !== "" && lolData.length> 0) {
      lolData.forEach((value, index) => {
        finalloldata += value.loContent ? value.loContent : value;

      })
      jsx = "<div>" + finalloldata + "</div>";
    }
    let currentLOLData = {
      "text": jsx ? jsx : "<p></p>"
    }
    return currentLOLData;
  }

  /**
     * @description - show popup on click on element that no data is present 
     * @param {object} loldata
  */
  onLOLClickHandle(lolData) {
    if (config.editorRefID == e.target.id) {
      config.editorRefID = "";
      return false;
    }
    if(lolData == "" || (lolData && lolData.length === 0)){
      sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
      setTimeout(function(){ sendDataToIframe({'type': OpenLOPopup,'message':{'text':NoSlateTagIS,'data':'','chapterContainerUrn':'','isLOExist':false,'editAction':''}},config.WRAPPER_URL)
      sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
      }, 1000);
    }
    
  }
  
}
ElementMetaLOList.defaultProps = {
  type: "element-generateLOlist"
}

ElementMetaLOList.propTypes = {
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
ElementMetaLOList.displayName = "ElementMetaLOList"
const mapStateToProps = (state) => {
  return {
    currentSlateLOData: state.metadataReducer.currentSlateLOData
  }
}
export default connect(mapStateToProps)(ElementMetaLOList);