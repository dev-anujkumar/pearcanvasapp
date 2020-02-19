/**
* Footer Component for CITE/TDX Assessment
*/
import React, { Component } from 'react';
import '../../../../../styles/AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.css';

class FilterAssessmentData extends Component {
    render() {
        return (
            <div className="assessmentpopup-footer">
                <div className="assesmentfooter-inner">
                    <button className="assessmentpopup cancel-assessment" onClick={this.props.closeWindowAssessment}>CANCEL</button>
                    <button className="assessmentpopup add-assessment">SELECT</button>
                </div>
            </div>

        );
    }
}

export default FilterAssessmentData;