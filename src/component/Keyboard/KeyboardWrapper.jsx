import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectElement } from '../../appstore/keyboardReducer';

export const QUERY_SELECTOR = `cypress-keyboard`;

const KeyboardWrapper = (props) => {
    const dispatch = useDispatch();

    // id should be unique for all the elements.
    const id = `${QUERY_SELECTOR}-${props.index}`;
    return <div onFocus={() => {
        dispatch(selectElement(id));
    }} id={id}> {props.children} </div>
}

export default KeyboardWrapper;