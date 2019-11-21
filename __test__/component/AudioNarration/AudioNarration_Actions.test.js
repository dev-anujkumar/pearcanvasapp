import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../src/component/AudioNarration/AudioNarration_Actions'
import * as types from '../../../src/constants/Action_Constants'
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let initialState = {
    value: false,
    index: 0
};
describe('actions', () => {
    let store = mockStore(() => initialState);

    it('testing------- showAudioRemovePopup  action', () => {
        store = mockStore(() => initialState);
        let value = true;
        const expectedActions = [{
            type: types.SHOW_REMOVE_POPUP,
            payload: value

        }];

        store.dispatch(actions.showAudioRemovePopup(value))
        const { type, payload } = store.getActions()[0];
        expect(type).toBe(types.SHOW_REMOVE_POPUP);
        expect(store.getActions()).toEqual(expectedActions);
    })
    it('testing------- showAudioSplitPopup  action', () => {
        store = mockStore(() => initialState);
        let value = true;
        let index = 1
        const expectedActions = [{
            type: types.SPLIT_REMOVE_POPUP,
            payload : {
                value: value,
                index: index
            }
        }];

        store.dispatch(actions.showAudioSplitPopup(value, index))
        const { type, payload } = store.getActions()[0];
        expect(type).toBe(types.SPLIT_REMOVE_POPUP);
        expect(store.getActions()).toEqual(expectedActions);
    })
    it('testing------- showWrongAudioPopup  action', () => {
        store = mockStore(() => initialState);
        let value = true;
        const expectedActions = [{
            type: types.WRONG_AUDIO_REMOVE_POPUP,
            payload: value

        }];

        store.dispatch(actions.showWrongAudioPopup(value))
        const { type, payload } = store.getActions()[0];
        expect(type).toBe(types.WRONG_AUDIO_REMOVE_POPUP);
        expect(store.getActions()).toEqual(expectedActions);
    })
})