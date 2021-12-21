import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import PrintIndexPopup from '../../../src/component/MarkIndexPopup/MarkIndexPopup.js';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../../src/js/utils', () => {
    return {
        checkforToolbarClick: () => {
            return false
        }
    }
})
jest.mock('../../../src/component/GlossaryFootnotePopup/GlossaryFootnote_Actions', () => {
    return {
        setFormattingToolbar: () => { return; }
    }
})
jest.mock('../../../src/component/GlossaryFootnotePopup/GlossaryFootnote_Actions', () => {
    return {
        saveGlossaryAndFootnote: () => { return; }
    }
})

const initialState = {
    markedIndexReducer: {
        markedIndexValue: {
            popUpStatus: false,
            type: "Markedindex"
        },
        markedIndexGlossary: {
            popUpStatus: false, indexEntries: {}, markedIndexEntryURN: ''
        }
    }
}
const initialState1 = {
    markedIndexReducer: {
        markedIndexValue: {
            popUpStatus: false,
            type: "Markedindex"
        },
        markedIndexGlossary: {
            popUpStatus: false, indexEntries: {}, markedIndexEntryURN: ''
        }
    }
}
let store = mockStore(initialState);
let store1 = mockStore(initialState1)

describe('Testing Markedindex component with props', () => {
    let props = {
        permissions: [],
        showGlossaaryFootnote: jest.fn(),
        markedIndexValue: { "type": "", "popUpStatus": false, poetryField: undefined, elementType: '123', elementWorkId: '123', markIndexid: '123', firstLevel: 'v', secondLevel: '22', elementSubType: 'sds', typeWithPopup: 'markedIndex' },
        showingToastMessage: jest.fn(),
        markedIndexCurrentValue: { firstLevel: 'imageAssetContent', crossReferences: ['test1', 'test2'] },
        showMarkedIndexPopup: jest.fn(),
        isInGlossary: {
            markedIndexGlossary: {
                popUpStatus: false
            }
        }

    }
    const e = {
        stopPropagation() { },
        preventDefault() { }
    }
    let wrapper = mount(<Provider store={store}>< PrintIndexPopup {...props} /></Provider>);
    let MarkIndexPopupInstance = wrapper.find('PrintIndexPopup').instance();

    it('render Markedindex component', () => {
        expect(wrapper).toHaveLength(1);
        expect(MarkIndexPopupInstance).toBeDefined();
    })

    it('render Markedindex component', () => {
        let markedIndexValue = {
            "type": "Markedindex", "popUpStatus": false
        }
        let wrapper = mount(<Provider store={store}>< PrintIndexPopup {...props} markedIndexValue={markedIndexValue} /></Provider>)
        let MarkIndexPopupInstance = wrapper.find('PrintIndexPopup').instance();
        MarkIndexPopupInstance.onFocus = jest.fn()
        MarkIndexPopupInstance.onBlur = jest.fn()
        wrapper.find('#markedindex-editor').simulate('focus', (null, 'remove'))
        wrapper.find('#markedindex-editor').simulate('blur', (null, 'remove'))
        expect(wrapper).toHaveLength(1);
        expect(MarkIndexPopupInstance).toBeDefined();
    })
    it('componentWillUnmount Event', () => {
        MarkIndexPopupInstance.componentWillUnmount()
    })
    it('Test handleClickOutside', () => {
        jest.spyOn(MarkIndexPopupInstance, 'handleClickOutside')
        MarkIndexPopupInstance.handleClickOutside(e);
    })
    it('saveMarkedIndex Function', () => {
        let props = {
            permissions: [],
            showGlossaaryFootnote: jest.fn(),
            showingToastMessage: jest.fn(),
            markedIndexCurrentValue: { firstLevel: 'imageAssetContent', crossReferences: ['test1', 'test2'] },
            showMarkedIndexPopup: jest.fn()
        }
        let wrapper = mount(<Provider store={store1}>< PrintIndexPopup {...props} /></Provider>);
        let MarkIndexPopupInstance = wrapper.find('PrintIndexPopup').instance();
        MarkIndexPopupInstance.saveMarkedIndex()
    })
    it('renders markedIndexValueDifference function correctly', () => {
        let newTerm = 'abc'
        let oldTerm = 'cde'
        let newDef = 'aaa'
        let oldDef = 'bbb'
        let type = 'glossary'
        let oldCrossRef = ['ab']
        let newCrossRef = ['ba']
        MarkIndexPopupInstance.markedIndexValueDifference(newTerm, newDef, oldTerm, oldDef, oldCrossRef, newCrossRef)
        type = 'footnote'
        MarkIndexPopupInstance.markedIndexValueDifference(newTerm, newDef, oldTerm, oldDef, oldCrossRef, newCrossRef)
    });
})
describe('Testing toolbarHandling Function', () => {
    let props = {
        permissions: [],
        showGlossaaryFootnote: jest.fn(),
        markedIndexValue: { "type": "", "popUpStatus": false },
        showingToastMessage: jest.fn(),
        markedIndexCurrentValue: { firstLevel: 'imageAssetContent' },
        showMarkedIndexPopup: jest.fn(),
        isInGlossary: {
            markedIndexGlossary: {
                popUpStatus: false
            }
        }

    }
    let wrapper = mount(<Provider store={store}>< PrintIndexPopup {...props} /></Provider>, { attachTo: document.body })
    let MarkIndexPopupInstance = wrapper.find('PrintIndexPopup').instance();
    jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
        return selector == 'div#toolbarGlossaryFootnote .tox-toolbar'
    });
    const spytoolbarHandling = jest.spyOn(MarkIndexPopupInstance, 'toolbarHandling')
    it('Test-toolbarHandling function -case1', () => {
        let event = {
            type: "blur",
            relatedTarget: {
                classList: ["tox-toolbar"]
            },
            stopPropagation: jest.fn()
        }
        MarkIndexPopupInstance.toolbarHandling(event, "add")
        expect(spytoolbarHandling).toHaveBeenCalled()
        spytoolbarHandling.mockClear()
    })
    it('Test-toolbarHandling function -case2', () => {
        let event = {
            type: "blur",
            relatedTarget: {
                classList: ["tox-toolbar"]
            },
            stopPropagation: jest.fn()
        }
        MarkIndexPopupInstance.toolbarHandling(event, "remove")
        expect(spytoolbarHandling).toHaveBeenCalled()
        spytoolbarHandling.mockClear()
    })
})