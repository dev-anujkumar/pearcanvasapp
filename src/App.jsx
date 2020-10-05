
/*
* This is main App component which provides access
* to Application level state and give it to all its predecesors.
*/
// IMPORT - Plugins //
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';
// IMPORT - Components //
import store from './appstore/store';
import config from './config/config';
import cypressConfig from './config/cypressConfig';
import { requestConfigURI } from './constants/utility';
import CanvasWrapper from './component/CanvasWrapper';

// IMPORT - Assets // 
import './styles/style.css';


console.log("!!!!!! ---- canvas-1.13.8 ---- !!!!!!")


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConfigLoaded : false
        };
        this.getEnvConfig();
    }
    
    getEnvConfig = () => {
        let requestURI = requestConfigURI();
        return axios.get(`${cypressConfig.getENVConfig}v1/getEnvConfig/${requestURI}`, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            if(response){
                let uri = response.data.env;
                cypressConfig.currnetEnv = uri;
                this.modifyObjKeys(config, response.data)
                const search = window.location.search;
                const params = new URLSearchParams(search);
                const projectUrn = params.get('projectUrn');
                const projectEntityUrn = params.get('projectEntityUrn')
                const slateEntityURN = params.get('slateEntityURN')
                const slateManifestURN = params.get('slateManifestURN')
                const ssoToken = params.get('ssoToken')
                this.getQueryParameter(projectUrn, projectEntityUrn, slateEntityURN,slateManifestURN,ssoToken);
                if(response.data.PATTERNS && Object.keys(response.data.PATTERNS).length>0){
                    this.loadPatternScripts(response.data.PATTERNS)
                }
            }
            
            
        }).catch((error) => {
            console.log("Error in fetching origin:", error)
        })
    }
    
    loadPatternScripts = (PATTERNS) => {

        this.appendPatternScripts(PATTERNS['PATTERN_VENDOR'])
        this.appendPatternScripts(PATTERNS['PATTERN_BROKER'])
        this.appendPatternScripts(PATTERNS['PATTERN_ADD_ASSET'])
        this.appendPatternScripts(PATTERNS['PATTERN_PRODUCT_LINK'])
        this.appendPatternScripts(PATTERNS['PATTERN_SEARCH_SELECT'])
    }

    appendPatternScripts = (src) => {
        let script = document.createElement('script');
        script.type = "text/javascript";
        script.defer = true;
        script.async = false;
        script.src = src;
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    
    modifyObjKeys = (obj, newObj) => {
        Object.keys(obj).forEach(function(key) {
          delete obj[key];
        });      
        Object.keys(newObj).forEach(function(key) {
          obj[key] = newObj[key];
        });
        Object.keys(cypressConfig).forEach(function(key) {
            obj[key] = cypressConfig[key];
        });
        console.log("obj >> ", obj);
        if(process.env.NODE_ENV === 'development'){
            obj.REACT_APP_API_URL = cypressConfig.CYPRESS_API_ENDPOINT;
            obj.JAVA_API_URL = cypressConfig.CYPRESS_TOC_JAVA_ENDPOINT;
        }
    }

    getQueryParameter(projectUrn, projectEntityUrn, slateEntityURN,slateManifestURN,ssoToken) {
        if (projectUrn && projectEntityUrn && slateEntityURN && slateManifestURN && ssoToken) {
            config.projectUrn = projectUrn;
            config.projectEntityUrn = projectEntityUrn;
            config.slateEntityURN = slateEntityURN;
            config.slateManifestURN = slateManifestURN;
            config.ssoToken = ssoToken;
            this.setState({isConfigLoaded : true});
        }
    }

    render() {
        return (
            <Provider store={store}>
                <div id='app_container' className='app'>
                    <CanvasWrapper isConfigLoaded={this.state.isConfigLoaded} />
                </div>
            </Provider>
        );
    }
}
export default App;
