import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios'; 
import * as actions from '../../../src/component/AudioNarration/AudioNarration_Actions'
import * as types from '../../../src/constants/Action_Constants'
import config from '../../../src/config/config'
import { mockData , mockDatadelete,mockGlossaryData
} from '../../../fixtures/audioNarrationTestingdata'
import { async } from 'q';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let initialState = {
    value: false,
    index: 0,
    isGlossary:false,
    positions:null
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
                    indexSplit: 0,
                    isGlossary:false,
                    positions:null
                }
            }
        }
    }
})
describe('actions', () => {
    let store = mockStore(() => initialState);

    it('testing------- showAudioRemovePopup  action', () => {
        store = mockStore(() => initialState);
        let value=true;
        let isGlossary=true
        const expectedActions = [{
            type: types.SHOW_REMOVE_POPUP,
            payload: {
                value:value,
                isGlossary:isGlossary
            }

        }];

        store.dispatch(actions.showAudioRemovePopup(value,isGlossary))
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
        let positions= {
            left:'20px',
            top:'10px'
        }
        const expectedActions = [{
            type: types.OPEN_AUDIO_GLOSSARY_POPUP,
            payload: {
                value:value,
                positions:positions
            }

        }];

        store.dispatch(actions.audioGlossaryPopup(value,positions))
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

        it('deleteAudioNarrationForContainer ===> if Glossary', () => {

            let isGlossary = true;
            let data = {
                openAudioGlossaryPopup:false,
                positions:null

            }
            const expectedActions = [
                { type: types.HANDLE_GLOSSARY_AUDIO_DATA, payload: {} },
                { type: types.ADD_AUDIO_GLOSSARY_POPUP, payload: false },
                { type: types.OPEN_AUDIO_GLOSSARY_POPUP, payload: data }
                
            ];

            const store = mockStore( {audioReducer : mockDatadelete.audioGlossaryData} )

            return store.dispatch(actions.deleteAudioNarrationForContainer(isGlossary)).then(() => {
                // return of async actions
                expect(store.getActions()[0]).toEqual(expectedActions[0]);
            });
        });
        it('deleteAudioNarrationForContainer ===> 404', () => {
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 404,
                   response: mockData.audioData,
                });
            });
            let isGlossary = false;

            const expectedActions = [
                { type: types.ADD_AUDIO_NARRATION, payload: false },
                { type: types.OPEN_AUDIO_NARRATION, payload: true }
                
            ];

            const store = mockStore( {audioReducer : mockDatadelete.audioData} )

            return store.dispatch(actions.deleteAudioNarrationForContainer(isGlossary)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
        
        it('deleteAudioNarrationForContainer ===> success', async() => {
            let resp ={
                        status: 200,
                       response: mockData.audioData,
                    };
            axios.delete.mockImplementation(() => Promise.resolve(resp));
            let slateData = {
                currentProjectId: config.projectUrn,
                slateEntityUrn: config.slateEntityURN
            }
            let isGlossary = false;
           let openAudioFlag = '';
           let addAudioNarrationFlag = '';
            const store = mockStore( {audioReducer : mockDatadelete.audioData} );
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
            await actions.deleteAudioNarrationForContainer(isGlossary)(dispatch);
            actions.fetchAudioNarrationForContainer(slateData)
            setTimeout(() => {
                expect(openAudioFlag).toEqual(true)
                expect(addAudioNarrationFlag).toEqual(false)
            },1000);
        });
        // xit('deleteAudioNarrationForContainer ===> else', () => {

        //     moxios.wait(() => {
        //         const request = moxios.requests.mostRecent();
        //         request.respondWith({
        //             status: 203,
        //            response: mockData.audioData,
        //         });
        //     });

        //     const expectedActions = [
        //         { type: types.ADD_AUDIO_NARRATION, payload: false },
        //         { type: types.OPEN_AUDIO_NARRATION, payload: true }
                
        //     ];
        //     let isGlossary = false;
        //     const store = mockStore( {audioReducer : mockDatadelete.audioData} )

        //     return store.dispatch(actions.deleteAudioNarrationForContainer(isGlossary)).then(() => {
        //         // return of async actions
        //         expect(store.getActions()).toEqual(expectedActions);
        //     });
        // });
        it('addAudioNarrationForContainer ===> if Glossary', async() => {
            let isGlossary = true;
            let audioData = {
                location: "https://cite-media-stg.pearson.com/legacy_paths/f8433cd3-04cd-4479-852c-dde4ab410a9f/nse_aud_11_u43_l1_m1_02.mp4",
            }
            const expectedActions = [
                { type: types.ADD_AUDIO_GLOSSARY_POPUP, payload: true },
                { type: types.HANDLE_GLOSSARY_AUDIO_DATA, payload: audioData}   
            ];
           
            const store = mockStore( {audioReducer : mockGlossaryData.audioGlossaryData} )

            return store.dispatch(actions.addAudioNarrationForContainer(audioData,isGlossary)).then(() => {
                actions.fetchAudioNarrationForContainer(audioData,isGlossary)

                // return of async actions
                expect(store.getActions()[0]).toEqual(expectedActions[0]);
                expect(store.getActions()[1]).toEqual(expectedActions[1]);
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