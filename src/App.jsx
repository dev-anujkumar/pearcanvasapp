
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

console.log("!!!!! ---- canvas-0.2.6  ---- !!!!!!")

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.getQueryParameter();
    }

    getQueryParameter() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const projectUrn = params.get('projectUrn');
        const projectEntityUrn = params.get('projectEntityUrn')
        const slateEntityURN = params.get('slateEntityURN')
        const slateManifestURN = params.get('slateManifestURN')
        const ssoToken = params.get('ssoToken')
        if (projectUrn && projectEntityUrn && slateEntityURN && slateManifestURN && ssoToken) {
            config.projectUrn = projectUrn;
            config.projectEntityUrn = projectEntityUrn;
            config.slateEntityURN = slateEntityURN;
            config.slateManifestURN = slateManifestURN;
            config.ssoToken = ssoToken;
        }
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
}
export default App;
