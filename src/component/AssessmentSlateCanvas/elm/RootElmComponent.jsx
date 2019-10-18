import React, { Component } from 'react';
import ElmHeader from './Components/ElmHeader';
import ElmTable from './Components/ElmTable';
import { connect } from 'react-redux';
var projectDetails = require('./../AssessmentSlateConstants').projectDetails;
import './RootElmComponent.css';
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
  componentWillMount() {
    this.setState({
      apiData:{}
    })
  }
  getOldCookie = (cname) =>{

    var name = cname + "=";

    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
  componentDidMount() {
      this.props.elmResource();
  }
  
  componentWillUnmount() {
    
  }
  getCookie = (name) => {
    let { PROJECT_URN } = projectDetails;
    let cookieArray = document.cookie.split(';')
    let matchedCookie = '';
    for(var i=0; i<cookieArray.length; i++) {
        let isExist = cookieArray[i].includes(PROJECT_URN);
        if(isExist) {
            matchedCookie = cookieArray[i];
            break;
        }
    }
    let cookieArray1 = matchedCookie.split('=')[1].split(',');
    let matchedCookie1 = '';
    for(var i=0; i<cookieArray1.length; i++) {
        let isExist = cookieArray1[i].includes(name);
        if(isExist) {
            matchedCookie1 = cookieArray1[i];
            break;
        }
    }
    return matchedCookie1.split(":'")[1] ? matchedCookie1.split(":'")[1].replace(/\'/gi, ''): '';
  }
  navigateBack = (val) => {
    this.setState({
      previousTableLength: val,
    })
  }
  hidePufPopup = () => {
    this.setState({
      hidePopup: true,
    })
  }
  elmHeaderProps = {
    title : 'Pearson Unified Format Assessments',
    closeElmWindow: this.props.closeElmWindow
  };


  elmFooterProps = {
    addPufFunction: this.props.addPufFunction,
    closeElmWindow: this.props.closeElmWindow
  };

  render() {
    return (
      <div className="vex-overlay elmWrapper">
        <div className="rootContainer">
          <ElmHeader elmHeaderProps={this.elmHeaderProps} />
          {/* <ElmBreadcrumb elmBreadcrumbProps = {this.elmBreadcrumbProps}/> */}
          {/* {this.state.previousTableLength == 0 &&<ElmProjectList {...this.props}/>} */}
          {this.props.errFlag == null ? <div className="elmLoader"></div> : <ElmTable errFlag={this.props.errFlag} errorStatus={this.props.errorStatus} apiData={this.props.apiData} {...this.props} navigateBack={this.navigateBack} hidePufPopup={this.hidePufPopup} usageTypeMetadata = {this.props.usageTypeMetadata}/>}
          {/* <ElmFooter elmFooterProps = {this.elmFooterProps}  {...this.props}/> */}
        </div>
      </div>
    );
  }
}

const mapActionToProps = {
  elmResource : elmResourceAction,
}

const mapStateToProps = (state) => {
  return {
    apiData : state.elmReducer.elmData,
    errFlag : state.elmReducer.errFlag,
    errorStatus : state.elmReducer.apiStatus
  }
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(RootElmComponent);