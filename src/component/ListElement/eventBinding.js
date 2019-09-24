/**
 * Module - eventBinding
 * Description - contain events for custom list drop button and list element
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