import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectElement } from '../../appstore/keyboardReducer';

const KeyboardWrapper = (props) => {
    const dispatch = useDispatch();
    // React.memo vs React.useCallback
    return <div onFocus={() => {
        dispatch(selectElement(id));
    }} id={`cypress-keyboard-${props.index}`}> {props.children} </div>
}

export default KeyboardWrapper;