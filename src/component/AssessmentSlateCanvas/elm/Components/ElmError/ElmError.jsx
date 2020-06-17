/**
* Error Component of ELM Assessment
*/
import React from 'react';
import '../../../../../styles/AssessmentSlateCanvas/elm/ElmTable.css';
import { ERROR_MESSAGE_ELM_RESOURCE, ERROR_MESSAGE_ELM_ITEMS, ERROR_MESSAGE_LEARNOSITY, ERROR_MESSAGE_ELM_DEFAULT, PUF, LEARNOSITY_BETA } from '../../../AssessmentSlateConstants.js'

const ElmError = (props) => {

    const getErrorMessage = () => {
        let errorMessage = '';
        if (props && (props.activeAssessmentType == PUF) && props.errFlag) {
            errorMessage = ERROR_MESSAGE_ELM_RESOURCE
        } else if (props && (props.activeAssessmentType == LEARNOSITY_BETA) && (props.errFlag || (props.filterResults == 'No Results'))) {
            errorMessage = ERROR_MESSAGE_LEARNOSITY
        } else if (props && (props.itemApiStatus != "200")) {
            errorMessage = ERROR_MESSAGE_ELM_ITEMS
        } else {
            errorMessage = ERROR_MESSAGE_ELM_DEFAULT
        }

        return errorMessage;
    }

    return (
        <div className="main-div elm-error-div">
            <p className="elm-error-line">
                {props.errorStatus && <i>{getErrorMessage()}</i>}
            </p>
        </div>
    );

}

export default ElmError;