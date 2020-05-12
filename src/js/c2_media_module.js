
import { showTocBlocker, hideTocBlocker, disableHeader } from './toggleLoader'
import { sendDataToIframe } from '../constants/utility.js'
import config_object1 from '../config/config';
const configOBJ = require('./../config/config');
let config_object = configOBJ.default;
const authModule = { GET_SSO_TOKEN: function () { return config_object.ssoToken } };
const tab_visibility = '{"audio" : true,"image": true,"other":true,"video": true,"epsUrl":true,"defaulttab":"search"}';
var uname = config_object['userId'];
const renderderedTagSelector = '#c2-modal';
var patternBroker;
var patternProductLink;
var patternAddAnAsset;
var productLink;
var addAnAsset = {};
var addAnAssetConfig = {};

export const c2MediaModule = {
    addAnAsset: addAnAsset,
    libraryConfiguration: function () {
        /*Configure the library*/
        let setConfig = {
            'locale': 'en_US',
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/ld+json',
                'X-Roles-Test': 'ContentMetadataEditor',
                'Prefer': 'annotation=true',
                'Apikey': config_object1.CMDS_APIKEY,
                'x-apikey': config_object1.CMDS_APIKEY,
                'PearsonSSOSession': authModule.GET_SSO_TOKEN(),
                'X-PearsonSSOSession': authModule.GET_SSO_TOKEN()
            },
            'database': config_object1.CMDS_DATABASE,
            'server': config_object1.CMDS_DATA_ENDPOINT,
            'taxonomyserver': config_object1.CMDS_SCHEMA_ENDPOINT, // Rel 3.6
            'userId': uname || config_object['userId']
        };
        return setConfig
    },
    productLinkOnsaveCallBack: function (data, callback) {
        this.launchAssetBrowser(data.nodeRef, data.repoInstance, data.repoName, callback, data.currentAsset);

    },

    AddanAssetCallBack: function (data, callback) {
		patternBroker = PatternBroker.default;
        patternProductLink = PatternProductLink.default;
        patternAddAnAsset = PatternAddAnAsset.default;
        let libConfig=this.libraryConfiguration()
        patternBroker.setup(libConfig);
        let uniqueID = data.nodeRef && data.nodeRef.split('/')[3];
        let assetType = data.mimetype && data.mimetype.split('/')[0];
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
            data['EpsUrl'] = 'https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png'
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
                let Height = patternBroker.extract(data, patternBroker.items.AddAnAsset['Height1'] ? patternBroker.items.AddAnAsset['Height1'] : patternBroker.items.AddAnAsset['Height'] ? patternBroker.items.AddAnAsset['Height'] : '');
                let Width = patternBroker.extract(data, patternBroker.items.AddAnAsset['Width1'] ? patternBroker.items.AddAnAsset['Width1'] : patternBroker.items.AddAnAsset['Width'] ? patternBroker.items.AddAnAsset['Width'] : '');
                data['posterImageUrl'] = patternBroker.extract(data, patternBroker.items.AddAnAsset['Poster Image URL'] ? patternBroker.items.AddAnAsset['Poster Image URL'] : '')
                smartLinkURl = patternBroker.extract(data, patternBroker.items.AddAnAsset['Smart Link Asset URL'] ? patternBroker.items.AddAnAsset['Smart Link Asset URL'] : '');
                let vendorName = patternBroker.extract(data, patternBroker.items.AddAnAsset['Smart Link thirdPartyVendorVal'] ? patternBroker.items.AddAnAsset['Smart Link thirdPartyVendorVal'] : '');
                data['smartLinkURl'] = smartLinkURl;
                data['vendorName'] = vendorName;
                data['width'] = Width
                data['height'] = Height
                data['smartlinkoptimizedmobileval'] = patternBroker.extract(data, patternBroker.items.AddAnAsset['Smart Link optimizedMobileVal'] ? patternBroker.items.AddAnAsset['Smart Link optimizedMobileVal'] : '');
                data['subtitle'] = patternBroker.extract(data, patternBroker.items.AddAnAsset['subtitle'] ? patternBroker.items.AddAnAsset['subtitle'] : '');
                data['spanishsubtitle'] = patternBroker.extract(data, patternBroker.items.AddAnAsset['spanish subtitle'] ? patternBroker.items.AddAnAsset['spanish subtitle'] : '');
                data['frenchsubtitle'] = patternBroker.extract(data, patternBroker.items.AddAnAsset['french subtitle'] ? patternBroker.items.AddAnAsset['french subtitle'] : '');
                let mobileVal = patternBroker.extract(data, patternBroker.items.AddAnAsset['Smart Link optimizedMobileVal'] ? patternBroker.items.AddAnAsset['Smart Link optimizedMobileVal'] : '');
                if (mobileVal) {
                    let optimizedValue;
                    if (mobileVal.toLowerCase() === 'yes') {
                        optimizedValue = true
                    }
                    else if (mobileVal.toLowerCase() === 'no') {
                        optimizedValue = false
                    }
                    else {
                        optimizedValue = mobileVal.toLowerCase()
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

    launchAssetBrowser: function (product, server, repo, callback, currentAsset) {
		patternBroker = PatternBroker.default;
        patternProductLink = PatternProductLink.default;
        patternAddAnAsset = PatternAddAnAsset.default;
        let libConfig=this.libraryConfiguration()
        patternBroker.setup(libConfig);
        let productRef = product;
        //let serverRef = "https://uswip.cms.pearson.com/share/page/site/cite-generic-openers/documentlibrary";
        let serverRef=server;
        if (addAnAsset && addAnAsset.unmount) {
            addAnAsset.unmount();
        }        
        
        addAnAssetConfig = { 'selector': renderderedTagSelector };
        addAnAssetConfig.language = 'en';// YS
        addAnAssetConfig.nodeRef = productRef;
        addAnAssetConfig.alfserver = serverRef; //data.repoInstance;
        addAnAssetConfig.tabVisibility = tab_visibility;
        addAnAssetConfig.currentAsset = currentAsset;

        addAnAssetConfig['cmis'] = '{"wURN":false}';
        addAnAssetConfig['epsserver'] = config_object1.EPS_API;
        addAnAssetConfig.imagePreview = '{"imagePreview":true}';
        addAnAssetConfig.register = 'some-register';  // YS
        addAnAssetConfig.showdescription = 'true';  // YS
        addAnAssetConfig.uploadAll = 'false';  // Rel 3.6

        addAnAsset = patternBroker.create('AddAnAsset', patternAddAnAsset);

        try {
            if (addAnAsset.corsId) {
                libConfig.headers['Correlation-Id'] = addAnAsset.corsId;
            }
            patternBroker.setup(libConfig);
            addAnAsset.setup(addAnAssetConfig, this.AddanAssetCallBack);
            addAnAsset.run(addAnAsset);
            addAnAsset.on(callback);

            showTocBlocker();
            disableHeader(true);
            sendDataToIframe({ 'type': 'hideToc', 'message': {} });

            //alfresco toc issue
            var targetNode = document.getElementsByClassName('overlay-0-0 overlayLittle-0-1')[0];

            // Options for the observer (which mutations to observe)
            var config = { attributes: true };

            // Callback function to execute when mutations are observed
            var callbackOb = function (mutationsList, observercb) {
                for (var mutation of mutationsList) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class' && targetNode.classList.contains("transitionLeave-0-6")) {
                        {
                            hideTocBlocker();
                            disableHeader(false);
                            observercb.disconnect();
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

    validateProperties: function (elements, property1, property2) {
        return elements.hasOwnProperty('repo') && elements.hasOwnProperty('repoName');
    },

    validateRegistries: function (cmisRepo) {
        const isAllElementValid = cmisRepo.map((element) => {
            return this.validateProperties(element, 'repoName', 'repo')
        });
        return isAllElementValid.every((item) => item !== false);
    },

    onLaunchAddAnAsset: function (callback) {
        disableHeader(true);
        showTocBlocker();
        addAnAssetConfig.nodeRef = '';//185fca35-4215-43bf-bf9d-11375903b2b4';
        sendDataToIframe({ 'type': 'hideToc', 'message': {} });
        if (addAnAssetConfig.nodeRef !== undefined && addAnAssetConfig.nodeRef !== '') {
            this.launchAssetBrowser(addAnAssetConfig.nodeRef);

        } else {

            patternBroker = PatternBroker.default;
            patternProductLink = PatternProductLink.default;
            patternAddAnAsset = PatternAddAnAsset.default;
            let libConfig=this.libraryConfiguration()
            patternBroker.setup(libConfig);

            if (productLink && productLink.unmount) {
                productLink.unmount();
            }
            let CMIS_REPO=config_object1.CMIS_REPO;
            // let CMIS_REPO=[{
            //     "repo":"https://uswip.cms.pearson.com/share/page/site/cite-generic-openers/documentlibrary",
            //     "repoName":"Global"
            // }]
            console.log("CMIS_REPO>>>>>>>",CMIS_REPO)
            if (CMIS_REPO !== undefined && CMIS_REPO !== null && CMIS_REPO !== '') {
                // try{
                const cmisRepo = CMIS_REPO;
                if (cmisRepo.length > 0) {
                    const canWeProceedWithPL = this.validateRegistries(cmisRepo);
                    if (canWeProceedWithPL) {
                        var productLinkConfig = { 'selector': renderderedTagSelector };
                        productLinkConfig.repoList = cmisRepo;
                        productLinkConfig.language = 'en';  // YS
                        productLinkConfig.isRegisterGrid = '{"isRegisterGrid":false}';//Temporary fix for alignment issue
                        productLinkConfig.subfolderAccess = '{"subfolderAccess":false}';//Temporary fix for alignment issue
                        productLink = patternBroker.create('ProductLink', patternProductLink);
                        if (productLink.corsId) {
                            libConfig.headers['Correlation-Id'] = productLink.corsId;
                        }
                        patternBroker.setup(libConfig);
                        productLink.setup(productLinkConfig, this.productLinkOnsaveCallBack);
                        productLink.run(productLink);
                        productLink.on(callback);
                    } else {
                        console.log('CMIS REPO - Object(s) in CMIS REPO does not have RepoName/Repo property');
                    }
                } else {
                    console.log('CMIS REPO - Should have atleast one Registry');
                }
            } else {
                console.log('CMIS REPO - should not be Empty, Provide Valid REPO Values');
            }
        }
        var targetNode = document.getElementsByClassName('overlay-0-0 overlayLittle-0-1')[0];
        // Options for the observer (which mutations to observe)		
        var config = { attributes: true };
        // Callback function to execute when mutations are observed		
        var callbackOb = function (mutationsList, observercb) {
            //console.log(mutationsList)		
            for (var mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class' && targetNode.classList.contains("transitionLeave-0-6")) {
                    {
                        hideTocBlocker();
                        disableHeader(false);
                        observercb.disconnect();
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
