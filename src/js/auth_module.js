const configOBJ = require('./../config/config');
let config_object = configOBJ.default;
const WRAPPER_URL = config_object.WRAPPER_URL;
const IDENTITY_URL = config_object.IDENTITY_URL;
let environment = config_object.NODE_ENV;

/* auth */
require('../auth/openam.js');
import openamConfig from '../auth/openam.js';
//require('./auth/openamUtils.js');

/*function getDocumentCookies() {
    var theCookies = document.cookie.split(';'),
        cookieObj = {},
        tmp, tmpName, tmpVal;
    for (var i = 1 ; i <= theCookies.length; i++) {
        tmp = theCookies[i-1].split('=');
        tmpName = decodeURIComponent(tmp[0].trim());
        tmpVal = decodeURIComponent(tmp[1].trim());
        if ( tmpName.indexOf('[') > -1 && tmpName.indexOf(']') > -1 ) {
            cookieObj[tmpName.split('[')[0]] = cookieObj[tmpName.split('[')[0]] || {};
            cookieObj[tmpName.split('[')[0]][tmpName.split('[')[1].replace(']', '')] = tmpVal;
        } else {
            cookieObj[tmpName] = tmpVal;
        }
    }
    return cookieObj;
}*/

/* Session Variables */
let session_token = "";
//let token;

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

        ////console.log("USER IS AUTHENTICATED");
        ////console.log("session_token: " + utility_modules.getDocumentCookies().PearsonSSOSession);
        session_token = config_object.ssoToken;
        //configModule.SET_CONFIG('SSO_TOKEN', session_token);

    } else {
        if(process.env.NODE_ENV === 'production'){
            // window.location = '/login-html/login.html'
            document.cookie = "PearsonSSOSession=; expires=Thu, 01 Jan 1970 00:00:01 GMT ;domain=.pearson.com;path=/";
            // reload the page
            window.parent.postMessage(  {
                'type': 'reloadUrl',
                'message': {}
            },
            WRAPPER_URL)
            // document.location.reload();
        }
        //console.log("USER IS NOT AUTHENTICATED");

    }

}
if (environment === 'development') {
   // token = require('../../token');
   session_token = config_object.ssoToken;

    myOpenam = {
        handleSessionExpire : function(){
            let redirectURL = window.location.origin;
            /*if(process.env.NODE_ENV=='production'){
                 redirectURL = 'https://mycloud.pearson.com/redirect?url='+window.location;                
            }
            else {
                 redirectURL = 'https://mycloudtest.pearson.com/redirect?url='+window.location;
            }*/
            let encodedURL = encodeURI(redirectURL);
            window.location = encodedURL;
        }
    }
}

//console.log("SERVER SIDE sso_token: " + '', session_token);

// module.exports = {

//     GET_SSO_TOKEN: function(){
//         return session_token;
//     }
// };

export const OPEN_AM = myOpenam || {};
//module.exports.OPEN_AM = {};
