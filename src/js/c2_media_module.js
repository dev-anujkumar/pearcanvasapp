// import store from '../store';
import store from './../appstore/store';
import { showTocBlocker, hideTocBlocker, disableHeader } from './toggleLoader';

// const authModule = require('./auth_module.js');
const config = require('./../config/config');
let config_object = config.default;
const authModule = { GET_SSO_TOKEN : function() { return config_object.ssoToken } };
const tab_visibility = '{"audio" : true,"image": true,"other":true,"video": true,"epsUrl":true,"defaulttab":"search"}' ;
const tab_visibility_for_asset_popover = '{"audio" : false,"image": true,"other":false,"video": false,"epsUrl":true,"defaulttab":"search"}' ;
//const images_path = 'dist/images/c2/';

var uname;

const renderderedTagSelector = '#c2-modal';

// const configModule = require('./config_module.js');
// let config_object = configModule.GET_CONFIG();
let config_patterns = config_object.PATTERNS;
const WRAPPER_URL = `${config_object.WRAPPER_URL}`;
const CMDS_APIKEY = config_object['CMDS_APIKEY'];
const CMDS_DATA_ENDPOINT = config_object['CMDS_DATA_ENDPOINT'];
const CMDS_SCHEMA_ENDPOINT = config_object['CMDS_SCHEMA_ENDPOINT'];
const CMDS_DATABASE = config_object['CMDS_DATABASE'];
/* const CMIS_US_REPO = config_object['CMIS_US_REPO'];
const CMIS_UK_REPO = config_object['CMIS_UK_REPO'];
const CMIS_USAWS_REPO = config_object['CMIS_USAWS_REPO']; */
//const list = [{"repo":CMIS_UK_REPO,"repoName":"UK"}, {"repo":CMIS_US_REPO,"repoName":"US"}];
// let list = [];
const EPS_API = config_object['EPS_API'];
const CMIS_REPO = config_object['CMIS_REPO'];
//const CMIS_REPO = '[{"repo":"https://staging.api.pearson.com/content/cmis/ukwip","repoName":"UK"},{"repo":"https://staging.api.pearson.com/content/cmis/uswip-aws","repoName":"AWS US"},{"repo":"https://staging.api.pearson.com/content/cmis/uswip","repoName":"US"}]';
const PATTERN_ADD_ASSET = config_patterns['PATTERN_ADD_ASSET'];
const PATTERN_BROKER = config_patterns['PATTERN_BROKER'];
const PATTERN_PRODUCT_LINK = config_patterns['PATTERN_PRODUCT_LINK'];
const PATTERN_VENDOR = config_patterns['PATTERN_VENDOR'];
const PATTERN_SEARCH_SELECT = config_patterns['PATTERN_SEARCH_SELECT'];


/* if (CMIS_US_REPO && CMIS_US_REPO != "") list.push({'repo' : CMIS_US_REPO, 'repoName':'US'});
if (CMIS_USAWS_REPO && CMIS_USAWS_REPO != "") list.push({'repo' : CMIS_USAWS_REPO, 'repoName':'AWS US'});
if (CMIS_UK_REPO && CMIS_UK_REPO != "" ) list.push({'repo': CMIS_UK_REPO, 'repoName':'UK'}); */


var patternBroker = PatternBroker.default;
var patternProductLink = PatternProductLink.default;
var patternAddAnAsset = PatternAddAnAsset.default;
var productLink;
var addAnAsset = {};
var addAnAssetConfig = {};

/*Reference the library*/

/*Configure the library*/
var libConfig = { 'locale': 'en_US',
                'headers' : {
                    'Content-Type'   : 'application/json',
                    'Accept'         : 'application/ld+json',
                    'X-Roles-Test'   : 'ContentMetadataEditor',
                    'Prefer'         : 'annotation=true',
                    'Apikey'         : CMDS_APIKEY,
                    'x-apikey'       : CMDS_APIKEY,
                    'PearsonSSOSession' : authModule.GET_SSO_TOKEN(),
                    'X-PearsonSSOSession' : authModule.GET_SSO_TOKEN()
                },
                'database'          : CMDS_DATABASE,
                'server'            : CMDS_DATA_ENDPOINT,
                'taxonomyserver'    : CMDS_SCHEMA_ENDPOINT,  // Rel 3.6
                'userId'            : uname
                };

patternBroker.setup(libConfig);
//var module = {};
module.exports = {

    addAnAsset:addAnAsset,
    productLinkOnsaveCallBack: function(assetPopoverFlag,data,callback) {
        //console.log("productLinkOnsaveCallBack: " + JSON.stringify(data));
        module.exports.launchAssetBrowser(assetPopoverFlag,data.nodeRef, data.repoInstance, data.repoName, callback);

    },

    AddanAssetCallBack: function (data,callback) {
        var uniqueID = data.nodeRef && data.nodeRef.split('/')[3];
        var assetType = data.mimetype && data.mimetype.split('/')[0];
        data['uniqueID'] = uniqueID;
        data['assetType'] = assetType;
        let smartLinkURl = ""
        if (data['assetType'] == 'image') {
            var img = new Image();
            img.addEventListener("load", function () {
                data['thumbnail_height'] = this.height;
                data['thumbnail_width'] = this.width;
            });
            img.src = data.url;
        }
        else if (data['assetType'] == 'video' || data['assetType'] == 'audio') {
            smartLinkURl = data['EpsUrl']
            data['smartLinkURl'] = smartLinkURl;
            data['EpsUrl'] = 'https://d12m40tknrppbi.cloudfront.net/cite/images/FPO-audio_video.png'
            data['clipinfo'] = {
                "id": "",
                "start": "",
                "end": "",
                "description": "",
                "duration": ""
            }
        } else {
            assetType = JSON.parse(data['desc'])
           if (assetType['smartLinkType']) {
            let Height = patternBroker.extract(data,patternBroker.items.AddAnAsset['Height1'] ? patternBroker.items.AddAnAsset['Height1'] : patternBroker.items.AddAnAsset['Height'] ? patternBroker.items.AddAnAsset['Height'] :'');
           let Width = patternBroker.extract(data,patternBroker.items.AddAnAsset['Width1'] ? patternBroker.items.AddAnAsset['Width1'] : patternBroker.items.AddAnAsset['Width'] ? patternBroker.items.AddAnAsset['Width'] :'') ;
             // data['assetType'] = assetType['smartLinkType'].toLowerCase();
                data['posterImageUrl'] = patternBroker.extract(data,patternBroker.items.AddAnAsset['Poster Image URL'] ? patternBroker.items.AddAnAsset['Poster Image URL'] : '')
                smartLinkURl = patternBroker.extract(data, patternBroker.items.AddAnAsset['Smart Link Asset URL'] ? patternBroker.items.AddAnAsset['Smart Link Asset URL'] : '');
                let vendorName = patternBroker.extract(data,patternBroker.items.AddAnAsset['Smart Link thirdPartyVendorVal'] ? patternBroker.items.AddAnAsset['Smart Link thirdPartyVendorVal'] : '');
                data['smartLinkURl'] = smartLinkURl;
                data['vendorName'] = vendorName;
                data['width'] = Width
                data['height'] = Height
                data['smartlinkoptimizedmobileval'] = patternBroker.extract(data,patternBroker.items.AddAnAsset['Smart Link optimizedMobileVal'] ? patternBroker.items.AddAnAsset['Smart Link optimizedMobileVal'] : '');
                data['subtitle']= patternBroker.extract(data,patternBroker.items.AddAnAsset['subtitle'] ? patternBroker.items.AddAnAsset['subtitle']  : '');
                data['spanishsubtitle']= patternBroker.extract(data,patternBroker.items.AddAnAsset['spanish subtitle'] ? patternBroker.items.AddAnAsset['spanish subtitle'] : '');
                data['frenchsubtitle']= patternBroker.extract(data,patternBroker.items.AddAnAsset['french subtitle'] ? patternBroker.items.AddAnAsset['french subtitle'] : '');
                let mobileVal= patternBroker.extract(data,patternBroker.items.AddAnAsset['Smart Link optimizedMobileVal'] ? patternBroker.items.AddAnAsset['Smart Link optimizedMobileVal'] : '');
                if(mobileVal){
                    let optimizedValue=false;
                    if(mobileVal.toLowerCase()==='yes'){
                        optimizedValue=true
                    }
                    else if(mobileVal.toLowerCase()==='no'){
                        optimizedValue=false
                    }
                    else{
                        optimizedValue=mobileVal.toLowerCase()
                    }
                    data['smartlinkoptimizedmobileval'] = optimizedValue;
                }

            } else if (assetType['streamingMediaPackageType']) {
                data['assetType'] = assetType['streamingMediaPackageType'].toLowerCase();
                smartLinkURl = patternBroker.extract(data, patternBroker.items.AddAnAsset['Streaming Media Asset URL']);
                data['smartLinkURl'] = smartLinkURl;
            }
            if (data['assetType'] == 'video' || data['assetType'] == 'audio') {
                if (data['clipinfo'] && data['clipinfo'] != 'null') {
                    let clipData = JSON.parse(data['clipinfo'])
                    data['clipinfo'] = clipData
                }
                else {
                    data['clipinfo'] = {
                        "id": "",
                        "start": "",
                        "end": "",
                        "description": "",
                        "duration": ""
                    }
                }
            }
        }
       // $('body').trigger('setImage', { data: data });
       callback(data);
    },

    launchAssetBrowser: function(assetPopoverFlag, product, server, repo,callback) {

        //console.log("launchAssetBrowser called: " + product, server, repo, assetPopoverFlag);

        let productRef = product;
        let serverRef = server;

        //console.log("productRef: " + productRef);

        if(addAnAsset && addAnAsset.unmount){
            //console.log("unmounting AddAnAsset");
            addAnAsset.unmount();
        }

        uname = store.getState().auth.user ? store.getState().auth.user.userId : "sso4";
        var libConfig = {   'locale': 'en_US',
                        'headers' : {
                            'Content-Type'        : 'application/json',
                            'Accept'              : 'application/ld+json',
                            'X-Roles-Test'        : 'ContentMetadataEditor',
                            'Prefer'              : 'annotation=true',
                            'Apikey'              : CMDS_APIKEY,
                            'x-apikey'            : CMDS_APIKEY,
                            'PearsonSSOSession' : authModule.GET_SSO_TOKEN(),
                            'X-PearsonSSOSession' : authModule.GET_SSO_TOKEN()
                        },
                        'database'          : CMDS_DATABASE,
                        'server'            : CMDS_DATA_ENDPOINT,
                        'taxonomyserver'    : CMDS_SCHEMA_ENDPOINT,  // Rel 3.6
                        'userId'            : uname
                    };


        addAnAssetConfig =  {'selector' : renderderedTagSelector};
        addAnAssetConfig.language = 'en';// YS
        addAnAssetConfig.nodeRef = productRef;
        addAnAssetConfig.alfserver = serverRef; //data.repoInstance;
        if(assetPopoverFlag){
            addAnAssetConfig.tabVisibility = tab_visibility_for_asset_popover;
        }else{
            addAnAssetConfig.tabVisibility = tab_visibility;
        }
        addAnAssetConfig['cmis'] = '{"wURN":false}';
        addAnAssetConfig['epsserver'] = EPS_API;
        addAnAssetConfig.imagePreview =  '{"imagePreview":true}';
        addAnAssetConfig.register = 'some-register';  // YS
        addAnAssetConfig.showdescription = 'true';  // YS
        addAnAssetConfig.uploadAll = 'false';  // Rel 3.6

        addAnAsset = patternBroker.create('AddAnAsset', patternAddAnAsset);

        try {
            if(addAnAsset.corsId){
                libConfig.headers['Correlation-Id'] = addAnAsset.corsId;
            }
            patternBroker.setup(libConfig);
            addAnAsset.setup(addAnAssetConfig, module.exports.AddanAssetCallBack);
            addAnAsset.run(addAnAsset);
            addAnAsset.on(callback);

            showTocBlocker();
            disableHeader(true);
            window.parent.postMessage({'type':'hideToc', 'message':{}}, WRAPPER_URL);

            //alfresco toc issue
            var targetNode = document.getElementsByClassName('overlay-0-0 overlayLittle-0-1')[0];

            // Options for the observer (which mutations to observe)
            var config = { attributes: true };

            // Callback function to execute when mutations are observed
            var callbackOb = function (mutationsList, observer) {
                //console.log(mutationsList)
                for (var mutation of mutationsList) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class' && targetNode.classList.contains("transitionLeave-0-6")) {
                       {
                        hideTocBlocker();
                        disableHeader(false);
                        observer.disconnect();
                       }
                    }
                }
            };
            // Create an observer instance linked to the callback function
            var observer = new MutationObserver(callbackOb);

            // Start observing the target node for configured mutations
            observer.observe(targetNode, config);

        } catch (ex1) {

            //console.log("error: " + ex1.message);
            alert(ex1.message);
            hideTocBlocker();
            disableHeader(false);

        }

    },

    validateProperties: function(elements, property1, property2) {
        return elements.hasOwnProperty('repo') && elements.hasOwnProperty('repoName');
    },

    validateRegistries: function (cmisRepo){
        const isAllElementValid = cmisRepo.map((element) => {
            return this.validateProperties(element, 'repoName', 'repo')
        });
        return isAllElementValid.every( (item) => item !== false);
    },

    onLaunchAddAnAsset: function(callback) {
        disableHeader(true);
        showTocBlocker();
        addAnAssetConfig.nodeRef = '';//185fca35-4215-43bf-bf9d-11375903b2b4';
        window.parent.postMessage({'type':'hideToc', 'message':{}}, WRAPPER_URL);		
        if ( addAnAssetConfig.nodeRef !== undefined && addAnAssetConfig.nodeRef !== '' ) {

            //console.log("addAnAssetConfig.nodeRef already set: " + addAnAssetConfig.nodeRef);
            module.exports.launchAssetBrowser(addAnAssetConfig.nodeRef);

        } else {

            //console.log("NO PROUCT LINK SET");

            if(productLink && productLink.unmount){
                //console.log("productLink unmount");
                productLink.unmount();
            }

            if(CMIS_REPO !== undefined && CMIS_REPO !== null && CMIS_REPO !== ''){
                try{
                    const cmisRepo = JSON.parse(CMIS_REPO);
                    if(cmisRepo.length > 0){
                        const canWeProceedWithPL = this.validateRegistries(cmisRepo);
                            if(canWeProceedWithPL){
                                uname = store.getState().auth.user ? store.getState().auth.user.userId : "sso4";
                                var libConfig = {   'locale': 'en_US',
                                                'headers' : {
                                                    'Content-Type'        : 'application/json',
                                                    'Accept'              : 'application/ld+json',
                                                    'X-Roles-Test'        : 'ContentMetadataEditor',
                                                    'Prefer'              : 'annotation=true',
                                                    'Apikey'              : CMDS_APIKEY,
                                                    'x-apikey'            :  CMDS_APIKEY,
                                                    'PearsonSSOSession' : authModule.GET_SSO_TOKEN(),
                                                    'X-PearsonSSOSession' : authModule.GET_SSO_TOKEN()
                                                },
                                                'database'          : CMDS_DATABASE,
                                                'server'            : CMDS_DATA_ENDPOINT,
                                                'taxonomyserver'    : CMDS_SCHEMA_ENDPOINT,  // Rel 3.6
                                                'userId'            : uname
                                            };
                  
                                var productLinkConfig = {'selector' : renderderedTagSelector};
                                productLinkConfig.repoList = cmisRepo;
                                productLinkConfig.language = 'en';  // YS
                                productLinkConfig.isRegisterGrid = '{"isRegisterGrid":false}';//Temporary fix for alignment issue
                                productLinkConfig.subfolderAccess = '{"subfolderAccess":false}';//Temporary fix for alignment issue
                                productLink = patternBroker.create('ProductLink', patternProductLink);
                                if(productLink.corsId){
                                    libConfig.headers['Correlation-Id'] = productLink.corsId;
                                }
                                patternBroker.setup(libConfig);
                                productLink.setup(productLinkConfig, module.exports.productLinkOnsaveCallBack);
                                productLink.run(productLink);
                                productLink.on(callback);
                            }else{
                                console.log('CMIS REPO - Object(s) in CMIS REPO does not have RepoName/Repo property');
                            }
                    }else{
                        console.log('CMIS REPO - Should have atleast one Registry');
                    }
                }catch(error){
                    console.log('CMIS REPO - Invalid JSON Object', error);    
                }
            }else {
                console.log('CMIS REPO - should not be Empty, Provide Valid REPO Values');
            }
        }
        var targetNode = document.getElementsByClassName('overlay-0-0 overlayLittle-0-1')[0];		
        // Options for the observer (which mutations to observe)		
        var config = { attributes: true };		
        // Callback function to execute when mutations are observed		
        var callbackOb = function (mutationsList, observer) {		
            //console.log(mutationsList)		
            for (var mutation of mutationsList) {		
                if (mutation.type === 'attributes' && mutation.attributeName === 'class' && targetNode.classList.contains("transitionLeave-0-6")) {		
                   {		
                    hideTocBlocker();	
                    disableHeader(false);
                    observer.disconnect();		
                   }		
                }		
            }		
        };		
        // Create an observer instance linked to the callback function		
        var observer = new MutationObserver(callbackOb);		
        // Start observing the target node for configured mutations		
        observer.observe(targetNode, config);
    }
}

//module.exports.onLaunchAddAnAsset();