import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver';

import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";
import "tinymce/skins/content/default/content.css";
//import '../Tiny.css';
import "tinymce/plugins/lists";
import "tinymce/plugins/advlist";
export class TinyMceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.editorConfig = {
      plugins: "lists advlist",
      //mode:"textareas",
      selector: '.Editor',
      formats: {
        // Changes the default format for h1 to have a class of heading
        p: { block: 'p', classes: 'paragraphNumeroUno' },
        h1: { block: 'h1', classes: 'heading1NummerEins' },
        h2:{ block: 'h2', classes: 'heading2NummerEins' },
        h3:{ block: 'h3', classes: 'heading3NummerEins' },
        h4:{ block: 'h4', classes: 'heading4NummerEins' },
        h5:{ block: 'h5', classes: 'heading5NummerEins' },
        h6:{ block: 'h6', classes: 'heading6NummerEins' },
      },
      menubar: false,
      statusbar: false,
      inline: true,
      fixed_toolbar_container: '#mytoolbar',
      content_style: '@import url(https://fonts.googleapis.com/css?family=Lato);*{border:0;padding:0;margin:0;background:0 0;color:inherit;box-sizing:border-box;background-repeat:no-repeat;background-position:50% 50%;font-weight:400}:focus{outline:0}a{text-decoration:none}b,b *,strong,strong *{font-weight:700}ol,ul{list-style:none}pre{font:inherit}button,input,input:not([type]),input[type=button],input[type=color],input[type=date],input[type=datetime-local],input[type=datetime],input[type=email],input[type=month],input[type=number],input[type=password],input[type=reset],input[type=search],input[type=submit],input[type=tel],input[type=text],input[type=time],input[type=url],input[type=week],select,textarea{font:inherit}@font-face{font-family:aileron;font-style:normal;font-weight:200;src:url(../fonts/aileron-ultra-light.eot?#iefix) format("embedded-opentype"),url(../fonts/aileron-ultra-light.woff) format("woff"),url(../fonts/aileron-ultra-light.ttf) format("truetype")}body{padding:1em}.codepen body{margin:10px 0 0}.codepen body textarea{display:none}.mce-content-body .Wirisformula{margin-top:-5px;}.mce-container textarea{display:inline-block!important}.mce-content-body{font-family:Lato!important;font-size:14px;color:#626262;padding:0 25px 25px}.mce-content-body *{background-position:initial}.mce-content-body h1{font-size:34px;font-family:aileron;font-weight:200;line-height:1.4em;margin:25px 0 15px}.mce-content-body h2{font-size:30px;font-family:aileron;font-weight:200;line-height:1.4em;margin:25px 0 15px}.mce-content-body h3{font-size:26px;font-family:aileron;font-weight:200;line-height:1.4em;margin:25px 0 15px}.mce-content-body h4{font-size:22px;font-family:aileron;font-weight:200;line-height:1.4em;margin:25px 0 15px}.mce-content-body h5{font-size:18px;font-family:aileron;font-weight:200;line-height:1.4em;margin:25px 0 15px}.mce-content-body h6{font-size:14px;font-family:aileron;font-weight:200;line-height:1.4em;margin:25px 0 15px}.mce-content-body p{margin:25px 0}.mce-content-body pre{font-family:monospace}.mce-content-body ol,.mce-content-body ul{margin-left:15px;list-style-position:outside;margin-bottom:20px}.mce-content-body ol li,.mce-content-body ul li{margin-left:10px;margin-bottom:10px;color:#626262}.mce-content-body ul{list-style-type:disc}.mce-content-body ol{list-style-type:decimal}.mce-content-body a[href]{text-decoration:underline}.mce-content-body table{width:100%;border-spacing:0;border-collapse:separate !important;border:1px solid #aaa}.mce-content-body table caption,.mce-content-body table td,.mce-content-body table th{padding:15px 7px;font:inherit}.mce-content-body table td,.mce-content-body table th{border:1px solid #aaa;border-collapse:separate}.mce-content-body table th{font-weight:400;color:#6e6e6e;background-position:100% 100%;background-size:2px 10px;background-repeat:no-repeat}.mce-content-body table th:last-child{background:0 0}.mce-content-body hr{border-top:2px solid #bbb}',
      toolbar: 'undo redo| bold italic underline strikethrough removeformat| alignleft aligncenter alignright alignjustify outdent indent numlist bullist | superscript subscript jsplus_special_symbols ',
      init_instance_callback: function (editor) {
        editor.fire('focus');
        editor.on('blur', function (e) {
            e.stopImmediatePropagation();
            e.preventDefault();
         });
      },
    }
  }
  componentDidUpdate(){
    let type = this.props.type
    console.log("props",this.props.type)
    tinymce.activeEditor.formatter.apply(type);
    console.log('DIDupdate was called:', e.target.getContent());
  }
  
  componentDidUpdate() {
    console.log("props",this.props.type)
  }
  handleEditorChange = (e) => {
    let type = this.props.type
    console.log("props",this.props.type)
    tinymce.activeEditor.formatter.apply(type);
    console.log('Content was updated:', e.target.getContent());
  }

  render() {
    
    return (
        <div className="Editor" >
        <Editor
          //initialValue ={initialVlaue}
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