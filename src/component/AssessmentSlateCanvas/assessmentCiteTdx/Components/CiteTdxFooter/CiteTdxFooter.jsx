/**
* Footer Component for CITE/TDX Assessment
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../../../styles/AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.css';

class CiteTdxFooter extends Component {
    
    sendCiteTdxAssessment =() =>{
        
            let obj = {
                id: this.props.currentAssessmentSelected.versionUrn,
                title: this.props.currentAssessmentSelected && this.props.currentAssessmentSelected.name? this.props.currentAssessmentSelected.name: "dummy",
                usageType: this.props.usageTypeMetadata,
                slateType: this.props.openedFrom,
                singleAssessmentID:  this.props.currentSingleAssessmentSelected ? this.props.currentSingleAssessmentSelected:""
            }
            this.props.addCiteTdxFunction(obj);
            if(this.props.openedFrom !== "singleSlateAssessment"){
                this.props.closeWindowAssessment();
            }
            
      
    }
    render() {
        return (
            <div className="assessmentpopup-footer">
                <div className="assesmentfooter-inner">
                    <button className="assessmentpopup cancel-assessment" onClick={this.props.closeWindowAssessment}>CANCEL</button>
                    <button className="assessmentpopup add-assessment" onClick={this.sendCiteTdxAssessment}>SELECT</button>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentAssessmentSelected: state.citeTdxReducer.currentAssessmentSelected,
        currentSingleAssessmentSelected: state.citeTdxReducer.currentSingleAssessmentSelected
    }
  }
  
  export default connect(
    mapStateToProps,
    null
  )(CiteTdxFooter);
