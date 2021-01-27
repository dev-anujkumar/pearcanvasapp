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

const initialState ={}
let store = mockStore(initialState);

describe('Testing GlossaryFootnote component with props', () => {
    let props={
        permissions:[],
        setWrapperRef: jest.fn(),
        showGlossaaryFootnote: jest.fn(),
        glossaryFootnoteValue:{"type":"","popUpStatus":false} ,
        closePopup:jest.fn(),
        saveContent:jest.fn(),
        glossaryFootNoteCurrentValue:{},
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
        expect(wrapper).toHaveLength(1);
        expect(GlossaryFootnotePopupInstance).toBeDefined();
    })
    it('Test-toolbarHandling function -case2', () => {
        let wrapper = mount(<Provider store={store}>< GlossaryFootnotePopup {...props} /></Provider>, { attachTo: document.body })
        let GlossaryFootnotePopupInstance = wrapper.find('GlossaryFootnotePopup').instance();
        let event={
            relatedTarget:{
                classList:["tox-toolbar"]
            },
            stopPropagation: jest.fn()
        }
        let element = document.getElementById("toolbarGlossaryFootnote");
        element.innerHTML += "<div className= 'tox-toolbar'>B</div>";
        const spytoolbarHandling = jest.spyOn(GlossaryFootnotePopupInstance, 'toolbarHandling')
        GlossaryFootnotePopupInstance.toolbarHandling(event,"add")
        expect(spytoolbarHandling).toHaveBeenCalled() 
        spytoolbarHandling.mockClear()
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

})