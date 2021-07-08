import React from 'react';
import { mount, shallow } from 'enzyme';
import GlossaryFootnoteMenu from '../../../src/component/GlossaryFootnotePopup/GlossaryFootnoteMenu';
import { comments, filters } from '../../../fixtures/commentPanelData.js'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';

const mockStore = configureMockStore(middlewares);
let store = mockStore({});
let props = {
    glossaryFootnoteValue : {type: "Glossary"},
    glossaryFootNoteCurrentValue: {"glossaryContentText": ""},
    showGlossaaryFootnote : ()=>{
    return;
    }
};
jest.mock('../../../src/component/AudioTinyMceGlossary', () => {
    return function () {
        return (<div>null</div>)
    }
})
describe('Testing GlossaryFootnote menu component with props', () => {
    let wrapper = mount(<Provider store={store}><GlossaryFootnoteMenu {...props} /></Provider>)
    const instance = wrapper.find('GlossaryFootnoteMenu').instance();
    it('componentWillMount Event', () => {
        instance.componentWillMount()
     })
    it('componentWillUnmount Event', () => {
        instance.componentWillUnmount()
     })
      it('renders closePopup function correctly', () => {
        instance.closePopup ()
     });
     xit('renders saveContent function correctly', () => {
        instance.saveContent()
     });
    it('renders glossaryFootnoteDifference function correctly', () => {
        let newTerm = 'abc'
        let oldTerm = 'cde'
        let newDef = 'aaa'
        let oldDef = 'bbb'
        let type = 'glossary'
        instance.glossaryFootnoteDifference(newTerm, newDef, oldTerm, oldDef, type)
        type = 'footnote'
        instance.glossaryFootnoteDifference(newTerm, newDef, oldTerm, oldDef, type)
    });
})