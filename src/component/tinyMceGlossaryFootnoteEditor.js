// import React from 'react';
// import { Editor } from '@tinymce/tinymce-react';
// import { GlossaryFootnoteEditorConfig } from '../config/EditorConfig';

// export default class ReactEditor extends React.Component {
// constructor(props){
//     super(props);
//     this.state={}
// }

//     onEditorBlur = (editor) => {
//         editor.on('blur', function (e) {
//             e.stopImmediatePropagation();
//             e.preventDefault();
//         });
//     };
//     handleEditorChange = (e) => {

//         console.log('Content was updated:', e.target.getContent());

//         tinymce.activeEditor.formatter.apply(this.props.elementFormat);


//       }

//     render() {
// console.log("class",this.props.className)
//         return (
//             <div className={this.props.className}>
//                 <Editor
//                     init={{
//                         toolbar: GlossaryFootnoteEditorConfig.toolbar,
//                         menubar: false,
//                         selector: '.definition-editor',
//                         //selector: 'div#glossary-editor-textarea',
//                         inline: true,
//                         // max_height: 50,
//                         fixed_toolbar_container: '#toolbarGlo',
//                         setup: (editor) => {
//                             this.onEditorBlur(editor);
//                         },
//                         init_instance_callback: function (editor) {
//                             editor.fire('focus');
//                         },
//                     }}
//                     onChange={this.handleEditorChange}

//                 />
//             </div>
//         )
//     }
// }



import React from 'react';
import PropTypes from 'prop-types';
//IMPORT TINYMCE
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver';
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";
import "tinymce/skins/content/default/content.css";
import "tinymce/plugins/lists";
import "tinymce/plugins/advlist";
import { GlossaryFootnoteEditorConfig } from '../config/EditorConfig';
//import { ReactDOMServer }  from 'react-dom/server';
const HtmlToReactParser = require('html-to-react').Parser;
const htmlToReactParser = new HtmlToReactParser();
export class ReactEditor extends React.Component {
    constructor(props) {
        super(props);
        this.GlossaryFootnoteEditorConfig = {
            plugins: GlossaryFootnoteEditorConfig.plugins,
            selector: '#glossary-editable-0',
            inline: true,
            formats: GlossaryFootnoteEditorConfig.formats,
            menubar: false,
            //statusbar: false,
            inline: true,
            object_resizing: false,
            fixed_toolbar_container: '#toolbarGlossaryFootnote',
            toolbar: GlossaryFootnoteEditorConfig.toolbar,
            image_advtab: false,
            setup: (editor) => {
                this.onEditorBlur(editor);
            },
            init_instance_callback: (editor) => {
                //  editor.fire('focus');                 

            }
        }
    };
    componentDidMount() {
        if (!tinymce.editors.length) {
            tinymce.init(this.GlossaryFootnoteEditorConfig)
        }

    }
    componentDidUpdate() {
        if (!tinymce.editors.length) {
            tinymce.init(this.GlossaryFootnoteEditorConfig)
        }
    }
    onEditorBlur = (editor) => {
        editor.on('blur', function (e) {
            e.stopImmediatePropagation();
            e.preventDefault();
        });
    };

    handleFocus = (e) => {
        if (tinymce.activeEditor && tinymce.activeEditor.id === e.target.id)
            return false;
        if (tinymce.activeEditor) {
            let activeEditorId = tinymce.activeEditor.id;

            tinymce.remove('#' + tinymce.activeEditor.id)
            document.getElementById(activeEditorId).contentEditable = true;
        }
        this.GlossaryFootnoteEditorConfig.selector = '#' + e.target.id
        tinymce.init(this.GlossaryFootnoteEditorConfig)
    }

    render() {

        let classes = this.props.className ? this.props.className + " glossary-editable" : '' + " glossary-editable";
        let id = 'glossary-' + this.props.index;
        classes = this.props.className + " glossary-editable";
        /**Render editable tag based on tagName*/
        return (
            <p id={id} onFocus={this.handleFocus} className={classes} placeholder={this.props.placeholder} contentEditable="true">{htmlToReactParser.parse(this.props.model)}</p>
        )
    }
}
ReactEditor.propTypes = {
    /** class name of the element type to be rendered */
    className: PropTypes.string,
    /** Detail of element in JSON object */
    model: PropTypes.object,

};

ReactEditor.defaultProps = {
    error: null,
};

export default ReactEditor;

