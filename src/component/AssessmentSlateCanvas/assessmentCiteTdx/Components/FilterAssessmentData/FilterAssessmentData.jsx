/**
* Filter Component for CITE/TDX Assessment
*/
import React, { Component } from 'react';
import '../../../../../styles/AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.css';
import { elmNavigateBack } from './../../../../../images/ElementButtons/ElementButtons.jsx';
import { filterCiteTdxData, getCiteTdxData, setCurrentCiteTdx, setCurrentInnerCiteTdx, specialCharacterDecode, setAssessmentFilterParams } from './../../Actions/CiteTdxActions.js'
import { connect } from 'react-redux';

class FilterAssessmentData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchAssessment: props.searchTitle,
            filterUUID: props.filterUUID,
            assessTitleFocus: props.searchTitle ? true : false,
            assessUUIDFocus:props.filterUUID ? true : false
        }
    }
    /**
     *
     *@discription - This function is called when we click on search button
    */
    handleSearch = e => {
        e.preventDefault();
        this.props.setCurrentCiteTdx({});
        this.props.setCurrentInnerCiteTdx({});
        if (this.props.openedFrom == 'slateAssessment') {
            this.props.setAssessmentFilterParams(this.state.searchAssessment, this.state.filterUUID);
        }
        this.props.resetPage(true, true);
        if (this.state.filterUUID !== undefined && this.state.filterUUID != '') {
            this.props.filterCiteTdxData(this.props.assessmentType, this.state.searchAssessment, this.state.filterUUID);
        } else {
            this.props.getCiteTdxData(this.props.assessmentType, this.state.searchAssessment, this.state.filterUUID);
        }
    }
    /**
     *
     *@discription - This function is called when we change or type in input field of title/UUID
    */
    handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value });
    }
    /**
     *
     *@discription - This function is called on onblur to show label field
    */
    handleBlur = (event) => {
        let id = event.target.id;
        let getId = document.getElementById(id);
        if (getId && getId.value.length === 0) {
            this.setState({ [id]: false });
        }
        else {
            this.setState({ [id]: true });
        }
    }
    /**
     *
     *@discription - This function is called on onfoocus to show label field
    */
    handleFocus = (event) => {
        let id = event.target.id;
        let getId = document.getElementById(id);
        if (getId && getId.value.length === 0) {
            this.setState({ [id]: true });
        }
    }

    render() {
        const { isLoading } = this.props
        return (
            <React.Fragment>
                <div className={`filter-container ${this.props.openedFrom === "singleSlateAssessmentInner" ? 'inner-assessment':''}`}>
                    <form>
                        {this.props.setCurrentAssessment && this.props.setCurrentAssessment.title && this.props.setCurrentAssessment.id && this.props.openedFrom === "singleSlateAssessmentInner" &&
                            <div className="assessemnt-title-container">
                                <div className="elm-navigate-back-icon" onClick={this.props.assessmentNavigateBack} >{elmNavigateBack}</div>
                                <div className="assessment-title">{specialCharacterDecode(this.props.setCurrentAssessment.title)}</div>
                            </div>
                        }
                        {!this.props.setCurrentAssessment &&
                            <React.Fragment>
                            <div className="filter-block">
                                <div className="title-block" >
                                    <i class="fa fa-search"></i>
                                    <div className="flex-container">
                                        <div className="input-Container">
                                            {this.state.assessTitleFocus && <label>Title:</label>}
                                            <input type="text" id="assessTitleFocus" autoComplete="on" name="searchAssessment" value={this.state.searchAssessment} onChange={this.handleChange} placeholder="Search by Title" onBlur={this.handleBlur} onFocus={this.handleFocus} />
                                        </div>
                                    </div>

                                </div>
                                <div className="filter-uuid">
                                    <div className="input-Container">
                                        {this.state.assessUUIDFocus && <label>UUID:</label>}
                                        <input type="text" id="assessUUIDFocus" name="filterUUID" value={this.state.filterUUID} onChange={this.handleChange} placeholder="Filter by UUID" onBlur={this.handleBlur} onFocus={this.handleFocus} />
                                    </div>
                                </div>
                            </div>
                            <div className="search-block">
                                <button className={`search noSelect ${isLoading ? "disable-button" : ""}`} onClick={this.handleSearch} >search</button>
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
    setCurrentInnerCiteTdx: setCurrentInnerCiteTdx,
    setAssessmentFilterParams:setAssessmentFilterParams
}
const mapStateToProps = state => {
    return {
        isLoading: state.citeTdxReducer.isLoading
    };
  };
export default connect(mapStateToProps, mapActionToProps)(FilterAssessmentData);