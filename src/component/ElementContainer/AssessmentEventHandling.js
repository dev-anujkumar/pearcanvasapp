/**Import -Plugins */
import React from 'react';
import config from '../../config/config';
import store from '../../appstore/store';
import { checkSlateLock } from '../../js/slateLockUtility';
import { releaseSlateLockWithCallback, getSlateLockStatus } from '../CanvasWrapper/SlateLock_Actions';
import { handleSlateRefresh } from '../CanvasWrapper/SlateRefresh_Actions';
import { sendDataToIframe } from '../../constants/utility.js';
import { updateElmItemData, setItemUpdateEvent, setNewItemFromElm } from '../AssessmentSlateCanvas/AssessmentActions/assessmentActions.js';
/**
 * This module deals with the event handling for the Update of Full and Embedded Elm Assessments
 * for the events triggered from the Elm Assessment Portal
*/
export const handleElmPortalEvents = (action = 'add') => {
    let slateLockInfo = store.getState().slateLockReducer.slateLockInfo;
    if (!checkSlateLock(slateLockInfo)) {

        let elmAssessmentUpdate = async (event) => {
            try {
                const { data } = event;
                if (action == 'add' && data && data.source == 'elm') {
                    //console.log('Event From ELM Portal>>>', data)
                    if(data.type.includes('item|')){
                        const itemMetadata = prepareItemMetadata(data.type)
                        store.dispatch(updateElmItemData(store.getState().assessmentReducer.currentEditAssessment, itemMetadata))
                        store.dispatch(setItemUpdateEvent(true))
                    }
                    if (data.action == 'approve') {
                        window.removeEventListener('message', elmAssessmentUpdate, false);
                    }
                    if (data.type == 'assessment') {
                        handleRefreshSlate(store.dispatch);
                    }
                }
                if (action == 'remove') {
                    window.removeEventListener('message', elmAssessmentUpdate, false);
                }
            } catch (err) {
                console.error('catch with err', err);
            }
        }
        window.addEventListener('message', elmAssessmentUpdate, false);
    }
}

/** This function handles Slate-Refresh when an Elm Event is received */
export const handleRefreshSlate = (dispatch) => {
    localStorage.removeItem('newElement');
    config.slateManifestURN = config.tempSlateManifestURN ? config.tempSlateManifestURN : config.slateManifestURN
    config.slateEntityURN = config.tempSlateEntityURN ? config.tempSlateEntityURN : config.slateEntityURN
    config.tempSlateManifestURN = null
    config.tempSlateEntityURN = null
    config.isPopupSlate = false
    let id = config.slateManifestURN;
    releaseSlateLockWithCallback(config.projectUrn, config.slateManifestURN, (response) => {
        config.page = 0;
        config.scrolling = true;
        config.totalPageCount = 0;
        config.pageLimit = 0;
        config.fromTOC = false;
        sendDataToIframe({ 'type': 'slateRefreshStatus', 'message': { slateRefreshStatus: 'Refreshing...' } });
        dispatch(handleSlateRefresh(id, () => {
            config.isSlateLockChecked = false;
            getSlateLockStatus(config.projectUrn, config.slateManifestURN)
        }))
    });
}
export const reloadSlate = () => {
    handleRefreshSlate(store.dispatch);
}

/**
 * This function prepares item id and title from elm-item event message
 * @param {String} eventData contains latest item id and item title
 */
export const prepareItemMetadata = (eventData) =>{
    const itemId = eventData.split('|')[1].substring(5);
    const itemTitle = eventData.slice(eventData.indexOf('title_')+6) ;
    return {
        itemId,itemTitle
    }
}

/* update on getting message form elm portal */
export const handlePostMsgOnAddAssess = (addPufFunction, usagetype) => {
    let slateLockInfo = store.getState()?.slateLockReducer?.slateLockInfo;
    if (!checkSlateLock(slateLockInfo)) {
        const getMsgafterAddAssessment = async (event) => {
            try {
                const { data = {} } = event;
                /* Get the data from store */
                const itemData = store.getState().assessmentReducer?.item ?? {};

                if (data.source === "elm") {                  
                    const items = data.type?.split("|") ?? []; 
                    if(items.length >= 3){                  
                        /* Update newly added assessment */
                        if (items[0] === "assessment") {
                            let assessmentDataMsg = {
                                id: items[1]?.split("_")[1],
                                title: items[2]?.split("_")[1],
                                usagetype: usagetype, 
                            };
                            
                            if(itemData?.itemid && itemData.itemTitle && itemData.usagetype){
                                assessmentDataMsg = { ...assessmentDataMsg, ...itemData }
                            }
                            /**@function to update data display in slate */
                            addPufFunction(assessmentDataMsg);
                            /* Remove EventListener */
                            window.removeEventListener(
                                "message",
                                getMsgafterAddAssessment,
                                false
                            );
                        }                  
                        /* Update newly added Item */
                        else if (items[0] === "item") {
                            const itemDataFromMsg = {
                                itemid: items[1]?.split("_")[1],
                                itemTitle: items[2]?.split("_")[1],
                                usagetype: usagetype,                               
                            };
                            /* save item data into store */
                            store.dispatch(setNewItemFromElm(itemDataFromMsg));
                        }  
                    }                
                }
            } catch (err) {
                console.error("catch with err", err);
            }
        };
        window.addEventListener("message", getMsgafterAddAssessment, false);
    }
};
