import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { c2MediaModule } from '../../../src/js/c2_media_module.js';
import AddAudioBook from '../../../src/component/AudioNarration/AddAudioBook'
import config from '../../../src/config/config.js'
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {
    audioReducer: {
        addAudio: false,
        openAudio: false,
        openRemovePopUp: false
    },
    appStore: {
        permissions: []
    }
    
};
let store = mockStore(initialState);
describe('Testing OpenAudioBook component', () => {
    let props = {
        audioData: {
            "narrativeAudioUrn": "urn:pearson:work:f20316ad-0a22-4f45-975d-ebe4ba1f2564",
            "location": "https://cite-media-stg.pearson.com/legacy_paths/f8433cd3-04cd-4479-852c-dde4ab410a9f/nse_aud_11_u43_l1_m1_02.mp3",
            "title": {
                "en": "gdjagd"
            },
            "format": "audio/mpeg"
        },
        hideTocBlocker: function () { },
        closeAddAudioBook: function () { },
        addAudioNarrationForContainer: function () { },
        permissions: ['alfresco_crud_access']
    }
    const component = mount(<Provider store={store}><AddAudioBook {...props} /></Provider>);

    test('renders without crashing', () => {
        expect(component).toHaveLength(1);
        let instance = component.instance();
        expect(instance).toBeDefined();
    })

})

describe('Testing Element figure component with props', () => {
    let props = {
        audioData: {
            "narrativeAudioUrn": "urn:pearson:work:f20316ad-0a22-4f45-975d-ebe4ba1f2564",
            "location": "https://cite-media-stg.pearson.com/legacy_paths/f8433cd3-04cd-4479-852c-dde4ab410a9f/nse_aud_11_u43_l1_m1_02.mp3",
            "title": {
                "en": "gdjagd"
            },
            "format": "audio/mpeg"
        },
        hideTocBlocker: function () { },
        closeAddAudioBook: function () { },
        addAudioNarrationForContainer: function () { },
        permissions: ['alfresco_crud_access']
    }
    const e = {
        target: {
            tagName: "p"
        },
        stopPropagation() { }
    }
    const narrativeAudio = mount(<Provider store={store}><AddAudioBook {...props} /></Provider>);
    let narrativeAudioInstance = narrativeAudio.find('AddAudioBook').instance();
    const spyhandleC2MediaClick = jest.spyOn(narrativeAudioInstance, 'handleC2MediaClick')
    it('onClick-default case', () => {
        narrativeAudioInstance.handleC2MediaClick(e);
        narrativeAudioInstance.forceUpdate();
        narrativeAudio.update();
        expect(spyhandleC2MediaClick).toHaveBeenCalledWith(e)
        spyhandleC2MediaClick.mockClear()
    })
    it('onClick-if case', () => {
        narrativeAudioInstance.handleC2MediaClick({ target: { tagName: 'g' } });
        narrativeAudioInstance.forceUpdate();
        narrativeAudio.update();
        expect(spyhandleC2MediaClick).toHaveBeenCalledWith({ target: { tagName: 'g' } });
        spyhandleC2MediaClick.mockClear()
    })
    it('Simulating alfresco click without alfresco location', () => {
        narrativeAudioInstance.handleC2MediaClick({ target: { tagName: 'b' } })
        narrativeAudioInstance.forceUpdate();
        narrativeAudio.update();
        expect(spyhandleC2MediaClick).toHaveBeenCalledWith({ target: { tagName: 'b' } })
        spyhandleC2MediaClick.mockClear()
    })
    it('Simulating alfresco click with alfresco location', () => {
        config.alfrescoMetaData = { nodeRef: {} }
        const spyhandleC2MediaClick = jest.spyOn(narrativeAudioInstance, 'handleC2MediaClick')
        narrativeAudioInstance.handleC2MediaClick({ target: { tagName: 'b' } })
        narrativeAudioInstance.forceUpdate();
        narrativeAudio.update();
        expect(spyhandleC2MediaClick).toHaveBeenCalledWith({ target: { tagName: 'b' } })
        spyhandleC2MediaClick.mockClear()
    })
    describe('Alfresco Data Handling', () => {

        let sampleAltTextDiv = document.createElement('at')
        sampleAltTextDiv.setAttribute('name', 'alt_text');
        sampleAltTextDiv.innerHTML = "alt_text"
        document.body.appendChild(sampleAltTextDiv)

        let sampleLongDescriptionDiv = document.createElement('ld')
        sampleLongDescriptionDiv.setAttribute('name', 'long_description');
        sampleLongDescriptionDiv.innerHTML = "long_Description"
        document.body.appendChild(sampleLongDescriptionDiv)



        const narrativeAudio = mount(<Provider store={store}><AddAudioBook {...props} /></Provider>);
        let narrativeAudioInstance = narrativeAudio.find('AddAudioBook').instance();
        const spydataFromAlfresco = jest.spyOn(narrativeAudioInstance, 'dataFromAlfresco')
        const defaultPath = "https://d12m40tknrppbi.cloudfront.net/cite/images/FPO-audio_video.png";

        it('Test- if case workflow', () => {
            let data = {
                "narrativeAudioUrn": "urn:pearson:work:f20316ad-0a22-4f45-975d-ebe4ba1f2564",
                "location": "https://cite-media-stg.pearson.com/legacy_paths/f8433cd3-04cd-4479-852c-dde4ab410a9f/nse_aud_11_u43_l1_m1_02.mp3",
                "title": {
                    "en": "gdjagd"
                },
                "format": "audio/mpeg"
            }
            narrativeAudioInstance.dataFromAlfresco(data)
            narrativeAudioInstance.forceUpdate();
            narrativeAudio.update();
            expect(spydataFromAlfresco).toHaveBeenCalled()
            spydataFromAlfresco.mockClear()
        })
        xit('Test- if case workflow-  epsURL given', () => {
            let data = {
                'assetType': "audio",
                epsUrl: "https://cite-media-stg.pearson.com/legacy_paths/f8433cd3-04cd-4479-852c-dde4ab410a9f/nse_aud_11_u43_l1_m1_02.mp3",
                'alt-text': "ält-text",
                'longDescription': "longDescription",
            }

            narrativeAudioInstance.forceUpdate();
            narrativeAudioInstance.dataFromAlfresco(data)
            narrativeAudioInstance.forceUpdate();
            narrativeAudio.update();
            expect(spydataFromAlfresco).toHaveBeenCalled()
            spydataFromAlfresco.mockClear()
        })
    })
});