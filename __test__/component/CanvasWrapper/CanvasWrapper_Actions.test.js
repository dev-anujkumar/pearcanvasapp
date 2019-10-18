import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as selectActions from '../../../src/component/CanvasWrapper/CanvasWrapper_Actions';
const middlewares = [thunk];
import wip from '../../component/ElementContainer/wipData'
import { spy, stub } from 'sinon';
import moxios from 'moxios';
import {
    FETCH_SLATE_DATA,
    SET_ACTIVE_ELEMENT,
} from '../../../src/constants/Action_Constants';
import { slateData } from '../../../fixtures/slateTestingData'
const mockStore = configureMockStore(middlewares);
let initialState = {
    slateLevelData: {},
    // elementsTag: {},
    activeElement: {},
    splittedElementIndex: 0,
    pageNumberData: {}
};
describe('action file test', () => {
    let store = mockStore(() => initialState);

    beforeEach(() => {
        initialState = {
            slateLevelData: {},
            // elementsTag: {},
            activeElement: {},
            splittedElementIndex: 0,
            pageNumberData: {}
        };

        moxios.install();
    });

    afterEach(() => moxios.uninstall());
    it('testing---Fetch comment action', () => {
        store = mockStore(() => initialState);
        let manifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
        const expectedActions = [{
            type: FETCH_SLATE_DATA,
            payload: { slateData }

        }];
        let data = slateData
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: data
            });
        });
        console.log(store)
        return store.dispatch(selectActions.fetchSlateData(manifestURN)).then(() => {
            const { type, payload } = store.getActions()[0];
            expect(type).toBe(FETCH_SLATE_DATA);
        });
    })


    it('fetchSlateData', () => {
      const  manifestURN  = 'urn:9324dsfds23432dsf45'
      let store = mockStore();
      store.dispatch(selectActions.fetchSlateData(manifestURN));

    });
    it('fetchAuthUser', () => {
        let store = mockStore();
        store.dispatch(selectActions.fetchAuthUser());
    });
    it('setActiveElement for paragraph', () => {
        let store = mockStore();
        store.dispatch(selectActions.setActiveElement(wip.paragraph,1));

        let expectedActions= [{
            type: SET_ACTIVE_ELEMENT,
            payload: {
                'elementType': 'element-authoredtext',
                'primaryOption': 'primary-paragraph',
                'secondaryOption': 'secondary-paragraph',
                'elementId': 'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a',
                'index': 1,
                'elementWipType': 'element-authoredtext',
                'tag': 'P'
            }
        }]
        expect(store.getActions()).toEqual(expectedActions);

    });
    it('setActiveElement for paragraph with headers', () => {
        let store = mockStore();
        store.dispatch(selectActions.setActiveElement(wip["heading-1"],1));

        let expectedActions= [{
            type: SET_ACTIVE_ELEMENT,
            payload: {
                'elementType': 'element-authoredtext',
                'primaryOption': 'primary-heading',
                'secondaryOption': 'secondary-heading-1',
                'elementId': 'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b',
                'index': 1,
                'elementWipType': 'element-authoredtext',
                'tag': 'H1'
            }
        }]
        expect(store.getActions()).toEqual(expectedActions);

    });
    it('setActiveElement for paragraph with blockfeature', () => {
        let store = mockStore();
        store.dispatch(selectActions.setActiveElement(wip.pullquote,1));

        let expectedActions= [{
            type: SET_ACTIVE_ELEMENT,
            payload: {
                'elementType': 'element-blockfeature',
                'primaryOption': 'primary-blockquote',
                'secondaryOption': 'secondary-pullquote',
                'elementId': 'urn:pearson:work:5d489bfe-ef76-4193-b07a-62d9d393fe93',
                'index': 1,
                'elementWipType': 'element-blockfeature',
                'tag': 'BQ'
            }
        }]

        //expect(store.getActions()).toEqual(expectedActions);

    });
    
});