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

/*** @description - ElementAudioVideo is a class based component. It is defined simply to make a skeleton of the audio-video-type element ***/

export class ElementAudioVideo extends Component {
    constructor(props) {
        super(props);
        this.state={
            imgSrc: null,
            assetData : null
        }
    }
    /**
     * @description data after selecting an asset from alfresco c2 module
     * @param {*} data selected asset data
     */
    dataFromAlfresco = (data) => {
            let imageData = data;
            let epsURL = imageData['EpsUrl'] ? imageData['EpsUrl'] : "";
            let figureType = imageData['assetType'] ? imageData['assetType'] : "";
            // let width = imageData['width'] ? imageData['width'] : "";
            // let height = imageData['height'] ? imageData['height'] : "";
            // let smartLinkPath = (imageData.body && imageData.body.results && imageData.body.results[0] && imageData.body.results[0].properties['s.avs:url'].value) ? imageData.body.results[0].properties['s.avs:url'].value : "";
            // let smartLinkString = (imageData.desc && imageData.desc.toLowerCase() !== "eps media") ? imageData.desc : "{}";
            // let smartLinkDesc = smartLinkString !== "{}" ? JSON.parse(smartLinkString) : "";
            // let smartLinkType = smartLinkDesc !== "" ? smartLinkDesc.smartLinkType : "";
            if (figureType === "video" || figureType === "audio") {

            //let clipInfoData=typeof(imageData['clipinfo'])==="object"?imageData['clipinfo']:JSON.parse(imageData['clipinfo']);
            if (figureType === "video" && epsURL === "") {
                epsURL = "https://d12m40tknrppbi.cloudfront.net/cite/images/FPO-audio_video.png";
            }
            let smartLinkURl = imageData['smartLinkURl'] ? imageData['smartLinkURl'] : "";
            // let clipInfo = imageData['clipinfo'] ? imageData['clipinfo'] : {};
            // // let clipLength=Object.keys(clipInfo).length
            // let mediaId = imageData['mediaId'] ? imageData['mediaId'] : "";
            // let videoFormat = imageData['mimetype'] ? imageData['mimetype'] : "";
            // //let posterURL = imageData['posterImageUrl'] || 'https://d12m40tknrppbi.cloudfront.net/cite/images/FPO-audio_video.png';
            // let imageId = imageData['workURN'] ? imageData['workURN'] : "";
            // let previewURL = imageData['previewUrl'] ? imageData['previewUrl'] : "";
            // let uniqID = imageData['uniqueID'] ? imageData['uniqueID'] : "";
            // let altText = imageData['alt-text'] ? imageData['alt-text'] : "";
            // let longDesc = imageData['longDescription'] ? imageData['longDescription'] : "";
            this.setState({ imgSrc: epsURL,assetData :smartLinkURl })

        }
    }
    /**
     * @description Open C2 module with predefined Alfresco location
     * @param {*} locationData alfresco locationData
     */
    handleC2ExtendedClick = (locationData) => {
        let data_1 = locationData;
        let that = this;
        c2MediaModule.productLinkOnsaveCallBack(data_1, function (data_2) {
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
        if (e.target.tagName.toLowerCase() === "p") {
            e.stopPropagation();
            return;
        }
        let that = this;
        let alfrescoPath = config.alfrescoMetaData;
        var data_1 = false;

        if (alfrescoPath && alfrescoPath.nodeRef) {
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

        } else {
            c2MediaModule.onLaunchAddAnAsset(function (data_1) {
                c2MediaModule.productLinkOnsaveCallBack(data_1, function (data_2) {
                    c2MediaModule.AddanAssetCallBack(data_2, function (data) {
                        that.dataFromAlfresco(data);
                    })
                })
            });
        }

    }
    /*** @description - This function is for handling the Audio-Video-element.
     * @param model object that defined the type of element
     * @param index index of the current element
     * @param slateLockInfo object that defines the slate lock details */

    renderAudioVideoType = (model = {},index,slateLockInfo) => {
        var audioVideoJSX;
        var assetPath;
        switch (model.figuretype) {
            case AUDIO:
                /**JSX for Audio-type element*/
                assetPath=model.figuredata.audio.path;
                audioVideoJSX = <div className="divAudio">
                    <figure className="figureAudio"  >
                        <header className="figureHeader">

                            <TinyMceEditor currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.props.learningObjectiveOperations}  openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} index={`${index}-0`} placeholder="Enter Label..." tagName={'h4'} className="heading4AudioNumberLabel figureLabel " model={model.html.title} slateLockInfo={slateLockInfo} />

                            <TinyMceEditor currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.props.learningObjectiveOperations} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} index={`${index}-1`} placeholder="Enter Title..." tagName={'h4'} className="heading4AudioTitle figureTitle" model={model.html.subtitle} slateLockInfo={slateLockInfo} />

                        </header>
                        <div className="assetDiv"><strong>Asset: </strong>{this.state.assetData?this.state.assetData : (assetPath !== "" ? assetPath : DEFAULT_ASSET)}</div>
                        <div className="pearson-component audio" data-type="audio">
                            <audio controls="none" preload="none" className="audio" onClick={this.handleC2MediaClick}>
                                <source src={this.state.imgSrc?this.state.imgSrc :""} type="audio/mpeg" />
                            </audio>
                        </div>
                        <figcaption className="figcaptionAudio" >
                            <TinyMceEditor currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.props.learningObjectiveOperations} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} index={`${index}-2`} placeholder="Enter Caption..." tagName={'p'} className="figureCaption" model={model.html.caption} slateLockInfo={slateLockInfo} />
                        </figcaption>

                    </figure>
                    <div >
                        <TinyMceEditor currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.props.learningObjectiveOperations} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}  handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} index={`${index}-3`} placeholder="Enter Credit..." tagName={'p'} className="paragraphAudioCredit figureCredit" model={model.html.credit} slateLockInfo={slateLockInfo} />
                    </div>
                </div>
                break;
            case VIDEO:
                /**JSX for Video-type element*/
                assetPath=model.figuredata.videos[0].path;
                var posterImage=model.figuredata.posterimage.path;
                audioVideoJSX = <div className="divVideo">
                    <figure className="figureVideo" >

                        <header className="figureHeader">
                            <TinyMceEditor currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.props.learningObjectiveOperations} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} index={`${index}-0`} placeholder="Enter Label..." tagName={'h4'} className="heading4VideoNumberLabel figureLabel " model={model.html.title} slateLockInfo={slateLockInfo} />
                            <TinyMceEditor currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.props.learningObjectiveOperations} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} index={`${index}-1`} placeholder="Enter Title..." tagName={'h4'} className="heading4VideoTitle figureTitle" model={model.html.subtitle} slateLockInfo={slateLockInfo} />
                        </header>
                        <div className="assetDiv"><strong>Asset: </strong>{this.state.assetData?this.state.assetData : (assetPath !== "" ? assetPath : DEFAULT_ASSET)}</div>
                        <div className="pearson-component video" data-type="video" >
                            <video className="video" width="640" height="360" controls="none" preload="none" onClick={this.handleC2MediaClick}
                              poster={this.state.imgSrc?this.state.imgSrc : (posterImage !== "" ? posterImage : DEFAULT_VIDEO_POSTER_IMAGE)}
                            >
                                <source src="" />
                                <track src="" kind="subtitles" srcLang="en" label="English" />
                            </video>
                        </div>
                        <figcaption className="figcaptionVideo" >
                            <TinyMceEditor currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.props.learningObjectiveOperations} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} index={`${index}-2`} placeholder="Enter Caption..." tagName={'p'} className="figureCaption" model={model.html.caption}  slateLockInfo={slateLockInfo} />
                        </figcaption>
                    </figure>
                    <div >
                        <TinyMceEditor currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.props.learningObjectiveOperations} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} index={`${index}-3`} placeholder="Enter Credit..." tagName={'p'} className="paragraphVideoCredit figureCredit" model={model.html.credit}  slateLockInfo={slateLockInfo} />
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