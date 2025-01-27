/**
* Root Component of CITE/TDX  single Assessment
*/
import React, { Component } from 'react';
import CiteTdxHeader from '../assessmentCiteTdx/Components/CiteTdxHeader/CiteTdxHeader.jsx';
import CiteTdxFooter from '../assessmentCiteTdx/Components/CiteTdxFooter/CiteTdxFooter.jsx';
import { getSingleAssessmentData } from '../assessmentCiteTdx/Actions/CiteTdxActions.js';
import './../../../styles/AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.css';
import { connect } from 'react-redux';
import FilterAssessmentData from '../assessmentCiteTdx/Components/FilterAssessmentData/FilterAssessmentData.jsx';
import CiteTdxSingleAssessmentTable from '../singleAssessmentCiteTdx/CiteTdxSingleAssessmentTable.jsx'
class RootSingleAssessmentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
    if(this.props.currentAssessmentSelected){
      this.props.getSingleAssessmentData(this.props.currentAssessmentSelected.versionUrn);
    }
  }
  componentDidUpdate() {
    return true;
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
        <div className={`root-container ${this.props.isBannerVisible ? 'cite-wrapper-banner' : ''}`}>
            <CiteTdxHeader headerProps={this.headerProps} resetPage={this.props.resetPage}/>
              <FilterAssessmentData  openedFrom = {this.props.openedFrom} setCurrentAssessment={this.props.setCurrentAssessment}
               assessmentNavigateBack={this.props.assessmentNavigateBack}/>
              <CiteTdxSingleAssessmentTable assessmentType={this.props.assessmentType} openedFrom = {this.props.openedFrom}/>
              <CiteTdxFooter openedFrom = {this.props.openedFrom} closeWindowAssessment={this.headerProps.closeWindowAssessment}
              addCiteTdxFunction={this.props.addCiteTdxFunction} usageTypeMetadata={this.props.usageTypeMetadata}
              setCurrentAssessment={this.props.setCurrentAssessment} resetPage={this.props.resetPage} isInnerComponent={true}/>
        </div>
      </div>
    );
  }
}
const mapActionToProps = {
    getSingleAssessmentData: getSingleAssessmentData,
}
const mapStateToProps = (state) => {
  return {
    currentAssessmentSelected: state.citeTdxReducer.currentAssessmentSelected,
    isBannerVisible: state.projectInfo.isBannerVisible
  }
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(RootSingleAssessmentComponent);

