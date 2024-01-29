import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { interceptor } from './axiosInterceptor.js';

interceptor();
ReactDOM.render(<App />, document.getElementById('root'));
