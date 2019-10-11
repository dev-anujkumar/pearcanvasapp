/**
* @discription - DisFilterResults is a function based component. This component is for
* Show Error UI based on given message
*/
import React from 'react';

const ErrorComp = (props) => {
    return (
            <p className="ErrorComp">{props.errorMsg}</p>
    );
}

export default ErrorComp;