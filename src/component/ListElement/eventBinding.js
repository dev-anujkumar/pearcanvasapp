/**
 * Module - eventBinding
 * Description - contain events for custom list drop button and list element editor
 */

// IMPORT - dependencies
require('./polyfills.js')

/* ------------------------------ START - List toolbar button methods ----------------------------- */
/**
 * insertUoListButton | inserts custom list button for unordered list with icon in existing editor toolbar
 */
export const insertUoListButton = (editor, onIconClick) => {
    editor.ui.registry.addButton('customUoListButton', {
        icon:"customuolistbutton",
        tooltip: 'Unordered List',
        onAction: () => {
            onIconClick('disc');
        }
    });
}

/**
 * insertListButton | inserts custom list button with icon in existing editor toolbar
 */
export const insertListButton = (editor) => {
    editor.ui.registry.addButton('customListButton', {
        icon:"customlistbutton",
        tooltip: 'Ordered List',
        onAction: () => {
            positionListDrop(event);
        }
    });
}

/**
 * positionListDrop | positions ListButtonDrop component below to list icon
 */
export const positionListDrop = (event) => {
    let _target = event.target;
    let { left: _targetLeft, width: _targetWidth } = _target.getBoundingClientRect();
    let _listWrapperDiv = document.querySelector('#listDropWrapper');
    // *** let { width: _wrapperWidth } = _listWrapperDiv.getBoundingClientRect(); *** //
    let _wrapperWidth = 275;  // static because dom remains hidden //
    let _offsetLeft = _targetLeft - (_wrapperWidth / 2) + (_targetWidth / 2);
    _listWrapperDiv.style.left = `${_offsetLeft}px`;
    if (!_listWrapperDiv.querySelector('.fr-popup').classList.contains('fr-active')) {
        _listWrapperDiv.querySelector('.fr-popup').classList.add('fr-active');
    }
}
/* ------------------------------ END - List toolbar button methods ----------------------------- */



/* ------------------------------ START - List customized events method ----------------------------- */
/**
 * bindKeyDownEvent | binds keydown event on editor instance and handles various scenarios
 */
export const bindKeyDownEvent = (editor, e, element,showHideCallback) => {
    const anchorNode = editor.selection.getSel().anchorNode;
    const newNode = anchorNode.closest('div.showHide');
    // let isOnlyMathmlFlag = false;
    const _selRange = editor.selection.getRng(true);
    const isMultilineSelection = _selRange.startContainer !== _selRange.endContainer;
    let listUpdatedOnce = false;
    let isOnlyListElement = element && element.type && element.type === "element-list" 
    let { olClass, treelevel, listType } = getListClassTypeAndTreeLvl(element)

    /**
     * [BG-818] and [BG-935] | at times @anchorNode points directly to 'div.cypress-editable',
     * and this happens only when element has only one empty li,
     * then element goes to create new paragraph element next to it
     */
    if (anchorNode.tagName === "DIV" && anchorNode.querySelectorAll('li').length === 1) {
        if ((e.metaKey && e.which === 13) || (e.which === 13)) {
            prohibitEventBubling(e);
            createNewParagraphElement(e, editor);
            return false;
        }
    }

    //------- later dependency ----------//
    if (anchorNode.innerHTML !== '<br>' &&
        e.target.closest('.divCodeSnippetFigure') &&
        e.target.closest('.code-listing')) {
        return false;
    }
    let nodeNames = ["STRONG", "EM", "U", "SUP", "SUB"]  /** [BG-2573] | Tagnames resulting in distorted List */
    /**
     * Case - pressing Enter on blank list item
     */
    if (anchorNode.tagName === "LI" || anchorNode.tagName === "BR" || (nodeNames.includes(anchorNode.tagName))) {
        if ((e.metaKey && e.which === 13) || (e.which === 13)) {
            // if only mathml image is present in editor //
            if ((editor.targetElm.textContent.length === 0) ||
                (editor.targetElm.innerHTML.indexOf('Wirisformula') != -1)) {
                // isOnlyMathmlFlag = true;
            }

            // creating new paragraph //
            let getChildSelection = anchorNode.children.length && anchorNode.children[0].tagName;
            if (getChildSelection === "IMG" || getChildSelection === "STRONG" || getChildSelection === "EM" || getChildSelection === "U") {
                prohibitEventBubling(e);
                return;
            }
            /**
             * Case - hit enter on last element of list
             * That is there will no sibling next to..
             */
            if (anchorNode.nextSibling === undefined || anchorNode.nextSibling === null) {
                /**
                 * Case - AND if that last element is at outermost level i.e, 'treelevel' == 1
                 */
                if ((anchorNode.closest('ol') && anchorNode.closest('ol').getAttribute('treelevel') === '1') ||
                    (anchorNode.closest('ul') && anchorNode.closest('ul').getAttribute('treelevel') === '1')) {
                    if (anchorNode.children[1] &&
                        (anchorNode.children[1].tagName === "OL" ||
                            anchorNode.children[1].tagName === "UL")) {
                        // isOnlyMathmlFlag = false;
                        prohibitEventBubling(e);
                        return false;
                    }
                    
                    prohibitEventBubling(e);
                    /** case - remove last created blank list row before creating new paragraph */
                    if (editor.targetElm.querySelectorAll('li').length > 1) {
                        /** [ BG-2573 ] | IF CASE :: List gets distorted when empty formatting tags are present */
                        if (nodeNames.includes(anchorNode.tagName)) {
                            let currentNode = anchorNode;
                            while (currentNode.nodeName !== "LI") {
                                if (currentNode.hasAttribute('data-mce-bogus') || currentNode.innerText.trim() == "" || (anchorNode.firstChild.nodeName ==
                                    'BR')) {
                                    currentNode = currentNode.parentNode
                                }
                            }
                            currentNode && currentNode.remove(); // Remove the "li" which contains empty tags
                        } else {
                            anchorNode && anchorNode.remove();
                        }
                    }
                
                    if(newNode)
                    {
                        showHideCallback()
                        return false
                    }
                    createNewParagraphElement(e, editor);
                    return false;
                }
                let timeoutInstance = setTimeout(() => {
                    clearTimeout(timeoutInstance);
                    updateNestedList(e.target);
                    listUpdatedOnce = true;
                    return false;
                });
            }
            /**
             * case - if current list item is in middle of row
             */
            else if (anchorNode.nextSibling && anchorNode.nextSibling.tagName === 'LI') {
                prohibitEventBubling(e);
                return;
            }
        }
    }

    /**
     * Case - if editor does not contain any list item 
     * then perform normal create Para elememt
     */
    if (editor.targetElm.querySelectorAll('li').length == 0) {
        if ((e.metaKey && e.which == 13) || (e.which == 13)) {
            prohibitEventBubling(e);
            // createNewParagraphElement(e, editor);
            return false;
        }
    }

    const sel = editor.selection.getSel();
    let atEnd = false;

    if (sel.anchorNode.data && sel.anchorNode.data.length == sel.focusOffset) {
        atEnd = true;
    }

    /**
     * Facilitate indent feature at end of text on TAB key
     */
    if (atEnd && e.which == 9 && !e.shiftKey) {
        isOnlyListElement && editor.editorCommands.commands.exec.indent();      // In case of List
        !isOnlyListElement && editor.execCommand('indent')                      // Other then List
    }
    /**
     * Facilitate indent feature at end of text on shift+TAB key
     */
    if (atEnd && e.which == 9 && e.shiftKey) {
        isOnlyListElement && editor.editorCommands.commands.exec.outdent()          // In case of List
        !isOnlyListElement && editor.execCommand('outdent')                         // Other then List
    }

    let isBackspaceOnStart = false
    if (isOnlyListElement && (e.which === 8) && (editor.selection.getSel().focusOffset === 0)) {
        let closestLi = (anchorNode.tagName === 'LI') ? anchorNode : anchorNode.closest('li');
        let closestLiOl = closestLi.closest('ol') || closestLi.closest('ul');
        if (closestLiOl.findChildren('li').indexOf(closestLi) === 0) {
            isBackspaceOnStart = true
        }
    }
    /**
     * Facilitate TAB key on list
     */
    if ((e.which == 9 || isBackspaceOnStart) && anchorNode.closest('li')) {
        if (isFullRangeSelected(editor)) {
            prohibitEventBubling(e)
            return false
        }

        let currentLevel = (anchorNode.closest('ol') && anchorNode.closest('ol').getAttribute('treelevel')) || (anchorNode.closest('ul') && anchorNode.closest('ul').getAttribute('treelevel'));
        let updatelistFlag = true;

        // prevent tab indent event at last level of list tree //
        if (!e.shiftKey && e.which !== 8) {
            /**
             * Case - cursor at last level
             */
            if (currentLevel == 4) {
                prohibitEventBubling(e);
                return false;
            }
            /**
             * Case - hit TAB at any first list item irrespective of levels
             * if is is first item then prevent default
             */
            let closestLi = (anchorNode.tagName === 'LI') ? anchorNode : anchorNode.closest('li');
            let closestLiOl = closestLi.closest('ol') || closestLi.closest('ul');
            if (closestLiOl.findChildren('li').indexOf(closestLi) === 0) {
                prohibitEventBubling(e);
                return false;
            }
        }
        /**
         * Case - hit Shift+TAB at a level where it has immediate childs, i.e li > ol > li,li
         * and provided it is not on a multiline selection
         * Then shift this level one level up along with all its child
         * finally perform updateNestedList
         */
        else if ((e.shiftKey || e.which === 8) && !isMultilineSelection) {
            let closestLi = (anchorNode.tagName === 'LI') ? anchorNode : anchorNode.closest('li');
            let closestTreeLevel = (anchorNode.closest('ol') && anchorNode.closest('ol').getAttribute('treelevel') || anchorNode.closest('ul') && anchorNode.closest('ul').getAttribute('treelevel'));
            /**
             * Case - prevent hitting Shift+TAB on very first list tree level
             */
            if (closestTreeLevel === '1') {
                prohibitEventBubling(e);
                // updatelistFlag = false;
                return false;
            }

            if ((closestLi.findChildren('ol').length > 0) || (closestLi.findChildren('ul').length > 0)) {
                closestLi.classList.add('shfTabEvnt');
                updatelistFlag = false;
                let timeoutInstance = setTimeout(() => {
                    clearTimeout(timeoutInstance);
                    let allOlElems = document.querySelector('li.shfTabEvnt').querySelectorAll('ol').length &&
                        document.querySelector('li.shfTabEvnt').querySelectorAll('ol') ||
                        document.querySelector('li.shfTabEvnt').querySelectorAll('ul');
                    let firstOlElem = allOlElems[0];
                    let firstLi = [...firstOlElem.children].slice(0, 1)[0];
                    let levelUpOL = firstLi.findChildren('ol')[0] || firstLi.findChildren('ul')[0];
                    let liSiblings = [...firstOlElem.children].slice(1);
                    levelUpOL.append(...liSiblings);
                    document.querySelector('li.shfTabEvnt').querySelectorAll('ol')[0] && document.querySelector('li.shfTabEvnt').querySelectorAll('ol')[0].remove();
                    document.querySelector('li.shfTabEvnt').querySelectorAll('ul')[0] && document.querySelector('li.shfTabEvnt').querySelectorAll('ul')[0].remove();
                    document.querySelector('li.shfTabEvnt').append(levelUpOL);
                    document.querySelector('li.shfTabEvnt').classList.remove('shfTabEvnt');
                    updateNestedList(e.target);
                    listUpdatedOnce = true;
                });
            }
        }
        // prohibitEventBubling(e);
        if (updatelistFlag) {
            let timeoutInstance = setTimeout(() => {
                clearTimeout(timeoutInstance);
                reformatting(editor)
            });
        }
    }

    let firstChild = editor.targetElm.childNodes[0];
    if (isOnlyListElement && e.which === 13 && firstChild.nodeName !== "PRE") {
        // prohibitEventBubling(e);
        /**
         * Case - hit enter on last element of list
         * That is a sibling next to it.., then do not perform anything
         */
        if (anchorNode.nextSibling !== null &&
            (anchorNode.nextSibling.tagName === "OL" ||
                anchorNode.nextSibling.tagName === "UL" ||
                (anchorNode.nextSibling.tagName === 'BR' &&
                    (anchorNode.nextSibling.nextSibling.tagName === "OL" ||
                        anchorNode.nextSibling.nextSibling.tagName === "UL")))) {
            prohibitEventBubling(e);
            return false;
        }
        if (anchorNode.nextSibling !== null) {
            let closestLi = (anchorNode.tagName === 'LI') ? anchorNode : anchorNode.closest('li');
            if (closestLi.findChildren('ol').length > 0 || closestLi.findChildren('ul').length > 0) {
                prohibitEventBubling(e);
                return false;
            }
        }
        // else update list content //
        let timeoutInstance = setTimeout(() => {
            clearTimeout(timeoutInstance);
            updateNestedList(e.target);
            listUpdatedOnce = true;
            return false;
        });
    }
    if (isOnlyListElement && !listUpdatedOnce) {
        let timeoutInstance = setTimeout(() => {
            clearTimeout(timeoutInstance);
            createDefaultOlLi(treelevel, olClass, listType, e.target);
            updateNestedList(e.target);
            return false;
        });
    }
    if (isOnlyListElement && e.keyCode == 90 && e.ctrlKey) {
        let timeoutInstance = setTimeout(() => {
            clearTimeout(timeoutInstance);
            reformatting(editor)
        });
    }

}

const reformatting = (editor) => {
    let allLiElement = editor.targetElm.querySelectorAll('li')
    let getSelfInnerText = (elememt) => {
        return [].reduce.call(elememt.childNodes, function (a, b) {
            return a + (b.nodeType === 3 ? b.textContent : '');
        }, '');
    }
    for (let i = 0; i < allLiElement.length; i++) {
        let currentLi = allLiElement[i]
        if ((currentLi.findChildren('ol').length > 0) || (currentLi.findChildren('ul').length > 0)) {

            let selfInnerText = getSelfInnerText(currentLi)
            let firstChildTag = currentLi.children[0].tagName

            if (selfInnerText === "" && firstChildTag !== "BR") {
                let parentOl = currentLi.parentNode
                let closestLi = parentOl.closest('li')
                if ((closestLi.findChildren('ol').length > 0) || (closestLi.findChildren('ul').length > 0)) {
                    closestLi.classList.add('shfTabEvnt');
                    let allOlElems = document.querySelector('li.shfTabEvnt').querySelectorAll('ol').length &&
                        document.querySelector('li.shfTabEvnt').querySelectorAll('ol') ||
                        document.querySelector('li.shfTabEvnt').querySelectorAll('ul');
                    let firstOlElem = allOlElems[0];
                    let firstLi = [...firstOlElem.children].slice(0, 1)[0];
                    let levelUpOL = firstLi.findChildren('ol')[0] || firstLi.findChildren('ul')[0];
                    let liSiblings = [...firstOlElem.children].slice(1);
                    levelUpOL.append(...liSiblings);
                    document.querySelector('li.shfTabEvnt').querySelectorAll('ol')[0] && document.querySelector('li.shfTabEvnt').querySelectorAll('ol')[0].remove();
                    document.querySelector('li.shfTabEvnt').querySelectorAll('ul')[0] && document.querySelector('li.shfTabEvnt').querySelectorAll('ul')[0].remove();
                    document.querySelector('li.shfTabEvnt').append(levelUpOL);
                    document.querySelector('li.shfTabEvnt').classList.remove('shfTabEvnt');
                    updateNestedList(editor.targetElm);
                }
            }
        }
    }
}

/**
 * updateNestedList | takes care of formatting of list from very top
 * @param {*} element | target element
 */
export const updateNestedList = (element) => {
    let decimalOlClassList = ['decimal', 'lower-alpha', 'lower-roman', 'decimal'];
    let decimalLiClassList = ['listItemNumeroUnoNumber', 'listItemNumeroUnoLowerAlpha', 'listItemNumeroUnoLowerRoman', 'listItemNumeroUnoNumber'];

    let upperAlphaClassList = ['upper-alpha', 'lower-alpha', 'lower-roman', 'decimal'];
    let upperAlphaLiClassList = ['listItemNumeroUnoUpperAlpha', 'listItemNumeroUnoLowerAlpha', 'listItemNumeroUnoLowerRoman', 'listItemNumeroUnoNumber']

    let lowerAlphaClassList = ['lower-alpha', 'lower-roman', 'decimal', 'lower-alpha'];
    let lowerAlphaLiClassList = ['listItemNumeroUnoLowerAlpha', 'listItemNumeroUnoLowerRoman', 'listItemNumeroUnoNumber', 'listItemNumeroUnoLowerAlpha'];

    let upperRomanClassList = ['upper-roman', 'upper-alpha', 'decimal', 'lower-alpha'];
    let upperRomanLiClassList = ['listItemNumeroUnoUpperRoman', 'listItemNumeroUnoUpperAlpha', 'listItemNumeroUnoNumber', 'listItemNumeroUnoLowerAlpha'];

    let lowerRomanClassList = ['lower-roman', 'lower-alpha', 'decimal', 'lower-roman'];
    let lowerRomanLiClassList = ['listItemNumeroUnoLowerRoman', 'listItemNumeroUnoLowerAlpha', 'listItemNumeroUnoNumber', 'listItemNumeroUnoLowerRoman'];

    let UlClassList = ['disc', 'square', 'circle', 'disc'];
    let UlLiClassList = ['listItemNumeroUnoDisc', 'listItemNumeroUnoSquare', 'listItemNumeroUnoCircle', 'listItemNumeroUnoDisc'];

    let allOlElement = element.querySelectorAll('ol');
    if (allOlElement.length == 0) {
        allOlElement = element.querySelectorAll('ul');
    }
    let treelevel = parseInt(allOlElement[0].getAttribute('treelevel'));
    let olClass = allOlElement[0].getAttribute('class') || 'disc';
    for (let i = 0; i < allOlElement.length; i++) {
        allOlElement[i].classList.add(olClass);
        let parentTreeLevel = allOlElement[i].parents('ol') && allOlElement[i].parents('ol').getAttribute('treelevel') || undefined;
        if (parentTreeLevel == undefined) {
            parentTreeLevel = allOlElement[i].parents('ul') && allOlElement[i].parents('ul').getAttribute('treelevel') || undefined;
        }
        if (parentTreeLevel) {
            treelevel = parseInt(parentTreeLevel) + 1;
        }
        allOlElement[i].setAttribute('treelevel', treelevel);
        allOlElement[i].removeAttribute('data-mce-style');
        if (treelevel > 1) {
            allOlElement[i].style.counterIncrement = null;
        }
        let childLielement = allOlElement[i].children;

        allOlElement[i].removeAllClass();
        [...childLielement].forEach((elem) => { elem.removeAllClass() });
        if (allOlElement[i].getCss("counter-increment") == 'none') {
            childLielement[0].classList.add('reset');
        }

        if (treelevel > 4) {
            return;
        }

        switch (olClass) {
            case "decimal":
                allOlElement[i].classList.add(decimalOlClassList[treelevel - 1]);
                [...childLielement].forEach((elem) => { elem.classList.add(decimalLiClassList[treelevel - 1]) });
                break;
            case "upper-alpha":
                allOlElement[i].classList.add(upperAlphaClassList[treelevel - 1]);
                [...childLielement].forEach((elem) => { elem.classList.add(upperAlphaLiClassList[treelevel - 1]) });
                break;
            case "lower-alpha":
                allOlElement[i].classList.add(lowerAlphaClassList[treelevel - 1]);
                [...childLielement].forEach((elem) => { elem.classList.add(lowerAlphaLiClassList[treelevel - 1]) });
                break;
            case "upper-roman":
                allOlElement[i].classList.add(upperRomanClassList[treelevel - 1]);
                [...childLielement].forEach((elem) => { elem.classList.add(upperRomanLiClassList[treelevel - 1]) });
                break;
            case "lower-roman":
                allOlElement[i].classList.add(lowerRomanClassList[treelevel - 1]);
                [...childLielement].forEach((elem) => { elem.classList.add(lowerRomanLiClassList[treelevel - 1]) });
                break;
            case "none":
                allOlElement[i].classList.add('none');
                [...childLielement].forEach((elem) => { elem.removeAllClass() });
                [...childLielement].forEach((elem) => { elem.classList.add('listItemNumeroUnoNone') });
                childLielement[0].classList.add('reset');
                break;
            case "disc":
            default:
                allOlElement[i].classList.add('disc');
                //allOlElement[i].classList.add(UlClassList[treelevel - 1]);
                [...childLielement].forEach((elem) => { elem.classList.add('listItemNumeroUnoBullet') });
                [...childLielement].forEach((elem) => { elem.classList.add(UlLiClassList[treelevel - 1]) });
                break;
        }
        treelevel = treelevel + 1;
    }
    if (allOlElement[i] && allOlElement[i].getCss("counter-increment") == 'none') {
        for (var i = 0; i < liClasses.length; i++) {
            if (liClasses[i] && liClasses[i].indexOf('reset') && liClasses[i].indexOf('reset') !== -1) {
                lis[i].classList.add("reset");
            }
        }
    }
}

export const removeTinyDefaultAttribute = (element) => {
    let allOlElement = element && element.querySelectorAll('ol') || [];
    if (allOlElement.length == 0) {
        allOlElement = element && element.querySelectorAll('ul') || [];
    }
    for (let i = 0; i < allOlElement.length; i++) {
        allOlElement[i].removeAttribute('data-mce-style');
    }
}

const createNewParagraphElement = (e, editor) => {
    let activeEditor = document.getElementById(tinymce.activeEditor.id).closest('.editor');
    let nextSaparator = activeEditor.nextSibling;
    let textPicker = nextSaparator.querySelector('#myDropdown li > .text-elem');
    textPicker.click();
}

const prohibitEventBubling = (e) => {
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();
}

export const preventRemoveAllFormatting = (editor) => {
    return true
}

const isFullRangeSelected = (editor) => {
    let range = editor.selection.getRng()
    let starLiElem = (range.startContainer.tagName === 'LI') ? range.startContainer : range.startContainer.closest('li')
    let endLiElem = (range.endContainer.tagName === 'LI') ? range.endContainer : range.endContainer.closest('li')
    let allLiElements = editor.targetElm.querySelectorAll('li')
    let isSelectedFullRange = ([].indexOf.call(allLiElements, starLiElem) === 0 && [].indexOf.call(allLiElements, endLiElem) === allLiElements.length - 1) ||
        ([].indexOf.call(allLiElements, endLiElem) === 0 && [].indexOf.call(allLiElements, starLiElem) === allLiElements.length - 1)
    if (isSelectedFullRange) {
        return true
    }
    return false
}

const getListClassTypeAndTreeLvl = (element) => {
    let olClass = "disc", listType = "ul"
    if (element && element.subtype && element.subtype !== "disc") {
        listType = "ol";
        olClass = element.subtype
    }
    return { treelevel: 1, olClass, listType }
}

const createDefaultOlLi = (treelevel, olClass, listType, element) => {
    if (element.querySelectorAll(listType).length === 0 || element.querySelector(listType).querySelectorAll('li').length === 0) {
        let olEle = document.createElement(listType)
        olEle.classList.add(olClass)
        olEle.setAttribute('treelevel', treelevel)
        let liEle = document.createElement('li')
        liEle.append(document.createElement('br'))
        olEle.append(liEle)
        element.innerHTML = ""
        element.append(olEle)
    }
}
/* ------------------------------ END - List customized events method ----------------------------- */