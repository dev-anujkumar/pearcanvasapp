/**
* Root Component of ELM Assessment
*/
import React, { Component } from 'react';
import ElmHeader from './Components/ElmHeader';
import ElmTable from './Components/ElmTable';
import { connect } from 'react-redux';
import './../../../styles/AssessmentSlateCanvas/elm/RootElmComponent.css';
import elmResourceAction from './Actions';
class RootElmComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: {},
      previousTableLength: 0,
      hidePopup: false,
      errFlag: null,
      errorStatus: 0
    }
  }

  componentDidMount() {
    this.setState({
      apiData: {}
    })
    this.props.elmResource(this.props.assessmentType);
  }

  /*** @description - This function is to navigate back to parent hierarchy
   * @param- val - number of values in table
*/
  navigateBack = (val) => {
    this.setState({
      previousTableLength: val,
    })
  }

  /*** @description - This function is to close ELM-PUF PopUp
*/
  hidePufPopup = () => {
    this.setState({
      hidePopup: true,
    })
  }

  /*** @description - This function is to pass props to elm-Header component
*/
  elmHeaderProps = {
    title: 'Pearson Unified Format Assessments',
    closeElmWindow: this.props.closeElmWindow
  };

  render() {
    return (
      <div className="vex-overlay elm-wrapper">
        <div className="root-container">
          <ElmHeader elmHeaderProps={this.elmHeaderProps} />
          {this.props.errFlag == null ? <div className="elm-loader"></div> : <ElmTable activeAssessmentType={this.props.activeAssessmentType} errFlag={this.props.errFlag} errorStatus={this.props.errorStatus} {...this.props} navigateBack={this.navigateBack} hidePufPopup={this.hidePufPopup} usageTypeMetadata={this.props.usageTypeMetadata} />}
        </div>
      </div>
    );
  }
}

const mapActionToProps = {
  elmResource: elmResourceAction,
}

const mapStateToProps = (state) => {
  return {
    apiData: state.elmReducer.elmData,
    errFlag: state.elmReducer.errFlag,
    errorStatus: state.elmReducer.apiStatus
  }
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(RootElmComponent);