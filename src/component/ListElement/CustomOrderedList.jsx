// IMPORT - Plugins //
import React, { Component } from 'react';
// IMPORT - TinyMCE //
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver';
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";
import "tinymce/skins/content/default/content.css";
import "tinymce/plugins/lists";
import "tinymce/plugins/advlist";
import { EditorConfig } from '../../config/EditorConfig';
// IMPORT - Components //
// IMPORT - Assets //
import './style.css';

class CustomOrderedList extends Component {
    constructor(props) {
        super(props);
        this.editorConfig = {
            plugins: EditorConfig.plugins,
            selector: '#editor-elem',
            inline: true,
            formats: EditorConfig.formats,
            menubar: false,
            statusbar: false,
            inline: true,
            object_resizing: false,
            fixed_toolbar_container: '#tinymceToolbar',
            content_style: EditorConfig.contentStyle,
            toolbar: EditorConfig.toolbar,
            image_advtab: false,
            force_br_newlines: true,
            forced_root_block: '',
            remove_linebreaks: false,
            setup: (editor) => {
                editor.on('keydown', (e) => {
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
                            // this.preventEventBubling(e);
                            isOnlyMathmlFlag = false;

                            // if only mathml image is present in editor //
                            if (($('#editor-elem').text().length === 0) ||
                                ($('#editor-elem').html().indexOf('Wirisformula') != -1)) {
                                isOnlyMathmlFlag = true;
                            }

                            // creating new paragraph //
                            let getChildSelection = $($(anchorNode).children()[0]).prop('tagName');
                            if (getChildSelection === "IMG" || getChildSelection === "STRONG" || getChildSelection === "EM" || getChildSelection === "U") {
                                this.preventEventBubling(e);
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
                                        this.preventEventBubling(e);
                                        return false;
                                    }
                                    this.preventEventBubling(e);
                                    this.createNewParagraphElement(e, editor);
                                    return false;
                                }
                                setTimeout(() => {
                                    this.updateNestedList(e.target);
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
                            this.preventEventBubling(e);
                            this.createNewParagraphElement(e, editor);
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
                                this.preventEventBubling(e);
                                return false;
                            }
                            /**
                             * Case - hit TAB at any first list item irrespective of levels
                             * if is is first item then prevent default
                             */
                            let closestLi = (anchorNode.tagName === 'LI') ? anchorNode : $(anchorNode).closest('li');
                            if ($(closestLi).index() === 0) {
                                this.preventEventBubling(e);
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
                                    this.updateNestedList(e.target);
                                });
                            }
                        }
                        // this.preventEventBubling(e);
                        if (updatelistFlag) {
                            setTimeout(() => {
                                this.updateNestedList(e.target);
                                return false;
                            });
                        }
                    }

                    let firstChild = editor.targetElm.childNodes[0];
                    if ((e.which === 13 && firstChild.nodeName !== "PRE")) {
                        // this.preventEventBubling(e);
                        /**
                         * Case - hit enter on last element of list
                         * That is a sibling next to it.., then do not perform anything
                         */
                        if ($(anchorNode).next()[0] !== undefined &&
                            ($(anchorNode).next()[0].tagName !== "OL" ||
                                $(anchorNode).next()[0].tagName !== "UL")) {
                            this.preventEventBubling(e);
                            return false;
                        }
                        // else update list content //
                        setTimeout(() => {
                            this.updateNestedList(e.target);
                            return false;
                        });
                    }
                });
            },
            init_instance_callback: (editor) => { }
        }
    }

    render() {
        return (
            <div id="editor-elem" className="editor-elem" contentEditable="true">
                <ol className="upper-alpha" data-treelevel='1' style={{ counterIncrement: "none" }}>
                    <li className="reset listItemNumeroUnoUpperAlpha">asdasdsad sadsadsa sdsadasd</li>
                    <li className="listItemNumeroUnoUpperAlpha"> dfsd sdf sdff sd sd fsd fsdfsd fs
                    <ol className="lower-alpha" data-treelevel='2'>
                            <li className="reset listItemNumeroUnoLowerAlpha"> fgdfg gfdgdf rtretreter
                        <ol className="lower-roman" data-treelevel='3'>
                                    <li className="reset listItemNumeroUnoLowerRoman">sdfsdf sdg treter dghfg</li>
                                    <li className="listItemNumeroUnoLowerRoman"> sdfsdf sdg treter dghfg
                            <ol className="decimal" data-treelevel='4'>
                                            <li className="reset listItemNumeroUnoNumber">qwertyu qwert sdfgh</li>
                                            <li className="listItemNumeroUnoNumber">qwertyu qwert sdfgh</li>
                                        </ol>
                                    </li>
                                </ol>
                            </li>
                        </ol>
                    </li>
                </ol>
            </div>
        )
    }

    updateNestedList(element) {
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

    createNewParagraphElement(e, editor) { }

    preventEventBubling = (e) => {
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
    }

    componentDidMount() {
        tinymce.init(this.editorConfig);
    }

    componentDidUpdate() {
        tinymce.init(this.editorConfig);
    }
}
CustomOrderedList.displayName = "CustomOrderedList"

export default CustomOrderedList;
