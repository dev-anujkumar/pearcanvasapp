/**
* Filter Component for CITE/TDX Assessment
*/
import React, { Component } from 'react';
import '../../../../../styles/AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.css';

class FilterAssessmentData extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="filter-container">
                    <div className="filter-block">
                        <div className="title-block">
                            <input placeholder="Search by title" />
                            {/* <i class="fa fa-search"></i> */}
                        </div>
                        <div className="filter-uuid">
                            <input placeholder="Filter by UUID" />
                        </div>

                    </div>
                    <div className="search-block">
                        <button className="search" >SEARCH</button>
                    </div>
                    <div className="total-count">
                        <i>Showing 1-25 of 345</i>
                    </div>
                </div>
                <hr></hr>
            </React.Fragment>
        );
    }
}

export default FilterAssessmentData;