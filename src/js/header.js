import axios from 'axios';
const configOBJ = require('./../config/config');
let config_object = configOBJ.default;
import { publishSlate, publishTitle } from '../js/c4_module.js';
import { releaseSlateLockWithCallback } from '../component/CanvasWrapper/SlateLock_Actions'
import { sendDataToIframe } from '../constants/utility';
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
    var firstSlate = config_object.isPopupSlate ? config_object.tempSlateManifestURN : config_object.slateManifestURN;
    if(type == 'slatePreview') {
        publishSlate(projectURN,firstSlate,citeURN);
    }
    else {
        publishTitle(projectURN,firstSlate,citeURN, undefined, true, type);
    }
}
let storageExist = ("sessionStorage" in window && window.sessionStorage);
/**
* @description - Logout user's session.
*/
export const logout = function () {
    let { projectUrn, slateManifestURN } = config_object
    //let urlToBeRedirected = getMyURL() || '';
    // let urlToBeRedirected=window.parent.location.href
    // console.log("urlToBeRedirected>>>>>>",urlToBeRedirected)
    if (projectUrn && slateManifestURN && slateManifestURN != "undefined") {
        releaseSlateLockWithCallback(projectUrn, slateManifestURN, (response) => {
            logoutWithModernOpenAM()
            //redirectParent(urlToBeRedirected);
        });
    }
    else {
        logoutWithModernOpenAM()
        //redirectParent(urlToBeRedirected);
    }
}
const getMyURL = () => {
    const host = window?.parent?.location?.hostname || "";
    const protocol = window?.parent?.location?.protocol || "";
    const path = window?.parent?.location?.pathname || "";
    const search = window?.parent?.location?.search || "";
    //window?.parent?.location?.protocol+'//'+window?.parent?.location?.host+window?.parent?.location?.path+window?.parent?.location?.search
    return protocol + "//" + host + path + search;
}
const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
const redirectParent = (urlToBeRedirected) => {
    //urlToBeRedirected = urlToBeRedirected + `&_Instance=${uuidv4()}`
    let encodedURL = encodeURIComponent(urlToBeRedirected);
    sendDataToIframe({
        'type': 'autoLogOut',
        'message': { url: encodedURL }
    });
}
// const logoutWithModernOpenAM = async () => {
//     const response = await logoutDataActions()
//     console.log("get response in api",response)


// };
const logoutWithModernOpenAM = async () => {
    try {
        let urlToBeRedirected = window.parent.location.href;
        await axios.post(config_object.LOGOUT_API, null, {
            headers: {
                "Content-Type": "application/json",
                'myCloudProxySession': config_object.myCloudProxySession
            }
        })
            .then(response => {
                if (response && response.status === 200) {
                    // remove owner slate popup flag from local storage
                    const isOwnerKey = localStorage.getItem('hasOwnerEdit');
                    const isSubscriberKey = localStorage.getItem('hasSubscriberView');
                    if (isOwnerKey) {
                        localStorage.removeItem('hasOwnerEdit');
                    } else if (isSubscriberKey) {
                        localStorage.removeItem('hasSubscriberView');
                    }
                    deleteCookie('PearsonSSOSession', 'pearson.com');
                    deleteCookie('myCloudProxySession', 'pearson.com');
                    deleteCookie('DISABLE_DELETE_WARNINGS', 'pearson.com');
                    deleteCookie('DISABLE_LIST_ELEMENT_WARNING', 'pearson.com');
                    deleteCookie('DISABLE_DI_CONVERSION_WARNING', 'pearson.com');
                    removeAllLocal();
                    redirectParent(urlToBeRedirected);
                }
            })
            .catch(error => {
                console.error("Error in logout api ", error)
                //return err

            })
    } catch (error) {
        console.error('logout error', error)
        //return error
    }
}

const removeAllLocal = () => {
    if (storageExist) {
        try {
            console.log("removeAllLocal: REMOVING ALL");
            removeLocal("validSession");
            removeLocal("attributes");
        } catch (err) {
            // Do nothing
            console.log("removeAllLocal: Do nothing ");
        }
    }
}
const removeLocal = (storageKey) => {
    if (storageExist) {
        try {
            console.log("removeLocal: REMOVING " + storageKey);
            sessionStorage.removeItem(storageKey);
        } catch (err) {
            // Do nothing
            console.log("removeLocal: Do nothing ");
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


