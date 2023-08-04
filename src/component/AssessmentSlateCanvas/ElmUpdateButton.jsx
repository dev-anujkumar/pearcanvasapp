/**
* Component | ElmUpdateButton
* description | This is the Component for Update Button Field on Assessments for Elm
*/
/** ----- Import - Plugins ----- */
import React from 'react'
import { useEffect } from 'react';
/** ----- Import - Dependencies ----- */
import { approvedIcon } from '../../../src/images/ElementButtons/ElementButtons.jsx';
import { hasReviewerSubscriberRole } from '../../constants/utility.js';
import './../../styles/AssessmentSlateCanvas/AssessmentSlateCanvas.css';
import { ELM_INT } from './AssessmentSlateConstants.js';
import config from '../../config/config.js';

const ElmUpdateButton = (props) => {
    const { elmAssessment, updateElmVersion, buttonText, embeddedElmClass, elementType, status, assessmentItem, assessmentReducer, updateAssessmentVersion } = props;

    useEffect(() => {
        if(elmAssessment.showUpdateStatus && status && !hasReviewerSubscriberRole() && !assessmentItem){
            updateElmVersion()
        }
    }, [])

    useEffect(() => {
        const updateAssessmentItems = async () => {
            if (elmAssessment.showUpdateStatus && status && !hasReviewerSubscriberRole() && assessmentItem) {
                if (assessmentReducer.hasOwnProperty(elmAssessment.targetId) && assessmentReducer[elmAssessment.targetId]?.oldWorkUrn && !config.updatedAssessments.includes(elmAssessment.targetId)) {
                    const assessmentData = assessmentReducer[elmAssessment.targetId]
                    await updateAssessmentVersion(assessmentData.oldWorkUrn, assessmentData.currentWorkUrn)
                }
            }
        }
        updateAssessmentItems()
    }, [])

    const setUpdateDiv = (assessment) => {
        let updateDiv;
        const { assessmentStatus, showUpdateStatus } = assessment
        const approveText = assessmentStatus == 'final' ? "Approved" : "Unapproved"
        const approveIconClass = assessmentStatus == 'final' ? "enable" : "disable"

        if (showUpdateStatus === true) {  
            updateDiv = <div className="eml-int-status-block">
                {(elementType === ELM_INT) && <div className={`elm-status-div ${embeddedElmClass}`}>
                        <p className="eml-int-status-text-tm">{approveText}</p>
                        <span className={"approved-button " + approveIconClass}>{approvedIcon}</span>
                    </div>
                }
                {!status && <div className={`elm-update-button ${embeddedElmClass}`} onClick={updateElmVersion}><b className='elm-update-button-text'>{buttonText}</b></div>}
            </div>       
        } else {
            updateDiv = (elementType === ELM_INT) ? 
                <div className={`elm-status-div ${embeddedElmClass}`}>
                    <p className="eml-int-status-text-tm">{approveText}</p>
                    <span className={"approved-button " + approveIconClass}>{approvedIcon}</span>
                </div> :
                <div className={`elm-status-div ${embeddedElmClass}`}>{(approveText === "Unapproved" && assessmentItem) ? "" : <span className={`${assessmentItem ? "approved-button-embedded" : "approved-button"} ` + approveIconClass}>{approvedIcon}</span>}<p className={`${assessmentItem ? "approved-button-text-embedded" : "approved-button-text"} ` + approveIconClass}>{approveText}</p></div>
        
        }
        return updateDiv
    }

    return (setUpdateDiv(elmAssessment));
}
export default ElmUpdateButton;