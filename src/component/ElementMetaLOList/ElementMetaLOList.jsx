import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TinyMceEditor from "../tinyMceEditor"
import { connect } from 'react-redux';
import config from '../../config/config';
import { sendDataToIframe } from '../../constants/utility.js';
import { OpenLOPopup, NoSlateTagIS } from '../../constants/IFrameMessageTypes.js';
import '../../styles/ElementMetaLOList/ElementMetaLOList.css';
import { setCurrentModule, reRenderLO } from '../ElementMetaDataAnchor/ElementMetaDataAnchor_Actions';

export class ElementMetaLOList extends Component {
  //To show module name if groupby module is present in wip
  componentDidMount() {
    this.renderCurrentModule()
  }
  componentDidUpdate(prevProps, prevState){
    if((this.props.isRenderMetdataLO !=prevProps.isRenderMetdataLO && this.props.isRenderMetdataLO==true)|| (this.props.currentSlateLOData.length!=prevProps.currentSlateLOData.length)){
      this.props.reRenderLO(false)
      this.renderCurrentModule()
    }
  }
  renderCurrentModule = () => {
    if (this.props.element && this.props.element.elementdata.groupby && this.props.element.elementdata.groupby == "module" && this.props.currentSlateLOData.length>0) {
      this.props.setCurrentModule(true);
      let els = document.getElementsByClassName('moduleContainer');
      if (els.length > 0) {
        els = Array.from(els);
        els.forEach((item, i) => {
          let children = els[i].querySelectorAll('.moduleContainer .learningObjectiveData');
          if (children.length > 0) {
            els[i].classList.add('showmodule');
          }
        })
      }
      else {
        this.props.reRenderLO(true)
      }
    }
    else {
      this.props.setCurrentModule(false)
    }
  }
  render() {
    let wipmodel = {
      "text": `<p>Metadata Anchor</p>`
    }
    let LOListmodel = {
      "text": `<p>Learning Objectives</p>`
    }

    const { slateLockInfo } = this.props
    return (

      <div className="learningObjectiveContainer" id="introslateLOL" onClick={(e) => this.onLOLClickHandle(this.props.currentSlateLOData, e)} >
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
              handleBlur={this.props.handleBlur}
              permissions={this.props.permissions}
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
                    handleBlur={this.props.handleBlur}
                    permissions={this.props.permissions}
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
                  handleBlur={this.props.handleBlur}
                  permissions={this.props.permissions}
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
    if (document.getElementsByClassName('learningObjectiveinnerText').length) {
      document.getElementsByClassName('learningObjectiveinnerText')[0].classList.add("place-holder");
    }
    let jsx, finalloldata = "";
    if (lolData !== "" && lolData.length > 0) {
      lolData.forEach((value, index) => {
        finalloldata += value.loContent ? value.loContent : value;
      })
      jsx = "<div>" + finalloldata + "</div>";
      if (document.getElementsByClassName('learningObjectiveinnerText').length) {
        document.getElementsByClassName('learningObjectiveinnerText')[0].classList.remove("place-holder");
      }
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
  onLOLClickHandle(lolData, e) {
    /**
    * @description - To check is it tinymce current target and click on current element id
    */
    this.props.handleFocus();
    if (config.editorRefID == e.target.id) {
      config.editorRefID = "";
      return false;
    }
    if (lolData == "" || (lolData && lolData.length === 0)) {
      this.props.showBlocker(true);
      let that = this;
      setTimeout(function () {
        sendDataToIframe({ 'type': OpenLOPopup, 'message': { 'text': NoSlateTagIS, 'data': '', 'chapterContainerUrn': '', 'isLOExist': false, 'editAction': '' } }, config.WRAPPER_URL)
        that.props.showBlocker(false);
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
    currentSlateLOData: state.metadataReducer.currentSlateLOData,
    isRenderMetdataLO:state.metadataReducer.isRenderMetdataLO
  }
}
const mapActionToProps = {
  setCurrentModule,
  reRenderLO
}
export default connect(mapStateToProps, mapActionToProps)(ElementMetaLOList);