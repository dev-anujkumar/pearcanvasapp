import React from 'react';
import "./Rounded_Button.css";


const RoundedButton = (props) => {
  return (
    <button onClick={() => props.onClick()} className={props.className}>{props.title}</button>
  );
}
export default RoundedButton;
