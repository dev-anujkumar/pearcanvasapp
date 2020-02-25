/**
* Filter Component for CITE/TDX Assessment
*/
import React, { Component } from 'react';
import '../../../../../styles/AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.css';
import { elmNavigateBack } from './../../../../../images/ElementButtons/ElementButtons.jsx';

class FilterAssessmentData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchAssessment: '',
            filterUUID: ''
        }

    }

    handleSearch = e => {
        e.preventDefault();
        console.log("e Data >>>", e)
        this.props.searchAssessment(e.target);
    }

    handleChange = (event) => {
        this.setState({ [event.taget.name]: event.target.value })
    }

    render() {
        return (
            <React.Fragment>
                <div className="filter-container">
                    <form>
                        {this.props.setCurrentAssessment && this.props.setCurrentAssessment.title && this.props.setCurrentAssessment.id && this.props.openedFrom === "singleSlateAssessmentInner" &&
                            <div className="assessemnt-title-container">
                                <div className="elm-navigate-back-icon" onClick={this.props.assessmentNavigateBack} >{elmNavigateBack}</div>
                                <div className="assessment-title">{this.props.setCurrentAssessment.title}</div>
                            </div>
                        }
                        {!this.props.setCurrentAssessment &&
                            <React.Fragment>
                                <div className="filter-block">
                                    <div className="title-block">
                                        <input name="searchAssessment" value={this.state.searchAssessment} onChange={this.handleChange} placeholder="Search by title" />
                                        {/* <i class="fa fa-search"></i> */}
                                    </div>
                                    <div className="filter-uuid" value={this.state.filterUUID}>
                                        <input name="filterUUID" placeholder="Filter by UUID" />
                                    </div>

                                </div>
                                <div className="search-block">
                                    <button className="search" onClick={this.handleSearch} >SEARCH</button>
                                </div>
                            </React.Fragment>
                        }
                        <div className="total-count">
                            <i>Showing 1-25 of 345</i>
                        </div>
                    </form>
                </div>
                <hr></hr>
            </React.Fragment>
        );
    }
}

export default FilterAssessmentData;