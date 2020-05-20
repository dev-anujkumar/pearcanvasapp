/**
* Search and Filter Assessments Component of Learnosity Assessment
*/
import React, { useState, useEffect } from 'react'
import '../../../../../styles/AssessmentSlateCanvas/elm/ElmTable.css';

export const AssessmentSearchBar = (props) => {
    const [searchAssessmentTitle, setSearchAssessmentTitle] = useState(props.searchTerm?props.searchTerm:'');

    const handleSearch = e => {
        e.preventDefault();
        props.filterAssessmentData(props.assessmentType, searchAssessmentTitle)
    }

    const handleChange = (event) => {
        let value = event.target.value;
        setSearchAssessmentTitle(value)
    }

    return (
        <div className='learnosity-search-block'>
            <h4 className='search-heading'>Item Bank Search</h4>
            <div className='filter-container'>
                <form>
                    <>
                        <div className="filter-block">
                            <div className="title-block">                                
                                <i class="fa fa-search"></i>
                                <input
                                    type="text"
                                    autoComplete="on"
                                    id="inputTitle"
                                    className="input-title1"
                                    name="searchAssessment"
                                    placeholder="Search by Title or ID"
                                    value={searchAssessmentTitle}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="search-block">
                            <button className="search noSelect" onClick={handleSearch} >Search</button>
                        </div>
                    </>
                </form>
            </div>
            <div>
            </div>
        </div>
    );
}
