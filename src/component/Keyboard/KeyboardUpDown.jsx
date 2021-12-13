import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectElement } from '../../appstore/keyboardReducer';

const KeyboardUpDown = (props) => {
    const keyboardUpDown = useRef(null);
    const activeElement = useSelector(state => state.keyboardReducer.selectedElement);
    const dispatch = useDispatch();
    // React.memo vs React.useCallback

    const getChildAndClick = (element) => {
        if (element) {
            console.log("the element is ", element, typeof element.childNodes, element.id);
            dispatch(selectElement(element.id));
            const childElement = element.childNodes[1];
            childElement.click();
        }
    }
    const handleKeyDown = (event) => {
        // console.log("right here", event.keyCode, activeElement);
        // const activeElement =  useSelector(state => state.appStore.activeElement);
        if (event.keyCode === 38 || event.keyCode === 40) {
            const allInteractiveElements = document.querySelectorAll(`[id^='cypress-keyboard-']`);
            
            // // const activeElement = appStore.activeElement;
            console.log("Key down 1 : activeElement", event.keyCode, activeElement);
            console.log("Key down 2 : all Interactive Elements", allInteractiveElements);
            if (activeElement) {
                // const currentId = `cypress-keyboard-${activeElement.index}`;
                let selectedNodeIndex = 0;
                allInteractiveElements.forEach((currentValue, currentIndex, listObj) => {
                    console.log("the current value is ", currentValue.id)
                    if (currentValue.id === activeElement) {
                        selectedNodeIndex = currentIndex
                    }
                }
                );
                if (event.keyCode === 38) {
                    // find next sibling and fire click event
                    console.log("Key down 3: Up arrow is pressed", activeElement, allInteractiveElements[selectedNodeIndex - 1]);
                    getChildAndClick(allInteractiveElements[selectedNodeIndex - 1]);

                }
                else if (event.keyCode === 40) {
                    console.log("Key down 3: Up arrow is pressed", activeElement, allInteractiveElements[selectedNodeIndex + 1]);
                    getChildAndClick(allInteractiveElements[selectedNodeIndex + 1]);
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