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
            <div className="headerContainer">
                <div className="headerBlock">
                    <h4 className="headerTitle">
                        {title}
                    </h4>
                    <span className="Header-close-button"> <Button type="elmCloseWindowIcon" onClick={this.props.elmHeaderProps.closeElmWindow} />
                    </span>
                </div>
            </div>
        );
    }
}

export default ElmHeader;