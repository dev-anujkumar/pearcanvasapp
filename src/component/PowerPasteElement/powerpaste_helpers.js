export default {

  /**
   * Converts containing tag
   * @param {HTMLElement} node HTML element node object
   * @param {String} oldTag old tag to convert
   * @param {String} newTag new tag to to convert to
   */
  convertTag: function (node, oldTag, newTag) {
    let elems = node?.getElementsByTagName?.(oldTag) || [];
    let elemsArray = Array(...elems);
    elemsArray?.forEach((elem) => {
      let newElem = document.createElement(newTag);
      newElem.innerHTML = elem.innerHTML;
      elem.parentNode.replaceChild(newElem, elem);
    });
  },

  /**
   * Converts generic ordered list to Cypress formatted list
   * @param {HTMLElement} node HTML element node object
   * @param {Number} depth level of nesting
   */
  addOListClasses: function (node, depth) {
    if (node === null) {
      return;
    }

    if (node.tagName === "OL") {
      if (depth === 1 || depth === 4) {
        node.classList.add("decimal");
        node.setAttribute("style", "counter-increment: section 0");
      } else if (depth === 2) {
        node.classList.add("lower-alpha");
      } else if (depth === 3) {
        node.classList.add("lower-roman");
      }
      node.setAttribute("treelevel", depth++);
    } else if (node.tagName === "LI") {
      this.convertTag(node, "b", "strong"); //Transforms <b> to <strong>
      this.convertTag(node, "i", "em");     //Transforms <i> to <em>
      if (depth - 1 === 1) {
        node.classList.add("listItemNumeroUnoNumber");
      } else if (depth - 1 === 2) {
        if (!node.previousSibling) {
          node.classList.add("reset", "listItemNumeroUnoLowerAlpha");
        } else {
          node.classList.add("listItemNumeroUnoLowerAlpha");
        }
      } else if (depth - 1 === 3) {
        if (!node.previousSibling) {
          node.classList.add("reset", "listItemNumeroUnoLowerRoman");
        } else {
          node.classList.add("listItemNumeroUnoLowerRoman");
        }
      } else if (depth - 1 === 4) {
        if (!node.previousSibling) {
          node.classList.add("reset", "listItemNumeroUnoNumber");
        } else {
          node.classList.add("listItemNumeroUnoNumber");
        }
      }
      node.removeAttribute("style");
      node.removeAttribute("aria-level");
      node.removeAttribute("dir");
    }

    this.addOListClasses(node.firstElementChild, depth);
    this.addOListClasses(node.nextElementSibling, depth);
  },

  /**
   * Converts generic unordered list to Cypress formatted list
   * @param {HTMLElement} node HTML element node object
   * @param {Number} depth level of nesting
   */
  addUListClasses: function (node, depth) {
    if (node === null) {
      return;
    }

    if (node.tagName === "UL") {
      node.classList.add("disc");
      node.setAttribute("treelevel", depth++);
    } else if (node.tagName === "LI") {
      this.convertTag(node, "b", "strong"); //Transforms <b> to <strong>
      this.convertTag(node, "i", "em");     //Transforms <i> to <em>
      node.classList.add(
        "reset",
        "listItemNumeroUnoBullet",
        "listItemNumeroUnoDisc"
      );
    }

    this.addUListClasses(node.firstElementChild, depth);
    this.addUListClasses(node.nextElementSibling, depth);
  },

  /**
   * Adds cypress supported classes to the paragraph elements
   * @param {HTMLElement} paragraphNode HTML element node object
   */
  addParagraphClass: function (paragraphNode) {
    paragraphNode.classList.add("paragraphNumeroUno");
    this.convertTag(paragraphNode, "b", "strong"); //Transforms <b> to <strong>
    this.convertTag(paragraphNode, "i", "em");     //Transforms <i> to <em>
    return paragraphNode;
  },

  /**
   * Adds cypress supported classes to the heading elements
   * @param {HTMLElement} headingNode HTML element node object
   * @param {Number} headingLevel Heading level type
   */
  addHeadingClass: function (headingNode, headingLevel) {
    headingNode.classList.add(`heading${headingLevel}NummerEins`);
    this.convertTag(headingNode, "i", "em");     //Transforms <i> to <em>
    this.convertTag(headingNode, "b", "fragment"); //Transforms <b> to <fragment>
    this.convertTag(headingNode, "u", "fragment"); //Transforms <u> to <fragment>
    this.convertTag(headingNode, "s", "fragment"); //Transforms <s> to <fragment>
    headingNode.innerHTML = headingNode.innerHTML.replace(/<fragment>/g, "").replace(/<\/fragment>/g, "") //Removing <fragment> tag
    return headingNode;
  }
};
