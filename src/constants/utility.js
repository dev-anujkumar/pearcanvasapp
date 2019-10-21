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