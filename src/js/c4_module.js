var _ = require("lodash");
var response;
var ajax = {};
var callback = function (status, responseText) { response = { status: status, responseText: responseText } };
let IF_MATCH = "";
import store from '../appstore/store';
import config_object from '../config/config';
import { sendToDataLayer } from '../constants/ga';
import {sendDataToIframe} from '../constants/utility';
ajax.x = function () {
    if ('withCredentials' in new XMLHttpRequest()) {
        return new XMLHttpRequest();
    } else if (typeof XDomainRequest !== "undefined") {
        return new XDomainRequest();
    } else {
        var versions = [
            "MSXML2.XmlHttp.5.0",
            "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.3.0",
            "MSXML2.XmlHttp.2.0",
            "Microsoft.XmlHttp"
        ];

        var xhr;
        for (var i = 0; i < versions.length; i++) {
            try {
                xhr = new ActiveXObject(versions[i]);
                break;
            } catch (e) {
            }
        }
        return xhr;
    }
};

ajax.send = function (url, cb, method, data, contentType, arnKey, sync, pubApiKey) {
    let xApiKey = '';
    if (pubApiKey !== undefined) {
        xApiKey = pubApiKey;
    } else {
        xApiKey = config_object.CTOOL_APIKEY;
    }
    var x = ajax.x();
    x.open(method, url, sync, null, null);
    x.onreadystatechange = function () {
        if (x.readyState === 4) {
            IF_MATCH = x.getResponseHeader("ETag");
            cb(x.status, x.responseText);
        }
    };

    document.cookie = `CTOOL_APIKEY=${xApiKey}; domain=.pearson.com; path=/; secure=true`;
    x.setRequestHeader('Content-Type', contentType);
    x.setRequestHeader('myCloudProxySession', config_object.myCloudProxySession);
    x.setRequestHeader('accept', 'application/json, text/plain, */*');
    x.setRequestHeader('aws-resource', config_object.AWS_RESOURCE);
    x.setRequestHeader('arn', arnKey)

    x.send(data);
};

ajax.get = function (url, cb, contentType, sync) {
    ajax.send(url, cb, 'GET', null, contentType, sync);
};

ajax.post = function (url, data, cb, contentType, sync, pubApiKey) {
    ajax.send(url, cb, 'POST', data, contentType, sync, pubApiKey);
};

ajax.put = function (url, data, cb, contentType, sync) {
    ajax.send(url, cb, 'PUT', data, contentType, sync);
};

export function publishTitleDelay(project, section, cite, callBack, isPreview, type) {
    try {
        var content_url = config_object.PROJECT_PREVIEW_ENDPOINT;
        let PREVIEW_ARN = (type === 'projectPreview') ? config_object.PROJECT_PREVIEW_ARN : config_object.BROKER_PREVIEW_ARN
        let content_data = {};
        content_data["projectManifest"] = project;
        content_data["sectionManifest"] = section;
        content_data["entityurn"] = config_object.projectEntityUrn;
        content_data["citeManifest"] = cite;
        content_data["requester"] = config_object.userEmail;//"requester": "james.cooney@pearson.com",
        content_data["timestamp"] = new Date().toISOString();//"timestamp": "2017-04-23T18:25:43.511Z"
        if (isPreview == true) {
            content_data["preview"] = true;
        }
        ajax.post(content_url, JSON.stringify(content_data), callback, 'application/json', PREVIEW_ARN, false);
        let parsedResponse = JSON.parse(response.responseText);

        if (parsedResponse.data && parsedResponse.data.previewURL) {
            let previewURL = parsedResponse.data.previewURL;
            window.open(previewURL, '_blank');
            if (callBack) { callBack(); }
        } else {
            sendDataToIframe({ 'type': 'showReleasePopup', 'message': { status: true, dialogText: "Title Preview failed to load." } });
            return false
        }
    } catch (error) {
        console.log("Error in publishTitleDelay function", error);
    }
}

export const c4PublishObj = {

    publishSlate: function (project, section, cite) {
        const startTime = performance.now();
        var content_url = config_object.SLATE_PREVIEW_ENDPOINT;
        let proactiveSlatePreview = config_object?.PROACTIVE_SLATE_PREVIEW_STATUS ? config_object.PROACTIVE_SLATE_PREVIEW_STATUS : "false";
        let content_data = {};
        content_data["projectManifest"] = project;
        content_data["sectionManifest"] = section;
        content_data["citeManifest"] = cite;
        content_data["requester"] = config_object.userEmail;//"requester": "james.cooney@pearson.com",
        content_data["timestamp"] = new Date().toISOString();//"timestamp": "2017-04-23T18:25:43.511Z"
        content_data["proactiveSlatePreview"] = proactiveSlatePreview;
        ajax.post(content_url, JSON.stringify(content_data), callback, 'application/json', config_object.SLATE_PREVIEW_ARN, false);

        window.addEventListener('beforeunload', (e) => {
            if (store.getState().toolbar.editor_dirtyDoc) {
                e.returnValue = 'You have unsaved changes. Please wait until the changes are being saved.';
            }
        });

        let parsedResponse = JSON.parse(response.responseText);
        console.log("parsedResponse in c4_module", parsedResponse)
        if (parsedResponse.data && parsedResponse.data.previewURL) {
            let previewURL = parsedResponse.data.previewURL;
            
            const elapsedTime = performance.now() - startTime;
            sendToDataLayer('slate-preview', {
                elapsedTime,
                slateURN: section,
                projectURN: project,
            });
            
            _.delay(() => {
                window.open(previewURL, '_blank');
            }, 1100);

        } else {
            sendDataToIframe({ 'type': 'showReleasePopup', 'message': { status: true, dialogText:"Slate Preview failed to load"}});
            return false;
        }
    },
    publishTitle: function (project, section, cite, callBack, isPreview, type) {
        _.delay(() => {
            publishTitleDelay(project, section, cite, callBack, isPreview, type)
        }, 150);
    }
}
