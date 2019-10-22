/**
 * Module - eventBinding
 * Description - contain events for custom list drop button and list element editor
 * Developer - Abhay Singh
 * Last modified - 24-09-2019
 */

// IMPORT - dependencies
require('./polyfills.js')

/**
 * insertListButton | inserts custom list button with icon in existing editor toolbar
 */
export const insertListButton = (editor) => {
    editor.ui.registry.addButton('customListButton', {
        text: '<i class="fa fa-list-ol" aria-hidden="true"></i>',
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

/**
 * bindKeyDownEvent | binds keydown event on editor instance and handles various scenarios
 */
export const bindKeyDownEvent = (editor, e) => {
    const anchorNode = editor.selection.getSel().anchorNode;
    let isOnlyMathmlFlag = false;
    const _selRange = editor.selection.getRng(true);
    const isMultilineSelection = !(_selRange.startContainer === _selRange.endContainer);

    //------- later dependency ----------//
    if (anchorNode.innerHTML !== '<br>' &&
        e.target.closest('.divCodeSnippetFigure') &&
        e.target.closest('.code-listing')) {
        return false;
    }

    /**
     * Case - pressing Enter on blank list item
     */
    if (anchorNode.tagName === "LI" || anchorNode.tagName === "BR") {
        if ((e.metaKey && e.which === 13) || (e.which === 13)) {
            // prohibitEventBubling(e);
            isOnlyMathmlFlag = false;

            // if only mathml image is present in editor //
            if ((editor.targetElm.textContent.length === 0) ||
                (editor.targetElm.innerHTML.indexOf('Wirisformula') != -1)) {
                isOnlyMathmlFlag = true;
            }

            // creating new paragraph //
            let getChildSelection = anchorNode.children[0].tagName;
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
                 * Case - AND if that last element is at outermost level i.e, data-treelevel == 1
                 */
                if ((anchorNode.closest('ol') && anchorNode.closest('ol').getAttribute('data-treelevel') === '1') ||
                    (anchorNode.closest('ul') && anchorNode.closest('ul').getAttribute('data-treelevel') === '1')) {
                    if (anchorNode.children[1] &&
                        (anchorNode.children[1].tagName === "OL" ||
                            anchorNode.children[1].tagName === "UL")) {
                        isOnlyMathmlFlag = false;
                        prohibitEventBubling(e);
                        return false;
                    }
                    prohibitEventBubling(e);
                    createNewParagraphElement(e, editor);
                    return false;
                }
                let timeoutInstance = setTimeout(() => {
                    clearTimeout(timeoutInstance);
                    updateNestedList(e.target);
                    return false;
                });
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
            createNewParagraphElement(e, editor);
            return false;
        }
    }

    const atStart = false; // editor.selection.info(anchorNode.parentNode).atStart, // could not get this in tinymce
    const origFormat = anchorNode.parentNode.tagName.toLowerCase();
    const origClass = anchorNode.parentNode.classList[0];
    const sel = editor.selection.getSel();
    let atEnd = false;

    if (sel.anchorNode.data && sel.anchorNode.data.length == sel.focusOffset) {
        atEnd = true;
    }

    /**
     * Facilitate indent feature at end of text on TAB key
     */
    console.log('key code', e.which)
    if (atEnd && e.which == 9 && !e.shiftKey) {
        editor.editorCommands.commands.exec.indent();
    }
    /**
     * Facilitate indent feature at end of text on shift+TAB key
     */
    if (atEnd && e.which == 9 && e.shiftKey) {
        editor.editorCommands.commands.exec.outdent();
    }

    /**
     * Facilitate TAB key on list
     */
    if ((e.which == 9) && anchorNode.closest('li')) {
        let demo = (anchorNode.closest('ol') && anchorNode.closest('ol').getAttribute('data-treelevel')) || (anchorNode.closest('ul') && anchorNode.closest('ul').getAttribute('data-treelevel'));
        let updatelistFlag = true;

        // prevent tab indent event at last level of list tree //
        if (!e.shiftKey) {
            /**
             * Case - cursor at last level
             */
            if (demo == 4) {
                prohibitEventBubling(e);
                return false;
            }
            /**
             * Case - hit TAB at any first list item irrespective of levels
             * if is is first item then prevent default
             */
            let closestLi = (anchorNode.tagName === 'LI') ? anchorNode : anchorNode.closest('li');
            if (closestLi.closest('ol').findChildren('li').indexOf(closestLi) === 0) {
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
        else if (e.shiftKey && !isMultilineSelection) {
            let closestLi = (anchorNode.tagName === 'LI') ? anchorNode : anchorNode.closest('li');
            let closestTreeLevel = anchorNode.closest('ol') && anchorNode.closest('ol').getAttribute('data-treelevel');
            /**
             * Case - prevent hitting Shift+TAB on very first list tree level
             */
            if (closestTreeLevel === '1') {
                prohibitEventBubling(e);
                updatelistFlag = false;
                return false;
            }

            if (closestLi.findChildren('ol').length > 0) {
                closestLi.classList.add('shfTabEvnt');
                updatelistFlag = false;
                let timeoutInstance = setTimeout(() => {
                    clearTimeout(timeoutInstance);
                    let allOlElems = document.querySelector('li.shfTabEvnt').querySelectorAll('ol');
                    let firstOlElem = allOlElems[0];
                    let firstLi = [...firstOlElem.children].slice(0, 1)[0];
                    let levelUpOL = firstLi.findChildren('ol')[0];
                    let liSiblings = [...firstOlElem.children].slice(1);
                    levelUpOL.append(...liSiblings);
                    document.querySelector('li.shfTabEvnt').querySelectorAll('ol')[0].remove();
                    document.querySelector('li.shfTabEvnt').append(levelUpOL);
                    document.querySelector('li.shfTabEvnt').classList.remove('shfTabEvnt');
                    updateNestedList(e.target);
                });
            }
        }
        // prohibitEventBubling(e);
        if (updatelistFlag) {
            let timeoutInstance = setTimeout(() => {
                clearTimeout(timeoutInstance);
                updateNestedList(e.target);
                return false;
            });
        }
    }

    let firstChild = editor.targetElm.childNodes[0];
    if ((e.which === 13 && firstChild.nodeName !== "PRE")) {
        // prohibitEventBubling(e);
        /**
         * Case - hit enter on last element of list
         * That is a sibling next to it.., then do not perform anything
         */
        if (anchorNode.nextSibling !== null &&
            (anchorNode.nextSibling.tagName !== "OL" ||
                anchorNode.nextSibling.tagName !== "UL")) {
            prohibitEventBubling(e);
            return false;
        }
        // else update list content //
        let timeoutInstance = setTimeout(() => {
            clearTimeout(timeoutInstance);
            updateNestedList(e.target);
            return false;
        });
    }
}

/**
 * updateNestedList | takes care of formatting of list from very top
 * @param {*} element | target element
 */
const updateNestedList = (element) => {
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

    let allOlElement = element.querySelectorAll('ol');
    if (allOlElement.length == 0) {
        allOlElement = element.querySelectorAll('ul');
    }
    let treelevel = parseInt(allOlElement[0].getAttribute('data-treelevel'));
    let olClass = allOlElement[0].getAttribute('class');
    for (let i = 0; i < allOlElement.length; i++) {
        allOlElement[i].classList.add(olClass);
        let parentTreeLevel = allOlElement[i].parents('ol') && allOlElement[i].parents('ol').getAttribute('data-treelevel') || undefined;
        if (parentTreeLevel == undefined) {
            parentTreeLevel = allOlElement[i].parents('ul') && allOlElement[i].parents('ul').getAttribute('data-treelevel') || undefined;
        }
        if (parentTreeLevel) {
            treelevel = parseInt(parentTreeLevel) + 1;
        }
        allOlElement[i].setAttribute('data-treelevel', treelevel);
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
                [...childLielement].forEach((elem) => { elem.classList.add('listItemNumeroUnoBullet') });
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

const createNewParagraphElement = (e, editor) => { }

const prohibitEventBubling = (e) => {
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();
}