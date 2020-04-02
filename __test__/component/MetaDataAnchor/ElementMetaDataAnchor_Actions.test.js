import { currentSlateLO, isLOExist, setCurrentModule, currentSlateLOMath,reRenderLO } from '../../../src/component/ElementMetaDataAnchor/ElementMetaDataAnchor_Actions';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const axios = require('axios');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Testing Actions', () => {
  it('testing currentSlateLO function', () => {
    const currentSlateLOData = 'Finish docs'
    const expectedActions =
      [{
        'payload': { currentSlateLOData },
        'type': "CURRENT_SLATE_LO_DATA",
      }]
    let store = mockStore();
    store.dispatch(currentSlateLO(currentSlateLOData));
    expect(store.getActions()).toEqual(expectedActions);
  })

  it('testing currentSlateLOMath function', () => {
    const currentSlateLODataMath = 'Finish docs'
    const expectedActions =
      [{
        'payload': { currentSlateLODataMath },
        'type': "CURRENT_SLATE_LO_DATA_MATH",
      }]
    let store = mockStore();
    store.dispatch(currentSlateLOMath(currentSlateLODataMath));
    expect(store.getActions()).toEqual(expectedActions);
  })

  it('testing setCurrentModule function', () => {
    const currentSlateLOData = true
    const expectedActions =
      [{
        'payload': currentSlateLOData,
        'type': "SHOW_MODULE_NAME",
      }]
    let store = mockStore();
    store.dispatch(setCurrentModule(currentSlateLOData));
    expect(store.getActions()).toEqual(expectedActions);
  })

  it('testing isLOExist function', () => {
    const message =
    {
      loUrn: "urn:5567809876",
      label: { en: "test data" }
    }
    const expectedActions =
      [{
        'payload': true,
        'type': "SLATE_TAG_ENABLE",
      }]
    let store = mockStore();
    store.dispatch(isLOExist(message));
    expect(store.getActions()).toEqual(expectedActions);
  })

  it('testing isLOExist function for unlinking', () => {
    const message =
    {
      toastData: "Learning Objectives has been unlinked "
    }
    const expectedActions =
      [{
        'payload': false,
        'type': "SLATE_TAG_ENABLE",
      }]
    let store = mockStore();
    store.dispatch(isLOExist(message));
    expect(store.getActions()).toEqual(expectedActions);
  })

  it('testing isLOExist function for else condition', () => {
    const message = {};
    const expectedActions =
      [{
        'payload': false,
        'type': "SLATE_TAG_ENABLE",
      }]
    let store = mockStore();
    store.dispatch(isLOExist(message));
    expect(store.getActions()).toEqual(expectedActions);
  })
  it('testing reRenderLO function', () => {
    const isRenderLO = true
    const expectedActions =
      [{
        'payload': isRenderLO,
        'type': "RE_RENDER_META_LO",
      }]
    let store = mockStore();
    store.dispatch(reRenderLO(isRenderLO));
    expect(store.getActions()).toEqual(expectedActions);
  })
});