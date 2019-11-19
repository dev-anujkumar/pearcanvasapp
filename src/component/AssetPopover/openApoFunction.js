/**
 * Asset popover Action functions
 */

import store from '../../appstore/store.js';
import {
    getAssetPopoverId,
    getCurrentlyLinkedImage
} from './AssetPopover_Actions.js'
import { TOGGLE_APO_SEARCH } from '../../constants/Action_Constants';

/**
 * Responsable for opening assetpopover
 */
export const openApoSearchFunction = (apoObject) => {
    let showApoCurrentlyLinked = false;
    if (apoObject.title && apoObject.title.text) {
        showApoCurrentlyLinked = true;
    }
    store.dispatch({
        type: TOGGLE_APO_SEARCH,
        payload: {
            apoObject: apoObject,
            toggleApo: true,
            showApoCurrentlyLinked: showApoCurrentlyLinked
        }
    });
}

/**
 * Middleware function b/w assetpopover and parent component
 */
export const authorAssetPopOver = (toggleApoPopup, apoObject = {}) => {
    // Get currently linked data
    let showApoCurrentlyLinked = false, currentlyLinkedImageData = {};
    if (Object.keys(apoObject).length) {
        //api call
        getCurrentlyLinkedImage(apoObject.dataUrn, (resCurrentlyLinkedImageData) => {
            if(Object.keys(resCurrentlyLinkedImageData).length){
                showApoCurrentlyLinked = true
                setAssetData(toggleApoPopup,apoObject,showApoCurrentlyLinked,resCurrentlyLinkedImageData)
            }
            else
            setAssetData(toggleApoPopup,apoObject,showApoCurrentlyLinked,currentlyLinkedImageData);
        })
    }
    else
    setAssetData(toggleApoPopup,apoObject,showApoCurrentlyLinked,currentlyLinkedImageData);
}

const setAssetData=(toggleApoPopup,apoObject,showApoCurrentlyLinked,currentlyLinkedImageData)=>{
    store.dispatch({
        type: TOGGLE_APO_SEARCH,
        payload: {
            apoObject: apoObject,
            toggleApo: toggleApoPopup,
            showApoCurrentlyLinked: showApoCurrentlyLinked,
            currentlyLinkedImageData: currentlyLinkedImageData
        }
    });
}

/**
 * Handler for clear assetpopover link
 * @param {Id of assetpopover} assetPopoverID 
 */
export const clearAssetPopoverLink = (assetPopoverID) => {
    let domNode = document.querySelector('abbr[asset-id="' + assetPopoverID + '"');
    let originalText = domNode.innerHTML;
    domNode.outerHTML = originalText;
}