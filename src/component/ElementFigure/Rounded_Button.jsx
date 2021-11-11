import React from 'react';
import "./Rounded_Button.css";


function RoundedButton(props) {


    return (
        <><button onClick={() => props.onClick()} className={props.className}>Update Available</button> </>
       
    );
  }
export default RoundedButton;