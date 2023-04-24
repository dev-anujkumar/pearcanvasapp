import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { Provider } from 'react-redux';
import CanvasWrapper from '../../../src/component/CanvasWrapper';
import config from '../../../src/config/config';
jest.mock('../../../src/auth/openam.js', () => {
    return function () {
        this.isUserAuthenticated = function () { }
        this.handleSessionExpire = function () { }
        this.logout = function () { }
    }
})
jest.mock('axios');
let resp = {status :200 ,data :true};
axios.get.mockImplementation(() => Promise.resolve(resp));
config.isPopupSlate = true
config.slateManifestURN = "urn:pearson:manifest:e652706d-b04b-4111-a083-557ae121ag0i"
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
jest.mock('../../../src/constants/utility.js', () => {
    return {
        sendDataToIframe: () => {},
        hasReviewerRole: () => {
            return true;
        },
        isSubscriberRole:()=>{
            return true;
        },
        handleTinymceEditorPlugins: jest.fn(()=> 'lists advlist placeholder charmap paste image casechange' )
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
jest.setTimeout(2000);
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
});
import {
    listMockData,
    GlossaryMockState,
    SlateLockMockState,
    AssetPopOverMockState
} from '../../../fixtures/slateTestingData.js';
import { mount, shallow } from 'enzyme';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {
    appStore: {
        slateLevelData: listMockData,
        permissions: []
    },
    glossaryFootnoteReducer: {
        glossaryFootnoteValue: {
            "type": "Glossary",
            "popUpStatus": true
        }
    },
    audioReducer : {
        openRemovePopUp : false,
        openSplitPopUp : false
    },
    slateLockReducer: SlateLockMockState,
    assetPopOverSearch: AssetPopOverMockState,
    metadataReducer : {
        currentSlateLOData: {
            id: 1,
            loUrn: "123"
        }
    },
    toolbarReducer:{
        pageNumberToggle:false
    },
    alfrescoReducer: {
        editor:{}
    },
    projectInfo:{
        projectSubscriptionDetails: {
            projectSharingRole: "SUBSCRIBER",
            isOwnersSubscribedSlateChecked: false,
            projectSubscriptionDetails: {
                isSubscribed: true
            }
        },
    },
    markedIndexReducer:{
        markedIndexValue: {
            "type": "Markedindex",
            "popUpStatus": false
        },
        markedIndexGlossary:  {popUpStatus: true,  indexEntries: {}, markedIndexEntryURN: '' },
    }
};

const initialState1 = {
    appStore: {
        slateLevelData: listMockData,
        permissions: []
    },
    glossaryFootnoteReducer: {
        glossaryFootnoteValue: GlossaryMockState
    },
    audioReducer : {
        openRemovePopUp : false,
        openSplitPopUp : false
    },
    slateLockReducer: SlateLockMockState,
    assetPopOverSearch: AssetPopOverMockState,
    metadataReducer : {
        currentSlateLOData: {
            id: 1,
            loUrn: "123"
        }
    },
    toolbarReducer:{
        pageNumberToggle:false
    },
    alfrescoReducer: {
        editor:{}
    },
    projectInfo:{
        projectSubscriptionDetails: {
            projectSharingRole: "SUBSCRIBER",
            isOwnersSubscribedSlateChecked: false,
            projectSubscriptionDetails: {
                isSubscribed: true
            }
        },
    },
    markedIndexReducer:{
        markedIndexValue: {
            "type": "Markedindex",
            "popUpStatus": false
        },
        markedIndexGlossary:  {popUpStatus: false,  indexEntries: {}, markedIndexEntryURN: '' },
    }
};

describe('Testing <CanvasWrapper> Component', () => {
    let store = mockStore(initialState);
    let props = {
        ErrorPopup : {
            show: ()=> {return true}
        },
        projectSubscriptionDetails:{
            projectSubscriptionDetails:{
                isSubscribed:true
            }
        }
    }
    let wrapper = mount(<Suspense fallback={<div>Loading...</div>}><Provider store={store}>
        <CanvasWrapper {...props} />
    </Provider></Suspense>)

    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}>
            <CanvasWrapper {...props} />
        </Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
        expect(wrapper.find('CanvasWrapper').state.toggleApo).toEqual(undefined);
    })
    test('should show LockReleasePopup', () => {
        let canvasWrapperInstance = wrapper.find('CanvasWrapper').instance();
        const event = {
            stopPropagation:()=> { },
            preventDefault:()=> { }
        }
        canvasWrapperInstance.forceUpdate();
        wrapper.update();
        expect(canvasWrapperInstance.state.showReleasePopup).toBe(false);
        expect(wrapper.find('CanvasWrapper').find('PopUp').length).toBe(0);
    })
    describe('With slate locked', () => {
        let store = mockStore({
            ...initialState1, slateLockReducer: {
                slateLockInfo: {
                    isLocked: true,
                    timestamp: "",
                    userId: "c5Test01"
                },
                withinLockPeriod: true
            }
        });
        let props = {toggleCommentsPanel:() => jest.fn()}
        let wrapper = mount(<Suspense fallback={<div>Loading...</div>}><Provider store={store}>
        <CanvasWrapper {...props} />
    </Provider></Suspense>)
        let canvasWrapperInstance = wrapper.find('CanvasWrapper').instance();
        test('should call loadMorePages ', () => {
            let cb = jest.fn();
            canvasWrapperInstance.loadMorePages();
            expect(canvasWrapperInstance.state.showReleasePopup).toBe(false);
        })
        test('should call updateTimer without crashing', () => {
            global.setInterval = jest.fn();
            canvasWrapperInstance.countTimer = 21;
            canvasWrapperInstance.updateTimer();
            // canvasWrapperInstance.timeSince();
            expect(canvasWrapperInstance.state.showReleasePopup).toBe(false);
        })
        test('should call handleCommentspanel without crashing', () => {
            wrapper.setProps({toggleCommentsPanel:jest.fn()});
            canvasWrapperInstance.forceUpdate();
            wrapper.update();
            const event = {
                stopPropagation:()=> { },
                preventDefault:()=> { }
            }
            canvasWrapperInstance.handleCommentspanel(event,"id",0);
            expect(typeof(wrapper.props().toggleCommentsPanel)).toEqual('function');
        })
        test('should call updateTimer mock', () => {
            global.setInterval = jest.fn();
            canvasWrapperInstance.countTimer = 21;
            canvasWrapperInstance.updateTimer();
            expect(global.setInterval).toHaveBeenCalled();
        })
        it('loadMorePages  function call',() => {
            config.page = 0;
            config.totalPageCount = 0;
            canvasWrapperInstance.loadMorePages();
            expect(canvasWrapperInstance.loadMorePages).toBeTruthy();
        })
        it('ReleaseErrorPopup  function call',() => {
            canvasWrapperInstance.ReleaseErrorPopup();
            expect(canvasWrapperInstance.ReleaseErrorPopup).toBeTruthy();
        })
        it('handleNavClick back', () => {
            canvasWrapperInstance.handleNavClick('back');
            expect(canvasWrapperInstance.handleNavClick).toBeTruthy();
        })
        it('handleNavClick next', () => {
            canvasWrapperInstance.handleNavClick('next');
            expect(canvasWrapperInstance.handleNavClick).toBeTruthy();
        })
        it('showingToastMessage function', () => {
            canvasWrapperInstance.showingToastMessage(true);
            expect(canvasWrapperInstance.showingToastMessage).toBeTruthy();
        })
    })
})