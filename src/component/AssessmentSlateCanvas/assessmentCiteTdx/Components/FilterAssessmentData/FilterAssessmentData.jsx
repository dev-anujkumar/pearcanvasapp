/**
* Filter Component for CITE/TDX Assessment
*/
import React, { Component } from 'react';
import '../../../../../styles/AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.css';
import { elmNavigateBack } from './../../../../../images/ElementButtons/ElementButtons.jsx';
import { filterCiteTdxData, getCiteTdxData, setCurrentCiteTdx, setCurrentInnerCiteTdx } from './../../Actions/CiteTdxActions.js'
import { connect } from 'react-redux';

class FilterAssessmentData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchAssessment: props.searchTitle,
            filterUUID: props.filterUUID,
            assessTitleFocus: props.searchTitle ? true : '',
            assessUUIDFocus:props.filterUUID ? true : ''
        }

    }

    handleSearch = e => {
        e.preventDefault();
        this.props.setCurrentCiteTdx({});
        this.props.setCurrentInnerCiteTdx({});
        this.props.AssessmentSearchTitle(this.state.searchAssessment, this.state.filterUUID);
        this.props.resetPage(true, true);
        if (this.state.filterUUID !== undefined && this.state.filterUUID != '') {
            this.props.filterCiteTdxData(this.props.assessmentType, this.state.searchAssessment, this.state.filterUUID);
        } else {
            this.props.getCiteTdxData(this.props.assessmentType, this.state.searchAssessment, this.state.filterUUID);
        }
    }

    handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        let id = event.target.id;
        this.setState({ [name]: value });
    }
    handleBlur = (event) =>{
        let id= event.target.id
        let getId = document.getElementById(id);
        if (getId.value.length === 0) {
            this.setState({
                [id]: false
            });
        }
        else {
            this.setState({
                [id]: true
            });
        }
    }
    handleFocus = (event) =>{
        let id= event.target.id
        let getId = document.getElementById(id);
        if (getId.value.length === 0) {
        this.setState({ 
        [id]:true
        });
    }
    }

    render() {
        console.log("laaa");
        return (
            <React.Fragment>
                <div className={`filter-container ${this.props.openedFrom === "singleSlateAssessmentInner" ? 'inner-assessment':''}`}>
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
                                    <div className="title-block" >
                                        <i class="fa fa-search"></i>
                                        {this.state.assessTitleFocus &&
                                        <label>Title:</label>}
                                        <input type="text"  id="assessTitleFocus" autoComplete="on" name="searchAssessment" value={this.state.searchAssessment } onChange={this.handleChange} placeholder="Search by Title" onBlur={this.handleBlur} onFocus={this.handleFocus}/>
                                        </div>
                                    <div className="filter-uuid">
                                       {this.state.assessUUIDFocus && <label>UUID:</label>}
                                        <input type="text"  id="assessUUIDFocus" name="filterUUID" value={this.state.filterUUID} onChange={this.handleChange} placeholder="Filter by UUID"  onBlur={this.handleBlur} onFocus={this.handleFocus}/>
                                    </div>

                                </div>
                                <div className="search-block">
                                    <button className="search noSelect" onClick={this.handleSearch} >search</button>
                                </div>


                            </React.Fragment>
                        }
                    </form>
                </div>
                {!this.props.setCurrentAssessment &&
                <div className="total-count">
                    Showing PageNo. {this.props.currentPageNo}
                </div>
                 }
                <hr></hr>
            </React.Fragment>
        );
    }
}

const mapActionToProps = {
    filterCiteTdxData: filterCiteTdxData,
    getCiteTdxData: getCiteTdxData,
    setCurrentCiteTdx: setCurrentCiteTdx,
    setCurrentInnerCiteTdx: setCurrentInnerCiteTdx
}

export default connect(null, mapActionToProps)(FilterAssessmentData);