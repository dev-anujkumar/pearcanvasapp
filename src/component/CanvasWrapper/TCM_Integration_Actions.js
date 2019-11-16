// // IMPORT - Plugins //
import React, { Component } from 'react';
// import { sendDataToIframe } from '../../constants/utility.js';
import config from '../../config/config';
import store from '../../appstore/store'
import { checkSlateLock } from '../../js/slateLockUtility'
import { sendDataToIframe } from '../../constants/utility.js';
export const loadTrackChanges = (elementId) => {
    let slateLockInfo = store.getState().slateLockReducer.slateLockInfo;
    if (!checkSlateLock(slateLockInfo)) {
        let slateData = store.getState().appStore.slateLevelData;
        let slateId = config.slateManifestURN;
        if (slateData && slateData[slateId] && slateData[slateId].contents && slateData[slateId].contents.bodymatter) {
            var list = [];
            let elements = slateData[slateId].contents.bodymatter;
            if (elements && elements.length > 0) {
                elements.map((element, index) => {
                    let obj = {};
                    obj.index = index;
                    obj.urn = element.id;
                    list.push(obj);
                })
            }
        }
        let currentElementId = elementId ? elementId : "";
        var trackChange = (event) => {
            var interval;
            var postmsg = (win) => {
                sendDataToIframe({ "slateTitle": config.slateTitle, "eURN": currentElementId, "dURN": config.projectUrn, "sURN": config.slateManifestURN, "indexOfElements": list, "entityURN": config.projectEntityUrn }, config.TCM_DASHBOARD_UI_URL);
            };            
            let url = config.TCM_DASHBOARD_UI_URL;
            let pathArray = url.split('/');
            let protocol = pathArray[0];
            let host = pathArray[2];
            let originURL = protocol + '//' + host;
            // check the origin
            if (event.origin == originURL)
                switch (event.data) {
                    case 'ready':
                        // e.source = the sending window object
                        interval = setTimeout(postmsg, 100, event.source);
                        break;

                    case 'close':
                        clearInterval(interval);
                        window.removeEventListener('message', trackChange, false);
                        break;
                }
        }
        window.addEventListener('message', trackChange, false);
        window.open(config.TCM_DASHBOARD_UI_URL, 'tcmwin');
    }
}
