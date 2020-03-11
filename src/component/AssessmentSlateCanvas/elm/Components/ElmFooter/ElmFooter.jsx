/**
* Footer Component of ELM Assessment
*/
import React, { Component } from 'react';
import '../../../../../styles/AssessmentSlateCanvas/elm/ElmTable.css';


class ElmFooter extends Component {
    render() {
        const { buttonText, sendPufAssessment, closeElmWindow } = this.props.elmFooterProps;
        const { addFlag } = this.props;
        return (
            <div className="puf-footer">
                <button className="puf-button cancel" onClick={closeElmWindow}>CANCEL</button>
                <button className={`puf-button add-button ${addFlag ? 'add-button-enabled' : ''}`} disabled={!addFlag} onClick={sendPufAssessment}>{buttonText}</button>
            </div>
        );
    }
}

export default ElmFooter;