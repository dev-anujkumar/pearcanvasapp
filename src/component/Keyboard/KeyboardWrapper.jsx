import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectElement } from '../../appstore/keyboardReducer';

const KeyboardWrapper = (props) => {
    const dispatch = useDispatch();
    // React.memo vs React.useCallback
    const id = `cypress-keyboard-${props.index}`;
    return <div onFocus={() => {
        dispatch(selectElement(id));
    }} id={id}> {props.children} </div>
}

export default KeyboardWrapper;