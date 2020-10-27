/**
* Search Bar Component of Learning Tool/Learning App Assessment
*/
import React, { useState } from 'react';
import '../../../../styles/AssessmentSlateCanvas/LearningTool/LearningTool.css';
const LearningToolSearch = (props) => {

    const { error_icon, showError, selectedTypeValue, searchTextCondition } = props;

    /*** @description - This function is to call search function for the search term 
     * @param e - event triggered
    */
    const handleSearch = (e, selectedValue) => {
        e.preventDefault();
        props.learningToolSearch(e, selectedValue);
    }

    /*** @description - This function is to handle the value in searchbar input
     * @param event - event triggered
    */
    const handleChange = (event) => {
        let value = event.target.value;
        setSearchValue(value);
        props.validateSearch(event, value);
    }
    return (
        <div className="learningToolHeaderSearchDiv">
            <div className="learningToolHeaderSearchBar">
                <input className={`learningToolSearchBar ${showError ? "error" : ""}`} id="learningToolSearchBar" type="text" placeholder="Enter Keyword to search" onChange={handleChange} name="search2" />
                {showError ? <img className="exclamation-icon" src={error_icon}></img> : ""}
                <div className={`learning-search-text ${showError ? "errorSpan" : ""}`}>{searchTextCondition}</div>
            </div>
            <button disabled={!selectedTypeValue} className="learningToolSearchButton" onClick={(e) => handleSearch(e, selectedTypeValue)}>Search</button>
        </div>
    );
}
export default LearningToolSearch;