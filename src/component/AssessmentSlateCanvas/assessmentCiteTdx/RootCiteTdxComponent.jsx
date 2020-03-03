/**
* Root Component of CITE/TDX Assessment
*/
import React, { Component } from 'react';
import CiteTdxHeader from './Components/CiteTdxHeader/CiteTdxHeader.jsx';
import FilterAssessmentData from './Components/FilterAssessmentData/FilterAssessmentData.jsx';
import CiteTdxFooter from './Components/CiteTdxFooter/CiteTdxFooter.jsx';
import CiteTdxTable from './Components/CiteTdxTable/CiteTdxTable.jsx';
import CiteComponentError from './Components/CiteError/CiteComponentError.jsx';
import { getCiteTdxData } from './Actions/CiteTdxActions.js';
import './../../../styles/AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.css';
import { connect } from 'react-redux';
class RootCiteTdxComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTitle : '',
      filterUUID : '',
      isReset: false,
      currentPageNo: props.parentPageNo
    }
  }
  componentDidMount() {
    const {currentPageNo} =this.state;
    this.props.getCiteTdxData(this.props.assessmentType, null, null, currentPageNo);
  }
  componentDidUpdate() {
    return true;
  }
/** @description - this method used to search assessment data */

  AssessmentSearchTitle = (searchTitle, filterUUID) => {
    this.setState({searchTitle, filterUUID});
  }

  resetPage = (isReset) => {
    this.setState({isReset})
  }

  getCurrentPageNo = (currentPageNo) => {
    this.setState({currentPageNo})
  }

  /*** @description - This function is to pass props to Cite/Tdx Header component
*/
  headerProps = {
    title: 'Pearson Assessments',
    closeWindowAssessment: this.props.closeWindowAssessment
  };

  render() {
    return (
      <div className="vex-overlay cite-wrapper">
        <div className="root-container">
          <CiteComponentError>
            <CiteTdxHeader headerProps={this.headerProps} />
            <FilterAssessmentData assessmentType={this.props.assessmentType} AssessmentSearchTitle={this.AssessmentSearchTitle} resetPage={this.resetPage} currentPageNo={this.state.currentPageNo} />
            <CiteTdxTable assessmentType={this.props.assessmentType} searchAssessment={this.searchAssessment}/>
            <CiteTdxFooter closeWindowAssessment={this.headerProps.closeWindowAssessment} addCiteTdxFunction={this.props.addCiteTdxFunction} usageTypeMetadata={this.props.usageTypeMetadata} searchTitle={this.state.searchTitle} filterUUID={this.state.filterUUID} assessmentType={this.props.assessmentType} isReset={this.state.isReset} resetPage={this.resetPage} getCurrentPageNo={this.getCurrentPageNo} openedFrom = {this.props.openedFrom} currentPageNo={this.state.currentPageNo} />
          </CiteComponentError>
        </div>
      </div>
    );
  }
}
const mapActionToProps = {
  getCiteTdxData: getCiteTdxData,
}


export default connect(
  null,
  mapActionToProps
)(RootCiteTdxComponent);

