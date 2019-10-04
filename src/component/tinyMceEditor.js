import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.css';
//IMPORT TINYMCE 
import { Editor } from '@tinymce/tinymce-react';
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver';
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";
import "tinymce/skins/content/default/content.css";
import "tinymce/plugins/lists";
import "tinymce/plugins/advlist";
import "tinymce/plugins/paste";
// IMPORT - Components & Dependencies //
import { EditorConfig } from '../config/EditorConfig';
import { setActiveElement } from './CanvasWrapper/CanvasWrapper_Actions';
import GlossaryFootnoteMenu from './GlossaryFootnotePopup/GlossaryFootnoteMenu.jsx';
//import './../styles/Tiny.css';
import config from '../config/config';
//import { ReactDOMServer }  from 'react-dom/server';
const HtmlToReactParser = require('html-to-react').Parser;
const htmlToReactParser = new HtmlToReactParser();
import { insertListButton, bindKeyDownEvent } from './ListElement/eventBinding.js';

export class TinyMceEditor extends Component {
    constructor(props) {
        super(props);
        let context = this
        this.editorConfig = {
            plugins: EditorConfig.plugins,
            selector: '#cypress-0',
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
            paste_preprocess: this.pastePreProcess,
            setup: (editor) => {
                editor.on('keydown', function (e) {
                    /* if (e.keyCode == 13) {
                        e.preventDefault();
                        return false;
                    } */
                    bindKeyDownEvent(editor, e);
                });
                
                insertListButton(editor);
                editor.on('mousedown',function(e) {
                    if(context.props.slateLockInfo.isLocked){
                        e.preventDefault();
                        e.stopPropagation()
                        return false;
                    }
                })
                editor.on('click', (e) => {
                    console.log('Editor was clicked: ', e.target.nodeName);
                    if (e.target.parentElement.nodeName == "SUP") {
                        this.props.openGlossaryFootnotePopUp(true, "Footnote");
                    }
                    else if (e.target.nodeName == "DFN") {
                        this.props.openGlossaryFootnotePopUp(true, "Glossary");
                    } else {
                        this.props.openGlossaryFootnotePopUp(false);
                    }
                });
                editor.on('nodeChange', (e) => {
                    let activeElement = editor.dom.getParent(editor.selection.getStart(), '.cypress-editable');
                    if (activeElement) {
                        if (activeElement.innerText.trim().length) {
                            activeElement.classList.remove('place-holder')
                        }
                        else {
                            activeElement.classList.add('place-holder')
                        }
                    }
                });
                editor.ui.registry.addButton('Footnote', {
                    text: '<i class="fa fa-asterisk" aria-hidden="true"></i>',
                    onAction: () => this.addFootnote(editor)

                });
                editor.ui.registry.addButton('Glossary', {
                    text: '<i class="fa fa-bookmark" aria-hidden="true"></i>',
                    onAction: () => this.addGlossary(editor)
                });

                editor.on('BeforeExecCommand', (e) => {
                    let content = e.target.getContent()
                    switch(e.command){
                        case "indent":
                            this.onBeforeIndent(e, content)
                            break;
                        case "outdent":
                            this.onBeforeOutdent(e, content)
                            break;
                    }
                })

                editor.on('ExecCommand', (e) => {
                    let content = e.target.getContent()
                    switch(e.command){
                        case "indent":
                            this.handleIndent(e, editor, content)
                            break;

                        case "outdent":
                            this.handleOutdent(e, editor, content)
                            break;
                    }
                })
            },

            init_instance_callback: (editor) => {
                //  editor.fire('focus');                 

            }
        }
    };
    pastePreProcess = (plugin, args) => {
        let testElement = document.createElement('div');
        testElement.innerHTML = args.content;
        args.content = testElement.innerText;
    }
    handleIndent = (e, editor, content) => {
        if(content.match(/paragraphNumeroUno\b/)){
            content = content.replace(/paragraphNumeroUno\b/, "paragraphNumeroUnoIndentLevel1")
        } 
        else if(content.match(/paragraphNumeroUnoIndentLevel1\b/)){
            content = content.replace(/paragraphNumeroUnoIndentLevel1\b/, "paragraphNumeroUnoIndentLevel2")
        }
        else if(content.match(/paragraphNumeroUnoIndentLevel2\b/)){
            content = content.replace(/paragraphNumeroUnoIndentLevel2\b/, "paragraphNumeroUnoIndentLevel3")
        }
        editor.setContent(content)
    }
    handleOutdent = (e, editor, content) => {
        if(content.match(/paragraphNumeroUnoIndentLevel3\b/)){
            content = content.replace(/paragraphNumeroUnoIndentLevel3\b/, "paragraphNumeroUnoIndentLevel2")
        } 
        else if(content.match(/paragraphNumeroUnoIndentLevel2\b/)){
            content = content.replace(/paragraphNumeroUnoIndentLevel2\b/, "paragraphNumeroUnoIndentLevel1")
        }
        else if(content.match(/paragraphNumeroUnoIndentLevel1\b/)){
            content = content.replace(/paragraphNumeroUnoIndentLevel1\b/, "paragraphNumeroUno")
        }
        editor.setContent(content)
    }
    onBeforeIndent = (e, content) => {
        if(content.match(/paragraphNumeroUnoIndentLevel3\b/)){
            e.preventDefault()
        }
    }
    onBeforeOutdent = (e, content) => {
        if(content.match(/paragraphNumeroUno\b/)){
            e.preventDefault()
        }
    }
    addFootnote = (editor) => {
        editor.insertContent(`<sup><a href="#" id = "123" data-uri="' + "123" + data-footnoteelementid=  + "123" + class="Pearson-Component paragraphNumeroUnoFootnote">*</a></sup>`);
        this.props.openGlossaryFootnotePopUp(true, "Footnote");

    }
    addGlossary = (editor) => {
        let sectedText = window.getSelection().toString();
        let insertionText = '<dfn data-uri="' + "123" + '" class="Pearson-Component GlossaryTerm">' + sectedText + '</dfn>'
        editor.insertContent(insertionText);
        this.props.openGlossaryFootnotePopUp(true, "Glossary");


    }

    componentDidMount() {
        if (config.currentInsertedType === "TEXT") {
            document.getElementById("cypress-" + config.currentInsertedIndex).focus();
        } else if (config.currentInsertedType === "IMAGE" || config.currentInsertedType === "VIDEO" || config.currentInsertedType === "INTERACTIVE") {
            document.getElementById("cypress-" + config.currentInsertedIndex + "-0").focus();
        }

        const { slateLockInfo: { isLocked } } = this.props
        if (!tinymce.editors.length && !isLocked) {
            tinymce.init(this.editorConfig)
        }
    }
    componentDidUpdate() {
        if (!tinymce.editors.length) {
            tinymce.init(this.editorConfig)
        }
        console.log("updaewwwww====>");
    }

    handleFocus = (e) => {
        this.props.handleEditorFocus();

        console.log("activeEditor=====>", tinymce.activeEditor);
        if (tinymce.activeEditor && tinymce.activeEditor.id === e.target.id) {
            return false;
        }

        // tinymce.$('#tinymceToolbar.tox.tox-tinymce.tox-tinymce-inline').remove();
        let toolBar = document.querySelector('#tinymceToolbar .tox.tox-tinymce.tox-tinymce-inline');
        if(toolBar){
            toolBar.parentNode.removeChild(toolBar)
        }
        // if(tinymce.activeEditor && tinymce.activeEditor.id !== e.target.id){
        //     tinymce.remove('#' +tinymce.activeEditor.id)
        //     document.getElementById(e.target.id).contentEditable = true;
        //     document.getElementById(e.target.id).focus();
        // }

        if (tinymce.activeEditor && !(tinymce.activeEditor.id.includes('glossary') || tinymce.activeEditor.id.includes('footnote'))) {
            let activeEditorId = tinymce.activeEditor.id;
            tinymce.remove('#' + tinymce.activeEditor.id)
            if (document.getElementById(activeEditorId))
                document.getElementById(activeEditorId).contentEditable = true;
        }
        this.editorConfig.selector = '#' + e.target.id;
        tinymce.init(this.editorConfig);
    }

    handleBlur = (e) => {
        this.props.handleBlur()
    }
    render() {
        const { slateLockInfo: { isLocked } } = this.props
        console.log("locked------>", isLocked)
        /* const { slateLockInfo } = this.props
        const isLocked = slateLockInfo && slateLockInfo.isLocked ? true : false */
        // if(tinymce.activeEditor !== null && tinymce.activeEditor && tinymce.activeEditor.id) {
        //     let activeEditorId = tinymce.activeEditor.id;
        //     let element = document.getElementById(activeEditorId);
        //     tinymce.remove('#'+tinymce.activeEditor.id)
        //     element.contentEditable = true;
        //     this.editorConfig.selector='#'+activeEditorId;
        //     tinymce.init(this.editorConfig);
        // }

        let classes = this.props.className ? this.props.className + " cypress-editable" : '' + " cypress-editable";
        let id = 'cypress-' + this.props.index;
        let placeHolderClass = '';
        if (this.props.model && this.props.model.text) {
            let testElem = document.createElement('div');
            testElem.innerHTML = this.props.model.text;
            if (!testElem.innerText.length)
                placeHolderClass = 'place-holder';
        }
        else if (this.props.model && this.props.model.figuredata && this.props.model.figuredata.text) {
            let testElem = document.createElement('div');
            testElem.innerHTML = this.props.model.figuredata.text;
            if (!testElem.innerText.length) {
                placeHolderClass = 'place-holder';
            }
        } else if (this.props.model && this.props.model.figuredata && this.props.model.figuredata.preformattedtext) {
            let testElem = document.createElement('div');
            testElem.innerHTML = this.props.model.figuredata.preformattedtext;
            if (!testElem.innerText.length) {
                placeHolderClass = 'place-holder';
            }
        }
            else {
                let testElem = document.createElement('div');
                testElem.innerHTML = this.props.model;
                if (!testElem.innerText.length) {
                    placeHolderClass = 'place-holder';
                }
            }
                classes = this.props.className + " cypress-editable " + placeHolderClass;
                /**Render editable tag based on tagName*/
                switch (this.props.tagName) {
                    case 'p':
                        return (
                            <p id={id} onBlur={this.handleBlur} onFocus={this.handleFocus} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={!isLocked}>{htmlToReactParser.parse(this.props.model)}</p>
                        );
                    case 'h4':
                        return (
                            <h4 id={id} onBlur={this.handleBlur} onFocus={this.handleFocus} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={!isLocked}></h4>
                        )
                    case 'code':
                        return (
                            <code id={id} onBlur={this.handleBlur} onFocus={this.handleFocus} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={!isLocked}>{htmlToReactParser.parse(this.props.model)}</code>
                        )
                    default:
                        return (
                            <div id={id} onBlur={this.handleBlur} onFocus={this.handleFocus} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={!isLocked} dangerouslySetInnerHTML={{ __html: this.props.model && this.props.model.text ? this.props.model.text: ""}} onChange={this.handlePlaceholder}>{/* htmlToReactParser.parse(this.props.model.text) */}</div>
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
                // setActiveElement
            }
        )(TinyMceEditor);

