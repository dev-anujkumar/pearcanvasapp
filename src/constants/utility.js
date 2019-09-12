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
    window.parent.postMessage(messageObj, WRAPPER_URL)
}