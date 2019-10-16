import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TinyMceEditor from "../tinyMceEditor"
import { connect } from 'react-redux';
export class ElementMetaLOList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClick = this.onClick.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyup = this.onKeyup.bind(this);
    this.onFocus = this.onFocus.bind(this);
    // this.onLOLClickHandle = this.onLOLClickHandle.bind(this);
    this.prepareLOLData = this.prepareLOLData.bind(this);
    
  }

  render() {
   let  wipmodel = {
      "text": `<p>Metadata Anchor</p>`
  }
  let  LOListmodel = {
    "text": `<p>Learning Objectives</p>`
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
                        <div className="divLearningObjectives">
                            <div className="divLearningObjectiveListHeaderLabel">
                                <h2 className="heading2LearningObjectiveListHeaderLabel" resource=""><TinyMceEditor
                                    learningObjectiveOperations={learningObjectiveOperations}
                                    currentSlateLOData={currentSlateLOData}
                                    openGlossaryFootnotePopUp={openGlossaryFootnotePopUp}
                                    index={this.props.index}
                                    elementId={this.props.elementId}
                                    element={this.props.element}
                                    placeholder=""
                                    className="learningObjectiveinner"
                                    model={LOListmodel}
                                    handleEditorFocus={this.props.handleFocus}
                                    onFocus={this.onFocus}
                                    handleBlur = {this.props.handleBlur}
                                    onKeyup={this.onKeyup}
                                    onBlur={this.onBlur}
                                    onClick={this.onClick}
                                    slateLockInfo={slateLockInfo}
                                /></h2>
                                   <TinyMceEditor
                                        learningObjectiveOperations={learningObjectiveOperations}
                                        currentSlateLOData={currentSlateLOData}
                                        openGlossaryFootnotePopUp={openGlossaryFootnotePopUp}
                                        index={this.props.index}
                                        elementId={this.props.elementId}
                                        element={this.props.element}
                                        placeholder="Please add learning objective by tagging a slate"
                                        className="learningObjectiveinnerText"
                                        model={this.prepareLOLData(this.props.currentSlateLOData)}
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
    </div>
        
    )
  }
  prepareLOLData = (lolData) => {
      let jsx,finalloldata = "";
        if(lolData!== ""){
         lolData.forEach((value, index) => {
               // if(value.learningObjectives.length > 0) {
               // console.log(value.learningObjectives[0].label.en)
                finalloldata +=value;
                
            })
            jsx =  "<div>"+finalloldata+"</div>";
        }
     let  currentLOLData = {
      "text": jsx ? jsx : "<p></p>"
  }
    return currentLOLData;
} 
 
// onLOLClickHandle(lolData){
//   if(lolData ==""){
//       window.parent.postMessage({'type': 'openLoPopup','message':{'text':'NO SLATE TAG AVAILABLE','data':'','chapterContainerUrn':'','isLOExist':false,'editAction':''}},WRAPPER_URL)
//    }
// }
  onClick() {

  }
  onBlur() {

  }
  onKeyup() {

  }
  onFocus() {

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

const mapStateToProps = (state) => {
  return {
    currentSlateLOData: state.metadataReducer.currentSlateLOData
  }
}
export default connect(mapStateToProps)(ElementMetaLOList);