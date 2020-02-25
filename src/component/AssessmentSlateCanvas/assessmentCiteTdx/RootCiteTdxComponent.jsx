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
    }
  }
  componentDidMount() {
    this.props.getCiteTdxData(this.props.assessmentType);
  }
  componentDidUpdate() {
    return true;
  }
/** @description - this method used to search assessment data */

  searchAssessment = () => {

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
            <FilterAssessmentData assessmentType={this.props.assessmentType} />
            <CiteTdxTable assessmentType={this.props.assessmentType} searchAssessment={this.searchAssessment} />
          <CiteTdxFooter closeWindowAssessment={this.headerProps.closeWindowAssessment} addCiteTdxFunction={this.props.addCiteTdxFunction} usageTypeMetadata={this.props.usageTypeMetadata} openedFrom = {this.props.openedFrom}/>
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

