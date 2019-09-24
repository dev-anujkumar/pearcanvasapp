import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

export class TinyMceEditor extends Component {
    constructor(props) {
        super(props);
        let context = this
        this.editorConfig = {
            plugins: EditorConfig.plugins,
            selector: '#cypress-0',
            inline:true,
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
                editor.on('keydown',function(e) {
                    if(e.keyCode == 13){
                        e.preventDefault();
                        return false;
                    }
                });
                editor.on('mousedown',function(e) {
                    if(context.props.slateLockInfo.isLocked){
                        e.preventDefault();
                        return false;
                    }   
                })
            },
            init_instance_callback: (editor) => {
                //  editor.fire('focus');                 
                
            }
        }
    };
    componentDidMount(){
        if(!tinymce.editors.length){
            tinymce.init(this.editorConfig)
        }
    }
    
    componentDidUpdate(){
        if(!tinymce.editors.length && !this.props.stringlocked){
            tinymce.init(this.editorConfig)
        }
    }

    handleFocus=(e)=>{
        this.props.handleEditorFocus()
        if(tinymce.activeEditor && tinymce.activeEditor.id===e.target.id) {
            return false;
        }
        
        if(tinymce.activeEditor){
            let activeEditorId = tinymce.activeEditor.id;
            
            tinymce.remove('#'+tinymce.activeEditor.id)
            document.getElementById(activeEditorId).contentEditable = true;
        }
        this.editorConfig.selector='#'+e.target.id;
        tinymce.init(this.editorConfig);
    }

    handleBlur=(e)=>{
        this.props.handleBlur()
    }
  
    render() {
        // if(tinymce.activeEditor !== null && tinymce.activeEditor && tinymce.activeEditor.id) {
        //     let activeEditorId = tinymce.activeEditor.id;
        //     let element = document.getElementById(activeEditorId);
        //     tinymce.remove('#'+tinymce.activeEditor.id)
        //     element.contentEditable = true;
        //     this.editorConfig.selector='#'+activeEditorId;
        //     tinymce.init(this.editorConfig);
        // }

        let classes = this.props.className ? this.props.className + " cypress-editable" : '' + " cypress-editable";
        let id = 'cypress-'+this.props.index;
       
        classes = this.props.className + " cypress-editable";       
        /**Render editable tag based on tagName*/
        switch (this.props.tagName) {
            case 'p':
                return (                 
                    <p id={id} onBlur = {this.handleBlur} onFocus={this.handleFocus} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable="true">{htmlToReactParser.parse(this.props.model)}</p>
                );
            case 'h4':
                return (
                    <h4 id={id} onBlur = {this.handleBlur} onFocus={this.handleFocus} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable="true">{htmlToReactParser.parse(this.props.model)}</h4>
                )
            case 'code':
                return (
                    <code id={id} onBlur={this.handleBlur} onFocus={this.handleFocus} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable="true">{htmlToReactParser.parse(this.props.model)}</code>
                )
            default:
                return (
                    <div id={id} onBlur={this.handleBlur} onFocus={this.handleFocus} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable="true" dangerouslySetInnerHTML={{ __html: this.props.model.text }}>{/* htmlToReactParser.parse(this.props.model.text) */}</div>
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

const mapStateToProps = state => {
    return {
        slateLockInfo: state.slateLockReducer.slateLockInfo
    };
};

export default connect(
    mapStateToProps, 
    {
        setActiveElement
    }
)(TinyMceEditor);

