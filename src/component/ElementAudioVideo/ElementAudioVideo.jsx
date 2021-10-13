// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// IMPORT - Components //
import TinyMceEditor from "../tinyMceEditor"
import config from '../../config/config';
import axios from 'axios';
import FigureUserInterface from '../ElementFigure/FigureUserInterface.jsx';

// // IMPORT - Assets //
import './../../styles/ElementAudioVideo/ElementAudioVideo.css';
import {AUDIO,VIDEO,DEFAULT_ASSET,DEFAULT_VIDEO_POSTER_IMAGE} from './../../constants/Element_Constants';
//import { hideTocBlocker, disableHeader } from '../../js/toggleLoader'
import { hasReviewerRole, getLabelNumberTitleHTML, sendDataToIframe } from '../../constants/utility.js'
import { handleAlfrescoSiteUrl, getAlfrescositeResponse } from '../ElementFigure/AlfrescoSiteUrl_helper.js'
import {alfrescoPopup, saveSelectedAssetData} from '../AlfrescoPopup/Alfresco_Action'
import { connect } from 'react-redux';
import { hideTocBlocker, disableHeader, showTocBlocker, hideToc } from '../../js/toggleLoader';
import PopUp from '../PopUp';
import { DELETE_DIALOG_TEXT } from '../SlateWrapper/SlateWrapperConstants';
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
            alfrescoSiteData: {},
            deleteAssetPopup: false
        }
    }
    
    /*** @description This function is used to handle Canvas Blocker on Update */
    showCanvasBlocker = (value) => {
        if (value == true) {
            showTocBlocker();
            hideToc();
        } else {
            hideTocBlocker(value);
        }
        disableHeader(value);
        this.props.showBlocker(value);
    }
    /**
     * @description This function is used to toggle delete popup
     * @param {*} toggleValue Boolean value
     * @param {*} event event object
     */
     toggleDeletePopup = (toggleValue, event) => {
        if (event) {
            event.preventDefault();
        }
        this.setState({
            deleteAssetPopup: toggleValue
        })
        this.showCanvasBlocker(toggleValue);
    }

    /*** @description This function is used to render delete Popup */
    showDeleteAssetPopup = () => {
        if (this.state.deleteAssetPopup) {
            this.showCanvasBlocker(true)
            return (
                <PopUp
                    dialogText={DELETE_DIALOG_TEXT}
                    active={true}
                    togglePopup={this.toggleDeletePopup}
                    isDeleteAssetPopup={true}
                    deleteAssetHandler={this.deleteElementAsset}
                    isInputDisabled={true}
                    isDeleteAssetClass="delete-element-text"    
                />
            )
        }
        else {
            return null
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
        let epsURL = imageData?.epsUrl ? imageData.epsUrl : "";   
        //let checkFormat = epsURL?.match(/\.[0-9a-z]+$/i)
        //checkFormat = checkFormat && checkFormat[0]
        let assetFormat=""
        let figureType = imageData?.content?.mimeType?.split('/')[0]
        let width = imageData?.properties["exif:pixelXDimension"] ? imageData.properties["exif:pixelXDimension"] : "";
        let height = imageData?.properties["exif:pixelYDimension"] ? imageData.properties["exif:pixelYDimension"] : "";
        let smartLinkAssetType = imageData.properties["cm:description"] && (typeof (imageData.properties["cm:description"]) == "string") ? imageData.properties["cm:description"].includes('smartLinkType') ? JSON.parse(imageData.properties["cm:description"]).smartLinkType : "" : "";
        smartLinkAssetType = smartLinkAssetType?.toLowerCase();
        if (figureType === "video" || figureType === "audio" || smartLinkAssetType == "video" || smartLinkAssetType == "audio") {
            if ((figureType === "video" || smartLinkAssetType == "video") && (epsURL === "" || epsURL == undefined)) {
                if(imageData?.properties['avs:jsonString']){
                    const avsJsonString = JSON.parse(imageData.properties['avs:jsonString']);
                    const imageReference = avsJsonString?.imageReferenceURL ?? DEFAULT_VIDEO_POSTER_IMAGE;
                    epsURL = imageReference
                }
            }
            let smartLinkUrl = "";
            if(figureType === "video" || figureType === "audio"){
                smartLinkUrl = imageData["institution-urls"] && imageData["institution-urls"][0]?.publicationUrl
                if (figureType === "audio" && !smartLinkUrl) {
                    smartLinkUrl = imageData?.smartLinkURl
                }
            }
            else if (smartLinkAssetType == "video" || smartLinkAssetType == "audio") {
                smartLinkUrl = imageData?.properties["avs:url"] ? imageData.properties["avs:url"] : "";
                if (smartLinkUrl && smartLinkUrl?.split('=') && smartLinkUrl?.split('=').length > 1) {
                    assetFormat = smartLinkAssetType + "/" + smartLinkUrl?.split('=')[1]
                }
            }
            // if (imageData?.properties["cp:clips"]) {
            //     if (typeof (imageData.properties["cp:clips"]) == "string") {
            //         let clipInfoData = JSON.parse(imageData.properties["cp:clips"])
            //         if (clipInfoData === null) {
            //             clipInfo = null;
            //         }
            //         else {
            //             clipInfo = {
            //                 "clipid": clipInfoData[0]?.id ? clipInfoData[0].id : "",
            //                 "starttime": clipInfoData[0]?.start ? clipInfoData[0].start : "",
            //                 "endtime": clipInfoData[2]?.end ? clipInfoData[2].end : "",
            //                 "description": clipInfoData[0]?.description ? clipInfoData[0].description : "",
            //                 "duration": clipInfoData[0].duration ? clipInfoData[0].duration : ""
            //             }
            //         }
            //     }
            //     else {
            //         if (imageData['clipinfo'] === null) {
            //             clipInfo = null;
            //         }
            //         else {
            //             clipInfo = {
            //                 "clipid": imageData['clipinfo'].id ? imageData['clipinfo'].id : "",
            //                 "starttime": imageData['clipinfo'].start ? imageData['clipinfo'].start : "",
            //                 "endtime": imageData['clipinfo'].end ? imageData['clipinfo'].end : "",
            //                 "description": imageData['clipinfo'].description ? imageData['clipinfo'].description : "",
            //                 "duration": imageData['clipinfo'].duration ? imageData['clipinfo'].duration : ""
            //             }
            //         }
            //     }
            // }
            if(imageData?.clip && Object.keys(imageData.clip).length >0){
                clipInfo = {
                    "clipid": imageData.clip.id ?? "",
                    "starttime": imageData.clip.start ?? "",
                    "endtime": imageData.clip.end ?? "",
                    "description": imageData.clip.description ?? "",
                    "duration": imageData.clip.duration ?? ""
                }
            }
            const videoFormat = imageData?.mimetype ?? imageData?.content?.mimeType ?? assetFormat ?? "";
            let uniqID = imageData?.id ?? "";
            let ensubtitle = ""
            let frenchSubtitle = ""
            let spanishSubtitle = ""
            
            audioDes = imageData?.properties['avs:jsonString'] && JSON.parse(imageData.properties['avs:jsonString'])
            ensubtitle = audioDes?.englishCC ?? "";
            frenchSubtitle = audioDes?.frenchCC ?? "";
            spanishSubtitle = audioDes?.spanishCC ?? "";
        
            if(audioDes?.audioDescEnabled === "Yes"){
                tracks.push(
                    {
                        path: audioDes?.audioDescription,//.split("?")[0];
                        language: "en",
                        tracktype: "audiodescriptions",
                        label: `English AD`
                    }
                )
            }
            if (ensubtitle) {
                tracks.push(
                    {
                        format: 'text/' + ensubtitle?.split("?")[1]?.split("&")[0]?.split("=")[1],
                        direction: "lefttoright",
                        path: ensubtitle,//.split("?")[0];
                        language: ensubtitle?.split("?")[1]?.split("&")[1]?.split("=")[1] + "-us",
                        tracktype: "captions",
                        label: `English CC`
                    }
                )
            }
            if (frenchSubtitle) {
                tracks.push(
                    {
                        format: 'text/' + frenchSubtitle?.split("?")[1]?.split("&")[0]?.split("=")[1],
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
                        format: 'text/' + spanishSubtitle?.split("?")[1]?.split("&")[0]?.split("=")[1],
                        path: spanishSubtitle,//.split("?")[0];
                        language: "es-es",
                        tracktype:  "captions",
                        label: `Spanish CC`
                    }
                )
            }
            
            this.setState({ imgSrc: epsURL, assetData :smartLinkUrl })
            let figureData = {
                height : height,
                width : width,
                srctype: this.props.model.figuredata.srctype,
                figuretype: figureType || smartLinkAssetType,
            }
            if (audioDes && audioDes.navXML) {
                figureData.markupurl = audioDes.navXML;
            }
            if (!uniqID) {
                let uniqIDString = imageData?.req?.url;
                let uniqueIDSmartlink;
                if (uniqIDString) {
                    uniqueIDSmartlink = uniqIDString.split('s.cmis:objectId = ')[1]?.replace(/\'/g, '');
                }
                let uniqueID = imageData?.id ? imageData.id : (uniqueIDSmartlink ? uniqueIDSmartlink : '');
                if (uniqueID) {
                    uniqID = uniqueID;
                }
            }
            switch(this.state.elementType || figureType || smartLinkAssetType){
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
                                path: smartLinkUrl
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
                            imageid: `urn:pearson:alfresco:${uniqID}`
                        },
                        audio: {
                            format: videoFormat,
                            path: smartLinkUrl
                        },
                        schema: "http://schemas.pearson.com/wip-authoring/audio/1#/definitions/audio"
                    }
                    if (epsURL?.match(/.(jpg|jpeg|png|gif)$/i)) {
                        figureData.posterimage.path = epsURL
                    }
                    break;
            }
            if (figureData && ((figureData.clipinfo && figureData.clipinfo.clipid === "") || (figureData.clipinfo === null))) {
                delete figureData.clipinfo
            }
            this.props.updateFigureData(figureData, this.props.index,this.props.elementId, this.props.asideData, ()=>{
                this.props.handleFocus("updateFromC2")
                this.props.handleBlur(true)
            })
            let alfrescoData = config?.alfrescoMetaData?.alfresco;
            let alfrescoSiteLocation = this.state.alfrescoSiteData;
            if(this.props.isCiteChanged){
                let changeSiteAlfrescoData={
                    currentAsset: {},
                    nodeRef: this.props.changedSiteData.guid,
                    repositoryFolder: this.props.changedSiteData.title,
                    siteId: this.props.changedSiteData.id,
                    visibility: this.props.changedSiteData.visibility
                }
                handleAlfrescoSiteUrl(this.props.elementId, changeSiteAlfrescoData)
                this.setState({
                    alfrescoSite: changeSiteAlfrescoData?.repositoryFolder,
                    alfrescoSiteData:changeSiteAlfrescoData
                })
            }else{
                if((!alfrescoSiteLocation?.nodeRef) || (alfrescoSiteLocation?.nodeRef === '')){
                    handleAlfrescoSiteUrl(this.props.elementId, alfrescoData)
                    this.updateAlfrescoSiteUrl()
                }
            }
            //let alfrescoData = config?.alfrescoMetaData?.alfresco;
            // if(this.props.isCiteChanged){
            //     this.setState({alfrescoSiteData: this.props.changedSiteData })
            // }
           
            // to blank the elementId and asset data after update
            // let payloadObj = {
            //     asset: {}, 
            //     id: ''
            // }
            // this.props.saveSelectedAssetData(payloadObj)
            //this.updateAlfrescoSiteUrl(alfrescoData)
        }
    }

    updateAlfrescoSiteUrl = () => {
        let repositoryData = this.state.alfrescoSiteData
        if (repositoryData?.repositoryFolder || repositoryData?.title ) {
            this.setState({
                alfrescoSite: repositoryData?.repositoryFolder || repositoryData?.title
            })
        } else {
            this.setState({
                alfrescoSite: config.alfrescoMetaData?.alfresco?.repositoryFolder || config.alfrescoMetaData?.alfresco?.title
            })
        }
    }
    handleSiteOptionsDropdown = (alfrescoPath, id, locationData) =>{
        let that = this
        let url = `${config.ALFRESCO_EDIT_METADATA}/alfresco-proxy/api/-default-/public/alfresco/versions/1/people/-me-/sites?maxItems=1000`;
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
            // to blank the elementId and asset data after update
            const payloadObj = {
                asset: {},
                id: ''
            }
            this.props.saveSelectedAssetData(payloadObj)
        }
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
                    const alfrescoSite = locationSiteDataTitle ? locationSiteDataTitle : alfrescoSiteName
                    const citeName = alfrescoSite?.split('/')?.[0] || alfrescoSite
                    let messageObj = { citeName: citeName, 
                        citeNodeRef: nodeRefs, 
                        elementId: this.props.elementId,
                        currentAsset }
                    sendDataToIframe({ 'type': 'launchAlfrescoPicker', 'message': messageObj })
                }
                else {
                    this.props.accessDenied(true)
                }

            }
        }
        else {
            if (this.props.permissions.includes('alfresco_crud_access')) {
                this.handleSiteOptionsDropdown(alfrescoPath, this.props.elementId, this.state.alfrescoSiteData)
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

    deleteElementAsset = () => {
        const element = this.props.model
        this.props.handleFocus();
        if (hasReviewerRole()) {
            return true
        }
        this.toggleDeletePopup(false)
        
        let setFigureData = {
            "schema": `http://schemas.pearson.com/wip-authoring/${element.figuretype}/1#/definitions/${element.figuretype}`,
            "height": "399",
            "width": "600",
            "posterimage": {
                "path": DEFAULT_VIDEO_POSTER_IMAGE,
                "imageid": ""
            }
        }
        switch (element.figuretype) {
            case "audio":
                setFigureData = {
                    ...setFigureData,
                    "audioid": "",
                    "srctype": "externallink"
                }
            case "video":
                setFigureData = {
                    ...setFigureData,
                    "videoid": "",
                    "videos": [
                        {
                            "path": "",
                            "charAt": 0
                        }
                    ]
                }
        }
        
        this.props.updateFigureData(setFigureData, this.props.index, this.props.elementId, this.props.asideData, () => {
            this.props.handleFocus("updateFromC2");
            this.props.handleBlur();
        })
    }

    render() {
        const { index, slateLockInfo } = this.props;
      
            return (
                <div className="figureElement">
                {this.state.deleteAssetPopup && this.showDeleteAssetPopup()}
                <FigureUserInterface deleteElementAsset={this.toggleDeletePopup} alfrescoSite={this.state.alfrescoSite} alfrescoElementId={this.props.alfrescoElementId} alfrescoAssetData={this.props.alfrescoAssetData} launchAlfrescoPopup={this.props.launchAlfrescoPopup} handleC2MediaClick={this.handleC2MediaClick} permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} index={index}  slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />
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