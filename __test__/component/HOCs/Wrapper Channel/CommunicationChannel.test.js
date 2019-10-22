import React from 'react';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import WithWrapperCommunication from '../../../../src/component/HOCs/WrapperChannel';
import { isTSAnyKeyword } from '@babel/types';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('Testing Communication Channel', () => {
    it('Render without crashing',()=>{
        const div = document.createElement('div');
        ReactDOM.render(<WithWrapperCommunication />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});