/**
* Search Bar Component of Learning Tool/Learning App Assessment
*/
import React, { useState } from 'react';
import '../../../../styles/AssessmentSlateCanvas/LearningTool/LearningTool.css';
const LearningToolSearch = (props) => {

    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchTitle, setSearchTitle] = useState('');
    const { error_icon, showError, selectedTypeValue, searchTextCondition } = props;

    /*** @description - This function is to call search function for the search term 
     * @param e - event triggered
    */
    const handleSearch = e => {
        e.preventDefault();
        props.learningToolSearchAction(searchTitle,searchKeyword);//send for search
    }

    /*** @description - This function is to handle the value in searchbar input
     * @param event - event triggered
    */
    const handleKeywordChange = (event) => {
        let value = event.target.value;
        setSearchKeyword(value);
        // props.validateSearch(event, value);
    }
    /*** @description - This function is to handle the value in searchbar input
 * @param event - event triggered
*/
    const handleTitleChange = (event) => {
        let value = event.target.value;
        setSearchTitle(value);
    }
    return (
        <div className="learningToolHeaderSearchDiv">
            <div className="learningToolHeaderSearchBar">
                <input
                    className={`learningToolSearchBar ${showError ? "error" : ""}`}
                    id="learningToolSearchBar"
                    type="text"
                    name="search2"
                    value={searchKeyword}
                    onChange={handleKeywordChange}
                    placeholder="Enter Keyword to search"
                />
                <input
                    className={`learningToolSearchBar ${showError ? "error" : ""}`}
                    id="learningToolSearchBar"
                    type="text"
                    name="search2"
                    value={searchTitle}
                    onChange={handleTitleChange}
                    placeholder="Enter Keyword to search"
                />
                {showError ? <img className="exclamation-icon" src={error_icon}></img> : ""}
                <div className={`learning-search-text ${showError ? "errorSpan" : ""}`}>{searchTextCondition}</div>
            </div>
            <button disabled={!selectedTypeValue} className="learningToolSearchButton" onClick={handleSearch}>Search</button>
        </div>
    );
}
export default LearningToolSearch;