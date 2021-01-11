import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios'; 
import * as actions from '../../../src/component/AudioNarration/AudioNarration_Actions'
import * as types from '../../../src/constants/Action_Constants'
import config from '../../../src/config/config'
import { mockData , mockDatadelete
} from '../../../fixtures/audioNarrationTestingdata'
import { async } from 'q';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let initialState = {
    value: false,
    index: 0
};
jest.mock('axios');
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

    it('testing------- audioGlossaryPopup  action', () => {
        store = mockStore(() => initialState);
        let value = true;
        const expectedActions = [{
            type: types.OPEN_AUDIO_GLOSSARY_POPUP,
            payload: value

        }];

        store.dispatch(actions.audioGlossaryPopup(value))
        const { type, payload } = store.getActions()[0];
        expect(type).toBe(types.OPEN_AUDIO_GLOSSARY_POPUP);
        expect(store.getActions()).toEqual(expectedActions);
    })
    describe('fetchAudioNarrationForContainer', () => {
        beforeEach(function () {
            moxios.install()
        });

        afterEach(function () {
            moxios.uninstall()
        });

        it('fetchAudioNarrationForContainer ===> success', async () => {
            let resp = {
                status: 200,
                data: {},
                response: mockData.audioData
            };
            axios.get.mockImplementation(() => Promise.resolve(resp));
            let slateData = {
                currentProjectId: config.projectUrn,
                slateEntityUrn: config.slateEntityURN
            }
            let openAudioFlag = '';
            let addAudioNarrationFlag = '';
            const store = mockStore({ audioReducer: mockDatadelete });
            let dispatch = (obj) => {
                if (obj.type === 'CURRENT_SLATE_AUDIO_NARRATION') {
                    expect(obj.payload).toEqual(audioDataResponse.data);
                }
                else if (obj.type === 'OPEN_AUDIO_NARRATION') {
                    expect(obj.payload).toEqual(false);
                    openAudioFlag = false;
                }
                else if (obj.type === 'ADD_AUDIO_NARRATION') {
                    expect(obj.payload).toEqual(true);
                    addAudioNarrationFlag = true;
                }
            }
            await actions.fetchAudioNarrationForContainer(slateData)(dispatch);
            setTimeout(() => {
                expect(openAudioFlag).toEqual(false)
                expect(addAudioNarrationFlag).toEqual(true)
            }, 1000);
        });

        it('fetchAudioNarrationForContainer ===> catch', async() => {
            let resp = {                
                status: 404,
                data: {},
                response: mockData.audioData
            };
            axios.get.mockImplementation(() => Promise.resolve(resp));
            let slateData = {
                currentProjectId: config.projectUrn,
                slateEntityUrn: config.slateEntityURN
            }
            let openAudioFlag = '';
            let addAudioNarrationFlag = '';
            let dispatch = (obj) => {
                if (obj.type === 'ADD_AUDIO_NARRATION') {
                    expect(obj.payload).toEqual(true);
                    openAudioFlag = true;
                }
                else if (obj.type === 'OPEN_AUDIO_NARRATION') {
                    expect(obj.payload).toEqual(false);
                    addAudioNarrationFlag = false;
                }
            }
            await actions.fetchAudioNarrationForContainer(slateData)(dispatch);
            setTimeout(() => {
                expect(openAudioFlag).toEqual(true)
                expect(addAudioNarrationFlag).toEqual(false)
            }, 1000);
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
        it('deleteAudioNarrationForContainer ===> success', async() => {
            let resp ={
                        status: 200,
                       response: mockData.audioData,
                    };
            axios.put.mockImplementation(() => Promise.resolve(resp));
            let slateData = {
                currentProjectId: config.projectUrn,
                slateEntityUrn: config.slateEntityURN
            }
           let openAudioFlag = '';
           let addAudioNarrationFlag = '';
            const store = mockStore( {audioReducer : mockDatadelete} );
            let dispatch = (obj) => {
                if(obj.type=== 'OPEN_AUDIO_NARRATION'){
                  expect(obj.payload).toEqual(true);
                  openAudioFlag =true;
                }
                else  if(obj.type=== 'ADD_AUDIO_NARRATION'){
                    expect(obj.payload).toEqual(false);
                    addAudioNarrationFlag = false;
                }
            }
            await actions.deleteAudioNarrationForContainer(slateData)(dispatch);
            actions.fetchAudioNarrationForContainer(slateData)
            setTimeout(() => {
                expect(openAudioFlag).toEqual(true)
                expect(addAudioNarrationFlag).toEqual(false)
            },1000);
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
        it('addAudioNarrationForContainer  ===> 404', async() => {
            let resp ={
                        status: 400,
                       response: mockData.audioData,
                    };
            axios.put.mockImplementation(() => Promise.resolve(resp));
            let audioData = {
                location: "https://cite-media-stg.pearson.com/legacy_paths/f8433cd3-04cd-4479-852c-dde4ab410a9f/nse_aud_11_u43_l1_m1_02.mp4",
            }
           let openAudioFlag = '';
           let addAudioNarrationFlag = '';
            const store = mockStore( {audioReducer : mockDatadelete} );
            let dispatch = (obj) => {
                if(obj.type=== 'OPEN_AUDIO_NARRATION'){
                  expect(obj.payload).toEqual(false);
                  openAudioFlag =false;
                }
                else  if(obj.type=== 'ADD_AUDIO_NARRATION'){
                    expect(obj.payload).toEqual(true);
                    addAudioNarrationFlag = true;
                }
            }
            await actions.addAudioNarrationForContainer(audioData)(dispatch);
            setTimeout(() => {
                expect(openAudioFlag).toEqual(false)
                expect(addAudioNarrationFlag).toEqual(true)
            },1000);
        });
        it('addAudioNarrationForContainer  ===> success', async() => {
            let resp ={
                        status: 200,
                       response: mockData.audioData,
                    };
            axios.put.mockImplementation(() => Promise.resolve(resp));
            let audioData = {
                location: "https://cite-media-stg.pearson.com/legacy_paths/f8433cd3-04cd-4479-852c-dde4ab410a9f/nse_aud_11_u43_l1_m1_02.mp4",
            }
            let slateData = {
                currentProjectId: config.projectUrn,
                slateEntityUrn: config.slateEntityURN
            }
           let openAudioFlag = '';
           let addAudioNarrationFlag = '';
            const store = mockStore( {audioReducer : mockDatadelete} );
            let dispatch = (obj) => {
                if(obj.type=== 'OPEN_AUDIO_NARRATION'){
                  expect(obj.payload).toEqual(true);
                  openAudioFlag =true;
                }
                else  if(obj.type=== 'ADD_AUDIO_NARRATION'){
                    expect(obj.payload).toEqual(false);
                    addAudioNarrationFlag = false;
                }
            }
            await actions.addAudioNarrationForContainer(audioData)(dispatch);
            setTimeout(() => {
                expect(openAudioFlag).toEqual(true)
                expect(addAudioNarrationFlag).toEqual(false)
            },1000);
            return store.dispatch(actions.fetchAudioNarrationForContainer(slateData))
        });

    });
})