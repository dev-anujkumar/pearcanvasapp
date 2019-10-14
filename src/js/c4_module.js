// c4_module.js
//const vex = require('vex-js');
const React = require('react');
const ReactDOM = require('react-dom');
var response;
var ajax = {};
var callback = function(status, responseText){response = { status:status,responseText:responseText } };
let IF_MATCH = "";
import store from '../appstore/store';
import { showTocBlocker, hideTocBlocker, disableHeader } from './toggleLoader';
import PopUp from '../component/PopUp';

import config_object from '../config/config';
const CTOOL_APIKEY = config_object['CTOOL_APIKEY'];
const CTOOL_PUBSLATE  = config_object['CTOOL_PUBSLATE'];
const CTOOL_PUBTITLE = config_object['CTOOL_PUBTITLE'];
const CTOOL_PUBTITLES3   = config_object['CTOOL_PUBTITLES3'];
const CTOOL_DISCIPLINEID  = config_object['CTOOL_DISCIPLINEID'];
const CTOOL_REGISTERPOD  = config_object['CTOOL_REGISTERPOD'];
const CTOOL_EPUB_ENDPOINT  = config_object['EPUB_ENDPOINT']; //not available
const C6PUB_ENDPOINT = config_object['C6PUB_ENDPOINT'];
const C6PUB_API_KEY = config_object['C6PUB_API_KEY'];
const C6REDIS_SERVER_UPDATE = config_object['C6REDIS_SERVER_UPDATE'];

const BASE_URL = config_object.C4_API_URL;
const WRAPPER_URL = config_object.WRAPPER_URL;

ajax.x = function () {
    if ('withCredentials' in new XMLHttpRequest()) {
        ////console.log("ajax: XHR support");
        return new XMLHttpRequest();
    } else if (typeof XDomainRequest !== "undefined") {
        ////console.log("ajax: XDR support");
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
                ////console.log("ajax: ERROR when creating ActiveXObject");
            }
        }
        ////console.log("ajax: ActiveXObject support");
        return xhr;
    }
};

ajax.send = function(url, callback, method, data, contentType, sync, pubApiKey) {
    //console.log("url, callback, method, data, contentType, sync: " + url, callback, method, data, contentType, sync)
    let xApiKey = '';
	if(pubApiKey !== undefined){
        xApiKey = pubApiKey;
    }else{
        xApiKey = CTOOL_APIKEY;
    }
	var x = ajax.x();
    x.open(method, url, sync, null, null);
    x.onreadystatechange = function() {
        if (x.readyState === 4) {
            IF_MATCH = x.getResponseHeader("ETag");
            callback(x.status, x.responseText);
            if ( this.status == 201 ) {
                //console.log("STATUS 201 => RETURNED HEADERS: " + this.getAllResponseHeaders());
            }
        }
    };

   	document.cookie = `CTOOL_APIKEY=${xApiKey}; domain=.pearson.com; path=/; secure=true`;
    x.setRequestHeader('Content-Type',contentType);
    x.setRequestHeader('Content-Language','en');
    x.setRequestHeader('x-apikey',xApiKey);
    x.setRequestHeader('X-PearsonSSOSession', config_object.ssoToken);
    x.setRequestHeader('If-Match', IF_MATCH !== "" ? IF_MATCH : "");
    x.setRequestHeader('accept','application/json, text/plain, */*');
    //x.setRequestHeader('withCredentials',true);
    //x.withCredentials = true;

    x.send(data);
};

ajax.get = function(url, callback, contentType, sync) {
    ajax.send(url, callback, 'GET', null, contentType, sync);
};

ajax.post = function(url, data, callback, contentType, sync, pubApiKey) {
    ajax.send(url, callback, 'POST', data, contentType, sync, pubApiKey);
};

ajax.put = function(url, data, callback, contentType, sync) {
    ajax.send(url, callback, 'PUT', data, contentType, sync);
};

class PODModal extends React.Component {

    constructor(props){
        super(props);
        this.dropDownClick = this.dropDownClick.bind(this);
        this.publishPOD = this.publishPOD.bind(this);
        this.cancelPOD = this.cancelPOD.bind(this);

        this.state = {
            visible:this.props.visible,
            disciplineID:"",
            selection:"Select discipline ID..."
        }
    }

    publishPOD(e) {

        let project = this.props.projectId;
        let citeId = this.props.citeId;
        let disciplineID = this.state.disciplineID;
        $('#blocker').removeClass('active');
        $('#loader').addClass('active');
        ReactDOM.unmountComponentAtNode(document.getElementById('pod-modal'));
        module.exports.PODregisterPOD(project,citeId,disciplineID);

    }

    cancelPOD(e) {
        console.log("CANCEL POD");
        $('#blocker').removeClass('active');
        this.setState({visible:false});
        ReactDOM.unmountComponentAtNode(document.getElementById('pod-modal'));
    }

    dropDownClick(e) {

        let selectedID = $(e.currentTarget).attr('data-id');
        this.setState({
            selection: $(e.currentTarget).text(),
            disciplineID: selectedID
        });

        $('.dropdown__content').each(function(){

            if ( this !== e.currentTarget.nextElementSibling ){
                this.classList.add('u-hide');
            }

        });

        e.currentTarget.nextElementSibling.classList.toggle('u-hide');

    }

    render() {

        $('#loader').removeClass('active');

        if ( this.state.visible === false ) {
            return null;
        } else {
            return( <div id="pod-modal" className="pod-modal">
                    <div className="pod-modal-guts">
                        <div id="paragraph-format">
                            <div className="format kds-mb-24">
                                <div className="kds-mb-24">
                                    <div className="dropdown podmodal">
                                        <div className="dropdown__button" onClick={this.dropDownClick}>
                                        <div className="dropdown__title podselect-title" id="primary-menu-title">{this.state.selection}</div>
                                            <svg>
                                                <use xlinkHref="#arrow-down"></use>
                                            </svg>
                                        </div>
                                        <ul className="dropdown__content u-hide dd-podmodal" id="primary-menu-list">
                                            { this.props.idArray.map( (pod, index) => <li key={index} data-id={pod.disciplineId} onClick={this.dropDownClick} >{pod.disciplineName}</li> ) }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="pod-button" style={{marginRight:10+'px'}} onClick={this.publishPOD} >Convert to PDF</button>
                    <button className="pod-button" style={{marginLeft:10+'px'}} onClick={this.cancelPOD} >Cancel</button>
                </div>
            )
        }
    }
}

export const c4PublishObj = {

    publishSlate: function(project,section,cite) {
        
        //console.log("HOST NAME FOR PREVIEW: " + '',location.host,location.hostname);
        //let hostname = location.hostname;
        var content_url = CTOOL_PUBSLATE;

        //console.log("STORE INFO FOR PUBLISH: " + '',store.getState());

        let content_data = {};
        content_data["projectManifest"] = project;
        content_data["sectionManifest"] = section;
        content_data["citeManifest"] = cite;
        content_data["requester"] = config_object.userEmail;//"requester": "james.cooney@pearson.com",
        content_data["timestamp"] = new Date().toISOString();//"timestamp": "2017-04-23T18:25:43.511Z"


        //console.log("PREVIEWING SLATE: " + '',project,section,cite, content_data);
        //ajax.post(content_url, content_data, callback, contentType, false, false);

        //if(!store.getState().toolbar.editor_dirtyDoc) {

            ajax.post(content_url, JSON.stringify(content_data), callback, 'application/json', false);

            window.addEventListener('beforeunload', (e) => {
                if (store.getState().toolbar.editor_dirtyDoc) {
                    e.returnValue = 'You have unsaved changes. Please wait until the changes are being saved.';
                }
            });

            let parsedResponse = JSON.parse(response.responseText);

            // $("#blocker.blocker").css({
            //     visibility: "visible"
            // });
            // $("#loader.loader").css({
            //     visibility: "visible"
            // });
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
                // $("#blocker.blocker, #loader.loader").css({
                //     visibility: "hidden"
                // });
               //window.parent.postMessage({ 'type': 'headerDisable', 'message': true }, WRAPPER_URL);
                // vex.dialog.alert({
                //     message: 'Slate Preview failed to load.',
                //     callback: function () {
                //         window.parent.postMessage({ 'type': 'headerDisable', 'message': false }, WRAPPER_URL);
                //     }
                // });

                //<PopUp/>

                alert("Slate Preview failed to load");
            }
        //}
    },
    publishContent:function(pubConObj,pubCallBack){  
        let content_url = C6PUB_ENDPOINT;
		let pubApiKey = C6PUB_API_KEY;
        try{
            _.delay(() => {
                content_url = C6PUB_ENDPOINT;
                ajax.post(content_url, JSON.stringify(pubConObj), callback, 'application/json', false, pubApiKey);
                let parsedResponse = JSON.parse(response.responseText);
                if(parsedResponse && parsedResponse.ResponseMetadata.requestStatusCode === 200){
                     let redis_url = C6REDIS_SERVER_UPDATE+pubConObj.requestid+'/status';
                    let inputObj = {};
                    inputObj.status = 'approved';
                    inputObj.distributable_urn = pubConObj.distributableVersionUrn;
                    inputObj.approver_name = pubConObj.requester;
                    inputObj.approved_date = pubConObj.timestamp;
                    inputObj.approve_date = pubConObj.timestamp;
                    ajax.put(redis_url, JSON.stringify(inputObj), pubCallBack, 'application/json', false); 
    
                }else { 
                    pubCallBack(parsedResponse || 500);
                } 
            }, 150);
            pubCallBack("");
        }
        catch(e){ 
            pubCallBack(e);
        }

    },

    publishEPUB:function(project,section,cite){
        let content_data = {}
        content_data.projectScope = "Entire Title";
        content_data.deliveryFormat = "Reader+ ePub";
        content_data.deliveryStyle = "S3 Package";
        content_data.responseStyle = "Wait For Response";
        content_data.deliveryLocation = "c4-pod-interim";
        content_data.responseLocation ="SNS ARN";
        content_data.wipManifestURN = project;//"urn:pearson:manifestation:39d4fac2-fe52-48a7-b844-459df9fa4ecd";
        content_data.wipSlateURN = cite;
        content_data.deliveryManifestURN = cite;//"urn:pearson:manifestation:7e544728-ab9e-4bf5-91b4-47edb102a31b", 
        content_data.requester = config_object.userEmail; 
        content_data.timestamp = new Date().toISOString();
        var content_url = CTOOL_EPUB_ENDPOINT;
        
        try{
            ajax.post(content_url, JSON.stringify(content_data), callback, 'application/json', false);
            let parsedResponse = JSON.parse(response.responseText);
            if(parsedResponse && parsedResponse.status == "success"){
                //vex.dialog.alert("Your request has been received and is in process");
                alert("Your request has been received and is in process");
            }else {
                //vex.dialog.alert("Your request has been failed");
                alert("Your request has been failed");
            }
        }
        catch(e){
            //vex.dialog.alert("Your request has been failed");
            alert("Your request has been failed");
        }
        

        
    },
    
    publishTitle: function(project,section,cite,callBack,isPreview) {

        //console.log("HOST NAME FOR publishTitle: " + '',location.host,location.hostname);
        //let hostname = location.hostname;
        _.delay(() => {
            var content_url = CTOOL_PUBTITLE;
    
            let content_data = {};
            content_data["projectManifest"] = project;
            content_data["sectionManifest"] = section;
            content_data["citeManifest"] = cite;
            content_data["requester"] = config_object.userEmail;//"requester": "james.cooney@pearson.com",
            content_data["timestamp"] = new Date().toISOString();//"timestamp": "2017-04-23T18:25:43.511Z"
            if(isPreview == true){
                content_data["preview"] = true;
            }
            //console.log("PREVIEWING TITLE: " + '',project,section,cite, content_data);
            //ajax.post(content_url, content_data, callback, contentType, false, false);
            ajax.post(content_url, JSON.stringify(content_data), callback, 'application/json', false);
    
            //console.log("RESPONSE form preview title: " + '',response);
            let parsedResponse = JSON.parse(response.responseText);
    
            if ( parsedResponse.data && parsedResponse.data.previewURL ) {
                let previewURL = parsedResponse.data.previewURL;
                window.open(previewURL, '_blank');
                if(callBack) {callBack();}
            } else {
                //vex.dialog.alert("Title Preview failed to load.");
                alert("Title Preview failed to load.");
                //$('.loader').removeClass('active');
                //$('.blocker').removeClass('active');
                return false
            }
        },150);
        //console.log("PreviewURL form preview title: " + '',previewURL);

    },
    publishTitleS3: function(project,section,cite) {

        //console.log("HOST NAME FOR publishTitleS3: " + '',location.host,location.hostname);
        //let hostname = location.hostname;
        var content_url = CTOOL_PUBTITLES3;

        let content_data = {};
        content_data["projectManifest"] = project;
        content_data["sectionManifest"] = section;
        content_data["citeManifest"] = cite;
        content_data["requester"] = store.getState().auth.user.email;//"requester": "james.cooney@pearson.com",
        content_data["timestamp"] = new Date().toISOString();//"timestamp": "2017-04-23T18:25:43.511Z"

        //console.log("PREVIEWING TITLE S3: " + '',project,section,cite, content_data);
        //ajax.post(content_url, content_data, callback, contentType, false, false);
        ajax.post(content_url, JSON.stringify(content_data), callback, 'application/json', false);

        //console.log("RESPONSE form preview slate: " + '',JSON.parse(response));
        //let previewURL = response.previewURL;
        //window.open(previewURL, '_blank');

    },
    PODdisciplineId: function(project, citeId) {

        //console.log("HOST NAME FOR PREVIEW: " + '',location.host,location.hostname);
        //let hostname = location.hostname;
        var content_url = CTOOL_DISCIPLINEID;
        $('#blocker').addClass('active');
        $('#loader').addClass('active');

        //console.log("DISCIPLINE ID GET: " + '',project);
        //ajax.post(content_url, content_data, callback, contentType, false, false);
        ajax.get(content_url, callback, 'application/json', false);

        console.log("RESPONSE form PODdisciplineId: " + '',response);
        let parsedResponse = JSON.parse(response.responseText);
        ReactDOM.render(<PODModal idArray={parsedResponse} projectId={project} citeId={citeId} visible={true} />,document.getElementById('pod-modal'));

        //parsedResponse.map((item) => )
        //let disciplineID = parsedResponse.disciplineID;
        ///let disciplineID = parsedResponse.disciplineID;

        //console.log("DISCIPLINE ID: " + '',disciplineID);

        //module.exports.PODregisterPOD(project,disciplineID);

    },
    PODregisterPOD: function(project,citeId,disciplineID) {

        //console.log("HOST NAME FOR PREVIEW: " + '',location.host,location.hostname);
        //let hostname = location.hostname;
        var content_url = CTOOL_REGISTERPOD;

        let content_data = {};
        content_data["projectManifest"] = project;
        content_data["citeManifest"] = citeId;
        content_data["displineID"] = disciplineID;
        content_data["requester"] = store.getState().auth.user.email;//"requester": "james.cooney@pearson.com",
        content_data["timestamp"] = new Date().toISOString();//"timestamp": "2017-04-23T18:25:43.511Z"

        //console.log("PREVIEWING SLATE: " + '',project,disciplineID,content_data);
        //ajax.post(content_url, content_data, callback, contentType, false, false);
        ajax.post(content_url, JSON.stringify(content_data), callback, 'application/json', false);
        $('#loader').removeClass('active');
        let parsedResponse = JSON.parse(response.status);
        console.log("RESPONSE form PODregisterPOD: " + '',response, response.status, parsedResponse);
        var message;
        if ( parsedResponse == 200 ) {
            message = "Your request has been received and is in process.";
        } else {
            message = "Your request has failed to process.";
        }
        //vex.dialog.alert(message);
        alert(message);

    },
 createNewVersion: function(project,version,callBack) {

    _.delay(() => {
        console.log("2");
        var content_url = BASE_URL+'/projects/createnewversion';
        console.log('inside create new version', content_url, project, version);
 
        let content_data = {};
        content_data["projectId"] = project.id
        content_data["dURN"] = version.distributable_urn;
        content_data["entityURN"] = project.entity_urn;
        content_data["cite_urn"] = project.cite_urn;
        content_data["approved_date"] = new Date().toISOString();
        
        content_data["approver_name"] = store.getState().auth.user.email;//"requester": "james.cooney@pearson.com",
        content_data["timestamp"] = new Date().toISOString();//"timestamp": "2017-04-23T18:25:43.511Z"
        ajax.put(content_url, JSON.stringify(content_data), callBack, 'application/json', false);
    }, 150);
    // callBack('{"status":""}');
    },


}
