import store from '../../appstore/store.js';
import { assetPopoverPopup, getAssetPopoverId, getCurrentlyLinkedImage } from './AssetPopover_Actions.js'
//Call this function and pass 'id' to it after that we will handle all... ♀☺♪ 

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
    //Now use Id in API
    //....
}

export const authorAssetPopOver = (toggleApoPopup, apoObject={}) => {
    // Get currently linked data
    if (Object.keys(apoObject).length) {
        //api call
        getCurrentlyLinkedImage(apoObject.dataUrn, (currentlyLinkedImageData) => {
            store.dispatch({
                type: 'TOGGLE_APO_SEARCH',
                payload: {
                    apoObject: apoObject,
                    toggleApo: toggleApoPopup,
                    showApoCurrentlyLinked: true,
                    currentlyLinkedImageData: currentlyLinkedImageData[0]
                }
            });
        })
    } else {
        //No data associated
        store.dispatch({
            type: 'TOGGLE_APO_SEARCH',
            payload: {
                apoObject: {},
                toggleApo: toggleApoPopup,
                showApoCurrentlyLinked: false,
                currentlyLinkedImageData: {}
            }
        });
    }

}

export const saveAssetLinkedMedia = (apoObject, imageObj) => {
    if (Object.keys(apoObject).length) {
        let domNode = document.querySelector('abbr[asset-id="' + apoObject.assetId + '"');
        let originalText = domNode.innerHTML;
        let elementId = imageObj['entityUrn'];
        domNode.outerHTML = '<abbr title="Asset Popover" asset-id="' + apoObject.assetId + '" data-uri="' + elementId + '" class="Pearson-Component AssetPopoverTerm">' + originalText + '</abbr>';

    } else {
        //Hit api for asset popover Id
        getAssetPopoverId((assetPopoverId) => {
            let domNode = document.getElementById('asset-popover-attacher');
            let originalText = domNode.innerHTML;
            let elementId = imageObj['entityUrn'];

            domNode.outerHTML = '<abbr title="Asset Popover" asset-id="' + assetPopoverId + '" data-uri="' + elementId + '" class="Pearson-Component AssetPopoverTerm">' + originalText + '</abbr>';
            // $('abbr[asset-id="' + apoObject.id + '"]').attr("data-uri",elementId);
            // $('abbr.Pearson-Component.AssetPopoverTerm').on('click', this.authorAssetPopOver);
        })
    }
}

export const clearAssetPopoverLink =(assetPopoverID) => {
    let domNode = document.querySelector('abbr[asset-id="' + assetPopoverID + '"');
    let originalText = domNode.innerHTML;
    domNode.outerHTML = originalText;
}
