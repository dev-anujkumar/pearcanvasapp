import React, { useRef, useEffect } from 'react'

//Helper methods and constants
import powerPasteHelpers from "./powerpaste_helpers.js";

// Tinymce library and plugins
import tinymce from 'tinymce/tinymce';
import "tinymce/plugins/lists";
import "tinymce/plugins/advlist";
import "tinymce/plugins/paste";
import './../../styles/ElementAuthoring/ElementAuthoring.css';

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
    height: 400,
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
    paste_postprocess: (plugin, data) => pastePostProcess(data, props)
  }

  return (
    <>
      <p 
        ref={editorRef}
        contentEditable="true"
        id={`textarea-${props.index}`}
        dangerouslySetInnerHTML={{ __html: '' }}
        ></p>
    </>
  )
}

export default PowerPasteElement

/**
 * Will be called after Powerpaste filtering is done
 * @param {Object} data processed Clipboard data
 * @param {Object} props Powerpaste component props
 */
export const pastePostProcess = (data, props) => {
  if (data.node) {
    const childNodes = data.node.children;
    const elements = [];
    if (childNodes.length === 1 && (childNodes[0].tagName === 'STRONG' || childNodes[0].tagName === 'GOOGLE-SHEETS-HTML-ORIGIN')) {
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
    }
    const parentIndex = props.index;
    props.onPowerPaste(elements, parentIndex);
  }
}

/**
 * Processes and stores copied data to an array
 * @param {HTMLElement} childElements HTML element node object
 * @param {Array} elements Array containing details of elements copied
 */
export const createPastedElements = (childElements, elements) => {
  for (let i = 0; i < childElements.length; i++) {
    if (childElements[i].tagName === 'P') {
      if (childElements[i].children.length && childElements[i].children[0].tagName === 'IMG') {
        let src = childElements[i].children[0].getAttribute('src');
        src = src ? src : childElements[i].children[0].getAttribute('data-image-src');
        elements.push({html: src, tagName: childElements[i].children[0].tagName});
      } else {
        const node = powerPasteHelpers.addParagraphClass(childElements[i]);
        elements.push({ html: node.outerHTML, tagName: childElements[i].tagName });
      }

    } else if (childElements[i].tagName === 'UL') {
      powerPasteHelpers.addUListClasses(childElements[i], 1);
      elements.push({ html: childElements[i].outerHTML, tagName: childElements[i].tagName });
    } else if (childElements[i].tagName === 'OL') {
      powerPasteHelpers.addOListClasses(childElements[i], 1);
      elements.push({ html: childElements[i].outerHTML, tagName: childElements[i].tagName });
    } else if (childElements[i].tagName === 'IMG') {
      const src = childElements[i].getAttribute('src');
      elements.push({html: src, tagName: childElements[i].tagName});
    } else if (childElements[i].tagName === 'H1' ||
      childElements[i].tagName === 'H2' ||
      childElements[i].tagName === 'H3' ||
      childElements[i].tagName === 'H4' ||
      childElements[i].tagName === 'H5' ||
      childElements[i].tagName === 'H6') {
      const node = powerPasteHelpers.addHeadingClass(childElements[i], childElements[i].tagName[1]);
      elements.push({ html: node.outerHTML, tagName: childElements[i].tagName });
    }
  }
}