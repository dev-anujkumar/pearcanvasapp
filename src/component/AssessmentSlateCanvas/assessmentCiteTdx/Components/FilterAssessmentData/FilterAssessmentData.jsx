/**
* Filter Component for CITE/TDX Assessment
*/
import React, { Component } from 'react';
import '../../../../../styles/AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.css';
import { elmNavigateBack } from './../../../../../images/ElementButtons/ElementButtons.jsx';
import {filterCiteTdxData, getCiteTdxData} from './../../Actions/CiteTdxActions.js'
import { connect } from 'react-redux';

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
        if(this.state.filterUUID !== undefined && this.state.filterUUID != ''){
            this.props.filterCiteTdxData(this.props.assessmentType, this.state.searchAssessment, this.state.filterUUID);
        } else {
            this.props.getCiteTdxData(this.props.assessmentType, this.state.searchAssessment, this.state.filterUUID);
        }
    }

    handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]:value});
        console.log("searchName", this.state.searchAssessment)
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
                                <div className="filter-uuid" >
                                    <input name="filterUUID" value={this.state.filterUUID} onChange={this.handleChange} placeholder="Filter by UUID" />
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

const mapActionToProps = {
    filterCiteTdxData: filterCiteTdxData,
    getCiteTdxData: getCiteTdxData
}

export default connect (null, mapActionToProps)(FilterAssessmentData);