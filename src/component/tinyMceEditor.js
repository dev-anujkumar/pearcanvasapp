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
// import { EditorConfig } from '../config/EditorConfig';
import { EditorConfig } from '../config/EditorConfigFigure';
import './../styles/ElementFigure/ElementFigure.css';
export class TinyMceEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            getFocus:false,
         
        }
        this.editorConfig = {
            plugins: EditorConfig.plugins,
            selector: '.Editor',
            formats: EditorConfig.formats,
            menubar: false,
            statusbar: false,
            inline: true,
            fixed_toolbar_container: '#tinymceToolbar',
            content_style: EditorConfig.contentStyle,
            toolbar: EditorConfig.toolbar,
            init_instance_callback: function (editor) {
                editor.fire('focus');
            },
            setup: (editor) => {
                this.onEditorBlur(editor);
                this.onEditorEnterKeyPress(editor);
                this.onEditorClick(editor);
                this.onEditorFocus(editor);
            }
        }
    };

    onEditorBlur = (editor) => {
       if(editor){
        editor.on('blur', function (e) {
            e.stopImmediatePropagation();
            e.preventDefault();
        });
       }
    
    };

    onEditorEnterKeyPress = (editor) => {
        console.log("onEditorEnterKeyPress >> ")
    };

    onEditorClick = (editor) => {
        console.log("onEditorClick >> ")
        var getFocus=true;
        // this.setState({
        //     getFocus:true
        // })
        this.props.onFocus(getFocus);
    };

    onEditorFocus = (editor) => {
        console.log("onEditorFocus >> ")
    };

    handleEditorChange = (e) => {
        let type = this.props.type
        if(e){
         e.target.formatter.apply(this.props.format);
         
    // tinymce.activeEditor.formatter.apply(this.props.elementFormat);
        console.log('Content was updated:', e.target.getContent());
        }
        
       
    }
    render() {
        return (
            <div class={` Editor ${this.props.className}`} >
            <Editor
            initialValue={this.props.placeHolderText}
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

export default TinyMceEditor

