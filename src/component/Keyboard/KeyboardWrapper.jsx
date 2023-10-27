import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectElement } from '../../appstore/keyboardReducer';

export const QUERY_SELECTOR = `cypress-keyboard`;
export const NORMAL_SELECTOR = `cypress-`

/**
 * function decides to
 * move cursor to next line or next element
 * @param {*} e : event
 * @param {*} move : boolean true or false.
 */
 let selectedNodeIndex = 0;
 let allInteractiveElements=[]
const updateCursor = (e, move) => {
    if (move) {
        // moves to next element
        e.preventDefault();
    }
    else {
        // moves to next line of same element
        e.stopPropagation()
    }
}

/**
 * handle cursor movement for node
 * @param {*} e : event of tinymce
 * @param {*} node : selection node
 * @param {*} tinymceOffset : selection offset
 */
export const moveCursor = (e, node, tinymceOffset) => {
    let move;
    if (e.keyCode === 38) {
        move = isFirtstChild(node, tinymceOffset);
        updateCursor(e, move);
    }
    else if (e.keyCode === 40) {
        //for last selected element
        if (selectedNodeIndex === allInteractiveElements.length - 1) {
            updateCursor(e, false)
        }
        else {
            move = isLastChild(node, tinymceOffset);
            updateCursor(e, move)
        }
    }
    else {
        e.stopPropagation();
    }
}

const getLastTextNode = (node) => {
    if (node.lastChild) {
        return getLastTextNode(node.lastChild);
    }
    else {
        return node;
    }
}

const getFirstTextNode = (node) => {
    if (node.firstChild) {
        return getFirstTextNode(node.firstChild);
    }
    else {
        return node;
    }
}

/**
 * Check if node if first child
 * @param {*} n 
 * @param {*} tinymceOffset : cursor selection point
 * @returns 
 */
const isFirtstChild = (node, tinymceOffset) => {
    const isKChild = isKWChild(node);
    if (isKChild.isChild) {
        const tinymceNode = isKChild.node.querySelector(`[id^='${NORMAL_SELECTOR}']`);
        const firstTextNode = getFirstTextNode(tinymceNode);
        const uniCode = '\uFEFF';
        //for bce when code have blank lines
        if (node?.className === 'codeNoHighlightLine' || node?.parentNode?.className === 'codeNoHighlightLine' ) {
            if(node?.parentNode?.className === 'codeNoHighlightLine'){
                //when line is not empty
                return !node?.parentNode?.previousSibling && tinymceOffset === 0
            }
            //for empty line
            else return !node?.previousSibling
        }
        if(tinymceOffset == 0 && (node?.parentNode?.classList.contains("figureCredit") 
        || node?.classList?.contains("figureCaption") || node?.classList?.contains("figureMathContent")
        || node?.classList?.contains("figureTitle") || node?.classList?.contains("figureCodeContent") 
        || node?.classList?.contains('figureNumber') || node?.classList?.contains("figureLabel")
        || node?.classList?.contains("figureCredit")
        )) {
            return true;
        }
        if (firstTextNode?.textContent?.indexOf(uniCode) === 0 && tinymceOffset === 1) {
            return true;
        }
        else if (firstTextNode === node) {
            return tinymceOffset === 0;
        }
        else if (node?.parentNode?.id?.startsWith(NORMAL_SELECTOR) && tinymceNode?.parentNode?.parentNode?.className !== 'blockquoteMarginalia' && !(tinymceNode.className?.includes('figureCaption') || tinymceNode.className?.includes('figureTitle'))) { //since blockquote title and caption is directly wrapped into p therefore added the condition
            
            if(firstTextNode?.nodeName === 'IMG') {
                return tinymceOffset === 0;
            }
            // for empty text
            else return node?.textContent?.length === 0;
        }
        else if (firstTextNode?.nodeName === 'BR' && node?.nodeName === 'LI') {
            return true;
            // for empty list
        }
        else if (node?.id?.startsWith(NORMAL_SELECTOR) && node?.parentNode?.id.startsWith(QUERY_SELECTOR)) {
            // tinymce edtiors empty values
           return tinymceOffset === 0
        }
        else return false;

    }
    else return false;
}

/**
 * Get Last child of node
 * useful for multiple formatting option
 * @param {*} node 
 * @returns 
 */
const getLastChild = (node) => {
    if (node.lastChild) {
        return getLastChild(node.lastChild);
    }
    else {
        return node;
    }
}

/**
 * Since Footnote has multiple spans
 * so there are multiple scenarios wrt footnote
 */
const footNoteCases = (node, lastTextNode) => {
    if (node.nodeName === 'SPAN' && lastTextNode.nodeName === 'BR') {
        // when cliked span comes in node
        // for a few seconds, after few seconds caret is added
        // span ka sibling is foot note
        return (node.id === '_mce_caret') ||  (node.id === 'f-e-s' );
    }
    else if (isParentFootnote(node)) {
        // simple case when * comes in node
        if (lastTextNode?.nodeName === 'BR') {
            return true;
        }
    }
    
    return false;
}

/**
 * Check if node is the last child of 
 * keyboard wrapper
 * @param {*} node : node of which checking is sone
 * @param {*} tinymceOffset : selection offset
 * @returns 
 */
const isLastChild = (node, tinymceOffset) => {
    const isKChild = isKWChild(node);
    if (isKChild.isChild) {
        const tinymceNode = isKChild.node.querySelector(`[id^='${NORMAL_SELECTOR}']`);
        const lastTextNode = getLastTextNode(tinymceNode);
        const uniCode = '\uFEFF';
        //for bce when code have blank lines
        if (node?.className === 'codeNoHighlightLine' || node?.parentNode?.className === 'codeNoHighlightLine') {
            if (node?.parentNode?.className === 'codeNoHighlightLine') {
                //when line is not empty
                return !node?.parentNode?.nextSibling && tinymceOffset === node?.length
            }
            //for empty line
            else return !node?.nextSibling
        }
        if(node.parentNode?.classList?.contains('figureTitle') && node.nextSibling?.id === 'f-e-s'){
            return footNoteCases(node, lastTextNode);
        }
        if(lastTextNode.className == "Wirisformula" || (lastTextNode.className == "Wirisformula" && tinymceNode?.parentNode?.parentNode?.className === 'blockquoteMarginalia')) {
            if(tinymceOffset != 0 && node.lastChild != null) {
             return true;
            }
        }
        //for inline code
        if(lastTextNode.parentNode?.nodeName === 'CODE' && node.lastChild != null) {
            return true
        }
        if (lastTextNode === node) {
            if(lastTextNode?.previousSibling?.className == "answerLineContent") {
                if(tinymceOffset != 0 && lastTextNode.lastChild == null) {
                    return true;
                   }
            }
            if (lastTextNode?.textContent?.indexOf(uniCode) > -1) {
                if(lastTextNode?.parentNode?.id === "_mce_caret") {
                    // unicode inside footnote
                    return true;
                } else if( lastTextNode?.nodeName == "#text" && lastTextNode?.previousSibling?.nodeName === "SUP" 
                && tinymceOffset == 2 && lastTextNode === node){
                    return true
                }
                else {
                    // unicode inside inline code
                    let textContent = lastTextNode?.textContent?.replace(/\uFEFF/g, "");
                    textContent = textContent?.replace(/\u200B/g, "");
                    return textContent?.length == tinymceOffset
                }
            }
            else
                return tinymceOffset === lastTextNode?.textContent?.length;
        }
        else if (node?.parentNode?.id?.startsWith(NORMAL_SELECTOR) && !node.parentNode?.className.includes('figureCaption')) { // move line by line in caption field from last line
            // case for only single image
            if(lastTextNode?.nodeName === 'IMG' && tinymceNode?.parentNode?.parentNode?.className !== 'blockquoteMarginalia') {
                return tinymceOffset !==0
            } 
            // case of empty para
            else if(node?.textContent?.length === 0) {
                return true;
            }
          
        }
        else if (node?.id?.startsWith(NORMAL_SELECTOR) && node?.parentNode?.id.startsWith(QUERY_SELECTOR)) {
            // tinymce edtiors empty values
           return tinymceOffset === 0;
        }
        else if(tinymceNode?.textContent?.length === 0) {
            // for empty fields in floating text case
            // as p and br are coming there
            return tinymceOffset === 0;
        }        

        else return footNoteCases(node, lastTextNode);

    }
    else return false;
}
/**
 * Check if the node is child of Keyboard Wrapper, 
 * if yes return the keyboiard warapper node
 * and disptance from parent
 * @param {*} node : checking which node is child of KW
 * @param {*} index : Parent Distance
 * @returns 
 */
const isKWChild = (node, index = 0) => {
    if (index === 10) {
        return { isChild: false, index, node };
    }
    else if (node?.id?.startsWith(QUERY_SELECTOR)) {
        return { isChild: true, index, node };
    }
    else {
        return isKWChild(node.parentNode, index + 1);
    }
}

const isParentFootnote = (node) => {
    const nodeParent = node?.parentNode;
    if(nodeParent) {
        return ((nodeParent?.nodeName === 'A' && nodeParent?.hasAttribute && node?.parentNode?.hasAttribute("data-footnoteelementid")) || ((node.parentNode?.className?.includes('figureCaption') || node.parentNode?.parentNode?.className?.includes('figureCaption') || node.parentNode?.className?.includes('figureTitle')) && node.nextSibling?.id == 'f-e-s')) ; // for caption field in case of footnotes in the last
    }
    else {
        return false;
    }
}


const KeyboardWrapper = (props) => {
    const activeElement = useSelector(state => state.keyboardReducer.selectedElement);
    allInteractiveElements = document.querySelectorAll(`[id^='${QUERY_SELECTOR}-']`);
    allInteractiveElements.forEach((currentValue, currentIndex) => {
        if (currentValue.id === activeElement) {
            selectedNodeIndex = currentIndex
        }
    });
    const dispatch = useDispatch();
    // alphanumeric, id should be unique for all the elements.
    const id = `${QUERY_SELECTOR}-${props.index}`;
    if (props.enable)
        return <div onFocus={() => {
            // element is directly clicked via mouse
            dispatch(selectElement(id));
        }} id={id} > {props.children} </div>
    else return <>{props.children}</>
}
export default KeyboardWrapper;