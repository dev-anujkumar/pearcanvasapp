/**
* Header Component of CITE/TDX Assessment
*/
import React, { Component } from 'react';
import '../../../../../styles/AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.css';
import Button from './../../../../ElementButtons';

class CiteTdxHeader extends Component {
    render() {
        const { title } = this.props.headerProps;

        return (
            <div className="header-container">
                <div className="header-block">
                    <h4 className="header-title">
                        {title}
                    </h4>
                    <span className="header-close-button"><Button type="assessmentCloseWindowIcon" onClick={this.props.headerProps.closeWindowAssessment} />
                    </span>
                </div>
            </div>
        );
    }
}

export default CiteTdxHeader;