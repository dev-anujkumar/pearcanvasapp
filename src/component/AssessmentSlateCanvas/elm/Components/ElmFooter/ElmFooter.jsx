/**
* Footer Component of ELM Assessment
*/
import React from 'react';
import '../../../../../styles/AssessmentSlateCanvas/elm/ElmTable.css';

const ElmFooter = (props) => {
    const { buttonText, sendPufAssessment, closeElmWindow, openAssessmentSearchBar } = props.elmFooterProps;
    const { addFlag, hideSearch } = props;
    const openSearchBar = (e) => {
        e.preventDefault();
        openAssessmentSearchBar(true)
    }
    return (
        <div className="puf-footer">
            <button className={`puf-button add-button ${addFlag ? 'add-button-enabled' : ''}`} disabled={!addFlag} onClick={sendPufAssessment}>{buttonText}</button>
            <button className="puf-button cancel" onClick={closeElmWindow}>CANCEL</button>
            <button className={`puf-button search-button ${hideSearch ? "puf-assessment" : ""}`} onClick={openSearchBar} >SEARCH</button>
        </div>
    );
}
export default ElmFooter;