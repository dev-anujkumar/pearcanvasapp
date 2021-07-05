import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import AddAudioBook from '../../../src/component/AudioNarration/AddAudioBook'
import config from '../../../src/config/config.js'
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.mock('../../../src/js/toggleLoader', () => ({
    hideTocBlocker: jest.fn(),
    disableHeader: jest.fn(),
    showTocBlocker: jest.fn()
}))

jest.mock('../../../src/constants/utility.js', () => {
   return { sendDataToIframe: jest.fn(),
    hasReviewerRole: ()=>{
        return false
    },
    guid: jest.fn()}
})

const initialState = {
    audioReducer: {
        addAudio: false,
        openAudio: false,
        openRemovePopUp: false
    },
    appStore: {
        permissions: ['alfresco_crud_access','add_multimedia_via_alfresco']
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
        permissions: ['alfresco_crud_access','add_multimedia_via_alfresco']
    }
    const component = mount(<Provider store={store}><AddAudioBook {...props} /></Provider>);

    test('renders without crashing', () => {
        expect(component).toHaveLength(1);
        let instance = component.instance();
        expect(instance).toBeDefined();
    })

})

describe('Testing AudioNarration component with props', () => {
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
        permissions: ['alfresco_crud_access','add_multimedia_via_alfresco'],
        accessDenied:  jest.fn()
    }
    const e = {
        target: {
            tagName: "p"
        },
        stopPropagation() { }
    }
    let alfrescoPath={
        alfresco:{
            nodeRef: "ebaaf975-a68b-4ca6-9604-3d37111b847a",
        repositoryFolder: "001_C5 Media POC - AWS US ",
        repositoryName: "AWS US",
        repositoryUrl: "https://staging.api.pearson.com/content/cmis/uswip-aws",
        visibility: "MODERATED",
        },
        associatedArt: "https://cite-media-stg.pearson.com/legacy_paths/634a3489-083f-4539-8d47-0a8827246857/cover_thumbnail.jpg",
        authorName: "Krajewski",
        citeUrn: "urn:pearson:manifestation:191e7b6c-53a3-420f-badd-a90786613ae5",
        containerUrn: "urn:pearson:manifest:fd254701-5063-43aa-bd24-a2c2175be2b2",
        currentOrigin: "local",
        dateApproved: null,
        dateCreated: "2019-02-28T19:14:32.948Z",
        eTag: "Vy8xNTc0Mjc4NDkxMDYz",
        entityUrn: "urn:pearson:entity:f2f656da-c167-4a5f-ab8c-e3dbbd349095",
        gridId: [],
        hasVersions: false,
        id: "urn:pearson:distributable:cd9daf2a-981d-493f-bfae-71fd76109d8f",
        name: "ELMTEST_StgEnv_Krajewski Test",
        roleId: "admin",
        ssoToken: "qcOerhRD_CT-ocYsh-y2fujsZ0o.*AAJTSQACMDIAAlNLABxnalBuS2VJQi9RUTFMdHVBZDZBMUxyakpUTGM9AAJTMQACMDE.*",
        status: "wip",
        tcm: {timeUpdated: 1553707971031, userIp: "10.50.11.104", user: "c5test01", activated: true},
        url: null,
        userApprover: null,
        userApproverFullName: null,
        userCount: 0,
        'x-prsn-user-id': " ",
    }
    
    const narrativeAudio = mount(<Provider store={store}><AddAudioBook {...props} /></Provider>);
    let narrativeAudioInstance = narrativeAudio.find('AddAudioBook').instance();
    const spyhandleC2MediaClick = jest.spyOn(narrativeAudioInstance, 'handleC2MediaClick')
    it('onClick-if case', () => {
        narrativeAudioInstance.setState({
            projectMetadata: false
        })
        narrativeAudioInstance.forceUpdate();
        narrativeAudio.update();
        let event={
            target: { tagName: 'g' },

        }
        config.alfrescoMetaData = alfrescoPath
        expect(narrativeAudioInstance.state.projectMetadata).toBe(false);
        narrativeAudioInstance.handleC2MediaClick(event);
        narrativeAudioInstance.forceUpdate();
        narrativeAudio.update();
        expect(spyhandleC2MediaClick).toHaveBeenCalledWith({ target: { tagName: 'g' } });
        spyhandleC2MediaClick.mockClear()
    })
    xdescribe('Alfresco Data Handling', () => {

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
        it('Test- if case workflow-  smartLinkURl given', () => {
            let data = {
                'assetType': "audio",
                 epsUrl: "",
                'alt-text': "ält-text",
                'longDescription': "longDescription",
                smartLinkURl: "https://cite-media-stg.pearson.com/legacy_paths/f8433cd3-04cd-4479-852c-dde4ab410a9f/nse_aud_11_u43_l1_m1_02.mp3",
                displayName : "AudioFile",
                mimetype: "vtt"
            }

            narrativeAudioInstance.forceUpdate();
            narrativeAudioInstance.dataFromAlfresco(data)
            narrativeAudioInstance.forceUpdate();
            narrativeAudio.update();
            expect(spydataFromAlfresco).toHaveBeenCalled()
            spydataFromAlfresco.mockClear()
        })
    })
    xit('Test- lifescycle method-shouldComponentUpdate',()=>{
        const spyshouldComponentUpdate  = jest.spyOn(narrativeAudioInstance, 'shouldComponentUpdate')
        narrativeAudioInstance.shouldComponentUpdate();
        expect(spyshouldComponentUpdate).toHaveBeenCalled()
        spyshouldComponentUpdate.mockClear()
    })
});
