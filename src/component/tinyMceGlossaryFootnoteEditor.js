import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { GlossaryFootnoteEditorConfig } from '../config/EditorConfig';

export default class ReactEditor extends React.Component {
    render() {
        // let classes = this.props.className ? this.props.className + " glossary-editable" : '' + " glossary-editable";
        // let id = 'glossary-' + this.props.index;
        // classes = this.props.className + " glossary-editable";
        return (
            <div>
                <Editor
                    init={{
                        toolbar: GlossaryFootnoteEditorConfig.toolbar,
                        menubar: false,
                        selector: '.editor',
                        //selector: 'div#glossary-editor-textarea',
                        inline: true,
                        // max_height: 50,
                        fixed_toolbar_container: '#toolbarGlo',
                        setup: (editor) => {

                        },
                        init_instance_callback: function (editor) {
                            editor.fire('focus');
                          },
                    }}
                />
            </div>
        )
    }
}