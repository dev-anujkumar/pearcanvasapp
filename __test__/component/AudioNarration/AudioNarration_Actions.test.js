import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios'; 
import * as actions from '../../../src/component/AudioNarration/AudioNarration_Actions'
import * as types from '../../../src/constants/Action_Constants'
import config from '../../../src/config/config'
import { mockData, mockDatadelete, mockGlossaryData, alfrescoDataTesting, alfrescoDataTesting2,
} from '../../../fixtures/audioNarrationTestingdata'
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
                },
                appStore: {
                    slateLevelData: {
                        "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
                            "type": "popup",
                        },
                    }
                }
            }
        },
        dispatch:()=>jest.fn().mockImplementationOnce((cb)=>{cb()})
    }
})
config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
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

    it('testing------- handleAudioActions  action', () => {
        store = mockStore(() => initialState);
        let audioDatatype = {}, audioData = {}
        const expectedActions = [
            { type: types.ADD_AUDIO_GLOSSARY_POPUP, payload: audioDatatype },
            { type: types.HANDLE_GLOSSARY_AUDIO_DATA, payload: audioData },
        ];

        store.dispatch(actions.handleAudioActions(audioDatatype,audioData))
        const { type, payload } = store.getActions()[0];
        expect(type).toBe(types.ADD_AUDIO_GLOSSARY_POPUP);
        expect(store.getActions()).toEqual(expectedActions);
    })

    it('testing------- removeAudioActions  action', () => {
        store = mockStore(() => initialState);
        let glossaryAudioData = {}, addAudioPopup = {}, openAudioPopup = {}
        const expectedActions = [
            { type: types.HANDLE_GLOSSARY_AUDIO_DATA, payload: glossaryAudioData },
            { type: types.ADD_AUDIO_GLOSSARY_POPUP, payload: addAudioPopup },
            { type: types.OPEN_AUDIO_GLOSSARY_POPUP, payload: {openAudioGlossaryPopup: openAudioPopup} }
        ];

        store.dispatch(actions.removeAudioActions(glossaryAudioData,addAudioPopup,openAudioPopup))
        const { type, payload } = store.getActions()[0];
        expect(type).toBe(types.HANDLE_GLOSSARY_AUDIO_DATA);
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
            config.isCypressPlusEnabled = true
            config.SHOW_CYPRESS_PLUS = true
            config.CYPRESS_PLUS_WINDOW = "true"
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
            let dispatch = () => {}
            await actions.fetchAudioNarrationForContainer(slateData)(dispatch);
            setTimeout(() => {
                expect(openAudioFlag).toEqual(false)
                expect(addAudioNarrationFlag).toEqual(true)
            }, 1000);
        });

        it('fetchAudioNarrationForContainer ===> if > else', async () => {
            config.isCypressPlusEnabled = false
            config.SHOW_CYPRESS_PLUS = false
            config.CYPRESS_PLUS_WINDOW = "false"
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
            let dispatch = () => {}
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

        it('deleteAudioNarrationForContainer ===> if Glossary', async() => {
            let isGlossary = true;
            let dispatch =jest.fn().mockImplementationOnce((cb)=>{cb()})
            actions.deleteAudioNarrationForContainer(isGlossary)(dispatch);
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
            config.isCypressPlusEnabled = true
            config.SHOW_CYPRESS_PLUS = true
            config.CYPRESS_PLUS_WINDOW = "true"
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
            let dispatch = () => {}
            await actions.deleteAudioNarrationForContainer(isGlossary)(dispatch);
            actions.fetchAudioNarrationForContainer(slateData)
            setTimeout(() => {
                expect(openAudioFlag).toEqual(true)
                expect(addAudioNarrationFlag).toEqual(false)
            },1000);
        });

        it('deleteAudioNarrationForContainer ===> if > else', async() => {
            config.isCypressPlusEnabled = false
            config.SHOW_CYPRESS_PLUS = false
            config.CYPRESS_PLUS_WINDOW = "false"
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
            let dispatch = () => {}
            await actions.deleteAudioNarrationForContainer(isGlossary)(dispatch);
            actions.fetchAudioNarrationForContainer(slateData)
            setTimeout(() => {
                expect(openAudioFlag).toEqual(true)
                expect(addAudioNarrationFlag).toEqual(false)
            },1000);
        });

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
            global.fetch = jest.fn();
            return store.dispatch(actions.addAudioNarrationForContainer(audioData,isGlossary)).then(() => {
                actions.fetchAudioNarrationForContainer(audioData,isGlossary)
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
            global.fetch = jest.fn();
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
            global.fetch = jest.fn();
            await actions.addAudioNarrationForContainer(audioData)(dispatch);
            setTimeout(() => {
                expect(openAudioFlag).toEqual(true)
                expect(addAudioNarrationFlag).toEqual(false)
            },1000);
            return store.dispatch(actions.fetchAudioNarrationForContainer(slateData))
        });

        it('addAudioNarrationForContainer ===> audioData?.format', async() => {
            let isGlossary = true;
            let audioData = {
                location: "https://cite-media-stg.pearson.com/legacy_paths/f8433cd3-04cd-4479-852c-dde4ab410a9f/nse_aud_11_u43_l1_m1_02.mp4",
                format: "test"
            }
            const store = mockStore( {audioReducer : mockGlossaryData.audioGlossaryData} )
            global.fetch = jest.fn();
            return store.dispatch(actions.addAudioNarrationForContainer(audioData,isGlossary)).then(() => {
                actions.fetchAudioNarrationForContainer(audioData,isGlossary)
            });
        });

        it('addAudioNarrationForContainer ===> without audioData', async() => {
            let isGlossary = true;
            let audioData = {}
            const store = mockStore( {audioReducer : mockGlossaryData.audioGlossaryData} )
            global.fetch = jest.fn();
            return store.dispatch(actions.addAudioNarrationForContainer(audioData,isGlossary)).then(() => {
                actions.fetchAudioNarrationForContainer(audioData,isGlossary)
            });
        });
    });

    describe('saveDataFromAlfresco', () => {
        it('saveDataFromAlfresco ===> if figureType is audio', () => {
            let message = alfrescoDataTesting;
            let mockedAddAudio = jest.spyOn(actions, 'addAudioNarrationForContainer');
            let dispatch = () => {
                mockedAddAudio();
                expect(mockedAddAudio).toHaveBeenCalled()
            }
            message.asset["institution-urls"] = [
                {
                    'publicationUrl': ""
                }
            ]
            actions.saveDataFromAlfresco(message)(dispatch);
        });
        it('saveDataFromAlfresco ===> if figureType is audio > else', () => {
            let message = alfrescoDataTesting;
            let mockedAddAudio = jest.spyOn(actions, 'addAudioNarrationForContainer');
            let dispatch = () => {
                mockedAddAudio();
                expect(mockedAddAudio).toHaveBeenCalled()
            }
            message.asset["institution-urls"] = [
                {
                    'publicationUrl': "test"
                }
            ]
            actions.saveDataFromAlfresco(message)(dispatch);
        });
        it('saveDataFromAlfresco ===> if (smartLinkAssetType.toLowerCase() === audio) > if', () => {
            let message = alfrescoDataTesting2;
            let mockedAddAudio = jest.spyOn(actions, 'addAudioNarrationForContainer');
            let dispatch = () => {
                mockedAddAudio();
                expect(mockedAddAudio).toHaveBeenCalled()
            }
            message.asset["properties"] = {
                "cm:description":"{\"smartLinkType\":\"audio\"}",
                "avs:url":"https://eps.openclass.com/eps=/sanvan/api/item/dbbd8a17-19a9-48e9-935b-ff27528a0006/100/file/Ciccarelli-P-4e-R2-Brix-Update_v2/m/OPS/text/chapter-05/ch5_sec_02-rw-a2f376e40075353df50f8c4c1a56933a56e7e4cf0.xhtml",
            }
            actions.saveDataFromAlfresco(message)(dispatch);
        });
        it('saveDataFromAlfresco ===> if (smartLinkAssetType.toLowerCase() === audio) > if > else', () => {
            let message = alfrescoDataTesting2;
            let mockedAddAudio = jest.spyOn(actions, 'addAudioNarrationForContainer');
            let dispatch = () => {
                mockedAddAudio();
                expect(mockedAddAudio).toHaveBeenCalled()
            }
            message.asset["properties"] = {
                "cm:description":"{\"smartLinkType\":\"audio\"}",
            }
            actions.saveDataFromAlfresco(message)(dispatch);
        });
        it('saveDataFromAlfresco ===> if (smartLinkAssetType.toLowerCase() === audio) > else', () => {
            let message = alfrescoDataTesting2;
            let mockedAddAudio = jest.spyOn(actions, 'addAudioNarrationForContainer');
            let dispatch = () => {
                mockedAddAudio();
                expect(mockedAddAudio).toHaveBeenCalled()
            }
            message.asset["properties"] = {
                "cm:description":"{\"smartLinkType\":\"test\"}",
            }
            actions.saveDataFromAlfresco(message)(dispatch);
        });
        it('saveDataFromAlfresco ===> ternary operator > false', () => {
            let message = alfrescoDataTesting2
            let mockedAddAudio = jest.spyOn(actions, 'addAudioNarrationForContainer');
            let dispatch = () => {
                mockedAddAudio();
                expect(mockedAddAudio).toHaveBeenCalled()
            }
            actions.saveDataFromAlfresco(message)(dispatch);
        });
    });
})