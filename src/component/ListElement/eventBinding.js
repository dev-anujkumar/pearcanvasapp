/**
 * Module - eventBinding
 * Description - contain events for custom list drop button and list element editor
 * Developer - Abhay Singh
 * Last modified - 24-09-2019
 */

/**
 * insertListButton | inserts custom list button with icon in existing editor toolbar
 */
export const insertListButton = (editor) => {
    editor.ui.registry.addButton('customListButton', {
        text: '<i class="fa fa-list-ol" aria-hidden="true"></i>',
        tooltip: 'Insert Ordered List',
        onAction: () => {
            positionListDrop(event);
            // var selectedText = editor.selection.getContent({format: 'html'});
            // let cell = editor.dom.getParent(editor.selection.getStart(), ".Editor");
            // editor.insertContent('&nbsp;<strong>It\'s my button!</strong>&nbsp;');
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
    let _wrapperWidth = 275;
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
    if ($(anchorNode).html() !== '<br>' &&
        $(e.target).closest('.divCodeSnippetFigure').length &&
        $(e.target).closest('.code-listing').length) {
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
            if (($(editor.targetElm).text().length === 0) ||
                ($(editor.targetElm).html().indexOf('Wirisformula') != -1)) {
                isOnlyMathmlFlag = true;
            }

            // creating new paragraph //
            let getChildSelection = $($(anchorNode).children()[0]).prop('tagName');
            if (getChildSelection === "IMG" || getChildSelection === "STRONG" || getChildSelection === "EM" || getChildSelection === "U") {
                prohibitEventBubling(e);
                return;
            }
            /**
             * Case - hit enter on last element of list
             * That is there will no sibling next to..
             */
            if ($(anchorNode).next()[0] === undefined) {
                /**
                 * Case - AND if that last element is at outermost level i.e, data-treelevel == 1
                 */
                if ($($(anchorNode).closest('ol')).attr('data-treelevel') === '1' ||
                    $($(anchorNode).closest('ul')).attr('data-treelevel') === '1') {
                    if ($($(anchorNode).children()[1]).prop('tagName') === "OL" ||
                        $($(anchorNode).children()[1]).prop('tagName') === "UL") {
                        isOnlyMathmlFlag = false;
                        prohibitEventBubling(e);
                        return false;
                    }
                    prohibitEventBubling(e);
                    createNewParagraphElement(e, editor);
                    return false;
                }
                setTimeout(() => {
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
    if ($(editor.targetElm).find('li').length == 0) {
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
        editor.commands.indent();
    }
    /**
     * Facilitate indent feature at end of text on shift+TAB key
     */
    if (atEnd && e.which == 9 && e.shiftKey) {
        editor.commands.outdent();
    }

    /**
     * Facilitate TAB key on list
     */
    if ((e.which == 9)) {
        let demo = $($(anchorNode).closest('ol')).attr('data-treelevel') || $($(anchorNode).closest('ul')).attr('data-treelevel');
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
            let closestLi = (anchorNode.tagName === 'LI') ? anchorNode : $(anchorNode).closest('li');
            if ($(closestLi).index() === 0) {
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
            let closestLi = (anchorNode.tagName === 'LI') ? anchorNode : $(anchorNode).closest('li');
            let closestTreeLevel = $(anchorNode).closest('ol').attr('data-treelevel');
            /**
             * Case - prevent hitting Shift+TAB on very first list tree level
             */
            if (closestTreeLevel === '1') {
                prohibitEventBubling(e);
                updatelistFlag = false;
                return false;
            }

            if ($(closestLi).children('ol').length > 0) {
                $(closestLi).addClass('shfTabEvnt');
                updatelistFlag = false;
                setTimeout(() => {
                    let allOlElems = $('li.shfTabEvnt').find('ol');
                    let firstOlElem = allOlElems[0];
                    let firstLi = [...firstOlElem.children].slice(0, 1)[0];
                    let levelUpOL = $(firstLi).children('ol')[0];
                    let liSiblings = [...firstOlElem.children].slice(1);
                    levelUpOL.append(...liSiblings);
                    $('li.shfTabEvnt').find('ol')[0].remove();
                    $('li.shfTabEvnt').append(levelUpOL);
                    $('li.shfTabEvnt').removeClass('shfTabEvnt');
                    updateNestedList(e.target);
                });
            }
        }
        // prohibitEventBubling(e);
        if (updatelistFlag) {
            setTimeout(() => {
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
        if ($(anchorNode).next()[0] !== undefined &&
            ($(anchorNode).next()[0].tagName !== "OL" ||
                $(anchorNode).next()[0].tagName !== "UL")) {
            prohibitEventBubling(e);
            return false;
        }
        // else update list content //
        setTimeout(() => {
            updateNestedList(e.target);
            return false;
        });
    }
}

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

    let allOlElement = $(element).find('ol');
    if (allOlElement.length == 0) {
        allOlElement = $(element).find('ul');
    }
    let treelevel = parseInt($(allOlElement[0]).attr('data-treelevel'));
    let olClass = $(allOlElement[0]).attr('class');
    for (let i = 0; i < allOlElement.length; i++) {
        $(allOlElement[i]).addClass(olClass);
        let parentTreeLevel = $($(allOlElement[i]).parents('ol')).attr('data-treelevel');
        if (parentTreeLevel == undefined) {
            parentTreeLevel = $($(allOlElement[i]).parents('ul')).attr('data-treelevel');
        }
        if (parentTreeLevel) {
            treelevel = parseInt(parentTreeLevel) + 1;
        }
        $(allOlElement[i]).attr('data-treelevel', treelevel);

        let childLielement = $(allOlElement[i]).children();

        $(allOlElement[i]).removeClass();
        $(childLielement).removeClass();
        if ($(allOlElement[i]).css("counter-increment") == 'none') {
            $(childLielement[0]).addClass('reset');
        }

        if (treelevel > 4) {
            return;
        }

        switch (olClass) {

            case "decimal":
                $(allOlElement[i]).addClass(decimalOlClassList[treelevel - 1]);
                $(childLielement).addClass(decimalLiClassList[treelevel - 1]);
                break;

            case "upper-alpha":
                $(allOlElement[i]).addClass(upperAlphaClassList[treelevel - 1]);
                $(childLielement).addClass(upperAlphaLiClassList[treelevel - 1]);
                break;
            case "lower-alpha":
                $(allOlElement[i]).addClass(lowerAlphaClassList[treelevel - 1]);
                $(childLielement).addClass(lowerAlphaLiClassList[treelevel - 1]);
                break;
            case "upper-roman":
                $(allOlElement[i]).addClass(upperRomanClassList[treelevel - 1]);
                $(childLielement).addClass(upperRomanLiClassList[treelevel - 1]);
                break;
            case "lower-roman":
                $(allOlElement[i]).addClass(lowerRomanClassList[treelevel - 1]);
                $(childLielement).addClass(lowerRomanLiClassList[treelevel - 1]);
                break;

            case "none":
                $(allOlElement[i]).addClass('none');
                $(childLielement).removeClass();
                $(childLielement).addClass('listItemNumeroUnoNone');
                $(childLielement[0]).addClass('reset');

                break;
            case "disc":
                $(childLielement).addClass('listItemNumeroUnoBullet');
                break;
        }
        treelevel = treelevel + 1;
    }

    if ($(allOlElement[i]).css("counter-increment") == 'none') {
        for (var i = 0; i < liClasses.length; i++) {
            if (liClasses[i] && liClasses[i].indexOf('reset') && liClasses[i].indexOf('reset') !== -1) {
                $(lis[i]).addClass("reset");
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