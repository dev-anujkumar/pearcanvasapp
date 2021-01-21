import reducer from '../../src/appstore/audioNarrationReducer';
import * as types from '../../src/constants/Action_Constants';
import { openAudio_FINAL_STATE, WrongAudio_FINAL_STATE, 
    remove_FINAL_STATE, split_FINAL_STATE, 
    addAudio_FINAL_STATE, mockData, addGlossaryAudio_FINAL_STATE,openGlossaryAudio_FINAL_STATE,mockGlossaryData
} from '../../fixtures/audioNarrationTestingdata'

const INITIAL_STATE = {
    addAudio: false,
    openAudio: false,
    audioData: {},
    openAlfresco: false,
    openPopUp: false,
    openSplitPopUp: false,
    openWrongAudioPopup: false,
    indexSplit: 0,
    openAudioGlossaryPopup:false,
    addAudioGlossaryPopup:false,
    audioGlossaryData:{},
    isGlossary:false
};


describe('testing audioNarration reducer cases --', () => {

    xit('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
    });
    it('OPEN_AUDIO_NARRATION ', () => {
        expect(reducer(INITIAL_STATE, {
            type: types.OPEN_AUDIO_NARRATION,
            payload: true
        })).toEqual(openAudio_FINAL_STATE);
    })
    it('WRONG_AUDIO_REMOVE_POPUP ', () => {
        expect(reducer(INITIAL_STATE, {
            type: types.WRONG_AUDIO_REMOVE_POPUP,
            payload: true
        })).toEqual(WrongAudio_FINAL_STATE);
    })
    it('SHOW_REMOVE_POPUP', () => {
        expect(reducer(INITIAL_STATE, {
            type: types.SHOW_REMOVE_POPUP,
            payload: {
                value:true,
                isGlossary:true
            }
        })).toEqual(remove_FINAL_STATE);
    })
    it('SPLIT_REMOVE_POPUP', () => {
        expect(reducer(INITIAL_STATE, {
            type: types.SPLIT_REMOVE_POPUP,
            payload: {
                value: true,
                index: 0
            }
        })).toEqual(split_FINAL_STATE);
    })
    it('ADD_AUDIO_NARRATION', () => {
        expect(reducer(INITIAL_STATE, {
            type: types.ADD_AUDIO_NARRATION,
            payload: true
        })).toEqual(addAudio_FINAL_STATE);
    })
    it('CURRENT_SLATE_AUDIO_NARRATION', () => {
        expect(reducer(INITIAL_STATE, {
            type: types.CURRENT_SLATE_AUDIO_NARRATION,
            payload: {
                "narrativeAudioUrn": "135222a8-0dc2-4375-9488-2790133ce794",
                "location": "https://cite-media-stg.pearson.com/legacy_paths/135222a8-0dc2-4375-9488-2790133ce794/Automation_Audio_3.mp3",
                "title": { "en": "Automation_Audio_3.mp3" },
                "format": "audio/mpeg"
            }
        })).toEqual(mockData);
    })
    it('OPEN_AUDIO_GLOSSARY_POPUP',()=>{
        expect(reducer(INITIAL_STATE,{
            type:types.OPEN_AUDIO_GLOSSARY_POPUP,
            payload:{
                value:true,
                positions:{
                    left:'20px',
                    top:'10px'
                }
            }
        })).toEqual(openGlossaryAudio_FINAL_STATE)
    })
    it('ADD_AUDIO_GLOSSARY_POPUP',()=>{
        expect(reducer(INITIAL_STATE,{
            type:types.ADD_AUDIO_GLOSSARY_POPUP,
            payload:true
        })).toEqual(addGlossaryAudio_FINAL_STATE)
    })
    it('HANDLE_GLOSSARY_AUDIO_DATA',()=>{
        expect(reducer(INITIAL_STATE,{
            type:types.HANDLE_GLOSSARY_AUDIO_DATA,
            payload: {
                "narrativeAudioUrn": "2ddad41f-a05e-4f99-b44c-4a9306bd2a36",
                "location": "https://cite-media-stg.pearson.com/legacy_paths/2ddad41f-a05e-4f99-b44c-4a9306bd2a36/Progressive%20Audio%20sample%20Midsummer_Sky.mp3",
                "title": {
                    "en": "Progressive Audio sample Midsummer_Sky.mp3"
                },
                "format": "audio/mpeg"
            }
        })).toEqual(mockGlossaryData)
    })
});