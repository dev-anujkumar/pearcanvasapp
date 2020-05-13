/**
* Search and Filter Assessments Component of Learnosity Assessment
*/
import React, { useState, useEffect } from 'react'
import '../../../../../styles/AssessmentSlateCanvas/elm/ElmTable.css';
//import '../../../../../styles/AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.css';

export const AssessmentSearchBar = (props) => {
    const [searchAssessmentTitle, setSearchAssessmentTitle] = useState('');
    const [titleFocus, setTitleFocus] = useState(false);

    useEffect(() => {
        let setFocus = props.titleFocus ? true : false;
        setTitleFocus(setFocus)
    }, [props.titleFocus]);

    const handleBlur = (event) => {
        let id = event.target.id;
        let getId = document.getElementById(id);
        if (getId && getId.value.length === 0) {
            setTitleFocus(false)
        }
        else {
            setTitleFocus(true)
        }
    }

    const handleFocus = (event) => {
        let id = event.target.id;
        let getId = document.getElementById(id);
        if (getId && getId.value.length === 0) {
            setTitleFocus(true)
        }
    }

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
            <div className='filter-container'>
                <form>
                    <>
                        <div className="filter-block">
                            <div className="title-block">
                                {titleFocus && <label className="label-title">Title:</label>}
                                <i class="fa fa-search"></i>
                                <input
                                    type="text"
                                    // autoComplete="on"
                                    id="inputTitle"
                                    className="input-title1"
                                    name="searchAssessment"
                                    placeholder="Search by Title"
                                    value={searchAssessmentTitle}
                                    onBlur={handleBlur}
                                    onFocus={handleFocus}
                                    onChange={handleChange}
                                />
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
