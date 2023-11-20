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

const editor = {
    id: "cypress-3"
}
const wirisInstance = {
    instances: {
        [editor.id]: {
            openNewFormulaEditor: () => { },
            core: {
                getCustomEditors: () => { return { disable: () => { return false } } },
                modalDialog: {}
            },
            getCore: () => { return { getCustomEditors: () => { return { enable: () => { } } } } }
        }
    }
}
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

    let props2={
        permissions:['access_formatting_bar','amdin'],
        setWrapperRef: jest.fn(),
        showGlossaaryFootnote: jest.fn(),
        glossaryFootnoteValue:{"type":"","popUpStatus":false} ,
        closePopup:jest.fn(),
        saveContent:jest.fn(),
        glossaryFootNoteCurrentValue:{footnoteContentText:['imageAssetContent']},
        audioGlossaryPopup:jest.fn()

    }
    let wrapper2 = mount(<Provider store={store}>< GlossaryFootnotePopup {...props2} /></Provider>);
    let GlossaryFootnotePopupInstance2 = wrapper2.find('GlossaryFootnotePopup').instance();

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
        tinymce["editors"] = [{ id: 'cypress-3' }, { id: 'footnote-0' }]
        window['WirisPlugin'] = wirisInstance
        const spycomponentWillUnmount = jest.spyOn(GlossaryFootnotePopupInstance, 'componentWillUnmount')
        GlossaryFootnotePopupInstance.componentWillUnmount()
        expect(spycomponentWillUnmount).toHaveBeenCalled() 
        spycomponentWillUnmount.mockClear()
    })
    it('Test-componentWillUnmount', () => {
        tinymce["editors"] = [{ id: 'cypres-3' }, { id: 'footnote-0' }]
        window['WirisPlugin'] = wirisInstance
        const spycomponentWillUnmount = jest.spyOn(GlossaryFootnotePopupInstance, 'componentWillUnmount')
        GlossaryFootnotePopupInstance.componentWillUnmount()
        expect(spycomponentWillUnmount).toHaveBeenCalled()
        spycomponentWillUnmount.mockClear()
    })
    it('Test-componentWillUnmount', () => {
        const editor = {
            id: "cypress-3"
        }
        tinymce["editors"] = [{ id: 'cypress-3' }, { id: 'footnote-0' }]
        window['WirisPlugin'] = {
            instances: {
                [editor.id]: {
                    openNewFormulaEditor: () => { },
                    core: {
                        getCustomEditors: () => { return { disable: () => { return false } } },
                        modalDialog: null
                    },
                    getCore: () => { return { getCustomEditors: () => { return { enable: () => { } } } } }
                }
            }
        }
        const spycomponentWillUnmount = jest.spyOn(GlossaryFootnotePopupInstance, 'componentWillUnmount')
        GlossaryFootnotePopupInstance.componentWillUnmount()
        expect(spycomponentWillUnmount).toHaveBeenCalled()
        spycomponentWillUnmount.mockClear()
    })

    it('testcase for handleAudioToggle',()=>{
        GlossaryFootnotePopupInstance.handleAudioToggle();
        expect(GlossaryFootnotePopupInstance.state.audioToggle).toBe(true)
    })

    it('Branch Coverage for accessToolbar -> testcase for handleAudioToggle',()=>{
        GlossaryFootnotePopupInstance2.handleAudioToggle();
        expect(GlossaryFootnotePopupInstance2.state.audioToggle).toBe(true)
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
})