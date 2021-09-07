const configOBJ = require('./../config/config');
let config_object = configOBJ.default;
import {c4PublishObj} from '../js/c4_module.js';
import { releaseSlateLockWithCallback } from '../component/CanvasWrapper/SlateLock_Actions'

var current_slate_urn='';
/**
* @description - Set current slate URN.
* @param {urn} - Slate URN
*/
export const SET_CURRENT_SLATE = function (urn){
    current_slate_urn = urn;
}
/**
* @description -  Get current slate URN.
*/
export const GET_CURRENT_SLATE = function (){
    return current_slate_urn;
}

/**
* @description - Redirects to slate preview or project preview.
* @param {type} -  Type of preview(Slate/Project)
*/
export const publishContent = function (type) {
    var projectURN = config_object.projectUrn;
    var citeURN = config_object.citeUrn;
    var firstSlate = config_object.slateManifestURN;
    if(type == 'slatePreview') {
        c4PublishObj.publishSlate(projectURN,firstSlate,citeURN);
    }
    else if(type == 'projectPreview') {
        c4PublishObj.publishTitle(projectURN,firstSlate,citeURN, undefined, true);

    }
}

/**
* @description - Logout user's session.
*/
export const logout = function () {

    let { projectUrn, slateManifestURN } = config_object
    let urlToBeRedirected = getMyURL() || '';
    if (projectUrn && slateManifestURN && slateManifestURN != "undefined") {
        releaseSlateLockWithCallback(projectUrn, slateManifestURN, (response) => {
            logoutWithModernOpenAM()
            redirectParent(urlToBeRedirected);
        });
    }
    else {
        logoutWithModernOpenAM()
        redirectParent(urlToBeRedirected);
    }
}
const getMyURL = () => {
    var host = window.parent?.location?.hostname || "";
    var protocol = window.parent?.location?.protocol || "";
    var port = window?.parent?.location?.port || "";
    var path = window?.parent?.location?.pathname || "";
    var search = window?.parent?.location?.search || "";
    return protocol + "//" + host + ":" + port + path + search;
}
const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
const redirectParent = (urlToBeRedirected) => {
    urlToBeRedirected = urlToBeRedirected + `&_Instance=${uuidv4()}`
    let encodedURL = encodeURI(urlToBeRedirected);
    sendDataToIframe({
        'type': 'autoLogOut',
        'message': { url: encodedURL }
    });
}
const logoutWithModernOpenAM = () => {
    deleteCookie('PearsonSSOSession', 'pearson.com');
    removeAllLocal();
};

const removeAllLocal = () => {
    if (storageExist) {
        try {
            debug("removeAllLocal: REMOVING ALL");
            removeLocal("validSession");
            removeLocal("attributes");
        } catch (err) {
            // Do nothing
        }
    }
}
const removeLocal = (storageKey) => {
    if (storageExist) {
        try {
            debug("removeLocal: REMOVING " + storageKey);
            sessionStorage.removeItem(storageKey);
        } catch (err) {
            // Do nothing
        }
    }
}


const deleteCookie = (name, domainName) => {
    createCookie(name, "", -1, domainName);
}

const createCookie = (name, value, hours, domainName) => {
    var expires;
    var domain;
    if (hours) {
        var date = new Date();
        date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
        domain = ";domain=" + domainName;
    } else {
        expires = "";
        domain = ";domain=" + domainName;
    }
    document.cookie = escape(name) + "=" + escape(value) + expires + domain + "; path=/";
    console.log("document.cookie: " + document.cookie);
}