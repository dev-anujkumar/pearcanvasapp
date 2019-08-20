import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver';
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";
import "tinymce/skins/content/default/content.css";
import "tinymce/plugins/lists";
import "tinymce/plugins/advlist";
import { EditorConfig } from '../config/EditorConfig'
export class TinyMceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.editorConfig = {
      plugins: EditorConfig.plugins,
      selector: '.Editor',
      formats: EditorConfig.formats,
      menubar: false,
      statusbar: false,
      inline: true,
      fixed_toolbar_container: '#mytoolbar',
      content_style: EditorConfig.contentStyle,
      toolbar: EditorConfig.toolbar,
      init_instance_callback: function (editor) {
        editor.fire('focus');
      },
      setup : (editor) => {
        this.onEditorBlur(editor);
        this.onEditorEnterKeyPress(editor);
        this.onEditorClick(editor);
        this.onEditorFocus(editor);
      }
    }
  };

  onEditorBlur = (editor) => {
    editor.on('blur', function (e) {
      e.stopImmediatePropagation();
      e.preventDefault();
    });
  };

  onEditorEnterKeyPress = (editor) => {
    console.log("onEditorEnterKeyPress >> ")
  };

  onEditorClick = (editor) => {
    console.log("onEditorClick >> ")
  };

  onEditorFocus = (editor) => {
    console.log("onEditorFocus >> ")
  };

  handleEditorChange = (e) => {
    console.log('Content was updated:', e.target.getContent());
    tinymce.activeEditor.formatter.apply(this.props.element);
  }

  render() {
    
    return (
        <div className="Editor" >
        <Editor
          //initialValue ={initialVlaue}
          initialValue={this.props.value}
          init={this.editorConfig}
          onChange={this.handleEditorChange}
        />
      </div>
    );
  }
}
TinyMceEditor.propTypes = {
  error: PropTypes.string,
};

TinyMceEditor.defaultProps = {
  error: null,
};

export default connect(({ error }) => ({ error }))(TinyMceEditor);