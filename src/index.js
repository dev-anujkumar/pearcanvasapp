import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

// Needed for Hot Module Replacement //
if (typeof (module.hot) !== 'undefined') {
    module.hot.accept() // eslint-disable-line no-undef  
}

ReactDOM.render(<App />, document.getElementById('root'));