import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as selectActions from '../../../../src/component/AssessmentSlateCanvas/elm/Actions/ElmActions.js';
const middlewares = [thunk];
import { mockELMResponse ,mockElmItemResponse} from '../../../../fixtures/AssessmentSlateCanvasTestingData';
import { spy, stub } from 'sinon';
import moxios from 'moxios';
import {config} from '../../../../src/config/config';
const mockStore = configureMockStore(middlewares);
let initialState = {},
initialState2={
    isLoading:true
};
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
            const { type, payload } = store.getActions()[1];
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
            const { type, payload } = store.getActions()[1];
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
            const { type, payload } = store.getActions()[1];
            expect(type).toBe('GET_ELM_RESOURCES');
            expect(payload.errFlag).toBe(true);
            expect(payload.apiStatus).toBe(error.response.status);
        })
    });
});

describe('ELM Actions- fetchAssessmentItem test', () => {
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
    it('testing---fetchAssessmentItem ', () => {
        store = mockStore(() => initialState2);
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: mockElmItemResponse
            });
        });
        return store.dispatch(selectActions.fetchAssessmentItem('urn:pearson:work:fec602d2-315e-4681-ad21-c954e927fbab')).then(() => {
            const { type, payload } = store.getActions()[2];
            expect(type).toBe('GET_ELM_ITEMS');
            expect(payload.errFlag).toBe(false);
            expect(payload.apiStatus).toBe("200");
        })
    });
    it('testing---fetchAssessmentItem -empty items array', () => {
        store = mockStore(() => initialState);
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {data:{items:[]}}
            });
        });
        return store.dispatch(selectActions.fetchAssessmentItem('urn:pearson:work:fec602d2-315e-4681-ad21-c954e927fbab')).then(() => {            
            const { type, payload } = store.getActions()[2];
            expect(type).toBe('GET_ELM_ITEMS');
            expect(payload.apiStatus).toBe("404");
        })
    });
    it('testing---fetchAssessmentItem -catch condition', () => {
        store = mockStore(() => initialState);
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 404,
                response: {}
            });
        });
        return store.dispatch(selectActions.fetchAssessmentItem('urn:pearson:work:fec602d2-315e-4681-ad21-c954e927fbac')).catch((error) => {
            const { type, payload } = store.getActions()[1];
            expect(type).toBe('GET_ELM_ITEMS');
            expect(payload.errFlag).toBe(true);
            expect(payload.apiStatus).toBe("404");
        })
    });
});