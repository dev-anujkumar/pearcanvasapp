/**
* Error Component of ELM Assessment
*/
import React from 'react';
import '../../../../../styles/AssessmentSlateCanvas/elm/ElmTable.css';
import { ERROR_MESSAGE_ELM_RESOURCE, ERROR_MESSAGE_ELM_ITEMS, ERROR_MESSAGE_LEARNOSITY, ERROR_MESSAGE_ELM_DEFAULT, PUF, LEARNOSITY, ERROR_MESSAGE_ELM_INTERACTIVES, ELM_INT } from '../../../AssessmentSlateConstants.js'

const ElmError = (props) => {

    const getErrorMessage = () => {
        let errorMessage = '';
        let classSetFooter = "";
        if (props && (props.activeAssessmentType == ELM_INT) && props.errFlag) {
            errorMessage = ERROR_MESSAGE_ELM_INTERACTIVES;
            classSetFooter = "no-mmi-elm-data-error-div";
        } else if (props && (props.activeAssessmentType == PUF) && props.errFlag) {
            errorMessage = ERROR_MESSAGE_ELM_RESOURCE;
            classSetFooter = "no-elm-data-error-div";
        } else if (props && (props.activeAssessmentType == LEARNOSITY) && (props.errFlag || (props.filterResults == 'No Results'))) {
            errorMessage = ERROR_MESSAGE_LEARNOSITY
        } else if (props && (props.itemApiStatus != "200")) {
            errorMessage = ERROR_MESSAGE_ELM_ITEMS
        } else {
            errorMessage = ERROR_MESSAGE_ELM_DEFAULT
        }

        return { errorMessage, classSetFooter };
    }

    return (
        <div className={`main-div elm-error-div ${getErrorMessage()?.classSetFooter}`}>
            <p className="elm-error-line">
                {props.errorStatus && <i>{getErrorMessage()?.errorMessage}</i>}
            </p>
        </div>
    );

}

export default ElmError;