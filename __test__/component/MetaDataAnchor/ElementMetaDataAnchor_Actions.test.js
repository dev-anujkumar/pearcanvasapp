import {currentSlateLO} from '../../../src/component/ElementMetaDataAnchor/ElementMetaDataAnchor_Actions';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const axios = require('axios');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('Testing Actions', () => {
    it('testing currentSlateLO function', () => {
        const  currentSlateLOData  = 'Finish docs'
        const expectedActions = 
        [{
          'payload': {currentSlateLOData},
          'type': "CURRENT_SLATE_LO_DATA",
        }]
        let store = mockStore();
        store.dispatch(currentSlateLO(currentSlateLOData));
        expect(store.getActions()).toEqual(expectedActions);
    })
});