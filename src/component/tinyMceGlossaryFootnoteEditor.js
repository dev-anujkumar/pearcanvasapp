import React from 'react';
import tinymce from 'tinymce/tinymce';
import { connect } from 'react-redux';
import "tinymce/plugins/paste/plugin.min.js";
import { GlossaryFootnoteEditorConfig } from '../config/EditorConfig';
import {
  tinymceFormulaIcon,tinymceFormulaChemistryIcon,bold,italic,underline,strikethrough,removeformat,subscript,superscript,charmap,code
} from '../images/TinyMce/TinyMce.jsx';
import { hasReviewerRole, hasProjectPermission, handleTinymceEditorPlugins } from '../constants/utility.js'
import { wirisAltTextPopup } from './SlateWrapper/SlateWrapper_Actions';
import { getWirisAltText } from '../js/utils';
import { setFormattingToolbar, updateCurrentValue } from './GlossaryFootnotePopup/GlossaryFootnote_Actions.js';
import { markedIndexPopupOverGlossary } from './MarkIndexPopup/MarkIndex_Action';
import { CLASS_TEMP_WIRISFORMULA, CLASS_WIRISFORMULA, DATA_MATHML, PLACE_HOLDER } from '../constants/Element_Constants.js';

export class ReactEditor extends React.Component {
  constructor(props) {
    super(props);
    this.placeHolderClass = ''
    this.chemistryMlMenuButton = null;
    this.mathMlMenuButton = null;
    this.termtext = null;
    this.wirisClick = 0;
    this.editorConfig = {
      toolbar: GlossaryFootnoteEditorConfig.toolbar,
      formats: GlossaryFootnoteEditorConfig.formats,
      plugins: handleTinymceEditorPlugins("placeholder paste"),
      menubar: false,
      selector: '#glossary-0',
      inline: true,
      statusbar: false,
      object_resizing: false,
      fixed_toolbar_container: '#toolbarGlossaryFootnote',
      paste_preprocess: this.pastePreProcess,
      paste_postprocess: this.pastePostProcess,
      skin: false,
      content_css: false,
      setup: (editor) => {
        if (this.props.permissions && this.props.permissions.includes('authoring_mathml')) {  // when user doesn't have edit permission
          this.setChemistryFormulaIcon(editor);
          this.setMathmlFormulaIcon(editor);
          this.addChemistryFormulaButton(editor);
          this.addMathmlFormulaButton(editor);
        }
        this.editorClick(editor);
        this.onEditorBlur(editor);
        this.setDefaultIcons(editor)
        editor.on('keyup', (e) => { this.editorOnKeyup(e, editor) });
        editor.ui.registry.addToggleButton('code', {
          icon:"code",
          tooltip: "Inline code",
          onAction: () => {
            this.addInlineCode(editor)
          },
          onSetup: (api) => {
            this.handleFocussingInlineCode(api, editor)
          }
        });
        editor.on('init', (e) => {
            if(document.querySelector('div.glossary-toolbar-wrapper')){
              setFormattingToolbar('disableTinymceToolbar')
              setFormattingToolbar('removeGlossaryFootnoteSuperscript')
              setFormattingToolbar('removeTinymceSuperscript')
            }
          });
      },
      init_instance_callback: (editor) => {
        if (hasReviewerRole() && !hasProjectPermission('elements_add_remove')) {        // when user doesn't have edit permission
          if (editor && editor.id) {
            document.getElementById(editor.id).setAttribute('contenteditable', false)
          }
        }
        editor.on('Change', (e) => { this.editorOnChange(e, editor) });
        if(document.querySelector('div.glossary-toolbar-wrapper')){
          setFormattingToolbar('disableTinymceToolbar')
          setFormattingToolbar('removeTinymceSuperscript')
        }
        /* Reverting data-temp-mathml to data-mathml and class Wirisformula to temp_WirisFormula */
        this.revertingTempContainerHtml(editor)
      },
    }
    this.editorRef = React.createRef();
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
    });
  }

  /**
   * Reverting data-temp-mathml to data-mathml and class Wirisformula to temp_WirisFormula
   * @param {*} editor Editor instance
   */
  revertingTempContainerHtml = editor => {
    let revertingTempContainerHtml = editor.getContentAreaContainer().innerHTML;
    let elementNode = document.getElementById(editor.id)
    revertingTempContainerHtml = revertingTempContainerHtml.replace(/data-temp-mathml/g,DATA_MATHML).replace(/temp_Wirisformula/g,'Wirisformula');
    if(elementNode){
      elementNode.innerHTML = revertingTempContainerHtml;
    }
  }
  /**
  * Called on Keyup
  * @param {*} e Event Object
  * @param {*} editor Editor instance
  */
  editorOnKeyup = (e, editor) => {
    let activeElement = editor.dom.getParent(editor.selection.getStart(), ".definition-editor");
    let contentHTML = e.target.innerHTML;
    if (activeElement) {
      let isContainsMath = contentHTML.match(/<img/) ? (contentHTML.match(/<img/).input.includes(CLASS_WIRISFORMULA)
      || contentHTML.match(/<img/).input.includes(CLASS_TEMP_WIRISFORMULA)) : false
      if (activeElement.innerText.trim().length || isContainsMath) {
        activeElement.classList.remove(PLACE_HOLDER)
      }
      else {
        activeElement.classList.add(PLACE_HOLDER)
      }
    }
  }

  /**
  * Called on editor change
  * @param {*} e Event Object
  * @param {*} editor Editor instance
  */
  editorOnChange = (e, editor) => {
    let content = e.target.getContent({format: 'text'}),
        contentHTML = e.target.getContent(),
        activeElement = editor.dom.getParent(editor.selection.getStart(), ".definition-editor");
    if (activeElement) {
      let isContainsMath = contentHTML.match(/<img/) ? (contentHTML.match(/<img/).input.includes(CLASS_WIRISFORMULA)
      || contentHTML.match(/<img/).input.includes(CLASS_TEMP_WIRISFORMULA)) : false
        if(content.trim().length || contentHTML.match(/<math/g) || isContainsMath){
            activeElement.classList.remove(PLACE_HOLDER)
        }
        else {
            activeElement.classList.add(PLACE_HOLDER)
        }
    }
  }

  /**
     * Called before paste process
     * @param {*} plugin
     * @param {*} args
     */
    pastePreProcess = (plugin, args) => {
      let testElement = document.createElement('div');
      testElement.innerHTML = args.content;
      if(testElement.innerText && testElement.innerText.trim().length){
        let tempContent = testElement.innerText.replace(/&/g, "&amp;");
        args.content = tempContent.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }else{
          args.content = tinymce.activeEditor.selection.getContent();
      }
  }

  pastePostProcess = (plugin, args) => {
    /** Data with &nsbp; creating unwanted saving call as tinymce converts it in space at the time of rendering */
    if(args.node && args.node.innerHTML){
      let content = args.node.innerHTML
      content = content.replace(/\&nbsp;/g, ' ');
      args.node.innerHTML = content;
    }
  }

  /*
    *  addInlineCode function is responsible for adding custom icon for inline Code Formatting
    */
  addInlineCode = (editor) => {
    let selectedText = window.getSelection().toString();
    if (selectedText !== "") {
      editor.execCommand('mceToggleFormat', false, 'code');
      let insertionText = '<code>' + selectedText + '</code>';
      if (editor.innerHTML && editor.innerHTML.indexOf('code') > -1) {
        insertionText = selectedText;
        editor.insertContent(insertionText);
      }
    }
    else {
      editor.undoManager.transact(() => {
        editor.formatter.toggle('code');
    });
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

  onEditorBlur = (editor) => {
    editor.on('blur', (e) => {
      setFormattingToolbar('disableTinymceToolbar')
      setFormattingToolbar('disableGlossaryFootnoteToolbar')
      setFormattingToolbar('removeGlossaryFootnoteSuperscript')
      setFormattingToolbar('removeTinymceSuperscript')
      e.stopImmediatePropagation();
      e.preventDefault();
    });
  };
  setDefaultIcons = editor => {
    editor.ui.registry.addIcon("bold", bold);
    editor.ui.registry.addIcon("italic", italic);
    editor.ui.registry.addIcon("underline", underline);
    editor.ui.registry.addIcon("strike-through", strikethrough);
    editor.ui.registry.addIcon("remove-formatting", removeformat);
    editor.ui.registry.addIcon("subscript", subscript);
    editor.ui.registry.addIcon("superscript", superscript);
    editor.ui.registry.addIcon("insert-character", charmap);
    editor.ui.registry.addIcon("code",code);
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
      onAction: () => {
        this.onChemMLAction(editor)
      },
      onSetup: (buttonApi) => {
        /*
          make merge menu button apis available globally among compnenet
        */
        this.chemistryMlMenuButton = buttonApi;
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
      onAction: () => {
        this.onMathMLAction(editor)
      },
      onSetup: (buttonApi) => {
        /*
          make merge menu button apis available globally among compnenet
        */
        this.mathMlMenuButton = buttonApi;
      }
    });
  };

  onMathMLAction = editor => {
    let wirisPluginInstance = window.WirisPlugin.instances[editor.id];
    wirisPluginInstance.core.getCustomEditors().disable();
    wirisPluginInstance.openNewFormulaEditor();
  }
  onChemMLAction = editor => {
    let wirisChemistryInstance = window.WirisPlugin.instances[editor.id].getCore().getCustomEditors();
    wirisChemistryInstance.enable('chemistry');
    window.WirisPlugin.instances[editor.id].openNewFormulaEditor();
  }
  handlePlaceholer() {
    let model, tempPlaceHolderclass;
    model = this.props.glossaryFootNoteCurrentValue;
    tempPlaceHolderclass = this.props.className;

    let testElem = document.createElement('div');
    testElem.innerHTML = model;

    if (testElem && model) {
      let isContainsMath = testElem.innerHTML.match(/<img/) ? (testElem.innerHTML.match(/<img/).input.includes(CLASS_WIRISFORMULA)
      || testElem.innerHTML.match(/<img/).input.includes(CLASS_TEMP_WIRISFORMULA)) : false;
      if (testElem.innerHTML && testElem.innerText?.trim() == "" && !testElem.innerText?.trim().length && !isContainsMath) {
        this.placeHolderClass = tempPlaceHolderclass;
      } else {
        this.placeHolderClass = tempPlaceHolderclass.replace(PLACE_HOLDER, '')
      }
    } else {
      if (tempPlaceHolderclass &&tempPlaceHolderclass.includes(PLACE_HOLDER)) {
        this.placeHolderClass = tempPlaceHolderclass
      } else {
        this.placeHolderClass = tempPlaceHolderclass + PLACE_HOLDER;
      }
    }
  }

  setGlossaryFootnoteTerm = (id, glossaryNode, footnoteNode) => {
    if(id === "glossary-0"){
      this.termtext = glossaryNode && glossaryNode.innerHTML;
    }
    else if(id === "footnote-0"){
      this.termtext = footnoteNode && footnoteNode.innerHTML;
    }
  }

  setGlossaryFootnoteNode = (id, glossaryNode, footnoteNode) => {
    if(id === "glossary-0" && glossaryNode && this.termtext){
      glossaryNode.innerHTML = this.termtext.replace(/data-temp-mathml/g,DATA_MATHML).replace(/temp_Wirisformula/g,'Wirisformula');
    }
    else if(id === "footnote-0" && footnoteNode && this.termtext){
      footnoteNode.innerHTML = this.termtext.replace(/data-temp-mathml/g,DATA_MATHML).replace(/temp_Wirisformula/g,'Wirisformula');
    }
  }

  componentDidMount() {
    let _isEditorPlaced = false;
    for (let i = tinymce.editors.length - 1; i > -1; i--) {
      let ed_id = tinymce.editors[i].id;
      if (ed_id.includes('glossary') || ed_id.includes('footnote')) {
        _isEditorPlaced = true;
      }
    }
    setFormattingToolbar('disableTinymceToolbar')
    if (!_isEditorPlaced) {
      setTimeout(()=>{
        this.editorRef?.current?.focus();
      },0)
      this.editorConfig.selector = '#' + this.editorRef.current.id;
      let glossaryNode = document.getElementById('glossary-0')
      let footnoteNode = document.getElementById('footnote-0')
      this.setGlossaryFootnoteTerm(this.props.id, glossaryNode, footnoteNode)
      tinymce.init(this.editorConfig).then((d) => {
        setFormattingToolbar('removeTinymceSuperscript')
        setFormattingToolbar('removeGlossaryFootnoteSuperscript')
        this.handlePlaceholer();
        this.setGlossaryFootnoteNode(this.props.id, glossaryNode, footnoteNode)
      });
    }
  }

  componentDidUpdate() {
    let tinyMCEInstancesNodes = document.getElementsByClassName('tox tox-tinymce tox-tinymce-inline');
    setFormattingToolbar('disableTinymceToolbar')
    if(tinyMCEInstancesNodes.length>1){
      if(tinyMCEInstancesNodes[1].parentElement.id!=="tinymceToolbar"){
        tinyMCEInstancesNodes[0].remove()
      }
    }
    this.handlePlaceholer()
    let glossaryNode = document.getElementById('glossary-0')
    let footnoteNode = document.getElementById('footnote-0')
    setFormattingToolbar('removeTinymceSuperscript')
    setFormattingToolbar('removeGlossaryFootnoteSuperscript')
    this.setGlossaryFootnoteNode(this.props.id, glossaryNode, footnoteNode)
  }

  componentWillMount() {
    this.handlePlaceholer()
  }

  handleClick = (e) => {
    let clickedX = e.clientX;
    let clickedY = e.clientY;
    let event = Object.assign({}, e);
    let currentTarget = event.currentTarget;
    if (tinymce.activeEditor && tinymce.activeEditor.id === currentTarget.id) {
      return false;
    }

    for (let i = tinymce.editors.length - 1; i > -1; i--) {
      let ed_id = tinymce.editors[i].id;
      if (ed_id.includes('glossary') || ed_id.includes('footnote')) {
        if (ed_id === currentTarget.id) {
          return false;
        }
        let activeEditorId = ed_id;

        /*
          Before setting wiris remove the classes to prevent it converting to mathml
        */
        let tempContainerHtml = tinyMCE.$("#" + activeEditorId).html()
        tempContainerHtml = tempContainerHtml.replace(/\sdata-mathml/g, ' data-temp-mathml').replace(/\"Wirisformula/g, '"temp_Wirisformula')
                            .replace(/\sWirisformula/g, ' temp_Wirisformula');

        tinymce.remove('#' + activeEditorId)
        tinymce.$('.wrs_modal_desktop').remove();
        /*
          this line must execute after removing tinymce
        */
        document.getElementById(activeEditorId).innerHTML = tempContainerHtml;

        if (document.getElementById(activeEditorId)) {
          document.getElementById(activeEditorId).contentEditable = true;
        }
      }
    }

    /**
     * [BG-262] | keep the commented code to track
     */
    this.editorConfig.selector = '#' + currentTarget.id;
    let termText = document.getElementById(currentTarget.id)&&document.getElementById(currentTarget.id).innerHTML;
    tinymce.init(this.editorConfig).then((d)=>{
      setFormattingToolbar('removeTinymceSuperscript')
     if(termText) {
      /**
       * BG-1907 -[PCAT-7395] Temp classes in mathml cause issue in opening wiris editor.
       */
      termText = termText.replace(/data-temp-mathml/g,DATA_MATHML).replace(/temp_Wirisformula/g,'Wirisformula');
      document.getElementById(currentTarget.id).innerHTML = termText;
     }
     tinymce.activeEditor.selection.placeCaretAt(clickedX,clickedY) //Placing exact cursor position on clicking.
    })
  }

  updateCurrentGlossaryValue = () => {
    if(this.props.id === 'glossary-1' || this.props.id === 'glossary-0'){
      const term = document.getElementById('glossary-0')?.innerHTML || '';
      const defination = document.getElementById('glossary-1')?.innerHTML || '';
      updateCurrentValue(term, defination)
    }
  }

  openMarkedIndexPopUp = () => {
    this.props.markedIndexPopupOverGlossary(true);
    this.updateCurrentGlossaryValue();
  }

  render() {
    let propsGlossaryFootNoteCurrentValue = this.props.glossaryFootNoteCurrentValue;
    const isReviewer = hasReviewerRole();
    // && this.props.glossaryFootNoteCurrentValue.replace(/&nbsp;/g, ' ');      //BG-2552
    let glossaryFootNoteCurrentValue;
    try{
      glossaryFootNoteCurrentValue = (propsGlossaryFootNoteCurrentValue && tinyMCE.$(propsGlossaryFootNoteCurrentValue.trim()).length) ?
                                      (tinyMCE.$(propsGlossaryFootNoteCurrentValue))[0].innerHTML : propsGlossaryFootNoteCurrentValue;
    }
    catch(err){
      glossaryFootNoteCurrentValue = propsGlossaryFootNoteCurrentValue;
    }
    glossaryFootNoteCurrentValue = glossaryFootNoteCurrentValue && glossaryFootNoteCurrentValue.replace(/^(\ |&nbsp;|&#160;)+|(\ |&nbsp;|&#160;)+$/g, '&nbsp;');

    return (
      <div className={`glossary-toolbar ${isReviewer? "pointer-events-none" : ""}`}>
        <p ref={this.editorRef} className={this.placeHolderClass} placeholder={this.props.placeholder} onClick={this.handleClick} contentEditable={`${!isReviewer}`}
        id={this.props.id} dangerouslySetInnerHTML={{ __html: glossaryFootNoteCurrentValue &&
        glossaryFootNoteCurrentValue.replace(/\sdata-mathml/g, ' data-temp-mathml').replace(/\"Wirisformula/g, '"temp_Wirisformula')
        .replace(/\sWirisformula/g, ' temp_Wirisformula') }}></p>
        {/* {markedIndexIcon && (this.props.elementType === "element-authoredtext" || this.props.elementType === 'element-list') ?
         <span dangerouslySetInnerHTML={{__html: markedIndexIcon}} onClick={ this.openMarkedIndexPopUp }></span>: null} */}
      </div>
    )
  }
}

export default connect(
  null,
  { wirisAltTextPopup, markedIndexPopupOverGlossary }
)(ReactEditor);

