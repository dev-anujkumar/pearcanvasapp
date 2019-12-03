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
    }
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
    xtest('should show LockReleasePopup', () => {
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
        xtest('should call setSlateLock', () => {
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
})