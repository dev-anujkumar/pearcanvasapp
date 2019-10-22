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
    metadataanchor,
    assetPopoverIcon
  } from "./../svgIcons.jsx";

export class TinyMceEditor extends Component {
    constructor(props) {
        super(props);
        let context = this;
        let viewLoEnable = true;
        this.chemistryMlMenuButton = null;
        this.mathMlMenuButton = null;
        this.assetPopoverButton = null;
        this.lastContent = '';
        this.editorConfig = {
            plugins: EditorConfig.plugins,
            selector: '#cypress-0',
            inline: true,
            formats: EditorConfig.formats,
            menubar: false,
            statusbar: false,
            inline: true,
            valid_elements : '*[*]',
            extended_valid_elements : '*[*]',
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
                this.setMetaDataAnchorIcon(editor);
                this.setMathmlFormulaIcon(editor);
                this.setAssetPopoverIcon(editor);
                this.addChemistryFormulaButton(editor);
                this.addMathmlFormulaButton(editor);
                this.addAssetPopoverIcon(editor);
                this.addFootnoteIcon(editor);
                this.addGlossaryIcon(editor);
                this.addInlineCodeIcon(editor);
                this.editorMousedown(editor);
                this.editorClick(editor);
                this.editorKeydown(editor);
                this.editorKeyup(editor);
                this.editorBeforeExecCommand(editor);
                this.editorExecCommand(editor);
                this.editorSlateTagIcon(editor);
                this.insertListButtonIcon(editor);
                // editor.on('keydown', function (e) {
                //     /* if (e.keyCode == 13) {
                //         e.preventDefault();
                //         return false;
                //     } */
                //     bindKeyDownEvent(editor, e);
                // });
                
            },

            init_instance_callback: (editor) => { 
                /* Reverting temp-data-mathml to data-mathml and class Wirisformula to temp_WirisFormula */ 
                let revertingTempContainerHtml = editor.getContentAreaContainer().innerHTML; 
                revertingTempContainerHtml = revertingTempContainerHtml.replace('temp-data-mathml','data-mathml').replace('temp_Wirisformula','Wirisformula');
                document.getElementById(editor.id).innerHTML = revertingTempContainerHtml;
            }
        }
        this.editorRef  = React.createRef();
    };

    /**
     * Adds custon list button to the editor toolbar
     * @param {*} editor  editor instance
     */
    insertListButtonIcon = (editor) => {
        insertListButton(editor);
    }
    /**
     * Adds LO item menu button to the editor toolbar
     * @param {*} editor  editor instance
     */
    editorSlateTagIcon = (editor) => {
        /* adding a slate tag button in toolbar */
        if(config.slateType == "section" && config.parentEntityUrn !== "Front Matter" && config.parentEntityUrn !== "Back Matter"){
            editor.ui.registry.addMenuButton('slateTag', {
                icon: 'metadataanchor',
                tooltip: "Slate Tag",
                fetch: function (callback) {
                if(context.props.currentSlateLOData && context.props.currentSlateLOData.label.en){
                    viewLoEnable=false;
                }
                //show dropdown options in slate tag 
                var dropdownItemArray = ["Add a New Learning Objective", "Add From Existing or Edit","View Learning Objective"];
                var items = [
                    {
                        
                        type: 'menuitem',
                        text: dropdownItemArray[0],
                        onAction: () => context.learningObjectiveDropdown(dropdownItemArray[0])
                    },
                    {
                        type: 'menuitem',
                        text: dropdownItemArray[1],
                        onAction: () => context.learningObjectiveDropdown(dropdownItemArray[1])
                    },
                    {
                        type: 'menuitem',
                        text: dropdownItemArray[2],
                        disabled:viewLoEnable,
                        onAction: () => context.learningObjectiveDropdown(dropdownItemArray[2])
                    }
                    
                ];
                callback(items);
                }
            });
        }
    }

    /**
     * This method is called when user clicks any button/executes command in the toolbar
     * @param {*} editor  editor instance
     */
    editorExecCommand = (editor) => {
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
        });
    }

    /**
     * This method is called when user clicks any button in the toolbar and before the command is executed.
     * @param {*} editor  editor instance
     */
    editorBeforeExecCommand = (editor) =>{
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
    }

    /**
     * This method is called when user clicks on editor.
     * @param {*} editor  editor instance
     */
    editorClick = (editor) =>{
        editor.on('click', (e) => {
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
    }

    /**
     * This method is called on keyUp.
     * @param {*} editor  editor instance
     */
    editorKeyup = (editor) => {
        editor.on('keyup', (e) => {
            let activeElement = editor.dom.getParent(editor.selection.getStart(), '.cypress-editable');
            if (activeElement) {
                if (!activeElement.children.length) {
                    //code to avoid deletion of editor first child(like p,h1,blockquote etc)
                    let div = document.createElement('div');
                    div.innerHTML = this.lastContent;
                    div.children[0].innerHTML = '<br/>';
                    activeElement.innerHTML = div.children[0].outerHTML;
                }
                else if (activeElement.children.length <= 1 && activeElement.children[0].tagName === 'BR') {
                    //code to avoid deletion of editor first child(like p,h1,blockquote etc)
                    let div = document.createElement('div');
                    div.innerHTML = this.lastContent;
                    div.children[0].innerHTML = '<br/>';
                    activeElement.innerHTML = div.children[0].outerHTML;
                }
                this.lastContent = activeElement.innerHTML;                       
                if (activeElement.innerText.trim().length) {
                    activeElement.classList.remove('place-holder')
                }
                else {
                    activeElement.classList.add('place-holder')
                }
            }
        });
    }

    /**
     * This method is called on keyDown.
     * @param {*} editor  editor instance
     */
    editorKeydown = (editor) => {
        editor.on('keydown', (e) => {
            if(this.isTabPressed(e)){
                e.preventDefault()
            }
            bindKeyDownEvent(editor, e);
            let activeElement = editor.dom.getParent(editor.selection.getStart(), '.cypress-editable');
            if (activeElement) {
                if (!activeElement.children.length) {
                    //code to avoid deletion of editor first child(like p,h1,blockquote etc)
                    let div = document.createElement('div');
                    div.innerHTML = this.lastContent;
                    div.children[0].innerHTML = '<br/>';
                    activeElement.innerHTML = div.children[0].outerHTML;
                }
                else if (activeElement.children.length <= 1 && activeElement.children[0].tagName === 'BR') {
                    let div = document.createElement('div');
                    div.innerHTML = this.lastContent;
                    div.children[0].innerHTML = '<br/>';
                    activeElement.innerHTML = div.children[0].outerHTML;
                }
                this.lastContent = activeElement.innerHTML;
            }
        });
    }

    /**
     * This method is called on Mouse down.
     * @param {*} editor  editor instance
     */
    editorMousedown = (editor) => {
        editor.on('mousedown',function(e) {
            if(context.props.slateLockInfo.isLocked && config.userId !== context.props.slateLockInfo.userId){
                e.preventDefault();
                e.stopPropagation()
                return false;
            }
        });
    }

    /**
     * Adds inline code formatting option to the toolbar
     * @param {*} editor  editor instance
     */
    addInlineCodeIcon = (editor) => {
        editor.ui.registry.addToggleButton('code', {
            text: '<i class="fa fa-code" aria-hidden="true"></i>',
            tooltip: "Inline code",
            onAction: () => {
                this.addInlineCode(editor)
            },
            onSetup: (api) => {
                this.handleFocussingInlineCode(api, editor)
            }
        });
    }

    /**
     * Detects TAB key press.
     * @param {*} keydownEvent  keyDown event
     */
    isTabPressed = (keydownEvent) => {
        const keyCode = keydownEvent.keyCode || keydownEvent.which
        if(this.props.element != "element-list" && keyCode == 9){
            return true
        }
        else{
            return false
        }
    }

    /**
     * Adds glossary button to the toolbar
     * @param {*} editor  editor instance
     */
    addGlossaryIcon = (editor) =>{
        editor.ui.registry.addButton('Glossary', {
            id: 'buttonId',
            classes: 'buttonClas',
            text: '<i class="fa fa-bookmark" aria-hidden="true"></i>',
            tooltip: "Glossary",
            onAction: () => this.addGlossary(editor)
        });
    }

    /**
     * Adds footnote button to the toolbar
     * @param {*} editor  editor instance
     */
    addFootnoteIcon = (editor) =>{
        editor.ui.registry.addButton('Footnote', {
            text: '<i class="fa fa-asterisk" aria-hidden="true"></i>',
            tooltip: "Footnote",
            onAction: () => this.addFootnote(editor)

        });
    }

    /**
     * Adds inline code formatting.
     * @param {*} editor  editor instance
     */
    addInlineCode = (editor) => {
        editor.execCommand('mceToggleFormat', false, 'code');
        let selectedText = window.getSelection().toString();
        if (selectedText != "") {
            editor.execCommand('mceToggleFormat', false, 'code');
            let insertionText = '<code>' + selectedText + '</code>'
            editor.insertContent(insertionText);
        }
    }

    /*
    *  handleFocussingInlineCode function is responsible for focussing inline Code Formatting button
    */
    handleFocussingInlineCode = (api,editor) => {
        api.setActive(editor.formatter.match('code'));
        var unbind = editor.formatter.formatChanged('code', api.setActive).unbind;
        return function () {
            if (unbind) unbind();
        };
    }

    /**
     * Adds Asset popover icon to the toolbar.
     * @param {*} editor  editor instance
     */
    setAssetPopoverIcon = editor => {
        editor.ui.registry.addIcon(
            "assetPopoverIcon",
            assetPopoverIcon
          );
    }

    /**
     * Adding custom icon for wiris chemistry editor
     * @param {*} editor  editor instance
     */
    setChemistryFormulaIcon = editor => {
        editor.ui.registry.addIcon(
          "tinymceFormulaChemistryIcon",
          tinymceFormulaChemistryIcon,
        );
      };

    /**
     * Adding custom icon for wiris Mathml editor
     * @param {*} editor  editor instance
     */
    setMathmlFormulaIcon = editor => {
        editor.ui.registry.addIcon("tinymceFormulaIcon", tinymceFormulaIcon);
    };

    /**
     * Adding custom icon for metadata anchor.
     * @param {*} editor  editor instance
     */
    setMetaDataAnchorIcon = editor => {
        editor.ui.registry.addIcon("metadataanchor", metadataanchor);
    };

    /**
     * Adding button and bind exec command on clicking the button to open the chemistry editor
     * @param {*} editor  editor instance
     */
    addChemistryFormulaButton = editor => {
        editor.ui.registry.addButton("tinyMcewirisformulaEditorChemistry", {
            text: "",
            icon: "tinymceformulachemistryicon",
            tooltip: "WIRIS EDITOR chemistry",
            onAction: function (_) {
            /*
                Enabling chemistry ML
            */
            let wirisChemistryInstance = window.WirisPlugin.instances[editor.id].getCore().getCustomEditors();
            wirisChemistryInstance.enable('chemistry');
            window.WirisPlugin.instances[editor.id].openNewFormulaEditor();
            //editor.execCommand("tiny_mce_wiris_openFormulaEditorChemistry");
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

    /**
     * Adding button and bind exec command on clicking the button to open the Mathml editor
     * Default command tiny_ce)wiris_openFormulaEditor is not working, so have added the command 
     * copying from wiris plugin file(onAction)
     * @param {*} editor  editor instance
     */
    addMathmlFormulaButton = editor => {
        editor.ui.registry.addButton("tinyMcewirisformulaEditor", {
            text: "",
            icon: "tinymceformulaicon",
            tooltip: "WIRIS EDITOR math",
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

    /**
     * Adding button for asset popover
     * @param {*} editor  editor instance
     */
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

    /**
     * Called before paste process
     * @param {*} plugin
     * @param {*} args
     */
    pastePreProcess = (plugin, args) => {
        let testElement = document.createElement('div');
        testElement.innerHTML = args.content;
        args.content = testElement.innerText;
    }

    /**
     * Handles indent behaviour for paragraph on indent command execution
     * @param {*} e  event object
     * @param {*} editor  editor instance
     * @param {*} content  content inside editor
     */
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

    /**
     * Handles outdent behaviour for paragraph on outdent command execution
     * @param {*} e  event object
     * @param {*} editor  editor instance
     * @param {*} content  content inside editor
     */
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

    /**
     * Performs action before indent command is executed
     * @param {*} e  event object
     * @param {*} content  content inside editor
     */
    onBeforeIndent = (e, content) => {
        if(content.match(/paragraphNumeroUnoIndentLevel3\b/)){
            e.preventDefault()
        }
    }

    /**
     * Performs action before outdent command is executed
     * @param {*} e  event object
     * @param {*} content  content inside editor 
     */
    onBeforeOutdent = (e, content) => {
        if(content.match(/paragraphNumeroUno\b/)){
            e.preventDefault()
        }
    }

    /**
     * Called when footnote button is clicked. Responsible for adding footnote
     * @param {*} editor  editor instance
     */
    addFootnote = (editor) => {
        editor.insertContent(`<sup><a href="#" id = "123" data-uri="' + "123" + data-footnoteelementid=  + "123" + class="Pearson-Component paragraphNumeroUnoFootnote">*</a></sup>`);
        this.props.openGlossaryFootnotePopUp(true, "Footnote");

    }
    learningObjectiveDropdown(text){
        this.props.learningObjectiveOperations(text);
    }

    /**
     * Called when glossary button is clicked. Responsible for adding glossary
     * @param {*} editor  editor instance 
     */
    addGlossary = (editor) => {
        let sectedText = window.getSelection().toString();
        let insertionText = '<dfn data-uri="' + "123" + '" class="Pearson-Component GlossaryTerm">' + sectedText + '</dfn>'
        if(sectedText !== ""){
            editor.insertContent(insertionText);
            this.props.openGlossaryFootnotePopUp(true, "Glossary");
        }
    }

    /**
     * Called when asset popover button is clicked. Responsible for adding asset popover
     * @param {*} editor  editor instance
     * @param {*} selectedText  selected text
     */
    addAssetPopover = (editor, selectedText) => {
        let insertionText = '<span id="asset-popover-attacher">' + selectedText + '</span>'
        editor.insertContent(insertionText); 
        this.props.openAssetPopoverPopUp(true);
    }

    /**
     * React's lifecycle method. Called immediately after a component is mounted. Setting state here will trigger re-rendering. 
     */
    componentDidMount() {
        const { slateLockInfo: { isLocked, userId } } = this.props
        /**
         * case -  initialize first tinymce instance on very first editor element by default
         */
        if (!tinymce.editors.length && !(isLocked && config.userId !== userId)) {
            this.editorRef.current.focus(); // element must be focused before
            this.editorConfig.selector = '#' + this.editorRef.current.id;
            tinymce.init(this.editorConfig).then((d) => { 
                if (this.editorRef.current) {
                    this.editorRef.current.blur();
                }
            })
        }
    }

    /**
     * React's lifecycle method. Called immediately after updating occurs. Not called for the initial render.
     */
    componentDidUpdate() {
        if (!tinymce.editors.length) {
            //console.log('tiny update')
            //tinymce.init(this.editorConfig)
        }
    }

    /**
     * handleClick | gets triggered when any editor element is clicked
     * @param {*} e  event object
     */
    handleClick = (e) => {
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
            /*
                Before removing the current tinymce instance, update wiris image attribute data-mathml to temp-data-mathml and class Wirisformula to temp_Wirisformula
                As removing tinymce instance, also updates the images made by the wiris plugin to mathml
            */
            let tempContainerHtml   =   tinyMCE.activeEditor.getContentAreaContainer().innerHTML;
            tempContainerHtml = tempContainerHtml.replace('data-mathml', 'temp-data-mathml').replace('Wirisformula','temp_Wirisformula'); 
            document.getElementById(tinyMCE.activeEditor.id).innerHTML = tempContainerHtml;

            tinymce.remove('#' + tinymce.activeEditor.id)
            if (document.getElementById(activeEditorId))
                document.getElementById(activeEditorId).contentEditable = true;
        }
        this.editorConfig.selector = '#' + e.currentTarget.id;

        /**
         * Using timeout - inti tinymce instance only when default events stack becomes empty
         */
        let timeoutInstance = setTimeout(() => {
            clearTimeout(timeoutInstance);
            tinymce.init(this.editorConfig).then((d)=>{console.log('tiny resolved 2',d)})
        });        
    }

    /**
     * handleBlur | gets triggered when any editor element is blurred
     * @param {*} e  event object
     */
    handleBlur = (e) => {
        this.props.handleBlur()
    }
    
    render() {
        const { slateLockInfo: { isLocked, userId } } = this.props;
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
            if (testElem.innerText == "" && !testElem.innerText.length)
                placeHolderClass = 'place-holder';
        }
        else if (this.props.model && this.props.model.figuredata && this.props.model.figuredata.text) {
            let testElem = document.createElement('div');
            testElem.innerHTML = this.props.model.figuredata.text;
            if (testElem.innerText == "" && !testElem.innerText.length) {
                placeHolderClass = 'place-holder';
            }
        } else if (this.props.model && this.props.model.figuredata && this.props.model.figuredata.preformattedtext) {
            let testElem = document.createElement('div');
            testElem.innerHTML = this.props.model.figuredata.preformattedtext;
            if (testElem.innerText == "" && !testElem.innerText.length) {
                placeHolderClass = 'place-holder';
            }
        }
            else {
                let testElem = document.createElement('div');
                testElem.innerHTML = this.props.model;
                if (testElem.innerText == "" && !testElem.innerText.length) {
                    placeHolderClass = 'place-holder';
                }
            }
                classes = this.props.className + " cypress-editable " + placeHolderClass;
                /**Render editable tag based on tagName*/
                switch (this.props.tagName) {
                    case 'p':
                        return (
                            <p ref={this.editorRef} id={id} onBlur={this.handleBlur} onClick={this.handleClick} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={!lockCondition}>{htmlToReactParser.parse(this.props.model)}</p>
                        );
                    case 'h4':
                        return (
                            <h4 ref={this.editorRef} id={id} onBlur={this.handleBlur} onClick={this.handleClick} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={!lockCondition}></h4>
                        )
                    case 'code':
                        return (
                            <code ref={this.editorRef} id={id} onBlur={this.handleBlur} onClick={this.handleClick} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={!lockCondition}>{htmlToReactParser.parse(this.props.model)}</code>
                        )
                    default:
                        return (
                            <div ref={this.editorRef} id={id} onBlur={this.handleBlur} onClick={this.handleClick} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={!lockCondition} dangerouslySetInnerHTML={{ __html: this.props.model && this.props.model.text ? this.props.model.text: '<p class="paragraphNumeroUno"></p>'}} onChange={this.handlePlaceholder}>{/* htmlToReactParser.parse(this.props.model.text) */}</div>
                        )
                }
            }
        }

        TinyMceEditor.propTypes = {
            /** class name of the element type to be rendered */
            className: PropTypes.string

        };

        TinyMceEditor.defaultProps = {
            error: null,
        };

        export default TinyMceEditor;

