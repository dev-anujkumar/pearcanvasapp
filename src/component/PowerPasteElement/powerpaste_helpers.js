export default {

  convertTag: function (node, oldTag, newTag) {
    let elems = node?.getElementsByTagName?.(oldTag) || [];
    let elemsArray = Array(...elems);
    elemsArray?.forEach((elem) => {
      let newElem = document.createElement(newTag);
      newElem.innerHTML = elem.innerHTML;
      elem.parentNode.replaceChild(newElem, elem);
    });
  },

  addOListClasses: function (node, depth) {
    if (node == null) {
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
      this.convertTag(node, "i", "em"); //Transforms <i> to <em>
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
      // if (node.children && node.children[0]) {
      //   const text = node.children[0].innerHTML;
      //   node.children[0].remove()
      //   node.innerHTML = text;
      // }
    }

    this.addOListClasses(node.firstElementChild, depth);
    this.addOListClasses(node.nextElementSibling, depth);
  },

  addUListClasses: function (node, depth) {
    if (node == null) {
      return;
    }

    if (node.tagName === "UL") {
      node.classList.add("disc");
      node.setAttribute("treelevel", depth++);
    } else if (node.tagName === "LI") {
      this.convertTag(node, "b", "strong"); //Transforms <b> to <strong>
      this.convertTag(node, "i", "em"); //Transforms <i> to <em>
      node.classList.add(
        "reset",
        "listItemNumeroUnoBullet",
        "listItemNumeroUnoDisc"
      );
    }

    this.addUListClasses(node.firstElementChild, depth);
    this.addUListClasses(node.nextElementSibling, depth);
  },

  addParagraphClass: function (paragraphNode) {
    paragraphNode.classList.add("paragraphNumeroUno");
    this.convertTag(paragraphNode, "b", "strong"); //Transforms <b> to <strong>
    this.convertTag(paragraphNode, "i", "em"); //Transforms <i> to <em>
    return paragraphNode;
  },

  addHeadingClass: function (headingNode, headingLevel) {
    headingNode.classList.add(`heading${headingLevel}NummerEins`);
    this.convertTag(headingNode, "b", "fragment"); //Transforms <b> to <strong>
    this.convertTag(headingNode, "u", "fragment"); //Transforms <i> to <em>
    this.convertTag(headingNode, "s", "fragment"); //Transforms <i> to <em>
    headingNode.innerHTML = headingNode.innerHTML.replace(/<fragment>/g, "").replace(/<\/fragment>/g, "")
    return headingNode;
  }
};
