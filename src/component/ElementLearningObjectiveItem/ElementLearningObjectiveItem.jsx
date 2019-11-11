import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TinyMceEditor from "./../tinyMceEditor"
import './../../styles/ElementAuthoring/ElementAuthoring.css';
export class ElementLearningObjectiveItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  

  render() {
    let wipModel = null;
    if (!model) {
        wipModel = {
            "text": `<h2 class=\"heading2learningObjectiveItem\">sdas</h2>`
        }
    }
    const { className, placeholder, model,openGlossaryFootnotePopUp, slateLockInfo,learningObjectiveOperations,currentSlateLOData,openAssetPopoverPopUp} = this.props
     return (
        <TinyMceEditor
          openAssetPopoverPopUp ={openAssetPopoverPopUp}
          learningObjectiveOperations={learningObjectiveOperations}
          currentSlateLOData={currentSlateLOData}
          openGlossaryFootnotePopUp={openGlossaryFootnotePopUp}
          index={this.props.index}
          elementId={this.props.elementId}
          element={this.props.element}
          placeholder="Type Something..."
          className={className}
          model={wipModel || model}
          handleEditorFocus={this.props.handleFocus}
          onFocus={this.onFocus}
          handleBlur = {this.props.handleBlur}
          onKeyup={this.onKeyup}
          onBlur={this.onBlur}
          onClick={this.onClick}
          slateLockInfo={slateLockInfo}
          onListSelect={this.props.onListSelect}
        />
    )

    
  }
  onClick = () => {

  }
  onBlur = () =>  {

  }
  onKeyup = () =>  {

  }
  onFocus = () =>  {

  }
}

ElementLearningObjectiveItem.displayName = "ElementLearningObjectiveItem"
ElementLearningObjectiveItem.defaultProps = {
  type: "element-authoredtext"
}

ElementLearningObjectiveItem.propTypes = {
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

export default ElementLearningObjectiveItem