import React, { Component } from 'react';

class ElmButton extends Component {

    // buttonClickHandler = (e) => {
    //     this.props.buttonProps.handlerFunction
    // }

    render() {
        const {handlerFunction} = this.props.buttonProps;
        var myButton = {
            boxShadow: 'rgb(61, 194, 27) 0px 0px 0px 0px',
            backgroundColor: 'rgba(88, 85, 85, 0.41)',
            borderRadius: '4px',
            display: 'inline-block',
            cursor: 'pointer',
            color: 'rgb(255, 255, 255)',
            fontFamily: 'Arial',
            left: '64%',
            padding: '10px 24px',
            marginTop: '2%'
        }

        if (this.props.buttonProps.marginLeft) {
            myButton = { ...myButton, marginLeft: '20px' }
        } else {
            myButton = { ...myButton }
        }

        const { buttonText } = this.props.buttonProps;

        return (
            <span>
                <button onClick = {handlerFunction} style={myButton}>{buttonText}</button>
            </span>
        );
    }
}

export default ElmButton;