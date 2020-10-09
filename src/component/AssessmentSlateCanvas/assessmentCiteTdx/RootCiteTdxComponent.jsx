/**
* Root Component of CITE/TDX Assessment
*/
import React, { Component } from 'react';
import CiteTdxHeader from './Components/CiteTdxHeader/CiteTdxHeader.jsx';
import FilterAssessmentData from './Components/FilterAssessmentData/FilterAssessmentData.jsx';
import CiteTdxFooter from './Components/CiteTdxFooter/CiteTdxFooter.jsx';
import CiteTdxTable from './Components/CiteTdxTable/CiteTdxTable.jsx';
import CiteComponentError from './Components/CiteError/CiteComponentError.jsx';
import { getCiteTdxData, setCurrentCiteTdx, setCurrentInnerCiteTdx, filterCiteTdxData } from './Actions/CiteTdxActions.js';
import './../../../styles/AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.css';
import { connect } from 'react-redux';
class RootCiteTdxComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // searchTitle : '',
      // filterUUID : '',
      // isReset: false,
      currentPageNo: props.parentPageNo
    }
  }
  componentDidMount() {
    const {currentPageNo} =this.state;
    const {searchTitle, filterUUID} = this.props;
    if (searchTitle != '' || filterUUID != '') {
      this.props.setCurrentCiteTdx({});
      this.props.setCurrentInnerCiteTdx({});
      if (filterUUID !== undefined && filterUUID != '') {
        this.props.filterCiteTdxData(this.props.assessmentType, searchTitle, filterUUID);
      } else if (searchTitle !== undefined && searchTitle !== '') {
        this.props.getCiteTdxData(this.props.assessmentType, searchTitle, filterUUID, currentPageNo);
      }
    }
    else {
      this.props.getCiteTdxData(this.props.assessmentType, null, null, currentPageNo);
    }

  }
  componentDidUpdate() {
    return true;
  }
/** @description - this method used to search assessment data */

  // AssessmentSearchTitle = (searchTitle, filterUUID) => {
  //   this.setState({searchTitle, filterUUID});
  // }

  // resetPage = (isReset) => {
  //   this.setState({isReset})
  //   if(isReset){
  //     this.setState({currentPageNo: 1})
  //   }
  // }

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
            <CiteTdxHeader headerProps={this.headerProps} resetPage={this.props.resetPage} />
            <FilterAssessmentData assessmentType={this.props.assessmentType} AssessmentSearchTitle={this.props.AssessmentSearchTitle} resetPage={this.props.resetPage} currentPageNo={this.state.currentPageNo}  searchTitle={this.props.searchTitle} filterUUID={this.props.filterUUID} />
            <CiteTdxTable assessmentType={this.props.assessmentType} searchAssessment={this.searchAssessment} currentPageNo={this.state.currentPageNo} searchTitle={this.props.searchTitle} filterUUID={this.props.filterUUID}/>
            <CiteTdxFooter closeWindowAssessment={this.headerProps.closeWindowAssessment} addCiteTdxFunction={this.props.addCiteTdxFunction} usageTypeMetadata={this.props.usageTypeMetadata} searchTitle={this.props.searchTitle} filterUUID={this.state.filterUUID} assessmentType={this.props.assessmentType} isReset={this.props.isReset} resetPage={this.props.resetPage} getCurrentPageNo={this.getCurrentPageNo} openedFrom = {this.props.openedFrom} currentPageNo={this.state.currentPageNo} />
          </CiteComponentError>
        </div>
      </div>
    );
  }
}
const mapActionToProps = {
  getCiteTdxData: getCiteTdxData,
  filterCiteTdxData: filterCiteTdxData,
  setCurrentCiteTdx: setCurrentCiteTdx,
  setCurrentInnerCiteTdx: setCurrentInnerCiteTdx
}


export default connect(
  null,
  mapActionToProps
)(RootCiteTdxComponent);

