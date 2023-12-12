import React, { useRef, useEffect } from 'react'

//Helper methods and constants
import powerPasteHelpers from "./powerpaste_helpers.js";
import { PRIMARY_BUTTON, SECONDARY_BUTTON, focusPopupButtons, blurPopupButtons, focusElement, isPrimaryButtonFocused, isSecondaryButtonFocused } from '../PopUp/PopUp_helpers.js';

// Tinymce library and plugins
import tinymce from 'tinymce/tinymce';
import "tinymce/plugins/lists/plugin.min.js";
import "tinymce/plugins/advlist/plugin.min.js";
import "tinymce/plugins/powerpaste/plugin.min.js"
import "tinymce/plugins/powerpaste/js/wordimport.js"
import './../../styles/ElementAuthoring/ElementAuthoring.css';
import { powerpaste_list_content_style } from '../../config/PowerPasteListElementCss';
import { handleImagePaste } from '../../constants/utility.js';
import { UnsupportedContentString } from '../../constants/ToolTip_Constant.js';
import * as slateWrapperConstants from "../SlateWrapper/SlateWrapperConstants.js";

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
    editorRef.current.addEventListener('blur', () => {
      focusPopupButtons();
    })
    return () => {
      tinymce.activeEditor?.destroy?.()
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
      editorFocus(editor)
      editorBlur(editor)
      editorClick(editor)
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
  console.log(data, 'gggxxx');
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
  console.log(data, 'postprocess');
  console.log('start');
  if (data.body) {
    // if you dont click inside the editor after pasting data first time and try to paste again by
    // pressing ctrl + v then this condition runs again so clearing the previous data of editor
    tinymce.get('myTextarea2').setContent('')

    const childNodes = data.body.children;
    const elements = [];
    createPastedElements(childNodes, elements);
    const updatedElements = []
    //preparing content that needs to be pasted
    data.body = prepareFinalPasteContent(elements,data.body,props)
    //preparing content that needs to send in API
    filterSupportedTagAndData(elements,updatedElements)

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
    // const parentIndex = props.index;
    if (updatedElements.length) {
      // props.toggleWordPasteProceed(true)
      // focusPopupButtons();
    }
    // props.onPowerPaste(updatedElements, parentIndex);
    // if valid data has been pasted in to editor once then make editor non-editable
    elements.length ? tinymce.activeEditor.getBody().setAttribute('contenteditable', false) : tinymce.activeEditor.getBody().setAttribute('contenteditable', true);
    let ccc=[];
    let indexOfInsertion = 0;
    updatedElements.forEach(pastedElement => {
      const newElement = {
          "html" : {
              text: pastedElement.html
          },
          ...slateWrapperConstants.elementDataByTag[pastedElement.tagName],
          index: indexOfInsertion++
      }
      ccc.push(newElement)
    })
    console.log('end111', ccc);
  }
}

/**
 * This function identifies unsupported content during paste from word
 * and replace that content with "Unsupported Content" message in text-editor
 * @param {array} elements
 * @param {Object} nodeData
 * @param {Object} props
 * @returns Content that needs to be pasted on text-editor
 */
export const prepareFinalPasteContent = (elements,nodeData,props) => {
  let isPreviousUnsupportedContent = false
  const spacesAndNewLineFormatArray = ["\n    ","\n  \n\n\n","\n   \n\n\n","\n\n\n"]
  const allSupUnsupChildNodes = nodeData.childNodes
  let contentToPaste = ""
  const elementsHtml = elements.map(item => {return item.html})
  for (let index = 0; index < allSupUnsupChildNodes.length; index++) {
    const element = allSupUnsupChildNodes[index];
    if(elementsHtml.includes(element.outerHTML)) {
      isPreviousUnsupportedContent = false
      let elementOuterHtml = element?.outerHTML
      if(element?.outerHTML?.match(/<img ([\w\W]+?)>/g)) {
        // if(!props.isPowerPasteInvalidContent) {
        //   props.checkInvalidPowerPasteContent(true)
        // }
        elementOuterHtml = element?.outerHTML?.replace(/<img ([\w\W]+?)>/g,UnsupportedContentString)
      }
      contentToPaste += elementOuterHtml
    } else if(!spacesAndNewLineFormatArray.includes(element?.data)){
      // if(!props.isPowerPasteInvalidContent) {
      //   props.checkInvalidPowerPasteContent(true)
      // }
      if(!isPreviousUnsupportedContent) {
        isPreviousUnsupportedContent = true
      contentToPaste += UnsupportedContentString
      }
    }
  }

  const updatedPasteContent = document.createElement('body');
  updatedPasteContent.innerHTML = contentToPaste;
  console.log(updatedPasteContent.innerHTML, '678');
  tinymce.get('myTextarea2').setContent(updatedPasteContent.innerHTML)
  return updatedPasteContent
}

/**
 * This function filters the supported powerpaste tags and remove images
 * from the content that needs to pass in powerpaste API as payload
 * @param {Array} elements
 * @param {array} updatedElements
 */
export const filterSupportedTagAndData = (elements,updatedElements) => {
  elements.forEach(item => {
   if(item.tagName !== 'IMG' && item?.html) {
     item.html = handleImagePaste(item.html)
     updatedElements.push(item)
   }
 })
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
          //commenting this code as when there is image in para, this code is converting whole
          //para into a image tag, which is creating an issue because image support is not provided
          // Note: Condition of Removing image from para is handled in filterSupportedTagAndData function
          // if (childElements[i].children.length && childElements[i].children[0].tagName === 'IMG') {
          //   let imgSrc = childElements[i].children[0].getAttribute('src');
          //   imgSrc = imgSrc ? imgSrc : childElements[i].children[0].getAttribute('data-image-src');
          //   elements.push({html: imgSrc, tagName: childElements[i].children[0].tagName});
          // } else {
            const paraNode = powerPasteHelpers.addParagraphClass(childElements[i]);
            elements.push({ html: paraNode.outerHTML, tagName: childElements[i].tagName });
          // }
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
          if(childElements[i].hasAttribute('style')){
            childElements[i].removeAttribute('style');
          }
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
    if (keyCode === 27) {
      const secondaryButton = document.querySelector(`[option=${SECONDARY_BUTTON}]`) ? document.querySelector(`[option=${SECONDARY_BUTTON}]`) : null;
      if (secondaryButton) {
        secondaryButton.click();
      }
    }
    if (!(keyCode === 86 && (e.ctrlKey || e.metaKey))) { //disabling editing and allowing pasting
      e.preventDefault()
      e.stopImmediatePropagation()
      return
    }
    editor.undoManager.clear() //disabling undo/redo
  });
}

/**
 * TinyMCE focus event listener
 * @param {*} editor tinyMCE editor instance
 */
export const editorFocus = (editor) => {
  editor.on('focus', () => {
    blurPopupButtons();
  });
}

/**
 * TinyMCE blur event listener
 * @param {*} editor tinyMCE editor instance
 */
export const editorBlur = (editor) => {
  editor.on('blur', () => {
    focusPopupButtons();
  });
}

/**
 * TinyMCE click event listener
 * @param {*} editor tinyMCE editor instance
 */
export const editorClick = (editor) => {
  editor.on('click', () => {
    if (editor.getContent()?.length === 0) {
      blurPopupButtons();
    } else {
      if (isPrimaryButtonFocused()) {
        focusElement(PRIMARY_BUTTON);
      } else if (isSecondaryButtonFocused()) {
        focusElement(SECONDARY_BUTTON);
      }
    }
  });
}
