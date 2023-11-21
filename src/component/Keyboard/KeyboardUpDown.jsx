import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectElement } from '../../appstore/keyboardReducer';
import { NORMAL_SELECTOR, QUERY_SELECTOR } from './KeyboardWrapper.jsx';

const KeyboardUpDown = (props) => {
    const keyboardUpDown = useRef(null);
    const activeElement = useSelector(state => state.keyboardReducer.selectedElement);
    const dispatch = useDispatch();

    const isNodeAvaiable = (index) => {
        const allInteractiveElements = document.querySelectorAll(`[id^='${QUERY_SELECTOR}-']`);
        return allInteractiveElements[index];
    }

    const getLastChild = (element) => {
        if(element && element.lastChild) {
            if(element.lastChild?.nodeName === "A"
            && element.lastChild?.classList?.contains('paragraphNumeroUnoFootnote')){
                return element.lastChild
            }
            return getLastChild(element.lastChild);
        } else {
            return element;
        }
    }

    const getChildAndClick = (element, index) => {

        const parentNode = keyboardUpDown.current.parentNode;
        const divHeight = parentNode.getBoundingClientRect().height;
        if (element) {
            dispatch(selectElement(element.id));
            // firstElement child as we done need text nodes;
            let childElement = element.firstElementChild;

            const scrollTo = element.getBoundingClientRect().top - divHeight / 3;
            parentNode.scrollBy(0, scrollTo);

            // const firstChild = childElement?.firstChild ? childElement.firstChild : childElement;
            // in case of para firstChild is childElement.first child
            // in case of Image childElement is null;

            const tinymceChild = getTinymceElement(childElement);
            const lastChild = getLastChild(tinymceChild);
            if(lastChild) {
                if(lastChild.nodeName === 'A' && lastChild.hasAttribute("data-footnoteelementid")) {
                    // for foot note
                    // add span at last and click on span
                    // childElement.click();
                    const span = document.createElement('span');
                    span.id = "f-e-s"
                    span.innerHTML = "<br>";
                    if(childElement.parentNode?.parentNode?.classList?.contains('blockquoteMarginalia')){
                        childElement.appendChild(span);
                    } else {
                        if (childElement.className?.includes('floating')){
                            childElement = childElement.firstChild // text content is wrap in P inside div therefore append in childElement's firstchild i.e P
                        }
                        if (childElement.firstChild?.nodeName == 'P' || childElement.firstChild?.nodeName == 'SPAN') {
                            childElement.firstChild.appendChild(span)
                        } else {
                    childElement.appendChild(span) // text content is wrap in single P therefore append directly in childElement
                    }
                    }
                    span.click();
                    tinymceChild.click();
                    tinymceChild.focus();
                }
                else if(lastChild.id === "f-e-s") {
                    if(lastChild?.previousSibling?.nodeName !== 'SUP') {
                        lastChild.parentNode.removeChild(lastChild);
                        childElement.click();
                    }
                    else {
                        lastChild.click();
                    }
                }
                else if (tinymceChild) {
                    // case of floating placeholder
                    // if(tinymceChild.innerHTML === "<p></p>") {
                    //     tinymceChild.innerHTML = '';
                    // }
                    tinymceChild.click();
                    tinymceChild.focus();
                }
            }
            else {
                childElement.click();
                childElement.focus();
            }
        }
        else {
            // element not there
            // in case of down arrow press
            if (parentNode.scrollHeight > parentNode.scrollTop + divHeight) {
                parentNode.scrollBy(0, divHeight);
                // check if there is a new node avaiable now,
                // if yes click it.
                const newNode = isNodeAvaiable(index + 1);
                if(newNode) {
                    getChildAndClick(newNode, index+1)
                }
            }
        }
    }

    const getTinymceElement = (element) => {
        if(element?.id?.startsWith && element.id.startsWith(NORMAL_SELECTOR)){
            return element;
        }
        if(element && element.querySelector) {
            return element.querySelector(`[id^='${NORMAL_SELECTOR}']`);
        }

    }

    const handleKeyDown = (event) => {
        if ((event.keyCode === 38 || event.keyCode === 40) && event.target.offsetParent.id !== 'popup-visible') {

            const allInteractiveElements = document.querySelectorAll(`[id^='${QUERY_SELECTOR}-']`);
            if (activeElement) {
                let selectedNodeIndex = 0;
                allInteractiveElements.forEach((currentValue, currentIndex) => {
                    if (currentValue.id === activeElement) {
                        selectedNodeIndex = currentIndex
                    }
                });
                // if last tinymce is not blured then cursor will
                // keep on showing if next element is non text
                // element, like image's Label
                allInteractiveElements[selectedNodeIndex]?.childNodes[1]?.blur();
                if (event.keyCode === 38 && selectedNodeIndex !== 0) {
                    getChildAndClick(allInteractiveElements[selectedNodeIndex - 1]);

                }
                else if ((event.keyCode === 38 && selectedNodeIndex === 0) ||
                    (event.keyCode === 40 && selectedNodeIndex === allInteractiveElements.length - 1)) {
                    getChildAndClick(allInteractiveElements[selectedNodeIndex]);
                }
                else if (event.keyCode === 40 && selectedNodeIndex !== allInteractiveElements.length) {
                    getChildAndClick(allInteractiveElements[selectedNodeIndex + 1], selectedNodeIndex);
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
