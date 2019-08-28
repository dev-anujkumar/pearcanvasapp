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
import { EditorConfig } from '../config/EditorConfig';
// import { EditorConfig } from '../config/EditorConfigFigure';
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
            placeholder_tag : 'p',
            placeholder_attrs: { style: {position: 'absolute', top:'5px', left:0, color: '#FF0000', padding: '1%', width:'98%', overflow: 'hidden', 'white-space': 'pre-wrap'} },
            init_instance_callback: function (editor) {
                // editor.fire('focus');    
            },
            setup: (editor) => {
                this.onEditorBlur(editor);
                this.onEditorEnterKeyPress(editor);
                this.onEditorClick(editor);
                this.onEditorFocus(editor);
                // this.onSelectionChange(editor);
            }
        }
    };

    componentDidMount(){
        setTimeout(() =>{

            tinymce.PluginManager.add('placeholder', (editor) => {
                editor.on('init', function() {
                    var label = new Label;
            
                    //onBlur();
            
                    tinymce.DOM.bind(label.el, 'click', onFocus);
                    editor.on('focus', onFocus);
                    editor.on('blur', onBlur);
                    editor.on('change', onBlur);
                    editor.on('setContent', onBlur);
                    editor.on('keydown', onKeydown);
            
                    function onFocus() {
                        if (!editor.settings.readonly === true) {
                            label.hide();
                        }
                        editor.execCommand('mceFocus', false);
                    }
            
                    function onBlur() {
                        if (editor.getContent() == '') {
                            label.show();
                        } else {
                            label.hide();
                        }
                    }
            
                    function onKeydown(){
                        label.hide();
                    }
                });
            
                var Label = function(){
                    // var placeholder_text = editor.getElement().getAttribute("placeholder") || editor.settings.placeholder;
                    // console.log("this.props.placeholder >> ", this.props.placeholder)
                    var placeholder_text = "Enter Label"
                    var placeholder_attrs = editor.settings.placeholder_attrs || {style: {position: 'absolute', top:'5px', left:0, color: '#888', padding: '1%', width:'98%', overflow: 'hidden', 'white-space': 'pre-wrap'} };
                    var contentAreaContainer = editor.getContentAreaContainer();
            
                    tinymce.DOM.setStyle(contentAreaContainer, 'position', 'relative');
            
                    // Create label el
                    this.el = tinymce.DOM.add( contentAreaContainer, editor.settings.placeholder_tag || "label", placeholder_attrs, placeholder_text );
                }
            
                Label.prototype.hide = function(){
                    tinymce.DOM.setStyle( this.el, 'display', 'none' );
                }
            
                Label.prototype.show = function(){
                    tinymce.DOM.setStyle( this.el, 'display', '' );
                }
            });
        },2000)
    }

    onEditorBlur = (editor) => {
       if(editor){
        editor.on('blur', function (e) {
            e.stopImmediatePropagation();
            e.preventDefault();
        });
       }
    
    };
 
    onSelectionChange=(editor)=>{
        if ( editor.getContent() === "" ) {
            tinymce.DOM.addClass( editor.bodyElement, 'empty' );
        } else {
            tinymce.DOM.removeClass( editor.bodyElement, 'empty' );
        }
    }
    onEditorEnterKeyPress = (editor) => {
        console.log("onEditorEnterKeyPress >> ")
    };

    onEditorClick = (editor) => {
        console.log("onEditorClick >> ")
        var getFocus=true;
        // this.setState({
        //     getFocus:true
        // })
       // this.props.onFocus(getFocus);
    };

    onEditorFocus = (editor) => {
        console.log("onEditorFocus >> ")
    };

    handleEditorChange = (e) => {
        let type = this.props.type
        if(e){
         e.target.formatter.apply(this.props.format);
        console.log('Content was updated:', e.target.getContent());
        }
        
       
    }
    render() {
        return (
            <div className={` Editor ${this.props.className}`} >
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

