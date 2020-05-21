import React, { Component } from 'react';
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
// IMPORT - Components & Dependencies //
import { EditorConfig } from '../config/EditorConfig';
import config from '../config/config';
import { insertListButton, bindKeyDownEvent, insertUoListButton, preventRemoveAllFormatting, removeTinyDefaultAttribute } from './ListElement/eventBinding.js';
import { authorAssetPopOver } from './AssetPopover/openApoFunction.js';
import {
    tinymceFormulaIcon,
    tinymceFormulaChemistryIcon,
    assetPopoverIcon
} from '../images/TinyMce/TinyMce.jsx';
import { getGlossaryFootnoteId } from "../js/glossaryFootnote";
import { checkforToolbarClick, customEvent } from '../js/utils';
import { saveGlossaryAndFootnote, setFormattingToolbar } from "./GlossaryFootnotePopup/GlossaryFootnote_Actions"
import { ShowLoader, HideLoader } from '../constants/IFrameMessageTypes';
import { sendDataToIframe, hasReviewerRole } from '../constants/utility.js';
import store from '../appstore/store';
import { MULTIPLE_LINE_POETRY_ERROR_POPUP } from '../constants/Action_Constants';
import { ERROR_CREATING_GLOSSARY, ERROR_CREATING_ASSETPOPOVER } from '../component/SlateWrapper/SlateWrapperConstants.js';
let context = {};
let clickedX = 0;
let clickedY = 0;
export class TinyMceEditor extends Component {
    constructor(props) {
        super(props);
        context = this;
        this.placeHolderClass = ''
        this.indentRun = false;
        this.outdentRun = false;
        this.chemistryMlMenuButton = null;
        this.mathMlMenuButton = null;
        this.assetPopoverButtonState = null;
        this.glossaryTermText = '';
        this.lastContent = '';
        this.clearFormateText = '';
        this.isctrlPlusV = false;
        this.fromtinyInitBlur = false;
        this.editorConfig = {
            plugins: EditorConfig.plugins,
            selector: '#cypress-0',
            inline: true,
            formats: EditorConfig.formats,
            menubar: false,
            statusbar: false,
            valid_elements: '*[*]',
            extended_valid_elements: '*[*]',
            object_resizing: false,
            fixed_toolbar_container: '#tinymceToolbar',
            content_style: EditorConfig.contentStyle,
            toolbar: EditorConfig.toolbar,
            image_advtab: false,
            force_br_newlines: true,
            forced_root_block: '',
            remove_linebreaks: false,
            paste_preprocess: this.pastePreProcess,
            force_p_newlines: false,
            setup: (editor) => {
                if (this.props.permissions && this.props.permissions.includes('authoring_mathml')) {
                    this.setChemistryFormulaIcon(editor);
                    this.setMathmlFormulaIcon(editor);
                    this.addChemistryFormulaButton(editor);
                    this.addMathmlFormulaButton(editor);
                }
                this.setAssetPopoverIcon(editor);
                this.addAssetPopoverIcon(editor);
                this.addFootnoteIcon(editor);
                this.addGlossaryIcon(editor);
                this.addInlineCodeIcon(editor);
                this.editorClick(editor);
                this.editorKeydown(editor);
                this.editorKeyup(editor);
                this.editorBeforeExecCommand(editor);
                this.editorExecCommand(editor);
                this.insertListButtonIcon(editor);
                editor.on('init', function (e) {
                    if (config.parentEntityUrn !== "Front Matter" && config.parentEntityUrn !== "Back Matter" && config.slateType !== "container-introduction") {
                        if (document.getElementsByClassName("slate-tag-icon").length) {
                            document.getElementsByClassName("slate-tag-icon")[0].style.display = "block";
                            if (config.slateType == "section") {
                                document.getElementsByClassName("slate-tag-icon")[0].classList.remove("disable");
                            }
                        }
                    }
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

                editor.on('Change', (e) => {
                    /*
                        if content is caused by wiris then call blur
                    */
                    if (!e.level && editor.selection.getBoundingClientRect()) {
                        clickedX = editor.selection.getBoundingClientRect().left;
                        clickedY = editor.selection.getBoundingClientRect().top;
                        // tinyMCE.$('.Wirisformula').each(function () {
                        //     this.naturalHeight && this.setAttribute('height', this.naturalHeight + 4)
                        //     this.naturalWidth && this.setAttribute('width', this.naturalWidth)
                        // }) 
                        if (!config.savingInProgress) {
                            if ((this.props.element.type === "popup" || this.props.element.type === "citations") && !this.props.currentElement) {
                                this.props.createPopupUnit(this.props.popupField, null, this.props.index, this.props.element)
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
                        if (content.trim().length || activeElement.querySelectorAll('ol').length || activeElement.querySelectorAll('ul').length || contentHTML.match(/<math/g) || isContainsMath) {
                            if (nodeContent) {
                                activeElement.classList.remove('place-holder')
                            }
                        }
                        else {
                            activeElement.classList.add('place-holder')
                        }
                    }

                    if (this.props.element && this.props.element.type === "element-blockfeature" && this.props.element.subtype === "quote" && tinymce.activeEditor && tinymce.activeEditor.id && !tinyMCE.activeEditor.id.includes("footnote")) {
                        let blockqtText = document.querySelector('#' + tinymce.activeEditor.id + ' blockquote p.paragraphNummerEins') ? document.querySelector('#' + tinymce.activeEditor.id + ' blockquote p.paragraphNummerEins').innerText : "";
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
                        }
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
            this.naturalHeight && this.setAttribute('height', this.naturalHeight + 4)
            this.naturalWidth && this.setAttribute('width', this.naturalWidth)
        });

        this.editorRef = React.createRef();
        this.currentCursorBookmark = {};
    };

    /**
     * Adds custon list button to the editor toolbar
     * @param {*} editor  editor instance
     */
    insertListButtonIcon = (editor) => {
        insertListButton(editor);
        insertUoListButton(editor, this.onUnorderedListButtonClick);
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

    onUnorderedListButtonClick = (type) => {
        this.props.onListSelect(type, "");
    }

    /**
     * This method is called when user clicks any button/executes command in the toolbar
     * @param {*} editor  editor instance
     */
    editorExecCommand = (editor) => {
        editor.on('ExecCommand', (e) => {
            let range = editor.selection.getRng();
            let content = e.target.getContent()
            let node = editor.selection.getNode();
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
            }
            if (this.props && this.props.element && this.props.element.type && this.props.element.type === 'stanza' && e.command === 'mceToggleFormat') {
                let divParent = tinymce.$(`div[id="cypress-${this.props.index}"]`).children();
                let havingExtraChild = false;
                for (let index = 0; index < divParent.length; index++) {
                    if (divParent[index].tagName && divParent[index].tagName.toLowerCase() !== 'span') {
                        havingExtraChild = true;
                        break;
                    }
                }
                if (havingExtraChild) {
                    let sText = editor.selection.getContent();
                    let parser = new DOMParser();
                    let htmlDoc = parser.parseFromString(sText, 'text/html');
                    let spans = htmlDoc.getElementsByClassName("poetryLine");
                    let startNode = null;
                    let endNode = null;
                    let startOffSet = 0;
                    let endOffSet = -1;
                    if (!spans.length) {
                        if (editor.selection.getNode().tagName && editor.selection.getNode().tagName.toLowerCase() === 'stanza') {
                            spans = [editor.selection.getNode()];
                        } else {
                            spans = [editor.selection.getNode().closest('.poetryLine')];
                        }
                    }
                    if (spans.length) {
                        startNode = spans[0];
                        endNode = spans[spans.length - 1];
                    }
                    let mainParent = null;
                    let allLines = tinymce.$(`div[data-id="${this.props.elementId}"] .poetryLine`);
                    let nodesFragment = document.createDocumentFragment();
                    for (let index = 0; index < allLines.length; index++) {
                        if (startNode && startNode.isEqualNode(allLines[index])) {
                            startOffSet = index;
                        }
                        if (endNode && endNode.isEqualNode(allLines[index])) {
                            endOffSet = index;
                        }
                        let parents = [];
                        let elem = allLines[index];
                        while (elem.parentNode && elem.parentNode.nodeName.toLowerCase() != 'div') {
                            elem = elem.parentNode;
                            parents.push(elem.nodeName.toLowerCase());
                        }
                        mainParent = elem.parentElement;
                        for (let innerIndex = 0; innerIndex < parents.length; innerIndex++) {
                            allLines[index].innerHTML = '<' + parents[innerIndex] + '>' + allLines[index].innerHTML + '</' + parents[innerIndex] + '>';
                        }
                        nodesFragment.appendChild(allLines[index]);
                    }
                    if (mainParent) {
                        mainParent.innerHTML = "";
                        mainParent.appendChild(nodesFragment);
                        range.setStart(mainParent, startOffSet);
                        range.setEnd(mainParent, endOffSet + 1);
                        editor.selection.setRng(range);
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
                            tinymce.$(`div[data-id="${this.props.elementId}"] .poetryLine`).each(function () {
                                this.innerHTML = this.innerText;
                            })
                        }
                        /*  For Figure type*/
                        else {
                            e.target.targetElm.innerHTML = textToReplace;
                        }
                    }
                    else if (this.props.element.type === 'stanza') {
                        let selection = window.getSelection();
                        if (selection.anchorNode.parentNode.nodeName === "SPAN" && selection.anchorNode.parentNode.classList.contains('poetryLine')) {
                            if (selectedText !== "") {
                                selection.anchorNode.parentNode.innerHTML = selection.anchorNode.parentNode.innerText;
                            }
                            let spanNode = selection.anchorNode;
                            let outerNode = selection.anchorNode;
                            if (spanNode.nodeName == "SPAN" || (spanNode.className && !spanNode.className.toLowerCase() == 'poetryLine')) {
                                //spanNode = selection.anchorNode.closest('.poetryLine');
                                while (outerNode.parentElement && outerNode.parentElement.tagName.toLowerCase() != 'div') {
                                    outerNode = outerNode.parentElement;
                                }
                                outerNode.parentNode.replaceChild(spanNode, outerNode);
                                e.preventDefault();
                                e.stopPropagation();
                                return false;
                            }
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
                    setTimeout(() => {
                        tinymce.activeEditor.selection.placeCaretAt(clickedX, clickedY)
                    }, 1000)
                    //this.currentCursorBookmark = editor.selection.bookmarkManager.getBookmark();                
                    break;
                case "mceInsertContent":
                    editor.selection.bookmarkManager.moveToBookmark(this.currentCursorBookmark);
                    setTimeout(() => {
                        let activeElement = editor.dom.getParent(editor.selection.getStart(), '.cypress-editable');
                        if (activeElement) {
                            if (activeElement.innerText === "") {
                                activeElement.classList.add('place-holder')
                            }
                            else {
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
            }
        })
    }

    /**
     * This method is called when user clicks on editor.
     * @param {*} editor  editor instance
     */
    editorClick = (editor) => {
        editor.on('click', (e) => {
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

        if (e.target.parentElement && e.target.parentElement.nodeName == "SUP" && e.target.dataset.uri) {
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
        }
        /**
         * Case - clicking over Asset text
         */
        else if (e.target.nodeName == 'ABBR' || e.target.parentNode && e.target.parentNode.tagName === 'ABBR') {
            let assetId = (e.target.attributes['asset-id'] && e.target.attributes['asset-id'].nodeValue) || e.target.parentNode.attributes['asset-id'].nodeValue;
            let dataUrn = (e.target.attributes['data-uri'] && e.target.attributes['data-uri'].nodeValue) || e.target.parentNode.attributes['data-uri'].nodeValue;
            let apoObject = {
                'assetId': assetId,
                'dataUrn': dataUrn
            }
            authorAssetPopOver(true, apoObject);
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
            let isContainsMath = false;

            if (activeElement) {
                isContainsMath = activeElement.innerHTML.match(/<img/) ? (activeElement.innerHTML.match(/<img/).input.includes('class="Wirisformula') || activeElement.innerHTML.match(/<img/).input.includes('class="temp_Wirisformula')) : false;
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
                        activeElement.innerHTML = div.children[0].outerHTML;
                    }
                }
                if (activeElement.innerText.trim().length || activeElement.querySelectorAll('ol').length || activeElement.querySelectorAll('ul').length || isContainsMath) {
                    activeElement.classList.remove('place-holder')
                }
                else {
                    activeElement.classList.add('place-holder')
                }
                this.lastContent = activeElement.innerHTML;

                if (activeElement.nodeName === "CODE") {
                    let key = e.keyCode || e.which;
                    if (!activeElement.innerText.trim()) {
                        activeElement.innerHTML = '<br/>';
                    } else if (key === 13) {
                        activeElement.append(' ')
                    }
                }
                if (activeElement.nodeName == "DIV" && this.props.element.type === 'stanza') {
                    let key = e.keyCode || e.which;
                    if (key != undefined && key === 13) {
                        //activeElement.innerHTML += '<span class="poetryLine"><br /></span>';
                        let position = 'next';
                        let elementSearch = editor.selection.getNode();
                        if (editor.selection.getNode().tagName.toLowerCase() !== 'span' || editor.selection.getNode().className.toLowerCase() !== 'poetryLine') {
                            elementSearch = editor.selection.getNode().closest('.poetryLine');
                        }
                        tinymce.$(`div[data-id="${this.props.elementId}"] .poetryLine`).each(function () {
                            let imgTag = this && this.getElementsByTagName("img")
                            if ((this.innerHTML === '' || this.innerHTML === "<br>" || this.textContent.trim() == '') && !(imgTag && imgTag.length)) {
                                this.remove();
                            }
                        })
                        if (elementSearch && elementSearch.tagName.toLowerCase() === 'span' && elementSearch.innerHTML != '<br>') {
                            editor.undoManager.transact(() => {
                                let elm = editor.dom.create('span', { 'class': 'poetryLine' }, '<br />');
                                if (editor.selection.getRng().startOffset === 0) {
                                    elementSearch.parentNode.insertBefore(elm, elementSearch);
                                    editor.selection.setCursorLocation(elementSearch.previousSibling, 0);
                                    position = 'previous';
                                } else {
                                    if (editor.selection.getContent() !== '' || editor.selection.getNode().tagName.toLowerCase() === 'img' || editor.selection.getNode().tagName.toLowerCase() === 'dfn' || editor.selection.getNode().tagName.toLowerCase() === 'abbr' || editor.selection.getNode().tagName.toLowerCase() === 'a') {
                                        if (elementSearch.nextSibling) {
                                            elementSearch.parentNode.insertBefore(elm, elementSearch.nextSibling)
                                            editor.selection.setCursorLocation(elementSearch.nextSibling, 0);
                                        } else {
                                            elementSearch.parentNode.appendChild(elm);
                                            editor.selection.setCursorLocation(elementSearch.nextSibling, 0);
                                        }
                                    } else {
                                        editor.selection.setContent('<!--break-->');
                                        let comment = document.createNodeIterator(elementSearch.parentNode, NodeFilter.SHOW_COMMENT, null, true).nextNode();
                                        this.splitOnTag(elementSearch.parentNode, comment);
                                        elementSearch.nextSibling.remove();
                                        let innerSpans = elementSearch.getElementsByTagName('span');
                                        for (let index = 0; index < innerSpans.length; index++) {
                                            let innerHtml = innerSpans[index].innerHTML;
                                            innerSpans[index].outerHTML = innerHtml;
                                        }
                                        if (elementSearch.textContent.trim() == '') {
                                            if (elementSearch.innerHTML == '') {
                                                position = 'current';
                                                elementSearch.innerHTML = '<br/>';
                                            } else {
                                                let childNodes = elementSearch.childNodes;
                                                if (childNodes.length) {
                                                    if (childNodes.length > 1) {
                                                        this.setContentOfSpan(childNodes);
                                                    } else {
                                                        if (childNodes[0].tagName) {
                                                            this.setContentOfSpan(childNodes);
                                                        } else {
                                                            elementSearch.innerHTML = '<br/>';
                                                        }
                                                    }
                                                }
                                            }
                                        } else {
                                            let childNodes = elementSearch.childNodes;
                                            this.setContentOfBlankChild(childNodes)
                                        }
                                        innerSpans = elementSearch.getElementsByTagName('span');
                                        for (let index = 0; index < innerSpans.length; index++) {
                                            let innerHtml = innerSpans[index].innerHTML;
                                            innerSpans[index].outerHTML = innerHtml;
                                        }
                                        let innerSpansSibling = elementSearch.nextSibling.getElementsByTagName('span');
                                        for (let index = 0; index < innerSpansSibling.length; index++) {
                                            let innerHtml = innerSpansSibling[index].innerHTML;
                                            innerSpansSibling[index].outerHTML = innerHtml;
                                        }
                                        if (elementSearch.nextSibling.textContent.trim() == '') {
                                            if (elementSearch.nextSibling.innerHTML == '') {
                                                elementSearch.nextSibling.innerHTML = '<br/>';
                                            } else {
                                                let childNodes = elementSearch.nextSibling.childNodes;
                                                if (childNodes.length) {
                                                    if (childNodes.length > 1) {
                                                        this.setContentOfSpan(childNodes);
                                                    } else {
                                                        if (childNodes[0].tagName) {
                                                            this.setContentOfSpan(childNodes);
                                                        } else {
                                                            elementSearch.nextSibling.innerHTML = '<br/>';
                                                        }
                                                    }
                                                }
                                            }
                                        } else {
                                            let childNodes = elementSearch.nextSibling.childNodes;
                                            this.setContentOfBlankChild(childNodes)
                                        }
                                        innerSpansSibling = elementSearch.nextSibling.getElementsByTagName('span');
                                        for (let index = 0; index < innerSpansSibling.length; index++) {
                                            let innerHtml = innerSpansSibling[index].innerHTML;
                                            innerSpansSibling[index].outerHTML = innerHtml;
                                        }
                                        elementSearch.nextSibling.removeAttribute("data-id");
                                        elementSearch.nextSibling.className = 'poetryLine';
                                        elementSearch.innerHTML = elementSearch.innerHTML.replace(/^\s+|\s+$/g, '&nbsp;');
                                        elementSearch.nextSibling.innerHTML = elementSearch.nextSibling.innerHTML.replace(/^\s+|\s+$/g, '&nbsp;');
                                        editor.selection.setCursorLocation(elementSearch.nextSibling, 0);
                                    }
                                }
                                let mainParent = null;
                                let allLines = tinymce.$(`div[data-id="${this.props.elementId}"] .poetryLine`);
                                let nodesFragment = document.createDocumentFragment();
                                for (let index = 0; index < allLines.length; index++) {
                                    let parents = [];
                                    let elem = allLines[index];
                                    while (elem.parentNode && elem.parentNode.nodeName.toLowerCase() != 'div') {
                                        elem = elem.parentNode;
                                        parents.push(elem.nodeName.toLowerCase());
                                    }
                                    mainParent = elem.parentElement;
                                    for (let innerIndex = 0; innerIndex < parents.length; innerIndex++) {
                                        allLines[index].innerHTML = '<' + parents[innerIndex] + '>' + allLines[index].innerHTML + '</' + parents[innerIndex] + '>';
                                    }
                                    nodesFragment.appendChild(allLines[index]);
                                }
                                if (mainParent) {
                                    mainParent.innerHTML = "";
                                    mainParent.appendChild(nodesFragment);
                                }
                                if (position === 'next') {
                                    editor.selection.setCursorLocation(elementSearch.nextSibling, 0);
                                } else if (position === 'previous') {
                                    editor.selection.setCursorLocation(elementSearch.previousSibling, 0);
                                } else if (position === 'current') {
                                    editor.selection.setCursorLocation(elementSearch, 0);
                                }
                            });
                        }
                    } else if (key != undefined && (key === 8 || key === 46)) {
                        let currentElement = editor.selection.getNode();
                        if (editor.selection.getNode().tagName.toLowerCase() !== 'span' || editor.selection.getNode().className.toLowerCase() !== 'poetryLine') {
                            currentElement = editor.selection.getNode().closest('.poetryLine');
                        }
                        if (currentElement) {
                            if (key === 46) {
                                let innerSpans = currentElement.getElementsByTagName('span');
                                for (let index = 0; index < innerSpans.length; index++) {
                                    let innerHtml = innerSpans[index].innerHTML;
                                    innerSpans[index].outerHTML = innerHtml;
                                }
                            }
                            let brs = currentElement.getElementsByTagName('br');
                            while (brs.length) {
                                brs[0].parentNode.removeChild(brs[0]);
                            }
                        } else {
                            currentElement = editor.selection.getNode();
                            let checkSpan = currentElement.getElementsByClassName("poetryLine");
                            if (!checkSpan.length) {
                                currentElement.innerHTML = '<span class="poetryLine"><br/></span>';
                                checkSpan = currentElement.getElementsByClassName("poetryLine");
                                editor.selection.setCursorLocation(checkSpan[0], 0);
                            } else if (checkSpan.length === 1) {
                                editor.selection.setCursorLocation(checkSpan[0], 0);
                            }
                        }
                    }
                }
            }
        });
    }

    splitOnTag = (bound, cutElement) => {
        // cutElement must be a descendant of bound
        for (let parent = cutElement.parentNode; bound != parent; parent = grandparent) {
            let right = parent.cloneNode(false);
            while (cutElement.nextSibling)
                right.appendChild(cutElement.nextSibling);
            var grandparent = parent.parentNode;
            grandparent.insertBefore(right, parent.nextSibling);
            grandparent.insertBefore(cutElement, right);
        }
    }

    setContentOfSpan = (childNodes) => {
        for (let index = 0; index < childNodes.length; index++) {
            let innerNodes = childNodes[index].childNodes;
            if (innerNodes) {
                if (innerNodes.length) {
                    if (innerNodes.length > 1) {
                        this.setContentOfSpan(innerNodes);
                    } else {
                        if (innerNodes[0].tagName && !(innerNodes[0].id && innerNodes[0].id === '_mce_caret' && innerNodes[0].innerHTML === '')) {
                            this.setContentOfSpan(innerNodes);
                        } else {
                            childNodes[index].innerHTML = '<br/>';
                        }
                    }
                } else {
                    if (childNodes[index] && childNodes[index].tagName && childNodes[index].tagName.toLowerCase() !== 'img') {
                        childNodes[index].innerHTML = '<br/>';
                    }
                }
            }
        }
    }

    setContentOfBlankChild = (childNodes) => {
        for (let index = 0; index < childNodes.length; index++) {
            let innerNodes = childNodes[index].childNodes;
            if (innerNodes) {
                if (innerNodes.length) {
                    if (innerNodes.length > 1) {
                        this.setContentOfBlankChild(innerNodes);
                    } else {
                        if (innerNodes[0].tagName) {
                            if (!(innerNodes[0].id && innerNodes[0].id === '_mce_caret' && innerNodes[0].innerHTML === '')) {
                                this.setContentOfBlankChild(innerNodes);
                            } else {
                                if (childNodes[index].textContent === '') {
                                    childNodes[index].innerHTML = '&#65279;';
                                }
                            }
                        }
                    }
                } else {
                    if (childNodes[index] && childNodes[index].tagName && childNodes[index].tagName.toLowerCase() !== 'img' && childNodes[index].textContent === '') {
                        childNodes[index].innerHTML = '&#65279;';
                    }
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
            let iFocusinBlockQuote = editor.dom.getParent(editor.selection.getStart(), '.paragraphNummerEins');
            let isBlockQuote = this.props.element && this.props.element.elementdata && (this.props.element.elementdata.type === "marginalia" || this.props.element.elementdata.type === "blockquote");
            let newElement = this.props.currentElement ? this.props.currentElement : this.props.element
            if (isBlockQuote && !iFocusinBlockQuote) {
                let evt = (e) ? e : window.event;
                evt.preventDefault();
                return false;
            }
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
            if (activeElement) {
                isContainsMath = activeElement.innerHTML.match(/<img/) ? (activeElement.innerHTML.match(/<img/).input.includes('class="Wirisformula') || activeElement.innerHTML.match(/<img/).input.includes('class="temp_Wirisformula')) : false;
            }
            if (key === 13 && this.props.element.type !== 'element-list' && activeElement.nodeName !== "CODE" && this.props.element.type !== 'showhide' && this.props.element.type !== "stanza") {
                let activeEditor = document.getElementById(tinymce.activeEditor.id);
                if('element' in this.props && 'status' in this.props.element && this.props.element.status == "wip") {
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
            else if ((this.props.element && this.props.element.type === 'showhide' && this.props.showHideType !== 'revel' && !editor.bodyElement.innerText.trim().length && e.keyCode === 8 && this.props.element.interactivedata) && ((this.props.showHideType === "show" && this.props.element.interactivedata.show.length > 1) || (this.props.showHideType === "hide" && this.props.element.interactivedata.hide.length > 1)) && !isContainsMath) {
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
                let imgTag = currentElement && currentElement.getElementsByTagName("img")
                if (currentElement && currentElement.tagName == 'SPAN' &&
                    (currentElement == '<br>' || currentElement.textContent.trim() == '') && !(imgTag && imgTag.length)) {
                    let poetryStanza = tinymce.$(`div[data-id="${this.props.elementId}"] .poetryLine`);
                    if (poetryStanza && poetryStanza.length > 1) {
                        currentElement.remove();
                    }
                    let activeEditor = document.getElementById(tinymce.activeEditor.id);
                    if('element' in this.props && 'status' in this.props.element && this.props.element.status == "wip") {
                        activeEditor.blur();
                    }
                    let nextSaparator = (activeEditor.closest('.editor')).nextSibling;
                    let textPicker = nextSaparator.querySelector('#myDropdown li > .stanza-elem');
                    textPicker.click();
                }
            }
            if (activeElement.nodeName == "DIV" && this.props.element.type === 'stanza') {
                // let key = e.keyCode || e.which;
                if (key != undefined && (key === 8 || key === 46)) {
                    let currentElement = editor.selection.getNode();
                    if (editor.selection.getNode().tagName.toLowerCase() !== 'span' || editor.selection.getNode().className.toLowerCase() !== 'poetryLine') {
                        currentElement = editor.selection.getNode().closest('.poetryLine');
                    }
                    if (key === 8 && editor.selection.getRng().startOffset === 0 && currentElement && currentElement.innerHTML !== '<br>' && editor.selection.getContent() === '' && currentElement.textContent.trim() != '') {
                        e.preventDefault();
                    } else if (currentElement && ((currentElement.innerHTML && (currentElement.innerHTML.length === 1 || currentElement.textContent.trim().length === 1)) || (key === 8 && currentElement.tagName == 'SPAN' && (currentElement.innerHTML == '<br>' || currentElement.textContent.trim() === '')))) {
                        if (currentElement.previousSibling) {
                            if (key === 46) {
                                e.preventDefault();
                            } else {
                                currentElement.previousSibling.innerHTML += '&nbsp;';
                            }
                            let temElm = editor.dom.create('br');
                            currentElement.previousSibling.appendChild(temElm);
                            let childNodes = currentElement.previousSibling.childNodes;
                            editor.selection.setCursorLocation(currentElement.previousSibling.childNodes[childNodes.length - 1], 0);
                            currentElement.remove();
                        } else {
                            let elm = editor.dom.create('span', { 'class': 'poetryLine' }, '<br />');
                            currentElement.parentNode.insertBefore(elm, currentElement);
                            editor.selection.setCursorLocation(currentElement.previousSibling, 0);
                            currentElement.remove();
                            if (key === 46) {
                                e.preventDefault();
                            }
                        }
                    }
                } else {
                    if (key != undefined && key === 9) {
                        e.preventDefault();

                        // Disable Indent and Outdent For Poetry-Stanza

                        /*let currentElement = editor.selection.getNode();
                        if (editor.selection.getNode().tagName.toLowerCase() !== 'span' || editor.selection.getNode().className.toLowerCase() !== 'poetryLine') {
                            currentElement = editor.selection.getNode().closest('.poetryLine');
                        }
                        if (currentElement) {
                            let className = null;
                            className = currentElement.className;
                            if (e.shiftKey) {
                                if (!this.outdentRun) {
                                    if (className && className.trim() === 'poetryLine poetryLineLevel1') {
                                        currentElement.className = 'poetryLine';
                                    }
                                    else if (className && className.trim() === 'poetryLine poetryLineLevel2') {
                                        currentElement.className = 'poetryLine poetryLineLevel1';
                                    }
                                    else if (className && className.trim() === 'poetryLine poetryLineLevel3') {
                                        currentElement.className = 'poetryLine poetryLineLevel2';
                                    }
                                    e.preventDefault();
                                } else {
                                    this.outdentRun = false;
                                }
                            } else {
                                if (!this.indentRun) {
                                    if (className && className.trim() === 'poetryLine') {
                                        currentElement.className = 'poetryLine poetryLineLevel1';
                                    }
                                    else if (className && className.trim() === 'poetryLine poetryLineLevel1') {
                                        currentElement.className = 'poetryLine poetryLineLevel2';
                                    }
                                    else if (className && className.trim() === 'poetryLine poetryLineLevel2') {
                                        currentElement.className = 'poetryLine poetryLineLevel3';
                                    }
                                    e.preventDefault();
                                } else {
                                    this.indentRun = false;
                                }
                            }
                        }*/
                    }
                }
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
            text: '<i class="fa fa-bookmark" aria-hidden="true"></i>',
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
            text: '<i class="fa fa-asterisk" aria-hidden="true"></i>',
            tooltip: "Footnote",
            onAction: () => this.addFootnote(editor),
            onSetup: (btnRef) => {
                this.footnoteBtnInstance = btnRef;
            }
        });
    }

    /**
     * Adds inline code formatting.
     * @param {*} editor  editor instance
     */
    addInlineCode = (editor) => {
        let selectedText = window.getSelection().anchorNode.parentNode.nodeName;
        let hasCodeTag = window.getSelection().anchorNode.parentNode.innerHTML.includes('<code data-mce-selected="inline-boundary">')
        if (editor.selection.getContent() != "" && selectedText != "CODE" && !hasCodeTag) {
            editor.selection.setContent('<code>' + editor.selection.getContent() + '</code>');
        }
        else {
            editor.selection.getContent() === "" && editor.selection.setContent('');
        }
    }

    /*
    *  handleFocussingInlineCode function is responsible for focussing inline Code Formatting button
    */
    handleFocussingInlineCode = (api, editor) => {
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
     * Adding button and bind exec command on clicking the button to open the chemistry editor
     * @param {*} editor  editor instance
     */
    addChemistryFormulaButton = editor => {
        let self = this;
        editor.ui.registry.addButton("tinyMcewirisformulaEditorChemistry", {
            text: "",
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
            text: "",
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

    /**
     * Called before paste process
     * @param {*} plugin
     * @param {*} args
     */
    pastePreProcess = (plugin, args) => {
        if (this.props.element && this.props.element.figuretype && this.props.element.figuretype === "codelisting") {
            return;
        }
        if (this.props.element && this.props.element.type && this.props.element.type === 'element-list') {
            args.content = args.content.replace(/<ul>.*?<\/ul>/g, "")
        }
        let testElement = document.createElement('div');
        testElement.innerHTML = args.content;
        if (testElement.innerText.trim().length) {
            args.content = testElement.innerText.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        } else {
            args.content = tinymce.activeEditor.selection.getContent();
        }
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
    addFootnote = (editor) => {
        if (config.savingInProgress || config.popupCreationCallInProgress) {
            return false
        }
        let elementId = ""
        if (this.props.element.type === "popup") {
            if ((this.props.popupField === "formatted-title" || this.props.popupField === "formatted-subtitle") && !this.props.currentElement) {
                return false
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
                    // case "3":
                    //     if (!this.props.element.contents['formatted-caption']) {
                    //         return false;
                    //     }
                    //     break;
                    case "4":
                        if (!(this.props.element.contents['creditsarray'] ? this.props.element.contents['creditsarray'][0] : null)) {
                            return false;
                        }
                }
            }
            elementId = this.props.elementId
        }
        else {
            elementId = this.props.elementId
        }
        getGlossaryFootnoteId(elementId, "FOOTNOTE", res => {
            if (res.data && res.data.id) {
                let tempDiv = document.createElement('div');
                tempDiv.innerHTML = tinyMCE.activeEditor.getContent();
                tinymce.$(tempDiv).find('.blockquote-hidden').remove()
                if (this.props.model && this.props.model.text && this.props.model.text.includes("blockquoteMarginaliaAttr") && !tempDiv.innerText.trim()) {
                    let insertText = `<blockquote class="blockquoteMarginaliaAttr" contenteditable="false"><p class="paragraphNummerEins" contenteditable="true"><sup><a href="#" id = "${res.data.id}" data-uri="${res.data.id}" data-footnoteelementid="${res.data.id}" class="Pearson-Component paragraphNumeroUnoFootnote">*</a></sup></p><p class="blockquoteTextCredit" contenteditable="false">${document.getElementsByClassName('attribution-editor')[0].innerHTML}</p></blockquote>`
                    tinymce.activeEditor.setContent(insertText);
                    document.getElementById(tinyMCE.activeEditor.id).classList.remove("place-holder")
                }
                else if (this.props.model && this.props.model.text && this.props.model.text.includes("blockquoteMarginalia") && !tempDiv.innerText.trim()) {
                    let insertText = `<blockquote class="blockquoteMarginalia" contenteditable="false"><p class="paragraphNummerEins" contenteditable="true"><sup><a href="#" id = "${res.data.id}" data-uri="${res.data.id}" data-footnoteelementid="${res.data.id}" class="Pearson-Component paragraphNumeroUnoFootnote">*</a></sup></p></blockquote>`;
                    tinymce.activeEditor.setContent(insertText);
                    document.getElementById(tinyMCE.activeEditor.id).classList.remove("place-holder")
                }
                else {
                    editor.insertContent(`<sup><a href="#" id = "${res.data.id}" data-uri="${res.data.id}" data-footnoteelementid="${res.data.id}" class="Pearson-Component paragraphNumeroUnoFootnote">*</a></sup>`);
                }
                this.toggleGlossaryandFootnotePopup(true, "Footnote", res.data.id, () => { this.toggleGlossaryandFootnoteIcon(true); });
                this.saveContent()
            }
        })
    }
    learningObjectiveDropdown(text) {
        this.props.learningObjectiveOperations(text);
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
        if (spans && spans.length) {
           store.dispatch({
               type: MULTIPLE_LINE_POETRY_ERROR_POPUP, 
               payload:{
                   show: true , 
                   message: ERROR_CREATING_GLOSSARY
                }})
            return false;
        }
        let selectedText = window.getSelection().toString()
        this.glossaryTermText = selectedText;
        if (selectedText.trim() === "") {
            return false
        }
        getGlossaryFootnoteId(this.props.elementId, "GLOSSARY", res => {
            let insertionText = ""
            if (res.data && res.data.id) {
                insertionText = `<dfn data-uri= ${res.data.id} class="Pearson-Component GlossaryTerm">${selectedText}</dfn>`
            }
            editor.insertContent(insertionText);
            this.toggleGlossaryandFootnotePopup(true, "Glossary", res.data && res.data.id || null, () => { this.toggleGlossaryandFootnoteIcon(true); });
            this.saveContent()
        })
    }

    /**
     * Saves glossary/footnote on creation
     */
    saveContent = () => {
        const { glossaryFootnoteValue , poetryField} = this.props;
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
        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
        customEvent.subscribe('glossaryFootnoteSave', (elementWorkId) => {
            saveGlossaryAndFootnote(elementWorkId, elementType, glossaryfootnoteid, type, term, definition, elementSubType, typeWithPopup,poetryField)
                customEvent.unsubscribe('glossaryFootnoteSave');
        })
        this.handleBlur(null, true); //element saving before creating G/F (as per java team)
        //this.handleBlur(null, true);
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
                payload:{
                    show: true , 
                    message: ERROR_CREATING_ASSETPOPOVER
                }})
            return false;
        }
        let selection = window.getSelection().anchorNode.parentNode;
        let selectedTag = selection.nodeName;
        let selectedTagClass = selection.classList;
        if (selectedTag !== "LI" && selectedTag !== "P" && selectedTag !== "H3" && selectedTag !== "BLOCKQUOTE" && (!selectedTagClass.contains('poetryLine'))) {
            //selectedText = window.getSelection().anchorNode.parentNode.outerHTML;
            selectedText = '<' + selectedTag.toLocaleLowerCase() + '>' + selectedText + '</' + selectedTag.toLocaleLowerCase() + '>'
        }
        let insertionText = '<span id="asset-popover-attacher">' + selectedText + '</span>';
        // editor.insertContent(insertionText);
        editor.selection.setContent(insertionText);
        customEvent.subscribe('assetPopoverSave', () => {
            this.handleBlur(null, true);
            customEvent.unsubscribe('assetPopoverSave');
        })
        this.props.openAssetPopoverPopUp(true);
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
                let isBlockQuote = document.getElementById(tinymce.activeEditor.id) && document.getElementById(tinymce.activeEditor.id).classList.contains('blockquote-editor');
                if (!isBlockQuote) {
                    if (document.getElementById(activeElementObj.join("-")) && tinymce.activeEditor.id == activeElementObj.join("-")) {
                        document.getElementById(activeElementObj.join("-")).innerHTML = tempContainerHtml;
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
                    this.editorRef.current.style.caretColor = 'transparent';
                    this.editorRef.current.focus();
                }

               
                this.setToolbarByElementType();
                // Make element active on element create, set toolbar for same and remove localstorage values
                if (this.editorRef.current && document.getElementById(this.editorRef.current.id) && newElement) {
                    config.editorRefID = this.editorRef.current.id;
                    let timeoutId = setTimeout(() => {
                        document.getElementById(this.editorRef.current.id).click();
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
                tinymce.init(this.editorConfig).then((d) => {
                    if (this.editorRef.current) {
                        if (termText && termText.length && this.props.element.type === 'figure') {
                            document.getElementById(currentId).innerHTML = termText;
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

    /**
    * Defines initial placeholder
    */
    handlePlaceholder = () => {
        if (this.props.element && this.props.element.type === "element-list" || this.props.currentElement && this.props.currentElement.type === 'element-list') {
            this.placeHolderClass = '';
        }
        else if (this.props.model && this.props.model.text) {
            let testElem = document.createElement('div');
            testElem.innerHTML = this.props.model.text;
            let isContainsMath = testElem.innerHTML.match(/<img/) ? (testElem.innerHTML.match(/<img/).input.includes('class="Wirisformula') || testElem.innerHTML.match(/<img/).input.includes('class="temp_Wirisformula')) : false;
            if (testElem.innerText || isContainsMath) {
                if (testElem.innerText.trim() == "" && !testElem.innerText.trim().length && !isContainsMath) {
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
            if (!testElem.innerText.trim()) {
                testElem.innerText = "";
            }
            if (testElem.innerText.trim() == "" && !testElem.innerText.trim().length && !isContainsMath) {
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
    componentDidUpdate() {
        let isBlockQuote = this.props.element && this.props.element.elementdata && (this.props.element.elementdata.type === "marginalia" || this.props.element.elementdata.type === "blockquote");
        if (isBlockQuote) {
            this.lastContent = document.getElementById('cypress-' + this.props.index).innerHTML;
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
        if (this.props.placeholder === "Enter Label..." || this.props.placeholder === 'Enter call to action...' || (this.props.element && this.props.element.subtype == 'mathml' && this.props.placeholder === "Type something...")) {
            toolbar = (this.props.element && this.props.element.type === 'poetry') ? config.poetryLabelToolbar : config.labelToolbar;
        }
        else if (this.props.placeholder === "Enter Caption..." || this.props.placeholder === "Enter Credit...") {
            toolbar = (this.props.element && this.props.element.type === 'poetry') ? config.poetryCaptionToolbar : config.captionToolbar;

        } else if (this.props.placeholder === "Enter block code...") {
            toolbar = config.codeListingToolbar;
        } else if (this.props.placeholder === "Enter Show text" || this.props.placeholder === "Enter revel text") {
            toolbar = config.showHideToolbar
        } else if (this.props.placeholder === "Enter Hide text") {
            toolbar = config.hideToolbar
        } else if (this.props.placeholder == "Type Something..." && this.props.element && this.props.element.type == 'stanza') {
            toolbar = config.poetryStanzaToolbar;
        } else {
            toolbar = config.elementToolbar;
        }
        return toolbar;
    }

    /**
     * Set dynamic toolbar by element type
     */
    setToolbarByElementType = () => {
        let toolbar = this.setInstanceToolbar();
        tinyMCE.$('#tinymceToolbar').find('.tox-toolbar__group>.tox-split-button,.tox-toolbar__group>.tox-tbtn').removeClass('toolbar-disabled')
        if (toolbar && toolbar.length) {
            tinyMCE.$('#tinymceToolbar').find('.tox-toolbar__group>.tox-split-button,.tox-toolbar__group>.tox-tbtn')
                .each((index) => {
                    if (config.toolBarList[index] && toolbar.indexOf(config.toolBarList[index]) > -1) {
                        tinyMCE.$('#tinymceToolbar').find('.tox-toolbar__group>.tox-split-button,.tox-toolbar__group>.tox-tbtn').eq(index).addClass('toolbar-disabled')
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
        if (config && config.slateType === "container-introduction" && document.getElementById('tinymceToolbar') && document.getElementById('tinymceToolbar').classList) {
            document.getElementById('tinymceToolbar').classList.remove('toolbar-disabled')
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
        
        if (this.props.permissions && !(this.props.permissions.includes('access_formatting_bar') || this.props.permissions.includes('elements_add_remove'))) {        // when user doesn't have edit permission
            if (tinymce.activeEditor && tinymce.activeEditor.id) {
                document.getElementById(tinymce.activeEditor.id).setAttribute('contenteditable', false)
            }
        }
        this.props.handleEditorFocus("", showHideObj, e);
        let isSameTarget = false, isSameByElementId = false;
        let event = Object.assign({}, e);
        let currentTarget = event.currentTarget;
        let isSameTargetBasedOnDataId = true;
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
        let activeShowHideNode = document.querySelector('.show-hide-active .cypress-editable.mce-content-body.mce-edit-focus')
        if(activeContainerNode){
            currentActiveNode = activeContainerNode
        }
        else if(activeShowHideNode){
            currentActiveNode = activeShowHideNode
        }
       
        let currentElementId = this.props.currentElement && !(currentTarget && currentTarget.classList.contains('formatted-text')) ? this.props.currentElement.id : this.props.element.id

        if (currentActiveNode && currentActiveNode.getAttribute('data-id') === currentElementId) {
            isSameByElementId = true;
        }
        /**
         * case - if tinymce already has an active editor then...
         * first remove current tinymce instance then prepare element currently being focused to get tinymce intialized
         */
        let activeEditorId = '';
        if ((!isSameTargetBasedOnDataId || !isSameTarget || !isSameByElementId) && currentActiveNode && tinymce.activeEditor && document.getElementById(tinyMCE.activeEditor.id) && !(tinymce.activeEditor.id.includes('glossary') || tinymce.activeEditor.id.includes('footnote'))) {
            activeEditorId = tinymce.activeEditor.id;
            /**
             * Before removing the current tinymce instance, update wiris image attribute data-mathml to data-temp-mathml and class Wirisformula to temp_Wirisformula
             * As removing tinymce instance, also updates the images made by the wiris plugin to mathml
             */
            let tempContainerHtml = tinyMCE.$("#" + activeEditorId).html()
            let tempNewContainerHtml = tinyMCE.$("#" + currentTarget.id).html()
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
                    if (document.querySelectorAll('.element-container[data-id="' + previousTargetId + '"] .cypress-editable').length)
                        document.querySelectorAll('.element-container[data-id="' + previousTargetId + '"] .cypress-editable')[0].innerHTML = tempContainerHtml;
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
            tinymce.$('.wrs_modal_desktop').remove();

            for (let i = tinymce.editors.length - 1; i > -1; i--) {
                let ed_id = tinymce.editors[i].id;
                if (!(ed_id.includes('glossary') || ed_id.includes('footnote'))) {
                    let tempFirstContainerHtml = tinyMCE.$("#" + tinymce.editors[i].id).html()
                    tempFirstContainerHtml = tempFirstContainerHtml.replace(/\sdata-mathml/g, ' data-temp-mathml').replace(/\"Wirisformula/g, '"temp_Wirisformula').replace(/\sWirisformula/g, ' temp_Wirisformula');
                    if (document.getElementById(tinymce.editors[i].id)) {
                        document.getElementById(tinymce.editors[i].id).innerHTML = tempFirstContainerHtml;
                    }
                    removeTinyDefaultAttribute(tinymce.activeEditor.targetElm)
                    tinymce.remove(`#${ed_id}`)
                    tinymce.$('.wrs_modal_desktop').remove();
                    if (document.getElementById(`${ed_id}`)) {
                        document.getElementById(`${ed_id}`).contentEditable = true;
                    }
                }
            }
            if (document.getElementById(activeEditorId)) {
                document.getElementById(activeEditorId).contentEditable = true;
            }
            this.editorConfig.selector = '#' + currentTarget.id;

            /**
             * Using timeout - init tinymce instance only when default events stack becomes empty
             */
            currentTarget.focus();
            let termText = tinyMCE.$("#" + currentTarget.id) && tinyMCE.$("#" + currentTarget.id).html();
            tinymce.init(this.editorConfig).then(() => {
                if (termText && termText.length && this.props.element.type !== 'poetry' && this.props.element.type !== 'element-list' && !(
                this.props.element.type === "showhide" && this.props.currentElement.type === 'element-list')) {
                    if (termText.search(/^(<.*>(<br.*>)<\/.*>)+$/g) < 0 && 
                    (tinyMCE.$("#" + currentTarget.id).html()).search(/^(<.*>(<br.*>)<\/.*>)+$/g) >= 0) {
                        termText = tinyMCE.$("#" + currentTarget.id).html();
                    }
                    /***
                     * [BG-2225] | Unwanted saving calls in video element
                     */
                    if (this.props.element.type === "figure" && termText.search(/^(<.*>(<br.*>)<\/.*>)+$/g) < 0 &&
                        (tinyMCE.$("#" + currentTarget.id).html()).search(/^(<br.*>)+$/g) >= 0) {
                        termText = tinyMCE.$("#" + currentTarget.id).html();
                    }
                    /* Reverting data-temp-mathml to data-mathml and class Wirisformula to temp_WirisFormula */
                    termText = termText.replace(/data-temp-mathml/g, 'data-mathml').replace(/temp_Wirisformula/g, 'Wirisformula');
                    document.getElementById(currentTarget.id).innerHTML = termText
                }
                if (clickedX !== 0 && clickedY !== 0) {
                    tinymce.activeEditor.selection.placeCaretAt(clickedX, clickedY) //Placing exact cursor position on clicking.
                }
                tinymce.$('.blockquote-editor').attr('contenteditable', false)
                this.editorOnClick(event);
                if (currentTarget && currentTarget.querySelectorAll('li') && currentTarget.querySelectorAll('li').length) {
                    currentTarget.querySelectorAll('li').forEach((li) => {
                        if (li.innerHTML.trim() == '') {
                            li.append(document.createElement('br'))
                        }
                    })
                }
            });
            this.setToolbarByElementType();
        }
        /**
         * case - continuing with toggling glossary & footnote popup
         */
        let timeoutInstance = setTimeout(() => {
            clearTimeout(timeoutInstance);
            tinymce.init(this.editorConfig).then((d) => {
                this.setToolbarByElementType();
                if (currentTarget && currentTarget.querySelectorAll('li') && currentTarget.querySelectorAll('li').length) {
                    currentTarget.querySelectorAll('li').forEach((li) => {
                        if (li.innerHTML.trim() == '') {
                            li.append(document.createElement('br'))
                        }
                    })
                }
                if (document.querySelector('button[title="Asset Popover"]')) {
                    document.querySelector('button[title="Asset Popover"]').setAttribute("aria-disabled", false)
                    document.querySelector('button[title="Asset Popover"]').removeAttribute('aria-pressed')
                    document.querySelector('button[title="Asset Popover"]').classList.remove('tox-tbtn--disabled')
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
                    if ((this.innerHTML === '' || this.innerHTML === "<br>" || this.textContent.trim() == '') && !(imgTag && imgTag.length)) {
                        this.remove();
                    }
                })
            }
            else if (poetryStanza.length === 1 && poetryStanza[0].innerHTML === "&nbsp;") {
                poetryStanza[0].innerHTML = "<br>"
                e.stopPropagation();
                return;
            }
            let mainParent = null;
            let allLines = tinymce.$(`div[data-id="${this.props.elementId}"] .poetryLine`);
            let nodesFragment = document.createDocumentFragment();
            for (let index = 0; index < allLines.length; index++) {
                let parents = [];
                let elem = allLines[index];
                while (elem.parentNode && elem.parentNode.nodeName.toLowerCase() != 'div') {
                    elem = elem.parentNode;
                    parents.push(elem.nodeName.toLowerCase());
                }
                mainParent = elem.parentElement;
                for (let innerIndex = 0; innerIndex < parents.length; innerIndex++) {
                    allLines[index].innerHTML = '<' + parents[innerIndex] + '>' + allLines[index].innerHTML + '</' + parents[innerIndex] + '>';
                }
                nodesFragment.appendChild(allLines[index]);
            }
            if (mainParent) {
                mainParent.innerHTML = "";
                mainParent.appendChild(nodesFragment);
            }
        }

        tinyMCE.$('.Wirisformula').each(function () {
            this.naturalHeight && this.setAttribute('height', this.naturalHeight + 4)
            this.naturalWidth && this.setAttribute('width', this.naturalWidth)
        })
        let showHideType = this.props.showHideType || null
        showHideType = showHideType === "revel" ? "postertextobject" : showHideType

        if (!this.fromtinyInitBlur && !config.savingInProgress) {
            let elemNode = document.getElementById(`cypress-${this.props.index}`)
            elemNode.innerHTML = elemNode.innerHTML.replace(/<br data-mce-bogus="1">/g, "")
            if (
                this.props.element &&
                (this.props.element.type === "popup" || this.props.element.type === "citations") &&
                !this.props.currentElement &&
                elemNode &&
                elemNode.innerHTML !== ""
            ) {
                this.props.createPopupUnit(this.props.popupField, forceupdate, this.props.index, this.props.element)
            } else if (this.props.element && this.props.element.type === "poetry" && !this.props.currentElement && elemNode && elemNode.innerHTML !== "") {
                this.props.createPoetryElements(this.props.poetryField, true, this.props.index, this.props.element)
            } else {
                this.props.handleBlur(forceupdate, this.props.currentElement, this.props.index, showHideType)
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

    render() {
        const { slateLockInfo: { isLocked, userId } } = this.props;
        let lockCondition = isLocked && config.userId !== userId.replace(/.*\(|\)/gi, '');

        let classes = this.props.className ? this.props.className + " cypress-editable" : '' + "cypress-editable";
        let id = 'cypress-' + this.props.index;
        classes += ' ' + this.placeHolderClass;
        /**Render editable tag based on tagName*/
        switch (this.props.tagName) {
            case 'p':
                return (
                    <p ref={this.editorRef} id={id} onKeyDown={this.normalKeyDownHandler} onBlur={this.handleBlur} onClick={this.handleClick} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={!lockCondition} dangerouslySetInnerHTML={{ __html: this.props.model }}>{/*htmlToReactParser.parse(this.props.model) */}</p>
                );
            case 'h4':
                let model = ""
                if (this.props.element && this.props.element.type === "popup") {
                    model = this.props.model && this.props.model.replace(/class="paragraphNumeroUno"/g, "")
                }
                /* else if (this.props.element && this.props.element.type === "citations") {
                    model = this.props.model
                }
                else if (this.props.element && this.props.element.type === "poetry") {
                    if (this.props.poetryField === 'formatted-title') {
                        model = this.props.model
                    }
                } */
                else {
                    model = this.props.model;
                }
                let tempDiv = document.createElement('div');
                tempDiv.innerHTML = model;
                if (tempDiv && tempDiv.children && tempDiv.children.length && tempDiv.children[0].tagName === 'P') {
                    model = tempDiv.children[0].innerHTML;
                }
                if (this.props.poetryField && this.props.poetryField === 'formatted-title') {
                    if( !classes.includes('poetryHideLabel')) {
                        classes = classes + ' poetryHideLabel';
                    }
                    return (
                        <h4 ref={this.editorRef} id={id} onKeyDown={this.normalKeyDownHandler} onBlur={this.handleBlur} onClick={this.handleClick} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={!lockCondition} dangerouslySetInnerHTML={{ __html: model }} >{/*htmlToReactParser.parse(this.props.model) */}</h4>
                    )
                } else {
                    return (
                        <h4 ref={this.editorRef} id={id} onKeyDown={this.normalKeyDownHandler} onBlur={this.handleBlur} onClick={this.handleClick} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={!lockCondition} dangerouslySetInnerHTML={{ __html: model }} >{/*htmlToReactParser.parse(this.props.model) */}</h4>
                    )
                }
            case 'code':
                return (
                    <code ref={this.editorRef} id={id} onBlur={this.handleBlur} onClick={this.handleClick} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={!lockCondition} dangerouslySetInnerHTML={{ __html: this.props.model }}>{/*htmlToReactParser.parse(this.props.model) */}</code>
                )
            case 'blockquote':
                if (this.props.element && this.props.element.elementdata && this.props.element.elementdata.type === "marginalia") {
                    let temDiv = document.createElement('div');
                    temDiv.innerHTML = this.props.model && this.props.model.text ? this.props.model.text : '<blockquote class="blockquoteMarginaliaAttr" contenteditable="false"><p class="paragraphNummerEins" contenteditable="true"></p><p class="blockquoteTextCredit" contenteditable="false"></p></blockquote>';
                    if (!tinymce.$(temDiv).find('blockquote p.blockquote-hidden').length) {
                        tinymce.$(temDiv).find('blockquote').append('<p contenteditable="false" class="blockquote-hidden" style="visibility: hidden;">hidden</p>');
                    }
                    tinymce.$(temDiv).find('blockquote').attr('contenteditable', 'false');
                    tinymce.$(temDiv).find('.paragraphNummerEins').attr('contenteditable', !lockCondition);
                    if (tinymce.$(temDiv).find('.paragraphNummerEins') && tinymce.$(temDiv).find('.paragraphNummerEins')[0]) {
                        tinymce.$(temDiv).find('.paragraphNummerEins')[0].addEventListener('blur', this.handleBlur);
                    }
                    tinymce.$(temDiv).find('.blockquoteTextCredit').attr('contenteditable', 'false');
                    classes = classes + ' blockquote-editor with-attr';
                    return (
                        <div ref={this.editorRef} id={id} onBlur={this.handleBlur} onClick={this.handleClick} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={false} dangerouslySetInnerHTML={{ __html: temDiv.innerHTML }} onChange={this.handlePlaceholder}>{/* htmlToReactParser.parse(this.props.model.text) */}</div>
                    )
                }
                else if (this.props.element && this.props.element.elementdata && this.props.element.elementdata.type === "blockquote") {
                    let temDiv = document.createElement('div');
                    temDiv.innerHTML = this.props.model && this.props.model.text ? this.props.model.text : '<blockquote class="blockquoteMarginalia" contenteditable="false"><p class="paragraphNummerEins" contenteditable="true"></p></blockquote>';
                    if (!tinymce.$(temDiv).find('blockquote p.blockquote-hidden').length) {
                        tinymce.$(temDiv).find('blockquote').append('<p contenteditable="false" class="blockquote-hidden" style="visibility: hidden;">hidden</p>');
                    }
                    tinymce.$(temDiv).find('blockquote').attr('contenteditable', 'false');
                    tinymce.$(temDiv).find('.paragraphNummerEins').attr('contenteditable', !lockCondition);
                    classes = classes + ' blockquote-editor without-attr';
                    return (
                        <div ref={this.editorRef} id={id} onBlur={this.handleBlur} onClick={this.handleClick} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={false} dangerouslySetInnerHTML={{ __html: temDiv.innerHTML }} onChange={this.handlePlaceholder}>{/* htmlToReactParser.parse(this.props.model.text) */}</div>
                    )
                }
                else {
                    classes = classes + ' pullquote-editor';
                    return (
                        <div ref={this.editorRef} id={id} onBlur={this.handleBlur} onClick={this.handleClick} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={!lockCondition} dangerouslySetInnerHTML={{ __html: this.props.model && this.props.model.text ? this.props.model.text : '<p class="paragraphNumeroUno"><br/></p>' }} onChange={this.handlePlaceholder}>{/* htmlToReactParser.parse(this.props.model.text) */}</div>
                    )
                }
            case 'figureCredit':
                return (
                    <div ref={this.editorRef} id={id} onBlur={this.handleBlur} onKeyDown={this.normalKeyDownHandler} onClick={this.handleClick} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={!lockCondition} dangerouslySetInnerHTML={{ __html: this.props.model }} onChange={this.handlePlaceholder}>{/* htmlToReactParser.parse(this.props.model.text) */}</div>
                )
            case 'element-citation':
                return (
                    <div ref={this.editorRef} id={id} onBlur={this.handleBlur} onKeyDown={this.normalKeyDownHandler} onClick={this.handleClick} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={!lockCondition} dangerouslySetInnerHTML={{ __html: this.props.model && this.props.model.text ? this.props.model.text : '<p class="paragraphNumeroUnoCitation"><br/></p>' }} onChange={this.handlePlaceholder}></div>
                )
            default:
                return (
                    <div ref={this.editorRef} data-id={this.props.currentElement ? this.props.currentElement.id : ''} onKeyDown={this.normalKeyDownHandler} id={id} onBlur={this.handleBlur} onClick={this.handleClick} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={!lockCondition} dangerouslySetInnerHTML={{ __html: this.props.model && this.props.model.text ? this.props.model.text : (typeof (this.props.model) === 'string' ? this.props.model : '<p class="paragraphNumeroUno"><br/></p>') }} onChange={this.handlePlaceholder}></div>
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

export default TinyMceEditor;

