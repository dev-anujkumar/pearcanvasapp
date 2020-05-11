/**
* Search and Filter Assessments Component of Learnosity Assessment
*/
import React, { useState } from 'react'
import '../../../../../styles/AssessmentSlateCanvas/elm/ElmTable.css';
//import '../../../../../styles/AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.css';

export const AssessmentSearchBar = (props) => {
    const [searchAssessmentTitle, setSearchAssessmentTitle] = useState('');


    const handleSearch = e => {
        e.preventDefault();
        props.filterAssessmentData(props.assessmentType, searchAssessmentTitle)
    }

    const handleChange = (event) => {
        let value = event.target.value;
        setSearchAssessmentTitle(value)        
    }
    return (
        <div className='learnosity'>
        <div className='filter-container'>
            <form>
                <>
                    <div className="filter-block">
                        <div className="title-block">
                            <label className="labelTitle" data-domain="Title:">
                                <i class="fa fa-search"></i>
                                <input className="input-title1" type="text" autoComplete="on" name="searchAssessment" placeholder="Search by Title" value={searchAssessmentTitle} onChange={handleChange} />
                            </label>
                        </div>
                    </div>
                    <div className="search-block">
                        <button className="search noSelect" onClick={handleSearch} >search</button>
                    </div>
                </>
            </form>
        </div>
        </div>
    );
}
