import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import 'font-awesome/css/font-awesome.css';
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
import { authorAssetPopOver} from './AssetPopover/openApoFunction.js';
import {
    tinymceFormulaIcon,
    tinymceFormulaChemistryIcon,
    assetPopoverIcon
  } from "./../svgIcons.jsx";

export class TinyMceEditor extends Component {
    constructor(props) {
        super(props);
        let context = this;
        this.chemistryMlMenuButton = null;
        this.mathMlMenuButton = null;
        this.assetPopoverButton = null;
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
                this.setChemistryFormulaIcon(editor);
                this.setMathmlFormulaIcon(editor);
                this.setAssetPopoverIcon(editor);
                this.addChemistryFormulaButton(editor);
                this.addMathmlFormulaButton(editor);
                this.addAssetPopoverIcon(editor);
                editor.on('keydown', function (e) {
                    /* if (e.keyCode == 13) {
                        e.preventDefault();
                        return false;
                    } */
                    bindKeyDownEvent(editor, e);
                });
                
                insertListButton(editor);
                editor.on('mousedown',function(e) {
                    if(context.props.slateLockInfo.isLocked && config.userId !== context.props.slateLockInfo.userId){
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
                    }else if (e.target.nodeName == 'ABBR'){
                        let assetId = e.target.attributes['asset-id'].nodeValue;
                        let dataUrn = e.target.attributes['data-uri'].nodeValue;
                        let apoObject = {
                            'assetId' : assetId,
                            'dataUrn' : dataUrn
                        }
                        authorAssetPopOver(true, apoObject);
                    }else {
                        this.props.openGlossaryFootnotePopUp(false);
                    }
                });

                editor.on('keyup', (e) => {
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
        this.editorRef  = React.createRef();
    };

    setAssetPopoverIcon = editor => {
        editor.ui.registry.addIcon(
            "assetPopoverIcon",
            assetPopoverIcon
          );
    }

    setChemistryFormulaIcon = editor => {
        /*
          Adding custom icon for wiris chemistry editor
        */
        editor.ui.registry.addIcon(
          "tinymceFormulaChemistryIcon",
          tinymceFormulaChemistryIcon
        );
      };
      setMathmlFormulaIcon = editor => {
        /*
          Adding custom icon for wiris Mathml editor
        */
        editor.ui.registry.addIcon("tinymceFormulaIcon", tinymceFormulaIcon);
      };
      addChemistryFormulaButton = editor => {
        /*
          Adding button and bind exec command on clicking the button to open the chemistry editor
        */
        editor.ui.registry.addButton("tinyMcewirisformulaEditorChemistry", {
          text: "",
          icon: "tinymceformulachemistryicon",
          tooltip: "Wiris editor chemistry",
          onAction: function (_) {
            editor.execCommand("tiny_mce_wiris_openFormulaEditorChemistry");
          },
          onSetup: (buttonApi) => {
            /*
              make merge menu button apis available globally among compnenet
            */
            this.chemistryMlMenuButton = buttonApi;
            //this.chemistryMlMenuButton.setDisabled(true);
          }
        });
      };
      addMathmlFormulaButton = editor => {
        /*
          Adding button and bind exec command on clicking the button to open the Mathml editor
          Default command tiny_ce)wiris_openFormulaEditor is not working, so have added the command 
          copying from wiris plugin file(onAction)
        */
        editor.ui.registry.addButton("tinyMcewirisformulaEditor", {
          text: "",
          icon: "tinymceformulaicon",
          tooltip: "Wiris editor math",
          onAction: function (_) {
            var wirisPluginInstance = window.WirisPlugin.instances[editor.id];
            wirisPluginInstance.core.getCustomEditors().disable();
            wirisPluginInstance.openNewFormulaEditor();
            //editor.execCommand('tiny_mce_wiris_openFormulaEditor');
          },
          onSetup: (buttonApi) => {
            /*
              make merge menu button apis available globally among compnenet
            */
            this.mathMlMenuButton = buttonApi;
            //this.mathMlMenuButton.setDisabled(true);
          }
        });
      };
    addAssetPopoverIcon = editor => {
        editor.ui.registry.addButton("assetPopoverIcon", {
            text: "",
            icon: "assetpopovericon",
            tooltip: "Asset Popover",
            onAction:  () =>{
            //console.log('asset poppover clicked');
            let selectedText = window.getSelection().toString();
            if(selectedText.length){
                this.addAssetPopover(editor, selectedText)
            }
            
            },
            onSetup: (buttonApi) => {
            /*
            make merge menu button apis available globally among compnenet
            */
            this.assetPopoverButton = buttonApi;
            // this.assetPopoverButton.setDisabled(true);           
            }
        });
    }
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
        if(sectedText !== ""){
            editor.insertContent(insertionText);
            this.props.openGlossaryFootnotePopUp(true, "Glossary");
        }
    }

    addAssetPopover = (editor, selectedText) => {
        let insertionText = '<span id="asset-popover-attacher">' + selectedText + '</span>'
        editor.insertContent(insertionText); 
        this.props.openAssetPopoverPopUp(true);
    }

    componentDidMount() {
        const { slateLockInfo: { isLocked, userId } } = this.props
        /**
         * case -  initialize first tinymce instance on very first editor element by default
         */
        console.log('tinymce didmount')
        if (!tinymce.editors.length && true) {
            this.editorRef.current.focus(); // element must be focused before
            this.editorConfig.selector = '#' + this.editorRef.current.id;
            tinymce.init(this.editorConfig).then((d) => { this.editorRef.current.blur() })
        }
    }
    componentDidUpdate() {
        console.log('TINY UPDATE')
        if (!tinymce.editors.length) {
            console.log('tiny update')
            //tinymce.init(this.editorConfig)
        }
    }

    handleFocus = (e) => {
        this.props.handleEditorFocus();
        /**
         * case - if active editor and editor currently being focused is same
         */
        if (tinymce.activeEditor && tinymce.activeEditor.id === e.currentTarget.id) {
            return false;
        }

        // tinymce.$('#tinymceToolbar.tox.tox-tinymce.tox-tinymce-inline').remove();
        let toolBar = document.querySelector('#tinymceToolbar .tox.tox-tinymce.tox-tinymce-inline');
        if(toolBar){
            toolBar.parentNode.removeChild(toolBar)
        }
        /**
         * case - if tinymce already has an active editor then...
         * first remove current tinymce instance then prepare element currently being focused to get tinymce intialized
         */
        if (tinymce.activeEditor && !(tinymce.activeEditor.id.includes('glossary') || tinymce.activeEditor.id.includes('footnote'))) {
            let activeEditorId = tinymce.activeEditor.id;
            tinymce.remove('#' + tinymce.activeEditor.id)
            if (document.getElementById(activeEditorId))
                document.getElementById(activeEditorId).contentEditable = true;
        }
        this.editorConfig.selector = '#' + e.currentTarget.id;
        let timeoutInstance = setTimeout(() => {
            clearTimeout(timeoutInstance);
            tinymce.init(this.editorConfig).then((d)=>{console.log('tiny resolved 2',d)})
        });        
    }

    handleBlur = (e) => {
        this.props.handleBlur()
    }
    render() {
        const { slateLockInfo: { isLocked, userId } } = this.props
        console.log("locked------>", isLocked)
        const lockCondition = isLocked && config.userId !== userId
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
                            <p ref={this.editorRef} id={id} onBlur={this.handleBlur} onClick={this.handleFocus} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={!lockCondition}>{htmlToReactParser.parse(this.props.model)}</p>
                        );
                    case 'h4':
                        return (
                            <h4 ref={this.editorRef} id={id} onBlur={this.handleBlur} onClick={this.handleFocus} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={!lockCondition}></h4>
                        )
                    case 'code':
                        return (
                            <code ref={this.editorRef} id={id} onBlur={this.handleBlur} onClick={this.handleFocus} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={!lockCondition}>{htmlToReactParser.parse(this.props.model)}</code>
                        )
                    default:
                        return (
                            <div ref={this.editorRef} id={id} onBlur={this.handleBlur} onClick={this.handleFocus} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={!lockCondition} dangerouslySetInnerHTML={{ __html: this.props.model && this.props.model.text ? this.props.model.text: ""}} onChange={this.handlePlaceholder}>{/* htmlToReactParser.parse(this.props.model.text) */}</div>
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

