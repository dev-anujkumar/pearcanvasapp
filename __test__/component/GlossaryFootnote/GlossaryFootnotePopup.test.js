import React from 'react';
import { mount } from 'enzyme';
import GlossaryFootnotePopup from '../../../src/component/GlossaryFootnotePopup/GlossaryFootnotePopup';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
const mockStore = configureMockStore(middlewares);
const store = mockStore({
    glossaryFootnoteReducer:{glossaryFootnoteValue:{"type":"","popUpStatus":false}
    }
  
  
});
xdescribe('Testing GlossaryFootnote component with props', () => {
    const div = document.createElement('div');
    const wrapper = mount( <GlossaryFootnotePopup   />)
    let GlossaryFootnotePopupInstance = wrapper.find('GlossaryFootnotePopup').instance();
    it('render Glossary Footnote component ', () => {
        ReactDOM.render(<Provider store={store}><GlossaryFootnotePopup /></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
    })

    it('render Glossary ', () => {
        ReactDOM.render(<Provider store={store}><GlossaryFootnotePopup glossaryFootnote='Glossary' /></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
    })

    it('render Footnote ', () => {
        ReactDOM.render(<Provider store={store}><GlossaryFootnotePopup glossaryFootnote='Footnote' /></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
    })

    it('ComponetDidMount Event', () => {
        GlossaryFootnotePopupInstance.componentDidMount()
    })
    it('ComponetDidUpdate Event', () => {
        GlossaryFootnotePopupInstance.componentDidUpdate()
    })
})