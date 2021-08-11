import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import CanvasWrapper from '../../../src/component/CanvasWrapper';
import {
    communicationMockData,
    GlossaryMockState,
    SlateLockMockState,
    AssetPopOverMockState
} from '../../../fixtures/slateTestingData.js';
import tinymce from 'tinymce/tinymce';
import config from '../../../src/config/config';
let tinyMceEditor = {
    undoManager: { data: [], typing: false, beforeChange: jest.fn(), add: jest.fn(), undo: jest.fn() ,transact: () =>{ }},
    windowManager: { open: jest.fn(), openUrl: jest.fn(), alert: jest.fn(), confirm: jest.fn(), close: jest.fn() }
}
tinymce.activeEditor = { ...tinyMceEditor }
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {
    appStore: {
        slateLevelData: communicationMockData,
        permissions: [],
        currentSlateAncestorData: {}
    },
    glossaryFootnoteReducer: {
        glossaryFootnoteValue: GlossaryMockState
    },
    audioReducer: {
        openRemovePopUp: false,
        openSplitPopUp: false
    },
    slateLockReducer: SlateLockMockState,
    assetPopOverSearch: AssetPopOverMockState,
    metadataReducer: {
        currentSlateLOData: [{
            id: 1,
            loUrn: "123",
            label:{
                en:'en'
            }
        }]
    },
    toolbarReducer:{
        pageNumberToggle:false
    },
    alfrescoReducer: {
        editor:{}
    }
};

jest.mock('../../../src/auth/openam.js', () => {
    return function () {
        this.isUserAuthenticated = function () { }
        this.handleSessionExpire = function () { }
        this.logout = function () { }
    }
})
jest.mock('../../../src/js/auth_module.js', () => {
    return function () {
    }
})
jest.mock('../../../src/js/header.js', () => {
    return function () {
    }
})
jest.mock('../../../src/component/Toolbar', () => {
    return function () {
        return (<div>null</div>)
    }
})
jest.mock('../../../src/component/SlateWrapper', () => {
    return function () {
        return (<div>null</div>)
    }
})
jest.mock('../../../src/component/CommentsPanel', () => {
    return function () {
        return (<div>null</div>)
    }
})
jest.mock('../../../src/component/GlossaryFootnotePopup', () => {
    return function () {
        return (<div>null</div>)
    }
})
jest.mock('../../../src/component/Sidebar', () => {
    return function () {
        return (<div>null</div>)
    }
})
jest.mock('../../../src/component/CanvasWrapper/SlateLock_Actions', () => {
    return {
        getSlateLockStatus: function () {
            return {
                type: 'SET_SLATE_LOCK_STATUS',
                payload: null
            }
        },
        setSlateLock: function () {
            return {
                type: 'SET_LOCK_FLAG',
                payload: null
            }
        },
        releaseSlateLock: function () {
            return {
                type: 'SET_LOCK_FLAG',
                payload: null
            }
        }, setLockPeriodFlag: function () {
            return {
                type: 'SET_LOCK_FLAG',
                payload: null
            }
        },
        getSlateLockStatusWithCallback: function () {
            return {
            }
        },
        releaseSlateLockWithCallback: function () {
            return {
            }
        },
    }
})
jest.mock('../../../src/component/CommentsPanel/CommentsPanel_Action', () => {
    return {
        toggleCommentsPanel: function () {
            return {
                type: 'TOGGLE_COMMENTS_PANEL',
                payload: null
            }
        },

        fetchComments: function () {
            return {
                type: 'FETCH_COMMENTS',
                payload: null
            }
        },
        fetchCommentByElement: function () {
            return {
                type: 'FETCH_COMMENT_BY_ELEMENT',
                payload: null
            }
        }
    }
})
jest.mock('../../../src/js/toggleLoader', () => ({
    hideTocBlocker: jest.fn(),
    disableHeader: jest.fn(),
    showTocBlocker: jest.fn(),
    hideBlocker: jest.fn(),
    showHeaderBlocker: jest.fn(),
    showBlocker: jest.fn()
}))
jest.mock('../../../src/config/config.js', () => ({
    disablePrev: false,
    WRAPPER_URL: 'https://localhost:4000',
    disableNext: false,
    slateManifestURN: "urn:pearson:manifest:39dfa171-7d07-4ef6-a361-129036d0c9f4",
    ssoToken: "IZaFs6qIbKAo1yX0WaRCz6fagzA.*AAJTSQACMDIAAlNLABw5WUNuT3h6MEN0OHRFRUlEZUxFamxQa1EyNm89AAJTMQACMDE.*",
    projectUrn: "urn:pearson:distributable:977c95a8-e16a-413c-bfd0-788fd2a3698d",
    citeUrn: "urn:pearson:manifestation:7fa4ae52-fabc-4a7f-8876-6054f33d36c4",
    projectEntityUrn: "urn:pearson:entity:3d9363f1-36bb-47ea-8842-9b142027692c",
    book_title: "ELMTEST_StgEnv_Krajewski Test",
    tcmStatus: false
}))
jest.mock('../../../src/component/CanvasWrapper/TCM_Integration_Actions', () => {
    return { loadTrackChanges: jest.fn() }
})
jest.mock('../../../src/component/ElementMetaDataAnchor/ExternalLO_helpers.js', () => {
    return { 
        setCurrentSlateLOs: jest.fn(() => [{}]),
        prepareLODataForUpdate: jest.fn(()=> [{}]),
        getSlateMetadataAnchorElem: jest.fn(() => [{ loUrn: '1' }]),
        prepareLO_WIP_Data: jest.fn(() => ({ 'elementdata': { 'loref': '' } }))
    }
})
describe('Testing communication channel', () => {
    let store = mockStore(initialState);
    let props = {
        slateLevelData: {
            "urn:pearson:manifest:39dfa171-7d07-4ef6-a361-129036d0c9f4": {
                contents: {
                    bodymatter: [
                        {
                            "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",
                            "type": "element-authoredtext",
                            "subtype": "",
                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                            "elementdata": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "headers": [
                                    {
                                        "charStart": 0,
                                        "charEnd": 8,
                                        "level": 1
                                    }
                                ],
                                "text": "Heading 1"
                            },
                            "html": {
                                "text": "<h1 class=\"heading1NummerEins\">Heading 1</h1>"
                            },
                            "comments": false,
                            "tcm": false,
                            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                        }
                    ]
                }
            }
        },
        toggleCommentsPanel: jest.fn(),
        currentSlateLO: jest.fn(),
        currentSlateLOMath: jest.fn(),
        isLOExist: jest.fn(),
        fetchAuthUser: jest.fn(),
        handleSplitSlate: jest.fn(),
        setUpdatedSlateTitle: jest.fn(),
        fetchSlateData: jest.fn(),
        publishContent: jest.fn(),
        getSlateLockStatus: jest.fn(),
        withinLockPeriod: true,
        updateElement: jest.fn(),
        getAllSlatesData:jest.fn(),
        toggleElemBordersAction:jest.fn(),
        fetchSlateAncestorData:jest.fn(),
        currentSlateLOData: {
            id: 1,
            loUrn: "123",
            label:{
                en:'en'
            }
        },
        alfrescoPopup: jest.fn(),
        saveInlineImageData: jest.fn(),
        saveSelectedAssetData: jest.fn(),
        showWrongAudioPopup: jest.fn(),
        saveImageDataFromAlfresco: jest.fn(),
        setElmPickerData: jest.fn(),
        currentSlateLOType: jest.fn()
    }
    let wrapper = mount(<Provider store={store}><CanvasWrapper {...props} /></Provider>)
    let channelInstance = wrapper.find('CommunicationWrapper').instance();
    expect(wrapper).toHaveLength(1);
    expect(channelInstance).toBeDefined();
    test('Test for getPermissions else case', () => {
        let event = {
            data: {
                type: "getPermissions",
                message: ""
            }
        }
        const spysendingPermissions = jest.spyOn(channelInstance, 'sendingPermissions')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.sendingPermissions).toHaveBeenCalled()
        spysendingPermissions.mockClear()
    })
    
    test('Test for selectedSlate case', () => {
        let currentSlate = {
            category: "titleChange",
            container: "chapter",
            entityUrn: "urn:pearson:entity:c8240c45-ba81-4a8a-8f9e-32b68108eb4e",
            id: "urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6775cba97b29",
            parentId: "",
            parentType: "chapter",
            title: "blank",
            type: "assessment",
            permissions: [],
            node: {
                HasBackMatter: false,
                HasIntroductorySlate: false,
                ParentContainerUrn: "urn:pearson:manifest:4887bbbf-286e-4b27-81ac-d77f507161dc",
                ParentEntityUrn: "urn:pearson:entity:b4fab541-891a-4766-ac65-6dc58b68b0b3",
                containerUrn: "urn:pearson:manifest:39dfa171-7d07-4ef6-a361-129036d0c9f4",
                cursored: false,
                deletableStatus: true,
                entityUrn: "urn:pearson:entity:fe283fbd-b9e4-4666-8d65-be2bc9da63b3",
                label: "section",
                nodeLabel: "assessment-slate",
                nodeParentLabel: "chapter",
                parentBodyMatterLengthFlag: false,
                parentEntityUrn: "urn:pearson:entity:b4fab541-891a-4766-ac65-6dc58b68b0b3",
                type: "container",
                unformattedTitle: {
                    en: '1'
                }
            },
            disableNext: false,
            disablePrev: false,
        }
        let event = {
            data: {
                type: "selectedSlate",
                message: currentSlate
            }
        }
        const spysetCurrentSlate = jest.spyOn(channelInstance, 'setCurrentSlate')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.setCurrentSlate).toHaveBeenCalled()
        spysetCurrentSlate.mockClear()
    })
    test('Test for deleteTocItem case', () => {
        let event = {
            data: {
                type: "deleteTocItem",
                message: {
                    parentUrnReceived: "urn:pearson:entity:46cc9f47-5039-4fe0-93c4-1ab799a7230f",
                    changedValue: {
                        HasBackMatter: false,
                        HasIntroductorySlate: false,
                        ParentContainerUrn: "urn:pearson:manifest:c13a1e15-7733-4931-b683-3d7c1de8c74f",
                        ParentEntityUrn: "urn:pearson:entity:46cc9f47-5039-4fe0-93c4-1ab799a7230f",
                        containerUrn: "urn:pearson:manifest:26709b4c-4e2b-4ca0-8da4-d00d8341f14c",
                        entityUrn: "urn:pearson:entity:f969b50b-465a-48a7-9170-0e6f27f171a7",
                        isActive: true,
                        nodeLabel: "container-introduction",
                        nodeParentLabel: "part",
                        projectUrn: "urn:pearson:distributable:680aac6d-a035-475e-9f78-7ec42599b17f",
                        type: "container-introduction"
                    }
                }
            }
        }
        const spyonDeleteTocItem = jest.spyOn(channelInstance, 'onDeleteTocItem')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.onDeleteTocItem).toHaveBeenCalled()
        spyonDeleteTocItem.mockClear()
    })
    test('Test for deleteTocItemWithPendingTrack case', () => {
        let event = {
            data: {
                type: "deleteTocItemWithPendingTrack",
                message: {
                    parentUrnReceived: "urn:pearson:entity:46cc9f47-5039-4fe0-93c4-1ab799a7230f",
                    changedValue: {
                        HasBackMatter: false,
                        HasIntroductorySlate: false,
                        ParentContainerUrn: "urn:pearson:manifest:c13a1e15-7733-4931-b683-3d7c1de8c74f",
                        ParentEntityUrn: "urn:pearson:entity:46cc9f47-5039-4fe0-93c4-1ab799a7230f",
                        containerUrn: "urn:pearson:manifest:26709b4c-4e2b-4ca0-8da4-d00d8341f14c",
                        entityUrn: "urn:pearson:entity:f969b50b-465a-48a7-9170-0e6f27f171a7",
                        isActive: true,
                        nodeLabel: "container-introduction",
                        nodeParentLabel: "part",
                        projectUrn: "urn:pearson:distributable:680aac6d-a035-475e-9f78-7ec42599b17f",
                        type: "container-introduction"
                    }
                }
            }
        }
        const spyonDeleteTocItem = jest.spyOn(channelInstance, 'onDeleteTocItem')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.onDeleteTocItem).toHaveBeenCalledWith(event.data.message, 'withPendingTrack')
        spyonDeleteTocItem.mockClear()
    })
    test('Test for showSingleContainerDelete case', () => {
        let event = {
            data: {
                type: "showSingleContainerDelete",
                message: ""
            }
        }
        const spyonSingleContainerDelete = jest.spyOn(channelInstance, 'onSingleContainerDelete')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.onSingleContainerDelete).toHaveBeenCalled()
        spyonSingleContainerDelete.mockClear()
    })
    test('Test for titleChanging case', () => {
        config.S3MathImagePath = 'test345';
        channelInstance.setState({
            project_urn: 'urn:pearson:manifest:39dfa171-7d07-4ef6-a361-129036d0c9f4'
        })
        let currentSlate1 = {
            category: "titleChange",
            container: "chapter",
            entityUrn: "urn:pearson:entity:c8240c45-ba81-4a8a-8f9e-32b68108eb4e",
            id: "urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6775cba97b29",
            parentId: 'urn:pearson:manifest:39dfa171-7d07-4ef6-a361-129036d0c9f4',
            parentType: "chapter",
            title: "blank",
            type: "assessment",
            slateType: "section",
            node: {
                HasBackMatter: false,
                HasIntroductorySlate: false,
                ParentContainerUrn: "urn:pearson:manifest:4887bbbf-286e-4b27-81ac-d77f507161dc",
                ParentEntityUrn: "urn:pearson:entity:b4fab541-891a-4766-ac65-6dc58b68b0b3",
                containerUrn: "urn:pearson:manifest:39dfa171-7d07-4ef6-a361-129036d0c9f4",
                cursored: false,
                deletableStatus: true,
                entityUrn: "urn:pearson:entity:fe283fbd-b9e4-4666-8d65-be2bc9da63b3",
                label: "section",
                nodeLabel: "section",
                nodeParentLabel: "chapter",
                parentBodyMatterLengthFlag: false,
                parentEntityUrn: "urn:pearson:entity:b4fab541-891a-4766-ac65-6dc58b68b0b3",
                type: "container"
            }
        }
        let event = {
            data: {
                type: "titleChanging",
                message: currentSlate1
            }
        }
        props.withinLockPeriod = true;
        const spysetCurrentSlate = jest.spyOn(channelInstance, 'setCurrentSlate')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.setCurrentSlate).toHaveBeenCalled()
        spysetCurrentSlate.mockClear()
    })
    test('Test for newSplitedSlate case', () => {
        jest.useFakeTimers();
        let event = {
            data: {
                type: "newSplitedSlate",
                message: {}
            }
        }
        const spyhanndleSplitSlate = jest.spyOn(channelInstance, 'hanndleSplitSlate')
        channelInstance.handleIncommingMessages(event);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
        spyhanndleSplitSlate.mockClear()
    })
    xdescribe('Test for updateSlateTitleByID', () => {
        let currentSlate1 = {
            category: "titleChange",
            container: "chapter",
            entityUrn: "urn:pearson:entity:c8240c45-ba81-4a8a-8f9e-32b68108eb4e",
            id: "urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6775cba97b29",
            parentId: 'urn:pearson:manifest:39dfa171-7d07-4ef6-a361-129036d0c9f4',
            parentType: "chapter",
            title: "blank",
            type: "assessment",
            slateType: "section"
        }
        let currentSlate2 = {
            category: "titleChange",
            container: "chapter",
            entityUrn: "urn:pearson:entity:c8240c45-ba81-4a8a-8f9e-32b68108eb4e",
            id: "urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6775cba97b29",
            parentId: "",
            parentType: "chapter",
            title: "blank",
            type: "assessment",
            slateType: "container-introduction"
        }
        let currentSlate3 = {
            category: "titleChange",
            container: "chapter",
            entityUrn: "urn:pearson:entity:c8240c45-ba81-4a8a-8f9e-32b68108eb4e",
            id: "urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6775cba97b29",
            parentId: "",
            parentType: "chapter",
            title: "blank",
            type: "assessment",
            slateType: "container-introduction",
            slateID: "urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6775cba97b29",
        }
        let props2 = {
            slateLevelData: {
                'urn:pearson:manifest:39dfa171-7d07-4ef6-a361-129036d0c9f4': {}
            },
            glossaryFootnoteValue: { type: 'Glossary', popUpStatus: false },
            withinLockPeriod: false,
            slateLockInfo: { isLocked: false, timestamp: '', userId: 'c5Test01' },
            showApoSearch: false,
            fetchSlateData: function () { },
            handleSplitSlate: function () { },
            currentSlateLO: function () { },
            setUpdatedSlateTitle: jest.mock('../../../src/component/SlateWrapper/SlateWrapper_Actions', () => {
                return {
                    setUpdatedSlateTitle: function (newSlateObj) {
                        return {
                            type: 'SET_UPDATED_SLATE_TITLE',
                            payload: newSlateObj
                        }
                    }
                }
            }),
            fetchAuthUser: function () { },
            handleSlateRefresh: function () { },
            logout: function () { },
            publishContent: jest.fn(),
            fetchAudioNarrationForContainer: jest.fn(),
            currentSlateLOMath:jest.fn(),
            getAllSlatesData:jest.fn(),
            introObject: {
                isCO: false,
                introSlate: "urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6775cba97b29"
            }
        };
        let props3 = {
            slateLevelData: {
                'urn:pearson:manifest:39dfa171-7d07-4ef6-a361-129036d0c9f4': {}
            },
            glossaryFootnoteValue: { type: 'Glossary', popUpStatus: false },
            withinLockPeriod: false,
            slateLockInfo: { isLocked: false, timestamp: '', userId: 'c5Test01' },
            showApoSearch: false,
            fetchSlateData: function () { },
            handleSplitSlate: function () { },
            currentSlateLO: function () { },
            fetchAudioNarrationForContainer: jest.fn(),
            setUpdatedSlateTitle: jest.mock('../../../src/component/SlateWrapper/SlateWrapper_Actions', () => {
                return {
                    setUpdatedSlateTitle: function (newSlateObj) {
                        return {
                            type: 'SET_UPDATED_SLATE_TITLE',
                            payload: newSlateObj
                        }
                    }
                }
            }),
            fetchAuthUser: function () { },
            handleSlateRefresh: function () { },
            logout: function () { },
            publishContent: jest.fn(),
            fetchAudioNarrationForContainer: jest.fn(),
            currentSlateLOMath:jest.fn(),
            getAllSlatesData:jest.fn(),
            introObject: {
                isCO: false,
                introSlate: "urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6775cba97b29"
            }
        };
        test('Test for updateSlateTitleByID - default case', () => {
            let event = {
                data: {
                    type: "updateSlateTitleByID",
                    message: currentSlate1
                }
            }
            const spyupdateSlateTitleByID = jest.spyOn(channelInstance, 'updateSlateTitleByID')
            const spyupdateTitleSlate = jest.spyOn(channelInstance, 'updateTitleSlate')
            channelInstance.handleIncommingMessages(event);
            channelInstance.updateSlateTitleByID(currentSlate1);
            channelInstance.updateTitleSlate(currentSlate1);
            expect(channelInstance.updateTitleSlate).toHaveBeenCalled()
            expect(channelInstance.updateSlateTitleByID).toHaveBeenCalled()
            spyupdateTitleSlate.mockClear()
            spyupdateSlateTitleByID.mockClear()
        })
        test('Test for updateSlateTitleByID and fetchOpenerData functions', () => {
            let wrapper = mount(<Provider store={store}>
                <CanvasWrapper {...props2} />
            </Provider>)
            let channelInstance = wrapper.find('CommunicationWrapper').instance();

            let event = {
                data: {
                    type: "updateSlateTitleByID",
                    message: currentSlate2
                }
            }
            const spyupdateSlateTitleByID = jest.spyOn(channelInstance, 'updateSlateTitleByID')
            const spyupdateTitleSlate = jest.spyOn(channelInstance, 'updateTitleSlate')
            channelInstance.handleIncommingMessages(event);
            channelInstance.updateSlateTitleByID(currentSlate2);
            channelInstance.updateTitleSlate(currentSlate2);
            expect(channelInstance.updateTitleSlate).toHaveBeenCalled()
            expect(channelInstance.updateSlateTitleByID).toHaveBeenCalled()
            spyupdateTitleSlate.mockClear()
            spyupdateSlateTitleByID.mockClear()
        })
        test('Test for updateSlateTitleByID and updateTitleSlate functions', () => {
            let communicationWrapper = mount(<Provider store={store}>
                <CanvasWrapper {...props3} />
            </Provider>)
            let event = {
                data: {
                    type: "updateSlateTitleByID",
                    message: currentSlate3
                }
            }
            let channelInstance = communicationWrapper.find('CommunicationWrapper').instance();
            const spyupdateSlateTitleByID = jest.spyOn(channelInstance, 'updateSlateTitleByID')
            channelInstance.handleIncommingMessages(event);
            channelInstance.updateSlateTitleByID(currentSlate3);
            expect(channelInstance.updateSlateTitleByID).toHaveBeenCalled()
            spyupdateSlateTitleByID.mockClear()
        })
    })
    describe('Test for cases with config-key updates', () => {
        const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
        test('Test for enablePrev case', () => {
            let event = {
                data: {
                    type: "enablePrev",
                    message: ""
                }
            }
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        test('Test for enableNext case', () => {
            let event = {
                data: {
                    type: "enableNext",
                    message: ""
                }
            }
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        test('Test for disablePrev case', () => {
            let event = {
                data: {
                    type: "disablePrev",
                    message: ""
                }
            }
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        test('Test for disableNext case', () => {
            let event = {
                data: {
                    type: "disableNext",
                    message: ""
                }
            }
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        
        test('Test swappedIS case', () => {
            let event = {
                data: {
                    type: "swappedIS",
                    message: ""
                }
            }
            channelInstance.handleIncommingMessages(event);
        })
        test('Test ISDeleted case', () => {
            let event = {
                data: {
                    type: "ISDeleted",
                    message: ""
                }
            }
            channelInstance.handleIncommingMessages(event);
        })
        test('Test TocLoader case', () => {
            let event = {
                data: {
                    type: "TocLoader",
                    message: ""
                }
            }
            channelInstance.handleIncommingMessages(event);
        })
        test('Test projectDetails case', () => {
            let event = {
                data: {
                    type: "projectDetails",
                    message: {
                        'tcm':{
                            activated: true
                        },
                        'x-prsn-user-id':'c5test01',
                        'ssoToken':'ssoToken',
                        'id':'10',
                        'citeUrn':'citeUrn',
                        'entityUrn':'entityUrn',
                        'name':'vetest'
                    }
                }
            }
            channelInstance.handleIncommingMessages(event);
        })
        test('Test projectDetails case - tcm - activated - false', () => {
            let event = {
                data: {
                    type: "projectDetails",
                    message: {
                        'tcm':{
                            activated: false
                        },
                        'x-prsn-user-id':'c5test01',
                        'ssoToken':'ssoToken',
                        'id':'10',
                        'citeUrn':'citeUrn',
                        'entityUrn':'entityUrn',
                        'name':'vetest'
                    }
                }
            }
            channelInstance.handleIncommingMessages(event);
        })
    })
    test('Test for canvasBlocker case-true', () => {
        let event = {
            data: {
                type: "canvasBlocker",
                message: {
                    status: true
                }
            }
        }
        const spyshowCanvasBlocker = jest.spyOn(channelInstance, 'showCanvasBlocker')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.showCanvasBlocker).toHaveBeenCalled()
        spyshowCanvasBlocker.mockClear()
    })
    test('Test for canvasBlocker case-false', () => {
        let event = {
            data: {
                type: "canvasBlocker",
                message: {
                    status: false
                }
            }
        }
        const spyshowCanvasBlocker = jest.spyOn(channelInstance, 'showCanvasBlocker')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.showCanvasBlocker).toHaveBeenCalled()
        spyshowCanvasBlocker.mockClear()
    })
    test('Test for hideCommentsPanel case', () => {
        let event = {
            data: {
                type: "hideCommentsPanel",
                message: ""
            }
        }
        const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
        spyhandleIncommingMessages.mockClear()
    })
    test('Test for toggleCommentsPanel case', () => {
        let event = {
            data: {
                type: "toggleCommentsPanel",
                message: ""
            }
        }
        const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
        spyhandleIncommingMessages.mockClear()
    })
    test('Test for statusForSave if case', () => {
        const div = document.createElement('div');
        const loChild = document.createElement('div');
        loChild.classList.add("learning-objective");
        div.appendChild(loChild);
        document.body.appendChild(div);
        let event = {
            data: {
                type: "statusForSave",
                statusForSave: true,
                message: {
                    statusForSave: true,
                    loObj: {
                        label: {
                            en: "hello"
                        }
                    }
                }
            }
        }
        const spyhandleLOData = jest.spyOn(channelInstance, 'handleLOData')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleLOData).toHaveBeenCalled()
        spyhandleLOData.mockClear()
    })
    test('Test for statusForSave if-else case', () => {
        const div = document.createElement('div');
        const loChild = document.createElement('div');
        loChild.classList.add("learning-objective");
        div.appendChild(loChild);
        document.body.appendChild(div);
        let event = {
            data: {
                type: "statusForSave",
                statusForSave: true,
                message: {
                    statusForSave: true,
                    loObj: ''
                }
            }
        }
        props.currentSlateLOData.id = '';
        initialState.metadataReducer.currentSlateLOData.id = '';
        props.slateLevelData['urn:pearson:manifest:39dfa171-7d07-4ef6-a361-129036d0c9f4'].contents.bodymatter = [];
        const spyhandleLOData = jest.spyOn(channelInstance, 'handleLOData')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleLOData).toHaveBeenCalled()
        spyhandleLOData.mockClear()
    })
    test('Test for loEditResponse case', () => {
        let event = {
            data: {
                type: "loEditResponse",
                message: ""
            }
        }
        const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
        expect(channelInstance.state.showBlocker).toBe(false)
        spyhandleIncommingMessages.mockClear()
    })
    test('Test for getLOlistResponse case', () => {
        let event = {
            data: {
                type: "getLOlistResponse",
                message: ""
            }
        }
        const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
        spyhandleIncommingMessages.mockClear()
    })
    test('Test for getSlateLOResponse if case', () => {
        let event = {
            data: {
                type: "getSlateLOResponse",
                message: {
                    label: {
                        en: "Lo"
                    },
                    LOList: [
                        {
                            label: {
                                en: "Lo"
                            }
                        }
                    ]
                }
            }
        }
        const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
        spyhandleIncommingMessages.mockClear()
    })
    test('Test for getSlateLOResponse else case', () => {
        let event = {
            data: {
                type: "getSlateLOResponse",
                message:'' 
            }
        }
        const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
        spyhandleIncommingMessages.mockClear()
    })
    test('Test for getAssessmentLOResponse case', () => {
        let event = {
            data: {
                type: "getAssessmentLOResponse",
                message: {
                    assessmentResponseMsg: "LO in Assessment"
                }
            }
        }
        const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
        spyhandleIncommingMessages.mockClear()
    })
    test('Test for cancelCEPopup case', () => {
        let event = {
            data: {
                type: "cancelCEPopup",
                message: ""
            }
        }
        const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
        expect(channelInstance.state.showBlocker).toBe(false)
        spyhandleIncommingMessages.mockClear()
    })
    test('Test for permissionsDetails function', () => {
        let currentSlate = {
            category: "titleChange",
            container: "chapter",
            entityUrn: "urn:pearson:entity:c8240c45-ba81-4a8a-8f9e-32b68108eb4e",
            id: "urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6775cba97b29",
            parentId: "",
            parentType: "chapter",
            title: "blank",
            type: "assessment",
            permissions: []
        }
        let event = {
            data: {
                type: "permissionsDetails",
                message: currentSlate
            }
        }
        const spyhandlePermissioning = jest.spyOn(channelInstance, 'handlePermissioning')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handlePermissioning).toHaveBeenCalled()
        spyhandlePermissioning.mockClear()
    })
    test('Test for refreshSlate case', () => {
        let event = {
            data: {
                type: "refreshSlate",
                message: ""
            }
        }
        const spyhandleRefreshSlate = jest.spyOn(channelInstance, 'handleRefreshSlate')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleRefreshSlate).toHaveBeenCalled()
        spyhandleRefreshSlate.mockClear()
    })
    test('Test for refreshElementWithTable case', () => {
        let event = {
            data: {
                type: "refreshElementWithTable",
                message: ""
            }
        }
        const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
        spyhandleIncommingMessages.mockClear()
    })
    test('Test for slatePreview case', () => {
        let event = {
            data: {
                type: "slatePreview",
                message: ""
            }
        }
        const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
        spyhandleIncommingMessages.mockClear()
    })
    test('Test for projectPreview case', () => {
        let event = {
            data: {
                type: "projectPreview",
                message: ""
            }
        }
        const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
        spyhandleIncommingMessages.mockClear()
    })
    test('Test for getSlateLockStatus case', () => {
        let event = {
            data: {
                type: "getSlateLockStatus",
                message: ""
            }
        }
        const spyreleaseLockAndRedirect = jest.spyOn(channelInstance, 'releaseLockAndRedirect')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.releaseLockAndRedirect).toHaveBeenCalled()
        spyreleaseLockAndRedirect.mockClear()
    })
    test('Test for logout case', () => {
        let event = {
            data: {
                type: "logout",
                message: ""
            }
        }
        const spyreleaseLockAndLogout = jest.spyOn(channelInstance, 'releaseLockAndLogout')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.releaseLockAndLogout).toHaveBeenCalled()
        spyreleaseLockAndLogout.mockClear()
    })
    test('Test for trackChanges case', () => {
        let event = {
            data: {
                type: "trackChanges",
                message: ""
            }
        }
        const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
        spyhandleIncommingMessages.mockClear()
    });
    xtest('Test Case for onTOCHamburgerClick',()=>{
        document.querySelector = () => {
            return {
                querySelector: () => {
                    return {}
                }
            }
        }
        document.querySelector = () => {
            return {
                classList: {
                    remove: jest.fn(),
                    add: jest.fn()
                }
            }
        }
        let event = {
            data: {
                type: "onTOCHamburgerClick",
                message: ""
            }
        }
        const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
        spyhandleIncommingMessages.mockClear()

    })
    describe('Test for fetchAllSlateDataFromWrapper case', () => {
        let message={"parentData":{"frontmatter":[],"bodymatter":[{"entityUrn":"urn:pearson:entity:b8962feb-1bec-4f6e-8d6c-0fc6562f4c24","type":"container","label":"chapter","containerUrn":"urn:pearson:manifest:165ae24d-76e5-42a2-aacb-9997d38c8509"}],"backmatter":[]},"childrenData":{"urn:pearson:entity:b8962feb-1bec-4f6e-8d6c-0fc6562f4c24":{"frontmatter":[{"entityUrn":"urn:pearson:entity:de6c139b-f785-43ec-abba-aa26808f8e42","type":"container","label":"container-introduction","containerUrn":"urn:pearson:manifest:537f0f47-72da-4c6f-a3ba-cc7d7572e8fe"}],"bodymatter":[{"entityUrn":"urn:pearson:entity:fb1a227b-f858-4435-861c-045625c2bf56","type":"container","label":"section","containerUrn":"urn:pearson:manifest:a12fecaa-eeb5-48bd-9b58-4d4ce575774f"}],"backmatter":[]}}}
        it('fetchAllSlateDataFromWrapper',()=>{
            let event = {
                data: {
                    type: "fetchAllSlateDataFromWrapper",
                    message: message
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
    });
    test('Test for pageNumber  case', () => {
        let event = {
            data: {
                type: "pageNumber"
            }
        }
        const spysendingPermissions = jest.spyOn(channelInstance, 'handleIncommingMessages')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
        spysendingPermissions.mockClear()
    });
    
    xtest('Test for parentChanging  case', () => {
        let event = {
            data: {
                type: "parentChanging",
                message:''
            }
        }
        const spysendingPermissions = jest.spyOn(channelInstance, 'handleIncommingMessages')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
        spysendingPermissions.mockClear()
    });
    test('Test for elementBorder  case', () => {
        let event = {
            data: {
                type: "elementBorder",
            }
        }
        const spysendingPermissions = jest.spyOn(channelInstance, 'handleIncommingMessages')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
        spysendingPermissions.mockClear()
    });
    test('Test for GetActiveSlate  case', () => {
        let event = {
            data: {
                type: "GetActiveSlate",
            }
        }
        const spysendingPermissions = jest.spyOn(channelInstance, 'handleIncommingMessages')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
        spysendingPermissions.mockClear()
    });
    
    test('Test for customDimensions  case', () => {
        let event = {
            data: {
                type: "customDimensions"
            }
        }
        window={
            dataLayer:{
                push:jest.fn()
            }
        }
        const spysendingPermissions = jest.spyOn(channelInstance, 'handleIncommingMessages')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
        spysendingPermissions.mockClear()
    });
    test('Test for pageLink  if case', () => {
        let event = {
            data: {
                type: "pageLink",
                message:{
                    link:'unlink'
                }
            }
        }
        const spysendingPermissions = jest.spyOn(channelInstance, 'handleIncommingMessages')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
        spysendingPermissions.mockClear()
    });
    xtest('Test for pageLink  else case', () => {
        let event = {
            data: {
                type: "pageLink",
                message:{
                    elementId: "urn:pearson:work:03ffc392-c42b-49cc-b1d5-e62f958bc062",
                    link: "link",
                    linkId: "page-link-2-3189",
                    pageId: "urn:pearson:entity:f401a9a2-5dd6-43a3-83f9-542f0265bf40",
                    pageName: "Untitled"
                }
            }
        }
        let elementContainer =document.querySelector = () => {
            return {
                classList: {
                    remove: jest.fn(),
                    add: jest.fn()
                }
            }
        }
        elementContainer.querySelectorAll =()=>{
            return {

            }
        }
        const spysendingPermissions = jest.spyOn(channelInstance, 'handleIncommingMessages')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
        spysendingPermissions.mockClear()
    });
    xtest('Test for pageLink  else case updatePageLink', () => {
        let event = {
            data: {
                type: "pageLink",
                message:{
                    elementId: "urn:pearson:work:03ffc392-c42b-49cc-b1d5-e62f958bc062",
                    link: "unlinkToc",
                    linkId: "page-link-2-3189",
                    pageId: "urn:pearson:entity:f401a9a2-5dd6-43a3-83f9-542f0265bf40",
                    pageName: "Untitled"
                }
            }
        }
        const spysendingPermissions = jest.spyOn(channelInstance, 'handleIncommingMessages')
        channelInstance.handleIncommingMessages(event)
        expect(channelInstance.handleIncommingMessages).toHaveBeenCalled();
        spysendingPermissions.mockClear();
    });
    describe('Test Other Functions', () => {
        test('Test for redirectDashboard  function', () => {
            const spyredirectDashboard = jest.spyOn(channelInstance, 'redirectDashboard')
            channelInstance.redirectDashboard();
            expect(channelInstance.redirectDashboard).toHaveBeenCalled()
            spyredirectDashboard.mockClear()
        })
        test('Test for slateLockAlert  function', () => {
            let userInfo = {
                userName: 'c5test01',
                userId: 'c5test01',
                userEmail: 'c5test01@mctest.local',
                assignee: 'c5test01'
            }
            const spyslateLockAlert = jest.spyOn(channelInstance, 'slateLockAlert')
            channelInstance.slateLockAlert(userInfo);
            expect(channelInstance.slateLockAlert).toHaveBeenCalled()
            spyslateLockAlert.mockClear()
        })
        test('Test for deleteTocItemWithPendingTrack  function', () => {
            let message = {
                parentUrnReceived: "urn:pearson:entity:46cc9f47-5039-4fe0-93c4-1ab799a7230f",
                changedValue: {
                    HasBackMatter: false,
                    HasIntroductorySlate: false,
                    ParentContainerUrn: "urn:pearson:manifest:c13a1e15-7733-4931-b683-3d7c1de8c74f",
                    ParentEntityUrn: "urn:pearson:entity:46cc9f47-5039-4fe0-93c4-1ab799a7230f",
                    containerUrn: "urn:pearson:manifest:26709b4c-4e2b-4ca0-8da4-d00d8341f14c",
                    entityUrn: "urn:pearson:entity:f969b50b-465a-48a7-9170-0e6f27f171a7",
                    isActive: true,
                    nodeLabel: "container-introduction",
                    nodeParentLabel: "part",
                    projectUrn: "urn:pearson:distributable:680aac6d-a035-475e-9f78-7ec42599b17f",
                    type: "container-introduction"
                }
            }
            const spydeleteTocItem = jest.spyOn(channelInstance, 'deleteTocItemWithPendingTrack')
            channelInstance.deleteTocItemWithPendingTrack(message);
            expect(channelInstance.deleteTocItemWithPendingTrack).toHaveBeenCalled()
            spydeleteTocItem.mockClear()
        })
        test('Test for prohibitPropagation  function', () => {
            let event = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn()
            }
            const spyprohibitPropagation = jest.spyOn(channelInstance, 'prohibitPropagation')
            channelInstance.prohibitPropagation(event);
            expect(channelInstance.prohibitPropagation).toHaveBeenCalled()
            spyprohibitPropagation.mockClear()
        })
        test('Test for toggleLockPopup  function', () => {
            let event = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn()
            }
            const spytoggleLockPopup = jest.spyOn(channelInstance, 'toggleLockPopup')
            channelInstance.toggleLockPopup(true, event);
            expect(channelInstance.toggleLockPopup).toHaveBeenCalled()
            expect(channelInstance.state.showLockPopup).toBe(true)
            expect(channelInstance.state.showBlocker).toBe(true)
            spytoggleLockPopup.mockClear()
        })
        describe('Test for pageLink linking case', () => {
            let attr1 = document.createAttribute('class');
            let dataID = document.createAttribute('data-id');
            let elementId = document.createAttribute('id');
            const elementContainer = document.createElement('div');
                attr1.value = "element-container";
                elementContainer.setAttributeNode(attr1);
                dataID.value = "urn:pearson:work:22e2dd42-8fac-481c-8832-ad5d542b985b";
                elementContainer.setAttributeNode(dataID);

            let attr2 = document.createAttribute('class');
            const cypressEditor = document.createElement('div');
                attr2.value = "cypress-editable";
                cypressEditor.setAttributeNode(attr2);

            const pageLinkNode = document.createElement('div');
                elementId.value= "page-link-0";
                pageLinkNode.setAttributeNode(elementId);
                pageLinkNode.innerText = "Link";

                cypressEditor.appendChild(pageLinkNode);
                elementContainer.appendChild(cypressEditor);
                document.body.appendChild(elementContainer);

            const element = document.createElement('div');
                element.id = "link-notification";
                document.body.appendChild(element);
                
            test("Slate Link - Link Case - ", () => {
                let event = {
                    data: {
                        type: "pageLink",
                        message: {
                            "link": 'link',
                            "elementId": "urn:pearson:work:22e2dd42-8fac-481c-8832-ad5d542b985b",
                            "linkId" : "page-link-0",
                            "pageId": "urn:pearson:entity:ad5f515f-0bd5-4260-a209-2d8b979a1a31",
                            "pageName": 'Title'
                        }
                    }
                }
                const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
                channelInstance.handleIncommingMessages(event);
                expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()                
                spyhandleIncommingMessages.mockClear()
            });
            test("Slate Link - Unlink Case - ", () => {
                let event = {
                    data: {
                        type: "pageLink",
                        message: {
                            "link": 'unlink',
                            "elementId": "urn:pearson:work:22e2dd42-8fac-481c-8832-ad5d542b985b",
                            "linkId" : "page-link-0",
                            "pageId": "urn:pearson:entity:ad5f515f-0bd5-4260-a209-2d8b979a1a31",
                            "pageName": 'Title'
                        }
                    }
                }
                const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
                channelInstance.handleIncommingMessages(event);
                expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
                spyhandleIncommingMessages.mockClear()
            });
            test("Test changeSlateLength function ", () => {
                const message = "25"
                const spychangeSlateLength = jest.spyOn(channelInstance, 'changeSlateLength')
                channelInstance.changeSlateLength(message);
                expect(channelInstance.changeSlateLength).toHaveBeenCalled()
                spychangeSlateLength.mockClear()
            })
            test('Test for slateLengthChanged case', () => {
                let event = {
                    data: {
                        type: "slateLengthChanged",
                        message: "25"
                    }
                }
                const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
                channelInstance.handleIncommingMessages(event);
                expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
                spyhandleIncommingMessages.mockClear()
            })
            it('Test for elementBorder case', () => {
                let event = {
                    data: {
                        type: "elementBorder"
                    }
                }
                const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
                channelInstance.handleIncommingMessages(event);
                expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
                spyhandleIncommingMessages.mockClear()
            })
            it('Test for elementBorder case', () => {
                let event = {
                    data: {
                        type: "pageNumber"
                    }
                }
                const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
                channelInstance.handleIncommingMessages(event);
                expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
                spyhandleIncommingMessages.mockClear()
            })
        })
        it('Test for GetActiveSlate case', () => {
            let event = {
                data: {
                    type: "GetActiveSlate",
                    message: ""
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        it('Test for openInlineAlsfrescoPopup case', () => {
            let event = {
                data: {
                    type: "openInlineAlsfrescoPopup",
                    message: ""
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        it('Test for saveAlfrescoDataToConfig case', () => {
            let event = {
                data: {
                    type: "saveAlfrescoDataToConfig",
                    message: ""
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        it('Test for customDimensions case - else block', () => {
            let event = {
                data: {
                    type: "customDimensions",
                    message: ""
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        it('Test for customDimensions case - if block', () => {
            window.dataLayer = [];
            let event = {
                data: {
                    type: "customDimensions",
                    message: ""
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        it('Test for selectedAlfrescoAssetData case - isEditor - if block', () => {
            let event = {
                data: {
                    type: "selectedAlfrescoAssetData",
                    message: {
                        isEditor: true
                    }
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        it('Test for selectedAlfrescoAssetData case - NarrativeAudio - if block', () => {
            let event = {
                data: {
                    type: "selectedAlfrescoAssetData",
                    message: {
                        calledFrom: "NarrativeAudio",
                        asset: {
                            content: {
                                mimeType: "audio"
                            },
                            properties: {
                                "cm:description": "audio"
                            }
                        }
                    }
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        it('Test for selectedAlfrescoAssetData case - NarrativeAudio - handleAudioData - else block', () => {
            let event = {
                data: {
                    type: "selectedAlfrescoAssetData",
                    message: {
                        calledFrom: "NarrativeAudio",
                        asset: {
                            content: {
                                mimeType: ""
                            },
                            properties: {
                                "cm:description": ""
                            }
                        }
                    }
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        it('Test for selectedAlfrescoAssetData case - GlossaryImage - if block', () => {
            let event = {
                data: {
                    type: "selectedAlfrescoAssetData",
                    message: {
                        calledFrom: "GlossaryImage",
                        asset: {
                            content: {
                                mimeType: "image"
                            },
                            properties: {}
                        }
                    }
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        it('Test for selectedAlfrescoAssetData case - GlossaryImage - handleImageData - else block', () => {
            let event = {
                data: {
                    type: "selectedAlfrescoAssetData",
                    message: {
                        calledFrom: "GlossaryImage",
                        asset: {
                            content: {
                                mimeType: ""
                            },
                            properties: {}
                        }
                    }
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        it('Test for ToggleElmSPA case - handleElmPickerTransactions - ElmCreateInPlace case', () => {
            let event = {
                data: {
                    type: "ToggleElmSPA",
                    message: {
                        dataToSend: {
                            type: "ElmCreateInPlace"
                        }
                    }
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        it('Test for ToggleElmSPA case - handleElmPickerTransactions - CloseElmPicker case', () => {
            let event = {
                data: {
                    type: "ToggleElmSPA",
                    message: {
                        dataToSend: {
                            type: "CloseElmPicker"
                        }
                    }
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        it('Test for ToggleElmSPA case - handleElmPickerTransactions - else block', () => {
            let event = {
                data: {
                    type: "ToggleElmSPA",
                    message: {}
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        it('Test for onTOCHamburgerClick case - else block', () => {
            let event = {
                data: {
                    type: "onTOCHamburgerClick",
                    message: ""
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        it('Test for onTOCHamburgerClick case - if block', () => {
            const listDropWrapper = document.createElement('div');
            listDropWrapper.id = 'listDropWrapper';
            const listDropWrapperChildElement = document.createElement('div');
            listDropWrapperChildElement.className = "fr-popup";
            listDropWrapper.appendChild(listDropWrapperChildElement);
            document.body.appendChild(listDropWrapper);
            let event = {
                data: {
                    type: "onTOCHamburgerClick",
                    message: ""
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        it('Test for statusForExtLOSave case - handleExtLOData - if blocks', () => {
            const event = {
                data: {
                    type: "statusForExtLOSave",
                    message: {
                        statusForExtLOSave: true,
                        loLinked: [{
                            label: {
                                en: 'en'
                            }
                        }]
                    }
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        it('Test for statusForExtLOSave case - handleExtLOData - else blocks', () => {
            const event = {
                data: {
                    type: "statusForExtLOSave",
                    message: {
                        statusForExtLOSave: true,
                        loLinked: [],
                        loUnlinked: ['1']
                    }
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        it('Test for parentChanging case - with message', () => {
            const event = {
                data: {
                    type: "parentChanging",
                    message: {}
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        it('Test for parentChanging case - without message', () => {
            const event = {
                data: {
                    type: "parentChanging"
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        it('Test for currentSlateLOAfterWarningPopup case - handleLOAfterWarningPopup method - externalLF if block', () => {
            const event = {
                data: {
                    type: "currentSlateLOAfterWarningPopup",
                    message: {
                        unlinkStatus: true,
                        currentSlateLF: "externalLF",
                        statusForExtLOSave: true,
                        loLinked: [{
                            label: {
                                en: 'en'
                            }
                        }]
                    }
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        it('Test for currentSlateLOAfterWarningPopup case - handleLOAfterWarningPopup method - cypressLF if block', () => {
            const event = {
                data: {
                    type: "currentSlateLOAfterWarningPopup",
                    message: {
                        unlinkStatus: true,
                        currentSlateLF: "cypressLF",
                        statusForSave: true,
                        loLinked: [{
                            label: {
                                en: 'en'
                            }
                        }],
                        unlinkedLOs: ['1'],
                        loObj: {
                            id: '1',
                            loUrn: '1'
                        }
                    }
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        it('Test for currentSlateLOAfterWarningPopup case - handleLOAfterWarningPopup method - cypressLF if block - without loObj', () => {
            const event = {
                data: {
                    type: "currentSlateLOAfterWarningPopup",
                    message: {
                        unlinkStatus: true,
                        currentSlateLF: "cypressLF",
                        statusForSave: true,
                        loLinked: [{
                            label: {
                                en: 'en'
                            }
                        }],
                        unlinkedLOs: ['1']
                    }
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        it('Test for currentSlateLOAfterWarningPopup case - handleLOAfterWarningPopup method - else block', () => {
            const event = {
                data: {
                    type: "currentSlateLOAfterWarningPopup",
                    message: {
                        unlinkStatus: true,
                        unlinkedLOs: []
                    }
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        it('Test for unlinkLOFailForWarningPopup case - handleUnlinkedLOData method - unlinkStatus true', () => {
            const event = {
                data: {
                    type: "unlinkLOFailForWarningPopup",
                    message: {
                        unlinkedLOs: ['1'],
                        unlinkStatus: true,
                        currentSlateLF: ""
                    }
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        it('Test for unlinkLOFailForWarningPopup case - handleUnlinkedLOData method - unlinkStatus false', () => {
            const event = {
                data: {
                    type: "unlinkLOFailForWarningPopup",
                    message: {
                        unlinkedLOs: ['1'],
                        unlinkStatus: false,
                        currentSlateLF: ""
                    }
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        it('Test for projectPreview case - savingInProgress true', () => {
            config.savingInProgress = true;
            const event = {
                data: {
                    type: "projectPreview",
                    message: ""
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        it('Test for getSlateLockStatus case - savingInProgress true', () => {
            config.savingInProgress = true;
            const event = {
                data: {
                    type: "getSlateLockStatus",
                    message: ""
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            spyhandleIncommingMessages.mockClear()
        })
        test('Test for cancelCEPopup case - slateTagEnabled block', () => {
            let event = {
                data: {
                    type: "cancelCEPopup",
                    message: {
                        slateTagEnabled: ''
                    }
                }
            }
            const spyhandleIncommingMessages = jest.spyOn(channelInstance, 'handleIncommingMessages')
            channelInstance.handleIncommingMessages(event);
            expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
            expect(channelInstance.state.showBlocker).toBe(false)
            spyhandleIncommingMessages.mockClear()
        })
    })
    test('Test for pageLink  if case - updatePageLink - if case', () => {
        let event = {
            data: {
                type: "pageLink",
                message:{
                    link:'link',
                    elementId: '',
                    pageId: '',
                    pageName: '',
                    linkId: ''
                }
            }
        }
        jest.spyOn(document, 'querySelector').mockImplementation(() => {
            return {
                querySelectorAll: jest.fn(() => [])
            }
        });
        const spysendingPermissions = jest.spyOn(channelInstance, 'handleIncommingMessages')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
        spysendingPermissions.mockClear()
    });
    test('Test for pageLink  if case - updatePageLink - else if case - cancel', () => {
        let event = {
            data: {
                type: "pageLink",
                message:{
                    link:'cancel',
                    elementId: '',
                    linkId: ''
                }
            }
        }
        jest.spyOn(document, 'querySelector').mockImplementation(() => {
            return {
                querySelectorAll: jest.fn(() => [])
            }
        });
        const spysendingPermissions = jest.spyOn(channelInstance, 'handleIncommingMessages')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
        spysendingPermissions.mockClear()
    });
    test('Test for pageLink  if case - updatePageLink - else if case - unlink', () => {
        let event = {
            data: {
                type: "pageLink",
                message:{
                    link:'unlink',
                    elementId: '',
                    linkId: ''
                }
            }
        }
        jest.spyOn(document, 'querySelector').mockImplementation(() => {
            return {
                querySelectorAll: jest.fn(() => [])
            }
        });
        const spysendingPermissions = jest.spyOn(channelInstance, 'handleIncommingMessages')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
        spysendingPermissions.mockClear()
    });
    test('Test for pageLink  if case - updatePageLink - else if case - unlinkToc', () => {
        let event = {
            data: {
                type: "pageLink",
                message:{
                    link:'unlinkToc',
                    elementId: '',
                    linkId: ''
                }
            }
        }
        jest.spyOn(document, 'querySelector').mockImplementation(() => {
            return {
                querySelectorAll: jest.fn(() => [])
            }
        });
        const spysendingPermissions = jest.spyOn(channelInstance, 'handleIncommingMessages')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleIncommingMessages).toHaveBeenCalled()
        spysendingPermissions.mockClear()
    });
    test('Test for refreshSlate case - with tempSlateManifestURN and tempSlateEntityURN', () => {
        config.tempSlateManifestURN = "urn:pearson:manifest:39dfa171-7d07-4ef6-a361-129036d0c9f6"
        config.tempSlateEntityURN = "urn:pearson:entity:39dfa171-7d07-4ef6-a361-129036d0c9f7"
        let event = {
            data: {
                type: "refreshSlate",
                message: ""
            }
        }
        const spyhandleRefreshSlate = jest.spyOn(channelInstance, 'handleRefreshSlate')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleRefreshSlate).toHaveBeenCalled()
        spyhandleRefreshSlate.mockClear()
    })
    const initialState2 = {
        ...initialState,
        appStore: {
            ...initialState.appStore,
            permissions: [
                'toc_edit_title',
                'toc_delete_entry',
                'toc_rearrange_entry',
                'toc_add_pages'
            ]
        }
    }
    let store2 = mockStore(initialState2);
    let wrapper2 = mount(<Provider store={store2}><CanvasWrapper {...props} /></Provider>)
    let channelInstance2 = wrapper2.find('CommunicationWrapper').instance();
    test('Test for getPermissions case - permissions present', () => {
        let event = {
            data: {
                type: "getPermissions",
                message: ""
            }
        }
        const spysendingPermissions = jest.spyOn(channelInstance2, 'sendingPermissions')
        channelInstance2.handleIncommingMessages(event);
        expect(channelInstance2.sendingPermissions).toHaveBeenCalled()
        spysendingPermissions.mockClear()
    })
    test('Test for statusForSave - ', () => {
        config.slateManifestURN = 'urn:pearson:manifest:39dfa171-7d07-4ef6-a361-129036d0c9f4';
        config.slateType = 'assessment';
        let event = {
            data: {
                type: "statusForSave",
                statusForSave: true,
                message: {
                    statusForSave: true,
                    loObj: {
                        label: {
                            en: "hello"
                        }
                    }
                }
            }
        }
        const spyhandleLOData = jest.spyOn(channelInstance, 'handleLOData')
        channelInstance.handleIncommingMessages(event);
        expect(channelInstance.handleLOData).toHaveBeenCalled()
        spyhandleLOData.mockClear()
    })
})