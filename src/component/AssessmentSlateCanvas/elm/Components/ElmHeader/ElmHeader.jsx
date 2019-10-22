/**
* Header Component of ELM Assessment
*/
import React, { Component } from 'react';
import '../../../../../styles/AssessmentSlateCanvas/elm/RootElmComponent.css';
import Button from './../../../../ElementButtons';

class ElmHeader extends Component {
    render() {
        const { title } = this.props.elmHeaderProps;

        return (
            <div className="header-container">
                <div className="header-block">
                    <h4 className="header-title">
                        {title}
                    </h4>
                    <span className="header-close-button"> <Button type="elmCloseWindowIcon" onClick={this.props.elmHeaderProps.closeElmWindow} />
                    </span>
                </div>
            </div>
        );
    }
}

export default ElmHeader;