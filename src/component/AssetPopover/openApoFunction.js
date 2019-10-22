/**
 * Asset popover Action functions
 */

import store from '../../appstore/store.js';
import { getAssetPopoverId, getCurrentlyLinkedImage } from './AssetPopover_Actions.js'

/**
 * Responsable for opening assetpopover
 */
export const openApoSearchFunction = (apoObject) => {
    let showApoCurrentlyLinked = false;
    if (apoObject.title && apoObject.title.text) {
        showApoCurrentlyLinked = true;
    }
    store.dispatch({
        type: 'TOGGLE_APO_SEARCH',
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
export const authorAssetPopOver = (toggleApoPopup, apoObject={}) => {
    // Get currently linked data
    let showApoCurrentlyLinked, currentlyLinkedImageData;
    if (Object.keys(apoObject).length) {
        //api call
        getCurrentlyLinkedImage(apoObject.dataUrn, (currentlyLinkedImageData) => {
            showApoCurrentlyLinked = true
            currentlyLinkedImageData = currentlyLinkedImageData[0]
        })
    } else {
        //No data associated
        showApoCurrentlyLinked = false
        currentlyLinkedImageData = {},
        apoObject = {}
    }
    store.dispatch({
        type: 'TOGGLE_APO_SEARCH',
        payload: {
            apoObject: apoObject,
            toggleApo: toggleApoPopup,
            showApoCurrentlyLinked: showApoCurrentlyLinked,
            currentlyLinkedImageData: currentlyLinkedImageData
        }
    });
}

/**
 * Handler for save assetpopover link
 */
export const saveAssetLinkedMedia = (apoObject, imageObj) => {
    let elementId = imageObj['entityUrn'];
    let originalText, domNode, assetPopoverDomId;

    if (Object.keys(apoObject).length) {
        domNode = document.querySelector('abbr[asset-id="' + apoObject.assetId + '"');
        originalText = domNode.innerHTML;
        assetPopoverDomId = apoObject.assetId
    } else {
        //Hit api for asset popover Id
        getAssetPopoverId((assetPopoverId) => {
            domNode = document.getElementById('asset-popover-attacher');
            originalText = domNode.innerHTML;
            assetPopoverDomId = assetPopoverId
        })
    }
    domNode.outerHTML = '<abbr title="Asset Popover" asset-id="' + assetPopoverDomId + '" data-uri="' + elementId + '" class="Pearson-Component AssetPopoverTerm">' + originalText + '</abbr>';
}

/**
 * Handler for clear assetpopover link
 * @param {Id of assetpopover} assetPopoverID 
 */
export const clearAssetPopoverLink =(assetPopoverID) => {
    let domNode = document.querySelector('abbr[asset-id="' + assetPopoverID + '"');
    let originalText = domNode.innerHTML;
    domNode.outerHTML = originalText;
}