import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { GlossaryFootnoteEditorConfig } from '../config/EditorConfig';

export class ReactEditor extends React.Component {
  constructor(props) {
    super(props);
    this.editorConfig = {
      toolbar: GlossaryFootnoteEditorConfig.toolbar,
      plugins: "placeholder",
      menubar: false,
      selector: '#glossary-0',
      inline: true,
      menubar: false,
      statusbar: false,
      object_resizing: false,
      fixed_toolbar_container: '#toolbarGlossaryFootnote',
      setup: (editor) => {
        this.onEditorBlur(editor);
      },
      init_instance_callback: function (editor) {
        editor.fire('focus');
      },
    }
  }

  onEditorBlur = (editor) => {
    editor.on('blur',  (e) => {
      this.props.glossaaryFootnotePopup(false);   
      e.stopImmediatePropagation();
      e.preventDefault();
    });
  };

  handleFocus = (e) => {
    if (tinymce.activeEditor && tinymce.activeEditor.id === e.target.id) {
      return false;
    }

    if (tinymce.activeEditor && !(tinymce.activeEditor.id.includes('cypress'))) {
      let activeEditorId = tinymce.activeEditor.id;
      tinymce.remove('#' + tinymce.activeEditor.id)
      document.getElementById(activeEditorId).contentEditable = true;
    }

    this.editorConfig.selector = '#' + e.target.id;
    tinymce.init(this.editorConfig);
  }

  render() {
    // if (tinymce.activeEditor !== null && tinymce.activeEditor && tinymce.activeEditor.id) {
    //   let activeEditorId = tinymce.activeEditor.id;
    //   let element = document.getElementById(activeEditorId);
    //   tinymce.remove('#' + tinymce.activeEditor.id)
    //   element.contentEditable = true;
    //   this.editorConfig.selector = '#' + activeEditorId;
    //   tinymce.init(this.editorConfig);
    // }
    return (
      <div>   
        <p className={this.props.className} placeholder={this.props.placeholder} onFocus={this.handleFocus} contentEditable="true" id={this.props.id} ></p>
      </div>
    )
  }
}

export default ReactEditor;

