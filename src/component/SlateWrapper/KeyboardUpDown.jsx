import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const KeyboardUpDown = (props) => {
    const keyboardUpDown = useRef(null);
    const activeElement = useSelector(state => state.appStore.activeElement);
    // React.memo vs React.useCallback

    const handleKeyDown = (event) => {
        // console.log("right here", event.keyCode, activeElement);
        // const activeElement =  useSelector(state => state.appStore.activeElement);
        const allInteractiveElements = document.querySelectorAll(`[id^='cypress-']`);
        // // const activeElement = appStore.activeElement;
        console.log("Key down 1 : activeElement", event.keyCode, activeElement);
        console.log("Key down 2 : all Interactive Elements", allInteractiveElements);
        if (activeElement) {
            const currentId = `cypress-${activeElement.index}`;
            let selectedNodeIndex = 0;
            allInteractiveElements.forEach((currentValue, currentIndex, listObj) => {
                console.log("the current value is ", currentValue.id)
                if (currentValue.id === currentId) {
                    selectedNodeIndex = currentIndex
                }
            }
            );
            if (event.keyCode === 38) {
                // find next sibling and fire click event
                console.log("Key down 3: Up arrow is pressed");
                allInteractiveElements[selectedNodeIndex - 1].click()

            }
            else if (event.keyCode === 40) {
                console.log("Key down 3: down arrow is pressed");
                allInteractiveElements[selectedNodeIndex + 1].click()
            }
        }
    };

    useEffect(() => {
        keyboardUpDown.current.addEventListener('keydown', handleKeyDown);
        return  () => {

            keyboardUpDown.current.removeEventListener('keydown', handleKeyDown);
        }
    }, [activeElement]);


    return <div ref={keyboardUpDown}> {props.children} </div>
}

export default KeyboardUpDown;