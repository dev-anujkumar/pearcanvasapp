/**
 * Module - utility
 * Description - This file contains utility functions to be shared across
 * Developer - Abhay Singh
 * Last modified - 11-09-2019
 */

// IMPORT - Module dependencies
import config from '../config/config';
import store from '../appstore/store'

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

export const hasProjectPermission = (value) => {
    const authStore = store.getState();
    let permissions = authStore && authStore.appStore.permissions;
    let hasPermissions = permissions && permissions.includes(value)
    return hasPermissions;
}


export const hasReviewerRole = (value) => {
    if (value) {
        return !(hasProjectPermission(value) ? true : false)
    }
    const authStore = store.getState();
    let hasRole = authStore.appStore && (authStore.appStore.roleId === "comment_only"
        && (hasProjectPermission('note_viewer'))) ? true : false;
    return hasRole;
}
/**
 * [TK-1948] | Check & Fix Regular Expressions Dependency
 * Use of String.prototype.matchAll : matchAll does not raise any issue as it is not supported by NodeJS.
 * @param {String} html : input html to matched with regex
 */
export const matchHTMLwithRegex = function (html) {
    if (html) {
        let matchedTerms = [...String.prototype.matchAll.call(html, /(<p.*?>.*?<\/p>)/g)]
        if (matchedTerms.length > 0) {
            return true
        }
        return false
    }
    return false
}