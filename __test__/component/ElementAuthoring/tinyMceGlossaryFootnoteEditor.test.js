import React from 'react';
import { mount } from 'enzyme';
import tinymce from 'tinymce/tinymce';
import ReactEditor from '../../../src/component/tinyMceGlossaryFootnoteEditor'
import { getGlossaryFootnoteId } from "../../../src/js/glossaryFootnote"
import moxios from 'moxios';

beforeEach(() => moxios.install() )
    
afterEach(() => moxios.uninstall());

const callback = (res) => {}
describe('Testing tinyMce component for glossary footnote with  props', () => {
    let props = {
        placeholder: "Type Something...",
        id: 0,
        glossaryFootNoteCurrentValue: "",
        className: "place-holder"
    }
    const tinyMceEditor = mount( <ReactEditor {...props}  />, {attachTo: window.domNode} )
    // let tinyMceEditorInstance = tinyMceEditor.find('TinyMceEditor').instance();
    
    it('Test id id would be null -', () => {
        // tinyMceEditor.setProps({
        //     id: null
        // });
    });

    it('Handle Place-Holder event -', () => {
        tinyMceEditor.setProps({
            glossaryFootNoteCurrentValue: "<p>Sample Data</p>",
            className: ""
        });
    });

    it('Editor Click Event -', () => {
        tinyMceEditor.find('p').simulate('click')
    });
})