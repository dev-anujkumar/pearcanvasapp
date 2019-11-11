
/*
* This is main App component which provides access
* to Application level state and give it to all its predecesors.
*/
// IMPORT - Plugins //
import React, { Component } from 'react';
import { Provider } from 'react-redux';

// IMPORT - Components //
import store from './appstore/store';
import config from './config/config';
import CanvasWrapper from './component/CanvasWrapper';

// IMPORT - Assets //
import './styles/style.css';

console.log('!!!!! ---- canvas-0.0.21 ---- !!!!!!');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Provider store={store}>
                <div id='app_container' className='app'>
                    <CanvasWrapper />
                </div>
            </Provider>

        );
    }

    componentDidMount () {
        // if(Object.keys(config.PATTERNS).length > 0) {
        //     Object.values(config.PATTERNS).forEach(pattern => {
        //         const script = document.createElement("script");
        //         script.type = "text/javascript";
        //         script.src = pattern;
        //         document.body.appendChild(script);
        //     });
        // }
    }
}
export default App;
