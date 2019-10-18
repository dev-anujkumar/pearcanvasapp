import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TinyMceEditor from "../tinyMceEditor"
import './../../styles/ElementMetaDataAnchor/ElementMetaDataAnchor.css';
import { sendDataToIframe } from '../../constants/utility.js';
import { ShowLoader, HideLoader} from '../../constants/IFrameMessageTypes.js';
import config from '../../config/config';
import axios from 'axios';
import { connect } from 'react-redux';
export class ElementMetaDataAnchor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClick = this.onClick.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyup = this.onKeyup.bind(this);
    this.onFocus = this.onFocus.bind(this);
    // this.onLOClickHandle = this.onLOClickHandle.bind(this);
    this.prepareLOData = this.prepareLOData.bind(this);
    
  }

  render() {
   let  wipmodel = {
      "text": `<p>Metadata Anchor</p>`
  }
 
    const { className, placeholder, model,openGlossaryFootnotePopUp, slateLockInfo,learningObjectiveOperations,currentSlateLOData,openAssetPopoverPopUp} = this.props
     return (
      <div   className="learningObjectiveContainer" >
        <div className="container">
          <div className="matadata_anchor" >
              <TinyMceEditor  
                  openAssetPopoverPopUp ={learningObjectiveOperations}
                  learningObjectiveOperations={learningObjectiveOperations}
                  openGlossaryFootnotePopUp={openGlossaryFootnotePopUp}
                  index={this.props.index}
                  elementId={this.props.elementId}
                  element={this.props.element}
                  placeholder="Metadata Anchor"
                  className="learningObjectiveinner"
                  model= {wipmodel}
                  handleEditorFocus={this.props.handleFocus}
                  onFocus={this.onFocus}
                  handleBlur = {this.props.handleBlur}
                  onKeyup={this.onKeyup}
                  onBlur={this.onBlur}
                  onClick={this.onClick}
                  slateLockInfo={slateLockInfo}
                  currentSlateLOData={this.props.currentSlateLOData}
                  />
          </div>
          <div className="Container">
              <div>
                <TinyMceEditor
                  learningObjectiveOperations={learningObjectiveOperations}
                  currentSlateLOData={currentSlateLOData}
                  openGlossaryFootnotePopUp={openGlossaryFootnotePopUp}
                  index={this.props.index}
                  elementId={this.props.elementId}
                  element={this.props.element}
                  placeholder="Please add learning objective by tagging a slate"
                  className="learningObjectiveinnerText"
                  model={this.prepareLOData(this.props.currentSlateLOData)}
                  handleEditorFocus={this.props.handleFocus}
                  onFocus={this.onFocus}
                  handleBlur = {this.props.handleBlur}
                  onKeyup={this.onKeyup}
                  onBlur={this.onBlur}
                  onClick={this.onClick}
                  slateLockInfo={slateLockInfo}
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
    let jsx;
    if(loData && loData!="" && loData.label && loData.label.en){
        jsx = loData.label.en;
    }
     let  currentLOData = {
      "text": jsx ? jsx : "<p></p>"
  }
    return currentLOData;
} 

 //Click function when element gets clicked
  onClick() {

  }
   //blur function when element gets blurred
  onBlur() {

  }
   //key function when we write something in element
  onKeyup() {

  }
  //focus function when element gets focused
  onFocus() {

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
    currentSlateLOData: state.metadataReducer.currentSlateLOData
  }
}
export default connect(mapStateToProps)(ElementMetaDataAnchor);