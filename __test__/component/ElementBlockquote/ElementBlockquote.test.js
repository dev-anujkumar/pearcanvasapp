import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
import slateLevelData from '../Sidebar/slateData';
import ElementBlockquote from '../../../src/component/ElementAuthoring/ElementBlockquote';


describe('Testing Element Blockquote component', () => {
    const mockStore = configureMockStore(middlewares);
    let activeElement = {
        elementId: 'urn:pearson:work:30660a48-cc43-42e6-8cb1-14dbc1563f27',
    }
    const elementAudioVideoData = mockStore({
        appStore: {
            activeElement,
            slateLevelData
        },
        alfrescoReducer: {
            alfrescoAssetData: {},

        },
        keyboardReducer: {
            selectedElement: []
        },
        autoNumberReducer: {
            isAutoNumberingEnabled: 'true'
        },
        toolbarReducer: {
            spellCheckToggle: 'true'
        }
    })
    let props = {
        borderToggle: "showBorder",
        btnClassName: "",
        deleteElement: jest.fn(),
        elemBorderToggle: true,
        elementId: "urn:pearson:work:c771a9fa-ef29-497c-bb6d-8dcfbb083180",
        elementIndex: 0,
        elementSepratorProps: jest.fn(),
        handleBlur: jest.fn(),
        index: 0,
        labelText: "SD",
        model: { text: "<blockquote class='blockquoteMarginalia'><p class='paragraphNummerEins'><br></p><p class='blockquoteTextCredit' contenteditable='true' data-placeholder='Attribution Text'></p></blockquote>" },
        permissions: [],
        slateLockInfo: { isLocked: false, userId: "" },
        type: undefined,
        updatePageNumber: undefined,
        userRole: "admin",
        activeElement: {
            elementId: "urn:pearson:work:c771a9fa-ef29-497c-bb6d-8dcfbb083180"
        },
        className: 'test'
    }
    let props1 = {
        borderToggle: "showBorder",
        btnClassName: "",
        deleteElement: jest.fn(),
        elemBorderToggle: true,
        elementId: "urn:pearson:work:c771a9fa-ef29-497c-bb6d-8dcfbb083180",
        elementIndex: 0,
        elementSepratorProps: jest.fn(),
        handleBlur: jest.fn(),
        index: 0,
        labelText: "SD",
        model: { text: "<blockquote class='blockquoteMarginalia'><p class='paragraphNummerEins'><br></p><p class='' contenteditable='true' data-placeholder='Attribution Text'></p></blockquote>" },
        permissions: [],
        slateLockInfo: { isLocked: false, userId: "" },
        type: undefined,
        updatePageNumber: undefined,
        userRole: "admin",
        activeElement: {
            elementId: "urn:pearson:work:c771a9fa-ef29-497c-bb6d-8dcfbb083180"
        },
        className: 'test'
    }
    let elementAudioVideo = mount(<Provider store={elementAudioVideoData} >
        <ElementBlockquote  {...props} />
    </Provider>);
    it('renders without crashing', () => {
        expect(elementAudioVideo).toHaveLength(1);
    })
    let elementAudioVideo1 = mount(<Provider store={elementAudioVideoData} >
        <ElementBlockquote  {...props1} />
    </Provider>);
    it('renders without crashing', () => {
        expect(elementAudioVideo1).toHaveLength(1);
    })
});