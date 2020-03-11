/**
* Error Component of ELM Assessment
*/
import React, { Component } from 'react';
import '../../../../../styles/AssessmentSlateCanvas/elm/ElmTable.css';
import { ERROR_MESSAGE_ELM_RESOURCE, ERROR_MESSAGE_ELM_ITEMS, ERROR_MESSAGE_LEARNOSITY, ERROR_MESSAGE_ELM_DEFAULT} from '../../../AssessmentSlateConstants.js'

class ElmError extends Component {

    getErrorMessage = (error) => {
        let errorMessage = "";
        if (error && error.errorStatus == 404 && (error.activeAssessmentType == PUF || error.activeAssessmentType == FULL_ASSESSMENT_PUF)) {
            errorMessage = ERROR_MESSAGE_ELM_RESOURCE
        } else if (error && error.errorStatus == 404 && (error.activeAssessmentType == LEARNOSITY || error.activeAssessmentType == LEARNOSITY_BETA)) {
            errorMessage = ERROR_MESSAGE_LEARNOSITY
        } else if (error && error.itemErrorStatus != 200) {
            errorMessage = ERROR_MESSAGE_ELM_ITEMS
        } else {
            errorMessage = ERROR_MESSAGE_ELM_DEFAULT
        }

        return errorMessage;
    }
    render() {
        return (
            <div className="main-div elm-error-div">
                <p className="elm-error-line">
                    <i>{this.getErrorMessage(this.props.elmErrorProps)}</i>
                </p>
            </div>
        );
    }
}

export default ElmError;