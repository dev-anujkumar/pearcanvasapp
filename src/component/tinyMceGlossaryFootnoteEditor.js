import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { GlossaryFootnoteEditorConfig } from '../config/EditorConfig';

export class ReactEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  onEditorBlur = (editor) => {
    editor.on('blur', function (e) {
      e.stopImmediatePropagation();
      e.preventDefault();
    });
  };
  handleEditorChange = (e) => {
    tinymce.activeEditor.formatter.apply('p');
  }

  render() {

    return (
      <div className={this.props.className}>
        <Editor
          init={{
            toolbar: GlossaryFootnoteEditorConfig.toolbar,
            menubar: false,
            selector: '.definition-editor',
            inline: true,
            fixed_toolbar_container: '#toolbarGlossaryFootnote',
            setup: (editor) => {
              this.onEditorBlur(editor);
            },
            init_instance_callback: function (editor) {
              editor.fire('focus');
            },
          }}
          onChange={this.handleEditorChange}
        />
      </div>
    )
  }
}

export default ReactEditor;

