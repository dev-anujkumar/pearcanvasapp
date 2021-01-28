import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//IMPORT TINYMCE 
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver';
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";
import "tinymce/skins/content/default/content.css";
import "tinymce/plugins/lists";
import "tinymce/plugins/advlist";
import "tinymce/plugins/paste";
import 'tinymce/plugins/imagetools'
// IMPORT - Components & Dependencies //
import { EditorConfig, FormatSelectors, elementTypeOptions } from '../config/EditorConfig';
import config from '../config/config';
import { insertListButton, bindKeyDownEvent, insertUoListButton, preventRemoveAllFormatting, removeTinyDefaultAttribute, removeListHighliting, highlightListIcon } from './ListElement/eventBinding.js';
import { authorAssetPopOver } from './AssetPopover/openApoFunction.js';
import {
    tinymceFormulaIcon, tinymceFormulaChemistryIcon, assetPopoverIcon, crossLinkIcon, code, Footnote, bold, Glossary, undo, redo, italic, underline, strikethrough, removeformat, subscript, superscript, charmap, downArrow, orderedList, unorderedList, indent, outdent, addImage
} from '../images/TinyMce/TinyMce.jsx';
import { getGlossaryFootnoteId } from "../js/glossaryFootnote";
import { checkforToolbarClick, customEvent, spanHandlers, removeBOM, getWirisAltText, removeImageCache } from '../js/utils';
import { saveGlossaryAndFootnote, setFormattingToolbar } from "./GlossaryFootnotePopup/GlossaryFootnote_Actions";
import { audioGlossaryPopup} from './AudioNarration/AudioNarration_Actions';
import { ShowLoader, LaunchTOCForCrossLinking } from '../constants/IFrameMessageTypes';
import { sendDataToIframe, hasReviewerRole, removeBlankTags } from '../constants/utility.js';
import store from '../appstore/store';
import { MULTIPLE_LINE_POETRY_ERROR_POPUP } from '../constants/Action_Constants';
import { ERROR_CREATING_GLOSSARY, ERROR_CREATING_ASSETPOPOVER } from '../component/SlateWrapper/SlateWrapperConstants.js';
import { conversionElement } from './Sidebar/Sidebar_Action';
import { wirisAltTextPopup } from './SlateWrapper/SlateWrapper_Actions';
import elementList from './Sidebar/elementTypes';
import { handleC2MediaClick }  from '../js/TinyMceUtility.js';
let context = {};
let clickedX = 0;
let clickedY = 0;

export class TinyMceEditor extends Component {
    constructor(props) {
        super(props);
        context = this;
        this.state = { popup: false }
        this.placeHolderClass = ''
        this.indentRun = false;
        this.outdentRun = false;
        this.chemistryMlMenuButton = null;
        this.mathMlMenuButton = null;
        this.assetPopoverButtonState = null;
        this.glossaryTermText = '';
        this.copyContent = '';
        this.lastContent = '';
        this.clearFormateText = '';
        this.isctrlPlusV = false;
        this.fromtinyInitBlur = false;
        this.notFormatting = true;
        this.gRange = null;
        this.wirisClick = 0;
        this.editorConfig = {
            plugins: EditorConfig.plugins,
            selector: '#cypress-0',
            inline: true,
            formats: EditorConfig.formats,
            menubar: false,
            statusbar: false,
            valid_elements: '*[*]',
            extended_valid_elements: '*[*]',
            fixed_toolbar_container: '#tinymceToolbar',
            content_style: EditorConfig.contentStyle,
            toolbar: EditorConfig.toolbar,
            padd_empty_with_br: true,
            image_advtab: false,
            force_br_newlines: true,
            forced_root_block: '',
            remove_linebreaks: false,
            object_resizing : 'img',
            imagetools_cors_hosts: ['*://*pearson.com',"localhost:*"],
            imagetools_credentials_hosts:['pearson.com'],
            resize_img_proportional: false,
            imagetools_toolbar: 'rotateleft rotateright | flipv fliph',
            paste_preprocess: this.pastePreProcess,
            paste_postprocess: this.pastePostProcess,
            force_p_newlines: false,
            setup: (editor) => {
                if (this.props.permissions && this.props.permissions.includes('authoring_mathml')) {
                    this.setChemistryFormulaIcon(editor);
                    this.setMathmlFormulaIcon(editor);
                    this.addChemistryFormulaButton(editor);
                    this.addMathmlFormulaButton(editor);
                }
                this.setCrossLinkingIcon(editor);
                this.addCrossLinkingIcon(editor);
                this.setAssetPopoverIcon(editor);
                this.addAssetPopoverIcon(editor);
                this.handleSpecialCharIcon(editor);
                this.handleAddMediaIcon(editor);
                this.setFootnoteIcon(editor);
                this.addFootnoteIcon(editor);
                this.setGlossaryIcon(editor);
                this.addGlossaryIcon(editor);
                this.setInlineIcon(editor);
                this.addInlineCodeIcon(editor);
                this.editorClick(editor);
                this.editorKeydown(editor);
                this.editorKeyup(editor);
                this.editorPaste(editor);
                this.editorBeforeExecCommand(editor);
                this.editorExecCommand(editor);
                this.insertListButtonIcon(editor);
                this.clearUndoStack(editor);
                /* Dropdown for showing text type elements */
                this.changeTextElements(editor);
                /* change the default icons of tinymce with new svg */
                this.setDefaultIcons(editor)
                editor.on('init', function (e) {
                    if (document.querySelector('.audio')) {
                        document.querySelector('.audio').style.display = "block";
                    }
                    /**
                    * This code is written to remove lagging in typing and move cursor at end on focus
                    */
                });
                tinymce.$('.blockquote-editor').attr('contenteditable', false)
            },

            init_instance_callback: (editor) => {
                tinymce.$('.blockquote-editor').attr('contenteditable', false)

                if (this.props.permissions && !(this.props.permissions.includes('access_formatting_bar') || this.props.permissions.includes('elements_add_remove'))) {        // when user doesn't have edit permission
                    if (editor && editor.id) {
                        document.getElementById(editor.id).setAttribute('contenteditable', false);
                        if (tinymce.$('.blockquoteMarginaliaAttr .paragraphNummerEins')) {
                            tinymce.$('.blockquoteMarginaliaAttr .paragraphNummerEins').attr('contenteditable', false)
                        }
                    }
                }
                tinymce.activeEditor.on('ObjectResizeStart', function (e) {
                    if (e.target && e.target.nodeName == 'IMG' && (e.target.classList.length > 0 && (e.target.classList.includes('Wirisformula') || e.target.classList.includes('temp_Wirisformula')))) {
                        e.preventDefault();//prevent resize
                    }
                });

                editor.on('Change', (e) => {
                    /*
                        if content is caused by wiris then call blur
                    */
                    if (e.originalEvent && e.originalEvent.command === "mceInsertContent") {
                        let specialCharSpan = document.getElementById('specialChar');
                        if (specialCharSpan) {
                            if (this.props.element && this.props.element.type === 'element-blockfeature' && this.props.element.elementdata && this.props.element.elementdata.type !== "pullquote") {
                                specialCharSpan.remove();
                            } else {
                                specialCharSpan.outerHTML = specialCharSpan.innerHTML;
                            }
                            e.preventDefault();
                            return false;
                        }
                    }
                    if (!e.level && editor.selection.getBoundingClientRect()) {
                        clickedX = editor.selection.getBoundingClientRect().left;
                        clickedY = editor.selection.getBoundingClientRect().top;

                        //BG-2376 - removing span bookmark from content
                        tinymce.$('span[data-mce-type="bookmark"]').each(function () {
                            let innerHtml = this.innerHTML;
                            this.outerHTML = innerHtml;
                        })
                        tinymce.$('.Wirisformula').each(function () {
                            let mathformula = this.getAttribute('mathmlformula')
                            if(mathformula){
                                let res = mathformula.substr(0, 2);
                                let res2=mathformula.substr(2, 2);
                                let s3ImagePath=config.S3MathImagePath?config.S3MathImagePath:"https://cite-media-stg.pearson.com/legacy_paths/wiris-dev-mathtype-cache-use/cache/"
                                let path=s3ImagePath+res+'/'+res2+'/'+mathformula+'.png'+ '?' + (new Date()).getTime()
                                this.setAttribute('src', path)
                                this.removeAttribute('mathmlformula')
                            }
                        });
                        if (!config.savingInProgress) {
                            if ((this.props.element.type === "popup" || this.props.element.type === "citations") && !this.props.currentElement) {
                                this.props.createPopupUnit(this.props.popupField, true, this.props.index, this.props.element)
                            } else if (this.props.element && this.props.element.type === "poetry" && !this.props.currentElement) {
                                this.props.createPoetryElements(this.props.poetryField, true, this.props.index, this.props.element)
                            } else {
                                let showHideType = this.props.showHideType || null
                                showHideType = showHideType === "revel" ? "postertextobject" : showHideType
                                this.props.handleBlur(null, this.props.currentElement, this.props.index, showHideType)
                            
                            }
                        }
                        editor.selection.placeCaretAt(clickedX, clickedY);
                    }

                    let content = e.target.getContent({ format: 'text' }),
                        contentHTML = e.target.getContent(),
                        activeElement = editor.dom.getParent(editor.selection.getStart(), '.cypress-editable');

                    if (activeElement && activeElement.getAttribute('id') === 'cypress-' + this.props.index) {
                        let currentNode = document.getElementById('cypress-' + this.props.index)
                        let isContainsMath = contentHTML.match(/<img/) ? (contentHTML.match(/<img/).input.includes('class="Wirisformula') || contentHTML.match(/<img/).input.includes('class="temp_Wirisformula')) : false
                        let nodeContent = (currentNode && !currentNode.innerText.trim().length) ? true : false
                        const isContainsBlankLine = contentHTML.match(/<span/) ? contentHTML.match(/<span/).input.includes('class="answerLineContent') : false;
                        if (!isContainsMath && currentNode && currentNode.innerHTML) {
                            isContainsMath = currentNode.innerHTML.match(/<img/) ? (currentNode.innerHTML.match(/<img/).input.includes('class="Wirisformula') || currentNode.innerHTML.match(/<img/).input.includes('class="temp_Wirisformula')) : false;
                        }
                        if (this.props.element.type === "element-blockfeature") {
                            if (currentNode.children[0] && currentNode.children[0].children[0] && currentNode.children[0].children[0].innerText.trim() == "" && !currentNode.children[0].children[0].innerText.trim().length && !isContainsMath &&!isContainsBlankLine) {
                                activeElement.classList.add('place-holder')
                            }
                            else {
                                activeElement.classList.remove('place-holder')
                            }
                        }
                        else if (content.trim().length || activeElement.querySelectorAll('ol').length || activeElement.querySelectorAll('ul').length || contentHTML.match(/<math/g) || isContainsMath) {
                            if (nodeContent || isContainsMath || isContainsBlankLine) {
                                activeElement.classList.remove('place-holder')
                            }
                        }
                        else if(isContainsBlankLine) {
                            activeElement.classList.remove('place-holder')
                        } else {
                            activeElement.classList.add('place-holder')
                        }
                    }

                    if (this.props.element && this.props.element.type === "element-blockfeature" && this.props.element.subtype === "quote" && tinymce.activeEditor && tinymce.activeEditor.id && !tinyMCE.activeEditor.id.includes("footnote")) {
                        let blockqtText = document.querySelector('#' + tinymce.activeEditor.id + ' blockquote p.paragraphNummerEins') ? document.querySelector('#' + tinymce.activeEditor.id + ' blockquote p.paragraphNummerEins').innerText : "";
                        let bqElem = document.getElementById(tinymce.activeEditor.id);
                        if (!blockqtText.trim()) {
                            var MLtext = document.querySelector('#' + tinymce.activeEditor.id + ' > p > img') || document.querySelector('#' + tinymce.activeEditor.id + ' > img')
                            if (MLtext) {
                                tinyMCE.$('#' + tinymce.activeEditor.id + ' blockquote p.paragraphNummerEins').find('br').remove();
                                document.querySelector('#' + tinymce.activeEditor.id + ' blockquote p.paragraphNummerEins').append(MLtext)
                                tinyMCE.$('#' + tinymce.activeEditor.id).find('p[data-mce-caret="before"]').remove();
                                tinyMCE.$('#' + tinymce.activeEditor.id).find('span#mce_1_start').remove();
                                tinyMCE.$('#' + tinymce.activeEditor.id).find('div.mce-visual-caret').remove();
                                tinyMCE.$('#' + tinymce.activeEditor.id + ' blockquote p.paragraphNummerEins').append("&nbsp;")

                            }
                            else {
                                if (bqElem && bqElem.firstChild && bqElem.firstChild.nodeName === "#text") {
                                    let textNode = bqElem.firstChild;
                                    let bqPara = tinyMCE.$(bqElem).find('p.paragraphNummerEins');
                                    let brs = tinyMCE.$(bqPara).find('br')
                                    brs && brs.remove();
                                    bqPara && bqPara.append(textNode);
                                }
                            }
                        }
                        this.removeBogusTagsFromDom();
                        this.removeAttributionBr();
                    }
                    if (this.props.element && this.props.element.type === "element-blockfeature") {
                        this.makeBqReplace();
                    }
                });

                tinymce.$('.cypress-editable').on('drop', (e, ui) => {
                    e.preventDefault();
                    e.stopPropagation();
                })
                editor.shortcuts.add('alt+shift+5', "description of the strike through shortcut", function () {
                    editor.execCommand('Strikethrough', false);
                });
                /* Reverting data-temp-mathml to data-mathml and class Wirisformula to temp_WirisFormula */
                if (editor.getContentAreaContainer()) {
                    let revertingTempContainerHtml = editor.getContentAreaContainer().innerHTML;
                    //Test Case Changes
                    if (!revertingTempContainerHtml) {
                        revertingTempContainerHtml = "";
                    }
                    revertingTempContainerHtml = revertingTempContainerHtml.replace(/data-temp-mathml/g, 'data-mathml').replace(/temp_Wirisformula/g, 'Wirisformula');
                    //Test Case Changes
                    if (document.getElementById(editor.id)) {
                        document.getElementById(editor.id).innerHTML = revertingTempContainerHtml;
                    }
                }


            }
        }
        tinyMCE.$('.Wirisformula').each(function () {
            this.naturalHeight && this.setAttribute('height', this.naturalHeight)
            this.naturalWidth && this.setAttribute('width', this.naturalWidth)
        });

        this.editorRef = React.createRef();
        this.currentCursorBookmark = {};
    }

    /**
     * Adds custon list button to the editor toolbar
     * @param {*} editor  editor instance
     */
    insertListButtonIcon = (editor) => {
        insertListButton(editor, this.onListButtonClick);
        insertUoListButton(editor, this.onListButtonClick);
    }

    /**
     * function to remove formatting of whole element excluding Math/Chem
     */
    innerTextWithMathMl = (node) => {
        tinymce.$('span[data-mce-type="bookmark"]').each(function () {
            let innerHtml = this.innerHTML;
            this.outerHTML = innerHtml;
        });
        if (node.childNodes.length) {
            node.childNodes.forEach((innerNode) => {
                if (innerNode.childNodes.length) {
                    this.innerTextWithMathMl(innerNode)
                } else {
                    if (innerNode.classList && (innerNode.classList.contains('Wirisformula') || innerNode.classList.contains('temp_Wirisformula'))) {
                        this.clearFormateText = this.clearFormateText + innerNode.outerHTML;
                    } else {
                        this.clearFormateText = this.clearFormateText + innerNode.textContent
                    }
                }
            })
            return this.clearFormateText;
        }
    }

    onListButtonClick = (type, subType) => {
        this.elementConverted = true;
        removeListHighliting();

        if ((this.props.element && this.props.element.type === "element-list" && this.props.element.elementdata.listtype === type) ||
            (this.props.currentElement && this.props.currentElement.type === "element-list" && this.props.currentElement.elementdata.listtype === type)) {
            this.toggleConfirmationPopup(true, this.props.element.subtype || this.props.currentElement.subtype);
        } else {
            this.props.onListSelect(subType, "");
        }
    }

    toggleConfirmationPopup = (value, type) => {
        this.props.togglePopup(value, type)
    }

    /**
     * This method is called when user clicks any button/executes command in the toolbar
     * @param {*} editor  editor instance
     */
    editorExecCommand = (editor) => {
        editor.on('ExecCommand', (e) => {
            let range = editor.selection.getRng();
            let content = e.target.getContent();
            let selectContent = editor.selection.getContent();
            let node = editor.selection.getNode();
            let nodeName = node ? node.tagName.toLowerCase() : null;
            let dataURI = null;
            if (nodeName === 'dfn') {
                dataURI = node.getAttribute('data-uri');
            }
            let activeElement = editor.dom.getParent(editor.selection.getStart(), '.cypress-editable');

            if (this.props.element.type === 'stanza') {
                if (editor.selection.getNode().tagName.toLowerCase() !== 'span' || editor.selection.getNode().className.toLowerCase() !== 'poetryLine') {
                    node = editor.selection.getNode().closest('.poetryLine');
                }
            }
            switch (e.command) {
                
                case "indent":
                    this.handleIndent(e, editor, content, this.props.element.type, node)
                    break;
                case "outdent":
                    this.handleOutdent(e, editor, content, this.props.element.type, node)
                    break;
                case "updateFormula":
                    editor.selection.bookmarkManager.moveToBookmark(this.currentCursorBookmark);
                    break;
                case "mceImageRotateRight":
                    console.log('roatate right')
                    break;
            }
            if (this.props && this.props.element && this.props.element.type && this.props.element.type === 'stanza' && e.command === 'mceToggleFormat') {
                let divParent = tinymce.$(`div[id="cypress-${this.props.index}"]`).children();
                spanHandlers.handleFormattingTags(editor, this.props.elementId, 'div', divParent, 'poetryLine', range);
            }
            if (this.props && this.props.element && this.props.element.type && this.props.element.figuretype === 'codelisting' && e.command === 'mceToggleFormat') {
                let codeParent = tinymce.$(`code[id="cypress-${this.props.index}"]`).children();
                spanHandlers.handleFormattingTags(editor, this.props.elementId, 'code', codeParent, 'codeNoHighlightLine', range);
            }
            if (this.props.element && this.props.element.type === 'element-blockfeature') {
                if (node && node.className === 'blockquoteTextCredit') {
                    setFormattingToolbar('disableTinymceToolbar')
                }
            }
            if (e.command === 'mceToggleFormat' && e.value === 'italic') {
                let parser = new DOMParser();
                let htmlDoc = parser.parseFromString(selectContent, 'text/html');
                let dfnTags = htmlDoc.getElementsByTagName('DFN');
                if ((nodeName && nodeName === 'dfn') || dfnTags.length) {
                    let dfnAttribute = [];
                    if (nodeName && nodeName === 'dfn') {
                        dfnAttribute.push(dataURI);
                    } else {
                        for (let index = 0; index < dfnTags.length; index++) {
                            dfnAttribute.push(dfnTags[index].getAttribute('data-uri'));
                        }
                    }
                    for (let index = 0; index < dfnAttribute.length; index++) {
                        this.handleGlossaryForItalic(activeElement, dfnAttribute[index]);
                    }
                }
            }

        });
    }

    /**
     * This method is called when user clicks any button in the toolbar and before the command is executed.
     * @param {*} editor  editor instance
     */
    editorBeforeExecCommand = (editor) => {
        editor.on('BeforeExecCommand', (e) => {
            let content = e.target.getContent()
            let keyDownEvent = null
            let syntaxEnabled = document.querySelector('.panel_syntax_highlighting .switch input');
            let activeElement = editor.dom.getParent(editor.selection.getStart(), '.cypress-editable');
            let elementType = this.getElementTypeForToolbar(this.props.element);
            let attributionElement = false;
            let headingElement = elementType.includes('Heading');
            if (elementType === 'Blockquote') {
                let selectedElement = editor.selection.getNode();
                if (selectedElement.className === 'blockquoteTextCredit') {
                    attributionElement = true;
                }
            }
            switch (e.command) {
                case "indent":
                    if (editor.targetElm.findChildren('ol').length || editor.targetElm.findChildren('ul').length) {
                        e.preventDefault()
                        /** EVENT - Tab keydown */
                        keyDownEvent = new KeyboardEvent('keydown', { bubbles: true, ctrlKey: false, keyCode: 9, metaKey: false, shiftKey: false, which: 9 })
                        editor.targetElm.dispatchEvent(keyDownEvent)
                        return false
                    }
                    let selectedNode = editor.selection.getNode();
                    if (this.props.element.type === 'stanza') {
                        if (editor.selection.getNode().tagName.toLowerCase() !== 'span' || editor.selection.getNode().className.toLowerCase() !== 'poetryLine') {
                            selectedNode = editor.selection.getNode().closest('.poetryLine');
                        }
                    }
                    this.onBeforeIndent(e, content, this.props.element.type, selectedNode)
                    break;
                case "outdent":
                    if (editor.targetElm.findChildren('ol').length || editor.targetElm.findChildren('ul').length) {
                        e.preventDefault()
                        /** EVENT - Shift + Tab keydown */
                        keyDownEvent = new KeyboardEvent('keydown', { bubbles: true, ctrlKey: false, keyCode: 9, metaKey: false, shiftKey: true, which: 9 })
                        editor.targetElm.dispatchEvent(keyDownEvent)
                        return false
                    }
                    let node = editor.selection.getNode();
                    if (this.props.element.type === 'stanza') {
                        if (editor.selection.getNode().tagName.toLowerCase() !== 'span' || editor.selection.getNode().className.toLowerCase() !== 'poetryLine') {
                            node = editor.selection.getNode().closest('.poetryLine');
                        }
                    }
                    this.onBeforeOutdent(e, content, this.props.element.type, node)
                    break;
                case "RemoveFormat":
                    let selectedText = window.getSelection().toString();
                    if (selectedText.trim() === document.getElementById(`cypress-${this.props.index}`).innerText.trim() && !(editor.targetElm.findChildren('ol').length || editor.targetElm.findChildren('ul').length)) {
                        e.preventDefault();
                        e.stopPropagation();
                        let isWirisIncluded = document.querySelector(`#cypress-${this.props.index} img`);
                        let textToReplace = window.getSelection().toString()

                        if (isWirisIncluded) {
                            if (isWirisIncluded.classList.contains('Wirisformula') || isWirisIncluded.classList.contains('temp_Wirisformula')) {
                                textToReplace = this.innerTextWithMathMl(document.getElementById(`cypress-${this.props.index}`), '')
                                this.clearFormateText = '';
                            }
                        }
                        if (e.target.targetElm.children && e.target.targetElm.children.length && (e.target.targetElm.children[0].classList.contains('blockquoteMarginaliaAttr') || e.target.targetElm.children[0].classList.contains('blockquoteMarginalia'))) {
                            e.target.targetElm.children[0].children[0].innerHTML = textToReplace;
                        }
                        else if ((e && e.target && e.target.targetElm && e.target.targetElm.children && e.target.targetElm.children.length) &&
                            (
                                e.target.targetElm.children[0].classList.contains("paragraphNumeroUnoCitation") ||
                                e.target.targetElm.children[0].classList.contains("heading1NummerEins") ||
                                e.target.targetElm.children[0].classList.contains("heading2NummerEins") ||
                                e.target.targetElm.children[0].classList.contains("heading3NummerEins") ||
                                e.target.targetElm.children[0].classList.contains("heading4NummerEins") ||
                                e.target.targetElm.children[0].classList.contains("heading5NummerEins") ||
                                e.target.targetElm.children[0].classList.contains("heading6NummerEins") ||
                                e.target.targetElm.children[0].classList.contains("paragraphNumeroUno") ||
                                e.target.targetElm.children[0].classList.contains("pullQuoteNumeroUno") ||
                                e.target.targetElm.children[0].classList.contains("heading2learningObjectiveItem"))
                        ) {
                            e.target.targetElm.children[0].innerHTML = textToReplace;
                        }
                        else if (this.props.element.type === 'stanza') {
                            spanHandlers.handleSelectAllRemoveFormatting(this.props.index, 'div', 'poetryLine');
                        }
                        else if (e.target.targetElm.nodeName === "CODE" && this.props.element.figuretype === 'codelisting') {
                            spanHandlers.handleSelectAllRemoveFormatting(this.props.index, 'code', 'codeNoHighlightLine');
                        }
                        /*  For Figure type*/
                        else {
                            e.target.targetElm.innerHTML = textToReplace;
                        }
                    }
                    else if (this.props.element.type === 'stanza') {
                        let selection = window.getSelection();
                        let output = spanHandlers.handleRemoveFormattingOnSpan(selection, e, 'div', 'poetryLine', selectedText);
                        if (output === false) {
                            return false;
                        }
                    }
                    else if (this.props.element.figuretype === 'codelisting') {
                        let selection = window.getSelection();
                        let output = spanHandlers.handleRemoveFormattingOnSpan(selection, e, 'code', 'codeNoHighlightLine', selectedText);
                        if (output === false) {
                            return false;
                        }
                    }
                    /**
                     * In case remove all formatting is being appied on list element
                     */
                    if (!preventRemoveAllFormatting(editor)) {
                        return false
                    }
                    break;
                case "mceShowCharmap":
                    let coOrds = editor.selection.getBoundingClientRect();
                    clickedX = coOrds.left;
                    clickedY = coOrds.top + coOrds.height / 2;
                    let elementId = tinymce.activeEditor ? tinymce.activeEditor.id : '';
                    let blockqt = document.querySelector('#' + elementId + ' blockquote p.paragraphNummerEins');
                    if (!blockqt || blockqt.innerText.trim()) {
                        editor.selection.setContent('<span id="specialChar"></span>');
                    }
                    setTimeout(() => {
                        let specialCharNode = document.querySelector('div.tox-collection.tox-collection--grid');
                        specialCharNode && specialCharNode.addEventListener('click', () => {
                            setTimeout(() => {
                                let element = tinyMCE.$(editor.selection.getNode()).find('p.paragraphNummerEins')[0];
                                let temElm = editor.dom.create('br');
                                if (element) {
                                    element.appendChild(temElm);
                                    let tempChildNodes = element.childNodes;
                                    editor.selection.setCursorLocation(element.childNodes[tempChildNodes.length - 1], 0);
                                    let brs = element.getElementsByTagName('br');
                                    while (brs.length) {
                                        brs[0].parentNode.removeChild(brs[0]);
                                    }
                                }
                                //tinymce.activeEditor.selection.placeCaretAt(clickedX, clickedY)
                            }, 0)
                        }, false)
                    }, 0)
                    //this.currentCursorBookmark = editor.selection.bookmarkManager.getBookmark();                
                    break;
                case "mceInsertContent":
                    editor.selection.bookmarkManager.moveToBookmark(this.currentCursorBookmark);
                    setTimeout(() => {
                        if (activeElement) {
                            const isContainsBlankLine = activeElement.innerHTML.match(/<span/) ? activeElement.innerHTML.match(/<span/).input.includes('class="answerLineContent') : false;
                            if (activeElement.innerText === "" && !isContainsBlankLine) {
                                activeElement.classList.add('place-holder')
                            } else {
                                activeElement.classList.remove('place-holder')

                            }
                        }
                    }, 0)
                    break;
                case "FormatBlock":
                    if (e.value === 'h5') {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    break;
                case "redo":
                    if (this.props.element.type === "element-list") {
                        e.preventDefault()
                        /** EVENT - ctrl + y keydown */
                        keyDownEvent = new KeyboardEvent('keydown', { bubbles: true, ctrlKey: true, keyCode: 89, metaKey: false, shiftKey: false, which: 89 })
                        editor.targetElm.dispatchEvent(keyDownEvent)
                        return false
                    }
                    break;
                case "Undo":
                case "Redo":
                    if (activeElement.nodeName === "CODE") {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    break;
                case 'Strikethrough':
                case 'Underline':
                case 'Bold':
                    if (headingElement || elementType === 'Pullquote' || elementType === 'Blockquote' || elementType === 'Learning Objective Item' || attributionElement || (activeElement.nodeName === "CODE" && syntaxEnabled && syntaxEnabled.checked)) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    break
                case 'Italic':
                    if ((activeElement.nodeName === "CODE" && syntaxEnabled && syntaxEnabled.checked) || elementType === 'Learning Objective Item' || attributionElement) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    break;
                case 'mceToggleFormat':
                    if (e.value === "superscript") {
                        let selectedElement = editor.selection.getNode();
                        if (selectedElement.tagName.toLowerCase() !== 'sup' && selectedElement.tagName.toLowerCase() !== 'a') {
                            let innerHTML = selectedElement.textContent;
                            let regExp = /[a-zA-Z0-9]/g;
                            if (!regExp.test(innerHTML) && selectedElement.lastChild.tagName && selectedElement.lastChild.tagName === 'SUP') {
                                let anchorElement = selectedElement.lastChild.getElementsByTagName('A');
                                if (anchorElement.length) {
                                    selectedElement = anchorElement[0];
                                }
                            }
                        }
                        if (selectedElement.tagName.toLowerCase() === 'sup' || (selectedElement.tagName.toLowerCase() === 'a' && selectedElement.parentNode.tagName.toLowerCase() === 'sup')) {
                            let childNodes = selectedElement.getElementsByTagName('A');
                            if (childNodes.length || selectedElement.tagName.toLowerCase() === 'a') {
                                let parentNode = selectedElement.parentNode;
                                let endPosition = true;
                                if (selectedElement.tagName.toLowerCase() === 'a') {
                                    let bomPosition = selectedElement.innerHTML.lastIndexOf("﻿");
                                    if (bomPosition === 0) {
                                        endPosition = false;
                                    }
                                    selectedElement = selectedElement.parentNode;
                                    parentNode = selectedElement.parentNode;
                                } else {
                                    let chindNodes = selectedElement.childNodes;
                                    if (chindNodes.length) {
                                        if (chindNodes[0].nodeType === Node.TEXT_NODE) {
                                            endPosition = false;
                                        }
                                    }
                                }
                                parentNode.innerHTML = removeBOM(parentNode.innerHTML);
                                let existingInnerHTML = '<sup>' + removeBOM(selectedElement.innerHTML) + '</sup>';
                                let innerHtml = existingInnerHTML + "<span id='_mce_caret' data-mce-bogus='1' data-mce-type='format-caret'>&#8203;&#65279;</span>";
                                if (!endPosition) {
                                    innerHtml = "<span id='_mce_caret' data-mce-bogus='1' data-mce-type='format-caret'>&#8203;&#65279;</span>" + existingInnerHTML;
                                }
                                let parentInnerHtml = removeBOM(parentNode.innerHTML);
                                let newParentInnerHtml = parentInnerHtml.replace(existingInnerHTML, innerHtml);
                                parentNode.innerHTML = newParentInnerHtml;
                                let pointerElement = document.getElementById('_mce_caret');
                                if (endPosition) {
                                    editor.selection.setCursorLocation(pointerElement, 1);
                                } else {
                                    editor.selection.setCursorLocation(pointerElement, 0);
                                }
                                e.preventDefault();
                                e.stopPropagation();
                            }
                        }

                    }
            }
        })
    }

    /**
     * This method is called when user clicks on editor.
     * @param {*} editor  editor instance
     */
    editorClick = (editor) => {
        editor.on('click', (e) => {

            if (e && e.target && e.target.classList.contains('Wirisformula')) {
                this.wirisClick++;
                if (!this.wirisClickTimeout) {
                    this.wirisClickTimeout = setTimeout(() => {
                        if (this.wirisClick === 1) {
                            const ALT_TEXT = getWirisAltText(e);
                            this.props.wirisAltTextPopup({showPopup : true, altText : ALT_TEXT});
                        }
                        clearTimeout(this.wirisClickTimeout);
                        this.wirisClickTimeout = null;
                        this.wirisClick = 0;
                    }, 500);
                }
            }
            if(e && e.detail && e.detail == 2){
                console.log('e.target',e.target)
                editor.selection.editor.editorCommands.commands.exec.mceimagerotateleft();
            }
            let selectedText = editor.selection.getContent({ format: "text" });
            let elemClassList = editor.targetElm.classList;
            let isFigureElem = elemClassList.contains('figureImage25Text') || elemClassList.contains('figureImage50Text') || elemClassList.contains('heading4Image25TextNumberLabel')

            if (!isFigureElem && selectedText.length) { //handling Asset popover show hide toolbar icon
                this.assetPopoverButtonState && this.assetPopoverButtonState.setDisabled(false); // IN case of Figure Element disable assetpopover
            }
            else if (selectedText.length <= 0) { //handling Asset popover show hide toolbar icon
                this.assetPopoverButtonState && this.assetPopoverButtonState.setDisabled(true);
            }
        });
    }
    /**
     * This method is called when user clicks on editor.
     * @param {*} editor  editor instance
     */
    editorOnClick = (e) => {
        // cbFunc | is for callback delegates //
        let cbFunc = null;
        // alreadyExist | is to check if glossary&footnote tab is open //
        let alreadyExist = false;
        /**
         * Case - If Glossary&Footnote is already open then first unmount existing one
         */
        if (document.getElementsByClassName('glossary-toolbar-wrapper').length) {
            alreadyExist = true;
        }
        /**
         * Case - clicking over Footnote text
         */

        if (e.target.parentElement && e.target.parentElement.nodeName == "SUP" && e.target.parentElement.childNodes &&
            e.target.parentElement.childNodes[0].nodeName == 'A' && e.target.dataset.uri) {
            let uri = e.target.dataset.uri;
            this.glossaryBtnInstance && this.glossaryBtnInstance.setDisabled(true)
            if (alreadyExist) {
                cbFunc = () => {
                    setFormattingToolbar('disableTinymceToolbar')
                    this.toggleGlossaryandFootnoteIcon(true);
                    this.toggleGlossaryandFootnotePopup(true, "Footnote", uri);
                }
                this.toggleGlossaryandFootnotePopup(false, null, uri, cbFunc);
            }
            else {
                this.toggleGlossaryandFootnotePopup(true, "Footnote", uri, () => { this.toggleGlossaryandFootnoteIcon(true); });
            }
        }
        /**
         * Case - clicking over Glossary text
         */
        else if (e.target.nodeName == "DFN" || e.target.closest("dfn")) {
            let uri = e.target.dataset.uri;
            let audioNode = e.target.closest("dfn");
            let isAudioExists = audioNode.hasAttribute('audio-id');

            if (e.target.nodeName == "DFN") {
                uri = e.target.dataset.uri;
            } else {
                let parent = e.target.closest("dfn");
                uri = parent.getAttribute('data-uri');
            }
            this.glossaryBtnInstance.setDisabled(true)
            if (alreadyExist) {
                cbFunc = () => {
                    this.toggleGlossaryandFootnoteIcon(true);
                    this.toggleGlossaryandFootnotePopup(true, "Glossary", uri);
                }
                this.toggleGlossaryandFootnotePopup(false, null, uri, cbFunc);
            }
            else {
                this.toggleGlossaryandFootnotePopup(true, "Glossary", uri, () => { this.toggleGlossaryandFootnoteIcon(true); });
            }
            if (isAudioExists) {
                let audioPopupPosition = {
                    left: `${(e.clientX - 317)}px`,
                    top: `${(e.clientY - 40) }px`
                }
                this.props.audioGlossaryPopup(true, audioPopupPosition);
            }
        }
        /**
         * Case - clicking over Asset text
         */
        else if (this.isABBR(e.target, 'status')) {
            let abbrElm = this.isABBR(e.target, 'elm');
            let linkTitle = (abbrElm.attributes['title'] && abbrElm.attributes['title'].nodeValue) || abbrElm.parentNode.attributes['title'].nodeValue;
            if (linkTitle == "Asset Popover") {
                let assetId = (abbrElm.attributes['asset-id'] && abbrElm.attributes['asset-id'].nodeValue) || abbrElm.parentNode.attributes['asset-id'].nodeValue;
                let dataUrn = (abbrElm.attributes['data-uri'] && abbrElm.attributes['data-uri'].nodeValue) || abbrElm.parentNode.attributes['data-uri'].nodeValue;
                let apoObject = {
                    'assetId': assetId,
                    'dataUrn': dataUrn
                }
                authorAssetPopOver(true, apoObject);
            }

            if (linkTitle == "Slate Link") {
                sendDataToIframe({ 'type': 'tocToggle', 'message': { open: false } });
                let linkId = (abbrElm.attributes['asset-id'] && abbrElm.attributes['asset-id'].nodeValue) || (abbrElm.parentNode.attributes['asset-id'] && abbrElm.parentNode.attributes['asset-id'].nodeValue) || (abbrElm.attributes['id'] && abbrElm.attributes['id'].nodeValue) || abbrElm.parentNode.attributes['id'].nodeValue;
                let elementId = this.props.element && this.props.element.id
                // (abbrElm.attributes['element-id'] && abbrElm.attributes['element-id'].nodeValue) || abbrElm.parentNode.attributes['element-id'].nodeValue;
                let pageId = (abbrElm.attributes['data-uri'] && abbrElm.attributes['data-uri'].nodeValue) || abbrElm.parentNode.attributes['data-uri'].nodeValue;

                sendDataToIframe({ 'type': LaunchTOCForCrossLinking, 'message': { open: true, case: 'update', link: linkId, element: elementId, page: pageId, blockCanvas: true, crossLink: true, reviewerRole: hasReviewerRole() } });
            }
        }
        else if (e.target.className === "blockquoteTextCredit") {
            setFormattingToolbar('disableTinymceToolbar')
        }
        /**
         *  Case - otherwise close glossary & footnote popup  
         */
        else {
            cbFunc = () => {
                this.toggleGlossaryandFootnoteIcon(false);
            }
            this.toggleGlossaryandFootnotePopup(false, null, null, cbFunc);
        }

        if (this.props.activeShowHide) {
            this.props.activeShowHide(e, this.props.currentElement)
        } else if (document.querySelector('.show-hide-active')) {
            document.querySelector('.show-hide-active').classList.remove("show-hide-active")
        }
    }

    isABBR = (el, target) => {
        let isAbbr = false;
        let parentNode = true;

        do {
            if (el.parentNode && el.parentNode.tagName && el.parentNode.tagName !== 'LI' && el.parentNode.tagName !== 'P' && el.parentNode.tagName !== 'H3' && el.parentNode.tagName !== 'BLOCKQUOTE') {
                if (el.nodeName == 'ABBR' || (el.parentNode && el.parentNode.tagName === 'ABBR')) {
                    parentNode = false;
                    isAbbr = true;
                } else {
                    el = el.parentNode;
                }
            } else {
                parentNode = false;
                if (el.nodeName == 'ABBR') {
                    isAbbr = true;
                }
            }
        } while (parentNode);
        if (target === 'elm' && isAbbr) {
            if (el.nodeName == 'ABBR') {
                return el;
            } else {
                return el.parentNode;
            }
        } else if (target === 'status') {
            return isAbbr;
        }
    }

    toggleGlossaryandFootnoteIcon = (flag) => {
        this.glossaryBtnInstance && this.glossaryBtnInstance.setDisabled(flag)
        this.footnoteBtnInstance && this.footnoteBtnInstance.setDisabled(flag)
    }


    /**
     * This method is called on keyUp.
     * @param {*} editor  editor instance
     */
    editorKeyup = (editor) => {
        editor.on('keyup', (e) => {
            this.isctrlPlusV = false;
            let activeElement = editor.dom.getParent(editor.selection.getStart(), '.cypress-editable');
            let isMediaElement = tinymce.$(tinymce.activeEditor.selection.getStart()).parents('.figureElement,.interactive-element').length;
            let isContainsMath = (activeElement && activeElement.innerHTML.match(/<img/)) ? (activeElement.innerHTML.match(/<img/).input.includes('class="Wirisformula') || activeElement.innerHTML.match(/<img/).input.includes('class="temp_Wirisformula')) : false;
            let isContainsBlankLine = (activeElement && activeElement.innerHTML.match(/<span/)) ? activeElement.innerHTML.match(/<span/).input.includes('class="answerLineContent') : false;
            if(this.props.element && this.props.element.type==="element-blockfeature" && e.target &&  e.target.className==="blockquoteTextCredit"){
                setFormattingToolbar('disableTinymceToolbar')
            }
            if (activeElement) {
                let lastCont = this.lastContent;
                this.lastContent = activeElement.innerHTML;
                if (!isMediaElement && !activeElement.children.length && this.props.element.type !== "citations" && this.props.element.type !== 'poetry' || (activeElement.children.length === 1 && activeElement.children[0].tagName === "BR" && activeElement.nodeName !== "CODE")) {
                    //code to avoid deletion of editor first child(like p,h1,blockquote etc)
                    let div = document.createElement('div');
                    div.innerHTML = lastCont;
                    if (div.children && div.children[0]) {
                        div.children[0].innerHTML = '<br/>';
                        if(div.children[0].tagName && div.children[0].className === 'answerLineContent'){
                            activeElement.innerHTML = div.children[0].innerHTML;
                        } else{
                            activeElement.innerHTML = div.children[0].outerHTML;
                        }
                    }
                }
                if (this.props.element && this.props.element.type === "element-blockfeature") {
                    if (activeElement.children[0] && activeElement.children[0].children[0] && activeElement.children[0].children[0].innerText.trim() == "" && !activeElement.children[0].children[0].innerText.trim().length && !isContainsMath && !isContainsBlankLine) {
                        activeElement.classList.add('place-holder')
                    }
                    else {
                        activeElement.classList.remove('place-holder')
                    }
                }
                else if (activeElement.innerText.trim().length || activeElement.querySelectorAll('ol').length || activeElement.querySelectorAll('ul').length || isContainsMath || isContainsBlankLine) {
                    activeElement.classList.remove('place-holder')
                }
                else {
                    activeElement.classList.add('place-holder')
                }
                this.lastContent = activeElement.innerHTML;
                if (activeElement.nodeName === "CODE") {
                    let key = e.keyCode || e.which;
                    if (!activeElement.innerText.trim()) {
                        activeElement.innerHTML = '<span class="codeNoHighlightLine"><br/></span>';
                    }
                    else if (key != undefined && key === 13) {
                        spanHandlers.addAndSplitSpan(editor, this.props.elementId, 'code', 'codeNoHighlightLine');
                        let elementSearch = editor.selection.getNode();
                        if (editor.selection.getNode().tagName.toLowerCase() !== 'span' || editor.selection.getNode().className.toLowerCase() !== 'codeNoHighlightLine') {
                            elementSearch = editor.selection.getNode().closest(`.codeNoHighlightLine`);
                        }
                        if (elementSearch) {
                            if (elementSearch.innerHTML != '<br>' && elementSearch.textContent.trim() != '') {
                                let brs = elementSearch.getElementsByTagName('br');
                                while (brs.length) {
                                    brs[0].parentNode.removeChild(brs[0]);
                                }
                            }
                            if (elementSearch.nextSibling) {
                                if (elementSearch.nextSibling.innerHTML != '<br>' && elementSearch.nextSibling.textContent.trim() != '') {
                                    let brs = elementSearch.nextSibling.getElementsByTagName('br');
                                    while (brs.length) {
                                        brs[0].parentNode.removeChild(brs[0]);
                                    }
                                }
                            }
                            if (elementSearch.previousSibling) {
                                if (elementSearch.previousSibling.innerHTML != '<br>' && elementSearch.previousSibling.textContent.trim() != '') {
                                    let brs = elementSearch.previousSibling.getElementsByTagName('br');
                                    while (brs.length) {
                                        brs[0].parentNode.removeChild(brs[0]);
                                    }
                                }
                            }
                            let bceNode = document.getElementsByClassName("element-container bce active")
                            let codeSnippetNode = bceNode && bceNode[0] && bceNode[0].getElementsByClassName("pearson-component blockcode codeSnippet blockCodeDiv")
                            codeSnippetNode && codeSnippetNode[0] && codeSnippetNode[0].scroll(0, 0)
                        }
                    }
                    else if (key != undefined && (key === 8 || key === 46)) {
                        spanHandlers.handleBackSpaceAndDeleteKyeUp(editor, key, 'codeNoHighlightLine');
                    }
                    else if (e.ctrlKey) {
                        if (key != undefined && (key === 66 || key === 98 || key === 73 || key === 105 || key === 85 || key === 117)) {
                            //this.gRange = editor.selection.getRng();
                            let codeParent = tinymce.$(`code[id="cypress-${this.props.index}"]`).children();
                            spanHandlers.handleFormattingTags(editor, this.props.elementId, 'code', codeParent, 'codeNoHighlightLine', this.gRange);
                        }
                    }
                }
                if (activeElement.nodeName == "DIV" && this.props.element.type === 'stanza') {
                    let key = e.keyCode || e.which;
                    if (key != undefined && key === 13) {
                        //activeElement.innerHTML += '<span class="poetryLine"><br /></span>';
                        tinymce.$(`div[data-id="${this.props.elementId}"] .poetryLine`).each(function () {
                            let imgTag = this && this.getElementsByTagName("img");
                            const blankLines = this && this.getElementsByClassName("answerLineContent")
                            if ((this.innerHTML === '' || this.innerHTML === "<br>" || this.textContent.trim() == '') && !(imgTag && imgTag.length) && !(blankLines && blankLines.length)) {
                                this.remove();
                            }
                        })
                        spanHandlers.addAndSplitSpan(editor, this.props.elementId, 'div', 'poetryLine');
                    } else if (key != undefined && (key === 8 || key === 46)) {
                        spanHandlers.handleBackSpaceAndDeleteKyeUp(editor, key, 'poetryLine');
                    }
                }
                let elem = editor.selection.getNode();
                let olList = elem.closest(`ol`);
                let ulList = elem.closest(`ul`);
                if (olList || ulList) {
                    let key = e.keyCode || e.which;
                    if (key != undefined && key === 8) {
                        this.handleCodeClick(editor, false);
                    } else if (key != undefined && key === 39) {
                        let currentElement = editor.selection.getNode();
                        let childNodes = currentElement.childNodes;
                        if (childNodes.length > 1) {
                            let innerHTML = currentElement.innerHTML;
                            let pomString = encodeURI(innerHTML);
                            pomString = pomString.replace(/%EF%BB%BF/g, '');
                            innerHTML = decodeURI(pomString)
                            if (childNodes[childNodes.length - 2].tagName) {
                                if (childNodes[childNodes.length - 2].tagName === 'CODE') {
                                    if (innerHTML.endsWith('</code>')) {
                                        this.setCursorOnCode(childNodes[childNodes.length - 2], editor);
                                    }
                                }
                            }
                        }
                    }
                }
                const keyPressed = e.keyCode || e.which;
                if (keyPressed === 37 || keyPressed === 39) {
                    if (editor.selection.getNode().tagName.toLowerCase() === 'span' && editor.selection.getNode().className.toLowerCase() === 'answerLineContent') {
                        this.handleBlankLineArrowKeys(keyPressed, editor)
                    }
                }
            }
        });
    }
/**
 * @description handles arrow position in blank line
 * @param {*} keyPressed  key pressed
 * @param {*} editor editor node reference
 */
    handleBlankLineArrowKeys = (keyPressed, editor) => {
        const blankLineNode = editor.selection.getNode();
        if (keyPressed === 37) {
            blankLineNode.outerHTML = "<span id='_mce_caret' data-mce-bogus='1' data-mce-type='format-caret'>&#65279;</span>" + blankLineNode.outerHTML;
            editor.selection.setCursorLocation(document.getElementById('_mce_caret'), 0);
        } else {
            blankLineNode.outerHTML = blankLineNode.outerHTML + "<span id='_mce_caret' data-mce-bogus='1' data-mce-type='format-caret'>&#65279;</span>";
            editor.selection.setCursorLocation(document.getElementById('_mce_caret'), 1);
        }
    }
    handleCodeClick = (editor, showHide) => {
        let currentElement = editor.selection.getNode();
        let childNodes = currentElement.childNodes;
        if (showHide) {
            if (childNodes.length) {
                this.setCursorOnCode(childNodes[childNodes.length - 1], editor);
            }
        } else {
            if (childNodes.length > 1) {
                if (childNodes[childNodes.length - 1].tagName) {
                    if (childNodes[childNodes.length - 1].tagName === 'BR') {
                        let position = 2;
                        while (!childNodes[childNodes.length - position].innerHTML) {
                            if ((position + 1) <= childNodes.length && childNodes[childNodes.length - position].tagName) {
                                position = position + 1;
                            } else {
                                break;
                            }
                        }
                        this.setCursorOnCode(childNodes[childNodes.length - position], editor);
                        childNodes[childNodes.length - 1].parentNode.removeChild(childNodes[childNodes.length - 1]);
                    }
                }
            }
        }
    }

    setCursorOnCode = (element, editor) => {
        if (element.tagName) {
            if (element.tagName === 'CODE') {
                let temElm = editor.dom.create('br');
                element.appendChild(temElm);
                let tempChildNodes = element.childNodes;
                editor.selection.setCursorLocation(element.childNodes[tempChildNodes.length - 1], 0);
                let brs = element.getElementsByTagName('br');
                while (brs.length) {
                    brs[0].parentNode.removeChild(brs[0]);
                }
            } else {
                let child = element.childNodes;
                if (child.length) {
                    this.setCursorOnCode(child[child.length - 1], editor);
                }
            }
        }
    }

    /**
     * This method is called on keyDown.
     * @param {*} editor  editor instance
     */
    editorKeydown = (editor) => {
        editor.on('keydown', (e) => {
            let newElement = this.props.currentElement ? this.props.currentElement : this.props.element
            if (e.keyCode == 86 && e.ctrlKey) {
                this.isctrlPlusV = true;
            }
            if (hasReviewerRole()) {
                let evt = (e) ? e : window.event;
                if (evt.ctrlKey && evt.which == 88) {
                    evt.preventDefault();
                }
            }

            if (this.isTabPressed(e)) {
                let evt = (e) ? e : window.event;
                evt.preventDefault();
            }

            bindKeyDownEvent(editor, e, newElement, () => {
                this.props.createShowHideElement(this.props.showHideType, this.props.index, this.props.id);
            });
            let activeElement = editor.dom.getParent(editor.selection.getStart(), '.cypress-editable');

            /** [BG-2134] | This block is to clear selection when CT element is blank before paste process*/
            if ((e.keyCode == 86 || e.key == 'v') && e.ctrlKey && this.props.currentElement && this.props.currentElement.type == 'element-citation' && activeElement) {
                if (activeElement.innerText && activeElement.innerText.trim() == "" && window.getSelection().toString().trim() == '') {        // Other Browsers
                    window.getSelection().removeAllRanges()
                }
                else if (document.selection && document.selection.empty) {
                    document.selection.empty();                             // IE
                }
            }

            if (activeElement) {
                if (!activeElement.children.length ||
                    (activeElement.children.length <= 1 && activeElement.children[0].tagName === 'BR' && activeElement.nodeName !== "CODE")) {
                    //code to avoid deletion of editor first child(like p,h1,blockquote etc)
                    let div = document.createElement('div');
                    div.innerHTML = this.lastContent;
                    if (div.children && div.children[0] && !div.innerText) {
                        div.children[0].innerHTML = '<br/>';
                        activeElement.innerHTML = div.children[0].outerHTML;
                    }
                }
                this.lastContent = activeElement.innerHTML;
            }

            let key = e.keyCode || e.which;
            let isContainsMath = false;
            let isContainsBlankLine = activeElement.innerHTML.match(/<span/) ? activeElement.innerHTML.match(/<span/).input.includes('class="answerLineContent') : false;
            if (activeElement) {
                isContainsMath = activeElement.innerHTML.match(/<img/) ? (activeElement.innerHTML.match(/<img/).input.includes('class="Wirisformula') || activeElement.innerHTML.match(/<img/).input.includes('class="temp_Wirisformula')) : false;
                isContainsBlankLine = activeElement.innerHTML.match(/<span/) ? activeElement.innerHTML.match(/<span/).input.includes('class="answerLineContent') : false;
            }
            if (key === 13 && this.props.element.type !== 'element-list' && activeElement.nodeName !== "CODE" && this.props.element.type !== 'showhide' && this.props.element.type !== "stanza") {
                let activeEditor = document.getElementById(tinymce.activeEditor.id);
                if ('element' in this.props && 'status' in this.props.element && this.props.element.status == "wip") {
                    activeEditor.blur();
                }

                let nextSaparator = (activeEditor.closest('.editor')).nextSibling;
                let textPicker;
                if (this.props.element.type == 'citations') {
                    textPicker = nextSaparator.querySelector('#myDropdown li > .citation-elem');
                } else {
                    textPicker = nextSaparator.querySelector('#myDropdown li > .text-elem');
                }
                textPicker.click();
            } else if (key === 13 && this.props.element.type === 'showhide' && this.props.showHideType != 'revel' && this.props.currentElement.type !== 'element-list') {
                this.props.createShowHideElement(this.props.showHideType, this.props.index, this.props.id);
            }
            else if ((this.props.element && this.props.element.type === 'showhide' && this.props.showHideType !== 'revel' && !editor.bodyElement.innerText.trim().length && e.keyCode === 8 && this.props.element.interactivedata) && ((this.props.showHideType === "show" && this.props.element.interactivedata.show.length > 1) || (this.props.showHideType === "hide" && this.props.element.interactivedata.hide.length > 1)) && !isContainsMath && !isContainsBlankLine) {
                this.props.deleteShowHideUnit(this.props.currentElement.id, this.props.showHideType, this.props.element.contentUrn, this.props.innerIndex, this.props.index, this.props.element.id)
            }
            else if (key === 13 && this.props.element.type === 'stanza') {
                let currentElement = editor.selection.getNode();
                if (editor.selection.getNode().tagName.toLowerCase() !== 'span' || editor.selection.getNode().className.toLowerCase() !== 'poetryLine') {
                    currentElement = editor.selection.getNode().closest('.poetryLine');
                }
                if (!currentElement) {
                    currentElement = editor.selection.getNode();
                    let checkSpan = currentElement.getElementsByClassName("poetryLine");
                    if (checkSpan.length) {
                        currentElement = checkSpan[0];
                    }
                }
                let imgTag = currentElement && currentElement.getElementsByTagName("img");
                const blankLines = currentElement && currentElement.getElementsByClassName('answerLineContent')
                if (currentElement && currentElement.tagName == 'SPAN' &&
                    (currentElement == '<br>' || currentElement.textContent.trim() == '') && !(imgTag && imgTag.length) && !(blankLines && blankLines.length)) {
                    let poetryStanza = tinymce.$(`div[data-id="${this.props.elementId}"] .poetryLine`);
                    if (poetryStanza && poetryStanza.length > 1) {
                        currentElement.remove();
                    }
                    let activeEditor = document.getElementById(tinymce.activeEditor.id);
                    if ('element' in this.props && 'status' in this.props.element && this.props.element.status == "wip") {
                        activeEditor.blur();
                    }
                    let nextSaparator = (activeEditor.closest('.editor')).nextSibling;
                    let textPicker = nextSaparator.querySelector('#myDropdown li > .stanza-elem');
                    textPicker.click();
                }
            } else if (key === 39) {
                let currentElement = editor.selection.getNode();
                if (editor.selection.getNode().tagName.toLowerCase() !== 'abbr' && editor.selection.getNode().title.toLowerCase() !== 'slate link') {
                    currentElement = editor.selection.getNode().closest(`.AssetPopoverTerm`);
                }
                if (currentElement && currentElement.title.toLowerCase() === 'slate link') {
                    let offset = this.getOffSet(currentElement);
                    let textLength = currentElement.textContent.length;
                    if (textLength === offset || textLength === offset + 1) {
                        if (!currentElement.nextSibling) {
                            let parentNode = currentElement.parentNode;
                            let innerHtml = parentNode.innerHTML + '&#65279';
                            parentNode.innerHTML = innerHtml;
                            let childNodes = parentNode.childNodes;
                            editor.selection.setCursorLocation(parentNode.childNodes[childNodes.length - 1], 0);
                        }
                    }
                }
            }
            if (activeElement.nodeName === "CODE") {
                let tempKey = e.keyCode || e.which;
                if (tempKey != undefined && (tempKey === 8 || tempKey === 46)) {
                    spanHandlers.handleBackSpaceAndDeleteKyeDown(editor, tempKey, e, 'codeNoHighlightLine');
                } else {
                    if (tempKey != undefined && tempKey === 9) {
                        e.preventDefault();
                    } else if (e.ctrlKey) {
                        if (tempKey != undefined && (tempKey === 66 || tempKey === 98 || tempKey === 73 || tempKey === 105 || tempKey === 85 || tempKey === 117)) {
                            this.gRange = editor.selection.getRng();
                        }
                    }
                }
            }
            if (activeElement.nodeName == "DIV" && this.props.element.type === 'stanza') {
                let tempKey = e.keyCode || e.which;
                if (tempKey != undefined && (tempKey === 8 || tempKey === 46)) {
                    spanHandlers.handleBackSpaceAndDeleteKyeDown(editor, tempKey, e, 'poetryLine');
                } else {
                    if (tempKey != undefined && tempKey === 9) {
                        e.preventDefault();
                    }
                }
            }
            if (e && e.target && e.target.classList.contains('blockquoteTextCredit') && key === 8 && !e.target.innerText.trim()) {
                e.preventDefault();
                return false;
            }
        });
    }

    getOffSet = (element) => {
        let caretOffset = 0;
        let doc = element.ownerDocument || element.document;
        let win = doc.defaultView || doc.parentWindow;
        let sel;
        if (typeof win.getSelection != "undefined") {
            sel = win.getSelection();
            if (sel.rangeCount > 0) {
                let range = win.getSelection().getRangeAt(0);
                let preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(element);
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                caretOffset = preCaretRange.toString().length;
            }
        } else if ((sel = doc.selection) && sel.type != "Control") {
            let textRange = sel.createRange();
            let preCaretTextRange = doc.body.createTextRange();
            preCaretTextRange.moveToElementText(element);
            preCaretTextRange.setEndPoint("EndToEnd", textRange);
            caretOffset = preCaretTextRange.text.length;
        }
        return caretOffset;
    }

    /**
     * Adds custom inline code formatting option to the toolbar
     * @param {*} editor  editor instance
     */

    addInlineCodeIcon = (editor) => {
        let self = this;
        editor.ui.registry.addToggleButton('code', {
            icon: "code",
            tooltip: "Inline code",
            onAction: function () {
                // Add the custom formatting
                if (editor.selection.getNode().nodeName === 'CODE' && self.props.element.type === 'stanza') {
                    let selectedNode = editor.selection.getNode();
                    let innerHTML = selectedNode.innerHTML;
                    selectedNode.outerHTML = innerHTML;
                }
                else {
                    let range = editor.selection.getRng();
                    let activeElement = editor.dom.getParent(editor.selection.getStart(), '.cypress-editable');
                    editor.undoManager.transact(() => {
                        editor.formatter.toggle('custom_code');
                        if (activeElement.nodeName == "DIV" && self.props.element.type === 'stanza') {
                            let divParent = tinymce.$(`div[id="cypress-${self.props.index}"]`).children();
                            spanHandlers.handleFormattingTags(editor, self.props.elementId, 'div', divParent, 'poetryLine', range);
                        }
                    });
                }
            },
            onSetup: function (api) {
                // responsible for highligting the icon when inline formatting already applied
                api.setActive(editor.formatter.match('code'));
                var unbind = editor.formatter.formatChanged('code', api.setActive).unbind;
                return function () {
                    if (unbind) unbind();
                };
            }
        });
    }

    clearUndoStack = (editor) => {
        customEvent.subscribe('clearUndoStack', () => {
            editor.undoManager.clear();
        })
    }
    /**
     * Detects TAB key press.
     * @param {*} keydownEvent  keyDown event
     */
    isTabPressed = (keydownEvent) => {
        const keyCode = keydownEvent.keyCode || keydownEvent.which
        if (this.props.element && this.props.element.type !== "element-list" && keyCode === 9) {
            return 1
        }
        else {
            return 0
        }
    }

    /**
     * Adds glossary button to the toolbar
     * @param {*} editor  editor instance
     */
    addGlossaryIcon = (editor) => {
        editor.ui.registry.addButton('Glossary', {
            id: 'buttonId',
            classes: 'buttonClas',
            icon: "glossary",
            tooltip: "Glossary",
            onAction: () => this.addGlossary(editor),
            onSetup: (btnRef) => {
                this.glossaryBtnInstance = btnRef;
            }
        });
    }

    /**
     * Adds footnote button to the toolbar
     * @param {*} editor  editor instance
     */
    addFootnoteIcon = (editor) => {
        editor.ui.registry.addButton('Footnote', {
            icon: 'footnote',
            tooltip: "Footnote",
            onAction: () => this.addFootnote(editor),
            onSetup: (btnRef) => {
                this.footnoteBtnInstance = btnRef;
            }
        });
    }

    /**
     * Handles Special char icon to the toolbar.
     * @param {*} editor  editor instance
     */
    handleSpecialCharIcon = editor => {
        this.setSpecialCharIcon(editor);
        this.addSpecialCharIcon(editor);
    }
    /**
     * set Special char icon to the toolbar.
     * @param {*} editor  editor instance
     */
    setSpecialCharIcon = editor => {
        editor.ui.registry.addIcon(
            "specialcharacters",
            charmap
        );        
    }
    /**
     * add Special char icon to the toolbar.
     * @param {*} editor  editor instance
     */
    addSpecialCharIcon = editor => {
        const self = this;
        editor.ui.registry.addMenuButton("specialcharacters", {
            text: "",
            icon: "specialcharacters",
            tooltip: "Special Character",
            fetch: function (callback) {
                var items = [{
                        type: 'menuitem',
                        text: 'Insert Special Character',
                        onAction: function () {
                            tinymce.activeEditor.execCommand('mceShowCharmap');
                        }
                    },
                    {
                        type: 'menuitem',
                        text: 'Insert a Blank',
                        onAction: function () {
                                editor.selection.setContent('<span contentEditable="false" id="blankLine" class="answerLineContent"><br></span>');
                                if(self.props.element && self.props.element.type === "element-list"){
                                    const listLiText = document.querySelector('#' + tinymce.activeEditor.id + ' li') ? document.querySelector('#' + tinymce.activeEditor.id + ' li').innerText : "";
                                    if (!listLiText.trim()) {
                                        const blankLine = document.querySelector('#' + tinymce.activeEditor.id + ' span#blankLine');
                                        tinyMCE.$('#' + tinymce.activeEditor.id + ' li').find('br').remove();
                                        document.querySelector('#' + tinymce.activeEditor.id + ' li').append(blankLine);
                                        blankLine.innerHTML = '<br>';
                                        tinyMCE.$('#' + tinymce.activeEditor.id)[0].innerHTML = removeBOM(tinyMCE.$('#' + tinymce.activeEditor.id)[0].innerHTML);
                                    }
                                } else if (self.props.element && self.props.element.type === "element-blockfeature" && self.props.element.elementdata && self.props.element.elementdata.type !=="pullquote") {
                                        const blankLine = document.querySelector('#' + tinymce.activeEditor.id + ' > p > span#blankLine') || document.querySelector('#' + tinymce.activeEditor.id + ' > span#blankLine');
                                        const blockqtText = document.querySelector('#' + tinymce.activeEditor.id + ' blockquote p.paragraphNummerEins') ? document.querySelector('#' + tinymce.activeEditor.id + ' blockquote p.paragraphNummerEins').innerText : "";
                                        if (!blockqtText.trim()) {
                                            tinyMCE.$('#' + tinymce.activeEditor.id + ' blockquote p.paragraphNummerEins').find('br').remove();
                                            document.querySelector('#' + tinymce.activeEditor.id + ' blockquote p.paragraphNummerEins').append(blankLine);
                                            blankLine.innerHTML = '<br>';
                                            tinyMCE.$('#' + tinymce.activeEditor.id)[0].innerHTML = removeBOM(tinyMCE.$('#' + tinymce.activeEditor.id)[0].innerHTML);
                                        }
                                }
                             editor.targetElm.classList.remove('place-holder');
                        }
                    }
                ];
                callback(items);
            }
        })
    }
    /**
     * Adds Cross Linking icon to the toolbar.
     * @param {*} editor  editor instance
     */
    setCrossLinkingIcon = editor => {
        editor.ui.registry.addIcon(
            "crossLinkingIcon",
            crossLinkIcon
        );
    }
    handleAddMediaIcon = editor => {
        this.setAddMediaIcon(editor);
        this.addAddMediaIcon(editor);
    }
    /**
     * Adds Image icon to the toolbar.
     * @param {*} editor  editor instance
     */
    setAddMediaIcon = editor => {
        editor.ui.registry.addIcon(
            "InsertMedia",
            addImage
        );
    }

    addAddMediaIcon = editor => {
        const self = this;
        editor.ui.registry.addMenuButton('insertMedia', {
            text: 'Insert',
            tooltip: 'insertMedia',
            onSetup: function () {
                document.querySelector('button[title="insertMedia"]').setAttribute('title', '');
                let newSpan = document.createElement('span');
                newSpan.className = "tooltip-text"
                newSpan.innerText = 'Insert';
                const tooltipLabel = document.querySelector('button[aria-label="insertMedia"] .tox-tbtn__select-label')
                if (tooltipLabel) {
                    tooltipLabel.after(newSpan)
                }
            },
            fetch: (callback) => {
                const items = [{
                    type: 'menuitem',
                    text: 'Image',
                    onAction: () => {
                        if (self.props.element && self.props.element.type === "element-list") {
                            const newImg = handleC2MediaClick(self.props.permissions, editor);
                        }
                    }
                }]
               callback(items);
            }
        });
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
     * Add Inline Icon icon to the toolbar.
     * @param {*} editor  editor instance
     */
    setInlineIcon = editor => {
        editor.ui.registry.addIcon(
            "code",
            code
        );
    }

    /**
     * Add Footnote Icon Icon icon to the toolbar.
     * @param {*} editor  editor instance
     */
    setFootnoteIcon = editor => {
        editor.ui.registry.addIcon(
            "Footnote",
            Footnote
        );
    }
    setDefaultIcons = editor => {
        editor.ui.registry.addIcon("undo", undo);
        editor.ui.registry.addIcon("redo", redo);
        editor.ui.registry.addIcon("bold", bold);
        editor.ui.registry.addIcon("italic", italic);
        editor.ui.registry.addIcon("underline", underline);
        editor.ui.registry.addIcon("strike-through", strikethrough);
        editor.ui.registry.addIcon("remove-formatting", removeformat);
        editor.ui.registry.addIcon("subscript", subscript);
        editor.ui.registry.addIcon("superscript", superscript);
        editor.ui.registry.addIcon("chevron-down", downArrow);
        editor.ui.registry.addIcon("customUoListButton", unorderedList);
        editor.ui.registry.addIcon("customListButton", orderedList);
        editor.ui.registry.addIcon("indent", indent);
        editor.ui.registry.addIcon("outdent", outdent);
    }

    /**
     * Add Footnote Icon Icon icon to the toolbar.
     * @param {*} editor  editor instance
     */
    setGlossaryIcon = editor => {
        editor.ui.registry.addIcon(
            "Glossary",
            Glossary
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
     * Adding button and bind exec command on clicking the button to open the chemistry editor
     * @param {*} editor  editor instance
     */
    addChemistryFormulaButton = editor => {
        let self = this;
        editor.ui.registry.addButton("tinyMcewirisformulaEditorChemistry", {
            icon: "tinymceformulachemistryicon",
            tooltip: "WIRIS EDITOR chemistry",
            onAction: function (_) {
                if (self && self.props && self.props.element && self.props.element.type === 'stanza') {
                    let currentElement = editor.selection.getNode();
                    if ((editor.selection.getNode().tagName && editor.selection.getNode().tagName.toLowerCase() !== 'span') || (editor.selection.getNode().className && editor.selection.getNode().className.toLowerCase() !== 'poetryLine')) {
                        currentElement = editor.selection.getNode().closest('.poetryLine');
                    }
                    if (!currentElement) {
                        currentElement = editor.selection.getNode();
                        let checkSpan = currentElement.getElementsByClassName("poetryLine");
                        if (!checkSpan.length) {
                            currentElement.innerHTML = '<span class="poetryLine"><br/></span>';
                            checkSpan = currentElement.getElementsByClassName("poetryLine");
                            editor.selection.setCursorLocation(checkSpan[0], 0);
                        } else {
                            editor.selection.setCursorLocation(checkSpan[0], 0);
                        }
                    }
                }
                this.currentCursorBookmark = editor.selection.bookmarkManager.getBookmark();
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
        let self = this;
        editor.ui.registry.addButton("tinyMcewirisformulaEditor", {
            icon: "tinymceformulaicon",
            tooltip: "WIRIS EDITOR math",
            onAction: function (_) {
                if (self && self.props && self.props.element && self.props.element.type === 'stanza') {
                    let currentElement = editor.selection.getNode();
                    if ((editor.selection.getNode().tagName && editor.selection.getNode().tagName.toLowerCase() !== 'span') || (editor.selection.getNode().className && editor.selection.getNode().className.toLowerCase() !== 'poetryLine')) {
                        currentElement = editor.selection.getNode().closest('.poetryLine');
                    }
                    if (!currentElement) {
                        currentElement = editor.selection.getNode();
                        let checkSpan = currentElement.getElementsByClassName("poetryLine");
                        if (!checkSpan.length) {
                            currentElement.innerHTML = '<span class="poetryLine"><br/></span>';
                            checkSpan = currentElement.getElementsByClassName("poetryLine");
                            editor.selection.setCursorLocation(checkSpan[0], 0);
                        } else {
                            editor.selection.setCursorLocation(checkSpan[0], 0);
                        }
                    }
                }
                this.currentCursorBookmark = editor.selection.bookmarkManager.getBookmark();
                var wirisPluginInstance = window.WirisPlugin.instances[editor.id];
                wirisPluginInstance.core.getCustomEditors().disable();
                wirisPluginInstance.openNewFormulaEditor();
            },
            onSetup: (buttonApi) => {
                /*
                    make merge menu button apis available globally among compnenet
                */
                this.mathMlMenuButton = buttonApi;
            }
        });
    };

    /**
     * Adding button for Cross Linking
     * @param {*} editor  editor instance
     */
    addCrossLinkingIcon = editor => {

        editor.ui.registry.addMenuButton("crossLinkingIcon", {
            text: "",
            icon: "crosslinkingicon",
            tooltip: "Cross Linking",
            fetch: cb => {
                let items = [];

                if ('element' in this.props && 'type' in this.props.element) {
                    if (this.props.element.type !== 'showhide') {
                        items = [
                            {
                                type: 'menuitem',
                                text: 'Figure Link',
                                tooltip: "Figure Link",
                                onAction: () => {
                                    let selectedText = window.getSelection().toString();
                                    if (selectedText.length) {
                                        this.addAssetPopover(editor, selectedText)
                                    }
                                },
                                onSetup: (buttonApi) => {
                                    /*
                                    make merge menu button apis available globally among compnenet
                                    */
                                    let selectedText = window.getSelection().toString();
                                    this.assetPopoverButtonState = buttonApi;
                                    if (!selectedText.length) {
                                        this.assetPopoverButtonState.setDisabled();
                                    }
                                }
                            }
                        ];
                    }


                    if (this.props.element.type == 'element-authoredtext' || this.props.element.type == 'element-list' || this.props.element.type == 'showhide') {
                        items = [
                            ...items,
                            {
                                type: 'menuitem',
                                text: "Slate Link",
                                tooltip: "Slate Link",
                                onAction: () => {
                                    let selectedText = window.getSelection().toString();
                                    if (!hasReviewerRole() && selectedText.length) {
                                        this.addPageLink(editor, selectedText)
                                    }
                                },
                            }
                        ];
                    }
                }

                cb(items)
            },
        });
    }

    /**
     * Adding button for asset popover
     * @param {*} editor  editor instance
     */
    addAssetPopoverIcon = editor => {

        editor.ui.registry.addToggleButton("assetPopoverIcon", {
            text: "",
            icon: "assetpopovericon",
            tooltip: "Asset Popover",
            onAction: () => {
                let selectedText = window.getSelection().toString();
                if (selectedText.length) {
                    this.addAssetPopover(editor, selectedText)
                }
            },
            onSetup: (buttonApi) => {
                /*
                make merge menu button apis available globally among compnenet
                */
                let selectedText = window.getSelection().toString();
                this.assetPopoverButtonState = buttonApi;
                if (!selectedText.length) {
                    this.assetPopoverButtonState.setDisabled();
                }
            }
        });
    }


    changeTextElements = editor => {
        const self = this;
        editor.ui.registry.addMenuButton('formatSelector', {
            text: self.getElementTypeForToolbar(self.props.element),
            tooltip: 'formatSelector',
            onSetup: function () {
                document.querySelector('button[title="formatSelector"]').setAttribute('title', '');
                let newSpan = document.createElement('span');
                newSpan.className = "tooltip-text"
                newSpan.innerText = self.getElementTypeForToolbar(self.props.element);
                const tooltipLabel = document.querySelector('button[aria-label="formatSelector"] .tox-tbtn__select-label')
                if (tooltipLabel) {
                    tooltipLabel.after(newSpan)
                }
            },
            fetch: function (callback) {
                const items = FormatSelectors(self.elementConversion);
                callback(items);
                self.handleBlur(null, false)
            }
        });
    }

    elementConversion = (convertTo) => {
        const value = elementTypeOptions[convertTo].primaryOption;
        const labelText = elementTypeOptions[convertTo].label;
        const secondaryOption = elementTypeOptions[convertTo].secondaryOption;
        this.props.conversionElement({
            elementId: this.props.element.id,
            elementType: 'element-authoredtext',
            primaryOption: value,
            secondaryOption: secondaryOption,
            labelText: labelText,
            toolbar: elementList['element-authoredtext'][value].toolbar
        });
        setFormattingToolbar('disableTinymceToolbar')
        this.elementConverted = true;
    }

    getElementTypeForToolbar = (element) => {
        switch (element.type) {
            case "element-authoredtext":
                if (element.elementdata.headers)
                    return `Heading ${element.elementdata.headers[0].level}`
                else
                    return "Paragraph"
            case "element-blockfeature":
                if (element.elementdata.type === "pullquote")
                    return "Pullquote"
                else
                    return "Blockquote"
            case "element-learningobjectives":
                return "Learning Objective Item"
            default:
                return 'Paragraph'
        }
    }
    editorPaste = (editor) => {
        editor.on('paste', (e) => {
            let activeElement = editor.dom.getParent(editor.selection.getStart(), '.cypress-editable');
            if (activeElement.nodeName === "CODE") {
                let syntaxEnabled = document.querySelector('.panel_syntax_highlighting .switch input');
                if (syntaxEnabled && syntaxEnabled.checked) {
                    this.notFormatting = true;
                }
                else {
                    this.notFormatting = false;
                }
                if (this.notFormatting) {
                    let text = e.clipboardData.getData("text/plain");
                    text = String(text).replace(/&/g, '&amp;');
                    text = String(text).replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    text = String(text).replace(/\r|\n/g, '<br>');
                    text = String(text).replace(/ /g, '&nbsp;');
                    text = String(text).replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
                    text = String(text).replace(/<br><br>/g, '<br>');
                    text = text + '<span id="BCEposition"></span>';
                    this.copyContent = text;
                }
            } else if (this.props.element && this.props.element.type === "element-blockfeature") {
                let text = e.clipboardData.getData("text/plain");
                text = String(text).replace(/&/g, '&amp;');
                text = String(text).replace(/</g, '&lt;').replace(/>/g, '&gt;');
                text = text + '<em id="BQposition"></em>';
                this.copyContent = text;
            }
        });
    }

    /**
     * Called before paste process
     * @param {*} plugin
     * @param {*} args
     */
    pastePreProcess = (plugin, args) => {
        let activeElement = tinymce.activeEditor.dom.getParent(tinymce.activeEditor.selection.getStart(), '.cypress-editable');
        if (this.props.element && this.props.element.figuretype && this.props.element.figuretype === "codelisting" && this.notFormatting && (activeElement && activeElement.nodeName === 'CODE')) {
            args.content = this.copyContent;
            this.copyContent = '';
            return;
        }
        if (this.props.element && this.props.element.type === "element-blockfeature") {
            args.content = this.copyContent;
            this.copyContent = '';
            return;
        }
        if (this.props.element && this.props.element.type && this.props.element.type === 'element-list') {
            args.content = args.content.replace(/<ul>.*?<\/ul>/g, "")
        }
        let testElement = document.createElement('div');
        testElement.innerHTML = args.content;
        if (testElement.innerText.trim().length) {
            let tempContent = testElement.innerText.replace(/&/g, "&amp;");
            args.content = tempContent.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        } else {
            args.content = tinymce.activeEditor.selection.getContent();
        }
        if (this.props.element && this.props.element.figuretype && this.props.element.figuretype === "codelisting" && !this.notFormatting) {
            args.content = args.content.replace(/\r|\n/g, '');
        }
    }

    pastePostProcess = (plugin, args) => {
        let activeElement = tinymce.activeEditor.dom.getParent(tinymce.activeEditor.selection.getStart(), '.cypress-editable');
        if (this.props.element && this.props.element.figuretype && this.props.element.figuretype === "codelisting" && this.notFormatting && (activeElement && activeElement.nodeName === 'CODE')) {
            let paste_content = args.node.innerHTML;
            let tempArr = paste_content.split("<br>");
            let nodesFragment = document.createDocumentFragment();
            for (let index = 0; index < tempArr.length; index++) {
                let newSpan = document.createElement('span');
                newSpan.innerHTML = tempArr[index];
                newSpan.className = 'codeNoHighlightLineOne';
                nodesFragment.appendChild(newSpan);
            }
            args.node.innerHTML = "";
            args.node.appendChild(nodesFragment);
            let self = this;
            setTimeout(() => { self.makeReplace(); }, 0);
        }
        else if (this.props.element && this.props.element.type === "element-blockfeature") {
            let self = this;
            setTimeout(() => { self.makeBqReplace(); }, 0);
        }
    }

    makeBqReplace = () => {
        let positionElement = document.getElementById('BQposition');
        if (positionElement) {
            tinymce.activeEditor.selection.setCursorLocation(positionElement, 0);
            positionElement.remove();
        }
    }

    makeReplace = () => {
        let innerSpans = document.getElementsByClassName('codeNoHighlightLineOne');
        if (innerSpans.length) {
            let parentNode = innerSpans[0].parentNode;
            let elem = innerSpans[0];
            if (parentNode.nodeName !== 'SPAN' && parentNode.className !== 'codeNoHighlightLine') {
                while (elem.parentNode.className !== 'codeNoHighlightLine' && elem.parentNode.nodeName.toLowerCase() != 'span') {
                    elem = elem.parentNode;
                }
                parentNode = elem.parentElement;
            }
            parentNode.className = "TempSpan";
            let boldTags = parentNode.getElementsByTagName('STRONG');
            while (boldTags.length) {
                let tempInnerHTML = boldTags[0].innerHTML;
                boldTags[0].outerHTML = tempInnerHTML;
            }
            let uTags = parentNode.getElementsByTagName('U');
            while (uTags.length) {
                let tempInnerHTML = uTags[0].innerHTML;
                uTags[0].outerHTML = tempInnerHTML;
            }
            let emTags = parentNode.getElementsByTagName('EM');
            while (emTags.length) {
                let tempInnerHTML = emTags[0].innerHTML;
                emTags[0].outerHTML = tempInnerHTML;
            }
            while (innerSpans.length) {
                innerSpans[0].className = 'codeNoHighlightLine';
            }
            let startText = '';
            let endText = '';
            let textNode = [];
            let startFlag = true;
            let element = document.getElementsByClassName('TempSpan')[0];
            for (let index = 0; index < element.childNodes.length; ++index) {
                if (element.childNodes[index].nodeType === Node.TEXT_NODE || element.childNodes[index].id === 'BCEposition') {
                    textNode.push(element.childNodes[index]);
                    if (startFlag) {
                        startText += element.childNodes[index].textContent;
                    } else {
                        endText += element.childNodes[index].textContent;
                    }
                } else {
                    startFlag = false;
                }
            }
            startText = String(startText).replace(/&/g, "&amp;");
            startText = String(startText).replace(/</g, '&lt;').replace(/>/g, '&gt;');
            endText = String(endText).replace(/&/g, "&amp;");
            endText = String(endText).replace(/</g, '&lt;').replace(/>/g, '&gt;');
            while (textNode.length) {
                if (textNode[0].parentNode) {
                    textNode[0].parentNode.removeChild(textNode[0]);
                }
                textNode.splice(0, 1);
            }
            let allSpans = document.getElementsByClassName('TempSpan')[0].getElementsByClassName('codeNoHighlightLine');
            if (allSpans.length) {
                if (startText != '') {
                    allSpans[0].innerHTML = startText + allSpans[0].innerHTML;
                }
                if (endText != '') {
                    allSpans[allSpans.length - 1].innerHTML = allSpans[allSpans.length - 1].innerHTML + endText;
                }
            }
            let innerHTML = document.getElementsByClassName('TempSpan')[0].innerHTML;
            document.getElementsByClassName('TempSpan')[0].outerHTML = innerHTML;

        }
        let remainSpans = document.getElementsByClassName('codeNoHighlightLineOne');
        while (remainSpans.length) {
            remainSpans[0].parentNode.removeChild(remainSpans[0]);
        }
        let positionElement = document.getElementById('BCEposition');
        tinymce.activeEditor.selection.setCursorLocation(positionElement, 0);
        positionElement.remove();
        tinymce.activeEditor.undoManager.clear();
    }

    /**
     * Sets cursor position and content after indent or outdent
     * @param {*} editor  editor instance
     * @param {*} content  content inside editor
     */
    setContentAndPlaceCaret = (editor, content) => {
        clickedX = editor.selection.getBoundingClientRect().left;
        clickedY = editor.selection.getBoundingClientRect().top;
        editor.setContent(content)
        editor.selection.placeCaretAt(clickedX, clickedY);
    }

    /**
     * Handles indent behaviour for paragraph on indent command execution
     * @param {*} e  event object
     * @param {*} editor  editor instance
     * @param {*} content  content inside editor
     */
    handleIndent = (e, editor, content, type, selectedNode) => {
        let className = null;
        if (type && type === 'stanza' && selectedNode) {
            className = selectedNode.className;
        }
        if (content.match(/paragraphNumeroUno\b/)) {
            content = content.replace(/paragraphNumeroUno\b/, "paragraphNumeroUnoIndentLevel1")
        }
        else if (content.match(/paragraphNumeroUnoIndentLevel1\b/)) {
            content = content.replace(/paragraphNumeroUnoIndentLevel1\b/, "paragraphNumeroUnoIndentLevel2")
        }
        else if (content.match(/paragraphNumeroUnoIndentLevel2\b/)) {
            content = content.replace(/paragraphNumeroUnoIndentLevel2\b/, "paragraphNumeroUnoIndentLevel3")
        }

        // Disable Indent For Poetry-Stanza

        /*else if (className && className.trim() === 'poetryLine') {
            selectedNode.className = 'poetryLine poetryLineLevel1';
            this.indentRun = true;
        }
        else if (className && className.trim() === 'poetryLine poetryLineLevel1') {
            selectedNode.className = 'poetryLine poetryLineLevel2';
            this.indentRun = true;
        }
        else if (className && className.trim() === 'poetryLine poetryLineLevel2') {
            selectedNode.className = 'poetryLine poetryLineLevel3';
            this.indentRun = true;
        }*/
        if (!className) {
            this.setContentAndPlaceCaret(editor, content)
        }
    }

    /**
     * Handles outdent behaviour for paragraph on outdent command execution
     * @param {*} e  event object
     * @param {*} editor  editor instance
     * @param {*} content  content inside editor
     */
    handleOutdent = (e, editor, content, type, selectedNode) => {
        let className = null;
        if (type && type === 'stanza' && selectedNode) {
            className = selectedNode.className;
        }
        if (content.match(/paragraphNumeroUnoIndentLevel3\b/)) {
            content = content.replace(/paragraphNumeroUnoIndentLevel3\b/, "paragraphNumeroUnoIndentLevel2")
        }
        else if (content.match(/paragraphNumeroUnoIndentLevel2\b/)) {
            content = content.replace(/paragraphNumeroUnoIndentLevel2\b/, "paragraphNumeroUnoIndentLevel1")
        }
        else if (content.match(/paragraphNumeroUnoIndentLevel1\b/)) {
            content = content.replace(/paragraphNumeroUnoIndentLevel1\b/, "paragraphNumeroUno")
        }

        // Disable Outdent For Poetry-Stanza

        /*else if (className && className.trim() === 'poetryLine poetryLineLevel1') {
            selectedNode.className = 'poetryLine';
            this.outdentRun = true;
        }
        else if (className && className.trim() === 'poetryLine poetryLineLevel2') {
            selectedNode.className = 'poetryLine poetryLineLevel1';
            this.outdentRun = true;
        }
        else if (className && className.trim() === 'poetryLine poetryLineLevel3') {
            selectedNode.className = 'poetryLine poetryLineLevel2';
            this.outdentRun = true;
        }*/
        if (!className) {
            this.setContentAndPlaceCaret(editor, content)
        }
    }

    /**
     * Performs action before indent command is executed
     * @param {*} e  event object
     * @param {*} content  content inside editor
     */
    onBeforeIndent = (e, content, type, selectedNode) => {
        let className = null;
        if (type && type === 'stanza' && selectedNode) {
            className = selectedNode.className;
        }
        if (!content.match(/paragraphNumeroUno\b/) && !content.match(/paragraphNumeroUnoIndentLevel1\b/) && !content.match(/paragraphNumeroUnoIndentLevel2\b/) && !content.match(/paragraphNumeroUnoIndentLevel3\b/) && !className) {
            e.preventDefault()
        }
        if (content.match(/paragraphNumeroUnoIndentLevel3\b/) || (className && className.trim() === 'poetryLine poetryLineLevel3')) {
            e.preventDefault()
        }
    }

    /**
     * Performs action before outdent command is executed
     * @param {*} e  event object
     * @param {*} content  content inside editor 
     */
    onBeforeOutdent = (e, content, type, selectedNode) => {
        let className = null;
        if (type && type === 'stanza' && selectedNode) {
            className = selectedNode.className;
        }
        if (!content.match(/paragraphNumeroUno\b/) && !content.match(/paragraphNumeroUnoIndentLevel1\b/) && !content.match(/paragraphNumeroUnoIndentLevel2\b/) && !content.match(/paragraphNumeroUnoIndentLevel3\b/) && !className) {
            e.preventDefault()
        }
        if (content.match(/paragraphNumeroUno\b/) || (className && className.trim() === 'poetryLine')) {
            e.preventDefault()
        }
    }

    /**
     * Called when footnote button is clicked. Responsible for adding footnote
     * @param {*} editor  editor instance
     */
    addFootnote = async (editor) => {
        if (config.savingInProgress || config.popupCreationCallInProgress) {
            return false
        }
        let elementId = ""
        let selectedElement = editor.selection.getNode();
        if (selectedElement.tagName.toLowerCase() === 'sup' || (selectedElement.tagName.toLowerCase() === 'a' && selectedElement.parentNode.tagName.toLowerCase() === 'sup')) {
            let parentNode = selectedElement.parentNode;
            let endPosition = true;
            if (selectedElement.tagName.toLowerCase() === 'a') {
                let bomPosition = selectedElement.innerHTML.indexOf("﻿");
                if (bomPosition === 0) {
                    endPosition = false;
                }
                selectedElement = selectedElement.parentNode;
                parentNode = selectedElement.parentNode;
            } else {
                let chindNodes = selectedElement.childNodes;
                if (chindNodes.length) {
                    if (chindNodes[0].nodeType === Node.TEXT_NODE && (chindNodes[0].parentElement && chindNodes[0].parentElement.nodeName.toLocaleLowerCase() !== 'sup')) {
                        endPosition = false;
                    }
                }
            }
            parentNode.innerHTML = removeBOM(parentNode.innerHTML);
            let existingInnerHTML = '<sup>' + removeBOM(selectedElement.innerHTML) + '</sup>';
            let innerHtml = existingInnerHTML + '<span id="footnote-attacher"></span>';
            if (!endPosition) {
                innerHtml = '<span id="footnote-attacher"></span>' + existingInnerHTML;
            }
            let parentInnerHtml = removeBOM(parentNode.innerHTML);
            let newParentInnerHtml = parentInnerHtml.replace(existingInnerHTML, innerHtml);
            parentNode.innerHTML = newParentInnerHtml;
        }
        if (this.props.element.type === "popup") {
            if ((this.props.popupField === "formatted-title" || this.props.popupField === "formatted-subtitle") && !this.props.currentElement) {
                let footNoteSpan = document.getElementById('footnote-attacher');
                if (!footNoteSpan) {
                    editor.selection.setContent('<span id="footnote-attacher"></span>');
                }
                await this.props.createPopupUnit(this.props.popupField, true, this.props.index, this.props.element, true)
                elementId = this.props.currentElement && this.props.currentElement.id
            } else {
                elementId = this.props.currentElement.id
            }
        }
        else if (this.props.element.type === "poetry") {
            let tempIndex = this.props.index.split('-');
            let indexesLen = tempIndex.length;
            if (indexesLen === 2) {
                switch (tempIndex[1]) {
                    case "1":
                        if (!this.props.element.contents['formatted-title']) {
                            return false;
                        }
                        break;
                    case "4":
                        if (!(this.props.element.contents['creditsarray'] ? this.props.element.contents['creditsarray'][0] : null)) {
                            return false;
                        }
                }
            }
            elementId = this.props.elementId
            let footNoteSpan = document.getElementById('footnote-attacher');
            if (!footNoteSpan) {
                editor.selection.setContent('<span id="footnote-attacher"></span>');
            }
        }
        else {
            elementId = this.props.elementId
            let footNoteSpan = document.getElementById('footnote-attacher');
            if (!footNoteSpan) {
                //let liNode = editor.selection.getNode().getElementsByTagName ? editor.selection.getNode().getElementsByTagName('LI') : [];
                //console.log('editor.selection.getNode()', editor.selection.getNode());
                editor.selection.setContent('<span id="footnote-attacher"></span>'); //Fixing the issue BG-3561
                /*if (liNode.length && this.props.element && this.props.element.type === "element-list") {
                    let liInnerHtml = liNode[0].innerHTML;
                    liInnerHtml = '<span id="footnote-attacher"></span>' + liInnerHtml;
                    liNode[0].innerHTML = liInnerHtml;
                } else {
                    editor.selection.setContent('<span id="footnote-attacher"></span>');
                }*/
            }
        }
        config.isCreateFootnote = true
        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
        getGlossaryFootnoteId(elementId, "FOOTNOTE", res => {
            if (res.data && res.data.id) {
                let tempDiv = document.createElement('div');
                tempDiv.innerHTML = tinyMCE.activeEditor.getContent();
                tinymce.$(tempDiv).find('.blockquote-hidden').remove()
                if (this.props.model && this.props.model.text && this.props.model.text.includes("blockquoteMarginaliaAttr") && !tempDiv.innerText.trim()) {
                    let insertText = `<blockquote class="blockquoteMarginaliaAttr" contenteditable="false"><p class="paragraphNummerEins" contenteditable="true"><sup><a href="#" id = "${res.data.id}" data-uri="${res.data.id}" data-footnoteelementid="${res.data.id}" class="Pearson-Component paragraphNumeroUnoFootnote">*</a></sup></p><p class="blockquoteTextCredit" contenteditable="true" data-placeholder="Attribution Text">${document.getElementsByClassName('blockquoteTextCredit')[0].innerHTML.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p></blockquote>`
                    tinymce.activeEditor.setContent(insertText);
                    document.getElementById(tinyMCE.activeEditor.id).classList.remove("place-holder")
                }
                else if (this.props.model && this.props.model.text && this.props.model.text.includes("blockquoteMarginalia") && !tempDiv.innerText.trim()) {
                    let insertText = `<blockquote class="blockquoteMarginalia" contenteditable="false"><p class="paragraphNummerEins" contenteditable="true"><sup><a href="#" id = "${res.data.id}" data-uri="${res.data.id}" data-footnoteelementid="${res.data.id}" class="Pearson-Component paragraphNumeroUnoFootnote">*</a></sup></p></blockquote>`;
                    tinymce.activeEditor.setContent(insertText);
                    document.getElementById(tinyMCE.activeEditor.id).classList.remove("place-holder")
                }
                else {
                    /**
                     * Case when element is created on the spot with footnote to fix position issue.
                     * Relevant for Popup and Poetry subtitle. 
                     */
                    let domNode = document.getElementById('footnote-attacher');
                    if (domNode) {
                        domNode.outerHTML = `<sup><a href="#" id = "${res.data.id}" data-uri="${res.data.id}" data-footnoteelementid="${res.data.id}" class="Pearson-Component paragraphNumeroUnoFootnote">*</a></sup>`;
                    } else {
                        editor.insertContent(`<sup><a href="#" id = "${res.data.id}" data-uri="${res.data.id}" data-footnoteelementid="${res.data.id}" class="Pearson-Component paragraphNumeroUnoFootnote">*</a></sup>`);
                    }
                }
                this.footnoteGlossaryProgress = true;
                this.toggleGlossaryandFootnotePopup(true, "Footnote", res.data.id, () => { this.toggleGlossaryandFootnoteIcon(true); });
                this.saveContent()
            }
        })
    }
    learningObjectiveDropdown(text) {
        this.props.learningObjectiveOperations(text);
    }

    // Handle Glossary for Italic
    handleGlossaryForItalic = (activeElement, dataURIId) => {
        let dfn = activeElement.querySelector(`dfn[data-uri="${dataURIId}"]`);
        let emTag = dfn.closest('em');
        if (emTag) {
            dfn.innerHTML = '<em>' + dfn.innerHTML + '</em>'
            if (emTag.textContent === dfn.textContent) {
                let innerHTML = emTag.innerHTML;
                emTag.outerHTML = innerHTML;
            } else {
                spanHandlers.splitOnTag(emTag.parentNode, dfn);
            }
        }
    }

    /**
     * Called when glossary button is clicked. Responsible for adding glossary
     * @param {*} editor  editor instance 
     */
    addGlossary = (editor) => {
        let sText = editor.selection.getContent();
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(sText, 'text/html');
        let spans = htmlDoc.getElementsByClassName("poetryLine");
        let activeElement = editor.dom.getParent(editor.selection.getStart(), '.cypress-editable');
        if (spans && spans.length) {
            store.dispatch({
                type: MULTIPLE_LINE_POETRY_ERROR_POPUP,
                payload: {
                    show: true,
                    message: ERROR_CREATING_GLOSSARY
                }
            })
            return false;
        }
        let selectedText = window.getSelection().toString()
        selectedText = String(selectedText).replace(/</g, '&lt;').replace(/>/g, '&gt;');
        this.glossaryTermText = selectedText;
        if (selectedText.trim() === "") {
            return false
        }
        config.isCreateGlossary = true
        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
        getGlossaryFootnoteId(this.props.elementId, "GLOSSARY", res => {
            let insertionText = ""
            if (res.data && res.data.id) {
                insertionText = `<dfn data-uri= ${res.data.id} class="Pearson-Component GlossaryTerm">${selectedText}</dfn>`
            }
            editor.selection.setContent(insertionText);
            this.handleGlossaryForItalic(activeElement, res.data.id);
            this.toggleGlossaryandFootnotePopup(true, "Glossary", res.data && res.data.id || null, () => { this.toggleGlossaryandFootnoteIcon(true); });
            this.saveContent()
        })
    }

    /**
     * Saves glossary/footnote on creation
     */
    saveContent = () => {
        const { glossaryFootnoteValue, poetryField } = this.props;
        let { elementType, glossaryfootnoteid, type, elementSubType, glossaryTermText } = glossaryFootnoteValue;
        let typeWithPopup = this.props.element ? this.props.element.type : "";
        let term = null;
        let definition = null;
        let termText = glossaryTermText.replace(/^(\ |&nbsp;|&#160;)+|(\ |&nbsp;|&#160;)+$/g, '&nbsp;');
        // term = document.querySelector('#glossary-editor > div > p') && `<p>${document.querySelector('#glossary-editor > div > p').innerHTML}</p>` || "<p></p>"
        term = `<p>${termText}</p>` || "<p></p>"
        definition = document.querySelector('#glossary-editor-attacher > div > p') && `<p>${document.querySelector('#glossary-editor-attacher > div > p').innerHTML}</p>` || "<p><br/></p>"
        term = term.replace(/<br data-mce-bogus="1">/g, "")
        definition = definition.replace(/<br data-mce-bogus="1">/g, "")
        customEvent.subscribe('glossaryFootnoteSave', (elementWorkId) => {
            saveGlossaryAndFootnote(elementWorkId, elementType, glossaryfootnoteid, type, term, definition, elementSubType, typeWithPopup, poetryField)
            customEvent.unsubscribe('glossaryFootnoteSave');
        })
        this.handleBlur(null, true); //element saving before creating G/F (as per java team)
        //this.handleBlur(null, true);
    }

    /**
     * Called when page link option is clicked. Responsible for adding page link
     * @param {*} editor  editor instance
     * @param {*} selectedText  selected text
     */
    addPageLink = (editor, selectedText) => {
        sendDataToIframe({ 'type': 'tocToggle', 'message': { open: false } });
        let selection = window.getSelection().anchorNode.parentNode;
        let selectedTag = selection.nodeName;
        let selectedTagClass = selection.classList;
        selectedText = String(selectedText).replace(/</g, '&lt;').replace(/>/g, '&gt;');

        let parentNode = true;
        do {
            if (selectedTag !== "LI" && selectedTag !== "P" && selectedTag !== "H3" && selectedTag !== "BLOCKQUOTE" && (!selectedTagClass.contains('poetryLine'))) {
                //selectedText = window.getSelection().anchorNode.parentNode.outerHTML;
                selectedText = '<' + selectedTag.toLocaleLowerCase() + '>' + selectedText + '</' + selectedTag.toLocaleLowerCase() + '>';
                selection = selection.parentNode;
                selectedTag = selection.nodeName;
                selectedTagClass = selection.classList;
            } else {
                parentNode = false;
            }
        } while (parentNode);

        let activeElement = tinymce.activeEditor.targetElm.closest('.element-container');
        let linkCount = Math.floor(Math.random() * 100) + '-' + Math.floor(Math.random() * 10000);
        let insertionText = '<span asset-id="page-link-' + linkCount + '" class="page-link-attacher ' + selectedTag.toLocaleLowerCase() + '" element-id="' + activeElement.getAttribute('data-id') + '">' + selectedText + '</span>';
        editor.insertContent(insertionText);
        // editor.selection.setContent(insertionText);
        if (selection.innerHTML) {
            let spanTag = selection.getElementsByClassName('page-link-attacher');
            if (spanTag.length) {
                let tempElem = spanTag[0];
                let parentElement = tempElem.parentNode;
                let childNode = tempElem.childNodes;
                if (childNode.length) {
                    if (parentElement.nodeName === childNode[0].nodeName) {
                        let parenChildNode = parentElement.childNodes;
                        if (parenChildNode.length && parenChildNode.length === 1) {
                            let innerHTML = parentElement.innerHTML;
                            parentElement.outerHTML = innerHTML;
                        } else {
                            let innerHTML = childNode[0].innerHTML;
                            childNode[0].outerHTML = innerHTML;
                        }
                    }
                }
            }
        } else {
            selection.parentNode.removeChild(selection);
        }
        sendDataToIframe({ 'type': LaunchTOCForCrossLinking, 'message': { open: true, case: 'new', element: activeElement.getAttribute('data-id'), link: 'page-link-' + linkCount, blockCanvas: true, crossLink: true } });
    }


    /**
     * Called when asset popover button is clicked. Responsible for adding asset popover
     * @param {*} editor  editor instance
     * @param {*} selectedText  selected text
     */
    addAssetPopover = (editor, selectedText) => {
        let sText = editor.selection.getContent();
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(sText, 'text/html');
        let spans = htmlDoc.getElementsByClassName("poetryLine");
        if (spans && spans.length) {
            store.dispatch({
                type: MULTIPLE_LINE_POETRY_ERROR_POPUP,
                payload: {
                    show: true,
                    message: ERROR_CREATING_ASSETPOPOVER
                }
            })
            return false;
        }

        let selection = window.getSelection().anchorNode.parentNode;
        let selectedTag = selection.nodeName;
        let selectedTagClass = selection.classList;
        selectedText = String(selectedText).replace(/</g, '&lt;').replace(/>/g, '&gt;');

        let parentNode = true;
        do {
            if (selectedTag !== "LI" && selectedTag !== "P" && selectedTag !== "H3" && selectedTag !== "BLOCKQUOTE" && (!selectedTagClass.contains('poetryLine'))) {
                //selectedText = window.getSelection().anchorNode.parentNode.outerHTML;
                selectedText = '<' + selectedTag.toLocaleLowerCase() + '>' + selectedText + '</' + selectedTag.toLocaleLowerCase() + '>';
                selection = selection.parentNode;
                selectedTag = selection.nodeName;
                selectedTagClass = selection.classList;
            } else {
                parentNode = false;
            }
        } while (parentNode);

        let insertionText = '<span id="asset-popover-attacher">' + selectedText + '</span>';
        editor.insertContent(insertionText);
        // editor.selection.setContent(insertionText);
        if (selection.innerHTML) {
            let spanTag = selection.getElementsByTagName('SPAN');
            if (spanTag.length) {
                let tempElem = spanTag[0];
                let parentElement = tempElem.parentNode;
                let childNode = tempElem.childNodes;
                if (childNode.length) {
                    if (parentElement.nodeName === childNode[0].nodeName) {
                        let parenChildNode = parentElement.childNodes;
                        if (parenChildNode.length && parenChildNode.length === 1) {
                            let innerHTML = parentElement.innerHTML;
                            parentElement.outerHTML = innerHTML;
                        } else {
                            let innerHTML = childNode[0].innerHTML;
                            childNode[0].outerHTML = innerHTML;
                        }
                    }
                }
            }
        } else {
            selection.parentNode.removeChild(selection);
        }
        customEvent.subscribe('assetPopoverSave', () => {
            this.handleBlur(null, true);
            customEvent.unsubscribe('assetPopoverSave');
        })
        this.props.openAssetPopoverPopUp(true);
        sendDataToIframe({ 'type': 'disableTOC', 'message': {} });
    }

    checkElementIds = () => {
        if (tinymce.editors.length) {

            /**
             * Use below lines for compare the active element ID and new created element ID
             * whether previous one new created instance or not on figure type element
             */

            let activeElementObj = tinymce.activeEditor.id.split("-");
            let activeElementID = activeElementObj[1];
            let editorRefObj = this.editorRef.current.id.split("-");
            let editorRefID = editorRefObj[1];
            let newElement = localStorage.getItem('newElement');

            if (newElement && tinymce.activeEditor.id !== this.editorRef.current.id) {
                if (activeElementObj.length !== editorRefObj.length && activeElementID === editorRefID) {
                    activeElementObj[1] = parseInt(activeElementID) + 1;
                }
                /*
                    change wiris images to avoid converting to mathml
                */
                let tempContainerHtml = tinyMCE.$("#" + activeElementObj.join("-")).html();
                tempContainerHtml = tempContainerHtml.replace(/\sdata-mathml/g, ' data-temp-mathml').replace(/\"Wirisformula/g, '"temp_Wirisformula').replace(/\sWirisformula/g, ' temp_Wirisformula');
                let tinymceActiveEditorNode = document.getElementById(tinymce.activeEditor && tinymce.activeEditor.id)
                let isBlockQuote = tinymceActiveEditorNode && tinymceActiveEditorNode.classList.contains('blockquote-editor');
                if (!isBlockQuote) {
                    let activeElementNode = document.getElementById(activeElementObj.join("-"))
                    if (activeElementNode && tinymce.activeEditor.id == activeElementObj.join("-")) {
                        activeElementNode.innerHTML = tempContainerHtml;
                    }
                    // tinymce.remove('#' + activeElementObj.join("-"));
                }

                removeTinyDefaultAttribute(tinymce.activeEditor.targetElm)
                tinymce.$('.wrs_modal_desktop').remove();
            }
        }
    }

    /**
     * Called immediately before mounting occurs, and before Component#render. Avoid introducing any side-effects or subscriptions in this method.
     */
    componentWillMount() {
        /**
         * Defines initial placeholder
         */
        this.handlePlaceholder()
    }

    /**
     * React's lifecycle method. Called immediately after a component is mounted. Setting state here will trigger re-rendering. 
     */
    componentDidMount() {
        let currentNode = document.getElementById('cypress-' + this.props.index);
        if (currentNode.getElementsByTagName("IMG").length) {
            currentNode.innerHTML = this.getNodeContent();
        }
        const { slateLockInfo: { isLocked } } = this.props
        const userId = this.props.slateLockInfo && this.props.slateLockInfo.userId.replace(/.*\(|\)/gi, '');

        /**
         * case -  initialize first tinymce instance on very first editor element by default
         */
        if (!(isLocked && config.userId !== userId)) {

            /**
             * Check localstorage value to find out if did mount is calling for new created element
             */
            let newElement = localStorage.getItem('newElement');
            if (!tinymce.editors.length || newElement) {

                this.checkElementIds();

                /*
                    Removing the blinking cursor on first load by making it transparent
                */


                if (this.editorRef.current) {
                    if (!(this.props.element && this.props.element.figuretype === "codelisting" && this.props.element.figuredata.programlanguage && this.props.element.figuredata.programlanguage === "Select")) {
                        this.editorRef.current.style.caretColor = 'transparent';
                        this.editorRef.current.focus();
                    } else {
                        this.props.handleEditorFocus("", null, null)
                    }
                }


                this.setToolbarByElementType();
                // Make element active on element create, set toolbar for same and remove localstorage values
                if (this.editorRef.current && document.getElementById(this.editorRef.current.id) && newElement) {
                    config.editorRefID = this.editorRef.current.id;
                    let timeoutId = setTimeout(() => {
                        if (!(this.props.element && this.props.element.figuretype === "codelisting" && this.props.element.figuredata.programlanguage && this.props.element.figuredata.programlanguage === "Select")) {
                            document.getElementById(this.editorRef.current.id).click();
                        }
                        clearTimeout(timeoutId)
                    }, 0)
                    localStorage.removeItem('newElement');
                }
                let currentId = (this.editorRef.current ? this.editorRef.current.id : 'cypress-0');
                this.editorConfig.selector = '#' + currentId;

                /**
                 * Before removing the current tinymce instance, update wiris image attribute data-mathml to data-temp-mathml and class Wirisformula to temp_Wirisformula
                 * As removing tinymce instance, also updates the images made by the wiris plugin to mathml
                 */
                let tempFirstContainerHtml = tinyMCE.$("#" + (this.editorRef.current ? this.editorRef.current.id : 'cypress-0')).html()
                tempFirstContainerHtml = tempFirstContainerHtml.replace(/\sdata-mathml/g, ' data-temp-mathml').replace(/\"Wirisformula/g, '"temp_Wirisformula').replace(/\sWirisformula/g, ' temp_Wirisformula');
                //Test Case Changes
                if (this.editorRef.current && document.getElementById(this.editorRef.current.id)) {
                    document.getElementById(this.editorRef.current.id).innerHTML = tempFirstContainerHtml;
                }

                let termText = tinyMCE.$("#" + currentId) && tinyMCE.$("#" + currentId).html();
                //PCAT-9077 - duplicate toolbar issue on element creation
                tinymce.remove()
                tinymce.init(this.editorConfig).then((d) => {
                    if (this.editorRef.current) {
                        if (termText && termText.length && this.props.element.type === 'figure') {
                            document.getElementById(currentId).innerHTML = termText;
                        }
                        if (this.props.element && this.props.element.type === "element-blockfeature") {
                            this.removeBogusTagsFromDom();
                            this.removeAttributionBr();
                        }

                        /*
                            Making blinking cursor color again to black
                        */
                        this.editorRef.current.style.caretColor = "rgb(0, 0, 0)";
                        if (!newElement) {
                            this.fromtinyInitBlur = true;
                            this.editorRef.current.focus();
                            this.editorRef.current.blur();
                            this.fromtinyInitBlur = false;
                        }
                    }
                })
            }
        }
    }
    getNodeContent = () => {
        const { slateLockInfo: { isLocked, userId } } = this.props;
        let lockCondition = isLocked && config.userId !== userId.replace(/.*\(|\)/gi, '');
        switch (this.props.tagName) {
            case 'p':
                let paraModel = this.props.model
                paraModel = removeBOM(paraModel)
                paraModel = removeImageCache(paraModel)
                return paraModel;

            case 'h4':
                let model = ""
                if (this.props.element && this.props.element.type === "popup") {
                    model = this.props.model && this.props.model.replace(/class="paragraphNumeroUno"/g, "")
                }
                else {
                    model = this.props.model;
                }
                let tempDiv = document.createElement('div');
                tempDiv.innerHTML = model;
                if (tempDiv && tempDiv.children && tempDiv.children.length && tempDiv.children[0].tagName === 'P') {
                    model = tempDiv.children[0].innerHTML;
                }
                model = removeBOM(model)
                model = removeImageCache(model)
                return model;

            case 'code':
                let codeModel = this.props.model
                codeModel = removeBOM(codeModel)
                codeModel = removeImageCache(codeModel)
                return codeModel;

            case 'blockquote':
                if (this.props.element && this.props.element.elementdata && (this.props.element.elementdata.type === "marginalia" || this.props.element.elementdata.type === "blockquote")) {
                    let temDiv = this.processBlockquoteHtml(this.props.model, this.props.element, lockCondition);
                    let bgModel=removeImageCache(temDiv.innerHTML)
                    return bgModel;
                } else {
                    let pqModel = this.props.model && this.props.model.text || '<p class="paragraphNumeroUno"><br/></p>'
                    pqModel = removeBOM(pqModel)
                    pqModel = removeImageCache(pqModel)
                    return pqModel;
                }

            case 'figureCredit':
                let figCreditModel = this.props.model
                figCreditModel = removeBOM(figCreditModel)
                figCreditModel = removeImageCache(figCreditModel)
                return figCreditModel;

            case 'element-citation':
                let ctModel = this.props.model && this.props.model.text || '<p class="paragraphNumeroUnoCitation"><br/></p>'
                ctModel = removeBOM(ctModel)
                ctModel = removeImageCache(ctModel)
                return ctModel;

            default:
                let defModel = this.props.model && this.props.model.text ? this.props.model.text : (typeof (this.props.model) === 'string' ? this.props.model : '<p class="paragraphNumeroUno"><br/></p>')
                defModel = removeBOM(defModel)
                //defModel=defModel.replace(/(?:.png).*?[\"]/g,'.png?'+(new Date()).getTime()+'"');
                defModel = removeImageCache(defModel)
                return defModel;
        }
    }

    /**
    * Defines initial placeholder
    */
    handlePlaceholder = () => {
        if ((this.props.element && this.props.element.type === "element-list") || (this.props.currentElement && this.props.currentElement.type === 'element-list')) {
            this.placeHolderClass = '';
        }
        else if (this.props.model && this.props.model.text) {
            let testElem = document.createElement('div');
            testElem.innerHTML = this.props.model.text;
            let isContainsMath = testElem.innerHTML.match(/<img/) ? (testElem.innerHTML.match(/<img/).input.includes('class="Wirisformula') || testElem.innerHTML.match(/<img/).input.includes('class="temp_Wirisformula')) : false;
            const isContainsBlankLine = testElem.innerHTML.match(/<span/) ? testElem.innerHTML.match(/<span/).input.includes('class="answerLineContent') : false;
            if (this.props.element && this.props.element.type === "element-blockfeature") {
                if (testElem.children[0] && testElem.children[0].children[0] && testElem.children[0].children[0].innerText.trim() == "" && !testElem.children[0].children[0].innerText.trim().length && !isContainsMath && !isContainsBlankLine) {
                    this.placeHolderClass = 'place-holder';
                }
                else {
                    this.placeHolderClass = '';
                }
            }
            else if (testElem.innerText || isContainsMath || isContainsBlankLine) {
                if (testElem.innerText.trim() == "" && !testElem.innerText.trim().length && !isContainsMath && !isContainsBlankLine) {
                    this.placeHolderClass = 'place-holder';
                }
                else {
                    this.placeHolderClass = '';
                }
            }
            else {
                this.placeHolderClass = 'place-holder';
            }
        }
        else if (this.props.model && this.props.model.figuredata && this.props.model.figuredata.text) {
            let testElem = document.createElement('div');
            testElem.innerHTML = this.props.model.figuredata.text;
            if (testElem.innerText.trim() == "" && !testElem.innerText.trim().length) {
                this.placeHolderClass = 'place-holder';
            }
            else {
                this.placeHolderClass = '';
            }
        } else if (this.props.model && this.props.model.figuredata && this.props.model.figuredata.preformattedtext) {
            let testElem = document.createElement('div');
            testElem.innerHTML = this.props.model.figuredata.preformattedtext;
            if (testElem.innerText.trim() == "" && !testElem.innerText.trim().length) {
                this.placeHolderClass = 'place-holder';
            }
            else {
                this.placeHolderClass = '';
            }
        } else {
            let testElem = document.createElement('div');
            testElem.innerHTML = this.props.model;
            let isContainsMath = testElem.innerHTML.match(/<img/) ? (testElem.innerHTML.match(/<img/).input.includes('class="Wirisformula') || testElem.innerHTML.match(/<img/).input.includes('class="temp_Wirisformula')) : false;
            const isContainsBlankLine = testElem.innerHTML.match(/<span/) ? testElem.innerHTML.match(/<span/).input.includes('class="answerLineContent') : false;
            if (!testElem.innerText.trim()) {
                testElem.innerText = "";
            }
            if (testElem.innerText.trim() == "" && !testElem.innerText.trim().length && !isContainsMath && !isContainsBlankLine) {
                this.placeHolderClass = 'place-holder';
            }
            else {
                this.placeHolderClass = '';
            }
        }
    }

    /**
     * React's lifecycle method. Called immediately after updating occurs. Not called for the initial render.
     */
    componentDidUpdate(prevProps) {
        let isBlockQuote = this.props.element && this.props.element.elementdata && (this.props.element.elementdata.type === "marginalia" || this.props.element.elementdata.type === "blockquote");
        if (isBlockQuote) {
            this.lastContent = document.getElementById('cypress-' + this.props.index).innerHTML;
        }
        if (this.elementConverted || prevProps.element.subtype !== this.props.element.subtype) {
            let elementTypeNode = document.querySelector('button[aria-label="formatSelector"] .tox-tbtn__select-label');
            if (elementTypeNode) {
                elementTypeNode.innerText = this.getElementTypeForToolbar(this.props.element);
            }
            /* tooltip code for text elements in toolbar */
            const tooltipText = document.querySelector('button[aria-label="formatSelector"] .tooltip-text')
            if (tooltipText) {
                tooltipText.innerText = this.getElementTypeForToolbar(this.props.element);
            }
            if ((this.props.element && this.props.element.type === "element-list") || (this.props.currentElement && this.props.currentElement.type === "element-list")) {
                highlightListIcon(this.props);
            }
            this.elementConverted = false;
        }
        this.removeMultiTinyInstance();
        this.handlePlaceholder()
        tinymce.$('.blockquote-editor').attr('contenteditable', false)
    }

    removeMultiTinyInstance = () => {
        let tinyMCEInstancesNodes = document.getElementsByClassName('tox tox-tinymce tox-tinymce-inline');

        if (tinyMCEInstancesNodes.length > 1) {
            if (tinyMCEInstancesNodes[1].parentElement.id !== "toolbarGlossaryFootnote") {
                tinyMCEInstancesNodes[0].remove()
            }
        }
    }

    componentWillUnmount() {
        /**
         * Fixing - 
         * 1. on selecting next element, list getting disappeared
         * 2. event doesn't get binded again on coverting list from para
         * 3 . etc related to tinymce not in sync issues
         * must code to sync tinymce editor instances ant any moment of time
         */
        for (let i = tinymce.editors.length - 1; i > -1; i--) {
            let ed_id = tinymce.editors[i].id;
            if (!(ed_id.includes('glossary') || ed_id.includes('footnote') || (this.props.element && this.props.element.type && this.props.element.type === "figure" && this.props.element.figuretype !== "interactive"))) {
                removeTinyDefaultAttribute(tinymce.activeEditor.targetElm)
                tinymce.remove(`#${ed_id}`)
                tinymce.$('.wrs_modal_desktop').remove();
            }
        }
    }

    setInstanceToolbar = () => {
        let toolbar = [];
        if (this.props.element.type === 'popup' && this.props.placeholder === 'Enter call to action...') {
            toolbar = config.popupCallToActionToolbar
        }
        else if (this.props.placeholder === "Enter Label..." || this.props.placeholder === 'Enter call to action...' || (this.props.element && this.props.element.subtype == 'mathml' && this.props.placeholder === "Type something...")) {
            toolbar = (this.props.element && (this.props.element.type === 'poetry' || this.props.element.type === 'popup' || this.props.placeholder === 'Enter call to action...')) ? config.poetryLabelToolbar : config.labelToolbar;
        }
        else if (this.props.placeholder === "Enter Caption..." || this.props.placeholder === "Enter Credit...") {
            toolbar = (this.props.element && this.props.element.type === 'poetry') ? config.poetryCaptionToolbar : config.captionToolbar;

        } else if (this.props.placeholder === "Enter block code...") {
            let syntaxEnabled = document.querySelector('.panel_syntax_highlighting .switch input');
            if (syntaxEnabled && syntaxEnabled.checked) {
                toolbar = config.codeListingToolbarDisabled;
            }
            else {
                toolbar = config.codeListingToolbarEnabled;
            }
        } else if (this.props.placeholder === "Enter Show text" || (this.props.placeholder === "Enter Hide text")) {
            toolbar = config.showHideToolbar
        } else if (this.props && this.props.showHideType && this.props.showHideType == 'revel') {
            toolbar = config.revelToolbar
        } else if (this.props.placeholder == "Type Something..." && this.props.element && this.props.element.type == 'stanza') {
            toolbar = config.poetryStanzaToolbar;
        } else {
            toolbar = config.elementToolbar;
        }
        return toolbar;
    }

    removeBogusTagsFromDom = () => {
        let bogusTag = document.querySelector(`#cypress-${this.props.index} [data-mce-bogus="all"]`);
        bogusTag && bogusTag.remove();
    }

    removeAttributionBr = () => {
        let attributionNodeBr = document.querySelector(`#cypress-${this.props.index} p.blockquoteTextCredit br`)
        attributionNodeBr && attributionNodeBr.remove();
    }

    /**
     * Set dynamic toolbar by element type
     */
    setToolbarByElementType = () => {
        let toolbar = this.setInstanceToolbar();
        let tinyMceToolbarNode = tinyMCE.$('#tinymceToolbar').find('.tox-toolbar__group>.tox-split-button,.tox-toolbar__group>.tox-tbtn')
        tinyMceToolbarNode.removeClass('toolbar-disabled')
        if (toolbar && toolbar.length) {
            tinyMceToolbarNode
                .each((index) => {
                    if (config.toolBarList[index] && toolbar.indexOf(config.toolBarList[index]) > -1) {
                        tinyMceToolbarNode.eq(index).addClass('toolbar-disabled')
                    }
                });
        }
    }

    /**
     * handleClick | gets triggered when any editor element is clicked
     * @param {*} e  event object
     */
    handleClick = (e) => {
        /*
        * In IS slate removing the toolbar disabled class which was applied in case of OE
        */
        let tinymceToolbar = document.getElementById('tinymceToolbar')
        if (config && config.slateType === "container-introduction" && tinymceToolbar && tinymceToolbar.classList) {
            tinymceToolbar.classList.remove('toolbar-disabled')
        }
        let showHideObj;
        if (this.props.showHideType) {
            showHideObj =
            {
                currentElement: this.props.currentElement,
                index: this.props.index,
                element: this.props.element,
                showHideType: this.props.showHideType
            }
        }
        clickedX = e.clientX;
        clickedY = e.clientY;
        setTimeout(this.removeMultiTinyInstance, 0)

        /*
            Adding br tag in lists because on first conversion from p tag to list, br tag gets removed
        */
        let tinymceActiveEditorNode = document.getElementById(tinymce.activeEditor && tinymce.activeEditor.id)
        if (this.props.permissions && !(this.props.permissions.includes('access_formatting_bar') || this.props.permissions.includes('elements_add_remove'))) {        // when user doesn't have edit permission
            if (tinymce.activeEditor && tinymce.activeEditor.id) {
                tinymceActiveEditorNode.setAttribute('contenteditable', false)
            }
        }
        this.props.handleEditorFocus("", showHideObj, e);
        let isSameTarget = false, isSameByElementId = false;
        let event = Object.assign({}, e);
        let currentTarget = event.currentTarget;
        let isSameTargetBasedOnDataId = true;

        /**
         * Remove extra Wiris overlay
         */
        let wirisNodes = document.getElementsByClassName('wrs_modal_dialogContainer');
        let wirisNodeLength = wirisNodes.length;
        if (wirisNodeLength > 1) {
            for (let i = 0; i < wirisNodeLength - 1; i++) {
                wirisNodes[i].remove();
                // document.getElementsByClassName('wrs_modal_overlay').remove();
                document.getElementById('wrs_modal_overlay[' + i + ']').remove();
            }
        }

        /*
            checking for same target based on data-id not id
        */
        if (tinymce.activeEditor && tinymce.activeEditor.targetElm.closest('.element-container') && tinymce.activeEditor.targetElm.closest('.element-container').getAttribute('data-id') != e.currentTarget.closest('.element-container').getAttribute('data-id')) {
            isSameTargetBasedOnDataId = false;
        }
        /**
         * case - if active editor and editor currently being focused is same
         */
        if (tinymce.activeEditor && tinymce.activeEditor.id === currentTarget.id) {
            this.setToolbarByElementType();
            isSameTarget = true;
        }
        let currentActiveNode = null
        let activeContainerNode = document.querySelector('div .active')
        const editableEditor =  document.querySelector('.cypress-editable.mce-content-body.mce-edit-focus')
        if (editableEditor && this.props.currentElement) {
            currentActiveNode = editableEditor
        } 
        else if (activeContainerNode) {
            currentActiveNode = activeContainerNode
        }
        
        let currentElementId = this.props.currentElement && currentTarget && currentTarget.getAttribute('data-id') ? this.props.currentElement.id : this.props.element.id
        if (currentActiveNode && currentActiveNode.getAttribute('data-id') === currentElementId) {
            isSameByElementId = true;
        }
        /**
         * case - if tinymce already has an active editor then...
         * first remove current tinymce instance then prepare element currently being focused to get tinymce intialized
         */
        let activeEditorId = '';
        let newCurrentTargetNode = tinyMCE.$("#" + currentTarget.id)
        if ((!isSameTargetBasedOnDataId || !isSameTarget || !isSameByElementId) && currentActiveNode && tinymce.activeEditor && tinymceActiveEditorNode && !(tinymce.activeEditor.id.includes('glossary') || tinymce.activeEditor.id.includes('footnote'))) {
            activeEditorId = tinymce.activeEditor.id;
            /**
             * Before removing the current tinymce instance, update wiris image attribute data-mathml to data-temp-mathml and class Wirisformula to temp_Wirisformula
             * As removing tinymce instance, also updates the images made by the wiris plugin to mathml
             */
            let tempContainerHtml = tinyMCE.$("#" + activeEditorId).html()
            let tempNewContainerHtml = newCurrentTargetNode.html()
            let previousTargetId = '';
            let currentTargetId = '';
            if (!isSameTargetBasedOnDataId || !isSameByElementId) {
                if (!isSameTargetBasedOnDataId) {
                    previousTargetId = tinymce.activeEditor.targetElm.closest('.element-container').getAttribute('data-id');
                } else {
                    previousTargetId = currentActiveNode.getAttribute('data-id');
                }
                currentTargetId = e.currentTarget.closest('.element-container').getAttribute('data-id');
                tempContainerHtml = tinyMCE.$("[data-id='" + previousTargetId + "'] .cypress-editable").html()
                tempNewContainerHtml = tinyMCE.$("[data-id='" + currentTargetId + "'] .cypress-editable").html()
            }
            tempContainerHtml = tempContainerHtml.replace(/\sdata-mathml/g, ' data-temp-mathml').replace(/\"Wirisformula/g, '"temp_Wirisformula').replace(/\sWirisformula/g, ' temp_Wirisformula');
            tempNewContainerHtml = tempNewContainerHtml.replace(/\sdata-mathml/g, ' data-temp-mathml').replace(/\"Wirisformula/g, '"temp_Wirisformula').replace(/\sWirisformula/g, ' temp_Wirisformula');

            /*
                Before entering to new element follow same  procedure
            */
            let isBlockQuote = this.props.element && this.props.element.elementdata && (this.props.element.elementdata.type === "marginalia" || this.props.element.elementdata.type === "blockquote");
            if (!isBlockQuote) {
                if (!isSameTargetBasedOnDataId || !isSameByElementId) {
                    let elementContainerNodes = document.querySelectorAll('.element-container[data-id="' + previousTargetId + '"] .cypress-editable')
                    if (elementContainerNodes.length)
                        elementContainerNodes[0].innerHTML = tempContainerHtml;
                    document.querySelectorAll('.element-container[data-id="' + currentTargetId + '"] .cypress-editable')[0].innerHTML = tempNewContainerHtml;
                }
                else {
                    document.getElementById(activeEditorId).innerHTML = tempContainerHtml;
                    document.getElementById(currentTarget.id).innerHTML = tempNewContainerHtml;
                }
            }
        }

        /**
         * case - is this is not the same target then
         * first remove all existing non-glossary&footnote tinymce instances keeping contentEditable to true
         * then mark current target id as tinymce selector and instantiate tinymce on this target again
         */
        if (!isSameTarget || !isSameTargetBasedOnDataId || !isSameByElementId) {
            /*
                Remove all instaces of wiris on changing element on basis of there data-ids not on id 
                because on inserting new element id changes
            */
           if (e && e.target && (e.target.classList.contains('Wirisformula') || e.target.classList.contains('temp_Wirisformula'))) {
               this.wirisClick++;
               setTimeout(() => {
                   this.wirisClick = 0;
               }, 500)
           }
            let wirisModalDesktopNode = tinymce.$('.wrs_modal_desktop')
            wirisModalDesktopNode && wirisModalDesktopNode.remove();

            for (let i = tinymce.editors.length - 1; i > -1; i--) {
                let ed_id = tinymce.editors[i].id;
                if (!(ed_id.includes('glossary') || ed_id.includes('footnote'))) {
                    let tempFirstContainerHtml = tinyMCE.$("#" + tinymce.editors[i].id).html()
                    tempFirstContainerHtml = tempFirstContainerHtml.replace(/\sdata-mathml/g, ' data-temp-mathml').replace(/\"Wirisformula/g, '"temp_Wirisformula').replace(/\sWirisformula/g, ' temp_Wirisformula');
                    let tinymceEditorNode = document.getElementById(tinymce.editors[i].id)
                    if (tinymceEditorNode) {
                        tinymceEditorNode.innerHTML = tempFirstContainerHtml;
                    }
                    removeTinyDefaultAttribute(tinymce.activeEditor.targetElm)
                    tinymce.remove(`#${ed_id}`)
                    wirisModalDesktopNode.remove();
                    let edNode = document.getElementById(`${ed_id}`)
                    if (edNode) {
                        edNode.contentEditable = true;
                    }
                }
            }
            let activeEditorNode = document.getElementById(activeEditorId)
            if (activeEditorNode) {
                activeEditorNode.contentEditable = true;
            }
            this.editorConfig.selector = '#' + currentTarget.id;

            /**
             * Using timeout - init tinymce instance only when default events stack becomes empty
             */
            currentTarget.focus();
            let termText = newCurrentTargetNode && newCurrentTargetNode.html();
            tinymce.init(this.editorConfig).then(() => {
                if (termText && termText.length && 'type' in this.props.element && this.props.element.type !== 'poetry' && this.props.element.type !== 'element-list' &&
                    !(this.props.element.type === "showhide" && this.props.currentElement.type === 'element-list')) {
                    if (termText.search(/^(<.*>(<br.*>)<\/.*>)+$/g) < 0 &&
                        (newCurrentTargetNode.html()).search(/^(<.*>(<br.*>)<\/.*>)+$/g) >= 0) {
                        termText = newCurrentTargetNode.html();
                    }
                    /***
                     * [BG-2225] | Unwanted saving calls in video element
                     */
                    if ('type' in this.props.element && this.props.element.type === "figure" && termText.search(/^(<.*>(<br.*>)<\/.*>)+$/g) < 0 &&
                        (newCurrentTargetNode.html()).search(/^(<br.*>)+$/g) >= 0) {
                        termText = newCurrentTargetNode.html();
                    }

                    /* Reverting data-temp-mathml to data-mathml and class Wirisformula to temp_WirisFormula */
                    termText = termText.replace(/data-temp-mathml/g, 'data-mathml').replace(/temp_Wirisformula/g, 'Wirisformula');
                    document.getElementById(currentTarget.id).innerHTML = termText
                }
                if (clickedX !== 0 && clickedY !== 0) {     //User generated click event
                    tinymce.activeEditor.selection.placeCaretAt(clickedX, clickedY) //Placing exact cursor position on clicking.
                }
                else {                                      //Programmatic click event. Placing cursor at the end
                    tinymce.activeEditor.selection.select(tinymce.activeEditor.getBody(), true);
                    tinymce.activeEditor.selection.collapse(false);
                    this.handleCodeClick(tinymce.activeEditor, true);
                }
                tinymce.$('.blockquote-editor').attr('contenteditable', false)
                this.editorOnClick(event);
                let listLiNodes = currentTarget.querySelectorAll('li')
                if (currentTarget && listLiNodes && listLiNodes.length) {
                    listLiNodes.forEach((li) => {
                        if (li.innerHTML.trim() == '') {
                            li.append(document.createElement('br'))
                        }
                    })
                }
                if (this.props.element && this.props.element.type === "element-blockfeature") {
                    this.removeBogusTagsFromDom();
                    this.removeAttributionBr();
                }
            });
            this.setToolbarByElementType();
        }
        /**
         * case - continuing with toggling glossary & footnote popup
         */
        let timeoutInstance = setTimeout(() => {
            clearTimeout(timeoutInstance);
            /**
             * Remove extra Wiris overlay
             */
            let wirisObj = document.getElementsByClassName('wrs_modal_dialogContainer');
            let wirisObjLength = wirisObj.length;
            if (wirisObjLength > 1) {
                for (let i = 0; i < wirisObjLength - 1; i++) {
                    wirisObj[i].remove();
                    // document.getElementsByClassName('wrs_modal_overlay').remove();
                    document.getElementById('wrs_modal_overlay[' + i + ']').remove();
                }
            }
            tinymce.init(this.editorConfig).then((d) => {
                this.setToolbarByElementType();
                let listLiNodes1 = currentTarget.querySelectorAll('li')
                if (currentTarget && listLiNodes1 && listLiNodes1.length) {
                    listLiNodes1.forEach((li) => {
                        if (li.innerHTML.trim() == '') {
                            li.append(document.createElement('br'))
                        }
                    })
                }
                let assetPopoverButtonNode = document.querySelector('button[title="Asset Popover"]')
                if (assetPopoverButtonNode) {
                    assetPopoverButtonNode.setAttribute("aria-disabled", false)
                    assetPopoverButtonNode.removeAttribute('aria-pressed')
                    assetPopoverButtonNode.classList.remove('tox-tbtn--disabled')
                }
                if ((this.props.element && this.props.element.type === "element-list") || (this.props.currentElement && this.props.currentElement.type === "element-list")) {
                    highlightListIcon(this.props);
                }
                else {
                    removeListHighliting();
                }
                if (this.props.element && this.props.element.type === "element-blockfeature") {
                    this.removeBogusTagsFromDom();
                    this.removeAttributionBr();
                }
                if (this.footnoteGlossaryProgress && clickedX !== 0 && clickedY !== 0) {
                    this.footnoteGlossaryProgress = false;
                    const timer = setInterval(()=>{
                        if(!config.isGlossarySaving){
                            if(!document.getElementsByClassName('glossary-toolbar-wrapper').length){
                                clearInterval(timer)
                                tinymce.activeEditor.selection.placeCaretAt(clickedX, clickedY) //Placing exact cursor position on clicking.
                            }
                        }
                    }, 10)
                }
            })
        });
        if (isSameTarget) {
            this.editorOnClick(event);
        }
        tinyMCE.$('.cypress-editable').css('caret-color', 'black')
    }
    
    /**
     * handleBlur | gets triggered when any editor element is blurred
     * @param {*} e  event object
     */
    handleBlur = (e, forceupdate) => {
        let checkCanvasBlocker = document.querySelector("div.canvas-blocker");
        let isBlockQuote = this.props.element && this.props.element.elementdata && (this.props.element.elementdata.type === "marginalia" || this.props.element.elementdata.type === "blockquote");
        if (isBlockQuote && this.isctrlPlusV) {
            e.preventDefault();
            return false;
        }
        if (this.props.element && this.props.element.type && this.props.element.type === "showhide") {
            let currentId = this.props.index;
            let node = document.getElementById('cypress-' + currentId);
            setTimeout(() => {
                if (node && node.innerText && node.innerText.trim() !== "" && this.props.showHideType) {
                    node.classList.remove('place-holder')
                }
            }, 0)
        }
        if (isBlockQuote && this.lastContent) {
            let tempdiv = document.createElement('div');
            let currentId = this.props.index;
            let node = document.getElementById('cypress-' + currentId);
            tempdiv.innerHTML = node ? node.innerHTML : '';
            if (!tinymce.$(tempdiv).find('.paragraphNummerEins').length || !tinymce.$(tempdiv).find('.paragraphNummerEins').text().length) {
                if (!tinymce.$(tempdiv).find('.blockquoteTextCredit') || !tinymce.$(tempdiv).find('.blockquoteTextCredit').text().length) {
                    node.innerHTML = this.lastContent;
                }
                let removeBogusBr = document.querySelector(`#cypress-${currentId} br[data-mce-bogus]`)
                removeBogusBr && removeBogusBr.remove()
                if (node && node.childNodes[0] && node.childNodes[0].childNodes[0] && !node.childNodes[0].childNodes[0].innerHTML) {
                    node.childNodes[0].childNodes[0].innerHTML = '<br>';
                }
            }
        }
        let relatedTargets = (e && e.relatedTarget && e.relatedTarget.classList) ? e.relatedTarget.classList : [];
        if (checkforToolbarClick(relatedTargets)) {
            e.stopPropagation();
            return;
        }
        tinymce.$('span[data-mce-type="bookmark"]').each(function () {
            let innerHtml = this.innerHTML;
            this.outerHTML = innerHtml;
        })
        tinymce.$('span.answerLineContent').each(function (){
            this.removeAttribute('data-mce-selected');
        })
        if (!checkCanvasBlocker) {
            tinymce.$('span[class="page-link-attacher"]').each(function () {
                let innerHtml = this.innerHTML;
                this.outerHTML = innerHtml;
            })
        }
        while (tinymce.$('[data-mce-bogus]:not(#sel-mce_0)').length) {
            tinymce.$('[data-mce-bogus]:not(#sel-mce_0)').each(function () {
                let innerHtml = this.innerHTML;
                this.outerHTML = innerHtml;
            })
        }
        tinymce.$('div[data-mce-bogus="all"]').each(function () {
            this.outerHTML = '';
        })
        let assetPopoverPopupIsVisible = document.querySelector("div.blockerBgDiv");
        if (!assetPopoverPopupIsVisible) {
            tinymce.$('#asset-popover-attacher').each(function () {
                let innerHtml = this.innerHTML;
                this.outerHTML = innerHtml;
            })
        }
        if (this.props.elementId && !this.props.elementId.includes("manifest")) {
            let poetryStanza = tinymce.$(`div[data-id="${this.props.elementId}"] .poetryLine`);
            if (poetryStanza.length > 1) {
                poetryStanza.each(function () {
                    let imgTag = this && this.getElementsByTagName("img")
                    const blankLines = this && this.getElementsByClassName("answerLineContent")
                    if ((this.innerHTML === '' || this.innerHTML === "<br>" || this.textContent.trim() == '') && !(imgTag && imgTag.length) && !(blankLines && blankLines.length)) {
                        this.remove();
                    }
                })
            }
            else if (poetryStanza.length === 1 && poetryStanza[0].innerHTML === "&nbsp;") {
                poetryStanza[0].innerHTML = "<br>"
                e.stopPropagation();
                return;
            }
            spanHandlers.handleExtraTags(this.props.elementId, 'div', 'poetryLine');
            let codeLine = tinymce.$(`div[data-id="${this.props.elementId}"] .codeNoHighlightLine`);
            if (codeLine.length) {
                for (let index = 0; index < codeLine.length; index++) {
                    if (codeLine[index] && codeLine[index].innerHTML) {
                        codeLine[index].innerHTML = String(codeLine[index].innerHTML).replace(/ /g, '&nbsp;');
                    }
                }

            }
            //spanHandlers.handleExtraTags(this.props.elementId, 'code', 'codeNoHighlightLine')
        }

        tinyMCE.$('.Wirisformula').each(function () {
            this.naturalHeight && this.setAttribute('height', this.naturalHeight)
            this.naturalWidth && this.setAttribute('width', this.naturalWidth)
        })
        let showHideType = this.props.showHideType || null
        showHideType = showHideType === "revel" ? "postertextobject" : showHideType

        if (!this.fromtinyInitBlur && !config.savingInProgress) {
            let elemNode = document.getElementById(`cypress-${this.props.index}`)
            elemNode.innerHTML = elemNode.innerHTML.replace(/<br data-mce-bogus="1">/g, "");
            elemNode.innerHTML = elemNode.innerHTML.replace(/disc square/g, "disc").replace(/disc circle/g, "disc");
            elemNode.innerHTML = elemNode.innerHTML.replace(/[\u200B-\u200D\uFEFF]/g, '');
            if (this.props.element && this.props.element.type === "citations") {
                elemNode.innerHTML = elemNode.innerHTML.replace(/<\s*\/?br\s*[\/]?>/g, "");  /**[BG-2578] */
            }
            const allowedSubElements = ["poetry", "popup", "citations"]
            elemNode.innerHTML = removeBOM(elemNode.innerHTML) // TK-5425 : removing "&#65279" from model
            if (this.props.element && allowedSubElements.includes(this.props.element.type)) {
                //Removing blank/unused tags for "poetry", "popup", "citations"
                elemNode.innerHTML = removeBlankTags(elemNode.innerHTML)
            }
            if (
                this.props.element &&
                (this.props.element.type === "popup" || this.props.element.type === "citations") &&
                !this.props.currentElement &&
                elemNode &&
                elemNode.innerHTML.replace(/<br>/g, "") !== ""
            ) {
                this.props.createPopupUnit(this.props.popupField, true, this.props.index, this.props.element)
            } else if (this.props.element && this.props.element.type === "poetry" && !this.props.currentElement && elemNode && elemNode.innerHTML.replace(/<br>/g, "").replace(/<p><\/p>/g, "") !== "") {
                this.props.createPoetryElements(this.props.poetryField, true, this.props.index, this.props.element)
            } else {
                setTimeout(() => {
                    this.props.handleBlur(forceupdate, this.props.currentElement, this.props.index, showHideType)
                }, 0)
            }
        }
        else {
            this.fromtinyInitBlur = false;
        }
    }

    toggleGlossaryandFootnotePopup = (status, popupType, glossaryfootnoteid, callback) => {
        if (config.savingInProgress) return false

        let typeWithPopup = this.props.element ? this.props.element.type : "";
        let elementId = this.props.currentElement ? this.props.currentElement.id : this.props.element ? this.props.element.id : "";
        let elementType = this.props.currentElement ? this.props.currentElement.type : this.props.element ? this.props.element.type : "";
        let index = this.props.index;
        let elementSubType = this.props.element ? this.props.element.figuretype : '';
        let glossaryTermText = this.glossaryTermText;
        this.props.openGlossaryFootnotePopUp && this.props.openGlossaryFootnotePopUp(status, popupType, glossaryfootnoteid, elementId, elementType, index, elementSubType, glossaryTermText, callback, typeWithPopup, this.props.poetryField);
    }

    generateHiddenElement = () => {

        const hiddenBlock = document.createElement('p');
        hiddenBlock.innerHTML = "hidden";
        hiddenBlock.classList.add("blockquote-hidden");
        hiddenBlock.setAttribute("contenteditable", "false");
        hiddenBlock.style.visibility = "hidden"
        hiddenBlock.style.height = "20px";

        return hiddenBlock;
    }


    processBlockquoteHtml = (model, element, lockCondition) => {

        const temDiv = document.createElement('div');
        let hiddenBlock = this.generateHiddenElement();
        temDiv.innerHTML = model && model.text ? model.text : '<blockquote class="blockquoteMarginaliaAttr" contenteditable="false"><p class="paragraphNummerEins" contenteditable="true"></p><p class="blockquoteTextCredit" contenteditable="true" data-placeholder="Attribution Text"></p></blockquote>';
        if (element && element.elementdata && element.elementdata.type === "blockquote" && !tinymce.$(temDiv).find('blockquote p.blockquoteTextCredit').length) {
            tinymce.$(temDiv).find('blockquote').append('<p class="blockquoteTextCredit" contenteditable="true" data-placeholder="Attribution Text"></p>');
        }
        tinyMCE.$(temDiv).find('[data-mce-bogus]') && tinyMCE.$(temDiv).find('[data-mce-bogus]').remove();
        tinymce.$(temDiv).find('.blockquoteTextCredit').attr('contenteditable', 'true').attr('data-placeholder', 'Attribution Text');
        if (tinymce.$(temDiv).find('.blockquoteTextCredit') && !tinymce.$(temDiv).find('blockquote p.blockquote-hidden').length) {
            temDiv.childNodes[0].insertBefore(hiddenBlock, tinymce.$(temDiv).find('.blockquoteTextCredit')[0]);
        }
        tinymce.$(temDiv).find('blockquote').attr('contenteditable', 'false');
        tinymce.$(temDiv).find('.paragraphNummerEins').attr('contenteditable', !lockCondition);
        if (tinymce.$(temDiv).find('.paragraphNummerEins') && tinymce.$(temDiv).find('.paragraphNummerEins')[0]) {
            tinymce.$(temDiv).find('.paragraphNummerEins')[0].addEventListener('blur', this.handleBlur);
        }
        temDiv.innerHTML = removeBOM(temDiv.innerHTML)

        return temDiv;

    }

    render() {
        const { slateLockInfo: { isLocked, userId } } = this.props;
        let lockCondition = isLocked && config.userId !== userId.replace(/.*\(|\)/gi, '');
        this.handlePlaceholder();

        let classes = this.props.className ? this.props.className + " cypress-editable" : '' + "cypress-editable";
        let id = 'cypress-' + this.props.index;
        classes += ' ' + this.placeHolderClass;
        /**Render editable tag based on tagName*/
        switch (this.props.tagName) {
            case 'p':
                let paraModel = this.props.model
                paraModel = removeBOM(paraModel)
                return (
                    <p ref={this.editorRef} id={id} onKeyDown={this.normalKeyDownHandler} onBlur={this.handleBlur} onClick={this.handleClick} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={!lockCondition} dangerouslySetInnerHTML={{ __html: paraModel }}></p>
                );
            case 'h4':
                let model = ""
                if (this.props.element && this.props.element.type === "popup") {
                    model = this.props.model && this.props.model.replace(/class="paragraphNumeroUno"/g, "")
                }
                else {
                    model = this.props.model;
                }
                let tempDiv = document.createElement('div');
                tempDiv.innerHTML = model;
                if (tempDiv && tempDiv.children && tempDiv.children.length && tempDiv.children[0].tagName === 'P') {
                    model = tempDiv.children[0].innerHTML;
                }
                model = removeBOM(model)
                if (this.props.poetryField && this.props.poetryField === 'formatted-title') {
                    if (!classes.includes('poetryHideLabel')) {
                        classes = classes + ' poetryHideLabel';
                    }
                }
                return (
                    <h4 ref={this.editorRef} 
                        id={id}
                        data-id={this.props.currentElement ? this.props.currentElement.id : undefined}
                        onKeyDown={this.normalKeyDownHandler} 
                        onBlur={this.handleBlur} 
                        onClick={this.handleClick} 
                        className={classes} 
                        placeholder={this.props.placeholder} 
                        suppressContentEditableWarning={true} 
                        contentEditable={!lockCondition} 
                        dangerouslySetInnerHTML={{ __html: model }} 
                    ></h4>
                )
            case 'code':
                let codeModel = this.props.model
                codeModel = removeBOM(codeModel)
                return (
                    <code ref={this.editorRef} id={id} onBlur={this.handleBlur} onClick={this.handleClick} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={!lockCondition} dangerouslySetInnerHTML={{ __html: codeModel }}></code>
                )
            case 'blockquote':
                if (this.props.element && this.props.element.elementdata && (this.props.element.elementdata.type === "marginalia" || this.props.element.elementdata.type === "blockquote")) {
                    let temDiv = this.processBlockquoteHtml(this.props.model, this.props.element, lockCondition);
                    classes = classes + ' blockquote-editor with-attr';
                    return (
                        <div ref={this.editorRef} id={id} onBlur={this.handleBlur} onClick={this.handleClick} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={false} dangerouslySetInnerHTML={{ __html: temDiv.innerHTML }} onChange={this.handlePlaceholder}>{/* htmlToReactParser.parse(this.props.model.text) */}</div>
                    )
                } else {
                    classes = classes + ' pullquote-editor';
                    let pqModel = this.props.model && this.props.model.text || '<p class="paragraphNumeroUno"><br/></p>'
                    pqModel = removeBOM(pqModel)

                    return (
                        <div ref={this.editorRef} id={id} onBlur={this.handleBlur} onClick={this.handleClick} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={!lockCondition} dangerouslySetInnerHTML={{ __html: pqModel }} onChange={this.handlePlaceholder}></div>
                    )
                }
            case 'figureCredit':
                let figCreditModel = this.props.model
                figCreditModel = removeBOM(figCreditModel)

                return (
                    <div ref={this.editorRef} data-id={this.props.currentElement ? this.props.currentElement.id : undefined} id={id} onBlur={this.handleBlur} onKeyDown={this.normalKeyDownHandler} onClick={this.handleClick} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={!lockCondition} dangerouslySetInnerHTML={{ __html: figCreditModel }} onChange={this.handlePlaceholder}></div>
                )
            case 'element-citation':
                let ctModel = this.props.model && this.props.model.text || '<p class="paragraphNumeroUnoCitation"><br/></p>'
                ctModel = removeBOM(ctModel)

                return (
                    <div ref={this.editorRef} 
                        id={id}
                        data-id={this.props.currentElement ? this.props.currentElement.id : undefined}
                        onBlur={this.handleBlur} 
                        onKeyDown={this.normalKeyDownHandler} 
                        onClick={this.handleClick} 
                        className={classes} 
                        placeholder={this.props.placeholder} 
                        suppressContentEditableWarning={true} 
                        contentEditable={!lockCondition} 
                        dangerouslySetInnerHTML={{ __html: ctModel }}
                        onChange={this.handlePlaceholder}
                    ></div>
                )
            default:
                let defModel = this.props.model && this.props.model.text ? this.props.model.text : (typeof (this.props.model) === 'string' ? this.props.model : '<p class="paragraphNumeroUno"><br/></p>')
                defModel = removeBOM(defModel)
                return (
                    <div ref={this.editorRef} data-id={this.props.currentElement ? this.props.currentElement.id : undefined} onKeyDown={this.normalKeyDownHandler} id={id} onBlur={this.handleBlur} onClick={this.handleClick} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={!lockCondition} dangerouslySetInnerHTML={{ __html: defModel }} onChange={this.handlePlaceholder}></div>
                )
        }
        
    }
    normalKeyDownHandler = (e) => {
        if (this.props.permissions && !(this.props.permissions.includes('access_formatting_bar') || this.props.permissions.includes('elements_add_remove'))) {        // when user doesn't have edit permission
            if (tinymce.activeEditor && tinymce.activeEditor.id) {
                document.getElementById(tinymce.activeEditor.id).setAttribute('contenteditable', false)
            }
        }
        if (tinymce.activeEditor && tinymce.activeEditor.id !== e.target.id && (this.props.element.subtype && this.props.element.subtype !== "mathml")) {
            e.preventDefault();
            e.stopPropagation();
            return false;
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

export default connect(
    null,
    { conversionElement, wirisAltTextPopup, audioGlossaryPopup }
)(TinyMceEditor);
