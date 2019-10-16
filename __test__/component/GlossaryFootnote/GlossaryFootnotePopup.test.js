import React from 'react';
import { mount } from 'enzyme';
import GlossaryFootnotePopup from '../../../src/component/GlossaryFootnotePopup/GlossaryFootnotePopup';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';

const mockStore = configureMockStore(middlewares);
const store = mockStore({
    glossaryFootnoteReducer:{glossaryFootnoteValue:{"type":"","popUpStatus":false}
    }
  
  
});
describe('Testing GlossaryFootnote component with props', () => {
    const wrapper = mount( <GlossaryFootnotePopup   />)
    let GlossaryFootnotePopupInstance = wrapper.find('GlossaryFootnotePopup').instance();
    it('render Glossary Footnote component ', () => {
        const component = mount(<GlossaryFootnotePopup />);
        expect(component).toMatchSnapshot();
    })

    it('render Glossary ', () => {
        const component = mount(<Provider store={store}><GlossaryFootnotePopup glossaryFootnote='Glossary' /></Provider>);
        expect(component).toMatchSnapshot();
    })

    it('render Footnote ', () => {
        const component = mount(<Provider store={store}><GlossaryFootnotePopup glossaryFootnote='Footnote' /></Provider>);
        expect(component).toMatchSnapshot();
    })

    it('ComponetDidMount Event', () => {
        GlossaryFootnotePopupInstance.componentDidMount()
    })
    it('ComponetDidUpdate Event', () => {
        GlossaryFootnotePopupInstance.componentDidUpdate()
    })
})