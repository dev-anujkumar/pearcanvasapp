import { sendDataToIframe } from '../constants/utility.js';
import {ShowLoader} from '../constants/IFrameMessageTypes.js';
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

export const showHeaderBlocker = () => {
    disableHeader(true);
}

export const hideTocBlocker = () => {
    sendDataToIframe({'type': "blockerTOC",'message': {status: false}});
}

export const disableHeader = (message) => {
    sendDataToIframe({'type': "headerDisable",'message': message});
}

export const hideToc = () => {
    sendDataToIframe({ 'type': 'hideToc', 'message': {} });
}

export const ShowCanvasLoader = (status) => {
    sendDataToIframe({'type': ShowLoader,'message': { status: status }});
}