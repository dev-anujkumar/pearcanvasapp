import React from 'react';
import { mount } from 'enzyme';
import GlossaryFootnotePopup from '../../../src/component/GlossaryFootnotePopup/GlossaryFootnotePopup';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
const mockStore = configureMockStore(middlewares);
import * as util from '../../../src/js/utils.js';
import { exportAllDeclaration } from '../../../../../AppData/Local/Microsoft/TypeScript/3.6/node_modules/@babel/types/lib';

util.checkforToolbarClick = (relatedTargets) => {
    return true;
};

let props = {
    glossaryFootnoteValue : {type: "Glossary"},
    glossaryFootNoteCurrentValue: {"glossaryContentText": ""}
};
describe('Testing GlossaryFootnote component with props', () => {
    const div = document.createElement('div');
    const wrapper = mount( <GlossaryFootnotePopup   {...props}/>)
    let GlossaryFootnotePopupInstance = wrapper.find('GlossaryFootnotePopup').instance();
    it('render Glossary Footnote component ', () => {
        ReactDOM.render(<GlossaryFootnotePopup {...props}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    })
    it('componentWillUnmount Event', () => {
        GlossaryFootnotePopupInstance.componentWillUnmount()
    })
    it('toolbarHandling Event', () => {
        const e = {
            stopPropagation() { }
        }
        let action = "add";
        const elementIdInfo = document.createElement('div');
        elementIdInfo.setAttribute('id', 'toolbarGlossaryFootnote');
        elementIdInfo.setAttribute('class', 'tox-toolbar');
        document.body.appendChild(elementIdInfo);
        GlossaryFootnotePopupInstance.toolbarHandling(e, action);
        expect(wrapper.find('.tox-toolbar').length).toBe(0)
    })
})