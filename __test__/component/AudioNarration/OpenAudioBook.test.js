import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import mockAxios from 'axios';
import OpenAudioBook from '../../../src/component/AudioNarration/OpenAudioBook.jsx'
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let hasReviewerRole = jest.fn(() => false)
const initialState = {
    audioReducer: {
        audioData:  {
            "containerUrn": "urn:pearson:manifest:3e986eb4-47de-4abe-a4b6-903702c43742",
            "projectUrn": "urn:pearson:distributable:680aac6d-a035-475e-9f78-7ec42599b17f",
            "containerEntityUrn": "urn:pearson:entity:3d39b57a-1ca3-4919-8771-c3295ee833e9",
            "data": [{
                "narrativeAudioUrn": "135222a8-0dc2-4375-9488-2790133ce794",
                "location": "https://cite-media-stg.pearson.com/legacy_paths/135222a8-0dc2-4375-9488-2790133ce794/Automation_Audio_3.mp3",
                "title": { "en": "Automation_Audio_3.mp3" }, "format": "audio/mpeg"
            },
            {
                "narrativeAudioUrn": "135222a8-0dc2-4375-9488-2790133ce894",
                "location": "https://cite-media-stg.pearson.com/legacy_paths/135222a8-0dc2-4375-9488-2790133ce794/Automation_Audio_3.mp3",
                "title": { "en": "Automation_Audio_3.mp3" }, "format": "audio/mpeg"
            }
            ]
        },
        audioGlossaryData: {
            "narrativeAudioUrn": "135222a8-0dc2-4375-9488-2790133ce894",
            "location": "https://cite-media-stg.pearson.com/legacy_paths/135222a8-0dc2-4375-9488-2790133ce794/Automation_Audio_3.mp3",
            "title": { "en": "Automation_Audio_3.mp3" }, "format": "audio/mpeg"
        }
    }
};
let store = mockStore(initialState);
describe('Testing OpenAudioBook component', () => {
    let props = {
        closeAudioBookDialog : jest.fn(),
        audioData:  {
            "containerUrn": "urn:pearson:manifest:3e986eb4-47de-4abe-a4b6-903702c43742",
            "projectUrn": "urn:pearson:distributable:680aac6d-a035-475e-9f78-7ec42599b17f",
            "containerEntityUrn": "urn:pearson:entity:3d39b57a-1ca3-4919-8771-c3295ee833e9",
            "data": [{
                "narrativeAudioUrn": "135222a8-0dc2-4375-9488-2790133ce794",
                "location": "https://cite-media-stg.pearson.com/legacy_paths/135222a8-0dc2-4375-9488-2790133ce794/Automation_Audio_3.mp3",
                "title": { "en": "Automation_Audio_3.mp3" }, "format": "audio/mpeg"
            },
            {
                "narrativeAudioUrn": "135222a8-0dc2-4375-9488-2790133ce894",
                "location": "https://cite-media-stg.pearson.com/legacy_paths/135222a8-0dc2-4375-9488-2790133ce794/Automation_Audio_3.mp3",
                "title": { "en": "Automation_Audio_3.mp3" }, "format": "audio/mpeg"
            }
            ]
        },
        closeAudioBookDialog: jest.fn(),
        deleteAudioNarrationForContainer:  jest.fn(),
        showAudioRemovePopup : jest.fn(), 
        isGlossary :false,
        audioGlossaryData: {}
    }
    const e = {
        target: {
            tagName: "p"
        },
        stopPropagation() { }
    }
    mockAxios.post = jest.fn().mockResolvedValueOnce('');

    const narrativeAudio = mount(<Provider store={store}><OpenAudioBook {...props} /></Provider>);
    
    narrativeAudio.find('.close-icon-audio').simulate('click');
    
    let narrativeAudioInstance = narrativeAudio.find('OpenAudioBook').instance();
    const spyProcessConfirmation = jest.spyOn(narrativeAudioInstance, 'processConfirmation')
    const spyHandleClick = jest.spyOn(narrativeAudioInstance, 'handleClick')
    const spyopenConfirmationBox = jest.spyOn(narrativeAudioInstance, 'openConfirmationBox')

    test('renders without crashing', () => {
        expect(narrativeAudio).toHaveLength(1);
        let instance = narrativeAudio.instance(); 
        expect(instance).toBeDefined();
    })
    it('onClick-default case', () => {
        narrativeAudioInstance.processConfirmation("not-test");
        narrativeAudioInstance.forceUpdate();
        narrativeAudio.update();
        expect(spyProcessConfirmation).toHaveBeenCalled()
        spyProcessConfirmation.mockClear()
          
    })
    it('Blur Dropdown', () => {
        narrativeAudio.find('.audiodropdown').simulate('blur');
        // narrativeAudioInstance.processConfirmation("not-test");
        // narrativeAudioInstance.forceUpdate();
        // narrativeAudio.update();
        expect(spyHandleClick).toHaveBeenCalled()
        spyHandleClick.mockClear()
          
    })
    it('Test-openConfirmationBox', () => {
        narrativeAudioInstance.openConfirmationBox({});
        narrativeAudioInstance.forceUpdate();
        narrativeAudio.update();
        expect(spyopenConfirmationBox).toHaveBeenCalled()
        spyopenConfirmationBox.mockClear()
    })
})

describe('when audio is selected from glossary',()=>{
    let props = {
        closeAudioBookDialog : jest.fn(),
        audioData:  {},
        closeAudioBookDialog: jest.fn(),
        deleteAudioNarrationForContainer:  jest.fn(),
        showAudioRemovePopup : jest.fn(), 
        isGlossary :true,
        audioGlossaryData:   {
            "narrativeAudioUrn": "135222a8-0dc2-4375-9488-2790133ce894",
            "location": "https://cite-media-stg.pearson.com/legacy_paths/135222a8-0dc2-4375-9488-2790133ce794/Automation_Audio_3.mp3",
            "title": { "en": "Automation_Audio_3.mp3" }, "format": "audio/mpeg"
        }
    }
    const e = {
        target: {
            tagName: "p"
        },
        stopPropagation() { }
    }
    mockAxios.post = jest.fn().mockResolvedValueOnce('');

    const narrativeAudio = mount(<Provider store={store}><OpenAudioBook {...props} /></Provider>);

    let narrativeAudioInstance = narrativeAudio.find('OpenAudioBook').instance();
    narrativeAudio.find('.close-icon-audio').simulate('click');
    const spyHandleClick = jest.spyOn(narrativeAudioInstance, 'handleClick')

    test('renders without crashing', () => {
        expect(narrativeAudio).toHaveLength(1);
        let instance = narrativeAudio.instance(); 
        expect(instance).toBeDefined();
    })
    it('Blur Dropdown', () => {
        narrativeAudio.find('.glossary-audiodropdown').simulate('blur');
        expect(spyHandleClick).toHaveBeenCalled();
        spyHandleClick.mockClear();   
    })
})
