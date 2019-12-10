import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as selectActions from '../../../../src/component/AssessmentSlateCanvas/elm/Actions/ElmActions.js';
const middlewares = [thunk];
import { mockELMResponse } from '../../../../fixtures/AssessmentSlateCanvasTestingData';
import { spy, stub } from 'sinon';
import moxios from 'moxios';
import {config} from '../../../../src/config/config';
const mockStore = configureMockStore(middlewares);
let initialState = {};
jest.mock('../../../../src/constants/utility.js', () => ({
    sendDataToIframe: jest.fn()
}))

describe('ELM Actions test', () => {
    let store = mockStore(() => initialState);
    beforeEach(() => {
        initialState = {
            elmData: {},
            errFlag: false,
            apiStatus: ""
        };

        jest.setTimeout(10000);

        moxios.install();
    });

    afterEach(() => moxios.uninstall());
    it('testing---insertElmResourceAction -ELM CASE', () => {
        store = mockStore(() => initialState);
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: mockELMResponse
            });
        });
        return store.dispatch(selectActions.insertElmResourceAction('Full Assessment PUF')).then(() => {
            const { type, payload } = store.getActions()[0];
            expect(type).toBe('GET_ELM_RESOURCES');
            expect(payload.errFlag).toBe(false);
            expect(payload.apiStatus).toBe("200");
        })
    });
    it('testing---insertElmResourceAction -ELM CASE- catch condition', () => {
        store = mockStore(() => initialState);
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 404,
                response: {}
            });
        });
        return store.dispatch(selectActions.insertElmResourceAction('Full Assessment PUF')).catch((error) => {
            const { type, payload } = store.getActions()[0];
            expect(type).toBe('GET_ELM_RESOURCES');
            expect(payload.errFlag).toBe(true);
            expect(payload.apiStatus).toBe(error.response.status);
        })
    });
    it('testing---insertElmResourceAction -LEARNOSITY CASE', () => {
        store = mockStore(() => initialState);
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: mockELMResponse
            });
        });
        return store.dispatch(selectActions.insertElmResourceAction('Learnosity')).then(() => {
            const { type, payload } = store.getActions()[0];
            expect(type).toBe('GET_ELM_RESOURCES');
            expect(payload.errFlag).toBe(false);
            expect(payload.apiStatus).toBe("200");
        })
    });
    it('testing---insertElmResourceAction -LEARNOSITY CASE- catch condition', () => {
        store = mockStore(() => initialState);
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 404,
                response: {}
            });
        });
        return store.dispatch(selectActions.insertElmResourceAction('Learnosity')).catch((error) => {
            const { type, payload } = store.getActions()[0];
            expect(type).toBe('GET_ELM_RESOURCES');
            expect(payload.errFlag).toBe(true);
            expect(payload.apiStatus).toBe(error.response.status);
        })
    });
});