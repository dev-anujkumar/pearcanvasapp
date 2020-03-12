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
                    {this.props.elmReducer.errFlag == null ?
                        <div className="elm-loader"></div> :
                        <ElmTableComponent
                            navigateBack={this.navigateBack}
                            hidePufPopup={this.hidePufPopup}
                            elmReducer={this.props.elmReducer}
                            closeElmWindow={this.props.closeElmWindow}
                            addPufFunction={this.props.addPufFunction}
                            activeUsageType={this.props.activeUsageType}
                            fetchAssessmentItem={this.props.fetchAssessmentItem}
                            activeAssessmentType={this.props.activeAssessmentType}  
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
        elmReducer: state.elmReducer,
        openedFrom: state.appStore.openedFrom
    }
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(RootElmSingleAssessment);