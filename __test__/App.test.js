import React from 'react';
import ReactDOM from 'react-dom';
import  App  from '../src/App';
jest.mock('../src/auth/openam.js', () => {
    return function () {
        this.isUserAuthenticated = function () { }
        this.handleSessionExpire = function () { }
        this.logout = function () { }
    }
})
describe('App component', () => { 
    it('renders without crashing', () => {
        let location = 'https://example.com?projectUrn=urn:pearson:distributable:977c95a8-e16a-413c-bfd0-788fd2a3698d&projectEntityUrn=urn:pearson:entity:3d9363f1-36bb-47ea-8842-9b142027692c&slateEntityURN=326qrygrgfuydfhdfhfhdfdh&slateManifestURN=urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e&ssoToken=dklfndndfdf&';
        const div = document.createElement('div');
        ReactDOM.render(<App testWindowMock = {location}/>, div); 
        ReactDOM.unmountComponentAtNode(div);
        expect(typeof(ReactDOM.unmountComponentAtNode)).toEqual('function');
      });
});