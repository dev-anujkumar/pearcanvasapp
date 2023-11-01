/**
* Root Component of CITE/TDX Assessment
*/
import React, { Component } from 'react';
import CiteTdxHeader from './Components/CiteTdxHeader/CiteTdxHeader.jsx';
import FilterAssessmentData from './Components/FilterAssessmentData/FilterAssessmentData.jsx';
import CiteTdxFooter from './Components/CiteTdxFooter/CiteTdxFooter.jsx';
import CiteTdxTable from './Components/CiteTdxTable/CiteTdxTable.jsx';
import CiteComponentError from './Components/CiteError/CiteComponentError.jsx';
import { getCiteTdxData, setCurrentCiteTdx, setCurrentInnerCiteTdx, filterCiteTdxData, setAssessmentFilterParams } from './Actions/CiteTdxActions.js';
import './../../../styles/AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.css';
import { connect } from 'react-redux';
class RootCiteTdxComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageNo: props.parentPageNo
    }
  }
  componentDidMount() {
    const { currentPageNo } = this.state;
    const { searchTitle, filterUUID, citeTdxReducer } = this.props;
    let titleToSearch = "",
      uuidToSearch = "";
    if (this.props.citeTdxReducer && this.props.openedFrom == 'slateAssessment') {
      const { searchTitleVal, searchUuidVal } = citeTdxReducer;
      titleToSearch = searchTitle ? searchTitle : searchTitleVal;
      uuidToSearch = filterUUID ? filterUUID : searchUuidVal;
    } else {
      titleToSearch = searchTitle;
      uuidToSearch = filterUUID;
    }
    if ((titleToSearch != '' || uuidToSearch != '')) {
      if (this.props.openedFrom !== 'slateAssessment') {
        this.props.setCurrentCiteTdx({});
        this.props.setCurrentInnerCiteTdx({});
      }

      if ((uuidToSearch !== undefined && uuidToSearch != '')) {
        this.props.filterCiteTdxData(this.props.assessmentType, titleToSearch, uuidToSearch);
      } else if ((titleToSearch !== undefined && titleToSearch !== '')) {
        this.props.getCiteTdxData(this.props.assessmentType, titleToSearch, uuidToSearch, currentPageNo);
      } else {
        this.props.getCiteTdxData(this.props.assessmentType, null, null, currentPageNo);
      }
    }
    else {
      this.props.getCiteTdxData(this.props.assessmentType, null, null, currentPageNo);
    }

  }
  componentDidUpdate() {
    return true;
  }

  componentWillUnmount() {
    if (this.props.openedFrom != 'slateAssessment') {
      this.props.setAssessmentFilterParams("", "");
    }
  }
  getCurrentPageNo = (currentPageNo) => {
    this.setState({currentPageNo})
  }

  /*** @description - This function is to pass props to Cite/Tdx Header component
*/
  headerProps = {
    title: 'Pearson Assessments',
    closeWindowAssessment: this.props.closeWindowAssessment,
    openedFrom: this.props.openedFrom,
    assessmentType: this.props.assessmentType,
    assessmentSlateObj: this.props.assessmentSlateObj,
    setCiteTdxFilterData:this.props.setCiteTdxFilterData
  };

  render() {
    const { searchTitle, filterUUID, citeTdxReducer: { searchTitleVal, searchUuidVal },assessmentSlateObj } = this.props;
    const titleToSearch = searchTitle ? searchTitle : searchTitleVal
    const uuidToSearch = filterUUID ? filterUUID : searchUuidVal;
    return (
      <div className="vex-overlay cite-wrapper">
        <div className={`root-container ${this.props.isBannerVisible ? 'learningToolContainer-Banner' : ''}`}>
          <CiteComponentError>
            <CiteTdxHeader headerProps={this.headerProps} resetPage={this.props.resetPage} />
            <FilterAssessmentData assessmentType={this.props.assessmentType} AssessmentSearchTitle={this.props.AssessmentSearchTitle}
             resetPage={this.props.resetPage} currentPageNo={this.state.currentPageNo}  searchTitle={titleToSearch} filterUUID={uuidToSearch} openedFrom = {this.props.openedFrom}/>
            <CiteTdxTable assessmentType={this.props.assessmentType} searchAssessment={this.searchAssessment} currentPageNo={this.state.currentPageNo}
             searchTitle={searchTitleVal} filterUUID={this.props.filterUUID} searchUuidVal={searchUuidVal}/>
            <CiteTdxFooter closeWindowAssessment={this.headerProps.closeWindowAssessment} addCiteTdxFunction={this.props.addCiteTdxFunction}
             usageTypeMetadata={this.props.usageTypeMetadata} searchTitle={searchTitleVal} filterUUID={filterUUID} searchUuidVal={searchUuidVal}
            assessmentType={this.props.assessmentType} isReset={this.props.isReset} resetPage={this.props.resetPage} getCurrentPageNo={this.getCurrentPageNo}
            openedFrom = {this.props.openedFrom} currentPageNo={this.state.currentPageNo} setCiteTdxFilterData={this.props.setCiteTdxFilterData}
             assessmentSlateObj={assessmentSlateObj}/>
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
  setCurrentInnerCiteTdx: setCurrentInnerCiteTdx,
  setAssessmentFilterParams:setAssessmentFilterParams
}

const mapStateToProps = state => {
  return {
    citeTdxReducer: state.citeTdxReducer,
    isBannerVisible: state.projectInfo.isBannerVisible
  };
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(RootCiteTdxComponent);

