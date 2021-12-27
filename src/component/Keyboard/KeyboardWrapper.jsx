import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectElement } from '../../appstore/keyboardReducer';

export const QUERY_SELECTOR = `cypress-keyboard`;

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