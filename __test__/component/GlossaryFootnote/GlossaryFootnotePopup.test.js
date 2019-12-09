import React from 'react';
import { mount } from 'enzyme';
import GlossaryFootnotePopup from '../../../src/component/GlossaryFootnotePopup/GlossaryFootnotePopup';
jest.mock('../../../src/js/utils',()=>{
return {
    checkforToolbarClick: ()=>{
        return false
    }
}
})
describe('Testing GlossaryFootnote component with props', () => {
    let props={
        permissions:[],
        setWrapperRef: jest.fn(),
        showGlossaaryFootnote: jest.fn(),
        glossaryFootnoteValue:{"type":"","popUpStatus":false} ,
        closePopup:jest.fn(),
        saveContent:jest.fn(),
        glossaryFootNoteCurrentValue:{},

    }

    it('render Glossary Footnote component -Footnote', () => {
        let wrapper = mount(< GlossaryFootnotePopup {...props} />)
        let GlossaryFootnotePopupInstance = wrapper.find('GlossaryFootnotePopup').instance();
        expect(wrapper).toHaveLength(1);
        expect(GlossaryFootnotePopupInstance).toBeDefined();
    })
    it('render Glossary Footnote component -Glossary', () => {
        let glossaryValue = {
            "type": "Glossary", "popUpStatus": false
        }
        let wrapper = mount(< GlossaryFootnotePopup {...props} glossaryFootnoteValue={glossaryValue} />)
        let GlossaryFootnotePopupInstance = wrapper.find('GlossaryFootnotePopup').instance();
        expect(wrapper).toHaveLength(1);
        expect(GlossaryFootnotePopupInstance).toBeDefined();
    })
    it('Test-toolbarHandling function -case2', () => {
        let wrapper = mount(< GlossaryFootnotePopup {...props} />, { attachTo: document.body })
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
        let wrapper = mount(< GlossaryFootnotePopup {...props} />)
        let GlossaryFootnotePopupInstance = wrapper.find('GlossaryFootnotePopup').instance();
        const spycomponentWillUnmount = jest.spyOn(GlossaryFootnotePopupInstance, 'componentWillUnmount')
        GlossaryFootnotePopupInstance.componentWillUnmount()
        expect(spycomponentWillUnmount).toHaveBeenCalled() 
        spycomponentWillUnmount.mockClear()
    })

})