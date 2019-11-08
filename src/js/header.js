const configOBJ = require('./../config/config');
let config_object = configOBJ.default;
import {c4PublishObj} from '../js/c4_module.js';
import store from '../appstore/store';
import { OPEN_AM } from './auth_module';

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
* @description -  Releases slate lock and redirect to dashboard.
*/
export const releaseLockAndRedirect = function () { 
    // let manifest_object = configModule.GET_MANIFEST_OBJECT();
    // let projectUrn = manifest_object['PROJECT_URN'];
    // let slateId = $('.composite-artboard').attr('data-id');
    // if (projectUrn && slateId){
    //     releaseSlateLock(projectUrn, slateId, (response) => {
    //         redirectDashboard();
            
    //     });
    // }
}
/**
* @description -  Redirect to dashboard.
*/
// function redirectDashboard () {
//     window.parent.postMessage(  {
//         'type': 'redirectTODashboard',
//         'message': {}
//     },
//     WRAPPER_URL)
// }
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
        c4PublishObj.publishTitle(projectURN,"",citeURN, undefined, true);

    }
}

/**
* @description - Used to toggle the comments panel block.
*/
// export const toggleCommentsPanel = function () {
//     store.dispatch({ 
//         type: 'TOGGLE_COMMENTS_PANEL', 
//         payload: { 
//         openCommentsPanel: !store.getState().prepareAllSlates.openCommentsPanel}
//     })
// }
/**
* @description - Logout user's session.
*/
export const logout = function () {
    OPEN_AM.logout();
}
/**
* @description - Redirects to track changes.
*/
export const trackChanges = function () {
    // let slateLockSatus, SlatelockUserInfo;
    // launchTrackChanges(slateLockSatus, SlatelockUserInfo);
}