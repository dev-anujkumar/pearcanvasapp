/**
* Error Component of ELM Assessment
*/
import React from 'react';
import '../../../../../styles/AssessmentSlateCanvas/elm/ElmTable.css';
import { ERROR_MESSAGE_ELM_RESOURCE, ERROR_MESSAGE_ELM_ITEMS, ERROR_MESSAGE_LEARNOSITY, ERROR_MESSAGE_ELM_DEFAULT, PUF, FULL_ASSESSMENT_PUF, LEARNOSITY, LEARNOSITY_BETA } from '../../../AssessmentSlateConstants.js'

const ElmError = (props) => {

    const getErrorMessage = (error, itemErrorStatus,showSearchScreen,noSearchResults) => {
        let errorMessage = "";
        if (error && error.errorStatus != "200" && !noSearchResults && (error.activeAssessmentType == PUF || error.activeAssessmentType == FULL_ASSESSMENT_PUF)) {
            errorMessage = ERROR_MESSAGE_ELM_RESOURCE
        } else if ((error && error.errorStatus != "200" && (error.activeAssessmentType == LEARNOSITY || error.activeAssessmentType == LEARNOSITY_BETA))|| (noSearchResults==true)) {
            errorMessage = ERROR_MESSAGE_LEARNOSITY
        } else if (itemErrorStatus != "200" && !showSearchScreen && !noSearchResults) {
            errorMessage = ERROR_MESSAGE_ELM_ITEMS
        } else if(showSearchScreen == true && !noSearchResults){
            errorMessage="";
        }else{
            errorMessage = ERROR_MESSAGE_ELM_DEFAULT
        }

        return errorMessage;
    }

    return (
        <div className="main-div elm-error-div">
            <p className="elm-error-line">
                <i>{getErrorMessage(props.elmErrorProps, props.itemErrorStatus,props.showSearchScreen,props.noSearchResults)}</i>
            </p>
        </div>
    );

}

export default ElmError;