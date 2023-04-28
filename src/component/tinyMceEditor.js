import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//IMPORT TINYMCE 
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver/theme.min.js';
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";
import "tinymce/skins/content/default/content.css";
import "tinymce/plugins/lists/plugin.min.js";
import "tinymce/plugins/advlist/plugin.min.js";
import "tinymce/plugins/paste/plugin.min.js";
// Commenting icons import related to latest tinymce version
import 'tinymce/icons/default/icons.min.js';
import { EditorConfig, FormatSelectors, elementTypeOptions, insertMediaSelectors } from '../config/EditorConfig';
import config from '../config/config';
import { insertListButton, bindKeyDownEvent, insertUoListButton, preventRemoveAllFormatting, removeTinyDefaultAttribute, removeListHighliting, highlightListIcon } from './ListElement/eventBinding.js';
import { authorAssetPopOver } from './AssetPopover/openApoFunction.js';
import {
    tinymceFormulaIcon, tinymceFormulaChemistryIcon, assetPopoverIcon, crossLinkIcon, code, Footnote, bold, Glossary, undo, redo, italic, underline, strikethrough, removeformat, subscript, superscript, charmap, downArrow, orderedList, unorderedList, indent, outdent, alignleft, alignright, aligncenter, alignment, calloutMenuIcon, markedIndex
} from '../images/TinyMce/TinyMce.jsx';
import { getGlossaryFootnoteId } from "../js/glossaryFootnote";
import { checkforToolbarClick, customEvent, spanHandlers, removeBOM, getWirisAltText, removeImageCache, removeMathmlImageCache } from '../js/utils';
import { saveGlossaryAndFootnote, setFormattingToolbar } from "./GlossaryFootnotePopup/GlossaryFootnote_Actions";
import { ShowLoader, LaunchTOCForCrossLinking } from '../constants/IFrameMessageTypes';
import { sendDataToIframe, hasReviewerRole, removeBlankTags, handleTextToRetainFormatting, handleTinymceEditorPlugins, getCookieByName, ALLOWED_ELEMENT_IMG_PASTE, removeStyleAttribute, GLOSSARY, MARKEDINDEX, allowedFormattings, validStylesTagList, getSelectionTextWithFormatting, findStylingOrder, ALLOWED_FORMATTING_TOOLBAR_TAGS, isSubscriberRole } from '../constants/utility.js';
import store from '../appstore/store';
import { MULTIPLE_LINE_POETRY_ERROR_POPUP, INSERT_NON_BREAKING_SPACE, NON_BREAKING_SPACE_SUPPORTED_ARRAY, INSERT_SPECIAL_CHARACTER, INSERT_A_BLANK } from '../constants/Action_Constants';
import { ERROR_CREATING_GLOSSARY, ERROR_CREATING_ASSETPOPOVER, MANIFEST_LIST, MANIFEST_LIST_ITEM, TEXT, ERROR_DELETING_MANIFEST_LIST_ITEM, childNodeTagsArr, allowedClassName } from '../component/SlateWrapper/SlateWrapperConstants.js';
import { conversionElement } from './Sidebar/Sidebar_Action';
import { wirisAltTextPopup, createElement, saveCaretPosition } from './SlateWrapper/SlateWrapper_Actions';
import { deleteElement, approvedSlatePopupStatus } from './ElementContainer/ElementContainer_Actions';
import elementList from './Sidebar/elementTypes';
import { getParentPosition} from './CutCopyDialog/copyUtil';

import { handleC2MediaClick, dataFromAlfresco, checkForDataIdAttribute, checkBlockListElement, isNestingLimitReached, isElementInsideBlocklist, checkActiveElement }  from '../js/TinyMceUtility.js';
import { saveInlineImageData ,saveSelectedAlfrescoElement } from "../component/AlfrescoPopup/Alfresco_Action.js"
import ElementConstants from './ElementContainer/ElementConstants';
import { moveCursor } from './Keyboard/KeyboardWrapper.jsx';
import { autoNumberFigureTypesAllowed, autoNumberContainerTypesAllowed, LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES, autoNumberFieldsPlaceholders } from '../component/FigureHeader/AutoNumberConstants';
import checkmark from '../images/ElementButtons/checkmark.svg';

let context = {};
let clickedX = 0;
let clickedY = 0;
const {
    AUTO_NUMBER_SETTING_RESUME_NUMBER,
    AUTO_NUMBER_SETTING_OVERRIDE_NUMBER,
    AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER
} = LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES

export class TinyMceEditor extends Component {
    constructor(props) {
        super(props);
        context = this;
        this.state = { popup: false,alignment:'' }
        this.placeHolderClass = ''
        this.indentRun = false;
        this.outdentRun = false;
        this.chemistryMlMenuButton = null;
        this.mathMlMenuButton = null;
        this.assetPopoverButtonState = null;
        this.glossaryTermText = '';
        this.markIndexText = '';
        this.copyContent = '';
        this.lastContent = '';
        this.clearFormateText = '';
        this.isctrlPlusV = false;
        this.fromtinyInitBlur = false;
        this.notFormatting = true;
        this.gRange = null;
        this.wirisClick = 0;
        this.activeGlossaryFootnoteId="";
        this.editorConfig = {
            // spellchecker_rpc_url: cypressConfig.TINYMCE_SPELL_CHECKER_URL,
            plugins: this.handleTinymcePlugins(),
            browser_spellcheck: this.tinymceSpellCheckStatus(),
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
            resize_img_proportional: false,
            paste_preprocess: this.pastePreProcess,
            paste_postprocess: this.pastePostProcess,
            force_p_newlines: false,
            skin: false,
            content_css: false,
            setup: (editor) => {
                if (this.props.permissions && this.props.permissions.includes('authoring_mathml')) {
                    this.setChemistryFormulaIcon(editor);
                    this.setMathmlFormulaIcon(editor);
                    this.addChemistryFormulaButton(editor);
                    this.addMathmlFormulaButton(editor);
                }

                this.setAlignmentIcon(editor);
                this.addAlignmentIcon(editor);
                this.setCrossLinkingIcon(editor);
                this.addCrossLinkingIcon(editor);
                this.setAssetPopoverIcon(editor);
                this.addAssetPopoverIcon(editor);
                this.handleSpecialCharIcon(editor);
                this.addInsertMediaButton(editor);
                this.setFootnoteIcon(editor);
                this.addFootnoteIcon(editor);
                this.setGlossaryIcon(editor);
                this.addGlossaryIcon(editor);
                this.setMarkedIndexIcon(editor);
                this.addIndexEntryIcon(editor);
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
                this.setCalloutIcon(editor);
                this.addCalloutIcon(editor);
            },

            init_instance_callback: (editor) => {
                const isAutoNumberField = (this.props.isAutoNumberingEnabled && (this.props?.element?.type == 'figure' && autoNumberFigureTypesAllowed.includes(this.props?.element?.figuretype) || autoNumberContainerTypesAllowed.includes(this.props?.element?.type)) && autoNumberFieldsPlaceholders.includes(this.props?.placeholder) && this.props?.autoNumberOption?.entityUrn === this.props?.element?.contentUrn)
                if (isAutoNumberField || config.ctaButtonSmartlinkContexts.includes(this.props?.element?.figuredata?.interactivetype) && this.props?.className === "actionPU hyperLinkText" && this.props?.placeholder === "Enter Button Label") {
                    editor.shortcuts.remove('meta+u', '', '');
                    editor.shortcuts.remove('meta+b', '', '');
                    editor.shortcuts.remove('meta+i', '', '');
                }
                const authStore = store.getState();
                const { projectInfo } = authStore;
                let isSubscriber = isSubscriberRole(projectInfo?.projectSharingRole, projectInfo?.projectSubscriptionDetails?.isSubscribed);
                if (this.props.permissions && !((this.props.permissions.includes('access_formatting_bar') || this.props.permissions.includes('elements_add_remove')) && !isSubscriber)) {
                    if (editor && editor.id) {
                        document.getElementById(editor.id).setAttribute('contenteditable', false);
                    }
                }
                tinymce?.activeEditor?.on('ObjectResizeStart', function (e) {
                    if (e?.target?.nodeName == 'IMG' && e.target.classList.length > 0 && (e.target.classList.contains('Wirisformula') || e.target.classList.contains('temp_Wirisformula'))) {
                        e.preventDefault();/** Prevent IMG resize for MathML images */
                    }
                });

                editor.on('Change', (e) => {
                    /*
                        if content is caused by wiris then call blur
                    */
                   const eventTarget = e.target.targetElm
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
                                this.props.handleBlur(null, this.props.currentElement, this.props.index, showHideType, eventTarget)
                            
                            }
                        }
                        editor.selection.placeCaretAt(clickedX, clickedY);
                    }

                    if(e.level && e.level.content?.match(/<blockquote/)?.input?.includes('class="blockquoteMarginalia') && e.level.content?.match(/<img/)?.input?.includes('class="imageAssetContent')){
                        this.props.handleBlur(null, this.props.currentElement, this.props.index, null, eventTarget)
                    }

                    let content = e.target.getContent({ format: 'text' }),
                        contentHTML = e.target.getContent(),
                        activeElement = editor.dom.getParent(editor.selection.getStart(), '.cypress-editable');

                    if (activeElement && activeElement.getAttribute('id') === 'cypress-' + this.props.index) {
                        let currentNode = document.getElementById('cypress-' + this.props.index)
                        let isContainsMath = contentHTML.match(/<img/) ? (contentHTML.match(/<img/).input.includes('class="Wirisformula') || contentHTML.match(/<img/).input.includes('class="temp_Wirisformula')) || contentHTML.match(/<img/).input.includes('class="imageAssetContent') : false
                        let nodeContent = (currentNode && !currentNode.innerText.trim().length) ? true : false
                        const isContainsBlankLine = contentHTML.match(/<span/) ? contentHTML.match(/<span/).input.includes('class="answerLineContent') : false;
                        if (!isContainsMath && currentNode && currentNode.innerHTML) {
                            isContainsMath = currentNode.innerHTML.match(/<img/) ? (currentNode.innerHTML.match(/<img/).input.includes('class="Wirisformula') || currentNode.innerHTML.match(/<img/).input.includes('class="temp_Wirisformula')) : false;
                        }
                         if ((this.props.element.type === 'figure'|| this.props.element.type ==='element-aside') && config.figureFieldsPlaceholders.includes(this.props.placeholder)) {
                            activeElement.classList.remove('place-holder');
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

                        this.removeBogusTagsFromDom();
                        this.removeAttributionBr();
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
     * function to provide tinymce plugins
     * @returns {String} Tinymce plugins list
     */
    handleTinymcePlugins = () => {
        let plugins = EditorConfig.plugins;
        // adding tinymce spellchecker plugin if spell checker option is active from project settings
        if (this.tinymceSpellCheckStatus()) plugins = `${plugins} spellchecker`;
        plugins = handleTinymceEditorPlugins(plugins)
        return plugins;
    }

    /**
     * function to provide the status of tinymce spell check option
     * @returns {Boolean} tinymce spell check status
     */
     tinymceSpellCheckStatus = () => {
        const { spellCheckToggle } = this.props;
        return spellCheckToggle;
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
                    if (innerNode.classList && (innerNode.classList.contains('Wirisformula') || innerNode.classList.contains('temp_Wirisformula') || innerNode.classList.contains('imageAssetContent'))) {
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
        if(type === 'unordered' && checkActiveElement(['manifestlist'])) {
            return;
        }
        this.elementConverted = true;
        let blockListData = isElementInsideBlocklist({index:this.props.index,data:this.props}, this.props.slateLevelData);
        removeListHighliting();
        // This block is to make an API call before making metadata call for block list to retain data after metadata call.
        if(blockListData){
            this.props.handleBlur(null, this.props.currentElement, this.props.index, {}, {})
        }
        if ((this.props.element && this.props.element.type === "element-list" && this.props.element.elementdata.listtype === type) ||
            (this.props.currentElement && this.props.currentElement.type === "element-list" && this.props.currentElement.elementdata.listtype === type)) {
            //Check if disable list element warning popup flag is true
            const disableListElementWarning = getCookieByName("DISABLE_LIST_ELEMENT_WARNING");
            if (disableListElementWarning) {
                this.props.onListSelect(this.props.element.subtype || this.props.currentElement.subtype, "");
            } else {
                this.toggleConfirmationPopup(true, this.props.element.subtype || this.props.currentElement.subtype);
            }
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
            const nodeNames = ['dfn','span'];
            if (nodeNames.indexOf(nodeName) > -1) {
                dataURI = node.getAttribute('data-uri');
            } else if (validStylesTagList.indexOf(nodeName) > -1 && (node.closest('dfn') || node.closest('span'))) {
                const dfnNode = node.closest('dfn') || node.closest('span');
                nodeName = dfnNode ? dfnNode.tagName.toLowerCase() : null;
                dataURI = dfnNode.getAttribute('data-uri');
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
            }
            if (this.props && this.props.element && this.props.element.type && this.props.element.type === 'stanza' && e.command === 'mceToggleFormat') {
                let divParent = tinymce.$(`div[id="cypress-${this.props.index}"]`).children();
                spanHandlers.handleFormattingTags(editor, this.props.elementId, 'div', divParent, 'poetryLine', range);
            }
            if (this.props && this.props.element && this.props.element.type && this.props.element.type === 'element-dialogue' && e.command === 'mceToggleFormat') {
                let divParent = tinymce.$(`div[id="cypress-${this.props.index}"]`).children();
                spanHandlers.handleFormattingTags(editor, this.props.elementId, 'div', divParent, 'dialogueLine', range);
            }
            if (this.props && this.props.element && this.props.element.type && this.props.element.figuretype === 'codelisting' && e.command === 'mceToggleFormat') {
                let codeParent = tinymce.$(`code[id="cypress-${this.props.index}"]`).children();
                spanHandlers.handleFormattingTags(editor, this.props.elementId, 'code', codeParent, 'codeNoHighlightLine', range);
            }
            if (this.props.element && this.props.element.type === 'element-blockfeature') {
                if (node && (node.className === 'blockquoteTextCredit' || node.className.includes('blockquoteTextCredit'))) {
                    setFormattingToolbar('disableTinymceToolbar')
                }
            }
            const eventValue = e.value;
            if (e.command === 'mceToggleFormat' && allowedFormattings.indexOf(eventValue) > -1) {
                let parser = new DOMParser();
                let htmlDoc = parser.parseFromString(selectContent, 'text/html');
                let dfnTags = htmlDoc.getElementsByTagName('DFN');
                let spanTags = htmlDoc.getElementsByTagName('SPAN');
                const validNodeNames = ['dfn','code','span'];
                let termType = null;
                if (nodeName === "span" || spanTags.length) {
                    termType = MARKEDINDEX;
                } else if (nodeName === "dfn" || dfnTags.length) {
                    termType = GLOSSARY;
                }
                let tag = null;
                if (termType === MARKEDINDEX) {
                    tag = 'span';
                } else if (termType === GLOSSARY) {
                    tag = 'dfn';
                }
                if (validNodeNames.indexOf(nodeName) > -1 || dfnTags.length || spanTags.length) {
                    let dataUriAttributesList = [];
                    if (nodeName === 'code') {
                        dataURI = node.parentNode.getAttribute('data-uri');
                        dataUriAttributesList.push(dataURI)
                    } else if (nodeNames.indexOf(nodeName) > -1) {
                        dataUriAttributesList.push(dataURI);
                    } else if (dfnTags.length) {
                        for (let index = 0; index < dfnTags.length; index++) {
                            dataUriAttributesList.push(dfnTags[index].getAttribute('data-uri'));
                        }
                    } else if (spanTags.length) {
                        for (let index = 0; index < spanTags.length; index++) {
                            dataUriAttributesList.push(spanTags[index].getAttribute('data-uri'));
                        }
                    }
                    for (let index = 0; index < dataUriAttributesList.length; index++) {
                        const dataURINode = activeElement.querySelector(`${tag}[data-uri="${dataUriAttributesList[index]}"]`);
                        const stylingOrderList = findStylingOrder(dataURINode);
                        stylingOrderList.forEach((styleTag) => {
                            this.handleFormatting(activeElement, dataUriAttributesList[index], termType, styleTag);
                        })
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
                            if (isWirisIncluded.classList.contains('Wirisformula') || isWirisIncluded.classList.contains('temp_Wirisformula') || isWirisIncluded.classList.contains('imageAssetContent')) {
                                textToReplace = this.innerTextWithMathMl(document.getElementById(`cypress-${this.props.index}`), '')
                                this.clearFormateText = '';
                            }
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

                    if(editor.selection.getNode().className.includes('callout') || editor.selection.getNode().className.includes('markedForIndex') || (editor.selection.getNode().className.includes('non-breaking-space') || (ALLOWED_FORMATTING_TOOLBAR_TAGS?.some(el => editor?.selection?.getContent()?.match(el)) && editor?.selection?.getContent()?.includes('class="non-breaking-space"')))){
                        let textSelected = window.getSelection().toString();
                        if (textSelected.length) {
                            editor.insertContent(textSelected);
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
                    clickedX = coOrds?.left;
                    clickedY = coOrds?.top + coOrds?.height / 2;
                    let elementId = tinymce.activeEditor ? tinymce.activeEditor.id : '';
                    let blockqt = document.querySelector('#' + elementId + ' blockquote p.paragraphNummerEins');
                    let opener = document.querySelector('#' + elementId + ' opener p.paragraphNummerEins');
                    const smartlinkElementCheck = e?.target?.targetElm?.className?.includes('hyperLinkText')
                    if ((!blockqt || blockqt.innerText.trim()) && !smartlinkElementCheck) {
                        editor.selection.setContent('<span id="specialChar"></span>');
                    }
                    if ((!opener || opener.innerText.trim()) && !smartlinkElementCheck) {
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
                    if (this.props.element.type === 'openerelement' || headingElement || elementType === 'Pullquote' || elementType === 'Blockquote' || elementType === 'Learning Objective Item' || attributionElement || (activeElement.nodeName === "CODE" && syntaxEnabled && syntaxEnabled.checked)) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    break;
                case 'Underline':
                case 'Bold':
                    if (headingElement || elementType === 'Pullquote' || elementType === 'Blockquote' || elementType === 'Learning Objective Item' || attributionElement || (activeElement.nodeName === "CODE" && syntaxEnabled && syntaxEnabled.checked)) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    break
                case 'Italic':
                    if ((activeElement.nodeName === "CODE" && syntaxEnabled && syntaxEnabled.checked) || elementType === 'Learning Objective Item' || (elementType === "Blockquote" && activeElement.className.includes('blockquoteTextCredit')) || attributionElement) {
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
            //tinymce editor readonly when reviewer or subscriber
            if(hasReviewerRole()){
                tinymce.activeEditor.mode.set("readonly");
            }
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
            /** Open Alfresco Picker to update inline image in list on double-click*/
            if ( !hasReviewerRole() && e?.target?.nodeName == 'IMG' && e.target.classList.contains('imageAssetContent') && (e?.detail == 2) && (this?.props?.element?.type == 'element-list' || (this?.props?.element?.type === ElementConstants.AUTHORED_TEXT ) || (this?.props?.element?.type === "element-blockfeature") || (this?.props?.element?.type === "element-learningobjectives"))) {
                const imageArgs = {
                    id: e.target?.dataset?.id,
                    handleBlur:this.handleBlur
                }

                let temp = document.createElement("div");
                temp.innerHTML = e.target?.outerHTML;
                temp = temp.firstElementChild; 
                let imageId =  temp.getAttribute("imageid")
                if(!imageArgs.id && imageId){
                    imageArgs.id = imageId;
                }

                let params = {
                    element: this.props.element,
                    permissions: this.props.permissions,
                    editor,
                    imageArgs
                }
                config.updateInlineImage = true
                this.props.saveInlineImageData(params)
                handleC2MediaClick(this.props.permissions, editor, this.props.element, this.props.saveSelectedAlfrescoElement);
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
            if (this.props.element && this.props.element.type === 'element-blockfeature') {
                if ( e && e.target && e.target.classList.contains('blockquoteTextCredit')) {
                    setFormattingToolbar('disableTinymceToolbar')
                }
            }
        });
    }
    /**
     * This method is called when user clicks on editor.
     * @param {*} editor  editor instance
     */
    editorOnClick = (e) => {
        let asideNumberingPlaceholders = ['Label Name', 'Number', 'Title'];
        if (this.props?.element?.type === 'figure' && (config.figureFieldsPlaceholders.includes(this.props.placeholder) || this.props.placeholder === 'Enter Button Label')) {
            this.props.onFigureImageFieldFocus(this.props.index);
        }
        if (this.props.element && this.props?.element?.type === 'element-aside' && asideNumberingPlaceholders.includes(this.props.placeholder)) {
            this.props.onFigureImageFieldFocus(this.props.index);
        }
        if (this.props?.parentElement?.subtype === ElementConstants.TAB && this.props?.tabTitle) {
            this.props.onTabTitleFieldFocus(this.props.index);
        }
        // cbFunc | is for callback delegates //
        let cbFunc = null;
        // alreadyExist | is to check if glossary&footnote tab is open //
        let alreadyExist = false;
        let isMarkedIndexExist = false;
        /**
         * Case - If Glossary&Footnote is already open then first unmount existing one
         */
        if (document.getElementsByClassName('glossary-toolbar-wrapper').length) {
            alreadyExist = true;
        }

        /**
         * Case - If Marked index is already open then first unmount existing one
         */
        if (document.getElementsByClassName('index-container').length) {
            isMarkedIndexExist = true;
        }
        /**
         * Case - clicking over Footnote text
         */

        if (e.target.parentElement && (e.target.parentElement.nodeName == "SUP" || e.target?.parentElement?.nodeName == "P") && e.target.parentElement.childNodes &&
            e.target.parentElement.childNodes[0].nodeName == 'A' && e.target.dataset.uri) {
            let uri = e.target.dataset.uri;
            this.activeGlossaryFootnoteId = uri;
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
            
            let imageNode = e.target.closest('dfn');
            let isFigureImageExists = imageNode.hasAttribute('image-id');

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
            if (isAudioExists || isFigureImageExists) {
                if (e.currentTarget.classList.contains('mce-edit-focus') || hasReviewerRole()) {
                    const parentPosition = getParentPosition(e.currentTarget);
                    const slateWrapperNode = document.getElementById('slateWrapper')
                    const scrollTop = slateWrapperNode && slateWrapperNode.scrollTop || 0;

                    const xOffSet = 0;
                    const yOffSet = 10
                    let copyClickedX = e.clientX - parentPosition.x + xOffSet;
                    const copyClickedY = e.clientY - parentPosition.y + scrollTop + yOffSet;
                    if(copyClickedX >= 350 && copyClickedX < 415 ){
                        copyClickedX = 300
                    }
                    if(copyClickedX >= 415 && copyClickedX < 560){
                        copyClickedX = 350
                    }
                    if(copyClickedX >= 560){
                        copyClickedX = 370
                    }
                    let audioPopupPosition = {
                        left: `${(copyClickedX)}px`,
                        top: `${(copyClickedY)}px`
                    }
                   /* if(parentPosition.x +325 >800){
                        audioPopupPosition.left = '0'
                    } */
                    this.props.handleAssetsPopupLocation(true, audioPopupPosition);
                }
            }
        }
        /**
         * Case - clicking over mark index text
         */
        else if ((e.target.nodeName == "SPAN" && e.target.className && e.target.className === "markedForIndex" ) || (e.target.closest("span") && e.target.closest("span").className && e.target.closest("span").className === "markedForIndex")) {
            let uri = e.target.dataset.uri;
            let span = e.target.closest("span");

            if (e.target.nodeName == "SPAN") {
                uri = e.target.dataset.uri;
            } else {
                uri = span.getAttribute('data-uri');
            }
            this.markedIndexBtnInstance.setDisabled(true)
            if (isMarkedIndexExist) {
                cbFunc = () => {
                    this.toggleMarkedIndexIcon(true);
                    this.toggleMarkedIndexPopup(true, 'Markedindex', uri);
                }
                this.toggleMarkedIndexPopup(false, null, uri, cbFunc);
            }
            else {
                this.toggleMarkedIndexPopup(true, 'Markedindex', uri, () => { this.toggleMarkedIndexIcon(true); });
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
                let pageId = (abbrElm.attributes['data-uri'] && abbrElm.attributes['data-uri'].nodeValue) || abbrElm.parentNode.attributes['data-uri'].nodeValue;

                sendDataToIframe({ 'type': LaunchTOCForCrossLinking, 'message': { open: true, case: 'update', link: linkId, element: elementId, page: pageId, blockCanvas: true, crossLink: true, reviewerRole: hasReviewerRole() } });
            }
        }
        else if (e.target.className === "blockquoteTextCredit" || e.target?.className?.includes('blockquoteTextCredit')) {
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
            cbFunc = () =>{
                this.toggleMarkedIndexIcon(false)
            }
            this.toggleMarkedIndexPopup(false,null,null,cbFunc)
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

    toggleMarkedIndexIcon = (flag) => {
        this.markedIndexBtnInstance && this.markedIndexBtnInstance.setDisabled(flag)
    }


    /**
     * This method is called on keyUp.
     * @param {*} editor  editor instance
     */
    editorKeyup = (editor) => {
        editor.on('keyup', (e) => {
            /** Update the PREVIEW field with Label Value immediately */
            if (this.props.isAutoNumberingEnabled && (autoNumberFigureTypesAllowed.includes(this.props?.element?.figuretype) || autoNumberContainerTypesAllowed.includes(this.props?.element?.type)) && autoNumberFieldsPlaceholders.includes(this.props?.placeholder)) {
                this.props.onFigureLabelChange(e, this.props?.placeholder);
            }
            this.isctrlPlusV = false;
            let activeElement = editor.dom.getParent(editor.selection.getStart(), '.cypress-editable');
            let isMediaElement = tinymce.$(tinymce.activeEditor.selection.getStart()).parents('.figureElement,.interactive-element').length;
            let isContainsMath = (activeElement && activeElement.innerHTML.match(/<img/)) ? (activeElement.innerHTML.match(/<img/).input.includes('class="Wirisformula') || activeElement.innerHTML.match(/<img/).input.includes('class="temp_Wirisformula')) || activeElement?.innerHTML?.match(/<img/)?.input.includes('class="imageAssetContent') : false;
            let isContainsBlankLine = (activeElement && activeElement.innerHTML.match(/<span/)) ? activeElement.innerHTML.match(/<span/).input.includes('class="answerLineContent') : false;
            if(this.props.element && this.props.element.type==="element-blockfeature" && e.target &&  (e.target.className==="blockquoteTextCredit" || e.target.className.includes('blockquoteTextCredit'))){
                setFormattingToolbar('disableTinymceToolbar')
            }
            if (activeElement) {
                let lastCont = '';
                if(['<br data-mce-bogus="1">', '<br>'].includes(this.lastContent) && this.props.element.type === 'element-aside'){
                    lastCont = activeElement.innerHTML;
                } else if (['<br data-mce-bogus="1">'].includes(activeElement.innerHTML) && this.props.element.type === 'openerelement') {
                    activeElement.innerHTML = '<p class="paragraphNumeroUno"><br></p>';
                } else {
                    lastCont = this.lastContent;
                }
                this.lastContent = activeElement.innerHTML;
                if (!isMediaElement && !activeElement.children.length && this.props?.asideData?.parentElementSubtype !== "tab" && this.props.element.type !== "citations" && this.props.element.type !== 'poetry' && this.props.element.type !== "element-blockfeature"|| (activeElement.children.length === 1 && activeElement.children[0].tagName === "BR" && activeElement.nodeName !== "CODE")) {
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
                if (activeElement.innerText.trim().length || activeElement.querySelectorAll('ol').length || activeElement.querySelectorAll('ul').length || isContainsMath || isContainsBlankLine) {
                    activeElement.classList.remove('place-holder')
                } else if ((this.props.element.type === 'figure' || this.props.element.type ==="element-aside") && config.figureFieldsPlaceholders.includes(this.props.placeholder)) {
                    activeElement.classList.remove('place-holder');
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
                            let codeParent = tinymce.$(`code[id="cypress-${this.props.index}"]`).children();
                            spanHandlers.handleFormattingTags(editor, this.props.elementId, 'code', codeParent, 'codeNoHighlightLine', this.gRange);
                        }
                    }
                }
                if (activeElement.nodeName == "DIV" && this.props.element.type === 'stanza') {
                    let key = e.keyCode || e.which;
                    if (key != undefined && key === 13) {
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
                else if (activeElement.nodeName == "DIV" && this.props.element.type === 'element-dialogue' && this.props.placeholder === "Enter Dialogue...") {
                    let key = e.keyCode || e.which;
                    if (key != undefined && key === 13) {
                        spanHandlers.addAndSplitSpan(editor, this.props.elementId, 'div', 'dialogueLine');
                    } else if (key != undefined && (key === 8 || key === 46)) {
                        spanHandlers.handleBackSpaceAndDeleteKyeUp(editor, key, 'dialogueLine');
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
            if (childNodes.length && childNodes.length <= 1) {
                this.setCursorOnCode(childNodes[childNodes.length - 1], editor);
            } else if(childNodes.length > 1 && childNodes[0]?.classList?.contains('figureCodeContent')){ // keyboard navigation for block code content
                this.setCursorOnCode(childNodes[childNodes.length - 2], editor);
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
            const currentSelection = tinymce?.activeEditor?.selection;
            const selectionNode = window.getSelection().anchorNode;
            const tinymceOffset = currentSelection.getRng().endOffset;
            const popupSlate = (this.props?.slateLevelData[config.slateManifestURN]?.type === "popup")
            if(this.props?.slateLevelData[config.slateManifestURN]?.status === 'approved' && !popupSlate && !config?.isCypressPlusEnabled){
                this.props.approvedSlatePopupStatus(true)
                e.preventDefault();
                e.stopPropagation();
                return false
            }
            /**
             * get node vs window selection node
             * window selection is accurate and gives 
             * inner most node as compared to currentSelecction.getNode()
             */
            moveCursor(e, selectionNode, tinymceOffset);
            /* xxxxxxxxxxxxxxxxx handling of only number values for resume case in autonumbering START xxxxxxxxxxxxxxxxxxx */
            if (this.props.isAutoNumberingEnabled && (autoNumberFigureTypesAllowed.includes(this.props?.element?.figuretype) || autoNumberContainerTypesAllowed.includes(this.props?.element?.type)) && autoNumberFieldsPlaceholders.includes(this.props?.placeholder) && this.props?.autoNumberOption?.entityUrn === this.props?.element?.contentUrn) {
                const keyCode = e.keyCode || e.which;
                const allowedKeys = [8, 37, 38, 39, 40, 46] // Keys for Arrows, Del, BkSpc
                const allowedFormattingKeys = [66, 73, 85] // keys for B,I,U
                const cutPasteKeys = [67,86,88] // add support for Cut/Copy/Paste Operations
                // Restrict limit to Numbers only in Number Field for Resume Number option
                if (this.props.placeholder === 'Number' && this.props?.autoNumberOption?.option === AUTO_NUMBER_SETTING_RESUME_NUMBER) {
                    if ((e.ctrlKey && (!cutPasteKeys.includes(keyCode)) || !e.ctrlKey && (keyCode == 86 || keyCode == 67 || keyCode == 88)) || e.shiftKey || ((keyCode < 48 || keyCode > 57) && (keyCode < 96 || keyCode > 105) && keyCode !== 86 && keyCode !== 38 && keyCode !== 40) && keyCode !== 8 && keyCode !== 37 && keyCode !== 39 && keyCode !== 46) {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                    // Restrict limit to 9 digits only in Number Field for Resume Number option
                    if ((tinymce?.activeEditor?.getContent()?.length + 1 > 9) && !(allowedKeys.includes(keyCode))) {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                    // Restrict first digit 0 in Number Field
                    if (tinymce?.activeEditor?.getContent()?.length < 1) {
                        if (!(e.ctrlKey || e.metaKey) && keyCode == 48) {
                            tinymce.dom.Event.cancel(e);
                        }
                    }
                }
                // disable keyboard events in Label & Number fields of Autonumbered Elements
                if ((e.ctrlKey || e.metaKey) && (allowedFormattingKeys.includes(keyCode))) {
                    tinymce.dom.Event.cancel(e);
                }
            }
            /* xxxxxxxxxxxxxxxxx handling of only number values for resume case in autonumbering STOP xxxxxxxxxxxxxxxxxxxx */

            /* xxxxxxxxxxxxxxxxx Prevent CTA button keyboard formatting START xxxxxxxxxxxxxxxxx */
            if (config.ctaButtonSmartlinkContexts.includes(this.props?.element?.figuredata?.interactivetype) && this.props?.className === "actionPU hyperLinkText" && this.props?.placeholder === "Enter Button Label") {
                const keyCode = e.keyCode || e.which;
                if ((e.ctrlKey || e.metaKey) && (keyCode === 73 || keyCode === 85 || keyCode === 66)) {
                    tinymce.dom.Event.cancel(e);
                }
            }
            /* xxxxxxxxxxxxxxxxx Prevent CTA button keyboard formatting STOP xxxxxxxxxxxxxxxxx */

            let newElement = this.props.currentElement ? this.props.currentElement : this.props.element
            let blockListData = checkBlockListElement(this.props, 'ENTER');
            if(blockListData && Object.keys(blockListData).length !== 0 && e.keyCode == 9){
                e.preventDefault();
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
            let isContainsBlankLine = activeElement.innerHTML.match(/<span/) ? activeElement.innerHTML.match(/<span/).input.includes('class="answerLineContent') : false;
            if (activeElement) {
                isContainsMath = activeElement.innerHTML.match(/<img/) ? (activeElement.innerHTML.match(/<img/).input.includes('class="Wirisformula') || activeElement.innerHTML.match(/<img/).input.includes('class="temp_Wirisformula')) : false;
                isContainsBlankLine = activeElement.innerHTML.match(/<span/) ? activeElement.innerHTML.match(/<span/).input.includes('class="answerLineContent') : false;
            }
            if (key === 13 && this.props.element.type !== 'element-list' && activeElement.nodeName !== "CODE" && this.props.element.type !== 'showhide' && this.props.element.type !== "stanza" && this.props.element.type !== "element-dialogue" && (blockListData && Object.keys(blockListData).length === 0)) {
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
                textPicker?.click();
            } 
            // else if (key === 13 && this.props.element.type === 'showhide' && this.props.showHideType != 'revel' && this.props.currentElement.type !== 'element-list') {
            //     this.props.createShowHideElement(this.props.showHideType, this.props.index, this.props.id);
            // }
            // else if ((this.props.element && this.props.element.type === 'showhide' && this.props.showHideType !== 'revel' && !editor.bodyElement.innerText.trim().length && e.keyCode === 8 && this.props.element.interactivedata) && ((this.props.showHideType === "show" && this.props.element.interactivedata.show.length > 1) || (this.props.showHideType === "hide" && this.props.element.interactivedata.hide.length > 1)) && !isContainsMath && !isContainsBlankLine) {
            //     this.props.deleteShowHideUnit(this.props.currentElement.id, this.props.showHideType, this.props.element.contentUrn, this.props.innerIndex, this.props.index, this.props.element.id)
            // }
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
                currentElement = tinymce.activeEditor.selection.getNode();
                let selectedClassName = tinymce.activeEditor.selection.getNode().className;
                let selecteNodeName = tinymce.activeEditor.selection.getNode().tagName;
                let currentElementNodes = [tinymce.activeEditor.selection.getNode().tagName];

                /* If only formatted text is present inside editor with custom formatting eg glossary, mark-index */
                if (childNodeTagsArr.includes(selecteNodeName.toLowerCase()) && !selectedClassName) {
                    while (!currentElement.className) {
                        currentElement = currentElement.parentNode;
                        selectedClassName = currentElement.className;
                        currentElementNodes.push(currentElement.tagName);
                    }
                }
                /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */

                if (allowedClassName.includes(selectedClassName.toLowerCase())) {
                    let offset = this.getOffSet(currentElement);
                    let textLength = currentElement.textContent.length;
                    if (textLength === offset || textLength === offset + 1) {
                        let elementTags = currentElementNodes.map(tag => tag.toLowerCase());
                        if (!currentElement.nextSibling || (currentElement.nextSibling && elementTags.includes('code'))) {
                            let parentNode = currentElement.parentNode;
                            let innerHtml = parentNode.innerHTML + '&#65279';
                            parentNode.innerHTML = innerHtml;
                            let childNodes = parentNode.childNodes;
                            editor.selection.setCursorLocation(parentNode.childNodes[childNodes.length - 1], 0);
                            if (elementTags.includes('code')) this.editorClick();
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

            // Block list events
            if (blockListData && Object.keys(blockListData).length) {
                const { index,asideData } = this.props;
                const getSelectedElement = document.getElementById(`cypress-${index}`);
                const originalIndex =index && typeof index === 'string' && index.includes('-') && index.split("-");
                // setting the placeholder when textcontent is cleared from element authored text to prevent placecholder overlapping on backspace delete
                if ((asideData?.parent && asideData?.parent.type === "showhide") || 
                (this.props?.parentElement?.type ==="element-aside" && this.props?.parentElement?.elementdata?.bodymatter[originalIndex[1]]?.contents?.bodymatter[originalIndex[2]]?.type === "manifestlist") || 
                (this.props?.parentElement?.type ==="groupedcontent" && this.props?.parentElement?.groupeddata?.bodymatter[originalIndex[1]]?.groupdata?.bodymatter[originalIndex[2]]?.type === "manifestlist")){
                    if (tinymce?.activeEditor?.selection?.getNode()?.textContent?.length === 2 && index.split("-").length===5) {
                        getSelectedElement.setAttribute('placeholder', 'Type Something');
                    }
                    if(tinymce?.activeEditor?.selection?.getNode()?.textContent?.length === 2 && index.split("-").length>5){
                        getSelectedElement.setAttribute('placeholder', 'Press Shift+Tab to move out');
                    }
                }else if( this.props?.parentElement?.type === "element-aside" && this.props?.parentElement?.elementdata?.bodymatter[originalIndex[1]]?.type === "manifestlist"){
                    if (tinymce?.activeEditor?.selection?.getNode()?.textContent?.length === 2 && index.split("-").length=== 4) {
                        getSelectedElement.setAttribute('placeholder', 'Type Something');
                    }
                    if(tinymce?.activeEditor?.selection?.getNode()?.textContent?.length === 2 && index.split("-").length>4){
                        getSelectedElement.setAttribute('placeholder', 'Press Shift+Tab to move out');
                    }
                }else if( this.props?.parentElement?.type === "groupedcontent" && this.props?.parentElement?.groupeddata?.bodymatter[originalIndex[1]]?.groupdata?.bodymatter[originalIndex[2]]?.type === "manifestlist"){
                    if (tinymce?.activeEditor?.selection?.getNode()?.textContent?.length === 2 && index.split("-").length=== 4) {
                        getSelectedElement.setAttribute('placeholder', 'Type Something');
                    }
                    if(tinymce?.activeEditor?.selection?.getNode()?.textContent?.length === 2 && index.split("-").length>4){
                        getSelectedElement.setAttribute('placeholder', 'Press Shift+Tab to move out');
                    }
                }else{
                    if (tinymce?.activeEditor?.selection?.getNode()?.textContent?.length === 2 && index.split("-").length===3) {
                        getSelectedElement.setAttribute('placeholder', 'Type Something');
                    }
                    if(tinymce?.activeEditor?.selection?.getNode()?.textContent?.length === 2 && index.split("-").length>3){
                        getSelectedElement.setAttribute('placeholder', 'Press Shift+Tab to move out');
                    }
                }
                // SHIFT + ENTER key press handling for BlockList element
                if (key === 13 && e.shiftKey) {
                    e.preventDefault();
                    blockListData = checkBlockListElement(this.props, "TAB");
                    if (blockListData && Object.keys(blockListData).length) {
                        const { parentData, indexToinsert } = blockListData;
                        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
                        this.props.createElement(TEXT, indexToinsert, { contentUrn: parentData.contentUrn }, this.props.asideData, null, null, null, null, { indexOrder: this.props.index, eventType: "TAB" });
                    }
                }
                else if (key === 13) {
                    // ENTER key press handling for BlockList element
                    if (blockListData && Object.keys(blockListData).length) {
                        const { parentData, indexToinsert } = blockListData;
                        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
                        this.props.createElement(MANIFEST_LIST_ITEM, indexToinsert, { contentUrn: parentData && parentData.contentUrn }, this.props.asideData, null, null, null, null, { indexOrder: this.props.index, eventType: "ENTER" });
                    }
                } else if (key === 9 && e.shiftKey) {
                    // SHIFT + TAB key press handling for BlockList element
                    e.preventDefault();
                    const { index } = this.props;
                    let parentElement = this.props?.asideData?.parent;
                    // restricting SHIFT + TAB operation on first level BL
                    if (index && typeof index === 'string' && index.includes('-') && index.split("-").length <= 3) return;
                    if (index && typeof index === 'string' && index.includes('-') && parentElement && parentElement.type === "showhide" && index.split("-").length <= 5) return;
                    if(index && typeof index === 'string' && index.includes('-') && this.props?.parentElement?.type ==="element-aside" && this.props?.parentElement?.elementdata?.bodymatter[originalIndex[1]]?.type === "manifestlist"  && index.split("-").length <= 4 ) return;
                    if(index && typeof index === 'string' && index.includes('-') && this.props?.parentElement?.type ==="element-aside" && this.props?.parentElement?.elementdata?.bodymatter[originalIndex[1]]?.contents?.bodymatter[originalIndex[2]]?.type === "manifestlist"  && index.split("-").length <= 5 ) return;
                    if(index && typeof index === 'string' && index.includes('-') && parentElement && parentElement.type === "groupedcontent" && this.props?.parentElement?.groupeddata?.bodymatter[originalIndex[1]]?.groupdata?.bodymatter[originalIndex[2]]?.type === "manifestlist" && index.split("-").length <= 5) return;
                    blockListData = checkBlockListElement(this.props, "SHIFT+TAB");
                    if (blockListData && Object.keys(blockListData).length) {
                        const { parentData, indexToinsert } = blockListData;
                        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
                        this.props.createElement(MANIFEST_LIST_ITEM, indexToinsert, { contentUrn: parentData?.contentUrn }, this.props.asideData, null, null, null, null, { indexOrder: this.props.index, eventType: "SHIFT+TAB" });
                    }
                } else {
                    // TAB key press handling for BlockList element
                    if (key === 9) {
                        e.preventDefault();
                        this.createNestedBlockList()
                    }
                }
                // This is the case for deleting element inside blocking when backspace pressed with no characters in it.
                // Please go through comments of every case for better understanding.
                if (key === 8 && tinymce?.activeEditor?.selection?.getNode()?.textContent?.length === 0) {
                    const { id, type } = this?.props?.element;
                    const blockListData = checkBlockListElement(this.props, "ENTER");
                    let manifestListItemData = checkBlockListElement(this.props, "TAB");
                    const { parentData } = manifestListItemData;
                    const { listdata } = blockListData?.parentData;
                    if (listdata?.bodymatter[0].id === parentData?.id) { // Case when user will press backspace on point 1 of manifestlist.
                        if (parentData?.listitemdata?.bodymatter?.length > 1 && parentData?.listitemdata?.bodymatter[0].id !== id) { // If it is not the only point insdie the block list then only delete it.
                            const deleteItemIndex = parentData?.listitemdata?.bodymatter.findIndex(listItem => listItem.id === id);
                            sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
                            this.props.deleteElement(id, type, { contentUrn: parentData?.contentUrn }, this.props.asideData, parentData?.contentUrn, deleteItemIndex, {}, {}, null);
                            getSelectedElement.setAttribute('placeholder', '');
                        }
                        if(parentData?.listitemdata?.bodymatter?.length > 1 && parentData?.listitemdata?.bodymatter[0].id === id && parentData?.listitemdata?.bodymatter[1].type === "element-authoredtext"){ // This case will delete the element only if the next element is a element authored text and it will ove the same next child to deleted position.
                            const deleteItemIndex = parentData?.listitemdata?.bodymatter.findIndex(listItem => listItem.id === id);
                            sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
                            this.props.deleteElement(id, type, { contentUrn: parentData?.contentUrn }, this.props.asideData, parentData?.contentUrn, deleteItemIndex, {}, {}, null);
                            getSelectedElement.setAttribute('placeholder', '');
                        }
                    }

                    if (listdata?.bodymatter?.length > 1 && listdata?.bodymatter[0].id !== parentData?.id) { // Case when user will press backspace on other than point 1 of manifestlist.
                        if (parentData?.listitemdata?.bodymatter?.length === 1) { // When there is only one element authored text in manifestlistitem then it will delete the manifestlistitem.
                            const deleteItemIndex = listdata?.bodymatter.findIndex(listData => listData.id === parentData?.id);
                            sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
                            this.props.deleteElement(parentData?.id, "manifestlistitem", { contentUrn: listdata?.contentUrn }, this.props.asideData, parentData?.contentUrn, deleteItemIndex, {}, {}, null);
                            getSelectedElement.setAttribute('placeholder', '');
                        } else if (parentData?.listitemdata?.bodymatter[0].id === id && parentData?.listitemdata?.bodymatter[1].type === 'manifestlist') {
                            store.dispatch({
                                type: MULTIPLE_LINE_POETRY_ERROR_POPUP,
                                payload: {
                                    show: true,
                                    message: ERROR_DELETING_MANIFEST_LIST_ITEM
                                }
                            });
                            return;
                        } else { //Deletes the text element in which backspace is pressed.
                            const deleteItemIndex = parentData?.listitemdata?.bodymatter.findIndex(listItem => listItem.id === id);
                            sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
                            this.props.deleteElement(id, type, { contentUrn: parentData?.contentUrn }, this.props.asideData, parentData?.contentUrn, deleteItemIndex, {}, {}, null);
                            getSelectedElement.setAttribute('placeholder', '');
                        }
                    }
                }
            }

            // Restrict max char limit of tab title (25 char)
            if (this.props?.element?.parentUrn?.subtype === ElementConstants.TAB) {
                const keyCode = e.keyCode || e.which;
                const allowedKeys = [8, 37, 38, 39, 40, 46] // Keys for Arrows, Del, BkSpc
                const cutPasteKeys = [67,86,88] // restrict Cut/Copy/Paste Operations
                if ((tinymce?.activeEditor?.targetElm?.innerText?.length + 1 > 25) && !(allowedKeys.includes(keyCode)) || (e.ctrlKey && (cutPasteKeys.includes(keyCode)))) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            }
        });
    }

    createNestedBlockList(){
        const {index,asideData, parentElement} = this.props
        if (!isNestingLimitReached(index, asideData, parentElement)) {
           let blockListData = checkBlockListElement(this.props, "TAB");
            if (blockListData && Object.keys(blockListData).length) {
                const { parentData, indexToinsert } = blockListData;
                sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
                this.props.createElement(MANIFEST_LIST, indexToinsert, { contentUrn: parentData?.contentUrn }, this.props.asideData, null, null, null, null, { indexOrder: this.props.index, eventType: "TAB" });
            }
        }
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
                let activeElement;
                if (editor.selection.getNode().nodeName === 'CODE' && self.props.element.type === 'stanza') {
                    let selectedNode = editor.selection.getNode();
                    let innerHTML = selectedNode.innerHTML;
                    selectedNode.outerHTML = innerHTML;
                }
                else {
                    let range = editor.selection.getRng();
                    activeElement = editor.dom.getParent(editor.selection.getStart(), '.cypress-editable');
                    editor.undoManager.transact(() => {
                        editor.formatter.toggle('custom_code');
                        if (activeElement.nodeName == "DIV" && self.props.element.type === 'stanza') {
                            let divParent = tinymce.$(`div[id="cypress-${self.props.index}"]`).children();
                            spanHandlers.handleFormattingTags(editor, self.props.elementId, 'div', divParent, 'poetryLine', range);
                        }
                    });
                }
                
                let node = editor.selection.getNode();
                let nodeName = node ? node.tagName.toLowerCase() : null;
                let selectContent = editor.selection.getContent();
                let parser = new DOMParser();
                let dataURI = null;
                let htmlDoc = parser.parseFromString(selectContent, 'text/html');
                let dfnTags = htmlDoc.getElementsByTagName('DFN');
                if ((nodeName && nodeName === 'dfn') || dfnTags.length || (nodeName && nodeName === 'em')) {
                    let dfnAttribute = [];
                    dataURI = node.getAttribute('data-uri');
                    if(nodeName==='em'){
                        dataURI = node.parentNode.getAttribute('data-uri');
                        dfnAttribute.push(dataURI)
                    }
                    if (nodeName && nodeName === 'dfn') {
                        dfnAttribute.push(dataURI);
                    } else {
                        for (let index = 0; index < dfnTags.length; index++) {
                            dfnAttribute.push(dfnTags[index].getAttribute('data-uri'));
                        }
                    }
                    for (let index = 0; index < dfnAttribute.length; index++) {
                        self.handleFormatting(activeElement, dfnAttribute[index], GLOSSARY, 'code');
                    }
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
     * Adds IndexEntry button to the toolbar
     * @param {*} editor  editor instance
     */
        addIndexEntryIcon = (editor) => {
            editor.ui.registry.addButton('IndexEntry', {
                id: 'buttonId',
                classes: 'buttonClas',
                icon: "marked-index",
                tooltip: "Open Print-Index",
                onAction: () => this.addMarkedIndex(editor),
                onSetup: (btnRef) => {
                    this.markedIndexBtnInstance = btnRef;
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
                    text: INSERT_SPECIAL_CHARACTER,
                    onAction: function () {
                        if(editor?.selection?.getContent()?.includes("non-breaking-space")) return false
                        tinymce.activeEditor.execCommand('mceShowCharmap');
                    },
                    onSetup: function() {
                        document.querySelector(`[title="${INSERT_SPECIAL_CHARACTER}"]`)?.classList?.add('add-padding')
                    }
                }
                ];
                let blankLineOption = {
                    type: 'menuitem',
                    text: INSERT_A_BLANK,
                    onAction: function () {
                        if(editor?.selection?.getContent()?.includes("non-breaking-space")) return false
                        editor.selection.setContent('<span contentEditable="false" id="blankLine" class="answerLineContent"><br></span>');
                        if (self.props.element && self.props.element.type === "element-list") {
                            const listLiText = document.querySelector('#' + tinymce.activeEditor.id + ' li') ? document.querySelector('#' + tinymce.activeEditor.id + ' li').innerText : "";
                            if (!listLiText.trim()) {
                                const blankLine = document.querySelector('#' + tinymce.activeEditor.id + ' span#blankLine');
                                tinyMCE.$('#' + tinymce.activeEditor.id + ' li').find('br').remove();
                                document.querySelector('#' + tinymce.activeEditor.id + ' li').append(blankLine);
                                blankLine.innerHTML = '<br>';
                                tinyMCE.$('#' + tinymce.activeEditor.id)[0].innerHTML = removeBOM(tinyMCE.$('#' + tinymce.activeEditor.id)[0].innerHTML);
                            }
                        } 
                        editor.targetElm.classList.remove('place-holder');
                    },
                    onSetup: function () {
                        document.querySelector(`[title="${INSERT_A_BLANK}"]`)?.classList?.add('add-padding')
                    }
                }
                if (self.props?.element?.type != 'figure' && self.props?.element?.type !== 'element-aside' && self.props?.element?.type !== 'openerelement') {
                    items.push(blankLineOption)
                }
                let nonBreakingOption = {
                    type: 'menuitem',
                    text: INSERT_NON_BREAKING_SPACE,
                    onAction: function () {
                        if (editor?.selection?.getNode()?.className?.includes('non-breaking-space') || (ALLOWED_FORMATTING_TOOLBAR_TAGS?.some(el => editor?.selection?.getContent()?.match(el)) && editor?.selection?.getContent()?.includes('class="non-breaking-space"'))) {
                            let selectedSpace = window?.getSelection()?.toString();
                            if (selectedSpace?.length) {
                                editor.insertContent(selectedSpace);
                            }
                        } else {
                            let selectedContent = editor?.selection?.getContent();
                            if (selectedContent.includes("non-breaking-space")) return false
                            if (selectedContent?.length === 1) {
                                selectedContent = "&nbsp;"
                            }
                            editor.selection.setContent(`<span contentEditable="false" class="non-breaking-space">${selectedContent}</span>`);
                        }
                    },
                    onSetup: function () {
                        document.querySelector(`[title="${INSERT_NON_BREAKING_SPACE}"]`)?.classList?.add('add-padding')
                        let activeSpace = tinymce?.activeEditor?.selection?.getNode()?.className;
                        let selectedText = window?.getSelection()?.toString();
                        selectedText = String(selectedText)?.replace(/</g, '&lt;')?.replace(/>/g, '&gt;');
                        if (selectedText?.trim() !== "" || selectedText?.length === 0) {
                            document.querySelector(`[title="${INSERT_NON_BREAKING_SPACE}"]`)?.classList?.add('disable-non-breaking')
                        } 
                        if (activeSpace === `non-breaking-space` || (ALLOWED_FORMATTING_TOOLBAR_TAGS?.some(el => editor?.selection?.getContent()?.match(el)) && editor?.selection?.getContent()?.includes('class="non-breaking-space"'))) {
                            let img = document.createElement("img");
                            img.src = checkmark;
                            document.querySelector(`[title="${INSERT_NON_BREAKING_SPACE}"]`)?.appendChild(img);
                            document.querySelector(`[title="${INSERT_NON_BREAKING_SPACE}"]`)?.classList?.add('enable-image')
                            document.querySelector(`[title="${INSERT_NON_BREAKING_SPACE}"]`)?.classList?.remove('add-padding')
                        }
                    }
                }
                if (NON_BREAKING_SPACE_SUPPORTED_ARRAY.includes(self.props?.element?.type) && self.props?.asideData?.type !== "manifestlist") {
                    items.push(nonBreakingOption)
                }
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
 
    /**
     * Adds Callout icon to the toolbar.
     * @param {*} editor  editor instance
     */
    setCalloutIcon = (editor) => {
        editor.ui.registry.addIcon(
            "calloutIcon",
            calloutMenuIcon
        );
    }


     /**
     * Adding button for Callout
     * @param {*} editor  editor instance
     */
      addCalloutIcon = editor => {
        const calloutsCount = 4;  // Count for dynamically creating callouts.
        const items = [];
        if ('element' in this.props && this.props?.element?.type) {
           for(let i=1;i<=calloutsCount;i++){
            items.push({
                type: 'togglemenuitem',
                text: `Callout option ${i}`,
                tooltip: `Callout option ${i}`,
                onAction: () => {
                    let selectedText = window.getSelection().toString();
                    if (!hasReviewerRole() && selectedText.length) {
                        this.setCalloutToSelection(editor,i-1,selectedText)
                    }
                },
                onSetup: function (api) {
                    let callouts=['One','Two','Three','Four']
                    let activeCallout = tinymce.activeEditor.selection.getNode().className;
                    if(activeCallout===`callout${callouts[i-1]}`){
                        api.setActive(true);
                    }
                    else{
                        api.setActive(false);
                    }
                }
            })
        }
     }    
        editor.ui.registry.addMenuButton("calloutIcon", {
            text: "",
            icon: "callouticon",
            tooltip: "Callout",
            fetch: cb => cb(items)
        });
    }

     /**
     * Setting callout to selected word/phrase.
     * @param {*} editor  editor instance
     * @param {*} selectedCalloutIndex callout option selected
     * @param {*} selected selected word/pharse
     */
    setCalloutToSelection(editor,selectedCalloutIndex,selected){
        if(selected.trim().length>0){
            let callouts=['One','Two','Three','Four']
            let selectedText = selected;
            const selectedCallout = `callout${callouts[selectedCalloutIndex]}`;
            let newCallOutID = ''
            let isSelected = tinymce.activeEditor.selection.getNode().className.includes('callout');
            if(!isSelected){
                newCallOutID= `callout:${Math.floor(1000 + Math.random() * 9000)}:${Math.floor(1000 + Math.random() * 9000)}`
            }
            else{
                let selection = window.getSelection().anchorNode.parentNode;
                newCallOutID = selection?.dataset?.calloutid ?? `callout:${Math.floor(1000 + Math.random() * 9000)}:${Math.floor(1000 + Math.random() * 9000)}` ;
            }
            let insertionText = `<span title="${selectedCallout}" class="${selectedCallout}" data-calloutid="${newCallOutID}">${selectedText}</span>`
            editor.insertContent(insertionText);
            sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
            setTimeout(() => {
                sendDataToIframe({ 'type': ShowLoader, 'message': { status: false } });
            }, 1000);
            this.saveContent();
        }
    }

    /**
     * Adds Alignment icon to the toolbar.
     * @param {*} editor  editor instance
     */

    setAlignmentIcon = editor => {
        editor.ui.registry.addIcon(
            "Alignment",
             alignment
        );
    }

    /**
     * Adding button for Alignment
     * @param {*} editor  editor instance
     */

    addAlignmentIcon = editor => {
        editor.ui.registry.addMenuButton("Alignment", {
            icon:'align-left',
            tooltip: "Text Alignment",
            fetch: function (callback) {
                var items = [{
                        text:'Left Align',
                        type: 'togglemenuitem',
                        icon: "action-next",
                        onAction: function () {
                            if(!tinymce.activeEditor.queryCommandState('JustifyLeft')){
                            tinymce.activeEditor.execCommand('JustifyLeft');
                            }
                        },
                        onSetup: function(api) {
                            api.setActive(tinymce.activeEditor.queryCommandState('JustifyLeft') || (!tinymce.activeEditor.queryCommandState('JustifyLeft') && !tinymce.activeEditor.queryCommandState('JustifyRight') && !tinymce.activeEditor.queryCommandState('JustifyCenter')))
                            return function() {};
                        }
                    },
                    {
                        text:'Center Align',
                        type: 'togglemenuitem',
                        icon: "align-center",
                        onAction: function () {
                            if(!tinymce.activeEditor.queryCommandState('JustifyCenter')){
                                tinymce.activeEditor.execCommand('JustifyCenter');
                            }
                        },
                        onSetup: function(api) {
                            api.setActive(tinymce.activeEditor.queryCommandState('JustifyCenter'));
                            return function() {};
                        }
                    },
                    {
                        text:'Right Align',
                        type: 'togglemenuitem',
                        icon: "align-right",
                        onAction: function () {
                            if(!tinymce.activeEditor.queryCommandState('JustifyRight')){
                                tinymce.activeEditor.execCommand('JustifyRight');
                            }
                        },
                        onSetup: function(api) {
                            api.setActive(tinymce.activeEditor.queryCommandState('JustifyRight'));
                            return function() {};
                        }
                    }
                ];
                callback(items);
            }
        });
    }

    /**
     * Adds Insert button to the toolbar for adding Media like Images.
     * @param {*} editor  editor instance
     */
    addInsertMediaButton = editor => {
        const self = this;
        editor.ui.registry.addMenuButton('insertMedia', {
            text: 'Insert',
            tooltip: 'insertMedia',
            onSetup: function () {
                document.querySelector('button[title="insertMedia"]').setAttribute('title', 'Insert Media');
                let newSpan = document.createElement('span');
                newSpan.className = "tooltip-text"
                newSpan.innerText = 'Insert';
                const tooltipLabel = document.querySelector('button[aria-label="insertMedia"] .tox-tbtn__select-label')
                if (tooltipLabel) {
                    tooltipLabel.after(newSpan)
                }
            },
            fetch: (callback) => {
                let params = {
                    element: self.props.element,
                    permissions: self.props.permissions,
                    editor: editor,
                    props:this.props
                }
                config.updateInlineImage = true
                self.props.saveInlineImageData(params)
                const items = insertMediaSelectors(params);
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
        editor.ui.registry.addIcon("align-left", alignleft);
        editor.ui.registry.addIcon("align-right", alignright);
        editor.ui.registry.addIcon("align-center", aligncenter);
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
        editor.ui.registry.addIcon("marked-index", markedIndex);
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
     * Add IndexEntry Icon Icon icon to the toolbar.
     * @param {*} editor  editor instance
     */
      setMarkedIndexIcon = editor => {
        editor.ui.registry.addIcon(
            "IndexEntry",
            markedIndex
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
        switch (element?.type) {
            case "element-authoredtext":
                if (element.elementdata.headers)
                    return `Heading ${element.elementdata.headers[0].level}`
                else if(element?.elementdata?.designtype === 'handwritingstyle')
                    return 'Handwriting'
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
            //restrict paste when user is reviewer or subscriber
            if(hasReviewerRole()){
                e.preventDefault();
            }
            if (this.props.isAutoNumberingEnabled && (autoNumberFigureTypesAllowed.includes(this.props?.element?.figuretype) || autoNumberContainerTypesAllowed.includes(this.props?.element?.type)) && this.props?.placeholder === 'Number' && this.props?.labelNumberSetting === AUTO_NUMBER_SETTING_RESUME_NUMBER) {
                const currentValue = e.clipboardData.getData('Text');
                const isNum = /^[1-9][0-9]*$/.test(currentValue);
                let isValidPaste = true
                const currentContent = editor?.getContent() ?? ''
                /* Paste Valid Content in Number Field for Resume Number Case */
                if (currentValue?.length > 9 || currentContent?.length > 8 || !(currentContent?.length < 9 && currentContent.length + currentValue.length < 10)) {
                    isValidPaste = false
                }
                if (!isNum || (isNum && !isValidPaste)) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            }

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
            } 
            //else if (this.props.element && this.props.element.type === "element-blockfeature") {
            //     let text = e.clipboardData.getData("text/plain");
            //     text = String(text).replace(/&/g, '&amp;');
            //     text = String(text).replace(/</g, '&lt;').replace(/>/g, '&gt;');
            //     text = text + '<em id="BQposition"></em>';
            //     this.copyContent = text;
            // }
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
        // if (this.props.element && this.props.element.type === "element-blockfeature") {
        //     args.content = this.copyContent;
        //     this.copyContent = '';
        //     return;
        // }
        if (this.props.element && this.props.element.type && this.props.element.type === 'element-list') {
            args.content = args.content.replace(/<ul>.*?<\/ul>/g, "")
        }
        let testElement = document.createElement('div');
        testElement.innerHTML = args.content;
        if (testElement.innerText.trim().length) {
                args.content = handleTextToRetainFormatting(args.content, testElement, this.props)
        } else if(ALLOWED_ELEMENT_IMG_PASTE.includes(this.props?.element?.type) && args.content.match('class="imageAssetContent"')) {
            args.content = handleTextToRetainFormatting(args.content,testElement,this.props)

        } else{
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
        // else if (this.props.element && this.props.element.type === "element-blockfeature") {
        //     let self = this;
        //     setTimeout(() => { self.makeBqReplace(); }, 0);
        // }
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
        if (positionElement) {
        tinymce.activeEditor.selection.setCursorLocation(positionElement, 0);
        positionElement.remove();
        tinymce.activeEditor.undoManager.clear();
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
        const { isBlockList} = this.props
        if(!isBlockList){
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
        }
        if (isBlockList) {
            content = content.replace(/40px\b/, "0px");
            setTimeout(() => {
                this.createNestedBlockList();
            }, 200);
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
            let newParentInnerHtml = parentInnerHtml?.replace(existingInnerHTML, innerHtml);
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
            } else if (indexesLen === 3) {
                switch (tempIndex[2]) {
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
            } else if (indexesLen === 4) {
                switch (tempIndex[3]) {
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
            } else if (indexesLen === 5) {
                switch (tempIndex[4]) {
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

    // Handle formatting for markedIndex and glossary
    handleFormatting = (activeElement, dataURIId, term = GLOSSARY, styleTag) => {
        let tag = (term === MARKEDINDEX) ? "span" : "dfn";
        let dfn = activeElement.querySelector(`${tag}[data-uri="${dataURIId}"]`);
        let subTag = dfn.closest(`${styleTag}`);
        if (subTag) {
            dfn.innerHTML = `<${styleTag}>` + dfn.innerHTML + `</${styleTag}>`
            if (subTag.textContent === dfn.textContent) {
                let innerHTML = subTag.innerHTML;
                subTag.outerHTML = innerHTML;
            } else {
                spanHandlers.splitOnTag(subTag.parentNode, dfn);
            }
        }
    }

    /**
     * Called when markedIndex button is clicked. Responsible for adding indexEntry
     * @param {*} editor  editor instance 
     */
     addMarkedIndex = (editor) => {
        let elementId = this.props.elementId;
        let sText = editor.selection.getContent();
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(sText, 'text/html');
        let selectedText = window.getSelection().toString()
        selectedText = String(selectedText).replace(/</g, '&lt;').replace(/>/g, '&gt;');
        this.markIndexText = selectedText;
        let activeElement = editor.dom.getParent(editor.selection.getStart(), '.cypress-editable');
        let selectedNodeText = editor.selection.getNode().textContent;
        if (selectedText.trim() === "") {
            return false
        }
        config.isCreateGlossary = true
        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
        getGlossaryFootnoteId(elementId, "MARKEDINDEX", res => {
            let insertionText = ""
            if (selectedText !== selectedNodeText) {
                let stylesHTML = tinymce.activeEditor.selection.getEnd();
                if (stylesHTML.tagName && validStylesTagList.indexOf(stylesHTML.tagName.toLowerCase()) > -1 && stylesHTML.textContent === selectedText) {
                    selectedText = getSelectionTextWithFormatting(stylesHTML);
                }
            }
            if (res.data && res.data.id) {
                insertionText = `<span data-uri=${res.data.id} class="markedForIndex">${selectedText}</span>`
            }
            editor.selection.setContent(insertionText);
            //Start of code to move styling inside span tag
            const dataURINode = activeElement.querySelector(`span[data-uri="${res.data.id}"]`);
            const stylingOrderList = findStylingOrder(dataURINode);
            stylingOrderList.forEach((styleTag) => {
                this.handleFormatting(activeElement, res.data.id, MARKEDINDEX, styleTag);
            })
            //End of code to move styling inside span tag
            this.toggleMarkedIndexPopup(true, 'Markedindex', res.data && res.data.id || null, () => { this.toggleMarkedIndexIcon(true); }, true);
            this.saveMarkedIndexContent()
        })
    }

    /**
     * Called when glossary button is clicked. Responsible for adding glossary
     * @param {*} editor  editor instance 
     */
    addGlossary = (editor) => {
        let elementId = this.props.elementId;
        if (this.props.element.type === "element-dialogue") {
            elementId = this.props.element.id;
        }
        config.glossaryCreated = true
        let sText = editor.selection.getContent();
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(sText, 'text/html');
        let spans = htmlDoc.getElementsByClassName("poetryLine");
        let activeElement = editor.dom.getParent(editor.selection.getStart(), '.cypress-editable');
        let selectedNodeText = editor.selection.getNode().textContent;
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
        // this.glossaryTermText = selectedText;
        if (selectedText.trim() === "") {
            return false
        }
        config.isCreateGlossary = true
        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
        getGlossaryFootnoteId(elementId, "GLOSSARY", res => {
            let insertionText = ""
            if (selectedText !== selectedNodeText) {
                let stylesHTML = tinymce.activeEditor.selection.getEnd();
                if (stylesHTML.tagName && validStylesTagList.indexOf(stylesHTML.tagName.toLowerCase()) > -1 && stylesHTML.textContent === selectedText) {
                    selectedText = getSelectionTextWithFormatting(stylesHTML);
                }
            }
            if (res.data && res.data.id) {
                insertionText = `<dfn data-uri= ${res.data.id} class="Pearson-Component GlossaryTerm">${selectedText}</dfn>`
            }
            editor.selection.setContent(insertionText);
            //Start of code to move styling inside dfn tag
            const dataURINode = activeElement.querySelector(`dfn[data-uri="${res.data.id}"]`);
            const stylingOrderList = findStylingOrder(dataURINode);
            stylingOrderList.forEach((styleTag) => {
                this.handleFormatting(activeElement, res.data.id, GLOSSARY, styleTag);
            })
            //End of code to move styling inside dfn tag
            let dfn = activeElement.querySelector(`dfn[data-uri="${res.data.id}"]`);
            // this.glossaryTermText = dfn.innerHTML
            this.glossaryTermText = `<p>${dfn.innerHTML}</p>` || "<p></p>"
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
        let term = glossaryTermText;
        let definition = null;
        let blockfeatureType = this.props?.element?.elementdata?.type === "pullquote" ? this.props?.element?.elementdata?.type : ''
        // commented after allowing flow of formatting tags from canvas to glossary term
        // let termText = glossaryTermText.replace(/^(\ |&nbsp;|&#160;)+|(\ |&nbsp;|&#160;)+$/g, '&nbsp;'); 
        definition = document.querySelector('#glossary-editor-attacher > div > p') && `<p>${document.querySelector('#glossary-editor-attacher > div > p').innerHTML}</p>` || "<p><br/></p>"
        term = term?.replace(/<br data-mce-bogus="1">/g, "")
        definition = definition?.replace(/<br data-mce-bogus="1">/g, "")
        customEvent.subscribe('glossaryFootnoteSave', (elementWorkId) => {
            saveGlossaryAndFootnote(elementWorkId, elementType, glossaryfootnoteid, type, term, definition, elementSubType, typeWithPopup, blockfeatureType, poetryField)
            customEvent.unsubscribe('glossaryFootnoteSave');
        })
        this.handleBlur(null, true); //element saving before creating G/F (as per java team)
        //this.handleBlur(null, true);
    }


     /**
     * Saves MarkedIndexContent on creation
     */
      saveMarkedIndexContent = () => {
        const { markedIndexValue, poetryField } = this.props;
        let { elementType, markIndexid, type, elementSubType, markIndexText } = markedIndexValue;
        let typeWithPopup = this.props.element ? this.props.element.type : "";
        let firstLevelEntry = null;
        let secondLevelEntry = null;
        let firstLevelEntryText = markIndexText;//.replace(/^(\ |&nbsp;|&#160;)+|(\ |&nbsp;|&#160;)+$/g, '&nbsp;');
        // term = document.querySelector('#glossary-editor > div > p') && `<p>${document.querySelector('#glossary-editor > div > p').innerHTML}</p>` || "<p></p>"
        firstLevelEntry = `<p>${firstLevelEntryText}</p>` || "<p></p>"
        secondLevelEntry = document.querySelector('#index-secondlevel-attacher > div > p') && `<p>${document.querySelector('#index-secondlevel-attacher > div > p').innerHTML}</p>` || "<p><br/></p>"
        firstLevelEntry = firstLevelEntry.replace(/<br data-mce-bogus="1">/g, "")
        secondLevelEntry = secondLevelEntry.replace(/<br data-mce-bogus="1">/g, "")
        customEvent.subscribe('markedIndexSave', (elementWorkId) => {
            saveGlossaryAndFootnote(elementWorkId, elementType, markIndexid, type, firstLevelEntry, secondLevelEntry, elementSubType, typeWithPopup, poetryField)
            customEvent.unsubscribe('markedIndexSave');
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
                selectedText = '<' + selectedTag.toLocaleLowerCase() + '>' + selectedText + '</' + selectedTag.toLocaleLowerCase() + '>';
                selection = selection.parentNode;
                selectedTag = selection.nodeName;
                selectedTagClass = selection.classList;
            } else {
                parentNode = false;
            }
        } while (parentNode);

        let insertionText = '<span id="asset-popover-attacher">' + selectedText + '</span>';
        editor.selection.setContent(insertionText);
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
                    let activeElementNode = document.getElementById(activeElementObj.join("-"))
                    if (activeElementNode && tinymce.activeEditor.id == activeElementObj.join("-")) {
                        activeElementNode.innerHTML = tempContainerHtml;
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
     * function to remove tinymce editors
     */
    removeTinymceEditors = () => {
        for (let i = tinymce?.editors?.length - 1; i > -1; i--) {
            let ed_id = tinymce?.editors[i]?.id;
            tinymce.remove(`#${ed_id}`)
        }
    }

    /**
     * React's lifecycle method. Called immediately after a component is mounted. Setting state here will trigger re-rendering. 
     */
    componentDidMount() {
        // const { spellCheckToggle } = this.props;
        // removing the tinymce editors when spellcheck toggle is turned off to prevent incorrect text highlighting
        // if (!spellCheckToggle) this.removeTinymceEditors();
        
        document.addEventListener("visibilitychange", () => {
            /* On switching the application window restore the caret position to its original position */
            window.onfocus = window.onblur = window.onpageshow = window.onpagehide = ((e) => {
                if ({focus:1, pageshow:1}[e.type]) {
                    tinymce.activeEditor?.selection?.moveToBookmark(this.props?.caretPosition);
                } 
            });
        });

        let currentNode = document.getElementById('cypress-' + this.props.index);
        if (currentNode && currentNode.getElementsByTagName("IMG").length) {
            currentNode.innerHTML = this.getNodeContent(currentNode);
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
                            const elementID = this.editorRef?.current?.id ? this.editorRef.current.id : config.editorRefID;
                            document.getElementById(elementID).click();
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

                if(newElement && currentNode && currentNode.className && currentNode.className.includes('opener-title')){
                    currentNode.classList.add('opener-caret')
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
                }).catch((err) => console.log(err))
            }
        }
    }
    getNodeContent = (node) => {
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
                    let bgModel=removeImageCache(node.innerHTML)
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
                defModel = removeMathmlImageCache(defModel)
                if(this.props.element.type==="element-list"){
                   defModel = checkForDataIdAttribute(defModel)
                }
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
            if (testElem.innerText || isContainsMath || isContainsBlankLine) {
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
        } else if (this.props?.element && (this.props?.element?.type === 'figure'|| this.props?.element?.type === "element-aside") && config.figureFieldsPlaceholders.includes(this.props.placeholder)) {
            this.placeHolderClass = '';
        } else {
            let testElem = document.createElement('div');
            testElem.innerHTML = this.props.model;
            let isContainsMath = testElem.innerHTML.match(/<img/) ? (testElem.innerHTML.match(/<img/).input.includes('class="Wirisformula') || testElem.innerHTML.match(/<img/).input.includes('class="temp_Wirisformula')) : false;
            const isContainsBlankLine = testElem.innerHTML.match(/<span/) ? testElem.innerHTML.match(/<span/).input.includes('class="answerLineContent') : false;
            if (!testElem?.innerText?.trim()) {
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
        const { elementId, alfrescoElementId, alfrescoEditor, alfrescoAssetData, launchAlfrescoPopup, isInlineEditor, imageArgs} = this.props
        if (this.elementConverted || prevProps?.element?.subtype !== this.props?.element?.subtype) {
            let elementTypeNode = document.querySelector('button[aria-label="formatSelector"] .tox-tbtn__select-label');
            if (elementTypeNode) {
                elementTypeNode.innerText = this.getElementTypeForToolbar(this.props.element);
            }
            /* tooltip code for text elements in toolbar */
            const tooltipText = document.querySelector('button[aria-label="formatSelector"] .tooltip-text')
            if (tooltipText) {
                tooltipText.innerText = this.getElementTypeForToolbar(this.props.element);
            }
            if ((this.props?.element && this.props?.element?.type === "element-list") || (this.props?.currentElement && this.props?.currentElement?.type === "element-list")) {
                highlightListIcon(this.props);
            }
            this.elementConverted = false;
        }
        this.removeMultiTinyInstance();
        this.handlePlaceholder()
         if (elementId === alfrescoElementId && prevProps.alfrescoElementId !== alfrescoElementId && !launchAlfrescoPopup && isInlineEditor) {
            dataFromAlfresco(alfrescoAssetData, alfrescoEditor, imageArgs)
        }
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
         document.removeEventListener("visibilitychange", () => { this.props?.saveCaretPosition('') });
        for (let i = tinymce.editors.length - 1; i > -1; i--) {
            let ed_id = tinymce.editors[i].id;
            if (!(ed_id.includes('glossary') || ed_id.includes('footnote') || (this.props.element && this.props.element.type && this.props.element.type === "figure" && this.props.element.figuretype !== "interactive" && !(tinymce.activeEditor?.targetElm?.className?.includes("figureLabel"))))) {
                removeTinyDefaultAttribute(tinymce.activeEditor.targetElm)
                tinymce.remove(`#${ed_id}`)
                tinymce.$('.wrs_modal_desktop').remove();
            }
        }
    }

    setFigureToolbar = (placeholder) => {
        let toolbar;
        switch (placeholder) {
            case "Number":
                if (this.props.isAutoNumberingEnabled && autoNumberFigureTypesAllowed.includes(this.props?.element?.figuretype)) {
                    toolbar =  (this.props?.labelNumberSetting === AUTO_NUMBER_SETTING_OVERRIDE_NUMBER || this.props?.labelNumberSetting === AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER ) ? config.labelToolbarAutonumberMode : config.numberToolbarAutonumberMode;
                } else {
                    toolbar = config.figureNumberToolbar;
                }
                break;
            case "Label":
            case "Label Name":
                toolbar = (this.props.isAutoNumberingEnabled && autoNumberFigureTypesAllowed.includes(this.props?.element?.figuretype)) ? config.labelToolbarAutonumberMode : config.figureImageLabelToolbar;
                break;
            case "Title":
            case "Caption":
            case "Credit":
            case "Math Block Content":
                toolbar = config.figurImageCommonToolbar;
                break;
            case "Code Block Content":
                toolbar = this.setCodeBlockContentToolbar();
                break;
            case "Enter Button Label":
                toolbar = config.smartlinkActionButtonToolbar;
        }
        return toolbar;
    }

    setAsideNumberingToolbar = (placeholder) => {
        let toolbar;
        let isAutoNumberingEnabled = this.props.isAutoNumberingEnabled;
        switch (placeholder) {
            case "Number":
                toolbar = isAutoNumberingEnabled ? config.numberToolbarAutonumberMode : config.AsideNumber;
                break;
            case "Label":
            case "Label Name":
                toolbar = isAutoNumberingEnabled ? config.labelToolbarAutonumberMode : config.AsideLabel;
                break;
            case "Title":
                toolbar = config.AsideTitle;
        }
        return toolbar;
    }

    setCodeBlockContentToolbar = () => {
        let toolbar;
        let syntaxEnabled = document.querySelector('.panel_syntax_highlighting .switch input');
        if (syntaxEnabled && syntaxEnabled.checked) {
            toolbar = config.codeListingToolbarDisabled;
        }
        else {
            toolbar = config.codeListingToolbarEnabled;
        }
        return toolbar;
    }

    setInstanceToolbar = () => {
        let toolbar = [];
        let figureTypes = ['image', 'table', 'mathImage', 'audio', 'video', 'tableasmarkup', 'authoredtext', 'codelisting'];
        let blockListData = checkBlockListElement(this.props, "TAB");
        if (this.props?.element?.type === 'popup' && this.props.placeholder === 'Enter call to action...') {
            toolbar = config.popupCallToActionToolbar
        } else if ((this.props?.element?.type === 'figure' && figureTypes.includes(this.props?.element?.figuretype)) || (this.props?.element?.figuretype === 'interactive' && config.smartlinkContexts.includes(this.props.element?.figuredata?.interactivetype))) {
            toolbar = this.setFigureToolbar(this.props.placeholder);
        }else if(this.props?.element?.type === 'element-aside'){
            toolbar = this.setAsideNumberingToolbar(this.props.placeholder);
        } else if (this.props?.element?.type === 'figure' && this.props.placeholder === "Enter Number...") {
            toolbar = config.figureNumberToolbar;
        }
        else if (["Enter Label...", "Enter call to action..."].includes(this.props.placeholder) || (this.props.element && this.props.element.subtype == 'mathml' && this.props.placeholder === "Type something...")) {
            toolbar = (this.props.element && (this.props.element.type === 'poetry' || this.props.element.type === 'popup' || this.props.placeholder === 'Enter call to action...' )) ? config.poetryLabelToolbar : config.labelToolbar;
        }
        else if (this.props.placeholder === "Enter Caption..." || this.props.placeholder === "Enter Credit...") {
                toolbar = (this.props.element && this.props.element.type === 'poetry') ? config.poetryCaptionToolbar : config.captionToolbar;
        } else if(this.props?.element?.type === 'openerelement'){
            toolbar = config.openerElementToolbar
        }
        // else if (this.props.placeholder === "Code Block Content") {
        //     toolbar = this.setCodeBlockContentToolbar()
        // }
        // else if (this.props.placeholder === "Enter Show text" || (this.props.placeholder === "Enter Hide text")) {
        //     toolbar = config.showHideToolbar
        // } 
        else if (this.props?.showHideType &&( this.props.showHideType == 'revel' || this.props.showHideType == "postertextobject")) {
            toolbar = config.revelToolbar
        } else if (this.props.placeholder == "Type Something..." && this.props.element && this.props.element.type == 'stanza') {
            toolbar = config.poetryStanzaToolbar;
        }
        else if (this.props?.asideData?.type === "manifestlist") {
            toolbar = config.blockListToolbar
        }
        else {
            toolbar = config.elementToolbar;
        }
        if (this.props?.element?.type === "element-dialogue") {
            switch(this.props.placeholder){
                case "Enter Act Title...": 
                case "Enter Scene Title...": 
                case "Enter Credit...": { 
                    toolbar = [...config.playScriptToolbar, 'glossary'];
                    break;
                }
                case "Enter Dialogue...": {
                    toolbar = [...config.playScriptToolbar, 'mathml', 'chemml', 'inlinecode'];
                    break;
                }
                case "Enter Stage Directions...": {
                    toolbar = [...config.playScriptToolbar, 'italic', 'mathml', 'chemml', 'inlinecode'];
                    break;
                }
                case "Enter Character Name...": {
                        toolbar = [...config.playScriptToolbar, 'bold', 'mathml', 'chemml', 'inlinecode'];
                    break;
                }
                default: break;
            }
        }
        if(this.props?.element?.parentUrn?.subtype === ElementConstants.TAB){
            toolbar = config.tabTitleToolbar;
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
        return 
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
        clickedX = e.clientX;
        clickedY = e.clientY;
        setTimeout(this.removeMultiTinyInstance, 0)

        /*
            Adding br tag in lists because on first conversion from p tag to list, br tag gets removed
        */
        let tinymceActiveEditorNode = document.getElementById(tinymce.activeEditor && tinymce.activeEditor.id);
        const authStore = store.getState();
        const {projectInfo} = authStore;
        let isSubscriber = isSubscriberRole(projectInfo?.projectSharingRole, projectInfo?.projectSubscriptionDetails?.isSubscribed);
        if (this.props.permissions && !((this.props.permissions.includes('access_formatting_bar') || this.props.permissions.includes('elements_add_remove')) && !isSubscriber)) {        // when user doesn't have edit permission
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
        
        let currentElementId = this.props?.currentElement && currentTarget && currentTarget.getAttribute('data-id') ? this.props?.currentElement?.id : this.props?.element?.id
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
           const activeElementInnerHTML = activeEditorId && document.getElementById(activeEditorId)?.innerHTML;
           const curretnTargetInnerHTML = currentTarget?.id && document.getElementById(currentTarget.id).innerHTML;
                if (!isSameTargetBasedOnDataId || !isSameByElementId) {
                    let elementContainerNodes = document.querySelectorAll('.element-container[data-id="' + previousTargetId + '"] .cypress-editable')
                    if (elementContainerNodes.length)
                        elementContainerNodes[0].innerHTML = tempContainerHtml;
                    document.querySelectorAll('.element-container[data-id="' + currentTargetId + '"] .cypress-editable')[0].innerHTML = tempNewContainerHtml;
                }
                else if (activeElementInnerHTML && curretnTargetInnerHTML && tempContainerHtml && tempNewContainerHtml) {
                    document.getElementById(activeEditorId).innerHTML = tempContainerHtml;
                    document.getElementById(currentTarget.id).innerHTML = tempNewContainerHtml;
                }
        }

        if(isSameByElementId && e.target && (e.target.className && e.target.className.includes('opener-title') || e.target.parentNode && e.target.parentNode.className && e.target.parentNode.className.includes('opener-title'))) {
            (e.target.classList.remove('opener-caret') || e.target.parentNode.classList.remove('opener-caret'))
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
                    let tinymceEditorNode = document.getElementById(tinymce.editors[i].id);
                    const tinymceEditorNodeInnerHTML = tinymceEditorNode?.innerHTML
                    if (tinymceEditorNodeInnerHTML && tempFirstContainerHtml ) {
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
            if (activeEditorNode && !hasReviewerRole) {
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
                    if ('type' in this.props.element && (this.props.element.type === "figure" || this.props.element.type ==="element-aside") && termText.search(/^(<.*>(<br.*>)<\/.*>)+$/g) < 0 &&
                        (newCurrentTargetNode.html()).search(/^(<br.*>)+$/g) >= 0) {
                        termText = newCurrentTargetNode.html();
                    }

                    /* Reverting data-temp-mathml to data-mathml and class Wirisformula to temp_WirisFormula */
                    termText = termText.replace(/data-temp-mathml/g, 'data-mathml').replace(/temp_Wirisformula/g, 'Wirisformula');
                    document.getElementById(currentTarget.id).innerHTML = termText
                }
                //---------------------------------------------------------------------------------//
                // if editor contains footnode in the text anywhere then check the condition and if 
                // footnode lies in the end then remove the superscript mode from the end of text.
                if (tinymce.activeEditor?.selection?.getContent() === "") { // if user is not selecting any text on the editor
                    let activeNode = tinymce.activeEditor.selection.getNode()
                    if (tinymce.activeEditor.getContent()?.indexOf("<sup>") > -1 && activeNode?.nodeName === 'A' && activeNode?.parentNode?.nodeName === 'SUP') {
                        this.removeSupFormat(clickedX, clickedY);
                    }
                    else if (tinymce.activeEditor.getContent()?.indexOf("<sup>") > -1) {
                        let cursorNode = document.elementFromPoint(clickedX, clickedY);
                        let selectNode = '';
                        if (cursorNode?.nodeName === 'A') {
                            selectNode = cursorNode
                            tinymce.activeEditor.selection.select(selectNode);
                            this.removeSupFormat(clickedX, clickedY);
                        } else if (cursorNode?.nodeName === 'SUP' && cursorNode?.childNodes?.length && cursorNode?.childNodes[0]?.nodeName === 'A') {
                            selectNode = cursorNode.childNodes[0]
                            tinymce.activeEditor.selection.select(selectNode);
                            this.removeSupFormat(clickedX, clickedY);
                        } 
                        /**else if (parentNodeName.indexOf(cursorNode?.nodeName?.toUpperCase()) > -1 && this.activeGlossaryFootnoteId) {
                            let footnoteAnchorNode = cursorNode.querySelector(`a[data-uri="${this.activeGlossaryFootnoteId}"]`)
                            if (footnoteAnchorNode) {
                              tinymce.activeEditor.selection.select(footnoteAnchorNode);
                              this.removeSupFormat(clickedX, clickedY);
                            }
                        }*/
                    }
                    if (this.props?.element?.type === 'element-blockfeature') {
                        if (activeNode && (activeNode.className === 'blockquoteTextCredit' || activeNode.className.includes('blockquoteTextCredit'))) {
                            setFormattingToolbar('disableTinymceToolbar')
                        }
                    }
                }

                //---------------------------------------------------------------------------------//
                if (clickedX !== 0 && clickedY !== 0) {     //User generated click event
                    tinymce.activeEditor.selection.placeCaretAt(clickedX, clickedY) //Placing exact cursor position on clicking.
                }
                else {                                      //Programmatic click event. Placing cursor at the end
                    tinymce.activeEditor.selection.select(tinymce.activeEditor.getBody(), true);
                    tinymce.activeEditor.selection.collapse(false);
                    this.handleCodeClick(tinymce.activeEditor, true);
                }
                //tinymce.$('.blockquote-editor').attr('contenteditable', false)
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
            }).catch((err) => console.log(err));
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

                //---------------------------------------------------------------------------------//
                // if editor contains footnode in the text anywhere then check the condition and if 
                // footnode lies in the end then remove the superscript mode from the end of text.

                if (tinymce.activeEditor?.selection?.getContent() === "") { // if user is not selecting any text on the editor
                    let activeNode = tinymce.activeEditor.selection.getNode()
                    if (tinymce.activeEditor.getContent()?.indexOf("<sup>") > -1 && activeNode?.nodeName === 'A' && activeNode?.parentNode?.nodeName === 'SUP') {
                        this.removeSupFormat(clickedX, clickedY);
                    }
                    else if (tinymce.activeEditor.getContent()?.indexOf("<sup>") > -1) {
                        let cursorNode = document.elementFromPoint(clickedX, clickedY);
                        let selectNode = '';
                        const parentNodeName = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'DIV', 'HEADER']
                        if (cursorNode?.nodeName === 'A') {
                            selectNode = cursorNode
                            tinymce.activeEditor.selection.select(selectNode);
                            this.removeSupFormat(clickedX, clickedY);
                        } else if (cursorNode?.nodeName === 'SUP' && cursorNode?.childNodes?.length && cursorNode?.childNodes[0]?.nodeName === 'A') {
                            selectNode = cursorNode.childNodes[0]
                            tinymce.activeEditor.selection.select(selectNode);
                            this.removeSupFormat(clickedX, clickedY);
                        } else if (parentNodeName.indexOf(cursorNode?.nodeName?.toUpperCase()) > -1 && this.activeGlossaryFootnoteId) {
                            let footnoteAnchorNode = cursorNode.querySelector(`a[data-uri="${this.activeGlossaryFootnoteId}"]`)
                            if (footnoteAnchorNode) {
                                tinymce.activeEditor?.selection?.select(footnoteAnchorNode);
                                this.removeSupFormat(clickedX, clickedY);
                            }
                        }
                    }
                }

                //---------------------------------------------------------------------------------//


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
            }).catch((err) => console.log(err));
        });
        if (isSameTarget) {
            this.editorOnClick(event);
        }
        tinyMCE.$('.cypress-editable').css('caret-color', 'black')
    }

    /**
     * removeSupFormat | gets triggered when any editor element contains footnode
     * @param {*} clickedX  x cords of mouse clicking
     * @param {*} clickedY  y cords of mouse clicking
     */
    removeSupFormat = (clickedX1, clickedY1) => {
        let selectedElement;
        // We are checking event in below condition because on handle click event when tiny mce editor 
        // init then it selects div element of editor, so we need to find its child anchor or sup element.
        selectedElement = tinymce.activeEditor.selection.getNode();
        // Below if condition works only when editor has no text and contains only footnote star
        if (selectedElement?.tagName?.toLowerCase() === "p") {
            selectedElement = selectedElement.firstChild;
        }
        let parentNode = selectedElement.parentNode;
        let endPosition = true;
        if (selectedElement?.tagName?.toLowerCase() === 'a') {
            let bomPosition = selectedElement.innerHTML.lastIndexOf("﻿");
            if (bomPosition === 0) {
                endPosition = false;
            }
            selectedElement = selectedElement?.parentNode;
            parentNode = selectedElement?.parentNode;
        } else {
            let childNodes = selectedElement.childNodes;
            if (childNodes.length && childNodes[0].nodeType === Node.TEXT_NODE) {
                endPosition = false;
            }
        }
        parentNode.innerHTML = removeBOM(parentNode.innerHTML);
        let existingInnerHTML = '<sup>' + removeBOM(selectedElement.innerHTML) + '</sup>';
        let innerHtml = existingInnerHTML + "<span id='_mce_caret' data-mce-bogus='1' data-mce-type='format-caret'>&#8203;&#65279;</span>";
        if (!endPosition) {
            innerHtml = "<span id='_mce_caret' data-mce-bogus='1' data-mce-type='format-caret'>&#8203;&#65279;</span>" + existingInnerHTML;
        }
        let parentInnerHtml = removeBOM(parentNode.innerHTML);
        let newParentInnerHtml = parentInnerHtml?.replace(existingInnerHTML, innerHtml);
        parentNode.innerHTML = newParentInnerHtml;
        if (clickedX1 !== 0 && clickedY1 !== 0) {     //User generated click event
            let pointerElement = document.getElementById('_mce_caret');
            if (pointerElement?.nodeName == 'SPAN' && pointerElement.hasAttribute('id')) {
                let selectedNode = tinymce.activeEditor?.selection?.select(tinymce.activeEditor?.dom?.select('span#_mce_caret')[0]);
                tinymce.activeEditor?.selection?.setCursorLocation(selectedNode)
                tinymce.activeEditor?.selection?.placeCaretAt(Math.round(clickedX1), Math.round(clickedY1)) //Placing exact cursor position on clicking.
                if (endPosition) {
                    tinymce.activeEditor?.selection?.setCursorLocation(pointerElement, 1);
                } else {
                    tinymce.activeEditor?.selection?.setCursorLocation(pointerElement, 0);
                }
                this.activeGlossaryFootnoteId = ""
            }
        }
    }
    
    /**
     * handleBlur | gets triggered when any editor element is blurred
     * @param {*} e  event object
     */
    handleBlur = (e, forceupdate) => {
        // save Non-HTML bookmark so pass parameter true to getBookmark
        let caretPosition = tinymce.activeEditor?.selection?.getBookmark(2, true);
        if (caretPosition) {
            this.props?.saveCaretPosition(caretPosition);
        }
        if(tinymce.activeEditor?.targetElm?.className.includes('blockquoteTextCredit')){
            setFormattingToolbar('disableTinymceToolbar')
        }
        const eventTarget = e?.target
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
        let relatedTargets = (e && e.relatedTarget && e.relatedTarget.classList) ? e.relatedTarget.classList : [];
        if (checkforToolbarClick(relatedTargets)) {
            e.stopPropagation();
            return;
        }
        if (((this.props?.element?.type === 'figure') && (config.figureFieldsPlaceholders.includes(this.props.placeholder) || this.props.placeholder === 'Enter Button Label')) || 
            (this.props.element && this.props?.element?.type === 'element-aside' && this.props.element?.html?.title)) {
            this.props.onFigureImageFieldBlur(this.props.index);
        }
        if (this.props?.parentElement?.subtype === ElementConstants.TAB && this.props?.tabTitle) {
            this.props.onTabTitleFieldBlur(this.props.index);
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
        /*It will reopen data paste issue in blockquote marginalia*/
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
                        let htmlWithoutStyleAttribute = removeStyleAttribute(codeLine[index].innerHTML);
                        codeLine[index].innerHTML = String(htmlWithoutStyleAttribute).replace(/ /g, '&nbsp;');
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
                let cgTitleFieldData = {};
                if (this.props?.citationAsideData?.parent?.type === "showhide" && this.props?.element?.type === "citations" && this.props?.currentElement?.type === "element-authoredtext") {
                    cgTitleFieldData.asideData = this.props.citationAsideData;
                    cgTitleFieldData.parentElement = this.props.parentElement;
                }
                setTimeout(() => {
                    this.props.handleBlur(forceupdate, this.props.currentElement, this.props.index, showHideType, eventTarget, cgTitleFieldData);
                }, 0)
            }
        }
        else {
            this.fromtinyInitBlur = false;
        }
    }

    toggleMarkedIndexPopup = (status, popupType, markIndexid, callback, isNewIndex=false) => {
        if (config.savingInProgress) return false

        let typeWithPopup = this.props.element ? this.props.element.type : "";
        let elementId = this.props.currentElement ? this.props.currentElement.id : this.props.element ? this.props.element.id : "";
        let elementType = this.props.currentElement ? this.props.currentElement.type : this.props.element ? this.props.element.type : "";
        let index = this.props.index;
        let elementSubType = this.props.element ? this.props.element.figuretype : '';
        let markIndexText = this.markIndexText;
        this.props.openMarkedIndexPopUp && this.props.openMarkedIndexPopUp(status, popupType, markIndexid, elementId, elementType, index, elementSubType, markIndexText, callback, typeWithPopup, this.props.poetryField, isNewIndex);
    }

    toggleGlossaryandFootnotePopup = (status, popupType, glossaryfootnoteid, callback) => {
        if (config.savingInProgress) return false

        let typeWithPopup = this.props.element ? this.props.element.type : "";
        let elementId = this.props.currentElement ? this.props.currentElement.id : this.props.element ? this.props.element.id : "";
        let elementType = this.props.currentElement ? this.props.currentElement.type : this.props.element ? this.props.element.type : "";
        let index = this.props.index;
        let elementSubType = this.props.element ? this.props.element.figuretype : '';
        let glossaryTermText = this.glossaryTermText;
        let blockfeatureType = this.props?.element?.elementdata?.type === "pullquote" ? this.props?.element?.elementdata?.type : ''
        this.props.openGlossaryFootnotePopUp && this.props.openGlossaryFootnotePopUp(status, popupType, glossaryfootnoteid, elementId, elementType, index, blockfeatureType, elementSubType, glossaryTermText, callback, typeWithPopup, this.props.poetryField );
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



    render() {
        const { slateLockInfo: { isLocked, userId }, contenteditable } = this.props;
        let lockCondition = (isLocked && config.userId !== userId.replace(/.*\(|\)/gi, ''));
        this.handlePlaceholder();

        let classes = this.props.className ? this.props.className + " cypress-editable" : '' + "cypress-editable";
        let id = 'cypress-' + this.props.index;
        let isContainsImage =  this.props?.model?.text?.match(/<img/)?.input.includes('class="imageAssetContent');
        if(!isContainsImage){
            classes += ' ' + this.placeHolderClass;
        }
        
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
                        contentEditable={contenteditable === false ? contenteditable : !lockCondition} 
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
                let tmpModel = ""
                let tempDiv = document.createElement('div');
                tempDiv.innerHTML = this.props.model;
                if (tempDiv && tempDiv.children && tempDiv.children.length && tempDiv.children[0].nodeName === 'P') {
                    tmpModel = tempDiv.children[0].innerHTML;
                }
                tmpModel = removeBOM(tmpModel)
                    return (
                        <p ref={this.editorRef} id={id} onBlur={this.handleBlur} onClick={this.handleClick} className={classes} placeholder={this.props.placeholder} suppressContentEditableWarning={true} contentEditable={!lockCondition} dangerouslySetInnerHTML={{ __html: tmpModel }} onChange={this.handlePlaceholder}>{/* htmlToReactParser.parse(this.props.model.text) */}</p>
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
        if (tinymce.activeEditor && tinymce.activeEditor.id) {
        const authStore = store.getState();
        const {projectInfo} = authStore;
        let isSubscriber = isSubscriberRole(projectInfo?.projectSharingRole, projectInfo?.projectSubscriptionDetails?.isSubscribed);
        if (this.props.permissions && !((this.props.permissions.includes('access_formatting_bar') || this.props.permissions.includes('elements_add_remove')) && !isSubscriber)) {
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

const mapStateToProps = (state) => {
    return {
        alfrescoPermission: state.alfrescoReducer.Permission,
        alfrescoElementId : state.alfrescoReducer.elementId,
        alfrescoEditor: state.alfrescoReducer.editor,
        alfrescoAssetData: state.alfrescoReducer.alfrescoAssetData,
        launchAlfrescoPopup: state.alfrescoReducer.launchAlfrescoPopup,
        isInlineEditor: state.alfrescoReducer.isInlineEditor,
        imageArgs: state.alfrescoReducer.imageArgs,
        slateLevelData: state.appStore.slateLevelData,
        asideData: state.appStore.asideData,
        isAutoNumberingEnabled: state.autoNumberReducer.isAutoNumberingEnabled,
        autoNumberOption: state.autoNumberReducer.autoNumberOption,
        spellCheckToggle: state.toolbarReducer.spellCheckToggle,
        caretPosition: state.appStore.caretPosition
    }
}

export default connect(
    mapStateToProps,
    { conversionElement, wirisAltTextPopup, saveInlineImageData, createElement, deleteElement, saveSelectedAlfrescoElement, saveCaretPosition, approvedSlatePopupStatus }
)(TinyMceEditor);
