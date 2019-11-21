import React from 'react';
import { mount } from 'enzyme';
import tinymce from 'tinymce/tinymce';
import TinyMceEditor from '../../../src/component/tinyMceEditor'
import { getGlossaryFootnoteId } from "../../../src/js/glossaryFootnote"
import moxios from 'moxios';


beforeEach(() => moxios.install() )
    
afterEach(() => moxios.uninstall());

const callback = (res) => {}
xdescribe('Testing tinyMce  component with  props', () => {
    let props={
        slateLockInfo:{
            isLocked:false
        },
    }
    const tinyMceEditor = mount( <TinyMceEditor {...props}  /> )
    let tinyMceEditorInstance = tinyMceEditor.find('TinyMceEditor').instance();
    
    it('Add footnote', () => {
        tinyMceEditorInstance.addFootnote()
    })
    it("calling API", () =>{
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {id: "123"}
            })
            .then(() => {
                let res = {data : { id: "123"} }
                callback(res)
            })
            .catch(() => {
                let errorRes = {err : "error" }
                callback(errorRes)
            })
        });
        getGlossaryFootnoteId("urn:123", "GLOSSARY", callback)
    })
    it('Add glossary', () => {
        let editor = {
            selection : {
                getContent : function(){}
            }
        }
        tinyMceEditorInstance.addGlossary(editor)
    })
})