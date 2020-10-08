/**
* Component | ElmUpdateButton
* description | This is the Component for Update Button Field on Assessments for Elm
*/
/** ----- Import - Plugins ----- */
import React from 'react'
/** ----- Import - Dependencies ----- */
import { approvedIcon } from '../../../src/images/ElementButtons/ElementButtons.jsx';
import './../../styles/AssessmentSlateCanvas/AssessmentSlateCanvas.css';

const ElmUpdateButton = (props) => {

    const { elmAssessment, updateElmVersion } = props;
    const setUpdateDiv = (assessment) => {
        let updateDiv;
        const { assessmentStatus, latestWorkUrn, activeWorkUrn } = assessment
        if (assessmentStatus == 'final' && (latestWorkUrn != activeWorkUrn)) {
            updateDiv = <div className='elm-update-button' onClick={updateElmVersion}><b className='elm-update-button-text'>Update Available</b></div>
        } else {
            const approveText = assessmentStatus == 'final' ? "Approved" : "Unapproved"
            const approveIconClass = assessmentStatus == 'final' ? "enable" : "disable"
            updateDiv = <div className="elm-status-div"><span className={"approved-button " + approveIconClass}>{approvedIcon}</span><p className={"approved-button-text " + approveIconClass}>{approveText}</p></div>
        }
        return updateDiv
    }

    return (
        <>
            {elmAssessment && setUpdateDiv(elmAssessment)}
        </>
    );
}
export default ElmUpdateButton;