/**Import -Plugins */
import React from 'react';
import config from '../../config/config';
import store from '../../appstore/store';
import { checkSlateLock } from '../../js/slateLockUtility';
import { releaseSlateLockWithCallback, getSlateLockStatus } from '../CanvasWrapper/SlateLock_Actions';
import { handleSlateRefresh } from '../CanvasWrapper/SlateRefresh_Actions';
import { sendDataToIframe } from '../../constants/utility.js';
import { updateElmItemData, setItemUpdateEvent, setNewItemFromElm } from '../AssessmentSlateCanvas/AssessmentActions/assessmentActions.js';
import { Resource_Type } from '../AssessmentSlateCanvas/AssessmentSlateConstants';
/**
 * This module deals with the event handling for the Update of Full and Embedded Elm Assessments
 * for the events triggered from the Elm Assessment Portal
*/
export const handleElmPortalEvents = (action,eventType) => {
    let slateLockInfo = store.getState().slateLockReducer.slateLockInfo;
    if (!checkSlateLock(slateLockInfo)) {

        let elmAssessmentUpdate = async (event) => {
            try {
                const { data } = event;
                // console.log('%c Interactive edit-in-place messages>>>BEFORE>>>','background: #222; color: white',data)
                if (eventType == 'fromUpdate') {
                    if (action == 'add' && data && data.source == 'elm') {
                        //console.log('Event From ELM Portal>>>', data)
                        if (data.type.includes('item|')) {
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
                    } else {
                        // console.log('%c Interactive edit-in-place messages>>>','background: #222; color: #bada55',data)
                        /* To edit interactive using edit button */
                        const intObj = getInteractivePostMsg(data)
                        window.removeEventListener('message', elmAssessmentUpdate, false);
                        if (intObj?.id && intObj.title && intObj.interactiveType) {
                            /* save item data into store */
                            //store.dispatch(setNewItemFromElm(intObj));
                            handleRefreshSlate(store.dispatch);
                        }
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
export const handlePostMsgOnAddAssess = (addPufFunction, usagetype, type, action, eventType) => {
    let slateLockInfo = store.getState()?.slateLockReducer?.slateLockInfo;
    if (!checkSlateLock(slateLockInfo)) {
        const getMsgafterAddAssessment = async (event) => {
            try {
                const { data = {} } = event;
                // console.log('%c create-in-place messages>>>BEFORE>>>','background: #222; color: red',data)
                /* Get Assessment data from Post message */
                if(eventType == 'fromCreate'){
                    /* Get the item data from store */
                    const itemData = store.getState().assessmentReducer?.item ?? {};
                    if (data.source === "elm") {                  
                        const items = data.type?.split("|") ?? []; 
                        if(items.length >= 4){                  
                            /* Update newly added Assessment */
                            if (items[0] === "assessment") {
                                getAssessmentPostMsg(items, usagetype, addPufFunction, itemData, type, getMsgafterAddAssessment);
                            }
                            /* Get newly added Item from post messages */
                            else if (items[0] === "item") {
                                getAssessmentItemPostMsg(items);
                            }
                        }
                    } else if(type === 'interactive'){
                        // console.log('%c create-in-place messages>>>BEFORE>>>','background: #222; color: pink',data)
                        /* Get Interactive data from Post message */
                        const intObj = getInteractivePostMsg(data);
                        if(intObj?.id && intObj.title && intObj.interactiveType){
                            /**@function to update data display in interactive  */
                            intObj.callFrom = "fromEventHandling";
                            addPufFunction(intObj);
                        }
                    }
                }
                if(action === "remove"){
                    /* Remove EventListener */
                    window.removeEventListener("message", getMsgafterAddAssessment, false);
                }
            } catch (err) {
                console.error("catch with err", err);
            }
        };
        window.addEventListener("message", getMsgafterAddAssessment, false);
    }
};

function getInteractivePostMsg(data){
    /* get data from post message */
    if (typeof data === "string") {
        const interactives = data?.split("|") ?? [];
        if (interactives?.length && interactives[0] === "interactive") {
            let dataToSend = {}
            interactives.map((key) => {
                const itemKey = key?.split("_");
                switch (itemKey[0]) {
                    case 'wUrn':
                        dataToSend.id = itemKey[1];
                        break;
                    case 'elementUrn':
                        dataToSend.elementUrn = itemKey[1];
                        break;
                    case 'title':
                        dataToSend.title = itemKey[1];
                        break;
                    case 'type':
                        dataToSend.interactiveType = itemKey[1];
                        break;
                }
            })
            return dataToSend
        }
    }  
}
/* get assessment items data from post message */
function getAssessmentItemPostMsg(items){
    const itemDataFromMsg = {
        itemid: items[1]?.split("_")[1],
        elementUrn: items[2]?.split("_")[1],
        itemTitle: items[3]?.split("_")[1],
        calledFrom:'createElm'                               
    };
    /* save item data into store */
    store.dispatch(setNewItemFromElm(itemDataFromMsg));
}
/* get Assessment data from post message and send to server */
function getAssessmentPostMsg(items, usagetype, addPufFunction, itemData, type, getMsgafterAddAssessment){
    /* Single Assessment - get data form post messages and update the server */
    let itemsData = items?.splice(1, items.length - 1)
    let assessmentDataMsg = {
        calledFrom:'createElm'
    };
    itemsData.map((key) => {
        const itemKey = key?.split("_");
        switch (itemKey[0]) {
            case 'wUrn':
                assessmentDataMsg.id = itemKey[1];
                break;
            case 'elementUrn':
                assessmentDataMsg.elementUrn = itemKey[1];
                break;
            case 'title':
                assessmentDataMsg.title = itemKey[1];
                break;
            case 'usageType':
                assessmentDataMsg.usagetype = itemKey[1]  || usagetype;
                break;
        }
    })
    const { elementUrn, itemid, itemTitle } = itemData || {};
    if((assessmentDataMsg.elementUrn === elementUrn) && itemid && itemTitle) {
        assessmentDataMsg = { ...assessmentDataMsg, ...itemData };
        /**@function to update data to server by api call */
        addPufFunction(assessmentDataMsg);
        /* Remove EventListener */
        window.removeEventListener("message", getMsgafterAddAssessment, false);

    /* Full Assessment - get data form post messages and update the server */
    } else if(type === Resource_Type.ASSESSMENT) {
        addPufFunction(assessmentDataMsg);
        /* Remove EventListener */
        window.removeEventListener("message", getMsgafterAddAssessment, false);
    }
}