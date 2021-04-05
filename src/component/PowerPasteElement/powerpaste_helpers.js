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
   * Removes nesting beyond 4 levels
   * @param {*} ulNode UL/OL HTML node
   * @param {*} listType OL or UL
   * @returns 
   */
  removeExtraNesting: function (ulNode, listType) {
    const ulTags = ulNode?.getElementsByTagName?.(listType)
    if (ulTags?.length) {
      this.convertTag(ulNode, listType, "fragment")
      this.removeFragment(ulNode)
      this.removeExtraNesting(ulNode, listType)
    }
    else {
      return
    }
  },

  /**
   * Replaces <fragment> content with plain text
   * @param {*} node 
   */
  removeFragment: (node) => {
    node.innerHTML = node.innerHTML
      .replace(/<fragment>/g, "")
      .replace(/<\/fragment>/g, ""); //Removing <fragment> tag
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
      if (depth === 4) {
        const domParser = new DOMParser()
        let ulNode = domParser.parseFromString(node.innerHTML, "text/html").body
        this.removeExtraNesting(ulNode, "ol")
        node.innerHTML = ulNode.innerHTML
      }
      switch (depth) {
        case 1:
        case 4:
          node.classList.add("decimal");
          break;
        case 2:
          node.classList.add("lower-alpha");
          break;
        case 3:
          node.classList.add("lower-roman");
          break;
      }

      node.setAttribute("treelevel", depth++);
      node.innerHTML = node.innerHTML.replace(/\r?\n|\r/g, " ").trim()
    } else if (node.tagName === "LI") {
      this.convertTag(node, "b", "strong"); //Transforms <b> to <strong>
      this.convertTag(node, "i", "em"); //Transforms <i> to <em>
      this.convertTag(node, "a", "fragment"); //Transforms <a> to <fragment>
      node.innerHTML = node.innerHTML.replace(/\r?\n|\r/g, " ")
      this.removeFragment(node)

      const mainDepth = depth - 1;

      switch (mainDepth) {
        case 1:
          node.classList.add("listItemNumeroUnoNumber");
          break;
        case 2:
          if (!node.previousSibling) {
            node.classList.add("reset", "listItemNumeroUnoLowerAlpha");
          } else {
            node.classList.add("listItemNumeroUnoLowerAlpha");
          }
          break;
        case 3:
          if (!node.previousSibling) {
            node.classList.add("reset", "listItemNumeroUnoLowerRoman");
          } else {
            node.classList.add("listItemNumeroUnoLowerRoman");
          }
          break;
        case 4:
          if (!node.previousSibling) {
            node.classList.add("reset", "listItemNumeroUnoNumber");
          } else {
            node.classList.add("listItemNumeroUnoNumber");
          }
          break;
      }

      node.removeAttribute("style");
      node.removeAttribute("aria-level");
      node.removeAttribute("dir");
    }

    this.addOListClasses(node.firstElementChild, depth);
    this.addOListClasses(node.nextElementSibling, depth);
  },


  /**
   * Converts generic ordered list to Cypress formatted list
   * @param {HTMLElement} node HTML element node object
   * @param {Number} depth level of nesting
   */
  addSpecificOListClasses: function (firstNode, node, depth) {
    if (node === null) {
      return;
    }

    if (node.tagName === "OL") {
      if (depth === 4) {
        const domParser = new DOMParser()
        let ulNode = domParser.parseFromString(node.innerHTML, "text/html").body
        this.removeExtraNesting(ulNode, "ol")
        node.innerHTML = ulNode.innerHTML
      }

      let firstDepthOuterNodeClass = "";
      let secondDepthOuterNodeClass = "";
      let thirdDepthOuterNodeClass = "";
      let fourthDepthOuterNodeClass = "";
      let firstDepthLiNodesClass = "";
      let secondDepthLiNodesClass = "";
      let thirdDepthLiNodesClass = "";
      let fourthDepthLiNodesClass = "";


      const firstNodeStyleType = firstNode.getAttribute("style");
      switch (firstNodeStyleType) {
        case "list-style-type:lower-alpha;":
          firstDepthOuterNodeClass = "lower-alpha";
          firstDepthLiNodesClass = "listItemNumeroUnoLowerAlpha";

          secondDepthOuterNodeClass = "lower-roman";
          secondDepthLiNodesClass = "listItemNumeroUnoLowerRoman";

          thirdDepthOuterNodeClass = "decimal";
          thirdDepthLiNodesClass = "listItemNumeroUnoNumber";

          fourthDepthOuterNodeClass = "lower-alpha";
          fourthDepthLiNodesClass = "listItemNumeroUnoLowerAlpha";
          break;
        case "list-style-type:upper-alpha;":
          firstDepthOuterNodeClass = "upper-alpha";
          firstDepthLiNodesClass = "listItemNumeroUnoUpperAlpha";

          secondDepthOuterNodeClass = "lower-alpha";
          secondDepthLiNodesClass = "listItemNumeroUnoLowerAlpha";

          thirdDepthOuterNodeClass = "lower-roman";
          thirdDepthLiNodesClass = "listItemNumeroUnoLowerRoman";

          fourthDepthOuterNodeClass = "decimal";
          fourthDepthLiNodesClass = "listItemNumeroUnoNumber";
          break;
        case "list-style-type:lower-roman;":
          firstDepthOuterNodeClass = "lower-roman";
          firstDepthLiNodesClass = "listItemNumeroUnoLowerRoman";

          secondDepthOuterNodeClass = "lower-alpha";
          secondDepthLiNodesClass = "listItemNumeroUnoLowerAlpha";

          thirdDepthOuterNodeClass = "decimal";
          thirdDepthLiNodesClass = "listItemNumeroUnoNumber";

          fourthDepthOuterNodeClass = "lower-roman";
          fourthDepthLiNodesClass = "listItemNumeroUnoLowerRoman";
          break;
        case "list-style-type:upper-roman;":
          firstDepthOuterNodeClass = "upper-roman";
          firstDepthLiNodesClass = "listItemNumeroUnoUpperRoman";

          secondDepthOuterNodeClass = "upper-alpha";
          secondDepthLiNodesClass = "listItemNumeroUnoUpperAlpha";

          thirdDepthOuterNodeClass = "decimal";
          thirdDepthLiNodesClass = "listItemNumeroUnoNumber";

          fourthDepthOuterNodeClass = "lower-alpha";
          fourthDepthLiNodesClass = "listItemNumeroUnoLowerAlpha";
          break;
        default :
          firstDepthOuterNodeClass = "decimal";
          firstDepthLiNodesClass = "listItemNumeroUnoNumber";

          secondDepthOuterNodeClass = "lower-alpha";
          secondDepthLiNodesClass = "listItemNumeroUnoLowerAlpha";

          thirdDepthOuterNodeClass = "lower-roman";
          thirdDepthLiNodesClass = "listItemNumeroUnoLowerRoman";

          fourthDepthOuterNodeClass = "decimal";
          fourthDepthLiNodesClass = "listItemNumeroUnoNumber";
          break;
      }


      switch (depth) {
        case 1:
          node.classList.add(firstDepthOuterNodeClass);
          this.addSpecificClassToChildNodes(node, firstDepthLiNodesClass, depth);
          break;
        case 2:
          node.classList.add(secondDepthOuterNodeClass);
          this.addSpecificClassToChildNodes(node, secondDepthLiNodesClass, depth);
          break;
        case 3:
          node.classList.add(thirdDepthOuterNodeClass);
          this.addSpecificClassToChildNodes(node, thirdDepthLiNodesClass, depth);
          break;
        case 4:
          node.classList.add(fourthDepthOuterNodeClass);
          this.addSpecificClassToChildNodes(node, fourthDepthLiNodesClass, depth);
          break;
      }

      node.setAttribute("treelevel", depth++);
      node.innerHTML = node.innerHTML.replace(/\r?\n|\r/g, " ").trim();
      if ((depth - 1) !== 1) {
        node.removeAttribute("style");
      }
    }

    this.addSpecificOListClasses(firstNode, node.firstElementChild, depth);
    if (node.nextElementSibling !== null && node.nextElementSibling?.tagName === "OL") {
      depth = 1;
      this.addSpecificOListClasses(node.nextElementSibling, node.nextElementSibling, depth);
    } else {
      this.addSpecificOListClasses(firstNode, node.nextElementSibling, depth);
    }

  },


  addSpecificClassToChildNodes: function (node, childNodeClass, depth) {
    Array.from(node.children).forEach((childNode) => {
      if (depth == 1) {
        childNode.classList.add(childNodeClass);
      } else {
        if (!childNode.previousElementSibling) {
          childNode.classList.add("reset", childNodeClass);
        } else {
          childNode.classList.add(childNodeClass);
        }
      }

      this.convertTag(childNode, "b", "strong"); //Transforms <b> to <strong>
      this.convertTag(childNode, "i", "em"); //Transforms <i> to <em>
      this.convertTag(childNode, "a", "fragment"); //Transforms <a> to <fragment>
      childNode.innerHTML = childNode.innerHTML.replace(/\r?\n|\r/g, " ")
      this.removeFragment(childNode);
      childNode.removeAttribute("style");
      childNode.removeAttribute("aria-level");
      childNode.removeAttribute("dir");
    });
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
    node.removeAttribute("style");
    if (node.tagName === "UL") {
      node.classList.add("disc");
      if (depth === 4) {
        const domParser = new DOMParser()
        let ulNode = domParser.parseFromString(node.innerHTML, "text/html").body
        this.removeExtraNesting(ulNode, "ul")
        node.innerHTML = ulNode.innerHTML
      }
      node.setAttribute("treelevel", depth++);
      node.innerHTML = node.innerHTML.replace(/\r?\n|\r/g, " ").trim()
    } else if (node.tagName === "LI" && node.parentElement.tagName !== "OL") {
      this.convertTag(node, "b", "strong"); //Transforms <b> to <strong>
      this.convertTag(node, "i", "em"); //Transforms <i> to <em>
      this.convertTag(node, "a", "fragment"); //Transforms <a> to <fragment>
      this.removeFragment(node)
      node.innerHTML = node.innerHTML.replace(/\r?\n|\r/g, " ");
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
    this.convertTag(paragraphNode, "i", "em"); //Transforms <i> to <em>
    this.convertTag(paragraphNode, "a", "fragment"); //Transforms <a> to <fragment>
    this.removeFragment(paragraphNode)
    paragraphNode.innerHTML = paragraphNode.innerHTML.replace(/\r?\n|\r/g, " ")
    return paragraphNode;
  },

  /**
   * Adds cypress supported classes to the heading elements
   * @param {HTMLElement} headingNode HTML element node object
   * @param {Number} headingLevel Heading level type
   */
  addHeadingClass: function (headingNode, headingLevel) {
    headingNode.classList.add(`heading${headingLevel}NummerEins`);
    ["b", "u", "s", "i", "a"].forEach((oldTag) => {
      if (oldTag === "i") {
        this.convertTag(headingNode, oldTag, "em");
      } else {
        this.convertTag(headingNode, oldTag, "fragment");
      }
    });
    this.removeFragment(headingNode)
    headingNode.innerHTML = headingNode.innerHTML.replace(/\r?\n|\r/g, " ")
    return headingNode;
  },
};
