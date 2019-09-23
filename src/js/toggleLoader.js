import config from '../config/config';
import { sendDataToIframe } from '../constants/utility.js';

/** 
 * method 'showBlocker' used to send the message to wrapper via html 5 message for enabling tocBlocker
 *  **/
export const showBlocker = () => {
    sendDataToIframe({'type': "blockerTOC",'message': {status: true}})
}

/** 
 * method 'hideBlocker' used to send the message to wrapper via html 5 message for disabling tocBlocker
 *  **/
export const hideBlocker = () => {
    sendDataToIframe({'type': "blockerTOC",'message': {status: false}});
}
export const showBlockerSectionBreak = ()=>{
    sendDataToIframe({'type': "blockerTOC",'message': {status: true}});
}
export const hideBlockerSectionBreak = ()=>{
    sendDataToIframe({'type': "blockerTOC",'message': {status: false}});
}
export const showTocBlocker = () => {
    sendDataToIframe({'type': "blockerTOC",'message': {status: true}});
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