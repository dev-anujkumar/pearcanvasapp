// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// IMPORT - Components //
import TinyMceEditor from "../tinyMceEditor"
import { c2MediaModule } from './../../js/c2_media_module';
import config from '../../config/config';

// // IMPORT - Assets //
import './../../styles/ElementAudioVideo/ElementAudioVideo.css';
import {AUDIO,VIDEO,DEFAULT_ASSET,DEFAULT_VIDEO_POSTER_IMAGE} from './../../constants/Element_Constants';
import { hideTocBlocker, disableHeader } from '../../js/toggleLoader'
import { hasReviewerRole } from '../../constants/utility.js'


/*** @description - ElementAudioVideo is a class based component. It is defined simply to make a skeleton of the audio-video-type element ***/

class ElementAudioVideo extends Component {
    constructor(props) {
        super(props);
        this.state={
            imgSrc: null,
            assetData: null,
            elementType: this.props.model.figuretype || ""
        }
    }
    /**
     * @description data after selecting an asset from alfresco c2 module
     * @param {*} data selected asset data
     */
    dataFromAlfresco = (data) => {
        hideTocBlocker();
        disableHeader(false);
        let format , path , lang , tracktype;
        let imageData = data;
        let clipInfo;
        let epsURL = imageData['EpsUrl'] ? imageData['EpsUrl'] : "";
        let figureType = imageData['assetType'] ? imageData['assetType'] : "";
        let width = imageData['width'] ? imageData['width'] : "";
        let height = imageData['height'] ? imageData['height'] : "";
        let smartLinkAssetType = (typeof (data.desc) == "string") ? data.desc.includes('smartLinkType') ? JSON.parse(data.desc).smartLinkType : "" : "";

        if (figureType === "video" || figureType === "audio" || smartLinkAssetType == "Video" || smartLinkAssetType == "Audio") {

            if (figureType === "video" || smartLinkAssetType == "Video" && epsURL === "") {
                epsURL = "https://d12m40tknrppbi.cloudfront.net/cite/images/FPO-audio_video.png";
            }
            let smartLinkURl = imageData['smartLinkURl'] ? imageData['smartLinkURl'] : "";
            // let clipInfo = imageData['clipinfo'] ? JSON.parse(imageData['clipinfo']) : {};
            if(imageData['clipinfo']){
                if(typeof(imageData['clipinfo'])=="string"){
                    clipInfo=JSON.parse(imageData['clipinfo'])
                }
                else{
                    clipInfo=imageData['clipinfo']
                }
            }
            let videoFormat = imageData['mimetype'] ? imageData['mimetype'] : "";
            let uniqID = imageData['uniqueID'] ? imageData['uniqueID'] : "";
            let ensubtitle = imageData['subtitle'] ? imageData['subtitle'] : "";
            let frenchSubtitle = imageData['frenchsubtitle'] ? imageData['subtitle'] : "";
            let spanishSubtitle = imageData['spanishsubtitle'] ? imageData['subtitle'] : "";
            if (ensubtitle) {
                format = 'text/' + ensubtitle.split("?")[1].split("&")[0].split("=")[1];
                path = ensubtitle.split("?")[0];
                lang = ensubtitle.split("?")[1].split("&")[1].split("=")[1] + "-us";
                tracktype = "captions"
            } else if (frenchSubtitle) {
                format = 'text/' + frenchsubtitle.split("?")[1].split("&")[0].split("=")[1];
                path = frenchsubtitle.split("?")[0];
                lang = frenchsubtitle.split("?")[1].split("&")[1].split("=")[1];
                tracktype = "captions"
            } else if (spanishSubtitle) {
                format = 'text/' + spanishsubtitle.split("?")[1].split("&")[0].split("=")[1];
                path = spanishsubtitle.split("?")[0];
                lang = spanishsubtitle.split("?")[1].split("&")[1].split("=")[1];
                tracktype = "captions"
            }
            
            this.setState({ imgSrc: epsURL,assetData :smartLinkURl })
            let figureData = {
                height : height,
                width : width,
                srctype: this.props.model.figuredata.srctype
            }
            if (!uniqID) {
                let uniqIDString = imageData && imageData.req && imageData.req.url;
                let uniqueIDSmartlink;
                if (uniqIDString) {
                    uniqueIDSmartlink = uniqIDString.split('s.cmis:objectId = ')[1].replace(/\'/g, '');
                }
                let uniqueID = imageData['uniqueID'] ? imageData['uniqueID'] : (uniqueIDSmartlink ? uniqueIDSmartlink : '');
                if (uniqueID) {
                    uniqID = uniqueID;
                }
            }

            smartLinkAssetType = smartLinkAssetType.toLowerCase();
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
                            {
                                format: format,
                                path: path,
                                language: lang,
                                tracktype: tracktype
                            }
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
            this.props.updateFigureData(figureData, this.props.index,this.props.elementId, ()=>{
                this.props.handleFocus("updateFromC2")
                this.props.handleBlur()
            })
        }
    }
    /**
     * @description Open C2 module with predefined Alfresco location
     * @param {*} locationData alfresco locationData
     */
    handleC2ExtendedClick = (locationData) => {
        let data_1 = locationData;
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
        let that = this;
        let alfrescoPath = config.alfrescoMetaData;
        var data_1 = false;

        if (alfrescoPath && alfrescoPath.nodeRef) {
            if(this.props.permissions && this.props.permissions.includes('add_multimedia_via_alfresco'))    { 
            data_1 = alfrescoPath;
            /*
                data according to new project api 
            */
            data_1['repositoryName'] = data_1['repoName'] ? data_1['repoName'] : data_1['repositoryName']
            data_1['repositoryFolder'] = data_1['name'] ? data_1['name'] : data_1['repositoryFolder']
            data_1['repositoryUrl'] = data_1['repoInstance'] ? data_1['repoInstance'] : data_1['repositoryUrl']
            data_1['visibility'] = data_1['siteVisibility'] ? data_1['siteVisibility'] : data_1['visibility']

            /*
                data according to old core api and c2media
            */
            data_1['repoName'] = data_1['repositoryName'] ? data_1['repositoryName'] : data_1['repoName']
            data_1['name'] = data_1['repositoryFolder'] ? data_1['repositoryFolder'] : data_1['name']
            data_1['repoInstance'] = data_1['repositoryUrl'] ? data_1['repositoryUrl'] : data_1['repoInstance']
            data_1['siteVisibility'] = data_1['visibility'] ? data_1['visibility'] : data_1['siteVisibility']

            this.handleC2ExtendedClick(data_1)
            }
            else{
                this.props.accessDenied(true)
            }

        } else {
           if(this.props.permissions.includes('alfresco_crud_access')){ 
               c2MediaModule.onLaunchAddAnAsset(function (data_1) {
                c2MediaModule.productLinkOnsaveCallBack(data_1, function (data_2) {
                    c2MediaModule.AddanAssetCallBack(data_2, function (data) {
                        that.dataFromAlfresco(data);
                    })
                })
            })
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

export default ElementAudioVideo;