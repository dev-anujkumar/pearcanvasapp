/**
* Footer Component of ELM Assessment
*/
import React from 'react';
import '../../../../../styles/AssessmentSlateCanvas/elm/ElmTable.css';

const ElmFooter = (props) =>{
        const { buttonText, sendPufAssessment, closeElmWindow } = props.elmFooterProps;
        const { addFlag } = props;
        return (
            <div className="puf-footer">
                <button className={`puf-button add-button ${addFlag ? 'add-button-enabled' : ''}`} disabled={!addFlag} onClick={sendPufAssessment}>{buttonText}</button>
                <button className="puf-button cancel" onClick={closeElmWindow}>CANCEL</button>
            </div>
        );  
}
export default ElmFooter;