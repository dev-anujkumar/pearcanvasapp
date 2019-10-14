import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import tinymce from 'tinymce/tinymce';
import { GlossaryFootnoteEditorConfig } from '../config/EditorConfig';
import {
  tinymceFormulaIcon,
  tinymceFormulaChemistryIcon
} from "./../svgIcons.jsx";
export class ReactEditor extends React.Component {
  constructor(props) {
    super(props);
    this.chemistryMlMenuButton = null;
    this.mathMlMenuButton = null;
    this.editorConfig = {
      toolbar: GlossaryFootnoteEditorConfig.toolbar,
      plugins: "placeholder tiny_mce_wiris",
      menubar: false,
      selector: '#glossary-0',
      inline: true,
      menubar: false,
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
      },
      init_instance_callback: function (editor) {
        editor.fire('focus');
        let activeElement = editor.dom.getParent(editor.selection.getStart(), ".definition-editor");
          if (activeElement) {
              if (!activeElement.innerText.trim().length) {
                activeElement.classList.add('place-holder')
              }
          }
      },
    }
  }

  onEditorBlur = (editor) => {
    editor.on('blur',  (e) => {
      this.props.glossaaryFootnotePopup(false);   
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

  handleFocus = (e) => {
    if (tinymce.activeEditor && tinymce.activeEditor.id === e.target.id) {
      return false;
    }

    if (tinymce.activeEditor && !(tinymce.activeEditor.id.includes('cypress'))) {
      let activeEditorId = tinymce.activeEditor.id;
      tinymce.remove('#' + tinymce.activeEditor.id)
      document.getElementById(activeEditorId).contentEditable = true;
    }

    this.editorConfig.selector = '#' + e.target.id;
    tinymce.init(this.editorConfig);
  }

  render() {
    // if (tinymce.activeEditor !== null && tinymce.activeEditor && tinymce.activeEditor.id) {
    //   let activeEditorId = tinymce.activeEditor.id;
    //   let element = document.getElementById(activeEditorId);
    //   tinymce.remove('#' + tinymce.activeEditor.id)
    //   element.contentEditable = true;
    //   this.editorConfig.selector = '#' + activeEditorId;
    //   tinymce.init(this.editorConfig);
    // }
    return (
      <div>   
        <p className={this.props.className} placeholder={this.props.placeholder} onFocus={this.handleFocus} contentEditable="true" id={this.props.id} ></p>
      </div>
    )
  }
}

export default ReactEditor;

