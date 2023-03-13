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
    guid: jest.fn(),
    handleTinymceEditorPlugins: jest.fn(()=> 'lists advlist placeholder charmap paste image casechange' )
    }
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
const initialState2 = {
    audioReducer: {
        addAudio: false,
        openAudio: false,
        openRemovePopUp: false
    },
    appStore: {
        permissions: ['alfresco_crud_access']
    }
}
const initialState3 = {
    audioReducer: {
        addAudio: false,
        openAudio: false,
        openRemovePopUp: false
    },
    appStore: {
        permissions: ['add_multimedia_via_alfresco']
    }
}
let store = mockStore(initialState);
let store2 = mockStore(initialState2);
let store3 = mockStore(initialState3);
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
        accessDenied:  jest.fn(),
        alfrescoPopup: jest.fn(),
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
    it('If Conditions - .projectMetadata and alfresco path !== true', () => {
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
    it('If Conditions - .projectMetadata and alfresco path == true', () => {
        narrativeAudioInstance.setState({
            projectMetadata: true
        })
        narrativeAudioInstance.forceUpdate();
        narrativeAudio.update();
        let event={
            target: { tagName: 'g' },
        }
        config.alfrescoMetaData = alfrescoPath
        expect(narrativeAudioInstance.state.projectMetadata).toBe(true);
        narrativeAudioInstance.handleC2MediaClick(event);
        narrativeAudioInstance.forceUpdate();
        narrativeAudio.update();
        expect(spyhandleC2MediaClick).toHaveBeenCalledWith({ target: { tagName: 'g' } });
        spyhandleC2MediaClick.mockClear()
    })
    describe("Testing condition for handleC2MediaClick", () => {
        let props = {
            hideTocBlocker: function () { },
            closeAddAudioBook: function () { },
            addAudioNarrationForContainer: function () { },
            permissions: ['alfresco_crud_access','add_multimedia_via_alfresco'],
            accessDenied:  jest.fn(),
            alfrescoPopup: jest.fn(),
        }
        let alfrescoPath2 = {
            alfresco:{
                nodeRef: "ebaaf975-a68b-4ca6-9604-3d37111b847a",
                name: "ELMTEST_StgEnv_Krajewski Test",
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
        it('If Conditions - Alfresco site name is true', () => {
            narrativeAudioInstance.setState({
                projectMetadata: false
            })
            narrativeAudioInstance.forceUpdate();
            narrativeAudio.update();
            let event={
                target: { tagName: 'g' },
            }
            config.alfrescoMetaData = alfrescoPath2
            expect(narrativeAudioInstance.state.projectMetadata).toBe(false);
            narrativeAudioInstance.handleC2MediaClick(event);
            narrativeAudioInstance.forceUpdate();
            narrativeAudio.update();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith({ target: { tagName: 'g' } });
            spyhandleC2MediaClick.mockClear()
        })
    })
    describe("Testing condition for handleC2MediaClick", () => {
            let props = {
                hideTocBlocker: function () { },
                closeAddAudioBook: function () { },
                addAudioNarrationForContainer: function () { },
                permissions: ['alfresco_crud_access','add_multimedia_via_alfresco'],
                accessDenied:  jest.fn(),
                alfrescoPopup: jest.fn(),
            }
            let alfrescoPath2 = {
                alfresco:{
                    nodeRef: "ebaaf975-a68b-4ca6-9604-3d37111b847a",
                    repositoryFolder: "001_C5 Media POC - AWS US ",
                    repositoryName: "AWS US",
                    repositoryUrl: "https://staging.api.pearson.com/content/cmis/uswip-aws",
                    visibility: "MODERATED",
                    title: "/audio",
                    guid: "urn:pearson:manifestation:191e7b6c-53a3-420f-badd-a90786613ae5"
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
        it('If Conditions - Alfresco title is true', () => {
            narrativeAudioInstance.setState({
                projectMetadata: false
            })
            narrativeAudioInstance.forceUpdate();
            narrativeAudio.update();
            let event={
                target: { tagName: 'g' },
            }
            config.alfrescoMetaData = alfrescoPath2
            expect(narrativeAudioInstance.state.projectMetadata).toBe(false);
            narrativeAudioInstance.handleC2MediaClick(event);
            narrativeAudioInstance.forceUpdate();
            narrativeAudio.update();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith({ target: { tagName: 'g' } });
            spyhandleC2MediaClick.mockClear()
        })
    })
    describe("Testing for else condition when guid and noderef is false", () => {
        let props = {
            hideTocBlocker: function () { },
            closeAddAudioBook: function () { },
            addAudioNarrationForContainer: function () { },
            accessDenied: jest.fn(),
            alfrescoPopup: jest.fn(),
        }
        let alfrescoPath2 = {
            alfresco: {
                nodeRef: "",
                repositoryFolder: "001_C5 Media POC - AWS US ",
                repositoryName: "AWS US",
                repositoryUrl: "https://staging.api.pearson.com/content/cmis/uswip-aws",
                visibility: "MODERATED",
                guid: ""
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
            tcm: { timeUpdated: 1553707971031, userIp: "10.50.11.104", user: "c5test01", activated: true },
            url: null,
            userApprover: null,
            userApproverFullName: null,
            userCount: 0,
            'x-prsn-user-id': " ",
        }
        const narrativeAudio = mount(<Provider store={store2}><AddAudioBook {...props} /></Provider>);
        let narrativeAudioInstance = narrativeAudio.find('AddAudioBook').instance();
        const spyhandleC2MediaClick = jest.spyOn(narrativeAudioInstance, 'handleC2MediaClick') 
        it('Else Conditions - when noderef and guid is false', () => {
            narrativeAudioInstance.setState({
                projectMetadata: false
            })
            narrativeAudioInstance.forceUpdate();
            narrativeAudio.update();
            let event={
                target: { tagName: 'g' },
            }
            config.alfrescoMetaData = alfrescoPath2
            expect(narrativeAudioInstance.state.projectMetadata).toBe(false);
            narrativeAudioInstance.handleC2MediaClick(event);
            narrativeAudioInstance.forceUpdate();
            narrativeAudio.update();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith({ target: { tagName: 'g' } });
            spyhandleC2MediaClick.mockClear()
        })
    })
    describe("Testing for else condition when permission is false", () => {
        let props = {
            hideTocBlocker: function () { },
            closeAddAudioBook: function () { },
            addAudioNarrationForContainer: function () { },
            accessDenied: jest.fn(),
            alfrescoPopup: jest.fn(),
        }
        let alfrescoPath2 = {
            alfresco: {
                nodeRef: "ebaaf975-a68b-4ca6-9604-3d37111b847a",
                repositoryFolder: "001_C5 Media POC - AWS US ",
                repositoryName: "AWS US",
                repositoryUrl: "https://staging.api.pearson.com/content/cmis/uswip-aws",
                visibility: "MODERATED",
                title: "title/abcd",
                guid: "urn:pearson:manifestation:191e7b6c-53a3-420f-badd-a90786613ae5"
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
            tcm: { timeUpdated: 1553707971031, userIp: "10.50.11.104", user: "c5test01", activated: true },
            url: null,
            userApprover: null,
            userApproverFullName: null,
            userCount: 0,
            'x-prsn-user-id': " ",
        }
        const narrativeAudio = mount(<Provider store={store2}><AddAudioBook {...props} /></Provider>);
        let narrativeAudioInstance = narrativeAudio.find('AddAudioBook').instance();
        const spyhandleC2MediaClick = jest.spyOn(narrativeAudioInstance, 'handleC2MediaClick') 
        it('Else Conditions - when permission is false for add_multimedia_via_alfresco', () => {
            narrativeAudioInstance.setState({
                projectMetadata: false
            })
            narrativeAudioInstance.forceUpdate();
            narrativeAudio.update();
            let event={
                target: { tagName: 'g' },
            }
            config.alfrescoMetaData = alfrescoPath2
            expect(narrativeAudioInstance.state.projectMetadata).toBe(false);
            narrativeAudioInstance.handleC2MediaClick(event);
            narrativeAudioInstance.forceUpdate();
            narrativeAudio.update();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith({ target: { tagName: 'g' } });
            spyhandleC2MediaClick.mockClear()
        })
    })
    describe("Testing for else condition when permission is false", () => {
        let props = {
            hideTocBlocker: function () { },
            closeAddAudioBook: function () { },
            addAudioNarrationForContainer: function () { },
            accessDenied: jest.fn(),
            alfrescoPopup: jest.fn(),
        }
        let alfrescoPath2 = {
            alfresco: {
                nodeRef: "ebaaf975-a68b-4ca6-9604-3d37111b847a",
                repositoryFolder: "001_C5 Media POC - AWS US ",
                repositoryName: "AWS US",
                repositoryUrl: "https://staging.api.pearson.com/content/cmis/uswip-aws",
                visibility: "MODERATED",
                title: "title/abcd",
                guid: "urn:pearson:manifestation:191e7b6c-53a3-420f-badd-a90786613ae5"
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
            tcm: { timeUpdated: 1553707971031, userIp: "10.50.11.104", user: "c5test01", activated: true },
            url: null,
            userApprover: null,
            userApproverFullName: null,
            userCount: 0,
            'x-prsn-user-id': " ",
        }
        const narrativeAudio = mount(<Provider store={store3}><AddAudioBook {...props} /></Provider>);
        let narrativeAudioInstance = narrativeAudio.find('AddAudioBook').instance();
        const spyhandleC2MediaClick = jest.spyOn(narrativeAudioInstance, 'handleC2MediaClick') 
        it('Else Conditions - when permission is false for alfresco_crud_access', () => {
            narrativeAudioInstance.setState({
                projectMetadata: false
            })
            narrativeAudioInstance.forceUpdate();
            narrativeAudio.update();
            let event={
                target: { tagName: 'g' },
            }
            config.alfrescoMetaData = alfrescoPath2
            expect(narrativeAudioInstance.state.projectMetadata).toBe(false);
            narrativeAudioInstance.handleC2MediaClick(event);
            narrativeAudioInstance.forceUpdate();
            narrativeAudio.update();
            expect(spyhandleC2MediaClick).toHaveBeenCalledWith({ target: { tagName: 'g' } });
            spyhandleC2MediaClick.mockClear()
        })
    })
});
