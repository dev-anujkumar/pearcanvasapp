import React from 'react';
import tinymce from 'tinymce/tinymce';
import "tinymce/plugins/paste";
import { GlossaryFootnoteEditorConfig } from '../config/EditorConfig';
import {
  tinymceFormulaIcon,
  tinymceFormulaChemistryIcon
}  from '../images/TinyMce/TinyMce.jsx';
import { hasReviewerRole, hasProjectPermission } from '../constants/utility.js'
export class ReactEditor extends React.Component {
  constructor(props) {
    super(props);
    this.placeHolderClass = ''
    this.chemistryMlMenuButton = null;
    this.mathMlMenuButton = null;
    this.editorConfig = {
      toolbar: GlossaryFootnoteEditorConfig.toolbar,
      plugins: "placeholder tiny_mce_wiris paste",
      menubar: false,
      selector: '#glossary-0',
      inline: true,
      statusbar: false,
      object_resizing: false,
      fixed_toolbar_container: '#toolbarGlossaryFootnote',
      paste_preprocess: this.pastePreProcess,
      setup: (editor) => {
        this.onEditorBlur(editor);
        this.setChemistryFormulaIcon(editor);
        this.setMathmlFormulaIcon(editor);
        this.addChemistryFormulaButton(editor);
        this.addMathmlFormulaButton(editor);
        editor.on('keyup', (e) => {
          let activeElement = editor.dom.getParent(editor.selection.getStart(), ".definition-editor");
          let contentHTML = e.target.innerHTML;
          if (activeElement) {
            let isContainsMath = contentHTML.match(/<img/)?(contentHTML.match(/<img/).input.includes('class="Wirisformula"')||contentHTML.match(/<img/).input.includes('class="temp_Wirisformula"')):false
            if (activeElement.innerText.trim().length || isContainsMath) {
              activeElement.classList.remove('place-holder')
            }
            else {
              activeElement.classList.add('place-holder')
            }
          }
        });
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
      },
      init_instance_callback: (editor) => {
        // editor.fire('focus');
        // let activeElement = editor.dom.getParent(editor.selection.getStart(), ".definition-editor");
        // if (activeElement) {
        //   if (!activeElement.innerText.trim().length) {
        //     activeElement.classList.add('place-holder')
        //   }
        // }
        if (hasReviewerRole() && !hasProjectPermission('elements_add_remove')) {        // when user doesn't have edit permission
          if (editor && editor.id) {
            document.getElementById(editor.id).setAttribute('contenteditable', false)
          }
        }
        editor.on('Change', (e) => {
          let content = e.target.getContent({format: 'text'}),
              contentHTML = e.target.getContent(),
              activeElement = editor.dom.getParent(editor.selection.getStart(), ".definition-editor");

          if (activeElement) {
              let isContainsMath = contentHTML.match(/<img/)?(contentHTML.match(/<img/).input.includes('class="Wirisformula"')||contentHTML.match(/<img/).input.includes('class="temp_Wirisformula"')):false
              if(content.trim().length || contentHTML.match(/<math/g) || isContainsMath){
                  activeElement.classList.remove('place-holder')
              }
              else {
                  activeElement.classList.add('place-holder')
              }
          }
      });

        /* Reverting data-temp-mathml to data-mathml and class Wirisformula to temp_WirisFormula */ 
        let revertingTempContainerHtml = editor.getContentAreaContainer().innerHTML; 
        revertingTempContainerHtml = revertingTempContainerHtml.replace(/data-temp-mathml/g,'data-mathml').replace(/temp_Wirisformula/g,'Wirisformula');
        document.getElementById(editor.id).innerHTML = revertingTempContainerHtml;
      },
    }
    this.editorRef = React.createRef();
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
          args.content = testElement.innerText;
      }else{
          args.content = tinymce.activeEditor.selection.getContent();
      } 
  }

  /*
    *  addInlineCode function is responsible for adding custom icon for inline Code Formatting
    */
  addInlineCode = (editor) => {
    // editor.execCommand('mceToggleFormat', false, 'code');
    let selectedText = window.getSelection().toString();
    if (selectedText != "") {
      editor.execCommand('mceToggleFormat', false, 'code');
      let insertionText = '<code>' + selectedText + '</code>';
      if(editor.innerHTML.indexOf('code') > -1) {
        insertionText = selectedText;
      }
      editor.insertContent(insertionText);
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
      e.stopImmediatePropagation();
      e.preventDefault();
    });
  };

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
        //editor.execCommand("tiny_mce_wiris_openFormulaEditorChemistry");
        let wirisChemistryInstance = window.WirisPlugin.instances[editor.id].getCore().getCustomEditors();
        wirisChemistryInstance.enable('chemistry');
        window.WirisPlugin.instances[editor.id].openNewFormulaEditor();
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

  handlePlaceholer() {
    let model, tempPlaceHolderclass;
    model = this.props.glossaryFootNoteCurrentValue;
    tempPlaceHolderclass = this.props.className;

    let testElem = document.createElement('div');
    testElem.innerHTML = model;

    if (testElem && model) {
      let isContainsMath = testElem.innerHTML.match(/<img/) ? (testElem.innerHTML.match(/<img/).input.includes('class="Wirisformula"') || testElem.innerHTML.match(/<img/).input.includes('class="temp_Wirisformula"')) : false;
      if (testElem.innerText && testElem.innerText.trim() == "" && !testElem.innerText.trim().length && !isContainsMath) {
        this.placeHolderClass = tempPlaceHolderclass;
      } else {
        this.placeHolderClass = tempPlaceHolderclass.replace('place-holder', '')
      }
    } else {
      if (tempPlaceHolderclass &&tempPlaceHolderclass.includes('place-holder')) {
        this.placeHolderClass = tempPlaceHolderclass
      } else {
        this.placeHolderClass = tempPlaceHolderclass + 'place-holder';
      }
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
    if (!_isEditorPlaced) {
      this.editorRef.current.focus();
      this.editorConfig.selector = '#' + this.editorRef.current.id;
      tinymce.init(this.editorConfig);
    }
    this.handlePlaceholer()
  }

  componentDidUpdate() {
    let tinyMCEInstancesNodes = document.getElementsByClassName('tox tox-tinymce tox-tinymce-inline');

    if(tinyMCEInstancesNodes.length>1){
      if(tinyMCEInstancesNodes[1].parentElement.id!=="tinymceToolbar"){
        tinyMCEInstancesNodes[0].remove()
      }
    }
    this.handlePlaceholer()
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
        tempContainerHtml = tempContainerHtml.replace(/\sdata-mathml/g, ' data-temp-mathml').replace(/\"Wirisformula/g, '"temp_Wirisformula').replace(/\sWirisformula/g, ' temp_Wirisformula');

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
    // if (tinymce.activeEditor && !(tinymce.activeEditor.id.includes('cypress'))) {
    //    // previoulsy above code was placed here //
    // }

    this.editorConfig.selector = '#' + currentTarget.id;
    tinymce.init(this.editorConfig).then((d)=>{
     // this.setCursorAtEnd(tinymce.activeEditor);
     tinymce.activeEditor.selection.placeCaretAt(clickedX,clickedY) //Placing exact cursor position on clicking.
    })
  }

  setCursorAtEnd = (editor) => {
    if(editor){
      editor.selection.select(tinymce.activeEditor.getBody(), true);
      editor.selection.collapse(false);
    }
  }

  render() {
    return (
      <div>
        <p ref={this.editorRef} className={this.placeHolderClass} placeholder={this.props.placeholder} onClick={this.handleClick} contentEditable="true" id={this.props.id} dangerouslySetInnerHTML={{ __html: this.props.glossaryFootNoteCurrentValue && this.props.glossaryFootNoteCurrentValue.replace(/\sdata-mathml/g, ' data-temp-mathml').replace(/\"Wirisformula/g, '"temp_Wirisformula').replace(/\sWirisformula/g, ' temp_Wirisformula') }}></p>
      </div>
    )
  }
}

export default ReactEditor;

