// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// IMPORT - Components //
import TinyMceEditor from "../tinyMceEditor"
import { c2MediaModule } from './../../js/c2_media_module';
import config from '../../config/config';
import axios from 'axios';

// // IMPORT - Assets //
import './../../styles/ElementAudioVideo/ElementAudioVideo.css';
import {AUDIO,VIDEO,DEFAULT_ASSET,DEFAULT_VIDEO_POSTER_IMAGE} from './../../constants/Element_Constants';
import { hideTocBlocker, disableHeader } from '../../js/toggleLoader'
import { hasReviewerRole, sendDataToIframe } from '../../constants/utility.js'
import { handleAlfrescoSiteUrl, getAlfrescositeResponse } from '../ElementFigure/AlfrescoSiteUrl_helper.js'
import {alfrescoPopup, saveSelectedAssetData} from '../AlfrescoPopup/Alfresco_Action'
import { connect } from 'react-redux';

/*** @description - ElementAudioVideo is a class based component. It is defined simply to make a skeleton of the audio-video-type element ***/

class ElementAudioVideo extends Component {
    constructor(props) {
        super(props);
        this.state={
            imgSrc: null,
            assetData: null,
            elementType: this.props.model.figuretype || "",
            projectMetadata: false,
            alfrescoSite: '',
            alfrescoSiteData: {}
        }
    }
    /**
     * @description data after selecting an asset from alfresco c2 module
     * @param {*} data selected asset data
     */
    dataFromAlfresco = (data) => {
        hideTocBlocker();
        disableHeader(false);
        let tracks = [];
        let imageData = data;
        let clipInfo;
        let audioDes;
        let epsURL = imageData.epsUrl ? imageData.epsUrl : "";
        let checkFormat = epsURL?.match(/\.[0-9a-z]+$/i)
        checkFormat = checkFormat && checkFormat[0]
        let figureType = imageData?.content?.mimeType?.split('/')[0]
        let width = imageData.properties["exif:pixelXDimension"] ? imageData.properties["exif:pixelXDimension"] : "";
        let height = imageData.properties["exif:pixelYDimension"] ? imageData.properties["exif:pixelYDimension"] : "";
        let smartLinkAssetType = (typeof (imageData.properties["cm:description"]) == "string") ? imageData.properties["cm:description"].includes('smartLinkType') ? JSON.parse(imageData.properties["cm:description"]).smartLinkType : "" : "";
        smartLinkAssetType = smartLinkAssetType.toLowerCase();
        if (figureType === "video" || figureType === "audio" || smartLinkAssetType == "video" || smartLinkAssetType == "audio") {
            if ((figureType === "video" || smartLinkAssetType == "video") && (epsURL === "" || epsURL == undefined || checkFormat == null)) {
                epsURL = imageData['posterImageUrl'] ? imageData['posterImageUrl'] : "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png";
            }
            let smartLinkURl = imageData.properties["avs:url"] ? imageData.properties["avs:url"] : "";
            if (imageData.properties["cp:clips"]) {
                if (typeof (imageData.properties["cp:clips"]) == "string") {
                    let clipInfoData = JSON.parse(imageData.properties["cp:clips"])
                    if (clipInfoData === null) {
                        clipInfo = null;
                    }
                    else {
                        clipInfo = {
                            "clipid": clipInfoData[0].id ? clipInfoData[0].id : "",
                            "starttime": clipInfoData[0].start ? clipInfoData[0].start : "",
                            "endtime": clipInfoData[2].end ? clipInfoData[2].end : "",
                            "description": clipInfoData[0].description ? clipInfoData[0].description : "",
                            "duration": clipInfoData[0].duration ? clipInfoData[0].duration : ""
                        }
                    }
                }
                else {
                    if (imageData['clipinfo'] === null) {
                        clipInfo = null;
                    }
                    else {
                        clipInfo = {
                            "clipid": imageData['clipinfo'].id ? imageData['clipinfo'].id : "",
                            "starttime": imageData['clipinfo'].start ? imageData['clipinfo'].start : "",
                            "endtime": imageData['clipinfo'].end ? imageData['clipinfo'].end : "",
                            "description": imageData['clipinfo'].description ? imageData['clipinfo'].description : "",
                            "duration": imageData['clipinfo'].duration ? imageData['clipinfo'].duration : ""
                        }
                    }
                }
            }
            let videoFormat = imageData.mimetype ? imageData.mimetype : "";
            let uniqID = imageData.id ? imageData.id : "";
            let ensubtitle
            let frenchSubtitle
            let spanishSubtitle
            try{
                audioDes = JSON.parse(imageData.properties['avs:jsonString'])
                ensubtitle = audioDes.englishCC ? audioDes.englishCC : "";
                frenchSubtitle = audioDes.frenchCC ? audioDes.frenchCC : "";
                spanishSubtitle = audioDes.spanishCC ? audioDes.spanishCC : "";
            }catch(err){
                console.log(err)
            }
            if(audioDes && audioDes.audioDescEnabled && audioDes.audioDescEnabled==="Yes"){
                tracks.push(
                    {
                        path: audioDes.audioDescription,//.split("?")[0];
                        language: "en",
                        tracktype: "audiodescriptions",
                        label: `English AD`
                    }
                )
            }
            if (ensubtitle) {
                tracks.push(
                    {
                        format: 'text/' + ensubtitle.split("?")[1].split("&")[0].split("=")[1],
                        direction: "lefttoright",
                        path: ensubtitle,//.split("?")[0];
                        language: ensubtitle.split("?")[1].split("&")[1].split("=")[1] + "-us",
                        tracktype: "captions",
                        label: `English CC`
                    }
                )
            }
            if (frenchSubtitle) {
                tracks.push(
                    {
                        format: 'text/' + frenchSubtitle.split("?")[1].split("&")[0].split("=")[1],
                        path: frenchSubtitle,//.split("?")[0];
                        language: "fr-fr",
                        tracktype: "captions",
                        label: `French CC`
                    }
                )
            }
            if (spanishSubtitle) {
                tracks.push(
                    {
                        format: 'text/' + spanishSubtitle.split("?")[1].split("&")[0].split("=")[1],
                        path: spanishSubtitle,//.split("?")[0];
                        language: "es-es",
                        tracktype:  "captions",
                        label: `Spanish CC`
                    }
                )
            }
            
            this.setState({ imgSrc: epsURL,assetData :smartLinkURl })
            let figureData = {
                height : height,
                width : width,
                srctype: this.props.model.figuredata.srctype,
                figureType: figureType || smartLinkAssetType,
            }
            if (audioDes && audioDes.navXML) {
                figureData.markupurl = audioDes.navXML;
            }
            if (!uniqID) {
                let uniqIDString = imageData && imageData.req && imageData.req.url;
                let uniqueIDSmartlink;
                if (uniqIDString) {
                    uniqueIDSmartlink = uniqIDString.split('s.cmis:objectId = ')[1].replace(/\'/g, '');
                }
                let uniqueID = imageData.id ? imageData.id : (uniqueIDSmartlink ? uniqueIDSmartlink : '');
                if (uniqueID) {
                    uniqID = uniqueID;
                }
            }
            switch(figureType || smartLinkAssetType){
                case "video":
                    figureData = {
                        ...figureData,
                        videoid: `urn:pearson:alfresco:${uniqID}`,
                        posterimage: {
                            imageid: `urn:pearson:alfresco:${uniqID}`,
                            path: epsURL,
                        },
                        videos: [
                            {
                                format: videoFormat,
                                path: smartLinkURl
                            }
                        ],
                        tracks: [
                            ...tracks
                        ],
                        clipinfo : clipInfo,
                        schema: "http://schemas.pearson.com/wip-authoring/video/1#/definitions/video",
                    }
                    break;
                case "audio":
                    figureData = {
                        ...figureData,
                        audioid: `urn:pearson:alfresco:${uniqID}`,
                        posterimage: {
                            imageid: `urn:pearson:alfresco:${uniqID}`,
                            path: epsURL,
                        },
                        audio: {
                            format: videoFormat,
                            path: smartLinkURl
                        },
                        schema: "http://schemas.pearson.com/wip-authoring/audio/1#/definitions/audio"
                    }
                    break;
            }
            if (figureData && ((figureData.clipinfo && figureData.clipinfo.clipid === "") || (figureData.clipinfo === null))) {
                delete figureData.clipinfo
            }
            this.props.updateFigureData(figureData, this.props.index,this.props.elementId, ()=>{
                this.props.handleFocus("updateFromC2")
                this.props.handleBlur(true)
            })
            let alfrescoData = config?.alfrescoMetaData?.alfresco;
            alfrescoData = this.props.isCiteChanged ? this.props.changedSiteData : alfrescoData
            let alfrescoSiteLocation = this.state.alfrescoSiteData
            if((!alfrescoSiteLocation?.nodeRef) || (alfrescoSiteLocation?.nodeRef === '' || this.props.isCiteChanged)){
                handleAlfrescoSiteUrl(this.props.elementId, alfrescoData)
            }
            let payloadObj = {
                asset: {}, 
                id: ''
            }
            this.props.saveSelectedAssetData(payloadObj)
            this.updateAlfrescoSiteUrl(alfrescoData)
        }
    }

    updateAlfrescoSiteUrl = (alfrescoData) => {
        let repositoryData = alfrescoData.title ? alfrescoData.title : alfrescoData.repositoryFolder
        if(repositoryData){
            this.setState({
                alfrescoSite: repositoryData
            })  
        }else {
            this.setState({
                alfrescoSite: config.alfrescoMetaData.alfresco.repositoryFolder
            }) 
        }
    }

    handleSiteOptionsDropdown = (alfrescoPath, id, locationData) =>{
        let that = this
        let url = 'https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/api/-default-/public/alfresco/versions/1/people/-me-/sites?maxItems=1000';
        let SSOToken = config.ssoToken;
        return axios.get(url,
            {
                headers: {
                    'Accept': 'application/json',
                    'ApiKey': config.CMDS_APIKEY,
                    'Content-Type': 'application/json',
                    'PearsonSSOSession': SSOToken
                }
            })
            .then(function (response) {
               let payloadObj = {launchAlfrescoPopup: true, 
                alfrescoPath: alfrescoPath, 
                alfrescoListOption: response.data.list.entries,
                id,
                locationData
            }
                that.props.alfrescoPopup(payloadObj)
            })
            .catch(function (error) {
                console.log("Error IN SITE API", error)
            });
    }
    
    componentDidMount() {
        getAlfrescositeResponse(this.props.elementId, (response) => {
            this.setState({
                alfrescoSite: response.repositoryFolder ? response.repositoryFolder : response.title,
                alfrescoSiteData:{...response}
            })
        })
    }

    componentDidUpdate(prevProps) {
        const { elementId, alfrescoElementId, alfrescoAssetData, launchAlfrescoPopup } = this.props
        if (elementId === alfrescoElementId && prevProps.alfrescoElementId !== alfrescoElementId && !launchAlfrescoPopup ) {
            this.dataFromAlfresco(alfrescoAssetData)
        }
    }
    
    /**
     * @description Open C2 module with predefined Alfresco location
     * @param {*} locationData alfresco locationData
     */
    handleC2ExtendedClick = (locationData) => {
        let alfrescoLocationData = this.state.alfrescoSiteData
        let data_1 = alfrescoLocationData?.nodeRef ? alfrescoLocationData : locationData;
        let that = this;
        !hasReviewerRole() && c2MediaModule.productLinkOnsaveCallBack(data_1, function (data_2) {
            c2MediaModule.AddanAssetCallBack(data_2, function (data) {
                that.dataFromAlfresco(data);
            })
        })

    }
    /**
     * @description function will be called on image src add and fetch resources from Alfresco
     */
    handleC2MediaClick = (e) => {
        this.props.handleFocus();
        if(hasReviewerRole()){
            return true
        }
        if (e.target.tagName.toLowerCase() === "p") {
            e.stopPropagation();
            return;
        }

        const figureData = this.props.model.figuredata;
        let currentAsset = null;

        if (figureData) {
            const id = figureData.videoid || figureData.audioid;
            const type = 'videoid' in figureData ? 'video' : ('audioid' in figureData ? 'audio' : null);
        
            currentAsset = id ? {
                id: id.split(':').pop(), // get last
                type,
            } : null;
        }
        

        let that = this;
        let alfrescoPath = config.alfrescoMetaData;
        if (alfrescoPath && this.state.projectMetadata) {
            alfrescoPath.alfresco = this.state.projectMetadata.alfresco;
        }
        var data_1 = false;
        if(alfrescoPath && alfrescoPath.alfresco && Object.keys(alfrescoPath.alfresco).length > 0 ) {
            if (alfrescoPath?.alfresco?.guid || alfrescoPath?.alfresco?.nodeRef ) {         //if alfresco location is available
                if (this.props.permissions && this.props.permissions.includes('add_multimedia_via_alfresco')) {
                    let alfrescoLocationData = this.state.alfrescoSiteData
                    let alfrescoSiteName = alfrescoPath?.alfresco?.name ? alfrescoPath.alfresco.name : alfrescoPath.alfresco.siteId
                    alfrescoSiteName = alfrescoPath?.alfresco?.title ? alfrescoPath.alfresco.title : alfrescoSiteName
                    let nodeRefs = alfrescoPath?.alfresco?.nodeRef ? alfrescoPath?.alfresco?.nodeRef : alfrescoPath.alfresco.guid
                    const locationSiteDataNodeRef =alfrescoLocationData?.nodeRef ? alfrescoLocationData.nodeRef : alfrescoLocationData?.guid
                    nodeRefs = locationSiteDataNodeRef ? locationSiteDataNodeRef : nodeRefs;
                    const locationSiteDataTitle = alfrescoLocationData?.repositoryFolder ? alfrescoLocationData.repositoryFolder : alfrescoLocationData?.title
                    let messageObj = { citeName: locationSiteDataTitle? locationSiteDataTitle : alfrescoSiteName, 
                        citeNodeRef: nodeRefs, 
                        elementId: this.props.elementId }
                    sendDataToIframe({ 'type': 'launchAlfrescoPicker', 'message': messageObj })
                    // data_1 = alfrescoPath.alfresco;
                    // data_1.currentAsset = currentAsset;
                    // /*
                    //     data according to new project api 
                    // */
                    // data_1['repositoryName'] = data_1['repoName'] ? data_1['repoName'] : data_1['repositoryName']
                    // data_1['repositoryFolder'] = data_1['name'] ? data_1['name'] : data_1['repositoryFolder']
                    // data_1['repositoryUrl'] = data_1['repoInstance'] ? data_1['repoInstance'] : data_1['repositoryUrl']
                    // data_1['visibility'] = data_1['siteVisibility'] ? data_1['siteVisibility'] : data_1['visibility']

                    // /*
                    //     data according to old core api and c2media
                    // */
                    // data_1['repoName'] = data_1['repositoryName'] ? data_1['repositoryName'] : data_1['repoName']
                    // data_1['name'] = data_1['repositoryFolder'] ? data_1['repositoryFolder'] : data_1['name']
                    // data_1['repoInstance'] = data_1['repositoryUrl'] ? data_1['repositoryUrl'] : data_1['repoInstance']
                    // data_1['siteVisibility'] = data_1['visibility'] ? data_1['visibility'] : data_1['siteVisibility']

                    // this.handleC2ExtendedClick(data_1)
                }
                else {
                    this.props.accessDenied(true)
                }

            }
        }
        else {
            if (this.props.permissions.includes('alfresco_crud_access')) {
                this.handleSiteOptionsDropdown(alfrescoPath, this.props.elementId, this.state.alfrescoSiteData)
                // c2MediaModule.onLaunchAddAnAsset(function (alfrescoData) {
                //     data_1 = { 
                //         ...alfrescoData,
                //         currentAsset: currentAsset,
                //     };
                    
                //     let request = {
                //         eTag: alfrescoPath.etag,
                //         projectId: alfrescoPath.id,
                //         ...alfrescoPath,
                //         additionalMetadata: { ...alfrescoData },
                //         alfresco: { ...alfrescoData }
                //     };

                //     /*
                //         preparing data according to Project api
                //     */

                //     request.additionalMetadata['repositoryName'] = data_1['repoName'];
                //     request.additionalMetadata['repositoryFolder'] = data_1['name'];
                //     request.additionalMetadata['repositoryUrl'] = data_1['repoInstance'];
                //     request.additionalMetadata['visibility'] = data_1['siteVisibility'];

                //     request.alfresco['repositoryName'] = data_1['repoName'];
                //     request.alfresco['repositoryFolder'] = data_1['name'];
                //     request.alfresco['repositoryUrl'] = data_1['repoInstance'];
                //     request.alfresco['visibility'] = data_1['siteVisibility'];

                //     that.handleC2ExtendedClick(data_1)
                //     /*
                //         API to set alfresco location on dashboard
                //     */
                //     let url = config.PROJECTAPI_ENDPOINT + '/' + request.projectId + '/alfrescodetails';
                //     let SSOToken = request.ssoToken;
                //     return axios.patch(url, request.alfresco,
                //         {
                //             headers: {
                //                 'Accept': 'application/json',
                //                 'ApiKey': config.STRUCTURE_APIKEY,
                //                 'Content-Type': 'application/json',
                //                 'PearsonSSOSession': SSOToken,
                //                 'If-Match': request.eTag
                //             }
                //         })
                //         .then(function (response) {
                //             let tempData = { alfresco: alfrescoData };
                //             that.setState({
                //                 projectMetadata: tempData
                //             })
                //         })
                //         .catch(function (error) {
                //             console.log("error", error)
                //         });
                // })
            }
            else {
                this.props.accessDenied(true)
            }
        }

    }
    /*** @description - This function is for handling the Audio-Video-element.
     * @param model object that defined the type of element
     * @param index index of the current element
     * @param slateLockInfo object that defines the slate lock details */

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.model && 'figuretype' in nextProps.model && nextProps.model.figuretype !== prevState.elementType) {
            return {
                imgSrc: null,
                assetData: null,
                elementType: nextProps.model.figuretype || ""
            };
        }

        return null;
    }

    renderAudioVideoType = (model,index,slateLockInfo) => {
        var audioVideoJSX;
        var assetPath;
        switch (model.figuretype) {
            case AUDIO:
                /**JSX for Audio-type element*/
                if(model && model.figuredata && model.figuredata.audio && model.figuredata.audio.path){
                    assetPath=model.figuredata.audio.path;
                }else{
                    assetPath= DEFAULT_ASSET
                }
                
                audioVideoJSX = <div className="divAudio">
                    <figure className="figureAudio"  >
                        <header className="figureHeader">

                            <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} index={`${index}-0`} placeholder="Enter Label..." tagName={'h4'} className="heading4AudioNumberLabel figureLabel " model={model.html.title} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />

                            <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} index={`${index}-1`} placeholder="Enter Title..." tagName={'h4'} className="heading4AudioTitle figureTitle" model={model.html.subtitle} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />

                        </header>
                        <div className="assetDiv"><strong>Asset: </strong>{this.state.assetData?this.state.assetData : assetPath}</div>
                        <div className="assetDiv"><strong>Alfresco Site: </strong>{ model?.figuredata?.audioid !== "" ? this.state.alfrescoSite : "" }</div>
                        <div className="pearson-component audio" data-type="audio" onClick={this.handleC2MediaClick}>
                            <audio controls="none" preload="none" className="audio" >
                                <source src={this.state.imgSrc?this.state.imgSrc :""} type="audio/mpeg" />
                            </audio>
                        </div>
                        <figcaption className="figcaptionAudio" >
                            <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} index={`${index}-2`} placeholder="Enter Caption..." tagName={'p'} className="figureCaption" model={model.html.captions} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />
                        </figcaption>

                    </figure>
                    <div >
                        <TinyMceEditor  permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model}  handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} index={`${index}-3`} placeholder="Enter Credit..." tagName={'p'} className="paragraphAudioCredit figureCredit" model={model.html.credits} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />
                    </div>
                </div>
                break;
            case VIDEO:
                /**JSX for Video-type element*/
                var posterImage;
                if(model && model.figuredata && model.figuredata.videos && model.figuredata.videos[0].path){
                    assetPath=model.figuredata.videos[0].path;
                }else{
                    assetPath= DEFAULT_ASSET
                }
                if(model && model.figuredata && model.figuredata.posterimage){
                    posterImage=model.figuredata.posterimage.path;
                }else{
                    posterImage= DEFAULT_VIDEO_POSTER_IMAGE
                }
               
                audioVideoJSX = <div className="divVideo">
                    <figure className="figureVideo" >

                        <header className="figureHeader">
                            <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} index={`${index}-0`} placeholder="Enter Label..." tagName={'h4'} className="heading4VideoNumberLabel figureLabel " model={model.html.title} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />
                            <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} index={`${index}-1`} placeholder="Enter Title..." tagName={'h4'} className="heading4VideoTitle figureTitle" model={model.html.subtitle} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />
                        </header>
                        <div className="assetDiv"><strong>Asset: </strong>{this.state.assetData?this.state.assetData : (assetPath !== "" ? assetPath : DEFAULT_ASSET)}</div>
                        <div className="assetDiv"><strong>Alfresco Site: </strong>{ model?.figuredata?.videoid !== "" ? this.state.alfrescoSite : "" }</div>
                        <div className="pearson-component video" data-type="video" >
                            <video className="video" width="640" height="360" controls="none" preload="none" onClick={this.handleC2MediaClick}
                              poster={this.state.imgSrc?this.state.imgSrc : posterImage}
                            >
                                <source src="" />
                                <track src="" kind="subtitles" srcLang="en" label="English" />
                            </video>
                        </div>
                        <figcaption className="figcaptionVideo" >
                            <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} index={`${index}-2`} placeholder="Enter Caption..." tagName={'p'} className="figureCaption" model={model.html.captions}  slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />
                        </figcaption>
                    </figure>
                    <div >
                        <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} index={`${index}-3`} placeholder="Enter Credit..." tagName={'p'} className="paragraphVideoCredit figureCredit" model={model.html.credits}  slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />
                    </div>
                </div>
                break;
        }
        return audioVideoJSX;
    }
    render() {
        const { model, index, slateLockInfo } = this.props;
      
            return (
                <div className="figureElement">
                    {this.renderAudioVideoType(model, index, slateLockInfo)}
                </div>         
            );
        }
    
}


ElementAudioVideo.displayName = "ElementAudioVideo"

ElementAudioVideo.defaultProps = {
    /** Detail of element in JSON object */
    model: PropTypes.object,

}

ElementAudioVideo.propTypes = {

    /** Handler to return the type of element based on the figuretype and alignment */
    renderAudioVideoType: PropTypes.func,
    /** Handler to attach on element blur */
    onBlur: PropTypes.func,
    /** Handler to attach on element focus */
    onFocus: PropTypes.func

}

const mapActionToProps = (dispatch) =>{
    return{
        alfrescoPopup: (payloadObj) => {
            dispatch(alfrescoPopup(payloadObj))
        },
        saveSelectedAssetData: (payloadObj) => {
            dispatch(saveSelectedAssetData(payloadObj))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        alfrescoAssetData: state.alfrescoReducer.alfrescoAssetData,
        alfrescoElementId : state.alfrescoReducer.elementId,
        alfrescoListOption: state.alfrescoReducer.alfrescoListOption,
        launchAlfrescoPopup: state.alfrescoReducer.launchAlfrescoPopup,
        isCiteChanged : state.alfrescoReducer.isCiteChanged,
        changedSiteData: state.alfrescoReducer.changedSiteData
    }
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(ElementAudioVideo);