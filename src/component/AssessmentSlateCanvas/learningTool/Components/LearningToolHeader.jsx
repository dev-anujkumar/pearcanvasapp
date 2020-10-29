/**
* Header Component of Learning Tool/Learning App Assessment
*/
import React from 'react';
import '../../../../styles/AssessmentSlateCanvas/LearningTool/LearningTool.css';
const LearningToolHeader = (props) => {

    const { setlearningAppType, learningSystems, setlearningToolDiscipline, apiResponseForDis, showDisFilterValues, capitalizeString } = props;
    /**
    * @discription - This function is for rendering disipline filter dynamically
    * @param {Array} disciplineApiResponse - Array of response from discipline API
    */
    const renderDisFilter = (disciplineApiResponse) => {
        let disciplineData = disciplineApiResponse.options && disciplineApiResponse.options.map((item, index) => {
            return <option key={index} value={item.prefLabel}>{item.prefLabel}</option>
        })
        return disciplineData;
    }

    /**
    * @discription - This function is for rendering disipline filter dynamically
    * @param {Array} learningToolList - Array of response for learning systems Dropdown
    */
    const renderLearningAppTypeDropdown = (learningToolList) => {
        let learningToolData = Object.values(learningToolList).map((learningTemplate, index) => {
            return <option key={index} value={learningTemplate.appType}>{learningTemplate.label}</option>
        })
        return learningToolData;
    }

    const disabledOption = '<option value="" selected disabled>Select One</option>'
    
    return (
        <div className="learningToolHeaderTypeFilter">
            <div className="spanLTFilterType">Learning App Type <span className="required-field">*</span></div>
            <select className="learningToolType" onChange={setlearningAppType}>
                <option value="" selected>Select One</option>
                {renderLearningAppTypeDropdown(learningSystems)}
            </select>
            {/* Render the discipline dropdown dynamically */}
            <span className="spanLTFilterDis">Discipline</span>
            <select className="learningToolDis" onChange={setlearningToolDiscipline}>
                <option value="" selected>Select One</option>
                {showDisFilterValues ? renderDisFilter(apiResponseForDis) : disabledOption }
            </select>
        </div>
    );
}
export default LearningToolHeader;