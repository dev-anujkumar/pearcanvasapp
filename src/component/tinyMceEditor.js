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
import { setActiveElement } from './CanvasWrapper/CanvasWrapper_Actions';
import GlossaryFootnoteMenu from './GlossaryFootnotePopup/GlossaryFootnoteMenu.jsx';
import './../styles/Tiny.css';
//import { ReactDOMServer }  from 'react-dom/server';
const HtmlToReactParser = require('html-to-react').Parser;
const htmlToReactParser = new HtmlToReactParser();
export class TinyMceEditor extends React.Component {
    constructor(props) {
        super(props);
        this.editorConfig = {
            plugins: EditorConfig.plugins,
            selector: '#cypress-editable-0',
            inline:true,
            formats: EditorConfig.formats,
            menubar: false,
            statusbar: false,
            inline: true,
            object_resizing : false,
            fixed_toolbar_container: '#tinymceToolbar',
            content_style: EditorConfig.contentStyle,
            toolbar: EditorConfig.toolbar,
            image_advtab: false,
            setup: (editor) => {
                editor.on('keydown',function(e) {
                    if(e.keyCode == 13){
                        e.preventDefault();
                        return false;
                    }
                });
                editor.ui.registry.addButton('Glossary', {
                    text: '<i class="fa fa-asterisk" aria-hidden="true"></i>',
                    onAction: () => this.openGlossaryPopUp()
                });
                editor.ui.registry.addButton('Footnote', {
                    text: '<i class="fa fa-bookmark" aria-hidden="true"></i>',
                    onAction: () => alert('Footnote clicked!')
                });
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
        if(!tinymce.editors.length){
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
 

  handleFocus=(e)=>{
   if(tinymce.activeEditor && tinymce.activeEditor.id===e.target.id)
   return false;
   if(tinymce.activeEditor){
     let activeEditorId = tinymce.activeEditor.id;
   
     tinymce.remove('#'+tinymce.activeEditor.id)
     document.getElementById(activeEditorId).contentEditable = true;
   }
    this.editorConfig.selector='#'+e.target.id
    tinymce.init(this.editorConfig)
   }
  
    render() {
        console.log("this.props >> ", this.props)
        let classes = this.props.className ? this.props.className + " cypress-editable" : '' + " cypress-editable";
        let id = 'cypress-'+this.props.index;
        classes = this.props.className + " cypress-editable";       
         /**Render editable tag based on tagName*/
        switch (this.props.tagName) {
            case 'p':
                return (                    
                        <p id={id} className={classes} onFocus={this.handleFocus} contentEditable="true">{htmlToReactParser.parse(this.props.model)}</p>
                   );
            case 'h4':
                return (
                    <h4 id={id} className={classes} onFocus={this.handleFocus} contentEditable="true">{htmlToReactParser.parse(this.props.html)}</h4>
                )
                case 'code':
                        return (
                            <code id={id} onFocus={this.handleFocus} className={classes} contentEditable="true">{htmlToReactParser.parse(this.props.model)}</code>
                        )
            default:
                return (
                    <div id={id} onFocus={this.handleFocus} className={classes} contentEditable="true">{htmlToReactParser.parse(this.props.model.text)}</div>
                )
        }
    }
}
TinyMceEditor.propTypes = {
    /** class name of the element type to be rendered */
    className:PropTypes.string,
    /** Detail of element in JSON object */
    model:PropTypes.object,

};

TinyMceEditor.defaultProps = {
    error: null,
};

export default TinyMceEditor;

