const configOBJ = require('./../config/config');
let config_object = configOBJ.default;
const WRAPPER_URL = config_object.WRAPPER_URL;
import {c4PublishObj} from '../js/c4_module.js';
import store from '../appstore/store';
import utils from './utils'
//import { releaseSlateLock } from "../actions/slateLockAction";
import { OPEN_AM } from '../auth/openam';
//import {launchTrackChanges} from '../jsx/tcm/launchTrackChanges';
//import icontains from "./jquery.icontains";
/*VEX*/
// const vex = require('vex-js');
// vex.defaultOptions.className = 'vex-theme-os';
/*VEX*/

//import { showTocBlocker, hideTocBlocker, disableHeader } from './toggleLoader'

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
function redirectDashboard () {
    window.parent.postMessage(  {
        'type': 'redirectTODashboard',
        'message': {}
    },
    WRAPPER_URL)
}
/**
* @description - Redirects to slate preview or project preview.
* @param {type} -  Type of preview(Slate/Project)
*/
export const publishContent = function (type) {
    //console.log("publishing content");
    //console.log("CONTENT LENGTH -- HOW MANY SLATES: " + document.getElementById('artboard-container').childNodes.length);

    var projectURN = config_object.projectUrn;
    var citeURN = config_object.citeUrn;
    var firstSlate = config_object.slateManifestURN;
    //console.log("CURRENT SLATE URN FOR PREVIEW/PUBLISH: " + '',projectURN,current_slate_urn,citeURN, firstSlate);
    if(type == 'slatePreview') {
        c4PublishObj.publishSlate(projectURN,firstSlate,citeURN);
    }
    else if(type == 'projectPreview') {
        c4PublishObj.publishTitle(projectURN,"",citeURN, undefined, true);

    }
}
/**
* @description - Search for the text input by user in entire slate.
* @param {data} - data to be searched in the slate.
*/
// export const searchText= function(data) {
//     if (data) {
//         let sizeMatches = 0;
//         let elements = [];
//         let isMatch = false;
//         //SELECT ALL ARTBOARD CHILDREN
//         let editors = $('#artboard div div').children();
//         //FILTER ONLY EDITORS
//         let onlyEditors = editors.filter( "#appender" );
//         let currentQuery = data;
//         let replaceTarget = [];
//         //SEARCH WITH CASE SETTINGS AND MARK MATCHES
//         let currentElement = !store.getState().toolbar.search_matchCase ? $(".composite-editor .fr-element:icontains('"+ data + "')" ) : $(".composite-editor .fr-element:contains('"+ data + "')" );

//         currentElement.each((index, element) => {

//             $(element).attr("replacer-editor", index + 1);
//             $(element).attr("id", `replacer-editor-${index + 1}`);
//             let urn = $(`#replacer-editor-${ index + 1 }`).closest( ".editor-instance" ).attr("data-id");
//             replaceTarget.push({
//                 index: index + 1,
//                 element: element,
//                 text: element.innerHTML,
//                 urn: urn,
//                 slate_container: null
//             });
//         });
//         onlyEditors.each((index, element) => {
//             //SEARCH WITH CASE SETTINGS
//             elements = !store.getState().toolbar.search_matchCase  ? $(".composite-editor .fr-element:icontains('"+ data + "')" ) : $(".composite-editor .fr-element:contains('"+ data + "')" );
//             // sizeMatches = _.size(elements);
//             sizeMatches = elements.length;
//         });
//         // isMatch = _.size(currentElement) > 0;
//         isMatch = currentElement.length > 0;
//         if (isMatch) {
//             store.dispatch({ type: 'UPDATE_TOOLBAR_MENU', payload: { 
//                 isSearching: true,
//                 currentQuery: currentQuery,
//                 size: elements.length,
//                 replaceTarget: replaceTarget} } )
//             // this.props.updateIsSearching(currentQuery,sizeMatches,elements,replaceTarget);
//             // this.props.updateIsSearching(currentQuery,sizeMatches,elements,replaceTarget);
//         // } else if((!this.props.isSearching  || _.size(this.props.replaceTargets) === 0 ) && !isMatch) {
//         } else if((!store.getState().toolbar.isSearching  || store.getState().toolbar.replaceTargets.length === 0 ) && !isMatch) {
//             showTocBlocker();
//             disableHeader(true);
//             vex.dialog.open({
//                 unsafeMessage: '',
//                 input: [
//                     '<div class="delete-element-text">No matches found, please try with another search term.</div>',
//                 ].join(''),
//                 buttons: [
//                     $.extend({}, vex.dialog.buttons.YES, { text: 'OK' }),
//                 ],
//                 callback : function() {
//                     hideTocBlocker();
//                     disableHeader(false);

//                 }
//             });

//             // currentId = null;
//             // store.dispatch({ type: 'UPDATE_TOOLBAR_MENU', payload: { 
//             //     isSearching: currentQuery,
//             //     currentQuery: 0,
//             //     size: [],
//             //     replaceTarget: []} } )
//             // this.props.updateIsSearching(currentQuery,0,[],[]);
//         }
//     } else {
//         return false
//     }
// }
/**
* @description - Used to toggle the comments panel block.
*/
export const toggleCommentsPanel = function () {
    store.dispatch({ 
        type: 'TOGGLE_COMMENTS_PANEL', 
        payload: { 
        openCommentsPanel: !store.getState().prepareAllSlates.openCommentsPanel}
    })
}
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