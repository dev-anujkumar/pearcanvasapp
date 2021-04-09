import React, { useRef, useEffect } from 'react'

//Helper methods and constants
import powerPasteHelpers from "./powerpaste_helpers.js";

// Tinymce library and plugins
import tinymce from 'tinymce/tinymce';
import "tinymce/plugins/lists/plugin.min.js";
import "tinymce/plugins/advlist/plugin.min.js";
import "tinymce/plugins/powerpaste/plugin.min.js"
import "tinymce/plugins/powerpaste/js/wordimport.js"
// import "tinymce/plugins/paste";
import './../../styles/ElementAuthoring/ElementAuthoring.css';
import { powerpaste_list_content_style } from '../../config/PowerPasteListElementCss';

const PowerPasteElement = (props) => {

  const editorRef = useRef(null)

  /**
   * ComponentDidMount- initializing and destroying editor instance
   */
  useEffect(() => {
    if (editorRef.current) {
      editorConfig.selector = "#" + editorRef.current.id;
    }
    tinymce.init(editorConfig)

    return () => {
      tinymce.activeEditor.destroy?.()
    }
  }, [])

  const editorConfig = {
    content_style: powerpaste_list_content_style,
    height: 420,
    plugins: [
      'advlist lists',
     'powerpaste'
    ],
    toolbar: false,
    menubar: false,
    branding: false,
    statusbar:false,
    powerpaste_allow_local_images: true,
    powerpaste_word_import: 'clean',
    powerpaste_html_import: 'clean',
    smart_paste: false,
    auto_focus: `textarea-${props.index}`,
    paste_preprocess: (plugin, data) => pastePreProcess(data),
    paste_postprocess: (plugin, data) => pastePostProcess(data, props),
    setup: (editor) => {
      setupKeydownEvent(editor)
    }
  }

  return (
    <>
      <p 
        ref={editorRef}
        id={`textarea-${props.index}`}
        dangerouslySetInnerHTML={{ __html: '' }}
        ></p>
    </>
  )
}

export default PowerPasteElement

/**
 * Will be called before Powerpaste filtering is done
 * @param {*} data Raw Clipboard data
 */
export const pastePreProcess = (data) => {
  if (!["msoffice"].includes(data.source)) {
    data.content = "" 
  }
}

/**
 * Will be called after Powerpaste filtering is done
 * @param {Object} data processed Clipboard data
 * @param {Object} props Powerpaste component props
 */
export const pastePostProcess = (data, props) => {
  if (data.node) {
    // if you dont click inside the editor after pasting data first time and try to paste again by 
    // pressing ctrl + v then this condition runs again so clearing the previous data of editor
    tinyMCE.activeEditor.setContent('');

    const childNodes = data.node.children;
    const elements = [];
    createPastedElements(childNodes, elements);
    /* if (childNodes.length === 1 && (childNodes[0].tagName === 'STRONG' || childNodes[0].tagName === 'GOOGLE-SHEETS-HTML-ORIGIN')) {
      const childElements = childNodes[0].children && childNodes[0].children.length ? childNodes[0].children : [];
      createPastedElements(childElements, elements);
    } else if (childNodes.length >= 1) {
      let childElements;
      if (data.source === 'googledocs' && childNodes.length === 2 && childNodes[1].tagName === 'BR') {
        childElements = childNodes[0].children;
      } else {
        childElements = childNodes;
      }
      createPastedElements(childElements, elements);
    } */
    const parentIndex = props.index;
    elements.length && props.toggleWordPasteProceed(true)
    props.onPowerPaste(elements, parentIndex);

    // if valid data has been pasted in to editor once then make editor non-editable
    elements.length ? tinymce.activeEditor.getBody().setAttribute('contenteditable', false) : tinymce.activeEditor.getBody().setAttribute('contenteditable', true);
  }
}

/**
 * Processes and stores copied data to an array
 * @param {HTMLElement} childElements HTML element node object
 * @param {Array} elements Array containing details of elements copied
 */
export const createPastedElements = (childElements, elements) => {
  for (let i = 0; i < childElements.length; i++) {
    switch (childElements[i].tagName) {
      case 'P':
          if (childElements[i].children.length && childElements[i].children[0].tagName === 'IMG') {
            let imgSrc = childElements[i].children[0].getAttribute('src');
            imgSrc = imgSrc ? imgSrc : childElements[i].children[0].getAttribute('data-image-src');
            elements.push({html: imgSrc, tagName: childElements[i].children[0].tagName});
          } else {
            const paraNode = powerPasteHelpers.addParagraphClass(childElements[i]);
            elements.push({ html: paraNode.outerHTML, tagName: childElements[i].tagName });
          }
        break;
        case 'UL':
          powerPasteHelpers.addUListClasses(childElements[i], 1);
          elements.push({ html: childElements[i].outerHTML, tagName: childElements[i].tagName });
          break;
        case 'OL':
          // if the list starts other than numeric format then calls addSpecificOListClasses method 
          // otherwise calls addOListClasses method for adding list classes to html and if the list 
          // does not start with digits and has style attribute then remove it
          childElements[i].hasAttribute('style') ? powerPasteHelpers.addSpecificOListClasses(childElements[i], childElements[i], 1) : powerPasteHelpers.addOListClasses(childElements[i], 1);
          childElements[i].hasAttribute('style') ? childElements[i].removeAttribute('style') : childElements[i];
          elements.push({ html: childElements[i].outerHTML, tagName: childElements[i].tagName });
          break;
        case 'IMG':
          const src = childElements[i].getAttribute('src');
          elements.push({html: src, tagName: childElements[i].tagName});
          break;
        case 'H1':
        case 'H2':
        case 'H3':
        case 'H4':
        case 'H5':
        case 'H6':
          const node = powerPasteHelpers.addHeadingClass(childElements[i], childElements[i].tagName[1]);
          elements.push({ html: node.outerHTML, tagName: childElements[i].tagName });
          break;
    }
  }
}

/**
 * TinyMCE keydown event listener
 * @param {*} editor tinyMCE editor instance 
 */
export const setupKeydownEvent = (editor) => {
  editor.on('keydown', e => {
    const keyCode = e.keyCode || e.which;
    if (!(keyCode === 86 && (e.ctrlKey || e.metaKey))) { //disabling editing and allowing pasting
      e.preventDefault()
      e.stopImmediatePropagation()
      return
    }
    editor.undoManager.clear() //disabling undo/redo
  });
}
