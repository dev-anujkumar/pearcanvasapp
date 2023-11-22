import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import AddImageGlossary from '../../../src/component/ElementFigure/AddImageGlossary.jsx'
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
    handleTinymceEditorPlugins: jest.fn(()=> 'lists advlist placeholder charmap paste image casechange' )}
})

const initialState = {
    appStore: {
        permissions: ['alfresco_crud_access','add_multimedia_via_alfresco']
    }  
};
const initialState2 = {
    appStore: {
        permissions: ['add_multimedia_via_alfresco']
    }
};
const initialState3 = {
    appStore: {
        permissions: ['alfresco_crud_access']
    }
};
let store = mockStore(initialState);
let store2 = mockStore(initialState2);
let store3 = mockStore(initialState3);
describe('Testing AddImageGlossary component', () => {
    let props = {
        hideTocBlocker: function () { },
        closeFigurePopup: function () { },
        alfrescoPopup:function() {},
        permissions: ['alfresco_crud_access','add_multimedia_via_alfresco']
    }
    const component = mount(<Provider store={store}><AddImageGlossary {...props} /></Provider>);

    test('renders without crashing', () => {
        expect(component).toHaveLength(1);
        let instance = component.instance();
        expect(instance).toBeDefined();
    })

})

describe('Testing handleC2MediaClick component', () => {
    let props = {
        hideTocBlocker: function () { },
        closeFigurePopup: function () { },
        alfrescoPopup:function() {},
        permissions: ['alfresco_crud_access','add_multimedia_via_alfresco'],
        accessDenied:  jest.fn()
    } 
    let alfrescoPath = {
        alfresco: {
            nodeRef: "ebaaf975-a68b-4ca6-9604-3d37111b847a",
            // repositoryFolder: "001_C5 Media POC - AWS US ",
            repositoryName: "AWS US",
            repositoryUrl: "https://staging.api.pearson.com/content/cmis/uswip-aws",
            visibility: "MODERATED",
            name: "ELMTEST_StgEnv_Krajewski Test"
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
    const wrapper = mount(<Provider store={store}><AddImageGlossary {...props} /></Provider>);
    let wrapperInstance = wrapper.find('AddImageGlossary').instance();
    const spyhandleC2MediaClick = jest.spyOn(wrapperInstance, 'handleC2MediaClick')
    it('onClick-if case', () => {
        wrapperInstance.setState({
            projectMetadata: false
        })
        wrapperInstance.forceUpdate();
        wrapper.update();
        let event={
            target: { tagName: 'g' },

        }
        config.alfrescoMetaData = alfrescoPath
        expect(wrapperInstance.state.projectMetadata).toBe(false);
        wrapperInstance.handleC2MediaClick(event);
        wrapperInstance.forceUpdate();
        wrapper.update();
        expect(spyhandleC2MediaClick).toHaveBeenCalledWith({ target: { tagName: 'g' } });
        spyhandleC2MediaClick.mockClear()
    })
    it('onClick-if case', () => {
        wrapperInstance.setState({
            projectMetadata: true
        })
        wrapperInstance.forceUpdate();
        wrapper.update();
        let event={
            target: { tagName: 'g' },

        }
        config.alfrescoMetaData = alfrescoPath
        expect(wrapperInstance.state.projectMetadata).toBe(true);
        wrapperInstance.handleC2MediaClick(event);
        wrapperInstance.forceUpdate();
        wrapper.update();
        expect(spyhandleC2MediaClick).toHaveBeenCalledWith({ target: { tagName: 'g' } });
        spyhandleC2MediaClick.mockClear()
    })
    it('onClick-if case', () => {
        wrapperInstance.setState({
            projectMetadata: false
        })
        wrapperInstance.forceUpdate();
        wrapper.update();
        let event={
            target: { tagName: 'g' },

        }
        config.alfrescoMetaData = alfrescoPath
        expect(wrapperInstance.state.projectMetadata).toBe(false);
        wrapperInstance.handleC2MediaClick(event);
        wrapperInstance.forceUpdate();
        wrapper.update();
        expect(spyhandleC2MediaClick).toHaveBeenCalledWith({ target: { tagName: 'g' } });
        spyhandleC2MediaClick.mockClear()
    })
});

describe("Testing alfrescositeName condition for handleC2MediaClick", () => {
    let props = {
        hideTocBlocker: function () { },
        closeFigurePopup: function () { },
        alfrescoPopup:function() {},
        permissions: ['alfresco_crud_access','add_multimedia_via_alfresco'],
        accessDenied:  jest.fn()
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
    const wrapper = mount(<Provider store={store}><AddImageGlossary {...props} /></Provider>);
    let wrapperInstance = wrapper.find('AddImageGlossary').instance();
    const spyhandleC2MediaClick = jest.spyOn(wrapperInstance, 'handleC2MediaClick')
    it('branch coverage onClick-if case', () => {
        wrapperInstance.setState({
            projectMetadata: false
        })
        wrapperInstance.forceUpdate();
        wrapper.update();
        let event={
            target: { tagName: 'g' },

        }
        config.alfrescoMetaData = alfrescoPath2
        expect(wrapperInstance.state.projectMetadata).toBe(false);
        wrapperInstance.handleC2MediaClick(event);
        wrapperInstance.forceUpdate();
        wrapper.update();
        expect(spyhandleC2MediaClick).toHaveBeenCalledWith({ target: { tagName: 'g' } });
        spyhandleC2MediaClick.mockClear()
    })
})

describe("Testing for the else condition when guid and noderef is empty", () => {
    let props = {
        hideTocBlocker: function () { },
        closeFigurePopup: function () { },
        alfrescoPopup:function() {},
        permissions: ['alfresco_crud_access','add_multimedia_via_alfresco'],
        accessDenied:  jest.fn()
    }
    let alfrescoPath2 = {
        alfresco: {
            nodeRef: "",
            repositoryFolder: "001_C5 Media POC - AWS US ",
            repositoryName: "AWS US",
            repositoryUrl: "https://staging.api.pearson.com/content/cmis/uswip-aws",
            visibility: "MODERATED",
            title: "title/abcd",
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
    const wrapper = mount(<Provider store={store}><AddImageGlossary {...props} /></Provider>);
    let wrapperInstance = wrapper.find('AddImageGlossary').instance();
    const spyhandleC2MediaClick = jest.spyOn(wrapperInstance, 'handleC2MediaClick')
    it('branch coverage onClick-if case', () => {
        wrapperInstance.setState({
            projectMetadata: false
        })
        wrapperInstance.forceUpdate();
        wrapper.update();
        let event={
            target: { tagName: 'g' },

        }
        config.alfrescoMetaData = alfrescoPath2
        expect(wrapperInstance.state.projectMetadata).toBe(false);
        wrapperInstance.handleC2MediaClick(event);
        wrapperInstance.forceUpdate();
        wrapper.update();
        expect(spyhandleC2MediaClick).toHaveBeenCalledWith({ target: { tagName: 'g' } });
        spyhandleC2MediaClick.mockClear()
    })
})

describe("Testing for else condition when permission is false", () => {
    let props = {
        hideTocBlocker: function () { },
        closeFigurePopup: function () { },
        alfrescoPopup:function() {},
        accessDenied:  jest.fn()
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
    const wrapper = mount(<Provider store={store2}><AddImageGlossary {...props} /></Provider>);
    let wrapperInstance = wrapper.find('AddImageGlossary').instance();
    const spyhandleC2MediaClick = jest.spyOn(wrapperInstance, 'handleC2MediaClick')
    it('branch coverage onClick-if case', () => {
        wrapperInstance.setState({
            projectMetadata: false
        })
        wrapperInstance.forceUpdate();
        wrapper.update();
        let event={
            target: { tagName: 'g' },

        }
        config.alfrescoMetaData = alfrescoPath2
        expect(wrapperInstance.state.projectMetadata).toBe(false);
        wrapperInstance.handleC2MediaClick(event);
        wrapperInstance.forceUpdate();
        wrapper.update();
        expect(spyhandleC2MediaClick).toHaveBeenCalledWith({ target: { tagName: 'g' } });
        spyhandleC2MediaClick.mockClear()
    })
})

describe("Testing for other else scenario when permission is false", () => {
    let props = {
        hideTocBlocker: function () { },
        closeFigurePopup: function () { },
        alfrescoPopup:function() {},
        accessDenied:  jest.fn()
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
    const wrapper = mount(<Provider store={store3}><AddImageGlossary {...props} /></Provider>);
    let wrapperInstance = wrapper.find('AddImageGlossary').instance();
    const spyhandleC2MediaClick = jest.spyOn(wrapperInstance, 'handleC2MediaClick')
    it('branch coverage onClick-if case', () => {
        wrapperInstance.setState({
            projectMetadata: false
        })
        wrapperInstance.forceUpdate();
        wrapper.update();
        let event={
            target: { tagName: 'g' },

        }
        config.alfrescoMetaData = alfrescoPath2
        expect(wrapperInstance.state.projectMetadata).toBe(false);
        wrapperInstance.handleC2MediaClick(event);
        wrapperInstance.forceUpdate();
        wrapper.update();
        expect(spyhandleC2MediaClick).toHaveBeenCalledWith({ target: { tagName: 'g' } });
        spyhandleC2MediaClick.mockClear()
    })
})

