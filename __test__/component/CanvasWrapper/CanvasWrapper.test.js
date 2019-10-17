import React from 'react';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import CanvasWrapper from '../../../src/component/CanvasWrapper';
import { SET_SLATE_LOCK_STATUS, SET_LOCK_FLAG } from '../../../src/constants/Action_Constants';

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
        setSlateLock: jest.fn(),
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
        slateLevelData: listMockData
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
        expect(canvasWrapperInstance.state('showReleasePopup')).toBe(true);
        expect(canvasWrapperInstance.find('PopUp').length).toBe(true);
    })
})