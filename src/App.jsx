
/*
* This is main App component which provides access
* to Application level state and give it to all its predecesors.
*/
// IMPORT - Plugins //
import React, { Component } from 'react';
import { Provider } from 'react-redux';

// IMPORT - Components //
import store from './appstore/store';
import CanvasWrapper from './component/CanvasWrapper';

// IMPORT - Assets //
import './styles/style.css';

console.log('!!!!! ---- canvas-0.0.24 ---- !!!!!!');

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div id='app_container' className='app'>
                    <CanvasWrapper />
                </div>
            </Provider>
        );
    }
}
export default App;
