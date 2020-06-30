import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App  from '../src/App';

import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { mount } from 'enzyme';

const mockStore = configureMockStore(middlewares);
const store = mockStore({});

jest.mock('../src/auth/openam.js', () => {
    return function () {
        this.isUserAuthenticated = function () { }
        this.handleSessionExpire = function () { }
        this.logout = function () { }
    }
});

global.window = Object.create(window);
Object.defineProperty(window, 'location', {
    value: {
        origin: "https://dev-structuredauthoring.pearson.com",
        search: "?projectUrn=urn:pearson:distributable:04518dba-76ef-4da3-924c-46cdf7e496b7&projectEntityUrn=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e&slateEntityURN=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e&slateManifestURN=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e&ssoToken=THO1MDfgOpKowwW6ETpiNmYhSaQ.*AAJTSQACMDIAAlNLABxFQ1N2TytSQU9sWWMrcmVjMU8vOWc3RldqZlk9AAJTMQACMDE.*"
    }
});

describe('App component', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
    const div = document.createElement('div');
    let wrapper = mount(<Provider store={store}><App /></Provider>, div);
    let appInstance = wrapper.find('App').instance();
    process.env.NODE_ENV = "development";

    it('renders without crashing', () => {
        ReactDOM.render(<Provider store={store}><App /></Provider>, div); 
        ReactDOM.unmountComponentAtNode(div);
        expect(typeof(ReactDOM.unmountComponentAtNode)).toEqual('function');
    });

    it('Call Env config', async () => {
        jest.mock('../src/config/cypressConfig', () => ({
            prodUrl: "https://dev-structuredauthoring.pearson.com",
            sitePointing: "dev",
            getENVConfig: "https://10.11.7.246:8443/cypress-api/"
        }));

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {}
            });
        });

        let result = appInstance.getEnvConfig();
        await result.then(()=> jest.fn());
    });
});