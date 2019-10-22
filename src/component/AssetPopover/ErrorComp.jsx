/**
 * This component is for Show Error UI based on given message
 */

import React from 'react';

const ErrorComp= (props) => {
    return (<section>
               <p className= "ErrorComp">{props.errorMsg}</p>
            </section>    
    );
}

export default ErrorComp;