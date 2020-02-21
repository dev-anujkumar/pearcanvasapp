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
                usageType: this.props.usageTypeMetadata
            }
            this.props.addCiteTdxFunction(obj);
            this.props.closeWindowAssessment();
      
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
        currentAssessmentSelected: state.citeTdxReducer.currentAssessmentSelected
    }
  }
  
  export default connect(
    mapStateToProps,
    null
  )(CiteTdxFooter);