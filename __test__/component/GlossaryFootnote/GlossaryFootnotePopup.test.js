import React from 'react';
import { mount } from 'enzyme';
import GlossaryFootnoteMenu from '../../../src/component/GlossaryFootnotePopup';


describe('Testing GlossaryFootnote component with props', () => {
    const GlossaryFootnotePopup = mount( <GlossaryFootnoteMenu   /> )
    let GlossaryFootnotePopupInstance = GlossaryFootnotePopup.find('GlossaryFootnoteMenu').instance();
    it('render Glossary Footnote component ', () => {
        const component = mount(<GlossaryFootnoteMenu />);
        expect(component).toMatchSnapshot();
    })

    it('render Glossary ', () => {
        const component = mount(<GlossaryFootnoteMenu glossaryFootnote='Glossary' />);
        expect(component).toMatchSnapshot();
    })

    it('render Footnote ', () => {
        const component = mount(<GlossaryFootnoteMenu glossaryFootnote='Footnote' />);
        expect(component).toMatchSnapshot();
    })

    it('onClick Event', () => {
        GlossaryFootnotePopupInstance.closePopup()
    })

    it('onClick Event', () => {
        GlossaryFootnotePopupInstance.saveContent()
    })
})