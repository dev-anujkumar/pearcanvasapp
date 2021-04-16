import { currentSlateLO, isLOExist, setCurrentModule, currentSlateLOMath,reRenderLO, currentSlateLOType, toggleLOWarningPopup } from '../../../src/component/ElementMetaDataAnchor/ElementMetaDataAnchor_Actions';
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
  it('testing currentSlateLOType function', () => {
    const learningFrameWork = 'cypressLF'
    const expectedActions =
      [{
        'payload': { "currentSlateLF": learningFrameWork},
        'type': "CURRENT_SLATE_LF",
      }]
    let store = mockStore();
    store.dispatch(currentSlateLOType(learningFrameWork));
    expect(store.getActions()).toEqual(expectedActions);
  })
  it('testing toggleLOWarningPopup function', () => {
    const toggleValue = true, warningActionIntiator = 'Align to External Framework'
    const expectedActions =
      [{
        'payload': { toggleValue, warningActionIntiator },
        'type': "TOGGLE_LO_WARNING_POPUP",
      }]
    let store = mockStore();
    store.dispatch(toggleLOWarningPopup(toggleValue, warningActionIntiator));
    expect(store.getActions()).toEqual(expectedActions);
  })
  it('testing isLOExist function for Cypress LO - has loId', () => {
    const message = { loObj: { id: 'loID1' } };
    const expectedActions =
      [{
        'payload': true,
        'type': "SLATE_TAG_ENABLE",
      }]
    let store = mockStore();
    store.dispatch(isLOExist(message));
    expect(store.getActions()).toEqual(expectedActions);
  })
  it('testing isLOExist function for Cypress LO - has loUrn', () => {
    const message = { loObj: { loUrn: 'loUrn1' } };
    const expectedActions =
      [{
        'payload': true,
        'type': "SLATE_TAG_ENABLE",
      }]
    let store = mockStore();
    store.dispatch(isLOExist(message));
    expect(store.getActions()).toEqual(expectedActions);
  })
  it('testing isLOExist function for External LO - has LOList', () => {
    const message = { LOList: [{ id: 'loID1' }] };
    const expectedActions =
      [{
        'payload': true,
        'type': "SLATE_TAG_ENABLE",
      }]
    let store = mockStore();
    store.dispatch(isLOExist(message));
    expect(store.getActions()).toEqual(expectedActions);
  })
  it('testing isLOExist function for External LO - has LOList', () => {
    const message = { LOList: [{ id: 'loID1' }] };
    const expectedActions =
      [{
        'payload': true,
        'type': "SLATE_TAG_ENABLE",
      }]
    let store = mockStore();
    store.dispatch(isLOExist(message));
    expect(store.getActions()).toEqual(expectedActions);
  })
  it('testing isLOExist function for External LO - has statusForExtLOSave', () => {
    const message = { statusForExtLOSave: true, LOList: [{ id: 'loID1' }] };
    const expectedActions =
      [{
        'payload': true,
        'type': "SLATE_TAG_ENABLE",
      }]
    let store = mockStore();
    store.dispatch(isLOExist(message));
    expect(store.getActions()).toEqual(expectedActions);
  })
  it('testing isLOExist function for External LO - has LO_Link_Status', () => {
    const message = { statusForExtLOSave: true, LO_Link_Status: true };
    const expectedActions =
      [{
        'payload': true,
        'type': "SLATE_TAG_ENABLE",
      }]
    let store = mockStore();
    store.dispatch(isLOExist(message));
    expect(store.getActions()).toEqual(expectedActions);
  })
  it('testing isLOExist function for assessmentResponseMsg', () => {
    const message = { assessmentResponseMsg: true };
    const expectedActions =
      [{
        'payload': true,
        'type': "SLATE_TAG_ENABLE",
      }]
    let store = mockStore();
    store.dispatch(isLOExist(message));
    expect(store.getActions()).toEqual(expectedActions);
  })
});