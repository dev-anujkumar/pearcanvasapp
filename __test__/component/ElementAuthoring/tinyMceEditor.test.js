import React from 'react';
import { mount } from 'enzyme';
import tinymce from 'tinymce/tinymce';
import TinyMceEditor from '../../../src/component/tinyMceEditor'

xdescribe('Testing tinyMce  component with  props', () => {
    const tinyMceEditor = mount( <TinyMceEditor   /> )
    let tinyMceEditorInstance = tinyMceEditor.find('TinyMceEditor').instance();
    it('render tinyMce Editor component ', () => {
        
        console.log(tinyMceEditor.debug());
        expect(tinyMceEditor).toMatchSnapshot();
    })

    it('onEditorBlurFunc tinyMce', () => {
        tinyMceEditorInstance.onEditorBlur()
    })
    it('onEditorEnterKeyPressFunc tinyMce', () => {
        tinyMceEditorInstance.onEditorEnterKeyPress()
    })
    it('onEditorClickFunc tinyMce', () => {
        tinyMceEditorInstance.onEditorClick()
    })
    it('onEditorFocusFunc tinyMce', () => {
        tinyMceEditorInstance.onEditorFocus()
    })
    it('handleEditorChangeFunc of tinyMce',() => {
        let event = {
            target: {formatter: function(){},
            getContent:function(){}
          }
         }
        tinyMceEditorInstance.handleEditorChange(event)
    })
})