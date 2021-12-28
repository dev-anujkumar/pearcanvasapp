import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectElement } from '../../appstore/keyboardReducer';

export const QUERY_SELECTOR = `cypress-keyboard`;


const updateCursor = (e, move) => {
    if (move) {
        e.preventDefault();
    }
    else {
        e.stopPropagation()
    }
}

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

const getNode = (n) => {
    if(n?.parentNode?.nodeName === 'LI') {
        return n.parentNode;
    }
    else return n;
}

export const isFirtstChild = (n, tinymceOffset) => {
    const node = getNode(n);
    // // console.log("KeyDown Test 51: ", tinymceOffset, node, node?.parentNode, node?.parentNode?.firstChild);
     
    const isKChild = isKWChild(node);
    if(isKChild.isChild) {
        // // console.log("KeyDown Test 52: ", node);
        // // console.log("KeyDown Test 53: ", isKChild);
        const firstNode = isKChild.node.firstChild.firstChild;
        // // console.log("KeyDown Test 54: ", firstNode, firstNode.nodeName);
        if(firstNode.nodeName === "BR" && node.lastChild === node.firstChild) {
            // para is empty
            return true;
        }
        if(firstNode === node || firstNode.nodeName === "IMG") {
            return tinymceOffset === 0
        }
    }
    else return false;
}

const getNthLi = (node) => {
    if(node && node.lastChild) {
        return getNthLi(node.lastChild);
    }
    else {
        return node;
    }
}


export const isLastChild = (node, tinymceOffset) => {
    const isKChild = isKWChild(node);
    if (isKChild.isChild) {
        // if (isKChild.index === 1) {
        // // console.log("KeyDown Test 21 ", node, isKChild, tinymceOffset);
        // // console.log("KeyDown Test 22 ", node.textContent, node.textContent.length, tinymceOffset);
        // // console.log("KeyDown Test 23 ", node.firstChild);
        if(node.parentNode.nodeName === 'LI') {
            // get last child of last node.
            const nthChild = getNthLi(isKChild.node);
            // // console.log("KeyDown Test 24 ", nthChild, node, node.firstChild);
            if(nthChild === node) {
                return node.textContent?.length === tinymceOffset
            }
        }
        else if (node.parentNode.firstChild === node) {
            // fails in case of sub script and super script
            return node.textContent?.length === tinymceOffset
        }
        else {
            // // console.log("KeyDown Test Other Complex case 31", node, isKChild, tinymceOffset);
            // // console.log("KeyDown Test 32 ", node.textContent.length, tinymceOffset);
            // // console.log("KeyDown Test 33 ", isKChild.node);
            // // console.log("KeyDown Test 34 ", isKChild.node.firstChild.lastChild);
            const lastChild = isKChild.node.firstChild.lastChild;
            // // console.log("KeyDown Test 35 ", lastChild, lastChild.nodeName)
            if(lastChild === node || lastChild.nodeName === 'IMG') {
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



export const isKWChild = (node, index = 0) => {
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



const replaceNbsps = (text) => {
    const removedSpaces = text.replace(/&nbsp;/g, ' ');
    return removedSpaces.replace(/<br>/g, '');
}

const getLastString = (text) => {

    const lastIndex = text.lastIndexOf("</");
    if (lastIndex > -1) {
        const lastIndex2 = text.lastIndexOf(">");
        const lastTag = text.substring(lastIndex, lastIndex2 + 1);
        const string = text.split(lastTag);
        // // console.log("the string is ", string, string.length, string[0], string[1]);
        const lastText = string[string.length - 1];
        return lastText;
    }
    else {
        return text;
    }
    // // console.log("Last index is ", lastIndex, lastIndex2, lastTag, lastText);
}

export const getDataFromLastTag = (text) => {
    //    // // console.log("the text is ", text.innerHTML, text.firstChild, text.firstChild.innerHTML);
    const mainString = replaceNbsps(text.innerHTML);
    //    // // console.log("the main string is ", mainString);
    return getLastString(mainString);

    //    return text.innerText;
}


export const supportedClasses = [
    "heading1NummerEins",
    "paragraphNumeroUno",
    "pullQuoteNumeroUno",
    "listItemNumeroUnoBullet",
    "heading2learningObjectiveItem",
    "heading2NummerEins",
    "heading1NummerEins",
    "heading3NummerEins",
    "heading4NummerEins",
    "heading5NummerEins",
    "heading6NummerEins"
]

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