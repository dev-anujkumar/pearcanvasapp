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
    content_style: 'ol, ul { margin-left: 2em !important; margin-bottom: 1em !important; padding-left: 1em !important; }' +
                 'ol li, ul li {list-style-type: none !important; font-family: Georgia, serif, Palatino, Palatino Linotype, Palatino LT STD !important; font-weight: normal; line-height: 1.90em; letter-spacing: 0.01em; margin-left: 0em !important; margin-bottom: .65em !important; color: black !important; font-size: 1em !important; } ' +
                 'ol, li ol, ul, li ul {counter-reset: section !important; }' +
                 'ol li.listItemNumeroUnoUpperAlpha::before {counter-increment: section; content: counter(section, upper-alpha)". "; } ' +
                 'ol li.listItemNumeroUnoLowerAlpha::before {counter-increment: section; content: counter(section, lower-alpha)". "; } ' +
                 'ol li.listItemNumeroUnoNumber::before {counter-increment: section; content: counter(section, decimal)". "; } ' +
                 'ol li.listItemNumeroUnoUpperRoman::before {counter-increment: section; content: counter(section, upper-roman)". "; } ' +
                 'ol li.listItemNumeroUnoLowerRoman::before {counter-increment: section; content: counter(section, lower-roman)". "; } ' +
                 'li.listItemNumeroUnoBullet {color: #000; font-family: Georgia, serif, Palatino, Palatino Linotype, Palatino LT STD !important; font-size: 1.180em; font-weight: normal; line-height: 1.70em; letter-spacing: 0.01em; margin-top: 0em; margin-bottom: 0.5em; } ' +
                 'li.listItemNumeroUnoBullet::before {content: counter(item) ". "; counter-increment: item; font-weight: bold; padding-right: 0.5em; text-align: right; position: absolute; width: 10px; transform: translateX(-100%); } ' +
                 'ul li.listItemNumeroUnoBullet::before {counter-increment: section; content: counter(section, disc); font-size: 1.6rem; } ' +
                 '.disabledListBtn { background: #b3d8e1!important; cursor: not-allowed; pointer-events: none; }' +
                 'span.list-opt-tooltip {position: absolute;  padding: 0 8px; border-radius: 2px; background: #222; -moz-border-radius: 2px; -webkit-border-radius: 2px; -moz-background-clip: padding; -webkit-background-clip: padding-box; background-clip: padding-box; -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, .16), 0 2px 2px 1px rgba(0, 0, 0, .14); -moz-box-shadow: 0 3px 6px rgba(0, 0, 0, .16), 0 2px 2px 1px rgba(0, 0, 0, .14); box-shadow: 0 3px 6px rgba(0, 0, 0, .16), 0 2px 2px 1px rgba(0, 0, 0, .14); color: #fff; font-size: 11px; line-height: 22px; font-family: Arial, Helvetica, sans-serif; transition: opacity .2s ease 0s; -webkit-transition: opacity .2s ease 0s; -moz-transition: opacity .2s ease 0s; -ms-transition: opacity .2s ease 0s; -o-transition: opacity .2s ease 0s; -webkit-opacity: 0; -moz-opacity: 0; opacity: 0; -ms-filter: "alpha(Opacity=0)"; left: 50%; user-select: none; -o-user-select: none; -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; -ms-user-select: none; text-rendering: optimizelegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; bottom: 0; transform: translateY(calc(100% + 5px)) translateX(-50%); z-index: 1; }' +
                 '#listDropWrapper .list-options {position: relative; }' +
                 '#listDropWrapper .list-options:hover>.list-opt-tooltip {opacity: 1; }' +
                 '.element-container li {min-height: 22px; }' +
                 'table ul li {color: inherit !important; }' +
                 'table ol li {color: inherit !important; }' +
                 'table ol li:before {color: inherit !important; }',
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
