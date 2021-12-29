import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectElement } from '../../appstore/keyboardReducer';
import { QUERY_SELECTOR } from './KeyboardWrapper.jsx';

const KeyboardUpDown = (props) => {
    const keyboardUpDown = useRef(null);
    const activeElement = useSelector(state => state.keyboardReducer.selectedElement);
    const dispatch = useDispatch();
    const getChildAndClick = (element, enableScroll) => {
        if (element) {
            dispatch(selectElement(element.id));
            const childElement = element.childNodes[1];
            if(enableScroll) {
                const rect = element.getBoundingClientRect();
                const parentNode = keyboardUpDown.current.parentNode;
                const divHeight = parentNode.getBoundingClientRect().height;
                parentNode.scroll(0, parentNode.top + divHeight);
            }
            childElement.click();
          
        }
    }

    const shouldEnableScroll = (selectedNodeIndex, allElementLength) => {
        return allElementLength ;
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 38 || event.keyCode === 40) {
            const allInteractiveElements = document.querySelectorAll(`[id^='${QUERY_SELECTOR}-']`);
            if (activeElement) {
                let selectedNodeIndex = 0;
                allInteractiveElements.forEach((currentValue, currentIndex) => {
                    if (currentValue.id === activeElement) {
                        selectedNodeIndex = currentIndex
                    }
                });
                if (event.keyCode === 38 && selectedNodeIndex !== 0) {
                    getChildAndClick(allInteractiveElements[selectedNodeIndex - 1]);

                }
                else if (event.keyCode === 40 && selectedNodeIndex !== allInteractiveElements.length) {
                    const enableScroll = shouldEnableScroll(selectedNodeIndex, allInteractiveElements.length);
                    getChildAndClick(allInteractiveElements[selectedNodeIndex + 1], enableScroll);
                }
            }
        }
    };

    useEffect(() => {
        keyboardUpDown.current.addEventListener('keydown', handleKeyDown);
        return () => {

            keyboardUpDown.current.removeEventListener('keydown', handleKeyDown);
        }
    }, [activeElement]);


    return <div ref={keyboardUpDown}> {props.children} </div>
}

export default KeyboardUpDown;