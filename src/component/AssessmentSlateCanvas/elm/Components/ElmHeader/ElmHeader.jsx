/**
* Header Component of ELM Assessment
*/
import React from 'react';
import '../../../../../styles/AssessmentSlateCanvas/elm/RootElmComponent.css';
import Button from './../../../../ElementButtons';
import { LEARNOSITY, ELM_INT } from '../../../AssessmentSlateConstants';
const ElmHeader = (props) => {

    const { closeElmWindow, activeAssessmentType } = props;
    const setHeaderTitle = (type) => {
        let header = "";
        switch (type) {
            case ELM_INT:
                header = "Interactives";
                break;
            case LEARNOSITY:
                header = "Learnosity Assessments";
                break;
            default:
                header = "Elm Assessments";
                break;
        }
        return header
    }
    return (
        <div className="header-container">
            <div className="header-block">
                <h4 className="header-title">
                    {setHeaderTitle(activeAssessmentType)}
                </h4>
                <span className="header-close-button"> <Button type="elmCloseWindowIcon" onClick={closeElmWindow} />
                </span>
            </div>
        </div>
    );
}

export default ElmHeader;