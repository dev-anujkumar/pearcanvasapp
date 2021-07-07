import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import mockAxios from 'axios';
import OpenGlossaryAssets from '../../../src/component/ElementFigure/OpenGlossaryAssets'
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
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
    },
    appStore: {
        figureGlossaryData:{
        "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
        "imageid": "urn:pearson: alfresco: e2b1710e - a000 - 4625 - b582 - 367261a2cd0e",
        "path": "https://cite-media-stg.pearson.com/legacy_paths/e2b1710e-a000-4625-b582-367261a2cd0e/2.jpeg",
        "height": "450",
        "width": "350",
        "alttext": "Alt Text for Snow white change alt text update kdvb",
        "longdescription": "Snow White Description change long desc test",
        "type": "image"
    }
}

};
let store = mockStore(initialState);
describe('Testing OpenAudioBook component', () => {
    let props = {
        closeAssetsPopup : jest.fn(),
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
        showRemoveImageGlossaryPopup:jest.fn(),
        showAudioRemovePopup : jest.fn(), 
        isGlossary :false,
        audioGlossaryData: {},
        figureGlossaryData:{},
    }
    const e = {
        target: {
            tagName: "p"
        },
        stopPropagation() { }
    }
    mockAxios.post = jest.fn().mockResolvedValueOnce('');

    const narrativeAudio = mount(<Provider store={store}><OpenGlossaryAssets {...props} /></Provider>);
    
    narrativeAudio.find('.close-icon').simulate('click');
    
    let narrativeAudioInstance = narrativeAudio.find('OpenGlossaryAssets').instance();
    const spyopenConfirmationBox = jest.spyOn(narrativeAudioInstance, 'openAudioConfirmationBox')
    const spyopenImageConfirmationBox = jest.spyOn(narrativeAudioInstance,'openImageConfirmationBox')

    test('renders without crashing', () => {
        expect(narrativeAudio).toHaveLength(1);
        let instance = narrativeAudio.instance(); 
        expect(instance).toBeDefined();
    })
    it('Test-openAudioConfirmationBox', () => {
        narrativeAudioInstance.openAudioConfirmationBox({});
        narrativeAudioInstance.forceUpdate();
        narrativeAudio.update();
        expect(spyopenConfirmationBox).toHaveBeenCalled()
        spyopenConfirmationBox.mockClear()
    })
    it('Test-openImageConfirmationBox', () => {
        narrativeAudioInstance.openImageConfirmationBox({});
        narrativeAudioInstance.forceUpdate();
        narrativeAudio.update();
        expect(spyopenImageConfirmationBox).toHaveBeenCalled()
        spyopenImageConfirmationBox.mockClear()
    })
})

describe('when audio is selected from glossary',()=>{
    let props = {
        audioData:  {},
        showAudioRemovePopup : jest.fn(), 
        isGlossary :true,
        closeAssetsPopup:jest.fn(),
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
    const narrativeAudio = mount(<Provider store={store}><OpenGlossaryAssets {...props} /></Provider>);
    let narrativeAudioInstance = narrativeAudio.find('OpenGlossaryAssets').instance();
    narrativeAudio.find('.close-icon-image').simulate('click');
    const spyHandleClick = jest.spyOn(narrativeAudioInstance, 'handleClick')
    const spyNarrativeAudioInstance = jest.spyOn(narrativeAudioInstance,'handleTab')
    test('renders without crashing', () => {
        expect(narrativeAudio).toHaveLength(1);
        let instance = narrativeAudio.instance(); 
        expect(instance).toBeDefined();
    })
    it('testing closeAddAudioBook ',()=>{
        narrativeAudioInstance.closeAddAudioBook();
        expect(narrativeAudioInstance.state.replaceToggle).toBe(false)
    })
    it('testing closeFigurePopup ',()=>{
        narrativeAudioInstance.closeFigurePopup();
        expect(narrativeAudioInstance.state.replaceToggle).toBe(false)
    })
    it('Blur Dropdown', () => {
        narrativeAudio.find('.glossary-figuredropdown').simulate('blur');
        expect(spyHandleClick).toHaveBeenCalled();
        spyHandleClick.mockClear();   
    })
    it('testing handleTab',()=>{
        narrativeAudio.find('#audio-tab').simulate('click');
        expect (spyNarrativeAudioInstance).toHaveBeenCalled();
    })
})

describe('when image is selected from glossary',()=>{
    let props = {
        showRemoveImageGlossaryPopup:jest.fn(),
        figureGlossaryData:{
            "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
            "imageid": "urn:pearson: alfresco: e2b1710e - a000 - 4625 - b582 - 367261a2cd0e",
            "path": "https://cite-media-stg.pearson.com/legacy_paths/e2b1710e-a000-4625-b582-367261a2cd0e/2.jpeg",
            "height": "450",
            "width": "350",
            "alttext": "Alt Text for Snow white change alt text update kdvb",
            "longdescription": "Snow White Description change long desc test",
            "type": "image"
        }
    }
    const e = {
        target: {
            tagName: "p"
        },
        stopPropagation() { }
    }
    mockAxios.post = jest.fn().mockResolvedValueOnce('');

    const imageWrapper = mount(<Provider store={store}><OpenGlossaryAssets {...props} /></Provider>);
    let imageWrapperInstance = imageWrapper.find('OpenGlossaryAssets').instance();
    imageWrapper.find('.close-icon-image').simulate('click');
    const spyImageInstance = jest.spyOn(imageWrapperInstance,'handleTab')
    test('renders without crashing', () => {
        expect(imageWrapper).toHaveLength(1);
        let instance = imageWrapper.instance(); 
        expect(instance).toBeDefined();
    })
    it('testing closeFigurePopup ',()=>{
        imageWrapperInstance.closeFigurePopup();
        expect(imageWrapperInstance.state.replaceToggle).toBe(false)
    })
    it('testing image handleTab',()=>{
        imageWrapper.find('#image-tabs').simulate('click');
        expect (spyImageInstance).toHaveBeenCalled();
    })
})
