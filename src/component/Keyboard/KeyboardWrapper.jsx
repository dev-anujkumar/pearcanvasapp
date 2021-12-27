import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectElement } from '../../appstore/keyboardReducer';

export const QUERY_SELECTOR = `cypress-keyboard`;

const replaceNbsps = (text) => {
   const removedSpaces  = text.replace(/&nbsp;/g, ' ');
   return removedSpaces.replace(/<br>/g, '');
}

const getLastString = (text) => {
    
    const lastIndex = text.lastIndexOf("</");
    if(lastIndex > -1) {
        const lastIndex2 = text.lastIndexOf(">");
        const lastTag = text.substring(lastIndex, lastIndex2+1);
        const string = text.split(lastTag);
        // console.log("the string is ", string, string.length, string[0], string[1]);
        const lastText = string[string.length-1];
        return lastText;
    }
    else {
        return text;
    }
    // console.log("Last index is ", lastIndex, lastIndex2, lastTag, lastText);
 }

export const getDataFromLastTag = (text) => {
//    console.log("the text is ", text.innerHTML, text.firstChild, text.firstChild.innerHTML);
   const mainString = replaceNbsps(text.innerHTML);
//    console.log("the main string is ", mainString);
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
    if(props.enable)
    return <div onFocus={() => {
        // element is directly clicked via mouse
        dispatch(selectElement(id));
    }} id={id}> {props.children} </div>
    else return <>{props.children}</>
}

export default KeyboardWrapper;