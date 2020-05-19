/**
* Header Component of ELM Assessment
*/
import React from 'react';
import '../../../../../styles/AssessmentSlateCanvas/elm/RootElmComponent.css';
import Button from './../../../../ElementButtons';

const ElmHeader = (props) => {
    const { title } = props.elmHeaderProps;
    const { closeElmWindow } = props;
    return (
        <div className="header-container">
            <div className="header-block">
                <h4 className="header-title">
                    {title}
                </h4>
                <span className="header-close-button"> <Button type="elmCloseWindowIcon" onClick={closeElmWindow} />
                </span>
            </div>
        </div>
    );
}

export default ElmHeader;