const configOBJ = require('./../config/config');
let config_object = configOBJ.default;
import {c4PublishObj} from '../js/c4_module.js';
import { OPEN_AM } from './auth_module';
// import { releaseSlateLockWithCallback } from '../component/CanvasWrapper/SlateLock_Actions'

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
    OPEN_AM.logout();
}