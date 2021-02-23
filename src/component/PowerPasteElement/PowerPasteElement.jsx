import React, { Component } from 'react'
import PropTypes, { element } from 'prop-types'
import tinymce from 'tinymce/tinymce';
import "tinymce/plugins/lists";
import "tinymce/plugins/advlist";
import "tinymce/plugins/paste";
import "tinymce/plugins/visualblocks";
import './../../styles/ElementAuthoring/ElementAuthoring.css';
export class PowerPasteElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pastedData: {}
    }
    this.editorConfig = {
      height: 400,
      menubar: true,
      plugins: [
        'advlist lists',
       'powerpaste',
      //  'powerpaste wordcount visualblocks'
      ],
      toolbar: false,
      menubar: false,
      branding: false,
      statusbar:false,
      powerpaste_allow_local_images: true,
      powerpaste_word_import: 'clean',
      powerpaste_html_import: 'clean',
      visualblocks_default_state: true,
        // paste_preprocess: this.pastePreProcess,
      paste_postprocess: this.pastePostProcess
    }
    this.editorRef = React.createRef();
  }

  componentDidMount() {
    if (this.editorRef.current) {
      this.editorConfig.selector = "#" + this.editorRef.current.id;
      setTimeout(()=>{
        this.editorRef.current.focus();
      },0)
    }
    tinymce.init(this.editorConfig)

  }


  pastePostProcess = (plugin, data) => {
    let paste_content = data.node;
    console.log('Conten >>>>>', paste_content, 'mode >>>', data.mode, data.source);
    if (data.node) {
      const childNodes = data.node.children;
      const elements = [];
      if (childNodes.length === 1 && (childNodes[0].tagName === 'STRONG' || childNodes[0].tagName === 'GOOGLE-SHEETS-HTML-ORIGIN')) {
        const childElements = childNodes[0].children && childNodes[0].children.length ? childNodes[0].children : [];
        this.createPastedElements(childElements, elements);
      } else if (childNodes.length >= 1) {
        let childElements;
        if (data.source === 'googledocs' && childNodes.length === 2 && childNodes[1].tagName === 'BR') {
          childElements = childNodes[0].children;
        } else {
          childElements = childNodes;
        }
        this.createPastedElements(childElements, elements);
      }
      console.log(elements);
      const parentIndex = this.props.index;
      this.props.onPowerPaste(elements, parentIndex);
    }
    
  }

  addParagraphClass = (paragraphNode) => {
    paragraphNode.classList.add('paragraphNumeroUno');
    return paragraphNode;
  }

  addHeadingClass = (headingNode, headingLevel) => {
    headingNode.classList.add(`heading${headingLevel}NummerEins`);
    return headingNode;
  }

  addUListClasses = (node, depth) => {

    if (node == null) {
      return;
    }
  
    if (node.tagName === 'UL') {
      node.classList.add('disc');
      node.setAttribute('treelevel', depth++);
    } else if (node.tagName === 'LI') {
      node.classList.add("reset", "listItemNumeroUnoBullet", "listItemNumeroUnoDisc") ;
    }
  
    this.addUListClasses(node.firstElementChild, depth);
    this.addUListClasses(node.nextElementSibling, depth);
  }

  addOListClasses = (node, depth) => {

    if (node == null) {
      return;
    }
  
    if (node.tagName === 'OL') {
      if (depth === 1 || depth === 4) {
        node.classList.add('decimal');
        node.setAttribute('style', 'counter-increment: section 0');
      } else if (depth === 2) {
        node.classList.add('lower-alpha');
      } else if (depth === 3) {
        node.classList.add('lower-roman');
      }
      node.setAttribute('treelevel', depth++);
    } else if (node.tagName === 'LI') {
      if (depth-1 === 1) {
        node.classList.add("listItemNumeroUnoNumber");
      } else if (depth-1 === 2) {
        if (!node.previousSibling) {
          node.classList.add("reset", "listItemNumeroUnoLowerAlpha");
        } else {
          node.classList.add("listItemNumeroUnoLowerAlpha");
        }
      } else if (depth-1 === 3) {
        if (!node.previousSibling) {
          node.classList.add("reset", "listItemNumeroUnoLowerRoman");
        } else {
          node.classList.add("listItemNumeroUnoLowerRoman");
        }
      } else if (depth-1 === 4) {
        if (!node.previousSibling) {
          node.classList.add("reset", "listItemNumeroUnoNumber");
        } else {
          node.classList.add("listItemNumeroUnoNumber");
        }
      }
      node.removeAttribute('style');
      node.removeAttribute('aria-level');
      node.removeAttribute('dir');
      // if (node.children && node.children[0]) {
      //   const text = node.children[0].innerHTML;
      //   node.children[0].remove()
      //   node.innerHTML = text;
      // }
    }
  
    this.addOListClasses(node.firstElementChild, depth);
    this.addOListClasses(node.nextElementSibling, depth);
  }

  checkForInvalidParentTag = (tag) => {
    const invalidParentTags = ['b','u','i','sub', 'sup'];
    return !(invalidParentTags.indexOf(tag) > -1) && HTML_TAGS.indexOf(tag) > -1;
  }

  createPastedElements(childElements, elements) {
    for (let i = 0; i < childElements.length; i++) {
      if (childElements[i].tagName === 'P') {
        if (childElements[i].children.length && childElements[i].children[0].tagName === 'IMG') {
          let src = childElements[i].children[0].getAttribute('src');
          src = src ? src : childElements[i].children[0].getAttribute('data-image-src');
          elements.push({html: src, tagName: childElements[i].children[0].tagName});
        } else {
          const node = this.addParagraphClass(childElements[i]);
          elements.push({ html: node.outerHTML, tagName: childElements[i].tagName });
        }

      } else if (childElements[i].tagName === 'UL') {
        this.addUListClasses(childElements[i], 1);
        elements.push({ html: childElements[i].outerHTML, tagName: childElements[i].tagName });
      } else if (childElements[i].tagName === 'OL') {
        this.addOListClasses(childElements[i], 1);
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
        const node = this.addHeadingClass(childElements[i], childElements[i].tagName[1]);
        elements.push({ html: node.outerHTML, tagName: childElements[i].tagName });
      }
    }
  }

  render() {
     return (
      <>
        <p ref={this.editorRef} contentEditable="true" id={`textarea-${this.props.index}`} dangerouslySetInnerHTML={{ __html: '' }} ></p>
      </>
    )

    
  }
}

export default PowerPasteElement