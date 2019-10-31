import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import rootReducer from '../../src/appstore/rootReducer';

const initialState = {};

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let mockstore = mockStore(() => initialState);
import { stub } from 'sinon';
describe('test store ', () => {
    process.env = {
        NODE_ENV: "development"
    }
    stub(process.env, 'NODE_ENV').value(process.env.NODE_ENV);

    describe('environmental variables', () => {
        const OLD_ENV = process.env;

        beforeEach(() => {
            jest.resetModules()
            process.env = { ...OLD_ENV };
            delete process.env.NODE_ENV;
        });

        afterEach(() => {
            process.env = OLD_ENV;
        });
        test('will receive process.env variables', () => {
            process.env.NODE_ENV = 'development';
            const testedModule = require('../../src/appstore/store').default

        });
    });
})