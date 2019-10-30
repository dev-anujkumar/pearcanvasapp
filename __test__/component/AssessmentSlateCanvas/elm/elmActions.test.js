import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as selectActions from '../../../../src/component/AssessmentSlateCanvas/elm/Actions/ElmActions.js';
const middlewares = [thunk];
import { mockELMResponse } from '../../../../fixtures/AssessmentSlateCanvasTestingData';
import { spy, stub } from 'sinon';
import moxios from 'moxios';

const mockStore = configureMockStore(middlewares);
let initialState = {};
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
    it('testing---insertElmResourceAction', () => {
        store = mockStore(() => initialState);
        store.dispatch(selectActions.insertElmResourceAction());
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: mockELMResponse
            });
        });
        let expectedActions = [{
            type: 'GET_ELM_RESOURCES',
            payload: {
                data: [],
                errFlag: false,
                apiStatus: "200"
            }
        }]
        return store.dispatch(selectActions.insertElmResourceAction()).then(() => {
            const { type, payload } = store.getActions()[0];
            expect(type).toBe('GET_ELM_RESOURCES');
            expect(payload.errFlag).toBe(false);
            expect(payload.apiStatus).toBe("200");
        })
    });
    it('testing---insertElmResourceAction catch condition', () => {
        store = mockStore(() => initialState);
        store.dispatch(selectActions.insertElmResourceAction());
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 404,
                response: {}
            });
        });
        return store.dispatch(selectActions.insertElmResourceAction()).catch((error) => {
            const { type, payload } = store.getActions()[0];
            expect(type).toBe('GET_ELM_RESOURCES');
            expect(payload.errFlag).toBe(true);
            expect(payload.apiStatus).toBe(error.response.status);
        })
    });
});