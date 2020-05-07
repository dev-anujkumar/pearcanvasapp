/**
* Search and Filter Assessments Component of Learnoisty Assessment
*/
import React from 'react';
// import '../../../../../styles/AssessmentSlateCanvas/elm/ElmTable.css';
import '../../../../../styles/AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.css';

export const AssessmentSearchBar = (props) => {
    const [searchAssessmentTitle, setSearchAssessmentTitle] = useState(props.searchTitle);


    const handleSearch = e => {
        e.preventDefault();
            props.filterCiteTdxData(this.props.assessmentType, this.state.searchAssessment, this.state.filterUUID);  
    }

    const handleChange = (event) => {
        let value = event.target.value;
        setSearchAssessmentTitle(value)
    }
    return (
        <form>
            <React.Fragment>
                <div className="filter-block">
                    <div className="title-block">
                        <i class="fa fa-search"></i>
                        <input autoComplete="on" name="searchAssessment" value={searchAssessmentTitle} onChange={handleChange} placeholder="Search by Title" />

                    </div>
                </div>
                <div className="search-block">
                    <button className="search noSelect" onClick={handleSearch} >search</button>
                </div>
            </React.Fragment>
        </form>
    );
}
