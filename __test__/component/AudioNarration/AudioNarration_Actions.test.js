import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios'
import * as actions from '../../../src/component/AudioNarration/AudioNarration_Actions'
import * as types from '../../../src/constants/Action_Constants'
import config from '../../../src/config/config'
import { mockData , mockDatadelete
} from '../../../fixtures/audioNarrationTestingdata'
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let initialState = {
    value: false,
    index: 0
};
jest.mock('../../../src/appstore/store', () => {
    return {
        getState: () => {
            return {
                audioReducer: {
                    addAudio: false,
                    openAudio: false,
                    audioData: mockDatadelete.audioData,
                    openAlfresco: false,
                    openPopUp: false,
                    openSplitPopUp: false,
                    openWrongAudioPopup: false,
                    indexSplit: 0
                }
            }
        }
    }
})
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
    describe('fetchAudioNarrationForContainer', () => {
        beforeEach(function () {
            moxios.install()
        });

        afterEach(function () {
            moxios.uninstall()
        });

        it('fetchAudioNarrationForContainer ===> success', () => {
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: mockData.audioData,
                });
            });
            let slateData = {
                currentProjectId: config.projectUrn,
                slateEntityUrn: config.slateEntityURN
            }

            const expectedActions = [
                { type: types.CURRENT_SLATE_AUDIO_NARRATION, payload: mockData.audioData },
                { type: types.OPEN_AUDIO_NARRATION, payload: true },
                { type: types.ADD_AUDIO_NARRATION, payload: false }
            ];

            const store = mockStore({ audioData: [] })

            return store.dispatch(actions.fetchAudioNarrationForContainer(slateData)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('fetchAudioNarrationForContainer ===> catch', () => {
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 404,
                    response: [],
                });
            });
            let slateData = {
                currentProjectId: config.projectUrn,
                slateEntityUrn: config.slateEntityURN
            }

            const expectedActions = [
                { type: types.ADD_AUDIO_NARRATION, payload: true },
                { type: types.OPEN_AUDIO_NARRATION, payload: false }
            ];

            const store = mockStore({ audioData: [] })

            return store.dispatch(actions.fetchAudioNarrationForContainer(slateData)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('fetchAudioNarrationForContainer ===> else', () => {
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 209,
                    response: [],
                });
            });
            let slateData = {
                currentProjectId: config.projectUrn,
                slateEntityUrn: config.slateEntityURN
            }

            const expectedActions = [
                { type: types.ADD_AUDIO_NARRATION, payload: true },
                { type: types.OPEN_AUDIO_NARRATION, payload: false }
            ];

            const store = mockStore({ audioData: [] })

            return store.dispatch(actions.fetchAudioNarrationForContainer(slateData)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });

    describe('deleteAudioNarrationForContainer', () => {

        beforeEach(function () {
            moxios.install()
      
        });

        afterEach(function () {
            moxios.uninstall()
        });

        it('deleteAudioNarrationForContainer ===> 404', () => {

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 404,
                   response: mockData.audioData,
                });
            });
            let slateData = {
                currentProjectId: config.projectUrn,
                slateEntityUrn: config.slateEntityURN
            }

            const expectedActions = [
                { type: types.ADD_AUDIO_NARRATION, payload: false },
                { type: types.OPEN_AUDIO_NARRATION, payload: true }
                
            ];

            const store = mockStore( {audioReducer : mockDatadelete} )

            return store.dispatch(actions.deleteAudioNarrationForContainer(slateData)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
        it('deleteAudioNarrationForContainer ===> success', () => {

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                   response: mockData.audioData,
                });
            });
            let slateData = {
                currentProjectId: config.projectUrn,
                slateEntityUrn: config.slateEntityURN
            }

            const expectedActions = [
                { type: types.OPEN_AUDIO_NARRATION, payload: false },
                { type: types.ADD_AUDIO_NARRATION, payload: true },
                
            ];

            const store = mockStore( {audioReducer : mockDatadelete} )

            return store.dispatch(actions.deleteAudioNarrationForContainer(slateData)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
        it('deleteAudioNarrationForContainer ===> else', () => {

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 203,
                   response: mockData.audioData,
                });
            });
            let slateData = {
                currentProjectId: config.projectUrn,
                slateEntityUrn: config.slateEntityURN
            }

            const expectedActions = [
                { type: types.ADD_AUDIO_NARRATION, payload: false },
                { type: types.OPEN_AUDIO_NARRATION, payload: true }
                
            ];

            const store = mockStore( {audioReducer : mockDatadelete} )

            return store.dispatch(actions.deleteAudioNarrationForContainer(slateData)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });


    });
})