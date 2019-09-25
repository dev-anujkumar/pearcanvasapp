// IMPORT - Plugins //
import React, { Component } from 'react';
// IMPORT - TinyMCE //
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver';
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";
import "tinymce/skins/content/default/content.css";
import "tinymce/plugins/lists";
import "tinymce/plugins/advlist";
import { EditorConfig } from '../../config/EditorConfig';
// IMPORT - Components/Dependencies //
import { bindKeyDownEvent } from '../ListElement/eventBinding.js';
// IMPORT - Assets //
import './style.css';

class CustomOrderedList extends Component {
    constructor(props) {
        super(props);
        this.editorConfig = {
            plugins: EditorConfig.plugins,
            selector: '#editor-elem',
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
                editor.on('keydown', (e) => {
                    bindKeyDownEvent(editor, e);
                });
            },
            init_instance_callback: (editor) => { }
        }
    }

    render() {
        return (
            <div id="editor-elem" className="editor-elem" contentEditable="true">
                <ol className="upper-alpha" data-treelevel='1' style={{ counterIncrement: "none" }}>
                    <li className="reset listItemNumeroUnoUpperAlpha">asdasdsad sadsadsa sdsadasd</li>
                    <li className="listItemNumeroUnoUpperAlpha"> dfsd sdf sdff sd sd fsd fsdfsd fs
                    <ol className="lower-alpha" data-treelevel='2'>
                            <li className="reset listItemNumeroUnoLowerAlpha"> fgdfg gfdgdf rtretreter
                        <ol className="lower-roman" data-treelevel='3'>
                                    <li className="reset listItemNumeroUnoLowerRoman">sdfsdf sdg treter dghfg</li>
                                    <li className="listItemNumeroUnoLowerRoman"> sdfsdf sdg treter dghfg
                            <ol className="decimal" data-treelevel='4'>
                                            <li className="reset listItemNumeroUnoNumber">qwertyu qwert sdfgh</li>
                                            <li className="listItemNumeroUnoNumber">qwertyu qwert sdfgh</li>
                                        </ol>
                                    </li>
                                </ol>
                            </li>
                        </ol>
                    </li>
                </ol>
            </div>
        )
    }

    componentDidMount() {
        tinymce.init(this.editorConfig);
    }

    componentDidUpdate() {
        tinymce.init(this.editorConfig);
    }
}
CustomOrderedList.displayName = "CustomOrderedList"

export default CustomOrderedList;
