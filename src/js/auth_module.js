const configOBJ = require('./../config/config');
let config_object = configOBJ.default;
const IDENTITY_URL = config_object.IDENTITY_URL;
let environment = config_object.NODE_ENV;

/* auth */
require('../auth/openam.js');

var BASE_URL;

if ( IDENTITY_URL.indexOf("http") !== 1 ) {
    BASE_URL = IDENTITY_URL;   
} else {
    BASE_URL = "https://"+IDENTITY_URL;
}

var myOpenam;
export const OPEN_AM = myOpenam || {};
