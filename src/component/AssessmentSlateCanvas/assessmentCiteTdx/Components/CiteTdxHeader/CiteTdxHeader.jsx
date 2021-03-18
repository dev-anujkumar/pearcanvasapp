/**
* Header Component of CITE/TDX Assessment
*/
import React, { Component } from 'react';
import '../../../../../styles/AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.css';
import Button from './../../../../ElementButtons';
import { ASSESSMENT_PICKER_OPENERS } from '../../../AssessmentSlateConstants.js';
class CiteTdxHeader extends Component {
    
    handleClose = () => {
        const { openedFrom, assessmentType, assessmentSlateObj, setCiteTdxFilterData } = this.props.headerProps;
        this.props.headerProps.closeWindowAssessment();
        this.props.resetPage(true);
        if (openedFrom == ASSESSMENT_PICKER_OPENERS.FULL_ASSESSMENT) {
            setCiteTdxFilterData(assessmentType, assessmentSlateObj);
        }
    }
    
    render() {
        const { title } = this.props.headerProps;

        return (
            <div className="header-container">
                <div className="header-block">
                    <h4 className="header-title">
                        {title}
                    </h4>
                    <span className="header-close-button"><Button type="assessmentCloseWindowIcon" onClick={this.handleClose} />
                    </span>
                </div>
            </div>
        );
    }
}

export default CiteTdxHeader;