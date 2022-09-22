import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import GlossaryFootnotePopup from '../../../src/component/GlossaryFootnotePopup/GlossaryFootnotePopup';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../../src/js/utils',()=>{
return {
    checkforToolbarClick: ()=>{
        return false
    }
}
})
jest.mock('../../../src/component/GlossaryFootnotePopup/GlossaryFootnote_Actions', () => {
    return {
        setFormattingToolbar: () => { return; }
    }
})

jest.mock('../../../src/component/AudioTinyMceGlossary/AudioTinyMceGlossary', () => {
    return function () {
        return (<div>null</div>)
    }
})
jest.mock('../../../src/component/AudioNarration/AddAudioBook', () => {
    return function () {
        return (<div>null</div>)
    }
})
jest.mock('../../../src/component/ElementFigure/AddImageGlossary', () => {
    return function () {
        return (<div>null</div>)
    }
})

const initialState ={
    glossaryFootnoteReducer: {
        glossaryFootnoteValue : {
            popUpStatus: false,
            type: "Glossary"
        }
    },
    appStore: { 
        addfigureGlossarypopup: false
    }
}
let store = mockStore(initialState);

describe('Testing GlossaryFootnote component with props', () => {
    let props={
        permissions:[],
        setWrapperRef: jest.fn(),
        showGlossaaryFootnote: jest.fn(),
        glossaryFootnoteValue:{"type":"","popUpStatus":false} ,
        closePopup:jest.fn(),
        saveContent:jest.fn(),
        glossaryFootNoteCurrentValue:{footnoteContentText:['imageAssetContent']},
        audioGlossaryPopup:jest.fn()

    }
    let wrapper = mount(<Provider store={store}>< GlossaryFootnotePopup {...props} /></Provider>);
    let GlossaryFootnotePopupInstance = wrapper.find('GlossaryFootnotePopup').instance();


    it('render Glossary Footnote component -Footnote', () => {
        expect(wrapper).toHaveLength(1);
        expect(GlossaryFootnotePopupInstance).toBeDefined();
    })

    it('render Glossary Footnote component -Glossary', () => {
        let glossaryValue = {
            "type": "Glossary", "popUpStatus": false
        }
        let wrapper = mount(<Provider store={store}>< GlossaryFootnotePopup {...props} glossaryFootnoteValue={glossaryValue} /></Provider>)
        let GlossaryFootnotePopupInstance = wrapper.find('GlossaryFootnotePopup').instance();
        GlossaryFootnotePopupInstance.onFocus = jest.fn()
        GlossaryFootnotePopupInstance.onBlur = jest.fn()
        wrapper.find('#glossary-editor').simulate('focus', (null, 'remove'))
        wrapper.find('#glossary-editor').simulate('blur', (null, 'remove'))
        wrapper.find('#glossary-editor-attacher').simulate('focus', (null, 'remove'))
        wrapper.find('#glossary-editor-attacher').simulate('blur', (null, 'remove'))
        expect(wrapper).toHaveLength(1);
        expect(GlossaryFootnotePopupInstance).toBeDefined();
    })

    describe('Testing toolbarHandling Function', () => {
        let wrapper = mount(<Provider store={store}>< GlossaryFootnotePopup {...props} /></Provider>, { attachTo: document.body })
        let GlossaryFootnotePopupInstance = wrapper.find('GlossaryFootnotePopup').instance();
        jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
            return selector == 'div#toolbarGlossaryFootnote .tox-toolbar'
        });
        const spytoolbarHandling = jest.spyOn(GlossaryFootnotePopupInstance, 'toolbarHandling')
        it('Test-toolbarHandling function -case1', () => {
            let event={
                type: "blur",
                relatedTarget:{
                    classList:["tox-toolbar"]
                },
                stopPropagation: jest.fn()
            }
            GlossaryFootnotePopupInstance.toolbarHandling(event, "add")
            expect(spytoolbarHandling).toHaveBeenCalled()
            spytoolbarHandling.mockClear()
        })
        it('Test-toolbarHandling function -case2', () => {
            let event={
            type: "blur",
            relatedTarget:{
                classList:["tox-toolbar"]
            },
            stopPropagation: jest.fn()
        }
            GlossaryFootnotePopupInstance.toolbarHandling(event, "remove")
        expect(spytoolbarHandling).toHaveBeenCalled()
        spytoolbarHandling.mockClear()
    })
    })
    it('Test-componentWillUnmount', () => {
        const spycomponentWillUnmount = jest.spyOn(GlossaryFootnotePopupInstance, 'componentWillUnmount')
        GlossaryFootnotePopupInstance.componentWillUnmount()
        expect(spycomponentWillUnmount).toHaveBeenCalled() 
        spycomponentWillUnmount.mockClear()
    })

    it('testcase for handleAudioToggle',()=>{
        GlossaryFootnotePopupInstance.handleAudioToggle();
        expect(GlossaryFootnotePopupInstance.state.audioToggle).toBe(true)
    })

    it('testcase for closeAddAudioBook',()=>{
        GlossaryFootnotePopupInstance.closeAddAudioBook();
        expect(GlossaryFootnotePopupInstance.state.audioToggle).toBe(false)
    })

    it('testcase for AddImageGlossary',()=>{
        GlossaryFootnotePopupInstance.handleFigureToggle();
       expect(GlossaryFootnotePopupInstance.state.figureToggle).toBe(true)
    })

    it('testcase for AddImageGlossary',()=>{
        GlossaryFootnotePopupInstance.closeFigurePopup();
       expect(GlossaryFootnotePopupInstance.state.figureToggle).toBe(false)
    })

    it('testcase for handleMouseDown', () => {
        const spyhandleMouseDown = jest.spyOn(GlossaryFootnotePopupInstance, 'handleMouseDown')
        let e = {
            target: {
                id: "glossary-1"
            },
            keyCode: 9,
            preventDefault: () => jest.fn()
        }
        document.getElementById = () => {
            return {
                tabIndex: "0",
                classList: {
                    contains: () => true,
                    add: () => jest.fn(),
                    remove: () => jest.fn()
                },
                contains: () => true,
                focus: () => jest.fn(),
                blur: () => jest.fn()
            }
        }
        GlossaryFootnotePopupInstance.handleMouseDown(e)
        expect(spyhandleMouseDown).toHaveBeenCalled() 
        spyhandleMouseDown.mockClear()
    })

    it('testcase for handleKeyDown', () => {
        const spyhandleKeyDown = jest.spyOn(GlossaryFootnotePopupInstance, 'handleKeyDown')
        let e = {
            target: {
                id: "glossary-1"
            },
            keyCode: 9,
            preventDefault: () => jest.fn()
        }
        document.getElementById = () => {
            return {
                tabIndex: "0",
                classList: {
                    contains: () => true,
                    add: () => jest.fn(),
                    remove: () => jest.fn()
                },
                contains: () => true,
                focus: () => jest.fn(),
                blur: () => jest.fn()
            }
        }
        GlossaryFootnotePopupInstance.handleKeyDown(e)
        expect(spyhandleKeyDown).toHaveBeenCalled()
        spyhandleKeyDown.mockClear()
    })
})