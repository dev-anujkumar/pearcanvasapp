/**
 * Module - utility
 * Description - This file contains utility functions to be shared across
 * Developer - Abhay Singh
 * Last modified - 11-09-2019
 */

// IMPORT - Module dependencies
import config from '../config/config';

// DECLARATION - const or variables 
const WRAPPER_URL = config.WRAPPER_URL; // TO BE IMPORTED
import { ShowLoader } from '../constants/IFrameMessageTypes.js';

export const sendDataToIframe = (messageObj) => {
    window.parent.postMessage(messageObj, WRAPPER_URL)
}

//Generate random number
export const guid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

//Sortable props config
export const sortableProps = (paramObj) => {
    // https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute
    /**
     * @param  
     */
    // let paramObj = {
    //     filterClass : '.elementSapratorContainer',
    //     draggableElem : '.editor',
    //     handleClass : '.element-label',
    //     bodyMatter : _slateBodyMatter,
    //     swapElement : this.props.swapElement,
    //     workedExample: false,
    // }

    const {filterClass, draggableElem, handleClass, bodyMatter, swapElement, workedExample} = paramObj;

    let staticOptions = {
        sort: true,  // sorting inside list
        preventOnFilter: true, // Call `event.preventDefault()` when triggered `filter`
        animation: 150,  // ms, animation speed moving items when sorting, `0` — without animation
        dragoverBubble: false,
        removeCloneOnHide: true, // Remove the clone element when it is not showing, rather than just hiding it
        fallbackTolerance: 0, // Specify in pixels how far the mouse should move before it's considered as a drag.
        scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
        scrollSpeed: 10,
        handle: handleClass, //Drag only by element tag name button
        dataIdAttr: 'data-id',
        scroll: true, // or HTMLElement
        filter: filterClass,
        draggable: draggableElem,
        forceFallback: true,
    }

    let methods = {
        onStart: function (/**Event*/evt) {
            // same properties as onEnd
            // _context.checkSlateLockStatus(evt)
        },
        onUpdate: (/**Event*/evt) => {
            let swappedElementData, swappedElementId;
            swappedElementData = bodyMatter[evt.oldDraggableIndex]                                       
            let dataObj = {
                oldIndex: evt.oldDraggableIndex,
                newIndex: evt.newDraggableIndex,
                swappedElementData: swappedElementData,
                workedExample: workedExample,
                swappedElementId: swappedElementId
            }
            swapElement(dataObj, () => {})
            sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
        }
    }

    let utils = {
        // ref: {function(c) {if (c) {let sortable = c.sortable;}}},
        tag: "div",
        // onChange: {function(items, sortable, evt) { }}

    }

    let props = {
        options : {...staticOptions, ...methods},
        ...utils 
    }

    return ({...props})
}
