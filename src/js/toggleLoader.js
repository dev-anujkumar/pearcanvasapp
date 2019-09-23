import config from '../config/config';
import { sendDataToIframe } from '../constants/utility.js';

/** 
 * method 'showBlocker' used to send the message to wrapper via html 5 message for enabling tocBlocker
 *  **/
export const showBlocker = () => {
    sendDataToIframe({'type': "blockerTOC",'message': {status: true}})
    sendDataToIframe({'type': "hideWrapperLoader",'message': {status: true}})
    disableHeader(true);
}

/** 
 * method 'hideBlocker' used to send the message to wrapper via html 5 message for disabling tocBlocker
 *  **/
export const hideBlocker = () => {
    sendDataToIframe({'type': "blockerTOC",'message': {status: false}});
    disableHeader(false);
}
export const showBlockerSectionBreak = ()=>{
    sendDataToIframe({'type': "blockerTOC",'message': {status: true}});
}
export const hideBlockerSectionBreak = ()=>{
    sendDataToIframe({'type': "blockerTOC",'message': {status: false}});
}
export const showTocBlocker = () => {
    sendDataToIframe({'type': "blockerTOC",'message': {status: true}});
    disableHeader(true);
}

export const hideTocBlocker = () => {
    sendDataToIframe({'type': "blockerTOC",'message': {status: false}});
}

export const showBlockerCanvas = ()=>{
    $('.blocker').addClass('activeDND');
}
export const hideBlockerCanvas = ()=>{
    $('.blocker').removeClass('activeDND');
}

export const disableHeader = (message) => {
    var splitSlateVex = "Are you sure you want to split this slate at the selected section?YesCancel";
    var slateAvailableVex = "Error!This slate is no longer available. Please refresh the Table of ContentsOK";
    // if($('.blocker.active').length || $('.blocker.activeDND').length || ($('.vex-content').length && $('.vex-content')[0].textContent == splitSlateVex)|| ($('.vex-content').length && $('.vex-content')[0].textContent == slateAvailableVex)) {
    //     window.parent.postMessage({ 'type': 'headerDisable', 'message': true }, WRAPPER_URL);
    //     return;
    // }
    sendDataToIframe({'type': "headerDisable",'message': message});
    //window.parent.postMessage({ 'type': 'headerDisable', 'message': message }, WRAPPER_URL);
}