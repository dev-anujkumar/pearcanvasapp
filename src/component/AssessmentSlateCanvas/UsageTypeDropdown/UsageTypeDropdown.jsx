/**
* Search and Filter Assessments Component of Learnosity Assessment
*/
import React from 'react'
import config from '../../../config/config';
import { hasReviewerRole } from '../../../constants/utility';
import '../../../styles/AssessmentSlateCanvas/usageTypeDropdown.css';
export const UsageTypeDropdown = (props) => {

   const renderDropdown = () => {
        let assessmentType = props && props.usageTypeList && props.usageTypeList.map((usageType, i) =>
            <li key={i} className="slate_assessment_metadata_dropdown_name" onClick={(e) => !hasReviewerRole() && props.clickHandlerFn(usageType, e)}>{usageType}</li>
        )
        return assessmentType
    }
    
    return (
        <>
            {renderDropdown()}
        </>
    );
}
