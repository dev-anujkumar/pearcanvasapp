import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import tinymce from 'tinymce/tinymce';
import { GlossaryFootnoteEditorConfig } from '../config/EditorConfig';
import {
  tinymceFormulaIcon,
  tinymceFormulaChemistryIcon
}  from '../images/TinyMce/TinyMce.jsx';
export class ReactEditor extends React.Component {
  constructor(props) {
    super(props);
    this.placeHolderClass = ''
    this.chemistryMlMenuButton = null;
    this.mathMlMenuButton = null;
    this.editorConfig = {
      toolbar: GlossaryFootnoteEditorConfig.toolbar,
      plugins: "placeholder tiny_mce_wiris",
      menubar: false,
      selector: '#glossary-0',
      inline: true,
      statusbar: false,
      object_resizing: false,
      fixed_toolbar_container: '#toolbarGlossaryFootnote',
      setup: (editor) => {
        this.onEditorBlur(editor);
        this.setChemistryFormulaIcon(editor);
        this.setMathmlFormulaIcon(editor);
        this.addChemistryFormulaButton(editor);
        this.addMathmlFormulaButton(editor);
        editor.on('keyup', (e) => {
          let activeElement = editor.dom.getParent(editor.selection.getStart(), ".definition-editor");
          if (activeElement) {
            if (activeElement.innerText.trim().length) {
              activeElement.classList.remove('place-holder')
            }
            else {
              activeElement.classList.add('place-holder')
            }
          }
        });
        editor.ui.registry.addToggleButton('code', {
          text: '<i class="fa fa-code" aria-hidden="true"></i>',
          onAction: () => {
            this.addInlineCode(editor)
          },
          onSetup: (api) => {
            this.handleFocussingInlineCode(api, editor)
          }
        });
        editor.on('BeforeExecCommand', (e) => {
          let command = e.command;
          if(command === "RemoveFormat") {
            let selectedText = window.getSelection().toString();
            if(selectedText == "") {
              e.preventDefault();
              e.stopPropagation();
            }
          }
        });
      },
      init_instance_callback: function (editor) {
        // editor.fire('focus');
        // let activeElement = editor.dom.getParent(editor.selection.getStart(), ".definition-editor");
        // if (activeElement) {
        //   if (!activeElement.innerText.trim().length) {
        //     activeElement.classList.add('place-holder')
        //   }
        // }

        /* Reverting temp-data-mathml to data-mathml and class Wirisformula to temp_WirisFormula */ 
        let revertingTempContainerHtml = editor.getContentAreaContainer().innerHTML; 
        revertingTempContainerHtml = revertingTempContainerHtml.replace(/temp-data-mathml/g,'data-mathml').replace(/temp_Wirisformula/g,'Wirisformula');
        document.getElementById(editor.id).innerHTML = revertingTempContainerHtml;
      },
    }
    this.editorRef = React.createRef();
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

  handlePlaceholer() {
    let model, tempPlaceHolderclass;
    model = this.props.glossaryFootNoteCurrentValue;
    tempPlaceHolderclass = this.props.className;

    if (model) {
      if (tempPlaceHolderclass &&tempPlaceHolderclass.includes('place-holder')) {
        this.placeHolderClass = tempPlaceHolderclass.replace('place-holder', '')
      } else {
        this.placeHolderClass = tempPlaceHolderclass;
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
    this.handlePlaceholer()
  }

  componentWillMount() {
    this.handlePlaceholer()
  }

  handleClick = (e) => {
    let event = Object.assign({}, e);
    let currentTarget = event.currentTarget;
    if (tinymce.activeEditor && tinymce.activeEditor.id === currentTarget.id) {
      return false;
    }

    if (tinymce.activeEditor && !(tinymce.activeEditor.id.includes('cypress'))) {
      let activeEditorId = tinymce.activeEditor.id;

      /*
        Before setting wiris remove the classes to prevent it converting to mathml
      */
      let tempContainerHtml = tinyMCE.$("#" + tinymce.activeEditor.id).html()
      tempContainerHtml = tempContainerHtml.replace(/\sdata-mathml/g, ' temp-data-mathml').replace(/\"Wirisformula/g, '"temp_Wirisformula').replace(/\sWirisformula/g, ' temp_Wirisformula');
      //tinymce.$('.wrs_modal_desktop').remove();

      tinymce.remove('#' + tinymce.activeEditor.id)
      tinymce.$('.wrs_modal_desktop').remove();
      /*
        this line must execute after removing tinymce
      */
      document.getElementById(activeEditorId).innerHTML = tempContainerHtml;

      if (document.getElementById(activeEditorId)) {
        document.getElementById(activeEditorId).contentEditable = true;
      }
    }

    this.editorConfig.selector = '#' + currentTarget.id;
    tinymce.init(this.editorConfig);
  }

  render() {
    return (
      <div>
        <p ref={this.editorRef} className={this.placeHolderClass} placeholder={this.props.placeholder} onClick={this.handleClick} contentEditable="true" id={this.props.id} dangerouslySetInnerHTML={{ __html: this.props.glossaryFootNoteCurrentValue && this.props.glossaryFootNoteCurrentValue.replace(/\sdata-mathml/g, ' temp-data-mathml').replace(/\"Wirisformula/g, '"temp_Wirisformula').replace(/\sWirisformula/g, ' temp_Wirisformula') }}></p>
      </div>
    )
  }
}

export default ReactEditor;

