import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//IMPORT TINYMCE 
import { Editor } from '@tinymce/tinymce-react';
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver';
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";
import "tinymce/skins/content/default/content.css";
import "tinymce/plugins/lists";
import "tinymce/plugins/advlist";
import { EditorConfig } from '../config/EditorConfig';
//import { ReactDOMServer }  from 'react-dom/server';
const HtmlToReactParser = require('html-to-react').Parser;
const htmlToReactParser = new HtmlToReactParser();
export class TinyMceEditor extends React.Component {
    constructor(props) {
        super(props);
        this.editorConfig = {
            plugins: EditorConfig.plugins,
            selector: '#cypress-editable-0',
            inline: true,
            formats: EditorConfig.formats,
            menubar: false,
            statusbar: false,
            inline: true,
            object_resizing: false,
            fixed_toolbar_container: '#tinymceToolbar',
            content_style: EditorConfig.contentStyle,
            toolbar: EditorConfig.toolbar,
            image_advtab: false,
            force_br_newlines: true,
            forced_root_block: '',
            remove_linebreaks: false,
            setup: (editor) => {
                
            },
            init_instance_callback: (editor) => {
                //  editor.fire('focus');                 

            }
        }
    };
    componentDidMount() {
        if (!tinymce.editors.length) {
            tinymce.init(this.editorConfig)
        }

    }
    componentDidUpdate() {
        if (!tinymce.editors.length) {
            tinymce.init(this.editorConfig)
        }
    }
    // handleBlur=(e)=>{
    //   // debugger;
    //   // window.tinyMCE.activeEditor.settings
    //  // tinymce.activeEditor.destory();
    //  // tinymce.editors.forEach((editor,index)=>{
    //  //   editor.destroy();
    //  // })
    // }


    handleFocus = (e) => {
        this.props.handleEditorFoucs()
        if (tinymce.activeEditor && tinymce.activeEditor.id === e.target.id)
            return false;
        if (tinymce.activeEditor) {
            let activeEditorId = tinymce.activeEditor.id;

            tinymce.remove('#' + tinymce.activeEditor.id)
            document.getElementById(activeEditorId).contentEditable = true;
        }
        this.editorConfig.selector = '#' + e.target.id
        tinymce.init(this.editorConfig)
    }

    handleBlur=(e)=>{
        this.props.handleBlur()
    }

    render() {
        let classes = this.props.className ? this.props.className + " cypress-editable" : '' + " cypress-editable";
        let id = 'cypress-' + this.props.index;
        classes = this.props.className + " cypress-editable";
        /**Render editable tag based on tagName*/
        switch (this.props.tagName) {
            case 'p':
                return (
                    <p id={id} className={classes} onBlur = {this.handleBlur} onFocus={this.handleFocus} placeholder={this.props.placeholder} contentEditable="true">{htmlToReactParser.parse(this.props.model)}</p>
                );
            case 'h4':
                return (
                    <h4 id={id} className={classes} onBlur = {this.handleBlur} onFocus={this.handleFocus} placeholder={this.props.placeholder} contentEditable="true">{htmlToReactParser.parse(this.props.model)}</h4>
                )
            case 'code':
                return (
                    <code id={id} onBlur = {this.handleBlur} onFocus={this.handleFocus} className={classes} placeholder={this.props.placeholder} contentEditable="true">{htmlToReactParser.parse(this.props.model)}</code>
                )
            default:
                return (
                    <div id={id} onBlur = {this.handleBlur} onFocus={this.handleFocus} className={classes} placeholder={this.props.placeholder} contentEditable="true">{htmlToReactParser.parse(this.props.model.text)}</div>
                )
        }
    }
}
TinyMceEditor.propTypes = {
    /** class name of the element type to be rendered */
    className: PropTypes.string,
    /** Detail of element in JSON object */
    model: PropTypes.object,

};

TinyMceEditor.defaultProps = {
    error: null,
};

export default TinyMceEditor;

