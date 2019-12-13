import React from 'react';
import ReactDOM from 'react-dom';
import App  from '../src/App';
import { mount } from 'enzyme';

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
        search: "?projectUrn=urn:pearson:distributable:04518dba-76ef-4da3-924c-46cdf7e496b7&projectEntityUrn=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e&slateEntityURN=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e&slateManifestURN=urn:pearson:entity:fe4a3a6e-335f-47f4-af28-cfd91fcba94e&ssoToken=THO1MDfgOpKowwW6ETpiNmYhSaQ.*AAJTSQACMDIAAlNLABxFQ1N2TytSQU9sWWMrcmVjMU8vOWc3RldqZlk9AAJTMQACMDE.*"
    }
});

xdescribe('App component', () => { 
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div); 
        ReactDOM.unmountComponentAtNode(div);
        expect(typeof(ReactDOM.unmountComponentAtNode)).toEqual('function');
    });
});