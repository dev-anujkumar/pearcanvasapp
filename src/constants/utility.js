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

export const sendDataToIframe = (messageObj) => {
    if(messageObj.type==='ShowLoader'){
        /**
         * This code has been written to prevent typing while loader is on
         */
        window.getSelection().removeAllRanges();
    }
    window.parent.postMessage(messageObj, WRAPPER_URL)
}

//Generate random number
export const guid = () => {
    function s4() {
        const crypto = window.crypto || window.msCrypto;
        let array = new Uint32Array(1);
        const randomValue = crypto.getRandomValues(array);

        return Math.floor((1 + randomValue[0]) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}