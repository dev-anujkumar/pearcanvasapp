import React from 'react';
import { mount, shallow } from 'enzyme';
// import tinymce from 'tinymce/tinymce';
// import "tinymce/plugins/paste";
import ReactEditor from '../../../src/component/tinyMceGlossaryFootnoteEditor'
import { getGlossaryFootnoteId } from "../../../src/js/glossaryFootnote"
import moxios from 'moxios';
import { JestEnvironment } from '@jest/environment';
import { tinymceFormulaChemistryIcon } from '../../../src/images/TinyMce/TinyMce';

beforeEach(() => moxios.install() )
    
afterEach(() => moxios.uninstall());

const callback = (res) => {}

// jest.mock('tinymce/tinymce', () => {
//     tinymce: {
//         init: jest.fn()
//     }
// });
// jest.mock('tinymce/plugins/paste', () => {
//     return {}
// });

describe('Testing tinyMce component for glossary footnote with  props', () => {
    let props = {
        placeholder: "Type Something...",
        id: "glossary-0",
        glossaryFootNoteCurrentValue: "",
        className: "place-holder"
    }
    const tinyMceEditor = mount( <ReactEditor {...props}  />, {attachTo: window.domNode} )
    // let tinyMceEditorInstance = tinyMceEditor.find('TinyMceEditor').instance();
    
    it('Test for glossary -', () => {
        tinyMceEditor.setProps({
            id: "glossary-0"
        });
    });

    it('Editor Click Event -', () => {
        tinyMceEditor.find('p').simulate('click', (e) => {
            console.log('event', e);
        });
    });

    xit('Handle Place-Holder event -', () => {
        tinyMceEditor.setProps({
            glossaryFootNoteCurrentValue: "<p>Sample Data</p>",
            className: ""
        });
        new ReactEditor();
    });
})