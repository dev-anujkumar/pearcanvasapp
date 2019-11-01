var _ = require("lodash");
var response;
var ajax = {};
var callback = function (status, responseText) { response = { status: status, responseText: responseText } };
let IF_MATCH = "";
import store from '../appstore/store';

import config_object from '../config/config';
const CTOOL_APIKEY = config_object['CTOOL_APIKEY'];
const CTOOL_PUBSLATE = config_object['CTOOL_PUBSLATE'];
const CTOOL_PUBTITLE = config_object['CTOOL_PUBTITLE'];
const C6PUB_ENDPOINT = config_object['C6PUB_ENDPOINT'];
const C6PUB_API_KEY = config_object['C6PUB_API_KEY'];
const C6REDIS_SERVER_UPDATE = config_object['C6REDIS_SERVER_UPDATE'];


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

ajax.send = function (url, callback, method, data, contentType, sync, pubApiKey) {
    let xApiKey = '';
    if (pubApiKey !== undefined) {
        xApiKey = pubApiKey;
    } else {
        xApiKey = CTOOL_APIKEY;
    }
    var x = ajax.x();
    x.open(method, url, sync, null, null);
    x.onreadystatechange = function () {
        if (x.readyState === 4) {
            IF_MATCH = x.getResponseHeader("ETag");
            callback(x.status, x.responseText);
            if (this.status == 201) {
            }
        }
    };

    document.cookie = `CTOOL_APIKEY=${xApiKey}; domain=.pearson.com; path=/; secure=true`;
    x.setRequestHeader('Content-Type', contentType);
    x.setRequestHeader('Content-Language', 'en');
    x.setRequestHeader('x-apikey', xApiKey);
    x.setRequestHeader('X-PearsonSSOSession', config_object.ssoToken);
    x.setRequestHeader('If-Match', IF_MATCH !== "" ? IF_MATCH : "");
    x.setRequestHeader('accept', 'application/json, text/plain, */*');

    x.send(data);
};

ajax.get = function (url, callback, contentType, sync) {
    ajax.send(url, callback, 'GET', null, contentType, sync);
};

ajax.post = function (url, data, callback, contentType, sync, pubApiKey) {
    ajax.send(url, callback, 'POST', data, contentType, sync, pubApiKey);
};

ajax.put = function (url, data, callback, contentType, sync) {
    ajax.send(url, callback, 'PUT', data, contentType, sync);
};

export const c4PublishObj = {

    publishSlate: function (project, section, cite) {
        var content_url = CTOOL_PUBSLATE;
        let content_data = {};
        content_data["projectManifest"] = project;
        content_data["sectionManifest"] = section;
        content_data["citeManifest"] = cite;
        content_data["requester"] = config_object.userEmail;//"requester": "james.cooney@pearson.com",
        content_data["timestamp"] = new Date().toISOString();//"timestamp": "2017-04-23T18:25:43.511Z"
        ajax.post(content_url, JSON.stringify(content_data), callback, 'application/json', false);

        window.addEventListener('beforeunload', (e) => {
            if (store.getState().toolbar.editor_dirtyDoc) {
                e.returnValue = 'You have unsaved changes. Please wait until the changes are being saved.';
            }
        });

        let parsedResponse = JSON.parse(response.responseText);
        console.log("parsedResponse in c4_module", parsedResponse)
        if (parsedResponse.data && parsedResponse.data.previewURL) {
            let previewURL = parsedResponse.data.previewURL;
            _.delay(() => {
                window.open(previewURL, '_blank');
                $("#blocker.blocker, #loader.loader").css({
                    visibility: "hidden"
                });
            }, 1100);

        } else {
            alert("Slate Preview failed to load");
        }
        //}
    },
    publishContent: function (pubConObj, pubCallBack) {
        let content_url = C6PUB_ENDPOINT;
        let pubApiKey = C6PUB_API_KEY;
        try {
            _.delay(() => {
                content_url = C6PUB_ENDPOINT;
                ajax.post(content_url, JSON.stringify(pubConObj), callback, 'application/json', false, pubApiKey);
                let parsedResponse = JSON.parse(response.responseText);
                if (parsedResponse && parsedResponse.ResponseMetadata.requestStatusCode === 200) {
                    let redis_url = C6REDIS_SERVER_UPDATE + pubConObj.requestid + '/status';
                    let inputObj = {};
                    inputObj.status = 'approved';
                    inputObj.distributable_urn = pubConObj.distributableVersionUrn;
                    inputObj.approver_name = pubConObj.requester;
                    inputObj.approved_date = pubConObj.timestamp;
                    inputObj.approve_date = pubConObj.timestamp;
                    ajax.put(redis_url, JSON.stringify(inputObj), pubCallBack, 'application/json', false);

                } else {
                    pubCallBack(parsedResponse || 500);
                }
            }, 150);
            pubCallBack("");
        }
        catch (e) {
            pubCallBack(e);
        }

    },

    publishTitle: function (project, section, cite, callBack, isPreview) {
        _.delay(() => {
            var content_url = CTOOL_PUBTITLE;
            let content_data = {};
            content_data["projectManifest"] = project;
            content_data["sectionManifest"] = section;
            content_data["citeManifest"] = cite;
            content_data["requester"] = config_object.userEmail;//"requester": "james.cooney@pearson.com",
            content_data["timestamp"] = new Date().toISOString();//"timestamp": "2017-04-23T18:25:43.511Z"
            if (isPreview == true) {
                content_data["preview"] = true;
            }
            ajax.post(content_url, JSON.stringify(content_data), callback, 'application/json', false);
            let parsedResponse = JSON.parse(response.responseText);

            if (parsedResponse.data && parsedResponse.data.previewURL) {
                let previewURL = parsedResponse.data.previewURL;
                window.open(previewURL, '_blank');
                if (callBack) { callBack(); }
            } else {
                alert("Title Preview failed to load.");
                return false
            }
        }, 150);
    },
}
