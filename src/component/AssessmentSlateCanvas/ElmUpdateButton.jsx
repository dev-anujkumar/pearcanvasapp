/**
* Component | ElmUpdateButton
* description | This is the Component for Update Button Field on Assessments for Elm
*/
/** ----- Import - Plugins ----- */
import React from 'react'
import { useEffect } from 'react';
/** ----- Import - Dependencies ----- */
import { approvedIcon } from '../../../src/images/ElementButtons/ElementButtons.jsx';
import './../../styles/AssessmentSlateCanvas/AssessmentSlateCanvas.css';
import { ELM_INT } from './AssessmentSlateConstants.js';
import { APPROVED_BUTTON } from '../../constants/Element_Constants.js';

const ElmUpdateButton = (props) => {
    const { elmAssessment, updateElmVersion, buttonText, embeddedElmClass, elementType } = props;


    const setUpdateDiv = (assessment) => {
        const { assessmentStatus, showUpdateStatus } = assessment
        const approveText = assessmentStatus == 'final' ? "Approved" : "Unapproved"
        const approveIconClass = assessmentStatus == 'final' ? "enable" : "disable"

        if (showUpdateStatus === true) {
            return <div className="eml-int-status-block">
                {(elementType === ELM_INT) && <div className={`elm-status-div ${embeddedElmClass}`}>
                        <p className="eml-int-status-text-tm">{approveText}</p>
                        <span className={APPROVED_BUTTON + " " + approveIconClass}>{approvedIcon}</span>
                    </div>
                }
                <div className={`elm-update-button ${embeddedElmClass}`} onClick={updateElmVersion}><b className='elm-update-button-text'>{buttonText}</b></div>
            </div>;
        } else {
            return (elementType === ELM_INT) && 
            <div className={`elm-status-div ${embeddedElmClass}`}>
                <p className="eml-int-status-text-tm">{approveText}</p>
                <span className={APPROVED_BUTTON + " " + approveIconClass}>{approvedIcon}</span>
            </div>;
        }
    }

    return (setUpdateDiv(elmAssessment));
}
export default ElmUpdateButton;
