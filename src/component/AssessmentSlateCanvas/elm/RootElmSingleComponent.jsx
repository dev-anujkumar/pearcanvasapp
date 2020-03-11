/**
* Root Component of ELM Assessment
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './../../../styles/AssessmentSlateCanvas/elm/RootElmComponent.css';
import { insertElmResourceAction, fetchAssessmentItem } from './Actions/ElmActions';
import ElmHeader from './Components/ElmHeader';
import ElmTableComponent from './Components/ElmTableComponent';
class RootElmSingleAssessment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiData: {},
            previousTableLength: 0,
            hidePopup: false,
            errFlag: null,
            errorStatus: 0,
            addFlag: false
        }
    }

    componentDidMount() {
        this.setState({
            apiData: {}
        })
        this.props.elmResource(this.props.activeAssessmentType);
    }

    /***
     * @description - This function is to navigate back to parent hierarchy
     * @param- val - number of values in table
    */
    navigateBack = (val) => {
        this.setState({
            previousTableLength: val,
        })
    }

    /*** @description - This function is to close ELM-PUF PopUp*/
    hidePufPopup = () => {
        this.setState({
            hidePopup: true,
        })
    }

    /*** @description - This function is to pass props to elm-Header component*/
    elmHeaderProps = {
        title: 'Pearson Unified Format Assessments',
        closeElmWindow: this.props.closeElmWindow
    };

    render() {
        return (
            <div className="vex-overlay elm-wrapper">
                <div className="root-container">
                    <ElmHeader elmHeaderProps={this.elmHeaderProps} />
                    {this.props.errFlag == null ?
                        <div className="elm-loader"></div> :
                        <ElmTableComponent
                            openedFrom={this.props.openedFrom}
                            activeAssessmentType={this.props.activeAssessmentType}
                            errFlag={this.props.errFlag}
                            errorStatus={this.props.errorStatus}
                            navigateBack={this.navigateBack}
                            hidePufPopup={this.hidePufPopup}
                            activeUsageType={this.props.usageTypeMetadata}
                            addPufFunction={this.props.addPufFunction}
                            fetchAssessmentItem={this.props.fetchAssessmentItem}
                            assessmentItemData={this.props.assessmentItemData}
                            {...this.props}
                        />}
                </div>
            </div>
        );
    }
}

const mapActionToProps = {
    elmResource: insertElmResourceAction,
    fetchAssessmentItem: fetchAssessmentItem
}

const mapStateToProps = (state) => {
    return {
        apiData: state.elmReducer.elmData,
        errFlag: state.elmReducer.errFlag,
        errorStatus: state.elmReducer.apiStatus,
        assessmentItemData: state.elmReducer.elmItemData,
        itemErrorFlag:state.elmReducer.itemErrorFlag,
        itemApiStatus:state.elmReducer.itemApiStatus
    }
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(RootElmSingleAssessment);