import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '../ElmButton';
import styles from './ElmFooterStyle';

class ElmFooter extends Component {
    insertButtonProps = {
        buttonText:'ADD',
        marginLeft: '20px',
        handlerFunction : function () {
            insertElmResourceAction()
        }
    }

    cancelButtonProps = {
        buttonText: 'CANCEL',
    }

    insertElmResourceAction(selectedAssessment){
            let dataToSend = {};
            dataToSend["id"] = "";
            dataToSend["type"] = "element-assessment";
            dataToSend["schema"] = "http://schemas.pearson.com/wip-authoring/element/1";
            dataToSend["elementdata"] = {};
            dataToSend["elementdata"]["schema"] = "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment";
            dataToSend["elementdata"]["assessmentid"] = selectedAssessment.versionUrn;
            dataToSend["elementdata"]["assessmentformat"] = "puf";
            dataToSend["elementdata"]["usagetype"] = selectedAssessment.usagetype;
            dataToSend["contentUrn"] = selectedAssessment.contentUrn;
            dataToSend["versionUrn"] = selectedAssessment.versionUrn;
            that.props.elementData({
                variables: { id: trackingId, elementdata: JSON.stringify(dataToSend2), projectUrn: projectDetails.PROJECT_URN },
            });
    }

    insertElmResource = () => {
        this.insertElmResource();
    }

    render() {
        const insertButtonProps = {
            buttonText: 'ADD',
            marginLeft: '20px',
            handlerFunction: this.props.elmFooterProps.addPufFunction
        }

        const cancelButtonProps = {
            buttonText: 'CANCEL',
            handlerFunction: this.props.elmFooterProps.closeElmWindow
        }
        return (
            <div style= {styles.footerContainer}>
                <div>
                    <Button buttonProps = {this.cancelButtonProps} />
                    <Button buttonProps = {this.insertButtonProps} />
                </div>
            </div>
        );
    }
}

/**
 *  @discription - get state variable as props in this component
 */
const mapStateToProps = (state) => {
    return state.elmReducer
}

/** 
 * @discription - dispatch actions as props from this component
 */
// const mapActionToProps = {
//     insertElmResource: insertElmResourceAction
// }

/**
 * @discription - connect this component with redux
 */
export default connect(
    mapStateToProps
    //mapActionToProps
)(ElmFooter)