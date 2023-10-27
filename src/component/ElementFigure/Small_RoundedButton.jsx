import React from 'react';
import './Small_RoundedButton.css';


const SmallRoundedButton = (props) => {

    return (
        <div className="small_button_wrapper">
            <div className={props.className}><img className="version-icon" src={props.icon} /><p className="button_title">{props.buttonTitle}</p></div>
        </div>
    );
}
export default SmallRoundedButton;
