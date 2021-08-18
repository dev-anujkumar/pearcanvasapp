import { sendDataToIframe } from '../constants/utility.js'
const configOBJ = require('./../config/config');
let config_object = configOBJ.default;
const IDENTITY_URL = config_object.IDENTITY_URL;
let environment = config_object.NODE_ENV;

/* auth */
require('../auth/openam.js');
import openamConfig from '../auth/openam.js';

/* Session Variables */
let session_token = "";

var BASE_URL;

if ( IDENTITY_URL.indexOf("http") !== 1 ) {
    BASE_URL = IDENTITY_URL;   
} else {
    BASE_URL = "https://"+IDENTITY_URL;
}

var myOpenam;
if ( environment !== 'development' ) {
    myOpenam = new openamConfig(
        {	
            baseurl: BASE_URL,
            realm: "/",
            cachetime: 3,
            debugenabled: true
        }
    );
    if (myOpenam.isUserAuthenticated()) {
        session_token = config_object.ssoToken;
    } else {
        if(process.env.NODE_ENV === 'production'){
            document.cookie = "PearsonSSOSession=; expires=Thu, 01 Jan 1970 00:00:01 GMT ;domain=.pearson.com;path=/";
            // reload the page
            sendDataToIframe(  {
                'type': 'reloadUrl',
                'message': {}
            })
        }
    }
}
if (environment === 'development') {
   session_token = config_object.ssoToken;
    myOpenam = {
        handleSessionExpire : function(){
            let redirectURL = window.location.origin;
            let encodedURL = encodeURI(redirectURL);
            window.location = encodedURL;
        }
    }
}

export const OPEN_AM = myOpenam || {};
