import React from 'react';
import ReactDOM from 'react-dom';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import CanvasWrapper from '../../../src/component/CanvasWrapper';
import { SET_SLATE_LOCK_STATUS, SET_LOCK_FLAG } from '../../../src/constants/Action_Constants';
import {storeWithFigure} from "../../../fixtures/slateTestingData"
jest.mock('../../../src/auth/openam.js', () => {
    return function () {
        this.isUserAuthenticated = function () { }
        this.handleSessionExpire = function () { }
        this.logout = function () { }
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
        }
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


import {
    listMockData,
    GlossaryMockState,
    SlateLockMockState,
    AssetPopOverMockState
} from '../../../fixtures/slateTestingData.js';
import { exportAllDeclaration } from '@babel/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {
    appStore: {
        slateLevelData: listMockData,
        permissions: []
    },
    glossaryFootnoteReducer: {
        glossaryFootnoteValue: GlossaryMockState
    },
    slateLockReducer: SlateLockMockState,
    assetPopOverSearch: AssetPopOverMockState
};

describe('Testing <CanvasWrapper> Component', () => {
    let store = mockStore(initialState);
    let props = {}
    let wrapper = mount(<Provider store={store}>
        <CanvasWrapper {...props} />
    </Provider>)

    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}>
            <CanvasWrapper {...props} />
        </Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
    })
    test('should show LockReleasePopup', () => {
        let canvasWrapperInstance = wrapper.find('CanvasWrapper').instance();
        const event = {
            stopPropagation() { },
            preventDefault() { }
        }
        canvasWrapperInstance.toggleLockReleasePopup(true, event)
        canvasWrapperInstance.forceUpdate();
        wrapper.update();
        canvasWrapperInstance.setSlateLock()
        expect(canvasWrapperInstance.state.showReleasePopup).toBe(true);
        expect(wrapper.find('CanvasWrapper').find('PopUp').length).toBe(1);
    })
    describe('With slate locked', () => {
        let store = mockStore({
            ...initialState, slateLockReducer: {
                slateLockInfo: {
                    isLocked: true,
                    timestamp: "",
                    userId: "c5Test01"
                },
                withinLockPeriod: true
            }
        });
        let wrapper = mount(<Provider store={store}>
            <CanvasWrapper {...props} />
        </Provider>)
        let canvasWrapperInstance = wrapper.find('CanvasWrapper').instance();
        test('should call setSlateLock', () => {
            let cb = jest.fn();
            canvasWrapperInstance.debounceReleaseHandler(cb, canvasWrapperInstance)
            expect(canvasWrapperInstance.state.showReleasePopup).toBe(true);
        })
        test('should call updateTimer without crashing', () => {
            canvasWrapperInstance.updateTimer()
            canvasWrapperInstance.timeSince()
        })
        test('should call handleCommentspanel without crashing', () => {
            canvasWrapperInstance.handleCommentspanel()
        })
    })
    describe('Testing communication channel', () => {
        let channelInstance = wrapper.find('CommunicationWrapper').instance();
        test('Test switch cases for handleIncommingMessages function', () => {
            let case1 = {
                data: {
                    type: "getPermissions",
                    message: ""
                }
            }
            let case2 = {
                data: {
                    type: "selectedSlate",
                    message: ""
                }
            }
            let case3 = {
                data: {
                    type: "deleteTocItem",
                    message: ""
                }
            }
            let case4 = {
                data: {
                    type: "deleteTocItemWithPendingTrack",
                    message: ""
                }
            }
            let case5 = {
                data: {
                    type: "showSingleContainerDelete",
                    message: ""
                }
            }
            let case8 = {
                data: {
                    type: "canvasBlocker",
                    message: {
                        status: true
                    }
                }
            }
            let case9 = {
                data: {
                    type: "hideCommentsPanel",
                    message: ""
                }
            }
            let case10 = {
                data: {
                    type: "projectDetails",
                    message: ""
                }
            }
            let case11 = {
                data: {
                    type: "permissionsDetails",
                    message: ""
                }
            }
            let case12 = {
                data: {
                    type: "statusForSave",
                    message: ""
                }
            }
            let case13 = {
                data: {
                    type: "refreshSlate",
                    message: ""
                }
            }
            let case17 = {
                data: {
                    type: "updateSlateTitleByID",
                    message: ""
                }
            }
            let case18 = {
                data: {
                    type: "canvasBlocker",
                    message: ""
                }
            }
            channelInstance.handleIncommingMessages(case1);
            channelInstance.handleIncommingMessages(case2);
            channelInstance.handleIncommingMessages(case3);
            channelInstance.handleIncommingMessages(case4);
            channelInstance.handleIncommingMessages(case5);
            channelInstance.handleIncommingMessages(case8);
            channelInstance.handleIncommingMessages(case9);
            channelInstance.handleIncommingMessages(case10);
            channelInstance.handleIncommingMessages(case11);
            channelInstance.handleIncommingMessages(case12);
            channelInstance.handleIncommingMessages(case13);
            channelInstance.handleIncommingMessages(case17);
            channelInstance.handleIncommingMessages(case18);
            channelInstance.showCanvasBlocker(true);
        })
        test('Test for setUpdatedSlateTitle function', () => {
            let channelInstance = wrapper.find('CommunicationWrapper').instance();
            let stateValues = {
                project_urn: '',
                isTableLaunched: false,
                showBlocker: true,
                toggleTocDelete: false,
                tocDeleteMessage: null
            }
            let currentSlate = {
                category: "titleChange",
                container: "chapter",
                entityUrn: "urn:pearson:entity:c8240c45-ba81-4a8a-8f9e-32b68108eb4e",
                id: "urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6775cba97b29",
                parentId: "",
                parentType: "chapter",
                title: "blank",
                type: "assessment",
            }

            let case6 = {
                data: {
                    type: "titleChanging",
                    message: currentSlate
                }
            }
            channelInstance.handleIncommingMessages(case6);
        })
        test('Test for handleLOData function', () => {
            let channelInstance = wrapper.find('CommunicationWrapper').instance();
            const div = document.createElement('div');
            const loChild = document.createElement('div');
            loChild.classList.add("learning-objective");
            div.appendChild(loChild);
            document.body.appendChild(div);
            let stateValues = {
                project_urn: '',
                isTableLaunched: false,
                showBlocker: true,
                toggleTocDelete: false,
                tocDeleteMessage: null
            }
            let case12 = {
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
            channelInstance.handleLOData(case12.data.message);
        })
        test('Test for handleLOData function unlink', () => {
            let channelInstance = wrapper.find('CommunicationWrapper').instance();
            const div = document.createElement('div');
            const loChild = document.createElement('div');
            loChild.classList.add("learning-objective");
            div.appendChild(loChild);
            document.body.appendChild(div);
            let stateValues = {
                project_urn: '',
                isTableLaunched: false,
                showBlocker: true,
                toggleTocDelete: false,
                tocDeleteMessage: null
            }
            let case12 = {
                data: {
                    type: "statusForSave",
                    statusForSave: true,
                    message: {
                        statusForSave: true,
                        toastData: "Learning Objectives has been unlinked ",
                        loObj: {
                            label: {
                                en: "hello"
                            }
                        }
                    }
                }
            }
            channelInstance.handleLOData(case12.data.message);
        })
        test('Test for modifyState function', () => {
            channelInstance.modifyState(true);
            channelInstance.forceUpdate();
        })
        test('Test for updateSlateTitleByID function', () => {
            let channelInstance = wrapper.find('CommunicationWrapper').instance();
            let currentSlate1 = {
                category: "titleChange",
                container: "chapter",
                entityUrn: "urn:pearson:entity:c8240c45-ba81-4a8a-8f9e-32b68108eb4e",
                id: "urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6775cba97b29",
                parentId: "",
                parentType: "chapter",
                title: "blank",
                type: "assessment",
                slateType: "section"
            }
            channelInstance.updateSlateTitleByID(currentSlate1);
            channelInstance.updateTitleSlate(currentSlate1);
        })
        test('Test for updateSlateTitleByID and fetchOpenerData functions', () => {

            let props = {
                slateLevelData: {
                    'urn:pearson:manifest:e652706d-b04b-4111-a083-557ae121ag0i': {}
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
                introObject: {
                    isCO: false,
                    introSlate: "urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6775cba97b29"
                }
            };
            let communicationWrapper = mount(<Provider store={store}>
                <CanvasWrapper {...props} />
            </Provider>)
            let channelInstance = communicationWrapper.find('CommunicationWrapper').instance();
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
            channelInstance.updateSlateTitleByID(currentSlate2);
            channelInstance.updateTitleSlate(currentSlate2);
        })
        test('Test for updateSlateTitleByID and updateTitleSlate functions', () => {

            let props = {
                slateLevelData: {
                    'urn:pearson:manifest:e652706d-b04b-4111-a083-557ae121ag0i': {}
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
                introObject: {
                    isCO: false,
                    introSlate: "urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6775cba97b29"
                }
            };
            let communicationWrapper = mount(<Provider store={store}>
                <CanvasWrapper {...props} />
            </Provider>)
            let channelInstance = communicationWrapper.find('CommunicationWrapper').instance();
            let currentSlate2 = {
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
            channelInstance.updateSlateTitleByID(currentSlate2);
        })
        test('Test for handlePermissioning function', () => {
            let channelInstance = wrapper.find('CommunicationWrapper').instance();
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
            let case11 = {
                data: {
                    type: "permissionsDetails",
                    message: currentSlate
                }
            }
            channelInstance.handleIncommingMessages(case11);
        })
        test('Test for setCurrentSlate function', () => {
            let channelInstance = wrapper.find('CommunicationWrapper').instance();
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
                    nodeLabel: "section",
                    nodeParentLabel: "chapter",
                    parentBodyMatterLengthFlag: false,
                    parentEntityUrn: "urn:pearson:entity:b4fab541-891a-4766-ac65-6dc58b68b0b3",
                    type: "container"
                },
                disableNext: false,
                disablePrev: false,
            }
            let case6 = {
                data: {
                    type: "titleChanging",
                    message: currentSlate
                }
            }
            channelInstance.handleIncommingMessages(case6);
        })
    })
})