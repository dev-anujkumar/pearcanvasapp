/**
* Search and Filter Assessments Component of Learnosity Assessment
*/
import React, { useState, useEffect } from 'react'
import '../../../../../styles/AssessmentSlateCanvas/elm/ElmTable.css';
//import '../../../../../styles/AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.css';

export const AssessmentSearchBar = (props) => {
    const [searchAssessmentTitle, setSearchAssessmentTitle] = useState('');
    // const [titleFocus, setTitleFocus] = useState(false);

    // useEffect(() => {
    //     let setFocus = props.titleFocus ? true : false;
    //     setTitleFocus(setFocus)
    // }, [props.titleFocus]);

    // const handleBlur = (event) => {
    //     let id = event.target.id;
    //     let getId = document.getElementById(id);
    //     if (getId && getId.value.length === 0) {
    //         setTitleFocus(false)
    //     }
    //     else {
    //         setTitleFocus(true)
    //     }
    // }

    // const handleFocus = (event) => {
    //     let id = event.target.id;
    //     let getId = document.getElementById(id);
    //     if (getId && getId.value.length === 0) {
    //         setTitleFocus(true)
    //     }
    // }

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
                                {/* {titleFocus && <label className="label-title">Title:</label>} */}
                                <input
                                    type="text"
                                    autoComplete="on"
                                    id="inputTitle"
                                    className="input-title1"
                                    name="searchAssessment"
                                    placeholder="Search by Title or ID"
                                    value={searchAssessmentTitle}
                                    // onBlur={handleBlur}
                                    // onFocus={handleFocus}
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
