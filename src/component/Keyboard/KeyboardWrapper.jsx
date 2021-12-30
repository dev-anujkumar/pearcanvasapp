import React from 'react';
import { useDispatch } from 'react-redux';
import { selectElement } from '../../appstore/keyboardReducer';

export const QUERY_SELECTOR = `cypress-keyboard`;

/**
 * function decides to
 * move cursor to next line or next element
 * @param {*} e : event
 * @param {*} move : boolean true or false.
 */
const updateCursor = (e, move) => {
    if (move) {
        // moves to next element
        e.preventDefault();
    }
    else {
        // moves to next Element in DOM
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
        move = isLastChild(node, tinymceOffset);
        updateCursor(e, move)
    }
    else {
        e.stopPropagation();
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
        
        
        const firstNode = isKChild.node.firstChild.firstChild;
        
        if(node.nodeName === 'LI') {
            // in case of empty list item, text node
            // does not come, Li node comes
            
            // const firstTextNode = firstNode.firstChild;
            
            
            if(firstNode === node) {
            
                return tinymceOffset === 0;
            }
        }
        else if(node?.parentNode?.nodeName === 'LI') {
            
            const firstTextNode = firstNode.firstChild;
            
            
            if(firstTextNode === node) {
            
                return tinymceOffset === 0;
            }
            
        }
        else if (firstNode === node || firstNode?.nodeName === "IMG") {
            return tinymceOffset === 0
        }
        else if (firstNode === firstNode.parentNode.lastChild) {
            
            if (firstNode.nodeName === 'CODE') {
                const uniCode = '\uFEFF';
                
                if (firstNode.textContent.indexOf(uniCode) === 0 && tinymceOffset === 1) {
                    
                    
                    return true;
                }
                else return tinymceOffset == 0;
            }
            return tinymceOffset === 0;
        }else {
            return false;
        }
    }
    else return false;
}

/**
 * Get the last nth child, of node
 * @param {*} node 
 * @returns 
 */
const getNthLi = (node) => {
    if (node && node.lastChild) {
        return getNthLi(node.lastChild);
    }
    else {
        return node;
    }
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
        
        
        
        if(node.nodeName === 'LI') {
            // in case of empty LI node name comes in node
            // and nth child will point to BR
            const nthChild = getNthLi(isKChild.node);
            
            if (nthChild.parentNode === node) {
                return true;
            }
        }
        else if (node.parentNode.nodeName === 'LI') {
            // in case li having text, we will get text node
            // inside node.

            // get last child of last node.
            const nthChild = getNthLi(isKChild.node);
            
            if (nthChild === node) {
                return node.textContent?.length === tinymceOffset
            }
        }
        // checking if node is first and last child of its parent
        // this means that custom tag is added at the end
        else if (node.parentNode.firstChild === node && node.parentNode.lastChild === node) {
            // in case of inline image its showing + 1 offset value
            if (node.parentNode.nodeName === 'CODE') {
                const textContent = node.textContent.replace(/\uFEFF/g, "");
                
                return textContent.length == tinymceOffset
            }
            return node.textContent?.length === tinymceOffset
        } else if (node.parentNode.firstChild.lastChild === node.lastChild && node?.lastChild?.nodeName === 'IMG') {     /** condition to navigate down if image is at the last position in text elements */
            return true
        }
        else {
            
            
            
            
            const lastChild = isKChild.node.firstChild.lastChild;
            
            if (lastChild === node || lastChild?.nodeName === 'IMG') {
                return node.textContent?.length === tinymceOffset
            }
            return false;
            // check if there is no other child
            // if there is child
            // 
        }
    }
    else {
        return false;
    }
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
    else if (node.parentNode.id.startsWith(QUERY_SELECTOR)) {
        return { isChild: true, index, node };
    }
    else {
        return isKWChild(node.parentNode, index + 1);
    }
}



const KeyboardWrapper = (props) => {
    const dispatch = useDispatch();

    // alphanumeric, id should be unique for all the elements.
    const id = `${QUERY_SELECTOR}-${props.index}`;
    if (props.enable)
        return <div onFocus={() => {
            // element is directly clicked via mouse
            dispatch(selectElement(id));
        }} id={id}> {props.children} </div>
    else return <>{props.children}</>
}

export default KeyboardWrapper;